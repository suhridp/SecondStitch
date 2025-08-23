import { supabaseServer } from "@/lib/supabase-server";
import type { PostgrestError } from "@supabase/supabase-js";

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

  const err = error as PostgrestError | null;

  return new Response(
    JSON.stringify(
      {
        ok: !err,
        count: count ?? data?.length ?? 0,
        data,
        error: err && {
          message: err.message,
          details: err.details,
          hint: err.hint,
          code: err.code,
        },
      },
      null,
      2
    ),
    { headers: { "content-type": "application/json" } }
  );
}
