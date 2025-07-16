'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart, Building, Zap, DollarSign, CheckCircle, AlertTriangle, BookOpen, ShieldCheck, TrendingUp, Shuffle, GitCommitHorizontal, Scale, Navigation } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function SystematicFrameworkOptionsStrategies() {
  const currentArticle = articles.find(article => article.slug === 'systematic-framework-evaluating-stocks-options-strategies');
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });
      
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with Return Button */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Article Header */}
        <header className="text-center border-b-2 border-blue-200 pb-8 mb-12">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              A Systematic Framework for Evaluating Stocks
            </h1>
            {/* Deep Research Badge */}
            <div className="absolute -top-2 -left-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg transform -rotate-3">
              Deep Research
            </div>
            {/* Options Badge */}
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg transform rotate-3">
              Options
            </div>
          </div>
          <p className="mt-4 text-lg md:text-xl text-blue-700">
            For Income-Generating Options Strategies
          </p>
        </header>

        <div className="flex gap-8">
          {/* Navigation Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Navigation className="h-5 w-5 mr-2" />
                  Contents
                </h3>
                <nav className="space-y-2">
                  {[
                    { id: 'introduction', label: 'Introduction' },
                    { id: 'analytical-pillars', label: 'The Analytical Pillars' },
                    { id: 'fundamental-quality', label: 'Fundamental Quality' },
                    { id: 'technical-posture', label: 'Technical Posture' },
                    { id: 'volatility-environment', label: 'Volatility Environment' },
                    { id: 'market-structure', label: 'Market Structure' },
                    { id: 'strategy-frameworks', label: 'Strategy Frameworks' },
                    { id: 'cash-secured-puts', label: 'Cash-Secured Puts' },
                    { id: 'covered-calls', label: 'Covered Calls' },
                    { id: 'wheel-strategy', label: 'Wheel Strategy' },
                    { id: 'iron-condors', label: 'Iron Condors' },
                    { id: 'advanced-considerations', label: 'Advanced Considerations' },
                    { id: 'decision-matrix', label: 'Decision Matrix' },
                    { id: 'risk-management', label: 'Risk Management' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 space-y-12">
            <section id="introduction">
              <Introduction />
            </section>

            <section id="analytical-pillars">
              <AnalyticalPillars />
            </section>

            <section id="strategy-frameworks">
              <StrategyFrameworks />
            </section>

            <section id="advanced-considerations">
              <AdvancedConsiderations />
            </section>
          </main>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-blue-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Apply This Framework?</h3>
          <p className="text-gray-600 mb-6">
            Use our comprehensive options analysis tools to evaluate stocks using these systematic principles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/option" className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
              Options Strategy Explorer
            </Link>
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
              >
                <BookOpen className="inline mr-2" />
                Read Full Research
              </a>
            )}
          </div>
        </div>

        {/* Educational Disclaimer */}
        <div className="mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-yellow-800 mb-2">Educational Content Disclaimer</h4>
              <p className="text-yellow-700 text-sm">
                This framework is for educational purposes only and does not constitute financial advice. 
                Options trading involves significant risk and may not be suitable for all investors. 
                Past performance does not guarantee future results. Always consult with a qualified 
                financial advisor before making investment decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t-2 border-gray-200">
          <p className="text-gray-500">
            © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
          </p>
        </footer>
      </div>
    </>
  );
}

// Sub-components

const Introduction = () => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
    <h2 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center">
      <BookOpen className="h-6 w-6 mr-3 text-blue-600" />
      Introduction
    </h2>
    <p className="text-gray-600 leading-relaxed">
      The suitability of a stock is not an intrinsic quality but is strictly relative to the chosen options strategy. The key to successful options income trading lies in aligning a stock's specific characteristics with the strategy's unique risk/reward profile. This framework provides a structured, multi-faceted approach to stock selection, moving beyond basic definitions to a professional-grade methodology.
    </p>
  </div>
);

const AnalyticalPillars = () => (
  <div>
    <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-blue-500 pl-4">
      Part I: The Analytical Pillars – A Universal Toolkit
    </h2>
    <div className="space-y-8">
      <section id="fundamental-quality">
        <Pillar
          icon={<Building className="h-8 w-8 text-blue-600" />}
          title="Pillar 1: Fundamental Quality & Suitability"
          subtitle="Assessing the underlying business itself."
        >
          <p className="mb-4 text-gray-600 leading-relaxed">
            For any strategy where owning the stock is a potential outcome (Cash-Secured Puts, Covered Calls, Wheel), fundamental analysis is the primary layer of risk management. The premium collected is a minor cushion against a significant decline in a weak company. If assigned shares of a fundamentally weak business, the capital loss can easily erase profits from numerous successful trades.
          </p>
          
          <h4 className="font-semibold text-lg text-gray-900 mt-6 mb-3">Quantitative Analysis (The "What"):</h4>
          <ul className="list-disc list-inside space-y-3 pl-4 text-gray-600">
            <li><strong>Profitability & Efficiency (ROE):</strong> Return on Equity measures how efficiently management uses shareholder equity. A consistently high ROE suggests a well-run, profitable company more likely to sustain its value.</li>
            <li><strong>Financial Health (Debt-to-Equity):</strong> High debt increases vulnerability to economic downturns. A conservative benchmark is a ratio &lt; 1.0, indicating a healthy balance sheet.</li>
            <li><strong>Valuation (P/E Ratio):</strong> Avoid acquiring overvalued companies. A P/E &lt; 25 can help filter for value and avoid speculative, high-growth names that are misaligned with conservative income strategies.</li>
            <li><strong>Dividend Analysis:</strong> A stable, growing dividend provides an additional income stream and signals a mature, financially stable company with consistent cash flow. Look for a yield &gt; 1%.</li>
          </ul>
          
          <h4 className="font-semibold text-lg text-gray-900 mt-6 mb-3">Qualitative Analysis (The "Why"):</h4>
          <ul className="list-disc list-inside space-y-3 pl-4 text-gray-600">
            <li><strong>Business Model & Competitive Moat:</strong> Understand how the company makes money and what protects it from competition (e.g., brand, patents). A strong moat is critical for long-term ownership confidence.</li>
            <li><strong>Management Team:</strong> The experience, track record, and integrity of the leadership are crucial for navigating challenges and executing plans effectively.</li>
            <li><strong>Sector & Industry Strength:</strong> A great company in a declining industry faces significant headwinds. Assess the health of the broader industry.</li>
          </ul>
        </Pillar>
      </section>

      <section id="technical-posture">
        <Pillar
          icon={<BarChart className="h-8 w-8 text-green-600" />}
          title="Pillar 2: Technical Posture"
          subtitle="Understanding price action and market sentiment for entry and strike selection."
        >
          <p className="mb-4 text-gray-600 leading-relaxed">
            While fundamentals determine *what* to trade, technicals help decide *when* to trade and *where* to select strikes. Premium sellers use technicals not to predict breakouts, but to bet against them, selling premium at levels where price momentum is likely to stall.
          </p>
          
          <h4 className="font-semibold text-lg text-gray-900 mt-6 mb-3">Key Concepts:</h4>
          <ul className="list-disc list-inside space-y-3 pl-4 text-gray-600">
            <li><strong>Primary Trend:</strong> Match the strategy to the trend. Use uptrends for bullish strategies (CSPs, Wheel) and range-bound markets for neutral ones (Covered Calls, Iron Condors).</li>
            <li><strong>Support & Resistance:</strong> These levels are critical for strike selection. For example, if a stock repeatedly finds buyers at $90 (support), selling the $90 strike put is a technically informed decision. Conversely, selling a covered call at a historical resistance level increases the probability it expires worthless.</li>
            <li><strong>Confirmation Indicators:</strong> Use the 50-day and 200-day moving averages to confirm long-term trends. A stock above its 200-day SMA is in a healthy uptrend. Use the Relative Strength Index (RSI) to identify overbought (&gt;70) or oversold (&lt;30) conditions to add conviction to trade entries.</li>
          </ul>
        </Pillar>
      </section>

      <section id="volatility-environment">
        <Pillar
          icon={<Zap className="h-8 w-8 text-yellow-500" />}
          title="Pillar 3: The Volatility Environment"
          subtitle="Evaluating the price of options, which is driven by volatility."
        >
          <p className="mb-4 text-gray-600 leading-relaxed">
            Selling options is fundamentally an act of selling volatility. The goal is to profit when the implied volatility (IV) you sell is greater than the stock's subsequent realized volatility. You are betting that the market's current fear level is overpriced.
          </p>
          
          <h4 className="font-semibold text-lg text-gray-900 mt-6 mb-3">Key Metrics for Context:</h4>
          <ul className="list-disc list-inside space-y-3 pl-4 text-gray-600">
            <li><strong>Implied Volatility (IV):</strong> The market's forward-looking expectation of future price fluctuation. High IV means expensive options, which is good for sellers.</li>
            <li><strong>IV Rank (IVR) & IV Percentile (IVP):</strong> These metrics contextualize IV. A high IVR/IVP (rule of thumb: &gt;50) indicates volatility is high relative to its own history, making it an attractive time to sell options due to the principle of mean reversion. IVP is often more robust as it's less skewed by single-day outlier events than IVR.</li>
            <li><strong>Volatility Crush:</strong> This is a key profit driver. It's the profit generated from a fall in IV after a position is opened. This is often seen after events like earnings reports, where IV predictably collapses.</li>
          </ul>
        </Pillar>
      </section>

      <section id="market-structure">
        <Pillar
          icon={<DollarSign className="h-8 w-8 text-red-600" />}
          title="Pillar 4: Options Market Structure & Liquidity"
          subtitle="Ensuring the practical tradeability of the options contracts."
        >
          <p className="mb-4 text-gray-600 leading-relaxed">
            An otherwise perfect setup can be ruined by an illiquid market. Illiquidity leads to wide bid-ask spreads (slippage) and difficulty in managing positions. This is a non-negotiable prerequisite check.
          </p>
          
          <h4 className="font-semibold text-lg text-gray-900 mt-6 mb-3">Key Liquidity Metrics:</h4>
          <ul className="list-disc list-inside space-y-3 pl-4 text-gray-600">
            <li><strong>Volume & Open Interest (OI):</strong> Look for high daily volume and, more importantly, high Open Interest. OI represents the total number of active contracts, indicating a deep, established market. Aim for OI in the hundreds, ideally thousands, for any strike you trade.</li>
            <li><strong>Bid-Ask Spread:</strong> This is the direct transaction cost. A narrow spread is critical. A common guideline is to seek spreads that are 10% or less of the option's ask price to avoid significant slippage.</li>
            <li><strong>Volume vs. OI Dynamics:</strong> A sharp increase in volume with a corresponding increase in OI confirms new capital is entering, signaling strong conviction. High volume with decreasing OI suggests position closing and a potential trend reversal.</li>
          </ul>
        </Pillar>
      </section>
    </div>
  </div>
);

const Pillar = ({ icon, title, subtitle, children }: { 
  icon: React.ReactNode, 
  title: string, 
  subtitle: string, 
  children: React.ReactNode 
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="w-full p-6 text-left flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-5">{icon}</div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-500">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0 text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

const StrategyFrameworks = () => (
  <div>
    <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-blue-500 pl-4">
      Part II: Strategy-Specific Application Frameworks
    </h2>
    <div className="space-y-8">
      <section id="cash-secured-puts">
        <StrategyCard 
          title="Cash-Secured Puts (CSP)"
          icon={<TrendingUp className="text-teal-500" />}
          description="A bullish strategy to generate income or acquire a desired stock at a discount. It is functionally a limit order that pays you to wait."
          pillars={[
            { name: 'Fundamental Quality', value: 'Crucial. You must want to own the stock long-term at the strike price. This is a stock acquisition strategy first, an options trade second.' },
            { name: 'Technical Posture', value: 'Bullish to Neutral. Sell puts at or just below a strong, historically validated support level.' },
            { name: 'Volatility', value: 'High IVR/IVP (>50). Maximizes premium and lowers your effective cost basis if assigned.' },
            { name: 'Liquidity', value: 'Essential. Ensures a fair entry price and the ability to manage the position (e.g., roll) if necessary.' },
          ]}
          primaryRisk="Assignment of a falling stock. The premium collected is trivial compensation for owning a depreciating asset if the company is fundamentally weak."
        />
      </section>

      <section id="covered-calls">
        <StrategyCard 
          title="Covered Calls"
          icon={<ShieldCheck className="text-blue-600" />}
          description="A neutral to slightly bullish strategy to generate income on shares you already own. It forces a disciplined profit-taking decision."
          pillars={[
            { name: 'Fundamental Quality', value: 'Important. Only use on quality holdings you are comfortable with. The premium provides only a small buffer against a large capital loss.' },
            { name: 'Technical Posture', value: 'Neutral, Range-Bound, or Slowly Appreciating. Sell calls at or above a strong resistance level where the stock is likely to stall.' },
            { name: 'Volatility', value: 'High IVR/IVP (>50). Maximizes the yield on your stock position and provides a larger downside cushion.' },
            { name: 'Liquidity', value: 'Essential. Crucial for fair entry and for buying back the call to avoid assignment if you wish to participate in an unexpected rally.' },
          ]}
          primaryRisk="Opportunity Cost. Forfeiting all gains if the stock rallies significantly past your strike price. Inappropriate for stocks you believe have major near-term upside."
        />
      </section>

      <section id="wheel-strategy">
        <StrategyCard 
          title="The Wheel Strategy"
          icon={<Shuffle className="text-purple-600" />}
          description="A cyclical strategy combining CSPs and Covered Calls. It is a modest income enhancement to a long-term, value-oriented stock portfolio."
          pillars={[
            { name: 'Fundamental Quality', value: 'Paramount. The entire system relies on owning a high-quality company you are willing to hold through a full market cycle.' },
            { name: 'Technical Posture', value: 'Long-Term Uptrend. This allows selling puts on short-term pullbacks to support, creating favorable entries.' },
            { name: 'Volatility', value: 'Moderate and Mean-Reverting. Requires enough IV for worthwhile premium without being overly speculative. High IVR is still key for entry timing.' },
            { name: 'Liquidity', value: 'Crucial. The strategy requires repeated, efficient entries and exits on both the put and call side.' },
          ]}
          primaryRisk="Becoming a 'Bag Holder'. Being assigned a stock that enters a prolonged downtrend, making it impossible to sell calls above your cost basis and trapping capital."
        />
      </section>

      <section id="iron-condors">
        <StrategyCard 
          title="Iron Condors"
          icon={<GitCommitHorizontal className="text-orange-600" />}
          description="A neutral, defined-risk strategy to profit from low volatility and time decay. It is a bet on the inaccuracy of the market's fear."
          pillars={[
            { name: 'Fundamental Quality', value: 'Irrelevant. No desire to own the stock. Broad-market ETFs (SPY, QQQ) are ideal as they are less prone to single-stock news risk.' },
            { name: 'Technical Posture', value: "Strictly Range-Bound. Strikes are placed outside well-defined support and resistance levels to create a 'profit box'." },
            { name: 'Volatility', value: 'High IVR/IVP (>50). The trade is a direct bet on volatility contraction ("vega crush"), which is a primary profit driver.' },
            { name: 'Liquidity', value: 'Absolutely Critical. All four legs must have high volume, high OI, and tight spreads to ensure fair pricing and manageability.' },
          ]}
          primaryRisk="A strong directional move that breaches the range. Pin risk at expiration can also lead to unexpected assignment and unhedged positions."
        />
      </section>
    </div>
  </div>
);

const StrategyCard = ({ 
  title, 
  icon, 
  description, 
  pillars, 
  primaryRisk 
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  pillars: { name: string; value: string }[];
  primaryRisk: string;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
    <div className="flex items-center mb-4">
      <div className="mr-4 p-3 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
    <div className="my-6 space-y-3">
      {pillars.map(pillar => (
        <div key={pillar.name} className="flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
          <div>
            <span className="font-semibold text-gray-800">{pillar.name}: </span>
            <span className="text-gray-600">{pillar.value}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
      <AlertTriangle className="h-6 w-6 text-red-500 mr-4 mt-1 flex-shrink-0" />
      <div>
        <h4 className="font-bold text-red-700">Primary Risk</h4>
        <p className="text-red-600">{primaryRisk}</p>
      </div>
    </div>
  </div>
);

const AdvancedConsiderations = () => (
  <div>
    <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-blue-500 pl-4">
      Part III: Advanced Considerations & Synthesis
    </h2>
    <div className="space-y-8">
      <section id="decision-matrix">
        <DecisionMatrix />
      </section>
      <section id="risk-management">
        <RiskManagement />
      </section>
    </div>
  </div>
);

const DecisionMatrix = () => {
  const headers = ["Analytical Pillar", "Cash-Secured Put", "Covered Call", "The Wheel", "Iron Condor"];
  const rows = [
    { pillar: 'Fundamental Quality', csp: 'Crucial', cc: 'Important', wheel: 'Paramount', ic: 'Irrelevant' },
    { pillar: 'Technical Trend', csp: 'Bullish/Neutral', cc: 'Neutral/Slow Uptrend', wheel: 'Bullish (Long-Term)', ic: 'Range-Bound' },
    { pillar: 'Volatility (IVR/IVP)', csp: 'High (>50)', cc: 'High (>50)', wheel: 'Moderate to High', ic: 'High (>50)' },
    { pillar: 'Options Liquidity', csp: 'Essential', cc: 'Essential', wheel: 'Crucial', ic: 'Critical' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
        <Scale className="mr-3 text-blue-600"/>
        Decision-Making Matrix
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              {headers.map(h => (
                <th key={h} className="p-3 text-sm font-semibold text-gray-600 tracking-wider uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map(row => (
              <tr key={row.pillar} className="hover:bg-gray-50">
                <td className="p-3 font-semibold text-gray-700">{row.pillar}</td>
                <td className="p-3 text-gray-600">{row.csp}</td>
                <td className="p-3 text-gray-600">{row.cc}</td>
                <td className="p-3 text-gray-600">{row.wheel}</td>
                <td className="p-3 text-gray-600">{row.ic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RiskManagement = () => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Risk Management Beyond Selection</h3>
    <div className="space-y-4 text-gray-600">
      <p>
        <strong>Position Sizing:</strong> A cornerstone of risk management. For defined-risk trades like Iron Condors, risk no more than 1-2% of your capital. For stock-centric strategies (Wheel, CSP), no single position should exceed 5-10% of your total portfolio value to avoid over-concentration.
      </p>
      <p>
        <strong>Gamma Risk:</strong> As an option seller, you are "short gamma." This means losses can accelerate exponentially as a stock moves against you, especially for at-the-money options near expiration. This is why many traders close positions before the final week to avoid this amplified risk.
      </p>
      <p>
        <strong>Early Assignment Risk:</strong> American-style options can be exercised at any time. This is most likely for in-the-money options with little time value left, often around an ex-dividend date. For spreads like an Iron Condor, this can destroy the defined-risk nature of the trade, leaving you with an unexpected, unhedged stock position.
      </p>
    </div>
  </div>
); 