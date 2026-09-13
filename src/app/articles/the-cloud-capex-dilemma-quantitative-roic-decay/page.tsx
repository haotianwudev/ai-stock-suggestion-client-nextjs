'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// Tooltip component for jargon definition per requirements
const Term = ({ term, definition }: { term: string; definition: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <span 
        className="border-b border-dashed border-gray-500 dark:border-gray-400 cursor-help outline-none focus:ring-2 focus:ring-[#A8672E] dark:focus:ring-[#D08F52] rounded-sm transition-colors"
        tabIndex={0}
      >
        {term}
      </span>
      {isVisible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 text-sm leading-tight text-white bg-gray-900 dark:bg-gray-800 border border-gray-700 shadow-xl rounded z-50 pointer-events-none font-sans text-left">
          {definition}
        </span>
      )}
    </span>
  );
};

const FormulaPanel = ({ formula, exampleTitle, exampleContent }: { formula: React.ReactNode, exampleTitle?: string, exampleContent?: React.ReactNode }) => (
  <div className="bg-[#14171B] dark:bg-[#05070A] text-white rounded-lg p-5 my-6 font-mono shadow-inner border border-gray-800">
    <div className="text-lg mb-3 pb-3 border-b border-gray-700/50">
      {formula}
    </div>
    {exampleTitle && exampleContent && (
      <div className="text-sm mt-3 text-gray-300">
        <span className="text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wider text-xs font-semibold block mb-1">
          {exampleTitle}
        </span>
        <div className="tabular-nums opacity-90">{exampleContent}</div>
      </div>
    )}
  </div>
);

const DichotomyCard = ({ titleA, itemsA, titleB, itemsB }: { titleA: string, itemsA: React.ReactNode[], titleB: string, itemsB: React.ReactNode[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden my-6 shadow-sm">
    <div className="bg-white dark:bg-gray-900 p-6">
      <h4 className="font-serif text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">{titleA}</h4>
      <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        {itemsA.map((item, idx) => <li key={idx} className="flex items-start"><span className="mr-2 text-[#A8672E] dark:text-[#D08F52]">•</span>{item}</li>)}
      </ul>
    </div>
    <div className="bg-gray-50 dark:bg-gray-900/60 p-6">
      <h4 className="font-serif text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">{titleB}</h4>
      <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        {itemsB.map((item, idx) => <li key={idx} className="flex items-start"><span className="mr-2 text-[#A8672E] dark:text-[#D08F52]">•</span>{item}</li>)}
      </ul>
    </div>
  </div>
);

export default function HyperscalerReportPage() {
  return (
    <ArticleFrame
      slug="the-cloud-capex-dilemma-quantitative-roic-decay"
      additionalDisclaimer="Financial modeling, ROIC projections, and reverse DCF valuations are research estimates based on public filings and stated modeling assumptions, not investment advice."
    >
      <div className="space-y-10 max-w-4xl">
        
        {/* Compact Stat Row & Executive Summary */}
        <section aria-label="Key Capex and Valuation Metrics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 border-l-2 border-[#A8672E] dark:border-[#D08F52] bg-gray-50 dark:bg-gray-900/50 rounded-r">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">2026 Agg. Capex</div>
              <div className="font-mono text-2xl tabular-nums font-medium text-gray-900 dark:text-gray-100">$725B</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">77% YoY Increase</div>
            </div>
            <div className="p-4 border-l-2 border-[#BC4128] dark:border-[#E2694A] bg-gray-50 dark:bg-gray-900/50 rounded-r">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Capex / OCF</div>
              <div className="font-mono text-2xl tabular-nums font-medium text-[#BC4128] dark:text-[#E2694A]">1.21x</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Surged from 0.80x in 2025</div>
            </div>
            <div className="p-4 border-l-2 border-[#A8672E] dark:border-[#D08F52] bg-gray-50 dark:bg-gray-900/50 rounded-r">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Cum. Capex (2031)</div>
              <div className="font-mono text-2xl tabular-nums font-medium text-gray-900 dark:text-gray-100">$7.6T</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Modeled projection</div>
            </div>
            <div className="p-4 border-l-2 border-[#BC4128] dark:border-[#E2694A] bg-gray-50 dark:bg-gray-900/50 rounded-r">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Required 2036 FCF</div>
              <div className="font-mono text-2xl tabular-nums font-medium text-[#BC4128] dark:text-[#E2694A]">$4.36T</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Implied by current multiples</div>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <h3 className="font-serif text-xl mb-4 font-medium text-gray-900 dark:text-gray-100">Executive Summary</h3>
            <ul className="space-y-2.5 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-3 text-lg font-bold text-[#A8672E] dark:text-[#D08F52]">&darr;</span>
                <span><Term term="ROIC" definition="Return on Invested Capital: measures return relative to capital invested." /> is projected to compress sharply across all <Term term="hyperscalers" definition="The four primary cloud infrastructure providers: Amazon, Microsoft, Alphabet, and Meta Platforms." /> as the massive expansion of the invested capital denominator outpaces incremental after-tax profits.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg font-bold text-[#A8672E] dark:text-[#D08F52]">&darr;</span>
                <span>Accounting adjustments extending server useful lives to 5.5&ndash;6 years are temporarily masking economic decay, deferring an estimated $176B earnings contraction.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg font-bold text-[#BC4128] dark:text-[#E2694A]">!</span>
                <span>Current market capitalizations (totaling $30.19T) demand a <span className="text-[#BC4128] dark:text-[#E2694A] font-medium">27.4% annual compounding</span> of free cash flow for nine consecutive years to avoid multiple compression.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg font-bold text-[#A8672E] dark:text-[#D08F52]">&darr;</span>
                <span>Grid interconnection queues (5&ndash;8 years) and thermodynamics present physical limits, rendering significant portions of near-term capex stranded.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 1: Accounting Mirage */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-medium border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-gray-100">
            The Accounting Mirage: Depreciation vs. Economic Reality
          </h2>
          <ul className="space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm md:text-base">
            <li>Between 2020 and 2024, a coordinated industry shift extended the estimated useful lives of cloud servers and network equipment from 3&ndash;4 years out to 5.5&ndash;6 years.</li>
            <li>This extension artificially inflates operating income (EBIT) and <Term term="NOPAT" definition="Net Operating Profit After Tax: Operating income multiplied by (1 - effective tax rate)." /> without altering underlying cash flows.</li>
            <li>In 2023&ndash;2025, this maneuver added $3.7B to Microsoft&apos;s operating income, $3.2B to Amazon&apos;s, and $2.9B to Meta&apos;s.</li>
            <li>Hardware obsolescence cycles directly contradict these schedules: GPUs (H100, B200, Rubin) operate on accelerated 12-to-18-month cycles.</li>
          </ul>

          <DichotomyCard 
            titleA="Management View: GPU Value Cascade"
            itemsA={[
              "Years 1-2: Foundational model training requiring peak bandwidth.",
              "Years 3-4: Repurposed for premium real-time inference (amortizing sunk capital).",
              "Years 5-6: Relegated to batch inference, RAG, and utility workloads."
            ]}
            titleB="Quantitative Risk: Rapid Obsolescence"
            itemsB={[
              "New architectures (B200, Rubin) offer 40x performance leaps over previous generations.",
              "Data center space and power limits render older GPUs economically unviable to operate.",
              "Premature hardware retirement triggers severe impairment charges."
            ]}
          />

          <div className="overflow-x-auto my-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 font-mono text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="p-3 font-medium">Hyperscaler</th>
                  <th className="p-3 font-medium">Historical Life</th>
                  <th className="p-3 font-medium">Claimed Life (2026)</th>
                  <th className="p-3 font-medium">Estimated Overstatement Risk (2028)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-800 dark:text-gray-200">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 font-medium">Amazon (AWS)</td>
                  <td className="p-3 tabular-nums">3&ndash;4 Years</td>
                  <td className="p-3 tabular-nums text-[#A8672E] dark:text-[#D08F52]">5 Years (Rev. from 6)</td>
                  <td className="p-3">Contributor to $176B sector-wide understatement</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 font-medium">Microsoft (Azure)</td>
                  <td className="p-3 tabular-nums">4 Years</td>
                  <td className="p-3 tabular-nums text-[#A8672E] dark:text-[#D08F52]">6 Years</td>
                  <td className="p-3">Contributor to $176B sector-wide understatement</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 font-medium">Alphabet (Google)</td>
                  <td className="p-3 tabular-nums">3&ndash;4 Years</td>
                  <td className="p-3 tabular-nums text-[#A8672E] dark:text-[#D08F52]">6 Years</td>
                  <td className="p-3">Contributor to $176B sector-wide understatement</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 font-medium">Meta Platforms</td>
                  <td className="p-3 tabular-nums">3 Years</td>
                  <td className="p-3 tabular-nums text-[#A8672E] dark:text-[#D08F52]">5.5 Years</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">20.8% Earnings Overstatement</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 font-medium">Oracle</td>
                  <td className="p-3 tabular-nums">4&ndash;5 Years</td>
                  <td className="p-3 tabular-nums text-[#A8672E] dark:text-[#D08F52]">6 Years</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">26.9% Earnings Overstatement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: ROIC Decay and EVA Compression */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-medium border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-gray-100">
            Quantitative ROIC Decay and EVA Compression
          </h2>
          <ul className="space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm md:text-base">
            <li>As cash is aggressively depleted to fund GPU procurement, the invested capital denominator is expanding rapidly.</li>
            <li>Derived <Term term="WACC" definition="Weighted Average Cost of Capital: Cost of financing (Debt + Equity) using CAPM. Here ranging 9.87% to 10.50%." /> sits at 9.87% for MSFT, 10.17% for GOOGL, and 10.17% for AMZN.</li>
            <li>While AWS, Azure, and Google Cloud clear their cost of capital (2025&ndash;2030), the <Term term="EVA" definition="Economic Value Added: Economic profit generated above the cost of capital." /> spread is narrowing dramatically.</li>
            <li>By 2030, ROIC is modeled to fall roughly <span className="text-[#BC4128] dark:text-[#E2694A] font-medium">19 percentage points</span> at Microsoft and <span className="text-[#BC4128] dark:text-[#E2694A] font-medium">21 points</span> at Alphabet.</li>
          </ul>

          <FormulaPanel 
            formula={
              <div>
                <span className="text-gray-400">Marginal Capital Productivity = </span> 
                <span className="text-[#1D8A70] dark:text-[#3CBF9C]">&Delta; NOPAT</span> 
                <span className="text-gray-500"> / </span> 
                <span className="text-[#BC4128] dark:text-[#E2694A]">Cumulative Capex</span>
              </div>
            }
            exampleTitle="Capital Efficiency Collapse"
            exampleContent={
              <div className="space-y-1">
                <p>Microsoft (2022&ndash;2025): Every $1.00 of capex generated <span className="text-[#1D8A70] dark:text-[#3CBF9C]">$0.283</span> in new recurring after-tax profit.</p>
                <p>Microsoft (2026&ndash;2030): Every $1.00 of capex generates <span className="text-[#BC4128] dark:text-[#E2694A]">$0.130</span> in new recurring after-tax profit.</p>
              </div>
            }
          />

          <div className="overflow-x-auto my-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 font-mono text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="p-3 font-medium">Hyperscaler</th>
                  <th className="p-3 font-medium">Historical &Delta;NOPAT/Capex</th>
                  <th className="p-3 font-medium">Projected (2026&ndash;2030)</th>
                  <th className="p-3 font-medium">Relative Degradation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-800 dark:text-gray-200 font-mono tabular-nums">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 font-sans font-medium">Microsoft</td>
                  <td className="p-3">28.3%</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">13.0%</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">-54.0%</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 font-sans font-medium">Alphabet</td>
                  <td className="p-3">26.4%</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">11.8%</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">-55.0%</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 font-sans font-medium">Amazon</td>
                  <td className="p-3">13.2%</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">11.6%</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">-12.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Featured Infographic placed inline */}
        <InfographicSlot alt="Quantitative ROIC decay and capital efficiency collapse across hyperscaler AI infrastructure" />

        {/* Section 3: Physical Bottlenecks */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-medium border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-gray-100">
            Physical Bottlenecks: Power Economics &amp; Thermal Constraints
          </h2>
          <ul className="space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm md:text-base">
            <li>AI data centers require between 20 MW and 1 GW of electricity, acting as heavy industrial manufacturing plants.</li>
            <li>Power requirements shatter historical envelopes: traditional server racks consume 15&ndash;25 kW; B200 architectures approach 250 kW per rack.</li>
            <li>Grid interconnection queues in major corridors (e.g., PJM) stretch from 5 to 8 years.</li>
            <li>A three-year energization delay on a 100 MW campus incurs a <span className="text-[#BC4128] dark:text-[#E2694A] font-medium">$70M/year penalty</span> in lost power allocation and capital carrying costs.</li>
          </ul>

          <DichotomyCard 
            titleA="Legacy Air-Cooled Facilities"
            itemsA={[
              "Cooling Efficiency (PUE): 1.35 to 1.50.",
              "Wastes up to 33% of incoming grid power on fans and ambient chillers.",
              "Incapable of sustaining silicon without catastrophic thermal failure."
            ]}
            titleB="Liquid-Cooled AI Campuses"
            itemsB={[
              "Cooling Efficiency (PUE): 1.08 to 1.15.",
              "Direct-to-chip liquid cooling required to prevent silicon throttling.",
              "Reduces grid draw by ~14 MW on a 100 MW site (saving $10M/year overhead)."
            ]}
          />
        </section>

        {/* Section 4: AI Workloads and Unit Economics */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-medium border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-gray-100">
            AI Workloads and Unit Economics
          </h2>
          <ul className="space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm md:text-base">
            <li>Large language model inference is memory-bound (constrained by High Bandwidth Memory capacity), not purely compute-bound.</li>
            <li>The H200 features a 76% VRAM upgrade (141 GB HBM3e) over the H100, resulting in 25% to 60% higher token throughput.</li>
            <li>Despite a higher hourly rental rate ($28.72/hr vs $21.52/hr), the H200 costs <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-medium">~7% less per million tokens</span> due to throughput advantages.</li>
            <li><strong>Utilization Risk:</strong> Cost per million tokens varies by up to <span className="text-[#BC4128] dark:text-[#E2694A] font-semibold">36.3x</span> purely based on request rate. If utilization drops below 40%, fixed capex becomes a permanent balance sheet drag.</li>
          </ul>
        </section>

        {/* Section 5: Reverse DCF */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-medium border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-gray-100">
            Reverse DCF Analysis: The Monetization Hurdle
          </h2>
          <ul className="space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm md:text-base">
            <li>At Q3 2026, the core AI infrastructure complex market capitalization exceeded $30.19 Trillion (~40% of the S&amp;P 500).</li>
            <li>A <Term term="Reverse DCF" definition="Reverse Discounted Cash Flow: Begins with market cap and solves backward to determine the required FCF CAGR." /> indicates the market prices in a <span className="text-[#A8672E] dark:text-[#D08F52] font-medium">27.4% annual compounding</span> of free cash flow for nine consecutive years.</li>
            <li>This requires these companies to generate <span className="text-[#A8672E] dark:text-[#D08F52] font-medium">$4.36 Trillion</span> in pure free cash flow by 2036 (representing ~94.5% of all current US corporate profits).</li>
            <li>The industry currently generates a mere $50B to $150B annually in AI-attributable revenue; the 2026 capex wave roughly doubles the depreciable asset base.</li>
          </ul>

          <div className="overflow-x-auto my-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 font-mono text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="p-3 font-medium">Metric</th>
                  <th className="p-3 font-medium">MSFT</th>
                  <th className="p-3 font-medium">GOOGL</th>
                  <th className="p-3 font-medium">AMZN</th>
                  <th className="p-3 font-medium">META</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-800 dark:text-gray-200 font-mono tabular-nums">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 font-sans font-medium">Market Capitalization (Q3 &apos;26)</td>
                  <td className="p-3">$3.71T</td>
                  <td className="p-3">$4.14T</td>
                  <td className="p-3">$2.79T</td>
                  <td className="p-3">~$1.65T</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 font-sans font-medium">Implied FCF CAGR</td>
                  <td className="p-3">22.1%</td>
                  <td className="p-3">24.3%</td>
                  <td className="p-3">21.8%</td>
                  <td className="p-3">19.5%</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 font-sans font-medium text-[#A8672E] dark:text-[#D08F52]">Base AI Revenue Gap (6-Yr D&amp;A)</td>
                  <td className="p-3 text-[#A8672E] dark:text-[#D08F52]">$145B/Yr</td>
                  <td className="p-3 text-[#A8672E] dark:text-[#D08F52]">$162B/Yr</td>
                  <td className="p-3 text-[#A8672E] dark:text-[#D08F52]">$120B/Yr</td>
                  <td className="p-3 text-[#A8672E] dark:text-[#D08F52]">$75B/Yr</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 bg-[#BC4128]/5 dark:bg-[#E2694A]/10 transition-colors">
                  <td className="p-3 font-sans font-medium text-[#BC4128] dark:text-[#E2694A]">Burry AI Revenue Gap (3.5-Yr D&amp;A)</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">$192B/Yr</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">$215B/Yr</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">$158B/Yr</td>
                  <td className="p-3 text-[#BC4128] dark:text-[#E2694A]">$105B/Yr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Credit Risk & Macro Scenario */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-medium border-b border-gray-200 dark:border-gray-800 pb-2 text-gray-900 dark:text-gray-100">
            Institutional Credit Risk &amp; The Macroeconomic Mandate
          </h2>
          <ul className="space-y-3 list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm md:text-base">
            <li>Tech sector bond issuance reached 16.7% of global nonfinancial bond supply in 2025 to fund infrastructure with severe obsolescence risks.</li>
            <li>NBER research (w35290) models that assuming zero-NPV marginal investments, AI-sector productivity must multiply by exactly <span className="text-[#A8672E] dark:text-[#D08F52] font-medium">2.7x</span> just to justify current capex commitments.</li>
            <li>If the expected software licensing cash flows fail to materialize against fixed debt/lease obligations, the capital deepening becomes highly destructive.</li>
          </ul>

          <div className="overflow-x-auto my-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 font-mono text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="p-3 font-medium">Macro Scenario (NBER)</th>
                  <th className="p-3 font-medium">Implied TFP Gain</th>
                  <th className="p-3 font-medium">Hyperscaler Consequence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-800 dark:text-gray-200">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 font-medium">Baseline (Zero-NPV)</td>
                  <td className="p-3 font-mono tabular-nums text-[#A8672E] dark:text-[#D08F52]">2.7x Multiplier</td>
                  <td className="p-3">Avoids insolvency; WACC elevation &amp; minor multiple contraction.</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 font-medium">Transformative</td>
                  <td className="p-3 font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">5.0x+ Multiplier</td>
                  <td className="p-3">Generates $4.36T FCF required by Reverse DCF; justifies valuation.</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="p-3 font-medium">Failure to Launch</td>
                  <td className="p-3 font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">&lt; 1.0x (Standard)</td>
                  <td className="p-3">Catastrophic capital misallocation; deep market crash risk.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
