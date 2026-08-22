---
path: option-strategy/vol-regime-methodology
title: Volatility Regime & VRP Methodology
articleSlug: ""
date: 2026-08-21
labels: ["Quantitative Finance", "Options Trading"]
related: ["option-strategy/options-viewer-methodology", "option-strategy/variance-risk-premium", "option-strategy/gex-methodology"]
---

## Overview

This page is the implementation spec for the **VRP Research** tab in SOPHIE's Options Viewer: the volatility regime label, the variance risk premium decomposition, and the regime transition matrix. [Variance Risk Premium](/wiki/option-strategy/variance-risk-premium) covers the concept and the trading case; this page documents how the platform actually computes it and what the numbers did and did not show.

Every signal here is **precomputed daily in the data pipeline**, not derived in the browser. That is a hard requirement rather than an optimisation: a 252-day VIX percentile and an EWM z-score are history-dependent and cannot be recovered from a single live quote.

## Data Sources

| Series | Source | Coverage |
|---|---|---|
| SPX daily OHLCV | Yahoo Finance (`^GSPC`) → Postgres | 2000-01-03 onward |
| VIX daily OHLCV | Yahoo Finance (`^VIX`) → Postgres | 2000-01-03 onward |
| VIX3M (3-month VIX) | FRED `VXVCLS` | 2007-12-04 onward |

Two notes on sourcing. Yahoo no longer serves `^VIX3M` history (it returns a single row, and the legacy `^VXV` symbol is dead), so term structure comes from FRED. And the 2000 start is a deliberate choice, not a data ceiling — VIX itself reaches back to 1990, but VIX3M only begins in 2007, so every row before that is already classified on one axis instead of two. Extending further would deepen that inconsistency rather than fix it.

## Core Signals

Computed once per trading day and stored:

$$
\text{RV}_{20} = \text{stdev}\!\left(\ln \frac{S_t}{S_{t-1}},\, 20\right) \times \sqrt{252} \times 100
$$

$$
\text{VRP} = \text{VIX} - \text{RV}_{20}
$$

Supporting context measures:

- **`vrp_z`** — EWM z-score of VRP (span 126, ~6 months). Is today's premium rich relative to its *own* recent history?
- **`vix_rank`** — 252-day percentile rank of VIX (0–1). Where does implied vol sit in its trailing year?
- **`term_slope`** — VIX3M − VIX. Negative means backwardation, i.e. near-term stress.

All are causal (backward-looking only), so a full recompute is deterministic and idempotent — past rows never change, unlike the Investment Clock where FRED revisions can restate history.

## Regime Taxonomy

Two axes, mirroring the Investment Clock's quadrant logic: **is premium rich**, and **is the tape stressed**.

|  | Calm (`vix_rank` ≤ 0.8 and not backwardated) | Stressed |
|---|---|---|
| **Premium rich** (`vrp_z` > 0) | **Harvest** | **Stressed Premium** |
| **Premium thin** (`vrp_z` ≤ 0) | **Thin** | **Crisis** |

- **Harvest** — implied running well above realized in a calm tape. Historically the most favourable backdrop for selling premium.
- **Stressed Premium** — sellers are paid more than usual, but vol is elevated or the curve is backwardated. The premium is real and so is the tail risk.
- **Thin** — implied barely exceeds realized. Gap risk for a thin credit.
- **Crisis** — implied *below* realized. The index is delivering more movement than options are pricing; short vol is uncompensated.

### Validation against known events

The classifier was checked against episodes where the answer is not in doubt:

| Event | Reading |
|---|---|
| COVID crash, Mar 2020 | **Crisis** — VRP collapsed to −33 as realized outran implied |
| GFC, Oct 2008 | **Crisis → Stressed Premium** as implied caught up to realized |
| Post-COVID, Jun 2020 | **Harvest** — rich premium after the spike |

Full-sample distribution: Harvest 44%, Thin 35.5%, Stressed Premium 11%, Crisis 9.5%. Average VRP by regime is monotonic in the expected direction — Crisis −3.80, Thin +1.20, Harvest +6.04, Stressed Premium +7.73.

## VRP Decomposition

### Vol points vs variance points

The headline VRP (VIX − RV, in "vol points") is the number usually quoted, but it **overstates the premium** through Jensen's inequality: $\mathbb{E}[\sigma] \neq \sqrt{\mathbb{E}[\sigma^2]}$. A variance swap pays on variance, so:

$$
\text{VRP}_{\text{variance}} = \frac{\text{VIX}^2 - \text{RV}_{20}^2}{100}
$$

| Regime | VRP (vol pts) | VRP (variance pts) |
|---|---|---|
| Stressed Premium | +7.73 | **+3.68** |
| Harvest | +6.04 | **+1.83** |
| Thin | +1.20 | +0.21 |
| Crisis | −3.80 | −4.45 |

Harvest's headline +6.04 shrinks to +1.83 once convexity is stripped out — roughly two thirds of the apparent edge.

### Downside vs upside variance

Realized variance is split into down-day and up-day contributions (Barndorff-Nielsen semivariance):

$$
\text{downside share} = \frac{\sum_{r_t < 0} r_t^2}{\sum_{r_t < 0} r_t^2 + \sum_{r_t > 0} r_t^2}
$$

Full-sample mean is 0.458, but it separates sharply by regime — Stressed Premium 0.644 and Crisis 0.579 versus Harvest 0.403 and Thin 0.440. Stress-regime variance is downside-driven, which is direct evidence that VRP is compensation for **downside** risk rather than symmetric risk.

## Does VRP Level Predict What You Earn?

The honest answer, and the most important result on the page: **largely no.**

Test: quintile every session by `vrp_z`, then measure what a seller of that day's implied vol actually collected over the following 21 sessions ($\text{VIX}_t - \text{RV}$ realized over $t{+}1 \ldots t{+}21$).

| `vrp_z` quintile | Forward 21d earned | Hit rate |
|---|---|---|
| Q1 (thin) | +3.11 | 82.8% |
| Q2 | +3.43 | 85.6% |
| Q3 | +3.54 | 83.2% |
| Q4 | +3.80 | 82.6% |
| Q5 (rich) | +4.09 | **81.0%** |

Spearman IC ≈ **0.008** across ~6,500 sessions. Essentially zero, and the hit rate slightly *declines* as premium gets richer.

Read precisely, that says the premium is **real and persistent unconditionally** (~+3.5 vol points at an ~82% hit rate) but its *level* does not time entries. It is also a direct caution against over-reading the earlier `vrp09` backtest, whose 2.3 profit factor on a `vrp_z > 0.5` filter came from two years and roughly 30 trades.

**Caveat:** forward earned premium is a first-order proxy. It ignores strike selection, delta hedging, and path, so it is not the same as option P&L. But a ~0.008 IC over 6,500 sessions is still a real warning.

## Where the Regime Label Does Earn Its Keep

Transition risk. P(regime 21 sessions ahead | regime today):

| From | → Crisis in 21d |
|---|---|
| Harvest | **5.7%** |
| Thin | 5.2% |
| Stressed Premium | **26.7%** |

Stressed Premium is roughly **5× more likely** to become Crisis than Harvest is. Harvest is also sticky (47.8% stays Harvest), while Thin mean-reverts upward (52.6% → Harvest).

The practical conclusion: use the regime for **position sizing and risk**, not for timing entries. The level of VRP tells you little about the next month's return; the regime label tells you a great deal about the chance of the tape turning against a short-vol position.

## Limitations

- **Forward-earned premium is a proxy**, not realised option P&L.
- **Term structure is unavailable before 2007-12**, so pre-2008 rows classify stress on `vix_rank` alone.
- **Regime thresholds are chosen, not fitted** — `vrp_z > 0` and `vix_rank > 0.8`. They are interpretable and stable, but not optimised, and results near a boundary should not be over-read.
- **Historical averages are not forecasts.** A 26-year sample contains a handful of genuinely distinct volatility eras.

## Key Takeaways

- VRP signals are precomputed daily in Postgres because percentile and z-score features cannot be derived from a live quote.
- Roughly two thirds of the headline vol-point premium is convexity, not edge — check variance points.
- VRP is compensation for **downside** risk; stress-regime variance is 58–64% downside-driven.
- VRP *level* has almost no power to time entries (IC ≈ 0.008), despite the premium itself being real and persistent.
- The regime label is a **risk** signal: Stressed Premium carries a 26.7% chance of becoming Crisis within a month versus 5.7% from Harvest.

## Related Reading

- [Variance Risk Premium](/wiki/option-strategy/variance-risk-premium) — the underlying concept and trading case
- [GEX Calculation Methodology](/wiki/option-strategy/gex-methodology) — the companion gamma-exposure spec
- [VIX](/wiki/option-strategy/vix)
