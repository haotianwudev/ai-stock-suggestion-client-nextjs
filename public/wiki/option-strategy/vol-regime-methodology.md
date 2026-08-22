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

## Reading the Panel: Scope and Measurement Basis

Two distinctions govern every number on the VRP Research tab, and conflating either is the easiest way to misread it. Both are labelled in the UI.

### Scope — what window is this number over?

| Scope | What it covers | Where it appears |
|---|---|---|
| **Point-in-time** | A single date's reading | The four stat tiles at the top ("As of &lt;date&gt;") |
| **Selected window** | Whatever the timeframe picker is set to | The chart, its stats bar, the VIX distribution table, the backtest |
| **Full history since 2000** | The entire ~6,575-session sample | The "How each regime has paid" table at the bottom |

The bottom regime table is **deliberately independent of the timeframe picker**. Switching the chart to 3M does not re-scope it, so the historical baseline you're comparing today's regime against stays fixed rather than shifting under you. The chart card carries an explicit badge showing the active window's scope, date range, and session count.

### Measurement basis — trailing, or forward?

This is the subtler one, and it's the difference between a number you could have acted on and a number that only exists in hindsight.

| Basis | Definition | Knowable when? |
|---|---|---|
| **Point-in-time** (trailing) | VIX vs. the **previous** 20 sessions' realized vol | On the day itself — tradeable |
| **Backtest** (forward) | VIX vs. the **following** 21 sessions' realized vol | Only after those sessions elapse — hindsight |

Everything in the Levels chart, the stat tiles, and the regime classification is point-in-time: computed from data available on that date, no lookahead. The Backtest view and the "actually earned" line in the VIX distribution are forward-looking by construction — they answer *what did that premium turn out to be worth*, which is a legitimate research question but is **not** something you could have known at entry.

The VIX distribution view deliberately shows both side by side, because the gap between them is the finding (see below). Its table labels each column with its basis for exactly this reason. The most recent ~21 sessions have no forward measurement yet and are excluded from anything forward-looking.

## VIX Distribution vs. VRP

The chart's third mode buckets the window's sessions by VIX level and shows, for each bucket, how often that level occurred alongside two different premium measures. It answers the question traders reach for most naturally — *does selling volatility pay better when VIX is high?* — which is distinct from the `vrp_z` test above (that one asks whether the premium being rich **relative to its own history** predicts anything; this asks about the **absolute level**).

The two measures are deliberately different:

- **Quoted VRP** — VIX minus the *trailing* 20-session realized vol. What the premium looked like at the time.
- **Actually earned** — VIX minus the *forward* 21-session realized vol. What a seller of that session's implied vol actually collected.

Full-sample results (2000–2026, 6,575 sessions):

| VIX | Sessions | Avg realized | Quoted VRP | Actually earned | Gap |
|---|---|---|---|---|---|
| <12 | 558 | 7.5 | +3.52 | +2.29 | **−1.23** |
| 12–15 | 1,540 | 10.3 | +3.12 | +2.33 | −0.79 |
| 15–20 | 2,013 | 13.1 | +4.16 | +3.70 | −0.46 |
| 20–25 | 1,217 | 18.2 | +4.07 | +4.18 | +0.11 |
| 25–30 | 625 | 23.1 | +4.02 | +4.92 | +0.90 |
| 30–40 | 429 | 29.8 | +3.72 | +5.37 | +1.65 |
| 40+ | 193 | 54.8 | **−3.97** | **+4.40** | **+8.37** |

Two things stand out, and both invert the naive reading.

**Quoted VRP is almost flat across VIX levels** (+3.1 to +4.2) right up until VIX 40+, where it turns sharply *negative*. On the quoted number alone, crisis-level VIX looks like the worst possible time to sell premium.

**But what a seller actually earned rises steadily with VIX** — +2.29 in the calmest bucket to +5.37 at VIX 30–40 — and at VIX 40+, despite quoted VRP reading −3.97, sellers actually collected **+4.40**.

The mechanism is mean reversion in the measurement window. Quoted VRP compares implied against *trailing* realized, which at VIX 40+ is already enormously elevated (54.8), so the spread looks negative. Forward realized over the following 21 sessions mean-reverts substantially lower, so the seller collects far more than the quote implied. Low-VIX buckets run the other way: trailing realized is unusually calm, quoted VRP flatters, and forward realized drifts up.

This does **not** contradict the near-zero `vrp_z` timing result above — they measure different things. `vrp_z` normalizes VRP against its own recent history and has no forward power; absolute VIX level does carry information about forward-earned premium. Nor does it make high-VIX selling "safe": the 40+ bucket has the *lowest* share of positive-quoted-VRP sessions (44%) and is exactly where the backtest's worst trades cluster (see the next section) — the same COVID and Lehman entries that lost 30–55 points. The honest summary is that high VIX offered a **larger average premium with far heavier tails**, which is a sizing argument, not a green light.

## Backtest View

The VRP Research tab's chart has two modes. **Levels** plots implied vs. realized over the selected window. **Backtest** runs the canonical VRP harvest and plots its result: sell this session's implied vol, hold ~21 sessions to expiry, collect implied minus subsequently-realized, repeat.

Two implementation points matter for reading it honestly:

- **Non-overlapping windows.** `fwd_earned_premium` is defined per session over the *following* 21 sessions, so consecutive rows overlap almost entirely. Summing it daily would count each session's move roughly 21 times over and produce a wildly inflated curve. The backtest steps 21 sessions at a time instead, so each trade's holding period is disjoint from the next.
- **Units are volatility points, not dollars.** This is premium captured per unit of vol exposure. Converting to P&L would require assuming a position size, a strike, and a delta-hedging policy — none of which this platform models, so it deliberately stops short of implying one.

The last ~21 sessions have no `fwd_earned_premium` yet (the future hasn't happened) and are simply not traded.

Over the full 2000–2026 sample this produces **311 trades, +1,114 total vol points, +3.58 average per trade, an 85% win rate, and a −86 point maximum drawdown**. Those first two match the unconditional figures in the section above (~+3.5 at ~82%), which is the consistency check you'd want — the backtest is just a different lens on the same premium, not a new claim.

The shape is the classic short-vol profile: a long, steady climb punctuated by rare severe losses. The three worst trades are exactly where you'd expect if the calculation is sound — **2020-02-12 (−54.6)** entering the COVID crash, **2008-09-08 (−36.1)** entering Lehman week, and **2008-10-07 (−29.4)** deeper into the GFC. A single trade losing 54.6 points against a 3.58-point average is the whole risk argument for VRP harvesting in one number, and it's why the [Volmageddon](https://en.wikipedia.org/wiki/2018_VIX_termination_event)-style caution applies to any levered version of this strategy.

**Timeframes.** The chart supports 3M / 6M / 1Y / 2Y / 5Y / All, defaulting to 1Y. Two mechanical notes: the API window is expressed in *calendar* days while the chart is sized in *trading sessions*, so each timeframe over-requests using a measured ~1.55 calendar-days-per-session ratio (the textbook 365/252 = 1.448 is too optimistic once holidays are counted, and under-requesting silently truncates the window instead of erroring). And windows longer than ~900 sessions are decimated for chart performance by keeping each interval's largest-|VRP| session rather than plain striding — striding would drop exactly the crash days that matter most in this series. Summary statistics are always computed on the full window, never the decimated one.

## Limitations

- **Forward-earned premium is a proxy**, not realised option P&L.
- **Term structure is unavailable before 2007-12**, so pre-2008 rows classify stress on `vix_rank` alone.
- **Regime thresholds are chosen, not fitted** — `vrp_z > 0` and `vix_rank > 0.8`. They are interpretable and stable, but not optimised, and results near a boundary should not be over-read.
- **Historical averages are not forecasts.** A 26-year sample contains a handful of genuinely distinct volatility eras.
- **The backtest has no costs, slippage, or capacity assumptions**, and no delta-hedging. It measures the premium that was *available*, not what a specific implementation would have netted after execution — a real strategy selling actual options would keep meaningfully less.
- **The backtest's entry schedule is arbitrary.** Stepping every 21st session from the window's start means a different start date produces a different (though similarly-shaped) set of trades. It is not optimised, and shouldn't be read as one.

## Key Takeaways

- VRP signals are precomputed daily in Postgres because percentile and z-score features cannot be derived from a live quote.
- Roughly two thirds of the headline vol-point premium is convexity, not edge — check variance points.
- VRP is compensation for **downside** risk; stress-regime variance is 58–64% downside-driven.
- VRP *level* has almost no power to time entries (IC ≈ 0.008), despite the premium itself being real and persistent.
- The regime label is a **risk** signal: Stressed Premium carries a 26.7% chance of becoming Crisis within a month versus 5.7% from Harvest.
- The Backtest view harvests on non-overlapping ~monthly windows because `fwd_earned_premium` overlaps day-to-day — summing it daily would inflate the curve ~21×.
- Three scopes coexist on the panel — point-in-time (stat tiles), selected window (chart/distribution/backtest), and full history since 2000 (regime table, fixed regardless of the timeframe picker). Each is labelled in the UI.
- Point-in-time metrics were knowable on their own date and are tradeable; forward/backtest metrics require hindsight and are research-only. The Levels chart is entirely the former; the Backtest view and "actually earned" are the latter.
- Quoted VRP measures against *trailing* realized vol, earned premium against *forward* realized. At VIX 40+ the two disagree by 8+ vol points and even flip sign — quoted reads −3.97 while sellers actually collected +4.40, because trailing realized is elevated and forward realized mean-reverts.
- Absolute VIX level *does* carry forward information (earned premium rises from +2.29 to +5.37 across the VIX range) even though `vrp_z` does not — different signals, not a contradiction. High VIX means a bigger average premium with much heavier tails.
- Full-sample backtest: 311 trades, +3.58 avg, 85% win rate, −86 pt max drawdown, with the worst trades landing on COVID and Lehman — steady climb, rare severe losses.

## Related Reading

- [Variance Risk Premium](/wiki/option-strategy/variance-risk-premium) — the underlying concept and trading case
- [GEX Calculation Methodology](/wiki/option-strategy/gex-methodology) — the companion gamma-exposure spec
- [VIX](/wiki/option-strategy/vix)
