'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, DollarSign, TrendingDown, Scale, CheckCircle, AlertTriangle, BookOpen } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Financial data for the interactive components
const financialData = {
  currentRatio: { apple: 0.87, microsoft: 1.27, samsung: 2.43, benchmark: 1.0 },
  debtToEquity: { apple: 1.87, microsoft: 0.22, alphabet: 0.05, industry: 0.48 },
  fcf: { apple: { fcf: 108.8, netIncome: 93.7, conversion: 116.1 } }
};

// Navigation sections
const navigationSections = [
  { id: 'executive-summary', title: 'Executive Summary', icon: CheckCircle },
  { id: 'liquidity-analysis', title: 'Liquidity Analysis', icon: TrendingDown },
  { id: 'solvency-analysis', title: 'Solvency Analysis', icon: Scale },
  { id: 'metrics-guide', title: 'Metrics Guide', icon: BookOpen },
  { id: 'cash-flow-engine', title: 'Cash Flow Engine', icon: DollarSign },
  { id: 'monitoring', title: 'Risk Monitoring', icon: AlertTriangle }
];

// Reusable Bar Chart Component
const Bar = ({ label, value, color, maxValue, isApple = false }) => {
  const widthPercentage = Math.min((value / maxValue) * 100, 100);
  return (
    <div className="flex items-center space-x-4 my-2">
      <p className={`w-28 text-sm font-medium ${isApple ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
        {label}
      </p>
      <div className="flex-1 bg-gray-200 rounded-full h-6">
        <div
          className={`${color} h-6 rounded-full flex items-center justify-end pr-2 transition-all duration-1000 ease-out`}
          style={{ width: `${widthPercentage}%` }}
        >
          <span className="text-xs font-bold text-white">{value.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// Interactive Navigation Sidebar
const NavigationSidebar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
      <div className="bg-white rounded-lg shadow-lg border p-4 w-64">
        <h3 className="font-semibold text-gray-900 mb-4">Navigate Article</h3>
        <nav className="space-y-2">
          {navigationSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 mr-3" />
                <span className="text-sm">{section.title}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default function AppleFinancialHealthAnalysis() {
  const [activeSection, setActiveSection] = useState('executive-summary');
  const currentArticle = articles.find(article => article.slug === 'apple-financial-health-analysis-traditional-metrics-mislead');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationSections.map(section => document.getElementById(section.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationSections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Navigation Sidebar */}
        <NavigationSidebar activeSection={activeSection} setActiveSection={scrollToSection} />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>

            {/* Article Header with Badge */}
            <div className="relative">
              {/* Deep Research Badge - Top Left */}
              <div className="absolute top-0 left-0 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  Deep Research
                </span>
              </div>

              <header className="pt-10 pb-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                  Apple's Financial Health Analysis
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  When Traditional Metrics Mislead: An Interactive Analysis
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>July 5, 2025</span>
                  <span>•</span>
                  <span>Deep Research</span>
                  <span>•</span>
                  <span>Interactive Analysis</span>
                </div>
              </header>
            </div>
          </div>

          {/* Executive Summary */}
          <section id="executive-summary" className="mb-12">
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-blue-900 mb-3 flex items-center">
                <CheckCircle className="w-7 h-7 mr-3 text-blue-600" />
                Executive Verdict: Financially Strong
              </h2>
              <p className="text-blue-800 leading-relaxed">
                Contrary to what some surface-level metrics might suggest, Apple Inc. is not in financial trouble. 
                Its unusual Current Ratio and high Debt-to-Equity are not signs of distress, but the deliberate 
                results of a sophisticated and highly effective capital management strategy, built upon an incredible 
                ability to generate cash.
              </p>
            </div>
          </section>

          {/* Liquidity Analysis */}
          <section id="liquidity-analysis" className="mb-12">
            <div className="bg-white border rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <TrendingDown className="w-8 h-8 text-orange-500 mr-4"/>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Liquidity: The "Low" Current Ratio</h3>
                  <p className="text-sm text-orange-600">Appears Risky, But Reveals Efficiency</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                    Apple's Current Ratio is consistently below the traditional "safe" benchmark of 1.0. 
                    This looks alarming but is a sign of elite operational efficiency. Apple collects cash 
                    from customers long before it pays its suppliers, allowing it to operate with less idle cash.
                  </p>
                  <div className="mt-4 text-xs text-gray-600 p-3 bg-gray-100 rounded-lg border">
                    <strong>Key Insight:</strong> A low ratio isn't weakness; it's a feature of a powerful 
                    business model with a negative cash conversion cycle.
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Current Ratio Comparison (FY24)</h4>
                  <Bar label="Apple" value={financialData.currentRatio.apple} color="bg-orange-500" maxValue={3} isApple={true} />
                  <Bar label="Microsoft" value={financialData.currentRatio.microsoft} color="bg-blue-500" maxValue={3} />
                  <Bar label="Samsung" value={financialData.currentRatio.samsung} color="bg-sky-500" maxValue={3} />
                  <div className="relative my-2">
                    <div className="border-t border-dashed border-red-500"></div>
                    <p className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-red-500">
                      1.0 Benchmark
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Solvency Analysis */}
          <section id="solvency-analysis" className="mb-12">
            <div className="bg-white border rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Scale className="w-8 h-8 text-purple-500 mr-4"/>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Solvency: The High Debt-to-Equity Ratio</h3>
                  <p className="text-sm text-purple-600">A Deliberate Strategy to Maximize Shareholder Value</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                    Apple's D/E ratio is extremely high for a tech company. This isn't due to financial distress. 
                    It's the direct mathematical result of an aggressive stock buyback program. By repurchasing 
                    shares (reducing equity) and using low-cost debt, Apple boosts key investor metrics like EPS and ROE.
                  </p>
                  <div className="mt-4 text-xs text-gray-600 p-3 bg-gray-100 rounded-lg border">
                    <strong>Key Insight:</strong> The high debt is a tool for financial engineering, not a sign 
                    of operational weakness.
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Debt-to-Equity Comparison (FY24)</h4>
                  <Bar label="Apple" value={financialData.debtToEquity.apple} color="bg-purple-500" maxValue={2} isApple={true} />
                  <Bar label="Microsoft" value={financialData.debtToEquity.microsoft} color="bg-blue-500" maxValue={2} />
                  <Bar label="Alphabet" value={financialData.debtToEquity.alphabet} color="bg-green-500" maxValue={2} />
                  <Bar label="Industry Avg" value={financialData.debtToEquity.industry} color="bg-gray-500" maxValue={2} />
                </div>
              </div>
            </div>
          </section>

          {/* Metrics Guide */}
          <section id="metrics-guide" className="mb-12">
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <BookOpen className="w-8 h-8 text-gray-600 mr-4"/>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">When Traditional Ratios Tell the Wrong Story</h3>
                  <p className="text-sm text-gray-500">Understanding the context behind the numbers.</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800">The Current Ratio: A Tale of Two Business Models</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong className="text-green-600">When it works:</strong> For traditional businesses 
                    (e.g., retail, manufacturing) with physical inventory and standard payment cycles. 
                    Here, it's a reliable snapshot of their ability to pay bills.
                    <br/><br/>
                    <strong className="text-red-600">When it misleads (The Apple Evidence):</strong> For 
                    companies with immense market power and negative cash conversion cycles. Apple collects 
                    cash from iPhone sales months before it pays its suppliers. Its high "Accounts Payable" 
                    isn't a weakness; it's proof of its power. The ultimate evidence is that Apple generates 
                    over $100B in cash annually, making the ratio's warning of a liquidity crisis irrelevant.
                  </p>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-800">The Debt-to-Equity Ratio: Funding vs. Engineering</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong className="text-green-600">When it works:</strong> For capital-intensive companies 
                    (e.g., utilities, industrials) that use debt to fund core operations. In this context, 
                    a high D/E ratio correctly signals higher financial risk.
                    <br/><br/>
                    <strong className="text-red-600">When it misleads (The Apple Evidence):</strong> For 
                    cash-rich "super-profitable" companies using debt for financial engineering. Apple's 
                    high D/E is caused by its massive stock buyback program, which intentionally shrinks 
                    its equity base. The evidence is that its Interest Coverage Ratio is incredibly healthy. 
                    The debt isn't funding a struggling business; it's a cheap tool to boost shareholder returns.
                  </p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg mt-4 text-center">
                  <p className="text-sm font-semibold text-gray-800">
                    The Golden Rule: For companies like Apple, cash flow metrics (like FCF Conversion) 
                    are far more telling than static balance sheet ratios.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cash Flow Engine */}
          <section id="cash-flow-engine" className="mb-12">
            <div className="relative bg-green-600 text-white rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <DollarSign className="w-8 h-8 mr-4"/>
                  <div>
                    <h3 className="text-2xl font-bold">The Engine: Free Cash Flow Fortress</h3>
                    <p className="text-sm text-green-100">The Ultimate Proof of Financial Health</p>
                  </div>
                </div>
                <p className="text-green-50 mb-6 max-w-3xl">
                  The strategies above are only possible because of Apple's phenomenal ability to turn 
                  profits into spendable cash. Its FCF Conversion rate is consistently over 100%—meaning 
                  for every dollar of accounting profit, Apple generates more than a dollar of actual cash. 
                  This is the engine that powers everything.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-around gap-6 text-center">
                  <div className="p-4 bg-green-700/50 rounded-xl w-full md:w-auto">
                    <p className="text-sm text-green-200">FY24 Net Income</p>
                    <p className="text-4xl font-bold">${financialData.fcf.apple.netIncome}B</p>
                  </div>
                  <div className="font-bold text-4xl transform md:rotate-0 rotate-90">&rarr;</div>
                  <div className="p-4 bg-green-700/50 rounded-xl w-full md:w-auto">
                    <p className="text-sm text-green-200">FY24 Free Cash Flow</p>
                    <p className="text-4xl font-bold">${financialData.fcf.apple.fcf}B</p>
                  </div>
                  <div className="font-bold text-4xl">=</div>
                  <div className="p-4 bg-white/20 rounded-xl border border-white/50 w-full md:w-auto">
                    <p className="text-sm text-green-100">FCF Conversion Rate</p>
                    <p className="text-5xl font-extrabold text-white">{financialData.fcf.apple.conversion}%</p>
                    <p className="text-xs text-green-100">(Industry-leading quality of earnings)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Monitoring */}
          <section id="monitoring" className="mb-12">
            <div className="bg-white border rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-8 h-8 text-red-500 mr-4"/>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Where to Watch for Cracks</h3>
                  <p className="text-sm text-gray-600">Key indicators for monitoring Apple's financial health</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">FCF Sustainability</h4>
                  <p className="text-sm text-orange-700">
                    Any sustained drop in cash generation is the primary red flag to watch.
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Services Growth</h4>
                  <p className="text-sm text-blue-700">
                    Regulatory threats to the high-margin Services segment could hurt profitability.
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Capital Allocation</h4>
                  <p className="text-sm text-purple-700">
                    A sudden halt to buybacks might signal a loss of confidence.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Research Source */}
          <section className="mb-12">
            <div className="bg-gray-100 border border-gray-300 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Research Source</h3>
              <p className="text-sm text-gray-700 mb-4">
                This analysis is based on the comprehensive financial report "An Investor's Guide to 
                Corporate Financial Health: A Case Study on Apple Inc." with FY2024 data.
              </p>
              <a 
                href="https://docs.google.com/document/d/e/2PACX-1vRccf-SQJkhKgCofVPZy2FcdMznkDOr-vfA21IHzGmm1JId5dXqlWXGJT1U6UB71pwmZ3tPwsfZZaQv/pub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Full Research Document &rarr;
              </a>
            </div>
          </section>

          {/* Educational Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-800">Educational Content</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  This analysis is for educational purposes only and should not be considered as investment advice. 
                  Financial metrics should always be evaluated in context, and past performance does not guarantee 
                  future results. Always consult with qualified financial professionals before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm">
              © 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
} 
