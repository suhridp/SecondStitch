import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.warn(
    "STRIPE_SECRET_KEY is not set. Checkout will fail until you add it to .env.local"
  );
}
const stripe = key
  ? new Stripe(key, { apiVersion: "2024-06-20" })
  : (null as unknown as Stripe);

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items" }, { status: 400 });
    }

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      req.headers.get("origin") ||
      "http://localhost:3000";

    const line_items = items.map((it: any) => ({
      quantity: it.qty ?? 1,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(((it.product?.price ?? it.price) || 0) * 100),
        product_data: {
          name: it.product?.name ?? it.name,
          description: it.product?.subtitle ?? it.subtitle ?? undefined,
          images: it.product?.image
            ? [`${origin}${it.product.image}`]
            : undefined,
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}
