---
path: option-strategy/writing-naked-puts-wolfinger
title: "Writing Naked Puts: A Complete Guide"
articleSlug: writing-naked-puts-complete-interactive-guide
date: 2025-06-10
labels: [Options]
related: []
---

## Overview

A summary of Mark D. Wolfinger's *Writing Naked Puts* (Volume 1 of "The Best Option Strategies" series). Naked puts are a bullish strategy — less risky than owning stock outright — that profits if the stock rises, stays flat, or drops slightly. Often mislabeled as very risky, it's actually a conservative tool when managed properly; the real danger isn't the option, it's the risk-insensitive trader.

## The Strategy: Two Ways to Win

- **Earn Trading Profit** — sell a put, collect the premium, and hope it expires worthless. Ideal in neutral to mildly bullish markets.
- **Buy Stock at a Discount** — sell a put at a strike you're happy to own the stock at; if assigned, you buy at your predetermined price, effectively at a discount (strike price minus premium received).

**Key decisions**: choose a stock you genuinely want to own; strike price is a trade-off (farther OTM = lower premium but lower assignment risk and higher win probability; closer to the money = higher premium but higher assignment risk); expiration date is a trade-off (shorter term = lower premium but higher annualized return via faster theta decay and more gamma sensitivity; longer term = higher premium/protection but lower annualized return).

**Synthetic equivalence**: writing a naked put has the exact same risk/reward profile as writing a covered call — a fundamental concept in options trading.

## Risk & Management

**Primary risk**: the stock falls significantly, just like owning it outright. The premium collected provides a buffer — the stock must fall below (strike price − premium) before an unrealized loss occurs.

**Repair strategies when a trade goes wrong**: do nothing (valid if still content to own the stock at your effective price), close the position (buy back the put to lock in a loss and stop further damage), or roll the position (buy back the current put, sell a new one at a lower strike and/or later expiration). Crucial tip: do not stubbornly refuse to take a loss — the loss has already occurred whether or not you close the position. Only roll if the new trade is one you'd make as an independent decision.

**Trading expenses**: commissions matter given the frequent trading involved. Example: selling one put for $0.55 ($55) with a $15 commission and $20 assignment fee shrinks net profit to just $20. Solutions: a less expensive broker (best option), trading slightly more contracts, or writing higher-premium options ($1.50+).

**Margin requirements** (non-cash-secured puts): 20% of the underlying stock's value, plus the premium collected, minus the amount the put is out-of-the-money. Example: 10 contracts, $28 stock, $25 strike, $1.00 premium → $5,600 (20% of stock value) + $1,000 (premium) − $3,000 (OTM amount) = **$3,600 required margin**.

**After assignment**: don't just hold and hope — move to writing covered calls, the synthetic equivalent of selling a naked put, as the logical next step to keep generating income from the new shares.

## Getting Started

**Step 1 — Preparation**: build a watchlist of stocks you want to own and target prices; monitor put prices with limit orders; understand technical support levels. Tip: add commission cost to your target premium to hit an effective purchase price. Tip: write puts slightly *above* a support level — if it holds, you profit; if it breaks, you get an early exit warning.

**Step 2 — Thought process**: the investor's view (&ldquo;I'll either own shares at my target price, or keep the premium — I'm a winner either way&rdquo;) versus the trader's view (&ldquo;I'm giving up larger profit potential for a better chance to earn *any* profit in a range-bound market&rdquo;) — same trade, different rationale depending on your goal.

**Trader-specific tips**: avoid very low-priced options (under $0.10 — the reward doesn't justify the capital risk); be wary of weeklys (small premiums, large percentage losses from minor moves, need active management); most traders favor front-two-month expirations for faster theta.

**Step 3 — At expiration**: if OTM, usually best to do nothing and let it expire worthless (capital frees up Monday); don't sell new puts on the same stock before old ones are covered. If ITM, three choices: cover (close for a realized profit/loss), allow assignment, or roll (buy back and sell a new put, usually later-dated and lower-strike). Never roll just to stay active — only if the new trade is attractive on its own merits.

## Key Takeaways

- The book's two "wins" framing (earn premium or buy stock at a discount) is what distinguishes this from simple speculation — every outcome of a naked put sale is defined in advance as acceptable, which is the actual source of its "conservative" classification despite the unlimited-downside-sounding name.
- The margin formula example reveals a non-obvious mechanic: OTM amount is *subtracted* from the requirement, meaning the margin requirement shrinks as a put moves further out-of-the-money — the position that's statistically safest to hold also ties up the least capital.
- The investor-vs-trader dual perspective on the same UVW example is the book's way of showing that "correct" strategy selection depends entirely on your objective (owning the stock vs. generating income in a range-bound market), not on some universally optimal strike/expiration choice.

## Related Reading

- [Writing Naked Puts: A Complete Guide](/articles/writing-naked-puts-complete-interactive-guide)
