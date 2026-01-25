'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, TrendingUp, TrendingDown, Zap, ShieldAlert, BarChart3, LineChart, Layers, AlertCircle, Info, DollarSign, Briefcase, Flame, Wind, Target, Settings, Scale, Activity, Music, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

export default function InvestmentClockFramework() {
  const currentArticle = articles.find(article => article.slug === 'investment-clock-framework-quantitative-macro-regime-detection');
  const [activePhase, setActivePhase] = useState(0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const phases = [
    {
      title: "Phase I: Reflation",
      subtitle: "Growth ↓ | Inflation ↓",
      economicState: "Deep Recession / Trough",
      color: "bg-blue-50 border-blue-200 text-blue-900",
      accent: "blue",
      icon: <Wind className="w-8 h-8" />,
      summary: "The economy suffers from excess capacity and falling demand. Policymakers respond with aggressive monetary easing to jumpstart activity. This phase typically emerges from financial crises or severe economic contractions.",
      rationale: "In this environment, interest rates are slashed to near-zero levels. Discount rates fall dramatically, making fixed-income payments highly attractive on a risk-adjusted basis. Stocks struggle initially as earnings collapse and credit spreads widen, but 'Quality' and 'Growth' factors begin to outperform as they can provide yield or expansion potential in a low-growth world. Duration risk becomes a friend rather than enemy.",
      optimalAssets: [
        { name: "Government Bonds", detail: "Long duration bonds benefit most from falling yield curves. 20-30 year Treasuries can generate 20%+ returns during aggressive easing cycles." },
        { name: "Defensive Equities", detail: "Consumer Staples, Utilities, and REITs with stable dividends provide equity exposure with bond-like characteristics." },
        { name: "Quality Growth", detail: "Technology companies with high margins, low debt, and secular growth drivers that can compound through the cycle." }
      ],
      subOptimal: "Commodities (demand destruction), Industrial cyclicals, and High-yield credit (default risk).",
      centralBank: "Aggressive Easing / Rate Cuts"
    },
    {
      title: "Phase II: Recovery",
      subtitle: "Growth ↑ | Inflation ↓",
      economicState: "Early-Cycle Expansion",
      color: "bg-emerald-50 border-emerald-200 text-emerald-900",
      accent: "emerald",
      icon: <TrendingUp className="w-8 h-8" />,
      summary: "The 'Goldilocks' phase where everything works. Growth accelerates due to previous stimulus, but inflation remains low because the output gap is still wide. Corporate margins expand as operating leverage kicks in.",
      rationale: "This is historically the strongest phase for equities, generating average annual returns of 15-20%. Corporate earnings rebound sharply while interest rates remain low, leading to 'PE Multiple Expansion.' Investors shift from defensive safety to risk-on cyclicality. Credit spreads compress as default risk plummets. Bonds are neutral as yields stabilize at low levels, but duration risk starts to emerge.",
      optimalAssets: [
        { name: "Cyclical Equities", detail: "Consumer Discretionary, Financials, and Real Estate benefit from economic acceleration and margin expansion." },
        { name: "Credit/High Yield", detail: "Narrowing credit spreads as default risk plummets. High-yield bonds can outperform Treasuries by 500-800bp annually." },
        { name: "Small Caps", detail: "Typically high beta and domestic-growth sensitive. Russell 2000 often outperforms S&P 500 by 300-500bp." }
      ],
      subOptimal: "Cash (high opportunity cost), Government Bonds (duration risk without compensation), and Defensive sectors.",
      centralBank: "Accommodative / On Hold"
    },
    {
      title: "Phase III: Overheat",
      subtitle: "Growth ↑ | Inflation ↑",
      economicState: "Late-Cycle Boom",
      color: "bg-orange-50 border-orange-200 text-orange-900",
      accent: "orange",
      icon: <Flame className="w-8 h-8" />,
      summary: "The output gap closes and the economy runs 'hot.' Demand exceeds supply, leading to wage growth and rising input costs. The central bank shifts to a hawkish stance to prevent runaway inflation.",
      rationale: "Equities still rise but face valuation pressure from rising yields and margin compression. This phase tests the 'TINA' (There Is No Alternative) thesis as bonds become competitive again. Commodities become the star performer as physical shortages drive prices up. Value stocks (Energy, Materials) outperform Growth stocks because their near-term cash flows are worth more than distant growth in a rising rate environment.",
      optimalAssets: [
        { name: "Commodities", detail: "Oil, Industrial Metals, and Agriculture as inflation hedges. Commodity indices can generate 20-30% returns during inflationary periods." },
        { name: "Energy/Materials", detail: "Direct beneficiaries of raw material price appreciation. Energy sector often leads during this phase with 25%+ annual returns." },
        { name: "Value Factor", detail: "Low-duration stocks with strong current cash flows. Value can outperform Growth by 500-1000bp annually." }
      ],
      subOptimal: "Growth Tech (high duration sensitivity), Long-term Bonds (rising rate environment), and Interest-sensitive sectors.",
      centralBank: "Tightening / Rate Hikes"
    },
    {
      title: "Phase IV: Stagflation",
      subtitle: "Growth ↓ | Inflation ↑",
      economicState: "Economic Contraction",
      color: "bg-rose-50 border-rose-200 text-rose-900",
      accent: "rose",
      icon: <ShieldAlert className="w-8 h-8" />,
      summary: "The most challenging phase for investors. Growth slows due to high rates, supply shocks, or policy mistakes, but inflation stays high. Central banks face the impossible choice between fighting inflation and supporting growth.",
      rationale: "Traditional assets fail here as the 60/40 portfolio faces its greatest test. Rising inflation hurts bonds through real return erosion, and falling growth hurts equity earnings through margin compression. Cash becomes a strategic asset—not just for safety, but because rising rates increase the 'risk-free' return. Commodities like Gold often shine as 'Hard Money' alternatives to fiat currency debasement.",
      optimalAssets: [
        { name: "Cash / T-Bills", detail: "Provides liquidity and benefits from peak interest rates. T-Bills can yield 4-6% during stagflationary periods." },
        { name: "Gold", detail: "A classic hedge against currency debasement and stagflation. Gold averaged 30%+ annual returns during the 1970s stagflation." },
        { name: "Defensive Staples", detail: "Inelastic demand allows for cost pass-through to consumers. Companies with pricing power outperform." }
      ],
      subOptimal: "Growth Equities (multiple compression), Credit (spreads widen significantly), and Long-duration assets.",
      centralBank: "Restrictive / Inflation Fighting"
    }
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

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

      {/* Full-screen image viewer */}
      <FullScreenImageViewer
        src="https://i.imgur.com/E1ZKfSA.jpeg"
        alt="Investment Clock Framework Infographic"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-indigo-100">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="py-24 px-6 bg-white border-b border-neutral-200 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-md mb-6">
                Institutional Research Document
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tight text-neutral-900">
                Macro <br/> <span className="text-indigo-600">Cycles.</span>
              </h1>
              <p className="text-xl text-neutral-500 leading-relaxed max-w-lg mb-4">
                A comprehensive technical guide to the Investment Clock—a quantitative framework for identifying market regimes through growth and inflation volatility.
              </p>
              <div className="flex items-center gap-4 text-xs font-bold text-neutral-400 uppercase tracking-widest mt-8 border-t border-neutral-100 pt-8">
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Live Macro Model
                </span>
                <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                <span>Updated Q1 2026</span>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="aspect-square w-full max-w-[440px] bg-neutral-100 rounded-full border-8 border-white shadow-2xl flex items-center justify-center p-8 relative">
                <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
                  {phases.map((p, i) => (
                    <div 
                      key={i} 
                      onMouseEnter={() => setActivePhase(i)}
                      className={`rounded-2xl flex flex-col items-center justify-center p-4 transition-all duration-500 cursor-pointer ${
                        activePhase === i ? 'scale-110 shadow-xl ' + p.color : 'opacity-30 grayscale blur-[1px]'
                      }`}
                    >
                      {p.icon}
                      <span className="text-[10px] font-black mt-2 uppercase tracking-tighter hidden sm:block">
                        {p.title.split(":")[1]}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Visual Clock Hand */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-12">
                  <div 
                    className="w-1.5 h-1/2 bg-indigo-600 rounded-full origin-bottom transition-transform duration-700 ease-in-out" 
                    style={{ transform: `rotate(${activePhase * 90 + 45}deg) translateY(-50%)` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Infographic */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/E1ZKfSA.jpeg" 
              alt="Investment Clock Framework Infographic" 
              className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
            />
            {/* Full-screen button overlay */}
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
            {/* Click hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
              <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                Click to view full screen
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-6 py-16 space-y-32">
          {/* Section 1: The Core Research */}
          <section id="theory" className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">
                01. Theoretical Foundation
              </h2>
              <h3 className="text-4xl font-extrabold mb-6 leading-tight">
                The Cartesian Macro Model
              </h3>
              <p className="text-neutral-500 mb-6 leading-relaxed">
                The Investment Clock framework, pioneered by Merrill Lynch in 2004, revolutionized institutional asset allocation by reducing the complexity of global macro analysis into a simple two-dimensional coordinate system. The clock assumes that the primary drivers of investment returns are the cyclical movements of <strong>Global Growth</strong> (relative to trend) and <strong>Inflation</strong>.
              </p>
              <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-200">
                <h5 className="font-bold text-indigo-900 mb-3">Historical Context</h5>
                <p className="text-sm text-indigo-700 leading-relaxed">
                  The framework emerged from the need to systematize tactical asset allocation decisions across business cycles. Unlike static portfolio models, the Investment Clock provides a dynamic roadmap for rotating between asset classes based on macroeconomic regime changes.
                </p>
              </div>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
              <div className="p-10 bg-white border border-neutral-200 rounded-3xl shadow-sm hover:border-indigo-200 transition-colors">
                <Activity className="w-10 h-10 text-indigo-600 mb-6" />
                <h4 className="text-xl font-bold mb-3">Growth (The Output Gap)</h4>
                <p className="text-sm text-neutral-500 leading-relaxed italic mb-4">
                  "It is not absolute GDP that matters, but the deviation from potential."
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  Rising growth shifts the clock clockwise; falling growth moves it counter-clockwise. This represents the capacity utilization of the economy—the difference between actual and potential GDP.
                </p>
                <div className="bg-neutral-50 p-4 rounded-xl">
                  <h6 className="font-semibold text-xs uppercase tracking-wide text-neutral-400 mb-2">Key Indicators</h6>
                  <ul className="text-xs text-neutral-600 space-y-1">
                    <li>• OECD Composite Leading Indicator (CLI)</li>
                    <li>• ISM Manufacturing PMI</li>
                    <li>• Employment trends and wage growth</li>
                    <li>• Corporate earnings momentum</li>
                  </ul>
                </div>
              </div>
              <div className="p-10 bg-white border border-neutral-200 rounded-3xl shadow-sm hover:border-indigo-200 transition-colors">
                <Scale className="w-10 h-10 text-indigo-600 mb-6" />
                <h4 className="text-xl font-bold mb-3">Inflation (The Constraint)</h4>
                <p className="text-sm text-neutral-500 leading-relaxed italic mb-4">
                  "Inflation acts as the terminal speed limit for any expansion."
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  High inflation forces central banks to hike rates regardless of growth, creating the transition from the profitable 'Overheat' phase to 'Stagflation'. This axis captures the monetary policy constraint on economic expansion.
                </p>
                <div className="bg-neutral-50 p-4 rounded-xl">
                  <h6 className="font-semibold text-xs uppercase tracking-wide text-neutral-400 mb-2">Key Indicators</h6>
                  <ul className="text-xs text-neutral-600 space-y-1">
                    <li>• Core CPI (excluding food & energy)</li>
                    <li>• PCE Price Index (Fed's preferred measure)</li>
                    <li>• Wage inflation and unit labor costs</li>
                    <li>• Inflation expectations (5Y5Y forward)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Interactive Phase Deep Dive */}
          <section id="phases" className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">
                  02. Phase Analysis
                </h2>
                <h3 className="text-4xl font-extrabold">The Four Market Regimes</h3>
              </div>
              <div className="flex bg-neutral-200 p-1 rounded-xl">
                {phases.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActivePhase(i)}
                    className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                      activePhase === i ? 'bg-white text-indigo-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                  >
                    Phase {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-8 md:p-16 rounded-[3rem] border-2 transition-all duration-700 ${phases[activePhase].color}`}>
              <div className="grid lg:grid-cols-2 gap-16">
                <div>
                  <div className="flex items-center gap-6 mb-10">
                    <div className="p-5 bg-white rounded-3xl shadow-sm ring-1 ring-black/5">
                      {phases[activePhase].icon}
                    </div>
                    <div>
                      <h4 className="text-4xl font-black tracking-tight">{phases[activePhase].title}</h4>
                      <p className="font-bold text-indigo-600 uppercase tracking-[0.2em] text-xs">
                        {phases[activePhase].subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8 mb-10">
                    <div>
                      <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest block mb-3">
                        Macro Context
                      </span>
                      <p className="text-xl font-medium leading-relaxed">{phases[activePhase].summary}</p>
                    </div>
                    <div className="flex gap-12">
                      <div>
                        <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest block mb-3">
                          Central Bank
                        </span>
                        <div className="font-bold text-neutral-900 border-l-4 border-indigo-500 pl-4 py-1">
                          {phases[activePhase].centralBank}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest block mb-3">
                          Economic State
                        </span>
                        <div className="font-bold text-neutral-900 border-l-4 border-indigo-500 pl-4 py-1">
                          {phases[activePhase].economicState}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-white/50 rounded-[2rem] border border-white/50 backdrop-blur-sm">
                    <h5 className="font-bold mb-4 flex items-center gap-2 uppercase text-xs tracking-widest text-neutral-500">
                      <Target className="w-4 h-4" /> Quantitative Rationale
                    </h5>
                    <p className="text-sm leading-relaxed text-neutral-700">{phases[activePhase].rationale}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                    Optimal Asset Playbook
                  </h5>
                  <div className="space-y-4">
                    {phases[activePhase].optimalAssets.map((asset, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 flex gap-5 group hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{asset.name}</div>
                          <div className="text-sm text-neutral-500 leading-relaxed">{asset.detail}</div>
                        </div>
                      </div>
                    ))}
                    <div className="bg-rose-100/40 p-6 rounded-2xl border border-rose-200 flex gap-5 mt-4">
                      <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                        <TrendingDown className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-rose-900 uppercase text-xs tracking-widest mb-1">
                          Structural Underweight
                        </div>
                        <div className="text-sm text-rose-700 font-medium">{phases[activePhase].subOptimal}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Quantitative Implementation Guide */}
          <section id="quant" className="bg-neutral-900 rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[180px] opacity-10 -mt-64 -mr-64"></div>
            <div className="relative z-10">
              <h2 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-4 text-center">
                03. Professional Implementation
              </h2>
              <h3 className="text-5xl font-black mb-8 text-center tracking-tight">Quantitative Workflow</h3>
              <p className="text-lg text-neutral-300 text-center max-w-4xl mx-auto mb-20 leading-relaxed">
                Transforming the Investment Clock from conceptual framework into actionable trading signals requires a systematic approach to data processing, statistical normalization, and portfolio implementation. Here's the institutional-grade methodology used by asset managers worldwide.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                {[
                  { 
                    step: "Data Harvesting", 
                    icon: <Layers />, 
                    desc: "Extract OECD Leading Indicators (CLI) for Growth and YoY Core CPI for Inflation. Use 'Amplitude Adjusted' CLI to identify rate-of-change transitions.",
                    details: "The OECD CLI provides a 6-month forward-looking view of economic activity, while Core CPI strips out volatile food and energy components. Data frequency should be monthly with at least 10 years of history for robust statistical analysis."
                  },
                  { 
                    step: "Normalization", 
                    icon: <Settings />, 
                    desc: "Apply a Rolling Z-Score (12-36 months) to both variables. This accounts for structural shifts across different economic decades.",
                    details: "Z-score normalization ensures comparability across different economic regimes. A 24-month rolling window balances sensitivity to recent changes while maintaining statistical stability. Values beyond ±2 standard deviations indicate extreme conditions."
                  },
                  { 
                    step: "Phase Mapping", 
                    icon: <Target />, 
                    desc: "Plot the current Z-score pair on the Cartesian plane. Identify the quadrant and the 'distance from origin' to determine signal strength.",
                    details: "Each quadrant represents a distinct macro regime. The Euclidean distance from origin (0,0) measures signal conviction. Distances above 1.0 indicate high-confidence regime identification, while values below 0.5 suggest transitional periods."
                  },
                  { 
                    step: "Dynamic Tilt", 
                    icon: <BarChart3 />, 
                    desc: "Calculate the Tracking Error budget. Apply +/- 5-15% tilts to the Strategic Asset Allocation based on the clock positioning.",
                    details: "Tactical tilts should respect risk budgets and liquidity constraints. A typical implementation might overweight equities by 10% during Recovery phases while reducing duration risk. Position sizing scales with signal strength and volatility forecasts."
                  }
                ].map((item, i) => (
                  <div key={i} className="space-y-6 group">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[1.25rem] flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-bold border-b border-white/10 pb-4">{item.step}</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-xs text-neutral-500 leading-relaxed">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-20 p-10 bg-white/5 border border-white/10 rounded-[3rem] flex flex-col md:flex-row items-center gap-12">
                <div className="shrink-0 text-center px-10 border-r border-white/10 hidden lg:block">
                  <div className="text-5xl font-black text-indigo-400 tracking-tighter">0.2 SD</div>
                  <div className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest mt-2">
                    Hysteresis Band
                  </div>
                </div>
                <div>
                  <h5 className="font-bold text-lg mb-3 flex items-center gap-3">
                    <Info className="w-5 h-5 text-indigo-400" /> Statistical Risk Mitigation
                  </h5>
                  <p className="text-base text-neutral-400 leading-relaxed max-w-3xl mb-4">
                    Most institutional managers implement a <strong>Hysteresis Band</strong>. A phase transition is only triggered if the macro vector moves at least 0.2 standard deviations across an axis. This prevents excessive turnover and "whipsaw" trading during minor data revisions or cyclical noise.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <h6 className="font-semibold text-sm text-white mb-2">Transaction Cost Management</h6>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Frequent rebalancing can erode returns through bid-ask spreads and market impact. The hysteresis band reduces turnover by 40-60% while maintaining signal integrity.
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <h6 className="font-semibold text-sm text-white mb-2">Data Revision Robustness</h6>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Economic data undergoes multiple revisions. The band ensures that portfolio changes are based on statistically significant regime shifts rather than measurement noise.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Critical Analysis & Modern Challenges */}
          <section id="critique" className="space-y-16">
            <div className="max-w-3xl">
              <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">
                04. Critical Analysis
              </h2>
              <h3 className="text-4xl font-extrabold mb-8 tracking-tight">
                The Modern Implementation Gap
              </h3>
              <p className="text-xl text-neutral-500 leading-relaxed mb-6">
                While elegant in its simplicity, the Investment Clock framework faces significant challenges in today's interconnected and policy-distorted markets. Practitioners must address structural distortions that often "break" the clock's predictive power.
              </p>
              <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-2xl">
                <h5 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Framework Limitations
                </h5>
                <p className="text-sm text-yellow-800 leading-relaxed">
                  The clock's effectiveness has diminished since the 2008 financial crisis due to unprecedented monetary interventions, structural changes in labor markets, and the rise of algorithmic trading that can amplify or dampen traditional relationships.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="p-12 bg-white border border-neutral-200 rounded-[3rem] shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Briefcase className="text-indigo-600 w-7 h-7" /> The "Time Lag" Problem
                </h4>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Macro data (GDP, CPI) is notoriously backward-looking. By the time a 'Recovery' phase is confirmed by official data, equity markets have often already priced in the expansion. This creates a lag where the clock reflects the past rather than the future.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-neutral-50 rounded-xl">
                    <h6 className="font-semibold text-sm mb-2">Data Publication Delays</h6>
                    <ul className="text-xs text-neutral-600 space-y-1">
                      <li>• GDP: Released 1-3 months after quarter-end</li>
                      <li>• CPI: Published 2-3 weeks after month-end</li>
                      <li>• Employment: Available first Friday of following month</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h6 className="font-semibold text-blue-900 text-sm mb-2">Practitioner Solutions</h6>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Nowcasting models using high-frequency data</li>
                      <li>• Credit spreads as real-time growth proxies</li>
                      <li>• Satellite data for economic activity tracking</li>
                      <li>• Alternative data sources (Google Trends, mobility)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-12 bg-white border border-neutral-200 rounded-[3rem] shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Zap className="text-indigo-600 w-7 h-7" /> Monetary Distortion (QE/QT)
                </h4>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Central bank bond-buying programs (QE) suppress yields regardless of growth, severing the link between cycles and bond prices. Furthermore, liquidity impulses often override macro fundamentals in the short term, creating "fake" signals.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-neutral-50 rounded-xl">
                    <h6 className="font-semibold text-sm mb-2">QE Impact on Asset Prices</h6>
                    <ul className="text-xs text-neutral-600 space-y-1">
                      <li>• Bond yields artificially suppressed</li>
                      <li>• Risk asset inflation through portfolio effects</li>
                      <li>• Volatility compression across asset classes</li>
                      <li>• Correlation breakdown between fundamentals and prices</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <h6 className="font-semibold text-purple-900 text-sm mb-2">Modern Adaptations</h6>
                    <ul className="text-xs text-purple-700 space-y-1">
                      <li>• Track central bank balance sheet changes</li>
                      <li>• Monitor "Net Liquidity" flows</li>
                      <li>• Adjust for term premium distortions</li>
                      <li>• Use real yields instead of nominal rates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 p-12 md:p-20 rounded-[4rem] text-white">
              <div className="max-w-4xl mx-auto">
                <h4 className="text-3xl font-black mb-6 text-center tracking-tight">
                  Complementary Frameworks
                </h4>
                <p className="text-lg text-indigo-100 text-center mb-12 leading-relaxed">
                  Successful practitioners combine the Investment Clock with additional analytical frameworks to improve signal quality and reduce false positives.
                </p>
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="space-y-6">
                    <div className="text-indigo-200 font-black uppercase text-xs tracking-[0.2em]">
                      Framework A
                    </div>
                    <h5 className="text-xl font-bold border-l-2 border-indigo-400 pl-6">
                      Yield Curve Term Structure
                    </h5>
                    <p className="text-sm text-indigo-100/70 leading-relaxed pl-6 mb-4">
                      The 10Y-2Y Treasury spread remains the most reliable lead indicator for Phase IV (Stagflation) transitions, often leading the Investment Clock by 6-12 months.
                    </p>
                    <div className="pl-6 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-indigo-200">Inversion (&lt;0):</span>
                        <span className="text-white font-semibold">Recession Signal</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-indigo-200">Steep (&gt;200bp):</span>
                        <span className="text-white font-semibold">Recovery Phase</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-indigo-200">Flattening:</span>
                        <span className="text-white font-semibold">Late Cycle</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="text-indigo-200 font-black uppercase text-xs tracking-[0.2em]">
                      Framework B
                    </div>
                    <h5 className="text-xl font-bold border-l-2 border-indigo-400 pl-6">
                      Citi Economic Surprise Index
                    </h5>
                    <p className="text-sm text-indigo-100/70 leading-relaxed pl-6 mb-4">
                      Markets react to the <em>delta</em> between expectations and reality. High surprise scores can keep equities rising even if the Clock technically sits in 'Overheat'.
                    </p>
                    <div className="pl-6 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-indigo-200">Positive Surprises:</span>
                        <span className="text-white font-semibold">Risk-On Sentiment</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-indigo-200">Negative Surprises:</span>
                        <span className="text-white font-semibold">Defensive Positioning</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-indigo-200">Extreme Readings:</span>
                        <span className="text-white font-semibold">Reversal Signal</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 p-8 bg-white/10 rounded-2xl">
                  <h5 className="font-bold text-lg mb-4 text-center">Integration Strategy</h5>
                  <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="font-bold">1</span>
                      </div>
                      <p className="text-indigo-100">Use Investment Clock for primary regime identification</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="font-bold">2</span>
                      </div>
                      <p className="text-indigo-100">Validate with yield curve positioning and economic surprises</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="font-bold">3</span>
                      </div>
                      <p className="text-indigo-100">Adjust position sizing based on signal confluence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mathematical Framework Section */}
          <section className="space-y-12">
            <div className="max-w-3xl">
              <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">
                05. Mathematical Framework
              </h2>
              <h3 className="text-4xl font-extrabold mb-8 tracking-tight">
                The Quantitative Engine
              </h3>
              <p className="text-xl text-neutral-500 leading-relaxed mb-6">
                The Investment Clock transforms qualitative macro observations into quantitative signals through standardized statistical measures. This mathematical foundation enables systematic implementation and backtesting across different market regimes.
              </p>
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
                <h5 className="font-bold text-blue-900 mb-3">Statistical Foundation</h5>
                <p className="text-sm text-blue-700 leading-relaxed">
                  The framework relies on the assumption that economic variables follow approximately normal distributions over business cycle frequencies. Z-score normalization converts raw data into standardized units, enabling cross-temporal and cross-regional comparisons.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="p-10 bg-white border border-neutral-200 rounded-3xl shadow-sm">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <LineChart className="text-indigo-600 w-6 h-6" /> Z-Score Normalization
                </h4>
                <div className="bg-neutral-50 p-6 rounded-xl mb-6 font-mono text-sm">
                  <div className="text-center mb-4">
                    <strong>Z<sub>growth</sub> = (CLI<sub>t</sub> - μ<sub>CLI</sub>) / σ<sub>CLI</sub></strong>
                  </div>
                  <div className="text-center">
                    <strong>Z<sub>inflation</sub> = (CPI<sub>t</sub> - μ<sub>CPI</sub>) / σ<sub>CPI</sub></strong>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  Where CLI is the OECD Composite Leading Indicator (amplitude adjusted) and CPI is year-over-year core inflation. Rolling windows of 24-36 months provide optimal sensitivity to regime changes.
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h6 className="font-semibold text-green-900 text-xs mb-1">Parameter Selection</h6>
                    <ul className="text-xs text-green-700 space-y-1">
                      <li>• 24-month window: Higher sensitivity, more noise</li>
                      <li>• 36-month window: Lower sensitivity, more stability</li>
                      <li>• Optimal: 30-month rolling average for most markets</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-white border border-neutral-200 rounded-3xl shadow-sm">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Target className="text-indigo-600 w-6 h-6" /> Phase Classification
                </h4>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-semibold">Reflation:</span>
                    <span className="font-mono">Z<sub>g</sub> &lt; 0, Z<sub>i</sub> &lt; 0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                    <span className="font-semibold">Recovery:</span>
                    <span className="font-mono">Z<sub>g</sub> &gt; 0, Z<sub>i</sub> &lt; 0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-semibold">Overheat:</span>
                    <span className="font-mono">Z<sub>g</sub> &gt; 0, Z<sub>i</sub> &gt; 0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
                    <span className="font-semibold">Stagflation:</span>
                    <span className="font-mono">Z<sub>g</sub> &lt; 0, Z<sub>i</sub> &gt; 0</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <h6 className="font-semibold text-purple-900 text-xs mb-1">Transition Dynamics</h6>
                  <p className="text-xs text-purple-700 leading-relaxed">
                    Phase transitions typically follow clockwise movement: Reflation → Recovery → Overheat → Stagflation. Counter-clockwise movements indicate policy-induced or shock-driven regime changes.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-10 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl border border-indigo-200">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <AlertCircle className="text-indigo-600 w-6 h-6" /> Signal Strength & Confidence
              </h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold mb-3">Distance from Origin</h5>
                  <div className="bg-white p-4 rounded-xl font-mono text-sm text-center mb-4">
                    <strong>Signal Strength = √(Z<sub>growth</sub>² + Z<sub>inflation</sub>²)</strong>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                    The Euclidean distance from the origin (0,0) indicates the strength of the current regime. Values above 1.0 suggest high confidence in phase classification.
                  </p>
                  <div className="space-y-2">
                    <div className="p-2 bg-white rounded border border-neutral-200">
                      <div className="flex justify-between text-xs">
                        <span>Distance &lt; 0.5:</span>
                        <span className="font-semibold text-yellow-600">Transition Zone</span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">Economic data is mixed, avoid large position changes</p>
                    </div>
                    <div className="p-2 bg-white rounded border border-neutral-200">
                      <div className="flex justify-between text-xs">
                        <span>Distance 0.5-1.0:</span>
                        <span className="font-semibold text-blue-600">Moderate Signal</span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">Clear directional bias, implement modest tactical tilts</p>
                    </div>
                    <div className="p-2 bg-white rounded border border-neutral-200">
                      <div className="flex justify-between text-xs">
                        <span>Distance &gt; 1.0:</span>
                        <span className="font-semibold text-green-600">High Confidence</span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">Strong regime signal, maximum tactical allocation</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold mb-3">Portfolio Implementation</h5>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-xl border border-neutral-200">
                      <h6 className="font-semibold text-sm mb-2">Position Sizing Formula</h6>
                      <div className="font-mono text-xs text-center mb-2 p-2 bg-neutral-50 rounded">
                        Tactical Weight = Base Weight × (1 + α × Signal Strength × Phase Multiplier)
                      </div>
                      <ul className="text-xs text-neutral-600 space-y-1">
                        <li>• α = Risk tolerance parameter (0.1-0.3)</li>
                        <li>• Phase Multiplier = Asset-specific regime sensitivity</li>
                        <li>• Base Weight = Strategic asset allocation</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-neutral-200">
                      <h6 className="font-semibold text-sm mb-2">Risk Management</h6>
                      <ul className="text-xs text-neutral-600 space-y-1">
                        <li>• Maximum tactical deviation: ±15% of base weight</li>
                        <li>• Rebalancing frequency: Monthly or on regime change</li>
                        <li>• Stop-loss: Exit tactical positions if 2-month drawdown &gt; 5%</li>
                        <li>• Correlation monitoring: Adjust for regime-dependent correlations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-white/70 rounded-2xl border border-white/50">
                <h5 className="font-semibold mb-4 text-center">Backtesting Considerations</h5>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h6 className="font-semibold text-indigo-900 mb-2">Data Requirements</h6>
                    <ul className="text-xs text-neutral-600 space-y-1">
                      <li>• Minimum 20 years of history</li>
                      <li>• Multiple business cycles</li>
                      <li>• Consistent data definitions</li>
                      <li>• Real-time data availability</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-semibold text-indigo-900 mb-2">Performance Metrics</h6>
                    <ul className="text-xs text-neutral-600 space-y-1">
                      <li>• Information Ratio vs. benchmark</li>
                      <li>• Maximum drawdown by regime</li>
                      <li>• Hit rate of regime predictions</li>
                      <li>• Transaction cost impact</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-semibold text-indigo-900 mb-2">Robustness Tests</h6>
                    <ul className="text-xs text-neutral-600 space-y-1">
                      <li>• Parameter sensitivity analysis</li>
                      <li>• Out-of-sample validation</li>
                      <li>• Regime stability tests</li>
                      <li>• Crisis period performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call-to-Action Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <DollarSign className="inline mr-2" />
                  Read Full Research Paper
                </a>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-neutral-200 py-24 px-6 mt-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
              <div className="max-w-xs">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-8 h-8 text-indigo-600" />
                  <span className="font-bold text-2xl uppercase tracking-tighter">
                    Investment <span className="text-neutral-400 font-light">Clock</span>
                  </span>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  A quantitative framework for tactical asset allocation. This tutorial serves as a technical whitepaper for macroeconomic regime detection.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
                <div className="space-y-4">
                  <h6 className="font-black text-[10px] uppercase tracking-[0.3em] text-neutral-300">
                    Sections
                  </h6>
                  <ul className="space-y-3 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    <li onClick={() => scrollTo('theory')} className="hover:text-indigo-600 cursor-pointer transition-colors">
                      Framework
                    </li>
                    <li onClick={() => scrollTo('phases')} className="hover:text-indigo-600 cursor-pointer transition-colors">
                      Phase Deep-Dive
                    </li>
                    <li onClick={() => scrollTo('quant')} className="hover:text-indigo-600 cursor-pointer transition-colors">
                      Implementation
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h6 className="font-black text-[10px] uppercase tracking-[0.3em] text-neutral-300">
                    Data Sources
                  </h6>
                  <ul className="space-y-3 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    <li className="text-neutral-400">OECD CLI (Amplitude)</li>
                    <li className="text-neutral-400">Core CPI YoY</li>
                    <li className="text-neutral-400">Fed Funds Rate</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h6 className="font-black text-[10px] uppercase tracking-[0.3em] text-neutral-300">
                    Classification
                  </h6>
                  <p className="text-[10px] text-neutral-400 font-medium leading-relaxed uppercase tracking-widest">
                    Quantitative Finance<br/>
                    Macro Strategy<br/>
                    Regime Detection
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase text-neutral-300 tracking-[0.3em]">
              <div>© 2026 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}