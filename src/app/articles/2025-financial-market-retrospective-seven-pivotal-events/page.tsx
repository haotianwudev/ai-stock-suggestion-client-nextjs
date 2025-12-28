'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Maximize2, TrendingUp, TrendingDown, AlertTriangle, Zap, Globe, Cpu, DollarSign, Activity, BookOpen, Anchor, ShieldAlert, BarChart3, Target, Layers, Lock, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const EventCard = ({ event }) => {
  const themeColors = {
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-900',
      accent: 'bg-indigo-600',
      icon: 'text-indigo-600',
      lightAccent: 'bg-indigo-100',
      badge: 'bg-indigo-100 text-indigo-700'
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-900',
      accent: 'bg-orange-600',
      icon: 'text-orange-600',
      lightAccent: 'bg-orange-100',
      badge: 'bg-orange-100 text-orange-700'
    },
    red: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-900',
      accent: 'bg-rose-600',
      icon: 'text-rose-600',
      lightAccent: 'bg-rose-100',
      badge: 'bg-rose-100 text-rose-700'
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      accent: 'bg-emerald-600',
      icon: 'text-emerald-600',
      lightAccent: 'bg-emerald-100',
      badge: 'bg-emerald-100 text-emerald-700'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      accent: 'bg-blue-600',
      icon: 'text-blue-600',
      lightAccent: 'bg-blue-100',
      badge: 'bg-blue-100 text-blue-700'
    },
    slate: {
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      text: 'text-slate-900',
      accent: 'bg-slate-600',
      icon: 'text-slate-600',
      lightAccent: 'bg-slate-100',
      badge: 'bg-slate-100 text-slate-700'
    },
    yellow: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-900',
      accent: 'bg-amber-600',
      icon: 'text-amber-600',
      lightAccent: 'bg-amber-100',
      badge: 'bg-amber-100 text-amber-700'
    }
  };

  const theme = themeColors[event.color] || themeColors.slate;

  return (
    <div className={`mb-16 rounded-3xl overflow-hidden border ${theme.border} shadow-lg transition-all duration-300 hover:shadow-2xl bg-white`}>
      {/* Header Section */}
      <div className={`${theme.bg} p-8 md:p-10 border-b ${theme.border}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase ${theme.accent} text-white shadow-sm`}>
              {event.date}
            </span>
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${theme.badge} border border-opacity-20 border-current`}>
              {event.category}
            </span>
            {event.riskLevel && (
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-600">
                <AlertTriangle className="w-3 h-3" />
                Risk: {event.riskLevel}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
            {event.icon} <span className="uppercase tracking-wider text-xs">Event ID: 25-{event.id}</span>
          </div>
        </div>
        <h2 className={`text-3xl md:text-5xl font-extrabold ${theme.text} mb-6 leading-tight`}>
          {event.title}
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed max-w-4xl font-light">
          {event.summary}
        </p>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
        {/* Left Column: Narrative Analysis */}
        <div className="lg:col-span-7 p-8 md:p-10 space-y-8">
          <div className="prose prose-lg text-gray-600">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-gray-400" /> Market Anatomy
            </h3>
            <p className="text-gray-600 leading-relaxed">{event.anatomy}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" /> Strategic Insight
            </h3>
            <div className={`p-8 rounded-2xl ${theme.bg} border-l-4 ${theme.border} border-l-${event.color}-500`}>
              <p className={`text-lg font-medium ${theme.text} italic leading-relaxed`}>
                "{event.insight}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Opportunities & Lesson */}
        <div className="lg:col-span-5 bg-gray-50 p-8 md:p-10 flex flex-col h-full">
          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Target className="w-4 h-4" /> Trade Opportunities
              </h4>
              <ul className="space-y-4">
                {event.opportunities.map((opp, idx) => (
                  <li key={idx} className="flex items-start gap-4 group">
                    <div className={`mt-1.5 w-2 h-2 rounded-full ${theme.accent} group-hover:scale-125 transition-transform`} />
                    <span className="text-gray-700 font-medium text-sm leading-snug">{opp}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-8 border-t border-gray-200">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Core Lesson
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed border-l-2 border-gray-300 pl-4">
                {event.lesson}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Section */}
      <div className="bg-slate-50 border-t border-gray-200 p-8 md:p-10">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-gray-500" />
                The Mechanics (Detailed)
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line border-l-2 border-gray-200 pl-4">
                {event.details}
              </p>
            </div>
            {/* Sector Watch */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Sector Watch</h4>
              <div className="flex flex-wrap gap-2">
                {event.affectedSectors.map((sector, i) => (
                  <span key={i} className={`px-3 py-1 rounded-md text-xs font-semibold ${theme.bg} ${theme.text} border ${theme.border}`}>
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-gray-500" />
                Key Data Points
              </h4>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <ul className="space-y-4">
                  {event.stats.map((stat, i) => (
                    <li key={i} className="flex justify-between items-center text-sm border-b last:border-0 border-gray-100 pb-3 last:pb-0">
                      <span className="text-gray-500 font-medium">{stat.label}</span>
                      <span className={`font-mono font-bold ${theme.text}`}>{stat.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Historical Parallel */}
            <div className="bg-gray-100 p-5 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-600 text-xs uppercase tracking-wider mb-2">Historical Parallel</h4>
              <p className="text-gray-800 text-sm font-medium italic">"{event.parallel}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TacticalPlaybook = () => (
  <div className="mt-20 bg-gray-900 text-white rounded-3xl p-10 md:p-14 shadow-2xl overflow-hidden relative">
    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20"></div>
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-500 rounded-lg">
          <Target className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold">The 2025 Tactical Playbook</h2>
      </div>
      <p className="text-gray-300 max-w-2xl mb-10 text-lg">
        Based on the events of 2025, here are the codified strategies for navigating specific market regimes. Keep this matrix for future volatility events.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Populist Tariff Threats",
            trigger: "Executive Order / Tweet",
            action: "Fade the initial panic.",
            strategy: "The 'TACO' Reversal",
            detail: "Sell the rumor (threat), Buy the fact (delay). Tariffs are leverage, not policy.",
            icon: <Globe className="w-5 h-5 text-rose-400" />
          },
          {
            title: "Tech Efficiency Shock",
            trigger: "New Model Release",
            action: "Short Hardware, Long Adopters.",
            strategy: "Value Transfer Trade",
            detail: "If AI gets cheaper, margin moves from Nvidia to Companies USING AI.",
            icon: <Cpu className="w-5 h-5 text-indigo-400" />
          },
          {
            title: "Institutional distrust",
            trigger: "Fed Political Pressure",
            action: "Long Gold & Bitcoin.",
            strategy: "The 'Sovereignty' Hedge",
            detail: "When Central Bank independence is threatened, fiat currency correlation goes to 1.",
            icon: <ShieldAlert className="w-5 h-5 text-amber-400" />
          },
          {
            title: "Geopolitical De-escalation",
            trigger: "Summit Announcement",
            action: "Short Volatility (VIX).",
            strategy: "Relief Rally Capture",
            detail: "Markets price in worst-case scenarios. 'Status Quo' is a bullish catalyst.",
            icon: <Anchor className="w-5 h-5 text-blue-400" />
          }
        ].map((play, i) => (
          <div key={i} className="bg-gray-800 bg-opacity-50 border border-gray-700 p-6 rounded-xl hover:bg-gray-800 transition-colors">
            <div className="mb-4">{play.icon}</div>
            <h3 className="font-bold text-lg mb-2 text-white">{play.title}</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500 uppercase text-xs font-bold">Trigger</span>
                <p className="text-gray-300">{play.trigger}</p>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-xs font-bold">Action</span>
                <p className="text-indigo-300 font-semibold">{play.action}</p>
              </div>
              <div className="pt-3 border-t border-gray-700 mt-3">
                <p className="text-gray-400 text-xs leading-relaxed">{play.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function FinancialRetrospective2025() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const currentArticle = articles.find(article => article.slug === '2025-financial-market-retrospective-seven-pivotal-events');

  const events = [
    {
      id: "01",
      title: "The Efficiency Shock",
      date: "Jan 27, 2025",
      category: "Technology",
      color: "indigo",
      riskLevel: "High",
      icon: <Cpu className="w-5 h-5 text-indigo-600" />,
      affectedSectors: ["Semiconductors", "Software", "Cloud Providers", "Data Centers"],
      summary: "The 'DeepSeek' moment shattered the 'infinite demand' narrative for AI hardware, triggering a massive, albeit temporary, repricing in the semiconductor sector as 'Inference' replaced 'Training' as the dominant narrative.",
      anatomy: "DeepSeek unveiled its R1 model (Reasoning Model), achieving parity with Western giants at a fraction of the cost ($6M vs $100M+). This 'Efficiency Paradox' suggested that AI software could optimize hardware needs faster than anticipated. Nvidia (NVDA) dropped 17% in a single day, dragging down AMD and TSM.",
      insight: "When the cost of intelligence falls, the value accrues to the user, not the supplier. Efficiency is deflationary for shovel sellers in the short run.",
      opportunities: [
        "Panic Put: Buying the dip on Nvidia at $95 post-crash.",
        "Sector Rotation: Moving capital from Hardware to 'Edge AI' software (Palantir/ServiceNow).",
        "Shorting leveraged semi ETFs (SOXL) during the initial shock."
      ],
      lesson: "In exponential tech, efficiency improvements can temporarily wreck hardware monopolies. Distinguish between compute volume and compute value.",
      details: "The market was pricing in linear scaling laws—that better AI requires exponentially more chips. DeepSeek proved that smarter code (optimization) is a viable substitute for brute force compute. \n\nThis caused a violent rotation: 'Capex Spenders' (Meta, Google) were punished, while 'AI Adopters' (Banks, Healthcare) rallied as their cost of implementing AI plummeted overnight. The trade shifted from 'Who sells the chips?' to 'Who uses the cheap intelligence?'.",
      stats: [
        { label: "Nvidia 1-Day Loss", value: "-$589 Billion" },
        { label: "DeepSeek Training Cost", value: "< $6 Million" },
        { label: "SOXX ETF Drawdown", value: "-22%" },
        { label: "VIX Spike", value: "28.5" }
      ],
      parallel: "The 2000 Fiber Optic Glut: Capacity increased faster than demand, crushing hardware prices temporarily."
    },
    {
      id: "02",
      title: "The Bitcoin Crush",
      date: "Feb 28, 2025",
      category: "Crypto",
      color: "orange",
      riskLevel: "Medium",
      icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
      affectedSectors: ["Cryptocurrency", "Exchanges", "Fintech"],
      summary: "A perfect storm of exchange hacks and regulatory fear caused a liquidity flush, creating the year's best entry point for digital assets.",
      anatomy: "The $1.5B Bybit hack combined with pre-tariff 'risk-off' sentiment drove Bitcoin below key supports ($90k). It was a classic 'idiosyncratic risk' (exchange failure) dragging down 'systemic pricing' (asset value). The narrative shifted violently to 'Not your keys, not your coins' (Self-Custody).",
      insight: "In crypto, exchange failures are often misread as protocol failures. This mispricing is the primary source of alpha for solvent capital.",
      opportunities: [
        "The Bernstein Trade: Accumulating BTC below $90k.",
        "Arbitrage: Buying spot assets while futures basis collapsed.",
        "Long Sovereignty: Betting on BTC as a hedge against the coming 'Shadow Fed'."
      ],
      lesson: "Leverage kills. The crash was exacerbated by liquidations, not fundamentals. When the 'paper' market burns, the 'spot' market offers generational value.",
      details: "While retail panic sold, institutional analysts (like those at Bernstein) correctly identified this as a liquidity event. The subsequent recovery was driven by the realization that exchange security has no bearing on the Bitcoin network's integrity. \n\nCrucially, this event accelerated the move toward DeFi and on-chain trading, as users abandoned centralized exchanges in favor of DEXs like Uniswap, which saw volume triple in March.",
      stats: [
        { label: "Hack Loss", value: "$1.5 Billion" },
        { label: "BTC Low", value: "$88,400" },
        { label: "DEX Volume Growth", value: "+300%" },
        { label: "Liquidations", value: "$850 Million" }
      ],
      parallel: "Mt. Gox 2014: A necessary cleansing that removed bad actors and strengthened the survivor protocol."
    },
    {
      id: "03",
      title: "'Liberation Day' Shock",
      date: "Apr 2, 2025",
      category: "Geopolitics",
      color: "red",
      riskLevel: "Extreme",
      icon: <Globe className="w-5 h-5 text-rose-600" />,
      affectedSectors: ["Retail", "Auto", "Logistics", "Manufacturing"],
      summary: "A universal 10% tariff implementation shocked global markets, wiping out $5.8 trillion and marking the death of the 'Free Trade' era.",
      anatomy: "Markets move faster than supply chains. The immediate 11% drop in the S&P 500 was a repricing of global margins. Importers (Nike, Apple, Walmart) were decimated, while domestic steel and manufacturing briefly surged. The 'Trump Put' was tested and initially failed.",
      insight: "Supply chain concentration is a solvency risk. The market punished 'efficiency' (cheap foreign labor) and rewarded 'resilience' (domestic production).",
      opportunities: [
        "Short Importers: Aggressive puts on Retail (XRT) and Tech Hardware.",
        "Long Domestic: Buying US Steel (X) and Nucor.",
        "The 'TACO' Reversal: Buying the panic bottom betting on a policy walk-back."
      ],
      lesson: "In a protectionist regime, the stock market acts as a check on policy. The 'Trump Put' replaced the 'Fed Put'—policy softens when equities crash.",
      details: "This event birthed the 'TACO Trade' (Trump Always Chickens Out). Traders learned to short the announcement and buy the inevitable 'pause' or 'negotiation' phase that followed weeks later. \n\nThe shock was specific: Consumer Discretionary fell 15%, while Energy was flat. This dispersion allowed active managers to outperform passive indices significantly.",
      stats: [
        { label: "S&P 500 Drop (4 Days)", value: "-11%" },
        { label: "Global Equity Loss", value: "$3 Trillion" },
        { label: "Tariff Rate", value: "10% Universal" },
        { label: "Retail Sector", value: "-15%" }
      ],
      parallel: "Smoot-Hawley 1930: Though less severe, the psychological impact on global trade cooperation was identical."
    },
    {
      id: "04",
      title: "The TACO Trade",
      date: "May - June 2025",
      category: "Strategy",
      color: "emerald",
      riskLevel: "Low (if timed)",
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
      affectedSectors: ["Volatility (VIX)", "Emerging Markets", "Autos"],
      summary: "Behavioral alpha at its finest. Investors realized that the Administration used tariffs as negotiation tactics, creating predictable 'Dip and Rip' patterns.",
      anatomy: "Cycle: 1. Threat (Market Drops) -> 2. Lobbyist Pressure -> 3. Retreat/Delay (Market Rallies). This became the dominant algo strategy for Q2. The acronym 'TACO' (Trump Always Chickens Out) became standard trading desk lexicon.",
      insight: "Political beta is tradeable if you understand the politician's pain threshold. The administration measured success by the S&P 500, creating a floor.",
      opportunities: [
        "Buying the VIX spikes > 25.",
        "Long Autos (Ford/GM) after tariff threats, betting on the Midwestern voter block protection.",
        "Fading the headlines: Selling calls on tariff-free rumors."
      ],
      lesson: "Markets under populist leaders are mean-reverting. Fade the noise, trade the incentives.",
      details: "Smart money stopped reading economic forecasts and started profiling the administration's reaction function. The 90-day pause in tariffs validated this thesis, leading to a massive relief rally in May. \n\nThe strategy was simple: Wait for the Tweet, Short the Open, Cover on the Press Secretary clarification 48 hours later.",
      stats: [
        { label: "Strategy", value: "Mean Reversion" },
        { label: "Win Rate", value: "85% (Q2)" },
        { label: "Key Sector", value: "Manufacturing" },
        { label: "Avg Duration", value: "4 Days" }
      ],
      parallel: "2019 Trade War: The 'Trade Deal Coming Soon' headlines that repeatedly pumped markets."
    },
    {
      id: "05",
      title: "The Geneva Reset",
      date: "June 2025",
      category: "Diplomacy",
      color: "blue",
      riskLevel: "Low",
      icon: <Anchor className="w-5 h-5 text-blue-600" />,
      affectedSectors: ["Shipping", "Emerging Markets", "Agri-Business"],
      summary: "Diplomatic stabilization talks in London and Geneva removed the tail risk of a total economic blockade, saving the global bull market.",
      anatomy: "While tariffs remained, the threat of 'Total Embargo' was removed via high-level talks. It established a 'Small Yard, High Fence' doctrine—restricting high-end tech but allowing consumer goods to flow freely.",
      insight: "Geopolitical de-escalation is priced in *before* treaties are signed. The absence of bad news was the good news.",
      opportunities: [
        "Long Emerging Markets (EEM) at the bottom.",
        "Long Logistics (Maersk/FedEx) as trade lanes stabilized.",
        "Re-entry into global tech supply chains (Foxconn/Apple)."
      ],
      lesson: "Diplomacy is a leading indicator for Volatility. The Reset crushed the VIX, forcing systematic funds to re-lever into equities.",
      details: "This was the 'adults in the room' moment. The market realized that while rhetoric was hot, economic interdependence prevented total divorce. \n\nThe 'Small Yard, High Fence' policy meant chip restrictions stayed, but sneakers and phones could flow. This saved Apple's Q3 guidance.",
      stats: [
        { label: "Outcome", value: "Stabilization" },
        { label: "Beneficiary", value: "China Tech (KWEB)" },
        { label: "Volatility", value: "Crushed (-40%)" },
        { label: "Shipping Rates", value: "Normalized" }
      ],
      parallel: "U.S.-Soviet Détente (1970s): Establishing rules of engagement to prevent mutual destruction."
    },
    {
      id: "06",
      title: "AI Capex Fatigue",
      date: "July - Aug 2025",
      category: "Market Cycle",
      color: "slate",
      riskLevel: "Medium",
      icon: <TrendingDown className="w-5 h-5 text-slate-600" />,
      affectedSectors: ["Big Tech (Mag 7)", "Utilities", "Nuclear"],
      summary: "The market began to demand 'Show me the revenue' from Hyperscalers, leading to a rotation out of the Magnificent 7.",
      anatomy: "With Microsoft spending $80B/year, investors grew skeptical of the ROI timeline. Broadcom and Oracle signaled delays, causing a pullback in Big Tech. However, capital didn't leave the market; it rotated.",
      insight: "Theme Rotation: Capital moved from 'Digital AI' (Software/Chips) to 'Physical AI' (Energy/Utilities/Robotics). The AI story morphed into an Energy story.",
      opportunities: [
        "Long Utilities/Nuclear: AI needs power. Constellation Energy (CEG) broke out.",
        "Long Domestic Manufacturing: AI needs distinct physical housing.",
        "Short/Avoid: Over-valued SaaS with no clear AI monetization."
      ],
      lesson: "Even secular bull markets have cyclical corrections. The 'build it and they will come' phase always yields to the 'prove it' phase.",
      details: "This wasn't an AI crash, but a reality check. It allowed the S&P 493 (the rest of the market) to catch up to the Mag 7. \n\nNuclear stocks became the new darlings as Amazon and Google signed Power Purchase Agreements (PPAs) directly with nuclear plants to bypass grid congestion.",
      stats: [
        { label: "MSFT Capex", value: "$80 Billion" },
        { label: "Mag 7 Performance", value: "-8% (Aug)" },
        { label: "Utilities Sector", value: "+12% (Aug)" },
        { label: "Nuclear ETFs", value: "All Time Highs" }
      ],
      parallel: "Dotcom 2000-2001: When the infrastructure build-out paused before the application layer (Amazon/Google) emerged."
    },
    {
      id: "07",
      title: "Gold Super-Cycle & Fed Pivot",
      date: "Q4 2025",
      category: "Macro",
      color: "yellow",
      riskLevel: "Med-High",
      icon: <ShieldAlert className="w-5 h-5 text-amber-600" />,
      affectedSectors: ["Precious Metals", "Real Estate", "Banks"],
      summary: "Gold decoupled from real rates, soaring past $4,100/oz as trust in the Federal Reserve's independence waned.",
      anatomy: "Rumors of a 'Shadow Fed Chair' and political pressure forced the Fed to cut rates into sticky inflation (3.5%). Investors fled fiat for hard assets. This was a vote of no confidence in the Dollar's purchasing power.",
      insight: "Gold is no longer an inflation hedge; it is a 'Sanctions Hedge' and 'Institution Hedge'. It rises when trust in the sovereign falls.",
      opportunities: [
        "Long Miners (NEM/GOLD): Operational leverage created triple-digit returns.",
        "Curve Steepeners: Betting on long-end yields rising due to inflation fears.",
        "Real Estate: Benefiting from the nominal rate cuts."
      ],
      lesson: "Don't fight the Fed, but don't trust them either. When fiscal dominance forces monetary policy, hard assets outperform paper assets.",
      details: "The Fed cut rates in Sept, Oct, and Dec, ending the year at 3.50-3.75%. This validated the 'Gold Bugs' who argued that the US debt load ($38T) made positive real rates mathematically impossible. \n\nCentral Banks in the Global South accelerated buying, using Gold to settle trade outside the SWIFT system.",
      stats: [
        { label: "Gold Price", value: "> $4,100/oz" },
        { label: "Fed Rate", value: "3.50% - 3.75%" },
        { label: "Miner Gains", value: "+200%+" },
        { label: "US Debt", value: "$38 Trillion" }
      ],
      parallel: "The 1970s Stagflation: A loss of faith in the currency led to a decade-long commodity boom."
    }
  ];

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-white relative overflow-hidden border-b border-slate-100">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
          <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest mb-8 border border-slate-200">
                  <BarChart3 className="w-4 h-4 text-indigo-500" />
                  2025 Market Retrospective
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                  The Year of the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Great Pivot.</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
                  The death of the linear narrative. From the "DeepSeek" shock to the "Gold Super-Cycle," 2025 was a masterclass in regime change.
                </p>
              </div>
              {/* Hero Stats */}
              <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 min-w-[140px]">
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">S&P 500</div>
                  <div className="text-2xl font-black text-emerald-600">+17.5%</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 min-w-[140px]">
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Gold</div>
                  <div className="text-2xl font-black text-amber-500">+32.4%</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 min-w-[140px]">
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Avg VIX</div>
                  <div className="text-2xl font-black text-indigo-600">19.2</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 min-w-[140px]">
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">US 10Y</div>
                  <div className="text-2xl font-black text-rose-600">4.85%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Infographic */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/FlVMnGq.jpeg" 
              alt="2025 Financial Market Retrospective Infographic" 
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

        {/* Full-screen image viewer */}
        <FullScreenImageViewer
          src="https://i.imgur.com/FlVMnGq.jpeg"
          alt="2025 Financial Market Retrospective Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* Main Content Area */}
        <main className="max-w-5xl mx-auto px-6 py-16">
          {/* Intro Card */}
          <div className="mb-24 bg-gray-900 rounded-[2rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Activity className="w-6 h-6 text-indigo-400" />
                Executive Summary
              </h2>
              <div className="grid md:grid-cols-2 gap-12 text-gray-300 text-lg leading-relaxed">
                <p>
                  We entered 2025 expecting a soft landing and linear AI growth. We got neither. Instead, we faced <span className="text-white font-semibold">"Liberation Day" tariffs</span>, <span className="text-white font-semibold">"Efficiency Shocks,"</span> and a complete monetary pivot.
                </p>
                <p>
                  The S&P 500 finished up ~17.5%, but this number masks the violent rotation under the surface. The era of passive indexing is fading; 2025 proved that <strong className="text-indigo-300">volatility is the only asset class that matters.</strong>
                </p>
              </div>
              {/* Legend */}
              <div className="mt-12 pt-8 border-t border-gray-800 flex flex-wrap gap-8 text-sm font-medium text-gray-400">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                  Tech Shocks
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></span>
                  Trade Wars
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
                  Gold & Macro
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                  Strategy
                </div>
              </div>
            </div>
          </div>

          {/* Timeline of Events */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-9 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 hidden md:block"></div>
            <div className="space-y-8">
              {events.map((event, index) => (
                <div key={index} className="relative md:pl-24 group">
                  {/* Timeline Dot */}
                  <div className={`absolute left-1 top-12 w-16 h-16 rounded-2xl rotate-45 border-4 border-white shadow-lg z-10 hidden md:flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${
                    event.color === 'indigo' ? 'bg-indigo-100' : ''
                  }${
                    event.color === 'orange' ? 'bg-orange-100' : ''
                  }${
                    event.color === 'red' ? 'bg-rose-100' : ''
                  }${
                    event.color === 'emerald' ? 'bg-emerald-100' : ''
                  }${
                    event.color === 'blue' ? 'bg-blue-100' : ''
                  }${
                    event.color === 'slate' ? 'bg-slate-100' : ''
                  }${
                    event.color === 'yellow' ? 'bg-amber-100' : ''
                  }`}>
                    {/* Icon in Dot */}
                    <div className="transform -rotate-45">
                      {event.icon}
                    </div>
                  </div>
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>

          {/* Tactical Playbook Section */}
          <TacticalPlaybook />

          {/* Outlook Section */}
          <div className="mt-20 p-12 bg-white rounded-3xl border border-gray-200 shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-cyan-500"></div>
            <h2 className="text-4xl font-black text-gray-900 mb-6">2026 Outlook: The "Prove-It" Phase</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              The passive "buy and hold" strategies of the 2010s are ill-suited for this environment. The coming year requires active management and exposure to hard assets.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">AI Implementation</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Companies must prove AI spend generates free cash flow, not just press releases. Focus on "Applied AI" in Healthcare and Finance.
                </p>
              </div>
              <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center mb-4 text-rose-600">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Strategic Reset</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Will the Geneva Reset hold? The 2026 outlook depends on the durability of this fragile detente. Watch shipping rates for early warning signs.
                </p>
              </div>
              <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Fed Independence</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  With Powell's term ending in May 2026, the successor nomination is the critical event for bonds. Political appointees will spike yields.
                </p>
              </div>
            </div>
          </div>

          {/* Call-to-Action Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <BookOpen className="inline mr-2" />
                  Read Full Research Paper
                </a>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-16 mt-12">
          <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold">25</div>
              <span className="font-bold text-xl tracking-tight text-gray-900">Retrospective</span>
            </div>
            <div className="text-gray-500 text-sm space-y-2 max-w-lg">
              <p>© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
              <p>This interactive report is a retrospective simulation and should not be considered financial advice. Past performance is not indicative of future results.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}