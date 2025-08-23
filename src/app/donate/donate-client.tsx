"use client";
import * as React from "react";
import { pointsForDonation, type DonationCondition } from "@/lib/points";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function DonateClient() {
  const sb = supabaseBrowser();
  const [items, setItems] = React.useState(1);
  const [condition, setCondition] = React.useState<DonationCondition>("good");
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

    const res = await fetch("/api/donate", { method: "POST", body: form });
    const data = await res.json();
    setResult(data);
    setSubmitting(false);
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 grid gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="name"
          required
          placeholder="Your name"
          className="rounded-xl border px-4 py-2"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="rounded-xl border px-4 py-2"
        />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <input
          name="items"
          type="number"
          min={1}
          value={items}
          onChange={(e) =>
            setItems(Math.max(1, parseInt(e.target.value || "1", 10)))
          }
          className="rounded-xl border px-4 py-2"
        />
        <select
          name="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value as DonationCondition)}
          className="rounded-xl border px-4 py-2"
        >
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>
        <input
          name="city"
          placeholder="City (for pickup estimate)"
          className="rounded-xl border px-4 py-2"
        />
      </div>
      <textarea
        name="notes"
        placeholder="Notes (fabric types, sizes, ideas)"
        className="rounded-xl border px-4 py-2 h-28"
      />

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
