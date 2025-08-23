"use client";
import * as React from "react";

const TAGS = ["All", "Looks", "Care", "Ideas", "Swap"] as const;
const SORTS = [
  { key: "new", label: "Newest" },
  { key: "top", label: "Top" },
] as const;

export type ForumFilters = {
  tag: (typeof TAGS)[number];
  q: string;
  sort: (typeof SORTS)[number]["key"];
};

export function ForumToolbar({
  value,
  onChange,
}: {
  value: ForumFilters;
  onChange: (v: ForumFilters) => void;
}) {
  return (
    <div className="card p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {TAGS.map((t) => {
          const active = value.tag === t;
          return (
            <button
              key={t}
              onClick={() => onChange({ ...value, tag: t })}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                active
                  ? "bg-[var(--accent-soft)] border-[var(--accent-strong)]"
                  : "border-[var(--border)]"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Search + Sort */}
      <div className="flex items-center gap-3">
        <input
          value={value.q}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
          placeholder="Search posts…"
          className="rounded-xl border px-3 py-2 text-sm w-56"
        />
        <select
          value={value.sort}
          onChange={(e) =>
            onChange({ ...value, sort: e.target.value as ForumFilters["sort"] })
          }
          className="rounded-xl border px-3 py-2 text-sm"
        >
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
