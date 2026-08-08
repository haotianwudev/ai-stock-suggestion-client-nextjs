---
path: option-strategy/volume-open-interest-analysis
title: "Decoding Options Volume and Open Interest"
articleSlug: decoding-options-market-volume-open-interest-analysis
date: 2025-11-01
labels: [Options Trading]
related: []
---

## Overview

Volume and Open Interest (OI) are the two foundational activity metrics in options trading, and confusing them is one of the most common beginner mistakes. Volume measures how many contracts traded today and resets to zero each session; Open Interest is a cumulative count of all contracts still outstanding, offering a longer-term read on market conviction. Analyzed together with price, they reveal whether a move is backed by genuine new positioning or just existing traders unwinding.

## Key Concepts

- **Volume** — total contracts traded in a period. High volume signals high liquidity and interest at a given strike/expiration, but says nothing on its own about whether positions are opening or closing.
- **Open Interest (OI)** — total outstanding contracts not yet closed or exercised. Rising OI alongside rising volume signals genuinely new capital committed to a position; volume without OI growth often just means day-trading in and out of the same contracts.
- **The Price/Volume/OI Trinity** — the three signals together classify conviction: rising price + rising volume + rising OI = strongly bullish (new money); rising price + falling volume/OI = weakening rally likely driven by short-covering, not new buying.
- **OI as structural support/resistance** — large put OI at a strike creates a price floor (put sellers hedge by buying the underlying as price approaches); large call OI creates a price ceiling (call sellers hedge by selling as price approaches). These "OI walls" become more influential near expiration.

## Put/Call Ratio (PCR)

- **Volume PCR** (Put Volume / Call Volume) — a snapshot of today's trading mood.
- **OI PCR** (Put OI / Call OI) — reflects longer-term cumulative positioning.
- **Contrarian reading** — PCR above ~1.0 signals excessive fear (often a contrarian bullish signal, since sellers may be scarce); PCR below ~0.7 signals excessive greed (often a contrarian bearish signal).

## Spotting Unusual Options Activity (UOA)

- **Volume > Open Interest** on a specific contract is the key tell: it means today's activity exceeds all previously existing contracts, so the flow is entirely new positioning, not closing out old trades.
- **Large premiums on OTM, short-dated options** suggest a directional conviction bet rather than routine hedging.
- **Sweeps** — large orders split across multiple exchanges to fill quickly — signal urgency, often associated with informed flow.
- End-of-day OI data confirms or contradicts an intraday move: an intraday rally on high volume that turns out to have *decreased* OI at the close was driven by short-covering, not new buying — a materially different signal than it first appeared.

## Academic Foundations

- **Kyle's (1985) model** of informed trading provides the theoretical basis for price impact from order flow (the "lambda" coefficient), extended to options markets.
- **Easley, O'Hara, and Srinivas (1998)** found options markets often lead equity markets in price discovery by 15-30 minutes, since informed traders prefer options for their leverage and defined downside risk.
- **Bakshi, Cao, and Chen (1997)** showed the volatility skew (put IV vs. call IV) carries forward-looking information about market expectations beyond simple directional positioning.
- **Dealer gamma exposure** (building on Perignon & Villa, 2002, and practitioner work like SpotGamma) explains why markets can whipsaw or stay pinned: when dealers are net short gamma they must hedge by selling into declines and buying into rallies, amplifying moves; when long gamma, hedging dampens volatility and reinforces support/resistance.

## Key Takeaways

- Never read volume in isolation — always pair it with the OI change to distinguish new positioning from position unwinding.
- A price move without OI confirmation is a weaker signal than the same move accompanied by rising OI.
- Extreme Put/Call Ratio readings are more useful as contrarian sentiment gauges than as simple directional signals.
- Dealer gamma positioning (not just retail sentiment) is a structural force behind why some rallies/declines accelerate while others get pinned near round strikes.

## Related Reading

- [Decoding the Options Market: Volume & Open Interest Analysis](/articles/decoding-options-market-volume-open-interest-analysis) — full article with the price/volume/OI interpretation table and gamma exposure framework.
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vTPVO8a1EpsE5aZcZLqLf2V8kABWtqnZfPCLuPclso4_uYCwca8wMn33AGgVmq2nGFrbws-eii0JMF3/pub)
