export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          © {new Date().getFullYear()} Second Stitch. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <a href="/impact" className="hover:text-slate-900">
            Impact
          </a>
          <a href="/custom" className="hover:text-slate-900">
            Custom
          </a>
          <a href="/about" className="hover:text-slate-900">
            About
          </a>
        </div>
      </div>
    </footer>
  );
}
