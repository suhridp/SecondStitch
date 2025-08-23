import Link from "next/link";
import Image from "next/image";
import type { UIProduct } from "@/lib/products-server";

export function ProductGrid({ products }: { products: UIProduct[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <Link
          key={p.slug}
          href={`/products/${p.slug}`}
          className="group card overflow-hidden group card overflow-hidden transition-transform hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="relative aspect-[4/5]">
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">{p.name}</p>
              <p className="text-sm">${p.price.toFixed(2)}</p>
            </div>
            {p.subtitle && (
              <p className="mt-1 text-sm text-[color:var(--muted)]">
                {p.subtitle}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
