export default function CustomPage() {
  return (
    <main className="container pt-24 pb-24 max-w-2xl">
      <h1 className="h1">Customize an Accessory</h1>
      <form className="mt-8 space-y-4">
        <input
          className="w-full rounded-xl border border-[var(--border)] px-4 py-3"
          placeholder="Your name"
        />
        <input
          className="w-full rounded-xl border border-[var(--border)] px-4 py-3"
          placeholder="Email"
          type="email"
        />
        <textarea
          className="w-full rounded-xl border border-[var(--border)] px-4 py-3 h-40"
          placeholder="Describe your idea (materials, colors, size)"
        />
        <button className="btn btn-primary">Send request</button>
      </form>
    </main>
  );
}
