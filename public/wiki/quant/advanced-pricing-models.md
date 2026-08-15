---
path: quant/advanced-pricing-models
title: Advanced Quantitative Pricing Models
articleSlug: beyond-black-scholes
date: 2026-03-09T00:00:00Z
labels: ["QUANT"]
related: []
---

## Overview
While the Black-Scholes-Merton model established the foundation for modern quantitative finance, its assumptions of constant volatility and continuous, lognormal price paths systematically fail to capture empirical market realities like volatility smiles, fat tails, and jump events. Advanced quantitative pricing models address these shortcomings through stochastic variance, discontinuous jump processes, and state-dependent interest rates.

## Taxonomy: Classification of Advanced Models
- **Continuous Diffusion Extensions** — Maintain continuous price paths but introduce stochastic state variables (e.g. Heston, Vasicek).
- **Discontinuous / Jump Processes** — Abandon purely continuous paths to allow sudden, macroscopic price shocks (e.g. Merton Jump-Diffusion, Variance Gamma).
- **Local & Implied Models** — Derive dynamics directly from the implied volatility surface (e.g. Dupire's Local Volatility, SABR).

## Core Mechanics: The Mathematical Foundation
- **The Feynman-Kac Theorem** — Connects SDEs to deterministic PDEs, allowing option pricing through risk-neutral expectations instead of solving complex PDEs.
- **Affine Jump-Diffusions & The OU Process** — Uses linear drift/variance functions (affine) enabling closed-form characteristic functions, commonly using the Ornstein-Uhlenbeck (OU) mean-reverting process.
- **Characteristic Functions & Fourier Inversion** — Bypasses unknown probability density functions by deriving analytical characteristic functions and utilizing Fast Fourier Transform (FFT) techniques for rapid, semi-analytical pricing.

## Volatility Dynamics: Stochastic Volatility Models
- **The Heston Model (1993)** — Models variance as a CIR mean-reverting stochastic process. Correlation between price and variance generates the leverage effect (skew).
- **The SABR Model (2002)** — Stochastic Alpha, Beta, Rho model for interpolating the implied volatility smile, heavily used for interest rate and FX options via Hagan's asymptotic expansion.
- **Stochastic Volatility Inspired (SVI)** — A static parameterization of the implied total variance slice ensuring no static arbitrage, widely used in equity index volatility surface construction.

## Discontinuous Paths: Jump-Diffusion & Lévy Processes
- **Merton's Jump-Diffusion** — Superimposes a Poisson jump process (with normally distributed jumps) onto Brownian motion.
- **Kou Double Exponential** — Uses an asymmetric Laplace distribution for jumps, allowing closed-form solutions for exotic barrier options due to memoryless properties.
- **Variance Gamma (VG)** — An infinite activity model that eliminates continuous Brownian diffusion, moving the asset price exclusively via pure jumps over "economic time."

## Term Structure: Interest Rate & Fixed Income Models
- **The Vasicek Model (1977)** — Uses an OU process for mean-reverting interest rates, though theoretically flawed by allowing negative rates.
- **Cox-Ingersoll-Ross (CIR) Model (1985)** — A square-root process preventing negative rates.
- **The Hull-White Model** — An extension (with time-dependent drift) to perfectly calibrate to the observed term structure, critical for pricing Bermudan swaptions via recombining trees.

## The Frontier: Integrating AI & Machine Learning
- **Neural Networks & Calibration** — Deep learning architectures (LSTMs, MLPs) are used to dramatically accelerate complex model calibration by learning the inverse mapping from market prices to latent parameters offline.

## Formulas
$$
\text{Feynman-Kac Expectation: } V(t, x) = E^{Q} \left[ \exp\left(-\int_{t}^{T} r(s) ds\right) \cdot \text{Payoff}(X_{T}) \mid X_{t} = x \right]
$$

$$
\text{Heston Dynamics: } dV_{t} = a(\bar{v} - V_{t}) dt + \eta \sqrt{V_{t}} dW_{2,t}
$$

$$
\text{Vasicek SDE: } dr_{t} = a(b - r_{t}) dt + \sigma dW_{t}
$$

## Related Reading

- [Beyond Black-Scholes: Advanced Quantitative Pricing Models](/articles/beyond-black-scholes)
- [Watch on YouTube](https://youtu.be/zS43HPjsDtc)
