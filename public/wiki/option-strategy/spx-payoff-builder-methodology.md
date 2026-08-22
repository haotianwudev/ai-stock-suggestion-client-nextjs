---
path: option-strategy/spx-payoff-builder-methodology
title: Multi-Leg Payoff & Probability of Profit Methodology
articleSlug: ""
date: 2026-08-21
labels: ["Quantitative Finance", "Options Trading"]
related: ["option-strategy/options-viewer-methodology", "option-strategy/option-greeks-overview", "option-strategy/navigating-option-trading-strategies-taxonomy"]
---

## Overview

Implementation spec for SOPHIE's SPX Payoff Builder — multi-leg P&L at expiration, the "T+0" mark-to-market curve, net position Greeks, and risk-neutral probability of profit (POP). These are the standard tools professional and retail options traders alike use to plan a trade *before* placing it: what it pays off, what it's worth today if the market doesn't move, how exposed it is, and how likely it is to work.

## P&L at Expiration ($T=0$)

The payoff of an $N$-leg position once every option has settled:

$$
\text{PnL}(S_T) = \sum_{i=1}^N \text{Quantity}_i \times \text{Sign}_i \times \left[ \text{IntrinsicValue}(S_T, K_i, \text{Type}_i) - \text{Premium}_i \right] \times 100
$$

where $\text{Sign}_i = +1$ for a long leg and $-1$ for short. This is the "hockey stick" diagram every options course starts with — a straight-line, closed-form payoff that requires no volatility model at all, because at expiration every option is worth exactly its intrinsic value.

**How it's used:** this is how a trade is sized *before* it's opened. Max loss and max profit are read directly off the diagram; breakeven strikes are where it crosses zero. Defined-risk strategies (spreads, condors, butterflies) are specifically built so this curve is bounded on both sides — the diagram is the risk-management case for the trade, not just an illustration of it.

## "T+0" Mark-to-Market Curve

The expiration diagram answers "what does this pay off eventually." It says nothing about what the position is worth *tomorrow*, which is usually the more urgent question for anyone managing a live position. That requires actually pricing each leg today, not just at expiry:

1. **Solve for implied volatility.** Each leg's entry premium is inverted to its exact Black-Scholes $\sigma_i$ by bisection on the mid price — the position's IV assumptions come from what was actually paid, not a smile model.
2. **Reprice at hypothetical spot levels.**
   $$
   \text{Value Today}(S') = \sum_{i=1}^N \text{Quantity}_i \times \text{Sign}_i \times \left[ C_{\text{BS}}(S', K_i, T, r, q, \sigma_i) - \text{Premium}_i \right] \times 100
   $$

**How it's used:** this is the curve a trader actually watches while a position is open. It shows current unrealized P&L across a range of prices with today's remaining time value still priced in — which is why it sits *inside* the expiration diagram (time value cushions losses and caps gains before expiry). Comparing the two curves is how a trader decides whether to hold, adjust, or take profit early: a position near its T+0 profit target with weeks of time value left is a very different decision than the same P&L two days before expiration.

## Net Position Greeks

Per-leg Greeks aggregated by position direction and contract size:

$$
\text{Net Delta} = \sum \pm Q_i \cdot 100 \cdot \Delta_i, \quad \text{Net Gamma} = \sum \pm Q_i \cdot 100 \cdot \Gamma_i
$$

$$
\text{Net Theta} = \sum \pm Q_i \cdot 100 \cdot \Theta_i, \quad \text{Net Vega} = \sum \pm Q_i \cdot 100 \cdot \mathcal{V}_i
$$

**How it's used:** this is the standard risk dashboard for a multi-leg book, and it's genuinely how professional desks manage exposure — not by tracking each leg individually, but by watching the net numbers.

- **Net delta** near zero is the entry condition for most credit-selling strategies (iron condors, straddles): the position starts direction-neutral.
- **Net theta** is the daily carry — positive for premium sellers, negative for premium buyers — and is what a theta-decay strategy is explicitly harvesting.
- **Net gamma** measures how fast delta will move if the underlying does. A large short-gamma position (short straddles, naked short options) needs active delta-hedging as price moves, which is the origin of "gamma scalping" as a trading style.
- **Net vega** is exposure to implied vol itself, independent of direction — a long-vega position profits if IV rises even with the underlying unchanged, which is the whole basis of buying volatility ahead of an event.

## Risk-Neutral Probability of Profit

The probability the position finishes with $\text{PnL} > 0$ at expiration, under risk-neutral lognormal drift $\mu = r - q - \sigma^2/2$:

1. Find every breakeven (zero-crossing) strike $B_1, \dots, B_m$.
2. Partition the price domain into intervals between them.
3. For each *profitable* interval $[L_k, U_k]$, integrate the lognormal CDF:
   $$
   P(L_k < S_T < U_k) = \Phi\!\left( \frac{\ln(S/L_k) + \mu T}{\sigma\sqrt{T}} \right) - \Phi\!\left( \frac{\ln(S/U_k) + \mu T}{\sigma\sqrt{T}} \right)
   $$
4. $\text{POP} = \sum_{k \in \text{Profitable}} P(L_k < S_T < U_k)$.

**How it's used, and its central caveat:** POP is the single most commonly cited number in retail options education for comparing trade structures — a 70% POP iron condor "sounds" safer than a 50-delta strangle. But POP and *expected value* are different things: a high-POP credit spread typically has a small max profit against a large max loss, so it can have a high win rate and still lose money over time if the rare loss is large enough. POP measures how often a trade wins, not how much. This is also the risk-neutral (option-implied) probability, not the real-world one — the two coincide only if the market's volatility risk premium is zero, which the [VRP methodology](/wiki/option-strategy/vol-regime-methodology) page shows is not generally true.

## Implied Price Ranges (Confidence Intervals)

Two models for "where is the underlying likely to be" at a given confidence level $c$.

**Flat ATM model** — symmetric, using a single volatility for both tails:

$$
\text{Boundary}_{\text{lower/upper}} = S \cdot \exp\!\left( \mu T \pm \sigma_{\text{ATM}}\sqrt{T} \cdot z_{(1+c)/2} \right)
$$

For $68\%$ confidence ($1\sigma$), $z = 1.000$; for $80\%$, $z = 1.28155$.

**Skew-adjusted model** — asymmetric, repricing each boundary with the *actual* market implied volatility at that strike rather than one flat number, iterated to a fixed point:

$$
\text{Upper}^{(n+1)} = \text{Boundary}\left(S, T, r, q, \sigma(\text{Upper}^{(n)}), +z\right), \qquad
\text{Lower}^{(n+1)} = \text{Boundary}\left(S, T, r, q, \sigma(\text{Lower}^{(n)}), -z\right)
$$

Because index options carry negative skew (puts trade at higher IV than calls — see [Volatility Smile & Skew](/wiki/option-strategy/volatility-smile-skew)), this produces a **wider downside boundary and a tighter upside boundary** than the flat model.

**How it's used:** this is the market-implied version of "how far could this move," and the skew-adjusted range is the more honest one for index products specifically — it's the direct numerical expression of the market pricing crashes as more likely than equivalent rallies. Traders selling strangles or setting protective-put strikes reference the skew-adjusted range rather than the symmetric one for exactly this reason: a symmetric range built on ATM vol alone understates downside and overstates upside for something like SPX.

## Limitations

- **POP is risk-neutral, not physical.** It reflects the market's pricing, including its volatility risk premium, not a forecast of actual outcomes.
- **IV solved from entry premium is frozen at entry.** The T+0 curve does not itself model how IV might change as spot moves (no vol skew dynamics), only how the position reprices at the entry-implied vol.
- **Every model here assumes European exercise and no early assignment** — correct for SPX (cash-settled index options), not for American-style single-name equity options.

## Key Takeaways

- The expiration diagram is closed-form and model-free; the T+0 curve requires solving each leg's IV and repricing with Black-Scholes.
- Net Greeks are the real risk dashboard professional desks use — delta for direction, theta for carry, gamma for hedging urgency, vega for vol exposure.
- POP measures win rate, not expected value — a high-POP trade can still have negative expectancy.
- Skew-adjusted ranges are wider on the downside for index options, reflecting real market-priced crash risk.

## Related Reading

- [Options Viewer Methodology](/wiki/option-strategy/options-viewer-methodology) — index of all viewer specs
- [Option Greeks Overview](/wiki/option-strategy/option-greeks-overview)
- [Volatility Smile & Skew](/wiki/option-strategy/volatility-smile-skew)
- [Navigating the Options Strategy Taxonomy](/wiki/option-strategy/navigating-option-trading-strategies-taxonomy)
