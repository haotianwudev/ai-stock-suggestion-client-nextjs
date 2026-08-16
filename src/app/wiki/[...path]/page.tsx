import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { stripFrontmatter } from "@/lib/wiki";
import {
  wikiEntries,
  getWikiEntryByPath,
  getWikiEntriesByCategory,
  getWikiCategories,
} from "@/data/wiki";
import { getArticleBySlug } from "@/lib/article-utils";
import { WikiCategory } from "@/components/wiki/wiki-category";
import { WikiDetail } from "@/components/wiki/wiki-detail";

type Params = { path: string[] };

const CATEGORY_NAMES: Record<string, string> = {
  form13f: "13F Institutional Portfolios",
  quant: "Quantitative Finance & ML",
  finance101: "Financial Foundations & Tax",
  "stock-analysis": "Fundamental Stock Analysis",
  "option-strategy": "Option Derivatives & Volatility",
  macro: "Macroeconomics & Business Cycles",
};

function readWikiFile(wikiPath: string): string | null {
  const filePath = path.join(process.cwd(), "public", "wiki", `${wikiPath}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export function generateStaticParams() {
  const categoryParams = [...new Set(wikiEntries.map((e) => e.path.split("/")[0]))].map((category) => ({
    path: [category],
  }));
  const entryParams = wikiEntries.map((entry) => ({ path: entry.path.split("/") }));
  return [...categoryParams, ...entryParams];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { path: segments } = await params;
  const wikiPath = segments.join("/");
  const entry = getWikiEntryByPath(wikiPath);
  if (!entry) {
    const categoryName = CATEGORY_NAMES[segments[0]] ?? segments[segments.length - 1];
    return { title: `${categoryName} — Wiki | SOPHIE` };
  }
  return {
    title: `${entry.title} — Wiki | SOPHIE`,
    description: entry.summary,
  };
}

export default async function WikiEntryPage({ params }: { params: Promise<Params> }) {
  const { path: segments } = await params;
  const wikiPath = segments.join("/");

  // ── Bare category URL (e.g. /wiki/option-strategy) ──────────────────────────
  if (segments.length === 1 && !getWikiEntryByPath(wikiPath)) {
    const category = segments[0];
    const entries = getWikiEntriesByCategory(category);
    if (entries.length === 0) notFound();

    const categoryTitle = CATEGORY_NAMES[category] ?? category.replace(/-/g, " ");

    return (
      <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#121110] text-slate-900 dark:text-slate-100 transition-colors">
        <Header />
        <main className="flex-1">
          <WikiCategory
            category={category}
            categoryTitle={categoryTitle}
            entries={entries}
          />
        </main>
        <Disclaimer />
      </div>
    );
  }

  // ── Individual Concept Page ────────────────────────────────────────────────
  const entry = getWikiEntryByPath(wikiPath);
  const raw = readWikiFile(wikiPath);
  if (!entry || !raw) notFound();

  const { content } = stripFrontmatter(raw);
  const category = entry.path.split("/")[0];
  const categoryTitle = CATEGORY_NAMES[category] ?? category.replace(/-/g, " ");

  const companionArticle = entry.articleSlug ? getArticleBySlug(entry.articleSlug) ?? null : null;
  const siblingEntries = getWikiEntriesByCategory(category).filter((e) => e.path !== entry.path);
  const allCategories = getWikiCategories();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#121110] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />
      <main className="flex-1">
        <WikiDetail
          entry={entry}
          content={content}
          category={category}
          categoryTitle={categoryTitle}
          wikiPath={wikiPath}
          siblingEntries={siblingEntries}
          allCategories={allCategories}
          companionArticle={companionArticle}
        />
      </main>
      <Disclaimer />
    </div>
  );
}
