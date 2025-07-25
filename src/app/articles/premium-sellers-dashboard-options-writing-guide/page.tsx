'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronsRight, HelpCircle, TrendingUp, TrendingDown, Clock, Activity, Target, CheckCircle, BarChart2, PieChart as PieChartIcon, AlertTriangle } from 'lucide-react';

// --- MOCK DATA ---
const volumeOiData = [
  { name: 'Strike 90', volume: 4500, openInterest: 12000 },
  { name: 'Strike 95', volume: 7800, openInterest: 18500 },
  { name: 'Strike 100', volume: 11200, openInterest: 25000 },
  { name: 'Strike 105', volume: 8300, openInterest: 19000 },
  { name: 'Strike 110', volume: 5100, openInterest: 14000 },
];

const pcRatioData = [
  { name: 'Day 1', ratio: 0.85 }, { name: 'Day 2', ratio: 0.95 },
  { name: 'Day 3', ratio: 1.10 }, { name: 'Day 4', ratio: 1.25 },
  { name: 'Day 5', ratio: 1.05 }, { name: 'Day 6', ratio: 0.90 },
  { name: 'Day 7', ratio: 0.75 },
];

const ivHvData = [
  { name: '60d ago', IV: 35, HV: 32 }, { name: '45d ago', IV: 38, HV: 33 },
  { name: '30d ago', IV: 45, HV: 35 }, { name: '15d ago', IV: 42, HV: 38 },
  { name: 'Today', IV: 55, HV: 40 },
];

const ivRankData = [{ name: 'IV Rank', value: 78 }];
const ivpData = [{ name: 'IV Percentile', value: 85 }];
const COLORS = ['#2563EB', '#F97316'];

const skewData = [
  { strike: 80, iv: 65 }, { strike: 85, iv: 58 }, { strike: 90, iv: 52 },
  { strike: 95, iv: 48 }, { strike: 100, iv: 45 }, { strike: 105, iv: 46 },
  { strike: 110, iv: 48 },
];

const plData = [
  { price: 85, profit: -500 }, { price: 90, profit: 0 }, { price: 95, profit: 250 },
  { price: 100, profit: 250 }, { price: 105, profit: 250 },
];

// --- UI COMPONENTS ---
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border border-gray-200 rounded-2xl shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ComponentType<any> }) => (
  <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
    {Icon && <Icon className="mr-3 h-6 w-6 text-blue-500" />}
    {children}
  </h3>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <Card className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="pt-4 border-t border-gray-200 text-gray-700 space-y-4">
        {children}
      </div>
    </Card>
  );
};

const TextBlock = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base leading-relaxed">{children}</p>
);

// --- PAGE SECTIONS ---
const FoundationsSection = () => (
  <Section title="Part I: Foundations of Premium Selling">
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <CardTitle icon={Clock}>The Seller's Paradigm</CardTitle>
        <TextBlock>
          The transition from an options buyer to a writer is a shift from speculative prediction to systematically harvesting statistical edges. A premium seller acts like an insurance underwriter, focusing on probabilities, time decay (theta), and the volatility risk premium (VRP) rather than just market direction.
        </TextBlock>
      </div>
      <div>
        <CardTitle icon={TrendingUp}>The Core Thesis: Monetizing Time & Volatility</CardTitle>
        <TextBlock>
          The seller's advantage is built on two persistent market phenomena: the decay of an option's time value (theta) and the tendency for implied volatility (IV) to be higher than subsequent realized volatility (HV). The goal is to profit from both the passage of time and the "volatility crush" as IV reverts to its mean.
        </TextBlock>
      </div>
      <div>
        <CardTitle icon={AlertTriangle}>Asymmetrical Risk Profile</CardTitle>
        <TextBlock>
          A seller accepts an obligation for a limited premium. This necessitates rigorous risk management. Maximum profit is capped at the premium received, while maximum loss can be substantial (for puts) or theoretically unlimited (for calls). This structure demands a focus on probability of profit and risk control.
        </TextBlock>
      </div>
      <div>
        <CardTitle icon={ChevronsRight}>Core Selling Strategies</CardTitle>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong className="font-semibold text-blue-700">Cash-Secured Puts (CSP):</strong> A bullish strategy to generate income or acquire stock at a discount. Involves selling a put while holding cash to buy the shares if assigned.</li>
          <li><strong className="font-semibold text-blue-700">Covered Calls:</strong> A neutral to bullish strategy for income on existing stock. Involves selling a call against 100 shares you own, capping upside for premium income.</li>
          <li><strong className="font-semibold text-blue-700">Naked Options & Spreads:</strong> High-risk strategies for experienced traders. Spreads, like Iron Condors, define risk and are used to bet on volatility or a price range.</li>
        </ul>
      </div>
    </div>
  </Section>
);

const MarketLandscapeSection = () => (
  <Section title="Part II: Gauging the Market Landscape">
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <CardTitle icon={BarChart2}>Volume and Open Interest (OI)</CardTitle>
        <TextBlock>
          These are the vital signs of an option's liquidity. High volume (daily trades) and high open interest (active contracts) lead to tighter bid-ask spreads, reducing transaction costs and ensuring you can enter and exit trades efficiently. Illiquid options can be impossible to manage effectively.
        </TextBlock>
        <ResponsiveContainer width="100%" height={250} className="mt-4">
          <BarChart data={volumeOiData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis dataKey="name" stroke="#4b5563" />
            <YAxis stroke="#4b5563" />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }} />
            <Legend />
            <Bar dataKey="volume" fill="#3B82F6" name="Volume" />
            <Bar dataKey="openInterest" fill="#8B5CF6" name="Open Interest" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <CardTitle icon={PieChartIcon}>Put/Call (P/C) Ratio</CardTitle>
        <TextBlock>
          The P/C Ratio is a powerful contrarian barometer for market sentiment. Extreme readings often signal that a market reversal is probable as sentiment has become too one-sided.
        </TextBlock>
        <ul className="text-gray-700 space-y-2 my-4">
          <li><strong className="font-semibold text-red-600">High P/C Ratio (&gt;1.0):</strong> Signals widespread fear. A contrarian opportunity to <strong className="font-semibold">sell puts</strong>, capitalizing on high premiums.</li>
          <li><strong className="font-semibold text-green-600">Low P/C Ratio (&lt;0.7):</strong> Signals widespread greed. A contrarian opportunity to <strong className="font-semibold">sell calls</strong>, betting against complacency.</li>
        </ul>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={pcRatioData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis dataKey="name" stroke="#4b5563" />
            <YAxis domain={[0.6, 1.4]} stroke="#4b5563" />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }} />
            <Legend />
            <Line type="monotone" dataKey="ratio" stroke="#EC4899" strokeWidth={2} name="P/C Ratio" />
            <Line type="monotone" dataKey={() => 1.0} stroke="#6b7280" strokeDasharray="5 5" name="Fear/Greed Line" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </Section>
);

const VolatilityLensSection = () => (
  <Section title="Part III: The Volatility Lens">
    <div className="space-y-8">
      <div>
        <CardTitle icon={Activity}>Implied vs. Historical Volatility (IV vs. HV)</CardTitle>
        <TextBlock>
          This is the core of the seller's edge. The goal is to sell options when Implied Volatility (IV), the market's forecast, is significantly higher than Historical Volatility (HV), the actual past movement. This discrepancy is the Volatility Risk Premium (VRP), which means you are effectively "selling overpriced insurance."
        </TextBlock>
        <ResponsiveContainer width="100%" height={250} className="mt-4">
          <LineChart data={ivHvData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis dataKey="name" stroke="#4b5563" />
            <YAxis domain={[20, 60]} stroke="#4b5563" />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }} />
            <Legend />
            <Line type="monotone" dataKey="IV" stroke="#8B5CF6" strokeWidth={2} name="Implied Volatility" />
            <Line type="monotone" dataKey="HV" stroke="#F59E0B" strokeWidth={2} name="Historical Volatility" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <CardTitle icon={Target}>IV Rank & IV Percentile</CardTitle>
          <TextBlock>
            These metrics standardize volatility by comparing the current IV to its historical range (typically 1 year). They answer the crucial question: "Is volatility high *for this specific stock*?" A high IVR/IVP suggests volatility is likely to revert to its mean (fall), which benefits a seller.
          </TextBlock>
          <div className="flex gap-4 mt-4">
            <ResponsiveContainer width="50%" height={150}>
              <PieChart>
                <Pie 
                  data={ivRankData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={40} 
                  outerRadius={60} 
                  fill="#8884d8" 
                  labelLine={false} 
                  startAngle={90} 
                  endAngle={-270}
                >
                  <Cell fill={COLORS[0]} />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }} />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-900 text-2xl font-bold">
                  {ivRankData[0].value}%
                </text>
                <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-500 text-sm">
                  IV Rank
                </text>
              </PieChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="50%" height={150}>
              <PieChart>
                <Pie 
                  data={ivpData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={40} 
                  outerRadius={60} 
                  fill="#82ca9d" 
                  labelLine={false} 
                  startAngle={90} 
                  endAngle={-270}
                >
                  <Cell fill={COLORS[1]} />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }} />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-900 text-2xl font-bold">
                  {ivpData[0].value}%
                </text>
                <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-500 text-sm">
                  IV Percentile
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-lg font-semibold text-green-700 mt-4">
            Action: Sell premium when IVR/IVP &gt; 50-70
          </p>
        </div>
        <div>
          <CardTitle icon={HelpCircle}>Volatility Skew & Term Structure</CardTitle>
          <TextBlock>
            Skew (the "smirk") shows how IV varies across strike prices. In equities, out-of-the-money puts typically have higher IV due to crash fears, making them rich to sell. Term structure shows IV across expirations; it often spikes before known events like earnings, offering a "volatility crush" opportunity.
          </TextBlock>
          <ResponsiveContainer width="100%" height={200} className="mt-4">
            <LineChart data={skewData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis 
                dataKey="strike" 
                type="number" 
                domain={['dataMin - 5', 'dataMax + 5']} 
                stroke="#4b5563" 
                label={{ value: 'Strike Price', position: 'insideBottom', offset: -5, fill: '#4b5563' }}
              />
              <YAxis 
                domain={[40, 70]} 
                stroke="#4b5563" 
                label={{ value: 'IV %', angle: -90, position: 'insideLeft', fill: '#4b5563' }}
              />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }} />
              <Line type="monotone" dataKey="iv" stroke="#3B82F6" strokeWidth={2} name="Volatility Skew" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </Section>
);

const GreeksSection = () => {
  const greeks = [
    { 
      name: 'Theta (Θ)', 
      role: 'Time Decay', 
      perspective: 'Your primary ally. Short options have positive Theta, meaning your position gains value as time passes. This is your main profit engine.', 
      color: 'text-green-700' 
    },
    { 
      name: 'Delta (Δ)', 
      role: 'Directional Risk', 
      perspective: 'A positioning tool. Delta approximates the probability of an option expiring in-the-money. Sellers use (1 - Delta) to estimate the probability of profit.', 
      color: 'text-blue-700' 
    },
    { 
      name: 'Gamma (Γ)', 
      role: 'Acceleration Risk', 
      perspective: 'Your primary adversary. Short options have negative Gamma, which accelerates losses if the stock moves sharply against you. It is the main source of dynamic risk.', 
      color: 'text-red-700' 
    },
    { 
      name: 'Vega (ν)', 
      role: 'Volatility Risk', 
      perspective: 'An ally when IV is high. Short options have negative Vega, so you profit when implied volatility falls ("volatility crush").', 
      color: 'text-purple-700' 
    },
  ];

  return (
    <Section title="Part IV: Mastering the Greeks">
      <TextBlock>
        The Greeks are your risk management dashboard, quantifying how your position's value changes in real-time. Understanding them is crucial for managing risk, not just predicting direction.
      </TextBlock>
      <div className="space-y-4 mt-4">
        {greeks.map(greek => (
          <div key={greek.name} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className={`text-lg font-bold ${greek.color}`}>
              {greek.name} - {greek.role}
            </h4>
            <p className="text-gray-600">
              <strong className="font-semibold">Seller's Perspective:</strong> {greek.perspective}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const ExecutionSection = () => (
  <Section title="Part V: Synthesis & Execution Framework">
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <CardTitle icon={CheckCircle}>The Seller's Checklist</CardTitle>
        <TextBlock>
          A disciplined, repeatable process is key. This framework filters the universe of options down to a single, high-probability, and risk-managed trade.
        </TextBlock>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mt-4">
          <li>Establish a market outlook (Bullish, Bearish, Neutral).</li>
          <li><strong className="font-semibold text-green-700">Conduct Volatility Check (IVR &gt; 50).</strong> This is a critical gate.</li>
          <li>Apply Liquidity Filter (High OI & Volume, tight spreads).</li>
          <li>Select the optimal strategy for the outlook and IV environment.</li>
          <li>Select strikes using Delta (for probability) and Expected Move (for range).</li>
          <li>Determine position size based on max potential loss (e.g., 1-2% of portfolio).</li>
          <li>Execute with Limit Orders at the midpoint to ensure a fair price.</li>
          <li>Define a management plan (e.g., take profit at 50% of max gain).</li>
        </ol>
      </div>
      <div>
        <CardTitle icon={BarChart2}>P/L Diagrams & Expected Move</CardTitle>
        <TextBlock>
          Visualize your trade's anatomy before entering. The P/L diagram shows max profit, max loss, and breakeven points. The Expected Move (EM) uses option prices to define the market-implied trading range for a given period, helping you place strikes outside the zone of probable movement.
        </TextBlock>
        <ResponsiveContainer width="100%" height={200} className="mt-4">
          <LineChart data={plData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis 
              dataKey="price" 
              type="number" 
              domain={['dataMin - 5', 'dataMax + 5']} 
              stroke="#4b5563" 
              label={{ value: 'Stock Price at Expiration', position: 'insideBottom', offset: -5, fill: '#4b5563' }}
            />
            <YAxis 
              stroke="#4b5563" 
              label={{ value: 'Profit/Loss', angle: -90, position: 'insideLeft', fill: '#4b5563' }}
            />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }} />
            <Line type="monotone" dataKey="profit" stroke="#16A34A" strokeWidth={2} name="Short Put P/L" dot={false} />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-center text-sm text-gray-500 mt-2">
          Example: P/L Diagram for a Short Put (Strike $90, Premium $2.50)
        </p>
      </div>
    </div>
  </Section>
);

export default function PremiumSellersDashboard() {
  const currentArticle = articles.find(article => article.slug === 'premium-sellers-dashboard-options-writing-guide');

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

      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <main className="relative container mx-auto px-4 py-8 md:py-12">
          {/* Return to Home Button */}
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>

          {/* Badges */}
          <div className="relative mb-8">
            {/* Deep Research Badge - Top Left */}
            <div className="absolute top-0 left-0 z-10">
              <span className="inline-block bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                Deep Research
              </span>
            </div>
            
            {/* Options Badge - Bottom Right */}
            <div className="absolute bottom-0 right-0 z-10">
              <span className="inline-block bg-gradient-to-r from-orange-400 to-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                Options
              </span>
            </div>
          </div>

          {/* Header */}
          <header className="text-center mb-12 pt-8">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 pb-2">
              The Premium Seller's Dashboard
            </h1>
            <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
              A Quantitative Guide to Key Metrics for Writing Options
            </p>
          </header>

          {/* Article Content */}
          <FoundationsSection />
          <MarketLandscapeSection />
          <VolatilityLensSection />
          <GreeksSection />
          <ExecutionSection />

          {/* Call to Action */}
          <div className="text-center mt-12 mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Master Options Premium Selling?</h3>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                This comprehensive guide provides the quantitative framework for systematic options income generation. 
                Remember: successful premium selling is about managing probabilities, not predicting outcomes.
              </p>
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 mr-4"
                >
                  Read Full Research &rarr;
                </a>
              )}
            </div>
          </div>

          {/* Risk Warning */}
          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
            <div className="flex">
              <AlertTriangle className="h-6 w-6 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Risk Warning</h3>
                <p className="text-red-700">
                  Options trading involves substantial risk and is not suitable for all investors. 
                  Premium selling strategies have limited profit potential but significant loss exposure. 
                  Past performance does not guarantee future results. Always conduct thorough research 
                  and consider consulting with a qualified financial advisor before implementing any options strategy.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center mt-12 text-gray-500">
            <p>This page is a visual summary of options selling principles. Always conduct your own research and risk assessment.</p>
            <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          </footer>
        </main>
      </div>
    </>
  );
}