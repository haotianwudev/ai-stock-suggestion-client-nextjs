'use client';

import { Shield, XCircle, Calculator, Target, DollarSign } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

export default function TaxEfficientOptionWritingPage() {
  return (
    <ArticleFrame
      slug="tax-efficient-option-writing-comprehensive-guide"
      additionalDisclaimer="Tax laws are complex and subject to change. Always consult with qualified tax and financial professionals before implementing any strategies discussed."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100 font-sans">
        <InfographicSlot alt="Tax-Efficient Option Writing Strategy Infographic" />

        {/* Key Insights Cards */}
        <section className="mb-12 mt-8">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-8 text-center">Key Tax Optimization Strategies</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-2">Advantage</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Index options (SPX, NDX) receive 60% long-term / 40% short-term tax treatment regardless of holding period, significantly reducing tax burden compared to ETF options.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#1D8A70] dark:text-[#3CBF9C]" />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-2">Avoid Tax Traps</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Navigate straddle rules, wash sale restrictions, and qualified covered call requirements to prevent loss deferrals and holding period resets.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-2">Strategic Tax Management</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Implement tax-loss harvesting, maintain detailed records, and consider advanced elections like Trader Tax Status for professional-level activity.</p>
            </div>
          </div>
        </section>

        {/* Tax Rate Comparison */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-6">The Tax Rate Reality</h2>
          <ComparisonGrid>
            <ComparisonCard title="Standard Option Writing" tone="neg">
              <div className="space-y-3 font-mono tabular-nums">
                <div className="flex justify-between">
                  <span className="font-sans">ETF Options (SPY, QQQ)</span>
                  <span className="font-bold">37% Tax Rate</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans">Short-term gains only</span>
                  <span className="font-bold">No exemptions</span>
                </div>
              </div>
            </ComparisonCard>
            <ComparisonCard title="Section 1256 Optimization" tone="pos">
              <div className="space-y-3 font-mono tabular-nums">
                <div className="flex justify-between">
                  <span className="font-sans">Index Options (SPX, NDX)</span>
                  <span className="font-bold">26.8% Blended Rate</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans">60/40 rule benefit</span>
                  <span className="font-bold">Wash sale exempt</span>
                </div>
              </div>
            </ComparisonCard>
          </ComparisonGrid>
          <div className="mt-4 bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/10 border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 rounded-xl p-4">
            <div className="flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C] mr-2 flex-none" />
              <span className="font-mono tabular-nums font-bold text-[#1D8A70] dark:text-[#3CBF9C]">Potential Tax Savings: 27% reduction in tax burden</span>
            </div>
          </div>
        </section>

        {/* Section 1256 Deep Dive */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-6">Contracts: The Premier Strategy</h2>
          <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <ComparisonGrid>
              <ComparisonCard title="Qualifying Contracts" tone="pos">
                <ul className="space-y-2">
                  <li>SPX (S&amp;P 500 Index)</li>
                  <li>NDX (Nasdaq 100 Index)</li>
                  <li>RUT (Russell 2000 Index)</li>
                  <li>VIX (Volatility Index)</li>
                </ul>
              </ComparisonCard>
              <ComparisonCard title="Non-Qualifying (Standard Treatment)" tone="neg">
                <ul className="space-y-2">
                  <li>SPY (SPDR S&amp;P 500 ETF)</li>
                  <li>QQQ (Invesco QQQ ETF)</li>
                  <li>IWM (iShares Russell 2000 ETF)</li>
                  <li>Individual stock options</li>
                </ul>
              </ComparisonCard>
            </ComparisonGrid>
            <div className="mt-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-6 rounded-xl">
              <h4 className="font-serif text-gray-900 dark:text-white mb-3">The 60/40 Rule Calculation</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">For a trader in the highest tax bracket with $15,000 profit:</p>
              <div className="grid md:grid-cols-2 gap-6 font-mono tabular-nums text-sm">
                <div>
                  <p className="font-sans font-semibold text-gray-900 dark:text-white">ETF Option (SPY):</p>
                  <p className="text-gray-600 dark:text-gray-400">$15,000 &times; 37% = $5,550 tax</p>
                </div>
                <div>
                  <p className="font-sans font-semibold text-gray-900 dark:text-white">Index Option (SPX):</p>
                  <p className="text-gray-600 dark:text-gray-400">($9,000 &times; 20%) + ($6,000 &times; 37%) = $4,020 tax</p>
                  <p className="font-bold text-[#1D8A70] dark:text-[#3CBF9C]">Savings: $1,530 (27% reduction)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tax Traps to Avoid */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-6">Critical Tax Traps to Avoid</h2>
          <div className="space-y-4">
            {[
              { title: "ETF vs Index Option Confusion", body: "Trading SPY options instead of SPX options costs you the 60/40 tax benefit and wash sale exemptions. This single mistake can increase your tax burden by 27%." },
              { title: "Covered Call Holding Period Reset", body: "Writing non-qualified covered calls (under 30 days or deep ITM) on stock held less than one year resets the holding period to zero, destroying long-term capital gains eligibility." },
              { title: "Straddle Loss Deferral", body: "Closing only the losing leg of a spread while keeping the winning side open defers the loss until the gain is recognized, eliminating current-year tax benefits." },
              { title: "Wash Sale Violations", body: "Repurchasing “substantially identical” securities within 61 days of a loss disallows the deduction. While option rolling is generally safe, aggressive strategies risk IRS challenge." },
            ].map((trap) => (
              <div key={trap.title} className="bg-[#BC4128]/5 dark:bg-[#E2694A]/10 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-6 rounded-r-xl">
                <div className="flex">
                  <XCircle className="h-5 w-5 text-[#BC4128] dark:text-[#E2694A] mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-[#BC4128] dark:text-[#E2694A] mb-1">{trap.title}</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{trap.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advanced Strategies */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-6">Advanced Tax Optimization</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/10 p-6 rounded-xl border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30">
              <h3 className="font-serif text-lg text-[#1D8A70] dark:text-[#3CBF9C] mb-3">Tax-Loss Harvesting</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li className="flex items-start"><div className="w-1.5 h-1.5 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-full mr-3 mt-1.5 flex-none"></div>Offset high-tax short-term gains with losses</li>
                <li className="flex items-start"><div className="w-1.5 h-1.5 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-full mr-3 mt-1.5 flex-none"></div>Section 1256 contracts exempt from wash sale rules</li>
                <li className="flex items-start"><div className="w-1.5 h-1.5 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-full mr-3 mt-1.5 flex-none"></div>Three-year loss carryback for Section 1256 losses</li>
              </ul>
            </div>
            <div className="bg-[#A8672E]/5 dark:bg-[#D08F52]/10 p-6 rounded-xl border border-[#A8672E]/30 dark:border-[#D08F52]/30">
              <h3 className="font-serif text-lg text-[#A8672E] dark:text-[#D08F52] mb-3">Trader Tax Status</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li className="flex items-start"><div className="w-1.5 h-1.5 bg-[#A8672E] dark:bg-[#D08F52] rounded-full mr-3 mt-1.5 flex-none"></div>Removes $3,000 capital loss limitation</li>
                <li className="flex items-start"><div className="w-1.5 h-1.5 bg-[#A8672E] dark:bg-[#D08F52] rounded-full mr-3 mt-1.5 flex-none"></div>Section 475 mark-to-market election available</li>
                <li className="flex items-start"><div className="w-1.5 h-1.5 bg-[#A8672E] dark:bg-[#D08F52] rounded-full mr-3 mt-1.5 flex-none"></div>Requires substantial, regular trading activity</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Implementation Checklist */}
        <section className="mb-4">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-6">Implementation Checklist</h2>
          <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-gray-900 dark:text-white mb-4">Immediate Actions</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 w-4 h-4 accent-[#A8672E] dark:accent-[#D08F52]" />
                    <span className="text-gray-700 dark:text-gray-300">Switch from ETF to index options (SPY &rarr; SPX)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 w-4 h-4 accent-[#A8672E] dark:accent-[#D08F52]" />
                    <span className="text-gray-700 dark:text-gray-300">Review covered call strategies for QCC compliance</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 w-4 h-4 accent-[#A8672E] dark:accent-[#D08F52]" />
                    <span className="text-gray-700 dark:text-gray-300">Implement systematic tax-loss harvesting</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-gray-900 dark:text-white mb-4">Long-term Planning</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 w-4 h-4 accent-[#A8672E] dark:accent-[#D08F52]" />
                    <span className="text-gray-700 dark:text-gray-300">Establish detailed record-keeping system</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 w-4 h-4 accent-[#A8672E] dark:accent-[#D08F52]" />
                    <span className="text-gray-700 dark:text-gray-300">Consult qualified tax professional</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 w-4 h-4 accent-[#A8672E] dark:accent-[#D08F52]" />
                    <span className="text-gray-700 dark:text-gray-300">Evaluate Trader Tax Status eligibility</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
