---
path: quant/move-vix-spillover
title: MOVE-VIX Disconnect & Spillover
articleSlug: move-vix-disconnect-cross-asset-volatility-spillover
date: 2026-09-28
labels: ["Quantitative Finance", "Macro Views", "Options Trading"]
related: []
---

## Overview

The **MOVE-VIX disconnect** describes a historic dislocation between fixed-income implied volatility (measured by the ICE BofA MOVE Index) and equity implied volatility (measured by the Cboe VIX Index). 

When macroeconomic uncertainty and central bank forward guidance (such as hawkish repricing at the Jackson Hole Economic Symposium) force violent shifts in the discount rate, Treasury volatility surges. Meanwhile, equity implied volatility can remain artificially suppressed due to structural shifts in market plumbing—chiefly the explosive growth of zero-day-to-expiration (0DTE) options. Once rate volatility breaches critical thresholds, cross-asset transmission mechanisms trigger mechanical deleveraging across systematic strategies and risk-parity portfolios.

## Key Concepts

- **ICE BofA MOVE Index** — Measures implied yield volatility across the 2Y, 5Y, 10Y (40% weight), and 30Y points of the U.S. Treasury curve using at-the-money (ATM) OTC options under the Bachelier normal model.
- **Cboe VIX Index** — Measures 30-day expected annualized variance on the S&P 500 through a model-free discrete replication of out-of-the-money (OTM) put and call options.
- **Bachelier Normal Volatility** — An option pricing framework based on arithmetic Brownian motion rather than lognormal returns, essential for interest rates which can approach zero or negative values.
- **0DTE Dealer Gamma Trap** — Intraday dealer hedging of high-volume 0DTE options flow generates long gamma exposure, dampening realized intraday moves and suppressing 30-day implied volatility.
- **Diebold-Yilmaz Spillover Index** — A generalized Vector Autoregression (VAR) framework that quantifies directional variance transmission between asset classes without dependency on variable ordering.
- **Dynamic Conditional Correlation (DCC-GARCH)** — Econometric model capturing time-varying covariances and volatility clustering between rate volatility and equity returns.
- **Archimedean Copulas** — Mathematical functions (Clayton, Gumbel, Symmetrized Joe-Clayton) modeling asymmetric tail dependence where linear correlation fails during market crashes.
- **25-Delta Risk Reversal** — The implied volatility spread between 25-delta OTM puts and calls, serving as a primary barometer of institutional downside hedging pressure.
- **Systematic Deleveraging** — Rule-based selling by volatility-targeting and risk-parity funds mandated to keep portfolio volatility at fixed targets (typically ~10%).

## Mathematical Foundations: VIX vs. MOVE

### Cboe VIX (Variance Swap Replication)

The VIX calculates 30-day expected variance by integrating over a continuous strip of OTM options:

$$
\sigma^2 = \frac{2}{T} \sum_{i} \frac{\Delta K_i}{K_i^2} e^{RT} Q(K_i) - \frac{1}{T}\left[\frac{F}{K_0} - 1\right]^2
$$

$$
\text{VIX} = 100 \times \sqrt{\sigma^2}
$$

Because the formulation weights options inversely to the square of strike price ($K_i^2$), it heavily emphasizes deep OTM puts, incorporating negative skewness into the index value.

### ICE BofA MOVE (Bachelier Normal Volatility)

Treasury yield movements are modeled via arithmetic Brownian motion:

$$
dF_t = \sigma_n \, dW_t
$$

The undiscounted price of European call options on Treasury yields under the Bachelier model is:

$$
C_n(K) = (F_0 - K)\Phi(d) + \sigma_n \sqrt{T} \, \phi(d), \quad d = \frac{F_0 - K}{\sigma_n \sqrt{T}}
$$

**Daily Volatility Conversion:**
A MOVE reading of 100 implies a daily 1-standard-deviation yield swing of:

$$
\frac{100}{\sqrt{252}} \approx 6.30 \text{ basis points/day}
$$

### Structural Comparison

| Feature | ICE BofA MOVE Index | Cboe VIX Index |
|---|---|---|
| **Asset Class** | U.S. Treasury Yields (2Y, 5Y, 10Y @ 40%, 30Y) | S&P 500 Index (Equities) |
| **Moneyness** | At-The-Money (ATM) only | Full strip of Out-Of-The-Money (OTM) strikes |
| **Model** | Bachelier Normal Implied Volatility | Model-Free Variance Swap Replication |
| **Expression** | Absolute basis points (annualized) | Annualized percentage standard deviation |
| **Horizon** | 1-month to expiration | Interpolated exactly to 30 days |
| **Normal Band** | Historical ratio of MOVE/VIX typically oscillates between **3.0 and 5.0** |

## 0DTE Mechanics & Structural Fragility

By late 2026, 0DTE options account for over 60% of total U.S. index option trading volume:
1. **Intraday Mean Reversion:** Because dealer books are net long gamma from absorbing retail and systematic option sales, delta-hedging requires buying dips and selling rips.
2. **VIX Blindness:** The traditional VIX exclusively samples 23–37 day options, rendering it unresponsive to the massive intraday volatility contained within the 0DTE surface.
3. **Vega Feedback Loop:** Suppressed realized volatility lowers implied volatility across the term structure. However, high vega notional in VIX options creates extreme vulnerability: a rate shock breaking the dealer gamma pinning triggers rapid short covering and sudden volatility explosions.

## Modeling Cross-Asset Volatility Spillover

### Diebold-Yilmaz Spillover Index

Directional spillover from asset $i$ to asset $j$ is derived from generalized forecast error variance decompositions:

$$
S = \left[ \frac{\sum_{i \neq j} \tilde{\theta}_{ij}(H)}{\sum_{i,j} \tilde{\theta}_{ij}(H)} \right] \times 100
$$

During hawkish repricing regimes, fixed income shifts to become a **dominant net transmitter** of volatility shocks, while equities serve as **net receivers**.

### Copula Tail Dependence

Linear correlation fails in non-linear market shocks:
- **Gaussian Copula:** Zero tail dependence; assumes extreme co-movements are asymptotically independent.
- **Clayton Copula:** Asymmetric lower-tail dependence; captures simultaneous crashes in equity prices.
- **Gumbel Copula:** Asymmetric upper-tail dependence; models simultaneous explosions in rate and equity implied volatility ($\text{MOVE} \uparrow \text{ and } \text{VIX} \uparrow$).
- **SJC Copula:** Captures time-varying dependence in both tails simultaneously.

## Transmission into Factor Spreads & Option Skew

- **Growth vs. Value Duration:** Growth equities carry extended cash-flow duration, making their price-to-earnings multiples hyper-sensitive to discount rate shocks. Value equities exhibit shorter duration and temporary sector rotation resilience.
- **25-Delta Risk Reversal ($IV_{Put, 25\Delta} - IV_{Call, 25\Delta}$):** Steepening negative skew indicates aggressive institutional bidding for downside protection, forcing market makers to widen put spreads and adjust delta hedging thresholds.

## Institutional Strategies & Systemic Risks

- **Relative Value (RV) Volatility Arbitrage:** Selling expensive equity variance (or selling SPX straddles) while buying cheap Treasury yield variance (payer swaptions or ATM Treasury straddles).
- **Mechanical Deleveraging:** Risk-parity and volatility-targeting strategies calibrate leverage inversely to trailing volatility. When the MOVE spillover finally forces VIX above 20–25, algorithmic mandates trigger automated, price-agnostic liquidations.
- **Negative Convexity Hazards:** If monetary policy uncertainty remains unanchored, relative-value convergence trades face severe losses from VIX futures contango roll decay and negative gamma swaption assignments.

## Risk Monitoring Checklist

| Metric | Target / Threshold | Interpretation |
|---|---|---|
| **MOVE-VIX Ratio** | $> 5.0$ | Severe dislocation; equity volatility complacence ripe for catch-up spike. |
| **25-Delta Risk Reversal** | Steepening negative skew | Institutional hedging acceleration; precedes equity pullbacks by 3–10 sessions. |
| **VIX1D vs. 30-Day VIX** | Backwardation ($\text{VIX1D} > \text{VIX}$) | Acute intraday stress overpowering dealer 0DTE gamma pinning. |
| **Diebold-Yilmaz Surrogates** | TLT/SPY correlation flips positive | Contagion phase where rising yields directly depress equities. |
| **Dealer GEX & Vega Notional** | Negative GEX + high VIX vega | Dealers shift from volatility dampeners to volatility amplifiers. |

## Key Takeaways

- The MOVE index leads the VIX during monetary regime shifts because discount rates reprice instantaneously, while equity multiples lag until cost-of-capital pressures bite.
- 0DTE option volume structurally dampens the 30-day VIX via dealer long gamma hedging, creating an illusion of equity stability.
- Cross-asset spillover is non-linear and directional: rate volatility transmission to equities occurs through growth factor multiple compression and risk-parity deleveraging.
- Traders monitoring the MOVE/VIX ratio above 5.0 should treat equity dips as vulnerable to asymmetric cascade risks rather than routine mean-reversions.

## Related Reading

- [The MOVE-VIX Disconnect: Cross-Asset Volatility Spillover and the Fed's Hawkish Repricing](/articles/move-vix-disconnect-cross-asset-volatility-spillover) — Full interactive article with formulas, dealer gamma dynamics, and factor analysis.
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vRv73Th6EtP9C23uMHj4aiQaJqPXBgi0ULh0SMAz3fFVfIP7bExhF-AlE909CkgVPXZGySI6hwuwLYd/pub) — The unabridged quantitative research study and methodology.
