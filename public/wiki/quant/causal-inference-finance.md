---
path: quant/causal-inference-finance
title: Causal Inference in Finance
articleSlug: structural-revolution-quantitative-finance
date: 2026-08-08
labels: [Quantitative Finance, AI & Machine Learning]
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

**DML orthogonalization** (given outcome Y, treatment T, high-dimensional covariates X):
1. Cross-fit via ML: predict Y from X → Ŷ; predict T from X → T̂.
2. Residualize: Y_res = Y − Ŷ; T_res = T − T̂.
3. Neyman-orthogonal estimation: causal effect θ = OLS(Y_res ~ T_res).

θ achieves root-n consistency despite the ML regularization bias in step 1 — the variance in T independent of X explains the variance in Y independent of X.

$$
\Sigma_{do}
$$

The **Interventional Covariance Matrix** replaces the standard Pearson correlation matrix in portfolio construction. It isolates structural dependencies by controlling for shared causal ancestors, instead of the raw correlations that notoriously converge toward 1.0 during market crashes.

## Key Takeaways

- **Correlation-only models are structurally fragile.** Without a causal framework, factor mining mathematically guarantees false positives that don't survive regime changes.
- **DML is the practical fix for high-dimensional confounding** — it lets you use flexible ML models for nuisance prediction while still getting an unbiased causal parameter estimate.
- **Deep IV handles the case DML can't**: unobserved confounders, via an exogenous instrument plus a neural network for non-linear structure.
- **Causal discovery (NOTEARS, LiNGAM, PC/FCI) can learn the DAG itself from data** — you don't always need to hand-specify the causal structure, though LLM-supplied priors should only ever be soft constraints, never the final arbiter.
- **Portfolio construction on the Interventional Covariance Matrix (Σ_do) outperforms Pearson-based Modern Portfolio Theory** on out-of-sample Sharpe ratio and drawdown recovery, because it relies on invariant structure rather than crash-correlated noise.

## Related Reading

- [The Structural Revolution in Quantitative Finance](/articles/structural-revolution-quantitative-finance) — full article with the DML mechanics panel, causal discovery algorithm comparison, and the case for the Interventional Covariance Matrix.
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vQkzf2BRMxk6r75pn0EGCnRjDO1LGBI-wHNPNMWl6GOAwhxvX3JFRs9fa8ODDiWDWCxDd4YIyTQ48D7/pub)
