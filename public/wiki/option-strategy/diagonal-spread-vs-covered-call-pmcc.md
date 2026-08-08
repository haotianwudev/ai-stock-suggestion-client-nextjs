---
path: option-strategy/diagonal-spread-vs-covered-call-pmcc
title: "Diagonal Spread vs. Covered Call: A Strategic and Quantitative Comparison"
articleSlug: diagonal-spread-vs-covered-call-strategic-quantitative-comparison
date: 2025-08-02
labels: [Options]
related: []
---

## Overview

The covered call and the diagonal spread solve different problems despite superficial similarity. A covered call is an income-enhancement overlay on an existing stock position; a diagonal spread — most commonly expressed as the &ldquo;Poor Man's Covered Call&rdquo; (PMCC) — is a capital-efficient, defined-risk way to synthetically replicate that exposure without owning the underlying shares. They diverge sharply on capital requirements, risk profile, and — critically — their opposite reaction to implied volatility.

## Key Concepts

- **Covered call structure** — own 100+ shares, sell one call against them. The &ldquo;covered&rdquo; mechanism means the share obligation is fully collateralized, unlike a high-risk &ldquo;naked&rdquo; call.
- **Diagonal spread structure** — two options of the same type, different strikes AND different expirations (a hybrid of a vertical spread and a horizontal/calendar spread). A &ldquo;long&rdquo; diagonal buys a longer-dated option and sells a shorter-dated one for a net debit.
- **The Poor Man's Covered Call (PMCC)** — replaces 100 shares with a cheaper, long-dated, deep in-the-money call (often a LEAPS), against which a shorter-term OTM call is sold. Not just &ldquo;a cheap covered call&rdquo; — it's a leveraged, defined-risk position on an asset you don't own, with no dividend rights.

## Capital Requirement Comparison (Example: TECH @ $500)

| Metric | Covered Call | PMCC |
|---|---|---|
| Long Leg | Buy 100 shares @ $500 | Buy 1yr 400-strike call @ $120 |
| Short Leg | Sell 1mo 520-strike call @ $10 | Sell 1mo 520-strike call @ $10 |
| Net Capital Required | $49,000 | $11,000 |
| Maximum Risk | $49,000 (stock to $0) | $11,000 (net debit paid) |

## Risk/Reward Profiles

| | Covered Call | Diagonal Spread |
|---|---|---|
| Max Profit | Capped: (Strike − Stock Price) + Premium | Limited but variable; occurs if stock lands at the short strike at short expiration |
| Max Loss | Substantial: Stock Price − Premium | Defined & limited: the net debit paid |
| Breakeven | Stock Price − Premium | Approximately Long Strike + Net Debit (not precise, due to IV impact) |

## The Greeks: The Key Differentiator

| Greek | Covered Call | Diagonal (PMCC) | Implication |
|---|---|---|---|
| Delta | Moderately positive | Moderately positive | Both are bullish |
| Gamma | Negative | Slightly positive/neutral | Diagonal can accelerate gains |
| Theta | Positive | Positive (differential decay) | Both benefit from time passing |
| Vega | **Negative** | **Positive** | Opposing volatility preference |

The covered call is net short vega — it wants IV to fall, so the ideal entry is when IV is high (sell rich, profit from a &ldquo;vega crush&rdquo;). The diagonal spread is net long vega — it wants IV to rise, so the ideal entry is when IV is low (buy cheap, profit from expansion). This single difference governs which strategy fits which volatility regime.

## Position Management

- **Covered call**: primary risk is assignment (shares &ldquo;called away,&rdquo; especially near ex-dividend dates). Managed via rolling — up for more upside, down for more premium, out in time to continue.
- **Diagonal spread**: more complex due to two legs. Assignment on the short leg creates an unwanted short stock position, managed by rolling the short leg before expiration — the core ongoing task of running a PMCC, continuously generating income while reducing the long leg's cost basis.

## Decision Framework

**Use a covered call when**: you're a long-term holder of 100+ shares, neutral-to-moderately bullish, and want extra income from assets you already own.

**Use a diagonal spread when**: you're bullish but capital-constrained, want a defined-risk stock alternative, and are comfortable with higher complexity and more active management.

## Key Takeaways

- The Vega sign flip (negative for covered calls, positive for diagonals) is the single most decision-relevant fact in this comparison — it means the two strategies aren't interchangeable income tools, they're suited to opposite volatility environments (high IV favors covered calls, low IV favors diagonals/PMCC).
- The PMCC's capital efficiency (roughly 4-5x less capital in the example) comes with a real tradeoff, not a free lunch: no dividend rights, higher management complexity from rolling the short leg, and defined risk that's still a full loss of the net debit if the thesis fails.
- Choosing between these isn't about which is objectively "better" — it's a function of whether you already own the stock (covered call) or want synthetic, capital-efficient exposure to it (diagonal/PMCC), plus your view on where implied volatility is headed.

## Related Reading

- [Diagonal Spread vs. Covered Call](/articles/diagonal-spread-vs-covered-call-strategic-quantitative-comparison)
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vTp8O3f6sN5Q0eM06kjFAao-p3NWN6tpk_iZF-I32pAzpIVaE0Vt4cpmVluAlfqbyHPm8dy4xpHasCO/pub)
