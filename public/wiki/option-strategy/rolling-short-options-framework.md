---
path: option-strategy/rolling-short-options-framework
title: "Rolling Short Options: A Defensive and Offensive Framework"
articleSlug: strategic-framework-rolling-options-quantitative-approach
date: 2025-09-13
labels: [Options]
related: []
---

## Overview

Rolling — simultaneously closing an existing option and opening a new one on the same underlying, at a different strike and/or expiration — is a core position-management tool with two distinct modes: defensive rolling to repair a challenged position, and offensive rolling to redeploy capital from an already-profitable one.

## Universal Principles (Non-Negotiable)

1. **Thesis validity check** — only roll if the original reason for the trade is still valid. If the thesis is broken, close and take the loss instead.
2. **The net credit mandate (defense)** — a defensive roll must be for a net credit; this lowers the breakeven, which is the mathematical mechanism that repairs a losing trade.
3. **Volatility (Vega) awareness** — rolling is easiest when IV Rank is above 50, since high IV inflates the premium collected.
4. **DTE & gamma risk** — proactively manage at or before 21 days to expiration to avoid the accelerated decay and unpredictable gamma of the final weeks.
5. **Capital efficiency question** — treat a roll as an active decision to enter a *new* trade, not as "saving" the old one; compare it against every other opportunity, and never roll purely to avoid admitting a mistake.

## Defensive Rolling

Used when a position is challenged by adverse price movement.

| | Short Put | Short Call (Covered) |
|---|---|---|
| Maneuver | Roll Down & Out | Roll Up & Out |
| Trigger | Price falls toward/below strike | Price rises toward/above strike |
| Delta trigger | ~-0.35 to -0.50 | ~0.35 to 0.50 |
| DTE trigger | ≤21 days | ≤21 days |
| Core rule | Must collect a net credit | Roll for credit to avoid assignment |
| If credit roll impossible | Accept assignment (if thesis holds) or close for a loss (if broken) | Often best to do nothing and allow assignment — this realizes max profit on the covered call |

## Offensive Rolling

Used when a position is already profitable and has little premium left to decay ("dead money").

| | Short Put | Short Call |
|---|---|---|
| Maneuver | Roll Up & Out | Roll Down & Out |
| Trigger | Captured 80-90% of max profit, delta near zero | Captured 80-90% of max profit, delta near zero |
| Core rule | New premium should be substantial (e.g., a "3x Premium Rule": new premium > 3x cost to close) | New strike should have higher Theta (active theta harvesting — a deep OTM option decays slowly, one closer to price decays fast) |

## Decision Framework: Roll, Close, or Hold?

| Scenario | Thesis | Status | Action |
|---|---|---|---|
| Strike breached | Intact | Losing | Defensive roll (credit) |
| Strike breached | Broken | Losing | Close position |
| Max loss hit (2-3x credit) | Irrelevant | Max loss | Close position |
| Moves strongly in favor | Intact | Profitable (>80%) | Offensive roll (credit) |
| Slightly profitable/flat near expiry | Intact | Near breakeven | Hold or roll out |
| Deeply OTM near expiry | Irrelevant | Losing (near max) | Let expire / close |

**The 80% rule**: consider rolling an offensive position once 80%+ of the initial premium is captured — the remaining profit rarely justifies the risk/capital still tied up.

**The maximum loss rule**: close any position once losses reach 2-3x the initial credit received, regardless of thesis validity — this is a hard risk-management stop, not a discretionary call.

## Pre-Roll Checklist

Thesis still 100% valid? Rolling for a defensible reason (not just avoiding a loss)? Can it be done for a meaningful net credit? Is the new breakeven a real improvement? Would you enter this exact new position fresh today? Have you accounted for the current IV/Vega environment and transaction costs?

## Key Takeaways

- The single mechanical requirement that separates a sound defensive roll from wishful thinking is the net credit mandate — if a credit roll isn't available, the discipline is to accept assignment or close, not to roll for a debit.
- Offensive and defensive rolls are directionally opposite maneuvers for puts vs. calls (down-and-out vs. up-and-out) depending on which side is challenged vs. profitable — the mnemonic is "roll toward where the risk now is."
- The capital-allocation reframe — evaluating a roll as a brand-new trade rather than a rescue of an old one — is the single mental model most likely to prevent rolling purely out of loss aversion.

## Related Reading

- [Defensive and Offensive Rolling on Short Options](/articles/strategic-framework-rolling-options-quantitative-approach)
- [Watch on YouTube](https://youtu.be/q5FSpOKtcFM)
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vSTKltePzIDadeG7XV_9boPEYxEe3apzPnmMOTV_wrn9XGG0JcEvLY3_FL0BlqpC-gUAX-ZUfE0eOGv/pub)
