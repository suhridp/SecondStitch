// src/lib/supabase-server.ts
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function supabaseServer() {
  const cookieStore = await cookies(); // Next 15 may be async

  // NOTE: implement ONLY get/set/remove to satisfy the deprecated adapter shape.
  return createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        // string | undefined is OK for this shape
        return cookieStore.get(name)?.value;
      },
      // In most RSC/route contexts, Next's cookies are read-only; use no-ops here.
      set(_name: string, _value: string, _options: CookieOptions) {
        /* no-op in read-only context */
      },
      remove(_name: string, _options: CookieOptions) {
        /* no-op in read-only context */
      },
    },
  });
}

export function supabaseClient() {
  return createClient(url, anon);
}

export function supabaseAdmin() {
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, service);
}
