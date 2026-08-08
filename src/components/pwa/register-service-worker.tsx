"use client";

import { useEffect } from "react";

/**
 * Registers the no-op passthrough service worker at public/sw.js. Its only
 * purpose is satisfying Chrome's PWA installability checks (a fetch-handling
 * service worker is one of the criteria for `beforeinstallprompt` to fire --
 * see hooks/use-install-prompt.ts) -- it does no caching, so it can't serve
 * stale content. Mounted once in Header since that's global on every page.
 */
export function RegisterServiceWorker() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Best-effort -- a failed registration just means no install prompt,
      // not a broken app.
    });
  }, []);

  return null;
}
