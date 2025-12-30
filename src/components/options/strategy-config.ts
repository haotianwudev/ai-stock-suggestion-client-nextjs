// --- STRATEGY CONFIGURATION ---
// Centralized configuration for all options strategies

import { ComponentType } from 'react';

export type StrategyCategory = 'Bullish' | 'Bearish' | 'Neutral' | 'Volatility' | 'Income' | 'Featured';

export interface PayoffParams {
    stockPrice: number;
    strike1: number;
    strike2: number;
    strike3: number;
    strike4: number;
    premium: number;
}

export type PayoffCalculator = (price: number, params: PayoffParams) => number;

export interface StrategyDetailProps {
    strategy: Strategy;
    onBack: () => void;
}

export interface Strategy {
    id: string;
    category: StrategyCategory[];  // Changed to array to support multiple categories
    name: string;
    description: string;
    profile: string;
    volatility: string;
    time: string;
    payoffCalculator: PayoffCalculator;
    youtubeId?: string;
    payoffExplanation?: string;  // Explanation for the payoff diagram
    relatedArticles?: string[];  // Array of article slugs
    infographicUrl?: string;     // URL for strategy infographic
    detailComponent?: ComponentType<StrategyDetailProps>; // Component for detailed view
}

// Import strategy detail components
import { WheelStrategyDetail } from './strategies/wheel-strategy';
import { IronCondorStrategyDetail } from './strategies/iron-condor';
import { LongPutStrategyDetail } from './strategies/long-put-strategy';
//import { LeapsPutStrategyDetail } from './strategies/leaps-put-strategy';
import { DefaultStrategyDetail } from './strategies/default-strategy';

// --- STRATEGY DATA ---
export const strategies: Strategy[] = [
    {
        id: 'long_call',
        category: ['Bullish'],
        name: 'Long Call',
        description: "The most straightforward bullish strategy. Buy a call option expecting the underlying asset's price to rise significantly. Profit potential is unlimited, while risk is limited to the premium paid.",
        profile: 'Defined Risk, Unlimited Profit',
        volatility: 'Benefits from rising IV (Long Vega)',
        time: 'Hurt by time decay (Short Theta)',
        payoffCalculator: (p, { strike1, premium }) => 
            Math.max(0, p - strike1) - premium,
    },
    {
        id: 'bull_call_spread',
        category: ['Bullish'],
        name: 'Bull Call Spread',
        description: "A moderately bullish strategy. Buy a call and sell another call with a higher strike price. This reduces the cost and risk, but also caps profit. Ideal for moderate price increases.",
        profile: 'Defined Risk, Defined Profit',
        volatility: 'Less sensitive to IV changes',
        time: 'Less sensitive to time decay',
        payoffCalculator: (p, { strike1, strike2, premium }) => 
            Math.min(strike2 - strike1, Math.max(0, p - strike1)) - Math.max(0, p - strike2) - premium * 0.5,
    },
    {
        id: 'bull_put_spread',
        category: ['Bullish', 'Income'],
        name: 'Bull Put Spread',
        description: "An income-generating bullish strategy. Sell a put and buy another put with a lower strike. You collect a credit and profit if the stock stays above the short put's strike. Risk and profit are defined.",
        profile: 'Defined Risk, Defined Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { strike3, strike4, premium }) => 
            (premium * 0.5) + Math.min(0, p - strike3) - Math.min(0, p - strike4),
    },
    {
        id: 'covered_call',
        category: ['Bullish', 'Income'],
        name: 'Covered Call Writing',
        description: "A conservative income strategy. Hold the underlying stock and sell a call option against it. You collect premium income and profit if the stock stays flat or rises moderately. Risk is similar to holding the stock, profit is capped by the call strike.",
        profile: 'Stock Risk, Limited Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { stockPrice, strike1, premium }) => 
            (p >= strike1 ? (strike1 - stockPrice + premium) : (p - stockPrice + premium)),
    },
    {
        id: 'sell_naked_put',
        category: ['Bullish', 'Income'],
        name: 'Sell Naked Put',
        description: "A bullish income strategy. Sell a put option without holding cash or the underlying. You collect premium and profit if the stock stays above the strike. Risk is substantial if the stock falls sharply, profit is limited to the premium received.",
        profile: 'Substantial Risk, Limited Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { strike1, premium }) => 
            (p >= strike1 ? premium : premium + (p - strike1)),
    },
    {
        id: 'long_put',
        category: ['Bearish', 'Featured'],
        name: 'Long Put',
        description: "The most straightforward bearish strategy. Buy a put option expecting the underlying asset's price to fall significantly. Profit potential is substantial, risk is limited to the premium paid.",
        profile: 'Defined Risk, Substantial Profit',
        volatility: 'Benefits from rising IV (Long Vega)',
        time: 'Hurt by time decay (Short Theta)',
        payoffCalculator: (p, { strike1, premium }) => 
            Math.max(0, strike1 - p) - premium,
        youtubeId: 'X2IJngJv4G0',
        relatedArticles: ["single-leg-put-strategy-asymmetric-utility", "put-expensive",],
        infographicUrl: 'https://i.imgur.com/a1a8zU5.jpeg',
        detailComponent: LongPutStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'bear_put_spread',
        category: ['Bearish'],
        name: 'Bear Put Spread',
        description: "A moderately bearish strategy. Buy a put and sell another put with a lower strike. This reduces cost and risk, but caps profit. Ideal for moderate price decreases.",
        profile: 'Defined Risk, Defined Profit',
        volatility: 'Less sensitive to IV changes',
        time: 'Less sensitive to time decay',
        payoffCalculator: (p, { strike1, strike3, premium }) => 
            Math.max(0, strike1 - p) - Math.max(0, strike3 - p) - premium * 0.5,
    },
    {
        id: 'bear_call_spread',
        category: ['Bearish', 'Income'],
        name: 'Bear Call Spread',
        description: "An income-generating bearish strategy. Sell a call and buy another with a higher strike. You collect a credit and profit if the stock stays below the short call's strike.",
        profile: 'Defined Risk, Defined Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { strike1, strike3, premium }) => 
            (premium * 0.5) - Math.max(0, p - strike3) + Math.max(0, p - strike1),
    },
    {
        id: 'short_straddle',
        category: ['Neutral', 'Income'],
        name: 'Short Straddle',
        description: "A bet on low volatility. Sell an at-the-money call and put. You profit if the stock price stays very close to the strike price. Risk is theoretically unlimited.",
        profile: 'Unlimited Risk, Defined Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { strike1, premium }) => 
            (premium * 2) - Math.abs(p - strike1),
    },
    {
        id: 'iron_condor',
        category: ['Neutral', 'Income', 'Featured'],
        name: 'Iron Condor',
        description: "A high-probability, risk-defined neutral strategy. Sell a bear call spread and a bull put spread. You define a price range and profit if the stock stays within it at expiration.",
        profile: 'Defined Risk, Defined Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { strike2, strike4 }) => 
            1.0 - Math.max(0, p - strike2) - Math.max(0, strike4 - p),
        relatedArticles: ["iron-condor-quantitative-delta-neutral-premium-harvesting"],
        infographicUrl: 'https://i.imgur.com/jRhQhdm.jpeg',
        detailComponent: IronCondorStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'long_straddle',
        category: ['Volatility'],
        name: 'Long Straddle',
        description: "A bet on a large price move in either direction. Buy an at-the-money call and put. You profit if the stock makes a big move, up or down, covering the cost of both options.",
        profile: 'Defined Risk, Unlimited Profit',
        volatility: 'Benefits from rising IV (Long Vega)',
        time: 'Hurt by time decay (Short Theta)',
        payoffCalculator: (p, { strike1, premium }) => 
            Math.max(0, p - strike1) + Math.max(0, strike1 - p) - (premium * 2),
    },
    {
        id: 'long_strangle',
        category: ['Volatility'],
        name: 'Long Strangle',
        description: "A cheaper alternative to the long straddle. Buy an out-of-the-money call and put. Requires a larger price move to be profitable, but the initial cost is lower.",
        profile: 'Defined Risk, Unlimited Profit',
        volatility: 'Benefits from rising IV (Long Vega)',
        time: 'Hurt by time decay (Short Theta)',
        payoffCalculator: (p, { strike2, strike3, premium }) => 
            Math.max(0, p - strike2) + Math.max(0, strike3 - p) - (premium * 1.5),
    },
    {
        id: 'wheel_strategy',
        category: ['Bullish', 'Income', 'Featured'],
        name: 'Wheel Strategy (Triple Income)',
        description: "A systematic income-generating strategy creating three income sources: put premiums, call premiums, and dividends. Popular among income-focused traders for generating consistent returns of 7-15% annually when executed properly.",
        profile: 'Stock Risk, Triple Income',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p) => {
            const putPremium = 2.0, callPremium = 1.5, stockBuyPrice = 97, callStrike = 105;
            const totalPremium = putPremium + callPremium;
            if (p <= stockBuyPrice) return totalPremium + (p - stockBuyPrice);
            else if (p <= callStrike) return totalPremium + (p - stockBuyPrice);
            else return totalPremium + (callStrike - stockBuyPrice);
        },
        youtubeId: 'GGKItsjV-L8',
        payoffExplanation: "According to put-call parity C + X = P + S, the payoff of wheel is the same as call writing or put writing",
        relatedArticles: ["wheel-strategy",'options-wheel-trading-plan-quantitative-approach'],
        infographicUrl: 'https://i.imgur.com/f1RFcNb.jpeg',
        detailComponent: WheelStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'leaps_put_selling',
        category: ['Bullish', 'Income', 'Featured'],
        name: 'LEAPS Put Selling',
        description: "A sophisticated institutional strategy for selling long-dated put options (LEAPs) to generate premium income while potentially acquiring quality stocks at attractive prices. Focuses on volatility arbitrage and strategic acquisition rather than short-term income generation.",
        profile: 'Substantial Risk, Premium Income',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { strike1, premium }) => 
            (p >= strike1 ? premium : premium + (p - strike1)),
        youtubeId: 'pdfm0osP4Ow',
        payoffExplanation: "LEAPS put selling generates premium income upfront. If assigned, you acquire the stock at the strike price minus premium received.",
        relatedArticles: ["selling-long-dated-put-options-leaps-institutional-mechanics-volatility-arbitrage"],
        infographicUrl: 'https://i.imgur.com/nBdrqD7.jpeg',
        //detailComponent: LeapsPutStrategyDetail as ComponentType<StrategyDetailProps>
    },
];

// --- UTILITY FUNCTIONS ---
export const getStrategyDetailComponent = (strategyId: string) => {
    const strategy = strategies.find(s => s.id === strategyId);
    return strategy?.detailComponent || DefaultStrategyDetail;
};
