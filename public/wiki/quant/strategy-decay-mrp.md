---
path: quant/strategy-decay-mrp
title: Strategy Decay & Factor Fragility
articleSlug: strategy-decay-factor-fragility-regime-aware-portfolio-construction
date: 2026-06-16
labels: [Quantitative Finance]
related: []
---

## Overview
A quantitative framework for identifying structural vulnerabilities in systematic strategies and building regime-aware portfolios. This covers the difference between alpha decay and strategy decay, and introduces Minimum Regime Performance (MRP) to solve the blindness of traditional full-sample metrics like the Sharpe ratio.

## Core Concepts
- **Alpha Decay vs. Strategy Decay:** Alpha decay is the natural half-life of a signal due to crowding. Strategy decay is a structural breakdown in the foundational logic due to macroeconomic regime shifts.
- **The Illusion of Perfection:** Full-sample metrics (Sharpe Ratio, Max Drawdown) assume markets are ergodic and hide a strategy's vulnerability to specific hostile environments.
- **Factor Fragility:** Empirical demonstration of factor performance across the Investment Clock. For example, Momentum suffers from the "Winner's Curse" during sharp contractionary inflection points, whereas Quality acts as a structural anchor.
- **Minimum Regime Performance (MRP):** A dynamic, combinatorial search algorithm that finds the contiguous market era where risk-adjusted compounding was fundamentally weakest. It serves as a pre-optimization threshold filter.

## The Mathematics of MRP
MRP actively searches across defined regimes (using HMMs or Macro Clustering) for the lowest Sharpe ratio.

Single Split MRP:
$$
\text{MRP}_1(x) = \min_{t_1 \in [d,\, n-d]} \{ \min(S(r_1), S(r_2)) \}
$$

Multiple Splits MRP:
$$
\text{MRP}_s(x) = \min_{T} \{ \min(S(r_1), S(r_2), \ldots, S(r_{s+1})) \}
$$

Number of valid splits (combinatorics):
$$
n_s = \binom{n - sd - d + s}{s}
$$

## Optimization Meta-Risks
- **Look-Ahead Bias:** Historical MRP pinpoints exact regime boundaries ex-post, whereas live algorithms suffer statistical lag.
- **Historical Overfitting:** Allowing too many regime splits (high $s$) data-mines the backtest into transient noise.
- **The Small-Sample Problem:** Heavy optimization against rare but severe regimes (the "Peso Problem") forces rejection of long-term robust strategies.
- **Alpha Destruction via Hedging:** Over-optimizing for "regime neutrality" strips away compensated structural risk premiums.

## Key Takeaways
- Full-sample Sharpe and Max Drawdown can both mask a strategy that's structurally fragile in specific macro regimes — MRP exists precisely to surface that hidden weakness.
- Momentum's high full-sample average return hides a deeply negative MRP (the "Winner's Curse" in contractions); Quality's lower average return comes with a strictly positive MRP across all regimes.
- Use MRP as a pre-optimization threshold filter, not as an input to Mean-Variance Optimization directly — it's a non-linear combinatorial search, not a smooth objective.
- Don't over-optimize for regime neutrality: factor premiums exist to compensate for un-hedged structural risk, and stripping that away just replicates the risk-free rate.

## Related Reading
- [Strategy Decay & Factor Fragility: A Quantitative Framework for Regime-Aware Portfolio Construction](/articles/strategy-decay-factor-fragility-regime-aware-portfolio-construction)
- [Watch on YouTube](https://youtu.be/oD_Ki-sDNzM)
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vQu42JJI4PlB8yjnB95qdkk8yOIC6tVvlrWkwtEVylWMzfFA2Jl56TDudeGJPKKKCmoHoGnb-hM7RkM/pub)
