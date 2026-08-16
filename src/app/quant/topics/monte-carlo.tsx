import { Calculator, Dice5, Target, TrendingUp, Wallet, Landmark, Repeat, BarChart3, Shuffle, AlertTriangle, FlaskConical, Sigma } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, StatTile, ChapterHeading } from "@/components/shared/section-card";
import { TopicConfig } from "./config";

export function MonteCarloContent({ config }: { config?: TopicConfig }) {
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={Calculator}>
      <div className="space-y-8">
        {/* 1. Foundations */}
        <SectionCard title="Foundations" icon={Dice5} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>What a Simulation Actually Does</h4>
              <p>
                Instead of solving an equation for one exact answer, a Monte Carlo simulation draws thousands of random,
                equally-plausible future paths for a variable (a stock price, a portfolio&apos;s return), then looks at
                the resulting distribution of outcomes. The average of those outcomes approximates the answer; the
                spread tells you how uncertain that answer is.
              </p>
            </div>
            <div>
              <h4>Why Finance Needs It</h4>
              <p>
                Closed-form formulas like Black-Scholes only work for simple, well-behaved payoffs. The moment a
                problem involves path-dependency (did the price ever cross a barrier?), multiple correlated assets, or
                irregular cash flows, there&apos;s usually no clean formula — simulation handles arbitrary complexity in
                exchange for computation time instead of algebra.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 2. Core Applications */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Core Applications" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatTile title="Option Pricing" icon={TrendingUp}>
              Prices exotic, path-dependent derivatives (Asian, barrier, lookback options) by simulating the
              underlying&apos;s price path thousands of times and averaging the discounted payoff — the workhorse
              method whenever there&apos;s no closed-form alternative.
            </StatTile>
            <StatTile title="Risk Management" icon={Target}>
              Simulates portfolio value across thousands of scenarios to estimate Value-at-Risk (VaR) and Conditional
              VaR — how bad the tail of the loss distribution actually is, not just the expected case.
            </StatTile>
            <StatTile title="Portfolio & Retirement Planning" icon={Wallet}>
              Simulates thousands of possible market paths to show the full range of retirement/portfolio outcomes
              (e.g. &quot;85% probability the portfolio lasts 30 years&quot;) instead of a single deterministic projection.
            </StatTile>
            <StatTile title="Credit Risk (CVA)" icon={Landmark}>
              Simulates counterparty default scenarios and exposure paths over the life of a trade to price the Credit
              Valuation Adjustment — the cost of the counterparty potentially failing to pay.
            </StatTile>
          </div>
        </div>

        {/* 3. How a Simulation Is Built */}
        <SectionCard title="How a Simulation Is Built" icon={Shuffle} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>Random Sampling &amp; Stochastic Processes</h4>
              <p>
                A process (commonly Geometric Brownian Motion for stock prices) specifies how the variable evolves; at
                each time step a random shock — usually drawn from a normal distribution — is added, and the whole
                path is repeated thousands of times to build a distribution of outcomes.
              </p>
            </div>
            <div>
              <h4>Convergence &amp; Number of Paths</h4>
              <p>
                Simulation accuracy improves with the square root of the number of paths — doubling precision requires
                roughly 4x the simulations, not 2x. This is why naive Monte Carlo can be computationally expensive for
                high-precision pricing.
              </p>
            </div>
            <div>
              <h4>Variance Reduction Techniques</h4>
              <p>
                Methods like antithetic variates (pairing each random path with its mirror image) and control variates
                (using a related, known quantity to cancel out noise) cut the number of paths needed for a target
                accuracy, since plain random sampling converges slowly on its own.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 4. Common Pitfalls */}
        <SectionCard title="Where Simulations Mislead" icon={AlertTriangle} tone="neg">
          <ul>
            <li><strong>Model risk:</strong> The output is only as good as the assumed process — assuming normally distributed returns when real markets have fat tails produces confidently wrong risk numbers.</li>
            <li><strong>Mistaking a distribution for a prediction:</strong> A &quot;70% success rate&quot; retirement simulation is a probability band, not a forecast — reading percentile outputs as guarantees is one of the most common misreadings of Monte Carlo results.</li>
            <li><strong>Underestimating cost at scale:</strong> Path-dependent payoffs with many time steps, or portfolios of correlated assets, multiply the computation needed — this is often where naive implementations become impractically slow.</li>
          </ul>
        </SectionCard>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Repeat} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <FlaskConical className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Derivatives Pricing</h4>
                <p>
                  Monte Carlo is one of several pricing methods alongside closed-form models and binomial trees — see{" "}
                  <Link href="/quant/topics/derivatives-pricing" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Derivatives Pricing</Link>{" "}
                  for when each approach fits best.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Sigma className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Statistical Analysis</h4>
                <p>
                  The distributional assumptions that drive a simulation — mean, volatility, correlation, fat tails —
                  come from statistical estimation; see{" "}
                  <Link href="/quant/topics/statistical-analysis" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Statistical Analysis</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Target className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Risk Management</h4>
                <p>
                  Simulation output (VaR, CVaR, drawdown distributions) directly feeds portfolio risk limits and stress
                  testing — see{" "}
                  <Link href="/quant/topics/risk-management" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Risk Management</Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
