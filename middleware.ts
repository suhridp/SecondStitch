// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(req.headers.get("cookie") ?? "");
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            res.headers.append(
              "set-cookie",
              serializeCookieHeader(name, value, options)
            );
          });
        },
      },
    }
  );

  // triggers refresh if needed
  await supabase.auth.getUser();

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
