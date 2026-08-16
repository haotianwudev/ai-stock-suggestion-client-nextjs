import { Zap, TrendingUp, BarChart4, Target, AlertTriangle, Shield, RefreshCw, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, StatTile, ChapterHeading } from "@/components/shared/section-card";
import { ComparisonGrid, ComparisonCard, FormulaPanel } from "@/components/articles/article-visuals";
import { getTopicConfig } from "./config";

export function GEXContent() {
  const config = getTopicConfig('gex');

  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={Zap}>
      <div className="space-y-8">
        {/* 1. What is GEX? */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="What is GEX?" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-gray-100">Gamma Exposure (GEX)</strong> measures the aggregate gamma position of market makers across all options.
            It reveals how market makers must hedge their positions, directly influencing market volatility and price action.
          </p>
          <FormulaPanel
            title="GEX"
            formula="\text{GEX} = \sum (\Gamma \times \text{OI} \times S^2)"
            legend="Positive GEX = suppressed volatility · Negative GEX = amplified volatility"
          />
        </div>

        {/* 2. GEX Mechanics */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="GEX Mechanics" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StatTile title="Positive GEX" icon={TrendingUp} tone="pos">
              Market makers are <strong>long gamma</strong>. They buy when prices fall and sell when prices rise,
              acting as a stabilizing force that reduces volatility.
            </StatTile>
            <StatTile title="Negative GEX" icon={AlertTriangle} tone="neg">
              Market makers are <strong>short gamma</strong>. They sell when prices fall and buy when prices rise,
              creating momentum that amplifies market moves.
            </StatTile>
            <StatTile title="Zero Gamma" icon={Target}>
              Critical inflection point where market behavior shifts from suppressed to amplified volatility. Often
              acts as strong support/resistance.
            </StatTile>
            <StatTile title="GEX Levels" icon={BarChart4}>
              High GEX strikes act as magnets, pulling price toward them. Low GEX areas allow for more volatile
              price discovery.
            </StatTile>
          </div>
        </div>

        {/* 3. GEX Trading Applications */}
        <SectionCard title="GEX Trading Applications" icon={Zap} tone="accent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <StatTile title="Support/Resistance">High positive GEX levels act as strong support/resistance where price tends to gravitate.</StatTile>
            <StatTile title="Volatility Regime">Positive GEX = range-bound markets. Negative GEX = trending, volatile markets.</StatTile>
            <StatTile title="Breakout Prediction">Monitor zero gamma levels for potential breakout points and regime changes.</StatTile>
          </div>
        </SectionCard>

        {/* 4. Market Maker Hedging Mechanics */}
        <div className="space-y-3">
          <ChapterHeading number={4} title="Market Maker Hedging Mechanics" />
          <ComparisonGrid>
            <ComparisonCard title="Long Gamma (Positive GEX)" tone="pos" items={[
              "Price ↓ → MM buys stock (support)",
              "Price ↑ → MM sells stock (resistance)",
              "Result: volatility suppression",
            ]} />
            <ComparisonCard title="Short Gamma (Negative GEX)" tone="neg" items={[
              "Price ↓ → MM sells stock (momentum)",
              "Price ↑ → MM buys stock (momentum)",
              "Result: volatility amplification",
            ]} />
          </ComparisonGrid>
        </div>

        {/* 5. Key GEX Concepts */}
        <SectionCard title="Key GEX Concepts" icon={Target} tone="accent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4>Gamma Flip</h4>
              <p>The price level where aggregate gamma changes from positive to negative, marking a shift in market dynamics.</p>
            </div>
            <div>
              <h4>Dealer Positioning</h4>
              <p>Market makers typically sell options to retail, making them short gamma and long delta, requiring constant hedging.</p>
            </div>
            <div>
              <h4>Charm Effect</h4>
              <p>As options approach expiration, gamma concentrates at-the-money, creating stronger pin effects.</p>
            </div>
            <div>
              <h4>Expiration Effects</h4>
              <p>OpEx days see increased volatility as large gamma positions expire, reducing market maker hedging flows.</p>
            </div>
          </div>
        </SectionCard>

        {/* 6. Risks and Limitations */}
        <SectionCard title="Where GEX Analysis Breaks Down" icon={AlertTriangle} tone="neg">
          <ul>
            <li><strong>Data Quality:</strong> GEX calculations rely on estimated open interest and positioning data</li>
            <li><strong>Market Regime:</strong> GEX effects can be overwhelmed by fundamental news or macro events</li>
            <li><strong>Timing:</strong> GEX levels change throughout the day as positions are opened/closed</li>
            <li><strong>Complexity:</strong> Multiple factors influence market maker hedging beyond just gamma</li>
            <li><strong>False Signals:</strong> GEX levels can provide false breakout signals during low volume periods</li>
          </ul>
        </SectionCard>

        {/* 7. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Compass} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Shield className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Volatility Risk Premium</h4>
                <p>
                  GEX describes dealer hedging flows; VRP describes why premium sellers have an edge on average — the
                  two interact directly, since dealer positioning is a byproduct of who&apos;s selling that premium — see{" "}
                  <Link href="/option/topics/vrp" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    VRP <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <RefreshCw className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>The Greeks</h4>
                <p>
                  GEX is built entirely from aggregated gamma — a solid grip on what gamma actually measures makes GEX
                  much more intuitive — see{" "}
                  <Link href="/option/topics/greeks" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Greeks <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Compass className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Options 101</h4>
                <p>
                  New to options? Build the fundamentals before diving into dealer positioning — see{" "}
                  <Link href="/option/topics/option101" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Options 101 <ArrowRight className="h-3 w-3" />
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
