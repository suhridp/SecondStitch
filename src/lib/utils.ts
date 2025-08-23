// src/lib/utils.ts
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function toUSD(cents: number | null | undefined) {
  const v = (cents ?? 0) / 100;
  return `$${v.toFixed(2)}`;
}
