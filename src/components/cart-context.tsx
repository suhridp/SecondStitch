"use client";
import * as React from "react";
import type { Product } from "@/lib/products";

type CartItem = { product: Product; qty: number };
type CartState = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: Product, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  total: () => number;
};

const CartCtx = React.createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    const raw = localStorage.getItem("ss_cart");
    if (raw) setItems(JSON.parse(raw));
  }, []);
  React.useEffect(() => {
    localStorage.setItem("ss_cart", JSON.stringify(items));
  }, [items]);

  const add = (product: Product, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.product.slug === product.slug);
      if (i > -1) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...prev, { product, qty }];
    });
    setOpen(true);
  };
  const remove = (slug: string) =>
    setItems((prev) => prev.filter((x) => x.product.slug !== slug));
  const setQty = (slug: string, qty: number) =>
    setItems((prev) =>
      prev.map((x) =>
        x.product.slug === slug ? { ...x, qty: Math.max(1, qty) } : x
      )
    );
  const total = () => items.reduce((s, x) => s + x.product.price * x.qty, 0);

  const value: CartState = {
    items,
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    add,
    remove,
    setQty,
    total,
  };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
