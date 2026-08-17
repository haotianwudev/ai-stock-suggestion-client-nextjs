"use client";

// The only file layout.tsx (a Server Component) ever imports for the chat widget. `next/dynamic`
// with `ssr: false` is only valid inside a Client Component, hence this thin wrapper.
//
// Both guards below are evaluated on values Next.js inlines to literal build-time constants in
// the client bundle (NODE_ENV and any NEXT_PUBLIC_* var), so in a production build — where
// NODE_ENV is always "production" and NEXT_PUBLIC_ENABLE_CHAT is never set (see .env.example) —
// this entire module's reachable code collapses to `return null`, letting the dynamic import of
// chat-widget.tsx (and everything it pulls in: @assistant-ui/*, @ag-ui/*) be eliminated rather
// than merely hidden at runtime. Verified by grepping the production build output — see
// sophie-pipeline/docs/SOPHIE_AGENT.md's Phase 2 verification steps.

import dynamic from "next/dynamic";

const ChatWidget =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("./chat-widget").then((m) => m.ChatWidget), { ssr: false })
    : null;

export function DevChatMount() {
  if (!ChatWidget) return null;
  if (process.env.NEXT_PUBLIC_ENABLE_CHAT !== "true") return null;
  return <ChatWidget />;
}
