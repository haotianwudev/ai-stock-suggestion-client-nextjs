"use client";

// The floating launcher + panel. This file statically imports ChatThread (and therefore
// @assistant-ui/* + @ag-ui/*) — that's fine, because nothing in a production build ever imports
// THIS file: layout.tsx only reaches it through a next/dynamic() call gated behind
// `process.env.NODE_ENV === "development"`, which Next.js inlines to the literal `false` in
// production, letting the dynamic import itself (and everything only reachable through it) be
// eliminated rather than merely hidden at runtime. See docs/SOPHIE_AGENT.md's Phase 2 section for
// the full three-layer localhost-only rationale — this file only implements layer 3 (the runtime
// hostname guard), since layers 1 and 2 are enforced by whether this module is ever loaded at all.

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { ChatThread } from "./chat-thread";

const LOCAL_HOSTNAMES = ["localhost", "127.0.0.1"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState("generalist");
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // Layer 3: even if this code somehow shipped, refuse to mount against a non-local hostname.
    setAllowed(LOCAL_HOSTNAMES.includes(window.location.hostname));
  }, []);

  if (!allowed) return null;

  return (
    <div className="fixed bottom-4 right-20 z-50">
      {open ? (
        <div className="w-96 h-[32rem] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-800 bg-[#FDFBF7] dark:bg-[#121110]">
            <span className="font-serif font-semibold text-sm text-gray-900 dark:text-gray-100">
              Sophie Agent <span className="text-[10px] font-sans font-normal text-gray-400">(local dev only)</span>
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
              aria-label="Close chat"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <ChatThread profile={profile} onProfileChange={setProfile} />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-[#A8672E] dark:bg-[#D08F52] text-white p-3.5 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          aria-label="Open Sophie Agent chat"
          title="Sophie Agent (local dev only)"
        >
          <MessageCircle className="size-5" />
        </button>
      )}
    </div>
  );
}
