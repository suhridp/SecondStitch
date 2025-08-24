"use client";

import { useCart } from "@/components/cart-context";
import type { DbProduct } from "@/lib/products-types";
import { publicImageUrl } from "@/lib/products-server";

type CartProduct = {
  slug: string;
  name: string;
  price: number; // dollars
  image?: string | null;
  subtitle?: string | null;
  description?: string | null;
};

export function AddToCartButton({ product }: { product: DbProduct }) {
  const { add } = useCart();

  function handleAdd() {
    const item: CartProduct = {
      slug: product.slug,
      name: product.name,
      price: (product.price_cents ?? 0) / 100,
      image: publicImageUrl(product.image),
      subtitle: product.subtitle,
      description: product.description,
    };
    add(item, 1);
  }

  return (
    <button
      onClick={handleAdd}
      className="rounded-xl bg-slate-900 text-white px-5 py-3 text-sm font-medium shadow-sm hover:shadow-md transition"
    >
      Add to cart
    </button>
  );
}
