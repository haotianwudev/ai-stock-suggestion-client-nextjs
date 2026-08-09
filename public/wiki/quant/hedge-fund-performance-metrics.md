---
path: quant/hedge-fund-performance-metrics
title: Measuring the Immeasurable: Hedge Fund Performance Metrics
articleSlug: measuring-immeasurable-hedge-fund-performance-metrics
date: 2025-12-25
labels: [Quantitative Finance]
related: []
---

## Overview

Evaluating a hedge fund correctly starts with choosing the right return calculation for the fund's liquidity structure, then layering risk-adjusted metrics, cash-flow-aware analysis, attribution, and forward-looking risk measures on top. Raw returns without risk context, or the wrong return methodology for a fund's structure, produce misleading comparisons.

## Key Concepts

- **Time-Weighted Return (TWR)** — `[(1 + R₁) × (1 + R₂) × ... × (1 + Rₙ)] - 1`; neutralizes external cash-flow timing, the standard for liquid strategies (public equities, market neutral, arbitrage).
- **Money-Weighted Return (IRR)** — solves `Σ[CFₜ / (1 + IRR)ᵗ] = 0`; required for illiquid closed-end funds (private equity) since the manager controls capital timing.
- **Modified Dietz** — `R = (EMV - BMV - CF) / (BMV + WCF)`; a practical TWR approximation when daily valuation isn't feasible, used for mixed-liquidity strategies.
- **Sharpe / Sortino / Information / Calmar / Sterling / Omega Ratios** — the risk-adjusted metric family; each answers a different question (total volatility, downside-only volatility, active risk vs. benchmark, drawdown-adjusted return, or full-distribution shape).
- **VaR / CVaR** — Value at Risk estimates potential loss at a confidence level; Conditional VaR (Expected Shortfall) averages the loss *beyond* VaR, making it the superior, regulator-preferred (Basel III) tail-risk measure.
- **Brinson Attribution** — decomposes long-only equity excess return into Allocation Effect, Selection Effect, and Interaction Effect.
- **Factor Attribution (Fama-French, Fung-Hsieh)** — regresses returns on systematic factors to separate true manager skill (alpha) from factor exposure.
- **The SAMURAI Benchmark Check** — Specified in advance, Appropriate, Measurable, Unambiguous, Reflective, Accountable, Investable — the criteria a benchmark must meet to be a fair comparison.

## Risk-Adjusted Metrics at a Glance

- **Sharpe Ratio** `(Rp - Rf) / σp` — excess return per unit of total volatility; >1.0 good, >2.0 excellent, but assumes normal returns.
- **Sortino Ratio** `(Rp - Rf) / σd` — Sharpe's downside-only cousin; more appropriate for hedge funds since upside volatility isn't a risk.
- **Information Ratio** `(Rp - Rb) / Tracking Error` — excess return vs. benchmark per unit of active risk; >0.5 indicates skill, >1.0 is exceptional.
- **Calmar Ratio** `Annual Return / Max Drawdown` — return per unit of worst-case loss; key for leveraged CTA/macro strategies.
- **Sterling Ratio** `Annual Return / Avg Drawdown` — like Calmar but uses average of largest drawdowns, more stable for strategies with repeated significant drawdowns.
- **Omega Ratio** `∫[1-F(x)]dx / ∫F(x)dx` — uses the full return distribution, capturing skew/kurtosis that matter for option-heavy strategies.

## Cash Flow & the "Cash Drag" Problem

A large subscription inflow dilutes performance until it's deployed ("cash drag"). Funds address this with **Equalization Credits** (new investors pay for unrealized gains already in the fund) or **Series Accounting** (separate share classes by entry date) — without one of these, early and late investors in the same fund can see wildly different realized returns from an identical TWR.

Public Market Equivalent methods extend this to private funds: **Kaplan-Schoar PME** compares terminal values of fund contributions vs. a public index; **Direct Alpha** (`α = IRR_fund - IRR_public_equivalent`) gives a more directly interpretable alpha figure.

## Key Takeaways

- Match the return calculation to fund liquidity: TWR for liquid strategies, IRR for illiquid closed-end funds, Modified Dietz as a practical middle ground.
- No single risk-adjusted ratio is sufficient — Sharpe, Sortino, Calmar, and Omega each answer a different question about the same return stream.
- CVaR is structurally superior to VaR for tail risk since it measures the *severity* of the worst-case loss, not just its threshold.
- A benchmark that fails the SAMURAI check (e.g., cherry-picked after the fact, or not investable) invalidates the performance comparison built on it.
- GIPS compliance requires TWR for periods ≥1 year, full fee disclosure, and consistent composite construction across all discretionary, fee-paying portfolios in a strategy.

## Related Reading

- [Measuring the Immeasurable: A Comprehensive Guide to Hedge Fund Performance Metrics](/articles/measuring-immeasurable-hedge-fund-performance-metrics) — full article with the complete metric formulas, drawdown framework, attribution models, and stress-testing scenarios.
- [Watch on YouTube](https://youtu.be/WBUxNZZzwnY)
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vSLF6YOjvadQ0NUUS0YvAYK1HmyAUtpS-iFVYbE3espsZOasOv5qjfkalz9X6pOqoDUSPDalwJiXdEB/pub)
