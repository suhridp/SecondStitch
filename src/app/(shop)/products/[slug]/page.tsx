import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProducts, getProduct } from "@/lib/products";
import AddButton from "./product-add-button.tsx";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const p = getProduct(params.slug);
  if (!p) return {};
  const title = `${p.name} – Second Stitch`;
  const description =
    p.subtitle || p.description || "Upcycled, one‑of‑one piece.";
  const images = [{ url: p.image, width: 1200, height: 1500, alt: p.name }];
  return {
    title,
    description,
    openGraph: { title, description, images },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();

  return (
    <main className="container py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <figure className="card overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={1200}
            height={1500}
            className="w-full h-auto object-cover"
            priority
          />
        </figure>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Product
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mt-2">
            {product.name}
          </h1>
          {product.subtitle && (
            <p className="mt-2 text-slate-600">{product.subtitle}</p>
          )}
          <p className="mt-4 text-xl font-medium">
            ${product.price.toFixed(2)}
          </p>

          {product.description && (
            <div className="prose prose-slate max-w-none mt-6">
              <p>{product.description}</p>
            </div>
          )}

          <div className="mt-8">
            <AddButton product={product} />
          </div>

          {/* Details block */}
          <div className="mt-10 grid gap-3">
            <div className="card p-4">
              <p className="text-sm font-medium">Materials & Care</p>
              <p className="text-sm text-slate-600 mt-1">
                Reclaimed textiles. Cold wash, line dry. Repairs available in
                first year.
              </p>
            </div>
            <div className="card p-4">
              <p className="text-sm font-medium">Shipping & Returns</p>
              <p className="text-sm text-slate-600 mt-1">
                Ships in 3–5 days. For one‑off items, exchanges only within 14
                days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
