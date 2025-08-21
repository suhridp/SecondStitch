export function Stats({
  items,
}: {
  items: { label: string; value: string; note?: string }[];
}) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((s) => (
        <div key={s.label} className="card p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            {s.label}
          </p>
          <p className="mt-2 text-3xl font-semibold">{s.value}</p>
          {s.note && (
            <p className="mt-2 text-[13px] text-slate-600">{s.note}</p>
          )}
        </div>
      ))}
    </div>
  );
}
