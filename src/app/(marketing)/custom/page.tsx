// src/app/(marketing)/custom/page.tsx
export const metadata = {
  title: "Customize – Second Stitch",
  description: "Request a bespoke, upcycled accessory.",
};

export default function CustomPage() {
  return (
    <main className="container pt-24 pb-24 max-w-2xl">
      <h1 className="h1">Customize an Accessory</h1>

      <form className="mt-8 space-y-4" action="/api/contact" method="post">
        {/* honeypot (spam) */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <label className="block">
          <span className="sr-only">Your name</span>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-[var(--border)] px-4 py-3"
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <span className="sr-only">Email</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-[var(--border)] px-4 py-3"
            placeholder="Email"
          />
        </label>

        <label className="block">
          <span className="sr-only">Describe your idea</span>
          <textarea
            name="message"
            required
            className="w-full rounded-xl border border-[var(--border)] px-4 py-3 h-40"
            placeholder="Describe your idea (materials, colors, size)"
          />
        </label>

        <button className="btn btn-primary">Send request</button>
      </form>
    </main>
  );
}
