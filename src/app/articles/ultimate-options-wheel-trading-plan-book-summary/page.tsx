'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Helper components for Icons (using inline SVG for portability)
const IconBookOpen = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-[#A8672E] dark:text-[#D08F52]">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
);

const IconTarget = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-[#A8672E] dark:text-[#D08F52]">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
    </svg>
);

const IconShieldCheck = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-[#A8672E] dark:text-[#D08F52]">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
);

const IconGitCompareArrows = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-[#A8672E] dark:text-[#D08F52]">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="19" r="3"></circle>
        <path d="M14.29 7.71 9.7 12.3a1.94 1.94 0 0 0-2.73 0l-1.27 1.27"></path>
        <path d="m9.71 6.29 4.59 4.59a1.94 1.94 0 0 1 0 2.73l-1.27 1.27"></path>
    </svg>
);

// Component for section headers
const SectionHeader = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="flex items-center mb-6">
        {children}
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight font-serif">{title}</h2>
    </div>
);

// Component for styled tables
const StyledTable = ({ headers, data }: { headers: string[]; data: string[][] }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:bg-[#0A0D14] text-sm">
            <thead className="bg-gray-50">
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="whitespace-nowrap px-4 py-3 font-semibold text-gray-800 text-left">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className={`whitespace-pre-wrap px-4 py-3 ${cell.includes('Pass') || cell.includes('Qualify') ? 'text-[#1D8A70] dark:text-[#3CBF9C] font-medium' :
                                    cell.includes('Fail') || cell.includes('Disqualify') ? 'text-[#BC4128] dark:text-[#E2694A] font-medium' :
                                        'text-gray-700'
                                }`}>
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default function UltimateOptionsWheelTradingPlan() {
    const currentArticle = articles.find(article => article.slug === 'ultimate-options-wheel-trading-plan-book-summary');

    // Data for the tables
    const underlyerTableHeaders = ["Category", "Metric", "Rule / Threshold", "Candidate A", "Candidate B"];
    const underlyerTableData = [
        ["**Fundamental**", "P/E Ratio (Trailing)", "`< 25` or `Below Industry Avg.`", "Pass", "Fail"],
        ["", "Debt-to-Equity", "`< 0.7`", "Pass", "Pass"],
        ["", "5-Yr Revenue Growth", "`> 5% Annually`", "Pass", "Pass"],
        ["**Qualitative**", "Long-Term Hold?", "`Yes / No`", "Yes", "No"],
        ["", "Competitive Moat", "`Strong / Moderate / Weak`", "Strong", "Moderate"],
        ["**Market-Based**", "Stock Avg. Daily Vol", "`> 1 Million Shares`", "Pass", "Pass"],
        ["", "Options Open Interest", "`> 5,000 contracts (near-month)`", "Pass", "Fail"],
        ["", "Bid-Ask Spread", "`< $0.05 (near-the-money)`", "Pass", "Fail"],
        ["", "Dividend Yield", "`> 1.5%`", "Pass", "Pass"],
        ["**Portfolio**", "Position Size", "`< 10% of Portfolio`", "Pass", "Pass"],
        ["**Overall**", "**Final Decision**", "", "**Qualify**", "**Disqualify**"],
    ];

    const writingMatrixHeaders = ["Trader Objective", "IV Rank: Low (< 25)", "IV Rank: Medium (25-50)", "IV Rank: High (> 50)"];
    const writingMatrixData = [
        ["**Conservative Income**\n(Avoid Assignment)", "Consider another strategy or wait for higher IV. Premiums are likely too low for the risk.", "Sell Put: 45 DTE, ~0.20 Delta\nSell Call: 45 DTE, ~0.20 Delta", "Sell Put: 45 DTE, ~0.20 Delta\nSell Call: 45 DTE, ~0.20 Delta"],
        ["**Balanced Approach**\n(Good Income, Willing to Wheel)", "Sell Put: 30-45 DTE, ~0.30 Delta\nSell Call: 30-45 DTE, ~0.30 Delta", "**Sell Put: 30-45 DTE, ~0.30 Delta**\n**Sell Call: 30-45 DTE, ~0.30 Delta**", "Sell Put: 30-45 DTE, ~0.30 Delta\nSell Call: 30-45 DTE, ~0.25 Delta\n(Collect high premium but give more room for upside)"],
        ["**Aggressive Acquisition / Exit**\n(Maximize Premium, High Chance of Assignment)", "Sell Put: 30 DTE, ~0.40 Delta\nSell Call: 30 DTE, ~0.40 Delta", "Sell Put: 30 DTE, ~0.40 Delta\nSell Call: 30 DTE, ~0.40 Delta", "Sell Put: 30 DTE, ~0.40 Delta\nSell Call: 30 DTE, ~0.35 Delta\n(Capture very high premium while still allowing some upside)"],
    ];

    const comparisonMatrixHeaders = ["Attribute", "Wheel Strategy", "Buy-and-Hold", "Dividend Investing", "Credit Spread"];
    const comparisonMatrixData = [
        ["**Core Goal**", "Acquire quality stock at a discount & generate income", "Long-term capital appreciation", "Generate passive income from dividends", "Generate income from options premium with no desire to own stock"],
        ["**Capital Requirement**", "Very High (cash-secured)", "High (cost of shares)", "High (cost of shares)", "Low (defined by spread width)"],
        ["**Max Risk**", "Substantial (stock price to zero, less premium)", "Substantial (stock price to zero)", "Substantial (stock price to zero)", "Defined & Limited"],
        ["**Max Profit**", "Capped by covered call strike", "Unlimited", "Unlimited (plus dividends)", "Limited to premium received"],
        ["**Ideal Market**", "Neutral to Mildly Bullish", "Bullish", "Any (focus on company health)", "Neutral to Directional (depending on spread type)"],
        ["**Activity Level**", "Active", "Passive", "Passive", "Active"],
        ["**Key Advantage**", "Income generation in multiple stages, cost basis reduction", "Simplicity, captures full upside", "Predictable income stream", "High capital efficiency, defined risk"],
        ["**Key Disadvantage**", "Capped upside, \"bag-holding\" risk", "No downside protection", "Dividend cuts, lower yield", "Limited profit, unfavorable risk/reward ratio"],
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

            <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Return to Home Button */}
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-[#A8672E] dark:bg-[#D08F52] transition-colors duration-200 text-white font-medium">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Return to Home
                        </Link>
                    </div>

                    {/* Badges */}
                    <div className="relative mb-8">
                        {/* Deep Research Badge - Top Left */}
                        <div className="absolute top-0 left-0 z-10">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                                Deep Research
                            </span>
                        </div>

                        {/* Podcast Badge - Top Right */}
                        <div className="absolute top-0 right-0 z-10">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                <Music className="w-3 h-3 mr-1" />
                                Podcast
                            </span>
                        </div>

                        {/* Options Badge - Bottom Right */}
                        <div className="absolute bottom-0 right-0 z-10">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                                Options
                            </span>
                        </div>
                    </div>

                    {/* Header */}
                    

                    {/* Main Content */}
                    <main className="space-y-16">
                        {/* Section 1: Strategic Rationale */}
                        <section id="rationale" className="p-8 bg-white dark:bg-[#0A0D14] rounded-xl border border-gray-200 shadow-md">
                            <SectionHeader title="The Strategic Rationale of the Wheel">
                                <IconBookOpen />
                            </SectionHeader>

                            <div className="space-y-8 prose prose-lg max-w-none prose-p:text-gray-600 prose-h3:text-gray-900 prose-h3:text-2xl prose-strong:text-[#A8672E] dark:text-[#D08F52]">
                                <p>
                                    The Options Wheel Strategy is a systematic, cyclical process for generating income and potentially acquiring high-quality stocks.
                                    It's not a single trade, but a continuous loop designed to harness option premiums and time decay. It is fundamentally a
                                    <strong> stock acquisition strategy</strong>, not speculative trading. The premium is compensation for your commitment to buy
                                    a quality asset at a price you deem attractive.
                                </p>

                                <h3>Deconstructing the Wheel: A Cyclical Income Engine</h3>
                                <p>The Wheel rotates between two primary strategies in a clear sequence:</p>
                                <ol className="list-decimal list-inside space-y-3 pl-2">
                                    <li>
                                        <strong>Initiation via Cash-Secured Puts:</strong> The cycle begins by selling a cash-secured put on a stock you want to own
                                        at a lower price. You collect premium while you wait for the price to drop to your desired entry point.
                                    </li>
                                    <li>
                                        <strong>Transition to Covered Calls:</strong> If assigned the shares, you now own the stock. The strategy immediately
                                        transitions to selling covered calls against these shares to generate more income.
                                    </li>
                                    <li>
                                        <strong>Completion and Restart:</strong> If the shares are called away via the covered call, the cycle is complete.
                                        You keep the proceeds, and the process restarts by selling another cash-secured put.
                                    </li>
                                </ol>

                                <h3>The Financial Logic: Cost Basis Reduction & "Synthetic Dividend"</h3>
                                <p>
                                    Premiums collected systematically reduce your effective purchase price (cost basis). A $50 strike put with a $2 premium
                                    results in a <strong>$48 cost basis</strong> if assigned ($50 strike - $2 premium). Subsequent call premiums further reduce
                                    this cost, creating a protective buffer and enhancing total return.
                                </p>
                                <p>
                                    For stable stocks, this consistent income stream can be viewed as a <strong>"synthetic dividend"</strong>. You create your
                                    own cash flow, which enhances returns even when the stock price is stagnant, much like a real dividend.
                                </p>

                                <h3>Market Conditions: The Sweet Spot</h3>
                                <p>
                                    The Wheel performs optimally in <strong>neutral, sideways, or mildly bullish markets</strong>. In these conditions, you can
                                    repeatedly collect premiums as options expire worthless. In strongly bullish markets, it underperforms buy-and-hold due to
                                    the capped upside. In strongly bearish markets, it will incur losses, though the premiums provide a small cushion.
                                </p>
                            </div>
                        </section>

                        {/* Section 2: Trading Plan */}
                        <section id="plan" className="p-8 bg-white dark:bg-[#0A0D14] rounded-xl border border-gray-200 shadow-md">
                            <SectionHeader title="The Ultimate Trading Plan: Implementation Protocol">
                                <IconTarget />
                            </SectionHeader>

                            <div className="space-y-8 prose prose-lg max-w-none prose-p:text-gray-600 prose-h3:text-gray-900 prose-h3:text-2xl prose-strong:text-[#A8672E] dark:text-[#D08F52]">
                                <h3>Underlyer Selection Protocol</h3>
                                <p>
                                    This is the most critical step. The success of the Wheel is determined by the quality of the underlying asset. The goal is
                                    to identify stable, financially sound businesses you are willing to own long-term. Your selection should pass a multi-stage filter.
                                </p>
                                <ul className="list-disc list-inside space-y-2 pl-2">
                                    <li>
                                        <strong>Quantitative Screen:</strong> Analyze fundamentals like P/E ratio, debt levels, and revenue growth to ensure financial health.
                                    </li>
                                    <li>
                                        <strong>Qualitative Assessment:</strong> Evaluate the company's competitive moat and answer the key question:
                                        "Am I truly willing to own this stock long-term?"
                                    </li>
                                    <li>
                                        <strong>Market-Based Criteria:</strong> Ensure high liquidity (stock and options volume) and moderate implied volatility.
                                        High liquidity is non-negotiable for good trade execution.
                                    </li>
                                </ul>

                                <StyledTable headers={underlyerTableHeaders} data={underlyerTableData} />

                                <h3 className="pt-8 font-serif">Option Writing Protocol</h3>
                                <p>
                                    Option selection should be rules-based, balancing income, risk, and probability of assignment. Key variables are Days to
                                    Expiration (DTE), Delta, and Implied Volatility (IV).
                                </p>
                                <ul className="list-disc list-inside space-y-2 pl-2">
                                    <li>
                                        <strong>Expiration (DTE):</strong> The sweet spot is <strong>30-45 days</strong>. This captures accelerated time decay (theta)
                                        while providing enough time to manage the position, avoiding the high gamma risk of weekly options.
                                    </li>
                                    <li>
                                        <strong>Put Strike (Delta):</strong> A <strong>-0.30 Delta</strong> put offers a balanced approach (approx. 70% probability
                                        of expiring worthless). This standardizes strike selection based on probabilities.
                                    </li>
                                    <li>
                                        <strong>Call Strike (Delta):</strong> A <strong>0.20 to 0.40 Delta</strong> call, sold above your cost basis, balances
                                        income vs. capital appreciation. A higher delta prioritizes income; a lower delta prioritizes potential stock growth.
                                    </li>
                                </ul>

                                <StyledTable headers={writingMatrixHeaders} data={writingMatrixData} />
                            </div>
                        </section>

                        {/* Section 3: Risk Management */}
                        <section id="risk" className="p-8 bg-white dark:bg-[#0A0D14] rounded-xl border border-gray-200 shadow-md">
                            <SectionHeader title="Advanced Risk Management & Adjustments">
                                <IconShieldCheck />
                            </SectionHeader>

                            <div className="space-y-8 prose prose-lg max-w-none prose-p:text-gray-600 prose-h3:text-gray-900 prose-h3:text-2xl prose-strong:text-[#A8672E] dark:text-[#D08F52]">
                                <h3>Primary Risk Exposures</h3>
                                <p>
                                    <strong>"Bag-Holding" Risk:</strong> The biggest risk is being assigned a stock that continues to decline significantly.
                                    This highlights why selecting a high-quality company you believe in is paramount. If the thesis is sound, you are simply
                                    a long-term investor holding a quality asset at a temporary discount.
                                </p>
                                <p>
                                    <strong>Opportunity Cost:</strong> The covered call caps your upside. In a massive rally, you will miss out on gains above
                                    your strike price. This is the explicit trade-off for consistent income generation.
                                </p>

                                <h3>The Art of Rolling: A Tactical Guide</h3>
                                <p>
                                    Rolling is the primary management technique. The goal is to always roll for a <strong>net credit</strong>, which improves
                                    your position. If you can no longer collect a credit, it's often better to accept assignment and transition to the next
                                    phase of the wheel.
                                </p>
                                <ul className="list-disc list-inside space-y-3 pl-2">
                                    <li>
                                        <strong>Rolling Puts (Down and Out):</strong> When a put is challenged, you can simultaneously buy it back and sell a new
                                        put with a <strong>lower strike price</strong> and a <strong>later expiration date</strong>. This maneuver collects more
                                        premium (reducing your cost basis) and gives the trade more time to work out.
                                    </li>
                                    <li>
                                        <strong>Rolling Calls (Up and Out):</strong> If you want to avoid being called away in an uptrend, you can roll your call
                                        to a <strong>higher strike price</strong> and a <strong>later expiration</strong>. This allows you to participate in more
                                        of the stock's upside while still collecting premium.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 4: Comparative Analysis */}
                        <section id="comparison" className="p-8 bg-white dark:bg-[#0A0D14] rounded-xl border border-gray-200 shadow-md">
                            <SectionHeader title="Comparative Strategic Analysis">
                                <IconGitCompareArrows />
                            </SectionHeader>

                            <div className="space-y-8 prose prose-lg max-w-none prose-p:text-gray-600 prose-h3:text-gray-900 prose-h3:text-2xl prose-strong:text-[#A8672E] dark:text-[#D08F52]">
                                <p>
                                    To fully appreciate the Wheel's utility, it's essential to see how it stacks up against other common investment strategies.
                                    The right choice depends on your specific goals, risk tolerance, capital, and desired level of active involvement.
                                </p>

                                <StyledTable headers={comparisonMatrixHeaders} data={comparisonMatrixData} />
                            </div>
                        </section>

                        {/* Call-to-Action Section */}
                        <section className="text-center py-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white">
                            <h2 className="text-3xl font-bold mb-4 font-serif">Ready to Master the Options Wheel?</h2>
                            <p className="text-xl mb-8 max-w-2xl mx-auto">
                                Dive deeper into the quantitative frameworks and systematic approaches covered in this comprehensive analysis.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                {currentArticle?.googleDoc && (
                                    <a
                                        href={currentArticle.googleDoc}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-white dark:bg-[#0A0D14] text-[#A8672E] dark:text-[#D08F52] font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                                    >
                                        <BookOpen className="inline mr-2" />
                                        Read Full Research
                                    </a>
                                )}

                                {currentArticle?.podcastUrl && (
                                    <a
                                        href={currentArticle.podcastUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-[#1D8A70] dark:bg-[#3CBF9C] text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-[#1D8A70] dark:bg-[#3CBF9C] transition-colors duration-300 transform hover:scale-105"
                                    >
                                        <Music className="inline mr-2" />
                                        Listen to Podcast
                                    </a>
                                )}
                            </div>
                        </section>

                        {/* Conclusion */}
                        <section id="conclusion" className="text-center mt-16 py-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">A Marathon, Not a Sprint</h2>
                            <p className="max-w-3xl mx-auto text-lg text-gray-600">
                                The Options Wheel is a powerful method for long-term portfolio enhancement, blending value investing with active income generation.
                                By following a disciplined, systematic plan based on quality underlyers, rules-based execution, and active risk management, you can
                                transform this strategy into a core component of a sophisticated investment portfolio.
                            </p>
                        </section>
                    </main>

                    {/* Footer */}
                    <footer className="text-center mt-12 pt-8 border-t border-gray-200">
                        <p className="text-gray-500 text-sm">
                            © 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
}
