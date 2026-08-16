import { Shield, TrendingUp, BarChart4, LineChart, Compass, Layers, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, StatTile, ChapterHeading } from "@/components/shared/section-card";
import { FormulaPanel } from "@/components/articles/article-visuals";
import { getTopicConfig } from "./config";

export function VRPContent() {
  const config = getTopicConfig('vrp');

  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={Shield}>
      <div className="space-y-8">
        {/* 1. What is VRP? */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="What is VRP?" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The Volatility Risk Premium is the systematic difference between <strong className="text-gray-900 dark:text-gray-100">Implied Volatility</strong> (IV) —
            what options markets price in — and <strong className="text-gray-900 dark:text-gray-100">Realized Volatility</strong> (RV) — what actually happens. It&apos;s
            the structural reason option <em>sellers</em> have a statistical edge on average, even though buyers are the ones getting the &quot;insurance.&quot;
          </p>
          <FormulaPanel
            title="VRP"
            formula="\text{VRP} = \text{IV} - \text{RV}"
            legend="Historically positive, meaning IV > RV on average"
          />
        </div>

        {/* 2. Why VRP Exists */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Why VRP Exists" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StatTile title="Insurance Premium" icon={Shield}>
              Options are insurance contracts. Like all insurance, buyers pay a premium above expected claims to
              compensate sellers for taking on risk.
            </StatTile>
            <StatTile title="Fear Premium" icon={TrendingUp}>
              Markets systematically overprice tail risk. Investors pay extra for protection against large moves
              that occur less frequently than feared.
            </StatTile>
            <StatTile title="Supply & Demand" icon={BarChart4}>
              More natural buyers (hedgers, speculators) than sellers creates structural imbalance that keeps
              option prices elevated.
            </StatTile>
            <StatTile title="Behavioral Bias" icon={LineChart}>
              Investors exhibit volatility clustering bias, overweighting recent volatility when forming
              expectations about future moves.
            </StatTile>
          </div>
        </div>

        {/* 3. How to Harvest the VRP */}
        <SectionCard title="How to Harvest the VRP" icon={Layers} tone="accent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <StatTile title="Covered Calls">Own stock + sell calls to generate income from VRP while maintaining upside participation.</StatTile>
            <StatTile title="Cash-Secured Puts">Sell puts with cash backing to get paid while waiting to buy stocks at desired prices.</StatTile>
            <StatTile title="Iron Condors">Pure VRP play — profit when realized volatility is less than implied volatility.</StatTile>
          </div>
        </SectionCard>

        {/* 4. Risks and Considerations */}
        <SectionCard title="Risks & Considerations" icon={AlertTriangle} tone="neg">
          <ul>
            <li><strong>Volatility Explosions:</strong> VRP can turn negative during market crises (2008, 2020, etc.)</li>
            <li><strong>Regime Changes:</strong> VRP magnitude varies across market cycles and economic conditions</li>
            <li><strong>Tail Risk:</strong> Small probability of large losses when &quot;selling insurance&quot;</li>
            <li><strong>Liquidity Risk:</strong> Options markets can become illiquid during stress periods</li>
            <li><strong>Model Risk:</strong> VRP strategies rely on statistical relationships that can break down</li>
          </ul>
        </SectionCard>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Compass} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Compass className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Options 101</h4>
                <p>
                  New to options? Start with the fundamentals before harvesting VRP — see{" "}
                  <Link href="/option/topics/option101" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Options 101 <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Layers className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Gamma Exposure (GEX)</h4>
                <p>
                  Dealer positioning from selling premium affects market volatility itself — see{" "}
                  <Link href="/option/topics/gex" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    GEX <ArrowRight className="h-3 w-3" />
                  </Link>{" "}
                  for the other side of the trade.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <TrendingUp className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Rolling & Adjustments</h4>
                <p>
                  Managing a VRP-harvesting position when it moves against you — see{" "}
                  <Link href="/option/topics/roll" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Rolling Options <ArrowRight className="h-3 w-3" />
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
