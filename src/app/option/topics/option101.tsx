import { Shield, TrendingUp, DollarSign, LineChart, BarChart4, BookOpenCheck, Compass, Zap, RefreshCw, ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, StatTile, ChapterHeading } from "@/components/shared/section-card";
import { getTopicConfig } from "./config";

export function Option101Content() {
  const config = getTopicConfig('option101');

  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={Shield}>
      <div className="space-y-8">
        {/* 1. The Basics */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="The Basics" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatTile title="Calls & Puts" icon={BookOpenCheck}>
              A <strong className="text-gray-900 dark:text-gray-100">call</strong> gives its buyer the right (not obligation) to <em>buy</em> 100 shares at a fixed{" "}
              <strong className="text-gray-900 dark:text-gray-100">strike price</strong> on or before <strong className="text-gray-900 dark:text-gray-100">expiration</strong>. A{" "}
              <strong className="text-gray-900 dark:text-gray-100">put</strong> gives the right to <em>sell</em> at that strike instead. The buyer pays a{" "}
              <strong className="text-gray-900 dark:text-gray-100">premium</strong> upfront for that right; the seller collects the premium and takes on the obligation if exercised.
            </StatTile>
            <StatTile title="ITM / ATM / OTM" icon={Zap}>
              An option is <strong className="text-gray-900 dark:text-gray-100">in-the-money (ITM)</strong> if exercising it right now would be profitable,{" "}
              <strong className="text-gray-900 dark:text-gray-100">at-the-money (ATM)</strong> if the strike sits right at the current price, and{" "}
              <strong className="text-gray-900 dark:text-gray-100">out-of-the-money (OTM)</strong> if exercising would be worthless. Premium is split between{" "}
              <strong className="text-gray-900 dark:text-gray-100">intrinsic value</strong> (the ITM amount) and <strong className="text-gray-900 dark:text-gray-100">time value</strong> (everything else, which decays to zero by expiration).
            </StatTile>
          </div>
        </div>

        {/* 2. Primary Use Cases */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Primary Use Cases" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <StatTile title="Hedging Risk" icon={Shield} tone="pos">
              Protect existing positions from adverse price movements. Buy puts to hedge long stock positions or calls to hedge short positions.
            </StatTile>
            <StatTile title="Speculation with Leverage" icon={TrendingUp}>
              Control a larger position with less capital. Options provide leveraged exposure to price movements with defined risk.
            </StatTile>
            <StatTile title="Income Generation" icon={DollarSign} tone="pos">
              Sell covered calls or cash-secured puts to generate premium income on existing holdings or available cash.
            </StatTile>
            <StatTile title="Volatility Betting" icon={BarChart4}>
              Trade on your expectations of volatility changes rather than just price direction. Profit from volatility expansion or contraction.
            </StatTile>
            <StatTile title="Capital Efficiency" icon={LineChart} tone="pos">
              Achieve similar exposure to stocks with less capital, freeing up funds for other investments or risk management.
            </StatTile>
          </div>
        </div>

        {/* 3. When NOT to Use Options */}
        <SectionCard title="When NOT to Use Options" icon={AlertTriangle} tone="neg">
          <ul>
            <li><strong>As a &quot;get rich quick&quot; scheme:</strong> Options require skill and knowledge to use effectively.</li>
            <li><strong>Without understanding the Greeks:</strong> Don&apos;t trade what you don&apos;t understand.</li>
            <li><strong>When you can&apos;t afford the maximum loss:</strong> Options can expire worthless.</li>
            <li><strong>Without a clear strategy:</strong> Random option buying often leads to losses.</li>
            <li><strong>In illiquid options:</strong> Wide bid-ask spreads can hurt profitability.</li>
          </ul>
        </SectionCard>

        {/* 4. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Compass} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Compass className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>The Greeks</h4>
                <p>
                  Once the basics click, the Greeks (Delta, Gamma, Theta, Vega) explain exactly how an option&apos;s price
                  reacts to changes in the underlying — see{" "}
                  <Link href="/option/topics/greeks" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Greeks <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Zap className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Volatility Risk Premium</h4>
                <p>
                  For why option sellers have a structural statistical edge on average — see{" "}
                  <Link href="/option/topics/vrp" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    VRP <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <RefreshCw className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Rolling & Adjustments</h4>
                <p>
                  For what to do when an open position moves against you instead of closing at a loss — see{" "}
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
