import { getAllProducts, getProduct } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";

export const metadata = {
  title: "Shop – Second Stitch",
  description:
    "One‑of‑one upcycled garments and accessories. Each piece is crafted from reclaimed materials.",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <main className="container py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Shop
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold mt-2">
          Upcycled essentials
        </h1>
        <p className="copy mt-4">
          One‑of‑one pieces and small runs, stitched from reclaimed textiles.
          Subtle, durable, designed to age well.
        </p>
      </header>

      <section className="mt-10">
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
