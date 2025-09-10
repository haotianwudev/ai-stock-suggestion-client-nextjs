'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronsDown, BookOpen, TrendingUp, TrendingDown, Users, DollarSign, BrainCircuit, Shield, Banknote, Building2, Layers, CheckCircle, XCircle, ArrowRight, Book, AlertTriangle, Lightbulb, Repeat, GitCommit } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Main App Component
export default function MarketCycleSummaryPage() {
  const [scrollY, setScrollY] = useState(0);
  const currentArticle = articles.find(article => article.slug === 'mastering-market-cycle-howard-marks-summary');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionsRef = useRef(null);
  const scrollToSections = () => {
    sectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      
      <div className="bg-slate-50 text-slate-800 font-sans antialiased">
        {/* Return to Home Button */}
        <div className="container mx-auto px-4 pt-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        <main className="overflow-x-hidden">
          {/* Hero Section */}
          <section className="relative h-screen w-full flex flex-col items-center justify-center text-white text-center p-4 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-500 ease-in-out"
              style={{ 
                backgroundImage: 'url(https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2070&q=80)',
                transform: `scale(${1 + scrollY * 0.0001})`
              }}
            >
              <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
            </div>

            {/* Book Summary Badge */}
            <div className="absolute top-8 left-8 z-20">
              <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                Book Summary
              </div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 animate-fade-in-up">
              <div className="w-52 md:w-64 flex-shrink-0">
                {/* Book cover */}
                <div className="bg-white rounded-lg shadow-2xl p-2 transform transition-transform hover:scale-105">
                  <div className="bg-slate-800 text-white rounded p-4 h-72 md:h-80 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-amber-300">Howard Marks</p>
                      <h2 className="text-xl md:text-2xl font-bold leading-tight mt-1">MASTERING THE MARKET CYCLE</h2>
                    </div>
                    <div className="w-full h-px bg-amber-300 my-2"></div>
                    <p className="text-sm font-light text-slate-300">Getting the Odds on Your Side</p>
                    <div className="flex justify-center items-center mt-4">
                      <svg width="80" height="80" viewBox="0 0 100 100" className="text-amber-300 opacity-80">
                        <path d="M50 10 C 27.9 10, 10 27.9, 10 50 C 10 72.1, 27.9 90, 50 90" fill="none" stroke="currentColor" strokeWidth="4"/>
                        <path d="M50 10 C 72.1 10, 90 27.9, 90 50 C 90 72.1, 72.1 90, 50 90" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="10 10"/>
                        <path d="M10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 4"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-xl text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">Mastering the Market Cycle</h1>
                <p className="mt-4 text-lg md:text-xl text-slate-300">An interactive summary of <span className="text-amber-300 font-semibold">Howard Marks'</span> essential guide to understanding market behavior and "getting the odds on your side."</p>
                <button onClick={scrollToSections} className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-amber-400 text-slate-900 font-bold rounded-full text-lg shadow-lg hover:bg-amber-300 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50">
                  <BookOpen size={20} />
                  Explore the Summary
                </button>
              </div>
            </div>
            <div onClick={scrollToSections} className="absolute bottom-10 z-10 cursor-pointer animate-bounce">
              <ChevronsDown size={48} className="text-white opacity-70" />
            </div>
          </section>

          {/* Content Sections */}
          <div ref={sectionsRef} className="container mx-auto px-4 py-16 md:py-24 space-y-24">
            {/* Section: Why Study Cycles? */}
            <Section title="Why Study Cycles?" subtitle="The Most Important Thing">
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Howard Marks' central thesis is that while we can't predict the macro future, we can gain a crucial advantage by understanding where we are in the present cycle. The key is to shift focus from <strong className="text-slate-900">forecasting</strong> to <strong className="text-slate-900">assessing</strong>. By recognizing recurring patterns, we can adjust our investment stance to align with the probabilities.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <InfoCard icon={<TrendingUp className="text-emerald-500" />} title="Be Aggressive">
                  When the odds are in our favor—markets are low, fear is high, and valuations are cheap—we can increase our bets on more aggressive investments.
                </InfoCard>
                <InfoCard icon={<TrendingDown className="text-red-500" />} title="Be Defensive">
                  When the odds are against us—markets are high, greed is rampant, and valuations are stretched—we can take money off the table and increase defensiveness.
                </InfoCard>
              </div>
              <StoryCard 
                title="The Lottery Bowl Analogy"
                story="Imagine a bowl with 70 black balls and 30 white balls. You don't know which color will be picked next, but you know the odds favor black. A superior investor, Marks says, has a better sense of the ratio of balls in the bowl. They don't know the future, but they understand the tendencies, allowing them to bet intelligently."
              />
            </Section>

            {/* Section: The Nature of Cycles */}
            <Section title="The Nature of Cycles" subtitle="Cause and Effect">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="w-full lg:w-1/2">
                  <p className="text-lg text-slate-600 leading-relaxed mb-4">
                    Cycles are not just a series of events; they are a <strong className="text-slate-900">chain reaction</strong>. Each phase <strong className="text-slate-900">causes</strong> the next. A boom, with its excessive optimism and easy credit, contains the seeds of the following bust. A bust, with its pervasive pessimism and forced selling, lays the groundwork for the next boom.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Marks uses the metaphor of a pendulum, which spends very little time at its 'happy medium' and is almost always swinging toward an extreme. This relentless oscillation is primarily driven by the ups and downs of human psychology.
                  </p>
                  <Quote 
                    text="History doesn't repeat itself, but it does rhyme." 
                    author="Mark Twain (reputed)"
                    className="mt-6"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="bg-white p-4 rounded-lg shadow-md border border-slate-200">
                    <CycleDiagram />
                  </div>
                </div>
              </div>
            </Section>

            {/* Section: The Key Cycles */}
            <Section title="The Key Cycles" subtitle="Understanding the Components">
              <p className="text-lg text-slate-600 leading-relaxed text-center max-w-3xl mx-auto mb-12">
                The overall market cycle is a combination of several distinct, yet interconnected, cycles. Understanding each one helps build a complete picture of the investment environment.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <DollarSign />,
                    title: "The Economic Cycle",
                    description: "The natural fluctuation of the economy between expansion and contraction, forming the fundamental backdrop for all market activity.",
                    details: [
                      "Long-term <strong>'secular' growth</strong> is driven by fundamentals like population and productivity, and is relatively stable.",
                      "Short-term cycles oscillate around this trend, driven by shifts in spending, inventory, and <strong>consumer/business confidence</strong>.",
                      "Human psychology plays a key role: expectations can become <strong>self-fulfilling</strong>. Widespread optimism leads to spending, which fuels actual growth."
                    ]
                  },
                  {
                    icon: <TrendingUp />,
                    title: "The Profit Cycle",
                    description: "Corporate profits are far more volatile than the overall economy, amplifying the ups and downs of the economic cycle.",
                    details: [
                      "<strong>Operating Leverage</strong>: Fixed costs mean that as sales rise, profits rise much faster. The reverse is true in downturns, causing profits to plummet.",
                      "<strong>Financial Leverage</strong>: Companies with debt see magnified swings in net income, as interest payments are fixed regardless of operating profit.",
                      "This high volatility in profits creates significant opportunities and risks for equity investors."
                    ]
                  },
                  {
                    icon: <BrainCircuit />,
                    title: "The Psychology Pendulum",
                    description: "Perhaps the most critical cycle. Investor mood swings between euphoria and depression, greed and fear, driving markets to irrational extremes.",
                    details: [
                      "The market spends very little time at a rational <strong>'happy medium'</strong> and is almost always swinging toward an extreme.",
                      "At the peak, investors are greedy, credulous, and risk-tolerant, focusing only on <strong>positive news</strong>.",
                      "At the bottom, investors are fearful, skeptical, and risk-averse, interpreting all news <strong>negatively</strong>, which creates bargains."
                    ]
                  },
                  {
                    icon: <Shield />,
                    title: "Attitudes Toward Risk",
                    description: "Risk perception is not constant; it's cyclical. This cycle determines the 'price of risk' in the market.",
                    details: [
                      "In good times, investors become complacent and <strong>risk-tolerant</strong>. They demand less compensation for risk, leading to high asset prices.",
                      "Marks' key warning: 'The greatest source of investment risk is the belief that <strong>there is no risk</strong>.'",
                      "In bad times, investors become excessively <strong>risk-averse</strong>, creating opportunities where potential returns are high relative to the true risk."
                    ]
                  },
                  {
                    icon: <Banknote />,
                    title: "The Credit Cycle",
                    description: "The 'credit window' oscillates between easy and tight conditions, acting as a powerful accelerant for other cycles.",
                    details: [
                      "When open: Lenders compete in a <strong>'race to the bottom,'</strong> lowering standards and financing ever-riskier deals, fueling booms.",
                      "When slammed shut: Credit becomes unavailable. This can cause a crisis but creates <strong>immense bargains</strong> for those with capital.",
                      "Marks considers this one of the most reliable and observable cycles for gauging market temperature."
                    ]
                  },
                  {
                    icon: <Building2 />,
                    title: "The Real Estate Cycle",
                    description: "A classic boom-bust cycle, exaggerated by the long lead times inherent in property development.",
                    details: [
                      "Boom times lead to widespread construction, but projects take <strong>years to complete</strong>.",
                      "A glut of new properties often hits the market just as the economic cycle is turning down, causing prices to <strong>crash</strong>.",
                      "The subsequent halt in construction creates a shortage, setting the stage for the <strong>next boom</strong> when demand recovers."
                    ]
                  }
                ].map((cycle, index) => (
                  <CycleCard
                    key={index}
                    icon={cycle.icon}
                    title={cycle.title}
                    description={cycle.description}
                    details={cycle.details}
                  />
                ))}
              </div>
            </Section>

            {/* Section: Putting It All Together */}
            <Section title="The Market Cycle in Action" subtitle="Tops, Bottoms, and Human Folly">
              <p className="text-lg text-slate-600 leading-relaxed text-center max-w-3xl mx-auto mb-12">
                The interaction of these cycles creates the overall market cycle. Marks provides powerful frameworks for identifying the psychological states that define market extremes.
              </p>
              <div className="space-y-10">
                <ThreeStagesOfBullMarket />
                <StoryCard 
                  title="The Genius Who Lost a Fortune: Sir Isaac Newton"
                  story="Even one of history's greatest minds was not immune to market psychology. Sir Isaac Newton was an early investor in the South Sea Company, selling his shares for a handsome £7,000 profit as the bubble inflated. But he couldn't bear watching his friends get richer. He bought back in at the very top of the market and lost £20,000—a massive sum at the time. A timeless lesson in the pain of missing out and the danger of capitulation."
                />
              </div>
            </Section>

            <Section title="How to Cope" subtitle="Positioning for the Probabilities">
              <p className="text-lg text-slate-600 leading-relaxed text-center max-w-3xl mx-auto mb-12">
                Armed with an understanding of cycles, how should we act? The goal is to position our portfolios to have the wind at our back. This means calibrating our aggressiveness and defensiveness based on our assessment of the current environment.
              </p>
              <MarketTemperatureChecklist />
              <Quote 
                text="To buy when others are despondently selling and sell when others are greedily buying requires the greatest fortitude and pays the greatest reward." 
                author="Sir John Templeton"
                className="mt-10"
              />
            </Section>

            {/* Section: The Future of Cycles */}
            <Section title="The Future of Cycles" subtitle="It's Never Different This Time">
              <p className="text-lg text-slate-600 leading-relaxed text-center max-w-3xl mx-auto mb-12">
                A recurring theme in market manias is the belief that "this time it's different"—that a new paradigm has rendered old rules of valuation and risk obsolete. Marks argues this is one of the most dangerous phrases in investing.
              </p>
              <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-slate-200">
                <div className="flex justify-center mb-4">
                  <Repeat className="text-amber-500" size={40}/>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 text-slate-900">Cycles Will Never End</h3>
                <p className="text-slate-600 leading-relaxed">
                  Why? Because they are not caused by mechanical or scientific laws, but by <strong className="text-slate-800">human nature</strong>. People will always bring emotion, inconsistency, and fallibility to their decisions. They will swing from greed to fear, extrapolate recent trends, and go to excess. As long as humans are involved in markets, cycles are inevitable.
                </p>
              </div>
            </Section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-800 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <Book className="mx-auto mb-4 h-10 w-10 text-amber-300"/>
            <h3 className="text-2xl font-bold">Mastering the Market Cycle</h3>
            <p className="text-slate-400 mt-2">By Howard Marks</p>
            <p className="mt-4 max-w-2xl mx-auto text-slate-400">
              This website provides a summary of the key concepts from the book. For a full, in-depth understanding, we highly recommend reading the original work.
            </p>
            <a 
              href="https://www.amazon.com/Mastering-Market-Cycle-Getting-Odds/dp/1328479255" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-6 inline-flex items-center gap-2 px-6 py-2 bg-slate-100 text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-colors"
            >
              Buy the Book <ArrowRight size={16} />
            </a>
            <div className="mt-8 pt-8 border-t border-slate-700">
              <p className="text-slate-400 text-sm">
                © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// Sub-components
const Section = ({ title, subtitle, children }) => (
  <section className="scroll-mt-20">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">{title}</h2>
      <p className="mt-2 text-lg text-amber-500 font-semibold">{subtitle}</p>
    </div>
    <div>{children}</div>
  </section>
);

const InfoCard = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-shadow h-full">
    <div className="flex items-center gap-4">
      <div className="bg-slate-100 p-3 rounded-full">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
    </div>
    <p className="mt-4 text-slate-600">{children}</p>
  </div>
);

const StoryCard = ({ title, story }) => (
  <div className="mt-8 bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
    <h4 className="font-bold text-lg text-amber-800 flex items-center gap-2">
      <Lightbulb size={20}/>
      {title}
    </h4>
    <p className="mt-2 text-slate-700 leading-relaxed">{story}</p>
  </div>
);

const CycleCard = ({ icon, title, description, details }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 transform transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col">
      <div className="flex items-center justify-center h-16 w-16 bg-amber-100 text-amber-600 rounded-full mx-auto">
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <h3 className="text-center text-xl font-bold mt-5 text-slate-900">{title}</h3>
      <p className="text-center text-slate-600 mt-2 text-sm leading-relaxed flex-grow">{description}</p>
      <div className="mt-4 pt-4 border-t border-slate-200">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="w-full text-sm font-semibold text-amber-600 hover:text-amber-800 transition-colors flex items-center justify-center gap-1"
        >
          {isOpen ? 'Show Less' : 'More Details'}
          <ChevronsDown size={16} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <ul className="mt-4 space-y-2 text-left text-sm text-slate-600 list-disc pl-5 animate-fade-in-up">
            {details.map((detail, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: detail }}></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const CycleDiagram = () => (
  <div className="w-full text-xs text-slate-500">
    <div className="relative">
      <svg viewBox="0 0 300 120">
        <line x1="0" y1="90" x2="300" y2="30" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x="255" y="25" fill="#fbbf24" fontSize="9" className="font-semibold">Secular Trend</text>
        <path d="M 0 100 Q 40 10, 80 60 T 160 60 Q 200 110, 240 60 T 320 60" stroke="#0f172a" strokeWidth="2" fill="none" />
        <circle cx="65" cy="30" r="3" fill="#ef4444" />
        <text x="60" y="22" fill="#ef4444" className="font-bold">Peak (Euphoria)</text>
        <circle cx="215" cy="95" r="3" fill="#10b981" />
        <text x="210" y="110" fill="#10b981" className="font-bold">Trough (Depression)</text>
        <text x="120" y="75" fill="#64748b" className="font-semibold">Mean Reversion</text>
        <path d="M 140 65 L 140 50" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrow)" />
      </svg>
      <svg height="0" width="0">
        <defs>
          <marker id="arrow" markerWidth="5" markerHeight="4" refX="2" refY="2" orient="auto">
            <path d="M 0 0 L 5 2 L 0 4 Z" fill="#64748b" />
          </marker>
        </defs>
      </svg>
    </div>
  </div>
);

const MarketTemperatureChecklist = () => {
  const leftCol = [
    { label: "Economy", value: "Vibrant" },
    { label: "Outlook", value: "Positive" },
    { label: "Lenders", value: "Eager" },
    { label: "Capital Markets", value: "Loose" },
    { label: "Investors", value: "Optimistic" },
    { label: "Asset Prices", value: "High" },
    { label: "Prospective Returns", value: "Low" },
    { label: "Risk", value: "High" }
  ];

  const rightCol = [
    { label: "Economy", value: "Sluggish" },
    { label: "Outlook", value: "Negative" },
    { label: "Lenders", value: "Reticent" },
    { label: "Capital Markets", value: "Tight" },
    { label: "Investors", value: "Pessimistic" },
    { label: "Asset Prices", value: "Low" },
    { label: "Prospective Returns", value: "High" },
    { label: "Risk", value: "Low" }
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl border border-slate-200 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <p className="font-bold text-slate-700">"If you find that most of your checkmarks are in the left-hand column, hold on to your wallet." - H.M.</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="w-full md:w-1/2 space-y-3">
          <h4 className="font-bold text-lg text-red-600 flex items-center gap-2 mb-4">
            <XCircle /> Potentially Overheated
          </h4>
          {leftCol.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-red-50 p-3 rounded-md">
              <span className="text-sm font-semibold text-slate-600">{item.label}</span>
              <span className="text-sm font-bold text-red-700">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/2 space-y-3">
          <h4 className="font-bold text-lg text-emerald-600 flex items-center gap-2 mb-4">
            <CheckCircle /> Potentially Favorable
          </h4>
          {rightCol.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-emerald-50 p-3 rounded-md">
              <span className="text-sm font-semibold text-slate-600">{item.label}</span>
              <span className="text-sm font-bold text-emerald-700">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ThreeStagesOfBullMarket = () => (
  <div className="bg-white p-8 rounded-lg shadow-xl border border-slate-200">
    <h3 className="text-2xl font-bold text-center mb-6 text-slate-900">The Three Stages of a Bull Market</h3>
    <div className="grid md:grid-cols-3 gap-6 text-center">
      <div className="p-4">
        <div className="relative flex justify-center items-center">
          <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-2xl font-bold">1</div>
        </div>
        <h4 className="font-bold text-lg mt-4">First Stage</h4>
        <p className="text-slate-600 mt-1">When only a few perceptive people believe things will get better. Prices are low and skepticism is high.</p>
      </div>
      <div className="p-4">
        <div className="relative flex justify-center items-center">
          <div className="w-16 h-16 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-2xl font-bold">2</div>
        </div>
        <h4 className="font-bold text-lg mt-4">Second Stage</h4>
        <p className="text-slate-600 mt-1">When most investors realize improvement is actually taking place. The trend is recognized and prices are rising.</p>
      </div>
      <div className="p-4">
        <div className="relative flex justify-center items-center">
          <div className="w-16 h-16 rounded-full bg-red-200 text-red-800 flex items-center justify-center text-2xl font-bold">3</div>
        </div>
        <h4 className="font-bold text-lg mt-4">Third Stage</h4>
        <p className="text-slate-600 mt-1">When everyone concludes things will get better forever. Euphoria reigns and prices are dangerously high.</p>
      </div>
    </div>
    <p className="text-center mt-6 font-semibold text-lg italic text-slate-800">"What the wise man does in the beginning, the fool does in the end."</p>
  </div>
);

const Quote = ({ text, author, className }) => (
  <blockquote className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-400 ${className}`}>
    <p className="text-lg italic text-slate-700">"{text}"</p>
    {author && <footer className="text-right mt-4 text-slate-500 font-semibold">- {author}</footer>}
    {!author && <footer className="text-right mt-4 text-slate-500 font-semibold">- Howard Marks</footer>}
  </blockquote>
);