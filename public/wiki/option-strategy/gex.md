---
path: option-strategy/gex
title: Gamma Exposure (GEX)
articleSlug: gamma-exposure-gex-gps-market-volatility
date: 2026-08-02
labels: ["Quantitative Finance", "Options Trading"]
related: []
---

## Overview

Gamma Exposure (GEX) measures the aggregate rate-of-change of options market makers' hedge ratios across all strikes and expirations for an underlying. It approximates how much stock or futures market makers must buy or sell as the underlying price moves, and therefore whether their hedging flows will **dampen** volatility (positive GEX) or **amplify** it (negative GEX).

Market makers who sell options to retail and institutional traders are typically **short gamma**. To stay delta-neutral, they must continuously re-hedge as price moves — and the direction of that re-hedging flow depends on the sign of aggregate gamma exposure.

## Key Concepts

- **Market Maker (MM)** — The counterparty that sells most retail option flow and must hedge the resulting directional risk (delta) by trading the underlying.
- **Delta-Neutral Hedging** — A market maker's practice of trading the underlying instrument so that the net directional exposure (delta) of their book stays near zero.
- **Gamma** — The rate of change of an option's delta for a 1-point move in the underlying's price; it's what forces MMs to keep re-hedging as price moves.
- **Open Interest (OI)** — The total number of outstanding option contracts at a given strike; represents the size of the position MMs must hedge.
- **Zero Gamma / Gamma Flip** — The price level where aggregate GEX crosses from positive to negative — the "volatility switch" between stable and unstable regimes.

## Market Regimes

**Positive GEX (Long Gamma)**
- MMs are net long gamma. They buy the underlying when price falls and sell when it rises.
- Effect: stabilizing — price moves are dampened.
- Behavior: mean-reversion; price tends to trade in tighter ranges around major strikes.

**Negative GEX (Short Gamma)**
- MMs are net short gamma. They sell the underlying when price falls and buy when it rises.
- Effect: volatile — price moves are exacerbated.
- Behavior: trend-continuation; support/resistance levels break more easily, larger intraday swings.

## Formulas

GEX is quoted two ways, and they differ by a factor of $S$. In **shares** to be hedged per 1% move:

$$
\text{GEX}_{\text{shares}} = \sum_{i} \left( \Gamma_i \times \text{OI}_i \times C \times S \times 1\% \right)
$$

In **dollars** of notional per 1% move — the form most services publish, and the one SOPHIE's Options Viewer reports:

$$
\text{GEX}_{\$} = \sum_{i} \left( \Gamma_i \times \text{OI}_i \times C \times S^2 \times 1\% \right)
$$

Where the sum is taken across all strikes and expirations:

- $\Gamma_i$ — Gamma of the option at strike $i$
- $\text{OI}_i$ — Open interest at strike $i$
- $C$ — Contract multiplier (typically 100 for equity/index options)
- $S$ — Spot price of the underlying
- The $1\%$ term expresses GEX per 1% move in the underlying, rather than per single point — this makes GEX comparable across underlyings trading at very different price levels.

The second factor of $S$ is what converts a share count into a dollar figure. Dropping it is the most common error in GEX write-ups.

**Worked example:** a single call strike with Gamma = 0.05, 10,000 contracts of open interest, a 100-share multiplier, and the underlying at $4,000 (so a 1% move = $40):

$$
\text{GEX}_{\text{shares}} = 0.05 \times 10{,}000 \times 100 \times 4{,}000 \times 0.01 = 2{,}000{,}000 \text{ shares}
$$

$$
\text{GEX}_{\$} = 2{,}000{,}000 \times \$4{,}000 = \$8\text{B}
$$

Step by step: gamma of 0.05 means delta moves 0.05 per $1 of underlying, so a $40 move shifts delta by 2.0 per contract, or 200 shares once the 100-share multiplier is applied. Across 10,000 contracts that is 2,000,000 shares — **$8B of notional** — that market makers must hedge from this single strike alone.

## Key Takeaways

- **Positive GEX → mean reversion.** Sell volatility, expect price to respect support/resistance; risk is a large news shock that breaks the "stickiness."
- **Negative GEX → momentum.** Trade breakouts with tight trailing stops; don't fight the trend, but expect whipsaws.
- **Zero Gamma is a pivot, not just a line.** Crossing it often signals a shift in trading style from range-bound to momentum — treat it as the tell, not a static level.
- **Positive GEX playbook:** favor mean-reversion / range trades, sell premium (e.g. iron condors), and lean on high-OI strikes as likely pinning levels.
- **Negative GEX playbook:** favor trend-following and breakout trades, buy options or hedge directionally, and don't trust support levels — they break more easily in this regime.
- GEX is a **derived metric** — use it alongside other technical and flow-based analysis, not as a standalone signal.

## Related Reading

- [Gamma Exposure (GEX): The GPS of Market Volatility](/articles/gamma-exposure-gex-gps-market-volatility) — full article with Market Regime breakdowns and trading playbooks.
- [GEX Calculation Methodology](/wiki/option-strategy/gex-methodology) — how SOPHIE computes the flip level and call/put walls, and the assumptions behind them.
- [Watch on YouTube](https://youtu.be/t_5yWuxn0WY)
