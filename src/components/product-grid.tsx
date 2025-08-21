import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <Link
          key={p.slug}
          href={`/products/${p.slug}`}
          className="group card overflow-hidden"
        >
          <div className="relative aspect-[4/5]">
            <Image
              src={p.image}
              alt={p.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">{p.name}</p>
              <p className="text-sm">${p.price.toFixed(2)}</p>
            </div>
            <p className="mt-1 text-sm text-charcoal-600">{p.subtitle}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
