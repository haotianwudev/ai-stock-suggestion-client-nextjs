'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { Shield, TrendingUp, BookOpen, AlertTriangle, FileText, ChevronsRight, XCircle } from 'lucide-react';

// Helper component for section titles
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
    <ChevronsRight className="w-6 h-6 mr-3 text-blue-500" />
    {children}
  </h2>
);

// Helper component for subsections
const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{title}</h3>
    <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
      {children}
    </div>
  </div>
);

// Helper for info cards
const InfoCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 h-full">
    <div className="flex items-center mb-4">
      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
        {icon}
      </div>
      <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h4>
    </div>
    <p className="text-gray-600 dark:text-gray-400">{children}</p>
  </div>
);

// Helper for Tax Trap cards
const TaxTrapCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg">
        <div className="flex">
            <div className="flex-shrink-0">
                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 mr-4" />
            </div>
            <div>
                <h4 className="text-lg font-bold text-red-800 dark:text-red-200">{title}</h4>
                <p className="mt-2 text-red-700 dark:text-red-300">{children}</p>
            </div>
        </div>
    </div>
);

// Tax Rate Table Component
const TaxTable = ({ data, caption }: { data: any[]; caption: string }) => (
    <div className="overflow-x-auto my-8">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
            <caption className="caption-bottom text-sm text-gray-500 dark:text-gray-400 mt-2 px-4 text-left">{caption}</caption>
            <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Filing Status</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Taxable Income</th>
                    <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Short-Term Capital Gains Rate</th>
                    <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Long-Term Capital Gains Rate</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {data.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">{row.status}</td>
                        <td className="py-4 px-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{row.income}</td>
                        <td className="py-4 px-4 text-center text-gray-700 dark:text-gray-300">{row.shortTerm}</td>
                        <td className="py-4 px-4 text-center text-green-600 dark:text-green-400 font-semibold">{row.longTerm}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// Comparison Table Component
const ComparisonTable = ({ data, caption }: { data: any[]; caption: string }) => (
    <div className="overflow-x-auto my-8">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
             <caption className="caption-bottom text-sm text-gray-500 dark:text-gray-400 mt-2 px-4 text-left">{caption}</caption>
            <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Category</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">ETF Option (e.g., SPY)</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Index Option (e.g., SPX)</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {data.map((row, index) => (
                    <tr key={index} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${row.isHighlight ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
                        <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">{row.category}</td>
                        <td className="py-4 px-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{row.etf}</td>
                        <td className="py-4 px-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{row.index}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// Covered Call Table
const CoveredCallTable = ({ data, caption }: { data: any[]; caption: string }) => (
    <div className="overflow-x-auto my-8">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
             <caption className="caption-bottom text-sm text-gray-500 dark:text-gray-400 mt-2 px-4 text-left">{caption}</caption>
            <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Call Type</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Call Moneyness</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Impact on Short-Term Stock Holding Period</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Strategic Implication</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {data.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">{row.type}</td>
                        <td className="py-4 px-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{row.moneyness}</td>
                        <td className="py-4 px-4 whitespace-nowrap text-red-600 dark:text-red-400 font-semibold">{row.impact}</td>
                        <td className="py-4 px-4 text-gray-700 dark:text-gray-300">{row.implication}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default function TaxEfficientOptionWritingPage() {
    const currentArticle = articles.find(article => article.slug === 'tax-efficient-option-writing-comprehensive-guide');

    const taxRates2024 = [
        { status: 'Single', income: 'Up to $47,025', shortTerm: '10% - 12%', longTerm: '0%' },
        { status: 'Single', income: '$47,026 to $100,525', shortTerm: '22%', longTerm: '15%' },
        { status: 'Single', income: '$100,526 to $191,950', shortTerm: '24%', longTerm: '15%' },
        { status: 'Single', income: '$191,951 to $243,725', shortTerm: '32%', longTerm: '15%' },
        { status: 'Single', income: '$243,726 to $518,900', shortTerm: '35%', longTerm: '15%' },
        { status: 'Single', income: 'Over $518,900', shortTerm: '37%', longTerm: '20%' },
        { status: 'Married Filing Jointly', income: 'Up to $94,050', shortTerm: '10% - 12%', longTerm: '0%' },
        { status: 'Married Filing Jointly', income: '$94,051 to $201,050', shortTerm: '22%', longTerm: '15%' },
        { status: 'Married Filing Jointly', income: '$201,051 to $383,900', shortTerm: '24%', longTerm: '15%' },
        { status: 'Married Filing Jointly', income: '$383,901 to $487,450', shortTerm: '32%', longTerm: '15%' },
        { status: 'Married Filing Jointly', income: '$487,451 to $583,750', shortTerm: '35%', longTerm: '15%' },
        { status: 'Married Filing Jointly', income: 'Over $583,750', shortTerm: '37%', longTerm: '20%' },
    ];

    const comparisonData = [
        { category: 'Hypothetical Profit', etf: '$15,000', index: '$15,000' },
        { category: 'Assumed Tax Bracket', etf: '35% Short-Term / 20% Long-Term', index: '35% Short-Term / 20% Long-Term' },
        { category: 'Tax Treatment', etf: '100% Short-Term Capital Gain', index: '60% Long-Term / 40% Short-Term' },
        { category: 'Tax Calculation', etf: '$15,000 × 35%', index: '($6,000 × 35%) + ($9,000 × 20%) = $2,100 + $1,800' },
        { category: 'Total Federal Tax', etf: '$5,250', index: '$3,900' },
        { category: 'After-Tax Profit', etf: '$9,750', index: '$11,100' },
        { category: 'Tax Savings', etf: '', index: '$1,350', isHighlight: true },
    ];

    const coveredCallData = [
        { type: 'Qualified', moneyness: 'Out-of-the-Money (OTM) or At-the-Money (ATM)', impact: 'Unaffected', implication: 'Safest strategy for preserving the path to long-term status.' },
        { type: 'Qualified', moneyness: 'In-the-Money (ITM)', impact: 'Paused', implication: 'Halts progress toward long-term status for the duration of the short call.' },
        { type: 'Non-Qualified', moneyness: 'Any (ITM or OTM)', impact: 'Reset to Zero', implication: 'Erases all accumulated holding period; the one-year clock restarts.' },
    ];

    return (
        <>
            {/* SEO Components - MANDATORY */}
            {currentArticle && (
                <>
                    <StructuredData article={currentArticle} />
                    <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
                </>
            )}
            
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
                <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Return to Home Button */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Return to Home
                        </Link>
                    </div>

                    <header className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                            A Comprehensive Guide to Tax-Efficient Option Writing
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Strategies for the Sophisticated Investor
                        </p>
                    </header>

                    <div className="space-y-16">
                        {/* Introduction Section */}
                        <section>
                            <SubSection title="The Option Writer's Tax Dilemma">
                                <p>For the active investor, writing options can be a powerful tool for generating income, hedging positions, and expressing nuanced market views. However, these strategies carry a significant and often underestimated tax burden. The U.S. tax code, by its design, creates a substantial headwind for option writers operating in standard taxable brokerage accounts. The very nature of most option writing strategies—collecting premium on contracts with relatively short lifespans—means that resulting profits are almost invariably classified as short-term capital gains. These gains are taxed at ordinary income tax rates, which can be nearly double the preferential rates applied to long-term capital gains. This report serves as a comprehensive strategic roadmap for the sophisticated option writer to navigate and mitigate this inherent tax inefficiency.</p>
                            </SubSection>
                            <SubSection title="A Hierarchy of Tax Efficiency">
                                 <p>Achieving tax efficiency in option writing is not a single action but a multi-layered strategy. This analysis will present a clear hierarchy of tactics, beginning with the most impactful and progressing to more complex and situational approaches. The framework starts with foundational product selection, which can fundamentally alter the tax character of every trade. It then moves to the defensive necessity of understanding and navigating the intricate and often punitive rules governing equity options, such as the straddle and wash sale rules. Finally, it synthesizes these concepts into proactive tax management techniques, including tax-loss harvesting and advanced status elections. By understanding this hierarchy, an investor can systematically enhance the after-tax returns of their option writing activities.</p>
                            </SubSection>
                             <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-6 rounded-r-lg mt-8">
                                <div className="flex">
                                    <div className="py-1"><AlertTriangle className="h-6 w-6 text-yellow-500 dark:text-yellow-400 mr-4" /></div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Disclaimer</h4>
                                        <p className="text-yellow-700 dark:text-yellow-300 mt-2">The information contained in this report is for educational and informational purposes only and should not be construed as tax or investment advice. The tax laws and regulations concerning options and other derivatives are exceptionally complex, subject to change, and dependent on an individual's specific circumstances. The Internal Revenue Service (IRS) has the final authority on the interpretation of the U.S. Tax Code. It is imperative to consult with a qualified tax professional or financial advisor to understand the tax consequences of any investment strategy before implementation.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section I */}
                        <section>
                            <SectionTitle>The Default Tax Landscape for Option Writers</SectionTitle>
                            <SubSection title="The Primacy of Short-Term Capital Gains for Written Options">
                                <p>The fundamental tax challenge for an option writer stems from a simple, unyielding rule: when a writer closes a short option position for a profit or allows the option to expire worthless, the gain is almost always treated as a short-term capital gain. This classification holds true regardless of how long the option contract was held open. A written option held for eleven months that expires worthless generates a short-term gain, just as one held for eleven days does.</p>
                                <p>The rationale behind this treatment is that the IRS views the premium received from writing an option as income derived from a short-term obligation that is settled upon closing or expiration. This disparity underscores why proactive tax management is not merely beneficial but essential for a profitable option writing practice.</p>
                            </SubSection>
                            <SubSection title="Tax Treatment Upon Expiration, Closing, and Assignment">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <InfoCard icon={<FileText className="w-6 h-6 text-blue-500"/>} title="Expiration">When a written option expires worthless, the entire premium collected is recognized as a short-term capital gain on the date of expiration.</InfoCard>
                                    <InfoCard icon={<FileText className="w-6 h-6 text-blue-500"/>} title="Closing Transaction">If a writer buys-to-close their position, the difference between the premium received and the premium paid is a short-term capital gain or loss.</InfoCard>
                                    <InfoCard icon={<FileText className="w-6 h-6 text-blue-500"/>} title="Assignment">Assignment is the exception. For a short call, the premium is added to the stock's sale proceeds, and the holding period of the stock determines the gain's character. For a short put, the premium reduces the cost basis of the acquired stock, with no immediate taxable event.</InfoCard>
                                </div>
                            </SubSection>
                            <SubSection title="Comparative Analysis: 2024 Short-Term vs. Long-Term Capital Gains Rates">
                                 <p>The strategic importance of navigating these rules is driven entirely by the significant difference in tax rates. Short-term capital gains are taxed as ordinary income, subjecting them to the same progressive brackets as wages and salary. Long-term gains benefit from separate, lower tax brackets. The table below illustrates the stark contrast for the 2024 tax year.</p>
                                 <TaxTable data={taxRates2024} caption="Source: Data compiled from IRS publications. Rates do not include the 3.8% Net Investment Income Tax (NIIT) that may apply to higher-income investors." />
                            </SubSection>
                        </section>

                        {/* Section II */}
                        <section>
                            <SectionTitle>The Section 1256 Advantage: The Premier Strategy</SectionTitle>
                            <SubSection title="Defining Section 1256 Contracts: Beyond Standard Equities">
                                <p>Section 1256 of the tax code designates a special class of financial instruments that receive unique and highly favorable tax treatment. For an option writer, the most important category is <strong>non-equity options</strong>, which includes options on broad-based stock market indexes. The critical distinction is that options on major indexes themselves—such as the S&P 500 Index (SPX), the Nasdaq 100 Index (NDX), and the Russell 2000 Index (RUT)—are classified as Section 1256 contracts. Conversely, options on the extremely popular ETFs that track these same indexes—such as SPY, QQQ, and IWM—do <strong>not</strong> qualify.</p>
                            </SubSection>
                            <SubSection title="The 60/40 Rule: A Powerful Blended Rate">
                                <p>The cornerstone of the Section 1256 advantage is the "60/40 rule." This rule mandates that all capital gains and losses on these contracts, regardless of holding period, are automatically treated as <strong>60% long-term and 40% short-term</strong>. This creates a "blended" tax rate that is significantly lower than the rate for pure short-term gains. For an investor in the highest federal tax bracket (37% short-term, 20% long-term), the maximum tax rate on a Section 1256 gain is just 26.8%.</p>
                                <ComparisonTable data={comparisonData} caption="This hypothetical example illustrates the powerful tax savings from choosing an index option over an ETF option." />
                            </SubSection>
                             <SubSection title="Mark-to-Market (MTM) Accounting & Strategic Advantages">
                                 <p>Section 1256 contracts operate under a mark-to-market system, where open positions are treated as sold at their fair market value on the last business day of the tax year. While this means paying tax on unrealized gains, it provides enormous benefits for active traders:</p>
                                 <ul className="list-disc list-inside space-y-3 mt-4 pl-4 text-gray-600 dark:text-gray-300">
                                    <li><strong>Wash Sale Exemption:</strong> The complex wash sale rule (IRC §1091) does not apply to Section 1256 contracts. This allows for unrestricted loss harvesting and immediate repositioning without fear of the loss being disallowed.</li>
                                    <li><strong>Straddle Rule Exemption:</strong> The punitive straddle loss deferral rules (IRC §1092) are inapplicable to straddles composed entirely of Section 1256 contracts, simplifying strategies like iron condors.</li>
                                    <li><strong>Loss Carryback Provision:</strong> Net losses from Section 1256 contracts can be carried back up to three preceding tax years to offset prior Section 1256 gains, potentially resulting in an immediate tax refund—a benefit unavailable for standard securities.</li>
                                 </ul>
                            </SubSection>
                        </section>

                        {/* Section III */}
                        <section>
                            <SectionTitle>Navigating the Minefield: Straddles, Covered Calls, and Wash Sales</SectionTitle>
                            <SubSection title="The Straddle Rules (IRC §1092): Preventing Artificial Loss Recognition">
                                 <p>A straddle is any set of offsetting positions where one substantially diminishes the risk of the other. The IRS loss deferral rule prevents closing the losing leg of a straddle (e.g., in an SPY iron condor) to generate a tax loss while holding the profitable leg into the next year. The loss is deferred until the offsetting gain is also recognized, neutralizing the intended tax benefit.</p>
                            </SubSection>
                            <SubSection title="The Qualified Covered Call (QCC) Exception: A Safe Harbor with Nuances">
                                 <p>A Qualified Covered Call (QCC) provides a safe harbor from the straddle rules but introduces critical complexities regarding the holding period of the underlying stock. To be "qualified," a call must have more than 30 days to expiration and not be "deep-in-the-money." Writing non-qualified calls or even in-the-money qualified calls can pause or completely reset the holding period clock required to achieve long-term capital gains on the stock, turning a simple income strategy into an active holding period management decision.</p>
                                 <CoveredCallTable data={coveredCallData} caption={'This table outlines how writing covered calls on stock held one year or less ("Short-Term Stock") can impact its holding period.'}/>
                            </SubSection>
                            <SubSection title="The Wash Sale Rule (IRC §1091): A Trap for the Unwary">
                                 <p>The wash sale rule disallows a loss on a security if a "substantially identical" one is acquired within a 61-day window. The IRS has not precisely defined "substantially identical" for options, creating ambiguity. While brokers typically do not flag rolling to a different strike or expiration as a wash sale (as they have different CUSIPs), the IRS could theoretically challenge this. The more an option behaves like the underlying security it replaces, the higher the audit risk, requiring traders to self-police their activities.</p>
                            </SubSection>
                        </section>
                        
                        {/* Section IV */}
                        <section>
                             <SectionTitle>Advanced Tax-Planning and Strategic Synthesis</SectionTitle>
                             <SubSection title="Strategic Tax-Loss Harvesting (TLH)">
                                <p>Tax-loss harvesting is the practice of selling investments at a loss to offset capital gains. For an option writer, this is a potent tool, as short-term losses can directly offset high-tax short-term gains. However, effective TLH with equity options requires careful navigation of the wash sale and straddle rules. Section 1256 contracts, being exempt from these rules, are far superior for frictionless loss harvesting, providing maximum flexibility.</p>
                             </SubSection>
                             <SubSection title="Trader Tax Status (TTS) and the Section 475 MTM Election">
                                <p>For highly active, professional-level traders, qualifying for Trader Tax Status (TTS) and making a Section 475 mark-to-market election is an aggressive strategy. This converts capital gains and losses to ordinary income/loss, removing the $3,000 capital loss limitation. However, it also forfeits the favorable 60/40 treatment of Section 1256 contracts unless a complex "mixed" election is made. This is a highly complex maneuver that requires expert tax guidance.</p>
                             </SubSection>
                             <SubSection title="Record-Keeping and Reporting: Best Practices">
                                 <p>Accurate tax reporting is the final, critical step. The burden of proof rests with the taxpayer, making meticulous record-keeping essential.</p>
                                 <ul className="list-disc list-inside space-y-3 mt-4 pl-4 text-gray-600 dark:text-gray-300">
                                     <li><strong>Form 8949:</strong> Used for reporting trades in stocks, ETFs, and their options. Adjustments for wash sales must be correctly coded here.</li>
                                     <li><strong>Form 6781:</strong> Used exclusively for Section 1256 contracts. This form greatly simplifies reporting by automatically applying the 60/40 split to the aggregate net gain or loss.</li>
                                     <li><strong>Best Practice:</strong> Maintain a personal, independent trading ledger to verify broker-provided 1099-B forms and ensure accurate calculations, especially for adjustments related to wash sales, straddles, or assignments.</li>
                                 </ul>
                             </SubSection>
                        </section>

                        {/* NEW SECTION: Key Tax Traps to Avoid */}
                        <section>
                            <SectionTitle>Key Tax Traps to Avoid</SectionTitle>
                            <div className="space-y-6">
                                <TaxTrapCard title="Don't Mistake ETF Options for Index Options">
                                    This is the most common and costly error. Trading options on SPY, QQQ, or IWM results in 100% short-term capital gains. Trading the equivalent Section 1256 index options (SPX, NDX, RUT) provides the superior 60/40 blended tax rate and exemption from wash sale/straddle rules.
                                </TaxTrapCard>
                                <TaxTrapCard title="Don't Write Weekly Calls on Long-Term Stock Prospects">
                                    Writing a non-qualified covered call (like a weekly with under 30 days to expiration) on stock you've held for less than a year will reset its holding period to zero. This single action can erase months of progress toward achieving favorable long-term capital gains status on the stock.
                                </TaxTrapCard>
                                <TaxTrapCard title="Don't Try to Game the Straddle Rule">
                                    Avoid closing only the losing leg of a spread (like an iron condor) to harvest a tax loss while leaving the winning side open into the next year. The IRS will defer the loss until the gain is also recognized, completely neutralizing the intended tax benefit for the current year.
                                </TaxTrapCard>
                                 <TaxTrapCard title="Don't Carelessly Trigger Wash Sales">
                                    After closing a position for a loss, avoid immediately opening a new one that is "substantially identical." While rolling options is common, be mindful that the IRS has broad discretion. A disallowed loss adds to the cost basis of the new position, deferring the tax benefit you hoped to realize.
                                </TaxTrapCard>
                                 <TaxTrapCard title="Don't Blindly Trust Your Broker's 1099-B">
                                    Your broker's tax form is a helpful guide, but it may not be perfect. It won't track wash sales across your and a spouse's accounts, and complex adjustments for straddles or assignments can be miscalculated. The final responsibility for accuracy lies with you. Keep your own records.
                                </TaxTrapCard>
                            </div>
                        </section>

                        {/* Conclusion */}
                        <section className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-700">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Conclusion & Key Recommendations</h2>
                            <div className="space-y-8">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
                                    <h3 className="font-bold text-xl text-blue-800 dark:text-blue-200 mb-2">The Prime Directive: Choose Your Product Wisely</h3>
                                    <p className="text-blue-700 dark:text-blue-300">The single most powerful strategy is to favor trading Section 1256 contracts (e.g., options on SPX, NDX) over their ETF counterparts (SPY, QQQ). This accesses the favorable 60/40 blended tax rate and provides exemption from the wash sale and straddle rules, simplifying tax management and maximizing after-tax returns.</p>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
                                    <h3 className="font-bold text-xl text-red-800 dark:text-red-200 mb-2">Master the Rules of Engagement for Equity Options</h3>
                                    <p className="text-red-700 dark:text-red-300">When trading equity options, defensively master the straddle, qualified covered call (QCC), and wash sale rules. Understand that writing a non-qualified call (e.g., a weekly) on short-term stock resets its holding period to zero, jeopardizing long-term capital gains status. Avoid closing only the losing leg of a spread to prevent loss deferrals.</p>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
                                    <h3 className="font-bold text-xl text-green-800 dark:text-green-200 mb-2">Be a Proactive Tax Manager</h3>
                                    <p className="text-green-700 dark:text-green-300">Integrate tax-loss harvesting into your routine, prioritizing the offset of high-tax short-term gains. Maintain meticulous, independent records to verify broker reports and ensure accurate tax filing. Partnering with a qualified tax advisor with expertise in securities is the ultimate strategy for compliance and optimization.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
                
                {/* Footer */}
                <footer className="text-center py-8 mt-12 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">© 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.</p>
                </footer>
            </div>
        </>
    );
} 
