'use client';

import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, BarChart2, Briefcase, Layers, AlertTriangle, Scale, Banknote, Landmark, Lightbulb, Users, ArrowRight, CheckCircle, XCircle, FileText, GanttChartSquare, Telescope, ArrowLeft, Music } from 'lucide-react';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function PrivateCreditAnalysis() {
  const [activeTab, setActiveTab] = useState('directLending');
  const currentArticle = articles.find(article => article.slug === 'private-credit-risks-returns-deep-research-analysis');

  const strategies = {
    directLending: {
      title: 'Direct Lending / Senior Debt',
      position: 'Senior Secured, First Lien',
      returnDriver: 'Contractual Interest Income',
      targetReturn: 'High single digits to low double digits',
      risks: 'Credit/Default Risk, Illiquidity',
      description: 'The bedrock of the private credit market. This strategy involves providing senior-secured, first-lien term loans directly to private, middle-market companies. A popular structure is the "unitranche" loan, which combines senior and subordinated debt into a single, streamlined facility. The focus is on capital preservation and generating stable, predictable income.',
      icon: <Layers className="w-8 h-8 text-blue-500" />
    },
    mezzanine: {
      title: 'Mezzanine Financing',
      position: 'Subordinated, Unsecured',
      returnDriver: 'High Interest + Equity Upside',
      targetReturn: '12% - 20%+',
      risks: 'Subordination Risk, Credit Risk, Equity Risk',
      description: 'A higher-risk, higher-return strategy that sits between debt and equity. Mezzanine debt is junior to senior loans and is compensated for this risk with a higher interest rate and an "equity kicker" (like warrants), allowing lenders to participate in the company\'s upside potential.',
      icon: <GanttChartSquare className="w-8 h-8 text-purple-500" />
    },
    distressed: {
      title: 'Distressed Debt',
      position: 'Varies (often Fulcrum Security)',
      returnDriver: 'Capital Appreciation, Control',
      targetReturn: 'Equity-like (20%+)',
      risks: 'Bankruptcy/Liquidation Risk, Restructuring Complexity',
      description: 'A highly specialized, event-driven strategy involving the purchase of debt from companies in or near financial distress. The goal is often "loan-to-own," where the investor acquires enough debt to gain control of the company through its restructuring, converting their debt into new equity and capturing the value of the turnaround.',
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />
    },
    specialty: {
        title: 'Specialty Finance / Asset-Based Finance (ABF)',
        position: 'Varies (often Senior Secured)',
        returnDriver: 'Asset-based Cash Flows',
        targetReturn: 'Varies widely (High single digits to high teens)',
        risks: 'Collateral-Specific Risk, Operational Risk',
        description: 'A major frontier for growth, this strategy involves lending against pools of hard assets (like real estate, aircraft) or contractual cash flows (like equipment leases, music royalties). It offers diversification away from corporate credit risk, with returns anchored to the value of tangible collateral.',
        icon: <FileText className="w-8 h-8 text-green-500" />
    }
  };

  const activeStrategy = strategies[activeTab];

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}
      
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
        {/* Return to Home Button */}
        <div className="container mx-auto px-6 pt-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Landmark className="w-7 h-7 mr-2 text-blue-600" />
              Private Credit Insights
            </div>
            <div className="hidden md:flex items-center space-x-8 font-medium text-gray-600 dark:text-gray-300">
              <a href="#overview" className="hover:text-blue-600 transition-colors">Overview</a>
              <a href="#thesis" className="hover:text-blue-600 transition-colors">Investment Thesis</a>
              <a href="#strategies" className="hover:text-blue-600 transition-colors">Strategies</a>
              <a href="#risks" className="hover:text-blue-600 transition-colors">Risks</a>
              <a href="#outlook" className="hover:text-blue-600 transition-colors">Outlook</a>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="relative">
          <section className="relative text-center py-24 md:py-32 bg-gradient-to-br from-blue-600 to-indigo-800 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="container mx-auto px-6 relative z-10">
              <div className="absolute top-4 left-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-600 text-white">
                  <Telescope className="w-4 h-4 mr-1" />
                  Deep Research
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight">
                The Rise of Private Credit
              </h1>
              <p className="mt-4 text-xl md:text-2xl max-w-3xl mx-auto text-blue-200">
                An in-depth analysis of the multi-trillion dollar asset class reshaping corporate finance and why it has become a cornerstone of sophisticated investment portfolios.
              </p>
              <a href="#overview" className="mt-8 inline-block bg-blue-600 text-white font-bold rounded-lg px-8 py-3 hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg">
                Explore the Market
              </a>
            </div>
          </section>

          {/* Section 1: Overview */}
          <section id="overview" className="py-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">A New Pillar of Finance</h2>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Born from the 2008 financial crisis, private credit fills a critical void left by traditional banks, offering customized financing to middle-market companies.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <Users className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">The Lenders</h3>
                  <p className="text-gray-600 dark:text-gray-300">Non-bank institutions like private credit funds and Business Development Companies (BDCs) manage and deploy capital.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <Briefcase className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">The Borrowers</h3>
                  <p className="text-gray-600 dark:text-gray-300">Typically private, middle-market companies, often backed by private equity, seeking flexible and reliable capital.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                  <Banknote className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">The Investors</h3>
                  <p className="text-gray-600 dark:text-gray-300">Pension funds, insurers, family offices, and high-net-worth individuals seeking yield and diversification.</p>
                </div>
              </div>
              
              <div className="mt-16">
                 <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Private vs. Public Debt: Key Differences</h3>
                 <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                                <th className="p-4 font-semibold text-blue-600 dark:text-blue-400">Private Credit</th>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Public Bonds</th>
                                <th className="p-4 font-semibold text-gray-900 dark:text-white">Bank Loans (BSLs)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            <tr>
                                <td className="p-4 font-medium text-gray-900 dark:text-white">Liquidity</td>
                                <td className="p-4 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20">Highly Illiquid</td>
                                <td className="p-4 text-gray-600 dark:text-gray-300">Highly Liquid</td>
                                <td className="p-4 text-gray-600 dark:text-gray-300">Liquid</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-medium text-gray-900 dark:text-white">Coupon</td>
                                <td className="p-4 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20">Floating Rate</td>
                                <td className="p-4 text-gray-600 dark:text-gray-300">Fixed Rate</td>
                                <td className="p-4 text-gray-600 dark:text-gray-300">Floating Rate</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-medium text-gray-900 dark:text-white">Covenants</td>
                                <td className="p-4 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20">Strong & Negotiated</td>
                                <td className="p-4 text-gray-600 dark:text-gray-300">Fewer, Less Restrictive</td>
                                <td className="p-4 text-gray-600 dark:text-gray-300">Often "Covenant-Lite"</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-medium text-gray-900 dark:text-white">Relationship</td>
                                <td className="p-4 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20">Direct & Relationship-Based</td>
                                <td className="p-4 text-gray-600 dark:text-gray-300">Impersonal</td>
                                <td className="p-4 text-gray-600 dark:text-gray-300">Transactional</td>
                            </tr>
                        </tbody>
                    </table>
                 </div>
              </div>
            </div>
          </section>

          {/* Section 2: Investment Thesis */}
          <section id="thesis" className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Why Sophisticated Investors Care</h2>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Private credit offers a compelling combination of high income, structural protection, and portfolio diversification.</p>
              </div>
              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border-t-4 border-blue-500">
                  <TrendingUp className="w-10 h-10 text-blue-500 mb-4" />
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Enhanced, Income-Driven Returns</h3>
                  <p className="text-gray-600 dark:text-gray-300">Investors earn an "illiquidity premium" for locking up capital, resulting in higher yields than comparable public debt. Floating-rate coupons provide a natural hedge against inflation and rising rates.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border-t-4 border-green-500">
                  <ShieldCheck className="w-10 h-10 text-green-500 mb-4" />
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Structural Downside Protection</h3>
                  <p className="text-gray-600 dark:text-gray-300">Most loans are senior-secured, placing lenders first in line for repayment in a default. Strong, negotiated covenants act as an early warning system and provide lenders with control to protect their investment.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border-t-4 border-purple-500">
                  <BarChart2 className="w-10 h-10 text-purple-500 mb-4" />
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Portfolio Diversification</h3>
                  <p className="text-gray-600 dark:text-gray-300">Performance is driven by contractual cash flows, not market sentiment, leading to low correlation with public equities and bonds. Valuations are less volatile, providing a smoother return profile.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Strategies */}
          <section id="strategies" className="py-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">A Spectrum of Strategies</h2>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Private credit is not monolithic. Investors can tailor allocations across various strategies to match their risk and return objectives.</p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="flex border-b border-gray-200 dark:border-gray-600">
                  {Object.keys(strategies).map(key => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`flex-1 py-4 px-2 text-center font-semibold transition-colors duration-300 ${activeTab === key ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                    >
                      {strategies[key].title.split('/')[0]}
                    </button>
                  ))}
                </div>
                
                <div className="mt-8 bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-inner">
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                        <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                            {activeStrategy.icon}
                        </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{activeStrategy.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">{activeStrategy.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                          <p className="font-semibold text-gray-700 dark:text-gray-200">Position:</p>
                          <p className="text-gray-600 dark:text-gray-300">{activeStrategy.position}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                          <p className="font-semibold text-gray-700 dark:text-gray-200">Return Driver:</p>
                          <p className="text-gray-600 dark:text-gray-300">{activeStrategy.returnDriver}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                          <p className="font-semibold text-gray-700 dark:text-gray-200">Target Return:</p>
                          <p className="text-gray-600 dark:text-gray-300">{activeStrategy.targetReturn}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                          <p className="font-semibold text-gray-700 dark:text-gray-200">Key Risks:</p>
                          <p className="text-gray-600 dark:text-gray-300">{activeStrategy.risks}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Market Dynamics */}
          <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Market Scale and Growth</h2>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Understanding the size and trajectory of this transformational asset class.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-4">
                        <BarChart2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">$1.7 - $2.5 Trillion</h3>
                        <p className="text-gray-600 dark:text-gray-300">Total Assets Under Management</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">The private credit market has reached a scale comparable to public leveraged loan and high-yield bond markets.</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mr-4">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">15-Year Growth</h3>
                        <p className="text-gray-600 dark:text-gray-300">From Niche to Mainstream</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">Post-GFC regulatory changes created a structural shift from traditional banking to non-bank lending.</p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Key Market Drivers</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Regulatory Vacuum</h4>
                        <p className="text-gray-600 dark:text-gray-300">Basel III and Dodd-Frank created a durable financing void for middle-market companies.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Yield Hunger</h4>
                        <p className="text-gray-600 dark:text-gray-300">Prolonged low rates left institutional investors seeking alternative income sources.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Structural Matching</h4>
                        <p className="text-gray-600 dark:text-gray-300">Long-term locked capital funds long-term illiquid loans, creating stability.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Risks */}
          <section id="risks" className="py-20 bg-red-50 dark:bg-red-900/20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-red-800 dark:text-red-200">The Risk Ledger: A Clear-Eyed View</h2>
                <p className="mt-3 text-lg text-red-700 dark:text-red-300 max-w-2xl mx-auto">High returns are accompanied by significant risks that every investor must understand and underwrite.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-200 dark:bg-red-800/50 rounded-full flex items-center justify-center">
                    <XCircle className="w-7 h-7 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 dark:text-red-200">Illiquidity Lock-up</h3>
                    <p className="text-red-800 dark:text-red-300 mt-1">Capital is locked up for 5-10+ years with limited to no ability to redeem. This is the fundamental trade-off for the yield premium.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-200 dark:bg-red-800/50 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-7 h-7 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 dark:text-red-200">Credit & Default Risk</h3>
                    <p className="text-red-800 dark:text-red-300 mt-1">Lending to smaller, more leveraged companies carries inherent default risk. The market's resilience at its current scale remains untested in a severe, prolonged recession.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-200 dark:bg-red-800/50 rounded-full flex items-center justify-center">
                    <Scale className="w-7 h-7 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 dark:text-red-200">Transparency & Valuation</h3>
                    <p className="text-red-800 dark:text-red-300 mt-1">Assets are valued subjectively by managers ("mark-to-model"), not daily by the market. This can mask underlying problems and create stale, unrealistic valuations.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-200 dark:bg-red-800/50 rounded-full flex items-center justify-center">
                    <Landmark className="w-7 h-7 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-red-900 dark:text-red-200">Systemic & Regulatory Risk</h3>
                    <p className="text-red-800 dark:text-red-300 mt-1">Deep links to the banking system create potential contagion risk. Growing regulatory scrutiny from bodies like the Fed and IMF could change the industry's landscape.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Outlook */}
          <section id="outlook" className="py-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Market Outlook & Investor Strategy</h2>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">The market is maturing. Future success will be defined by superior manager selection and a strategic approach.</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">The Path Forward</h3>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <Telescope className="w-10 h-10 text-blue-500 mr-4 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">New Frontiers</h4>
                                <p className="text-gray-600 dark:text-gray-300">Growth is shifting towards specialized areas like Asset-Based Finance (ABF), lending against tangible assets and contractual cash flows.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Users className="w-10 h-10 text-blue-500 mr-4 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Bank Partnerships</h4>
                                <p className="text-gray-600 dark:text-gray-300">The relationship with banks is evolving from competition to symbiosis, with funds and banks partnering on deals to provide comprehensive financing solutions.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Briefcase className="w-10 h-10 text-blue-500 mr-4 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Democratization</h4>
                                <p className="text-gray-600 dark:text-gray-300">New vehicles like BDCs and interval funds are making the asset class more accessible to retail investors, though this brings new regulatory focus.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Strategic Recommendations</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">Prioritize Manager Selection:</span>
                        <p className="text-gray-600 dark:text-gray-300">The performance gap between top and bottom managers will widen. Focus on teams with proven track records across cycles.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">Embrace Diversification:</span>
                        <p className="text-gray-600 dark:text-gray-300">Allocate across different managers, strategy types (e.g., core direct lending plus satellite strategies), and vintage years to mitigate risk.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">Internalize the Trade-offs:</span>
                        <p className="text-gray-600 dark:text-gray-300">Be genuinely prepared for long-term illiquidity and be skeptical of low-volatility claims. Understand the manager's valuation process.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Key Takeaways Section */}
          <section className="py-20 bg-blue-50 dark:bg-blue-900/20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-200">Executive Summary: Key Takeaways</h2>
                <p className="mt-3 text-lg text-blue-800 dark:text-blue-300 max-w-2xl mx-auto">Critical insights for sophisticated investors considering private credit allocation.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Compelling Opportunity</h3>
                  </div>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Structural shift from traditional banking creates durable opportunity</li>
                    <li>• Higher yields with floating-rate protection against inflation</li>
                    <li>• Strong downside protection through senior-secured positioning</li>
                    <li>• Low correlation with public markets provides diversification</li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Material Risks</h3>
                  </div>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Illiquidity lock-up of 5-10+ years requires patient capital</li>
                    <li>• Credit risk in untested market environment</li>
                    <li>• Valuation opacity and potential for stale pricing</li>
                    <li>• Regulatory scrutiny and potential systemic risks</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Dive Deeper?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Access the full research document with detailed analysis, case studies, and comprehensive risk assessment frameworks.
              </p>
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FileText className="inline mr-2" />
                  Read Full Research Document
                </a>
              )}
            </div>
          </section>

          {/* Educational Disclaimer */}
          <section className="py-12 bg-yellow-50 dark:bg-yellow-900/20">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-2" />
                  <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">Educational Content & Risk Disclosure</h3>
                </div>
                <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
                  This analysis is for educational purposes only and does not constitute investment advice. Private credit investments involve significant risks including illiquidity, credit risk, and potential loss of principal. Past performance does not guarantee future results. Please consult with qualified financial professionals and conduct thorough due diligence before making investment decisions. This research is based on publicly available information and should not be relied upon as the sole basis for investment decisions.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 dark:bg-black text-white">
          <div className="container mx-auto px-6 py-8 text-center">
            <p>&copy; 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.</p>
            <p className="text-sm text-gray-400 mt-2">This analysis draws upon research from multiple sources including the Federal Reserve, IMF, and leading private credit managers. All data and analysis are current as of the publication date.</p>
          </div>
        </footer>
      </div>
    </>
  );
} 
