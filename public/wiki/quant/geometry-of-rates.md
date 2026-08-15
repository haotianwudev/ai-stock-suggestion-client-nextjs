---
path: quant/geometry-of-rates
title: The Geometry of Rates
articleSlug: geometry-of-rates-pca-fixed-income-markets
date: 2026-01-06
labels: ["QUANT"]
related: []
---

## Overview
Fixed income markets suffer from the "curse of dimensionality," where a portfolio manager is exposed to a continuous curve of highly correlated rates (e.g., from overnight to 30+ years). Principal Component Analysis (PCA) maps these correlated rates into orthogonal (independent) factors, reducing the complexity of the yield curve into just a few principal components for superior risk management and alpha generation.

## The Mathematical Engine
PCA uses the Spectral Theorem to decompose the covariance matrix (S) of historical yield changes: `S = V Λ V^T`
- **Covariance Matrix (S):** Represents the risk magnitude.
- **Eigenvectors (V):** Represent the "shape" of the yield curve movement (the loadings).
- **Eigenvalues (Λ):** Represent the "power" or variance explained by each move.

*Note: PCA should be run on differenced data (yield changes), not on raw non-stationary yield levels.*

## The Big Three Factors
Empirically, 98% of yield curve variance can be explained by just three independent movements:
1. **PC1 (Level):** ~90% Variance. Represents a roughly parallel shift in the curve. Driven by inflation expectations and central bank rate targets.
2. **PC2 (Slope):** ~8% Variance. Represents steepening or flattening. Correlates heavily with the business cycle (e.g., recessions lead to inverted curves).
3. **PC3 (Curvature):** ~2% Variance. Represents convexity or "butterfly" moves. Driven by volatility and supply/demand segmentation.

## Advanced Hedging: Vector Hedging vs. Duration
Traditional duration (DV01) assumes parallel shifts, leaving portfolios massively exposed to Slope and Curvature risks. By using PCA weights to create a "Full Vector Hedge," a manager can neutralize Level, Slope, and Curvature simultaneously by taking positions in three different tenors (e.g., 2Y, 5Y, 30Y).

## Alpha Strategy: The PCA Butterfly
A "Butterfly" trade isolates pure Relative Value by buying the "Body" (e.g., 5Y) and selling the "Wings" (e.g., 2Y and 10Y), weighted perfectly via PCA to neutralize PC1 and PC2.
- Regress the bond yield on PC1, PC2, and PC3 to find the "Model Yield".
- Compare to the "Market Yield" to calculate the residual.
- If the residual exceeds a threshold (e.g., > 1.75σ), trade the mean reversion.

## Risks & Regime Change
PCA is a statistical description of history, not a physical law. During major regime changes (like the 2022 Inflation Shock), historical correlations can break down entirely. Models must use rolling windows (e.g., a 1-year lookback) to adapt to changing regimes.

## Related Reading

- [The Geometry of Rates: Principal Component Analysis in Modern Fixed Income Markets](/articles/geometry-of-rates-pca-fixed-income-markets)
- [Watch on YouTube](https://youtu.be/WL_YzTImNzs)
