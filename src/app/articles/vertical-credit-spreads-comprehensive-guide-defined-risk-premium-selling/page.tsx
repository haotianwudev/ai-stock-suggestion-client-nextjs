'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Shield, Calculator, Target, AlertTriangle, CheckCircle, XCircle, HelpCircle, Calendar, Activity, Zap } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function VerticalCreditSpreadsGuide() {
  const currentArticle = articles.find(article => article.slug === 'vertical-credit-spreads-comprehensive-guide-defined-risk-premium-selling');
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'application', title: 'Strategic Application', icon: <Target className="w-5 h-5" /> },
    { id: 'greeks', title: 'The Greeks', icon: <Calculator className="w-5 h-5" /> },
    { id: 'underlyings', title: 'Choosing Underlyings', icon: <Activity className="w-5 h-5" /> },
    { id: 'comparison', title: 'Comparative Analysis', icon: <Shield className="w-5 h-5" /> },
    { id: 'architecture', title: 'Trade Architecture', icon: <Zap className="w-5 h-5" /> },
    { id: 'walkthrough', title: 'Trade Walkthrough', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'management', title: 'Trade Management', icon: <Calendar className="w-5 h-5" /> }
  ];

  return (
    <>
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 py-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-20 left-4 z-40">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
            Deep Research
          </span>
        </div>

        <div className="absolute top-20 right-4 z-40">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
            Options
          </span>
        </div>

        {/* Hero Section */}
        <div className="relative py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Vertical Credit Spreads
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                A Comprehensive Guide to Defined-Risk Premium Selling
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  October 19, 2025
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Institutional Framework
                </span>
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  Defined Risk Strategy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {section.icon}
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Navigation</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === section.id
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        {section.icon}
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                
                {/* Introduction Section */}
                <section id="introduction" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                    An Introduction to the Vertical Credit Spread
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">The Core Concept: Selling Financial 'Insurance'</h3>
                      <p className="text-blue-800 leading-relaxed">
                        Think of a vertical credit spread as selling a carefully structured insurance policy on a stock. You collect an upfront payment (the 'premium' or 'credit'), and if the stock price stays within a specific range by a certain date, you keep that payment as profit. The 'vertical' part of the name comes from the fact that the two options involved have strike prices that are vertically aligned in the same expiration cycle on an option chain.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Bull Put Spread
                        </h4>
                        <p className="text-green-800 text-sm mb-3">
                          <strong>Bullish to Neutral Strategy:</strong> Used when you expect a stock's price to rise, stay flat, or even drop slightly.
                        </p>
                        <div className="bg-green-100 border border-green-300 rounded p-3 text-xs text-green-900">
                          <strong>Example:</strong> Stock XYZ at $155. Sell $150 put, buy $145 put for $1.50 credit. 
                          Max profit: $150. Max loss: $350. Breakeven: $148.50.
                        </div>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-red-900 mb-3 flex items-center gap-2">
                          <Activity className="w-5 h-5" />
                          Bear Call Spread
                        </h4>
                        <p className="text-red-800 text-sm mb-3">
                          <strong>Bearish to Neutral Strategy:</strong> Used when you expect a stock's price to fall, stay flat, or even rise slightly.
                        </p>
                        <div className="bg-red-100 border border-red-300 rounded p-3 text-xs text-red-900">
                          <strong>Example:</strong> Stock XYZ at $155. Sell $160 call, buy $165 call for $1.30 credit. 
                          Max profit: $130. Max loss: $370. Breakeven: $161.30.
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Strategic Application Section */}
                <section id="application" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Target className="w-8 h-8 text-blue-600" />
                    Strategic Application and Environmental Factors
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-purple-900 mb-3">Market Outlook: The Power of Neutrality</h3>
                      <p className="text-purple-800 leading-relaxed">
                        Vertical credit spreads thrive in markets characterized by moderate movement or consolidation. Unlike buying stock, where you only profit from an upward move, credit spreads profit from three potential scenarios: the stock moving in your favor, moving sideways, or even moving slightly against you. This versatility significantly increases the probability of a winning trade from the outset.
                      </p>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-orange-900 mb-3">Implied Volatility (IV): The Trader's Edge</h3>
                      <p className="text-orange-800 leading-relaxed mb-4">
                        The most critical factor for success is high implied volatility. IV is a measure of the market's expectation of future price swings. When IV is high, option prices are expensive. As a seller of credit spreads, you are selling this 'rich' premium.
                      </p>
                      <div className="bg-orange-100 border border-orange-300 rounded p-4">
                        <p className="text-orange-900 text-sm">
                          <strong>Key Rule:</strong> Only consider selling spreads when IV Rank is above 30. Use IV Rank or IV Percentile metrics available on most trading platforms to objectively measure current volatility levels.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* The Greeks Section */}
                <section id="greeks" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Calculator className="w-8 h-8 text-blue-600" />
                    Understanding the 'Greeks'
                  </h2>
                  
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      The 'Greeks' are variables that measure an option position's sensitivity to different market factors. For a credit spread seller, they are your dashboard indicators, telling you how your position is behaving and what risks you face.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Delta (Directional Risk)</h4>
                        <p className="text-blue-800 text-sm">
                          The position's net delta tells you your equivalent stock exposure. Bull put spreads have positive delta, bear call spreads have negative delta.
                        </p>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2">Theta (Time Decay)</h4>
                        <p className="text-green-800 text-sm">
                          As a net seller of options, your position has positive theta. This means your position's value increases each day as time decay erodes option values.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">Vega (Volatility Risk)</h4>
                        <p className="text-purple-800 text-sm">
                          Credit spreads have negative vega, meaning your position profits when implied volatility decreases. This is why you sell spreads when IV is high.
                        </p>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-900 mb-2">Gamma (Rate of Change)</h4>
                        <p className="text-red-800 text-sm">
                          Gamma represents your trade's instability. As expiration nears, gamma risk increases dramatically, making positions unpredictable.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Choosing Underlyings Section */}
                <section id="underlyings" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Activity className="w-8 h-8 text-blue-600" />
                    Choosing the Right Underlying
                  </h2>
                  
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      The success of a credit spread strategy is heavily dependent on the underlying stock or ETF you choose. Selecting the right canvas for your trade is half the battle.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-green-900">High Liquidity</h4>
                          <p className="text-green-800 text-sm">Focus on stocks with high daily volume and open interest. Think SPY, QQQ, and large-cap stocks.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-blue-900">Elevated IV Rank</h4>
                          <p className="text-blue-800 text-sm">Use IV Rank screeners to find underlyings with current IV high relative to 52-week range (>30 minimum).</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <XCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-red-900">Avoid Binary Events</h4>
                          <p className="text-red-800 text-sm">Never place spreads with expiration dates that include earnings or other major announcements.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-900">Reasonable Pricing</h4>
                          <p className="text-yellow-800 text-sm">Focus on stocks priced $50-$500 with liquid options and $1 or $5 strike increments.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Comparison Table Section */}
                <section id="comparison" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-blue-600" />
                    Comparative Analysis: Spreads vs. Naked Options
                  </h2>
                  
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      Selling a naked option may seem to offer a slightly higher premium, but it comes at the cost of unlimited risk and enormous capital requirements. A credit spread offers a sophisticated alternative that optimizes for risk-adjusted returns and capital efficiency.
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bear Call Spread</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short Naked Call</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bull Put Spread</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short Naked Put</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Market Outlook</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bearish to Neutral</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bearish to Neutral</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bullish to Neutral</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bullish to Neutral</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Max Profit</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Limited (Net Credit)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Limited (Premium)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Limited (Net Credit)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Limited (Premium)</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Max Loss</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Limited & Defined</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Unlimited</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Limited & Defined</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Substantial</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Margin Requirement</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Low (Equals Max Loss)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Very High</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Low (Equals Max Loss)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Very High</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Capital Efficiency</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">High</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Low</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">High</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Low</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm italic text-center">
                      The spread is a structurally superior vehicle for premium selling from a risk-management and capital-efficiency perspective. For a modest reduction in potential profit, the trader gains absolute control and frees up significant capital for other opportunities.
                    </p>
                  </div>
                </section>

                {/* Trade Architecture Section */}
                <section id="architecture" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-blue-600" />
                    The Architecture of the Trade: Strike and Width Selection
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-indigo-900 mb-3">Selecting the First Leg (Short Strike) Using Delta</h3>
                      <p className="text-indigo-800 leading-relaxed mb-4">
                        Delta can be interpreted as an approximate probability of an option expiring in-the-money. This makes it an invaluable tool for building trades that align with your risk tolerance.
                      </p>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-green-100 border border-green-300 rounded p-4">
                          <h4 className="font-semibold text-green-900 mb-2">Conservative (10-20 Delta)</h4>
                          <p className="text-green-800 text-sm">Very high probability of success but yields smaller premium.</p>
                        </div>
                        <div className="bg-yellow-100 border border-yellow-300 rounded p-4">
                          <h4 className="font-semibold text-yellow-900 mb-2">Balanced (25-35 Delta)</h4>
                          <p className="text-yellow-800 text-sm">The 'sweet spot' - good balance of premium and probability.</p>
                        </div>
                        <div className="bg-red-100 border border-red-300 rounded p-4">
                          <h4 className="font-semibold text-red-900 mb-2">Aggressive (40-50 Delta)</h4>
                          <p className="text-red-800 text-sm">Larger premium but probability closer to coin flip.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-teal-900 mb-3">Selecting the Second Leg and Defining Spread Width</h3>
                      <p className="text-teal-800 leading-relaxed mb-4">
                        The distance between your short strike and your long strike is the 'width' of the spread. This width dictates your maximum risk and the margin required for the trade.
                      </p>
                      <div className="bg-teal-100 border border-teal-300 rounded p-4">
                        <p className="text-teal-900 text-sm">
                          <strong>Best Practice:</strong> Aim to collect a net credit that is approximately one-third (1/3) of the spread's width. For example, on a $3 wide spread, aim to collect around $1.00 premium.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Trade Walkthrough Section */}
                <section id="walkthrough" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                    A Practical Trade Walkthrough
                  </h2>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Bull Put Spread on META (Fictional Example)</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Let's walk through a complete trade setup and management process from analysis to execution.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: "Analysis & Setup",
                        description: "Today is October 19, 2025. Meta Platforms (META) is trading at $512. We observe that its IV Rank is 55, which is high and ideal for selling premium. Our market outlook is neutral to bullish."
                      },
                      {
                        step: 2,
                        title: "Select Expiration",
                        description: "We choose the expiration cycle with approximately 45 days to go, which is December 5, 2025. This gives us the optimal balance of theta decay."
                      },
                      {
                        step: 3,
                        title: "Select Strikes",
                        description: "We look at the META option chain for Dec 5th. The $480 strike put has a delta of .31 (our short leg). To create a $10-wide spread, we buy the $470 strike put as protection."
                      },
                      {
                        step: 4,
                        title: "Place the Order",
                        description: "We enter a multi-leg order to 'Sell the META Dec 5 $480/$470 Put Spread'. The current market for this spread is a credit of $3.40. We place our order and get filled."
                      },
                      {
                        step: 5,
                        title: "Define the Trade",
                        description: "Max Profit: $340. Max Loss: $660. Breakeven: $476.60. As long as META stays above $476.60 at expiration, our trade will be profitable."
                      },
                      {
                        step: 6,
                        title: "Set Exit Orders",
                        description: "Immediately set a GTC order to buy back the spread at 50% of max profit ($1.70). This automates our profit-taking."
                      },
                      {
                        step: 7,
                        title: "Outcome Scenarios",
                        description: "Win: META rallies, IV drops, spread worth $1.65, profit $175. Manage: META drops to $485, reach 21 DTE, consider rolling for additional credit."
                      }
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-gray-700 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Trade Management Section */}
                <section id="management" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-blue-600" />
                    A Trader's Guide to Managing and Closing the Position
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-emerald-900 mb-4">Best Practices for Proactive Trade Management</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-emerald-900">Optimal Expiration Dates (DTE)</h4>
                            <p className="text-emerald-800 text-sm">Enter trades with 30-60 days to expiration. The 45 DTE mark is often optimal for theta decay balance.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Target className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-emerald-900">The 50% Profit Rule</h4>
                            <p className="text-emerald-800 text-sm">Close positions once you capture 50% of initial credit. This improves win rate and return on capital.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-emerald-900">The 21 DTE Management Rule</h4>
                            <p className="text-emerald-800 text-sm">At 21 DTE, gamma risk increases significantly. Close profitable trades or consider rolling losing positions.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">Advanced Management: 'Rolling' a Position</h3>
                      <p className="text-blue-800 leading-relaxed mb-4">
                        When a trade moves against you, you can 'roll' it to extend duration and potentially improve your position. Rolling involves closing your existing spread and opening a new one in a later expiration cycle.
                      </p>
                      <div className="bg-blue-100 border border-blue-300 rounded p-4">
                        <p className="text-blue-900 text-sm">
                          <strong>Primary Rule:</strong> Always roll for a net credit. This pays you to extend the trade duration. You can roll 'out' to a later date, or 'out and down/up' to different strikes.
                        </p>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-red-900 mb-3">Expiration Risk: Avoiding the 'Pin'</h3>
                      <p className="text-red-800 leading-relaxed mb-4">
                        The greatest danger at expiration is 'pin risk.' This occurs if the underlying price closes exactly at, or very close to, your short strike price, potentially leading to unexpected assignment.
                      </p>
                      <div className="bg-red-100 border border-red-300 rounded p-4">
                        <p className="text-red-900 text-sm">
                          <strong>Unbreakable Rule:</strong> Always close your spread positions before the market closes on the day of expiration.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <HelpCircle className="w-8 h-8 text-blue-600" />
                    Frequently Asked Questions
                  </h2>
                  
                  <div className="space-y-6">
                    {[
                      {
                        q: "What happens if my short option is assigned early?",
                        a: "While rare for out-of-the-money options, early assignment can happen. Your broker will typically exercise your long option automatically to close the resulting stock position, keeping your risk defined."
                      },
                      {
                        q: "Can I trade credit spreads in a retirement account (like an IRA)?",
                        a: "Yes. Because they are defined-risk strategies, most brokers allow credit spreads in retirement accounts once you have the appropriate options trading level approved."
                      },
                      {
                        q: "What is the difference between a credit spread and a debit spread?",
                        a: "A credit spread involves selling a more expensive option and buying a cheaper one (net credit received). A debit spread is the opposite: you buy expensive and sell cheap (net debit paid)."
                      },
                      {
                        q: "How do commissions affect profitability?",
                        a: "Commissions are a cost of doing business and should be factored into expected profit. Because spreads involve multiple legs, commissions can be higher than single-leg trades."
                      }
                    ].map((faq, index) => (
                      <div key={index} className="p-6 border-l-4 border-blue-200 bg-blue-50 rounded-r-lg">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                          <HelpCircle className="w-5 h-5" />
                          {faq.q}
                        </h4>
                        <p className="text-blue-800 text-sm pl-7">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Key Recommendations */}
                <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Key Recommendations for Implementation</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Prioritize High IV",
                        description: "Only sell spreads when the underlying's IV Rank is elevated (ideally above 30). This provides the 'edge' that makes the strategy consistently profitable.",
                        icon: <Activity className="w-8 h-8 text-teal-600" />
                      },
                      {
                        title: "Standardize Your Setup",
                        description: "Use a consistent delta for strike selection (e.g., 30 delta) and a consistent risk/reward target (e.g., collect 1/3 the width of the strikes).",
                        icon: <Target className="w-8 h-8 text-teal-600" />
                      },
                      {
                        title: "Manage by the Numbers",
                        description: "Follow a strict management plan: ~45 DTE entry, take profits at 50%, and manage or close all positions at 21 DTE.",
                        icon: <CheckCircle className="w-8 h-8 text-teal-600" />
                      },
                      {
                        title: "Systematic Position Sizing",
                        description: "Consistently risk a small, fixed percentage of total account equity (e.g., 1-2%) on each and every trade.",
                        icon: <Shield className="w-8 h-8 text-teal-600" />
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center mb-4">
                          {item.icon}
                          <h3 className="ml-4 text-xl font-semibold text-gray-800">{item.title}</h3>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Common Mistakes */}
                <section className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Common Mistakes to Avoid</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Legging Into Spreads",
                        description: "Trying to time the market by entering each leg separately. This turns a high-probability spread into a low-probability directional bet.",
                        icon: <XCircle className="w-8 h-8 text-red-500" />
                      },
                      {
                        title: "Ignoring Earnings and News",
                        description: "Placing trades before earnings reports is gambling, not strategy. Extreme price gaps will overwhelm any statistical edge.",
                        icon: <XCircle className="w-8 h-8 text-red-500" />
                      },
                      {
                        title: "Over-Sizing Positions",
                        description: "Just because risk is 'defined' doesn't mean you can ignore position sizing. Risking too much leads to emotional decisions.",
                        icon: <XCircle className="w-8 h-8 text-red-500" />
                      },
                      {
                        title: "Chasing High Premiums",
                        description: "The highest premiums are often on low-quality stocks with high IV for good reason—they are extremely volatile.",
                        icon: <XCircle className="w-8 h-8 text-red-500" />
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center mb-4">
                          {item.icon}
                          <h3 className="ml-4 text-xl font-semibold text-gray-800">{item.title}</h3>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Risk Warning */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-yellow-900 mb-2">Risk Disclosure</h3>
                      <p className="text-yellow-800 text-sm">
                        Options trading involves substantial risk and is not suitable for all investors. Past performance does not guarantee future results. 
                        This content is for educational purposes only and should not be considered personalized investment advice. 
                        Always consult with a qualified financial advisor before making investment decisions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center py-8">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8">
                    <h3 className="text-2xl font-bold mb-4">Ready to Implement These Strategies?</h3>
                    <p className="text-blue-100 mb-6">
                      Start with paper trading to practice these concepts before risking real capital. 
                      Focus on high-probability setups and strict risk management.
                    </p>
                    {currentArticle?.googleDoc && (
                      <a 
                        href={currentArticle.googleDoc}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                      >
                        View Research Document
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
            <p>&copy; 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
