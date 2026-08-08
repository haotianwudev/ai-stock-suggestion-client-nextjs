---
path: quant/hft-market-making-avellaneda-stoikov
title: "Modern Market Making: The Avellaneda-Stoikov Model & HFT Infrastructure"
articleSlug: anatomy-of-speed-modern-market-making-hft
date: 2025-09-26
labels: [Quantitative Finance, AI/ML]
related: []
---

## Overview

Modern electronic market making is a hyper-competitive synthesis of quantitative finance, low-latency infrastructure, and machine learning. Market makers earn the bid-ask spread by continuously quoting both sides of a security, but must actively manage two core risks — inventory risk and adverse selection — using both classical models like Avellaneda-Stoikov and modern ML techniques.

## Key Concepts

- **Market making's economic function** — designated liquidity providers stand ready to buy and sell continuously, earning the bid-ask spread as compensation for the risk of doing so.
- **Inventory risk** — the risk of holding a position that devalues before it can be offloaded.
- **Adverse selection** — the risk of unknowingly trading with a better-informed counterparty who anticipates a price move.
- **The latency arms race** — co-located servers (10-50μs), FPGAs/ASICs (100-500ns), microwave/laser links (4-8ms point-to-point), and kernel bypassing all exist to shave latency out of the data-to-execution pipeline.

## The Avellaneda-Stoikov Model

A foundational framework for optimal quoting that balances earning the spread against inventory risk.

- **Reservation price**: `r(s, q, t) = s − q · γ · σ² · (T − t)` — the market maker's internal "fair" price, skewed away from the public mid-price (s) based on inventory (q). High inventory lowers `r` to attract sellers; low/negative inventory raises it to attract buyers.
- **Optimal spread**: `γ·σ²·(T−t) + (2/γ)·ln(1 + γ/κ)` — the first term (inventory risk) widens with volatility (σ) and risk aversion (γ); the second term (adverse selection) narrows in more liquid, higher order-flow (κ) markets.

| Parameter | Role |
|---|---|
| Mid-Price (s) | Current best estimate of fair value; baseline for quoting |
| Inventory (q) | Current holding; drives the reservation price skew |
| Risk Aversion (γ) | Penalty for holding inventory; higher γ widens the spread |
| Volatility (σ²) | Widens both the inventory skew and base spread |
| Order Flow (κ) | Denser order flow forces a tighter, more competitive spread |

## Risk Control Techniques

- **Quote skewing** — asymmetrically shifting the spread based on current inventory.
- **Quote sizing** — offering more size on the side you want to trade to rebalance inventory.
- **Max position limits** — hard caps on inventory exposure.
- **Adverse selection defense** — widening spreads during high volatility, reducing size, and using predictive models; switching from passive quoting to active liquidation when a trend is detected.

## Machine Learning Applications

| Application | Techniques | Objective |
|---|---|---|
| Micro-price prediction | LSTMs, Transformers, Gradient Boosting | Forecast next price movement, avoid adverse selection |
| Volatility forecasting | GARCH, RNNs | Dynamically adjust spread width in real time |
| Order flow analysis | CNNs on LOB snapshots, clustering | Detect hidden liquidity and institutional orders |
| Optimal execution | Reinforcement learning | Minimize slippage on large order placement |

Alpha generation beyond quoting comes from feature engineering on raw limit order book data (order book imbalance, trade intensity, volatility clusters), market microstructure exploitation (queue position, rebate arbitrage, detecting iceberg orders), and statistical arbitrage on cointegrated pairs/baskets.

## Key Takeaways

- Market making profit is compensation for two specific, manageable risks (inventory risk and adverse selection) — the entire quoting apparatus exists to price and control those risks, not just to capture the spread.
- The Avellaneda-Stoikov reservation price is the mechanism that turns raw inventory into an actionable quote adjustment — it's the mathematical bridge between "I'm holding too much" and "I should quote differently."
- The latency arms race and the ML/alpha race are two separate but related fronts: one minimizes the cost of being slow, the other maximizes the value of being smart.

## Related Reading

- [The Anatomy of Speed: Modern Market Making in High-Frequency Trading](/articles/anatomy-of-speed-modern-market-making-hft)
- [Watch on YouTube](https://youtu.be/waY0tFW49VY)
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vQII0UWvpa1IRgnH8Pplp2pPeYf3OL1a-n00attBl1nt-Hv0bhmvIvIb-_UH5Ybnip4F5jO5uwlGn6p/pub)
