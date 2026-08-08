'use client';

import { GraduationCap, Brain, TrendingUp, AlertTriangle, Leaf, Vote, Bitcoin, Ban, Wallet, LineChart, ArrowRight } from "lucide-react";
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
      <h3 className="text-lg md:text-xl font-semibold text-rose-900">{title}</h3>
    </div>
  );
}

export function Finance101Content() {
  // Get configuration for finance 101
  const config = getTopicConfig('finance-101');

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
      {/* 1. Investor Psychology */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Investor Psychology" colorClass="bg-rose-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Brain className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">The Behavior Gap</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                Annual studies of fund-flow timing (e.g. DALBAR-style research) consistently find that the average investor's
                actual return trails the funds they hold — not because the funds underperform, but because investors buy
                after a rally and sell after a drop. The market doesn't need to beat you; your own timing does that on its own.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">Loss Aversion &amp; Overconfidence</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                Losses hurt roughly twice as much (psychologically) as equivalent gains feel good, which pushes people to
                hold losers too long. Overconfidence does the opposite damage — it pushes people to trade too often and
                concentrate too much in "high conviction" ideas that are really just familiar ones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Market Structure & Hype */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Market Structure &amp; Hype" colorClass="bg-rose-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="border-rose-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-rose-600 flex-shrink-0" /> Meme Stocks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed">
                Coordinated retail buying can force a short squeeze — short-sellers forced to buy back shares at any price
                to close a losing position, which mechanically pushes the price even higher, independent of the company's
                actual fundamentals.
              </p>
            </CardContent>
          </Card>
          <Card className="border-rose-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Ban className="h-4 w-4 text-rose-600 flex-shrink-0" /> Viral "AI Picks" Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed">
                Screenshots of eye-popping backtested or cherry-picked "AI stock picks" almost never disclose the losing
                calls or the time period selected — a track record isn't credible without knowing the full sample and the
                exact rules used in advance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. New Frontiers */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="New Frontiers" colorClass="bg-rose-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Leaf className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">ESG Investing</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                Environmental, Social, and Governance scores attempt to quantify non-financial risk — but scoring
                methodologies vary widely between providers, and "greenwashing" (marketing a fund as ESG-focused with
                minimal actual screening) is common enough that the label alone isn't a reliable signal.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Vote className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">Prediction Markets</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                Markets where contracts pay out based on real-world event outcomes (elections, Fed decisions) aggregate many
                participants' information into a single price — research has repeatedly found these prices can out-forecast
                individual expert opinion and polls, because bad predictions cost the predictor real money.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Bitcoin className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">Bitcoin, DeFi &amp; Stablecoins</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                Bitcoin's pitch is digitally-enforced scarcity (a fixed 21M supply cap); DeFi ("decentralized finance") is
                lending, trading, and borrowing implemented as self-executing smart contracts instead of a bank; stablecoins
                (pegged 1:1 to a currency like USD) exist mainly as the on/off-ramp connecting the two worlds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Common Pitfalls */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Common Pitfalls" colorClass="bg-red-500" />
        <Card className="border-red-200 bg-red-50/50 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" /> Where Beginners Lose Money
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Performance chasing:</span>
              <span>Buying whatever just went up (a fund, a sector, a coin) tends to buy in near a local top — by the
                time a trend is obvious enough to notice, much of the move has already happened.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Ignoring fees:</span>
              <span>A 1% annual expense ratio difference compounds into a large gap in ending wealth over decades — fees
                are one of the few things in investing you can control with certainty.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">No written plan:</span>
              <span>Without a plan defining what you own and why, market noise fills the vacuum — decisions get made
                reactively, in the moment, which is exactly when behavioral biases are strongest.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Related & Advanced Topics" colorClass="bg-rose-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Wallet className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">Wealth Planning</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                Once the fundamentals click, the next step is turning them into an actual plan — see{" "}
                <Link href="/stock/investment/wealth-planning" className="underline underline-offset-2 hover:text-rose-900 inline-flex items-center gap-0.5">
                  Wealth Planning <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <LineChart className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-rose-900 text-sm md:text-base">Stock Analysis</h4>
              <p className="text-xs md:text-sm text-rose-700 leading-relaxed mt-1">
                For evaluating an individual company rather than market psychology — see{" "}
                <Link href="/stock/stock-analysis/stock-analysis" className="underline underline-offset-2 hover:text-rose-900 inline-flex items-center gap-0.5">
                  Stock Analysis <ArrowRight className="h-3 w-3" />
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
      heroIcon={<GraduationCap className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Finance 101 Guide"
    />
  );
}
