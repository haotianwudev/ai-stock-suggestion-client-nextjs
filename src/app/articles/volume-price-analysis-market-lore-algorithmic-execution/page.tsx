'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

export default function VpaPage() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const currentArticle = articles.find(article => article.slug === 'volume-price-analysis-market-lore-algorithmic-execution');

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title || 'Volume Price Analysis: From Market Lore to Algorithmic Execution'} 
            articleSlug={currentArticle.slug || 'volume-price-analysis-market-lore-algorithmic-execution'} 
          />
        </>
      )}

      {/* Return to Home Button */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Deep Research Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          Deep Research
        </span>
      </div>

      {/* Hero Section */}
      <div className="bg-white relative overflow-hidden border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Volume Price Analysis: From Market Lore to Algorithmic Execution
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
            A comprehensive examination of Volume Price Analysis (VPA), tracing its evolution from the foundational principles of market pioneers like Dow and Wyckoff to its modern applications in institutional trading and advanced machine learning algorithms.
          </p>
        </div>
      </div>

      {/* Hero Infographic - Below Title with Full-Screen Capability */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img 
            src="https://i.imgur.com/gy3HaKW.jpeg" 
            alt="Volume Price Analysis Comprehensive Guide" 
            className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
          />
          {/* Full-screen button overlay */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsImageViewerOpen(true);
            }}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
            title="View full screen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          {/* Click hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
            <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
              Click to view full screen
            </div>
          </div>
        </div>
      </section>

      {/* Full-screen image viewer */}
      <FullScreenImageViewer
        src="https://i.imgur.com/gy3HaKW.jpeg"
        alt="Volume Price Analysis Comprehensive Guide"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        
        {/* Introduction */}
        <section className="mb-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-700 leading-relaxed mb-8">
              Volume Price Analysis (VPA) is a methodology that seeks to understand and forecast market movements by examining the relationship between price action and trading volume. It operates on the premise that volume is the fuel that drives the market, revealing the conviction and participation behind price moves. By analyzing volume, a trader can distinguish between genuine, sustainable trends driven by institutional "smart money" and deceptive, temporary fluctuations designed to trap retail participants.
            </p>
            
            {currentArticle?.googleDoc && (
              <div className="mt-8 p-6 bg-indigo-50 border border-indigo-200 rounded-xl">
                <p className="text-indigo-800 font-semibold mb-2 text-lg">📊 Comprehensive VPA Research</p>
                <p className="text-indigo-700 mb-4">
                  Access our detailed research document covering advanced VPA methodologies, quantitative backtesting frameworks, and institutional applications.
                </p>
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                >
                  <BarChart className="w-5 h-5 mr-2" />
                  Access Full VPA Research Document &rarr;
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Foundations Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Foundations of Volume Price Analysis</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">The Intellectual Lineage: Dow and Wyckoff</h3>
              <p className="text-lg text-slate-700 mb-6">The conceptual framework of VPA evolved over more than a century:</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-blue-900 text-lg mb-3">Charles Dow</h4>
                  <p className="text-blue-800">
                    A foundational tenet of Dow Theory is that <strong>volume must confirm the trend</strong>. In a healthy uptrend, volume should expand as prices rise and diminish during pullbacks. A new high on weak volume is a warning sign that the trend lacks conviction.
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h4 className="font-bold text-green-900 text-lg mb-3">Richard Wyckoff</h4>
                  <p className="text-green-800">
                    Around 1910, Wyckoff codified these observations into a detailed methodology. He viewed the market as being controlled by a single composite operator, and his goal was to decipher this operator's intentions through price and volume.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl border border-indigo-200 mb-8">
                <h4 className="font-bold text-indigo-900 text-xl mb-4">The Wyckoff Market Cycle</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-indigo-800 mb-2"><strong>Accumulation:</strong> A sideways range where smart money builds long positions. Characterized by high-volume selling climaxes followed by low-volume tests of support.</p>
                    <p className="text-indigo-800"><strong>Markup:</strong> The subsequent uptrend, where demand is in control.</p>
                  </div>
                  <div>
                    <p className="text-indigo-800 mb-2"><strong>Distribution:</strong> A sideways range where smart money sells its positions. Characterized by high-volume "upthrusts" that fail to hold gains.</p>
                    <p className="text-indigo-800"><strong>Markdown:</strong> The resulting downtrend as supply overwhelms demand.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">The Three Core Laws: Deconstructing Market Dynamics</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                  <h4 className="font-bold text-lg text-indigo-700 mb-3">Law of Supply and Demand</h4>
                  <p className="text-slate-700">
                    When demand exceeds supply, prices rise. When supply exceeds demand, prices fall. VPA uses volume to gauge the intensity of this balance. A wide price spread on high volume shows a clear winner; a narrow spread on high volume indicates a fierce battle at a key level.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                  <h4 className="font-bold text-lg text-indigo-700 mb-3">Law of Cause and Effect</h4>
                  <p className="text-slate-700">
                    A trend (the effect) is preceded by a cause (a period of accumulation or distribution in a trading range). The volume traded within that cause (the trading range) determines the magnitude of the subsequent trend.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                  <h4 className="font-bold text-lg text-indigo-700 mb-3">Law of Effort vs. Result</h4>
                  <p className="text-slate-700">
                    The price movement (result) should be proportional to the volume (effort). Divergences signal potential reversals. For example, a massive spike in volume (effort) that results in minimal upward price progress (result) suggests that a large supply of sellers is meeting the buyers, and the uptrend may be terminating.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practitioner's Toolkit */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">The Practitioner's Toolkit</h2>
          <p className="text-lg text-slate-700 mb-8">
            Practitioners rely on a specialized set of indicators to quantify and visualize the relationship between price and volume, transforming raw data into actionable intelligence.
          </p>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800">Key VPA Indicators</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Indicator</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Interpretation & Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-900">On-Balance Volume (OBV)</td>
                    <td className="px-6 py-4 text-slate-700">Cumulative Momentum</td>
                    <td className="px-6 py-4 text-slate-700">Confirms trends. A rising OBV confirms an uptrend. Bullish divergence occurs when price makes a lower low but OBV makes a higher low.</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">Accum./Dist. Line (A/D)</td>
                    <td className="px-6 py-4 text-slate-700">Cumulative Flow</td>
                    <td className="px-6 py-4 text-slate-700">Focuses on where the price closes within its range. A rising line indicates buying pressure, even if the price is flat, suggesting stealth accumulation.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-900">Money Flow Index (MFI)</td>
                    <td className="px-6 py-4 text-slate-700">Oscillator</td>
                    <td className="px-6 py-4 text-slate-700">A volume-weighted RSI. Identifies overbought (&gt;80) / oversold (&lt;20) conditions and crucial divergences with price.</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">Vol.-Weighted Avg. Price (VWAP)</td>
                    <td className="px-6 py-4 text-slate-700">Intraday Benchmark</td>
                    <td className="px-6 py-4 text-slate-700">The average price weighted by volume. Institutions use it as a benchmark. Price above VWAP is bullish intraday; below is bearish. Acts as dynamic support/resistance.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-900">Volume Profile</td>
                    <td className="px-6 py-4 text-slate-700">Structural Histogram</td>
                    <td className="px-6 py-4 text-slate-700">Shows volume traded at specific price levels. Identifies Point of Control (POC) - highest volume node - as a key support/resistance magnet.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Strategic Application */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Strategic Application and Effective Time Horizons</h2>
          <p className="text-lg text-slate-700 mb-8">
            VPA is not a standalone system but a versatile framework for interpreting market dynamics. Its signals are most powerful when combined with price action context across multiple timeframes.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Core VPA Strategies</h3>
              <div className="grid gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-3">Breakout Validation</h4>
                  <p className="text-blue-800">
                    A genuine breakout from a consolidation range must occur on a significant surge in volume (at least 150% of the average). A low-volume breakout is a red flag for a "false move" or bull trap.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h4 className="font-bold text-green-900 mb-3">Reversal Detection (Climaxes & Absorption)</h4>
                  <p className="text-green-800">
                    A <strong>Buying Climax</strong> occurs after a prolonged uptrend, marked by a massive volume spike and a wide price bar that closes poorly, indicating distribution. Conversely, <strong>Absorption</strong> happens at support, where high volume is met with a narrow price range, showing that large buyers are absorbing all the selling pressure.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <h4 className="font-bold text-purple-900 mb-3">The "No Supply" / "No Demand" Signal</h4>
                  <p className="text-purple-800">
                    After a pullback in an uptrend, a very low-volume down bar (No Supply) signals that selling pressure is exhausted, providing a low-risk entry point. The opposite is true for a No Demand bar in a downtrend.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Effective Time Horizons</h3>
              <blockquote className="border-l-4 border-slate-300 pl-6 italic text-slate-600 text-lg mb-6">
                "The principles of VPA are fractal; they apply equally to a 1-minute chart as they do to a monthly chart. The key is to match the horizon to the trading style."
              </blockquote>
              
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Day Trading (1-15 min charts)</h4>
                  <p className="text-slate-700">
                    Focus is on VWAP. A common strategy is to buy pullbacks to the VWAP in an uptrending stock, looking for price to be "accepted" above this level.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Swing Trading (4-hour & Daily charts)</h4>
                  <p className="text-slate-700">
                    Look for Wyckoffian accumulation/distribution patterns over several weeks. A confirmed "Spring" (a false breakdown below support on high volume that quickly reverses) can be a powerful multi-day entry signal.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Long-Term Investing (Weekly & Monthly charts)</h4>
                  <p className="text-slate-700">
                    Analyze volume trends over years. A stock that bases for months on a weekly chart with a steadily rising OBV is signaling quiet institutional accumulation before a major markup phase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Empirical Validation */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Empirical Validation and Quantitative Backtesting</h2>
          <p className="text-lg text-slate-700 mb-8">
            While often viewed as a discretionary art, VPA's core tenets are increasingly validated by academic research and quantitative analysis. Studies in market microstructure confirm that volume contains significant predictive information for future returns, volatility, and liquidity.
          </p>

          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-xl border border-slate-200 mb-8">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">Measuring Effectiveness Quantitatively</h3>
            <p className="text-slate-700 mb-6">
              To move from theory to practice, any VPA-based strategy must be rigorously backtested. This involves programming the strategy's rules and running them on historical data to simulate performance. Key considerations include accounting for transaction costs, slippage, and avoiding lookahead bias.
            </p>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Metric</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Measures</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Acceptable Benchmark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-900">Profit Factor</td>
                    <td className="px-6 py-4 text-slate-700">Gross profit / Gross loss</td>
                    <td className="px-6 py-4 text-slate-700">&gt; 1.75 indicates a robust edge</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">Sharpe Ratio</td>
                    <td className="px-6 py-4 text-slate-700">Risk-adjusted return (vs. risk-free rate)</td>
                    <td className="px-6 py-4 text-slate-700">&gt; 1.0 is considered good; &gt; 2.0 is excellent</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-900">Max Drawdown (MDD)</td>
                    <td className="px-6 py-4 text-slate-700">Peak-to-trough decline; worst-case loss</td>
                    <td className="px-6 py-4 text-slate-700">&lt; 20% is desirable for most strategies</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">Calmar Ratio</td>
                    <td className="px-6 py-4 text-slate-700">Annual return / Max Drawdown</td>
                    <td className="px-6 py-4 text-slate-700">&gt; 1.0 suggests returns outweigh the risk taken</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Institutional Adoption */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Institutional Adoption</h2>
          <p className="text-lg text-slate-700 mb-8">
            VPA principles are not just for retail traders; they are deeply embedded in professional and institutional trading, often in highly quantitative and automated forms.
          </p>
          
          <div className="grid gap-6">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200">
              <h3 className="font-bold text-indigo-900 text-lg mb-3">Execution Algorithms</h3>
              <p className="text-indigo-800">
                The industry-standard VWAP algorithm is a direct application of VPA. Its entire purpose is to break up a large order and execute it in line with the stock's natural volume profile throughout the day to minimize market impact. This is VPA used defensively.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="font-bold text-green-900 text-lg mb-3">Tracking "Smart Money"</h3>
              <p className="text-green-800">
                Quantitative funds and hedge fund analysts build proprietary models to detect institutional activity. They analyze tick data to identify volume signatures of large block trades, even those hidden in dark pools, to front-run or follow major players.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="font-bold text-purple-900 text-lg mb-3">Market Making & Liquidity Provision</h3>
              <p className="text-purple-800">
                Market makers on options desks use volume profile to identify key gamma exposure levels. High volume nodes represent areas where there is significant open interest, which can act as price pins or accelerators upon a breakout.
              </p>
            </div>
          </div>
        </section>

        {/* Algorithmic Frontier */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">The Algorithmic Frontier: VPA and Machine Learning</h2>
          <p className="text-lg text-slate-700 mb-8">
            Machine learning (ML) and deep learning (DL) are revolutionizing VPA, moving it from a qualitative art to a quantitative science. These techniques can identify complex, non-linear patterns in price and volume data that are invisible to the human eye.
          </p>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg mb-3">Feature Engineering</h3>
              <p className="text-slate-700">
                Success in ML trading models heavily depends on creating informative features. Volume-derived features are consistently among the most predictive. Examples include: volume momentum (rate of change), volume acceleration, up/down volume ratios, and the ratio of current volume to its short and long-term moving averages.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg mb-3">Supervised Learning for Prediction</h3>
              <p className="text-slate-700">
                Models like Gradient Boosting Machines (XGBoost) and neural networks are trained on historical data to predict future price movements (e.g., will the price be higher in 5 bars?). Volume features are critical inputs for these models to learn the context of price action.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg mb-3">Deep Learning (LSTM & CNN)</h3>
              <p className="text-slate-700">
                Long Short-Term Memory (LSTM) networks are ideal for time-series data as they can "remember" long sequences of past price/volume action. This allows them to recognize the development of complex Wyckoffian phases over time. Convolutional Neural Networks (CNNs) can be used to treat charts as images, identifying VPA patterns visually.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <h3 className="font-bold text-slate-900 text-lg mb-3">Unsupervised Learning for Regime Detection</h3>
              <p className="text-slate-700">
                Clustering algorithms can analyze multi-dimensional volume and volatility data to automatically identify and classify different market regimes (e.g., 'low-volume consolidation,' 'high-volume breakout,' 'volatile distribution') without prior labels, allowing strategies to adapt dynamically.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">A Considered Verdict for the Modern Investor</h2>
          <p className="text-lg text-slate-700 mb-8">
            Volume Price Analysis remains one of the most robust and insightful methods for analyzing financial markets. Its principles are timeless because they are rooted in the fundamental market forces of supply and demand. By learning to read the story told by volume, a trader can gain a significant edge over those who focus on price alone.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Challenges and Considerations</h3>
              <p className="text-lg text-slate-700">
                VPA is not a "holy grail." Its application requires significant screen time, patience, and a probabilistic mindset. Signals can be ambiguous, and the modern market structure with high-frequency trading and dark pools can sometimes distort volume data. It is a discretionary skill that demands continuous learning and adaptation.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Final Recommendation: Who Should Use VPA?</h3>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border border-green-200">
                <p className="text-green-800 font-medium mb-4">
                  For the casual, passive investor focused on long-term buy-and-hold strategies, the complexity of VPA is likely unnecessary and could lead to over-trading.
                </p>
                <p className="text-indigo-800 font-semibold text-lg">
                  However, for the <strong>serious, active retail trader or sophisticated investor</strong> seeking a deeper understanding of market mechanics, VPA is an <strong>invaluable and highly recommended methodology</strong>. The learning curve is steep, but the investment in mastering VPA provides a durable, structural framework for analyzing any liquid market, paying substantial intellectual and financial dividends over a lifetime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        {currentArticle?.googleDoc && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Master Volume Price Analysis</h3>
            <p className="text-gray-700 mb-6">
              Dive deeper into our comprehensive research covering advanced VPA techniques, quantitative validation methods, and machine learning applications in volume analysis.
            </p>
            <a 
              href={currentArticle.googleDoc}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
            >
              <BarChart className="inline mr-2" />
              Read Complete VPA Research
            </a>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
          <p>© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
        </footer>
      </main>
    </>
  );
}
