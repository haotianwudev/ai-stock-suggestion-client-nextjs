"use client";

import Link from "next/link";
import { ChevronRight, Layers, ArrowRight, FileText } from "lucide-react";
import { WikiEntry } from "@/data/wiki";
import { SlotKicker } from "@/components/articles/article-frame";

interface WikiCategoryProps {
  category: string;
  categoryTitle: string;
  entries: WikiEntry[];
}

export function WikiCategory({ category, categoryTitle, entries }: WikiCategoryProps) {
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
      </div>

      {/* Concepts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map((entry) => (
          <Link
            key={entry.path}
            href={`/wiki/${entry.path}`}
            className="group flex flex-col justify-between p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#A8672E]/50 dark:hover:border-[#D08F52]/50 hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] border border-[#A8672E]/20">
                  {category}
                </span>
                {entry.date && (
                  <span className="text-[10px] font-mono text-muted-foreground">
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
