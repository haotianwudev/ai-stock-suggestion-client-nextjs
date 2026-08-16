import { BookOpen, Brain, Shield, Repeat, Zap, Layers, Target, Scale, ArrowRight, Compass } from "lucide-react";
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
        {/* 1. The Option Trader's Mindset */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="The Option Trader's Mindset" />
          <SectionCard title="What It Covers" icon={Brain} tone="accent">
            <p>
              A four-part psychology-first walkthrough of options trading: <strong>Part 1 (Ch. 1-4)</strong> resets how you
              think about risk, adaptation, and personal habits before touching a single trade. <strong>Part 2 (Ch. 5-7)</strong>{" "}
              covers choosing a strategy, the Iron Condor mindset specifically, and the tighter discipline weekly Iron
              Condors demand. <strong>Part 3 (Ch. 8-9)</strong> grounds the Greeks and theta/time decay in how a disciplined
              trader actually uses them. <strong>Part 4</strong> works through the mindset needed around expectations,
              losses, trading costs, hidden risk, and adjustments — the parts of trading psychology that only show up
              after you&apos;ve lost money at least once.
            </p>
            <p className="text-xs">
              Read the full chapter-by-chapter summary:{" "}
              <Link href="/articles/option-traders-mindset-book-summary" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">
                The Option Trader&apos;s Mindset
              </Link>
            </p>
          </SectionCard>
        </div>

        {/* 2. Profiting with Iron Condor Options */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Profiting with Iron Condor Options" />
          <SectionCard title="What It Covers" icon={Layers} tone="accent">
            <p>
              A strategy-specific deep dive structured in four parts: <strong>The Essence of the Iron Condor</strong> (why
              selling a defined-risk range works as a premium-collection strategy), <strong>Mastering the Greeks</strong>{" "}
              (how Delta, Theta, Vega, and Gamma each move against an open condor), <strong>The 3 Pillars of a Winning
              Strategy</strong> (strike selection, position sizing, and adjustment rules working together), and{" "}
              <strong>Trade Examples from the Frontline</strong> (real setups showing what actually happens when a trade
              goes wrong, not just when it works).
            </p>
            <p className="text-xs">
              Read the full summary:{" "}
              <Link href="/articles/profiting-iron-condor-options-book-summary" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">
                Profiting with Iron Condor Options
              </Link>
            </p>
          </SectionCard>
        </div>

        {/* 3. Diagonal Spread vs. Covered Call */}
        <div className="space-y-3">
          <ChapterHeading number={3} title="Diagonal Spread vs. Covered Call" />
          <SectionCard title="What It Covers" icon={Scale} tone="accent">
            <p>
              A head-to-head, quantitative comparison of two popular income strategies on the same underlying: the
              classic covered call (own 100 shares, sell a call against it) versus the diagonal spread (a longer-dated
              long call standing in for the shares, with a shorter-dated call sold against it). The core question it
              answers is capital efficiency — the diagonal ties up far less capital for similar income potential, at the
              cost of added complexity and time-decay risk on the long leg.
            </p>
            <p className="text-xs">
              Read the full comparison:{" "}
              <Link href="/articles/diagonal-spread-vs-covered-call-strategic-quantitative-comparison" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">
                Diagonal Spread vs. Covered Call
              </Link>
            </p>
          </SectionCard>
        </div>

        {/* 4. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Compass} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Shield className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Options 101</h4>
                <p>
                  New to options entirely? Start with the fundamentals before these strategy-specific books — see{" "}
                  <Link href="/option/topics/option101" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Options 101 <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Target className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>The Greeks</h4>
                <p>
                  Both the Iron Condor and diagonal spread books lean heavily on Greeks intuition — see{" "}
                  <Link href="/option/topics/greeks" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Greeks <ArrowRight className="h-3 w-3" />
                  </Link>{" "}
                  for the interactive calculator and definitions.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Repeat className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Rolling & Adjustments</h4>
                <p>
                  Both books devote real space to what to do when a trade moves against you — see{" "}
                  <Link href="/option/topics/roll" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Rolling Options <ArrowRight className="h-3 w-3" />
                  </Link>{" "}
                  for the mechanics of adjusting rather than closing.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Zap className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Volatility Risk Premium</h4>
                <p>
                  The Iron Condor is fundamentally a VRP-harvesting strategy — understanding why selling premium has a
                  structural edge (and where it breaks down) sharpens everything in these books — see{" "}
                  <Link href="/option/topics/vrp" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    VRP <ArrowRight className="h-3 w-3" />
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
