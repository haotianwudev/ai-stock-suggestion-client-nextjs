'use client';

import React from 'react';
import {
  TrendingUp, Target, FlaskConical, Globe, DollarSign, Brain,
  Lightbulb, ShieldCheck, Zap, Eye, BarChart2, RefreshCw, Search,
  PieChart, ShieldOff, TrendingDown, MessageSquare
} from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

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
    blue: 'bg-blue-100 text-[#A8672E] dark:text-[#D08F52]',
    green: 'bg-green-100 text-[#1D8A70] dark:text-[#3CBF9C]',
    indigo: 'bg-indigo-100 text-[#A8672E] dark:text-[#D08F52]',
    purple: 'bg-purple-100 text-purple-700',
    pink: 'bg-pink-100 text-pink-700',
    red: 'bg-red-100 text-[#BC4128] dark:text-[#E2694A]',
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
    <div className={`bg-white dark:bg-[#0A0D14] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl ${shadowClasses[color]}`}>
      <div className="p-6">
        <div className={`flex items-center justify-center w-16 h-16 rounded-xl ${colorClasses[color]} mb-5`}>
          {icon}
        </div>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 font-serif">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{children}</p>
      </div>
    </div>
  );
};

const QuoteBlock = ({ children, source }: { children: React.ReactNode; source?: string }) => (
  <blockquote className="my-8 p-6 rounded-xl bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border-l-4 border-[#A8672E] dark:border-[#D08F52]">
    <p className="text-xl italic font-medium text-blue-900 leading-relaxed">
      &ldquo;{children}&rdquo;
    </p>
    {source && <cite className="block mt-4 text-right text-slate-600 dark:text-slate-400 not-italic">&mdash; {source}</cite>}
  </blockquote>
);

const SectionWrapper = ({ id, title, subtitle, children, className = 'bg-white dark:bg-[#0A0D14]' }: {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={`py-16 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 font-serif">{title}</h2>
        <p className="mt-4 text-xl text-slate-600 dark:text-slate-400">{subtitle}</p>
      </div>
      {children}
    </div>
  </section>
);

const ChangeCell = ({ value, prefix = '' }: { value: any; prefix?: string }) => {
  const isPositive = value && (value > 0 || (typeof value === 'string' && value.startsWith('+')));
  const isNegative = value && (value < 0 || (typeof value === 'string' && value.startsWith('-')));

  let className = "text-slate-900 dark:text-slate-100";
  let formattedValue = `${prefix}${value}`;

  if (isPositive) {
    className = "text-[#1D8A70] dark:text-[#3CBF9C] font-medium";
    formattedValue = typeof value === 'string' ? value : `+${prefix}${value.toFixed(2)}`;
  }

  if (isNegative) {
    className = "text-[#BC4128] dark:text-[#E2694A] font-medium";
    formattedValue = typeof value === 'string' ? value : `-${prefix}${Math.abs(value).toFixed(2)}`;
  }

  return <td className={`px-5 py-4 whitespace-nowrap text-sm ${className}`}>{formattedValue}</td>;
};

/*----------------------------------------------------------------------
  Main Page Sections
----------------------------------------------------------------------*/

const SectionPortfolioAnalysis = () => (
  <SectionWrapper id="section-what" title='I. Portfolio Analysis (The "What")' subtitle="A quantitative breakdown of the Duquesne Family Office's Q3 2025 13F filing." className="bg-slate-50 dark:bg-[#14171B]">
    <div className="space-y-16">
      <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-2xl shadow-xl">
        <h3 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 mb-6 text-center font-serif">Portfolio Architecture: Q3 vs. Q2 2025</h3>
        <p className="text-lg text-slate-600 dark:text-slate-400 text-center max-w-3xl mx-auto mb-8">
          The portfolio&apos;s value remained stable, but a 63.27% turnover rate reveals a complete &ldquo;re-underwriting&rdquo; of positions.
          This is a strategy of active management and aggressive rotation, not &ldquo;buy and hold.&rdquo; The concentration is extreme:
          the top 10 holdings now make up 53.93% of the entire portfolio, up from a lower concentration in Q2.
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Metric</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Q2 2025</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Q3 2025</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Analysis</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#0A0D14] divide-y divide-slate-200">
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">Managed 13F AUM</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">$4.07 Billion</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">$4.06 Billion</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-500 italic">Stable value, masks internal churn.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">Number of Holdings</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">69</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">65</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-500 italic">Slightly more concentrated.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">Top 10 Holdings %</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">48.12%</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300 font-bold">53.93%</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-[#1D8A70] dark:text-[#3CBF9C] italic">Increased conviction in top names.</td>
              </tr>
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">Turnover %</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">~28%</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-[#BC4128] dark:text-[#E2694A] font-bold">63.27%</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-[#BC4128] dark:text-[#E2694A] italic">Hyper-aggressive rotation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-2xl shadow-xl">
        <h3 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 mb-6 text-center font-serif">Top 10 Holdings: The Core Convictions</h3>
        <p className="text-lg text-slate-600 dark:text-slate-400 text-center max-w-3xl mx-auto mb-8">
          The portfolio is extraordinarily concentrated. The top 3 healthcare names (NTRA, INSM, TEVA) alone represent
          nearly 30% of the entire portfolio, a massive &ldquo;bet the ranch&rdquo; move on three *uncorrelated* theses.
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Ticker</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Company</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">% of Portfolio</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Q/Q Change</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#0A0D14] divide-y divide-slate-200">
              <tr className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10">
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">NTRA</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Natera, Inc.</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-[#1D8A70] dark:text-[#3CBF9C]">~12.95%</td>
                <ChangeCell value="+4.2%" />
              </tr>
              <tr className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10">
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">INSM</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Insmed Inc.</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-[#1D8A70] dark:text-[#3CBF9C]">~8.74%</td>
                <ChangeCell value="+7.5%" />
              </tr>
              <tr className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10">
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">TEVA</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Teva Pharmaceutical</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-[#1D8A70] dark:text-[#3CBF9C]">~8.39%</td>
                <td className="px-5 py-4 text-sm text-slate-500 italic">New Position</td>
              </tr>
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">TSM</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Taiwan Semiconductor</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">~5.35%</td>
                <td className="px-5 py-4 text-sm text-slate-500 italic">Trimmed</td>
              </tr>
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">WWD</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">Woodward Inc.</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">~4.01%</td>
                <ChangeCell value="-25.4%" />
              </tr>
              <tr>
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">EEM</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">iShares MSCI Emerging Mkts</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">~2.54%</td>
                <td className="px-5 py-4 text-sm text-slate-500 italic">New Position</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-2xl shadow-xl">
          <h4 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6 text-center">Significant New Buys (Q3)</h4>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-green-800 uppercase">Ticker</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-green-800 uppercase">Company</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-green-800 uppercase">Portfolio %</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#0A0D14] divide-y divide-slate-200">
                <tr><td className="px-5 py-3 text-sm font-medium">TEVA</td><td className="px-5 py-3 text-sm">Teva Pharmaceutical</td><td className="px-5 py-3 text-sm font-bold">~8.39%</td></tr>
                <tr><td className="px-5 py-3 text-sm font-medium">EEM</td><td className="px-5 py-3 text-sm">iShares MSCI Emerging Markets</td><td className="px-5 py-3 text-sm font-bold">~2.54%</td></tr>
                <tr><td className="px-5 py-3 text-sm font-medium">AMZN</td><td className="px-5 py-3 text-sm">Amazon.com Inc</td><td className="px-5 py-3 text-sm">~2.15%</td></tr>
                <tr><td className="px-5 py-3 text-sm font-medium">META</td><td className="px-5 py-3 text-sm">Meta Platforms Inc</td><td className="px-5 py-3 text-sm">~1.98%</td></tr>
                <tr><td className="px-5 py-3 text-sm font-medium">GOOGL</td><td className="px-5 py-3 text-sm">Alphabet Inc</td><td className="px-5 py-3 text-sm">~1.80%</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-2xl shadow-xl">
          <h4 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6 text-center">Significant Exits (Q3)</h4>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-red-100">
                <tr>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-red-800 uppercase">Ticker</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-red-800 uppercase">Company</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-red-800 uppercase">Former %</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#0A0D14] divide-y divide-slate-200">
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
  <SectionWrapper id="section-sectors" title='II. Sector Allocation: "All In" on Health' subtitle="The portfolio's sector weights reveal the real conviction: a massive, concentrated bet on Healthcare." className="bg-white dark:bg-[#0A0D14]">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h3 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 mb-6 font-serif">Q3 2025 vs. Q2 2025</h3>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          In Q2, the portfolio was heavily weighted towards Information Technology. In Q3, that capital was aggressively
          rotated out of Tech and redeployed into a massive, concentrated Healthcare bet. Tech exposure was cut by more
          than half, while Healthcare exposure more than doubled, becoming by far the largest sector.
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Sector</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Q2 2025 Weight</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Q3 2025 Weight</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#0A0D14] divide-y divide-slate-200">
              <tr className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10">
                <td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">Healthcare</td>
                <td className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300">~18%</td>
                <td className="px-5 py-4 text-sm font-bold text-[#1D8A70] dark:text-[#3CBF9C]">~38.5%</td>
              </tr>
              <tr className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10">
                <td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">Information Technology</td>
                <td className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300">~29%</td>
                <td className="px-5 py-4 text-sm font-bold text-[#BC4128] dark:text-[#E2694A]">~13.2%</td>
              </tr>
              <tr>
                <td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">Communication Services</td>
                <td className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300">~7%</td>
                <td className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300">~9.4%</td>
              </tr>
              <tr>
                <td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">Industrials</td>
                <td className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300">~8%</td>
                <td className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300">~7.1%</td>
              </tr>
              <tr>
                <td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">ETFs (Broad Market)</td>
                <td className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300">~5%</td>
                <td className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300">~6.8%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-slate-500 mb-2 italic">Illustrative Chart</p>
        <div className="w-full max-w-md mx-auto aspect-square bg-slate-50 dark:bg-[#14171B] rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300">
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
  <SectionWrapper id="section-why" title='III. Decoding the Thesis (The "Why")' subtitle="Reverse-engineering the macro and micro themes behind the quarter's key trades." className="bg-slate-50 dark:bg-[#14171B]">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <InfoCard title="Theme 1: The Great AI Rotation" icon={<RefreshCw className="w-8 h-8" />} color="blue">
        Exiting first-wave, high-valuation AI (MSFT, NVDA) and rotating capital into &ldquo;cheaper,&rdquo; second-wave utility
        plays (AMZN, META, GOOGL). This is a bet on the long-term *platform implementers* (AWS, Google Cloud, Meta&apos;s
        Ad Engine) over the initial &ldquo;hype&rdquo; stocks, while anchoring the core AI thesis in TSM.
      </InfoCard>
      <InfoCard title="Theme 2: 'Being a Pig' in Healthcare" icon={<FlaskConical className="w-8 h-8" />} color="green">
        A massive, ~38.5% sector bet composed of three *uncorrelated* theses: a technology platform (Natera&apos;s genetic
        testing leadership), a binary drug catalyst (Insmed&apos;s Phase 3 data for its lung disease drug), and a
        value/special-situation play (Teva&apos;s GLP-1 generic potential).
      </InfoCard>
      <InfoCard title="Theme 3: The Macro 'Bessent Tell'" icon={<Globe className="w-8 h-8" />} color="indigo">
        A large new position in the Emerging Markets ETF (EEM). This is a pure macro trade on a weakening U.S. dollar
        and a &ldquo;global growth&rdquo; recovery, likely informed by his unique insight into the U.S. Treasury&apos;s policy path and
        the need to manage the U.S. deficit (which a weaker USD helps).
      </InfoCard>
      <InfoCard title="Theme 4: The Speculative Sleeve" icon={<Zap className="w-8 h-8" />} color="purple">
        Small (1-2%) asymmetric bets on disruptive, high-growth companies like Figure Technologies (FIGR) and Stubhub
        (STUB). These are low-risk (small size) but 100x potential &ldquo;home run&rdquo; tickets on the future of capital markets
        (FIGR) and the &ldquo;experience economy&rdquo; (STUB).
      </InfoCard>
    </div>
  </SectionWrapper>
);

const SectionRisks = () => (
  <SectionWrapper id="section-risks" title="IV. Risks & Alternative Views" subtitle="A strong thesis must be tested. What if the Q3 analysis is wrong?" className="bg-white dark:bg-[#0A0D14]">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <InfoCard title="Risk 1: Concentration Catastrophe" icon={<ShieldOff className="w-8 h-8" />} color="red">
        The ~30% bet on three healthcare names is a massive &ldquo;key-man risk&rdquo; on a few company-specific events. A failed
        drug trial (INSM) or regulatory setback (NTRA) could wipe out a significant portion of the quarter&apos;s gains.
        This is the opposite of diversification.
      </InfoCard>
      <InfoCard title="Risk 2: The Macro Head-Fake" icon={<TrendingDown className="w-8 h-8" />} color="yellow">
        The EEM (Emerging Markets) trade relies heavily on a weakening USD and a dovish Fed. If U.S. inflation remains
        sticky, forcing the Fed to stay &ldquo;higher for longer,&rdquo; the USD could *strengthen*, crushing the EEM position and
        hurting global growth.
      </InfoCard>
      <InfoCard title="Alt View: 'Bessent Edge' is Narrative" icon={<MessageSquare className="w-8 h-8" />} color="indigo">
        The &ldquo;Duquesne-Treasury Corridor&rdquo; is a compelling story, but it may be narrative fallacy. The more straightforward
        explanation is that Druckenmiller and Bessent are simply two smart investors trained in the same (Soros) system,
        arriving at similar conclusions independently.
      </InfoCard>
    </div>
  </SectionWrapper>
);

const SectionPhilosophy = () => (
  <SectionWrapper id="section-philosophy" title="V. The Philosophical Context" subtitle="The Q3 2025 filing is a perfect execution of Druckenmiller's core investment framework." className="bg-slate-50 dark:bg-[#14171B]">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <InfoCard title='"Preservation of Capital and Home Runs"' icon={<ShieldCheck className="w-8 h-8" />} color="blue">
        The 63.27% turnover *is* capital preservation&mdash;he&apos;s preserving gains by selling winners (MSFT) and cutting losers.
        The ~30% healthcare bet *is* the hunt for home runs. The Q3 portfolio is a perfect illustration of this dual focus.
      </InfoCard>
      <InfoCard title='"Top-Down" Trumps "Bottom-Up"' icon={<BarChart2 className="w-8 h-8" />} color="indigo">
        The EEM buy, the AI rotation, the *timing* of the healthcare bet&mdash;these are not bottom-up earnings plays. They
        are top-down macro calls on liquidity (Fed policy), valuation cycles (AI hype vs. utility), and global capital flows.
      </InfoCard>
      <InfoCard title="Mental Flexibility in Action" icon={<Brain className="w-8 h-8" />} color="purple">
        The 33 exits, including profitable, &ldquo;great&rdquo; companies like MSFT and NVDA, show a complete lack of ego. The Q3
        sale of these &ldquo;winners&rdquo; is the perfect example. His high turnover is a *feature*, allowing him to &ldquo;wipe the slate clean.&rdquo;
      </InfoCard>
      <InfoCard title='"Be a Pig"' icon={<TrendingUp className="w-8 h-8" />} color="green">
        This portfolio rejects &ldquo;di-worsification.&rdquo; The 53.93% top-10 concentration is the physical manifestation of his
        advice: &ldquo;if you really see it, put all your eggs in one basket and watch the basket very carefully.&rdquo;
      </InfoCard>
    </div>
  </SectionWrapper>
);

const SectionNexus = () => (
  <SectionWrapper id="section-nexus" title="VI. The Soros-Druckenmiller-Bessent Nexus" subtitle="Connecting past, present, and future to find the non-obvious 'edge' in the portfolio." className="bg-white dark:bg-[#0A0D14]">
    <div className="max-w-4xl mx-auto text-lg text-slate-700 dark:text-slate-300 leading-relaxed space-y-8">
      <div>
        <h3 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 mb-4 font-serif">
          The Soros Legacy: Learning to &ldquo;Go for the Jugular&rdquo;
        </h3>
        <p className="mb-6">
          Druckenmiller&apos;s time with George Soros, culminating in the 1992 pound short, taught him one crucial lesson:
          when you have high conviction, your sizing must be massive. Soros taught him to move from a &ldquo;ridiculous&rdquo; small
          bet to a 200%-of-net-worth trade.
        </p>
        <QuoteBlock source="George Soros (via Druckenmiller)">
          It&apos;s not whether you&apos;re right or wrong... but how much money you make when you&apos;re right and how much you lose
          when you&apos;re wrong.
        </QuoteBlock>
        <p>
          The ~30% healthcare bet in Q3 2025 is the direct application of this &ldquo;go for the jugular&rdquo; philosophy. It&apos;s a
          high-conviction, asymmetric bet where the upside (e.g., a successful drug trial) is multiples of the downside.
        </p>
      </div>

      <hr className="my-12 border-t-2 border-slate-200 dark:border-slate-800" />

      <div>
        <h3 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 mb-4 font-serif">
          The Bessent Connection: The Duquesne-Treasury Corridor
        </h3>
        <p className="mb-6">
          If Soros explains the *past*, U.S. Treasury Secretary Scott Bessent explains the *present*. Bessent,
          Druckenmiller&apos;s former colleague and fellow macro investor, now manages U.S. fiscal policy. This isn&apos;t just a
          friendship; it&apos;s an institutional connection, with a former Duquesne managing director now advising Bessent at Treasury.
        </p>
        <p className="mb-6">
          This &ldquo;Bessent Edge&rdquo; provides a shared worldview, not &ldquo;insider information.&rdquo; Druckenmiller understands *how*
          the Treasury will think and act because he was trained by the same mentor (Soros) and worked alongside Bessent
          for years. They share a &ldquo;macro language.&rdquo;
        </p>
        <ul className="space-y-4 list-disc list-inside">
          <li className="ml-4">
            <strong className="text-slate-900 dark:text-slate-100">The EEM Buy:</strong> A front-running of the inevitable policy path (a
            weaker USD) that Bessent, a currency specialist, knows is necessary to manage the U.S. deficit.
          </li>
          <li className="ml-4">
            <strong className="text-slate-900 dark:text-slate-100">The AI Rotation:</strong> Aligns perfectly with Bessent&apos;s public
            industrial policy to solve the tech labor bottleneck, directly benefiting the large-scale platforms (AMZN,
            GOOGL, META).
          </li>
        </ul>
      </div>
    </div>
  </SectionWrapper>
);

const SectionLessons = () => (
  <SectionWrapper id="section-lessons" title="VII. Synthesis: Lessons for the Investor" subtitle="Actionable, philosophical principles to distill from the Druckenmiller masterclass." className="bg-slate-50 dark:bg-[#14171B]">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <InfoCard title="1. Conviction > Diversification" icon={<Target className="w-8 h-8" />} color="blue">
        Challenge &ldquo;di-worsification.&rdquo; If deep research provides an asymmetric thesis, have the courage to make the
        position meaningful. Don&apos;t let your best ideas be diluted to mediocrity.
      </InfoCard>
      <InfoCard title="2. Mental Flexibility (No Ego)" icon={<Brain className="w-8 h-8" />} color="purple">
        Your true genius is not your &ldquo;calls&rdquo; but your &ldquo;folds.&rdquo; The stock doesn&apos;t know you own it. Be willing to sell a
        winner (MSFT) if a better idea (TEVA) comes along. Capital preservation is about redeployment.
      </InfoCard>
      <InfoCard title="3. Find Your Edge (And Mentor)" icon={<Search className="w-8 h-8" />} color="indigo">
        Druckenmiller&apos;s framework was built by Soros. His edge is a shared macro view with the Treasury. You won&apos;t win
        with consensus info. Find a unique, non-consensus insight and cultivate it.
      </InfoCard>
      <InfoCard title="4. Invest in the 18-Month Horizon" icon={<Eye className="w-8 h-8" />} color="green">
        &ldquo;Never, ever invest in the present.&rdquo; The market has already priced in today&apos;s news. Ask: &ldquo;What will the
        conventional wisdom be in two years, and how is it different from today?&rdquo; He&apos;s buying Teva not for today, but
        for its 2027 generic pipeline.
      </InfoCard>
      <InfoCard title="5. 'It's the Liquidity, Stupid'" icon={<DollarSign className="w-8 h-8" />} color="blue">
        &ldquo;Earnings don&apos;t move the overall market; it&apos;s the Federal Reserve...&rdquo; Focus on central banks and the movement
        of liquidity. Before asking if a company is cheap, ask what the Fed and Treasury will do next.
      </InfoCard>
      <InfoCard title="6. The Synthesis" icon={<Lightbulb className="w-8 h-8" />} color="purple">
        The ultimate lesson: Combine a top-down macro view (Liquidity) with deep, bottom-up conviction (Home Runs), and
        execute with ruthless, ego-less flexibility (Capital Preservation).
      </InfoCard>
    </div>
  </SectionWrapper>
);

/*----------------------------------------------------------------------
  Main Page Component
----------------------------------------------------------------------*/

export default function DruckenmillerQ32025Article() {
  return (
    <ArticleFrame
      slug="druckenmiller-q3-2025-rotation-conviction-bessent-edge"
      additionalDisclaimer="Specific portfolio percentages and figures in this analysis are illustrative and based on public 13F filing concepts; verify exact figures against official SEC filings before relying on them."
    >
      <div className="text-slate-700 dark:text-slate-300">
        <SectionPortfolioAnalysis />
        <SectionSectorAllocation />
        <SectionThesis />
        <SectionRisks />
        <SectionPhilosophy />
        <SectionNexus />
        <SectionLessons />
      </div>
    </ArticleFrame>
  );
}
