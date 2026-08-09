'use client';

import React from 'react';
import { BookOpen, Calculator, TrendingUp, AlertTriangle, ChevronRight, Activity, LineChart, Cpu } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

export default function OptimalEarlyExerciseArticle() {
  const table1Headers = ["Scenario", "Stock Price (S)", "Strike (K)", "Intrinsic Value (S−K)", "Dividend (D)", "Option Price (C)", "Time Value (C − (S−K))", "Decision (Is D > Time Value?)"];
  const table1Data = [
    ["1. Out-of-the-Money", "$95", "$100", "$0", "$2.00", "$3.50", "$3.50", "HOLD ($2.00 < 3.50)"],
    ["2. At-the-Money", "$100", "$100", "$0", "$2.00", "$6.00", "$6.00", "HOLD ($2.00 < 6.00)"],
    ["3. In-the-Money, High Time Value", "$110", "$100", "$10", "$2.00", "$12.50", "$2.50", "HOLD ($2.00 < 2.50)"],
    ["4. Deep ITM, Low Time Value", "$130", "$100", "$30", "$2.00", "$30.50", "$0.50", "EXERCISE ($2.00 > 0.50)"],
    ["5. Deep ITM, Large Dividend", "$130", "$100", "$30", "$3.00", "$30.50", "$0.50", "EXERCISE ($3.00 > 0.50)"]
  ];

  return (
    <ArticleFrame 
      slug="optimal-early-exercise-american-call-options-dividend-stocks" 
      additionalDisclaimer="Options trading involves substantial risk and is not suitable for all investors. Early exercise decisions can result in significant losses. The theoretical models presented here make assumptions that may not hold in real market conditions. Always consult with a qualified financial advisor before making investment decisions."
    >
      <div className="pb-24">
        <InfographicSlot alt="Optimal Early Exercise Decision Framework" />

        <div className="max-w-4xl mx-auto">
          {/* Key Takeaways */}
          <section className="py-16">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Theoretical Framework</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  The premium of an option is composed of two distinct components: intrinsic value and time value. 
                  Understanding this is fundamental to the early exercise decision.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  When an investor exercises an option, any remaining time value is immediately and irrevocably forfeited. 
                  This is why it is never optimal to exercise an American call option on a non-dividend-paying stock. 
                  It is always more profitable to sell the option on the open market, as a buyer will pay for its remaining time value.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  The entire framework changes when the stock pays a discrete cash dividend. On the ex-dividend date, 
                  the stock price is expected to fall by the dividend amount. Since option holders do not receive dividends, they face a critical trade-off: 
                  hold the option and suffer a capital loss, or exercise to capture the dividend but forfeit all remaining time value. 
                  This conflict is the sole economic rationale for considering early exercise.
                </p>
              </div>

              <div className="lg:w-1/3 min-w-0">
                <div className="p-6 bg-[#14171B] dark:bg-[#05070A] text-white border-none shadow-xl rounded-3xl h-full">
                  <h2 className="font-serif text-xl flex items-center gap-2 mb-6">
                    <Activity className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" />
                    Key Takeaways
                  </h2>
                  <ul className="space-y-4 text-sm text-slate-300">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <span>Never early-exercise American call options on non-dividend paying stocks—you forfeit remaining time value.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <span>Exercise is only optimal if the dividend exceeds the remaining time value of the call.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <span>The Longstaff-Schwartz Method uses backward induction to handle the early exercise decision in Monte Carlo simulations.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <ComparisonGrid>
              <ComparisonCard
                title="Intrinsic Value"
                type="pos"
                items={[
                  "The immediate profit from exercise, expressed as max(S - K, 0).",
                  "An option with positive intrinsic value is 'in-the-money' (ITM)."
                ]}
              />
              <ComparisonCard
                title="Time Value"
                type="pos"
                items={[
                  "The premium exceeding intrinsic value. It is the price of potential.",
                  "Captures volatility value (future gains) and interest rate value (interest on deferred capital)."
                ]}
              />
            </ComparisonGrid>
          </section>

          {/* Section 2: Decision Rule */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Decision Rule &amp; Critical Stock Price</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              A rational investor should exercise an American call option early if, and only if, the dividend to be gained is greater than 
              the time value of the option to be forfeited. This condition is most likely met when the option is deep in-the-money, 
              where its time value is minimal.
            </p>

            <FormulaPanel 
              title="Early Exercise Condition"
              formula="D > \\text{Time Value of Call}"
            />

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed my-8">
              If exercise is optimal, it should be done immediately prior to the stock going ex-dividend. 
              This maximizes the time value preserved up to that point. There exists a critical stock price, S*, where an investor is indifferent 
              between exercising and holding. It is found by solving:
            </p>

            <FormulaPanel 
              title="Critical Stock Price (Indifference Point)"
              formula="S^* - K = C_{\\text{European}}(S^* - D, T - t_d)"
            />

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mt-8 mb-6">
              If the current stock price <InlineMath math="S > S^*" />, early exercise is the optimal action. 
              The following table illustrates this decision process.
            </p>

            <div className="overflow-x-auto my-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-0">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-gray-900">
                <thead className="bg-slate-50 dark:bg-slate-900/50">
                  <tr>
                    {table1Headers.map((header, index) => (
                      <th key={index} scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-600 dark:text-slate-400">
                  {table1Data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors duration-200">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className={`px-6 py-4 text-sm ${
                          cell.startsWith("EXERCISE") ? "text-[#1D8A70] dark:text-[#3CBF9C] font-bold" : 
                          cell.startsWith("HOLD") ? "text-slate-800 dark:text-slate-200 font-bold" : ""
                        }`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: BSM & Black's Approximation */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <LineChart className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Applying the Black-Scholes Framework</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              The standard Black-Scholes-Merton (BSM) model is for European options and doesn't natively handle early exercise 
              or discrete dividends. Fischer Black proposed a "pseudo-American" valuation method that approximates the American call's 
              value by comparing two scenarios:
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-4 text-lg">Scenario 1 (Hold)</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Value the option as a European call on an adjusted stock price <InlineMath math="S' = S - \text{PV}(D)" />, held to original expiration.</p>
                <div className="px-3 py-1.5 rounded-xl font-mono text-sm font-bold inline-flex bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-transparent">
                  <InlineMath math="C_{\text{hold}} = BS(S', K, T, r, \sigma)" />
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-4 text-lg">Scenario 2 (Exercise)</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Value the option as a European call that expires just before the ex-dividend date, <InlineMath math="t_d" />.</p>
                <div className="px-3 py-1.5 rounded-xl font-mono text-sm font-bold inline-flex bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-transparent">
                  <InlineMath math="C_{\text{exercise\_timing}} = BS(S, K, t_d, r, \sigma)" />
                </div>
              </div>
            </div>

            <FormulaPanel 
              title="Black's Approximation"
              formula="C_{\\text{American}} \\approx \\max(C_{\\text{hold}}, C_{\\text{exercise\\_timing}})"
              legend={[
                { label: "Result", value: "The American call's value is the maximum of these two scenarios, modeling the rational investor's choice." }
              ]}
            />
          </section>

          {/* Section 4: Monte Carlo Simulation */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Monte Carlo Simulation &amp; Longstaff-Schwartz</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Monte Carlo simulation models uncertainty by generating thousands of possible future price paths for an asset. 
              For options, we simulate stock prices using Geometric Brownian Motion (GBM) in a risk-neutral world.
            </p>

            <FormulaPanel 
              formula="S_{t+\\Delta t} = S_t \\exp\\left( \\left( r - \\frac{1}{2}\\sigma^2 \\right)\\Delta t + \\sigma \\varepsilon \\sqrt{\\Delta t} \\right)"
            />

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed my-8">
              The challenge is that simulation is <Jargon term="Forward-Looking">starts at t=0 and models paths into the future</Jargon>, while the American option decision requires <Jargon term="Backward Induction">working backwards from expiration to determine optimal early exercise boundaries at each prior step</Jargon>. 
              The Longstaff-Schwartz Method (LSM) solves this. It works backward from maturity, using least-squares regression at each step 
              to estimate the option's continuation value (the expected value of holding it). It then compares this to the immediate 
              exercise value to determine the optimal strategy for each simulated path.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-12 mb-6 font-serif">Estimating the Confidence of Early Exercise</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              We can rigorously define the "Confidence of Early Exercise" as the estimated risk-neutral probability that exercising early 
              is the optimal strategy. This is calculated directly from the LSM simulation results as the proportion of paths where exercise was deemed optimal:
            </p>

            <FormulaPanel 
              formula="P_{\\text{exercise}} = \\frac{N_{\\text{exercise}}}{N_{\\text{total}}}"
              legend={[
                { label: "N_exercise", value: "Number of simulated paths where LSM determined exercise was optimal at the ex-dividend date" }
              ]}
            />

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed my-8">
              To quantify the uncertainty of this estimate, we construct a 95% confidence interval. A high probability (e.g., 99%) gives a trader strong confidence, 
              while a probability near 50% indicates the decision is highly uncertain.
            </p>

            <FormulaPanel 
              formula="P_{\\text{exercise}} \\pm 1.96 \\times \\sqrt{\\frac{P_{\\text{exercise}}(1 - P_{\\text{exercise}})}{N_{\\text{total}}}}"
            />
          </section>

          {/* Section 5: Synthesis */}
          <section className="py-16 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Synthesis and Critical Analysis</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Black's Approximation and LSM simulation are complementary tools. An analyst can use the former for a quick assessment 
              and the latter for a deep, probabilistic analysis. It's crucial to acknowledge the models' assumptions:
            </p>

            <div className="grid md:grid-cols-2 gap-8 min-w-0">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-lg">Geometric Brownian Motion (GBM)</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  The assumption of constant volatility is a major simplification. 
                  Real-world volatility is itself stochastic, leading to phenomena like the volatility smile.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 min-w-0">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-lg">Longstaff-Schwartz Method (LSM)</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Its true power lies in overcoming the "curse of dimensionality." While models like binomial trees become computationally 
                  impractical for options on multiple assets, Monte Carlo methods are largely independent of the problem's dimensionality. 
                  This makes LSM an enabling technology in modern quantitative finance.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ArticleFrame>
  );
}
