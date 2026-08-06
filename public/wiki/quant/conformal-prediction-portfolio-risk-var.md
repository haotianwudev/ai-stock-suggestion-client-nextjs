# Conformal Prediction for Portfolio Risk: Beyond VaR

## Overview
A distribution-free, mathematically rigorous alternative to standard Value at Risk (VaR) models. This article covers conformal prediction mechanics, Conformal Risk Control (CRC), and Regime-Weighted Conformal (RWC) for adaptive capital allocation. Based on Marc Schmitt's research on "Taming Tail Risk in Financial Markets".

## The Failure of Traditional VaR
- **Distributional Assumptions:** Assumes normal distributions, underestimating tail risks.
- **Stationarity Assumption:** Assumes the future resembles the past, which breaks during regime changes.
- **Model Risk:** Parametric models (GARCH, EVT) rely heavily on precise parameter specification.

## Conformal Prediction Fundamentals
Conformal prediction guarantees finite-sample validity without assuming a specific distribution. 
- It uses a calibration set to compute "nonconformity scores" (how unusual an observation is).
- It calculates the `(1 - α)` quantile of these scores to construct valid prediction intervals under the exchangeability assumption.

## Conformal Risk Control (CRC)
CRC extends conformal prediction to bound the expected loss rather than just interval coverage.
- Uses online learning to adjust prediction intervals dynamically in real-time.
- Ensures finite-sample validity for any sample size, unlike asymptotic models.

## Regime-Weighted Conformal (RWC)
Standard conformal prediction assumes stationarity (exchangeability), which fails during market regime shifts.
- RWC assigns time-varying weights (e.g., via exponential decay or volatility-based metrics) to historical data.
- It identifies regimes (using VIX or HMMs) and weighs recent or similar-regime data heavier when computing the quantile of nonconformity scores.

## Building an Adaptive Capital Allocation System
1. **Data Preparation:** Gather returns and regime indicators.
2. **Base Model Selection:** Choose a base model (even naive models work because the conformal layer corrects misspecification).
3. **Nonconformity Score Design:** Absolute or normalized residuals.
4. **Regime Weighting:** Implement decay parameters.
5. **Risk Control Integration:** Define loss function and target risk level `α`.
6. **Capital Allocation:** Use conformal VaR for dynamic stop-losses and leverage scaling.

## Advantages & Limitations
- **Advantages:** Distribution-free, valid for finite samples, adapts to regimes automatically, model-agnostic, and optimizes true expected loss (CRC).
- **Limitations:** Still requires some intra-regime stationarity, needs large calibration sets for extreme tail estimation (e.g., 99% VaR), is highly dependent on accurate regime detection, and can be computationally expensive for high-frequency updates.
