import { BarChart3, TrendingUp, AlertTriangle, Target, Shield, Activity, Compass, Database, Receipt, Lock, Brain, Layers } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, StatTile, ChapterHeading } from "@/components/shared/section-card";
import { getQuantTopicConfig } from "./config";

function MetricTile({ title, icon: Icon, formula, children }: { title: string; icon: typeof TrendingUp; formula: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
      <h4 className="flex items-center gap-1.5 text-sm font-semibold mb-1.5 text-[#A8672E] dark:text-[#D08F52]">
        <Icon className="h-4 w-4 shrink-0" />
        {title}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">{children}</p>
      <code className="text-xs font-mono bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300 px-2 py-1 rounded block">{formula}</code>
    </div>
  );
}

export function BacktestContent() {
  const config = getQuantTopicConfig('backtest');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={BarChart3}>
      <div className="space-y-8">
        {/* 1. Foundations */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="Foundations" />
          <StatTile title="What a Backtest Actually Proves" icon={Activity}>
            A backtest is evidence, not proof — it shows a rule <em>would have</em> worked on past data, under
            whatever assumptions the simulation made. Splitting data into an in-sample period (for building/tuning
            the rule) and a held-out out-of-sample period (for honestly evaluating it) is the minimum bar for that
            evidence to mean anything.
          </StatTile>
        </div>

        {/* 2. Essential Performance Metrics */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Essential Performance Metrics" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <MetricTile title="Sharpe Ratio" icon={TrendingUp} formula="(Return - Risk-free) / Volatility">
              Return per unit of total volatility — the standard first-pass measure, but it penalizes upside volatility the same as downside.
            </MetricTile>
            <MetricTile title="Sortino Ratio" icon={Shield} formula="(Return - Risk-free) / Downside Dev">
              Fixes Sharpe&apos;s blind spot by only counting downside deviation — a strategy with lumpy upside won&apos;t be unfairly penalized.
            </MetricTile>
            <MetricTile title="Maximum Drawdown" icon={AlertTriangle} formula="Max(Peak - Trough) / Peak">
              The worst peak-to-trough loss over the test period — often the number that actually determines whether a real investor can psychologically stick with a strategy.
            </MetricTile>
            <MetricTile title="Alpha & Beta" icon={Target} formula="α = Return - β × Market Return">
              Beta measures sensitivity to the market&apos;s moves; alpha is the return left over after removing that market exposure — the part attributable to genuine skill.
            </MetricTile>
          </div>
        </div>

        {/* 3. Backtesting Framework */}
        <SectionCard title="Backtesting Framework" icon={Database} tone="accent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4>Data Quality</h4>
              <ul>
                <li><strong>Survivorship bias:</strong> testing only on companies that still exist today inflates results</li>
                <li><strong>Look-ahead bias:</strong> using info not actually available at that point in time</li>
                <li><strong>Point-in-time data:</strong> using data as it was originally reported, not later-restated</li>
                <li><strong>Corporate actions:</strong> splits/dividends must be adjusted correctly or returns are wrong</li>
              </ul>
            </div>
            <div>
              <h4>Transaction Costs</h4>
              <ul>
                <li><strong>Bid-ask spreads:</strong> the cost of crossing the spread on every entry and exit</li>
                <li><strong>Commission fees:</strong> broker costs, easy to model but easy to forget</li>
                <li><strong>Market impact:</strong> your own order moving the price against you</li>
                <li><strong>Slippage modeling:</strong> the gap between intended and actual fill price</li>
              </ul>
            </div>
            <div>
              <h4>Risk Controls</h4>
              <ul>
                <li><strong>Position sizing:</strong> how much capital any single idea can risk</li>
                <li><strong>Stop-loss rules:</strong> the hard exit if a trade moves too far against you</li>
                <li><strong>Exposure limits:</strong> caps on sector/factor concentration</li>
                <li><strong>Correlation checks:</strong> making sure &quot;diversified&quot; positions aren&apos;t secretly the same bet</li>
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* 4. Common Pitfalls */}
        <SectionCard title="Critical Biases" icon={AlertTriangle} tone="neg">
          <ul>
            <li><strong>Overfitting:</strong> Too many free parameters relative to the amount of data lets a rule fit historical noise perfectly — and fail immediately on new data.</li>
            <li><strong>Data snooping:</strong> Testing many strategy variants on the same dataset and reporting only the best one guarantees you&apos;ll find something that looks great by pure chance.</li>
            <li><strong>Regime changes:</strong> Market structure evolves — a rule calibrated on one era&apos;s volatility or liquidity regime isn&apos;t guaranteed to survive the next one.</li>
            <li><strong>Liquidity assumptions:</strong> Assuming you can always fill at the historical close price, in any size, is rarely true for anything beyond the most liquid names.</li>
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-500 pt-2">
            Common backtesting toolkits: Python (Backtrader, Zipline), R (quantstrat), QuantConnect, and terminal
            platforms like Bloomberg or TradingView for lighter-weight testing.
          </p>
        </SectionCard>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Compass} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Compass className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Systematic Strategies</h4>
                <p>
                  For the rule-design side that produces what you&apos;re backtesting — see{" "}
                  <Link href="/quant/quanttrading/systematic-strategies" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Systematic Strategies</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Brain className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Machine Learning</h4>
                <p>
                  ML models need purged/embargoed cross-validation, a stricter variant of what&apos;s described here — see{" "}
                  <Link href="/quant/quanttrading/machine-learning" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Machine Learning</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Layers className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Trading System Design</h4>
                <p>
                  Backtesting is one of four pillars in a complete trading system — see{" "}
                  <Link href="/quant/quanttrading/trading-system" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Trading System Design</Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
