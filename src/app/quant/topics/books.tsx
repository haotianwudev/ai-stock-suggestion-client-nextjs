import { BookOpen, LineChart, Layers, Brain, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, ChapterHeading } from "@/components/shared/section-card";
import { getTopicConfig } from "./config";

export function BooksContent() {
  const config = getTopicConfig('books');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={BookOpen}>
      <div className="space-y-8">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Sophie doesn&apos;t have chapter-by-chapter summaries of these on-site yet — but they&apos;re the standard shelf
          every systematic trader eventually reads, so here&apos;s what each one actually teaches.
        </p>

        {/* 1. Getting Started */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="Getting Started" />
          <SectionCard title="Quantitative Trading — Ernest P. Chan" icon={LineChart} tone="accent">
            <p>
              Widely treated as the entry point for retail quant trading. Walks through backtesting fundamentals,
              mean reversion vs. momentum strategy selection, and the unglamorous mechanics — data cleaning,
              transaction cost modeling, capacity constraints — that separate a strategy that backtests well from one
              that survives live trading.
            </p>
          </SectionCard>
        </div>

        {/* 2. Building a Rulebook */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Building a Rulebook" />
          <SectionCard title="Systematic Trading — Robert Carver" icon={Layers} tone="accent">
            <p>
              Written by a former hedge fund trader, this is the deepest treatment of position sizing and risk
              allocation across a portfolio of systematic rules — how much to bet on each signal so no single rule
              can blow up the account, and how to combine uncorrelated strategies into one coherent system.
            </p>
          </SectionCard>
        </div>

        {/* 3. Machine Learning for Trading */}
        <div className="space-y-3">
          <ChapterHeading number={3} title="Machine Learning for Trading" />
          <SectionCard title="Advances in Financial Machine Learning — Marcos López de Prado" icon={Brain} tone="accent">
            <p>
              The reference text on why standard ML techniques quietly fail on financial data (non-IID samples,
              leakage from overlapping labels) and how to fix them — meta-labeling, purged cross-validation, and
              fractional differentiation are all introduced here and now show up throughout the quant ML literature.
            </p>
          </SectionCard>
        </div>

        {/* 4. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Compass} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Compass className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Systematic Strategies</h4>
                <p>
                  Start here for the rule-based foundations these books build on — see{" "}
                  <Link href="/quant/quanttrading/systematic-strategies" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Systematic Strategies <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Brain className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Machine Learning</h4>
                <p>
                  For the site&apos;s own walkthrough of ML-based quant approaches — see{" "}
                  <Link href="/quant/quanttrading/machine-learning" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Machine Learning <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
