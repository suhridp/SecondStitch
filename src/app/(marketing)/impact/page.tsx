// src/app/(marketing)/impact/page.tsx
export const metadata = {
  title: "Impact – Second Stitch",
  description: "Our sustainability impact and progress.",
};

export default function ImpactPage() {
  const items = [
    { k: "Textile Waste Diverted", v: "120kg" },
    { k: "Bespoke Requests", v: "24+" },
    { k: "Small-batch Drops", v: "6" },
  ];
  return (
    <main className="container pt-24 pb-24">
      <h1 className="h1">Impact</h1>

      <dl className="mt-10 grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.k} className="card p-6">
            <dt className="text-sm tracking-widest text-charcoal-500 uppercase">
              {item.k}
            </dt>
            <dd className="mt-2 text-3xl font-semibold">{item.v}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
