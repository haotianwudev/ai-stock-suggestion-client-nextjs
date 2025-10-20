'use client';

import Link from 'next/link';
import { ArrowLeft, BarChart, Briefcase, Building, ShieldCheck, Skull, TrendingDown, Scale, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Interactive Summary Component
function StockWipeoutInfographic() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        
        {/* Header Section */}
        <header className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">The Stock Wipeout Reality</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            An infographic on the surprisingly high probability of individual stock failure and the power of diversification.
          </p>
        </header>

        {/* Key Statistics Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">The Shocking Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StatCard
              icon={<Skull className="w-12 h-12 text-red-500" />}
              title="Most Common Outcome"
              value="100% Loss"
              description="The most frequent lifetime return for a single stock is a complete wipeout of invested capital."
              source="Bessembinder, 2018"
            />
            <StatCard
              icon={<TrendingDown className="w-12 h-12 text-orange-500" />}
              title="Majority Underperform"
              value="55.2% of US Stocks"
              description="Fail to generate returns that outperform one-month U.S. Treasury bills over their lifetime."
              source="Bessembinder, 2020"
            />
            <StatCard
              icon={<BarChart className="w-12 h-12 text-yellow-500" />}
              title="Wealth is Concentrated"
              value="Top 2.4% of Firms"
              description="Accounted for ALL of the net global stock market wealth creation from 1991-2020."
              source="Bessembinder, 2020"
            />
          </div>
        </section>

        {/* The Skewed Reality of Returns Section */}
        <section className="mb-16 md:mb-24 p-8 bg-white rounded-2xl border border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">The Skewed Reality of Returns</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Individual stock returns don't follow a bell curve. A few "superstar" stocks generate massive gains, while most stocks cluster around zero or negative returns.</p>
            <div className="w-full h-64 flex items-end justify-center space-x-1">
                {/* Visual representation of a skewed distribution */}
                <div className="bg-red-400 rounded-t-lg" style={{height: '40%', width: '10% '}}></div>
                <div className="bg-red-500 rounded-t-lg" style={{height: '60%', width: '10% '}}></div>
                <div className="bg-orange-400 rounded-t-lg" style={{height: '30%', width: '10% '}}></div>
                <div className="bg-yellow-400 rounded-t-lg" style={{height: '15%', width: '10% '}}></div>
                <div className="bg-yellow-500 rounded-t-lg" style={{height: '10%', width: '10% '}}></div>
                <div className="bg-gray-300 rounded-t-lg" style={{height: '5%', width: '10% '}}></div>
                <div className="bg-gray-400 rounded-t-lg" style={{height: '3%', width: '10% '}}></div>
                <div className="bg-green-500 rounded-t-lg animate-pulse" style={{height: '100%', width: '5%'}}></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600 px-4">
                <span>Many Losers</span>
                <span className="text-green-600 font-bold">Few Big Winners</span>
            </div>
        </section>

        {/* Anatomy of a Wipeout Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Anatomy of a Wipeout: The Path to Zero</h2>
          <div className="relative">
             {/* Dotted line connector for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 border-t-2 border-dashed border-gray-300 -translate-y-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <WipeoutStep
                icon={<TrendingDown className="w-10 h-10 text-gray-600" />}
                step="1"
                title="Financial Distress"
                description="Company becomes unprofitable, debt mounts. Stock price falls below $1.00."
              />
              <WipeoutStep
                icon={<Building className="w-10 h-10 text-gray-600" />}
                step="2"
                title="Involuntary Delisting"
                description="Fails to meet NYSE/Nasdaq rules. Kicked off the major exchange."
              />
              <WipeoutStep
                icon={<Briefcase className="w-10 h-10 text-gray-600" />}
                step="3"
                title="OTC Markets"
                description="Relegated to unregulated 'Pink Sheets'. Liquidity evaporates, value plummets."
              />
              <WipeoutStep
                icon={<Scale className="w-10 h-10 text-gray-600" />}
                step="4"
                title="Bankruptcy"
                description="Assets are liquidated. Creditors get paid first. Common shareholders get nothing."
              />
            </div>
          </div>
        </section>

        {/* Risk Factors Section */}
        <section className="mb-16 md:mb-24">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Profile of Peril: Key Risk Factors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <RiskFactorCard 
                    icon={<AlertTriangle className="text-red-500" />}
                    title="Small-Cap & New IPOs"
                    description="Small, young companies are fragile. Nearly 50% of small-cap IPOs are delisted within 5 years."
                />
                <RiskFactorCard 
                    icon={<AlertTriangle className="text-red-500" />}
                    title="Lack of Profitability"
                    description="Consistently losing money erodes investor confidence and is a direct path to failure."
                />
                <RiskFactorCard 
                    icon={<AlertTriangle className="text-red-500" />}
                    title="High Debt (Leverage)"
                    description="High leverage amplifies losses and dramatically increases bankruptcy risk during downturns."
                />
            </div>
        </section>

        {/* IPO Survival Table Section */}
        <section className="mb-16 md:mb-24">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">IPO Survival Rates: Size Matters</h2>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold">Initial Market Capitalization</th>
                            <th className="p-4 font-semibold">Remaining Listed After 5 Years</th>
                            <th className="p-4 font-semibold">Primary Exit for Non-Survivors</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="p-4 font-medium">Small-Cap (&lt;$75 million)</td>
                            <td className="p-4 text-red-600 font-bold">55%</td>
                            <td className="p-4">Involuntary or Voluntary Delisting</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <td className="p-4 font-medium">Mid-Cap</td>
                            <td className="p-4 text-orange-600 font-bold">61%</td>
                            <td className="p-4">Takeover Transaction</td>
                        </tr>
                        <tr>
                            <td className="p-4 font-medium">Large-Cap</td>
                            <td className="p-4 text-green-600 font-bold">67%</td>
                            <td className="p-4">Takeover Transaction</td>
                        </tr>
                    </tbody>
                </table>
            </div>
             <p className="text-center text-gray-500 text-sm mt-4 italic">Source: Harvard Law School Forum on Corporate Governance</p>
        </section>

        {/* The Solution Section */}
        <section className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 md:p-12 rounded-2xl border border-gray-200">
            <div className="text-center">
                <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-green-500" />
                <h2 className="text-3xl font-bold mb-4 text-gray-900">The Only Free Lunch: Diversification</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                    You can't eliminate risk, but you can avoid the catastrophic risk of a single stock wipeout.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2"><AlertTriangle className="w-6 h-6 text-red-500"/>Individual Stock</h3>
                    <p className="text-gray-700">A high-stakes bet on one company's survival. Fully exposed to idiosyncratic risk (fraud, failure, disruption).</p>
                    <p className="font-bold text-2xl mt-4 text-red-600">High probability of 100% loss.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2"><CheckCircle className="w-6 h-6 text-green-500"/>Diversified Index Fund (ETF)</h3>
                    <p className="text-gray-700">Owns the whole market. Guarantees you hold the few big winners that drive all the growth.</p>
                    <p className="font-bold text-2xl mt-4 text-green-600">Virtually zero probability of 100% loss.</p>
                </div>
            </div>
        </section>
        
        {/* Footer */}
        <footer className="text-center mt-16 text-gray-500 text-sm">
            <p>Data and concepts adapted from academic research by Hendrik Bessembinder and others.</p>
            <p>This is not financial advice. For informational purposes only.</p>
        </footer>

      </main>
    </div>
  );
}

// Sub-components for cleaner structure
const StatCard = ({ icon, title, value, description, source }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  source: string;
}) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center mb-4 bg-gray-100 w-20 h-20 rounded-full mx-auto">
        {icon}
    </div>
    <h3 className="text-2xl font-bold text-center text-green-600">{value}</h3>
    <p className="text-lg font-semibold text-center mt-2 text-gray-900">{title}</p>
    <p className="text-gray-600 text-center mt-2 text-sm">{description}</p>
    <p className="text-xs text-gray-500 text-center mt-4 italic">Source: {source}</p>
  </div>
);

const WipeoutStep = ({ icon, step, title, description }: {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center z-10 shadow-sm">
    <div className="relative inline-block mb-4">
        <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold absolute -top-3 -right-3">
            {step}
        </div>
        <div className="bg-gray-100 p-4 rounded-full">
            {icon}
        </div>
    </div>
    <h4 className="font-bold text-lg mb-2 text-gray-900">{title}</h4>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const RiskFactorCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
            <div>{icon}</div>
            <h4 className="text-xl font-bold text-gray-900">{title}</h4>
        </div>
        <p className="mt-4 text-gray-600">{description}</p>
    </div>
);

// Navigation Component
function NavigationSidebar() {
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'statistics', title: 'Shocking Numbers' },
    { id: 'returns', title: 'Skewed Returns' },
    { id: 'wipeout', title: 'Anatomy of Wipeout' },
    { id: 'risk-factors', title: 'Risk Factors' },
    { id: 'survival', title: 'IPO Survival' },
    { id: 'solution', title: 'Diversification' },
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
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-56">
        <h3 className="font-bold text-sm text-gray-900 mb-3">Navigation</h3>
        <ul className="space-y-2">
          {sections.map(({ id, title }) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className={`text-left text-sm w-full px-2 py-1 rounded transition-colors duration-200 ${
                  activeSection === id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Main Article Component
export default function StockWipeoutProbabilityAnalysis() {
  const [activeSection, setActiveSection] = useState('infographic');
  const currentArticle = articles.find(article => article.slug === 'stock-wipeout-probability-analysis');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
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
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}
      
      <div className="min-h-screen bg-gray-50">
      {/* Return to Home Button */}
      <div className="flex items-center gap-4 mb-4 p-4">
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Deep Research Badge */}
      <div className="fixed top-4 left-4 z-50">
        <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
          Deep Research
        </div>
      </div>

      {/* Navigation Sidebar */}
      <NavigationSidebar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Return Button */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="xl:hidden mb-8">
          <details className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <summary className="px-4 py-3 font-medium text-gray-900 cursor-pointer hover:bg-gray-50 rounded-lg">
              📋 Quick Navigation
            </summary>
            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })} className="text-left px-2 py-1 rounded hover:bg-gray-50">Overview</button>
                <button onClick={() => document.getElementById('statistics')?.scrollIntoView({ behavior: 'smooth' })} className="text-left px-2 py-1 rounded hover:bg-gray-50">Statistics</button>
                <button onClick={() => document.getElementById('wipeout')?.scrollIntoView({ behavior: 'smooth' })} className="text-left px-2 py-1 rounded hover:bg-gray-50">Anatomy</button>
                <button onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })} className="text-left px-2 py-1 rounded hover:bg-gray-50">Solution</button>
              </div>
            </div>
          </details>
        </div>

        {/* Article Header */}
        <div id="overview" className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Stock Wipeout Probability Analysis
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            A comprehensive analytical report examining the surprisingly high probability of individual stock failure and complete investor wipeouts. This research explores the skewed nature of stock returns, the mechanical processes of corporate failure, and why diversification is the only effective strategy for mitigating catastrophic loss risk.
          </p>
          
          {/* Source Link */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <ExternalLink className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Research Source</span>
            </div>
            <a 
              href="https://docs.google.com/document/d/e/2PACX-1vQYvgIJWPoZJERZkFykdWk9dWlE9CVN9FL6Gt-Con4fz9pzIDuleWi69clb19-KKItg1dWbAXl3GQAj/pub" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              The Probability of Ruin: An Analytical Report on Individual Stock Failure
            </a>
          </div>
        </div>

        {/* Interactive Summary */}
        <div id="statistics">
          <StockWipeoutInfographic />
        </div>

        {/* Disclaimer */}
        <div className="mt-16 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">Important Disclaimer</h3>
              <p className="text-yellow-800 text-sm leading-relaxed">
                This analysis is for educational purposes only and does not constitute investment advice. 
                The probability of stock failure varies significantly based on company fundamentals, market conditions, 
                and time horizon. Past performance does not guarantee future results. Always consult with a qualified 
                financial advisor before making investment decisions. The data presented is based on historical analysis 
                and academic research, primarily from the work of Hendrik Bessembinder and other financial researchers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
} 
