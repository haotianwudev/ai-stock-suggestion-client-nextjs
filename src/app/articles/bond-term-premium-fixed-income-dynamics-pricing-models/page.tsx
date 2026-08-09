'use client';

import React from 'react';
import {
  BookOpen, Landmark, Settings, BarChart3, Target,
  AlertTriangle, History, Cpu, CheckSquare, TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function BondTermPremiumPage() {
  return (
    <ArticleFrame slug="bond-term-premium-fixed-income-dynamics-pricing-models">
      <div className="pb-24">
        <InfographicSlot alt="Bond Term Premium Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Section 1 – Executive Summary */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Executive Summary</h2>
            </div>

            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-10 border-l-4 border-cyan-400 pl-5 bg-cyan-50/50 dark:bg-cyan-900/20 py-4 pr-4 rounded-r-xl">
              The bond term premium represents the excess yield investors demand for holding long-duration
              sovereign debt rather than rolling over short-term risk-free instruments. This report provides
              a mathematically rigorous analysis of the term premium — dissecting its theoretical foundations,
              econometric modeling, macroeconomic drivers, and strategic portfolio applications.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="Model: ACM Framework" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">Adrian-Crump-Moench affine term structure model</p>
              </ComparisonCard>
              <ComparisonCard title="Anomaly: 2010 – 2022" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">Term premia compressed to historic lows near −1.50%</p>
              </ComparisonCard>
              <ComparisonCard title="Outlook: 1.00% – 1.50%" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300">Structural premium range forecast for 2026–2030</p>
              </ComparisonCard>
            </ComparisonGrid>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[
                { icon: '📐', label: 'Theory', text: 'Pure expectations hypothesis is empirically rejected — risk-averse investors demand explicit compensation for duration and inflation uncertainty.' },
                { icon: '📉', label: 'QE Era (2010–2022)', text: 'Central banks extracted duration risk via QE, mechanically pushing term premia to −1.50%. Bonds acted as reliable equity hedges.' },
                { icon: '🔄', label: 'Regime Shift (Post-2022)', text: 'Sticky inflation and aggressive tightening flipped equity-bond correlations positive, catalyzing a structural resurgence in duration compensation.' },
                { icon: '🤖', label: 'AI Supply Shock', text: '$3T–$5T in AI capex financing floods fixed income markets with long-dated paper, requiring higher yields to attract buyers.' },
                { icon: '🏛️', label: 'Fiscal Dominance', text: 'U.S. primary deficits near 3.5% of GDP combined with QT create a persistent supply-demand imbalance.' },
                { icon: '🎯', label: 'Forward Outlook', text: 'Term premium forecast to settle structurally at 1.00%–1.50% through 2026–2030, restoring the traditional upward-sloping yield curve.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">{item.label}</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 2 – Theoretical Genesis */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Landmark className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">1. Foundation: Theoretical Genesis</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              The term structure of interest rates remains one of the most rigorously analyzed subjects in
              empirical finance and macroeconomic theory. To understand the mechanics of the bond market, one
              must separate the yield of any long-term debt instrument into its fundamental constituent parts.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">The Expectations Hypothesis vs. Modern Fixed Income Theory</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              According to the expectations hypothesis, the expected return generated from purchasing and
              holding a long-term bond until its maturity should theoretically equal the expected return from
              rolling over a series of short-term bonds with a cumulative maturity matching the long-term bond.
            </p>

            <FormulaPanel 
              title="Pure Expectations Hypothesis"
              formula="y_t^{(n)} = \\frac{1}{n} \\sum_{i=0}^{n-1} E_t[r_{t+i}]"
            />

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed my-6">
              However, modern fixed income theory and empirical asset pricing definitively reject the pure
              expectations hypothesis. Investors are risk-averse. Because the nominal return on a long-duration
              bond is highly uncertain if the instrument is liquidated prior to maturity, a risk premium must
              be embedded into the asset's price.
            </p>

            <FormulaPanel 
              title="Modern Fixed Income Theory"
              formula="y_t^{(n)} = \\frac{1}{n} \\sum_{i=0}^{n-1} E_t[r_{t+i}] + TP_t^{(n)}"
              legend={[
                { label: "y_t^{(n)}", value: "Yield of n-period bond" },
                { label: "E_t[r_{t+i}]", value: "Expected future short rates" },
                { label: "TP_t^{(n)}", value: "Term Premium" }
              ]}
            />

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mt-6">
              The term premium is defined as the explicit compensation demanded by investors for bearing interest rate risk, duration risk, and inflation
              uncertainty. Because it is a residual construct, it cannot be observed directly on trading
              screens; it must be econometrically estimated.
            </p>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 3 – ACM Model */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Settings className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">2. Mechanics: Decomposing Yields (ACM Model)</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Because the term premium is a latent variable, financial economists rely on Affine Term
              Structure Models (ATSMs) to extract it from observable yield curve data. The canonical framework
              is the Adrian-Crump-Moench (ACM) model from the Federal Reserve Bank of New York.
            </p>

            <div className="space-y-8 mt-10">
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Step 1: Estimate Physical Dynamics (P-Dynamics)</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  A first-order vector autoregression, VAR(1), is fitted to the state variables establishing
                  how yield curve factors evolve over time.
                </p>
                <FormulaPanel 
                  title="P-Dynamics"
                  formula="X_{t+1} = \\mu + \\Phi X_t + v_{t+1}"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Step 2: Estimate Excess Bond Return Regression</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  The excess holding period return is regressed on lagged pricing factors and contemporaneous
                  factor innovations.
                </p>
                <FormulaPanel 
                  title="Excess Return"
                  formula="rx_{t+1}^{(n)} = \\beta^{(n)'} v_{t+1} + c^{(n)} + \\gamma^{(n)'} X_t + e_{t+1}^{(n)}"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-serif">Step 3: Estimate Market Prices of Risk (Q-Dynamics)</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  The market prices of risk (λ<sub>t</sub>) are defined as an affine function, shifting
                  the model from the physical measure to the risk-neutral measure.
                </p>
                <FormulaPanel 
                  title="Q-Dynamics"
                  formula="\\lambda_t = \\lambda_0 + \\lambda_1 X_t"
                />
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 4 – Quantitative Framework */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">3. Quantitative Framework</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              To systematically forecast the term premium (TP<sub>t</sub>), quantitative researchers deploy
              multivariate linear regression models utilizing structural macroeconomic indicators.
            </p>

            <FormulaPanel 
              title="Forecasting Model"
              formula="TP_t = \\alpha + \\beta_1(\\sigma_{\\pi,t}) + \\beta_2(Debt/GDP_t) + \\beta_3(\\Delta CB\\_Holdings_t) + \\beta_4(MOVE_t) + \\epsilon_t"
            />

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">Key Drivers of Term Premium Variation</h3>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 mb-10">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-4 px-6">Variable</th>
                    <th className="py-4 px-6">Description</th>
                    <th className="py-4 px-6">Expected Sign</th>
                    <th className="py-4 px-6">Economic Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-transparent text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-4 px-6 font-mono font-bold">σ(π,t)</td>
                    <td className="py-4 px-6">Survey disagreement on 1-year ahead CPI</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 dark:text-emerald-400">Positive (+)</td>
                    <td className="py-4 px-6">Higher inflation uncertainty demands greater compensation for purchasing power risk.</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-mono font-bold">Debt/GDP</td>
                    <td className="py-4 px-6">Ratio of outstanding sovereign debt to GDP</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 dark:text-emerald-400">Positive (+)</td>
                    <td className="py-4 px-6">Increased supply of duration requires a higher premium to induce arbitrageurs to hold the risk.</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-mono font-bold">ΔCB</td>
                    <td className="py-4 px-6">Change in central bank balance sheet size</td>
                    <td className="py-4 px-6 font-bold text-rose-600 dark:text-rose-400">Negative (−)</td>
                    <td className="py-4 px-6">QE removes duration risk from the market, mechanically depressing the premium.</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-mono font-bold">MOVE</td>
                    <td className="py-4 px-6">Option-implied interest rate volatility</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 dark:text-emerald-400">Positive (+)</td>
                    <td className="py-4 px-6">Higher general rate volatility implies higher mark-to-market risk for long bonds.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 5 – Strategy */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">4. Strategy and Application</h2>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              For professional fixed income managers, the term premium is a vital, tradable macro signal.
              Because the term premium exhibits mean-reverting properties, deviations from fundamental fair
              value present opportunities to generate alpha.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 font-serif">The Portfolio Positioning Matrix</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-6 border-t-4 border-rose-500 shadow-sm">
                <h4 className="text-xl font-bold text-rose-900 dark:text-rose-300 mb-6 flex items-center gap-2 font-serif">
                  <TrendingUp className="rotate-180 shrink-0" size={24} />
                  Compressed / Negative TP
                </h4>
                <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                  <li><strong>Target Duration:</strong> Underweight / Shorten. Zero compensation for interest rate risk.</li>
                  <li><strong>Yield Curve:</strong> Curve Steepening Trades favored.</li>
                  <li><strong>TIPS vs. Nominal:</strong> Overweight TIPS to protect against sudden inflation shocks without relying on term premium buffers.</li>
                  <li><strong>Corporate Credit:</strong> Emphasize yield over quality; allocate to HY, loans, and EM debt.</li>
                </ul>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border-t-4 border-emerald-500 shadow-sm">
                <h4 className="text-xl font-bold text-emerald-900 dark:text-emerald-300 mb-6 flex items-center gap-2 font-serif">
                  <TrendingUp className="shrink-0" size={24} />
                  Elevated / Normalizing TP
                </h4>
                <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                  <li><strong>Target Duration:</strong> Overweight / Extend. High premium provides a yield cushion to lock in forward returns.</li>
                  <li><strong>Yield Curve:</strong> Curve Flattening Trades.</li>
                  <li><strong>TIPS vs. Nominal:</strong> Overweight Nominal Treasuries. Absolute yield and liquidity supersede TIPS.</li>
                  <li><strong>Corporate Credit:</strong> High-Quality Bias. Rotate back into IG credit and government bonds.</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 6 – Historical Evidence */}
          <section className="py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                <History className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">5. Historical Evidence</h2>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
              Historical data reveals abrupt regime shifts in the stock-bond correlation, driven entirely by
              the dominant source of macroeconomic uncertainty.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="Pre-2000: Elevated Regime" tone="neutral">
                <p className="text-sm text-slate-700 dark:text-slate-300">The primary risk was inflation. Positive inflation surprises hurt both equities and bonds, creating a positive stock-bond correlation. Because bonds offered no diversification benefit during crashes, investors required structurally high term premia to hold them.</p>
              </ComparisonCard>
              <ComparisonCard title="2000–2021: Compressed Regime" tone="neg">
                <p className="text-sm text-slate-700 dark:text-slate-300">With inflation tamed, risks shifted to growth shocks. Bad news hurt stocks but sparked central bank easing, rallying bonds. The correlation flipped negative. Because bonds were an infallible hedge against equity drawdowns, investors bid term premia down to zero.</p>
              </ComparisonCard>
              <ComparisonCard title="Post-2022: Paradigm Reversal" tone="pos">
                <p className="text-sm text-slate-700 dark:text-slate-300">As inflation re-emerged, the correlation violently flipped back to positive. Long-term bonds no longer perfectly hedge equity portfolios, so multi-asset managers demand a structurally higher positive term premium to hold duration.</p>
              </ComparisonCard>
            </ComparisonGrid>
          </section>

        </div>
      </div>
    </ArticleFrame>
  );
}
