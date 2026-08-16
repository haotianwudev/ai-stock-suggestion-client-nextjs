import { Shield, Layers, TrendingDown, Landmark, Waves, AlertTriangle, Dice5, Sigma, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { StatTile, ChapterHeading } from "@/components/shared/section-card";
import { getTopicConfig } from "./config";

export function RiskManagementContent() {
  const config = getTopicConfig('risk-management');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={Shield}>
      <div className="space-y-8">
        {/* 1. Measuring Risk */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="Measuring Risk" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatTile title="Factor Risk Models" icon={Layers}>
              Decomposes a portfolio&apos;s risk into exposures to common, systematic factors (market beta, sector,
              value, momentum) plus a residual idiosyncratic piece — far more informative than a single volatility
              number, because it shows <em>where</em> the risk is concentrated, not just how large it is.
            </StatTile>
            <StatTile title="Value-at-Risk & Tail Risk" icon={TrendingDown} tone="neg">
              VaR answers &quot;what&apos;s the most I&apos;d expect to lose on a normal bad day, at a given confidence
              level&quot; — but says nothing about how bad the days beyond that threshold get. Conditional VaR (expected
              shortfall) and skew-based measures fill that gap by specifically quantifying the tail, where VaR&apos;s
              assumptions (often normality) tend to break down the most.
            </StatTile>
          </div>
        </div>

        {/* 2. Counterparty & Systemic Risk */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Counterparty & Systemic Risk" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatTile title="Counterparty & Credit Risk" icon={Landmark}>
              The risk that the other side of a trade fails to deliver. Margin and collateral requirements exist
              specifically to bound this — in derivatives and private credit, understanding who holds the default
              risk (and under what stress scenario it gets triggered) is as important as the trade&apos;s market risk.
            </StatTile>
            <StatTile title="Systemic Contagion" icon={Waves} tone="neg">
              Localized shocks — a forced unwind, a funding squeeze in one market — can propagate to seemingly
              unrelated assets through shared holders, leverage, and liquidity chains. Correlations that looked low in
              calm markets tend to spike toward 1 during a crisis, right when diversification is needed most.
            </StatTile>
          </div>
        </div>

        {/* 3. Modeling Approaches */}
        <div className="space-y-3">
          <ChapterHeading number={3} title="Modeling Approaches" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatTile title="Scenario & Stress Testing" icon={Dice5}>
              Rather than trusting a single statistical model, stress testing runs the portfolio through specific
              historical (2008, 2020) or hypothetical shocks to see what breaks — a check on model risk itself, since
              any one model&apos;s assumptions can be wrong in ways history reveals faster than math does.
            </StatTile>
            <StatTile title="Newer Statistical Tools" icon={Sigma}>
              Conformal prediction produces prediction intervals with a guaranteed statistical coverage rate without
              assuming a specific distribution — an increasingly common upgrade over classic parametric VaR, which
              only holds up as well as its normality assumption does.
            </StatTile>
          </div>
        </div>

        {/* 4. Related & Advanced Topics */}
        <div className="space-y-3">
          <ChapterHeading number={4} title="Related & Advanced Topics" />
          <div className="space-y-4">
            <div className="flex gap-2">
              <AlertTriangle className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Monte Carlo Simulation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Simulation is one of the main engines behind VaR/CVaR estimation and stress testing — see{" "}
                  <Link href="/quant/topics/monte-carlo" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Monte Carlo Simulation <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Shield className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Systematic Strategies</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Position sizing and stop rules are risk management applied at the individual-trade level — see{" "}
                  <Link href="/quant/quanttrading/systematic-strategies" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Systematic Strategies <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TopicDetailShell>
  );
}
