'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// ICONS: Using SVG components for icons to keep everything in one file.
const ArrowUpCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="m8 12 4-4 4 4" />
    <path d="M12 16V8" />
  </svg>
);

const ArrowDownCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="m12 8-4 4 4 4" />
    <path d="M8 12h8" />
  </svg>
);

const TrendingUp = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const TrendingDown = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
  </svg>
);

const Zap = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

// --- UPDATED & EXPANDED DATA ---
const earningsData = [
  { company: 'Microsoft', ticker: 'MSFT', weight: '~7.1%', revenue: '$69.6B', revGrowth: '+12%', opMargin: '44.5%', opMarginChange: '+1.5pp', eps: '$3.23', epsGrowth: '+10%', capex: '$14.0B', consensus: 'Beat' },
  { company: 'Apple', ticker: 'AAPL', weight: '~6.5%', revenue: '$95.4B', revGrowth: '+5%', opMargin: '32.1%', opMarginChange: '+0.8pp', eps: '$1.65', epsGrowth: '+8%', capex: '$3.8B', consensus: 'Beat' },
  { company: 'Nvidia', ticker: 'NVDA', weight: '~6.0%', revenue: '$46.7B', revGrowth: '+56%', opMargin: '68.3%', opMarginChange: '+12.1pp', eps: '$1.08', epsGrowth: '+61%', capex: '$1.1B', consensus: 'Beat' },
  { company: 'Alphabet', ticker: 'GOOGL', weight: '~4.4%', revenue: '$96.4B', revGrowth: '+14%', opMargin: '32.5%', opMarginChange: '+2.0pp', eps: '$2.31', epsGrowth: '+22%', capex: '$13.1B', consensus: 'Beat' },
  { company: 'Amazon', ticker: 'AMZN', weight: '~3.7%', revenue: '$167.7B', revGrowth: '+13%', opMargin: '9.8%', opMarginChange: '+3.1pp', eps: '$1.68', epsGrowth: '+33%', capex: '$14.9B', consensus: 'Beat' },
  { company: 'Meta', ticker: 'META', weight: '~2.5%', revenue: '$47.5B', revGrowth: '+22%', opMargin: '40.6%', opMarginChange: '+5.5pp', eps: '$7.14', epsGrowth: '+38%', capex: '$7.8B', consensus: 'Beat' },
  { company: 'Tesla', ticker: 'TSLA', weight: '~1.5%', revenue: '$22.5B', revGrowth: '-12%', opMargin: '5.5%', opMarginChange: '-8.9pp', eps: '$0.33', epsGrowth: '-47%', capex: '$2.5B', consensus: 'Miss' },
];

const companyDeepDive = [
  { company: "Microsoft", story: "Confirmed its status as a primary beneficiary of the AI buildout, with Azure's growth accelerating. The key narrative is the successful early monetization of AI through its Copilot ecosystem, translating massive investment into high-margin, recurring software revenue.", aiSignal: "7 percentage points of Azure's 31% growth was directly attributed to AI services." },
  { company: "Nvidia", story: "Continues its unprecedented growth streak, solidifying its near-monopoly on AI accelerators. The focus is now on the multi-year roadmap with Blackwell and Rubin architectures, suggesting a sustained period of technological and pricing power leadership.", aiSignal: "Forward guidance indicates that demand for the next-generation Blackwell platform is outstripping supply well into 2026." },
  { company: "Alphabet", story: "A strong quarter for both Cloud and Search, alleviating fears that AI would immediately disrupt its core advertising business. Google is demonstrating disciplined investment, expanding Cloud margins while defending its Search monopoly with its Gemini models.", aiSignal: "Google Cloud Platform (GCP) accelerated to 32% growth, with management citing strong demand for AI/ML workloads." },
  { company: "Amazon", story: "AWS returned to accelerating growth, signaling the end of the post-pandemic cloud optimization cycle. The narrative is a dual threat: re-acceleration in its high-margin cloud business fueled by AI, coupled with AI-driven efficiencies boosting margins in its massive retail operation.", aiSignal: "Management announced a record CapEx forecast, explicitly calling out a multi-year investment cycle to meet AWS AI demand." },
  { company: "Meta Platforms", story: "Demonstrated the power of its AI-driven advertising engine (Advantage+), which is delivering superior ROI and winning back market share. The story is one of disciplined execution in the core business funding ambitious, long-term bets on AI agents and the metaverse.", aiSignal: "Daily Active Users (DAUs) and ad impressions both grew, indicating AI is improving engagement and ad-matching." },
  { company: "Apple", story: "A stable quarter focused on shareholder returns and the highly anticipated 'Apple Intelligence' software launch. The narrative is a coiled spring: can Apple's unique on-device AI approach, focused on privacy and ecosystem integration, trigger a massive hardware upgrade supercycle?", aiSignal: "The initial developer and public beta feedback on 'Apple Intelligence' will be a critical catalyst." },
  { company: "Tesla", story: "A stark pivot away from its struggling core EV business. Management de-emphasized vehicle targets, reframing the entire company as an AI/robotics play. The investment case is now almost entirely dependent on breakthroughs in FSD and the Optimus robot.", aiSignal: "The upcoming 'Robotaxi Day' is positioned as a make-or-break catalyst to prove its AI-centric valuation." },
];

// Reusable component for section titles
const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-8 lg:mb-12">
    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">{title}</h2>
    {subtitle && <p className="mt-2 text-lg text-gray-500">{subtitle}</p>}
  </div>
);

// Component for colored keyword spans
const C = ({ children, color = 'indigo' }) => {
  const colorClasses = {
    indigo: 'text-indigo-600 font-semibold',
    green: 'text-green-700 font-semibold',
    red: 'text-red-600 font-semibold',
    amber: 'text-amber-600 font-semibold',
  };
  return <span className={colorClasses[color]}>{children}</span>;
};

export default function MagnificentSevenAnalysis() {
  const currentArticle = articles.find(article => article.slug === 'magnificent-seven-ai-titans-bubble-analysis');

  const sections = {
    'introduction': { title: 'Market Hegemony', ref: useRef(null) },
    'key-themes': { title: 'Q2 Key Themes', ref: useRef(null) },
    'earnings-summary': { title: 'Financial Snapshot', ref: useRef(null) },
    'deep-dive': { title: 'Company Deep Dives', ref: useRef(null) },
    'bubble-debate': { title: 'The AI Bubble Debate', ref: useRef(null) },
    'conclusion': { title: 'Strategic Implications', ref: useRef(null) },
  };

  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.3 };
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    Object.values(sections).forEach(section => {
      if (section.ref.current) observer.observe(section.ref.current);
    });

    return () => {
      Object.values(sections).forEach(section => {
        if (section.ref.current) observer.unobserve(section.ref.current);
      });
    };
  }, []);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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

      <div className="bg-gray-50 text-gray-700 font-sans leading-relaxed">
        <div className="container mx-auto px-4 py-8 lg:py-16">
          {/* Return to Home Button */}
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>

          {/* Deep Research Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Deep Research
            </span>
          </div>

          {/* Podcast Badge */}
          {currentArticle?.podcastUrl && (
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Music className="mr-1 h-3 w-3" />
                Podcast
              </span>
            </div>
          )}

          <header className="text-center mb-12 lg:mb-20">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tighter mb-4">The Magnificent Seven</h1>
            <p className="text-xl lg:text-2xl text-indigo-600">AI-Fueled Titans or a Bubble in the Making?</p>
          </header>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <aside className="hidden lg:block lg:col-span-3">
              <nav className="sticky top-8">
                <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-4">On this page</h3>
                <ul>
                  {Object.entries(sections).map(([key, { title, ref }]) => (
                    <li key={key}>
                      <a 
                        href={`#${key}`} 
                        onClick={(e) => { e.preventDefault(); scrollToSection(ref); }}
                        className={`block py-2 text-sm font-medium transition-all duration-200 ${
                          activeSection === key ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <main className="lg:col-span-9">
              <section id="introduction" ref={sections.introduction.ref} className="mb-16 scroll-mt-20">
                <SectionHeader title="The New Market Hegemony" subtitle="Defining the Magnificent Seven's Unprecedented Influence" />
                <div className="space-y-6 text-gray-700">
                  <p>The "Magnificent Seven" have evolved beyond mere market leaders into the fundamental pillars of the global economy. Their dominance stems from powerful moats: entrenched ecosystems, unparalleled economies of scale, and the ability to generate hundreds of billions in <C color="green">free cash flow</C>. This financial firepower enables them to self-fund a colossal wave of investment in the next technological frontier: <C>Artificial Intelligence</C>.</p>
                  <p>This extreme concentration has profound consequences. By early 2025, the group accounted for nearly <C>30% of the S&P 500's market capitalization</C>, meaning their performance disproportionately dictates returns for millions of investors. Their combined valuation now exceeds the GDP of every country except the US and China, making their quarterly earnings a macroeconomic event.</p>
                </div>
              </section>

              <section id="key-themes" ref={sections['key-themes'].ref} className="mb-16 scroll-mt-20">
                <SectionHeader title="Key Themes from Q2 Earnings" subtitle="The Overarching Narratives Driving the Market" />
                <div className="space-y-4">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900">1. The Great Bifurcation</h4>
                    <p className="text-sm text-gray-600 mt-1">A clear split has emerged between the <C>AI Enablers</C> (Nvidia, Microsoft, Alphabet, Amazon) selling the picks and shovels, and the <C>AI Application Players</C> (Apple, Meta, Tesla) seeking to build killer apps on that infrastructure. The former are seeing direct, immediate revenue, while the latter's payoff is further out.</p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900">2. The CapEx Arms Race</h4>
                    <p className="text-sm text-gray-600 mt-1">Capital expenditures are surging to historic levels as the tech titans engage in an <C color="amber">AI infrastructure arms race</C>. The combined quarterly CapEx of the group now tops <C>$50 billion</C>, a testament to the staggering demand for data centers and AI accelerators required to train and run next-generation models.</p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <h4 className="font-bold text-gray-900">3. Monetization Takes Center Stage</h4>
                    <p className="text-sm text-gray-600 mt-1">The conversation has shifted from AI potential to <C color="green">tangible monetization</C>. Investors are now demanding to see a clear return on investment. Microsoft's <C>Copilot</C> ecosystem is the leading case study, proving customers are willing to pay a premium for AI-infused software, driving both revenue and margin expansion.</p>
                  </div>
                </div>
              </section>

              <section id="earnings-summary" ref={sections['earnings-summary'].ref} className="mb-16 scroll-mt-20">
                <SectionHeader title="Q2 Financial Snapshot" subtitle="A Comparative Look at Key Performance Metrics" />
                <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 text-xs text-gray-600 uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4 font-medium">Company</th>
                        <th className="px-6 py-4 font-medium text-center">Revenue (YoY)</th>
                        <th className="px-6 py-4 font-medium text-center">Op. Margin (YoY Δ)</th>
                        <th className="px-6 py-4 font-medium text-center">EPS (YoY)</th>
                        <th className="px-6 py-4 font-medium text-center">CapEx</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {earningsData.map((item) => (
                        <tr key={item.ticker} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{item.company} ({item.ticker})</td>
                          <td className="px-6 py-4 text-center">
                            <div>{item.revenue}</div>
                            <div className={`text-xs font-bold ${item.revGrowth.startsWith('-') ? 'text-red-600' : 'text-green-700'}`}>
                              {item.revGrowth}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div>{item.opMargin}</div>
                            <div className={`text-xs font-bold ${item.opMarginChange.startsWith('-') ? 'text-red-600' : 'text-green-700'}`}>
                              {item.opMarginChange}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div>{item.eps}</div>
                            <div className={`text-xs font-bold ${item.epsGrowth.startsWith('-') ? 'text-red-600' : 'text-green-700'}`}>
                              {item.epsGrowth}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center font-mono">{item.capex}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="deep-dive" ref={sections['deep-dive'].ref} className="mb-16 scroll-mt-20">
                <SectionHeader title="Company Deep Dives" subtitle="The Narrative Behind the Numbers" />
                <div className="grid md:grid-cols-1 gap-6">
                  {companyDeepDive.map((item) => (
                    <div key={item.company} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <h4 className="text-xl font-bold text-gray-900">{item.company}</h4>
                      <p className="text-gray-600 mt-2">{item.story}</p>
                      <div className="mt-4 pt-4 border-t border-gray-200 flex items-start">
                        <Zap className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="text-sm font-semibold text-gray-800">Key AI Signal</h5>
                          <p className="text-sm text-gray-600">{item.aiSignal}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="bubble-debate" ref={sections['bubble-debate'].ref} className="mb-16 scroll-mt-20">
                <SectionHeader title="The AI Bubble Debate" subtitle="Generational Shift or Irrational Exuberance?" />
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                      <h3 className="text-xl font-bold text-gray-900">The Bull Case</h3>
                    </div>
                    <ul className="space-y-3 text-sm list-disc list-inside text-gray-600">
                      <li><C color="green">Unprecedented Profitability:</C> Unlike the dot-com era, AI leaders generate hundreds of billions in free cash flow from dominant existing businesses.</li>
                      <li><C color="green">Tangible Revenue:</C> AI is already a multi-billion dollar business for companies like Microsoft, not just a distant promise.</li>
                      <li><C color="green">Productivity Supercycle:</C> AI is a general-purpose technology, like electricity, with a potential multi-trillion dollar impact across all industries.</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <TrendingDown className="h-8 w-8 text-red-600 mr-3" />
                      <h3 className="text-xl font-bold text-gray-900">The Bear Case</h3>
                    </div>
                    <ul className="space-y-3 text-sm list-disc list-inside text-gray-600">
                      <li><C color="red">Extreme Valuations:</C> Tech sector P/E ratios are near dot-com peaks, leaving little room for disappointment. Euphoric sentiment means even stellar results can be punished.</li>
                      <li><C color="red">The "ROI Gap":</C> Growing concern that massive corporate AI spending isn't delivering measurable returns, threatening future demand.</li>
                      <li><C color="red">Margin Dilution:</C> The cost of running AI models leads to lower margins than traditional software, with fears of a technological plateau in performance gains.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="conclusion" ref={sections.conclusion.ref} className="scroll-mt-20">
                <SectionHeader title="Concluding Analysis & Strategic Implications" />
                <div className="space-y-6 text-gray-700 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <p>The Q2 2025 earnings season solidified that the Magnificent Seven are no longer a monolith. The group is bifurcating between the <C>AI enablers</C> and the <C>application players</C>. While all are investing heavily in AI, their paths to monetization and their risk profiles are diverging significantly.</p>
                  <p>The primary risk may not be a 2000-style collapse, but rather a "lost decade" of <C color="red">valuation compression</C> where earnings growth struggles to catch up to the currently priced-in euphoria. The sheer scale of these firms means the law of large numbers becomes a powerful headwind.</p>
                  <p className="font-semibold text-gray-900">For investors, the key is to move beyond the "Magnificent Seven" label and adopt a sub-theme approach, evaluating each company on its specific role—be it infrastructure, platform, or application—within the broader AI ecosystem.</p>
                </div>

                {/* Call-to-Action Section */}
                <div className="mt-12 text-center space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Continue Your Research</h3>
                    <p className="text-gray-600 mb-6">Dive deeper into this analysis with our comprehensive research document and podcast discussion.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      {currentArticle?.googleDoc && (
                        <a 
                          href={currentArticle.googleDoc}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                        >
                          Read Full Research &rarr;
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
                </div>
              </section>
            </main>
          </div>
        </div>

        <footer className="text-center py-8 mt-12 border-t border-gray-200">
          <p className="text-sm text-gray-500">Financial data is illustrative for Q2 2025 and for informational purposes only. S&P 500 weights are approximate.</p>
          <p className="text-sm text-gray-500 mt-2">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
        </footer>
      </div>
    </>
  );
}