'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart2, Briefcase, BookOpen, BrainCircuit, CheckCircle, ChevronRight, Cpu, DollarSign, Edit, Film, Globe, Info, Layers, Library, Newspaper, Rocket, Search, Shield, Zap } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Helper component for section titles
const SectionTitle = ({ icon, title, subtitle }) => (
  <div className="mb-12 text-center">
    <div className="inline-flex items-center justify-center bg-indigo-100 p-3 rounded-full mb-4 border border-indigo-200">
      {React.cloneElement(icon, { className: "h-8 w-8 text-indigo-600" })}
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{title}</h2>
    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
  </div>
);

// Helper component for feature cards
const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 h-full">
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-indigo-100 p-2 rounded-lg">
        {React.cloneElement(icon, { className: "h-6 w-6 text-indigo-600" })}
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600">{children}</p>
  </div>
);

export default function OptionsTraderToolkitRequirements() {
  const [activeSection, setActiveSection] = useState('intro');
  const [activeBrokerTab, setActiveBrokerTab] = useState('Specialists');
  const [activePersonaTab, setActivePersonaTab] = useState('Beginner');

  const currentArticle = articles.find(article => article.slug === 'options-trader-toolkit-requirements');

  const navItems = [
    { id: 'intro', label: 'Introduction', icon: <Info /> },
    { id: 'pillars', label: 'Five Pillars', icon: <Layers /> },
    { id: 'brokers', label: 'Brokers', icon: <Briefcase /> },
    { id: 'analytics', label: 'Analytics', icon: <Search /> },
    { id: 'decision-support', label: 'Decision Support', icon: <Shield /> },
    { id: 'news', label: 'News', icon: <Newspaper /> },
    { id: 'journals', label: 'Journals', icon: <Edit /> },
    { id: 'education', label: 'Education', icon: <Library /> },
    { id: 'toolkits', label: 'Toolkits', icon: <CheckCircle /> },
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const brokerTabs = {
    'Specialists': {
      title: 'For the Active, High-Frequency Trader',
      brokers: [
        { name: 'tastytrade', description: 'Built by and for options traders with a unique commission model ($0 to close) and an integrated media network. Ideal for active position management.' },
        { name: 'Interactive Brokers (IBKR Pro)', description: 'The gateway to institutional-grade trading. Prioritizes execution quality (no PFOF) with low margin rates and unparalleled global market access.' },
      ]
    },
    'All-Around': {
      title: 'For the All-Around Trader: Power and Polish',
      brokers: [
        { name: 'Charles Schwab (thinkorswim)', description: 'Arguably the most powerful retail platform. Legendary charting, custom scripting with thinkScript, and the paperMoney simulator.' },
        { name: 'E*TRADE (Power E*TRADE)', description: 'Balances powerful features with an intuitive web-based interface and a top-tier mobile app. Great for active traders who value usability.' },
      ]
    },
    'Mobile-First': {
      title: 'For the Cost-Conscious & Mobile-First Trader',
      brokers: [
        { name: 'Webull', description: '$0 commission options trading with more advanced charting and data than simpler mobile apps.' },
        { name: 'Robinhood', description: 'Pioneered $0 commission options trading with a focus on extreme simplicity and ease of use for casual investors.' },
      ]
    }
  };
  
  const personaToolkits = {
    'Beginner': {
      icon: <BookOpen />,
      title: "The Beginner's Launchpad",
      focus: "Education & Safety",
      tools: [
        { category: 'Broker', name: 'Charles Schwab', reason: 'User-friendly, access to thinkorswim, best-in-class free education, and paperMoney simulator.' },
        { category: 'Analysis', name: 'Broker Platform Tools', reason: 'Master the fundamentals within the Schwab ecosystem before expanding.' },
        { category: 'Education', name: 'Option Alpha & Schwab Coaching', reason: 'Structured free courses and live practical application sessions.' },
        { category: 'Journal', name: 'Tradervue (Free Tier)', reason: 'Build the essential habit of journaling with a professional-grade tool.' },
      ]
    },
    'Active Trader': {
      icon: <Zap />,
      title: "The Active Trader's Workstation",
      focus: "Speed, Power & Cost-Efficiency",
      tools: [
        { category: 'Broker', name: 'tastytrade or IBKR Pro', reason: 'Choice between an options-centric ecosystem (tastytrade) or superior execution and global access (IBKR).' },
        { category: 'Analysis', name: 'TradingView + Market Chameleon', reason: 'Universal charting excellence combined with specialized event-driven trade idea generation.' },
        { category: 'Information', name: 'Benzinga Pro', reason: 'Critical speed advantage with a real-time audio news squawk.' },
        { category: 'Journal', name: 'TraderSync or TradesViz', reason: 'Powerful AI-driven feedback and mobile access (TraderSync) or deep analytics (TradesViz).' },
      ]
    },
    'Quant': {
      icon: <Cpu />,
      title: "The Quant-Leaning Trader's Lab",
      focus: "Data, Automation & API Access",
      tools: [
        { category: 'Broker', name: 'Interactive Brokers (IBKR Pro)', reason: 'The industry-standard, robust API for building custom automated strategies.' },
        { category: 'Analysis', name: 'TrendSpider + ORATS', reason: 'AI-powered automated analysis and quantitative scanners to find theoretical edge.' },
        { category: 'Information', name: 'Polygon.io or Finnhub API', reason: 'Feed custom models and alert systems with real-time, machine-readable news data.' },
        { category: 'Journal', name: 'TradesViz', reason: 'Comprehensive asset support and AI Q&A capabilities align with a data-driven approach.' },
      ]
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
        {/* Header with Navigation */}
        <div className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
            
            {/* Badges */}
            <div className="absolute top-2 left-2 z-10">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                Deep Research
              </span>
            </div>
            
            <div className="absolute bottom-2 right-2 z-10">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-orange-400 to-yellow-500 text-white">
                Options
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              The Modern Options Trader's Toolkit
            </h1>
            <p className="text-gray-600 text-lg">
              A Comprehensive Analysis and Strategic Guide
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:w-64 lg:sticky lg:top-24 lg:h-fit">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                          activeSection === item.id
                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {React.cloneElement(item.icon, { className: 'h-4 w-4' })}
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Introduction Section */}
              <section id="intro" className="mb-24">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      Architect Your Personal Trading Ecosystem
                    </h2>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                      Success in modern options trading requires more than a brokerage account. It demands a systematic, integrated workflow. This comprehensive guide helps you build a high-performance toolkit tailored to your strategy, experience level, and objectives.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">The Pro-Am Advantage</h3>
                    <p className="text-gray-700">
                      Modern retail traders have access to institutional-grade tools and data that were once exclusive to Wall Street. The key is knowing how to combine these resources into a cohesive system that amplifies your edge while minimizing operational friction.
                    </p>
                  </div>
                </div>
              </section>

              {/* Five Pillars Section */}
              <section id="pillars" className="mb-24">
                <SectionTitle 
                  icon={<Layers />}
                  title="The Five Foundational Pillars"
                  subtitle="Your trading ecosystem rests on these five critical components. Mastering each is key to achieving a sustainable edge in the markets."
                />
                <div className="grid md:grid-cols-5 gap-6">
                  <FeatureCard icon={<Briefcase />} title="Execution">
                    The brokerage platform serving as the command center for all trading activity.
                  </FeatureCard>
                  <FeatureCard icon={<Search />} title="Analysis">
                    Charting, scanning, and volatility tools that power idea generation and market assessment.
                  </FeatureCard>
                  <FeatureCard icon={<Shield />} title="Decision Support">
                    Risk visualization and P/L modeling software that translates strategy into tangible outcomes.
                  </FeatureCard>
                  <FeatureCard icon={<Newspaper />} title="Information">
                    Real-time news and data feeds that provide the critical informational edge.
                  </FeatureCard>
                  <FeatureCard icon={<CheckCircle />} title="Performance Review">
                    The trading journal that creates the essential feedback loop for continuous improvement.
                  </FeatureCard>
                </div>
              </section>

              {/* Brokerage Platforms Section */}
              <section id="brokers" className="mb-24">
                <SectionTitle 
                  icon={<Briefcase />}
                  title="The Command Center: Brokerage Platforms"
                  subtitle="The choice of broker is the foundational layer of your ecosystem, dictating costs, execution quality, and overall workflow efficiency."
                />
                
                <div className="flex justify-center mb-8 border-b border-gray-200">
                  {Object.keys(brokerTabs).map(tabName => (
                    <button
                      key={tabName}
                      onClick={() => setActiveBrokerTab(tabName)}
                      className={`px-6 py-3 font-semibold text-lg transition-colors ${
                        activeBrokerTab === tabName 
                          ? 'text-indigo-600 border-b-2 border-indigo-600' 
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {tabName}
                    </button>
                  ))}
                </div>
                
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-bold text-gray-900">{brokerTabs[activeBrokerTab].title}</h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {brokerTabs[activeBrokerTab].brokers.map(broker => (
                    <div key={broker.name} className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                      <h5 className="text-xl font-bold text-gray-900 mb-3">{broker.name}</h5>
                      <p className="text-gray-600">{broker.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h4 className="text-2xl font-bold text-gray-900 text-center mb-6">Brokerage Comparison</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="border-b border-gray-300 bg-gray-50">
                        <tr>
                          <th className="p-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Platform</th>
                          <th className="p-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Profile</th>
                          <th className="p-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Commissions</th>
                          <th className="p-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Execution Model</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                          <td className="p-4 font-medium">tastytrade</td>
                          <td className="p-4">Active Derivatives Specialist</td>
                          <td className="p-4">$1.00 open, $0 close</td>
                          <td className="p-4">PFOF</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-4 font-medium">Interactive Brokers</td>
                          <td className="p-4">Professional/Global Trader</td>
                          <td className="p-4">$0.25 - $0.65</td>
                          <td className="p-4">Direct Access</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-4 font-medium">Charles Schwab (TOS)</td>
                          <td className="p-4">All-Around Power User</td>
                          <td className="p-4">$0.65</td>
                          <td className="p-4">PFOF</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-4 font-medium">E*TRADE</td>
                          <td className="p-4">All-Around Active Trader</td>
                          <td className="p-4">$0.65 ($0.50 active)</td>
                          <td className="p-4">PFOF</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-4 font-medium">Webull / Robinhood</td>
                          <td className="p-4">Mobile-First / Casual</td>
                          <td className="p-4">$0</td>
                          <td className="p-4">PFOF</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Analytics Engine Section */}
              <section id="analytics" className="mb-24">
                <SectionTitle 
                  icon={<Search />}
                  title="The Analytics Engine"
                  subtitle="Gain an edge with specialized third-party software for charting, scanning, and volatility analysis, often leveraging AI to automate complex tasks."
                />
                <div className="grid md:grid-cols-3 gap-6">
                  <FeatureCard icon={<BarChart2 />} title="Advanced Charting">
                    Platforms like TradingView and TrendSpider offer superior charting, AI-driven analysis, and customization that can surpass broker offerings.
                  </FeatureCard>
                  <FeatureCard icon={<Rocket />} title="Dedicated Options Scanners">
                    Services like Market Chameleon and ORATS use specialized filters to uncover specific opportunities around earnings, events, and quantitative mispricings.
                  </FeatureCard>
                  <FeatureCard icon={<Zap />} title="Volatility Analysis">
                    Understanding Implied Volatility (IV) is key. Tools like IBKR's Volatility Lab help analyze IV Rank, Percentile, and Skew to properly price options.
                  </FeatureCard>
                </div>
              </section>

              {/* Decision Support Section */}
              <section id="decision-support" className="mb-24">
                <SectionTitle 
                  icon={<Shield />}
                  title="Decision Support: Visualize Your Risk"
                  subtitle="Translate abstract strategies into a clear, visual format that reveals potential profit, loss, and risk characteristics before you place a trade."
                />
                <div className="bg-white p-8 rounded-2xl border border-gray-200">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">The Risk Profile Graph</h3>
                      <p className="text-gray-600 mb-4">
                        The single most valuable visualization for an options trader. It plots P&L against the underlying asset price, instantly showing max profit/loss, breakeven points, and the effects of time decay (theta).
                      </p>
                      <p className="text-gray-600">
                        Leading platforms like thinkorswim's "Analyze" tab, tastytrade's "Curve View", and the dedicated tool <span className="text-indigo-600 font-semibold">OptionStrat</span> excel at this.
                      </p>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="w-full aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-300 flex items-center justify-center">
                        <div className="text-center">
                          <BarChart2 className="h-16 w-16 text-indigo-600 mx-auto mb-2" />
                          <p className="text-indigo-600 font-medium">Risk Profile Visualization</p>
                          <p className="text-sm text-gray-600">P&L vs Stock Price Graph</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* News & Journals Combined Section */}
              <div className="grid lg:grid-cols-2 gap-8 mb-24">
                {/* Information Edge Section */}
                <section id="news">
                  <SectionTitle 
                    icon={<Newspaper />}
                    title="The Information Edge"
                    subtitle="In a market sensitive to volatility spikes, receiving news seconds before others is a tangible, tradable advantage."
                  />
                  <div className="space-y-6">
                    <FeatureCard icon={<Zap />} title="Real-Time News 'Squawk'">
                      Services like Benzinga Pro and TradeTheNews provide an audio feed of breaking headlines, letting you absorb info while focused on your charts.
                    </FeatureCard>
                    <FeatureCard icon={<Cpu />} title="Financial News APIs">
                      For quants, APIs from Polygon.io or Finnhub allow programmatic access to news streams for building custom alerts and sentiment analysis models.
                    </FeatureCard>
                  </div>
                </section>

                {/* Feedback Loop Section */}
                <section id="journals">
                  <SectionTitle 
                    icon={<Edit />}
                    title="The Feedback Loop"
                    subtitle="A dedicated trading journal is the most critical tool for long-term growth, turning raw experience into refined expertise."
                  />
                  <div className="space-y-6">
                    <FeatureCard icon={<BrainCircuit />} title="Go Beyond Spreadsheets">
                      Dedicated software like Tradervue, TraderSync, and TradesViz automates data entry and provides deep analytics to uncover strategic and psychological patterns.
                    </FeatureCard>
                    <FeatureCard icon={<Layers />} title="Options-Specific Features">
                      Look for journals that support strategy grouping, expiration tracking, and multi-leg P&L calculations for accurate performance analysis.
                    </FeatureCard>
                  </div>
                </section>
              </div>

              {/* Education Section */}
              <section id="education" className="mb-24">
                <SectionTitle 
                  icon={<Library />}
                  title="The Foundation of Knowledge"
                  subtitle="Even the most advanced toolkit is useless without a commitment to continuous learning. These resources provide the best education, often for free."
                />
                <div className="grid md:grid-cols-3 gap-6">
                  <FeatureCard icon={<Briefcase />} title="Broker Universities">
                    Charles Schwab, tastytrade (via tastylive), and Interactive Brokers offer some of the best, most practical educational content available.
                  </FeatureCard>
                  <FeatureCard icon={<Globe />} title="Industry Gold Standard">
                    The Cboe Options Institute is the definitive source for authoritative options education, from foundational to practitioner-level courses.
                  </FeatureCard>
                  <FeatureCard icon={<Film />} title="High-Value Online Courses">
                    Platforms like Option Alpha and Udemy offer comprehensive, structured courses for beginners at little to no cost.
                  </FeatureCard>
                </div>
              </section>

              {/* Synthesis/Recommendations Section */}
              <section id="toolkits" className="mb-24">
                <SectionTitle 
                  icon={<CheckCircle />}
                  title="Build Your Optimal Toolkit"
                  subtitle="The best ecosystem is a personal construct aligned with your experience, strategy, and budget. Find your recommended starting point below."
                />
                
                <div className="flex justify-center mb-8 border-b border-gray-200">
                  {Object.keys(personaToolkits).map(persona => (
                    <button
                      key={persona}
                      onClick={() => setActivePersonaTab(persona)}
                      className={`px-6 py-3 font-semibold text-lg transition-colors flex items-center gap-2 ${
                        activePersonaTab === persona 
                          ? 'text-indigo-600 border-b-2 border-indigo-600' 
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {personaToolkits[persona].icon}
                      {persona}
                    </button>
                  ))}
                </div>
                
                <div className="bg-white rounded-2xl border border-gray-200 p-8">
                  {Object.entries(personaToolkits).map(([key, persona]) => (
                    <div key={key} className={`${activePersonaTab === key ? 'block' : 'hidden'}`}>
                      <div className="text-center mb-6">
                        <h3 className="text-3xl font-bold text-gray-900">{persona.title}</h3>
                        <p className="text-indigo-600 font-semibold mt-2">Focus: {persona.focus}</p>
                      </div>
                      <div className="space-y-4">
                        {persona.tools.map((tool, index) => (
                          <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div>
                                <p className="text-sm text-indigo-600 font-bold uppercase tracking-wide">{tool.category}</p>
                                <p className="text-lg font-semibold text-gray-900">{tool.name}</p>
                              </div>
                              <p className="text-gray-600 sm:text-right max-w-md">{tool.reason}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Call to Action */}
              <section className="mb-16">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-center text-white">
                  <h3 className="text-2xl font-bold mb-4">Ready to Build Your Trading Ecosystem?</h3>
                  <p className="text-lg mb-6 text-indigo-100">
                    Start with one pillar, master it, then systematically expand your toolkit as your strategy and capital grow.
                  </p>
                  {currentArticle?.googleDoc && (
                    <a 
                      href={currentArticle.googleDoc}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Read Full Research Document
                    </a>
                  )}
                </div>
              </section>

              {/* Educational Disclaimer */}
              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">Educational Content</h3>
                    <p className="text-amber-700">
                      This analysis is for educational purposes only and does not constitute financial advice. Options trading involves significant risk and is not suitable for all investors. Consider your risk tolerance and consult with a qualified financial advisor before making investment decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-lg font-semibold mb-2">© 2025 SOPHIE's Daddy Blog. Educational content for informational purposes only.</p>
            <p className="text-gray-400">
              Building the future of retail trading through education, analysis, and strategic thinking.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
} 