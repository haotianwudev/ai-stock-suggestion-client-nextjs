// --- STRATEGY CONFIGURATION ---
// Centralized configuration for all options strategies

import { ComponentType } from 'react';

export type StrategyCategory = 'Bullish' | 'Bearish' | 'Neutral' | 'Volatility' | 'Income' | 'Featured' | 'Risk Defined';

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
import { LongCallStrategyDetail } from './strategies/long-call-strategy';
import { LeapsPutStrategyDetail } from './strategies/leaps-put-strategy';
import { CollarStrategyDetail } from './strategies/collar-strategy';
import { ShortStraddleStrategyDetail } from './strategies/short-straddle-strategy';
import { ShortStrangleStrategyDetail } from './strategies/short-strangle-strategy';
import { BullPutSpreadStrategyDetail } from './strategies/bull-put-spread-strategy';
import { BullCallSpreadStrategyDetail } from './strategies/bull-call-spread-strategy';
import { BearCallSpreadStrategyDetail } from './strategies/bear-call-spread-strategy';
import { CoveredCallStrategyDetail } from './strategies/covered-call-strategy';
import { PutWritingStrategyDetail } from './strategies/put-writing-strategy';
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
        //youtubeId: 'X2IJngJv4G0',
        relatedArticles: ["single-leg-long-call-asymmetric-leverage-options-trading"],
        infographicUrl: 'https://i.imgur.com/A6ChN1u.jpeg',
        detailComponent: LongCallStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'bull_call_spread',
        category: ['Bullish', 'Risk Defined'],
        name: 'Bull Call Spread',
        description: "A moderately bullish strategy. Buy a call and sell another call with a higher strike price. This reduces the cost and risk, but also caps profit. Ideal for moderate price increases.",
        profile: 'Defined Risk, Defined Profit',
        volatility: 'Less sensitive to IV changes',
        time: 'Less sensitive to time decay',
        payoffCalculator: (p, { strike1, strike2, premium }) => {
            // Bull Call Spread: Buy call at strike1 (lower), sell call at strike2 (higher)
            // Premium represents the net debit paid (long call premium - short call premium)
            const longCallPayoff = Math.max(0, p - strike1);
            const shortCallPayoff = -Math.max(0, p - strike2);
            const netDebit = premium;
            
            // Total P&L = Long Call Payoff + Short Call Payoff - Net Debit Paid
            return longCallPayoff + shortCallPayoff - netDebit;
        },
        youtubeId: 'g5e-nZERjLE',
        payoffExplanation: "Maximum profit occurs when the stock price equals or exceeds the short call strike at expiration. Maximum loss occurs when stock stays below the long call strike.",
        relatedArticles: ["vertical-debit-spreads-strategic-architecture-defined-risk-trading"],
        infographicUrl: 'https://i.imgur.com/yndWCwP.jpeg',
        detailComponent: BullCallSpreadStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'bull_put_spread',
        category: ['Bullish', 'Income', 'Risk Defined', 'Featured'],
        name: 'Bull Put Spread',
        description: "An income-generating bullish strategy. Sell a put and buy another put with a lower strike. You collect a credit and profit if the stock stays above the short put's strike. Risk and profit are defined.",
        profile: 'Defined Risk, Defined Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { strike3, strike4, premium }) => 
            (premium * 0.5) + Math.min(0, p - strike3) - Math.min(0, p - strike4),
        youtubeId: 'g5e-nZERjLE',
        payoffExplanation: "Maximum profit occurs when the stock price stays above the short put strike at expiration. Maximum loss occurs when stock falls below the long put strike.",
        relatedArticles: ["vertical-credit-spreads-comprehensive-guide-defined-risk-premium-selling", "vertical-spread",],
        infographicUrl: 'https://i.imgur.com/CSlyJzU.jpeg',
        detailComponent: BullPutSpreadStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'covered_call',
        category: ['Bullish', 'Income', 'Featured'],
        name: 'Covered Call Writing',
        description: "A conservative income strategy combining stock ownership with call option sales. Generate 1-3% monthly premium income while maintaining dividend rights. Popular among income-focused investors and as part of the Wheel Strategy. Risk is similar to stock ownership with capped upside potential.",
        profile: 'Stock Risk, Limited Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { stockPrice, strike1, premium }) => 
            (p >= strike1 ? (strike1 - stockPrice + premium) : (p - stockPrice + premium)),
        youtubeId: 'fKpmR9DxYpk',
        payoffExplanation: "Maximum profit occurs when stock price equals or exceeds the call strike at expiration. Profit is capped at strike price plus premium received.",
        relatedArticles: ["covered-calls-vs-cash-secured-puts", "secret-similary-call-put", "covering-world-global-evidence-covered-calls", "notebooklm-uncovers-nature-covered-calls-global-research", "strategic-portfolio-management-option-writing", "strategic-investing-using-options", "options-wheel-trading-plan-quantitative-approach", "wheel-strategy", "mastering-volatility-risk-premium-spx-options-selling", "spx-option-underlyer"],
        infographicUrl: 'https://i.imgur.com/otXoq7h.jpeg',
        detailComponent: CoveredCallStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'put_writing',
        category: ['Bullish', 'Income'],
        name: 'Put Writing (Cash-Secured & Naked)',
        description: "A versatile income strategy with two variants: cash-secured (conservative) and naked (leveraged). Sell put options to generate premium income while positioning for potential stock acquisition at attractive prices. Core component of the Wheel Strategy and systematic premium collection programs.",
        profile: 'Substantial Risk, Limited Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { strike1, premium }) => 
            (p >= strike1 ? premium : premium + (p - strike1)),
        youtubeId: 'fKpmR9DxYpk',
        payoffExplanation: "Maximum profit occurs when stock price stays above the put strike at expiration. Maximum loss occurs when stock falls to zero (minus premium received).",
        relatedArticles: ["covered-calls-vs-cash-secured-puts", "secret-similary-call-put", "covering-world-global-evidence-covered-calls", "notebooklm-uncovers-nature-covered-calls-global-research", "strategic-portfolio-management-option-writing", "strategic-investing-using-options", "options-wheel-trading-plan-quantitative-approach", "wheel-strategy", "mastering-volatility-risk-premium-spx-options-selling", "spx-option-underlyer"],
        infographicUrl: 'https://i.imgur.com/otXoq7h.jpeg',
        detailComponent: PutWritingStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'long_put',
        category: ['Bearish'],
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
        category: ['Bearish', 'Income', 'Risk Defined'],
        name: 'Bear Call Spread',
        description: "An income-generating bearish strategy. Sell a call and buy another with a higher strike. You collect a credit and profit if the stock stays below the short call's strike.",
        profile: 'Defined Risk, Defined Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { strike1, strike3, premium }) => 
            (premium * 0.5) - Math.max(0, p - strike3) + Math.max(0, p - strike1),
        youtubeId: 'g5e-nZERjLE',
        payoffExplanation: "Maximum profit occurs when the stock price stays below the short call strike at expiration. Maximum loss occurs when stock rises above the long call strike.",
        relatedArticles: ["vertical-credit-spreads-comprehensive-guide-defined-risk-premium-selling", "vertical-spread",],
        infographicUrl: 'https://i.imgur.com/CSlyJzU.jpeg',
        detailComponent: BearCallSpreadStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'short_straddle',
        category: ['Neutral', 'Income', 'Featured'],
        name: 'Short Straddle',
        description: "A bet on low volatility. Sell an at-the-money call and put. You profit if the stock price stays very close to the strike price. Risk is theoretically unlimited.",
        profile: 'Unlimited Risk, Defined Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { strike1, premium }) => 
            (premium * 2) - Math.abs(p - strike1),
        youtubeId: 'AtRXXgVRtlk',
        payoffExplanation: "Maximum profit occurs when the stock price equals the strike price at expiration. Losses increase as price moves away from the strike in either direction.",
        relatedArticles: ["mastering-short-volatility-straddles-strangles-systematic-premium-collection", "short-straddle-strangle"],
        infographicUrl: 'https://i.imgur.com/ZCwIYbv.jpeg',
        detailComponent: ShortStraddleStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'short_strangle',
        category: ['Neutral', 'Income'],
        name: 'Short Strangle',
        description: "A high-probability neutral strategy. Sell an out-of-the-money call and put at different strikes. You profit if the stock stays between the strikes, offering a wider profit zone than straddles.",
        profile: 'Unlimited Risk, Defined Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { strike2, strike3, premium }) => 
            (premium * 1.5) - Math.max(0, p - strike2) - Math.max(0, strike3 - p),
        youtubeId: 'AtRXXgVRtlk',
        payoffExplanation: "Maximum profit occurs when the stock price stays between the put and call strikes at expiration. Losses increase as price moves beyond either strike.",
        relatedArticles: ["mastering-short-volatility-straddles-strangles-systematic-premium-collection", "short-straddle-strangle"],
        infographicUrl: 'https://i.imgur.com/ZCwIYbv.jpeg',
        detailComponent: ShortStrangleStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'iron_condor',
        category: ['Neutral', 'Income', 'Risk Defined', 'Featured'],
        name: 'Iron Condor',
        description: "A high-probability, risk-defined neutral strategy. Sell a bear call spread and a bull put spread. You define a price range and profit if the stock stays within it at expiration.",
        profile: 'Defined Risk, Defined Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { strike1, strike2, strike3, strike4, premium }) => {
            // Iron Condor: Short put spread + Short call spread
            // strike4 = 90 (long put), strike3 = 95 (short put), strike2 = 105 (short call), strike1 = 100 (not used for IC)
            // For IC: Buy put at 90, Sell put at 95, Sell call at 105, Buy call at 110
            const longCallStrike = strike2 + (strike3 - strike4); // 105 + (95-90) = 110
            
            // Put spread P&L: (short put premium - long put premium) - max(0, strike3 - p) + max(0, strike4 - p)
            const putSpreadPnL = -Math.max(0, strike3 - p) + Math.max(0, strike4 - p);
            
            // Call spread P&L: (short call premium - long call premium) - max(0, p - strike2) + max(0, p - longCallStrike)
            const callSpreadPnL = -Math.max(0, p - strike2) + Math.max(0, p - longCallStrike);
            
            // Net credit received (simplified as premium/2 for each spread)
            const netCredit = premium * 0.8; // Typical IC collects about 80% of premium as credit
            
            return putSpreadPnL + callSpreadPnL + netCredit;
        },
        relatedArticles: ["iron-condor-quantitative-delta-neutral-premium-harvesting", "iron-condor",],
        youtubeId: 'LC1qM2ps6NY',
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
        relatedArticles: ["covered-calls-vs-cash-secured-puts", "secret-similary-call-put", "covering-world-global-evidence-covered-calls", "notebooklm-uncovers-nature-covered-calls-global-research", "strategic-portfolio-management-option-writing", "strategic-investing-using-options", "options-wheel-trading-plan-quantitative-approach", "wheel-strategy", "mastering-volatility-risk-premium-spx-options-selling", "spx-option-underlyer"],
        infographicUrl: 'https://i.imgur.com/f1RFcNb.jpeg',
        detailComponent: WheelStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'leaps_put_selling',
        category: ['Bullish'],
        name: 'LEAPS Put Selling',
        description: "A sophisticated institutional strategy for selling long-dated put options (LEAPs) to generate premium income while potentially acquiring quality stocks at attractive prices. Focuses on volatility arbitrage and strategic acquisition rather than short-term income generation.",
        profile: 'Substantial Risk, Premium Income',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffCalculator: (p, { strike1, premium }) => 
            (p >= strike1 ? premium : premium + (p - strike1)),
        youtubeId: 'pdfm0osP4Ow',
        payoffExplanation: "LEAPS put selling generates premium income upfront. If assigned, you acquire the stock at the strike price minus premium received.",
        relatedArticles: ["selling-long-dated-put-options-leaps-institutional-mechanics-volatility-arbitrage", "sell-leaps-put",],
        infographicUrl: 'https://i.imgur.com/nBdrqD7.jpeg',
        detailComponent: LeapsPutStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'collar_strategy',
        category: ['Bullish', 'Risk Defined', 'Featured'],
        name: 'Collar Strategy',
        description: "A defensive strategy combining stock ownership with protective puts and covered calls. Creates a 'collar' around your position with defined risk and reward. Often implemented at low or zero net cost, making it ideal for protecting gains in concentrated positions without selling shares.",
        profile: 'Defined Risk, Defined Profit',
        volatility: 'Mixed impact (Long Put Vega, Short Call Vega)',
        time: 'Mixed impact (Short Put Theta, Long Call Theta)',
        payoffCalculator: (p, { stockPrice, strike2, strike3 }) => {            
            return p - stockPrice + Math.max(strike3 - p, 0) + -Math.max(p - strike2, 0);
        },
        youtubeId: 'AuBIzqvQdEw',
        payoffExplanation: "The collar creates a defined range of outcomes. Maximum loss occurs if stock falls to put strike, maximum profit if stock rises to call strike.",
        relatedArticles: ["option-collar-strategy-protect-gains-define-risk", "option-collar"],
        infographicUrl: 'https://i.imgur.com/qmxFvJ5.jpeg',
        detailComponent: CollarStrategyDetail as ComponentType<StrategyDetailProps>
    },
];

// --- UTILITY FUNCTIONS ---
export const getStrategyDetailComponent = (strategyId: string) => {
    const strategy = strategies.find(s => s.id === strategyId);
    return strategy?.detailComponent || DefaultStrategyDetail;
};
