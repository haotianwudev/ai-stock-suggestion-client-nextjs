'use client';

import { FileText, Landmark, Scale, AlertTriangle, BarChart, Users, ChevronsRight } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

// Helper component for section titles with color theming
const SectionHeader = ({ icon, title, theme }) => {
  const colors = {
    slate: { bg: 'bg-slate-100', text: 'text-slate-800 dark:text-slate-200', border: 'border-slate-200 dark:border-slate-800' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
    rose: { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-200' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-200' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' },
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
  };

  const selectedTheme = colors[theme] || colors.slate;

  return (
    <div className={`flex items-center pb-3 mb-6 border-b-2 ${selectedTheme.border}`}>
      <span className={`inline-block rounded-full p-3 mr-4 ${selectedTheme.bg} ${selectedTheme.text}`}>
        {icon}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">{title}</h2>
    </div>
  );
};

// Helper component for highlighting important words
const Highlight = ({ children, definition }) => (
  <strong className="font-bold text-[#A8672E] dark:text-[#D08F52]">
    {children}
    {definition && <span className="font-normal text-gray-600"> ({definition})</span>}
  </strong>
);

export default function JaneStreetPrecedentArticle() {
  return (
    <ArticleFrame
      slug="jane-street-precedent-market-manipulation"
      additionalDisclaimer="This article does not constitute legal or investment advice. The information presented is based on public sources and regulatory documents, and represents the author's analysis of these events."
    >
      <div className="space-y-8">
        {/* Section: Executive Summary */}
        <div id="executive-summary" className="bg-white dark:bg-[#0A0D14] p-6 md:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
          <SectionHeader icon={<FileText size={24} />} title="Executive Summary" theme="slate" />
          <p className="text-gray-700 leading-relaxed">
            The regulatory action by <Highlight>SEBI</Highlight> against quant firm <Highlight>Jane Street</Highlight> is a watershed moment for India&apos;s capital markets. Sparked by a US lawsuit, the case exposed an allegedly manipulative strategy targeting the Indian options market. <Highlight>SEBI&apos;s</Highlight> investigation led to a landmark interim order on July 3, 2025, barring <Highlight>Jane Street</Highlight> and impounding ~$567 million (`₹4,844` crore) in &ldquo;unlawful gains.&rdquo; The core allegation involves a cross-market <Highlight>&ldquo;pump-and-dump&rdquo;</Highlight> scheme: using large trades in the cash market to artificially move indices to profit from massive, pre-existing bearish positions in the hyper-liquid index options market. <Highlight>Jane Street</Highlight> refutes this, claiming its actions were standard <Highlight>index arbitrage</Highlight>. This saga highlights critical vulnerabilities like the <Highlight>liquidity mismatch</Highlight> between derivatives and cash segments and the <Highlight>&ldquo;gamification&rdquo;</Highlight> of finance. <Highlight>SEBI&apos;s</Highlight> response has been a fundamental re-engineering of the market, including curbing weekly expiries and shifting to sophisticated, <Highlight>delta-based position limits</Highlight>. For institutions, this signals an era of heightened regulatory risk. For retail investors, it&apos;s a stark lesson on the perils of speculation. The case is a litmus test for India&apos;s ambition as a global financial hub, forcing a rebalancing between foreign liquidity and market integrity.
          </p>
        </div>

        {/* Section: Anatomy of a Regulatory Takedown */}
        <div id="regulatory-takedown" className="bg-purple-50 p-6 md:p-8 rounded-xl shadow-lg border border-purple-200">
          <SectionHeader icon={<Landmark size={24} />} title="Anatomy of a Regulatory Takedown" theme="purple" />
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-purple-900 mb-2 font-serif">The Spark and Accusation</h3>
              <p>
                The saga began in April 2024 with a <Highlight>Jane Street</Highlight> lawsuit in New York over a stolen strategy designed for the Indian options market, which reportedly earned over $1 billion. This prompted <Highlight>SEBI</Highlight> to direct the <Highlight definition="National Stock Exchange">NSE</Highlight> to investigate. On July 3, 2025, <Highlight>SEBI</Highlight> issued a 105-page order against <Highlight>Jane Street</Highlight> entities, accusing them of an &ldquo;intentional, well-planned, and sinister scheme&rdquo; and ordering the disgorgement of `₹4,844` crore.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-purple-900 mb-2 font-serif">The Alleged Strategies</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong><Highlight>&ldquo;Intra-day Index Manipulation&rdquo;:</Highlight></strong> A two-phase <Highlight>&lsquo;pump-and-dump&rsquo;</Highlight> on expiry days.
                  <ul className="list-['-_'] list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Morning:</strong> Artificially inflate the index by aggressively buying underlying stocks.</li>
                    <li><strong>Simultaneously:</strong> Build massive bearish positions in index options.</li>
                    <li><strong>Afternoon:</strong> Dump the stocks to crash the index.</li>
                    <li><strong>Payoff:</strong> A small loss on stock trades is dwarfed by huge profits from the options positions.</li>
                  </ul>
                </li>
                <li>
                  <strong><Highlight>&ldquo;Extended Marking the Close&rdquo;:</Highlight></strong> Using large, directional trades in the final hour to manipulate the closing price of an index.
                </li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <h3 className="text-xl font-semibold text-purple-900 mb-2 mt-4 font-serif">Timeline of Events</h3>
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-purple-800 uppercase bg-purple-200">
                  <tr>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Event</th>
                    <th scope="col" className="px-6 py-3">Significance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-[#0A0D14] border-b border-purple-100">
                    <td className="px-6 py-4 font-medium">April 2024</td>
                    <td className="px-6 py-4">Jane Street files lawsuit in NY over a stolen strategy for the Indian market.</td>
                    <td className="px-6 py-4">Public lawsuit acts as the initial red flag for Indian regulators.</td>
                  </tr>
                  <tr className="bg-purple-50 border-b border-purple-100">
                    <td className="px-6 py-4 font-medium">Nov 13, 2024</td>
                    <td className="px-6 py-4">NSE submits report to SEBI, concluding actions were &ldquo;fraudulent and manipulative&rdquo;.</td>
                    <td className="px-6 py-4">Primary exchange confirms manipulative patterns; delay in action draws criticism.</td>
                  </tr>
                  <tr className="bg-white dark:bg-[#0A0D14] border-b border-purple-100">
                    <td className="px-6 py-4 font-medium">July 3, 2025</td>
                    <td className="px-6 py-4">SEBI issues interim order, banning Jane Street and ordering disgorgement of `₹4,844` crore.</td>
                    <td className="px-6 py-4">Regulatory action becomes public with one of the largest penalties in SEBI history.</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="px-6 py-4 font-medium">July 21, 2025</td>
                    <td className="px-6 py-4">SEBI lifts trading ban after Jane Street deposits funds into escrow.</td>
                    <td className="px-6 py-4">Firm re-enters the market under heightened monitoring and strict conditions.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section: The Core Contention */}
        <div id="core-contention" className="bg-amber-50 p-6 md:p-8 rounded-xl shadow-lg border border-amber-200">
          <SectionHeader icon={<Scale size={24} />} title="Arbitrage or Manipulation?" theme="amber" />
          <div className="grid md:grid-cols-2 gap-8 text-gray-700 leading-relaxed">
            <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300">
              <h4 className="text-lg font-bold text-green-900 mb-2">Jane Street&apos;s Defense: Standard Arbitrage</h4>
              <p>
                The firm framed its actions as &ldquo;basic <Highlight>index arbitrage</Highlight>.&rdquo; They argue they identified an inefficiency where speculative retail activity overpriced index options. Their strategy was a textbook response: sell overpriced options and buy cheaper stocks to hedge, thereby correcting the price dislocation and improving market efficiency.
              </p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg border-2 border-red-300">
              <h4 className="text-lg font-bold text-red-900 mb-2">SEBI&apos;s Rebuttal: Intentional Manipulation</h4>
              <p>
                <Highlight>SEBI&apos;s</Highlight> case rests on <Highlight>intentional losses</Highlight>. It argues <Highlight>Jane Street</Highlight> knowingly lost money on cash market trades, which only makes economic sense as a calculated cost to manipulate the index for a much larger options profit. The sheer scale and aggressiveness of trades were designed to <em>drive</em> prices and deceive retail traders.
              </p>
            </div>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed">
            This case highlights the razor-thin line between a trading &ldquo;edge&rdquo; and abuse. <Highlight>SEBI&apos;s</Highlight> approach, using the trading pattern itself as evidence of intent, could set a new legal precedent in India, shifting the burden from proving a subjective state of mind to demonstrating an objective, distorting market effect.
          </p>
        </div>

        {/* Section: A System Under Scrutiny */}
        <div id="system-scrutiny" className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-6 md:p-8 rounded-xl shadow-lg border border-rose-200">
          <SectionHeader icon={<AlertTriangle size={24} />} title="A System Under Scrutiny" theme="rose" />
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-rose-900 mb-2 font-serif">Structural Vulnerabilities Exposed</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Regulatory Delay:</strong> A year-long lag between the first red flag and <Highlight>SEBI&apos;s</Highlight> action raised questions about surveillance agility.</li>
                <li><strong><Highlight>Liquidity Mismatch</Highlight>:</strong> Highlighted the dangerous asymmetry between the hyper-liquid options market (85 billion contracts in 2023) and the illiquid underlying cash market.</li>
                <li><strong><Highlight>Gamification of Finance</Highlight>:</strong> The retail trading boom created &ldquo;unwitting liquidity,&rdquo; with 91% of individual <Highlight definition="Futures and Options">F&O</Highlight> traders losing money (`₹1.05` lakh crore in FY25).</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-rose-900 mb-2 font-serif">The Regulatory Overhaul</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Curbing Short-Termism:</strong> Discontinued weekly options expiries for many indices.</li>
                <li><strong>Raising Participation Bar:</strong> Increased minimum lot sizes for derivatives to `₹15-20` lakh.</li>
                <li><strong>Formalizing Algos:</strong> Mandated unique IDs and exchange approval for all trading algorithms.</li>
                <li><strong>Shift to <Highlight>Delta-Based Limits</Highlight>:</strong> Moved from crude notional value to a sophisticated, risk-sensitive delta-based system for position limits, a crucial step in preventing massive directional bets.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section: Implications for Institutions */}
        <div id="implications" className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-6 md:p-8 rounded-xl shadow-lg border border-teal-200">
          <SectionHeader icon={<BarChart size={24} />} title="Implications for Institutions & HFT Firms" theme="teal" />
          <ul className="space-y-3 text-gray-700 leading-relaxed list-disc list-inside">
            <li><strong>New Compliance Paradigm:</strong> The <Highlight>&ldquo;black box&rdquo;</Highlight> algorithm era is over. Firms must be prepared for deep algorithmic audits and provide clear economic rationale for strategies.</li>
            <li><strong>Re-evaluating Dual-Entity Structures:</strong> <Highlight>SEBI</Highlight> will look through complex legal setups to assess consolidated trading activity, curtailing regulatory arbitrage.</li>
            <li><strong>Impact on Liquidity:</strong> The ban caused a ~36% drop in derivatives turnover and wider bid-ask spreads, showing the double-edged sword of <Highlight definition="High-Frequency Trading">HFT</Highlight>. A calmer market may be less profitable.</li>
            <li><strong>Global Ripple Effect:</strong> The case triggered international scrutiny (US <Highlight definition="Securities and Exchange Commission">SEC</Highlight> requested details), setting a precedent for emerging market regulators to be more assertive.</li>
          </ul>
        </div>

        {/* Section: Lessons for Retail Investors */}
        <div id="retail-lessons" className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-6 md:p-8 rounded-xl shadow-lg border border-indigo-200">
          <SectionHeader icon={<Users size={24} />} title="Lessons for Retail Investors" theme="indigo" />
          <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-6 shadow">
            <p className="text-yellow-900">
              <strong>Core Lesson:</strong> Your <Highlight>counterparty</Highlight> in the derivatives market is often a highly sophisticated institution with immense technological and informational advantages.
            </p>
          </div>
          <ul className="space-y-3 text-gray-700 leading-relaxed list-disc list-inside">
            <li><strong>Don&apos;t Blindly Follow Trends:</strong> Intraday index moves can be artificially manufactured to trap trend-following retail traders. Be wary of expiry-day volatility.</li>
            <li><strong>The Stats Are Against You:</strong> Remember <Highlight>SEBI&apos;s</Highlight> finding that over 90% of retail <Highlight>F&O</Highlight> traders lose money. The profits of sophisticated players often equal retail losses.</li>
            <li><strong>Prioritize Long-Term Investing:</strong> The most reliable path to wealth is often disciplined, long-term investment in the cash market, not speculative derivatives.</li>
          </ul>
        </div>

        {/* Section: The Path Forward */}
        <div id="path-forward" className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-6 md:p-8 rounded-xl shadow-lg border border-emerald-200">
          <SectionHeader icon={<ChevronsRight size={24} />} title="The Path Forward" theme="emerald" />
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-xl font-semibold text-emerald-900 mb-2 font-serif">Recommendations</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>For Regulators (<Highlight>SEBI</Highlight>):</strong> Enhance real-time, cross-market surveillance, strengthen index governance, and sustain aggressive investor education campaigns.</li>
                <li><strong>For Intermediaries (Exchanges &amp; Brokers):</strong> Assume greater responsibility as the first line of defense with improved surveillance and robust internal controls.</li>
                <li><strong>For Institutional Firms:</strong> Embed ethics and proactive risk assessment into the core of strategy development. A culture of compliance is no longer optional.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-emerald-900 mb-2 font-serif">Outlook</h3>
              <p>
                The &ldquo;Wild West&rdquo; era of India&apos;s derivatives boom is likely over, replaced by a more sober and stringently regulated environment. This is a necessary step in building a more trustworthy and sustainable capital market for India&apos;s long-term economic growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ArticleFrame>
  );
}
