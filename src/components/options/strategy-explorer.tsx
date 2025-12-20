"use client";
import { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Strategy, getStrategyDetailComponent } from './strategies';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// --- DATA STORE ---
const data = {
    strategies: [
        { id: 'long_call', category: 'Bullish' as const, name: 'Long Call', description: "The most straightforward bullish strategy. Buy a call option expecting the underlying asset's price to rise significantly. Profit potential is unlimited, while risk is limited to the premium paid.", profile: 'Defined Risk, Unlimited Profit', volatility: 'Benefits from rising IV (Long Vega)', time: 'Hurt by time decay (Short Theta)' },
        { id: 'bull_call_spread', category: 'Bullish' as const, name: 'Bull Call Spread', description: "A moderately bullish strategy. Buy a call and sell another call with a higher strike price. This reduces the cost and risk, but also caps profit. Ideal for moderate price increases.", profile: 'Defined Risk, Defined Profit', volatility: 'Less sensitive to IV changes', time: 'Less sensitive to time decay' },
        { id: 'bull_put_spread', category: 'Bullish' as const, name: 'Bull Put Spread', description: "An income-generating bullish strategy. Sell a put and buy another put with a lower strike. You collect a credit and profit if the stock stays above the short put's strike. Risk and profit are defined.", profile: 'Defined Risk, Defined Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'covered_call', category: 'Bullish' as const, name: 'Covered Call Writing', description: "A conservative income strategy. Hold the underlying stock and sell a call option against it. You collect premium income and profit if the stock stays flat or rises moderately. Risk is similar to holding the stock, profit is capped by the call strike.", profile: 'Stock Risk, Limited Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'sell_naked_put', category: 'Bullish' as const, name: 'Sell Naked Put', description: "A bullish income strategy. Sell a put option without holding cash or the underlying. You collect premium and profit if the stock stays above the strike. Risk is substantial if the stock falls sharply, profit is limited to the premium received.", profile: 'Substantial Risk, Limited Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'long_put', category: 'Bearish' as const, name: 'Long Put', description: "The most straightforward bearish strategy. Buy a put option expecting the underlying asset's price to fall significantly. Profit potential is substantial, risk is limited to the premium paid.", profile: 'Defined Risk, Substantial Profit', volatility: 'Benefits from rising IV (Long Vega)', time: 'Hurt by time decay (Short Theta)' },
        { id: 'bear_put_spread', category: 'Bearish' as const, name: 'Bear Put Spread', description: "A moderately bearish strategy. Buy a put and sell another put with a lower strike. This reduces cost and risk, but caps profit. Ideal for moderate price decreases.", profile: 'Defined Risk, Defined Profit', volatility: 'Less sensitive to IV changes', time: 'Less sensitive to time decay' },
        { id: 'bear_call_spread', category: 'Bearish' as const, name: 'Bear Call Spread', description: "An income-generating bearish strategy. Sell a call and buy another with a higher strike. You collect a credit and profit if the stock stays below the short call's strike.", profile: 'Defined Risk, Defined Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'short_straddle', category: 'Neutral' as const, name: 'Short Straddle', description: "A bet on low volatility. Sell an at-the-money call and put. You profit if the stock price stays very close to the strike price. Risk is theoretically unlimited.", profile: 'Unlimited Risk, Defined Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'iron_condor', category: 'Neutral' as const, name: 'Iron Condor', description: "A high-probability, risk-defined neutral strategy. Sell a bear call spread and a bull put spread. You define a price range and profit if the stock stays within it at expiration.", profile: 'Defined Risk, Defined Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'long_straddle', category: 'Volatility' as const, name: 'Long Straddle', description: "A bet on a large price move in either direction. Buy an at-the-money call and put. You profit if the stock makes a big move, up or down, covering the cost of both options.", profile: 'Defined Risk, Unlimited Profit', volatility: 'Benefits from rising IV (Long Vega)', time: 'Hurt by time decay (Short Theta)' },
        { id: 'long_strangle', category: 'Volatility' as const, name: 'Long Strangle', description: "A cheaper alternative to the long straddle. Buy an out-of-the-money call and put. Requires a larger price move to be profitable, but the initial cost is lower.", profile: 'Defined Risk, Unlimited Profit', volatility: 'Benefits from rising IV (Long Vega)', time: 'Hurt by time decay (Short Theta)' },
        { id: 'wheel_strategy', category: 'Bullish' as const, name: 'Wheel Strategy (Triple Income)', description: "A systematic income-generating strategy creating three income sources: put premiums, call premiums, and dividends. Popular among income-focused traders for generating consistent returns of 7-15% annually when executed properly.", profile: 'Stock Risk, Triple Income', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
    ] as Strategy[]
};

const PayoffChart = ({ strategy }: { strategy: any }) => {
    const stockPrice = 100, strike1 = 100, strike2 = 105, strike3 = 95, strike4 = 90, premium = 2.5;
    const labels = Array.from({ length: 41 }, (_, i) => stockPrice - 20 + i);
    let payoffData;
    
    switch (strategy.id) {
        case 'long_call': payoffData = labels.map(p => Math.max(0, p - strike1) - premium); break;
        case 'bull_call_spread': payoffData = labels.map(p => Math.min(strike2 - strike1, Math.max(0, p - strike1)) - Math.max(0, p - strike2) - premium * 0.5); break;
        case 'bull_put_spread': payoffData = labels.map(p => (premium * 0.5) + Math.min(0, p - strike3) - Math.min(0, p - strike4)); break;
        case 'covered_call': payoffData = labels.map(p => (p >= strike1 ? (strike1 - stockPrice + premium) : (p - stockPrice + premium))); break;
        case 'sell_naked_put': payoffData = labels.map(p => (p >= strike1 ? premium : premium + (p - strike1))); break;
        case 'long_put': payoffData = labels.map(p => Math.max(0, strike1 - p) - premium); break;
        case 'bear_put_spread': payoffData = labels.map(p => Math.max(0, strike1 - p) - Math.max(0, strike3 - p) - premium * 0.5); break;
        case 'bear_call_spread': payoffData = labels.map(p => (premium * 0.5) - Math.max(0, p - strike3) + Math.max(0, p - strike1)); break;
        case 'short_straddle': payoffData = labels.map(p => (premium * 2) - Math.abs(p - strike1)); break;
        case 'iron_condor': payoffData = labels.map(p => 1.0 - Math.max(0, p - strike2) - Math.max(0, strike4 - p)); break;
        case 'long_straddle': payoffData = labels.map(p => Math.max(0, p - strike1) + Math.max(0, strike1 - p) - (premium * 2)); break;
        case 'long_strangle': payoffData = labels.map(p => Math.max(0, p - strike2) + Math.max(0, strike3 - p) - (premium * 1.5)); break;
        case 'wheel_strategy': payoffData = labels.map(p => {
            const putPremium = 2.0, callPremium = 1.5, stockBuyPrice = 97, callStrike = 105;
            const totalPremium = putPremium + callPremium;
            if (p <= stockBuyPrice) return totalPremium + (p - stockBuyPrice);
            else if (p <= callStrike) return totalPremium + (p - stockBuyPrice);
            else return totalPremium + (callStrike - stockBuyPrice);
        }); break;
        default: payoffData = labels.map(() => 0);
    }

    const hasProfit = payoffData.some((v: number) => v > 0);
    
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Profit / Loss',
                data: payoffData,
                borderColor: hasProfit ? '#10b981' : '#ef4444',
                backgroundColor: hasProfit ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                fill: true,
                pointRadius: 0,
                tension: 0.1
            },
            {
                label: 'Breakeven',
                data: labels.map(() => 0),
                borderColor: '#6b7280',
                borderWidth: 2,
                pointRadius: 0,
                borderDash: [5, 5]
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: (items: any) => `Stock Price: $${items[0].label}`,
                    label: (item: any) => `P/L: $${item.raw.toFixed(2)}`
                }
            }
        },
        scales: {
            x: {
                title: { display: true, text: 'Underlying Price at Expiration' },
                grid: { color: 'rgba(200, 200, 200, 0.1)' }
            },
            y: {
                title: { display: true, text: 'Profit / Loss' },
                grid: { color: 'rgba(200, 200, 200, 0.1)' }
            }
        }
    };

    return <Line data={chartData} options={options} />;
};

const StrategyDetail = ({ strategy, onBack }: { strategy: any, onBack: () => void }) => (
    <div className="animate-fade-in">
        <button 
            onClick={onBack} 
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm md:text-base font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-300"
            aria-label="Back to all strategies"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to all strategies</span>
        </button>
        
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-8 rounded-xl border border-blue-200 shadow-lg mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">{strategy.name}</h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">{strategy.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 md:p-5 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Risk / Reward</p>
                <p className="text-sm md:text-lg font-bold text-gray-900 leading-tight">{strategy.profile}</p>
            </div>
            <div className="bg-white p-4 md:p-5 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Volatility View</p>
                <p className="text-sm md:text-lg font-bold text-gray-900 leading-tight">{strategy.volatility}</p>
            </div>
            <div className="bg-white p-4 md:p-5 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Time Decay View</p>
                <p className="text-sm md:text-lg font-bold text-gray-900 leading-tight">{strategy.time}</p>
            </div>
        </div>

        {/* Payoff Diagram - Show for ALL strategies */}
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Risk Profile (Payoff Diagram)
            </h3>
            <div className="chart-container h-[280px] md:h-[350px] bg-gray-50 rounded-lg p-4">
                <PayoffChart strategy={strategy} />
            </div>
        </div>

        {/* Special expanded content for Wheel Strategy */}
        {strategy.id === 'wheel_strategy' && (
            <div className="mt-6 md:mt-8 space-y-6">
                {/* Strategy Intuition */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">🧠 Strategy Intuition</h3>
                    <div className="text-sm text-slate-700 space-y-4">
                        <div className="border-l-4 border-slate-300 pl-4">
                            <h4 className="font-semibold text-slate-800 mb-2">Core Concept:</h4>
                            <p className="mb-2">The wheel strategy leverages <strong>time decay (theta)</strong> and <strong>implied volatility contraction</strong> to generate consistent income. You're essentially acting as an "insurance company" - collecting premiums from other traders who want to hedge their positions.</p>
                            <p>The strategy works because <strong>most options expire worthless</strong> (approximately 80-90%), allowing you to keep the premium collected while managing the minority of positions that move against you.</p>
                        </div>
                        
                        <div className="border-l-4 border-slate-300 pl-4">
                            <h4 className="font-semibold text-slate-800 mb-2">Why It Works:</h4>
                            <ul className="space-y-1 ml-4">
                                <li>• <strong>Time decay advantage:</strong> Options lose value daily, benefiting sellers</li>
                                <li>• <strong>Volatility premium harvesting:</strong> IV often overstates actual movement</li>
                                <li>• <strong>Probability mathematics:</strong> Selling 16-30 delta options gives ~70-84% win rate</li>
                                <li>• <strong>Mean reversion tendency:</strong> Stocks often return to fair value over time</li>
                            </ul>
                        </div>

                        <div className="border-l-4 border-slate-300 pl-4">
                            <h4 className="font-semibold text-slate-800 mb-2">Triple Income Mechanism:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                                <div className="bg-green-100 p-2 rounded">
                                    <p className="font-medium text-green-800">1. Put Premiums</p>
                                    <p className="text-xs text-green-700">Collect income while waiting for good entry prices</p>
                                </div>
                                <div className="bg-blue-100 p-2 rounded">
                                    <p className="font-medium text-blue-800">2. Call Premiums</p>
                                    <p className="text-xs text-blue-700">Generate income from owned shares while waiting to sell</p>
                                </div>
                                <div className="bg-purple-100 p-2 rounded">
                                    <p className="font-medium text-purple-800">3. Dividends</p>
                                    <p className="text-xs text-purple-700">Bonus income from quality dividend-paying stocks</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-l-4 border-slate-300 pl-4">
                            <h4 className="font-semibold text-slate-800 mb-2">Put-Call Parity & Mathematical Equivalence:</h4>
                            <div className="mb-3">
                                <p className="mb-2">The wheel strategy leverages <strong>put-call parity</strong>: <code className="bg-slate-200 px-1 rounded">C + X = P + S</code></p>
                                <p className="mb-2">This means <strong>selling a covered call is mathematically equivalent to selling a cash-secured put</strong> at the same strike and expiration. The wheel combines both approaches:</p>
                                <ul className="space-y-1 ml-4 text-xs">
                                    <li>• <strong>Phase 1 (Put):</strong> Collect premium, potentially acquire shares at desired price</li>
                                    <li>• <strong>Phase 2 (Call):</strong> Collect premium, potentially sell shares at desired price</li>
                                    <li>• <strong>Continuous cycle:</strong> Seamlessly transitions between equivalent positions</li>
                                </ul>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                <div className="bg-green-100 p-3 rounded">
                                    <h5 className="font-medium text-green-800 mb-1">✅ Pros of Combined Approach:</h5>
                                    <ul className="text-xs text-green-700 space-y-1">
                                        <li>• <strong>Flexible positioning:</strong> Always optimal premium collection</li>
                                        <li>• <strong>Natural hedging:</strong> Losses in one phase offset by gains in another</li>
                                        <li>• <strong>Consistent income:</strong> Premium collection in both market directions</li>
                                        <li>• <strong>Assignment management:</strong> Structured approach to entries/exits</li>
                                    </ul>
                                </div>
                                <div className="bg-red-100 p-3 rounded">
                                    <h5 className="font-medium text-red-800 mb-1">❌ Cons of Combined Approach:</h5>
                                    <ul className="text-xs text-red-700 space-y-1">
                                        <li>• <strong>Capital intensive:</strong> Requires large cash reserves</li>
                                        <li>• <strong>Opportunity cost:</strong> Capital tied up in assignments</li>
                                        <li>• <strong>Sequence risk:</strong> Poor timing can amplify losses</li>
                                        <li>• <strong>Complexity:</strong> Requires active management and discipline</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="border-l-4 border-slate-300 pl-4">
                            <h4 className="font-semibold text-slate-800 mb-2">Why Called the "Wheel" Strategy:</h4>
                            <p className="mb-2">The name "wheel" comes from the <strong>circular, repetitive nature</strong> of the strategy:</p>
                            <div className="bg-slate-100 p-3 rounded-lg mt-2">
                                <p className="text-center font-medium text-slate-800">💰 Sell Put → 📈 Get Assigned → 📞 Sell Call → 🎯 Get Called Away → 🔄 Repeat</p>
                            </div>
                            <p className="mt-2 text-xs">Like a wheel spinning, the strategy cycles continuously between these phases, generating income at each stage while managing risk through systematic position transitions.</p>
                        </div>

                        <div className="border-l-4 border-slate-300 pl-4">
                            <h4 className="font-semibold text-slate-800 mb-2">When to Transition from Put to Call Writing:</h4>
                            <div className="space-y-2">
                                <div className="bg-orange-100 p-2 rounded">
                                    <p className="font-medium text-orange-800 text-sm">🔄 Automatic Transition Triggers:</p>
                                    <ul className="text-xs text-orange-700 space-y-1 ml-4 mt-1">
                                        <li>• <strong>Put assignment:</strong> When your put expires ITM, you automatically own shares</li>
                                        <li>• <strong>Early assignment:</strong> Rare but possible, especially near ex-dividend dates</li>
                                        <li>• <strong>Voluntary assignment:</strong> You can choose to buy shares if put is profitable</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-100 p-2 rounded">
                                    <p className="font-medium text-blue-800 text-sm">⚡ Optimal Timing Considerations:</p>
                                    <ul className="text-xs text-blue-700 space-y-1 ml-4 mt-1">
                                        <li>• <strong>Immediately after assignment:</strong> Start selling calls the next trading day</li>
                                        <li>• <strong>Strike selection:</strong> Choose call strike AT or ABOVE your cost basis</li>
                                        <li>• <strong>Market conditions:</strong> Higher volatility = better call premiums</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step-by-Step Trading Procedure */}
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <h3 className="text-lg font-bold text-indigo-800 mb-3">📋 Step-by-Step Trading Procedure</h3>
                    <div className="text-sm text-indigo-700 space-y-4">
                        <div className="border-l-4 border-indigo-300 pl-4">
                            <h4 className="font-semibold text-indigo-800">Phase 1: Cash-Secured Put Phase</h4>
                            <ol className="list-decimal list-inside space-y-1 mt-2">
                                <li><strong>Screen underliers:</strong> Select high-quality stocks/ETFs with good liquidity</li>
                                <li><strong>Calculate position size:</strong> Determine appropriate capital allocation</li>
                                <li><strong>Select strike:</strong> Choose appropriate delta put, typically OTM</li>
                                <li><strong>Choose expiration:</strong> Select optimal time to expiration</li>
                                <li><strong>Execute trade:</strong> Sell cash-secured put, collect premium</li>
                            </ol>
                        </div>
                        
                        <div className="border-l-4 border-indigo-300 pl-4">
                            <h4 className="font-semibold text-indigo-800">Phase 2: Managing the Put</h4>
                            <ol className="list-decimal list-inside space-y-1 mt-2">
                                <li><strong>Monitor daily:</strong> Track P&L and delta changes</li>
                                <li><strong>Profit taking:</strong> Close at predetermined profit targets</li>
                                <li><strong>Rolling decision:</strong> If ATM, consider rolling out for net credit</li>
                                <li><strong>Assignment preparation:</strong> Ensure sufficient cash if strike breached</li>
                                <li><strong>Accept assignment:</strong> If put expires ITM, take delivery of shares</li>
                            </ol>
                        </div>

                        <div className="border-l-4 border-indigo-300 pl-4">
                            <h4 className="font-semibold text-indigo-800">Phase 3: Covered Call Phase</h4>
                            <ol className="list-decimal list-inside space-y-1 mt-2">
                                <li><strong>Calculate cost basis:</strong> Stock price - put premiums collected</li>
                                <li><strong>Select call strike:</strong> AT or ABOVE cost basis (never below)</li>
                                <li><strong>Choose expiration:</strong> Select optimal time to expiration</li>
                                <li><strong>Execute trade:</strong> Sell covered call against owned shares</li>
                            </ol>
                        </div>

                        <div className="border-l-4 border-indigo-300 pl-4">
                            <h4 className="font-semibold text-indigo-800">Phase 4: Managing the Call</h4>
                            <ol className="list-decimal list-inside space-y-1 mt-2">
                                <li><strong>Monitor position:</strong> Track call's intrinsic value vs. time value</li>
                                <li><strong>Profit taking:</strong> Close at predetermined profit targets</li>
                                <li><strong>Rolling up/out:</strong> If profitable, roll to higher strike for credit</li>
                                <li><strong>Assignment outcome:</strong> If called away, calculate total cycle profit</li>
                                <li><strong>Cycle restart:</strong> Return to Phase 1 with new capital</li>
                            </ol>
                        </div>


                    </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="text-lg font-bold text-green-800 mb-3">🎯 Best Practices</h3>
                    <div className="text-sm text-green-700 space-y-3">
                        <div>
                            <h4 className="font-semibold text-green-800 mb-2">Option Selection:</h4>
                            <ul className="space-y-1 ml-4">
                                <li>• Use <strong>16-30 delta options</strong> for optimal risk/reward balance</li>
                                <li>• Target <strong>7-45 DTE</strong> (Days to Expiration) for best premium collection</li>
                                <li>• Aim for <strong>0.5-2.0% monthly premium</strong> returns</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-green-800 mb-2">Position Management:</h4>
                            <ul className="space-y-1 ml-4">
                                <li>• <strong>Never sell calls below cost basis</strong> - guaranteed loss</li>
                                <li>• <strong>Always collect net credit</strong> when rolling positions</li>
                                <li>• Take profits at <strong>50% premium decay</strong> rather than holding to expiration</li>
                                <li>• <strong>Roll at 21 DTE</strong> - avoid gamma risk near expiration</li>
                                <li>• Roll ATM positions to avoid unwanted assignment</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-green-800 mb-2">Risk Management:</h4>
                            <ul className="space-y-1 ml-4">
                                <li>• <strong>Position size appropriately</strong> - never risk more than 5-10% per trade</li>
                                <li>• Only wheel stocks you're <strong>comfortable owning long-term</strong></li>
                                <li>• Maintain sufficient cash reserves for potential assignments</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-bold text-blue-800 mb-3">📊 Suitable Market Conditions</h3>
                    <ul className="text-sm text-blue-700 space-y-2">
                        <li>• <strong>Sideways to mildly bullish markets</strong> - wheel strategy thrives here</li>
                        <li>• <strong>High implied volatility periods</strong> - generates better premium income</li>
                        <li>• <strong>Stable trending markets</strong> - avoid during extreme volatility or crashes</li>
                        <li>• Works best in <strong>bull markets or consolidation phases</strong></li>
                    </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="text-lg font-bold text-purple-800 mb-3">🏆 Recommended Underliers</h3>
                    <div className="text-sm text-purple-700 space-y-2">
                        <p><strong>High-quality dividend stocks:</strong> AAPL, MSFT, GOOGL, AMZN, JNJ</p>
                        <p><strong>Broad market ETFs:</strong> SPY, QQQ, IWM - provide diversification</p>
                        <p><strong>Blue-chip stocks</strong> with strong fundamentals you'd want to own long-term</p>
                        <p><strong>Avoid:</strong> Meme stocks, penny stocks, low-volume options, earnings-volatile stocks</p>
                    </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h3 className="text-lg font-bold text-red-800 mb-3">⚠️ Common Pitfalls</h3>
                    <div className="text-sm text-red-700 space-y-3">
                        <div>
                            <h4 className="font-semibold text-red-800 mb-2">Position Sizing Errors:</h4>
                            <ul className="space-y-1 ml-4">
                                <li>• <strong>Overleveraging</strong> - using too much capital on single positions</li>
                                <li>• <strong>Insufficient cash reserves</strong> - not preparing for assignment</li>
                                <li>• <strong>Portfolio concentration</strong> - wheeling too many similar stocks</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-red-800 mb-2">Strike Selection Mistakes:</h4>
                            <ul className="space-y-1 ml-4">
                                <li>• <strong>Chasing high premiums</strong> on risky, volatile stocks</li>
                                <li>• <strong>Selling calls below cost basis</strong> - locking in guaranteed losses</li>
                                <li>• <strong>Wrong delta selection</strong> - too high (&gt;30) or too low (&lt;16)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-red-800 mb-2">Management Failures:</h4>
                            <ul className="space-y-1 ml-4">
                                <li>• <strong>Not rolling ATM positions</strong> - letting yourself get assigned unnecessarily</li>
                                <li>• <strong>Holding to expiration</strong> - ignoring profit-taking rules</li>
                                <li>• <strong>Rolling for net debit</strong> - paying to extend losing positions</li>
                                <li>• <strong>Ignoring market conditions</strong> - running wheel during bear markets</li>
                                <li>• <strong>Emotional trading</strong> - abandoning systematic approach during stress</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h3 className="text-lg font-bold text-yellow-800 mb-3">📈 Performance Metrics</h3>
                    <div className="text-sm text-yellow-700 space-y-3">
                        <div>
                            <h4 className="font-semibold text-yellow-800 mb-2">Expected Returns:</h4>
                            <ul className="space-y-1 ml-4">
                                <li>• <strong>7-15% annually</strong> when executed properly (based on backtesting)</li>
                                <li>• <strong>Higher returns in volatile markets</strong> due to elevated premium</li>
                                <li>• <strong>Win rate:</strong> Approximately 70-84% based on delta selection</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-yellow-800 mb-2">Capital Requirements:</h4>
                            <ul className="space-y-1 ml-4">
                                <li>• <strong>High initial capital</strong> - requires cash to secure puts</li>
                                <li>• <strong>Additional reserves</strong> - for potential stock assignments</li>
                                <li>• <strong>Minimum $10,000+</strong> recommended for effective diversification</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <h3 className="text-lg font-bold text-teal-800 mb-3">📚 Learn More Resources</h3>
                    <div className="text-sm text-teal-700 space-y-3">
                        <div>
                            <h4 className="font-semibold text-teal-800 mb-2">Educational Content:</h4>
                            <div className="space-y-1 ml-4">
                                <a href="https://www.tastylive.com/news-insights/how-to-convert-a-short-put-into-a-covered-call" 
                                   target="_blank" rel="noopener noreferrer" 
                                   className="text-blue-600 hover:underline block">
                                   • tastylive: Converting Short Put to Covered Call
                                </a>
                                <a href="https://optionalpha.com/blog/wheel-strategy" 
                                   target="_blank" rel="noopener noreferrer" 
                                   className="text-blue-600 hover:underline block">
                                   • Option Alpha: Wheel Strategy Guide
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-teal-800 mb-2">Community & Tools:</h4>
                            <div className="space-y-1 ml-4">
                                <a href="https://www.reddit.com/r/Optionswheel/" 
                                   target="_blank" rel="noopener noreferrer" 
                                   className="text-blue-600 hover:underline block">
                                   • Reddit: r/Optionswheel Community
                                </a>
                                <a href="https://yieldcollector.com/calculators" 
                                   target="_blank" rel="noopener noreferrer" 
                                   className="text-blue-600 hover:underline block">
                                   • Yield Collector: Options Calculators & Tools
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}


    </div>
);

// Convert strategy ID to URL slug
const strategyIdToSlug = (id: string): string => {
    return id.replace(/_/g, '-');
};

// Convert URL slug to strategy ID
const slugToStrategyId = (slug: string): string => {
    return slug.replace(/-/g, '_');
};

interface StrategyExplorerProps {
    selectedStrategyId?: string;
    onStrategySelect?: (slug: string) => void;
    onBack?: () => void;
}

export const StrategyExplorer = ({ selectedStrategyId, onStrategySelect, onBack }: StrategyExplorerProps) => {
    const [filter, setFilter] = useState('All');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Sync with URL parameter
    useEffect(() => {
        if (selectedStrategyId) {
            const strategyId = slugToStrategyId(selectedStrategyId);
            setSelectedId(strategyId);
        } else {
            setSelectedId(null);
        }
    }, [selectedStrategyId]);

    const filteredStrategies = filter === 'All' ? data.strategies : data.strategies.filter(s => s.category === filter);
    const selectedStrategy = selectedId ? data.strategies.find(s => s.id === selectedId) : null;

    const handleStrategyClick = (strategyId: string) => {
        const slug = strategyIdToSlug(strategyId);
        if (onStrategySelect) {
            onStrategySelect(slug);
        } else {
            setSelectedId(strategyId);
        }
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            setSelectedId(null);
        }
    };

    if (selectedStrategy) {
        return <StrategyDetail strategy={selectedStrategy} onBack={handleBack} />;
    }

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8 rounded-xl border border-blue-100">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">Strategy Explorer</h2>
                <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                    Explore a comprehensive taxonomy of options strategies. Each strategy is designed for a specific market outlook. 
                    Use the filters below to discover strategies based on your view of the market's direction and volatility.
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 p-3 md:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
                {['All', 'Bullish', 'Bearish', 'Neutral', 'Volatility'].map(f => (
                    <button 
                        key={f} 
                        onClick={() => setFilter(f)} 
                        className={`btn px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base min-h-[44px] flex-1 sm:flex-initial transition-all duration-200 shadow-sm ${
                            filter === f 
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md transform scale-105' 
                                : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md hover:scale-102'
                        }`}
                    >
                        <span className="flex items-center justify-center gap-2">
                            {f}
                            <span className="text-lg">{{Bullish: '🐂', Bearish: '🐻', Neutral: '😐', Volatility: '⚡'}[f] || ''}</span>
                        </span>
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredStrategies.map(s => (
                    <div
                        key={s.id}
                        onClick={() => handleStrategyClick(s.id)}
                        className="group content-card p-5 md:p-6 cursor-pointer strategy-card border-2 border-gray-200 bg-white hover:border-blue-400 hover:shadow-xl transition-all duration-300 rounded-xl min-h-[160px] flex flex-col transform hover:-translate-y-1"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight flex-1 group-hover:text-blue-600 transition-colors">{s.name}</h3>
                            <span className={`text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full inline-block self-start shadow-sm ${
                                {
                                    Bullish: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300',
                                    Bearish: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300',
                                    Neutral: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300',
                                    Volatility: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300'
                                }[s.category]
                            }`}>
                                {s.category}
                            </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed flex-1 group-hover:text-gray-700 transition-colors">
                            {s.description.split('.')[0]}.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}; 