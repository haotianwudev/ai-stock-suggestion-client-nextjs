'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BookOpen, CheckCircle, Scale, FlaskConical, Target, TrendingUp, ShieldCheck, HelpCircle, Percent, BarChartHorizontal, ExternalLink, ArrowDown } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

// --- Data Section ---
const performanceData = [
  { name: 'Jan-93', Technical: 1.00, NonTechnical: 1.00 },
  { name: 'Sep-95', Technical: 1.02, NonTechnical: 1.10 },
  { name: 'Jun-98', Technical: 1.05, NonTechnical: 1.15 },
  { name: 'Mar-01', Technical: 1.55, NonTechnical: 1.40 },
  { name: 'Dec-03', Technical: 1.60, NonTechnical: 1.48 },
  { name: 'Sep-06', Technical: 1.80, NonTechnical: 1.55 },
  { name: 'Jun-09', Technical: 2.05, NonTechnical: 1.65 },
  { name: 'Mar-12', Technical: 1.85, NonTechnical: 1.68 },
];

const debatePoints = [
    {
        icon: <HelpCircle className="h-8 w-8 text-[#BC4128] dark:text-[#E2694A]" />,
        title: "Academic Skepticism",
        description: "For decades, academic circles have largely dismissed technical analysis (TA), sometimes comparing it to 'alchemy.' The efficient market hypothesis suggests past price action cannot predict future movements."
    },
    {
        icon: <TrendingUp className="h-8 w-8 text-[#1D8A70] dark:text-[#3CBF9C]" />,
        title: "Practitioner Reality",
        description: "Despite academic skepticism, TA remains a core tool for many investors. Surveys show 30-40% of foreign exchange traders find TA important for short-term price forecasting."
    }
];

const researchFlaws = [
    "Tested strategies were often too simple and didn't capture the dynamic nature of real-world TA.",
    "It's impossible to test every potential strategy, and practitioners rarely reveal their most profitable methods.",
    "A significant issue is 'data snooping bias,' where strategies appear successful by chance because they are retrofitted to past data.",
    "Ultimately, researchers couldn't 'peer into the black box' of what professional chartists actually do."
];

const performanceMetrics = [
    { name: "Raw Rate of Return (ROR)", description: "The portfolio's total return." },
    { name: "Benchmark-Adjusted Return (BAR)", description: "Returns net of a portfolio's specific benchmark." },
    { name: "Information Ratio", description: "Return from deviating from the benchmark, scaled by deviation." },
    { name: "3-Factor Alpha (Fama-French)", description: "Excess return adjusted for market, size, and value factors." },
    { name: "4-Factor Alpha (Carhart)", description: "3-Factor Alpha plus a momentum factor adjustment." }
];

const correlationData = [
    { strategy: "Momentum", correlation: 0.378, color: "bg-[#A8672E] dark:bg-[#D08F52]" },
    { strategy: "Industry Sector Analysis", correlation: 0.291, color: "bg-[#A8672E] dark:bg-[#D08F52]" },
    { strategy: "Theme Identification", correlation: 0.283, color: "bg-[#A8672E] dark:bg-[#D08F52]" },
    { strategy: "Computer Screening/Modeling", correlation: 0.263, color: "bg-blue-300" },
    { strategy: "Fundamental Analysis", correlation: 0.107, color: "bg-red-300" },
    { strategy: "Bottom-Up Stock Picking", correlation: 0.035, color: "bg-[#BC4128] dark:bg-[#E2694A]" },
];

export default function TechnicalAnalysisPortfolioManagement() {
  return (
    <ArticleFrame
      slug="technical-analysis-portfolio-management-performance-practice"
      additionalDisclaimer="Technical analysis results can vary significantly based on implementation, market conditions, and individual skill. Past performance does not guarantee future results."
    >
      {/* Introduction */}
      <section id="introduction" className="mb-12">
        <div className="text-center mb-8">
          <p className="text-base font-semibold text-[#A8672E] dark:text-[#D08F52] tracking-wide uppercase mb-2">An Academic Study</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 font-serif">Head and Shoulders Above the Rest?</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4">A deep dive into the performance of institutional portfolio managers who use technical analysis, based on a study of over 10,000 portfolios.</p>
          <p className="text-sm text-gray-500">By David Smith, Christophe Faugère, and Ying Wang (2013)</p>
        </div>

        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <BookOpen className="h-6 w-6 text-[#A8672E] dark:text-[#D08F52] mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2 font-serif">Research Overview</h3>
              <p className="text-blue-800">
                This groundbreaking study examines whether institutional portfolio managers who use technical analysis
                actually outperform their peers. Unlike previous research that tested specific trading rules, this study
                surveyed over 10,000 institutional managers about their actual use of technical analysis and analyzed
                their real-world performance outcomes.
              </p>
            </div>
          </div>
        </div>

        <a
          href="http://ssrn.com/abstract=2202060"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#A8672E] dark:text-[#D08F52] bg-blue-100 hover:bg-blue-200 transition-colors"
        >
          <ExternalLink className="mr-2 h-5 w-5" />
          Read Full Academic Paper
        </a>
      </section>

      {/* The Long-Standing Debate */}
      <section id="debate" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-8 font-serif">The Long-Standing Debate</h2>
        <p className="text-lg text-gray-600 mb-8">A persistent divide exists between academic theory and real-world practice.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {debatePoints.map((point, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-start space-x-4">
              <div className="flex-shrink-0 bg-white dark:bg-[#0A0D14] p-3 rounded-full shadow-sm">{point.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-serif">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border border-red-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center font-serif">
            <FlaskConical className="mr-3 h-6 w-6" />
            The Problem with Traditional Research
          </h3>
          <p className="text-red-800 mb-4">Past studies struggled to provide a definitive answer due to several key flaws:</p>
          <div className="space-y-3">
            {researchFlaws.map((flaw, index) => (
              <div key={index} className="flex items-start space-x-3">
                <FlaskConical className="h-5 w-5 mt-1 text-[#BC4128] dark:text-[#E2694A] flex-shrink-0" />
                <p className="text-[#BC4128] dark:text-[#E2694A]">{flaw}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Novel Methodology */}
      <section id="methodology" className="mb-12">
        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border border-blue-200 rounded-lg p-8 text-center">
          <Target className="h-16 w-16 mx-auto text-[#A8672E] dark:text-[#D08F52] mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4 font-serif">A New Approach: Asking the Experts</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Instead of testing specific rules, this study took a novel path. It surveyed over 10,000 institutional
            portfolio managers on their actual use of technical analysis and then analyzed their real-world performance.
            This method bypasses the &ldquo;black box&rdquo; problem by focusing on outcomes, not unobservable strategies.
          </p>
        </div>
      </section>

      {/* Who Uses Technical Analysis */}
      <section id="prevalence" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-8 font-serif">Who Uses Technical Analysis?</h2>
        <p className="text-lg text-gray-600 mb-8">Prevalence, relationships, and how TA fits into the investment puzzle.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center font-serif">
              <Percent className="h-6 w-6 mr-2 text-[#A8672E] dark:text-[#D08F52]"/>
              Usage Among Managers
            </h3>
            <div className="space-y-4 text-gray-700 bg-gray-50 p-6 rounded-lg">
              <p><strong className="font-semibold text-[#A8672E] dark:text-[#D08F52]">~1/3 of funds</strong> use TA, with U.S. equity managers being the most common adopters.</p>
              <p>Use doesn&apos;t vary much by market cap, but <strong className="font-semibold text-[#A8672E] dark:text-[#D08F52]">5.9% of All-Cap funds</strong> rate it &ldquo;very important.&rdquo;</p>
              <p>Surprisingly, <strong className="font-semibold text-[#BC4128] dark:text-[#E2694A]">over 85% of U.S. balanced funds</strong> deem it unimportant, despite their need for asset allocation timing.</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center font-serif">
              <BarChartHorizontal className="h-6 w-6 mr-2 text-purple-500"/>
              Relationship with Other Strategies
            </h3>
            <div className="space-y-3 bg-gray-50 p-6 rounded-lg">
              {correlationData.map(item => (
                <div key={item.strategy} className="w-full">
                  <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
                    <span>{item.strategy}</span>
                    <span>{item.correlation.toFixed(3)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`${item.color} h-2.5 rounded-full`} style={{ width: `${item.correlation * 100 * 2}%` }}></div>
                  </div>
                </div>
              ))}
              <p className="text-sm text-gray-500 mt-3">
                Correlation with TA usage. High correlation with Momentum suggests a focus on trends,
                while low correlation with Fundamentals indicates a complementary role.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Analysis */}
      <section id="performance" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-8 font-serif">The Performance Advantage</h2>
        <p className="text-lg text-gray-600 mb-8">TA provides an edge, but in an &ldquo;unexpected way.&rdquo;</p>

        <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-lg shadow-md border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center font-serif">How Performance Was Measured</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
            {performanceMetrics.map(metric => (
              <div key={metric.name} className="p-3 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-lg">
                <p className="font-semibold text-[#A8672E] dark:text-[#D08F52] text-sm">{metric.name}</p>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <Scale className="h-7 w-7 text-purple-500"/>
              <h3 className="text-lg font-semibold font-serif">The Skewness & Kurtosis Edge</h3>
            </div>
            <p className="text-gray-600">
              The most remarkable finding: TA-managed funds showed significantly elevated skewness (higher chance of large positive returns)
              and kurtosis (more frequent extreme outcomes). This suggests a strategy geared towards capturing major market moves.
            </p>
          </div>
          <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <ArrowDown className="h-7 w-7 text-[#BC4128] dark:text-[#E2694A]"/>
              <h3 className="text-lg font-semibold font-serif">Down-Market Advantage</h3>
            </div>
            <p className="text-gray-600">
              TA users significantly outperformed during market declines. Those rating TA &ldquo;very important&rdquo; beat non-users by an average of
              <strong className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C]"> 19 basis points per month</strong> in negative markets, a statistically significant result.
            </p>
          </div>
          <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <ShieldCheck className="h-7 w-7 text-yellow-500"/>
              <h3 className="text-lg font-semibold font-serif">Volatility & Survival</h3>
            </div>
            <p className="text-gray-600">
              While performance volatility was higher, it did not lead to a higher failure rate. Survival rates for TA funds were
              comparable to their peers, suggesting the higher risk was managed effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Performance Charts */}
      <section id="charts" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-8 font-serif">Cumulative Outperformance Over Time</h2>
        <p className="text-lg text-gray-600 mb-8">
          Value of $1 invested, net of benchmark, comparing technical vs. non-technical portfolios from 1993 to 2012.
        </p>

        <div className="w-full h-96 bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => `$${value.toFixed(2)}`}/>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`$${Number(value).toFixed(2)}`, '']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Technical"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5, fill: '#3b82f6' }}
                activeDot={{ r: 8, fill: '#1d4ed8' }}
              />
              <Line
                type="monotone"
                dataKey="NonTechnical"
                name="Non-Technical"
                stroke="#ef4444"
                strokeWidth={3}
                strokeDasharray="8 4"
                dot={{ r: 5, fill: '#ef4444' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Key Insight:</strong> Technical analysis portfolios demonstrated superior cumulative performance,
            particularly during volatile periods and market downturns. The divergence became most pronounced during
            the 2000-2002 dot-com crash and the 2008-2009 financial crisis.
          </p>
        </div>
      </section>

      {/* Conclusion */}
      <section id="conclusion">
        <div className="bg-[#A8672E] dark:bg-[#D08F52] text-white p-8 rounded-lg">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 mx-auto text-white/80 mb-4" />
            <h2 className="text-3xl font-bold tracking-tight mb-4 font-serif">The Net Benefit: A Clear, Unexpected Advantage</h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              The study concludes that TA has been beneficial for institutional portfolios. The advantage isn&apos;t about
              slightly higher average returns in all conditions, but about creating a unique return profile&mdash;characterized
              by positive skewness and high kurtosis&mdash;that offers a distinct edge, particularly in managing risk during market downturns.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-3 font-serif">Key Advantages of Technical Analysis</h3>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-1 text-[#1D8A70] dark:text-[#3CBF9C] flex-shrink-0" />
                <span>Superior performance during market downturns</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-1 text-[#1D8A70] dark:text-[#3CBF9C] flex-shrink-0" />
                <span>Positive skewness (higher probability of large gains)</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-1 text-[#1D8A70] dark:text-[#3CBF9C] flex-shrink-0" />
                <span>Effective risk management despite higher volatility</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-1 text-[#1D8A70] dark:text-[#3CBF9C] flex-shrink-0" />
                <span>Complementary to fundamental analysis strategies</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="font-semibold text-amber-900 mb-3 font-serif">Important Considerations</h3>
            <ul className="space-y-2 text-amber-800">
              <li className="flex items-start space-x-2">
                <HelpCircle className="h-4 w-4 mt-1 text-amber-600 flex-shrink-0" />
                <span>Results based on institutional managers, not individual traders</span>
              </li>
              <li className="flex items-start space-x-2">
                <HelpCircle className="h-4 w-4 mt-1 text-amber-600 flex-shrink-0" />
                <span>Higher volatility requires stronger risk management</span>
              </li>
              <li className="flex items-start space-x-2">
                <HelpCircle className="h-4 w-4 mt-1 text-amber-600 flex-shrink-0" />
                <span>Success may depend on proper implementation and discipline</span>
              </li>
              <li className="flex items-start space-x-2">
                <HelpCircle className="h-4 w-4 mt-1 text-amber-600 flex-shrink-0" />
                <span>Past performance doesn&apos;t guarantee future results</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </ArticleFrame>
  );
}
