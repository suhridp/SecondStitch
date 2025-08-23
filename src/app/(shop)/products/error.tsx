"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  // Optional: keep for debugging
  console.error("Products route error:", error);

  return (
    <main className="container py-10" aria-labelledby="products-error-title">
      <h1 id="products-error-title" className="text-xl font-semibold">
        We couldn’t load products.
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        {error.message || "Unknown error"}
      </p>
      <button onClick={reset} className="btn btn-outline mt-4">
        Retry
      </button>
    </main>
  );
}
