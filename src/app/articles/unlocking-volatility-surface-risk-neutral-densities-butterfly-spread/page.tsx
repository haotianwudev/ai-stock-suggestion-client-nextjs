'use client';

import React, { useState } from 'react';
import { BookOpen, TrendingUp, Activity, BarChart2, GitMerge, Zap, ArrowRight, Target, Layers, Brain, AlertTriangle, Code, Scale, Clock, Minimize2, Shield, Briefcase, RefreshCw, CheckCircle2, Anchor, Feather, Crosshair, Eye, EyeOff, Globe, Sigma, Divide, Music } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

const MathFraction = ({ num, den }: { num: React.ReactNode; den: React.ReactNode }) => (
  <span className="inline-block align-middle text-center mx-1">
    <span className="block border-b border-slate-400 dark:border-slate-500 pb-0.5 mb-0.5">{num}</span>
    <span className="block pt-0.5">{den}</span>
  </span>
);

export default function ImpliedDistributionsTutor() {
  const [variant, setVariant] = useState('call');
  const [tradingTab, setTradingTab] = useState('skew');
  
  return (
    <ArticleFrame slug="unlocking-volatility-surface-risk-neutral-densities-butterfly-spread">
      <InfographicSlot alt="Volatility Surface and Risk-Neutral Densities Infographic" />
      <main className="max-w-4xl mx-auto px-6 pb-20 pt-12 space-y-24">
          
        {/* Section 1: The Epistemology of Price */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">The Epistemology of Price</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light">The Illusion of the Scalar.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                In classical economics, price is a scalar—a single number representing the intersection of supply and demand ($100). In reality, price is a vector field. The current spot price tells you <strong className="font-bold">where</strong> the market is, but it tells you nothing about the <strong className="font-bold">texture</strong> of the market's beliefs.
              </p>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-6 mb-8">
                <p className="font-serif italic text-slate-900 dark:text-white text-lg">
                  "The Spot Price is the collapsed wave function. The Option Chain is the uncollapsed probability cloud. To trade effectively, you must study the cloud, not just the lightning strike."
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold font-serif text-slate-800 dark:text-slate-200 text-lg">The Hidden Variables</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-[#A8672E] dark:text-[#D08F52] font-bold text-sm">
                      <Globe size={16}/> The Spot (S<sub>t</sub>)
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">The current consensus value.</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-[#1D8A70] dark:text-[#3CBF9C] font-bold text-sm">
                      <Activity size={16}/> The Volatility (σ)
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">The speed of change.</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-[#BC4128] dark:text-[#E2694A] font-bold text-sm">
                      <TrendingUp size={16}/> The Skew
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">The fear of the downside.</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-[#A8672E] dark:text-[#D08F52] font-bold text-sm">
                      <Scale size={16}/> The Kurtosis
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">The risk of extreme events.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Tale of Two Stocks Example */}
              <div className="bg-slate-900 dark:bg-black/50 rounded-2xl p-8 border border-slate-800">
                <h3 className="text-xl font-bold font-serif text-white mb-6 flex items-center gap-2">
                  <BookOpen size={20} className="text-[#A8672E]"/> The Tale of Two Stocks
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Stock A: Utility Co.</div>
                      <div className="text-2xl font-mono text-[#1D8A70]">$100.00</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">RND Shape</div>
                      <div className="text-sm text-slate-300">Tall & Narrow (Leptokurtic)</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Stock B: BioTech</div>
                      <div className="text-2xl font-mono text-[#BC4128]">$100.00</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">RND Shape</div>
                      <div className="text-sm text-slate-300">Bimodal (Camel Humps)</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-800 text-sm text-slate-400 italic">
                  Both cost $100. But Stock B implies a 50% chance of $0 and a 50% chance of $200. The spot price masks the risk.
                </div>
              </div>

              {/* Visual Comparison */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-slate-700 dark:text-slate-300">
                    <EyeOff size={20} />
                  </div>
                  <h3 className="font-bold font-serif text-slate-900 dark:text-white">The Blind Spot of Linearity</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  Standard "Linear Analysis" (Chart patterns, Moving Averages) operates in 2D. It ignores the Z-axis (Implied Volatility).
                </p>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-xs text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white font-bold">The Butterfly Advantage:</strong> By constructing a butterfly, you are essentially taking a core sample of the Z-axis at a specific price point, allowing you to profit from the <em>shape</em> of the distribution rather than the direction of the price.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Theoretical Foundations */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">Theoretical Foundations</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light">From Market Prices to Probability Distributions.</p>
          </div>

          <div className="bg-[#14171B] dark:bg-[#05070A] rounded-2xl shadow-xl border border-[#A8672E]/20 overflow-hidden mb-12">
            <div className="bg-black/50 p-8 border-b border-white/5">
              <h3 className="text-2xl font-serif font-bold mb-2 text-white">The Breeden-Litzenberger Theorem (1978)</h3>
              <p className="text-slate-400">The mathematical link between curvature and probability.</p>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                <div className="text-center w-full md:w-2/3 text-white text-xl font-mono">
                  <span>f(K) = e<sup>rT</sup> · </span>
                  <MathFraction 
                    num={<span>∂<sup>2</sup>C(K, T)</span>} 
                    den={<span>∂K<sup>2</sup></span>} 
                  />
                </div>
                <div className="text-slate-400 text-sm md:w-1/3 border-l-2 border-slate-800 pl-6">
                  <strong className="block text-white mb-1">In Plain English:</strong>
                  The probability density <span className="font-mono text-xs">f(K)</span> at a specific price <span className="font-mono text-xs">K</span> is exactly proportional to the <strong className="text-[#D08F52]">convexity</strong> (second derivative) of the Call Option pricing function.
                </div>
              </div>
            </div>
          </div>

          <ComparisonGrid>
            <ComparisonCard tone="neutral" title="P-Measure (Physical)">
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="opacity-50">•</span> Includes Risk Premium (Drift = μ)
                </li>
                <li className="flex gap-2">
                  <span className="opacity-50">•</span> Subjective & Hard to Estimate
                </li>
                <li className="flex gap-2">
                  <span className="opacity-50">•</span> Used for: <strong className="font-bold">Risk Management (VaR)</strong>
                </li>
              </ul>
            </ComparisonCard>
            <ComparisonCard tone="pos" title="Q-Measure (Risk-Neutral)">
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="opacity-50">•</span> Risk Premium Removed (Drift = r)
                </li>
                <li className="flex gap-2">
                  <span className="opacity-50">•</span> Implied directly from Prices
                </li>
                <li className="flex gap-2">
                  <span className="opacity-50">•</span> Used for: <strong className="font-bold">Derivatives Pricing</strong>
                </li>
              </ul>
            </ComparisonCard>
          </ComparisonGrid>
        </section>

        {/* Section 3: The Butterfly Spread */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">The Butterfly Spread</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light">The 'Atomic Unit' of Probability.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4">The Sharpshooter's Strategy</h3>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                While a Straddle buys the entire market variance (betting on <em>movement</em>), a Butterfly Spread targets a specific price outcome (betting on <em>location</em>). It is a limited-risk, limited-profit strategy that combines a Bull Spread and a Bear Spread.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                  <div className="text-[#A8672E] dark:text-[#D08F52] mb-2"><Anchor size={20} /></div>
                  <h4 className="font-bold font-serif text-slate-900 dark:text-white text-sm mb-1">The Body</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Sold options. The "Pin" target. High Theta decay.</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                  <div className="text-[#A8672E] dark:text-[#D08F52] mb-2"><Feather size={20} /></div>
                  <h4 className="font-bold font-serif text-slate-900 dark:text-white text-sm mb-1">The Wings</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Bought options. The Protection. Caps risk.</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                  <div className="text-[#A8672E] dark:text-[#D08F52] mb-2"><Crosshair size={20} /></div>
                  <h4 className="font-bold font-serif text-slate-900 dark:text-white text-sm mb-1">The Payoff</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Very High Reward-to-Risk ratio (often 5:1 or 10:1).</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="font-bold font-serif text-slate-900 dark:text-white">Strategy Variants</h3>
                  <div className="flex bg-slate-200 dark:bg-slate-800 rounded-lg p-1">
                    {['call', 'put', 'iron'].map((v) => (
                      <button 
                        key={v}
                        onClick={() => setVariant(v)}
                        className={`px-3 py-1 text-xs font-bold uppercase rounded-md transition-all ${
                          variant === v 
                            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-300'
                        }`}
                      >
                        {v} Fly
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="p-6">
                  {variant === 'call' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">+1 Call</span>
                        <span className="font-mono text-slate-600 dark:text-slate-400">Strike K - ΔK</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="text-[#BC4128] dark:text-[#E2694A] font-bold">-2 Calls</span>
                        <span className="font-mono text-slate-900 dark:text-white font-bold">Strike K (Center)</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">+1 Call</span>
                        <span className="font-mono text-slate-600 dark:text-slate-400">Strike K + ΔK</span>
                      </div>
                      <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded leading-relaxed">
                        <strong className="text-slate-900 dark:text-white">Best for:</strong> Typical RND extraction. Uses Call liquidity. Debit spread.
                      </div>
                    </div>
                  )}
                  
                  {variant === 'put' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">+1 Put</span>
                        <span className="font-mono text-slate-600 dark:text-slate-400">Strike K - ΔK</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="text-[#BC4128] dark:text-[#E2694A] font-bold">-2 Puts</span>
                        <span className="font-mono text-slate-900 dark:text-white font-bold">Strike K (Center)</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">+1 Put</span>
                        <span className="font-mono text-slate-600 dark:text-slate-400">Strike K + ΔK</span>
                      </div>
                      <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded leading-relaxed">
                        <strong className="text-slate-900 dark:text-white">Note:</strong> Synthetically identical to Call Fly at expiry. Often used for better liquidity (OTM Puts).
                      </div>
                    </div>
                  )}
                  
                  {variant === 'iron' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">+1 Put</span>
                        <span className="font-mono text-slate-600 dark:text-slate-400">Strike K - ΔK</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="text-[#BC4128] dark:text-[#E2694A] font-bold">-1 Put / -1 Call</span>
                        <span className="font-mono text-slate-900 dark:text-white font-bold">Strike K (Center)</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">+1 Call</span>
                        <span className="font-mono text-slate-600 dark:text-slate-400">Strike K + ΔK</span>
                      </div>
                      <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded leading-relaxed">
                        <strong className="text-slate-900 dark:text-white">Distinction:</strong> Credit spread. You sell the body (Straddle) and buy the wings (Strangle).
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-[#14171B] dark:bg-[#05070A] text-white border border-[#A8672E]/20 p-6 rounded-xl">
                <h4 className="font-serif font-bold mb-4">The Profit Equation</h4>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Max Profit</span>
                    <span className="text-[#1D8A70] dark:text-[#3CBF9C]">ΔK - Debit Paid</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Max Risk</span>
                    <span className="text-[#BC4128] dark:text-[#E2694A]">Debit Paid</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Break Even</span>
                    <span className="text-[#A8672E] dark:text-[#D08F52]">K ± (ΔK - Debit)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold font-serif text-slate-900 dark:text-white">Payoff Diagram</h3>
                  <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500 dark:text-slate-400">At Expiry</span>
                </div>
                
                <div className="flex-grow">
                  <div className="w-full h-64 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 relative overflow-hidden flex items-center justify-center mb-6 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]">
                    <svg viewBox="0 0 400 200" className="w-full h-full p-4">
                      {/* Grid Lines */}
                      <line x1="50" y1="180" x2="350" y2="180" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="200" y1="20" x2="200" y2="180" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" className="dark:stroke-slate-700" />
                      
                      {/* Payoff Shape */}
                      <path d="M 50,180 L 120,180 L 200,40 L 280,180 L 350,180" fill="rgba(168, 103, 46, 0.1)" stroke="#A8672E" strokeWidth="3" strokeLinejoin="round" />
                      
                      {/* Labels */}
                      <text x="105" y="195" className="text-xs fill-slate-500 font-mono">K-ΔK</text>
                      <text x="185" y="195" className="text-xs fill-slate-800 dark:fill-slate-200 font-bold font-mono">K (Pin)</text>
                      <text x="265" y="195" className="text-xs fill-slate-500 font-mono">K+ΔK</text>
                      <text x="210" y="40" className="text-xs fill-[#A8672E] font-bold">Max Profit</text>
                      
                      {/* Break Even Points */}
                      <circle cx="120" cy="180" r="3" className="fill-[#BC4128]" />
                      <circle cx="280" cy="180" r="3" className="fill-[#BC4128]" />
                      <text x="110" y="165" className="text-[10px] fill-[#BC4128] font-bold">BEP</text>
                      <text x="270" y="165" className="text-[10px] fill-[#BC4128] font-bold">BEP</text>
                      
                      {/* Annotations */}
                      <circle cx="200" cy="40" r="4" className="fill-[#A8672E]" />
                    </svg>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-white">The Pin Risk:</strong> Maximum profit is achieved only if the stock closes exactly at K. This is statistically rare.
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-white">Finite Difference:</strong> 
                    <div className="mt-1 font-mono text-[10px] text-[#A8672E] dark:text-[#D08F52]">V<sub>fly</sub> ≈ P(S<sub>T</sub> = K)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Trading Applications */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">Trading Applications</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light">Alpha Generation via Distribution Analysis</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: 'skew', label: 'Skew Trading' },
              { id: 'kurtosis', label: 'Kurtosis (Fly)' },
              { id: 'event', label: 'Binary Events' },
              { id: 'hedging', label: 'Tail Hedging' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTradingTab(t.id)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                  tradingTab === t.id 
                    ? 'bg-[#1D8A70] dark:bg-[#3CBF9C] text-white border-[#1D8A70] dark:border-[#3CBF9C]' 
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 min-h-[400px]">
            {tradingTab === 'skew' && (
              <div className="animate-fadeIn grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4">Trading the "Smirk"</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                    Equity markets typically exhibit a "Skew" where OTM Puts trade at higher IV than OTM Calls (Crash protection is expensive). When this skew gets too steep or inverts, opportunities arise.
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h4 className="text-slate-900 dark:text-white font-serif font-bold mb-3">The Trade Setup: Risk Reversal</h4>
                    <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-400">
                      <li>• <strong className="font-bold text-slate-900 dark:text-white">Bullish Skew:</strong> Sell Expensive Puts (Short Vol) / Buy Cheap Calls (Long Vol).</li>
                      <li>• <strong className="font-bold text-slate-900 dark:text-white">Funded Play:</strong> The premium from selling the put often finances the call completely (Zero-Cost Collar).</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {tradingTab === 'kurtosis' && (
              <div className="animate-fadeIn grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4">Trading the "Peak"</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                    Kurtosis measures the "peakedness" of the distribution. High Kurtosis (Leptokurtic) means probability is concentrated at the center and the extreme tails, with hollow shoulders.
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h4 className="text-slate-900 dark:text-white font-serif font-bold mb-3">The Trade Setup: Long/Short Fly</h4>
                    <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-400">
                      <li>• <strong className="font-bold text-slate-900 dark:text-white">Long Fly:</strong> You expect the price to pin. You are Long Kurtosis (betting on the peak).</li>
                      <li>• <strong className="font-bold text-slate-900 dark:text-white">Short Condor/Fly:</strong> You expect a breakout. You are Short Kurtosis (betting on the shoulders).</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {tradingTab === 'event' && (
              <div className="animate-fadeIn grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4">The Volatility Crush</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                    Ahead of Earnings or FDA approvals, IV pumps up across the board. The moment the news hits, IV collapses ("Vol Crush").
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h4 className="text-slate-900 dark:text-white font-serif font-bold mb-3">The Trade Setup: Iron Fly</h4>
                    <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-400">
                      <li>• <strong className="font-bold text-slate-900 dark:text-white">Sell the ATM Straddle:</strong> Capture the highest Vega.</li>
                      <li>• <strong className="font-bold text-slate-900 dark:text-white">Buy Wings:</strong> Protect against the "10-sigma" move.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {tradingTab === 'hedging' && (
              <div className="animate-fadeIn grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4">The "Cheap" Hedge</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                    Buying naked puts for protection is expensive (due to Skew). A Put Butterfly allows you to target a specific "Crash Zone" (e.g., -15% to -25%) for a fraction of the cost.
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <h4 className="text-slate-900 dark:text-white font-serif font-bold mb-3">The Trade Setup: Put Fly (OTM)</h4>
                    <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-400">
                      <li>• <strong className="font-bold text-slate-900 dark:text-white">Target:</strong> Place the body (short strikes) at the expected support level in a crash.</li>
                      <li>• <strong className="font-bold text-slate-900 dark:text-white">Benefit:</strong> High convexity. If the market crashes to that zone, the fly expands to max value.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 5: Methodology Deep Dive */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">Extraction Methodologies</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light">The art of smoothing the smile.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-4">Shimko's Method (1993)</h3>
              <ol className="list-decimal pl-5 space-y-4 text-sm text-slate-700 dark:text-slate-300">
                <li><strong className="font-bold text-slate-900 dark:text-white">Invert Black-Scholes:</strong> Convert market prices into Implied Volatility points.</li>
                <li><strong className="font-bold text-slate-900 dark:text-white">Interpolate:</strong> Fit a quadratic or cubic spline to the smile.</li>
                <li><strong className="font-bold text-slate-900 dark:text-white">Re-Price:</strong> Feed the smoothed vol back into Black-Scholes to get dense prices.</li>
                <li><strong className="font-bold text-slate-900 dark:text-white">Differentiate:</strong> Apply the Breeden-Litzenberger formula.</li>
              </ol>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-4">Malz's Delta Space (FX)</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">Common in Forex markets where strikes are quoted in Delta (Δ) rather than price.</p>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white text-xs uppercase mb-1">Risk Reversal (RR)</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Measures Skew (Slope at ATM).</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white text-xs uppercase mb-1">Strangle (Butterfly)</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Measures Kurtosis (Curvature at ATM).</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </ArticleFrame>
  );
}