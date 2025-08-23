import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { pointsForDonation } from "@/lib/points";

export async function POST(req: Request) {
  const form = await req.formData();

  const name = String(form.get("name") || "");
  const email = String(form.get("email") || "");
  const items = parseInt(String(form.get("items") || "1"), 10);
  const condition = String(form.get("condition") || "good") as
    | "excellent"
    | "good"
    | "fair";
  const city = String(form.get("city") || "");
  const notes = String(form.get("notes") || "");
  const user_id = form.get("user_id") ? String(form.get("user_id")) : null;

  const points_estimate = pointsForDonation(
    Number.isFinite(items) ? items : 1,
    condition
  );
  const sb = supabaseAdmin();

  const { data, error } = await sb
    .from("donations")
    .insert([
      {
        user_id,
        name,
        email,
        items,
        condition,
        city,
        notes,
        points_awarded: points_estimate, // store estimate; can adjust on approval
        status: "submitted",
      },
    ])
    .select("id")
    .single();

  if (error)
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 }
    );
  return NextResponse.json({
    ok: true,
    estimate: points_estimate,
    id: data.id,
  });
}
