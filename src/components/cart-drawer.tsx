"use client";
import * as React from "react";
import { useCart } from "@/components/cart-context";   // ✅ add this import


export function CartDrawer() {
  const { isOpen, close, items, remove, total, setQty } = useCart();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleCheckout() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url)
        throw new Error(data.error || "Checkout failed");
      window.location.href = data.url as string;
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/20" onClick={close} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Your Cart</h3>
          <button onClick={close} className="text-sm underline">
            Close
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {items.length === 0 && (
            <p className="text-sm text-charcoal-600">Your cart is empty.</p>
          )}
          {items.map((it) => (
            <div
              key={it.product.slug}
              className="flex items-start justify-between border-b pb-4 gap-3"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{it.product.name}</p>
                <p className="text-sm text-charcoal-600">
                  ${it.product.price.toFixed(2)}
                </p>
                <div className="mt-2 inline-flex items-center gap-2">
                  <button
                    className="h-8 w-8 rounded border"
                    onClick={() =>
                      setQty(it.product.slug, Math.max(1, it.qty - 1))
                    }
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{it.qty}</span>
                  <button
                    className="h-8 w-8 rounded border"
                    onClick={() => setQty(it.product.slug, it.qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">
                  ${(it.product.price * it.qty).toFixed(2)}
                </p>
                <button
                  className="text-xs underline mt-1"
                  onClick={() => remove(it.product.slug)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="font-medium">Subtotal</p>
          <p>${total().toFixed(2)}</p>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          className="btn btn-primary w-full mt-6"
          onClick={handleCheckout}
          disabled={loading || items.length === 0}
        >
          {loading ? "Redirecting…" : "Proceed to checkout"}
        </button>
      </aside>
    </div>
  );
}
