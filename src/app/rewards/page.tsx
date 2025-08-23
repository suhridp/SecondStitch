import { Section } from "@/components/section";
import { supabaseServer } from "@/lib/supabase-server";
import RedeemClient from "./redeem-client";

type LedgerRow = {
  id: string;
  delta: number;
  reason: string;
  related_id: string | null;
  created_at: string;
};

type BadgeRow = { badge_code: string; created_at: string; title?: string };

export const metadata = {
  title: "Rewards – Second Stitch",
  description:
    "Earn and redeem points with Second Stitch: buy, donate, and participate.",
};

function stableDate(dt: string) {
  // Avoid hydration mismatches by rendering a stable UTC string
  // Example: "2025-08-23 14:30"
  return new Date(dt).toISOString().replace("T", " ").slice(0, 16);
}

export default async function RewardsPage() {
  const sb = await supabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();

  let points = 0;
  let history: LedgerRow[] = [];
  let badges: BadgeRow[] = [];

  if (user) {
    const { data: prof } = await sb
      .from("profiles")
      .select("points")
      .eq("id", user.id)
      .maybeSingle();
    points = prof?.points ?? 0;

    const { data: ledger } = await sb
      .from("points_ledger")
      .select("id, delta, reason, related_id, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);
    history = (ledger ?? []) as LedgerRow[];

    // Fetch user badges + their titles
    const { data: ub } = await sb
      .from("user_badges")
      .select("badge_code, created_at")
      .eq("user_id", user.id);

    if (ub?.length) {
      const codes = ub.map((b) => b.badge_code);
      const { data: meta } = await sb
        .from("badges")
        .select("code, title")
        .in("code", codes);
      const titleMap = new Map((meta ?? []).map((m) => [m.code, m.title]));
      badges = ub.map((b) => ({
        ...b,
        title: titleMap.get(b.badge_code) || undefined,
      })) as BadgeRow[];
    }
  }

  return (
    <main>
      <Section
        eyebrow="Rewards"
        title="Earn points, champion reuse"
        subtitle="Buy, donate, and participate in the community to unlock perks."
      >
        {!user ? (
          <p className="text-sm">
            Sign in to see your points balance and redeem rewards.
          </p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Your balance
                </p>
                <p className="mt-2 text-3xl font-semibold">{points} pts</p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  100 pts = $1 discount
                </p>

                {/* Badges */}
                {badges.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {badges.map((b) => (
                      <span
                        key={b.badge_code}
                        className="px-2 py-1 rounded-full text-xs bg-[var(--accent-soft)]"
                        title={b.badge_code}
                      >
                        {b.title || b.badge_code}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="card p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Perks
                </p>
                <ul className="mt-2 text-[15px] text-slate-700 list-disc pl-5">
                  <li>Redeem points for checkout discounts</li>
                  <li>Early access to drops at higher tiers</li>
                  <li>Free repair at top tier</li>
                </ul>
              </div>

              <div className="card p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Redeem
                </p>
                {/* Client-side control talks to /api/redeem */}
                <RedeemClient balance={points} />
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-medium">History</h3>
              <div className="mt-3 card overflow-x-auto">
                {history.length === 0 ? (
                  <p className="p-4 text-sm text-[color:var(--muted)]">
                    No activity yet.
                  </p>
                ) : (
                  <table className="min-w-full text-sm">
                    <thead className="text-left">
                      <tr>
                        <th className="p-3">When</th>
                        <th className="p-3">Change</th>
                        <th className="p-3">Reason</th>
                        <th className="p-3">Ref</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((row) => (
                        <tr
                          key={row.id}
                          className="border-t border-[var(--border)]"
                        >
                          <td className="p-3">
                            {/* Use stable UTC string to avoid hydration mismatch */}
                            <time dateTime={row.created_at}>
                              {stableDate(row.created_at)}
                            </time>
                          </td>
                          <td
                            className={`p-3 ${
                              row.delta >= 0
                                ? "text-emerald-700"
                                : "text-red-700"
                            }`}
                          >
                            {row.delta >= 0 ? `+${row.delta}` : row.delta} pts
                          </td>
                          <td className="p-3 capitalize">{row.reason}</td>
                          <td className="p-3 text-[color:var(--muted)]">
                            {row.related_id ?? "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        )}
      </Section>
    </main>
  );
}
