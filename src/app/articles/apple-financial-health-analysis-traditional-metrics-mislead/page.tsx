'use client';

import { DollarSign, TrendingDown, Scale, CheckCircle, BookOpen, AlertTriangle } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

const financialData = {
  currentRatio: { apple: 0.87, microsoft: 1.27, samsung: 2.43, benchmark: 1.0 },
  debtToEquity: { apple: 1.87, microsoft: 0.22, alphabet: 0.05, industry: 0.48 },
  fcf: { apple: { fcf: 108.8, netIncome: 93.7, conversion: 116.1 } }
};

interface BarProps {
  label: string;
  value: number;
  color: string;
  maxValue: number;
  isApple?: boolean;
}

const Bar = ({ label, value, color, maxValue, isApple = false }: BarProps) => {
  const widthPercentage = Math.min((value / maxValue) * 100, 100);
  return (
    <div className="flex items-center space-x-4 my-2">
      <p className={`w-28 text-sm font-medium ${isApple ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
        {label}
      </p>
      <div className="flex-1 bg-gray-200 rounded-full h-6">
        <div
          className={`${color} h-6 rounded-full flex items-center justify-end pr-2 transition-all duration-1000 ease-out`}
          style={{ width: `${widthPercentage}%` }}
        >
          <span className="text-xs font-bold text-white">{value.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default function AppleFinancialHealthAnalysis() {
  return (
    <ArticleFrame
      slug="apple-financial-health-analysis-traditional-metrics-mislead"
      additionalDisclaimer="Financial metrics should always be evaluated in context, and past performance does not guarantee future results."
    >
      {/* Executive Summary */}
      <section className="mb-12">
        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-3 flex items-center font-serif">
            <CheckCircle className="w-7 h-7 mr-3 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]" />
            Executive Verdict: Financially Strong
          </h2>
          <p className="text-blue-800 dark:text-blue-300 leading-relaxed">
            Contrary to what some surface-level metrics might suggest, Apple Inc. is not in financial trouble.
            Its unusual Current Ratio and high Debt-to-Equity are not signs of distress, but the deliberate
            results of a sophisticated and highly effective capital management strategy, built upon an incredible
            ability to generate cash.
          </p>
        </div>
      </section>

      {/* Liquidity Analysis */}
      <section className="mb-12">
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <TrendingDown className="w-8 h-8 text-[#BC4128] dark:text-[#E2694A] mr-4"/>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white font-serif">Liquidity: The &ldquo;Low&rdquo; Current Ratio</h3>
              <p className="text-sm text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Appears Risky, But Reveals Efficiency</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                Apple&apos;s Current Ratio is consistently below the traditional &ldquo;safe&rdquo; benchmark of 1.0.
                This looks alarming but is a sign of elite operational efficiency. Apple collects cash
                from customers long before it pays its suppliers, allowing it to operate with less idle cash.
              </p>
              <div className="mt-4 text-xs text-gray-600 dark:text-gray-400 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600">
                <strong>Key Insight:</strong> A low ratio isn&apos;t weakness; it&apos;s a feature of a powerful
                business model with a negative cash conversion cycle.
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Current Ratio Comparison (FY24)</h4>
              <Bar label="Apple" value={financialData.currentRatio.apple} color="bg-[#BC4128] dark:bg-[#E2694A]" maxValue={3} isApple={true} />
              <Bar label="Microsoft" value={financialData.currentRatio.microsoft} color="bg-[#A8672E] dark:bg-[#D08F52]" maxValue={3} />
              <Bar label="Samsung" value={financialData.currentRatio.samsung} color="bg-sky-500" maxValue={3} />
              <div className="relative my-2">
                <div className="border-t border-dashed border-[#BC4128] dark:border-[#E2694A]"></div>
                <p className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 px-2 text-xs text-[#BC4128] dark:text-[#E2694A]">
                  1.0 Benchmark
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solvency Analysis */}
      <section className="mb-12">
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Scale className="w-8 h-8 text-purple-500 mr-4"/>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white font-serif">Solvency: The High Debt-to-Equity Ratio</h3>
              <p className="text-sm text-purple-600 dark:text-purple-400">A Deliberate Strategy to Maximize Shareholder Value</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                Apple&apos;s D/E ratio is extremely high for a tech company. This isn&apos;t due to financial distress.
                It&apos;s the direct mathematical result of an aggressive stock buyback program. By repurchasing
                shares (reducing equity) and using low-cost debt, Apple boosts key investor metrics like EPS and ROE.
              </p>
              <div className="mt-4 text-xs text-gray-600 dark:text-gray-400 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600">
                <strong>Key Insight:</strong> The high debt is a tool for financial engineering, not a sign
                of operational weakness.
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Debt-to-Equity Comparison (FY24)</h4>
              <Bar label="Apple" value={financialData.debtToEquity.apple} color="bg-purple-500" maxValue={2} isApple={true} />
              <Bar label="Microsoft" value={financialData.debtToEquity.microsoft} color="bg-[#A8672E] dark:bg-[#D08F52]" maxValue={2} />
              <Bar label="Alphabet" value={financialData.debtToEquity.alphabet} color="bg-[#1D8A70] dark:bg-[#3CBF9C]" maxValue={2} />
              <Bar label="Industry Avg" value={financialData.debtToEquity.industry} color="bg-gray-500" maxValue={2} />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Guide */}
      <section className="mb-12">
        <div className="bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <BookOpen className="w-8 h-8 text-gray-600 dark:text-gray-400 mr-4"/>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white font-serif">When Traditional Ratios Tell the Wrong Story</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Understanding the context behind the numbers.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">The Current Ratio: A Tale of Two Business Models</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <strong className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">When it works:</strong> For traditional businesses
                (e.g., retail, manufacturing) with physical inventory and standard payment cycles.
                Here, it&apos;s a reliable snapshot of their ability to pay bills.
                <br/><br/>
                <strong className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">When it misleads (The Apple Evidence):</strong> For
                companies with immense market power and negative cash conversion cycles. Apple collects
                cash from iPhone sales months before it pays its suppliers. Its high &ldquo;Accounts Payable&rdquo;
                isn&apos;t a weakness; it&apos;s proof of its power. The ultimate evidence is that Apple generates
                over $100B in cash annually, making the ratio&apos;s warning of a liquidity crisis irrelevant.
              </p>
            </div>
            <div className="border-t dark:border-gray-700 pt-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">The Debt-to-Equity Ratio: Funding vs. Engineering</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <strong className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">When it works:</strong> For capital-intensive companies
                (e.g., utilities, industrials) that use debt to fund core operations. In this context,
                a high D/E ratio correctly signals higher financial risk.
                <br/><br/>
                <strong className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">When it misleads (The Apple Evidence):</strong> For
                cash-rich &ldquo;super-profitable&rdquo; companies using debt for financial engineering. Apple&apos;s
                high D/E is caused by its massive stock buyback program, which intentionally shrinks
                its equity base. The evidence is that its Interest Coverage Ratio is incredibly healthy.
                The debt isn&apos;t funding a struggling business; it&apos;s a cheap tool to boost shareholder returns.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg mt-4 text-center">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                The Golden Rule: For companies like Apple, cash flow metrics (like FCF Conversion)
                are far more telling than static balance sheet ratios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cash Flow Engine */}
      <section className="mb-12">
        <div className="relative bg-[#1D8A70] dark:bg-[#3CBF9C] text-white rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <DollarSign className="w-8 h-8 mr-4"/>
              <div>
                <h3 className="text-2xl font-bold font-serif">The Engine: Free Cash Flow Fortress</h3>
                <p className="text-sm text-green-100">The Ultimate Proof of Financial Health</p>
              </div>
            </div>
            <p className="text-green-50 mb-6 max-w-3xl">
              The strategies above are only possible because of Apple&apos;s phenomenal ability to turn
              profits into spendable cash. Its FCF Conversion rate is consistently over 100%&mdash;meaning
              for every dollar of accounting profit, Apple generates more than a dollar of actual cash.
              This is the engine that powers everything.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-around gap-6 text-center">
              <div className="p-4 bg-[#1D8A70] dark:bg-[#3CBF9C]/50 rounded-xl w-full md:w-auto">
                <p className="text-sm text-green-200">FY24 Net Income</p>
                <p className="text-4xl font-bold">${financialData.fcf.apple.netIncome}B</p>
              </div>
              <div className="font-bold text-4xl transform md:rotate-0 rotate-90">&rarr;</div>
              <div className="p-4 bg-[#1D8A70] dark:bg-[#3CBF9C]/50 rounded-xl w-full md:w-auto">
                <p className="text-sm text-green-200">FY24 Free Cash Flow</p>
                <p className="text-4xl font-bold">${financialData.fcf.apple.fcf}B</p>
              </div>
              <div className="font-bold text-4xl">=</div>
              <div className="p-4 bg-white dark:bg-[#0A0D14]/20 rounded-xl border border-white/50 w-full md:w-auto">
                <p className="text-sm text-green-100">FCF Conversion Rate</p>
                <p className="text-5xl font-extrabold text-white">{financialData.fcf.apple.conversion}%</p>
                <p className="text-xs text-green-100">(Industry-leading quality of earnings)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Monitoring */}
      <section>
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-8 h-8 text-[#BC4128] dark:text-[#E2694A] mr-4"/>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">Where to Watch for Cracks</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Key indicators for monitoring Apple&apos;s financial health</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">FCF Sustainability</h4>
              <p className="text-sm text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">
                Any sustained drop in cash generation is the primary red flag to watch.
              </p>
            </div>
            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Services Growth</h4>
              <p className="text-sm text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">
                Regulatory threats to the high-margin Services segment could hurt profitability.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Capital Allocation</h4>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                A sudden halt to buybacks might signal a loss of confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ArticleFrame>
  );
}
