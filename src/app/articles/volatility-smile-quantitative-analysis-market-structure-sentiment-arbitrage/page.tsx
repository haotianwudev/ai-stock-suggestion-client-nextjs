'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, AlertTriangle, BarChart3, Target, Maximize2, Activity, Calculator, Eye, Zap, Brain, TrendingDown, Shield } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- Modern Card Components ---
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
                <h3 className="text-lg font-bold">{title}</h3>
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
        success: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 text-green-900",
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
    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{children}</span>
);

const CompactTable = ({ headers, data, colorScheme = "blue" }: { 
    headers: string[]; 
    data: string[][]; 
    colorScheme?: "blue" | "purple" | "green" | "orange" | "cyan"
}) => {
    const colorClasses = {
        blue: "bg-blue-600 text-white",
        purple: "bg-purple-600 text-white", 
        green: "bg-green-600 text-white",
        orange: "bg-orange-600 text-white",
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
                <tbody className="bg-white">
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
        blue: "bg-blue-600 text-white",
        purple: "bg-purple-600 text-white",
        green: "bg-green-600 text-white",
        orange: "bg-orange-600 text-white",
        red: "bg-red-600 text-white",
        cyan: "bg-cyan-600 text-white"
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colorClasses[color]} mb-4`}>
                <span className="text-2xl font-bold">{value}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{label}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
};

// Original components from the previous version
const VolatilitySmileChart = () => (
    <div className="my-10 p-6 bg-white rounded-xl shadow-xl border border-gray-200">
        <h4 className="font-bold text-xl mb-4 text-gray-800 text-center">Volatility Smile & Skew Patterns</h4>
        <div className="w-full" style={{ aspectRatio: '16/9' }}>
            <svg viewBox="0 0 400 250" className="w-full h-full" aria-labelledby="chartTitle">
                <title id="chartTitle">A chart showing the volatility smile and skew patterns.</title>
                {/* Axes */}
                <line x1="40" y1="220" x2="380" y2="220" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="40" y1="220" x2="40" y2="30" stroke="#9ca3af" strokeWidth="1.5" />
                {/* Ticks and Labels */}
                <text x="35" y="235" textAnchor="end" fontSize="10" fill="#4b5563">Low IV</text>
                <text x="35" y="40" textAnchor="end" fontSize="10" fill="#4b5563">High IV</text>
                <text x="40" y="240" textAnchor="middle" fontSize="10" fill="#4b5563">OTM Put</text>
                <text x="210" y="240" textAnchor="middle" fontSize="10" fill="#4b5563">ATM</text>
                <text x="380" y="240" textAnchor="middle" fontSize="10" fill="#4b5563">OTM Call</text>
                <text x="210" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111827">Implied Volatility (σ)</text>
                <text x="390" y="225" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111827">Strike Price (K)</text>
                {/* Smile Curve */}
                <path d="M 60 100 Q 210 200, 360 100" stroke="#06b6d4" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
                <text x="300" y="80" fontSize="12" fill="#06b6d4" fontWeight="bold">Smile</text>
                {/* Skew Curve */}
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

// --- Content Sections ---
const Introduction = () => (
    <section className="space-y-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Market's Rejection of Black-Scholes</h2>
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
                icon={<Activity className="h-8 w-8 text-orange-600" />}
                title="Market Anomaly"
                description="Smile/skew patterns reveal non-normal returns, fat tails, and crash fears."
                color="orange"
            />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">The Theoretical Foundation</h3>
            <p className="text-gray-700 mb-6">
                The study of stock options pricing is fundamentally a study of how markets quantify and price uncertainty. 
                At the heart of this endeavor lies the concept of <Highlight>implied volatility</Highlight>, a metric that serves as 
                the market's collective forecast of future price fluctuations.
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
            <p>The volatility smile is the market's <Highlight>mathematical signature</Highlight> of non-constant volatility and non-normal returns. It's not a bug - it's a feature revealing true market dynamics.</p>
        </InfoBox>

        <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Black-Scholes vs Market Reality</h3>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Smile Morphology</h2>
            <p className="text-xl text-gray-600">Different markets, different fear patterns</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
                icon={<Activity className="h-8 w-8 text-blue-600" />}
                title="Volatility Smile (FX)"
                description="Symmetrical U-shape. IV lowest at ATM, increases for both ITM and OTM options. Common in currency markets."
                color="blue"
            />
            <FeatureCard
                icon={<TrendingDown className="h-8 w-8 text-red-600" />}
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
            <p>The equity volatility skew became pronounced after Black Monday 1987, creating permanent <Highlight>"crash-o-phobia"</Highlight> and structural demand for downside protection.</p>
        </InfoBox>

        <VolatilitySmileChart />
    </section>
);

const MarketForces = () => (
    <section className="space-y-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Economic Forces Behind the Smile</h2>
            <p className="text-xl text-gray-600">Supply, demand, and behavioral finance</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">The Statistical Foundation</h3>
            <p className="text-gray-700 mb-6">
                The volatility smile is not random but a systematic pattern rooted in the fundamental properties of asset returns 
                and investor behavior. Its existence can be deconstructed into three primary causal layers: the statistical failure 
                of the log-normal distribution, the economic forces driven by investor psychology, and the structural frictions of market microstructure.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 rounded-lg p-6">
                    <h4 className="font-bold text-red-900 mb-3">Skew and Implied Skewness</h4>
                    <p className="text-red-800 text-sm">
                        The downward-sloping volatility skew is the direct manifestation of <Highlight>negative skewness</Highlight> in the implied PDF. 
                        This means the market assigns a significantly higher probability to large, negative price moves (crashes) than to large positive ones.
                    </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="font-bold text-purple-900 mb-3">Smile and Implied Kurtosis</h4>
                    <p className="text-purple-800 text-sm">
                        The U-shape of a symmetrical smile implies a <Highlight>leptokurtic</Highlight> PDF—a distribution with "fat tails." 
                        This means the market assigns a higher probability to extreme outcomes than a normal distribution would suggest.
                    </p>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                    <Shield className="h-8 w-8 text-red-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Demand Side: Fear Premium</h3>
                </div>
                <p className="text-gray-700 mb-4">
                    The 1987 crash instilled a lasting <Highlight>"crash-o-phobia,"</Highlight> creating structural demand for portfolio insurance.
                </p>
                <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span>Institutional portfolio insurance demand</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span>Systematic OTM put buying for hedging</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span>Behavioral bias toward crash protection</span>
                    </li>
                </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                    <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Supply Side: Income Generation</h3>
                </div>
                <p className="text-gray-700 mb-4">
                    The supply of OTM call options is often more plentiful, partly from covered call writing strategies.
                </p>
                <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Covered call writing strategies</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Professional volatility sellers</span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Market makers providing liquidity</span>
                    </li>
                </ul>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Advanced Modeling Approaches</h3>
            <p className="text-gray-700 mb-6">
                To account for these realities, quantitative analysts use more sophisticated models that explicitly allow for non-constant volatility and sudden price jumps.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-bold text-blue-900 mb-3">Stochastic Volatility Models</h4>
                    <p className="text-blue-800 text-sm mb-2">
                        <strong>Heston Model:</strong> Square-root process for volatility with mean reversion and correlation to underlying price movements.
                    </p>
                    <p className="text-blue-800 text-sm">
                        <strong>SABR Model:</strong> Stochastic Alpha Beta Rho model specifically designed for interest rate and FX smile modeling.
                    </p>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
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
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Statistical Reality Check</h3>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trading & Risk Management</h2>
            <p className="text-xl text-gray-600">Practical applications for sophisticated investors</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
                icon={<Eye className="h-8 w-8 text-blue-600" />}
                title="Sentiment Analysis"
                description="Steep skew = high fear. Flat smile = complacency. Use as market sentiment barometer."
                color="blue"
            />
            <FeatureCard
                icon={<Calculator className="h-8 w-8 text-green-600" />}
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

        <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">The Smile as Market Sentiment Barometer</h3>
            <p className="text-gray-700 mb-6">
                The shape of the smile provides a rich, real-time snapshot of the market's collective fears and expectations.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-amber-50 rounded-lg p-6">
                    <h4 className="font-bold text-amber-900 mb-3">Steep Negative Skew</h4>
                    <p className="text-amber-800 text-sm">
                        Indicates high "fear," strong demand for downside protection, and high perceived crash risk. 
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
                <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-bold text-green-900 mb-3">Flattening Skew/Smile</h4>
                    <p className="text-green-800 text-sm">
                        Can signal market complacency or a reduction in the perceived risk of extreme events. 
                        May indicate overconfidence in market stability.
                    </p>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Advanced Risk Management: Beyond Delta</h3>
            <p className="text-gray-700 mb-6">
                The smile introduces "smile risk." A trader who is perfectly delta-hedged is still making an unhedged bet on the 
                stability of the smile's shape. To manage this, practitioners rely on higher-order risk sensitivities.
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

        <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Implementation Framework</h3>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-bold text-blue-900 mb-3">Data Infrastructure</h4>
                    <ul className="text-blue-800 text-sm space-y-2">
                        <li>• Real-time options chain feeds</li>
                        <li>• Historical volatility surfaces</li>
                        <li>• Market microstructure data</li>
                        <li>• Cross-asset correlation matrices</li>
                    </ul>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
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
                        <li>• P&L attribution systems</li>
                        <li>• Scenario analysis tools</li>
                    </ul>
                </div>
            </div>
        </div>

        <InfoBox type="success" icon={<Zap className="h-6 w-6 text-green-600" />}>
            <div className="font-bold text-lg mb-2">Key Trading Insight</div>
            <p>The smile is not a market inefficiency to exploit, but a <Highlight>rational pricing mechanism</Highlight> reflecting true market dynamics. Trade with it, not against it.</p>
        </InfoBox>

        <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Put-Call Parity: The Unifying Principle</h3>
            <p className="text-gray-700 mb-6">
                Despite different market forces affecting puts and calls, their prices are bound by a fundamental no-arbitrage relationship. 
                This ensures that implied volatility for puts and calls with the same strike and expiration must be identical.
            </p>
            <ParityFormula />
            <p className="text-gray-700 mt-6">
                This relationship prevents separate volatility smiles for puts and calls, creating a unified curve that reflects 
                the market's true assessment of risk across all strike prices. While market forces create the overall shape of the smile, 
                put-call parity ensures that for any given strike, the smile is a single, unified curve.
            </p>
        </div>
    </section>
);

export default function VolatilitySmileAnalysis() {
    const currentArticle = articles.find(article => article.slug === 'volatility-smile-quantitative-analysis-market-structure-sentiment-arbitrage');
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

    return (
        <>
            {/* SEO Components - MANDATORY */}
            {currentArticle && currentArticle.title && currentArticle.slug && (
                <>
                    <StructuredData article={currentArticle} />
                    <BreadcrumbStructuredData
                        articleTitle={currentArticle.title}
                        articleSlug={currentArticle.slug}
                    />
                </>
            )}

            <div className="bg-gray-50 min-h-screen font-sans">
                {/* Return to Home Button */}
                <div className="max-w-6xl mx-auto px-6 pt-8">
                    <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Return to Home
                    </Link>
                </div>

                {/* Hero Section with Title */}
                <div className="bg-white relative overflow-hidden border-b border-slate-100">
                    <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 relative z-10">
                        {/* Badges */}
                        <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                <BarChart3 className="w-3 h-3 mr-1" />
                                Deep Research
                            </span>
                        </div>

                        <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                <Target className="w-3 h-3 mr-1" />
                                Options
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                            The Volatility Smile
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-4xl font-light">
                            A Quantitative Analysis of Market Structure, Sentiment, and Arbitrage
                        </p>
                    </div>
                </div>

                {/* Hero Infographic - Below Title with Full-Screen Capability */}
                {currentArticle?.imageUrl && (
                    <section className="max-w-6xl mx-auto px-6 pt-12 pb-8">
                        <div 
                            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
                            onClick={() => setIsImageViewerOpen(true)}
                        >
                            <img 
                                src={currentArticle.imageUrl} 
                                alt="Volatility Smile Quantitative Analysis Infographic" 
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
                        alt="Volatility Smile Quantitative Analysis Infographic"
                        isOpen={isImageViewerOpen}
                        onClose={() => setIsImageViewerOpen(false)}
                    />
                )}

                {/* Main Content Starts Here */}
                <main className="max-w-6xl mx-auto px-6 py-16">
                    <div className="space-y-20">
                        <Introduction />
                        <SmilePatterns />
                        <MarketForces />
                        <TradingImplications />

                        {/* Conclusion */}
                        <section className="text-center bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-12 shadow-lg">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Smile Reveals Market Truth</h2>
                            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                                The volatility smile is the market's definitive rejection of Black-Scholes assumptions. It's a sophisticated pricing mechanism that captures the true nature of market risk: non-normal returns, crash fears, and the complex interplay of supply and demand in options markets. Understanding the smile is essential for modern quantitative finance.
                            </p>
                        </section>

                        {/* Call to Action */}
                        <section className="text-center bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl p-12 text-white shadow-xl">
                            <h3 className="text-3xl font-bold mb-4">Master Advanced Options Theory</h3>
                            <p className="text-xl mb-8 opacity-90">
                                Dive deeper into quantitative finance and volatility modeling
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {currentArticle?.googleDoc && (
                                    <a
                                        href={currentArticle.googleDoc}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-lg text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    >
                                        <TrendingUp className="mr-2 h-5 w-5" />
                                        Read Full Research
                                    </a>
                                )}
                                <Link
                                    href="/"
                                    className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
                                >
                                    Explore More Articles
                                </Link>
                            </div>
                        </section>

                        {/* Educational Disclaimer */}
                        <InfoBox type="warning" icon={<AlertTriangle className="h-6 w-6 text-yellow-600" />}>
                            <div className="font-bold text-lg mb-2">Educational Disclaimer</div>
                            <p className="text-sm leading-relaxed">
                                This content is for educational and informational purposes only. Options trading involves substantial risk and is not suitable for all investors. Volatility smile arbitrage strategies require sophisticated mathematical modeling and significant capital. Past performance does not guarantee future results. Always consult with a qualified financial advisor before making investment decisions.
                            </p>
                        </InfoBox>
                    </div>
                </main>

                <footer className="text-center py-6 text-gray-500 text-sm">
                    <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
                </footer>
            </div>
        </>
    );
}