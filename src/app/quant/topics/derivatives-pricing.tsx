import { TrendingUp, AlertTriangle, Dice5, Sigma, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, StatTile, ChapterHeading } from "@/components/shared/section-card";
import { getTopicConfig } from "./config";

export function DerivativesPricingContent() {
  const config = getTopicConfig('derivatives-pricing');

  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={TrendingUp}>
      <div className="space-y-8">
        {/* 1. Core Pricing Models */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="Core Pricing Models" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatTile title="Black-Scholes Model">Foundation of options pricing theory. Calculate theoretical values for European options using volatility, time decay, and risk-free rates.</StatTile>
            <StatTile title="Binomial Trees">Discrete-time model for pricing American options and complex derivatives. Handle early exercise features and path-dependent payoffs.</StatTile>
            <StatTile title="Monte Carlo Simulation">Price exotic derivatives and structured products through stochastic simulation. Handle multiple underlying assets and complex payoff structures.</StatTile>
            <StatTile title="Finite Difference Methods">Numerical solutions to partial differential equations. Price derivatives with barriers, early exercise, and time-varying parameters.</StatTile>
          </div>
        </div>

        {/* 2. Structured Products */}
        <SectionCard title="Structured Products" icon={TrendingUp} tone="accent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4>Principal Protected Notes</h4>
              <ul>
                <li>Zero-coupon bond component</li>
                <li>Embedded option strategies</li>
                <li>Capital preservation mechanisms</li>
              </ul>
            </div>
            <div>
              <h4>Market-Linked CDs</h4>
              <ul>
                <li>FDIC insurance protection</li>
                <li>Index participation rates</li>
                <li>Barrier and cap features</li>
              </ul>
            </div>
            <div>
              <h4>Reverse Convertibles</h4>
              <ul>
                <li>High coupon payments</li>
                <li>Knock-in barrier risks</li>
                <li>Equity conversion features</li>
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* 3. Key Risk Factors */}
        <SectionCard title="Key Risk Factors" icon={AlertTriangle} tone="accent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4>Credit Risk</h4>
              <p>Issuer default risk affects all structured products. Senior unsecured debt obligations carry counterparty exposure.</p>
            </div>
            <div>
              <h4>Market Risk</h4>
              <p>Underlying asset performance directly impacts returns. Volatility changes affect embedded option values.</p>
            </div>
            <div>
              <h4>Liquidity Risk</h4>
              <p>Limited secondary market trading. Early redemption may result in significant losses or penalties.</p>
            </div>
            <div>
              <h4>Complexity Risk</h4>
              <p>Intricate payoff structures and multiple embedded features require sophisticated valuation models.</p>
            </div>
          </div>
        </SectionCard>

        {/* 4. Valuation Components */}
        <SectionCard title="Valuation Components" icon={Sigma} tone="accent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4>Bond Floor Value</h4>
              <p>Present value of guaranteed principal repayment. Provides downside protection in principal-protected structures.</p>
            </div>
            <div>
              <h4>Embedded Options</h4>
              <p>Value of derivative components linked to underlying performance. Determines upside participation potential.</p>
            </div>
            <div>
              <h4>Credit Spread</h4>
              <p>Issuer-specific risk premium over risk-free rate. Reflects counterparty creditworthiness and market conditions.</p>
            </div>
            <div>
              <h4>Volatility Surface</h4>
              <p>Implied volatility across strikes and maturities. Critical for accurate options pricing and risk management.</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 pt-2">
            Common toolkits for implementing these models: QuantLib, Python/NumPy, MATLAB&apos;s Financial Toolbox,
            R/RQuantLib, and Bloomberg&apos;s API for live market data.
          </p>
        </SectionCard>

        {/* 5. Common Pitfalls */}
        <SectionCard title="Where Pricing Models Break" icon={AlertTriangle} tone="neg">
          <ul>
            <li><strong>Wrong model for the payoff:</strong> Using Black-Scholes (built for European exercise) on an American option ignores early-exercise value — a binomial tree or finite-difference method is required to price that feature correctly.</li>
            <li><strong>Treating the vol surface as flat:</strong> Real implied volatility varies by strike and maturity (the &quot;smile&quot;/&quot;skew&quot;) — pricing off a single flat volatility number misprices anything away from at-the-money.</li>
            <li><strong>Ignoring dividends and borrow costs:</strong> Carry costs (dividends paid, cost to borrow shares for shorting) shift the forward price the option is really priced against — a common source of small-but-real pricing error.</li>
          </ul>
        </SectionCard>

        {/* 6. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Dice5} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Dice5 className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Monte Carlo Simulation</h4>
                <p>
                  For the mechanics behind pricing exotics via simulation — see{" "}
                  <Link href="/quant/topics/monte-carlo" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Monte Carlo Simulation <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Sigma className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Statistical Analysis</h4>
                <p>
                  The volatility surface and correlation inputs to these models are estimated statistically — see{" "}
                  <Link href="/quant/topics/statistical-analysis" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Statistical Analysis <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Shield className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Risk Management</h4>
                <p>
                  Counterparty credit risk on structured products connects directly to portfolio-level risk controls —
                  see{" "}
                  <Link href="/quant/topics/risk-management" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Risk Management <ArrowRight className="h-3 w-3" />
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
