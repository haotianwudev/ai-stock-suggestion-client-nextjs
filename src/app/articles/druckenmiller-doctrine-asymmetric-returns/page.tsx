'use client';

import { useState, useEffect } from 'react';
import { BrainCircuit, PiggyBank, Scale, TrendingUp, TrendingDown, Users, GraduationCap, Building, Landmark, AlertTriangle, Cpu, FlaskConical, Briefcase, Globe, Star, BookOpen, Quote, BarChart } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

// Helper component for consistent section titles
const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight font-serif">{children}</h2>
    {subtitle && <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">{subtitle}</p>}
  </div>
);

// Helper component for icon-adorned feature cards
const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl border border-gray-200/80 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300">
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-blue-100 text-[#A8672E] dark:text-[#D08F52] p-3 rounded-lg border border-blue-200/80">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 font-serif">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

// Timeline Component
const TimelineItem = ({ Icon, year, title, children }: { Icon: any; year: string; title: string; children: React.ReactNode }) => (
  <div className="flex items-start gap-4 md:gap-6">
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 border border-gray-200 rounded-full p-3 text-[#A8672E] dark:text-[#D08F52]">
        <Icon className="w-6 h-6" />
      </div>
      <div className="w-px h-full bg-gray-200 min-h-[100px]"></div>
    </div>
    <div>
      <p className="text-[#A8672E] dark:text-[#D08F52] font-semibold text-lg">{year}</p>
      <h4 className="text-gray-900 font-bold text-xl mb-2">{title}</h4>
      <p className="text-gray-600">{children}</p>
    </div>
  </div>
);

// Quote Card Component
const QuoteCard = ({ children, source }: { children: React.ReactNode; source: string }) => (
  <div className="bg-gray-50/80 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-6 rounded-r-lg">
    <Quote className="w-8 h-8 text-blue-200 mb-4" />
    <blockquote className="text-xl text-gray-700 italic leading-relaxed">{children}</blockquote>
    <p className="mt-4 text-right font-semibold text-gray-600">- {source}</p>
  </div>
);

export default function DruckenmillerDoctrine() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

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
    <ArticleFrame
      slug="druckenmiller-doctrine-asymmetric-returns"
      additionalDisclaimer="The strategies discussed require significant expertise and carry substantial risks. Always consult with qualified financial professionals before making investment decisions."
    >
      <main className="overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
        {/* Introduction Section */}
        <section id="introduction" className={`fade-in-section container mx-auto px-4 py-20 md:py-28 ${fadeInClass('introduction')}`}>
          <SectionTitle subtitle="From abandoning a Ph.D. to founding his own firm at 28, Druckenmiller's journey was a relentless pursuit of practical results over abstract theory.">
            The Architect of Conviction
          </SectionTitle>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                Stanley Druckenmiller&apos;s performance is not merely excellent; it&apos;s a statistical anomaly. His success is a rare fusion of prescient macroeconomic analysis, unwavering psychological discipline, and the courage to act on his convictions with immense scale.
              </p>
              <p className="text-gray-600">
                His career began with a characteristically bold move: dropping out of a Ph.D. program in economics because it was too theoretical. He famously talked his way into a job as an oil analyst at Pittsburgh National Bank despite knowing nothing about the industry. His secret weapon? He had read the bank&apos;s last 10 annual reports. Within a year, he was the head of research.
              </p>
              <p className="text-gray-600">
                This meteoric rise culminated in his legendary partnership with George Soros, who taught him the most crucial lesson: &ldquo;It&apos;s not whether you&apos;re right or wrong that&apos;s important, but how much money you make when you&apos;re right and how much you lose when you&apos;re wrong.&rdquo;
              </p>
            </div>
            <div className="space-y-6">
              <TimelineItem Icon={GraduationCap} year="1977" title="Joins Pittsburgh National Bank">
                Abandons economics Ph.D. for a practical role as an oil analyst, becoming head of research within one year.
              </TimelineItem>
              <TimelineItem Icon={Building} year="1981" title="Founds Duquesne Capital">
                Establishes his own firm at age 28, building a formidable track record that attracts the attention of the world&apos;s top investors.
              </TimelineItem>
              <TimelineItem Icon={Users} year="1988" title="Partners with George Soros">
                Becomes Lead Portfolio Manager of the Quantum Fund, where Soros taught him to scale his bets and &ldquo;go for the jugular.&rdquo;
              </TimelineItem>
              <TimelineItem Icon={Landmark} year="2010" title="Converts to Family Office">
                Closes his fund to outside money, citing the &ldquo;cumulative toll&rdquo; of maintaining his unparalleled record for clients.
              </TimelineItem>
            </div>
          </div>
        </section>

        {/* Golden Words Section */}
        <section id="golden-words" className={`fade-in-section bg-white dark:bg-[#0A0D14] py-20 md:py-28 ${fadeInClass('golden-words')}`}>
          <div className="container mx-auto px-4">
            <SectionTitle subtitle="A collection of core tenets from the man himself, revealing the mindset required for superior performance.">
              Golden Words
            </SectionTitle>
            <div className="grid md:grid-cols-2 gap-8">
              <QuoteCard source="Stanley Druckenmiller">
                The way to build superior long-term returns is through preservation of capital and home runs... When you have tremendous conviction on a trade, you have to go for the jugular.
              </QuoteCard>
              <QuoteCard source="Stanley Druckenmiller">
                Earnings don&apos;t move the overall market; it&apos;s the Federal Reserve Board... focus on the central banks, and focus on the movement of liquidity.
              </QuoteCard>
              <QuoteCard source="Stanley Druckenmiller">
                If you&apos;re early on in your career and they give you a choice between a great mentor or higher pay, take the mentor every time. It&apos;s not even close.
              </QuoteCard>
              <QuoteCard source="Stanley Druckenmiller">
                I&apos;ve learned many things from him [Soros], but perhaps the most significant is that it&apos;s not whether you&apos;re right or wrong that&apos;s important, but how much money you make when you&apos;re right and how much you lose when you&apos;re wrong.
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
                He rejects diversification for concentrated, high-conviction &ldquo;home run&rdquo; bets. This isn&apos;t just about portfolio construction; it&apos;s about conserving mental energy for the few opportunities that truly matter. &ldquo;If you really see it, put all your eggs in one basket.&rdquo;
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
            <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-2xl border border-green-200 shadow-sm shadow-green-500/5">
              <div className="flex items-center gap-4 mb-4">
                <TrendingUp className="w-8 h-8 text-[#1D8A70] dark:text-[#3CBF9C]" />
                <h3 className="text-2xl font-bold text-gray-800 font-serif">Victory: Breaking the Bank of England (1992)</h3>
              </div>
              <p className="text-gray-600 mb-4">
                The macro thesis was a flawed currency peg. The pivotal moment came when Soros challenged his position size. Druckenmiller initially had a short position equal to the size of the entire fund. Soros called this &ldquo;ridiculously small&rdquo; and urged him to bet double that. This was the ultimate &ldquo;go for the jugular&rdquo; moment.
              </p>
              <p className="text-gray-800 font-semibold">
                Result: On &ldquo;Black Wednesday,&rdquo; Britain capitulated. The Quantum Fund netted over $1 billion, and Druckenmiller cemented his legend.
              </p>
            </div>
            <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-2xl border border-red-200 shadow-sm shadow-red-500/5">
              <div className="flex items-center gap-4 mb-4">
                <TrendingDown className="w-8 h-8 text-[#BC4128] dark:text-[#E2694A]" />
                <h3 className="text-2xl font-bold text-gray-800 font-serif">Defeat: The Dot-Com Meltdown (2000)</h3>
              </div>
              <p className="text-gray-600 mb-4">
                A failure of psychology. After correctly identifying the bubble and selling, the fear of missing out (FOMO) drove him to capitulate. He watched young traders make easy money and couldn&apos;t stand it. He bought $6 billion in tech stocks at the absolute peak.
              </p>
              <p className="text-gray-800 font-semibold">
                Result: Lost $3 billion in six weeks. &ldquo;I was just an emotional basket case and couldn&apos;t help myself.&rdquo; A powerful lesson that discipline is worthless if it breaks.
              </p>
            </div>
          </div>
        </section>

        {/* Recent Performance Section */}
        <section id="recent-performance" className={`fade-in-section bg-white dark:bg-[#0A0D14] py-20 md:py-28 ${fadeInClass('recent-performance')}`}>
          <div className="container mx-auto px-4">
            <SectionTitle subtitle="While Duquesne is a private family office with no public returns, we can analyze 13F filings and public commentary to infer recent performance and strategy.">
              Recent Performance & Outlook
            </SectionTitle>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-gray-50 border border-gray-200 p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <BarChart className="w-8 h-8 text-[#A8672E] dark:text-[#D08F52]" />
                  <h3 className="text-2xl font-bold text-gray-800 font-serif">13F Portfolio Performance</h3>
                </div>
                <p className="text-5xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-2">~29%</p>
                <p className="text-gray-600 font-semibold mb-4">1-Year Estimated Return</p>
                <p className="text-sm text-gray-500">
                  <span className="font-bold">Disclaimer:</span> This is a hypothetical return calculated by third parties based *only* on the publicly disclosed long U.S. stock positions from 13F filings. It is not the official performance of the Duquesne Family Office and excludes shorts, international assets, and other instruments.
                </p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FeatureCard icon={<Cpu className="w-6 h-6" />} title="Nuanced AI Bet">
                  Expressed that AI is &ldquo;overhyped short-term, under-hyped long-term.&rdquo; He profited massively from Nvidia but sold early, pivoting to &ldquo;picks and shovels&rdquo; like TSMC.
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
                <h4 className="font-bold text-lg mb-1 text-yellow-900">Analyst&apos;s Caveat</h4>
                <p>13F filings are delayed up to 45 days and exclude crucial data like short positions, non-U.S. holdings, and commodities. They are a starting point for research, not a shopping list.</p>
              </div>
            </div>
            <div className="overflow-x-auto bg-white dark:bg-[#0A0D14] border border-gray-200 rounded-lg">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr>
                    <th className="p-4 bg-gray-100 text-gray-600 font-semibold rounded-tl-lg">Security (Ticker)</th>
                    <th className="p-4 bg-gray-100 text-gray-600 font-semibold">% of Portfolio</th>
                    <th className="p-4 bg-gray-100 text-gray-600 font-semibold">Position Change</th>
                    <th className="p-4 bg-gray-100 text-gray-600 font-semibold rounded-tr-lg">Analyst&apos;s Note</th>
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
                Sold high-valuation Palantir (PLTR) while quintupling his stake in Taiwan Semiconductor (TSM). A pivot from hype to the foundational &ldquo;picks and shovels&rdquo; of the AI ecosystem.
              </FeatureCard>
              <FeatureCard icon={<FlaskConical className="w-6 h-6" />} title="Contrarian & Deep Value">
                Large, increased position in Teva (TEVA). A classic bet on a beaten-down company showing signs of a turnaround the market hasn&apos;t priced in yet.
              </FeatureCard>
              <FeatureCard icon={<Briefcase className="w-6 h-6" />} title="Shifting Market Outlook">
                A sharp reduction in total holdings signals a cautious macro view. Preserving capital and concentrating firepower on only the highest-conviction ideas.
              </FeatureCard>
            </div>
          </div>
        </section>

        {/* Key Lessons Section */}
        <section id="key-lessons" className={`fade-in-section bg-white dark:bg-[#0A0D14] py-20 md:py-28 ${fadeInClass('key-lessons')}`}>
          <div className="container mx-auto px-4">
            <SectionTitle subtitle="The actionable insights that separate legendary performance from mediocrity.">
              The Druckenmiller Playbook
            </SectionTitle>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border border-blue-200 p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <Star className="w-8 h-8 text-[#A8672E] dark:text-[#D08F52]" />
                  <h3 className="text-2xl font-bold text-gray-800 font-serif">Investment Philosophy</h3>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#A8672E] dark:bg-[#D08F52] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Focus on macro themes and central bank policy over individual stock picking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#A8672E] dark:bg-[#D08F52] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Concentrate capital in high-conviction ideas rather than diversifying</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#A8672E] dark:bg-[#D08F52] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Scale position sizes based on conviction level and risk-reward asymmetry</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#A8672E] dark:bg-[#D08F52] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Preserve capital through swift loss-cutting and flexible positioning</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 border border-green-200 p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <BookOpen className="w-8 h-8 text-[#1D8A70] dark:text-[#3CBF9C]" />
                  <h3 className="text-2xl font-bold text-gray-800 font-serif">Psychological Framework</h3>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Maintain intellectual humility and willingness to admit mistakes quickly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Guard against emotional decision-making, especially FOMO and hubris</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Focus on learning from failures rather than celebrating successes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Develop mental flexibility to change positions when thesis breaks down</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ArticleFrame>
  );
}
