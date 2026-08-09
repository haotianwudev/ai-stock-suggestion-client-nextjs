'use client';

import React from 'react';
import {
  Calculator, Clock, TrendingUp, Layers, Settings,
  BookOpen, AlertTriangle, Info, CheckCircle2, TrendingDown,
  Activity
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function AdvancedOptionRollingMechanicsPage() {
  return (
    <ArticleFrame slug="advanced-option-rolling-mechanics">
      <div className="pb-24">
        <InfographicSlot alt="Advanced Option Rolling Mechanics Infographic" />
        
        <main className="max-w-4xl mx-auto py-16">

          {/* Module 1 */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Module 1: Roll P&L Accounting</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The foundational error in modern option strategy is the conceptualization of a rolled option as an extended,
              singular trade. The mathematical reality dictates that a roll is the simultaneous execution of two distinct
              events: the realization of a terminal profit or loss on the original position, and the establishment of an
              entirely new position with a revised cost basis, duration, and strike profile.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif">The Loss Deferral Fallacy</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              When an options seller faces a tested or in-the-money (ITM) short put, the prevailing market heuristic is to
              "roll down and out for a credit." The inherent assumption is that receiving a net credit intrinsically
              improves the position. This is universally known as the "rolling for a credit" fallacy. Mathematically,
              rolling a position is strictly equivalent to closing the position for a realized loss and deploying capital
              into a completely new trade.
            </p>

            <FormulaPanel 
              title="Total P&L"
              formula="\text{P\&L}_{\text{total}} = (\text{Premium}_{\text{initial\_received}} - \text{Premium}_{\text{buyback}}) + (\text{Premium}_{\text{new\_sold}} - \text{Premium}_{\text{ultimate\_buyback}})"
            />

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed my-6">
              If the initial premium received was $1.00 and the buyback cost is $4.00, the position has realized a
              definitive, unrecoverable loss of $3.00. If the trader simultaneously sells a new option further out in
              time for $4.50, the broker platform may display a "net credit" of $0.50. However, the trader's net
              liquidating value has still suffered the $3.00 drawdown.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-xl my-8">
              <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> The Capital Reality
              </h4>
              <p className="text-amber-800 dark:text-amber-300/90 text-sm leading-relaxed">
                The decision to roll must be evaluated strictly on the standalone mathematical merits of the new position.
                If the trader would not organically sell the new option as an independent trade, the roll represents loss
                deferral disguised as position management.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Accounting Element Breakdown</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left border-collapse bg-white dark:bg-slate-900">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-semibold text-sm">
                    <th className="p-4 border-b border-slate-200 dark:border-slate-800">Accounting Element</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Treatment During a Roll</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Impact on Portfolio Ledger</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">Original Leg Premium</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Closed via Buy-to-Close or Sell-to-Close</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Locks in realized gain or loss for the current tax year (unless wash sale applies). Triggers Form 1099-B reporting.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">New Leg Premium</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Opened via Sell-to-Open or Buy-to-Open</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Establishes a new, independent cost basis. Re-establishes margin utilization.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">Net Credit/Debit</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Difference between close and open prices</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Irrelevant to cumulative profitability; simply indicates immediate cash flow at the moment of execution.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">Margin Buying Power</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Released by old leg, consumed by new leg</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Often increases capital requirements if rolling to a wider spread or higher-priced underlying.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">P&L Reporting UI</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Platform resets 'P&L Open'</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Creates psychological bias by hiding the aggregate sequence loss, encouraging commitment to negative-EV trades.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Module 2 */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Module 2: Roll Timing Optimization</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The optimization of roll timing relies entirely on systematic trigger frameworks rather than discretionary
              intuition or emotional response to market drawdowns. Quantitative backtesting demonstrates that the specific
              trigger chosen dramatically alters the realized return distribution, win rate, and maximum drawdown.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="Time-Based (21 DTE)" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Holding a short option inside the 21 DTE window means absorbing outsized, uncompensated Gamma risk
                  for rapidly diminishing Theta returns. Systematic strategies mandate exiting or rolling the position
                  at 21 DTE to truncate tail risk.
                </p>
              </ComparisonCard>
              <ComparisonCard title="Delta-Based Triggers" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Dictates rolling a position when the short strike is directly "tested" by spot price action, or when
                  its delta breaches a specific critical threshold (e.g., entering at 0.20 delta and rolling when it
                  hits 0.40 or 0.50).
                </p>
              </ComparisonCard>
            </ComparisonGrid>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-6 rounded-r-xl my-8">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2 flex items-center gap-2">
                <Info className="w-5 h-5" /> Interaction Effects
              </h4>
              <p className="text-indigo-800 dark:text-indigo-300/90 text-sm leading-relaxed">
                When combining triggers, a rigid hierarchical logic tree must be established. For example: target 50%
                P&L primary. If tested aggressively, execute a delta-based "Slide Roll". If neither happens by 21 DTE,
                the time trigger overrides all conditions to reset duration and avoid the Gamma trap.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left border-collapse bg-white dark:bg-slate-900">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-semibold text-sm">
                    <th className="p-4 border-b border-slate-200 dark:border-slate-800">Trigger Framework</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Execution Metric</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Primary Benefit</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Primary Drawback</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Optimal Deployment</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">Time-Based (21 DTE)</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Days to Expiration</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Eliminates terminal Gamma risk; resets trade duration.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Forces realization of losses on trades that might revert.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">High-probability income strategies (Iron Condors, Strangles).</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">Delta-Based (Tested)</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Absolute Delta</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Highly responsive to price; allows dynamic delta-neutral hedging.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Can result in 'whipsaw' losses if the market aggressively mean-reverts.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Undefined risk strangles via 'Slide Rolls'.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">P&L-Based (50% PT)</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Net Credit %</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Locks in profits efficiently; increases annualized ROC.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Stop-loss components often trigger on false volatility spikes.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Defined risk spreads with wide bid-ask parameters.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Module 3 */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Module 3: Volatility Surface Dynamics</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The true cost to roll an option is not solely a function of time value or intrinsic depth; it is deeply
              embedded in the multidimensional shape of the volatility surface mapping implied volatility (IV) across
              time (term structure) and strike price (skew).
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Term Structure: Contango vs. Backwardation</h3>
            
            <ul className="space-y-4 mb-10 text-slate-600 dark:text-slate-400">
              <li className="flex gap-4 items-start bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={24} />
                <div className="leading-relaxed">
                  <strong className="text-slate-900 dark:text-white block mb-1">Contango (Normal Market):</strong>
                  Upward-sloping term structure. Rolling forward is structurally subsidized as you buy near-term
                  low IV and sell longer-term high IV.
                </div>
              </li>
              <li className="flex gap-4 items-start bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <TrendingDown className="text-rose-500 shrink-0 mt-1" size={24} />
                <div className="leading-relaxed">
                  <strong className="text-slate-900 dark:text-white block mb-1">Backwardation (Market Panic):</strong>
                  Inverted term structure. Rolling forward carries a severe structural penalty as you buy back
                  near-term inflated premiums and sell longer-term subdued volatility.
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">The Vega Trap Post-Volatility Spike</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Rolling an option inherently increases the duration of the trade, which simultaneously increases its
              Vega (sensitivity to changes in implied volatility). When a market crashes and IV spikes, a trader
              rolling out in time is substituting a low-Vega contract for a high-Vega contract.
            </p>

            <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 p-6 rounded-r-xl">
              <h4 className="font-bold text-rose-900 dark:text-rose-200 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Dangerous Exposure
              </h4>
              <p className="text-rose-800 dark:text-rose-300/90 text-sm leading-relaxed">
                You are structurally adding massive Vega exposure at the exact moment implied volatility is at its
                absolute historical peak. If volatility continues to rise, the amplified Vega of the new contract
                will cause exponential, uncontrolled losses.
              </p>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Module 4 */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Module 4: Diagonal Rolls</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              A diagonal roll simultaneously alters both the expiration date and the strike price. This
              multi-dimensional adjustment fundamentally transforms the risk profile, the Greek exposures, and
              the capital efficiency of the overarching position.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="Calendar Spreads" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Different expirations, same strike. Highly Vega-positive and relatively Delta-neutral.
                </p>
              </ComparisonCard>
              <ComparisonCard title="Vertical Spreads" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Same expiration, different strikes. Highly directional (Delta-heavy) and relatively Vega-neutral.
                </p>
              </ComparisonCard>
              <ComparisonCard title="Diagonal Spreads" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Different expirations, different strikes. Combines directional bias (Delta) and time/vol bias (Theta/Vega).
                </p>
              </ComparisonCard>
            </ComparisonGrid>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 mt-10 font-serif">Risk Transformation</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              A critical danger of diagonal rolling involves the transition from a defined-risk parameter to an
              undefined-risk exposure. If a trader rolls the short leg of a diagonal call spread deep into the
              money, early assignment risk skyrockets.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              If assigned, the trader is forcefully required to sell 100 shares of the underlying stock short.
              While covered by a long LEAPS, the immediate Reg-T margin requirement for short stock can trigger
              an immediate margin call, liquidating the position at unfavorable prices.
            </p>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Module 5 */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Settings className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Module 5: Systematic Roll Rules</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The successful deployment of options income strategies requires the total abandonment of discretionary
              rolling in favor of mechanical, systematic, backtestable rulebooks. This eliminates emotional
              decision-making.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Position Sizing & Leverage</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              The most frequently violated rule of systematic rolling is maintaining static position sizing.
              Discretionary traders often attempt to "double down" to accelerate the breakeven point. Systematic
              rulebooks strictly prohibit increasing contract size during a defensive roll. The notional leverage
              must remain absolutely constant.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left border-collapse bg-white dark:bg-slate-900">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-semibold text-sm">
                    <th className="p-4 border-b border-slate-200 dark:border-slate-800">Income Strategy</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Primary Defense Mechanism</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Secondary Defense</th>
                    <th className="p-4 border-b border-l border-slate-200 dark:border-slate-800">Hard Stop Condition</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">Covered Calls</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Roll Up and Out for a Credit.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Let stock get assigned to free capital.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Duration exceeds 60 DTE to achieve credit.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">Short Puts (Wheel)</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Take assignment and write calls.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Roll down and out for credit if premium rich.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Fundamental thesis on underlying breaks.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">Short Strangles</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Roll untested side (Slide Roll) to neutralize delta.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Roll entire position out in time to re-center.</td>
                    <td className="p-4 border-l border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">Strikes invert or notional leverage &gt; 2.0x.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800 my-16" />

          {/* Conclusion */}
          <section className="text-center py-8">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 mb-6">
              <BookOpen size={32} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Conclusion</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
              The mechanics of option rolling transcend the basic definitions of closing and opening contracts.
              The retail belief that rolling is a costless deferral mechanism is a dangerous fallacy. True
              quantitative optimization is achieved by implementing rigid, systematic trigger frameworks,
              dynamically balancing time decay, and understanding term structure behaviors. Survival depends on
              disciplined rules that prioritize capital efficiency and strictly manage Vega exposure.
            </p>
          </section>

        </main>
      </div>
    </ArticleFrame>
  );
}
