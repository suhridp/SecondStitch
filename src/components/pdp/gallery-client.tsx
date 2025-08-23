"use client";
import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function PDPGallery({
  images,
}: {
  images: { src: string; alt?: string }[];
}) {
  const [i, setI] = React.useState(0);
  const [zoom, setZoom] = React.useState(false);

  const current = images[i] ?? { src: "/images/placeholder.jpg", alt: "Image" };

  return (
    <div className="grid gap-3">
      {/* Main */}
      <button
        type="button"
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-black/5"
        onClick={() => setZoom(true)}
      >
        <Image
          src={current.src}
          alt={current.alt || "Product image"}
          fill
          priority
          className="object-cover"
        />
      </button>

      {/* Thumbs */}
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={img.src + idx}
            onClick={() => setI(idx)}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-1 transition ${
              idx === i
                ? "ring-[var(--accent-strong)]"
                : "ring-black/10 hover:ring-black/30"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt || "Thumb"}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Zoom overlay */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm"
            onClick={() => setZoom(false)}
          >
            <div className="absolute inset-0 m-auto h-[min(90vh,900px)] w-[min(90vw,900px)]">
              <Image
                src={current.src}
                alt={current.alt || "Zoom"}
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
