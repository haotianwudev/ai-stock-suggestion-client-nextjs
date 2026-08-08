---
path: ai-ml/ml-assumptions-quantitative-trading
title: "Why Machine Learning Assumptions Break in Financial Markets"
articleSlug: foundational-assumptions-machine-learning-quantitative-trading
date: 2025-10-31
labels: [AI & Machine Learning, Quantitative Finance]
related: []
---

## Overview

Machine learning applied to quantitative trading faces a fundamentally harder problem than domains like image recognition: financial markets have a low signal-to-noise ratio, non-stationary dynamics, and adversarial behavior (other participants actively react to and exploit discovered patterns). The core statistical assumptions behind many ML algorithms — stationarity, independence, and normality — are systematically violated by financial data, and recognizing these "stylized facts" is the first step toward building models that survive contact with live markets.

## Key Concepts

- **Non-Stationarity** — a time series is stationary if its statistical properties (mean, variance, autocorrelation) stay constant over time. Asset prices almost never are: they follow a random walk (`P_t = P_{t-1} + ε_t`) with a "unit root," meaning shocks have a permanent effect on the price level. Models trained on one regime often fail to generalize to another. The practical fix is modeling returns (`r_t ≈ ln(P_t) - ln(P_{t-1})`) instead of raw prices, since returns are typically much closer to stationary.
- **Volatility Clustering (Heteroskedasticity)** — while returns show little serial correlation, volatility itself is highly persistent: large moves cluster with large moves, small moves with small moves. Formally captured by ARCH-family models, which express variance at time t as a function of past squared error terms.
- **Fat Tails (Leptokurtosis)** — financial returns have kurtosis significantly above the normal distribution's value of 3, meaning extreme events (crashes, rallies) occur far more often than a Gaussian model predicts. Risk systems built on normality assumptions systematically underestimate tail risk.

## Model-Specific Assumptions

- **Tree-based models (Random Forest, Gradient Boosting)** — non-parametric, so they don't assume a specific functional form, but they do implicitly assume the *relationships* between features and target stay stable over time. A structural limitation: a decision tree's prediction is always an average of training-leaf values, so it can never extrapolate beyond the range seen in training data.
- **RNN/LSTM networks** — explicitly designed for sequence data, assuming order matters and past information predicts the future. Their flexibility is a double-edged sword: without very large datasets and careful regularization, they easily memorize noise as if it were signal.

## Comparative Framework

| Model | Handles Non-Stationarity? | Key Strength | Primary Risk |
|---|---|---|---|
| MLP (Feedforward) | No — requires stationary features | Universal function approximator | Ignores time-series dynamics |
| Tree-Based (RF, GBM) | Implicitly — assumes learned rules stay stable | Robust to outliers, strong on tabular data | Cannot extrapolate beyond training range |
| RNN / LSTM | Partially — can model trends but assumes stable dynamics | Explicitly designed for temporal dependencies | Extremely prone to overfitting noise |

## Key Takeaways

- Always test for stationarity (e.g., with an ADF test) before feeding a series into a model, and prefer returns over raw prices when possible.
- Volatility regime features (capturing the ARCH/GARCH-style clustering effect) often add more predictive value than the raw price series itself.
- Fat-tailed return distributions mean risk models calibrated on normal-distribution assumptions will understate the true probability of extreme losses.
- Walk-forward validation and out-of-sample testing are essential precisely because financial relationships are non-stationary — a model that looks good in-sample can fail once the regime shifts.
- Model choice should match the specific violation being addressed: tree models suit cross-sectional factor analysis, while LSTMs are only justified with very large datasets and rigorous validation.

## Related Reading

- [Assumptions of Machine Learning in Quantitative Trading](/articles/foundational-assumptions-machine-learning-quantitative-trading) — full article with the ARCH model framework and model trade-off comparison table.
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vS28MZwzcyJ9CscIpJO6t7WpmWI2NuM0UpQgYFu9jX8w94aP3qBaLXLj8MIcx7bOsGr1D5H8NM8jDoj/pub)
