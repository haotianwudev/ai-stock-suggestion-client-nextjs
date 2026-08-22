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

## IV Smile & Skew Curve

Plots strike $K$ against implied volatility $\sigma(K)$ for the selected cycle, restricted to within **±22% of spot**. The band is deliberate: far-tail strikes quote wide and thin, and their implied vols are numerically unstable enough to visually dominate a curve they tell you nothing reliable about.

## Term Structure & Forward Implied Volatility

Plots ATM implied volatility across all expirations, ordered by DTE.

- **Contango (normal):** $\sigma_{\text{far}} > \sigma_{\text{near}}$ — upward sloping, calm market.
- **Backwardation (inverted):** $\sigma_{\text{near}} > \sigma_{\text{far}}$ — downward sloping, near-term event risk or panic.

The **forward implied volatility** between two horizons $T_1 < T_2$ strips out the overlapping near-term vol to isolate what the market prices for the period *between* them:

$$
\sigma_{\text{fwd}}(T_1, T_2) = \sqrt{\frac{T_2 \sigma_2^2 - T_1 \sigma_1^2}{T_2 - T_1}}
$$

This follows from variance being additive in time while volatility is not — total variance to $T_2$ is the sum of variance to $T_1$ and forward variance across the gap. A steep front-month spike often leaves forward vol nearly flat, which tells you the event risk is genuinely localised rather than a repricing of the whole curve.

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

## Limitations

- **RND is only as good as the quotes.** The second derivative amplifies quote noise; a single stale mid mid-chain produces a visible artefact.
- **Delta-based wings are model-dependent.** The 25-delta strike is itself derived from a model, so risk reversal and butterfly inherit that model's assumptions.
- **The ±22% smile band hides genuine tail information** — deliberately, but it does mean the smile view is not the place to study far-tail pricing.

## Key Takeaways

- Forward vol isolates the period between two expirations, because variance (not volatility) adds in time.
- SPX strike grids are non-uniform, so the RND must use the general three-point second derivative — the uniform formula produces artefacts at every spacing change.
- Densities are floored at zero and normalised to 100%.
- Risk reversal measures directional skew; butterfly measures tail convexity.

## Related Reading

- [Options Viewer Methodology](/wiki/option-strategy/options-viewer-methodology) — index of all viewer specs
- [The Volatility Surface](/wiki/option-strategy/volatility-surface)
- [Volatility Smile & Skew](/wiki/option-strategy/volatility-smile-skew)
- [Tail Risk & Skew](/wiki/option-strategy/tail-risk-skew)
