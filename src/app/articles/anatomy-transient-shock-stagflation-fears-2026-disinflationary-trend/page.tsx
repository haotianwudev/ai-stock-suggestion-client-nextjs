'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Landmark,
  ArrowLeft,
  Maximize2,
  FileText
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
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

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
  const currentArticle = articles.find(article => article.slug === 'anatomy-transient-shock-stagflation-fears-2026-disinflationary-trend');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      {/* Deep Research Badge */}
      <div className="fixed top-4 left-4 z-50 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-lg shadow-lg text-sm">
        Deep Research
      </div>

      {/* Return to Home Button */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-white pt-24 pb-20 border-b border-slate-200">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm mb-6 border border-blue-100">
            <Activity className="w-4 h-4 mr-2" />
            Macroeconomic Research & Analysis
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
            The Anatomy of a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Transient Shock</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
            Deconstructing Stagflation Fears, Energy Volatility, and the 2026 Disinflationary Trend. A deep dive into why inflation expectations are falling despite global geopolitical chaos.
          </p>
        </div>
      </header>

      {/* Hero Infographic */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img 
            src="https://i.imgur.com/nGzDLC9.png" 
            alt="Transient Shock Infographic - Energy Crisis and Disinflationary Analysis" 
            className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsImageViewerOpen(true);
            }}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
            title="View full screen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
            <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
              Click to view full screen
            </div>
          </div>
        </div>
      </section>

      <FullScreenImageViewer
        src="https://i.imgur.com/33a4e31c.jpeg"
        alt="Transient Shock Infographic"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        
        {/* Energy Shock Section */}
        <section className="py-12">
          <div className="flex flex-col gap-16">
            <div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-red-100 text-red-600 rounded-xl mr-4">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Geopolitics & The Energy Shock</h2>
              </div>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                The 2026 conflict between the United States and Iran caused a severe bottleneck at the Strait of Hormuz, shutting in over 10.5 million barrels per day. The geopolitical risk premium skyrocketed, pushing Brent crude to a peak of <strong className="text-red-600">$118.03/bbl</strong> in April 2026.
              </p>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                However, the "oil bubble" burst abruptly. The mid-June Geneva peace agreement and aggressive supply responses from non-Middle Eastern producers crashed the market, erasing wartime gains and truncating the supply-side inflation transmission mechanism.
              </p>
              
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">Crude Oil Benchmark Volatility (2026)</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
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
        <section className="py-12 border-t border-slate-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Deconstructing the Inflation Paradox</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The May 2026 CPI report highlighted a stark divergence: soaring headline metrics driven entirely by volatile energy, masked by a rapidly cooling macroeconomic core.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" />
                May 2026 CPI Decomposition (YoY)
              </h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
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
        <section className="py-12 -mx-6 px-6 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-600 rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Structural Resilience</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Why 2026 is not 1973. The US economy has profoundly transformed, dismantling the mechanisms that previously converted oil shocks into stagflation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-slate-900/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Droplet className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Declining Energy Intensity</h3>
                <p className="text-slate-400 leading-relaxed">
                  The economy consumes less than <strong className="text-cyan-300">1/3</strong> of the oil per $1,000 of GDP compared to fifty years ago. Total energy usage has plummeted from <strong>13.3%</strong> to <strong>5.7%</strong> of GDP.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-slate-900/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Domestic Production Buffer</h3>
                <p className="text-slate-400 leading-relaxed">
                  The US is now a dominant producer. Price spikes generate robust job gains and capital inflows in oil-producing states, completely neutralizing aggregate national employment losses.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-slate-900/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Activity className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Margin Compression</h3>
                <p className="text-slate-400 leading-relaxed">
                  Corporate America chose to absorb the supply shock. Atlanta Fed data showed <strong className="text-purple-300">80%</strong> of firms made 'small to no change' in retail pricing to prevent demand destruction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Breakevens Section */}
        <section className="py-12 border-t border-slate-200">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The Collapse of Market Expectations</h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                If the bond market genuinely feared stagflation, long-term inflation expectations would be rising sharply. Instead, institutional investors are demanding significantly <em>lower</em> compensation for inflation risk.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                By late June 2026, breakeven inflation rates across all major time horizons systematically collapsed toward the Fed's <strong className="text-blue-600">2.0%</strong> target, effectively validating the transient nature of the shock.
              </p>
            </div>
            
            <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              {breakevenData.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 flex flex-col items-center justify-center text-center group hover:border-blue-300 transition-colors">
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{item.metric}</div>
                  <div className="text-4xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">{item.rate}%</div>
                  <div className="mt-4 text-xs font-medium text-emerald-600 flex items-center bg-emerald-50 px-2 py-1 rounded-full">
                    <TrendingDown className="w-3 h-3 mr-1" /> Declining
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fed Policy Section */}
        <section className="py-12 border-t border-slate-200">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800 text-blue-400 font-semibold text-sm mb-6 w-fit border border-slate-700">
                  <Landmark className="w-4 h-4 mr-2" />
                  Monetary Regime Change
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">The "Warsh Effect"</h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  Newly appointed Federal Reserve Chairman Kevin Warsh has implemented a severe, uncompromising shift in monetary policy execution. Defined by austere communication, the death of forward guidance, and a rigid adherence to absolute price stability.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                    Refused to submit a projection to the 'Dot Plot'
                  </li>
                  <li className="flex items-center text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                    Eliminated standard dovish forward guidance
                  </li>
                  <li className="flex items-center text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                    Formed 5 task forces to overhaul Fed orthodoxy
                  </li>
                  <li className="flex items-center text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                    Repudiated the Phillips Curve trade-off
                  </li>
                </ul>
              </div>
              <div className="bg-slate-800/50 p-12 lg:p-16 border-l border-slate-700 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-10">
                  <Activity className="w-full h-full text-blue-400" strokeWidth={0.5} />
                </div>
                <blockquote className="relative z-10">
                  <p className="text-2xl font-serif italic text-slate-300 leading-relaxed mb-6">
                    "Financial market prices are probably the most important source of information... But when all the financial markets are doing is reflecting back what we've said, then we're being blind to it."
                  </p>
                  <footer>
                    <p className="text-white font-bold text-lg">Kevin Warsh</p>
                    <p className="text-slate-400">Chairman, Federal Reserve (June 2026)</p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Macro Horizon Section */}
        <section className="py-12 border-t border-slate-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Stagflation vs. Demand Destruction</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Could falling gas prices cause demand-driven inflation? Structural labor constraints say no. The economy is incapable of overheating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-5">
              <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl shrink-0">
                <DollarSign className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Stagnant Real Wage Growth</h3>
                <p className="text-slate-700 leading-relaxed">
                  Real hourly earnings decreased by <strong>0.09%</strong> in May. Consumers lack the fundamental purchasing power required to trigger a demand-pull inflationary spiral.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-5">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl shrink-0">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Low-Hire, Low-Fire Equilibrium</h3>
                <p className="text-slate-700 leading-relaxed">
                  Job growth has slowed to <strong>22,500/month</strong>. While mass layoffs are rare, the stagnant labor market limits money velocity and severely restrains consumer confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-10 md:p-16 text-center border border-blue-200">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The Disinflationary Conclusion</h2>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
              The stagflation narrative of early 2026 was a premature and fundamentally flawed assessment. As oil prices revert, and severe structural constraints on consumer demand hold firm, the underlying trajectory of the United States economy points toward an orderly, <strong className="text-blue-600">disinflationary stabilization</strong> managed by a highly credible, hawkish central bank.
            </p>
          </div>
        </section>

        {/* Call to Action - Google Doc Link */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl my-12 text-center border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                <FileText className="inline mr-2" />
                Read Full Research Paper
              </a>
            )}
          </div>
        </div>

        {/* Educational Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg my-12">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold text-yellow-900 mb-2">Educational Content Disclaimer</h4>
              <p className="text-yellow-800 leading-relaxed">
                This article is for educational and informational purposes only. It does not constitute investment advice, financial advice, trading advice, or any other sort of advice. The macroeconomic analysis presented represents a theoretical framework and should not be the sole basis for investment decisions. Always consult with qualified financial professionals before making investment decisions.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <Activity className="w-8 h-8 mx-auto mb-6 text-slate-600" />
          <p className="text-sm">
            © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
          </p>
        </div>
      </footer>
    </>
  );
}
