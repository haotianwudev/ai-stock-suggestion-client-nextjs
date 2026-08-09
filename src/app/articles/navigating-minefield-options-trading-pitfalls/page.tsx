'use client';

import { Clock, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { Jargon, ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

// --- SVG Icon Components ---
const ScaleIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 16.5l4-4" />
    <path d="m20.5 21-4-4" />
    <path d="M12 3v18" />
    <path d="M3 7h18" />
    <path d="M18 12h-6a4 4 0 0 1-4-4 4 4 0 0 1 4-4h2" />
    <path d="M6 12h6a4 4 0 0 0 4 4 4 4 0 0 0-4 4H8" />
  </svg>
);

const ZapIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const AlertTriangleIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const LandmarkIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" x2="21" y1="22" y2="22" />
    <line x1="6" x2="6" y1="18" y2="11" />
    <line x1="10" x2="10" y1="18" y2="11" />
    <line x1="14" x2="14" y1="18" y2="11" />
    <line x1="18" x2="18" y1="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </svg>
);

const BrainCircuitIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5a3 3 0 1 0-5.993.129" />
    <path d="M12 5a3 3 0 1 0 5.993.129" />
    <path d="M15 12a3 3 0 1 0-5.993.129" />
    <path d="M15 12a3 3 0 1 0 5.993.129" />
    <path d="M5.993 18.87A3 3 0 1 0 12 19" />
    <path d="M18.007 18.87A3 3 0 1 0 12 19" />
    <path d="M12 19v2" />
    <path d="M12 12v2" />
    <path d="M12 5V3" />
    <path d="m4.227 6.227-.854-.854" />
    <path d="M19.773 6.227.854-.854" />
    <path d="m4.227 17.773-.854.854" />
    <path d="m19.773 17.773.854.854" />
  </svg>
);

// --- Reusable Components ---
interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const SectionCard = ({ icon, title, children }: SectionCardProps) => (
  <section className="mb-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
    <div className="p-6 md:p-8">
      <div className="flex items-center mb-6 text-[#A8672E] dark:text-[#D08F52]">
        {icon}
        <h2 className="ml-4 font-serif text-2xl md:text-3xl text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className="space-y-8">{children}</div>
    </div>
  </section>
);

interface TableProps {
  headers: string[];
  data: string[][];
}

const Table = ({ headers, data }: TableProps) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800/50">
        <tr>
          {headers.map((header: string, index: number) => (
            <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
        {data.map((row: string[], rowIndex: number) => (
          <tr key={rowIndex}>
            {row.map((cell: string, cellIndex: number) => (
              <td key={cellIndex} className="px-6 py-4 whitespace-normal text-sm font-mono tabular-nums text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: cell }}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Page Content Data ---
const POS = "text-[#1D8A70] dark:text-[#3CBF9C]";
const NEG = "text-[#BC4128] dark:text-[#E2694A]";

const table1Data = {
  headers: ["Feature", "Index Option (e.g., SPX)", "ETF Option (e.g., SPY)", "Key Implication / Pitfall for Traders"],
  data: [
    ["Underlying Asset", "A calculated index value; cannot be owned directly.", "Shares of an Exchange-Traded Fund; can be owned and traded like a stock.", "Index options are pure derivatives; ETF options are derivatives of a tradable security."],
    ["Settlement Method", `<strong class='${POS}'>Cash Settlement.</strong>`, `<strong class='${NEG}'>Physical Settlement</strong> (delivery of 100 ETF shares per contract).`, "Pitfall: ETF option sellers must be prepared for the capital requirement and risk of owning/delivering shares upon assignment."],
    ["Exercise Style", `<strong class='${POS}'>European</strong> (exercisable only at expiration).`, `<strong class='${NEG}'>American</strong> (exercisable at any time before expiration).`, `Pitfall: ETF option sellers face <strong class='${NEG}'>early assignment risk</strong>, which can disrupt strategies and lead to unexpected stock positions.`],
    ["Assignment Risk", `<strong class='${POS}'>No early assignment risk.</strong>`, `<strong class='${NEG}'>Risk of early assignment is always present</strong>, especially for ITM options.`, "Index options provide certainty for sellers, while ETF options introduce a timing wildcard."],
    ["Dividend Impact", "None (indexes do not pay dividends).", `Significant. High risk of <strong class='${NEG}'>early assignment</strong> on ITM calls before an ex-dividend date.`, "Pitfall: Sellers of ITM SPY calls may have shares called away, forfeiting the dividend."],
    ["Contract Notional Value", "Large (Index Level x $100).", "Smaller (ETF Price x 100). SPX is ~$10x larger than SPY.", `Pitfall: Underestimating the large <strong class='${NEG}'>leverage and risk</strong> of a single SPX contract.`],
    ["Trading Hours", "Near 24/5 trading for many index products.", "Standard stock market hours (9:30 AM - 4:00 PM ET).", `Pitfall: ETF option traders are exposed to <strong class='${NEG}'>overnight and pre-market risk</strong> that cannot be hedged outside of market hours.`],
    ["Tax Treatment", `<strong class='${POS}'>Section 1256 Contract</strong> (60% long-term, 40% short-term gains).`, "Equity Option (gains are typically 100% short-term).", `Pitfall: Choosing SPY over SPX can result in a <strong class='${NEG}'>significantly higher tax liability</strong> on identical pre-tax gains.`]
  ]
};

const table2Data = {
  headers: ["Scenario", "Option Type", "Holding Period", "Tax Treatment", "Relevant Rule"],
  data: [
    ["Buy & Sell a Call for Profit", "Equity/ETF (e.g., SPY)", "Less than 1 year", `<strong class='${NEG}'>100% Short-Term Capital Gain</strong>`, "Standard Capital Gains"],
    ["Buy & Sell a Call for Profit", "Index (e.g., SPX)", "Any duration", `<strong class='${POS}'>60% Long-Term, 40% Short-Term Gain</strong>`, "Section 1256 (60/40 Rule)"],
    ["Sell a Put, Buy to Close for Profit", "Equity/ETF (e.g., SPY)", "Any duration", `<strong class='${NEG}'>100% Short-Term Capital Gain</strong>`, "Short Option Rule"],
    ["Sell a Call, Expires Worthless", "Equity/ETF (e.g., SPY)", "Any duration", `<strong class='${NEG}'>100% Short-Term Capital Gain</strong>`, "Short Option Rule"],
    ["Assigned on Short Put, Sell Stock Later", "Equity/ETF (e.g., SPY)", "Stock held < 1 year", "Short-Term Gain/Loss on Stock", "Cost Basis Adjustment"],
    ["Hold Open Profitable Position on Dec 31", "Index (e.g., SPX)", "N/A", "Unrealized gain taxed at 60/40 rate", `<strong class='${NEG}'>Mark-to-Market (MTM)</strong>`],
    ["Sell Stock for Loss, Buy Call < 30 Days", "Equity/ETF (e.g., SPY)", "N/A", `<strong class='${NEG}'>Loss on stock is disallowed</strong> and added to the cost basis of the call option.`, `<strong class='${NEG}'>Wash Sale Rule</strong>`]
  ]
};

export default function NavigatingMinefieldOptionsTrading() {
  return (
    <ArticleFrame slug="navigating-minefield-options-trading-pitfalls">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100 font-sans">
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">An Analytical Report on the Common Pitfalls of Options Trading</p>

        <InfographicSlot alt="Options Trading Pitfalls Infographic" />

        {/* Key Takeaways */}
        <section className="mb-12 mt-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-6 flex items-center">
            <AlertTriangleIcon className="w-6 h-6 mr-3 text-[#A8672E] dark:text-[#D08F52]" />
            Critical Pitfalls Overview
          </h2>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
            {[
              { label: "Emotional Trading", body: "FOMO and loss aversion destroy systematic approaches", tone: NEG },
              { label: "Time Decay (Theta)", body: "Options lose value daily, accelerating near expiration", tone: NEG },
              { label: "IV Crush", body: "Post-event volatility collapse destroys option premiums", tone: NEG },
              { label: "Assignment Risk", body: "ETF options face early assignment, especially around dividends", tone: NEG },
              { label: "Tax Efficiency", body: "SPX options offer 60/40 tax treatment vs 100% short-term for SPY", tone: POS },
              { label: "Liquidity Traps", body: "Wide bid-ask spreads create immediate losses", tone: NEG },
            ].map((item) => (
              <div key={item.label} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${item.tone === POS ? "bg-[#1D8A70] dark:bg-[#3CBF9C]" : "bg-[#BC4128] dark:bg-[#E2694A]"}`}></div>
                <div>
                  <strong className="text-gray-900 dark:text-white">{item.label}:</strong>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: Psychology & Strategy */}
        <SectionCard icon={<BrainCircuitIcon className="w-8 h-8"/>} title="Psychology & Strategy Failures">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-gray-900 dark:text-white">Trading Without a Plan</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Most failures stem from entering trades without defined entry/exit criteria, stop-losses, or position sizing rules.
                This leads to <span className="font-semibold text-[#BC4128] dark:text-[#E2694A]">emotional decision-making</span> rather than systematic execution.
              </p>
              <div className="bg-[#BC4128]/5 dark:bg-[#E2694A]/10 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-4 rounded">
                <p className="text-[#BC4128] dark:text-[#E2694A] text-sm font-medium">
                  <strong>Critical Error:</strong> Chasing momentum without risk management leads to catastrophic losses.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl text-gray-900 dark:text-white">Emotional Biases</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#BC4128] dark:bg-[#E2694A] rounded-full mt-2 flex-none"></div>
                  <div><strong className="text-[#A8672E] dark:text-[#D08F52]">FOMO:</strong> Buying overpriced calls at market peaks</div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#BC4128] dark:bg-[#E2694A] rounded-full mt-2 flex-none"></div>
                  <div><strong className="text-[#A8672E] dark:text-[#D08F52]">Loss Aversion:</strong> Holding losers too long, selling winners too early</div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#BC4128] dark:bg-[#E2694A] rounded-full mt-2 flex-none"></div>
                  <div><strong className="text-[#A8672E] dark:text-[#D08F52]">Confirmation Bias:</strong> Ignoring contradictory evidence</div>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Section 2: The Greeks */}
        <SectionCard icon={<ScaleIcon className="w-8 h-8"/>} title="Understanding the Greeks">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52] mr-2 flex-none" />
                <h3 className="font-serif text-lg text-gray-900 dark:text-white">
                  <Jargon term="Theta (Time Decay)" definition="The rate at which an option loses value purely from the passage of time, accelerating as expiration approaches." />
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Options lose value daily, accelerating exponentially in the final 30-45 days.
              </p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                <p className="text-xs font-mono tabular-nums text-gray-600 dark:text-gray-400">
                  <strong>Example:</strong> A $2.00 option with 30 days might lose $0.05/day initially, but $0.15/day in the final week.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <ZapIcon className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52] mr-2 flex-none" />
                <h3 className="font-serif text-lg text-gray-900 dark:text-white">
                  <Jargon term="Vega (Volatility)" definition="The sensitivity of an option's price to a 1-point change in implied volatility." />
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                <Jargon term="IV crush" definition="A sharp drop in implied volatility right after a known event (like earnings), which sinks option prices even if the stock moves in the predicted direction." /> after earnings can destroy option value even with correct directional calls.
              </p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                <p className="text-xs font-mono tabular-nums text-gray-600 dark:text-gray-400">
                  <strong>IV Crush:</strong> Stock moves from $100 to $103 (correct), but option falls from $5.00 to $3.50 due to volatility collapse.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52] mr-2 flex-none" />
                <h3 className="font-serif text-lg text-gray-900 dark:text-white">Delta &amp; Gamma</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Delta measures price sensitivity; Gamma measures how Delta changes.
              </p>
              <div className="bg-white dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-[#BC4128] dark:text-[#E2694A]">
                  <strong>Risk:</strong> Negative Gamma for sellers accelerates losses as positions move against you.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Section 3: Market Mechanics */}
        <SectionCard icon={<ZapIcon className="w-8 h-8"/>} title="Market Mechanics & Execution">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-gray-900 dark:text-white flex items-center">
                <AlertTriangleIcon className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A] mr-2 flex-none" />
                Liquidity Traps
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Wide bid-ask spreads in illiquid options create immediate losses. A $0.30 spread on a $1.00 option
                represents a <span className="font-mono tabular-nums font-semibold text-[#BC4128] dark:text-[#E2694A]">23%</span> transaction cost you must overcome.
              </p>
              <div className="bg-[#A8672E]/5 dark:bg-[#D08F52]/10 border border-[#A8672E]/30 dark:border-[#D08F52]/30 p-4 rounded-lg">
                <p className="text-[#A8672E] dark:text-[#D08F52] text-sm">
                  <strong>Check:</strong> Open interest &gt; 100, daily volume &gt; 50 contracts minimum
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl text-gray-900 dark:text-white flex items-center">
                <AlertTriangleIcon className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A] mr-2 flex-none" />
                Assignment Risk
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                ETF option sellers face early assignment, especially before ex-dividend dates.
                ITM call holders may exercise to capture dividends.
              </p>
              <div className="bg-[#BC4128]/5 dark:bg-[#E2694A]/10 border border-[#BC4128]/30 dark:border-[#E2694A]/30 p-4 rounded-lg">
                <p className="text-[#BC4128] dark:text-[#E2694A] text-sm">
                  <strong>Risk:</strong> Unexpected assignment can disrupt strategies and create unwanted stock positions
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Section 4: SPX vs SPY Comparison */}
        <SectionCard icon={<ScaleIcon className="w-8 h-8"/>} title="SPX vs SPY: Critical Differences">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              The choice between SPX (index) and SPY (ETF) options significantly impacts settlement, assignment risk, and tax liability.
            </p>
          </div>

          <Table headers={table1Data.headers} data={table1Data.data} />

          <ComparisonGrid>
            <ComparisonCard title="SPX Advantages" tone="pos">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-none" />Cash settlement (no assignment risk)</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-none" />European style (no early exercise)</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-none" />60/40 tax treatment (Section 1256)</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-none" />Nearly 24/5 trading hours</li>
              </ul>
            </ComparisonCard>
            <ComparisonCard title="SPY Disadvantages" tone="neg">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 mt-0.5 flex-none" />Physical settlement (assignment risk)</li>
                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 mt-0.5 flex-none" />American style (early exercise risk)</li>
                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 mt-0.5 flex-none" />100% short-term capital gains</li>
                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 mt-0.5 flex-none" />Limited trading hours</li>
              </ul>
            </ComparisonCard>
          </ComparisonGrid>
        </SectionCard>

        {/* Section 5: Tax Implications */}
        <SectionCard icon={<LandmarkIcon className="w-8 h-8"/>} title="Tax Efficiency: Section 1256 Advantage">
          <div className="bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/10 p-6 rounded-xl border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30">
            <h3 className="font-serif text-xl text-[#1D8A70] dark:text-[#3CBF9C] mb-3">
              <Jargon term="Section 1256" definition="A category of the U.S. tax code covering certain regulated contracts (including broad-based index options like SPX) that receive a blended 60% long-term / 40% short-term capital gains rate regardless of holding period." /> Tax Advantage
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Index options (SPX, RUT, NDX) receive preferential tax treatment:{' '}
              <span className="font-bold">60% long-term, 40% short-term capital gains</span>
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-serif text-[#BC4128] dark:text-[#E2694A] mb-2">SPY (ETF Option)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">$10,000 gain at 32% tax bracket:</p>
                <p className="text-lg font-mono tabular-nums font-bold text-[#BC4128] dark:text-[#E2694A]">Tax: $3,200</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-serif text-[#1D8A70] dark:text-[#3CBF9C] mb-2">SPX (Index Option)</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">$10,000 gain with 60/40 treatment:</p>
                <p className="text-lg font-mono tabular-nums font-bold text-[#1D8A70] dark:text-[#3CBF9C]">Tax: $2,180 (32% savings!)</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl text-gray-900 dark:text-white">Tax Traps to Avoid</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#BC4128]/5 dark:bg-[#E2694A]/10 p-4 rounded-lg border border-[#BC4128]/30 dark:border-[#E2694A]/30">
                <h4 className="font-serif text-[#BC4128] dark:text-[#E2694A] mb-2">
                  <Jargon term="Wash Sale Rule" definition="Disallows claiming a tax loss if you buy a 'substantially identical' security within 30 days before or after the sale that generated the loss." />
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Buying &ldquo;substantially identical&rdquo; securities within 30 days of a loss disallows the deduction.
                </p>
              </div>
              <div className="bg-[#A8672E]/5 dark:bg-[#D08F52]/10 p-4 rounded-lg border border-[#A8672E]/30 dark:border-[#D08F52]/30">
                <h4 className="font-serif text-[#A8672E] dark:text-[#D08F52] mb-2">
                  <Jargon term="Mark-to-Market" definition="Section 1256 contracts still open at year-end are treated as if sold at their Dec 31 value, potentially creating tax liability on gains you haven't actually realized." />
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Section 1256 contracts are marked-to-market on Dec 31st, creating potential tax on unrealized gains.
                </p>
              </div>
            </div>
          </div>

          <Table headers={table2Data.headers} data={table2Data.data} />
        </SectionCard>

        {/* Conclusion */}
        <section className="mt-8 mb-4">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-6">Key Success Principles</h2>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {[
                { n: 1, title: "Develop a Trading Plan", body: "Define entry/exit criteria, position sizing, and risk management before trading" },
                { n: 2, title: "Master the Greeks", body: "Understand Theta, Vega, Delta, and Gamma before risking capital" },
                { n: 3, title: "Respect Volatility", body: "Analyze IV levels and prepare for post-event volatility collapse" },
                { n: 4, title: "Choose the Right Instrument", body: "SPX for tax efficiency, SPY only when physical settlement is needed" },
                { n: 5, title: "Prioritize Liquidity", body: "Trade options with sufficient open interest and daily volume" },
                { n: 6, title: "Optimize for Taxes", body: "Leverage Section 1256 contracts for significant tax savings" },
              ].map((item) => (
                <div key={item.n} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-full flex items-center justify-center flex-none">
                    <span className="font-mono tabular-nums text-[#A8672E] dark:text-[#D08F52] font-bold text-sm">{item.n}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
