'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Target, BarChart2, CheckCircle, AlertTriangle, TrendingUp, Package, Landmark, Briefcase, Palette, ShieldAlert, Menu, X, DollarSign, PieChart, Home, Database, Layers, FileText, Percent, TrendingDown, Info, Scale, Shield, User, Zap, Tag, Gem } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

/* --- shadcn/ui inspired Card Components (using only Tailwind) --- */
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-xl border border-slate-200 bg-white text-slate-950 shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
    {...props}
  />
));

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
));

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-xl font-semibold leading-none tracking-tight flex items-center ${className}`}
    {...props}
  >
    {children}
  </h3>
));

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={`text-sm text-slate-500 ${className}`} {...props} />
));

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
));

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex items-center p-6 pt-0 ${className}`} {...props} />
));

/* --- Navigation Data --- */
const navItems = [
  { id: 'part1', title: 'Introduction', icon: BookOpen },
  { id: 'part2', title: 'Asset Deep Dive', icon: Target },
  { id: 'part3', title: 'Comparative Analysis', icon: BarChart2 },
  { id: 'part4', title: 'Synthesis & Strategy', icon: CheckCircle },
];

/* --- Page Content Components --- */
// Use Tailwind's 'prose' class for beautiful typography on introductory text
const ProseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="prose prose-slate max-w-none lg:prose-lg xl:prose-xl prose-headings:font-semibold prose-headings:text-slate-800 prose-a:text-blue-600 prose-ul:list-disc prose-ul:pl-5 prose-li:my-1">
    {children}
  </div>
);

// A new card for general content
const InfoCard: React.FC<{ icon: React.ComponentType<any>; title: string; children: React.ReactNode }> = ({ icon, title, children }) => {
  const Icon = icon;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Icon className="mr-3 h-6 w-6 text-blue-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-slate-700">{children}</div>
      </CardContent>
    </Card>
  );
};

// A specific card for pitfalls
const PitfallCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Card className="border-red-200 bg-red-50/50 hover:shadow-red-100">
    <CardHeader>
      <CardTitle className="text-red-700">
        <AlertTriangle className="mr-3 h-6 w-6 text-red-500" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-red-900 space-y-2">{children}</div>
    </CardContent>
  </Card>
);

const Part1: React.FC = () => (
  <div className="space-y-8">
    <ProseWrapper>
      <h1>Part I: The Expanding Investment Universe</h1>
      <p>The traditional investment portfolio, long anchored by a mix of stocks and bonds, has faced increasing challenges. In response, investors are increasingly looking beyond conventional asset classes to a diverse world of "alternative investments." This guide explores the most common liquid alternatives available to the public, their strategic roles, and their significant pitfalls.</p>
    </ProseWrapper>

    <section>
      <h2 className="text-3xl font-semibold text-slate-800 mb-6">The Rationale for Alternatives</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <InfoCard icon={TrendingUp} title="Enhanced Returns (Alpha)">
          <p>The pursuit of returns that exceed those of the broader market. Alternatives may offer access to unique strategies or market niches not available through traditional stocks.</p>
        </InfoCard>
        <InfoCard icon={DollarSign} title="Enhanced Income">
          <p>The search for higher and more stable yields. Assets like private credit (via BDCs) or real estate (via REITs) often provide income streams decoupled from the bond market.</p>
        </InfoCard>
        <InfoCard icon={PieChart} title="Diversification">
          <p>The inclusion of assets with a low or negative correlation to stocks and bonds. This is the "holy grail" of portfolio building—finding assets that zig when the main portfolio zags.</p>
        </InfoCard>
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-semibold text-slate-800 mb-6">The Primary Vehicles of Access</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoCard icon={Package} title="ETFs and Mutual Funds">
          <p>The most common "wrappers" for delivering alternative strategies. This includes commodity ETFs, "liquid alt" mutual funds, and thematic funds.</p>
        </InfoCard>
        <InfoCard icon={Home} title="Real Estate Investment Trusts (REITs)">
          <p>Publicly traded companies that own, operate, or finance income-producing real estate. They offer a liquid way to invest in a tangible, illiquid asset class.</p>
        </InfoCard>
        <InfoCard icon={Briefcase} title="Business Development Companies (BDCs)">
          <p>A specialized type of fund that invests in the debt and equity of small and developing U.S. businesses, offering access to "private credit."</p>
        </InfoCard>
        <InfoCard icon={Layers} title="Fractional Ownership Platforms">
          <p>A newer innovation allowing investors to buy "shares" of a single high-value asset, such as a piece of fine art, a classic car, or a rare bottle of wine.</p>
        </InfoCard>
      </div>
    </section>
  </div>
);

const Part2: React.FC = () => (
  <div className="space-y-12">
    <ProseWrapper>
      <h1>Part II: A Deep Dive into Liquid Alternative Asset Classes</h1>
    </ProseWrapper>

    {/* Section 1: Real Estate */}
    <section>
      <h2 className="text-3xl font-semibold text-slate-800 mb-6 flex items-center">
        <Landmark className="mr-3 h-8 w-8 text-slate-700" />
        Real Estate via Publicly Traded REITs
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InfoCard icon={Target} title="Investment Thesis">
          <p>To own a real, tangible asset with <strong>low correlation</strong> to financial markets, acting as a store of value and an inflation hedge. Often driven by personal passion (art, cars, wine, etc.).</p>
        </InfoCard>
        <InfoCard icon={Layers} title="Access for the Common Investor">
          <p>The most liquid way is through publicly traded REITs. Options include:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Individual REITs:</strong> To target a particular sector (e.g., data centers, industrial).</li>
            <li><strong>REIT ETFs:</strong> For instant diversification across the entire sector.</li>
          </ul>
        </InfoCard>
      </div>
      <div className="mt-6">
        <PitfallCard title="Common Pitfalls of REIT Investing">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Interest Rate Sensitivity:</strong> REITs are highly sensitive to rising rates, which increase their borrowing costs and make their dividends less attractive relative to "safe" bonds.</li>
            <li><strong>The Dividend Tax Trap:</strong> REIT dividends are generally "non-qualified" and taxed as ordinary income, which is a much higher rate. Best held in a tax-advantaged account (like an IRA).</li>
            <li><strong>Crisis Correlation:</strong> REITs lose their diversification benefit when needed most, often correlating highly with stocks during market crashes.</li>
          </ul>
        </PitfallCard>
      </div>
    </section>

    {/* Section 2: Commodities */}
    <section>
      <h2 className="text-3xl font-semibold text-slate-800 mb-6 flex items-center">
        <Database className="mr-3 h-8 w-8 text-slate-700" />
        Commodities—The Tangible Asset Class
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InfoCard icon={Target} title="Investment Thesis">
          <p>The primary investment case is twofold: <strong>diversification</strong> (commodities have a low correlation to stocks) and <strong>inflation hedging</strong> (commodity prices are a key component of inflation).</p>
        </InfoCard>
        <InfoCard icon={Layers} title="Access for the Common Investor">
          <p>Most commonly accessed via futures-based ETFs. An indirect method is buying stocks of commodity-producing companies (e.g., miners, oil firms).</p>
        </InfoCard>
      </div>
      <div className="mt-6">
        <PitfallCard title="Common Pitfalls of Commodity Investing">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Extreme Volatility:</strong> Prices are notoriously volatile, driven by weather, geopolitics, and recessions.</li>
            <li><strong>Lack of Income:</strong> A bar of gold or barrel of oil pays no dividend. Your only return is price appreciation.</li>
            <li><strong>The "Futures Drag":</strong> Futures-based ETFs suffer from "contango," a persistent drag on performance created by the process of rolling futures contracts. This is a critical hidden cost.</li>
          </ul>
        </PitfallCard>
      </div>
    </section>

    {/* Section 3: Private Markets */}
    <section>
      <h2 className="text-3xl font-semibold text-slate-800 mb-6 flex items-center">
        <Briefcase className="mr-3 h-8 w-8 text-slate-700" />
        Private Markets via Listed Vehicles (BDCs)
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InfoCard icon={Target} title="Investment Thesis">
          <p>To provide access to the debt and equity of small and medium-sized private businesses, often generating <strong>high dividend yields</strong> from the interest paid on these private loans.</p>
        </InfoCard>
        <InfoCard icon={Layers} title="Access for the Common Investor">
          <p><strong>Business Development Companies (BDCs)</strong> are traded on stock exchanges, just like a regular stock. They are the most common and liquid access point.</p>
        </InfoCard>
      </div>
      <div className="mt-6">
        <PitfallCard title="Common Pitfalls of BDCs">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Significant Credit Risk:</strong> The core business is lending to smaller, riskier companies. The risk of default is substantially higher than in the public bond market.</li>
            <li><strong>High and Complex Fee Structures:</strong> Many use a "2 and 20" style fee structure (2% management fee + 20% of profits) that can be extremely costly.</li>
            <li><strong>Valuation Opacity:</strong> The underlying private loans don't have a daily market price. Their value is estimated quarterly by the manager, which can mask true risk.</li>
          </ul>
        </PitfallCard>
      </div>
    </section>

    {/* Section 4: Collectibles */}
    <section>
      <h2 className="text-3xl font-semibold text-slate-800 mb-6 flex items-center">
        <Palette className="mr-3 h-8 w-8 text-slate-700" />
        The World of Collectibles
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InfoCard icon={Target} title="Investment Thesis">
          <p>To own a real, tangible asset with <strong>low correlation</strong> to financial markets, acting as a store of value and an inflation hedge. Often driven by personal passion (art, cars, wine, etc.).</p>
        </InfoCard>
        <InfoCard icon={Layers} title="Access for the Common Investor">
          <p><strong>Fractional ownership platforms</strong> are the main innovation, allowing investors to buy a small "share" of a high-value asset like a painting or a classic car.</p>
        </InfoCard>
      </div>
      <div className="mt-6">
        <PitfallCard title="Common Pitfalls of Collectible Investing">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Extreme Illiquidity:</strong> This is the paramount risk. There is no guarantee you can sell your fractional share at a fair price in a timely manner.</li>
            <li><strong>Subjective and Opaque Valuation:</strong> A collectible has no intrinsic value or income stream. Its worth is entirely subjective and based on the fickle tastes of the collector community.</li>
            <li><strong>High Transaction and Holding Costs:</strong> Fees for buying/selling at auction can be 20-30%. Fractional platforms also charge management, storage, and insurance fees.</li>
            <li><strong>Unfavorable Tax Treatment:</strong> Gains are taxed at a special 28% "collectibles" capital gains rate, higher than stocks.</li>
          </ul>
        </PitfallCard>
      </div>
    </section>
  </div>
);

const Part3: React.FC = () => (
  <div className="space-y-12">
    <ProseWrapper>
      <h1>Part III: Comparative Analysis: Which Assets Can Compete with the Stock Market?</h1>
      <p>An asset's ability to "compete" is measured by its long-term total return, its risk (volatility), and its correlation to the rest of a portfolio.</p>
    </ProseWrapper>

    <section>
      <h2 className="text-3xl font-semibold text-slate-800 mb-6">Performance Head-to-Head</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoCard icon={TrendingUp} title="REITs">
          <p>Have competed with and even outperformed the S&P 500 over very long (25+ year) periods, though this is highly dependent on the sector and interest rate environment.</p>
        </InfoCard>
        <InfoCard icon={Zap} title="Commodities">
          <p>Leadership is highly cyclical. Commodities crush stocks during high-inflation periods (e.g., 1970s, 2000-2008) but underperform badly in disinflationary periods.</p>
        </InfoCard>
        <InfoCard icon={User} title="Private Equity (BDC Proxies)">
          <p>True private equity has historically delivered high returns. BDC performance is more mixed and often behaves like a high-beta, high-dividend stock sector.</p>
        </InfoCard>
        <InfoCard icon={Gem} title="Collectibles (Art)">
          <p>Data is less reliable, but some studies show returns competitive with the S&P 500. This is highly questionable given the extreme costs and survivorship bias in the data.</p>
        </InfoCard>
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-semibold text-slate-800 mb-6">Risk & Correlation: The Real Story</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoCard icon={Scale} title="Volatility (Risk)">
          <p><strong>REITs:</strong> Volatility is often comparable to or slightly higher than the S&P 500.</p>
          <p><strong>Commodities:</strong> Widely recognized as a highly volatile asset class, often resulting in poor risk-adjusted returns.</p>
        </InfoCard>
        <InfoCard icon={PieChart} title="Correlation (Diversification)">
          <p><strong>REITs:</strong> Moderately positive correlation (~0.60 to 0.75) that spikes towards 1.0 during crises. <strong>Offers poor diversification.</strong></p>
          <p><strong>Commodities:</strong> Low correlation (~0.40) to stocks, making them an effective diversifier.</p>
          <p><strong>BDCs:</strong> Very high correlation (~0.75 to 0.93). They behave like stocks and <strong>offer little diversification.</strong></p>
          <p><strong>Collectibles (Art):</strong> Theoretically a strong diversifier (correlation near zero), but this benefit is offset by extreme illiquidity and high costs.</p>
        </InfoCard>
      </div>
    </section>
  </div>
);

const Part4: React.FC = () => (
  <div className="space-y-12">
    <ProseWrapper>
      <h1>Part IV: Synthesis and Strategic Recommendations</h1>
      <p>The central conclusion is that investors face a "diversification dilemma." The assets analyzed can be grouped into functional categories:</p>
    </ProseWrapper>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-green-200 bg-green-50/50 hover:shadow-green-100">
        <CardHeader>
          <CardTitle className="text-green-800">
            <TrendingUp className="mr-3 h-6 w-6" />
            Return Enhancers
          </CardTitle>
          <CardDescription>High Correlation, High Return Potential</CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>Assets:</strong> REITs, BDCs</p>
          <p><strong>Role:</strong> Best viewed as satellite components of an equity allocation, not as diversifiers. Use them to target specific themes or enhance income.</p>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50/50 hover:shadow-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-800">
            <Shield className="mr-3 h-6 w-6" />
            True Diversifiers
          </CardTitle>
          <CardDescription>Low Correlation, Cyclical Return</CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>Assets:</strong> Commodities, Managed Futures</p>
          <p><strong>Role:</strong> A form of portfolio "insurance." Hold in small, strategic allocations (3-5%) to protect against inflation or bear markets. Expect long periods of underperformance.</p>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50/50 hover:shadow-purple-100">
        <CardHeader>
          <CardTitle className="text-purple-800">
            <Gem className="mr-3 h-6 w-6" />
            Niche & Speculative
          </CardTitle>
          <CardDescription>Illiquid, Subjective Value</CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>Assets:</strong> Collectibles</p>
          <p><strong>Role:</strong> Unsuitable as a core component. Allocations are highly speculative and should be made with capital you can afford to lock up indefinitely.</p>
        </CardContent>
      </Card>
    </div>

    <section>
      <h2 className="text-3xl font-semibold text-slate-800 mb-6">Concluding Recommendations</h2>
      <div className="space-y-4">
        <InfoCard icon={CheckCircle} title='No "Silver Bullet"'>
          <p>Recognize there is no "silver bullet." No single asset provides high returns, low risk, and strong diversification simultaneously. Each involves a trade-off.</p>
        </InfoCard>
        <InfoCard icon={FileText} title="Conduct Due Diligence">
          <p>The complexity and high fees demand a higher standard of due diligence. You must read the prospectus and understand the strategy, fees, and risks.</p>
        </InfoCard>
        <InfoCard icon={Percent} title="Right-Size Your Allocations">
          <p>These assets should serve as complements (e.g., 5-15% of a portfolio), not replacements for, a core portfolio of traditional assets.</p>
        </InfoCard>
        <InfoCard icon={Target} title="Align with Your Goals">
          <p>Align choices with your goals. An investor fearing inflation might consider commodities. An investor seeking to dampen volatility might research managed futures. Neither should expect them to behave like stocks.</p>
        </InfoCard>
      </div>
    </section>
  </div>
);

/* --- Main App Component --- */
export default function LiquidAlternativeInvestmentGuide() {
  const [activePage, setActivePage] = useState(navItems[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentArticle = articles.find(article => article.slug === 'liquid-alternative-investment-guide-beyond-traditional-stocks-bonds');

  const renderPage = () => {
    switch (activePage) {
      case 'part1':
        return <Part1 />;
      case 'part2':
        return <Part2 />;
      case 'part3':
        return <Part3 />;
      case 'part4':
        return <Part4 />;
      default:
        return <Part1 />;
    }
  };

  const NavLink: React.FC<{ item: typeof navItems[0] }> = ({ item }) => {
    const isActive = activePage === item.id;
    const Icon = item.icon;
    return (
      <button
        onClick={() => {
          setActivePage(item.id);
          setIsSidebarOpen(false); // Close sidebar on mobile nav click
        }}
        className={`flex w-full items-center space-x-3 rounded-lg p-3 text-left text-sm transition-all ${
          isActive
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <span className="font-medium">{item.title}</span>
      </button>
    );
  };

  const Sidebar: React.FC = () => (
    <aside className={`fixed z-20 h-full w-64 transform bg-slate-900 text-white shadow-lg transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 h-20 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white flex items-center">
            <Tag className="mr-2 h-6 w-6"/>
            Alternative Investments
          </h1>
          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}
        </nav>
      </div>
    </aside>
  );

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

      {/* Return to Home Button */}
      <div className="flex items-center gap-4 mb-4 p-4 md:p-6">
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      <div className="flex w-full min-h-screen bg-slate-100 font-sans">
        <Sidebar />
        <main className="flex-1">
          {/* Mobile Header */}
          <header className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 shadow-md md:hidden h-20">
            <button onClick={() => setIsSidebarOpen(true)} className="text-slate-800">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-slate-800">
              {navItems.find(item => item.id === activePage)?.title}
            </h1>
            <div className="w-6"></div> {/* Spacer */}
          </header>

          {/* Content Area */}
          <div className="p-6 md:p-10 lg:p-12">
            {renderPage()}
          </div>

          {/* Deep Research Badge */}
          <div className="fixed top-4 left-4 z-30">
            <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Deep Research
            </div>
          </div>

          {/* Deep Research Section */}
          <section className="p-6 md:p-10 lg:p-12">
            <h2 className="text-3xl font-semibold text-slate-800 mb-6" id="section-deep-research">Deep Research: Academic Foundations & Market Microstructure</h2>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded-r-lg shadow-sm">
              <h4 className="font-bold text-purple-800 text-xl mb-4 flex items-center">
                <svg className="w-6 h-6 mr-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Deep Research Paper: Liquid Alternative Investment Analysis
              </h4>
              <p className="text-lg text-purple-900 mb-4">
                Academic research findings and theoretical models that underpin liquid alternative investments, providing institutional-grade insights into portfolio diversification, risk-return optimization, and the behavioral economics of alternative asset allocation.
              </p>
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Access Deep Research Document
                </a>
              )}
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
              <h4 className="font-bold text-yellow-800 text-lg mb-3">Research Disclaimer</h4>
              <p className="text-yellow-900">
                The academic research presented here is for educational purposes and represents ongoing areas of study. Market conditions, regulations, and trading technologies continue to evolve, potentially affecting the applicability of historical research findings.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-slate-900 text-white p-8 mt-12">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm">
                © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}