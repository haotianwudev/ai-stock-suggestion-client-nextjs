import { Activity, TrendingUp, TrendingDown, BarChart3, Calendar, Radio, Shield, Settings, AlertTriangle, Target, Layers, FlaskConical, Brain, Workflow } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, StatTile, ChapterHeading } from "@/components/shared/section-card";
import { getQuantTopicConfig } from "./config";

export function SystematicStrategiesContent() {
  const config = getQuantTopicConfig('systematic-strategies');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={Activity}>
      <div className="space-y-8">
        {/* 1. Foundations */}
        <SectionCard title="Foundations" icon={Radio} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>What &quot;Systematic&quot; Actually Means</h4>
              <p>
                A systematic strategy is fully specified in advance: the entry rule, exit rule, position size, and
                universe of instruments are all written down before a single trade is placed. The opposite is
                discretionary trading, where a human decides case-by-case. Systematic doesn&apos;t mean &quot;automated
                execution&quot; — a trader can follow a systematic rulebook by hand — it means the decision itself has
                zero ambiguity once the rule is defined.
              </p>
            </div>
            <div>
              <h4>Why Removing Emotional Bias Matters</h4>
              <p>
                Behavioral finance research consistently finds the same costly patterns in discretionary traders:
                cutting winners early out of fear, holding losers too long hoping for a reversal (loss aversion), and
                doubling down after a loss to &quot;get even&quot; (revenge trading). A rule followed mechanically
                can&apos;t do any of that — its worst-case behavior is bounded by the rule&apos;s own design, not by
                whatever mood the trader is in that day.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 2. Strategy Families */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Strategy Families" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatTile title="Momentum" icon={TrendingUp}>
              Buys what&apos;s been going up and sells/shorts what&apos;s been going down, on the empirical finding
              that trends persist longer than a random walk would predict (academic time-series momentum studies
              typically use 1-12 month lookbacks). <strong>Key risk:</strong> sharp reversals — &quot;whipsaws&quot; —
              where a trend breaks right after the system enters, producing a cluster of small losses in choppy,
              range-bound markets.
            </StatTile>
            <StatTile title="Mean Reversion" icon={TrendingDown}>
              Bets that price (or the spread between two related instruments) snaps back toward its statistical
              average after stretching too far, measured with tools like z-scores or Bollinger Bands. <strong>Key
              risk:</strong> a genuine regime change — the &quot;average&quot; itself has permanently shifted — which
              makes the strategy keep fading a real trend instead of a temporary overreaction.
            </StatTile>
            <StatTile title="Factor Models" icon={BarChart3}>
              Scores and ranks a universe of securities on measurable characteristics — value, quality,
              low-volatility, size — then systematically holds the top-ranked names and avoids or shorts the bottom,
              rebalancing on a fixed schedule. <strong>Key risk:</strong> factor crowding — when too much capital
              chases the same factor, its historical premium can compress or reverse.
            </StatTile>
            <StatTile title="Calendar Effects" icon={Calendar}>
              Exploits recurring time-based patterns — turn-of-month flows, pre-holiday drift, the January effect in
              small caps. <strong>Key risk:</strong> decay. Once a calendar anomaly is published and widely known,
              arbitrage capital tends to trade it away or pull it forward, shrinking or erasing the edge over time.
            </StatTile>
          </div>
        </div>

        {/* 3. Building a System */}
        <SectionCard title="Building a System" icon={Settings} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>Signal Generation</h4>
              <p>
                The precise, testable condition that triggers an entry or exit — e.g. &quot;buy when 20-day MA crosses
                above 50-day MA,&quot; not &quot;buy when it looks like it&apos;s turning up.&quot; If two different
                people (or two runs of the same code) could disagree on whether the signal fired, it isn&apos;t a
                systematic rule yet.
              </p>
            </div>
            <div>
              <h4>Risk Management</h4>
              <p>
                Position sizing (e.g. risking a fixed % of capital per trade, or volatility-scaling size so every
                position carries similar risk) and stop rules that cap the loss on any single trade. This is what
                keeps one bad signal from becoming an account-ending event.
              </p>
            </div>
            <div>
              <h4>Execution Rules</h4>
              <p>
                How the signal actually becomes a filled order: market vs. limit orders, acceptable slippage, and
                rules for partial fills. Ignored in backtests, this is often where real-world returns diverge most
                from theoretical ones — especially in less liquid names.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 4. Common Pitfalls */}
        <SectionCard title="What Trips Up New Systematic Traders" icon={AlertTriangle} tone="neg">
          <ul>
            <li><strong>Overfitting to history:</strong> A rule tuned with enough free parameters can be made to fit any past data perfectly — and then fail the moment it meets new, unseen data. Fewer parameters and out-of-sample testing are the main defenses.</li>
            <li><strong>Ignoring transaction costs:</strong> Commissions, bid-ask spread, and slippage can turn a profitable-looking backtest negative, especially for high-turnover strategies — always model costs explicitly, not as an afterthought.</li>
            <li><strong>Regime dependence:</strong> A rule calibrated in one volatility/interest-rate regime can behave very differently once that regime ends — no rule is regime-proof, so ongoing monitoring matters as much as the initial design.</li>
            <li><strong>Look-ahead bias:</strong> Accidentally letting a backtest use information that wouldn&apos;t have been available at the time (e.g. same-day fundamentals released after the close) — a subtle bug that inflates historical performance.</li>
          </ul>
        </SectionCard>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Target} tone="accent">
          <p>
            Once the core rulebook is defined, these are the topics that separate a strategy that looks good on paper
            from one that survives contact with real markets:
          </p>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Target className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Performance Metrics That Matter</h4>
                <p>
                  Raw return and win rate are misleading on their own — a strategy that wins 80% of the time can still
                  lose money if its rare losses are large. Judge a system on <strong>Sharpe/Sortino ratio</strong>{" "}
                  (return per unit of risk), <strong>maximum drawdown</strong> (worst peak-to-trough decline), and{" "}
                  <strong>profit factor</strong> (gross profit ÷ gross loss) together, not any single number in
                  isolation.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Layers className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Portfolio-Level Diversification</h4>
                <p>
                  A single strategy has a lumpy equity curve; combining several with low correlation to each other
                  (e.g. a trend-follower alongside a mean-reversion system) smooths returns even when neither strategy
                  improves on its own — see{" "}
                  <Link href="/quant/quanttrading/asset-allocation" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Asset Allocation</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <FlaskConical className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Backtesting &amp; Walk-Forward Validation</h4>
                <p>
                  Before risking capital, a rule needs to be tested on data it wasn&apos;t designed on — splitting
                  history into an in-sample period (for tuning) and an out-of-sample period (for honest evaluation) is
                  the standard defense against overfitting — see{" "}
                  <Link href="/quant/quanttrading/backtest" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Backtesting</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Brain className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Systematic vs. Machine-Learning Approaches</h4>
                <p>
                  Everything above uses hand-specified, human-interpretable rules. ML-based quant strategies instead
                  let a model learn the rule from data, trading interpretability for the ability to capture more
                  complex, nonlinear patterns — and taking on model risk in exchange — see{" "}
                  <Link href="/quant/quanttrading/machine-learning" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Machine Learning</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Workflow className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>From Rules to a Live Trading System</h4>
                <p>
                  Turning a validated rulebook into something that runs unattended — data feeds, order routing,
                  monitoring, and fail-safes — is its own discipline, separate from strategy design — see{" "}
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
