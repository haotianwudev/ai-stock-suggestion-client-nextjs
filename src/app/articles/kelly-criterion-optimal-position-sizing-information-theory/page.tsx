'use client';

import React from 'react';
import { BookOpen, Lightbulb, LineChart, PieChart, AlertTriangle, Building2, Users, CheckCircle2, XCircle, Sigma, Zap, ChevronRight } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function KellyCriterionArticle() {
  return (
    <ArticleFrame slug="kelly-criterion-optimal-position-sizing-information-theory">
      <div className="pb-24">
        <InfographicSlot alt="Kelly Criterion Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Key Takeaways & Intro */}
          <section className="py-16">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Introduction &amp; Origins</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  In probability theory and financial economics, market participants face two distinct challenges: finding a statistical edge (Alpha), and determining how much capital to risk on that edge (Position Sizing).
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Developed in 1956 by John Larry Kelly Jr. at AT&amp;T's Bell Laboratories, the Kelly Criterion is a mathematically rigorous risk allocation formula. Its goal is to maximize the long-term expected value of the logarithm of wealth—which equates to maximizing the long-term geometric growth rate of a portfolio.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Interestingly, it wasn't born on Wall Street. It emerged from <strong>Information Theory</strong>, pioneered by Claude Shannon. Kelly showed that a bettor's capital could grow exponentially at a rate precisely equal to the rate of information transmission over a noisy communication channel.
                </p>
              </div>

              <div className="lg:w-1/3 min-w-0">
                <div className="p-6 bg-[#14171B] dark:bg-[#05070A] text-white border-none shadow-xl rounded-3xl h-full">
                  <h2 className="font-serif text-xl flex items-center gap-2 mb-6">
                    <Lightbulb className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" />
                    Key Takeaways
                  </h2>
                  <ul className="space-y-4 text-sm text-slate-300">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <span>A brilliant strategy with flawed position sizing guarantees absolute ruin.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <span>Maximizing simple expected value leads to bankruptcy; logarithmic utility penalizes ruin.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <span>Institutions trade at "Fractional Kelly" to survive estimation error and extreme drawdowns.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-3xl p-8 min-w-0">
              <h4 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]" />
                The Golden Rule of Risk
              </h4>
              <p className="text-blue-800 dark:text-blue-200/80 leading-relaxed">
                A trader with a mediocre strategy but an exceptional risk management model can survive and compound wealth. A trader with a brilliant strategy but a flawed position sizing model will almost certainly face absolute ruin.
              </p>
            </div>
          </section>

          {/* Section 2: Foundations */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Information Theoretic Foundations</h2>
            </div>
            
            <div className="space-y-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-12">
              <p>Claude Shannon defined <em>entropy</em> as the mathematical measure of uncertainty. John Kelly attached an economic utility to this. He realized that maximizing the simple expected value (arithmetic mean) of bets leads to catastrophic ruin, because you'd bet 100% of your bankroll on any positive expectation—guaranteeing bankruptcy the first time you lose.</p>
              <p>Instead, Kelly adopted the <strong>logarithmic utility function</strong> (proposed by Daniel Bernoulli in 1738). The logarithm function strictly penalizes total ruin (as log(0) approaches negative infinity), naturally forcing a bettor to retain a fraction of capital in reserve.</p>
            </div>

            <FormulaPanel 
              title="The Discrete Binary Kelly Formula"
              formula="f^* = \\frac{bp - q}{b}"
              legend={[
                { label: "f*", value: "Optimal fraction of your bankroll to wager" },
                { label: "p", value: "Probability of winning" },
                { label: "q", value: "Probability of losing (1 - p)" },
                { label: "b", value: "Payout ratio (net odds received)" }
              ]}
            />

            <p className="mt-8 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              If your mathematical edge is zero (p matches implied market probability), the formula yields exactly zero. No bet should be placed. If the formula is negative, you should take the opposite side of the trade!
            </p>
          </section>

          {/* Section 3: Continuous Markets */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <LineChart className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Continuous Markets &amp; MPT</h2>
            </div>
            
            <div className="space-y-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-12">
              <p>Financial markets rarely offer binary outcomes. In equities and derivatives, returns are continuous. Assuming asset prices follow Geometric Brownian Motion, the optimal Kelly allocation transforms into the <strong>Merton Fraction</strong>.</p>
            </div>

            <FormulaPanel 
              title="Continuous Kelly (Merton Fraction)"
              formula="f^* = \\frac{\\mu - r}{\\sigma^2}"
              legend={[
                { label: "μ", value: "Expected return" },
                { label: "r", value: "Risk-free rate" },
                { label: "σ²", value: "Variance" },
                { label: "Note", value: "Allocation is directly proportional to the risk premium and inversely proportional to systemic risk." }
              ]}
            />

            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-16 mb-8 font-serif">Kelly vs. Markowitz Mean-Variance</h3>
            
            <ComparisonGrid>
              <ComparisonCard
                title="Markowitz (MPT)"
                type="neutral"
                items={[
                  "Maximize return for a subjective level of risk.",
                  "Highly diversified to smooth equity curve.",
                  "Drawdown risk moderated by variance penalties."
                ]}
              />
              <ComparisonCard
                title="Kelly Criterion"
                type="neutral"
                items={[
                  "Maximize long-term expected geometric growth.",
                  "Highly concentrated; allocates 0% to inferior assets.",
                  "Drawdown risk is extremely high; tolerates massive short-term pain."
                ]}
              />
            </ComparisonGrid>
          </section>

          {/* Section 4: Options Trading */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <PieChart className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Kelly in Options Trading</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Options trading bridges the discrete and continuous mathematical realms. While pricing follows stochastic continuous processes, at expiration, an option resolves into a strictly discrete payoff.
            </p>

            <div className="grid md:grid-cols-2 gap-6 min-w-0 mb-8">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-lg flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-[#A8672E] dark:text-[#D08F52]" /> Probabilities
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Quantitative traders use the Black-Scholes model to extract market-implied probabilities, often approximated by the option's Delta. They compare this to their own Bayesian updated models to find their 'edge' for the Kelly formula.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-lg flex items-center">
                  <Sigma className="w-5 h-5 mr-2 text-[#A8672E] dark:text-[#D08F52]" /> Multi-Leg Strategies
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  For asymmetric strategies like Iron Condors, traders calculate net math across legs. E.g., an 85% win probability with a $300 credit and $1,500 max loss yields a discrete Kelly fraction recommending a precise capital percentage.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-3xl p-8 min-w-0">
              <h4 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A]" />
                Catastrophic Loss Adjustments
              </h4>
              <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed">
                Standard binary math fails for naked options due to Black Swan gap-downs. Advanced formulations map a three-state distribution (win, average loss, catastrophic loss), requiring a quadratic Kelly equation to size positions down safely.
              </p>
            </div>
          </section>

          {/* Section 5: Vulnerabilities */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Vulnerabilities &amp; Estimation Error</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Why does a theoretically perfect formula fail in practice? <strong>Estimation Risk.</strong> Financial probabilities are never known with certainty. The Kelly formula is violently sensitive to input errors, especially overestimating your edge.
            </p>

            <div className="bg-[#14171B] dark:bg-[#05070A] p-8 md:p-10 rounded-3xl border border-slate-800 mb-10 min-w-0">
              <h3 className="text-xl font-bold text-white mb-6 font-serif">The Chopra-Ziemba Ratio (20:2:1)</h3>
              <ul className="space-y-4 text-slate-300 text-sm md:text-base">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A] mt-0.5 shrink-0" />
                  <span><strong className="text-[#BC4128] dark:text-[#E2694A]">Expected Mean Return (Impact: 20x)</strong> - Catastrophic. Overestimating leads to massive over-leveraging and direct ruin.</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <span><strong className="text-amber-500">Variance (Impact: 2x)</strong> - Moderate. Underestimating leads to excessive sizing, but overshadowed by mean errors.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5 shrink-0" />
                  <span><strong className="text-[#1D8A70] dark:text-[#3CBF9C]">Covariance (Impact: 1x)</strong> - Low. Rarely triggers direct portfolio blowouts.</span>
                </li>
              </ul>
            </div>

            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">Volatility Drag &amp; Drawdowns</h4>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              A portfolio operating at "Full Kelly" has an inherent 33% chance of experiencing a 66% drawdown, and a 20% chance of an 80% drawdown. Due to negative geometric drag, a 50% loss requires a 100% gain just to break even. Betting even a fraction of a percent <em>over</em> optimal Kelly plummets your expected growth rate into negative territory.
            </p>
          </section>

          {/* Section 6: Institutional Usage */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Institutional Application: Fractional Kelly</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Despite the dangers, Kelly remains the gold standard for quantitative hedge funds (pioneered by Ed Thorp). However, institutions <strong>almost never</strong> trade at "Full Kelly." To survive estimation error and extreme drawdowns, they use <strong>Fractional Kelly</strong>.
            </p>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm my-10 min-w-0">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-gray-900 text-sm text-center">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-5 font-bold text-slate-900 dark:text-slate-100">Strategy</th>
                    <th className="px-6 py-5 font-bold text-slate-900 dark:text-slate-100">Growth Retained</th>
                    <th className="px-6 py-5 font-bold text-slate-900 dark:text-slate-100">Variance Experienced</th>
                    <th className="px-6 py-5 font-bold text-slate-900 dark:text-slate-100">80% Drawdown Prob.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-600 dark:text-slate-400">
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">Full Kelly (1.0x)</td>
                    <td className="px-6 py-4 text-[#1D8A70] dark:text-[#3CBF9C] font-bold">100%</td>
                    <td className="px-6 py-4 text-[#BC4128] dark:text-[#E2694A] font-bold">100%</td>
                    <td className="px-6 py-4 text-[#BC4128] dark:text-[#E2694A]">~20.0% (1-in-5)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">Half Kelly (0.5x)</td>
                    <td className="px-6 py-4">75%</td>
                    <td className="px-6 py-4">25% (1/4th)</td>
                    <td className="px-6 py-4">Extremely Low</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Quarter Kelly (0.25x)</td>
                    <td className="px-6 py-4 font-medium">~50%</td>
                    <td className="px-6 py-4 font-medium">Negligible</td>
                    <td className="px-6 py-4 font-medium text-[#1D8A70] dark:text-[#3CBF9C]">Near Zero</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              By dropping to a Half or Quarter Kelly, funds sacrifice a small top-end growth rate for an exponential reduction in volatility, creating a mathematical margin of safety. Advanced desks also use <strong>Risk-Constrained Kelly (RCK)</strong> to cap drawdowns and <strong>Bayesian Kelly</strong> to adapt probabilities dynamically tick-by-tick.
            </p>
          </section>

          {/* Section 7: Retail Investors */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Suitability for Retail Investors</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Is the Kelly Criterion suitable for the common retail investor? In practice: <strong className="text-slate-900 dark:text-white">No.</strong>
            </p>

            <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-3xl p-8 mb-8 min-w-0">
              <h4 className="text-lg font-bold text-rose-900 dark:text-rose-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A]" />
                The Illusion of Known Probabilities
              </h4>
              <p className="text-rose-800 dark:text-rose-200/80 leading-relaxed">
                Retail investors lack the infrastructure to calculate real-time probability density functions. When a retail trader guesses a "60% chance of going up" based on chart patterns, feeding that emotional guess into the hyper-sensitive Kelly formula is mathematically lethal.
              </p>
            </div>

            <ul className="space-y-4 mb-12">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#A8672E] dark:text-[#D08F52] mt-2 shrink-0" />
                <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong className="text-slate-900 dark:text-slate-200">Capital &amp; Micro-structure Friction:</strong> Kelly assumes continuous, costless rebalancing. For retail, bid-ask spreads, commissions, and taxes quickly erode the geometric growth curve.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#A8672E] dark:text-[#D08F52] mt-2 shrink-0" />
                <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong className="text-slate-900 dark:text-slate-200">Extreme Concentration:</strong> Kelly eschews passive diversification. It might tell you to put 40% of your net worth into a single options spread—violating prudent index investing principles.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#A8672E] dark:text-[#D08F52] mt-2 shrink-0" />
                <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  <strong className="text-slate-900 dark:text-slate-200">Psychological Tolerance:</strong> Human loss aversion guarantees that a retail investor facing a mathematically "normal" 30% Kelly drawdown will panic and liquidate at the bottom, locking in permanent loss.
                </span>
              </li>
            </ul>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-3xl min-w-0">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Conclusion</h4>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                The Kelly Criterion is the absolute mathematical truth of capital compounding. It establishes the frontier of risk and reward—proving that excessive caution yields stagnation, but excessive aggression guarantees destruction. While it remains the engine of Wall Street quants, retail traders are much better served by fixed-fractional sizing (e.g., risking exactly 1-2% per trade) to ensure psychological endurance and long-term survival.
              </p>
            </div>
          </section>
        </div>
      </div>
    </ArticleFrame>
  );
}
