"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import { StrategyExplorer } from "@/components/options/strategy-explorer";

// --- DATA STORE ---
const data = {
    strategies: [
        { id: 'long_call', category: 'Bullish', name: 'Long Call', description: "The most straightforward bullish strategy. Buy a call option expecting the underlying asset's price to rise significantly. Profit potential is unlimited, while risk is limited to the premium paid.", profile: 'Defined Risk, Unlimited Profit', volatility: 'Benefits from rising IV (Long Vega)', time: 'Hurt by time decay (Short Theta)' },
        { id: 'bull_call_spread', category: 'Bullish', name: 'Bull Call Spread', description: "A moderately bullish strategy. Buy a call and sell another call with a higher strike price. This reduces the cost and risk, but also caps profit. Ideal for moderate price increases.", profile: 'Defined Risk, Defined Profit', volatility: 'Less sensitive to IV changes', time: 'Less sensitive to time decay' },
        { id: 'bull_put_spread', category: 'Bullish', name: 'Bull Put Spread', description: "An income-generating bullish strategy. Sell a put and buy another put with a lower strike. You collect a credit and profit if the stock stays above the short put's strike. Risk and profit are defined.", profile: 'Defined Risk, Defined Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'long_put', category: 'Bearish', name: 'Long Put', description: "The most straightforward bearish strategy. Buy a put option expecting the underlying asset's price to fall significantly. Profit potential is substantial, risk is limited to the premium paid.", profile: 'Defined Risk, Substantial Profit', volatility: 'Benefits from rising IV (Long Vega)', time: 'Hurt by time decay (Short Theta)' },
        { id: 'bear_put_spread', category: 'Bearish', name: 'Bear Put Spread', description: "A moderately bearish strategy. Buy a put and sell another put with a lower strike. This reduces cost and risk, but caps profit. Ideal for moderate price decreases.", profile: 'Defined Risk, Defined Profit', volatility: 'Less sensitive to IV changes', time: 'Less sensitive to time decay' },
        { id: 'bear_call_spread', category: 'Bearish', name: 'Bear Call Spread', description: "An income-generating bearish strategy. Sell a call and buy another with a higher strike. You collect a credit and profit if the stock stays below the short call's strike.", profile: 'Defined Risk, Defined Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'short_straddle', category: 'Neutral', name: 'Short Straddle', description: "A bet on low volatility. Sell an at-the-money call and put. You profit if the stock price stays very close to the strike price. Risk is theoretically unlimited.", profile: 'Unlimited Risk, Defined Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'iron_condor', category: 'Neutral', name: 'Iron Condor', description: "A high-probability, risk-defined neutral strategy. Sell a bear call spread and a bull put spread. You define a price range and profit if the stock stays within it at expiration.", profile: 'Defined Risk, Defined Profit', volatility: 'Benefits from falling IV (Short Vega)', time: 'Benefits from time decay (Long Theta)' },
        { id: 'long_straddle', category: 'Volatility', name: 'Long Straddle', description: "A bet on a large price move in either direction. Buy an at-the-money call and put. You profit if the stock makes a big move, up or down, covering the cost of both options.", profile: 'Defined Risk, Unlimited Profit', volatility: 'Benefits from rising IV (Long Vega)', time: 'Hurt by time decay (Short Theta)' },
        { id: 'long_strangle', category: 'Volatility', name: 'Long Strangle', description: "A cheaper alternative to the long straddle. Buy an out-of-the-money call and put. Requires a larger price move to be profitable, but the initial cost is lower.", profile: 'Defined Risk, Unlimited Profit', volatility: 'Benefits from rising IV (Long Vega)', time: 'Hurt by time decay (Short Theta)' },
    ],
    technicalIndicators: [
        { signal: "Bollinger Bands Squeeze", interpretation: "Low volatility, anticipating a large price move in either direction.", suitable: "Long Volatility" },
        { signal: "Price touches Upper Bollinger Band + RSI > 70", interpretation: "Overbought condition, strong potential for a bearish reversal.", suitable: "Bearish" },
        { signal: "Price touches Lower Bollinger Band + RSI < 30", interpretation: "Oversold condition, strong potential for a bullish reversal.", suitable: "Bullish" },
        { signal: "MACD Bullish Crossover (below zero line)", interpretation: "Shift from bearish to bullish momentum, potential start of a new uptrend.", suitable: "Bullish" },
        { signal: "MACD Bearish Crossover (above zero line)", interpretation: "Shift from bullish to bearish momentum, potential start of a new downtrend.", suitable: "Bearish" },
        { signal: "Bearish Divergence (Price Higher High, RSI Lower High)", interpretation: "Waning bullish momentum, high probability of a trend reversal or correction.", suitable: "Mildly Bearish / Neutral" },
        { signal: "High Implied Volatility (IV Rank > 80%)", interpretation: "Options are 'expensive.' Volatility is likely to contract (mean revert).", suitable: "Short Volatility" },
        { signal: "Low Implied Volatility (IV Rank < 20%)", interpretation: "Options are 'cheap.' Volatility is likely to expand.", suitable: "Long Volatility" }
    ],
    mlFeatures: [
        { category: "Price-Based", name: "Log Return (1d, 5d, 21d)", rationale: "Captures short, medium, and long-term momentum." },
        { category: "Price-Based", name: "Realized Volatility (21d)", rationale: "Measures historical price fluctuation; baseline for volatility forecasts." },
        { category: "Technical", name: "RSI (14d)", rationale: "Identifies overbought/oversold conditions; crucial for reversal strategies." },
        { category: "Technical", name: "MACD Histogram", rationale: "Measures the acceleration of momentum; early trend change signal." },
        { category: "Technical", name: "Bollinger Band Width", rationale: "Normalized measure of volatility; identifies 'squeeze' conditions." },
        { category: "Options-Based", name: "IV Rank (1-year)", rationale: "Contextualizes current IV; key for mean-reversion volatility trades." },
        { category: "Options-Based", name: "Put/Call Volume Ratio", rationale: "Gauge of market sentiment; high ratio is bearish, low is bullish." },
        { category: "Options-Based", name: "ATM Skew (30d)", rationale: "Measures the premium for downside protection; high skew indicates fear." },
        { category: "Alternative", name: "News Sentiment Score", rationale: "Quantifies bullish/bearish tone of news flow; can be a leading indicator." },
        { category: "Alternative", name: "Fed Funds Rate", rationale: "Macroeconomic context; affects risk appetite and valuation models." }
    ],
    quantMetrics: [
        { name: "Sharpe Ratio", value: "1.25", interpretation: "The king of risk-adjusted return. A higher value means better performance for the amount of risk taken." },
        { name: "Maximum Drawdown (MDD)", value: "15.2%", interpretation: "The largest peak-to-trough drop in portfolio value. This is a critical measure of psychological pain and tail risk." },
        { name: "Sortino Ratio", value: "1.98", interpretation: "A modification of the Sharpe Ratio that only penalizes for 'bad' volatility (downside deviation)." },
        { name: "Calmar Ratio", value: "2.30", interpretation: "Annualized Return / Maximum Drawdown. This directly measures how much return you get for enduring the worst-case loss." },
        { name: "Profit Factor", value: "2.1", interpretation: "Gross Profits / Gross Losses. A simple but powerful measure of the strategy's overall profitability engine." }
    ]
};

// --- CHART COMPONENTS ---
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

const AnalystCharts = () => {
    const priceChartRef = useRef<HTMLCanvasElement>(null);
    const rsiChartRef = useRef<HTMLCanvasElement>(null);
    const macdChartRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (typeof window === 'undefined' || !(window as any).Chart) return;
        const priceData = [100, 102, 105, 103, 107, 112, 115, 118, 122, 120, 117, 113, 110, 108, 105, 102, 98, 95, 93, 96, 100, 103, 101, 99, 102];
        const labels = priceData.map((_, i) => `Day ${i + 1}`);
        const sma20 = priceData.map((_, i, arr) => i < 19 ? null : arr.slice(i - 19, i + 1).reduce((a, b) => a + b, 0) / 20);
        const stdDev = priceData.map((_, i, arr) => i < 19 ? null : Math.sqrt(arr.slice(i - 19, i + 1).reduce((a, b) => a + Math.pow(b - sma20[i]!, 2), 0) / 20));
        const upperBand = sma20.map((v, i) => v ? v + (stdDev[i]! * 2) : null);
        const lowerBand = sma20.map((v, i) => v ? v - (stdDev[i]! * 2) : null);
        const calculateRSI = (data: number[], period = 14) => { let gains = 0, losses = 0, rsi = []; for (let i = 1; i < data.length; i++) { const diff = data[i] - data[i-1]; if (i <= period) { if (diff > 0) gains += diff; else losses -= diff; } if (i === period) { rsi.push(100 - (100 / (1 + (gains / period) / (losses / period)))); } else if (i > period) { let avgGain = ((gains / period) * (period - 1) + (diff > 0 ? diff : 0)) / period; let avgLoss = ((losses / period) * (period - 1) + (diff < 0 ? -diff : 0)) / period; gains = avgGain * period; losses = avgLoss * period; rsi.push(100 - (100 / (1 + avgGain / avgLoss))); } else { rsi.push(null); } } return Array(data.length - rsi.length).fill(null).concat(rsi); };
        const rsiData = calculateRSI(priceData);
        const calculateMACD = (data: number[], short = 12, long = 26, signal = 9) => { const ema = (data: number[], period: number) => { const k = 2/(period + 1); let emaArr = [data[0]]; for (let i = 1; i < data.length; i++) emaArr.push(data[i] * k + emaArr[i-1] * (1-k)); return emaArr; }; const emaShort = ema(data, short); const emaLong = ema(data, long); const macdLine = data.map((_, i) => emaShort[i] - emaLong[i]); const signalLine = ema(macdLine, signal); const histogram = macdLine.map((v, i) => v - signalLine[i]); return { macdLine, signalLine, histogram }; };
        const { macdLine, signalLine, histogram } = calculateMACD(priceData);
        const charts: any[] = [];
        if (priceChartRef.current) {
            charts.push(new (window as any).Chart(priceChartRef.current.getContext('2d'), { type: 'line', data: { labels, datasets: [ { label: 'Price', data: priceData, borderColor: '#3b82f6', borderWidth: 3, pointRadius: 2, tension: 0.1 }, { label: 'Upper Band', data: upperBand, borderColor: 'rgba(239, 68, 68, 0.5)', borderWidth: 1, pointRadius: 0, fill: '+1' }, { label: 'SMA 20', data: sma20, borderColor: 'rgba(245, 158, 11, 0.7)', borderWidth: 1, borderDash: [5, 5], pointRadius: 0 }, { label: 'Lower Band', data: lowerBand, borderColor: 'rgba(16, 185, 129, 0.5)', borderWidth: 1, pointRadius: 0, fill: false } ] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { title: { display: true, text: 'Price' } } } } }));
        }
        if (rsiChartRef.current) {
            charts.push(new (window as any).Chart(rsiChartRef.current.getContext('2d'), { type: 'line', data: { labels, datasets: [ { label: 'RSI', data: rsiData, borderColor: '#8b5cf6', borderWidth: 2, pointRadius: 0 }, { label: 'Overbought', data: labels.map(() => 70), borderColor: '#ef4444', borderWidth: 1, pointRadius: 0, borderDash: [5, 5] }, { label: 'Oversold', data: labels.map(() => 30), borderColor: '#10b981', borderWidth: 1, pointRadius: 0, borderDash: [5, 5] } ] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { min: 0, max: 100, title: { display: true, text: 'RSI' } } } } }));
        }
        if (macdChartRef.current) {
            charts.push(new (window as any).Chart(macdChartRef.current.getContext('2d'), { type: 'bar', data: { labels, datasets: [ { type: 'line', label: 'MACD Line', data: macdLine, borderColor: '#3b82f6', borderWidth: 2, pointRadius: 0, yAxisID: 'y' }, { type: 'line', label: 'Signal Line', data: signalLine, borderColor: '#f97316', borderWidth: 2, pointRadius: 0, yAxisID: 'y' }, { label: 'Histogram', data: histogram, backgroundColor: histogram.map((v: number) => v > 0 ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'), yAxisID: 'y1' } ] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { maxRotation: 0, minRotation: 0, autoSkip: true, maxTicksLimit: 10 } }, y: { position: 'left', title: { display: true, text: 'MACD' } }, y1: { position: 'right', grid: { drawOnChartArea: false } } } } }));
        }
        return () => charts.forEach(c => c.destroy());
    }, []);
    return <> <div className="chart-container h-[400px] max-h-[50vh]"><canvas ref={priceChartRef} /></div> <div className="chart-container h-[150px] max-h-[20vh] mt-4"><canvas ref={rsiChartRef} /></div> <div className="chart-container h-[150px] max-h-[20vh] mt-4"><canvas ref={macdChartRef} /></div> </>;
};

const ShapChart = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!chartRef.current || typeof window === 'undefined' || !(window as any).Chart) return;
        const ctx = chartRef.current.getContext('2d');
        const features = ['Low IV Rank', 'RSI < 30', 'Positive News Sentiment', 'MACD Bull Cross', 'High Put/Call Ratio', 'Low Fed Funds Rate'];
        const shapValues = [0.35, 0.25, 0.15, -0.05, -0.10, -0.20];
        const chart = new (window as any).Chart(ctx, {
            type: 'bar',
            data: { labels: features, datasets: [{ label: 'SHAP Value', data: shapValues, backgroundColor: shapValues.map(v => v > 0 ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)'), borderColor: shapValues.map(v => v > 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'), borderWidth: 1 }] },
            options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, title: { display: true, text: 'Feature Contribution to Prediction (SHAP)' }, subtitle: { display: true, text: 'Positive values push prediction higher (more bullish)' } }, scales: { x: { title: { display: true, text: 'Contribution to model output' } } } }
        });
        return () => chart.destroy();
    }, []);
    return <canvas ref={chartRef} />;
};

// --- VIEW COMPONENTS ---
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

const AnalystToolkit = () => (
    <div className="space-y-8">
        <div><h2 className="text-3xl font-bold text-gray-900">Analyst's Toolkit</h2><p className="mt-2 text-lg text-gray-600">This section demonstrates how a traditional analyst uses technical indicators for tactical timing. Observe how indicators like RSI and MACD react to price movements and volatility changes. Use the table to see how combinations of these signals can be translated into strategic actions.</p></div>
        <div className="content-card p-6"><AnalystCharts /></div>
        <div className="content-card p-6">
            <h3 className="text-2xl font-bold mb-4">Signal-to-Strategy Matrix</h3>
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indicator(s) & Signal</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interpretation</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suitable Strategy Family</th></tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">{data.technicalIndicators.map(ind => (<tr key={ind.signal} className="hover:bg-gray-50"><td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{ind.signal}</td><td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{ind.interpretation}</td><td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${ {Bullish: 'text-green-600', Bearish: 'text-red-600', Neutral: 'text-yellow-600', Volatility: 'text-blue-600'}[ind.suitable.split(' ')[1] || ind.suitable] }`}>{ind.suitable}</td></tr>))}</tbody>
            </table></div>
        </div>
    </div>
);

const MLEngine = () => (
    <div className="space-y-8">
        <div><h2 className="text-3xl font-bold text-gray-900">ML Decision Engine</h2><p className="mt-2 text-lg text-gray-600">This section explores how Machine Learning transforms strategy selection into a probabilistic, data-driven process. We'll examine three ways to frame the trading problem and explore the universe of features that power these sophisticated systems.</p></div>
        <div className="content-card p-6">
            <h3 className="text-2xl font-bold mb-4">Framing the Trading Problem</h3><p className="text-gray-600 mb-6">The first step is translating the trading question into a problem an ML model can solve. The choice of framing—Classification, Regression, or Reinforcement Learning—determines the entire workflow.</p>
            <div className="border-2 border-gray-200 rounded-lg p-6 space-y-6 flex flex-col items-center">
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm w-full md:w-1/2 text-center"><p className="font-bold text-lg">Trading Question</p><p className="text-sm text-gray-600">"What strategy should I use?"</p></div>
                <div className="my-4 text-2xl">⬇️</div><div className="font-semibold text-lg">Frame as ML Problem</div>
                <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="border border-blue-300 bg-blue-50 p-4 rounded-lg space-y-2"><div className="font-bold text-blue-800">Classification</div><p className="text-sm text-blue-700">Predict a category</p><div className="text-2xl">⬇️</div><div className="bg-white p-2 rounded shadow text-sm">"Predict market regime: <br/> Bull, Bear, or Neutral?"</div></div>
                    <div className="border border-green-300 bg-green-50 p-4 rounded-lg space-y-2"><div className="font-bold text-green-800">Regression</div><p className="text-sm text-green-700">Predict a number</p><div className="text-2xl">⬇️</div><div className="bg-white p-2 rounded shadow text-sm">"Forecast 30-day volatility to be 25%?"</div></div>
                    <div className="border border-purple-300 bg-purple-50 p-4 rounded-lg space-y-2"><div className="font-bold text-purple-800">Reinforcement Learning</div><p className="text-sm text-purple-700">Learn a policy</p><div className="text-2xl">⬇️</div><div className="bg-white p-2 rounded shadow text-sm">"Learn optimal action (buy/sell/hold) through trial and error?"</div></div>
                </div>
            </div>
        </div>
        <div className="content-card p-6">
            <h3 className="text-2xl font-bold mb-4">Feature Universe Explorer</h3><p className="text-gray-600 mb-6">A model is only as good as the data it's fed. Below is a curated list of powerful features used in quantitative models, drawn from price, technical, options, and alternative data sources.</p>
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature Name</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rationale & Potential Use</th></tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">{data.mlFeatures.map(f => (<tr key={f.name} className="hover:bg-gray-50"><td className="px-6 py-4 whitespace-nowrap"><span className={`text-sm font-medium px-2 py-1 rounded-full ${ {'Price-Based': 'bg-blue-100 text-blue-800', 'Technical': 'bg-purple-100 text-purple-800', 'Options-Based': 'bg-yellow-100 text-yellow-800', 'Alternative': 'bg-gray-100 text-gray-800'}[f.category] }`}>{f.category}</span></td><td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{f.name}</td><td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{f.rationale}</td></tr>))}</tbody>
            </table></div>
        </div>
    </div>
);

const QuantPlaybook = () => (
    <div className="space-y-8">
        <div><h2 className="text-3xl font-bold text-gray-900">Quant's Playbook</h2><p className="mt-2 text-lg text-gray-600">A profitable backtest is just the beginning. This section covers rigorous backtesting, performance evaluation, and managing model risk using Explainable AI (XAI) to create a robust, market-ready strategy.</p></div>
        <div className="content-card p-6">
            <h3 className="text-2xl font-bold mb-4">Performance & Risk Dashboard</h3><p className="text-gray-600 mb-6">Evaluating a strategy goes far beyond total return. A professional quant analyzes a suite of risk-adjusted metrics to understand a strategy's true character and robustness.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{data.quantMetrics.map(m => (<div key={m.name} className="bg-gray-50 p-4 rounded-lg has-tooltip relative group"><p className="font-bold text-lg text-gray-800">{m.name}</p><p className="text-3xl font-extrabold text-blue-600">{m.value}</p><div className="tooltip hidden group-hover:block absolute bg-gray-800 text-white text-xs rounded py-1 px-2 mt-1 left-0 bottom-full mb-2">{m.interpretation}</div></div>))}</div>
        </div>
        <div className="content-card p-6">
            <h3 className="text-2xl font-bold mb-4">Taming the Black Box with XAI</h3><p className="text-gray-600 mb-6">Explainable AI (XAI) techniques like SHAP are essential for understanding *why* a model makes a prediction. This builds trust, aids debugging, and is often a regulatory requirement. The chart below shows an example of SHAP values explaining a bullish prediction.</p>
            <div className="chart-container h-[400px] max-h-[50vh]"><ShapChart /></div>
        </div>
    </div>
);

export default function DeepResearchOptionsStrategySelection() {
  const [activeView, setActiveView] = useState('explorer');

  const renderView = () => {
    switch (activeView) {
      case 'explorer': return <StrategyExplorer />;
      case 'analyst': return <AnalystToolkit />;
      case 'ml': return <MLEngine />;
      case 'quant': return <QuantPlaybook />;
      default: return <StrategyExplorer />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 antialiased bg-[#FDFBF8] text-gray-800">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
            <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded shadow ml-2">Deep Research</span>
          </div>
          <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm rounded-xl mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4">
              <h1 className="text-2xl md:text-3xl font-bold text-[#A67B5B]">Systematic Options Strategy Selection: From Technical Analysis to Machine Learning</h1>
              <nav className="mt-2 md:mt-0">
                <ul className="flex space-x-6 text-sm font-medium">
                  <li><button onClick={() => setActiveView('explorer')} className={`hover:text-[#A67B5B] transition-colors ${activeView==='explorer' ? 'font-bold underline' : ''}`}>Strategy Explorer</button></li>
                  <li><button onClick={() => setActiveView('analyst')} className={`hover:text-[#A67B5B] transition-colors ${activeView==='analyst' ? 'font-bold underline' : ''}`}>Analyst's Toolkit</button></li>
                  <li><button onClick={() => setActiveView('ml')} className={`hover:text-[#A67B5B] transition-colors ${activeView==='ml' ? 'font-bold underline' : ''}`}>ML Decision Engine</button></li>
                  <li><button onClick={() => setActiveView('quant')} className={`hover:text-[#A67B5B] transition-colors ${activeView==='quant' ? 'font-bold underline' : ''}`}>Quant's Playbook</button></li>
                </ul>
              </nav>
            </div>
          </header>
          <section className="mb-8">
            <p className="text-lg text-gray-700 mb-4">A comprehensive interactive guide to systematic options strategy selection. Explore a taxonomy of options strategies, technical indicator signals, machine learning features, and quant evaluation metrics. Use the navigation above to explore each section interactively. For full research and references, see the linked document below.</p>
          </section>
          <Script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js" strategy="afterInteractive" />
          <div className="bg-white rounded-xl shadow p-4 md:p-8">
            {renderView()}
          </div>
          <div className="text-center mt-12">
            <a
              href="https://docs.google.com/document/d/e/2PACX-1vRYw1t12BokYTuE9Q3t5FngMQpAYDSrLfQVh5znjIbbwdDkDpaBpL77GPHJLMKrp_tS9gTU0paRCShO/pub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow hover:from-purple-700 hover:to-indigo-700 transition-colors text-lg"
            >
              Read Full Document
            </a>
          </div>
        </div>
      </main>
      <Disclaimer />
      <style jsx global>{`
        .chart-container { position: relative; width: 100%; max-width: 700px; margin-left: auto; margin-right: auto; height: 300px; max-height: 40vh; }
        @media (min-width: 768px) { .chart-container { height: 350px; } }
        .btn { transition: all 0.2s ease; box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
        .btn-active { background-color: #3b82f6 !important; color: white !important; }
        .content-card { background-color: white; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); transition: all 0.3s ease; }
        .strategy-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1); }
        .tooltip { visibility: hidden; position: absolute; background-color: #111827; color: white; padding: 8px 12px; border-radius: 6px; font-size: 0.875rem; z-index: 10; white-space: normal; width: 250px; opacity: 0; transition: opacity 0.3s; }
        .has-tooltip:hover .tooltip, .has-tooltip.group:hover .tooltip { visibility: visible; opacity: 1; }
        .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
} 