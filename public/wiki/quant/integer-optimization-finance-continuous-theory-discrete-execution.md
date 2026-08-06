# Integer Optimization in Finance

## Overview
A comprehensive guide to bridging the gap between continuous theoretical models and the discrete reality of execution. Mixed-Integer Programming (MIP) solves the NP-Hard problems of real-world trading, encompassing portfolio construction, tax management, and arbitrage strategies under strict constraints.

## 1. The Core Problem
- **The Illusion of Continuous Math:** Classical finance models (like Black-Scholes and Markowitz Mean-Variance) assume continuous mathematics—infinitely divisible assets, frictionless trading, and smooth surfaces.
- **The Reality of the Order Book:** Real markets are fundamentally discrete.
  - You cannot buy 1.45 shares of stock.
  - You trade in discrete lot sizes.
  - Fees introduce non-linear steps.
  - You can only be long or short, requiring binary logic.

## 2. Mixed-Integer Programming (MIP)
- **The Framework:** MIP extends Linear Programming (LP) by constraining certain variables to take only integer values (or binary values: 0 or 1).
- **The Computational Challenge:** While LPs can be solved easily in polynomial time (P), forcing variables to be integers makes the problem NP-Hard. The search space grows exponentially ($2^N$ for binary variables).
- **Branch-and-Bound:** The foundational algorithm for solving MIPs. It systematically divides the search space (branching) and uses LP relaxations to find upper/lower limits (bounding) to prune suboptimal paths.

## 3. Financial Applications
- **Asset Selection (Cardinality Constraints):** Limiting a portfolio to exactly $K$ stocks out of a universe of $N$. This requires binary variables ($z_i \in \{0, 1\}$) to indicate whether an asset is included.
- **Minimum Trade Sizes:** Ensuring that if an asset is traded, the trade size meets exchange minimums or reduces transaction costs.
- **Tax-Aware Optimization:** Selecting which specific tax lots to sell (HIFO, LIFO) to optimize tax loss harvesting while staying delta-neutral.
- **Index Tracking & ETF Basket Creation:** Minimizing tracking error against an index while purchasing only discrete shares in full creation units.

## 4. Modern Solvers & Heuristics
- **Commercial Solvers:** Tools like Gurobi and CPLEX have revolutionized the field with advanced presolve routines, cutting planes (e.g., Gomory cuts), and highly tuned Branch-and-Bound implementations.
- **Heuristics:** For massive institutional portfolios where exact MIP solutions take too long, quants use heuristics:
  - *Rounding & Local Search:* Solving the continuous LP and intelligently rounding to nearby integers.
  - *Simulated Annealing & Genetic Algorithms:* Exploring the discrete space stochastically.
- **Neural Branching:** The bleeding edge involves using Graph Neural Networks (GNNs) via imitation learning to predict the optimal branching decisions in the Branch-and-Bound tree, drastically speeding up inference times.
