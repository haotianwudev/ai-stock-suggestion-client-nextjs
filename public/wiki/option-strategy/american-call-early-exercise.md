# American Call Early Exercise

## Overview
Understanding when it is mathematically optimal to early exercise an American call option, specifically focusing on the impact of discrete cash dividends and the trade-off between intrinsic and time value.

## Key Concepts
- **Time Value vs. Intrinsic Value:** When exercising early, an option holder captures intrinsic value but immediately forfeits all remaining time value.
- **The Dividend Dilemma:** It is *never* optimal to exercise an American call on a non-dividend paying stock early. The only economic rationale for early exercise is to capture an impending discrete dividend before the ex-dividend date.
- **Black's Approximation:** A pseudo-American valuation method that compares the value of holding the option to expiration versus exercising just prior to the ex-dividend date.
- **Longstaff-Schwartz Method (LSM):** A Monte Carlo simulation technique using backward induction and least-squares regression to estimate the optimal exercise boundary and continuation value across simulated price paths.

## Mathematical Formulation
The foundational condition for early exercise is that the captured dividend must exceed the forfeited time value:
$$ D > \text{Time Value} $$

The critical stock price $S^*$ at which an investor is indifferent between exercising and holding is given by:
$$ S^* - K = C_{\text{European}}(S^* - D, T - t_d) $$

### Monte Carlo Simulation (GBM)
The underlying stock price path is simulated under the risk-neutral measure:
$$ S_{t+\Delta t} = S_t \exp\left( \left( r - \frac{1}{2}\sigma^2 \right)\Delta t + \sigma \varepsilon \sqrt{\Delta t} \right) $$

## Key Takeaways
- **Deep ITM Requirement:** Early exercise is generally only optimal for deep in-the-money options where the remaining time value is minimal.
- **Timing:** If optimal, early exercise should occur immediately prior to the ex-dividend date to maximize the preservation of time value up to that point.
- **Computational Power:** The Longstaff-Schwartz method overcomes the curse of dimensionality, allowing American option valuation across multiple assets and complex stochastic processes where traditional binomial trees fail.

## Related Reading
- Black-Scholes Option Pricing
- Monte Carlo Methods in Quantitative Finance
- Dividend Impact on Option Pricing
