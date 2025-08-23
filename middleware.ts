// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  // Clone request headers for downstream fetches
  const requestHeaders = new Headers(req.headers);

  // Prepare a response we can mutate cookies on
  const res = NextResponse.next({ request: { headers: requestHeaders } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Use NextRequest/NextResponse cookie helpers (typed correctly)
        getAll() {
          // NextRequest.cookies.getAll() returns { name: string; value: string }[]
          return req.cookies.getAll().map((c) => ({
            name: c.name,
            value: c.value,
          }));
        },
        setAll(cookies) {
          // Each cookie: { name: string; value: string; options?: CookieOptions }
          cookies.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Touch auth to ensure any updated cookies are written to the response
  await supabase.auth.getSession();

  return res;
}

// (Optional) limit middleware to specific paths; adjust to your needs:
export const config = {
  matcher: [
    // run on everything except static & API routes, or tailor:
    "/((?!_next/static|_next/image|favicon.ico|images|hero|api/contact).*)",
  ],
};
