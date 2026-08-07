---
path: quant/structured-finance
title: Structured Finance 2026
articleSlug: structured-finance-2026-rmbs-cmbs-abs-pricing-models
date: 2026-02-12T00:00:00Z
labels: [QUANT]
related: []
---

## Overview
Structured finance is the financial engineering process of transforming illiquid, heterogeneous cash flows into tradable securities through tranching, credit enhancement, and stochastic modeling.

## Securitization Fundamentals
- **Special Purpose Vehicle (SPV):** Ensures bankruptcy remoteness and true sale, isolating collateral from originator credit risk.
- **Tranching & Waterfall:** Cash flows are distributed sequentially (Senior to Subordinated). Senior tranches receive lower yield but highest priority. Equity/Residual absorbs first losses.
- **Credit Enhancement:**
  - **Subordination:** Junior tranches absorb losses before senior tranches are impaired.
  - **Overcollateralization:** Asset pool par value exceeds securities par value.
  - **Excess Spread:** Difference between collateral WAC and securities WAC, trapped in reserves.

## RMBS (Residential Mortgage-Backed Securities)
- **Agency RMBS:** Guaranteed by GSEs (Fannie, Freddie, Ginnie). Zero credit risk but high prepayment risk.
- **Non-Agency RMBS:** Private-label securities requiring credit enhancement.
- **Prepayment Modeling:**
  - **PSA Curve:** Benchmark for measuring prepayment speeds (CPR/SMM).
  - **Refinancing S-Curve:** Prepayments accelerate rapidly when rates fall 50-100 bps below WAC, but flatten out due to burnout effect.

## CMBS (Commercial Mortgage-Backed Securities)
- **Underwriting:** Non-recourse loans underwritten based on property cash flow (DSCR) and equity cushion (LTV).
- **Prepayment Protection:** Unlike RMBS, CMBS have structural barriers to refinancing:
  - **Lockout Period:** Absolute prohibition on prepayment.
  - **Yield Maintenance:** PV penalty for lost interest.
  - **Defeasance:** Substituting collateral with Treasury securities.
- CMBS behave more like corporate bonds due to stable duration and lack of negative convexity.

## ABS (Asset-Backed Securities)
- **Auto Loans:** Short duration (3-5 years), predictable cash flows, minimal prepayments.
- **Credit Cards:** Master trust structure with a revolving period where new receivables replace paid-off balances.
- **Student Loans:** Long duration (10-20 years), high prepayment variability.

## Monte Carlo Valuation Framework
Structured finance securities with embedded options require path-dependent pricing:
1. **Interest Rate Simulation:** Generates paths using short-rate models (Vasicek/CIR/Hull-White).
2. **Prepayment & Default Model:** Estimates prepayments and defaults dynamically for each path.
3. **Cash Flow Engine:** Routes payments through the deal-specific structural waterfall.
4. **Option-Adjusted Spread (OAS):** The pure credit and liquidity premium after removing interest rate risk and embedded options. RMBS exhibit **negative convexity** (prices rise less when rates fall than they fall when rates rise).

## Related Reading
- [Structured Finance 2026](/articles/structured-finance-2026-rmbs-cmbs-abs-pricing-models)
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vT1T50Gv3h-o1mP0x74N-005088c22O6s2e_79bE62a0-4_eI65zQ6eYm3b08wF33G2/pub)
