"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Layers, ArrowRight, FileText } from "lucide-react";
import { WikiEntry } from "@/data/wiki";
import { SlotKicker } from "@/components/articles/article-frame";

interface WikiCategoryProps {
  category: string;
  categoryTitle: string;
  entries: WikiEntry[];
}

const ALL = "All";

export function WikiCategory({ category, categoryTitle, entries }: WikiCategoryProps) {
  // Sub-topics present in THIS category, with counts. Derived from the entries rather than a
  // fixed list so a category with no topics assigned simply renders no filter bar.
  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const e of entries) {
      for (const t of e.topics ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [entries]);

  const untaggedCount = useMemo(
    () => entries.filter((e) => !e.topics?.length).length,
    [entries]
  );

  const [active, setActive] = useState<string>(ALL);

  const visible = useMemo(
    () => (active === ALL ? entries : entries.filter((e) => e.topics?.includes(active))),
    [entries, active]
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/wiki" className="hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors">
          Wiki
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium capitalize">{categoryTitle}</span>
      </nav>

      {/* Category Header Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-2">
          <SlotKicker icon={Layers} label="Knowledge Domain" tone="accent" />
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] border border-[#A8672E]/20">
            {entries.length} Concepts
          </span>
        </div>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 capitalize mb-3">
          {categoryTitle}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
          Explore core specifications, mathematical structures, and research insights categorized under {categoryTitle}.
        </p>

        {/* Sub-topic filter. Only rendered when this category actually has topics assigned. */}
        {topics.length > 0 && (
          <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mr-1">
                Topics
              </span>
              {[[ALL, entries.length] as const, ...topics].map(([name, count]) => {
                const isActive = active === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setActive(name)}
                    aria-pressed={isActive}
                    className={`text-xs font-medium px-3 py-1 rounded-full border transition-all ${
                      isActive
                        ? "bg-[#A8672E] dark:bg-[#D08F52] text-white dark:text-[#14171B] border-transparent font-semibold"
                        : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-[#A8672E]/50 dark:hover:border-[#D08F52]/50 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    {name}
                    <span className={`ml-1.5 font-mono ${isActive ? "opacity-80" : "text-muted-foreground"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
            {untaggedCount > 0 && (
              <p className="mt-2 text-[11px] text-muted-foreground">
                {untaggedCount} page{untaggedCount === 1 ? "" : "s"} in this category have no topic yet and appear only under “{ALL}”.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Concepts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((entry) => (
          <Link
            key={entry.path}
            href={`/wiki/${entry.path}`}
            className="group flex flex-col justify-between p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#A8672E]/50 dark:hover:border-[#D08F52]/50 hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                {/* Topic, not category: the category is redundant here — you're already on
                    its page — whereas the topic is what distinguishes one card from another. */}
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] border border-[#A8672E]/20 truncate max-w-[70%]">
                  {entry.topics?.[0] ?? category}
                </span>
                {entry.date && (
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                    {entry.date}
                  </span>
                )}
              </div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors line-clamp-2 mb-2">
                {entry.title}
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                {entry.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 font-medium text-[#A8672E] dark:text-[#D08F52] group-hover:translate-x-0.5 transition-transform">
                Read concept <ArrowRight className="h-3 w-3" />
              </span>
              {entry.articleSlug && (
                <span className="inline-flex items-center gap-1 text-[11px]">
                  <FileText className="h-3 w-3" /> Research
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
