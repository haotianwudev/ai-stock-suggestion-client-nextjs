---
path: quant/sticky-strike-vs-sticky-delta-volatility-surface-dynamics
title: Volatility Surface Dynamics
articleSlug: sticky-strike-vs-sticky-delta-volatility-surface-dynamics
date: 2026-05-09
labels: ["Quantitative Finance"]
related: []
---

## Overview
A comprehensive deep dive into the geometry of market risk and the volatility surface. This guide covers the Total Derivative, Shadow Delta, Skew Stickiness Ratio (SSR), and how to calculate true Greeks that account for the dynamic relationship between spot price and implied volatility.

## 1. The Geometry of Market Risk
- **The Problem with Black-Scholes:** BS assumes volatility ($\sigma$) is constant. In reality, volatility is a dynamic surface that moves as the underlying price ($S$) moves.
- **The Total Derivative:** To calculate the true risk of an option, we must account for changes in volatility caused by changes in spot price.
  $$ \frac{dV}{dS} = \frac{\partial V}{\partial S} + \frac{\partial V}{\partial \Sigma} \times \frac{d\Sigma}{dS} $$
  *(Total Delta = Model Delta + Shadow Delta)*
- **The "Shadow Delta" Trap:** If you hold a long call and the market rallies, $\Sigma$ typically drops (since $d\Sigma/dS < 0$). You make money on price but lose on Vega. Thus, your true Delta is lower than the BS Delta.

## 2. Regime 1: Sticky Strike
- **The Theory:** The volatility skew is a static curve painted onto the absolute price axis. 
- **The Mechanics:** $\frac{\partial \Sigma(K, S)}{\partial S} = 0$. If the spot moves, the volatility of a fixed strike $K$ does not change.
- **Impact on ATM Volatility:** If the market rallies along a downward-sloping skew, the new ATM strike is higher, meaning the ATM volatility drops. Market Rally = ATM Vol Drop.
- **Market Application:** Typically describes equity index options (like the S&P 500) during normal market conditions. Equities have a strong negative correlation between spot and volatility.

## 3. Regime 2: Sticky Delta
- **The Theory:** The volatility skew is attached to moneyness (or Delta), floating alongside the spot price.
- **The Mechanics:** $\frac{\partial \Sigma(M, S)}{\partial S} = 0$ (where $M = K/S$). If the spot moves, the entire volatility curve shifts horizontally with it. 
- **Impact on ATM Volatility:** The ATM volatility remains completely unchanged regardless of where the spot price goes.
- **Market Application:** Typically describes FX markets or individual commodities where the volatility depends more on the relative distance from the current price than on absolute price levels.

## 4. The Skew Stickiness Ratio (SSR)
- **The Reality:** Markets rarely perfectly obey Sticky Strike or Sticky Delta. The true dynamic lies somewhere in between.
- **SSR Definition:** A metric developed by Derman (1999) that quantifies exactly how the volatility surface shifts.
  $$ \text{SSR} = \frac{\text{Actual change in implied vol}}{\text{Expected change under Sticky Strike}} $$
- **SSR Values:**
  - `SSR = 1.0`: Pure Sticky Strike.
  - `SSR = 0.0`: Pure Sticky Delta.
  - `SSR ≈ 1.5 - 2.0`: Real Market (e.g., S&P 500). Volatility overshoots the sticky strike assumption during violent sell-offs.

## 5. Practical Implications
- **Risk Management:** Misidentifying the regime leads to "P&L Leakage" (mysterious profits/losses) and significantly underestimates VaR during market crashes.
- **Rule of Thumb Adjustments:**
  - *Adjusted Delta:* $\Delta_{\text{adj}} \approx \Delta_{\text{BS}} + \text{Vega} \times (\text{Skew}_{\text{slope}} / \text{Spot})$
  - *Adjusted Gamma:* $\Gamma_{\text{adj}} \approx \Gamma_{\text{BS}} + 2 \times \text{Vanna} \times (d\Sigma/dS)$

## Related Reading

- [Sticky Strike vs. Sticky Delta: The Hidden Dynamics of the Volatility Surface](/articles/sticky-strike-vs-sticky-delta-volatility-surface-dynamics)
- [Watch on YouTube](https://youtu.be/LgSXvwCOy0o)
