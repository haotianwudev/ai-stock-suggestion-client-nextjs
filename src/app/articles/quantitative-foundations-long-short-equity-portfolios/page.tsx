'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { FormulaPanel, ComparisonGrid, ComparisonCard, Jargon } from '@/components/articles/article-visuals';
import { InlineMath } from '@/components/articles/math';

export default function LongShortEquityArticle() {
  return (
    <ArticleFrame slug="quantitative-foundations-long-short-equity-portfolios">
      <div className="space-y-12">
        <InfographicSlot alt="Long-Short Equity Portfolio Infographic" />

        <div className="bg-white dark:bg-gray-900 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 shadow-sm">
          <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4 border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current flex-none" />
            Key Takeaways
          </h3>
          <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Long-short architecture relaxes structural long-only constraints, allowing managers to capture alpha from overvalued assets and drastically improve the Transfer Coefficient.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Structural paradigms vary from Equity Market-Neutral (0 beta, pure idiosyncratic alpha) to Active Extension (130/30, maintaining the equity risk premium).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Short selling introduces severe frictional costs, including borrow spreads, dividend replacement, and margin collateral. The short rebate is highly sensitive to macro interest rate regimes.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Returns are forecasted through factor models (APT) rather than idiosyncratic bottom-up analysis, requiring a rigorous quantitative workflow to avoid data mining.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Portfolio optimization translates alpha signals into target weights via convex mathematical optimization (MIQP), balancing expected return against risk and transaction costs.</span>
            </li>
          </ul>
        </div>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The Essence: Why Long-Short?
          </h2>
          <p className="mb-8">
            Overcoming structural constraints to capture pure alpha across the entire market cross-section.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-[#A8672E] dark:text-[#D08F52]">The Long-Only Penalty</h3>
              <p>
                Traditional long-only portfolios are mathematically constrained. An active manager cannot underweight a stock by a magnitude greater than its benchmark weight. This creates <Jargon term="unimplementable shorts">Negative conviction ideas that a manager is forced to abandon simply because they are restricted from short selling.</Jargon>
              </p>
              <p>
                By relaxing the long-only constraint, quantitative analysts can construct portfolios that perfectly reflect their proprietary alpha signals, capturing market dislocations on both the long (undervalued) and short (overvalued) sides.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="font-serif text-xl mb-4 text-[#A8672E] dark:text-[#D08F52]">Fundamental Law of Active Management</h4>
              <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
                Portfolio efficiency (Information Ratio) is a function of forecasting skill (IC), breadth of bets (BR), and the ability to implement them (TC).
              </p>
              
              <FormulaPanel 
                title="Information Ratio" 
                formula="IR = TC \times IC \times \sqrt{BR}" 
              />
              
              <div className="mt-8 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-4 rounded-xl border border-[#BC4128]/30 dark:border-[#E2694A]/30 flex gap-4 items-start shadow-sm">
                <div className="bg-[#BC4128] text-white p-2 rounded-lg font-bold shrink-0 font-mono">TC</div>
                <div>
                  <h5 className="font-serif font-semibold text-[#BC4128] dark:text-[#E2694A] mb-1">Transfer Coefficient Penalty</h5>
                  <p className="text-sm">In a long-only fund, TC plummets to 0.3-0.5 due to shorting constraints. In long-short, it approaches 1.0.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Structural Paradigms
          </h2>
          <p className="mb-8">
            Calibrating net market exposure and gross leverage based on specific risk mandates.
          </p>

          <ComparisonGrid>
            <ComparisonCard title="Equity Market-Neutral" tone="pos">
              <p>
                Engineered for absolute returns uncorrelated with the broader market. Targets a net exposure of 0% and a beta of 0.0. Relies entirely on the relative performance spread between long and short baskets (idiosyncratic risk or pure alpha). Highly capital-intensive, often requiring 200%-300% gross leverage.
              </p>
            </ComparisonCard>
            <ComparisonCard title="Active Extension (130/30)" tone="pos">
              <p>
                Bridges the gap between long-only and absolute return. Starts 100% long, borrows/shorts 30%, and reinvests in 30% more longs. Maintains 100% net exposure (beta of 1.0) but increases gross exposure to 160%. Recaptures up to 90% of theoretical unconstrained alpha without losing the equity risk premium.
              </p>
            </ComparisonCard>
          </ComparisonGrid>

          <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">Quantitative vs Discretionary Funds</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase">
                    <th className="p-4 font-serif font-semibold border-b border-slate-200 dark:border-slate-700">Metric</th>
                    <th className="p-4 font-serif font-semibold border-b border-slate-200 dark:border-slate-700">Quant Hedge Funds</th>
                    <th className="p-4 font-serif font-semibold border-b border-slate-200 dark:border-slate-700">Discretionary Funds</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-4 font-medium">Annualized Return</td>
                    <td className="p-4 text-[#1D8A70] dark:text-[#3CBF9C] font-semibold font-mono">8.0% - 12.0%</td>
                    <td className="p-4 font-mono">7.0% - 15.0%</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Sharpe Ratio</td>
                    <td className="p-4 text-[#1D8A70] dark:text-[#3CBF9C] font-semibold font-mono">0.8 - 1.5</td>
                    <td className="p-4 font-mono">0.5 - 1.2</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Maximum Drawdown</td>
                    <td className="p-4 text-[#1D8A70] dark:text-[#3CBF9C] font-semibold font-mono">10.0% - 20.0%</td>
                    <td className="p-4 text-[#BC4128] dark:text-[#E2694A] font-mono">15.0% - 40.0%</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Correlation to S&P 500</td>
                    <td className="p-4 text-[#1D8A70] dark:text-[#3CBF9C] font-semibold font-mono">0.2 - 0.5</td>
                    <td className="p-4 font-mono">0.4 - 0.7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Mechanics of Short Selling
          </h2>
          <p className="mb-8">
            The operational realities and economic frictions of the prime brokerage lending market.
          </p>

          <div className="mb-8">
            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-6 rounded-2xl border border-[#A8672E]/30 dark:border-[#D08F52]/30 shadow-sm">
              <h4 className="font-serif text-lg font-bold text-[#A8672E] dark:text-[#D08F52] mb-3">
                The Short Rebate
              </h4>
              <p className="text-sm mb-4">
                When borrowing stock, funds post cash collateral. The lender pays interest on this collateral back to the fund. This cash flow is the "short rebate," a critical driver of strategy economics.
              </p>
              <FormulaPanel 
                title="Short Rebate Math" 
                formula="\text{Rebate} = \text{Benchmark Rate} - \text{Borrow Spread} - \text{Div Yield}" 
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 mb-12">
            <div className="lg:w-1/2 space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-sm">
                  <strong className="text-slate-900 dark:text-slate-100">Interest Rate Sensitivity:</strong> In a ZIRP (Zero Interest Rate Policy) environment, short rebates are often negative, acting as a persistent performance drag. In a high-interest-rate regime, the rebate becomes a significant source of passive yield, structurally enhancing baseline performance.
                </p>
              </div>
            </div>
            
            <div className="lg:w-1/2 bg-white dark:bg-gray-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-serif text-2xl font-bold mb-6 text-[#BC4128] dark:text-[#E2694A]">Frictional Costs</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A] font-bold flex items-center justify-center shrink-0 font-mono">1</div>
                  <div>
                    <strong className="block mb-1">Borrow Spreads</strong>
                    <span className="text-sm">Liquid large-caps cost ~0.25% annually. "Hard-to-borrow" small-caps or highly shorted stocks can exceed 75% annualized.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A] font-bold flex items-center justify-center shrink-0 font-mono">2</div>
                  <div>
                    <strong className="block mb-1">Dividend Replacement</strong>
                    <span className="text-sm">Short sellers must legally pass any dividends issued directly back to the original lender, draining portfolio cash.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A] font-bold flex items-center justify-center shrink-0 font-mono">3</div>
                  <div>
                    <strong className="block mb-1">Margin Collateral</strong>
                    <span className="text-sm">Capital must be tied up to guarantee the return of borrowed assets, reducing overall capital efficiency.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Factor Models & Risk Attribution
          </h2>
          <p className="mb-8">
            Decomposing risk and return into lower-dimensional, statistically robust factor spaces.
          </p>

          <div className="mb-12 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="mb-6">
              Grounded in Arbitrage Pricing Theory (APT), quantitative hedge funds don't forecast idiosyncratic returns from the bottom up. Instead, they project returns into systemic risk drivers.
            </p>
            <FormulaPanel title="APT Factor Model" formula="R_i = \alpha_i + \sum \beta_{ij} f_j + \varepsilon_i" />
          </div>

          <h3 className="font-serif text-xl mb-6 text-[#A8672E] dark:text-[#D08F52]">Standard Industry Factors (Barra Model)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { name: "Value (BTOP)", desc: "Book-to-price ratio; exploits reversion of undervalued assets relative to fundamentals." },
              { name: "Momentum", desc: "525-day weighted return (excluding last 21 days); captures investor underreaction." },
              { name: "Size", desc: "Natural log of market cap; models liquidity and distress risk of smaller firms." },
              { name: "Quality", desc: "ROE stability and earnings quality; targets highly profitable, low-accrual firms." },
              { name: "Residual Volatility", desc: "Volatility orthogonalized to market beta; exploits the low-volatility anomaly." },
              { name: "Sentiment", desc: "Analyst rating changes and institutional fund flows." }
            ].map((factor, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h4 className="font-serif text-lg font-bold text-[#A8672E] dark:text-[#D08F52] mb-2">{factor.name}</h4>
                <p className="text-sm">{factor.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The Quant Research Workflow
          </h2>
          <p className="mb-12">
            A rigorous, multi-stage econometric pipeline to prevent data mining and look-ahead bias.
          </p>

          <div className="space-y-8 mb-12">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 shadow-sm">
              <h3 className="font-serif text-xl font-bold mb-2 text-[#1D8A70] dark:text-[#3CBF9C]">Universe & Data</h3>
              <p className="mb-3 text-sm">Filter out illiquid micro-caps to prevent slippage. Ingest point-in-time fundamental and alternative data, ensuring timestamps perfectly align with public availability to prevent look-ahead bias.</p>
              <div className="inline-block bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-400">
                JSON SEC filings, OHLCV, NLP sentiment
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 shadow-sm">
              <h3 className="font-serif text-xl font-bold mb-2 text-[#1D8A70] dark:text-[#3CBF9C]">Feature Construction</h3>
              <p className="mb-3 text-sm">Engineer specific quantitative characteristics. Apply cross-sectional standardization (Z-scoring) and treat fat-tailed outliers via winsorization (3σ) or Median Absolute Deviation (MAD).</p>
              <div className="inline-block bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-400">
                Z-Score Mapping, MAD Winsorization
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 shadow-sm">
              <h3 className="font-serif text-xl font-bold mb-2 text-[#1D8A70] dark:text-[#3CBF9C]">Factor Neutralization</h3>
              <p className="mb-3 text-sm">Prevent unintentional sector/size biases. Run cross-sectional regressions of raw signals against GICS industry and Size factors. The residuals become the pure, neutralized alpha scores.</p>
              <div className="inline-block bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-400">
                Orthogonalization via Regression Residuals
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 shadow-sm">
              <h3 className="font-serif text-xl font-bold mb-2 text-[#1D8A70] dark:text-[#3CBF9C]">IC/IR Evaluation</h3>
              <p className="mb-3 text-sm">Evaluate the Spearman Rank Information Coefficient (IC). A Mean Rank IC &gt; 0.05 is highly robust. Calculate the Information Ratio (IR = Mean IC / StdDev IC) to penalize volatility. Target IR &gt; 0.5.</p>
              <div className="inline-block bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-400">
                Quantile Backtesting (Alphalens)
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 shadow-sm">
              <h3 className="font-serif text-xl font-bold mb-2 text-[#1D8A70] dark:text-[#3CBF9C]">Multi-Factor Integration</h3>
              <p className="mb-3 text-sm">Smooth the equity curve by combining uncorrelated factors. Use traditional ICIR-weighting or modern machine learning (XGBoost, Random Forests) with strict cross-validation to capture non-linear alpha.</p>
              <div className="inline-block bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-400">
                Gradient Boosting, L1/L2 Regularization
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Portfolio Optimization
          </h2>
          <p className="mb-8">
            Translating composite alpha scores into target weights via convex mathematical optimization.
          </p>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl mb-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-serif text-xl font-bold mb-4 text-[#A8672E] dark:text-[#D08F52]">The Objective Function</h3>
            <p className="mb-6 text-sm">
              The optimizer utilizes Markowitz mean-variance architecture. It seeks to maximize expected active return (alpha) while minimizing active risk (tracking error) and penalizing transaction friction.
            </p>
            <FormulaPanel 
              title="MIQP Objective" 
              formula="\max \left[ x^T\mu - \frac{\gamma}{2}x^T\Sigma x - \text{Penalty}(x) \right]" 
            />
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-4 text-center"><InlineMath math="x" /> = weights, <InlineMath math="\mu" /> = expected returns, <InlineMath math="\gamma" /> = risk aversion, <InlineMath math="\Sigma" /> = covariance matrix</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">Real-World Constraints</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3 items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mt-0.5">•</span> Equality constraints for 130/30 or 0 beta profiles.</li>
                <li className="flex gap-3 items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mt-0.5">•</span> Sector constraints to prevent risk clustering.</li>
                <li className="flex gap-3 items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mt-0.5">•</span> Turnover limits to control trading friction.</li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">MIQP Solvers</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3 items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mt-0.5">•</span> <strong>Trade Paring:</strong> Restricting the number of unique trades to avoid costly micro-trades.</li>
                <li className="flex gap-3 items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mt-0.5">•</span> <strong>Roundlotting:</strong> Forcing optimal weights into integer multiples of standard trading lots (e.g., 100 shares).</li>
              </ul>
            </div>
          </div>
        </section>
        
      </div>
    </ArticleFrame>
  );
}
