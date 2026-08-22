"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Layers,
} from "lucide-react";
import { WikiMarkdown } from "@/components/wiki/wiki-markdown";
import { WikiEntry } from "@/data/wiki";
import { Article } from "@/data/articles/types";
import { SlotKicker } from "@/components/articles/article-frame";
import { CommentSection } from "@/components/comments/comment-section";

const CATEGORY_NAMES: Record<string, string> = {
  form13f: "13F Institutional Portfolios",
  quant: "Quantitative Finance & ML",
  finance101: "Financial Foundations & Tax",
  "stock-analysis": "Fundamental Stock Analysis",
  "option-strategy": "Option Derivatives & Volatility",
  macro: "Macroeconomics & Business Cycles",
};

interface WikiDetailProps {
  entry: WikiEntry;
  content: string;
  category: string;
  categoryTitle: string;
  wikiPath: string;
  siblingEntries: WikiEntry[];
  allCategories: string[];
  companionArticle: Article | null;
}

export function WikiDetail({
  entry,
  content,
  category,
  categoryTitle,
  wikiPath,
  siblingEntries,
  allCategories,
  companionArticle,
}: WikiDetailProps) {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center flex-wrap gap-1.5 text-xs text-muted-foreground">
        <Link href="/wiki" className="hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors">
          Wiki
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href={`/wiki/${category}`}
          className="capitalize hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors"
        >
          {categoryTitle}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium truncate max-w-xs">{entry.title}</span>
      </nav>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content (8-col) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Concept Hero Header Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <SlotKicker icon={BookOpen} label="Concept Specification" tone="accent" />
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] border border-[#A8672E]/20">
                  {category}
                </span>
                {entry.date && (
                  <span className="text-xs font-mono text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">
                    {entry.date}
                  </span>
                )}
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
              {entry.title}
            </h1>

            {entry.summary && (
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 border-l-4 border-[#A8672E] dark:border-[#D08F52] pl-4 py-1 italic bg-[#A8672E]/5 dark:bg-[#D08F52]/5 rounded-r-xl leading-relaxed">
                {entry.summary}
              </p>
            )}
          </div>

          {/* Concept Markdown Body */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-10 shadow-sm">
            <WikiMarkdown content={content} />
          </div>

          {/* Companion Research Article Card */}
          {companionArticle && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-3">
              <SlotKicker icon={GraduationCap} label="Companion Research Article" tone="accent" />
              <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-gray-100">
                {companionArticle.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {companionArticle.description}
              </p>
              <div className="pt-2">
                <Link
                  href={`/articles/${companionArticle.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-[#A8672E] hover:bg-[#8f5726] dark:bg-[#D08F52] dark:hover:bg-[#c17f47] text-white dark:text-gray-950 transition-colors shadow-sm"
                >
                  Read Full Article &amp; View Media <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Community Comments */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <CommentSection
              contentSlug={`wiki-${wikiPath.replace(/\//g, "-")}`}
              title={`${entry.title} Discussion`}
            />
          </div>
        </div>

        {/* Sidebar Column (4-col) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20 self-start">
          {/* Back to Wiki Button */}
          <Link
            href="/wiki"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-[#A8672E] dark:hover:text-[#D08F52] shadow-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Wiki Index
          </Link>

          {/* Sibling Concepts in Category */}
          {siblingEntries.length > 0 && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between gap-2">
                <SlotKicker icon={Layers} label="In This Domain" tone="accent" />
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] border border-[#A8672E]/20">
                  {siblingEntries.length + 1} Concepts
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {categoryTitle}
              </div>

              <div className="flex flex-col gap-2">
                {siblingEntries.slice(0, 5).map((sib) => (
                  <Link
                    key={sib.path}
                    href={`/wiki/${sib.path}`}
                    className="group flex items-start gap-2.5 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800/80 bg-gray-50/40 dark:bg-gray-800/30 hover:border-[#A8672E]/30 dark:hover:border-[#D08F52]/30 hover:bg-[#A8672E]/5 dark:hover:bg-[#D08F52]/5 transition-all"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-all" />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors line-clamp-2 leading-snug">
                        {sib.title}
                      </span>
                      {sib.date && (
                        <span className="text-[10px] font-mono text-muted-foreground mt-0.5 block">
                          {sib.date}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href={`/wiki/${category}`}
                className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-[#A8672E]/10 dark:hover:bg-[#D08F52]/10 hover:border-[#A8672E]/30 dark:hover:border-[#D08F52]/30 text-xs font-semibold text-[#A8672E] dark:text-[#D08F52] transition-colors"
              >
                <span>View all {siblingEntries.length + 1} concepts</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}

          {/* Browse All Domains */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm space-y-3.5">
            <SlotKicker icon={BookOpen} label="All Knowledge Domains" tone="accent" />
            <div className="flex flex-col gap-1.5">
              {allCategories.map((cat) => {
                const isCurrent = cat === category;
                const catName = CATEGORY_NAMES[cat] ?? cat.replace(/-/g, " ");
                return (
                  <Link
                    key={cat}
                    href={`/wiki/${cat}`}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      isCurrent
                        ? "border-[#A8672E]/40 dark:border-[#D08F52]/40 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] font-semibold"
                        : "border-transparent hover:border-gray-200 dark:hover:border-gray-800/80 hover:bg-gray-50/60 dark:hover:bg-gray-800/40 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="truncate">{catName}</span>
                    <ArrowRight className="h-3 w-3 shrink-0 ml-1 opacity-60" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
