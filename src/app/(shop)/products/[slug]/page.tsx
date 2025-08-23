import { notFound } from "next/navigation";
import PDPGallery from "@/components/pdp/gallery-client";
import VariantSelector from "@/components/pdp/variant-selector";
import { getProductBySlugFull, publicImageUrl } from "@/lib/products-server";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const {
    product: p,
    variants,
    photos,
  } = await getProductBySlugFull(params.slug);
  if (!p) return notFound();

  const cover = publicImageUrl(p.image);
  const images = [{ src: cover, alt: p.name }].concat(
    photos.map((ph) => ({ src: publicImageUrl(ph.path), alt: p.name }))
  );

  return (
    <main className="container py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        <PDPGallery images={images} />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Product
          </p>
          <h1 className="mt-2 text-3xl font-semibold">{p.name}</h1>
          {p.subtitle && <p className="mt-2 text-slate-600">{p.subtitle}</p>}
          <VariantSelector variants={variants} basePrice={p.price_cents} />
          {p.description && (
            <p className="mt-6 whitespace-pre-line">{p.description}</p>
          )}
        </div>
      </div>
    </main>
  );
}
