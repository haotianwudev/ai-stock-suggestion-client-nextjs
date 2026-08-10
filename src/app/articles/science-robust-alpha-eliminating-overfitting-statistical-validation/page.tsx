'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, AlertTriangle, CheckCircle, Brain, Target, Shield, FlaskConical, Lightbulb, TrendingUp, Cpu, ChevronRight, Info, BarChart3, Binary, Layers, Search, GraduationCap, History, Settings, Database, Activity, Code, Terminal, FunctionSquare, ArrowRightLeft, Gauge, Zap, Globe, Waves, ZapOff, Scale, Stethoscope, Filter, LineChart, FileSearch, Music } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

/**
 * --- ROBUST MATH COMPONENT ---
 * Renders raw text as a fallback and upgrades to KaTeX once loaded.
 */
interface LatexProps {
  formula: string;
  displayMode?: boolean;
}

const Latex: React.FC<LatexProps> = ({ formula, displayMode = false }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const renderMath = () => {
      if ((window as any).katex && containerRef.current) {
        try {
          (window as any).katex.render(formula, containerRef.current, {
            throwOnError: false,
            displayMode: displayMode,
            minRuleThickness: 0.05,
          });
          setRendered(true);
        } catch (e) {
          console.error("Math rendering error", e);
        }
      }
    };

    renderMath();
    const interval = setInterval(() => {
      if ((window as any).katex && !rendered) {
        renderMath();
        if ((window as any).katex) clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [formula, displayMode, rendered]);

  return (
    <span 
      ref={containerRef} 
      className={`${!rendered ? "font-mono italic text-[#A8672E] dark:text-[#D08F52]/50" : ""} max-w-full overflow-hidden inline-block align-middle`}
    >
      {!rendered && (displayMode ? `\\[ ${formula} \\]` : `\\( ${formula} \\)`)}
    </span>
  );
};

/**
 * --- MATH BLOCK CONTAINER ---
 * Uses adaptive font sizing to prevent overflow/scrollbars.
 */
interface MathDisplayProps {
  formula: string;
  label?: string;
}

const MathDisplay: React.FC<MathDisplayProps> = ({ formula, label }) => (
  <div className="w-full my-6 flex flex-col items-center">
    {label && (
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8672E] dark:text-[#D08F52] mb-3">
        {label}
      </span>
    )}
    <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50 border border-blue-100 rounded-3xl p-6 md:p-8 w-full max-w-full flex justify-center shadow-inner overflow-hidden">
      <div className="text-sm sm:text-base md:text-xl lg:text-2xl text-[#A8672E] dark:text-[#D08F52] max-w-full text-center">
        <Latex formula={formula} displayMode={true} />
      </div>
    </div>
  </div>
);

/** --- UI COMPONENTS --- */
interface ModuleSectionProps {
  children: React.ReactNode;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'indigo' | 'amber' | 'rose' | 'emerald' | 'purple' | 'yellow';
  id?: string;
}

const ModuleSection: React.FC<ModuleSectionProps> = ({ children, title, icon: Icon, color, id }) => {
  const colorMap = {
    blue: "bg-[#A8672E] dark:bg-[#D08F52] shadow-blue-200",
    indigo: "bg-[#A8672E] dark:bg-[#D08F52] shadow-indigo-200",
    amber: "bg-amber-500 shadow-amber-200",
    rose: "bg-[#BC4128] dark:bg-[#E2694A] shadow-rose-200",
    emerald: "bg-[#1D8A70] dark:bg-[#3CBF9C] shadow-emerald-200",
    purple: "bg-purple-600 shadow-purple-200",
    yellow: "bg-yellow-400 shadow-yellow-200"
  };

  return (
    <section id={id} className="py-20 border-b border-gray-100 last:border-0">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center gap-4 mb-10">
          <div className={`${colorMap[color]} p-3 rounded-2xl text-white`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Tutorial Module
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight font-serif">
              {title}
            </h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};

interface GridBoxProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  theme?: 'light' | 'dark';
}

const GridBox: React.FC<GridBoxProps> = ({ children, title, icon: Icon, className = "", theme = "light" }) => (
  <div className={`rounded-3xl p-8 transition-all duration-300 ${
    theme === 'light' 
      ? 'bg-white dark:bg-[#0A0D14] border border-gray-100 shadow-sm hover:shadow-md' 
      : 'bg-slate-900 text-white shadow-2xl'
  } ${className}`}>
    {title && (
      <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
        theme === 'light' ? 'text-gray-800' : 'text-[#A8672E] dark:text-[#D08F52]'
      }`}>
        {Icon && <Icon className="w-5 h-5" />}
        {title}
      </h3>
    )}
    <div className={`${
      theme === 'light' ? 'text-gray-600' : 'text-slate-400'
    } text-sm leading-relaxed`}>
      {children}
    </div>
  </div>
);

interface StyledTableProps {
  headers: string[];
  rows: string[][];
  title?: string;
  dark?: boolean;
}

const StyledTable: React.FC<StyledTableProps> = ({ headers, rows, title, dark = false }) => (
  <div className={`my-10 overflow-hidden rounded-2xl border ${
    dark ? 'border-slate-700 bg-slate-800 text-white' : 'border-gray-200 bg-white dark:bg-[#0A0D14] shadow-sm'
  }`}>
    {title && (
      <div className={`px-6 py-4 border-b font-bold ${
        dark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200 text-gray-800'
      }`}>
        {title}
      </div>
    )}
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className={dark ? 'bg-slate-900/50' : 'bg-gray-100/50'}>
            {headers.map((h, i) => (
              <th key={i} className={`p-4 text-[10px] font-bold uppercase tracking-wider border-b ${
                dark ? 'border-slate-700 text-slate-400' : 'border-gray-200 text-gray-500'
              }`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y ${dark ? 'divide-slate-700' : 'divide-gray-100'}`}>
          {rows.map((row, i) => (
            <tr key={i} className={dark ? 'hover:bg-slate-700/50' : 'hover:bg-[#A8672E]/10 dark:bg-[#D08F52]/10/30'}>
              {row.map((cell, j) => (
                <td key={j} className="p-4 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: cell }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/** --- MAIN APPLICATION --- */
export default function ScienceRobustAlpha() {
  useEffect(() => {
    // Load KaTeX CSS
    if (!document.getElementById('katex-css')) {
      const link = document.createElement('link');
      link.id = 'katex-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css';
      document.head.appendChild(link);
    }

    // Load KaTeX JS
    if (!(window as any).katex) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <ArticleFrame slug="science-robust-alpha-eliminating-overfitting-statistical-validation">
      <div className="max-w-4xl mx-auto mb-16 space-y-8">
        <InfographicSlot alt="The Science of Robust Alpha Infographic 1" />
        <InfographicSlot src="https://i.imgur.com/4vYMkDI.jpeg" alt="The Science of Robust Alpha Infographic 2" />
      </div>

      {/* Module 1: The Paradigm */}
      <ModuleSection title="I. The Financial ML Paradigm" icon={BookOpen} color="blue">
        <div className="space-y-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-serif">Finance: The "Final Boss" of Machine Learning</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Standard Machine Learning (SML) was designed for static environments. <strong>Financial Machine Learning (FML)</strong> operates in a non-cooperative, adversarial environment where prediction changes the outcome.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-[#A8672E] dark:text-[#D08F52] font-bold text-sm bg-[#A8672E]/10 dark:bg-[#D08F52]/10 px-4 py-2 rounded-full">
                  <ArrowRightLeft className="w-4 h-4" /> Adversarial
                </div>
                <div className="flex items-center gap-2 text-[#A8672E] dark:text-[#D08F52] font-bold text-sm bg-[#A8672E]/10 dark:bg-[#D08F52]/10 px-4 py-2 rounded-full">
                  <Globe className="w-4 h-4" /> Global Scale
                </div>
                <div className="flex items-center gap-2 text-purple-600 font-bold text-sm bg-purple-50 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4" /> Latency Sensitive
                </div>
              </div>
            </div>
            <GridBox theme="dark" className="border-slate-800">
              <h4 className="text-[#A8672E] dark:text-[#D08F52] font-bold mb-4 uppercase tracking-widest text-xs">
                <Activity className="w-4 h-4" /> The Core Conflict
              </h4>
              <p className="text-slate-300 italic mb-4">
                "In computer vision, the cat does not turn into a dog because you identified it. In finance, identify a pattern and it reacts and disappears."
              </p>
              <div className="h-1 w-20 bg-[#A8672E] dark:bg-[#D08F52] rounded-full" />
            </GridBox>
          </div>

          <div className="p-8 bg-white dark:bg-[#0A0D14] rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-6 text-xl">Standard ML vs. Financial ML</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Feature</th>
                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[#A8672E] dark:text-[#D08F52]">Standard ML</th>
                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[#A8672E] dark:text-[#D08F52]">Financial ML</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    ["Data Nature", "IID (Independent/Identical)", "Non-IID, Autocorrelated"],
                    ["SNR", "High (Signal > Noise)", "Extreme Low (Noise > Signal)"],
                    ["Environment", "Passive / Static", "Adversarial / Reflexive"],
                    ["Primary Goal", "Accuracy", "Sharpe Ratio"],
                    ["Overfitting", "A common risk", "The fundamental default state"]
                  ].map((row, i) => (
                    <tr key={i} className="group">
                      <td className="py-4 text-sm font-bold text-slate-500">{row[0]}</td>
                      <td className="py-4 text-sm text-slate-700 dark:text-slate-300">{row[1]}</td>
                      <td className="py-4 text-sm text-slate-900 font-medium group-hover:text-[#A8672E] dark:text-[#D08F52] transition-colors">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <GridBox title="The IID Failure" icon={Layers} className="lg:col-span-2">
              <p className="mb-4">Most ML algorithms assume samples are <strong>Independent and Identically Distributed (IID)</strong>. In finance:</p>
              <ul className="space-y-3 list-disc pl-5">
                <li><strong>Dependency:</strong> Price at <Latex formula="t" /> depends on <Latex formula="t-1" /> (Serial Correlation).</li>
                <li><strong>Non-Identical:</strong> Distributions <Latex formula="P(X)" /> drift constantly.</li>
              </ul>
            </GridBox>
            <div className="space-y-6">
              <div className="bg-[#A8672E] dark:bg-[#D08F52] rounded-[2.5rem] p-8 text-white shadow-xl">
                <Gauge className="w-10 h-10 mb-4 text-[#A8672E] dark:text-[#D08F52]" />
                <h4 className="font-bold text-xl mb-2 text-white">Alpha Decay</h4>
                <p className="text-xs text-[#A8672E] dark:text-[#D08F52] leading-relaxed">Shelf-life is measured in weeks. Requires Regime Detection.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-slate-400 uppercase text-center text-xs tracking-[0.3em]">The Optimization Trap</h4>
            <MathDisplay 
              label="The Inherent Noise Floor"
              formula={"SNR = \\frac{\\text{Alpha (True Edge)}}{\\text{Volatility (Noise)}} < \\text{Threshold}_{ML}"} 
            />
          </div>
        </div>
      </ModuleSection>

      {/* Module 2: The Data Singularity */}
      <ModuleSection title="II. The Data Singularity" icon={AlertTriangle} color="amber" id="singularity">
        <div className="space-y-16">
          <div className="max-w-3xl">
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Low signal, unstable dynamics, and extreme scarcity create a "Perfect Storm" for overfitting.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 font-serif">The SNR Hurricane</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                SNR is often below 0.05. Powerful models mistake the hurricane for the whisper.
              </p>
            </div>
            <div className="space-y-4">
              <MathDisplay 
                label="Information Complexity"
                formula={"SNR = \\frac{\\sigma_{signal}^2}{\\sigma_{noise}^2} \\approx \\text{Whisper} \\div \\text{Jet Engine}"} 
              />
            </div>
          </div>

          <div className="p-8 md:p-12 bg-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-8 text-amber-400 font-serif">Deep Dive: The Stationarity-Memory Dilemma</h3>
              <div className="grid lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3 space-y-6">
                  <p className="text-slate-300 leading-relaxed">
                    Integer differencing (<Latex formula="d=1" />) creates stationarity but destroys memory.
                  </p>
                  <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 text-amber-400 text-center">
                    <Latex formula={"\\Delta^d X_t = \\sum_{k=0}^{\\infty} w_k(d) X_{t-k}"} displayMode={true} />
                    <p className="text-xs text-slate-500 mt-4">
                      Fractional Differencing preserves memory while achieving stationarity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModuleSection>

      {/* Module 3: Implementation: Labeling */}
      <ModuleSection title="III. Implementation: Labeling" icon={FunctionSquare} color="indigo" id="labeling">
        <div className="space-y-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 leading-tight font-serif">Beyond Binary Returns</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Traditional "sign-based" labeling ignores the path. Elite quants use dynamic barriers that account for risk and time-decay.
              </p>
              <div className="flex gap-4">
                <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 px-4 py-2 rounded-xl text-[#A8672E] dark:text-[#D08F52] font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" /> Path Dependent
                </div>
                <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 px-4 py-2 rounded-xl text-[#A8672E] dark:text-[#D08F52] font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Noise Filter
                </div>
              </div>
            </div>
            <GridBox title="The Dynamic Stop" icon={Activity} className="border-indigo-100 bg-[#A8672E]/10 dark:bg-[#D08F52]/10/20">
              <p className="text-sm">
                Barriers should be scaled by <strong>trailing volatility</strong> (<Latex formula="\\sigma_t" />). This ensures the model isn't "shaken out" by normal market noise.
              </p>
            </GridBox>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#A8672E] dark:bg-[#D08F52]/10 blur-[100px]" />
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-black mb-6 text-[#A8672E] dark:text-[#D08F52] tracking-tight font-serif">Triple Barrier Method</h3>
                <ul className="space-y-6">
                  {[
                    { t: "Upper Barrier (pt)", d: "Profit Target reached (+1 label)", c: "border-indigo-500", val: "y_t = 1" },
                    { t: "Lower Barrier (sl)", d: "Stop Loss triggered (-1 label)", c: "border-rose-500", val: "y_t = -1" },
                    { t: "Vertical Barrier (td)", d: "Time limit exceeded (0 label)", c: "border-slate-500", val: "y_t = 0" }
                  ].map((item, i) => (
                    <li key={i} className={`border-l-4 pl-6 ${item.c} p-2 rounded-r-xl`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white">{item.t}</span>
                        <code className="text-[10px] text-[#A8672E] dark:text-[#D08F52] bg-[#A8672E] dark:bg-[#D08F52]/50 px-2 py-0.5 rounded">{item.val}</code>
                      </div>
                      <span className="text-sm text-slate-400">{item.d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-2xl p-6 font-mono text-xs text-[#A8672E] dark:text-[#D08F52] border border-slate-700">
                  <span className="text-slate-500 block mb-4 border-b border-slate-700 pb-2">
                    <Terminal className="w-4 h-4 inline mr-2" /> triple_barrier.py
                  </span>
                  <code>
                    {`# Implementation Logic
for t in timestamps:
    if price[t+h] > pt_level: return 1
    if price[t+h] < sl_level: return -1
    if h > time_limit: return 0`}
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 font-serif">Meta-Labeling: The Master Stroke</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Introducing a "Secondary Model" that asks: <em>"Given the current context, should I follow the Primary signal?"</em>
              </p>
              <div className="p-6 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-3xl border border-blue-100">
                <h4 className="font-bold text-[#A8672E] dark:text-[#D08F52] text-sm mb-2 text-[#A8672E] dark:text-[#D08F52]">The Binary Choice</h4>
                <p className="text-xs text-[#A8672E] dark:text-[#D08F52]/70">
                  Predicts binary 0 or 1: <strong>Pass</strong> or <strong>Trade</strong>.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <GridBox title="The Workflow" icon={Layers} className="bg-white dark:bg-[#0A0D14] border-slate-200 dark:border-slate-800">
                <ol className="space-y-4">
                  {[
                    { s: "1. Primary Signal", d: "Generate a 'Side' (+1 or -1)." },
                    { s: "2. Outcome Test", d: "Run signal through Triple Barrier." },
                    { s: "3. Secondary Label", d: "1 if Primary won, 0 if it lost." },
                    { s: "4. Training", d: "Train ML model to predict these labels." }
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4 group">
                      <span className="text-[#A8672E] dark:text-[#D08F52] font-black text-lg">{i + 1}</span>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        <strong>{step.s}:</strong> {step.d}
                      </p>
                    </li>
                  ))}
                </ol>
              </GridBox>
            </div>
          </div>
        </div>
      </ModuleSection>

      {/* Module 4: Detection & Statistical Armor */}
      <ModuleSection title="IV. Detection & Statistical Armor" icon={Shield} color="rose" id="armor">
        <div className="space-y-12">
          <div className="max-w-3xl">
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Backtests are often "mirages." Statistical Armor is required to deflate performance claims.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 font-serif">Deflating the Sharpe Ratio</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The <strong>Deflated Sharpe Ratio (DSR)</strong> corrects for selection bias and non-normal returns.
              </p>
              <GridBox className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border-rose-100">
                <h4 className="font-bold text-[#BC4128] dark:text-[#E2694A] mb-2">The Multi-Testing Sinkhole</h4>
                <p className="text-sm text-[#BC4128] dark:text-[#E2694A]/80">
                  If you test 100 random noise signals, one will look good. DSR adjusts for this luck.
                </p>
              </GridBox>
            </div>
            <div className="space-y-6">
              <MathDisplay 
                label="The DSR Probability"
                formula={"DSR = P[SR > SR^* \\mid N, T, \\gamma, \\kappa]"} 
              />
            </div>
          </div>

          <div className="p-8 md:p-12 bg-white dark:bg-[#0A0D14] rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2 font-serif">
                  <FileSearch className="w-6 h-6 text-[#BC4128] dark:text-[#E2694A]" /> Feature Importance: MDA vs MDI
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  Avoid the <strong>MDI Trap</strong> (In-Sample). Use <strong>Mean Decrease Accuracy (MDA)</strong> (Out-of-Sample) to find true signals.
                </p>
              </div>
              <div className="lg:col-span-7">
                <StyledTable 
                  title="Importance Methods Comparison"
                  headers={["Method", "Context", "Risk", "Decision"]}
                  rows={[
                    ["MDI (Impurity)", "In-Sample", "Massive Overfitting", "❌ Avoid"],
                    ["MDA (Accuracy)", "Out-of-Sample", "Computationally Expensive", "✅ Standard"],
                    ["SFI (Single Feature)", "Cross-Sectional", "Ignore Interactions", "⚠️ Supporting"],
                    ["Shapley Values", "Local/Global", "Interpretable but slow", "✅ Advanced"]
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 font-serif">Elastic Net Shield</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Regularization penalizes large weights to force model humility.
              </p>
            </div>
            <div className="space-y-4">
              <MathDisplay 
                label="The Regularization Objective"
                formula={"Loss = \\text{Error} + \\lambda_1 \\sum |\\beta| + \\lambda_2 \\sum \\beta^2"} 
              />
            </div>
          </div>

          <GridBox theme="dark" title="The Industrial Validation Pipeline" icon={LineChart}>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { s: "1. Purge", d: "Remove overlapping training samples." },
                { s: "2. Embargo", d: "Add buffer period after test set." },
                { s: "3. CPCV", d: "Test all Train/Test paths." }
              ].map((step, i) => (
                <div key={i} className="p-4 border border-slate-700 rounded-2xl">
                  <span className="text-[#A8672E] dark:text-[#D08F52] font-bold text-xs uppercase mb-2 block">{step.s}</span>
                  <p className="text-xs text-slate-400">{step.d}</p>
                </div>
              ))}
            </div>
          </GridBox>
        </div>
      </ModuleSection>

    </ArticleFrame>
  );
}