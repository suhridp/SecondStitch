// src/lib/products-server.ts
import { supabaseServer } from "@/lib/supabase-server";
import type { DbProduct } from "./products-types"; // keep your canonical product type here

// Extra types for variants & photos
export type DbVariant = {
  id: string;
  product_id: string;
  sku: string;
  option1: string | null; // e.g. size
  option2: string | null; // e.g. color
  price_cents: number | null; // null => inherit product.price_cents
  stock: number;
};

export type DbPhoto = {
  id: string;
  product_id: string;
  path: string; // storage key, e.g. "product-images/jacket-2.jpg"
  sort: number | null;
};

const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Turn a storage key into a public URL
export function publicImageUrl(path?: string | null) {
  if (!path) return "/images/placeholder.jpg";
  return `${base}/storage/v1/object/public/${String(path).replace(/^\/+/, "")}`;
}

// List products (server)
export async function getAllProducts(): Promise<DbProduct[]> {
  const sb = await supabaseServer();
  const { data, error } = await sb
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllProducts error:", {
      message: error.message,
      details: (error as any).details,
      hint: (error as any).hint,
      code: (error as any).code,
    });
    return [];
  }
  return (data || []) as DbProduct[];
}

// Single product by slug (basic)
export async function getProductBySlug(
  slug: string
): Promise<DbProduct | null> {
  const sb = await supabaseServer();
  const { data, error } = await sb
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("getProductBySlug error:", {
      message: error.message,
      details: (error as any).details,
      hint: (error as any).hint,
      code: (error as any).code,
    });
    return null;
  }
  return (data as DbProduct) || null;
}

// Product + variants + extra photos (for PDP)
export async function getProductBySlugFull(slug: string): Promise<{
  product: DbProduct | null;
  variants: DbVariant[];
  photos: DbPhoto[];
}> {
  const sb = await supabaseServer();

  const { data: p } = await sb
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!p) return { product: null, variants: [], photos: [] };

  const [{ data: variants }, { data: photos }] = await Promise.all([
    sb
      .from("product_variants")
      .select("*")
      .eq("product_id", p.id)
      .order("option1", { ascending: true }),
    sb
      .from("product_photos")
      .select("*")
      .eq("product_id", p.id)
      .order("sort", { ascending: true }),
  ]);

  return {
    product: p as DbProduct,
    variants: (variants || []) as DbVariant[],
    photos: (photos || []) as DbPhoto[],
  };
}
