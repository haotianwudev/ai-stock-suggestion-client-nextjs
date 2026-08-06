---
path: quant/kelly-criterion
title: The Kelly Criterion
articleSlug: kelly-criterion-optimal-position-sizing-information-theory
date: 2026-06-23
labels: [QUANT]
---

## Overview
Developed in 1956 by John Larry Kelly Jr. at AT&T's Bell Laboratories, the Kelly Criterion is a mathematically rigorous risk allocation formula. Its goal is to maximize the long-term expected value of the logarithm of wealth—which equates to maximizing the long-term geometric growth rate of a portfolio. It emerged from Information Theory, proving that capital could grow exponentially at a rate precisely equal to the rate of information transmission over a noisy communication channel.

## Key Concepts
- **Logarithmic Utility Function** — Strongly penalizes total ruin (as log(0) approaches negative infinity), inherently preventing a bettor from risking 100% of their capital on any single event.
- **Fractional Kelly** — Sizing positions at half (0.5x) or quarter (0.25x) of the mathematically optimal Kelly fraction. Sacrifices a small amount of expected growth in exchange for exponentially lower variance and a drastically reduced probability of a catastrophic drawdown.
- **Estimation Risk** — The vulnerability that probabilities are never known with certainty. The Kelly formula is extremely sensitive to these inputs, particularly the Expected Mean Return. Overestimating edge leads directly to over-leveraging and ruin.

## Formulas

**The Discrete Binary Kelly Formula**
$$
f^* = \frac{bp - q}{b}
$$
Where **f\*** is the optimal fraction to wager, **p** is the probability of winning, **q** is the probability of losing, and **b** is the payout ratio.

**Continuous Kelly (Merton Fraction)**
$$
f^* = \frac{\mu - r}{\sigma^2}
$$
Where **μ** is expected return, **r** is the risk-free rate, and **σ²** is variance. It determines position sizing for continuous markets following Geometric Brownian Motion.

## Key Takeaways
- Finding an edge (alpha) is only half the equation; optimal position sizing is strictly required for long-term survival.
- A trader with a mediocre edge but excellent risk management will compound wealth, while a trader with brilliant edge but flawed sizing will face ruin.
- Institutions almost never trade "Full Kelly." The psychological tolerance required to endure the massive drawdowns associated with Full Kelly makes Fractional Kelly the practical standard.

## Related Reading
- [The Kelly Criterion: Optimal Position Sizing from Information Theory to Practice](/articles/kelly-criterion-optimal-position-sizing-information-theory)
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vRYRSb1Buipf_L70N9WiFFK8giTqIcy6v_i7iOH9Q7QUBiYxutn8fhCvs0Ky7WoMcUjy2MVPQyBmGdD/pub)
