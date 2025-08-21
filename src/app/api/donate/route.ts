import { NextResponse } from "next/server";
import { pointsForDonation } from "@/lib/points";

export async function POST(req: Request) {
  const form = await req.formData();
  const items = parseInt(String(form.get("items") || "1"), 10);
  const condition = String(form.get("condition") || "good") as
    | "excellent"
    | "good"
    | "fair";
  const points = pointsForDonation({
    items: isFinite(items) ? items : 1,
    condition,
  });
  console.log("DONATION", Object.fromEntries(form.entries()), { points });
  return NextResponse.json({ ok: true, points });
}
