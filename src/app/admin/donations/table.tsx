"use client";
import * as React from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

type Donation = {
  id: string;
  user_id: string | null;
  name: string | null;
  email: string | null;
  items: number;
  condition: "excellent" | "good" | "fair";
  city: string | null;
  notes: string | null;
  points_awarded: number;
  status: "submitted" | "approved" | "rejected";
  created_at: string;
};

export default function AdminDonationsClient() {
  const sb = supabaseBrowser();
  const [rows, setRows] = React.useState<Donation[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [msg, setMsg] = React.useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await sb
      .from("donations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (!error) setRows((data || []) as Donation[]);
    setLoading(false);
  }

  React.useEffect(() => {
    load();
  }, []);

  async function approve(d: Donation) {
    setMsg(null);
    const res = await fetch("/api/donations/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        donation_id: d.id,
        user_id: d.user_id,
        points: d.points_awarded,
      }),
    });
    const data = await res.json();
    if (!data.ok) {
      setMsg(data.error || "Failed to approve");
      return;
    }
    await load();
    setMsg("Approved and points awarded.");
  }

  async function reject(id: string) {
    const res = await fetch("/api/donations/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ donation_id: id }),
    });
    const data = await res.json();
    if (!data.ok) {
      setMsg(data.error || "Failed to reject");
      return;
    }
    await load();
    setMsg("Rejected.");
  }

  if (loading)
    return <p className="text-sm text-[color:var(--muted)]">Loading…</p>;

  return (
    <div className="grid gap-4">
      {msg && <p className="text-sm">{msg}</p>}
      <div className="overflow-x-auto card">
        <table className="min-w-full text-sm">
          <thead className="text-left">
            <tr>
              <th className="p-3">When</th>
              <th className="p-3">Name</th>
              <th className="p-3">Items</th>
              <th className="p-3">Cond</th>
              <th className="p-3">Pts</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => (
              <tr key={d.id} className="border-t border-[var(--border)]">
                <td className="p-3">
                  {new Date(d.created_at).toLocaleString()}
                </td>
                <td className="p-3">{d.name || d.email || "Anon"}</td>
                <td className="p-3">{d.items}</td>
                <td className="p-3 capitalize">{d.condition}</td>
                <td className="p-3">{d.points_awarded}</td>
                <td className="p-3">{d.status}</td>
                <td className="p-3">
                  {d.status === "submitted" ? (
                    <div className="flex gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => approve(d)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-outline"
                        onClick={() => reject(d.id)}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-[color:var(--muted)]">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
