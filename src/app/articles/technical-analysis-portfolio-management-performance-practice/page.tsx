'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeft, ArrowDown, ArrowUp, BarChart2, BookOpen, CheckCircle, Scale, BrainCircuit, Users, FlaskConical, Target, TrendingUp, ShieldCheck, HelpCircle, FileText, Percent, BarChartHorizontal, Music, ExternalLink } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

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
        icon: <HelpCircle className="h-8 w-8 text-red-500" />,
        title: "Academic Skepticism",
        description: "For decades, academic circles have largely dismissed technical analysis (TA), sometimes comparing it to 'alchemy.' The efficient market hypothesis suggests past price action cannot predict future movements."
    },
    {
        icon: <TrendingUp className="h-8 w-8 text-green-500" />,
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
    { strategy: "Momentum", correlation: 0.378, color: "bg-blue-500" },
    { strategy: "Industry Sector Analysis", correlation: 0.291, color: "bg-blue-400" },
    { strategy: "Theme Identification", correlation: 0.283, color: "bg-blue-400" },
    { strategy: "Computer Screening/Modeling", correlation: 0.263, color: "bg-blue-300" },
    { strategy: "Fundamental Analysis", correlation: 0.107, color: "bg-red-300" },
    { strategy: "Bottom-Up Stock Picking", correlation: 0.035, color: "bg-red-400" },
];

export default function TechnicalAnalysisPortfolioManagement() {
  const [activeSection, setActiveSection] = useState('introduction');
  const currentArticle = articles.find(article => article.slug === 'technical-analysis-portfolio-management-performance-practice');

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'debate', title: 'The Long-Standing Debate' },
    { id: 'methodology', title: 'Novel Methodology' },
    { id: 'prevalence', title: 'Who Uses Technical Analysis?' },
    { id: 'performance', title: 'Performance Analysis' },
    { id: 'charts', title: 'Performance Over Time' },
    { id: 'conclusion', title: 'Key Findings' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= currentPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header with Return to Home */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Navigation */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-8">
                <nav className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
                  <ul className="space-y-2">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            activeSection === section.id
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg">
                    Deep Research
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
                    <Music className="mr-1 h-3 w-3" />
                    Podcast
                  </span>
                </div>

                {/* Hero Image */}
                <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-700">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="relative h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <BrainCircuit className="h-16 w-16 mx-auto mb-4 opacity-90" />
                      <h1 className="text-3xl md:text-4xl font-bold mb-2">Technical Analysis in Portfolio Management</h1>
                      <p className="text-xl opacity-90">Performance and Practice</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Podcast Call-to-Action */}
                  {currentArticle?.podcastUrl && (
                    <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-green-800 mb-2">🎧 Listen to the Podcast</h3>
                          <p className="text-green-700">Dive deeper into this analysis with SOPHIE Wall Street Fireside Chat podcast episode.</p>
                        </div>
                        <a 
                          href={currentArticle.podcastUrl}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105 ml-4"
                        >
                          <Music className="mr-2 h-5 w-5" />
                          Listen Now
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Introduction */}
                  <section id="introduction" className="mb-12">
                    <div className="text-center mb-8">
                      <p className="text-base font-semibold text-blue-600 tracking-wide uppercase mb-2">An Academic Study</p>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Head and Shoulders Above the Rest?</h2>
                      <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-4">A deep dive into the performance of institutional portfolio managers who use technical analysis, based on a study of over 10,000 portfolios.</p>
                      <p className="text-sm text-gray-500">By David Smith, Christophe Faugère, and Ying Wang (2013)</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                      <div className="flex items-start space-x-3">
                        <BookOpen className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-blue-900 mb-2">Research Overview</h3>
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
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Read Full Academic Paper
                    </a>
                  </section>

                  {/* The Long-Standing Debate */}
                  <section id="debate" className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">The Long-Standing Debate</h2>
                    <p className="text-lg text-gray-600 mb-8">A persistent divide exists between academic theory and real-world practice.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      {debatePoints.map((point, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-white p-3 rounded-full shadow-sm">{point.icon}</div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{point.title}</h3>
                            <p className="text-gray-600">{point.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center">
                        <FlaskConical className="mr-3 h-6 w-6" />
                        The Problem with Traditional Research
                      </h3>
                      <p className="text-red-800 mb-4">Past studies struggled to provide a definitive answer due to several key flaws:</p>
                      <div className="space-y-3">
                        {researchFlaws.map((flaw, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <FlaskConical className="h-5 w-5 mt-1 text-red-500 flex-shrink-0" />
                            <p className="text-red-700">{flaw}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Novel Methodology */}
                  <section id="methodology" className="mb-12">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                      <Target className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                      <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">A New Approach: Asking the Experts</h2>
                      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Instead of testing specific rules, this study took a novel path. It surveyed over 10,000 institutional 
                        portfolio managers on their actual use of technical analysis and then analyzed their real-world performance. 
                        This method bypasses the "black box" problem by focusing on outcomes, not unobservable strategies.
                      </p>
                    </div>
                  </section>

                  {/* Who Uses Technical Analysis */}
                  <section id="prevalence" className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Who Uses Technical Analysis?</h2>
                    <p className="text-lg text-gray-600 mb-8">Prevalence, relationships, and how TA fits into the investment puzzle.</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <Percent className="h-6 w-6 mr-2 text-blue-500"/>
                          Usage Among Managers
                        </h3>
                        <div className="space-y-4 text-gray-700 bg-gray-50 p-6 rounded-lg">
                          <p><strong className="font-semibold text-blue-600">~1/3 of funds</strong> use TA, with U.S. equity managers being the most common adopters.</p>
                          <p>Use doesn't vary much by market cap, but <strong className="font-semibold text-blue-600">5.9% of All-Cap funds</strong> rate it "very important."</p>
                          <p>Surprisingly, <strong className="font-semibold text-red-600">over 85% of U.S. balanced funds</strong> deem it unimportant, despite their need for asset allocation timing.</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
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
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">The Performance Advantage</h2>
                    <p className="text-lg text-gray-600 mb-8">TA provides an edge, but in an "unexpected way."</p>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">How Performance Was Measured</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
                        {performanceMetrics.map(metric => (
                          <div key={metric.name} className="p-3 bg-blue-50 rounded-lg">
                            <p className="font-semibold text-blue-600 text-sm">{metric.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <Scale className="h-7 w-7 text-purple-500"/>
                          <h3 className="text-lg font-semibold">The Skewness & Kurtosis Edge</h3>
                        </div>
                        <p className="text-gray-600">
                          The most remarkable finding: TA-managed funds showed significantly elevated skewness (higher chance of large positive returns) 
                          and kurtosis (more frequent extreme outcomes). This suggests a strategy geared towards capturing major market moves.
                        </p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <ArrowDown className="h-7 w-7 text-red-500"/>
                          <h3 className="text-lg font-semibold">Down-Market Advantage</h3>
                        </div>
                        <p className="text-gray-600">
                          TA users significantly outperformed during market declines. Those rating TA "very important" beat non-users by an average of 
                          <strong className="font-semibold text-green-600"> 19 basis points per month</strong> in negative markets, a statistically significant result.
                        </p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <ShieldCheck className="h-7 w-7 text-yellow-500"/>
                          <h3 className="text-lg font-semibold">Volatility & Survival</h3>
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
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Cumulative Outperformance Over Time</h2>
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

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 text-sm">
                        <strong>Key Insight:</strong> Technical analysis portfolios demonstrated superior cumulative performance, 
                        particularly during volatile periods and market downturns. The divergence became most pronounced during 
                        the 2000-2002 dot-com crash and the 2008-2009 financial crisis.
                      </p>
                    </div>
                  </section>

                  {/* Conclusion */}
                  <section id="conclusion" className="mb-12">
                    <div className="bg-blue-600 text-white p-8 rounded-lg">
                      <div className="text-center">
                        <CheckCircle className="h-12 w-12 mx-auto text-white/80 mb-4" />
                        <h2 className="text-3xl font-bold tracking-tight mb-4">The Net Benefit: A Clear, Unexpected Advantage</h2>
                        <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                          The study concludes that TA has been beneficial for institutional portfolios. The advantage isn't about 
                          slightly higher average returns in all conditions, but about creating a unique return profile—characterized 
                          by positive skewness and high kurtosis—that offers a distinct edge, particularly in managing risk during market downturns.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="font-semibold text-green-900 mb-3">Key Advantages of Technical Analysis</h3>
                        <ul className="space-y-2 text-green-800">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                            <span>Superior performance during market downturns</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                            <span>Positive skewness (higher probability of large gains)</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                            <span>Effective risk management despite higher volatility</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                            <span>Complementary to fundamental analysis strategies</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                        <h3 className="font-semibold text-amber-900 mb-3">Important Considerations</h3>
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
                            <span>Past performance doesn't guarantee future results</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Podcast Call-to-Action Bottom */}
                  {currentArticle?.podcastUrl && (
                    <div className="mb-8 p-6 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-center">
                      <h3 className="text-xl font-bold mb-3">Want to Learn More?</h3>
                      <p className="mb-4">Listen to the full discussion on SOPHIE Wall Street Fireside Chat for deeper insights into this research.</p>
                      <a 
                        href={currentArticle.podcastUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-white text-green-700 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                      >
                        <Music className="mr-2 h-5 w-5" />
                        Listen to Podcast
                      </a>
                    </div>
                  )}

                  {/* Educational Disclaimer */}
                  <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <FileText className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-yellow-900 mb-2">Educational Disclaimer</h3>
                        <p className="text-yellow-800 text-sm">
                          This analysis is for educational purposes only and should not be considered as investment advice. 
                          Technical analysis results can vary significantly based on implementation, market conditions, and individual skill. 
                          Always conduct your own research and consider consulting with a qualified financial advisor before making investment decisions. 
                          Past performance does not guarantee future results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm">© 2025 SOPHIE Daddy Quant Blog. Educational content for informational purposes only.</p>
          </div>
        </footer>
      </div>
    </>
  );
} 
