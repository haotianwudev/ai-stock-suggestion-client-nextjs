---
path: option-strategy/global-covered-call-risk-decomposition
title: "Global Evidence on Covered Calls: Risk Decomposition and Risk-Managed Strategies"
articleSlug: covering-world-global-evidence-covered-calls
date: 2025-08-07
labels: [Options, Quantitative Finance]
related: []
---

## Overview

AQR research across eleven global equity indexes shows covered calls consistently deliver &ldquo;equity-like&rdquo; returns with substantially lower volatility and smaller drawdowns than the underlying indexes. The key insight isn't that covered calls work — it's *why*: decomposing the strategy into three components reveals that one of its three risk sources (dynamic equity exposure) is uncompensated, and actively hedging it away meaningfully improves risk-adjusted returns.

## Key Concepts

- **Three-component decomposition** — every covered call return stream splits into passive equity exposure (70% of variance, earns the equity risk premium), short volatility exposure (7% of variance, earns the volatility risk premium, highest Sharpe ratio at 0.74), and dynamic equity exposure/equity timing (23% of variance, statistically insignificant contribution to returns).
- **The volatility risk premium** — options are typically priced with implied volatility above realized volatility; selling them (as in a covered call) systematically captures this gap as a positive source of return.
- **Uncompensated risk** — dynamic equity exposure changes with time, the underlying's price, and implied volatility, adding real risk (23% of variance) without a corresponding expected-return benefit in efficient markets — the paper's central argument for why it should be hedged away.

## Global Performance vs. Underlying Indexes

| | Covered Calls | Underlying Indexes |
|---|---|---|
| Annualized return | 5.4% (excess) | 4.5% (excess) |
| Annualized volatility | 14.8% | 21.2% |
| Max drawdown | 45% | 63% |
| Sharpe ratio | 0.45 | 0.33 |

## Risk-Managed vs. Traditional Covered Calls

Risk-managed covered calls actively hedge the dynamic equity exposure to hold a constant target beta (e.g., 0.5):

| Metric | Traditional | Risk-Managed |
|---|---|---|
| Annualized excess return | 5.3% | 5.9% |
| Volatility | 14.7% | 11.7% (-20%) |
| Sharpe ratio | 0.35 | 0.51 |
| Max drawdown | -44% | -35% |

**Transaction costs don't erase the edge**: options trading costs run ~28 bps/year for both approaches; risk-managed strategies add ~33 bps/year in hedging costs (due to higher turnover), yet the net Sharpe ratio still comes out ahead — 0.46 (risk-managed, net of costs) vs. 0.33 (traditional) vs. 0.32 (equities).

## Global Diversification

Diversifying risk-managed covered calls across countries adds a further layer of benefit, because the short volatility component (avg. cross-correlation 0.4) diversifies better across countries than the passive equity component (avg. cross-correlation 0.7):

- Individual-index average volatility: 11.7% → market-cap-weighted global portfolio: 9.7%
- Sharpe ratio improves further: 0.51 → 0.57
- Reduced idiosyncratic/single-country concentration risk

## Key Takeaways

- The paper's real contribution isn't proving covered calls work — that's well established — it's showing that roughly a quarter of the strategy's risk (dynamic equity exposure) is dead weight that can be hedged away without giving up the returns that risk was never earning in the first place.
- Risk-managed and globally diversified covered calls stack independently: hedging dynamic equity exposure improves the Sharpe ratio (0.35→0.51), and diversifying that risk-managed strategy globally improves it again (0.51→0.57) — two separate, additive sources of improvement, not the same lever pulled twice.
- The transaction-cost finding matters practically: a strategy that looks better on paper but loses its edge to implementation costs is common in quant finance, and this paper specifically stress-tests that the risk-managed approach's advantage survives realistic hedging costs, not just idealized backtests.

## Related Reading

- [Global Evidence on Covered Calls](/articles/covering-world-global-evidence-covered-calls)
- [Watch on YouTube](https://youtu.be/ntqTDpKv5es)
- [Full Research Paper](https://www.aqr.com/Insights/Research/Working-Paper/Covering-the-World-Global-Evidence-on-Covered-Calls)
