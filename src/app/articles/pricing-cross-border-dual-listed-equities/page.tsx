'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';
import { InlineMath } from '@/components/articles/math';

export default function CrossBorderDualListedEquities() {
  return (
    <ArticleFrame slug="pricing-cross-border-dual-listed-equities">
      <div className="space-y-12">
        <InfographicSlot alt="Cross-Border Dual-Listed Equities Infographic" />

        <div className="bg-white dark:bg-gray-900 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 shadow-sm">
          <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4 border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current flex-none" />
            Key Takeaways
          </h3>
          <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>The Chinese AH Premium Puzzle violates the law of one price, with A-shares consistently trading at a 15% to 50% premium over identical H-shares due to strict capital outflow controls.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Real-world markets demand a liquidity premium, compensating investors for search costs, inventory costs, and asymmetric information, formalized by the Liquidity-Adjusted CAPM (LCAPM).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Arbitrage is constrained by agency frictions, idiosyncratic risk across separate exchanges, and severe short-sale constraints that trap liquidity onshore.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Execution costs, including asymmetric dividend tax regimes and Hong Kong's ad valorem stamp duty, consume the statistical edge of convergence trades, despite Stock Connect mechanisms.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Quantitative execution models utilize Vector Error Correction Models (VECM) with threshold cointegration to capture asymmetric adjustments and mean-reverting properties.</span>
            </li>
          </ul>
        </div>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The Law of One Price: In Theory vs. Reality
          </h2>
          <p className="mb-6">
            The law of one price is a foundational axiom asserting that two assets representing identical cash flow claims and identical risk profiles should trade at the exact same price. When this law is systematically violated, it exposes the mechanical, regulatory, and structural frictions governing actual market operations.
          </p>
          <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-6 rounded-2xl border border-[#A8672E]/30 dark:border-[#D08F52]/30 shadow-sm">
            <p className="text-sm">
              <strong className="text-slate-900 dark:text-slate-100">The Ultimate Laboratory:</strong> This dynamic is most prominently observed in the Chinese equity market, where companies simultaneously list <strong className="text-slate-900 dark:text-slate-100">"A-shares"</strong> on mainland exchanges (Shanghai/Shenzhen) and <strong className="text-slate-900 dark:text-slate-100">"H-shares"</strong> in Hong Kong. Despite identical dividend entitlements, A-shares historically trade at a massive, volatile premium to H-shares.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Foundations of the Liquidity Premium
          </h2>
          <p className="mb-6">
            In frictionless models like the classic CAPM, return is determined entirely by market risk. However, real-world markets have search costs, inventory costs, and asymmetric information. Investors demand compensation for fundamental market volatility <strong className="text-slate-900 dark:text-slate-100">and</strong> the cost and risk of illiquidity.
          </p>

          <ComparisonGrid>
            <ComparisonCard title="Amihud Measure (Price Impact)" tone="neutral">
              <p className="text-sm">
                Measures daily absolute return divided by daily dollar volume. Assets with high price impacts impose higher execution costs.
              </p>
            </ComparisonCard>
            <ComparisonCard title="Pastor-Stambaugh (Reversals)" tone="neutral">
              <p className="text-sm">
                Quantifies liquidity based on volume-related return reversals. The pure effect of liquidity risk demands an estimated ~7.5% annualized premium.
              </p>
            </ComparisonCard>
          </ComparisonGrid>

          <div className="mt-12 space-y-6">
            <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100">
              The Liquidity-Adjusted CAPM (LCAPM)
            </h3>
            <p className="text-sm">
              Acharya and Pedersen (2005) explicitly incorporated both the level of illiquidity and the variability of illiquidity into asset pricing.
            </p>
            <FormulaPanel 
              title="LCAPM Equation" 
              formula="E(R_i) = R_f + E(c_i) + \lambda\beta_{net}^i" 
            />
            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              Where <InlineMath math="R_f" /> is the risk-free rate, <InlineMath math="E(c_i)" /> is the expected illiquidity cost, and <InlineMath math="\lambda" /> is the market price of risk.
            </p>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mt-8">
              <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">The Four Sub-Betas of Net Systematic Risk</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold mt-0.5 flex-none">+</span>
                  <span><strong className="text-slate-900 dark:text-slate-100">Market Beta (Positive Premium):</strong> Standard systematic risk. Covariance of gross return with market gross return.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold mt-0.5 flex-none">+</span>
                  <span><strong className="text-slate-900 dark:text-slate-100">Commonality in Liquidity (Positive Premium):</strong> How an asset's illiquidity co-moves with aggregate market illiquidity.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#BC4128] dark:text-[#E2694A] font-bold mt-0.5 flex-none">-</span>
                  <span><strong className="text-slate-900 dark:text-slate-100">Return Sensitivity (Negative Premium):</strong> How an asset's return responds to shocks in aggregate market illiquidity.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#BC4128] dark:text-[#E2694A] font-bold mt-0.5 flex-none">-</span>
                  <span><strong className="text-slate-900 dark:text-slate-100">Liquidity Sensitivity (Negative Premium):</strong> How an asset's illiquidity correlates with overall market returns.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Limits to Arbitrage
          </h2>
          <p className="mb-6">
            If identical assets trade at divergent prices, fundamental theory posits arbitrageurs will short the overvalued and buy the undervalued, risk-free. In practice, cross-border arbitrage is highly risky, capital-intensive, and subject to severe structural limitations.
          </p>
          <ul className="space-y-4 text-sm md:text-base">
            <li className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100 block mb-2 font-serif text-lg">Agency Frictions</strong>
              Performance-based arbitrage is managed by professionals using outside capital. If a spread irrationally widens, the fund suffers immediate mark-to-market losses. Investors withdraw capital exactly when the trade is most attractive, forcing premature liquidation.
            </li>
            <li className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100 block mb-2 font-serif text-lg">Idiosyncratic Risk</strong>
              Dual-listed companies (DLCs) across separate exchanges possess immense idiosyncratic risk because shares are rarely fungible. Arbitrageurs face massive horizon uncertainty—sometimes waiting up to 9 years for convergence, enduring holding costs and volatile spread swings.
            </li>
            <li className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-100 block mb-2 font-serif text-lg">Short-Sale Constraints</strong>
              Arbitrage is asymmetric. Going long is easy; shorting requires locating a borrow, posting margin, paying fees, and surviving recall risk. When pessimistic sophisticated investors cannot short, optimistic sentiment artificially inflates the restricted asset's price.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The Chinese AH Premium Puzzle
          </h2>
          <p className="mb-6">
            Mainland Chinese companies frequently dual-list on the A-share market (RMB) and H-share market (HKD). The Hang Seng Stock Connect China AH Premium Index tracks this. Historically, it fluctuates between 115 and 150—meaning A-shares trade at a 15% to 50% premium over identical H-shares.
          </p>

          <div className="bg-[#BC4128]/5 dark:bg-[#E2694A]/5 p-6 rounded-2xl border border-[#BC4128]/20 dark:border-[#E2694A]/20 mb-8">
            <h3 className="font-serif text-xl font-bold text-[#BC4128] dark:text-[#E2694A] mb-4">
              Capital Outflow Controls
            </h3>
            <p className="mb-4 text-sm">
              In most emerging markets, the <em>foreign</em> share trades at a premium due to inflow controls. China is the inverse. The AH premium is a direct consequence of strict <strong className="text-slate-900 dark:text-slate-100">capital outflow controls</strong>.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-[#BC4128] dark:text-[#E2694A] mt-1.5 flex-none">•</span>
                <span>Domestic retail investors (80%+ of volume) are restricted from transferring capital offshore to buy cheaper H-shares.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#BC4128] dark:text-[#E2694A] mt-1.5 flex-none">•</span>
                <span>Limited alternative domestic investments trap massive liquidity onshore, artificially inflating A-share demand.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#BC4128] dark:text-[#E2694A] mt-1.5 flex-none">•</span>
                <span>The AH premium is effectively the mathematical shadow price of these government capital controls.</span>
              </li>
            </ul>
          </div>

          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Market Microstructure Demographics
          </h3>
          <ComparisonGrid>
            <ComparisonCard title="A-Share Market (Mainland)" tone="neutral">
              <ul className="space-y-2 text-sm">
                <li>• Heavily speculative</li>
                <li>• Highly liquid, Retail-driven</li>
                <li>• High turnover rates</li>
                <li>• Detached from fundamental cash-flow analyses</li>
              </ul>
            </ComparisonCard>
            <ComparisonCard title="H-Share Market (Hong Kong)" tone="neutral">
              <ul className="space-y-2 text-sm">
                <li>• Global Institutional investors</li>
                <li>• Strict fundamental valuation</li>
                <li>• Emerging market "home bias" discount applied</li>
                <li>• Higher global market beta premium</li>
              </ul>
            </ComparisonCard>
          </ComparisonGrid>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Execution Costs & Tax Frictions
          </h2>
          <p className="mb-6">
            Beyond macroeconomic controls, the daily execution environment imposes severe frictions. While dividends declared are identical, realized net cash flows are distorted by asymmetric tax regimes and stamp duties.
          </p>

          <div className="overflow-x-auto mb-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100">
                  <th className="p-4 font-serif font-semibold border-b border-slate-200 dark:border-slate-700">Market Segment</th>
                  <th className="p-4 font-serif font-semibold border-b border-slate-200 dark:border-slate-700">Dividend Tax Rate</th>
                  <th className="p-4 font-serif font-semibold border-b border-slate-200 dark:border-slate-700">Regulatory Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <tr>
                  <td className="p-4 font-bold text-[#A8672E] dark:text-[#D08F52]">A-Share Market</td>
                  <td className="p-4 font-bold font-mono">0% to 20%</td>
                  <td className="p-4">Tiered for long-term holding. &lt;1 mo: 20%; 1-12 mo: 10%; &gt;1 yr: Tax-exempt.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[#A8672E] dark:text-[#D08F52]">H-Share Market</td>
                  <td className="p-4 font-bold font-mono">10% Flat</td>
                  <td className="p-4">Non-resident enterprises/individuals holding directly face a flat 10% withholding tax.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[#BC4128] dark:text-[#E2694A]">Southbound Connect</td>
                  <td className="p-4 font-bold font-mono text-[#BC4128] dark:text-[#E2694A]">20% Flat</td>
                  <td className="p-4">Punitive flat rate regardless of duration, creating a severe tax asymmetry.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
              Hong Kong Stamp Duties & The Stock Connect Paradox
            </h3>
            <p className="text-sm">
              Hong Kong levies a substantial 0.1% ad valorem stamp duty on both buyers and sellers, which consumes the statistical edge of convergence trades. The 2014 Stock Connect allowed cross-border trading, theoretically removing segmentation, but the premium <em className="text-[#BC4128] dark:text-[#E2694A] font-bold">widened</em> due to asymmetric accessibility, isolated mainland liquidity spikes, and importantly, <strong className="text-slate-900 dark:text-slate-100">no fungibility</strong>—you cannot convert bought H-shares to settle an A-share short.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Quantitative Execution & Modeling
          </h2>
          <p className="mb-6">
            Given structural persistence, quantitative funds deploy statistical arbitrage via advanced econometric modeling to harvest alpha from mean-reverting properties.
          </p>

          <div className="space-y-12">
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Cointegration
              </h3>
              <p className="mb-4 text-sm">
                While individual price series are non-stationary (random walks), a linear combination of the two may be stationary. If an underlying long-term equilibrium exists, the spread is expressed as:
              </p>
              <FormulaPanel 
                title="Spread Equation" 
                formula="e_t = P_t^A - \beta P_t^H" 
              />
              <p className="mt-4 text-sm">
                When the spread deviates significantly, quants short the outperforming asset and long the underperforming one. Modern funds increasingly use Machine Learning (e.g., Random Forests) incorporating short-term momentum to predict convergence.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Vector Error Correction Models (VECM)
              </h3>
              <p className="mb-4 text-sm">
                To model long-term equilibrium and short-term dynamics simultaneously, VECM operates on the first differences of variables while incorporating an error-correction term.
              </p>
              <div className="space-y-4">
                <FormulaPanel 
                  title="A-Share VECM" 
                  formula="\Delta P_t^A = \alpha_A(P_{t-1}^A - \beta P_{t-1}^H) + \sum \gamma_{A,i}\Delta P_{t-i}^A + \sum \delta_{A,i}\Delta P_{t-i}^H + \varepsilon_t^A" 
                />
                <FormulaPanel 
                  title="H-Share VECM" 
                  formula="\Delta P_t^H = \alpha_H(P_{t-1}^A - \beta P_{t-1}^H) + \sum \gamma_{H,i}\Delta P_{t-i}^A + \sum \delta_{H,i}\Delta P_{t-i}^H + \varepsilon_t^H" 
                />
              </div>
              <p className="mt-4 text-sm">
                The coefficient <strong className="text-slate-900 dark:text-slate-100">α</strong> is the speed of adjustment. It must be negative for the system to revert. Empirical analyses show the H-share market frequently serves as the fundamental anchor.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Threshold Cointegration & Asymmetry
              </h3>
              <p className="text-sm">
                Standard VECM assumes symmetric adjustment. Empirically, this is false for the AH Premium. Due to costs and short-sale constraints, small deviations cannot be profitably arbitraged. Prices follow a random walk until they breach a specific transaction cost "threshold." Furthermore, adjustments are highly asymmetric: markets correct undervalued H-shares much faster than they correct restricted, overvalued A-shares.
              </p>
            </div>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
