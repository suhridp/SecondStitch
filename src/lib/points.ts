export type DonationCondition = "excellent" | "good" | "fair";

/** Simple MVP rule: 10 pts per item + small condition bonus */
export function pointsForDonation({
  items,
  condition,
}: {
  items: number;
  condition: DonationCondition;
}) {
  const base = Math.max(1, items) * 10;
  const bonus = condition === "excellent" ? 10 : condition === "good" ? 5 : 0;
  return base + bonus;
}
