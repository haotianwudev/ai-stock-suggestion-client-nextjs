'use client';

import React, { useState } from 'react';
import { TrendingUp, Activity, BarChart2, Brain, AlertTriangle, Zap, Layers, Search, ArrowRight, Gauge, ArrowUpRight, Scale, Anchor, MoveRight, Calculator, History, MousePointerClick, Lightbulb } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Components ---
interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`py-16 px-4 md:px-8 max-w-6xl mx-auto ${className}`}>
    {children}
  </section>
);

interface GradientTextProps {
  children: React.ReactNode;
  from?: string;
  to?: string;
}

const GradientText = ({ children, from = "from-violet-600", to = "to-indigo-600" }: GradientTextProps) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r ${from} ${to} font-bold`}>
    {children}
  </span>
);

interface CardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  accentColor?: "indigo" | "emerald" | "rose" | "amber" | "blue" | "violet";
}

const Card = ({ title, icon: Icon, children, accentColor = "indigo" }: CardProps) => {
  const colorMap = {
    indigo: "border-l-indigo-500 shadow-indigo-100",
    emerald: "border-l-emerald-500 shadow-emerald-100",
    rose: "border-l-rose-500 shadow-rose-100",
    amber: "border-l-amber-500 shadow-amber-100",
    blue: "border-l-blue-500 shadow-blue-100",
    violet: "border-l-violet-500 shadow-violet-100",
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${colorMap[accentColor]} hover:shadow-xl transition-shadow duration-300 h-full`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-${accentColor}-50`}>
          <Icon className={`w-6 h-6 text-${accentColor}-600`} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      </div>
      <div className="text-slate-600 leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
};

interface MetricBadgeProps {
  label: string;
  value: string;
  trend: "bullish" | "bearish" | "neutral";
}

const MetricBadge = ({ label, value, trend }: MetricBadgeProps) => (
  <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col items-center justify-center text-center w-full">
    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
    <span className="text-lg font-bold text-slate-800 my-1">{value}</span>
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
      trend === 'bullish' ? 'bg-emerald-100 text-emerald-700' : 
      trend === 'bearish' ? 'bg-rose-100 text-rose-700' : 
      'bg-slate-200 text-slate-600'
    }`}>
      {trend === 'bullish' ? 'Bullish Signal' : trend === 'bearish' ? 'Bearish Signal' : 'Neutral'}
    </span>
  </div>
);

interface SignalTableRow {
  condition: string;
  implication: string;
  type: "bullish" | "bearish" | "neutral";
}

interface SignalTableProps {
  rows: SignalTableRow[];
}

const SignalTable = ({ rows }: SignalTableProps) => (
  <div className="mt-4 border border-slate-100 rounded-lg overflow-x-auto text-sm">
    <table className="w-full">
      <thead className="bg-slate-50 text-slate-500">
        <tr>
          <th className="px-3 py-2 text-left font-medium">Condition</th>
          <th className="px-3 py-2 text-left font-medium">Implication</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50/50">
            <td className="px-3 py-2 font-medium text-slate-700">{row.condition}</td>
            <td className={`px-3 py-2 ${
              row.type === 'bullish' ? 'text-emerald-600' : 
              row.type === 'bearish' ? 'text-rose-600' : 
              'text-slate-600'
            }`}>
              {row.implication}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

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
          color: "text-blue-600"
        };
      case 'mania':
        return { 
          title: "Forward Skew (Mania/Squeeze)", 
          desc: "Call panic. Speculators buy OTM calls for leverage. Dealers short gamma must hike Call IV. Right tail becomes &lsquo;fatter&rsquo;.",
          color: "text-rose-600"
        };
      case 'normal':
      default:
        return { 
          title: "The Smirk (Standard)", 
          desc: "Crash Phobia. OTM Puts trade at a premium to Calls. The market pays for downside insurance.",
          color: "text-slate-600"
        };
    }
  };

  const labelData = getLabel();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex justify-center gap-2 mb-6">
        <button 
          onClick={() => setMode('normal')} 
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            mode === 'normal' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          Normal
        </button>
        <button 
          onClick={() => setMode('flat')} 
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            mode === 'flat' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          Flattening
        </button>
        <button 
          onClick={() => setMode('mania')} 
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
            mode === 'mania' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
          }`}
        >
          Mania
        </button>
      </div>

      <div className="w-full h-64 bg-slate-50 rounded-xl border border-slate-200 relative overflow-hidden flex items-center justify-center mb-6">
        <svg viewBox="0 0 400 200" className="w-full h-full max-w-md transition-all duration-500">
          <line x1="20" y1="180" x2="380" y2="180" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="200" y1="20" x2="200" y2="180" stroke="#cbd5e1" strokeDasharray="4 4" />
          <text x="350" y="195" fontSize="10" fill="#64748b" textAnchor="middle">Strike (K)</text>
          <path 
            d={getPath()} 
            fill="none" 
            stroke={mode === 'mania' ? '#e11d48' : mode === 'flat' ? '#2563eb' : '#475569'} 
            strokeWidth="4" 
            className="transition-all duration-500 ease-in-out" 
          />
        </svg>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
        <h4 className={`text-lg font-bold mb-2 ${labelData.color}`}>{labelData.title}</h4>
        <p className="text-sm text-slate-600 mb-2">{labelData.desc}</p>
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
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-12">
      <div className="bg-slate-900 text-white p-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Calculator className="text-indigo-400" /> Regime Visualizer
          </h3>
          <p className="text-slate-400 text-sm mt-1">Simulate a rally and observe the IV curve response.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button 
            onClick={() => { setRegime('strike'); setStep(0); }} 
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              regime === 'strike' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Sticky Strike
          </button>
          <button 
            onClick={() => { setRegime('delta'); setStep(0); }} 
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              regime === 'delta' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            Sticky Delta
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3">
        {/* Graph Area */}
        <div className="md:col-span-2 bg-slate-50 p-6 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col items-center">
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
                stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" 
                className={`transition-opacity duration-500 ${step === 1 ? 'opacity-100' : 'opacity-0'}`} 
              />
              <text 
                x="255" y="30" fontSize="10" fill="#6366f1" 
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
                stroke="#10b981" 
                strokeWidth="3" 
                className={`transition-opacity duration-700 ${regime === 'delta' && step === 1 ? 'opacity-100' : 'opacity-0'}`} 
              />
              
              {/* Target Option Point */}
              <circle cx="300" cy="138" r="6" fill="#e11d48" className="transition-all duration-500" />
              <text x="300" y="125" fontSize="10" fill="#e11d48" textAnchor="middle" fontWeight="bold">Call 4200</text>
            </svg>
          </div>
          
          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => setStep(0)} 
              className="text-xs font-bold text-slate-400 uppercase tracking-wide hover:text-slate-600"
            >
              Reset
            </button>
            <button 
              onClick={() => setStep(1)} 
              className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              Simulate Rally <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Data Panel */}
        <div className="bg-white p-6 flex flex-col justify-center border-l border-slate-100">
          <div className="mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Regime</span>
            <h4 className={`text-2xl font-black ${regime === 'strike' ? 'text-indigo-600' : 'text-emerald-500'}`}>
              {regime === 'strike' ? 'Sticky Strike' : 'Sticky Delta'}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              {regime === 'strike' ? 'IV anchored to Strike Price.' : 'IV anchored to Moneyness.'}
            </p>
          </div>
          
          <div className={`p-4 rounded-xl mb-4 transition-all duration-500 ${
            step === 1 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2'
          }`}>
            <div className="text-sm font-bold text-slate-700 mb-2 border-b border-slate-100 pb-2">
              Outcome (4200 Call)
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-500">Implied Vol:</span>
              <span className={`font-mono font-bold ${regime === 'strike' ? 'text-slate-700' : 'text-emerald-600'}`}>
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
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 py-16">
          {/* 1. Introduction to the Surface */}
          <Section className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">What is the Surface?</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Imagine a topographical map. Instead of mountains and valleys, we have fear and greed plotted against <strong>Strike Price</strong> and <strong>Time to Maturity</strong>. 
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-violet-100 rounded text-violet-600">
                    <Layers size={16} />
                  </div>
                  <div>
                    <strong className="text-slate-900">It&apos;s a Living Organism:</strong> The surface &ldquo;breathes&rdquo; with market sentiment. It doesn&apos;t just react to price; it anticipates it.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-violet-100 rounded text-violet-600">
                    <Brain size={16} />
                  </div>
                  <div>
                    <strong className="text-slate-900">The Pricing of Tails:</strong> It tells us how expensive &ldquo;insurance&rdquo; (Puts) is relative to &ldquo;lottery tickets&rdquo; (Calls).
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-slate-900 rounded-2xl p-8 text-center text-slate-300 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 opacity-90"></div>
              <div className="relative z-10">
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2">3D</div>
                <h3 className="text-2xl font-bold text-white mb-4">Implied Volatility Map</h3>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-white/10 p-2 rounded backdrop-blur">Strike Price (X)</div>
                  <div className="bg-white/10 p-2 rounded backdrop-blur">Maturity (Y)</div>
                  <div className="bg-indigo-500/20 p-2 rounded backdrop-blur border border-indigo-500/50 text-indigo-200">Imp. Volatility (Z)</div>
                </div>
              </div>
            </div>
          </Section>

          {/* Infographic — placed inline after the intro, where it supports the argument */}
          <InfographicSlot
            src="https://i.imgur.com/AmiHclK.jpeg"
            alt="Volatility Surface Infographic"
            label="Featured Infographic"
          />

          {/* 2. The Morphology of Skew */}
          <div id="morphology" className="bg-slate-100 py-20 border-y border-slate-200 -mx-6 px-6">
            <Section>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase">
                  <Search className="w-3 h-3" /> Visual Analysis
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">The Morphology of Skew</h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                  In equity markets, the &ldquo;Smirk&rdquo; is standard due to crash phobia. But when sentiment shifts, the shape warps. This warping is your early warning system.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MousePointerClick className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Interactive Volatility Lab</h3>
                  </div>
                  <InteractiveSkewViz />
                </div>
                
                <div className="space-y-6">
                  <div className="bg-slate-800 text-slate-300 p-5 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2 mb-2 text-white font-bold">
                      <History className="w-5 h-5 text-amber-400" />
                      Historical Context: 1987
                    </div>
                    <p className="text-sm leading-relaxed">
                      Before 1987, the volatility smile was often flat (Log-normal). After the &apos;87 crash&mdash;where correlations went to 1 and liquidity vanished&mdash;the market developed <strong>&ldquo;Crash Phobia.&rdquo;</strong> OTM Puts now structurally command a significant premium (higher IV) over OTM Calls. This &ldquo;Smirk&rdquo; is the baseline for all equity markets.
                    </p>
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-800">1. Skew Flattening (Complacency)</h4>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-mono">25d Put &asymp; 25d Call</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      As a bull market matures, the demand for downside protection wanes. Traders become emboldened, selling puts to finance long positions.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded">
                      <TrendingUp className="w-4 h-4" />
                      Implication: Rally confirmed, but market is pricing in zero risk.
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-rose-100">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-800">2. Forward Skew (Mania)</h4>
                      <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded font-mono">Call IV &gt; Put IV</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      Seen in &ldquo;Meme Stocks&rdquo; or Oil supply shocks. Speculators aggressively buy OTM calls. Market makers are short these calls (short gamma) and must raise prices/IV to compensate for unlimited upside risk.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-2 rounded">
                      <Zap className="w-4 h-4" />
                      Implication: &ldquo;Melt-Up&rdquo; scenario. Probability density shifts right.
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          {/* 3. Sticky Strike vs Sticky Delta */}
          <Section className="py-20">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 mb-3 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase">
                Critical Concept
              </div>
              <h2 className="text-4xl font-bold text-slate-900">Dynamic Volatility Rules</h2>
              <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
                Does the market believe the rally? When price moves, the volatility curve doesn&apos;t just sit still&mdash;it shifts based on whether traders are anchoring to price or moneyness.
              </p>
            </div>

            {/* Visualizer Component */}
            <RegimeVisualizer />

            {/* Deep Dive Section */}
            <div className="mb-12 grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Lightbulb className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">The &ldquo;Landmark&rdquo; Analogy</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  <strong>Sticky Strike</strong> is like a landmark on a map. Strike 4200 is a physical location.
                </p>
                <p className="text-sm text-slate-500 italic mb-6">
                  &ldquo;I don&apos;t care where the car (stock price) goes. That tree (Strike 4200) is always 15 feet tall (15% Vol).&rdquo;
                </p>
                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-300">
                  <h4 className="text-sm font-bold text-slate-700 mb-1">Trader&apos;s Monologue</h4>
                  <p className="text-xs text-slate-600">
                    &ldquo;We are rallying to 4100, but I don&apos;t believe it. I&apos;m not going to mark up the 4200 calls just because we are closer. That level is still low risk to me. The market will mean-revert.&rdquo;
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <MoveRight className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">The &ldquo;Shadow&rdquo; Analogy</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  <strong>Sticky Delta</strong> is like a shadow cast by the stock. It moves with the stock.
                </p>
                <p className="text-sm text-slate-500 italic mb-6">
                  &ldquo;The shape of fear follows the price. 10% OTM is always 10% OTM, and it always commands a premium.&rdquo;
                </p>
                <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-400">
                  <h4 className="text-sm font-bold text-emerald-800 mb-1">Trader&apos;s Monologue</h4>
                  <p className="text-xs text-emerald-700">
                    &ldquo;This rally is real. The &apos;fear&apos; bucket (ATM Vol) is moving higher with the price. I need to keep buying 25-delta calls, so I&apos;ll pay up for them even as the strikes get higher.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* The Comparison Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Sticky Strike Side */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden group hover:shadow-xl transition-all">
                <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Anchor className="w-6 h-6 text-slate-500" />
                    Sticky Strike
                  </h3>
                  <div className="text-xs font-mono bg-white border px-2 py-1 rounded text-slate-500">
                    d(IV)/d(Spot) = 0
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-slate-600 mb-6 font-medium">
                    The Implied Volatility (IV) is anchored to the specific numerical strike price (e.g., Strike $4200), regardless of where the spot price goes.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="text-sm font-bold text-slate-700 mb-1">The Mechanics</div>
                      <p className="text-sm text-slate-500">
                        The curve is painted on the wall. As Spot rises, the option moves along the static curve.
                      </p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                      <div className="text-sm font-bold text-amber-800 mb-1">Interpretation</div>
                      <p className="text-sm text-amber-900">
                        <strong>Disbelief / Mean Reversion.</strong> The market views the rally as temporary noise. It expects prices to snap back.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Delta Side */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden group hover:shadow-xl transition-all">
                <div className="bg-emerald-50 p-6 border-b border-emerald-100 flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <MoveRight className="w-6 h-6 text-emerald-600" />
                    Sticky Delta
                  </h3>
                  <div className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                    Curve Shifts
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-slate-600 mb-6 font-medium">
                    The IV curve moves horizontally with the stock price. Volatility is pinned to &ldquo;Moneyness&rdquo; (e.g., 5% OTM), not a fixed number.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="text-sm font-bold text-slate-700 mb-1">The Mechanics</div>
                      <p className="text-sm text-slate-500">
                        The curve is attached to the stock. As Spot rises, the entire curve shifts right. A fixed strike (4200) gets &ldquo;run over&rdquo; by the shifting curve.
                      </p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                      <div className="text-sm font-bold text-emerald-800 mb-1">Interpretation</div>
                      <p className="text-sm text-emerald-900">
                        <strong>Acceptance / Trending.</strong> The market believes the new price level is valid. The &ldquo;fear bucket&rdquo; (ATM Vol) travels with the price.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* 4. The Compass: Quantitative Metrics */}
          <div className="bg-slate-50 py-24 border-t border-slate-200 relative -mx-6 px-6">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <Section className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-violet-100 text-violet-700 text-xs font-bold uppercase">
                    <Gauge className="w-3 h-3" /> Dashboard
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 mb-2">The Trader&apos;s Compass</h2>
                  <p className="text-slate-600 text-lg">High-frequency indicators to reveal Smart Money positioning.</p>
                </div>
                <div className="hidden md:block text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Data Source</span>
                  <div className="text-sm font-semibold text-slate-800">Options Chain, Greeks &amp; OI</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card title="25&Delta; Risk Reversal" icon={Scale} accentColor="emerald">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">
                      Formula: IV(Call) - IV(Put)
                    </div>
                  </div>
                  <p className="text-sm mb-4 leading-relaxed">
                    The &ldquo;tilt&rdquo; of the market. This metric tells us which tail is fatter. Are institutions paying up for protection (Puts) or chasing leverage (Calls)?
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <MetricBadge label="Bullish Signal" value="Rising / Positive" trend="bullish" />
                    <MetricBadge label="Bearish Signal" value="Falling / Negative" trend="bearish" />
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg">
                    <h4 className="text-sm font-bold text-emerald-800 flex items-center gap-2 mb-1">
                      <ArrowUpRight className="w-4 h-4" /> Pro Insight: Divergence
                    </h4>
                    <p className="text-xs text-emerald-700 leading-snug">
                      If the S&amp;P 500 is flat, but the Risk Reversal is steadily rising (becoming less negative), &ldquo;Smart Money&rdquo; is quietly removing hedges. A breakout is often imminent.
                    </p>
                  </div>
                </Card>

                <Card title="Put-Call Ratio (PCR)" icon={Activity} accentColor="indigo">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">
                      Flow vs. Positioning
                    </div>
                  </div>
                  <p className="text-sm mb-4">
                    The most misunderstood indicator. You must separate <strong>Volume</strong> (Retail noise) from <strong>Open Interest</strong> (Institutional walls).
                  </p>
                  <SignalTable rows={[
                    {condition: "Low Vol (<0.7) + Rising OI", implication: "Smart Money Hedging (Bearish)", type: "bearish"},
                    {condition: "High Vol (>1.0) + Flat OI", implication: "Oversold Bounce Likely", type: "bullish"},
                    {condition: "Rising Call Vol + Falling Call OI", implication: "Short Covering (Weak Rally)", type: "neutral"},
                  ]} />
                  <div className="mt-4 p-3 bg-indigo-50 rounded-lg text-xs text-indigo-800">
                    <strong>Key Takeaway:</strong> Divergence is the signal. When Retail buys Calls (Low PCR Vol) but Pros stack Puts (Rising PCR OI), the pros usually win.
                  </div>
                </Card>

                <Card title="Normalized Skew" icon={AlertTriangle} accentColor="amber">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">
                      Formula: (Put - Call) / ATM IV
                    </div>
                  </div>
                  <p className="text-sm mb-4">
                    Adjusts the skew for VIX levels. This is the &ldquo;Truth Serum&rdquo; for a rally. It tells us if investors are nervous or complacent.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-[8px] h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">&ldquo;Wall of Worry&rdquo; (Healthy)</h4>
                        <p className="text-xs text-slate-500">
                          Market Rallies + Skew Steepens (More Negative). Investors are buying stocks but nervously hedging downside. The rally has fuel.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 min-w-[8px] h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">&ldquo;Euphoria&rdquo; (Fragile)</h4>
                        <p className="text-xs text-slate-500">
                          Market Rallies + Skew Flattens. No one expects a drop. Protection is cheap because no one wants it. A top is near.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card title="Gamma Exposure (GEX)" icon={Layers} accentColor="violet">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">
                      Impact: Dealer Hedging
                    </div>
                  </div>
                  <p className="text-sm mb-4">
                    Market Makers must hedge. Their gamma exposure dictates if they will suppress volatility (stabilize) or accelerate it (crash).
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-violet-50 p-3 rounded-lg text-center">
                      <div className="text-violet-600 font-bold text-sm mb-1">Positive GEX</div>
                      <div className="text-xs text-slate-600">&ldquo;Shock Absorbers&rdquo; <br/> Dealers buy dips &amp; sell rips.</div>
                      <div className="mt-2 text-[10px] uppercase font-bold text-violet-400">Low Volatility</div>
                    </div>
                    <div className="bg-rose-50 p-3 rounded-lg text-center">
                      <div className="text-rose-600 font-bold text-sm mb-1">Negative GEX</div>
                      <div className="text-xs text-slate-600">&ldquo;Accelerants&rdquo; <br/> Dealers sell into drops.</div>
                      <div className="mt-2 text-[10px] uppercase font-bold text-rose-400">High Volatility</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 italic border-t border-slate-100 pt-3">
                    *The &ldquo;Flip Line&rdquo; is the price level where GEX switches from positive to negative. Crossing it often triggers turbulence.
                  </div>
                </Card>
              </div>
            </Section>
          </div>

          {/* 5. Synthesis / Conclusion */}
          <Section className="pb-24">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-8 md:p-16 text-white text-center shadow-2xl">
              <Brain className="w-16 h-16 mx-auto text-indigo-200 mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Synthesizing the Signal</h2>
              <p className="text-indigo-100 text-lg md:text-xl max-w-3xl mx-auto mb-10">
                A sustainable Bull Market isn&apos;t just price going up. It requires a <strong>Sticky Delta</strong> regime (belief in the trend) combined with a <strong>Healthy Skew</strong> (continued hedging). <br/><br/>
                If you see Price rising, but Skew flattening to zero and PCR Open Interest diverging&hellip; <strong>take profit.</strong>
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-6 py-3 rounded-full text-sm font-semibold border border-white/30 hover:bg-white/30 transition-all cursor-default">
                <Zap className="w-4 h-4 text-amber-300" />
                Master the Volatility Surface, Master the Market
              </div>
            </div>
          </Section>
        </main>
      </div>
    </ArticleFrame>
  );
}