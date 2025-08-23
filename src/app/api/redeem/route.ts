import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { POINTS_PER_DOLLAR } from "@/lib/points";

export async function POST(req: Request) {
  try {
    const sb = await supabaseServer(); // ✅ await
    const {
      data: { user },
    } = await sb.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Not signed in" },
        { status: 401 }
      );
    }

    const { dollars } = (await req.json()) as { dollars: number };
    const redeem$ = Math.max(0, Math.floor(Number(dollars) || 0));
    if (redeem$ <= 0) {
      return NextResponse.json(
        { ok: false, error: "Invalid amount" },
        { status: 400 }
      );
    }

    const { data: prof } = await sb
      .from("profiles")
      .select("points")
      .eq("id", user.id)
      .maybeSingle();
    const points = prof?.points ?? 0;

    const max$ = Math.floor(points / POINTS_PER_DOLLAR);
    const final$ = Math.min(redeem$, max$);
    if (final$ <= 0) {
      return NextResponse.json(
        { ok: false, error: "Insufficient points" },
        { status: 400 }
      );
    }

    const spendPoints = final$ * POINTS_PER_DOLLAR;

    const admin = supabaseAdmin();
    const { error } = await admin
      .from("points_ledger")
      .insert([
        {
          user_id: user.id,
          delta: -spendPoints,
          reason: "redeem",
          related_id: null,
        },
      ]);
    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      points_spent: spendPoints,
      note: "Discount will be available at checkout.",
    });
  } catch (e: unknown) {
    const err = e as Error;
    return NextResponse.json(
      { ok: false, error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}
