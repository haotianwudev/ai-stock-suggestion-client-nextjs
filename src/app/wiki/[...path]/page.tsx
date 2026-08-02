import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { WikiMarkdown } from "@/components/wiki/wiki-markdown";
import { stripFrontmatter } from "@/lib/wiki";
import { wikiEntries, getWikiEntryByPath, getWikiEntriesByCategory } from "@/data/wiki";

type Params = { path: string[] };

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
    return { title: `${segments[segments.length - 1]} — Wiki | SOPHIE` };
  }
  return {
    title: `${entry.title} — Wiki | SOPHIE`,
    description: entry.summary,
  };
}

export default async function WikiEntryPage({ params }: { params: Promise<Params> }) {
  const { path: segments } = await params;
  const wikiPath = segments.join("/");

  // Bare category URL (e.g. /wiki/option-strategy) — render category listing
  if (segments.length === 1 && !getWikiEntryByPath(wikiPath)) {
    const category = segments[0];
    const entries = getWikiEntriesByCategory(category);
    if (entries.length === 0) notFound();

    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
          <Link href="/wiki" className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-6">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to Wiki
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 capitalize">
            {category.replace(/-/g, " ")}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {entries.map((entry) => (
              <Link
                key={entry.path}
                href={`/wiki/${entry.path}`}
                className="block p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
              >
                <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{entry.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{entry.summary}</p>
              </Link>
            ))}
          </div>
        </main>
      </div>
    );
  }

  const entry = getWikiEntryByPath(wikiPath);
  const raw = readWikiFile(wikiPath);
  if (!entry || !raw) notFound();

  const { content } = stripFrontmatter(raw);
  const category = entry.path.split("/")[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        <nav className="flex items-center flex-wrap gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/wiki" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Wiki
          </Link>
          <span>/</span>
          <Link href={`/wiki/${category}`} className="capitalize hover:text-indigo-600 dark:hover:text-indigo-400">
            {category.replace(/-/g, " ")}
          </Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300">{entry.title}</span>
        </nav>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10">
          <WikiMarkdown content={content} />
        </div>

        <Link
          href={`/articles/${entry.articleSlug}`}
          className="inline-flex items-center gap-1.5 mt-6 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to article
        </Link>
      </main>
    </div>
  );
}
