// src/lib/supabase-server.ts
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function supabaseServer() {
  // ✅ Next 15 can make this async
  const cookieStore = await cookies();

  return createServerClient(url, anon, {
    cookies: {
      // can be sync or async; both are accepted by @supabase/ssr
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      // 🚫 Readonly store has no `set`. Use no-ops in RSC/Route contexts.
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
