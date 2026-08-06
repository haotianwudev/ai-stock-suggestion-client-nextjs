# Factor Models in Machine Learning

## Overview
A deep dive into the mathematical bridge between risk management and alpha prediction in algorithmic trading systems. Explores how machine learning transforms traditional static factor models into dynamic prediction engines.

## The Core Dichotomy: Risk vs. Alpha
- **Linear Factor Model (APT Framework):** $R_{i,t} = \alpha_i + \Sigma \beta_{i,k} F_{k,t} + \epsilon_{i,t}$
- **Systematic Risk (Beta):** Variance shared across the market (e.g., Inflation, Sector exposure). Traditional finance aims to minimize the idiosyncratic noise ($\epsilon$).
- **Idiosyncratic Alpha:** Residual returns specific to an asset. Algorithmic trading attempts to *predict* $\epsilon$.
- **The Universe Split Test:** A method to distinguish true alpha from disguised risk factors by checking correlations across non-overlapping portfolios.

## The ML Renaissance: Conditional Factors
While classic models (like Fama-French) assume constant factor loadings ($\beta$), ML introduces Conditional Factor Models where $\beta$ adapts to market regimes.
- **Autoencoders (PCA 2.0):** Neural networks used for non-linear dimensionality reduction, extracting clean structural drivers from noisy data.
- **Transformers:** Leverage self-attention mechanisms to solve the long-memory problem and identify relevant past market regimes for current predictions.
- **Regularization (Lasso):** Uses L1 Regularization to combat data mining bias by zeroing out useless predictors within the "Factor Zoo."

## Data Typology & Engineering
- **Point-in-Time (PIT) Cruciality:** Data must reflect exactly what was known at the time of prediction to prevent look-ahead bias.
- **The Factor Zoo:** Navigating the 400+ academically identified factors (Fundamental, Technical, Alternative, Sentiment) requires strict statistical thresholds (e.g., t-stat > 3.0).
- **Engineering Best Practices:** Include cross-sectional Normalization (Z-scores), Winsorization (capping extreme outliers), and appropriate Lag Alignment.

## Orthogonalization: Cleaning the Signal
Preventing the "Multicollinearity Trap" where an alpha model is just beta in disguise.
- **Residualization (Gram-Schmidt):** Regressing raw signals against known risk factors to extract true, unexplained alpha.
- **Feature Importance (SHAP Values):** Used in ML models to interpret the percentage of prediction driven by market beta vs. true alpha signals.
- **Workflow:** Identify known factors -> Regress signal -> Validate independence -> Backtest.

## Portfolio Construction
Translating predictions into executable trades using Mean-Variance Optimization.
- **Objective Function:** Maximize risk-adjusted returns while penalizing covariance risk and transaction costs.
- **Constraints:** Leverage limits, dollar neutrality, factor neutrality, position caps, and turnover limits.
- **Transaction Costs:** Accounts for linear costs (spread/commission), non-linear costs (market impact), and opportunity costs (slippage).
- **The Sharpe Ratio Ceiling:** Governed by the Fundamental Law of Active Management ($Sharpe \approx IC \times \sqrt{Breadth}$). Reaching high Sharpe ratios requires massive breadth, extraordinary skill, or high-frequency execution.
