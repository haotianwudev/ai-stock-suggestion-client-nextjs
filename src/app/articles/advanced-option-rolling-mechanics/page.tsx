'use client';

import React from 'react';
import {
  Calculator, Clock, TrendingUp, Layers, Settings,
  BookOpen, AlertTriangle, Info, CheckCircle2, TrendingDown,
  Activity, FileText, ExternalLink, LineChart, Maximize2
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// ─── Reusable Components ───────────────────────────────────────────────────────

const GradientText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r ${className}`}>{children}</span>
);

const SectionCard = ({
  id, icon: Icon, title, gradient, children,
}: {
  id?: string;
  icon: React.ElementType;
  title: string;
  gradient: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 mb-12 hover:shadow-2xl transition-shadow duration-300">
    <div className={`h-2 w-full bg-gradient-to-r ${gradient}`} />
    <div className="p-8 md:p-12">
      <div className="flex items-center gap-4 mb-8">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
      </div>
      <div className="space-y-6 text-slate-600 text-lg leading-relaxed">{children}</div>
    </div>
  </section>
);

const Callout = ({
  title, children, type = 'info',
}: {
  title?: string;
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'danger' | 'success';
}) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    danger: 'bg-rose-50 border-rose-200 text-rose-800',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  };
  const IconMap = { info: Info, warning: AlertTriangle, danger: AlertTriangle, success: CheckCircle2 };
  const Icon = IconMap[type];
  return (
    <div className={`p-6 rounded-2xl border ${styles[type]} flex gap-4 my-6`}>
      <Icon className="shrink-0 mt-1" size={24} />
      <div>
        {title && <h4 className="font-bold mb-2">{title}</h4>}
        <div className="opacity-90">{children}</div>
      </div>
    </div>
  );
};

const MathBlock = ({ formula }: { formula: string }) => (
  <div className="my-8 p-6 bg-slate-900 rounded-2xl shadow-inner overflow-x-auto text-center border border-slate-700">
    <code className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 font-mono text-base md:text-lg font-bold whitespace-nowrap">
      {formula}
    </code>
  </div>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4 tracking-tight flex items-center gap-2">
    <div className="w-1.5 h-6 bg-slate-300 rounded-full" />
    {children}
  </h3>
);

interface TableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}

const DataTable = ({ headers, rows }: TableProps) => (
  <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-slate-50 border-b border-slate-200">
          {headers.map((h, i) => (
            <th key={i} className="py-4 px-6 font-bold text-slate-700 whitespace-nowrap text-sm">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className={`py-4 px-6 text-slate-600 text-sm ${j === 0 ? 'font-semibold text-slate-800' : ''}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdvancedOptionRollingMechanicsPage() {
  return (
    <ArticleFrame slug="advanced-option-rolling-mechanics">
      <InfographicSlot alt="Advanced Option Rolling Mechanics Infographic" />
      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-16 pt-12">

        {/* Module 1 */}
        <SectionCard icon={Calculator} title="Module 1: Roll P&L Accounting" gradient="from-blue-500 to-cyan-400">
          <p>
            The foundational error in modern option strategy is the conceptualization of a rolled option as an extended,
            singular trade. The mathematical reality dictates that a roll is the simultaneous execution of two distinct
            events: the realization of a terminal profit or loss on the original position, and the establishment of an
            entirely new position with a revised cost basis, duration, and strike profile.
          </p>

          <SubHeading>The Loss Deferral Fallacy</SubHeading>
          <p>
            When an options seller faces a tested or in-the-money (ITM) short put, the prevailing market heuristic is to
            &ldquo;roll down and out for a credit.&rdquo; The inherent assumption is that receiving a net credit intrinsically
            improves the position. This is universally known as the &ldquo;rolling for a credit&rdquo; fallacy. Mathematically,
            rolling a position is strictly equivalent to closing the position for a realized loss and deploying capital
            into a completely new trade.
          </p>

          <MathBlock formula="P&L_total = (Premium_initial_received − Premium_buyback) + (Premium_new_sold − Premium_ultimate_buyback)" />

          <p>
            If the initial premium received was $1.00 and the buyback cost is $4.00, the position has realized a
            definitive, unrecoverable loss of $3.00. If the trader simultaneously sells a new option further out in
            time for $4.50, the broker platform may display a &ldquo;net credit&rdquo; of $0.50. However, the trader&apos;s net
            liquidating value has still suffered the $3.00 drawdown.
          </p>

          <Callout title="The Capital Reality" type="warning">
            The decision to roll must be evaluated strictly on the standalone mathematical merits of the new position.
            If the trader would not organically sell the new option as an independent trade, the roll represents loss
            deferral disguised as position management.
          </Callout>

          <SubHeading>Accounting Element Breakdown</SubHeading>
          <DataTable
            headers={["Accounting Element", "Treatment During a Roll", "Impact on Portfolio Ledger"]}
            rows={[
              [
                "Original Leg Premium",
                "Closed via Buy-to-Close or Sell-to-Close",
                "Locks in realized gain or loss for the current tax year (unless wash sale applies). Triggers Form 1099-B reporting.",
              ],
              [
                "New Leg Premium",
                "Opened via Sell-to-Open or Buy-to-Open",
                "Establishes a new, independent cost basis. Re-establishes margin utilization.",
              ],
              [
                "Net Credit/Debit",
                "Difference between close and open prices",
                "Irrelevant to cumulative profitability; simply indicates immediate cash flow at the moment of execution.",
              ],
              [
                "Margin Buying Power",
                "Released by old leg, consumed by new leg",
                "Often increases capital requirements if rolling to a wider spread or higher-priced underlying.",
              ],
              [
                "P&L Reporting UI",
                "Platform resets 'P&L Open'",
                "Creates psychological bias by hiding the aggregate sequence loss, encouraging commitment to negative-EV trades.",
              ],
            ]}
          />
        </SectionCard>

        {/* Module 2 */}
        <SectionCard icon={Clock} title="Module 2: Roll Timing Optimization" gradient="from-purple-500 to-pink-500">
          <p>
            The optimization of roll timing relies entirely on systematic trigger frameworks rather than discretionary
            intuition or emotional response to market drawdowns. Quantitative backtesting demonstrates that the specific
            trigger chosen dramatically alters the realized return distribution, win rate, and maximum drawdown.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-purple-600" size={22} />
                <h4 className="text-xl font-bold text-slate-800">Time-Based (21 DTE)</h4>
              </div>
              <p className="text-slate-600">
                Holding a short option inside the 21 DTE window means absorbing outsized, uncompensated Gamma risk
                for rapidly diminishing Theta returns. Systematic strategies mandate exiting or rolling the position
                at 21 DTE to truncate tail risk.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="text-pink-600" size={22} />
                <h4 className="text-xl font-bold text-slate-800">Delta-Based Triggers</h4>
              </div>
              <p className="text-slate-600">
                Dictates rolling a position when the short strike is directly &ldquo;tested&rdquo; by spot price action, or when
                its delta breaches a specific critical threshold (e.g., entering at 0.20 delta and rolling when it
                hits 0.40 or 0.50).
              </p>
            </div>
          </div>

          <Callout title="Interaction Effects" type="info">
            When combining triggers, a rigid hierarchical logic tree must be established. For example: target 50%
            P&L primary. If tested aggressively, execute a delta-based &ldquo;Slide Roll&rdquo;. If neither happens by 21 DTE,
            the time trigger overrides all conditions to reset duration and avoid the Gamma trap.
          </Callout>

          <DataTable
            headers={["Trigger Framework", "Execution Metric", "Primary Benefit", "Primary Drawback", "Optimal Deployment"]}
            rows={[
              [
                "Time-Based (21 DTE)",
                "Days to Expiration",
                "Eliminates terminal Gamma risk; resets trade duration.",
                "Forces realization of losses on trades that might revert.",
                "High-probability income strategies (Iron Condors, Strangles).",
              ],
              [
                "Delta-Based (Tested)",
                "Absolute Delta",
                "Highly responsive to price; allows dynamic delta-neutral hedging.",
                "Can result in 'whipsaw' losses if the market aggressively mean-reverts.",
                "Undefined risk strangles via 'Slide Rolls'.",
              ],
              [
                "P&L-Based (50% PT)",
                "Net Credit %",
                "Locks in profits efficiently; increases annualized ROC.",
                "Stop-loss components often trigger on false volatility spikes.",
                "Defined risk spreads with wide bid-ask parameters.",
              ],
            ]}
          />
        </SectionCard>

        {/* Module 3 */}
        <SectionCard icon={TrendingUp} title="Module 3: Volatility Surface Dynamics" gradient="from-emerald-400 to-teal-500">
          <p>
            The true cost to roll an option is not solely a function of time value or intrinsic depth; it is deeply
            embedded in the multidimensional shape of the volatility surface mapping implied volatility (IV) across
            time (term structure) and strike price (skew).
          </p>

          <SubHeading>Term Structure: Contango vs. Backwardation</SubHeading>
          <ul className="space-y-4 mb-8">
            <li className="flex gap-4 items-start">
              <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={22} />
              <div>
                <strong className="text-slate-800">Contango (Normal Market):</strong>{' '}
                Upward-sloping term structure. Rolling forward is structurally subsidized as you buy near-term
                low IV and sell longer-term high IV.
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <TrendingDown className="text-rose-500 shrink-0 mt-1" size={22} />
              <div>
                <strong className="text-slate-800">Backwardation (Market Panic):</strong>{' '}
                Inverted term structure. Rolling forward carries a severe structural penalty as you buy back
                near-term inflated premiums and sell longer-term subdued volatility.
              </div>
            </li>
          </ul>

          <SubHeading>The Vega Trap Post-Volatility Spike</SubHeading>
          <p>
            Rolling an option inherently increases the duration of the trade, which simultaneously increases its
            Vega (sensitivity to changes in implied volatility). When a market crashes and IV spikes, a trader
            rolling out in time is substituting a low-Vega contract for a high-Vega contract.
          </p>

          <Callout title="Dangerous Exposure" type="danger">
            You are structurally adding massive Vega exposure at the exact moment implied volatility is at its
            absolute historical peak. If volatility continues to rise, the amplified Vega of the new contract
            will cause exponential, uncontrolled losses.
          </Callout>
        </SectionCard>

        {/* Module 4 */}
        <SectionCard icon={Layers} title="Module 4: Diagonal Rolls" gradient="from-amber-400 to-orange-500">
          <p>
            A diagonal roll simultaneously alters both the expiration date and the strike price. This
            multi-dimensional adjustment fundamentally transforms the risk profile, the Greek exposures, and
            the capital efficiency of the overarching position.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">Calendar Spreads</h4>
              <p className="text-sm text-slate-600">
                Different expirations, same strike. Highly Vega-positive and relatively Delta-neutral.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-2">Vertical Spreads</h4>
              <p className="text-sm text-slate-600">
                Same expiration, different strikes. Highly directional (Delta-heavy) and relatively Vega-neutral.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200 shadow-sm">
              <h4 className="font-bold text-orange-800 mb-2">Diagonal Spreads</h4>
              <p className="text-sm text-orange-700">
                Different expirations, different strikes. Combines directional bias (Delta) and time/vol bias (Theta/Vega).
              </p>
            </div>
          </div>

          <SubHeading>Risk Transformation</SubHeading>
          <p>
            A critical danger of diagonal rolling involves the transition from a defined-risk parameter to an
            undefined-risk exposure. If a trader rolls the short leg of a diagonal call spread deep into the
            money, early assignment risk skyrockets.
          </p>
          <p className="mt-4">
            If assigned, the trader is forcefully required to sell 100 shares of the underlying stock short.
            While covered by a long LEAPS, the immediate Reg-T margin requirement for short stock can trigger
            an immediate margin call, liquidating the position at unfavorable prices.
          </p>
        </SectionCard>

        {/* Module 5 */}
        <SectionCard icon={Settings} title="Module 5: Systematic Roll Rules" gradient="from-indigo-500 to-blue-600">
          <p>
            The successful deployment of options income strategies requires the total abandonment of discretionary
            rolling in favor of mechanical, systematic, backtestable rulebooks. This eliminates emotional
            decision-making.
          </p>

          <SubHeading>Position Sizing &amp; Leverage</SubHeading>
          <p>
            The most frequently violated rule of systematic rolling is maintaining static position sizing.
            Discretionary traders often attempt to &ldquo;double down&rdquo; to accelerate the breakeven point. Systematic
            rulebooks strictly prohibit increasing contract size during a defensive roll. The notional leverage
            must remain absolutely constant.
          </p>

          <DataTable
            headers={["Income Strategy", "Primary Defense Mechanism", "Secondary Defense", "Hard Stop Condition"]}
            rows={[
              [
                "Covered Calls",
                "Roll Up and Out for a Credit.",
                "Let stock get assigned to free capital.",
                "Duration exceeds 60 DTE to achieve credit.",
              ],
              [
                "Short Puts (Wheel)",
                "Take assignment and write calls.",
                "Roll down and out for credit if premium rich.",
                "Fundamental thesis on underlying breaks.",
              ],
              [
                "Short Strangles",
                "Roll untested side (Slide Roll) to neutralize delta.",
                "Roll entire position out in time to re-center.",
                "Strikes invert or notional leverage &gt; 2.0x.",
              ],
            ]}
          />
        </SectionCard>

        {/* Conclusion */}
        <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-100 text-slate-600 mb-6">
            <BookOpen size={32} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Conclusion</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            The mechanics of option rolling transcend the basic definitions of closing and opening contracts.
            The retail belief that rolling is a costless deferral mechanism is a dangerous fallacy. True
            quantitative optimization is achieved by implementing rigid, systematic trigger frameworks,
            dynamically balancing time decay, and understanding term structure behaviors. Survival depends on
            disciplined rules that prioritize capital efficiency and strictly manage Vega exposure.
          </p>
        </section>

      </main>
    </ArticleFrame>
  );
}
