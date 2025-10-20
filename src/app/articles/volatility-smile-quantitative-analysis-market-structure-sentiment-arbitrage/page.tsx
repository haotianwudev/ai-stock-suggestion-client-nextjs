'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, TrendingUp, AlertTriangle, Calculator, Target, Lightbulb } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Comprehensive Content Components
const VolatilitySmileChart = () => (
  <div className="my-10 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
    <h4 className="font-bold text-xl mb-4 text-gray-800 text-center">Figure 1: Morphology of Implied Volatility</h4>
    <div className="w-full" style={{ aspectRatio: '16/9' }}>
      <svg viewBox="0 0 400 250" className="w-full h-full" aria-labelledby="chartTitle">
        <title id="chartTitle">A chart showing the volatility smile and skew patterns.</title>
        {/* Axes */}
        <line x1="40" y1="220" x2="380" y2="220" stroke="#9ca3af" strokeWidth="1.5" />
        <line x1="40" y1="220" x2="40" y2="30" stroke="#9ca3af" strokeWidth="1.5" />
        {/* Ticks and Labels */}
        <text x="35" y="235" textAnchor="end" fontSize="10" fill="#4b5563">Low IV</text>
        <text x="35" y="40" textAnchor="end" fontSize="10" fill="#4b5563">High IV</text>
        <text x="40" y="240" textAnchor="middle" fontSize="10" fill="#4b5563">OTM Put</text>
        <text x="210" y="240" textAnchor="middle" fontSize="10" fill="#4b5563">ATM</text>
        <text x="380" y="240" textAnchor="middle" fontSize="10" fill="#4b5563">OTM Call</text>
        <text x="210" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#111827">Implied Volatility (σ)</text>
        <text x="390" y="225" textAnchor="end" fontSize="12" fontWeight="bold" fill="#111827">Strike Price (K)</text>
        {/* Smile Curve */}
        <path d="M 60 100 Q 210 200, 360 100" stroke="#06b6d4" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="300" y="80" fontSize="12" fill="#06b6d4" fontWeight="bold">Smile</text>
        {/* Skew Curve */}
        <path d="M 60 60 Q 180 150, 360 180" stroke="#f59e0b" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="100" y="55" fontSize="12" fill="#f59e0b" fontWeight="bold">Skew (Smirk)</text>
      </svg>
    </div>
    <p className="text-center text-sm text-gray-600 mt-4">
      Visual representation of a symmetrical <span className="text-cyan-600 font-semibold">volatility smile</span> (common in FX markets) 
      and the asymmetrical <span className="text-amber-600 font-semibold">volatility skew/smirk</span> (dominant in equity markets), 
      which reflects higher demand for downside protection.
    </p>
  </div>
);

const AssumptionTable = () => (
  <div className="my-8 overflow-x-auto">
    <h4 className="font-bold text-xl mb-4 text-gray-800">Table 1: Black-Scholes Assumptions vs. Market Realities</h4>
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left font-semibold text-gray-700 p-4 border-b">BSM Assumption</th>
          <th className="text-left font-semibold text-gray-700 p-4 border-b">Market Reality</th>
          <th className="text-left font-semibold text-gray-700 p-4 border-b">Supporting Evidence</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-cyan-50/50">
          <td className="p-4 border-b border-gray-200 font-medium">Constant Volatility</td>
          <td className="p-4 border-b border-gray-200">
            Volatility is not constant; it is <span className="text-red-600 font-semibold">stochastic</span> and varies 
            with strike price and time to maturity, creating the volatility smile and skew.
          </td>
          <td className="p-4 border-b border-gray-200">[13, 17]</td>
        </tr>
        <tr className="hover:bg-cyan-50/50">
          <td className="p-4 border-b border-gray-200 font-medium">Normal Distribution of Returns</td>
          <td className="p-4 border-b border-gray-200">
            Asset return distributions are not normal; they exhibit <span className="text-red-600 font-semibold">negative skewness</span> 
            (crashes are more severe) and <span className="text-red-600 font-semibold">excess kurtosis</span> ("fat tails").
          </td>
          <td className="p-4 border-b border-gray-200">[10, 21]</td>
        </tr>
        <tr className="hover:bg-cyan-50/50">
          <td className="p-4 border-b border-gray-200 font-medium">Continuous Asset Price Path</td>
          <td className="p-4 border-b border-gray-200">
            Asset prices can experience sudden, <span className="text-red-600 font-semibold">discontinuous jumps</span>, 
            especially around news events. This jump risk contributes to fat tails.
          </td>
          <td className="p-4 border-b border-gray-200">[13, 26]</td>
        </tr>
        <tr className="hover:bg-cyan-50/50">
          <td className="p-4 border-b border-gray-200 font-medium">Frictionless Markets</td>
          <td className="p-4 border-b border-gray-200">
            Real markets have transaction costs, including <span className="text-red-600 font-semibold">bid-ask spreads</span>, 
            which are wider for less liquid, far-from-the-money options.
          </td>
          <td className="p-4 border-b border-gray-200">[23, 27]</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const ParityFormula = () => (
  <div className="my-8 p-6 bg-gray-800 border-l-4 border-amber-400 rounded-r-lg shadow-lg">
    <p className="text-center font-mono text-xl md:text-2xl text-gray-100 tracking-wider">
      C - P = S<sub>0</sub> - K e<sup>-rT</sup>
    </p>
  </div>
);

const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 p-5 bg-cyan-50 border-l-4 border-cyan-500 rounded-r-lg shadow-sm">
    <p className="text-cyan-900">{children}</p>
  </div>
);

export default function VolatilitySmileAnalysis() {
  const currentArticle = articles.find(article => article.slug === 'volatility-smile-quantitative-analysis-market-structure-sentiment-arbitrage');
  const [selectedSection, setSelectedSection] = useState('introduction');

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Return to Home Button */}
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-20 left-6 z-40">
          <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            Deep Research
          </div>
        </div>

        {/* Header */}
        <header className="bg-gray-900 text-white shadow-lg">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="h-8 w-8 text-cyan-400" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                The Volatility Smile: Quantitative Analysis of Market Structure & Sentiment Arbitrage
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-4xl">
              Deep dive into the mathematical foundations and market implications of volatility smile patterns in options pricing
            </p>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-gray-800 text-white sticky top-0 z-30">
          <div className="container mx-auto px-6">
            <div className="flex space-x-8 overflow-x-auto py-4">
              {[
                { id: 'introduction', label: 'Introduction', icon: BookOpen },
                { id: 'causes', label: 'Market Causes', icon: TrendingUp },
                { id: 'pricing', label: 'Pricing Models', icon: Calculator },
                { id: 'implications', label: 'Trading Implications', icon: Target }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedSection(id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap ${
                    selectedSection === id 
                      ? 'bg-cyan-600 text-white' 
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          {/* Introduction Section */}
          {selectedSection === 'introduction' && (
            <section className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">The Theoretical Benchmark and the Empirical Anomaly</h2>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The study of stock options pricing is fundamentally a study of how markets quantify and price uncertainty. 
                    At the heart of this endeavor lies the concept of <span className="text-cyan-600 font-semibold">implied volatility</span>, 
                    a metric that serves as the market's collective forecast of future price fluctuations. For decades, the benchmark for 
                    understanding option prices was the elegant Black-Scholes-Merton model, which posited a world of simplified, predictable risk. 
                    However, empirical observation has consistently revealed a more complex reality, visually captured by a phenomenon known as 
                    the "volatility smile." This persistent anomaly is not merely a curiosity; it is a direct refutation of the classical model's 
                    core assumptions and provides a rich tapestry of information about market psychology, risk distribution, and structural dynamics.
                  </p>

                  <h3 className="text-2xl font-bold mt-8 mb-4">1.1 Implied Volatility: The Market's Forward-Looking Risk Metric</h3>
                  <p className="text-gray-700 mb-4">
                    Implied volatility (IV) is a cornerstone concept in derivatives finance. It is formally defined as the unique value of 
                    the volatility parameter, sigma (σ), which, when input into an option pricing model, yields a theoretical price equal 
                    to its observed market price.[1] In essence, while a model like Black-Scholes-Merton (BSM) uses volatility to calculate 
                    a price, practitioners perform the reverse operation: they take the market price as given and solve for the volatility 
                    this price implies, typically using an iterative numerical method like <span className="text-cyan-600 font-semibold">Newton-Raphson</span>.[1]
                  </p>

                  <HighlightBox>
                    <strong>Key Insight:</strong> Implied volatility is direction-neutral; it quantifies the market's expectation of the 
                    <strong> magnitude</strong> of a future price swing, not the direction. High IV indicates that significant price movements 
                    are anticipated, which could be upward or downward.
                  </HighlightBox>

                  <h3 className="text-2xl font-bold mt-8 mb-4">1.2 The World According to Black-Scholes: A Constant Volatility Paradigm</h3>
                  <p className="text-gray-700 mb-4">
                    The Black-Scholes-Merton (BSM) model, introduced in 1973, provides a closed-form solution for pricing European-style options. 
                    A direct and inescapable theoretical consequence of its assumptions—particularly <span className="text-cyan-600 font-semibold">constant volatility</span> 
                    and a <span className="text-cyan-600 font-semibold">log-normal distribution</span> of asset returns—is that the implied volatility 
                    should be identical for all options on the same underlying, irrespective of their strike price or expiration.[13, 15, 16] 
                    If the BSM model were a perfect descriptor of market reality, plotting implied volatility against strike prices would produce 
                    a completely flat, horizontal line.[16, 17]
                  </p>

                  <h3 className="text-2xl font-bold mt-8 mb-4">1.3 The Empirical Anomaly: Emergence and Morphology of the Smile</h3>
                  <p className="text-gray-700 mb-4">
                    In stark contrast to BSM theory, the empirical reality is profoundly different. When implied volatilities are plotted 
                    against strike prices, the resulting graph is consistently a curve, a phenomenon known as the 
                    <span className="text-cyan-600 font-semibold"> volatility smile</span>.[17, 18, 19, 20] The specific shape, or morphology, varies systematically:
                  </p>
                  
                  <ul className="list-disc pl-8 mt-4 space-y-2 text-gray-700 mb-6">
                    <li><strong className="text-cyan-700">Volatility Smile (Symmetrical U-Shape):</strong> IV is lowest for at-the-money (ATM) 
                    options and increases symmetrically for both in-the-money (ITM) and out-of-the-money (OTM) options. This shape is more 
                    common in foreign exchange markets.</li>
                    <li><strong className="text-amber-700">Volatility Skew or Smirk (Asymmetrical Shape):</strong> The dominant pattern in 
                    equity index options. The curve is asymmetrical and downward sloping, where IV for low-strike (OTM) puts is much higher 
                    than for high-strike (OTM) calls. This reflects a significant fear of a market crash over a sudden rally.</li>
                  </ul>

                  <VolatilitySmileChart />

                  <p className="text-gray-700 mb-6">
                    The very existence of these patterns demonstrates that the market does not price options according to the simple BSM framework. 
                    Instead, it incorporates information about non-normal returns and non-constant volatility directly into option prices.
                  </p>

                  <AssumptionTable />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Risk Warning</h3>
                    <p className="text-yellow-800">
                      Volatility smile arbitrage strategies involve complex mathematical modeling and significant capital requirements. 
                      These strategies are suitable only for sophisticated institutional investors with proper risk management systems.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Market Causes Section */}
          {selectedSection === 'causes' && (
            <section className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Deconstructing the Causes of the Volatility Smile</h2>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The volatility smile is not random but a systematic pattern rooted in the fundamental properties of asset returns 
                    and investor behavior. Its existence can be deconstructed into three primary causal layers: the statistical failure 
                    of the log-normal distribution, the economic forces driven by investor psychology, and the structural frictions of 
                    market microstructure.
                  </p>

                  <h3 className="text-2xl font-bold mt-8 mb-4">2.1 The Failure of Log-Normality: Skewness, Kurtosis, and Jump Risk</h3>
                  <p className="text-gray-700 mb-4">
                    The shape of the smile has a direct, quantifiable relationship with the market's implied 
                    <span className="text-cyan-600 font-semibold"> risk-neutral probability density function (PDF)</span>. 
                    A flat volatility curve corresponds to a log-normal PDF. Deviations from this flat line are mathematical 
                    transformations of deviations from log-normality.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-red-50 border-l-4 border-red-500 p-6">
                      <h4 className="font-semibold text-red-900 mb-3">Skew and Implied Skewness</h4>
                      <p className="text-red-800">
                        The downward-sloping volatility skew is the direct manifestation of 
                        <span className="text-red-600 font-semibold"> negative skewness</span> in the implied PDF. 
                        This means the market assigns a significantly higher probability to large, negative price moves (crashes) 
                        than to large positive ones.
                      </p>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-500 p-6">
                      <h4 className="font-semibold text-purple-900 mb-3">Smile and Implied Kurtosis ("Fat Tails")</h4>
                      <p className="text-purple-800">
                        The U-shape of a symmetrical smile implies a <span className="text-red-600 font-semibold">leptokurtic</span> PDF—a 
                        distribution with "fat tails." This means the market assigns a higher probability to extreme outcomes 
                        (both large gains and large losses) than a normal distribution would suggest.
                      </p>
                    </div>
                  </div>

                  <HighlightBox>
                    <strong>Advanced Models:</strong> To account for these realities, quantitative analysts use more sophisticated models like 
                    <span className="font-semibold"> Stochastic Volatility Models</span> (e.g., Heston) and 
                    <span className="font-semibold"> Jump-Diffusion Models</span> (e.g., Merton), which explicitly allow for non-constant 
                    volatility and sudden price jumps.
                  </HighlightBox>

                  <h3 className="text-2xl font-bold mt-8 mb-4">2.2 Market Dynamics and Investor Behavior: The Economics of Fear</h3>
                  <p className="text-gray-700 mb-4">
                    Beyond statistics, the smile is profoundly shaped by economic forces. The 1987 crash instilled a lasting 
                    <span className="text-amber-600 font-semibold">"crash-o-phobia,"</span> creating a structural demand for portfolio 
                    insurance (OTM put options). This leads to a fundamental imbalance:
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                      <h4 className="font-semibold text-blue-900 mb-3">Persistent Demand for Puts</h4>
                      <p className="text-blue-800">
                        Large, systematic demand from institutional investors to buy OTM puts as a hedge bids up their price and 
                        implied volatility, creating the elevated left wing of the curve. This fear is often quantified by the VIX index.
                      </p>
                    </div>

                    <div className="bg-green-50 border-l-4 border-green-500 p-6">
                      <h4 className="font-semibold text-green-900 mb-3">Supply of Calls</h4>
                      <p className="text-green-800">
                        The supply of OTM call options is often more plentiful, partly from 
                        <span className="text-cyan-600 font-semibold"> covered call writing</span> strategies, which can suppress 
                        their price and IV, steepening the skew.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Pricing Models Section */}
          {selectedSection === 'pricing' && (
            <section className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Calculator className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">The Roles of Puts, Calls, and Arbitrage-Free Pricing</h2>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Within the landscape defined by the smile, put and call options play distinct, though interconnected, roles. 
                    Their pricing is not independent but is rigidly linked by the fundamental no-arbitrage principle of 
                    <span className="text-cyan-600 font-semibold"> put-call parity</span>. This acts as a unifying force, 
                    ensuring that despite asymmetrical market pressures, the implied volatility at any single strike remains coherent.
                  </p>

                  <h3 className="text-2xl font-bold mt-8 mb-4">3.1 Symmetrical Instruments, Asymmetrical Usage</h3>
                  <p className="text-gray-700 mb-6">
                    While puts and calls are mathematically symmetric, their predominant uses are not. Puts are primarily for 
                    protection against downside risk, driven by institutional fear. Calls are more frequently for speculation 
                    on upside movements and for income via covered calls. This asymmetry is a primary driver of the skew's shape.
                  </p>

                  <HighlightBox>
                    <strong>Put-Call Parity: The Unifying Principle.</strong> Despite different market forces, put and call prices 
                    are bound by a model-free, no-arbitrage relationship for European options.
                  </HighlightBox>

                  <ParityFormula />

                  <p className="text-gray-700 mb-6">
                    This relationship has a profound implication: the implied volatility for a European put and call with the same 
                    strike and maturity <span className="text-red-600 font-semibold">must be identical</span>. While market forces 
                    create the overall *shape* of the smile, put-call parity ensures that for any given strike, the smile is a single, 
                    unified curve. It prevents two separate smiles—one for puts and one for calls. Apparent discrepancies are typically 
                    due to frictions like dividends or borrowing costs, not true arbitrage.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced Pricing Models</h3>
                    <p className="text-gray-700 mb-4">
                      Modern quantitative approaches that capture volatility smile dynamics:
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-semibold text-blue-900 mb-2">Heston Model</h4>
                        <p className="text-sm text-gray-600">
                          Square-root process for volatility with mean reversion and correlation to underlying price movements.
                        </p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-semibold text-green-900 mb-2">SABR Model</h4>
                        <p className="text-sm text-gray-600">
                          Stochastic Alpha Beta Rho model specifically designed for interest rate and FX smile modeling.
                        </p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-semibold text-purple-900 mb-2">Local Volatility</h4>
                        <p className="text-sm text-gray-600">
                          Dupire model that makes volatility a deterministic function of spot price and time.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Quantitative Implementation</h3>
                    <p className="text-blue-800 mb-4">
                      Professional volatility smile modeling requires sophisticated numerical methods:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-blue-700">
                      <li><strong>Monte Carlo simulation</strong> with variance reduction techniques</li>
                      <li><strong>Finite difference methods</strong> for PDE solutions</li>
                      <li><strong>Fourier transform methods</strong> for characteristic function approaches</li>
                      <li><strong>Calibration algorithms</strong> using market data and optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Trading Implications Section */}
          {selectedSection === 'implications' && (
            <section className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="h-6 w-6 text-orange-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Economic Implications and Practical Applications</h2>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The volatility smile is far more than a theoretical curiosity; it is a critical tool with profound economic implications. 
                    It serves as a high-frequency barometer of market sentiment, fundamentally alters risk management, and creates a landscape 
                    for sophisticated volatility-based trading strategies.
                  </p>

                  <h3 className="text-2xl font-bold mt-8 mb-4">4.1 The Smile as a Barometer of Market Sentiment</h3>
                  <p className="text-gray-700 mb-4">
                    The shape of the smile provides a rich, real-time snapshot of the market's collective fears:
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                      <h4 className="font-semibold text-amber-900 mb-2">Steep Negative Skew</h4>
                      <p className="text-amber-800 text-sm">
                        Indicates high "fear," strong demand for downside protection, and high perceived crash risk.
                      </p>
                    </div>
                    <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4">
                      <h4 className="font-semibold text-cyan-900 mb-2">Pronounced Symmetrical Smile</h4>
                      <p className="text-cyan-800 text-sm">
                        Suggests the market anticipates a large price move but is uncertain about the direction (e.g., ahead of an earnings announcement).
                      </p>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Flattening Skew/Smile</h4>
                      <p className="text-green-800 text-sm">
                        Can signal market complacency or a reduction in the perceived risk of extreme events.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mt-8 mb-4">4.2 Advanced Risk Management: Hedging Beyond Delta</h3>
                  <p className="text-gray-700 mb-4">
                    The smile introduces "smile risk." A trader who is perfectly delta-hedged is still making an unhedged bet on the 
                    stability of the smile's shape. To manage this, practitioners rely on higher-order risk sensitivities ("Greeks"):
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-cyan-600 mb-2">Vega</h4>
                      <p className="text-blue-800 text-sm">
                        Sensitivity to the overall level of implied volatility.
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-cyan-600 mb-2">Vanna</h4>
                      <p className="text-blue-800 text-sm">
                        Sensitivity of an option's delta to a change in implied volatility. It measures the risk of the skew shifting.
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-cyan-600 mb-2">Volga</h4>
                      <p className="text-blue-800 text-sm">
                        Sensitivity of vega to a change in implied volatility. It measures the risk of the smile's curvature changing.
                      </p>
                    </div>
                  </div>

                  <HighlightBox>
                    <strong>The Key Takeaway:</strong> The volatility smile is not a market inefficiency. It is the market's rational, 
                    and quantifiable, way of pricing in the statistical realities of "fat tails" and the psychological reality of 
                    "crash-o-phobia." It is a feature, not a bug, of modern finance.
                  </HighlightBox>

                  <div className="bg-gray-900 text-white rounded-lg p-8 mt-8">
                    <h3 className="text-xl font-semibold mb-4">Professional Implementation Framework</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-cyan-400 mb-2">Data Infrastructure</h4>
                        <ul className="text-sm space-y-1 text-gray-300">
                          <li>Real-time options chain feeds</li>
                          <li>Historical volatility surfaces</li>
                          <li>Market microstructure data</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-cyan-400 mb-2">Execution Systems</h4>
                        <ul className="text-sm space-y-1 text-gray-300">
                          <li>Low-latency order management</li>
                          <li>Dynamic hedging algorithms</li>
                          <li>Risk monitoring dashboards</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-cyan-400 mb-2">Analytics Platform</h4>
                        <ul className="text-sm space-y-1 text-gray-300">
                          <li>Volatility surface modeling</li>
                          <li>Greeks calculation engines</li>
                          <li>P&L attribution systems</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-400">
              © 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
