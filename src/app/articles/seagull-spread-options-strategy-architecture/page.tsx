'use client';

import React from 'react';
import { Layers, Globe, ShieldAlert, Scale, TrendingUp, TrendingDown, LineChart, Activity, Zap, BarChart, DollarSign, AlertTriangle, CheckCircle, Clock, Percent } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

const PayoffDiagram = () => {
  const width = 600;
  const height = 300;
  const paddingX = 50;
  const paddingY = 50;

  const mapX = (x: number): number => paddingX + ((x - 70) / 60) * (width - 2 * paddingX);
  const mapY = (y: number): number => (height - paddingY) - ((y + 25) / 40) * (height - 2 * paddingY);

  const points = [
    { x: 70, y: -20 },
    { x: 90, y: 0 },
    { x: 100, y: 0 },
    { x: 110, y: 10 },
    { x: 130, y: 10 }
  ];

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${mapX(p.x)} ${mapY(p.y)}`).join(' ');
  const zeroY = mapY(0);
  const lossArea = `M ${mapX(70)} ${zeroY} L ${mapX(70)} ${mapY(-20)} L ${mapX(90)} ${zeroY} Z`;
  const profitArea = `M ${mapX(100)} ${zeroY} L ${mapX(110)} ${mapY(10)} L ${mapX(130)} ${mapY(10)} L ${mapX(130)} ${zeroY} Z`;

  return (
    <svg viewBox="0 0 600 300" className="w-full max-w-2xl h-auto font-sans bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-2">
      {/* Grid lines */}
      <line x1={paddingX} y1={zeroY} x2={width - paddingX} y2={zeroY} stroke="currentColor" className="text-slate-400 dark:text-slate-600" strokeWidth="2" />
      <line x1={mapX(90)} y1={paddingY} x2={mapX(90)} y2={height - paddingY} stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" strokeDasharray="4 4" />
      <line x1={mapX(100)} y1={paddingY} x2={mapX(100)} y2={height - paddingY} stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" strokeDasharray="4 4" />
      <line x1={mapX(110)} y1={paddingY} x2={mapX(110)} y2={height - paddingY} stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" strokeDasharray="4 4" />

      {/* Fill Areas */}
      <path d={lossArea} fill="currentColor" className="text-red-100 dark:text-red-900/40" />
      <path d={profitArea} fill="currentColor" className="text-emerald-100 dark:text-emerald-900/40" />

      {/* Payoff Line */}
      <path d={pathData} fill="none" stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="4" strokeLinejoin="round" />

      {/* Data Points */}
      {points.map((p, i) => (
        <circle key={i} cx={mapX(p.x)} cy={mapY(p.y)} r="5" fill="currentColor" className="text-blue-800 dark:text-blue-500" stroke="currentColor" strokeWidth="2" />
      ))}

      {/* Axis Labels */}
      <text x={paddingX - 10} y={zeroY} textAnchor="end" alignmentBaseline="middle" className="text-[10px] fill-slate-500 dark:fill-slate-400 font-medium">0</text>
      <text x={paddingX - 10} y={mapY(10)} textAnchor="end" alignmentBaseline="middle" className="text-[10px] fill-emerald-600 dark:fill-emerald-400 font-medium">Max Profit</text>

      <text x={mapX(90)} y={zeroY + 20} textAnchor="middle" className="text-[11px] fill-slate-700 dark:fill-slate-300 font-bold">Strike A</text>
      <text x={mapX(90)} y={zeroY + 35} textAnchor="middle" className="text-[10px] fill-slate-500 dark:fill-slate-400">(Short Put)</text>

      <text x={mapX(100)} y={zeroY + 20} textAnchor="middle" className="text-[11px] fill-slate-700 dark:fill-slate-300 font-bold">Strike B</text>
      <text x={mapX(100)} y={zeroY + 35} textAnchor="middle" className="text-[10px] fill-slate-500 dark:fill-slate-400">(Long Call)</text>

      <text x={mapX(110)} y={zeroY + 20} textAnchor="middle" className="text-[11px] fill-slate-700 dark:fill-slate-300 font-bold">Strike C</text>
      <text x={mapX(110)} y={zeroY + 35} textAnchor="middle" className="text-[10px] fill-slate-500 dark:fill-slate-400">(Short Call)</text>

      {/* Titles */}
      <text x={width / 2} y={height - 5} textAnchor="middle" className="text-[11px] fill-slate-400 font-semibold uppercase tracking-wider">Underlying Asset Price at Expiration</text>
      <text x={15} y={height / 2} textAnchor="middle" transform={`rotate(-90, 15, ${height / 2})`} className="text-[11px] fill-slate-400 font-semibold uppercase tracking-wider">Profit / Loss</text>
    </svg>
  );
};

export default function SeagullSpreadArticle() {
  return (
    <ArticleFrame slug="seagull-spread-options-strategy-architecture">
      <div className="pb-24">
        <InfographicSlot alt="Seagull Spread Options Strategy Infographic" />
        
        <div className="max-w-4xl mx-auto">
          {/* 1. Introduction */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Introduction to the Options Landscape</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Within the highly sophisticated architecture of modern financial derivatives, institutional investors, corporate treasurers, and portfolio managers are perpetually engaged in the pursuit of optimizing the delicate equilibrium between capital efficiency, directional exposure, and absolute risk mitigation.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Direct directional plays suffer from the friction of premium decay and high implied volatility costs. Conversely, standard spread strategies define and cap risk but inherently limit the magnitude of potential profitability.
            </p>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-6 my-8 rounded-r-lg">
              <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-3 font-serif flex items-center gap-2">
                <Zap className="w-5 h-5" /> The Core Philosophy
              </h3>
              <p className="text-indigo-800 dark:text-indigo-200 mb-0 leading-relaxed">
                The Seagull effectively finances directional speculation or portfolio hedging, frequently resulting in a "zero-cost" or even a net-credit entry profile. It is the deliberate, calculated exchange of theoretical unlimited profit potential and the explicit assumption of tail risk in return for the complete elimination of upfront premium outlays.
              </p>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 2. Origins */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Origins in FX and Commodities</h2>
            </div>
            
            <ComparisonGrid>
              <ComparisonCard title="Corporate FX Hedging" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Corporations issuing massive volumes of debt in foreign currency markets require hedges that do not cannibalize operational budgets. For instance, Mexico's Pemex transitioned from traditional cross-currency swaps to Seagull options to secure a zero-cost hedge that still allowed upside capture from favorable currency fluctuations.
                </p>
              </ComparisonCard>
              <ComparisonCard title="Commodity Buffering" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Businesses deeply invested in physical commodities face immense operational risks during geopolitical crises. By utilizing a Seagull spread, corporations secure an absolute cap on raw material costs, financed seamlessly by selling an OTM put during periods of skyrocketing implied volatility.
                </p>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 3. Structural Mechanics */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Scale className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Structural Mechanics & Architecture</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The Seagull spread is a strictly directional, three-legged strategy consisting of options on the identical underlying asset, with all three contracts sharing the exact same expiration date.
            </p>

            <div className="space-y-12">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-2xl border border-emerald-200 dark:border-emerald-800/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-full text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-300 font-serif">The Bullish Seagull</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800 shadow-sm">
                    <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">1. Long Call</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400"><strong>The Acceleration Leg.</strong> Purchases an ATM/OTM call to capture upward price action.</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800 shadow-sm">
                    <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">2. Short Call</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400"><strong>The Capping Leg.</strong> Sells a further OTM call. Caps maximum upside but reduces net cost.</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800 shadow-sm">
                    <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">3. Short Put</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400"><strong>The Financing Leg.</strong> Sells an OTM put below market price to entirely fund the long exposure.</p>
                  </div>
                </div>
                
                <FormulaPanel 
                  title="Net Premium Cost"
                  formula="Net \\approx C_1 (Long\\ Call) - C_2 (Short\\ Call) - P_1 (Short\\ Put) \\approx 0"
                />
              </div>

              <div className="bg-rose-50 dark:bg-rose-900/20 p-8 rounded-2xl border border-rose-200 dark:border-rose-800/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-rose-100 dark:bg-rose-900 p-3 rounded-full text-rose-600 dark:text-rose-400">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-rose-900 dark:text-rose-300 font-serif">The Bearish Seagull</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-rose-100 dark:border-rose-800 shadow-sm">
                    <h4 className="font-bold text-rose-800 dark:text-rose-300 mb-2">1. Long Put</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400"><strong>The Acceleration Leg.</strong> Purchases an ATM/OTM put to capture downward price action.</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-rose-100 dark:border-rose-800 shadow-sm">
                    <h4 className="font-bold text-rose-800 dark:text-rose-300 mb-2">2. Short Put</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400"><strong>The Capping Leg.</strong> Sells a further OTM put. Limits maximum profit on downside but subsidizes cost.</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-rose-100 dark:border-rose-800 shadow-sm">
                    <h4 className="font-bold text-rose-800 dark:text-rose-300 mb-2">3. Short Call</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400"><strong>The Financing Leg.</strong> Sells an OTM call above market price to fund the remaining debit.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 4. Payoff Visual Section */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <LineChart className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Visualizing the Payoff</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The payoff profile of a Bullish Seagull reveals the stark strategic trade-off: surrendering unlimited upside and assuming extreme downside tail risk to manufacture a "zero-cost" medium-term directional bet.
            </p>
            
            <div className="flex justify-center mb-10">
              <PayoffDiagram />
            </div>
            
            <ComparisonGrid>
              <ComparisonCard title="Tail Risk Zone" tone="neg">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">Price &lt; Strike A</div>
                <p className="text-sm text-slate-700 dark:text-slate-300">Exponentially accelerating losses as the underlying price collapses through the short put financing leg.</p>
              </ComparisonCard>
              <ComparisonCard title="Zero-Cost Flatline" tone="neutral">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">Strike A ≤ Price ≤ Strike B</div>
                <p className="text-sm text-slate-700 dark:text-slate-300">The buffer zone. Both the long directional leg and the financing leg expire worthless. Capital preserved.</p>
              </ComparisonCard>
              <ComparisonCard title="Capped Profit Zone" tone="pos">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">Price &gt; Strike C</div>
                <p className="text-sm text-slate-700 dark:text-slate-300">The long call generates profit, but is forcefully arrested by the short call above it.</p>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 5. Volatility Skew */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Activity className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Equity Volatility Skew</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              To truly master the application of the Seagull spread, an institutional investor must possess a profound understanding of implied volatility (IV) and the <strong>volatility smirk</strong>.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              In modern equity markets, the volatility skew is predominantly downward-sloping. Large asset managers relentlessly purchase OTM put options for downside protection. This massive demand pushes up the premium of OTM puts relative to equidistant OTM call options.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-2xl border border-amber-200 dark:border-amber-800/50">
              <h4 className="text-amber-900 dark:text-amber-400 font-bold text-xl mb-4 font-serif">Asymmetric Pricing Arbitrage</h4>
              <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                The Bullish Seagull spread is uniquely positioned to exploit this structural pricing inefficiency. By selling heavily inflated OTM disaster protection (the skew), traders seamlessly fund heavily underpriced upside participation. It is a targeted relative-value institutional trade.
              </p>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 6. Greeks */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <BarChart className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Multi-Dimensional Risk Profiling</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The dynamic behavioral profile of the Seagull spread prior to expiration is strictly governed by its continuous sensitivity to the underlying pricing variables—the option Greeks.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white font-serif">Delta (Δ)</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong>Directional Velocity.</strong> Measures pure directional exposure. Net delta is overwhelmingly positive initially but highly non-linear. Rapid rallies neutralize delta to near absolute zero (the profit cap), while steep drop-offs massively increase delta, accelerating losses.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-6 h-6 text-purple-500" />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white font-serif">Gamma (Γ)</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong>The Acceleration Factor.</strong> Measures the rate of change of Delta. Seagulls feature complex gamma due to holding both long and short contracts. The "gamma trap" near the naked financing leg is the primary risk management challenge.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-amber-500" />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white font-serif">Theta (Θ)</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong>Time Decay Dynamics.</strong> Because the investor is short two option contracts and long only one, the positive theta from the out-of-the-money legs frequently outpaces the negative theta. Operates as highly resilient if the asset remains stagnant.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart className="w-6 h-6 text-rose-500" />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white font-serif">Vega (ν)</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong>Implied Volatility Sensitivity.</strong> Exhibits a net negative Vega profile. Structurally benefits from massive contractions in market volatility (a "volatility crush"). Sudden macroeconomic shocks become severe liabilities.
                </p>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 7. Risk Mitigation */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Risk Mitigation & Margin</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-t-4 border-red-500 shadow-sm border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 font-serif text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" /> The Naked Leg Danger
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  The absolute primary vulnerability resides entirely in the naked short option utilized to finance the structure. Novice participants frequently make the catastrophic mistake of equating zero upfront cost with zero risk.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border-t-4 border-orange-500 shadow-sm border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 font-serif text-lg">Dynamic Hedging</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  If the underlying equity aggressively sells off, portfolio managers dynamically hedge by shorting corresponding shares to neutralize delta and stop the acceleration of losses (the gamma trap).
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Institutional Margin Architecture</h3>
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 mb-3">Regulation T Margin</h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Under standard Reg T, margin requirements for an uncovered short leg are highly punitive. A zero-cost trade can encumber thousands of dollars per contract, drastically reducing Return on Capital (ROC).
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/50 pb-2 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Portfolio Margin (TIMS)
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Available to qualified institutional entities, PM evaluates the true risk holistically by stress-testing the portfolio across theoretical price points. It recognizes the offset of the long/short legs.
                  </p>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800/50 text-sm text-emerald-800 dark:text-emerald-300 font-medium">
                    Result: A massive margin reduction of 60% to 85% compared to Reg T, offering extreme capital efficiency leverage ratios approaching 6.7:1.
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}