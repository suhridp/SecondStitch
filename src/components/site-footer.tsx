export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-white/70">
      <div className="container py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-medium">Second Stitch</p>
          <p className="mt-2 text-charcoal-600 max-w-xs">
            Upcycled apparel & accessories made in small batches.
          </p>
        </div>
        <div>
          <p className="font-medium">Explore</p>
          <ul className="mt-2 space-y-1 text-charcoal-700">
            <li>
              <a href="/products" className="hover:underline">
                Shop
              </a>
            </li>
            <li>
              <a href="/lookbook" className="hover:underline">
                Lookbook
              </a>
            </li>
            <li>
              <a href="/impact" className="hover:underline">
                Impact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-medium">Contact</p>
          <p className="mt-2 text-charcoal-700">second_stitch80@gmail.com</p>
        </div>
      </div>
      <div className="container py-6 text-xs text-charcoal-500">
        © {new Date().getFullYear()} Second Stitch. All rights reserved.
      </div>
    </footer>
  );
}
