'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- ICONS (SVG components for lucide-react) ---
const DollarSign = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const TrendingUp = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const Shield = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const Landmark = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="3" x2="21" y1="22" y2="22" />
    <line x1="6" x2="6" y1="18" y2="11" />
    <line x1="10" x2="10" y1="18" y2="11" />
    <line x1="14" x2="14" y1="18" y2="11" />
    <line x1="18" x2="18" y1="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </svg>
);

const Percent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

const Globe = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const Users = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BarChart = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </svg>
);

// --- Data from the Research Paper ---
const historicalPhasesData = [
  {
    title: "1970-1980: The Great Inflation Rally",
    description: "An explosive rally driven by stagflation and the end of the Bretton Woods system. Gold became the ultimate store of value as fiat currencies eroded.",
  },
  {
    title: "1980-2001: The 20-Year Bear Market",
    description: "A prolonged consolidation phase defined by a strong U.S. dollar, disinflation, and robust economic growth, diminishing gold's appeal.",
  },
  {
    title: "2001-2011: The Post-Dot-Com Bull Market",
    description: "A new secular rally catalyzed by the dot-com bust, 9/11, and the 2008 Global Financial Crisis. The introduction of Gold ETFs democratized access.",
  },
  {
    title: "2013-2023: The Decade of Consolidation",
    description: "An extended period of sideways price action, forming a massive 'cup and handle' pattern—a classic bullish formation preceding a significant breakout.",
  },
];

const macroDriversData = [
  {
    icon: Percent,
    title: "Negative Real Interest Rates",
    description: "As central banks prepare to cut rates amidst persistent inflation, the opportunity cost of holding non-yielding gold plummets, making it highly attractive for capital preservation."
  },
  {
    icon: TrendingUp,
    title: "Stagflation Haven",
    description: "Gold excels in environments of high inflation and low growth. Current supply-side pressures and recession fears enhance its appeal as the ultimate stagflation hedge."
  },
  {
    icon: DollarSign,
    title: "Global Debt Supercycle",
    description: "With global debt surpassing $300 trillion, sovereign debt crises are inevitable. Gold, as a monetary asset with no counterparty risk, is the ultimate hedge against systemic financial instability."
  }
];

const centralBankData = [
  { country: 'China', y2022: 62, y2023: 225, y2024: 44, y2025: 13 },
  { country: 'Poland', y2022: 9, y2023: 130, y2024: 90, y2025: 49 },
  { country: 'India', y2022: 33, y2023: 16, y2024: 73, y2025: 'N/A' },
  { country: 'Turkey', y2022: 148, y2023: -60, y2024: 'N/A', y2025: 'N/A' },
  { country: 'Singapore', y2022: 45, y2023: 77, y2024: 'N/A', y2025: 'N/A' },
  { country: 'Kazakhstan', y2022: 51, y2023: -57, y2024: 'N/A', y2025: 6 },
  { country: 'Global Total', y2022: 1136, y2023: 1037, y2024: 1086, y2025: 244 },
];

const forecastData = [
  { institution: 'JPMorgan', horizon: 'Mid-2026', target: '~ $4,000' },
  { institution: 'UBS', horizon: 'Mid-2026', target: '$3,900' },
  { institution: 'ANZ Group', horizon: 'Mid-2026', target: '$4,000' },
  { institution: 'Goldman Sachs', horizon: 'YE 2025', target: '$3,300 (Upside)' },
  { institution: 'VanEck', horizon: 'Near-Term', target: '>$4,000' },
];

const assetPerformanceData = [
  { asset: 'Gold', year1: '28.6%', year5: '16.5%', year10: '15.4%', year20: '15.2%' },
  { asset: 'S&P 500', year1: '10.1%', year5: '16.1%', year10: '12.2%', year20: '12.2%' },
];

// --- Reusable Components ---
const AnimatedSection = ({ children, className = '', id = '' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </section>
  );
};

// --- Main Page Components ---
const Header = () => (
  <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-lg z-50">
    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
            The Golden Age
          </span>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <a href="#overview" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Overview
            </a>
            <a href="#drivers" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Drivers
            </a>
            <a href="#demand" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Demand
            </a>
            <a href="#retail" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Retail
            </a>
            <a href="#outlook" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Outlook
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
);



const Hero = () => (
  <div className="relative h-screen flex items-center justify-center text-center bg-black overflow-hidden" style={{ background: 'radial-gradient(circle, rgba(30,25,10,1) 0%, rgba(0,0,0,1) 70%)' }}>
    <div className="absolute inset-0 bg-grid-amber-900/20 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
    <div className="z-10 px-4">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-tight">
        <span className="block">The New</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mt-2">
          Structural Bull Market
        </span>
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
        An analysis of the reinforcing mega-trends—macroeconomic shifts, central bank accumulation, and geopolitical risk—propelling gold into a new era of sustained growth.
      </p>
      <div className="mt-10">
        <a href="#overview" className="inline-block bg-amber-500 text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-400 transition-all transform hover:scale-105 shadow-lg shadow-amber-500/20">
          Explore the Analysis
        </a>
      </div>
    </div>
  </div>
);

const SectionTitle = ({ children, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{children}</h2>
    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">{subtitle}</p>
  </div>
);

const HistoricalPhases = () => (
  <AnimatedSection id="overview" className="bg-gray-900">
    <div className="container mx-auto">
      <SectionTitle subtitle="A 50-year perspective reveals distinct, multi-decade phases in gold's journey since the end of the Bretton Woods system.">
        The Anatomy of a Secular Bull Market
      </SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {historicalPhasesData.map((phase, index) => (
          <div key={index} className="bg-gray-800 border border-amber-500/20 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10">
            <h3 className="text-xl font-bold text-amber-400">{phase.title}</h3>
            <p className="mt-4 text-gray-300">{phase.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center text-amber-300 bg-amber-900/20 border border-amber-500/30 rounded-lg p-6 max-w-4xl mx-auto">
        <p className="text-xl font-semibold">
          The 2024 Breakout: A technical confirmation of a new bull market, completing a decade-long pattern and signaling the start of a new upward cycle fueled by unprecedented sovereign demand.
        </p>
      </div>
    </div>
  </AnimatedSection>
);

const MacroDrivers = () => (
  <AnimatedSection id="drivers" className="bg-black">
    <div className="container mx-auto">
      <SectionTitle subtitle="A powerful trifecta of macroeconomic forces is creating a uniquely favorable environment for gold's valuation.">
        The Macroeconomic Engine
      </SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {macroDriversData.map((driver, index) => (
          <div key={index} className="text-center p-8 bg-gray-900 rounded-lg border border-gray-700 hover:border-amber-400 transition-colors">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-500/10 mx-auto mb-6">
              <driver.icon className="h-8 w-8 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">{driver.title}</h3>
            <p className="mt-4 text-gray-400">{driver.description}</p>
          </div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

const DemandPillars = () => (
  <AnimatedSection id="demand" className="bg-gray-900">
    <div className="container mx-auto">
      <SectionTitle subtitle="Beyond macroeconomics, two powerful, interconnected forces have emerged as primary drivers of the current bull market.">
        The New Pillars of Demand
      </SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="bg-gray-800 p-8 rounded-lg">
          <div className="flex items-center mb-4">
            <Landmark className="h-8 w-8 text-amber-400 mr-4"/>
            <h3 className="text-3xl font-bold text-white">The Great Accumulation</h3>
          </div>
          <p className="text-gray-300 mb-6">
            Global central banks are acquiring gold at a record pace, led by emerging markets. This strategic shift towards de-dollarization and "sanctions-proofing" reserves has created a new, price-insensitive floor for the market, fundamentally altering its structure.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-amber-500/30 font-medium text-amber-300">
                <tr>
                  <th scope="col" className="px-4 py-3">Country</th>
                  <th scope="col" className="px-4 py-3 text-right">2022</th>
                  <th scope="col" className="px-4 py-3 text-right">2023</th>
                  <th scope="col" className="px-4 py-3 text-right">2024</th>
                  <th scope="col" className="px-4 py-3 text-right">2025 (Q1)</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {centralBankData.map(row => (
                  <tr key={row.country} className="border-b border-gray-700 transition-colors hover:bg-gray-700/50">
                    <td className="whitespace-nowrap px-4 py-3 font-medium">{row.country}</td>
                    <td className={`whitespace-nowrap px-4 py-3 text-right ${row.y2022 < 0 ? 'text-red-400' : ''}`}>{row.y2022}</td>
                    <td className={`whitespace-nowrap px-4 py-3 text-right ${row.y2023 < 0 ? 'text-red-400' : ''}`}>{row.y2023}</td>
                    <td className={`whitespace-nowrap px-4 py-3 text-right ${row.y2024 < 0 ? 'text-red-400' : ''}`}>{row.y2024}</td>
                    <td className={`whitespace-nowrap px-4 py-3 text-right ${row.y2025 < 0 ? 'text-red-400' : ''}`}>{row.y2025}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">* Figures in tonnes. Negative values indicate net sales.</p>
        </div>
        <div className="bg-gray-800 p-8 rounded-lg">
          <div className="flex items-center mb-4">
            <Globe className="h-8 w-8 text-amber-400 mr-4"/>
            <h3 className="text-3xl font-bold text-white">Persistent Geopolitical Risk</h3>
          </div>
          <p className="text-gray-300">
            Today's global landscape is defined by protracted, systemic conflicts—from Eastern Europe to the Middle East and U.S.-China rivalry. This has embedded a permanent risk premium into gold's price, moving it beyond a temporary safe-haven asset to a core strategic holding for investors and nations alike.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-amber-500 mt-1 mr-3 flex-shrink-0" />
              <p><strong className="text-white">Drives Safe-Haven Demand:</strong> Investors seek protection from volatility in equity and bond markets.</p>
            </div>
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-amber-500 mt-1 mr-3 flex-shrink-0" />
              <p><strong className="text-white">Reinforces De-Dollarization:</strong> Central banks are compelled to accumulate neutral, sanction-proof assets.</p>
            </div>
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-amber-500 mt-1 mr-3 flex-shrink-0" />
              <p><strong className="text-white">Fuels Inflation:</strong> Supply chain disruptions and tariffs contribute to the inflationary pressures that make gold attractive.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AnimatedSection>
);

const RetailResurgence = () => (
  <AnimatedSection id="retail" className="bg-black">
    <div className="container mx-auto">
      <SectionTitle subtitle="A new generation of investors is embracing gold, driven by financial uncertainty and unprecedented access through digital platforms.">
        The Retail Resurgence
      </SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center">
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
          <Users className="h-10 w-10 text-amber-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white">The Costco Effect</h3>
          <p className="mt-2 text-gray-400">
            Major retailers like Costco selling gold bars signifies a mainstream shift. It removes barriers to entry, signaling gold as a consumer good and a viable savings vehicle for the masses.
          </p>
        </div>
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
          <TrendingUp className="h-10 w-10 text-amber-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white">Digital Gold & Fintech</h3>
          <p className="mt-2 text-gray-400">
            Apps and platforms offering fractional ownership of physical gold have democratized access. This allows younger, tech-savvy investors to build positions with minimal capital.
          </p>
        </div>
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
          <Shield className="h-10 w-10 text-amber-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white">A Hedge for Millennials</h3>
          <p className="mt-2 text-gray-400">
            Faced with inflation, housing unaffordability, and market volatility, younger generations are turning to gold as a tangible, long-term store of value outside the traditional financial system.
          </p>
        </div>
      </div>
    </div>
  </AnimatedSection>
);

const GoldVsEquities = () => (
  <AnimatedSection className="bg-gray-900">
    <div className="container mx-auto">
      <SectionTitle subtitle="The S&P 500-to-Gold ratio suggests a major secular shift is underway, favoring gold after a decade of equity outperformance.">
        Gold vs. Equities: The Great Rotation
      </SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-bold text-white mb-4">A Turning Point for Portfolios</h3>
          <p className="text-gray-300 mb-4">
            For over a decade, equities, led by the S&P 500, have been the undisputed leader in portfolio returns. However, the S&P 500-to-Gold ratio, a key indicator of relative value, has peaked and begun to trend downwards. This signals a potential long-term rotation of capital from overvalued equities into undervalued hard assets like gold.
          </p>
          <p className="text-gray-300">
            While equities face headwinds from high valuations and potential economic slowdowns, gold is supported by strong fundamental drivers. This makes gold not just a defensive hedge, but a competitive asset for capital appreciation in the current environment.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-amber-500/20">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Comparative Asset Class Performance (Annualized Returns)</h3>
          <table className="min-w-full text-center text-sm">
            <thead className="border-b border-amber-500/30 font-medium text-amber-300">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">Asset Class</th>
                <th scope="col" className="px-4 py-3">1 Year</th>
                <th scope="col" className="px-4 py-3">5 Years</th>
                <th scope="col" className="px-4 py-3">10 Years</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {assetPerformanceData.map(row => (
                <tr key={row.asset} className="border-b border-gray-700 transition-colors hover:bg-gray-700/60">
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-left">{row.asset}</td>
                  <td className={`whitespace-nowrap px-4 py-3 text-lg font-semibold ${row.asset === 'Gold' ? 'text-green-400' : ''}`}>{row.year1}</td>
                  <td className="whitespace-nowrap px-4 py-3">{row.year5}</td>
                  <td className="whitespace-nowrap px-4 py-3">{row.year10}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-4 text-center">Note: Past performance is not indicative of future results. Data as of year-end 2024.</p>
        </div>
      </div>
    </div>
  </AnimatedSection>
);

const ForwardOutlook = () => (
  <AnimatedSection id="outlook" className="bg-black">
    <div className="container mx-auto">
      <SectionTitle subtitle="A strong bullish consensus has formed among major financial institutions, with forecasts consistently revised upward.">
        Institutional Outlook & Price Projections
      </SectionTitle>
      <div className="max-w-4xl mx-auto overflow-x-auto bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-amber-500/30 font-medium text-amber-300">
            <tr>
              <th scope="col" className="px-4 py-3">Institution</th>
              <th scope="col" className="px-4 py-3">Forecast Horizon</th>
              <th scope="col" className="px-4 py-3 text-right">Price Target (USD/oz)</th>
            </tr>
          </thead>
          <tbody className="text-gray-200">
            {forecastData.map(row => (
              <tr key={row.institution} className="border-b border-gray-700 transition-colors hover:bg-gray-800/60">
                <td className="whitespace-nowrap px-4 py-3 font-bold">{row.institution}</td>
                <td className="whitespace-nowrap px-4 py-3">{row.horizon}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-lg text-amber-400">{row.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-12 text-center text-gray-300 bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-4xl mx-auto">
        <h4 className="text-2xl font-bold text-white mb-4">Key Signposts for Investors</h4>
        <p className="text-gray-400 mb-6">While the outlook is overwhelmingly bullish, investors should monitor these critical metrics:</p>
        <ul className="text-left grid grid-cols-1 sm:grid-cols-2 gap-4">
          <li className="p-2 bg-gray-800/50 rounded">Federal Reserve Communications & Dot Plot</li>
          <li className="p-2 bg-gray-800/50 rounded">Real Interest Rates (10-year TIPS yield)</li>
          <li className="p-2 bg-gray-800/50 rounded">World Gold Council Quarterly Reports</li>
          <li className="p-2 bg-gray-800/50 rounded">COMEX Open Interest & Positioning</li>
        </ul>
      </div>
    </div>
  </AnimatedSection>
);

export default function NewGoldenAgeAnalysis() {
  const currentArticle = articles.find(article => article.slug === 'new-golden-age-structural-bull-market-analysis');

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

      <div className="bg-black text-gray-200 font-sans antialiased">
        {/* Return to Home Button */}
        <div className="relative z-50 pt-20 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        {/* Deep Research Badge */}
        <div className="absolute top-24 left-8 z-40">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-200 border border-purple-700">
            Deep Research
          </span>
        </div>

        {/* Podcast Badge */}
        {currentArticle?.podcastUrl && (
          <div className="absolute top-24 right-8 z-40">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-900 text-green-200 border border-green-700">
              Podcast
            </span>
          </div>
        )}

        <Header />
        <main>
          <Hero />
          <HistoricalPhases />
          <MacroDrivers />
          <DemandPillars />
          <RetailResurgence />
          <GoldVsEquities />
          <ForwardOutlook />
        </main>

        {/* Call to Action Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-900/20 to-yellow-900/20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Continue Your Research</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  Read Full Research Paper
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
        </section>

        {/* Educational Disclaimer */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-gray-700">
          <div className="container mx-auto text-center">
            <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-6 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-yellow-400 mb-3">Educational Disclaimer</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                This analysis is for educational and informational purposes only and should not be considered as investment advice. 
                Gold investments carry risks including price volatility, storage costs, and market fluctuations. Past performance 
                does not guarantee future results. Always consult with qualified financial professionals before making investment decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t border-gray-800">
          <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
            <p>&copy; 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
