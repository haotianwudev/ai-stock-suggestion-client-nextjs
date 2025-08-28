'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, TrendingUp, Shield, BarChart2, BookOpen, Scaling, AlertTriangle, GitBranch, FileText } from 'lucide-react';
import React, { useState } from 'react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function BeyondLeverageRiskParityCallWriting() {
  const currentArticle = articles.find(article => article.slug === 'beyond-leverage-risk-parity-call-writing');

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

      <div className="bg-white text-gray-900 font-sans">
        <Header />
        <main>
          <HeroSection />
          <IntroductionSection />
          <CoreConceptsSection />
          <AcademicFoundationsSection />
          <ComparisonSection />
          <ImplementationSection />
          <AdvancedConsiderationsSection />
          <ConclusionSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

// Header Component
const Header = () => (
  <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 shadow-sm">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
          <div className="flex items-center">
            <Scaling className="h-8 w-8 text-blue-600" />
            <span className="ml-3 text-xl font-bold tracking-tight text-gray-900">Risk Parity Analysis</span>
          </div>
        </div>
        <nav className="hidden md:flex md:space-x-8">
          <a href="#concepts" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Concepts</a>
          <a href="#research" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Research</a>
          <a href="#comparison" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Comparison</a>
          <a href="#implementation" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Implementation</a>
        </nav>
      </div>
    </div>
  </header>
);

// Hero Section Component
const HeroSection = () => (
  <section className="relative py-20 md:py-32 bg-gradient-to-b from-blue-50 to-indigo-100">
    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    
    {/* Deep Research Badge - Top Left */}
    <div className="absolute top-8 left-8 z-10">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-600 text-white shadow-lg">
        <BookOpen className="w-3 h-3 mr-1" />
        Deep Research
      </span>
    </div>

    {/* Options Badge - Bottom Right */}
    <div className="absolute bottom-8 right-8 z-10">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-orange-400 to-yellow-500 text-black shadow-lg">
        Options
      </span>
    </div>

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Beyond Leverage: Risk Parity Through Call Writing
      </h1>
      <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-700 mb-8">
        Discover a sophisticated, non-leverage-based methodology for achieving true risk diversification by re-engineering asset risk profiles through options overlays.
      </p>
      <a href="#introduction" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-300 transform hover:scale-105 shadow-lg">
        Explore the Strategy <ArrowRight className="ml-2 h-5 w-5" />
      </a>
    </div>
  </section>
);

// Introduction Section
const IntroductionSection = () => (
  <section id="introduction" className="py-20 md:py-28 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">The Flaw in Traditional Portfolios</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          The classic 60/40 stock/bond portfolio, while seemingly diversified by capital, masks a severe risk imbalance. Due to the higher volatility of equities, the stock component often accounts for over 90% of the portfolio's total risk. This means a "balanced" portfolio is often just a leveraged bet on the stock market.
        </p>
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold tracking-tight text-blue-600">A New Paradigm: From Capital to Risk Budgeting</h3>
        <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
          Risk Parity corrects this by focusing on risk allocation, ensuring each asset class contributes equally to portfolio volatility. This report introduces a novel approach using call writing—a tool for risk transformation—to achieve this balance without resorting to traditional leverage.
        </p>
      </div>
    </div>
  </section>
);

// Core Concepts Section
const CoreConceptsSection = () => (
  <section id="concepts" className="py-20 md:py-28 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Core Concepts Deconstructed</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Understanding the two pillars of this innovative strategy: Equal Risk Contribution and Options Overlays.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart2 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="ml-4 text-2xl font-bold text-gray-900">The Principle of Risk Parity</h3>
          </div>
          <p className="text-gray-600 mb-4">
            The central tenet is <strong>Equal Risk Contribution (ERC)</strong>. Instead of allocating capital, the strategy allocates risk. The goal is a robust, "all-weather" portfolio where each asset class—equities, bonds, commodities—contributes equally to total portfolio risk, making it resilient across diverse economic scenarios.
          </p>
          <p className="text-gray-600">
            This requires sophisticated quantitative analysis to determine the precise capital allocations that result in a balanced risk budget.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="ml-4 text-2xl font-bold text-gray-900">Call Writing as Risk Transformation</h3>
          </div>
          <p className="text-gray-600 mb-4">
            A covered call strategy creates an <strong>asymmetric payoff profile</strong>. In exchange for an upfront premium, the investor forfeits potential capital appreciation above the option's strike price. This caps the upside but provides a downside buffer equal to the premium received.
          </p>
          <p className="text-gray-600">
            This transforms a high-volatility asset into a synthetic, lower-beta asset, effectively "powering down" its risk contribution within the portfolio.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Academic Foundations Section
const AcademicFoundationsSection = () => (
  <section id="research" className="py-20 md:py-28 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Built on a Foundation of Academic Research</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          This strategy synthesizes decades of research from two distinct fields: risk-based asset allocation and derivatives strategy analysis.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <FileText className="h-8 w-8 text-blue-600 mb-3" />
          <h4 className="font-bold text-xl mb-2 text-gray-900">Foundational Risk Parity Works</h4>
          <p className="text-gray-600 text-sm">
            Research from Qian, AQR, and Bridgewater established the core objective: equalize risk contributions. This body of work defines the target state that the call-written strategy aims to achieve.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <FileText className="h-8 w-8 text-blue-600 mb-3" />
          <h4 className="font-bold text-xl mb-2 text-gray-900">"Covered Calls Uncovered" (AQR)</h4>
          <p className="text-gray-600 text-sm">
            This seminal paper deconstructed the covered call into its constituent risk factors, proving it can be an efficient risk-reduction tool by isolating compensated risk premiums (equity and volatility).
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <FileText className="h-8 w-8 text-blue-600 mb-3" />
          <h4 className="font-bold text-xl mb-2 text-gray-900">Optimization Frameworks (Diaz & Kwon)</h4>
          <p className="text-gray-600 text-sm">
            Their work showed that simultaneously optimizing asset weights and option parameters is superior to a simple overlay, providing a quantitative engine for a truly integrated strategy.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <FileText className="h-8 w-8 text-blue-600 mb-3" />
          <h4 className="font-bold text-xl mb-2 text-gray-900">Tail Risk Parity (AllianceBernstein)</h4>
          <p className="text-gray-600 text-sm">
            This research presents a critical alternative, highlighting the potential weakness of a short-convexity strategy (like call writing) when viewed through a tail-risk lens, framing a key philosophical debate.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Comparison Section
const ComparisonSection = () => (
  <section id="comparison" className="py-20 md:py-28 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Two Paths to Risk Parity: A Trade-Off Analysis</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Achieve risk parity by "levering up" safe assets or "powering down" risky ones. The choice is a strategic decision about which risks you are willing to bear.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="border-2 border-gray-200 rounded-xl p-8 bg-gray-50 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold mb-4 text-blue-600">Leverage-Based Approach</h3>
          <p className="text-gray-600 mb-6">
            Amplifies the risk of low-risk assets (like bonds) to match high-risk assets (like stocks) by applying leverage to the entire portfolio.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Theoretically more efficient (leverages higher Sharpe ratio base).</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Maintains full upside potential in bull markets.</span>
            </li>
            <li className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Introduces explicit funding costs and counterparty risk.</span>
            </li>
            <li className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Vulnerable to correlation shocks (e.g., when stocks and bonds fall together).</span>
            </li>
          </ul>
        </div>
        <div className="border-2 border-blue-400 rounded-xl p-8 bg-blue-50 shadow-xl">
          <h3 className="text-2xl font-bold mb-4 text-purple-600">Call-Writing Approach</h3>
          <p className="text-gray-600 mb-6">
            Reduces the risk of high-risk assets (equities) by applying a call-writing overlay, creating a synthetic low-volatility asset.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Viable for leverage-constrained investors.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Harvests the Volatility Risk Premium (VRP) as an alternative return source.</span>
            </li>
            <li className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Incurs implicit opportunity cost by capping upside potential.</span>
            </li>
            <li className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Introduces a short convexity / short volatility risk profile.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// Implementation Section with Tabs
const ImplementationSection = () => {
  const [activeTab, setActiveTab] = useState('delta');
  
  const tabs = {
    delta: { title: 'Delta Targeting', content: <DeltaContent /> },
    strike: { title: 'Strike Selection', content: <StrikeContent /> },
    rebalancing: { title: 'Dynamic Management', content: <RebalancingContent /> },
  };

  return (
    <section id="implementation" className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">A Practitioner's Guide to Calibration</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Effective implementation requires a disciplined, rules-based approach to managing the options overlay.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="flex border-b border-gray-200 mb-8">
            {Object.entries(tabs).map(([key, tab]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`py-3 px-6 font-semibold text-lg transition-colors duration-300 ${
                  activeTab === key 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
            {tabs[activeTab].content}
          </div>
        </div>
      </div>
    </section>
  );
};

const DeltaContent = () => (
  <div>
    <h3 className="text-2xl font-bold text-blue-600 mb-4">The Primary Control Lever</h3>
    <p className="text-gray-700">
      An option's <strong>delta</strong> is the primary tool for calibrating the overlay's risk reduction. By systematically selling calls with a specific average delta, a manager can precisely target a desired portfolio beta.
    </p>
    <ul className="mt-4 space-y-2 text-gray-600 list-disc list-inside">
      <li>To achieve a target beta of <strong>0.8</strong>, sell calls with an average delta of <strong>0.20</strong>.</li>
      <li>To achieve a target beta of <strong>0.6</strong>, sell calls with an average delta of <strong>0.40</strong>.</li>
      <li>To achieve a target beta of <strong>0.5</strong>, sell at-the-money calls with a delta of ~<strong>0.50</strong>.</li>
    </ul>
  </div>
);

const StrikeContent = () => (
  <div>
    <h3 className="text-2xl font-bold text-blue-600 mb-4">Balancing Risk, Reward, and Income</h3>
    <p className="text-gray-700 mb-6">
      The choice of strike price ("moneyness") implements the delta target and involves significant trade-offs.
    </p>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3">Moneyness (Delta)</th>
            <th className="p-3">Profile</th>
            <th className="p-3">Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-200">
            <td className="p-3 font-semibold">Out-of-the-Money (&lt;0.5)</td>
            <td className="p-3">Less income, less risk reduction, but more upside potential.</td>
            <td className="p-3">Mildly bullish outlook or when minimal risk reduction is needed.</td>
          </tr>
          <tr className="border-t border-gray-200">
            <td className="p-3 font-semibold">At-the-Money (~0.5)</td>
            <td className="p-3">Maximizes premium income (VRP harvest) with significant risk reduction.</td>
            <td className="p-3">The standard choice for a balanced risk/income profile.</td>
          </tr>
          <tr className="border-t border-gray-200">
            <td className="p-3 font-semibold">In-the-Money (&gt;0.5)</td>
            <td className="p-3">Maximum risk reduction and downside buffer, but no upside.</td>
            <td className="p-3">Neutral to bearish outlook or when maximum risk reduction is required.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const RebalancingContent = () => (
  <div>
    <h3 className="text-2xl font-bold text-blue-600 mb-4">Responding to Market Dynamics</h3>
    <p className="text-gray-700 mb-4">
      This is not a "set and forget" strategy. The overlay must be dynamically managed as market conditions evolve, particularly in response to changes in implied volatility (IV).
    </p>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h4 className="font-bold text-lg text-green-700">When IV is High:</h4>
        <p className="text-gray-700">
          Sell calls further out-of-the-money (lower delta). This captures high premiums while retaining more upside potential.
        </p>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-bold text-lg text-yellow-700">When IV is Low:</h4>
        <p className="text-gray-700">
          Sell calls closer to-the-money (higher delta). This is necessary to generate sufficient premium and achieve the target risk reduction.
        </p>
      </div>
    </div>
  </div>
);

// Advanced Considerations Section
const AdvancedConsiderationsSection = () => (
  <section id="advanced" className="py-20 md:py-28 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Advanced Considerations & Critiques</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          No strategy is without its vulnerabilities. Understanding the limitations is key.
        </p>
      </div>
      <div className="space-y-8">
        <div className="bg-red-50 p-8 rounded-xl border border-red-200 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <Shield className="h-16 w-16 text-red-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3 text-red-700">The Tail Risk Parity (TRP) Critique</h3>
            <p className="text-gray-700">
              While call writing reduces average volatility, it does little to protect against severe market crashes. By selling a call, an investor sells convexity, truncating the positive tail (upside) while leaving the dangerous negative tail largely intact. This makes it a potentially suboptimal strategy for investors whose primary goal is mitigating extreme crash risk.
            </p>
          </div>
        </div>
        <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-200 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <GitBranch className="h-16 w-16 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3 text-yellow-700">Model Risk & Parameter Uncertainty</h3>
            <p className="text-gray-700">
              The strategy's effectiveness relies on key inputs: forecasts of volatility and correlations, and the assumption of a persistent Volatility Risk Premium. Errors in these inputs or a reliance on models based on normal distributions (in a "fat-tailed" world) can lead to unexpected and suboptimal performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Conclusion Section
const ConclusionSection = () => (
  <section id="conclusion" className="py-20 md:py-28 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Viability and Strategic Recommendations</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Call writing is a sophisticated and viable strategy that expands the modern portfolio manager's toolkit, representing a thoughtful evolution of risk-based investing.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
          <h4 className="font-bold text-xl mb-4 text-blue-600">Primary Use Cases</h4>
          <ul className="space-y-3 list-disc list-inside text-gray-600">
            <li><strong>Leverage-Constrained Investors:</strong> The most compelling case for institutions (endowments, foundations) whose mandates prohibit explicit leverage.</li>
            <li><strong>Range-Bound Markets:</strong> Best suited for market regimes expected to be range-bound, moderately bullish, or mildly bearish.</li>
            <li><strong>Diversifying Complement:</strong> Can be blended with leverage-based approaches to diversify the sources of risk within the management process itself.</li>
          </ul>
        </div>
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
          <h4 className="font-bold text-xl mb-4 text-blue-600">Avenues for Future Research</h4>
          <ul className="space-y-3 list-disc list-inside text-gray-600">
            <li>Integration of more complex options structures like collars to protect the downside tail.</li>
            <li>Application of overlays to other asset classes like commodities or high-yield credit.</li>
            <li>Rigorous backtesting of dynamic rebalancing models based on implied volatility.</li>
          </ul>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200">
          <h3 className="text-2xl font-bold mb-4 text-blue-600">Explore the Full Research</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            This analysis represents a comprehensive examination of risk parity through call writing. Access the complete research document for detailed mathematical frameworks, empirical analysis, and implementation guidelines.
          </p>
          <a 
            href="https://docs.google.com/document/d/e/2PACX-1vSd8wQidCZUfKg-fmOVm7mtGlq6mgKFVwOVhXrJyTkJ0OLZTOZwDxEXnILWVoqhqhDEUx1r_jtcmaN4/pub"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
          >
            <FileText className="inline mr-2" />
            Read Full Research Paper
          </a>
        </div>
      </div>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="bg-white border-t border-gray-200">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Scaling className="h-6 w-6 text-blue-600" />
          <p className="ml-2 text-gray-600">&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
        </div>
        <div className="text-gray-500 text-sm">
          <p>A comprehensive analysis based on academic research in risk parity and options strategies.</p>
        </div>
      </div>
    </div>
  </footer>
);