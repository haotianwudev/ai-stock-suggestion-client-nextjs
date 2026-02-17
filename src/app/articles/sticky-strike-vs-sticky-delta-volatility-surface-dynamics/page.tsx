'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Maximize2, BookOpen, Anchor, Activity, TrendingUp, AlertTriangle, Calculator, Sigma, CheckCircle2, XCircle, Layers, Scale, Search, MoveRight, ArrowRight } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

export default function StickyStrikeVsDeltaArticle() {
  const currentArticle = articles.find(article => article.slug === 'sticky-strike-vs-sticky-delta-volatility-surface-dynamics');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  
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
    <>
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug || ''} 
          />
        </>
      )}

      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      <div className="bg-white relative overflow-hidden border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
          <div className="flex gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
              Deep Research
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
              Options Trading
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Sticky Strike vs. Sticky Delta
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
            Understanding the hidden dynamics of the volatility surface. Why your Greeks might be wrong, and how to fix them using the <span className="font-semibold text-slate-900">Skew Stickiness Ratio</span>.
          </p>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img 
            src="https://i.imgur.com/mdZbOrt.jpeg" 
            alt="Sticky Strike vs Sticky Delta Infographic" 
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
        src="https://i.imgur.com/mdZbOrt.jpeg"
        alt="Sticky Strike vs Sticky Delta Infographic"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
              <BookOpen size={24} strokeWidth={2} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">The Geometry of Market Risk</h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              In the Black-Scholes world, volatility (σ) is treated as a constant parameter. However, in reality, 
              volatility is a dynamic surface that moves as the underlying price (S) moves. This creates a significant 
              problem: if you calculate your hedge (Delta) assuming volatility is constant, you are missing a massive 
              component of your risk.
            </p>
            
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 my-8 rounded-r-lg">
              <h3 className="text-xl font-bold text-indigo-900 mb-3">The Total Derivative</h3>
              <p className="text-indigo-800 mb-4">
                To calculate the <em>true</em> risk of an option, we must use the <strong>Total Derivative</strong>. 
                This mathematical concept states that the change in option price isn't just about the spot price moving; 
                it's also about the volatility changing <em>because</em> the spot price moved.
              </p>
              <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-center text-sm">
                dV/dS = (∂V/∂S) + (∂V/∂Σ) × (dΣ/dS)
                <div className="text-xs text-slate-400 mt-2">Model Delta + Shadow Delta</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-amber-50 p-5 rounded-lg border border-amber-100">
                <div className="flex items-center gap-2 mb-2 font-bold text-amber-800">
                  <Calculator size={18} /> Model Delta
                </div>
                <p className="text-sm text-amber-900">
                  ∂V/∂S: The standard Delta found in textbooks. It assumes Σ is frozen.
                </p>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 mb-2 font-bold text-blue-800">
                  <Activity size={18} /> Vega
                </div>
                <p className="text-sm text-blue-900">
                  ∂V/∂Σ: How much money you make/lose if volatility rises by 1 point.
                </p>
              </div>
              <div className="bg-rose-50 p-5 rounded-lg border border-rose-100">
                <div className="flex items-center gap-2 mb-2 font-bold text-rose-800">
                  <TrendingUp size={18} /> Asset-Vol Correlation
                </div>
                <p className="text-sm text-rose-900">
                  dΣ/dS: The link. Does vol crash when the market rallies? (Usually yes).
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 mt-12 mb-4">The "Shadow Delta" Trap</h3>
            <p className="mb-4">The term Vega × (dΣ/dS) acts as a "Shadow Delta." It modifies your effective exposure.</p>
            
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mt-6">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Scale size={20} className="text-indigo-600"/>
                Trader's Intuition: The Long Call Example
              </h4>
              <p className="mb-4 text-slate-700">Suppose you own a Call option on the S&P 500.</p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="font-bold text-slate-900 w-24">Scenario:</span>
                  <span>The market rallies +1%.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-slate-900 w-24">BS Delta:</span>
                  <span className="text-emerald-600">Make money on Delta.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-slate-900 w-24">Reality:</span>
                  <span>When S&P 500 rallies, panic subsides, and <strong>Volatility Drops</strong> (dΣ/dS {'<'} 0).</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-slate-900 w-24">Net P&L:</span>
                  <span>You make money on price, but <strong>lose money on Vega</strong>.</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-indigo-50 text-indigo-800 rounded text-sm font-semibold text-center">
                Conclusion: Your TRUE delta is LOWER than the Black-Scholes model says.
              </div>
            </div>
          </div>
        </section>
        
        <div className="w-full border-t border-slate-100 max-w-5xl mx-auto" />
        
        {/* Sticky Strike Section */}
        <section className="mb-16 py-16 px-6 md:px-12 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
              <Anchor size={24} strokeWidth={2} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Regime 1: Sticky Strike</h2>
          </div>
          <div className="prose prose-lg prose-slate max-w-none">
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8 rounded-r-lg">
              <p className="text-indigo-900 font-medium text-lg mb-2">The "Painted on the Wall" Theory</p>
              <p className="text-indigo-800 leading-relaxed">
                Imagine the volatility skew is a physical curve painted onto the price axis. It is static. It does not move. 
                When the stock price (S) moves, we simply look up the volatility at the fixed strike (K) on this unmoving curve.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mt-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">The Mechanics</h3>
                <p className="mb-4 text-slate-600">
                  Under Sticky Strike, implied volatility Σ(K, T) is a function of Strike K only.
                </p>
                <div className="my-6 p-4 bg-slate-900 text-slate-50 rounded-lg font-mono text-center text-sm">
                  ∂Σ(K, S)/∂S = 0
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  This means if Spot moves from $100 to $110, the volatility of the $100 Strike Put <strong>does not change</strong>.
                </p>
                
                <h4 className="font-bold text-slate-800 mt-6 mb-2">What happens to ATM Vol?</h4>
                <p className="text-slate-600 text-sm">
                  Even though the curve is fixed, the <em>At-The-Money (ATM)</em> volatility changes.
                  <br/><br/>
                  If the market rallies (moves right) on a downward sloping skew, the new ATM strike is higher, 
                  which has a lower volatility on the fixed curve.
                  <br/>
                  <span className="text-indigo-600 font-bold">Result: Market Rally = ATM Vol Drop.</span>
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-indigo-500 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="text-indigo-700" size={20} />
                    <h3 className="text-xl font-bold text-indigo-700">Trader's Intuition</h3>
                  </div>
                  <div className="text-slate-600 space-y-2 leading-relaxed">
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex gap-2">
                        <span className="font-bold text-indigo-600">1.</span>
                        <span>
                          <strong>Psychological Anchors:</strong> Investors often view round numbers ($100, $150) as 
                          permanent support/resistance levels. The fear (volatility) associated with breaking $100 stays 
                          constant regardless of where the stock is today.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold text-indigo-600">2.</span>
                        <span>
                          <strong>Range-Bound Markets:</strong> This regime works best when the market is chopping sideways. 
                          Supply and demand for specific strikes (e.g., call overwriting at $110) keeps those vols pinned.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wide">The Skew Trap</h4>
                  <p className="text-xs text-slate-500 mb-3">
                    If you trade a <strong>Risk Reversal</strong> (Long Call / Short Put) expecting Sticky Strike behavior:
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-emerald-600 font-bold">Scenario: Rally</span>
                    <ArrowRight size={16} className="text-slate-400"/>
                    <span className="text-slate-700">You profit on Delta.</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-red-500 font-bold">Risk</span>
                    <ArrowRight size={16} className="text-slate-400"/>
                    <span className="text-slate-700">If regime flips to Sticky Delta, Call vol collapses, eating your profits.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="w-full border-t border-slate-100 max-w-5xl mx-auto" />
        
        {/* Sticky Delta Section */}
        <section className="mb-16 py-16 px-6 md:px-12 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
              <TrendingUp size={24} strokeWidth={2} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Regime 2: Sticky Delta</h2>
          </div>
          <div className="prose prose-lg prose-slate max-w-none">
            <div className="bg-rose-50 border-l-4 border-rose-500 p-6 mb-8 rounded-r-lg">
              <p className="text-rose-900 font-medium text-lg mb-2">The "Floating Smile" Theory</p>
              <p className="text-rose-800 leading-relaxed">
                Imagine the volatility skew is a kite tied to the stock price. As the stock price moves, the entire curve 
                floats along with it. Volatility is not determined by the price itself ($100), but by how far the price is 
                from the current spot (Moneyness).
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mt-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">The Mechanics</h3>
                <p className="mb-4 text-slate-600">
                  Under Sticky Delta, implied volatility is a function of Moneyness (M = K/S).
                </p>
                <div className="my-6 p-4 bg-slate-900 text-slate-50 rounded-lg font-mono text-center text-sm">
                  dΣ/dS = -(K/S²) × (∂Σ/∂M) ≈ Curve Shift
                </div>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-rose-100 p-2 rounded text-rose-600 mt-1">
                      <MoveRight size={16}/>
                    </div>
                    <div>
                      <strong className="block text-slate-800 text-sm">Horizontal Shift</strong>
                      <p className="text-xs text-slate-500">
                        If Spot moves +10%, the entire Vol curve moves +10% to the right. The "ATM Vol" remains constant.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-rose-100 p-2 rounded text-rose-600 mt-1">
                      <Sigma size={16}/>
                    </div>
                    <div>
                      <strong className="block text-slate-800 text-sm">Shadow Delta Impact</strong>
                      <p className="text-xs text-slate-500">
                        Because Equity Skew is downward sloping (Slope {'<'} 0), the Shadow Delta term is usually <strong>Positive</strong>. 
                        This means Sticky Delta deltas are less negative for Puts than Sticky Strike deltas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-rose-500 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="text-rose-700" size={20} />
                    <h3 className="text-xl font-bold text-rose-700">Why FX Markets Love This</h3>
                  </div>
                  <div className="text-slate-600 space-y-2 leading-relaxed">
                    <p className="text-sm mb-4">
                      In Foreign Exchange, there is no natural "Up" or "Down" (is USD/JPY going up or is JPY/USD going down?).
                    </p>
                    <p className="text-sm">
                      Therefore, volatility is quoted in <strong>Delta</strong> (e.g., "25-Delta Call"). By definition, if the 
                      spot moves, the "25-Delta" strike changes location. This structure <em>forces</em> a Sticky Delta regime.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wide">The Hedging Implication</h4>
                  <p className="text-xs text-slate-500 mb-3">For a Short Put position:</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Black-Scholes Delta</span>
                    <span className="font-mono text-slate-800">-0.40</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2 border-b border-slate-100 pb-2">
                    <span className="text-slate-600 font-medium">Shadow Delta Adj.</span>
                    <span className="font-mono text-emerald-600">+0.05</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-rose-700 font-bold">Total Delta</span>
                    <span className="font-mono text-rose-700 font-bold">-0.35</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 italic">
                    "You don't need to sell as much stock to hedge, because the rising volatility helps cushion the blow."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="text-indigo-600" />
                <h3 className="text-xl font-bold text-slate-900">Interactive Simulator: Strike vs. Delta</h3>
              </div>
              <p className="text-slate-600 text-sm">
                Adjust the Spot Price to see how the Volatility Surface reacts under different regimes.
                Notice how the <span className="text-rose-500 font-bold">Sticky Delta</span> curve shifts sideways, 
                while the <span className="text-indigo-500 font-bold">Sticky Strike</span> curve remains frozen.
              </p>
            </div>
            <div className="p-6 grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium text-slate-700">
                    <label>Spot Price</label>
                    <span>${spot}</span>
                  </div>
                  <input 
                    type="range" 
                    min="80" 
                    max="120" 
                    value={spot} 
                    onChange={(e) => setSpot(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>$80 (Crash)</span>
                    <span>$120 (Rally)</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium text-slate-700">
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
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="font-semibold text-slate-700">Sticky Strike</span>
                  </div>
                  <p className="text-slate-500 pl-5">The curve is rigid. Vol at $100 remains fixed even if Spot goes to $90.</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <span className="font-semibold text-slate-700">Sticky Delta</span>
                  </div>
                  <p className="text-slate-500 pl-5">The curve floats. ATM Vol follows the spot price.</p>
                </div>
              </div>
              <div className="lg:col-span-2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="strike" 
                      label={{ value: 'Strike Price (K)', position: 'insideBottom', offset: -5 }} 
                      domain={[80, 120]}
                      type="number"
                    />
                    <YAxis 
                      label={{ value: 'Implied Vol (%)', angle: -90, position: 'insideLeft' }} 
                      domain={[10, 30]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: 'none', 
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                      }}
                    />
                    <ReferenceLine x={spot} stroke="#94a3b8" strokeDasharray="3 3" label="Current Spot" />
                    <Line 
                      type="monotone" 
                      dataKey="Sticky Strike" 
                      stroke="#6366f1" 
                      strokeWidth={3} 
                      dot={false}
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Sticky Delta" 
                      stroke="#f43f5e" 
                      strokeWidth={3} 
                      dot={false}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Key Concepts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-indigo-500 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Anchor className="text-indigo-700" size={20} />
                <h3 className="text-xl font-bold text-indigo-700">Sticky Strike</h3>
              </div>
              <p className="text-slate-600 mb-4">
                The "Painted on the Wall" theory. Volatility is fixed to absolute strike prices. When the stock moves, 
                we look up volatility at the same strike level.
              </p>
              <div className="bg-indigo-50 p-3 rounded text-sm">
                <strong>Formula:</strong> ∂Σ(K, S)/∂S = 0
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-rose-500 p-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="text-rose-700" size={20} />
                <h3 className="text-xl font-bold text-rose-700">Sticky Delta</h3>
              </div>
              <p className="text-slate-600 mb-4">
                The "Floating Smile" theory. Volatility is tied to moneyness (K/S), not absolute price. 
                The entire curve moves with the spot price.
              </p>
              <div className="bg-rose-50 p-3 rounded text-sm">
                <strong>Formula:</strong> dΣ/dS = -(K/S²) × (∂Σ/∂M)
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
              <Sigma size={24} strokeWidth={2} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">The Skew Stickiness Ratio (SSR)</h2>
          </div>
          <p className="text-lg text-slate-700 mb-6">
            Real markets exist on a spectrum between Sticky Strike and Sticky Delta. The SSR quantifies exactly where we are:
          </p>
          <div className="bg-slate-900 text-slate-50 p-6 rounded-lg font-mono text-center mb-8">
            SSR = (Actual change in ATM Vol) / (Change implied by Sticky Strike)
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-rose-50 p-6 rounded-lg border border-rose-200">
              <div className="text-2xl font-bold text-rose-700 mb-2">SSR = 0</div>
              <div className="text-sm text-rose-900">Pure Sticky Delta</div>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <div className="text-2xl font-bold text-indigo-700 mb-2">SSR = 1</div>
              <div className="text-sm text-indigo-900">Pure Sticky Strike</div>
            </div>
            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-700 mb-2">SSR ≈ 1.5-2.0</div>
              <div className="text-sm text-emerald-900">Real Market (S&P 500)</div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Practical Implications</h2>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="text-amber-700" size={20} />
              <h3 className="text-xl font-bold text-amber-900">Risk Management</h3>
            </div>
            <p className="text-amber-800 mb-4">
              Getting the regime wrong leads to "P&L Leakage" - mysterious profits or losses in attribution reports. 
              Naive VaR calculations can underestimate losses by ~40% during market crashes.
            </p>
          </div>
          
          <div className="bg-slate-900 text-slate-300 p-8 rounded-2xl">
            <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
              <Calculator className="text-emerald-400" />
              Rule of Thumb Adjustments
            </h3>
            <div className="grid md:grid-cols-2 gap-6 font-mono text-sm">
              <div>
                <p className="text-emerald-400 font-bold mb-2">Adjusted Delta</p>
                <p className="bg-slate-800 p-3 rounded">
                  Delta_adj ≈ Delta_BS + Vega × (Skew_slope / Spot)
                </p>
              </div>
              <div>
                <p className="text-emerald-400 font-bold mb-2">Adjusted Gamma</p>
                <p className="bg-slate-800 p-3 rounded">
                  Gamma_adj ≈ Gamma_BS + 2 × Vanna × (dσ/dS)
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {currentArticle?.googleDoc && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl my-8 text-center max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
          <p className="text-slate-600 mb-6">
            Dive deeper into the mathematics and implementation details in the full research paper.
          </p>
          <a 
            href={currentArticle.googleDoc}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
          >
            Read Full Research Paper
          </a>
        </div>
      )}

      <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-16">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm">
            © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
          </p>
        </div>
      </footer>
    </>
  );
}
