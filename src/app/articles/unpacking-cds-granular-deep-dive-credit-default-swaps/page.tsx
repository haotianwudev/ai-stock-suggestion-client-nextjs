'use client';

import React from 'react';
import { BookOpen, ShieldCheck, Search, Compass, Gavel, AlertTriangle, Target, Clock, Calculator, Percent, Activity, ShieldAlert, Divide, Info, Globe, Zap, Database, Scale, Dna, BarChart3, TrendingUp, Briefcase, Flame, GitMerge } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function UnpackingCDSArticle() {
  return (
    <ArticleFrame slug="unpacking-cds-granular-deep-dive-credit-default-swaps">
      <div className="pb-24">
        <InfographicSlot alt="Credit Default Swaps Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Module 1: Foundational Intuition */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">1. Foundational Intuition</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              A <strong>Credit Default Swap (CDS)</strong> is a derivative that separates credit risk from a loan or bond. It involves two parties: the <strong>Protection Buyer</strong> (who pays a spread) and the <strong>Protection Seller</strong> (who assumes the risk).
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-slate-400" /> The Bilateral Payout Mechanism
            </h3>
            
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mb-10">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4">How CDS Works Step-by-Step</h4>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Setup:</strong>
                    <p className="text-slate-600 dark:text-slate-400">Bank A owns $10M of Tesla bonds but wants to hedge credit risk without selling the bonds.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Contract:</strong>
                    <p className="text-slate-600 dark:text-slate-400">Bank A buys CDS protection from Hedge Fund B, paying 150bps annually on $10M notional.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Payout:</strong>
                    <p className="text-slate-600 dark:text-slate-400">If Tesla defaults, Hedge Fund B pays Bank A the loss: $10M × (1 - Recovery Rate).</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <ComparisonGrid>
              <ComparisonCard title="Reference Entity" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">The corporation or sovereign whose credit is being tracked. Note the Entity is the name, while the Obligation is the specific bond used to determine seniority.</p>
              </ComparisonCard>
              <ComparisonCard title="Insurable Interest" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300">Unlike insurance, CDS do not require the buyer to suffer a "loss." This allows for Long/Short Credit strategies.</p>
              </ComparisonCard>
            </ComparisonGrid>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif flex items-center gap-2">
              <Gavel className="w-5 h-5 text-slate-400" /> ISDA Credit Events
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              These are the specific triggers that activate CDS payouts. Understanding each is crucial for risk assessment:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                <strong className="text-slate-900 dark:text-white">Bankruptcy:</strong> Entity becomes insolvent or liquidates. (Most Common)
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                <strong className="text-slate-900 dark:text-white">Failure to Pay:</strong> Entity misses a payment after grace periods. (Common)
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                <strong className="text-slate-900 dark:text-white">Restructuring:</strong> Terms changed (interest, principal, maturity). (Frequent in Sovereigns)
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                <strong className="text-slate-900 dark:text-white">Repudiation / Acceleration:</strong> Denial of debt or immediate debt calling. (Rare)
              </div>
            </div>
          </section>

          {/* Module 2: Pricing and Valuation */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">2. Pricing and Valuation</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              CDS valuation relies on modeling Hazard Rates (λ), the instantaneous probability of default given survival. This allows us to construct the Survival Probability curve P(t).
            </p>

            <FormulaPanel
              title="Survival Probability"
              formula="P(t) = e^{-\int_0^t \lambda(u) du}"
              legend={[
                { label: "P(t)", value: "Survival probability at time t" },
                { label: "\\lambda(u)", value: "Hazard rate at time u" }
              ]}
            />
            
            <ComparisonGrid>
              <ComparisonCard title="The Premium Leg" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">The PV of periodic spread payments, conditional on survival. The protection buyer pays this.</p>
              </ComparisonCard>
              <ComparisonCard title="The Protection Leg" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">The PV of the contingent payout (1-R) upon default. The protection seller pays this.</p>
              </ComparisonCard>
            </ComparisonGrid>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif flex items-center gap-2">
              <Divide className="w-5 h-5 text-slate-400" /> The Credit Triangle Simplification
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              For "napkin math," traders use the Credit Triangle relationship. For a flat curve and low default probability, the fair spread (s) simplifies to:
            </p>

            <FormulaPanel
              title="The Credit Triangle"
              formula="s \approx \lambda \times (1 - R)"
              legend={[
                { label: "s", value: "CDS Spread" },
                { label: "\\lambda", value: "Hazard Rate (Default Probability)" },
                { label: "R", value: "Recovery Rate" }
              ]}
            />
          </section>

          {/* Module 3: Standardization */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">3. The Big Bang Protocol</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Before 2009, CDS traded with "Par Spreads" (coupons that made NPV=0). Post-Big Bang, coupons are fixed at 100bps or 500bps to facilitate Trade Compression and Central Clearing.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="Pre-2009: Bespoke Contracts" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">Each contract had unique par spreads, no standardization, high bilateral risk, and was illiquid.</p>
              </ComparisonCard>
              <ComparisonCard title="Post-2009: Standardized World" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300">Fixed coupons (100bps or 500bps), standard terms (IMM dates), central clearing (ICE Clear Credit), and highly liquid.</p>
              </ComparisonCard>
            </ComparisonGrid>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Points Upfront (PUF) Calculation</h3>
            <FormulaPanel
              title="Points Upfront Formula"
              formula="PUF \approx (s_{mkt} - Coupon) \times RD"
              legend={[
                { label: "PUF", value: "Points Upfront (Paid by buyer if positive)" },
                { label: "s_{mkt}", value: "Market Spread" },
                { label: "RD", value: "Risky Duration" }
              ]}
            />
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Credit Event Auctions</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              To handle massive volumes of CDS during a default, ISDA introduced the Auction mechanism. Market participants submit bond bids to find a "Final Price." The CDS payout is simply (100 - Final Price), avoiding the physical delivery of scarce bonds.
            </p>
          </section>

          {/* Module 4: Risk Sensitivities */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Scale className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">4. Risk Sensitivities (CS01)</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              <strong>CS01</strong> (Credit Spread 01) is the dollar change in NPV for a 1bp shift in the credit spread. It is fundamentally linked to <strong>Risky Duration</strong> (RD), which is the sensitivity of the Premium Leg to the spread.
            </p>

            <FormulaPanel
              title="CS01 Calculation"
              formula="CS01 = \frac{PV(s + 1bp) - PV(s - 1bp)}{2}"
              legend={[
                { label: "CS01", value: "Dollar sensitivity to 1bp spread move" },
                { label: "PV", value: "Present Value of the CDS" }
              ]}
            />

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-slate-400" /> Credit Convexity (Negative Gamma)
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              CDS are <strong>non-linear</strong>. <strong>Credit Gamma</strong> measures the change in CS01 as spreads move. For a protection seller, the contract displays <strong>Negative Gamma</strong>. As spreads widen, your losses accelerate, but as they approach infinity, the loss per basis point (CS01) actually shrinks as the payout becomes certain.
            </p>
            
            <ComparisonGrid>
              <ComparisonCard title="For Protection Sellers" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">Losses accelerate in initial spread widening. Need larger hedges than CS01 suggests. Consider gamma hedging.</p>
              </ComparisonCard>
              <ComparisonCard title="For Protection Buyers" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300">Benefit from negative gamma of sellers. Gains accelerate in spread widening. Natural hedge for credit portfolios.</p>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          {/* Module 5: Precise Estimation */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">5. Precise Estimation</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Calculating CS01 without a pricing engine requires estimating the Risky Duration (RD). This is essential for quick risk assessments and trade sizing.
            </p>

            <FormulaPanel
              title="Manual CS01 Estimate"
              formula="CS01 \approx N \times RD \times 10^{-4}"
              legend={[
                { label: "CS01", value: "Credit Spread 01" },
                { label: "N", value: "Notional Amount" },
                { label: "RD", value: "Risky Duration" },
                { label: "10^{-4}", value: "1 basis point" }
              ]}
            />
          </section>

          {/* Module 6: Stress Testing Logic */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">6. Stress Testing Logic</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Professional desks use three tiers of stress testing to ensure they can survive a systemic or idiosyncratic credit crash.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="Tier 1: Linear Stress" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">A "Systemic Widening" shock (e.g., +200bps). 1st order estimate used for daily risk reporting. Loss = CS01 × Δs.</p>
              </ComparisonCard>
              <ComparisonCard title="Tier 2: Jump-to-Default" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">Assumes an instantaneous credit event. Removes all probability modeling and calculates the actual cash payout: JTD = N(1 - R) - MTM.</p>
              </ComparisonCard>
              <ComparisonCard title="Tier 3: Recovery Shock" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">In a crisis, Wrong-Way Risk occurs: spreads widen and Recovery rates drop simultaneously. Captures systemic credit cycles.</p>
              </ComparisonCard>
            </ComparisonGrid>

          </section>
          
        </div>
      </div>
    </ArticleFrame>
  );
}
