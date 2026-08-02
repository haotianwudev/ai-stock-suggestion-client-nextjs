---
path: option-strategy/gex
title: Gamma Exposure (GEX)
articleSlug: gamma-exposure-gex-gps-market-volatility
date: 2026-08-02
labels: [Quantitative Finance, Options Trading]
related: []
---

## Overview

Gamma Exposure (GEX) measures the aggregate rate-of-change of options market makers' hedge ratios across all strikes and expirations for an underlying. It approximates how much stock or futures market makers must buy or sell as the underlying price moves, and therefore whether their hedging flows will **dampen** volatility (positive GEX) or **amplify** it (negative GEX).

Market makers who sell options to retail and institutional traders are typically **short gamma**. To stay delta-neutral, they must continuously re-hedge as price moves — and the direction of that re-hedging flow depends on the sign of aggregate gamma exposure.

## Key Concepts

- **Market Maker (MM)** — The counterparty that sells most retail option flow and must hedge the resulting directional risk (delta) by trading the underlying.
- **Delta-Neutral Hedging** — A market maker's practice of trading the underlying instrument so that the net directional exposure (delta) of their book stays near zero.
- **Positive Gamma Regime** — MMs are net long gamma (short calls to buyers). They buy dips and sell rallies, dampening volatility ("Buy Low, Sell High").
- **Negative Gamma Regime** — MMs are net short gamma. They sell into drops and buy into rallies, amplifying volatility ("Sell Low, Buy High").
- **Call Wall** — The strike with the largest net positive gamma; acts as resistance because MMs sell the underlying into rallies toward it.
- **Put Wall** — The strike with the largest net negative gamma concentration; acts as support because MMs buy back hedges near it.
- **Zero Gamma / Gamma Flip** — The price level where aggregate GEX crosses from positive to negative — the "volatility switch" between stable and unstable regimes.

## Formulas

$$
\text{GEX} = \sum \left( \Gamma \times \text{OI} \times M \times S \right)
$$

Where the sum is taken across all strikes and expirations:

- $\Gamma$ — Gamma of the option (rate of change of delta with respect to underlying price)
- $\text{OI}$ — Open interest at that strike/expiration
- $M$ — Contract multiplier (typically 100 for equity/index options)
- $S$ — Spot price of the underlying

**Worked example:** SPX at 4,500 with 10,000 contracts of open interest at the 4,500 strike call, Gamma = 0.05:

$$
\text{GEX} = 0.05 \times 10{,}000 \times 100 \times 4{,}500 = \$225{,}000{,}000
$$

Meaning: for every 1-point move in SPX, market makers must hedge roughly $225M of notional exposure from this single strike alone.

## Key Takeaways

- **Positive GEX → mean reversion.** Sell volatility, expect price to respect support/resistance; risk is a large news shock that breaks the "stickiness."
- **Negative GEX → momentum.** Trade breakouts with tight trailing stops; don't fight the trend, but expect whipsaws.
- **Options expiration (OpEx) pinning.** Near Friday expiration, price often gravitates toward strikes with the largest gamma concentration (Call Walls); the effect fades immediately after expiry.
- GEX is a **derived metric** — use it alongside other technical and flow-based analysis, not as a standalone signal.

## Related Reading

- [Gamma Exposure (GEX): The GPS of Market Volatility](/articles/gamma-exposure-gex-gps-market-volatility) — full article with the interactive Market Maker Physics visualizer and regime playbooks.
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vQt5lOaJ_vhjHD6NbGJ5SGZhyLONQADFnfZli8z0ayeZyyhryfJk9k3cjRTttGmrF2kJPeik1Jmj3Bg/pub)
