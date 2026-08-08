---
path: option-strategy/leap-put-selling
title: "Selling LEAP Puts: Institutional Mechanics & Retail Traps"
articleSlug: selling-long-dated-put-options-leaps-institutional-mechanics-volatility-arbitrage
date: 2025-12-13
labels: [Options Trading]
related: []
---

## Overview

Selling a LEAP put (1+ year to expiration) is not a theta-decay income strategy the way a 30-day put is — it's dominated by Delta and Vega, not time decay. The two legitimate institutional uses are strategic acquisition (a synthetic limit order, &ldquo;Buffett-style&rdquo;) and volatility arbitrage (a short-Vega bet on IV mean reversion). Retail traders who sell LEAPs for &ldquo;income&rdquo; are using capital inefficiently and walking into illiquidity, Vega, and dead-money traps institutions are structured to avoid.

## Key Concepts

- **Greek Profile: LEAP vs. 30-Day** — a 2-year ATM put has extremely high Vega (~$2.50) vs. a 30-day put's low Vega (~$0.40); LEAP Theta is low/linear (~$0.40/day) vs. 30-day's high/exponential (~$9.00/day); LEAP Gamma is stable/low (0.001) vs. 30-day's explosive/high (0.008) gamma risk.
- **Strategy A: Acquisition** — OTM strikes (delta -0.20 to -0.40), goal is assignment at a discount ("Buffett-style" synthetic limit order); risk is missing upside if the stock rallies instead.
- **Strategy B: Volatility Arbitrage** — ATM strikes (delta ~-0.50), goal is maximizing Vega exposure to profit from IV mean reversion; risk is the "Vega time bomb" if IV expands instead of contracting.
- **Deep ITM Financing** — delta -0.80 to -1.0, functions as synthetic stock ownership with capital efficiency benefits, but carries early-assignment risk around dividends.

## Institutional Case Studies

- **The Buffett Put (Coca-Cola, 1993)** — Buffett sold 5M puts at a $35 strike (KO traded at $40, and he wanted to own it at $35), collecting $7.5M in premium. The stock stayed above $35, puts expired worthless — he was paid to make a purchase decision he wanted to make anyway.
- **The OXY Misconception (2019)** — often mischaracterized as a put sale; Berkshire's $10B into Occidental Petroleum was actually Strategic Financing (8% preferred stock + warrants), a *long* volatility play via the warrants, not a short-put strategy.
- **Dividend Arbitrage Counterparty** — deep ITM LEAP puts are often bought by dividend arbitrageurs running a conversion/box-spread: buy stock + deep ITM put, collect the dividend, then exercise the put to sell at the fixed strike. The LEAP seller supplies the liquidity for this near risk-free institutional trade.

## Quantitative Pitfalls (The Retail Traps)

- **Illiquidity & Slippage** — LEAP bid-ask spreads are dramatically wider than monthly options (e.g. ~2% one-way slippage on SPY LEAPs, 13%+ on a volatile single name), making a round-trip "roll" prohibitively expensive.
- **The Vega Time Bomb** — a flat stock price can still produce a large loss purely from IV expansion: modeling a short 2-year ATM put at 54% initial IV, an IV spike to 70% loses money even with zero price movement, while an IV crush to 35% is the profitable outcome — the position's P/L is driven by fear, not direction.
- **Capital Inefficiency ("Dead Money")** — a 2-year LEAP put's max return on capital (~18%) is dramatically lower than a compounded series of monthly puts over the same period (~131%), since capital is locked and can't be redeployed.

## The "No-Exit" Rule

Because of the illiquidity trap, a LEAP put seller should assume they're committed to the position for the full term. There are three outcomes: **Assignment** (take delivery of shares — optimal for acquirers), **Expiration** (option expires worthless, keep 100% premium — optimal for vol arb), or **Emergency Close** (only justified if profit exceeds ~50% early, since the spread cost of exiting is otherwise prohibitive).

## Key Takeaways

- LEAP puts are a Vega/Delta play, not a Theta play — treating them like a monthly income strategy misunderstands the instrument entirely.
- The two legitimate use cases are acquisition (OTM, discount-buying intent) and volatility arbitrage (ATM, IV mean-reversion intent) — not "collecting income."
- Illiquidity is the structural trap: wide bid-ask spreads make rolling or early exit expensive enough to effectively lock you into the position.
- Capital efficiency strongly favors shorter-dated, compounded put-selling over a single 2-year LEAP, if income generation is actually the goal.

## Related Reading

- [Selling Long-Dated Put Options (LEAPs): Institutional Mechanics, Volatility Arbitrage, and the Retail Traps](/articles/selling-long-dated-put-options-leaps-institutional-mechanics-volatility-arbitrage) — full article with the complete Greek comparison table, illiquidity data, and practical execution framework.
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vQvTNTE3JeoNILFL-FzOK2gUHdhk3ZG7FJCcILRgbVNA9YX1kPEWexRtWBrotSq9eh9KNjUsMrLN6-p/pub)
