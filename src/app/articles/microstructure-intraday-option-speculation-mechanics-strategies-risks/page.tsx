'use client';

import React from 'react';
import { TrendingUp, Activity, AlertTriangle, ShieldAlert, Target, Zap, MousePointer2, ArrowRight, Briefcase, Ghost, Anchor, Wind, Server, Database, Layers, Network } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

export default function MicrostructureIntradayOptionSpeculation() {

  const introData = {
    title: "The Microstructure of Intraday Option Speculation",
    subtitle: "Mechanics, Strategies, and Structural Risks",
    summary: "An exhaustive analysis of the option day trading ecosystem, deconstructing 0DTE contracts, Gamma Exposure (GEX), and the structural asymmetry between retail traders and institutional market makers.",
    stats: [
      { label: "Retail Volume", value: "40%+", sub: "of daily total" },
      { label: "Contracts", value: "15B+", sub: "annual volume" },
      { label: "Avg Hold Time", value: "< 30m", sub: "for 0DTE scalps" }
    ]
  };

  return (
    <ArticleFrame slug="microstructure-intraday-option-speculation-mechanics-strategies-risks">
      <div className="bg-transparent font-sans dark:text-slate-300">
        <div className="relative overflow-hidden bg-white dark:bg-transparent pt-20 pb-16 lg:pt-32 lg:pb-24">
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-100 dark:from-blue-900/20 to-transparent rounded-bl-full" />
            <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-100 dark:from-purple-900/20 to-transparent rounded-tr-full" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/20 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] mb-6 border border-indigo-100 dark:border-indigo-900/30">
              <TrendingUp className="w-4 h-4 mr-2" />
              Advanced Market Mechanics
            </span>
            
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              {introData.summary}
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {introData.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col p-6 bg-white dark:bg-slate-900/40 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-slate-500 dark:text-slate-400">{stat.label}</dt>
                  <dd className="order-1 text-4xl font-extrabold text-slate-900 dark:text-white">{stat.value}</dd>
                  <div className="order-3 mt-1 text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <InfographicSlot alt="Intraday Option Speculation Infographic" />
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Greeks Section */}
        <div className="bg-white dark:bg-[#14171B] rounded-3xl shadow-xl dark:shadow-none p-8 border border-slate-100 dark:border-white/10 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-base text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-semibold tracking-wide uppercase font-serif">Theoretical Framework</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">The Greeks</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[
              {
                symbol: "Δ", name: "Delta", role: "The Lever",
                desc: "Rate of change of option price vs. underlying price. A 0.50 Delta call moves $0.50 for every $1.00 move in the stock. In 0DTE, Delta can flip from 0.10 to 0.90 in minutes.",
                color: "text-[#A8672E] dark:text-[#D08F52]", bg: "bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-900/30"
              },
              {
                symbol: "Γ", name: "Gamma", role: "The Accelerant",
                desc: "Rate of change of Delta. This is the 'risk' engine. In the final hours of trading, Gamma becomes vertical, turning small stock moves into 500%+ option swings.",
                color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-200 dark:border-purple-900/30"
              },
              {
                symbol: "Θ", name: "Theta", role: "The Decay",
                desc: "Time decay. For 0DTE, Theta is aggressive. If the stock goes sideways for 10 minutes, the option can lose 10-15% of its value purely due to time.",
                color: "text-[#BC4128] dark:text-[#E2694A]", bg: "bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-900/30"
              },
              {
                symbol: "V", name: "Vanna", role: "IV Sensitivity",
                desc: "How Delta changes as Volatility changes. When the market drops, IV spikes, boosting put values faster than math would predict (Vanna tailwind).",
                color: "text-[#A8672E] dark:text-[#D08F52]", bg: "bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-teal-900/20", border: "border-teal-200 dark:border-teal-900/30"
              },
              {
                symbol: "C", name: "Charm", role: "Delta Decay",
                desc: "The change in Delta over time. As expiration nears, OTM deltas vanish to 0 and ITM deltas snap to 1. This creates 'pinning' behavior.",
                color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-900/20", border: "border-pink-200 dark:border-pink-900/30"
              }
            ].map((greek, idx) => (
              <div key={idx} className={`relative p-6 rounded-2xl border-2 ${greek.border} ${greek.bg} transition-all hover:-translate-y-1 duration-300 hover:shadow-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-4xl font-serif font-bold ${greek.color}`}>{greek.symbol}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider bg-white dark:bg-[#0A0D14]/60 dark:bg-black/20 ${greek.color}`}>
                    {greek.role}
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${greek.color}`}>{greek.name}</h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{greek.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Lifecycle Timeline */}
        <div className="py-24 bg-slate-50 dark:bg-[#14171B] border-y border-slate-200 dark:border-white/10 dark:border-white/10 rounded-3xl mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-semibold tracking-wide uppercase font-serif">Timing is Everything</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">The Intraday Lifecycle</p>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
              <div className="space-y-12 relative">
                {[
                  {
                    time: "09:30 - 09:50", phase: "The Volatility Open / Shakeout",
                    desc: "Market orders flood the system. Spreads are wide. IV is artificially high due to uncertainty.",
                    dealerImperative: "Absorb initial liquidity, widen spreads to protect against directional risk.",
                    retailTrap: "Buying calls at the bell (paying max IV) only to see price rise but option value drop (IV Crush).",
                    action: "NO ENTRY. Observe the opening range.", volatility: "Extreme", risk: "Critical"
                  },
                  {
                    time: "09:50 - 10:30", phase: "Institutional Trend Set",
                    desc: "Initial balance is formed. Institutions begin executing large VWAP orders.",
                    dealerImperative: "Hedge delta exposure from the open. Establish walls.",
                    retailTrap: "Fading the first strong move (assuming it's a fakeout) when it's actually institutional buying.",
                    action: "Trade the breakout of the initial 20m range.", volatility: "High", risk: "Medium"
                  },
                  {
                    time: "10:30 - 11:30", phase: "The European Close / Reversal",
                    desc: "European markets close (11:30 ET). Liquidity shifts often cause a counter-trend move.",
                    dealerImperative: "Rebalance hedges as global liquidity drops.",
                    retailTrap: "Chasing the morning trend just as it exhausts due to EU volume leaving.",
                    action: "Tighten stops on morning runners. Watch for reversal patterns.", volatility: "Medium", risk: "Medium"
                  },
                  {
                    time: "11:30 - 13:30", phase: "The Theta Kill Zone (Lunch)",
                    desc: "Volume drops ~40%. Price often chops in a tight range.",
                    dealerImperative: "Collect Theta. Keep price pinned to burn OTM options.",
                    retailTrap: "Over-trading the chop. Getting 'chopped up' in a $0.50 range while options lose 20% value.",
                    action: "CASH IS A POSITION. Do not hold 0DTEs here.", volatility: "Low", risk: "High (Theta)"
                  },
                  {
                    time: "13:30 - 15:00", phase: "The Bond Close / Pre-Power Hour",
                    desc: "Bond market closes (2-3pm ET). Yield moves can trigger equity flows.",
                    dealerImperative: "Position for end-of-day gamma moves.",
                    retailTrap: "Falling asleep after lunch and missing the breakout of the 'Lunch Box'.",
                    action: "Identify the new range formed during lunch. Prepare for breakout.", volatility: "Rising", risk: "Medium"
                  },
                  {
                    time: "15:00 - 15:50", phase: "Power Hour / Gamma Squeeze",
                    desc: "Dealers must hedge ITM options aggressively. One-way moves are common.",
                    dealerImperative: "Chase delta. If price rises, buy more stock (squeezing shorts).",
                    retailTrap: "Counter-trend trading (trying to catch the top) during a gamma squeeze.",
                    action: "Ride the momentum or stay out. Do not fade.", volatility: "Extreme", risk: "High"
                  },
                  {
                    time: "15:50 - 16:00", phase: "MOC Madness (Gambling)",
                    desc: "Market On Close imbalances publish. Pure noise.",
                    dealerImperative: "Flat position. Close out risk.",
                    retailTrap: "Holding a position hoping for a miracle save.",
                    action: "FLAT. Close all intraday positions.", volatility: "Random", risk: "Gambling"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative flex flex-col md:flex-row gap-8 items-start group">
                    <div className="md:w-32 flex-shrink-0 flex md:justify-end items-center z-10">
                      <div className={`border-2 font-bold px-4 py-2 rounded-xl text-sm shadow-sm whitespace-nowrap transition-colors ${
                        item.risk === 'Critical' || item.risk === 'Gambling' 
                          ? 'bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/20 border-[#BC4128] dark:border-[#E2694A] dark:border-red-900/30 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]' 
                          : 'bg-white dark:bg-black/40 border-[#A8672E] dark:border-[#D08F52] dark:border-indigo-900/30 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]'
                      }`}>
                        {item.time}
                      </div>
                    </div>
                    <div className="flex-1 bg-white dark:bg-[#14171B] rounded-2xl p-6 shadow-sm dark:shadow-none border border-slate-200 dark:border-white/10 dark:border-white/10 relative hover:shadow-md dark:hover:shadow-none transition-shadow">
                      <div className="absolute top-6 -left-2 w-4 h-4 bg-white dark:bg-[#14171B] rotate-45 border-l border-b border-slate-200 dark:border-white/10 dark:border-white/10 hidden md:block"></div>
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">{item.phase}</h3>
                        <div className="flex gap-2">
                          <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center">
                            <Activity className="w-3 h-3 mr-1" />
                            Vol: {item.volatility}
                          </span>
                          <span className={`text-xs font-bold px-2 py-1 rounded flex items-center ${
                            item.risk.includes('High') || item.risk.includes('Critical') || item.risk.includes('Gambling')
                              ? 'bg-red-100 dark:bg-red-900/20 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]' 
                              : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                          }`}>
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {item.risk}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 italic border-l-4 border-slate-200 dark:border-white/10 dark:border-white/10 pl-4">{item.desc}</p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-white/10">
                          <div className="flex items-center mb-2">
                            <Briefcase className="w-4 h-4 text-slate-500 dark:text-slate-400 mr-2" />
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Dealer Imperative</span>
                          </div>
                          <p className="text-sm text-slate-800 dark:text-slate-300">{item.dealerImperative}</p>
                        </div>
                        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                          <div className="flex items-center mb-2">
                            <Ghost className="w-4 h-4 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] mr-2" />
                            <span className="text-xs font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] uppercase tracking-wider">The Retail Trap</span>
                          </div>
                          <p className="text-sm text-red-900 dark:text-red-300">{item.retailTrap}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 flex items-start">
                        <Target className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52] flex-shrink-0 mt-0.5 mr-3" />
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-300">
                          <span className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-bold">Recommended Action:</span> {item.action}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* GEX Logic Section */}
        <div className="py-24 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-base text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-semibold tracking-wide uppercase font-serif">The Dealer Hedging Loop</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">GEX Masterclass</p>
          </div>
          <div className="mb-12">
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-center leading-relaxed">
              GEX (Gamma Exposure) tells us how Market Makers are positioned. Because they must remain "Delta Neutral," their hedging activity creates predictable feedback loops in the market. <br />
              <span className="font-bold text-[#A8672E] dark:text-[#D08F52]">You are trading against their necessity.</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: "Positive Gamma Regime", subtitle: "The Shock Absorber",
                condition: "Dealers are LONG options (Long Gamma)", behavior: "Counter-Cyclical Hedging",
                loop: [
                  { trigger: "Price Rises 📈", reaction: "Dealers SELL stock to lock profit", effect: "Price pushed down" },
                  { trigger: "Price Falls 📉", reaction: "Dealers BUY stock to cover", effect: "Price pushed up" }
                ],
                outcome: "Mean Reversion, Low Volatility, 'Chop'", color: "emerald", icon: <Anchor className="w-6 h-6" />
              },
              {
                title: "Negative Gamma Regime", subtitle: "The Accelerant",
                condition: "Dealers are SHORT options (Short Gamma)", behavior: "Pro-Cyclical Hedging",
                loop: [
                  { trigger: "Price Rises 📈", reaction: "Dealers BUY stock to hedge loss", effect: "Price spikes higher (Squeeze)" },
                  { trigger: "Price Falls 📉", reaction: "Dealers SELL stock to hedge loss", effect: "Price crashes lower" }
                ],
                outcome: "Trend Acceleration, High Volatility, 'Crash Risk'", color: "rose", icon: <Wind className="w-6 h-6" />
              }
            ].map((regime, idx) => (
              <div key={idx} className={`rounded-3xl p-8 border-2 ${
                regime.color === 'emerald' 
                  ? 'bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900/30' 
                  : 'bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/20 border-rose-200 dark:border-rose-900/30'
              } relative overflow-hidden`}>
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-white dark:bg-black/40 shadow-sm dark:shadow-none ${
                      regime.color === 'emerald' ? 'text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]' : 'text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]'
                    }`}>
                      {regime.icon}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${
                        regime.color === 'emerald' ? 'text-emerald-900 dark:text-[#1D8A70] dark:text-[#3CBF9C]' : 'text-rose-900 dark:text-[#BC4128] dark:text-[#E2694A]'
                      }`}>
                        {regime.title}
                      </h3>
                      <p className={`font-medium ${
                        regime.color === 'emerald' ? 'text-[#1D8A70] dark:text-[#3CBF9C] dark:text-emerald-300' : 'text-[#BC4128] dark:text-[#E2694A] dark:text-rose-300'
                      }`}>
                        {regime.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-[#0A0D14]/80 dark:bg-black/20 rounded-xl p-6 mb-6 backdrop-blur-sm border border-white/50 dark:border-white/10 relative z-10">
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase opacity-50 block">Condition</span>
                    <p className="font-medium text-slate-900 dark:text-white">{regime.condition}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase opacity-50 block">Market Effect</span>
                    <p className="font-medium text-slate-900 dark:text-white">{regime.outcome}</p>
                  </div>
                </div>
                
                <div className="space-y-3 relative z-10">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60 ml-1">The Feedback Loop</span>
                  {regime.loop.map((step, i) => (
                    <div key={i} className="flex items-center bg-white dark:bg-[#14171B] rounded-lg p-4 shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                      <div className="flex-1">
                        <span className="font-bold text-slate-800 dark:text-slate-300 text-sm block">{step.trigger}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 mx-2" />
                      <div className="flex-1">
                        <span className={`font-bold text-sm block ${
                          regime.color === 'emerald' ? 'text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]' : 'text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]'
                        }`}>
                          {step.reaction}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 mx-2" />
                      <div className="flex-1 text-right">
                        <span className="font-medium text-slate-600 dark:text-slate-400 text-xs block">{step.effect}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* GEX Glossary */}
          <div className="bg-slate-900 rounded-3xl p-8 lg:p-12 text-white mb-16 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {[
                {
                  term: "Call Wall", def: "Strike with largest Net Positive Gamma.",
                  implication: "Major Resistance. Dealers are heavily long calls here and will sell stock aggressively if price approaches, capping the upside."
                },
                {
                  term: "Put Wall", def: "Strike with largest Net Negative Gamma (usually).",
                  implication: "Major Support. Dealers are short puts here. However, if price breaks BELOW the Put Wall, dealers must sell into the hole, causing a crash."
                },
                {
                  term: "Zero Gamma Flip", def: "The price level where Net GEX shifts from Positive to Negative.",
                  implication: "The Volatility Trigger. Above = Stable. Below = Volatile. Crossing this line is a major trading signal."
                }
              ].map((level, idx) => (
                <div key={idx} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />
                    <h4 className="text-xl font-bold text-white">{level.term}</h4>
                  </div>
                  <p className="text-indigo-200 text-sm mb-4 font-mono border-l-2 border-[#A8672E] dark:border-[#D08F52] pl-3">{level.def}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{level.implication}</p>
                </div>
              ))}
            </div>
          </div>

          {/* GEX Trading Playbook */}
          <div className="bg-white dark:bg-[#14171B] rounded-3xl border border-slate-200 dark:border-white/10 dark:border-white/10 overflow-hidden shadow-sm dark:shadow-none">
            <div className="bg-slate-50 dark:bg-slate-900/40 px-8 py-6 border-b border-slate-200 dark:border-white/10 dark:border-white/10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center font-serif">
                <Briefcase className="w-5 h-5 mr-3 text-[#A8672E] dark:text-[#D08F52]" />
                The GEX Trading Playbook
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">If the market is here, trade like this.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#14171B]/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-white/10 dark:border-white/10 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="px-8 py-4">GEX Environment</th>
                    <th className="px-8 py-4">Market Mood</th>
                    <th className="px-8 py-4">Best Strategy</th>
                    <th className="px-8 py-4">Stop Loss Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/10">
                  {[
                    {
                      metric: "High Positive GEX", environment: "Stuck in Mud", strategy: "Iron Condors / Credit Spreads",
                      tactic: "Sell resistance, Buy support. Fade breakouts.", stopLoss: "Wide (allow for noise)"
                    },
                    {
                      metric: "Zero Gamma Flip", environment: "The Transition", strategy: "Straddles / Directional Lottos",
                      tactic: "Wait for the break. Volatility often explodes here.", stopLoss: "Tight (if it fakes, get out)"
                    },
                    {
                      metric: "Deep Negative GEX", environment: "Free Fall / Rocket", strategy: "Long Puts / Long Calls (Debit)",
                      tactic: "Buy strength, sell weakness. DO NOT FADE.", stopLoss: "Trailing (let runners run)"
                    }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800 transition-colors">
                      <td className="px-8 py-6 font-bold text-indigo-900 dark:text-[#A8672E] dark:text-[#D08F52]">{row.metric}</td>
                      <td className="px-8 py-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300">
                          {row.environment}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{row.strategy}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{row.tactic}</div>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-600 dark:text-slate-400">{row.stopLoss}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Structural Asymmetry Section */}
        <div className="py-24 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-base text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52] font-semibold tracking-wide uppercase font-serif">Why The House Wins</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">The Structural Asymmetry</p>
          </div>
          <p className="text-center text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed">
            This is not a "level playing field." Institutional infrastructure is designed to exploit the specific latency, data, and order routing inefficiencies of retail traders.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "The Latency Arbitrage", icon: <Zap className="w-6 h-6 text-yellow-500" />,
                retail: "See price on screen → Click Buy → Internet → Broker → Wholesaler. Total: ~200-500ms.",
                institution: "Co-located server sees price → Algo fires. Total: < 10 microseconds.",
                impact: "You are buying a 'stale' price. The HFT sees the order coming and can front-run the liquidity."
              },
              {
                title: "Data Fidelity (SIP vs. Direct)", icon: <Database className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />,
                retail: "Consolidated Tape (SIP). Aggregates data from all exchanges. Delayed and simplified.",
                institution: "Direct Proprietary Feeds. Raw data from every exchange instantly. Includes full depth of book (Level 3).",
                impact: "You are trading with a foggy map. They have GPS and radar."
              },
              {
                title: "Order Routing (PFOF)", icon: <Layers className="w-6 h-6 text-purple-500" />,
                retail: "Broker sells your order to a Wholesaler (Market Maker) for profit. You rarely hit the lit exchange.",
                institution: "Direct Market Access (DMA). Routes intelligently to find hidden liquidity or capture rebates.",
                impact: "Conflict of Interest. The wholesaler wants to maximize their spread capture, not your execution quality."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-[#14171B] rounded-3xl p-8 border border-slate-200 dark:border-white/10 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors">
                <div className="bg-slate-50 dark:bg-slate-900/40 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 font-serif">{item.title}</h3>
                <div className="space-y-6">
                  <div className="relative pl-6 border-l-2 border-slate-200 dark:border-white/10">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider absolute -top-2 left-6">Retail Reality</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{item.retail}</p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-[#A8672E] dark:border-[#D08F52]">
                    <span className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wider absolute -top-2 left-6">Institutional Reality</span>
                    <p className="text-sm text-slate-900 dark:text-white mt-2 font-medium">{item.institution}</p>
                  </div>
                  <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/20 p-4 rounded-xl text-sm text-red-800 dark:text-red-300 border border-red-100 dark:border-red-900/30">
                    <span className="font-bold block mb-1">The Impact:</span>
                    {item.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trade Journey Visualization */}
          <div className="bg-slate-900 rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Network className="w-64 h-64" />
            </div>
            <h3 className="text-2xl font-bold mb-10 text-center relative z-10 font-serif">The Journey of a Trade</h3>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 relative z-10">
              <div className="flex flex-col items-center text-center max-w-[200px]">
                <div className="w-16 h-16 bg-[#A8672E] dark:bg-[#D08F52] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/50">
                  <MousePointer2 className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-lg">You Click</h4>
                <p className="text-xs text-slate-400 mt-2">Mobile App / Web</p>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-600 dark:text-slate-400 hidden lg:block" />
              
              <div className="flex flex-col items-center text-center max-w-[200px]">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4 border border-slate-600">
                  <Briefcase className="w-8 h-8 text-slate-300" />
                </div>
                <h4 className="font-bold text-lg">Broker</h4>
                <p className="text-xs text-slate-400 mt-2">Routes Order</p>
              </div>
              <ArrowRight className="w-6 h-6 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] hidden lg:block" />
              
              <div className="relative">
                <div className="absolute -top-4 -right-4 bg-[#BC4128] dark:bg-[#E2694A] text-xs font-bold px-2 py-1 rounded text-white animate-pulse">PFOF Zone</div>
                <div className="flex flex-col items-center text-center max-w-[200px] bg-slate-800 p-6 rounded-2xl border border-red-900/50">
                  <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-4 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">
                    <Ghost className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg text-[#BC4128] dark:text-[#E2694A]">Wholesaler</h4>
                  <p className="text-xs text-slate-400 mt-2">HFT / Market Maker</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 italic">"Internalizes" order or front-runs on exchange</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-600 dark:text-slate-400 hidden lg:block" />
              
              <div className="flex flex-col items-center text-center max-w-[200px] opacity-50">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-700">
                  <Server className="w-8 h-8 text-slate-500 dark:text-slate-400" />
                </div>
                <h4 className="font-bold text-lg">Lit Exchange</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">NYSE / NASDAQ</p>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1">Retail rarely reaches here directly</p>
              </div>
            </div>
          </div>
        </div>
        {/* Risk Analysis Section */}
        <div className="bg-slate-900 text-white py-24 rounded-3xl mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base text-[#BC4128] dark:text-[#E2694A] font-semibold tracking-wide uppercase font-serif">The Psychological Toll</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Why "Breakeven" is a Loss</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 font-serif">The "Tilt" Cycle</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Option day trading triggers the same neural pathways as gambling. The variance (huge wins, huge losses) creates an intermittent reinforcement schedule, the most addictive pattern known in behavioral psychology.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "FOMO Entry", desc: "Chasing a green candle. Entry is too late, risk is undefined." },
                    { title: "The Freeze", desc: "Trade goes red immediately. Trader refuses to cut, hoping for a bounce (Loss Aversion)." },
                    { title: "Revenge", desc: "Stop loss hit. Trader immediately doubles size on the next trade to \"make it back\"." }
                  ].map((step, idx) => (
                    <div key={idx} className="flex">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-900/50 flex items-center justify-center border border-[#BC4128] dark:border-[#E2694A] text-[#BC4128] dark:text-[#E2694A] font-bold">
                        {idx + 1}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-white">{step.title}</h4>
                        <p className="text-slate-400 text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <h4 className="font-bold text-lg text-purple-400 mb-6">The Mathematical Ruin</h4>
                <div className="space-y-4">
                  {[
                    { label: "Win Rate Needed to Breakeven (1:1 R/R)", value: "55-60%", color: "text-white" },
                    { label: "Impact of Bid-Ask Spread", value: "-10% Edge", color: "text-[#BC4128] dark:text-[#E2694A]" },
                    { label: "Impact of Commission/Fees", value: "-$1.30 / Round Trip", color: "text-[#BC4128] dark:text-[#E2694A]" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-4 border-b border-slate-700">
                      <span className="text-slate-300">{item.label}</span>
                      <span className={`font-mono font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                  <div className="pt-4">
                    <p className="text-sm text-slate-400 italic">"In a zero-sum game with transaction costs, the average active trader must lose money."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-white dark:bg-[#0A0D14] py-20 border-t border-slate-200 dark:border-white/10 rounded-3xl mb-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <ShieldAlert className="w-16 h-16 text-[#A8672E] dark:text-[#D08F52] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 font-serif">The Verdict</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              For the common investor, option day trading represents a structural misallocation of capital. The convergence of mathematical disadvantage, structural inequity, and psychological liability creates a barrier to success that is statistically insurmountable.
            </p>
            <div className="inline-block p-6 bg-slate-50 dark:bg-[#14171B] rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <p className="font-medium text-slate-900 dark:text-white mb-2">Better Alternatives:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="bg-white dark:bg-[#0A0D14] px-3 py-1 rounded border border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-slate-400">Low Cost Index Funds</span>
                <span className="bg-white dark:bg-[#0A0D14] px-3 py-1 rounded border border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-slate-400">The Wheel Strategy (Selling Theta)</span>
                <span className="bg-white dark:bg-[#0A0D14] px-3 py-1 rounded border border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-slate-400">Leaps (Deep ITM)</span>
              </div>
            </div>
          </div>
        </div>

        </main>
      </div>
    </ArticleFrame>
  );
}