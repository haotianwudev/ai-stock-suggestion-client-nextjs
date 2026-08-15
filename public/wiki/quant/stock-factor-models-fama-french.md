---
path: quant/stock-factor-models-fama-french
title: Stock Factor Models: From CAPM to the Fama-French Five-Factor Model
articleSlug: stock-factor-models-comprehensive-guide
date: 2025-10-16
labels: ["Quantitative Finance"]
related: []
---

## Overview

Factor models decompose a security's return into systematic components (driven by common, market-wide factors) and idiosyncratic components (asset-specific). The field evolved from CAPM's single market factor — which explained only ~70% of diversified portfolio returns — through Fama-French's multi-factor models, which push explanatory power above 90% by reframing what CAPM treated as unexplained "noise" as distinct, compensable risk factors.

## Key Concepts

- **APT (Arbitrage Pricing Theory)** — Stephen Ross's 1976 theoretical foundation for multi-factor models, built on no-arbitrage conditions rather than CAPM's market-equilibrium assumption. Unlike CAPM, APT doesn't require a specified market portfolio or homogeneous investor expectations — it just requires that returns follow a factor structure and that arbitrage opportunities get competed away.
- **The Fama-French progression**:
  - **Three-Factor (1992)** — adds Size (SMB, Small Minus Big) and Value (HML, High Minus Low) to the market factor, lifting explanatory power above 90%.
  - **Carhart Four-Factor (1997)** — adds Momentum (UMD, Up Minus Down) to capture price persistence, reaching ~95%.
  - **Five-Factor (2015)** — adds Profitability (RMW) and Investment (CMA), which often makes the original Value (HML) factor redundant — Fama and French found profitability/investment "unbundle" what value was really capturing.
- **Long-short construction** — academic factors are zero-investment, market-neutral portfolios: long the top-ranked stocks on a characteristic (e.g., cheap valuation), short an equal-value position in the bottom-ranked stocks, isolating the pure factor premium from market direction.

## The Fama-French 2x3 Sort

SMB and HML are built from six intersection portfolios (Small/Big × Growth/Neutral/Value by book-to-market):
- `SMB = avg(Small Growth, Small Neutral, Small Value) - avg(Big Growth, Big Neutral, Big Value)`
- `HML = avg(Small Value, Big Value) - avg(Small Growth, Big Growth)`

## Common Equity Factors

| Factor | Thesis | Typical Metrics |
|---|---|---|
| Value | Cheap stocks relative to fundamentals outperform | P/E, P/B, EV/EBITDA, dividend yield |
| Size | Small-caps historically outperform large-caps | Market cap, enterprise value |
| Momentum | Recent winners continue outperforming | 12-2 month returns, earnings revisions |
| Quality | Strong, stable fundamentals outperform | ROE/ROA, debt-to-equity, earnings stability |
| Low Volatility | Lower-risk stocks deliver superior risk-adjusted returns | Historical volatility, beta |
| Profitability | Higher-margin companies outperform | Gross/operating margins, asset turnover |

Cyclical factors (Value, Size, Momentum) tend to perform well during economic expansions; defensive factors (Quality, Low Volatility) provide protection during downturns.

## The "Factor Zoo" Problem

Over 315 factors have been documented in academic literature (Harvey, Liu & Zhu, 2016), raising serious data-snooping concerns: multiple testing on the same historical dataset, publication bias toward positive results, and the traditional t-stat > 2.0 significance threshold being far too permissive given how many factors get tested. Proposed fixes include a higher bar (t > 3.0), mandatory out-of-sample validation, and requiring an economic theory foundation — not just a statistical correlation.

**Factor vs. premium distinction**: a "factor" is any observed correlation with returns (possibly spurious or temporary); a "premium" is a robust, persistent return source with genuine economic backing (risk compensation or a documented behavioral bias). Robust factors should be persistent (across time), pervasive (across markets), robust (to alternative definitions), and investable (net of transaction costs).

## Practical Implementation Challenges

- **Transaction costs** — academic factor returns assume zero friction; real-world bid-ask spreads, market impact, and rebalancing costs erode theoretical premiums, especially for fast-decaying factors like momentum.
- **Factor decay speed varies** — momentum decays in months (favoring monthly/quarterly rebalancing), growth-related signals over 6-12 months, while value and quality decay over multiple years (annual rebalancing is often sufficient).
- **Capacity and crowding** — as factor investing scales, especially in small-cap strategies, liquidity constraints and crowding can compress the very premiums investors are chasing.
- **Regime dependency** — factors can underperform for extended periods (value's 2007-2020 "lost decade"; momentum's sharp 2009 post-crisis reversal), testing investor patience even when the long-run premium is real.

## Key Takeaways

- Multi-factor models don't just add explanatory power — they reframe what a simpler model treats as random noise into systematic, compensable risk.
- APT and CAPM answer different questions: CAPM specifies the market portfolio and assumes equilibrium; APT only requires no arbitrage and doesn't pre-specify which factors matter.
- A factor discovered via data mining is not automatically a real, exploitable premium — persistence, pervasiveness, robustness to definition, and net-of-cost investability are the bar.
- Practical factor investing requires matching rebalancing frequency to each factor's decay speed, not using one cadence for all factors.

## Related Reading

- [Stock Factor Models: Decomposing Returns, Managing Risk, and Finding Alpha](/articles/stock-factor-models-comprehensive-guide) — full article with the APT vs. CAPM comparison table, ESG integration, and cross-asset factor correlations.
- [Watch on YouTube](https://youtu.be/z32X0C5F5JE)
