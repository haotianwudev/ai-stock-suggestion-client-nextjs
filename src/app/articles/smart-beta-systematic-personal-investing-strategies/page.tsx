'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronUp, Menu, X, CheckCircle, XCircle } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function SmartBetaGuide() {
  const currentArticle = articles.find(article => article.slug === 'smart-beta-systematic-personal-investing-strategies');
  const [activeSection, setActiveSection] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Navigation sections
  const sections = [
    { id: 'deconstructing', title: 'Deconstructing Smart Beta', shortTitle: 'Introduction' },
    { id: 'pros-cons', title: 'Pros and Cons', shortTitle: 'Pros & Cons' },
    { id: 'factors', title: 'Factor Universe', shortTitle: 'Factors' },
    { id: 'architecture', title: 'Architecture', shortTitle: 'Architecture' },
    { id: 'systematic', title: 'Systematic Trading', shortTitle: 'Systematic' },
    { id: 'personal', title: 'Personal Trading', shortTitle: 'Personal' },
    { id: 'performance-risks', title: 'Performance & Risks', shortTitle: 'Performance' },
    { id: 'regimes', title: 'Economic Regimes', shortTitle: 'Regimes' },
    { id: 'conclusion', title: 'Conclusion', shortTitle: 'Conclusion' }
  ];

  // Scroll tracking for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsNavOpen(false);
  };

  // Scroll to top functionality
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Table component for displaying data tables
  const TableComponent = ({ title, headers, rows, isProsConsTable = false }: {
    title: string;
    headers: string[];
    rows: string[][];
    isProsConsTable?: boolean;
  }) => (
    <div className="my-8 overflow-x-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-200">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className={`px-6 py-4 text-sm align-top ${cellIndex === 0 ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                    {isProsConsTable && cellIndex > 0 ? (
                      <div className="space-y-2">
                        {cell.split('.').filter(item => item.trim()).map((item, i) => (
                          <div key={i} className="flex items-start">
                            <span className="mr-2 mt-1">
                              {rowIndex === 0 ? 
                                <CheckCircle className="text-green-500 h-4 w-4 flex-shrink-0" /> : 
                                <XCircle className="text-red-500 h-4 w-4 flex-shrink-0" />
                              }
                            </span>
                            <span>{item.trim()}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      cell
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

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Header with Navigation */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
              
              {/* Mobile menu button */}
              <button 
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                {isNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 flex gap-8">
          {/* Sidebar Navigation */}
          <aside className={`${isNavOpen ? 'block' : 'hidden'} md:block w-64 flex-shrink-0`}>
            <div className="sticky top-24 bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeSection === section.id 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {section.shortTitle}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            {/* Hero Section */}
            <div className="relative bg-white rounded-lg shadow-md p-8 mb-8">
              {/* Deep Research Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  Deep Research
                </span>
              </div>
              
              <div className="pt-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Smart Beta: A Comprehensive Guide to Systematic and Personal Investing Strategies
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Smart beta represents a significant evolution in investment strategy, occupying a complex middle ground between traditional passive indexing and active management. This comprehensive analysis provides an exhaustive examination of smart beta strategies, their theoretical underpinnings, practical applications, and strategic recommendations for both institutional and individual investors.
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                  <span>January 15, 2025</span>
                  <span>•</span>
                  <span>Deep Research Analysis</span>
                  <span>•</span>
                  <span>25 min read</span>
                </div>
              </div>
            </div>

            {/* Section 1: Deconstructing Smart Beta */}
            <section id="deconstructing" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-indigo-500 pb-2">
                  Section 1: Deconstructing Smart Beta - A Paradigm Shift in Investing
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">1.1 The Genesis of Smart Beta: Beyond Market Capitalization</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Smart beta defines a category of investment strategies that employ rules-based index construction methods, deliberately diverging from the conventional market-capitalization (market-cap) weighting approach. The term, first coined by consulting firm Willis Towers Watson in 2006, emerged from a growing recognition of the inherent limitations within traditional passive indexing.
                    </p>
                    <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <p className="text-blue-800 text-sm">
                        <strong>Key Insight:</strong> The central premise of smart beta is to "break the link with price." Instead of allowing a security's market price to dictate its weight in a portfolio, smart beta strategies utilize alternative metrics such as company fundamentals, risk characteristics, or equal weighting.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">1.2 The Investment Spectrum: Positioning Smart Beta</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Smart beta is consistently characterized as a hybrid strategy, blending attributes of both passive indexing and active management. From passive investing, it inherits a disciplined, rules-based, and transparent framework. From active investing, it adopts the fundamental goal of outperforming a market-cap-weighted benchmark.
                    </p>
                    <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <p className="text-yellow-800 text-sm">
                        <strong>Marketing Caveat:</strong> The term "smart beta" can be misleading, as it shifts the burden of the active decision from a fund manager to the end investor, who must now select which factor bet to make.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">1.3 Core Principles: Rules-Based, Transparent, and Factor-Driven</h3>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Systematic & Rules-Based</h4>
                        <p className="text-sm text-gray-600">Governed by predefined, quantitative models without subjective human judgment.</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Transparency</h4>
                        <p className="text-sm text-gray-600">Rules for index construction and rebalancing are publicly disclosed.</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Factor-Driven</h4>
                        <p className="text-sm text-gray-600">Systematically targets quantifiable characteristics associated with enhanced returns.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comparative Analysis Table */}
                <TableComponent
                  title="Table 1: Comparative Analysis - Traditional Passive vs. Smart Beta vs. Active Management"
                  headers={["Attribute", "Traditional Passive (Market-Cap)", "Smart Beta (Factor-Based)", "Traditional Active"]}
                  rows={[
                    ["Core Principle", "Replicate the market by weighting securities by size.", "Systematically capture specific risk/return drivers (factors).", "Outperform a benchmark through manager skill."],
                    ["Index Construction", "Tracks a public, market-cap-weighted index.", "Tracks a custom, rules-based index.", "Uses a benchmark for performance comparison only."],
                    ["Cost", "Lowest fees.", "Higher than passive, lower than active.", "Highest fees."],
                    ["Transparency", "High; holdings are public.", "High; rules are disclosed.", "Low; strategies are often proprietary."],
                    ["Turnover", "Low.", "Moderate.", "High."],
                    ["Tax Efficiency", "Generally high due to low turnover.", "Can be less tax-efficient than passive due to higher rebalancing turnover.", "Generally low tax efficiency due to frequent buying and selling."],
                    ["Source of Return", "Market risk (beta).", "Market risk (beta) + factor premia.", "Market risk (beta) + manager alpha."],
                    ["Manager Discretion", "None; portfolio is determined by the index.", "None in day-to-day management; discretion is in the initial design of the rules.", "High; manager actively makes buy/sell decisions."]
                  ]}
                />
              </div>
            </section>

            {/* Section 2: Pros and Cons */}
            <section id="pros-cons" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-indigo-500 pb-2">
                  Section 2: Pros and Cons of Smart Beta
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-green-700 mb-4">2.1 The Advantages of Smart Beta</h3>
                    <div className="space-y-3">
                      {[
                        "Potential for Enhanced Returns: Systematic targeting of factors with historical outperformance",
                        "Improved Diversification: Reduces concentration risk inherent in market-cap indices",
                        "Lower Costs than Active Management: Sophisticated strategies at fraction of active fund costs",
                        "Transparency and Discipline: Rules-based approach removes emotional decision-making",
                        "Risk Management: Explicit design for risk control (e.g., low-volatility strategies)"
                      ].map((advantage, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                          <p className="text-gray-600 text-sm">{advantage}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold text-red-700 mb-4">2.2 The Disadvantages and Risks</h3>
                    <div className="space-y-3">
                      {[
                        "Factor Cyclicality: Factors can underperform for extended periods with no guarantee of future returns",
                        "Factor Crowding: Popular strategies may become 'crowded,' eroding returns and increasing crash risk",
                        "Complexity and Hidden Costs: Higher total cost including trading costs and tax inefficiencies",
                        "Backtest vs. Reality: Live performance often disappoints compared to historical backtests",
                        "Behavioral Risks: Complexity can lead to performance chasing and poor timing decisions"
                      ].map((disadvantage, index) => (
                        <div key={index} className="flex items-start">
                          <XCircle className="text-red-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                          <p className="text-gray-600 text-sm">{disadvantage}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <TableComponent
                  title="Table 2: At-a-Glance Comparison - Smart Beta vs. Alternatives"
                  headers={["Feature", "Smart Beta", "Traditional Passive (Market-Cap)", "Traditional Active"]}
                  rows={[
                    ["PROS", "Targets specific return drivers (factors). Better diversification than market-cap. Lower cost than active. Transparent & rules-based.", "Lowest cost. Simple to understand. High tax efficiency. Captures the entire market return.", "Potential for significant outperformance (alpha). Can adapt to changing market conditions. Can provide downside protection."],
                    ["CONS", "Can underperform for long periods. Higher cost than passive. Risk of factor crowding. More complex and can be less tax-efficient.", "Concentration in largest stocks. No potential for outperformance. Subject to market bubbles.", "Highest cost. Often underperforms after fees. Opaque strategies (manager risk). Low tax efficiency."]
                  ]}
                  isProsConsTable={true}
                />
              </div>
            </section>

            {/* Section 3: Factor Universe */}
            <section id="factors" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-indigo-500 pb-2">
                  Section 3: The Factor Universe - The Engines of Smart Beta Returns
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">3.1 Foundational Equity Factors: An In-Depth Analysis</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      While academic research has identified a veritable "factor zoo" of hundreds of market anomalies, the vast majority of smart beta products are built upon a small handful of well-documented, economically intuitive, and persistent factors.
                    </p>
                    <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded">
                      <p className="text-indigo-800 text-sm">
                        <strong>Critical Debate:</strong> Factors may represent compensation for systematic risk (e.g., value stocks are riskier) or arise from persistent behavioral biases (e.g., investor overreaction). This distinction is critical for understanding factor persistence.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">3.2 A Taxonomy of Factors: Offensive, Defensive, and Trending</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Offensive Factors</h4>
                        <p className="text-sm text-green-700 mb-2">Value, Size</p>
                        <p className="text-xs text-green-600">Tend to perform well in growth periods</p>
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Defensive Factors</h4>
                        <p className="text-sm text-blue-700 mb-2">Quality, Low Volatility, Dividend Yield</p>
                        <p className="text-xs text-blue-600">Aim to mitigate downside risk</p>
                      </div>
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">Trending Factors</h4>
                        <p className="text-sm text-purple-700 mb-2">Momentum</p>
                        <p className="text-xs text-purple-600">Seek to benefit from persistent market trends</p>
                      </div>
                    </div>
                  </div>
                </div>

                <TableComponent
                  title="Table 3: Summary of Key Equity Factors"
                  headers={["Factor", "Definition", "Academic Rationale", "Common Metrics", "Typical Cyclical Behavior"]}
                  rows={[
                    ["Value", "Stocks trading at a discount to their intrinsic value.", "Risk: Financially distressed firms are riskier. Behavioral: Investors overreact to bad news.", "P/E, P/B, Dividend Yield", "Offensive/Pro-Cyclical"],
                    ["Momentum", "Stocks with strong recent price performance.", "Behavioral: Investors underreact to good news, herd behavior.", "12-month minus 1-month price return", "Trending"],
                    ["Quality", "Companies with strong financial health.", "Risk: Higher quality firms are less risky. Behavioral: Investors neglect 'boring' but stable firms.", "High ROE, Low Debt-to-Equity", "Defensive"],
                    ["Low Volatility", "Stocks with lower price fluctuations.", "Behavioral: Investors are attracted to high-beta 'lottery ticket' stocks, neglecting safer ones.", "Standard Deviation, Beta", "Defensive"],
                    ["Size", "Smaller-capitalization companies.", "Risk: Small firms are more vulnerable to economic shocks. Behavioral: Less analyst coverage leads to mispricing.", "Market Capitalization", "Offensive/Pro-Cyclical"],
                    ["Dividend Yield", "Companies paying high/growing dividends.", "Risk: Signals financial discipline. Behavioral: Investors seek income.", "Dividend Yield, Dividend Growth History", "Defensive"]
                  ]}
                />
              </div>
            </section>

            {/* Section 4: Architecture */}
            <section id="architecture" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-indigo-500 pb-2">
                  Section 4: The Architecture of Smart Beta - From Theory to Tradable Products
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">4.1 Index Construction and Weighting Methodologies</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      The core mechanism that differentiates smart beta indices is the use of alternative weighting schemes:
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <h4 className="font-semibold text-gray-800 mb-2">Equal Weighting</h4>
                        <p className="text-sm text-gray-600">Reduces concentration risk by giving equal weight to all constituents</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <h4 className="font-semibold text-gray-800 mb-2">Fundamental Weighting</h4>
                        <p className="text-sm text-gray-600">Weights based on economic footprint like sales or cash flow (pioneered by RAFI)</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <h4 className="font-semibold text-gray-800 mb-2">Factor/Risk Weighting</h4>
                        <p className="text-sm text-gray-600">Maximizes exposure to a desired factor or risk outcome</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">4.2 The Role of Rebalancing: A Source of Return and Risk</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Rebalancing is a double-edged sword. It enforces a systematic 'buy low, sell high' discipline that can be a source of excess returns. However, it also generates transaction costs and creates risks like front-running, where sophisticated traders anticipate rebalancing trades.
                    </p>
                    <div className="mt-4 p-4 bg-orange-50 border-l-4 border-orange-400 rounded">
                      <p className="text-orange-800 text-sm">
                        <strong>Implementation Risk:</strong> Front-running by sophisticated traders can erode the theoretical factor premium, highlighting the gap between theory and practice.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">4.3 The Rise of the Smart Beta ETF: Democratizing Factor Investing</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The explosive growth in smart beta (AUM ~$1.56 trillion) has been fueled by the ETF vehicle. ETFs make these sophisticated strategies accessible to the public in a low-cost, transparent, and liquid format.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Systematic Trading */}
            <section id="systematic" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-indigo-500 pb-2">
                  Section 5: Systematic Trading - Institutional Applications
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">5.1 Portfolio Construction for Quantitative Funds</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Institutions use smart beta in sophisticated 'alpha-beta separation' frameworks, replacing core passive allocations with more efficient factor strategies to free up risk budgets for true alpha-seeking managers.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">5.2 Multi-Factor Strategies</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Combining lowly correlated factors like value, momentum, and quality can smooth performance. However, this is complex, as naively combining factors can lead to 'factor clash' where factors work against each other.
                    </p>
                    <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
                      <p className="text-red-800 text-sm">
                        <strong>Factor Clash Warning:</strong> A 'cheap' value stock with poor quality metrics exemplifies how factors can conflict, requiring sophisticated optimization techniques.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">5.3 The Factor Timing Debate</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Dynamically shifting between factors represents a high-stakes endeavor, essentially returning to active management. However, growing research suggests that timing models using signals like factor valuation and momentum can be effective.
                    </p>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
                      <h4 className="font-semibold text-gray-800 mb-2">Smart Beta Evolution</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Smart Beta 1.0:</strong> Static single-factor strategies</p>
                        <p><strong>Smart Beta 2.0:</strong> Multi-factor approaches</p>
                        <p><strong>Smart Beta 3.0:</strong> Dynamic factor timing models</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">5.4 Case Studies in Institutional Adoption</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Nordic and Dutch pension funds were early adopters. Case studies show tangible results, such as pension funds reducing portfolio volatility by 20% with minimum volatility strategies, though implementation costs remain a challenge.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Personal Trading */}
            <section id="personal" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-indigo-500 pb-2">
                  Section 6: Personal Trading - Building a Smart Beta Portfolio
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">6.1 A Practical Toolkit: Selecting and Evaluating Smart Beta ETFs</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Individual investors must first define their goals and risk tolerance. Evaluation requires due diligence on several key factors:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "Index methodology and factor purity",
                        "Total cost of ownership (including hidden trading costs)",
                        "Liquidity (AUM and bid-ask spreads)",
                        "Track record and manager reputation"
                      ].map((factor, index) => (
                        <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="text-blue-500 h-5 w-5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-blue-800">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">6.2 Portfolio Construction Strategies for Individuals</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Common approaches include the Core-Satellite method or a diversified multi-factor approach:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Core-Satellite Approach</h4>
                        <p className="text-sm text-green-700">Market-cap core with factor 'tilts' for targeted exposure</p>
                      </div>
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">Multi-Factor Approach</h4>
                        <p className="text-sm text-purple-700">Blend several lowly correlated factor ETFs for diversification</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">6.3 Implementation and Monitoring Guide</h3>
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <p className="text-yellow-800 text-sm mb-2">
                        <strong>Greatest Risk:</strong> Behavioral error—chasing performance and selling after underperformance.
                      </p>
                      <p className="text-yellow-700 text-sm">
                        Research shows a significant 'investor returns gap' caused by poor timing. Discipline and a long-term perspective (5-10+ years) are critical for success.
                      </p>
                    </div>
                  </div>
                </div>

                <TableComponent
                  title="Table 4: Guide to Building a Personal Smart Beta Portfolio"
                  headers={["Investor Profile / Goal", "Suggested Core Strategy", "Satellite 'Tilts'", "Example ETF Tickers*", "Key Considerations"]}
                  rows={[
                    ["Risk-Averse / Capital Preservation", "Low Volatility ETF", "Quality, Dividend Yield", "SPHQ, VIG", "Focus on downside protection. May lag in bull markets."],
                    ["Growth-Focused", "Momentum ETF", "Size (Small-Cap), Quality", "IWF, SPMO", "Higher potential returns with higher risk. Requires a long time horizon."],
                    ["Income-Focused", "Dividend Growth ETF", "High Dividend Yield, Value", "VIG, VTV", "Focus on consistent income. Be aware of interest rate sensitivity."],
                    ["Balanced / Diversified", "Multi-Factor ETF", "Value, Momentum, Quality", "VTV, SPMO, SPHQ, ISCF", "Seeks smoother returns by diversifying factor exposures."]
                  ]}
                />
              </div>
            </section>

            {/* Section 7: Performance & Risks */}
            <section id="performance-risks" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-indigo-500 pb-2">
                  Section 7: Performance, Risks, and Critical Perspectives
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">7.1 A Sober Look at Historical Performance</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The evidence on performance is contradictory. While long-term backtests are often positive, a comprehensive analysis of live funds found they have, on average, underperformed by 1% per year since launch.
                    </p>
                    <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
                      <p className="text-red-800 text-sm">
                        <strong>Reality Check:</strong> The gap between backtest and live performance highlights the risk that launching products can contribute to factor premium decay through 'factor crowding' and increased implementation costs.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">7.2 The Hidden Costs and Complexities</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      The stated expense ratio is not the total cost. Investors must also account for:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "Trading costs from rebalancing",
                        "Price impact from front-running",
                        "Tax inefficiencies from higher turnover",
                        "Bid-ask spreads and liquidity costs"
                      ].map((cost, index) => (
                        <div key={index} className="flex items-start p-3 bg-orange-50 rounded-lg">
                          <XCircle className="text-orange-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-orange-800">{cost}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">7.3 Key Criticisms and Investor Caveats</h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Smart Marketing, Not Smart Investing",
                          description: "Critics argue smart beta rebrands old factors for higher fees"
                        },
                        {
                          title: "Data Mining Risk",
                          description: "Strategies may be the product of backtest-fitting rather than genuine insights"
                        },
                        {
                          title: "Factor Crowding",
                          description: "Popular factors may become crowded, reducing future returns and creating crash risk"
                        },
                        {
                          title: "Risk Premium, Not Free Lunch",
                          description: "Outperformance may simply reward greater systematic risk rather than superior strategy"
                        }
                      ].map((criticism, index) => (
                        <div key={index} className="p-4 bg-gray-50 border-l-4 border-gray-400 rounded">
                          <h4 className="font-semibold text-gray-800 mb-1">{criticism.title}</h4>
                          <p className="text-sm text-gray-600">{criticism.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8: Economic Regimes */}
            <section id="regimes" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-indigo-500 pb-2">
                  Section 8: Navigating Economic Regimes with Smart Beta
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">8.1 Factor Performance During Recessions and Recoveries</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Historical analysis reveals distinct patterns. During recessions, defensive factors like Quality and Low Volatility tend to outperform. During recoveries, cyclical factors like Value and Size tend to lead the market higher.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">8.2 The Impact of Inflationary Environments</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Factor performance also shows patterns relative to inflation. In high inflation, pro-cyclical factors like Value and Momentum have historically performed well. In low inflation, broad equities with trend-following strategies show strong risk-adjusted returns.
                    </p>
                  </div>
                </div>

                <TableComponent
                  title="Table 5: Historical Factor Performance Across Economic Regimes"
                  headers={["Factor", "Recession", "Recovery", "High Inflation", "Low Inflation"]}
                  rows={[
                    ["Value", "Mixed (depends on cause)", "Outperforms", "Outperforms", "Neutral/Underperforms"],
                    ["Momentum", "Underperforms", "Neutral/Underperforms", "Outperforms", "Neutral"],
                    ["Quality", "Outperforms", "Outperforms", "Underperforms", "Outperforms"],
                    ["Low Volatility", "Outperforms", "Underperforms", "Underperforms", "Outperforms"],
                    ["Size (Small-Cap)", "Underperforms", "Outperforms", "Outperforms", "Neutral/Underperforms"]
                  ]}
                />
              </div>
            </section>

            {/* Section 9: Conclusion */}
            <section id="conclusion" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-indigo-500 pb-2">
                  Section 9: Conclusion and Strategic Recommendations
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">9.1 Synthesizing the Evidence: Key Insights for Investors</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Smart beta is a powerful but complex tool. It offers a systematic way to target drivers of return beyond simple market exposure but comes with significant risks of factor cyclicality, crowding, and implementation costs. Importantly, it shifts the primary active decision—which investment style to bet on—to the end investor.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">9.2 Recommendations for Systematic Traders</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "Focus on sophisticated multi-factor construction",
                        "Invest in factor timing models",
                        "Analyze total implementation costs",
                        "Expand factor principles beyond equities"
                      ].map((rec, index) => (
                        <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="text-blue-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-blue-800">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">9.3 Recommendations for Personal Investors</h3>
                    <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-gray-800 mb-3">Key Success Factors:</h4>
                      <div className="space-y-2">
                        {[
                          "Have clarity of purpose and defined goals",
                          "Start with diversification (multi-factor approach is prudent)",
                          "Use a core-satellite framework for implementation",
                          "Be disciplined and patient (5-10+ year time horizon)",
                          "Avoid behavioral errors—stick with your chosen strategy"
                        ].map((factor, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Call to Action */}
                <div className="mt-8 p-6 bg-indigo-50 border-l-4 border-indigo-400 rounded">
                  <h4 className="font-semibold text-indigo-800 mb-2">The Bottom Line</h4>
                  <p className="text-indigo-700 text-sm">
                    Smart beta represents an evolution in investment strategy that can enhance portfolio outcomes when properly understood and implemented. Success requires careful factor selection, disciplined implementation, and most importantly, the patience to maintain your strategy through inevitable periods of underperformance. The greatest risk is not factor risk, but behavioral risk—the temptation to abandon a sound long-term strategy during temporary setbacks.
                  </p>
                </div>
              </div>
            </section>

            {/* Educational Disclaimer */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Educational Disclaimer:</strong> This deep research analysis is for educational purposes only and does not constitute investment advice. Smart beta strategies involve significant risks including factor cyclicality, implementation costs, and potential long periods of underperformance. Always conduct your own research and consult with qualified financial professionals before making investment decisions. Past performance does not guarantee future results.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 z-50"
          >
            <ChevronUp className="h-6 w-6" />
          </button>
        )}

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-6 mt-16">
          <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
        </footer>
      </div>
    </>
  );
} 