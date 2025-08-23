import Link from "next/link";
export default function ThankYouPage() {
  return (
    <main className="container pt-24 pb-24 max-w-2xl">
      <h1 className="h1">Thank you</h1>
      <p className="copy mt-6">
        Your order was received. We emailed your receipt and will notify you
        when it ships.
      </p>
      <Link href="/products" className="underline">
        Continue shopping
      </Link>
    </main>
  );
}
