import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const AUTH_TIMEOUT_MS = 5000;
// Read client-side by AuthDegradedBanner (src/components/auth/auth-degraded-banner.tsx)
// to tell the user login is down for an upstream reason, not a bug in their session.
const AUTH_DEGRADED_COOKIE = "sophie-auth-degraded";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response;
  }

  // Skip the Supabase network round trip when there's no session cookie to
  // refresh. This is the overwhelming majority of requests (anonymous
  // visitors, bots, RSS pollers) — they have nothing for getUser() to
  // refresh, and client-side auth (use-user.tsx) already reads sessions
  // locally without hitting the network. Running getUser() unconditionally
  // on every one of these was the actual cost driver (84% of Function CPU).
  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => /^sb-.*-auth-token/.test(c.name));
  if (!hasAuthCookie) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refreshes the session cookie if it's expired — required so server
  // components/route handlers see a valid session on every request.
  // Timeout-guarded: a slow/unreachable Supabase auth endpoint must not
  // hang the middleware invocation and take down every route on the site.
  const timeout = new Promise<"timeout">((resolve) =>
    setTimeout(() => resolve("timeout"), AUTH_TIMEOUT_MS)
  );
  const result = await Promise.race([
    supabase.auth.getUser().then(() => "ok" as const),
    timeout,
  ]);

  if (result === "timeout") {
    response.cookies.set(AUTH_DEGRADED_COOKIE, "1", { maxAge: 30, path: "/" });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
