"use client";
import * as React from "react";

type Variant = {
  id: string;
  option1: string | null; // size
  option2: string | null; // color
  price_cents: number | null;
  stock: number;
};

export default function VariantSelector({
  variants,
  basePrice,
}: {
  variants: Variant[];
  basePrice: number;
}) {
  const sizes = React.useMemo(
    () =>
      Array.from(
        new Set(variants.map((v) => v.option1).filter(Boolean))
      ) as string[],
    [variants]
  );
  const colors = React.useMemo(
    () =>
      Array.from(
        new Set(variants.map((v) => v.option2).filter(Boolean))
      ) as string[],
    [variants]
  );

  const [size, setSize] = React.useState<string | null>(sizes[0] ?? null);
  const [color, setColor] = React.useState<string | null>(colors[0] ?? null);

  const matches = variants.filter(
    (v) =>
      (size ? v.option1 === size : true) && (color ? v.option2 === color : true)
  );
  const chosen = matches[0] || variants[0];
  const price = (chosen?.price_cents ?? basePrice) / 100;
  const inStock = (chosen?.stock ?? 0) > 0;

  return (
    <div className="mt-6 grid gap-4">
      {/* Size */}
      {sizes.length > 0 && (
        <div>
          <p className="text-sm mb-2">Size</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-2 rounded-xl border text-sm ${
                  size === s
                    ? "border-[var(--accent-strong)]"
                    : "border-[var(--border)]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color */}
      {colors.length > 0 && (
        <div>
          <p className="text-sm mb-2">Color</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`px-3 py-2 rounded-xl border text-sm ${
                  color === c
                    ? "border-[var(--accent-strong)]"
                    : "border-[var(--border)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-2 flex items-center gap-4">
        <p className="text-lg font-medium">${price.toFixed(2)}</p>
        <span
          className={`text-sm ${inStock ? "text-emerald-600" : "text-red-600"}`}
        >
          {inStock ? "In stock" : "Out of stock"}
        </span>
      </div>

      <button disabled={!inStock} className="btn btn-primary">
        {inStock ? "Add to cart" : "Notify me"}
      </button>
    </div>
  );
}
