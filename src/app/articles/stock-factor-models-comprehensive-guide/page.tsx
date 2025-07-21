'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronsRight, Menu, X, BarChart2, Cpu, Database, Microscope, Sliders, Puzzle, TrendingUp, FlaskConical, Library, Building } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Helper to manage class names
const classNames = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

export default function StockFactorModelsGuide() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');

  const currentArticle = articles.find(article => article.slug === 'stock-factor-models-comprehensive-guide');

  const navigation = [
    { name: 'Introduction', href: '#introduction', icon: BookOpen, sectionId: 'introduction' },
    { name: 'Arbitrage Pricing Theory', href: '#apt', icon: BarChart2, sectionId: 'apt' },
    { name: 'Fama-French Models', href: '#fama-french', icon: Library, sectionId: 'fama-french' },
    { name: 'Practitioner\'s Factors', href: '#practitioner-factors', icon: Sliders, sectionId: 'practitioner-factors' },
    { name: 'Factor Construction', href: '#factor-construction', icon: Puzzle, sectionId: 'factor-construction' },
    { name: 'Modern Applications', href: '#applications', icon: Cpu, sectionId: 'applications' },
    { name: 'The "Factor Zoo"', href: '#factor-zoo', icon: Microscope, sectionId: 'factor-zoo' },
    { name: 'Data Sources', href: '#data-sources', icon: Database, sectionId: 'data-sources' },
    { name: 'Advanced Topics', href: '#advanced-considerations', icon: TrendingUp, sectionId: 'advanced-considerations' },
    { name: 'Conclusion', href: '#conclusion', icon: FlaskConical, sectionId: 'conclusion' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(item => document.getElementById(item.sectionId)).filter(Boolean);
      const scrollPosition = window.scrollY + 150;

      sections.forEach(section => {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigation]);

  const Sidebar = () => (
    <aside className={classNames(
      "fixed top-0 left-0 z-40 w-64 h-screen transition-transform",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full",
      "lg:translate-x-0"
    )}>
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center ps-2.5 mb-5">
          <BookOpen className="w-8 h-8 text-blue-500 mr-2" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Factor Models</span>
        </div>
        <ul className="space-y-2 font-medium">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={classNames(
                  'flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group',
                  activeSection === item.sectionId ? 'bg-gray-200 dark:bg-gray-700' : 'text-gray-900'
                )}
              >
                <item.icon className={classNames(
                    "w-5 h-5 transition duration-75",
                    activeSection === item.sectionId ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                )} />
                <span className="ms-3">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}

      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen font-sans">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-controls="sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 fixed top-2 left-2 z-50"
        >
          <span className="sr-only">Open sidebar</span>
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <Sidebar />

        <main className="p-4 lg:ml-64">
          <div className="max-w-4xl mx-auto">
            {/* Return to Home Button */}
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>

            {/* Article Header with Badge */}
            <div className="relative mb-8">
              {/* Deep Research Badge - Top Left */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Deep Research
                </span>
              </div>

              {/* Article Image */}
              <div className="w-full h-64 md:h-80 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center text-white">
                  <BarChart2 className="w-16 h-16 mx-auto mb-4" />
                  <h1 className="text-2xl md:text-3xl font-bold">Stock Factor Models</h1>
                  <p className="text-lg opacity-90">Comprehensive Research Guide</p>
                </div>
              </div>

              <header className="py-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">
                  An Expert's Guide to Stock Factor Models
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  Decomposing returns, managing risk, and finding alpha.
                </p>
                {currentArticle?.googleDoc && (
                  <div className="mt-4">
                    <a 
                      href={currentArticle.googleDoc} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Source Research
                    </a>
                  </div>
                )}
              </header>
            </div>

            <IntroductionSection />
            <AptSection />
            <FamaFrenchSection />
            <PractitionerFactorsSection />
            <FactorConstructionSection />
            <ApplicationsSection />
            <FactorZooSection />
            <DataSourcesSection />
            <AdvancedConsiderationsSection />
            <ConclusionSection />

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}

// Section Components
const SectionWrapper = ({ id, title, icon: Icon, children }: {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) => (
  <section id={id} className="mb-16 scroll-mt-20">
    <div className="flex items-center mb-6">
      <Icon className="w-8 h-8 text-blue-500 mr-4" />
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
    </div>
    <div className="prose prose-lg dark:prose-invert max-w-none prose-blue prose-a:text-blue-600 hover:prose-a:text-blue-500">
      {children}
    </div>
  </section>
);

const IntroductionSection = () => (
    <SectionWrapper id="introduction" title="The Conceptual Framework" icon={BookOpen}>
        <p>Factor models are quantitative tools that serve as a cornerstone of modern finance, providing a structured framework for decomposing the returns of a security or portfolio into their constituent drivers. These models operate on the foundational premise that asset returns can be broken down into two main components: a systematic component influenced by common, broad-based "factors," and an idiosyncratic component unique to the specific asset.</p>
        <p>The central goal of factor investing is to identify these persistent drivers of return—the factors—to enhance diversification, manage risk more precisely, and potentially generate returns above the broader market. This represents a paradigm shift from managing assets to managing exposures.</p>
        
        <h3 className="text-xl font-semibold mt-6">Types of Factors</h3>
        <p>Factors are broadly categorized into three types:</p>
        <ul className="list-disc pl-6 space-y-2">
            <li><strong>Macroeconomic Factors:</strong> Capture broad, systematic risks tied to economic variables like inflation, GDP growth, and interest rates.</li>
            <li><strong>Fundamental Factors:</strong> Derived from company-specific data like earnings, book-to-market value, and market capitalization.</li>
            <li><strong>Statistical Factors:</strong> Derived from the statistical properties of historical return data itself, often using techniques like Principal Component Analysis (PCA).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">The Evolution from Single-Factor to Multi-Factor Models</h3>
        <p>The journey began with the Capital Asset Pricing Model (CAPM), which posits that an asset's return is a function of its sensitivity (beta) to the overall market. However, empirical research revealed anomalies CAPM couldn't explain, such as the outperformance of small-cap and value stocks. This led to the development of multi-factor models, like the Fama-French Three-Factor Model, which added size and value factors, dramatically increasing explanatory power from ~70% to over 90%.</p>
    </SectionWrapper>
);

const AptSection = () => (
    <SectionWrapper id="apt" title="Arbitrage Pricing Theory (APT)" icon={BarChart2}>
        <p>Developed by Stephen Ross in 1976, APT is a multi-factor asset pricing model that serves as a more generalized alternative to CAPM. Its core proposition is that an asset's expected return can be forecasted by a linear relationship with various macroeconomic factors or theoretical market indices.</p>
        
        <h3 className="text-xl font-semibold mt-6">The "No Arbitrage" Principle</h3>
        <p>The theory is anchored in the principle of "no arbitrage," meaning any risk-free profit opportunities will be swiftly exploited and eliminated. If an asset is mispriced according to the model, an arbitrageur could construct a synthetic portfolio of other assets with the exact same factor exposures and lock in a risk-free profit by buying the undervalued asset and shorting the synthetic one. This activity forces prices back to their fair value.</p>
        
        <h3 className="text-xl font-semibold mt-6">Flexibility and Challenges</h3>
        <p>APT is more flexible than CAPM, relying on fewer assumptions. It doesn't require a "market portfolio" or assume all investors hold it. However, its greatest strength is also its main practical challenge: the theory itself does not specify which factors should be used. This ambiguity left a vacuum that empirical models, like Fama-French, were designed to fill. In this light, Fama-French models can be seen as a specific, highly successful *implementation* of APT's general framework.</p>

        <div className="overflow-x-auto my-6">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Characteristic</th>
                        <th scope="col" className="px-6 py-3">CAPM</th>
                        <th scope="col" className="px-6 py-3">APT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">Number of Factors</td>
                        <td className="px-6 py-4">Single factor: Market Risk (Beta)</td>
                        <td className="px-6 py-4">Multiple systematic factors</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">Factor Specification</td>
                        <td className="px-6 py-4">Factor is specified (market portfolio)</td>
                        <td className="px-6 py-4">Factors are not specified by the theory</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <td className="px-6 py-4 font-medium">Key Assumption</td>
                        <td className="px-6 py-4">Market equilibrium</td>
                        <td className="px-6 py-4">No arbitrage</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </SectionWrapper>
);

const FamaFrenchSection = () => (
    <SectionWrapper id="fama-french" title="Seminal Models: The Fama-French Dynasty" icon={Library}>
        <p>It was the empirical work of Eugene Fama and Kenneth French that translated multi-factor theory into a practical tool. Their models have become the bedrock of modern quantitative finance.</p>
        <h4 className="font-semibold mt-4">Fama-French Three-Factor Model (1992)</h4>
        <p>Addressed CAPM's failings by adding two factors to market risk:</p>
        <ul>
            <li><strong>Size (SMB):</strong> Small Minus Big, capturing the premium of small-cap stocks over large-cap stocks.</li>
            <li><strong>Value (HML):</strong> High Minus Low, capturing the premium of value stocks (high book-to-market) over growth stocks.</li>
        </ul>
        <h4 className="font-semibold mt-4">Carhart Four-Factor Model (1997)</h4>
        <p>Mark Carhart added a fourth factor to account for price trends:</p>
        <ul>
            <li><strong>Momentum (MOM/UMD):</strong> Up Minus Down, capturing the tendency of past winners to continue outperforming past losers.</li>
        </ul>
        <h4 className="font-semibold mt-4">Fama-French Five-Factor Model (2015)</h4>
        <p>An update motivated by valuation theory, adding two more factors:</p>
        <ul>
            <li><strong>Profitability (RMW):</strong> Robust Minus Weak, capturing the premium of firms with high operating profitability.</li>
            <li><strong>Investment (CMA):</strong> Conservative Minus Aggressive, reflecting that companies investing conservatively tend to have higher returns.</li>
        </ul>
        <p>A profound finding of the five-factor model is that the original value factor (HML) often becomes redundant. This suggests the value premium is largely captured by the interplay of profitability and investment, effectively "unbundling" the value signal into its more fundamental economic drivers.</p>
    </SectionWrapper>
);

const PractitionerFactorsSection = () => (
    <SectionWrapper id="practitioner-factors" title="A Practitioner's Guide to Common Equity Factors" icon={Sliders}>
        <p>Practitioners often focus on a set of well-established individual factors as the building blocks for "smart beta" or "style" investing strategies. These can be categorized as pro-cyclical (perform well in economic expansions) or defensive (offer stability in downturns).</p>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold">Value (Pro-Cyclical)</h4>
                <p><strong>Rationale:</strong> Stocks trading at a low price relative to their fundamental worth tend to outperform. This may be compensation for higher distress risk or due to investor overreaction to bad news.</p>
                <p><strong>Metrics:</strong> Low P/E, low P/B, high dividend yield.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold">Size (Pro-Cyclical)</h4>
                <p><strong>Rationale:</strong> Smaller companies historically generate higher returns, possibly as compensation for higher risk, lower liquidity, or greater growth potential.</p>
                <p><strong>Metrics:</strong> Market capitalization.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold">Momentum (Cyclical)</h4>
                <p><strong>Rationale:</strong> Price trends tend to persist, likely due to behavioral biases like investor underreaction and subsequent herding.</p>
                <p><strong>Metrics:</strong> Trailing 3- to 12-month returns, excluding the most recent month.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold">Quality (Defensive)</h4>
                <p><strong>Rationale:</strong> Companies with strong financial health (stable earnings, low debt) deliver superior risk-adjusted returns and offer resilience in downturns.</p>
                <p><strong>Metrics:</strong> High ROE, low debt-to-equity, stable earnings growth.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold">Low Volatility (Defensive)</h4>
                <p><strong>Rationale:</strong> Less volatile stocks have generated higher risk-adjusted returns, contrary to theory, possibly due to investor preference for "lottery-ticket" stocks.</p>
                <p><strong>Metrics:</strong> Standard deviation of returns or beta.</p>
            </div>
        </div>
    </SectionWrapper>
);

const FactorConstructionSection = () => (
    <SectionWrapper id="factor-construction" title="The Mechanics of Factor Construction" icon={Puzzle}>
        <p>Academic factors are tangible, investable portfolios created through a specific, rules-based long-short methodology. This isolates the factor premium by going long on stocks that rank high on a characteristic and shorting stocks that rank low, neutralizing market exposure.</p>
        <h4 className="font-semibold mt-4">Fama-French SMB & HML Construction</h4>
        <p>This uses a 2x3 portfolio sort. Stocks are split by size (Small/Big) and value (Growth/Neutral/Value based on Book-to-Market). The intersection creates six portfolios.</p>
        <ul>
            <li><strong>SMB:</strong> Average return of the three small-cap portfolios minus the average return of the three large-cap portfolios.</li>
            <li><strong>HML:</strong> Average return of the two value portfolios minus the average return of the two growth portfolios.</li>
        </ul>
        <h4 className="font-semibold mt-4">Momentum (UMD) Construction</h4>
        <p>Momentum uses a stock's return from month t-12 to t-2, skipping the most recent month to avoid short-term reversal effects. The UMD factor is the average return of the "winner" portfolios minus the "loser" portfolios.</p>
        <h4 className="font-semibold mt-4">Quality (QMJ) Construction</h4>
        <p>Quality is multifaceted. A composite score is created from metrics in four categories: Profitability (ROE, ROA), Growth (5-year profitability growth), Safety (low leverage, low beta), and Payout (net payout ratio).</p>
        <h4 className="font-semibold mt-4">Low Volatility Construction</h4>
        <p>This can be done in two ways: a simple heuristic approach of ranking stocks by past volatility, or a more complex optimization-based approach that uses a covariance matrix to build a portfolio with the lowest possible aggregate volatility, often with constraints to ensure diversification.</p>
    </SectionWrapper>
);

const ApplicationsSection = () => (
    <SectionWrapper id="applications" title="Applications in Modern Portfolio Management" icon={Cpu}>
        <p>Factor models are integral tools for investment professionals, forming a continuous feedback loop in the investment process.</p>
        <ol className="space-y-4">
            <li><strong>Portfolio Construction:</strong> Beyond building "smart beta" portfolios, factor models are crucial for optimization. They structure the covariance matrix, reducing its complexity and noise, which leads to more robust and stable portfolio allocations.</li>
            <li><strong>Risk Management:</strong> Factor models allow for risk decomposition, separating a portfolio's total risk into a systematic component (from factor exposures) and an idiosyncratic component (from specific asset selection). This helps managers identify unintended bets and understand the true sources of their risk.</li>
            <li><strong>Performance Attribution:</strong> Factor models distinguish between performance driven by systematic factor exposures (beta) and manager skill (alpha). This analysis can be done via time-series regression (like Fama-French) or cross-sectional regression (like MSCI Barra) to explain *why* a portfolio performed as it did.</li>
        </ol>
        <p className="mt-4">These three applications are intertwined. A manager constructs a portfolio with a factor tilt, uses a risk model to monitor intended and unintended exposures, and uses attribution to analyze results, which then informs the next construction cycle.</p>
    </SectionWrapper>
);

const FactorZooSection = () => (
    <SectionWrapper id="factor-zoo" title="The 'Factor Zoo': Proliferation and Persistence" icon={Microscope}>
        <p>The success of early models led to a "factor zoo"—an explosion of hundreds of new variables that appear to predict stock returns, many of which are likely the result of data snooping or p-hacking.</p>
        <h4 className="font-semibold mt-4">Raising the Bar for Significance</h4>
        <p>To combat this, researchers propose stricter statistical hurdles, such as requiring a t-statistic {'>'} 3.0 instead of the traditional 2.0. This higher bar helps filter out spurious correlations. A factor must also be distinguished from a true "premium," which is compensation for bearing undiversifiable risk or the result of a persistent behavioral bias.</p>
        <h4 className="font-semibold mt-4">Criteria for a Robust Factor</h4>
        <p>To be considered robust, a factor should be:</p>
        <ul>
            <li><strong>Plausible:</strong> Backed by a sound economic rationale.</li>
            <li><strong>Persistent:</strong> Evident over long time periods and different economic regimes.</li>
            <li><strong>Pervasive:</strong> Present across various markets and asset classes.</li>
            <li><strong>Robust:</strong> Not dependent on one precise definition.</li>
            <li><strong>Investable:</strong> The premium must survive after real-world transaction costs.</li>
        </ul>
    </SectionWrapper>
);

const DataSourcesSection = () => (
    <SectionWrapper id="data-sources" title="Sourcing Factor Data: A Guide for the Retail Quant" icon={Database}>
        <p>Accessing data for factor research has become easier for individuals. Here are key resources:</p>
        <div className="overflow-x-auto my-6">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Provider</th>
                        <th scope="col" className="px-6 py-3">Data Type</th>
                        <th scope="col" className="px-6 py-3">Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">Kenneth French Library</td>
                        <td className="px-6 py-4">Pre-computed Factors & Portfolios</td>
                        <td className="px-6 py-4">Free</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">AQR Data Library</td>
                        <td className="px-6 py-4">Pre-computed Factors & Portfolios</td>
                        <td className="px-6 py-4">Free</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">Alpha Vantage</td>
                        <td className="px-6 py-4">Raw Market & Fundamental Data</td>
                        <td className="px-6 py-4">Freemium</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">Tiingo</td>
                        <td className="px-6 py-4">Raw Market & Fundamental Data</td>
                        <td className="px-6 py-4">Freemium</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h4 className="font-semibold mt-4">Open-Source Software</h4>
        <p>Powerful, free libraries in Python and R are essential for analysis:</p>
        <ul>
            <li><strong>Python:</strong> Use `pandas` for data manipulation, `statsmodels` for regression, `Alphalens` for analyzing predictive power of factors, and `Zipline` for event-driven backtesting.</li>
            <li><strong>R:</strong> The `Tidyverse` is key for data wrangling and visualization, while `FactorAnalytics` is a specialized library for fitting and analyzing factor models.</li>
        </ul>
    </SectionWrapper>
);

const AdvancedConsiderationsSection = () => (
    <SectionWrapper id="advanced-considerations" title="Advanced Considerations and Future Directions" icon={TrendingUp}>
        <h4 className="font-semibold mt-4">Factor Decay and Rebalancing</h4>
        <p>A portfolio's factor exposures decay over time. The "factor half-life" measures this decay rate. Fast-decaying factors like Momentum (half-life of a few months) require frequent rebalancing, while stable factors like Value can be rebalanced less often (e.g., annually).</p>
        
        <h4 className="font-semibold mt-6">Institutional Data Providers</h4>
        <p>While this guide focuses on low-cost options, it's useful to know the institutional landscape. Firms like <strong>MSCI</strong> (Barra models), <strong>FactSet</strong> (Quant Factor Library), and <strong>Bloomberg</strong> (PORT terminal) provide industry-standard, comprehensive (but expensive) data and analytics platforms that set the benchmark for quality.</p>

        <h4 className="font-semibold mt-6">The Future: Machine Learning</h4>
        <p>Machine learning (ML) is increasingly used to "tame the factor zoo" by systematically selecting relevant predictors from thousands of potential factors. ML can identify complex, non-linear relationships that traditional linear models might miss, paving the way for more dynamic and adaptive factor strategies.</p>
    </SectionWrapper>
);

const ConclusionSection = () => (
    <SectionWrapper id="conclusion" title="Conclusion" icon={FlaskConical}>
        <p>Stock factor models represent a powerful evolution in financial analysis, shifting focus from asset classes to the underlying drivers of risk and return. The core of modern factor investing revolves around a small number of persistent premia: Value, Size, Momentum, Quality, and Low Volatility.</p>
        <p>While the "factor zoo" presents challenges, a disciplined, theory-grounded approach is essential. The democratization of data and open-source tools has made it more feasible than ever for researchers and investors to engage in sophisticated factor analysis, build custom strategies, and make more informed, data-driven decisions.</p>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3">🎯 Key Takeaways</h4>
            <ul className="text-blue-800 dark:text-blue-200 space-y-2">
                <li>• Factor models decompose returns into systematic and idiosyncratic components</li>
                <li>• Five robust factors form the core of quantitative investing: Value, Size, Momentum, Quality, Low Volatility</li>
                <li>• APT provides the theoretical foundation; Fama-French models provide practical implementation</li>
                <li>• Data democratization enables sophisticated factor research for individual investors</li>
                <li>• Machine learning is expanding factor discovery while creating new challenges</li>
            </ul>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Disclaimer:</strong> This content is for educational purposes only and does not constitute investment advice. Factor investing involves risk, and past performance is not indicative of future results.
            </p>
        </div>
    </SectionWrapper>
); 