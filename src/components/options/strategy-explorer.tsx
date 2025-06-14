"use client";
import { useState, useRef, useEffect } from "react";

// --- DATA STORE ---
const data = {
    strategies: [
        { id: 'long_call', category: 'Bullish', name: 'Long Call', description: "The most straightforward bullish strategy. Buy a call option expecting the underlying asset's price to rise significantly. Profit potential is unlimited, while risk is limited to the premium paid.", profile: 'Defined Risk, Unlimited Profit', volatility: 'Benefits from rising IV (Long Vega)', time: 'Hurt by time decay (Short Theta)' },
        { id: 'bull_call_spread', category: 'Bullish', name: 'Bull Call Spread', description: "A moderately bullish strategy. Buy a call and sell another call with a higher strike price. This reduces the cost and risk, but also caps profit. Ideal for moderate price increases.", profile: 'Defined Risk, Defined Profit', volatility: 'Less sensitive to IV changes', time: 'Less sensitive to time decay' },
        { id: 'bull_put_spread', category: 'Bullish', name: 'Bull Put Spread', description: "An income-generating bullish strategy. Sell a put and buy another put with a lower strike. You collect a credit and profit if the stock stays above the short put's strike. Risk and profit are defined.", profile: 'Defined Risk, Defined Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'covered_call', category: 'Bullish', name: 'Covered Call Writing', description: "A conservative income strategy. Hold the underlying stock and sell a call option against it. You collect premium income and profit if the stock stays flat or rises moderately. Risk is similar to holding the stock, profit is capped by the call strike.", profile: 'Stock Risk, Limited Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'sell_naked_put', category: 'Bullish', name: 'Sell Naked Put', description: "A bullish income strategy. Sell a put option without holding cash or the underlying. You collect premium and profit if the stock stays above the strike. Risk is substantial if the stock falls sharply, profit is limited to the premium received.", profile: 'Substantial Risk, Limited Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'long_put', category: 'Bearish', name: 'Long Put', description: "The most straightforward bearish strategy. Buy a put option expecting the underlying asset's price to fall significantly. Profit potential is substantial, risk is limited to the premium paid.", profile: 'Defined Risk, Substantial Profit', volatility: 'Benefits from rising IV (Long Vega)', time: 'Hurt by time decay (Short Theta)' },
        { id: 'bear_put_spread', category: 'Bearish', name: 'Bear Put Spread', description: "A moderately bearish strategy. Buy a put and sell another put with a lower strike. This reduces cost and risk, but caps profit. Ideal for moderate price decreases.", profile: 'Defined Risk, Defined Profit', volatility: 'Less sensitive to IV changes', time: 'Less sensitive to time decay' },
        { id: 'bear_call_spread', category: 'Bearish', name: 'Bear Call Spread', description: "An income-generating bearish strategy. Sell a call and buy another with a higher strike. You collect a credit and profit if the stock stays below the short call's strike.", profile: 'Defined Risk, Defined Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'short_straddle', category: 'Neutral', name: 'Short Straddle', description: "A bet on low volatility. Sell an at-the-money call and put. You profit if the stock price stays very close to the strike price. Risk is theoretically unlimited.", profile: 'Unlimited Risk, Defined Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'iron_condor', category: 'Neutral', name: 'Iron Condor', description: "A high-probability, risk-defined neutral strategy. Sell a bear call spread and a bull put spread. You define a price range and profit if the stock stays within it at expiration.", profile: 'Defined Risk, Defined Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'long_straddle', category: 'Volatility', name: 'Long Straddle', description: "A bet on a large price move in either direction. Buy an at-the-money call and put. You profit if the stock makes a big move, up or down, covering the cost of both options.", profile: 'Defined Risk, Unlimited Profit', volatility: 'Benefits from rising IV (Long Vega)', time: 'Hurt by time decay (Short Theta)' },
        { id: 'long_strangle', category: 'Volatility', name: 'Long Strangle', description: "A cheaper alternative to the long straddle. Buy an out-of-the-money call and put. Requires a larger price move to be profitable, but the initial cost is lower.", profile: 'Defined Risk, Unlimited Profit', volatility: 'Benefits from rising IV (Long Vega)', time: 'Hurt by time decay (Short Theta)' },
    ]
};

const PayoffChart = ({ strategy }: { strategy: any }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!chartRef.current || typeof window === 'undefined' || !(window as any).Chart) return;
        const ctx = chartRef.current.getContext('2d');
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
            default: payoffData = labels.map(() => 0);
        }
        const chart = new (window as any).Chart(ctx, {
            type: 'line',
            data: { labels, datasets: [ { label: 'Profit / Loss', data: payoffData, borderColor: payoffData.some((v: number) => v > 0) ? '#10b981' : '#ef4444', backgroundColor: payoffData.some((v: number) => v > 0) ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderWidth: 2, fill: true, pointRadius: 0, tension: 0.1 }, { type: 'line', label: 'Breakeven', data: labels.map(() => 0), borderColor: '#6b7280', borderWidth: 2, pointRadius: 0, borderDash: [5, 5] } ] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { title: (items: any) => `Stock Price: $${items[0].label}`, label: (item: any) => `P/L: $${item.raw.toFixed(2)}` } } }, scales: { x: { title: { display: true, text: 'Underlying Price at Expiration' }, grid: { color: 'rgba(200, 200, 200, 0.1)' } }, y: { title: { display: true, text: 'Profit / Loss' }, grid: { color: 'rgba(200, 200, 200, 0.1)' } } } }
        });
        return () => chart.destroy();
    }, [strategy]);
    return <canvas ref={chartRef} />;
};

const StrategyDetail = ({ strategy, onBack }: { strategy: any, onBack: () => void }) => (
    <div className="content-card p-6 mt-8 animate-fade-in">
        <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">&larr; Back to all strategies</button>
        <h2 className="text-3xl font-bold">{strategy.name}</h2>
        <p className="mt-2 text-gray-700">{strategy.description}</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm font-medium text-gray-500">Risk / Reward</p><p className="text-lg font-semibold">{strategy.profile}</p></div>
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm font-medium text-gray-500">Volatility View</p><p className="text-lg font-semibold">{strategy.volatility}</p></div>
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm font-medium text-gray-500">Time Decay View</p><p className="text-lg font-semibold">{strategy.time}</p></div>
        </div>
        <div className="mt-8">
            <h3 className="text-xl font-bold text-center">Risk Profile (Payoff Diagram)</h3>
            <div className="chart-container mt-4"><PayoffChart strategy={strategy} /></div>
        </div>
    </div>
);

export const StrategyExplorer = () => {
    const [filter, setFilter] = useState('All');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const filteredStrategies = filter === 'All' ? data.strategies : data.strategies.filter(s => s.category === filter);
    const selectedStrategy = selectedId ? data.strategies.find(s => s.id === selectedId) : null;

    if (selectedStrategy) {
        return <StrategyDetail strategy={selectedStrategy} onBack={() => setSelectedId(null)} />;
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Strategy Explorer</h2>
                <p className="mt-2 text-lg text-gray-600">This section provides a comprehensive taxonomy of common options strategies. Each strategy is designed for a specific market outlook. Use the filters to discover strategies based on your view of the market's direction and volatility, then click on a card to see a detailed breakdown and a dynamic risk profile graph.</p>
            </div>
            <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-lg">
                {['All', 'Bullish', 'Bearish', 'Neutral', 'Volatility'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`btn px-4 py-2 rounded-md font-semibold text-gray-700 ${filter === f ? 'btn-active' : 'bg-white'}`}>{f} { {Bullish: '🐂', Bearish: '🐻', Neutral: '😐', Volatility: '⚡'}[f] }</button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStrategies.map(s => (
                    <div
                        key={s.id}
                        onClick={() => setSelectedId(s.id)}
                        className="content-card p-6 cursor-pointer strategy-card border border-gray-200 bg-gray-50 hover:bg-gray-100 transition"
                    >
                        <h3 className="text-xl font-bold text-gray-900">{s.name}</h3>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${ {
                            Bullish: 'bg-green-100 text-green-800',
                            Bearish: 'bg-red-100 text-red-800',
                            Neutral: 'bg-yellow-100 text-yellow-800',
                            Volatility: 'bg-blue-100 text-blue-800'
                        }[s.category] }`}>{s.category}</span>
                        <p className="mt-4 text-gray-600">{s.description.split('.')[0]}.</p>
                    </div>
                ))}
            </div>
        </div>
    );
}; 