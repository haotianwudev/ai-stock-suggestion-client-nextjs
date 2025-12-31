'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Music, Maximize2, Clock, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- SVG Icon Components ---
// Using inline SVGs as per instructions, equivalent to lucide-react icons
const BookOpenIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

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
  <section className="mb-12 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:border-blue-300 hover:shadow-lg">
    <div className="p-6 md:p-8">
      <div className="flex items-center mb-6 text-blue-600">
        {icon}
        <h2 className="ml-4 text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">{title}</h2>
      </div>
      <div className="space-y-8">{children}</div>
    </div>
  </section>
);

interface SubSectionProps {
  title: string;
  children: React.ReactNode;
}

const SubSection = ({ title, children }: SubSectionProps) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-700 mb-3">{title}</h3>
    <div className="text-gray-600 leading-relaxed space-y-4 prose max-w-none">{children}</div>
  </div>
);

interface TableProps {
  headers: string[];
  data: string[][];
}

const Table = ({ headers, data }: TableProps) => (
  <div className="overflow-x-auto rounded-lg border border-gray-300">
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((header: string, index: number) => (
            <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row: string[], rowIndex: number) => (
          <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
            {row.map((cell: string, cellIndex: number) => (
              <td key={cellIndex} className="px-6 py-4 whitespace-normal text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: cell }}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Page Content Data ---
const table1Data = {
  headers: ["Feature", "Index Option (e.g., SPX)", "ETF Option (e.g., SPY)", "Key Implication / Pitfall for Traders"],
  data: [
    ["Underlying Asset", "A calculated index value; cannot be owned directly.", "Shares of an Exchange-Traded Fund; can be owned and traded like a stock.", "Index options are pure derivatives; ETF options are derivatives of a tradable security."],
    ["Settlement Method", "<strong class='text-blue-600'>Cash Settlement.</strong>", "<strong class='text-red-600'>Physical Settlement</strong> (delivery of 100 ETF shares per contract).", "**Pitfall:** ETF option sellers must be prepared for the capital requirement and risk of owning/delivering shares upon assignment."],
    ["Exercise Style", "<strong class='text-blue-600'>European</strong> (exercisable only at expiration).", "<strong class='text-red-600'>American</strong> (exercisable at any time before expiration).", "**Pitfall:** ETF option sellers face <strong class='text-red-600'>early assignment risk</strong>, which can disrupt strategies and lead to unexpected stock positions."],
    ["Assignment Risk", "<strong class='text-blue-600'>No early assignment risk.</strong>", "<strong class='text-red-600'>Risk of early assignment is always present</strong>, especially for ITM options.", "Index options provide certainty for sellers, while ETF options introduce a timing wildcard."],
    ["Dividend Impact", "None (indexes do not pay dividends).", "Significant. High risk of <strong class='text-red-600'>early assignment</strong> on ITM calls before an ex-dividend date.", "**Pitfall:** Sellers of ITM SPY calls may have shares called away, forfeiting the dividend."],
    ["Contract Notional Value", "Large (Index Level x $100).", "Smaller (ETF Price x 100). SPX is ~$10x larger than SPY.", "**Pitfall:** Underestimating the large <strong class='text-red-600'>leverage and risk</strong> of a single SPX contract."],
    ["Trading Hours", "Near 24/5 trading for many index products.", "Standard stock market hours (9:30 AM - 4:00 PM ET).", "**Pitfall:** ETF option traders are exposed to <strong class='text-red-600'>overnight and pre-market risk</strong> that cannot be hedged outside of market hours."],
    ["Tax Treatment", "<strong class='text-blue-600'>Section 1256 Contract</strong> (60% long-term, 40% short-term gains).", "Equity Option (gains are typically 100% short-term).", "**Pitfall:** Choosing SPY over SPX can result in a <strong class='text-red-600'>significantly higher tax liability</strong> on identical pre-tax gains."]
  ]
};

const table2Data = {
  headers: ["Scenario", "Option Type", "Holding Period", "Tax Treatment", "Relevant Rule"],
  data: [
    ["Buy & Sell a Call for Profit", "Equity/ETF (e.g., SPY)", "Less than 1 year", "<strong class='text-red-600'>100% Short-Term Capital Gain</strong>", "Standard Capital Gains"],
    ["Buy & Sell a Call for Profit", "Index (e.g., SPX)", "Any duration", "<strong class='text-blue-600'>60% Long-Term, 40% Short-Term Gain</strong>", "Section 1256 (60/40 Rule)"],
    ["Sell a Put, Buy to Close for Profit", "Equity/ETF (e.g., SPY)", "Any duration", "<strong class='text-red-600'>100% Short-Term Capital Gain</strong>", "Short Option Rule"],
    ["Sell a Call, Expires Worthless", "Equity/ETF (e.g., SPY)", "Any duration", "<strong class='text-red-600'>100% Short-Term Capital Gain</strong>", "Short Option Rule"],
    ["Assigned on Short Put, Sell Stock Later", "Equity/ETF (e.g., SPY)", "Stock held < 1 year", "Short-Term Gain/Loss on Stock", "Cost Basis Adjustment"],
    ["Hold Open Profitable Position on Dec 31", "Index (e.g., SPX)", "N/A", "Unrealized gain taxed at 60/40 rate", "<strong class='text-red-600'>Mark-to-Market (MTM)</strong>"],
    ["Sell Stock for Loss, Buy Call < 30 Days", "Equity/ETF (e.g., SPY)", "N/A", "<strong class='text-red-600'>Loss on stock is disallowed</strong> and added to the cost basis of the call option.", "<strong class='text-red-600'>Wash Sale Rule</strong>"]
  ]
};

export default function NavigatingMinefieldOptionsTrading() {
  const currentArticle = articles.find(article => article.slug === 'navigating-minefield-options-trading-pitfalls');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title || ''} 
            articleSlug={currentArticle.slug || ''} 
          />
        </>
      )}

      {/* Return to Home Button */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Hero Section with Title */}
      <div className="bg-white relative overflow-hidden border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
          {/* Badges */}
          <div className="relative mb-8">
            {/* Deep Research Badge - Top Left */}
            <div className="absolute top-0 left-0 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10">
              Deep Research
            </div>
            
            {/* Podcast Badge - Top Right */}
            <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10">
              Podcast
            </div>
            
            {/* Options Badge - Bottom Right */}
            <div className="absolute bottom-0 right-0 bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10">
              Options
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Navigating the Minefield
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
            An Analytical Report on the Common Pitfalls of Options Trading
          </p>
        </div>
      </div>

      {/* Hero Infographic - Below Title with Full-Screen Capability */}
      {currentArticle?.imageUrl && (
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src={currentArticle.imageUrl} 
              alt="Options Trading Pitfalls Infographic" 
              className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
            />
            {/* Full-screen button overlay */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsImageViewerOpen(true);
              }}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              title="View full screen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            {/* Click hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
              <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                Click to view full screen
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Full-screen image viewer */}
      {currentArticle?.imageUrl && (
        <FullScreenImageViewer
          src={currentArticle.imageUrl}
          alt="Options Trading Pitfalls Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="bg-gray-50 text-gray-800 font-sans antialiased">
        {/* Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-50 to-blue-100/50 -z-10"></div>

        <main className="max-w-5xl mx-auto px-6 py-16">
          {/* Executive Summary */}
          <div className="mb-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <AlertTriangleIcon className="w-6 h-6 mr-3 text-blue-600" />
              Critical Pitfalls Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Emotional Trading:</strong>
                    <p className="text-gray-700 text-sm">FOMO and loss aversion destroy systematic approaches</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Time Decay (Theta):</strong>
                    <p className="text-gray-700 text-sm">Options lose value daily, accelerating near expiration</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">IV Crush:</strong>
                    <p className="text-gray-700 text-sm">Post-event volatility collapse destroys option premiums</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Assignment Risk:</strong>
                    <p className="text-gray-700 text-sm">ETF options face early assignment, especially around dividends</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Tax Efficiency:</strong>
                    <p className="text-gray-700 text-sm">SPX options offer 60/40 tax treatment vs 100% short-term for SPY</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Liquidity Traps:</strong>
                    <p className="text-gray-700 text-sm">Wide bid-ask spreads create immediate losses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Psychology & Strategy */}
          <SectionCard icon={<BrainCircuitIcon className="w-8 h-8"/>} title="Psychology & Strategy Failures">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Trading Without a Plan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Most failures stem from entering trades without defined entry/exit criteria, stop-losses, or position sizing rules. 
                  This leads to <span className="font-semibold text-red-600">emotional decision-making</span> rather than systematic execution.
                </p>
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                  <p className="text-red-800 text-sm font-medium">
                    <strong>Critical Error:</strong> Chasing momentum without risk management leads to catastrophic losses.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Emotional Biases</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-blue-600">FOMO:</strong> Buying overpriced calls at market peaks
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-blue-600">Loss Aversion:</strong> Holding losers too long, selling winners too early
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-blue-600">Confirmation Bias:</strong> Ignoring contradictory evidence
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Section 2: The Greeks */}
          <SectionCard icon={<ScaleIcon className="w-8 h-8"/>} title="Understanding the Greeks">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-red-600 mr-2" />
                  <h3 className="text-lg font-semibold text-red-800">Theta (Time Decay)</h3>
                </div>
                <p className="text-red-700 text-sm mb-3">
                  Options lose value daily, accelerating exponentially in the final 30-45 days.
                </p>
                <div className="bg-white p-3 rounded border">
                  <p className="text-xs text-gray-600">
                    <strong>Example:</strong> A $2.00 option with 30 days might lose $0.05/day initially, 
                    but $0.15/day in the final week.
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <div className="flex items-center mb-4">
                  <ZapIcon className="w-6 h-6 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-purple-800">Vega (Volatility)</h3>
                </div>
                <p className="text-purple-700 text-sm mb-3">
                  IV crush after earnings can destroy option value even with correct directional calls.
                </p>
                <div className="bg-white p-3 rounded border">
                  <p className="text-xs text-gray-600">
                    <strong>IV Crush:</strong> Stock moves from $100 to $103 (correct), but option falls 
                    from $5.00 to $3.50 due to volatility collapse.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-800">Delta & Gamma</h3>
                </div>
                <p className="text-blue-700 text-sm mb-3">
                  Delta measures price sensitivity; Gamma measures how Delta changes.
                </p>
                <div className="bg-white p-3 rounded border">
                  <p className="text-xs text-gray-600">
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
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <AlertTriangleIcon className="w-5 h-5 text-red-500 mr-2" />
                  Liquidity Traps
                </h3>
                <p className="text-gray-600">
                  Wide bid-ask spreads in illiquid options create immediate losses. A $0.30 spread on a $1.00 option 
                  represents a <span className="font-semibold text-red-600">23% transaction cost</span> you must overcome.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>Check:</strong> Open interest &gt; 100, daily volume &gt; 50 contracts minimum
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <AlertTriangleIcon className="w-5 h-5 text-red-500 mr-2" />
                  Assignment Risk
                </h3>
                <p className="text-gray-600">
                  ETF option sellers face early assignment, especially before ex-dividend dates. 
                  ITM call holders may exercise to capture dividends.
                </p>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Risk:</strong> Unexpected assignment can disrupt strategies and create unwanted stock positions
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Section 4: SPX vs SPY Comparison */}
          <SectionCard icon={<ScaleIcon className="w-8 h-8"/>} title="SPX vs SPY: Critical Differences">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium">
                The choice between SPX (index) and SPY (ETF) options significantly impacts settlement, assignment risk, and tax liability.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <Table headers={table1Data.headers} data={table1Data.data} />
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  SPX Advantages
                </h4>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Cash settlement (no assignment risk)</li>
                  <li>• European style (no early exercise)</li>
                  <li>• 60/40 tax treatment (Section 1256)</li>
                  <li>• Nearly 24/5 trading hours</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  SPY Disadvantages
                </h4>
                <ul className="space-y-2 text-red-700 text-sm">
                  <li>• Physical settlement (assignment risk)</li>
                  <li>• American style (early exercise risk)</li>
                  <li>• 100% short-term capital gains</li>
                  <li>• Limited trading hours</li>
                </ul>
              </div>
            </div>
          </SectionCard>

          {/* Section 5: Tax Implications */}
          <SectionCard icon={<LandmarkIcon className="w-8 h-8"/>} title="Tax Efficiency: Section 1256 Advantage">
            <div className="mb-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Section 1256 Tax Advantage</h3>
                <p className="text-green-700 mb-4">
                  Index options (SPX, RUT, NDX) receive preferential tax treatment: 
                  <span className="font-bold">60% long-term, 40% short-term capital gains</span>
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-red-800 mb-2">SPY (ETF Option)</h4>
                    <p className="text-sm text-gray-600 mb-2">$10,000 gain at 32% tax bracket:</p>
                    <p className="text-lg font-bold text-red-600">Tax: $3,200</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-green-800 mb-2">SPX (Index Option)</h4>
                    <p className="text-sm text-gray-600 mb-2">$10,000 gain with 60/40 treatment:</p>
                    <p className="text-lg font-bold text-green-600">Tax: $2,180 (32% savings!)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Tax Traps to Avoid</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Wash Sale Rule</h4>
                  <p className="text-red-700 text-sm">
                    Buying "substantially identical" securities within 30 days of a loss disallows the deduction.
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Mark-to-Market</h4>
                  <p className="text-yellow-700 text-sm">
                    Section 1256 contracts are marked-to-market on Dec 31st, creating potential tax on unrealized gains.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Table headers={table2Data.headers} data={table2Data.data} />
            </div>
          </SectionCard>

          {/* Conclusion */}
          <section className="mt-16">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Key Success Principles</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Develop a Trading Plan</h3>
                      <p className="text-slate-600 text-sm">Define entry/exit criteria, position sizing, and risk management before trading</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Master the Greeks</h3>
                      <p className="text-slate-600 text-sm">Understand Theta, Vega, Delta, and Gamma before risking capital</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Respect Volatility</h3>
                      <p className="text-slate-600 text-sm">Analyze IV levels and prepare for post-event volatility collapse</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Choose the Right Instrument</h3>
                      <p className="text-slate-600 text-sm">SPX for tax efficiency, SPY only when physical settlement is needed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">5</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Prioritize Liquidity</h3>
                      <p className="text-slate-600 text-sm">Trade options with sufficient open interest and daily volume</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">6</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Optimize for Taxes</h3>
                      <p className="text-slate-600 text-sm">Leverage Section 1256 contracts for significant tax savings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Continue Your Options Education
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Dive deeper into the research and analysis behind this comprehensive options trading guide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {currentArticle?.googleDoc && (
                  <a 
                    href={currentArticle.googleDoc}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    <BookOpenIcon className="inline mr-2" />
                    Read Full Research Paper
                  </a>
                )}
                
                {currentArticle?.podcastUrl && (
                  <a 
                    href={currentArticle.podcastUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    <Music className="inline mr-2" />
                    Listen to Podcast
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center mt-20 pt-10 border-t border-gray-200">
            <p className="text-sm text-gray-400">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
