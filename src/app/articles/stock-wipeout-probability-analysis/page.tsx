'use client';

import { BarChart, Briefcase, Building, ShieldCheck, Skull, TrendingDown, Scale, AlertTriangle, CheckCircle } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

const StatCard = ({ icon, title, value, description, source }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  source: string;
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center mb-4 bg-gray-100 dark:bg-gray-700 w-20 h-20 rounded-full mx-auto">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-center text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-serif">{value}</h3>
    <p className="text-lg font-semibold text-center mt-2 text-gray-900 dark:text-white">{title}</p>
    <p className="text-gray-600 dark:text-gray-400 text-center mt-2 text-sm">{description}</p>
    <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-4 italic">Source: {source}</p>
  </div>
);

const WipeoutStep = ({ icon, step, title, description }: {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center z-10 shadow-sm">
    <div className="relative inline-block mb-4">
      <div className="bg-[#BC4128] dark:bg-[#E2694A] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold absolute -top-3 -right-3">
        {step}
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full">
        {icon}
      </div>
    </div>
    <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{title}</h4>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const RiskFactorCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
    <div className="flex items-center gap-4">
      <div>{icon}</div>
      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h4>
    </div>
    <p className="mt-4 text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default function StockWipeoutProbabilityAnalysis() {
  return (
    <ArticleFrame
      slug="stock-wipeout-probability-analysis"
      additionalDisclaimer="The probability of stock failure varies significantly based on company fundamentals, market conditions, and time horizon."
    >
      {/* Key Statistics Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white font-serif">The Shocking Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatCard
            icon={<Skull className="w-12 h-12 text-[#BC4128] dark:text-[#E2694A]" />}
            title="Most Common Outcome"
            value="100% Loss"
            description="The most frequent lifetime return for a single stock is a complete wipeout of invested capital."
            source="Bessembinder, 2018"
          />
          <StatCard
            icon={<TrendingDown className="w-12 h-12 text-[#BC4128] dark:text-[#E2694A]" />}
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
      <section className="mb-16 p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white font-serif">The Skewed Reality of Returns</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">Individual stock returns don&apos;t follow a bell curve. A few &ldquo;superstar&rdquo; stocks generate massive gains, while most stocks cluster around zero or negative returns.</p>
        <div className="w-full h-64 flex items-end justify-center space-x-1">
          <div className="bg-[#BC4128] dark:bg-[#E2694A] rounded-t-lg" style={{height: '40%', width: '10%'}}></div>
          <div className="bg-[#BC4128] dark:bg-[#E2694A] rounded-t-lg" style={{height: '60%', width: '10%'}}></div>
          <div className="bg-[#BC4128] dark:bg-[#E2694A] rounded-t-lg" style={{height: '30%', width: '10%'}}></div>
          <div className="bg-yellow-400 rounded-t-lg" style={{height: '15%', width: '10%'}}></div>
          <div className="bg-yellow-500 rounded-t-lg" style={{height: '10%', width: '10%'}}></div>
          <div className="bg-gray-300 dark:bg-gray-600 rounded-t-lg" style={{height: '5%', width: '10%'}}></div>
          <div className="bg-gray-400 dark:bg-gray-500 rounded-t-lg" style={{height: '3%', width: '10%'}}></div>
          <div className="bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-t-lg animate-pulse" style={{height: '100%', width: '5%'}}></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400 px-4">
          <span>Many Losers</span>
          <span className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-bold">Few Big Winners</span>
        </div>
      </section>

      {/* Anatomy of a Wipeout Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white font-serif">Anatomy of a Wipeout: The Path to Zero</h2>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 border-t-2 border-dashed border-gray-300 dark:border-gray-600 -translate-y-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <WipeoutStep
              icon={<TrendingDown className="w-10 h-10 text-gray-600 dark:text-gray-400" />}
              step="1"
              title="Financial Distress"
              description="Company becomes unprofitable, debt mounts. Stock price falls below $1.00."
            />
            <WipeoutStep
              icon={<Building className="w-10 h-10 text-gray-600 dark:text-gray-400" />}
              step="2"
              title="Involuntary Delisting"
              description="Fails to meet NYSE/Nasdaq rules. Kicked off the major exchange."
            />
            <WipeoutStep
              icon={<Briefcase className="w-10 h-10 text-gray-600 dark:text-gray-400" />}
              step="3"
              title="OTC Markets"
              description="Relegated to unregulated 'Pink Sheets'. Liquidity evaporates, value plummets."
            />
            <WipeoutStep
              icon={<Scale className="w-10 h-10 text-gray-600 dark:text-gray-400" />}
              step="4"
              title="Bankruptcy"
              description="Assets are liquidated. Creditors get paid first. Common shareholders get nothing."
            />
          </div>
        </div>
      </section>

      {/* Risk Factors Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white font-serif">Profile of Peril: Key Risk Factors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RiskFactorCard
            icon={<AlertTriangle className="text-[#BC4128] dark:text-[#E2694A]" />}
            title="Small-Cap & New IPOs"
            description="Small, young companies are fragile. Nearly 50% of small-cap IPOs are delisted within 5 years."
          />
          <RiskFactorCard
            icon={<AlertTriangle className="text-[#BC4128] dark:text-[#E2694A]" />}
            title="Lack of Profitability"
            description="Consistently losing money erodes investor confidence and is a direct path to failure."
          />
          <RiskFactorCard
            icon={<AlertTriangle className="text-[#BC4128] dark:text-[#E2694A]" />}
            title="High Debt (Leverage)"
            description="High leverage amplifies losses and dramatically increases bankruptcy risk during downturns."
          />
        </div>
      </section>

      {/* IPO Survival Table Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white font-serif">IPO Survival Rates: Size Matters</h2>
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="p-4 font-semibold text-gray-900 dark:text-white">Initial Market Capitalization</th>
                <th className="p-4 font-semibold text-gray-900 dark:text-white">Remaining Listed After 5 Years</th>
                <th className="p-4 font-semibold text-gray-900 dark:text-white">Primary Exit for Non-Survivors</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-4 font-medium text-gray-900 dark:text-gray-200">Small-Cap (&lt;$75 million)</td>
                <td className="p-4 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-bold">55%</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">Involuntary or Voluntary Delisting</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-4 font-medium text-gray-900 dark:text-gray-200">Mid-Cap</td>
                <td className="p-4 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-bold">61%</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">Takeover Transaction</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-900 dark:text-gray-200">Large-Cap</td>
                <td className="p-4 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-bold">67%</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">Takeover Transaction</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4 italic">Source: Harvard Law School Forum on Corporate Governance</p>
      </section>

      {/* The Solution Section */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-[#1D8A70] dark:text-[#3CBF9C]" />
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white font-serif">The Only Free Lunch: Diversification</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            You can&apos;t eliminate risk, but you can avoid the catastrophic risk of a single stock wipeout.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2 text-gray-900 dark:text-white font-serif"><AlertTriangle className="w-6 h-6 text-[#BC4128] dark:text-[#E2694A]"/>Individual Stock</h3>
            <p className="text-gray-700 dark:text-gray-300">A high-stakes bet on one company&apos;s survival. Fully exposed to idiosyncratic risk (fraud, failure, disruption).</p>
            <p className="font-bold text-2xl mt-4 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">High probability of 100% loss.</p>
          </div>
          <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2 text-gray-900 dark:text-white font-serif"><CheckCircle className="w-6 h-6 text-[#1D8A70] dark:text-[#3CBF9C]"/>Diversified Index Fund (ETF)</h3>
            <p className="text-gray-700 dark:text-gray-300">Owns the whole market. Guarantees you hold the few big winners that drive all the growth.</p>
            <p className="font-bold text-2xl mt-4 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Virtually zero probability of 100% loss.</p>
          </div>
        </div>
      </section>
    </ArticleFrame>
  );
}
