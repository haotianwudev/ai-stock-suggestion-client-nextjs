'use client';

import { TrendingUp, Zap, GitMerge, Layers, Shield, HelpCircle, BookOpen } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

// --- SVG Chart Components ---
// These are static SVG illustrations to demonstrate concepts.
const MovingAverageChart = () => (
  <svg viewBox="0 0 300 150" className="w-full h-auto rounded-lg bg-gray-100 dark:bg-gray-700/50 mt-4">
    <defs>
      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
        <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
      </linearGradient>
    </defs>
    {/* Price Path */}
    <path d="M 10 120 L 40 100 L 70 110 L 100 80 L 130 90 L 160 60 L 190 75 L 220 50 L 250 60 L 280 30" fill="url(#priceGradient)" stroke="#6366f1" strokeWidth="1.5" />
    {/* 50-period MA (Slower) */}
    <path d="M 10 125 C 50 120, 80 90, 130 85 S 180 60, 230 55 S 280 40, 280 40" stroke="#fb923c" strokeWidth="2" strokeDasharray="4 2" fill="none" />
    {/* 20-period MA (Faster) */}
    <path d="M 10 122 C 40 105, 70 100, 100 85 S 150 70, 190 65 S 240 50, 280 35" stroke="#34d399" strokeWidth="2" fill="none" />
    {/* Golden Cross Annotation */}
    <circle cx="115" cy="85" r="4" fill="#34d399" />
    <line x1="115" y1="89" x2="115" y2="105" stroke="#34d399" strokeWidth="1" />
    <text x="115" y="115" fontSize="10" textAnchor="middle" fill="#34d399" className="font-semibold">Buy Signal</text>
    <text x="115" y="125" fontSize="9" textAnchor="middle" fill="currentColor">(Golden Cross)</text>
    {/* Legend */}
    <text x="20" y="20" fontSize="10" fill="currentColor">Price</text>
    <line x1="50" y1="18" x2="65" y2="18" stroke="#6366f1" strokeWidth="2" />
    <text x="75" y="20" fontSize="10" fill="#34d399">Fast MA</text>
    <line x1="115" y1="18" x2="130" y2="18" stroke="#34d399" strokeWidth="2" />
    <text x="140" y="20" fontSize="10" fill="#fb923c">Slow MA</text>
    <line x1="180" y1="18" x2="195" y2="18" stroke="#fb923c" strokeWidth="2" strokeDasharray="4 2" />
  </svg>
);

const RsiChart = () => (
  <svg viewBox="0 0 300 200" className="w-full h-auto rounded-lg bg-gray-100 dark:bg-gray-700/50 mt-4">
    {/* Price Pane */}
    <path d="M 20 80 L 80 60 L 140 70 L 200 40 L 260 50 L 280 20" stroke="#6366f1" strokeWidth="1.5" fill="none" />
    <text x="15" y="15" fontSize="10" fill="currentColor" className="font-bold">Price</text>
    <line x1="200" y1="40" x2="280" y2="20" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
    <text x="240" y="15" fontSize="10" fill="#ef4444" textAnchor="middle">Higher High</text>
    {/* RSI Pane */}
    <rect x="10" y="100" width="280" height="90" fill="none" stroke="#9ca3af" strokeWidth="0.5" />
    <text x="15" y="115" fontSize="10" fill="currentColor" className="font-bold">RSI</text>
    {/* Overbought/Oversold Lines */}
    <line x1="10" y1="125" x2="290" y2="125" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
    <text x="270" y="122" fontSize="9" fill="#f59e0b">70 (Overbought)</text>
    <line x1="10" y1="165" x2="290" y2="165" stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" />
    <text x="270" y="170" fontSize="9" fill="#34d399">30 (Oversold)</text>
    {/* RSI Path */}
    <path d="M 20 160 L 80 170 L 140 150 L 200 120 L 260 140 L 280 130" stroke="#a78bfa" strokeWidth="2" fill="none" />
    <line x1="200" y1="120" x2="280" y2="130" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
    <text x="240" y="145" fontSize="10" fill="#ef4444" textAnchor="middle">Lower High</text>
    {/* Divergence Annotation */}
    <path d="M 240 30 L 240 135" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
    <text x="200" y="95" fontSize="12" fill="#ef4444" textAnchor="middle" className="font-bold">Bearish Divergence</text>
  </svg>
);

const MacdChart = () => (
  <svg viewBox="0 0 300 150" className="w-full h-auto rounded-lg bg-gray-100 dark:bg-gray-700/50 mt-4">
    {/* Center Line */}
    <line x1="10" y1="75" x2="290" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
    <text x="280" y="72" fontSize="9" fill="currentColor">0</text>
    {/* Histogram */}
    <rect x="30" y="60" width="10" height="15" fill="#4ade80" opacity="0.6"/>
    <rect x="45" y="50" width="10" height="25" fill="#4ade80" opacity="0.6"/>
    <rect x="60" y="45" width="10" height="30" fill="#4ade80" opacity="0.6"/>
    <rect x="75" y="55" width="10" height="20" fill="#4ade80" opacity="0.6"/>
    <rect x="90" y="70" width="10" height="5" fill="#4ade80" opacity="0.6"/>
    <rect x="105" y="76" width="10" height="5" fill="#f87171" opacity="0.6"/>
    <rect x="120" y="80" width="10" height="10" fill="#f87171" opacity="0.6"/>
    <rect x="135" y="85" width="10" height="15" fill="#f87171" opacity="0.6"/>
    <rect x="150" y="95" width="10" height="25" fill="#f87171" opacity="0.6"/>
    <rect x="165" y="82" width="10" height="12" fill="#f87171" opacity="0.6"/>
    <rect x="180" y="78" width="10" height="8" fill="#f87171" opacity="0.6"/>
    <rect x="195" y="72" width="10" height="3" fill="#4ade80" opacity="0.6"/>
    <rect x="210" y="65" width="10" height="10" fill="#4ade80" opacity="0.6"/>
    <rect x="225" y="55" width="10" height="20" fill="#4ade80" opacity="0.6"/>
    {/* MACD Line (Blue) */}
    <path d="M 20 90 C 50 60, 80 50, 110 80 S 140 110, 170 90 S 200 60, 240 60" stroke="#3b82f6" strokeWidth="2" fill="none" />
    {/* Signal Line (Red) */}
    <path d="M 20 85 C 50 75, 80 65, 110 75 S 140 95, 170 95 S 200 80, 240 70" stroke="#ef4444" strokeWidth="1.5" fill="none" />
    {/* Crossover Annotation */}
    <circle cx="108" cy="78" r="4" fill="#ef4444" />
    <line x1="108" y1="74" x2="108" y2="60" stroke="#ef4444" strokeWidth="1" />
    <text x="108" y="55" fontSize="10" textAnchor="middle" fill="#ef4444" className="font-semibold">Sell Signal</text>
  </svg>
);

// Helper component for consistent section styling
const Section = ({ title, icon, children }) => (
  <section className="mb-16">
    <div className="flex items-center mb-6">
      {icon}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 ml-3 font-serif">{title}</h2>
    </div>
    <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
      {children}
    </div>
  </section>
);

// Enhanced helper component for indicator cards
const IndicatorCard = ({ title, description, formula, chartComponent }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 flex flex-col">
    <div className="flex-grow">
      <h4 className="text-xl font-semibold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-2">{title}</h4>
      <p className="text-base mb-4">{description}</p>
      {formula && (
        <div className="mb-4">
          <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Formula</h5>
          <code className="text-sm bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-200 rounded-md p-2 block text-left">
            {formula}
          </code>
        </div>
      )}
    </div>
    {chartComponent && <div className="mt-auto">{chartComponent}</div>}
  </div>
);

export default function TrendVsMomentumAnalysis() {
  const comparisonData = [
    { feature: 'Primary Question', trend: 'Which direction is the market heading?', momentum: 'How strong and fast is the current move?' },
    { feature: 'What It Measures', trend: 'The general direction and smoothed path of price.', momentum: 'The rate of change (velocity and acceleration) of price.' },
    { feature: 'Typical Classification', trend: 'Lagging: Confirms a trend after it has started.', momentum: 'Leading: Anticipates potential trend reversals.' },
    { feature: 'Chart Placement', trend: 'Often overlaid directly on the price chart.', momentum: 'Typically plotted in a separate window below the price chart.' },
    { feature: 'Primary Signal Type', trend: 'Crossovers (e.g., price over MA).', momentum: 'Overbought/Oversold levels and Divergence.' },
    { feature: 'Best Use Case', trend: 'In clearly trending markets.', momentum: 'Identifying potential turning points and pullbacks.' },
    { feature: 'Primary Weakness', trend: 'Prone to false signals ("whipsaws") in sideways markets.', momentum: 'Can give premature signals in strongly trending markets.' },
    { feature: 'Example Indicators', trend: 'Moving Averages (SMA, EMA), Parabolic SAR, ADX.', momentum: 'Relative Strength Index (RSI), Stochastic Oscillator, ROC.' },
  ];

  return (
    <ArticleFrame
      slug="trend-vs-momentum-technical-analysis-guide"
      additionalDisclaimer="Technical analysis involves risk, and past performance does not guarantee future results. Always conduct your own research and consider consulting with a qualified financial advisor before making investment decisions."
    >
      <Section title="Trend Indicators: Charting the Course" icon={<TrendingUp size={36} className="text-[#A8672E] dark:text-[#D08F52]" />}>
        <p>
          Trend indicators are the compass of the market. Their primary purpose is to smooth out price volatility to clearly identify the prevailing direction of a security. They answer the question, &ldquo;Which way is the market going?&rdquo; By analyzing historical price data, these tools confirm whether a market is in an uptrend, downtrend, or moving sideways. They are <strong className="font-semibold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">lagging indicators</strong>, designed to filter out market &ldquo;noise&rdquo; and confirm a trend once it&apos;s established.
        </p>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <IndicatorCard
            title="Moving Averages (MA)"
            description="The bedrock of trend analysis. A rising MA indicates an uptrend; a falling MA signals a downtrend. The EMA gives more weight to recent prices, making it more responsive than the SMA."
            formula="EMA = (Close - EMA_prev) * (2 / (N + 1)) + EMA_prev"
            chartComponent={<MovingAverageChart />}
          />
          <IndicatorCard
            title="Parabolic SAR"
            description="Provides a dynamic, trailing stop-loss level that follows the price. Dots below the price are bullish; dots above are bearish. A flip in position signals a potential reversal."
            formula="SAR_new = SAR_old + AF * (EP - SAR_old)"
          />
          <IndicatorCard
            title="Average Directional Index (ADX)"
            description="A unique meta-indicator that measures the strength of a trend, not its direction. A reading above 25 suggests a strong trend (either up or down), while a reading below 20 indicates a weak or non-trending market."
            formula="ADX is the smoothed average of the absolute DI difference."
          />
        </div>
      </Section>

      <Section title="Momentum Indicators: Measuring the Force" icon={<Zap size={36} className="text-amber-500" />}>
        <p>
          If trend indicators are the compass, momentum indicators are the speedometer. They measure the speed or velocity of price changes, answering the question, &ldquo;How strong is the current move?&rdquo; They gauge the force behind a price movement and are generally considered <strong className="font-semibold text-amber-600 dark:text-amber-400">leading indicators</strong> because momentum often slows down *before* the price changes direction, providing early warnings.
        </p>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          <IndicatorCard
            title="Relative Strength Index (RSI)"
            description="Measures the speed and magnitude of price changes on a scale of 0-100. Readings above 70 are 'overbought,' and below 30 are 'oversold.' Divergence between price and RSI is a powerful reversal signal."
            formula="RSI = 100 - [100 / (1 + (Avg Gain / Avg Loss))]"
            chartComponent={<RsiChart />}
          />
          <IndicatorCard
            title="Stochastic Oscillator"
            description="Compares a closing price to its price range over a period (0-100). It's based on the idea that in an uptrend, prices tend to close near their highs. Readings >80 are overbought, <20 are oversold."
            formula="%K = 100 * [(C - L14) / (H14 - L14)]"
          />
          <IndicatorCard
            title="Rate of Change (ROC)"
            description="A pure momentum oscillator that measures the percentage change in price from one period to the next. A cross above the zero line is a bullish signal, while a cross below is bearish."
            formula="ROC = [(Close - Close_n) / Close_n] * 100"
          />
        </div>
      </Section>

      <Section title="The Hybrid: MACD" icon={<GitMerge size={36} className="text-[#A8672E] dark:text-[#D08F52]" />}>
        <p>
          The Moving Average Convergence Divergence (MACD) is a special case, often considered both a trend and a momentum indicator.
        </p>
        <ul className="list-disc list-outside pl-5 space-y-2 mt-4">
          <li><strong className="font-semibold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Trend Component:</strong> It&apos;s built from the difference between two moving averages (typically 12 & 26-period EMAs).</li>
          <li><strong className="font-semibold text-amber-600 dark:text-amber-400">Momentum Component:</strong> The MACD Histogram visualizes the acceleration of momentum by plotting the difference between the MACD line and its 9-period EMA (the &lsquo;signal line&rsquo;).</li>
        </ul>
        <div className="grid grid-cols-1 pt-4">
          <IndicatorCard
            title="Moving Average Convergence Divergence (MACD)"
            description="A versatile tool showing the relationship between two EMAs. A bullish signal occurs when the MACD line crosses above its signal line. The histogram shows the strength of momentum."
            formula="MACD = EMA(12) - EMA(26)"
            chartComponent={<MacdChart />}
          />
        </div>
      </Section>

      <Section title="Core Differences: At a Glance" icon={<HelpCircle size={36} className="text-[#1D8A70] dark:text-[#3CBF9C]" />}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max text-left bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-4 md:p-6 text-lg font-semibold text-gray-600 dark:text-gray-300">Feature</th>
                <th className="p-4 md:p-6 text-lg font-semibold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] flex items-center">
                  <TrendingUp className="mr-2" /> Trend Indicators
                </th>
                <th className="p-4 md:p-6 text-lg font-semibold text-amber-600 dark:text-amber-400 flex items-center">
                  <Zap className="mr-2" /> Momentum Indicators
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-4 md:p-6 font-semibold text-gray-800 dark:text-gray-200">{row.feature}</td>
                  <td className="p-4 md:p-6 text-gray-700 dark:text-gray-300">{row.trend}</td>
                  <td className="p-4 md:p-6 text-gray-700 dark:text-gray-300">{row.momentum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Strategy Blueprints" icon={<BookOpen size={36} className="text-cyan-500" />}>
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center font-serif">
              <Layers className="mr-3 text-[#A8672E] dark:text-[#D08F52]"/>
              Strategy 1: MA + RSI for Pullback Entries
            </h3>
            <p className="mb-4 text-base">
              This strategy uses a trend indicator (Moving Average) to define the overall direction and a momentum indicator (RSI) to time entries during pullbacks.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-base">
              <li><strong className="font-semibold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Trend Filter:</strong> Use a long-term MA (e.g., 200-day EMA). If price is above it, only look for buy signals.</li>
              <li><strong className="font-semibold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Entry Trigger:</strong> In an uptrend, wait for the RSI to dip into an oversold or pullback zone (e.g., below 40).</li>
              <li><strong className="font-semibold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">Signal:</strong> Enter a buy trade when the RSI turns back up, suggesting the pullback is over and the main trend is resuming.</li>
            </ol>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center font-serif">
              <Shield className="mr-3 text-amber-500"/>
              Strategy 2: ADX + MACD to Avoid Whipsaws
            </h3>
            <p className="mb-4 text-base">
              This strategy uses the ADX to measure trend strength, acting as a filter for signals from the MACD (a hybrid indicator).
            </p>
            <ol className="list-decimal list-inside space-y-2 text-base">
              <li><strong className="font-semibold text-amber-600 dark:text-amber-400">The Problem:</strong> MACD crossovers work well in trends but give many false signals in sideways markets.</li>
              <li><strong className="font-semibold text-amber-600 dark:text-amber-400">Trend Strength Filter:</strong> Use the ADX. Only consider MACD signals if the ADX is above a threshold (e.g., 25), confirming a strong trend exists.</li>
              <li><strong className="font-semibold text-amber-600 dark:text-amber-400">Execution Logic:</strong> Ignore all MACD signals if ADX is low (e.g., below 20), as the market is likely trendless.</li>
            </ol>
          </div>
        </div>
      </Section>

      <div className="text-center pt-10 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-serif">The Power of Synergy</h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
          The most robust trading systems don&apos;t rely on a single indicator. They use trend indicators to set the context and momentum indicators for tactical timing. Use trend to find the river&apos;s current, and momentum to find the best spot to cast your line.
        </p>
      </div>
    </ArticleFrame>
  );
}
