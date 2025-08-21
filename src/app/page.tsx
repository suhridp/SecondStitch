"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductGrid } from "@/components/product-grid";
import { featuredProducts } from "@/lib/products";

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="container pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="h1">Reviving Threads, Crafting Stories</h1>
          <p className="copy mt-5 max-w-prose">
            Tactile pieces with a conscience. Upcycled garments and accessories
            — made in small batches with meticulous craftsmanship.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/products" className="btn btn-primary">
              Shop the collection
            </Link>
            <Link href="/custom" className="btn btn-outline">
              Customize an accessory
            </Link>
          </div>
        </motion.div>
        <div className="card p-6">
          <div className="aspect-[4/5] w-full rounded-xl bg-sand-100 grid place-items-center">
            <span className="text-sm text-charcoal-500">
              Hero image / collage
            </span>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container pb-24">
        <div className="flex items-end justify-between">
          <h2 className="h2">Featured</h2>
          <Link href="/products" className="text-sm underline">
            View all
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
    </main>
  );
}
