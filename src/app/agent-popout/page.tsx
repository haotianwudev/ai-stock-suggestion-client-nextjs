"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Sparkles, X } from "lucide-react";

const ChatThread = dynamic(
  () => import("@/components/chat/chat-thread").then((m) => m.ChatThread),
  { ssr: false }
);

const LOCAL_HOSTNAMES = ["localhost", "127.0.0.1"];

export default function AgentPopoutPage() {
  const [profile, setProfile] = useState("generalist");
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(LOCAL_HOSTNAMES.includes(window.location.hostname));
  }, []);

  if (!allowed) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4 text-center">
        <p className="text-sm text-gray-500">Sophie Agent is local dev only.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white dark:bg-gray-900">
      {/* Top Standalone Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-gray-100 dark:border-gray-800 bg-[#FDFBF7] dark:bg-[#121110] select-none shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <Sparkles className="size-4 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
          <span className="font-serif font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
            Sophie Agent{" "}
            <span className="text-[10px] font-sans font-normal text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              Standalone Window
            </span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => window.close()}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          title="Close standalone window"
          aria-label="Close window"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Main Chat Thread */}
      <div className="flex-1 min-h-0 relative">
        <ChatThread profile={profile} onProfileChange={setProfile} />
      </div>
    </div>
  );
}
