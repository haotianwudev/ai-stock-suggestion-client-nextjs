---
path: quant/ah-premium-puzzle
title: Cross-Border Dual-Listed Equities & AH Premium Puzzle
articleSlug: pricing-cross-border-dual-listed-equities
date: 2026-07-08T00:00:00.000Z
labels: ["Quantitative Finance", "Finance 101"]
related: []
---

## Overview
The Law of One Price is a foundational axiom in finance, asserting that two identical assets should trade at the same price. This law is systematically violated in the Chinese equity market, where companies simultaneously list "A-shares" on mainland exchanges (Shanghai/Shenzhen) and "H-shares" in Hong Kong. Despite identical dividend entitlements, A-shares historically trade at a massive, volatile premium to H-shares, known as the AH Premium Puzzle.

## Key Concepts
- **A-Share Market** — Mainland Chinese market characterized by high liquidity, retail-driven speculation, and high turnover rates.
- **H-Share Market** — Hong Kong market dominated by global institutional investors focused on strict fundamental valuation.
- **Liquidity Premium** — The compensation investors demand for the cost and risk of illiquidity. Modeled by metrics like Amihud Measure and Pastor-Stambaugh reversals.
- **Limits to Arbitrage** — Structural barriers that prevent arbitrageurs from forcing prices to converge, such as agency frictions, idiosyncratic risk, and short-sale constraints.
- **Capital Outflow Controls** — Strict government restrictions preventing domestic retail investors from transferring capital offshore to buy cheaper H-shares. This traps massive liquidity onshore, driving the AH premium.

## Formulas

### The Liquidity-Adjusted CAPM (LCAPM)
$$
E(R_i) = R_f + E(c_i) + \lambda\beta_{net}^i
$$
Where $R_f$ is the risk-free rate, $E(c_i)$ is the expected illiquidity cost, and $\lambda$ is the market price of risk.

### Cointegration Spread
$$
e_t = P_t^A - \beta P_t^H
$$
Used to model the long-term equilibrium spread between non-stationary price series.

### Vector Error Correction Models (VECM)
$$
\Delta P_t^A = \alpha_A(P_{t-1}^A - \beta P_{t-1}^H) + \sum \gamma_{A,i}\Delta P_{t-i}^A + \sum \delta_{A,i}\Delta P_{t-i}^H + \varepsilon_t^A
$$
$$
\Delta P_t^H = \alpha_H(P_{t-1}^A - \beta P_{t-1}^H) + \sum \gamma_{H,i}\Delta P_{t-i}^A + \sum \delta_{H,i}\Delta P_{t-i}^H + \varepsilon_t^H
$$
Models long-term equilibrium and short-term dynamics simultaneously, where $\alpha$ represents the speed of adjustment.

## Key Takeaways
- **Structural Frictions Override Theory**: Calculating a theoretical "fair value" based on identical cash flows is insufficient if institutional frictions prevent capital from forcing convergence.
- **Microstructure Asymmetry**: The AH premium is driven by divergent market demographics (retail vs. institutional), capital controls, and asymmetric tax regimes.
- **Quantitative Trading Strategy**: Quants use statistical arbitrage techniques like VECM and Machine Learning models to harvest alpha from mean-reverting properties of the AH spread, factoring in threshold cointegration due to transaction costs.

## Related Reading

- [The Pricing of Cross-Border Dual-Listed Equities](/articles/pricing-cross-border-dual-listed-equities)
- [Watch on YouTube](https://youtu.be/dbnmFlVnOQQ)
