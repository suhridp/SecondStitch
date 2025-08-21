"use client";
import { useCart } from "@/components/cart-context";
import type { Product } from "@/lib/products";

export function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <button className="btn btn-primary" onClick={() => add(product, 1)}>
      Add to cart
    </button>
  );
}
