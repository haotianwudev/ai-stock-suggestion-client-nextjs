'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, DollarSign, Zap, Shield } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function TeslaFundamentalDashboard() {
  const currentArticle = articles.find(article => article.slug === 'tesla-tsla-fundamental-dashboard-ai-binary-bet');
  const [selectedView, setSelectedView] = useState<'bull' | 'bear' | 'metrics'>('bull');

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <article className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>

          {/* Deep Research Badge */}
          <div className="absolute top-8 left-8 z-10">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-purple-600 text-white shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Deep Research
            </span>
          </div>

          {/* Title Section */}
          <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white p-8 rounded-2xl shadow-2xl mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Tesla (TSLA) Fundamental Dashboard
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              The AI Binary Bet: Quantitative Analysis & Future Outlook
            </p>
            <div className="flex items-center gap-4 text-sm text-blue-200">
              <span>Data as of Q3 2025</span>
              <span>•</span>
              <span>November 17, 2025</span>
            </div>
          </div>

          {/* Core Investment Thesis */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-blue-700" />
              <h2 className="text-3xl font-bold text-gray-900">Core Investment Thesis: The AI Binary Bet</h2>
            </div>
            
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                Tesla's current valuation is fundamentally disconnected from its core auto business, which faces severe margin compression and plateauing growth. The market is pricing TSLA as a high-risk, pre-revenue <strong>AI & Robotics</strong> conglomerate (Robotaxi, Optimus, FSD Licensing), not an auto manufacturer.
              </p>
              <p>
                This creates a binary, long-term bet with extreme upside and downside. The investment question is not "Can Tesla sell more cars?" but <strong>"Can Tesla achieve a monumental AI breakthrough (Level 5 autonomy) before its core auto profit engine is eroded by competitors?"</strong>
              </p>
              <p className="font-semibold text-blue-900">
                The recent CEO pay package approval solidifies this "moonshot" as the company's mandated strategy.
              </p>
            </div>
          </section>

          {/* Interactive View Selector */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setSelectedView('bull')}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                  selectedView === 'bull'
                    ? 'bg-green-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <TrendingUp className="inline mr-2" />
                Bull Case
              </button>
              <button
                onClick={() => setSelectedView('bear')}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                  selectedView === 'bear'
                    ? 'bg-red-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <TrendingDown className="inline mr-2" />
                Bear Case
              </button>
              <button
                onClick={() => setSelectedView('metrics')}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                  selectedView === 'metrics'
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <DollarSign className="inline mr-2" />
                Key Metrics
              </button>
            </div>
          </div>

          {/* Bull Case */}
          {selectedView === 'bull' && (
            <section className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 animate-fadeIn">
              <div className="p-6 border-b border-gray-200 bg-green-50">
                <h3 className="text-3xl font-bold text-green-800">The Bull Case: Strategic Moats</h3>
              </div>
              <div className="p-8">
                <ul className="space-y-6">
                  <li className="flex items-start space-x-4">
                    <Zap className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-xl mb-2">Unmatched Manufacturing & Vertical Integration</h4>
                      <p className="text-gray-700">
                        Giga Press (Megacasting) and the 4680 battery cells (&lt;$70/kWh) are profound moats, enabling lower costs, faster production, and higher energy density that competitors struggle to match. This integration is a key defense against Chinese rivals.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-xl mb-2">The AI Data Flywheel (FSD)</h4>
                      <p className="text-gray-700">
                        FSD v12's end-to-end neural net is the core IP. It is trained on real-world data from a fleet of 5M+ vehicles, an advantage no competitor (Waymo, Mobileye) can replicate. If successful, it unlocks the multi-trillion dollar Robotaxi market.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <Shield className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-xl mb-2">NACS Network (Utility Moat)</h4>
                      <p className="text-gray-700">
                        By opening its standard, Tesla's Supercharger network becomes a high-margin, utility-like profit center, charging competitors (Ford, GM, Rivian) for access, funded by US govt. subsidies.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <TrendingUp className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-xl mb-2">Energy Storage (Megapack)</h4>
                      <p className="text-gray-700">
                        A high-growth, high-margin business hidden in plain sight. Megapack deployments are supply-constrained, not demand-constrained, and are critical for grid stabilization. This division is growing faster than the auto business.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          )}

          {/* Bear Case */}
          {selectedView === 'bear' && (
            <section className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 animate-fadeIn">
              <div className="p-6 border-b border-gray-200 bg-red-50">
                <h3 className="text-3xl font-bold text-red-800">The Bear Case: Material Risks</h3>
              </div>
              <div className="p-8">
                <ul className="space-y-6">
                  <li className="flex items-start space-x-4">
                    <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-xl mb-2">Chinese EV Threat (Existential)</h4>
                      <p className="text-gray-700">
                        <strong>BYD has outsold Tesla</strong> in BEVs for 4 straight quarters. BYD is winning on cost (50% cheaper), volume (19.9% market share vs 7.5% for Tesla), and complete vertical integration (they make their own batteries). This is no longer a future threat; it is the current reality.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-xl mb-2">AI Execution Failure (Stalled)</h4>
                      <p className="text-gray-700 mb-2">
                        <strong>Robotaxi:</strong> Stalled by <em>regulation</em>, not tech. Tesla hasn't applied for the CA permit Waymo already uses. NHTSA investigations create massive liability.
                      </p>
                      <p className="text-gray-700">
                        <strong>Optimus:</strong> Stalled by <em>technical failure</em> (hands/arms) and <em>talent drain</em> (head of program resigned). Seen as a capital-intensive distraction from the core mission.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-xl mb-2">Governance & Key-Man Risk</h4>
                      <p className="text-gray-700">
                        Clear conflict of interest with xAI diverting focus, talent, and capital (Nvidia H100s). CEO's personal brand has led to documented consumer boycotts, directly hurting sales in key blue-state demographics.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          )}

          {/* Key Metrics */}
          {selectedView === 'metrics' && (
            <section className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 animate-fadeIn">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900">Key Fundamental Metrics (TTM)</h3>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Valuation Metrics */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Valuation Metrics</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Market Cap</span>
                      <span className="font-semibold text-gray-900">~$1.35T</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">P/E Ratio</span>
                      <span className="font-semibold text-red-700">~319.0x</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Forward P/E</span>
                      <span className="font-semibold text-red-700">~204.0x</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">EV/EBITDA</span>
                      <span className="font-semibold text-red-700">~142.0x</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Price/Sales (P/S)</span>
                      <span className="font-semibold text-red-700">~7.1x</span>
                    </div>
                  </div>

                  {/* Profitability Metrics */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Profitability Metrics</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Operating Margin</span>
                      <span className="font-semibold text-red-700">5.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Auto Gross Margin</span>
                      <span className="font-semibold text-red-700">~16.0%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Net Profit Margin</span>
                      <span className="font-semibold text-red-700">~2.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">ROIC</span>
                      <span className="font-semibold text-red-700">6.18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Free Cash Flow</span>
                      <span className="font-semibold text-red-700">-$1.2B</span>
                    </div>
                  </div>

                  {/* Financial Health */}
                  <div className="space-y-4 md:col-span-2">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Financial Health</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Cash & Equivalents</span>
                        <span className="font-semibold text-green-700">$41.6B</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Debt/Equity Ratio</span>
                        <span className="font-semibold text-green-700">0.10</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Valuation Context */}
                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-lg mb-3 text-blue-900">Valuation Context</h4>
                  <p className="text-gray-700 mb-3">
                    Metrics are detached from fundamentals. Its P/S ratio of 7.1x is <strong>10x higher than Toyota (0.7x)</strong> and <strong>8x higher than BYD (0.9x)</strong>. This is a tech multiple, not an auto multiple.
                  </p>
                  <p className="text-gray-700">
                    The Nov 2025 pay package approval is a shareholder mandate to pursue the high-risk AI/robotics thesis. It is tied to goals like <strong>$8.5T market cap</strong>, <strong>1M robotaxis</strong>, and <strong>1M Optimus robots</strong>.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Crypto Holdings Note */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Other Items: Crypto Holdings</h3>
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
              <div>
                <h4 className="font-bold text-lg mb-2">Bitcoin Holdings</h4>
                <p className="text-gray-700">
                  This is financially immaterial and a distraction. The ~$1.3B BTC holding represents only ~3% of cash. Tesla now excludes crypto gains/losses from non-GAAP metrics, signaling it is a non-core, speculative asset.
                </p>
              </div>
            </div>
          </section>


          {/* Deep Research Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6" id="section-deep-research">
              Deep Research: Academic Foundations & Market Analysis
            </h2>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded-r-lg shadow-sm">
              <h4 className="font-bold text-purple-800 text-xl mb-4 flex items-center">
                <svg className="w-6 h-6 mr-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Deep Research Paper: Tesla Fundamental Analysis
              </h4>
              <p className="text-lg text-purple-900 mb-4">
                Academic research findings and quantitative models that underpin Tesla's valuation disconnect, providing institutional-grade insights into the AI binary bet thesis.
              </p>
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  Read Full Research Document &rarr;
                </a>
              )}
            </div>

            {/* Valuation Framework */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">1. Valuation Framework: The Disconnect</h3>
              <p className="text-gray-700 mb-4">
                Tesla's valuation represents one of the most significant disconnects in modern equity markets. Traditional automotive valuation metrics suggest a fair value range of $150-250 per share based on:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                <li>Comparable P/E multiples to traditional automakers (Toyota: 8-10x, BYD: 15-20x)</li>
                <li>DCF models using conservative auto industry growth rates (2-5% CAGR)</li>
                <li>Sum-of-parts analysis valuing auto, energy, and services segments separately</li>
              </ul>
              <p className="text-gray-700">
                However, the market is pricing Tesla at <strong>$400+ per share</strong>, implying a massive premium for optionality on AI/robotics breakthroughs. This premium represents the market's belief in a <strong>10-100x addressable market expansion</strong> if Level 5 autonomy is achieved.
              </p>
            </div>

            {/* Competitive Dynamics */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">2. Competitive Dynamics: The Chinese Challenge</h3>
              <p className="text-gray-700 mb-4">
                The rise of Chinese EV manufacturers, particularly BYD, represents an existential threat to Tesla's core business:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <h4 className="font-bold text-lg mb-3">BYD vs Tesla Comparison (2025)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Global BEV Market Share</p>
                    <p className="text-xl font-bold text-gray-900">BYD: 19.9% | Tesla: 7.5%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Average Selling Price</p>
                    <p className="text-xl font-bold text-gray-900">BYD: ~$25K | Tesla: ~$50K</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vertical Integration</p>
                    <p className="text-xl font-bold text-gray-900">BYD: Batteries + Chips | Tesla: Batteries</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gross Margin Trend</p>
                    <p className="text-xl font-bold text-gray-900">BYD: Expanding | Tesla: Compressing</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                This competitive pressure explains Tesla's margin compression and the strategic imperative to pivot toward higher-margin AI/software businesses.
              </p>
            </div>

            {/* AI Execution Risk */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">3. AI Execution Risk: The Regulatory & Technical Barriers</h3>
              <p className="text-gray-700 mb-4">
                Tesla's AI moonshot faces two critical barriers:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-bold text-lg mb-2">Regulatory Barrier (Robotaxi)</h4>
                  <p className="text-gray-700">
                    Despite claims of technical readiness, Tesla has not applied for the California Autonomous Vehicle Deployment permit that Waymo has held since 2018. NHTSA investigations into FSD-related accidents create significant liability exposure. The regulatory path to commercial robotaxi deployment remains unclear and potentially multi-year.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-bold text-lg mb-2">Technical Barrier (Optimus)</h4>
                  <p className="text-gray-700">
                    The humanoid robot program faces fundamental challenges in dexterous manipulation (hands/arms) that have plagued robotics for decades. The resignation of the program's head and lack of commercial deployment timeline suggest this remains a research project rather than a near-term revenue driver.
                  </p>
                </div>
              </div>
            </div>

            {/* Strategic Moats Analysis */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">4. Strategic Moats: The Defensibility Question</h3>
              <p className="text-gray-700 mb-4">
                Tesla's competitive advantages are real but increasingly contested:
              </p>
              <div className="bg-green-50 p-6 rounded-lg mb-4">
                <h4 className="font-bold text-lg mb-3 text-green-800">Durable Moats</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>FSD Data Flywheel:</strong> 5M+ vehicles generating real-world training data is unmatched</li>
                  <li><strong>Manufacturing Innovation:</strong> Giga Press and 4680 cells provide 15-20% cost advantage</li>
                  <li><strong>Supercharger Network:</strong> NACS standardization creates utility-like recurring revenue</li>
                  <li><strong>Energy Storage:</strong> Megapack business growing 50%+ YoY with high margins</li>
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-3 text-red-800">Eroding Moats</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Brand Premium:</strong> Consumer boycotts in key demographics impacting demand</li>
                  <li><strong>Technology Lead:</strong> Chinese competitors matching or exceeding on battery tech</li>
                  <li><strong>First-Mover Advantage:</strong> Waymo ahead on regulatory approvals for autonomy</li>
                </ul>
              </div>
            </div>

            {/* Investment Framework */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">5. Investment Framework: Scenario Analysis</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 border-b">Scenario</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 border-b">Probability</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 border-b">Price Target</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 border-b">Key Drivers</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-semibold text-green-700">Bull Case</td>
                      <td className="px-6 py-4">15%</td>
                      <td className="px-6 py-4 font-bold">$800-1,200</td>
                      <td className="px-6 py-4 text-sm">Level 5 autonomy achieved, robotaxi deployed at scale, Optimus commercialized</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-semibold text-blue-700">Base Case</td>
                      <td className="px-6 py-4">50%</td>
                      <td className="px-6 py-4 font-bold">$250-400</td>
                      <td className="px-6 py-4 text-sm">Steady auto business, FSD licensing revenue, energy growth continues</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-semibold text-red-700">Bear Case</td>
                      <td className="px-6 py-4">35%</td>
                      <td className="px-6 py-4 font-bold">$100-200</td>
                      <td className="px-6 py-4 text-sm">Chinese competition intensifies, AI projects stall, margin compression accelerates</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 mt-4">
                <strong>Expected Value:</strong> $300-350 per share, suggesting current prices (~$400) embed significant optimism about AI execution.
              </p>
            </div>

            {/* Research Disclaimer */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 text-lg mb-3">Research Disclaimer</h4>
              <p className="text-yellow-900">
                The academic research and quantitative analysis presented here is for educational purposes and represents ongoing areas of study. Market conditions, competitive dynamics, and technological capabilities continue to evolve rapidly in the EV and AI sectors, potentially affecting the applicability of current analysis. This is not investment advice.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <svg className="inline mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Read Full Research
                </a>
              )}
              <Link 
                href="/"
                className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                Explore More Articles
              </Link>
            </div>
          </div>

          {/* Educational Disclaimer */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
            <h4 className="font-bold text-red-800 text-lg mb-3">Investment Disclaimer</h4>
            <p className="text-red-900">
              This analysis is for educational and informational purposes only and should not be construed as investment advice. Tesla (TSLA) is a highly volatile security with significant risks. The "binary bet" thesis presented here represents extreme scenarios with uncertain probabilities. Always conduct your own due diligence and consult with a qualified financial advisor before making investment decisions. Past performance does not guarantee future results.
            </p>
          </div>

          {/* Footer */}
          <footer className="text-center text-gray-600 text-sm mt-12 pt-8 border-t border-gray-200">
            <p>© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
            <p className="mt-2">Data as of Q3 2025. TTM = Trailing Twelve Months.</p>
          </footer>
        </article>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}
