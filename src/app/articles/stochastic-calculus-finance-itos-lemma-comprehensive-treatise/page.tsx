'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, Activity, GitBranch, Zap, Sigma, Divide, ArrowRight, Anchor, Layers, FunctionSquare, RefreshCw } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Helper: Brownian Motion Generator ---
const generateBrownianPath = (steps = 100) => {
  const data = [{ x: 0, y: 50 }]; // Start middle
  let currentY = 50;
  
  for (let i = 1; i < steps; i++) {
    const change = (Math.random() - 0.5) * 10; // Random step
    currentY += change;
    data.push({ x: (i / steps) * 100, y: currentY });
  }
  
  return data;
};

// --- Sub-Components ---
const SectionHeader = ({ number, title, colorClass, icon: Icon }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className={`flex items-center justify-center w-12 h-12 rounded-xl text-white shadow-lg ${colorClass}`}>
      {Icon ? <Icon size={24} /> : <span className="font-bold text-xl">{number}</span>}
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white tracking-tight">{title}</h2>
  </div>
);

const MathBlock = ({ equation, label, note }) => (
  <div className="my-6 p-6 bg-white dark:bg-[#14171B] rounded-xl shadow-sm dark:shadow-none border-l-4 border-indigo-500 overflow-x-auto group hover:shadow-md dark:hover:shadow-none transition-all">
    <div className="font-mono text-lg md:text-xl text-slate-700 dark:text-slate-300 text-center min-w-max">{equation}</div>
    {label && <div className="mt-3 text-xs text-slate-400 dark:text-slate-500 text-center uppercase tracking-wider font-semibold">{label}</div>}
    {note && <div className="mt-2 text-sm text-slate-500 dark:text-slate-400 text-center italic opacity-0 group-hover:opacity-100 transition-opacity duration-300">{note}</div>}
  </div>
);

const InfoCard = ({ title, children, color = "blue" }) => {
  const colorMap = {
    blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/30 text-blue-900 dark:text-blue-400",
    purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-900/30 text-purple-900 dark:text-purple-400",
    rose: "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-900/30 text-rose-900 dark:text-rose-400",
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-400",
    amber: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/30 text-amber-900 dark:text-amber-400",
    slate: "bg-slate-100 dark:bg-[#14171B] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300",
  };

  return (
    <div className={`p-6 rounded-2xl border ${colorMap[color]} mb-6 transition-transform hover:-translate-y-1 duration-300 h-full`}>
      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">{title}</h3>
      <div className="opacity-90 leading-relaxed text-sm md:text-base">{children}</div>
    </div>
  );
};

const AnalogySection = ({ title, scenarioA, scenarioB, icon: Icon }) => (
  <div className="bg-white dark:bg-[#14171B] p-6 md:p-8 rounded-2xl shadow-md dark:shadow-none border border-slate-100 dark:border-white/10 my-8">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-lg">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h3>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-slate-50 dark:bg-slate-900/20 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
        <h4 className="font-semibold text-slate-600 dark:text-slate-400 mb-2 text-sm uppercase">Scenario A: Deterministic</h4>
        <p className="text-slate-700 dark:text-slate-300">{scenarioA}</p>
      </div>
      <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-xl border border-orange-200 dark:border-orange-900/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <Activity size={64} />
        </div>
        <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2 text-sm uppercase">Scenario B: Stochastic</h4>
        <p className="text-slate-800 dark:text-slate-300 font-medium">{scenarioB}</p>
      </div>
    </div>
  </div>
);

const SimulationWidget = () => {
  const [path, setPath] = useState([]);

  useEffect(() => {
    setPath(generateBrownianPath());
  }, []);

  const pathString = useMemo(() => {
    if (path.length === 0) return "";
    return `M ${path[0].x} ${path[0].y} ` + path.map(p => `L ${p.x} ${p.y}`).join(" ");
  }, [path]);

  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-xl my-8 relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-white font-bold flex items-center gap-2">
          <Activity size={18} className="text-emerald-400"/> 
          Live Simulation: Wiener Process
        </h4>
        <button 
          onClick={() => setPath(generateBrownianPath())}
          className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
        >
          <RefreshCw size={16} />
        </button>
      </div>
      <div className="relative h-48 w-full border-b border-l border-slate-700 bg-slate-800/50 rounded-lg">
        {/* Grid Lines */}
        <div className="absolute inset-0 grid grid-rows-4 grid-cols-4 opacity-10">
          <div className="border-t border-slate-400 w-full h-full"></div>
          <div className="border-t border-slate-400 w-full h-full"></div>
          <div className="border-t border-slate-400 w-full h-full"></div>
          <div className="border-t border-slate-400 w-full h-full"></div>
        </div>
        {/* The Path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d={pathString} 
            stroke="#10b981" 
            strokeWidth="0.8" 
            fill="none" 
            vectorEffect="non-scaling-stroke" 
          />
        </svg>
      </div>
      <p className="text-slate-400 text-xs mt-3">
        Visualizing <span className="font-mono text-emerald-400">W_t</span>. Notice the jaggedness. If you zoomed in infinitely, it would look exactly the same (Self-Similarity).
      </p>
    </div>
  );
};

export default function ItosLemmaArticle() {
  return (
    <ArticleFrame slug="stochastic-calculus-finance-itos-lemma-comprehensive-treatise">
      <div className="bg-transparent font-sans dark:text-slate-300">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <InfographicSlot alt="Itô's Lemma Comprehensive Infographic" />
        </div>

        <main className="max-w-4xl mx-auto px-6 py-16 space-y-24">
          {/* 1. Introduction */}
          <section>
            <SectionHeader 
              number="01" 
              title="The Divergence of Worlds" 
              colorClass="bg-blue-600"
              icon={GitBranch}
            />
            <div className="prose prose-lg text-slate-600 dark:text-slate-400 max-w-none">
              <p>The history of mathematical finance is the history of grappling with uncertainty. In the classical Newtonian paradigm, the universe is smooth and deterministic. However, financial markets are characterized by jagged trajectories and inherent unpredictability that defy classical analysis.</p>
              <p className="mt-4">When Louis Bachelier modeled stock prices as random walks in 1900, he revealed a fractal nature: financial paths are continuous everywhere but differentiable nowhere. This roughness poses a catastrophic problem for ordinary calculus.</p>
            </div>
            
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <InfoCard title="The Problem: Infinite Variation" color="rose">
                The standard chain rule relies on local linearity (dy/dx). Stochastic paths are never locally linear. As you zoom in, the path remains jagged. Ordinary calculus ignores the accumulation of variance, or "energy," within these microscopic fluctuations.
              </InfoCard>
              <InfoCard title="The Solution: Itô Calculus" color="emerald">
                Itô's Lemma serves as the corrected chain rule. It introduces a convexity correction that accounts for the non-negligible quadratic variation of asset prices. It connects the stochastic differential equation (SDE) to partial differential equations (PDE).
              </InfoCard>
            </div>
          </section>

          {/* 2. Brownian Motion */}
          <section>
            <SectionHeader 
              number="02" 
              title="The Nature of the Underlying" 
              colorClass="bg-indigo-600"
              icon={Activity}
            />
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              To understand the new calculus, one must understand the unique pathology of the Wiener process (Brownian motion), denoted as <span className="font-mono bg-slate-100 dark:bg-[#14171B] px-1 rounded">W_t</span>.
            </p>
            
            <SimulationWidget />
            
            <div className="bg-white dark:bg-[#14171B] rounded-2xl shadow-sm dark:shadow-none border border-slate-200 dark:border-white/10 overflow-hidden mb-10">
              <div className="bg-slate-50 dark:bg-slate-900/20 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-800 dark:text-white">Properties of the Wiener Process</h3>
              </div>
              <div className="p-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Property 1</span>
                  <p className="font-medium text-slate-800 dark:text-slate-300">Initialization</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Starts at 0 almost surely (W_0 = 0).</p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Property 2</span>
                  <p className="font-medium text-slate-800 dark:text-slate-300">Independent Increments</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">The process is Markovian; the future movement is independent of the past path.</p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Property 3</span>
                  <p className="font-medium text-slate-800 dark:text-slate-300">Gaussian Increments</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Variance scales linearly with time: W_t - W_s ~ N(0, t-s).</p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Property 4</span>
                  <p className="font-medium text-slate-800 dark:text-slate-300">Pathology</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Paths are of unbounded variation. They are too rough to have a tangent line.</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Quadratic Variation</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              While total variation is infinite, quadratic variation is finite and deterministic. This is the crux of Itô calculus. Over a small interval dt, the squared increment converges to time itself.
            </p>
            
            <MathBlock 
              equation="(dW_t)² → dt" 
              label="The Deterministic Core of Randomness" 
              note="As dt approaches 0, the random term dW squared behaves like the deterministic term dt." 
            />
            
            <div className="overflow-x-auto bg-white dark:bg-[#14171B] rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-white/10">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wide">
                    <th className="p-4 font-semibold">Term</th>
                    <th className="p-4 font-semibold">Ordinary Order</th>
                    <th className="p-4 font-semibold">Stochastic Order</th>
                    <th className="p-4 font-semibold text-right">Fate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="p-4 font-mono">dt</td>
                    <td className="p-4">1st Order</td>
                    <td className="p-4">1st Order (dt)</td>
                    <td className="p-4 text-right font-medium text-green-600 dark:text-green-400">Retained</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono">dW_t</td>
                    <td className="p-4 text-slate-400">-</td>
                    <td className="p-4">Order 1/2 (√dt)</td>
                    <td className="p-4 text-right font-medium text-green-600 dark:text-green-400">Retained</td>
                  </tr>
                  <tr className="bg-indigo-50 dark:bg-indigo-900/20">
                    <td className="p-4 font-mono font-bold text-indigo-700 dark:text-indigo-400">(dW_t)²</td>
                    <td className="p-4 text-slate-400">2nd Order (Vanishes)</td>
                    <td className="p-4 font-bold text-indigo-700 dark:text-indigo-400">Order 1 (dt)</td>
                    <td className="p-4 text-right font-bold text-indigo-700 dark:text-indigo-400">RETAINED</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-mono">dt · dW_t</td>
                    <td className="p-4 text-slate-400">-</td>
                    <td className="p-4">Order 3/2</td>
                    <td className="p-4 text-right text-slate-400">Vanishes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Deriving Itô */}
          <section>
            <SectionHeader 
              number="03" 
              title="Deriving Itô's Lemma" 
              colorClass="bg-purple-600"
              icon={Divide}
            />
            <div className="prose prose-lg text-slate-600 dark:text-slate-400 max-w-none">
              <p>Itô's Lemma is essentially a Taylor series expansion that retains terms up to the second order in the stochastic variable. Let us expand a function f(x, t) to the second order.</p>
            </div>
            
            <div className="my-8 p-6 bg-slate-50 dark:bg-slate-900/20 rounded-xl border border-slate-200 dark:border-slate-800">
              <p className="font-mono text-sm text-slate-500 dark:text-slate-400 mb-2">Taylor Expansion:</p>
              <div className="font-mono text-lg text-slate-800 dark:text-white mb-4 overflow-x-auto">
                df = <span className="text-emerald-600">∂f/∂t dt</span> + <span className="text-blue-600">∂f/∂x dx</span> + <span className="text-purple-600">½ ∂²f/∂x² (dx)²</span> + ...
              </div>
              <p className="text-slate-600 mb-2">In ordinary calculus, (dx)² vanishes because it is of order dt². In stochastic calculus, we assume x follows a diffusion process: dx = a(x,t)dt + b(x,t)dW.</p>
              <p className="text-slate-600 dark:text-slate-400">Squaring this process yields: (dx)² = a²dt² + 2ab(dt)(dW) + b²(dW)².</p>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Ignoring higher order terms (dt², dt · dW) and applying (dW)² = dt, we get: <span className="font-mono font-bold text-purple-600 ml-2">(dx)² = b² dt</span>.</p>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6">Substituting back gives the famous formula:</p>
            
            <div className="my-10 p-8 bg-slate-900 rounded-2xl shadow-2xl text-white transform md:-rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="text-center mb-4 text-slate-400 text-sm uppercase tracking-widest">The Fundamental Formula</div>
              <div className="font-mono text-xl md:text-3xl text-center leading-relaxed">
                df = <span className="text-blue-400">(</span> <span className="text-emerald-400">∂f/∂t</span> + a<span className="text-emerald-400">∂f/∂x</span> + <span className="text-rose-400">½b² ∂²f/∂x²</span><span className="text-blue-400">)</span>dt + b<span className="text-emerald-400">∂f/∂x</span>dW
              </div>
              <div className="mt-6 flex justify-center gap-4 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span className="text-slate-300">Standard Gradients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <span className="text-slate-300">Itô Correction</span>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <InfoCard title="The Convexity Correction" color="amber">
                The term <span className="font-mono font-bold">½b² ∂²f/∂x²</span> signifies that volatility combined with curvature creates drift. If the function is convex (curved like a bowl), random jitters increase the expected value. This is the mathematical manifestation of Jensen's Inequality: E[f(x)] ≥ f(E[x]).
              </InfoCard>
              <InfoCard title="Itô vs. Stratonovich" color="slate">
                Why does this correction exist? It comes from the definition of the stochastic integral. Itô defines the integral using the <em>left-endpoint</em> of time intervals (non-anticipating). Stratonovich uses the <em>midpoint</em>, which obeys the standard chain rule but anticipates future information, making it unsuitable for finance where we cannot see tomorrow's prices.
              </InfoCard>
            </div>
          </section>

          {/* 4. Example: GBM */}
          <section>
            <SectionHeader 
              number="04" 
              title="Case Study: Geometric Brownian Motion" 
              colorClass="bg-teal-600"
              icon={FunctionSquare}
            />
            <p className="text-slate-600 dark:text-slate-400 mb-6">The standard model for stock prices assumes returns are normally distributed, meaning prices are log-normally distributed.</p>
            
            <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl border border-teal-100 dark:border-teal-900/30 shadow-sm dark:shadow-none">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                  <h3 className="font-bold text-teal-800 dark:text-teal-400">The Stock Model</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">We assume the stock S_t follows:</p>
                  <div className="font-mono bg-slate-100 dark:bg-slate-900/40 p-2 rounded text-center">dS = μS dt + σS dW</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">We want to find the dynamics of the log-return: f(S) = ln(S).</p>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span>1st Derivative (f'):</span>
                      <span className="font-mono">1/S</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span>2nd Derivative (f''):</span>
                      <span className="font-mono">-1/S²</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block text-slate-300 dark:text-slate-600">
                  <ArrowRight size={32} />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="font-bold text-teal-800 dark:text-teal-400">Applying the Lemma</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Plug derivatives into the Itô formula:</p>
                  <div className="font-mono bg-teal-50 dark:bg-teal-900/20 text-teal-900 dark:text-teal-400 p-4 rounded-lg text-sm">
                    d(ln S) = (1/S)(μS dt + σS dW) + ½(-1/S²)(σS)² dt
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Simplifying yields the log-normal dynamics:</p>
                  <div className="font-mono bg-teal-600 text-white p-3 rounded shadow-lg text-center font-bold">
                    d(ln S) = (μ - ½σ²)dt + σdW
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center">
              Note: The drift is reduced by the volatility drag ½σ². This explains why a stock that drops 50% needs a 100% gain to recover; volatility drags down the compound growth rate.
            </p>
          </section>

          {/* 5. Intuition */}
          <section>
            <SectionHeader 
              number="05" 
              title="Intuitive Interpretations" 
              colorClass="bg-pink-600"
              icon={Zap}
            />
            <AnalogySection 
              title="The Vibrating Wire Analogy" 
              icon={Activity}
              scenarioA="You push a bead along a curved wire at steady speed. Height change depends only on slope and speed."
              scenarioB="The bead jitters rapidly (Brownian motion). If the wire curves up like a bowl, random jitters left and right both move the bead UP the sides, creating a positive drift relative to the tangent. This 'lift' is the Itô term."
            />
            <AnalogySection 
              title="Fuel vs. Horsepower (Delta Hedging)" 
              icon={TrendingUp}
              scenarioA="A static portfolio where value changes only with market direction."
              scenarioB="Theta (Time decay) is the 'bill' you pay for Gamma (Convexity/Horsepower). In a risk-neutral world, the money you lose from time decay must exactly equal the money you make from re-hedging volatility. Itô's Lemma is the equation that balances this checkbook."
            />
          </section>

          {/* 6. Black-Scholes */}
          <section>
            <SectionHeader 
              number="06" 
              title="The Black-Scholes PDE" 
              colorClass="bg-emerald-600"
              icon={Sigma}
            />
            <div className="prose prose-lg text-slate-600 dark:text-slate-400 max-w-none mb-8">
              <p>The "Killer App" of Itô's Lemma. It transforms a stochastic problem into a deterministic partial differential equation (PDE) by constructing a risk-free portfolio.</p>
            </div>
            
            {/* The Greeks Visualizer */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30 text-center">
                <div className="text-emerald-800 dark:text-emerald-400 font-bold text-xl mb-1">Θ</div>
                <div className="text-xs uppercase text-emerald-600 font-bold">Theta</div>
                <div className="text-xs text-slate-500 mt-1">Time Decay</div>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30 text-center">
                <div className="text-emerald-800 dark:text-emerald-400 font-bold text-xl mb-1">Δ</div>
                <div className="text-xs uppercase text-emerald-600 font-bold">Delta</div>
                <div className="text-xs text-slate-500 mt-1">Directional Risk</div>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30 text-center">
                <div className="text-emerald-800 dark:text-emerald-400 font-bold text-xl mb-1">Γ</div>
                <div className="text-xs uppercase text-emerald-600 font-bold">Gamma</div>
                <div className="text-xs text-slate-500 mt-1">Convexity</div>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30 text-center">
                <div className="text-emerald-800 dark:text-emerald-400 font-bold text-xl mb-1">r</div>
                <div className="text-xs uppercase text-emerald-600 font-bold">Rate</div>
                <div className="text-xs text-slate-500 mt-1">Risk Free</div>
              </div>
            </div>
            
            <div className="mt-6 p-6 border-2 border-emerald-500 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                The Master Equation
              </div>
              <div className="font-mono text-xl md:text-2xl font-bold text-emerald-900 dark:text-emerald-400 mt-2">
                <span className="text-emerald-700 dark:text-emerald-400">∂V/∂t</span> + <span className="text-emerald-700 dark:text-emerald-400"> rS ∂V/∂S</span> + <span className="text-emerald-700 dark:text-emerald-400"> ½σ²S² ∂²V/∂S²</span> = rV
              </div>
              <div className="mt-4 flex justify-center gap-2 md:gap-8 text-xs md:text-sm text-emerald-800 dark:text-emerald-400 font-mono">
                <span>(Theta)</span>
                <span>+</span>
                <span>(Risk-Free Drift)</span>
                <span>+</span>
                <span>(Convexity Gains)</span>
                <span>=</span>
                <span>(Bank Account)</span>
              </div>
              <p className="mt-6 text-sm text-emerald-800 dark:text-emerald-400 max-w-2xl mx-auto">
                This equation states that a hedged portfolio must earn the risk-free rate. Note that the physical drift μ (investor optimism) has disappeared. The option price depends only on volatility σ, not on whether the market is going up or down.
              </p>
            </div>
          </section>

          {/* 7. Advanced Concepts */}
          <section>
            <SectionHeader 
              number="07" 
              title="Advanced Extensions" 
              colorClass="bg-slate-700"
              icon={Layers}
            />
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl shadow-sm dark:shadow-none border-t-4 border-blue-500 group hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <h3 className="font-bold text-lg mb-2 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400">Multidimensional</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  For baskets of assets, Itô includes covariance terms. <span className="font-semibold text-blue-600 dark:text-blue-400">Cross-Gamma</span> (∂²V / ∂S₁∂S₂) becomes critical for correlation products like basket options or spread options.
                </p>
              </div>
              <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl shadow-sm dark:shadow-none border-t-4 border-purple-500 group hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                <h3 className="font-bold text-lg mb-2 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400">Girsanov Theorem</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  How do we actually get rid of the drift μ? Girsanov theorem allows us to change the probability measure (from Physical P to Risk-Neutral Q) by changing the drift of the Brownian motion itself.
                </p>
              </div>
              <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl shadow-sm dark:shadow-none border-t-4 border-rose-500 group hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                <h3 className="font-bold text-lg mb-2 dark:text-white group-hover:text-rose-700 dark:group-hover:text-rose-400">Martingale Representation</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  It implies that any martingale adapted to a Brownian filtration can be written as an Itô integral. This is the theoretical bedrock that guarantees a hedge exists (Market Completeness).
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-slate-900 text-slate-300 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg width="100%" height="100%">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            <Anchor className="w-12 h-12 mx-auto text-indigo-400 mb-6 relative z-10" />
            <h2 className="text-3xl font-bold text-white mb-6 relative z-10">The Architect of Modern Finance</h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-8 relative z-10">
              Itô's Lemma serves as the Calculator, the Architect, and the GPS of quantitative finance. It teaches us that in a volatile world, non-linearity creates value. The average outcome of a curved payoff is not the payoff of the average outcome.
            </p>
            <div className="inline-block px-6 py-2 border border-slate-700 rounded-full text-sm font-mono text-slate-400 relative z-10 hover:bg-slate-800 transition-colors cursor-default">
              Source: The Stochastic Calculus of Finance: A Comprehensive Treatise
            </div>
          </section>

        </main>
      </div>
    </ArticleFrame>
  );
}