---
path: option-strategy/options-viewer-methodology
title: Options Viewer Calculation & Methodology Guide
articleSlug: ""
date: 2026-08-21
labels: ["Quantitative Finance", "Options Trading"]
related: ["option-strategy/gex-methodology", "option-strategy/vol-regime-methodology", "option-strategy/volatility-surface", "option-strategy/volume-open-interest-analysis"]
---

## Overview

This page serves as the complete mathematical specification, calculation dictionary, and architectural guide for **SOPHIE's Options Viewer** (`/option/viewer`). It details every methodology, quantitative formula, indicator definition, and data convention used across the three primary sub-tools:

1. **Options Chain & Volatility** (Matrix, Volatility Surface, Positioning, Gamma Exposure / GEX)
2. **SPX Payoff Builder** (Multi-leg payoff modeling, T+0 Black-Scholes mark-to-market, Net Greeks, Risk-Neutral Probability of Profit, and Skew-Adjusted ranges)
3. **Volatility Regime & VRP Research** (Variance Risk Premium decomposition, 4-regime taxonomy, timing power analysis, and transition risk matrices)

All index calculations assume standard **S&P 500 Index Options (^SPX)** conventions: **European-style exercise** (no early assignment), **cash settlement** against the special opening/closing quotation, and a **$100 contract multiplier** ($100 per index point).

---

## 1. Top Banner & Institutional HUD Metrics

Located in `OptionsMetricsBar` and `OptionsViewer`, these key performance indicators summarize overall market conditions and expiration-specific dynamics.

### 1.1 At-the-Money Implied Volatility (ATM IV)
The implied volatility of the contract closest to the spot price:
$$
\text{Strike}_{\text{ATM}} = \arg\min_K |K - S|
$$
$$
\text{ATM IV} = \text{IV}(\text{Strike}_{\text{ATM}})
$$
If both Call and Put IVs are quoted at the ATM strike, the mid-market average is reported.

### 1.2 Expected Move
The expected price dispersion of the underlying by expiration. Two computational methods are supported:

- **Primary Formula (ATM Straddle Implied Range):**
  Uses the standard market-maker rule-of-thumb pricing:
  $$
  \text{Expected Move}_{\$} = \left(C_{\text{ATM, Mid}} + P_{\text{ATM, Mid}}\right) \times 0.85
  $$
  $$
  \text{Expected Move}_{\%} = \left(\frac{\text{Expected Move}_{\$}}{S}\right) \times 100
  $$
- **Secondary Fallback Formula (Black-Scholes $1\sigma$ Dispersion):**
  Used if single-leg straddle quotes are missing:
  $$
  \text{Expected Move}_{\$} = S \times \text{ATM IV} \times \sqrt{T}
  $$
  where $T = \frac{\text{DTE}}{365}$.

### 1.3 Max Pain Strike
The strike price at which option buyers collectively experience the maximum loss, and option sellers (market makers) pay out the minimum cumulative capital at expiration:
$$
\text{Max Pain} = \arg\min_K \left[ \sum_{i} \max(0, K - K_{c,i}) \cdot \text{OI}_{c,i} + \sum_{j} \max(0, K_{p,j} - K) \cdot \text{OI}_{p,j} \right]
$$
*Note: If open interest data is unavailable (such as in EOD snapshots lacking OI fields), Max Pain is suppressed to prevent arbitrary zero-tied strike outputs.*

### 1.4 Put/Call Ratios
- **Volume Put/Call Ratio:**
  $$
  \text{PCR}_{\text{Volume}} = \frac{\sum \text{Put Volume}}{\sum \text{Call Volume}}
  $$
  Measures intraday flow sentiment ($\text{PCR} > 1.0 \implies \text{Put heavy / Bearish flow}$; $\text{PCR} < 1.0 \implies \text{Call heavy / Bullish flow}$).
- **Open Interest Put/Call Ratio:**
  $$
  \text{PCR}_{\text{OI}} = \frac{\sum \text{Put Open Interest}}{\sum \text{Call Open Interest}}
  $$
  Measures cumulative structural positioning.

### 1.5 Expiration Cycle Classification & Liquidity Ranking
SPX lists ~55 expirations (dailies, weeklies, monthlies, quarterlies, LEAPS). To keep the interface intuitive without sacrificing liquidity, the viewer implements an algorithmic cycle selector:

- **Key Expirations Filter:**
  1. *Near-Term Dailies:* All cycles with $\text{DTE} \le 2$ (0DTE and 1DTE trade heavily).
  2. *Friday Weeklies:* Next 4 non-monthly Friday expiries.
  3. *Standard Monthlies:* Next 4 standard monthlies (the 3rd Friday of the month, days 15–21, carrying the deepest open interest on the board).
  4. *LEAPS Anchors:* The monthly cycle nearest ~365 DTE (1-year horizon).
- **Cycle Liquidity Tiering:**
  Ranks a cycle's open interest share relative to the maximum visible cycle on screen ($\text{Share} = \text{OI}_{\text{exp}} / \text{OI}_{\max}$):
  - **Deep:** $\text{Share} \ge 25\%$ (solid gold pill)
  - **Active:** $5\% \le \text{Share} < 25\%$ (translucent gold pill)
  - **Thin:** $\text{Share} < 5\%$ (gray pill)

---

## 2. Options Matrix Table & Proprietary Liquidity Scoring

Located in `OptionsMatrixTable` and `lib/options/liquidity.ts`, this double-sided chain provides standard pricing, Black-Scholes Greeks, and composite execution quality metrics.

### 2.1 Mid Price & Spread Percentage
$$
\text{Mid Price} = \frac{\text{Bid} + \text{Ask}}{2}
$$
$$
\text{Spread \%} = \frac{\text{Ask} - \text{Bid}}{\text{Mid Price}}
$$

### 2.2 Proprietary Liquidity Score Model
Unlike generic equity models, SOPHIE's liquidity scorer is calibrated specifically to SPX market microstructure, where ATM spreads trade extremely tight ($<0.3\%$) and widen rapidly OTM. 

**Critical Design Principle — Spread Gates the Score:** A contract with large open interest but an unfillable quote (e.g., $0.00 bid / $5.00 ask) is **not** liquid. Therefore, Spread Score acts as a strict multiplier/gate rather than an arithmetic component that can be outvoted by open interest.

1. **Spread Score ($\text{Score}_{\text{spread}}$):**
   $$
   \text{Score}_{\text{spread}} = \begin{cases}
   100 & \text{Spread \%} \le 0.3\% \\
   100 - 30 \times \frac{\text{Spread \%} - 0.003}{0.010 - 0.003} & 0.3\% < \text{Spread \%} \le 1.0\% \\
   70 - 40 \times \frac{\text{Spread \%} - 0.010}{0.030 - 0.010} & 1.0\% < \text{Spread \%} \le 3.0\% \\
   30 - 30 \times \frac{\text{Spread \%} - 0.030}{0.080 - 0.030} & 3.0\% < \text{Spread \%} \le 8.0\% \\
   0 & \text{Spread \%} > 8.0\%
   \end{cases}
   $$
2. **Volume Score ($\text{Score}_{\text{vol}}$):** Log-scaled activity indicator:
   $$
   \text{Score}_{\text{vol}} = \min\left(100, \frac{\log_{10}(\text{Volume} + 1)}{\log_{10}(1001)} \times 100\right)
   $$
3. **Open Interest Score ($\text{Score}_{\text{OI}}$):** Log-scaled resting size indicator:
   $$
   \text{Score}_{\text{OI}} = \min\left(100, \frac{\log_{10}(\text{OI} + 1)}{\log_{10}(5001)} \times 100\right)
   $$
4. **Activity Score:**
   $$
   \text{Score}_{\text{activity}} = 0.65 \times \text{Score}_{\text{vol}} + 0.35 \times \text{Score}_{\text{OI}}
   $$
5. **Composite Liquidity Score (0–100):**
   $$
   \text{Score}_{\text{composite}} = \text{round}\left( \text{Score}_{\text{spread}} \times \left(0.55 + 0.45 \times \frac{\text{Score}_{\text{activity}}}{100}\right) \right)
   $$

#### Liquidity Tiers:
- **Excellent:** $\text{Score} \ge 75$ (Emerald badge)
- **Good:** $50 \le \text{Score} < 75$ (Blue badge)
- **Fair:** $25 \le \text{Score} < 50$ (Amber badge)
- **Poor:** $\text{Score} < 25$ (Rose badge)

---

## 3. Volatility Analytics & Surface

Located in `VolatilityChartView`, this module provides five analytical sub-views decoding implied volatility across strikes and maturities.

### 3.1 IV Smile & Skew Curve
Plots strike $K$ against implied volatility $\sigma(K)$ for the selected cycle, filtered within $\pm 22\%$ of spot to eliminate illiquid far-tail noise.

### 3.2 Volatility Term Structure & Forward Implied Volatility
Plots ATM implied volatility across all expirations ordered by DTE.

- **Term Structure Slope:**
  - **Contango (Normal):** $\sigma_{\text{far}} > \sigma_{\text{near}}$ (upward sloping; calm market).
  - **Backwardation (Inverted):** $\sigma_{\text{near}} > \sigma_{\text{far}}$ (downward sloping; near-term panic / event risk).
- **Forward Implied Volatility ($\sigma_{\text{fwd}}$):**
  Calculates the market-implied forward volatility between two expiration horizons $T_1$ and $T_2$ ($T_2 > T_1$):
  $$
  \sigma_{\text{fwd}}(T_1, T_2) = \sqrt{\frac{T_2 \sigma_2^2 - T_1 \sigma_1^2}{T_2 - T_1}}
  $$

### 3.3 Breeden-Litzenberger Risk-Neutral Density (RND)
Extracts the market's implied probability density function $f(K)$ for the underlying price at expiration directly from call option prices, based on the Breeden & Litzenberger (1978) theorem:
$$
f(K) = e^{rT} \frac{\partial^2 C(K)}{\partial K^2}
$$

#### Non-Uniform Strike Grid Numerical Second Derivative:
Real SPX chains alternate between 5-point, 10-point, and 25-point strike gaps. Using a standard uniform formula $\frac{C_{i+1} - 2C_i + C_{i-1}}{h^2}$ introduces severe error. SOPHIE implements the general **non-uniform 3-point second derivative formula**:
$$
\frac{\partial^2 C}{\partial K^2} \approx \frac{2 \left[ \Delta K_1 \cdot C(K_{i+1}) - (\Delta K_1 + \Delta K_2) \cdot C(K_i) + \Delta K_2 \cdot C(K_{i-1}) \right]}{\Delta K_1 \cdot \Delta K_2 \cdot (\Delta K_1 + \Delta K_2)}
$$
where $\Delta K_1 = K_i - K_{i-1}$ and $\Delta K_2 = K_{i+1} - K_i$.

Densities are floored at zero ($\max(0, \frac{\partial^2 C}{\partial K^2})$) and normalized so $\sum f(K_i) \Delta K_i = 100\%$.

### 3.4 25-Delta Skew & Kurtosis Dynamics
- **25-Delta Risk Reversal (Skew):**
  $$
  \text{RR}_{25\Delta} = \text{IV}(\text{Put}_{25\Delta}) - \text{IV}(\text{Call}_{25\Delta})
  $$
  Positive values indicate put skew (downside protection demand exceeding upside calls).
- **25-Delta Butterfly (Convexity / Kurtosis):**
  $$
  \text{Fly}_{25\Delta} = \left( \frac{\text{IV}(\text{Put}_{25\Delta}) + \text{IV}(\text{Call}_{25\Delta})}{2} \right) - \text{IV}_{\text{ATM}}
  $$
  Measures wing curvature (fat-tail probability) relative to the at-the-money base.

---

## 4. Positioning Analysis (OI, Volume, Max Pain)

Located in `PositioningChartView`, this module analyzes market participant positioning.

### 4.1 Max Pain Cumulative Payout Curve
Simulates the total dollar liability of option sellers across candidate underlying settlement prices $K_{\text{settle}}$:
$$
\text{Payout}(K_{\text{settle}}) = \frac{\sum_c \max(0, K_{\text{settle}} - K_c) \cdot \text{OI}_c \cdot 100 + \sum_p \max(0, K_p - K_{\text{settle}}) \cdot \text{OI}_p \cdot 100}{1{,}000{,}000} \quad (\text{\$ Millions})
$$

### 4.2 Cumulative Open Interest Curve
Plots the running accumulation of Call and Put open interest across the strike spectrum:
$$
\text{CumCallOI}(K) = \sum_{k \le K} \text{OI}_{\text{call}}(k), \quad \text{CumPutOI}(K) = \sum_{k \le K} \text{OI}_{\text{put}}(k)
$$

---

## 5. Gamma Exposure (GEX) & Market Maker Hedging

Located in `GexChartView` and detailed in the [GEX Calculation Methodology](/wiki/option-strategy/gex-methodology) spec.

### 5.1 Dollar Gamma Exposure Formula
$$
\text{GEX}_i = \Gamma_i \times \text{OI}_i \times 100 \times S^2 \times 0.01 / 1{,}000{,}000 \quad (\text{\$M per 1\% move})
$$
- **$S^2$ Scaling:** Converts gamma ($\Delta / \text{point}$) to shares per 1% move ($\times S \times 1\%$), then to notional dollars ($\times S$).
- **Dealer Sign Convention:**
  $$
  \text{Net GEX} = \sum_{\text{calls}} \text{GEX}_c - \sum_{\text{puts}} \text{GEX}_p
  $$

### 5.2 Whole-Book Scope vs. Single Expiration
By default, Net GEX, the Gamma Flip, and Walls aggregate across **all listed expirations** (the complete dealer book), preventing inverted regime readings from isolated front-month expiries.

### 5.3 Gamma Flip Level (Zero Gamma)
The hypothetical spot price $S^*$ where total dealer gamma crosses zero. Evaluated by **re-pricing every contract's Black-Scholes gamma** across candidate spot levels:
$$
\text{Net GEX}(S') = \sum_i \pm \Gamma_i(S', K_i, T_i, \sigma_i) \cdot \text{OI}_i \cdot 100 \cdot (S')^2 \cdot 0.01
$$
Solved via a 1% bracketed sweep followed by 14-step bisection root-finding.

### 5.4 Call Wall & Put Wall
- **Directional Constraint:** $\text{Call Wall} \ge S$, $\text{Put Wall} \le S$.
- **Smoothing:** Evaluated over a $[0.25, 0.50, 0.25]$ kernel across strikes to eliminate single-contract noise.

### 5.5 Higher-Order Greeks (Vanna & Charm Exposure)
- **Vanna Flow:** Sensitivity of dealer delta to implied volatility shifts:
  $$
  \text{Vanna}_{\$} = \pm \frac{\partial \Delta}{\partial \sigma} \times \text{OI} \times 100
  $$
- **Charm Flow:** Sensitivity of dealer delta to time decay:
  $$
  \text{Charm}_{\$} = \pm \frac{\partial \Delta}{\partial t} \times \text{OI} \times 100
  $$

---

## 6. SPX Payoff Builder & Probability Range Analysis

Located in `SpxPayoffBuilder`, `PayoffChartView`, `ProbabilityRangeView`, and `lib/options/analytics.ts`.

### 6.1 Multi-Leg P&L at Expiration ($T=0$)
$$
\text{PnL}(S_T) = \sum_{i=1}^N \text{Quantity}_i \times \text{Sign}_i \times \left[ \text{IntrinsicValue}(S_T, K_i, \text{Type}_i) - \text{Premium}_i \right] \times 100
$$
where $\text{Sign}_i = +1$ for Long and $-1$ for Short.

### 6.2 "T+0" Mark-to-Market Curve
Plots current position value across hypothetical spot prices today ($T > 0$):
1. **Implied Volatility Solving:** Each leg's entry premium is solved for its exact Black-Scholes implied volatility $\sigma_i$ via bisection on mid price.
2. **Current Value:**
   $$
   \text{Value Today}(S') = \sum_{i=1}^N \text{Quantity}_i \times \text{Sign}_i \times \left[ C_{\text{BS}}(S', K_i, T, r, q, \sigma_i) - \text{Premium}_i \right] \times 100
   $$

### 6.3 Net Position Greeks
Aggregates Greeks across all legs, signed by position direction and scaled by quantity $\times 100$:
$$
\text{Net Delta} = \sum \pm Q_i \cdot 100 \cdot \Delta_i, \quad \text{Net Gamma} = \sum \pm Q_i \cdot 100 \cdot \Gamma_i
$$
$$
\text{Net Theta} = \sum \pm Q_i \cdot 100 \cdot \Theta_i, \quad \text{Net Vega} = \sum \pm Q_i \cdot 100 \cdot \mathcal{V}_i
$$

### 6.4 Risk-Neutral Probability of Profit (POP)
Evaluates the probability that the multi-leg position finishes with $\text{PnL} > 0$ at expiration under risk-neutral lognormal drift $\mu = r - q - \frac{\sigma^2}{2}$:

1. Identifies all breakeven zero-crossing strikes $B_1, B_2, \dots, B_m$.
2. Partitions the price domain into intervals $[0, B_1], [B_1, B_2], \dots, [B_m, \infty)$.
3. For each profitable interval $[L_k, U_k]$, integrates the lognormal CDF:
   $$
   P(L_k < S_T < U_k) = \Phi\left( \frac{\ln(S/L_k) + (r - q - \sigma^2/2)T}{\sigma\sqrt{T}} \right) - \Phi\left( \frac{\ln(S/U_k) + (r - q - \sigma^2/2)T}{\sigma\sqrt{T}} \right)
   $$
4. $\text{POP} = \sum_{k \in \text{Profitable}} P(L_k < S_T < U_k)$.

### 6.5 Implied Price Ranges (Confidence Intervals)
- **Flat ATM Model (Symmetric):**
  $$
  \text{Boundary}_{\text{lower/upper}} = S \cdot \exp\left( \left(r - q - \frac{\sigma_{\text{ATM}}^2}{2}\right)T \pm \sigma_{\text{ATM}}\sqrt{T} \cdot z_{(1+c)/2} \right)
  $$
  For $68\%$ ($1\sigma$), $z = 1.000$; for $80\%$ ($1.28\sigma$), $z = 1.28155$.
- **Skew-Adjusted (Asymmetric) Model:**
  Reprices each boundary using the actual market implied volatility of the nearest strike to that boundary, iterated to fixed-point convergence:
  $$
  \text{Upper}^{(n+1)} = \text{Boundary}\left(S, T, r, q, \sigma(\text{Upper}^{(n)}), +z\right)
  $$
  $$
  \text{Lower}^{(n+1)} = \text{Boundary}\left(S, T, r, q, \sigma(\text{Lower}^{(n)}), -z\right)
  $$
  Produces wider downside and tighter upside boundaries consistent with real index skew.

---

## 7. Volatility Regime & VRP Research

Located in `VolRegimePanel`, `VrpTimingView`, `RegimeTransitionView`, and detailed in the [Volatility Regime & VRP Methodology](/wiki/option-strategy/vol-regime-methodology) spec.

### 7.1 Daily Core Signals
- **20-Day Realized Volatility ($\text{RV}_{20}$):**
  $$
  \text{RV}_{20} = \text{stdev}\left(\ln \frac{S_t}{S_{t-1}}, 20\right) \times \sqrt{252} \times 100
  $$
- **Variance Risk Premium (Vol Points):**
  $$
  \text{VRP}_{\text{vol}} = \text{VIX} - \text{RV}_{20}
  $$
- **Variance Risk Premium (Variance Points / Swap Units):**
  $$
  \text{VRP}_{\text{var}} = \frac{\text{VIX}^2 - \text{RV}_{20}^2}{100}
  $$
- **Downside Variance Share (Semivariance):**
  $$
  \text{Downside Share} = \frac{\sum_{r_t < 0} r_t^2}{\sum r_t^2}
  $$

### 7.2 The 4-Regime Quadrant Taxonomy
Classifies market state across two orthogonal axes: **Premium Richness** ($\text{vrp\_z} > 0$) and **Market Stress** ($\text{vix\_rank} > 0.80$ or $\text{VIX3M} < \text{VIX}$):

| Regime | Condition | Description |
|---|---|---|
| **Harvest** | Rich Premium, Calm Tape | Implied vol exceeds realized; optimal premium-selling environment. |
| **Stressed Premium** | Rich Premium, Stressed Tape | High premium compensation, but elevated gap/tail risk. Size down. |
| **Thin** | Thin Premium, Calm Tape | Implied barely exceeds realized; low compensation for gap risk. |
| **Crisis** | Thin Premium, Stressed Tape | Realized vol exceeds implied; premium selling is uncompensated. |

### 7.3 Predictive Timing vs. Risk Signals
- **Entry-Timing Power:** Testing $\text{vrp\_z}$ quintiles against forward 21-day realized premium yields a Spearman rank correlation of **$\text{IC} \approx 0.008$** (effectively zero). VRP level does **not** reliably time entries.
- **Risk Management Power:** The regime label strongly predicts transition into Crisis:
  - $P(\text{Crisis in 21d} \mid \text{Harvest}) = \mathbf{5.7\%}$
  - $P(\text{Crisis in 21d} \mid \text{Stressed Premium}) = \mathbf{26.7\%}$ (approx. $5\times$ higher risk).

---

## 8. Summary Formula Reference Table

| Metric / Tool | Mathematical Definition / Formula | Location in Code |
|---|---|---|
| **Expected Move (Straddle)** | $(C_{\text{ATM, Mid}} + P_{\text{ATM, Mid}}) \times 0.85$ | `components/options/options-viewer.tsx` |
| **Expected Move (BS)** | $S \times \text{IV}_{\text{ATM}} \times \sqrt{T}$ | `components/options/options-viewer.tsx` |
| **Max Pain Strike** | $\arg\min_K \sum \text{BuyerLoss}(K)$ | `components/options/options-viewer.tsx` |
| **Spread %** | $(\text{Ask} - \text{Bid}) / \text{Mid}$ | `lib/options/liquidity.ts` |
| **Liquidity Score** | $\text{round}\left(\text{SpreadScore} \times (0.55 + 0.45 \cdot \text{ActivityScore}/100)\right)$ | `lib/options/liquidity.ts` |
| **Forward Implied Vol** | $\sqrt{(T_2 \sigma_2^2 - T_1 \sigma_1^2)/(T_2 - T_1)}$ | `components/options/viewer/volatility-chart-view.tsx` |
| **Breeden-Litzenberger RND** | Non-uniform 3-point second derivative $f(K) \propto \frac{\partial^2 C}{\partial K^2}$ | `components/options/viewer/volatility-chart-view.tsx` |
| **25Δ Risk Reversal** | $\text{IV}(\text{Put}_{25\Delta}) - \text{IV}(\text{Call}_{25\Delta})$ | `components/options/viewer/volatility-chart-view.tsx` |
| **25Δ Butterfly** | $\frac{\text{IV}(\text{Put}_{25\Delta}) + \text{IV}(\text{Call}_{25\Delta})}{2} - \text{IV}_{\text{ATM}}$ | `components/options/viewer/volatility-chart-view.tsx` |
| **Dollar GEX** | $\Gamma \times \text{OI} \times 100 \times S^2 \times 0.01 / 10^6$ | `components/options/viewer/gex-chart-view.tsx` |
| **Gamma Flip Level** | Root-find $S^*$ where $\text{Net GEX}(S^*) = 0$ via Black-Scholes gamma re-pricing | `components/options/viewer/gex-chart-view.tsx` |
| **Call / Put Walls** | Directionally constrained ($\ge S$ / $\le S$) smoothed $[0.25, 0.5, 0.25]$ peak gamma | `components/options/viewer/gex-chart-view.tsx` |
| **T+0 Position Value** | $\sum \pm Q_i \cdot 100 \cdot (C_{\text{BS}}(S', K_i, T, \sigma_i) - \text{Premium}_i)$ | `lib/options/analytics.ts` |
| **Probability of Profit (POP)**| Interval lognormal risk-neutral CDF integration $\sum \Delta \Phi(d_2)$ | `lib/options/analytics.ts` |
| **Skew-Adjusted Range** | Fixed-point iteration $S \exp\left((r - q - \sigma(K)^2/2)T \pm \sigma(K)\sqrt{T} z\right)$ | `lib/options/analytics.ts` |
| **Variance Risk Premium** | $\text{VIX} - \text{RV}_{20}$ (vol pts); $(\text{VIX}^2 - \text{RV}_{20}^2)/100$ (var pts) | `components/options/viewer/vol-regime-panel.tsx` |

---

## Related Wiki Specs & Documentation

- [GEX Calculation Methodology](/wiki/option-strategy/gex-methodology) — Comprehensive gamma exposure, flip root-finding, and smoothing spec
- [Volatility Regime & VRP Methodology](/wiki/option-strategy/vol-regime-methodology) — Complete Variance Risk Premium decomposition & transition risk spec
- [The Volatility Surface](/wiki/option-strategy/volatility-surface) — Morphologies of skew, smirk, and term structure
- [Volume & Open Interest Analysis](/wiki/option-strategy/volume-open-interest-analysis) — Flow, positioning, and Put/Call dynamics
- [Option Greeks Overview](/wiki/option-strategy/option-greeks-overview) — Delta, Gamma, Theta, Vega, Rho, Vanna, and Charm
