'use client';

import { ArrowRight, ChevronDown, ChevronUp, TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { ArticleFrame } from '@/components/articles/article-frame';

// Helper component for section titles
const SectionTitle = ({ children }) => (
    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-l-4 border-[#A8672E] dark:border-[#D08F52] pl-4 font-serif">{children}</h2>
);

// Helper component for subsection titles
const SubTitle = ({ children }) => (
    <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mt-8 mb-4 font-serif">{children}</h3>
);

// Helper component for paragraphs
const P = ({ children }) => <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{children}</p>;

// Helper component for list items
const ListItem = ({ children }) => <li className="mb-2 flex items-start"><ArrowRight className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1.5 flex-shrink-0" /><span>{children}</span></li>;

// Card component for visual separation
const Card = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 md:p-8 mb-8 border border-gray-200 dark:border-gray-700 ${className}`}>
        {children}
    </div>
);

// Accordion component for collapsible sections
const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 font-semibold text-left text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <span>{title}</span>
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {isOpen && (
                <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                    {children}
                </div>
            )}
        </div>
    );
};

// --- Section Components ---
const ExecutiveSummary = () => (
    <Card>
        <SectionTitle>1.0 Executive Summary</SectionTitle>
        <P>This report provides a comprehensive comparative analysis of two distinct options trading strategies: the covered call and the diagonal spread. The fundamental difference lies in their core objectives and structural underpinnings.</P>
        <P>The covered call is primarily an income-generation and yield-enhancement strategy applied to an existing long stock position. It involves trading away potential upside appreciation for a fixed, upfront premium.</P>
        <P>In contrast, the diagonal spread is a versatile, multi-leg options strategy used to construct a capital-efficient position based on a directional or volatility-based market forecast. A key bridge is the &ldquo;Poor Man&apos;s Covered Call&rdquo; (PMCC), a diagonal spread that synthetically replicates a covered call with significantly lower capital.</P>
        <P>Key distinctions emerge in capital efficiency, risk profiles (defined vs. stock risk), and their opposing reactions to implied volatility (Vega). While both benefit from time decay (Theta), they do so through different mechanisms.</P>
    </Card>
);

const StrategyStructures = () => (
    <Card>
        <SectionTitle>2.0 Foundational Strategy Structures</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <SubTitle>2.1 Deconstructing the Covered Call</SubTitle>
                <P>A foundational strategy constructed from a long position in an asset and a short call option on that same asset.</P>
                <ul className="list-none space-y-3">
                    <ListItem><strong>Core Components:</strong> Own at least 100 shares of a stock and sell one call option against those shares.</ListItem>
                    <ListItem><strong>The &ldquo;Covered&rdquo; Mechanism:</strong> The obligation to deliver shares is fully collateralized by the shares owned, distinguishing it from a high-risk &ldquo;naked&rdquo; call.</ListItem>
                    <ListItem><strong>&ldquo;Buy-Write&rdquo; Variation:</strong> Refers to simultaneously buying the stock and selling the call option in a single transaction.</ListItem>
                </ul>
            </div>
            <div>
                <SubTitle>2.2 Deconstructing the Diagonal Spread</SubTitle>
                <P>An advanced strategy using two options of the same type with different strike prices and different expiration dates.</P>
                <ul className="list-none space-y-3">
                    <ListItem><strong>Hybrid Nature:</strong> Combines elements of a vertical spread (different strikes) and a horizontal spread (different expirations).</ListItem>
                    <ListItem><strong>Etymology:</strong> The name &ldquo;diagonal&rdquo; comes from the options&apos; placement on a standard quote grid.</ListItem>
                    <ListItem><strong>Standard Construction:</strong> A &ldquo;long&rdquo; diagonal is established for a net debit, buying a longer-term option and selling a shorter-term option.</ListItem>
                    <ListItem><strong>Key Variations:</strong> Includes Bull Call Diagonals, Bear Put Diagonals, and even credit diagonals for different market outlooks.</ListItem>
                </ul>
            </div>
        </div>
    </Card>
);

const CoreObjectives = () => (
    <Card>
        <SectionTitle>3.0 Core Objectives and Ideal Market Outlook</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <SubTitle>3.1 Covered Call: The Income Generator</SubTitle>
                <P>Primarily an income-enhancement tool.</P>
                <ul className="list-none space-y-3">
                    <ListItem><strong>Primary Objective:</strong> Generate a consistent stream of income by collecting the option premium.</ListItem>
                    <ListItem><strong>Secondary Objectives:</strong> Cost basis reduction and serving as a targeted exit strategy.</ListItem>
                    <ListItem><strong>Ideal Market Outlook:</strong> Neutral to moderately bullish. The ideal scenario is for the stock to remain stable or rise modestly, but not above the strike price.</ListItem>
                    <ListItem><strong>Risk Note:</strong> While often called &ldquo;conservative,&rdquo; it retains the full downside risk of stock ownership, minus the small premium received.</ListItem>
                </ul>
            </div>
            <div>
                <SubTitle>3.2 Diagonal Spread: The Strategic Directional Play</SubTitle>
                <P>A strategic tool for expressing a nuanced market view with defined risk.</P>
                <ul className="list-none space-y-3">
                    <ListItem><strong>Primary Objective:</strong> Establish a defined-risk directional position that profits from a moderate, gradual price move and differential time decay (theta).</ListItem>
                    <ListItem><strong>Secondary Objective:</strong> Capitalize on an increase in implied volatility (IV), as it&apos;s a net long vega position.</ListItem>
                    <ListItem><strong>Ideal Market Outlook:</strong> A moderately directional market (bullish for calls, bearish for puts) with low or rising implied volatility.</ListItem>
                </ul>
            </div>
        </div>
    </Card>
);

const PMCCSection = () => (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-blue-900">
        <SectionTitle>4.0 The &ldquo;Poor Man&apos;s Covered Call&rdquo; (PMCC)</SectionTitle>
        <P>The PMCC is the most direct comparison point&mdash;a popular application of a long call diagonal debit spread designed to synthetically replicate a traditional covered call.</P>

        <SubTitle>4.1 Defining the PMCC</SubTitle>
        <P>It replaces the expensive 100 shares of stock with a cheaper, long-dated, deep in-the-money (ITM) call option (often a LEAPS). Against this long call, a shorter-term, out-of-the-money (OTM) call is sold to generate income.</P>

        <SubTitle>4.2 The Capital Efficiency Advantage</SubTitle>
        <P>The primary motivation is its profound capital efficiency, making it ideal for smaller accounts or high-priced stocks.</P>

        <div className="overflow-x-auto mt-6">
            <table className="w-full text-left border-collapse">
                <caption className="text-lg font-semibold p-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-t-lg">
                    Table 4.1: Capital Requirement Comparison (TECH @ $500)
                </caption>
                <thead>
                    <tr>
                        <th className="p-4 border-b-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">Metric</th>
                        <th className="p-4 border-b-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">Traditional Covered Call</th>
                        <th className="p-4 border-b-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">Poor Man&apos;s Covered Call (PMCC)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600"><strong>Long Leg</strong></td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">Buy 100 shares @ $500</td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">Buy 1 Year 400 Strike Call @ $120</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600"><strong>Short Leg</strong></td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">Sell 1 Month 520 Strike Call @ $10</td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">Sell 1 Month 520 Strike Call @ $10</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600"><strong>Capital Outlay</strong></td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">$50,000</td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">$12,000</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600"><strong>Premium Received</strong></td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">$1,000</td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">$1,000</td>
                    </tr>
                    <tr className="font-bold bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/30">
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">Net Capital Required</td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">$49,000</td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">$11,000</td>
                    </tr>
                    <tr className="font-bold bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/30">
                        <td className="p-4 border-b-0">Maximum Risk</td>
                        <td className="p-4 border-b-0">$49,000 (Stock to $0)</td>
                        <td className="p-4 border-b-0">$11,000 (Net debit paid)</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <P className="mt-6 italic">A PMCC is not just a &ldquo;cheap covered call&rdquo;; it&apos;s a leveraged, defined-risk trade on an asset the trader doesn&apos;t own, with its own unique management requirements and trade-offs (like no dividends).</P>
    </Card>
);

const QuantitativeAnalysis = () => (
    <Card>
        <SectionTitle>5.0 Quantitative Analysis: Risk, Reward, and Breakeven</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <SubTitle>5.1 Covered Call Profile</SubTitle>
                <ul className="list-none space-y-4">
                    <li><strong className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Max Profit (Capped):</strong> `(Strike - Stock Price) + Premium`</li>
                    <li><strong className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Max Loss (Substantial):</strong> `Stock Price - Premium`</li>
                    <li><strong className="text-yellow-600 dark:text-yellow-400">Breakeven:</strong> `Stock Price - Premium`</li>
                </ul>
            </div>
            <div>
                <SubTitle>5.2 Diagonal Spread Profile</SubTitle>
                <ul className="list-none space-y-4">
                    <li><strong className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Max Profit (Limited but Variable):</strong> Occurs if stock is at the short strike at its expiration. Cannot be precisely calculated upfront.</li>
                    <li><strong className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Max Loss (Defined & Limited):</strong> The net debit paid to enter the position.</li>
                    <li><strong className="text-yellow-600 dark:text-yellow-400">Breakeven (Approximate):</strong> `Long Option Strike + Net Debit`. A precise formula is not feasible due to IV impact.</li>
                </ul>
            </div>
        </div>
    </Card>
);

const GreeksSection = () => (
    <Card>
        <SectionTitle>6.0 The Role of the Greeks</SectionTitle>
        <P>Understanding the &ldquo;Greeks&rdquo; reveals fundamental differences in how these strategies react to market conditions.</P>

        <Accordion title="Time Decay (Theta)">
            <P><strong>Covered Call (Positive Theta):</strong> As a net seller of an option, the position benefits directly from time decay as the short call&apos;s value erodes.</P>
            <P><strong>Diagonal Spread (Net Positive Theta):</strong> The position profits from *differential decay*. The short-term option sold loses value much faster than the long-term option bought, resulting in a net benefit from the passage of time.</P>
        </Accordion>

        <Accordion title="Implied Volatility (Vega)">
            <P><strong>Covered Call (Negative Vega):</strong> The position is net short vega. It benefits when implied volatility (IV) falls. The ideal entry is when IV is high, allowing the seller to collect a large premium and profit from a &ldquo;vega crush&rdquo;.</P>
            <P><strong>Diagonal Spread (Positive Vega):</strong> The position is net long vega. It benefits when implied volatility (IV) rises. The ideal entry is when IV is low, allowing the trader to enter cheaply and profit from a potential expansion in volatility.</P>
        </Accordion>

        <div className="overflow-x-auto mt-8">
            <table className="w-full text-left border-collapse">
                <caption className="text-lg font-semibold p-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-t-lg">
                    Table 6.1: Comparative Summary of Greek Exposures
                </caption>
                <thead>
                    <tr>
                        <th className="p-4 border-b-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">Greek</th>
                        <th className="p-4 border-b-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">Covered Call</th>
                        <th className="p-4 border-b-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">Long Call Diagonal (PMCC)</th>
                        <th className="p-4 border-b-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">Implication</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600"><strong>Delta</strong></td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">Moderately Positive</td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">Moderately Positive</td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">Both are bullish.</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600"><strong>Gamma</strong></td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">Negative</td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">Slightly Positive/Neutral</td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">Diagonal can accelerate gains.</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600"><strong>Theta</strong></td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">Positive</td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">Positive (Differential)</td>
                        <td className="p-4 border-b border-gray-200 dark:border-gray-600">Both benefit from time.</td>
                    </tr>
                    <tr className="font-bold bg-yellow-50 dark:bg-yellow-900/30">
                        <td className="p-4 border-b-0"><strong>Vega</strong></td>
                        <td className="p-4 border-b-0 flex items-center"><TrendingDown className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A] mr-2" /> Negative</td>
                        <td className="p-4 border-b-0 flex items-center"><TrendingUp className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C] mr-2" /> Positive</td>
                        <td className="p-4 border-b-0">Key Differentiator: Opposing volatility preference.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Card>
);

const PositionManagement = () => (
    <Card>
        <SectionTitle>7.0 Position Management and Advanced Tactics</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <SubTitle>7.1 Managing the Covered Call</SubTitle>
                <P>Management revolves around handling assignment risk and adjusting the position.</P>
                <ul className="list-none space-y-3">
                    <ListItem><strong>Assignment Risk:</strong> The primary risk is having shares &ldquo;called away,&rdquo; especially near an ex-dividend date.</ListItem>
                    <ListItem><strong>Rolling Strategies:</strong> The main adjustment technique. Involves closing the current short call and opening a new one: rolling up for more upside, down for more premium, or out in time to continue the strategy.</ListItem>
                </ul>
            </div>
            <div>
                <SubTitle>7.2 Managing the Diagonal Spread</SubTitle>
                <P>Inherently more complex due to its two option legs.</P>
                <ul className="list-none space-y-3">
                    <ListItem><strong>Assignment Risk:</strong> Assignment on the short leg creates a short stock position. The goal is to manage the short leg to avoid this, usually by rolling before expiration.</ListItem>
                    <ListItem><strong>Rolling the Short Leg:</strong> A key component of the strategy is systematically rolling the short leg to continuously generate income and reduce the cost basis of the long leg.</ListItem>
                    <ListItem><strong>Closing the Position:</strong> Can close both legs simultaneously or close only the short leg, leaving the long option as a standalone directional bet.</ListItem>
                </ul>
            </div>
        </div>
    </Card>
);

const Synthesis = () => (
    <Card className="bg-gray-50 dark:bg-gray-900">
        <SectionTitle>8.0 Synthesis and Strategic Recommendations</SectionTitle>

        <SubTitle>8.1 Head-to-Head Comparison</SubTitle>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse shadow-md rounded-lg">
                <thead>
                    <tr>
                        <th className="p-4 bg-gray-200 dark:bg-gray-700 font-semibold border-b-2 border-gray-300 dark:border-gray-600">Feature</th>
                        <th className="p-4 bg-blue-100 dark:bg-blue-900/50 font-semibold border-b-2 border-gray-300 dark:border-gray-600">Covered Call Writing</th>
                        <th className="p-4 bg-green-100 dark:bg-green-900/50 font-semibold border-b-2 border-gray-300 dark:border-gray-600">Diagonal Spread (PMCC)</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { feature: 'Structure', cc: 'Long 100 Shares + Short Call', ds: 'Long Far Option + Short Near Option' },
                        { feature: 'Primary Objective', cc: 'Income Generation', ds: 'Capital-Efficient Directional Bet' },
                        { feature: 'Ideal Market', cc: 'Neutral to Moderately Bullish', ds: 'Moderately Directional' },
                        { feature: 'Capital Requirement', cc: 'High (Cost of 100 shares)', ds: 'Low (Net debit)' },
                        { feature: 'Max Profit', cc: 'Limited & Calculable', ds: 'Limited & Variable' },
                        { feature: 'Max Loss', cc: 'Substantial (Stock to zero)', ds: 'Defined & Limited (Net debit)' },
                        { feature: 'Theta Profile', cc: 'Positive', ds: 'Positive (Differential)' },
                        { feature: 'Vega Profile', cc: 'Negative (Prefers falling IV)', ds: 'Positive (Prefers rising IV)' },
                        { feature: 'Dividend Rights', cc: 'Yes', ds: 'No' },
                        { feature: 'Management Complexity', cc: 'Moderate', ds: 'High' },
                    ].map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                            <td className="p-3 border-b border-gray-200 dark:border-gray-700 font-semibold">{item.feature}</td>
                            <td className="p-3 border-b border-gray-200 dark:border-gray-700">{item.cc}</td>
                            <td className="p-3 border-b border-gray-200 dark:border-gray-700">{item.ds}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <SubTitle>8.2 Decision Framework: Choosing the Right Strategy</SubTitle>
        <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="border-l-4 border-[#A8672E] dark:border-[#D08F52] pl-4">
                <h4 className="font-bold text-xl mb-2 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Use a Covered Call when...</h4>
                <P>You are a long-term holder of 100+ shares, have a neutral-to-moderately bullish outlook, and want to generate extra income from your existing assets.</P>
            </div>
            <div className="border-l-4 border-[#1D8A70] dark:border-[#3CBF9C] pl-4">
                <h4 className="font-bold text-xl mb-2 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Use a Diagonal Spread when...</h4>
                <P>You are bullish but have limited capital, want a defined-risk alternative to stock, and are comfortable with higher complexity and more active management.</P>
            </div>
        </div>

        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-inner">
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center">
                <HelpCircle className="w-6 h-6 mr-2 text-[#A8672E] dark:text-[#D08F52]" />
                Concluding Expert Insight
            </h4>
            <P className="!mb-0 text-xl italic">
                A <strong className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">covered call</strong> is a tactic to enhance an existing asset. A <strong className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">diagonal spread</strong> is a strategy to create a new, synthetic, and capital-efficient position. The choice is not about which is &ldquo;better,&rdquo; but which is the right tool for your specific objectives, capital, and risk tolerance.
            </P>
        </div>
    </Card>
);

export default function DiagonalSpreadVsCoveredCallPage() {
    return (
        <ArticleFrame
            slug="diagonal-spread-vs-covered-call-strategic-quantitative-comparison"
            additionalDisclaimer="Options trading involves significant risk."
        >
            <div className="space-y-12">
                <ExecutiveSummary />
                <StrategyStructures />
                <CoreObjectives />
                <PMCCSection />
                <QuantitativeAnalysis />
                <GreeksSection />
                <PositionManagement />
                <Synthesis />
            </div>
        </ArticleFrame>
    );
}
