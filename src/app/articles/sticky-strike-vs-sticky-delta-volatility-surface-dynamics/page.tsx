'use client';

import React, { useState } from 'react';
import { ArrowLeft, Maximize2, BookOpen, Anchor, Activity, TrendingUp, AlertTriangle, Calculator, Sigma, CheckCircle2, XCircle, Layers, Scale, Search, MoveRight, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function StickyStrikeVsDeltaArticle() {
  // Simulator state
  const [spot, setSpot] = useState(100);
  const [skewSlope, setSkewSlope] = useState(-0.2);
  const baseVol = 20;

  // Generate simulator data
  const strikes = Array.from({ length: 21 }, (_, i) => 80 + i * 2);
  const data = strikes.map(strike => {
    const initialMoneyness = strike / 100;
    const initialVol = baseVol + (initialMoneyness - 1) * skewSlope * 100;
    const stickyStrikeVol = initialVol;
    const currentMoneyness = strike / spot;
    const stickyDeltaVol = baseVol + (currentMoneyness - 1) * skewSlope * 100;
    return {
      strike,
      "Sticky Strike": parseFloat(stickyStrikeVol.toFixed(2)),
      "Sticky Delta": parseFloat(stickyDeltaVol.toFixed(2)),
    };
  });

  return (
    <ArticleFrame slug="sticky-strike-vs-sticky-delta-volatility-surface-dynamics">
      <div className="pb-24">
        <InfographicSlot alt="Sticky Strike vs Sticky Delta Infographic" />
        
        <div className="max-w-4xl mx-auto">
          {/* Section 1 */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Geometry of Market Risk</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              In the Black-Scholes world, volatility (σ) is treated as a constant parameter. However, in reality, 
              volatility is a dynamic surface that moves as the underlying price (S) moves. This creates a significant 
              problem: if you calculate your hedge (Delta) assuming volatility is constant, you are missing a massive 
              component of your risk.
            </p>
            
            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/20 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-6 my-8 rounded-r-lg">
              <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-3 font-serif">The Total Derivative</h3>
              <p className="text-indigo-800 dark:text-indigo-200 mb-6 leading-relaxed">
                To calculate the <em>true</em> risk of an option, we must use the <strong>Total Derivative</strong>. 
                This mathematical concept states that the change in option price isn't just about the spot price moving; 
                it's also about the volatility changing <em>because</em> the spot price moved.
              </p>
              
              <FormulaPanel 
                title="The Total Derivative"
                formula="\\frac{dV}{dS} = \\frac{\\partial V}{\\partial S} + \\frac{\\partial V}{\\partial \\Sigma} \\times \\frac{d\\Sigma}{dS}"
                legend={[
                  { label: "dV/dS", value: "True Total Delta" },
                  { label: "\\partial V/\\partial S", value: "Model Delta (Black-Scholes)" },
                  { label: "\\partial V/\\partial \\Sigma", value: "Vega" },
                  { label: "d\\Sigma/dS", value: "Asset-Vol Correlation" }
                ]}
              />
            </div>
            
            <ComparisonGrid>
              <ComparisonCard title="Model Delta (∂V/∂S)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">The standard Delta found in textbooks. It assumes Σ is frozen.</p>
              </ComparisonCard>
              <ComparisonCard title="Vega (∂V/∂Σ)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">How much money you make/lose if volatility rises by 1 point.</p>
              </ComparisonCard>
              <ComparisonCard title="Asset-Vol Correlation (dΣ/dS)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">The link. Does vol crash when the market rallies? (Usually yes).</p>
              </ComparisonCard>
            </ComparisonGrid>
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">The "Shadow Delta" Trap</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">The term Vega × (dΣ/dS) acts as a "Shadow Delta." It modifies your effective exposure.</p>
            
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 font-serif text-xl">
                <Scale size={20} className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]"/>
                Trader's Intuition: The Long Call Example
              </h4>
              <p className="mb-4 text-slate-600 dark:text-slate-400">Suppose you own a Call option on the S&P 500.</p>
              <ul className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
                <li className="flex gap-4">
                  <span className="font-bold text-slate-900 dark:text-white w-24 shrink-0">Scenario:</span>
                  <span>The market rallies +1%.</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-slate-900 dark:text-white w-24 shrink-0">BS Delta:</span>
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Make money on Delta.</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-slate-900 dark:text-white w-24 shrink-0">Reality:</span>
                  <span>When S&P 500 rallies, panic subsides, and <strong>Volatility Drops</strong> (dΣ/dS {'<'} 0).</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-slate-900 dark:text-white w-24 shrink-0">Net P&L:</span>
                  <span>You make money on price, but <strong>lose money on Vega</strong>.</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-lg font-bold text-center border border-indigo-200 dark:border-indigo-800">
                Conclusion: Your TRUE delta is LOWER than the Black-Scholes model says.
              </div>
            </div>
          </section>
          
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          
          {/* Section 2 */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Anchor className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Regime 1: Sticky Strike</h2>
            </div>
            
            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/20 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-6 mb-8 rounded-r-lg">
              <p className="text-indigo-900 dark:text-indigo-300 font-bold font-serif text-xl mb-3">The "Painted on the Wall" Theory</p>
              <p className="text-indigo-800 dark:text-indigo-200 leading-relaxed">
                Imagine the volatility skew is a physical curve painted onto the price axis. It is static. It does not move. 
                When the stock price (S) moves, we simply look up the volatility at the fixed strike (K) on this unmoving curve.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mt-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif">The Mechanics</h3>
                <p className="mb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
                  Under Sticky Strike, implied volatility Σ(K, S) is a function of Strike K only.
                </p>
                <FormulaPanel 
                  title="Sticky Strike Math"
                  formula="\\frac{\\partial \\Sigma(K, S)}{\\partial S} = 0"
                  legend={[
                    { label: "Result", value: "Market Rally = ATM Vol Drop" }
                  ]}
                />
                <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                  Even though the curve is fixed, the <em>At-The-Money (ATM)</em> volatility changes.
                  If the market rallies (moves right) on a downward sloping skew, the new ATM strike is higher, 
                  which has a lower volatility on the fixed curve.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]" size={20} />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Trader's Intuition</h3>
                  </div>
                  <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                    <li className="flex gap-3">
                      <span className="font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">1.</span>
                      <span>
                        <strong>Psychological Anchors:</strong> Investors often view round numbers ($100, $150) as 
                        permanent support/resistance levels.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">2.</span>
                      <span>
                        <strong>Range-Bound Markets:</strong> This regime works best when the market is chopping sideways.
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800/50">
                  <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-3 font-serif">The Skew Trap</h4>
                  <p className="text-amber-800 dark:text-amber-200 mb-3 text-sm">
                    Trading a <strong>Risk Reversal</strong> expecting Sticky Strike:
                  </p>
                  <div className="flex items-center gap-3 text-sm mb-2 text-amber-900 dark:text-amber-200">
                    <span className="font-bold">Scenario: Rally</span>
                    <ArrowRight size={16} className="text-amber-700"/>
                    <span>You profit on Delta.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-amber-900 dark:text-amber-200">
                    <span className="font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Risk</span>
                    <ArrowRight size={16} className="text-amber-700"/>
                    <span>If regime flips to Sticky Delta, Call vol collapses.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          
          {/* Section 3 */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Regime 2: Sticky Delta</h2>
            </div>
            
            <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/20 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-6 mb-8 rounded-r-lg">
              <p className="text-rose-900 dark:text-rose-300 font-bold font-serif text-xl mb-3">The "Floating Smile" Theory</p>
              <p className="text-rose-800 dark:text-rose-200 leading-relaxed">
                Imagine the volatility skew is a kite tied to the stock price. As the stock price moves, the entire curve 
                floats along with it. Volatility is not determined by the absolute price, but by how far the price is 
                from the current spot (Moneyness).
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mt-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif">The Mechanics</h3>
                <p className="mb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
                  Under Sticky Delta, implied volatility is a function of Moneyness (M = K/S).
                </p>
                
                <FormulaPanel 
                  title="Sticky Delta Math"
                  formula="\\frac{d\\Sigma}{dS} = -\\frac{K}{S^2} \\times \\frac{\\partial \\Sigma}{\\partial M}"
                  legend={[
                    { label: "Result", value: "Curve Shift" }
                  ]}
                />
                
                <div className="space-y-4 mt-8">
                  <div className="flex gap-4">
                    <MoveRight className="text-[#BC4128] dark:text-[#E2694A] shrink-0 mt-1" size={20}/>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">Horizontal Shift</strong>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        If Spot moves +10%, the entire Vol curve moves +10% to the right. The "ATM Vol" remains constant.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]" size={20} />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Why FX Markets Love This</h3>
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
                    <p>
                      In Foreign Exchange, there is no natural "Up" or "Down" (is USD/JPY going up or is JPY/USD going down?).
                    </p>
                    <p>
                      Therefore, volatility is quoted in <strong>Delta</strong>. By definition, if the 
                      spot moves, the "25-Delta" strike changes location. This structure <em>forces</em> a Sticky Delta regime.
                    </p>
                  </div>
                </div>
                
                <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800/50">
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-4 font-serif">The Hedging Implication (Short Put)</h4>
                  <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-200 mb-2">
                    <span>Black-Scholes Delta</span>
                    <span className="font-mono font-bold">-0.40</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-200 mb-3 border-b border-emerald-200 dark:border-emerald-800 pb-3">
                    <span>Shadow Delta Adj.</span>
                    <span className="font-mono font-bold">+0.05</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-900 dark:text-emerald-300 font-bold text-lg">
                    <span>Total Delta</span>
                    <span className="font-mono">-0.35</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          
          {/* Simulator */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 font-serif">Interactive Simulator: Strike vs. Delta</h2>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-8 grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 space-y-8">
                  <div className="space-y-3">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                      <label>Spot Price</label>
                      <span>${spot}</span>
                    </div>
                    <input 
                      type="range" 
                      min="80" 
                      max="120" 
                      value={spot} 
                      onChange={(e) => setSpot(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400"
                    />
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>$80 (Crash)</span>
                      <span>$120 (Rally)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                      <label>Skew Slope</label>
                      <span>{skewSlope}</span>
                    </div>
                    <input 
                      type="range" 
                      min="-0.5" 
                      max="0" 
                      step="0.1"
                      value={skewSlope} 
                      onChange={(e) => setSkewSlope(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500 dark:accent-rose-400"
                    />
                  </div>
                  
                  <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-[#A8672E] dark:bg-[#D08F52]"></div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">Sticky Strike</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 pl-5">The curve is rigid. Vol at $100 remains fixed even if Spot goes to $90.</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-[#BC4128] dark:bg-[#E2694A]"></div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">Sticky Delta</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 pl-5">The curve floats. ATM Vol follows the spot price.</p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2 h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                      <XAxis 
                        dataKey="strike" 
                        label={{ value: 'Strike Price (K)', position: 'insideBottom', offset: -10, fill: '#64748b' }} 
                        domain={[80, 120]}
                        type="number"
                        tick={{ fill: '#64748b' }}
                      />
                      <YAxis 
                        label={{ value: 'Implied Vol (%)', angle: -90, position: 'insideLeft', fill: '#64748b' }} 
                        domain={[10, 30]}
                        tick={{ fill: '#64748b' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '12px', 
                          border: '1px solid #334155', 
                          backgroundColor: '#0f172a',
                          color: '#f8fafc',
                          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                        }}
                      />
                      <ReferenceLine x={spot} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: "Current Spot", fill: "#94a3b8", position: "top" }} />
                      <Line 
                        type="monotone" 
                        dataKey="Sticky Strike" 
                        stroke="#6366f1" 
                        strokeWidth={4} 
                        dot={false}
                        activeDot={{ r: 8 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Sticky Delta" 
                        stroke="#f43f5e" 
                        strokeWidth={4} 
                        dot={false}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 4 */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 font-serif">The Skew Stickiness Ratio (SSR)</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Real markets exist on a spectrum between Sticky Strike and Sticky Delta. The SSR quantifies exactly where we are:
            </p>
            
            <FormulaPanel 
              title="Skew Stickiness Ratio"
              formula="SSR = \\frac{\\Delta ATM\\ Vol}{\\Delta Implied\\ by\\ Sticky\\ Strike}"
            />
            
            <ComparisonGrid>
              <ComparisonCard title="SSR = 0" tone="neutral">
                <p className="font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] text-lg">Pure Sticky Delta</p>
              </ComparisonCard>
              <ComparisonCard title="SSR = 1" tone="neutral">
                <p className="font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] text-lg">Pure Sticky Strike</p>
              </ComparisonCard>
              <ComparisonCard title="SSR ≈ 1.5-2.0" tone="pos">
                <p className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] text-lg">Real Market (S&P 500)</p>
              </ComparisonCard>
            </ComparisonGrid>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-16 mb-6 font-serif">Rule of Thumb Adjustments</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <FormulaPanel 
                title="Adjusted Delta"
                formula="\\Delta_{adj} \\approx \\Delta_{BS} + Vega \\times \\left(\\frac{Slope}{Spot}\\right)"
              />
              <FormulaPanel 
                title="Adjusted Gamma"
                formula="\\Gamma_{adj} \\approx \\Gamma_{BS} + 2 \\times Vanna \\times \\frac{d\\sigma}{dS}"
              />
            </div>
          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}
