// Minimal service worker whose only job is to satisfy Chrome's PWA
// installability criteria (a fetch-handling service worker is one of the
// checks before it will fire `beforeinstallprompt` -- see
// src/hooks/use-install-prompt.ts). No caching or offline strategy: every
// request passes straight through to the network, so this can never serve
// stale content.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
