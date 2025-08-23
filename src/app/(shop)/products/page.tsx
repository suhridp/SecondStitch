import { getAllProducts } from "@/lib/products-server";
import type { DbProduct } from "@/lib/products-types";
import { ProductGrid } from "@/components/product-grid";
import { publicImageUrl } from "@/lib/storage";

export const metadata = {
  title: "Shop – Second Stitch",
  description: "Upcycled essentials and small‑batch drops.",
};

function toUI(p: DbProduct) {
  return {
    slug: p.slug,
    name: p.name,
    price: (p.price_cents ?? 0) / 100,
    image: publicImageUrl(p.image),
    subtitle: p.subtitle ?? undefined,
    description: p.description ?? undefined,
  };
}
export default async function ProductsPage() {
  const rows = await getAllProducts();
  const products = rows.map(toUI);

  return (
    <main className="container py-16 md:py-24">
      {/* header ... */}
      <section className="mt-10">
        {products.length === 0 ? (
          <p className="text-sm text-slate-600">
            No products yet. Add items in the admin or seed your database.
          </p>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </main>
  );
}