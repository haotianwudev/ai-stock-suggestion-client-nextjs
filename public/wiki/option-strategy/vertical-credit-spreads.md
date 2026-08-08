---
path: option-strategy/vertical-credit-spreads
title: "Vertical Credit Spreads: Defined-Risk Premium Selling"
articleSlug: vertical-credit-spreads-comprehensive-guide-defined-risk-premium-selling
date: 2025-10-25
labels: [Options Trading]
related: []
---

## Overview

A vertical credit spread sells an option and simultaneously buys a further out-of-the-money option in the same expiration cycle, collecting a net credit while capping maximum loss. It's a defined-risk alternative to selling naked options: a modest reduction in potential profit buys absolute risk control and far lower margin requirements.

## Key Concepts

- **Bull Put Spread** — sell a put, buy a further OTM put for protection. Bullish-to-neutral: profits if the stock rises, stays flat, or even drops slightly (as long as it stays above the short strike).
- **Bear Call Spread** — sell a call, buy a further OTM call for protection. Bearish-to-neutral: profits if the stock falls, stays flat, or rises slightly.
- **Why spreads beat naked options** — a naked short option carries unlimited (calls) or substantial (puts) risk and very high margin requirements. The long leg of a spread caps that risk at a known, defined amount, dramatically improving capital efficiency for a modest reduction in premium collected.
- **The Greeks for a credit spread seller** — positive theta (position gains value from time decay), negative vega (position profits as implied volatility falls), and gamma risk that increases sharply as expiration approaches.

## Trade Selection Criteria

- **High Implied Volatility** — only sell spreads when IV Rank is above ~30; this is what makes the premium collected worth the risk taken.
- **Liquid underlyings** — high daily volume and open interest (SPY, QQQ, large-caps) to ensure tight bid-ask spreads.
- **Avoid binary events** — never hold a spread through earnings or other major scheduled announcements; a single gap can overwhelm the statistical edge.
- **Reasonable pricing** — stocks in the $50-$500 range with $1 or $5 strike increments tend to offer the best combination of liquidity and manageable spread width.

## Strike and Width Selection

- **Delta as probability proxy** — delta approximates the probability an option expires in-the-money. Conservative traders sell at 10-20 delta (high win rate, small premium); balanced traders use 25-35 delta; aggressive traders push to 40-50 delta (larger premium, closer to a coin flip).
- **Width-to-credit ratio** — a common rule of thumb is to collect roughly one-third of the spread's width as credit (e.g., ~$1.00 credit on a $3-wide spread).

## Trade Management Rules

- **Entry**: 30-60 days to expiration, with ~45 DTE often cited as the optimal balance of theta decay vs. gamma risk.
- **The 50% Profit Rule**: close the position once 50% of the initial credit has been captured — this improves win rate and annualized return on capital versus holding to expiration.
- **The 21 DTE Rule**: gamma risk accelerates sharply inside 21 days to expiration; close profitable trades or actively manage/roll losing ones by this point.
- **Rolling**: always roll for a net credit (never pay to roll) — extending duration should be compensated, not costly. You can roll "out" to a later date or "out and down/up" to different strikes.
- **Pin risk**: the danger of the underlying closing exactly at your short strike at expiration, risking unexpected assignment. Always close spread positions before market close on expiration day rather than let them expire.

## Common Mistakes

- **Legging in** — entering each side of the spread separately in an attempt to time the market, which turns a high-probability spread into a low-probability directional bet.
- **Trading through earnings** — placing a spread with an earnings date inside the expiration window is gambling on a gap, not a probability-based strategy.
- **Over-sizing** — "defined risk" doesn't mean unlimited position size; risking too much per trade still leads to emotional decision-making.
- **Chasing the highest premium** — unusually rich premiums usually reflect unusually high risk in the underlying, not free money.

## Key Takeaways

- Vertical credit spreads profit in three scenarios (favorable move, sideways, or a small adverse move), not just one direction — this structurally raises win probability versus outright stock ownership.
- The trade's edge comes primarily from selling elevated implied volatility, not from directional forecasting skill.
- A consistent, rules-based process (delta for strike selection, 1/3-width credit target, 45 DTE entry, 50% profit-take, 21 DTE risk management) removes most emotional decision points from the strategy.
- Capital efficiency (low margin relative to naked selling) is what allows systematic, diversified premium-selling at scale.

## Related Reading

- [Vertical Credit Spreads: A Comprehensive Guide to Defined-Risk Premium Selling](/articles/vertical-credit-spreads-comprehensive-guide-defined-risk-premium-selling) — full article with a complete trade walkthrough and spreads-vs-naked-options comparison table.
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vTX5OTxEBDIL3oWyOJ_VY1iw1SLrcJl8tVvWxuAfaoVqUo467i0yGoX66RqXDO1En1gBGO38px-ZIWo/pub)
