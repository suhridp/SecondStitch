"use client";
import * as React from "react";
import { pointsForDonation, type DonationCondition } from "@/lib/points";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function DonateClient() {
  const sb = supabaseBrowser();
  const [items, _setItems] = React.useState(1);
  const [condition, _setCondition] = React.useState<DonationCondition>("good");
  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<{
    ok: boolean;
    estimate?: number;
  } | null>(null);

  const estimate = pointsForDonation(items, condition);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const { data: sess } = await sb.auth.getSession();
    const user = sess.session?.user;

    const form = new FormData(e.currentTarget);
    form.set("items", String(items));
    form.set("condition", condition);
    if (user) form.set("user_id", user.id);

    const res = await fetch("/api/donate", { method: "POST", body: form }); // ✅ matches your submit route
    const data = await res.json();
    setResult(data);
    setSubmitting(false);
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 grid gap-4">
      {/* ...unchanged inputs... */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[color:var(--muted)]">
          Estimated reward: <span className="font-medium">{estimate}</span> pts
        </p>
        <button disabled={submitting} className="btn btn-primary">
          {submitting ? "Submitting…" : "Submit donation"}
        </button>
      </div>
      {result && (
        <p
          className={`text-sm ${
            result.ok ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {result.ok
            ? "Thanks! We’ve recorded your donation. We’ll review and award points after approval."
            : "Something went wrong. Try again."}
        </p>
      )}
    </form>
  );
}
