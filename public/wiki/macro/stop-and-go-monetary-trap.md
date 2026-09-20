---
path: macro/stop-and-go-monetary-trap
title: Stop-and-Go Monetary Trap (Sep 2026)
articleSlug: stop-and-go-monetary-trap-bear-flattening
date: 2026-09-19
labels: ["Macro Views", "Quantitative Finance"]
related: []
---

## Overview

The stop-and-go monetary trap occurs when a central bank prematurely halts its rate-hiking campaign to protect economic growth, only to face persistent supply-driven inflation that forces an abrupt, credibility-saving re-tightening. 

On September 16, 2026, the Federal Open Market Committee (FOMC) surprised markets by delivering a 25-basis-point interest rate hike to 3.75%–4.00%. Driven by sticky 3.4% YoY headline CPI and 10-year TIPS breakevens unanchoring past 2.38%, the Fed shifted away from a balanced-approach reaction function toward aggressive inflation suppression. This policy reversal ignited an acute **bear flattening** regime across the US Treasury yield curve and triggered cascading cross-asset liquidations.

## Key Concepts

- **Stop-and-Go Monetary Trap** — A regime where a central bank alternates between premature pauses to cushion growth and abrupt tightening when inflation resurges, ultimately unmooring long-term inflation expectations.
- **Taylor Principle** — A macroeconomic stability requirement mandating that the central bank increase nominal interest rates more than one-for-one with rising inflation ($\frac{\partial i}{\partial \pi} > 1$) to raise real rates.
- **Nelson-Siegel-Svensson (NSS)** — A six-parameter parametric term structure model fitting the continuous yield curve across maturities with level, slope, and dual curvature components.
- **AFNS (Arbitrage-Free Dynamic Nelson-Siegel)** — A dynamic yield curve model that enforces no-arbitrage restrictions, separating long yields into expected short-rate trajectories and term premia.
- **Bear Flattener** — A yield curve shift where short-term interest rates surge faster than long-term rates in response to central bank tightening, narrowing the term spread or inverting the curve.
- **Negative Convexity** — An asymmetric price-yield dynamic where duration extends as yields rise and shortens as yields fall, characteristic of Agency Mortgage-Backed Securities (MBS).
- **Value-at-Risk (VaR)** — A statistical measure of the maximum expected loss over a specific time horizon at a given confidence level.
- **DCC-GARCH** — Dynamic Conditional Correlation multivariate GARCH model used to estimate time-varying asset volatility and cross-asset correlations.

## Macro Foundations & The Taylor Principle

### Demand-Driven vs. Supply-Driven Inflation

- **Demand-Driven Inflation:** Output and prices move in the same direction. The output gap widens while inflation rises. Under a standard Taylor rule, aggressive rate hikes efficiently cool aggregate demand and stabilize prices without disproportionate collateral damage.
- **Supply-Driven Inflation:** Output and prices move in opposite directions (e.g. commodity shocks, shipping disruptions, rigid domestic services). Tightening monetary policy into a negative supply shock crushes aggregate demand further, transforming an orderly slowdown into a severe stagflationary contraction.

### The 1970s Precedent vs. 2026 Structural Realities

- **1970s Precedent:** The Federal Reserve under Arthur Burns suffered from structural breaks in its monetary reaction function, repeatedly halting rate hikes before inflation was eradicated. This stop-and-go cycle permanently de-anchored long-term inflation expectations until Paul Volcker instituted extreme terminal rates.
- **2026 Structural Realities:** Modern markets are far more fragile than in the 1970s due to high financialization, record US fiscal deficits, and the ubiquity of algorithmic volatility-targeting strategies (such as Risk Parity and CTA momentum funds).

## Yield Curve Modeling: NSS & AFNS

### Nelson-Siegel-Svensson (NSS) Architecture

The NSS model quantifies structural term structure shifts via the continuous maturity yield function:

$$
y(\tau) = \beta_0 + \beta_1 \left[\frac{1 - e^{-\tau/\lambda_1}}{\tau/\lambda_1}\right] + \beta_2 \left[\frac{1 - e^{-\tau/\lambda_1}}{\tau/\lambda_1} - e^{-\tau/\lambda_1}\right] + \beta_3 \left[\frac{1 - e^{-\tau/\lambda_2}}{\tau/\lambda_2} - e^{-\tau/\lambda_2}\right]
$$

- $\beta_0$ (Level): Asymptotic long-term rate, determined by equilibrium real rates ($r^*$) and long-run inflation expectations.
- $\beta_1$ (Slope): Short-to-long yield spread, highly sensitive to policy rate changes and near-term forward guidance.
- $\beta_2$ (Curvature 1): Medium-term hump or trough around business-cycle tightening expectations.
- $\beta_3$ (Curvature 2): Second structural curvature component, fitting protracted stagflationary pricing transitions.
- $\lambda_1, \lambda_2$ (Decay parameters): Determine the maturities where the first and second curvature humps reach their mathematical maximums.

### AFNS & Term Premium Decomposition

Under the risk-neutral measure $\mathbb{Q}$, the AFNS state vector evolves according to:

$$
dX_t = K^{\mathbb{Q}} (\theta^{\mathbb{Q}} - X_t)dt + \Sigma dW_t^{\mathbb{Q}}
$$

The 10-year Treasury yield decomposes into expected future monetary policy rates plus the term premium:

$$
y_{10\text{Y}} = \frac{1}{120} \sum_{i=1}^{120} \mathbb{E}_t[r_{t+i}] + \text{TP}_{10\text{Y}}
$$

### Yield Curve Shift Taxonomy

| Regime | Short Rates | Long Rates | Dominant Catalyst |
|---|---|---|---|
| **Bull Steepener** | Falling rapidly | Falling slowly | Imminent rate cuts; severe recession pricing |
| **Bear Steepener** | Rising slowly | Rising rapidly | Reflation, fiscal deficit expansion, rising term premium |
| **Bull Flattener** | Falling slowly | Falling rapidly | Long-term growth pessimism, flight to quality |
| **Bear Flattener** *(2026 Regime)* | Rising rapidly | Rising slowly | Central bank surprise tightening; curve inverts |

## The MBS Negative Convexity Trap

Unlike conventional Treasury bonds with positive convexity, Agency Mortgage-Backed Securities (MBS) feature **negative convexity** resulting from homeowner prepayment options.

### Taylor Series Price Sensitivity

$$
\frac{\Delta P}{P} \approx -D_{\text{mod}}(\Delta y) + \frac{1}{2} C (\Delta y)^2
$$

When convexity $C < 0$, the second-order term exacerbates price drops during rate spikes rather than cushioning them.

### The Mechanical MBS Duration Spiral

1. **Policy Shock:** The FOMC executes an unexpected 25 bps rate hike.
2. **Yields Rise:** Short-end yields spike, transmitting upward pressure to 10-year yields via the expectations hypothesis.
3. **Refinancing Cliff:** Mortgage rates surge past refinancing thresholds; Constant Prepayment Rates (CPR) collapse.
4. **Duration Extension:** MBS cash flows shift into the distant future, mechanically extending effective portfolio duration.
5. **Forced Hedging:** Fixed income managers must sell 10-year Treasuries and enter pay-fixed interest rate swaps to offset unwanted duration.
6. **Self-Reinforcing Feedback:** Concentrated hedging sales push benchmark yields even higher, further slowing prepayments and extending MBS duration.

## VaR Shocks & Cross-Asset Spillovers

### DCC-GARCH Covariance Evolution

$$
Q_t = (1 - \alpha - \beta)\bar{Q} + \alpha(z_{t-1} z_{t-1}^T) + \beta Q_{t-1}
$$

### Cross-Asset Liquidation Cascades

1. **VaR Limit Breaches:** The simultaneous surge in interest rate volatility and the breakdown of negative equity-bond correlations causes calculated portfolio Value-at-Risk to spike vertically.
2. **Mechanical De-grossing:** Leveraged risk-parity funds, trend followers, and multi-asset volatility-controlled mandates are forced to liquidate Treasury and equity futures contracts simultaneously.
3. **Credit & Valuation Contagion:** Dealer liquidity evaporates, widening Credit Default Swap (CDS) spreads and raising the Weighted Average Cost of Capital (WACC), driving severe equity multiple contraction.

## Key Takeaways

- **The Danger of Premature Pausing:** Tolerating sticky supply-driven inflation leaves central banks vulnerable to credibility crises, forcing abrupt catch-up rate hikes that invert yield curves.
- **Bear Flattening Dominance:** Surging short-term rates flatten and invert the term structure, creating severe headwinds for financial intermediaries and duration-sensitive strategies.
- **Negative Convexity as a Systemic Accelerant:** The multi-trillion-dollar Agency MBS market mechanically amplifies rate moves through unhedged duration extension.
- **Diversification Breakdown:** When inflation volatility forces stocks and bonds to correlate positively, traditional multi-asset hedges fail, transforming an interest rate adjustment into a systemic cross-asset liquidity crunch.

## Related Reading

- [The Stop-and-Go Monetary Trap: Modeling the Fed's 2026 Re-Tightening and Bear Flattening Dynamics](/articles/stop-and-go-monetary-trap-bear-flattening)
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vTZk2bWIgZFMCUL9jFJABIkyU752t9zNl9IIIa7Cnq4yghCVAUgpMPMhgeAeMqCeRpVQ-ikpq-jA-F2/pub)
