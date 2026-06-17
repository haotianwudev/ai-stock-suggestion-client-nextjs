'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingDown, Activity, AlertTriangle, ShieldAlert, BarChart3, BookOpen, Globe, DollarSign, Percent, Info, Maximize2, Music } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, ReferenceLine } from 'recharts';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- Data Models based on the Quantitative Report ---
const shortVolumeData = [
  { date: 'Jun 3', total: 3.08, short: 0.99, ratio: 32.35 },
  { date: 'Jun 4', total: 3.04, short: 1.39, ratio: 45.64 },
  { date: 'Jun 5', total: 4.74, short: 1.73, ratio: 36.52 },
  { date: 'Jun 8', total: 3.82, short: 1.81, ratio: 47.46 },
  { date: 'Jun 9', total: 5.48, short: 3.57, ratio: 65.20 }, // Shock event
  { date: 'Jun 10', total: 4.73, short: 2.80, ratio: 59.36 },
];

const fundamentalData = [
  { metric: 'Quick Commerce Rev', FY25: 53.4, FY26: 78.5, type: 'growth' },
  { metric: 'Adjusted EBITA', FY25: 31.8, FY26: 5.1, type: 'decline' },
  { metric: 'Free Cash Flow', FY25: 73.9, FY26: -46.6, type: 'critical' },
];

interface SectionCardProps {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
  color?: 'blue' | 'red' | 'emerald' | 'purple' | 'orange';
}

const SectionCard = ({ icon: Icon, title, children, color = 'blue' }: SectionCardProps) => {
  const colorMap = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    red: "bg-red-50 border-red-200 text-red-700",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
  };

  const iconColorMap = {
    blue: "text-blue-600",
    red: "text-red-600",
    emerald: "text-emerald-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
  };

  return (
    <div className="mb-12 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
      <div className={`px-8 py-5 border-b flex items-center gap-4 ${colorMap[color]}`}>
        <div className={`p-3 bg-white/60 rounded-xl backdrop-blur-sm shadow-sm ${iconColorMap[color]}`}>
          <Icon size={28} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="p-8 text-slate-700 leading-relaxed space-y-6">
        {children}
      </div>
    </div>
  );
};

interface HighlightBoxProps {
  children: React.ReactNode;
  title?: string;
}

const HighlightBox = ({ children, title }: HighlightBoxProps) => (
  <div className="bg-slate-50 border-l-4 border-slate-400 p-6 rounded-r-xl my-6">
    {title && (
      <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
        <Info size={18}/> {title}
      </h4>
    )}
    <div className="text-sm text-slate-600 space-y-2">
      {children}
    </div>
  </div>
);

interface MathEquationProps {
  children: React.ReactNode;
}

const MathEquation = ({ children }: MathEquationProps) => (
  <div className="bg-white border border-slate-200 shadow-sm py-4 px-6 rounded-xl text-center my-6 font-mono text-lg text-slate-800 overflow-x-auto">
    {children}
  </div>
);

export default function BabaQuantAnalysisApp() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const currentArticle = articles.find(article => article.slug === 'alibaba-baba-quantitative-analysis-drawdown-factor-exposures');

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

      <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-200 selection:text-blue-900">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Header */}
        <header className="bg-white border-b border-slate-200 pt-20 pb-16 px-6 relative overflow-hidden">
          {/* Deep Research Badge */}
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
              Deep Research
            </div>
          </div>

          {/* Abstract Background Shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gradient-to-tr from-orange-100 to-red-100 blur-3xl opacity-50"></div>

          <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4 border border-blue-100 shadow-sm">
              <Activity size={16} /> Quant Finance Research Tutorial
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Quantitative Analysis of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Alibaba Group (BABA)</span> Drawdown
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-light">
              Idiosyncratic Shocks, Factor Exposures, and Volatility Dynamics as of June 16, 2026.
            </p>
          </div>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/PzNP608.jpeg" 
              alt="Alibaba Quantitative Analysis Infographic" 
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

        {/* Full-screen image viewer */}
        <FullScreenImageViewer
          src="https://i.imgur.com/PzNP608.jpeg"
          alt="Alibaba Quantitative Analysis Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* Main Content Body */}
        <main className="max-w-5xl mx-auto px-6 py-12">
          <SectionCard icon={BookOpen} title="1. Executive Synthesis and Theoretical Framework" color="purple">
            <p className="text-lg">
              As of the mid-point of June 2026, Alibaba Group Holding Limited (NYSE: BABA) has endured a severe, multi-sigma equity drawdown, plunging to multi-year pricing floors. By the close of the trading session on June 16, 2026, the equity registered a year-to-date decline of ~23.82%, punctuated by an anomalous eight-day consecutive losing streak.
            </p>
            <p>
              Within quantitative finance, price action of this magnitude cannot be wholly attributed to systematic market beta. It represents a catastrophic confluence of:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <li className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                <strong className="block text-purple-800 mb-1">Geopolitical Shocks</strong>
                Severe idiosyncratic risk premiums applied suddenly.
              </li>
              <li className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                <strong className="block text-orange-800 mb-1">Factor Deterioration</strong>
                Contraction in capital efficiency and free cash flow factors.
              </li>
              <li className="bg-red-50 p-4 rounded-xl border border-red-100">
                <strong className="block text-red-800 mb-1">Toxic Microstructure</strong>
                Predatory algorithmic shorting and delta-hedging loops.
              </li>
            </ul>
          </SectionCard>

          <SectionCard icon={TrendingDown} title="2. Statistical Return Modeling and Alpha Decay" color="blue">
            <p>
              To isolate systematic market risk from idiosyncratic risk, we model the equity's daily returns against a representative sector benchmark, the KraneShares CSI China Internet ETF (KWEB).
            </p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4 border-b pb-2">The Mechanics of Corporate Action Adjustments</h3>
            <p>
              A foundational requirement is adjusting the empirical price time-series for the June 11, 2026 ex-dividend date ($1.05 per ADS). Failing to adjust for this structural price drop introduces spurious volatility.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h4 className="font-bold text-slate-700 mb-4 text-center">Drawdown (June 2 - 16)</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-slate-500">Raw Nominal Drawdown</span>
                    <span className="font-bold text-red-500">-15.72%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-slate-500">Dividend-Adjusted Drawdown</span>
                    <span className="font-bold text-orange-500">-14.92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">KWEB Benchmark Drawdown</span>
                    <span className="font-bold text-blue-500">-7.70%</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-center">
                <p className="text-sm text-slate-600 text-center italic">
                  "Even after meticulously accounting for the dividend, BABA deeply underperformed its sector benchmark by approximately 7.22% over an extraordinarily brief ten-session window."
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4 border-b pb-2">OLS Regression & Volatility Divergence</h3>
            <p>
              An Ordinary Least Squares (OLS) linear regression was applied to the daily dividend-adjusted returns.
            </p>

            <MathEquation>
              <>
                R<sub>BABA_adj, t</sub> = &alpha; + &beta; &times; R<sub>KWEB, t</sub> + &epsilon;<sub>t</sub>
              </>
            </MathEquation>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse mt-4">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-sm uppercase tracking-wider">
                    <th className="p-4 rounded-tl-xl">Parameter</th>
                    <th className="p-4">Value</th>
                    <th className="p-4 rounded-tr-xl">Significance</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 font-semibold">Beta (&beta;)</td>
                    <td className="p-4">0.8281</td>
                    <td className="p-4">p = 0.0098</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Alpha (&alpha;)</td>
                    <td className="p-4 text-red-500 font-bold">-0.0073 (-73 bps)</td>
                    <td className="p-4">p = 0.1710</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">R-squared (R&sup2;)</td>
                    <td className="p-4">0.5420</td>
                    <td className="p-4">F-stat = 10.65</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Idiosyncratic Volatility</td>
                    <td className="p-4">22.92%</td>
                    <td className="p-4">Annualized</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <HighlightBox title="Statistical Significance">
              The Z-score for the BABA adjusted drawdown registered at -2.1088 standard deviations. A directional move exceeding two negative standard deviations over a 10-day window indicates a fat-tail liquidity event driven by exogenous shocks.
            </HighlightBox>
          </SectionCard>

          <SectionCard icon={ShieldAlert} title="3. The Geopolitical Risk Premium" color="red">
            <p>
              The primary exogenous catalyst was a severe geopolitical shock. On June 8, 2026, the Pentagon released an updated Section 1260H "Chinese Military Companies" (CMC) list, adding Alibaba Group.
            </p>
            
            <div className="my-8 relative pl-6 border-l-4 border-red-400">
              <h4 className="text-xl font-bold text-slate-800 mb-2">Repricing the Cost of Capital</h4>
              <p className="text-slate-600">
                While fundamental cash-flow impact is immaterial (BABA lacks DoD contracts), in quant portfolio management, this designation is an early-warning signaling mechanism. It forces mechanical divestment from institutional asset managers bound by ESG and sovereign compliance frameworks to avoid future OFAC/CFIUS entanglement.
              </p>
              <p className="text-slate-600 mt-4 font-semibold">
                Result: The market priced in an immediate spike in the illiquidity premium, ignoring positive catalysts like the Qwen-Robot Suite launch.
              </p>
            </div>
          </SectionCard>

          <SectionCard icon={Activity} title="4. Market Microstructure & Order Flow" color="orange">
            <p>
              How institutional hedging and algorithmic statistical arbitrage manifested in dark pools during the acute crash phase.
            </p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4 border-b pb-2">Off-Exchange Short Volume</h3>
            <p className="mb-6">
              On June 9, the first full session post-DoD announcement, off-exchange short volume exploded to 65.20%. Algorithms detect institutional block-selling in dark pools and aggressively short across venues to front-run the liquidation.
            </p>

            <div className="h-[400px] w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={shortVolumeData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis 
                    yAxisId="left" 
                    orientation="left" 
                    stroke="#cbd5e1" 
                    tick={{fill: '#64748b'}} 
                    label={{ value: 'Volume (Millions)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="#f97316" 
                    tick={{fill: '#f97316'}} 
                    label={{ value: 'Short Ratio %', angle: 90, position: 'insideRight', fill: '#f97316' }}
                  />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                  <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                  <Bar yAxisId="left" dataKey="total" name="Total Off-Exchange Vol" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="short" name="Short Off-Exchange Vol" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="ratio" 
                    name="Short Ratio %" 
                    stroke="#f97316" 
                    strokeWidth={3} 
                    dot={{r: 5, fill: '#f97316', strokeWidth: 2, stroke: '#fff'}} 
                  />
                  <ReferenceLine 
                    yAxisId="right" 
                    y={50} 
                    stroke="#ef4444" 
                    strokeDasharray="3 3" 
                    label={{ position: 'top', value: 'Toxic Threshold (50%)', fill: '#ef4444', fontSize: 12 }} 
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <HighlightBox title="Options Gamma Feedback Loop">
              Market makers sold downside puts to institutions seeking insurance. To remain delta-neutral, market makers shorted BABA. As the price fell, short gamma accelerated, forcing larger mechanical shorting. Expected statistical moves (±4.5%) were violently breached.
            </HighlightBox>
          </SectionCard>

          <SectionCard icon={BarChart3} title="5. Fundamental Factor Rotation: The Value Trap" color="emerald">
            <p className="mb-6">
              Underlying factor scores—Quality, Profitability, and ROIC—deteriorated, stripping away the valuation floor.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="font-bold text-slate-800 mb-3">The Pivot to Asset-Heavy Logistics</h4>
                <p className="text-slate-600 text-sm mb-4">
                  FY26 showed a severe cash burn directly attributable to the pivot from high-margin software to capital-intensive physical infrastructure. Aggregate free cash flow swung violently. The $1.5B bidding war for Pupu (grocery delivery) cements this value destruction.
                </p>
                <ul className="space-y-3 mt-4 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <strong>Lower ROIC:</strong> Plummeted to a meager 0.35%.
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <strong>Margin Attrition:</strong> EBITA for quick commerce fell 84%.
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <strong>Regulatory Caps:</strong> SAMR warnings limit upside of price wars.
                  </li>
                </ul>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={fundamentalData} 
                    layout="vertical" 
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9"/>
                    <XAxis type="number" tick={{fill: '#64748b'}} />
                    <YAxis 
                      dataKey="metric" 
                      type="category" 
                      width={120} 
                      tick={{fill: '#334155', fontSize: 12, fontWeight: 600}} 
                      axisLine={false} 
                      tickLine={false}
                    />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px' }}/>
                    <Legend />
                    <Bar dataKey="FY25" name="FY 2025 (RMB Billions)" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={16}/>
                    <Bar dataKey="FY26" name="FY 2026 (RMB Billions)" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={16}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </SectionCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Macro Regime */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b bg-teal-50 border-teal-100 flex items-center gap-3">
                <Globe className="text-teal-600" size={24}/>
                <h2 className="text-xl font-bold text-teal-800">6. Macroeconomic Regimes</h2>
              </div>
              <div className="p-6 text-slate-600 text-sm space-y-4">
                <p>
                  Pricing of ADRs is intrinsically linked to sovereign interest rate policies and capital flight dynamics.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-slate-700">US-China Yield Spread</span>
                    <span className="text-2xl font-black text-red-500">-2.74%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden flex">
                    <div className="bg-blue-500 h-2.5" style={{width: '72%'}}></div>
                    <div className="bg-red-400 h-2.5" style={{width: '28%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-2 text-slate-500">
                    <span>US 10Y: 4.49%</span>
                    <span>CN 10Y: 1.74%</span>
                  </div>
                </div>
                <p className="italic text-xs">
                  Interest rate parity dictates this induces capital flight. The offshore Chinese Yuan (CNH) faces depreciation pressure (USD/CNH ~6.76), providing a mechanical headwind for ADRs.
                </p>
              </div>
            </div>

            {/* Fixed Income */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b bg-indigo-50 border-indigo-100 flex items-center gap-3">
                <DollarSign className="text-indigo-600" size={24}/>
                <h2 className="text-xl font-bold text-indigo-800">7. Fixed Income Markets</h2>
              </div>
              <div className="p-6 text-slate-600 text-sm space-y-4">
                <p>Is this a solvency crisis or an equity valuation contraction?</p>
                <ul className="space-y-4 mt-2">
                  <li className="flex gap-4 items-start">
                    <div className="mt-1 bg-green-100 p-1.5 rounded-md text-green-700">
                      <Percent size={14}/>
                    </div>
                    <div>
                      <strong className="block text-slate-800">Bonds Pricing Above Par</strong>
                      Alibaba's 2030 corporate paper yields less than the U.S. 10-Year risk-free rate, indicating immense confidence in balance sheet integrity.
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="mt-1 bg-indigo-100 p-1.5 rounded-md text-indigo-700">
                      <ShieldAlert size={14}/>
                    </div>
                    <div>
                      <strong className="block text-slate-800">No Default Signals</strong>
                      Credit Default Swaps (CDS) have not exhibited blowouts.
                    </div>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-indigo-50/50 rounded-lg text-indigo-900 text-xs font-semibold border border-indigo-100">
                  Conclusion: The firm remains highly solvent. The drawdown is strictly a repricing of the equity risk premium.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 rounded-3xl p-8 shadow-xl mt-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 opacity-10">
              <Activity size={240} />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-white relative z-10">8. Quantitative Outlook</h2>
            <div className="space-y-4 text-slate-300 relative z-10 text-lg font-light leading-relaxed">
              <p>
                Alibaba's current suffering is the mathematically expected outcome of a highly toxic intersection of variables. The equity is being violently repriced from an asset-light technology monopoly to an asset-heavy, heavily regulated utility in a hostile geopolitical environment.
              </p>
              <p>
                Until there is a structural mean-reversion in the US-China sovereign yield spread, regulatory easing in retail margins, or a complete absorption of forced 1260H institutional selling, algorithmic models dictate the path of least resistance remains constrained with elevated downside volatility.
              </p>
            </div>
          </div>

          {/* Call to Action - Google Doc */}
          {currentArticle?.googleDoc && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl my-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <BookOpen className="inline mr-2" />
                  Read Full Research Paper
                </a>
              </div>
            </div>
          )}

          {/* Educational Disclaimer */}
          <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <h3 className="text-lg font-bold text-yellow-900 mb-2 flex items-center gap-2">
              <AlertTriangle size={20} />
              Educational Disclaimer
            </h3>
            <p className="text-sm text-yellow-800">
              This analysis is provided for educational and informational purposes only. It is not investment advice, and should not be construed as a recommendation to buy or sell any security. Past performance does not guarantee future results. All investments carry risk, including the potential loss of principal. Please consult with a qualified financial advisor before making any investment decisions.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-slate-500 text-sm mt-12 border-t border-slate-200 bg-white">
          &copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
        </footer>
      </div>
    </>
  );
}
