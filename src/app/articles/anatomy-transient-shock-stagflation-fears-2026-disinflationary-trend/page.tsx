'use client';

import React from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  Droplet, 
  ShieldCheck, 
  Activity, 
  AlertTriangle,
  BatteryWarning,
  Users,
  DollarSign,
  Landmark
} from 'lucide-react';
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

const oilPriceData = [
  { period: 'Feb 2026 (Pre)', Brent: 72.87, WTI: 67.02 },
  { period: 'Apr 2026 (Peak)', Brent: 118.03, WTI: 111.54 },
  { period: 'Jun 2026 (Res)', Brent: 73.34, WTI: 70.04 },
];

const cpiData = [
  { category: 'Headline CPI', rate: 4.2, fill: '#ef4444' },
  { category: 'Core CPI', rate: 2.9, fill: '#10b981' },
  { category: 'Food', rate: 3.1, fill: '#f59e0b' },
  { category: 'Energy', rate: 23.5, fill: '#6366f1' },
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
      <div className="py-8">
        
        <div className="mb-12">
          <InfographicSlot 
            alt="Transient Shock Infographic - Energy Crisis and Disinflationary Analysis" 
          />
        </div>

        {/* Energy Shock Section */}
        <section className="mb-16">
          <div className="flex flex-col gap-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-red-100 text-red-600 rounded-xl mr-4">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Geopolitics &amp; The Energy Shock</h2>
              </div>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                The 2026 conflict between the United States and Iran caused a severe bottleneck at the Strait of Hormuz, shutting in over 10.5 million barrels per day. The geopolitical risk premium skyrocketed, pushing Brent crude to a peak of <strong className="text-red-600">$118.03/bbl</strong> in April 2026.
              </p>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                However, the &ldquo;oil bubble&rdquo; burst abruptly. The mid-June Geneva peace agreement and aggressive supply responses from non-Middle Eastern producers crashed the market, erasing wartime gains and truncating the supply-side inflation transmission mechanism.
              </p>
              
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">Crude Oil Benchmark Volatility (2026)</h3>
                <div className="h-80 w-full overflow-x-auto">
                  <ResponsiveContainer width="100%" height="100%" minWidth={500}>
                    <LineChart data={oilPriceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="period" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                      <YAxis domain={[50, 130]} tick={{fill: '#64748b'}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value) => [`$${value}`, undefined]}
                      />
                      <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                      <Line type="monotone" dataKey="Brent" stroke="#6366f1" strokeWidth={3} dot={{r: 6, strokeWidth: 2}} activeDot={{r: 8}} />
                      <Line type="monotone" dataKey="WTI" stroke="#0ea5e9" strokeWidth={3} dot={{r: 6, strokeWidth: 2}} activeDot={{r: 8}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CPI Paradox Section */}
        <section className="mb-16">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Deconstructing the Inflation Paradox</h2>
            <p className="text-xl text-slate-600">
              The May 2026 CPI report highlighted a stark divergence: soaring headline metrics driven entirely by volatile energy, masked by a rapidly cooling macroeconomic core.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" />
                May 2026 CPI Decomposition (YoY)
              </h3>
              <div className="h-64 w-full overflow-x-auto">
                <ResponsiveContainer width="100%" height="100%" minWidth={400}>
                  <BarChart data={cpiData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" domain={[0, 25]} tick={{fill: '#64748b'}} axisLine={false} tickFormatter={(v) => `${v}%`} />
                    <YAxis dataKey="category" type="category" tick={{fill: '#475569', fontWeight: 600}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="rate" radius={[0, 6, 6, 0]}>
                      {cpiData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <BatteryWarning className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">The Energy-Driven Surge</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Headline CPI hit <strong>4.2% YoY</strong>, generating immense stagflation anxiety. However, this was hyper-concentrated. Energy prices rose <strong>23.5%</strong> annually, with fuel oil skyrocketing nearly <strong>59%</strong>.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Core Deflationary Undercurrents</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Core CPI (excluding food and energy) rose a benign <strong>0.2% MoM</strong>. Critical categories like used cars (<strong>-2.0%</strong>) and medical care commodities (<strong>-1.8%</strong>) experienced outright deflation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Structural Resilience Section */}
        <section className="mb-16 p-8 bg-slate-900 text-white rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-600 rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
          
          <div className="relative z-10">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Structural Resilience</h2>
              <p className="text-xl text-slate-300">
                Why 2026 is not 1973. The US economy has profoundly transformed, dismantling the mechanisms that previously converted oil shocks into stagflation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
                <div className="bg-slate-900/50 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                  <Droplet className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Declining Energy Intensity</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  The economy consumes less than <strong className="text-cyan-300">1/3</strong> of the oil per $1,000 of GDP compared to fifty years ago. Total energy usage has plummeted from <strong>13.3%</strong> to <strong>5.7%</strong> of GDP.
                </p>
              </div>

              <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
                <div className="bg-slate-900/50 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                  <ShieldCheck className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Domestic Production Buffer</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  The US is now a dominant producer. Price spikes generate robust job gains and capital inflows in oil-producing states, completely neutralizing aggregate national employment losses.
                </p>
              </div>

              <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl">
                <div className="bg-slate-900/50 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                  <Activity className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Margin Compression</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Corporate America chose to absorb the supply shock. Atlanta Fed data showed <strong className="text-purple-300">80%</strong> of firms made &apos;small to no change&apos; in retail pricing to prevent demand destruction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Breakevens Section */}
        <section className="mb-16">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The Collapse of Market Expectations</h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                If the bond market genuinely feared stagflation, long-term inflation expectations would be rising sharply. Instead, institutional investors are demanding significantly <em>lower</em> compensation for inflation risk.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                By late June 2026, breakeven inflation rates across all major time horizons systematically collapsed toward the Fed&apos;s <strong className="text-blue-600">2.0%</strong> target, effectively validating the transient nature of the shock.
              </p>
            </div>
            
            <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              {breakevenData.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{item.metric}</div>
                  <div className="text-3xl font-extrabold text-slate-900">{item.rate}%</div>
                  <div className="mt-3 text-xs font-medium text-emerald-600 flex items-center bg-emerald-50 px-2 py-1 rounded-full">
                    <TrendingDown className="w-3 h-3 mr-1" /> Declining
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fed Policy Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-700">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 flex flex-col justify-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800 text-blue-400 font-semibold text-sm mb-6 w-fit border border-slate-700">
                  <Landmark className="w-4 h-4 mr-2" />
                  Monetary Regime Change
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">The &ldquo;Warsh Effect&rdquo;</h2>
                <p className="text-base text-slate-300 mb-6 leading-relaxed">
                  Newly appointed Federal Reserve Chairman Kevin Warsh has implemented a severe, uncompromising shift in monetary policy execution. Defined by austere communication, the death of forward guidance, and a rigid adherence to absolute price stability.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-slate-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                    Refused to submit a projection to the &apos;Dot Plot&apos;
                  </li>
                  <li className="flex items-center text-sm text-slate-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                    Eliminated standard dovish forward guidance
                  </li>
                  <li className="flex items-center text-sm text-slate-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                    Formed 5 task forces to overhaul Fed orthodoxy
                  </li>
                  <li className="flex items-center text-sm text-slate-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                    Repudiated the Phillips Curve trade-off
                  </li>
                </ul>
              </div>
              <div className="bg-slate-800/50 p-10 border-l border-slate-700 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5">
                  <Activity className="w-full h-full text-blue-400" strokeWidth={0.5} />
                </div>
                <blockquote className="relative z-10">
                  <p className="text-xl font-serif italic text-slate-300 leading-relaxed mb-6">
                    &ldquo;Financial market prices are probably the most important source of information... But when all the financial markets are doing is reflecting back what we&apos;ve said, then we&apos;re being blind to it.&rdquo;
                  </p>
                  <footer>
                    <p className="text-white font-bold">Kevin Warsh</p>
                    <p className="text-slate-400 text-sm">Chairman, Federal Reserve (June 2026)</p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Macro Horizon Section */}
        <section className="mb-16">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Stagflation vs. Demand Destruction</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Could falling gas prices cause demand-driven inflation? Structural labor constraints say no. The economy is incapable of overheating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-xl shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Stagnant Real Wage Growth</h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  Real hourly earnings decreased by <strong>0.09%</strong> in May. Consumers lack the fundamental purchasing power required to trigger a demand-pull inflationary spiral.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Low-Hire, Low-Fire Equilibrium</h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  Job growth has slowed to <strong>22,500/month</strong>. While mass layoffs are rare, the stagnant labor market limits money velocity and severely restrains consumer confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">The Disinflationary Conclusion</h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
              The stagflation narrative of early 2026 was a premature and fundamentally flawed assessment. As oil prices revert, and severe structural constraints on consumer demand hold firm, the underlying trajectory of the United States economy points toward an orderly, <strong className="text-blue-600">disinflationary stabilization</strong> managed by a highly credible, hawkish central bank.
            </p>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
