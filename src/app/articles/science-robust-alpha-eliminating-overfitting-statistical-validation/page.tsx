'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, AlertTriangle, CheckCircle, Brain, Target, Shield, FlaskConical, Lightbulb, TrendingUp, Cpu, ChevronRight, Info, BarChart3, Binary, Layers, Search, GraduationCap, History, Settings, Database, Activity, Code, Terminal, FunctionSquare, ArrowRightLeft, Gauge, Zap, Globe, Waves, ZapOff, Scale, Stethoscope, Filter, LineChart, FileSearch, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';
import { Maximize2 } from 'lucide-react';

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
      className={`${!rendered ? "font-mono italic text-blue-500/50" : ""} max-w-full overflow-hidden inline-block align-middle`}
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
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-3">
        {label}
      </span>
    )}
    <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 md:p-8 w-full max-w-full flex justify-center shadow-inner overflow-hidden">
      <div className="text-sm sm:text-base md:text-xl lg:text-2xl text-blue-900 max-w-full text-center">
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
    blue: "bg-blue-600 shadow-blue-200",
    indigo: "bg-indigo-600 shadow-indigo-200",
    amber: "bg-amber-500 shadow-amber-200",
    rose: "bg-rose-500 shadow-rose-200",
    emerald: "bg-emerald-500 shadow-emerald-200",
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
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
      ? 'bg-white border border-gray-100 shadow-sm hover:shadow-md' 
      : 'bg-slate-900 text-white shadow-2xl'
  } ${className}`}>
    {title && (
      <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
        theme === 'light' ? 'text-gray-800' : 'text-blue-400'
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
    dark ? 'border-slate-700 bg-slate-800 text-white' : 'border-gray-200 bg-white shadow-sm'
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
            <tr key={i} className={dark ? 'hover:bg-slate-700/50' : 'hover:bg-blue-50/30'}>
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const currentArticle = articles.find(article => article.slug === 'science-robust-alpha-eliminating-overfitting-statistical-validation');

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

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug || 'science-robust-alpha-eliminating-overfitting-statistical-validation'} 
          />
        </>
      )}

      {/* Progress Line */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-gray-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500" 
          style={{ width: `${scrollProgress}%` }} 
        />
      </div>

      {/* Return to Home Button */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Hero Header */}
      <header className="relative py-24 md:py-32 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-100/30 skew-x-12 transform origin-top translate-x-32" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 text-white font-bold text-xs uppercase tracking-widest mb-8">
            <GraduationCap className="w-4 h-4" /> Comprehensive ML Masterclass
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-6 leading-[1.1]">
            The Science of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Robust Alpha
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed">
            Eliminating overfitting through rigorous statistical validation and technical signal extraction.
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
            src="https://i.imgur.com/N9P4ssC.jpeg" 
            alt="The Science of Robust Alpha Infographic" 
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
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img 
            src="https://i.imgur.com/4vYMkDI.jpeg" 
            alt="The Science of Robust Alpha Infographic" 
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
        src="https://i.imgur.com/N9P4ssC.jpeg"
        alt="The Science of Robust Alpha Infographic"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      {/* Module 1: The Paradigm */}
      <ModuleSection title="I. The Financial ML Paradigm" icon={BookOpen} color="blue">
        <div className="space-y-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800">Finance: The "Final Boss" of Machine Learning</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Standard Machine Learning (SML) was designed for static environments. <strong>Financial Machine Learning (FML)</strong> operates in a non-cooperative, adversarial environment where prediction changes the outcome.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-full">
                  <ArrowRightLeft className="w-4 h-4" /> Adversarial
                </div>
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 px-4 py-2 rounded-full">
                  <Globe className="w-4 h-4" /> Global Scale
                </div>
                <div className="flex items-center gap-2 text-purple-600 font-bold text-sm bg-purple-50 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4" /> Latency Sensitive
                </div>
              </div>
            </div>
            <GridBox theme="dark" className="border-slate-800">
              <h4 className="text-blue-400 font-bold mb-4 uppercase tracking-widest text-xs">
                <Activity className="w-4 h-4" /> The Core Conflict
              </h4>
              <p className="text-slate-300 italic mb-4">
                "In computer vision, the cat does not turn into a dog because you identified it. In finance, identify a pattern and it reacts and disappears."
              </p>
              <div className="h-1 w-20 bg-blue-600 rounded-full" />
            </GridBox>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <h4 className="font-bold text-slate-800 mb-6 text-xl">Standard ML vs. Financial ML</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-slate-400">Feature</th>
                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-blue-600">Standard ML</th>
                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-indigo-600">Financial ML</th>
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
                      <td className="py-4 text-sm text-slate-700">{row[1]}</td>
                      <td className="py-4 text-sm text-slate-900 font-medium group-hover:text-indigo-600 transition-colors">{row[2]}</td>
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
              <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl">
                <Gauge className="w-10 h-10 mb-4 text-indigo-300" />
                <h4 className="font-bold text-xl mb-2 text-white">Alpha Decay</h4>
                <p className="text-xs text-indigo-100 leading-relaxed">Shelf-life is measured in weeks. Requires Regime Detection.</p>
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
            <p className="text-xl text-slate-600 leading-relaxed">
              Low signal, unstable dynamics, and extreme scarcity create a "Perfect Storm" for overfitting.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900">The SNR Hurricane</h3>
              <p className="text-slate-600 leading-relaxed">
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
              <h3 className="text-3xl font-black mb-8 text-amber-400">Deep Dive: The Stationarity-Memory Dilemma</h3>
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
              <h3 className="text-3xl font-black text-slate-900 leading-tight">Beyond Binary Returns</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Traditional "sign-based" labeling ignores the path. Elite quants use dynamic barriers that account for risk and time-decay.
              </p>
              <div className="flex gap-4">
                <div className="bg-indigo-50 px-4 py-2 rounded-xl text-indigo-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" /> Path Dependent
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-xl text-blue-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Noise Filter
                </div>
              </div>
            </div>
            <GridBox title="The Dynamic Stop" icon={Activity} className="border-indigo-100 bg-indigo-50/20">
              <p className="text-sm">
                Barriers should be scaled by <strong>trailing volatility</strong> (<Latex formula="\\sigma_t" />). This ensures the model isn't "shaken out" by normal market noise.
              </p>
            </GridBox>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px]" />
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-black mb-6 text-indigo-300 tracking-tight">Triple Barrier Method</h3>
                <ul className="space-y-6">
                  {[
                    { t: "Upper Barrier (pt)", d: "Profit Target reached (+1 label)", c: "border-indigo-500", val: "y_t = 1" },
                    { t: "Lower Barrier (sl)", d: "Stop Loss triggered (-1 label)", c: "border-rose-500", val: "y_t = -1" },
                    { t: "Vertical Barrier (td)", d: "Time limit exceeded (0 label)", c: "border-slate-500", val: "y_t = 0" }
                  ].map((item, i) => (
                    <li key={i} className={`border-l-4 pl-6 ${item.c} p-2 rounded-r-xl`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white">{item.t}</span>
                        <code className="text-[10px] text-indigo-400 bg-indigo-900/50 px-2 py-0.5 rounded">{item.val}</code>
                      </div>
                      <span className="text-sm text-slate-400">{item.d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-2xl p-6 font-mono text-xs text-indigo-200 border border-slate-700">
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
              <h3 className="text-2xl font-bold text-slate-900">Meta-Labeling: The Master Stroke</h3>
              <p className="text-slate-600 leading-relaxed">
                Introducing a "Secondary Model" that asks: <em>"Given the current context, should I follow the Primary signal?"</em>
              </p>
              <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                <h4 className="font-bold text-blue-900 text-sm mb-2 text-blue-900">The Binary Choice</h4>
                <p className="text-xs text-blue-800/70">
                  Predicts binary 0 or 1: <strong>Pass</strong> or <strong>Trade</strong>.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <GridBox title="The Workflow" icon={Layers} className="bg-white border-slate-200">
                <ol className="space-y-4">
                  {[
                    { s: "1. Primary Signal", d: "Generate a 'Side' (+1 or -1)." },
                    { s: "2. Outcome Test", d: "Run signal through Triple Barrier." },
                    { s: "3. Secondary Label", d: "1 if Primary won, 0 if it lost." },
                    { s: "4. Training", d: "Train ML model to predict these labels." }
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4 group">
                      <span className="text-indigo-600 font-black text-lg">{i + 1}</span>
                      <p className="text-sm text-slate-600">
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
            <p className="text-xl text-slate-600 leading-relaxed">
              Backtests are often "mirages." Statistical Armor is required to deflate performance claims.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900">Deflating the Sharpe Ratio</h3>
              <p className="text-slate-600 leading-relaxed">
                The <strong>Deflated Sharpe Ratio (DSR)</strong> corrects for selection bias and non-normal returns.
              </p>
              <GridBox className="bg-rose-50 border-rose-100">
                <h4 className="font-bold text-rose-900 mb-2">The Multi-Testing Sinkhole</h4>
                <p className="text-sm text-rose-800/80">
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

          <div className="p-8 md:p-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <FileSearch className="w-6 h-6 text-rose-500" /> Feature Importance: MDA vs MDI
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
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
              <h3 className="text-3xl font-black text-slate-900">Elastic Net Shield</h3>
              <p className="text-slate-600 leading-relaxed">
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
                  <span className="text-blue-400 font-bold text-xs uppercase mb-2 block">{step.s}</span>
                  <p className="text-xs text-slate-400">{step.d}</p>
                </div>
              ))}
            </div>
          </GridBox>
        </div>
      </ModuleSection>

      {/* Call-to-Action Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl my-8 text-center max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {currentArticle?.googleDoc && (
            <a 
              href={currentArticle.googleDoc}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
            >
              <BookOpen className="inline mr-2" />
              Read Full Research Paper
            </a>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-20 text-center bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-6">
          <p className="text-slate-400 text-sm italic mb-4">
            "Overfitting is the default state. Your only edge is the rigor of your process."
          </p>
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
            Research Series 2.6.1 • Academic Distribution
          </div>
          <div className="text-xs text-slate-400 mt-4">
            © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
          </div>
        </div>
      </footer>
    </div>
  );
}