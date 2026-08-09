'use client';

import React from 'react';
import { TrendingUp, Zap, Globe, AlertTriangle, BookOpen, Landmark, PieChart, Activity, Search, Users, Clock, Scale, EyeOff } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Components ---
const Section = ({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto ${className}`}>
    {children}
  </section>
);

const Heading = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight ${className}`}>
    {children}
  </h2>
);

const Text = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6 ${className}`}>
    {children}
  </p>
);

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
  color?: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'slate';
}

const Card = ({ title, children, icon: Icon, color = "blue" }: CardProps) => {
  const colorMap = {
    blue: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-900/30 dark:text-blue-400",
    purple: "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-900/30 dark:text-purple-400",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-900/30 dark:text-emerald-400",
    amber: "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-900/30 dark:text-amber-400",
    rose: "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-900/20 dark:border-rose-900/30 dark:text-rose-400",
    slate: "bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-900/20 dark:border-slate-800 dark:text-slate-400",
  };
  return (
    <div className={`p-6 rounded-2xl border-2 ${colorMap[color]} transition-transform hover:-translate-y-1 duration-300 h-full`}>
      <div className="flex items-center mb-4">
        {Icon && <Icon className="w-6 h-6 mr-3" />}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <div className="text-slate-800 dark:text-slate-300">{children}</div>
    </div>
  );
};

const TickerBadge = ({ symbol, name, change }: { symbol: string; name: string; change?: string }) => (
  <div className="inline-flex items-center bg-white dark:bg-[#14171B] border border-slate-200 dark:border-white/10 rounded-full px-4 py-2 shadow-sm dark:shadow-none mr-3 mb-3">
    <span className="font-bold text-slate-900 dark:text-white mr-2">{symbol}</span>
    <span className="text-slate-500 dark:text-slate-400 text-sm mr-3 hidden sm:inline">{name}</span>
    {change && (
      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
        change === 'new' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
        change === 'sold' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      }`}>
        {change.toUpperCase()}
      </span>
    )}
  </div>
);

const TutorialTip = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl border border-indigo-100 dark:border-indigo-900/30 my-8">
    <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1 mr-4 flex-shrink-0" />
    <div>
      <h4 className="font-bold text-indigo-900 dark:text-indigo-400 text-sm uppercase tracking-wider mb-1">Tutorial Note</h4>
      <p className="text-indigo-800 dark:text-indigo-300 leading-relaxed">{children}</p>
    </div>
  </div>
);

const HoldingRow = ({ rank, name, ticker, allocation, type }: { rank: number; name: string; ticker: string; allocation: string; type: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors px-4 rounded-lg">
    <div className="flex items-center mb-2 sm:mb-0">
      <span className="w-8 h-8 flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400 font-bold rounded-full mr-4 text-sm">
        {rank}
      </span>
      <div>
        <div className="font-bold text-slate-900 dark:text-white">{name}</div>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">{ticker} • {type}</div>
      </div>
    </div>
    <div className="flex items-center sm:text-right pl-12 sm:pl-0">
      <div className="bg-slate-100 dark:bg-[#14171B] px-3 py-1 rounded-md font-mono text-sm font-semibold text-slate-700 dark:text-slate-300">
        {allocation}
      </div>
    </div>
  </div>
);

export default function DuquesneParadigmArticle() {
  return (
    <ArticleFrame slug="duquesne-paradigm-druckenmiller-portfolio-shift-q4-2025">
      <div className="bg-transparent font-sans text-slate-900 dark:text-slate-300">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <InfographicSlot alt="Duquesne Portfolio Analysis Infographic" />
        </div>

        {/* Intro Context */}
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Heading>The Macro Context</Heading>
              <Text>
                The fourth quarter of 2025 marked a seismic shift in global markets. With the return of "animal spirits" following the U.S. elections and the impending nomination of Kevin Warsh as Federal Reserve Chairman, the investment landscape has fundamentally changed.
              </Text>
              <Text>
                Stanley Druckenmiller, arguably the world's most successful macro investor, responded with a <strong>63% portfolio turnover</strong>. He abandoned yesterday's tech darlings for a new thesis centered on deregulation, energy scarcity, and broad financial recovery.
              </Text>
            </div>
            <div className="bg-slate-100 dark:bg-[#14171B] p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-600" />
                Key Stats (Q4 2025)
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-600 dark:text-slate-400">Total 13F Value</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">$4.49 Billion</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-600 dark:text-slate-400">Top 10 Concentration</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">52.3%</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-600 dark:text-slate-400">Quarterly Turnover</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">63.44%</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-slate-600 dark:text-slate-400">New Positions</span>
                  <span className="font-mono font-bold text-green-600 dark:text-green-400">28</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Tutorial: What is a 13F? */}
        <div className="bg-slate-900 text-white py-16">
          <Section className="py-0">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/3">
                <div className="bg-blue-600 p-4 rounded-xl inline-block mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">What is a 13F?</h2>
                <p className="text-slate-400">A quick primer for the common investor.</p>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                  A 13F is a mandatory quarterly report filed with the SEC by institutional investment managers with over $100 million in qualifying assets. It reveals their long U.S. equity positions as of the quarter's end.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <span className="text-green-400 font-bold block mb-1">The Opportunity</span>
                    <span className="text-sm text-slate-400">
                      See exactly what the "smart money" owns, allowing you to identify high-conviction themes and sector rotations.
                    </span>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <span className="text-red-400 font-bold block mb-1">The Trap</span>
                    <span className="text-sm text-slate-400">
                      Filings are delayed by 45 days. By the time you read this, Druckenmiller may have already sold. It is a lagging indicator.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Top Holdings */}
        <Section>
          <Heading>The Portfolio Architecture</Heading>
          <Text>
            Despite the aggressive rotation, the core of the portfolio remains anchored in healthcare and specialized biotech. However, notice the new entrants in ranks 4, 5, and 8—ETFs and consumer plays that signal the new strategy.
          </Text>
          <div className="bg-white dark:bg-[#14171B] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-none overflow-hidden mt-8">
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/20 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <span className="font-bold text-slate-700 dark:text-slate-300">Top 10 Holdings (Dec 31, 2025)</span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">Sorted by % Weight</span>
            </div>
            <div className="p-2">
              <HoldingRow rank={1} name="Natera Inc." ticker="NTRA" type="Healthcare (Diagnostics)" allocation="~12.5%" />
              <HoldingRow rank={2} name="Insmed Inc." ticker="INSM" type="Biotech" allocation="~5.7%" />
              <HoldingRow rank={3} name="Teva Pharmaceutical" ticker="TEVA" type="Pharma" allocation="~4.1%" />
              <HoldingRow rank={4} name="Financial Select Sector SPDR" ticker="XLF" type="ETF (Financials)" allocation="6.7%" />
              <HoldingRow rank={5} name="Invesco S&P 500 Equal Weight" ticker="RSP" type="ETF (Broad Market)" allocation="5.0%" />
              <HoldingRow rank={6} name="Taiwan Semi (TSMC)" ticker="TSM" type="Technology" allocation="~3.9%" />
              <HoldingRow rank={7} name="Woodward Inc." ticker="WWD" type="Aerospace" allocation="~4.2%" />
              <HoldingRow rank={8} name="Amazon.com" ticker="AMZN" type="Consumer/Cloud" allocation="~4.0%" />
              <HoldingRow rank={9} name="MercadoLibre" ticker="MELI" type="Consumer/Fintech" allocation="~3.4%" />
              <HoldingRow rank={10} name="DocuSign" ticker="DOCU" type="Software" allocation="~3.0%" />
            </div>
          </div>
        </Section>

        {/* Strategy 1: The AI Pivot */}
        <Section className="bg-slate-50 dark:bg-[#14171B] rounded-3xl my-12 relative overflow-hidden border border-slate-100 dark:border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 translate-y-1/2 -translate-x-1/3"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <div className="p-4 bg-purple-600 rounded-xl mr-5 shadow-lg shadow-purple-200">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">Theme 1: The AI Infrastructure Pivot</h2>
                <p className="text-purple-600 font-bold tracking-wide uppercase text-sm mt-1">From Silicon to Electrons</p>
              </div>
            </div>
            
            <div className="prose prose-lg text-slate-700 dark:text-slate-300 max-w-none mb-10">
              <p>
                The 2023-2024 era was defined by the "Chip Shortage." The 2025-2026 era is defined by the <strong>"Power Shortage."</strong> Druckenmiller's portfolio shift is a textbook example of identifying the <em>binding constraint</em> in a system.
              </p>
              <p>
                His thesis relies on a critical realization: <strong>Utility companies cannot upgrade the grid fast enough</strong> to meet the gigawatt-scale demands of hyperscalers (Amazon, Microsoft, Google). Therefore, the value shifts to companies that provide <em>independent</em> power generation and grid resilience.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-10">
              {/* The Problem: Grid Congestion */}
              <div className="bg-white dark:bg-[#14171B] p-8 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                  The Bottleneck Thesis
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  AI data centers require 24/7 "baseload" power. Solar and wind are intermittent. The US electrical grid has a 5-7 year backlog for new connections, creating a physical ceiling for AI growth.
                </p>
                <div className="bg-slate-100 dark:bg-slate-900/40 rounded-xl p-5">
                  <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                    <span>Chip Supply (Nvidia H100s)</span>
                    <span className="text-green-600">Stabilizing</span>
                  </div>
                  <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-2 mb-4">
                    <div className="bg-green-500 h-2 rounded-full shadow-sm" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
                    <span>Power Availability (Gigawatts)</span>
                    <span className="text-red-600">Critical Shortage</span>
                  </div>
                  <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full shadow-sm" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>

              {/* The Solution: Behind-the-Meter Generation */}
              <div className="bg-white dark:bg-[#14171B] p-8 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                  <Activity className="w-5 h-5 text-emerald-500 mr-2" />
                  The Solution (Holdings)
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  Druckenmiller bought companies that allow data centers to generate their own power on-site, bypassing the utility grid entirely.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                    <span className="font-bold text-emerald-900 dark:text-emerald-400 text-sm">Bloom Energy (BE)</span>
                    <span className="text-xs text-emerald-700 dark:text-emerald-300 bg-white dark:bg-black/40 px-2 py-1 rounded border border-emerald-100 dark:border-emerald-900/30">Solid Oxide Fuel Cells</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                    <span className="font-bold text-emerald-900 dark:text-emerald-400 text-sm">Vistra (VST)</span>
                    <span className="text-xs text-emerald-700 dark:text-emerald-300 bg-white dark:bg-black/40 px-2 py-1 rounded border border-emerald-100 dark:border-emerald-900/30">Nuclear Baseload</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                    <span className="font-bold text-emerald-900 dark:text-emerald-400 text-sm">GE Vernova (GEV)</span>
                    <span className="text-xs text-emerald-700 dark:text-emerald-300 bg-white dark:bg-black/40 px-2 py-1 rounded border border-emerald-100 dark:border-emerald-900/30">Grid Hardware</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deep Dive into Specific Trades */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Selling Side */}
              <Card title="The Exit: Reducing Compute" color="rose" icon={TrendingUp}>
                <div className="space-y-4">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    He aggressively trimmed the "picks and shovels" of the <em>previous</em> phase, citing diminishing marginal returns on hardware capex.
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-rose-100 dark:border-rose-900/30 pb-2">
                      <span className="font-bold text-slate-800 dark:text-white">Microsoft (MSFT)</span>
                      <span className="text-xs font-mono text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-2 py-1 rounded">-45% Size</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-rose-100 dark:border-rose-900/30 pb-2">
                      <span className="font-bold text-slate-800 dark:text-white">Broadcom (AVGO)</span>
                      <span className="text-xs font-mono text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-2 py-1 rounded">Sold Out</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-rose-50 dark:bg-rose-900/20 p-3 rounded-lg border border-rose-100 dark:border-rose-900/30">
                    <p className="text-xs text-rose-800 dark:text-rose-300 italic">
                      "Everyone owns the chips. The edge is gone. The Capex spend is massive, but the ROI timeline is extending."
                    </p>
                  </div>
                </div>
              </Card>

              {/* Buying Side */}
              <Card title="The Entry: Nuclear Renaissance" color="emerald" icon={Zap}>
                <div className="space-y-4">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    The bet is on <strong>Nuclear</strong> as the only carbon-free source stable enough for AI. This is a "Physics" trade, not a "Tech" trade.
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-emerald-100 dark:border-emerald-900/30 pb-2">
                      <span className="font-bold text-slate-800 dark:text-white">Cameco (CCJ)</span>
                      <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">New (Uranium)</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-emerald-100 dark:border-emerald-900/30 pb-2">
                      <span className="font-bold text-slate-800 dark:text-white">Constellation (CEG)</span>
                      <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">+25% Add</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 italic">
                      "If you believe in AI, you must believe in Nuclear. There is no other math that works for the grid."
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <TutorialTip>
              <strong>Macro Lesson:</strong> In a gold rush, first sell shovels (Nvidia). When everyone has shovels, sell them water and food (Energy). The "bottleneck trade" moves sequentially through the supply chain.
            </TutorialTip>
          </div>
        </Section>

        {/* Strategy 2: Animal Spirits */}
        <Section>
          <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-4">
              <Landmark className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <Heading className="mb-0">Theme 2: "Animal Spirits" & Deregulation</Heading>
          </div>
          <Text>
            Anticipating a pro-business administration, Druckenmiller made massive bets on the financial sector and broad market deregulation. This is a bet on M&A activity returning and banking constraints loosening.
          </Text>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="col-span-3 md:col-span-2">
              <Card title="The Financials Bet (XLF)" color="blue" icon={PieChart}>
                <p className="mb-4">The <strong>$301 Million</strong> purchase of XLF (Financial Select Sector SPDR) was the single largest move.</p>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-400">
                  <li>Betting on steeper yield curves.</li>
                  <li>Rollback of Basel III capital requirements.</li>
                  <li>Revival of Mergers & Acquisitions (Goldman Sachs position initiated).</li>
                </ul>
              </Card>
            </div>
            <div className="col-span-3 md:col-span-1">
              <Card title="Equal Weight (RSP)" color="amber" icon={Users}>
                <p className="mb-4 text-sm">Buying <strong>RSP</strong> (Equal Weight S&P 500) instead of SPY.</p>
                <p className="text-sm">
                  This signals a belief that the rally will <strong>broaden</strong> beyond the "Magnificent 7" to industrial and cyclical companies.
                </p>
              </Card>
            </div>
          </div>
        </Section>

        {/* The Kevin Warsh Connection */}
        <section className="bg-indigo-900 text-white py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-indigo-300">The "Inside" Edge: Kevin Warsh</h2>
                <p className="text-indigo-100 mb-6 leading-relaxed">
                  To understand the portfolio, you must understand the relationship. Kevin Warsh, the new Fed Chair, is Druckenmiller's former partner and protégé.
                </p>
                <div className="bg-indigo-800 p-6 rounded-xl border border-indigo-700">
                  <h4 className="font-bold text-white mb-2">Epistemological Capture</h4>
                  <p className="text-sm text-indigo-200">
                    A fancy term meaning the regulator thinks like the regulated. Warsh views the economy through a "market lens." He understands that liquidity drives markets. Druckenmiller's bet on Financials is a bet on a Fed that prioritizes market function.
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="absolute -inset-4 bg-indigo-500 rounded-full opacity-20 blur-2xl"></div>
                <div className="relative bg-indigo-950 p-8 rounded-2xl border border-indigo-800 shadow-2xl">
                  <h3 className="text-xl font-bold mb-4 text-white">The Warsh/Druckenmiller Nexus</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="bg-indigo-500 rounded-full p-1 mr-3 mt-1"></span>
                      <span className="text-indigo-100 text-sm">Warsh worked at Duquesne Family Office for over a decade.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-indigo-500 rounded-full p-1 mr-3 mt-1"></span>
                      <span className="text-indigo-100 text-sm">Druckenmiller lobbied heavily for Warsh's nomination.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-indigo-500 rounded-full p-1 mr-3 mt-1"></span>
                      <span className="text-indigo-100 text-sm">
                        <strong>The Strategy:</strong> Front-running the "Warsh Put." A Fed Chair who is sensitive to market signals lowers the risk of a catastrophic crash, justifying leverage in financials.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Macro */}
        <Section>
          <div className="flex items-center mb-6">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg mr-4">
              <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <Heading className="mb-0">Theme 3: Global Yield Arbitrage</Heading>
          </div>
          <Text>
            While bullish on the U.S., Druckenmiller hedged with massive positions in Brazil (EWZ) and Emerging Markets (EEM). Why?
          </Text>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h3 className="font-bold text-lg mb-3">The Inflation Hedge</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                If U.S. growth drives inflation, the Fed might not cut rates. Emerging markets with commodity exposure (like Brazil's oil and iron ore) benefit from global growth and offer high yields.
              </p>
            </div>
            <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h3 className="font-bold text-lg mb-3">The Holdings</h3>
              <div className="flex flex-wrap gap-2">
                <TickerBadge symbol="EWZ" name="Brazil ETF" change="new" />
                <TickerBadge symbol="EEM" name="Emerging Markets" change="add" />
              </div>
            </div>
          </div>
        </Section>

        {/* Retail Guide / Warnings */}
        <Section className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-16">
          <Heading>How to Leverage This Data</Heading>
          <Text>
            Following billionaires is dangerous if done blindly. The "Copy-Cat" portfolio often fails because retail investors lack the context of the trade. Here is a sophisticated framework for safe usage.
          </Text>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Warning 1: Blindspot */}
            <div className="flex flex-col p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-900/30">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg mr-3">
                  <EyeOff className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h4 className="font-bold text-amber-900 dark:text-amber-400 text-lg">The "Long-Only" Blindspot</h4>
              </div>
              <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                The 13F only shows what Druckenmiller <strong>owns</strong>. It does NOT show his short positions, currency trades, or cash. He could be shorting the S&P 500 futures against his long stock positions, making his net exposure bearish. You see the gas pedal, but not the brakes.
              </p>
            </div>

            {/* Action 1: Sectors over Tickers */}
            <div className="flex flex-col p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-900/30">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg mr-3">
                  <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-bold text-blue-900 dark:text-blue-400 text-lg">Use as a Compass, Not a GPS</h4>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                Don't buy 741,000 shares of Bloom Energy just because he did. Instead, recognize the <strong>trend</strong>: Energy Infrastructure is becoming critical. Go do your own research on utilities and grid providers. The value is in the <em>thesis</em>, not the specific ticker.
              </p>
            </div>

            {/* New Insight: Position Sizing */}
            <div className="flex flex-col p-6 bg-slate-50 dark:bg-[#14171B] rounded-xl border border-slate-200 dark:border-white/10">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg mr-3">
                  <Scale className="w-6 h-6 text-slate-700 dark:text-slate-400" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">Position Sizing = Conviction</h4>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Retail investors treat all picks equally. Druckenmiller does not. <br/><br/>
                <strong>• Under 1%:</strong> A "Starter" or "Tracking" position. High risk of being sold quickly.<br/>
                <strong>• 3-5%:</strong> High Conviction. He has done deep work here.<br/>
                <strong>• Over 10%:</strong> "Bet the Farm." Natera (NTRA) at 12.5% is a massive statement of confidence compared to a 0.5% stake in a small biotech.
              </p>
            </div>

            {/* New Insight: Time Horizon */}
            <div className="flex flex-col p-6 bg-slate-50 dark:bg-[#14171B] rounded-xl border border-slate-200 dark:border-white/10">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg mr-3">
                  <Clock className="w-6 h-6 text-slate-700 dark:text-slate-400" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">The "Trader" Mismatch</h4>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Druckenmiller is a <em>trader</em>, not a "buy and hold" investor like Buffett. He has famously said, "I can change my mind in 24 hours." <br/><br/>
                By the time you see the 13F (45 days later), the thesis may have broken, and he may have already exited. <strong>Never</strong> buy a 13F stock without an exit strategy of your own.
              </p>
            </div>
          </div>

          <TutorialTip>
            <strong>The Golden Rule:</strong> If you buy because he bought, you won't know when to sell when he sells. You are outsourcing your entry, but you are solely responsible for your exit.
          </TutorialTip>
        </Section>

      </div>
    </ArticleFrame>
  );
}
