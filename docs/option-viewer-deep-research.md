# SOPHIE Options Viewer — Deep Research Guide for Real Trading

> **"One snapshot, twelve lenses — plus memory."** — The Options Viewer transforms a single point-in-time option-chain API pull into a comprehensive institutional-grade analytical dashboard: chain matrix, volatility surface, positioning analysis, gamma exposure, multi-leg payoff modelling, and risk-neutral probability. A daily ETL now also accumulates that snapshot into stored history, so the § 7A History tab can answer the one question no snapshot can: *how does today compare to normal?*

**Date**: August 23, 2026
**Platform**: SOPHIE Finance ([sophiedaddy.com](https://sophiedaddy.com))
**Route**: `/option/viewer`
**Underlying**: S&P 500 Index Options (^SPX) — European exercise, cash settlement, \$100 contract multiplier

---

## Table of Contents

1. [Architecture & Three Sub-Tools](#1-architecture--three-sub-tools)
2. [Top Banner & HUD Metrics](#2-top-banner--hud-metrics)
3. [Options Matrix & Proprietary Liquidity Scoring](#3-options-matrix--proprietary-liquidity-scoring)
4. [Volatility Analytics & Surface](#4-volatility-analytics--surface)
5. [Positioning Analysis (OI, Volume, Max Pain)](#5-positioning-analysis-oi-volume-max-pain)
6. [Gamma Exposure (GEX) & Market Maker Hedging](#6-gamma-exposure-gex--market-maker-hedging)
7. [SPX Payoff Builder & Probability Analysis](#7-spx-payoff-builder--probability-analysis)
7A. [History Tab — Escaping the Single Snapshot](#7a-history-tab--escaping-the-single-snapshot)
8. [Data Quality: SPX/SPXW Deduplication & Stale Cycle Handling](#8-data-quality-spxspxw-deduplication--stale-cycle-handling)
9. [Limitations](#9-limitations)
10. [Complete Source Bibliography](#10-complete-source-bibliography)

---

## 1. Architecture & Three Sub-Tools

The Options Viewer is a multi-tiered institutional analysis suite organised into three primary sub-tools:

```
Option Viewer (/option/viewer)
│
├── 1. Options Chain & Volatility (/option/viewer)
│   ├── MarketOverviewBar — Whole-book macro metrics (VIX, GEX, P/C ratios, Vol Regime)
│   ├── Expiration Carousel — Algorithmic key expiry filter & Liquidity Tiering
│   ├── CycleSummaryPanel — Selected-expiration metrics (ATM IV, Expected Move, Max Pain)
│   └── 5 Analytical Sub-Tabs:
│       ├── SPX Matrix — Double-sided chain, Greeks, liquidity score
│       ├── Volatility — IV Smile, Term Structure, Forward IV, RND, Skew
│       ├── OI / Volume — Positioning profiles, Max Pain payout, Cumulative OI
│       ├── Gamma / GEX — Net/Gross GEX, Gamma Flip, Walls, Vanna/Charm
│       └── History — Percentile ranks, SSR, OI flow, skew/price divergence
│                     (the only tab reading stored history rather than the live snapshot)
│
├── 2. SPX Payoff Builder (/option/viewer/builder)
│   ├── Multi-leg builder from real chain data with strategy presets
│   ├── Expiration payoff curve vs. T+0 mark-to-market curve
│   └── Risk-neutral Probability of Profit & skew-adjusted price ranges
│
└── 3. Volatility Regime & VRP Research (/option/viewer/vrp) — Gated to Tier 4+
    └── (Not covered in this guide — see vol-regime-methodology wiki)
```

### The Two-Scope System

The single most important thing when reading the viewer's top bar is **which scope a number belongs to**:

| Scope | Component | What It Covers |
|---|---|---|
| **Market-wide** | `MarketOverviewBar` (dark band) | Index level, vol regime, and the **whole dealer book** — every listed expiration summed |
| **Selected cycle** | `CycleSummaryPanel` (below date strip) | One expiration only — whichever chip is selected |

This split exists because computing metrics from a single expiration and presenting them in a top-level banner is misleading — a reader could conclude the whole SPX board has 2.3M contracts of OI when that's one monthly cycle's figure. Market-wide aggregates are computed across all `expirationDates` in full; per-cycle figures are computed on the selected slice.

---

## 2. Top Banner & HUD Metrics

### 2.1 At-the-Money Implied Volatility (ATM IV)

$$
\text{Strike}_{\text{ATM}} = \arg\min_K |K - S|, \qquad \text{ATM IV} = \text{IV}(\text{Strike}_{\text{ATM}})
$$

If both call and put IVs are quoted at the ATM strike, the mid-market average is reported.

**How to use**: ATM IV is the "price of volatility" right now. It's your starting reference for whether options are cheap or expensive on this specific expiry cycle.

### 2.2 Expected Move

How far the underlying is priced to travel by expiration. Two methods in preference order:

**Primary — ATM straddle implied range** (market-maker rule of thumb):

$$
\text{Expected Move}_{\$} = \left(C_{\text{ATM, Mid}} + P_{\text{ATM, Mid}}\right) \times 0.85
$$

$$
\text{Expected Move}_{\%} = \frac{\text{Expected Move}_{\$}}{S} \times 100
$$

The 0.85 factor is an empirical adjustment: a raw straddle price overstates the 1σ move because it prices the full expected absolute deviation, not the 1σ band. This is a widely used shortcut (popularised by tastytrade) for turning a live ATM straddle price into a 1σ range without running Black-Scholes.

**Fallback — Black-Scholes 1σ dispersion** (when straddle quotes are missing):

$$
\text{Expected Move}_{\$} = S \times \text{ATM IV} \times \sqrt{T}, \qquad T = \frac{\text{DTE}}{365}
$$

**How to use**: Expected Move is the standard reference for sizing a strangle or iron condor's short strikes — placed just outside the expected move to keep the probability of touching a short strike relatively low. It's also the go-to gauge for binary events: traders compare the pre-event implied expected move against the stock's typical historical move on similar events to judge whether options are priced rich or cheap.

### 2.3 Max Pain Strike

The settlement price at which option buyers collectively lose the most — equivalently, where sellers pay out the least:

$$
\text{Max Pain} = \arg\min_K \left[ \sum_{i} \max(0, K - K_{c,i}) \cdot \text{OI}_{c,i} + \sum_{j} \max(0, K_{p,j} - K) \cdot \text{OI}_{p,j} \right]
$$

**Suppression rule**: When OI is unavailable (some EOD snapshots omit OI fields), Max Pain is hidden rather than displayed — without OI every strike ties at zero payout and $\arg\min$ returns an arbitrary strike. A confidently-rendered meaningless number is worse than showing nothing.

**How to use, and why to be skeptical**: Max Pain is popularly cited as a "pin" traders expect price to gravitate toward into expiration. Any pinning tendency it has runs through dealer hedging (see GEX, § 6), not the payout curve itself. Academic studies find the effect weak and inconsistent once normal price drift is controlled for — treat it as one input among many rather than a reliable target. It's most relevant on the settlement day itself, weakest early in a cycle's life.

### 2.4 Put/Call Ratios

$$
\text{PCR}_{\text{Volume}} = \frac{\sum \text{Put Volume}}{\sum \text{Call Volume}}, \qquad \text{PCR}_{\text{OI}} = \frac{\sum \text{Put OI}}{\sum \text{Call OI}}
$$

The two answer different questions:

| Ratio | Reads | Time Horizon | Trading Use |
|---|---|---|---|
| **Volume PCR** | Today's directional flow | Intraday | > 1.0 = put-heavy (bearish tilt); < 1.0 = call-heavy |
| **OI PCR** | Accumulated structural positioning | Multi-day | Moves slowly; shows where conviction has built up |

PCR is a classic **contrarian sentiment indicator**, not a directional signal to trade with. Extreme readings are conventionally read as overextended sentiment. Desks track CBOE's own equity and index PCR series the same way they'd use VIX rank — as a regime gauge, not a single-day trade trigger.

### 2.5 Expiration Cycle Selection & Liquidity Tiering

SPX lists ~55 expirations. The **Key Expiries** filter keeps only liquid cycles:

1. **Near-term dailies** — all cycles with DTE ≤ 2 (0DTE and 1DTE)
2. **Friday weeklies** — next 4 non-monthly Friday expiries
3. **Standard monthlies** — next 4 (3rd Friday, days 15–21, deepest OI)
4. **LEAPS anchor** — the monthly nearest ~365 DTE

This reduces ~56 cycles to ~14. Each cycle is ranked by **measured open interest share** of the busiest visible cycle:

$$
\text{Share} = \frac{\text{OI}_{\text{exp}}}{\text{OI}_{\max}}
$$

| Tier | Threshold | Rendering |
|---|---|---|
| **Deep** | Share ≥ 25% | Solid accent bar, bold |
| **Active** | 5% ≤ Share < 25% | Translucent accent bar |
| **Thin** | Share < 5% | Grey bar, dimmed |

On live SPX data, monthlies clear 3.5–5.4M contracts while a mid-week daily can sit under 2K — date proximity alone is a poor proxy.

> **Not the same filter as the ETL's.** This one selects what the viewer *renders* from a live payload
> that already contains every cycle, so a poor pick is cosmetic and self-correcting. The ETL's
> selection (§ 7A) decides what gets *persisted*, where a poor pick is unrecoverable — which is why it
> dropped the LEAPS anchor above in favour of measured OI share, and why it carries cycles forward
> once stored. The two are intentionally independent.

---

## 3. Options Matrix & Proprietary Liquidity Scoring

### 3.1 Mid Price & Spread

$$
\text{Mid Price} = \frac{\text{Bid} + \text{Ask}}{2}, \qquad \text{Spread \%} = \frac{\text{Ask} - \text{Bid}}{\text{Mid Price}}
$$

### 3.2 Proprietary Liquidity Score Model (0–100)

Calibrated specifically to SPX microstructure, where ATM spreads trade < 0.3% and widen rapidly OTM.

**Critical Design Principle — Spread Gates the Score**: A contract with enormous OI but an unfillable quote (\$0.00 bid / \$5.00 ask) is **not** liquid. Spread acts as a **strict multiplicative gate** — if the spread score is zero, the composite is zero regardless of activity.

#### Component 1: Spread Score (Piecewise-Linear)

$$
\text{Score}_{\text{spread}} = \begin{cases}
100 & \text{Spread \%} \le 0.3\% \\
100 - 30 \times \frac{\text{Spread \%} - 0.003}{0.010 - 0.003} & 0.3\% < \text{Spread \%} \le 1.0\% \\
70 - 40 \times \frac{\text{Spread \%} - 0.010}{0.030 - 0.010} & 1.0\% < \text{Spread \%} \le 3.0\% \\
30 - 30 \times \frac{\text{Spread \%} - 0.030}{0.080 - 0.030} & 3.0\% < \text{Spread \%} \le 8.0\% \\
0 & \text{Spread \%} > 8.0\%
\end{cases}
$$

#### Component 2: Volume Score (Log-Scaled, Saturates at ~1,000)

$$
\text{Score}_{\text{vol}} = \min\left(100, \frac{\log_{10}(\text{Volume} + 1)}{\log_{10}(1001)} \times 100\right)
$$

#### Component 3: Open Interest Score (Log-Scaled, Saturates at ~5,000)

$$
\text{Score}_{\text{OI}} = \min\left(100, \frac{\log_{10}(\text{OI} + 1)}{\log_{10}(5001)} \times 100\right)
$$

The different denominators set saturation points: volume at ~1,000 traded, OI at ~5,000 resting.

#### Component 4: Activity Score

Volume weighted above OI, since today's trading is a better signal of a live market than stale resting size:

$$
\text{Score}_{\text{activity}} = 0.65 \times \text{Score}_{\text{vol}} + 0.35 \times \text{Score}_{\text{OI}}
$$

#### Composite Score

$$
\text{Score}_{\text{composite}} = \text{round}\left( \text{Score}_{\text{spread}} \times \left(0.55 + 0.45 \times \frac{\text{Score}_{\text{activity}}}{100}\right) \right)
$$

The `0.55 + 0.45(·)` envelope means a tight-spread contract with no activity still scores 55% of its spread score (genuinely tradeable, just quiet). A wide-spread contract cannot be rescued by activity.

| Tier | Score | Badge |
|---|---|---|
| **Excellent** | ≥ 75 | Emerald |
| **Good** | 50–74 | Blue |
| **Fair** | 25–49 | Amber |
| **Poor** | < 25 | Rose |

**How to use in real trading**:
- **Screening**: Filter the chain down to strikes worth quoting before looking at price
- **Sizing**: A thin contract fine for 1-lot should discourage size 50
- **Execution timing**: Spread and volume vary through the day — tightest near open/close, widest midday

---

## 4. Volatility Analytics & Surface

### 4.1 IV Smile & Skew Curve

Plots strike $K$ against implied volatility $\sigma(K)$ for the selected cycle, restricted to within **±22% of spot**. The band is deliberate: far-tail strikes quote wide and thin, and their IVs are numerically unstable enough to visually dominate a curve.

### 4.2 Term Structure & Forward Implied Volatility

Plots ATM IV across all expirations, ordered by DTE.

| Shape | Name | Interpretation |
|---|---|---|
| Upward sloping | **Contango** (normal) | Calm market — uncertainty grows with time |
| Downward sloping | **Backwardation** (inverted) | Near-term event risk or panic |
| Humped | **Event-driven** | Near-term bump from earnings/FOMC/CPI |

**Forward IV** isolates what the market prices for the period *between* two horizons:

$$
\sigma_{\text{fwd}}(T_1, T_2) = \sqrt{\frac{T_2 \sigma_2^2 - T_1 \sigma_1^2}{T_2 - T_1}}
$$

This follows from variance being additive in time while volatility is not. A steep front-month spike often leaves forward vol nearly flat, telling you the event risk is genuinely localised rather than a repricing of the whole curve.

**How to use**: Backwardation is the textbook setup for calendar spreads (sell rich front month, buy cheaper back month). Index vol traders watch VIX/VIX3M ratio — above ~1 signals backwardation and is a standard trigger for de-risking short-vol positions.

### 4.3 Breeden-Litzenberger Risk-Neutral Density (RND)

Extracts the market's implied probability density $f(K)$ for the underlying at expiration directly from call prices:

$$
f(K) = e^{rT} \frac{\partial^2 C(K)}{\partial K^2}
$$

#### Non-Uniform Strike Grid (Critical Implementation Detail)

Real SPX chains alternate between 5-, 10-, and 25-point strike gaps. The textbook uniform second-difference $\frac{C_{i+1} - 2C_i + C_{i-1}}{h^2}$ is **wrong** when $\Delta K$ changes between the two sides — it silently assumes a single $h$ that does not exist.

The general **non-uniform three-point second derivative** is used:

$$
\frac{\partial^2 C}{\partial K^2} \approx \frac{2 \left[ \Delta K_1 \cdot C(K_{i+1}) - (\Delta K_1 + \Delta K_2) \cdot C(K_i) + \Delta K_2 \cdot C(K_{i-1}) \right]}{\Delta K_1 \cdot \Delta K_2 \cdot (\Delta K_1 + \Delta K_2)}
$$

where $\Delta K_1 = K_i - K_{i-1}$ and $\Delta K_2 = K_{i+1} - K_i$.

Post-processing: densities are floored at zero ($\max(0, \partial^2 C / \partial K^2)$, since negative probability densities are numerical artefacts) and normalised so $\sum f(K_i)\,\Delta K_i = 100\%$.

**How to use**: The RND converts an entire options chain into "what does the market actually think the probability distribution looks like" — richer than a single IV number because it captures skew and kurtosis views directly. Risk desks compare the option-implied distribution against a physical-measure forecast to find where tail-risk pricing is rich or cheap.

### 4.4 25-Delta Skew & Kurtosis

**Risk Reversal (Skew)** — the price of downside protection relative to upside:

$$
\text{RR}_{25\Delta} = \text{IV}(\text{Put}_{25\Delta}) - \text{IV}(\text{Call}_{25\Delta})
$$

Positive = put skew (demand for downside protection exceeds upside). For index options this is nearly always positive; the informative signal is its *level* against its own history, not its sign.

> **Sign convention — read this before cross-checking an external quote.** This platform quotes RR as **put minus call**, so a normal equity surface reads *positive*. The FX/dealer convention (and most published index RR series, including the one in [Decoding the Volatility Surface](https://www.sophie-ai-finance.com/articles/decoding-volatility-surface-advanced-market-prediction-options-flow)) is the **inverse** — call minus put — where the same normal surface reads *negative*, and "rising, less negative" means protection being sold off. Neither is more correct, but the two read backwards from each other: under our convention that same complacency signal is a *falling* RR. Check which direction a source is quoting before comparing levels or directions.

**Normalized Skew** — the raw vol-point value above is level-dependent, which makes a fixed threshold table unreliable across regimes. Dividing by ATM IV removes that dependence:

$$
\text{Normalized Skew} = \frac{\text{IV}(\text{Put}_{25\Delta}) - \text{IV}(\text{Call}_{25\Delta})}{\text{IV}_{\text{ATM}}}
$$

5 vol points of skew against a 12% ATM (0.42) is a heavy hedging bid; the same 5 points against a 35% ATM (0.14) is close to complacent. Raw points cannot tell those apart — which is why the classification bands below are cut on the normalized value, not the raw one.

**Skew Morphology** — the viewer classifies the surface into one of five states. The two below "Normal Smirk" trace the progression a complacent market walks through: structural put premium → hedges abandoned → calls bid over puts outright.

| Normalized | State | Reading |
|---|---|---|
| < 0 | **Forward Skew** | Calls bid over puts. Speculative upside demand outweighing hedging — rare on index options, historically a late-stage signature |
| 0 – 0.20 | **Flattening** | Protection unusually cheap vs. ATM. Hedging demand has drained out — affordable precisely when few are buying |
| 0.20 – 0.35 | **Normal Smirk** | Structural put premium in its usual band — the post-1987 baseline |
| 0.35 – 0.55 | **Elevated** | Hedging demand building, independent of where ATM sits |
| > 0.55 | **Extreme** | Crash-hedging bid — event-driven, or a market already under stress |

The bands correspond to the legacy raw table (3–5 / 5–8 / > 8 vol points) evaluated at a typical ~15% SPX ATM IV, so readings agree with the old thresholds in normal conditions and diverge — correctly — when ATM IV is far from that level.

**A caveat this classifier cannot escape**: it reads a *level*, and the article's sharpest signal is a *direction* — a flattening skew into a rising market ("Euphoria") versus a steepening one ("Wall of Worry"). Distinguishing those needs a skew history the viewer does not yet store. Until then, "Flattening" flags the state, not the transition into it.

**Butterfly (Convexity / Kurtosis)** — wing curvature relative to ATM:

$$
\text{Fly}_{25\Delta} = \frac{\text{IV}(\text{Put}_{25\Delta}) + \text{IV}(\text{Call}_{25\Delta})}{2} - \text{IV}_{\text{ATM}}
$$

Rising butterfly = market paying up for tail outcomes on both sides.

**How to use**: A sharp rise in put skew (independent of VIX level) is read as crash-hedging demand building. Butterfly is more specialised — a persistently elevated butterfly across a chain is one reason "sell premium everywhere" strategies underperform more targeted approaches.

### 4.5 Per-Point Data Quality Flags

Individual thin or wide-spread points are flagged with an **amber ring** rather than hidden:

```
thin quote  =  spread% > 20%   OR   (volume == 0  AND  OI < 10)
```

The flag rate rises smoothly with distance from spot: 0% within ±5%, 25% by ±10%, 28% by ±15%, 43% by ±25%. When the flag reads a surface metric, don't over-read flagged data points — trust the overall shape in unflagged regions.

---

## 5. Positioning Analysis (OI, Volume, Max Pain)

### 5.1 Open Interest vs. Volume — They Answer Different Questions

| Metric | Definition | Updates | What It Tells You |
|---|---|---|---|
| **Open Interest** | Total outstanding contracts at each strike | Once per session (EOD) | Resting positions — accumulated conviction |
| **Volume** | Contracts traded today at each strike | Resets every session | Today's activity — who's moving right now |

**The two together** tell you whether resting positioning is *live* or *stale*. High OI with meaningful same-day volume at a strike = actively traded, worth taking seriously. High OI with zero volume = legacy positioning nobody is currently defending.

### 5.2 Call Wall & Put Wall (OI-Based)

The strike carrying the largest **open interest** on its side:
- **Call Wall** (above spot) — read as overhead resistance
- **Put Wall** (below spot) — read as downside support

Unlike GEX walls (§ 6), these are raw contract counts, not gamma-weighted — a simpler measure answering "where is size resting" rather than "where is dealer hedging pressure." Use OI walls as a quick first read, then cross-check against GEX's gamma-weighted walls — a strike with huge OI but deep ITM/OTM (contributing little gamma) shows up as an OI wall while being nearly irrelevant on the GEX chart.

### 5.3 Max Pain Cumulative Payout Curve

The full function behind the Max Pain figure — total dollar liability of option sellers across every candidate settlement price:

$$
\text{Payout}(K_{\text{settle}}) = \frac{\sum_c \max(0, K_{\text{settle}} - K_c) \cdot \text{OI}_c \cdot 100 + \sum_p \max(0, K_p - K_{\text{settle}}) \cdot \text{OI}_p \cdot 100}{1{,}000{,}000} \quad (\$\text{M})
$$

**Curve shape matters more than the strike**: A shallow, wide minimum = many nearby strikes carry similar seller liability and the pin is weak. A sharp V = one strike genuinely favoured.

**How to trade it**: Max Pain is a *last-day* phenomenon — whatever pinning tendency it has is a function of dealer hedging as expiration nears. Most relevant on settlement day, weakest early in a cycle. Cross-check against Call/Put Walls and GEX tab — if all three agree, that's a materially stronger read than Max Pain alone.

### 5.4 Cumulative Open Interest Curve

$$
\text{CumCallOI}(K) = \sum_{k \le K} \text{OI}_{\text{call}}(k), \qquad \text{CumPutOI}(K) = \sum_{k \le K} \text{OI}_{\text{put}}(k)
$$

Turns spiky per-strike OI bars into readable monotonic curves. Where curves are steepest = OI is densest. Where they cross = cumulative put and call positioning roughly balance.

---

## 6. Gamma Exposure (GEX) & Market Maker Hedging

### 6.1 Dollar GEX Formula

Per-strike dollar gamma exposure, expressed as **dollars of hedging flow per 1% move**:

$$
\text{GEX}_i = \Gamma_i \times \text{OI}_i \times 100 \times S^2 \times 0.01
$$

**The $S^2$ term is not a typo**, and it is the most common place to go wrong:

$$
\underbrace{\Gamma \times \text{OI} \times 100 \times S \times 1\%}_{\text{shares to hedge}} \times \underbrace{S}_{\text{price per share}} = \text{dollars to hedge}
$$

**Worked example** — $\Gamma = 0.05$, 10,000 contracts, $S = \$4{,}000$ (1% move = \$40):
- Delta change per contract: $0.05 × 40 × 100 = 200$ shares
- Across all contracts: $200 × 10{,}000 = 2{,}000{,}000$ shares
- **Notional dollars: $2{,}000{,}000 × \$4{,}000 = \$8\text{B}$**

### 6.2 Dealer Sign Convention

The standard "naive" dealer assumption (same as SqueezeMetrics / SpotGamma):

$$
\text{Net GEX} = \sum_{\text{calls}} \Gamma\,\text{OI}\,100\,S^2(1\%) \;-\; \sum_{\text{puts}} \Gamma\,\text{OI}\,100\,S^2(1\%)
$$

Calls contribute positive gamma (dealers long gamma), puts negative. **This is a modelling assumption, not an observed fact** — public OI cannot prove which side the dealer is on. It is the single largest source of model risk in the entire calculation.

### 6.3 Scope: Whole Book (Not Single Expiration)

Net GEX, the gamma flip, and both walls aggregate across **all listed expirations**. This matters enormously: on a representative SPX chain, the front monthly alone printed Net GEX of **−11.8** (\$M per 1%) — a negative-gamma reading — while the whole book printed **+13,746**. Those are opposite regime calls from the same data. A single-expiration toggle is available but should not be compared to published provider levels.

### 6.4 Gamma Flip Level (Zero Gamma)

The gamma flip is the **spot price at which aggregate dealer gamma crosses zero** — the boundary between the volatility-dampening (positive gamma) and volatility-amplifying (negative gamma) regimes.

It is **not** the strike where an individual bar changes sign, nor where a cumulative running total crosses zero. It is found by **repricing the entire book**:

1. For a candidate spot $S'$, recompute **every** contract's gamma with Black-Scholes at $S'$, using that contract's own IV and time to expiry
2. Sum the position-signed exposure at $S'$
3. Find where that sum crosses zero

**Implementation**: A coarse 1% sweep across ±8% of spot to bracket sign changes, then **14-step bisection** to refine — ~30 full revaluations. IV is held constant as spot moves ("sticky strike"). Time to expiry is floored at half a session to prevent BSM gamma divergence as $T \to 0$.

### 6.5 Call Wall & Put Wall (Gamma-Weighted)

Both walls are the strike carrying the **largest gamma exposure** on their side — not the largest raw OI. Raw OI is the wrong proxy: a deep ITM/OTM strike can hold enormous legacy OI while contributing almost no gamma.

Two constraints:

1. **Directional constraint**: Call wall at or above spot, put wall at or below spot. Without this, both can collapse onto the same strike — on live SPX data, unconstrained search put the "put wall" 126 points *above* spot
2. **Smoothing**: Peak taken over a $[0.25, 0.5, 0.25]$-smoothed series to prevent hopping between adjacent strikes on trivial data refreshes

### 6.6 Vanna & Charm Exposure (Higher-Order Greeks)

$$
\text{Vanna}_{\$} = \pm \frac{\partial \Delta}{\partial \sigma} \times \text{OI} \times 100
$$

$$
\text{Charm}_{\$} = \pm \frac{\partial \Delta}{\partial t} \times \text{OI} \times 100
$$

### 6.7 Reading GEX in Practice

| Reading | Dealer Position | Hedging Flow | Expected Behaviour |
|---|---|---|---|
| Net GEX > 0 | Long gamma | Sell into strength, buy weakness | Dampened moves, mean reversion, pinning |
| Net GEX < 0 | Short gamma | Buy strength, sell weakness | Amplified moves, trend continuation |
| Spot above flip | Typically long gamma | — | Stabilising regime |
| Spot below flip | Typically short gamma | — | Unstable regime |

**How to trade it**:
- **Positive GEX, above flip**: Range-bound environment — sell premium (iron condors, short strangles)
- **Negative GEX, below flip**: Trending environment — buy premium (straddles) or trade directionally
- **Max-GEX strike**: Price tends to gravitate here ("pinning") especially into expiry
- **Between put wall and call wall**: Balanced hedging flows — range-trade the walls
- **Break below put wall**: Dealer short-gamma cascade — expect accelerating downside

---

## 7. SPX Payoff Builder & Probability Analysis

### 7.1 P&L at Expiration ($T = 0$)

$$
\text{PnL}(S_T) = \sum_{i=1}^N \text{Quantity}_i \times \text{Sign}_i \times \left[ \text{IntrinsicValue}(S_T, K_i, \text{Type}_i) - \text{Premium}_i \right] \times 100
$$

where $\text{Sign}_i = +1$ for long, $-1$ for short.

This is the "hockey stick" diagram — a straight-line, closed-form payoff requiring no volatility model. Max loss, max profit, and breakeven strikes are read directly off the diagram.

### 7.2 "T+0" Mark-to-Market Curve

The more urgent question: what is the position worth *tomorrow*?

1. **Solve for IV**: Each leg's entry premium is inverted to its exact Black-Scholes $\sigma_i$ via bisection on mid price
2. **Reprice at hypothetical spot levels**:

$$
\text{Value Today}(S') = \sum_{i=1}^N \text{Quantity}_i \times \text{Sign}_i \times \left[ C_{\text{BS}}(S', K_i, T, r, q, \sigma_i) - \text{Premium}_i \right] \times 100
$$

The T+0 curve sits *inside* the expiration diagram (time value cushions losses and caps gains). Comparing both is how a trader decides whether to hold, adjust, or take profit early.

### 7.3 Net Position Greeks

$$
\text{Net Delta} = \sum \pm Q_i \cdot 100 \cdot \Delta_i, \qquad \text{Net Gamma} = \sum \pm Q_i \cdot 100 \cdot \Gamma_i
$$

$$
\text{Net Theta} = \sum \pm Q_i \cdot 100 \cdot \Theta_i, \qquad \text{Net Vega} = \sum \pm Q_i \cdot 100 \cdot \mathcal{V}_i
$$

This is genuinely how professional desks manage multi-leg exposure:
- **Net delta ≈ 0**: Entry condition for credit-selling strategies (iron condors, straddles)
- **Net theta > 0**: Daily carry — what premium sellers are explicitly harvesting
- **Net gamma**: How fast delta moves — large short-gamma needs active delta-hedging ("gamma scalping")
- **Net vega**: Exposure to IV itself — long-vega profits if IV rises even with underlying unchanged

### 7.4 Risk-Neutral Probability of Profit (POP)

The probability the position finishes with PnL > 0 at expiration, under risk-neutral lognormal drift $\mu = r - q - \sigma^2/2$:

1. Find every breakeven (zero-crossing) strike $B_1, \dots, B_m$
2. Partition the price domain into intervals
3. For each *profitable* interval $[L_k, U_k]$, integrate the lognormal CDF:

$$
P(L_k < S_T < U_k) = \Phi\!\left( \frac{\ln(S/L_k) + \mu T}{\sigma\sqrt{T}} \right) - \Phi\!\left( \frac{\ln(S/U_k) + \mu T}{\sigma\sqrt{T}} \right)
$$

4. $\text{POP} = \sum_{k \in \text{Profitable}} P(L_k < S_T < U_k)$

**Central caveat**: POP measures how often a trade wins, not how much. A 70% POP iron condor with small max profit and large max loss can have negative expected value. POP is risk-neutral (option-implied), not real-world — the two coincide only if the volatility risk premium is zero.

### 7.5 Implied Price Ranges (Confidence Intervals)

**Flat ATM Model** (symmetric):

$$
\text{Boundary}_{\text{lower/upper}} = S \cdot \exp\!\left( \mu T \pm \sigma_{\text{ATM}}\sqrt{T} \cdot z_{(1+c)/2} \right)
$$

For 68% confidence ($1\sigma$): $z = 1.000$. For 80%: $z = 1.28155$.

**Skew-Adjusted Model** (asymmetric — iterated to fixed-point convergence):

$$
\text{Upper}^{(n+1)} = \text{Boundary}\left(S, T, r, q, \sigma(\text{Upper}^{(n)}), +z\right)
$$

$$
\text{Lower}^{(n+1)} = \text{Boundary}\left(S, T, r, q, \sigma(\text{Lower}^{(n)}), -z\right)
$$

Because index options carry negative skew (puts trade at higher IV than calls), this produces a **wider downside boundary and tighter upside boundary** — the direct numerical expression of the market pricing crashes as more likely than equivalent rallies. Traders selling strangles or setting protective-put strikes should use the skew-adjusted range, not the symmetric one.

### 7.6 Built-In Strategy Templates

| Template | Legs |
|---|---|
| **Bull Call Spread** | Buy ATM call, sell OTM call |
| **Bear Put Spread** | Buy ATM put, sell OTM put |
| **Iron Condor** | Sell OTM put + call, buy further-OTM put + call |
| **Straddle** | Buy ATM call + ATM put |
| **Strangle** | Buy OTM call + OTM put |
| **Butterfly** | Buy 1 lower call, sell 2 ATM calls, buy 1 upper call |
| **Calendar Spread** | Sell near-month ATM, buy far-month ATM (same strike) |

---

## 7A. History Tab — Escaping the Single Snapshot

Every section above operates on **one** point-in-time chain. That is the viewer's defining
constraint, and it is also its sharpest limitation: § 4.4 states that the informative signal in a
risk reversal is *"its level against its own history"*, which a single snapshot cannot supply.

The History tab is the answer. A daily ETL (`sophie-pipeline/src/agents/spx_option_snapshot.py`)
stores one summary row plus a per-strike slice after each close, and this tab reads that
accumulation over GraphQL — the only tab not derived from the live chain.

The reason it is an ETL rather than an on-demand computation: **option chain snapshots are not
reproducible from the live feed.** A chain quoted at 16:00 ET is gone when the session ends — Cboe
publishes current state, not history. A gap can only be repaired by buying it from a vendor that
recorded OPRA at the time, which is why the job runs on Cloud Scheduler rather than best-effort.

### 7A.1 Percentile Ranks

Each headline metric — normalised skew, RR25, butterfly, ATM IV, net GEX, put/call OI — is ranked
against its own stored history via `PERCENT_RANK()`. This converts *"RR25 is +3.89"* into *"RR25 is
in the 88th percentile of where this surface normally trades"*, which is the reading § 4.4 asks for
and could not previously provide.

Ranks are withheld until **20 sessions** exist. A percentile drawn from four observations looks
precise and carries nothing; the tab shows a "building history (n/20)" state instead. Values render
correctly from session one — only the ranks wait.

### 7A.2 Skew Stickiness Ratio (SSR)

$$
\text{SSR} = \frac{\Delta \sigma_{\text{ATM}} \,/\, \Delta \ln S}{\partial \sigma / \partial \ln K \big|_{\text{ATM}}}
$$

Numerator: how far ATM implied vol actually moved per unit log-spot. Denominator: the ATM skew
already in place — fit by least squares over OTM quotes within ±5% of spot on the reference cycle.
Both are vol points per log-unit, so SSR is dimensionless.

| SSR | Regime | Meaning |
|---|---|---|
| ~ 0 | **Sticky Delta** | The smile travelled with spot; ATM vol barely moved. The market read the move as trend |
| ~ 1 | **Sticky Strike** | The smile stayed pinned to strikes; ATM vol slid along the existing skew |
| > 1.3 | **Repricing** | Vol moved further than the skew implied — the surface repriced, not merely shifted |
| < 0 | **Inverted** | ATM vol moved opposite to the skew's implication — a vol-regime shift, not a spot-driven move |

**Why this matters beyond classification**: § 6.4's gamma-flip solver *hardcodes* the sticky-strike
assumption, holding IV constant while repricing the book at candidate spot levels. SSR is the only
measurement on the platform that says whether that assumption held. A reading far from 1 means the
published flip level rests on shakier ground that day than its precision suggests.

SSR is null on the first stored session, and on any day the index barely moved — the ratio divides
by the spot change, so below ~0.1% movement the denominator turns quote noise into an enormous
meaningless number.

> **Convention warning**, in the same spirit as the RR sign note in § 4.4: SSR normalisations differ
> across the literature — some scale so that sticky delta reads 1 and sticky strike reads 2. The
> definition above is this platform's. Do not compare the figure against a published SSR without
> checking theirs first.

### 7A.3 Open Interest Flow

Volume says how much traded; it cannot say whether that trading *opened* or *closed* positions.
Rising open interest on heavy volume is conviction being built — falling OI on identical volume is
an unwind wearing the same signature. Only the pair separates them, and the difference requires two
stored sessions, which no single snapshot can supply.

Each side is classified by its OI change relative to that day's own volume — a ratio rather than an
absolute contract count, because 10,000 contracts of OI change means something entirely different on
a 2,000-lot day than on a 2,000,000-lot one:

| State | Condition | Reading |
|---|---|---|
| **Building** | ΔOI / volume > +0.15 | New positions opened |
| **Closing** | ΔOI / volume < −0.15 | Unwind or short cover |
| **Churning** | between | Heavy trading, flat net positioning |

**Comparability is the hard part.** Differencing two sessions assumes both describe the same book,
which is not automatic: SPX lists cycles continuously, and the ETL's own selection rules roll (DTE ≤ 2
daily, the 4-weekly window weekly), so 1–4 cycles enter or leave the stored set on a typical session.
A contract with no prior row cannot be differenced — and defaulting it to zero prior OI books its
entire resting position as opened today, indistinguishable from genuine conviction. Measured on a
staged case where one 320-contract cycle (159,209 OI) was absent from the prior session, the naive
join inflated reported net ΔOI by **3.4×** and flipped both sides from *Churning* to *Building*.

Two guards, deliberately at different layers:

| Layer | Guard | What it buys |
|---|---|---|
| ETL | A stored cycle is carried until it expires | Membership is monotone — exits are expiries, never drift |
| GraphQL | ΔOI and volume summed only over contracts in **both** sessions; `comparableShare` reported | Survives new listings, skipped runs and backfills alike |

Neither suffices alone. Hysteresis cannot prevent a genuinely new cycle's first appearance, and it
cannot help at all across a missed session — only the query-side restriction covers those. Levels
(`callOi`, `putOi`) stay summed over the full slice; only the *changes* are restricted, so the book
is never understated while the flow stays honest.

### 7A.4 Skew vs. Price Divergence

Over a trailing 20-session window, the *joint direction* of price and normalised skew:

| Price | Skew | State | Reading |
|---|---|---|---|
| ↑ | steepening | **Wall of Worry** | Hedged participation — the healthier way to advance |
| ↑ | flattening | **Euphoria** | The same rally with protection stripped out; fragile |
| ↓ | steepening | **Fear Confirming** | Hedging into weakness — textbook risk-off |
| ↓ | flattening | **Capitulation / Relief** | Protection sold into the decline, often late in a move |

This is the read a single snapshot structurally cannot produce. The § 4.4 morphology classifier
reports that skew *is* flat; only this can report that it is *flattening while price rises* — and
that transition, not the level, is the signal.

---

## 8. Data Quality: SPX/SPXW Deduplication & Stale Cycle Handling

### 8.1 The SPX/SPXW Problem

A standard SPX monthly (3rd Friday) is frequently shared with a same-day **SPXW** contract — a genuinely different, separately-traded PM-settled product with its own OI pool. On live data this duplicated **26–46% of strikes** on every monthly checked.

**The correct fix differs by context**:

| Context | Correct Handling | Reason |
|---|---|---|
| **IV surface (Volatility tab)** | **Dedup** to one contract per strike (prefer standard SPX root) | IV is not additive — two different IVs at one strike must resolve to one |
| **OI / Volume (Positioning tab)** | **Sum** across both products | OI and volume are additive |
| **GEX** | **Sum** | Both instruments represent real dealer hedging exposure |

Before the fix, the code kept whichever came *last* (overwrite vs. accumulate). Because the feed consistently lists the high-OI SPX contract *before* its low-OI SPXW twin, this silently discarded the dominant open interest:

| Strike | SPX OI | SPXW OI | What the chart showed |
|---|---|---|---|
| 7000 | 320,669 | 219 | 219 |
| 8000 | 269,264 | 3,146 | 3,146 |

The Total OI KPI read **2,269,213** while the curve topped at **106,857** — 95% of OI silently missing.

### 8.2 Stale / Expired Cycle Exclusion

When the feed is frozen (markets closed, weekend), a contract that has already expired can still be labeled 0 DTE. Its quotes are frozen at end-of-day levels with near-zero time value, and IV inversion is numerically unstable — producing solved IVs of **78%, 193%, and 336%** on SPX strikes just \$5 apart. The Term Structure Slope card read "Backwardation" purely from that dead front point; the true live-cycle reading was "Contango."

Fix: exclude any cycle whose expiration date has already passed in America/New_York timezone, regardless of what the feed's DTE field claims. A small amber notice appears when a cycle was excluded.

---

## 9. Limitations

| Limitation | Impact |
|---|---|
| **Dealer sign convention is an assumption** | Public OI cannot establish who is long or short; a day where customers are net sellers of puts inverts the true sign |
| **Open interest is stale** | Published once daily, not intraday — so the History tab's ΔOI is strictly session-over-session and cannot resolve intraday positioning |
| **History depth gates the History tab** | Percentile ranks need 20 stored sessions, ΔOI and SSR need 2. The series began 2026-08-21. Not backfillable from Cboe's live feed, though a vendor that recorded OPRA at the time can serve the gap |
| **SSR uses a platform-specific normalisation** | Not directly comparable to published SSR figures that scale sticky delta to 1 |
| **Walls are not hard barriers** | They mark where hedging flow concentrates, not a ceiling or floor |
| **POP is risk-neutral, not physical** | Reflects market pricing including VRP, not actual expected outcomes |
| **T+0 IV is frozen at entry** | Does not model how IV might change as spot moves (no vol skew dynamics). The History tab's SSR now at least *measures* which regime is prevailing, even though the builder does not consume it |
| **European exercise assumed** | Correct for SPX (cash-settled), not for American-style equity options |
| **RND is only as good as the quotes** | Second derivative amplifies quote noise |
| **±22% smile band hides tail information** | Deliberate, but far-tail pricing isn't visible |
| **SPX-calibrated liquidity breakpoints** | Would need recalibration for single-name equity options |
| **Different providers publish different GEX levels** | Inventory assumptions, vol inputs, expiry filters all differ |

---

## 10. Complete Source Bibliography

All wiki source pages consulted for this research paper:

### Platform Methodology Wiki Pages

| # | Wiki Page | Path |
|---|---|---|
| 1 | **Options Viewer Calculation & Methodology Guide** | [`options-viewer-methodology.md`](file:///f:/workspace/ai-stock-suggestion-client/public/wiki/option-strategy/options-viewer-methodology.md) |
| 2 | **Options HUD Metrics** | [`options-hud-metrics.md`](file:///f:/workspace/ai-stock-suggestion-client/public/wiki/option-strategy/options-hud-metrics.md) |
| 3 | **Options Positioning Analysis** | [`options-positioning-analysis.md`](file:///f:/workspace/ai-stock-suggestion-client/public/wiki/option-strategy/options-positioning-analysis.md) |
| 4 | **GEX Calculation Methodology** | [`gex-methodology.md`](file:///f:/workspace/ai-stock-suggestion-client/public/wiki/option-strategy/gex-methodology.md) |
| 5 | **Option Liquidity Scoring** | [`option-liquidity-scoring.md`](file:///f:/workspace/ai-stock-suggestion-client/public/wiki/option-strategy/option-liquidity-scoring.md) |
| 6 | **Volatility Surface Analytics** | [`volatility-surface-analytics.md`](file:///f:/workspace/ai-stock-suggestion-client/public/wiki/option-strategy/volatility-surface-analytics.md) |
| 7 | **Multi-Leg Payoff & POP Methodology** | [`spx-payoff-builder-methodology.md`](file:///f:/workspace/ai-stock-suggestion-client/public/wiki/option-strategy/spx-payoff-builder-methodology.md) |
| 7b | **Options History Analytics** (§ 7A source) | [`options-history-analytics.md`](file:///f:/workspace/ai-stock-suggestion-client/public/wiki/option-strategy/options-history-analytics.md) |

### Concept & Theory Wiki Pages

| # | Wiki Page | Path |
|---|---|---|
| 8 | **Gamma Exposure (GEX) — Market Mechanics** | [`gex.md`](file:///f:/workspace/ai-stock-suggestion-client/public/wiki/option-strategy/gex.md) |
| 9 | **Option Greeks Overview** | [`option-greeks-overview.md`](file:///f:/workspace/ai-stock-suggestion-client/public/wiki/option-strategy/option-greeks-overview.md) |
| 10 | **The Volatility Surface — Theory & Shape** | [`volatility-surface.md`](file:///f:/workspace/ai-stock-suggestion-client/public/wiki/option-strategy/volatility-surface.md) |
| 11 | **Volatility Smile & Skew Explained** | [`volatility-smile-skew.md`](file:///f:/workspace/ai-stock-suggestion-client/public/wiki/option-strategy/volatility-smile-skew.md) |
| 12 | **Volume & Open Interest Analysis** | [`volume-open-interest-analysis.md`](file:///f:/workspace/ai-stock-suggestion-client/public/wiki/option-strategy/volume-open-interest-analysis.md) |
| 13 | **Tail-Risk & Skew — Fear Gauge** | [`tail-risk-skew.md`](file:///f:/workspace/ai-stock-suggestion-client/public/wiki/option-strategy/tail-risk-skew.md) |

### External References Cited Across Wiki Pages

| # | Reference |
|---|---|
| 14 | **SqueezeMetrics** — *The Implied Order Book / GEX White Paper* |
| 15 | **SpotGamma** — *Gamma Exposure (GEX)* |
| 16 | **Breeden & Litzenberger** — *Prices of State-Contingent Claims Implicit in Option Prices* (1978) |
| 17 | **Gatheral** — *The Volatility Surface: A Practitioner's Guide* (Wiley) |
| 18 | **Hull** — *Options, Futures & Other Derivatives*, 11th ed. (Pearson) |
| 19 | **Natenberg** — *Option Volatility & Pricing*, 2nd ed. |
| 20 | **Taleb** — *Dynamic Hedging* (Wiley) |
| 21 | **Sinclair** — *Volatility Trading*, 2nd ed. (Wiley) |
| 22 | **Sinclair** — *Positional Option Trading* (Wiley) |
| 23 | **McMillan** — *Options as a Strategic Investment*, 5th ed. |
| 24 | **CBOE** — VIX White Paper, SKEW Index Methodology, Market Quality Statistics |
| 25 | **OCC** — Options Clearing Corporation Data Specs & Open-Interest Reports |
| 26 | **tastytrade** — Expected Move (0.85 straddle rule of thumb) |

---

> **Note**: This document is a comprehensive reference guide derived from 13 interconnected wiki pages on the SOPHIE platform. Every formula, scoring table, and trading signal documented here operates on a **single point-in-time option chain snapshot** from ^SPX — European-style, cash-settled, with \$100 contract multiplier. The VRP Research sub-tool (Tier 4+) is explicitly excluded from this guide per the user's scope.
