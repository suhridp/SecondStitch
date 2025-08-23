"use client";
export default function Error({
  error,
  reset,
}: {
  error: any;
  reset: () => void;
}) {
  console.error("Products route error:", error);
  return (
    <main className="container py-10">
      <h1 className="text-xl font-semibold">We couldn’t load products.</h1>
      <p className="mt-2 text-sm text-slate-600">Please try again.</p>
      <button onClick={reset} className="btn btn-outline mt-4">
        Retry
      </button>
    </main>
  );
}
