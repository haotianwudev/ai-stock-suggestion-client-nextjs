'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, ShieldAlert, DollarSign, Activity, Layers, ArrowRight, AlertTriangle, CheckCircle, XCircle, BookOpen, Zap, PieChart, Clock, BarChart2, Lock, Unlock, RefreshCcw, Scale, Plus, Music, Maximize2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Components ---
interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section = ({ title, subtitle, children, className = "", id = "" }: SectionProps) => (
  <section id={id} className={`py-16 px-4 md:px-8 ${className}`}>
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-4 font-serif">{title}</h2>
        {subtitle && <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);

interface CardProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  color?: 'blue' | 'emerald' | 'rose' | 'amber' | 'violet' | 'indigo';
}

const Card = ({ title, icon: Icon, children, color = "blue" }: CardProps) => {
  const colorClasses: Record<string, string> = {
    blue: "bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border-blue-200 text-blue-800 icon-blue-600 dark:bg-blue-900/10 dark:border-blue-900/30 dark:text-blue-100",
    emerald: "bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 border-emerald-200 text-emerald-800 icon-emerald-600 dark:bg-emerald-900/10 dark:border-emerald-900/30 dark:text-emerald-100",
    rose: "bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border-rose-200 text-rose-800 icon-rose-600 dark:bg-rose-900/10 dark:border-rose-900/30 dark:text-rose-100",
    amber: "bg-amber-50 border-amber-200 text-amber-800 icon-amber-600 dark:bg-amber-900/10 dark:border-amber-900/30 dark:text-amber-100",
    violet: "bg-violet-50 border-violet-200 text-violet-800 icon-violet-600 dark:bg-violet-900/10 dark:border-violet-900/30 dark:text-violet-100",
    indigo: "bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border-indigo-200 text-indigo-800 icon-indigo-600 dark:bg-indigo-900/10 dark:border-indigo-900/30 dark:text-indigo-100",
  };
  
  const selected = colorClasses[color] || colorClasses.blue;
  const iconColor = selected.split(" ").find((c: string) => c.startsWith("icon-"))?.replace("icon-", "text-") || "text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]";
  
  return (
    <div className={`p-6 rounded-2xl border-2 hover:shadow-lg transition-shadow duration-300 ${selected.split(" icon-")[0]} h-full flex flex-col`}>
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className={`w-8 h-8 ${iconColor}`} />}
        <h3 className="text-xl font-bold font-serif">{title}</h3>
      </div>
      <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base flex-grow">
        {children}
      </div>
    </div>
  );
};
const ScenarioVisualizer = () => {
  const [scenario, setScenario] = useState<'flat' | 'bull' | 'crash'>('flat');

  // Chart Setup
  const width = 600;
  const height = 300;
  const padding = 40;

  // Coordinate helpers
  const getY = (price: number) => height - padding - ((price / 150) * (height - 2 * padding));
  const getX = (index: number, total: number) => padding + ((index / (total - 1)) * (width - 2 * padding));

  const scenarios = {
    bull: {
      points: [100, 102, 108, 115], // Ends early
      label: "Bull Market",
      desc: "Stock rallies early. The product 'Autocalls' (terminates) immediately.",
      outcome: "Principal + Coupon returned. Reinvestment Risk.",
      colors: { bg: 'bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/20', border: 'border-[#1D8A70] dark:border-[#3CBF9C] dark:border-[#1D8A70] dark:border-[#3CBF9C]/50', text: 'text-emerald-900 dark:text-emerald-300', dot: 'bg-[#1D8A70] dark:bg-[#3CBF9C]', stroke: '#10b981' },
      events: [
        { month: 1, price: 102, text: "Above Coupon Barrier: Coupon Paid" },
        { month: 2, price: 108, text: "Above Autocall Barrier: TERMINATED" }
      ]
    },
    flat: {
      points: [100, 95, 98, 92, 88, 95, 90, 85, 92, 98, 95, 99, 101],
      label: "Sideways Market",
      desc: "Stock fluctuates but stays within the 'Goldilocks' zone.",
      outcome: "Max Yield achieved. All coupons paid. Principal returned.",
      colors: { bg: 'bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20', border: 'border-[#A8672E] dark:border-[#D08F52] dark:border-[#A8672E] dark:border-[#D08F52]/50', text: 'text-blue-900 dark:text-blue-300', dot: 'bg-[#A8672E] dark:bg-[#D08F52]', stroke: '#3b82f6' },
      events: [
        { month: 3, price: 92, text: "Quarter 1: Coupon Paid" },
        { month: 6, price: 90, text: "Quarter 2: Coupon Paid" },
        { month: 9, price: 92, text: "Quarter 3: Coupon Paid" },
        { month: 12, price: 101, text: "Maturity: Full Principal + Coupon" }
      ]
    },
    crash: {
      points: [100, 90, 80, 65, 55, 45, 50, 48, 52, 45, 40, 38, 35],
      label: "Bear Market",
      desc: "Stock crashes below the protection barrier (Knock-In).",
      outcome: "Capital Erosion. Loss matches stock performance 1:1.",
      colors: { bg: 'bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/20', border: 'border-[#BC4128] dark:border-[#E2694A] dark:border-[#BC4128] dark:border-[#E2694A]/50', text: 'text-rose-900 dark:text-rose-300', dot: 'bg-[#BC4128] dark:bg-[#E2694A]', stroke: '#f43f5e' },
      events: [
        { month: 4, price: 55, text: "Knock-In Breached! Protection Lost." },
        { month: 12, price: 35, text: "Maturity: Receive stock worth $35" }
      ]
    }
  };

  const current = scenarios[scenario];

  // Generate SVG Path
  const pathData = current.points.map((p: number, i: number) => {
    const x = getX(i, current.points.length);
    const y = getY(p);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  return (
    <div className="bg-white dark:bg-[#14171B] p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm transition-all duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white font-serif">
          <Activity className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]" /> Payoff Simulator
        </h3>
        <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg mt-4 md:mt-0">
          {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map(key => (
            <button
              key={key}
              onClick={() => setScenario(key)}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                scenario === key ? 'bg-white dark:bg-slate-700 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-[#A8672E] dark:text-[#D08F52] dark:hover:text-[#A8672E] dark:text-[#D08F52]'
              }`}
            >
              {scenarios[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Chart Area */}
        <div className="flex-1 relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto bg-slate-50 dark:bg-black/30 rounded-xl border border-slate-100 dark:border-white/5">
            {/* Grid Lines */}
            {[30, 60, 90, 120].map(y => (
              <line key={y} x1={padding} y1={getY(y)} x2={width-padding} y2={getY(y)} stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="1" strokeDasharray="4 4" />
            ))}

            {/* Barriers */}
            <line x1={padding} y1={getY(105)} x2={width-padding} y2={getY(105)} stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <text x={width-padding-10} y={getY(105)-8} textAnchor="end" className="text-[10px] fill-emerald-600 font-bold uppercase tracking-wider">Autocall (105%)</text>

            <line x1={padding} y1={getY(70)} x2={width-padding} y2={getY(70)} stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <text x={width-padding-10} y={getY(70)-8} textAnchor="end" className="text-[10px] fill-blue-600 font-bold uppercase tracking-wider">Coupon Barrier (70%)</text>

            <line x1={padding} y1={getY(60)} x2={width-padding} y2={getY(60)} stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <text x={width-padding-10} y={getY(60)+15} textAnchor="end" className="text-[10px] fill-rose-600 font-bold uppercase tracking-wider">Knock-In (60%)</text>

            {/* Path */}
            <path d={pathData} fill="none" stroke={current.colors.stroke} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" className="drop-shadow-sm transition-all duration-500 ease-in-out" />

            {/* Data Points */}
            {current.points.map((p, i) => (
              <circle key={i} cx={getX(i, current.points.length)} cy={getY(p)} r="4" className="fill-white dark:fill-[#14171B] stroke-slate-400 dark:stroke-slate-500 stroke-2" />
            ))}
          </svg>
        </div>
        {/* Info Panel */}
        <div className="w-full lg:w-80 space-y-4">
          <div className={`p-4 rounded-xl border-l-4 shadow-sm ${current.colors.bg} ${current.colors.border}`}>
            <h4 className={`font-bold ${current.colors.text}`}>{current.label}</h4>
            <p className={`text-sm opacity-80 mt-1 ${current.colors.text}`}>{current.desc}</p>
          </div>

          <div className="bg-slate-50 dark:bg-black/30 p-4 rounded-xl border border-slate-200 dark:border-white/10">
            <h5 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-3 uppercase tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4" /> Timeline
            </h5>
            <div className="space-y-4 relative pl-2">
              {/* Timeline Line */}
              <div className="absolute top-2 left-[11px] bottom-2 w-0.5 bg-slate-200 dark:bg-white dark:bg-[#0A0D14]/10"></div>
              {current.events.map((e, i) => (
                <div key={i} className="flex gap-3 relative">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 border-2 border-white dark:border-[#14171B] shadow-sm shrink-0 ${current.colors.dot} z-10`}></div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Price: {e.price}%</div>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-tight">{e.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center p-3 rounded-lg font-bold text-sm bg-slate-800 dark:bg-white dark:bg-[#0A0D14] text-white dark:text-slate-900 dark:text-slate-100 shadow-lg">
            Result: {current.outcome}
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-slate-400 dark:text-slate-500 text-center flex justify-center items-center gap-2">
        <CheckCircle className="w-3 h-3" />
        Simulated based on standard market conditions. Past performance is not indicative of future results.
      </p>
    </div>
  );
};
const MathComponent = () => (
  <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl font-mono text-sm md:text-base overflow-x-auto">
    <div className="mb-4 text-slate-400">// The Valuation Formula</div>
    <div className="flex flex-col md:flex-row items-center gap-4">
      <span className="text-2xl text-purple-400 font-bold">V<span className="text-xs align-middle">total</span></span>
      <span className="text-xl">=</span>
      <div className="flex flex-col items-center p-2 bg-slate-800 rounded border border-slate-700">
        <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">V<span className="text-xs">bond</span></span>
        <span className="text-[10px] text-slate-400">Zero Coupon Bond</span>
      </div>
      <span className="text-xl text-[#BC4128] dark:text-[#E2694A]">-</span>
      <div className="flex flex-col items-center p-2 bg-slate-800 rounded border border-slate-700">
        <span className="text-[#BC4128] dark:text-[#E2694A] font-bold">V<span className="text-xs">DIP</span></span>
        <span className="text-[10px] text-slate-400">Down-and-In Put</span>
      </div>
      <span className="text-xl text-[#1D8A70] dark:text-[#3CBF9C]">+</span>
      <div className="flex flex-col items-center p-2 bg-slate-800 rounded border border-slate-700">
        <span className="text-[#A8672E] dark:text-[#D08F52] font-bold">V<span className="text-xs">digitals</span></span>
        <span className="text-[10px] text-slate-400">Digital Options</span>
      </div>
    </div>
    <div className="mt-6 pt-4 border-t border-slate-700 text-slate-300">
      <span className="text-[#BC4128] dark:text-[#E2694A] font-bold">Insight:</span> You are effectively <em>selling</em> insurance (the Put) to fund the purchase of the income stream (Digitals).
    </div>
  </div>
);

// --- Main Page ---
export default function AutocallableGuide() {
  return (
    <ArticleFrame slug="autocallable-strategy-engineered-yield-sideways-markets">
      <InfographicSlot alt="Autocallable Strategy Infographic" />
      
      {/* Intro Stats/Hook */}
      <div className="max-w-6xl mx-auto -mt-16 relative z-20 px-4">
        <div className="bg-white dark:bg-[#14171B] rounded-3xl shadow-xl border border-slate-100 dark:border-white/10 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-white/10">
          <div className="text-center py-4">
            <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Market Context</div>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">"Muddle Through"</div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Optimal when markets are flat or slightly bearish.</p>
          </div>
          <div className="text-center py-4">
            <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Risk Profile</div>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">Short Volatility</div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Profits from the fear premium (IV &gt; RV).</p>
          </div>
          <div className="text-center py-4">
            <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Key Mechanism</div>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">Barrier Options</div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Down-and-In Puts create the "Cliff Risk".</p>
          </div>
        </div>
      </div>

      {/* Section 1: The Architecture (EXPANDED) */}
      <Section title="The Anatomy of an Autocall" subtitle="The four pillars that determine your fate: Return, Income, Risk, and Timing.">
        {/* The 4 Cards Grid - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card 1: Autocall Barrier */}
          <Card title="1. Autocall Barrier (The Ceiling)" icon={TrendingUp} color="emerald">
            <p className="mb-3">Typically set at <strong>100-105%</strong> of the initial price. If the asset is above this line on an observation date, the game ends. You get your principal + coupon, but you <strong>lose any upside participation</strong> beyond that.</p>
            <div className="mt-auto p-3 bg-emerald-100/50 rounded-lg text-sm border border-emerald-100">
              <span className="font-bold text-emerald-800">Pro Tip: Step-Downs</span>
              <p className="text-emerald-800/80 text-xs mt-1">Look for structures where this barrier drops by 5% each year (e.g., 100% &rarr; 95% &rarr; 90%). This increases the chance of early exit (getting your cash back) in a flat market.</p>
            </div>
          </Card>

          {/* Card 2: Coupon Barrier */}
          <Card title="2. Coupon Barrier (The Income)" icon={DollarSign} color="blue">
            <p className="mb-3">The "Money Line". Often set at <strong>60-70%</strong> of the initial price. As long as the asset closes above this line on the observation date, you get paid. If it dips below, no coupon.</p>
            <div className="mt-auto flex items-center gap-2 text-xs font-mono bg-blue-100/50 p-3 rounded-lg border border-blue-100">
              <span className="font-bold text-blue-800">Typical Range:</span>
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#A8672E] dark:bg-[#D08F52] w-[70%]"></div>
              </div>
              <span className="text-blue-800 font-bold">60-70%</span>
            </div>
          </Card>
          {/* Card 3: Knock-In Barrier */}
          <Card title="3. Knock-In Barrier (The Risk)" icon={AlertTriangle} color="rose">
            <p className="mb-3">The "Cliff Edge". Set deep out-of-the-money (e.g., <strong>60%</strong>). If breached, capital protection vanishes. You are now fully exposed to equity losses 1:1.</p>
            <div className="mt-auto space-y-2 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-3 rounded-lg border border-rose-100">
              <div className="text-xs font-bold text-rose-800 mb-1 uppercase tracking-wide">Crucial Distinction</div>
              <div className="flex justify-between text-xs border-b border-rose-200 pb-1">
                <span className="font-bold text-slate-700 dark:text-slate-300">American (Continuous)</span>
                <span className="text-[#BC4128] dark:text-[#E2694A] font-bold">Observed EVERY day. Riskier.</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">European (Maturity)</span>
                <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">Observed ONLY at end. Safer.</span>
              </div>
            </div>
          </Card>

          {/* Card 4: Memory Feature */}
          <Card title="4. Memory Feature (The Safety Net)" icon={Zap} color="violet">
            <p className="mb-3">A retroactive payment feature. If you miss a coupon because the market dipped, it's stored in a "memory bank". If the market recovers later, all missed coupons are paid out at once.</p>
            <div className="mt-auto p-3 bg-violet-100/50 rounded-lg border border-violet-100">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-500">Month 1 (Miss):</span>
                <span className="text-[#BC4128] dark:text-[#E2694A] font-mono">$0</span>
              </div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-500">Month 2 (Miss):</span>
                <span className="text-[#BC4128] dark:text-[#E2694A] font-mono">$0</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold bg-white dark:bg-[#0A0D14] p-2 rounded shadow-sm border border-violet-200">
                <span className="text-[#1D8A70] dark:text-[#3CBF9C]">Month 3 (Recovery):</span>
                <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-mono">$30 (Paid All!)</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Visualizer (Existing) */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#0A0D14] p-1 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <ScenarioVisualizer />
          </div>
        </div>
      </Section>
      {/* NEW: Pros vs Cons Matrix */}
      <Section title="Pros & Cons Analysis" subtitle="A balanced view of why investors use them and where they get burned." className="bg-white dark:bg-black/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pros */}
          <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10/50 dark:bg-emerald-900/10 rounded-2xl p-8 border border-emerald-100 dark:border-[#1D8A70] dark:border-[#3CBF9C]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 font-serif">The Advantages</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">High Yield:</span>
                <span className="text-slate-700 dark:text-slate-300">Offers 8-15% coupons even when interest rates or dividend yields are low (1-3%).</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Defined Buffer:</span>
                <span className="text-slate-700 dark:text-slate-300">Protection against moderate market declines (e.g., market drops 30%, you still get 100% principal).</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Lower Volatility:</span>
                <span className="text-slate-700 dark:text-slate-300">Due to the coupon structure, the note's market value often fluctuates less than the underlying stock (until the barrier is neared).</span>
              </li>
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50 dark:bg-rose-900/10 rounded-2xl p-8 border border-rose-100 dark:border-[#BC4128] dark:border-[#E2694A]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-rose-100 dark:bg-rose-900/30 p-3 rounded-full">
                <XCircle className="w-6 h-6 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]" />
              </div>
              <h3 className="text-2xl font-bold text-rose-900 dark:text-rose-100 font-serif">The Disadvantages</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Capped Upside:</span>
                <span className="text-slate-700 dark:text-slate-300">If the market rallies 50%, you only get your coupon. Opportunity cost is high in bull markets.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Credit Risk:</span>
                <span className="text-slate-700 dark:text-slate-300">You are lending to the bank. If the issuer (e.g., Lehman Brothers) goes bankrupt, you lose everything, regardless of market performance.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Illiquidity:</span>
                <span className="text-slate-700 dark:text-slate-300">Hard to sell before maturity. Secondary market spreads are wide and punitive.</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>
      {/* NEW: Lifecycle Timeline */}
      <div className="bg-slate-50 dark:bg-black/30 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-800 dark:text-white font-serif">Lifecycle of an Autocallable</h2>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-indigo-200 dark:bg-indigo-900/50 transform md:-translate-x-1/2"></div>

            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/2 md:pr-12 md:text-right pl-16 md:pl-0">
                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 font-serif">Trade Date (T=0)</h3>
                <p className="text-slate-600 dark:text-slate-300">Strike prices are set. You deposit cash. The "Zero Coupon Bond" is purchased and Options are sold.</p>
              </div>
              <div className="absolute left-2 md:left-1/2 w-12 h-12 bg-[#A8672E] dark:bg-[#D08F52] dark:bg-[#A8672E] dark:bg-[#D08F52] rounded-full border-4 border-white dark:border-[#14171B] flex items-center justify-center transform md:-translate-x-1/2 z-10">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
              <div className="absolute left-2 md:left-1/2 w-12 h-12 bg-white dark:bg-[#14171B] border-4 border-indigo-200 dark:border-[#A8672E] dark:border-[#D08F52]/50 rounded-full flex items-center justify-center transform md:-translate-x-1/2 z-10">
                <RefreshCcw className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" />
              </div>
              <div className="md:w-1/2 md:pl-12 pl-16 md:pl-0">
                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 font-serif">Observation Dates</h3>
                <p className="text-slate-600 dark:text-slate-300">Quarterly or Monthly checks. <br/>1. Is Price &gt; Autocall? &rarr; <strong>Terminate & Pay.</strong><br/>2. Is Price &gt; Coupon Barrier? &rarr; <strong>Pay Coupon.</strong><br/>3. Else &rarr; <strong>No Pay (Store in Memory).</strong></p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right pl-16 md:pl-0">
                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 font-serif">Maturity (Final Observation)</h3>
                <p className="text-slate-600 dark:text-slate-300">The moment of truth.<br/>- Above Barrier? Full Principal + Coupons.<br/>- Below Barrier? <strong>Physical Delivery of shares.</strong> Realized loss.</p>
              </div>
              <div className="absolute left-2 md:left-1/2 w-12 h-12 bg-indigo-900 dark:bg-indigo-800 rounded-full border-4 border-white dark:border-[#14171B] flex items-center justify-center transform md:-translate-x-1/2 z-10">
                <Unlock className="w-5 h-5 text-white" />
              </div>
              <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
            </div>
          </div>
        </div>
      </div>
      {/* NEW: The Pricing Factors */}
      <Section title="The Hidden Levers: Pricing" subtitle="Why do coupons change? Understanding the two main inputs." className="bg-white dark:bg-black/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-slate-700 dark:text-white font-serif">Interest Rates</h3>
              <Scale className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-white dark:bg-[#0A0D14]/10 rounded-full mb-4 overflow-hidden">
              <div className="h-full bg-[#A8672E] dark:bg-[#D08F52] w-3/4"></div>
            </div>
            <p className="text-slate-600 dark:text-slate-300"><strong>High Rates = Higher Coupons.</strong><br/>When rates are high (e.g., 5%), the Zero Coupon Bond component is cheaper to buy. This leaves <em>more</em> leftover budget to buy derivatives, allowing banks to offer juicy 12%+ yields.</p>
          </div>

          <div className="bg-slate-50 dark:bg-[#14171B] p-6 rounded-2xl border border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-slate-700 dark:text-white font-serif">Volatility (VIX)</h3>
              <BarChart2 className="w-6 h-6 text-[#BC4128] dark:text-[#E2694A]" />
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-white dark:bg-[#0A0D14]/10 rounded-full mb-4 overflow-hidden">
              <div className="h-full bg-[#BC4128] dark:bg-[#E2694A] w-2/3"></div>
            </div>
            <p className="text-slate-600 dark:text-slate-300"><strong>High Volatility = Higher Coupons.</strong><br/>You are <em>selling</em> a Put option. When fear (VIX) is high, Put options are expensive. You get paid more premium for selling them, which translates to a higher coupon yield for you.</p>
          </div>
        </div>
      </Section>

      {/* NEW: The Worst-Of Feature */}
      <div className="bg-amber-50 dark:bg-amber-950/20 py-16 px-4 border-y border-amber-100 dark:border-amber-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-amber-100 dark:bg-amber-900/40 rounded-xl hidden md:block">
              <Layers className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-4 font-serif">The "Worst-Of" Trap (Correlation Risk)</h2>
              <p className="text-lg text-amber-900/80 dark:text-amber-100/80 mb-6">Most modern notes are linked to a basket of 3 stocks (e.g., TSLA, NVDA, AAPL) or indices (SPX, RTY, SX5E). This drastically increases the yield, but also the risk.</p>
              <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl border border-amber-200 dark:border-amber-900/50 shadow-sm">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">How it works:</h4>
                <p className="text-slate-600 dark:text-slate-300 mb-4">Your return is determined solely by the <strong>worst performing asset</strong> in the basket.</p>
                <div className="grid grid-cols-3 gap-2 text-center text-sm font-mono">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C]">AAPL: +10%</div>
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C]">NVDA: +5%</div>
                  <div className="bg-rose-100 dark:bg-rose-900/30 p-2 rounded text-rose-800 dark:text-[#BC4128] dark:text-[#E2694A] border-2 border-[#BC4128] dark:border-[#E2694A]">TSLA: -45%</div>
                </div>
                <p className="mt-4 text-sm text-[#BC4128] dark:text-[#E2694A] font-bold">Result: Even though 2/3 stocks are up, the note breaches the barrier because TSLA is down 45%. You lose capital.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section 2: Under the Hood */}
      <div className="bg-slate-100 dark:bg-black/50 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 font-serif">Decomposing the "Black Box"</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">An autocallable isn't magic; it's a balanced equation. To understand the yield, follow the money. We engineer the return by stripping the product into three distinct financial instruments.</p>
          </div>

          {/* The Financial Engineering Equation Visual */}
          <div className="bg-white dark:bg-[#14171B] rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-white/10 mb-12">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-8 border-b border-slate-100 dark:border-white/10 pb-4 font-serif">The Funding Equation: How 10% Yield is Created</h3>
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              {/* Left: Sources */}
              <div className="flex-1 space-y-4">
                <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Sources of Funds</div>
                
                {/* Principal */}
                <div className="bg-slate-50 dark:bg-black/40 p-4 rounded-xl border border-slate-200 dark:border-white/10 flex justify-between items-center group hover:border-indigo-300 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] rounded-lg">
                      <DollarSign className="w-5 h-5"/>
                    </div>
                    <div>
                      <div className="font-bold text-slate-700 dark:text-slate-300">Investor Principal</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Your initial investment</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-slate-800 dark:text-white">$100.00</div>
                </div>

                {/* Plus Icon */}
                <div className="flex justify-center">
                  <div className="bg-slate-200 dark:bg-slate-800 rounded-full p-1">
                    <Plus className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
                  </div>
                </div>

                {/* The Short Put */}
                <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/10 p-4 rounded-xl border border-rose-100 dark:border-rose-900/30 flex justify-between items-center relative overflow-hidden group hover:shadow-md transition-all">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#BC4128] dark:bg-[#E2694A]"></div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-100 dark:bg-rose-900/30 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] rounded-lg">
                      <TrendingDown className="w-5 h-5"/>
                    </div>
                    <div>
                      <div className="font-bold text-rose-800 dark:text-rose-300">Short Put Premium</div>
                      <div className="text-xs text-[#BC4128] dark:text-[#E2694A]/80 dark:text-[#BC4128] dark:text-[#E2694A]/80">Selling downside risk (The "Engine")</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">+$6.50</div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 flex justify-between items-center">
                  <span className="font-bold text-slate-600 dark:text-slate-300">Total Available Cash</span>
                  <span className="font-mono font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] text-lg">$106.50</span>
                </div>
              </div>
              {/* Center: Arrow */}
              <div className="hidden lg:flex items-center justify-center text-slate-300 dark:text-slate-600 dark:text-slate-400">
                <ArrowRight className="w-8 h-8" />
              </div>

              {/* Right: Uses */}
              <div className="flex-1 space-y-4">
                <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Uses of Funds (Allocations)</div>
                
                {/* Bond */}
                <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 flex justify-between items-center group hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] rounded-lg">
                      <Lock className="w-5 h-5"/>
                    </div>
                    <div>
                      <div className="font-bold text-emerald-900 dark:text-emerald-300">Zero Coupon Bond</div>
                      <div className="text-xs text-[#1D8A70] dark:text-[#3CBF9C]/80 dark:text-[#1D8A70] dark:text-[#3CBF9C]/80">Guarantees $100 back at maturity</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-slate-700 dark:text-slate-300">-$94.00</div>
                </div>

                {/* Minus Icon */}
                <div className="flex justify-center">
                  <div className="bg-slate-200 dark:bg-slate-800 rounded-full p-1">
                    <Plus className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
                  </div>
                </div>

                {/* Digital Option */}
                <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 flex justify-between items-center group hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] rounded-lg">
                      <Zap className="w-5 h-5"/>
                    </div>
                    <div>
                      <div className="font-bold text-blue-900 dark:text-blue-300">Digital Call Structure</div>
                      <div className="text-xs text-[#A8672E] dark:text-[#D08F52]/80 dark:text-[#A8672E] dark:text-[#D08F52]/80">Pays the coupon if barrier holds</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-slate-700 dark:text-slate-300">-$10.50</div>
                </div>

                {/* Bank Fee */}
                <div className="bg-slate-50 dark:bg-[#14171B] p-4 rounded-xl border border-slate-200 dark:border-white/10 flex justify-between items-center opacity-70">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg">
                      <PieChart className="w-5 h-5"/>
                    </div>
                    <div>
                      <div className="font-bold text-slate-700 dark:text-slate-300">Bank Fees/Margin</div>
                      <div className="text-xs text-slate-500 dark:text-slate-500">Issuer profit</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-slate-700 dark:text-slate-300">-$2.00</div>
                </div>
              </div>
            </div>
          </div>
          {/* Component Deep Dive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Component 1 */}
            <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border-t-4 border-[#1D8A70] dark:border-[#3CBF9C] dark:border-[#1D8A70] dark:border-[#3CBF9C] shadow-sm hover:-translate-y-1 transition-transform">
              <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">1. The Anchor</h4>
              <div className="text-xs font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] uppercase tracking-wide mb-3">Zero Coupon Bond</div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">This is the safety belt. The bank takes ~$90-95 of your money and buys a safe bond that will grow back to $100 by maturity. This ensures that—absent a barrier breach—you get your principal back.</p>
            </div>

            {/* Component 2 */}
            <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border-t-4 border-[#BC4128] dark:border-[#E2694A] dark:border-[#BC4128] dark:border-[#E2694A] shadow-sm hover:-translate-y-1 transition-transform">
              <div className="h-12 w-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center mb-4 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">
                <TrendingDown className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">2. The Engine</h4>
              <div className="text-xs font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] uppercase tracking-wide mb-3">Short Put Option</div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">The source of yield. You agree to take ownership of the stock if it crashes (Knock-In). By taking this risk, you "sell" volatility to the bank, generating the cash needed to buy the fancy coupons.</p>
            </div>

            {/* Component 3 */}
            <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl border-t-4 border-[#A8672E] dark:border-[#D08F52] dark:border-[#A8672E] dark:border-[#D08F52] shadow-sm hover:-translate-y-1 transition-transform">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">3. The Payout</h4>
              <div className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wide mb-3">Digital Barrier Options</div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">The feature. The bank uses the cash from the Put to buy a "binary" option. It pays $X if the stock is above Level Y. This creates the "all or nothing" coupon behavior.</p>
            </div>
          </div>

          {/* Math Component reused/integrated */}
          <div className="mt-12">
            <MathComponent />
          </div>
        </div>
      </div>
      {/* Section 3: The Dangerous Feedback Loop */}
      <Section title="The Systemic Risk: Vanna & Volga" subtitle="" className="bg-white dark:bg-black/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 p-8 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/20 rounded-3xl border border-rose-100 dark:border-rose-900/30">
            <h3 className="text-xl font-bold text-rose-800 dark:text-rose-300 mb-4 font-serif">The "Crash Accelerator"</h3>
            <p className="text-rose-900/80 dark:text-rose-100/80 mb-4">When you buy a note, the dealer is on the other side. They are <strong>Long Volatility</strong> at the barrier. </p>
            <p className="text-rose-900/80 dark:text-rose-100/80 mb-4"><strong>Calm Markets:</strong> Dealers sell volatility, suppressing the VIX.</p>
            <p className="text-rose-900/80 dark:text-rose-100/80 font-semibold"><strong>Crash Markets:</strong> As price drops near the barrier, dealers must hedge by SELLING the underlying stock. The more it drops, the more they sell. This creates a feedback loop that accelerated the March 2020 crash.</p>
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-2xl font-bold mb-4 dark:text-white font-serif">Why Markets Feel "Pinned"</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">Trillions of dollars in autocallables act as a gravity well. In normal markets, dealer hedging dampens volatility ("buy the dip, sell the rip"). But when the dam breaks (the Knock-In barrier), that same hedging exacerbates the flood.</p>
            <div className="flex items-center gap-2 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-semibold cursor-pointer hover:underline">
              <span>Read about the "Vanna Trap"</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Section>
      {/* Section 4: Implementation Vehicles */}
      <div className="bg-slate-900 text-slate-300 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 font-serif">Choose Your Vehicle</h2>
            <p className="max-w-2xl mx-auto text-slate-400">Not all autocallables are created equal. Choose between customization, liquidity, or cost efficiency.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Notes */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 relative overflow-hidden group hover:border-[#A8672E] dark:border-[#D08F52] transition-colors">
              <div className="absolute top-0 right-0 p-3 bg-slate-700 rounded-bl-xl text-xs font-bold uppercase tracking-wide">Traditional</div>
              <h3 className="text-xl font-bold text-white mb-2 font-serif">Structured Notes (OTC)</h3>
              <p className="text-sm text-slate-400 mb-6 h-12">Bespoke contracts issued by banks for high-net-worth clients.</p>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5" /> <span>Highly customizable</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5" /> <span>Fixed maturity discipline</span></li>
                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-[#BC4128] dark:text-[#E2694A] mt-0.5" /> <span><strong>Credit Risk (Lehman moment)</strong></span></li>
                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-[#BC4128] dark:text-[#E2694A] mt-0.5" /> <span>Illiquid & Opaque Fees</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" /> <span>Taxed as Ordinary Income</span></li>
              </ul>
              <button className="w-full py-2 rounded-lg bg-slate-700 text-slate-300 text-sm font-semibold">For Institutions</button>
            </div>

            {/* Card 2: ETFs */}
            <div className="bg-slate-800 rounded-2xl p-6 border-2 border-[#A8672E] dark:border-[#D08F52] relative overflow-hidden shadow-2xl shadow-indigo-500/20 transform md:-translate-y-4">
              <div className="absolute top-0 right-0 px-3 py-1 bg-[#A8672E] dark:bg-[#D08F52] text-white rounded-bl-xl text-xs font-bold uppercase tracking-wide">Recommended</div>
              <h3 className="text-xl font-bold text-white mb-2 font-serif">Autocallable ETFs</h3>
              <p className="text-sm text-slate-400 mb-6 h-12">Modern funds like CAIQ or ACII that hold swap ladders.</p>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5" /> <span>Liquid (Trade intraday)</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5" /> <span>Diversified (Laddered tranches)</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5" /> <span>No single-issuer credit risk</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5" /> <span>Potential ROC Tax Benefits</span></li>
                <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" /> <span>Capped upside in bull markets</span></li>
              </ul>
              <button className="w-full py-2 rounded-lg bg-[#A8672E] dark:bg-[#D08F52] hover:bg-[#A8672E] dark:bg-[#D08F52] text-white text-sm font-bold transition-colors">For Most Investors</button>
            </div>
            {/* Card 3: DIY */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 relative overflow-hidden group hover:border-[#1D8A70] dark:border-[#3CBF9C] transition-colors">
              <div className="absolute top-0 right-0 p-3 bg-slate-700 rounded-bl-xl text-xs font-bold uppercase tracking-wide">Expert</div>
              <h3 className="text-xl font-bold text-white mb-2 font-serif">DIY (Jade Lizard)</h3>
              <p className="text-sm text-slate-400 mb-6 h-12">Replicating the payoff using listed options.</p>
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5" /> <span>Lowest Cost (No fees)</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5" /> <span>Section 1256 Tax (60/40)</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5" /> <span>Total Control</span></li>
                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-[#BC4128] dark:text-[#E2694A] mt-0.5" /> <span>High Operational Burden</span></li>
                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-[#BC4128] dark:text-[#E2694A] mt-0.5" /> <span>Imperfect Barrier Replication</span></li>
              </ul>
              <button className="w-full py-2 rounded-lg bg-[#1D8A70] dark:bg-[#3CBF9C]/20 text-[#1D8A70] dark:text-[#3CBF9C] border border-[#1D8A70] dark:border-[#3CBF9C]/50 hover:bg-[#1D8A70] dark:bg-[#3CBF9C]/30 text-sm font-semibold transition-colors">For Traders</button>
            </div>
          </div>
        </div>
      </div>
      {/* Section 5: DIY Tutorial */}
      <Section title="Tutorial: The DIY 'Jade Lizard'" subtitle="Build your own 'Autocallable' note with zero upside risk and high probability of profit." className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-950/20">
        {/* Visualizer for Jade Lizard */}
        <div className="mb-12 bg-white dark:bg-[#14171B] rounded-3xl p-6 md:p-8 shadow-sm border border-indigo-100 dark:border-indigo-900/30">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-2 font-serif">The Payoff Diagram</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm">Unlike a standard Short Strangle where you have unlimited loss on both sides, the Jade Lizard creates a "risk-free" zone to the upside. As long as your <strong>Total Credit &gt; Call Spread Width</strong>, you cannot lose money on a rally.</p>
              <div className="relative h-64 w-full bg-slate-50 dark:bg-[#1A1D24] rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden">
                {/* Custom SVG Payoff */}
                <svg viewBox="0 0 400 250" className="w-full h-full">
                  {/* Zero Line */}
                  <line x1="0" y1="180" x2="400" y2="180" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" className="dark:stroke-slate-700" />
                  <text x="10" y="175" className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono">P/L = $0</text>

                  {/* Payoff Line */}
                  <polyline points="0,250 100,50 250,50 300,150 400,150" fill="none" stroke="#4f46e5" strokeWidth="4" strokeLinejoin="round" className="dark:stroke-indigo-400" />

                  {/* Zones */}
                  <circle cx="100" cy="50" r="6" className="fill-indigo-600 dark:fill-indigo-400" />
                  <text x="80" y="40" className="text-[10px] fill-indigo-800 dark:fill-indigo-300 font-bold">Short Put</text>

                  <circle cx="250" cy="50" r="6" className="fill-indigo-600 dark:fill-indigo-400" />
                  <text x="230" y="40" className="text-[10px] fill-indigo-800 dark:fill-indigo-300 font-bold">Short Call</text>

                  <circle cx="300" cy="150" r="6" className="fill-emerald-500 dark:fill-emerald-400" />
                  <text x="280" y="200" className="text-[10px] fill-emerald-700 dark:fill-emerald-400 font-bold">Long Call</text>

                  {/* Annotation: The Profit Trap */}
                  <rect x="110" y="60" width="130" height="110" fill="url(#diagonal-stripes)" opacity="0.1" />
                  <text x="175" y="110" textAnchor="middle" className="text-xs fill-indigo-900 dark:fill-indigo-300 font-bold">"The Income Zone"</text>

                  {/* Annotation: The Safety Net */}
                  <text x="350" y="140" textAnchor="middle" className="text-[10px] fill-emerald-600 dark:fill-emerald-400 font-bold">Guaranteed Profit</text>
                  <text x="350" y="152" textAnchor="middle" className="text-[9px] fill-slate-500 dark:fill-slate-400">(Credit - Width)</text>

                  {/* Defs for pattern */}
                  <defs>
                    <pattern id="diagonal-stripes" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" stroke="#4f46e5" strokeWidth="1" className="dark:stroke-indigo-400" />
                    </pattern>
                  </defs>
                </svg>
              </div>
            </div>
            {/* Rules Box */}
            <div className="w-full md:w-1/3 bg-indigo-900 dark:bg-indigo-950 text-indigo-100 p-6 rounded-2xl border border-transparent dark:border-indigo-800/50">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" /> Golden Rules
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-2">
                  <span className="font-bold text-yellow-400">1.</span>
                  <span><strong>High IV Rank (&gt;30):</strong> You need expensive premiums to fund the trade.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-yellow-400">2.</span>
                  <span><strong>Total Credit &gt; Call Spread Width:</strong> This is non-negotiable. It ensures zero upside risk.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-yellow-400">3.</span>
                  <span><strong>45 DTE:</strong> Ideal timeframe to capture theta decay while minimizing gamma risk.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white font-serif">Construction Manual</h3>
            <div className="flex gap-4 p-4 bg-white dark:bg-[#14171B] rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] shrink-0">1</div>
              <div>
                <h5 className="font-bold text-slate-800 dark:text-white">The Funding Leg (Short Put)</h5>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Sell a Put at roughly <strong>30 Delta</strong>. This defines your "Knock-In" level. If stock stays above this, you keep all profit.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-white dark:bg-[#14171B] rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] shrink-0">2</div>
              <div>
                <h5 className="font-bold text-slate-800 dark:text-white">The Ceiling (Short Call)</h5>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Sell a Call at roughly <strong>30 Delta</strong>. This caps your upside but adds significant premium to the pot.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-white dark:bg-[#14171B] rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] shrink-0">3</div>
              <div>
                <h5 className="font-bold text-slate-800 dark:text-white">The Protection (Long Call)</h5>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Buy a Call roughly $2 to $5 higher than your Short Call. This creates the "Spread". <br/><span className="text-xs text-[#BC4128] dark:text-[#E2694A] font-bold mt-1 block">CRITICAL: The cost of this wing must be less than the extra credit you received.</span></p>
              </div>
            </div>
          </div>
          {/* Live Example Calculation */}
          <div className="bg-slate-800 text-slate-300 rounded-3xl p-8 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign className="w-32 h-32" />
            </div>
            <h4 className="text-white text-lg font-bold mb-6 border-b border-slate-700 pb-2">Real-World Math: $XYZ @ $100</h4>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-[#BC4128] dark:text-[#E2694A]">SELL Put (Strike $95)</span>
                <span className="text-white">+$2.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#BC4128] dark:text-[#E2694A]">SELL Call (Strike $105)</span>
                <span className="text-white">+$2.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#1D8A70] dark:text-[#3CBF9C]">BUY Call (Strike $108)</span>
                <span className="text-white">-$0.80</span>
              </div>
              <div className="h-px bg-slate-600 my-2"></div>
              <div className="flex justify-between items-center font-bold text-base">
                <span className="text-[#A8672E] dark:text-[#D08F52]">Total Net Credit</span>
                <span className="text-white">$3.70</span>
              </div>
              <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="text-xs text-slate-400 uppercase font-bold mb-2">Stress Test: Massive Rally to $200</div>
                <div className="flex justify-between">
                  <span>Loss on Call Spread ($108 - $105):</span>
                  <span className="text-[#BC4128] dark:text-[#E2694A]">-$3.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Credit Kept:</span>
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C]">+$3.70</span>
                </div>
                <div className="h-px bg-slate-500 my-1"></div>
                <div className="flex justify-between font-bold text-white">
                  <span>Net Profit:</span>
                  <span>+$0.70</span>
                </div>
              </div>
              <p className="text-xs text-center text-slate-500 mt-2">*You make money even if you are wrong about the rally.</p>
            </div>
          </div>
        </div>
        {/* Management Strategy */}
        <div className="mt-12 pt-12 border-t border-indigo-200 dark:border-indigo-900/30">
          <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-6 text-center font-serif">How to Manage the Trade</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl border-l-4 border-[#1D8A70] dark:border-[#3CBF9C] shadow-sm">
              <h5 className="font-bold text-slate-800 dark:text-white mb-2">Scenario A: Sideways</h5>
              <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Action:</strong> Do nothing. Let Theta (time decay) eat the value of the options you sold. Close at 50% max profit.</p>
            </div>
            <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl border-l-4 border-amber-500 shadow-sm">
              <h5 className="font-bold text-slate-800 dark:text-white mb-2">Scenario B: Rally</h5>
              <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Action:</strong> Celebrate. You have no risk. The Call Spread will lose value, but the Put goes to zero. You keep the difference.</p>
            </div>
            <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl border-l-4 border-[#BC4128] dark:border-[#E2694A] shadow-sm">
              <h5 className="font-bold text-slate-800 dark:text-white mb-2">Scenario C: Crash</h5>
              <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Action:</strong> Roll the Call Spread down. Since the stock dropped, the Calls are worthless. Buy them back cheap, and sell new ones closer to the stock price to collect more credit.</p>
            </div>
          </div>
        </div>
      </Section>
    </ArticleFrame>
  );
}