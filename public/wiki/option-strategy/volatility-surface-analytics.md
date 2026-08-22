---
path: option-strategy/volatility-surface-analytics
title: Volatility Surface Analytics
articleSlug: ""
date: 2026-08-21
labels: ["Quantitative Finance", "Options Trading"]
related: ["option-strategy/options-viewer-methodology", "option-strategy/volatility-surface", "option-strategy/volatility-smile-skew", "option-strategy/tail-risk-skew"]
---

## Overview

Implementation spec for the **Volatility** tab of SOPHIE's Options Viewer (`VolatilityChartView`) — the smile, term structure, risk-neutral density, and skew/kurtosis measures. [The Volatility Surface](/wiki/option-strategy/volatility-surface) and [Volatility Smile & Skew](/wiki/option-strategy/volatility-smile-skew) cover the concepts; this page documents the computation.

## Data Quality: SPX/SPXW Duplicate Listings

A finding that applies to every chart on this tab, so it's documented once here rather than repeated per section.

A standard SPX monthly expiration (3rd Friday) is frequently shared with a same-day **SPXW** contract — a genuinely different, separately-traded PM-settled product, with its own open interest pool, listed under the identical calendar date. On live data this duplicated **26–46% of strikes on every single monthly** checked. Two real examples at strike 7275 on the same nominal expiration:

| Symbol | Bid | Ask | Open Interest | Last Trade |
|---|---|---|---|---|
| `SPX260918C07275000` | 435.70 | 438.20 | 855 | 2026-08-18 15:57 |
| `SPXW260918C07275000` | 434.50 | 440.40 | 302 | 2026-08-03 10:02 |

Two different instruments, two different OI pools, two different last-trade times — merged into one "expiration" bucket by whatever code groups contracts by calendar date alone. For any per-strike single-value view (smile, RND, skew, the term structure's ATM pick), interleaving both as if they were one instrument corrupts the shape entirely: iterating the strike-sorted array hits each strike twice with different quotes, and — critically for the [Breeden-Litzenberger density](#breeden-litzenberger-risk-neutral-density) below, which differentiates a *sequence* of adjacent strikes — scrambles the neighbor relationships the second derivative depends on. On one affected monthly this alone was enough to make a straightforward thin-quote check (see below) flag **98% of the density curve**, not because the market was that illiquid, but because half the "neighbors" in the sequence were the wrong instrument's quote.

The fix, scoped to this tab only: collapse duplicate strikes to a single contract per calendar date, preferring the standard AM-settled `SPX` root over `SPXW` when both are present (falling back to whichever has higher open interest if the root can't be parsed). **Deliberately not applied to GEX** — summing both instruments' gamma at a strike is the *correct* whole-book dealer-hedging reading there, not an error. Whether the platform should instead treat same-day SPX/SPXW as two genuinely separate, independently selectable expiration entries everywhere (the chain matrix, the payoff builder, the expiration selector itself) is a broader question this fix does not attempt to answer.

## Per-Point Data Quality Flags

Excluding fully-expired cycles (below) catches the extreme case. The same underlying mechanism — a wide or untraded quote making price-to-IV inversion unreliable — shows up in milder form on individual strikes within otherwise-healthy, live cycles: a strike nobody has traded today, sitting on a wide resting quote. Rather than exclude those (they're still real, tradeable strikes), the term structure, RND, and skew charts mark them:

```
thin quote  =  spread% > 20%   OR   (volume == 0  AND  open interest < 10)
```

A flagged point renders as an amber ring instead of a solid dot, and its tooltip adds an explicit caution note. Nothing is hidden — the point (and the line connecting it) still renders normally — the flag just tells you not to over-read that specific number.

Checked against a live chain after fixing the SPX/SPXW duplication above, the flag rate rises smoothly with distance from spot, which is the shape you'd want from a genuine liquidity signal rather than noise: 0% within ±5% of spot (the true ATM core), 25% by ±10%, 28% by ±15% (the tab's default display range), 43% by ±25%. Before the duplication fix, an affected monthly's RND showed 98% flagged — the duplication bug, not real thinness.

## IV Smile & Skew Curve

Plots strike $K$ against implied volatility $\sigma(K)$ for the selected cycle, restricted to within **±22% of spot**. The band is deliberate: far-tail strikes quote wide and thin, and their implied vols are numerically unstable enough to visually dominate a curve they tell you nothing reliable about.

## Term Structure & Forward Implied Volatility

Plots ATM implied volatility across all expirations, ordered by DTE.

- **Contango (normal):** $\sigma_{\text{far}} > \sigma_{\text{near}}$ — upward sloping, calm market.
- **Backwardation (inverted):** $\sigma_{\text{near}} > \sigma_{\text{far}}$ — downward sloping, near-term event risk or panic.

### Genuine near-term richness vs. dead-contract noise

Short-dated options do legitimately carry a **modest** term-structure hump — a few vol points, from weekend theta, event risk, or a thin liquidity premium. That's real and common. What's *not* common, and not the same thing, is what a stale front cycle can do to this chart.

A cycle's listed `daysToExpiration` is computed relative to the data feed's own last-refreshed timestamp, not real wall-clock time. When the feed is frozen — markets closed, a weekend, an evening — a contract that has **already expired** can still be labeled 0 DTE. Its quotes are then frozen at end-of-day levels with near-zero remaining time value, and inverting a price back to an implied volatility is numerically unstable as $T \to 0$: on one weekend snapshot this produced solved IVs of **78%, 193%, and 336%** on SPX strikes just $5 apart on the same already-dead cycle — a spread that has nothing to do with a real smile, and swamped the entire chart. The Term Structure Slope card read **Backwardation** purely from that dead front point; the true, live-cycle reading was **Contango**.

The fix is to exclude any cycle whose expiration date has already passed in the exchange's own timezone (America/New_York) from every chart on this tab — term structure, forward vol, multi-expiration smile overlay, and the 25-delta skew term structure — regardless of what the feed's own DTE field claims. A small amber notice appears above the affected charts whenever a cycle was excluded this way, so it's visible rather than silently correcting the picture.

The **forward implied volatility** between two horizons $T_1 < T_2$ strips out the overlapping near-term vol to isolate what the market prices for the period *between* them:

$$
\sigma_{\text{fwd}}(T_1, T_2) = \sqrt{\frac{T_2 \sigma_2^2 - T_1 \sigma_1^2}{T_2 - T_1}}
$$

This follows from variance being additive in time while volatility is not — total variance to $T_2$ is the sum of variance to $T_1$ and forward variance across the gap. A steep front-month spike often leaves forward vol nearly flat, which tells you the event risk is genuinely localised rather than a repricing of the whole curve.

**How it's used:** term structure shape is a direct trading signal in its own right for volatility desks — backwardation (near-term vol above far-term) is the textbook setup for calendar spreads (sell the rich front month, buy the cheaper back month) and is closely watched around known binary events (earnings, FOMC, CPI) where the front-month IV bump is expected to collapse once the event passes. In index vol specifically, VIX futures traders watch the VIX/VIX3M ratio the same way — a ratio above roughly 1 signals backwardation and is one of the standard triggers cited for de-risking short-vol ETN/ETF positions (see the [VRP methodology](/wiki/option-strategy/vol-regime-methodology) page for how this feeds into regime classification).

## Breeden-Litzenberger Risk-Neutral Density

Extracts the market's implied probability density $f(K)$ for the underlying at expiration, directly from call prices, via the Breeden & Litzenberger (1978) result:

$$
f(K) = e^{rT} \frac{\partial^2 C(K)}{\partial K^2}
$$

### Non-uniform strike grid

This is the subtle part. Real SPX chains alternate between 5-, 10-, and 25-point strike gaps, and the textbook uniform second-difference

$$
\frac{C_{i+1} - 2C_i + C_{i-1}}{h^2}
$$

is simply wrong when $\Delta K$ changes between the two sides — it silently assumes a single $h$ that does not exist. The error shows up exactly where the grid spacing changes, producing spurious density spikes.

The general **non-uniform three-point second derivative** is used instead:

$$
\frac{\partial^2 C}{\partial K^2} \approx \frac{2 \left[ \Delta K_1 \cdot C(K_{i+1}) - (\Delta K_1 + \Delta K_2) \cdot C(K_i) + \Delta K_2 \cdot C(K_{i-1}) \right]}{\Delta K_1 \cdot \Delta K_2 \cdot (\Delta K_1 + \Delta K_2)}
$$

where $\Delta K_1 = K_i - K_{i-1}$ and $\Delta K_2 = K_{i+1} - K_i$.

Post-processing: densities are floored at zero ($\max(0, \partial^2 C / \partial K^2)$, since a negative probability density is a numerical artefact rather than a signal) and normalised so $\sum f(K_i)\,\Delta K_i = 100\%$.

**How it's used:** the RND is how risk desks convert an entire options chain into "what does the market actually think the probability distribution of the underlying looks like" — genuinely richer than a single implied vol number, because it captures the market's *skew* and *kurtosis* views directly rather than assuming a lognormal shape. It's used to compare the option-implied (risk-neutral) distribution against a physical-measure forecast to find where the market's pricing of tail risk looks rich or cheap, and it underlies more sophisticated hedge construction than a flat-vol confidence interval can — see [Implied Price Ranges](/wiki/option-strategy/spx-payoff-builder-methodology#implied-price-ranges-confidence-intervals) for the simpler symmetric/skew-adjusted alternative most retail platforms use instead.

## 25-Delta Skew & Kurtosis

Two standard summary measures of surface shape, both quoted off the 25-delta wings:

**Risk reversal (skew)** — the price of downside protection relative to upside:

$$
\text{RR}_{25\Delta} = \text{IV}(\text{Put}_{25\Delta}) - \text{IV}(\text{Call}_{25\Delta})
$$

Positive means put skew, i.e. demand for downside protection exceeds upside calls. For index options this is nearly always positive; the informative signal is its *level* against its own history, not its sign.

**Butterfly (convexity / kurtosis)** — how much the wings are bid relative to the at-the-money base:

$$
\text{Fly}_{25\Delta} = \frac{\text{IV}(\text{Put}_{25\Delta}) + \text{IV}(\text{Call}_{25\Delta})}{2} - \text{IV}_{\text{ATM}}
$$

A rising butterfly means the market is paying up for tail outcomes on both sides — fat-tail probability being repriced independently of direction.

**How they're used:** risk reversal is a standard sentiment and positioning gauge — a sharp rise in put skew (independent of the VIX level itself) is read as crash-hedging demand building, and is watched by both directional traders (as a contrarian fear gauge) and vol desks pricing their own skew risk. Butterfly is the more specialised of the two: convexity/vol-of-vol traders express views on it directly via iron butterflies and condors, and a persistently elevated butterfly across a chain is one of the standard reasons a "sell premium everywhere" strategy underperforms a delta-neutral one that specifically targets skew.

## Limitations

- **RND is only as good as the quotes.** The second derivative amplifies quote noise; a single stale mid mid-chain produces a visible artefact.
- **Delta-based wings are model-dependent.** The 25-delta strike is itself derived from a model, so risk reversal and butterfly inherit that model's assumptions.
- **The ±22% smile band hides genuine tail information** — deliberately, but it does mean the smile view is not the place to study far-tail pricing.
- **Live-cycle filtering trusts the exchange calendar, not the feed's own DTE label.** If the feed's clock is wrong in the *other* direction — reporting a cycle as already expired when it's actually still live — that cycle would be dropped instead. This hasn't been observed, but the filter is only as reliable as `Intl.DateTimeFormat`'s America/New_York conversion and the browser's system clock.
- **SPX/SPXW dedup keeps one instrument per strike, not both.** Preferring the standard SPX root discards the SPXW quote entirely for that strike on this tab — correct for a single-instrument IV curve, but it means the SPXW-specific liquidity at that strike (its own OI, its own spread) is invisible here. It's still fully visible in the Options Chain matrix and GEX, which are unaffected by this fix.
- **The thin-quote threshold (20% spread, or zero volume with under 10 OI) is a judgment call**, not derived from a model. It was tuned by checking that the resulting flag rate rises smoothly with distance from spot on real data rather than being arbitrary, but a different threshold would flag a different set of points.

## Key Takeaways

- Forward vol isolates the period between two expirations, because variance (not volatility) adds in time.
- SPX strike grids are non-uniform, so the RND must use the general three-point second derivative — the uniform formula produces artefacts at every spacing change.
- Densities are floored at zero and normalised to 100%.
- Risk reversal measures directional skew; butterfly measures tail convexity.
- Cycles that have already expired in wall-clock time are excluded from every chart on this tab — a stale front cycle can flip the Term Structure Slope's regime call entirely, not just shift a number.
- Standard monthlies routinely list a same-day SPXW contract as a separate instrument under the same calendar date — deduping to one contract per strike is what makes the per-point quality flag (and the smile/RND/skew shape generally) meaningful rather than noise.
- Individual thin or wide-spread points are flagged with an amber ring rather than hidden — the flag rate should rise smoothly with distance from spot; a flat, high rate near the money is itself a sign something upstream (like the duplication above) needs checking.

## Related Reading

- [Options Viewer Methodology](/wiki/option-strategy/options-viewer-methodology) — index of all viewer specs
- [The Volatility Surface](/wiki/option-strategy/volatility-surface)
- [Volatility Smile & Skew](/wiki/option-strategy/volatility-smile-skew)
- [Tail Risk & Skew](/wiki/option-strategy/tail-risk-skew)
