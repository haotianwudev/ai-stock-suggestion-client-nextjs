"use client";

// Renders wiki_search's `ui` envelope as citation cards, reusing the WikiCard link/route
// convention from article-frame.tsx (wiki entries live at /wiki/<path>).

import Link from "next/link";
import { BookOpen } from "lucide-react";

interface WikiCitationUi {
  component: "wiki_citations";
  results: Array<{
    path: string;
    title: string;
    category: string;
    summary: string | null;
    labels: string[];
    score: number;
  }>;
}

export function WikiCitationList({ ui }: { ui: WikiCitationUi }) {
  if (!ui.results.length) return null;
  return (
    <div className="space-y-1.5 my-2 max-w-md">
      {ui.results.slice(0, 5).map((r) => (
        <Link
          key={r.path}
          href={`/wiki/${r.path}`}
          target="_blank"
          className="flex items-start gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5 hover:border-[#A8672E] dark:hover:border-[#D08F52] transition-colors"
        >
          <BookOpen className="size-3.5 mt-0.5 shrink-0 text-[#A8672E] dark:text-[#D08F52]" />
          <div className="min-w-0">
            <div className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">{r.title}</div>
            {r.summary && (
              <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">{r.summary}</div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
