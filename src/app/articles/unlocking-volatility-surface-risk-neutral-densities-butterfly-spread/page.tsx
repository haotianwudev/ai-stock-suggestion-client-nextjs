'use client';

import React, { useState } from 'react';
import { BookOpen, TrendingUp, Activity, BarChart2, GitMerge, Zap, ArrowRight, Target, Layers, Brain, AlertTriangle, Code, Scale, Clock, Minimize2, Shield, Briefcase, RefreshCw, CheckCircle2, Anchor, Feather, Crosshair, Eye, EyeOff, Globe, Sigma, Divide, Music } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Utility Components ---
const MathFraction = ({ num, den }: { num: React.ReactNode; den: React.ReactNode }) => (
  <span className="inline-block align-middle text-center mx-1 vertical-align-middle">
    <span className="block border-b border-indigo-800 pb-0.5 mb-0.5">{num}</span>
    <span className="block pt-0.5">{den}</span>
  </span>
);

const MathEq = ({ children, block = false }: { children: React.ReactNode; block?: boolean }) => {
  const className = block 
    ? "my-6 p-6 bg-slate-50 rounded-xl text-center border border-slate-200 shadow-sm text-lg md:text-xl font-serif text-slate-800 flex items-center justify-center flex-wrap" 
    : "inline-block px-1.5 py-0.5 bg-slate-100 rounded text-indigo-800 font-serif italic text-sm border border-slate-200 mx-0.5 align-baseline";
  
  const Component = block ? 'div' : 'span';
  
  return (
    <Component className={className}>
      {children}
    </Component>
  );
};

export default function ImpliedDistributionsTutor() {
  const [variant, setVariant] = useState('call');
  const [tradingTab, setTradingTab] = useState('skew');
  
  return (
    <ArticleFrame slug="unlocking-volatility-surface-risk-neutral-densities-butterfly-spread">
      <InfographicSlot alt="Volatility Surface and Risk-Neutral Densities Infographic" />
      <main className="max-w-4xl mx-auto px-6 pb-20 pt-12 space-y-24">
          {/* Section 1: The Epistemology of Price */}
          <section>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="mb-10 relative">
                  <div className="absolute -left-4 top-0 h-full w-1 bg-slate-200 rounded-full hidden md:block"></div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2 text-indigo-600 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">01</span>
                    Module
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">The Epistemology of Price</h2>
                  <div className="h-1.5 w-32 rounded-full bg-indigo-600" />
                  <p className="mt-4 text-xl text-slate-600 font-light leading-relaxed">The Illusion of the Scalar.</p>
                </div>
                
                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  In classical economics, price is a scalar—a single number representing the intersection of supply and demand ($100). In reality, price is a vector field. The current spot price tells you <strong>where</strong> the market is, but it tells you nothing about the <strong>texture</strong> of the market's beliefs.
                </p>
                
                <div className="bg-gradient-to-br from-indigo-50 to-slate-50 border-l-4 border-indigo-500 p-6 rounded-r-xl shadow-sm mb-8">
                  <p className="font-medium text-indigo-900 italic">
                    "The Spot Price is the collapsed wave function. The Option Chain is the uncollapsed probability cloud. To trade effectively, you must study the cloud, not just the lightning strike."
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 text-lg">The Hidden Variables</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold text-sm">
                        <Globe size={16}/> The Spot (S<sub>t</sub>)
                      </div>
                      <div className="text-xs text-slate-500">The current consensus value.</div>
                    </div>
                    <div className="p-4 bg-white border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2 text-fuchsia-600 font-bold text-sm">
                        <Activity size={16}/> The Volatility (σ)
                      </div>
                      <div className="text-xs text-slate-500">The speed of change.</div>
                    </div>
                    <div className="p-4 bg-white border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2 text-rose-600 font-bold text-sm">
                        <TrendingUp size={16}/> The Skew
                      </div>
                      <div className="text-xs text-slate-500">The fear of the downside.</div>
                    </div>
                    <div className="p-4 bg-white border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2 text-emerald-600 font-bold text-sm">
                        <Scale size={16}/> The Kurtosis
                      </div>
                      <div className="text-xs text-slate-500">The risk of extreme events.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Tale of Two Stocks Example */}
                <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[60px] opacity-20"></div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                    <BookOpen size={20} className="text-indigo-400"/> The Tale of Two Stocks
                  </h3>
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                      <div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Stock A: Utility Co.</div>
                        <div className="text-2xl font-mono text-emerald-400">$100.00</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">RND Shape</div>
                        <div className="text-sm text-slate-300">Tall & Narrow (Leptokurtic)</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Stock B: BioTech</div>
                        <div className="text-2xl font-mono text-rose-400">$100.00</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">RND Shape</div>
                        <div className="text-sm text-slate-300">Bimodal (Camel Humps)</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-700 text-sm text-slate-400 italic">
                    Both cost $100. But Stock B implies a 50% chance of $0 and a 50% chance of $200. The spot price masks the risk.
                  </div>
                </div>

                {/* Visual Comparison */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      <EyeOff size={20} />
                    </div>
                    <h3 className="font-bold text-slate-800">The Blind Spot of Linearity</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">
                    Standard "Linear Analysis" (Chart patterns, Moving Averages) operates in 2D. It ignores the Z-axis (Implied Volatility).
                  </p>
                  <div className="bg-slate-50 p-4 rounded-lg text-xs text-slate-500 border border-slate-100">
                    <strong>The Butterfly Advantage:</strong> By constructing a butterfly, you are essentially taking a core sample of the Z-axis at a specific price point, allowing you to profit from the <em>shape</em> of the distribution rather than the direction of the price.
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Section 2: Theoretical Foundations */}
          <section className="mt-32">
            <div className="mb-10 relative">
              <div className="absolute -left-4 top-0 h-full w-1 bg-slate-200 rounded-full hidden md:block"></div>
              <div className="text-xs font-bold uppercase tracking-widest mb-2 text-fuchsia-600 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-fuchsia-600 text-white flex items-center justify-center text-[10px]">02</span>
                Module
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Theoretical Foundations</h2>
              <div className="h-1.5 w-32 rounded-full bg-fuchsia-600" />
              <p className="mt-4 text-xl text-slate-600 font-light leading-relaxed">From Market Prices to Probability Distributions.</p>
            </div>

            {/* The Transformation Pipeline */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-slate-50 to-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-10">
                  <div className="bg-fuchsia-100 p-2 rounded-lg text-fuchsia-600">
                    <GitMerge size={24}/>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">The Transformation Pipeline</h3>
                    <p className="text-slate-500 text-sm">How raw market data becomes a probability map.</p>
                  </div>
                </div>
                
                <div className="relative">
                  {/* Connecting Line (Desktop) */}
                  <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
                  
                  <div className="grid md:grid-cols-3 gap-8 relative z-10">
                    {/* Step 1 */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
                      <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold mb-4 shadow-lg ring-4 ring-white">1</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Input</div>
                      <div className="text-slate-800 font-bold text-xl mb-2">Option Prices</div>
                      <div className="mb-3 px-3 py-1 bg-slate-50 rounded text-slate-600 font-mono text-xs border border-slate-200">C(K)</div>
                      <p className="text-xs text-slate-500 leading-relaxed">Discrete data points from the option chain (bid/ask quotes).</p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300 relative">
                      {/* Arrow overlay for mobile/desktop transition */}
                      <div className="absolute top-1/2 -left-4 hidden md:block text-slate-300 bg-white rounded-full p-1">
                        <ArrowRight size={16}/>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-fuchsia-600 text-white flex items-center justify-center font-bold mb-4 shadow-lg shadow-fuchsia-200 ring-4 ring-white">2</div>
                      <div className="text-xs font-bold text-fuchsia-600 uppercase tracking-wider mb-2">The Engine</div>
                      <div className="text-slate-800 font-bold text-xl mb-2">Differentiation</div>
                      <div className="mb-3 px-3 py-1 bg-fuchsia-50 rounded text-fuchsia-700 font-mono text-xs border border-fuchsia-100">∂²C / ∂K²</div>
                      <p className="text-xs text-slate-500 leading-relaxed">Calculating the curvature (convexity) of the price curve.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300 relative">
                      <div className="absolute top-1/2 -left-4 hidden md:block text-slate-300 bg-white rounded-full p-1">
                        <ArrowRight size={16}/>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mb-4 shadow-lg shadow-indigo-200 ring-4 ring-white">3</div>
                      <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Output</div>
                      <div className="text-slate-800 font-bold text-xl mb-2">Probability Density</div>
                      <div className="mb-3 px-3 py-1 bg-indigo-50 rounded text-indigo-700 font-mono text-xs border border-indigo-100">f(K)</div>
                      <p className="text-xs text-slate-500 leading-relaxed">The implied likelihood of the asset price ending at K.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Breeden-Litzenberger Theorem */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-12">
              <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
                <h3 className="text-2xl font-bold mb-2 relative z-10">The Breeden-Litzenberger Theorem (1978)</h3>
                <p className="text-slate-400 relative z-10">The mathematical link between curvature and probability.</p>
              </div>
              
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                  <div className="text-center w-full md:w-2/3">
                    <MathEq block={true}>
                      <span>f(K)</span>
                      <span className="mx-2">=</span>
                      <span>e<sup>rT</sup></span>
                      <span className="mx-2">·</span>
                      <MathFraction 
                        num={<span>∂<sup>2</sup>C(K, T)</span>} 
                        den={<span>∂K<sup>2</sup></span>} 
                      />
                    </MathEq>
                  </div>
                  <div className="text-slate-500 text-sm md:w-1/3 border-l-2 border-slate-200 pl-6">
                    <strong className="block text-slate-800 mb-1">In Plain English:</strong>
                    The probability density <MathEq>f(K)</MathEq> at a specific price <MathEq>K</MathEq> is exactly proportional to the <strong>convexity</strong> (second derivative) of the Call Option pricing function.
                  </div>
                </div>

                {/* Enhanced Intuition Section */}
                <div className="border-t border-slate-100 pt-8">
                  <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Zap size={18} className="text-amber-500"/> The Intuitive Proof (Digital Link)
                  </h4>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <div className="text-xs font-bold text-slate-400 uppercase mb-2">Step 1: The Spread</div>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        Buy Call(K) and Sell Call(K+1). This creates a <strong>Call Spread</strong>.
                      </p>
                      <div className="flex items-center gap-2 text-xs font-mono bg-white p-2 rounded border border-slate-200 text-indigo-600">
                        <ArrowRight size={12}/> Limit → <strong>Binary Option</strong> (Pays $1 if S &gt; K)
                      </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <div className="text-xs font-bold text-slate-400 uppercase mb-2">Step 2: The Butterfly</div>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        Buy Call Spread(K) and Sell Call Spread(K+1). This difference of differences creates the <strong>Butterfly</strong>.
                      </p>
                      <div className="flex items-center gap-2 text-xs font-mono bg-white p-2 rounded border border-slate-200 text-indigo-600">
                        <ArrowRight size={12}/> Limit → <strong>Density</strong> (Pays $1 if S = K)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* P vs Q Measures */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-800 text-lg">P-Measure (Physical)</h4>
                  <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">Real World</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-slate-400">•</span> Includes Risk Premium (Drift = μ)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-400">•</span> Subjective & Hard to Estimate
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-400">•</span> Used for: <strong>Risk Management (VaR)</strong>
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg text-white">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-white text-lg">Q-Measure (Risk-Neutral)</h4>
                  <span className="text-xs font-bold bg-fuchsia-500/20 text-fuchsia-300 px-2 py-1 rounded">Pricing World</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex gap-2">
                    <span className="text-slate-600">•</span> Risk Premium Removed (Drift = r)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-600">•</span> Implied directly from Prices
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-600">•</span> Used for: <strong>Derivatives Pricing</strong>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          {/* Section 3: The Butterfly Spread */}
          <section className="mt-32">
            <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-6">
              <div className="mb-10 relative">
                <div className="absolute -left-4 top-0 h-full w-1 bg-slate-200 rounded-full hidden md:block"></div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2 text-cyan-600 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px]">03</span>
                  Module
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">The Butterfly Spread</h2>
                <div className="h-1.5 w-32 rounded-full bg-cyan-600" />
                <p className="mt-4 text-xl text-slate-600 font-light leading-relaxed">The 'Atomic Unit' of Probability.</p>
              </div>
              <div className="mb-10 px-4 py-2 bg-cyan-50 text-cyan-700 rounded-lg text-sm font-semibold border border-cyan-100 flex items-center gap-2">
                <Scale size={16} />
                <span>Market Neutral • High Kurtosis</span>
              </div>
            </div>

            {/* Introduction Block */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">The Sharpshooter's Strategy</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  While a Straddle buys the entire market variance (betting on <em>movement</em>), a Butterfly Spread targets a specific price outcome (betting on <em>location</em>). It is a limited-risk, limited-profit strategy that combines a Bull Spread and a Bear Spread.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
                    <div className="text-cyan-600 mb-2">
                      <Anchor size={20} />
                    </div>
                    <h4 className="font-bold text-slate-700 text-sm mb-1">The Body</h4>
                    <p className="text-xs text-slate-500">Sold options. The "Pin" target. High Theta decay.</p>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
                    <div className="text-cyan-600 mb-2">
                      <Feather size={20} />
                    </div>
                    <h4 className="font-bold text-slate-700 text-sm mb-1">The Wings</h4>
                    <p className="text-xs text-slate-500">Bought options. The Protection. Caps risk.</p>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
                    <div className="text-cyan-600 mb-2">
                      <Crosshair size={20} />
                    </div>
                    <h4 className="font-bold text-slate-700 text-sm mb-1">The Payoff</h4>
                    <p className="text-xs text-slate-500">Very High Reward-to-Risk ratio (often 5:1 or 10:1).</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl p-6 text-white flex flex-col justify-center shadow-lg">
                <div className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Why Use It?</div>
                <ul className="space-y-3 text-sm font-medium">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div> Low Capital Requirement
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div> Defines Maximum Risk
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div> Exploits High Volatility
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div> Precise Probability Tool
                  </li>
                </ul>
              </div>
            </div>

            {/* Strategy Variants */}
            <div className="grid lg:grid-cols-12 gap-8 mb-12">
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Strategy Variants</h3>
                    <div className="flex bg-slate-200 rounded-lg p-1">
                      {['call', 'put', 'iron'].map((v) => (
                        <button 
                          key={v}
                          onClick={() => setVariant(v)}
                          className={`px-3 py-1 text-xs font-bold uppercase rounded-md transition-all ${
                            variant === v 
                              ? 'bg-white text-cyan-700 shadow-sm' 
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          {v} Fly
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {variant === 'call' && (
                      <div className="space-y-4 animate-fadeIn">
                        <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                          <span className="text-emerald-600 font-bold flex items-center gap-2">+1 Call</span>
                          <span className="font-mono text-slate-600">Strike K - ΔK</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                          <span className="text-rose-500 font-bold flex items-center gap-2">-2 Calls</span>
                          <span className="font-mono text-slate-800 font-bold">Strike K (Center)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-emerald-600 font-bold flex items-center gap-2">+1 Call</span>
                          <span className="font-mono text-slate-600">Strike K + ΔK</span>
                        </div>
                        <div className="mt-4 p-3 bg-cyan-50 text-cyan-800 text-xs rounded leading-relaxed">
                          <strong>Best for:</strong> Typical RND extraction. Uses Call liquidity. Debit spread.
                        </div>
                      </div>
                    )}
                    
                    {variant === 'put' && (
                      <div className="space-y-4 animate-fadeIn">
                        <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                          <span className="text-emerald-600 font-bold flex items-center gap-2">+1 Put</span>
                          <span className="font-mono text-slate-600">Strike K - ΔK</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                          <span className="text-rose-500 font-bold flex items-center gap-2">-2 Puts</span>
                          <span className="font-mono text-slate-800 font-bold">Strike K (Center)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-emerald-600 font-bold flex items-center gap-2">+1 Put</span>
                          <span className="font-mono text-slate-600">Strike K + ΔK</span>
                        </div>
                        <div className="mt-4 p-3 bg-cyan-50 text-cyan-800 text-xs rounded leading-relaxed">
                          <strong>Note:</strong> Synthetically identical to Call Fly at expiry (Put-Call Parity). Often used when Puts have better liquidity (OTM Puts).
                        </div>
                      </div>
                    )}
                    
                    {variant === 'iron' && (
                      <div className="space-y-4 animate-fadeIn">
                        <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                          <span className="text-emerald-600 font-bold flex items-center gap-2">+1 Put</span>
                          <span className="font-mono text-slate-600">Strike K - ΔK</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                          <span className="text-rose-500 font-bold flex items-center gap-2">-1 Put / -1 Call</span>
                          <span className="font-mono text-slate-800 font-bold">Strike K (Center)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-emerald-600 font-bold flex items-center gap-2">+1 Call</span>
                          <span className="font-mono text-slate-600">Strike K + ΔK</span>
                        </div>
                        <div className="mt-4 p-3 bg-cyan-50 text-cyan-800 text-xs rounded leading-relaxed">
                          <strong>Distinction:</strong> Credit spread. You sell the body (Straddle) and buy the wings (Strangle).
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-800 text-white border-none shadow-xl p-6 rounded-xl">
                  <h4 className="font-bold mb-4">The Profit Equation</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                      <span className="text-slate-400 text-sm">Max Profit</span>
                      <span className="font-mono text-emerald-400">ΔK - Debit Paid</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                      <span className="text-slate-400 text-sm">Max Risk</span>
                      <span className="font-mono text-rose-400">Debit Paid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Break Even</span>
                      <span className="font-mono text-cyan-400 text-sm">K ± (ΔK - Debit)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <BarChart2 className="text-cyan-500" /> Payoff Diagram
                    </h3>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">At Expiry</span>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="w-full h-64 bg-slate-50 rounded-lg border border-slate-200 relative overflow-hidden flex items-center justify-center mb-6 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
                      <svg viewBox="0 0 400 200" className="w-full h-full p-4">
                        {/* Grid Lines */}
                        <line x1="50" y1="180" x2="350" y2="180" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="200" y1="20" x2="200" y2="180" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />
                        
                        {/* Payoff Shape */}
                        <path d="M 50,180 L 120,180 L 200,40 L 280,180 L 350,180" fill="rgba(6, 182, 212, 0.1)" stroke="#0891b2" strokeWidth="3" strokeLinejoin="round" />
                        
                        {/* Labels */}
                        <text x="105" y="195" className="text-xs fill-slate-500 font-mono">K-ΔK</text>
                        <text x="185" y="195" className="text-xs fill-slate-800 font-bold font-mono">K (Pin)</text>
                        <text x="265" y="195" className="text-xs fill-slate-500 font-mono">K+ΔK</text>
                        <text x="210" y="40" className="text-xs fill-cyan-700 font-bold">Max Profit</text>
                        <text x="60" y="40" className="text-xs fill-slate-400">Profit Zone</text>
                        
                        {/* Break Even Points */}
                        <circle cx="120" cy="180" r="3" className="fill-rose-400" />
                        <circle cx="280" cy="180" r="3" className="fill-rose-400" />
                        <text x="110" y="165" className="text-[10px] fill-rose-500 font-bold">BEP</text>
                        <text x="270" y="165" className="text-[10px] fill-rose-500 font-bold">BEP</text>
                        
                        {/* Annotations */}
                        <circle cx="200" cy="40" r="4" className="fill-cyan-600" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-3 bg-slate-50 rounded text-xs text-slate-600 border border-slate-100">
                      <strong>The Pin Risk:</strong> Maximum profit is achieved only if the stock closes exactly at K. This is statistically rare.
                    </div>
                    <div className="p-3 bg-slate-50 rounded text-xs text-slate-600 border border-slate-100">
                      <strong>Finite Difference:</strong> 
                      <div className="mt-1 font-mono text-[10px] text-indigo-600">V<sub>fly</sub> ≈ P(S<sub>T</sub> = K)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* The Greeks Landscape */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="md:col-span-4 mb-2">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Activity className="text-fuchsia-500" /> The Greeks of the Fly
                </h3>
                <p className="text-slate-500 text-sm">How risk behaves across the "Tent".</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-fuchsia-300 transition-all group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center font-serif italic font-bold">Δ</div>
                  <h4 className="font-bold text-slate-700">Delta</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Neutral.</strong> It forms an "S-Curve". Positive on the left wing, Negative on the right wing. Zero exactly at K.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-fuchsia-300 transition-all group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center font-serif italic font-bold">Γ</div>
                  <h4 className="font-bold text-slate-700">Gamma</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Explosive.</strong> Massive positive Gamma at the center (price instability), negative Gamma at the wings.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-fuchsia-300 transition-all group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center font-serif italic font-bold">Θ</div>
                  <h4 className="font-bold text-slate-700">Theta</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Positive.</strong> Time is your best friend. Theta is highest at the body (Strike K) and accelerates near expiry.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-fuchsia-300 transition-all group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center font-serif italic font-bold">ν</div>
                  <h4 className="font-bold text-slate-700">Vega</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Usually Short.</strong> You generally want volatility to collapse (IV Crush) so the stock settles at K.
                </p>
              </div>
            </div>

            {/* Math Approximation */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <Minimize2 size={16} /> The Finite Difference Approximation
              </h4>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-4">
                    We approximate the continuous second derivative using the Central Difference method with a step size of <MathEq>ΔK</MathEq>. This mathematical bridge allows us to translate option prices directly into probability mass.
                  </p>
                </div>
                <div className="flex-1 w-full">
                  <MathEq block={true}>
                    <MathFraction 
                      num={<span>∂<sup>2</sup>C</span>} 
                      den={<span>∂K<sup>2</sup></span>} 
                    />
                    <span className="mx-2">≈</span>
                    <MathFraction
                      num={<span>C(K+ΔK) - 2C(K) + C(K-ΔK)</span>}
                      den={<span>(ΔK)<sup>2</sup></span>}
                    />
                  </MathEq>
                </div>
              </div>
            </div>
          </section>
          {/* Section 4: Trading Applications */}
          <section className="relative mt-32">
            <div className="absolute inset-0 bg-slate-900 skew-y-1 -mx-24 rounded-3xl -z-10 h-[110%]"></div>
            <div className="py-8">
              <div className="mb-10 relative">
                <div className="absolute -left-4 top-0 h-full w-1 bg-slate-200 rounded-full hidden md:block"></div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2 text-emerald-400 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-400 text-white flex items-center justify-center text-[10px]">04</span>
                  Module
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Trading Applications</h2>
                <div className="h-1.5 w-32 rounded-full bg-emerald-400" />
                <p className="mt-4 text-xl text-slate-600 font-light leading-relaxed">Alpha Generation via Distribution Analysis</p>
              </div>

              {/* Application Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { id: 'skew', label: 'Skew Trading', icon: TrendingUp },
                  { id: 'kurtosis', label: 'Kurtosis (Fly)', icon: Scale },
                  { id: 'event', label: 'Binary Events', icon: Zap },
                  { id: 'hedging', label: 'Tail Hedging', icon: Shield },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTradingTab(t.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
                      tradingTab === t.id 
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    <t.icon size={16} /> {t.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Content Area */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 min-h-[400px] transition-all">
                {tradingTab === 'skew' && (
                  <div className="animate-fadeIn grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Directional Volatility</div>
                      <h3 className="text-2xl font-bold text-white mb-4">Trading the "Smirk"</h3>
                      <p className="text-slate-300 leading-relaxed mb-6">
                        Equity markets typically exhibit a "Skew" where OTM Puts trade at higher IV than OTM Calls (Crash protection is expensive). When this skew gets too steep or inverts, opportunities arise.
                      </p>
                      <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700">
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                          <Briefcase size={16} /> The Trade Setup: Risk Reversal
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                            <span><strong>Bullish Skew:</strong> Sell Expensive Puts (Short Vol) / Buy Cheap Calls (Long Vol).</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                            <span><strong>Funded Play:</strong> The premium from selling the put often finances the call completely (Zero-Cost Collar).</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-emerald-900/10 p-6 rounded-xl border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-4">RND Logic</h4>
                      <p className="text-sm text-emerald-100/80 mb-4">
                        The market's RND is heavily "Left Skewed" (fat left tail). You believe the distribution is actually more symmetric or right-skewed.
                      </p>
                      <div className="h-32 w-full flex items-end justify-center gap-1 border-b border-emerald-500/30 pb-1">
                        {[10, 15, 25, 40, 60, 40, 25, 15, 10, 5].map((h, i) => (
                          <div 
                            key={i} 
                            style={{height: `${h}%`}} 
                            className={`w-6 rounded-t ${i < 4 ? 'bg-rose-500/80' : 'bg-emerald-500/50'}`}
                          ></div>
                        ))}
                      </div>
                      <div className="flex justify-between text-[10px] text-emerald-400 mt-1 font-mono">
                        <span>Puts (Overpriced)</span>
                        <span>Calls (Cheap)</span>
                      </div>
                    </div>
                  </div>
                )}

                {tradingTab === 'kurtosis' && (
                  <div className="animate-fadeIn grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Volatility Structure</div>
                      <h3 className="text-2xl font-bold text-white mb-4">Trading the "Peak"</h3>
                      <p className="text-slate-300 leading-relaxed mb-6">
                        Kurtosis measures the "peakedness" of the distribution. High Kurtosis (Leptokurtic) means probability is concentrated at the center and the extreme tails, with hollow shoulders.
                      </p>
                      <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700">
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                          <Briefcase size={16} /> The Trade Setup: Long/Short Fly
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                            <span><strong>Long Fly:</strong> You expect the price to pin. You are Long Kurtosis (betting on the peak).</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                            <span><strong>Short Condor/Fly:</strong> You expect a breakout. You are Short Kurtosis (betting on the shoulders/tails).</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-emerald-900/10 p-6 rounded-xl border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-4">RND Logic</h4>
                      <p className="text-sm text-emerald-100/80 mb-4">
                        You are comparing the market's implied distribution (Platykurtic/Flat) vs. your forecast (Leptokurtic/Peaked).
                      </p>
                      <div className="relative h-32 w-full border-b border-emerald-500/30">
                        {/* Flat Curve */}
                        <svg viewBox="0 0 100 50" className="absolute bottom-0 w-full h-full overflow-visible">
                          <path d="M 0,50 Q 50,0 100,50" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2" />
                          <path d="M 0,50 Q 50,-20 100,50" fill="none" stroke="#10b981" strokeWidth="2" />
                          <text x="50" y="-25" className="fill-emerald-400 text-[6px]">Your View</text>
                          <text x="50" y="20" className="fill-rose-400 text-[6px]">Market View</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {tradingTab === 'event' && (
                  <div className="animate-fadeIn grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Binary Outcomes</div>
                      <h3 className="text-2xl font-bold text-white mb-4">The Volatility Crush</h3>
                      <p className="text-slate-300 leading-relaxed mb-6">
                        Ahead of Earnings or FDA approvals, IV pumps up across the board. The moment the news hits, IV collapses ("Vol Crush").
                      </p>
                      <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700">
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                          <Briefcase size={16} /> The Trade Setup: Iron Fly
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                            <span><strong>Sell the ATM Straddle:</strong> Capture the highest Vega.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                            <span><strong>Buy Wings:</strong> Protect against the "10-sigma" move.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                            <span><strong>Goal:</strong> Stock moves <em>less</em> than the "Market Maker Move".</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-emerald-900/10 p-6 rounded-xl border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-4">RND Logic</h4>
                      <p className="text-sm text-emerald-100/80 mb-4">
                        The Market RND is too wide (High Variance). You bet that the realized distribution will be narrower.
                      </p>
                      <div className="flex items-center justify-center h-32 text-center">
                        <div className="space-y-2">
                          <div className="text-3xl font-bold text-white">IV &gt; RV</div>
                          <div className="text-xs text-emerald-400">Implied Vol &gt; Realized Vol</div>
                          <div className="text-[10px] text-slate-400">The "Overstatement" Premium</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {tradingTab === 'hedging' && (
                  <div className="animate-fadeIn grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Tail Risk</div>
                      <h3 className="text-2xl font-bold text-white mb-4">The "Cheap" Hedge</h3>
                      <p className="text-slate-300 leading-relaxed mb-6">
                        Buying naked puts for protection is expensive (due to Skew). A Put Butterfly allows you to target a specific "Crash Zone" (e.g., -15% to -25%) for a fraction of the cost.
                      </p>
                      <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700">
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                          <Shield size={16} /> The Trade Setup: Put Fly (OTM)
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                            <span><strong>Target:</strong> Place the body (short strikes) at the expected support level in a crash.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                            <span><strong>Benefit:</strong> High convexity. If the market crashes to that zone, the fly expands to max value.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-emerald-900/10 p-6 rounded-xl border border-emerald-500/20">
                      <h4 className="text-emerald-400 font-bold mb-4">RND Logic</h4>
                      <p className="text-sm text-emerald-100/80 mb-4">
                        You are isolating a specific slice of the left tail probability density that you believe is underpriced relative to the payout.
                      </p>
                      <div className="h-32 w-full flex items-end relative border-b border-emerald-500/30">
                        <div className="w-full h-full absolute bottom-0">
                          <svg viewBox="0 0 100 50" className="w-full h-full">
                            <path d="M 0,50 Q 20,40 30,10 Q 60,50 100,50" fill="none" stroke="#64748b" strokeWidth="1" />
                            <rect x="15" y="20" width="10" height="30" fill="rgba(16, 185, 129, 0.3)" />
                          </svg>
                        </div>
                        <div className="absolute left-[15%] bottom-[60%] text-[10px] text-emerald-400 font-bold">Target Zone</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* SPD vs RND Pro Tip */}
              <div className="mt-8 bg-indigo-900 rounded-xl p-6 border border-indigo-700 flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-indigo-800 p-4 rounded-full">
                  <RefreshCw size={24} className="text-indigo-300" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Subjective vs. Risk-Neutral Density (SPD vs RND)</h4>
                  <p className="text-indigo-200 text-sm leading-relaxed">
                    Alpha comes from the divergence between <strong>RND</strong> (What option prices imply) and <strong>SPD</strong> (Your proprietary forecast). If your model shows a higher probability density at Strike K than the RND implies, the Butterfly at K is statistically cheap.
                  </p>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden mt-12">
                <div className="p-6 bg-slate-100 border-b border-slate-200">
                  <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    <GitMerge size={20} /> Comparative Analysis
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold text-xs">
                      <tr>
                        <th className="p-4 border-b">Feature</th>
                        <th className="p-4 border-b text-emerald-600 bg-emerald-50">Long Butterfly</th>
                        <th className="p-4 border-b">Iron Condor</th>
                        <th className="p-4 border-b">Straddle</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-4 font-semibold text-slate-700">View</td>
                        <td className="p-4 text-emerald-700 bg-emerald-50/50">Precision / Specific Target</td>
                        <td className="p-4 text-slate-600">Range / "Somewhere inside"</td>
                        <td className="p-4 text-slate-600">Directionless Volatility</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold text-slate-700">Cost</td>
                        <td className="p-4 text-emerald-700 bg-emerald-50/50">Very Low (Debit)</td>
                        <td className="p-4 text-slate-600">Credit Received</td>
                        <td className="p-4 text-slate-600">Very High (Debit)</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold text-slate-700">Max Risk</td>
                        <td className="p-4 text-emerald-700 bg-emerald-50/50">Debit Paid</td>
                        <td className="p-4 text-slate-600">Wing Width - Credit</td>
                        <td className="p-4 text-slate-600">Unlimited (Short) / Debit (Long)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Methodology Deep Dive */}
          <section className="mt-32">
            <div className="mb-10 relative">
              <div className="absolute -left-4 top-0 h-full w-1 bg-slate-200 rounded-full hidden md:block"></div>
              <div className="text-xs font-bold uppercase tracking-widest mb-2 text-amber-600 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">05</span>
                Module
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Extraction Methodologies</h2>
              <div className="h-1.5 w-32 rounded-full bg-amber-600" />
              <p className="mt-4 text-xl text-slate-600 font-light leading-relaxed">The art of smoothing the smile.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="group bg-white rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-amber-400 shadow-md border border-slate-100">
                <div className="mb-5 inline-flex p-3 rounded-xl bg-slate-50 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <Code size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Shimko's Method (1993)</h3>
                <div className="text-slate-600 leading-relaxed">
                  <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-600">
                    <li><strong>Invert Black-Scholes:</strong> Convert market prices <MathEq>C(K)</MathEq> into Implied Volatility points <MathEq>σ(K)</MathEq>.</li>
                    <li><strong>Interpolate:</strong> Fit a quadratic or cubic spline to the <MathEq>σ(K)</MathEq> smile. This creates a smooth continuous function.</li>
                    <li><strong>Re-Price:</strong> Feed the smoothed <MathEq>σ(K)</MathEq> back into Black-Scholes to get a dense set of Call prices.</li>
                    <li><strong>Differentiate:</strong> Apply the Breeden-Litzenberger formula to the smoothed prices.</li>
                  </ol>
                </div>
              </div>

              <div className="group bg-white rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-amber-400 shadow-md border border-slate-100">
                <div className="mb-5 inline-flex p-3 rounded-xl bg-slate-50 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Malz's Delta Space (FX)</h3>
                <div className="text-slate-600 leading-relaxed">
                  <p className="text-sm text-slate-600 mb-4">Common in Forex markets where strikes are quoted in Delta (Δ) rather than price.</p>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <div className="font-bold text-slate-700 text-xs uppercase">Risk Reversal (RR)</div>
                      <div className="text-xs text-slate-500">Measures Skew (Slope at ATM).</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <div className="font-bold text-slate-700 text-xs uppercase">Strangle (Butterfly)</div>
                      <div className="text-xs text-slate-500">Measures Kurtosis (Curvature at ATM).</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


        </main>
    </ArticleFrame>
  );
}