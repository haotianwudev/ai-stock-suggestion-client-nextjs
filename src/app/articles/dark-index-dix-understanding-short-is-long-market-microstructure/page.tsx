'use client';

import React, { useState } from 'react';
import { BookOpen, TrendingUp, ShieldAlert, BarChart2, Zap, ArrowRight, Info, PieChart, Activity, Search, Layers, Unlock, AlertTriangle, FileText } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

const InsightBadge = ({ type, text }: { type: string; text: string; }) => {
  const styles: Record<string, string> = {
    bullish: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50",
    bearish: "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/50",
    neutral: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    structure: "bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 border-violet-200 dark:border-violet-800/50"
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${styles[type] || styles.neutral} mr-2 mb-2`}>
      {type === 'bullish' && <TrendingUp size={12} />}
      {type === 'bearish' && <TrendingUp size={12} className="transform rotate-180" />}
      {text}
    </span>
  );
};

export default function DarkIndexTutorial() {
  const [isSecondImageViewerOpen, setIsSecondImageViewerOpen] = useState(false);
  
  return (
    <ArticleFrame slug="dark-index-dix-understanding-short-is-long-market-microstructure">
      <div className="pb-24">
        <InfographicSlot alt="Dark Index (DIX) Infographic" />
        
        <main className="max-w-4xl mx-auto py-16 px-6 lg:px-8 space-y-24">
          
          {/* Intro Card */}
          <section>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-10 border-t-8 border-[#A8672E] dark:border-[#D08F52] dark:border-[#A8672E] dark:border-[#D08F52]">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white font-serif">
                <Info className="text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]" /> Tutorial Overview
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                The Dark Index (DIX) challenges the orthodox view of market data. It posits that in a market dominated by high-frequency market makers, short volume is mechanically generated to facilitate buying. This tutorial deconstructs the quantitative architecture and intuitive logic behind this "Geiger counter" for institutional sentiment.
              </p>
              <div className="flex flex-wrap gap-2">
                <InsightBadge type="structure" text="Market Structure" />
                <InsightBadge type="bullish" text="Short is Long" />
                <InsightBadge type="structure" text="Dark Pools" />
                <InsightBadge type="neutral" text="0DTE Impact" />
              </div>
            </div>
          </section>

          {/* Section 1: The Theory */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">
                <Unlock size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">The Epistemology of Dark Liquidity</h2>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Conventional wisdom dictates that short selling is bearish—a bet on declining prices. The DIX relies on the <strong className="text-slate-900 dark:text-white">"Short is Long" hypothesis</strong>. To understand this, we must dismantle the retail trader's view of a "short sale" and adopt the Market Maker's view.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="p-6 rounded-xl bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-orange-900 dark:text-orange-300 font-serif">
                  <Zap size={20} /> Retail Perspective
                </h3>
                <p className="text-orange-800 dark:text-[#BC4128] dark:text-[#E2694A]/80">I sell short because I think the stock price will go down. This is a directional bet.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-blue-900 dark:text-blue-300 font-serif">
                  <Zap size={20} /> Market Maker Perspective
                </h3>
                <p className="text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52]/80">I sell short because a buyer wants shares <strong className="font-bold">right now</strong>, and I don't have them in inventory. I short to fill their buy order, planning to locate shares later.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-serif">The Maker-Taker Ecosystem</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Exchanges pay <strong className="text-slate-900 dark:text-white">rebates</strong> to liquidity providers (Makers). Market Makers (MMs) act as intermediaries. When a large institution wants to buy (accumulate) without moving the price, they go to <strong className="text-slate-900 dark:text-white">Dark Pools</strong>.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="mt-1 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-full p-1 shrink-0">
                  <ArrowRight size={14} className="text-white" />
                </div>
                <span className="text-slate-700 dark:text-slate-300"><strong className="text-slate-900 dark:text-white">Scenario A:</strong> Investor Sells to MM. MM buys. Reported as "Long" sale.</span>
              </li>
              <li className="flex items-start gap-3 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/20 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800/50 shadow-sm">
                <div className="mt-1 bg-[#A8672E] dark:bg-[#D08F52] rounded-full p-1 shrink-0">
                  <ArrowRight size={14} className="text-white" />
                </div>
                <span className="text-indigo-900 dark:text-indigo-200"><strong className="font-bold text-indigo-900 dark:text-indigo-300">Scenario B (The DIX Signal):</strong> Investor Buys from MM. MM doesn't own shares, so MM sells short to fill the order. Reported as <strong className="font-bold text-indigo-900 dark:text-indigo-300">"Short"</strong> sale.</span>
              </li>
            </ul>
            
            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-indigo-900/20 p-5 rounded-xl border-l-4 border-[#A8672E] dark:border-[#D08F52] dark:border-[#A8672E] dark:border-[#D08F52] mb-10">
              <p className="font-semibold text-indigo-800 dark:text-indigo-300">
                Conclusion: High short volume in dark pools correlates with high institutional buying demand.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900/30 shadow-sm">
                <h4 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-3 flex items-center gap-2 font-serif">
                  <BookOpen size={20} /> Understanding Dark Pools
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  Dark pools are private exchanges where institutional investors trade large blocks of securities away from public markets. Unlike lit exchanges (NYSE, NASDAQ), dark pools don't display order books or real-time quotes. This opacity allows institutions to accumulate or distribute positions without telegraphing their intentions.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm">Why Institutions Use Dark Pools:</h5>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 pl-2">
                    <li>• Minimize market impact on large orders</li>
                    <li>• Avoid front-running by HFT algorithms</li>
                    <li>• Reduce information leakage</li>
                    <li>• Access better pricing through midpoint matching</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-violet-100 dark:border-violet-900/30 shadow-sm">
                <h4 className="text-xl font-bold text-violet-900 dark:text-violet-300 mb-3 flex items-center gap-2 font-serif">
                  <Zap size={20} /> The Regulatory Framework
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  The DIX exists because of <strong className="text-slate-800 dark:text-slate-200">Regulation SHO</strong>, adopted by the SEC in 2005. Under Reg SHO, all short sales must be marked and reported to FINRA's Trade Reporting Facilities (TRFs).
                </p>
                <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg mt-4 border border-violet-100 dark:border-violet-800/30">
                  <p className="text-sm text-violet-800 dark:text-violet-300/90">
                    <strong>Key Insight:</strong> While individual trade details remain private, aggregate short volume data is published daily. This creates a unique window into institutional behavior—the raw material for the DIX calculation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 2: The Math */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-violet-600 dark:text-violet-500">
                <BarChart2 size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">Quantitative Architecture</h2>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The DIX isn't just a feeling; it's a dollar-weighted aggregation of Regulation SHO data. We look at two data points for every S&P 500 stock: <strong className="text-slate-900 dark:text-white">Short Volume</strong> (q_short) and <strong className="text-slate-900 dark:text-white">Total Volume</strong> (q_total).
            </p>
            
            <FormulaPanel 
              title="Individual Dark Ratio (D)"
              formula="D_{i,t} = \frac{\text{Volume}_{\text{short}, i, t}}{\text{Volume}_{\text{total}, i, t}}"
            />
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 mb-8 text-center">For a single stock, this ratio is the fraction of off-exchange volume that was a short sale. If D = 0.60, 60% of volume was short (implied buying).</p>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              To get the market-wide sentiment, we don't just average the ratios. We <strong className="text-slate-900 dark:text-white">dollar-weight</strong> them. A 50% ratio in Apple ($3T market cap) matters more than a 50% ratio in a small cap.
            </p>
            
            <FormulaPanel 
              title="The Aggregated DIX"
              formula="\text{DIX}_{\text{raw}} = \frac{\sum(\text{Price} \times \text{Vol}_{\text{Short}})}{\sum(\text{Price} \times \text{Vol}_{\text{Total}})}"
            />
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 mb-10 text-center">We sum the dollar value of all short volume across the S&P 500 and divide by the total dollar volume in dark pools.</p>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 mb-10">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <Layers size={18}/> Normalization
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Raw numbers drift over years due to HFT proliferation. SqueezeMetrics uses a <strong className="text-slate-900 dark:text-white">Hyperbolic Tangent (tanh)</strong> function over a 1-year rolling window to squash outliers and center the data, making it comparable across regimes.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-6">Why Dollar-Weighting Matters</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Simple averaging treats all stocks equally, but institutional money flows are concentrated in mega-cap names. Consider this example:
              </p>
              
              <ComparisonGrid
                items={[
                  {
                    title: "Simple Average (Wrong)",
                    description: "Apple: 50% short ratio, Small Cap: 30% short ratio.",
                    details: [
                      "Average: 40%",
                      "Treats $3T and $300M companies equally"
                    ]
                  },
                  {
                    title: "Dollar-Weighted (Correct)",
                    description: "Apple: 50% × $10B volume = $5B, Small Cap: 30% × $10M volume = $3M.",
                    details: [
                      "Weighted Average: ~50%",
                      "Reflects actual institutional flow"
                    ]
                  }
                ]}
              />
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl border border-purple-100 dark:border-purple-900/30 shadow-sm">
              <h4 className="text-xl font-bold text-purple-900 dark:text-purple-300 mb-4 flex items-center gap-2 font-serif">
                <Activity size={24} /> Data Sources & Calculation Frequency
              </h4>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                The DIX calculation relies on publicly available data from FINRA's Trade Reporting Facilities (TRFs), which aggregate off-exchange trading activity. SqueezeMetrics processes this data daily after market close.
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/10 p-5 rounded-xl border border-purple-100 dark:border-purple-800/30">
                <h5 className="font-bold text-purple-900 dark:text-purple-300 mb-4">Calculation Pipeline:</h5>
                <ol className="text-sm text-purple-800 dark:text-purple-300/80 space-y-3">
                  <li className="flex gap-3"><strong className="shrink-0 w-4">1.</strong> <span><strong>Data Collection (T+0):</strong> Download short/total volume for all S&P 500 from FINRA TRFs</span></li>
                  <li className="flex gap-3"><strong className="shrink-0 w-4">2.</strong> <span><strong>Individual Ratios (T+0):</strong> Calculate D<sub>i,t</sub> for each stock</span></li>
                  <li className="flex gap-3"><strong className="shrink-0 w-4">3.</strong> <span><strong>Dollar Weighting (T+0):</strong> Multiply by closing prices and aggregate</span></li>
                  <li className="flex gap-3"><strong className="shrink-0 w-4">4.</strong> <span><strong>Normalization (T+0):</strong> Apply tanh transformation using 252-day rolling window</span></li>
                  <li className="flex gap-3"><strong className="shrink-0 w-4">5.</strong> <span><strong>Publication (T+1):</strong> DIX value published before market open</span></li>
                </ol>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 3: Interpretation */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">
                <Activity size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">Signal Efficacy & Thresholds</h2>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Because MMs are constantly providing liquidity, the baseline for short volume is high (around 40%). "Neutral" is not 0%.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/10 border-t-4 border-[#1D8A70] dark:border-[#3CBF9C] dark:border-[#1D8A70] dark:border-[#3CBF9C] p-5 rounded-b-xl">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-xl mb-1">&gt; 45%</h4>
                <p className="text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C] font-bold text-sm mb-2">Strong Bullish</p>
                <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]/80">Aggressive accumulation. MMs shorting heavily to fill buy orders.</p>
              </div>
              <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 dark:bg-blue-900/10 border-t-4 border-[#A8672E] dark:border-[#D08F52] dark:border-[#A8672E] dark:border-[#D08F52] p-5 rounded-b-xl">
                <h4 className="font-bold text-blue-900 dark:text-blue-300 text-xl mb-1">40% - 45%</h4>
                <p className="text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52] font-bold text-sm mb-2">Neutral</p>
                <p className="text-xs text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]/80">Standard liquidity provision. Constructive flow.</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/10 border-t-4 border-amber-500 dark:border-amber-400 p-5 rounded-b-xl">
                <h4 className="font-bold text-amber-900 dark:text-amber-300 text-xl mb-1">&lt; 40%</h4>
                <p className="text-amber-800 dark:text-amber-400 font-bold text-sm mb-2">Weak / Uncertain</p>
                <p className="text-xs text-amber-700 dark:text-amber-500/80">Buying demand drying up. Lack of conviction.</p>
              </div>
              <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/10 border-t-4 border-[#BC4128] dark:border-[#E2694A] dark:border-[#BC4128] dark:border-[#E2694A] p-5 rounded-b-xl">
                <h4 className="font-bold text-rose-900 dark:text-rose-300 text-xl mb-1">&lt; 35%</h4>
                <p className="text-rose-800 dark:text-[#BC4128] dark:text-[#E2694A] font-bold text-sm mb-2">Bearish</p>
                <p className="text-xs text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]/80">Vacuum of buying. Selling is likely "natural" long selling.</p>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl mb-10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white font-serif">
                <TrendingUp className="text-[#1D8A70] dark:text-[#3CBF9C]" /> "Buying the Dip" Phenomenon
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                The DIX is often <strong className="text-slate-900 dark:text-white">counter-cyclical</strong>. When the S&P 500 crashes, the DIX often <em>rises</em>. This indicates that while price is falling, smart money is stepping in to absorb the selling (accumulate shares). This divergence (Price Down, DIX Up) is a classic bullish reversal signal.
              </p>
              <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/10 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2">Historical Example: March 2020 COVID Crash</h4>
                <p className="text-sm text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C]/90 leading-relaxed">
                  As the S&P 500 plunged 34% from February 19 to March 23, 2020, the DIX surged from 42% to 48%—indicating massive institutional accumulation during the panic. Investors who recognized this divergence and bought the dip captured the subsequent 70% rally over the next 6 months.
                </p>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-6">Trading Strategies Using DIX Thresholds</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <ComparisonCard
                  title="Bullish Divergence"
                  tone="pos"
                  items={[
                    "Entry Signal: DIX > 45% while SPX is down >2% from recent highs",
                    "Rationale: Institutions are accumulating during weakness",
                    "Risk Mgmt: Exit if DIX drops below 40% or SPX breaks key support"
                  ]}
                />
                <ComparisonCard
                  title="Regime Filter Strategy"
                  tone="neutral"
                  items={[
                    "Use DIX as a portfolio allocation filter",
                    "High DIX (>44%): Increase equity exposure to 70-80%",
                    "Low DIX (<39%): Reduce equity exposure to 40-50%, increase cash"
                  ]}
                />
                <ComparisonCard
                  title="Bearish Divergence"
                  tone="neg"
                  items={[
                    "Entry Signal: DIX < 38% while SPX is at all-time highs",
                    "Rationale: Lack of institutional buying support at elevated levels",
                    "Risk Mgmt: Exit if DIX surges above 43% or use tight stops"
                  ]}
                />
              </div>
            </div>

            {/* Second Infographic */}
            <div 
              className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 cursor-pointer group relative bg-white dark:bg-[#0A0D14]"
              onClick={() => setIsSecondImageViewerOpen(true)}
            >
              <img 
                src="https://i.imgur.com/Vwqvhn9.jpeg" 
                alt="DIX Analysis and Market Structure" 
                className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px] pointer-events-none">
                <div className="bg-white dark:bg-[#0A0D14]/95 text-slate-900 dark:text-slate-100 px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
                  <Search size={18} /> Click to expand diagram
                </div>
              </div>
            </div>
            <FullScreenImageViewer
              src="https://i.imgur.com/Vwqvhn9.jpeg"
              alt="DIX Analysis and Market Structure"
              isOpen={isSecondImageViewerOpen}
              onClose={() => setIsSecondImageViewerOpen(false)}
            />
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 4: Advanced Synergy */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-[#A8672E] dark:text-[#D08F52] dark:text-[#A8672E] dark:text-[#D08F52]">
                <Layers size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">Synergy with Gamma Exposure (GEX)</h2>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-10 items-center mb-12">
              <div className="flex-1">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  The DIX (Sentiment) works best when paired with <strong className="text-slate-900 dark:text-white">GEX (Structure)</strong>. GEX measures the capacity of market makers to dampen or amplify volatility.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                    <span className="w-3 h-3 rounded-full bg-[#1D8A70] dark:bg-[#3CBF9C] shrink-0 mt-1.5"></span>
                    <div>
                      <strong className="text-emerald-900 dark:text-emerald-300 block mb-1">Positive GEX</strong>
                      <span className="text-sm text-emerald-800 dark:text-[#1D8A70] dark:text-[#3CBF9C]/80">Low Volatility. Dealers buy dips/sell rips. Stabilizing force.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/10 rounded-xl border border-rose-100 dark:border-rose-800/30">
                    <span className="w-3 h-3 rounded-full bg-[#BC4128] dark:bg-[#E2694A] shrink-0 mt-1.5"></span>
                    <div>
                      <strong className="text-rose-900 dark:text-rose-300 block mb-1">Negative GEX</strong>
                      <span className="text-sm text-rose-800 dark:text-[#BC4128] dark:text-[#E2694A]/80">High Volatility. Dealers sell dips/buy rips. Accelerating force.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-800 text-center">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-6 font-serif text-lg">The "Golden Setup"</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-[#BC4128] dark:text-[#E2694A] mb-2">Crash</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Market Price</div>
                  </div>
                  <div className="text-2xl text-slate-400 font-light">+</div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-2">High</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">DIX Reading</div>
                  </div>
                  <div className="text-2xl text-slate-400 font-light">=</div>
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-600 dark:to-orange-700 text-white font-bold px-4 py-3 rounded-xl shadow-md text-lg">
                    Reversal
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-6">The DIX-GEX Matrix</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ComparisonCard
                  title="High DIX + Positive GEX"
                  tone="pos"
                  items={[
                    "Regime: Bullish Grind Higher",
                    "Strong institutional buying, low volatility",
                    "Strategy: Buy dips, hold long positions"
                  ]}
                />
                <ComparisonCard
                  title="High DIX + Negative GEX"
                  tone="neutral"
                  items={[
                    "Regime: Volatile Rally",
                    "Institutional buying, high volatility, sharp moves",
                    "Strategy: Buy dips aggressively, expect whipsaws"
                  ]}
                />
                <ComparisonCard
                  title="Low DIX + Positive GEX"
                  tone="neutral"
                  items={[
                    "Regime: Topping Process",
                    "Weak buying, low volatility, distribution phase",
                    "Strategy: Reduce exposure, prepare for reversal"
                  ]}
                />
                <ComparisonCard
                  title="Low DIX + Negative GEX"
                  tone="neg"
                  items={[
                    "Regime: Crash Risk",
                    "No institutional support, high volatility",
                    "Strategy: Defensive positioning, wait for DIX spike"
                  ]}
                />
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* Section 5: Risks & Critique */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">
                <AlertTriangle size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">Critical Review & 2025 Anomalies</h2>
              </div>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              In 2024-2025, the DIX signal "broke" for many practitioners. While the S&P 500 hit all-time highs, the DIX trended lower (bearish). Why?
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="flex gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 border-l-4 border-l-rose-500">
                <div className="mt-1 shrink-0">
                  <Search size={24} className="text-[#BC4128] dark:text-[#E2694A]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">The 0DTE Hypothesis</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Zero-Day-To-Expiration (0DTE) options volume has exploded. Market makers hedging 0DTEs often use <strong className="text-slate-900 dark:text-white">Futures (ES)</strong> or <strong className="text-slate-900 dark:text-white">ETFs (SPY)</strong> instead of single stocks. Since DIX only looks at single stocks, it "goes blind" to this liquidity flow, reporting false bearishness.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 border-l-4 border-l-amber-500">
                <div className="mt-1 shrink-0">
                  <ShieldAlert size={24} className="text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">Wash Trading Artifacts</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Algorithms may buy and immediately short to capture rebates ("wash trading"). This inflates volume without representing true accumulation. Additionally, the DIX ignores "Lit" exchange volume, missing key institutional moves.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/10 p-6 md:p-8 rounded-2xl border border-rose-200 dark:border-rose-800/30">
              <h4 className="text-2xl font-bold text-rose-900 dark:text-[#BC4128] dark:text-[#E2694A] mb-8 font-serif text-center">Structural Market Evolution: Why DIX Degraded</h4>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-rose-100 dark:border-rose-900/50">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">1. The 0DTE Revolution (2022-2025)</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    0DTE options grew from 5% to over 50% of SPX options volume. Market makers hedge these using index futures rather than individual stocks, creating a "hedging bypass".
                  </p>
                  <p className="text-sm text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-bold bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/20 py-2 px-4 rounded-lg inline-block">Impact: DIX underestimates true institutional demand by 20-30%</p>
                </div>

                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-rose-100 dark:border-rose-900/50">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">2. ETF Concentration (2020-2025)</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Institutional flows increasingly occur at the ETF level rather than individual stocks. Since DIX only tracks S&P 500 constituents, it misses this massive channel.
                  </p>
                  <p className="text-sm text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-bold bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/20 py-2 px-4 rounded-lg inline-block">Impact: DIX blind to $2T+ in ETF-mediated flows</p>
                </div>

                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-rose-100 dark:border-rose-900/50">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">3. Algorithmic Rebate Arbitrage</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    High-frequency trading firms exploit maker-taker rebates by simultaneously buying and shorting. This inflates short ratios without representing genuine institutional accumulation.
                  </p>
                  <p className="text-sm text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A] font-bold bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-rose-900/20 py-2 px-4 rounded-lg inline-block">Impact: DIX signal contaminated with 15-25% noise</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-5 bg-amber-100 dark:bg-amber-900/30 rounded-xl border border-amber-200 dark:border-amber-700 text-center">
              <p className="text-amber-800 dark:text-amber-300 font-medium flex items-center justify-center gap-3">
                <AlertTriangle className="shrink-0" />
                Warning: The DIX is a regime filter, not a crystal ball. Structural market changes can degrade its fidelity. Always use in conjunction with price action and other indicators.
              </p>
            </div>
          </section>

        </main>
      </div>
    </ArticleFrame>
  );
}
