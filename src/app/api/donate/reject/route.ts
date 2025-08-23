import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  const { donation_id } = await req.json();
  if (!donation_id)
    return NextResponse.json(
      { ok: false, error: "Missing donation_id" },
      { status: 400 }
    );

  const sb = supabaseAdmin();
  const { error } = await sb
    .from("donations")
    .update({ status: "rejected" })
    .eq("id", donation_id);
  if (error)
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 }
    );

  return NextResponse.json({ ok: true });
}
