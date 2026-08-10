'use client';

import React, { useState } from 'react';
import { TrendingUp, Activity, AlertTriangle, Layers, Search, ArrowRight, Gauge, ArrowUpRight, Scale, Anchor, MoveRight, Calculator, History, MousePointerClick, Lightbulb } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { Jargon, ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

// --- Visualizations ---
const InteractiveSkewViz = () => {
  const [mode, setMode] = useState('normal'); // normal, flat, mania

  const getPath = () => {
    switch(mode) {
      case 'flat': return "M 40 100 Q 150 120 200 115 T 360 110";
      case 'mania': return "M 40 130 Q 150 130 200 120 T 360 40"; 
      case 'normal': 
      default: return "M 40 60 Q 150 140 200 130 T 360 120";
    }
  };

  const getLabel = () => {
    switch(mode) {
      case 'flat':
        return { 
          title: "Skew Flattening (Complacency)", 
          desc: "Demand for Puts wanes. Traders sell Puts to finance Longs. The curve flattens as fear evaporates.",
          color: "text-[#A8672E] dark:text-[#D08F52]",
          stroke: "#A8672E"
        };
      case 'mania':
        return { 
          title: "Forward Skew (Mania/Squeeze)", 
          desc: "Call panic. Speculators buy OTM calls for leverage. Dealers short gamma must hike Call IV. Right tail becomes ‘fatter’.",
          color: "text-[#BC4128] dark:text-[#E2694A]",
          stroke: "#BC4128"
        };
      case 'normal':
      default:
        return { 
          title: "The Smirk (Standard)", 
          desc: "Crash Phobia. OTM Puts trade at a premium to Calls. The market pays for downside insurance.",
          color: "text-slate-600 dark:text-slate-400",
          stroke: "#64748b"
        };
    }
  };

  const labelData = getLabel();

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="flex justify-center gap-2 mb-6">
        <button 
          onClick={() => setMode('normal')} 
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            mode === 'normal' ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 dark:text-slate-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          Normal
        </button>
        <button 
          onClick={() => setMode('flat')} 
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            mode === 'flat' ? 'bg-[#A8672E] text-white' : 'bg-[#A8672E]/10 text-[#A8672E] hover:bg-[#A8672E]/20'
          }`}
        >
          Flattening
        </button>
        <button 
          onClick={() => setMode('mania')} 
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            mode === 'mania' ? 'bg-[#BC4128] text-white' : 'bg-[#BC4128]/10 text-[#BC4128] hover:bg-[#BC4128]/20'
          }`}
        >
          Mania
        </button>
      </div>

      <div className="w-full h-64 bg-slate-50 dark:bg-[#05070A] rounded-xl border border-slate-200 dark:border-gray-800 relative overflow-hidden flex items-center justify-center mb-6">
        <svg viewBox="0 0 400 200" className="w-full h-full max-w-md transition-all duration-500">
          <line x1="20" y1="180" x2="380" y2="180" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="200" y1="20" x2="200" y2="180" stroke="#cbd5e1" strokeDasharray="4 4" />
          <text x="350" y="195" fontSize="10" fill="#64748b" textAnchor="middle">Strike (K)</text>
          <path 
            d={getPath()} 
            fill="none" 
            stroke={labelData.stroke} 
            strokeWidth="4" 
            className="transition-all duration-500 ease-in-out" 
          />
        </svg>
      </div>

      <div className="bg-slate-50 dark:bg-gray-800 p-4 rounded-xl border border-slate-100 dark:border-gray-700 text-center">
        <h4 className={`text-lg font-bold mb-2 ${labelData.color}`}>{labelData.title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{labelData.desc}</p>
      </div>
    </div>
  );
};

const RegimeVisualizer = () => {
  const [regime, setRegime] = useState('strike'); // 'strike' or 'delta'
  const [step, setStep] = useState(0); // 0 = start, 1 = move

  // Base Curve (Smirk)
  const pathBase = "M 50 80 Q 200 150 250 140 T 350 135";
  // Shifted Curve (Sticky Delta) - Moves Right
  const pathShifted = "M 100 80 Q 250 150 300 140 T 400 135";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-slate-200 dark:border-gray-800 overflow-hidden mb-12">
      <div className="bg-slate-900 dark:bg-black text-white p-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
            <Calculator className="text-[#A8672E]" /> Regime Visualizer
          </h3>
          <p className="text-slate-400 text-sm mt-1">Simulate a rally and observe the IV curve response.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button 
            onClick={() => { setRegime('strike'); setStep(0); }} 
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              regime === 'strike' ? 'bg-[#A8672E] text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Sticky Strike
          </button>
          <button 
            onClick={() => { setRegime('delta'); setStep(0); }} 
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              regime === 'delta' ? 'bg-[#1D8A70] text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Sticky Delta
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3">
        {/* Graph Area */}
        <div className="md:col-span-2 bg-slate-50 dark:bg-gray-900 p-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-gray-800 flex flex-col items-center">
          <div className="w-full max-w-lg h-64 relative">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              <line x1="20" y1="180" x2="380" y2="180" stroke="#cbd5e1" strokeWidth="2" />
              <text x="360" y="195" fontSize="10" fill="#64748b">Strike</text>
              <text x="20" y="30" fontSize="10" fill="#64748b">IV %</text>
              
              {/* Spot Lines */}
              <line x1="200" y1="20" x2="200" y2="180" stroke="#94a3b8" strokeDasharray="4 4" />
              <text x="205" y="30" fontSize="10" fill="#94a3b8">Spot $4000</text>
              
              <line 
                x1="250" y1="20" x2="250" y2="180" 
                stroke="#A8672E" strokeWidth="2" strokeDasharray="4 4" 
                className={`transition-opacity duration-500 ${step === 1 ? 'opacity-100' : 'opacity-0'}`} 
              />
              <text 
                x="255" y="30" fontSize="10" fill="#A8672E" 
                className={`transition-opacity duration-500 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}
              >
                Spot $4100
              </text>
              
              {/* Curves */}
              <path 
                d={pathBase} 
                fill="none" 
                stroke="#94a3b8" 
                strokeWidth="3" 
                className={`transition-all duration-700 ${regime === 'delta' && step === 1 ? 'opacity-30' : 'opacity-100'}`} 
              />
              <path 
                d={pathShifted} 
                fill="none" 
                stroke="#1D8A70" 
                strokeWidth="3" 
                className={`transition-opacity duration-700 ${regime === 'delta' && step === 1 ? 'opacity-100' : 'opacity-0'}`} 
              />
              
              {/* Target Option Point */}
              <circle cx="300" cy="138" r="6" fill="#BC4128" className="transition-all duration-500" />
              <text x="300" y="125" fontSize="10" fill="#BC4128" textAnchor="middle" fontWeight="bold">Call 4200</text>
            </svg>
          </div>
          
          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => setStep(0)} 
              className="text-xs font-bold text-slate-400 uppercase tracking-wide hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
            >
              Reset
            </button>
            <button 
              onClick={() => setStep(1)} 
              className="px-6 py-2 bg-[#A8672E] text-white rounded-full font-bold shadow-lg hover:bg-[#A8672E]/90 transition-all flex items-center gap-2"
            >
              Simulate Rally <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Data Panel */}
        <div className="bg-white dark:bg-gray-900 p-6 flex flex-col justify-center border-l border-slate-100 dark:border-gray-800">
          <div className="mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Regime</span>
            <h4 className={`text-2xl font-black ${regime === 'strike' ? 'text-[#A8672E]' : 'text-[#1D8A70]'}`}>
              {regime === 'strike' ? 'Sticky Strike' : 'Sticky Delta'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {regime === 'strike' ? 'IV anchored to Strike Price.' : 'IV anchored to Moneyness.'}
            </p>
          </div>
          
          <div className={`p-4 rounded-xl mb-4 transition-all duration-500 ${
            step === 1 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2'
          }`}>
            <div className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 border-b border-slate-100 dark:border-gray-800 pb-2">
              Outcome (4200 Call)
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">Implied Vol:</span>
              <span className={`font-mono font-bold ${regime === 'strike' ? 'text-slate-700 dark:text-slate-300' : 'text-[#1D8A70]'}`}>
                {regime === 'strike' ? 'Constant' : 'Shifts'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function VolatilitySurfaceArticle() {
  return (
    <ArticleFrame
      slug="decoding-volatility-surface-advanced-market-prediction-options-flow"
      additionalDisclaimer="Options trading involves substantial risk and is not suitable for all investors. The volatility metrics described (skew, GEX, PCR) are derived indicators and should be used as one input among many, not as standalone trading signals."
    >
      <div className="max-w-5xl mx-auto space-y-12 text-slate-800 dark:text-slate-200">
        
        {/* Key Takeaways */}
        <div className="bg-white dark:bg-gray-900 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 shadow-sm mb-12 mt-8">
          <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current flex-none" />
            Key Takeaways
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
            <li>The volatility surface is a <strong>real-time sentiment map</strong> encoding the market&apos;s probability density for future prices across all strikes and maturities simultaneously.</li>
            <li><strong>Skew morphology</strong> traces the cycle from fear to complacency to speculative excess: normal &rarr; flattening &rarr; forward (mania).</li>
            <li><strong>Sticky delta</strong> regimes indicate trend acceptance; <strong>sticky strike</strong> regimes indicate disbelief, critical for selecting the correct options strategy.</li>
            <li>A sustainable bull market requires Sticky Delta (belief) plus Healthy Skew (continued hedging).</li>
          </ul>
        </div>

        {/* Section: What is the Surface? */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">What is the Surface?</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Imagine a topographical map. Instead of mountains and valleys, we have fear and greed plotted against <strong>Strike Price</strong> and <strong>Time to Maturity</strong>. 
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-[#A8672E]/10 rounded text-[#A8672E]">
                    <Layers size={16} />
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">It&apos;s a Living Organism:</strong> The surface &ldquo;breathes&rdquo; with market sentiment. It doesn&apos;t just react to price; it anticipates it.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-[#A8672E]/10 rounded text-[#A8672E]">
                    <Activity size={16} />
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">The Pricing of Tails:</strong> It tells us how expensive &ldquo;insurance&rdquo; (Puts) is relative to &ldquo;lottery tickets&rdquo; (Calls).
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#14171B] dark:bg-[#05070A] rounded-2xl p-8 text-center text-slate-300 relative overflow-hidden shadow-sm border border-gray-800">
              <div className="relative z-10">
                <div className="text-6xl font-black text-[#A8672E] mb-2 opacity-50">3D</div>
                <h3 className="text-2xl font-bold text-white mb-4 font-serif">Implied Volatility Map</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-white dark:bg-[#0A0D14]/10 p-2 rounded">Strike Price (X)</div>
                  <div className="bg-white dark:bg-[#0A0D14]/10 p-2 rounded">Maturity (Y)</div>
                  <div className="bg-[#A8672E]/20 p-2 rounded border border-[#A8672E]/50 text-[#A8672E]">Imp. Volatility (Z)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InfographicSlot
          alt="Volatility Surface Infographic"
          label="Featured Infographic"
        />

        {/* Section: The Morphology of Skew */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" /> 
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52]">Visual Analysis</span>
          </div>
          <h2 className="font-serif text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">The Morphology of Skew</h2>
          
          <p className="text-lg leading-relaxed mb-8">
            In equity markets, the &ldquo;Smirk&rdquo; is standard due to crash phobia. But when sentiment shifts, the shape warps. This warping is your early warning system.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MousePointerClick className="w-5 h-5 text-[#A8672E]" />
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest font-serif">Interactive Volatility Lab</h3>
              </div>
              <InteractiveSkewViz />
            </div>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 dark:text-slate-100">
                  <History className="w-5 h-5 text-[#A8672E]" />
                  Historical Context: 1987
                </div>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Before 1987, the volatility smile was often flat (Log-normal). After the &apos;87 crash&mdash;where correlations went to 1 and liquidity vanished&mdash;the market developed <strong>&ldquo;Crash Phobia.&rdquo;</strong> OTM Puts now structurally command a significant premium (higher IV) over OTM Calls. This &ldquo;Smirk&rdquo; is the baseline for all equity markets.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">1. Skew Flattening (Complacency)</h4>
                  <span className="text-xs bg-[#A8672E]/10 text-[#A8672E] px-2 py-1 rounded font-mono">25d Put &asymp; 25d Call</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                  As a bull market matures, the demand for downside protection wanes. Traders become emboldened, selling puts to finance long positions.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1D8A70] bg-[#1D8A70]/10 px-3 py-2 rounded">
                  <TrendingUp className="w-4 h-4" />
                  Implication: Rally confirmed, but market is pricing in zero risk.
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">2. Forward Skew (Mania)</h4>
                  <span className="text-xs bg-[#BC4128]/10 text-[#BC4128] px-2 py-1 rounded font-mono">Call IV &gt; Put IV</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                  Seen in &ldquo;Meme Stocks&rdquo; or Oil supply shocks. Speculators aggressively buy OTM calls. Market makers are short these calls (short gamma) and must raise prices/IV to compensate for unlimited upside risk.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#BC4128] bg-[#BC4128]/10 px-3 py-2 rounded">
                  <AlertTriangle className="w-4 h-4" />
                  Implication: &ldquo;Melt-Up&rdquo; scenario. Probability density shifts right.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Dynamic Volatility Rules */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Dynamic Volatility Rules</h2>
          
          <p className="text-lg leading-relaxed mb-8">
            Does the market believe the rally? When price moves, the volatility curve doesn&apos;t just sit still&mdash;it shifts based on whether traders are anchoring to price or moneyness.
          </p>

          <RegimeVisualizer />

          <ComparisonGrid>
            <ComparisonCard title="Sticky Strike (The Landmark)" tone="pos">
              <p className="mb-4">
                <strong>Sticky Strike</strong> is like a landmark on a map. Strike 4200 is a physical location. The Implied Volatility (IV) is anchored to the specific numerical strike price, regardless of where the spot price goes.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="text-sm font-bold mb-1">Trader&apos;s Interpretation</h4>
                <p className="text-xs">
                  <strong>Disbelief / Mean Reversion.</strong> "We are rallying to 4100, but I don't believe it. I'm not going to mark up the 4200 calls just because we are closer. The market will mean-revert."
                </p>
              </div>
            </ComparisonCard>
            <ComparisonCard title="Sticky Delta (The Shadow)" tone="pos">
              <p className="mb-4">
                <strong>Sticky Delta</strong> is like a shadow cast by the stock. It moves with the stock. Volatility is pinned to &ldquo;Moneyness&rdquo; (e.g., 5% OTM), not a fixed number.
              </p>
              <div className="bg-[#1D8A70]/10 p-4 rounded-lg">
                <h4 className="text-sm font-bold text-[#1D8A70] mb-1">Trader&apos;s Interpretation</h4>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  <strong>Acceptance / Trending.</strong> "This rally is real. The 'fear' bucket (ATM Vol) is moving higher with the price. I need to keep buying 25-delta calls."
                </p>
              </div>
            </ComparisonCard>
          </ComparisonGrid>
        </section>

        {/* Section: The Trader's Compass */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">The Trader&apos;s Compass</h2>
          
          <p className="text-lg leading-relaxed mb-8">
            High-frequency indicators to reveal Smart Money positioning derived from the options chain, Greeks, and open interest.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 font-serif">
                <Scale className="text-[#A8672E]" /> 25&Delta; Risk Reversal
              </h3>
              <p className="text-sm mb-4 leading-relaxed">
                The &ldquo;tilt&rdquo; of the market. This metric tells us which tail is fatter. Are institutions paying up for protection (Puts) or chasing leverage (Calls)?
              </p>
              <FormulaPanel formula="IV_{Call, 25\Delta} - IV_{Put, 25\Delta}" />
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="text-sm font-bold text-[#A8672E] mb-1 flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4" /> Pro Insight: Divergence
                </h4>
                <p className="text-xs leading-snug">
                  If the S&amp;P 500 is flat, but the Risk Reversal is steadily rising (becoming less negative), <Jargon term="Smart Money" definition="Institutional investors with large capital who trade on fundamental analysis." /> is quietly removing hedges. A breakout is often imminent.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 font-serif">
                <Activity className="text-[#A8672E]" /> Put-Call Ratio (PCR)
              </h3>
              <p className="text-sm mb-4 leading-relaxed">
                The most misunderstood indicator. You must separate <strong>Volume</strong> (Retail noise) from <strong>Open Interest</strong> (Institutional walls).
              </p>
              <div className="overflow-x-auto text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <table className="w-full text-left whitespace-nowrap">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-2 font-medium">Condition</th>
                      <th className="px-4 py-2 font-medium">Implication</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    <tr>
                      <td className="px-4 py-2">Low Vol (&lt;0.7) + Rising OI</td>
                      <td className="px-4 py-2 text-[#BC4128]">Smart Money Hedging (Bearish)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">High Vol (&gt;1.0) + Flat OI</td>
                      <td className="px-4 py-2 text-[#1D8A70]">Oversold Bounce Likely</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Rising Call Vol + Falling Call OI</td>
                      <td className="px-4 py-2 text-slate-500">Short Covering (Weak Rally)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 font-serif">
                <AlertTriangle className="text-[#A8672E]" /> Normalized Skew
              </h3>
              <p className="text-sm mb-4 leading-relaxed">
                Adjusts the skew for VIX levels. This is the &ldquo;Truth Serum&rdquo; for a rally. It tells us if investors are nervous or complacent.
              </p>
              <FormulaPanel formula="\frac{IV_{Put} - IV_{Call}}{IV_{ATM}}" />
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-2 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#1D8A70] mt-1.5 flex-none" />
                  <div><strong>Wall of Worry (Healthy):</strong> Market rallies while skew steepens. Investors are buying stocks but nervously hedging downside.</div>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#BC4128] mt-1.5 flex-none" />
                  <div><strong>Euphoria (Fragile):</strong> Market rallies while skew flattens. Protection is cheap because no one wants it. A top is near.</div>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 font-serif">
                <Layers className="text-[#A8672E]" /> Gamma Exposure (GEX)
              </h3>
              <p className="text-sm mb-4 leading-relaxed">
                Market Makers must hedge. Their gamma exposure dictates if they will suppress volatility (stabilize) or accelerate it (crash).
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                  <div className="text-[#1D8A70] font-bold text-sm mb-1">Positive GEX</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">&ldquo;Shock Absorbers&rdquo; <br/> Dealers buy dips &amp; sell rips.</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                  <div className="text-[#BC4128] font-bold text-sm mb-1">Negative GEX</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">&ldquo;Accelerants&rdquo; <br/> Dealers sell into drops.</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 italic">
                *The &ldquo;Flip Line&rdquo; is the price level where GEX switches from positive to negative. Crossing it often triggers turbulence.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Synthesizing the Signal */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Synthesizing the Signal</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              A sustainable Bull Market isn&apos;t just price going up. It requires a <strong>Sticky Delta</strong> regime (belief in the trend) combined with a <strong>Healthy Skew</strong> (continued hedging).
            </p>
            <p className="border-l-4 border-[#BC4128] dark:border-[#E2694A] pl-4 py-2 text-[#BC4128] dark:text-[#E2694A]">
              If you see Price rising, but Skew flattening to zero and PCR Open Interest diverging... <strong>take profit.</strong>
            </p>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}