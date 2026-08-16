---
path: macro/calculate-investment-clock
title: Calculating the Investment Clock
articleSlug: quantitative-guide-calculate-investment-clock
date: 2026-04-20T00:00:00Z
labels: ["MACRO", "QUANT"]
related: ["macro/investment-clock-framework"]
---

## Overview

The Merrill Lynch Investment Clock maps macroeconomic cycles into a two-dimensional continuous phase plane defined by **Growth** and **Inflation** momentum relative to trend. 

This guide details the mathematical formulas, FRED data pipeline, Exponential Moving Average (EMA) rolling Z-score normalization, and phase-angle calculations used in SOPHIE's real-time engine.

---

## 1. FRED Data Pipeline & Indicator Weightings

Ten underlying indicators from the St. Louis Federal Reserve (FRED) feed the dual composite indices:

### Growth Composite ($Z_{\text{growth}}$)
| Indicator | FRED Code | Transformation | Composite Weight | Signal Direction |
| :--- | :--- | :--- | :--- | :--- |
| **OECD Composite Leading Indicator** | `USALORSGPNOSTSAM` | Level | **50%** | $+1$ (Expansionary) |
| **Industrial Production Index** | `INDPRO` | YoY % Change | **20%** | $+1$ (Coincident Output) |
| **Initial Jobless Claims** | `ICSA` | YoY % Change (4wk avg) | **15%** | $-1$ (Inverted Labor) |
| **Civilian Unemployment Rate** | `UNRATE` | 12M Change (pp) | **15%** | $-1$ (Inverted Labor) |

### Inflation Composite ($Z_{\text{inflation}}$)
| Indicator | FRED Code | Transformation | Composite Weight | Signal Direction |
| :--- | :--- | :--- | :--- | :--- |
| **5-Year Breakeven Inflation Rate** | `T5YIE` | Level (%) vs 2.0% | **30%** | $+1$ (Market Expectations) |
| **Core Consumer Price Index (CPI)** | `CPILFESL` | YoY % Change vs 2.0% | **25%** | $+1$ (Lagging Trend) |
| **Producer Price Index (PPI Final Demand)** | `PPIFIS` | YoY % Change vs 2.0% | **20%** | $+1$ (Leading Pipeline) |
| **Core CPI (Short-Term)** | `CPILFESL` | MoM Annualized vs 2.0% | **15%** | $+1$ (Real-Time Inflection) |
| **Total Capacity Utilization** | `TCU` | Level (%) vs 80.0% | **10%** | $+1$ (Demand Pressure) |

---

## 2. Exponential Rolling Z-Score Normalization

To eliminate lookahead bias while adapting quickly to regime shifts, each raw indicator $x_t$ is normalized using an **Exponential Weighted Moving Average (EWMA)** with a 24-month span ($\alpha = \frac{2}{\text{span} + 1} = \frac{2}{25} = 0.08$):

$$\mu_t = \alpha x_t + (1 - \alpha) \mu_{t-1}$$

$$\sigma_t^2 = \alpha (x_t - \mu_t)^2 + (1 - \alpha) \sigma_{t-1}^2$$

$$z_{i,t} = \frac{x_{i,t} - \mu_{i,t}}{\sigma_{i,t}}$$

The aggregate composite score for each dimension is the weighted sum:

$$Z_{\text{growth},t} = \sum_{i \in \text{Growth}} w_i \cdot z_{i,t}$$

$$Z_{\text{inflation},t} = \sum_{j \in \text{Inflation}} w_j \cdot z_{j,t}$$

---

## 3. Phase Angle & Quadrant Classification

The economy's exact position on the clock face is computed via the four-quadrant arctangent in degrees:

$$\theta_t = \operatorname{atan2}(Z_{\text{inflation},t}, Z_{\text{growth},t}) \times \frac{180}{\pi}$$

Normalizing $\theta \in [0^\circ, 360^\circ)$ mapped clockwise where 12:00 corresponds to peak inflation ($\theta = 90^\circ$):

- **Phase I: Reflation (6:00 to 9:00, Bottom-Left)**: $Z_{\text{growth}} < 0 \land Z_{\text{inflation}} < 0 \implies \textbf{Optimal Asset: Government Bonds}$
- **Phase II: Recovery (9:00 to 12:00, Top-Left)**: $Z_{\text{growth}} \ge 0 \land Z_{\text{inflation}} < 0 \implies \textbf{Optimal Asset: Equities}$
- **Phase III: Overheat (12:00 to 3:00, Top-Right)**: $Z_{\text{growth}} \ge 0 \land Z_{\text{inflation}} \ge 0 \implies \textbf{Optimal Asset: Commodities}$
- **Phase IV: Stagflation (3:00 to 6:00, Bottom-Right)**: $Z_{\text{growth}} < 0 \land Z_{\text{inflation}} \ge 0 \implies \textbf{Optimal Asset: Cash / T-Bills}$

---

## 4. Hysteresis Filtering (Noise Reduction)

To avoid whipsaw regime flips during cyclical consolidation, a **$0.20\,\sigma$ Hysteresis Threshold** is enforced:

A phase shift is only confirmed when the composite coordinate crosses the quadrant boundary by at least $\Delta Z \ge 0.20$.

---

## Related Resources

- [Live Merrill Lynch Investment Clock Tracker](/investment-clock)
- [Article: A Quantitative Guide to Calculate The Investment Clock](/articles/quantitative-guide-calculate-investment-clock)
- [Wiki: The Investment Clock Framework](/wiki/macro/investment-clock-framework)
- [Watch on YouTube](https://youtu.be/Zzi1cuaPs7M)
