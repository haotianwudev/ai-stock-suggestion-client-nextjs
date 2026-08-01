'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  ShieldAlert, 
  EyeOff, 
  Search, 
  Info,
  ChevronRight, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock,
  Maximize2,
  Music
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
  Cell
} from 'recharts';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const currentArticle = articles.find(article => article.slug === 'hidden-mechanics-form-13f-disclosures-microstructure-copycat-economics-systemic-risk');

// Data arrays
const volatilityData = [
  { day: -5, volatility: 1.2, volume: 450000 },
  { day: -4, volatility: 1.3, volume: 470000 },
  { day: -3, volatility: 1.1, volume: 430000 },
  { day: -2, volatility: 1.4, volume: 490000 },
  { day: -1, volatility: 1.5, volume: 510000 },
  { day: 0, volatility: 3.8, volume: 1200000 }, // Filing Day (T=0)
  { day: 1, volatility: 4.2, volume: 1400000 },
  { day: 2, volatility: 2.5, volume: 850000 },
  { day: 3, volatility: 1.9, volume: 600000 },
  { day: 4, volatility: 1.6, volume: 550000 },
  { day: 5, volatility: 1.4, volume: 480000 },
];

const copycatPerformanceData = [
  { strategy: "Pure Consensus", returns: 4.2, risk: 2.8, color: "#3b82f6" },
  { strategy: "Pure Conviction", returns: 5.1, risk: 3.5, color: "#8b5cf6" },
  { strategy: "Conviction + Consensus", returns: 6.3, risk: 3.1, color: "#10b981" },
  { strategy: "Smart Copycat (Algorithm)", returns: 8.5, risk: 3.9, color: "#f59e0b" },
];

const berkshireChubbData = [
  { quarter: "Q3 '23", shares: 0, status: "Confidential Accumulation" },
  { quarter: "Q4 '23", shares: 0, status: "Confidential Accumulation" },
  { quarter: "Q1 '24", shares: 25.9, status: "13F-HR/A Reveal" },
  { quarter: "Q2 '24", shares: 27.0, status: "Continued Buying" },
  { quarter: "Q3 '25", shares: 31.3, status: "Aggressive Buy" },
  { quarter: "Q4 '25", shares: 34.2, status: "Position Sizing" },
  { quarter: "Q1 '26", shares: 34.2, status: "Pause Accumulation" },
];

interface InsightPillProps {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
}

const InsightPill = ({ label, value, trend = "neutral" }: InsightPillProps) => {
  const colors = {
    up: "text-emerald-700 bg-emerald-50 border-emerald-200",
    down: "text-rose-700 bg-rose-50 border-rose-200",
    neutral: "text-slate-700 bg-slate-50 border-slate-200"
  };
  
  const Icon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Clock;

  return (
    <div className={`flex flex-col p-3 rounded-lg border ${colors[trend]} transition-all`}>
      <span className="text-xs font-semibold uppercase tracking-wider opacity-75 mb-1">{label}</span>
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span className="text-lg font-bold">{value}</span>
      </div>
    </div>
  );
};

export default function Form13FMicrostructureArticle() {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

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

      <div className="min-h-screen bg-slate-50">
        
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-white relative overflow-hidden border-b border-slate-100">
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-block bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              Deep Research
            </span>
          </div>
          
          <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
              The Hidden Mechanics of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Form 13F</span> Disclosures
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
              Understand the microstructural impact of quarterly institutional holdings. Explore algorithmic parsing, the economics of copycat investing, and the systemic risks embedded in delayed transparency.
            </p>
          </div>
        </div>

        {/* Hero Infographic */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/XRlmzzc.jpeg" 
              alt="Form 13F Microstructure Infographic" 
              className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
            />
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
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
              <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                Click to view full screen
              </div>
            </div>
          </div>
        </section>

        {/* Full-screen image viewer */}
        <FullScreenImageViewer
          src="https://i.imgur.com/XRlmzzc.jpeg"
          alt="Form 13F Microstructure Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          
          {/* Intro Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 lg:col-span-2 space-y-4">
              <p className="text-lg text-slate-600 leading-relaxed">
                The convergence of mandated 45-day disclosure deadlines and High-Frequency Trading (HFT) has fundamentally altered market microstructure. Form 13F filings, required for institutional managers with over $100M in qualifying assets, create predictable information asymmetries that sophisticated algorithms exploit within milliseconds.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                This article dissects the microstructural mechanics of 13F disclosures—from algorithmic XML parsing in ~70ms to the systemic risks of Form SHO integration arriving in late 2026.
              </p>
            </div>
            
            <div className="col-span-1">
              <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl rounded-xl">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  TL;DR Key Findings
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-indigo-400 shrink-0" />
                    <span>HFT algorithms parse 13F XMLs in <strong>~70ms</strong>, creating microsecond volatility spikes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-indigo-400 shrink-0" />
                    <span>Smart copycat strategies generate <strong>5.5% to 6.7%</strong> annual excess returns.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-indigo-400 shrink-0" />
                    <span>Disclosing funds suffer a <strong>~2.6%</strong> annual performance drag due to predatory front-running.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Volatility Section */}
          <section id="volatility" className="scroll-mt-12">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Market Volatility Around Filing Dates</h2>
              </div>
              <p className="text-slate-500 ml-11">How algorithmic parsing and human copycats drive short-term price action.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center justify-between">
                  <span>Intraday Volatility &amp; Volume Spike (T=0)</span>
                  <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded">Hypothetical Aggregate</span>
                </h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={volatilityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend iconType="circle" />
                      <ReferenceLine x={0} yAxisId="left" stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Filing Day', fill: '#ef4444', fontSize: 12 }} />
                      <Line yAxisId="left" type="monotone" dataKey="volatility" stroke="#6366f1" strokeWidth={3} dot={{r: 4, fill: '#6366f1', strokeWidth: 0}} activeDot={{r: 6}} name="Volatility Index" />
                      <Line yAxisId="right" type="stepAfter" dataKey="volume" stroke="#cbd5e1" strokeWidth={2} dot={false} name="Trading Volume" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-6">
                <div className="prose prose-slate max-w-none text-slate-600">
                  <p>
                    The convergence of mandated 45-day disclosure deadlines and High-Frequency Trading (HFT) has fundamentally altered market microstructure.
                  </p>
                  <p>
                    Algorithms consume the SEC&apos;s XML data instantaneously. Parsing libraries extract CUSIPs, share counts, and values in milliseconds. This creates <strong>latency arbitrage</strong>—algorithms trade on material changes before human analysts can read the filing.
                  </p>
                  <p>
                    While HFT aids price discovery normally, during &ldquo;crowded trades&rdquo;, it amplifies volatility. Sudden algorithmic accumulation causes rapid order cancellations and directional price spikes.
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
          <section id="copycatting" className="scroll-mt-12">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Search className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">The Economics of Institutional Copycatting</h2>
              </div>
              <p className="text-slate-500 ml-11">Piggybacking on alpha and the drag it creates on originating funds.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-1 lg:col-span-1 space-y-6">
                <p className="text-slate-600">
                  Active managers monitor peers. Digital footprint analysis on EDGAR servers proves that viewing a competitor&apos;s 13F increases the likelihood of replicating their trades by 50%.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5" />
                    The Originator&apos;s Tax
                  </h4>
                  <p className="text-sm text-amber-800">
                    Mandatory disclosure forces funds to reveal trade secrets. Human copycats induce an average annual performance loss of <strong>2.56% to 2.7%</strong> on the disclosing fund, primarily during incomplete &ldquo;first-buy&rdquo; accumulations.
                  </p>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold mb-6">Annualized Alpha by Copycat Strategy</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={copycatPerformanceData} layout="vertical" margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                        <XAxis type="number" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} unit="%" />
                        <YAxis dataKey="strategy" type="category" width={140} tick={{fill: '#475569', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} />
                        <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
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
          <section id="forecast" className="scroll-mt-12">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <EyeOff className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Strategic Evasion &amp; Q2 2026 Examples</h2>
              </div>
              <p className="text-slate-500 ml-11">How managers hide trades and what to watch for in the upcoming filings.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">Confidential Treatment &amp; Restatements</h3>
                <p className="text-slate-600">
                  To combat front-running, managers utilize Confidential Treatment Requests (CTRs) to hide ongoing accumulations for up to a year. 
                  Alternatively, they may use strategic restatements (amending intentionally misreported initial filings) once a position is secure.
                </p>
                <div className="flex items-center gap-3 bg-indigo-50 text-indigo-900 p-4 rounded-lg border border-indigo-100">
                  <Info className="w-6 h-6 shrink-0" />
                  <p className="text-sm">
                    <strong>Did you know?</strong> Prompt 13F restatements correcting &ldquo;errors&rdquo; generate an annualized equivalent alpha of <strong>9.13%</strong>, proving they deliberately withheld valuable data.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-indigo-200 shadow-indigo-100/50 overflow-hidden">
                <div className="bg-indigo-600 p-4 text-white">
                  <h4 className="font-bold flex items-center gap-2">
                    Case Study: Berkshire Hathaway vs. Chubb (CB)
                  </h4>
                  <p className="text-indigo-100 text-sm mt-1">A textbook execution of CTR and subsequent market impact.</p>
                </div>
                <div className="p-0">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3">Quarter</th>
                        <th className="px-4 py-3">Shares (M)</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {berkshireChubbData.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-900">{row.quarter}</td>
                          <td className="px-4 py-3 text-slate-600">{row.shares || '—'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              row.status.includes('Confidential') ? 'bg-slate-100 text-slate-600' :
                              row.status.includes('Reveal') ? 'bg-amber-100 text-amber-800' :
                              row.status.includes('Aggressive') ? 'bg-emerald-100 text-emerald-800' :
                              'bg-indigo-50 text-indigo-700'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-slate-50 p-4 border-t border-slate-200 text-sm text-slate-700">
                  <strong>Q2 2026 Watch:</strong> Will mid-August filings show Berkshire resuming accumulation after Q1&apos;s pause, or pivoting? Watch for shifts in their massive $348B cash pile.
                </div>
              </div>
            </div>

            {/* Systemic Risks */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <FileText className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Systemic Risks &amp; Form SHO Integration (Late 2026)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-indigo-300 mb-2">The Options Blindspot</h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      13Fs require notional value disclosure but hide strike prices, expirations, and leverage. The recent unwinding of massive undisclosed put-option exposure by technology hedge funds highlighted how this opacity prevents risk managers from distinguishing between prudent hedges and dangerous, leveraged directional bets.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-300 mb-2">Form SHO Implementation</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      With the SEC&apos;s Rule 13f-2 (Form SHO) compliance taking effect in early 2026, the Q2 2026 reporting cycle will be among the first where algorithms synthesize 13F (Longs) with Form SHO (Shorts). This creates a &ldquo;Net Arbitrage Trading&rdquo; metric, significantly increasing parsing complexity and potential volatility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl my-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentArticle?.googleDoc && (
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <FileText className="inline mr-2" />
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

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white mt-12 py-8 text-center text-slate-500 text-sm">
          <p>© 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.</p>
          <p className="mt-2">This is an educational dashboard visualizing the microstructural impacts of 13F filings.</p>
          <p className="mt-2">Based on academic research regarding algorithmic trading, copycat economics, and market microstructure.</p>
        </footer>

      </div>
    </>
  );
}
