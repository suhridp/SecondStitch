import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs"; // ✅ required for raw body on App Router
export const dynamic = "force-dynamic"; // ✅ webhooks should be dynamic

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig)
    return NextResponse.json(
      { ok: false, error: "Missing signature" },
      { status: 400 }
    );

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const e = err as Error;
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const admin = supabaseAdmin();

    // mark order paid
    await admin
      .from("orders")
      .update({ status: "paid" })
      .eq("stripe_session_id", session.id);

    const user_id = (session.metadata?.user_id as string | undefined) ?? null;
    const _redeemed =
      parseInt((session.metadata?.redeem_points as string) || "0", 10) || 0;

    // points earned (example: $1 = 1 pt, excluding tax)
    const amountPaid =
      (session.amount_total ?? 0) - (session.total_details?.amount_tax ?? 0);
    const earned = Math.floor(amountPaid / 100);

    if (user_id) {
      const rows: {
        user_id: string;
        delta: number;
        reason: string;
        related_id: string | null;
      }[] = [];
      // if you didn’t subtract on /api/redeem, uncomment the next line:
      // if (redeemed > 0) rows.push({ user_id, delta: -redeemed, reason: "redeem", related_id: session.id });
      if (earned > 0)
        rows.push({
          user_id,
          delta: earned,
          reason: "purchase",
          related_id: session.id,
        });
      if (rows.length) await admin.from("points_ledger").insert(rows);
    }

    // (optional) email confirmation
    const email = session.customer_details?.email ?? undefined;
    if (email) {
      const earnedPts = Math.floor(
        ((session.amount_total ?? 0) -
          (session.total_details?.amount_tax ?? 0)) /
          100
      );
      const html =
        `<p>Thanks for your order!</p>` +
        `<p>We’ve received your payment. Points earned: <b>${earnedPts}</b>.</p>` +
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
