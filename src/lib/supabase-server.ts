// src/lib/supabase-server.ts
import { cookies } from "next/headers";
import { createServerClient, parseCookieHeader } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function supabaseServer() {
  const cookieStore = await cookies(); // <-- await is required in Next 15

  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        // Build a single header since ssr helper expects raw header parse
        const header = cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join("; ");
        return parseCookieHeader(header);
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options as any);
        });
      },
    },
  });
}
