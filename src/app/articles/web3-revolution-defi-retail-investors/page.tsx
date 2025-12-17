'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, Zap, Lock, Scale, DollarSign, TrendingUp, HandCoins, ShieldAlert, Music, FileText } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Data structures
const web3Pillars = [
  { 
    icon: Globe, 
    title: "Decentralization", 
    description: "Apps run on distributed blockchain networks, removing single points of failure and censorship risk.",
    color: "indigo"
  },
  { 
    icon: Lock, 
    title: "Verifiable Ownership", 
    description: "Users have true, provable control (self-custody) over their data, assets, and identity via cryptographic keys.",
    color: "teal"
  },
  { 
    icon: Scale, 
    title: "Trustlessness & Transparency", 
    description: "Interactions are peer-to-peer, secured by open-source code and public, immutable blockchain ledgers.",
    color: "orange"
  },
  { 
    icon: Zap, 
    title: "Permissionless Access", 
    description: "Anyone with a wallet and internet can use services or build on the existing infrastructure without approval.",
    color: "purple"
  },
];

const defiPrimitives = [
  { 
    title: "Decentralized Exchanges (DEXs)", 
    detail: "Peer-to-peer trading using Automated Market Makers (AMMs) and liquidity pools (e.g., Uniswap, Curve).", 
    color: "text-indigo-600" 
  },
  { 
    title: "Lending & Borrowing", 
    detail: "Automated, overcollateralized loans managed by smart contracts (e.g., Aave, Compound).", 
    color: "text-teal-600" 
  },
  { 
    title: "Staking & Yield Farming", 
    detail: "Generating returns by locking assets to secure networks (Staking) or actively chaining protocols for optimized yield (Farming).", 
    color: "text-orange-600" 
  },
];

const investorImpact = [
  { 
    icon: HandCoins, 
    title: "Active Ownership", 
    detail: "Investors shift from passive consumers to co-owners, participating in governance via DAOs and earning yield for functional contributions (e.g., Liquidity Provision)." 
  },
  { 
    icon: ShieldAlert, 
    title: "Absolute Responsibility", 
    detail: "The shift to self-custody means the user is solely responsible for securing private keys; loss means permanent, irrecoverable asset loss." 
  },
  { 
    icon: TrendingUp, 
    title: "Expanded Universe", 
    detail: "Opportunities beyond holding tokens, including Digital Collectibles (NFTs) and fractional ownership of tokenized Real-World Assets (RWAs)." 
  },
];

export default function Web3RevolutionArticle() {
  const currentArticle = articles.find(article => article.slug === 'web3-revolution-defi-retail-investors');

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug || 'web3-revolution-defi-retail-investors'} 
          />
        </>
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Return to Home Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-24 left-8 z-20">
          <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
            Deep Research
          </div>
        </div>

        {/* Hero Section */}
        <header className="py-20 bg-white shadow-md relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 mb-4">
              The Web3 Revolution
            </h1>
            <p className="text-2xl md:text-3xl font-light text-gray-600">
              Deconstructing Decentralized Finance and the New Frontier for Retail Investors
            </p>
            <div className="mt-8 mx-auto h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full"></div>
          </div>
        </header>

        {/* Hero Infographic */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <img 
              src="https://i.imgur.com/YeKTkd4.jpeg" 
              alt="Web3 Revolution Infographic" 
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Executive Summary */}
          <section className="mb-20">
            <div className="p-8 md:p-10 bg-indigo-50 border border-indigo-200 rounded-xl shadow-lg">
              <h3 className="text-3xl font-bold text-indigo-700 mb-4 flex items-center">
                <span className="mr-3 p-2 bg-indigo-200 rounded-md">
                  <Globe className="w-6 h-6 text-indigo-700" />
                </span>
                Executive Summary: Read-Write-Own Internet
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Web3 is a fundamental paradigm shift towards a <strong>"Read-Write-Own"</strong> internet, built upon blockchain, smart contracts, and cryptography. Its core aim is to dismantle the centralized control of Web 2.0, returning digital sovereignty and data ownership to the individual user. The primary application of this is <strong>Decentralized Finance (DeFi)</strong>, a permissionless, transparent financial system operating without traditional intermediaries. For the retail investor, Web3 transforms them from passive consumers into active participants and co-owners of the market infrastructure, introducing both unprecedented opportunities and a complex, unforgiving risk landscape.
              </p>
            </div>
          </section>

          {/* Section 1: The Four Pillars of Web3 */}
          <section className="mb-20">
            <div className="text-center mb-10">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-teal-100 mb-4">
                <Zap className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
                Section 1: The Four Pillars of Web3
              </h2>
              <p className="text-xl font-medium text-gray-500 max-w-2xl mx-auto">
                The core principles that redefine how digital networks are structured, governed, and owned.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {web3Pillars.map((pillar, index) => (
                <div key={index} className="p-6 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className={`p-3 w-max rounded-lg mb-4 bg-${pillar.color}-100`}>
                    <pillar.icon className={`w-6 h-6 text-${pillar.color}-600`} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{pillar.title}</h4>
                  <p className="text-sm text-gray-500">{pillar.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Core Financial Primitives of DeFi */}
          <section className="mb-20">
            <div className="text-center mb-10">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 mb-4">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
                Section 2: Decentralized Finance (DeFi)
              </h2>
              <p className="text-xl font-medium text-gray-500 max-w-2xl mx-auto">
                Rebuilding the Financial System with 'Money Legos' - composable, automated protocols.
              </p>
            </div>

            <div className="space-y-6">
              {defiPrimitives.map((primitive, index) => (
                <div key={index} className="p-6 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row items-start md:items-center p-5 border-l-4 border-orange-400">
                  <div className="flex-shrink-0 w-full md:w-1/3">
                    <h4 className={`text-2xl font-extrabold ${primitive.color}`}>{primitive.title}</h4>
                  </div>
                  <div className="mt-3 md:mt-0 md:ml-6 w-full md:w-2/3">
                    <p className="text-lg text-gray-600">{primitive.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg font-semibold text-gray-700 p-4 bg-gray-100 rounded-lg shadow-inner">
                <span className="text-teal-600 font-bold">Impact:</span> DeFi offers enhanced financial inclusion, operates 24/7/365, and functions as a <strong>"glass box"</strong> (transparent) compared to TradFi's "black box" (opaque).
              </p>
            </div>
          </section>

          {/* Section 3: New Paradigm for the Retail Investor */}
          <section className="mb-20">
            <div className="text-center mb-10">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 mb-4">
                <HandCoins className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
                Section 3: A New Paradigm for the Retail Investor
              </h2>
              <p className="text-xl font-medium text-gray-500 max-w-2xl mx-auto">
                The shift from passive consumer to active participant, owner, and functional contributor.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {investorImpact.map((item, index) => (
                <div key={index} className="p-8 bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-8 border-indigo-400">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-indigo-500 rounded-full mr-4 shadow-md">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">{item.title}</h4>
                  </div>
                  <p className="text-base text-gray-500 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h4 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">
                Key Risks for Retail Investors
              </h4>
              <ul className="space-y-3 pl-4">
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <div>
                    <span className="text-base font-semibold text-gray-700">Market Risk:</span>
                    <span className="text-gray-600"> Extreme volatility driven by speculative sentiment and "whale" actions.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <div>
                    <span className="text-base font-semibold text-gray-700">Technical Risk:</span>
                    <span className="text-gray-600"> Smart contract exploits or "rug pulls" leading to total fund loss.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <div>
                    <span className="text-base font-semibold text-gray-700">User Security Risk:</span>
                    <span className="text-gray-600"> The absolute responsibility of self-custody; loss of keys means assets are irretrievably lost.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <div>
                    <span className="text-base font-semibold text-gray-700">Regulatory Risk:</span>
                    <span className="text-gray-600"> Unstable legal landscape that can decimate project viability.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 mt-1">•</span>
                  <div>
                    <span className="text-base font-semibold text-gray-700">Economic Risk:</span>
                    <span className="text-gray-600"> Impermanent Loss for Liquidity Providers (LPs) when asset prices diverge.</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Future Outlook */}
          <section className="mb-20">
            <div className="text-center mb-10">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 mb-4">
                <Scale className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-2">
                Future Trajectory: The CeDeFi Convergence
              </h2>
              <p className="text-xl font-medium text-gray-500 max-w-2xl mx-auto">
                The path to mainstream adoption is constrained by the Trilemma: Scalability, UX, and Regulatory Uncertainty.
              </p>
            </div>

            <div className="p-8 bg-purple-50 border border-purple-200 rounded-xl shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                The future is unlikely to be a wholesale replacement of Traditional Finance (TradFi) but rather a <strong>hybrid convergence</strong> into a <strong>CeDeFi</strong> (Centralized-Decentralized Finance) model. This seeks to combine the regulatory certainty and user-friendliness of centralized institutions with the transparency and efficiency of decentralized protocols. Success depends on overcoming critical barriers like the steep learning curve for new users, ongoing scalability issues on foundational networks, and establishing clear, consistent global regulatory frameworks. The enduring vision remains a more democratized, transparent, and user-owned financial future.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-indigo-50 to-teal-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <FileText className="inline mr-2" />
                  Read Full Research Paper
                </a>
              )}
            </div>
          </div>

          {/* Educational Disclaimer */}
          <div className="mt-16 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
            <p className="text-sm text-gray-700">
              <strong>Educational Disclaimer:</strong> This article is for educational and informational purposes only. It does not constitute financial, investment, or trading advice. Web3 and DeFi investments carry significant risks including total loss of capital. Always conduct your own research and consult with qualified financial professionals before making any investment decisions.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 mt-10 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
