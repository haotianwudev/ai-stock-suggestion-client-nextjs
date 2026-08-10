'use client';

import React from 'react';
import { TrendingUp, AlertTriangle, BarChart3, Target, Activity, Calculator, Eye, Zap, Brain, TrendingDown, Shield } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

const FeatureCard = ({ icon, title, description, color = "blue" }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    color?: "blue" | "purple" | "green" | "orange" | "red" | "cyan"
}) => {
    const colorClasses = {
        blue: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-900",
        purple: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-purple-900",
        green: "bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-900",
        orange: "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 text-orange-900",
        red: "bg-gradient-to-br from-red-50 to-red-100 border-red-200 text-red-900",
        cyan: "bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200 text-cyan-900"
    };

    return (
        <div className={`p-6 rounded-xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 ${colorClasses[color]}`}>
            <div className="flex items-center mb-3">
                <div className="mr-3">{icon}</div>
                <h3 className="text-lg font-bold font-serif">{title}</h3>
            </div>
            <p className="text-sm leading-relaxed">{description}</p>
        </div>
    );
};

const InfoBox = ({ children, type = 'info', icon }: {
    children: React.ReactNode;
    type?: 'info' | 'warning' | 'success' | 'tip';
    icon?: React.ReactNode;
}) => {
    const typeClasses = {
        info: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300 text-blue-900",
        warning: "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400 text-yellow-900",
        success: "bg-gradient-to-r from-green-50 to-emerald-50 border-[#1D8A70] dark:border-[#3CBF9C] text-green-900",
        tip: "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-400 text-purple-900"
    };

    return (
        <div className={`p-6 rounded-xl border-2 shadow-lg my-6 ${typeClasses[type]}`}>
            {icon && (
                <div className="flex items-center mb-3">
                    <div className="mr-3">{icon}</div>
                </div>
            )}
            {children}
        </div>
    );
};

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="font-bold text-[#A8672E] dark:text-[#D08F52] bg-[#A8672E]/10 dark:bg-[#D08F52]/10 px-2 py-1 rounded">{children}</span>
);

const CompactTable = ({ headers, data, colorScheme = "blue" }: {
    headers: string[];
    data: string[][];
    colorScheme?: "blue" | "purple" | "green" | "orange" | "cyan"
}) => {
    const colorClasses = {
        blue: "bg-[#A8672E] dark:bg-[#D08F52] text-white",
        purple: "bg-purple-600 text-white",
        green: "bg-[#1D8A70] dark:bg-[#3CBF9C] text-white",
        orange: "bg-[#BC4128] dark:bg-[#E2694A] text-white",
        cyan: "bg-cyan-600 text-white"
    };

    return (
        <div className="overflow-x-auto rounded-xl shadow-lg my-6 border border-gray-200">
            <table className="w-full text-sm">
                <thead className={`${colorClasses[colorScheme]}`}>
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#0A0D14]">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-4 py-3 text-gray-700">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const MetricCard = ({ value, label, description, color = "blue" }: {
    value: string;
    label: string;
    description: string;
    color?: "blue" | "purple" | "green" | "orange" | "red" | "cyan"
}) => {
    const colorClasses = {
        blue: "bg-[#A8672E] dark:bg-[#D08F52] text-white",
        purple: "bg-purple-600 text-white",
        green: "bg-[#1D8A70] dark:bg-[#3CBF9C] text-white",
        orange: "bg-[#BC4128] dark:bg-[#E2694A] text-white",
        red: "bg-[#BC4128] dark:bg-[#E2694A] text-white",
        cyan: "bg-cyan-600 text-white"
    };

    return (
        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colorClasses[color]} mb-4`}>
                <span className="text-2xl font-bold">{value}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">{label}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
};

const VolatilitySmileChart = () => (
    <div className="my-10 p-6 bg-white dark:bg-[#0A0D14] rounded-xl shadow-xl border border-gray-200">
        <h4 className="font-bold text-xl mb-4 text-gray-800 text-center">Volatility Smile &amp; Skew Patterns</h4>
        <div className="w-full" style={{ aspectRatio: '16/9' }}>
            <svg viewBox="0 0 400 250" className="w-full h-full" aria-labelledby="chartTitle">
                <title id="chartTitle">A chart showing the volatility smile and skew patterns.</title>
                <line x1="40" y1="220" x2="380" y2="220" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="40" y1="220" x2="40" y2="30" stroke="#9ca3af" strokeWidth="1.5" />
                <text x="35" y="235" textAnchor="end" fontSize="10" fill="#4b5563">Low IV</text>
                <text x="35" y="40" textAnchor="end" fontSize="10" fill="#4b5563">High IV</text>
                <text x="40" y="240" textAnchor="middle" fontSize="10" fill="#4b5563">OTM Put</text>
                <text x="210" y="240" textAnchor="middle" fontSize="10" fill="#4b5563">ATM</text>
                <text x="380" y="240" textAnchor="middle" fontSize="10" fill="#4b5563">OTM Call</text>
                <text x="210" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111827">Implied Volatility (σ)</text>
                <text x="390" y="225" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111827">Strike Price (K)</text>
                <path d="M 60 100 Q 210 200, 360 100" stroke="#06b6d4" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
                <text x="300" y="80" fontSize="12" fill="#06b6d4" fontWeight="bold">Smile</text>
                <path d="M 60 60 Q 180 150, 360 180" stroke="#f59e0b" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
                <text x="100" y="55" fontSize="12" fill="#f59e0b" fontWeight="bold">Skew (Smirk)</text>
            </svg>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
            Visual representation of a symmetrical <span className="text-cyan-600 font-semibold">volatility smile</span> (common in FX markets)
            and the asymmetrical <span className="text-amber-600 font-semibold">volatility skew/smirk</span> (dominant in equity markets),
            which reflects higher demand for downside protection.
        </p>
    </div>
);

const ParityFormula = () => (
    <div className="my-8 p-6 bg-gray-800 border-l-4 border-amber-400 rounded-r-lg shadow-lg">
        <h4 className="text-white font-bold text-lg mb-4 text-center">Put-Call Parity Formula</h4>
        <p className="text-center font-mono text-xl md:text-2xl text-gray-100 tracking-wider">
            C - P = S<sub>0</sub> - K e<sup>-rT</sup>
        </p>
        <p className="text-center text-sm text-gray-300 mt-4">
            Where: C = Call Price, P = Put Price, S₀ = Current Stock Price, K = Strike Price, r = Risk-free Rate, T = Time to Expiry
        </p>
    </div>
);

const Introduction = () => (
    <section className="space-y-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">The Market&apos;s Rejection of Black-Scholes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                How the volatility smile reveals the true nature of market risk and investor psychology
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
                icon={<Eye className="h-8 w-8 text-cyan-600" />}
                title="Implied Volatility"
                description="Market's forward-looking risk metric derived from option prices, not historical data."
                color="cyan"
            />
            <FeatureCard
                icon={<Calculator className="h-8 w-8 text-purple-600" />}
                title="Black-Scholes Failure"
                description="Constant volatility assumption creates flat IV curve - reality shows persistent smile patterns."
                color="purple"
            />
            <FeatureCard
                icon={<Activity className="h-8 w-8 text-[#BC4128] dark:text-[#E2694A]" />}
                title="Market Anomaly"
                description="Smile/skew patterns reveal non-normal returns, fat tails, and crash fears."
                color="orange"
            />
        </div>

        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">The Theoretical Foundation</h3>
            <p className="text-gray-700 mb-6">
                The study of stock options pricing is fundamentally a study of how markets quantify and price uncertainty.
                At the heart of this endeavor lies the concept of <Highlight>implied volatility</Highlight>, a metric that serves as
                the market&apos;s collective forecast of future price fluctuations.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-cyan-50 rounded-lg p-6">
                    <h4 className="font-bold text-cyan-900 mb-3">Implied Volatility Definition</h4>
                    <p className="text-cyan-800 text-sm">
                        Formally defined as the unique value of the volatility parameter, sigma (σ), which, when input into an option pricing model,
                        yields a theoretical price equal to its observed market price. Practitioners perform reverse engineering:
                        take market price as given and solve for the volatility using iterative methods like Newton-Raphson.
                    </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="font-bold text-purple-900 mb-3">Black-Scholes Prediction</h4>
                    <p className="text-purple-800 text-sm">
                        If BSM were perfect, implied volatility should be identical for all options on the same underlying,
                        irrespective of strike price or expiration. Plotting IV against strikes would produce a completely flat, horizontal line.
                    </p>
                </div>
            </div>
        </div>

        <InfoBox type="tip" icon={<Brain className="h-6 w-6 text-purple-600" />}>
            <div className="font-bold text-lg mb-2">Core Insight</div>
            <p>The volatility smile is the market&apos;s <Highlight>mathematical signature</Highlight> of non-constant volatility and non-normal returns. It&apos;s not a bug - it&apos;s a feature revealing true market dynamics.</p>
        </InfoBox>

        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Black-Scholes vs Market Reality</h3>
            <CompactTable
                headers={["BSM Assumption", "Market Reality", "Evidence"]}
                data={[
                    ["Constant Volatility", "Stochastic, strike-dependent volatility", "Volatility smile/skew patterns"],
                    ["Normal Returns", "Negative skew, fat tails", "Higher crash probabilities"],
                    ["Continuous Prices", "Jump risk, discontinuous moves", "Gap openings, news events"],
                    ["Frictionless Markets", "Bid-ask spreads, liquidity costs", "Wider spreads for OTM options"]
                ]}
                colorScheme="cyan"
            />
        </div>
    </section>
);

const SmilePatterns = () => (
    <section className="space-y-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Smile Morphology</h2>
            <p className="text-xl text-gray-600">Different markets, different fear patterns</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
                icon={<Activity className="h-8 w-8 text-[#A8672E] dark:text-[#D08F52]" />}
                title="Volatility Smile (FX)"
                description="Symmetrical U-shape. IV lowest at ATM, increases for both ITM and OTM options. Common in currency markets."
                color="blue"
            />
            <FeatureCard
                icon={<TrendingDown className="h-8 w-8 text-[#BC4128] dark:text-[#E2694A]" />}
                title="Volatility Skew (Equity)"
                description="Asymmetrical downward slope. OTM puts have much higher IV than OTM calls. Reflects crash fear."
                color="red"
            />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <MetricCard
                value="σ"
                label="Implied Volatility"
                description="Market's expectation of future price movement magnitude, derived from option prices."
                color="cyan"
            />
            <MetricCard
                value="K"
                label="Strike Price"
                description="Exercise price that determines option moneyness and position on volatility curve."
                color="blue"
            />
            <MetricCard
                value="T"
                label="Time to Expiry"
                description="Remaining time affects smile shape - term structure of volatility."
                color="purple"
            />
        </div>

        <InfoBox type="warning" icon={<AlertTriangle className="h-6 w-6 text-yellow-600" />}>
            <div className="font-bold text-lg mb-2">Post-1987 Crash Effect</div>
            <p>The equity volatility skew became pronounced after Black Monday 1987, creating permanent <Highlight>&ldquo;crash-o-phobia&rdquo;</Highlight> and structural demand for downside protection.</p>
        </InfoBox>

        <VolatilitySmileChart />
    </section>
);

const MarketForces = () => (
    <section className="space-y-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Economic Forces Behind the Smile</h2>
            <p className="text-xl text-gray-600">Supply, demand, and behavioral finance</p>
        </div>

        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">The Statistical Foundation</h3>
            <p className="text-gray-700 mb-6">
                The volatility smile is not random but a systematic pattern rooted in the fundamental properties of asset returns
                and investor behavior. Its existence can be deconstructed into three primary causal layers: the statistical failure
                of the log-normal distribution, the economic forces driven by investor psychology, and the structural frictions of market microstructure.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 rounded-lg p-6">
                    <h4 className="font-bold text-red-900 mb-3">Skew and Implied Skewness</h4>
                    <p className="text-red-800 text-sm">
                        The downward-sloping volatility skew is the direct manifestation of <Highlight>negative skewness</Highlight> in the implied PDF.
                        This means the market assigns a significantly higher probability to large, negative price moves (crashes) than to large positive ones.
                    </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="font-bold text-purple-900 mb-3">Smile and Implied Kurtosis</h4>
                    <p className="text-purple-800 text-sm">
                        The U-shape of a symmetrical smile implies a <Highlight>leptokurtic</Highlight> PDF&mdash;a distribution with &ldquo;fat tails.&rdquo;
                        This means the market assigns a higher probability to extreme outcomes than a normal distribution would suggest.
                    </p>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                    <Shield className="h-8 w-8 text-[#BC4128] dark:text-[#E2694A] mr-3" />
                    <h3 className="text-xl font-bold text-gray-900 font-serif">Demand Side: Fear Premium</h3>
                </div>
                <p className="text-gray-700 mb-4">
                    The 1987 crash instilled a lasting <Highlight>&ldquo;crash-o-phobia,&rdquo;</Highlight> creating structural demand for portfolio insurance.
                </p>
                <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                        <span className="text-[#BC4128] dark:text-[#E2694A] mr-2">•</span>
                        <span>Institutional portfolio insurance demand</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-[#BC4128] dark:text-[#E2694A] mr-2">•</span>
                        <span>Systematic OTM put buying for hedging</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-[#BC4128] dark:text-[#E2694A] mr-2">•</span>
                        <span>Behavioral bias toward crash protection</span>
                    </li>
                </ul>
            </div>

            <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                    <TrendingUp className="h-8 w-8 text-[#1D8A70] dark:text-[#3CBF9C] mr-3" />
                    <h3 className="text-xl font-bold text-gray-900 font-serif">Supply Side: Income Generation</h3>
                </div>
                <p className="text-gray-700 mb-4">
                    The supply of OTM call options is often more plentiful, partly from covered call writing strategies.
                </p>
                <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] mr-2">•</span>
                        <span>Covered call writing strategies</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] mr-2">•</span>
                        <span>Professional volatility sellers</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-[#1D8A70] dark:text-[#3CBF9C] mr-2">•</span>
                        <span>Market makers providing liquidity</span>
                    </li>
                </ul>
            </div>
        </div>

        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Advanced Modeling Approaches</h3>
            <p className="text-gray-700 mb-6">
                To account for these realities, quantitative analysts use more sophisticated models that explicitly allow for non-constant volatility and sudden price jumps.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-lg p-6">
                    <h4 className="font-bold text-blue-900 mb-3">Stochastic Volatility Models</h4>
                    <p className="text-blue-800 text-sm mb-2">
                        <strong>Heston Model:</strong> Square-root process for volatility with mean reversion and correlation to underlying price movements.
                    </p>
                    <p className="text-blue-800 text-sm">
                        <strong>SABR Model:</strong> Stochastic Alpha Beta Rho model specifically designed for interest rate and FX smile modeling.
                    </p>
                </div>
                <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-lg p-6">
                    <h4 className="font-bold text-green-900 mb-3">Jump-Diffusion Models</h4>
                    <p className="text-green-800 text-sm">
                        <strong>Merton Model:</strong> Incorporates sudden, discontinuous jumps in asset prices, especially around news events.
                        This jump risk contributes to fat tails in the return distribution.
                    </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="font-bold text-purple-900 mb-3">Local Volatility</h4>
                    <p className="text-purple-800 text-sm">
                        <strong>Dupire Model:</strong> Makes volatility a deterministic function of spot price and time,
                        calibrated to match the entire volatility surface.
                    </p>
                </div>
            </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-200">
            <h3 className="text-2xl font-bold text-purple-900 mb-4 font-serif">Statistical Reality Check</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-bold text-purple-800 mb-2">Negative Skewness</h4>
                    <p className="text-purple-700 text-sm">Market assigns higher probability to large negative moves than positive ones of equal magnitude.</p>
                </div>
                <div>
                    <h4 className="font-bold text-purple-800 mb-2">Excess Kurtosis</h4>
                    <p className="text-purple-700 text-sm">Fat tails - extreme events occur more frequently than normal distribution predicts.</p>
                </div>
            </div>
        </div>
    </section>
);

const TradingImplications = () => (
    <section className="space-y-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Trading &amp; Risk Management</h2>
            <p className="text-xl text-gray-600">Practical applications for sophisticated investors</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
                icon={<Eye className="h-8 w-8 text-[#A8672E] dark:text-[#D08F52]" />}
                title="Sentiment Analysis"
                description="Steep skew = high fear. Flat smile = complacency. Use as market sentiment barometer."
                color="blue"
            />
            <FeatureCard
                icon={<Calculator className="h-8 w-8 text-[#1D8A70] dark:text-[#3CBF9C]" />}
                title="Advanced Greeks"
                description="Vanna, Volga, and higher-order sensitivities for smile risk management."
                color="green"
            />
            <FeatureCard
                icon={<Target className="h-8 w-8 text-purple-600" />}
                title="Arbitrage Opportunities"
                description="Relative value trades exploiting smile inconsistencies across strikes and expirations."
                color="purple"
            />
        </div>

        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">The Smile as Market Sentiment Barometer</h3>
            <p className="text-gray-700 mb-6">
                The shape of the smile provides a rich, real-time snapshot of the market&apos;s collective fears and expectations.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-amber-50 rounded-lg p-6">
                    <h4 className="font-bold text-amber-900 mb-3">Steep Negative Skew</h4>
                    <p className="text-amber-800 text-sm">
                        Indicates high &ldquo;fear,&rdquo; strong demand for downside protection, and high perceived crash risk.
                        Often seen during market stress periods.
                    </p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-6">
                    <h4 className="font-bold text-cyan-900 mb-3">Pronounced Symmetrical Smile</h4>
                    <p className="text-cyan-800 text-sm">
                        Suggests the market anticipates a large price move but is uncertain about the direction
                        (e.g., ahead of an earnings announcement or major economic event).
                    </p>
                </div>
                <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-lg p-6">
                    <h4 className="font-bold text-green-900 mb-3">Flattening Skew/Smile</h4>
                    <p className="text-green-800 text-sm">
                        Can signal market complacency or a reduction in the perceived risk of extreme events.
                        May indicate overconfidence in market stability.
                    </p>
                </div>
            </div>
        </div>

        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Advanced Risk Management: Beyond Delta</h3>
            <p className="text-gray-700 mb-6">
                The smile introduces &ldquo;smile risk.&rdquo; A trader who is perfectly delta-hedged is still making an unhedged bet on the
                stability of the smile&apos;s shape. To manage this, practitioners rely on higher-order risk sensitivities.
            </p>
            <CompactTable
                headers={["Greek", "Measures", "Application"]}
                data={[
                    ["Vega", "IV sensitivity", "Overall volatility exposure"],
                    ["Vanna", "Delta-IV sensitivity", "Skew shift risk"],
                    ["Volga", "Vega-IV sensitivity", "Smile curvature risk"],
                    ["Charm", "Delta-time decay", "Smile evolution over time"]
                ]}
                colorScheme="purple"
            />
        </div>

        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Professional Implementation Framework</h3>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-lg p-6">
                    <h4 className="font-bold text-blue-900 mb-3">Data Infrastructure</h4>
                    <ul className="text-blue-800 text-sm space-y-2">
                        <li>• Real-time options chain feeds</li>
                        <li>• Historical volatility surfaces</li>
                        <li>• Market microstructure data</li>
                        <li>• Cross-asset correlation matrices</li>
                    </ul>
                </div>
                <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-lg p-6">
                    <h4 className="font-bold text-green-900 mb-3">Execution Systems</h4>
                    <ul className="text-green-800 text-sm space-y-2">
                        <li>• Low-latency order management</li>
                        <li>• Dynamic hedging algorithms</li>
                        <li>• Risk monitoring dashboards</li>
                        <li>• Automated rebalancing systems</li>
                    </ul>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="font-bold text-purple-900 mb-3">Analytics Platform</h4>
                    <ul className="text-purple-800 text-sm space-y-2">
                        <li>• Volatility surface modeling</li>
                        <li>• Greeks calculation engines</li>
                        <li>• P&amp;L attribution systems</li>
                        <li>• Scenario analysis tools</li>
                    </ul>
                </div>
            </div>
        </div>

        <InfoBox type="success" icon={<Zap className="h-6 w-6 text-[#1D8A70] dark:text-[#3CBF9C]" />}>
            <div className="font-bold text-lg mb-2">Key Trading Insight</div>
            <p>The smile is not a market inefficiency to exploit, but a <Highlight>rational pricing mechanism</Highlight> reflecting true market dynamics. Trade with it, not against it.</p>
        </InfoBox>

        <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Put-Call Parity: The Unifying Principle</h3>
            <p className="text-gray-700 mb-6">
                Despite different market forces affecting puts and calls, their prices are bound by a fundamental no-arbitrage relationship.
                This ensures that implied volatility for puts and calls with the same strike and expiration must be identical.
            </p>
            <ParityFormula />
            <p className="text-gray-700 mt-6">
                This relationship prevents separate volatility smiles for puts and calls, creating a unified curve that reflects
                the market&apos;s true assessment of risk across all strike prices. While market forces create the overall shape of the smile,
                put-call parity ensures that for any given strike, the smile is a single, unified curve.
            </p>
        </div>
    </section>
);

export default function VolatilitySmileAnalysis() {
    return (
        <ArticleFrame
            slug="volatility-smile-quantitative-analysis-market-structure-sentiment-arbitrage"
            additionalDisclaimer="Options trading involves substantial risk and is not suitable for all investors. Volatility smile arbitrage strategies require sophisticated mathematical modeling and significant capital."
        >
            <div className="max-w-4xl mx-auto px-4 text-gray-900">
                <InfographicSlot alt="Volatility Smile Quantitative Analysis Infographic" />

                <div className="space-y-20">
                    <Introduction />
                    <SmilePatterns />
                    <MarketForces />
                    <TradingImplications />

                    <section className="text-center bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-12 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">The Smile Reveals Market Truth</h2>
                        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                            The volatility smile is the market&apos;s definitive rejection of Black-Scholes assumptions. It&apos;s a sophisticated pricing mechanism that captures the true nature of market risk: non-normal returns, crash fears, and the complex interplay of supply and demand in options markets. Understanding the smile is essential for modern quantitative finance.
                        </p>
                    </section>
                </div>
            </div>
        </ArticleFrame>
    );
}
