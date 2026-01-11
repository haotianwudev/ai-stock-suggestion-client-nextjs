'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BarChart3, Binary, BookOpen, BrainCircuit, Calculator, CheckCircle2, Code2, Coins, Cpu, Database, FileSpreadsheet, Globe, Layers, Layout, Library, Lightbulb, LineChart, Lock, Network, PieChart, Scale, Server, Settings, Sigma, Target, Terminal, TrendingUp, Workflow, Zap, AlertTriangle, Cloud, Container, Box, Atom, Music, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- Components ---
const Section = ({ title, icon: Icon, children, colorClass, gradientClass, id }: {
  title: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
  colorClass: string;
  gradientClass: string;
  id?: string;
}) => (
  <div id={id} className={`mb-16 rounded-3xl p-8 shadow-xl ${gradientClass} border border-white/50 transition-all hover:shadow-2xl duration-500`}>
    <div className="flex items-center mb-8 border-b border-black/5 pb-6">
      <div className={`p-4 rounded-2xl bg-white shadow-sm mr-5 ring-1 ring-black/5`}>
        <Icon className={`w-8 h-8 ${colorClass}`} />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
    </div>
    <div className="space-y-6 text-slate-700 leading-relaxed">{children}</div>
  </div>
);

const Card = ({ title, children, accentColor, icon: CardIcon }: {
  title: string;
  children: React.ReactNode;
  accentColor: string;
  icon?: React.ComponentType<any>;
}) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300 h-full flex flex-col">
    <div className="flex items-center mb-3">
      {CardIcon && <CardIcon className={`w-5 h-5 mr-2 ${accentColor}`} />}
      <h3 className={`text-lg font-bold ${accentColor}`}>{title}</h3>
    </div>
    <div className="text-slate-600 text-sm leading-relaxed flex-grow">{children}</div>
  </div>
);

const Badge = ({ text, color }: { text: string; color: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2 border ${color}`}>
    {text}
  </span>
);

/**
 * Formula Component
 * Dynamically renders LaTeX using Katex if available, falling back to a code block.
 * Uses a span for inline mode to prevent "div inside p" validation errors.
 */
const Formula = ({ tex, displayMode = true }: { tex: string; displayMode?: boolean }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [isKatexLoaded, setIsKatexLoaded] = useState(false);

  useEffect(() => {
    // Check if global katex is ready
    if ((window as any).katex) {
      setIsKatexLoaded(true);
    } else {
      // Listen for the custom event dispatched by the loader in App
      const handleLoad = () => setIsKatexLoaded(true);
      window.addEventListener('katex-loaded', handleLoad);
      return () => window.removeEventListener('katex-loaded', handleLoad);
    }
  }, []);

  useEffect(() => {
    if (isKatexLoaded && (window as any).katex) {
      const currentRef = displayMode ? divRef.current : spanRef.current;
      if (currentRef) {
        try {
          (window as any).katex.render(tex, currentRef, {
            throwOnError: false,
            displayMode: displayMode
          });
        } catch (e) {
          console.error("Katex error:", e);
        }
      }
    }
  }, [isKatexLoaded, tex, displayMode]);

  // Fallback visual while loading or if it fails
  if (!isKatexLoaded) {
    if (displayMode) {
      return (
        <div className="font-mono text-xs md:text-sm bg-slate-100 text-slate-800 p-2 rounded-lg overflow-x-auto my-3 text-center border border-slate-200">
          {tex}
        </div>
      );
    } else {
      return (
        <span className="font-mono text-xs md:text-sm bg-slate-100 text-slate-800 p-2 rounded-lg overflow-x-auto inline-block">
          {tex}
        </span>
      );
    }
  }

  if (displayMode) {
    return <div ref={divRef} className="my-4 text-center text-slate-800 overflow-x-auto overflow-y-hidden" />;
  } else {
    return <span ref={spanRef} className="inline-block mx-1 text-slate-800 overflow-x-auto overflow-y-hidden" />;
  }
};

export default function IntegerOptimizationArticle() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  
  const currentArticle = articles.find(article => article.slug === 'integer-optimization-finance-continuous-theory-discrete-execution');

  // Load Katex Scripts on mount
  useEffect(() => {
    const loadKatex = () => {
      if ((window as any).katex) return; // Already loaded

      // Inject CSS
      if (!document.querySelector('link[href*="katex.min.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
        document.head.appendChild(link);
      }

      // Inject JS
      if (!document.querySelector('script[src*="katex.min.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
        script.defer = true;
        script.onload = () => {
          // Dispatch event so components know to render
          window.dispatchEvent(new Event('katex-loaded'));
        };
        document.head.appendChild(script);
      }
    };

    loadKatex();
  }, []);

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && currentArticle.title && currentArticle.slug && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="relative overflow-hidden bg-white mb-12">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-90"></div>
          
          {/* Animated Background Blobs */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>

          <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 flex flex-col items-center text-center z-10">
            <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full border border-indigo-100 bg-white shadow-sm hover:shadow-md transition-shadow cursor-default">
              <Binary className="w-4 h-4 text-indigo-600 mr-2" />
              <span className="text-sm font-semibold text-indigo-600 tracking-wide uppercase">Quantitative Research Series</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900">
              Integer Optimization<br />in Finance
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed font-light">
              From continuous theory to discrete execution. How <span className="font-semibold text-indigo-600">Mixed-Integer Programming (MIP)</span> solves the NP-Hard problems of real-world trading.
            </p>

            <div className="mt-10 flex gap-4 text-sm font-medium text-slate-500">
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" /> Portfolio Construction
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" /> Tax Management
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" /> Arbitrage
              </div>
            </div>
          </div>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/X2ORuTr.jpeg" 
              alt="Integer Optimization in Finance Infographic" 
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
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/uxp6Frj.jpeg" 
              alt="Integer Optimization in Finance Infographic" 
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

        {/* Full-screen image viewer */}
        <FullScreenImageViewer
          src="https://i.imgur.com/X2ORuTr.jpeg"
          alt="Integer Optimization in Finance Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        <main className="max-w-7xl mx-auto px-6">
          {/* 1. The Core Problem */}
          <div className="grid md:grid-cols-12 gap-8 mb-20">
            <div className="md:col-span-7 bg-white rounded-3xl p-10 shadow-lg border border-indigo-50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 text-amber-500 mr-3" />
                  The "Dust" Problem
                </h3>
                <p className="text-slate-600 mb-6 text-lg">Traditional Mean-Variance Optimization assumes assets are infinitely divisible. This creates "dust"—negligible positions (e.g., 0.0001%) that are:</p>
                <ul className="grid grid-cols-2 gap-4 mb-6">
                  <li className="flex items-start bg-slate-50 p-3 rounded-lg">
                    <span className="w-2 h-2 mt-2 bg-red-400 rounded-full mr-2 shrink-0"></span>
                    <span className="text-slate-700 text-sm">Costly to trade (fixed fees)</span>
                  </li>
                  <li className="flex items-start bg-slate-50 p-3 rounded-lg">
                    <span className="w-2 h-2 mt-2 bg-red-400 rounded-full mr-2 shrink-0"></span>
                    <span className="text-slate-700 text-sm">Operational nightmares</span>
                  </li>
                  <li className="flex items-start bg-slate-50 p-3 rounded-lg">
                    <span className="w-2 h-2 mt-2 bg-red-400 rounded-full mr-2 shrink-0"></span>
                    <span className="text-slate-700 text-sm">Impossible to hedge</span>
                  </li>
                  <li className="flex items-start bg-slate-50 p-3 rounded-lg">
                    <span className="w-2 h-2 mt-2 bg-red-400 rounded-full mr-2 shrink-0"></span>
                    <span className="text-slate-700 text-sm">Illiquid odd-lots</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:col-span-5 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-10 shadow-lg text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Lightbulb className="w-6 h-6 text-yellow-300 mr-3" />
                  The MIP Solution
                </h3>
                <div className="text-indigo-100 mb-6 leading-relaxed">
                  We introduce a binary vector <span className="font-bold">z</span> where <Formula tex="z_i \in \{0, 1\}" displayMode={false} />.
                </div>
                <div className="bg-white/10 rounded-xl p-5 backdrop-blur-md border border-white/20">
                  <p className="font-mono text-sm mb-2 opacity-80">// If z[i] is 0, weight w[i] MUST be 0</p>
                  <div className="text-xl font-bold">
                    <Formula tex="l_i z_i \leq w_i \leq u_i z_i" displayMode={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Mathematical Architectures */}
          <Section 
            title="Mathematical Architectures" 
            icon={Sigma}
            colorClass="text-blue-600"
            gradientClass="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-blue-100"
          >
            {/* Intro Text */}
            <div className="mb-8 text-slate-600 max-w-4xl">
              Defining the feasible region is an art form. We move beyond simple linear bounds to capture the discrete nature of trading mechanics and solver performance.
            </div>

            {/* Grid 1: Structural Constraints */}
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
              <div className="w-8 h-px bg-slate-300 mr-2"></div>
              Structural Constraints
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <Card title="Logical Constraints" accentColor="text-blue-700" icon={Binary}>
                Encodes "If-Then" rules. Example: "If we hold Shell, we must not hold BP."
                <Formula tex="z_{shell} + z_{bp} \leq 1" />
              </Card>
              <Card title="Cardinality (K)" accentColor="text-cyan-700" icon={Layout}>
                Limits the total number of assets in the portfolio to exactly K.
                <Formula tex="\sum_{i=1}^N z_i = K" />
              </Card>
              <Card title="Minimum Buy-In" accentColor="text-sky-700" icon={Scale}>
                Disallows small trades. Position must be 0 or &gt; $100k.
                <Formula tex="w_i = 0 \lor w_i \geq 0.05" />
              </Card>
              <Card title="Round Lots" accentColor="text-indigo-700" icon={Coins}>
                Forces trades to be multiples of a lot size (e.g., 100 shares).
                <Formula tex="x_i = L \cdot n_i, n_i \in \mathbb{Z}" />
              </Card>
            </div>

            {/* Grid 2: Advanced Techniques */}
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
              <div className="w-8 h-px bg-slate-300 mr-2"></div>
              Advanced Techniques
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card title="Perspective Cut" accentColor="text-violet-700" icon={Target}>
                Advanced conic reformulation. Replaces quadratic terms to tighten the "relaxation gap."
                <Formula tex="w_i^2 \rightarrow w_i^2 / z_i" />
              </Card>
              <Card title="Indicator Constraints" accentColor="text-purple-700" icon={ArrowRight}>
                Modern solver feature. Avoids "Big-M" numerical issues by handling logic natively.
                <Formula tex="z=1 \implies \sum w_i \le \alpha" />
              </Card>
              <Card title="SOS Type 2" accentColor="text-fuchsia-700" icon={Layers}>
                Special Ordered Sets. Essential for modeling piecewise linear costs (e.g., tiered commissions).
                <Formula tex="\lambda_i, \lambda_{i+1} \neq 0" />
              </Card>
              <Card title="Turnover Control" accentColor="text-pink-700" icon={Workflow}>
                Linearizing absolute value differences for rebalancing limits.
                <Formula tex="|w_{new} - w_{old}| \leq T" />
              </Card>
            </div>
            <div className="mt-8 bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start">
              <div className="p-2 bg-blue-100 rounded-lg mr-4 text-blue-600">
                <BookOpen className="w-5 h-5"/>
              </div>
              <div>
                <h4 className="font-bold text-blue-900 text-sm">Research Note: The "Big-M" Pitfall</h4>
                <div className="text-xs text-blue-800 mt-1">
                  When linking binary (<Formula tex="z" displayMode={false} />) and continuous (<Formula tex="w" displayMode={false} />) variables via <Formula tex="w \le M \cdot z" displayMode={false} />, choosing a generic "large M" (e.g., 10,000) causes numerical instability in solvers. A "Tight M" (equal to the asset's upper bound) is critical for convergence.
                </div>
              </div>
            </div>
          </Section>

          {/* 3. The Quant Workflow */}
          <Section 
            title="The Quant Workflow" 
            icon={Workflow}
            colorClass="text-indigo-600"
            gradientClass="bg-gradient-to-br from-indigo-50 via-white to-violet-50 border-indigo-100"
            id="workflow"
          >
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-indigo-100 hidden md:block"></div>
              <div className="space-y-12">
                {/* Step 1: Inputs */}
                <div className="relative flex flex-col md:flex-row gap-8 group">
                  <div className="hidden md:flex flex-col items-center flex-shrink-0 z-10">
                    <div className="w-16 h-16 bg-white border-2 border-indigo-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:border-indigo-400 transition-colors">
                      <Database className="w-8 h-8 text-indigo-500" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white/60 p-6 rounded-2xl border border-indigo-50 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">1. Data Ingestion & Signal Generation</h4>
                        <p className="text-sm text-slate-500">Constructing the inputs for the optimizer.</p>
                      </div>
                      <Badge text="Python / Pandas" color="bg-slate-100 text-slate-600" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="font-semibold text-slate-700 mb-1">Expected Returns (<Formula tex="\mu" displayMode={false} />)</div>
                        <div className="text-slate-500">Alpha model output. Vector of size <Formula tex="N" displayMode={false} />.</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="font-semibold text-slate-700 mb-1">Covariance Matrix (<Formula tex="\Sigma" displayMode={false} />)</div>
                        <div className="text-slate-500">Risk model (e.g., Barra). Matrix of size <Formula tex="N \times N" displayMode={false} />.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Formulation */}
                <div className="relative flex flex-col md:flex-row gap-8 group">
                  <div className="hidden md:flex flex-col items-center flex-shrink-0 z-10">
                    <div className="w-16 h-16 bg-white border-2 border-indigo-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:border-indigo-400 transition-colors">
                      <Code2 className="w-8 h-8 text-indigo-500" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white/60 p-6 rounded-2xl border border-indigo-50 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">2. Problem Formulation (CVXPY)</h4>
                        <p className="text-sm text-slate-500">Translating business logic into standard form.</p>
                      </div>
                      <Badge text="MIP Modeling" color="bg-indigo-100 text-indigo-600" />
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4 font-mono text-xs text-blue-300 overflow-x-auto">
                      <div><span className="text-purple-400">import</span> cvxpy <span className="text-purple-400">as</span> cp</div>
                      <div className="mt-2 text-slate-400"># Define Variables</div>
                      <div>w = cp.Variable(n) <span className="text-slate-500"># Weights</span></div>
                      <div>z = cp.Variable(n, boolean=<span className="text-yellow-400">True</span>) <span className="text-slate-500"># Selection</span></div>
                      <div className="mt-2 text-slate-400"># Objective: Max Return - Risk penalty</div>
                      <div>objective = cp.Maximize(mu @ w - gamma * cp.quad_form(w, Sigma))</div>
                      <div className="mt-2 text-slate-400"># Constraints</div>
                      <div>constraints = [</div>
                      <div className="pl-4">cp.sum(w) == 1, <span className="text-slate-500"># Fully invested</span></div>
                      <div className="pl-4">cp.sum(z) &lt;= 50, <span className="text-slate-500"># Cardinality limit</span></div>
                      <div className="pl-4">w &lt;= z   <span className="text-slate-500"># Big-M linking</span></div>
                      <div>]</div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Solver Execution */}
                <div className="relative flex flex-col md:flex-row gap-8 group">
                  <div className="hidden md:flex flex-col items-center flex-shrink-0 z-10">
                    <div className="w-16 h-16 bg-white border-2 border-indigo-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:border-indigo-400 transition-colors">
                      <Cpu className="w-8 h-8 text-indigo-500" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white/60 p-6 rounded-2xl border border-indigo-50 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">3. The Solver Engine</h4>
                        <p className="text-sm text-slate-500">Branch-and-Bound search space exploration.</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge text="Gurobi" color="bg-slate-100 text-slate-600" />
                        <Badge text="Mosek" color="bg-slate-100 text-slate-600" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-sm">
                      <div className="text-center">
                        <div className="text-xs text-indigo-400 uppercase font-bold tracking-wider">Root Node</div>
                        <div className="font-bold text-indigo-900">Relaxed LP</div>
                      </div>
                      <ArrowRight className="text-indigo-300 w-5 h-5" />
                      <div className="text-center">
                        <div className="text-xs text-indigo-400 uppercase font-bold tracking-wider">Branching</div>
                        <div className="font-bold text-indigo-900">Split <Formula tex="z_i \in \{0, 1\}" displayMode={false} /></div>
                      </div>
                      <ArrowRight className="text-indigo-300 w-5 h-5" />
                      <div className="text-center">
                        <div className="text-xs text-indigo-400 uppercase font-bold tracking-wider">Pruning</div>
                        <div className="font-bold text-indigo-900">Bounds Check</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Execution */}
                <div className="relative flex flex-col md:flex-row gap-8 group">
                  <div className="hidden md:flex flex-col items-center flex-shrink-0 z-10">
                    <div className="w-16 h-16 bg-white border-2 border-indigo-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:border-indigo-400 transition-colors">
                      <Coins className="w-8 h-8 text-indigo-500" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white/60 p-6 rounded-2xl border border-indigo-50 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">4. Order Slicing & Execution</h4>
                        <p className="text-sm text-slate-500">Transforming optimal weights into market orders.</p>
                      </div>
                      <Badge text="FIX Protocol" color="bg-green-100 text-green-700" />
                    </div>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600">
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> Round to nearest Lot (100)</li>
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> Split large parents (VWAP)</li>
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> Route to Dark Pools</li>
                      <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> TCA Analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* 4. Strategic Applications - EXPANDED */}
          <div className="space-y-16 mb-20">
            {/* Strategy 1: Index Tracking */}
            <Section 
              title="Sparse Index Tracking" 
              icon={Target}
              colorClass="text-emerald-600"
              gradientClass="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-emerald-100"
            >
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-1/2">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">The <Formula tex="L_0" displayMode={false} /> Norm Challenge</h3>
                  <p className="mb-4 text-slate-600 leading-relaxed">
                    The goal is to replicate a benchmark (e.g., S&P 500) using only a subset of assets (e.g., <Formula tex="K=50" displayMode={false} />). This minimizes transaction costs and simplifies management.
                  </p>
                  <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100 mb-6">
                    <h4 className="font-bold text-emerald-800 text-sm mb-2 flex items-center">
                      <Scale className="w-4 h-4 mr-2" /> MIP vs. Lasso (Regularization)
                    </h4>
                    <ul className="space-y-3 text-sm text-slate-700">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                        <span><strong>Lasso (<Formula tex="L_1" displayMode={false} />):</strong> Shrinks weights towards zero. Bias creates systematic underperformance.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                        <span><strong>MIP (<Formula tex="L_0" displayMode={false} />):</strong> Selects the best subset <em>without</em> shrinking weights. Provides an unbiased estimator.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="lg:w-1/2 bg-white/60 rounded-xl p-6 border border-emerald-100 shadow-sm">
                  <div className="font-mono text-xs text-slate-500 mb-2 uppercase tracking-wide">Optimization Model</div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-bold text-slate-800">Objective</div>
                      <div className="text-xs text-slate-600 mb-1">Minimize Tracking Error Squared</div>
                      <Formula tex="\min \sum (R_{port} - R_{bench})^2" displayMode={false} />
                    </div>
                    <div className="border-t border-emerald-100 pt-4">
                      <div className="text-sm font-bold text-slate-800">Cardinality Constraint</div>
                      <div className="text-xs text-slate-600 mb-1">Strict limit on number of assets</div>
                      <Formula tex="\sum_{i=1}^N z_i \leq K" />
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* Strategy 2: Tax-Aware */}
            <Section 
              title="Tax-Loss Harvesting" 
              icon={FileSpreadsheet}
              colorClass="text-rose-600"
              gradientClass="bg-gradient-to-br from-rose-50 via-white to-pink-50 border-rose-100"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Maximizing After-Tax Alpha</h3>
                  <p className="text-slate-600 mb-6">
                    Systematically realizing losses to offset capital gains, while maintaining risk exposure. The complexity lies in the <strong>Wash Sale Rule</strong>: you cannot buy a "substantially identical" security 30 days before or after a sale.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-rose-50 rounded-lg border border-rose-100">
                      <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold mr-3">1</div>
                      <div className="text-sm"><span className="font-bold text-rose-900">Scan Inventory:</span> Identify lots with <Formula tex="P_{current} < P_{cost}" displayMode={false} />.</div>
                    </div>
                    <div className="flex items-center p-3 bg-rose-50 rounded-lg border border-rose-100">
                      <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold mr-3">2</div>
                      <div className="text-sm"><span className="font-bold text-rose-900">Substitute:</span> Map Loser (e.g., Coke) to Substitute (e.g., Pepsi).</div>
                    </div>
                    <div className="flex items-center p-3 bg-rose-50 rounded-lg border border-rose-100">
                      <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold mr-3">3</div>
                      <div className="text-sm"><span className="font-bold text-rose-900">Optimize:</span> Solve for max realized loss s.t. tracking error limits.</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/80 p-6 rounded-2xl border border-rose-100 shadow-sm">
                  <h4 className="font-bold text-rose-800 text-sm mb-4">The Logic Gate (MIP Formulation)</h4>
                  <div className="mb-6">
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Wash Sale Constraint</div>
                    <div className="bg-slate-900 rounded-lg p-3 text-rose-300 font-mono text-xs">
                      <div className="mb-1"># Cannot Buy if Sold recently</div>
                      <Formula tex="x_{buy, i} \leq M \cdot (1 - y_{wash, i})" displayMode={false} />
                      <div className="mt-2 mb-1"># Mutually Exclusive Actions</div>
                      <Formula tex="z_{sell, i} + z_{buy, i} \leq 1" displayMode={false} />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Inventory Management</div>
                    <p className="text-xs text-slate-600 mb-2">Tracks specific tax lots (date, price) rather than average cost.</p>
                    <div className="flex gap-2">
                      <Badge text="FIFO" color="bg-slate-100" />
                      <Badge text="LIFO" color="bg-slate-100" />
                      <Badge text="HIFO" color="bg-rose-100 text-rose-700" />
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* Strategy 3: Pairs Trading - EXPANDED */}
            <Section 
              title="Pairs Trading & Cointegration" 
              icon={Network}
              colorClass="text-orange-600"
              gradientClass="bg-gradient-to-br from-orange-50 via-white to-amber-50 border-orange-100"
            >
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Graph Theory Formulation</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    We treat the market as a graph <Formula tex="G=(V,E)" displayMode={false} /> where vertices are stocks and edges represent cointegration strength. The goal is to find a matching that maximizes total strength while ensuring diversification.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                      <div className="font-bold text-orange-800 text-sm mb-1">Nodes (V)</div>
                      <div className="text-xs text-slate-600">Universe of liquid stocks (e.g., Russell 3000).</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                      <div className="font-bold text-orange-800 text-sm mb-1">Edges (E)</div>
                      <div className="text-xs text-slate-600">Engle-Granger cointegration p-values.</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">The Clique Partitioning Problem</h4>
                    <p className="text-xs text-slate-500">Partitioning the universe into disjoint clusters of cointegrated assets. An NP-Hard problem solvable via MIP.</p>
                  </div>
                </div>
                <div className="flex-1 bg-white/60 rounded-xl p-6 border border-orange-200 shadow-sm flex flex-col justify-center">
                  <div className="font-mono text-xs text-slate-500 mb-3 uppercase tracking-wide text-center">Constraint Model</div>
                  <div className="space-y-6">
                    <div className="text-center">
                      <Formula tex="\text{Maximize } \sum_{(i,j) \in E} w_{ij} x_{ij}" />
                      <div className="text-xs text-slate-500 mt-1">Maximize sum of edge weights (cointegration scores)</div>
                    </div>
                    <div className="border-t border-dashed border-orange-200 my-2"></div>
                    <div className="text-center">
                      <Formula tex="\sum_{j} x_{ij} \leq 1 \quad \forall i \in V" />
                      <div className="text-xs text-slate-500 mt-1">Degree Constraint: Each stock is in at most 1 pair</div>
                    </div>
                    <div className="border-t border-dashed border-orange-200 my-2"></div>
                    <div className="text-center">
                      <Formula tex="\beta_{port} = \sum (w_i \beta_i) \approx 0" />
                      <div className="text-xs text-slate-500 mt-1">Market Neutrality Constraint</div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          {/* 6. Tools & Stack - EXPANDED */}
          <Section 
            title="The Modern Quant Stack" 
            icon={Server}
            colorClass="text-slate-700"
            gradientClass="bg-gradient-to-br from-slate-100 via-white to-gray-100 border-slate-200"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Column 1: Modeling */}
              <div className="space-y-4">
                <div className="flex items-center text-slate-800 font-bold mb-2">
                  <Code2 className="w-5 h-5 mr-2 text-blue-500" /> Modeling
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="font-bold text-sm text-slate-800">CVXPY</div>
                  <div className="text-xs text-slate-500 mt-1">Python DSL for convex optimization. The industry standard.</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="font-bold text-sm text-slate-800">JuMP</div>
                  <div className="text-xs text-slate-500 mt-1">Julia-based modeling. Extremely fast for large-scale problems.</div>
                </div>
              </div>

              {/* Column 2: Solvers */}
              <div className="space-y-4">
                <div className="flex items-center text-slate-800 font-bold mb-2">
                  <Cpu className="w-5 h-5 mr-2 text-indigo-500" /> Engines
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-sm text-slate-800">Gurobi</div>
                    <Badge text="Pro" color="bg-indigo-100 text-indigo-700" />
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Best-in-class performance for MIPs. Expensive licensing.</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-sm text-slate-800">HiGHS</div>
                    <Badge text="OSS" color="bg-green-100 text-green-700" />
                  </div>
                  <div className="text-xs text-slate-500 mt-1">High-performance open-source linear solver (C++).</div>
                </div>
              </div>

              {/* Column 3: Data */}
              <div className="space-y-4">
                <div className="flex items-center text-slate-800 font-bold mb-2">
                  <Database className="w-5 h-5 mr-2 text-emerald-500" /> Data
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="font-bold text-sm text-slate-800">kdb+ / q</div>
                  <div className="text-xs text-slate-500 mt-1">Time-series database for high-frequency tick data.</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="font-bold text-sm text-slate-800">Snowflake</div>
                  <div className="text-xs text-slate-500 mt-1">Cloud data warehouse for factor data and reference data.</div>
                </div>
              </div>

              {/* Column 4: Infrastructure */}
              <div className="space-y-4">
                <div className="flex items-center text-slate-800 font-bold mb-2">
                  <Cloud className="w-5 h-5 mr-2 text-sky-500" /> Infra
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="font-bold text-sm text-slate-800">Kubernetes</div>
                  <div className="text-xs text-slate-500 mt-1">Orchestrating distributed solver jobs across a cluster.</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <div className="font-bold text-sm text-slate-800">Airflow</div>
                  <div className="text-xs text-slate-500 mt-1">Workflow management for daily rebalancing DAGs.</div>
                </div>
              </div>
            </div>
          </Section>

          {/* 7. Future Frontiers - EXPANDED */}
          <div className="mb-20">
            <div className="flex items-center mb-10 px-4">
              <div className="p-3 rounded-xl bg-slate-900 text-white mr-4 shadow-lg">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-800">Future Frontiers</h2>
                <p className="text-slate-500 mt-1">Next-generation computing paradigms for combinatorial finance.</p>
              </div>
            </div>

            {/* Quantum Section */}
            <div className="bg-slate-900 rounded-3xl p-8 lg:p-12 mb-8 relative overflow-hidden text-white">
              {/* Background effects */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-[80px] opacity-20"></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <Badge text="Post-Silicon" color="bg-indigo-500/20 text-indigo-200 border-indigo-500/30" />
                    <Badge text="Adiabatic" color="bg-purple-500/20 text-purple-200 border-purple-500/30" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Quantum Annealing</h3>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    Classical solvers struggle with non-convex landscapes, often getting stuck in local minima. Quantum Annealers exploit <strong>quantum tunneling</strong> to traverse energy barriers, finding global optima for combinatorial problems.
                  </p>
                  <div className="bg-black/30 rounded-xl p-6 border border-white/10 mb-6">
                    <h4 className="font-bold text-indigo-300 mb-2 text-sm uppercase tracking-wide">The Mapping: QUBO</h4>
                    <p className="text-sm text-slate-400 mb-4">Financial MIPs must be reformulated into <strong>Quadratic Unconstrained Binary Optimization</strong> problems.</p>
                    <div className="font-mono text-center text-lg">
                      <Formula tex="E(\mathbf{z}) = \mathbf{z}^T Q \mathbf{z} + \mathbf{c}^T \mathbf{z}" displayMode={false} />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>D-Wave Advantage
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>Fujitsu Digital Annealer
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
                  <h4 className="font-bold text-white mb-6 flex items-center">
                    <Database className="w-5 h-5 mr-2 text-indigo-400"/>Portfolio Embedding
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-slate-300">1. Logical Variables</span>
                      <span className="font-mono text-indigo-300">Qubits</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-slate-300">2. Correlations</span>
                      <span className="font-mono text-indigo-300">Couplers (J)</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="text-slate-300">3. Returns/Risk</span>
                      <span className="font-mono text-indigo-300">Bias (h)</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-slate-300">4. Constraints</span>
                      <span className="font-mono text-indigo-300">Penalty Terms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Neural Section */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200 relative overflow-hidden">
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                    <div className="flex items-center justify-center mb-6">
                      <BrainCircuit className="w-16 h-16 text-slate-300" />
                    </div>
                    <div className="space-y-4 font-mono text-xs text-slate-600">
                      <div className="flex items-center">
                        <span className="w-24 text-slate-400">Input:</span>
                        <span className="bg-slate-200 px-2 py-1 rounded text-slate-800">Bipartite Graph (Vars ↔ Cons)</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-slate-400">Model:</span>
                        <span className="bg-indigo-100 px-2 py-1 rounded text-indigo-800">Graph Convolutional Net (GCN)</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-slate-400">Output:</span>
                        <span className="bg-green-100 px-2 py-1 rounded text-green-800">Branching Score (Probability)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="flex items-center space-x-3 mb-6">
                    <Badge text="Machine Learning" color="bg-pink-100 text-pink-700 border-pink-200" />
                    <Badge text="GNN" color="bg-orange-100 text-orange-700 border-orange-200" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-4">Neural Branching</h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-6">
                    The bottleneck of any MIP solver is the <strong>Branch-and-Bound</strong> tree. Choosing <em>which</em> variable to branch on determines if the solver finishes in seconds or centuries. 
                  </p>
                  <p className="text-slate-600 mb-6">
                    We train <strong>Graph Neural Networks (GNNs)</strong> via Imitation Learning to mimic expert (but slow) branching rules like <em>Strong Branching</em>, but execute them in milliseconds on a GPU.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-2xl font-bold text-slate-800 mb-1">100x</div>
                      <div className="text-xs text-slate-500 uppercase font-semibold">Inference Speedup</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-2xl font-bold text-slate-800 mb-1">30%</div>
                      <div className="text-xs text-slate-500 uppercase font-semibold">Tree Size Reduction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Learning Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl my-8 text-center">
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
          <footer className="border-t border-slate-200 pt-12 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
              <div className="flex items-center mb-4 md:mb-0">
                <Library className="w-4 h-4 mr-2" />
                <span>Finance & Optimization Research Group</span>
              </div>
              <div className="flex space-x-8">
                <a href="#" className="hover:text-indigo-600 transition-colors">Papers</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Benchmarks</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Datasets</a>
              </div>
            </div>
          </footer>
        </main>

        {/* Footer */}
        <footer className="bg-slate-50 border-t border-slate-200 py-12 text-center text-slate-500 text-sm">
          <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
        </footer>
      </div>
    </>
  );
}