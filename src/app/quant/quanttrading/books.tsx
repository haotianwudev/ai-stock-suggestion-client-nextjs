'use client';

import { BookOpen, LineChart, Layers, Brain, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/shared/page-template";
import { getQuantTopicConfig } from "./config";

function ChapterHeading({ number, title, colorClass }: { number: number; title: string; colorClass: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full ${colorClass} text-white text-xs md:text-sm font-bold flex-shrink-0`}>
        {number}
      </span>
      <h3 className="text-lg md:text-xl font-semibold text-rose-900">{title}</h3>
    </div>
  );
}

export function BooksContent() {
  // Get configuration for books
  const config = getQuantTopicConfig('books');

  const heroColorScheme = {
    border: "border-rose-200",
    background: "bg-gradient-to-br from-rose-50 to-pink-50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    titleColor: "text-rose-900",
    descriptionColor: "text-rose-700",
    cardBg: "bg-white",
    cardBorder: "border border-rose-100",
    cardText: "text-rose-900",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-800",
    sectionTitle: "text-rose-900"
  };

  const contentSections = (
    <>
      <p className="text-xs md:text-sm text-rose-600 -mt-1">
        Sophie doesn't have chapter-by-chapter summaries of these on-site yet — but they're the standard shelf every
        systematic trader eventually reads, so here's what each one actually teaches.
      </p>

      {/* 1. Getting Started */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Getting Started" colorClass="bg-rose-600" />
        <Card className="border-rose-100 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base flex items-center gap-2">
              <LineChart className="h-4 w-4 text-rose-600 flex-shrink-0" /> Quantitative Trading — Ernest P. Chan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs md:text-sm text-rose-700 leading-relaxed">
              Widely treated as the entry point for retail quant trading. Walks through backtesting fundamentals, mean
              reversion vs. momentum strategy selection, and the unglamorous mechanics — data cleaning, transaction
              cost modeling, capacity constraints — that separate a strategy that backtests well from one that survives
              live trading.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2. Building a Rulebook */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Building a Rulebook" colorClass="bg-rose-600" />
        <Card className="border-rose-100 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base flex items-center gap-2">
              <Layers className="h-4 w-4 text-rose-600 flex-shrink-0" /> Systematic Trading — Robert Carver
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs md:text-sm text-rose-700 leading-relaxed">
              Written by a former hedge fund trader, this is the deepest treatment of position sizing and risk allocation
              across a portfolio of systematic rules — how much to bet on each signal so no single rule can blow up the
              account, and how to combine uncorrelated strategies into one coherent system.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. Machine Learning for Trading */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Machine Learning for Trading" colorClass="bg-rose-600" />
        <Card className="border-rose-100 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base flex items-center gap-2">
              <Brain className="h-4 w-4 text-rose-600 flex-shrink-0" /> Advances in Financial Machine Learning — Marcos López de Prado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs md:text-sm text-rose-700 leading-relaxed">
              The reference text on why standard ML techniques quietly fail on financial data (non-IID samples, leakage
              from overlapping labels) and how to fix them — meta-labeling, purged cross-validation, and fractional
              differentiation are all introduced here and now show up throughout the quant ML literature.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 4. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Related & Advanced Topics" colorClass="bg-rose-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Compass className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">Systematic Strategies</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                Start here for the rule-based foundations these books build on — see{" "}
                <Link href="/quant/quanttrading/systematic-strategies" className="underline underline-offset-2 hover:text-rose-900 inline-flex items-center gap-0.5">
                  Systematic Strategies <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Brain className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">Machine Learning</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                For the site's own walkthrough of ML-based quant approaches — see{" "}
                <Link href="/quant/quanttrading/machine-learning" className="underline underline-offset-2 hover:text-rose-900 inline-flex items-center gap-0.5">
                  Machine Learning <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<BookOpen className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Quant Books Guide"
    />
  );
}
