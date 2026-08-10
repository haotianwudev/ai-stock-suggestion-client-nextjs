'use client';

import React from 'react';
import { TrendingDown, AlertTriangle, Activity, BarChart2, BookOpen, Calculator, ShieldAlert, Lightbulb, TrendingUp, AlertCircle, ChevronRight, Zap } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock } from '@/components/articles/math';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

export default function ArticlePage() {
  return (
    <ArticleFrame slug="strategy-decay-factor-fragility-regime-aware-portfolio-construction">
      <div className="pb-24">
        <InfographicSlot alt="Strategy Decay & Factor Fragility Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Section 1: Foundation */}
          <section className="py-16">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Foundation &amp; Traditional Metrics</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Systematic investing relies heavily on historical backtests, but structural breakdowns in investment logic—known as <strong className="text-slate-900 dark:text-white">strategy decay</strong>—can decimate portfolios upon live deployment.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Traditional metrics like the <Jargon term="Sharpe Ratio">A measure of risk-adjusted return, calculated by subtracting the risk-free rate from the return and dividing by the standard deviation.</Jargon> mask this vulnerability. Because they are aggregated, full-sample metrics, they assume markets are ergodic. A strategy might look robust purely because it amassed massive returns during a 10-year favorable regime (like Zero Interest Rate Policy), hiding systematic failures in hostile environments.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Similarly, <strong className="text-slate-900 dark:text-white">Maximum Drawdown (MaxDD)</strong> merely records the deepest historical decline. It cannot differentiate between a rapid exogenous shock (like a flash crash) and the slow, secular death of a strategy's core logic.
                </p>
              </div>

              <div className="lg:w-1/3 min-w-0">
                <div className="p-6 bg-[#14171B] dark:bg-[#05070A] text-white border-none shadow-xl rounded-3xl h-full">
                  <h2 className="font-serif text-xl flex items-center gap-2 mb-6">
                    <AlertTriangle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" />
                    Decay Types
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <strong className="block text-[#D08F52] mb-1">Alpha Decay</strong>
                      <p className="text-sm text-slate-300 leading-relaxed">The natural half-life of a predictive signal due to crowding. As an anomaly becomes known, arbitrageurs trade it away.</p>
                    </div>
                    <div>
                      <strong className="block text-[#D08F52] mb-1">Strategy Decay</strong>
                      <p className="text-sm text-slate-300 leading-relaxed">A structural breakdown. Occurs when fundamental macroeconomic or behavioral relationships reverse entirely, regardless of crowding.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-gray-900 min-w-0">
              <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <Activity className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]" />
                <h4 className="font-bold text-slate-900 dark:text-white">Empirical Fragility: Factor Performance (2020-2026)</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#14171B]/50 dark:bg-slate-900/20">
                      <th className="px-6 py-4 font-bold uppercase tracking-wider">Factor</th>
                      <th className="px-6 py-4 font-bold uppercase tracking-wider">2026 Performance</th>
                      <th className="px-6 py-4 font-bold uppercase tracking-wider">Primary Drivers &amp; Vulnerabilities</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                    <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-5 font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Momentum</td>
                      <td className="px-6 py-5">
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold block mb-1">Extreme Outperformance</span>
                        <span className="text-slate-500 dark:text-slate-400">(+9.5% top-bottom spread)</span>
                      </td>
                      <td className="px-6 py-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                        Trend-following in mega-cap tech. Highly vulnerable to violent reversals (the "Winner's Curse").
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-5 font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Quality</td>
                      <td className="px-6 py-5">
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold block mb-1">Strong Outperformance</span>
                        <span className="text-slate-500 dark:text-slate-400">(+5.7% spread)</span>
                      </td>
                      <td className="px-6 py-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                        Investors favored strong balance sheets amidst macro uncertainty.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-5 font-bold text-[#BC4128] dark:text-[#E2694A]">Value</td>
                      <td className="px-6 py-5">
                        <span className="text-[#BC4128] dark:text-[#E2694A] font-bold block mb-1">Severe Underperformance</span>
                      </td>
                      <td className="px-6 py-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                        Struggled against high-growth, high-multiple secular tech trends.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 2: Mechanics */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Deriving Minimum Regime Performance</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              To address the blindness of traditional metrics, quantitative literature introduced <strong className="text-slate-900 dark:text-white">Minimum Regime Performance (MRP)</strong>. It is the lowest realized risk-adjusted return across distinct historical regimes—a conservative lower bound on a strategy's durability.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-12 mb-6 font-serif">Defining Regimes</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Regimes are contiguous periods with stable macroeconomic dynamics. They are mathematically defined using:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12 min-w-0">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 min-w-0">
                <strong className="block text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-3 text-lg">Hidden Markov Models</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed block">Probabilistic models inferring hidden market states from observable volatility and returns.</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 min-w-0">
                <strong className="block text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-3 text-lg">Macro Clustering</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed block">Unsupervised learning (K-means) clustering multidimensional macro datasets like yield curves.</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 min-w-0">
                <strong className="block text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-3 text-lg">VIX / Volatility</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed block">Using sustained divergences between 20-day and 252-day realized volatility.</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-12 mb-6 font-serif">The Mathematics of MRP</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              The algorithm searches across all valid temporal splits of a return series to find the segment yielding the lowest performance. A minimum regime length, <code>d</code>, is enforced to ignore microscopic noise.
            </p>

            <div className="space-y-8 mb-10">
              <FormulaPanel 
                title="Single Split (MRP₁)"
                formula="\text{MRP}_1(x) = \min_{t_1 \in [d,\, n-d]} \{ \min(S(r_1), S(r_2)) \}"
                legend={[
                  { label: "Description", value: "For a series divided into two contiguous regimes at time t₁, evaluated by Sharpe ratio (S)." }
                ]}
              />
              
              <FormulaPanel 
                title="Multiple Splits (MRPₛ)"
                formula="\text{MRP}_s(x) = \min_{T} \{ \min(S(r_1), S(r_2), \ldots, S(r_{s+1})) \}"
                legend={[
                  { label: "Description", value: "For s splits partitioning into s+1 distinct regimes, representing the absolute minimum across all valid combinations." }
                ]}
              />

              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center min-w-0">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Number of valid splits (Combinatorics)</span>
                <MathBlock math="n_s = \binom{n - sd - d + s}{s}" />
              </div>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50 dark:bg-indigo-950/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/30">
              MRP acts conceptually like a <strong className="text-slate-900 dark:text-white">dynamic Calmar ratio</strong> applied in risk-adjusted space. Rather than isolating downside price volatility (Sortino) or a single historical crash (Calmar), MRP actively searches for the specific historical era where the <em className="text-indigo-800 dark:text-indigo-300">risk-adjusted compounding was fundamentally weakest</em>.
            </p>
          </section>

          {/* Section 3: Application */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Portfolio Construction &amp; Application</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Because MRP is a highly non-linear combinatorial search function, it cannot easily be injected into standard Mean-Variance Optimization (MVO). Instead, quants deploy it as a <strong className="text-slate-900 dark:text-white">pre-optimization threshold filter</strong>. If a strategy's <code>MRP/Sharpe</code> ratio is below tolerance, it's rejected.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-12 mb-6 font-serif">Case Study: Momentum &amp; Quality Across Regimes</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Evaluating factors through the Merrill Lynch Investment Clock provides an empirical look at strategy fragility:
            </p>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-10 min-w-0">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-gray-900 text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-5 text-left font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Macro Phase</th>
                    <th className="px-6 py-5 text-left font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Environment</th>
                    <th className="px-6 py-5 text-center font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider border-l border-slate-200 dark:border-slate-800">Momentum Return</th>
                    <th className="px-6 py-5 text-center font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Quality Return</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-600 dark:text-slate-400">
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-left font-bold text-slate-800 dark:text-slate-200">Recovery</td>
                    <td className="px-6 py-4">Growth ↑, Inflation ↓</td>
                    <td className="px-6 py-4 text-center font-bold text-[#1D8A70] dark:text-[#3CBF9C] border-l border-slate-100 dark:border-slate-800/50">8.79%</td>
                    <td className="px-6 py-4 text-center font-semibold">1.22%</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-left font-bold text-slate-800 dark:text-slate-200">Expansion</td>
                    <td className="px-6 py-4">Growth ↑, Inflation ↑</td>
                    <td className="px-6 py-4 text-center font-bold text-[#1D8A70] dark:text-[#3CBF9C] border-l border-slate-100 dark:border-slate-800/50">14.90%</td>
                    <td className="px-6 py-4 text-center font-semibold">2.74%</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-left font-bold text-slate-800 dark:text-slate-200">Slowdown</td>
                    <td className="px-6 py-4">Growth ↓, Inflation ↑</td>
                    <td className="px-6 py-4 text-center font-semibold border-l border-slate-200 dark:border-slate-800">6.18%</td>
                    <td className="px-6 py-4 text-center font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">6.86%</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-left font-bold text-slate-800 dark:text-slate-200">Contraction</td>
                    <td className="px-6 py-4">Growth ↓, Inflation ↓</td>
                    <td className="px-6 py-4 text-center text-[#BC4128] dark:text-[#E2694A] font-bold border-l border-slate-200 dark:border-slate-800">-12.08%</td>
                    <td className="px-6 py-4 text-center font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">5.48%</td>
                  </tr>
                  <tr className="border-t-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                    <td className="px-6 py-5 text-left font-bold text-slate-900 dark:text-white uppercase tracking-wider" colSpan={2}>Full Sample Average</td>
                    <td className="px-6 py-5 text-center font-bold text-slate-900 dark:text-white border-l border-slate-200 dark:border-slate-700">8.41%</td>
                    <td className="px-6 py-5 text-center font-bold text-slate-900 dark:text-white">4.18%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10 min-w-0">
              <div className="p-8 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/20 rounded-3xl border border-rose-200 dark:border-rose-900/50">
                <h4 className="font-bold text-rose-900 dark:text-rose-300 text-xl mb-4 flex items-center gap-3">
                  <TrendingDown className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] w-6 h-6" /> Momentum Vulnerability
                </h4>
                <p className="text-rose-800 dark:text-rose-200/80 leading-relaxed">
                  Despite a higher full-sample average (8.41%), its <strong className="font-bold text-rose-900 dark:text-rose-300">MRP is deeply negative</strong>. The strategy suffers from the "Winner's Curse", experiencing catastrophic drawdowns during market inflection points (Contraction).
                </p>
              </div>

              <div className="p-8 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-950/20 rounded-3xl border border-indigo-200 dark:border-indigo-900/50">
                <h4 className="font-bold text-indigo-900 dark:text-indigo-300 text-xl mb-4 flex items-center gap-3">
                  <TrendingUp className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] w-6 h-6" /> Quality Resilience
                </h4>
                <p className="text-indigo-800 dark:text-indigo-200/80 leading-relaxed">
                  Though its average return is lower (4.18%), its <strong className="font-bold text-indigo-900 dark:text-indigo-300">MRP remains strictly positive</strong> across all regimes. It acts as a structural anchor during hostile environments when leveraged cyclical assets fail.
                </p>
              </div>
            </div>

            <div className="bg-[#14171B] dark:bg-[#05070A] p-8 md:p-10 rounded-3xl border border-slate-800 flex items-start gap-6 min-w-0">
              <Zap className="w-8 h-8 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white text-xl mb-2 font-serif">Optimal Strategy</h4>
                <p className="text-slate-300 leading-relaxed text-lg">
                  By blending these with minimax correlation algorithms, we maximize <em className="text-[#A8672E] dark:text-[#D08F52] font-semibold">composite MRP</em>, coupling Momentum's high-velocity upside with Quality's low-velocity structural resilience.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Risks */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Meta-Risks of MRP Optimization</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
              Optimizing specifically for regime robustness introduces complex secondary hazards. Practitioners must navigate these statistical meta-risks to protect alpha.
            </p>

            <ComparisonGrid>
              <ComparisonCard
                title="1. Look-Ahead Bias"
                type="neg"
                items={[
                  "Historical MRP inherently pinpoints exact regime boundaries ex-post.",
                  "Live algorithms (like rolling HMMs) suffer statistical lag.",
                  "Backtests that flawlessly rotate at market peaks create a profound illusion of real-time adaptability."
                ]}
              />
              <ComparisonCard
                title="2. Historical Overfitting"
                type="neg"
                items={[
                  "Allowing too many regime splits causes the algorithm to slice transient noise into fake 'regimes'.",
                  "This hyper-granularity data-mines the backtest, forcing failures out-of-sample."
                ]}
              />
              <ComparisonCard
                title="3. The Small-Sample Problem"
                type="neg"
                items={[
                  "Often called the 'Peso Problem'.",
                  "Highly severe but brief regimes (e.g., March 2020) yield volatile, imprecise variance estimates.",
                  "Heavy optimization against rare N=20 events forces rejection of long-term robust strategies."
                ]}
              />
              <ComparisonCard
                title="4. Alpha Destruction via Hedging"
                type="neg"
                items={[
                  "Factor premiums exist precisely because they compensate for assuming un-hedged structural risk!",
                  "Relentless attempts to build a perfectly 'regime-neutral' portfolio strips away exposures until it merely replicates the risk-free rate."
                ]}
              />
            </ComparisonGrid>
          </section>

          {/* Section 5: Synthesis */}
          <section className="py-16">
            <div className="bg-gradient-to-br from-slate-900 to-[#14171B] text-slate-100 rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden min-w-0 flex flex-col items-center text-center">
              <div className="p-4 bg-white dark:bg-[#0A0D14]/10 backdrop-blur-md rounded-2xl mb-8 inline-block border border-white/10">
                <BookOpen size={32} className="text-[#A8672E] dark:text-[#D08F52]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white font-serif">Synthesis &amp; Strategic Outlook</h2>
              <div className="space-y-6 text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
                <p>
                  Strategy decay is the profound vulnerability of modern systematic finance. While traditional metrics mask fragility beneath high full-sample averages, the <strong className="text-white font-bold">MRP framework quantifies true expected shortfall</strong> across distinct macroeconomic regimes.
                </p>
                <p>
                  By mapping the decay-risk frontier, practitioners can intelligently budget strategy durability. However, allocators must avoid the siren song of absolute regime neutrality—true portfolio construction relies not on eradicating all risk, but deploying capital where that pain is sufficiently compensated.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ArticleFrame>
  );
}
