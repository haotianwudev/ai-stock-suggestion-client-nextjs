'use client';

import { BarChart3, TrendingUp, AlertTriangle, Target, Shield, Activity, Compass, Database, Receipt, Lock, Brain, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/shared/page-template";
import { getQuantTopicConfig } from "./config";

function ChapterHeading({ number, title, colorClass }: { number: number; title: string; colorClass: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full ${colorClass} text-white text-xs md:text-sm font-bold flex-shrink-0`}>
        {number}
      </span>
      <h3 className="text-lg md:text-xl font-semibold text-blue-900">{title}</h3>
    </div>
  );
}

export function BacktestContent() {
  // Get configuration for backtest
  const config = getQuantTopicConfig('backtest');

  const heroColorScheme = {
    border: "border-blue-200",
    background: "bg-gradient-to-br from-blue-50 to-indigo-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900",
    descriptionColor: "text-blue-700",
    cardBg: "bg-white",
    cardBorder: "border border-blue-100",
    cardText: "text-blue-900",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    sectionTitle: "text-blue-900"
  };

  const contentSections = (
    <>
      {/* 1. Foundations */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Foundations" colorClass="bg-blue-600" />
        <div className="ml-8 md:ml-9">
          <div className="flex gap-2">
            <Activity className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">What a Backtest Actually Proves</h4>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed mt-1">
                A backtest is evidence, not proof — it shows a rule <em>would have</em> worked on past data, under
                whatever assumptions the simulation made. Splitting data into an in-sample period (for building/tuning
                the rule) and a held-out out-of-sample period (for honestly evaluating it) is the minimum bar for that
                evidence to mean anything.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Essential Performance Metrics */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Essential Performance Metrics" colorClass="bg-blue-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0" /> Sharpe Ratio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed">Return per unit of total volatility — the standard first-pass measure, but it penalizes upside volatility the same as downside.</p>
              <code className="text-xs bg-blue-50 px-2 py-1 rounded block">(Return - Risk-free) / Volatility</code>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600 flex-shrink-0" /> Sortino Ratio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed">Fixes Sharpe's blind spot by only counting downside deviation — a strategy with lumpy upside won't be unfairly penalized.</p>
              <code className="text-xs bg-blue-50 px-2 py-1 rounded block">(Return - Risk-free) / Downside Dev</code>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-blue-600 flex-shrink-0" /> Maximum Drawdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed">The worst peak-to-trough loss over the test period — often the number that actually determines whether a real investor can psychologically stick with a strategy.</p>
              <code className="text-xs bg-blue-50 px-2 py-1 rounded block">Max(Peak - Trough) / Peak</code>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600 flex-shrink-0" /> Alpha &amp; Beta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed">Beta measures sensitivity to the market's moves; alpha is the return left over after removing that market exposure — the part attributable to genuine skill.</p>
              <code className="text-xs bg-blue-50 px-2 py-1 rounded block">α = Return - β × Market Return</code>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Backtesting Framework */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Backtesting Framework" colorClass="bg-blue-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card className="border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-600 flex-shrink-0" /> Data Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs md:text-sm text-blue-700 space-y-1.5 leading-relaxed">
                <li>• <strong>Survivorship bias:</strong> testing only on companies that still exist today inflates results</li>
                <li>• <strong>Look-ahead bias:</strong> using info not actually available at that point in time</li>
                <li>• <strong>Point-in-time data:</strong> using data as it was originally reported, not later-restated</li>
                <li>• <strong>Corporate actions:</strong> splits/dividends must be adjusted correctly or returns are wrong</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Receipt className="h-4 w-4 text-blue-600 flex-shrink-0" /> Transaction Costs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs md:text-sm text-blue-700 space-y-1.5 leading-relaxed">
                <li>• <strong>Bid-ask spreads:</strong> the cost of crossing the spread on every entry and exit</li>
                <li>• <strong>Commission fees:</strong> broker costs, easy to model but easy to forget</li>
                <li>• <strong>Market impact:</strong> your own order moving the price against you</li>
                <li>• <strong>Slippage modeling:</strong> the gap between intended and actual fill price</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-600 flex-shrink-0" /> Risk Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs md:text-sm text-blue-700 space-y-1.5 leading-relaxed">
                <li>• <strong>Position sizing:</strong> how much capital any single idea can risk</li>
                <li>• <strong>Stop-loss rules:</strong> the hard exit if a trade moves too far against you</li>
                <li>• <strong>Exposure limits:</strong> caps on sector/factor concentration</li>
                <li>• <strong>Correlation checks:</strong> making sure "diversified" positions aren't secretly the same bet</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 4. Common Pitfalls */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Common Pitfalls" colorClass="bg-red-500" />
        <Card className="border-red-200 bg-red-50/50 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" /> Critical Biases
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Overfitting:</span>
              <span>Too many free parameters relative to the amount of data lets a rule fit historical noise
                perfectly — and fail immediately on new data.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Data snooping:</span>
              <span>Testing many strategy variants on the same dataset and reporting only the best one guarantees
                you'll find something that looks great by pure chance.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Regime changes:</span>
              <span>Market structure evolves — a rule calibrated on one era's volatility or liquidity regime isn't
                guaranteed to survive the next one.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Liquidity assumptions:</span>
              <span>Assuming you can always fill at the historical close price, in any size, is rarely true for
                anything beyond the most liquid names.</span>
            </div>
          </CardContent>
        </Card>
        <p className="ml-8 md:ml-9 text-xs text-blue-600">
          Common backtesting toolkits: Python (Backtrader, Zipline), R (quantstrat), QuantConnect, and terminal
          platforms like Bloomberg or TradingView for lighter-weight testing.
        </p>
      </div>

      {/* 5. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Related & Advanced Topics" colorClass="bg-blue-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Compass className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">Systematic Strategies</h4>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed mt-1">
                For the rule-design side that produces what you're backtesting — see{" "}
                <Link href="/quant/quanttrading/systematic-strategies" className="underline underline-offset-2 hover:text-blue-900 inline-flex items-center gap-0.5">
                  Systematic Strategies <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Brain className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">Machine Learning</h4>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed mt-1">
                ML models need purged/embargoed cross-validation, a stricter variant of what's described here — see{" "}
                <Link href="/quant/quanttrading/machine-learning" className="underline underline-offset-2 hover:text-blue-900 inline-flex items-center gap-0.5">
                  Machine Learning <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Layers className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 text-sm md:text-base">Trading System Design</h4>
              <p className="text-xs md:text-sm text-blue-700 leading-relaxed mt-1">
                Backtesting is one of four pillars in a complete trading system — see{" "}
                <Link href="/quant/quanttrading/trading-system" className="underline underline-offset-2 hover:text-blue-900 inline-flex items-center gap-0.5">
                  Trading System Design <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<BarChart3 className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Backtesting and Performance Analysis Guide"
    />
  );
}