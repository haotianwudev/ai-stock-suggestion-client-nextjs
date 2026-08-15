---
path: quant/volatility-risk-premium
title: Volatility Risk Premium (VRP) Decomposition
articleSlug: decomposing-volatility-risk-premium-structural-arbitrage
date: 2026-07-03
labels: ["QUANT"]
related: []
---

## Overview
The Volatility Risk Premium (VRP) is the persistent tendency for option-implied volatility to exceed subsequent realized volatility. Advanced quantitative funds decompose the VRP into its constituent, orthogonal components (moneyness, term structure, and correlation) to target structural inefficiencies driven by non-economic flows, moving beyond the simple selling of insurance.

## Key Concepts
- **VRP** — The difference between the market's pricing of future variance under the risk-neutral measure (ℚ) and the expectation of variance under the physical measure (ℙ).
- **Moneyness Decomposition** — Isolating the pure variance premium (ATM) from skewness (Third Moment) and kurtosis/tail risk (Fourth Moment).
- **Term Structure Decomposition** — Isolating short-term mean-reverting tactical flows (Gamma) from long-term structural hedging flows (Vega).
- **Correlation/Dispersion** — Isolating the Correlation Risk Premium (CRP) by trading index volatility against its constituents.
- **Vanna (∂Δ / ∂σ)** — The sensitivity of an option's Delta to changes in volatility, driving mechanical dealer flows that can suppress volatility.
- **Charm (∂Δ / ∂t)** — The sensitivity of Delta to time decay, creating structural bids as options approach expiration.

## Formulas
$$
\text{VRP}_t = E_t^{\mathbb{Q}}[\text{Var}] - E_t^{\mathbb{P}}[\text{Var}]
$$

$$
\sigma^2_{\text{index}} = \sum(w_i^2 \sigma_i^2) + \sum(w_i w_j \rho_{ij} \sigma_i \sigma_j)
$$

## Key Takeaways
- The VRP is highly asymmetric. "Bad Variance" (downside) carries a persistent premium, while "Good Variance" (upside) can often be negligible due to overwriting supply.
- The ultimate goal of VRP decomposition is to construct a "Barbell" portfolio: harvesting the high-frequency core VRP (income), hedging the jump risk (protection), and using dispersion (alpha) to fund the protection leg.
- Pure ATM variance strategies are heavily influenced by Gamma flows, while downside skew is dominated by crash aversion from pension funds and insurers.

## Related Reading

- [Decomposing the Volatility Risk Premium: A Sophisticated Framework for Structural Arbitrage](/articles/decomposing-volatility-risk-premium-structural-arbitrage)
- [Watch on YouTube](https://youtu.be/tP1HJuVzuZU)
