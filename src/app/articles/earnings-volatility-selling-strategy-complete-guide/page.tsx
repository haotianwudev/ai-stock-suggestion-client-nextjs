'use client';

import { ArrowRight, BookOpen, BrainCircuit, TrendingUp, AlertTriangle, Calculator, BarChart3, Shield, DollarSign } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

// Type definitions
interface StrategyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  keyPoints: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

// Helper component for section titles
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-12 text-center">
    {children}
  </h2>
);

// Helper component for strategy cards
const StrategyCard = ({ icon, title, description, keyPoints, riskLevel }: StrategyCardProps) => {
  const riskColors = {
    low: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300',
    medium: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300',
    high: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300'
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden transform hover:-translate-y-2">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-cyan-500 dark:bg-cyan-600 text-white rounded-full p-3 mr-4">
              {icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{title}</h3>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${riskColors[riskLevel]}`}>
            {riskLevel.toUpperCase()} RISK
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{description}</p>
        <div className="space-y-3">
          <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300">Key Points:</h4>
          <ul className="space-y-2">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <ArrowRight className="w-4 h-4 text-cyan-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function EarningsVolatilitySellingStrategy() {
  const strategies = [
    {
      icon: <TrendingUp size={28} />,
      title: "Short Straddle",
      description: "The most direct way to short volatility. Involves selling one at-the-money call and one at-the-money put with the same expiration.",
      keyPoints: [
        "Profit when stock moves less than premium collected",
        "Benefits from sharp IV crush post-earnings",
        "Unlimited loss potential (tail risk)",
        "High gamma risk near expiration",
        "9% mean return per trade"
      ],
      riskLevel: 'high' as const
    },
    {
      icon: <Shield size={28} />,
      title: "Long Calendar Spread",
      description: "A defined-risk alternative involving selling front-month and buying back-month options at the same strike.",
      keyPoints: [
        "Front-month IV crushes more than back-month",
        "Profit from vega decay differential",
        "Limited loss to initial debit paid",
        "Safer return profile than straddles",
        "7.3% mean return per trade"
      ],
      riskLevel: 'medium' as const
    }
  ];

  const performanceMetrics = [
    { metric: "Mean Return (Straddle)", value: "9%", description: "Per trade when filtered" },
    { metric: "Mean Return (Calendar)", value: "7.3%", description: "Per trade when filtered" },
    { metric: "Win Rate (Straddle)", value: "64%", description: "Percentage of profitable trades" },
    { metric: "Win Rate (Calendar)", value: "66%", description: "Percentage of profitable trades" },
    { metric: "Potential CAGR", value: "~90%", description: "With proper sizing (10% Kelly)" },
    { metric: "Portfolio Growth", value: "$6M", description: "From $10k in 10 years" }
  ];

  return (
    <ArticleFrame
      slug="earnings-volatility-selling-strategy-complete-guide"
      additionalDisclaimer="Options trading involves substantial risk and is not suitable for all investors. Never risk more than you can afford to lose."
    >
      <div className="space-y-16">
        {/* Strategy Overview */}
        <section id="overview">
          <SectionTitle>Strategy Overview</SectionTitle>
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <BookOpen className="w-8 h-8 text-cyan-600 mr-4" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Core Strategy</h3>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              The earnings volatility selling strategy involves selling short-term options (straddles or calendar spreads)
              before earnings announcements to profit from two key factors: the rapid drop in Implied Volatility (IV)
              post-announcement (IV Crush), and the tendency for stocks to move less than the options market has priced in.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-lg">
                <h4 className="font-bold text-cyan-800 dark:text-cyan-300 text-lg mb-3">Why It Works</h4>
                <ul className="space-y-2 text-cyan-700 dark:text-cyan-400">
                  <li>• IV typically exceeds realized volatility pre-earnings</li>
                  <li>• Uncertainty premium disappears post-announcement</li>
                  <li>• Market makers price in larger moves than typically occur</li>
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 text-lg mb-3">Edge Sources</h4>
                <ul className="space-y-2 text-blue-700 dark:text-blue-400">
                  <li>• Hedgers overpay for protection</li>
                  <li>• Retail speculators chase lottery tickets</li>
                  <li>• Statistical arbitrage in volatility pricing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {performanceMetrics.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{item.value}</div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{item.metric}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Theoretical Foundations */}
        <section id="foundations">
          <SectionTitle>Theoretical Foundations</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <BrainCircuit className="w-8 h-8 text-purple-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Implied vs. Realized Volatility</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Historically, the implied volatility (IV) priced into options before an earnings event is higher
                than the realized volatility (RV) of the actual stock move. This premium exists because of uncertainty.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <strong className="text-purple-800 dark:text-purple-300">Key Insight:</strong>
                <p className="text-purple-700 dark:text-purple-400 mt-2">
                  We profit when this uncertainty resolves and IV &ldquo;crushes&rdquo; back to normal levels.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <DollarSign className="w-8 h-8 text-green-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Who Overpays for Options?</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Hedgers (Institutions)</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Price-insensitive participants who buy protection regardless of cost to secure portfolios.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Speculators (Retail)</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Buy short-dated calls hoping for lottery-like payouts, inflating demand and prices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Execution Guide */}
        <section id="execution">
          <SectionTitle>Step-by-Step Execution Guide</SectionTitle>
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-cyan-600 mb-6">Step 1: Screen for Opportunities</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Filter the universe of upcoming earnings announcements for high-probability setups using three key criteria:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-lg">
                  <h4 className="font-bold text-cyan-800 dark:text-cyan-300 mb-3">Term Structure Backwardation</h4>
                  <p className="text-cyan-700 dark:text-cyan-400 text-sm">
                    Front-month IV must be significantly higher than back-month IV, indicating overpriced short-term volatility.
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3">High IV/RV Ratio</h4>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">
                    Implied volatility should be inflated relative to historical realized volatility (ideally ratio &gt; 1.5).
                  </p>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg">
                  <h4 className="font-bold text-indigo-800 dark:text-indigo-300 mb-3">Sufficient Liquidity</h4>
                  <p className="text-indigo-700 dark:text-indigo-400 text-sm">
                    High average trading volume ensures minimal slippage on entry and exit.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Step 2: Trade Entry</h3>
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h4 className="font-bold text-green-800 dark:text-green-300 text-lg mb-2">Execution Time</h4>
                  <p className="text-green-700 dark:text-green-400">
                    Open position <strong>15 minutes before market close</strong> on earnings announcement day.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Step 3: Trade Exit</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h4 className="font-bold text-blue-800 dark:text-blue-300 text-lg mb-2">Execution Time</h4>
                  <p className="text-blue-700 dark:text-blue-400">
                    Close position <strong>15 minutes after market open</strong> the following trading day.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-red-600 mb-6">Step 4: Position Sizing (Critical)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-bold text-red-800 dark:text-red-300 text-lg mb-2">Short Straddles</h4>
                  <p className="text-red-700 dark:text-red-400 text-2xl font-bold mb-2">≤ 2%</p>
                  <p className="text-red-600 dark:text-red-400">of capital per trade</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-300 text-lg mb-2">Calendar Spreads</h4>
                  <p className="text-yellow-700 dark:text-yellow-400 text-2xl font-bold mb-2">≤ 6%</p>
                  <p className="text-yellow-600 dark:text-yellow-400">of capital per trade</p>
                </div>
              </div>
              <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  <AlertTriangle className="w-5 h-5 inline mr-2 text-red-500" />
                  Never use full Kelly sizing. Even with statistical edge, improper sizing leads to ruin.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trade Structures */}
        <section id="structures">
          <SectionTitle>Trade Structures & Mechanics</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {strategies.map((strategy, index) => (
              <StrategyCard key={index} {...strategy} />
            ))}
          </div>
        </section>

        {/* Data & Backtesting */}
        <section id="data">
          <SectionTitle>Data & Backtesting Evidence</SectionTitle>
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <BarChart3 className="w-8 h-8 text-purple-600 mr-4" />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Methodology</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Dataset Scale</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Earnings Events:</span>
                    <span className="font-bold text-purple-600">72,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Stocks Analyzed:</span>
                    <span className="font-bold text-purple-600">4,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Time Period:</span>
                    <span className="font-bold text-purple-600">2007-2024</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Finding</h4>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <p className="text-red-700 dark:text-red-400 font-medium">
                    Blindly trading every earnings event results in near 0% mean return.
                    The edge only exists when filtering for high-probability setups.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Filtered Results</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span>Straddle Mean Return</span>
                  <span className="font-bold text-green-600">9.0%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span>Calendar Mean Return</span>
                  <span className="font-bold text-green-600">7.3%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span>Straddle Win Rate</span>
                  <span className="font-bold text-blue-600">64%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span>Calendar Win Rate</span>
                  <span className="font-bold text-blue-600">66%</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Filter Criteria</h4>
              <div className="space-y-4">
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h5 className="font-bold text-cyan-700 dark:text-cyan-300">Term Structure Slope</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Most important predictor of success</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h5 className="font-bold text-blue-700 dark:text-blue-300">IV/RV Ratio</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Confirms overpriced volatility</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h5 className="font-bold text-purple-700 dark:text-purple-300">High Volume</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Indicates price-insensitive participants</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Management */}
        <section id="risk">
          <SectionTitle>Risk Management & Position Sizing</SectionTitle>
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-red-600 mb-6 text-center">The Four Pillars of Risk Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                  <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">1. Never Trade Full Kelly</h4>
                  <p className="text-red-700 dark:text-red-400 text-sm">
                    Kelly Criterion maximizes growth theoretically but leads to unacceptable volatility in practice.
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                  <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-2">2. Straddles ≤ 2% Capital</h4>
                  <p className="text-orange-700 dark:text-orange-400 text-sm">
                    Strict sizing protects against devastating impact of tail risk events.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">3. Calendars ≤ 6% Capital</h4>
                  <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                    Balance between meaningful returns and capital preservation.
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">4. Avoid Low Liquidity</h4>
                  <p className="text-green-700 dark:text-green-400 text-sm">
                    Wide bid-ask spreads can completely erase the strategy&apos;s edge.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-600 mb-6 text-center">Long-Term Growth Simulation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">$10,000</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Starting Capital</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">10 Years</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Time Horizon</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">$6M</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Mean Ending Value</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Using 10% Kelly sizing (6% of capital per calendar trade) with 0% bankruptcy risk
              </p>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section id="case-study">
          <SectionTitle>Case Study: AMZN Earnings Trade</SectionTitle>
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-cyan-600 mb-4">Real-World Application</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Amazon (AMZN) earnings trade flagged as &ldquo;RECOMMEND&rdquo; by the screening criteria
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Trade Setup</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Structure:</span>
                    <span className="font-medium">Feb 7 / Mar 7 Call Calendar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Contracts:</span>
                    <span className="font-medium">100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Cost:</span>
                    <span className="font-medium">$3.33 per spread</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Risk:</span>
                    <span className="font-medium text-red-600">$33,300</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Results</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Actual Move:</span>
                    <span className="font-medium">+2.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Expected Move:</span>
                    <span className="font-medium">~7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Outcome:</span>
                    <span className="font-medium">Perfect IV crush</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-gray-600 dark:text-gray-400">Profit:</span>
                    <span className="font-bold text-green-600 text-lg">+$9,300</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-2 border-dashed border-yellow-300">
              <h4 className="text-xl font-bold text-yellow-700 dark:text-yellow-300 mb-3 text-center">
                Trade-off Analysis
              </h4>
              <p className="text-center text-gray-700 dark:text-gray-300">
                A straddle on the same event would have yielded higher profits but with unlimited loss potential.
                The calendar&apos;s defined-risk structure provides crucial protection against large unexpected moves.
              </p>
            </div>
          </div>
        </section>

        {/* Building Tools */}
        <section id="tools">
          <SectionTitle>Building a Screening Tool</SectionTitle>
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Calculator className="w-8 h-8 text-indigo-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Implementation Guide</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                To build an effective scanner, you need to implement the filtering logic that identifies
                high-probability setups from the universe of earnings announcements.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg">
                  <h4 className="font-bold text-indigo-800 dark:text-indigo-300 mb-3">Data Requirements</h4>
                  <ul className="text-sm text-indigo-700 dark:text-indigo-400 space-y-2">
                    <li>• Earnings calendar</li>
                    <li>• Options chains (IV, Greeks)</li>
                    <li>• Historical stock prices</li>
                    <li>• Volume data</li>
                  </ul>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                  <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3">Key Calculations</h4>
                  <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-2">
                    <li>• Term structure slope</li>
                    <li>• IV/RV ratio</li>
                    <li>• 30-day average volume</li>
                    <li>• Realized volatility</li>
                  </ul>
                </div>
                <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg">
                  <h4 className="font-bold text-pink-800 dark:text-pink-300 mb-3">Recommendation Engine</h4>
                  <ul className="text-sm text-pink-700 dark:text-pink-400 space-y-2">
                    <li>• RECOMMEND: All criteria met</li>
                    <li>• CONSIDER: Partial criteria</li>
                    <li>• AVOID: Poor setup</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-cyan-600 mb-6">Formulas & Implementation</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Term Structure Slope</h4>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
                    slope = front_month_iv - back_month_iv
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                    Negative values (backwardation) indicate favorable conditions
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">IV/RV Ratio</h4>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
                    rv = stdev(log_returns_30d) * sqrt(252)<br/>
                    ratio = thirty_day_iv / rv
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                    Values &gt; 1.5 indicate overpriced volatility
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Volume Filter</h4>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
                    avg_volume = mean(volume_30d)
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                    Minimum threshold typically 500k shares/day
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
