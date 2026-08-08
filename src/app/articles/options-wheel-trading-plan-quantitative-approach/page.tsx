'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Target, ShieldCheck, TrendingUp, BarChart3, ArrowDownCircle, ArrowUpCircle, RefreshCw } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

const IconBookOpen = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-indigo-600">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
);

const IconTarget = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-indigo-600">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
    </svg>
);

const IconShieldCheck = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3 text-indigo-600">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
);

const SectionHeader = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="flex items-center mb-6">
        {children}
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
    </div>
);

const StyledTable = ({ headers, data }: { headers: string[]; data: string[][] }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
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
                            <td key={cellIndex} className={`whitespace-pre-wrap px-4 py-3 ${cell.includes('Pass') || cell.includes('Qualify') ? 'text-green-600 font-medium' :
                                    cell.includes('Fail') || cell.includes('Disqualify') ? 'text-red-600 font-medium' :
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

const WheelCycleVisualization = () => {
    const [currentPhase, setCurrentPhase] = useState(1);

    const phases = [
        {
            id: 1,
            title: "Phase 1: Cash-Secured Put",
            description: "Sell puts on quality stocks you want to own at a discount",
            action: "Collect premium while waiting for assignment",
            color: "bg-blue-500"
        },
        {
            id: 2,
            title: "Phase 2: Assignment",
            description: "Get assigned shares at the strike price",
            action: "Now own 100 shares per contract",
            color: "bg-yellow-500"
        },
        {
            id: 3,
            title: "Phase 3: Covered Call",
            description: "Sell calls against your shares",
            action: "Generate income from owned shares",
            color: "bg-green-500"
        },
        {
            id: 4,
            title: "Phase 4: Call Away",
            description: "Shares called away at strike price",
            action: "Cycle complete - restart with puts",
            color: "bg-purple-500"
        }
    ];

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Interactive Wheel Cycle</h3>

            <div className="flex justify-center mb-8">
                <div className="flex space-x-2">
                    {phases.map((phase) => (
                        <button
                            key={phase.id}
                            onClick={() => setCurrentPhase(phase.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                currentPhase === phase.id
                                    ? `${phase.color} text-white`
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Phase {phase.id}
                        </button>
                    ))}
                </div>
            </div>

            <div className="text-center">
                <div className={`inline-block p-4 rounded-full ${phases[currentPhase - 1].color} text-white mb-4`}>
                    <RefreshCw className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {phases[currentPhase - 1].title}
                </h4>
                <p className="text-gray-600 mb-2">
                    {phases[currentPhase - 1].description}
                </p>
                <p className="text-sm text-gray-500">
                    {phases[currentPhase - 1].action}
                </p>
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={() => setCurrentPhase(currentPhase === 1 ? 4 : currentPhase - 1)}
                    className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPhase(currentPhase === 4 ? 1 : currentPhase + 1)}
                    className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </div>
        </div>
    );
};

export default function OptionsWheelTradingPlan() {
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
        <ArticleFrame
            slug="options-wheel-trading-plan-quantitative-approach"
            additionalDisclaimer="Options trading involves substantial risk and is not suitable for all investors. The strategies discussed are for educational purposes only and should not be considered personalized investment advice."
        >
            <div className="max-w-4xl mx-auto px-4 text-gray-800">
                <InfographicSlot alt="Options Wheel Trading Plan Quantitative Framework" />

                <div className="space-y-16">
                    <WheelCycleVisualization />

                    {/* Section 1: Strategic Rationale */}
                    <section id="rationale" className="p-8 bg-white rounded-xl border border-gray-200 shadow-md">
                        <SectionHeader title="The Strategic Rationale of the Wheel">
                            <IconBookOpen />
                        </SectionHeader>

                        <div className="space-y-8 prose prose-lg max-w-none prose-p:text-gray-600 prose-h3:text-gray-900 prose-h3:text-2xl prose-strong:text-indigo-600">
                            <p>
                                The Options Wheel Strategy is a systematic, cyclical process for generating income and potentially acquiring high-quality stocks.
                                It&apos;s not a single trade, but a continuous loop designed to harness option premiums and time decay. It is fundamentally a
                                <strong> stock acquisition strategy</strong>, not speculative trading. The premium is compensation for your commitment to buy
                                a quality asset at a price you deem attractive.
                            </p>

                            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                                <h4 className="font-bold text-blue-800 mb-2">Core Mathematical Principle</h4>
                                <p className="text-blue-700">
                                    The wheel leverages <strong>put-call parity</strong>: C + X = P + S. This means selling a covered call is mathematically
                                    equivalent to selling a cash-secured put at the same strike and expiration. The wheel seamlessly transitions between
                                    these equivalent positions to maximize income generation.
                                </p>
                            </div>

                            <h3>1.1 Deconstructing the Wheel: A Cyclical Income Engine</h3>
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

                            <h3>1.2 Triple Income Mechanism</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="bg-green-100 p-4 rounded-lg">
                                    <h4 className="font-bold text-green-800 mb-2">1. Put Premiums</h4>
                                    <p className="text-green-700 text-sm">Collect income while waiting for good entry prices on quality stocks</p>
                                </div>
                                <div className="bg-blue-100 p-4 rounded-lg">
                                    <h4 className="font-bold text-blue-800 mb-2">2. Call Premiums</h4>
                                    <p className="text-blue-700 text-sm">Generate income from owned shares while waiting to sell at target prices</p>
                                </div>
                                <div className="bg-purple-100 p-4 rounded-lg">
                                    <h4 className="font-bold text-purple-800 mb-2">3. Dividends</h4>
                                    <p className="text-purple-700 text-sm">Bonus income from quality dividend-paying stocks during ownership periods</p>
                                </div>
                            </div>

                            <h3>1.3 The Financial Logic: Cost Basis Reduction &amp; &ldquo;Synthetic Dividend&rdquo;</h3>
                            <p>
                                Premiums collected systematically reduce your effective purchase price (cost basis). A $50 strike put with a $2 premium
                                results in a <strong>$48 cost basis</strong> if assigned ($50 strike - $2 premium). Subsequent call premiums further reduce
                                this cost, creating a protective buffer and enhancing total return.
                            </p>
                            <p>
                                For stable stocks, this consistent income stream can be viewed as a <strong>&ldquo;synthetic dividend&rdquo;</strong>. You create your
                                own cash flow, which enhances returns even when the stock price is stagnant, much like a real dividend.
                            </p>

                            <h3>1.4 Market Conditions: The Sweet Spot</h3>
                            <p>
                                The Wheel performs optimally in <strong>neutral, sideways, or mildly bullish markets</strong>. In these conditions, you can
                                repeatedly collect premiums as options expire worthless. In strongly bullish markets, it underperforms buy-and-hold due to
                                the capped upside. In strongly bearish markets, it will incur losses, though the premiums provide a small cushion.
                            </p>

                            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                                <h4 className="font-bold text-yellow-800 mb-2">Statistical Edge</h4>
                                <p className="text-yellow-700">
                                    The strategy works because <strong>most options expire worthless</strong> (approximately 80-90%), allowing you to keep
                                    the premium collected while managing the minority of positions that move against you. By selling 16-30 delta options,
                                    you achieve a ~70-84% win rate based on probability mathematics.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Trading Plan */}
                    <section id="plan" className="p-8 bg-white rounded-xl border border-gray-200 shadow-md">
                        <SectionHeader title="The Ultimate Trading Plan: Implementation Protocol">
                            <IconTarget />
                        </SectionHeader>

                        <div className="space-y-8 prose prose-lg max-w-none prose-p:text-gray-600 prose-h3:text-gray-900 prose-h3:text-2xl prose-strong:text-indigo-600">
                            <h3>2.1 Underlyer Selection Protocol</h3>
                            <p>
                                This is the most critical step. The success of the Wheel is determined by the quality of the underlying asset. The goal is
                                to identify stable, financially sound businesses you are willing to own long-term. Your selection should pass a multi-stage filter.
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>
                                    <strong>Quantitative Screen:</strong> Analyze fundamentals like P/E ratio, debt levels, and revenue growth to ensure financial health.
                                </li>
                                <li>
                                    <strong>Qualitative Assessment:</strong> Evaluate the company&apos;s competitive moat and answer the key question:
                                    &ldquo;Am I truly willing to own this stock long-term?&rdquo;
                                </li>
                                <li>
                                    <strong>Market-Based Criteria:</strong> Ensure high liquidity (stock and options volume) and moderate implied volatility.
                                    High liquidity is non-negotiable for good trade execution.
                                </li>
                            </ul>

                            <StyledTable headers={underlyerTableHeaders} data={underlyerTableData} />

                            <h3 className="pt-8">2.2 Option Writing Protocol</h3>
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

                    {/* Section 3: Understanding the Greeks */}
                    <section id="greeks" className="p-8 bg-white rounded-xl border border-gray-200 shadow-md">
                        <SectionHeader title="Understanding the Option Greeks">
                            <BarChart3 className="h-6 w-6 mr-3 text-indigo-600" />
                        </SectionHeader>

                        <div className="space-y-8">
                            <p className="text-gray-600 text-lg">
                                Mastering option writing requires moving beyond price and premium. The &lsquo;Greeks&rsquo; provide a framework for quantifying
                                the risks and dynamics of an option position. They are essential for sophisticated risk management and strategy selection.
                            </p>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                    <h4 className="text-lg font-bold text-blue-900 mb-3">Delta (Δ)</h4>
                                    <p className="text-blue-700 text-sm">
                                        Measures the rate of change in an option&apos;s price for every $1 move in the underlying stock. For short puts,
                                        a delta of 0.30 means the option premium will increase by $0.30 if the stock falls by $1.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                                    <h4 className="text-lg font-bold text-green-900 mb-3">Theta (Θ)</h4>
                                    <p className="text-green-700 text-sm">
                                        Measures the rate of an option&apos;s price decay over time, often called &lsquo;time decay.&rsquo; As an option writer,
                                        Theta is your primary source of profit, as the premium you collected erodes each day, all else being equal.
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                                    <h4 className="text-lg font-bold text-purple-900 mb-3">Vega (V)</h4>
                                    <p className="text-purple-700 text-sm">
                                        Measures sensitivity to changes in implied volatility. As a seller of options, you profit when volatility
                                        decreases (a &lsquo;Vega crush&rsquo;), as this lowers the option&apos;s premium, making it cheaper to buy back.
                                    </p>
                                </div>
                                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                                    <h4 className="text-lg font-bold text-orange-900 mb-3">Gamma (Γ)</h4>
                                    <p className="text-orange-700 text-sm">
                                        Measures the rate of change of Delta. It indicates how much an option&apos;s delta will change for a $1 move
                                        in the stock. High gamma means the position&apos;s risk profile can change very quickly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Strategic Market Entry via Put Writing */}
                    <section id="entry" className="p-8 bg-white rounded-xl border border-gray-200 shadow-md">
                        <div className="flex items-start mb-6">
                            <div className="flex-shrink-0 bg-blue-100 p-4 rounded-lg mr-6">
                                <ArrowDownCircle className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Strategic Market Entry via Put Writing</h2>
                                <p className="text-xl text-gray-600 mt-2">
                                    The cash-secured put transforms waiting for a target stock price into an active, income-generating process.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <p className="text-gray-700 leading-7">
                                The mechanics involve writing a put option and setting aside cash to purchase the stock if assigned. The dual objective
                                is to either acquire the stock at an effective price below its current value or to simply keep the premium as income
                                if the option expires worthless. A key strategic element is strike selection. Many writers choose strike prices at or
                                near significant technical support levels.
                            </p>

                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
                                <div className="p-6 bg-gray-50 border-b border-gray-200">
                                    <h4 className="text-xl font-bold text-gray-800">Scenario Analysis: Cash-Secured Put</h4>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Assume selling one put on stock XYZ, currently at $100. Action: Sell 1 XYZ $95 Put @ $2.00.
                                        Cash Secured: $9,500. Premium Received: $200. Breakeven: $93.00.
                                    </p>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Stock Price at Expiration</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Outcome</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Profit / Loss</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr className="hover:bg-gray-50/70 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-700">$105.00</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Put expires worthless</td>
                                                <td className="px-6 py-4 text-sm text-green-600 font-medium">+$200</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Maximum gain achieved. Keep premium.</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50/70 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-700">$95.00</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Put expires worthless</td>
                                                <td className="px-6 py-4 text-sm text-green-600 font-medium">+$200</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">At strike price. Option expires worthless.</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50/70 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-700">$94.00</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Put is assigned</td>
                                                <td className="px-6 py-4 text-sm text-red-600 font-medium">-$100</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Buy 100 shares at $95. Effective cost $93.</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50/70 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-700">$93.00</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Put is assigned</td>
                                                <td className="px-6 py-4 text-sm text-gray-700 font-medium">$0</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Breakeven point reached.</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50/70 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-700">$90.00</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Put is assigned</td>
                                                <td className="px-6 py-4 text-sm text-red-600 font-medium">-$300</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Paper loss: ($90 - $93) x 100.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Strategic Market Exit via Call Writing */}
                    <section id="exit" className="p-8 bg-white rounded-xl border border-gray-200 shadow-md">
                        <div className="flex items-start mb-6">
                            <div className="flex-shrink-0 bg-green-100 p-4 rounded-lg mr-6">
                                <ArrowUpCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Strategic Market Exit via Call Writing</h2>
                                <p className="text-xl text-gray-600 mt-2">
                                    The covered call is used to generate income or execute a disciplined, price-targeted exit.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <p className="text-gray-700 leading-7">
                                This strategy requires owning at least 100 shares of a stock for each call option sold. This &lsquo;covers&rsquo; the obligation.
                                A common objective is to generate consistent income from a long-term holding. By repeatedly selling short-term,
                                out-of-the-money calls, an investor can significantly lower their cost basis over time, creating a &lsquo;synthetic dividend&rsquo;
                                that often exceeds the stock&apos;s actual dividend.
                            </p>

                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
                                <div className="p-6 bg-gray-50 border-b border-gray-200">
                                    <h4 className="text-xl font-bold text-gray-800">Scenario Analysis: Covered Call</h4>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Assume owning 100 shares of XYZ, purchased at $48. Action: Sell 1 XYZ $50 Call @ $1.50.
                                        Premium Received: $150. Breakeven: $46.50. Max Gain: $350.
                                    </p>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Stock Price at Expiration</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Outcome</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Profit / Loss</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr className="hover:bg-gray-50/70 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-700">$55.00</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Shares called away at $50</td>
                                                <td className="px-6 py-4 text-sm text-green-600 font-medium">+$350</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Maximum gain. Misses gains above $50.</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50/70 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-700">$50.00</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Shares called away at $50</td>
                                                <td className="px-6 py-4 text-sm text-green-600 font-medium">+$350</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Maximum gain achieved.</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50/70 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-700">$49.00</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Call expires worthless</td>
                                                <td className="px-6 py-4 text-sm text-green-600 font-medium">+$250</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Keep premium + stock appreciation.</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50/70 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-700">$46.50</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Call expires worthless</td>
                                                <td className="px-6 py-4 text-sm text-gray-700 font-medium">$0</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Breakeven point reached.</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50/70 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-700">$40.00</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Call expires worthless</td>
                                                <td className="px-6 py-4 text-sm text-red-600 font-medium">-$650</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">Stock loss partially offset by premium.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 6: Risk Management */}
                    <section id="risk" className="p-8 bg-white rounded-xl border border-gray-200 shadow-md">
                        <SectionHeader title="Advanced Risk Management & Adjustments">
                            <IconShieldCheck />
                        </SectionHeader>

                        <div className="space-y-8 prose prose-lg max-w-none prose-p:text-gray-600 prose-h3:text-gray-900 prose-h3:text-2xl prose-strong:text-indigo-600">
                            <h3>6.1 Primary Risk Exposures</h3>
                            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                                <h4 className="font-bold text-red-800 mb-2">&ldquo;Bag-Holding&rdquo; Risk</h4>
                                <p className="text-red-700">
                                    The biggest risk is being assigned a stock that continues to decline significantly. This highlights why selecting
                                    a high-quality company you believe in is paramount. If the thesis is sound, you are simply a long-term investor
                                    holding a quality asset at a temporary discount.
                                </p>
                            </div>

                            <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
                                <h4 className="font-bold text-yellow-800 mb-2">Opportunity Cost</h4>
                                <p className="text-yellow-700">
                                    The covered call caps your upside. In a massive rally, you will miss out on gains above your strike price.
                                    This is the explicit trade-off for consistent income generation.
                                </p>
                            </div>

                            <h3>6.2 The Art of Rolling: A Tactical Guide</h3>
                            <p>
                                Rolling is the process of closing an existing option position and simultaneously opening a new one with different
                                parameters (strike, expiration, or both). This is the primary tool for active position management in the wheel strategy.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h4 className="font-bold text-blue-800 mb-3">Defensive Rolling</h4>
                                    <ul className="text-blue-700 text-sm space-y-2">
                                        <li>• <strong>Roll down and out:</strong> Lower strike, extend time</li>
                                        <li>• <strong>When to use:</strong> Position moving against you</li>
                                        <li>• <strong>Goal:</strong> Reduce assignment probability</li>
                                        <li>• <strong>Rule:</strong> Always collect net credit</li>
                                    </ul>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h4 className="font-bold text-green-800 mb-3">Offensive Rolling</h4>
                                    <ul className="text-green-700 text-sm space-y-2">
                                        <li>• <strong>Roll up and out:</strong> Higher strike, extend time</li>
                                        <li>• <strong>When to use:</strong> Position profitable, want more premium</li>
                                        <li>• <strong>Goal:</strong> Maximize income and capital efficiency</li>
                                        <li>• <strong>Rule:</strong> Maintain favorable risk/reward</li>
                                    </ul>
                                </div>
                            </div>

                            <h3>6.3 Position Sizing and Portfolio Integration</h3>
                            <p>
                                Never allocate more than 5-10% of your portfolio to any single wheel position. The strategy requires significant
                                capital commitment, so diversification across multiple quality names is essential. Consider the wheel as one
                                component of a broader investment strategy, not a complete portfolio solution.
                            </p>
                        </div>
                    </section>

                    {/* Section 7: Strategy Comparison Matrix */}
                    <section id="comparison" className="p-8 bg-white rounded-xl border border-gray-200 shadow-md">
                        <SectionHeader title="Strategy Comparison Matrix">
                            <TrendingUp className="h-6 w-6 mr-3 text-indigo-600" />
                        </SectionHeader>

                        <div className="space-y-6">
                            <p className="text-gray-600 text-lg">
                                Understanding how the wheel strategy compares to other investment approaches helps clarify when and why to use it.
                            </p>

                            <StyledTable headers={comparisonMatrixHeaders} data={comparisonMatrixData} />

                            <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                                <h4 className="font-bold text-indigo-800 mb-2">Key Insight</h4>
                                <p className="text-indigo-700">
                                    The wheel strategy is optimal for investors who want active income generation, are comfortable with capped upside,
                                    and have strong conviction in their stock selection. It&apos;s particularly effective in neutral to mildly bullish markets
                                    where traditional buy-and-hold may underperform.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Conclusion */}
                    <section className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-md">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">A Marathon, Not a Sprint</h2>
                        <p className="max-w-3xl mx-auto text-lg text-gray-600">
                            The Options Wheel is a powerful method for long-term portfolio enhancement, blending value investing with active income generation.
                            By following a disciplined, systematic plan based on quality underlyers, rules-based execution, and active risk management, you can
                            transform this strategy into a core component of a sophisticated investment portfolio.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="text-sm text-gray-500 italic">
                                    Remember: This strategy requires patience, discipline, and continuous learning. Success comes from consistent execution
                                    of proven principles, not from trying to time the market or chase quick profits.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </ArticleFrame>
    );
}
