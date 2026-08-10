'use client';

import React from 'react';
import { ShieldCheck, DollarSign, Scale, AlertCircle, Lock, Landmark, FileText } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

export default function StructuredLiquidityHedgingPage() {
  return (
    <ArticleFrame slug="structured-liquidity-hedging-equity-collars-pvsf">
      <div className="pb-24">
        <InfographicSlot alt="PVSF Infographic" />

        <main className="max-w-4xl mx-auto py-16">

          {/* Intro */}
          <div className="mb-16 text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-center">
            The contemporary financial landscape presents a complex paradox for corporate founders and
            executives: <strong>massive paper wealth juxtaposed with an acute lack of liquid capital.</strong>{' '}
            Selling highly appreciated stock triggers punitive capital gains taxes, signals lack of
            confidence to the market, and may violate insider trading policies. Here is how financial
            engineering solves this triad of challenges.
          </div>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 1: Equity Collars */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Architecture of Equity Collars</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              An equity collar is a definitive, multi-leg options strategy constructed to mathematically
              limit both the upside potential and the downside risk of a concentrated, long stock position.
              It acts as a protective wrapper.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif flex items-center gap-3">
              <Lock className="text-[#1D8A70] dark:text-[#3CBF9C] w-6 h-6" /> The Zero-Cost Imperative
            </h3>
            <ComparisonGrid>
              <ComparisonCard title="1. Long Stock" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">The existing concentrated wealth the investor seeks to protect.</p>
              </ComparisonCard>
              <ComparisonCard title="2. Long Put (The Floor)" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">An out-of-the-money put option purchased to protect against catastrophic declines.</p>
              </ComparisonCard>
              <ComparisonCard title="3. Short Call (The Cap)" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300">An out-of-the-money call option sold. The premium collected pays for the put, making it a "zero-cost" collar.</p>
              </ComparisonCard>
            </ComparisonGrid>

            <div className="mt-12 bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Numerical Implementation</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Assume an investor holds <strong>100 shares</strong> of a security trading at a cost basis
                of <strong>$47.72</strong>. They execute a zero-cost collar by purchasing a{' '}
                <strong>$45 strike put</strong> and selling a <strong>$50 strike call</strong>.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border-l-4 border-[#BC4128] dark:border-[#E2694A] border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Scenario A: Severe Market Decline (Price Drops to $41)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">The short call expires worthless. The protective put is deeply in-the-money and exercised. The shares are sold at the guaranteed $45 strike.</p>
                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg font-mono text-sm text-slate-700 dark:text-slate-300">
                    Maximum Loss = Initial Cost ($47.72) − Put Strike ($45.00) = $2.57 per share cap.
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border-l-4 border-[#A8672E] dark:border-[#D08F52] border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Scenario B: Range-Bound Market (Price Settles at $48)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">The price resides in the un-capped corridor between $45 and $50. Both options expire worthless. The investor retains the shares.</p>
                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg font-mono text-sm text-slate-700 dark:text-slate-300">
                    Portfolio value perfectly tracks the stock. No options exercised.
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border-l-4 border-[#1D8A70] dark:border-[#3CBF9C] border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Scenario C: Exceptional Appreciation (Price Surges to $52.50)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">The put expires worthless. The short call is in-the-money. The investor is forced to sell their shares at the $50 strike price.</p>
                  <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg font-mono text-sm text-slate-700 dark:text-slate-300">
                    Maximum Profit = Call Strike ($50.00) − Initial Cost ($47.72) = $2.28 per share cap.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 2: PVSFs */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Prepaid Variable Share Forwards (PVSFs)</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              While equity collars mitigate risk, they generate no upfront cash. A PVSF represents a
              quantum leap in financial engineering: it synthesizes the protective architecture of an
              equity collar with the immediate liquidity of a non-recourse, collateralized cash advance.
            </p>

            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 mb-10">
              <h4 className="text-indigo-900 dark:text-indigo-300 font-bold mb-4 font-serif text-xl">How the Upfront Payment is Calculated</h4>
              <ul className="list-disc pl-5 space-y-3 text-indigo-800 dark:text-indigo-200">
                <li><strong>Advance Rate:</strong> Typically 75% to 90% of the stock&apos;s current spot market value.</li>
                <li><strong>Deductions:</strong> The bank deducts the cost of the implied protective put (if volatility is high), the implied financing rate (interest for the 1–5 year term), and the present value of expected dividends.</li>
                <li><strong>Non-Recourse:</strong> There are zero margin calls. The bank&apos;s maximum exposure is pre-hedged.</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif">The Variable Settlement Algorithm</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              The &ldquo;variable&rdquo; nature preserves the tax-deferred status. Instead of delivering a fixed
              number of shares, the delivery depends on the terminal price across three tranches. An
              executive pledges <strong>100,000 shares</strong> at <strong>$100/share ($10M total)</strong>.
              The Floor is $100, the Cap is $120, and the Bank advances{' '}
              <strong>$8.5 Million (85%)</strong> upfront.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="Tranche 1: Catastrophic Collapse" tone="neg">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2 pb-2 border-b border-slate-200 dark:border-slate-800">Terminal Price ≤ $100 Floor</div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">Stock plummets to $50. The executive is completely shielded from the loss below the floor.</p>
                <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded text-xs font-mono text-slate-600 dark:text-slate-400">
                  Deliver: All 100,000 shares.<br/>
                  Result: Executive keeps the $8.5M cash received 3 years ago, avoiding a $3.5M loss.
                </div>
              </ComparisonCard>
              <ComparisonCard title="Tranche 2: Moderate Appreciation" tone="neutral">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2 pb-2 border-b border-slate-200 dark:border-slate-800">Between $100 and $120</div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">Stock rises to $110. The executive participates in upside. Delivery ratio is Floor ÷ Terminal Price.</p>
                <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded text-xs font-mono text-slate-600 dark:text-slate-400">
                  Deliver: 90,909 shares.<br/>
                  Retain: 9,091 shares (Worth $1M).<br/>
                  Total Value: $8.5M + $1M equity.
                </div>
              </ComparisonCard>
              <ComparisonCard title="Tranche 3: Explosive Growth" tone="pos">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2 pb-2 border-b border-slate-200 dark:border-slate-800">Terminal Price &gt; $120 Cap</div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">Stock surges to $150. Upside is constrained. Delivery includes floor value plus excess over cap.</p>
                <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded text-xs font-mono text-slate-600 dark:text-slate-400">
                  Deliver: 86,667 shares.<br/>
                  Retain: 13,333 shares (Worth $2M).<br/>
                  Result: Capped at max permitted upside.
                </div>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 3: Comparison */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Scale className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Strategic Deployment Comparison</h2>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left border-collapse bg-white dark:bg-slate-900">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-semibold text-sm">
                    <th className="p-4 border-b border-slate-200 dark:border-slate-800">Strategic Feature</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Traditional Equity Collar</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Margin Loan / SBLOC</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">PVSF</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">Immediate Liquidity</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">None</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Variable (Capped at 50%)</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-bold">High (75% - 90%)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">Immediate Tax Event</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">No</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">No</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">No (Deferred)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">Downside Protection</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-bold">Yes (Hard Floor)</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-[#BC4128] dark:text-[#E2694A] font-bold">None (Margin Risk)</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-bold">Yes (Embedded Put)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">Upside Participation</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Capped</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Unlimited</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Capped</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 4: Risks & Regulations */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Intrinsic Risks & Regulatory Labyrinth</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3 font-serif">
                  <Landmark className="text-[#BC4128] dark:text-[#E2694A] w-6 h-6" /> Tax Pitfalls
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  To maintain tax-deferred status and avoid triggering a &ldquo;constructive sale&rdquo; under
                  IRC Section 1259, a PVSF must maintain a robust corridor of economic exposure (usually a
                  15–20% spread between floor and cap).
                </p>
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">The McKelvey Litigation</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Billionaire Andrew McKelvey extended his PVSFs during the 2008 crash when his stock
                    had plummeted far below the floor. The IRS argued the delivery was a statistical
                    &ldquo;foregone conclusion&rdquo; and substantially fixed. The court agreed, triggering over
                    $102M in immediate capital gains taxes. The lesson: You cannot roll deep
                    out-of-the-money positions without catastrophic tax consequences.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3 font-serif">
                  <FileText className="text-amber-500 w-6 h-6" /> SEC Disclosure Requirements
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Insiders are subject to strict scrutiny to prevent illegal insider trading and ensure
                  market transparency. PVSFs are highly visible to the public markets.
                </p>
                <ul className="space-y-4">
                  <li className="bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 text-sm">
                    <strong className="text-slate-900 dark:text-white block mb-1">Section 16(a) Form 4 Filings:</strong>
                    <span className="text-slate-600 dark:text-slate-400">Cannot use standard buy/sell codes. Must use Code "J" or "K" (Derivative Securities) with explicit footnotes detailing the floor, cap, term, and cash advance.</span>
                  </li>
                  <li className="bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 text-sm">
                    <strong className="text-slate-900 dark:text-white block mb-1">Rule 10b5-1 Trading Plans:</strong>
                    <span className="text-slate-600 dark:text-slate-400">Execution must occur under heavily enforced cooling-off periods to prove the executive lacked Material Non-Public Information.</span>
                  </li>
                  <li className="bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 text-sm">
                    <strong className="text-slate-900 dark:text-white block mb-1">Proxy Regulation S-K Item 407(i):</strong>
                    <span className="text-slate-600 dark:text-slate-400">Companies must publicly disclose to shareholders if executives are permitted to hedge. Many boards now strictly prohibit PVSFs.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

        </main>
      </div>
    </ArticleFrame>
  );
}
