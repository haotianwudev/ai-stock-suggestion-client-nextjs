---
path: option-strategy/options-hud-metrics
title: Options HUD Metrics
articleSlug: ""
date: 2026-08-21
labels: ["Quantitative Finance", "Options Trading"]
related: ["option-strategy/options-viewer-methodology", "option-strategy/option-liquidity-scoring", "option-strategy/volume-open-interest-analysis"]
---

## Overview

Implementation spec for the summary metrics in the top banner of SOPHIE's **Options Viewer** (`OptionsMetricsBar`), plus the expiration-cycle selector beneath it. These are the numbers that frame every other view — what the market expects to move, where sellers are positioned, and which expirations are actually worth looking at.

All calculations assume standard **^SPX** conventions: European exercise, cash settlement, and a **$100 contract multiplier**.

## At-the-Money Implied Volatility

The implied volatility of the contract nearest spot:

$$
\text{Strike}_{\text{ATM}} = \arg\min_K |K - S| \qquad \text{ATM IV} = \text{IV}(\text{Strike}_{\text{ATM}})
$$

When both call and put IVs are quoted at the ATM strike, the mid-market average is reported.

## Expected Move

How far the underlying is priced to travel by expiration. Two methods, in preference order:

**Primary — ATM straddle implied range.** The market-maker rule of thumb:

$$
\text{Expected Move}_{\$} = \left(C_{\text{ATM, Mid}} + P_{\text{ATM, Mid}}\right) \times 0.85
$$

$$
\text{Expected Move}_{\%} = \frac{\text{Expected Move}_{\$}}{S} \times 100
$$

**Fallback — Black-Scholes $1\sigma$ dispersion.** Used when single-leg straddle quotes are missing:

$$
\text{Expected Move}_{\$} = S \times \text{ATM IV} \times \sqrt{T}, \qquad T = \frac{\text{DTE}}{365}
$$

The 0.85 factor in the straddle method is an empirical adjustment: a raw straddle price overstates the one-standard-deviation move because it prices the full expected absolute deviation, not the $1\sigma$ band. Verified against independent options-education sources — this is a widely used shortcut, popularised by tastytrade, for turning a live at-the-money straddle price into a 1σ range without running a Black-Scholes model at all.

**How it's used:** Expected Move is the standard reference for sizing a strangle or iron condor's short strikes — placed just outside the expected move to keep the position's probability of touching a short strike relatively low. It is also the go-to gauge for earnings and other binary events: traders compare the pre-event expected move (implied) against the stock's typical historical move on similar events (realized) to judge whether the options market is pricing the event rich or cheap, which is the entire basis for "buy the move" vs. "sell the move" earnings strategies.

## Max Pain Strike

The settlement price at which option buyers collectively lose the most — equivalently, where sellers pay out the least:

$$
\text{Max Pain} = \arg\min_K \left[ \sum_{i} \max(0, K - K_{c,i}) \cdot \text{OI}_{c,i} + \sum_{j} \max(0, K_{p,j} - K) \cdot \text{OI}_{p,j} \right]
$$

**Suppression rule:** when open interest is unavailable (EOD snapshots sometimes omit OI fields), Max Pain is hidden rather than displayed. Without OI every strike ties at zero payout and $\arg\min$ returns an arbitrary strike — a confidently-rendered meaningless number, which is worse than showing nothing.

**How it's used, and why to be skeptical:** Max Pain is popularly cited as a "pin" traders expect price to gravitate toward into expiration, particularly for weekly and 0DTE options. The mechanism, to the extent one exists, runs through dealer hedging (see [GEX](/wiki/option-strategy/gex-methodology)) rather than the payout curve itself exerting any force — the curve describes an outcome, not a cause. Academic and practitioner studies of the "max pain effect" find it weak and inconsistent once normal price drift is controlled for, so treat it as one input among many rather than a reliable target.

## Put/Call Ratios

$$
\text{PCR}_{\text{Volume}} = \frac{\sum \text{Put Volume}}{\sum \text{Call Volume}}, \qquad \text{PCR}_{\text{OI}} = \frac{\sum \text{Put OI}}{\sum \text{Call OI}}
$$

The two answer different questions. **Volume PCR** reads today's directional flow: above 1.0 is put-heavy (bearish tilt), below 1.0 call-heavy. **OI PCR** reads accumulated structural positioning and moves far more slowly.

**How it's used:** PCR is a classic **contrarian sentiment indicator**, not a directional signal to trade with. Extreme readings — very high put volume relative to calls — are conventionally read as excessive fear or hedging demand, which contrarians treat as a bullish setup on the theory that sentiment is overextended; extreme call-heavy readings suggest complacency. Desks and volatility funds also track the CBOE's own equity and index PCR series over longer windows the same way they'd use VIX rank — as a regime gauge, not a single-day trade trigger.

## Expiration Cycle Selection

SPX lists roughly 55 expirations — dailies, Friday weeklies, standard monthlies, quarterlies and LEAPS out several years. Listing all of them makes the selector unusable, so the default **Key Expiries** filter keeps only the cycles that carry real liquidity:

1. **Near-term dailies** — every cycle with $\text{DTE} \le 2$. At this horizon weekday does not matter; 0DTE and 1DTE are among the most actively traded SPX contracts.
2. **Friday weeklies** — the next 4 non-monthly Friday expiries.
3. **Standard monthlies** — the next 4. These are the 3rd Friday of the month (always falling on days 15–21), AM-settled, and carry the deepest open interest on the board.
4. **LEAPS anchor** — the monthly cycle nearest ~365 DTE, so the strip still reaches a one-year horizon without listing every LEAPS.

On a representative chain this reduces 56 cycles to 14, of which only one is a non-Friday.

## Cycle Liquidity Tiering

Cycle chips are ranked by **measured open interest**, not inferred from the weekday. Each cycle's share of the busiest visible cycle:

$$
\text{Share} = \frac{\text{OI}_{\text{exp}}}{\text{OI}_{\max}}
$$

| Tier | Threshold | Rendering |
|---|---|---|
| **Deep** | $\text{Share} \ge 25\%$ | Solid accent bar, bold weight |
| **Active** | $5\% \le \text{Share} < 25\%$ | Translucent accent bar |
| **Thin** | $\text{Share} < 5\%$ | Grey bar, dimmed |

The spread this captures is roughly three orders of magnitude: on live SPX data monthlies clear 3.5–5.4M contracts of open interest while a mid-week daily can sit under 2K. Date proximity alone is a poor proxy — a 2-DTE daily can be far thinner than a 27-DTE monthly.

## Key Takeaways

- Expected Move prefers the ATM straddle (with its 0.85 adjustment) and only falls back to Black-Scholes when quotes are missing.
- Max Pain is deliberately suppressed rather than guessed when OI is absent.
- Volume PCR reads flow; OI PCR reads structure. They frequently disagree, and that disagreement is informative.
- The expiration strip is filtered by cycle type but *ranked* by measured open interest.

## Related Reading

- [Options Viewer Methodology](/wiki/option-strategy/options-viewer-methodology) — index of all viewer specs
- [Option Liquidity Scoring](/wiki/option-strategy/option-liquidity-scoring) — per-contract execution quality
- [Volume & Open Interest Analysis](/wiki/option-strategy/volume-open-interest-analysis) — the underlying concepts
