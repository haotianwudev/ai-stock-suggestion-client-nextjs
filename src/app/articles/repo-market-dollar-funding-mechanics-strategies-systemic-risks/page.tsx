'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

export default function RepoMarketArticle() {
  return (
    <ArticleFrame slug="repo-market-dollar-funding-mechanics-strategies-systemic-risks">
      <div className="space-y-16 pb-24">
        
        {/* Executive Summary */}
        <section className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
            Executive Summary
          </h2>
          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-medium mb-6">
            The repurchase agreement market constitutes the foundational infrastructure of global finance, providing the essential plumbing through which trillions of dollars in short-term secured funding circulate daily. 
          </p>
          <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
            Operating largely outside the traditional commercial banking framework, the repo market enables institutional investors, primary dealers, and hedge funds to secure overnight or term financing by pledging collateral, primarily U.S. Treasury securities. The efficiency, liquidity, and pricing of this market dictate the cost of capital across the broader global economy.
          </p>
          <ComparisonGrid>
            <ComparisonCard title="The Shift to SOFR" tone="pos">
              <p className="text-sm">
                The transition from the credit-sensitive LIBOR to the Secured Overnight Financing Rate (SOFR) fundamentally anchored benchmark lending to actual Treasury-collateralized transactions, creating a nearly risk-free benchmark supported by over $1T in daily volume.
              </p>
            </ComparisonCard>
            <ComparisonCard title="Systemic Vulnerabilities" tone="neg">
              <p className="text-sm">
                Extreme reliance on repo funding exposes the system to liquidity shocks. When systemic reserves fall below a critical threshold, localized stresses rapidly metastasize, as seen in Sept 2019 and March 2020.
              </p>
            </ComparisonCard>
          </ComparisonGrid>
        </section>

        <InfographicSlot alt="Repo Market Infographic" />

        {/* Foundation */}
        <section>
          <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Foundation: The Repo Market & SOFR
          </h2>
          
          <h3 className="font-serif text-xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
            The Mechanics of a Repurchase Agreement
          </h3>
          <p className="mb-6 text-sm text-slate-700 dark:text-slate-300">
            A repurchase agreement is, fundamentally, a collateralized loan structured as a simultaneous sale and forward agreement to repurchase a specific security. The borrower (cash receiver) sells a security to the lender (cash provider) with a binding commitment to repurchase it at a higher price on a specified future date. The difference between the initial sale price and the forward repurchase price represents the implied interest, known globally as the <strong className="text-slate-900 dark:text-slate-100">repo rate</strong>.
          </p>
          
          <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-5 mb-10">
            <h4 className="font-serif font-bold text-[#A8672E] dark:text-[#D08F52] mb-2 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-current flex-none" />
              Haircuts and Margin
            </h4>
            <p className="text-sm text-slate-800 dark:text-slate-200">
              To protect the cash lender against counterparty default and intraday collateral price depreciation, repo transactions incorporate an initial margin, universally referred to as a <strong className="text-slate-900 dark:text-slate-100">haircut</strong>. If a Treasury is valued at $100 and the lender applies a 2% haircut, they advance only $98 in cash.
              <br/><br/>
              In non-centrally cleared bilateral markets, haircuts are frequently negotiated to zero or negative levels for highly rated hedge funds, providing massive leverage.
            </p>
          </div>

          <h3 className="font-serif text-xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
            SOFR: The Anchor of Trillions in Dollar Funding
          </h3>
          <p className="mb-6 text-sm text-slate-700 dark:text-slate-300">
            Following the LIBOR manipulation scandals, the Alternative Reference Rates Committee selected the <strong className="text-slate-900 dark:text-slate-100">Secured Overnight Financing Rate (SOFR)</strong> as the preferred alternative benchmark. SOFR is a broad, purely transaction-based measure of the cost of borrowing cash overnight collateralized by U.S. Treasury securities.
          </p>

          <div className="overflow-x-auto w-full mb-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                <tr>
                  <th className="px-4 py-3 font-serif font-semibold border-b border-slate-200 dark:border-slate-700">Feature</th>
                  <th className="px-4 py-3 font-serif font-semibold border-b border-slate-200 dark:border-slate-700">Legacy Rate (LIBOR)</th>
                  <th className="px-4 py-3 font-serif font-semibold border-b border-slate-200 dark:border-slate-700 text-[#1D8A70] dark:text-[#3CBF9C]">SOFR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-gray-900">
                <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">Underlying Asset</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Unsecured interbank credit</td>
                  <td className="px-4 py-3 font-bold text-[#1D8A70] dark:text-[#3CBF9C]">Collateralized by U.S. Treasuries</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/50 bg-slate-50 dark:bg-[#14171B]/50 dark:bg-slate-800/30">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">Volume</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">Limited, reliant on estimates</td>
                  <td className="px-4 py-3 font-bold text-[#1D8A70] dark:text-[#3CBF9C]">&gt;$1 Trillion daily actual transactions</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">Market Stress Behavior</td>
                  <td className="px-4 py-3 text-[#BC4128] dark:text-[#E2694A]">Rises sharply (credit risk)</td>
                  <td className="px-4 py-3 font-bold text-[#1D8A70] dark:text-[#3CBF9C]">May fall (flight-to-quality)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Mechanics */}
        <section>
          <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Mechanics & Math: The Treasury Basis Trade
          </h2>
          <p className="mb-8 text-sm text-slate-700 dark:text-slate-300">
            One of the most consequential applications of repo market funding is the execution of the <strong className="text-slate-900 dark:text-slate-100">Treasury basis trade</strong>. This complex relative-value arbitrage strategy seeks to exploit minute, fleeting pricing discrepancies between cash Treasury bonds and their corresponding futures contracts.
          </p>

          <ComparisonGrid>
            <ComparisonCard title="Cash-Futures Arbitrage" tone="neutral">
              <p className="text-sm">
                When futures trade at a premium relative to the cash market (futures are "rich"), traders execute a cash-and-carry arbitrage ("going long the basis"). They buy the cash bond in the spot market, finance it overnight via repo, and simultaneously short the futures contract. At expiry, they deliver the bond to lock in the spread.
              </p>
            </ComparisonCard>
            <ComparisonCard title="Conversion Factors (CF)" tone="neutral">
              <p className="text-sm">
                Futures contracts are standardized to a 6% notional coupon. Since actual bonds vary, a Conversion Factor (CF) is applied to the delivery invoice price to equalize them. Traders must identify the <strong className="text-slate-900 dark:text-slate-100">Cheapest-to-Deliver (CTD)</strong> bond to optimize profitability.
              </p>
            </ComparisonCard>
          </ComparisonGrid>

          <div className="mt-10 space-y-8">
            <FormulaPanel
              title="1. Gross Basis"
              formula="\text{Gross Basis} = P_{\text{bond}} - (P_{\text{fut}} \times CF)"
              legend="The raw, unfinanced clean price difference."
            />
            
            <FormulaPanel
              title="2. Net Basis"
              formula="\text{Net Basis} = \left[ P_{\text{dirty}} \times \left(1 + r \times \frac{n}{360}\right) \right] - \left[ (P_{\text{fut}} \times CF) + AI_{\text{del}} \right]"
              legend="Accounts for actual repo financing costs. The lowest Net Basis identifies the CTD bond."
            />

            <FormulaPanel
              title="3. Implied Repo Rate (IRR)"
              formula="\text{IRR} = \frac{[(P_{\text{fut}} \times CF) + AI_{\text{del}}] - (P_{\text{bond}} + AI)}{P_{\text{bond}} + AI} \times \frac{360}{n}"
              legend="The theoretical break-even financing rate. Highest IRR identifies the definitive CTD."
            />
          </div>
        </section>

        {/* Strategy */}
        <section>
          <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Strategy: Leverage & Liquidity
          </h2>
          
          <h3 className="font-serif text-xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
            Hedge Funds & Zero-Haircut Leverage
          </h3>
          <p className="mb-6 text-sm text-slate-700 dark:text-slate-300">
            Because the pure profit margin on a Treasury basis trade is typically measured in mere basis points, it is entirely unviable unleveraged. Hedge funds rely on the repo market to exponentially amplify these microscopic returns.
          </p>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-6 items-center mb-10">
            <div className="flex-1">
              <h4 className="font-serif font-bold text-[#A8672E] dark:text-[#D08F52] mb-2">Aggregate Leverage: 56-to-1</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                In the bilateral market, prime brokers often grant zero haircuts based on proportionate margining. If a fund holds perfectly correlated long cash and short futures, dealers net the exposure.
              </p>
              <FormulaPanel
                title="Proportionate Net Margin"
                formula="h = -p \times s_\theta - q \times s_{1-\theta}"
                legend="Reduces required capital to near zero."
              />
            </div>
            <div className="w-full md:w-1/3 text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="block text-4xl font-black text-[#A8672E] dark:text-[#D08F52] mb-2 font-mono tabular-nums">$815B</span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Repo borrowing at zero/negative haircuts (Dec 2022)</span>
            </div>
          </div>

          <h3 className="font-serif text-xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
            Primary Dealers & The Fed Facilities
          </h3>
          <p className="mb-6 text-sm text-slate-700 dark:text-slate-300">
            Dealers supply balance sheet capacity but are constrained by the <strong className="text-slate-900 dark:text-slate-100">Supplementary Leverage Ratio (SLR)</strong>. To circumvent this, they increasingly use FICC Sponsored Repo to clear trades centrally, achieving vital balance sheet netting.
          </p>

          <ComparisonGrid>
            <ComparisonCard title="Overnight Reverse Repo (ON RRP)" tone="neutral">
              <p className="text-sm">
                Sets a <strong className="text-slate-900 dark:text-slate-100">hard floor</strong> on rates. Non-banks lend cash to the Fed for Treasury collateral, absorbing excess liquidity and draining reserves.
              </p>
            </ComparisonCard>
            <ComparisonCard title="Standing Repo Facility (SRF)" tone="neutral">
              <p className="text-sm">
                Sets a <strong className="text-slate-900 dark:text-slate-100">strict ceiling</strong> on rates. Eligible counterparties borrow cash directly from the Fed by pledging Treasuries, injecting liquidity when reserves are scarce.
              </p>
            </ComparisonCard>
          </ComparisonGrid>
        </section>

        {/* Risks */}
        <section>
          <h2 className="text-2xl md:text-3xl font-serif text-[#BC4128] dark:text-[#E2694A] mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Risks & Pitfalls: Historical Dislocations
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-8">
            The extreme systemic reliance on short-term repo funding, violently amplified by 56-to-1 aggregate leverage, renders the Treasury basis trade exquisitely susceptible to unexpected funding shocks (duration mismatch).
          </p>

          <div className="space-y-4">
            <div className="bg-[#BC4128]/5 dark:bg-[#E2694A]/5 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-4 rounded-r-lg">
              <h3 className="font-serif font-bold text-[#BC4128] dark:text-[#E2694A] text-lg mb-1">September 2019 Repo Spike</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                A sharp drain in aggregate bank reserves (corporate tax payments + heavy Treasury settlements) compounded by prolonged Quantitative Tightening. Reserves plunged, cash providers pulled back, and rates spiked violently, forcing the Fed to intervene to stop margin calls on leveraged funds.
              </p>
            </div>
            
            <div className="bg-[#BC4128]/5 dark:bg-[#E2694A]/5 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-4 rounded-r-lg">
              <h3 className="font-serif font-bold text-[#BC4128] dark:text-[#E2694A] text-lg mb-1">March 2020 "Dash for Cash"</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Pandemic volatility spiked margins. Investors hoarded physical cash. Dealers, bound by rigid SLR limits, lacked balance sheet capacity to absorb Treasuries. Hedge funds were forced into distressed unwinds, causing U.S. Treasuries to crash simultaneously with risk assets until massive Fed QE intervened.
              </p>
            </div>

            <div className="bg-[#BC4128]/5 dark:bg-[#E2694A]/5 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-4 rounded-r-lg">
              <h3 className="font-serif font-bold text-[#BC4128] dark:text-[#E2694A] text-lg mb-1">The Central Clearing Mandate (2025/2026)</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                New SEC rules mandate FICC central clearing. Standardized 2-4% initial margins eliminate zero-haircuts. This forces massive deleveraging (e.g., from 56:1 down to 25:1), potentially withdrawing $300B+ in Treasury liquidity if funds refuse to raise more capital.
              </p>
            </div>
          </div>
        </section>

        {/* Synthesis */}
        <section className="bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
          <h2 className="text-2xl font-serif text-white mb-4 border-b border-slate-700 pb-2">
            Synthesis: Systemic Warning Checklist
          </h2>
          <p className="text-sm text-slate-400 mb-8">
            When the repo market plumbing breaks, equities, corporate bonds, and commodities suffer severe, highly correlated drawdowns. Monitor these five definitive early-warning indicators of impending funding crises.
          </p>

          <div className="grid gap-4">
            {[
              {
                title: "1. SOFR to IOER Spread",
                desc: "If SOFR persistently prints above the Fed's Interest on Reserve Balances (IOER), banks are demanding a premium. This is the earliest statistical warning that aggregate reserves are approaching dangerous scarcity."
              },
              {
                title: "2. Surges in Standing Repo Facility (SRF)",
                desc: "The SRF is a safety valve. A sudden, massive spike in usage is a glaring red flag that private structural liquidity constraints have become binding."
              },
              {
                title: "3. Treasury Repo Fails-to-Deliver",
                desc: "Surging fails indicate severe localized shortages of specific safe collateral and unquenchable demand for leverage—a precursor to basis-trade unwinds."
              },
              {
                title: "4. Unchecked Growth in Sponsored Repo Volumes",
                desc: "Exponential volume growth highlights massive unseen leverage. If volumes suddenly plateau or contract, dealers are withdrawing balance sheet, forcing leveraged liquidations."
              },
              {
                title: "5. Divergence in the Cash-Futures Basis Spread",
                desc: "If the basis spread suddenly widens and remains disconnected, arbitrageurs cannot secure repo financing or are actively unwinding due to margin calls. This is the ultimate real-time trigger of a systemic crash."
              }
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                <h4 className="text-lg font-bold text-[#A8672E] dark:text-[#D08F52] mb-2">{item.title}</h4>
                <p className="text-sm text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
