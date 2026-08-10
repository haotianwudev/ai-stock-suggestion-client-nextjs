'use client';

import { TrendingUp, TrendingDown, AlertTriangle, Globe, Activity, Clock, Briefcase, Layers, RefreshCw } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

export default function GreyRhinoArticle() {
  const AnalysisCard = ({ title, icon: Icon, children, type = "neutral", className = "" }: any) => {
    const typeStyles: Record<string, string> = {
      neutral: "bg-white dark:bg-[#0A0D14] border-slate-100 dark:border-slate-800 shadow-sm",
      risk: "bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border-rose-100 shadow-sm",
      opportunity: "bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 border-emerald-100 shadow-sm",
      highlight: "bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border-indigo-100 shadow-sm",
      dark: "bg-slate-900 text-white border-slate-800 shadow-xl"
    };

    return (
      <div className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-md ${typeStyles[type] || typeStyles.neutral} ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-xl ${type === 'dark' ? 'bg-[#A8672E] dark:bg-[#D08F52]/20 text-indigo-300' : type === 'risk' ? 'bg-rose-200 text-[#BC4128] dark:text-[#E2694A]' : type === 'opportunity' ? 'bg-emerald-200 text-[#1D8A70] dark:text-[#3CBF9C]' : 'bg-indigo-100 text-[#A8672E] dark:text-[#D08F52]'}`}>
            {Icon && <Icon size={20} />}
          </div>
          <h3 className={`font-bold text-lg ${type === 'dark' ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>{title || ''}</h3>
        </div>
        <div className={`${type === 'dark' ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'} leading-relaxed space-y-2`}>
          {children}
        </div>
      </div>
    );
  };

  const Statistic = ({ label, value, subtext, trend, trendLabel }: any) => (
    <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full hover:border-indigo-200 transition-colors group">
      <div className="flex justify-between items-start">
        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</span>
        <div className={`p-1.5 rounded-full ${trend === 'up' ? 'bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 text-[#1D8A70] dark:text-[#3CBF9C]' : 'bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A]'}`}>
          {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        </div>
      </div>
      <div className="mt-3">
        <span className="text-3xl font-bold text-slate-800 dark:text-slate-200 tracking-tight group-hover:text-[#A8672E] dark:text-[#D08F52] transition-colors">{value}</span>
        <p className="text-xs text-slate-500 mt-1">{subtext}</p>
      </div>
      <div className={`mt-4 pt-4 border-t border-slate-50 flex items-center text-sm font-medium ${trend === 'up' ? 'text-[#1D8A70] dark:text-[#3CBF9C]' : 'text-[#BC4128] dark:text-[#E2694A]'}`}>
        {trendLabel}
      </div>
    </div>
  );

  const MechanismStep = ({ number, title, desc }: any) => (
    <div className="relative pl-8 pb-8 border-l-2 border-indigo-100 last:border-0 last:pb-0">
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#A8672E] dark:bg-[#D08F52] border-4 border-white shadow-sm"></div>
      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">Step {number}: {title}</h4>
      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{desc}</p>
    </div>
  );

  return (
    <ArticleFrame
      slug="grey-rhino-monetary-divergence-yen-carry-trade-unwind"
      additionalDisclaimer="Rates, spreads, and price levels shown are simulated for illustrative purposes based on the Bessent Hypothesis research framework, not live market data."
    >
      <div className="max-w-7xl mx-auto px-6 text-slate-800 dark:text-slate-200">
        <InfographicSlot alt="Grey Rhino Monetary Divergence Infographic" />

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Statistic
            label="BoJ Policy Rate"
            value="0.50%"
            subtext="Target: +0.75% by Q3"
            trend="up"
            trendLabel="Tightening (+25bps)"
          />
          <Statistic
            label="US Fed Funds"
            value="4.25%"
            subtext="Target: 3.75% by Q4"
            trend="down"
            trendLabel="Easing (-50bps)"
          />
          <Statistic
            label="USD/JPY Pair"
            value="138.50"
            subtext="Critical support broken"
            trend="down"
            trendLabel="-4.2% YTD"
          />
          <Statistic
            label="10Y Yield Spread"
            value="3.15%"
            subtext="US 10Y minus JP 10Y"
            trend="down"
            trendLabel="Compressing Fast"
          />
        </div>

        {/* Core Analysis Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* The Bessent Hypothesis */}
            <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 flex items-center text-indigo-900 font-serif">
                  <Globe className="mr-3 text-[#A8672E] dark:text-[#D08F52]" />
                  The Bessent Hypothesis: A Structural Shift
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 dark:text-slate-400 mb-8">
                  <p className="text-lg leading-relaxed">
                    The hypothesis suggests we are entering a <strong>&quot;Great Rebalancing.&quot;</strong> For decades, Japan acted as the world&apos;s creditor, exporting excess savings to the US. Now, faced with domestic inflation and a need to defend the Yen, Japan is repatriating capital.
                  </p>
                  <p className="mt-4">
                    Simultaneously, the US is forced to ease to manage its debt burden. This <strong>dual-action</strong> (Japan Hiking + US Cutting) creates a pincer movement on global liquidity that markets have not priced in.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50 p-6 rounded-2xl border border-indigo-100">
                    <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                      <TrendingUp size={18}/> Why Japan Hikes Now
                    </h4>
                    <ul className="space-y-2 text-sm text-indigo-900/80">
                      <li className="flex gap-2">
                        <span className="text-[#A8672E] dark:text-[#D08F52]">•</span>
                        <strong>Core Inflation:</strong> Stickily above 2% target.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#A8672E] dark:text-[#D08F52]">•</span>
                        <strong>Wage Growth:</strong> &quot;Shunto&quot; negotiations yielded highest hikes in 30 years.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#A8672E] dark:text-[#D08F52]">•</span>
                        <strong>Import Costs:</strong> Weak Yen is crushing energy-dependent households.
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10/50 p-6 rounded-2xl border border-rose-100">
                    <h4 className="font-bold text-rose-900 mb-3 flex items-center gap-2">
                      <TrendingDown size={18}/> Why US Eases Now
                    </h4>
                    <ul className="space-y-2 text-sm text-rose-900/80">
                      <li className="flex gap-2">
                        <span className="text-[#BC4128] dark:text-[#E2694A]">•</span>
                        <strong>Lag Effects:</strong> 2023 hikes are now hitting the labor market.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#BC4128] dark:text-[#E2694A]">•</span>
                        <strong>Debt Service:</strong> Interest on debt exceeds defense spending.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#BC4128] dark:text-[#E2694A]">•</span>
                        <strong>CRE Crisis:</strong> Regional banks need steeper yield curves to survive.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* The Doom Loop Mechanism */}
            <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2 font-serif">
                <RefreshCw className="text-[#A8672E] dark:text-[#D08F52]" />
                The Anatomy of the Unwind (The &quot;Doom Loop&quot;)
              </h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <MechanismStep
                    number="1"
                    title="Spread Compresses"
                    desc="BoJ hikes rates while Fed cuts, shrinking the profit margin for holding US assets."
                  />
                  <MechanismStep
                    number="2"
                    title="Yen Strengthens"
                    desc="As the spread narrows, traders buy Yen, pushing USD/JPY down from 150 to 135."
                  />
                  <MechanismStep
                    number="3"
                    title="Margin Calls"
                    desc="Investors who borrowed Yen to buy US Tech are now 'underwater' on the currency."
                  />
                  <MechanismStep
                    number="4"
                    title="Forced Selling"
                    desc="To cover margin, they must sell the US asset (Tech Stocks/Treasuries) to buy back Yen."
                  />
                  <MechanismStep
                    number="5"
                    title="Feedback Loop"
                    desc="Selling US assets lowers prices; buying Yen raises Yen value. The cycle accelerates."
                  />
                </div>

                <div className="bg-slate-50 dark:bg-[#14171B] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
                  <div className="w-full mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase">Liquidity Gauge</span>
                    <div className="w-full h-4 bg-slate-200 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-rose-500 w-[85%]"></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>Abundant</span>
                      <span className="text-[#BC4128] dark:text-[#E2694A] font-bold">Constrained</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 italic">
                    &quot;When the tide goes out, we discover who has been swimming naked.&quot;
                  </p>
                  <div className="mt-6 flex gap-4">
                    <div className="text-center">
                      <div className="font-bold text-[#BC4128] dark:text-[#E2694A] text-lg">-15%</div>
                      <div className="text-xs text-slate-400">Nasdaq Potential</div>
                    </div>
                    <div className="w-px bg-slate-200 h-10"></div>
                    <div className="text-center">
                      <div className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] text-lg">+12%</div>
                      <div className="text-xs text-slate-400">Yen Potential</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) - Risks & Sectors */}
          <div className="lg:col-span-4 space-y-6">
            {/* Dark Mode Card: The Grey Rhino */}
            <AnalysisCard title="The Grey Rhino" icon={AlertTriangle} type="dark">
              <p className="text-sm mb-4 opacity-80">
                A &quot;Grey Rhino&quot; is a highly probable, high impact yet neglected threat. Unlike a &quot;Black Swan&quot; (unpredictable), this is charging right at us.
              </p>
              <div className="space-y-3">
                <div className="bg-white dark:bg-[#0A0D14]/5 p-3 rounded-lg border border-white/10 flex justify-between items-center">
                  <span className="text-sm">Probability</span>
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#BC4128] dark:bg-[#E2694A]"></div>)}
                    <div className="w-2 h-2 rounded-full bg-[#BC4128] dark:bg-[#E2694A]/30"></div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#0A0D14]/5 p-3 rounded-lg border border-white/10 flex justify-between items-center">
                  <span className="text-sm">Impact Severity</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#BC4128] dark:bg-[#E2694A]"></div>)}
                  </div>
                </div>
              </div>
            </AnalysisCard>

            {/* Sector Watchlist */}
            <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 font-serif">
                <Briefcase size={18} className="text-[#A8672E] dark:text-[#D08F52]"/>
                Sector Watchlist
              </h3>
              <div className="space-y-4">
                {/* Losers */}
                <div>
                  <h4 className="text-xs font-bold text-[#BC4128] dark:text-[#E2694A] uppercase mb-2">High Risk (Sell/Avoid)</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 rounded-lg border border-rose-100">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">US Big Tech</span>
                      <TrendingDown size={14} className="text-[#BC4128] dark:text-[#E2694A]"/>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 rounded-lg border border-rose-100">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Japanese Exporters</span>
                      <TrendingDown size={14} className="text-[#BC4128] dark:text-[#E2694A]"/>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 rounded-lg border border-rose-100">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Crypto Assets</span>
                      <TrendingDown size={14} className="text-[#BC4128] dark:text-[#E2694A]"/>
                    </div>
                  </div>
                </div>

                {/* Winners */}
                <div>
                  <h4 className="text-xs font-bold text-[#1D8A70] dark:text-[#3CBF9C] uppercase mb-2">Potential Alpha (Buy)</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-lg border border-emerald-100">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Japanese Banks</span>
                      <TrendingUp size={14} className="text-[#1D8A70] dark:text-[#3CBF9C]"/>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-lg border border-emerald-100">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">US Utilities</span>
                      <TrendingUp size={14} className="text-[#1D8A70] dark:text-[#3CBF9C]"/>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-lg border border-emerald-100">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Gold</span>
                      <TrendingUp size={14} className="text-[#1D8A70] dark:text-[#3CBF9C]"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="bg-[#A8672E] dark:bg-[#D08F52] p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-[#A8672E] dark:text-[#D08F52] opacity-20">
                <Activity size={120} />
              </div>
              <p className="text-lg font-serif italic mb-4 relative z-10">
                &quot;The anomaly of negative Japanese rates subsidized global risk taking for a decade. That window is now closing.&quot;
              </p>
              <div className="flex items-center gap-2 text-indigo-200 text-sm font-medium">
                <span className="w-8 h-px bg-indigo-300"></span>
                Market Consensus Note
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Timeline & Glossary */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2 font-serif">
              <Clock size={18} className="text-[#A8672E] dark:text-[#D08F52]"/>
              Divergence Timeline
            </h3>
            <div className="space-y-6 relative pl-2">
              <div className="absolute left-[9px] top-2 bottom-2 w-px bg-slate-100"></div>
              {[
                { year: '2022-2023', title: 'Maximum Divergence', desc: 'Fed hikes aggressively to 5.25%; BoJ maintains YCC (-0.1%). Yen crashes to 151.' },
                { year: 'Early 2024', title: 'The Pivot Begins', desc: 'BoJ ends negative rates. Fed signals "higher for longer" ends.' },
                { year: 'Late 2025 (Now)', title: 'The Grey Rhino Hits', desc: 'BoJ hikes to 0.50%+. Fed prepares cuts. Spread compression accelerates.' },
                { year: '2026 Forecast', title: 'Normalization', desc: 'Yen stabilizes ~120. Global liquidity resets at higher cost base.' }
              ].map((item, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-white dark:bg-[#0A0D14] border-4 border-indigo-200"></div>
                  <span className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52] px-2 py-1 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded mb-1 inline-block">{item.year}</span>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2 font-serif">
              <Layers size={18} className="text-[#A8672E] dark:text-[#D08F52]"/>
              Key Terminology
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { term: 'Yield Curve Control (YCC)', def: 'BoJ policy of pinning 10-year bond yields at 0% by printing unlimited money.' },
                { term: 'Carry Trade', def: 'Borrowing in a low-interest currency (Yen) to invest in a high-return currency (USD).' },
                { term: 'Grey Rhino', def: 'A highly probable, high-impact threat that is often ignored or neglected.' },
                { term: 'Quantitative Easing (QE)', def: 'Central bank purchasing securities to lower interest rates and increase money supply.' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-[#14171B] hover:bg-[#A8672E]/10 dark:bg-[#D08F52]/10 transition-colors rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-100 cursor-default">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">{item.term}</span>
                  <span className="text-sm text-slate-500 leading-snug">{item.def}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ArticleFrame>
  );
}
