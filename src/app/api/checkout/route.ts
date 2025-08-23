import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

type CartItem = {
  slug: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as {
    items: CartItem[];
    redeem_points?: number;
  };

  const sb = await supabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();

  if (!body.items?.length) {
    return NextResponse.json(
      { ok: false, error: "Cart is empty" },
      { status: 400 }
    );
  }

  const redeemPoints = Math.max(0, Math.floor(body.redeem_points || 0));
  const discountCents = redeemPoints; // 1 pt = 1¢

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
    body.items.map((i) => ({
      quantity: i.qty,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(i.price * 100),
        product_data: {
          name: i.name,
          images: i.image ? [i.image] : undefined,
          metadata: { slug: i.slug },
        },
      },
    }));

  let discounts: Stripe.Checkout.SessionCreateParams["discounts"] = undefined;
  if (discountCents > 0) {
    const coupon = await stripe.coupons.create({
      amount_off: discountCents,
      currency: "usd",
      duration: "once",
    });
    discounts = [{ coupon: coupon.id }];
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL!;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    discounts,
    success_url: `${site}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site}/cart`,
    metadata: { user_id: user?.id ?? "", redeem_points: String(redeemPoints) },
  });

  const subtotal = body.items.reduce(
    (s, i) => s + Math.round(i.price * 100) * i.qty,
    0
  );

  await supabaseAdmin()
    .from("orders")
    .insert([
      {
        user_id: user?.id ?? null,
        stripe_session_id: session.id,
        subtotal_cents: subtotal,
        points_redeemed: redeemPoints,
        status: "created",
      },
    ]);

  return NextResponse.json({ ok: true, id: session.id, url: session.url });
}
