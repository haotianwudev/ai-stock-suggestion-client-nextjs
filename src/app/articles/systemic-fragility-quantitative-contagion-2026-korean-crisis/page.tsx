'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingDown, AlertTriangle, BarChart3, Globe, Shield, 
  BookOpen, Zap, Activity, Cpu, Briefcase, Calculator, 
  Layers, ArrowRight, Info, ArrowLeft, Music, Maximize2
} from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

const Section = ({ id, title, icon: Icon, children, colorClass = "from-blue-500 to-indigo-600" }: {
  id: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  colorClass?: string;
}) => (
  <section id={id} className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 transition-all hover:shadow-2xl">
      <div className={`bg-gradient-to-r ${colorClass} p-6 sm:p-8 flex items-center gap-4`}>
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      <div className="p-6 sm:p-8 lg:p-10 space-y-6 text-slate-700 leading-relaxed text-lg">
        {children}
      </div>
    </div>
  </section>
);

const Callout = ({ title, children, type = "info" }: {
  title: string;
  children: React.ReactNode;
  type?: "info" | "warning" | "danger" | "success";
}) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-900",
    warning: "bg-orange-50 border-orange-200 text-orange-900",
    danger: "bg-rose-50 border-rose-200 text-rose-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
  };
  const iconColor = {
    info: "text-blue-500",
    warning: "text-orange-500",
    danger: "text-rose-500",
    success: "text-emerald-500",
  };

  return (
    <div className={`p-6 border rounded-2xl ${styles[type]} shadow-sm my-6`}>
      <div className="flex items-center gap-3 mb-3">
        <Info className={`w-6 h-6 ${iconColor[type]}`} />
        <h4 className="font-bold text-xl">{title}</h4>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default function SystemicFragilityArticle() {
  const currentArticle = articles.find(article => article.slug === 'systemic-fragility-quantitative-contagion-2026-korean-crisis');
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

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">
        
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Badges */}
        <div className="absolute top-8 left-8 z-20">
          <span className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            Deep Research
          </span>
        </div>
        <div className="absolute top-8 right-8 z-20">
          <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            Podcast
          </span>
        </div>

        {/* Hero Section */}
        <header className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-slate-50 -z-10"></div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-6 border border-indigo-200 shadow-sm">
            <BarChart3 className="w-4 h-4" />
            <span>Quantitative Finance Research Tutorial</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight max-w-5xl mb-8 leading-tight">
            Systemic Fragility & <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Quantitative Contagion
            </span>
          </h1>
          <p className="max-w-2xl text-xl text-slate-600 mb-10 leading-relaxed">
            An in-depth analysis of the 2026 South Korean Equity Crisis, exploring the toxic convergence of retail leverage, market microstructure, and global factor rotation.
          </p>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/Ig72p7X.jpeg" 
              alt="Systemic Fragility Infographic" 
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
          src="https://i.imgur.com/Ig72p7X.jpeg"
          alt="Systemic Fragility Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* Main Content Starts Here */}
        <main className="max-w-5xl mx-auto px-6 py-16">

        <Section 
          id="introduction" 
          title="1. Introduction & Executive Summary" 
          icon={BookOpen}
          colorClass="from-blue-600 to-indigo-600"
        >
          <p>
            In the summer of 2026, the global financial ecosystem experienced one of the most severe localized market dislocations in modern history, emanating from the South Korean equity market. Following a parabolic, artificial intelligence-driven supercycle that propelled the Korea Composite Stock Price Index (KOSPI) 150 percent upward to briefly breach the historic 9,000-point threshold in June 2026, the market suffered a violent capitulation.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 my-8">
            <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 text-center">
              <TrendingDown className="w-10 h-10 text-rose-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-rose-700 mb-1">-25%</div>
              <div className="text-sm text-rose-600 font-medium">KOSPI Collapse (1 Month)</div>
            </div>
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 text-center">
              <Activity className="w-10 h-10 text-orange-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-orange-700 mb-1">1.2M</div>
              <div className="text-sm text-orange-600 font-medium">Margin Liquidations</div>
            </div>
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 text-center">
              <Cpu className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-indigo-700 mb-1">&gt;50%</div>
              <div className="text-sm text-indigo-600 font-medium">KOSPI Weight: Samsung + SK Hynix</div>
            </div>
          </div>
          <p>
            This extreme boom-and-bust cycle was fundamentally a crisis of <strong>market microstructure</strong>. It was driven by a toxic convergence of an unprecedented accumulation of retail leverage, extreme index concentration, and the mechanical feedback loops triggered by newly introduced single-stock leveraged ETFs.
          </p>
        </Section>

        <Section 
          id="history" 
          title="2. Historical Context: A Legacy of Retail Leverage" 
          icon={Layers}
          colorClass="from-emerald-500 to-teal-600"
        >
          <p>
            To fully comprehend the fragility of the South Korean equity market in 2026, one must examine the preceding years of regulatory whiplash and retail speculation.
          </p>

          <div className="space-y-6 mt-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-teal-100 text-teal-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="font-bold text-sm">2023</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-xl text-slate-800 mb-2">The CFD Crisis</h3>
                <p className="text-slate-600 text-base">A massive pump-and-dump scheme utilizing Contracts for Difference (CFDs) unraveled, wiping out 8.2 trillion won. Regulators responded with strict rules, inadvertently channeling retail speculation elsewhere.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-teal-100 text-teal-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="font-bold text-sm">2024</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-xl text-slate-800 mb-2">The ELS Saga</h3>
                <p className="text-slate-600 text-base">Retail investors lost an estimated 4.6 trillion won on Equity-Linked Securities tied to plunging Chinese indices, proving a deep-seated structural appetite for complex derivatives.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-teal-100 text-teal-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="font-bold text-sm">2025</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-xl text-slate-800 mb-2">The Short-Selling Ban</h3>
                <p className="text-slate-600 text-base">A 17-month blanket ban on short-selling removed a critical friction layer. Without short-sellers to stabilize the market, the AI rally steepened parabolically without structural resistance.</p>
              </div>
            </div>
          </div>
        </Section>

        <Section 
          id="ai-concentration" 
          title="3. The 2026 AI Supercycle & Index Concentration" 
          icon={Cpu}
          colorClass="from-violet-500 to-purple-600"
        >
          <p>
            Historically, South Korean equities traded at a persistent discount relative to global peers (the "Korean Discount"). However, the AI revolution shifted global capital toward the physical infrastructure required to sustain computational workloads. High-Bandwidth Memory (HBM) emerged as the most critical bottleneck.
          </p>
          <p>
            <strong>SK Hynix</strong> and <strong>Samsung Electronics</strong> operated as the absolute vanguard of this supply chain. This semiconductor duopoly resulted in an extreme, historically unprecedented level of market concentration, rendering the entire market structurally brittle.
          </p>

          <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse bg-white">
              <caption className="bg-slate-50 p-4 text-sm font-semibold text-slate-600 border-b border-slate-200">
                Table 1: Extreme Concentration of Global Indices (Mid-2026)
              </caption>
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-4 font-semibold border-b border-slate-200">Market / Index</th>
                  <th className="p-4 font-semibold border-b border-slate-200">Largest Constituent(s)</th>
                  <th className="p-4 font-semibold border-b border-slate-200">Combined Index Weighting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors bg-purple-50/30">
                  <td className="p-4 font-medium text-purple-900">South Korea (KOSPI)</td>
                  <td className="p-4">Samsung Electronics, SK Hynix</td>
                  <td className="p-4 font-bold text-purple-700">&gt; 50.0%</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium">Switzerland (SMI)</td>
                  <td className="p-4">Nestlé, Novartis, Roche</td>
                  <td className="p-4">~ 40.0%</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium">United States (S&P 500)</td>
                  <td className="p-4">Nvidia, Microsoft, Apple</td>
                  <td className="p-4">~ 20.0% (Top 3)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section 
          id="retail-leverage" 
          title="4. Options Frenzy & Retail Leverage Accumulation" 
          icon={Zap}
          colorClass="from-orange-400 to-red-500"
        >
          <p>
            While the AI narrative provided the spark, the explosive velocity of the KOSPI&apos;s ascent was engineered by retail investors, colloquially known as "ants." By May 2026, active trading accounts surpassed 105 million.
          </p>
          
          <Callout title="The Margin Debt Bubble" type="warning">
            <p>Outstanding broker margin financing balances reached a record high of approximately <strong>38.6 trillion won ($26 billion)</strong> by June 2026. This ecosystem of highly levered derivatives pushed implied volatility off the charts. The South Korean volatility index (VKOSPI) repeatedly spiked into extreme territory, climbing from the 50s to peak at approximately 89.</p>
          </Callout>

          <p>
            The extreme accumulation of retail leverage transformed the market into a fragile glass floor; it provided immense upward momentum, but virtually guaranteed an uncontrollable cascade of forced liquidations upon any downward price shock.
          </p>
        </Section>

        <Section 
          id="etf-catalyst" 
          title="5. Catalyst of Instability: Single-Stock Leveraged ETFs" 
          icon={Calculator}
          colorClass="from-rose-500 to-pink-600"
        >
          <p>
            The definitive tipping point occurred in late May 2026 with the regulatory approval of 16 domestic single-stock leveraged ETFs tied to Samsung Electronics and SK Hynix. Intended to repatriate capital from offshore markets, these 2x leveraged products were launched exactly as the market reached peak valuations and maximum volatility.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-slate-800">The Mathematics of Volatility Decay</h3>
          <p>
            2x leveraged ETFs are mathematically flawed as long-term investments in highly volatile environments due to negative compounding, known as "volatility decay." The leverage ratio must reset daily, systematically eroding the Net Asset Value (NAV).
          </p>

          <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse bg-white">
              <caption className="bg-slate-50 p-4 text-sm font-semibold text-slate-600 border-b border-slate-200">
                Table 2: Theoretical Volatility Decay on a 2x Leveraged ETF
              </caption>
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-4 font-semibold border-b border-slate-200">Trading Day</th>
                  <th className="p-4 font-semibold border-b border-slate-200">Stock Price</th>
                  <th className="p-4 font-semibold border-b border-slate-200">Daily % Change</th>
                  <th className="p-4 font-semibold border-b border-slate-200">2x ETF % Change</th>
                  <th className="p-4 font-semibold border-b border-slate-200">2x ETF Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-4">Day 0 (Base)</td>
                  <td className="p-4">$100.00</td>
                  <td className="p-4">0.00%</td>
                  <td className="p-4">0.00%</td>
                  <td className="p-4">$100.00</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4">Day 1</td>
                  <td className="p-4 text-emerald-600 font-medium">$130.00</td>
                  <td className="p-4 text-emerald-600 font-medium">+30.0%</td>
                  <td className="p-4 text-emerald-600 font-bold">+60.0%</td>
                  <td className="p-4 font-medium">$160.00</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4">Day 2</td>
                  <td className="p-4 text-rose-600 font-medium">$100.00</td>
                  <td className="p-4 text-rose-600 font-medium">-23.1%</td>
                  <td className="p-4 text-rose-600 font-bold">-46.2%</td>
                  <td className="p-4 font-medium text-rose-600">$86.08</td>
                </tr>
                <tr className="bg-slate-50 font-bold border-t-2 border-slate-300">
                  <td className="p-4">Net Result</td>
                  <td className="p-4">$100.00 (Flat)</td>
                  <td className="p-4">0.00%</td>
                  <td className="p-4 text-rose-600">-13.92%</td>
                  <td className="p-4 text-rose-600">$86.08</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500 italic mt-2">
            *Note how the underlying stock returns to $100 (breakeven), but the 2x ETF investor permanently loses nearly 14% of their principal.
          </p>
        </Section>

        <Section 
          id="quant-mechanics" 
          title="6. Quantitative Mechanics & Feedback Loops" 
          icon={Activity}
          colorClass="from-blue-500 to-cyan-500"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="flex items-center gap-2 text-xl font-bold text-slate-800 mb-3">
                <ArrowRight className="w-5 h-5 text-blue-500" /> Daily Rebalancing
              </h4>
              <p className="text-slate-600">
                To maintain 2x leverage, ETFs must execute a mechanical strategy of <strong>buying high and selling low</strong> at the close of every session. A mere 5% swing in the underlying market triggered roughly $4.7 billion in mechanical rebalancing flows, forcefully dictating price action.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="flex items-center gap-2 text-xl font-bold text-slate-800 mb-3">
                <ArrowRight className="w-5 h-5 text-blue-500" /> Short Gamma Hedging
              </h4>
              <p className="text-slate-600">
                Dealers providing the total return swaps are placed in a "short gamma" position. As stock prices fall, dealers must mechanically short the underlying stock to maintain delta neutrality, causing further drops and more selling.
              </p>
            </div>

            <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="flex items-center gap-2 text-xl font-bold text-slate-800 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Algorithmic Trading & The "Sidecar"
              </h4>
              <p className="text-slate-600">
                The sheer velocity of mechanical flows triggered automated market safeguards. The Korea Exchange "sidecar" (which suspends algorithmic trading) was triggered a staggering <strong>37 times</strong> by mid-July, vastly surpassing the record of 26 set during the entire 2008 global financial crisis.
              </p>
            </div>
          </div>
        </Section>

        <Section 
          id="collapse" 
          title="7. The Margin Call Storm & July Collapse" 
          icon={TrendingDown}
          colorClass="from-red-600 to-rose-700"
        >
          <p>
            In July 2026, the ecosystem transitioned rapidly from a euphoric rally into a vicious, self-sustaining deleveraging event. 
          </p>

          <div className="my-6 space-y-4">
            <h4 className="font-bold text-xl text-slate-800">The Catalysts:</h4>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li><strong>Bank of Korea Policy Action:</strong> Raised benchmark policy rate by 25 bps, increasing the cost of carrying margin debt.</li>
              <li><strong>Global Sell-Off:</strong> Deep doubts regarding the durability of AI capital expenditures began to surface globally.</li>
              <li><strong>Geopolitical Tensions:</strong> Middle East instability drove crude oil prices higher, threatening the energy-reliant South Korean economy.</li>
            </ul>
          </div>

          <Callout title="The Liquidation Cascade" type="danger">
            <p>
              Between July 1 and July 15, brokerages executed a staggering 512 billion KRW in forced reverse trades. More than <strong>1.2 million leveraged retail accounts</strong> triggered margin calls, and up to 360,000 accounts were completely liquidated. Roughly one in every 30 working-age adults in South Korea received a margin call. Both SK Hynix and Samsung suffered brutal drawdowns exceeding 30%.
            </p>
          </Callout>
        </Section>

        <Section 
          id="spillover" 
          title="8. Global Spillover & ADR Dislocation" 
          icon={Globe}
          colorClass="from-indigo-500 to-blue-600"
        >
          <p>
            Amidst this domestic volatility, SK Hynix executed a highly anticipated $26.5 billion ADR listing on the U.S. Nasdaq—the second-largest U.S. equity offering in history. However, a catastrophic pricing dislocation occurred.
          </p>
          <p className="mt-4">
            While domestic margin calls forced Seoul-listed SK Hynix shares down 15%, the U.S. ADRs were heavily bought by institutions. Due to regulatory conversion limits, arbitrageurs could not close the gap, causing the ADR premium to surge over <strong>50% above the Seoul common stock</strong>.
          </p>
          <p className="mt-4">
            The contagion infected global markets. Algorithms identified the downward momentum, causing massive drops in peers like Kioxia (Japan) and TSMC (Taiwan), dragging the global Philadelphia Semiconductor Index (SOX) down 19%.
          </p>
        </Section>

        <Section 
          id="factor-rotation" 
          title="9. Global Quantitative Factor Rotation" 
          icon={Briefcase}
          colorClass="from-teal-500 to-emerald-600"
        >
          <p>
            The crisis catalyzed a massive quantitative style rotation across Wall Street. Capital aggressively fled the crowded <strong>Momentum</strong> factor (high-beta AI winners) and systematically rotated into the <strong>Quality</strong> factor (the "Quant Safety Trade").
          </p>

          <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse bg-white">
              <caption className="bg-slate-50 p-4 text-sm font-semibold text-slate-600 border-b border-slate-200">
                Table 3: Microstructural Contrast in Quantitative Styles (July 2026)
              </caption>
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-4 font-semibold border-b border-slate-200">Characteristic</th>
                  <th className="p-4 font-semibold border-b border-slate-200">Momentum Factor (Pre-Crash)</th>
                  <th className="p-4 font-semibold border-b border-slate-200">Quality Factor (The Rotation)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-800">Primary Alpha Driver</td>
                  <td className="p-4 text-rose-700">Price strength over trailing 6-12 months</td>
                  <td className="p-4 text-emerald-700 font-medium">Corporate financial resilience, fundamental health</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-800">Underlying Leverage</td>
                  <td className="p-4 text-rose-700">High structural and systemic leverage</td>
                  <td className="p-4 text-emerald-700 font-medium">Low corporate debt, stable cash flows</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-800">Crowding Risk</td>
                  <td className="p-4 text-rose-700">Extremely high (High-beta AI consensus)</td>
                  <td className="p-4 text-emerald-700 font-medium">Low (Historically under-allocated)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-800">Performance Profile</td>
                  <td className="p-4 text-rose-700">Prone to violent, synchronized stop-outs</td>
                  <td className="p-4 text-emerald-700 font-medium">Defensive; isolates returns from directional panics</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section 
          id="regulations" 
          title="10. Regulatory Interventions" 
          icon={Shield}
          colorClass="from-slate-700 to-slate-900"
        >
          <p>
            Facing severe political pressure, the Financial Services Commission (FSC) implemented decisive measures to curb speculation without triggering an immediate liquidity vacuum:
          </p>
          <ul className="grid sm:grid-cols-2 gap-4 mt-6">
            <li className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
              <div className="bg-slate-200 p-1.5 rounded-lg mt-0.5"><Shield className="w-4 h-4 text-slate-700"/></div>
              <span><strong>Suspension of New Listings:</strong> Halted all approvals for new single-stock leveraged ETFs.</span>
            </li>
            <li className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
              <div className="bg-slate-200 p-1.5 rounded-lg mt-0.5"><Calculator className="w-4 h-4 text-slate-700"/></div>
              <span><strong>Tripling Minimum Margin:</strong> Raised required cash balance to 30M won to price out undercapitalized speculators.</span>
            </li>
            <li className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
              <div className="bg-slate-200 p-1.5 rounded-lg mt-0.5"><Activity className="w-4 h-4 text-slate-700"/></div>
              <span><strong>LP Accountability:</strong> Mandated strict management of ETF NAV tracking errors during stress.</span>
            </li>
            <li className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
              <div className="bg-slate-200 p-1.5 rounded-lg mt-0.5"><BookOpen className="w-4 h-4 text-slate-700"/></div>
              <span><strong>Marketing Bans:</strong> Banned promotions and enforced mandatory risk education on volatility decay.</span>
            </li>
          </ul>
        </Section>

        <Section 
          id="lessons" 
          title="11. Core Lessons for Quantitative Finance" 
          icon={BookOpen}
          colorClass="from-blue-600 to-purple-600"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
              <h4 className="text-xl font-bold text-blue-900 mb-3">Leverage Distorts Fundamentals</h4>
              <p className="text-blue-800/80 leading-relaxed">
                The AI narrative was sound, and corporate earnings remained strong. But when market returns reflect the cost of sustaining margin debt rather than earnings, microstructural collapse is mathematically inevitable.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
              <h4 className="text-xl font-bold text-purple-900 mb-3">Concentration is Systemic Risk</h4>
              <p className="text-purple-800/80 leading-relaxed">
                Permitting double-leveraged speculation on two stocks that control 50% of an index creates a synthetic weapon of mass financial destruction, rendering the entire national benchmark brittle.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100">
              <h4 className="text-xl font-bold text-emerald-900 mb-3">Mechanical Overwhelm</h4>
              <p className="text-emerald-800/80 leading-relaxed">
                Daily rebalancing requirements and short gamma hedging created synthetic supply and demand that completely decoupled from actual asset value, crushing traditional fundamental analysis.
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100">
              <h4 className="text-xl font-bold text-amber-900 mb-3">Dynamic Factor Modeling</h4>
              <p className="text-amber-800/80 leading-relaxed">
                Crowded trades carry extreme asymmetric risk. Quantitative models must incorporate strict balance sheet parameters to pivot quickly to "Quality" factors and insulate portfolios against deleveraging spirals.
              </p>
            </div>
          </div>
        </Section>

        </main>

        {/* Call to Action - Podcast and Google Doc */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl my-8 text-center max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

        {/* Footer */}
        <footer className="text-center text-slate-500 mt-12 py-8 border-t border-slate-200 max-w-5xl mx-auto px-6">
          <p>© 2026 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.</p>
        </footer>
      </div>
    </>
  );
}
