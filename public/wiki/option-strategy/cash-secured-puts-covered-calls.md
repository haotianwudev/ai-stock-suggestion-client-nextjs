---
path: option-strategy/cash-secured-puts-covered-calls
title: "Cash-Secured Puts & Covered Calls: Disciplined Entry and Exit"
articleSlug: strategic-portfolio-management-option-writing
date: 2025-10-04
labels: [Options]
related: []
---

## Overview

Cash-secured puts and covered calls reframe options away from speculation and toward disciplined portfolio management: the put is a tool for strategic market *entry* (getting paid to wait for a target price), and the call is a tool for strategic market *exit* (getting paid to sell at a target price, or generating income while holding).

## Key Concepts

- **Cash-Secured Put** — sell a put and set aside the cash to buy the stock if assigned. Objective: acquire the stock below its current value, or keep the premium if it expires worthless. Strike selection near technical support increases the odds the stock "bounces" and the put expires worthless.
- **Covered Call** — own at least 100 shares per contract sold, which "covers" the obligation to deliver stock if assigned. Repeatedly selling short-term, out-of-the-money calls lowers cost basis over time, creating a synthetic dividend.
- **IV Rank / IV Percentile** — contextualizes current implied volatility against its own historical range. Selling premium when IV Rank is high (e.g., above 50) is favorable because volatility tends to mean-revert, benefiting the option seller.

## The Greeks for Option Writers

- **Delta (Δ)** — rate of price change per $1 move in the stock; also a rough proxy for probability of assignment.
- **Theta (Θ)** — time decay; the option writer's primary source of profit as the premium collected erodes daily.
- **Vega (V)** — sensitivity to implied volatility; sellers profit from a "Vega crush" (IV declining) since it cheapens the option they need to buy back.
- **Gamma (Γ)** — the rate of change of Delta; high gamma means the position's risk profile can shift quickly, especially near expiration.

## Scenario Mechanics

- **Cash-Secured Put example** — sell a $95 put on a $100 stock for $2.00 premium ($200 total, $9,500 cash secured). Breakeven is $93.00. Above $95 at expiration, the put expires worthless and the full premium is kept; below $93, the position shows a net paper loss; at $0 the maximum loss is $9,300 (cash secured minus premium collected).
- **Covered Call example** — own 100 shares at $48, sell a $50 call for $1.50 ($150 premium). Breakeven is $46.50, max gain is $350 (strike minus purchase price, plus premium) if shares are called away at or above $50.

## Risk Management

- Avoid "catching a falling knife" as a put writer — being forced to buy a stock that keeps falling.
- "Rolling" (buying back a losing short option and selling a new one further out and/or at a different strike, often for a net credit) buys time and improves the breakeven, but doesn't eliminate the underlying directional risk.
- Pre-trade checklist: market outlook matches the strategy, max loss/breakeven are known and acceptable, position size is within a portfolio risk limit (e.g., under 3%), the option is liquid, no upcoming earnings/ex-dividend surprises, and a pre-defined exit plan exists.

## Key Takeaways

- Both strategies convert option premium into a discipline mechanism: puts enforce a systematic, income-generating way to wait for a buy price; calls enforce a systematic way to realize gains or generate income on an existing holding.
- Theta decay is the structural edge of being an option seller, but it's earned by taking on real assignment/downside risk — max loss on both strategies is substantial if the stock goes to zero.
- Selling into elevated, historically high IV Rank (not just "high IV" in isolation) is the statistically favorable time to write premium.
- Successful option writing is described as behaving like an insurance company: consistent underwriting criteria, systematic premium collection, and risk management applied over a large number of occurrences rather than any single trade.

## Related Reading

- [Strategic Portfolio Management via Option Writing](/articles/strategic-portfolio-management-option-writing)
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vTOrdqZPBCcH4OrKMlfCrf8WlDzYrTzCaA8xGJqp4tV9trw7p-FIrtxnHSjzD9VnMEZFumz_-TE-aDo/pub)
