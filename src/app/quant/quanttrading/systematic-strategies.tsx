'use client';

import { Activity, TrendingUp, TrendingDown, BarChart3, Calendar, Radio, Shield, Settings, AlertTriangle, Target, Layers, FlaskConical, Brain, Workflow, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/shared/page-template";
import { getQuantTopicConfig } from "./config";

// Numbered chapter heading, shared visual pattern for the study-guide outline below
function ChapterHeading({ number, title, colorClass }: { number: number; title: string; colorClass: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full ${colorClass} text-white text-xs md:text-sm font-bold flex-shrink-0`}>
        {number}
      </span>
      <h3 className="text-lg md:text-xl font-semibold text-green-900">{title}</h3>
    </div>
  );
}

export function SystematicStrategiesContent() {
  // Get configuration for systematic strategies
  const config = getQuantTopicConfig('systematic-strategies');

  const heroColorScheme = {
    border: "border-green-200",
    background: "bg-gradient-to-br from-green-50 to-emerald-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    titleColor: "text-green-900",
    descriptionColor: "text-green-700",
    cardBg: "bg-white",
    cardBorder: "border border-green-100",
    cardText: "text-green-900",
    badgeBg: "bg-green-100",
    badgeText: "text-green-800",
    sectionTitle: "text-green-900"
  };

  const contentSections = (
    <>
      {/* 1. Foundations */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Foundations" colorClass="bg-green-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div>
            <h4 className="font-semibold text-green-900 text-sm md:text-base">What "Systematic" Actually Means</h4>
            <p className="text-xs md:text-sm text-green-700 leading-relaxed mt-1">
              A systematic strategy is fully specified in advance: the entry rule, exit rule, position size, and universe of
              instruments are all written down before a single trade is placed. The opposite is discretionary trading, where a
              human decides case-by-case. Systematic doesn't mean "automated execution" — a trader can follow a systematic
              rulebook by hand — it means the decision itself has zero ambiguity once the rule is defined.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-green-900 text-sm md:text-base">Why Removing Emotional Bias Matters</h4>
            <p className="text-xs md:text-sm text-green-700 leading-relaxed mt-1">
              Behavioral finance research consistently finds the same costly patterns in discretionary traders: cutting winners
              early out of fear, holding losers too long hoping for a reversal (loss aversion), and doubling down after a loss to
              "get even" (revenge trading). A rule followed mechanically can't do any of that — its worst-case behavior is bounded
              by the rule's own design, not by whatever mood the trader is in that day.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Strategy Families */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Strategy Families" colorClass="bg-green-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600 flex-shrink-0" />
                Momentum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-green-700 leading-relaxed">
                Buys what's been going up and sells/shorts what's been going down, on the empirical finding that trends persist
                longer than a random walk would predict (academic time-series momentum studies typically use 1-12 month
                lookbacks). <strong>Key risk:</strong> sharp reversals — "whipsaws" — where a trend breaks right after the
                system enters, producing a cluster of small losses in choppy, range-bound markets.
              </p>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-green-600 flex-shrink-0" />
                Mean Reversion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-green-700 leading-relaxed">
                Bets that price (or the spread between two related instruments) snaps back toward its statistical average after
                stretching too far, measured with tools like z-scores or Bollinger Bands. <strong>Key risk:</strong> a genuine
                regime change — the "average" itself has permanently shifted — which makes the strategy keep fading a real
                trend instead of a temporary overreaction.
              </p>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-green-600 flex-shrink-0" />
                Factor Models
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-green-700 leading-relaxed">
                Scores and ranks a universe of securities on measurable characteristics — value, quality, low-volatility, size —
                then systematically holds the top-ranked names and avoids or shorts the bottom, rebalancing on a fixed schedule.
                <strong> Key risk:</strong> factor crowding — when too much capital chases the same factor, its historical
                premium can compress or reverse.
              </p>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600 flex-shrink-0" />
                Calendar Effects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-green-700 leading-relaxed">
                Exploits recurring time-based patterns — turn-of-month flows, pre-holiday drift, the January effect in small
                caps. <strong>Key risk:</strong> decay. Once a calendar anomaly is published and widely known, arbitrage
                capital tends to trade it away or pull it forward, shrinking or erasing the edge over time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Building a System */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Building a System" colorClass="bg-green-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Radio className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 text-sm md:text-base">Signal Generation</h4>
              <p className="text-xs md:text-sm text-green-700 leading-relaxed mt-1">
                The precise, testable condition that triggers an entry or exit — e.g. "buy when 20-day MA crosses above
                50-day MA," not "buy when it looks like it's turning up." If two different people (or two runs of the same
                code) could disagree on whether the signal fired, it isn't a systematic rule yet.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Shield className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 text-sm md:text-base">Risk Management</h4>
              <p className="text-xs md:text-sm text-green-700 leading-relaxed mt-1">
                Position sizing (e.g. risking a fixed % of capital per trade, or volatility-scaling size so every position
                carries similar risk) and stop rules that cap the loss on any single trade. This is what keeps one bad
                signal from becoming an account-ending event.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Settings className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 text-sm md:text-base">Execution Rules</h4>
              <p className="text-xs md:text-sm text-green-700 leading-relaxed mt-1">
                How the signal actually becomes a filled order: market vs. limit orders, acceptable slippage, and rules for
                partial fills. Ignored in backtests, this is often where real-world returns diverge most from theoretical
                ones — especially in less liquid names.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Common Pitfalls */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Common Pitfalls" colorClass="bg-red-500" />
        <Card className="border-red-200 bg-red-50/50 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              What Trips Up New Systematic Traders
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Overfitting to history:</span>
              <span>A rule tuned with enough free parameters can be made to fit any past data perfectly — and then fail
                the moment it meets new, unseen data. Fewer parameters and out-of-sample testing are the main defenses.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Ignoring transaction costs:</span>
              <span>Commissions, bid-ask spread, and slippage can turn a profitable-looking backtest negative, especially
                for high-turnover strategies — always model costs explicitly, not as an afterthought.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Regime dependence:</span>
              <span>A rule calibrated in one volatility/interest-rate regime can behave very differently once that regime
                ends — no rule is regime-proof, so ongoing monitoring matters as much as the initial design.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Look-ahead bias:</span>
              <span>Accidentally letting a backtest use information that wouldn't have been available at the time (e.g.
                same-day fundamentals released after the close) — a subtle bug that inflates historical performance.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Related & Advanced Topics" colorClass="bg-green-600" />
        <p className="ml-8 md:ml-9 text-xs md:text-sm text-green-700 leading-relaxed">
          Once the core rulebook is defined, these are the topics that separate a strategy that looks good on paper from one
          that survives contact with real markets:
        </p>
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Target className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 text-sm md:text-base">Performance Metrics That Matter</h4>
              <p className="text-xs md:text-sm text-green-700 leading-relaxed mt-1">
                Raw return and win rate are misleading on their own — a strategy that wins 80% of the time can still lose money
                if its rare losses are large. Judge a system on <strong>Sharpe/Sortino ratio</strong> (return per unit of risk),
                <strong> maximum drawdown</strong> (worst peak-to-trough decline), and <strong>profit factor</strong>
                (gross profit ÷ gross loss) together, not any single number in isolation.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Layers className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 text-sm md:text-base">Portfolio-Level Diversification</h4>
              <p className="text-xs md:text-sm text-green-700 leading-relaxed mt-1">
                A single strategy has a lumpy equity curve; combining several with low correlation to each other (e.g. a
                trend-follower alongside a mean-reversion system) smooths returns even when neither strategy improves on its
                own — see{" "}
                <Link href="/quant/quanttrading/asset-allocation" className="underline underline-offset-2 hover:text-green-900 inline-flex items-center gap-0.5">
                  Asset Allocation <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <FlaskConical className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 text-sm md:text-base">Backtesting &amp; Walk-Forward Validation</h4>
              <p className="text-xs md:text-sm text-green-700 leading-relaxed mt-1">
                Before risking capital, a rule needs to be tested on data it wasn't designed on — splitting history into an
                in-sample period (for tuning) and an out-of-sample period (for honest evaluation) is the standard defense
                against overfitting — see{" "}
                <Link href="/quant/quanttrading/backtest" className="underline underline-offset-2 hover:text-green-900 inline-flex items-center gap-0.5">
                  Backtesting <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Brain className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 text-sm md:text-base">Systematic vs. Machine-Learning Approaches</h4>
              <p className="text-xs md:text-sm text-green-700 leading-relaxed mt-1">
                Everything above uses hand-specified, human-interpretable rules. ML-based quant strategies instead let a model
                learn the rule from data, trading interpretability for the ability to capture more complex, nonlinear
                patterns — and taking on model risk in exchange — see{" "}
                <Link href="/quant/quanttrading/machine-learning" className="underline underline-offset-2 hover:text-green-900 inline-flex items-center gap-0.5">
                  Machine Learning <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Workflow className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 text-sm md:text-base">From Rules to a Live Trading System</h4>
              <p className="text-xs md:text-sm text-green-700 leading-relaxed mt-1">
                Turning a validated rulebook into something that runs unattended — data feeds, order routing, monitoring, and
                fail-safes — is its own discipline, separate from strategy design — see{" "}
                <Link href="/quant/quanttrading/trading-system" className="underline underline-offset-2 hover:text-green-900 inline-flex items-center gap-0.5">
                  Trading System Design <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const fallbackInfographic = (
    <div 
      className="relative rounded-xl overflow-hidden shadow-lg border border-green-200 cursor-pointer group"
    >
      <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
        <div className="text-center p-6">
          <Activity className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <p className="text-green-800 font-medium">Systematic Strategies Framework</p>
          <p className="text-green-600 text-sm mt-2">Visual guide coming soon</p>
        </div>
      </div>
    </div>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<Activity className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      fallbackInfographic={fallbackInfographic}
    />
  );
}