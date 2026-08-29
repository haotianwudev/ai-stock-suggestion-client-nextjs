"use client";

import { useEffect } from "react";
import { toast } from "sonner";

const COOKIE_NAME = "sophie-auth-degraded";

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

/**
 * Middleware sets this cookie when its Supabase auth refresh times out
 * server-side (src/middleware.ts). Surfacing it here tells the user the
 * outage is an upstream Supabase issue, not a bug in their session.
 */
export function AuthDegradedBanner() {
  useEffect(() => {
    if (readCookie(COOKIE_NAME) === "1") {
      toast.error(
        "Login is temporarily unavailable due to an upstream authentication issue. Please try again shortly.",
        { duration: 8000 }
      );
      clearCookie(COOKIE_NAME);
    }
  }, []);

  return null;
}
