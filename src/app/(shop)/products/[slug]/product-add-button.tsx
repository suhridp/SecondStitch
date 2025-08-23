"use client";
import { useCart } from "@/components/cart-context";
import type { Product } from "@/lib/products-server";

export default function AddButton({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <button
      onClick={() => add(product, 1)}
      className="rounded-xl bg-slate-900 text-white px-5 py-3 text-sm font-medium shadow-sm hover:shadow-md transition"
    >
      Add to cart
    </button>
  );
}
