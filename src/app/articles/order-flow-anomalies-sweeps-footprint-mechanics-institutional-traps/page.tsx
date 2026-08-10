'use client';

import React from 'react';
import { ArrowLeft, Activity, BarChart2, Layers, TrendingUp, Zap, AlertTriangle, Eye, Database, Cpu, ShieldAlert, ArrowRight, Target, Anchor, Ghost, Maximize2, Minimize2, Music } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

const SectionHeader = ({ icon: Icon, title, subtitle, colorClass }: { icon: React.ElementType; title: string; subtitle: string; colorClass: string }) => (
  <div className="mb-8 border-b border-slate-200 dark:border-white/10 pb-4">
    <div className={`flex items-center gap-3 mb-2 ${colorClass}`}>
      <Icon size={28} strokeWidth={2.5} />
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-serif">{title}</h2>
    </div>
    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl">{subtitle}</p>
  </div>
);

const InfoCard = ({ title, children, icon: Icon, accentColor = "blue" }: { title: string; children: React.ReactNode; icon: React.ElementType; accentColor?: string }) => {
  const colorMap: Record<string, string> = {
    blue: "bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30 text-blue-900 dark:text-blue-100 icon-blue-600 dark:icon-blue-400",
    indigo: "bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30 text-indigo-900 dark:text-indigo-100 icon-indigo-600 dark:icon-indigo-400",
    rose: "bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30 text-rose-900 dark:text-rose-100 icon-rose-600 dark:icon-rose-400",
    emerald: "bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-100 icon-emerald-600 dark:icon-emerald-400",
    amber: "bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30 text-amber-900 dark:text-amber-100 icon-amber-600 dark:icon-amber-400",
    violet: "bg-violet-50 dark:bg-violet-950/20 border-violet-100 dark:border-violet-900/30 text-violet-900 dark:text-violet-100 icon-violet-600 dark:icon-violet-400",
    slate: "bg-white dark:bg-[#14171B] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 icon-slate-500 dark:icon-slate-400 shadow-sm"
  };
  const style = colorMap[accentColor] || colorMap.slate;
  const iconColor = style.split(' ').find(c => c.startsWith('icon-'))?.replace('icon-', 'text-') || "text-slate-600 dark:text-slate-400";

  return (
    <div className={`p-6 rounded-xl border ${style.replace(/icon-\S+/g, '')} h-full transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-start gap-4">
        {Icon && <div className={`p-2 rounded-lg bg-white dark:bg-[#0A0D14]/60 dark:bg-black/40 ${iconColor}`}><Icon size={24} /></div>}
        <div>
          <h3 className="font-bold text-lg mb-2 font-serif">{title}</h3>
          <div className="text-sm leading-relaxed opacity-90">{children}</div>
        </div>
      </div>
    </div>
  );
};

const ConceptTag = ({ text, color = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" }: { text: string; color?: string }) => (
  <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider mr-2 mb-2 ${color}`}>{text}</span>
);


const ComparisonTable = () => (
  <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 shadow-sm bg-white dark:bg-[#14171B] my-8">
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-50 dark:bg-black/40 text-slate-900 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-white/10">
        <tr>
          <th className="p-4">Execution Modality</th>
          <th className="p-4">Structural Mechanism</th>
          <th className="p-4">Institutional Implication</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-white/10">
        <tr className="hover:bg-slate-50 dark:bg-[#14171B]/50 dark:hover:bg-white dark:bg-[#0A0D14]/5">
          <td className="p-4 font-medium text-slate-900 dark:text-white">Split Orders</td>
          <td className="p-4 text-slate-600 dark:text-slate-300">Large orders broken into smaller children, executed on a single exchange.</td>
          <td className="p-4 text-slate-600 dark:text-slate-300">Significant size/conviction, but lacks urgency. Often VWAP/TWAP algos hiding size.</td>
        </tr>
        <tr className="hover:bg-slate-50 dark:bg-[#14171B]/50 dark:hover:bg-white dark:bg-[#0A0D14]/5 bg-[#BC4128]/10 dark:bg-[#E2694A]/10/30 dark:bg-rose-900/10">
          <td className="p-4 font-medium text-rose-900 dark:text-rose-300 flex items-center gap-2"><Zap size={16} /> Sweep Orders</td>
          <td className="p-4 text-slate-600 dark:text-slate-300">Large orders routed simultaneously across multiple exchanges (ISOs).</td>
          <td className="p-4 text-slate-600 dark:text-slate-300 font-medium">Profound urgency. Prioritizes speed over price. Signals imminent volatility.</td>
        </tr>
        <tr className="hover:bg-slate-50 dark:bg-[#14171B]/50 dark:hover:bg-white dark:bg-[#0A0D14]/5">
          <td className="p-4 font-medium text-slate-900 dark:text-white">Complex Multi-Leg</td>
          <td className="p-4 text-slate-600 dark:text-slate-300">Routing interconnected options legs (straddles, etc.) across fragmented COBs.</td>
          <td className="p-4 text-slate-600 dark:text-slate-300">Sophisticated volatility or dispersion trading. Often delta-neutral.</td>
        </tr>
        <tr className="hover:bg-slate-50 dark:bg-[#14171B]/50 dark:hover:bg-white dark:bg-[#0A0D14]/5">
          <td className="p-4 font-medium text-slate-900 dark:text-white">COB / AUCT</td>
          <td className="p-4 text-slate-600 dark:text-slate-300">Executed electronically through a Complex Order Book or auction.</td>
          <td className="p-4 text-slate-600 dark:text-slate-300">Standard spread execution seeking optimal pricing via exposure.</td>
        </tr>
      </tbody>
    </table>
  </div>
);


export default function OrderFlowTutorial() {
  return (
    <ArticleFrame slug="order-flow-anomalies-sweeps-footprint-mechanics-institutional-traps">
      <div className="space-y-24">

          <InfographicSlot alt="Order Flow Anomalies Infographic" />

{/* 1. Introduction */}
          <section>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 font-serif">The Reality of Price Discovery</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Price action is merely the trailing artifact of a highly complex, continuous auction process. The true driver of asset valuation is <strong className="text-slate-900 dark:text-slate-100">order flow</strong>: the real-time interaction between aggressive market orders consuming liquidity and passive limit orders providing it.
                </p>
                <p className="text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Traditional technical analysis focuses on price patterns and volume bars, but this approach misses the critical dimension: <em>how</em> price moved, not just <em>where</em> it went. Understanding the microstructure of order flow reveals the intentions of institutional participants who deliberately obscure their actions through sophisticated execution algorithms.
                </p>
                <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl border-l-4 border-[#A8672E] dark:border-[#D08F52] shadow-sm">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">The Limit Order Book (CLOB)</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Modern markets are opaque. Sophisticated participants (HFTs, Hedge Funds) use execution algorithms to obscure intentions. Distinguishing accumulation from traps requires analyzing sub-millisecond anomalies in the continuous limit order book (CLOB).
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-3">
                    The CLOB is a dynamic queue where passive limit orders wait to be matched with aggressive market orders. Every transaction leaves a footprint that reveals the balance of power between buyers and sellers at each price level.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <InfoCard title="Latency Arbitrage" icon={Cpu} accentColor="slate">
                  Exchanges process trillions of shares daily. HFT firms exploit tiny speed advantages (microseconds) to front-run institutional orders across fragmented venues. Co-location services place servers physically next to exchange matching engines, reducing latency to under 100 microseconds.
                </InfoCard>
                <InfoCard title="Data Blindness" icon={Eye} accentColor="slate">
                  Traditional OHLC charts hide the &ldquo;volumetric distribution&rdquo; of transactions. They show <em>where</em> price went, but not <em>how</em> hard it fought to get there. A 5-point rally on 100 shares tells a very different story than the same move on 10,000 shares.
                </InfoCard>
                <InfoCard title="Market Fragmentation" icon={Layers} accentColor="slate">
                  U.S. equities trade across 16+ lit exchanges plus dozens of dark pools. Options trade on 17 exchanges. This fragmentation creates arbitrage opportunities and makes it difficult to see the complete picture of institutional flow without sophisticated data aggregation.
                </InfoCard>
              </div>
            </div>
          </section>

          {/* 2. Sweeps */}
          <section>
            <SectionHeader 
              icon={Zap} 
              title="Intermarket Sweeps & Order Routing" 
              subtitle="Distinguishing between aggressive directional flow and strategic hedging mechanics."
              colorClass="text-amber-600" 
            />
            
            <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-6 rounded-xl mb-8">
              <h3 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-3 font-serif">What Makes a Sweep Different?</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                A sweep order is not just a large order&mdash;it&apos;s an order that explicitly bypasses the normal price-time priority rules. Under Regulation NMS, brokers must route orders to the exchange offering the best price (NBBO). An <strong>Intermarket Sweep Order (ISO)</strong> allows the trader to simultaneously execute across multiple exchanges at different prices, &ldquo;sweeping&rdquo; through multiple price levels instantly.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-3">
                This behavior signals extreme urgency: the trader values speed and certainty of execution over price optimization. In options markets, sweeps often precede major volatility events or indicate informed positioning ahead of catalysts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white dark:bg-[#14171B] p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10 hover:border-amber-200 dark:hover:border-amber-900/50 transition-colors">
                <div className="flex items-center gap-3 mb-4 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">
                  <Database size={24} />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Equity ISOs: Walking the Book</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-sm">
                  Institutional algorithms use <strong>Intermarket Sweep Orders (ISO)</strong> to bypass standard routing protections. Unlike standard orders that wait for the best price, an ISO commands the exchange to &ldquo;execute immediately at any price.&rdquo;
                </p>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-sm">
                  When a large institution needs to establish or exit a position quickly&mdash;perhaps ahead of a news event or to rebalance a portfolio&mdash;they cannot afford to wait for the market to naturally absorb their order. The ISO allows them to &ldquo;walk the book,&rdquo; consuming liquidity at progressively worse prices until the entire order is filled.
                </p>
                <div className="bg-slate-50 dark:bg-black/40 p-5 rounded-xl mb-6 border border-slate-100 dark:border-white/10">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3 flex items-center gap-2">
                    <Activity size={16} className="text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]"/> Anatomy of a Book Sweep
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-xs text-slate-600 dark:text-slate-400">
                      <div className="w-8 text-center font-mono font-bold text-slate-400 dark:text-slate-500">0ms</div>
                      <span>NBBO shows Ask @ $150.00 (100 shares).</span>
                    </li>
                    <li className="flex gap-3 text-xs text-slate-800 dark:text-white font-bold bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/20 p-1 rounded">
                      <div className="w-8 text-center font-mono text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">1ms</div>
                      <span>ISO Order consumes $150.00, $150.01, and $150.05 levels instantly.</span>
                    </li>
                    <li className="flex gap-3 text-xs text-slate-600 dark:text-slate-400">
                      <div className="w-8 text-center font-mono font-bold text-slate-400 dark:text-slate-500">2ms</div>
                      <span>Price &ldquo;gaps&rdquo; up. Passive sellers were skipped (Walked the Book).</span>
                    </li>
                    <li className="flex gap-3 text-xs text-slate-600 dark:text-slate-400">
                      <div className="w-8 text-center font-mono font-bold text-slate-400 dark:text-slate-500">3ms</div>
                      <span>Market makers adjust quotes. New NBBO reflects the aggressive buying pressure.</span>
                    </li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <ConceptTag text="High Urgency" color="bg-rose-100 dark:bg-rose-900/30 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]" />
                  <ConceptTag text="Momentum Ignition" color="bg-indigo-100 dark:bg-indigo-900/30 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]" />
                </div>
              </div>

              <div className="bg-white dark:bg-[#14171B] p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10 hover:border-violet-200 dark:hover:border-violet-900/50 transition-colors">
                <div className="flex items-center gap-3 mb-4 text-violet-600 dark:text-violet-400">
                  <Layers size={24} />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Options: Vanilla vs. Complex</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-sm">
                  Options flow is noisier than equity. To find anomalies, you must filter <strong>Single-Leg Sweeps</strong> (Directional) from <strong>Multi-Leg Strategies</strong> (Hedging).
                </p>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-sm">
                  The options market serves two distinct purposes: directional speculation and risk management. A single-leg sweep of call options might indicate bullish conviction, but it could also be a hedge against a short equity position. Context is everything.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-100 dark:border-violet-900/30">
                    <div className="mt-1"><Zap size={16} className="text-violet-600 dark:text-violet-400" /></div>
                    <div>
                      <h4 className="font-bold text-violet-900 dark:text-violet-300 text-sm">The &ldquo;Vanilla&rdquo; Sweep (Directional)</h4>
                      <p className="text-xs text-violet-800 dark:text-violet-400 mt-1">
                        A single contract (e.g., AAPL 150C) swept across 12 exchanges simultaneously. <br/>
                        <strong>Signal:</strong> Pure panic buying or selling. Often precedes major price moves.
                      </p>
                      <p className="text-xs text-violet-700 dark:text-violet-400 mt-2">
                        <strong>Example:</strong> 5,000 contracts of weekly calls swept at the ask, premium paid 20% above mid-price. This suggests informed flow willing to pay up for immediate exposure.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-black/40 rounded-lg border border-slate-100 dark:border-white/10">
                    <div className="mt-1"><Anchor size={16} className="text-slate-500 dark:text-slate-400" /></div>
                    <div>
                      <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Complex Multi-Leg (Neutral)</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Simultaneous execution of a Call and a Put (Straddle) or Vertical Spread.<br/>
                        <strong>Signal:</strong> Volatility arbitrage or hedging. Often NOT directional.
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                        <strong>Example:</strong> Buying the 150/155 call spread while selling the 145/140 put spread. This is a risk-defined bet on the stock staying within a range, not a directional play.
                      </p>
                    </div>
                  </div>
                </div>
                <ConceptTag text="Check Open Interest" color="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400" />
              </div>
            </div>


            <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 text-white mb-8 shadow-lg border border-transparent dark:border-white/10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 font-serif">
                <Target className="text-[#1D8A70] dark:text-[#3CBF9C]" /> The Sweep Validation Checklist
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="border-l-2 border-[#1D8A70] dark:border-[#3CBF9C] pl-4">
                  <h4 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] text-sm mb-2 uppercase tracking-wide">1. Size vs. Open Interest</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Is the volume <strong>greater than</strong> current Open Interest (OI)? <br/>
                    If <span className="text-white font-bold">Vol &gt; OI</span>, it is opening new positioning (Aggressive).<br/>
                    If <span className="text-white font-bold">Vol &lt; OI</span>, it may just be closing/covering an old trade.
                  </p>
                  <p className="text-slate-400 text-xs mt-3 italic">
                    Pro Tip: Check OI from the previous day. Intraday OI updates are delayed, so compare today&apos;s volume to yesterday&apos;s OI for the most accurate signal.
                  </p>
                </div>
                <div className="border-l-2 border-amber-500 pl-4">
                  <h4 className="font-bold text-amber-400 text-sm mb-2 uppercase tracking-wide">2. Time & Moneyness</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    <strong>Weekly OTM (Out-of-the-money)</strong> sweeps indicate extreme urgency and &ldquo;gamma&rdquo; chasing.<br/>
                    <strong>Leaps (1yr+)</strong> indicate long-term investment, not a tactical trade signal.
                  </p>
                  <p className="text-slate-400 text-xs mt-3 italic">
                    The further OTM and shorter the expiration, the more speculative and urgent the positioning. A 0DTE (zero days to expiration) sweep is pure gamma speculation.
                  </p>
                </div>
                <div className="border-l-2 border-[#A8672E] dark:border-[#D08F52] pl-4">
                  <h4 className="font-bold text-[#A8672E] dark:text-[#D08F52] text-sm mb-2 uppercase tracking-wide">3. Spot Correlation</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Did the sweep occur at a key technical breakout level?<br/>
                    Sweeps at <strong>range highs</strong> (breakout) are more significant than sweeps in the middle of chop.
                  </p>
                  <p className="text-slate-400 text-xs mt-3 italic">
                    Context matters. A call sweep at resistance with the stock breaking out is far more significant than the same sweep in the middle of a consolidation range.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 font-serif">Execution Matrix: Interpretation</h3>
            <ComparisonTable />

            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-xl p-6 mt-8">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                <Eye size={20} /> Reading Between the Lines
              </h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
                The execution method reveals as much as the direction. A massive call sweep executed via ISO across 12 exchanges signals panic buying&mdash;someone needs exposure NOW and is willing to pay any price. Compare this to a similar-sized order executed via VWAP algo over 2 hours, which suggests accumulation without urgency.
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                Professional traders use this information to gauge conviction. High urgency + large size + technical breakout = high probability setup. Low urgency + large size + mid-range = likely hedging or rebalancing.
              </p>
            </div>
          </section>

          {/* 3. Footprint Charts (DETAILED UPDATE) */}
          <section>
            <SectionHeader 
              icon={BarChart2} 
              title="Footprint & DOM Mechanics" 
              subtitle="X-Raying the candlestick to reveal the battle between Limit (Passive) and Market (Aggressive) orders."
              colorClass="text-[#1D8A70] dark:text-[#3CBF9C]" 
            />

            {/* Intro to Bid/Ask */}
            <div className="bg-slate-900 dark:bg-[#14171B] text-white p-8 rounded-2xl mb-12 shadow-xl border border-transparent dark:border-white/10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-emerald-300 font-serif">Inside the Spread</h3>
                  <p className="text-slate-300 dark:text-slate-400 mb-6 leading-relaxed">
                    A standard candlestick only shows High, Low, Open, and Close. The Footprint Chart splits the bar to show volume traded at the <span className="text-[#BC4128] dark:text-[#E2694A] dark:text-rose-300 font-bold">BID</span> (Sellers initiating) and the <span className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-emerald-300 font-bold">ASK</span> (Buyers initiating) at every price tick.
                  </p>
                  <p className="text-slate-300 dark:text-slate-400 mb-6 leading-relaxed text-sm">
                    This granular view reveals the true battle between buyers and sellers. When aggressive buyers hit the ask, they&apos;re saying &ldquo;I need to buy NOW at any price.&rdquo; When aggressive sellers hit the bid, they&apos;re saying &ldquo;I need to sell NOW.&rdquo; The balance of this aggression determines short-term price direction.
                  </p>
                  <div className="flex gap-4">
                    <div className="px-4 py-2 bg-slate-800 dark:bg-slate-900 rounded border border-slate-700 dark:border-white/10">
                      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase block mb-1">Diagonal Rule</span>
                      <span className="text-sm font-bold">Compare Bid to Ask Diagonally (Up/Right)</span>
                    </div>
                    <div className="px-4 py-2 bg-slate-800 dark:bg-slate-900 rounded border border-slate-700 dark:border-white/10">
                      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase block mb-1">Delta Math</span>
                      <span className="text-sm font-bold">Ask Volume - Bid Volume = Net Delta</span>
                    </div>
                  </div>
                </div>

                {/* Visual Mock of Footprint Cell */}
                <div className="bg-slate-800 dark:bg-slate-900 p-6 rounded-xl border border-slate-700 dark:border-white/10 font-mono text-sm relative">
                  <div className="absolute top-2 right-2 text-xs text-slate-500 dark:text-slate-400">Footprint Cell Example</div>
                  <div className="grid grid-cols-3 gap-4 text-center items-center mb-2 border-b border-slate-700 dark:border-white/10 pb-2">
                    <span className="text-slate-500 dark:text-slate-400">Price</span>
                    <span className="text-[#BC4128] dark:text-[#E2694A] dark:text-rose-300 font-bold">Bid (Sells)</span>
                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-emerald-300 font-bold">Ask (Buys)</span>
                  </div>
                  <div className="space-y-2">
                    {/* Row 1 */}
                    <div className="grid grid-cols-3 gap-4 text-center items-center opacity-50">
                      <span className="text-slate-400 dark:text-slate-500">150.02</span>
                      <span className="text-slate-300 dark:text-slate-400">100</span>
                      <span className="text-slate-300 dark:text-slate-400">50</span>
                    </div>
                    {/* Row 2 (Imbalance) */}
                    <div className="grid grid-cols-3 gap-4 text-center items-center bg-slate-700/50 dark:bg-white dark:bg-[#0A0D14]/5 p-1 rounded">
                      <span className="text-white font-bold">150.01</span>
                      <span className="text-slate-300 dark:text-slate-400">250</span>
                      <span className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-emerald-300 font-bold border border-[#1D8A70] dark:border-[#3CBF9C]/50 rounded bg-[#1D8A70] dark:bg-[#3CBF9C]/10">3,500</span>
                    </div>
                    {/* Row 3 */}
                    <div className="grid grid-cols-3 gap-4 text-center items-center">
                      <span className="text-slate-400 dark:text-slate-500">150.00</span>
                      <span className="text-slate-300 dark:text-slate-400">20</span>
                      <span className="text-slate-300 dark:text-slate-400">500</span>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-slate-400 dark:text-slate-500 text-center">
                    <ArrowRight className="inline w-3 h-3 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-emerald-300 mr-1"/>
                    Aggressive Buying Imbalance (3500 vs 250 diagonally = 14x ratio)
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-950/20 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-6 rounded-xl mb-8">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-3">Why the Diagonal Comparison?</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                The diagonal comparison (current price bid vs. next price up ask) reveals the <strong>marginal aggression</strong> required to move price. If 3,500 buyers hit the ask at $150.01 while only 250 sellers hit the bid at $150.00, it shows overwhelming buying pressure. Price will likely continue higher as passive sellers at $150.02 get consumed.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Imbalances Section */}
              <div className="bg-white dark:bg-[#14171B] border border-slate-200 dark:border-white/10 rounded-xl p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">
                  <Layers size={24} />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Stacked Imbalances</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                  An imbalance occurs when the diagonal volume difference exceeds ~300%. When these stack vertically (3+ in a row), they create a &ldquo;Brick Wall.&rdquo;
                </p>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                  Stacked imbalances represent zones where one side completely dominated. These zones act as magnets&mdash;price tends to revisit them because they represent unfinished business or trapped traders.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <ArrowRight size={16} className="text-[#1D8A70] dark:text-[#3CBF9C] mt-1 shrink-0" />
                    <span><strong>Bid Imbalance Stack:</strong> Aggressive sellers hitting bids, but price holds. Often a trap if price reverses back up through them. Sellers become trapped shorts.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <ArrowRight size={16} className="text-[#A8672E] dark:text-[#D08F52] mt-1 shrink-0" />
                    <span><strong>Support/Resistance:</strong> Re-tests of stacked imbalance zones are high-probability entries. The zone that held once will likely hold again.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <ArrowRight size={16} className="text-amber-500 mt-1 shrink-0" />
                    <span><strong>Breakout Confirmation:</strong> When price breaks through a stacked imbalance zone with high volume, it signals a regime change. The old support/resistance is now broken.</span>
                  </li>
                </ul>
                <ConceptTag text="High Confidence" color="bg-indigo-100 dark:bg-indigo-900/30 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]" />
              </div>

              {/* Delta Divergence Section */}
              <div className="bg-white dark:bg-[#14171B] border border-slate-200 dark:border-white/10 rounded-xl p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">
                  <Minimize2 size={24} />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Delta Divergence (Reversal)</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                  The most powerful reversal signal. It occurs when Price makes a New High, but Net Delta is Negative.
                </p>
                <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/30 p-4 rounded-lg border border-rose-100 dark:border-rose-900/30 mb-4">
                  <h4 className="text-sm font-bold text-rose-800 dark:text-rose-300 mb-2">The Mechanics:</h4>
                  <p className="text-xs text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] leading-relaxed">
                    Price moves up because limit orders (liquidity) are thin, NOT because buying is strong. The negative delta proves aggressive sellers are actually present, absorbing the move.
                  </p>
                  <p className="text-xs text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] leading-relaxed mt-2">
                    Think of it as a &ldquo;fake breakout.&rdquo; Price makes a new high, retail traders chase, but institutions are selling into the rally. When the buying exhausts, price collapses back down, trapping the late buyers.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-black/40 p-4 rounded-lg border border-slate-100 dark:border-white/10 mb-4">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-300 mb-2">Real-World Example:</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    SPY makes a new daily high at $450.50. The footprint shows +2,000 delta (more buying). But the next bar at $450.75 (new high) shows -5,000 delta (more selling). This divergence signals exhaustion. Within minutes, price drops back to $449.
                  </p>
                </div>
                <ConceptTag text="Top/Bottom Signal" color="bg-rose-100 dark:bg-rose-900/30 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]" />
              </div>
            </div>


            {/* Auction Market Theory Grid */}
            <div className="bg-white dark:bg-[#14171B] border border-slate-200 dark:border-white/10 rounded-xl p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-serif">Auction Market Theory: Node Analysis</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm leading-relaxed">
                Auction Market Theory (AMT) views markets as a continuous search for value through a two-way auction process. Price moves to facilitate trade, seeking the level where buyers and sellers agree. Understanding auction completion vs. interruption is key to predicting future price action.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Zero Print */}
                <div>
                  <h4 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-2 flex items-center gap-2">Finished Auction</h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                    Characterized by a &ldquo;zero print&rdquo; at the extreme (e.g., 0 x 20). This signals <strong>Exhaustion</strong>. No more aggressive participants are willing to trade at this price. The market must reverse to find liquidity.
                  </p>
                  <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-950/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/30 mb-3">
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 font-mono">
                      Price: $150.50<br/>
                      Bid: 0 | Ask: 20<br/>
                      <span className="text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] font-bold">→ No sellers left, reversal imminent</span>
                    </p>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    This is the &ldquo;end of the road.&rdquo; All willing sellers at this price have been exhausted. Price must either reverse or consolidate until new sellers appear.
                  </p>
                  <div className="h-1 bg-emerald-200 dark:bg-emerald-900/50 w-full mt-2"></div>
                </div>

                {/* Unfinished Business */}
                <div>
                  <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">Unfinished Auction</h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                    Significant volume on both sides at the extreme high/low (e.g., 50 x 50). The auction was interrupted. Price acts as a <strong>Magnet</strong> and will likely revisit this level to clean up the &ldquo;unfinished business.&rdquo;
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-100 dark:border-amber-900/30 mb-3">
                    <p className="text-xs text-amber-800 dark:text-amber-300 font-mono">
                      Price: $150.50<br/>
                      Bid: 500 | Ask: 500<br/>
                      <span className="text-amber-700 dark:text-amber-400 font-bold">→ Balanced, will revisit</span>
                    </p>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    Both buyers and sellers were active, but something interrupted the auction (news, time of day, etc.). Price will likely return to complete the auction and find true equilibrium.
                  </p>
                  <div className="h-1 bg-amber-200 dark:bg-amber-900/50 w-full mt-2"></div>
                </div>

                {/* POC */}
                <div>
                  <h4 className="font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-2 flex items-center gap-2">Point of Control (POC)</h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
                    The price level with the most volume.<br/>
                    <strong>Naked POC:</strong> A POC from a previous day that has not been tested. It acts as a major target.
                  </p>
                  <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30 mb-3">
                    <p className="text-xs text-blue-800 dark:text-blue-300 font-mono">
                      Yesterday&apos;s POC: $149.75<br/>
                      Today&apos;s Range: $150.25-$151.00<br/>
                      <span className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-bold">→ Naked POC = Magnet</span>
                    </p>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    The POC represents &ldquo;fair value&rdquo;&mdash;where the most trading occurred. Naked POCs from previous sessions act as magnets because they represent unfinished business at the most liquid price level.
                  </p>
                  <div className="h-1 bg-blue-200 dark:bg-blue-900/50 w-full mt-2"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Second Infographic */}
          <InfographicSlot src="https://i.imgur.com/eP2genA.jpeg" alt="Order Flow Analysis Framework" />

          {/* 4. Anomalies & Traps */}
          <section>
            <SectionHeader 
              icon={AlertTriangle} 
              title="Taxonomy of Anomalies" 
              subtitle="Icebergs, Spoofing, and Ghost Liquidity."
              colorClass="text-[#BC4128] dark:text-[#E2694A]" 
            />

            <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/20 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-6 rounded-xl mb-8">
              <h3 className="text-lg font-bold text-rose-900 dark:text-rose-300 mb-3 font-serif">The Liquidity Illusion</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Not all liquidity is real. Modern markets are plagued by phantom liquidity&mdash;orders that appear on the book but vanish when tested. Understanding these anomalies is critical to avoiding traps and identifying genuine institutional positioning.
              </p>
            </div>

            <div className="space-y-6">
              {/* Icebergs */}
              <div className="bg-slate-900 dark:bg-[#14171B] text-white rounded-2xl p-8 relative overflow-hidden group border border-transparent dark:border-white/10">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Anchor size={120} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 text-[#1D8A70] dark:text-[#3CBF9C]">
                    <Database size={24} />
                    <h3 className="text-2xl font-bold font-serif">Iceberg Orders & Absorption</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-slate-300 dark:text-slate-400 leading-relaxed mb-4">
                        Institutions slice massive orders to hide intent. Only a &ldquo;tip&rdquo; shows on the book. As soon as it&apos;s filled, it refills instantly.
                      </p>
                      <p className="text-slate-300 dark:text-slate-400 leading-relaxed mb-4 text-sm">
                        An iceberg order might show 100 shares on the bid at $150.00, but behind it is a hidden 10,000 share order. Each time the visible 100 shares are filled, another 100 instantly appears. This creates the illusion of infinite liquidity at that price level.
                      </p>
                      <div className="bg-slate-800 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-700 dark:border-white/10">
                        <h4 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] text-sm mb-1">Visual Signature:</h4>
                        <p className="text-slate-400 text-sm">
                          Heavy aggressive selling (Red Delta) but <strong>price does not drop</strong>. The bid is &ldquo;absorbing&rdquo; the flow.
                        </p>
                        <p className="text-slate-400 text-xs mt-2">
                          You&apos;ll see 5,000 shares hit the bid, but price only drops 1 cent. This is impossible unless there&apos;s a massive hidden order absorbing the selling pressure.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="bg-slate-800 dark:bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-wider">The Trap Dynamic</h4>
                        <ol className="text-sm space-y-2 text-slate-300 dark:text-slate-400 list-decimal list-inside">
                          <li>Retail sells aggressively into support.</li>
                          <li>Iceberg absorbs all sell orders (accumulation).</li>
                          <li>Sellers become &ldquo;trapped&rdquo; at the bottom.</li>
                          <li>Institution lifts the offer; trapped shorts cover (buy), fueling the reversal.</li>
                          <li>Price rallies sharply as short covering creates a squeeze.</li>
                        </ol>
                        <p className="text-slate-400 dark:text-slate-500 text-xs mt-3 italic">
                          This is the classic &ldquo;bear trap.&rdquo; Retail sees weakness and sells, but institutions are quietly accumulating. When the selling exhausts, the reversal is violent.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison: Spoofing vs Ghosting */}
              <div className="grid md:grid-cols-2 gap-6">
                <InfoCard title="Spoofing & Layering" icon={ShieldAlert} accentColor="rose">
                  <ConceptTag text="Illegal" color="bg-rose-100 text-rose-800" />
                  <ConceptTag text="Deceptive" color="bg-rose-100 text-rose-800" />
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Placing massive fake orders to create an illusion of depth, then canceling them before execution.<br/><br/>
                    <strong>Signature:</strong> Cancelled within milliseconds of price approach. 10-50x larger than genuine orders.
                  </p>
                  <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong>Example:</strong> A trader places a 50,000 share bid at $150.00 to create the illusion of support. As price approaches $150.00, the order is canceled. This tricks other traders into thinking there&apos;s strong buying interest, when in reality it&apos;s a trap.
                  </p>
                  <p className="mt-3 text-xs text-[#BC4128] dark:text-[#E2694A] font-bold">
                    Note: Spoofing is illegal under the Dodd-Frank Act. Traders have been fined millions and imprisoned for this practice.
                  </p>
                </InfoCard>

                <InfoCard title="HFT Ghosting" icon={Ghost} accentColor="violet">
                  <ConceptTag text="Legal" color="bg-violet-100 text-violet-800" />
                  <ConceptTag text="Risk Mgmt" color="bg-violet-100 text-violet-800" />
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    HFTs post duplicate orders across fragmented exchanges for priority. When one fills, the others are canceled instantly to avoid over-execution.<br/><br/>
                    <strong>Impact:</strong> Public order books overstate liquidity by ~9%.
                  </p>
                  <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <strong>Example:</strong> An HFT posts 100 shares on NASDAQ, NYSE, and BATS simultaneously. When the NASDAQ order fills, the NYSE and BATS orders are instantly canceled. This is legal risk management, not manipulation.
                  </p>
                  <p className="mt-3 text-xs text-violet-700 font-bold">
                    The key difference: Intent. Spoofing intends to deceive. Ghosting intends to avoid over-execution across fragmented venues.
                  </p>
                </InfoCard>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-6">
                <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-3 flex items-center gap-2">
                  <Eye size={20} /> Practical Detection
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-white text-sm mb-2">Iceberg Detection:</h5>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Price holds despite heavy volume</li>
                      <li>• Order book refills instantly after fills</li>
                      <li>• Delta divergence (selling but price stable)</li>
                      <li>• Time & Sales shows repeated fills at same price</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-white text-sm mb-2">Spoof Detection:</h5>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Orders 10x+ larger than typical size</li>
                      <li>• Canceled within milliseconds of approach</li>
                      <li>• Repeated pattern at key levels</li>
                      <li>• No genuine fills despite size</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* 5. AMD Framework */}
          <section>
            <SectionHeader 
              icon={TrendingUp} 
              title="The AMD Framework" 
              subtitle="Accumulation, Manipulation, Distribution."
              colorClass="text-[#A8672E] dark:text-[#D08F52]" 
            />

            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-950/20 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-6 rounded-xl mb-8">
              <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-3 font-serif">The Institutional Playbook</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                The AMD framework describes the three-phase cycle of institutional positioning. Understanding where you are in this cycle is the difference between trading with the &ldquo;smart money&rdquo; and becoming their exit liquidity.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mt-3 text-sm">
                This framework applies across all timeframes&mdash;from intraday scalping to multi-month position building. The key is recognizing the behavioral signatures of each phase through order flow analysis.
              </p>
            </div>

            <div className="bg-white dark:bg-[#14171B] rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 overflow-hidden mb-8">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-white/10">
                <div className="p-8 hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-white dark:bg-[#0A0D14]/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] flex items-center justify-center mb-4 font-bold">A</div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-serif">Accumulation</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Methodical building of inventory. Price ranges are narrow. Institutions use icebergs and VWAP algos to hide their size.
                  </p>
                  <ul className="text-xs space-y-2 text-slate-500 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C] mt-1.5"></div>
                      Persistent absorption at value.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C] mt-1.5"></div>
                      Low volatility, high volume on up-ticks.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C] mt-1.5"></div>
                      Footprint shows buying at lows, selling at highs (range bound).
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C] mt-1.5"></div>
                      Time frame: Days to weeks.
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-950/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 font-bold">Key Signal:</p>
                    <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mt-1">Price refuses to break support despite repeated tests. Each test shows absorption (negative delta but price holds).</p>
                  </div>
                </div>

                <div className="p-8 bg-[#BC4128]/10 dark:bg-[#E2694A]/10/30 dark:bg-rose-950/10 hover:bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50 dark:hover:bg-rose-950/20 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] flex items-center justify-center mb-4 font-bold">M</div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-serif">Manipulation (The Trap)</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Rapid, violent expansions designed to trigger stops and emotions. This is the &ldquo;shakeout&rdquo; or &ldquo;stop hunt.&rdquo;
                  </p>
                  <ul className="text-xs space-y-2 text-slate-500 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#BC4128] dark:bg-[#E2694A] mt-1.5"></div>
                      Stop Hunts: Spikes into liquidity pockets.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#BC4128] dark:bg-[#E2694A] mt-1.5"></div>
                      Delta Exhaustion: High volume wick, delta diverges.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#BC4128] dark:bg-[#E2694A] mt-1.5"></div>
                      Rapid reversal after hitting key level.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#BC4128] dark:bg-[#E2694A] mt-1.5"></div>
                      Time frame: Minutes to hours.
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/20 rounded-lg border border-rose-100 dark:border-rose-900/30">
                    <p className="text-xs text-rose-800 dark:text-rose-300 font-bold">Key Signal:</p>
                    <p className="text-xs text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mt-1">Price breaks key support/resistance with high volume, then immediately reverses. Footprint shows exhaustion (zero prints or delta divergence).</p>
                  </div>
                </div>

                <div className="p-8 hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-white dark:bg-[#0A0D14]/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] flex items-center justify-center mb-4 font-bold">D</div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-serif">Distribution</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Offloading inventory to late participants. Institutions sell into strength as retail chases the breakout.
                  </p>
                  <ul className="text-xs space-y-2 text-slate-500 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#A8672E] dark:bg-[#D08F52] mt-1.5"></div>
                      Breaker Block: Reclaiming the range after the trap.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#A8672E] dark:bg-[#D08F52] mt-1.5"></div>
                      Trapped buyers become fuel for the drop.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#A8672E] dark:bg-[#D08F52] mt-1.5"></div>
                      High volume at highs, negative delta.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#A8672E] dark:bg-[#D08F52] mt-1.5"></div>
                      Time frame: Hours to days.
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                    <p className="text-xs text-blue-800 dark:text-blue-300 font-bold">Key Signal:</p>
                    <p className="text-xs text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mt-1">Price makes new highs but delta is negative. Institutions are selling into the rally. When buying exhausts, price collapses.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 dark:bg-[#14171B] text-white rounded-2xl p-8 mb-8 border border-transparent dark:border-white/10">
              <h3 className="text-xl font-bold mb-6 text-white font-serif">AMD in Action: Real-World Example</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C]/20 flex items-center justify-center shrink-0 text-[#1D8A70] dark:text-[#3CBF9C] font-bold">A</div>
                  <div>
                    <h4 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-1">Week 1-2: Accumulation</h4>
                    <p className="text-slate-300 dark:text-slate-400 text-sm">
                      SPY trades in a tight $445-$447 range. Volume is elevated but price barely moves. Footprint shows persistent buying at $445 (iceberg absorption). Each dip to $445 is met with immediate buying. Delta is positive on dips, negative on rips (institutions buying dips, retail selling rips).
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#BC4128] dark:bg-[#E2694A]/20 flex items-center justify-center shrink-0 text-[#BC4128] dark:text-[#E2694A] font-bold">M</div>
                  <div>
                    <h4 className="font-bold text-[#BC4128] dark:text-[#E2694A] mb-1">Day 15: Manipulation</h4>
                    <p className="text-slate-300 dark:text-slate-400 text-sm">
                      SPY breaks below $445 with a violent 2-point drop to $443 in 5 minutes. Retail stops are triggered. Footprint shows massive selling (red delta). But at $443, a zero print appears (0 x 50). No more sellers. Price immediately reverses back above $445. The trap is set.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#A8672E] dark:bg-[#D08F52]/20 flex items-center justify-center shrink-0 text-[#A8672E] dark:text-[#D08F52] font-bold">D</div>
                  <div>
                    <h4 className="font-bold text-[#A8672E] dark:text-[#D08F52] mb-1">Week 3-4: Distribution</h4>
                    <p className="text-slate-300 dark:text-slate-400 text-sm">
                      SPY rallies to $452 (new high). Retail chases the breakout. But footprint shows negative delta at the highs&mdash;institutions are selling into the rally. When the buying exhausts, SPY collapses back to $445. Trapped buyers at $450-$452 panic sell, fueling the drop.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-200 dark:border-indigo-900/30 rounded-xl p-6">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-3 flex items-center gap-2">
                <Target size={20} /> Trading the AMD Cycle
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white dark:bg-[#1A1D24] p-4 rounded-lg border border-emerald-200 dark:border-emerald-900/30">
                  <h5 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-2">Enter During Accumulation</h5>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">Buy when institutions are buying. Look for absorption at support, positive delta on dips, and tight ranges with elevated volume.</p>
                </div>
                <div className="bg-white dark:bg-[#1A1D24] p-4 rounded-lg border border-rose-200 dark:border-rose-900/30">
                  <h5 className="font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mb-2">Avoid the Manipulation</h5>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">Don&apos;t chase breakouts or breakdowns. Wait for the reversal. Look for exhaustion signals (zero prints, delta divergence).</p>
                </div>
                <div className="bg-white dark:bg-[#1A1D24] p-4 rounded-lg border border-blue-200 dark:border-blue-900/30">
                  <h5 className="font-bold text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-2">Exit During Distribution</h5>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">Sell when institutions are selling. Look for negative delta at new highs, increased volatility, and trapped participants.</p>
                </div>
              </div>
            </div>
          </section>
      </div>
    </ArticleFrame>
  );
}
