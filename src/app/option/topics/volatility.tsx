import { Activity, TrendingUp, BarChart3, Brain, Eye, Shield, Zap, RefreshCw, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, StatTile, ChapterHeading } from "@/components/shared/section-card";
import { ComparisonGrid, ComparisonCard, FormulaPanel } from "@/components/articles/article-visuals";
import { getTopicConfig } from "./config";

export function VolatilityContent() {
  const config = getTopicConfig('volatility');

  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={Activity}>
      <div className="space-y-8">
        {/* 1. Understanding Volatility */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="Understanding Volatility" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Volatility measures the magnitude of price movements in financial markets. In options trading,
            we distinguish between <strong className="text-gray-900 dark:text-gray-100">Historical Volatility</strong> (what happened) and{" "}
            <strong className="text-gray-900 dark:text-gray-100">Implied Volatility</strong> (what the market expects).
          </p>
          <FormulaPanel
            title="Volatility"
            formula="\sigma = \text{Standard Deviation of Returns}"
            legend="Higher volatility = larger expected price swings"
          />
        </div>

        {/* 2. Types of Volatility */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Types of Volatility" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StatTile title="Historical Volatility" icon={BarChart3}>
              Backward-looking measure calculated from past price movements. Shows how much the asset actually
              moved over a specific period.
            </StatTile>
            <StatTile title="Implied Volatility" icon={Eye}>
              Forward-looking measure derived from option prices. Represents the market&apos;s collective expectation
              of future price movements.
            </StatTile>
          </div>
        </div>

        {/* 3. The Volatility Smile Phenomenon */}
        <div className="space-y-3">
          <ChapterHeading number={3} title="The Volatility Smile Phenomenon" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The volatility smile is a persistent pattern where implied volatility varies with strike price,
            contradicting the Black-Scholes assumption of constant volatility.
          </p>
          <ComparisonGrid>
            <ComparisonCard title="Volatility Smile (FX Markets)" tone="neutral" items={[
              "Symmetrical U-shape where IV is lowest at-the-money and increases for both in-the-money and out-of-the-money options.",
            ]} />
            <ComparisonCard title="Volatility Skew (Equity Markets)" tone="neg" items={[
              "Asymmetrical pattern where out-of-the-money puts have much higher IV than out-of-the-money calls, reflecting crash fears.",
            ]} />
          </ComparisonGrid>
        </div>

        {/* 4. Market Psychology */}
        <div className="space-y-3">
          <ChapterHeading number={4} title="Market Psychology" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatTile title="Crash-o-phobia" icon={Brain} tone="neg">
              Post-1987 crash, markets developed permanent fear of sudden drops, creating structural demand for
              downside protection.
            </StatTile>
            <StatTile title="Fat Tails" icon={Activity} tone="neg">
              Markets exhibit more extreme moves than normal distribution predicts, leading to higher volatility
              for out-of-the-money options.
            </StatTile>
            <StatTile title="Supply/Demand" icon={TrendingUp}>
              Asymmetric usage: puts for protection, calls for speculation and income, creating imbalanced supply
              and demand dynamics.
            </StatTile>
          </div>
        </div>

        {/* 5. Trading Applications */}
        <SectionCard title="Trading Applications" icon={Zap} tone="accent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <StatTile title="Sentiment Analysis">Use volatility patterns to gauge market fear and complacency levels.</StatTile>
            <StatTile title="Risk Management">Advanced Greeks (Vanna, Volga) help manage smile risk in portfolios.</StatTile>
            <StatTile title="Arbitrage">Exploit inconsistencies across strikes and expirations for relative value trades.</StatTile>
          </div>
        </SectionCard>

        {/* 6. Key Concepts to Master */}
        <SectionCard title="Key Concepts to Master" icon={Brain} tone="accent">
          <ul>
            <li><strong>Black-Scholes&apos; constant-volatility assumption fails empirically</strong> — the entire volatility smile/skew phenomenon exists specifically because real markets violate the model&apos;s core assumption, which is why practitioners use it as a quoting convention rather than a literal pricing truth.</li>
            <li><strong>Put-call parity</strong> is the no-arbitrage relationship linking call price, put price, strike, and underlying — a useful sanity check, since skew shows up as calls and puts at the same strike no longer implying the same &quot;fair&quot; volatility once you look past parity&apos;s core relationship.</li>
            <li><strong>Negative skewness</strong> means real return distributions have a longer left tail than a normal curve — large crashes happen more often than large rallies of the same size, which is exactly what equity skew (expensive downside puts) is pricing in.</li>
            <li><strong>Excess kurtosis</strong> (&quot;fat tails&quot;) means extreme moves in either direction happen more often than a normal distribution predicts — the statistical basis for why far OTM options are priced higher than Black-Scholes alone would suggest.</li>
          </ul>
        </SectionCard>

        {/* 7. Advanced Volatility Models */}
        <SectionCard title="Advanced Volatility Models" icon={Activity} tone="accent">
          <ul>
            <li><strong>Heston Model:</strong> Stochastic volatility with mean reversion and correlation effects.</li>
            <li><strong>SABR Model:</strong> Stochastic Alpha Beta Rho for interest rates and FX.</li>
            <li><strong>Local Volatility:</strong> Dupire model making volatility function of spot and time.</li>
            <li><strong>Jump-Diffusion:</strong> Merton model incorporating discontinuous price jumps.</li>
          </ul>
        </SectionCard>

        {/* 8. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Compass} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Zap className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Volatility Risk Premium</h4>
                <p>
                  Elevated implied volatility relative to what actually realizes is the entire basis of the VRP trade — see{" "}
                  <Link href="/option/topics/vrp" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    VRP <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <RefreshCw className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Gamma Exposure (GEX)</h4>
                <p>
                  Dealer hedging flows are a major driver of realized volatility, feeding directly back into the IV-RV relationship — see{" "}
                  <Link href="/option/topics/gex" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    GEX <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Shield className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Derivatives Pricing</h4>
                <p>
                  For how the models above (Heston, SABR, local vol) actually get implemented in pricing engines — see{" "}
                  <Link href="/quant/topics/derivatives-pricing" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Derivatives Pricing <ArrowRight className="h-3 w-3" />
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
