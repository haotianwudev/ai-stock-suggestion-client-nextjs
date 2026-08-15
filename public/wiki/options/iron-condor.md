---
path: options/iron-condor
title: The Iron Condor
articleSlug: iron-condor-quantitative-delta-neutral-premium-harvesting
date: 2026-01-02
labels: ["OPTIONS", "QUANT"]
related: []
---

## Overview
The Iron Condor is a defined-risk, delta-neutral options strategy designed to generate alpha from market stagnation, time decay (Theta), and volatility contraction. It avoids predicting directional momentum and relies instead on the structural pricing inefficiency known as the Variance Risk Premium.

## The Quantitative Edge
The core alpha comes from the discrepancy between Implied Volatility (IV) and Historical Volatility (HV). Because IV generally overstates actual volatility (the "fear premium"), selling an Iron Condor allows traders to profit when the market moves less than the crowd expects.

## Structural Mechanics
Synthetically, an Iron Condor is the simultaneous execution of two vertical credit spreads (a Bull Put Spread and a Bear Call Spread). It consists of four legs:
1. **Buy Long Put (Floor):** Downside protection.
2. **Sell Short Put:** Lower bound of the profit zone.
3. **Sell Short Call:** Upper bound of the profit zone.
4. **Buy Long Call (Ceiling):** Upside protection.

## The Greeks Analysis
- **Delta (Δ):** Initially neutral, but becomes unstable as the market moves.
- **Theta (Θ):** The engine of profit. Time decay accelerates non-linearly.
- **Vega (ν):** Short volatility. Benefits from a "volatility crush".
- **Gamma (Γ):** The threat. Explodes near expiration (0-7 DTE), making small price moves cause massive Delta shifts.

## Optimal Execution & Management
- **Entry:** Enter at ~45 Days to Expiration (DTE) for optimal Theta/Gamma balance.
- **Exit:** Always close or roll at 21 DTE to avoid the "Gamma cliff" and tail risk.
- **Strikes:** Sell 20-30 Delta options. Wing width should be roughly 1/10th of the underlying stock price.
- **Defensive Tactics:** Roll the untested side if challenged, roll out in time to the next monthly cycle, or go inverted in extreme cases to lock in a straddle.

## Risks & Portfolio Sizing
- **Sizing:** Never allocate >5% of Net Liquidity to a single symbol. Keep 50% in cash (Buying Power) and diversify expiration cycles.
- **Dividend Risk:** Short calls risk early assignment before the ex-dividend date if the Put Extrinsic Value < Dividend Amount. Trade European-style indices (SPX, NDX) to mitigate this.

## Related Reading

- [The Iron Condor: A Quantitative Approach to Delta-Neutral Premium Harvesting](/articles/iron-condor-quantitative-delta-neutral-premium-harvesting)
- [Watch on YouTube](https://youtu.be/LC1qM2ps6NY)
