import { supabaseServer } from "@/lib/supabase-server";

export async function GET() {
  const sb = await supabaseServer();
  const { data, error, count } = await sb
    .from("products")
    .select("id, slug, name, price_cents, image", {
      count: "exact",
      head: false,
    })
    .order("created_at", { ascending: false })
    .limit(5);

  return new Response(
    JSON.stringify(
      {
        ok: !error,
        count: count ?? data?.length ?? 0,
        data,
        error: error && {
          message: error.message,
          details: (error as any).details,
          hint: (error as any).hint,
          code: (error as any).code,
        },
      },
      null,
      2
    ),
    { headers: { "content-type": "application/json" } }
  );
}
