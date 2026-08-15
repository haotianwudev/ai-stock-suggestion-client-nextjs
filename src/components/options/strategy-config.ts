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
    payoffCalculator?: PayoffCalculator; // Required unless payoffPresetId or customPayoffBuilder is set
    payoffDemoParams?: Partial<PayoffParams>; // Overrides the chart's default demo strikes/premium; use to ground the illustration in real data
    payoffPresetId?: string; // Renders the generic interactive SpxPayoffBuilder locked to this preset id (see src/lib/options/presets.ts) instead of the static diagram
    payoffExpirationTargetDte?: number; // Initial expiration DTE target for the interactive builder (default 45); set higher for LEAPS-framed strategies
    customPayoffBuilder?: ComponentType<{ strategy: Strategy }>; // Lower-level escape hatch for a payoff diagram that isn't expressible as a preset
    youtubeId?: string;  // Explicit override; falls back to primaryArticleSlug's article when unset
    payoffExplanation?: string;  // Explanation for the payoff diagram
    relatedArticles?: string[];  // Array of article slugs
    infographicUrl?: string;     // Explicit override; falls back to primaryArticleSlug's article when unset
    primaryArticleSlug?: string; // Article whose youtubeUrl/infographicUrl this strategy's media derives from
    detailComponent?: ComponentType<StrategyDetailProps>; // Component for detailed view
}

// Import strategy detail components
import { WheelStrategyDetail } from './strategies/wheel-strategy';
import { IronCondorStrategyDetail } from './strategies/iron-condor-strategy';
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
import { SeagullSpreadStrategyDetail } from './strategies/seagull-spread-strategy';

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
        payoffPresetId: 'long_call',
        payoffExplanation: "Legs are pre-filled with a real SPX call from the current chain. Change the expiration or strike to see the payoff update live. Maximum loss is the premium paid, occurring if the stock stays below the strike; profit is unlimited above it.",
        relatedArticles: ["single-leg-long-call-asymmetric-leverage-options-trading"],
        primaryArticleSlug: 'single-leg-long-call-asymmetric-leverage-options-trading',
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
        payoffPresetId: 'bull_call_spread',
        payoffExplanation: "Legs are pre-filled with a real long call (near the money) and short call (further OTM) from the current SPX chain. Change the expiration or either strike to see the payoff update live. Maximum profit occurs at or above the short call strike; maximum loss is the net debit paid, occurring at or below the long call strike.",
        relatedArticles: ["vertical-debit-spreads-strategic-architecture-defined-risk-trading"],
        primaryArticleSlug: 'vertical-debit-spreads-strategic-architecture-defined-risk-trading',
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
        payoffPresetId: 'bull_put_spread',
        payoffExplanation: "Legs are pre-filled with a real short put (~30 delta) and a further-OTM long put (~10 delta) from the current SPX chain. Change the expiration or either strike to see the payoff update live. Maximum profit is the net credit collected, occurring at or above the short put strike; maximum loss occurs at or below the long put strike.",
        relatedArticles: ["vertical-credit-spreads-comprehensive-guide-defined-risk-premium-selling"],
        primaryArticleSlug: 'vertical-credit-spreads-comprehensive-guide-defined-risk-premium-selling',
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
        payoffExplanation: "Maximum profit occurs when stock price equals or exceeds the call strike at expiration. Profit is capped at strike price plus premium received.",
        relatedArticles: ["optionalpha-select-systematic-underlyer-selection-premium-selling", "covered-calls-vs-cash-secured-puts", "covering-world-global-evidence-covered-calls", "strategic-portfolio-management-option-writing", "options-wheel-trading-plan-quantitative-approach", "mastering-volatility-risk-premium-spx-options-selling"],
        primaryArticleSlug: 'covered-calls-vs-cash-secured-puts',
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
        payoffPresetId: 'short_put',
        payoffExplanation: "Legs are pre-filled with a real ~30-delta short put from the current SPX chain. Change the expiration or strike to see the payoff update live. Maximum profit is the premium collected, earned above the strike; loss grows below it, down to (in principle) the stock reaching zero.",
        relatedArticles: ["optionalpha-select-systematic-underlyer-selection-premium-selling", "covered-calls-vs-cash-secured-puts", "covering-world-global-evidence-covered-calls", "strategic-portfolio-management-option-writing", "options-wheel-trading-plan-quantitative-approach", "mastering-volatility-risk-premium-spx-options-selling"],
        primaryArticleSlug: 'covered-calls-vs-cash-secured-puts',
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
        payoffPresetId: 'long_put',
        payoffExplanation: "Legs are pre-filled with a real SPX put from the current chain. Change the expiration or strike to see the payoff update live. Maximum loss is the premium paid, occurring if the stock stays above the strike; profit grows as the stock falls below it, capped only by the stock reaching zero.",
        relatedArticles: ["single-leg-put-strategy-asymmetric-utility"],
        primaryArticleSlug: 'single-leg-put-strategy-asymmetric-utility',
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
        payoffPresetId: 'bear_put_spread',
        payoffExplanation: "Legs are pre-filled with a real long put (near the money) and short put (further OTM) from the current SPX chain. Change the expiration or either strike to see the payoff update live. Maximum profit occurs at or below the short put strike; maximum loss is the net debit paid, occurring at or above the long put strike.",
        relatedArticles: ["vertical-debit-spreads-strategic-architecture-defined-risk-trading"],
        primaryArticleSlug: 'vertical-debit-spreads-strategic-architecture-defined-risk-trading',
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
        payoffPresetId: 'bear_call_spread',
        payoffExplanation: "Legs are pre-filled with a real short call (~30 delta) and a further-OTM long call (~10 delta) from the current SPX chain. Change the expiration or either strike to see the payoff update live. Maximum profit is the net credit collected, occurring at or below the short call strike; maximum loss occurs at or above the long call strike.",
        relatedArticles: ["vertical-credit-spreads-comprehensive-guide-defined-risk-premium-selling"],
        primaryArticleSlug: 'vertical-credit-spreads-comprehensive-guide-defined-risk-premium-selling',
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
        payoffPresetId: 'short_straddle',
        payoffExplanation: "Legs are pre-filled with a real ATM call and put (same strike) from the current SPX chain. Change the expiration or either strike to see the payoff update live. Maximum profit is the net credit collected, earned right at the strike; losses grow without limit as the stock moves away in either direction.",
        relatedArticles: ["mastering-short-volatility-straddles-strangles-systematic-premium-collection"],
        primaryArticleSlug: 'mastering-short-volatility-straddles-strangles-systematic-premium-collection',
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
        payoffPresetId: 'short_strangle',
        payoffExplanation: "Legs are pre-filled with a real ~16-delta short call and short put from the current SPX chain. Change the expiration or either strike to see the payoff update live. Maximum profit is the net credit collected, earned when the stock stays between the two strikes; losses grow without limit beyond either strike.",
        relatedArticles: ["mastering-short-volatility-straddles-strangles-systematic-premium-collection"],
        primaryArticleSlug: 'mastering-short-volatility-straddles-strangles-systematic-premium-collection',
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
        // No payoffCalculator: the diagram below is the generic interactive SpxPayoffBuilder,
        // locked to the 'iron_condor' preset (src/lib/options/presets.ts) — real chain data,
        // not an illustrative formula.
        payoffPresetId: 'iron_condor',
        payoffExplanation: "Legs are pre-filled with realistic ~16-20 delta strikes from a real SPX option chain (sophie-option-research, historical). Change the expiration or any leg to see the payoff update live. Maximum profit is the net credit collected, earned when the stock stays between the short strikes at expiration; losses grow beyond either short strike and are capped once price passes the long (protective) strikes.",
        relatedArticles: ["iron-condor-quantitative-delta-neutral-premium-harvesting"],
        primaryArticleSlug: 'iron-condor-quantitative-delta-neutral-premium-harvesting',
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
        payoffPresetId: 'long_straddle',
        payoffExplanation: "Legs are pre-filled with a real ATM call and put (same strike) from the current SPX chain. Change the expiration or either strike to see the payoff update live. Maximum loss is the combined premium paid, occurring right at the strike; profit is unlimited as the stock moves away in either direction, once past breakeven.",
        relatedArticles: ["mastering-volatility-definitive-guide-long-straddles-strangles"],
        primaryArticleSlug: 'mastering-volatility-definitive-guide-long-straddles-strangles',
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
        payoffPresetId: 'long_strangle',
        payoffExplanation: "Legs are pre-filled with a real ~30-delta call and put from the current SPX chain. Change the expiration or either strike to see the payoff update live. Maximum loss is the combined premium paid, occurring anywhere between the two strikes; profit is unlimited beyond either strike, once past breakeven.",
        relatedArticles: ["mastering-volatility-definitive-guide-long-straddles-strangles"],
        primaryArticleSlug: 'mastering-volatility-definitive-guide-long-straddles-strangles',
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
        payoffExplanation: "According to put-call parity C + X = P + S, the payoff of wheel is the same as call writing or put writing",
        relatedArticles: ["optionalpha-select-systematic-underlyer-selection-premium-selling", "covered-calls-vs-cash-secured-puts", "covering-world-global-evidence-covered-calls", "strategic-portfolio-management-option-writing", "options-wheel-trading-plan-quantitative-approach", "mastering-volatility-risk-premium-spx-options-selling"],
        primaryArticleSlug: 'options-wheel-trading-plan-quantitative-approach',
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
        payoffPresetId: 'short_put',
        payoffExpirationTargetDte: 365, // LEAPS framing — far-dated expiration, not the 45 DTE default
        payoffExplanation: "Legs are pre-filled with a real ~30-delta short put from the current SPX chain, defaulted to a ~1-year expiration for the LEAPS framing. Change the expiration or strike to see the payoff update live. LEAPS put selling generates premium income upfront; if assigned, you acquire the stock at the strike price minus premium received.",
        relatedArticles: ["selling-long-dated-put-options-leaps-institutional-mechanics-volatility-arbitrage"],
        primaryArticleSlug: 'selling-long-dated-put-options-leaps-institutional-mechanics-volatility-arbitrage',
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
        payoffExplanation: "The collar creates a defined range of outcomes. Maximum loss occurs if stock falls to put strike, maximum profit if stock rises to call strike.",
        relatedArticles: ["option-collar-strategy-protect-gains-define-risk", "structured-liquidity-hedging-equity-collars-pvsf", "advanced-options-collar-strategies-structural-mechanics-tradeoffs"],
        primaryArticleSlug: 'option-collar-strategy-protect-gains-define-risk',
        detailComponent: CollarStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'buffered_strategy',
        category: ['Risk Defined', 'Income', 'Featured'],
        name: 'Buffered Strategy (Defined Outcome)',
        description: "A sophisticated defined outcome strategy that trades upside potential for downside protection. Combines stock ownership with a protective put spread collar to create a 'buffer' that absorbs the first X% of losses while capping gains at a predetermined level. Popular in ETF form for retirement planning and risk management.",
        profile: 'Buffered Risk, Defined Profit',
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
        payoffExplanation: "The strategy creates a defined range of outcomes. Maximum loss occurs if stock falls below the buffer limit (short put strike), maximum profit if stock rises to the cap (short call strike).",
        relatedArticles: ["mastering-buffered-yield-strategies-defined-outcome-investing", "option-collar-strategy-protect-gains-define-risk"],
        primaryArticleSlug: 'mastering-buffered-yield-strategies-defined-outcome-investing',
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
        payoffExplanation: "Maximum profit occurs when the stock price equals the strike price at front month expiration. The back month option retains maximum time value while the front month expires worthless.",
        relatedArticles: ["calendar-spread-architecture-time-decay-options-trading"],
        primaryArticleSlug: 'calendar-spread-architecture-time-decay-options-trading',
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
        payoffPresetId: 'call_butterfly',
        payoffExplanation: "Legs are pre-filled with a real equal-width call butterfly (long lower wing, short 2x middle, long upper wing) from the current SPX chain. Change the expiration or any strike to see the payoff update live. Maximum profit occurs at the middle strike; maximum loss is the net debit paid, capped once price passes either wing.",
        relatedArticles: ["unlocking-volatility-surface-risk-neutral-densities-butterfly-spread"],
        primaryArticleSlug: 'unlocking-volatility-surface-risk-neutral-densities-butterfly-spread',
        detailComponent: ButterflySpreadStrategyDetail as ComponentType<StrategyDetailProps>
    },
    {
        id: 'seagull_spread',
        category: ['Bullish', 'Income', 'Risk Defined'],
        name: 'Seagull Spread',
        description: "A three-legged options strategy that finances directional speculation through volatility skew arbitrage. Combines buying a call spread with selling an OTM put to create near-zero-cost directional exposure. Popular among institutional traders and corporate treasurers for risk-defined hedging.",
        profile: 'Substantial Risk, Capped Profit',
        volatility: 'Benefits from falling IV (Short Vega)',
        time: 'Benefits from time decay (Long Theta)',
        payoffPresetId: 'seagull_spread',
        payoffExplanation: "Legs are pre-filled with a real long call spread (0.40/0.20 delta) financed by a short put (0.20 delta) from the current SPX chain — checked against real data to actually be close to zero-cost. Change the expiration or any strike to see the payoff update live. Profit is capped at the call spread's width; loss grows below the short put strike (naked, not protected by a long put).",
        relatedArticles: ["seagull-spread-options-strategy-architecture"],
        primaryArticleSlug: 'seagull-spread-options-strategy-architecture',
        detailComponent: SeagullSpreadStrategyDetail as ComponentType<StrategyDetailProps>
    },
];

// --- UTILITY FUNCTIONS ---
export const getStrategyDetailComponent = (strategyId: string) => {
    const strategy = strategies.find(s => s.id === strategyId);
    return strategy?.detailComponent || DefaultStrategyDetail;
};

// Strategy <-> URL slug conversion (/option/strategies/{slug}), shared by strategy-explorer.tsx
// and the article-backlink lookup in lib/topic-links.ts so both agree on the same URLs.
export const strategyIdToSlug = (id: string): string => id.replace(/_/g, '-');
export const slugToStrategyId = (slug: string): string => slug.replace(/-/g, '_');
