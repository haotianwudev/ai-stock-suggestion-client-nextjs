'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, TrendingUp, TrendingDown, BarChart3, Zap, ShieldAlert, Target, Info, ArrowRight, MousePointer2, Users, Activity, Anchor, BookOpen, Scale, ZapOff, LineChart, Brain, Timer, Crosshair, Repeat, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';
import { Maximize2 } from 'lucide-react';

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-8 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "blue" }: { children: React.ReactNode; color?: string }) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    slate: "bg-slate-50 text-slate-600 border-slate-200",
    violet: "bg-violet-50 text-violet-600 border-violet-100",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

const SectionHeading = ({ icon: Icon, title, subtitle, colorClass = "text-blue-600" }: {
  icon: React.ComponentType<{ size: number }>;
  title: string;
  subtitle: string;
  colorClass?: string;
}) => (
  <div className="mb-12">
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 rounded-xl bg-white shadow-sm border border-slate-100 ${colorClass}`}>
        <Icon size={28} />
      </div>
      <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
    </div>
    <p className="text-slate-500 text-xl max-w-3xl leading-relaxed">{subtitle}</p>
  </div>
);

export default function QuantifyingIntradayAlpha() {
  const currentArticle = articles.find(article => article.slug === 'quantifying-intraday-alpha-u-curve-volatility-engine-institutional-flow');
  const [activeSlot, setActiveSlot] = useState(0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const matrixData = [
    {
      time: "09:30 – 10:00",
      title: "The Chaos Window",
      phase: "Price Discovery",
      risk: "Extreme",
      participants: "Retail, Market Makers, Arb-Algos",
      strategy: "Fade the Gap / Wait for IB",
      detail: "This is the most volatile period. Overnight orders are matched, and market makers are actively widening spreads to hedge risk. Avoid market orders at all costs.",
      intensity: 95,
      color: "rose",
      do: ["Watch 1-min volume spikes", "Look for pre-market level tests"],
      dont: ["Enter full position size", "Chase parabolic moves"]
    },
    {
      time: "10:00 – 11:15",
      title: "The Trend Engine",
      phase: "Institutional Drive",
      risk: "Moderate",
      participants: "Prop Desks, Hedge Funds, Institutions",
      strategy: "Trend Continuation / ORB",
      detail: "The 'Initial Balance' (IB) is set. Directional conviction is highest here as institutions begin their parent order execution cycles.",
      intensity: 75,
      color: "blue",
      do: ["Trade high-volume breakouts", "Use 9/21 EMA for trend support"],
      dont: ["Counter-trend trade", "Ignore 10:00 AM data releases"]
    },
    {
      time: "11:30 – 14:00",
      title: "The Liquidity Desert",
      phase: "Mean Reversion",
      risk: "High (Deceptive)",
      participants: "HFTs, Passive Execution Algos",
      strategy: "Scalp VWAP / No Trade",
      detail: "Volume drops by up to 60%. Price action becomes 'choppy' as algos hunt for retail stops in a thin order book environment.",
      intensity: 20,
      color: "amber",
      do: ["Take a break/Step away", "Watch for VWAP 'reversion'"],
      dont: ["Trade breakouts (high failure rate)", "Over-trade small fluctuations"]
    },
    {
      time: "14:00 – 15:00",
      title: "The Pre-Close Warmup",
      phase: "Position Squaring",
      risk: "Moderate",
      participants: "Day Traders, Margin Desks",
      strategy: "Anticipatory Setup",
      detail: "Short-term traders begin exiting positions. Brokerage margin departments may start auto-liquidations, creating localized volatility.",
      intensity: 45,
      color: "indigo",
      do: ["Identify the afternoon 'flag' pattern", "Check Sector strength"],
      dont: ["Start a new long-term intraday trend"]
    },
    {
      time: "15:00 – 16:00",
      title: "Power Hour",
      phase: "Institutional Rebalancing",
      risk: "Low (Directional)",
      participants: "Index Funds, ETFs, MOC Orders",
      strategy: "MOC Imbalance / Swing Entry",
      detail: "The 'honesty' hour. Billions move through the close. This is where the daily candle shape is finalized and 'smart money' reveals its hand.",
      intensity: 100,
      color: "emerald",
      do: ["Follow the MOC imbalance", "Enter swing trades for 'gap' potential"],
      dont: ["Short a strong closing trend", "Ignore the 3:50 PM imbalance"]
    }
  ];

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug || 'quantifying-intraday-alpha-u-curve-volatility-engine-institutional-flow'} 
          />
        </>
      )}

      <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="relative overflow-hidden bg-white border-b border-slate-200 pt-24 pb-32 px-6">
          <div className="max-w-6xl mx-auto relative z-10">
            <Badge color="indigo">Microstructure Research 2026</Badge>
            <h1 className="mt-8 text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              QUANTIFYING <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">INTRADAY ALPHA</span>
            </h1>
            <p className="mt-8 text-xl text-slate-500 max-w-2xl leading-relaxed">
              A research-driven exploration into how timing, volume clusters, and liquidity cycles dictate price action. Master the "U-Curve" and align your execution with global institutional flows.
            </p>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/C6fWtuH.jpeg" 
              alt="Intraday Alpha U-Curve Infographic" 
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
          src="https://i.imgur.com/C6fWtuH.jpeg"
          alt="Intraday Alpha U-Curve Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        <main className="max-w-6xl mx-auto py-24 px-6 space-y-40">
          {/* Section 1: The Theory of the U-Curve */}
          <section>
            <SectionHeading 
              icon={BarChart3}
              title="The U-Shaped Volume Profile"
              subtitle="Academic research consistently shows that trading volume and volatility follow a U-shaped distribution throughout the session."
            />
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div className="prose prose-slate">
                  <h3 className="text-2xl font-bold text-slate-800">Why the 'U' Exists</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    The concentration of volume at the open and close is not accidental—it is driven by <strong>Information Asymmetry</strong> and <strong>Institutional Mandates</strong>.
                  </p>
                </div>
                <div className="grid gap-6">
                  <Card className="hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">The Information Hypothesis</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          During the overnight session, new information accumulates. The first 30–60 minutes represent the market's "aggressive reconciliation" of this data. Informed traders trade early to capitalize on private info before it is fully reflected.
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card className="hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <div className="shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                        <Scale size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2">The Rebalancing Hypothesis</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          Passive funds (ETFs/Mutual Funds) must execute trades close to the official closing price to minimize tracking error. This creates a massive surge in the final 30 minutes.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="sticky top-24">
                <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none p-10 overflow-hidden relative">
                  <div className="relative z-10">
                    <div className="flex justify-between items-end mb-12">
                      <div>
                        <p className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-1">Metric: Mean Volume</p>
                        <h4 className="text-2xl font-bold">Session Activity Map</h4>
                      </div>
                      <Badge color="blue">Live Model</Badge>
                    </div>
                    <div className="h-64 flex items-end gap-1 mb-8">
                      {[80, 60, 45, 30, 20, 15, 12, 10, 8, 10, 15, 25, 40, 70, 95].map((h, i) => (
                        <div 
                          key={i} 
                          className="flex-1 bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-sm transition-all duration-700 hover:brightness-125"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 tracking-tighter uppercase">
                      <span>9:30 AM (Open)</span>
                      <span>12:30 PM (Midday)</span>
                      <span>4:00 PM (Close)</span>
                    </div>
                  </div>
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />
                </Card>
              </div>
            </div>
          </section>

          {/* Section 2: The Morning Open */}
          <section>
            <SectionHeading 
              icon={Zap}
              title="The Opening Volatility Engine"
              subtitle="The first 60 minutes are the most dangerous and the most profitable. Understanding the 'Amateur vs. Pro' dynamic is key."
              colorClass="text-amber-500"
            />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm">1</span>
                  The First 15 Minutes
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  <strong>"The Amateur Hour."</strong> Markets are flooded with retail orders. Volatility is high, but the signal-to-noise ratio is low. Research indicates price direction here is only a 45% predictor of the daily trend.
                </p>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="text-xs font-bold text-amber-800 uppercase mb-2 italic">Pro Tip</p>
                  <p className="text-xs text-amber-700">
                    Avoid entering trades between 9:30 and 9:45. Slippage and "whipsaws" peak as market makers adjust spreads.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span>
                  The 10:00 AM Pivot
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  <strong>Institutional Confirmation.</strong> Major economic data is released. Institutional desks begin executing parent orders. This is often where the intraday low or high is established.
                </p>
                <ul className="space-y-2">
                  <li className="text-xs text-slate-500 flex items-center gap-2">
                    <ArrowRight size={12} className="text-blue-500" /> Watch for "Gap Fills" at this time.
                  </li>
                  <li className="text-xs text-slate-500 flex items-center gap-2">
                    <ArrowRight size={12} className="text-blue-500" /> Key time for Mean Reversion trades.
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">3</span>
                  The 10:30 Trend Set
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  <strong>The True Trend.</strong> Breaking the high/low of the first hour has an 80% statistical probability of continuation until the European close (11:30 AM).
                </p>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <p className="text-xs font-bold text-emerald-800 uppercase mb-2">The Golden Rule</p>
                  <p className="text-xs text-emerald-700">
                    "Amateurs open the market; Professionals close the first hour."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Midday Trap */}
          <section className="bg-slate-50 rounded-[48px] p-12 md:p-24 border border-slate-200">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <Badge color="rose">Critical Risk Warning</Badge>
                <h2 className="mt-6 text-4xl font-bold mb-6 leading-tight">
                  Navigating the Midday "Liquidity Desert"
                </h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  Between 11:30 AM and 2:00 PM ET, liquidity dries up. This period is dominated by <strong>Passive Execution Algos</strong> and <strong>Predatory HFTs</strong> exploiting thin order books.
                </p>
                <div className="grid gap-4">
                  {[
                    { icon: ZapOff, title: "Low Volume Whipsaws", text: "Thin order books mean single trades move price significantly, triggering false breakouts." },
                    { icon: Anchor, title: "VWAP Magnetism", text: "Price often drifts toward the Volume Weighted Average Price (VWAP) as algos passively execute child orders." },
                    { icon: Target, title: "Stop Hunting", text: "Algos 'ping' levels to trigger retail stops, pushing price enough to generate liquidity." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
                      <div className="text-rose-500">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-800">{item.title}</h5>
                        <p className="text-sm text-slate-500">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-bold text-slate-400">MICROSTRUCTURE ANALYSIS</span>
                    <span className="text-[10px] font-bold text-rose-500 uppercase">High Risk Zone</span>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-sm border-b pb-4">
                      <span className="text-slate-500 font-medium">Spreads Widening</span>
                      <span className="text-rose-600 font-bold">+24%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b pb-4">
                      <span className="text-slate-500 font-medium">Algorithmic Dominance</span>
                      <span className="text-blue-600 font-bold">92% of Flow</span>
                    </div>
                    <div className="pt-4">
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 w-[85%]" />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">Probability of False Breakout</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Power Hour - The Real Money (EXPANDED) */}
          <section>
            <SectionHeading 
              icon={LineChart}
              title="Power Hour: The Real Money"
              subtitle="From 3:00 PM to 4:00 PM, the market transitions from speculative day trading to multi-billion dollar institutional mandates."
              colorClass="text-indigo-600"
            />
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Primary Analysis Card */}
              <div className="lg:col-span-7">
                <Card className="p-0 overflow-hidden h-full">
                  <div className="p-8 bg-indigo-600 text-white flex justify-between items-start">
                    <div>
                      <h4 className="text-2xl font-bold mb-2">The Closing Auction Anatomy</h4>
                      <p className="text-indigo-100 text-sm">Why the final 10 minutes are the most 'honest' minutes of the day.</p>
                    </div>
                    <Activity size={32} className="text-indigo-300 opacity-50" />
                  </div>
                  <div className="p-8 space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <Timer size={18} className="text-indigo-500" />
                          3:50 PM ET Deadline
                        </h5>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          This is the <strong>MOC (Market-On-Close)</strong> cutoff. NYSE and NASDAQ publish net imbalances. A 'Buy Imbalance' of 2M shares means institutions must find 2M shares of liquidity regardless of price. This creates the 'Honest Drift'.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <Repeat size={18} className="text-indigo-500" />
                          Passive Index Flow
                        </h5>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          ETFs like SPY and QQQ must track their benchmark Net Asset Value (NAV). To avoid <strong>Tracking Error</strong>, they aggregate all flows into the final print. This is non-discretionary, forced liquidity.
                        </p>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-slate-100">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge color="indigo">Gamma Trigger</Badge>
                        <span className="text-xs font-bold text-slate-400 uppercase">Options Expiry Impact</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        On 'Opex' Fridays, market makers must hedge their <strong>Gamma exposure</strong>. If the market moves, they are forced to buy more as price rises or sell more as price falls to stay delta-neutral, often leading to vertical price moves in the final 15 minutes.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              {/* Sidebar Stats & Conclusions */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="bg-white border-l-4 border-l-indigo-500">
                  <h4 className="font-bold text-lg mb-3">The 3:30 PM Drift Phenomenon</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Institutional traders 'anticipate' the MOC imbalance. If the morning trend was strong, 'Smart Money' will often bid up the stock ahead of the 3:50 PM release, creating a localized trend that retail rarely participates in.
                  </p>
                </Card>
                <Card className="bg-white border-l-4 border-l-emerald-500">
                  <h4 className="font-bold text-lg mb-3 text-emerald-700">Swing Trade Alpha</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Data suggests stocks closing at their <strong>absolute high of the day</strong> (HOD) at 4:00 PM have a statistically significant edge for a 'Gap Up' the next morning. It signals that institutions were willing to buy all available liquidity at any price.
                  </p>
                </Card>
                <Card className="bg-slate-900 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="font-bold text-lg mb-2 text-blue-400">Research Conclusion</h4>
                    <p className="text-slate-400 text-sm leading-relaxed italic mb-4">
                      "The open is where the amateurs guess. The close is where the professionals confirm. Trust the closing volume; ignore the opening noise."
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                      <Target size={12} /> Institutional Conviction: 92%
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 opacity-10">
                    <Scale size={80} />
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Section 5: Tactical Execution Matrix */}
          <section id="matrix-section">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <SectionHeading 
                  icon={Brain}
                  title="Tactical Execution Matrix"
                  subtitle="The 'How' and 'When' of modern market entry. This matrix defines your operational boundaries for every session."
                  colorClass="text-violet-600"
                />
              </div>
              <div className="flex gap-2 pb-14">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 border px-3 py-1.5 rounded-lg bg-white uppercase tracking-widest">
                  <Timer size={14} className="text-violet-500" /> Live Strategy Logic
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-3">
                {matrixData.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlot(idx)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border-2 ${
                      activeSlot === idx 
                        ? `bg-white border-${item.color}-500 shadow-xl scale-[1.02] z-10` 
                        : 'bg-transparent border-transparent hover:bg-slate-100 text-slate-500'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        activeSlot === idx ? `text-${item.color}-600` : 'text-slate-400'
                      }`}>
                        {item.time}
                      </span>
                      {activeSlot === idx && <div className={`w-2 h-2 rounded-full bg-${item.color}-500 animate-pulse`} />}
                    </div>
                    <h4 className={`text-xl font-black ${
                      activeSlot === idx ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      {item.title}
                    </h4>
                  </button>
                ))}
              </div>
              <div className="lg:col-span-8">
                <div className="bg-white rounded-[32px] border border-slate-200 shadow-2xl p-8 md:p-12 relative overflow-hidden min-h-[600px]">
                  <div className="absolute top-0 right-0 p-8 flex flex-col items-end">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Volume Intensity</div>
                    <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 bg-${matrixData[activeSlot].color}-500`}
                        style={{ width: `${matrixData[activeSlot].intensity}%` }}
                      />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-8">
                      <Badge color={matrixData[activeSlot].color}>{matrixData[activeSlot].phase}</Badge>
                      <Badge color="slate">Risk: {matrixData[activeSlot].risk}</Badge>
                    </div>
                    <h3 className={`text-5xl font-black mb-6 text-slate-900 leading-tight`}>
                      {matrixData[activeSlot].title}
                    </h3>
                    <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl">
                      {matrixData[activeSlot].detail}
                    </p>
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-8">
                        <div>
                          <h5 className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                            <Users size={18} className="text-blue-500" /> Participant Mix
                          </h5>
                          <p className="text-slate-600 font-medium">{matrixData[activeSlot].participants}</p>
                        </div>
                        <div>
                          <h5 className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest mb-4">
                            <Crosshair size={18} className="text-emerald-500" /> Primary Strategy
                          </h5>
                          <p className={`text-lg font-bold text-${matrixData[activeSlot].color}-600`}>
                            {matrixData[activeSlot].strategy}
                          </p>
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b pb-4">
                          Operational Protocol
                        </h5>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Do This:</p>
                            {matrixData[activeSlot].do.map((item, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {item}
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2 pt-4">
                            <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Avoid This:</p>
                            {matrixData[activeSlot].dont.map((item, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm text-slate-700 font-semibold">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mathematical Framework Section */}
          <section>
            <SectionHeading 
              icon={BarChart3}
              title="The Mathematical Framework"
              subtitle="Quantifying the U-Curve phenomenon through statistical models and empirical analysis."
              colorClass="text-purple-600"
            />
            <div className="grid lg:grid-cols-2 gap-12">
              <Card>
                <h4 className="text-xl font-bold mb-4 text-purple-900">Volume Distribution Model</h4>
                <div className="bg-slate-50 p-4 rounded-lg mb-4 font-mono text-sm">
                  <div className="text-slate-700">V(t) = α₁e^(-β₁t) + α₂e^(-β₂(T-t)) + γ</div>
                  <div className="text-xs text-slate-500 mt-2">
                    Where: V(t) = volume at time t, T = session length, α₁,α₂ = amplitude parameters, β₁,β₂ = decay rates, γ = baseline volume
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  This exponential decay model captures the U-shaped volume profile, with high activity at market open (first term) and close (second term), plus a constant baseline representing midday activity.
                </p>
              </Card>
              <Card>
                <h4 className="text-xl font-bold mb-4 text-purple-900">Volatility Clustering Index</h4>
                <div className="bg-slate-50 p-4 rounded-lg mb-4 font-mono text-sm">
                  <div className="text-slate-700">VCI = σ₁₅ₘᵢₙ / σₘᵢddₐy × 100</div>
                  <div className="text-xs text-slate-500 mt-2">
                    Where: σ₁₅ₘᵢₙ = volatility in first 15 minutes, σₘᵢddₐy = midday volatility (11:30-14:00)
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The VCI typically ranges from 200-400, indicating that opening volatility is 2-4x higher than midday levels. Values above 300 suggest extreme information asymmetry.
                </p>
              </Card>
            </div>
          </section>

          {/* Risk Management Framework */}
          <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-[48px] p-12 md:p-24 border border-red-100">
            <div className="text-center mb-16">
              <Badge color="rose">Risk Management</Badge>
              <h2 className="mt-6 text-4xl font-bold mb-6 leading-tight text-red-900">
                The Intraday Risk Framework
              </h2>
              <p className="text-red-700 text-lg max-w-3xl mx-auto leading-relaxed">
                Understanding when NOT to trade is as important as knowing when to enter. This framework provides quantitative guardrails for intraday execution.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-red-500">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldAlert className="text-red-500" size={24} />
                  <h4 className="font-bold text-lg text-red-900">Volume Threshold</h4>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Avoid trading when 5-minute volume drops below 50% of the 20-day average. This indicates thin liquidity and increased slippage risk.
                </p>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-xs font-bold text-red-800">Rule: V₅ₘᵢₙ &lt; 0.5 × V̄₂₀d → No Trade</p>
                </div>
              </Card>
              <Card className="border-l-4 border-l-amber-500">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-amber-500" size={24} />
                  <h4 className="font-bold text-lg text-amber-900">Time-Based Filters</h4>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Implement time-based position sizing: 100% during power hour, 50% during trend engine, 25% during liquidity desert.
                </p>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="text-xs font-bold text-amber-800">Rule: Position Size = f(Time, VCI, Spread)</p>
                </div>
              </Card>
              <Card className="border-l-4 border-l-blue-500">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="text-blue-500" size={24} />
                  <h4 className="font-bold text-lg text-blue-900">Spread Monitoring</h4>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Monitor bid-ask spreads continuously. Spreads widening beyond 2x normal indicate market stress and reduced execution quality.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs font-bold text-blue-800">Rule: Spread &gt; 2 × Normal → Reduce Size</p>
                </div>
              </Card>
            </div>
          </section>

          {/* Call-to-Action Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <BookOpen className="inline mr-2" />
                  Read Full Research Paper
                </a>
              )}
            </div>
          </div>
        </main>

        <footer className="bg-slate-900 py-24 px-6 text-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <BarChart3 size={24} />
                </div>
                <span className="font-black text-2xl tracking-tighter uppercase">
                  SOPHIE's Daddy Quant<span className="text-blue-500">.</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-8">
                Empowering investors with institutional-grade market microstructure research and temporal data analysis.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-16 text-[10px] uppercase font-bold tracking-widest">
              <div className="space-y-4">
                <h5 className="text-blue-500">Research</h5>
                <ul className="space-y-2 text-slate-400">
                  <li>Order Flow</li>
                  <li>Gamma Analysis</li>
                  <li>VWAP Models</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-blue-500">Legal</h5>
                <ul className="space-y-2 text-slate-400">
                  <li>Risk Policy</li>
                  <li>Data Sources</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-800 text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] flex flex-col md:flex-row justify-between">
            <span>© 2026 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</span>
            <span>Not financial advice. Trade at your own risk.</span>
          </div>
          {/* Footer Decor */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        </footer>

        {/* Tailwind safelist for dynamic color classes */}
        <div className="hidden border-rose-500 border-blue-500 border-amber-500 border-indigo-500 border-emerald-500 text-rose-600 text-blue-600 text-amber-600 text-indigo-600 text-emerald-600 bg-rose-500 bg-blue-500 bg-amber-500 bg-indigo-500 bg-emerald-500" />
      </div>
    </>
  );
}