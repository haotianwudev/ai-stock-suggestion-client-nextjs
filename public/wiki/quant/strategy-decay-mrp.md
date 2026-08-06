# Strategy Decay & Factor Fragility

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
$$ \text{MRP}_1(x) = \min_{t_1 \in [d, n-d]} \{ \min(S(r_1), S(r_2)) \} $$

Multiple Splits MRP:
$$ \text{MRP}_s(x) = \min_{T} \{ \min(S(r_1), S(r_2), ... S(r_{s+1})) \} $$

## Optimization Meta-Risks
- **Look-Ahead Bias:** Historical MRP pinpoints exact regime boundaries ex-post, whereas live algorithms suffer statistical lag.
- **Historical Overfitting:** Allowing too many regime splits (high $s$) data-mines the backtest into transient noise.
- **The Small-Sample Problem:** Heavy optimization against rare but severe regimes (the "Peso Problem") forces rejection of long-term robust strategies.
- **Alpha Destruction via Hedging:** Over-optimizing for "regime neutrality" strips away compensated structural risk premiums.
