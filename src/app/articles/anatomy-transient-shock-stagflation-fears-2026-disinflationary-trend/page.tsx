'use client';

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

const oilPriceData = [
  { period: 'Feb 2026 (Pre)', Brent: 72.87, WTI: 67.02 },
  { period: 'Apr 2026 (Peak)', Brent: 118.03, WTI: 111.54 },
  { period: 'Jun 2026 (Res)', Brent: 73.34, WTI: 70.04 },
];

const cpiData = [
  { category: 'Headline CPI', rate: 4.2, fill: '#BC4128' },
  { category: 'Core CPI', rate: 2.9, fill: '#1D8A70' },
  { category: 'Food', rate: 3.1, fill: '#A8672E' },
  { category: 'Energy', rate: 23.5, fill: '#E2694A' },
];

const breakevenData = [
  { metric: '5-Year', rate: 2.21 },
  { metric: '10-Year', rate: 2.20 },
  { metric: '5Y5Y Forward', rate: 2.19 },
];

export default function TransientShockArticle() {
  return (
    <ArticleFrame 
      slug="anatomy-transient-shock-stagflation-fears-2026-disinflationary-trend"
      additionalDisclaimer="The macroeconomic analysis presented represents a theoretical framework and should not be the sole basis for investment decisions."
    >
      <div className="space-y-12">
        <InfographicSlot alt="Transient Shock Infographic - Energy Crisis and Disinflationary Analysis" />

        <div className="bg-white dark:bg-gray-900 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 shadow-sm">
          <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4 border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current flex-none" />
            Key Takeaways
          </h3>
          <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>The 2026 energy shock was transient, with Brent crude peaking at $118 before crashing to $73, truncating the supply-side inflation transmission mechanism.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>May 2026 CPI highlighted a divergence: volatile headline inflation masked core deflationary undercurrents in medical care and used cars.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>The US economy's structural resilience (declining energy intensity, domestic production buffer, margin compression) neutralized aggregate national employment losses.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Market breakeven inflation rates collapsed back toward the Fed's 2.0% target, validating the transient nature of the stagflation fears.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Under Chairman Kevin Warsh, the Federal Reserve implemented a hawkish shift, driving an orderly disinflationary stabilization.</span>
            </li>
          </ul>
        </div>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Geopolitics & The Energy Shock
          </h2>
          <p className="mb-6">
            The 2026 conflict between the United States and Iran caused a severe bottleneck at the Strait of Hormuz, shutting in over 10.5 million barrels per day. The geopolitical risk premium skyrocketed, pushing Brent crude to a peak of <strong className="text-[#BC4128] dark:text-[#E2694A]">$118.03/bbl</strong> in April 2026.
          </p>
          <p className="mb-8">
            However, the "oil bubble" burst abruptly. The mid-June Geneva peace agreement and aggressive supply responses from non-Middle Eastern producers crashed the market, erasing wartime gains and truncating the supply-side inflation transmission mechanism.
          </p>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-center">
              Crude Oil Benchmark Volatility (2026)
            </h3>
            <div className="h-80 w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height="100%" minWidth={500}>
                <LineChart data={oilPriceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" vertical={false} />
                  <XAxis dataKey="period" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                  <YAxis domain={[50, 130]} tick={{fill: '#64748b'}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff', color: '#0f172a' }}
                    formatter={(value) => [`$${value}`, undefined]}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="Brent" stroke="#BC4128" strokeWidth={3} dot={{r: 6, strokeWidth: 2}} activeDot={{r: 8}} />
                  <Line type="monotone" dataKey="WTI" stroke="#A8672E" strokeWidth={3} dot={{r: 6, strokeWidth: 2}} activeDot={{r: 8}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Deconstructing the Inflation Paradox
          </h2>
          <p className="mb-10">
            The May 2026 CPI report highlighted a stark divergence: soaring headline metrics driven entirely by volatile energy, masked by a rapidly cooling macroeconomic core.
          </p>

          <ComparisonGrid>
            <ComparisonCard title="The Energy-Driven Surge" tone="neg">
              <p className="text-sm">
                Headline CPI hit <strong className="text-slate-900 dark:text-slate-100">4.2% YoY</strong>, generating immense stagflation anxiety. However, this was hyper-concentrated. Energy prices rose <strong className="text-slate-900 dark:text-slate-100">23.5%</strong> annually, with fuel oil skyrocketing nearly <strong className="text-slate-900 dark:text-slate-100">59%</strong>.
              </p>
            </ComparisonCard>
            <ComparisonCard title="Core Deflationary Undercurrents" tone="pos">
              <p className="text-sm">
                Core CPI (excluding food and energy) rose a benign <strong className="text-slate-900 dark:text-slate-100">0.2% MoM</strong>. Critical categories like used cars (<strong className="text-slate-900 dark:text-slate-100">-2.0%</strong>) and medical care commodities (<strong className="text-slate-900 dark:text-slate-100">-1.8%</strong>) experienced outright deflation.
              </p>
            </ComparisonCard>
          </ComparisonGrid>

          <div className="mt-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100 mb-6 text-center">
              May 2026 CPI Decomposition (YoY)
            </h3>
            <div className="h-64 w-full overflow-x-auto">
              <ResponsiveContainer width="100%" height="100%" minWidth={400}>
                <BarChart data={cpiData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#cbd5e1" />
                  <XAxis type="number" domain={[0, 25]} tick={{fill: '#64748b'}} axisLine={false} tickFormatter={(v) => `${v}%`} />
                  <YAxis dataKey="category" type="category" tick={{fill: '#475569', fontWeight: 600}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="rate" radius={[0, 6, 6, 0]}>
                    {cpiData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Structural Resilience
          </h2>
          <p className="mb-6">
            Why 2026 is not 1973. The US economy has profoundly transformed, dismantling the mechanisms that previously converted oil shocks into stagflation.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/5 p-6 rounded-xl border border-[#1D8A70]/20 dark:border-[#3CBF9C]/20">
              <h3 className="font-serif text-lg font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-3">Declining Energy Intensity</h3>
              <p className="text-sm">
                The economy consumes less than 1/3 of the oil per $1,000 of GDP compared to fifty years ago. Total energy usage has plummeted from 13.3% to 5.7% of GDP.
              </p>
            </div>
            <div className="bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/5 p-6 rounded-xl border border-[#1D8A70]/20 dark:border-[#3CBF9C]/20">
              <h3 className="font-serif text-lg font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-3">Domestic Production Buffer</h3>
              <p className="text-sm">
                The US is now a dominant producer. Price spikes generate robust job gains and capital inflows in oil-producing states, completely neutralizing aggregate national employment losses.
              </p>
            </div>
            <div className="bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/5 p-6 rounded-xl border border-[#1D8A70]/20 dark:border-[#3CBF9C]/20">
              <h3 className="font-serif text-lg font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-3">Margin Compression</h3>
              <p className="text-sm">
                Corporate America chose to absorb the supply shock. Data showed 80% of firms made "small to no change" in retail pricing to prevent demand destruction.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The Collapse of Market Expectations
          </h2>
          <p className="mb-6">
            If the bond market genuinely feared stagflation, long-term inflation expectations would be rising sharply. Instead, institutional investors are demanding significantly <em>lower</em> compensation for inflation risk. By late June 2026, breakeven inflation rates across all major time horizons systematically collapsed toward the Fed's <strong className="text-slate-900 dark:text-slate-100">2.0%</strong> target.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {breakevenData.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 flex flex-col items-center text-center">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">{item.metric}</div>
                <div className="text-3xl font-serif font-black text-[#1D8A70] dark:text-[#3CBF9C]">{item.rate}%</div>
                <div className="mt-3 text-xs font-medium text-slate-600 dark:text-slate-300">
                  Declining Trend
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The "Warsh Effect"
          </h2>
          <p className="mb-6">
            Newly appointed Federal Reserve Chairman Kevin Warsh has implemented a severe, uncompromising shift in monetary policy execution. Defined by austere communication, the death of forward guidance, and a rigid adherence to absolute price stability.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-6 rounded-2xl border border-[#A8672E]/30 dark:border-[#D08F52]/30 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-4">Monetary Regime Change</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#A8672E] dark:text-[#D08F52] mt-0.5 flex-none">•</span>
                  <span>Refused to submit a projection to the 'Dot Plot'</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#A8672E] dark:text-[#D08F52] mt-0.5 flex-none">•</span>
                  <span>Eliminated standard dovish forward guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#A8672E] dark:text-[#D08F52] mt-0.5 flex-none">•</span>
                  <span>Formed task forces to overhaul Fed orthodoxy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#A8672E] dark:text-[#D08F52] mt-0.5 flex-none">•</span>
                  <span>Repudiated the Phillips Curve trade-off</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center text-center">
              <blockquote className="font-serif italic text-lg text-slate-700 dark:text-slate-300 mb-4">
                "Financial market prices are probably the most important source of information... But when all the financial markets are doing is reflecting back what we've said, then we're being blind to it."
              </blockquote>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">Kevin Warsh</div>
              <div className="text-xs text-slate-500">Chairman, Federal Reserve (June 2026)</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Stagflation vs. Demand Destruction
          </h2>
          <p className="mb-8">
            Could falling gas prices cause demand-driven inflation? Structural labor constraints say no. The economy is incapable of overheating.
          </p>

          <ComparisonGrid>
            <ComparisonCard title="Stagnant Real Wage Growth" tone="neutral">
              <p className="text-sm">
                Real hourly earnings decreased by <strong className="text-slate-900 dark:text-slate-100">0.09%</strong> in May. Consumers lack the fundamental purchasing power required to trigger a demand-pull inflationary spiral.
              </p>
            </ComparisonCard>
            <ComparisonCard title="Low-Hire, Low-Fire Equilibrium" tone="neutral">
              <p className="text-sm">
                Job growth has slowed to <strong className="text-slate-900 dark:text-slate-100">22,500/month</strong>. While mass layoffs are rare, the stagnant labor market limits money velocity and severely restrains consumer confidence.
              </p>
            </ComparisonCard>
          </ComparisonGrid>

          <div className="mt-12 bg-white dark:bg-gray-900 p-8 rounded-3xl border border-[#A8672E]/30 dark:border-[#D08F52]/30 shadow-md text-center">
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">The Disinflationary Conclusion</h3>
            <p className="text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              The stagflation narrative of early 2026 was a premature and fundamentally flawed assessment. As oil prices revert, and severe structural constraints on consumer demand hold firm, the underlying trajectory of the United States economy points toward an orderly, <strong className="text-[#1D8A70] dark:text-[#3CBF9C]">disinflationary stabilization</strong> managed by a highly credible, hawkish central bank.
            </p>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
