'use client';

import React, { useState } from 'react';
import { BookOpen, TrendingUp, ShieldAlert, BarChart2, Zap, ArrowRight, Info, PieChart, Activity, Search, Layers, Unlock, AlertTriangle, FileText } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- Reusable Components ---
const Section = ({ title, icon: Icon, children, color = "indigo" }: { 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode; 
  color?: string;
}) => {
  const colorClasses: Record<string, string> = {
    indigo: "border-l-4 border-indigo-500 bg-white",
    emerald: "border-l-4 border-emerald-500 bg-emerald-50/50",
    rose: "border-l-4 border-rose-500 bg-rose-50/50",
    amber: "border-l-4 border-amber-500 bg-amber-50/50",
    violet: "border-l-4 border-violet-500 bg-violet-50/50",
    blue: "border-l-4 border-blue-500 bg-blue-50/50",
  };

  const iconColors: Record<string, string> = {
    indigo: "text-indigo-600",
    emerald: "text-emerald-600",
    rose: "text-rose-600",
    amber: "text-amber-600",
    violet: "text-violet-600",
    blue: "text-blue-600",
  };

  return (
    <section className={`mb-12 rounded-xl shadow-sm p-8 transition-all hover:shadow-md ${colorClasses[color]}`}>
      <div className="flex items-center mb-6">
        <div className={`p-3 rounded-full bg-white shadow-sm mr-4 ${iconColors[color]}`}>
          <Icon size={28} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
      </div>
      <div className="text-slate-600 leading-relaxed text-lg">
        {children}
      </div>
    </section>
  );
};

const KeyConceptCard = ({ title, children, accent = "blue" }: {
  title: string;
  children: React.ReactNode;
  accent?: string;
}) => {
  const accents: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
    green: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <div className={`p-6 rounded-lg border-2 ${accents[accent]} mb-6`}>
      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
        <Zap size={20} /> {title}
      </h3>
      <p>{children}</p>
    </div>
  );
};

const FormulaBox = ({ title, formula, explanation }: {
  title: string;
  formula: string;
  explanation: string;
}) => (
  <div className="my-8 bg-slate-800 text-white p-6 rounded-xl shadow-lg overflow-x-auto relative group">
    <div className="absolute top-2 right-2 text-slate-500 text-xs font-mono uppercase tracking-wider">
      Math Model
    </div>
    <h4 className="text-indigo-300 font-bold mb-4 font-mono">{title}</h4>
    <div className="text-2xl md:text-3xl font-serif text-center mb-6 py-4 border-b border-slate-700">
      {formula}
    </div>
    <p className="text-slate-300 text-sm font-mono">{explanation}</p>
  </div>
);

const InsightBadge = ({ type, text }: {
  type: string;
  text: string;
}) => {
  const styles: Record<string, string> = {
    bullish: "bg-emerald-100 text-emerald-800 border-emerald-200",
    bearish: "bg-rose-100 text-rose-800 border-rose-200",
    neutral: "bg-slate-100 text-slate-800 border-slate-200",
    structure: "bg-violet-100 text-violet-800 border-violet-200"
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${styles[type] || styles.neutral} mr-2 mb-2`}>
      {type === 'bullish' && <TrendingUp size={12} />}
      {type === 'bearish' && <TrendingUp size={12} className="transform rotate-180" />}
      {text}
    </span>
  );
};

// --- Main Application ---
export default function DarkIndexTutorial() {
  const [isSecondImageViewerOpen, setIsSecondImageViewerOpen] = useState(false);
  return (
    <ArticleFrame slug="dark-index-dix-understanding-short-is-long-market-microstructure">
      <InfographicSlot alt="Dark Index (DIX) Infographic" />
      <main className="max-w-4xl mx-auto px-6 pb-20 pt-12 space-y-24">
        {/* Intro Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-12 border-t-8 border-indigo-500">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Info className="text-indigo-500" /> Tutorial Overview
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            The Dark Index (DIX) challenges the orthodox view of market data. It posits that in a market dominated by high-frequency market makers, short volume is mechanically generated to facilitate buying. This tutorial deconstructs the quantitative architecture and intuitive logic behind this "Geiger counter" for institutional sentiment.
          </p>
          <div className="flex flex-wrap gap-2">
            <InsightBadge type="structure" text="Market Structure" />
            <InsightBadge type="bullish" text="Short is Long" />
            <InsightBadge type="structure" text="Dark Pools" />
            <InsightBadge type="neutral" text="0DTE Impact" />
          </div>
        </div>

        {/* Section 1: The Theory */}
        <Section title="The Epistemology of Dark Liquidity" icon={Unlock} color="indigo">
          <p className="mb-6">
            Conventional wisdom dictates that short selling is bearish—a bet on declining prices. The DIX relies on the <strong>"Short is Long" hypothesis</strong>. To understand this, we must dismantle the retail trader's view of a "short sale" and adopt the Market Maker's view.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <KeyConceptCard title="Retail Perspective" accent="orange">
              I sell short because I think the stock price will go down. This is a directional bet.
            </KeyConceptCard>
            <KeyConceptCard title="Market Maker Perspective" accent="blue">
              I sell short because a buyer wants shares <strong>right now</strong>, and I don't have them in inventory. I short to fill their buy order, planning to locate shares later.
            </KeyConceptCard>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">The Maker-Taker Ecosystem</h3>
          <p className="mb-6">
            Exchanges pay <strong>rebates</strong> to liquidity providers (Makers). Market Makers (MMs) act as intermediaries. When a large institution wants to buy (accumulate) without moving the price, they go to <strong>Dark Pools</strong>.
          </p>
          <ul className="list-none space-y-4 mb-8">
            <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg">
              <div className="mt-1 bg-green-500 rounded-full p-1">
                <ArrowRight size={14} className="text-white" />
              </div>
              <span><strong>Scenario A:</strong> Investor Sells to MM. MM buys. Reported as "Long" sale.</span>
            </li>
            <li className="flex items-start gap-3 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <div className="mt-1 bg-indigo-500 rounded-full p-1">
                <ArrowRight size={14} className="text-white" />
              </div>
              <span><strong>Scenario B (The DIX Signal):</strong> Investor Buys from MM. MM doesn't own shares, so MM sells short to fill the order. Reported as <strong>"Short"</strong> sale.</span>
            </li>
          </ul>
          <p className="font-semibold text-indigo-700 bg-indigo-50 p-4 rounded border-l-4 border-indigo-500">
            Conclusion: High short volume in dark pools correlates with high institutional buying demand.
          </p>

          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
            <h4 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <BookOpen size={20} /> Understanding Dark Pools
            </h4>
            <p className="text-slate-700 mb-4">
              Dark pools are private exchanges where institutional investors trade large blocks of securities away from public markets. Unlike lit exchanges (NYSE, NASDAQ), dark pools don't display order books or real-time quotes. This opacity allows institutions to accumulate or distribute positions without telegraphing their intentions to the market.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-bold text-indigo-800 mb-2">Why Institutions Use Dark Pools</h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Minimize market impact on large orders</li>
                  <li>• Avoid front-running by HFT algorithms</li>
                  <li>• Reduce information leakage</li>
                  <li>• Access better pricing through midpoint matching</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-bold text-indigo-800 mb-2">Major Dark Pool Operators</h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• UBS ATS (Largest by volume)</li>
                  <li>• Goldman Sachs Sigma X</li>
                  <li>• Credit Suisse CrossFinder</li>
                  <li>• Morgan Stanley MS Pool</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl border-2 border-violet-200 shadow-sm">
            <h4 className="text-xl font-bold text-violet-900 mb-3 flex items-center gap-2">
              <Zap size={20} /> The Regulatory Framework: Regulation SHO
            </h4>
            <p className="text-slate-700 mb-4">
              The DIX exists because of <strong>Regulation SHO</strong>, adopted by the SEC in 2005 to increase transparency around short selling. Under Reg SHO, all short sales must be marked and reported to FINRA's Trade Reporting Facilities (TRFs).
            </p>
            <div className="bg-violet-50 p-4 rounded-lg">
              <p className="text-sm text-slate-700">
                <strong>Key Insight:</strong> While individual trade details remain private, aggregate short volume data is published daily. This creates a unique window into institutional behavior—the raw material for the DIX calculation. Without Reg SHO, the DIX would be impossible to construct.
              </p>
            </div>
          </div>
        </Section>

        {/* Section 2: The Math */}
        <Section title="Quantitative Architecture" icon={BarChart2} color="violet">
          <p className="mb-6">
            The DIX isn't just a feeling; it's a dollar-weighted aggregation of Regulation SHO data. We look at two data points for every S&P 500 stock: <strong>Short Volume</strong> (q_short) and <strong>Total Volume</strong> (q_total).
          </p>
          
          <FormulaBox 
            title="Individual Dark Ratio (D)"
            formula="D_{i,t} = Volume_{short, i, t} / Volume_{total, i, t}"
            explanation="For a single stock, this ratio is the fraction of off-exchange volume that was a short sale. If D = 0.60, 60% of volume was short (implied buying)."
          />

          <p className="mb-6">
            To get the market-wide sentiment, we don't just average the ratios. We <strong>dollar-weight</strong> them. A 50% ratio in Apple ($3T market cap) matters more than a 50% ratio in a small cap.
          </p>
          
          <FormulaBox 
            title="The Aggregated DIX"
            formula="DIX_{raw} = Σ(Price × Vol_Short) / Σ(Price × Vol_Total)"
            explanation="We sum the dollar value of all short volume across the S&P 500 and divide by the total dollar volume in dark pools."
          />

          <div className="bg-slate-100 p-6 rounded-lg mt-8 mb-8">
            <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Layers size={18}/> Normalization
            </h4>
            <p className="text-sm text-slate-600">
              Raw numbers drift over years due to HFT proliferation. SqueezeMetrics uses a <strong>Hyperbolic Tangent (tanh)</strong> function over a 1-year rolling window to squash outliers and center the data, making it comparable across regimes.
            </p>
          </div>

          <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-200 mb-8">
            <h4 className="text-xl font-bold text-violet-900 mb-4">Why Dollar-Weighting Matters</h4>
            <p className="text-slate-700 mb-4">
              Simple averaging treats all stocks equally, but institutional money flows are concentrated in mega-cap names. Consider this example:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-bold text-violet-800 mb-2">Simple Average (Wrong)</h5>
                <p className="text-sm text-slate-600 mb-2">Apple: 50% short ratio</p>
                <p className="text-sm text-slate-600 mb-2">Small Cap: 30% short ratio</p>
                <p className="text-sm text-slate-600 font-bold">Average: 40%</p>
                <p className="text-xs text-rose-600 mt-2">❌ Treats $3T and $300M companies equally</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-violet-300">
                <h5 className="font-bold text-violet-800 mb-2">Dollar-Weighted (Correct)</h5>
                <p className="text-sm text-slate-600 mb-2">Apple: 50% × $10B volume = $5B</p>
                <p className="text-sm text-slate-600 mb-2">Small Cap: 30% × $10M volume = $3M</p>
                <p className="text-sm text-slate-600 font-bold">Weighted: ~50%</p>
                <p className="text-xs text-emerald-600 mt-2">✓ Reflects actual institutional flow</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border-2 border-purple-200 shadow-sm">
            <h4 className="text-xl font-bold text-purple-900 mb-3 flex items-center gap-2">
              <Activity size={20} /> Data Sources & Calculation Frequency
            </h4>
            <p className="text-slate-700 mb-4">
              The DIX calculation relies on publicly available data from FINRA's Trade Reporting Facilities (TRFs), which aggregate off-exchange trading activity. SqueezeMetrics processes this data daily after market close.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h5 className="font-bold text-purple-800 mb-2">Calculation Pipeline:</h5>
              <ol className="text-sm text-slate-700 space-y-2">
                <li><strong>1. Data Collection (T+0):</strong> Download short volume and total volume for all S&P 500 constituents from FINRA TRFs</li>
                <li><strong>2. Individual Ratios (T+0):</strong> Calculate D<sub>i,t</sub> for each stock</li>
                <li><strong>3. Dollar Weighting (T+0):</strong> Multiply by closing prices and aggregate</li>
                <li><strong>4. Normalization (T+0):</strong> Apply tanh transformation using 252-day rolling window</li>
                <li><strong>5. Publication (T+1):</strong> DIX value published before market open</li>
              </ol>
            </div>
          </div>
        </Section>

        {/* Section 3: Interpretation */}
        <Section title="Signal Efficacy & Thresholds" icon={Activity} color="emerald">
          <p className="mb-8">
            Because MMs are constantly providing liquidity, the baseline for short volume is high (around 40%). "Neutral" is not 0%.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-emerald-100 border-b-4 border-emerald-500 p-4 rounded-t-lg">
              <h4 className="font-bold text-emerald-800 text-lg">&gt; 45%</h4>
              <p className="text-emerald-900 font-bold">Strong Bullish</p>
              <p className="text-xs mt-2 text-emerald-700">Aggressive accumulation. MMs shorting heavily to fill buy orders.</p>
            </div>
            <div className="bg-blue-100 border-b-4 border-blue-500 p-4 rounded-t-lg">
              <h4 className="font-bold text-blue-800 text-lg">40% - 45%</h4>
              <p className="text-blue-900 font-bold">Neutral</p>
              <p className="text-xs mt-2 text-blue-700">Standard liquidity provision. Constructive flow.</p>
            </div>
            <div className="bg-orange-100 border-b-4 border-orange-500 p-4 rounded-t-lg">
              <h4 className="font-bold text-orange-800 text-lg">&lt; 40%</h4>
              <p className="text-orange-900 font-bold">Weak / Uncertain</p>
              <p className="text-xs mt-2 text-orange-700">Buying demand drying up. Lack of conviction.</p>
            </div>
            <div className="bg-rose-100 border-b-4 border-rose-500 p-4 rounded-t-lg">
              <h4 className="font-bold text-rose-800 text-lg">&lt; 35%</h4>
              <p className="text-rose-900 font-bold">Bearish</p>
              <p className="text-xs mt-2 text-rose-700">Vacuum of buying. Selling is likely "natural" long selling.</p>
            </div>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm mb-8">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-slate-800">
              <TrendingUp className="text-emerald-500" /> "Buying the Dip" Phenomenon
            </h3>
            <p className="text-slate-600 mb-4">
              The DIX is often <strong>counter-cyclical</strong>. When the S&P 500 crashes, the DIX often <em>rises</em>. This indicates that while price is falling, smart money is stepping in to absorb the selling (accumulate shares). This divergence (Price Down, DIX Up) is a classic bullish reversal signal.
            </p>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h4 className="font-bold text-emerald-800 mb-2">Historical Example: March 2020 COVID Crash</h4>
              <p className="text-sm text-slate-700">
                As the S&P 500 plunged 34% from February 19 to March 23, 2020, the DIX surged from 42% to 48%—indicating massive institutional accumulation during the panic. Investors who recognized this divergence and bought the dip captured the subsequent 70% rally over the next 6 months.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
            <h4 className="text-xl font-bold text-emerald-900 mb-4">Trading Strategies Using DIX Thresholds</h4>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  Bullish Divergence Strategy
                </h5>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Entry Signal:</strong> DIX &gt; 45% while SPX is down &gt;2% from recent highs
                </p>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Rationale:</strong> Institutions are accumulating during weakness
                </p>
                <p className="text-sm text-slate-700">
                  <strong>Risk Management:</strong> Exit if DIX drops below 40% or SPX breaks key support
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-bold text-rose-800 mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  Bearish Divergence Strategy
                </h5>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Entry Signal:</strong> DIX &lt; 38% while SPX is at all-time highs
                </p>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Rationale:</strong> Lack of institutional buying support at elevated levels
                </p>
                <p className="text-sm text-slate-700">
                  <strong>Risk Management:</strong> Exit if DIX surges above 43% or use tight stops
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  Regime Filter Strategy
                </h5>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>Application:</strong> Use DIX as a portfolio allocation filter
                </p>
                <p className="text-sm text-slate-700 mb-2">
                  <strong>High DIX (&gt;44%):</strong> Increase equity exposure to 70-80%
                </p>
                <p className="text-sm text-slate-700">
                  <strong>Low DIX (&lt;39%):</strong> Reduce equity exposure to 40-50%, increase cash/bonds
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Second Infographic */}
        <section className="mb-12">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative bg-white"
            onClick={() => setIsSecondImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/Vwqvhn9.jpeg" 
              alt="DIX Analysis and Market Structure" 
              className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
              <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                Click to view full screen
              </div>
            </div>
          </div>
        </section>

        {/* Full-screen viewer for second image */}
        <FullScreenImageViewer
          src="https://i.imgur.com/Vwqvhn9.jpeg"
          alt="DIX Analysis and Market Structure"
          isOpen={isSecondImageViewerOpen}
          onClose={() => setIsSecondImageViewerOpen(false)}
        />

        {/* Section 4: Advanced Synergy */}
        <Section title="Synergy with Gamma Exposure (GEX)" icon={Layers} color="blue">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <div className="flex-1">
              <p className="mb-4">
                The DIX (Sentiment) works best when paired with <strong>GEX (Structure)</strong>. GEX measures the capacity of market makers to dampen or amplify volatility.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <strong>Positive GEX:</strong> Low Volatility. Dealers buy dips/sell rips.
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <strong>Negative GEX:</strong> High Volatility. Dealers sell dips/buy rips (accelerant).
                </li>
              </ul>
            </div>
            <div className="flex-1 bg-white p-6 rounded-xl shadow-inner border border-slate-200 w-full">
              <h4 className="text-center font-bold text-indigo-900 mb-4 border-b pb-2">The "Golden Setup"</h4>
              <div className="flex justify-between items-center text-center">
                <div>
                  <div className="text-3xl font-bold text-red-500 mb-1">Crash</div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">Market Price</div>
                </div>
                <div className="text-2xl text-slate-300">+</div>
                <div>
                  <div className="text-3xl font-bold text-emerald-500 mb-1">High</div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">DIX Reading</div>
                </div>
                <div className="text-2xl text-slate-300">=</div>
                <div className="bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 font-bold px-4 py-2 rounded shadow-sm">
                  Reversal
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 mb-8">
            <h4 className="text-xl font-bold text-blue-900 mb-4">Understanding the DIX-GEX Matrix</h4>
            <p className="text-slate-700 mb-4">
              Combining DIX (institutional sentiment) with GEX (dealer positioning) creates a powerful 2x2 matrix for market regime identification:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-emerald-300">
                <h5 className="font-bold text-emerald-800 mb-2">High DIX + Positive GEX</h5>
                <p className="text-sm text-slate-700 mb-2"><strong>Regime:</strong> Bullish Grind Higher</p>
                <p className="text-sm text-slate-700 mb-2"><strong>Characteristics:</strong> Strong institutional buying, low volatility, steady uptrend</p>
                <p className="text-sm text-emerald-700 font-bold">Strategy: Buy dips, hold long positions</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-amber-300">
                <h5 className="font-bold text-amber-800 mb-2">High DIX + Negative GEX</h5>
                <p className="text-sm text-slate-700 mb-2"><strong>Regime:</strong> Volatile Rally</p>
                <p className="text-sm text-slate-700 mb-2"><strong>Characteristics:</strong> Institutional buying, high volatility, sharp moves</p>
                <p className="text-sm text-amber-700 font-bold">Strategy: Buy dips aggressively, expect whipsaws</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-orange-300">
                <h5 className="font-bold text-orange-800 mb-2">Low DIX + Positive GEX</h5>
                <p className="text-sm text-slate-700 mb-2"><strong>Regime:</strong> Topping Process</p>
                <p className="text-sm text-slate-700 mb-2"><strong>Characteristics:</strong> Weak buying, low volatility, distribution phase</p>
                <p className="text-sm text-orange-700 font-bold">Strategy: Reduce exposure, prepare for reversal</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-rose-300">
                <h5 className="font-bold text-rose-800 mb-2">Low DIX + Negative GEX</h5>
                <p className="text-sm text-slate-700 mb-2"><strong>Regime:</strong> Crash Risk</p>
                <p className="text-sm text-slate-700 mb-2"><strong>Characteristics:</strong> No institutional support, high volatility, accelerating declines</p>
                <p className="text-sm text-rose-700 font-bold">Strategy: Defensive positioning, wait for DIX spike</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border-2 border-cyan-200 shadow-sm">
            <h4 className="text-xl font-bold text-cyan-900 mb-3 flex items-center gap-2">
              <PieChart size={20} /> Practical Implementation: Building a DIX-GEX Dashboard
            </h4>
            <p className="text-slate-700 mb-4">
              Professional traders combine DIX and GEX data into a real-time monitoring system. Here's how to construct your own:
            </p>
            <div className="bg-cyan-50 p-4 rounded-lg">
              <h5 className="font-bold text-cyan-800 mb-2">Data Sources:</h5>
              <ul className="text-sm text-slate-700 space-y-2">
                <li><strong>DIX Data:</strong> SqueezeMetrics (subscription required) or reconstruct from FINRA TRF data</li>
                <li><strong>GEX Data:</strong> SqueezeMetrics, SpotGamma, or calculate from CBOE options data</li>
                <li><strong>Price Data:</strong> Real-time SPX/SPY quotes from your broker</li>
              </ul>
              <h5 className="font-bold text-cyan-800 mt-4 mb-2">Key Metrics to Track:</h5>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• DIX absolute level (current vs. 1-month average)</li>
                <li>• DIX momentum (5-day rate of change)</li>
                <li>• GEX level and key strike concentrations</li>
                <li>• Price distance from GEX zero-gamma level</li>
                <li>• Historical regime classification accuracy</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Section 5: Risks & Critique */}
        <Section title="Critical Review & 2025 Anomalies" icon={AlertTriangle} color="rose">
          <p className="mb-6">
            In 2024-2025, the DIX signal "broke" for many practitioners. While the S&P 500 hit all-time highs, the DIX trended lower (bearish). Why?
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-rose-400">
              <div className="mt-1 min-w-[24px]">
                <Search size={24} className="text-rose-400" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">The 0DTE Hypothesis</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Zero-Day-To-Expiration (0DTE) options volume has exploded. Market makers hedging 0DTEs often use <strong>Futures (ES)</strong> or <strong>ETFs (SPY)</strong> instead of single stocks. Since DIX only looks at single stocks, it "goes blind" to this massive liquidity flow, reporting false bearishness.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-rose-400">
              <div className="mt-1 min-w-[24px]">
                <ShieldAlert size={24} className="text-rose-400" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Wash Trading & Reporting Artifacts</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Algorithms may buy and immediately short to capture rebates ("wash trading"). This inflates volume without representing true accumulation. Additionally, the DIX ignores "Lit" exchange volume (like the Closing Cross), potentially missing key institutional moves.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-rose-50 to-red-50 p-6 rounded-xl border border-rose-200 mb-8">
            <h4 className="text-xl font-bold text-rose-900 mb-4">Structural Market Evolution: Why DIX Degraded</h4>
            <p className="text-slate-700 mb-4">
              The financial markets are not static. Several structural changes between 2020-2025 fundamentally altered the DIX's predictive power:
            </p>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-bold text-rose-800 mb-2">1. The 0DTE Revolution (2022-2025)</h5>
                <p className="text-sm text-slate-700 mb-2">
                  0DTE options grew from 5% to over 50% of SPX options volume. Market makers hedge these ultra-short-dated contracts using index futures (ES, MES) rather than individual stocks, creating a "hedging bypass" that the DIX cannot observe.
                </p>
                <p className="text-xs text-rose-600 font-bold">Impact: DIX underestimates true institutional demand by 20-30%</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-bold text-rose-800 mb-2">2. ETF Concentration (2020-2025)</h5>
                <p className="text-sm text-slate-700 mb-2">
                  Passive investing via ETFs (SPY, VOO, IVV) surged. Institutional flows increasingly occur at the ETF level rather than individual stocks. Since DIX only tracks S&P 500 constituents, it misses this massive channel.
                </p>
                <p className="text-xs text-rose-600 font-bold">Impact: DIX blind to $2T+ in ETF-mediated flows</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-bold text-rose-800 mb-2">3. Algorithmic Rebate Arbitrage</h5>
                <p className="text-sm text-slate-700 mb-2">
                  High-frequency trading firms exploit maker-taker rebates by simultaneously buying and shorting to capture the spread. This "synthetic volume" inflates short ratios without representing genuine institutional accumulation.
                </p>
                <p className="text-xs text-rose-600 font-bold">Impact: DIX signal contaminated with 15-25% noise</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-bold text-rose-800 mb-2">4. Closing Auction Shift</h5>
                <p className="text-sm text-slate-700 mb-2">
                  Institutional trading increasingly concentrates in the closing auction (on-exchange), which is excluded from DIX calculation. Dark pool share of volume declined from 40% (2015) to 28% (2025).
                </p>
                <p className="text-xs text-rose-600 font-bold">Impact: DIX captures smaller fraction of total institutional activity</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border-2 border-amber-200 shadow-sm mb-8">
            <h4 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
              <Zap size={20} /> Adaptation Strategies: Using DIX in 2025+
            </h4>
            <p className="text-slate-700 mb-4">
              Despite structural degradation, the DIX remains useful when combined with complementary indicators:
            </p>
            <div className="space-y-3">
              <div className="bg-amber-50 p-4 rounded-lg">
                <h5 className="font-bold text-amber-800 mb-2">Strategy 1: DIX + SPY Dark Pool Volume</h5>
                <p className="text-sm text-slate-700">
                  Track SPY-specific short volume alongside the DIX. If SPY dark pool activity is high while DIX is low, institutions may be routing through ETFs instead of single stocks.
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h5 className="font-bold text-amber-800 mb-2">Strategy 2: DIX + Futures Positioning (COT)</h5>
                <p className="text-sm text-slate-700">
                  Cross-reference DIX with CFTC Commitment of Traders (COT) data for ES futures. If leveraged funds are net long ES while DIX is low, the signal may be false.
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h5 className="font-bold text-amber-800 mb-2">Strategy 3: DIX Divergence Threshold Adjustment</h5>
                <p className="text-sm text-slate-700">
                  Recalibrate thresholds for the 2025 regime. Instead of 45% = bullish, use 42% as the new threshold. Normalize DIX against its 2-year rolling average rather than absolute levels.
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h5 className="font-bold text-amber-800 mb-2">Strategy 4: Sector-Specific DIX</h5>
                <p className="text-sm text-slate-700">
                  Calculate DIX for individual sectors (Tech, Financials, Energy). Sector rotation may be masked in the aggregate DIX but visible in sector-level analysis.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-rose-100 rounded text-center text-rose-800 font-medium text-sm">
            Warning: The DIX is a regime filter, not a crystal ball. Structural market changes (like the shift to Futures hedging) can degrade its fidelity. Always use in conjunction with price action, volume analysis, and other sentiment indicators.
          </div>

          <div className="mt-8 bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-300">
            <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen size={20} /> The Future of Market Microstructure Indicators
            </h4>
            <p className="text-slate-700 mb-4">
              The DIX's degradation illustrates a fundamental truth: <strong>market structure evolves faster than indicators</strong>. The next generation of sentiment tools must adapt to:
            </p>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>• <strong>Multi-venue aggregation:</strong> Combine dark pools, lit exchanges, and futures markets</li>
              <li>• <strong>Options flow integration:</strong> Incorporate 0DTE hedging flows and gamma positioning</li>
              <li>• <strong>Machine learning adaptation:</strong> Use AI to detect regime changes and auto-recalibrate thresholds</li>
              <li>• <strong>Real-time processing:</strong> Move from T+1 daily data to intraday updates</li>
              <li>• <strong>Blockchain transparency:</strong> Future on-chain settlement may provide perfect visibility into institutional flows</li>
            </ul>
          </div>
        </Section>

      </main>
    </ArticleFrame>
  );
}
