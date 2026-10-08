'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock } from '@/components/articles/math';

const Jargon = ({ term, definition }: { term: string; definition: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="group relative inline-block cursor-help"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
    >
      <span className="border-b-2 border-dashed border-gray-400 dark:border-gray-500 hover:text-[#A8672E] dark:hover:text-[#D08F52] focus:text-[#A8672E] dark:focus:text-[#D08F52] focus:outline-none transition-colors duration-200">
        {term}
      </span>
      <span
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-sans rounded-md shadow-xl transition-all z-20 pointer-events-none ${
          isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <strong className="block mb-1 font-serif text-[#A8672E] dark:text-[#D08F52]">{term}</strong>
        {definition}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
      </span>
    </span>
  );
};

export default function PreciousMetalsMacroPage() {
  return (
    <ArticleFrame
      slug="precious-metals-macroeconomic-risks"
      additionalDisclaimer="Precious metals, sovereign debt, and macroeconomic asset allocation involve substantial market risk and volatility. Quantitative models, yield metrics, and scenario analyses are presented solely for educational and research purposes."
    >
      <div className="max-w-5xl mx-auto px-4 py-8 text-gray-800 dark:text-gray-200 antialiased space-y-16">
        {/* Stat Highlights Bar */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Spot Gold</div>
              <div className="font-mono tabular-nums text-2xl font-bold text-[#BC4128] dark:text-[#E2694A]">~$4,100.00</div>
              <div className="text-xs font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A] mt-1">-12.6% from Aug high</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">U.S. 10-Yr Yield</div>
              <div className="font-mono tabular-nums text-2xl font-bold text-[#BC4128] dark:text-[#E2694A]">5.36%</div>
              <div className="text-xs font-mono tabular-nums text-gray-500 dark:text-gray-400 mt-1">30-Yr at 5.72%</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">10-Yr TIPS Yield</div>
              <div className="font-mono tabular-nums text-2xl font-bold text-[#A8672E] dark:text-[#D08F52]">2.95%</div>
              <div className="text-xs font-mono tabular-nums text-gray-500 dark:text-gray-400 mt-1">Highest since Nov 2008</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Fed Funds Target</div>
              <div className="font-mono tabular-nums text-2xl font-bold text-gray-900 dark:white">3.75%–4.00%</div>
              <div className="text-xs font-mono tabular-nums text-gray-500 dark:text-gray-400 mt-1">Following 25-bps hike</div>
            </div>
          </div>
        </section>

        {/* Section 1: Quantitative Aspects of Current Regime */}
        <section className="space-y-8">
          <h2 className="font-serif text-3xl text-gray-900 dark:text-white border-b-2 border-[#A8672E] dark:border-[#D08F52] pb-2 inline-block">
            Quantitative Aspects of the Current Market Regime
          </h2>

          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-gray-800 dark:text-gray-200">Precious Metals Pricing Dynamics</h3>
            <ul className="list-disc list-outside ml-6 space-y-3">
              <li>
                Spot gold sits at a 9-week low of <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">~$4,100/oz</span>, representing a <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">25.63%</span> drop from its <span className="font-mono tabular-nums">Jan 2026</span> peak of <span className="font-mono tabular-nums">$5,608.35</span>.
              </li>
              <li>
                Silver has plummeted below <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">$60.00/oz</span>, a massive decline from its <span className="font-mono tabular-nums">$121.00</span> peak earlier in <span className="font-mono tabular-nums">2026</span>.
              </li>
              <li>
                Industrial silver demand in the solar sector is projected to decline <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">20%</span> globally in <span className="font-mono tabular-nums">2026</span> (<span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">33%</span> in China) due to technological substitution.
              </li>
              <li>
                London commercial vaults held over <span className="font-mono tabular-nums">914 million</span> ounces of silver at August&apos;s close, with <span className="font-mono tabular-nums">300 million</span> classified as freely available (a <span className="font-mono tabular-nums">70%</span> YoY increase), destroying the scarcity premium.
              </li>
            </ul>
          </div>

          {/* Mathematical Box: Yield Opportunity Cost Paradigm */}
          <div className="bg-[#14171B] dark:bg-[#05070A] text-white p-6 md:p-8 rounded-xl shadow-2xl overflow-x-auto w-full border border-gray-800">
            <div className="text-[#A8672E] dark:text-[#D08F52] text-sm uppercase tracking-widest font-mono mb-4">
              Yield Opportunity Cost Paradigm
            </div>
            <MathBlock
              math="y_{\text{real}} = y_{\text{nominal}} - \pi_{\text{breakeven}}"
              className="text-white text-lg md:text-xl mb-4"
            />
            <hr className="border-gray-700 my-6" />
            <div className="font-mono text-sm text-gray-400 mb-3">
              // Empirical calculation based on current U.S. 10-Year Treasury metrics
            </div>
            <div className="font-mono text-base md:text-lg tabular-nums space-y-1 w-full max-w-sm">
              <div className="flex justify-between">
                <span>Nominal 10-Year Yield:</span>
                <span>5.36%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>- 10-Year Breakeven:</span>
                <span>2.41%</span>
              </div>
              <div className="border-t border-gray-700 my-2 pt-2 flex justify-between font-bold">
                <span>Real Yield:</span>
                <span className="text-[#BC4128] dark:text-[#E2694A]">2.95%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-serif text-2xl text-gray-800 dark:text-gray-200">The Warsh Federal Reserve</h3>
            <ul className="list-disc list-outside ml-6 space-y-3">
              <li>
                The FOMC executed a unanimous <span className="font-mono tabular-nums">12-0</span> vote to raise the benchmark rate to <span className="font-mono tabular-nums">3.75%–4.00%</span>.
              </li>
              <li>
                The policy statement was contracted to merely <span className="font-mono tabular-nums">114</span> words, eliminating long-term forward guidance.
              </li>
              <li>
                Markets are pricing in a <span className="font-mono tabular-nums">69%</span> probability of an additional rate hike by December <span className="font-mono tabular-nums">2026</span>.
              </li>
            </ul>
          </div>
        </section>

        {/* Featured Infographic Inline */}
        <InfographicSlot
          alt="Quantitative Analysis of Precious Metals and Macroeconomic Risks"
          label="Featured Infographic"
        />

        {/* Section 2: Structural Demand Bifurcation */}
        <section className="space-y-6">
          <h3 className="font-serif text-2xl text-gray-800 dark:text-gray-200">Structural Demand Bifurcation (Q2 2026)</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Western ETFs */}
            <div className="p-6 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50">
              <h4 className="font-serif text-xl text-[#BC4128] dark:text-[#E2694A] mb-4">Western Financial ETFs</h4>
              <ul className="list-disc list-outside ml-5 space-y-2 text-sm md:text-base">
                <li>
                  <span className="font-semibold text-gray-900 dark:text-white">Behavior:</span> Highly elastic, inversely correlated to real yields.
                </li>
                <li>
                  <span className="font-semibold text-gray-900 dark:text-white">Flows (Q2 2026):</span> Hemorrhaged <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-45 Tonnes</span> (culminating in a <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">-61 Tonne</span> loss for H1).
                </li>
                <li>
                  <span className="font-semibold text-gray-900 dark:text-white">Driver:</span> Capital rotation away from zero-yield assets to harvest the <span className="font-mono tabular-nums">5.36%</span> risk-free sovereign rate.
                </li>
                <li>
                  <span className="font-semibold text-gray-900 dark:text-white">Projection:</span> Silver-backed funds could lose <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">40 million</span> ounces by Dec <span className="font-mono tabular-nums">2027</span> under current conditions.
                </li>
              </ul>
            </div>

            {/* Eastern Central Banks */}
            <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50">
              <h4 className="font-serif text-xl text-[#1D8A70] dark:text-[#3CBF9C] mb-4">Global Central Banks</h4>
              <ul className="list-disc list-outside ml-5 space-y-2 text-sm md:text-base">
                <li>
                  <span className="font-semibold text-gray-900 dark:text-white">Behavior:</span> Highly inelastic, driven by strategic multi-year purchasing mandates.
                </li>
                <li>
                  <span className="font-semibold text-gray-900 dark:text-white">Flows (Q2 2026):</span> Acquired a record <span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+289 Tonnes</span> of physical gold.
                </li>
                <li>
                  <span className="font-semibold text-gray-900 dark:text-white">Key Buyers:</span> PBOC (<span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+33t</span>, 23rd consecutive month), Poland (<span className="font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">+51t</span>).
                </li>
                <li>
                  <span className="font-semibold text-gray-900 dark:text-white">Driver:</span> De-dollarization imperatives, geopolitical hedging, and long-term reserve diversification.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Major Systemic Risks */}
        <section className="space-y-8">
          <h2 className="font-serif text-3xl text-gray-900 dark:text-white border-b-2 border-[#A8672E] dark:border-[#D08F52] pb-2 inline-block">
            Major Systemic Risks (2026-2027)
          </h2>

          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-gray-800 dark:text-gray-200">The Small-Cap Refinancing Cliff</h3>
            <p className="text-gray-700 dark:text-gray-300">
              A severe structural fault line exists between capitalization tiers due to floating-rate debt exposure under restrictive monetary policy.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="p-3 border-b border-gray-200 dark:border-gray-700 font-serif font-medium">Metric</th>
                    <th className="p-3 border-b border-gray-200 dark:border-gray-700 font-serif font-medium text-[#BC4128] dark:text-[#E2694A]">Russell 2000 (Small-Cap)</th>
                    <th className="p-3 border-b border-gray-200 dark:border-gray-700 font-serif font-medium text-[#1D8A70] dark:text-[#3CBF9C]">S&P 500 (Large-Cap)</th>
                  </tr>
                </thead>
                <tbody className="font-mono tabular-nums text-sm md:text-base">
                  <tr>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 font-sans font-medium text-gray-900 dark:text-white">Floating-Rate Debt Exposure</td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-[#BC4128] dark:text-[#E2694A]">~40%</td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-[#1D8A70] dark:text-[#3CBF9C]">&lt; 10%</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 font-sans font-medium text-gray-900 dark:text-white">Interest Expense as % of EBITDA</td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-[#BC4128] dark:text-[#E2694A]">31.0%</td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-[#1D8A70] dark:text-[#3CBF9C]">6.7%</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 font-sans font-medium text-gray-900 dark:text-white">Unprofitable Companies in Index</td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-[#BC4128] dark:text-[#E2694A]">+40% to 46%</td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-[#1D8A70] dark:text-[#3CBF9C]">~6%</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 font-sans font-medium text-gray-900 dark:text-white">Forward Earnings Valuation</td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-[#BC4128] dark:text-[#E2694A]">-31% discount</td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-[#1D8A70] dark:text-[#3CBF9C]">Baseline Benchmark</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
              <h4 className="font-serif text-lg font-bold text-gray-900 dark:text-white mb-2">Sovereign Debt Surge</h4>
              <p className="text-sm">
                The U.S. national debt has scaled to <span className="font-mono tabular-nums">$40 trillion</span>. This requires massive Treasury issuance, cementing an era of <Jargon term="fiscal dominance" definition="A regime where the sheer volume of sovereign debt supply overwhelms traditional monetary policy transmission mechanisms." />, heavily expanding the <Jargon term="term premium" definition="The additional compensation that fixed-income investors require to bear duration risk and inflation uncertainty over several decades." />.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
              <h4 className="font-serif text-lg font-bold text-gray-900 dark:text-white mb-2">Structural Inflation</h4>
              <p className="text-sm">
                Brent crude oil approaching <span className="font-mono tabular-nums">$101.80</span> due to geopolitical frictions threatens to add <span className="font-mono tabular-nums">0.5</span> percentage points to PCE inflation in early <span className="font-mono tabular-nums">2027</span>. Headline CPI remains structurally sticky at <span className="font-mono tabular-nums">3.4%</span>.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
              <h4 className="font-serif text-lg font-bold text-gray-900 dark:text-white mb-2">European Contagion</h4>
              <p className="text-sm">
                The Franco-German 10-year yield spread has widened to nearly <span className="font-mono tabular-nums">160</span> basis points (French 10-year at <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">4.91%</span>). U.K. 30-year gilts approach <span className="font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">6.00%</span> for the first time since <span className="font-mono tabular-nums">1998</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Empirical Facts vs. Structural Unknowns */}
        <section className="space-y-6">
          <h2 className="font-serif text-3xl text-gray-900 dark:text-white border-b-2 border-[#A8672E] dark:border-[#D08F52] pb-2 inline-block">
            Empirical Facts vs. Structural Unknowns
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-gray-800 dark:text-gray-200 uppercase tracking-widest text-sm">Empirical Facts</h3>
              <ul className="list-disc list-inside space-y-3 marker:text-[#A8672E] dark:marker:text-[#D08F52]">
                <li>U.S. 10-year yield firmly established at <span className="font-mono tabular-nums">5.36%</span>.</li>
                <li>10-year TIPS <Jargon term="real yield" definition="Nominal interest rates adjusted for market-implied inflation expectations. Historically, a real yield near 2.50% caps gold appreciation." /> defines severe opportunity cost at <span className="font-mono tabular-nums text-[#A8672E] dark:text-[#D08F52]">2.95%</span>.</li>
                <li>Sovereign nations continue explicit de-dollarization via physical bullion acquisition.</li>
                <li>Small-cap entities mathematically impaired by <span className="font-mono tabular-nums">40%</span> floating-rate exposure.</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-gray-800 dark:text-gray-200 uppercase tracking-widest text-sm">Structural Unknowns</h3>
              <ul className="list-disc list-inside space-y-3 marker:text-gray-400">
                <li>The ultimate terminal peak required for the federal funds rate to break sticky inflation.</li>
                <li>The exact threshold where the Russell 2000 refinancing cliff triggers cascading defaults.</li>
                <li>Whether sovereign central bank buyers will maintain price inelasticity if gold retests <span className="font-mono tabular-nums">$5,000</span>.</li>
                <li>The full lag effects of the jump to <span className="font-mono tabular-nums">4.00%</span> on domestic employment data.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Macroeconomic Synthesis & Key Takeaways */}
        <section className="mt-12 bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 p-8 rounded-2xl shadow-xl">
          <h2 className="font-serif text-2xl text-[#A8672E] dark:text-[#D08F52] mb-6">
            Macroeconomic Synthesis & Key Takeaways
          </h2>
          <ul className="space-y-4 font-medium text-lg leading-relaxed">
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">✦</span>
              <span>
                <strong>Loss of Western Pricing Dictatorship:</strong> The structural demand vector from Eastern central banks acts as a formidable price floor. Western financial ETFs liquidating <span className="font-mono tabular-nums">61</span> tonnes were seamlessly eclipsed by <span className="font-mono tabular-nums">289</span> tonnes of sovereign purchases.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">✦</span>
              <span>
                <strong>Potential for Parabolic Retest:</strong> If economic contraction forces the Federal Reserve to pause or cut rates, reversing the real yield trajectory, returning Western capital colliding with inelastic sovereign demand will likely force gold to breach all-time highs of <span className="font-mono tabular-nums">$5,600</span>.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">✦</span>
              <span>
                <strong>Forced Corporate Consolidation:</strong> With <span className="font-mono tabular-nums">30</span>-year Treasury yields entrenched above <span className="font-mono tabular-nums">5.70%</span>, massive distress in the Russell 2000 will likely catalyze an accelerating monopolization of the U.S. economy as mega-caps acquire distressed competitors.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">✦</span>
              <span>
                <strong>The Fiscal Doom Loop:</strong> By holding short-term rates at <span className="font-mono tabular-nums">4.00%</span>, the Fed inadvertently causes the government&apos;s annualized interest expense to explode, necessitating more debt issuance which the market only absorbs at higher yields.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </ArticleFrame>
  );
}
