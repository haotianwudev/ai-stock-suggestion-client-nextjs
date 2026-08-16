import { Calculator, TrendingUp, Activity, Clock, Waves, Percent } from "lucide-react";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { StatTile, ChapterHeading } from "@/components/shared/section-card";
import { getTopicConfig } from "./config";
import { GreeksTab } from "@/components/options/greeks-tab";

export function GreeksContent() {
  const config = getTopicConfig('greeks');

  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={Calculator}>
      <div className="space-y-8">
        {/* Key Terms — grounding before the interactive calculator below */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="Key Terms" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatTile title="Delta" icon={TrendingUp}>
              How much the option&apos;s price moves for a $1 move in the underlying — also a rough proxy for the
              probability the option finishes in-the-money.
            </StatTile>
            <StatTile title="Gamma" icon={Activity}>
              How much Delta itself changes for a $1 move in the underlying — the &quot;acceleration&quot; of an option&apos;s
              price sensitivity, highest for at-the-money options near expiration.
            </StatTile>
            <StatTile title="Theta" icon={Clock} tone="neg">
              How much value the option loses per day simply from time passing — always working against a long
              option holder and in favor of a seller, all else equal.
            </StatTile>
            <StatTile title="Vega" icon={Waves}>
              How much the option&apos;s price changes for a 1-point move in implied volatility — the Greek most exposed
              to the VRP dynamics covered elsewhere on this site.
            </StatTile>
            <div className="md:col-span-2">
              <StatTile title="Rho" icon={Percent}>
                How much the option&apos;s price changes for a 1% move in interest rates — usually the smallest-impact
                Greek for short-dated equity options, but more material for long-dated options (LEAPS) and rates
                products.
              </StatTile>
            </div>
          </div>
        </div>

        {/* Interactive calculator */}
        <GreeksTab />
      </div>
    </TopicDetailShell>
  );
}
