---
path: quant/backtrader-cheatsheet-python-framework
title: "The Definitive backtrader Cheatsheet"
articleSlug: definitive-backtrader-cheatsheet-guide
date: 2025-07-30
labels: [Quantitative Finance]
related: []
---

## Overview

`backtrader` is a self-contained, pure-Python, open-source framework for backtesting, optimizing, and deploying algorithmic trading strategies. Its design goal is to let developers focus on trading logic rather than rebuilding data-handling, order-simulation, and broker infrastructure from scratch — the same strategy code can often move from backtest to live trading (e.g., via Interactive Brokers) with minimal changes.

## Key Concepts

- **Cerebro** — the central engine orchestrating the whole backtest: add data (`adddata`), strategies (`addstrategy`), cash (`broker.setcash`), commissions (`broker.setcommission`), sizers, and analyzers, then call `run()`.
- **The Strategy lifecycle** — `__init__` (one-time setup), `start` (once at the beginning), `prenext` (during indicator warm-up), `nextstart` (first bar after warm-up), `next` (the main workhorse, called every bar), `stop` (final calculations).
- **0-based indexing convention** — `self.data.close[0]` is the current bar, `self.data.close[-1]` is the previous bar; this convention exists specifically to prevent look-ahead bias.
- **Notification methods** — `notify_order` and `notify_trade` report asynchronous events (order fills, closed trades) back to the strategy, since execution doesn't happen synchronously with signal generation.
- **Sizers** — decouple position-sizing decisions from signal generation (`FixedSize`, `PercentSizer`, `AllInSizer`), enabling modular, reusable risk management independent of the entry/exit logic.

## Core Cerebro Methods

| Method | Purpose |
|---|---|
| `cerebro.adddata(data)` | Adds a data feed |
| `cerebro.addstrategy(strategy)` | Adds a strategy class |
| `cerebro.broker.setcash(cash)` | Sets initial capital |
| `cerebro.broker.setcommission(...)` | Configures trading costs |
| `cerebro.addsizer(sizer)` | Attaches a position sizing algorithm |
| `cerebro.addanalyzer(analyzer)` | Adds a performance analyzer |
| `cerebro.run()` | Initiates the backtest |
| `cerebro.plot()` | Generates a visual chart of the results |

## Order Execution Methods

- `self.buy()` / `self.sell()` — market orders sized by the active Sizer.
- `self.order_target_size(target=N)` — adjust position to N shares.
- `self.order_target_value(target=V)` — adjust position to a target monetary value.
- `self.order_target_percent(target=P)` — adjust position to P% of portfolio value.

## Common Indicators

| Indicator | backtrader Class |
|---|---|
| Simple Moving Average | `bt.indicators.SimpleMovingAverage` |
| Exponential Moving Average | `bt.indicators.ExponentialMovingAverage` |
| Moving Average Crossover | `bt.indicators.CrossOver` |
| RSI | `bt.indicators.RSI` |
| MACD | `bt.indicators.MACD` |
| Bollinger Bands | `bt.indicators.BollingerBands` |
| Average True Range | `bt.indicators.AverageTrueRange` |
| Stochastic Oscillator | `bt.indicators.Stochastic` |

Custom indicators subclass `bt.Indicator`, declaring `lines` (output series) and `params`, with calculation logic in `__init__`.

## Key Performance Analyzers

| Question | Analyzer | Output |
|---|---|---|
| Risk-adjusted return? | `bt.analyzers.SharpeRatio` | `sharperatio` |
| Largest peak-to-trough loss? | `bt.analyzers.DrawDown` | `max.drawdown` (%) |
| Win rate and average P/L? | `bt.analyzers.TradeAnalyzer` | `pnl.net.average` |
| Annualized returns? | `bt.analyzers.Returns` | `rnorm100` |
| System Quality Number? | `bt.analyzers.SQN` | `sqn` |

## Strategy Optimization

`cerebro.optstrategy()` sweeps parameter combinations (e.g., `pfast=range(10, 21, 5)`) to find robust parameter sets — but this must be used carefully, since brute-force optimization is a direct route to overfitting a backtest to historical noise.

## Realism: Commissions and Slippage

A backtest that ignores transaction costs is explicitly called out as &ldquo;fundamentally flawed.&rdquo; Use `broker.setcommission()` (percentage or fixed) and `broker.set_slippage_perc()` to simulate real-world execution frictions before trusting any backtest result.

## Key Takeaways

- The 0-based indexing convention (`[0]` = current bar, `[-1]` = previous bar) isn't just an API detail — it's a structural guardrail against look-ahead bias, one of the most common and hardest-to-detect backtesting errors.
- The same strategy class can run in backtest and live trading (e.g., against Interactive Brokers) by swapping the data feed and broker components underneath it — this framework design choice is what makes backtrader viable beyond research, directly reducing the risk of backtest-to-live implementation drift.
- Optimization and realistic cost modeling are presented as a paired concern, not separate topics: a parameter sweep that ignores commissions/slippage will systematically overstate performance, compounding the overfitting risk that `optstrategy` already introduces.

## Related Reading

- [The Definitive backtrader Cheatsheet](/articles/definitive-backtrader-cheatsheet-guide)
- [Full Research Paper](https://docs.google.com/document/d/e/2PACX-1vTaw73N8uwy5Af2dhof_XI86yHb46mTpEVEUaca1e3u8EAE7CmIRRlRi22kM7ZvfmDIyvUr6lhG12ML/pub)
