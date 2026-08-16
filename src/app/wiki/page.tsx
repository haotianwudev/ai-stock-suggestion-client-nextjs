import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { WikiIndex } from "@/components/wiki/wiki-index";

export const metadata: Metadata = {
  title: "Wiki — SOPHIE Quantitative & Macro Knowledge Base",
  description:
    "Browse concept pages distilled from SOPHIE's deep-research articles: options strategy, quant finance, machine learning, macroeconomics, and 13F portfolios.",
};

export default function WikiPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#121110] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
          <WikiIndex />
        </div>
      </main>
      <Disclaimer />
    </div>
  );
}
