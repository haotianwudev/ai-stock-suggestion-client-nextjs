---
path: option-strategy/gex-methodology
title: GEX Calculation Methodology
articleSlug: ""
date: 2026-08-21
labels: ["Quantitative Finance", "Options Trading"]
related: ["option-strategy/options-viewer-methodology", "option-strategy/gex", "option-strategy/vol-regime-methodology"]
---

## Overview

This page is the implementation spec for the Gamma Exposure numbers shown in SOPHIE's **Options Viewer → Gamma (GEX)** tab: net GEX, the gamma flip level, and the call/put walls. [Gamma Exposure (GEX)](/wiki/option-strategy/gex) covers the concept; this page documents exactly how the platform computes it, which assumptions it makes, and where those assumptions could reasonably differ from another provider's.

The methodology follows the convention established by SqueezeMetrics' original GEX white paper and published by SpotGamma, so the levels are comparable to what those services report.

## Formula and Units

Per-strike dollar gamma exposure, expressed as **dollars of hedging flow per 1% move** in the underlying:

$$
\text{GEX}_i = \Gamma_i \times \text{OI}_i \times C \times S^2 \times 1\%
$$

- $\Gamma_i$ — option gamma at strike $i$
- $\text{OI}_i$ — open interest at that strike
- $C$ — contract multiplier (100)
- $S$ — spot price of the underlying

**The $S^2$ term is not a typo, and it is the most common place to go wrong.** Gamma is the change in delta per one *point* of underlying movement. Multiplying by $S \times 1\%$ converts that into the delta change over a 1% move, which yields a **share** count. Converting those shares into **dollars** requires a second factor of $S$:

$$
\underbrace{\Gamma \times \text{OI} \times C \times S \times 1\%}_{\text{shares to hedge}} \times \underbrace{S}_{\text{price per share}} = \text{dollars to hedge}
$$

Worked example — $\Gamma = 0.05$, 10,000 contracts, $C = 100$, $S = \$4{,}000$ (so a 1% move is $40):

- delta change per contract: $0.05 \times 40 \times 100 = 200$ shares
- shares across all contracts: $200 \times 10{,}000 = 2{,}000{,}000$ shares
- **notional dollars: $2{,}000{,}000 \times \$4{,}000 = \$8\text{B}$**

The viewer reports the dollar figure, scaled to millions.

## Dealer Sign Convention

The platform uses the standard **"naive" dealer assumption**: dealers are long the calls and short the puts that customers trade.

$$
\text{Net GEX} = \sum_{\text{calls}} \Gamma\,\text{OI}\,C\,S^2 (1\%) \;-\; \sum_{\text{puts}} \Gamma\,\text{OI}\,C\,S^2 (1\%)
$$

Calls contribute positive gamma, puts negative. This is a *modelling assumption*, not an observed fact — public open interest cannot prove which side of a contract the dealer is on. It is the same assumption every major public GEX service makes, which is why the levels are comparable, and it is the single largest source of model risk in the entire calculation.

## Scope: Whole Book

Net GEX, the gamma flip, and both walls aggregate across **all listed expirations**, not the expiration currently selected in the chain viewer. This matters more than it sounds: on a representative SPX chain, the front monthly alone printed net GEX of **−11.8** ($M per 1%) — a negative-gamma reading — while the whole book across ~18,000 contracts printed **+13,746**. Those are opposite regime calls from the same data.

A single-expiration view remains available via the **This Expiration** toggle. It answers a genuinely different question (what does *this* expiry's hedging flow look like) and is useful around a large expiration, but it is not the standard GEX reading and should not be compared to a provider's published levels.

## Strike Inclusion Band

Strikes within **±20% of spot** are included. Two competing pressures set this:

- Too narrow truncates the book. Far-OTM puts carry heavy open interest and contribute *negative* gamma, so a ±12% band overstated whole-book net GEX by roughly 50% versus a ±35% band.
- Too wide adds contracts whose gamma is negligible while multiplying the cost of the spot-shift simulation below.

Net GEX and the flip level both begin converging by ±20%, which is where the band sits.

## Gamma Flip (Zero Gamma)

The gamma flip is the **spot price at which aggregate dealer gamma crosses zero** — the boundary between the volatility-dampening (positive gamma) and volatility-amplifying (negative gamma) regimes.

Critically, it is a function of *spot*, not of strike. It is **not**:

- the strike where an individual bar changes sign (that is that strike's own local exposure — a real but different quantity), nor
- the strike where a cumulative running total crosses zero.

The computation re-prices the book:

1. For a candidate spot price $S'$, recompute **every** contract's gamma with Black-Scholes at $S'$, using that contract's own implied volatility and time to expiry.
2. Sum the position-signed exposure at $S'$.
3. Find where that sum crosses zero.

Implementation notes:

- **Gamma is genuinely repriced, not approximated.** An earlier version held each contract's observed gamma fixed and applied a Gaussian decay with a hardcoded 3%-of-spot width. That constant had no basis in any option's vol or expiry, and the output was largely a function of it — re-running with widths of 2% / 3% / 5% moved the reported flip to 7682 / 7673 / 7686 on identical data.
- **Implied vol is held constant** as spot moves ("sticky strike"). Repricing vol alongside spot is defensible but is a different model, and providers differ here.
- **Time to expiry is floored at half a session.** Black-Scholes gamma diverges as $T \to 0$, so without a floor a single 0DTE strike produces an unbounded spike that swamps the rest of the book.
- **Root-finding** is a coarse 1% sweep across ±8% of spot to bracket sign changes, then bisection to refine — roughly 30 full revaluations rather than 160, which is what makes whole-book repricing affordable.
- The flip and the **Spot Move Sim** curve share one evaluation function, so they cannot disagree. On live data the curve reading −11.8 at 7674 and +38.2 at 7751 interpolates to a zero crossing at 7692, which is exactly the reported flip.

## Call Wall and Put Wall

Both walls are the strike carrying the **largest gamma exposure** on their side — not the largest raw open interest. Raw OI is the wrong proxy: a deep ITM or far OTM strike can hold enormous legacy OI while contributing almost no gamma.

Two constraints make them stable and meaningful:

**Directional constraint.** The call wall is searched among strikes **at or above spot**, the put wall **at or below spot**. A call wall is overhead resistance and a put wall is downside support; unconstrained argmax lets both land on the same strike. On live SPX data an unconstrained search put the "put wall" at 7800 — the identical strike as the call wall, and 126 points *above* spot, which inverts what the line is supposed to mean.

**Smoothing.** Neighbouring SPX strikes routinely carry near-identical gamma, so a raw peak hops between adjacent strikes on trivial data refreshes. The peak is taken over a $[0.25, 0.5, 0.25]$-smoothed series, which keeps the wall anchored unless surrounding gamma genuinely shifts.

Note that SpotGamma's published definition does not explicitly require the walls to bracket spot. The constraint is applied here because without it the two levels can collapse onto one strike, and because it matches how the levels are used in practice.

## Reading the Output

| Reading | Dealer position | Hedging flow | Expected behaviour |
|---|---|---|---|
| Net GEX > 0 | Long gamma | Sell into strength, buy weakness | Dampened moves, mean reversion, pinning near large strikes |
| Net GEX < 0 | Short gamma | Buy strength, sell weakness | Amplified moves, trend continuation, levels break more easily |
| Spot above flip | Typically long gamma | — | Stabilising regime |
| Spot below flip | Typically short gamma | — | Unstable regime |

## Limitations

- **The dealer sign convention is an assumption.** Public OI cannot establish who is long or short. A day where customers are net *sellers* of puts inverts the true sign for that flow.
- **Open interest is stale.** It is published once daily and does not reflect intraday positioning.
- **Walls are not hard barriers.** They mark where hedging flow concentrates, not a ceiling or floor. SpotGamma is explicit that the call wall "should not be treated as an automatic ceiling" and the put wall is "not an automatic floor."
- **Different providers publish different levels** for the same underlying, because inventory assumptions, vol inputs, expiry filters, and strike bands all differ. Levels here are internally consistent and methodologically standard; they are not authoritative.

## Key Takeaways

- GEX in dollars requires $S^2$, not $S$ — the $S$ version is a share count.
- Net GEX, flip, and walls are **whole-book** metrics; single-expiration readings can invert the regime call.
- The flip is a spot price found by *repricing* gamma across hypothetical spots, not a strike read off a chart.
- Walls are gamma peaks constrained to their own side of spot, smoothed for stability.
- Every number here rests on an unprovable assumption about which side of the trade the dealer is on.

## Related Reading

- [Gamma Exposure (GEX)](/wiki/option-strategy/gex) — the underlying concept
- [Volatility Regime & VRP Methodology](/wiki/option-strategy/vol-regime-methodology) — the companion volatility-regime spec
- [SpotGamma — Gamma Exposure (GEX)](https://spotgamma.com/gamma-exposure-gex/)
- [SqueezeMetrics research guide](https://squeezemetrics.com/monitor/static/guide.pdf)
