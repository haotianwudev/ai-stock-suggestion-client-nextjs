---
path: option-strategy/earnings-volatility-selling-strategy
title: "Advanced Option Strategy: Earnings Volatility Selling"
articleSlug: earnings-volatility-selling-strategy-complete-guide
date: 2025-07-13
labels: [Options, Quantitative Finance]
related: []
---

## Overview

A data-driven strategy for selling short-term options (straddles or calendar spreads) before earnings announcements to harvest two edges: the rapid post-announcement drop in implied volatility (&ldquo;IV crush&rdquo;) and stocks' tendency to move less than the options market has priced in. Backtested across 72,500 earnings events on 4,500 stocks (2007-2024), the key finding is stark: blindly trading every earnings event yields near 0% mean return — the edge exists only when filtering for high-probability setups.

## Key Concepts

- **IV crush** — implied volatility priced into options ahead of earnings is historically higher than the realized volatility of the actual move, because of an uncertainty premium that disappears once results are announced.
- **Who overpays for options** — hedgers (institutions buying protection regardless of cost) and retail speculators (chasing lottery-like payouts on short-dated calls) inflate pre-earnings option prices, creating the exploitable edge.
- **Screening criteria (all three required)** — term structure backwardation (front-month IV significantly above back-month IV), a high IV/RV ratio (ideally &gt;1.5), and sufficient liquidity (minimizes slippage on entry/exit).

## Trade Structures

| | Short Straddle | Long Calendar Spread |
|---|---|---|
| Mechanism | Sell ATM call + ATM put, same expiration | Sell front-month, buy back-month at same strike |
| Risk | High — unlimited loss potential | Medium — limited to net debit paid |
| Mean Return | 9.0% per trade (filtered) | 7.3% per trade (filtered) |
| Win Rate | 64% | 66% |
| Position Sizing | ≤2% of capital | ≤6% of capital |

## Execution Rules

- **Entry**: open the position 15 minutes before market close on earnings announcement day.
- **Exit**: close the position 15 minutes after market open the following trading day.
- **Position sizing**: never use full Kelly sizing — even with a genuine statistical edge, improper sizing leads to ruin. Straddles capped at ≤2% of capital, calendars at ≤6%.

## The Four Pillars of Risk Management

1. Never trade full Kelly — theoretically optimal growth, practically unacceptable volatility.
2. Straddles ≤2% of capital — protects against tail-risk events with unlimited downside.
3. Calendars ≤6% of capital — balances meaningful returns against capital preservation.
4. Avoid low liquidity — wide bid-ask spreads can completely erase the strategy's edge.

At 10% Kelly sizing (6% per calendar trade), the simulation shows $10,000 growing to a mean ~$6M over 10 years with 0% simulated bankruptcy risk — a ~90% CAGR.

## Case Study: AMZN Earnings Trade

A Feb 7/Mar 7 call calendar (100 contracts, $3.33/spread, $33,300 total risk) flagged &ldquo;RECOMMEND&rdquo; by the screening criteria. Actual move was +2.5% vs. an expected ~7% — a textbook IV crush, netting +$9,300. A straddle on the same event would have earned more, but the calendar's defined-risk structure is the explicit trade-off for protection against large unexpected moves.

## Building a Screening Tool

- **Data needed**: earnings calendar, options chains (IV, Greeks), historical prices, volume data.
- **Term structure slope**: `front_month_iv − back_month_iv` — negative values (backwardation) are favorable.
- **IV/RV ratio**: `rv = stdev(log_returns_30d) × sqrt(252)`, then `ratio = thirty_day_iv / rv` — values &gt;1.5 indicate overpriced volatility.
- **Volume filter**: 30-day average volume, typically ≥500k shares/day minimum.
- **Recommendation tiers**: RECOMMEND (all criteria met), CONSIDER (partial), AVOID (poor setup).

## Key Takeaways

- The single most important finding is that this is not a "sell every earnings straddle" strategy — unfiltered trading returns ~0%, meaning the entire edge lives in the screening criteria (term structure, IV/RV ratio, liquidity), not in the options structures themselves.
- Straddles and calendars aren't competing choices but a risk-tolerance dial on the same underlying edge — straddles capture more of the IV crush but with unlimited tail risk, calendars sacrifice some upside for a hard-capped loss, reflected directly in their different position-sizing limits (2% vs. 6%).
- The AMZN case study is deliberately chosen to show a "perfect" IV crush outcome, but the accompanying trade-off analysis is the more important lesson: it explicitly quantifies what defined-risk costs you in upside, rather than presenting the calendar spread as strictly superior.

## Related Reading

- [Advanced Option Strategy: Earnings Volatility Selling](/articles/earnings-volatility-selling-strategy-complete-guide)
