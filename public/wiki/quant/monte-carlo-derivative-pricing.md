---
path: quant/monte-carlo-derivative-pricing
title: Monte Carlo Simulation for Derivative Pricing
articleSlug: monte-carlo-advanced-stochastic-modeling-derivatives-cva
date: 2025-12-11
labels: ["Quantitative Finance"]
related: []
---

## Overview

Monte Carlo (MC) simulation estimates the risk-neutral expected payoff integral through repeated random sampling, making it the only viable method for path-dependent exotic derivatives and multi-asset products where traditional grid-based methods (finite difference, trees) suffer from the curse of dimensionality. Its complexity scales with the number of paths, not the number of assets.

## Key Concepts

- **Risk-Neutral Pricing** — `V₀ = e^(-rT) 𝔼^ℚ[P(S_T)]`, estimated as `V₀ ≈ (1/N) Σ e^(-rT) Pᵢ` across N simulated paths.
- **Path-Dependency** — MC is mandatory for exotics (Asian, Barrier, Lookback options) whose payoffs depend on the entire price path, not just the terminal price.
- **Variance Reduction Techniques (VRTs)** — MC convergence is slow (O(1/√N)); Antithetic Variates (paired paths) and Control Variates (adjusting against a known analytical benchmark price) improve statistical efficiency without changing the expected price.

## Asset Modeling Hierarchy

- **Geometric Brownian Motion (GBM)** — `dS/S = r dt + σ dW_t`; the baseline, but fails to capture volatility smile, skew, fat tails, and leverage effects.
- **Jump-Diffusion (Merton, Kou)** — adds a Poisson jump process to capture sudden large moves; essential for deep OTM options and crash-sensitive products.
- **Mean-Reverting Rate Models** — Vasicek (`dr_t = a(b - r_t)dt + σ dW_t`), CIR (prevents negative rates via a square-root volatility term), and Hull-White (exact calibration to the initial yield curve).

## Volatility Frameworks

- **Local Volatility (Dupire)** — volatility as a deterministic function of price and time; perfectly fits today's implied vol surface but lacks realistic forward dynamics.
- **Stochastic Volatility (Heston)** — volatility follows its own SDE, capturing the negative price/volatility correlation (the "leverage effect") and mean-reversion; dynamically richer than LV but doesn't perfectly fit the initial surface on its own.
- **Stochastic Local Volatility (SLV)** — hybrid combining LV's initial-surface fit with SV's dynamic realism; calibration is exceptionally complex.

## Correlation Modeling

- **Cholesky Decomposition** — transforms independent draws into correlated normal draws, but implicitly assumes jointly normal (linear/Gaussian) dependence — inadequate for the non-linear tail dependence markets actually exhibit in crises.
- **Copula Functions** — decouple marginal distributions from joint dependence structure. The **Student's t-Copula** is preferred for risk management because it captures tail dependence (assets co-moving strongly during crashes) that a Gaussian copula misses, avoiding dangerous understatement of VaR and capital requirements.

## CVA: The Computational Apex

- **CVA (Credit Valuation Adjustment)** — the price adjustment for counterparty credit risk, mandated for fair value accounting and Basel III capital requirements: `CVA = 𝔼^ℚ[e^(-rT)(1-R) ∫ E(t) dPD(t)]`.
- **Exposure Simulation** — MC generates thousands of correlated market-factor scenarios to derive Expected Exposure (EE) and Potential Future Exposure (PFE) profiles via portfolio mark-to-market under each path.
- **Nested Simulation** — required when the portfolio includes early-exercise features (e.g. Bermudan options): an outer loop simulates exposure paths, and an inner loop runs another MC simulation at each time step to value the embedded option.
- **Least Squares Monte Carlo (LSMC, Longstaff-Schwartz)** — the standard inner-loop technique, using regression to estimate continuation value and define the optimal exercise boundary. Computational cost scales as N_outer × M_steps × N_inner, typically requiring cloud-scale infrastructure.

## Key Takeaways

- MC's dimensional independence (cost scales with paths, not assets) is what makes it the only practical method for complex multi-asset exotics.
- GBM is a starting point, not an end point — realistic pricing requires jump-diffusion and/or stochastic (local) volatility depending on the product.
- Gaussian correlation assumptions (Cholesky) systematically understate crisis-time tail dependence; t-Copulas are the risk-management-grade alternative.
- CVA with early-exercise features via nested Monte Carlo + LSMC represents the computational ceiling of derivatives pricing, requiring serious infrastructure investment.

## Related Reading

- [Monte Carlo Simulation for Derivative Pricing](/articles/monte-carlo-advanced-stochastic-modeling-derivatives-cva) — full article with the complete formula derivations and the copula comparison table.
- [Watch on YouTube](https://youtu.be/nBAnWHAzD6I)
