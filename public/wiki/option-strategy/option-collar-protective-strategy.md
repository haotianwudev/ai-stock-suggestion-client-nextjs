---
path: option-strategy/option-collar-protective-strategy
title: "The Option Collar: Protect Gains, Define Risk"
articleSlug: option-collar-strategy-protect-gains-define-risk
date: 2025-09-20
labels: [Options]
related: []
---

## Overview

An option collar hedges a long stock position at low or zero net cost by combining a protective put (a floor) with a covered call (a ceiling), funding the put's cost with the call's premium. It's a capital-preservation strategy: you trade away some upside potential in exchange for a defined, capped downside.

## Key Concepts

- **The three pillars** — (1) Long the underlying 100 shares, (2) a long OTM protective put that sets a price floor, (3) a short OTM covered call that sets a price ceiling and funds the put via its premium.
- **Volatility skew and the "costless" collar** — OTM puts typically carry higher implied volatility (and are thus pricier) than equidistant OTM calls, since the market pays up for downside protection. Achieving a true zero-cost collar usually means selling a call closer to the current price than the put you buy, which shrinks your upside room — the "cost" is paid in forgone upside, not cash.
- **Early assignment risk** — if the stock rises above the short call's strike, the position can be assigned, forcing a sale of the shares, with risk highest right before ex-dividend dates.
- **Tax complexity** — establishing a collar in a taxable account can pause the stock's holding-period clock or trigger "straddle" rules, potentially converting long-term gains into short-term ones.

## Payoff Mechanics

With stock price S, put strike K_p, call strike K_c, and net premium (call premium − put premium):
- **Max profit** = (K_c − S) + net premium, capped once the stock rises to the call strike.
- **Max loss** = (S − K_p) − net premium, floored once the stock falls to the put strike.
- **Breakeven** = S − net premium.

## When It's a Good Fit

**Market environment**: indexes at/near all-time highs, post-earnings run-ups you want to lock in, or elevated geopolitical/economic uncertainty.

**Investor profile**: concentrated low-cost-basis stock positions (executives/long-time employees hedging without triggering a taxable sale), retirees who can't absorb a large drawdown, or long-term holders expecting near-term turbulence who are willing to trade upside for protection.

## Advanced Management

- **Rolling up** — as the stock rallies toward the short call, roll both legs to higher strikes to allow more upside room.
- **Rolling out** — as expiration nears, roll the whole position to a later date to maintain the hedge, typically for a small credit or debit.
- **"Legging in"** — entering the call and put at different times (e.g., selling the call when the stock looks overbought, buying the put after a pullback) can improve net premium but leaves the position temporarily unhedged or unfunded — a higher-risk technique.

## Risks and Pitfalls

- **Capped upside** — the most significant drawback; a large rally still only pays out up to the short call strike.
- **Early assignment** — can force an unwanted sale of shares, especially around dividend dates.
- **Tax complications** — holding-period pauses and straddle rules; consult a tax advisor before establishing a collar in a taxable account.
- **Whipsaw/sideways drag** — in a range-bound market both legs can expire worthless repeatedly, eroding any net debit paid over time.

## Key Takeaways

- A collar isn't free insurance — the "zero-cost" framing hides a real cost paid in reduced upside, driven by volatility skew making puts structurally more expensive than equidistant calls.
- The strategy is fundamentally about trading a defined, known risk/reward band for the uncertainty of an unhedged position — best suited to investors who prioritize capital preservation over maximizing gains.
- Tax treatment is a first-order consideration for taxable accounts, not an afterthought — collars can alter holding periods and trigger straddle-rule complications.

## Related Reading

- [Option Collar Strategy: Protect Gains, Define Risk](/articles/option-collar-strategy-protect-gains-define-risk)
- [Watch on YouTube](https://youtu.be/AuBIzqvQdEw)
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vSzPjT1iXtsc_FpV97jUUsi5EGSB-2VXBn6ZxKgeoEmL49X78m0pPHBxiIZPRuHrslQQBicBIh1bcn6/pub)
