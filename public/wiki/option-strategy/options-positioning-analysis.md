---
path: option-strategy/options-positioning-analysis
title: Options Positioning Analysis
articleSlug: ""
date: 2026-08-21
labels: ["Quantitative Finance", "Options Trading"]
related: ["option-strategy/options-viewer-methodology", "option-strategy/volume-open-interest-analysis", "option-strategy/gex-methodology"]
---

## Overview

Implementation spec for the **OI / Volume** tab of SOPHIE's Options Viewer (`PositioningChartView`) — the two curves that show where option sellers are structurally positioned, as opposed to what they are doing to hedge it (that's [GEX](/wiki/option-strategy/gex-methodology)). [Volume & Open Interest Analysis](/wiki/option-strategy/volume-open-interest-analysis) covers the underlying concepts.

## Max Pain Cumulative Payout Curve

Where the [HUD's single Max Pain figure](/wiki/option-strategy/options-hud-metrics) is one number, this curve is the full function it comes from — total dollar liability of option sellers, plotted across every candidate settlement price:

$$
\text{Payout}(K_{\text{settle}}) = \frac{\displaystyle\sum_c \max(0, K_{\text{settle}} - K_c) \cdot \text{OI}_c \cdot 100 \;+\; \sum_p \max(0, K_p - K_{\text{settle}}) \cdot \text{OI}_p \cdot 100}{1{,}000{,}000} \quad (\$\text{M})
$$

Max Pain itself is the strike at the bottom of this curve. Plotting the whole curve rather than just the minimum shows how sharply it bottoms out — a shallow, wide minimum means many nearby strikes carry similar seller liability and the pin is weak; a sharp V means one strike is genuinely favoured.

**How it's used:** the curve shape is what separates a real Max Pain signal from noise. Traders who take the concept seriously look for a sharp, well-defined minimum near a round strike with high OI concentration — a shallow bowl is treated as no signal at all, since many strikes are then roughly equally "convenient" for sellers and there's no reason to expect one over another. This is the same reasoning [the HUD metrics page](/wiki/option-strategy/options-hud-metrics) uses to caution against over-weighting the single-number version of Max Pain.

## Cumulative Open Interest Curve

The running sum of call and put open interest across the strike spectrum:

$$
\text{CumCallOI}(K) = \sum_{k \le K} \text{OI}_{\text{call}}(k), \qquad \text{CumPutOI}(K) = \sum_{k \le K} \text{OI}_{\text{put}}(k)
$$

This reframes the raw per-strike OI bars (which spike at a handful of strikes and are hard to compare visually) as a monotonic curve. Where the two curves are steepest is where OI is densest; the strike where they cross is roughly where cumulative put and call positioning balance.

**How it's used:** raw per-strike open interest is the single most common ingredient in informal "support and resistance" heuristics among options-focused traders — the intuition being that a strike with heavy resting call OI is a level dealers have an interest in keeping price below (and heavy put OI, above). This is the same underlying data GEX walls formalise properly by weighting for *gamma*, not just raw contract count (see [GEX Calculation Methodology](/wiki/option-strategy/gex-methodology) for why that distinction matters — a deep ITM strike can carry enormous legacy OI while contributing almost no actual hedging pressure). Cumulative OI curves specifically are used to spot where positioning is genuinely concentrated versus spread thin across the chain, which is a useful sanity check before reading anything into a single strike's bar.

## Limitations

- **Open interest is a resting position, not a forecast.** Both curves describe where sellers are exposed today, not where price is going.
- **Max Pain is a seller-payout minimum, not a magnet by mechanism.** Any pinning effect it produces is a side effect of dealer hedging (see [GEX](/wiki/option-strategy/gex-methodology)), not a force of its own — the curve itself says nothing about *why* price might gravitate there.
- **Same OI staleness as everywhere else in the viewer:** published once daily, not intraday.

## Key Takeaways

- The Max Pain curve is the full payout function; the HUD's Max Pain figure is just its minimum.
- Curve shape (sharp vs. shallow minimum) matters more than the single strike — a shallow minimum is a weak signal.
- Cumulative OI turns spiky per-strike bars into a readable monotonic curve.

## Related Reading

- [Options Viewer Methodology](/wiki/option-strategy/options-viewer-methodology) — index of all viewer specs
- [Options HUD Metrics](/wiki/option-strategy/options-hud-metrics) — the single-figure Max Pain and PCR
- [Volume & Open Interest Analysis](/wiki/option-strategy/volume-open-interest-analysis)
- [GEX Calculation Methodology](/wiki/option-strategy/gex-methodology) — the hedging-flow explanation for why positioning can move price
