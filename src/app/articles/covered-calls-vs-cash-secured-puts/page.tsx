"use client";
import React, { useState, ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Icon for the accordion expand/collapse
const ChevronDown = ({ className = "" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

// Accordion Item Component
interface AccordionItemProps {
    title: string;
    children: ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}
const AccordionItem = ({ title, children, isOpen, onToggle }: AccordionItemProps) => {
    return (
        <div className="border-b border-gray-700">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none focus:bg-gray-800"
            >
                <h3 className="text-xl lg:text-2xl font-semibold text-cyan-400">{title}</h3>
                <ChevronDown className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-full' : 'max-h-0'}`}
            >
                <div className="p-6 pt-0">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Table Component for easy styling
interface StyledTableProps {
    headers: string[];
    data: string[][];
}
const StyledTable = ({ headers, data }: StyledTableProps) => (
    <div className="overflow-x-auto my-6">
        <table className="min-w-full bg-gray-900 border border-gray-700">
            <thead>
                <tr>
                    {headers.map((header: string, index: number) => (
                        <th key={index} className="py-3 px-4 bg-gray-800 border-b border-gray-700 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row: string[], rowIndex: number) => (
                    <tr key={rowIndex} className="hover:bg-gray-800 transition-colors">
                        {row.map((cell: string, cellIndex: number) => (
                            <td key={cellIndex} className="py-3 px-4 border-b border-gray-700 text-gray-400">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default function CoveredCallsVsCashSecuredPutsPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Keep the first section open by default

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const sections = [
        {
            title: "Introduction",
            content: (
                <div className="space-y-4 text-gray-300 prose prose-invert max-w-none">
                    <p>Covered call writing and cash-secured put writing represent two of the most foundational and widely utilized income-generating strategies in the world of options trading. At first glance, they appear to be distinct operations catering to different investor objectives. However, a deeper investigation reveals a fascinating paradox.</p>
                    <p>Grounded in the fundamental principle of put-call parity, these two strategies are, in fact, theoretical equivalents. When structured with identical strike prices and expiration dates, they exhibit identical risk and reward profiles. Their profit-and-loss diagrams are superimposable, a mathematical proof that they are merely two sides of the same strategic coin.</p>
                    <p>Yet, in practice, the selection is anything but. The theoretical identity of the strategies shatters upon contact with the frictions and realities of the market. This page provides an exhaustive analysis of this equivalence-divergence dichotomy, exploring the mechanics, theoretical links, practical differences, and psychological factors that define these two powerful strategies.</p>
                </div>
            )
        },
        {
            title: "Deconstructing the Strategies",
            content: (
                <div className="space-y-6 text-gray-300 prose prose-invert max-w-none">
                    <h4 className="text-lg font-bold text-cyan-500">1.1 The Covered Call: Generating Income on an Existing Asset</h4>
                    <p>The covered call is one of the most popular options strategies, particularly among investors who hold long-term stock positions and wish to enhance their returns. The primary objectives are income generation, obtaining a partial downside hedge, and creating a strategic exit point.</p>
                    <h4 className="text-lg font-bold text-cyan-500">1.2 The Cash-Secured Put: Getting Paid to Buy a Desired Asset</h4>
                    <p>The cash-secured put is an income strategy that also serves as a disciplined method for acquiring stock at a potentially lower price. The primary motivations are to acquire a desired stock at a discount or to generate income from cash reserves while waiting for an entry point.</p>
                    <StyledTable 
                        headers={["Feature", "Covered Call", "Cash-Secured Put"]}
                        data={[
                            ["Prerequisite", "Own 100 shares of underlying stock", "Have sufficient cash to buy 100 shares at strike price"],
                            ["Action", "Sell one call option per 100 shares owned", "Sell one put option and set aside cash collateral"],
                            ["Obligation", "To SELL shares at the strike price if assigned", "To BUY shares at the strike price if assigned"],
                            ["Primary Goal(s)", "Generate income on existing holdings; strategic exit", "Acquire stock at a discount; generate income on cash"],
                            ["Ideal Market Outlook", "Neutral to slightly bullish", "Neutral to bullish (or slightly bearish short-term)"],
                            ["Result of Assignment", "Stock position becomes a cash position", "Cash position becomes a stock position"]
                        ]}
                    />
                </div>
            )
        },
        {
            title: "The Principle of Synthetic Equivalence: Put-Call Parity",
            content: (
                 <div className="space-y-4 text-gray-300 prose prose-invert max-w-none">
                    <p>While the mechanics and investor motivations appear distinct, they are linked by a foundational principle: put-call parity. This principle reveals that, under specific conditions, the two strategies are synthetically equivalent, possessing identical risk-reward profiles.</p>
                    <p>The put-call parity formula is:</p>
                    <div className="bg-gray-900 p-4 rounded-lg text-center my-4">
                        <p className="text-lg font-mono text-white">C + PV(K) = P + S</p>
                    </div>
                    <p>By rearranging this formula, we can prove that a covered call ($S - C$) is synthetically equivalent to a cash-secured put ($PV(K) - P$). This means their risk/reward profiles, including max profit, max loss, and breakeven points, are identical.</p>
                     <StyledTable 
                        headers={["Metric", "Covered Call Formula", "Cash-Secured Put Formula", "Result"]}
                        data={[
                            ["P/L Graph Shape", "Slopes down to the left, flat to the right", "Slopes down to the left, flat to the right", "Identical"],
                            ["Maximum Profit", "(K - S_buy) + C_prem", "P_prem", "Identical*"],
                            ["Maximum Loss", "S_buy - C_prem", "K - P_prem", "Identical*"],
                            ["Breakeven Point", "S_buy - C_prem", "K - P_prem", "Identical*"],
                        ]}
                    />
                    <p className="text-sm text-gray-500">*Assuming same strike K, stock purchase price S_buy = K, and parity-adjusted premiums.</p>
                </div>
            )
        },
        {
            title: "The Practical Divergence: Why They Are Not the Same Trade",
            content: (
                <div className="space-y-4 text-gray-300 prose prose-invert max-w-none">
                    <p>While theoretically equivalent, the strategies diverge significantly in real-world application due to capital requirements, transaction costs, dividend treatment, and tax implications.</p>
                     <StyledTable 
                        headers={["Aspect", "Covered Call", "Cash-Secured Put"]}
                        data={[
                            ["Capital Requirement", "High: Cost of 100 shares (or 50% on margin)", "Lower: Cash to secure put (can be much less with portfolio margin)"],
                            ["Transaction Costs", "Potentially higher (2+ transactions to open/close)", "Potentially lower (1 transaction to open/close)"],
                            ["Bid-Ask Spreads", "Can be wide for equivalent ITM calls", "Typically tighter for equivalent OTM puts"],
                            ["Dividend Treatment", "Receives dividend directly", "Compensated with higher premium; no direct dividend"],
                            ["Early Assignment Risk", "High risk around ex-dividend dates for ITM calls", "Low risk (generally not a concern for the writer)"],
                            ["Tax on Assignment", "Taxable event: triggers sale of stock", "Not a taxable event: establishes cost basis for new stock"],
                            ["Interest on Collateral", "No (capital is in stock)", "Yes (cash collateral can earn interest)"],
                            ["Brokerage Approval", "Widely available, lower approval level", "Often requires a higher level of trading approval"]
                        ]}
                    />
                </div>
            )
        },
        {
            title: "The Assignment Event: A Critical Point of Divergence",
            content: (
                <div className="space-y-4 text-gray-300 prose prose-invert max-w-none">
                    <p>The moment of option assignment is where the paths diverge most dramatically. One is an exit event, the other an entry event.</p>
                     <StyledTable 
                        headers={["Aspect", "Covered Call Assignment", "Cash-Secured Put Assignment"]}
                        data={[
                           ["Obligation", "Sell 100 shares at strike price", "Buy 100 shares at strike price"],
                           ["Resulting Position", "Long stock position becomes a cash position (exposure terminated)", "Cash collateral position becomes a long stock position (exposure initiated)"],
                           ["Cash Flow", "Inflow of cash equal to (Strike Price × 100)", "Outflow of cash equal to (Strike Price × 100)"],
                           ["Strategic Implication", "Forced exit from a position, upside capped, opportunity cost realized", "Forced entry into a position, potentially at a price above current market value"],
                           ["Next Logical Step", "Decide whether to re-purchase the stock or deploy cash elsewhere", "Decide whether to hold the new stock, sell it, or write covered calls on it (e.g., 'The Wheel')"]
                        ]}
                    />
                </div>
            )
        },
        {
            title: "The Human Element: Psychological and Behavioral Biases",
            content: (
                 <div className="space-y-4 text-gray-300 prose prose-invert max-w-none">
                    <p>Financial decisions are filtered through the lens of human psychology. Cognitive biases create a significant gap between how the two strategies exist on paper and how they are experienced.</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><b>Framing Effect:</b> Covered calls are framed as "enhancing an asset," which feels safer than "selling insurance" (selling a put). This perception is often reinforced by brokerage permission levels.</li>
                        <li><b>Loss Aversion:</b> While the financial loss from a stock decline is identical, the psychological experience differs. Closing a losing covered call feels like "selling at a reduced loss," while closing a losing put feels like "buying back a contract for a loss," which can be more psychologically painful.</li>
                        <li><b>Regret:</b> The primary regret for a covered call writer is opportunity cost—missing a massive rally. For a put writer, the regret is one of inaction (not buying sooner), which is often less potent.</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Strategic Implementation & Decision Framework",
            content: (
                <div className="space-y-4 text-gray-300 prose prose-invert max-w-none">
                    <p>The choice between the two is not about which is universally superior, but which is the most fit-for-purpose given a specific set of goals, constraints, and market conditions.</p>
                    <h4 className="text-lg font-bold text-cyan-500">The "Wheel" Strategy</h4>
                    <p>This popular strategy explicitly links the two: Sell cash-secured puts until assigned, then sell covered calls on the newly acquired stock. If the stock is called away, return to selling puts. This creates a continuous income-generating cycle.</p>
                    <h4 className="text-lg font-bold text-cyan-500">Decision-Making Matrix</h4>
                     <StyledTable 
                        headers={["If your primary goal is...", "The more direct strategy is...", "Key Rationale"]}
                        data={[
                           ["Generate income on existing stock holdings", "Covered Call", "This strategy is specifically designed to enhance the yield of assets already in the portfolio."],
                           ["Acquire a desired stock at a lower price", "Cash-Secured Put", "The strategy's core purpose is to enter a stock position at an effective price below the current market."],
                           ["Maximize capital efficiency and RoC", "Cash-Secured Put", "Requires less capital, especially in a margin account, leading to higher potential returns on the capital deployed."],
                           ["Maximize tax efficiency (deferring gains)", "Cash-Secured Put", "Assignment results in a stock purchase (not a taxable event), whereas a covered call assignment forces a taxable sale."],
                           ["Capture stock dividends directly", "Covered Call", "Only the owner of the stock receives the dividend payment."],
                           ["Trade in a basic retirement account (IRA)", "Covered Call", "Covered call writing is almost universally permitted, while cash-secured put selling may require higher approval levels or not be allowed by some brokers."],
                           ["Minimize transaction costs", "Cash-Secured Put", "Often involves a single transaction with a more liquid OTM option."],
                           ["Align with a 'safer' psychological frame", "Covered Call", "The framing of 'enhancing an asset' is often perceived as less risky and more intuitive than 'selling an obligation.'"]
                        ]}
                    />
                </div>
            )
        },
    ];

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans">
            <main className="container mx-auto px-4 py-8 md:py-16">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Return to Home
                    </Link>
                    <a 
                        href="https://docs.google.com/document/d/e/2PACX-1vQmkYLuHPc5AzNNBbpux00HeeoGnszoxXmMcVu2dY9HCj5ddi6vosuCivIYzRZx8ufcgeegPnbR-HiY/pub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 transition-colors duration-200 text-white font-medium"
                    >
                        Full Article
                    </a>
                </div>
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-500">
                        Covered Calls vs. Cash-Secured Puts
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        A Comprehensive Analysis of Theoretical Equivalence and Practical Divergence
                    </p>
                </header>
                
                <div className="max-w-4xl mx-auto bg-gray-800/50 rounded-lg shadow-2xl shadow-cyan-500/10 border border-gray-700">
                    {sections.map((section, index) => (
                         <AccordionItem 
                            key={index}
                            title={section.title}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                         >
                            {section.content}
                        </AccordionItem>
                    ))}
                </div>

                <footer className="text-center mt-16 text-gray-500">
                    <p>&copy; 2025 Financial Strategy Insights. All rights reserved.</p>
                </footer>
            </main>
        </div>
    );
} 