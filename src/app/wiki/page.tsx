import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { WikiIndex } from "@/components/wiki/wiki-index";

export const metadata: Metadata = {
  title: "Wiki — SOPHIE Knowledge Base",
  description: "Browse concept pages distilled from SOPHIE's deep-research articles: options strategy, quant, macro, and more.",
};

export default function WikiPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">Wiki</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Concept pages distilled from our deep-research articles — browsable, searchable knowledge base.
        </p>
        <WikiIndex />
      </main>
    </div>
  );
}
