// src/app/(shop)/products/[slug]/product-add-button.tsx
"use client";

import { useCart } from "@/components/cart-context";

type CartItemInput = {
  id?: string;
  slug: string;
  name: string;
  price_cents: number; // keep cents here; convert to dollars before displaying elsewhere
  image?: string | null;
};

export default function AddButton({ product }: { product: CartItemInput }) {
  const { add } = useCart();

  return (
    <button
      onClick={() =>
        add(
          {
            // normalize to what your cart expects; if it wants dollars,
            // convert here once
            ...product,
            price: product.price_cents / 100,
            image: product.image ?? undefined,
          },
          1
        )
      }
      className="rounded-xl bg-slate-900 text-white px-5 py-3 text-sm font-medium shadow-sm hover:shadow-md transition"
    >
      Add to cart
    </button>
  );
}
