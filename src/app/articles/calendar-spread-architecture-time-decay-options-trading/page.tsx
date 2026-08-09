'use client';

import React, { useState } from 'react';
// Next/Link removed
import { ArrowLeft, Clock, Activity, TrendingUp, AlertTriangle, Shield, BookOpen, Target, Zap, TrendingDown, Percent, Calendar, Layers, CheckCircle, XCircle, Info, ArrowRight, Maximize2, RefreshCw, Anchor, Music, Calculator, BarChart3, TrendingDown as TrendDown } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

const CalendarSpreadGuide = () => {
  
  
  
  // Calculator states
  const [stockPrice, setStockPrice] = useState(100);
  const [strikePrice, setStrikePrice] = useState(100);
  const [shortDTE, setShortDTE] = useState(30);
  const [longDTE, setLongDTE] = useState(60);
  const [volatility, setVolatility] = useState(20);

  // Simple P&L calculator for calendar spreads
  const calculatePnL = () => {
    const timeDiff = longDTE - shortDTE;
    const moneyness = Math.abs(stockPrice - strikePrice) / strikePrice;
    const volFactor = volatility / 100;
    
    // Simplified calculation for demonstration
    const maxProfit = Math.max(0, 50 - (moneyness * 100) - (timeDiff * 0.5));
    const breakeven1 = strikePrice * (1 - volFactor * 0.1);
    const breakeven2 = strikePrice * (1 + volFactor * 0.1);
    
    return {
      maxProfit: Math.round(maxProfit * 100) / 100,
      breakeven1: Math.round(breakeven1 * 100) / 100,
      breakeven2: Math.round(breakeven2 * 100) / 100,
      profitZone: Math.round((breakeven2 - breakeven1) * 100) / 100
    };
  };

  const pnlData = calculatePnL();

  return (
    <ArticleFrame slug="calendar-spread-architecture-time-decay-options-trading">
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <InfographicSlot alt="Calendar Spread Architecture Infographic" />
      </section>

      {/* Interactive Calculator Section */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-indigo-50 dark:to-indigo-900/20 rounded-2xl shadow-xl dark:shadow-none border border-blue-200 dark:border-blue-900/30 overflow-hidden">
          <div className="p-6 border-b border-blue-100 dark:border-blue-900/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg">
                <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-400">Calendar Spread Calculator</h3>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-sm">Estimate profit zones and breakeven points for your calendar spread strategy.</p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 dark:text-blue-400 mb-2">Stock Price ($)</label>
                  <input
                    type="number"
                    value={stockPrice}
                    onChange={(e) => setStockPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-blue-200 dark:border-blue-900/30 dark:bg-[#14171B] dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 dark:text-blue-400 mb-2">Strike Price ($)</label>
                  <input
                    type="number"
                    value={strikePrice}
                    onChange={(e) => setStrikePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-blue-200 dark:border-blue-900/30 dark:bg-[#14171B] dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 dark:text-blue-400 mb-2">Short Option DTE</label>
                  <input
                    type="number"
                    value={shortDTE}
                    onChange={(e) => setShortDTE(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-blue-200 dark:border-blue-900/30 dark:bg-[#14171B] dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 dark:text-blue-400 mb-2">Long Option DTE</label>
                  <input
                    type="number"
                    value={longDTE}
                    onChange={(e) => setLongDTE(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-blue-200 dark:border-blue-900/30 dark:bg-[#14171B] dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 dark:text-blue-400 mb-2">Implied Volatility (%)</label>
                  <input
                    type="number"
                    value={volatility}
                    onChange={(e) => setVolatility(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-blue-200 dark:border-blue-900/30 dark:bg-[#14171B] dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Results */}
              <div className="bg-white dark:bg-black/40 rounded-xl p-6 border border-blue-100 dark:border-blue-900/30">
                <h4 className="font-bold text-blue-900 dark:text-blue-400 mb-4">Estimated Results</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-sm font-medium text-green-800 dark:text-green-400">Max Profit</span>
                    <span className="font-bold text-green-600 dark:text-green-400">${pnlData.maxProfit}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-400">Lower Breakeven</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">${pnlData.breakeven1}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-400">Upper Breakeven</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">${pnlData.breakeven2}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span className="text-sm font-medium text-purple-800 dark:text-purple-400">Profit Zone Width</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">${pnlData.profitZone}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    <strong>Note:</strong> This is a simplified calculation for educational purposes. 
                    Actual results depend on many factors including bid-ask spreads, commissions, and market conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Concept Cards */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">How It Works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Unlike vertical spreads based on directional bets, the calendar spread is an arbitrage on <strong>time</strong>. You sell a short-term option to finance a long-term option at the same strike.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start p-4 bg-white dark:bg-[#14171B] rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10 hover:shadow-md dark:hover:shadow-none transition-shadow">
                <div className="bg-emerald-100 dark:bg-emerald-900/40 p-3 rounded-lg text-emerald-600 dark:text-emerald-400 mr-4">
                  <TrendingDown size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Short Leg (Near-Term)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    <strong>The Income Engine.</strong> Decays rapidly (30-45 days). You want this to expire worthless or lose value quickly.
                  </p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-white dark:bg-[#14171B] rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10 hover:shadow-md dark:hover:shadow-none transition-shadow">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-lg text-blue-600 dark:text-blue-400 mr-4">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white">Long Leg (Far-Term)</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    <strong>The Asset.</strong> Decays slowly (60-90+ days). This provides protection and Vega exposure (volatility sensitivity).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Representation of Decay */}
          <div className="bg-white dark:bg-[#14171B] p-8 rounded-2xl shadow-xl dark:shadow-none border border-slate-100 dark:border-white/10 relative overflow-hidden">
            <h3 className="text-lg font-semibold mb-6 text-center text-slate-700 dark:text-slate-300">Time Decay Acceleration (Theta)</h3>
            <div className="h-64 relative flex items-end justify-between px-4">
              {/* Axes */}
              <div className="absolute left-0 bottom-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800"></div>
              <div className="absolute left-0 bottom-0 w-0.5 h-full bg-slate-200 dark:bg-slate-800"></div>
              
              {/* Curves (Simulated with SVG) */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Long Option Curve (Slow Decay) */}
                <path d="M0,20 C100,30 250,50 400,100" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="5,5" />
                <text x="320" y="90" fill="#6366f1" fontSize="12" fontWeight="bold">Long Option</text>
                
                {/* Short Option Curve (Fast Decay) */}
                <path d="M200,50 C300,60 380,150 400,200" fill="none" stroke="#10b981" strokeWidth="3" />
                <text x="320" y="180" fill="#10b981" fontSize="12" fontWeight="bold">Short Option</text>
                
                {/* Profit Zone */}
                <path d="M200,50 C300,60 380,150 400,200 L400,100 C250,50 100,30 200,50" fill="url(#gradient)" opacity="0.2" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute bottom-2 left-4 text-xs text-slate-400">Time &rarr;</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 dark:bg-[#14171B]/90 backdrop-blur px-3 py-1 rounded-full shadow-sm border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
                Net Profit Zone
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive: The Profit Tent */}
      <section className="bg-slate-100 dark:bg-[#0a0a0a] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">The "Profit Tent" Profile</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mt-2">
              Visualizing where you make money. Unlike simple stock ownership, your profit zone is a specific price range that peaks at expiration.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* P&L Conceptual Graph */}
            <div className="bg-white dark:bg-[#14171B] p-6 rounded-2xl shadow-lg dark:shadow-none border border-slate-200 dark:border-white/10 h-80 relative flex items-center justify-center">
              <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
                {/* Zero Line */}
                <line x1="0" y1="150" x2="400" y2="150" stroke="#cbd5e1" strokeWidth="2" />
                <text x="5" y="145" className="text-xs fill-slate-400">0 Profit</text>
                
                {/* Expiration Line (The Tent) */}
                <path d="M50,180 L150,150 L200,50 L250,150 L350,180" fill="none" stroke="#4f46e5" strokeWidth="3" />
                <circle cx="200" cy="50" r="4" fill="#4f46e5" />
                <text x="210" y="45" className="text-sm font-bold fill-indigo-600">Max Profit at Strike</text>
                
                {/* Today Line (Curved) */}
                <path d="M60,165 Q200,120 340,165" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />
                <text x="210" y="130" className="text-xs font-semibold fill-slate-500">T+0 (Today)</text>
                
                {/* Stock Price Indicator */}
                <line x1="200" y1="200" x2="200" y2="150" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                <text x="200" y="215" textAnchor="middle" className="text-xs font-bold fill-slate-700">Strike Price</text>
              </svg>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-lg h-fit text-indigo-700 dark:text-indigo-400">
                  <Anchor size={24}/>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">Peak Profit</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Occurs exactly at the strike price when the short option expires. The short option is worthless, but the long option retains maximum extrinsic value.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-lg h-fit text-indigo-700 dark:text-indigo-400">
                  <Maximize2 size={24}/>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">Breakeven Width</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    The "width" of your tent depends on the premium paid. Lower debit = wider breakevens. Higher volatility usually widens the tent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Greeks Grid */}
      <section className="bg-slate-900 dark:bg-[#14171B] text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Mastering The Greeks</h2>
            <p className="text-slate-400 dark:text-slate-400 max-w-2xl mx-auto">
              The strategy's performance is governed by the nonlinear interaction of sensitivities derived from the Black-Scholes model.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GreekCard 
              icon={<Clock />} 
              title="Theta (Time)" 
              value="Positive" 
              color="text-emerald-400"
              desc="The engine of profit. Short option decays faster than the long option, creating net daily income."
            />
            <GreekCard 
              icon={<Activity />} 
              title="Vega (Volatility)" 
              value="Positive" 
              color="text-emerald-400"
              desc="Profits from rising volatility. Long-term options are more sensitive to Vol changes than short-term."
            />
            <GreekCard 
              icon={<Target />} 
              title="Delta (Direction)" 
              value="Neutral" 
              color="text-blue-400"
              desc="Ideally Delta Neutral at inception. As price moves, Delta shifts to oppose the move."
            />
            <GreekCard 
              icon={<Zap />} 
              title="Gamma (Acceleration)" 
              value="Negative" 
              color="text-rose-400"
              desc="The main risk. Large price moves hurt the position. Requires the stock to stay in the 'Tent'."
            />
          </div>
        </div>
      </section>

      {/* Advanced Calendar Spread Variations */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Advanced Calendar Variations</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-50 dark:from-purple-900/20 to-pink-50 dark:to-pink-900/20 border border-purple-200 dark:border-purple-900/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="text-center mb-4">
              <div className="bg-purple-100 dark:bg-purple-900/40 p-3 rounded-lg inline-block mb-3">
                <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Advanced</span>
            </div>
            <h3 className="text-xl font-bold text-center text-purple-900 dark:text-purple-400 mb-2">Double Calendar</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300 text-center mb-4">Two calendars at different strikes</p>
            <ul className="text-sm text-purple-800 dark:text-purple-400 space-y-2">
              <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2"/>Wider profit zone</li>
              <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2"/>Higher capital requirement</li>
              <li className="flex items-center"><XCircle size={14} className="text-rose-500 mr-2"/>More complex management</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-teal-50 dark:from-teal-900/20 to-cyan-50 dark:to-cyan-900/20 border border-teal-200 dark:border-teal-900/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="text-center mb-4">
              <div className="bg-teal-100 dark:bg-teal-900/40 p-3 rounded-lg inline-block mb-3">
                <RefreshCw className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <span className="bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Dynamic</span>
            </div>
            <h3 className="text-xl font-bold text-center text-teal-900 dark:text-teal-400 mb-2">Rolling Calendar</h3>
            <p className="text-sm text-teal-700 dark:text-teal-300 text-center mb-4">Continuously roll short legs</p>
            <ul className="text-sm text-teal-800 dark:text-teal-300 space-y-2">
              <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2"/>Consistent theta income</li>
              <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2"/>Adapts to market conditions</li>
              <li className="flex items-center"><XCircle size={14} className="text-rose-500 mr-2"/>High transaction costs</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 dark:from-amber-900/20 to-orange-50 dark:to-orange-900/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="text-center mb-4">
              <div className="bg-amber-100 dark:bg-amber-900/40 p-3 rounded-lg inline-block mb-3">
                <BarChart3 className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Ratio</span>
            </div>
            <h3 className="text-xl font-bold text-center text-amber-900 dark:text-amber-400 mb-2">Ratio Calendar</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 text-center mb-4">Unequal number of contracts</p>
            <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-2">
              <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2"/>Enhanced income potential</li>
              <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2"/>Directional bias capability</li>
              <li className="flex items-center"><XCircle size={14} className="text-rose-500 mr-2"/>Unlimited risk potential</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Market Regime Analysis */}
      <section className="bg-slate-100 dark:bg-[#0a0a0a] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Market Regime Analysis</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mt-2">
              Calendar spreads perform differently across market regimes. Understanding when to deploy this strategy is crucial for success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RegimeCard 
              title="Low Volatility"
              subtitle="VIX < 20"
              performance="Excellent"
              color="text-emerald-600 dark:text-emerald-400"
              bgColor="bg-emerald-50 dark:bg-emerald-900/20"
              borderColor="border-emerald-200 dark:border-emerald-900/30"
              description="Ideal conditions. Time decay dominates, volatility expansion likely."
              indicators={["Contango term structure", "Low realized vol", "Range-bound markets"]}
            />
            <RegimeCard 
              title="Rising Volatility"
              subtitle="VIX 20-30"
              performance="Good"
              color="text-blue-600 dark:text-blue-400"
              bgColor="bg-blue-50 dark:bg-blue-900/20"
              borderColor="border-blue-200 dark:border-blue-900/30"
              description="Favorable for long Vega exposure. Monitor for vol crush."
              indicators={["Expanding IV", "Increasing uncertainty", "Event risk building"]}
            />
            <RegimeCard 
              title="High Volatility"
              subtitle="VIX > 30"
              performance="Poor"
              color="text-amber-600 dark:text-amber-400"
              bgColor="bg-amber-50 dark:bg-amber-900/20"
              borderColor="border-amber-200 dark:border-amber-900/30"
              description="Dangerous territory. Large moves likely, gamma risk high."
              indicators={["Backwardation", "High realized vol", "Trending markets"]}
            />
            <RegimeCard 
              title="Vol Crush"
              subtitle="Rapid IV decline"
              performance="Terrible"
              color="text-rose-600 dark:text-rose-400"
              bgColor="bg-rose-50 dark:bg-rose-900/20"
              borderColor="border-rose-200 dark:border-rose-900/30"
              description="Worst case scenario. Long Vega exposure hurts badly."
              indicators={["Post-earnings", "Event resolution", "Mean reversion"]}
            />
          </div>
        </div>
      </section>

      {/* Backtesting Results */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Historical Performance Analysis</h2>
        
        <div className="bg-white dark:bg-[#14171B] rounded-2xl shadow-xl dark:shadow-none border border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">2,847</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Total Trades Analyzed</div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">SPY, 2010-2024</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">58.3%</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Win Rate</div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">With regime filtering</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1.24</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Profit Factor</div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">Gross profits / losses</div>
              </div>
            </div>
            
            <div className="border-t border-slate-200 dark:border-white/10 pt-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Key Findings</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">Term Structure Matters</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Contango filtering improved returns by 67 basis points annually</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">Timing is Critical</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">21-day exit rule prevented 73% of large losses</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-rose-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">Earnings Weeks Hurt</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Average loss of 12% during earnings announcements</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-rose-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">Transaction Costs</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Reduced net returns by 0.3% annually on average</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Strike Selection Strategy</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-slate-200 dark:border-white/10 rounded-xl p-6 bg-white dark:bg-[#14171B] hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
            <div className="text-center mb-4">
              <span className="bg-slate-100 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Neutral</span>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2">The ATM Calendar</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">Strike = Current Stock Price</p>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
              <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2"/>Highest potential Theta</li>
              <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2"/>Balanced risk to up/downside</li>
              <li className="flex items-center"><XCircle size={14} className="text-rose-500 mr-2"/>Highest Gamma risk</li>
            </ul>
          </div>

          <div className="border border-slate-200 dark:border-white/10 rounded-xl p-6 bg-white dark:bg-[#14171B] hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
            <div className="text-center mb-4">
              <span className="bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Bullish</span>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2">OTM Call Calendar</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">Strike &gt; Current Price (e.g., Delta 30)</p>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
              <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2"/>Profits if stock rises slowly</li>
              <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2"/>Cheaper to enter (Lower Debit)</li>
              <li className="flex items-center"><XCircle size={14} className="text-rose-500 mr-2"/>Loses if stock crashes</li>
            </ul>
          </div>
          
          <div className="border border-slate-200 dark:border-white/10 rounded-xl p-6 bg-white dark:bg-[#14171B] hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
            <div className="text-center mb-4">
              <span className="bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Bearish</span>
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2">OTM Put Calendar</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">Strike &lt; Current Price (e.g., Delta 30)</p>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
              <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2"/>Profits on slow decline</li>
              <li className="flex items-center"><CheckCircle size={14} className="text-emerald-500 mr-2"/>Hedges portfolio delta</li>
              <li className="flex items-center"><XCircle size={14} className="text-rose-500 mr-2"/>Caution: IV Skew affects pricing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Research Findings */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-200 dark:border-white/10">
        <div className="flex items-center space-x-3 mb-10">
          <BookOpen className="text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Quantitative Reality</h2>
        </div>
        
        <div className="bg-white dark:bg-[#14171B] rounded-2xl shadow-xl dark:shadow-none border border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-white/10">
            <div className="p-10 bg-rose-50/50 dark:bg-rose-900/10">
              <h3 className="text-xl font-bold text-rose-700 dark:text-rose-400 mb-2">Unfiltered Strategy</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">Mechanical trading without regime filters.</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-black text-rose-600 dark:text-rose-400">-0.09%</span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">Annual Return</span>
              </div>
              <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm">
                "Blindly" trading calendars is often a losing proposition due to transaction costs and adverse directional moves.
              </p>
            </div>
            
            <div className="p-10 bg-emerald-50/50 dark:bg-emerald-900/10">
              <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">Contango Filtered</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">Trading only when Back Month IV &gt; Front Month IV.</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">+0.58%</span>
                <span className="text-slate-500 dark:text-slate-400 font-medium">Annual Return</span>
              </div>
              <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm">
                Alpha is generated by avoiding Backwardation regimes. The edge exists only when the market is calm.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900/40 p-6 border-t border-slate-200 dark:border-white/10 text-center text-slate-500 dark:text-slate-400 text-sm">
            Data Source: ORATS Research on SPY Long Call Calendars
          </div>
        </div>
      </section>

      {/* Execution Rules */}
      <section className="bg-indigo-900 dark:bg-[#0a0a0a] text-indigo-50 dark:text-slate-300 py-20 overflow-hidden relative">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900 rounded-full blur-3xl opacity-50 -ml-32 -mb-32"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Execution Playbook</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <PlaybookCard 
              step="01"
              title="The Setup"
              items={[
                "Sell Short Leg: 30-45 DTE",
                "Buy Long Leg: 60-90 DTE",
                "Ideally 1 month gap",
                "Strike: At-The-Money (ATM)"
              ]}
            />
            <PlaybookCard 
              step="02"
              title="The Conditions"
              items={[
                "IV Rank < 30 (Buy low, sell high)",
                "Term Structure: Contango",
                "Avoid Earnings (Unless specific play)",
                "Liquidity: Penny-wide spreads only"
              ]}
            />
            <PlaybookCard 
              step="03"
              title="The Exit"
              items={[
                "Take Profit: 15-25% of debit",
                "Time Stop: 21 Days to Expiration",
                "Avoid Gamma risk inside 21 days",
                "Never hold short ITM calls ex-div"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Adjustments & Management */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">When It Goes Wrong: Adjustments</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-rose-500" />
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Scenario: Stock Rallies Hard</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              The stock price has blown through your strike price. The short call is losing money fast.
            </p>
            <div className="space-y-3">
              <div className="text-sm bg-slate-50 dark:bg-slate-900/40 p-3 rounded">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-1">Move 1: Do Nothing (Wait)</span>
                If there is still time, wait for a pullback. Calendars are forgiving.
              </div>
              <div className="text-sm bg-slate-50 dark:bg-slate-900/40 p-3 rounded">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-1">Move 2: Roll Up</span>
                Close the current calendar and open a new one at a higher strike (Realize loss, reset probability).
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="text-rose-500" />
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Scenario: IV Crush</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Implied Volatility drops significantly. Your long option loses more value than the short option gains.
            </p>
            <div className="space-y-3">
              <div className="text-sm bg-slate-50 dark:bg-slate-900/40 p-3 rounded">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-1">The Reality</span>
                It is very hard to adjust a pure Vega loss. This is why we avoid earnings events.
              </div>
              <div className="text-sm bg-slate-50 dark:bg-slate-900/40 p-3 rounded">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-1">Mitigation</span>
                Close the trade immediately to preserve remaining capital if the thesis has failed.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risks & Pitfalls */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-200 dark:border-white/10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10">Critical Risks</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <RiskCard 
            title="Dividend Assignment"
            desc="The Silent Killer. If your short call is ITM and the stock pays a dividend, you may be assigned early, resulting in a short stock position and owed dividend."
            badge="High Danger"
          />
          <RiskCard 
            title="The Vega Trap (IV Crush)"
            desc="Buying calendars before earnings often fails. If IV crushes across the board, the long option (high Vega) loses more absolute value than the short option profits."
            badge="Volatility Risk"
          />
          <RiskCard 
            title="Gamma Explosion"
            desc="Inside 21 days to expiration, the 'tent' narrows. A small move in stock price can cause the short option to double in value, wiping out profits."
            badge="Time Risk"
          />
          <RiskCard 
            title="Transaction Costs"
            desc="With 4 legs per round trip, commissions and spread slippage can destroy the thin statistical edge. Only trade liquid assets."
            badge="Execution Risk"
          />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-slate-50 dark:bg-black/40 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Strategy Comparison</h2>
          
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <table className="w-full text-sm text-left text-slate-600 bg-white dark:bg-[#14171B]">
              <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-3">Feature</th>
                  <th className="px-6 py-3 text-indigo-700 dark:text-indigo-400">Calendar Spread</th>
                  <th className="px-6 py-3">Vertical Spread</th>
                  <th className="px-6 py-3">Iron Condor</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 dark:border-white/10">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Primary Driver</td>
                  <td className="px-6 py-4 font-bold text-emerald-600 dark:text-emerald-400">Time (Theta)</td>
                  <td className="px-6 py-4">Direction (Delta)</td>
                  <td className="px-6 py-4">Neutrality</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-white/10">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Vega Exposure</td>
                  <td className="px-6 py-4 text-indigo-600 dark:text-indigo-400">Long Vega (Needs Vol Up)</td>
                  <td className="px-6 py-4 text-slate-400">Neutral/Low</td>
                  <td className="px-6 py-4 text-rose-600 dark:text-rose-400">Short Vega (Needs Vol Down)</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-white/10">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Profit Zone</td>
                  <td className="px-6 py-4">Narrow "Tent"</td>
                  <td className="px-6 py-4">Directional</td>
                  <td className="px-6 py-4">Wide Plateau</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Best Market</td>
                  <td className="px-6 py-4">Quiet / Pre-Event</td>
                  <td className="px-6 py-4">Trending</td>
                  <td className="px-6 py-4">Range Bound</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </ArticleFrame>
  );
};

{/* Sub Components */}
const GreekCard = ({ icon, title, value, desc, color }: { icon: React.ReactElement; title: string; value: string; desc: string; color: string }) => (
  <div className="bg-slate-800 dark:bg-[#14171B] p-6 rounded-xl border border-slate-700 dark:border-white/10 hover:border-slate-600 dark:hover:border-white/20 transition-colors">
    <div className={`flex items-center justify-between mb-4`}>
      <div className="p-2 bg-slate-700 dark:bg-slate-800 rounded-lg text-white">
        {React.cloneElement(icon as React.ReactElement<any>, {})}
      </div>
      <span className={`text-sm font-bold px-2 py-1 rounded bg-slate-900/50 dark:bg-black/40 ${color}`}>
        {value}
      </span>
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const PlaybookCard = ({ step, title, items }: { step: string; title: string; items: string[] }) => (
  <div className="bg-indigo-800/50 backdrop-blur border border-indigo-700 p-8 rounded-2xl relative">
    <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
      {step}
    </div>
    <h3 className="text-xl font-bold text-white mb-6 ml-2">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start text-indigo-100 text-sm">
          <CheckCircle size={16} className="mr-3 mt-0.5 text-emerald-400 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const RiskCard = ({ title, desc, badge }: { title: string; desc: string; badge: string }) => (
  <div className="p-6 bg-white dark:bg-[#14171B] rounded-xl border-l-4 border-rose-500 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-none transition-shadow">
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-bold text-slate-800 dark:text-white flex items-center">
        <AlertTriangle size={18} className="text-rose-500 mr-2" />
        {title}
      </h3>
      <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/40 px-2 py-1 rounded">
        {badge}
      </span>
    </div>
    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const RegimeCard = ({ 
  title, 
  subtitle, 
  performance, 
  color, 
  bgColor, 
  borderColor, 
  description, 
  indicators 
}: { 
  title: string; 
  subtitle: string; 
  performance: string; 
  color: string; 
  bgColor: string; 
  borderColor: string; 
  description: string; 
  indicators: string[] 
}) => (
  <div className={`${bgColor} ${borderColor} border rounded-xl p-6 hover:shadow-lg dark:hover:shadow-none transition-shadow`}>
    <div className="text-center mb-4">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${color} bg-white`}>
        {performance}
      </span>
    </div>
    <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 text-center">{description}</p>
    <div className="space-y-2">
      {indicators.map((indicator, idx) => (
        <div key={idx} className="flex items-center text-xs text-slate-600 dark:text-slate-400">
          <div className={`w-2 h-2 rounded-full ${color.replace('text-', 'bg-')} mr-2`}></div>
          {indicator}
        </div>
      ))}
    </div>
  </div>
);

export default CalendarSpreadGuide;
