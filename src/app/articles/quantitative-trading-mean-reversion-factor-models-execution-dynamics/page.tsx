'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { Jargon, ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function ArticlePage() {
  return (
    <ArticleFrame slug="quantitative-trading-mean-reversion-factor-models-execution-dynamics">
      <div className="max-w-5xl mx-auto space-y-12 text-slate-800 dark:text-slate-200">
        
        {/* Key Takeaways */}
        <div className="bg-white dark:bg-gray-900 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 shadow-sm mb-12">
          <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current flex-none" />
            Key Takeaways
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
            <li>Modern stat arb moves beyond static PCA to dynamic IPCA and Deep Learning attention models.</li>
            <li>Execution costs (slippage and market impact) scale non-linearly via the Square-Root Law of Market Impact, creating a strict capacity ceiling.</li>
            <li>Overfitting is the most pervasive failure point; robust research requires strict use of Winsorization, CPCV, and the Deflated Sharpe Ratio.</li>
            <li>The Marriott-Pope effect causes OLS to downward-bias the autoregressive coefficient in finite samples, making mean reversion appear faster than reality.</li>
          </ul>
        </div>

        {/* Section: Evolution of Statistical Arbitrage */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Evolution of Statistical Arbitrage</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Statistical arbitrage (stat arb) is a heavily quantitative framework that exploits temporary pricing inefficiencies across diversified portfolios. Originating in the 1980s with pairs trading, it relies on isolating idiosyncratic components of asset returns by neutralizing market and factor risks.
            </p>
            <p>
              Once isolated, these residual prices often exhibit <strong>mean-reverting characteristics</strong>—drifting away from, and eventually returning to, a long-term historical equilibrium.
            </p>
            
            <ComparisonGrid>
              <ComparisonCard title="The Past: Distance Metrics" tone="neg">
                Early strategies relied on simple squared Euclidean distances between historical prices (e.g., Gatev et al., 2006). These generated huge early returns but suffered severe alpha decay as markets became efficient, culminating in the 2007 "quant quake."
              </ComparisonCard>
              <ComparisonCard title="The Present: Advanced Models" tone="pos">
                Modern stat arb relies on highly sophisticated, multi-asset factor models utilizing deep learning architectures, strict transaction cost constraints, and rigorous validation to prevent overfitting.
              </ComparisonCard>
            </ComparisonGrid>
          </div>
        </section>

        <InfographicSlot alt="Quantitative Trading Mean Reversion Infographic" />

        {/* Section: Major Factors in Quant Trading */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Major Factors in Quant Trading</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Factor investing targets quantifiable traits that explain cross-sectional variation in expected returns, shifting away from discretionary stock picking. It evolved from the single-factor CAPM (Market Risk) to the <Jargon term="Fama-French Five-Factor Model" definition="A model explaining asset returns based on Market Risk, Size, Value, Profitability, and Investment factors." />.
            </p>
            
            <div className="my-8">
              <FormulaPanel 
                title="The Fama-French Five-Factor Regression"
                formula="R_{i,t} - R_{f,t} = \alpha_i + \beta_1(R_{m,t} - R_{f,t}) + \beta_2(SMB) + \beta_3(HML) + \beta_4(RMW) + \beta_5(CMA) + \varepsilon_{i,t}" 
              />
            </div>

            <div className="overflow-x-auto my-8">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Factor</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Acronym</th>
                    <th className="py-3 px-4 font-serif font-normal text-gray-500 dark:text-gray-400">Economic Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">Market Risk</td>
                    <td className="py-3 px-4 font-mono text-[#A8672E] dark:text-[#D08F52]">Rm - Rf</td>
                    <td className="py-3 px-4 whitespace-normal text-slate-600 dark:text-slate-300">Baseline compensation for bearing general equity market risk.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">Size</td>
                    <td className="py-3 px-4 font-mono text-[#A8672E] dark:text-[#D08F52]">SMB</td>
                    <td className="py-3 px-4 whitespace-normal text-slate-600 dark:text-slate-300">Small Minus Big. Smaller firms are less liquid and carry higher distress risk, demanding a premium.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">Value</td>
                    <td className="py-3 px-4 font-mono text-[#A8672E] dark:text-[#D08F52]">HML</td>
                    <td className="py-3 px-4 whitespace-normal text-slate-600 dark:text-slate-300">High Minus Low. Undervalued companies correct upward due to mean reversion in sentiment.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">Profitability</td>
                    <td className="py-3 px-4 font-mono text-[#A8672E] dark:text-[#D08F52]">RMW</td>
                    <td className="py-3 px-4 whitespace-normal text-slate-600 dark:text-slate-300">Robust Minus Weak. Highly profitable firms with stable earnings are less susceptible to shocks.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">Investment</td>
                    <td className="py-3 px-4 font-mono text-[#A8672E] dark:text-[#D08F52]">CMA</td>
                    <td className="py-3 px-4 whitespace-normal text-slate-600 dark:text-slate-300">Conservative Minus Aggressive. Firms that overinvest tend to misallocate capital.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="border-l-4 border-[#A8672E] dark:border-[#D08F52] pl-4 py-2 mt-4 text-slate-600 dark:text-slate-400">
              Beyond Fama-French, modern funds heavily blend <strong>Momentum</strong> (winning assets keep winning, acting as a counterbalance to mean reversion) and <strong>Low Volatility / Quality</strong> factors to maximize risk-adjusted returns across shifting economic regimes.
            </p>
          </div>
        </section>

        {/* Section: Advanced Extraction Models */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Advanced Extraction Models</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Traditional extraction uses static PCA, decomposing returns into systematic and idiosyncratic (residual) components. The residual portfolio holds zero beta to the selected risks, insulating it from macro shocks and making it mean-reverting. However, static loadings contradict dynamic corporate reality.
            </p>

            <ComparisonGrid>
              <ComparisonCard title="IPCA (Instrumented PCA)" tone="pos">
                Introduces observable firm characteristics as instrumental variables to estimate <em>time-varying</em> factor loadings. It successfully maps characteristics to either risk factor exposures (beta) or anomaly intercepts (alpha).
              </ComparisonCard>
              <ComparisonCard title="Deep Learning & Attention" tone="pos">
                Bypasses the traditional two-step process. Attention Factor Models use CNNs and transformers to jointly learn tradable factors and portfolio policies in a single step, explicitly maximizing out-of-sample Sharpe ratios after transaction costs.
              </ComparisonCard>
            </ComparisonGrid>
          </div>
        </section>

        {/* Section: The Ornstein-Uhlenbeck Framework */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">The Ornstein-Uhlenbeck Framework</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              To systematically trade the extracted factor-neutral residual, quants model the cumulative residual as an <Jargon term="Ornstein-Uhlenbeck (OU) process" definition="A stochastic process modeling mean-reverting behavior, balancing deterministic drift with continuous random shocks." />. It balances a deterministic drift pulling toward a mean, and a continuous random shock preventing permanent equilibrium.
            </p>

            <div className="my-8">
              <FormulaPanel 
                title="Continuous-Time Stochastic Differential Equation"
                formula="dX_t = \kappa(\mu - X_t)dt + \sigma dW_t" 
                legend="X = residual, κ = speed of reversion, μ = equilibrium mean, σ = volatility, dW = Wiener process (noise)"
              />
            </div>

            <h3 className="text-xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-200">The s-score (Avellaneda-Lee Framework)</h3>
            <p>
              Standardizes trading signals across assets by measuring the distance of the residual from its equilibrium mean, scaled by standard deviation.
            </p>

            <div className="my-8">
              <FormulaPanel 
                formula="s_{mod,i} = \frac{X_{i,t} - \mu_i}{\sigma_{eq,i}} - \frac{\alpha_i}{\kappa_i\sigma_{eq,i}}" 
              />
            </div>

            <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600 dark:text-slate-300">
              <li><strong>Entry:</strong> Open trade when |s-score| &gt; 1.25.</li>
              <li><strong>Exit:</strong> Close short at 0.75; Close long at -0.50.</li>
            </ul>
          </div>
        </section>

        {/* Section: The Marriott-Pope Effect */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">The Marriott-Pope Effect</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Empirical estimation of the mean-reversion speed via Ordinary Least Squares (OLS) in finite samples has a severe flaw. The OLS estimate of the autoregressive coefficient is <strong>inherently biased downward</strong>.
            </p>
            <p className="border-l-4 border-[#BC4128] dark:border-[#E2694A] pl-4 py-2 text-[#BC4128] dark:text-[#E2694A]">
              Because the coefficient is depressed, the calculated mean-reversion speed is biased upwards. The model "hallucinates" that the residual will revert much faster than it actually will.
            </p>
            <p>
              This causes algorithms to falsely categorize slow-reverting assets as highly profitable fast opportunities, triggering premature time-stop exits and resulting in devastating realized losses. Advanced practitioners use non-linear corrections or bootstrap methods to debias estimators.
            </p>
          </div>
        </section>

        {/* Section: Execution Dynamics */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Execution Dynamics</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Mean-reversion alpha is fragile. Transaction costs—slippage and market impact—can easily destroy a profitable backtest. When an algorithm executes a large order, it consumes liquidity and moves the price against itself.
            </p>
            
            <h3 className="text-xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-200">The Square-Root Law of Market Impact</h3>
            <p>
              Slippage is proportional to the asset's volatility and the square root of the normalized order size.
            </p>
            
            <div className="my-8">
              <FormulaPanel 
                formula="\Delta p = Y \cdot \sigma \cdot \sqrt{\frac{Q}{V}}" 
                legend="Q = Total order quantity, V = Average daily volume, Y = Constant, σ = Volatility"
              />
            </div>
            
            <p className="border-l-4 border-[#A8672E] dark:border-[#D08F52] pl-4 py-2 mt-4 text-slate-600 dark:text-slate-400">
              The concave nature of the square-root function acts as a strict capacity ceiling. Scaling AUM exponentially increases execution costs, degrading net alpha. Algorithms must balance temporary impact (immediate liquidity costs) against timing risk (mispricing correcting before order completion).
            </p>
          </div>
        </section>

        {/* Section: Rigorous Research Practices */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">Rigorous Research Practices</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-xl text-[#BC4128] dark:text-[#E2694A] mb-8">
              The most pervasive failure point in quantitative finance is backtest overfitting—fine-tuning parameters to historical noise.
            </p>

            <ul className="space-y-6 list-none p-0">
              <li className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <strong className="font-serif text-xl block mb-2 text-[#A8672E] dark:text-[#D08F52]">Winsorization &amp; Outliers</strong>
                Returns have fat tails. Winsorization mitigates outliers by capping them at specific percentiles (e.g., 5th and 95th) rather than deleting them, preserving time-series continuity while dampening black-swan distortions.
              </li>
              <li className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <strong className="font-serif text-xl block mb-2 text-[#A8672E] dark:text-[#D08F52]">Combinatorial Purged Cross-Validation (CPCV)</strong>
                Standard cross-validation leaks future information in financial time series. CPCV fixes this via <strong>Purging</strong> (removing overlapping training data) and <strong>Embargoing</strong> (implementing a dead-zone after test sets) to generate true out-of-sample distributions.
              </li>
              <li className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <strong className="font-serif text-xl block mb-2 text-[#A8672E] dark:text-[#D08F52]">Deflated Sharpe Ratio (DSR)</strong>
                Corrects the traditional Sharpe Ratio for non-normality (skewness/kurtosis) and selection bias (multiple testing). If a strategy's DSR falls below a 95% threshold, it is rejected as a statistical illusion.
              </li>
            </ul>
          </div>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-slate-100">The Pinnacle of Alpha Generation</h2>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Elite quantitative practitioners must navigate advanced econometrics, transaction constraints, and the gauntlet of overfitting prevention to extract true market-neutral alpha. Based on academic research and institutional quantitative frameworks.
            </p>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
