'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu, X, TrendingUp, Target, FlaskConical, Globe, DollarSign, Brain,
  Lightbulb, ShieldCheck, Zap, Eye, BarChart2, RefreshCw, Search, ArrowDown,
  PieChart, ShieldOff, TrendingDown, MessageSquare, ArrowLeft, Music, FileText
} from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

/*----------------------------------------------------------------------
  Reusable UI Components
----------------------------------------------------------------------*/

const InfoCard = ({ icon, title, children, color = 'blue' }: { 
  icon: React.ReactNode; 
  title: string; 
  children: React.ReactNode; 
  color?: string;
}) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    purple: 'bg-purple-100 text-purple-700',
    pink: 'bg-pink-100 text-pink-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
  };

  const shadowClasses: Record<string, string> = {
    blue: 'hover:shadow-blue-100/50',
    green: 'hover:shadow-green-100/50',
    indigo: 'hover:shadow-indigo-100/50',
    purple: 'hover:shadow-purple-100/50',
    pink: 'hover:shadow-pink-100/50',
    red: 'hover:shadow-red-100/50',
    yellow: 'hover:shadow-yellow-100/50',
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl ${shadowClasses[color]}`}>
      <div className="p-6">
        <div className={`flex items-center justify-center w-16 h-16 rounded-xl ${colorClasses[color]} mb-5`}>
          {icon}
        </div>
        <h3 className="text-2xl font-semibold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{children}</p>
      </div>
    </div>
  );
};

const QuoteBlock = ({ children, source }: { children: React.ReactNode; source?: string }) => (
  <blockquote className="my-8 p-6 rounded-xl bg-blue-50 border-l-4 border-blue-500">
    <p className="text-xl italic font-medium text-blue-900 leading-relaxed">
      "{children}"
    </p>
    {source && <cite className="block mt-4 text-right text-slate-600 not-italic">— {source}</cite>}
  </blockquote>
);

const SectionWrapper = ({ id, title, subtitle, children, className = 'bg-white' }: {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={`py-20 sm:py-28 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">{title}</h2>
        <p className="mt-4 text-xl text-slate-600">{subtitle}</p>
      </div>
      {children}
    </div>
  </section>
);

const ChangeCell = ({ value, prefix = '' }: { value: any; prefix?: string }) => {
  const isPositive = value && (value > 0 || (typeof value === 'string' && value.startsWith('+')));
  const isNegative = value && (value < 0 || (typeof value === 'string' && value.startsWith('-')));
  
  let className = "text-slate-900";
  let formattedValue = `${prefix}${value}`;
  
  if (isPositive) {
    className = "text-green-600 font-medium";
    formattedValue = typeof value === 'string' ? value : `+${prefix}${value.toFixed(2)}`;
  }
  
  if (isNegative) {
    className = "text-red-600 font-medium";
    formattedValue = typeof value === 'string' ? value : `-${prefix}${Math.abs(value).toFixed(2)}`;
  }
  
  return <td className={`px-5 py-4 whitespace-nowrap text-sm ${className}`}>{formattedValue}</td>;
};

/*----------------------------------------------------------------------
  Main Page Sections
----------------------------------------------------------------------*/

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: 'Analysis (The "What")', href: '#section-what' },
    { name: 'Sectors', href: '#section-sectors' },
    { name: 'Thesis (The "Why")', href: '#section-why' },
    { name: 'Risks', href: '#section-risks' },
    { name: 'Philosophy', href: '#section-philosophy' },
    { name: 'Context', href: '#section-nexus' },
    { name: 'Lessons', href: '#section-lessons' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <DollarSign className="w-8 h-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-slate-900">Druckenmiller Digest</span>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="font-medium text-slate-600 hover:text-blue-600 transition-colors">
                {item.name}
              </a>
            ))}
          </div>
          
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">Open main menu</span>
              {!isOpen ? <Menu className="block h-6 w-6" /> : <X className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>
      
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden border-t border-slate-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

const Hero = () => (
  <section className="relative bg-gradient-to-b from-white to-slate-50 pt-24 pb-32 sm:pt-32 sm:pb-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-blue-700 bg-blue-100 mb-6">
          Q3 2025 13F Filing Analysis
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight">
          The Q3 2025 Thesis: Rotation, Conviction, & the Bessent Edge
        </h1>
        <p className="mt-8 text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto">
          A deep dive into Stanley Druckenmiller's Q3 2025 portfolio reveals a masterclass in aggressive rotation, 
          high-conviction concentration, and macro insights influenced by a unique "Duquesne-Treasury Corridor."
        </p>
        <div className="mt-12">
          <a href="#section-what" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-blue-600 text-white text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors">
            Explore the Analysis
            <ArrowDown className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const SectionPortfolioAnalysis = () => (
  <SectionWrapper id="section-what" title='I. Portfolio Analysis (The "What")' subtitle="A quantitative breakdown of the Duquesne Family Office's Q3 2025 13F filing." className="bg-slate-50">
    <div className="space-y-16">
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-3xl font-semibold text-slate-900 mb-6 text-center">Portfolio Architecture: Q3 vs. Q2 2025</h3>
        <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-8">
          The portfolio's value remained stable, but a 63.27% turnover rate reveals a complete "re-underwriting" of positions. 
          This is a strategy of active management and aggressive rotation, not "buy and hold." The concentration is extreme: 
          the top 10 holdings now make up 53.93% of the entire portfolio, up from a lower concentration in Q2.
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Metric</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Q2 2025</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Q3 2025</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Analysis</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Managed 13F AUM</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">$4.07 Billion</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">$4.06 Billion</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-500 italic">Stable value, masks internal churn.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Number of Holdings</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">69</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">65</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-500 italic">Slightly more concentrated.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Top 10 Holdings %</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">48.12%</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 font-bold">53.93%</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-green-600 italic">Increased conviction in top names.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Turnover %</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">~28%</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-red-600 font-bold">63.27%</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-red-600 italic">Hyper-aggressive rotation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h3 className="text-3xl font-semibold text-slate-900 mb-6 text-center">Top 10 Holdings: The Core Convictions</h3>
        <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-8">
          The portfolio is extraordinarily concentrated. The top 3 healthcare names (NTRA, INSM, TEVA) alone represent 
          nearly 30% of the entire portfolio, a massive "bet the ranch" move on three *uncorrelated* theses.
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Ticker</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Company</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">% of Portfolio</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Q/Q Change</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr className="bg-green-50">
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900">NTRA</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">Natera, Inc.</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-green-700">~12.95%</td>
                <ChangeCell value="+4.2%" />
              </tr>
              <tr className="bg-green-50">
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900">INSM</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">Insmed Inc.</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-green-700">~8.74%</td>
                <ChangeCell value="+7.5%" />
              </tr>
              <tr className="bg-green-50">
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900">TEVA</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">Teva Pharmaceutical</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-green-700">~8.39%</td>
                <td className="px-5 py-4 text-sm text-slate-500 italic">New Position</td>
              </tr>
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900">TSM</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">Taiwan Semiconductor</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">~5.35%</td>
                <td className="px-5 py-4 text-sm text-slate-500 italic">Trimmed</td>
              </tr>
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900">WWD</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">Woodward Inc.</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">~4.01%</td>
                <ChangeCell value="-25.4%" />
              </tr>
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900">EEM</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">iShares MSCI Emerging Mkts</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700">~2.54%</td>
                <td className="px-5 py-4 text-sm text-slate-500 italic">New Position</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h4 className="text-2xl font-semibold text-slate-900 mb-6 text-center">Significant New Buys (Q3)</h4>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-green-800 uppercase">Ticker</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-green-800 uppercase">Company</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-green-800 uppercase">Portfolio %</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                <tr><td className="px-5 py-3 text-sm font-medium">TEVA</td><td className="px-5 py-3 text-sm">Teva Pharmaceutical</td><td className="px-5 py-3 text-sm font-bold">~8.39%</td></tr>
                <tr><td className="px-5 py-3 text-sm font-medium">EEM</td><td className="px-5 py-3 text-sm">iShares MSCI Emerging Markets</td><td className="px-5 py-3 text-sm font-bold">~2.54%</td></tr>
                <tr><td className="px-5 py-3 text-sm font-medium">AMZN</td><td className="px-5 py-3 text-sm">Amazon.com Inc</td><td className="px-5 py-3 text-sm">~2.15%</td></tr>
                <tr><td className="px-5 py-3 text-sm font-medium">META</td><td className="px-5 py-3 text-sm">Meta Platforms Inc</td><td className="px-5 py-3 text-sm">~1.98%</td></tr>
                <tr><td className="px-5 py-3 text-sm font-medium">GOOGL</td><td className="px-5 py-3 text-sm">Alphabet Inc</td><td className="px-5 py-3 text-sm">~1.80%</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h4 className="text-2xl font-semibold text-slate-900 mb-6 text-center">Significant Exits (Q3)</h4>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-red-100">
                <tr>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-red-800 uppercase">Ticker</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-red-800 uppercase">Company</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-red-800 uppercase">Former %</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                <tr><td className="px-5 py-3 text-sm font-medium">MSFT</td><td className="px-5 py-3 text-sm">Microsoft Corporation</td><td className="px-5 py-3 text-sm text-slate-500">~6.5%</td></tr>
                <tr><td className="px-5 py-3 text-sm font-medium">NVDA</td><td className="px-5 py-3 text-sm">Nvidia Corp</td><td className="px-5 py-3 text-sm text-slate-500">~3.1%</td></tr>
                <tr><td className="px-5 py-3 text-sm font-medium">PM</td><td className="px-5 py-3 text-sm">Philip Morris International</td><td className="px-5 py-3 text-sm text-slate-500">~4.2%</td></tr>
                <tr><td className="px-5 py-3 text-sm font-medium">COHR</td><td className="px-5 py-3 text-sm">Coherent Corp</td><td className="px-5 py-3 text-sm text-slate-500">~2.8%</td></tr>
                <tr><td className="px-5 py-3 text-sm font-medium">FLUT</td><td className="px-5 py-3 text-sm">Flutter Entertainment</td><td className="px-5 py-3 text-sm text-slate-500">~2.5%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

const SectionSectorAllocation = () => (
  <SectionWrapper id="section-sectors" title='II. Sector Allocation: "All In" on Health' subtitle="The portfolio's sector weights reveal the real conviction: a massive, concentrated bet on Healthcare." className="bg-white">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h3 className="text-3xl font-semibold text-slate-900 mb-6">Q3 2025 vs. Q2 2025</h3>
        <p className="text-lg text-slate-600 mb-8">
          In Q2, the portfolio was heavily weighted towards Information Technology. In Q3, that capital was aggressively 
          rotated out of Tech and redeployed into a massive, concentrated Healthcare bet. Tech exposure was cut by more 
          than half, while Healthcare exposure more than doubled, becoming by far the largest sector.
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Sector</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Q2 2025 Weight</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 uppercase tracking-wider">Q3 2025 Weight</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr className="bg-green-50">
                <td className="px-5 py-4 text-sm font-medium text-slate-900">Healthcare</td>
                <td className="px-5 py-4 text-sm text-slate-700">~18%</td>
                <td className="px-5 py-4 text-sm font-bold text-green-700">~38.5%</td>
              </tr>
              <tr className="bg-red-50">
                <td className="px-5 py-4 text-sm font-medium text-slate-900">Information Technology</td>
                <td className="px-5 py-4 text-sm text-slate-700">~29%</td>
                <td className="px-5 py-4 text-sm font-bold text-red-700">~13.2%</td>
              </tr>
              <tr>
                <td className="px-5 py-4 text-sm font-medium text-slate-900">Communication Services</td>
                <td className="px-5 py-4 text-sm text-slate-700">~7%</td>
                <td className="px-5 py-4 text-sm text-slate-700">~9.4%</td>
              </tr>
              <tr>
                <td className="px-5 py-4 text-sm font-medium text-slate-900">Industrials</td>
                <td className="px-5 py-4 text-sm text-slate-700">~8%</td>
                <td className="px-5 py-4 text-sm text-slate-700">~7.1%</td>
              </tr>
              <tr>
                <td className="px-5 py-4 text-sm font-medium text-slate-900">ETFs (Broad Market)</td>
                <td className="px-5 py-4 text-sm text-slate-700">~5%</td>
                <td className="px-5 py-4 text-sm text-slate-700">~6.8%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-slate-500 mb-2 italic">Illustrative Chart</p>
        <div className="w-full max-w-md mx-auto aspect-square bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300">
          <div className="text-center">
            <PieChart className="w-24 h-24 text-slate-400 mx-auto" />
            <p className="mt-2 text-sm text-slate-500 max-w-xs">
              This visual would show Healthcare as the dominant ~38.5% slice, with Tech, Comms, and Industrials as 
              smaller, secondary allocations.
            </p>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

const SectionThesis = () => (
  <SectionWrapper id="section-why" title='III. Decoding the Thesis (The "Why")' subtitle="Reverse-engineering the macro and micro themes behind the quarter's key trades." className="bg-slate-50">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <InfoCard title="Theme 1: The Great AI Rotation" icon={<RefreshCw className="w-8 h-8" />} color="blue">
        Exiting first-wave, high-valuation AI (MSFT, NVDA) and rotating capital into "cheaper," second-wave utility 
        plays (AMZN, META, GOOGL). This is a bet on the long-term *platform implementers* (AWS, Google Cloud, Meta's 
        Ad Engine) over the initial "hype" stocks, while anchoring the core AI thesis in TSM.
      </InfoCard>
      <InfoCard title="Theme 2: 'Being a Pig' in Healthcare" icon={<FlaskConical className="w-8 h-8" />} color="green">
        A massive, ~38.5% sector bet composed of three *uncorrelated* theses: a technology platform (Natera's genetic 
        testing leadership), a binary drug catalyst (Insmed's Phase 3 data for its lung disease drug), and a 
        value/special-situation play (Teva's GLP-1 generic potential).
      </InfoCard>
      <InfoCard title="Theme 3: The Macro 'Bessent Tell'" icon={<Globe className="w-8 h-8" />} color="indigo">
        A large new position in the Emerging Markets ETF (EEM). This is a pure macro trade on a weakening U.S. dollar 
        and a "global growth" recovery, likely informed by his unique insight into the U.S. Treasury's policy path and 
        the need to manage the U.S. deficit (which a weaker USD helps).
      </InfoCard>
      <InfoCard title="Theme 4: The Speculative Sleeve" icon={<Zap className="w-8 h-8" />} color="purple">
        Small (1-2%) asymmetric bets on disruptive, high-growth companies like Figure Technologies (FIGR) and Stubhub 
        (STUB). These are low-risk (small size) but 100x potential "home run" tickets on the future of capital markets 
        (FIGR) and the "experience economy" (STUB).
      </InfoCard>
    </div>
  </SectionWrapper>
);

const SectionRisks = () => (
  <SectionWrapper id="section-risks" title="IV. Risks & Alternative Views" subtitle="A strong thesis must be tested. What if the Q3 analysis is wrong?" className="bg-white">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <InfoCard title="Risk 1: Concentration Catastrophe" icon={<ShieldOff className="w-8 h-8" />} color="red">
        The ~30% bet on three healthcare names is a massive "key-man risk" on a few company-specific events. A failed 
        drug trial (INSM) or regulatory setback (NTRA) could wipe out a significant portion of the quarter's gains. 
        This is the opposite of diversification.
      </InfoCard>
      <InfoCard title="Risk 2: The Macro Head-Fake" icon={<TrendingDown className="w-8 h-8" />} color="yellow">
        The EEM (Emerging Markets) trade relies heavily on a weakening USD and a dovish Fed. If U.S. inflation remains 
        sticky, forcing the Fed to stay "higher for longer," the USD could *strengthen*, crushing the EEM position and 
        hurting global growth.
      </InfoCard>
      <InfoCard title="Alt View: 'Bessent Edge' is Narrative" icon={<MessageSquare className="w-8 h-8" />} color="indigo">
        The "Duquesne-Treasury Corridor" is a compelling story, but it may be narrative fallacy. The more straightforward 
        explanation is that Druckenmiller and Bessent are simply two smart investors trained in the same (Soros) system, 
        arriving at similar conclusions independently.
      </InfoCard>
    </div>
  </SectionWrapper>
);

const SectionPhilosophy = () => (
  <SectionWrapper id="section-philosophy" title="V. The Philosophical Context" subtitle="The Q3 2025 filing is a perfect execution of Druckenmiller's core investment framework." className="bg-slate-50">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <InfoCard title='"Preservation of Capital and Home Runs"' icon={<ShieldCheck className="w-8 h-8" />} color="blue">
        The 63.27% turnover *is* capital preservation—he's preserving gains by selling winners (MSFT) and cutting losers. 
        The ~30% healthcare bet *is* the hunt for home runs. The Q3 portfolio is a perfect illustration of this dual focus.
      </InfoCard>
      <InfoCard title='"Top-Down" Trumps "Bottom-Up"' icon={<BarChart2 className="w-8 h-8" />} color="indigo">
        The EEM buy, the AI rotation, the *timing* of the healthcare bet—these are not bottom-up earnings plays. They 
        are top-down macro calls on liquidity (Fed policy), valuation cycles (AI hype vs. utility), and global capital flows.
      </InfoCard>
      <InfoCard title="Mental Flexibility in Action" icon={<Brain className="w-8 h-8" />} color="purple">
        The 33 exits, including profitable, "great" companies like MSFT and NVDA, show a complete lack of ego. The Q3 
        sale of these "winners" is the perfect example. His high turnover is a *feature*, allowing him to "wipe the slate clean."
      </InfoCard>
      <InfoCard title='"Be a Pig"' icon={<TrendingUp className="w-8 h-8" />} color="green">
        This portfolio rejects "di-worsification." The 53.93% top-10 concentration is the physical manifestation of his 
        advice: "if you really see it, put all your eggs in one basket and watch the basket very carefully."
      </InfoCard>
    </div>
  </SectionWrapper>
);

const SectionNexus = () => (
  <SectionWrapper id="section-nexus" title="VI. The Soros-Druckenmiller-Bessent Nexus" subtitle="Connecting past, present, and future to find the non-obvious 'edge' in the portfolio." className="bg-white">
    <div className="max-w-4xl mx-auto text-lg text-slate-700 leading-relaxed space-y-8">
      <div>
        <h3 className="text-3xl font-semibold text-slate-900 mb-4">
          The Soros Legacy: Learning to "Go for the Jugular"
        </h3>
        <p className="mb-6">
          Druckenmiller's time with George Soros, culminating in the 1992 pound short, taught him one crucial lesson: 
          when you have high conviction, your sizing must be massive. Soros taught him to move from a "ridiculous" small 
          bet to a 200%-of-net-worth trade.
        </p>
        <QuoteBlock source="George Soros (via Druckenmiller)">
          It's not whether you're right or wrong... but how much money you make when you're right and how much you lose 
          when you're wrong.
        </QuoteBlock>
        <p>
          The ~30% healthcare bet in Q3 2025 is the direct application of this "go for the jugular" philosophy. It's a 
          high-conviction, asymmetric bet where the upside (e.g., a successful drug trial) is multiples of the downside.
        </p>
      </div>

      <hr className="my-12 border-t-2 border-slate-200" />

      <div>
        <h3 className="text-3xl font-semibold text-slate-900 mb-4">
          The Bessent Connection: The Duquesne-Treasury Corridor
        </h3>
        <p className="mb-6">
          If Soros explains the *past*, U.S. Treasury Secretary Scott Bessent explains the *present*. Bessent, 
          Druckenmiller's former colleague and fellow macro investor, now manages U.S. fiscal policy. This isn't just a 
          friendship; it's an institutional connection, with a former Duquesne managing director now advising Bessent at Treasury.
        </p>
        <p className="mb-6">
          This "Bessent Edge" provides a shared worldview, not "insider information." Druckenmüller understands *how* 
          the Treasury will think and act because he was trained by the same mentor (Soros) and worked alongside Bessent 
          for years. They share a "macro language."
        </p>
        <ul className="space-y-4 list-disc list-inside">
          <li className="ml-4">
            <strong className="text-slate-900">The EEM Buy:</strong> A front-running of the inevitable policy path (a 
            weaker USD) that Bessent, a currency specialist, knows is necessary to manage the U.S. deficit.
          </li>
          <li className="ml-4">
            <strong className="text-slate-900">The AI Rotation:</strong> Aligns perfectly with Bessent's public 
            industrial policy to solve the tech labor bottleneck, directly benefiting the large-scale platforms (AMZN, 
            GOOGL, META).
          </li>
        </ul>
      </div>
    </div>
  </SectionWrapper>
);

const SectionLessons = () => (
  <SectionWrapper id="section-lessons" title="VII. Synthesis: Lessons for the Investor" subtitle="Actionable, philosophical principles to distill from the Druckenmiller masterclass." className="bg-slate-50">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <InfoCard title="1. Conviction > Diversification" icon={<Target className="w-8 h-8" />} color="blue">
        Challenge "di-worsification." If deep research provides an asymmetric thesis, have the courage to make the 
        position meaningful. Don't let your best ideas be diluted to mediocrity.
      </InfoCard>
      <InfoCard title="2. Mental Flexibility (No Ego)" icon={<Brain className="w-8 h-8" />} color="purple">
        Your true genius is not your "calls" but your "folds." The stock doesn't know you own it. Be willing to sell a 
        winner (MSFT) if a better idea (TEVA) comes along. Capital preservation is about redeployment.
      </InfoCard>
      <InfoCard title="3. Find Your Edge (And Mentor)" icon={<Search className="w-8 h-8" />} color="indigo">
        Druckenmiller's framework was built by Soros. His edge is a shared macro view with the Treasury. You won't win 
        with consensus info. Find a unique, non-consensus insight and cultivate it.
      </InfoCard>
      <InfoCard title="4. Invest in the 18-Month Horizon" icon={<Eye className="w-8 h-8" />} color="green">
        "Never, ever invest in the present." The market has already priced in today's news. Ask: "What will the 
        conventional wisdom be in two years, and how is it different from today?" He's buying Teva not for today, but 
        for its 2027 generic pipeline.
      </InfoCard>
      <InfoCard title="5. 'It's the Liquidity, Stupid'" icon={<DollarSign className="w-8 h-8" />} color="blue">
        "Earnings don't move the overall market; it's the Federal Reserve..." Focus on central banks and the movement 
        of liquidity. Before asking if a company is cheap, ask what the Fed and Treasury will do next.
      </InfoCard>
      <InfoCard title="6. The Synthesis" icon={<Lightbulb className="w-8 h-8" />} color="purple">
        The ultimate lesson: Combine a top-down macro view (Liquidity) with deep, bottom-up conviction (Home Runs), and 
        execute with ruthless, ego-less flexibility (Capital Preservation).
      </InfoCard>
    </div>
  </SectionWrapper>
);

const Footer = () => (
  <footer className="bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-6 md:mb-0">
          <DollarSign className="w-8 h-8 text-blue-500" />
          <span className="ml-2 text-2xl font-bold text-white">Druckenmiller Digest</span>
        </div>
        <p className="text-slate-400 text-center md:text-right">
          Analysis based on public Q3 2025 13F filings.<br />
          This is a conceptual website for informational purposes only.
        </p>
      </div>
    </div>
  </footer>
);

/*----------------------------------------------------------------------
  Main Page Component
----------------------------------------------------------------------*/

export default function DruckenmillerQ32025Article() {
  const currentArticle = articles.find(article => article.slug === 'druckenmiller-q3-2025-rotation-conviction-bessent-edge');

  return (
    <>
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/" 
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
            
            <div className="flex gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
                Deep Research
              </span>
              {currentArticle?.podcastUrl && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                  Podcast
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="antialiased bg-white font-sans text-slate-700">
          <Header />
          <main>
            <Hero />
            <SectionPortfolioAnalysis />
            <SectionSectorAllocation />
            <SectionThesis />
            <SectionRisks />
            <SectionPhilosophy />
            <SectionNexus />
            <SectionLessons />
          </main>
          <Footer />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <FileText className="inline mr-2" />
                  Read Full Research Paper
                </a>
              )}
            </div>
          </div>
        </div>

        <footer className="bg-slate-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-slate-400">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
