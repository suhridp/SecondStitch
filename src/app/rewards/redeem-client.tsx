"use client";
import * as React from "react";
import { POINTS_PER_DOLLAR, maxRedeemableDollars } from "@/lib/points";

export default function RedeemClient({ balance }: { balance: number }) {
  const [dollars, setDollars] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);

  const max$ = maxRedeemableDollars(balance);

  async function redeem() {
    setMsg(null);
    if (dollars <= 0) {
      setMsg("Choose an amount to redeem.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dollars }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Redemption failed");
      setMsg(
        `Redeemed ${dollars * POINTS_PER_DOLLAR} pts for $${dollars}. ${
          data.note || ""
        }`
      );
      setDollars(0);
    } catch (e: any) {
      setMsg(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-3">
      <label className="text-sm">
        Redeem amount ($)
        <input
          type="number"
          min={0}
          max={max$}
          value={dollars}
          onChange={(e) =>
            setDollars(
              Math.max(0, Math.min(max$, parseInt(e.target.value || "0", 10)))
            )
          }
          className="mt-1 w-full rounded-xl border px-3 py-2"
        />
      </label>
      <p className="text-xs text-[color:var(--muted)]">
        Max redeemable: <b>${max$}</b> ({max$ * POINTS_PER_DOLLAR} pts)
      </p>
      <button
        onClick={redeem}
        disabled={submitting || dollars <= 0}
        className="btn btn-primary"
      >
        {submitting ? "Redeeming…" : `Redeem $${dollars}`}
      </button>
      {msg && <p className="text-xs">{msg}</p>}
    </div>
  );
}
