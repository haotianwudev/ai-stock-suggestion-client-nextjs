'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, BookOpen, TrendingUp, TrendingDown, DollarSign,
  Globe, Activity, AlertTriangle, Clock, Zap, Target, BarChart3, ShieldAlert, Scale
} from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';
import { Maximize2 } from 'lucide-react';

const SLUG = 'structural-dynamics-us-dollar-hegemony-dedollarization-macro-strategy';
const INFOGRAPHIC = 'https://i.imgur.com/JoigFq7.jpeg';

// --- Data ---
const dxyData = [
  { currency: "Euro", symbol: "EUR", weight: "57.60%", region: "Eurozone" },
  { currency: "Japanese Yen", symbol: "JPY", weight: "13.60%", region: "Asia-Pacific" },
  { currency: "British Pound", symbol: "GBP", weight: "11.90%", region: "Europe (Non-EU)" },
  { currency: "Canadian Dollar", symbol: "CAD", weight: "9.10%", region: "North America" },
  { currency: "Swedish Krona", symbol: "SEK", weight: "4.20%", region: "Europe (Non-EU)" },
  { currency: "Swiss Franc", symbol: "CHF", weight: "3.60%", region: "Europe (Non-EU)" },
];

const clockData = [
  { phase: "Reflation", trajectory: "Slowing", cpi: "Falling", asset: "Bonds (9.8%)", usd: "Cash yields plummet. The USD generally weakens as the central bank aggressively slashes short-term interest rates to stimulate demand, steepening the yield curve." },
  { phase: "Recovery", trajectory: "Accelerating", cpi: "Falling", asset: "Equities (19.9%)", usd: "Cash returns are historically poor. Low inflation and loose monetary policy create a 'Goldilocks' environment where risk assets thrive, suppressing defensive dollar demand." },
  { phase: "Overheat", trajectory: "Accelerating", cpi: "Rising", asset: "Commodities (19.7%)", usd: "The framework explicitly dictates an 'underweight' allocation to the U.S. dollar. Funds rotate capital into Asian and emerging market currencies to capture superior growth differentials." },
  { phase: "Stagflation", trajectory: "Slowing", cpi: "Rising", asset: "Cash / USD (-0.3%)", usd: "Cash and the USD become the 'best of a bad bunch' as collapsing corporate margins destroy equities and persistent inflation prevents central banks from cutting rates. The USD thrives as a defensive safe haven." },
];

const indicatorData = [
  { category: "Cross-Border Funding", metric: "TIC Form SLT Data / Foreign Treasury Demand", rationale: "A sudden, sustained collapse in foreign private Treasury purchases signals a structural evaporation of offshore dollar demand and waning confidence in U.S. fiscal sustainability." },
  { category: "Geopolitical Settlement", metric: "Transaction Volume on the mBridge Ledger", rationale: "Accelerating daily transaction value via EVM-compatible CBDC ledgers indicates the successful, functional adoption of bilateral settlement outside of Western SWIFT architecture." },
  { category: "Monetary Divergence", metric: "US 2-Year vs. German 2-Year Sovereign Yield Spread", rationale: "A sustained narrowing of the transatlantic yield differential removes the vital 'carry factor,' incentivizing systematic macro funds to rapidly unwind long-USD momentum positions." },
  { category: "Fiscal Dominance", metric: "Federal Reserve Reverse Repo (RRP) Facility Levels", rationale: "A total depletion of the RRP facility combined with an abrupt cessation of Quantitative Tightening (QT) indicates the Fed is actively forced to inject liquidity to prevent Treasury market dysfunction." },
  { category: "Commodity Divergence", metric: "Gold Price vs. Real U.S. Interest Rates", rationale: "When gold breaks its historic negative correlation with rising real U.S. yields, it indicates foreign central banks are aggressively acquiring non-fiat reserve assets." },
  { category: "Behavioral Positioning", metric: "Foreign Institutional Currency Hedge Ratios", rationale: "A rapid spike in hedging by foreign investors (locking in USD downside protection) marks the psychological capitulation necessary to transition from a bull to a bear cycle." },
];

// --- Sub-components ---
const SectionCard = ({ id, title, icon: Icon, gradient, children }: { id: string; title: string; icon: React.ElementType; gradient: string; children: React.ReactNode }) => (
  <section id={id} className="relative bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 mb-12 overflow-hidden border border-slate-100">
    <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${gradient}`}></div>
    <div className="flex items-center gap-4 mb-8">
      <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
        <Icon size={28} strokeWidth={2} />
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
    </div>
    <div className="space-y-6 text-lg text-slate-600 leading-relaxed">{children}</div>
  </section>
);

const HighlightBox = ({ title, children, color }: { title?: string; children: React.ReactNode; color: 'indigo' | 'emerald' | 'amber' | 'rose' | 'blue' }) => {
  const colorMap = {
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-900",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    rose: "bg-rose-50 border-rose-200 text-rose-900",
    blue: "bg-blue-50 border-blue-200 text-blue-900",
  };
  return (
    <div className={`p-6 rounded-2xl border-2 ${colorMap[color]} my-6 shadow-sm`}>
      {title && <h4 className="font-bold text-xl mb-3">{title}</h4>}
      <div className="space-y-3 opacity-90">{children}</div>
    </div>
  );
};

export default function USDollarArticle() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const currentArticle = articles.find(a => a.slug === SLUG);

  return (
    <>
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug || ''} />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-200 selection:text-indigo-900">

        {/* Return to Home */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero */}
        <header className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 text-white overflow-hidden pb-32 pt-16 px-6 md:px-12 mt-6">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[120px] opacity-40 mix-blend-screen"></div>
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <BookOpen size={16} className="text-blue-300" />
              <span className="text-sm font-semibold tracking-wider text-blue-100 uppercase">Macroeconomic Deep Research</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Structural Dynamics of the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">U.S. Dollar</span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl leading-relaxed font-light">
              An institutional framework exploring conflicting paradigms of dollar hegemony, quantitative forecasting, and global macro trade execution.
            </p>
          </div>
        </header>

        {/* Hero Infographic */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8 -mt-20 relative z-20">
          <div
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img src={INFOGRAPHIC} alt="U.S. Dollar Structural Dynamics Infographic" className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]" />
            <button
              onClick={e => { e.stopPropagation(); setIsImageViewerOpen(true); }}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              title="View full screen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
              <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">Click to view full screen</div>
            </div>
          </div>
        </section>

        <FullScreenImageViewer src={INFOGRAPHIC} alt="U.S. Dollar Structural Dynamics Infographic" isOpen={isImageViewerOpen} onClose={() => setIsImageViewerOpen(false)} />

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 py-12">

          {/* Section 1: Foundation */}
          <SectionCard id="foundation" title="The Foundation: Conflicting Paradigms" icon={Scale} gradient="from-violet-500 to-fuchsia-500">
            <p>
              The trajectory of the U.S. dollar is governed by a highly complex, continuously evolving interplay of structural capital flows, relative macroeconomic performance, and systemic geopolitics. Within contemporary macroeconomic theory, two diametrically opposed frameworks attempt to forecast its long-term structural path.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="bg-white p-6 rounded-2xl border-2 border-violet-100 shadow-lg shadow-violet-100/50">
                <div className="flex items-center gap-3 mb-4 text-violet-700">
                  <TrendingUp size={24} />
                  <h3 className="text-xl font-bold">Dollar Milkshake Theory</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">Introduced by Brent Johnson (2018), this theory posits inevitable, crisis-driven dollar appreciation.</p>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2"><span className="text-violet-500 font-bold">•</span><span><strong>Global Liquidity as the Milkshake:</strong> Decades of global easing created massive liquidity.</span></li>
                  <li className="flex gap-2"><span className="text-violet-500 font-bold">•</span><span><strong>USD as the Straw:</strong> U.S. capital markets act as a siphon, pulling liquidity into dollar-denominated assets.</span></li>
                  <li className="flex gap-2"><span className="text-violet-500 font-bold">•</span><span><strong>Eurodollar Squeeze:</strong> Contractions in global credit force a desperate scramble for physical dollars to service offshore liabilities, driving the dollar upward.</span></li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-2xl border-2 border-rose-100 shadow-lg shadow-rose-100/50">
                <div className="flex items-center gap-3 mb-4 text-rose-700">
                  <TrendingDown size={24} />
                  <h3 className="text-xl font-bold">De-dollarization Thesis</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">Focuses on structural decay and systemic collapse stemming from maintaining reserve currency status.</p>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2"><span className="text-rose-500 font-bold">•</span><span><strong>Triffin&apos;s Dilemma:</strong> Inescapable conflict between domestic objectives and international obligations (running perpetual trade deficits).</span></li>
                  <li className="flex gap-2"><span className="text-rose-500 font-bold">•</span><span><strong>Industrial Erosion:</strong> Structural overvaluation taxes U.S. exports and subsidizes imports, hollowing out manufacturing.</span></li>
                  <li className="flex gap-2"><span className="text-rose-500 font-bold">•</span><span><strong>Geopolitical Shifts:</strong> BRICS nations actively developing non-dollar payment infrastructures to bypass financial sanctions.</span></li>
                </ul>
              </div>
            </div>
            <p className="mt-4">
              These frameworks yield contradictory predictions because they weigh capital flow vectors fundamentally differently: immediate survival and liquidity (Milkshake) versus long-term structural transitions and friction absorption (De-dollarization).
            </p>
          </SectionCard>

          {/* Section 2: Measurement */}
          <SectionCard id="measurement" title="Measurement Mechanics: Indices & Alternatives" icon={BarChart3} gradient="from-blue-500 to-cyan-500">
            <p>
              Translating macroeconomic theories into strategy requires precise instrumentation. However, the ubiquitous retail benchmark&mdash;the U.S. Dollar Index (DXY)&mdash;suffers from profound structural limitations.
            </p>
            <HighlightBox title="The Problem with the DXY" color="blue">
              <p>Designed in 1973 and last updated in 1999 (for the Euro), the DXY heavily over-represents European economies while entirely ignoring modern supply chain giants like China and Mexico.</p>
            </HighlightBox>
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200 my-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-4 px-6 font-semibold text-slate-700">Component Currency</th>
                    <th className="py-4 px-6 font-semibold text-slate-700">ISO</th>
                    <th className="py-4 px-6 font-semibold text-slate-700">Weighting</th>
                    <th className="py-4 px-6 font-semibold text-slate-700">Region</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600 divide-y divide-slate-100">
                  {dxyData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-6 font-medium text-slate-800">{row.currency}</td>
                      <td className="py-3 px-6 text-slate-500">{row.symbol}</td>
                      <td className="py-3 px-6"><span className="bg-blue-100 text-blue-800 py-1 px-2 rounded font-semibold text-sm">{row.weight}</span></td>
                      <td className="py-3 px-6">{row.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h4 className="text-xl font-bold text-slate-800 mt-6 mb-4">Institutional Alternatives</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <Globe className="text-cyan-600 mt-1 flex-shrink-0" size={22} />
                <div>
                  <strong className="text-slate-800 block mb-1">Fed&apos;s Broad Trade-Weighted Dollar Index</strong>
                  <p className="text-sm">Bifurcated into Advanced Foreign Economies (AFE) and Emerging Market Economies (EME) to isolate European divergence from EM capital flight.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <Activity className="text-cyan-600 mt-1 flex-shrink-0" size={22} />
                <div>
                  <strong className="text-slate-800 block mb-1">Bloomberg U.S. Dollar Spot Index (BBDXY)</strong>
                  <p className="text-sm">Dynamically rebalanced annually based on trade volume and FX liquidity. Accurately captures USMCA trade (CAD, MXN) and Asian influence (JPY, CNH, KRW, INR).</p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Section 3: Quantitative Frameworks */}
          <SectionCard id="quant" title="Quantitative Forecasting Frameworks" icon={Zap} gradient="from-emerald-500 to-teal-500">
            <p>Institutional analysts synthesize multiple models to forecast USD trajectory. These are categorized into four distinct pillars.</p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                <h4 className="font-bold text-emerald-900 mb-2">1. Interest Rate Differentials</h4>
                <p className="text-sm text-emerald-800 mb-4">The most immediate, high-beta determinant. Driven by the &quot;carry factor,&quot; incentivizing capital to borrow in low-yielding currencies to invest in high-yielding USD assets.</p>
                <div className="bg-white p-3 rounded-lg text-center font-mono text-sm shadow-sm border border-emerald-100 text-emerald-900 overflow-x-auto">
                  ln(S<sub>T</sub>) = a + b(i<sub>f,T</sub> &minus; i<sub>d,T</sub>) + [ln(k<sub>f</sub>) &minus; ln(k<sub>d</sub>)]
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-teal-50 border border-teal-100">
                <h4 className="font-bold text-teal-900 mb-2">2. Balance of Payments (BOP)</h4>
                <p className="text-sm text-teal-800">Evaluates structural international transactions. Short-term: deficits financed by foreign accumulation. Long-term: massive outflow obligations force severe exchange rate depreciation.</p>
              </div>
              <div className="p-6 rounded-2xl bg-teal-50 border border-teal-100">
                <h4 className="font-bold text-teal-900 mb-2">3. Purchasing Power Parity (PPP)</h4>
                <p className="text-sm text-teal-800">The fundamental mean-reverting anchor. While poor for daily forecasting, it becomes highly predictive over 12&ndash;48 months. Incorporates &quot;sticky-price&quot; models for short-term deviations.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                <h4 className="font-bold text-emerald-900 mb-2">4. High-Frequency Flow Data</h4>
                <p className="text-sm text-emerald-800">Utilizes Treasury International Capital (TIC) reports to track foreign demand. <em className="block mt-2 font-medium">Note: Analysts now track massive $1.4T systemic anomalies tied to Cayman Islands repo exposure.</em></p>
              </div>
            </div>
          </SectionCard>

          {/* Section 4: Strategy */}
          <SectionCard id="strategy" title="Strategy: Global Macro Execution" icon={Target} gradient="from-amber-500 to-orange-500">
            <p>Global macro hedge funds deploy sophisticated instruments to express directional views, applying algorithmic discipline to entry triggers and position sizing.</p>
            <div className="mt-6 space-y-8">
              {/* Bullish */}
              <div className="bg-white border-2 border-green-500 rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">BULLISH SETUP</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="text-green-500" /> Long USD Playbook
                </h3>
                <ul className="space-y-4 text-slate-700">
                  <li><strong className="text-slate-900">Triggers:</strong> Divergence in central bank policy (e.g., Fed holds restrictive, ECB cuts). DXY breaks multi-year resistance with MACD confirmation.</li>
                  <li><strong className="text-slate-900">Execution:</strong> Front-month ICE DXY futures. OTC FX forwards (Buy USD/Sell EUR) locking in covered interest parity. Retail uses UUP ETF.</li>
                  <li><strong className="text-slate-900">Risk Mgmt:</strong> Volatility-adjusted sizing based on DXY standard deviation. Stop-loss at 1.5-sigma move against position or close below 200-DMA.</li>
                </ul>
              </div>
              {/* Bearish */}
              <div className="bg-white border-2 border-rose-500 rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-rose-500 text-white px-4 py-1 rounded-bl-xl font-bold text-sm">BEARISH SETUP</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingDown className="text-rose-500" /> Short USD Playbook
                </h3>
                <ul className="space-y-4 text-slate-700">
                  <li><strong className="text-slate-900">Triggers:</strong> DXY fails decade-long resistance (e.g., 107.00) with RSI divergence. Transatlantic yield spread narrows.</li>
                  <li><strong className="text-slate-900">Execution:</strong> Daily breakdown of market structure (Head &amp; Shoulders). Purchase EUR/USD Call options to limit downside to premium. Long EEM ETF (EM equities out-perform in bear USD).</li>
                  <li><strong className="text-slate-900">Correlation Sizing:</strong> Basket approach (Long EUR/USD, Long Gold, Short USD/CAD). Formula applied: <code className="bg-rose-50 px-2 py-1 rounded text-rose-800 border border-rose-100">Adjusted Size = Base Size &times; (1 &minus; Correlation)</code>.</li>
                </ul>
              </div>
            </div>
          </SectionCard>

          {/* Section 5: Risk */}
          <SectionCard id="risk" title="The 'Widow-Maker' Trade" icon={ShieldAlert} gradient="from-red-500 to-rose-600">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-6 text-red-900">
              <p className="font-medium">The greatest peril is successfully identifying a structural truth but catastrophically misjudging the timing. Fighting a dominant dollar trend prematurely earns the contrarian short dollar position the moniker of a &quot;widow-maker&quot; trade.</p>
            </div>
            <p className="mb-4">Similar to the historical Japanese Government Bond (JGB) shorts&mdash;where funds accurately predicted mathematical unsustainability but were crushed by decades of infinite quantitative easing&mdash;shorting the USD carries amplified systemic risks.</p>
            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li><strong>Behavioral Refusal:</strong> Foreign investors refuse to hedge USD exposures during rallies due to loss aversion, creating structural momentum that defies rational models.</li>
              <li><strong>1980s Volcker Shock:</strong> Aggressive hikes caused a 44% USD appreciation. The trend only reversed via direct political intervention (1985 Plaza Accord), long after early fundamental bears were wiped out.</li>
              <li><strong>2002&ndash;2008 Decline:</strong> Investors clinging to the late-90s exceptionalism paradigm suffered as the USD entered a prolonged structural decline.</li>
            </ul>
            <p className="font-semibold text-rose-700 text-center bg-rose-50 py-3 rounded-lg border border-rose-100">
              Lesson: Fundamental unsustainability does not preclude medium-term strength. Negative carry can bankrupt an institution before reality materializes.
            </p>
          </SectionCard>

          {/* Section 6: Investment Clock */}
          <SectionCard id="clock" title="Historical Evidence: The Investment Clock" icon={Clock} gradient="from-yellow-500 to-amber-500">
            <p className="mb-6">To mitigate timing risks, allocators use the Merrill Lynch Investment Clock (introduced 2004). It segments the business cycle based on the OECD output gap and CPI inflation.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clockData.map((data, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                    <h4 className="font-bold text-lg text-slate-800">{data.phase}</h4>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-1 rounded shadow-sm">{data.asset}</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex gap-2 text-sm">
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">Growth: {data.trajectory}</span>
                      <span className="bg-rose-50 text-rose-700 px-2 py-1 rounded border border-rose-100">CPI: {data.cpi}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{data.usd}</p>
                  </div>
                </div>
              ))}
            </div>
            <HighlightBox color="amber">
              <p>The dollar thrives as a defensive asset in the <strong>Stagflation</strong> quadrant. Synchronized global growth (Recovery/Overheat) reliably diminishes dollar dominance as capital seeks risk assets abroad.</p>
            </HighlightBox>
          </SectionCard>

          {/* Section 7: Modern Extensions */}
          <SectionCard id="extensions" title="Modern Extensions (2026–2030)" icon={Globe} gradient="from-sky-500 to-indigo-500">
            <p className="mb-4">Three structural catalysts are actively shifting the long-term dollar model horizon.</p>
            <div className="space-y-6">
              <div className="group border border-slate-200 rounded-2xl p-6 hover:bg-sky-50 transition-colors">
                <h4 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="bg-sky-100 text-sky-600 p-2 rounded-lg"><Zap size={18} /></span>
                  AI-Driven Reshoring
                </h4>
                <p className="text-slate-600">Challenging the industrial decay narrative, $2.9T in projected AI CapEx (by 2026) is driving &quot;U.S. exceptionalism.&quot; High productivity gains keep domestic rates elevated, supporting a tech-driven USD bull cycle.</p>
              </div>
              <div className="group border border-slate-200 rounded-2xl p-6 hover:bg-indigo-50 transition-colors">
                <h4 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg"><Globe size={18} /></span>
                  BRICS &amp; Project mBridge
                </h4>
                <p className="text-slate-600">A DLT platform bypassing SWIFT. Managed by central banks (China, UAE, etc.), its EVM compatibility enables smart contracts. Reduces transactional friction binding emerging markets to the USD.</p>
              </div>
              <div className="group border border-slate-200 rounded-2xl p-6 hover:bg-slate-100 transition-colors">
                <h4 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="bg-slate-200 text-slate-600 p-2 rounded-lg"><Activity size={18} /></span>
                  Fed Balance Sheet Trilemma
                </h4>
                <p className="text-slate-600">CBO projects deficit at $3.1T and debt at 120% of GDP by 2036. The Fed cannot simultaneously maintain a small balance sheet, low rate volatility, and minimal market intervention. Fiscal dominance (monetizing debt) risks severe USD devaluation.</p>
              </div>
            </div>
          </SectionCard>

          {/* Section 8: Synthesis */}
          <SectionCard id="synthesis" title="Synthesis & Leading Indicators" icon={AlertTriangle} gradient="from-fuchsia-600 to-pink-500">
            <p>
              The USD outlook is a tug-of-war between profound short-term strength (Milkshake Theory: inelastic demand, Eurodollar system, AI exceptionalism) and long-term systemic fragility (De-dollarization: Triffin&apos;s Dilemma, massive debt, mBridge adoption). To navigate the treacherous timing, monitor these high-frequency mechanical indicators:
            </p>
            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl mt-6">
              <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center gap-2 text-slate-200">
                <Target size={18} className="text-pink-400" />
                <h4 className="font-bold">Regime Shift Indicator Checklist</h4>
              </div>
              <div className="divide-y divide-slate-800/50">
                {indicatorData.map((item, idx) => (
                  <div key={idx} className="p-4 md:p-6 hover:bg-slate-800/50 transition-colors grid md:grid-cols-12 gap-4">
                    <div className="md:col-span-4">
                      <span className="text-pink-400 text-sm font-bold uppercase tracking-wider block mb-1">{item.category}</span>
                      <strong className="text-slate-200">{item.metric}</strong>
                    </div>
                    <div className="md:col-span-8 text-slate-400 text-sm leading-relaxed border-l-2 border-slate-800 pl-4 md:pl-6">{item.rationale}</div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Google Doc CTA */}
          {currentArticle?.googleDoc && (
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-xl my-8 text-center border border-indigo-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Read the Full Research Paper</h3>
              <p className="text-slate-600 mb-6">Access the complete institutional-grade analysis with extended data, citations, and methodology.</p>
              <a
                href={currentArticle.googleDoc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                <ArrowRight className="mr-2" />
                Read Full Research Paper
              </a>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-sm text-amber-800">
            <strong className="block mb-1">Educational Disclaimer</strong>
            This article is for informational and educational purposes only. It does not constitute investment advice, financial advice, or a recommendation to buy or sell any security. All data and analysis are illustrative. Consult a qualified financial professional before making investment decisions.
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm font-medium">
          <p>&copy; 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.</p>
        </footer>
      </div>
    </>
  );
}
