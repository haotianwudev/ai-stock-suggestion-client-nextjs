---
path: quant/dspx-dispersion-index
title: "DSPX: The Cboe S&P 500 Dispersion Index"
articleSlug: dspx-measure-market-divergence-cboe-sp500-dispersion-index
date: 2025-12-22
labels: [Quantitative Finance, Finance 101]
related: []
---

## Overview

While VIX measures how much the market fears a broad move, DSPX measures how differently individual stocks are moving relative to each other. DSPX is inversely linked to implied correlation: when index volatility is cheap relative to single-stock volatility, the market is implying stocks will move independently of one another, driving DSPX up.

## Key Concepts

- **Implied Correlation** — the core mechanism: an index's volatility is reduced when its components move in opposite directions (a diversification effect). Low correlation → high DSPX; high correlation → low DSPX.
- **The Dispersion Effect** — Stock A +5%, Stock B -5% nets to a flat, low-volatility index return, but dispersion (DSPX) is very high — the components moved a lot even though the index didn't.
- **The Correlation Crash** — in a panic, Stock A -5% and Stock B -5% together: index volatility (VIX) spikes while DSPX collapses, since everything is moving in the same direction.
- **Formula** — `DSPX ≈ √[ Σ(wᵢ × σᵢ²) − σ_index² ]`: the weighted average implied volatility of the 500 constituent stocks, minus the implied volatility of the index itself. DSPX is the &ldquo;leftover&rdquo; volatility the index structure eliminates through diversification.

## DSPX vs. VIX

- **VIX (Fear Gauge, Systematic Risk)** — measures the entire basket's volatility as a single unit; dominated by macro events (rates, geopolitics, recessions); when VIX spikes, stocks usually fall together.
- **DSPX (Opportunity Gauge, Idiosyncratic Risk)** — measures constituent volatility relative to the index; dominated by micro events (earnings, product launches, CEO changes); when DSPX spikes, stock pickers can outperform the index.

## Reading the Levels

- **10–20 (Low)** — high correlation, macro-driven market, hard to find alpha through stock picking.
- **20–30 (Normal)** — healthy market where fundamentals matter and moderate correlations prevail.
- **30+ (High)** — dislocation; extreme opportunity for active managers as stocks decouple from each other.

## Historical Regimes

- **Tech Bubble (2000)** — record-high DSPX as tech stocks exploded while Old Economy stocks stagnated.
- **GFC (2008)** — correlation went to 1; everything crashed together, so DSPX was relatively muted compared to VIX.
- **2023 &ldquo;Mag 7&rdquo;** — high DSPX as the Magnificent 7 rallied hard while the remaining 493 S&P 500 constituents stayed flat.

## Trading Strategies

- **Long Dispersion** — the bet that stocks move violently but in different directions while the index stays flat. The trade: short an index straddle (sell SPX volatility) + long constituent straddles (buy single-stock volatility). Best in earnings season, M&amp;A booms, or speculative bubbles.
- **Short Dispersion (Correlation)** — the bet that panic forces correlations toward 1.0 and everything crashes together. The trade: long an index straddle (buy SPX volatility) + short constituent straddles (sell single-stock volatility). Best during geopolitical crises, Fed rate hikes, or systemic banking failures.

## Portfolio Positioning by Regime

- **DSPX Low (Macro Dominance)** — a &ldquo;rising tide&rdquo; environment where fundamentals get drowned out; favor passive indexing (SPY, VOO, sector ETFs).
- **DSPX Average (The Stock Picker)** — a balanced market where diversification works well; favor a core-and-satellite approach (core index holdings plus selected active bets).
- **DSPX High (Alpha Paradise)** — extreme differentiation where buying the index is inefficient; favor concentrated active strategies (long/short equity, hedge fund approaches).

## Key Takeaways

- DSPX and VIX measure different things — VIX is systematic/macro fear, DSPX is idiosyncratic/stock-specific divergence — and they can move in opposite directions.
- Rising DSPX signals a stock-picker's market; falling DSPX (correlation spiking toward 1) signals a passive/macro-dominated market.
- The formula's intuition: DSPX is the volatility that diversification "hides" from the index level but is still present at the single-stock level.
- Dispersion trading (long or short) is a direct way to monetize the spread between index volatility and single-stock volatility rather than betting on market direction.

## Related Reading

- [DSPX: The Measure of Market Divergence](/articles/dspx-measure-market-divergence-cboe-sp500-dispersion-index) — full article with the formula derivation, historical regimes, and the complete trading strategy toolkit.
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vRQMkTeGVs00ktOo8cKiUlFewzE1EV-U0eGsnTeTvJ_xsFIc2ildzvPZ9Qcky1W_-U9vjhDl90WpRUf/pub)
