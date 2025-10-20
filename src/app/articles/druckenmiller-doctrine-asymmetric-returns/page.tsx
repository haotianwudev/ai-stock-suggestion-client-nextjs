'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, PiggyBank, Scale, TrendingUp, TrendingDown, Users, GraduationCap, Building, Landmark, AlertTriangle, Cpu, FlaskConical, Briefcase, Globe, Star, BookOpen, Zap, Quote, BarChart } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Helper component for consistent section titles
const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">{children}</h2>
    {subtitle && <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">{subtitle}</p>}
  </div>
);

// Helper component for icon-adorned feature cards
const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300">
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-blue-100 text-blue-600 p-3 rounded-lg border border-blue-200/80">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

// Timeline Component
const TimelineItem = ({ Icon, year, title, children }: { Icon: any; year: string; title: string; children: React.ReactNode }) => (
  <div className="flex items-start gap-4 md:gap-6">
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 border border-gray-200 rounded-full p-3 text-blue-600">
        <Icon className="w-6 h-6" />
      </div>
      <div className="w-px h-full bg-gray-200 min-h-[100px]"></div>
    </div>
    <div>
      <p className="text-blue-600 font-semibold text-lg">{year}</p>
      <h4 className="text-gray-900 font-bold text-xl mb-2">{title}</h4>
      <p className="text-gray-600">{children}</p>
    </div>
  </div>
);

// Quote Card Component
const QuoteCard = ({ children, source }: { children: React.ReactNode; source: string }) => (
  <div className="bg-gray-50/80 border-l-4 border-blue-500 p-6 rounded-r-lg">
    <Quote className="w-8 h-8 text-blue-200 mb-4" />
    <blockquote className="text-xl text-gray-700 italic leading-relaxed">{children}</blockquote>
    <p className="mt-4 text-right font-semibold text-gray-600">- {source}</p>
  </div>
);

export default function DruckenmillerDoctrine() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const currentArticle = articles.find(article => article.slug === 'druckenmiller-doctrine-asymmetric-returns');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const fadeInClass = (id: string) =>
    `transition-opacity duration-1000 ease-in ${isVisible[id] ? 'opacity-100' : 'opacity-0'}`;

  const portfolioData = [
    { name: 'Natera, Inc. (NTRA)', portfolio_pct: '13.4%', change: 'Decreased', note: 'Large, concentrated bet on a leader in genetic testing, likely a long-term innovation theme.' },
    { name: 'Woodward, Inc. (WWD)', portfolio_pct: '8.3%', change: 'Decreased', note: 'Position in an aerospace and industrial controls manufacturer, possibly a play on industrial cycles.' },
    { name: 'Coupang, Inc. (CPNG)', portfolio_pct: '7.8%', change: 'Increased', note: 'A significant position in a South Korean e-commerce giant, reflecting a global consumer theme.' },
    { name: 'Teva Pharmaceutical (TEVA)', portfolio_pct: '6.7%', change: 'Increased', note: 'Classic contrarian bet on a beaten-down pharmaceutical company showing signs of a turnaround.' },
    { name: 'Taiwan Semiconductor (TSM)', portfolio_pct: '4.1%', change: 'Increased', note: 'Massive increase in the world\'s leading chip fabricator, a "picks and shovels" play on the AI revolution.' },
    { name: 'Palantir Technologies (PLTR)', portfolio_pct: '0%', change: 'Sold Out', note: 'Complete exit from a high-flying AI software company, suggesting concerns about short-term valuation.' },
  ];

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

      <div className="bg-gray-50 min-h-screen font-sans text-gray-700">
        {/* Return to Home Button */}
        <div className="container mx-auto px-4 pt-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Deep Research
          </span>
        </div>

        <main className="overflow-hidden">
          {/* Hero Section */}
          <section id="hero" className="relative h-[80vh] md:h-screen flex items-center justify-center text-center p-4 bg-white">
            <div className="absolute inset-0 bg-grid-gray-200/50 [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tighter mb-6 leading-tight">
                The Druckenmiller Doctrine
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                An exploration of the macro titan who mastered the art of asymmetric returns, turning concentrated conviction into a 30-year, 30% average annual return without a single down year.
              </p>
            </div>
          </section>

          {/* Introduction Section */}
          <section id="introduction" className={`fade-in-section container mx-auto px-4 py-20 md:py-28 ${fadeInClass('introduction')}`}>
            <SectionTitle subtitle="From abandoning a Ph.D. to founding his own firm at 28, Druckenmiller's journey was a relentless pursuit of practical results over abstract theory.">
              The Architect of Conviction
            </SectionTitle>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700">
                  Stanley Druckenmiller's performance is not merely excellent; it's a statistical anomaly. His success is a rare fusion of prescient macroeconomic analysis, unwavering psychological discipline, and the courage to act on his convictions with immense scale.
                </p>
                <p className="text-gray-600">
                  His career began with a characteristically bold move: dropping out of a Ph.D. program in economics because it was too theoretical. He famously talked his way into a job as an oil analyst at Pittsburgh National Bank despite knowing nothing about the industry. His secret weapon? He had read the bank's last 10 annual reports. Within a year, he was the head of research.
                </p>
                <p className="text-gray-600">
                  This meteoric rise culminated in his legendary partnership with George Soros, who taught him the most crucial lesson: "It's not whether you're right or wrong that's important, but how much money you make when you're right and how much you lose when you're wrong."
                </p>
              </div>
              <div className="space-y-6">
                <TimelineItem Icon={GraduationCap} year="1977" title="Joins Pittsburgh National Bank">
                  Abandons economics Ph.D. for a practical role as an oil analyst, becoming head of research within one year.
                </TimelineItem>
                <TimelineItem Icon={Building} year="1981" title="Founds Duquesne Capital">
                  Establishes his own firm at age 28, building a formidable track record that attracts the attention of the world's top investors.
                </TimelineItem>
                <TimelineItem Icon={Users} year="1988" title="Partners with George Soros">
                  Becomes Lead Portfolio Manager of the Quantum Fund, where Soros taught him to scale his bets and "go for the jugular."
                </TimelineItem>
                <TimelineItem Icon={Landmark} year="2010" title="Converts to Family Office">
                  Closes his fund to outside money, citing the "cumulative toll" of maintaining his unparalleled record for clients.
                </TimelineItem>
              </div>
            </div>
          </section>

          {/* Golden Words Section */}
          <section id="golden-words" className={`fade-in-section bg-white py-20 md:py-28 ${fadeInClass('golden-words')}`}>
            <div className="container mx-auto px-4">
              <SectionTitle subtitle="A collection of core tenets from the man himself, revealing the mindset required for superior performance.">
                Golden Words
              </SectionTitle>
              <div className="grid md:grid-cols-2 gap-8">
                <QuoteCard source="Stanley Druckenmiller">
                  The way to build superior long-term returns is through preservation of capital and home runs... When you have tremendous conviction on a trade, you have to go for the jugular.
                </QuoteCard>
                <QuoteCard source="Stanley Druckenmiller">
                  Earnings don't move the overall market; it's the Federal Reserve Board... focus on the central banks, and focus on the movement of liquidity.
                </QuoteCard>
                <QuoteCard source="Stanley Druckenmiller">
                  If you're early on in your career and they give you a choice between a great mentor or higher pay, take the mentor every time. It's not even close.
                </QuoteCard>
                <QuoteCard source="Stanley Druckenmiller">
                  I've learned many things from him [Soros], but perhaps the most significant is that it's not whether you're right or wrong that's important, but how much money you make when you're right and how much you lose when you're wrong.
                </QuoteCard>
              </div>
            </div>
          </section>

          {/* Core Philosophy Section */}
          <section id="philosophy" className={`fade-in-section bg-gray-50 py-20 md:py-28 ${fadeInClass('philosophy')}`}>
            <div className="container mx-auto px-4">
              <SectionTitle subtitle="A deeply integrated, four-pillar system where a failure in one risks the collapse of the entire structure.">
                A Framework for Superior Returns
              </SectionTitle>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                <FeatureCard icon={<Globe className="w-6 h-6" />} title="Macro-Centric Worldview">
                  His process is top-down, focusing on central banks and liquidity. <strong>Example:</strong> His massive bet on the German Mark after the fall of the Berlin Wall was based on anticipating the inflationary impact of reunification, a macro event the market underestimated.
                </FeatureCard>
                <FeatureCard icon={<PiggyBank className="w-6 h-6" />} title="The Courage to Be a 'Pig'">
                  He rejects diversification for concentrated, high-conviction "home run" bets. This isn't just about portfolio construction; it's about conserving mental energy for the few opportunities that truly matter. "If you really see it, put all your eggs in one basket."
                </FeatureCard>
                <FeatureCard icon={<Scale className="w-6 h-6" />} title="Asymmetric Risk & Capital Preservation">
                  Aggression is balanced by cutting losses swiftly. <strong>Example:</strong> The night before the 1987 crash, he went from 130% long to net short, sensing a change in the market. This flexibility allowed him to profit from the crash instead of being wiped out.
                </FeatureCard>
                <FeatureCard icon={<BrainCircuit className="w-6 h-6" />} title="Psychological Mastery">
                  The system is enabled by mental flexibility, humility, and discipline. He believes the best investors want to talk about their mistakes, not their wins, as a way to constantly learn and guard against the ultimate sin: hubris.
                </FeatureCard>
              </div>
            </div>
          </section>    
      {/* Case Studies Section */}
          <section id="case-studies" className={`fade-in-section container mx-auto px-4 py-20 md:py-28 ${fadeInClass('case-studies')}`}>
            <SectionTitle subtitle="The principles of the doctrine are best understood through the lens of his most celebrated victory and his most candidly admitted failure.">
              Legends of the Trade
            </SectionTitle>
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              <div className="bg-white p-8 rounded-2xl border border-green-200 shadow-sm shadow-green-500/5">
                <div className="flex items-center gap-4 mb-4">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                  <h3 className="text-2xl font-bold text-gray-800">Victory: Breaking the Bank of England (1992)</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  The macro thesis was a flawed currency peg. The pivotal moment came when Soros challenged his position size. Druckenmiller initially had a short position equal to the size of the entire fund. Soros called this "ridiculously small" and urged him to bet double that. This was the ultimate "go for the jugular" moment.
                </p>
                <p className="text-gray-800 font-semibold">
                  Result: On "Black Wednesday," Britain capitulated. The Quantum Fund netted over $1 billion, and Druckenmiller cemented his legend.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-red-200 shadow-sm shadow-red-500/5">
                <div className="flex items-center gap-4 mb-4">
                  <TrendingDown className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold text-gray-800">Defeat: The Dot-Com Meltdown (2000)</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  A failure of psychology. After correctly identifying the bubble and selling, the fear of missing out (FOMO) drove him to capitulate. He watched young traders make easy money and couldn't stand it. He bought $6 billion in tech stocks at the absolute peak.
                </p>
                <p className="text-gray-800 font-semibold">
                  Result: Lost $3 billion in six weeks. "I was just an emotional basket case and couldn't help myself." A powerful lesson that discipline is worthless if it breaks.
                </p>
              </div>
            </div>
          </section>

          {/* Recent Performance Section */}
          <section id="recent-performance" className={`fade-in-section bg-white py-20 md:py-28 ${fadeInClass('recent-performance')}`}>
            <div className="container mx-auto px-4">
              <SectionTitle subtitle="While Duquesne is a private family office with no public returns, we can analyze 13F filings and public commentary to infer recent performance and strategy.">
                Recent Performance & Outlook
              </SectionTitle>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-gray-50 border border-gray-200 p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <BarChart className="w-8 h-8 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-800">13F Portfolio Performance</h3>
                  </div>
                  <p className="text-5xl font-bold text-blue-600 mb-2">~29%</p>
                  <p className="text-gray-600 font-semibold mb-4">1-Year Estimated Return</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">Disclaimer:</span> This is a hypothetical return calculated by third parties based *only* on the publicly disclosed long U.S. stock positions from 13F filings. It is not the official performance of the Duquesne Family Office and excludes shorts, international assets, and other instruments.
                  </p>
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <FeatureCard icon={<Cpu className="w-6 h-6" />} title="Nuanced AI Bet">
                    Expressed that AI is "overhyped short-term, under-hyped long-term." He profited massively from Nvidia but sold early, pivoting to "picks and shovels" like TSMC.
                  </FeatureCard>
                  <FeatureCard icon={<Briefcase className="w-6 h-6" />} title="Cautious Macro Stance">
                    Signaled a defensive posture by significantly reducing the number of holdings in his portfolio, from 78 to 52 in a single quarter, concentrating capital in his highest-conviction ideas.
                  </FeatureCard>
                </div>
              </div>
            </div>
          </section>

          {/* 13F Analysis Section */}
          <section id="13f-analysis" className={`fade-in-section bg-gray-50 py-20 md:py-28 ${fadeInClass('13f-analysis')}`}>
            <div className="container mx-auto px-4">
              <SectionTitle subtitle="Use 13F filings to reverse-engineer macro themes, not as a direct answer key. They are a flawed mirror, delayed and incomplete.">
                Copying the Homework
              </SectionTitle>
              <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-6 rounded-2xl mb-12 max-w-4xl mx-auto flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 mt-1 flex-shrink-0 text-yellow-500" />
                <div>
                  <h4 className="font-bold text-lg mb-1 text-yellow-900">Analyst's Caveat</h4>
                  <p>13F filings are delayed up to 45 days and exclude crucial data like short positions, non-U.S. holdings, and commodities. They are a starting point for research, not a shopping list.</p>
                </div>
              </div>
              <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg">
                <table className="w-full min-w-[700px] text-left">
                  <thead>
                    <tr>
                      <th className="p-4 bg-gray-100 text-gray-600 font-semibold rounded-tl-lg">Security (Ticker)</th>
                      <th className="p-4 bg-gray-100 text-gray-600 font-semibold">% of Portfolio</th>
                      <th className="p-4 bg-gray-100 text-gray-600 font-semibold">Position Change</th>
                      <th className="p-4 bg-gray-100 text-gray-600 font-semibold rounded-tr-lg">Analyst's Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {portfolioData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="p-4 font-medium text-gray-800">{item.name}</td>
                        <td className="p-4 text-gray-600">{item.portfolio_pct}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                            item.change === 'Increased' ? 'bg-green-100 text-green-800' :
                            item.change === 'Decreased' ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-800'
                          }`}>
                            {item.change}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600 max-w-md">{item.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-12 grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                <FeatureCard icon={<Cpu className="w-6 h-6" />} title="Nuanced AI Exposure">
                  Sold high-valuation Palantir (PLTR) while quintupling his stake in Taiwan Semiconductor (TSM). A pivot from hype to the foundational "picks and shovels" of the AI ecosystem.
                </FeatureCard>
                <FeatureCard icon={<FlaskConical className="w-6 h-6" />} title="Contrarian & Deep Value">
                  Large, increased position in Teva (TEVA). A classic bet on a beaten-down company showing signs of a turnaround the market hasn't priced in yet.
                </FeatureCard>
                <FeatureCard icon={<Briefcase className="w-6 h-6" />} title="Shifting Market Outlook">
                  A sharp reduction in total holdings signals a cautious macro view. Preserving capital and concentrating firepower on only the highest-conviction ideas.
                </FeatureCard>
              </div>
            </div>
          </section>

          {/* Key Lessons Section */}
          <section id="key-lessons" className={`fade-in-section bg-white py-20 md:py-28 ${fadeInClass('key-lessons')}`}>
            <div className="container mx-auto px-4">
              <SectionTitle subtitle="The actionable insights that separate legendary performance from mediocrity.">
                The Druckenmiller Playbook
              </SectionTitle>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-50 border border-blue-200 p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <Star className="w-8 h-8 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-800">Investment Philosophy</h3>
                  </div>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Focus on macro themes and central bank policy over individual stock picking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Concentrate capital in high-conviction ideas rather than diversifying</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Scale position sizes based on conviction level and risk-reward asymmetry</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Preserve capital through swift loss-cutting and flexible positioning</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <BookOpen className="w-8 h-8 text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-800">Psychological Framework</h3>
                  </div>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Maintain intellectual humility and willingness to admit mistakes quickly</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Guard against emotional decision-making, especially FOMO and hubris</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Focus on learning from failures rather than celebrating successes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Develop mental flexibility to change positions when thesis breaks down</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Master the Art of Asymmetric Returns
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                The Druckenmiller Doctrine isn't just about making money—it's about developing the intellectual framework and psychological discipline to compound wealth over decades.
              </p>
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  <BookOpen className="inline mr-2" />
                  Read Full Research Document
                </a>
              )}
            </div>
          </section>

          {/* Educational Disclaimer */}
          <section className="bg-yellow-50 border-t border-yellow-200 py-8">
            <div className="container mx-auto px-4">
              <div className="flex items-start gap-4 max-w-4xl mx-auto">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-2">Educational Content Disclaimer</p>
                  <p>
                    This analysis is for educational purposes only and should not be considered investment advice. 
                    Past performance does not guarantee future results. The strategies discussed require significant 
                    expertise and carry substantial risks. Always consult with qualified financial professionals 
                    before making investment decisions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4 text-center">
              <p className="text-lg mb-4">© 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.</p>
              <p className="text-gray-400">
                Exploring the intersection of quantitative analysis, behavioral psychology, and market dynamics.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
