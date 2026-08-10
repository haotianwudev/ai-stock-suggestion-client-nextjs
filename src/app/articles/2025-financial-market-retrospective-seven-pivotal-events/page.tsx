'use client';

import React from 'react';
import { TrendingDown, AlertTriangle, Zap, Globe, Cpu, DollarSign, Activity, BookOpen, Anchor, ShieldAlert, BarChart3, Target, Layers, Lock } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

function riskTone(riskLevel: string): 'pos' | 'neg' | 'accent' {
  if (/extreme|high/i.test(riskLevel)) return 'neg';
  if (/low/i.test(riskLevel)) return 'pos';
  return 'accent';
}

const riskToneClass: Record<'pos' | 'neg' | 'accent', string> = {
  pos: 'bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 text-[#1D8A70] dark:text-[#3CBF9C] border-[#1D8A70]/30 dark:border-[#3CBF9C]/30',
  neg: 'bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A] border-[#BC4128]/30 dark:border-[#E2694A]/30',
  accent: 'bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] border-[#A8672E]/30 dark:border-[#D08F52]/30',
};

interface EventData {
  id: string;
  title: string;
  date: string;
  category: string;
  riskLevel: string;
  icon: React.ReactNode;
  affectedSectors: string[];
  summary: string;
  anatomy: string;
  insight: string;
  opportunities: string[];
  lesson: string;
  details: string;
  stats: { label: string; value: string }[];
  parallel: string;
}

const EventCard = ({ event }: { event: EventData }) => {
  return (
    <div className="mb-12 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-[#A8672E]/5 dark:bg-[#D08F52]/5 p-6 md:p-8 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#A8672E] dark:bg-[#D08F52] text-white dark:text-[#14171B]">
              {event.date}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              {event.category}
            </span>
            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${riskToneClass[riskTone(event.riskLevel)]}`}>
              <AlertTriangle className="w-3 h-3" />
              Risk: {event.riskLevel}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {event.icon} Event ID: 25-{event.id}
          </div>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-4 leading-tight">
          {event.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
          {event.summary}
        </p>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 dark:divide-gray-800">
        {/* Left Column: Narrative Analysis */}
        <div className="lg:col-span-7 p-6 md:p-8 space-y-6">
          <div>
            <h3 className="font-serif text-lg text-gray-900 dark:text-white flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-gray-400" /> Market Anatomy
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{event.anatomy}</p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-gray-900 dark:text-white flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" /> Strategic Insight
            </h3>
            <div className="p-5 rounded-lg bg-[#A8672E]/5 dark:bg-[#D08F52]/5 border-l-4 border-[#A8672E] dark:border-[#D08F52]">
              <p className="text-[#A8672E] dark:text-[#D08F52] font-medium italic leading-relaxed">
                &ldquo;{event.insight}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Opportunities & Lesson */}
        <div className="lg:col-span-5 bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
                <Target className="w-4 h-4" /> Trade Opportunities
              </h4>
              <ul className="space-y-3">
                {event.opportunities.map((opp, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#A8672E] dark:bg-[#D08F52] flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm leading-snug">{opp}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Core Lesson
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-l-2 border-gray-300 dark:border-gray-700 pl-4">
                {event.lesson}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Section */}
      <div className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 p-6 md:p-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-gray-500" />
                The Mechanics (Detailed)
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line border-l-2 border-gray-200 dark:border-gray-800 pl-4">
                {event.details}
              </p>
            </div>
            {/* Sector Watch */}
            <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-800">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Sector Watch</h4>
              <div className="flex flex-wrap gap-2">
                {event.affectedSectors.map((sector, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#A8672E]/5 dark:bg-[#D08F52]/5 text-[#A8672E] dark:text-[#D08F52] border border-[#A8672E]/20 dark:border-[#D08F52]/20">
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2 uppercase tracking-wide">
                <BarChart3 className="w-4 h-4" />
                Key Data Points
              </h4>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <ul className="space-y-3">
                  {event.stats.map((stat, i) => (
                    <li key={i} className="flex justify-between items-center text-sm border-b last:border-0 border-gray-100 dark:border-gray-800 pb-2.5 last:pb-0">
                      <span className="text-gray-500 dark:text-gray-400">{stat.label}</span>
                      <span className="font-mono tabular-nums font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Historical Parallel */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Historical Parallel</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm italic">&ldquo;{event.parallel}&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TacticalPlaybook = () => (
  <div className="mt-16 bg-[#14171B] dark:bg-[#05070A] text-white rounded-xl p-8 md:p-10 shadow-lg">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 bg-[#D08F52]/15 rounded-lg">
        <Target className="w-5 h-5 text-[#D08F52]" />
      </div>
      <h2 className="font-serif text-2xl md:text-3xl">The 2025 Tactical Playbook</h2>
    </div>
    <p className="text-gray-400 max-w-2xl mb-8">
      Based on the events of 2025, here are the codified strategies for navigating specific market regimes. Keep this matrix for future volatility events.
    </p>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      {[
        {
          title: "Populist Tariff Threats",
          trigger: "Executive Order / Tweet",
          action: "Fade the initial panic.",
          detail: "Sell the rumor (threat), Buy the fact (delay). Tariffs are leverage, not policy.",
          icon: <Globe className="w-5 h-5 text-[#D08F52]" />
        },
        {
          title: "Tech Efficiency Shock",
          trigger: "New Model Release",
          action: "Short Hardware, Long Adopters.",
          detail: "If AI gets cheaper, margin moves from Nvidia to Companies USING AI.",
          icon: <Cpu className="w-5 h-5 text-[#D08F52]" />
        },
        {
          title: "Institutional distrust",
          trigger: "Fed Political Pressure",
          action: "Long Gold & Bitcoin.",
          detail: "When Central Bank independence is threatened, fiat currency correlation goes to 1.",
          icon: <ShieldAlert className="w-5 h-5 text-[#D08F52]" />
        },
        {
          title: "Geopolitical De-escalation",
          trigger: "Summit Announcement",
          action: "Short Volatility (VIX).",
          detail: "Markets price in worst-case scenarios. 'Status Quo' is a bullish catalyst.",
          icon: <Anchor className="w-5 h-5 text-[#D08F52]" />
        }
      ].map((play, i) => (
        <div key={i} className="bg-white dark:bg-[#0A0D14]/5 border border-white/10 p-5 rounded-lg">
          <div className="mb-3">{play.icon}</div>
          <h3 className="font-serif text-base mb-3">{play.title}</h3>
          <div className="space-y-2.5 text-sm">
            <div>
              <span className="text-gray-500 uppercase text-xs font-semibold">Trigger</span>
              <p className="text-gray-300">{play.trigger}</p>
            </div>
            <div>
              <span className="text-gray-500 uppercase text-xs font-semibold">Action</span>
              <p className="text-[#D08F52] font-medium">{play.action}</p>
            </div>
            <div className="pt-2.5 border-t border-white/10">
              <p className="text-gray-400 text-xs leading-relaxed">{play.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function FinancialRetrospective2025() {

  const events: EventData[] = [
    {
      id: "01",
      title: "The Efficiency Shock",
      date: "Jan 27, 2025",
      category: "Technology",
      riskLevel: "High",
      icon: <Cpu className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" />,
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
      riskLevel: "Medium",
      icon: <AlertTriangle className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" />,
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
      riskLevel: "Extreme",
      icon: <Globe className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" />,
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
      riskLevel: "Low (if timed)",
      icon: <DollarSign className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" />,
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
      riskLevel: "Low",
      icon: <Anchor className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" />,
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
      riskLevel: "Medium",
      icon: <TrendingDown className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" />,
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
      riskLevel: "Med-High",
      icon: <ShieldAlert className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" />,
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
    <ArticleFrame slug="2025-financial-market-retrospective-seven-pivotal-events">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-widest mb-6 border border-gray-200 dark:border-gray-700">
            <BarChart3 className="w-4 h-4 text-[#A8672E] dark:text-[#D08F52]" />
            2025 Market Retrospective
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            The death of the linear narrative. From the &ldquo;DeepSeek&rdquo; shock to the &ldquo;Gold Super-Cycle,&rdquo; 2025 was a masterclass in regime change.
          </p>
        </div>

        <InfographicSlot alt="2025 Financial Market Retrospective Infographic" />

        {/* Intro Card */}
        <div className="mt-10 mb-16 bg-[#14171B] dark:bg-[#05070A] rounded-xl p-8 md:p-10 text-white shadow-lg">
          <h2 className="font-serif text-xl md:text-2xl mb-6 flex items-center gap-3">
            <Activity className="w-5 h-5 text-[#D08F52]" />
            Executive Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-300 leading-relaxed">
            <p>
              We entered 2025 expecting a soft landing and linear AI growth. We got neither. Instead, we faced <span className="text-white font-semibold">&ldquo;Liberation Day&rdquo; tariffs</span>, <span className="text-white font-semibold">&ldquo;Efficiency Shocks,&rdquo;</span> and a complete monetary pivot.
            </p>
            <p>
              The S&amp;P 500 finished up ~17.5%, but this number masks the violent rotation under the surface. The era of passive indexing is fading; 2025 proved that <strong className="text-[#D08F52]">volatility is the only asset class that matters.</strong>
            </p>
          </div>
          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-sm font-medium text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D08F52]" />
              Tech Shocks
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E2694A]" />
              Trade Wars
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D08F52]" />
              Gold &amp; Macro
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3CBF9C]" />
              Strategy
            </div>
          </div>
        </div>

        {/* Timeline of Events */}
        <div>
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>

        {/* Tactical Playbook Section */}
        <TacticalPlaybook />

        {/* Outlook Section */}
        <div className="mt-16 p-8 md:p-10 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-4">2026 Outlook: The &ldquo;Prove-It&rdquo; Phase</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mb-10">
            The passive &ldquo;buy and hold&rdquo; strategies of the 2010s are ill-suited for this environment. The coming year requires active management and exposure to hard assets.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="w-9 h-9 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-lg flex items-center justify-center mb-4 text-[#A8672E] dark:text-[#D08F52]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-2">AI Implementation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Companies must prove AI spend generates free cash flow, not just press releases. Focus on &ldquo;Applied AI&rdquo; in Healthcare and Finance.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="w-9 h-9 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-lg flex items-center justify-center mb-4 text-[#A8672E] dark:text-[#D08F52]">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-2">Strategic Reset</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Will the Geneva Reset hold? The 2026 outlook depends on the durability of this fragile detente. Watch shipping rates for early warning signs.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="w-9 h-9 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-lg flex items-center justify-center mb-4 text-[#A8672E] dark:text-[#D08F52]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-2">Fed Independence</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                With Powell&apos;s term ending in May 2026, the successor nomination is the critical event for bonds. Political appointees will spike yields.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ArticleFrame>
  );
}
