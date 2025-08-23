// Build a public URL for files stored in Supabase Storage (public buckets)
export function publicImageUrl(path: string | null | undefined) {
  if (!path) return "/images/placeholder.jpg";
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  return `${base}/storage/v1/object/public/${path.replace(/^\/+/, "")}`;
}
