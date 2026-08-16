import { Layers, RefreshCw, Scale, Compass, Globe2, GraduationCap, PiggyBank } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, ChapterHeading } from "@/components/shared/section-card";
import { getTopicConfig } from "./config";

export function EtfMutualFundContent() {
  const config = getTopicConfig('etf-mutual-fund');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={Layers}>
      <div className="space-y-8">
        {/* 1. ETF Mechanics */}
        <SectionCard title="ETF Mechanics" icon={RefreshCw} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>Creation & Redemption</h4>
              <p>
                Unlike a mutual fund, an ETF's shares aren't created directly by investor cash — large institutions called
                Authorized Participants assemble a basket of the underlying stocks and swap it with the fund for new ETF
                shares (or vice versa to redeem). This in-kind mechanism is what keeps the ETF's price tightly tethered to
                its underlying holdings throughout the trading day.
              </p>
            </div>
            <div>
              <h4>Tracking Error & Structural Risk</h4>
              <p>
                Tracking error — the gap between an ETF's return and its index's return — comes from fees, sampling
                (not owning every single constituent), and cash drag. In thinly-traded ETFs, the market price can also
                temporarily decouple from the fund's actual net asset value during periods of market stress.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 2. ETFs vs. Mutual Funds */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="ETFs vs. Mutual Funds" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-gray-100">The Trade-offs</strong> — The in-kind redemption mechanism above is also what makes ETFs more{" "}
            <strong className="text-gray-900 dark:text-gray-100">tax-efficient</strong> than mutual funds — the fund rarely has to sell holdings for cash, so it rarely
            triggers a taxable capital gains distribution the way a mutual fund can even in a losing year. ETFs also trade
            intraday at live prices (mutual funds settle once, at end-of-day NAV) and, index-for-index, typically carry
            lower expense ratios. Mutual funds still win on automatic recurring investment and fractional-dollar purchases
            in some accounts.
          </p>
        </div>

        {/* 3. Beyond the Benchmarks */}
        <SectionCard title="Beyond the Benchmarks" icon={Compass} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>Differentiated Exposure</h4>
              <p>
                Beyond SPY/QQQ/VOO-style cap-weighted funds, equal-weight versions (each holding gets the same weight,
                reducing mega-cap concentration risk), factor ETFs (value, quality, low-volatility), and sector-rotation
                funds all target a different risk/return profile than simply owning the market as-is.
              </p>
            </div>
            <div>
              <h4>Index Products & Diversification</h4>
              <p>
                Small-cap and international/global index funds address <strong>home bias</strong> — the common tendency
                to over-concentrate in large, familiar domestic companies — by adding exposure to a broader opportunity
                set with different economic and currency drivers.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 4. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Globe2} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <PiggyBank className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Wealth Planning</h4>
                <p>
                  For how tax-efficient fund choice fits into a broader plan (including direct indexing as the next step up)
                  — see{" "}
                  <Link href="/stock/investment/wealth-planning" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Wealth Planning</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <GraduationCap className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Finance 101</h4>
                <p>
                  New to fund investing generally? Start with the fundamentals — see{" "}
                  <Link href="/stock/investment/finance-101" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Finance 101</Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
