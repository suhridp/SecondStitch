import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ ok: false }, { status: 400 });

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-06-20",
    });
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const admin = supabaseAdmin();

    // Mark order paid
    await admin
      .from("orders")
      .update({ status: "paid" })
      .eq("stripe_session_id", session.id);

    const user_id = session.metadata?.user_id || "" || null;
    const redeemed = parseInt(session.metadata?.redeem_points || "0", 10) || 0;

    // Award purchase points: 1 pt per $1 (or fine-tune)
    const amountPaid =
      (session.amount_total ?? 0) - (session.total_details?.amount_tax ?? 0); // net of tax
    const earned = Math.floor(amountPaid / 100); // 1 pt per dollar

    if (user_id) {
      const ledgerRows = [];
      if (redeemed > 0) {
        // We already subtracted points on redeem API; if you didn’t, you can subtract here
        // ledgerRows.push({ user_id, delta: -redeemed, reason: "redeem", related_id: session.id });
      }
      if (earned > 0) {
        ledgerRows.push({
          user_id,
          delta: earned,
          reason: "purchase",
          related_id: session.id,
        });
      }
      if (ledgerRows.length) {
        await admin.from("points_ledger").insert(ledgerRows);
      }
    } // ...after awarding points
    const email =
      (session.customer_details?.email as string | undefined) || undefined;
    if (email) {
      const earned = Math.floor(
        ((session.amount_total ?? 0) -
          (session.total_details?.amount_tax ?? 0)) /
          100
      );
      const html =
        `<p>Thanks for your order!</p>` +
        `<p>We’ve received your payment. Points earned: <b>${earned}</b>.</p>` +
        `<p>We’ll notify you when your items ship.</p>`;
      const { sendMail } = await import("@/lib/email");
      await sendMail({
        to: email,
        subject: "Order confirmed – Second Stitch",
        html,
      });
    }
  }

  return NextResponse.json({ ok: true });
}
