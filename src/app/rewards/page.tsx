import { Section } from "@/components/section";

export const metadata = {
  title: "Rewards – Second Stitch",
  description:
    "Earn and redeem points with Second Stitch: buy, donate, and participate.",
};

const TIERS = [
  {
    name: "Apprentice",
    range: "0–199 pts",
    perks: ["5% off once", "Early access to drops"],
  },
  {
    name: "Artist",
    range: "200–499 pts",
    perks: ["10% off once", "Priority customs queue"],
  },
  {
    name: "Master",
    range: "500+ pts",
    perks: ["15% off once", "Free repair within 1 year"],
  },
];

export default function RewardsPage() {
  return (
    <main>
      <Section
        eyebrow="Rewards"
        title="Earn points, champion reuse"
        subtitle="Buy, donate, and participate in the community to unlock perks."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map((t) => (
            <div key={t.name} className="card p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                {t.range}
              </p>
              <h3 className="mt-2 text-xl font-medium">{t.name}</h3>
              <ul className="mt-3 text-[15px] text-slate-700 list-disc pl-5">
                {t.perks.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="How to earn" title="Ways to collect points">
        <ul className="grid md:grid-cols-3 gap-4 list-disc pl-6 text-slate-700">
          <li>Purchase products (1 pt per $1).</li>
          <li>Donate garments (10 pts per item + condition bonus).</li>
          <li>Post in community (+2) and receive upvotes (+1 each).</li>
        </ul>
      </Section>
    </main>
  );
}
