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
import { BearPutSpreadStrategyDetail } from './strategies/bear-put-spread-strategy';
import { BearCallSpreadStrategyDetail } from './strategies/bear-call-spread-strategy';
import { CoveredCallStrategyDetail } from './strategies/covered-call-strategy';
import { PutWritingStrategyDetail } from './strategies/put-writing-strategy';
import { LongStraddleStrategyDetail } from './strategies/long-straddle-strategy';
import { LongStrangleStrategyDetail } from './strategies/long-strangle-strategy';
import { DefaultStrategyDetail } from './strategies/default-strategy';
import { BufferedStrategyDetail } from './strategies/buffered-strategy';
import { CalendarSpreadStrategyDetail } from './strategies/calendar-spread-strategy';
import { ButterflySpreadStrategyDetail } from './strategies/butterfly-spread-strategy';

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
        youtubeId: 'JldPgH31X3U',
        relatedArticles: ["long-call-strategy", "single-leg-long-call-asymmetric-leverage-options-trading"],
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
        youtubeId: 'OZh8KnJobic',
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
        relatedArticles: ["wheel-stock", "optionalpha-select-systematic-underlyer-selection-premium-selling", "covered-calls-vs-cash-secured-puts", "secret-similary-call-put", "covering-world-global-evidence-covered-calls", "notebooklm-uncovers-nature-covered-calls-global-research", "strategic-portfolio-management-option-writing", "strategic-investing-using-options", "options-wheel-trading-plan-quantitative-approach", "wheel-strategy", "mastering-volatility-risk-premium-spx-options-selling", "spx-option-underlyer"],
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
        relatedArticles: ["wheel-stock", "optionalpha-select-systematic-underlyer-selection-premium-selling", "covered-calls-vs-cash-secured-puts", "secret-similary-call-put", "covering-world-global-evidence-covered-calls", "notebooklm-uncovers-nature-covered-calls-global-research", "strategic-portfolio-management-option-writing", "strategic-investing-using-options", "options-wheel-trading-plan-quantitative-approach", "wheel-strategy", "mastering-volatility-risk-premium-spx-options-selling", "spx-option-underlyer"],
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
        category: ['Bearish', 'Risk Defined'],
        name: 'Bear Put Spread',
        description: "A moderately bearish strategy. Buy a put and sell another put with a lower strike. This reduces cost and risk, but caps profit. Ideal for moderate price decreases.",
        profile: 'Defined Risk, Defined Profit',
        volatility: 'Less sensitive to IV changes',
        time: 'Less sensitive to time decay',
        payoffCalculator: (p, { strike1, strike3, premium }) => {
            // Bear Put Spread: Buy put at strike1 (higher), sell put at strike3 (lower)
            // Premium represents the net debit paid (long put premium - short put premium)
            const longPutPayoff = Math.max(0, strike1 - p);
            const shortPutPayoff = -Math.max(0, strike3 - p);
            const netDebit = premium;
            
            // Total P&L = Long Put Payoff + Short Put Payoff - Net Debit Paid
            return longPutPayoff + shortPutPayoff - netDebit;
        },
        youtubeId: 'OZh8KnJobic',
        payoffExplanation: "Maximum profit occurs when the stock price equals or falls below the short put strike at expiration. Maximum loss occurs when stock stays above the long put strike.",
        relatedArticles: ["vertical-debit-spreads-strategic-architecture-defined-risk-trading"],
        infographicUrl: 'https://i.imgur.com/yndWCwP.jpeg',
        detailComponent: BearPutSpreadStrategyDetail as ComponentType<StrategyDetailProps>
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
        youtubeId: '3UfLDV7Y8Ps',
        payoffExplanation: "Maximum profit occurs when the stock price moves significantly away from the strike price in either direction. Maximum loss occurs when stock price equals the strike price at expiration.",
        relatedArticles: ["mastering-volatility-definitive-guide-long-straddles-strangles", "long-straddle-strangle",],
        infographicUrl: 'https://i.imgur.com/HE2Hr58.jpeg',
        detailComponent: LongStraddleStrategyDetail as ComponentType<StrategyDetailProps>
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
        youtubeId: '3UfLDV7Y8Ps',
        payoffExplanation: "Maximum profit occurs when the stock price moves significantly beyond either the call or put strike. Maximum loss occurs when stock price stays between the two strikes at expiration.",
        relatedArticles: ["mastering-volatility-definitive-guide-long-straddles-strangles", "long-straddle-strangle",],
        infographicUrl: 'https://i.imgur.com/HE2Hr58.jpeg',
        detailComponent: LongStrangleStrategyDetail as ComponentType<StrategyDetailProps>
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
        relatedArticles: ["wheel-stock", "optionalpha-select-systematic-underlyer-selection-premium-selling", "covered-calls-vs-cash-secured-puts", "secret-similary-call-put", "covering-world-global-evidence-covered-calls", "notebooklm-uncovers-nature-covered-calls-global-research", "strategic-portfolio-management-option-writing", "strategic-investing-using-options", "options-wheel-trading-plan-quantitative-approach", "wheel-strategy", "mastering-volatility-risk-premium-spx-options-selling", "spx-option-underlyer"],
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
    {
        id: 'buffered_strategy',
        category: ['Risk Defined', 'Income', 'Featured'],
        name: 'Buffered Strategy (Defined Outcome)',
        description: "A sophisticated defined outcome strategy that trades upside potential for downside protection. Combines stock ownership with a protective put spread collar to create a 'buffer' that absorbs the first X% of losses while capping gains at a predetermined level. Popular in ETF form for retirement planning and risk management.",
        profile: 'Defined Risk, Defined Profit',
        volatility: 'Mixed impact (Long Put Vega, Short Call/Put Vega)',
        time: 'Mixed impact (Long Put Theta, Short Call/Put Theta)',
        payoffCalculator: (p, { stockPrice, strike1, strike2, strike3 }) => {
            // Buffered Strategy: Long Stock + Long Put (strike1) + Short Put (strike3) + Short Call (strike2)
            // stockPrice = initial stock price, strike1 = protective put, strike2 = short call (cap), strike3 = short put (buffer limit)
            const stockPnL = p - stockPrice;
            const longPutPnL = Math.max(0, strike1 - p);
            const shortPutPnL = -Math.max(0, strike3 - p);
            const shortCallPnL = -Math.max(0, p - strike2);
            
            return stockPnL + longPutPnL + shortPutPnL + shortCallPnL;
        },
        youtubeId: 'i1OT9W7xp9w',
        payoffExplanation: "The strategy creates a defined range of outcomes. Maximum loss occurs if stock falls below the buffer limit (short put strike), maximum profit if stock rises to the cap (short call strike).",
        relatedArticles: ["buffered-strategy", "mastering-buffered-yield-strategies-defined-outcome-investing", "option-collar-strategy-protect-gains-define-risk"],
        infographicUrl: 'https://i.imgur.com/2I6QQmG.jpeg',
        detailComponent: BufferedStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'calendar_spread',
        category: ['Neutral', 'Income', 'Featured'],
        name: 'Calendar Spread (Time Spread)',
        description: "A sophisticated volatility and time decay strategy that profits from differential theta decay between near-term and long-term options. Sell a short-dated option and buy a longer-dated option at the same strike, creating a position that benefits from time decay acceleration in the front month while maintaining long-term exposure.",
        profile: 'Defined Risk, Variable Profit',
        volatility: 'Benefits from rising IV in back month (Long Vega)',
        time: 'Benefits from time decay differential (Long Theta)',
        payoffCalculator: (p, { strike1, premium }) => {
            // Calendar Spread: Sell near-term option, buy longer-term option at same strike
            // P&L at front month expiration
            // Front month value at expiration (for call calendar)
            const frontMonthValue = Math.max(0, p - strike1);
            
            // Back month retains time value + intrinsic value
            // Simplified: back month worth more when stock near strike (max time value)
            const distanceFromStrike = Math.abs(p - strike1);
            const backMonthIntrinsic = Math.max(0, p - strike1);
            const backMonthTimeValue = Math.max(0, 3 - distanceFromStrike * 0.3); // Time value peaks at ATM
            const backMonthValue = backMonthIntrinsic + backMonthTimeValue;
            
            // P&L = Back Month Value - Front Month Value - Initial Net Debit
            // Initial net debit is approximated as premium * 0.4 (back month costs more than front month credit)
            const netDebit = premium * 0.4;
            
            return backMonthValue - frontMonthValue - netDebit;
        },
        youtubeId: '83U-tqsVHdY',
        payoffExplanation: "Maximum profit occurs when the stock price equals the strike price at front month expiration. The back month option retains maximum time value while the front month expires worthless.",
        relatedArticles: ["calendar-spread","calendar-spread-architecture-time-decay-options-trading"],
        infographicUrl: 'https://i.imgur.com/I4TjHJ7.jpeg',
        detailComponent: CalendarSpreadStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'butterfly_spread',
        category: ['Neutral', 'Risk Defined', 'Featured'],
        name: 'Butterfly Spread',
        description: "A sophisticated neutral strategy that profits from minimal price movement and volatility contraction. Combines a bull spread and bear spread at three strike prices, creating a 'tent-shaped' payoff with maximum profit at the middle strike. Used for precision trading and volatility surface analysis.",
        profile: 'Defined Risk, Defined Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Mixed impact - benefits near middle strike',
        payoffCalculator: (p, { strike1, strike2, strike3, premium }) => {
            // Long Call Butterfly with strike mapping from explorer:
            // strike3 = 95 (lower), strike1 = 100 (middle/ATM), strike2 = 105 (upper)
            const lowerStrike = strike3;  // 95
            const middleStrike = strike1; // 100 - PEAK HERE
            const upperStrike = strike2;  // 105
            
            const wingWidth = middleStrike - lowerStrike; // 5
            const netDebit = wingWidth * 0.3; // Net debit paid
            const maxProfit = wingWidth - netDebit; // Max profit at middleStrike (100)
            
            // Create symmetric tent with sharp peak at middleStrike (100)
            if (p <= lowerStrike) {
                return -netDebit;
            } else if (p <= middleStrike) {
                // Ascending: slope = +1
                return (p - lowerStrike) - netDebit;
            } else if (p <= upperStrike) {
                // Descending: slope = -1 (symmetric)
                return maxProfit - (p - middleStrike);
            } else {
                return -netDebit;
            }
        },
        youtubeId: 'KG66_1FnRSg',
        payoffExplanation: "Maximum profit occurs when the stock price equals the middle strike at expiration. Maximum loss is limited to the net debit paid. The payoff diagram resembles a butterfly's wings.",
        relatedArticles: ["unlocking-volatility-surface-risk-neutral-densities-butterfly-spread"],
        detailComponent: ButterflySpreadStrategyDetail as ComponentType<StrategyDetailProps>
    },
];

// --- UTILITY FUNCTIONS ---
export const getStrategyDetailComponent = (strategyId: string) => {
    const strategy = strategies.find(s => s.id === strategyId);
    return strategy?.detailComponent || DefaultStrategyDetail;
};
