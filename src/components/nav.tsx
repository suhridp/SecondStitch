import Link from "next/link";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block rounded-xl bg-slate-900 text-white px-2 py-1 text-xs tracking-widest">
            SECOND
          </span>
          <span className="font-semibold tracking-wide">Stitch</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/about" className="hover:text-slate-600">
            About
          </Link>
          <Link href="/lookbook" className="hover:text-slate-600">
            Lookbook
          </Link>
          <Link href="/impact" className="hover:text-slate-600">
            Impact
          </Link>
          <Link href="/custom" className="hover:text-slate-600">
            Custom
          </Link>
        </nav>
        <Link
          href="/custom"
          className="rounded-2xl border border-slate-900 px-4 py-2 text-sm font-medium hover:bg-slate-900 hover:text-white transition"
        >
          Customize
        </Link>
      </div>
    </header>
  );
}
