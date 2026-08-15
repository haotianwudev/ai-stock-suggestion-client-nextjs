---
path: quant/unpacking-cds-granular-deep-dive-credit-default-swaps
title: Unpacking CDS: A Granular Deep-Dive
articleSlug: unpacking-cds-granular-deep-dive-credit-default-swaps
date: 2026-05-13
labels: ["Quantitative Finance"]
related: []
---

## Overview
A comprehensive quantitative analysis of Credit Default Swaps (CDS) from basic bilateral insurance mechanics to advanced Greeks. It covers hazard rates, the Credit Triangle, the Big Bang standardization, CS01 risk sensitivities, and professional stress testing frameworks used by institutional credit desks.

## 1. Foundational Intuition
- **Bilateral Payout Mechanism:** A CDS separates credit risk from a loan/bond. The Protection Buyer pays a spread (premium); the Protection Seller assumes the risk and pays out (1 - Recovery Rate) upon a default.
- **Reference Entity vs. Obligation:** The entity is the corporation/sovereign; the obligation determines the seniority.
- **Insurable Interest:** Unlike standard insurance, buyers don't need to own the underlying bond, enabling long/short credit trading strategies.
- **ISDA Credit Events:** Triggers include Bankruptcy, Failure to Pay, Restructuring (often excluded from corporate CDS as "No-R", but standard in sovereign CDS), Obligation Default, Repudiation, and Acceleration.

## 2. Pricing and Valuation
- **Hazard Rate (λ):** The instantaneous probability of default given survival. Used to construct the Survival Probability curve $P(t) = e^{-\lambda t}$.
- **The Two Legs:**
  - *Premium Leg:* The PV of periodic spread payments conditional on survival (paid by buyer).
  - *Protection Leg:* The PV of the contingent payout $(1-R)$ upon default (paid by seller).
  - *Fair Spread:* The spread $s$ that makes the NPV of both legs equal to zero at inception.
- **The Credit Triangle:** A common simplification for flat curves: $s \approx \lambda \times (1 - R)$.
- **The Basis Trade:** Trading the difference between a cash bond's Z-spread and its CDS spread (Basis = CDS Spread - Cash Z-Spread).

## 3. The Big Bang Protocol
- **Pre-2009 vs. Post-2009:** Standardized the market from bespoke contracts with par spreads to standardized contracts with fixed coupons (100bps or 500bps). This enabled trade compression and central clearing (ICE Clear Credit).
- **Points Upfront (PUF):** Since coupons are fixed, the difference between the market spread and the fixed coupon is exchanged upfront. $PUF \approx (s_{mkt} - Coupon) \times \text{Risky Duration}$.
- **Settlement Auctions:** Hardwired ISDA protocols to determine a fair market Recovery Rate ($R$) upon default, eliminating the need to physically deliver defaulted bonds.

## 4. Advanced Risk & Greeks
- **CS01 (Credit Spread 01):** The PV change of the CDS for a 1 bp shift in the credit spread. Analogous to DV01 for interest rates.
  - Calculated as: $CS01 = \frac{PV(Spread + 1bp) - PV(Spread)}{1bp} \approx \text{Risky Duration} \times \text{Notional}$.
- **IR01 (Interest Rate 01):** Sensitivity to changes in the risk-free rate, which impacts discounting and hazard rate bootstrapping.
- **Rec01 (Recovery 01):** Sensitivity to a 1% change in the assumed recovery rate.
- **Jump-to-Default (JTD):** The immediate P&L impact if the reference entity defaults today.

## 5. Institutional Infrastructure
- **Trading Desks & Market Makers:** Dealers provide liquidity by quoting bid-ask spreads on CDS indices (like CDX and iTraxx) and single names. They manage massive books of complex cross-gamma and correlation risks.
- **Stress Testing Frameworks:** Professional risk management involves daily shifts (CS01, IR01), weekly shocks (e.g., +500bps spread widening, recovery rate drops), and monthly deep-dive Monte Carlo simulations to quantify tail risk and hedge effectiveness.

## Related Reading

- [Unpacking CDS: A Granular Deep-Dive into Credit Default Swaps](/articles/unpacking-cds-granular-deep-dive-credit-default-swaps)
- [Watch on YouTube](https://youtu.be/EtDXXSIffTQ)
