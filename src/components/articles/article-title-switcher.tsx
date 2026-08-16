"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import { articles } from "@/data/articles";
import { ChevronDown, Search, BookOpen, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SlotKicker } from "@/components/articles/article-frame";

export interface ArticleTitleSwitcherProps {
  currentSlug: string;
  title: string;
  labels?: string[];
}

export function ArticleTitleSwitcher({
  currentSlug,
  title,
}: ArticleTitleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const publishedArticles = useMemo(() => {
    return articles.filter((a) => !a.isVideo && !a.noSummary && a.slug);
  }, []);

  const filteredArticles = useMemo(() => {
    let list = publishedArticles;

    if (selectedFilter === "options") {
      list = list.filter((a) => a.options || a.labels?.includes("Options Trading" as any));
    } else if (selectedFilter === "quant") {
      list = list.filter((a) => a.labels?.includes("Quantitative Finance" as any));
    } else if (selectedFilter === "recent") {
      list = list.slice(0, 25);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q) ||
          a.date.toLowerCase().includes(q)
      );
    }

    return list;
  }, [publishedArticles, selectedFilter, searchQuery]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block w-full max-w-4xl"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      <div
        className="group inline-flex items-center gap-2.5 cursor-pointer select-none"
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 transition-colors group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52]">
          {title}
        </h1>
        <div className="shrink-0 size-7 sm:size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] group-hover:bg-[#A8672E]/10 dark:group-hover:bg-[#D08F52]/10 flex items-center justify-center transition-all duration-200 shadow-xs mt-1">
          <ChevronDown
            className={`size-3.5 sm:size-4 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#A8672E] dark:text-[#D08F52]" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute left-0 top-full mt-2 z-50 w-full max-w-xl sm:max-w-2xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          {/* Header */}
          <div className="space-y-3 pb-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <SlotKicker icon={BookOpen} label="Articles" tone="accent" />
              <span className="text-[11px] font-mono text-muted-foreground">
                {filteredArticles.length} of {publishedArticles.length}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-3.5 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8.5 h-8 text-xs bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-xl"
                autoFocus
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs">
              {[
                { id: "all", label: "All" },
                { id: "recent", label: "Latest" },
                { id: "options", label: "Options" },
                { id: "quant", label: "Quant" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedFilter === filter.id
                      ? "bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-gray-950 shadow-xs"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Article List */}
          <div className="mt-3 max-h-72 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
            {filteredArticles.length === 0 ? (
              <p className="py-8 text-center text-xs text-muted-foreground">
                No matching articles.
              </p>
            ) : (
              filteredArticles.map((article) => {
                const isCurrent = article.slug === currentSlug;
                return (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-start justify-between gap-3 p-2.5 rounded-xl border transition-colors ${
                      isCurrent
                        ? "border-[#A8672E] dark:border-[#D08F52] bg-[#A8672E]/5 dark:bg-[#D08F52]/10"
                        : "border-gray-200 dark:border-gray-800 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-xs font-semibold leading-snug line-clamp-1 ${
                            isCurrent
                              ? "text-[#A8672E] dark:text-[#D08F52]"
                              : "text-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {article.title}
                        </span>
                        {isCurrent && (
                          <Badge
                            variant="secondary"
                            className="text-[9px] px-1.5 py-0 bg-[#A8672E]/15 text-[#A8672E] dark:text-[#D08F52]"
                          >
                            Active
                          </Badge>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span>{article.date}</span>
                        {article.options && <span>&middot; Options</span>}
                      </div>
                    </div>
                    <ArrowRight className="size-3.5 text-gray-400 shrink-0 mt-1 opacity-0 group-hover:opacity-100" />
                  </Link>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
