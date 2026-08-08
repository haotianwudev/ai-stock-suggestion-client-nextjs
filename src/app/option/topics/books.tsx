'use client';

import { BookOpen, Brain, Shield, Repeat, Zap, Layers, Target, Scale, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

function ChapterHeading({ number, title, colorClass }: { number: number; title: string; colorClass: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full ${colorClass} text-white text-xs md:text-sm font-bold flex-shrink-0`}>
        {number}
      </span>
      <h3 className="text-lg md:text-xl font-semibold text-amber-900">{title}</h3>
    </div>
  );
}

export function BooksContent() {
  // Get configuration for books
  const config = getTopicConfig('books');

  const heroColorScheme = {
    border: "border-amber-200",
    background: "bg-gradient-to-br from-amber-50 to-yellow-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    titleColor: "text-amber-900",
    descriptionColor: "text-amber-700",
    cardBg: "bg-white",
    cardBorder: "border border-amber-100",
    cardText: "text-amber-900",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    sectionTitle: "text-amber-900"
  };

  const contentSections = (
    <>
      {/* 1. The Option Trader's Mindset */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="The Option Trader's Mindset" colorClass="bg-amber-600" />
        <Card className="border-amber-100 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base flex items-center gap-2">
              <Brain className="h-4 w-4 text-amber-600 flex-shrink-0" /> What It Covers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xs md:text-sm text-amber-700 leading-relaxed">
              A four-part psychology-first walkthrough of options trading: <strong>Part 1 (Ch. 1-4)</strong> resets how you
              think about risk, adaptation, and personal habits before touching a single trade. <strong>Part 2 (Ch. 5-7)</strong>{" "}
              covers choosing a strategy, the Iron Condor mindset specifically, and the tighter discipline weekly Iron Condors
              demand. <strong>Part 3 (Ch. 8-9)</strong> grounds the Greeks and theta/time decay in how a disciplined trader
              actually uses them. <strong>Part 4</strong> works through the mindset needed around expectations, losses,
              trading costs, hidden risk, and adjustments — the parts of trading psychology that only show up after you've
              lost money at least once.
            </p>
            <p className="text-xs text-amber-600">
              Read the full chapter-by-chapter summary:{" "}
              <Link href="/articles/option-traders-mindset-book-summary" className="underline underline-offset-2 hover:text-amber-900">
                The Option Trader's Mindset
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2. Profiting with Iron Condor Options */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Profiting with Iron Condor Options" colorClass="bg-amber-600" />
        <Card className="border-amber-100 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base flex items-center gap-2">
              <Layers className="h-4 w-4 text-amber-600 flex-shrink-0" /> What It Covers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xs md:text-sm text-amber-700 leading-relaxed">
              A strategy-specific deep dive structured in four parts: <strong>The Essence of the Iron Condor</strong> (why
              selling a defined-risk range works as a premium-collection strategy), <strong>Mastering the Greeks</strong>{" "}
              (how Delta, Theta, Vega, and Gamma each move against an open condor), <strong>The 3 Pillars of a Winning
              Strategy</strong> (strike selection, position sizing, and adjustment rules working together), and{" "}
              <strong>Trade Examples from the Frontline</strong> (real setups showing what actually happens when a trade
              goes wrong, not just when it works).
            </p>
            <p className="text-xs text-amber-600">
              Read the full summary:{" "}
              <Link href="/articles/profiting-iron-condor-options-book-summary" className="underline underline-offset-2 hover:text-amber-900">
                Profiting with Iron Condor Options
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. Diagonal Spread vs. Covered Call */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Diagonal Spread vs. Covered Call" colorClass="bg-amber-600" />
        <Card className="border-amber-100 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base flex items-center gap-2">
              <Scale className="h-4 w-4 text-amber-600 flex-shrink-0" /> What It Covers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xs md:text-sm text-amber-700 leading-relaxed">
              A head-to-head, quantitative comparison of two popular income strategies on the same underlying: the classic
              covered call (own 100 shares, sell a call against it) versus the diagonal spread (a longer-dated long call
              standing in for the shares, with a shorter-dated call sold against it). The core question it answers is capital
              efficiency — the diagonal ties up far less capital for similar income potential, at the cost of added
              complexity and time-decay risk on the long leg.
            </p>
            <p className="text-xs text-amber-600">
              Read the full comparison:{" "}
              <Link href="/articles/diagonal-spread-vs-covered-call-strategic-quantitative-comparison" className="underline underline-offset-2 hover:text-amber-900">
                Diagonal Spread vs. Covered Call
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 4. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Related & Advanced Topics" colorClass="bg-amber-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Shield className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Options 101</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                New to options entirely? Start with the fundamentals before these strategy-specific books — see{" "}
                <Link href="/option/topics/option101" className="underline underline-offset-2 hover:text-amber-900 inline-flex items-center gap-0.5">
                  Options 101 <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Target className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">The Greeks</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                Both the Iron Condor and diagonal spread books lean heavily on Greeks intuition — see{" "}
                <Link href="/option/topics/greeks" className="underline underline-offset-2 hover:text-amber-900 inline-flex items-center gap-0.5">
                  Greeks <ArrowRight className="h-3 w-3" />
                </Link>{" "}
                for the interactive calculator and definitions.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Repeat className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Rolling &amp; Adjustments</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                Both books devote real space to what to do when a trade moves against you — see{" "}
                <Link href="/option/topics/roll" className="underline underline-offset-2 hover:text-amber-900 inline-flex items-center gap-0.5">
                  Rolling Options <ArrowRight className="h-3 w-3" />
                </Link>{" "}
                for the mechanics of adjusting rather than closing.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Zap className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm md:text-base">Volatility Risk Premium</h4>
              <p className="text-xs md:text-sm text-amber-700 leading-relaxed mt-1">
                The Iron Condor is fundamentally a VRP-harvesting strategy — understanding why selling premium has a
                structural edge (and where it breaks down) sharpens everything in these books — see{" "}
                <Link href="/option/topics/vrp" className="underline underline-offset-2 hover:text-amber-900 inline-flex items-center gap-0.5">
                  VRP <ArrowRight className="h-3 w-3" />
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
      infographicAlt="Options Books Guide"
    />
  );
}
