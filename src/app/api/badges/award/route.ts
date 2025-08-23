import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST() {
  const sb = await supabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Not signed in" },
      { status: 401 }
    );
  }

  const admin = supabaseAdmin();

  const { count, error } = await admin
    .from("forum_posts")
    .select("*", { count: "exact", head: true })
    .eq("author_id", user.id);

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 }
    );
  }

  const n = count ?? 0;
  // Award exactly on first post
  if (n === 1) {
    await admin.rpc("award_badge", { p_user: user.id, p_code: "first_post" });
  }
  // Community star at 10+
  if (n >= 10) {
    await admin.rpc("award_badge", {
      p_user: user.id,
      p_code: "community_star",
    });
  }

  return NextResponse.json({ ok: true, count: n });
}
