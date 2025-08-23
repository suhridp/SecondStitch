import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  const { donation_id, user_id, points } = await req.json();
  if (!donation_id) {
    return NextResponse.json(
      { ok: false, error: "Missing donation_id" },
      { status: 400 }
    );
  }

  const sb = supabaseAdmin();

  // 1) Mark donation approved
  {
    const { error } = await sb
      .from("donations")
      .update({ status: "approved" })
      .eq("id", donation_id);
    if (error)
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      );
  }

  // 2) Credit points (if we know the user)
  if (user_id && Number(points) > 0) {
    const { error } = await sb.from("points_ledger").insert([
      {
        user_id,
        delta: Number(points),
        reason: "donation",
        related_id: donation_id,
      },
    ]);
    if (error)
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      );
  }

  // 3) Notify donor by email (if we have an email)
  {
    const { data: d, error } = await sb
      .from("donations")
      .select("email, name")
      .eq("id", donation_id)
      .single();

    if (!error && d?.email) {
      const name = d.name || "there";
      const html =
        `<p>Hi ${name},</p>` +
        `<p>Your donation has been <b>approved</b>. We've credited <b>${points}</b> points to your account.</p>` +
        `<p>Thank you for championing reuse!</p>`;

      const { sendMail } = await import("@/lib/email");
      await sendMail({
        to: d.email,
        subject: "Donation approved – points awarded",
        html,
      });
    }
  }

  return NextResponse.json({ ok: true });
}
