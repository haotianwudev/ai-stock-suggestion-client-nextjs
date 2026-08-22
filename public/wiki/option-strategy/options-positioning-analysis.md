---
path: option-strategy/options-positioning-analysis
title: Options Positioning Analysis
articleSlug: ""
date: 2026-08-21
labels: ["Quantitative Finance", "Options Trading"]
related: ["option-strategy/options-viewer-methodology", "option-strategy/volume-open-interest-analysis", "option-strategy/gex-methodology"]
---

## Overview

Implementation spec for the **OI / Volume** tab of SOPHIE's Options Viewer (`PositioningChartView`) — Open Interest, Volume, the Max Pain payout curve, Cumulative OI, and the Call/Put Walls that show where option sellers are structurally positioned, as opposed to what they are doing to hedge it (that's [GEX](/wiki/option-strategy/gex-methodology)). [Volume & Open Interest Analysis](/wiki/option-strategy/volume-open-interest-analysis) covers the underlying concepts.

## Data Quality: SPX/SPXW Duplicate Listings

The [Volatility tab has the same underlying issue](/wiki/option-strategy/volatility-surface-analytics): a standard SPX monthly (3rd Friday) is frequently shared with a same-day **SPXW** contract — a genuinely different, separately-traded PM-settled product with its own open interest pool, listed under the identical strike and calendar date. But the *correct fix here is the opposite one*, which is worth being explicit about.

For an IV curve, two different IVs at one strike have to be resolved down to a single value — you pick one (the Volatility tab prefers the standard SPX root). Open interest and volume are different: they're **additive**. Total dealer hedging pressure and resting size at a strike comes from *both* instruments together, the same reasoning GEX already uses when it sums both instruments' gamma at a strike. So here, duplicates are **summed**, not deduped to one.

This was a real, severe bug before the fix — not just noise. The raw feed consistently lists the high-OI standard SPX contract *before* its low-OI SPXW twin at every major round-number strike, and the code was keeping whichever came *last* rather than summing them. That silently discarded the dominant SPX open interest and kept only the SPXW leftover, systematically, at exactly the strikes that matter most:

| Strike | `SPX` OI | `SPXW` OI | What the chart showed |
|---|---|---|---|
| 7000 | 320,669 | 219 | 219 |
| 8000 | 269,264 | 3,146 | 3,146 |
| 6000 | 156,541 | 341 | 341 |

On one live monthly, the Total OI KPI card (which summed correctly) read **2,269,213** call contracts while the Cumulative OI curve topped out at **106,857** — 95% of open interest silently missing from the curve, and the two numbers on the same screen simply didn't agree. The Call Wall was misidentified for the same reason. Both are fixed by accumulating into the per-strike map instead of overwriting it; after the fix the KPI card and the curve's final value match exactly, and the Call Wall correctly lands on the true summed peak (320,888 contracts at $7,000 on that same chain, not the 219 the bug would have reported).

## Open Interest & Volume by Strike

The two most basic views on this tab, and easy to conflate — they answer different questions.

**Open Interest** is a snapshot of *resting positions*: how many contracts are currently open at each strike, updated once per session (not intraday). It's the accumulated result of everyone who has opened a position and not yet closed it, going back to whenever that expiration first listed.

**Volume** is *today's activity*: how many contracts changed hands today at each strike, resetting to zero every session. A strike can carry enormous OI while trading zero volume today (a position everyone's just holding), or the reverse — heavy volume with low resulting OI (positions opened and closed same-day, common in 0DTE).

**How it's used:** the two together tell you whether resting positioning is *live* or *stale*. High OI with meaningful same-day volume at a strike means that level is actively being traded around — worth taking seriously as a reference point. High OI with zero volume means it's legacy positioning nobody is currently defending or adding to; treat any "wall" effect from it more skeptically than one backed by active flow. This is the same distinction the [Volatility tab's quality flag](/wiki/option-strategy/volatility-surface-analytics) makes for IV — a number resting on zero volume is a number nobody has recently validated by actually trading there.

## Call Wall & Put Wall

The strike carrying the largest **open interest** on its side — the call wall above spot (Card 1), the put wall below (Card 2). Unlike [GEX's walls](/wiki/option-strategy/gex-methodology), these are raw contract counts, not gamma-weighted exposure — a genuinely different, simpler measure that answers "where is size resting" rather than "where is dealer hedging pressure concentrated."

**How it's used:** a call wall is read as overhead resistance and a put wall as downside support, on the theory that large resting option positions correlate with dealer hedging flows that lean against price crossing them (see [GEX](/wiki/option-strategy/gex-methodology) for the actual mechanism — OI wall and gamma wall often coincide but can diverge, since OI ignores each contract's actual delta/gamma). In practice: use the OI wall as a *quick, cheap* first read of where size sits, and cross-check against the GEX tab's gamma-weighted walls before leaning on it for a trade — a strike with huge OI but deep ITM/OTM (contributing little real gamma) can show up as an OI wall while being nearly irrelevant on the GEX chart, and that divergence itself is informative about whether the positioning is likely to actually influence price.

## Max Pain Cumulative Payout Curve

Where the [HUD's single Max Pain figure](/wiki/option-strategy/options-hud-metrics) is one number, this curve is the full function it comes from — total dollar liability of option sellers, plotted across every candidate settlement price:

$$
\text{Payout}(K_{\text{settle}}) = \frac{\displaystyle\sum_c \max(0, K_{\text{settle}} - K_c) \cdot \text{OI}_c \cdot 100 \;+\; \sum_p \max(0, K_p - K_{\text{settle}}) \cdot \text{OI}_p \cdot 100}{1{,}000{,}000} \quad (\$\text{M})
$$

Max Pain itself is the strike at the bottom of this curve. Plotting the whole curve rather than just the minimum shows how sharply it bottoms out — a shallow, wide minimum means many nearby strikes carry similar seller liability and the pin is weak; a sharp V means one strike is genuinely favoured.

**How it's used:** the curve shape is what separates a real Max Pain signal from noise. Traders who take the concept seriously look for a sharp, well-defined minimum near a round strike with high OI concentration — a shallow bowl is treated as no signal at all, since many strikes are then roughly equally "convenient" for sellers and there's no reason to expect one over another. This is the same reasoning [the HUD metrics page](/wiki/option-strategy/options-hud-metrics) uses to caution against over-weighting the single-number version of Max Pain.

**How to actually trade it:** Max Pain is a *last-day* phenomenon, not a signal to act on days in advance — whatever pinning tendency it has is a function of dealer hedging as expiration nears and unwinds, so it's most relevant on the settlement day itself, weakest early in a cycle's life. Traders who use it lean on it for very short-dated, expiration-day setups (e.g. fading a move away from a sharp Max Pain minimum with tight stops) rather than as a multi-day directional thesis. It's also one input, never the only one — cross-check against the Call/Put Walls and the GEX tab before treating a Max Pain minimum as a real level; if all three agree on the same strike, that's a materially stronger read than Max Pain alone. And it applies to one settlement mechanism's option sellers — see the SPX/SPXW note above for why this curve sums both instruments' OI rather than isolating the standard monthly's alone, a modeling choice worth knowing about if you're trading the AM-settled SPX specifically rather than SPX-family exposure broadly.

## Cumulative Open Interest Curve

The running sum of call and put open interest across the strike spectrum:

$$
\text{CumCallOI}(K) = \sum_{k \le K} \text{OI}_{\text{call}}(k), \qquad \text{CumPutOI}(K) = \sum_{k \le K} \text{OI}_{\text{put}}(k)
$$

This reframes the raw per-strike OI bars (which spike at a handful of strikes and are hard to compare visually) as a monotonic curve. Where the two curves are steepest is where OI is densest; the strike where they cross is roughly where cumulative put and call positioning balance.

**How it's used:** raw per-strike open interest is the single most common ingredient in informal "support and resistance" heuristics among options-focused traders — the intuition being that a strike with heavy resting call OI is a level dealers have an interest in keeping price below (and heavy put OI, above). This is the same underlying data GEX walls formalise properly by weighting for *gamma*, not just raw contract count (see [GEX Calculation Methodology](/wiki/option-strategy/gex-methodology) for why that distinction matters — a deep ITM strike can carry enormous legacy OI while contributing almost no actual hedging pressure). Cumulative OI curves specifically are used to spot where positioning is genuinely concentrated versus spread thin across the chain, which is a useful sanity check before reading anything into a single strike's bar.

**How to actually trade it:** use the *steepness* of the curve, not just its endpoint, to decide how much to trust a level. A curve that jumps sharply at one strike and is flat everywhere else means positioning is genuinely concentrated there — a stronger candidate for a real support/resistance read than a curve that climbs gradually across many strikes, where no single level stands out. Where the call and put curves cross is a rough read on which side (calls or puts) currently dominates positioning overall — useful context for gauging whether the market is more defensively hedged to the upside or the downside right now, though it says nothing about which side is "right." As with the walls above, treat this as a starting point to cross-check against GEX, not a standalone signal to size a trade on.

## Limitations

- **Open interest is a resting position, not a forecast.** Both curves describe where sellers are exposed today, not where price is going.
- **Max Pain is a seller-payout minimum, not a magnet by mechanism.** Any pinning effect it produces is a side effect of dealer hedging (see [GEX](/wiki/option-strategy/gex-methodology)), not a force of its own — the curve itself says nothing about *why* price might gravitate there.
- **Same OI staleness as everywhere else in the viewer:** published once daily, not intraday.
- **OI walls ignore actionability.** A strike can carry huge resting OI with a wide, untraded quote behind it — real size, but not necessarily size anyone could transact against quickly. The Liquidity sub-view (see [Option Liquidity Scoring](/wiki/option-strategy/option-liquidity-scoring)) is the cross-check for whether a wall's OI is backed by a tradeable market.
- **Max Pain sums SPX and SPXW open interest into one payout curve**, even though they settle via different mechanisms at different times on the same date. Defensible as an aggregate "SPX-family option sellers" reading, but not a claim about one specific settlement event.

## Key Takeaways

- The Max Pain curve is the full payout function; the HUD's Max Pain figure is just its minimum.
- Curve shape (sharp vs. shallow minimum) matters more than the single strike — a shallow minimum is a weak signal.
- Cumulative OI turns spiky per-strike bars into a readable monotonic curve.
- Open Interest is resting positioning (updates once daily); Volume is today's activity (resets every session) — a wall backed by both is a stronger read than OI alone.
- Standard SPX monthlies share their date with a same-day SPXW contract; unlike the IV surface (which picks one), OI and volume are additive and must be summed across both to get the true total — the previous unsummed version silently discarded up to 95% of open interest at exactly the highest-OI strikes.
- Treat OI/Volume walls as a quick first read, and cross-check against GEX's gamma-weighted walls before sizing a trade on them — the two often agree, but when they diverge that divergence is itself informative.

## Related Reading

- [Options Viewer Methodology](/wiki/option-strategy/options-viewer-methodology) — index of all viewer specs
- [Options HUD Metrics](/wiki/option-strategy/options-hud-metrics) — the single-figure Max Pain and PCR
- [Volume & Open Interest Analysis](/wiki/option-strategy/volume-open-interest-analysis)
- [GEX Calculation Methodology](/wiki/option-strategy/gex-methodology) — the hedging-flow explanation for why positioning can move price
- [Option Liquidity Scoring](/wiki/option-strategy/option-liquidity-scoring) — the composite score behind this tab's Liquidity sub-view
- [Volatility Surface Analytics](/wiki/option-strategy/volatility-surface-analytics) — the same SPX/SPXW duplication issue, handled the opposite way (dedup, not sum) because IV isn't additive
