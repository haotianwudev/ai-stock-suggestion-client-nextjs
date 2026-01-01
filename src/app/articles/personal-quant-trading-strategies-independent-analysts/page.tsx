'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Repeat, Scale, ShieldCheck, Target, BookOpen, BrainCircuit, ChevronsUp, ChevronsDown, DollarSign, BarChart, Briefcase, ChevronDown, Lightbulb, CheckCircle, AlertTriangle, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// TypeScript interfaces for component props
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
}

interface TagProps {
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'green' | 'amber';
}

// Helper Components for UI
const Card = ({ children, className = '' }: CardProps) => (
  <div className={`bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:border-cyan-400/70 hover:shadow-cyan-500/10 ${className}`}>
    {children}
  </div>
);

const Section = ({ children, id, className = '' }: SectionProps) => (
  <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const SectionTitle = ({ children, subtitle }: SectionTitleProps) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{children}</h2>
    {subtitle && <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
  </div>
);

const Tag = ({ children, icon: Icon, color }: TagProps) => {
    const colorClasses: Record<string, string> = {
        blue: 'bg-blue-100 text-blue-800 border-blue-300',
        green: 'bg-green-100 text-green-800 border-green-300',
        amber: 'bg-amber-100 text-amber-800 border-amber-300',
    };
    return (
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colorClasses[color]}`}>
            {Icon && <Icon className="w-4 h-4 mr-2" />}
            {children}
        </div>
    );
};

// Main Components
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#arena', label: 'The Arena' },
    { href: '#strategies', label: 'Strategies' },
    { href: '#toolkit', label: 'Toolkit' },
    { href: '#comparison', label: 'Comparison' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
             <BarChart className="h-8 w-8 text-cyan-500" />
             <span className="text-gray-900 font-bold text-xl ml-3">Personal Quant</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const HeroSection = () => (
  <div className="relative pt-32 pb-20 text-center bg-white overflow-hidden">
     <div className="absolute inset-0 bg-grid-gray-200/50 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tighter">
        A Guide to Quantitative Trading <br/> for the <span className="text-cyan-500">Independent Analyst</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        Navigating the modern financial landscape where technology and data have leveled the playing field for dedicated individual traders.
      </p>
      <div className="mt-10">
        <a href="#strategies" className="bg-cyan-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105">
          Explore Strategies
        </a>
      </div>
    </div>
  </div>
);

const ArenaSection = () => {
    const advantages = [
        {
            title: "Institutional Edge: Speed & Scale",
            description: "HFT firms leverage microsecond latency and massive capital. We avoid this by focusing on low-frequency strategies where this edge is irrelevant.",
            icon: ChevronsUp,
            color: 'amber'
        },
        {
            title: "Retail Counter-Advantage: Agility",
            description: "Our small size is our greatest strength. We operate in niche markets and capacity-constrained strategies that large funds cannot touch.",
            icon: ChevronsDown,
            color: 'green'
        },
        {
            title: "Institutional Edge: Alternative Data",
            description: "Funds pay millions for proprietary data. We bypass this by using 'data-light' strategies based on public price and volume data.",
            icon: ChevronsUp,
            color: 'amber'
        },
        {
            title: "Retail Counter-Advantage: Freedom",
            description: "Free from client mandates, we can tolerate higher volatility for greater long-term growth, optimizing for wealth, not career risk.",
            icon: ChevronsDown,
            color: 'green'
        }
    ];

    return (
        <Section id="arena" className="bg-gray-100">
            <SectionTitle subtitle="Success for the personal quant lies not in imitation, but in understanding the terrain. Avoiding institutional strongholds doesn't guarantee profit, but it allows you to compete on a roughly fair stage where your own advantages can shine.">
                The Modern Retail Quant's Arena
            </SectionTitle>
            <div className="grid md:grid-cols-2 gap-8">
                {advantages.map((adv, index) => (
                    <Card key={index}>
                        <div className="flex items-center">
                            <div className={`p-3 rounded-lg bg-${adv.color}-100`}>
                                <adv.icon className={`w-8 h-8 text-${adv.color}-500`} />
                            </div>
                            <h3 className="ml-4 text-xl font-bold text-gray-900">{adv.title}</h3>
                        </div>
                        <p className="mt-4 text-gray-600">{adv.description}</p>
                    </Card>
                ))}
            </div>
        </Section>
    );
};

const StrategiesSection = () => {
  const strategyGroups = [
    {
      title: 'Momentum & Trend Following',
      principle: 'The persistence of market trends. "Buy high, sell higher."',
      icon: TrendingUp,
      strategies: [
        { 
            name: 'Dual Moving Average Crossover', 
            description: 'Use a fast MA crossing a slow MA to signal entry (Golden Cross) and exit (Death Cross). Best used as a regime filter to confirm the primary trend.', 
            instruments: 'Stocks, ETFs, Options',
            evidence: "Based on the Momentum factor, a widely documented anomaly where past winners tend to keep winning. While simple MAs can underperform buy-and-hold in bull markets, their primary strength is preserving capital by exiting during major bear markets (e.g., 2008). The edge is in drawdown control.",
            implementation: "Use the MA system as a 'regime filter'. Only take long trades when the fast MA is above the slow MA. This avoids whipsaws in choppy markets and focuses on high-quality trends. Robustness is key; test a range of parameters, not just the 50/200-day standard."
        },
        { 
            name: 'Leveraged Vertical Spreads', 
            description: 'Use Bull Call or Bear Put spreads to make defined-risk, capital-efficient bets on the direction signaled by a trend-following system.', 
            instruments: 'Options',
            evidence: "This isn't a standalone strategy but a capital-efficient way to express the view of a primary system like MA Crossover. The edge comes from leverage and strictly defined risk, preventing catastrophic losses while requiring less capital than an equivalent stock position.",
            implementation: "Systematize strike selection using delta (e.g., buy 0.50 delta, sell 0.30 delta) and manage trades based on time (e.g., enter at 45-60 DTE, exit at 21 DTE) or profit targets (e.g., 50% of max profit)."
        },
      ],
    },
    {
      title: 'Contrarian & Mean Reversion',
      principle: 'The "rubber band" effect. Prices tend to revert to their mean after extreme moves.',
      icon: Repeat,
      strategies: [
        { 
            name: 'Indicator-Driven Mean Reversion', 
            description: 'Buy pullbacks in a confirmed uptrend. Use RSI or Bollinger Bands to identify oversold conditions only when price is above a long-term MA (e.g., 200-day).', 
            instruments: 'Stocks, ETFs, Options (Sell Puts)',
            evidence: "The core edge comes from combining two opposing forces. Pure mean reversion is dangerous ('catching a falling knife'). By applying a long-term trend filter (e.g., price > 200-day MA), you only buy dips in a confirmed uptrend, dramatically increasing the probability of success.",
            implementation: "Define 'oversold' objectively (e.g., RSI(10) < 30). The trend filter is non-negotiable. For a higher probability trade, sell put credit spreads on the dip instead of buying stock, getting paid to wait for the reversion."
        },
        { 
            name: 'Pairs Trading (Statistical Arbitrage)', 
            description: 'Identify two highly correlated stocks. When their price spread widens, short the outperformer and long the underperformer, betting on convergence.', 
            instruments: 'Stocks',
            evidence: "A classic market-neutral strategy whose persistence is documented in academic studies (Gatev et al.). Its alpha has decayed but remains significant because it's capacity-constrained. Large funds cannot deploy enough capital to make it worthwhile, creating a protective 'moat' for retail traders.",
            implementation: "Use a systematic process. 1) Formation Period: Find pairs with the lowest sum of squared differences in normalized prices. 2) Trading Period: Monitor the spread's z-score. Open a trade at a z-score of >2 and close when it reverts to 0."
        },
      ],
    },
    {
      title: 'Income & Volatility Selling',
      principle: 'Harvesting the Volatility Risk Premium (VRP), where implied volatility is systemically higher than realized volatility.',
      icon: DollarSign,
      strategies: [
        { 
            name: 'Systematic Covered Call', 
            description: 'Own 100 shares of a stock and sell a call option against it to generate income and lower volatility. A rules-based approach (delta, DTE) is key.', 
            instruments: 'Stock + Options',
            evidence: "The edge is the Volatility Risk Premium. Empirically validated by the CBOE S&P 500 BuyWrite Index (BXM), which shows long-term equity-like returns with significantly lower volatility and drawdowns than the S&P 500 itself.",
            implementation: "Apply only to high-quality stocks in a confirmed uptrend to avoid capping upside on a stock recovering from a bottom. Systematize strike (e.g., 30 delta) and expiration (e.g., 30-45 DTE) selection. Have rules for rolling or closing."
        },
        { 
            name: 'Systematic Cash-Secured Put', 
            description: 'Sell a put option, collecting premium. Either the option expires worthless (profit) or you acquire a stock you want at a discount.', 
            instruments: 'Options + Cash',
            evidence: "This strategy has a dual edge: 1) It harvests the VRP, and 2) It allows for strategic stock acquisition at a discount. The key is selling premium when it's 'rich' (i.e., when implied volatility is high).",
            implementation: "Only sell puts on high-quality stocks you are willing to own. Crucially, use an Implied Volatility Rank (IVR) filter (e.g., IVR > 50) to ensure you are selling expensive options and maximizing the VRP edge."
        },
        { 
            name: 'Systematic Iron Condor', 
            description: 'A defined-risk, market-neutral trade that profits from low volatility. A pure play on the VRP, betting the stock stays in a range.', 
            instruments: 'Options',
            evidence: "This is one of the purest expressions of harvesting the VRP. The strategy is a direct bet that the actual (realized) volatility will be less than the 'fear' (implied volatility) priced into the options. History shows this is a statistically profitable long-term bet.",
            implementation: "Best applied to liquid, broad-market ETFs (SPY, QQQ). Use an IVR filter (>50) for entry. Select strikes based on standard deviations (e.g., sell the 16 delta strikes). Actively manage the position with profit targets (50% of credit) and stop-losses."
        },
      ],
    },
  ];

  return (
    <Section id="strategies" className="bg-white">
      <SectionTitle subtitle="All strategies are low-frequency, data-light, and systematic, designed to leverage the retail quant's unique advantages.">
        Core Trading Strategies
      </SectionTitle>
      <div className="space-y-16">
        {strategyGroups.map((group, index) => (
          <div key={index}>
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-lg bg-gray-100">
                <group.icon className="w-8 h-8 text-cyan-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{group.title}</h3>
                <p className="text-gray-600 italic">"{group.principle}"</p>
              </div>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {group.strategies.map((strategy) => (
                <Card key={strategy.name} className="flex flex-col">
                  {/* Top part of the card */}
                  <h4 className="text-xl font-semibold text-cyan-600">{strategy.name}</h4>
                  <p className="mt-3 text-gray-600">{strategy.description}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Tag color="blue" icon={Briefcase}>{strategy.instruments}</Tag>
                  </div>

                  {/* Details part, always visible */}
                  <div className="mt-4 pt-4 border-t border-gray-200/80 space-y-4 text-sm">
                      <div className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                              <h5 className="font-bold text-gray-800">The Edge (Why it Works)</h5>
                              <p className="text-gray-600">{strategy.evidence}</p>
                          </div>
                      </div>
                      <div className="flex items-start">
                          <Lightbulb className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                              <h5 className="font-bold text-gray-800">Key Implementation Details</h5>
                              <p className="text-gray-600">{strategy.implementation}</p>
                          </div>
                      </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const ToolkitSection = () => {
    const tools = [
        {
            icon: ShieldCheck,
            name: "Robust Backtesting",
            description: "The lab for testing ideas. Avoid pitfalls like survivorship bias and overfitting. A good backtest seeks robustness, not perfection."
        },
        {
            icon: Target,
            name: "Pragmatic Risk Management",
            description: "The bedrock of survival. Define risk at the trade, strategy, and portfolio level. Know your max drawdown before you trade."
        },
        {
            icon: Scale,
            name: "Intelligent Position Sizing",
            description: "The engine of growth. Use methods like Fixed Fractional or Fractional Kelly to determine trade size. This is more important than your entry signal."
        }
    ];
    return (
        <Section id="toolkit" className="bg-gray-100">
            <SectionTitle subtitle="Success is not from a secret formula, but from a scientific mindset and a relentless focus on process.">
                The Personal Quant's Essential Toolkit
            </SectionTitle>
            <div className="grid md:grid-cols-3 gap-8">
                {tools.map((tool, index) => (
                    <Card key={index} className="text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-cyan-100/50 border-2 border-cyan-200">
                            <tool.icon className="h-8 w-8 text-cyan-500" />
                        </div>
                        <h3 className="mt-6 text-xl font-bold text-gray-900">{tool.name}</h3>
                        <p className="mt-2 text-gray-600">{tool.description}</p>
                    </Card>
                ))}
            </div>
        </Section>
    );
};

const ComparisonTableSection = () => {
    const strategies = [
        { name: 'Dual MA Crossover', principle: 'Trend Following', instruments: 'Stocks, ETFs', advantage: 'Simplicity; avoids major bear markets', pitfall: 'Whipsaws in choppy markets' },
        { name: 'Vertical Spreads', principle: 'Leveraged Directional', instruments: 'Options', advantage: 'Defined risk; high capital efficiency', pitfall: 'Time decay is an enemy' },
        { name: 'RSI/BB Mean Reversion', principle: 'Mean Reversion', instruments: 'Stocks, ETFs', advantage: 'High win rate on pullbacks', pitfall: '"Catching a falling knife" without trend filter' },
        { name: 'Pairs Trading', principle: 'Statistical Arbitrage', instruments: 'Stocks', advantage: 'Market-neutral; institutional blind spot', pitfall: 'Pair relationship breakdown' },
        { name: 'Systematic Covered Call', principle: 'Income / VRP', instruments: 'Stock + Options', advantage: 'Reduces portfolio volatility', pitfall: 'Capped upside profit potential' },
        { name: 'Systematic Cash-Secured Put', principle: 'Income / VRP / Acquisition', instruments: 'Options + Cash', advantage: 'Get paid to set a limit order', pitfall: 'Obligation to buy a falling stock' },
        { name: 'Systematic Iron Condor', principle: 'Neutral / VRP', instruments: 'Options', advantage: 'Pure play on Volatility Risk Premium', pitfall: 'Large loss if a wing is breached' },
    ];

    return (
        <Section id="comparison" className="bg-white">
            <SectionTitle subtitle="A high-level comparison to help select strategies that align with your objectives, risk tolerance, and capabilities.">
                Strategy Comparison Matrix
            </SectionTitle>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-600 sm:pl-6">Strategy</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">Core Principle</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">Retail Advantage</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-600">Key Pitfall</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {strategies.map((s) => (
                            <tr key={s.name} className="hover:bg-gray-50 transition-colors">
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-cyan-600 sm:pl-6">{s.name}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{s.principle}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-green-600">{s.advantage}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-amber-600">{s.pitfall}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Section>
    );
};

const RoadmapSection = () => (
    <Section id="roadmap" className="bg-gray-100">
        <SectionTitle subtitle="Success is a function of continuous learning, rigorous process, and unwavering discipline.">
            The Path Forward
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 text-center">
            <Card>
                <BookOpen className="mx-auto h-12 w-12 text-cyan-500" />
                <h3 className="mt-6 text-2xl font-bold text-gray-900">A Curated Self-Study Plan</h3>
                <p className="mt-4 text-gray-600">
                    Build a strong theoretical foundation in statistics and financial time series. Explore resources like Quantpedia for ideas and use platforms like QuantConnect for robust backtesting.
                </p>
                <div className="mt-6 text-left text-sm text-gray-700 bg-gray-100 p-4 rounded-lg">
                    <p className="font-bold mb-2">Recommended Reading:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li><span className="font-semibold">Introductory Econometrics for Finance</span> by Chris Brooks</li>
                        <li><span className="font-semibold">Analysis of Financial Time Series</span> by Ruey S. Tsay</li>
                    </ul>
                </div>
            </Card>
            <Card>
                <BrainCircuit className="mx-auto h-12 w-12 text-cyan-500" />
                <h3 className="mt-6 text-2xl font-bold text-gray-900">The Indispensable Quant Mindset</h3>
                <p className="mt-4 text-gray-600">
                    Embrace probabilities, not certainties. Focus on process over individual outcomes. Adhere to your system with iron discipline, knowing your edge only manifests over a large sample of trades.
                </p>
                 <div className="mt-6 text-left text-sm text-gray-700 bg-gray-100 p-4 rounded-lg">
                    <p className="font-bold mb-2">Core Tenets:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Your strategy has a positive expectancy.</li>
                        <li>You can endure the historical max drawdown.</li>
                        <li>You execute your plan flawlessly, without emotion.</li>
                    </ul>
                </div>
            </Card>
        </div>
    </Section>
);

export default function PersonalQuantTradingStrategies() {
    const currentArticle = articles.find(article => article.slug === 'personal-quant-trading-strategies-independent-analysts');
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* SEO Components */}
            {currentArticle && (
                <>
                    <StructuredData article={currentArticle} />
                    <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
                </>
            )}

            <div className="bg-gray-50 font-sans leading-relaxed text-gray-800 antialiased">
                <style>{`
                    html {
                        scroll-behavior: smooth;
                    }
                    .bg-grid-gray-200\\/50 {
                        background-image:
                            linear-gradient(to right, rgba(229, 231, 235, 0.7) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(229, 231, 235, 0.7) 1px, transparent 1px);
                        background-size: 40px 40px;
                    }
                `}</style>

                {/* Deep Research Badge */}
                <div className="fixed top-4 left-4 z-50">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-full shadow-lg">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="font-semibold text-sm">Deep Research</span>
                        </div>
                    </div>
                </div>

                <Header />
                
                <main>
                    {/* Return to Home Button - Positioned at the very top of main content */}
                    <div className="relative z-10 pt-32 pb-8 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-4">
                                <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium shadow-lg">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Return to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <HeroSection />
                    
                    {/* Hero Infographic - Below Title with Full-Screen Capability */}
                    {currentArticle?.imageUrl && (
                        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
                            <div 
                                className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
                                onClick={() => setIsImageViewerOpen(true)}
                            >
                                <img 
                                    src={currentArticle.imageUrl} 
                                    alt="Personal Quant Trading Strategies Infographic" 
                                    className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
                                />
                                {/* Full-screen button overlay */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsImageViewerOpen(true);
                                    }}
                                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                                    title="View full screen"
                                >
                                    <Maximize2 className="h-4 w-4" />
                                </button>
                                {/* Click hint */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
                                    <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                                        Click to view full screen
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                    
                    <ArenaSection />
                    <StrategiesSection />
                    <ToolkitSection />
                    <ComparisonTableSection />
                    <RoadmapSection />
                </main>

                {/* Google Doc Entry Point */}
                {currentArticle?.googleDoc && (
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-t border-blue-200 py-12">
                        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-center mb-6">
                                <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                                <h3 className="text-2xl font-bold text-blue-900">Complete Research Document</h3>
                            </div>
                            <p className="text-blue-700 mb-8 text-lg">
                                Access the full research document with detailed analysis, additional strategies, and comprehensive implementation guides.
                            </p>
                            <a 
                                href={currentArticle.googleDoc}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <BookOpen className="mr-3 h-5 w-5" />
                                Read Full Research Document
                            </a>
                        </div>
                    </div>
                )}

                {/* Educational Disclaimer */}
                <div className="bg-yellow-50 border-t border-yellow-200 py-8 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center mb-4">
                            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-2" />
                            <h3 className="text-lg font-semibold text-yellow-800">Educational Disclaimer</h3>
                        </div>
                        <p className="text-yellow-700">
                            This content is for educational purposes only and does not constitute financial advice. 
                            Trading involves substantial risk and is not suitable for all investors. Past performance is not indicative of future results.
                            Always consult with a qualified financial advisor before making investment decisions.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200">
                    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                        <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
                    </div>
                </footer>
                
                {/* Full-screen image viewer */}
                {currentArticle?.imageUrl && (
                    <FullScreenImageViewer
                        src={currentArticle.imageUrl}
                        alt="Personal Quant Trading Strategies Infographic"
                        isOpen={isImageViewerOpen}
                        onClose={() => setIsImageViewerOpen(false)}
                    />
                )}
            </div>
        </div>
    );
} 
