"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";
import { WikiMarkdown } from "./wiki-markdown";
import { stripFrontmatter, wikiPathToPublicFile, wikiPathToRoute } from "@/lib/wiki";
import { getWikiEntryForArticle } from "@/data/wiki";

interface WikiPanelProps {
  articleSlug: string;
}

export function WikiPanel({ articleSlug }: WikiPanelProps) {
  const entry = getWikiEntryForArticle(articleSlug);
  const [content, setContent] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    if (!entry) {
      setStatus("missing");
      return;
    }
    let cancelled = false;
    setStatus("loading");
    fetch(wikiPathToPublicFile(entry.path))
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.text();
      })
      .then((raw) => {
        if (cancelled) return;
        const { content: body } = stripFrontmatter(raw);
        setContent(body);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("missing");
      });
    return () => {
      cancelled = true;
    };
  }, [entry]);

  if (status === "loading") {
    return (
      <div className="space-y-3 animate-pulse py-6">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
      </div>
    );
  }

  if (status === "missing" || !entry) {
    return (
      <div className="flex flex-col items-center text-center py-12 px-4">
        <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-3" />
        <p className="text-slate-500 dark:text-slate-400">
          Wiki entry coming soon for this article.
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <WikiMarkdown content={content ?? ""} />
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
        <Link
          href={wikiPathToRoute(entry.path)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          View full wiki page
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
