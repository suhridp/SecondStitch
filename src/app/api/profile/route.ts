import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  const { id, name, avatar_url } = await req.json();
  const sb = supabaseAdmin();
  const { error } = await sb
    .from("profiles")
    .upsert({ id, name, avatar_url }, { onConflict: "id" });
  if (error)
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 }
    );
  return NextResponse.json({ ok: true });
}
