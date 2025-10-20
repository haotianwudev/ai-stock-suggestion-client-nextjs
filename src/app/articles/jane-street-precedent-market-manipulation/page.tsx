'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, AlertTriangle, ChevronsRight, Scale, Shield, Users, BarChart, Globe, Target, TrendingUp, TrendingDown, Landmark, FileText } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Helper component for section titles with color theming
const SectionHeader = ({ icon, title, theme }) => {
  const colors = {
    slate: { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-200' },
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
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
    </div>
  );
};

// Helper component for highlighting important words
const Highlight = ({ children, definition }) => (
  <strong className="font-bold text-blue-700">
    {children}
    {definition && <span className="font-normal text-gray-600"> ({definition})</span>}
  </strong>
);

export default function JaneStreetPrecedentArticle() {
  const currentArticle = articles.find(article => article.slug === 'jane-street-precedent-market-manipulation');
  
  const navLinks = [
    { href: '#executive-summary', label: 'Executive Summary' },
    { href: '#regulatory-takedown', label: 'Regulatory Takedown' },
    { href: '#core-contention', label: 'Core Contention' },
    { href: '#system-scrutiny', label: 'System Scrutiny' },
    { href: '#implications', label: 'Implications' },
    { href: '#retail-lessons', label: 'Retail Lessons' },
    { href: '#path-forward', label: 'Path Forward' },
  ];

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
        {/* Return to Home Button */}
        <div className="container mx-auto px-6 pt-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        {/* Deep Research Badge - Top Left */}
        <div className="relative">
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Deep Research
            </span>
          </div>
        </div>

        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-900 flex items-center">
              <Landmark className="text-blue-600 mr-2" />
              Market Regulation Analysis
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300 text-sm">
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </header>

        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Main Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              The <Highlight>Jane Street</Highlight> Precedent: <Highlight>Manipulation</Highlight>, Regulation, and the Future of India's Derivatives Market
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              An in-depth analysis of the <Highlight definition="Securities and Exchange Board of India">SEBI</Highlight> vs. <Highlight>Jane Street</Highlight> case and its sweeping implications for global finance.
            </p>
          </header>

          {/* Main Content Sections */}
          <main className="space-y-8">
            {/* Section: Executive Summary */}
            <div id="executive-summary" className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-200">
              <SectionHeader icon={<FileText size={24} />} title="Executive Summary" theme="slate" />
              <p className="text-gray-700 leading-relaxed">
                The regulatory action by <Highlight>SEBI</Highlight> against quant firm <Highlight>Jane Street</Highlight> is a watershed moment for India's capital markets. Sparked by a US lawsuit, the case exposed an allegedly manipulative strategy targeting the Indian options market. <Highlight>SEBI's</Highlight> investigation led to a landmark interim order on July 3, 2025, barring <Highlight>Jane Street</Highlight> and impounding ~$567 million (`₹4,844` crore) in "unlawful gains." The core allegation involves a cross-market <Highlight>"pump-and-dump"</Highlight> scheme: using large trades in the cash market to artificially move indices to profit from massive, pre-existing bearish positions in the hyper-liquid index options market. <Highlight>Jane Street</Highlight> refutes this, claiming its actions were standard <Highlight>index arbitrage</Highlight>. This saga highlights critical vulnerabilities like the <Highlight>liquidity mismatch</Highlight> between derivatives and cash segments and the <Highlight>"gamification"</Highlight> of finance. <Highlight>SEBI's</Highlight> response has been a fundamental re-engineering of the market, including curbing weekly expiries and shifting to sophisticated, <Highlight>delta-based position limits</Highlight>. For institutions, this signals an era of heightened regulatory risk. For retail investors, it's a stark lesson on the perils of speculation. The case is a litmus test for India's ambition as a global financial hub, forcing a rebalancing between foreign liquidity and market integrity.
              </p>
            </div>

            {/* Section: Anatomy of a Regulatory Takedown */}
            <div id="regulatory-takedown" className="bg-purple-50 p-6 md:p-8 rounded-xl shadow-lg border border-purple-200">
              <SectionHeader icon={<Landmark size={24} />} title="Anatomy of a Regulatory Takedown" theme="purple" />
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">The Spark and Accusation</h3>
                  <p>
                    The saga began in April 2024 with a <Highlight>Jane Street</Highlight> lawsuit in New York over a stolen strategy designed for the Indian options market, which reportedly earned over $1 billion. This prompted <Highlight>SEBI</Highlight> to direct the <Highlight definition="National Stock Exchange">NSE</Highlight> to investigate. On July 3, 2025, <Highlight>SEBI</Highlight> issued a 105-page order against <Highlight>Jane Street</Highlight> entities, accusing them of an "intentional, well-planned, and sinister scheme" and ordering the disgorgement of `₹4,844` crore.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">The Alleged Strategies</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong><Highlight>"Intra-day Index Manipulation":</Highlight></strong> A two-phase <Highlight>'pump-and-dump'</Highlight> on expiry days.
                      <ul className="list-['-_'] list-inside ml-6 mt-2 space-y-1">
                        <li><strong>Morning:</strong> Artificially inflate the index by aggressively buying underlying stocks.</li>
                        <li><strong>Simultaneously:</strong> Build massive bearish positions in index options.</li>
                        <li><strong>Afternoon:</strong> Dump the stocks to crash the index.</li>
                        <li><strong>Payoff:</strong> A small loss on stock trades is dwarfed by huge profits from the options positions.</li>
                      </ul>
                    </li>
                    <li>
                      <strong><Highlight>"Extended Marking the Close":</Highlight></strong> Using large, directional trades in the final hour to manipulate the closing price of an index.
                    </li>
                  </ul>
                </div>

                <div className="overflow-x-auto">
                  <h3 className="text-xl font-semibold text-purple-900 mb-2 mt-4">Timeline of Events</h3>
                  <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-purple-800 uppercase bg-purple-200">
                      <tr>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Event</th>
                        <th scope="col" className="px-6 py-3">Significance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b border-purple-100">
                        <td className="px-6 py-4 font-medium">April 2024</td>
                        <td className="px-6 py-4">Jane Street files lawsuit in NY over a stolen strategy for the Indian market.</td>
                        <td className="px-6 py-4">Public lawsuit acts as the initial red flag for Indian regulators.</td>
                      </tr>
                      <tr className="bg-purple-50 border-b border-purple-100">
                        <td className="px-6 py-4 font-medium">Nov 13, 2024</td>
                        <td className="px-6 py-4">NSE submits report to SEBI, concluding actions were "fraudulent and manipulative".</td>
                        <td className="px-6 py-4">Primary exchange confirms manipulative patterns; delay in action draws criticism.</td>
                      </tr>
                      <tr className="bg-white border-b border-purple-100">
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
                  <h4 className="text-lg font-bold text-green-900 mb-2">Jane Street's Defense: Standard Arbitrage</h4>
                  <p>
                    The firm framed its actions as "basic <Highlight>index arbitrage</Highlight>." They argue they identified an inefficiency where speculative retail activity overpriced index options. Their strategy was a textbook response: sell overpriced options and buy cheaper stocks to hedge, thereby correcting the price dislocation and improving market efficiency.
                  </p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg border-2 border-red-300">
                  <h4 className="text-lg font-bold text-red-900 mb-2">SEBI's Rebuttal: Intentional Manipulation</h4>
                  <p>
                    <Highlight>SEBI's</Highlight> case rests on <Highlight>intentional losses</Highlight>. It argues <Highlight>Jane Street</Highlight> knowingly lost money on cash market trades, which only makes economic sense as a calculated cost to manipulate the index for a much larger options profit. The sheer scale and aggressiveness of trades were designed to <em>drive</em> prices and deceive retail traders.
                  </p>
                </div>
              </div>
              <p className="mt-6 text-gray-700 leading-relaxed">
                This case highlights the razor-thin line between a trading "edge" and abuse. <Highlight>SEBI's</Highlight> approach, using the trading pattern itself as evidence of intent, could set a new legal precedent in India, shifting the burden from proving a subjective state of mind to demonstrating an objective, distorting market effect.
              </p>
            </div>

            {/* Section: A System Under Scrutiny */}
            <div id="system-scrutiny" className="bg-rose-50 p-6 md:p-8 rounded-xl shadow-lg border border-rose-200">
              <SectionHeader icon={<AlertTriangle size={24} />} title="A System Under Scrutiny" theme="rose" />
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-rose-900 mb-2">Structural Vulnerabilities Exposed</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Regulatory Delay:</strong> A year-long lag between the first red flag and <Highlight>SEBI's</Highlight> action raised questions about surveillance agility.</li>
                    <li><strong><Highlight>Liquidity Mismatch</Highlight>:</strong> Highlighted the dangerous asymmetry between the hyper-liquid options market (85 billion contracts in 2023) and the illiquid underlying cash market.</li>
                    <li><strong><Highlight>Gamification of Finance</Highlight>:</strong> The retail trading boom created "unwitting liquidity," with 91% of individual <Highlight definition="Futures and Options">F&O</Highlight> traders losing money (`₹1.05` lakh crore in FY25).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-rose-900 mb-2">The Regulatory Overhaul</h3>
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
            <div id="implications" className="bg-teal-50 p-6 md:p-8 rounded-xl shadow-lg border border-teal-200">
              <SectionHeader icon={<BarChart size={24} />} title="Implications for Institutions & HFT Firms" theme="teal" />
              <ul className="space-y-3 text-gray-700 leading-relaxed list-disc list-inside">
                <li><strong>New Compliance Paradigm:</strong> The <Highlight>"black box"</Highlight> algorithm era is over. Firms must be prepared for deep algorithmic audits and provide clear economic rationale for strategies.</li>
                <li><strong>Re-evaluating Dual-Entity Structures:</strong> <Highlight>SEBI</Highlight> will look through complex legal setups to assess consolidated trading activity, curtailing regulatory arbitrage.</li>
                <li><strong>Impact on Liquidity:</strong> The ban caused a ~36% drop in derivatives turnover and wider bid-ask spreads, showing the double-edged sword of <Highlight definition="High-Frequency Trading">HFT</Highlight>. A calmer market may be less profitable.</li>
                <li><strong>Global Ripple Effect:</strong> The case triggered international scrutiny (US <Highlight definition="Securities and Exchange Commission">SEC</Highlight> requested details), setting a precedent for emerging market regulators to be more assertive.</li>
              </ul>
            </div>

            {/* Section: Lessons for Retail Investors */}
            <div id="retail-lessons" className="bg-indigo-50 p-6 md:p-8 rounded-xl shadow-lg border border-indigo-200">
              <SectionHeader icon={<Users size={24} />} title="Lessons for Retail Investors" theme="indigo" />
              <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-6 shadow">
                <p className="text-yellow-900">
                  <strong>Core Lesson:</strong> Your <Highlight>counterparty</Highlight> in the derivatives market is often a highly sophisticated institution with immense technological and informational advantages.
                </p>
              </div>
              <ul className="space-y-3 text-gray-700 leading-relaxed list-disc list-inside">
                <li><strong>Don't Blindly Follow Trends:</strong> Intraday index moves can be artificially manufactured to trap trend-following retail traders. Be wary of expiry-day volatility.</li>
                <li><strong>The Stats Are Against You:</strong> Remember <Highlight>SEBI's</Highlight> finding that over 90% of retail <Highlight>F&O</Highlight> traders lose money. The profits of sophisticated players often equal retail losses.</li>
                <li><strong>Prioritize Long-Term Investing:</strong> The most reliable path to wealth is often disciplined, long-term investment in the cash market, not speculative derivatives.</li>
              </ul>
            </div>

            {/* Section: The Path Forward */}
            <div id="path-forward" className="bg-emerald-50 p-6 md:p-8 rounded-xl shadow-lg border border-emerald-200">
              <SectionHeader icon={<ChevronsRight size={24} />} title="The Path Forward" theme="emerald" />
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-emerald-900 mb-2">Recommendations</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>For Regulators (<Highlight>SEBI</Highlight>):</strong> Enhance real-time, cross-market surveillance, strengthen index governance, and sustain aggressive investor education campaigns.</li>
                    <li><strong>For Intermediaries (Exchanges & Brokers):</strong> Assume greater responsibility as the first line of defense with improved surveillance and robust internal controls.</li>
                    <li><strong>For Institutional Firms:</strong> Embed ethics and proactive risk assessment into the core of strategy development. A culture of compliance is no longer optional.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-emerald-900 mb-2">Outlook</h3>
                  <p>
                    The "Wild West" era of India's derivatives boom is likely over, replaced by a more sober and stringently regulated environment. This is a necessary step in building a more trustworthy and sustainable capital market for India's long-term economic growth.
                  </p>
                </div>
              </div>
            </div>
          </main>

          {/* Risk Warning */}
          <section className="py-12 bg-red-50 border-l-4 border-red-500 max-w-5xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
            <div className="flex items-start">
              <AlertTriangle className="text-red-500 mr-4 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Important Disclosure</h3>
                <p className="text-red-700">
                  This article is for educational purposes only and does not constitute legal or investment advice. 
                  Always consult with qualified professionals before making investment decisions.
                  The information presented is based on public sources and regulatory documents, and represents the author's analysis of these events.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-8 text-gray-500 mt-8">
            <p>© 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.</p>
          </footer>
        </div>
      </div>
    </>
  );
}
