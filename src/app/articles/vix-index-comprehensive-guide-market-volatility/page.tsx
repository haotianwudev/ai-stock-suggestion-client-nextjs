'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, AlertTriangle, BarChart3, Target } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Helper Components for Styling ---
const MainHeading = ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 text-center leading-tight">
        {children}
    </h1>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-12 mb-6 border-b-2 border-indigo-500 pb-2">
        {children}
    </h2>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mt-8 mb-4">
        {children}
    </h3>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        {children}
    </p>
);

// InfoBox for highlighting key concepts
const InfoBox = ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'success' }) => {
    const baseClasses = "p-5 rounded-xl my-6 shadow-md border-l-4";
    const typeClasses = {
        info: "bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-800 dark:text-blue-200",
        warning: "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-500 text-yellow-800 dark:text-yellow-200",
        success: "bg-green-50 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200",
    };

    return <div className={`${baseClasses} ${typeClasses[type]}`}>{children}</div>;
};

// Highlighted text for key terms
const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="font-bold text-indigo-600 dark:text-indigo-400">{children}</span>
);

const StyledTable = ({ headers, data }: { headers: string[]; data: string[][] }) => (
    <div className="overflow-x-auto rounded-lg shadow-lg my-8">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-200 dark:bg-gray-700 text-xs uppercase text-gray-700 dark:text-gray-200">
                <tr>
                    {headers.map((header) => (
                        <th key={header} scope="col" className="px-6 py-4 font-bold tracking-wider">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800 even:bg-gray-50 dark:even:bg-gray-800/50 hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-6 py-4">
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// --- Section Components ---
const Introduction = () => (
    <section>
        <SectionHeading>I. Introduction: Demystifying the Market's "Fear Gauge"</SectionHeading>
        <Paragraph>
            The Cboe Volatility Index, universally known by its ticker symbol VIX, has become one of the most closely watched indicators in modern finance. While it is popularly dubbed the "Fear Gauge" or "Fear Index," this moniker, though evocative, only scratches the surface of its true function and significance. The VIX is a sophisticated, real-time market index that represents the market's expectation of <Highlight>30-day forward-looking volatility</Highlight> for the S&P 500 Index (SPX). Its primary value lies in this predictive nature; it is not a record of past events but a dynamic, up-to-the-minute snapshot of anticipated future price movements.
        </Paragraph>

        <SubHeading>The VIX as a Forward-Looking Measure vs. Historical Volatility</SubHeading>
        <Paragraph>
            To grasp the utility of the VIX, it is essential to distinguish it from historical volatility. Historical, or "realized," volatility is a backward-looking metric. It is calculated by taking the standard deviation of past price movements over a specific period, providing a statistical measure of how much the market *has* fluctuated. The VIX, in contrast, measures <Highlight>implied volatility</Highlight> (IV). This is a forward-looking value inferred directly from the current market prices of SPX options.
        </Paragraph>

        <SubHeading>A Look Inside the Engine: How the VIX is Calculated</SubHeading>
        <Paragraph>
            The VIX calculation is mathematically complex but conceptually represents a weighted average of the prices of a wide range of SPX options. It specifically uses near-term, out-of-the-money puts and calls to gauge the market's collective forecast. Think of it as an "auction" for insurance: when demand for protection (options) is high, their prices rise, and thus the VIX increases. This is a model-free approach, meaning it doesn't rely on theoretical models like Black-Scholes, making it a pure reflection of market prices.
        </Paragraph>

        <InfoBox type="info">
            <p className="font-bold mb-2">Key Takeaway:</p>
            The VIX isn't measuring past price swings; it's measuring the <Highlight>cost of insurance against future price swings</Highlight>. A higher cost means the market anticipates more turbulence.
        </InfoBox>
    </section>
);

const VixLevelsSentiment = () => {
    const tableHeaders = ["VIX Level Range", "Market Sentiment & Environment", "Investor Behavior & Psychology", "Strategic Implication"];
    const tableData = [
        ["Below 15", "Deep Calm / Complacency", "Low demand for hedging; high confidence; potential for over-leveraging.", "Market may be vulnerable to unexpected shocks. Contrarians may consider adding hedges."],
        ["15 - 20", "Normal / Stable", "Typical of a healthy bull market with standard optimism.", "Generally considered a stable environment for long-term equity exposure."],
        ["20 - 30", "Heightened Uncertainty", "Fear is rising; investors begin actively seeking protection.", "Increased caution is warranted. Portfolio managers may begin reducing risk exposure."],
        ["Above 30", "High Fear / Panic", "Significant market stress and turbulence. Widespread demand for downside protection.", "For contrarians, this signals a potential buying opportunity as fear peaks."]
    ];

    return (
        <section>
            <SectionHeading>II. Decoding VIX Levels and Market Sentiment</SectionHeading>
            <Paragraph>
                The numerical value of the VIX provides a quantifiable estimate of expected market movement. A VIX reading of 20 implies that the market expects the S&P 500 to move within a range of <Highlight>plus or minus 20%</Highlight> over the next year, with 68% probability (one standard deviation).
            </Paragraph>

            <SubHeading>The VIX as a Contrarian Indicator</SubHeading>
            <Paragraph>
                One of the most powerful applications of the VIX is its use as a contrarian indicator, rooted in the adage: <Highlight>"When the VIX is high, it's time to buy. When the VIX is low, look out below!"</Highlight>. An extremely elevated VIX signifies widespread fear and potential market capitulation, often marking a buying opportunity. Conversely, an extremely low VIX indicates investor complacency, which can precede market downturns as systemic risk accumulates beneath the surface.
            </Paragraph>

            <SubHeading>VIX Level Sentiment Guide</SubHeading>
            <StyledTable headers={tableHeaders} data={tableData} />
        </section>
    );
};

const VixSp500Relationship = () => {
    const tableHeaders = ["Event", "Date of VIX Peak", "Peak VIX Level", "Context & S&P 500 Action"];
    const tableData = [
        ["2008 Global Financial Crisis", "Nov 20, 2008", "80.86", "Lehman Brothers bankruptcy triggered a systemic credit freeze and severe bear market."],
        ["U.S. Debt Downgrade", "Aug 8, 2011", "48.00", "S&P's downgrade of U.S. credit rating sparked fears over sovereign debt and caused a sharp decline."],
        ["Brexit Referendum", "June 24, 2016", "25.80", "The unexpected \"Leave\" vote triggered profound uncertainty and a global market sell-off."],
        ["COVID-19 Pandemic Crash", "Mar 16, 2020", "82.69", "Prospect of global economic shutdowns caused the fastest bear market decline in history."]
    ];

    return (
        <section>
            <SectionHeading>III. The Intricate Dance: Analyzing the VIX and S&P 500 Relationship</SectionHeading>

            <SubHeading>The Foundation: Understanding the Strong Inverse Correlation</SubHeading>
            <Paragraph>
                Historically, the VIX and the S&P 500 exhibit a strong negative correlation (typically between -0.70 and -0.90). This phenomenon, known as the <Highlight>asymmetric volatility feedback loop</Highlight>, is driven by investor psychology. When the S&P 500 declines, fear of further losses prompts a rush to purchase protective put options. This surge in demand inflates option premiums, which in turn fuels a spike in the VIX. When the market rises, this fear subsides, demand for puts diminishes, and the VIX naturally drifts lower.
            </Paragraph>

            <SubHeading>When the Rules Bend: Scenarios of Positive Correlation</SubHeading>
            <Paragraph>
                Despite the strong inverse relationship, the VIX and S&P 500 move in the same direction on about 20% of trading days. This can happen in a few key scenarios:
            </Paragraph>
            <ul className="list-disc list-inside text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed pl-4 space-y-2">
                <li><Highlight>Pre-Event Hedging:</Highlight> Before a major binary event like a Federal Reserve interest rate decision or a key inflation report, investors may buy protection (raising the VIX) even as the market drifts slightly higher in anticipation.</li>
                <li><Highlight>Orderly Sell-offs:</Highlight> Sometimes the market can decline in a slow, methodical way without a sense of panic. In this case, the market falls, but the demand for "crash protection" doesn't spike, so the VIX can also fall or stay flat.</li>
            </ul>

            <SubHeading>Historical VIX Spikes and Corresponding Market Events</SubHeading>
            <StyledTable headers={tableHeaders} data={tableData} />
        </section>
    );
};

const VixInvestorToolkit = () => (
    <section>
        <SectionHeading>IV. The VIX as an Investor's Toolkit</SectionHeading>

        <SubHeading>Using the VIX as a Real-Time Risk Barometer</SubHeading>
        <Paragraph>
            The VIX serves as an invaluable real-time barometer of market risk. A sharply rising VIX can be an early warning for investors to review their portfolio's risk exposure, perhaps by tightening stop-losses or reducing margin debt. More importantly, understanding that VIX spikes are often temporary, emotional overreactions can provide the psychological fortitude to <Highlight>avoid panic selling</Highlight> at market bottoms.
        </Paragraph>

        <SubHeading>Informing Strategic and Tactical Asset Allocation</SubHeading>
        <Paragraph>
            The VIX provides clear signals for tactical shifts between "risk-on" and "risk-off" postures. A high and rising VIX environment suggests reducing exposure to high-beta equities and increasing allocations to defensive assets like Treasury bonds, gold, or consumer staples. Conversely, a low and stable VIX environment supports higher allocations to growth stocks and other risk assets, though it also signals a time for disciplined rebalancing to take profits.
        </Paragraph>

        <SubHeading>Identifying Potential Market Tops and Bottoms</SubHeading>
        <Paragraph>
            While not a perfect timing tool, extreme VIX levels are powerful indicators of probable market reversals. Extreme spikes (e.g., VIX &gt; 40) often coincide with major market bottoms, as they represent peak fear and forced selling. Unusually low levels (e.g., VIX &lt; 15) for extended periods can signal that the market is overbought, complacent, and vulnerable to a correction.
        </Paragraph>

        <InfoBox type="success">
            <p className="font-bold mb-2">Pro-Tip:</p>
            Don't just watch the VIX level; watch its <Highlight>rate of change</Highlight>. A sudden, sharp increase is often a more potent signal than a slow drift to the same level.
        </InfoBox>
    </section>
);

const AdvancedApplications = () => {
    const tableHeaders = ["Instrument", "Underlying Basis", "Primary Use Case", "Key Risks & Considerations", "Target User"];
    const tableData = [
        ["VIX Futures (/VX)", "VIX Index (at settlement)", "Hedging, Speculation", "High leverage, margin requirements, contango/backwardation.", "Institutional, Professional Traders"],
        ["VIX Options", "VIX Futures Contracts", "Hedging, Speculation (defined risk)", "Complex pricing, theta decay, priced off futures not spot VIX.", "Advanced Individual Traders"],
        ["VIX ETPs (VXX, VIXY)", "VIX Futures Contracts", "Short-term tactical exposure", "Severe contango decay (performance drag), not a long-term hold.", "Retail, Tactical Traders"]
    ];

    return (
        <section>
            <SectionHeading>V. Advanced Applications: Leveraging the VIX</SectionHeading>
            <Paragraph>
                For sophisticated investors, the VIX ecosystem offers derivative products for direct trading of volatility. It is crucial to understand that <Highlight>the VIX index itself is not a tradable asset</Highlight>. Exposure must be gained through products that track VIX futures.
            </Paragraph>

            <InfoBox type="warning">
                <p className="font-bold mb-2">Critical Warning: Contango & Backwardation</p>
                <p>VIX futures products are subject to the dynamics of the futures curve. Usually, the curve is in <Highlight>contango</Highlight> (future months' prices are higher than the current month). This creates a "roll cost" for long-volatility ETPs like VXX, leading to a steady decay in their value over time. In times of stress, the curve can flip to <Highlight>backwardation</Highlight> (future prices are lower), which benefits these products. This decay makes them unsuitable for long-term holding.</p>
            </InfoBox>

            <SubHeading>Comparison of VIX Trading Instruments</SubHeading>
            <StyledTable headers={tableHeaders} data={tableData} />

            <SubHeading>Hedging and Speculative Strategies with VIX Options</SubHeading>
            <ul className="list-disc list-inside text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed pl-4 space-y-2">
                <li><Highlight>Portfolio Hedge:</Highlight> An investor holding a large portfolio of stocks might buy VIX call options before an earnings season or economic report. If the market sells off sharply, the VIX will spike, and the value of the call options will increase, helping to offset some of the portfolio's losses.</li>
                <li><Highlight>Selling Premium:</Highlight> When the VIX is historically high (e.g., VIX Rank &gt; 70%), traders might sell an out-of-the-money put credit spread on an instrument like VXX. This is a bet that volatility will either fall or stay the same, allowing the trader to collect the inflated option premium.</li>
            </ul>
        </section>
    );
};

const VixRankAndPercentile = () => (
    <section>
        <SectionHeading>VI. Contextualizing Volatility: VIX Rank and Percentile</SectionHeading>
        <Paragraph>
            To determine if the current VIX level is "high" or "low" in a historical context, traders use metrics like IV Rank and IV Percentile. These tools are crucial for implementing strategies based on volatility's powerful tendency toward <Highlight>mean reversion</Highlight> (the idea that it will eventually return to its historical average).
        </Paragraph>

        <SubHeading>Defining IV Rank and Percentile</SubHeading>
        <ul className="list-disc list-inside text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed pl-4 space-y-2">
            <li><strong>IV Rank:</strong> Measures where the current VIX level stands in relation to its 52-week high-low range. The formula is: `(Current VIX - 52-Wk Low) / (52-Wk High - 52-Wk Low) * 100`. A rank of 100% means the VIX is at its yearly high.</li>
            <li><strong>IV Percentile:</strong> Calculates the percentage of trading days over the past year on which the VIX was lower than its current level. A percentile of 90% means the current VIX is higher than it was on 90% of the days in the past year.</li>
        </ul>

        <SubHeading>Using VIX Rank to Assess Trading Opportunities</SubHeading>
        <Paragraph>
            A high VIX Rank (e.g., above 70%) suggests volatility is historically elevated and likely to revert lower. This makes it an attractive environment for strategies that profit from falling volatility, such as <Highlight>selling options (e.g., credit spreads, iron condors)</Highlight>, as the premium collected is rich. A low VIX Rank (e.g., below 30%) suggests volatility is subdued and "cheap," presenting a better opportunity to purchase volatility as a hedge (e.g., buying puts or VIX calls).
        </Paragraph>
    </section>
);

// --- Main Page Component ---
export default function VixIndexPage() {
    const currentArticle = articles.find(article => article.slug === 'vix-index-comprehensive-guide-market-volatility');

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

            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 relative">

                        {/* Badges */}
                        <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                <BarChart3 className="w-3 h-3 mr-1" />
                                Deep Research
                            </span>
                        </div>

                        <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                                <Target className="w-3 h-3 mr-1" />
                                Options
                            </span>
                        </div>

                        {/* Return to Home Button */}
                        <div className="flex items-center gap-4 mb-4 mt-12">
                            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Return to Home
                            </Link>
                        </div>

                        <header>
                            <MainHeading>The VIX Index: A Comprehensive Guide</MainHeading>
                            <p className="text-center text-xl text-gray-500 dark:text-gray-400 mb-10">
                                Understanding and Utilizing Market Volatility
                            </p>
                        </header>

                        <Introduction />
                        <VixLevelsSentiment />
                        <VixSp500Relationship />
                        <VixInvestorToolkit />
                        <AdvancedApplications />
                        <VixRankAndPercentile />

                        <section className="mt-16 text-center border-t dark:border-gray-700 pt-8">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Conclusion</h2>
                            <Paragraph>
                                The VIX is far more than a simple "fear gauge." It is an indispensable, multi-faceted tool that provides a real-time window into the market's collective emotional state and expectations for future turmoil. For the retail investor, it serves as a powerful sentiment and risk-management guide. For the advanced trader, it opens up a world of sophisticated hedging and speculative strategies. When understood and applied with the nuance it deserves, the VIX can provide a significant analytical edge in navigating the inherent uncertainty of financial markets.
                            </Paragraph>
                        </section>

                        {/* Call to Action */}
                        <section className="mt-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                                Ready to Master Volatility Trading?
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                Explore more advanced options strategies and quantitative analysis on SOPHIE's Daddy Quant Blog
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {currentArticle?.googleDoc && (
                                    <a
                                        href={currentArticle.googleDoc}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
                                    >
                                        <TrendingUp className="inline mr-2" />
                                        Read Full Research
                                    </a>
                                )}
                                <Link
                                    href="/"
                                    className="inline-block bg-gray-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105"
                                >
                                    Explore More Articles
                                </Link>
                            </div>
                        </section>

                        {/* Educational Disclaimer */}
                        <section className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                            <div className="flex items-start">
                                <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                                <div>
                                    <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                                        Educational Disclaimer
                                    </h4>
                                    <p className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">
                                        This content is for educational and informational purposes only. Options trading involves substantial risk and is not suitable for all investors. Past performance does not guarantee future results. The VIX and volatility trading strategies discussed carry significant risks including total loss of capital. Always consult with a qualified financial advisor before making investment decisions.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </article>
                </main>

                <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
                    <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
                </footer>
            </div>
        </>
    );
}