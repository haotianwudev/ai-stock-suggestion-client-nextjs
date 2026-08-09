---
path: quant/mean-reversion
title: Mean Reversion & Statistical Arbitrage
articleSlug: quantitative-trading-mean-reversion-factor-models-execution-dynamics
date: 2026-08-04
labels: [QUANT]
related: []
---

## Overview
Statistical arbitrage (stat arb) is a quantitative framework that exploits temporary pricing inefficiencies across diversified portfolios. Originating in the 1980s with pairs trading, it relies on isolating idiosyncratic components of asset returns by neutralizing market and factor risks. Once isolated, these residual prices often exhibit mean-reverting characteristics—drifting away from, and eventually returning to, a long-term historical equilibrium.

## Key Concepts

- **Fama-French Factors** — The five major factors defining equity returns: Market Risk (Rm-Rf), Size (SMB), Value (HML), Profitability (RMW), and Investment (CMA).
- **IPCA (Instrumented PCA)** — An advanced extraction model that introduces observable firm characteristics as instrumental variables to estimate time-varying factor loadings, mapping them to risk factor exposures (beta) or anomaly intercepts (alpha).
- **Ornstein-Uhlenbeck (OU) Framework** — A stochastic model used to represent the mean-reverting behavior of the cumulative residual, balancing a deterministic drift pulling toward a mean against continuous random shocks.
- **The Marriott-Pope Effect** — The phenomenon where estimating the mean-reversion speed via Ordinary Least Squares (OLS) in finite samples yields a downward-biased autoregressive coefficient, causing algorithms to "hallucinate" faster reversion than what occurs in reality.
- **The Square-Root Law of Market Impact** — An execution dynamic dictating that slippage is proportional to an asset's volatility and the square root of the normalized order size, acting as a capacity ceiling for scalable AUM.
- **Combinatorial Purged Cross-Validation (CPCV)** — A robust research practice that fixes information leakage by purging overlapping training data and embargoing post-test data to generate true out-of-sample distributions.
- **Deflated Sharpe Ratio (DSR)** — A modified Sharpe Ratio that corrects for non-normality (skewness/kurtosis) and selection bias (multiple testing) to reject statistical illusions.

## Formulas

**The Fama-French Five-Factor Model:**
$$
R_{i,t} - R_{f,t} = \alpha_i + \beta_1(R_{m,t} - R_{f,t}) + \beta_2(SMB) + \beta_3(HML) + \beta_4(RMW) + \beta_5(CMA) + \varepsilon_{i,t}
$$

**Continuous-Time Stochastic Differential Equation (OU Process):**
$$
dX_t = \kappa(\mu - X_t)dt + \sigma dW_t
$$

**The s-score (Avellaneda-Lee Framework):**
$$
s_{mod,i} = \frac{X_{i,t} - \mu_i}{\sigma_{eq,i}} - \frac{\alpha_i}{\kappa_i\sigma_{eq,i}}
$$

**Square-Root Law of Market Impact:**
$$
\Delta p = Y \cdot \sigma \cdot \sqrt{\frac{Q}{V}}
$$

## Section Summaries

### Evolution of Statistical Arbitrage
Statistical arbitrage isolates idiosyncratic components of asset returns by neutralizing risks. Early models used basic distance metrics, but modern approaches use sophisticated multi-asset factor models and deep learning.

### Major Factors in Quant Trading
Factor models like Fama-French Five-Factor quantify return drivers (Market Risk, Size, Value, Profitability, Investment). Modern funds also blend Momentum and Low Volatility/Quality to maximize risk-adjusted returns.

### Advanced Extraction Models
Traditional PCA assumes static loadings. Modern models use IPCA (Instrumented PCA) for time-varying loadings based on firm characteristics, and Deep Learning (Attention Factor Models) to jointly learn factors and policies directly.

### The Ornstein-Uhlenbeck Framework
Models the cumulative factor-neutral residual as a stochastic process balancing a deterministic mean-reverting drift and random shocks. The s-score standardizes trading signals for disciplined entry/exit rules.

### The Marriott-Pope Effect
OLS estimation of mean-reversion speed is downward-biased in finite samples. This causes models to "hallucinate" faster reversion than reality, leading to premature exits and realized losses if not properly debiased.

### Execution Dynamics
Transaction costs can easily destroy mean-reversion alpha. The Square-Root Law of Market Impact dictates that slippage scales with the square root of normalized order size, placing a strict capacity ceiling on AUM.

### Rigorous Research Practices
Backtest overfitting is prevented using Winsorization (managing fat tails without deleting data), CPCV (removing data leakage), and the Deflated Sharpe Ratio (adjusting for selection bias and non-normality).

## Key Takeaways
- Modern extraction moves beyond static PCA to dynamic IPCA and Deep Learning attention models to jointly learn tradable factors and portfolio policies.
- Execution costs (slippage and market impact) can easily destroy mean-reversion alpha, requiring strict management against the Square-Root Law of Market Impact.
- Overfitting is the most pervasive failure point; robust research requires strict use of Winsorization, CPCV, and the Deflated Sharpe Ratio.

## Related Reading
- [Quantitative Trading of Mean Reversion](/articles/quantitative-trading-mean-reversion-factor-models-execution-dynamics)
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vSK4rFGjYnaD1bcaqxVqER3XZLyvMyJXBxYfUxHd5YA19779S_j4zjTIVPnc4SxDqqIl9FogEmPBfpf/pub)
