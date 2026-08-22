---
path: option-strategy/option-liquidity-scoring
title: Option Liquidity Scoring
articleSlug: ""
date: 2026-08-21
labels: ["Quantitative Finance", "Options Trading"]
related: ["option-strategy/options-viewer-methodology", "option-strategy/options-hud-metrics", "option-strategy/volume-open-interest-analysis"]
---

## Overview

Implementation spec for the per-contract liquidity score in SOPHIE's options chain (`OptionsMatrixTable`, `lib/options/liquidity.ts`). The score answers one practical question: **if I send this order, will it fill at a price close to the mid?**

It is calibrated specifically to SPX microstructure, where ATM spreads trade extremely tight (under 0.3%) and widen rapidly out-of-the-money. A generic equity-options model mis-scores SPX badly in both directions.

## Mid Price and Spread

$$
\text{Mid Price} = \frac{\text{Bid} + \text{Ask}}{2}, \qquad \text{Spread \%} = \frac{\text{Ask} - \text{Bid}}{\text{Mid Price}}
$$

## Design Principle: Spread Gates the Score

The central modelling decision. A contract with enormous open interest but an unfillable quote — say $0.00 bid against a $5.00 ask — is **not liquid**, however much size rests there.

So spread acts as a **strict multiplicative gate**, not as one arithmetic component that heavy open interest can outvote. A naive weighted average of spread, volume and OI would rank that contract as tradeable. This model cannot: if the spread score is zero, the composite is zero regardless of activity.

## Component Scores

**Spread score** — a piecewise-linear curve whose breakpoints reflect where SPX quotes actually sit:

$$
\text{Score}_{\text{spread}} = \begin{cases}
100 & \text{Spread \%} \le 0.3\% \\
100 - 30 \times \frac{\text{Spread \%} - 0.003}{0.010 - 0.003} & 0.3\% < \text{Spread \%} \le 1.0\% \\
70 - 40 \times \frac{\text{Spread \%} - 0.010}{0.030 - 0.010} & 1.0\% < \text{Spread \%} \le 3.0\% \\
30 - 30 \times \frac{\text{Spread \%} - 0.030}{0.080 - 0.030} & 3.0\% < \text{Spread \%} \le 8.0\% \\
0 & \text{Spread \%} > 8.0\%
\end{cases}
$$

**Volume and open interest scores** — both log-scaled, because activity is roughly log-distributed across a chain and a linear scale would let a handful of ATM strikes dominate everything:

$$
\text{Score}_{\text{vol}} = \min\left(100, \frac{\log_{10}(\text{Volume} + 1)}{\log_{10}(1001)} \times 100\right)
$$

$$
\text{Score}_{\text{OI}} = \min\left(100, \frac{\log_{10}(\text{OI} + 1)}{\log_{10}(5001)} \times 100\right)
$$

The different denominators set the saturation points: volume saturates at ~1,000 contracts traded, open interest at ~5,000 resting.

**Activity score** — volume weighted above open interest, since today's trading is a better signal of a live market than resting size that may be stale:

$$
\text{Score}_{\text{activity}} = 0.65 \times \text{Score}_{\text{vol}} + 0.35 \times \text{Score}_{\text{OI}}
$$

## Composite Score

$$
\text{Score}_{\text{composite}} = \text{round}\left( \text{Score}_{\text{spread}} \times \left(0.55 + 0.45 \times \frac{\text{Score}_{\text{activity}}}{100}\right) \right)
$$

The $0.55 + 0.45(\cdot)$ envelope is what makes spread a gate rather than a veto. A tight-spread contract with no activity still scores 55% of its spread score — genuinely tradeable, just quiet. A wide-spread contract cannot be rescued by activity, because the multiplier only ever scales *down* from the spread ceiling.

| Tier | Score | Badge |
|---|---|---|
| **Excellent** | $\ge 75$ | Emerald |
| **Good** | 50–74 | Blue |
| **Fair** | 25–49 | Amber |
| **Poor** | $< 25$ | Rose |

## How This Kind of Score Is Used in Practice

A composite liquidity score of this shape is a standard building block on professional execution desks, not a SOPHIE-specific idea — it's the same logic behind smart-order-routing and pre-trade "tradability" checks that route flow away from contracts likely to produce poor fills. In practice traders use a score like this three ways:

- **Screening.** Filtering a chain down to strikes actually worth quoting, before looking at price at all — useful on wide chains like SPX where hundreds of strikes are listed but liquidity concentrates near the money.
- **Sizing.** A thin contract that would move on a 1-lot can still be fine for size 1, but the same score should discourage size 50 — spread and depth both matter to how much size a quote can actually absorb, which a pure spread-percentage number doesn't capture.
- **Execution timing.** Spread and volume both vary through the trading day — tightest near the open/close and around major index rebalances, widest in quiet midday stretches — so desks that watch a rolling liquidity score rather than a static one avoid trading into temporarily bad conditions.

## Limitations

- **Quotes are a snapshot.** A tight spread at the moment of capture says nothing about depth behind it, or whether the quote survives an order of size.
- **Volume is same-day, open interest is prior-day.** They are measured over different windows, so the activity blend mixes two clocks.
- **Calibrated to SPX.** The breakpoints assume index-option microstructure and would need recalibration for single-name equity options, where 1% spreads can be normal rather than mediocre.

## Key Takeaways

- Spread gates the score multiplicatively — size never rescues an unfillable quote.
- Volume and OI are log-scaled, saturating at ~1,000 and ~5,000 contracts.
- Volume is weighted 0.65 against OI's 0.35: live trading beats resting size.
- A quiet but tight contract floors at 55% of its spread score rather than collapsing.

## Related Reading

- [Options Viewer Methodology](/wiki/option-strategy/options-viewer-methodology) — index of all viewer specs
- [Options HUD Metrics](/wiki/option-strategy/options-hud-metrics) — cycle-level liquidity tiering
- [Volume & Open Interest Analysis](/wiki/option-strategy/volume-open-interest-analysis)
