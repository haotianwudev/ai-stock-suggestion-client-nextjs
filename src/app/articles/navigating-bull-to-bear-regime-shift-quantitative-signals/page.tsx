'use client';

import React from 'react';
import { TrendingDown, Activity, Users, CreditCard, LineChart, ShieldAlert, Zap, History, Target, BarChart3, AlertTriangle, ArrowRight } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

export default function NavigatingBullToBearRegimeShift() {
  return (
    <ArticleFrame slug="navigating-bull-to-bear-regime-shift-quantitative-signals">
      <div className="pb-24">
        <InfographicSlot alt="Bull-to-Bear Regime Shift Infographic" />
        <main className="max-w-4xl mx-auto py-16 px-6 lg:px-8 space-y-24">
          
          {/* 1. Theoretical Framework */}
          <section>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-950 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
              <h2 className="text-3xl font-bold mb-4 font-serif">The Theoretical Framework</h2>
              <p className="text-lg text-blue-100 dark:text-blue-200 leading-relaxed mb-6">
                Financial markets do not operate in a permanent state of equilibrium. The transition from a mature, low-volatility bull market to a structural bear market is a &ldquo;phase transition.&rdquo; During this time, long-established statistical relationships and correlations systematically break down.
              </p>
              <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2 flex items-center font-serif">
                  <Target className="mr-2" /> The Regime-Change Window
                </h3>
                <p className="text-blue-50 dark:text-blue-100 text-sm leading-relaxed">
                  This is the early deterioration phase. It is not the capitulatory trough, but a treacherous zone characterized by stealthy rising volatility, weakening cross-sectional equity breadth, and the gradual breakdown of long-term trend lines. Traditional long-only allocations suffer severe geometric decay here.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Quantitative Signals */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-rose-600 dark:text-rose-500">
                <Activity size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">Quantitative Signals</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400">Indicators confirming the regime shift from expansion to contraction.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 border-t-4 border-t-rose-500 overflow-hidden flex flex-col h-full">
                <div className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-rose-600 dark:text-rose-400 mr-3">
                      <LineChart size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Term Structure (VIX/VXV)</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                    In a healthy bull market, the VIX futures curve is in contango (upward sloping). When near-term risk spikes, the curve flattens and inverts (backwardation).
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-rose-600 dark:text-rose-400">Signal Threshold:</span> VIX/VXV Ratio &gt; 1.0 to 1.25. Extreme readings pinpoint the violent acceleration of an early bear market phase.
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 border-t-4 border-t-blue-500 overflow-hidden flex flex-col h-full">
                <div className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400 mr-3">
                      <TrendingDown size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Breadth Deterioration</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                    Mega-cap equities may prop up indices while the median stock declines. Correlation often collapses early, creating a fragile environment prone to sudden unified downward trajectories.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-blue-600 dark:text-blue-400">Signal Threshold:</span> TRIN (Arms Index) &gt; 1.25 paired with a structurally falling A/D Line.
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 border-t-4 border-t-purple-500 overflow-hidden flex flex-col h-full">
                <div className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400 mr-3">
                      <Users size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Factor Crowding Unwinds</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                    Institutional capital heavily concentrates into prevailing momentum trades. A sudden decline in pairwise correlation within the momentum factor suggests a systematic reduction in crowded positions.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-purple-600 dark:text-purple-400">Signal Threshold:</span> MSCI Crowding Score &gt; 1.0. Crowded factors experience 7x higher frequency of significant drawdowns.
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 border-t-4 border-t-emerald-500 overflow-hidden flex flex-col h-full">
                <div className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400 mr-3">
                      <CreditCard size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Credit Spread Widening</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                    Bondholders sit higher in the capital structure and spot liquidity constraints first. As systemic liquidity recedes, default probabilities are repriced.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Signal Threshold:</span> Sustained High-Yield Option-Adjusted Spread (OAS) Expansion vs U.S. Treasuries.
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 3. Equity & Options Strategies */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-amber-600 dark:text-amber-500">
                <Zap size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">Systematic & Options Strategies</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400">Defending the portfolio and monetizing convexity during the transition.</p>
            </div>
            
            <div className="space-y-8">
              {/* Equity Strategy */}
              <div className="p-6 md:p-8 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/30">
                <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-300 mb-4 font-serif">Dynamic Factor Rotation & Momentum Shorts</h3>
                <p className="text-amber-800 dark:text-amber-200/80 mb-6 leading-relaxed">
                  Quantitative managers utilize <strong className="font-bold text-amber-900 dark:text-amber-100">Sparse Jump Models (SJM)</strong> to identify latent regimes. They rotate out of growth/momentum and overweight <strong className="font-bold text-amber-900 dark:text-amber-100">value, low-volatility, and quality</strong>. 
                </p>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-amber-200 dark:border-amber-800/50 shadow-sm flex items-start">
                  <AlertTriangle className="text-amber-500 mr-4 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">The Danger of Momentum Shorts</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 leading-relaxed">
                      In bear regimes, the short leg of a momentum portfolio (worst-performing stocks) behaves like a written call option. A violent bear-market rally causes exponential surges in these heavily shorted stocks due to short-covering panics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Options Table */}
              <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-4">Structural Defenses</h3>
              <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wider font-bold">
                      <th className="p-4 border-b border-slate-200 dark:border-slate-800">Options Strategy</th>
                      <th className="p-4 border-b border-slate-200 dark:border-slate-800">Composition</th>
                      <th className="p-4 border-b border-slate-200 dark:border-slate-800">Primary Advantage</th>
                      <th className="p-4 border-b border-slate-200 dark:border-slate-800">Key Risk</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="p-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">Put Ratio Spread (1x2)</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">Long 1 ATM Put, Short 2 OTM Puts</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">Entered for net credit; exploits steep IV skew.</td>
                      <td className="p-4 text-rose-600 dark:text-rose-400 font-medium">Unlimited downside risk in gap-down crash.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="p-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">Put-Heavy Collar</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">Long Stock, Short 1 Call, Long 2+ Puts</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">Neutralizes delta; finances downside protection.</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">Caps upside; requires active management.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="p-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">VIX Call Spread</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">Long VIX Call, Short Higher VIX Call</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">Mitigates contango drag and theta decay.</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">Capped profitability if volatility surges.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 4. Volatility Regime Trading */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-purple-600 dark:text-purple-500">
                <BarChart3 size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">Volatility Regime Trading</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400">Mastering the Greeks: Vega, Skew, and Gamma Dynamics.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 border-t-4 border-t-purple-400">
                <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white font-serif">Long Vega vs. Long Gamma</h3>
                <div className="text-slate-600 dark:text-slate-400 text-sm space-y-3">
                  <p><strong className="text-slate-800 dark:text-slate-200">Long Vega:</strong> Profits from rising <em>expected</em> volatility (implied), best deployed via longer-dated options during early deterioration.</p>
                  <p><strong className="text-slate-800 dark:text-slate-200">Long Gamma:</strong> Profits from <em>actual</em> large price movements. Suffers heavily from theta decay if the market doesn't swing wildly every day.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 border-t-4 border-t-purple-600">
                <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white font-serif">Skew Monetization</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  When OTM puts are heavily bid and overpriced relative to calls, traders execute <em>skew reversal trades</em>. They sell the overpriced puts to buy cheaper calls while remaining delta-neutral, profiting as panic subsides and the skew flattens.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 border-t-4 border-t-purple-800 dark:border-t-purple-400">
                <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white font-serif">Gamma Scalping</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  A variance-reduction technique holding positive gamma (e.g., a long straddle) while continuously delta-hedging (buying low, selling high). It only profits if <em>realized volatility exceeds implied volatility</em>, offsetting theta decay.
                </p>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 5. Risk Management */}
          <section>
            <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <ShieldAlert size={240} />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 flex items-center text-emerald-400 font-serif">
                  <ShieldAlert className="mr-3" /> Position Sizing & Risk Management
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-slate-100 font-serif">The Kelly Criterion & Fractional Kelly</h3>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                      Trading at &ldquo;Full Kelly&rdquo; in financial markets is inherently dangerous due to non-stationary distributions and fat tails. Quantitative managers universally employ <strong className="text-white font-bold">Fractional Kelly</strong> (Half or Quarter) to reduce portfolio variance and probability of ruin.
                    </p>
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 font-mono text-emerald-300 shadow-inner inline-block">
                      f* = (bp - q) / b
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-slate-100 font-serif">Volatility-Based Scaling</h3>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                      Position sizes must be inversely proportional to current market volatility (ATR). As the ATR expands during a regime shift, leverage must be mechanically reduced to keep absolute dollar-risk constant.
                    </p>
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 font-mono text-blue-300 shadow-inner inline-block">
                      Size = Risk / (ATR × M)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 6. Historical Precedents */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-500">
                <History size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">Historical Precedents</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400">Understanding the anatomy of past market transitions.</p>
            </div>
            
            <ComparisonGrid
              items={[
                {
                  title: "2000–2002: Structural Unwind",
                  description: "A prolonged, grinding deterioration un-winding tech euphoria. VIX hovered at elevated norms without violent spikes. Value and quality factors generated substantial relative outperformance.",
                  details: ["Slow Grind", "Tech Unwind", "Value Outperformed"]
                },
                {
                  title: "2007–2008: Structural Credit Crisis",
                  description: "Telegraphed by credit markets long before equity collapse. VIX term structure violently inverted. 2-state Markov switching models succeeded where single-state models failed.",
                  details: ["Credit Lead", "VIX Inversion", "Markov Switching"]
                },
                {
                  title: "2020: Event-Driven Shock",
                  description: "Unprecedented velocity. Correlation collapsed to 1.0. Constant volatility models (Black-Scholes) failed; stochastic models (Heston) pricing extreme negative correlation survived.",
                  details: ["Extreme Velocity", "Correlation = 1", "Stochastic Volatility"]
                },
                {
                  title: "2022: Cyclical Inflationary Bear",
                  description: "A slow, agonizing downward grind. Skew remained flat as institutions were already hedged. Gamma scalping was difficult due to slow daily drift penalizing long-gamma traders with theta decay.",
                  details: ["Inflationary", "Flat Skew", "Theta Decay Drag"]
                }
              ]}
            />
          </section>

          {/* 7. Current Playbook */}
          <section>
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 border border-orange-200 dark:border-orange-800/50 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-[0.03] dark:opacity-10 transform translate-x-1/4 translate-y-1/4 pointer-events-none">
                <Target size={300} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-orange-500 text-white p-2 rounded-xl shadow-sm">
                    <AlertTriangle size={24} />
                  </div>
                  <h2 className="text-3xl font-extrabold text-orange-900 dark:text-orange-400 font-serif">Actionable Playbook: March 2026</h2>
                </div>
                
                <div className="bg-white/60 dark:bg-black/20 p-5 rounded-xl border border-orange-200/50 dark:border-orange-800/30 mb-8 backdrop-blur-sm">
                  <p className="text-orange-900 dark:text-orange-200 font-medium">
                    <strong className="font-bold">Context:</strong> S&P 500 decisive structural breakdown below 200-day MA. Severe geopolitical escalation (U.S.-Iran), oil spikes, stagflation fears. VIX surging above 26.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ComparisonCard
                    title="Deploy Put Ratio Spreads"
                    tone="pos"
                    items={[
                      "Outright put purchasing is mathematically unsound.",
                      "Use 1x2 or 1x3 put ratio backspreads for net credit.",
                      "Monetize steepening skew, mitigate inflated IV."
                    ]}
                  />
                  <ComparisonCard
                    title="Systematic Factor Rotation"
                    tone="neutral"
                    items={[
                      "Reduce exposure to crowded AI semiconductor trades.",
                      "Rotate into low-volatility, quality, and energy.",
                      "Hedge the supply-chain shock structurally."
                    ]}
                  />
                  <ComparisonCard
                    title="Execute the Bull Steepener"
                    tone="pos"
                    items={[
                      "Stagflation compromises Fed's high-rate stance.",
                      "Implement yield curve bull steepener via Treasury futures.",
                      "Capture front-end rate collapses."
                    ]}
                  />
                  <ComparisonCard
                    title="Enforce Volatility Scaling"
                    tone="neg"
                    items={[
                      "VIX > 26 requires mechanical volatility scaling.",
                      "Contract gross leverage immediately.",
                      "Enforce Fractional Kelly to prevent VaR breaches."
                    ]}
                  />
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </ArticleFrame>
  );
}
