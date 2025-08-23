// src/lib/points.ts

// Points ↔︎ currency
export const POINTS_PER_DOLLAR = 100; // 100 pts = $1

export function dollarsFromPoints(points: number) {
  return Math.floor(points / POINTS_PER_DOLLAR);
}

export function maxRedeemableDollars(pointsBalance: number) {
  return dollarsFromPoints(pointsBalance);
}

// Donations estimator
export type DonationCondition = "excellent" | "good" | "fair";

export function pointsForDonation(items: number, condition: DonationCondition) {
  const safeItems = Math.max(1, Math.floor(items || 0));
  const base = safeItems * 10;
  const bonus = condition === "excellent" ? 10 : condition === "good" ? 5 : 0;
  return base + bonus;
}
