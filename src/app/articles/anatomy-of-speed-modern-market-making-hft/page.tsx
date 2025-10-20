'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, Server, Zap, Scale, ShieldCheck, TrendingUp, AlertTriangle, SlidersHorizontal, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Interactive Components
const InteractiveSpreadCalculator = () => {
  const [params, setParams] = useState({
    midPrice: 100,
    inventory: 0,
    riskAversion: 0.1,
    volatility: 0.2,
    timeToExpiry: 1,
    orderFlow: 0.5
  });

  const calculateSpread = () => {
    const { midPrice, inventory, riskAversion, volatility, timeToExpiry, orderFlow } = params;
    const reservationPrice = midPrice - inventory * riskAversion * Math.pow(volatility, 2) * timeToExpiry;
    const inventoryRisk = riskAversion * Math.pow(volatility, 2) * timeToExpiry;
    const adverseSelection = (2 / riskAversion) * Math.log(1 + riskAversion / orderFlow);
    const totalSpread = inventoryRisk + adverseSelection;
    
    return {
      reservationPrice: reservationPrice.toFixed(4),
      bidPrice: (reservationPrice - totalSpread / 2).toFixed(4),
      askPrice: (reservationPrice + totalSpread / 2).toFixed(4),
      totalSpread: totalSpread.toFixed(4)
    };
  };

  const results = calculateSpread();

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h4 className="text-xl font-bold text-blue-700 mb-4">Interactive Avellaneda-Stoikov Calculator</h4>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mid Price ($)</label>
            <input
              type="number"
              value={params.midPrice}
              onChange={(e) => setParams({...params, midPrice: parseFloat(e.target.value) || 0})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Inventory Position</label>
            <input
              type="number"
              value={params.inventory}
              onChange={(e) => setParams({...params, inventory: parseFloat(e.target.value) || 0})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Risk Aversion (γ)</label>
            <input
              type="number"
              step="0.01"
              value={params.riskAversion}
              onChange={(e) => setParams({...params, riskAversion: parseFloat(e.target.value) || 0})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Volatility (σ)</label>
            <input
              type="number"
              step="0.01"
              value={params.volatility}
              onChange={(e) => setParams({...params, volatility: parseFloat(e.target.value) || 0})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time to Expiry</label>
            <input
              type="number"
              step="0.1"
              value={params.timeToExpiry}
              onChange={(e) => setParams({...params, timeToExpiry: parseFloat(e.target.value) || 0})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Flow (κ)</label>
            <input
              type="number"
              step="0.1"
              value={params.orderFlow}
              onChange={(e) => setParams({...params, orderFlow: parseFloat(e.target.value) || 0})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h5 className="font-semibold text-blue-800 mb-2">Calculated Results:</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Reservation Price:</span>
            <div className="font-bold text-blue-700">${results.reservationPrice}</div>
          </div>
          <div>
            <span className="text-gray-600">Bid Price:</span>
            <div className="font-bold text-green-700">${results.bidPrice}</div>
          </div>
          <div>
            <span className="text-gray-600">Ask Price:</span>
            <div className="font-bold text-red-700">${results.askPrice}</div>
          </div>
          <div>
            <span className="text-gray-600">Total Spread:</span>
            <div className="font-bold text-purple-700">${results.totalSpread}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LatencyVisualization = () => {
  const latencyData = [
    { component: "Co-located Servers", latency: "10-50", unit: "μs", color: "bg-green-500" },
    { component: "FPGAs/ASICs", latency: "100-500", unit: "ns", color: "bg-blue-500" },
    { component: "Microwave/Laser", latency: "4-8", unit: "ms", color: "bg-purple-500" },
    { component: "Kernel Bypass", latency: "1-5", unit: "μs", color: "bg-orange-500" }
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h4 className="text-xl font-bold text-gray-800 mb-4">Latency Comparison: The Speed Hierarchy</h4>
      <div className="space-y-4">
        {latencyData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded ${item.color}`}></div>
              <span className="font-medium text-gray-800">{item.component}</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900">{item.latency}</span>
              <span className="text-sm text-gray-600 ml-1">{item.unit}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <strong>Note:</strong> μs = microseconds, ns = nanoseconds, ms = milliseconds
      </div>
    </div>
  );
};

export default function AnatomyOfSpeedArticle() {
  const currentArticle = articles.find(article => article.slug === 'anatomy-of-speed-modern-market-making-hft');

  const hftInfraData = [
    ["Hardware", "Co-located Servers", "Reduces network latency to microseconds by placing systems in the same data center as the exchange."],
    ["Hardware", "FPGAs / ASICs", "Programmable hardware for ultra-low latency data processing and order execution, reducing latency to nanoseconds."],
    ["Network", "Microwave / Laser", "Provides the lowest possible point-to-point network latency for transmitting data between exchanges."],
    ["Software", "Kernel Bypassing", "Allows applications to interact directly with network hardware, avoiding OS overhead for faster I/O operations."]
  ];

  const asModelParams = [
    ["Mid-Price (s)", "The current best estimate of the asset's fair value. This provides the baseline for all quoting activity."],
    ["Inventory (q)", "The market maker's current holding. Drives the inventory skew; a large positive inventory lowers the reservation price to attract sellers."],
    ["Risk Aversion (γ)", "A user-defined parameter for risk tolerance. A higher gamma increases the penalty for holding inventory, widening the spread."],
    ["Volatility (σ²)", "Measure of the asset's price fluctuation. Higher volatility increases both the inventory skew and the base spread to compensate for risk."],
    ["Order Flow (κ)", "Represents the arrival rate of market orders. A denser, more active book forces a tighter spread to remain competitive."]
  ];

  const mlApplicationsData = [
    ["Micro-price Prediction", "LSTMs, Transformers, Gradient Boosting", "Forecast the next price movement to gain an informational edge and avoid adverse selection."],
    ["Volatility Forecasting", "GARCH, RNNs", "Predict short-term volatility to dynamically adjust spread width and manage risk in real-time."],
    ["Order Flow Analysis", "CNNs on LOB snapshots, Unsupervised Clustering", "Identify hidden liquidity, detect institutional orders, and predict market impact."],
    ["Optimal Execution", "Reinforcement Learning (e.g., Q-Learning)", "Train an agent to learn the best way to place or execute large orders to minimize slippage."]
  ];

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

      <div className="min-h-screen bg-gray-50">
        {/* Header with Return Button */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="relative">
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Deep Research
            </span>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Podcast
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16 pb-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              The Anatomy of Speed: Modern Market Making in High-Frequency Trading
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              An analytical report on strategies, models, and alpha generation in high-frequency trading environments where microseconds determine profitability.
            </p>
            <div className="text-sm text-gray-500">
              Published on {currentArticle?.date} | Deep Research Analysis
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
          
          {/* Section 1: Principles of Market Making */}
          <section>
            <div className="text-center mb-12">
              <span className="text-sm font-bold text-blue-600 bg-blue-100 rounded-full px-3 py-1 mb-2 inline-block">SECTION 1</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Principles of Market Making</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-md mr-4 text-blue-600">
                    <Scale className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">The Economic Function</h3>
                </div>
                <p className="text-gray-600">
                  Market makers are designated liquidity providers who stand ready to both buy and sell a particular security on a continuous basis, ensuring a fair and orderly market.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-md mr-4 text-blue-600">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Profit from the Spread</h3>
                </div>
                <p className="text-gray-600">
                  The primary profit is the bid-ask spread. By buying at the lower bid price and selling at the higher ask price, market makers are compensated for taking on risk.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-md mr-4 text-blue-600">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">The Electronic Revolution</h3>
                </div>
                <p className="text-gray-600">
                  The shift from physical trading floors to electronic order books, catalyzed by regulations like Reg NMS, fragmented liquidity but also created the high-speed environment where EMMs thrive.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-md mr-4 text-blue-600">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Core Risks</h3>
                </div>
                <p className="text-gray-600">
                  Market makers face two primary risks: <strong>Inventory Risk</strong> (holding a position that devalues) and <strong>Adverse Selection</strong> (unknowingly trading with an informed party who anticipates a price move).
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: HFT Ecosystem */}
          <section>
            <div className="text-center mb-12">
              <span className="text-sm font-bold text-blue-600 bg-blue-100 rounded-full px-3 py-1 mb-2 inline-block">SECTION 2</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">The High-Frequency Trading Ecosystem</h2>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
              <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
                High-Frequency Trading (HFT) is a type of algorithmic trading characterized by high speeds, high turnover rates, and high order-to-trade ratios. Electronic Market Makers (EMMs) are a subset of HFT firms whose primary strategy is providing liquidity. The entire ecosystem is built on the foundation of minimizing latency—the time delay in data transmission and processing.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">The Latency Arms Race: Infrastructure Stack</h3>
            
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 mb-8">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-blue-800 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-xs font-semibold text-blue-800 uppercase tracking-wider">Component</th>
                    <th className="px-6 py-3 text-xs font-semibold text-blue-800 uppercase tracking-wider">Function & Impact on Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {hftInfraData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-700 text-sm font-medium">{row[0]}</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">{row[1]}</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <LatencyVisualization />
          </section>

          {/* Section 3: Quantitative Models */}
          <section>
            <div className="text-center mb-12">
              <span className="text-sm font-bold text-blue-600 bg-blue-100 rounded-full px-3 py-1 mb-2 inline-block">SECTION 3</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Quantitative Models for Optimal Quoting</h2>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">The Avellaneda-Stoikov Model</h3>
              <p className="text-gray-600">
                A foundational model in modern market making, it provides a mathematical framework for determining the optimal bid and ask quotes by balancing the need to earn the spread against the risks of holding inventory. It introduces the concepts of a "reservation price" (the firm's true valuation) and an optimal spread around it.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-blue-700 mb-4">Reservation Price (r)</h4>
                <div className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
                  <code className="text-indigo-700 text-sm">
                    r(s, q, t) = s - q · γ · σ² · (T - t)
                  </code>
                </div>
                <p className="text-gray-600 text-sm">
                  This is the firm's internal, "fair" price. It skews away from the public mid-price (s) to manage inventory. If inventory (q) is high, 'r' is lowered to attract sellers and discourage buyers, and vice-versa.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-blue-700 mb-4">Optimal Spread (δª + δᵇ)</h4>
                <div className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
                  <code className="text-indigo-700 text-sm">
                    = γ·σ²·(T-t) + (2/γ)·ln(1 + γ/κ)
                  </code>
                </div>
                <p className="text-gray-600 text-sm">
                  This determines the total width of the spread around 'r'. The first term accounts for inventory risk (widening with volatility), while the second term accounts for adverse selection (narrowing in liquid markets).
                </p>
              </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 mb-8">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-blue-800 uppercase tracking-wider">Parameter</th>
                    <th className="px-6 py-3 text-xs font-semibold text-blue-800 uppercase tracking-wider">Description & Intuition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {asModelParams.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-700 text-sm font-medium">{row[0]}</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <InteractiveSpreadCalculator />
          </section>

          {/* Section 4: Risk Control */}
          <section>
            <div className="text-center mb-12">
              <span className="text-sm font-bold text-blue-600 bg-blue-100 rounded-full px-3 py-1 mb-2 inline-block">SECTION 4</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Advanced Inventory & Risk Control</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-md mr-4 text-blue-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Quote & Inventory Control</h3>
                </div>
                <p className="text-gray-600">
                  Effective risk management relies on dynamically adjusting quotes. Key techniques include <strong>Quote Skewing</strong> (asymmetrically shifting the spread based on inventory), <strong>Quote Sizing</strong> (offering more size on the side you want to trade), and setting hard <strong>Max Position Limits</strong>.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-md mr-4 text-blue-600">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Handling Adverse Selection</h3>
                </div>
                <p className="text-gray-600">
                  The core risk: trading with someone who knows more. This is mitigated by widening spreads during high volatility, reducing size, and using predictive models to forecast price moves before they happen. If a trend is detected, the strategy may switch from passive quoting to active inventory liquidation.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Machine Learning & Alpha */}
          <section>
            <div className="text-center mb-12">
              <span className="text-sm font-bold text-blue-600 bg-blue-100 rounded-full px-3 py-1 mb-2 inline-block">SECTION 5</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Machine Learning & The Pursuit of Alpha</h2>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">How Machine Learning is Applied</h3>
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 mb-12">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-blue-800 uppercase tracking-wider">Application</th>
                    <th className="px-6 py-3 text-xs font-semibold text-blue-800 uppercase tracking-wider">Technique</th>
                    <th className="px-6 py-3 text-xs font-semibold text-blue-800 uppercase tracking-wider">Objective</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mlApplicationsData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-700 text-sm font-medium">{row[0]}</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">{row[1]}</td>
                      <td className="px-6 py-4 text-gray-700 text-sm">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">How to Generate Alpha (α)</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-md mr-4 text-blue-600">
                    <SlidersHorizontal className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Feature Engineering</h4>
                </div>
                <p className="text-gray-600">
                  Alpha starts with data. Features are engineered from raw limit order book (LOB) data, such as order book imbalance, trade intensity, and volatility clusters, to feed predictive models.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-md mr-4 text-blue-600">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Market Microstructure Alpha</h4>
                </div>
                <p className="text-gray-600">
                  This alpha is generated not from predicting the fundamental value, but from exploiting the mechanics of the market itself—like queue position dynamics, rebate arbitrage, and detecting "iceberg" orders.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-md mr-4 text-blue-600">
                    <Scale className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Statistical Arbitrage</h4>
                </div>
                <p className="text-gray-600">
                  A classic alpha strategy. ML models identify pairs or baskets of securities that are historically cointegrated. The strategy trades on temporary divergences, betting on their statistical "reversion to the mean."
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Conclusion */}
          <section>
            <div className="text-center mb-12">
              <span className="text-sm font-bold text-blue-600 bg-blue-100 rounded-full px-3 py-1 mb-2 inline-block">SECTION 6</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Synthesis & Future Trajectories</h2>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200">
              <p className="text-lg text-gray-700 text-center">
                Modern market making is a hyper-competitive synthesis of quantitative finance, high-performance computing, and machine learning. The "alpha" frontier is constantly shifting towards more sophisticated predictive models and the direct application of AI, like reinforcement learning, into the trading logic. While technology perpetually advances, the fundamental economic function—providing liquidity to the market—endures as the core principle.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-12">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Explore Further</h3>
              <p className="text-gray-600 mb-6">
                Dive deeper into the quantitative models and implementation details in our comprehensive research document and podcast discussion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {currentArticle?.googleDoc && (
                  <a 
                    href={currentArticle.googleDoc}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    Read Full Research
                  </a>
                )}
                {currentArticle?.podcastUrl && (
                  <a 
                    href={currentArticle.podcastUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    <Music className="inline mr-2" />
                    Listen to Podcast
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* Risk Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Educational Disclaimer</h4>
                <p className="text-yellow-700 text-sm">
                  This analysis is for educational purposes only and does not constitute investment advice. High-frequency trading and market making involve substantial risks and require significant capital, technology infrastructure, and regulatory compliance. Past performance does not guarantee future results.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-4xl mx-auto px-6 py-8 text-center text-gray-500">
            <p>&copy; 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
