'use client';

import { useState, Fragment } from 'react';
import { BrainCircuit, Settings, LineChart, TestTube2, SlidersHorizontal, BookOpen, Check, Clipboard, Maximize2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Component to render icons by name ---
interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const Icon = ({ name, ...props }: IconProps) => {
  const icons = {
    BrainCircuit, Settings, LineChart, TestTube2, SlidersHorizontal, BookOpen, Check, Clipboard, Maximize2
  };
  const LucideIcon = icons[name as keyof typeof icons];
  return LucideIcon ? <LucideIcon {...props} /> : null;
};

// --- Data structured from the provided article ---
const cheatsheetData = {
  title: "The Definitive backtrader Cheatsheet",
  parts: [
    {
      id: "part1",
      title: "Foundations of Algorithmic Trading",
      Icon: "BrainCircuit",
      sections: [
        {
          title: "The backtrader Ecosystem: A 'Batteries-Included' Framework",
          content: [
            "`backtrader` is a feature-rich, open-source Python framework designed for backtesting, optimizing, and deploying algorithmic trading strategies. Its fundamental purpose is to allow developers and quantitative analysts to focus on crafting and refining reusable trading logic, indicators, and performance analyzers, rather than expending resources on building the underlying infrastructure from scratch. The platform is self-contained, written in pure Python, and supports a wide array of functionalities, from handling multiple data feeds to simulating complex order types and connecting to live brokers.",
            "The architecture is built upon distinct components:",
          ],
          list: [
            { term: "Cerebro", description: "The central engine that orchestrates the entire process." },
            { term: "Data Feeds", description: "Conduits for market data (CSV, Yahoo Finance, Pandas)." },
            { term: "Strategy", description: "User-defined class containing the core trading logic." },
            { term: "Indicators", description: "Reusable technical analysis calculations (SMA, RSI, etc.)." },
            { term: "Broker", description: "Simulates a real-world brokerage, managing cash, positions, and costs." },
            { term: "Analyzers & Observers", description: "Tools for performance evaluation (Sharpe Ratio, Drawdown)." },
            { term: "Sizers", description: "Components for automated position sizing." },
          ]
        },
        {
          title: "Environment Setup and First Run",
          content: [
            "Setting up a functional `backtrader` environment is a straightforward process, requiring only Python and the `pip` package manager."
          ],
          codeBlocks: [
            {
              title: "Installation",
              language: 'bash',
              code: `pip install backtrader
# For plotting capabilities
pip install backtrader[plotting]`
            },
            {
              title: "Anatomy of a Minimal Script",
              language: 'python',
              code: `import backtrader as bt
import datetime

# 1. Create a Strategy class
class MyFirstStrategy(bt.Strategy):
    def __init__(self):
        self.dataclose = self.datas[0].close

    def log(self, txt, dt=None):
        dt = dt or self.datas[0].datetime.date(0)
        print(f'{dt.isoformat()}, {txt}')

    def next(self):
        self.log(f'Close, {self.dataclose[0]:.2f}')

# 2. Instantiate the Cerebro engine
cerebro = bt.Cerebro()

# 3. Add the Strategy to Cerebro
cerebro.addstrategy(MyFirstStrategy)

# 4. Create and Add a Data Feed
data = bt.feeds.GenericCSVData(
    dataname='your_data.csv',  # Replace with your data file
    fromdate=datetime.datetime(2000, 1, 1),
    todate=datetime.datetime(2000, 12, 31),
    dtformat=('%Y-%m-%d'),
    openinterest=-1
)
cerebro.adddata(data)

# 5. Set the initial cash
cerebro.broker.setcash(100000.0)

# 6. Run the backtest
print('Starting Portfolio Value: %.2f' % cerebro.broker.getvalue())
cerebro.run()
print('Final Portfolio Value: %.2f' % cerebro.broker.getvalue())`
            }
          ]
        }
      ]
    },
    {
      id: "part2",
      title: "Core Mechanics of a Backtest",
      Icon: "Settings",
      sections: [
        {
          title: "The Cerebro Engine: The Brain of the Operation",
          content: [
            "The Cerebro engine is the central controller. Its typical workflow involves configuring an instance through its various methods before calling `run()`."
          ],
          list: [
            { term: "cerebro.adddata(data)", description: "Adds a data feed." },
            { term: "cerebro.addstrategy(strategy)", description: "Adds a strategy class." },
            { term: "cerebro.broker.setcash(cash)", description: "Sets initial capital." },
            { term: "cerebro.broker.setcommission(...)", description: "Configures trading costs." },
            { term: "cerebro.addsizer(sizer)", description: "Attaches a position sizing algorithm." },
            { term: "cerebro.addanalyzer(analyzer)", description: "Adds a performance analyzer." },
            { term: "cerebro.run()", description: "Initiates the backtest." },
            { term: "cerebro.plot()", description: "Generates a visual chart of the results." },
          ]
        },
        {
          title: "Data Feeds: Fueling the Engine",
          content: [
            "Accessing data from `lines` within a strategy's `next` method follows a strict 0-based indexing convention to prevent look-ahead bias: `self.data.close[0]` for the current bar, `self.data.close[-1]` for the previous bar."
          ],
          codeBlocks: [
            {
              title: "Loading a Pandas DataFrame",
              language: "python",
              code: `import pandas as pd

# Assume 'my_dataframe' is a Pandas DataFrame with a DatetimeIndex
# and columns named 'open', 'high', 'low', 'close', 'volume'
data = bt.feeds.PandasData(dataname=my_dataframe)`
            }
          ]
        },
        {
          title: "The Strategy Class in Detail",
          content: [
            "The `bt.Strategy` class behavior is defined by a series of methods called by Cerebro at different points in the backtest lifecycle. Understanding these provides greater control."
          ],
          list: [
            { term: "__init__(self)", description: "Called once. Used to set up indicators and one-time configurations." },
            { term: "start(self)", description: "Called once at the very beginning of data processing." },
            { term: "prenext(self)", description: "Called for each bar during the indicator warm-up period." },
            { term: "nextstart(self)", description: "Called once on the first bar after the warm-up period." },
            { term: "next(self)", description: "The primary workhorse. Called for every bar after warm-up for the main trading logic." },
            { term: "stop(self)", description: "Called once at the end of the backtest for final calculations." },
          ]
        },
        {
          title: "Notification Methods",
          content: [
            "`backtrader` uses a notification system to communicate the status of asynchronous events, like order executions, back to the strategy."
          ],
          codeBlocks: [
            {
              title: "Handling Order Notifications",
              language: "python",
              code: `def notify_order(self, order):
    if order.status in [order.Submitted, order.Accepted]:
        # Buy/Sell order submitted/accepted to/by broker - Nothing to do
        return

    # Check if an order has been completed
    if order.status in [order.Completed]:
        if order.isbuy():
            self.log(f'BUY EXECUTED, Price: {order.executed.price:.2f}, Cost: {order.executed.value:.2f}, Comm: {order.executed.comm:.2f}')
        elif order.issell():
            self.log(f'SELL EXECUTED, Price: {order.executed.price:.2f}, Cost: {order.executed.value:.2f}, Comm: {order.executed.comm:.2f}')
        self.bar_executed = len(self)
    elif order.status in [order.Canceled, order.Margin, order.Rejected]:
        self.log('Order Canceled/Margin/Rejected')

    # Write down: no pending order
    self.order = None`
            },
            {
              title: "Handling Trade Notifications",
              language: "python",
              code: `def notify_trade(self, trade):
    if not trade.isclosed:
        return

    self.log(f'OPERATION PROFIT, GROSS {trade.pnl:.2f}, NET {trade.pnlcomm:.2f}')`
            }
          ]
        },
        {
          title: "Order Execution",
          content: [
            "`backtrader` offers multiple ways to create orders, from direct calls to target-based allocation."
          ],
          list: [
            { term: "self.buy() / self.sell()", description: "Creates market orders with a size determined by the active Sizer." },
            { term: "self.order_target_size(target=N)", description: "Adjusts the position to a target size of N shares." },
            { term: "self.order_target_value(target=V)", description: "Adjusts the position to a target monetary value V." },
            { term: "self.order_target_percent(target=P)", description: "Adjusts the position to a target of P percent of portfolio value." },
          ]
        }
      ]
    },
    {
      id: "part3",
      title: "Technical Indicators & Strategies",
      Icon: "LineChart",
      sections: [
        {
          title: "Common Indicators",
          table: {
            headers: ["Indicator Name", "backtrader Class", "Key Parameters"],
            rows: [
              ["Simple Moving Average", "bt.indicators.SimpleMovingAverage", "period"],
              ["Exponential Moving Average", "bt.indicators.ExponentialMovingAverage", "period"],
              ["Moving Average Crossover", "bt.indicators.CrossOver", "line1, line2"],
              ["Relative Strength Index", "bt.indicators.RSI", "period"],
              ["MACD", "bt.indicators.MACD", "period_me1, period_me2, period_signal"],
              ["Bollinger Bands®", "bt.indicators.BollingerBands", "period, devfactor"],
              ["Average True Range", "bt.indicators.AverageTrueRange", "period"],
              ["Stochastic Oscillator", "bt.indicators.Stochastic", "period, period_dfast, period_dslow"],
            ]
          }
        },
        {
          title: "Moving Average Crossover Strategy",
          codeBlocks: [
            {
              title: "SmaCrossStrategy",
              language: 'python',
              code: `class SmaCrossStrategy(bt.Strategy):
    params = dict(pfast=10, pslow=30)

    def __init__(self):
        sma_fast = bt.indicators.SMA(period=self.p.pfast)
        sma_slow = bt.indicators.SMA(period=self.p.pslow)
        self.crossover = bt.indicators.CrossOver(sma_fast, sma_slow)

    def next(self):
        if not self.position:
            if self.crossover > 0:
                self.buy()
        elif self.crossover < 0:
            self.close()`
            }
          ]
        },
        {
          title: "Relative Strength Index (RSI) Strategy",
          codeBlocks: [
            {
              title: "RsiStrategy",
              language: 'python',
              code: `class RsiStrategy(bt.Strategy):
    params = (("rsi_period", 14), ("rsi_overbought", 70), ("rsi_oversold", 30))

    def __init__(self):
        self.rsi = bt.indicators.RSI(self.data.close, period=self.params.rsi_period)

    def next(self):
        if not self.position and self.rsi < self.params.rsi_oversold:
            self.buy()
        elif self.position and self.rsi > self.params.rsi_overbought:
            self.sell()`
            }
          ]
        },
        {
          title: "Creating Custom Indicators",
          content: [
            "While `backtrader` offers a rich library of built-in indicators, developers often need to implement proprietary or non-standard indicators. The process involves subclassing `bt.Indicator` and defining its `lines`, `params`, and calculation logic."
          ],
          codeBlocks: [
            {
              title: "Custom Stochastic Indicator",
              language: "python",
              code: `import backtrader as bt

class CustomStochastic(bt.Indicator):
    lines = ('k', 'd',)  # Declare the output lines
    params = (
        ('k_period', 14),  # Lookback period for HighestHigh/LowestLow
        ('d_period', 3),   # Smoothing period for the %D line
    )

    def __init__(self):
        # Use built-in indicators for the components
        highest = bt.indicators.Highest(self.data.high, period=self.p.k_period)
        lowest = bt.indicators.Lowest(self.data.low, period=self.p.k_period)

        # Calculate and assign the %K line
        self.lines.k = 100 * (self.data.close - lowest) / (highest - lowest)

        # Calculate and assign the %D line by smoothing %K
        self.lines.d = bt.indicators.SimpleMovingAverage(self.lines.k, period=self.p.d_period)`
            }
          ]
        }
      ]
    },
    {
      id: "part4",
      title: "Analysis, Visualization & Optimization",
      Icon: "TestTube2",
      sections: [
        {
          title: "Key Performance Metrics & Analyzers",
          content: [
            "Analyzers are added to Cerebro before the run and produce a dictionary of results afterward. They are crucial for quantitatively evaluating strategy performance."
          ],
          table: {
            headers: ["Metric / Question", "backtrader Analyzer", "Key Output(s)"],
            rows: [
              ["Risk-adjusted return?", "bt.analyzers.SharpeRatio", "sharperatio"],
              ["Largest peak-to-trough loss?", "bt.analyzers.DrawDown", "max.drawdown (%)"],
              ["Win rate and average P/L?", "bt.analyzers.TradeAnalyzer", "pnl.net.average"],
              ["Annualized returns?", "bt.analyzers.Returns", "rnorm100 (annualized %)"],
              ["System Quality Number?", "bt.analyzers.SQN", "sqn"],
            ]
          },
          codeBlocks: [
            {
              title: "Accessing Analyzer Results",
              language: "python",
              code: `# 1. Add analyzers to Cerebro with unique names
cerebro.addanalyzer(bt.analyzers.SharpeRatio, _name='mysharpe')
cerebro.addanalyzer(bt.analyzers.TradeAnalyzer, _name='mytrade')

# 2. Run the backtest
results = cerebro.run()
strategy_instance = results[0]

# 3. Retrieve and print analysis from each analyzer
sharpe_analysis = strategy_instance.analyzers.mysharpe.get_analysis()
trade_analysis = strategy_instance.analyzers.mytrade.get_analysis()

print(f"Sharpe Ratio: {sharpe_analysis['sharperatio']}")
print(f"Total Trades: {trade_analysis.total.total}")
print(f"Winning Trades: {trade_analysis.won.total}")
print(f"Losing Trades: {trade_analysis.lost.total}")`
            }
          ]
        },
        {
          title: "Strategy Optimization",
          content: [
            "Use `cerebro.optstrategy` to test a strategy with various parameter combinations. This helps in finding the most robust parameter set but must be used carefully to avoid overfitting."
          ],
          codeBlocks: [
            {
              title: "Optimization Example",
              language: "python",
              code: `cerebro.optstrategy(
    SmaCrossStrategy,
    pfast=range(10, 21, 5),  # Test with pfast = 10, 15, 20
    pslow=range(30, 51, 10)  # Test with pslow = 30, 40, 50
)`
            },
            {
              title: "Processing Optimization Results",
              language: "python",
              code: `# Run the optimization
optimized_runs = cerebro.run()

final_results_list = []
for run in optimized_runs:
    for strategy in run:
        final_results_list.append({
            'pfast': strategy.p.pfast,
            'pslow': strategy.p.pslow,
            'pnl': strategy.broker.getvalue()
        })

# Sort the results by final portfolio value
by_pnl = sorted(final_results_list, key=lambda x: x['pnl'], reverse=True)

# Print the best result
print("Best performing parameters:")
print(by_pnl[0])`
            }
          ]
        }
      ]
    },
    {
      id: "part5",
      title: "Advanced Topics",
      Icon: "SlidersHorizontal",
      sections: [
        {
          title: "Commissions and Slippage",
          content: [
            "A backtest that ignores transaction costs is fundamentally flawed. Use `setcommission` and `set_slippage_perc` to simulate real-world conditions."
          ],
          codeBlocks: [
            {
              title: "Setting Costs",
              language: "python",
              code: `# Percentage-based commission for stocks (0.1%)
cerebro.broker.setcommission(commission=0.001)

# Fixed-based commission for futures
# cerebro.broker.setcommission(commission=2.0, mult=10.0, margin=2000.0)

# Percentage-based slippage (0.1%)
cerebro.broker.set_slippage_perc(perc=0.001, slip_open=True)`
            }
          ]
        },
        {
          title: "Sophisticated Capital Management with Sizers",
          content: [
            "Sizers decouple the position sizing decision from the signal generation logic. This allows for modular and reusable risk management components."
          ],
          list: [
            { term: "bt.sizers.FixedSize(stake=100)", description: "Trades a fixed number of shares/contracts." },
            { term: "bt.sizers.PercentSizer(percents=10)", description: "Allocates a percentage of available cash." },
            { term: "bt.sizers.AllInSizer(percents=95)", description: "Allocates almost all available cash." },
          ],
          codeBlocks: [
            {
              title: "Using PercentSizer",
              language: "python",
              code: `# Add a sizer to Cerebro to risk 20% of cash on each trade
cerebro.addsizer(bt.sizers.PercentSizer, percents=20)`
            }
          ]
        },
        {
          title: "Live Trading with Interactive Brokers",
          content: [
            "A significant advantage of `backtrader`'s architecture is that the same strategy code can often be deployed for live trading by replacing the backtesting components with live equivalents."
          ],
          codeBlocks: [
            {
              title: "Conceptual Live Trading Setup",
              language: "python",
              code: `# NOTE: This is a conceptual example and requires a running IB TWS/Gateway
# and the appropriate API libraries installed.

# 1. Create an IBStore instance with connection details
ibstore = bt.stores.IBStore(host='127.0.0.1', port=7497, clientId=10)

# 2. Get a live data feed from the store
data = ibstore.getdata(dataname='EUR.USD-CASH-IDEALPRO')

# 3. Get a live broker instance from the store
broker = ibstore.getbroker()

# 4. Configure Cerebro with live components
cerebro = bt.Cerebro(runonce=False)  # Use runonce=False for live data
cerebro.adddata(data)
cerebro.setbroker(broker)

# 5. Add the SAME strategy used for backtesting
cerebro.addstrategy(MyStrategy)

# 6. Run Cerebro for live trading
cerebro.run()`
            }
          ]
        }
      ]
    }
  ]
};

// --- Reusable Components ---
interface CodeBlockProps {
  code: string;
  language: string;
  title: string;
}

const CodeBlock = ({ code, title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl border border-gray-700 my-8 overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 border-b border-gray-600">
        <p className="text-white font-semibold text-lg">{title}</p>
        <button
          onClick={handleCopy}
          className="flex items-center text-white hover:text-indigo-200 transition-colors duration-200 bg-white dark:bg-[#0A0D14]/20 hover:bg-white dark:bg-[#0A0D14]/30 px-3 py-2 rounded-lg"
        >
          {copied ? (
            <Fragment>
              <Icon name="Check" size={16} className="mr-2 text-green-300" /> Copied!
            </Fragment>
          ) : (
            <Fragment>
              <Icon name="Clipboard" size={16} className="mr-2" /> Copy
            </Fragment>
          )}
        </button>
      </div>
      <div className="p-6 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-100 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

interface TableProps {
  headers: string[];
  rows: string[][];
}

const Table = ({ headers, rows }: TableProps) => {
  return (
    <div className="my-8 overflow-x-auto">
      <div className="min-w-full bg-white dark:bg-[#0A0D14] rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="text-left text-white font-bold p-6 text-lg">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-[#A8672E]/10 dark:bg-[#D08F52]/10 transition-colors duration-200">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-6 text-gray-700">
                    {cell.startsWith('bt.') ? (
                      <code className="bg-indigo-100 text-indigo-800 px-3 py-2 rounded-lg text-sm font-bold">
                        {cell}
                      </code>
                    ) : (
                      <span className="text-gray-800 font-medium">{cell}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  content?: string[];
  list?: Array<{ term: string; description: string; }>;
  codeBlocks?: CodeBlockProps[];
  table?: TableProps;
}

const Section = ({ title, content, list, codeBlocks, table }: SectionProps) => (
  <div className="mb-12">
    <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gradient-to-r from-indigo-200 to-purple-200 font-serif">
      {title}
    </h3>
    {content && content.map((p, i) => (
      <p
        key={i}
        className="text-gray-700 mb-6 leading-relaxed text-lg"
        dangerouslySetInnerHTML={{
          __html: p.replace(/`([^`]+)`/g, '<code class="bg-indigo-100 text-indigo-800 font-mono px-3 py-1 rounded-md text-sm font-semibold">$1</code>')
        }}
      />
    ))}
    {list && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {list.map((item, i) => (
          <div key={i} className="bg-gradient-to-r from-gray-50 to-indigo-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="font-bold text-[#A8672E] dark:text-[#D08F52] bg-indigo-100 px-3 py-1 rounded-lg inline-block mb-2 text-sm">
              {item.term}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    )}
    {table && <Table headers={table.headers} rows={table.rows} />}
    {codeBlocks && codeBlocks.map((cb, i) => <CodeBlock key={i} {...cb} />)}
  </div>
);

export default function BacktraderCheatsheetPage() {
  return (
    <ArticleFrame
      slug="definitive-backtrader-cheatsheet-guide"
      additionalDisclaimer="Trading involves substantial risk and may not be suitable for all investors. Past performance does not guarantee future results."
    >
      <InfographicSlot alt="Backtrader Cheatsheet Infographic" />

      {/* Introduction Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl shadow-xl border border-indigo-100 p-10 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 font-serif">
            Master Python Algorithmic Trading with backtrader
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            This comprehensive cheatsheet covers everything you need to know about backtrader, the powerful Python framework for algorithmic trading. From basic setup to advanced optimization techniques, you&apos;ll learn how to build, test, and deploy profitable trading strategies with confidence.
          </p>
        </div>
      </div>

      {/* Main Content */}
      {cheatsheetData.parts.map(part => {
        return (
          <div key={part.id} id={part.id} className="mb-20">
            <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Part Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-white dark:bg-[#0A0D14]/20 p-4 rounded-xl">
                    <Icon name={part.Icon as string} size={32} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight font-serif">
                    {part.title}
                  </h2>
                </div>
              </div>

              {/* Part Content */}
              <div className="p-8">
                {part.sections.map((section, i) => <Section key={i} {...section} />)}
              </div>
            </div>
          </div>
        );
      })}
    </ArticleFrame>
  );
}
