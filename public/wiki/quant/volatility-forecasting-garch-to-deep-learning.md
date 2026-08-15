---
path: quant/volatility-forecasting-garch-to-deep-learning
title: Volatility Forecasting: From GARCH to Deep Learning
articleSlug: quantitative-analyst-guide-volatility-forecasting
date: 2025-10-24
labels: ["Quantitative Finance", "AI & Machine Learning"]
related: []
---

## Overview

Volatility, unlike price, is latent — it must be estimated, not observed directly. Forecasting it even 1-2% more accurately than competitors is worth billions to elite options market makers. The field's evolution runs from interpretable econometric models (GARCH) through tree-based ensembles to deep learning architectures, each trading interpretability and speed for predictive power.

## Key Concepts

- **Volatility's stylized facts** — clustering (high-vol periods follow high-vol periods), mean reversion (extreme spikes are usually temporary), fat tails (extreme moves are more common than a normal distribution predicts), and the leverage effect (negative price shocks increase volatility more than equivalent positive shocks).
- **Realized vs. Implied Volatility** — Realized Volatility (RV) is backward-looking, computed from historical price data. Implied Volatility (IV) is forward-looking, extracted from option prices. The spread between an RV forecast and current IV is a primary source of volatility-arbitrage alpha.
- **GARCH(1,1)** — the workhorse volatility model: `σ²ₜ = ω + α·ε²ₜ₋₁ + β·σ²ₜ₋₁`. ω is the long-run baseline variance, α measures reaction to yesterday's shock, β measures persistence of yesterday's volatility. For most financial assets, α + β ≈ 0.95-0.99 (very high persistence).
- **Asymmetric extensions** — standard GARCH treats positive and negative shocks symmetrically. GJR-GARCH adds a leverage term (γ) that activates only for negative shocks; EGARCH models log-variance directly, guaranteeing positivity while separately capturing shock magnitude and sign effects.

## The Machine Learning Frontier

| Model Class | Typical R² | Character |
|---|---|---|
| GARCH family | ~0.15-0.25 | Fast, interpretable |
| Tree ensembles (XGBoost, RF) | ~0.30-0.45 | Captures non-linear interactions |
| Deep learning (LSTM, Transformer) | ~0.35-0.55 | Captures sequential/long-range patterns |

- **Feature engineering matters more than model choice** — technical (vol moving averages, Bollinger widths), market microstructure (bid-ask spread volatility, order book imbalance), alternative data (sentiment, news, search trends), and macro data (rate changes, policy uncertainty) all feed model performance.
- **Hybrid GARCH+ML models** — a two-stage approach: fit GARCH first to capture basic clustering, then train an ML model on the *standardized residuals* to capture the non-linear patterns GARCH misses. Combines econometric interpretability with ML flexibility.

## Beyond GARCH: Stochastic Volatility

The Heston model (1993) treats volatility itself as following a stochastic process (mean-reverting, with its own "vol-of-vol" parameter), correlated with the asset price process via a typically negative correlation (~-0.7 for equity indices) that captures the leverage effect directly. It remains the gold standard for option pricing.

## Deployment in Trading

- **Volatility arbitrage** — when the RV forecast exceeds current IV, buy straddles/strangles (long volatility); when RV forecast is below IV, sell straddles/strangles (short volatility), delta-hedging continuously to isolate the pure volatility P&L.
- **Risk management** — volatility forecasts feed directly into Value-at-Risk and Expected Shortfall calculations, portfolio risk budgeting, and stress testing.
- **Position sizing** — sizing positions inversely to expected volatility (as in risk parity or Kelly-criterion approaches) targets a constant risk contribution per position.

## Limitations and Failure Modes

- **Non-stationarity** — market structure and participant behavior evolve, causing model decay; no model, however well-fit historically, is exempt.
- **Black swans** — models trained on historical distributions cannot predict events outside those distributions by definition. The 2008 crisis exposed this starkly: VaR models built on normal-distribution assumptions assigned near-zero probability to moves that then occurred, providing false security rather than real risk control.
- **Correlation breakdown** — the 2020 COVID crash saw many volatility models fail as cross-asset correlations spiked toward 1.0, breaking the diversification assumptions models depended on.

## Key Takeaways

- Volatility forecasting is fundamentally a latent-variable estimation problem, not a simple time-series prediction — this is why realized-vs-implied spread, not raw volatility level, is often the real trading signal.
- Model sophistication trades off against interpretability and speed; the right choice depends on the trading horizon (tree models for high-frequency, LSTMs/hybrids for medium-term, transformers for multi-asset).
- No volatility model — however sophisticated — is immune to regime shifts and black swans; robust strategies (avoiding excess leverage, stress testing, tail hedging) matter as much as forecast accuracy.
- The persistence parameter (α + β in GARCH) directly measures how "sticky" current volatility conditions are expected to be, and is itself a tradable insight.

## Related Reading

- [A Quantitative Analyst's Guide to Volatility Forecasting](/articles/quantitative-analyst-guide-volatility-forecasting) — full article with the GARCH family derivations, LSTM/Transformer architecture, and academic research review.
- [Watch on YouTube](https://youtu.be/zLKCTVTfvo4)
