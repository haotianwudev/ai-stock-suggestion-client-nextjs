'use client';

import { Globe, Zap, Lock, Scale, DollarSign, TrendingUp, HandCoins, ShieldAlert } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

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
  return (
    <ArticleFrame
      slug="web3-revolution-defi-retail-investors"
      additionalDisclaimer="Web3 and DeFi investments carry significant risks including total loss of capital, smart contract exploits, and regulatory uncertainty."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800">
        <InfographicSlot alt="Web3 Revolution Infographic" />

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
              Web3 is a fundamental paradigm shift towards a <strong>&ldquo;Read-Write-Own&rdquo;</strong> internet, built upon blockchain, smart contracts, and cryptography. Its core aim is to dismantle the centralized control of Web 2.0, returning digital sovereignty and data ownership to the individual user. The primary application of this is <strong>Decentralized Finance (DeFi)</strong>, a permissionless, transparent financial system operating without traditional intermediaries. For the retail investor, Web3 transforms them from passive consumers into active participants and co-owners of the market infrastructure, introducing both unprecedented opportunities and a complex, unforgiving risk landscape.
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
              Rebuilding the Financial System with &lsquo;Money Legos&rsquo; - composable, automated protocols.
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
              <span className="text-teal-600 font-bold">Impact:</span> DeFi offers enhanced financial inclusion, operates 24/7/365, and functions as a <strong>&ldquo;glass box&rdquo;</strong> (transparent) compared to TradFi&apos;s &ldquo;black box&rdquo; (opaque).
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
                  <span className="text-gray-600"> Extreme volatility driven by speculative sentiment and &ldquo;whale&rdquo; actions.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-3 mt-1">•</span>
                <div>
                  <span className="text-base font-semibold text-gray-700">Technical Risk:</span>
                  <span className="text-gray-600"> Smart contract exploits or &ldquo;rug pulls&rdquo; leading to total fund loss.</span>
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
      </div>
    </ArticleFrame>
  );
}
