'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { 
  TrendingDown, 
  Globe, 
  Rocket, 
  Brain, 
  Coins, 
  ShieldAlert, 
  Activity, 
  BarChart3, 
  Info,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line
} from 'recharts';

const fedDotPlotData = [
  { year: 'End of 2026', march: 0, june: 3.80 },
  { year: 'End of 2027', march: 3.30, june: 3.60 },
  { year: 'End of 2028', march: 3.00, june: 3.40 },
  { year: 'Longer-run', march: 2.50, june: 3.10 },
];

const bitcoinLiquidationData = [
  { time: 'June 3 (Pre-crash)', price: 67000 },
  { time: 'June 4 (Drop)', price: 63000 },
  { time: 'June 5 (Cascade)', price: 59100 },
];

const SectionHeading = ({ icon: Icon, title, gradient }: { icon: React.ElementType; title: string; gradient: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg text-white`}>
      <Icon size={32} />
    </div>
    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
  </div>
);

const CalloutBox = ({ title, children, color }: { title?: string; children: React.ReactNode; color: string }) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    rose: "bg-rose-50 border-rose-200 text-rose-900",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
    purple: "bg-purple-50 border-purple-200 text-purple-900"
  };

  return (
    <div className={`mt-6 p-6 rounded-2xl border ${colorMap[color]} shadow-sm`}>
      {title && <h4 className="font-bold text-lg mb-3 flex items-center gap-2"><Info size={20} /> {title}</h4>}
      <div className="space-y-3 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default function ArticlePage() {
  return (
    <ArticleFrame slug="june-2026-cross-asset-contagion">
      <div className="space-y-24">
        {/* Executive Overview */}
        <section className="bg-white p-10 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full opacity-50"></div>
           <SectionHeading icon={Activity} title="Executive Overview" gradient="from-amber-400 to-orange-500" />
           
           <div className="prose prose-lg prose-slate max-w-none">
              <p className="text-xl font-medium text-slate-800 mb-6">
                In June 2026, global financial markets underwent a violent and highly synchronized deleveraging event that indiscriminately targeted historically uncorrelated asset classes. 
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                  <div className="font-bold text-amber-900 text-lg mb-2">Gold</div>
                  <p className="text-amber-800 text-sm">Plunged below the $4,000 threshold, entering a bear market down over 25% from its peak.</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                  <div className="font-bold text-orange-900 text-lg mb-2">Bitcoin</div>
                  <p className="text-orange-800 text-sm">Collapsed from $67,000 to $59,100 within 48 hours, erasing tens of billions in capital.</p>
                </div>
                <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
                  <div className="font-bold text-rose-900 text-lg mb-2">Treasury Bonds</div>
                  <p className="text-rose-800 text-sm">Yield on the U.S. 10-year Treasury note spiked to 4.54% amid intense selling pressure.</p>
                </div>
              </div>
              <p>
                To the untrained observer, the simultaneous collapse of a traditional safe-haven commodity, a highly speculative digital asset, and foundational fixed-income instruments appeared contradictory. However, a rigorous structural analysis reveals that this cross-asset liquidation was the result of a precise convergence of macroeconomic shocks and market microstructure vulnerabilities.
              </p>
           </div>
        </section>

        {/* The Macroeconomic Crucible */}
        <section>
          <SectionHeading icon={Globe} title="The Macroeconomic Crucible" gradient="from-blue-500 to-cyan-400" />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="prose prose-lg prose-slate">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><Activity size={24} className="text-blue-500"/> Fed&apos;s Hawkish Paradigm Shift</h3>
              <p>
                The June 2026 Federal Open Market Committee (FOMC) meeting marked a stark paradigm shift for U.S. monetary policy. Chair Kevin Warsh implemented a drastic departure from the communication strategies of his predecessors. 
              </p>
              <p>
                While the FOMC unanimously voted to hold the federal funds rate steady at 3.50% to 3.75%, the true market shock was delivered via the central bank&apos;s forward guidance. The updated Summary of Economic Projections (SEP) revealed a distinctly hawkish shift.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 h-80">
              <h4 className="text-center font-bold text-slate-700 mb-4 text-sm uppercase tracking-wider">Federal Reserve SEP Dot Plot (Median Expectations)</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fedDotPlotData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/>
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} unit="%" />
                  <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                  <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}}/>
                  <Bar dataKey="march" name="March Projection" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="june" name="June Projection" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <CalloutBox title="The Geopolitical Resolution" color="blue">
            <p>
              Compounding the monetary policy shock was a sudden and dramatic shift in global geopolitics. On June 17, 2026, a diplomatic breakthrough was achieved. The U.S. and Iran electronically signed a 14-point interim Memorandum of Understanding (MoU).
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Immediate Ceasefire:</strong> Permanent halt to military operations.</li>
              <li><strong>Strait of Hormuz Reopening:</strong> Immediate toll-free reopening for 60 days.</li>
              <li><strong>Sanctions Waiver:</strong> 60-day U.S. Treasury waiver for Iranian crude oil.</li>
            </ul>
            <p className="mt-2 text-sm italic">
              Result: Brent crude oil plummeted, and the geopolitical risk premium that artificially inflated gold and energy evaporated entirely.
            </p>
          </CalloutBox>
        </section>

        {/* Infographic at sensible point */}
        <InfographicSlot alt="The June 2026 Cross-Asset Contagion Infographic" />

        {/* The Catalyst of Equities */}
        <section>
          <SectionHeading icon={Rocket} title="The Catalyst of Equities" gradient="from-purple-500 to-pink-500" />
          <div className="prose prose-lg prose-slate max-w-none">
            <p>
              While macroeconomic forces altered risk pricing, the immediate trigger for the synchronized cross-asset liquidation originated in equity markets. A convergence of extreme capital concentration, a historic liquidity vacuum, and failing AI momentum engineered a structural shock.
            </p>

            <div className="my-10 p-8 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold flex items-center gap-3 mb-4 text-pink-300">
                <Zap className="text-pink-400" /> The SpaceX IPO Megashock
              </h3>
              <p className="text-slate-300 mb-4">
                On June 12, 2026, SpaceX debuted on the Nasdaq (SPCX). The offering achieved an implied valuation of $1.77 trillion, with strong demand pushing the company&apos;s market capitalization to an unprecedented $2.1 trillion.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 mt-6">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <strong className="block text-pink-300 mb-1">Retail Liquidity Drain</strong>
                  <span className="text-sm text-slate-300">Absorbed ~$15 billion in retail capital in a single session, starving cryptocurrencies and high-beta assets of marginal liquidity.</span>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <strong className="block text-pink-300 mb-1">Forced Passive Selling</strong>
                  <span className="text-sm text-slate-300">Nasdaq&apos;s &quot;Fast Entry&quot; rule forced passive index funds to indiscriminately sell existing technology constituents to fund mandatory SPCX allocations.</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">The AI Capex Bubble & Semiconductor Capitulation</h3>
            <p>
              The liquidity drain orchestrated by the SpaceX IPO coincided disastrously with a fundamental reality check. Broadcom issued revenue guidance missing Wall Street estimates by a staggering $1.2 billion.
            </p>
            <p>
              Investors suddenly recognized a terrifying asymmetry: while hundreds of billions were deployed into physical silicon, downstream software revenue was severely lagging. A brutal rotation out of momentum technology stocks ensued, with the Philadelphia Semiconductor Index (SOX) plummeting 10.3% in a single session.
            </p>
          </div>
        </section>

        {/* The Microstructure Breakdown */}
        <section>
          <SectionHeading icon={Brain} title="The Microstructure Breakdown" gradient="from-indigo-500 to-violet-500" />
          
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingDown className="text-indigo-500"/> Quant Winter & CTAs
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              To comprehend why gold, Bitcoin, and commodities collapsed simultaneously with tech equities, one must examine the opaque plumbing of modern financial markets: <strong>systematic, algorithmically driven quantitative funds.</strong>
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-indigo-50 p-6 rounded-2xl">
                <h4 className="font-bold text-indigo-900 mb-2">1. The Volatility Trigger</h4>
                <p className="text-sm text-indigo-800">The 10.3% drop in semiconductors caused the VIX to surge abruptly. This volatility shock acted as a mechanical trigger across the quantitative landscape.</p>
              </div>
              <div className="flex-1 bg-indigo-50 p-6 rounded-2xl">
                <h4 className="font-bold text-indigo-900 mb-2">2. Illiquid Equity Markets</h4>
                <p className="text-sm text-indigo-800">Funds were unable to efficiently offload their equity positions without incurring massive slippage due to vanishing bids.</p>
              </div>
              <div className="flex-1 bg-indigo-50 p-6 rounded-2xl">
                <h4 className="font-bold text-indigo-900 mb-2">3. Indiscriminate Selling</h4>
                <p className="text-sm text-indigo-800">To meet margin calls and balance risk, algorithms turned to their most liquid and profitable alternative assets: Gold, Copper, and Bitcoin.</p>
              </div>
            </div>
          </div>
          
          <CalloutBox title="Private Credit Contagion" color="purple">
            The demand for liquidity exposed rot within private credit. As NAV confidence eroded, investors rushed for exits. The resulting wave of redemption requests forced credit funds to enact redemption gates or conduct fire sales, amplifying broader market panic.
          </CalloutBox>
        </section>

        {/* Asset-Specific Analysis */}
        <section>
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Gold */}
            <div>
               <SectionHeading icon={Coins} title="Gold & Hard Assets" gradient="from-yellow-400 to-amber-500" />
               <div className="prose prose-slate">
                 <p>
                   The aggressive liquidation of gold, driving prices below $4,000 per ounce, exhibits classic signs of a technical overshoot driven by algorithmic selling rather than a fundamental breakdown.
                 </p>
                 <ul className="list-disc pl-5">
                   <li><strong>Technical Extremes:</strong> The Gold Cycle Indicator plunged to 37, its most oversold reading since Oct 2023.</li>
                   <li><strong>Macro Reassessment:</strong> Goldman Sachs downgraded their target to $4,900 due to rate-cut removals, while J.P. Morgan maintained a $6,000 target citing structural inflation.</li>
                   <li><strong>Structural Floor:</strong> Sovereign debt levels and central bank buying provide a formidable floor. Cycle analysis suggests a bottom forming in the $3,900-$4,000 range.</li>
                 </ul>
               </div>
            </div>

            {/* Bitcoin */}
            <div>
               <SectionHeading icon={BarChart3} title="Bitcoin & Digital Assets" gradient="from-slate-600 to-slate-800" />
               <div className="prose prose-slate mb-6">
                 <p>
                   The quantitative deleveraging event was highly destructive in crypto markets, triggering a textbook &quot;liquidation cascade.&quot;
                 </p>
               </div>
               
               <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 h-64 mb-6">
                  <h4 className="text-center font-bold text-slate-600 mb-2 text-xs uppercase">BTC Price Capitulation (June 2026)</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={bitcoinLiquidationData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                      <XAxis dataKey="time" tick={{fill: '#94a3b8', fontSize: 10}} axisLine={false} tickLine={false} />
                      <YAxis domain={['dataMin - 1000', 'dataMax + 1000']} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                      <Tooltip contentStyle={{borderRadius: '8px'}} />
                      <Line type="monotone" dataKey="price" stroke="#ef4444" strokeWidth={3} dot={{r: 6, fill: '#ef4444'}} activeDot={{r: 8}} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
               </div>

               <CalloutBox title="The Strategy Inc. Shock" color="rose">
                 <p className="text-sm">
                   The capitulation was exacerbated by a psychological shock: Strategy Inc. (formerly MicroStrategy) sold 32 BTC. While statistically microscopic (0.0038% of holdings), it shattered the &quot;never sell&quot; psychological narrative that anchored retail sentiment.
                 </p>
               </CalloutBox>
            </div>
          </div>
        </section>

        {/* Strategic Outlook */}
        <section className="bg-gradient-to-br from-teal-50 to-emerald-50 p-10 md:p-12 rounded-3xl border border-emerald-100 shadow-lg relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 text-emerald-100 opacity-50 pointer-events-none">
            <ShieldAlert size={200} />
          </div>
          <div className="relative z-10">
            <SectionHeading icon={ShieldAlert} title="Strategic Outlook: Is the Correction Over?" gradient="from-teal-500 to-emerald-500" />
            
            <div className="grid md:grid-cols-2 gap-10 mt-8">
              <div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3 border-b border-emerald-200 pb-2">Digital Assets & Commodities</h3>
                <p className="text-emerald-800 mb-4">
                  <strong>Nearing the Terminal Phase.</strong> Speculative excess has been largely cleared. Technical and on-chain models suggest a highly probable target support zone for Bitcoin between $50,000 and $55,000. Gold has established a definitive floor in the $3,900-$4,000 range. Attractive long-term entry points are forming.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3 border-b border-emerald-200 pb-2">Equities & Broader Economy</h3>
                <p className="text-emerald-800 mb-4">
                  <strong>Structurally Incomplete.</strong> The equity correction appears to be in nascent stages. Market breadth is at historical extremes (only 56% of S&P 500 above 200-day MA). Seasonality, midterm elections, and the &quot;Divergence Conundrum&quot; of higher structural inflation pose massive, persistent risks to corporate earnings.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-white/60 backdrop-blur-sm p-6 rounded-2xl text-emerald-900 italic font-medium text-lg text-center shadow-sm">
              &quot;In this new macroeconomic regime, static allocation models and blind reliance on momentum are demonstrably obsolete. In moments of systemic stress, cross-asset correlations inevitably converge to one.&quot;
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
