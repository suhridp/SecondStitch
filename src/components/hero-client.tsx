"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Slide = {
  src: string;
  alt: string;
};

type Props = {
  slides: Slide[];
  headline?: string;
  subhead?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  autoPlayMs?: number;
};

export default function Hero({
  slides,
  headline = "Reviving Threads, Crafting Stories",
  subhead = "Upcycled, bespoke pieces stitched from reclaimed textiles. Subtle. Durable. Designed to age beautifully.",
  primaryCta = { href: "/products", label: "Shop the drop" },
  secondaryCta = { href: "/impact", label: "Our impact" },
  autoPlayMs = 4500,
}: Props) {
  const [index, setIndex] = React.useState(0);
  const count = slides.length;
  const pausedRef = React.useRef(false);
  const timerRef = React.useRef<number | null>(null);

  // autoplay
  React.useEffect(() => {
    if (count <= 1) return;
    function tick() {
      if (!pausedRef.current) {
        setIndex((i) => (i + 1) % count);
      }
      timerRef.current = window.setTimeout(tick, autoPlayMs);
    }
    timerRef.current = window.setTimeout(tick, autoPlayMs);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [count, autoPlayMs]);

  function go(n: number) {
    setIndex((n + count) % count);
  }
  function next() {
    go(index + 1);
  }
  function prev() {
    go(index - 1);
  }

  // basic swipe
  const startX = React.useRef<number | null>(null);
  function onPointerDown(e: React.PointerEvent) {
    startX.current = e.clientX;
  }
  function onPointerUp(e: React.PointerEvent) {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    startX.current = null;
  }

  return (
    <section
      className="relative overflow-hidden bg-[var(--surface)]"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="container grid md:grid-cols-2 items-center gap-10 py-10 md:py-20">
        {/* LEFT: Copy */}
        <div className="order-2 md:order-1">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Second Stitch
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold leading-tight">
            {headline}
          </h1>
          <p className="copy mt-5 text-[15px] md:text-base text-slate-700 max-w-prose">
            {subhead}
          </p>

          <div className="mt-7 flex items-center gap-3">
            <a href={primaryCta.href} className="btn btn-primary">
              {primaryCta.label}
            </a>
            <a href={secondaryCta.href} className="btn btn-ghost">
              {secondaryCta.label}
            </a>
          </div>

          {/* Selling points */}
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            <li>Upcycled</li>
            <li>Small‑batch</li>
            <li>Repair‑friendly</li>
            <li>Plastic‑free packaging</li>
          </ul>
        </div>

        {/* RIGHT: Carousel */}
        <div
          className="relative order-1 md:order-2 aspect-[4/5] w-full rounded-2xl overflow-hidden ring-1 ring-black/5 select-none"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0.0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={slides[index]?.src || "/images/placeholder.jpg"}
                alt={slides[index]?.alt || "Look"}
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-3">
            <button
              aria-label="Previous slide"
              className="rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow ring-1 ring-black/10 hover:bg-white"
              onClick={prev}
            >
              ‹
            </button>
            <button
              aria-label="Next slide"
              className="rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow ring-1 ring-black/10 hover:bg-white"
              onClick={next}
            >
              ›
            </button>
          </div>

          {/* Dots */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2 w-2 rounded-full ring-1 ring-black/10 transition ${
                  i === index
                    ? "bg-[var(--accent-strong)]"
                    : "bg-white/80 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
