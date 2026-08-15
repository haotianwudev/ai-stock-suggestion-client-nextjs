---
path: quant/causal-inference-finance
title: Causal Inference in Finance
articleSlug: structural-revolution-quantitative-finance
date: 2026-08-08
labels: ["Quantitative Finance", "AI & Machine Learning"]
related: []
---

## Overview

Quantitative finance has historically relied on **associational** statistics — CAPM, Fama-French, standard deep learning — measured by conditional probability, P(Y|X). Mining thousands of factors this way mathematically guarantees finding statistically significant but spurious correlations, inflating the False Discovery Rate and producing strategies that degrade violently across regime changes. **Causal inference** instead asks P(Y|do(X)) — what happens under intervention, not just what's correlated — via Structural Causal Models and Directed Acyclic Graphs (DAGs) that map the actual temporal, causal flow of a system, isolating features that stay invariant across market turbulence.

## Key Concepts

- **Directed Acyclic Graph (DAG)** — A structural map where variables are nodes connected by directed arrows indicating causal influence, with no feedback loops.
- **Confounding Bias** — An unobserved variable causes both the treatment and the outcome; failing to condition on it creates a spurious association.
- **Collider Bias** — Treatment and outcome both cause a third variable; conditioning on that collider induces artificial correlation between otherwise-independent variables.
- **Double Machine Learning (DML)** — Combines flexible ML models with Neyman orthogonalization and sample splitting to neutralize regularization bias and isolate true causal effects amid high-dimensional confounders.
- **Instrumental Variable (IV) / Deep IV** — An exogenous variable affecting the treatment but not the outcome directly; Deep IV integrates neural networks into IV regression to model non-linear asset pricing while preserving unconfoundedness.
- **False Discovery Rate (FDR)** — The expected proportion of "significant" results that are actually false positives — the statistical trap that unconstrained factor mining falls into without a causal framework.
- **Causal Discovery** — Algorithms that learn the DAG directly from observational data: constraint-based (PC, FCI — FCI specifically handles unobserved confounders), continuous optimization (NOTEARS — differentiable, scales to large universes, integrates with neural nets), and non-Gaussian/ICA-based (LiNGAM — uniquely orients causal arrows). LLMs can supply directional priors to these algorithms (boosting F1 accuracy on synthetic financial graphs by over 300% in testing) but must never independently arbitrate causality themselves — used alone, they act as "causal parrots" hallucinating relationships from linguistic co-occurrence.

## Formulas

### 1. Pearl's Backdoor Adjustment (Do-Calculus)

While correlational models compute observational conditional probability $P(Y \mid X)$, causal models isolate the interventional distribution by blocking non-causal backdoor paths:

$$
P(Y \mid \operatorname{do}(T = t)) = \sum_{X} P(Y \mid T = t, X = x) P(X = x)
$$

### 2. Double Machine Learning (DML) Partially Linear Model

Given outcome asset return $Y$, treatment policy shock $D$, and high-dimensional confounder vector $X$:

$$
Y = \theta_0 D + g_0(X) + U, \quad \mathbb{E}[U \mid X, D] = 0
$$

$$
D = m_0(X) + V, \quad \mathbb{E}[V \mid X] = 0
$$

**Robinson Residualization & Orthogonal Estimator:**
Using ML cross-fitting to compute out-of-fold residuals $\tilde{Y} = Y - \hat{g}(X)$ and $\tilde{D} = D - \hat{m}(X)$:

$$
\hat{\theta} = \left( \frac{1}{n} \sum_{i=1}^n \tilde{D}_i^2 \right)^{-1} \left( \frac{1}{n} \sum_{i=1}^n \tilde{D}_i \tilde{Y}_i \right)
$$

The Neyman score condition $\mathbb{E}\left[ \left. \frac{\partial}{\partial \eta} \psi(W; \theta_0, \eta) \right|_{\eta = \eta_0} \right] = 0$ guarantees that $\hat{\theta}$ achieves $\sqrt{n}$-consistency and asymptotic normality even when nuisance functions $\hat{g}$ and $\hat{m}$ converge at slower non-parametric rates ($n^{-1/4}$).

### 3. Continuous Acyclicity Constraint (NOTEARS)

Transforms combinatorial DAG search into a continuous optimization problem using a differentiable trace exponential constraint:

$$
\min_{W \in \mathbb{R}^{d \times d}} \frac{1}{2n} \|X - X W\|_F^2 + \lambda \|W\|_1 \quad \text{s.t.} \quad h(W) = \operatorname{tr}\left(e^{W \circ W}\right) - d = 0
$$

Where $W \circ W$ is the Hadamard (element-wise) product and $\operatorname{tr}(e^A) = \sum_{k=0}^\infty \frac{\operatorname{tr}(A^k)}{k!}$.

### 4. Linear Non-Gaussian Acyclic Model (LiNGAM)

Exploits non-Gaussian asset returns and Independent Component Analysis (ICA) to uniquely identify causal arrow directionality without interventional experiments:

$$
X = B X + e = (I - B)^{-1} e, \quad e_i \sim \text{Non-Gaussian (mutually independent)}
$$

### 5. Deep Instrumental Variables (Deep IV)

Overcomes unobserved confounding $U$ via exogenous instruments $Z$ ($\mathbb{E}[U \mid Z, X] = 0$) using two-stage neural networks to solve the non-linear operator:

$$
\mathbb{E}[Y \mid Z, X] = \int g(d, X) \, dP(d \mid Z, X)
$$

### 6. The Interventional Covariance Matrix ($\Sigma_{do}$)

Replaces the fragile Pearson sample covariance matrix $\Sigma_{\text{Pearson}}$ by isolating true structural DAG dependencies and filtering out crash-induced spurious correlations:

$$
\mathbf{R} = (I - B)^{-1} (\Gamma \mathbf{F} + \mathbf{\epsilon})
$$

$$
\Sigma_{do} = (I - B)^{-1} \left( \Gamma \Sigma_F \Gamma^T + \Sigma_\epsilon \right) ((I - B)^{-1})^T
$$

**Causal Mean-Variance Portfolio Optimization:**

$$
\min_{\mathbf{w}} \mathbf{w}^T \Sigma_{do} \mathbf{w} \quad \text{s.t.} \quad \mathbf{w}^T \mathbf{\mu} \ge \mu_{\text{target}}, \quad \mathbf{w}^T \mathbf{1} = 1
$$

## Key Takeaways

- **Correlation-only models are structurally fragile.** Without a causal framework, factor mining mathematically guarantees false positives that don't survive regime changes.
- **DML is the practical fix for high-dimensional confounding** — it lets you use flexible ML models for nuisance prediction while still getting an unbiased causal parameter estimate.
- **Deep IV handles the case DML can't**: unobserved confounders, via an exogenous instrument plus a neural network for non-linear structure.
- **Causal discovery (NOTEARS, LiNGAM, PC/FCI) can learn the DAG itself from data** — you don't always need to hand-specify the causal structure, though LLM-supplied priors should only ever be soft constraints, never the final arbiter.
- **Portfolio construction on the Interventional Covariance Matrix (Σ_do) outperforms Pearson-based Modern Portfolio Theory** on out-of-sample Sharpe ratio and drawdown recovery, because it relies on invariant structure rather than crash-correlated noise.

## Related Reading

- [The Structural Revolution in Causal Quantitative Finance](/articles/structural-revolution-quantitative-finance) — full article with the DML mechanics panel, causal discovery algorithm comparison, and the case for the Interventional Covariance Matrix.
