import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST() {
  const sb = supabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user)
    return NextResponse.json(
      { ok: false, error: "Not signed in" },
      { status: 401 }
    );

  const admin = supabaseAdmin();

  // Count posts for this user
  const { count } = await admin
    .from("forum_posts")
    .select("*", { count: "exact", head: true })
    .eq("author_id", user.id);

  // first_post
  if ((count ?? 0) >= 1)
    await admin.rpc("award_badge", { p_user: user.id, p_code: "first_post" });
  // community_star (10 posts)
  if ((count ?? 0) >= 10)
    await admin.rpc("award_badge", {
      p_user: user.id,
      p_code: "community_star",
    });

  return NextResponse.json({ ok: true });
}
