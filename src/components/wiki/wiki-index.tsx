"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  X,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
  FileText,
} from "lucide-react";
import { wikiEntries, getWikiCategories } from "@/data/wiki";
import { SlotKicker } from "@/components/articles/article-frame";

const CATEGORY_NAMES: Record<string, string> = {
  form13f: "13F Institutional Portfolios",
  quant: "Quantitative Finance & ML",
  finance101: "Financial Foundations & Tax",
  "stock-analysis": "Fundamental Stock Analysis",
  "option-strategy": "Option Derivatives & Volatility",
  macro: "Macroeconomics & Business Cycles",
};

export function WikiIndex() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => getWikiCategories(), []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const entry of wikiEntries) {
      const cat = entry.path.split("/")[0];
      counts[cat] = (counts[cat] ?? 0) + 1;
    }
    return counts;
  }, []);

  const filtered = useMemo(() => {
    return wikiEntries.filter((entry) => {
      const category = entry.path.split("/")[0];
      if (selectedCategory && category !== selectedCategory) return false;
      if (searchText) {
        const haystack = `${entry.title} ${entry.summary} ${entry.path}`.toLowerCase();
        if (!haystack.includes(searchText.toLowerCase())) return false;
      }
      return true;
    });
  }, [searchText, selectedCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof wikiEntries>();
    for (const entry of filtered) {
      const category = entry.path.split("/")[0];
      map.set(category, [...(map.get(category) ?? []), entry]);
    }
    return map;
  }, [filtered]);

  return (
    <div className="space-y-8">
      {/* Hero Header Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <SlotKicker icon={BookOpen} label="Knowledge Base" tone="accent" />
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-3">
          SOPHIE Quantitative &amp; Macro Wiki
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed">
          Distilled conceptual specifications, mathematical models, volatility mechanics, and macroeconomic
          frameworks extracted directly from our deep-research library.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <div className="bg-gray-50/50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 border-l-4 border-l-[#A8672E] dark:border-l-[#D08F52] rounded-xl p-3.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-0.5">
              Total Concepts
            </span>
            <span className="text-xl font-bold font-mono text-gray-900 dark:text-gray-100">
              {wikiEntries.length}
            </span>
          </div>
          <div className="bg-gray-50/50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 border-l-4 border-l-[#1D8A70] dark:border-l-[#3CBF9C] rounded-xl p-3.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-0.5">
              Knowledge Domains
            </span>
            <span className="text-xl font-bold font-mono text-gray-900 dark:text-gray-100">
              {categories.length}
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-gray-50/50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 border-l-4 border-l-[#2563eb] dark:border-l-[#3b82f6] rounded-xl p-3.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-0.5">
              Filtered Matches
            </span>
            <span className="text-xl font-bold font-mono text-gray-900 dark:text-gray-100">
              {filtered.length}
            </span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search concepts, mathematical formulas, models, or keywords..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A8672E]/40 dark:focus:ring-[#D08F52]/40 text-sm shadow-sm transition-all"
          />
          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              selectedCategory === null
                ? "bg-[#A8672E] dark:bg-[#D08F52] text-white dark:text-gray-950 border-transparent shadow-sm"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40"
            }`}
          >
            All Domains ({wikiEntries.length})
          </button>
          {categories.map((category) => {
            const count = categoryCounts[category] ?? 0;
            const isSelected = selectedCategory === category;
            const label = CATEGORY_NAMES[category] ?? category.replace(/-/g, " ");
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(isSelected ? null : category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  isSelected
                    ? "bg-[#A8672E] dark:bg-[#D08F52] text-white dark:text-gray-950 border-transparent shadow-sm"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40"
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Concept Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
          <BookOpen className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
            No wiki entries match your search
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Try adjusting your search query or removing the category filter.
          </p>
          <button
            onClick={() => {
              setSearchText("");
              setSelectedCategory(null);
            }}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[#A8672E] dark:bg-[#D08F52] text-white dark:text-gray-950"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {[...grouped.entries()].map(([category, entries]) => {
            const domainTitle = CATEGORY_NAMES[category] ?? category.replace(/-/g, " ");
            return (
              <div key={category} className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52]" />
                    <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-gray-100 capitalize">
                      {domainTitle}
                    </h2>
                  </div>
                  <Link
                    href={`/wiki/${category}`}
                    className="text-xs font-semibold text-[#A8672E] dark:text-[#D08F52] hover:underline inline-flex items-center gap-1"
                  >
                    View Domain ({entries.length})
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

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

                        <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors line-clamp-2 mb-2">
                          {entry.title}
                        </h3>

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
          })}
        </div>
      )}
    </div>
  );
}
