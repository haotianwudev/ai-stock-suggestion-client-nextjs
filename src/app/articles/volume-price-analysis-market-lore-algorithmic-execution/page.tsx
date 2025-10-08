'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart, LineChart, TrendingUp, Cpu, Scale, University, Target, BookOpen, Menu, X, BrainCircuit, Landmark, Briefcase } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Main Page Component
export default function VpaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');

  const currentArticle = articles.find(article => article.slug === 'volume-price-analysis-market-lore-algorithmic-execution');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: BookOpen },
    { id: 'foundations', title: 'I. Foundations of VPA', icon: University },
    { id: 'toolkit', title: 'II. The Practitioner\'s Toolkit', icon: BarChart },
    { id: 'strategy', title: 'III. Strategic Application', icon: Target },
    { id: 'validation', title: 'IV. Empirical Validation', icon: LineChart },
    { id: 'adoption', title: 'V. Institutional Adoption', icon: Landmark },
    { id: 'ml', title: 'VI. The Algorithmic Frontier', icon: Cpu },
    { id: 'conclusion', title: 'VII. A Considered Verdict', icon: TrendingUp },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="bg-slate-50 font-sans text-slate-800 min-h-screen">
        <div className="flex">
          {/* Sidebar */}
          <aside className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 w-64 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
            <div className="p-6">
              <h2 className="text-xl font-bold text-indigo-600">VPA Research</h2>
              <p className="text-sm text-slate-500 mt-1">From Lore to Algorithms</p>
            </div>
            <nav className="mt-4 px-2">
              <ul>
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center px-4 py-2.5 my-1 text-sm font-medium rounded-lg transition-colors duration-200 text-left ${
                        activeSection === section.id
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <section.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Mobile Header */}
          <header className="fixed top-0 left-0 right-0 lg:hidden h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-4 z-30">
            <div className="flex items-center">
              <h2 className="text-lg font-bold text-indigo-600">VPA Research</h2>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 text-slate-600"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </header>

          {/* Main Content */}
          <main className="lg:pl-64 w-full transition-all duration-300 ease-in-out pt-16 lg:pt-0">
            <div className="max-w-4xl mx-auto p-6 md:p-10">
              
              {/* Return to Home Button */}
              <div className="flex items-center gap-4 mb-4">
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

              <section id="introduction" className="mb-16 scroll-mt-20">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  Volume Price Analysis: From Market Lore to Algorithmic Execution
                </h1>
                <p className="text-lg text-slate-600">
                  This report provides a comprehensive examination of Volume Price Analysis (VPA), tracing its evolution from the foundational principles of market pioneers like Dow and Wyckoff to its modern applications in institutional trading and advanced machine learning algorithms. We explore the core indicators, strategic time horizons, quantitative validation, and the increasing role of automation in leveraging volume as a predictive tool.
                </p>
                
                {currentArticle?.googleDoc && (
                  <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <p className="text-indigo-800 font-medium mb-2">📊 Comprehensive VPA Research</p>
                    <p className="text-indigo-700 text-sm mb-3">
                      Access our detailed research document covering advanced VPA methodologies, quantitative backtesting frameworks, and institutional applications.
                    </p>
                    <a 
                      href={currentArticle.googleDoc}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
                    >
                      <BarChart className="w-4 h-4 mr-1" />
                      Access Full VPA Research Document &rarr;
                    </a>
                  </div>
                )}
              </section>

              <ArticleSection id="foundations" title="I. Foundations of Volume Price Analysis">
                <p>
                  Volume Price Analysis (VPA) is a methodology that seeks to understand and forecast market movements by examining the relationship between price action and trading volume. It operates on the premise that volume is the fuel that drives the market, revealing the conviction and participation behind price moves. By analyzing volume, a trader can distinguish between genuine, sustainable trends driven by institutional "smart money" and deceptive, temporary fluctuations designed to trap retail participants.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">1.1 The Intellectual Lineage: Dow and Wyckoff</h3>
                <p>The conceptual framework of VPA evolved over more than a century:</p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-700">
                  <li>
                    <strong>Charles Dow:</strong> A foundational tenet of Dow Theory is that <strong>volume must confirm the trend</strong>. In a healthy uptrend, volume should expand as prices rise and diminish during pullbacks. A new high on weak volume is a warning sign that the trend lacks conviction.
                  </li>
                  <li>
                    <strong>Richard Wyckoff:</strong> Around 1910, Wyckoff codified these observations into a detailed methodology. He viewed the market as being controlled by a single composite operator, and his goal was to decipher this operator's intentions through price and volume. He defined the four-phase market cycle:
                  </li>
                </ul>

                <div className="my-6 p-4 border-l-4 border-indigo-200 bg-indigo-50 rounded-r-lg">
                  <p className="font-semibold text-indigo-800">The Wyckoff Market Cycle</p>
                  <p className="text-sm text-indigo-700">
                    <strong>Accumulation:</strong> A sideways range where smart money builds long positions. Characterized by high-volume selling climaxes followed by low-volume tests of support. <br/>
                    <strong>Markup:</strong> The subsequent uptrend, where demand is in control. <br/>
                    <strong>Distribution:</strong> A sideways range where smart money sells its positions. Characterized by high-volume "upthrusts" that fail to hold gains. <br/>
                    <strong>Markdown:</strong> The resulting downtrend as supply overwhelms demand.
                  </p>
                </div>

                <h3 className="text-xl font-bold mt-8 mb-4">1.2 The Three Core Laws: Deconstructing Market Dynamics</h3>
                <div className="space-y-4">
                  <InfoCard title="Law of Supply and Demand">
                    When demand exceeds supply, prices rise. When supply exceeds demand, prices fall. VPA uses volume to gauge the intensity of this balance. A wide price spread on high volume shows a clear winner; a narrow spread on high volume indicates a fierce battle at a key level.
                  </InfoCard>
                  <InfoCard title="Law of Cause and Effect">
                    A trend (the effect) is preceded by a cause (a period of accumulation or distribution in a trading range). The volume traded within that cause (the trading range) determines the magnitude of the subsequent trend.
                  </InfoCard>
                  <InfoCard title="Law of Effort vs. Result">
                    The price movement (result) should be proportional to the volume (effort). Divergences signal potential reversals. For example, a massive spike in volume (effort) that results in minimal upward price progress (result) suggests that a large supply of sellers is meeting the buyers, and the uptrend may be terminating.
                  </InfoCard>
                </div>
              </ArticleSection>

              <ArticleSection id="toolkit" title="II. The Practitioner's Toolkit">
                <p>
                  Practitioners rely on a specialized set of indicators to quantify and visualize the relationship between price and volume, transforming raw data into actionable intelligence.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-3">Key VPA Indicators</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                      <tr>
                        <th scope="col" className="px-6 py-3">Indicator</th>
                        <th scope="col" className="px-6 py-3">Type</th>
                        <th scope="col" className="px-6 py-3">Interpretation & Use Case</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-slate-900">On-Balance Volume (OBV)</th>
                        <td className="px-6 py-4">Cumulative Momentum</td>
                        <td className="px-6 py-4">Confirms trends. A rising OBV confirms an uptrend. Bullish divergence occurs when price makes a lower low but OBV makes a higher low.</td>
                      </tr>
                      <tr className="bg-slate-50 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-slate-900">Accum./Dist. Line (A/D)</th>
                        <td className="px-6 py-4">Cumulative Flow</td>
                        <td className="px-6 py-4">Focuses on where the price closes within its range. A rising line indicates buying pressure, even if the price is flat, suggesting stealth accumulation.</td>
                      </tr>
                      <tr className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-slate-900">Money Flow Index (MFI)</th>
                        <td className="px-6 py-4">Oscillator</td>
                        <td className="px-6 py-4">A volume-weighted RSI. Identifies overbought (&gt;80) / oversold (&lt;20) conditions and crucial divergences with price.</td>
                      </tr>
                      <tr className="bg-slate-50 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-slate-900">Vol.-Weighted Avg. Price (VWAP)</th>
                        <td className="px-6 py-4">Intraday Benchmark</td>
                        <td className="px-6 py-4">The average price weighted by volume. Institutions use it as a benchmark. Price above VWAP is bullish intraday; below is bearish. Acts as dynamic support/resistance.</td>
                      </tr>
                      <tr className="bg-white">
                        <th scope="row" className="px-6 py-4 font-medium text-slate-900">Volume Profile</th>
                        <td className="px-6 py-4">Structural Histogram</td>
                        <td className="px-6 py-4">Shows volume traded at specific price levels. Identifies Point of Control (POC) - highest volume node - as a key support/resistance magnet.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ArticleSection>

              <ArticleSection id="strategy" title="III. Strategic Application and Effective Time Horizons">
                <p>
                  VPA is not a standalone system but a versatile framework for interpreting market dynamics. Its signals are most powerful when combined with price action context across multiple timeframes.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-3">Core VPA Strategies</h3>
                <ul className="list-disc pl-5 space-y-3 text-slate-700">
                  <li>
                    <strong>Breakout Validation:</strong> A genuine breakout from a consolidation range must occur on a significant surge in volume (at least 150% of the average). A low-volume breakout is a red flag for a "false move" or bull trap.
                  </li>
                  <li>
                    <strong>Reversal Detection (Climaxes & Absorption):</strong> A <strong>Buying Climax</strong> occurs after a prolonged uptrend, marked by a massive volume spike and a wide price bar that closes poorly, indicating distribution. Conversely, <strong>Absorption</strong> happens at support, where high volume is met with a narrow price range, showing that large buyers are absorbing all the selling pressure.
                  </li>
                  <li>
                    <strong>The "No Supply" / "No Demand" Signal:</strong> After a pullback in an uptrend, a very low-volume down bar (No Supply) signals that selling pressure is exhausted, providing a low-risk entry point. The opposite is true for a No Demand bar in a downtrend.
                  </li>
                </ul>

                <h3 className="text-xl font-bold mt-6 mb-3">Effective Time Horizons</h3>
                <blockquote className="mt-6 border-l-4 border-slate-300 pl-4 italic text-slate-600">
                  "The principles of VPA are fractal; they apply equally to a 1-minute chart as they do to a monthly chart. The key is to match the horizon to the trading style."
                </blockquote>
                <ul className="list-disc pl-5 space-y-2 mt-4 text-slate-700">
                  <li>
                    <strong>Day Trading (1-15 min charts):</strong> Focus is on VWAP. A common strategy is to buy pullbacks to the VWAP in an uptrending stock, looking for price to be "accepted" above this level.
                  </li>
                  <li>
                    <strong>Swing Trading (4-hour & Daily charts):</strong> Look for Wyckoffian accumulation/distribution patterns over several weeks. A confirmed "Spring" (a false breakdown below support on high volume that quickly reverses) can be a powerful multi-day entry signal.
                  </li>
                  <li>
                    <strong>Long-Term Investing (Weekly & Monthly charts):</strong> Analyze volume trends over years. A stock that bases for months on a weekly chart with a steadily rising OBV is signaling quiet institutional accumulation before a major markup phase.
                  </li>
                </ul>
              </ArticleSection>

              <ArticleSection id="validation" title="IV. Empirical Validation and Quantitative Backtesting">
                <p>
                  While often viewed as a discretionary art, VPA's core tenets are increasingly validated by academic research and quantitative analysis. Studies in market microstructure confirm that volume contains significant predictive information for future returns, volatility, and liquidity.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-3">Measuring Effectiveness Quantitatively</h3>
                <p>
                  To move from theory to practice, any VPA-based strategy must be rigorously backtested. This involves programming the strategy's rules and running them on historical data to simulate performance. Key considerations include accounting for transaction costs, slippage, and avoiding lookahead bias.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-slate-500">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                      <tr>
                        <th scope="col" className="px-6 py-3">Metric</th>
                        <th scope="col" className="px-6 py-3">Measures</th>
                        <th scope="col" className="px-6 py-3">Acceptable Benchmark</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-slate-900">Profit Factor</th>
                        <td className="px-6 py-4">Gross profit / Gross loss</td>
                        <td className="px-6 py-4">&gt; 1.75 indicates a robust edge</td>
                      </tr>
                      <tr className="bg-slate-50 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-slate-900">Sharpe Ratio</th>
                        <td className="px-6 py-4">Risk-adjusted return (vs. risk-free rate)</td>
                        <td className="px-6 py-4">&gt; 1.0 is considered good; &gt; 2.0 is excellent</td>
                      </tr>
                      <tr className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-slate-900">Max Drawdown (MDD)</th>
                        <td className="px-6 py-4">Peak-to-trough decline; worst-case loss</td>
                        <td className="px-6 py-4">&lt; 20% is desirable for most strategies</td>
                      </tr>
                      <tr className="bg-slate-50 border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-slate-900">Calmar Ratio</th>
                        <td className="px-6 py-4">Annual return / Max Drawdown</td>
                        <td className="px-6 py-4">&gt; 1.0 suggests returns outweigh the risk taken</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ArticleSection>

              <ArticleSection id="adoption" title="V. Institutional Adoption">
                <p>
                  VPA principles are not just for retail traders; they are deeply embedded in professional and institutional trading, often in highly quantitative and automated forms.
                </p>
                <ul className="list-disc pl-5 space-y-3 text-slate-700 mt-4">
                  <li>
                    <strong>Execution Algorithms:</strong> The industry-standard VWAP algorithm is a direct application of VPA. Its entire purpose is to break up a large order and execute it in line with the stock's natural volume profile throughout the day to minimize market impact. This is VPA used defensively.
                  </li>
                  <li>
                    <strong>Tracking "Smart Money":</strong> Quantitative funds and hedge fund analysts build proprietary models to detect institutional activity. They analyze tick data to identify volume signatures of large block trades, even those hidden in dark pools, to front-run or follow major players.
                  </li>
                  <li>
                    <strong>Market Making & Liquidity Provision:</strong> Market makers on options desks use volume profile to identify key gamma exposure levels. High volume nodes represent areas where there is significant open interest, which can act as price pins or accelerators upon a breakout.
                  </li>
                </ul>
              </ArticleSection>

              <ArticleSection id="ml" title="VI. The Algorithmic Frontier: VPA and Machine Learning">
                <p>
                  Machine learning (ML) and deep learning (DL) are revolutionizing VPA, moving it from a qualitative art to a quantitative science. These techniques can identify complex, non-linear patterns in price and volume data that are invisible to the human eye.
                </p>
                <ul className="list-disc pl-5 space-y-3 text-slate-700 mt-4">
                  <li>
                    <strong>Feature Engineering:</strong> Success in ML trading models heavily depends on creating informative features. Volume-derived features are consistently among the most predictive. Examples include: volume momentum (rate of change), volume acceleration, up/down volume ratios, and the ratio of current volume to its short and long-term moving averages.
                  </li>
                  <li>
                    <strong>Supervised Learning for Prediction:</strong> Models like Gradient Boosting Machines (XGBoost) and neural networks are trained on historical data to predict future price movements (e.g., will the price be higher in 5 bars?). Volume features are critical inputs for these models to learn the context of price action.
                  </li>
                  <li>
                    <strong>Deep Learning (LSTM & CNN):</strong> Long Short-Term Memory (LSTM) networks are ideal for time-series data as they can "remember" long sequences of past price/volume action. This allows them to recognize the development of complex Wyckoffian phases over time. Convolutional Neural Networks (CNNs) can be used to treat charts as images, identifying VPA patterns visually.
                  </li>
                  <li>
                    <strong>Unsupervised Learning for Regime Detection:</strong> Clustering algorithms can analyze multi-dimensional volume and volatility data to automatically identify and classify different market regimes (e.g., 'low-volume consolidation,' 'high-volume breakout,' 'volatile distribution') without prior labels, allowing strategies to adapt dynamically.
                  </li>
                </ul>
              </ArticleSection>

              <ArticleSection id="conclusion" title="VII. A Considered Verdict for the Modern Investor">
                <p>
                  Volume Price Analysis remains one of the most robust and insightful methods for analyzing financial markets. Its principles are timeless because they are rooted in the fundamental market forces of supply and demand. By learning to read the story told by volume, a trader can gain a significant edge over those who focus on price alone.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-3">Challenges and Considerations</h3>
                <p>
                  VPA is not a "holy grail." Its application requires significant screen time, patience, and a probabilistic mindset. Signals can be ambiguous, and the modern market structure with high-frequency trading and dark pools can sometimes distort volume data. It is a discretionary skill that demands continuous learning and adaptation.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-3">Final Recommendation: Who Should Use VPA?</h3>
                <div className="mt-4 p-5 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-bold text-green-800">
                    For the casual, passive investor focused on long-term buy-and-hold strategies, the complexity of VPA is likely unnecessary and could lead to over-trading.
                  </p>
                  <p className="mt-2 font-bold text-indigo-800">
                    However, for the <strong>serious, active retail trader or sophisticated investor</strong> seeking a deeper understanding of market mechanics, VPA is an <strong>invaluable and highly recommended methodology</strong>. The learning curve is steep, but the investment in mastering VPA provides a durable, structural framework for analyzing any liquid market, paying substantial intellectual and financial dividends over a lifetime.
                  </p>
                </div>
              </ArticleSection>

              {/* Call to Action */}
              {currentArticle?.googleDoc && (
                <section className="py-16 text-center">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Master Volume Price Analysis</h3>
                    <p className="text-slate-600 mb-8">
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
                </section>
              )}

              {/* Footer */}
              <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
                <p>© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

// Helper component for article sections
const ArticleSection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="mb-12 scroll-mt-20">
    <div className="relative">
      <h2 className="text-3xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
        {title}
      </h2>
      <div className="prose prose-slate max-w-none prose-p:text-slate-700 prose-li:text-slate-700 prose-blockquote:text-slate-600">
        {children}
      </div>
    </div>
  </section>
);

// Helper component for info cards
const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="p-4 border rounded-lg bg-white shadow-sm">
    <h4 className="font-semibold text-lg text-indigo-700 mb-1">{title}</h4>
    <p className="text-slate-700">{children}</p>
  </div>
);