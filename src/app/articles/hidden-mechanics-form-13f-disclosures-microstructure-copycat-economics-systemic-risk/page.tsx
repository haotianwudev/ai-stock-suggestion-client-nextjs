'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';
import {
  TrendingUp,
  AlertTriangle,
  ShieldAlert,
  EyeOff,
  Search,
  Info,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  FileText,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';

// Data arrays
const volatilityData = [
  { day: -5, volatility: 1.2, volume: 450000 },
  { day: -4, volatility: 1.3, volume: 470000 },
  { day: -3, volatility: 1.1, volume: 430000 },
  { day: -2, volatility: 1.4, volume: 490000 },
  { day: -1, volatility: 1.5, volume: 510000 },
  { day: 0, volatility: 3.8, volume: 1200000 },
  { day: 1, volatility: 4.2, volume: 1400000 },
  { day: 2, volatility: 2.5, volume: 850000 },
  { day: 3, volatility: 1.9, volume: 600000 },
  { day: 4, volatility: 1.6, volume: 550000 },
  { day: 5, volatility: 1.4, volume: 480000 },
];

const copycatPerformanceData = [
  { strategy: 'Pure Consensus', returns: 4.2, risk: 2.8, color: '#3b82f6' },
  { strategy: 'Pure Conviction', returns: 5.1, risk: 3.5, color: '#8b5cf6' },
  { strategy: 'Conviction + Consensus', returns: 6.3, risk: 3.1, color: '#10b981' },
  { strategy: 'Smart Copycat (Algorithm)', returns: 8.5, risk: 3.9, color: '#f59e0b' },
];

const berkshireChubbData = [
  { quarter: "Q3 '23", shares: 0, status: 'Confidential Accumulation' },
  { quarter: "Q4 '23", shares: 0, status: 'Confidential Accumulation' },
  { quarter: "Q1 '24", shares: 25.9, status: '13F-HR/A Reveal' },
  { quarter: "Q2 '24", shares: 27.0, status: 'Continued Buying' },
  { quarter: "Q3 '25", shares: 31.3, status: 'Aggressive Buy' },
  { quarter: "Q4 '25", shares: 34.2, status: 'Position Sizing' },
  { quarter: "Q1 '26", shares: 34.2, status: 'Pause Accumulation' },
];

interface InsightPillProps {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

const InsightPill = ({ label, value, trend = 'neutral' }: InsightPillProps) => {
  const colors = {
    up: 'text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C] bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50',
    down: 'text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50',
    neutral: 'text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800',
  };

  const Icon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Clock;

  return (
    <div className={`flex flex-col p-4 rounded-xl border ${colors[trend]} transition-all min-w-0`}>
      <span className="text-xs font-semibold uppercase tracking-wider opacity-75 mb-1 truncate">{label}</span>
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 shrink-0" />
        <span className="text-xl font-bold truncate">{value}</span>
      </div>
    </div>
  );
};

export default function Form13FMicrostructureArticle() {
  return (
    <ArticleFrame
      slug="hidden-mechanics-form-13f-disclosures-microstructure-copycat-economics-systemic-risk"
      additionalDisclaimer="13F filings are public SEC disclosures subject to a 45-day delay. Data presented is illustrative of aggregate academic findings and hypothetical scenarios; it does not represent real-time or forward-looking investment advice."
    >
      <div className="pb-24">
        <InfographicSlot alt="Form 13F Microstructure Infographic" />

        <div className="max-w-4xl mx-auto">
          {/* Intro Section */}
          <section className="py-16">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/3 space-y-6 min-w-0">
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  The convergence of mandated 45-day disclosure deadlines and High-Frequency Trading (HFT) has
                  fundamentally altered market microstructure. Form 13F filings, required for institutional managers
                  with over $100M in qualifying assets, create predictable information asymmetries that sophisticated
                  algorithms exploit within milliseconds.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  This article dissects the microstructural mechanics of 13F disclosures&mdash;from algorithmic XML
                  parsing in ~70ms to the systemic risks of Form SHO integration arriving in late 2026.
                </p>
              </div>

              <div className="lg:w-1/3 min-w-0">
                <div className="p-6 bg-[#14171B] dark:bg-[#05070A] text-white border-none shadow-xl rounded-3xl h-full">
                  <h2 className="font-serif text-xl flex items-center gap-2 mb-6">
                    <AlertTriangle className="w-5 h-5 text-[#A8672E] dark:text-[#D08F52]" />
                    TL;DR Key Findings
                  </h2>
                  <ul className="space-y-4 text-sm text-slate-300">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <span>HFT algorithms parse 13F XMLs in <strong>~70ms</strong>, creating microsecond volatility spikes.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <span>Smart copycat strategies generate <strong>5.5% to 6.7%</strong> annual excess returns.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />
                      <span>Disclosing funds suffer a <strong>~2.6%</strong> annual performance drag due to predatory front-running.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Volatility Section */}
          <section id="volatility" className="py-16 border-t border-slate-200 dark:border-slate-800 scroll-mt-12">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Market Volatility Around Filing Dates</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">How algorithmic parsing and human copycats drive short-term price action.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 min-w-0">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center justify-between font-serif">
                  <span>Intraday Volatility &amp; Volume Spike (T=0)</span>
                </h3>
                <div className="h-72 w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={volatilityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <RechartsTooltip
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--tw-prose-body)' }}
                      />
                      <Legend iconType="circle" />
                      <ReferenceLine x={0} yAxisId="left" stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Filing Day', fill: '#ef4444', fontSize: 12 }} />
                      <Line yAxisId="left" type="monotone" dataKey="volatility" stroke="#A8672E" strokeWidth={3} dot={{ r: 4, fill: '#A8672E', strokeWidth: 0 }} activeDot={{ r: 6 }} name="Volatility Index" />
                      <Line yAxisId="right" type="stepAfter" dataKey="volume" stroke="#94a3b8" strokeWidth={2} dot={false} name="Trading Volume" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-8 min-w-0">
                <div className="prose prose-lg text-slate-600 dark:text-slate-400 max-w-none">
                  <p>
                    The convergence of mandated 45-day disclosure deadlines and High-Frequency Trading (HFT) has
                    fundamentally altered market microstructure.
                  </p>
                  <p>
                    Algorithms consume the SEC's XML data instantaneously. Parsing libraries extract CUSIPs,
                    share counts, and values in milliseconds. This creates <strong>latency arbitrage</strong>&mdash;algorithms
                    trade on material changes before human analysts can read the filing.
                  </p>
                  <p>
                    While HFT aids price discovery normally, during "crowded trades", it amplifies volatility.
                    Sudden algorithmic accumulation causes rapid order cancellations and directional price spikes.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InsightPill label="Abnormal Return (T+1)" value="+2.0%" trend="up" />
                  <InsightPill label="HFT Parse Time" value="70 ms" trend="neutral" />
                </div>
              </div>
            </div>
          </section>

          {/* Copycatting Section */}
          <section id="copycatting" className="py-16 border-t border-slate-200 dark:border-slate-800 scroll-mt-12">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                  <Search className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">The Economics of Institutional Copycatting</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">Piggybacking on alpha and the drag it creates on originating funds.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="col-span-1 lg:col-span-1 space-y-8 min-w-0">
                <p className="text-slate-600 dark:text-slate-400 prose prose-lg">
                  Active managers monitor peers. Digital footprint analysis on EDGAR servers proves that viewing a
                  competitor's 13F increases the likelihood of replicating their trades by 50%.
                </p>
                <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-3xl p-6 min-w-0">
                  <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-3 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5" />
                    The Originator's Tax
                  </h4>
                  <p className="text-sm text-rose-800 dark:text-rose-200/80 leading-relaxed">
                    Mandatory disclosure forces funds to reveal trade secrets. Human copycats induce an average annual
                    performance loss of <strong>2.56% to 2.7%</strong> on the disclosing fund, primarily during
                    incomplete "first-buy" accumulations.
                  </p>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-2 min-w-0">
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 h-full min-w-0">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 font-serif">Annualized Alpha by Copycat Strategy</h3>
                  <div className="h-64 w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={copycatPerformanceData} layout="vertical" margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                        <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} unit="%" />
                        <YAxis dataKey="strategy" type="category" width={140} tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
                        <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="returns" name="Excess Returns (%)" radius={[0, 4, 4, 0]}>
                          {copycatPerformanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Strategic Evasion Section */}
          <section id="evasion" className="py-16 border-t border-slate-200 dark:border-slate-800 scroll-mt-12">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#14171B] to-[#2A2F36] dark:from-[#D08F52] dark:to-[#A8672E] text-white shadow-lg">
                  <EyeOff className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white tracking-tight">Strategic Evasion &amp; Q2 2026 Examples</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">How managers hide trades and what to watch for in the upcoming filings.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="space-y-6 min-w-0">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Confidential Treatment &amp; Restatements</h3>
                <div className="prose prose-lg text-slate-600 dark:text-slate-400 max-w-none">
                  <p>
                    To combat front-running, managers utilize Confidential Treatment Requests (CTRs) to hide ongoing
                    accumulations for up to a year. Alternatively, they may use strategic restatements (amending
                    intentionally misreported initial filings) once a position is secure.
                  </p>
                </div>
                <div className="flex items-start gap-4 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300 p-6 rounded-2xl border border-amber-200 dark:border-amber-900/50 min-w-0">
                  <Info className="w-6 h-6 shrink-0 mt-1" />
                  <p className="text-sm leading-relaxed">
                    <strong>Did you know?</strong> Prompt 13F restatements correcting "errors" generate an
                    annualized equivalent alpha of <strong>9.13%</strong>, proving they deliberately withheld valuable data.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden min-w-0 flex flex-col">
                <div className="bg-[#A8672E] dark:bg-[#D08F52] p-6 text-white shrink-0">
                  <h4 className="font-bold text-lg font-serif">
                    Case Study: Berkshire Hathaway vs. Chubb (CB)
                  </h4>
                  <p className="text-[#A8672E]/10 dark:text-[#D08F52]/10 mt-1 text-white/80">A textbook execution of CTR and subsequent market impact.</p>
                </div>
                <div className="overflow-x-auto flex-1 min-w-0">
                  <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="px-6 py-4">Quarter</th>
                        <th className="px-6 py-4">Shares (M)</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                      {berkshireChubbData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/20">
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-300">{row.quarter}</td>
                          <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{row.shares || '—'}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              row.status.includes('Confidential') ? 'bg-slate-100 text-slate-600 dark:text-slate-400 dark:bg-slate-800 dark:text-slate-400' :
                              row.status.includes('Reveal') ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' :
                              row.status.includes('Aggressive') ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' :
                              'bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] dark:bg-indigo-900/40 dark:text-indigo-300'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 shrink-0">
                  <strong>Q2 2026 Watch:</strong> Will mid-August filings show Berkshire resuming accumulation after
                  Q1's pause, or pivoting? Watch for shifts in their massive $348B cash pile.
                </div>
              </div>
            </div>

            {/* Systemic Risks */}
            <div className="bg-[#14171B] dark:bg-[#05070A] rounded-3xl p-10 md:p-12 text-white relative overflow-hidden shadow-2xl min-w-0">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <FileText className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-8 font-serif tracking-tight">Systemic Risks &amp; Form SHO Integration (Late 2026)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="font-bold text-[#A8672E] dark:text-[#D08F52] mb-4 flex items-center gap-2 text-lg">
                      <span className="w-2 h-2 rounded-full bg-[#A8672E] dark:bg-[#D08F52]"></span>
                      The Options Blindspot
                    </h4>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      13Fs require notional value disclosure but hide strike prices, expirations, and leverage. The
                      recent unwinding of massive undisclosed put-option exposure by technology hedge funds highlighted
                      how this opacity prevents risk managers from distinguishing between prudent hedges and dangerous,
                      leveraged directional bets.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#D08F52] dark:text-[#A8672E] mb-4 flex items-center gap-2 text-lg">
                      <span className="w-2 h-2 rounded-full bg-[#D08F52] dark:bg-[#A8672E]"></span>
                      Form SHO Implementation
                    </h4>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      With the SEC's Rule 13f-2 (Form SHO) compliance taking effect in early 2026, the Q2 2026
                      reporting cycle will be among the first where algorithms synthesize 13F (Longs) with Form SHO
                      (Shorts). This creates a "Net Arbitrage Trading" metric, significantly increasing
                      parsing complexity and potential volatility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ArticleFrame>
  );
}
