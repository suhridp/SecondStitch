"use client";
import Link from "next/link";
import * as React from "react";
import { useCart } from "@/components/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import  UserMenu  from "@/components/auth/user-menu";

export function SiteHeader() {
  const { open, items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Close menu on route change (optional improvement)
  React.useEffect(() => {
    const handler = () => setMenuOpen(false);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/70 backdrop-blur">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex rounded-lg bg-[var(--accent-strong)] text-white px-2 py-1 text-x tracking-widest">
            SECOND
          </span>
          <span className="text-x font-medium tracking-wide">Stitch</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/products" className="hover:underline">
            Shop
          </Link>
          <Link href="/lookbook" className="hover:underline">
            Lookbook
          </Link>
          <UserMenu />
          <Link href="/impact" className="hover:underline">
            Impact
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/community" className="hover:underline">
            Community
          </Link>
          <Link href="/donate" className="hover:underline">
            Donate
          </Link>
          <Link href="/rewards" className="hover:underline">
            Rewards
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={open} className="btn btn-outline">
            Cart {count > 0 && <span className="ml-1">({count})</span>}
          </button>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)]"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              // X icon
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-white">
          <nav className="container py-4 grid gap-3 text-sm">
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="py-2"
            >
              Shop
            </Link>
            <Link
              href="/lookbook"
              onClick={() => setMenuOpen(false)}
              className="py-2"
            >
              Lookbook
            </Link>
            <Link
              href="/impact"
              onClick={() => setMenuOpen(false)}
              className="py-2"
            >
              Impact
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="py-2"
            >
              About
            </Link>
            <Link
              href="/community"
              onClick={() => setMenuOpen(false)}
              className="py-2"
            >
              Community
            </Link>
            <Link
              href="/donate"
              onClick={() => setMenuOpen(false)}
              className="py-2"
            >
              Donate
            </Link>
            <Link
              href="/rewards"
              onClick={() => setMenuOpen(false)}
              className="py-2"
            >
              Rewards
            </Link>
          </nav>
        </div>
      )}

      <CartDrawer />
    </header>
  );
}
