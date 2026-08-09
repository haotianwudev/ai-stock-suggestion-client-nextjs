'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

const regTData = [
  { metric: "Total Market Value (TMV)", calc: "Quantity × Current Market Price", example: "1,000 shares × $100 = $100,000" },
  { metric: "Initial Margin Requirement", calc: "TMV × 0.50", example: "$100,000 × 0.50 = $50,000" },
  { metric: "Margin Loan", calc: "TMV - Initial Margin", example: "$100,000 - $50,000 = $50,000" },
  { metric: "Maintenance Margin", calc: "TMV × 0.25", example: "$100,000 × 0.25 = $25,000" },
  { metric: "Account Equity", calc: "TMV - Margin Loan", example: "Assuming price drops to $60: $60,000 - $50,000 = $10,000" },
  { metric: "Current Margin Percentage", calc: "Account Equity / TMV", example: "$10,000 / $60,000 = 16.67%" },
];

const wclInitialData = [
  { param: "Long Equity Position", val: "100k shares XYZ at $100 ($10M TMV)" },
  { param: "Short Put Options", val: "200 contracts (20k shares) Strike $90, 30 DTE" },
  { param: "Implied Volatility (σ)", val: "25%" },
  { param: "Risk-Free Rate (r)", val: "5%" },
  { param: "Margin Loan", val: "-$3,000,000" },
];

const wclStressedData = [
  { metric: "Price Shock Applied", val: "-15.0% (New: $85.00)" },
  { metric: "Volatility Shock Applied", val: "+25.0% (New: 31.25%)" },
  { metric: "Stressed Stock Value", val: "$8,500,000" },
  { metric: "Stressed Put Option Price", val: "$5.966" },
  { metric: "Stressed Put Position Value", val: "-$119,320" },
  { metric: "Stressed Equity", val: "$5,380,680" },
];

const houseExcessData = [
  { metric: "Total Market Value (TMV)", val: "$2,000,000" },
  { metric: "Margin Loan Balance", val: "$1,000,000" },
  { metric: "Account Equity", val: "$1,000,000" },
  { metric: "Regulatory Maintenance (25%)", val: "$500,000" },
  { metric: "House Maintenance (35%)", val: "$700,000" },
  { metric: "Regulatory Excess", val: "$1,000,000 - $500,000 = $500,000" },
  { metric: "House Excess", val: "$1,000,000 - $700,000 = $300,000", highlight: true },
];

const shortfallData = [
  { metric: "New Account Equity", val: "$1.4M (TMV) - $1.0M (Loan) = $400,000" },
  { metric: "New House Req (35%)", val: "0.35 × $1.4M = $490,000" },
  { metric: "Calculated Shortfall", val: "$490k - $400k = $90,000" },
  { metric: "Required Cash Deposit", val: "$90,000" },
  { metric: "Forced Liquidation", val: "$90,000 / (1 - 0.35) = $138,461", alert: true },
];

const comparisonData = [
  { char: "Primary Client Base", pb: "Quantitative Hedge Funds, Prop Trading Firms", wm: "Founders, Family Offices, UHNW Individuals" },
  { char: "Core Asset Types", pb: "Swaps, OTC Derivatives, High-Frequency Equities", wm: "Concentrated Equities, Structured Notes, Discretionary Funds" },
  { char: "Margin Methodology", pb: "Portfolio Margin, Cross-Margining, Expected Shortfall", wm: "Lombard Lending, Securities-Backed Lending (SBL), Advance Ratios" },
  { char: "Leverage Objectives", pb: "Extreme leverage (often 5:1 to 10:1 or more via derivatives)", wm: "Moderate liquidity extraction (typically 50% to 70% LTV)" },
  { char: "Key Risk Driver", pb: "Correlation breakdowns, basis risk, liquidity squeezes", wm: "Concentrated stock risk, single-entity gap risk" },
  { char: "Primary Focus", pb: "Maximizing capital efficiency, maximizing Margin Release", wm: "Tax deferral, lifestyle financing, avoiding forced liquidations" },
];

interface SimpleTableProps {
  headers: string[];
  rows: any[];
  renderRow: (row: any, i: number) => React.ReactNode;
}

const SimpleTable = ({ headers, rows, renderRow }: SimpleTableProps) => (
  <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
    <table className="w-full text-left border-collapse text-sm">
      <thead>
        <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          {headers.map((h, i) => (
            <th key={i} className="p-3 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap font-serif">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-gray-900">
        {rows.map((row, i) => renderRow(row, i))}
      </tbody>
    </table>
  </div>
);

export default function CounterpartyCreditRiskArticle() {
  return (
    <ArticleFrame slug="infrastructure-counterparty-credit-risk-margin-wcl-excess-shortfall-release">
      <div className="space-y-12 pb-24">
        
        <div className="bg-white dark:bg-gray-900 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 shadow-sm">
          <p className="text-[#A8672E] dark:text-[#D08F52] text-sm md:text-base leading-relaxed">
            The extension of credit—whether provided to a highly levered quantitative hedge fund deploying complex statistical arbitrage strategies, or to an ultra-high-net-worth (UHNW) individual seeking tax-efficient liquidity—is governed by a strict set of mathematically derived risk metrics. This tutorial explores the methodologies and systemic importance of these metrics.
          </p>
        </div>

        <InfographicSlot
          alt="Infrastructure of Counterparty Credit Risk Infographic"
          label="The Taxonomy of Core Risk Metrics"
        />

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The Taxonomy of Core Risk Metrics
          </h2>

          <div className="space-y-12">
            {/* Margin */}
            <div>
              <h3 className="font-serif text-xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
                1. Margin: The Foundational Buffer
              </h3>
              <p className="mb-4 text-sm">
                Margin represents the absolute minimum amount of equity a client must hold in their account to support a leveraged position. It acts as a protective buffer, absorbing initial market fluctuations before the lending institution's capital is exposed to risk.
              </p>
              <p className="mb-6 text-sm">
                In the US, equity margin has historically been governed by the Federal Reserve's <strong className="text-slate-900 dark:text-slate-100">Regulation T (Reg T)</strong>, which typically requires 50% initial margin. However, static rules ignore diversification. The industry has largely moved toward risk-based <strong className="text-slate-900 dark:text-slate-100">Portfolio Margin (PM)</strong>, which assesses the net risk of a holistically hedged portfolio.
              </p>
              
              <SimpleTable 
                headers={["Metric", "Calculation Methodology", "Example Scenario"]}
                rows={regTData}
                renderRow={(row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 font-medium text-slate-900 dark:text-slate-100">{row.metric}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 font-mono text-xs">{row.calc}</td>
                    <td className="p-3 text-[#1D8A70] dark:text-[#3CBF9C]">{row.example}</td>
                  </tr>
                )}
              />
              <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-4 rounded-xl border border-[#BC4128]/30 dark:border-[#E2694A]/30">
                <p className="text-sm font-semibold text-[#BC4128] dark:text-[#E2694A]">
                  Analysis: In the scenario above, a decline in the asset price to $60 reduces equity to $10,000 (16.67%). Because this falls below the regulatory 25% threshold, the account violates margin requirements, initiating risk management protocols.
                </p>
              </div>
            </div>

            {/* WCL */}
            <div>
              <h3 className="font-serif text-xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
                2. Worst Case Loss (WCL): The Risk Engine
              </h3>
              <p className="mb-4 text-sm">
                Worst Case Loss (WCL) is the maximum expected decline in a portfolio's value under a predefined set of extreme but plausible market scenarios. It serves as the quantitative foundation for all modern risk-based margin models.
              </p>
              <p className="mb-6 text-sm">
                The WCL is determined by passing the entire portfolio through a computational stress grid, analyzing price shocks (e.g., ±15%) alongside implied volatility shocks (e.g., ±150%).
              </p>

              <ComparisonGrid>
                <ComparisonCard title="Initial State" tone="neutral">
                  <ul className="space-y-2 text-xs">
                    {wclInitialData.map((item, i) => (
                      <li key={i} className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                        <span className="text-slate-500 font-medium">{item.param}</span>
                        <span className="text-slate-900 dark:text-slate-100 font-mono text-right">{item.val}</span>
                      </li>
                    ))}
                  </ul>
                </ComparisonCard>
                <ComparisonCard title="Stressed State (Worst Scenario)" tone="neg">
                  <ul className="space-y-2 text-xs">
                    {wclStressedData.map((item, i) => (
                      <li key={i} className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                        <span className="text-[#BC4128] dark:text-[#E2694A]">{item.metric}</span>
                        <span className="text-slate-900 dark:text-slate-100 font-mono text-right">{item.val}</span>
                      </li>
                    ))}
                    <li className="flex justify-between pt-2">
                      <span className="font-bold text-[#BC4128] dark:text-[#E2694A] text-sm">WCL Projected Loss</span>
                      <span className="font-bold text-[#BC4128] dark:text-[#E2694A] text-sm font-mono">$1,615,586</span>
                    </li>
                  </ul>
                </ComparisonCard>
              </ComparisonGrid>
            </div>

            {/* House Excess */}
            <div>
              <h3 className="font-serif text-xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
                3. House Excess: Operational Liquidity
              </h3>
              <p className="mb-4 text-sm">
                House Excess represents the surplus equity in a client's account above the broker's proprietary (in-house) margin requirements. While regulatory bodies establish minimums (e.g., 25%), brokers universally enforce higher "house requirements" (e.g., 35%) to create an operational safety buffer.
              </p>
              <SimpleTable 
                headers={["Liquidity Metric", "Calculation / Value"]}
                rows={houseExcessData}
                renderRow={(row, i) => (
                  <tr key={i} className={`transition-colors ${row.highlight ? 'bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
                    <td className={`p-3 font-medium ${row.highlight ? 'text-[#1D8A70] dark:text-[#3CBF9C] font-bold' : 'text-slate-900 dark:text-slate-100'}`}>{row.metric}</td>
                    <td className={`p-3 font-mono text-xs ${row.highlight ? 'text-[#1D8A70] dark:text-[#3CBF9C] font-bold' : 'text-slate-600 dark:text-slate-400'}`}>{row.val}</td>
                  </tr>
                )}
              />
            </div>

            {/* Shortfall */}
            <div>
              <h3 className="font-serif text-xl font-bold text-[#BC4128] dark:text-[#E2694A] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
                4. Shortfall: Margin Calls & Deficiencies
              </h3>
              <p className="mb-4 text-sm">
                A shortfall manifests when account equity drops below the required maintenance level. This triggers a "margin call," demanding additional capital. If unmet, the broker reserves the right to forcefully liquidate assets.
              </p>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-4">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-900">
                  <h4 className="font-serif font-bold text-slate-900 dark:text-slate-100">The Mechanics of Curing a Shortfall</h4>
                  <p className="text-xs text-slate-500">Assume a sudden shock reduces TMV from $2M to $1.4M.</p>
                </div>
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {shortfallData.map((item, i) => (
                    <li key={i} className={`p-3 flex justify-between items-center text-sm ${item.alert ? 'bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border-t-2 border-[#BC4128]/30 dark:border-[#E2694A]/30' : ''}`}>
                      <span className={`font-medium ${item.alert ? 'text-[#BC4128] dark:text-[#E2694A] font-bold' : 'text-slate-700 dark:text-slate-300'}`}>{item.metric}</span>
                      <span className={`font-mono text-right ${item.alert ? 'text-[#BC4128] dark:text-[#E2694A] font-bold' : 'text-slate-600 dark:text-slate-400'}`}>{item.val}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs font-semibold text-[#BC4128] dark:text-[#E2694A]">
                Notice the punitive nature of forced liquidations: Because selling stock reduces both TMV and the loan, the broker must sell $138,461 of assets just to cure a $90,000 cash deficit.
              </p>
            </div>

            {/* Margin Release */}
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
                5. Margin Release: Unlocking Capital Efficiency
              </h3>
              <p className="mb-4 text-sm">
                Margin release is the unencumbering of capital previously locked to support a risk position. It occurs when a portfolio's mathematical risk profile improves (e.g., adding a hedge). In Wealth Management, this is heavily used via box spreads to finance major purchases without triggering capital gains.
              </p>
              
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mt-6">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      <th className="p-3 font-semibold font-serif text-slate-800 dark:text-slate-200">Framework</th>
                      <th className="p-3 font-semibold font-serif text-slate-800 dark:text-slate-200">Size</th>
                      <th className="p-3 font-semibold font-serif text-[#1D8A70] dark:text-[#3CBF9C]">Available Release Limit</th>
                      <th className="p-3 font-semibold font-serif text-slate-800 dark:text-slate-200">Post-Withdrawal Buffer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-gray-900">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-900 dark:text-slate-100">Regulation T</td>
                      <td className="p-3 font-mono text-slate-600 dark:text-slate-400">$2.5M</td>
                      <td className="p-3 font-mono font-bold text-[#1D8A70] dark:text-[#3CBF9C]">$1,250,000</td>
                      <td className="p-3 font-medium text-[#BC4128] dark:text-[#E2694A]">$0 (High Margin Call Risk)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-900 dark:text-slate-100">Portfolio Margin</td>
                      <td className="p-3 font-mono text-slate-600 dark:text-slate-400">$2.5M</td>
                      <td className="p-3 font-mono font-bold text-[#1D8A70] dark:text-[#3CBF9C]">$2,125,000</td>
                      <td className="p-3 font-medium text-[#1D8A70] dark:text-[#3CBF9C]">$875,000 (Safe House Excess)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Structural Divides
          </h2>

          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-3">
                  Prime Brokerage
                </h3>
                <p className="text-sm">
                  <strong className="text-slate-900 dark:text-slate-100">The Institutional Quest for Capital Efficiency.</strong> PB services volume and scale. Hedge funds demand maximum leverage to execute statistical arbitrage. The focus is optimizing WCL via cross-margining and aggressive rehypothecation of collateral to maximize ROE.
                </p>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-3">
                  Wealth Management
                </h3>
                <p className="text-sm">
                  <strong className="text-slate-900 dark:text-slate-100">The Lombard Paradigm & Concentrated Risk.</strong> WM services UHNW individuals holding highly concentrated single-stock positions. The primary goal is extracting tax-free liquidity for lifestyle purposes while fiercely avoiding forced liquidations caused by idiosyncratic gap risk.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto border-t border-slate-200 dark:border-slate-700">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-white dark:bg-gray-900">
                    <th className="p-4 font-serif font-bold text-slate-800 dark:text-slate-200 w-1/4">Characteristic</th>
                    <th className="p-4 font-serif font-bold text-[#A8672E] dark:text-[#D08F52] w-3/8">Prime Brokerage</th>
                    <th className="p-4 font-serif font-bold text-[#A8672E] dark:text-[#D08F52] w-3/8">Wealth Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-gray-900">
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30">{row.char}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700">{row.pb}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{row.wm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
