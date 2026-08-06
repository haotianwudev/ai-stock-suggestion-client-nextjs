'use client';

import React from 'react';
import { 
  Building2, TrendingUp, Layers, 
  ArrowRightLeft, Activity, ShieldAlert, Zap,
  Briefcase, LineChart, AlertTriangle, Scale, Clock
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

const SectionHeading = ({ icon: Icon, title, subtitle, colorClass }: { icon: any, title: string, subtitle?: string, colorClass: string }) => (
  <div className="mb-8">
    <div className={`inline-flex p-3 rounded-2xl ${colorClass} mb-4`}>
      <Icon className="w-8 h-8" />
    </div>
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
      {title}
    </h2>
    {subtitle && <p className="text-lg text-slate-600">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 hover:shadow-md transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

const InfoPill = ({ text, color = "bg-slate-100 text-slate-700" }: { text: string, color?: string }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
    {text}
  </span>
);

const GenesisSection = () => (
  <section className="py-16 bg-white border-t border-slate-100">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        icon={Building2} 
        title="The Genesis of an ETF" 
        subtitle="Launch Mechanics and Regulatory Frameworks"
        colorClass="bg-blue-100 text-blue-600"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Regulatory Foundations</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            Historically, launching an ETF required an individual &ldquo;exemptive order&rdquo; under the Investment Company Act of 1940, a notoriously slow process taking 12 to 18 months.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            The landscape transformed in September 2019 with <strong className="text-slate-900">SEC Rule 6c-11 (The &ldquo;ETF Rule&rdquo;)</strong>. It created a consistent framework permitting open-end ETFs to operate without individualized orders, provided they meet core conditions:
          </p>
          <ul className="space-y-3">
            {[
              "Daily Portfolio Transparency (holdings published before market open).",
              "Website Disclosures (premium/discount data, bid-ask spread, NAV).",
              "Custom Basket Policies (governing creation/redemption baskets).",
              "Data Retention (retained for a minimum of six years)."
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mt-0.5 mr-3">✓</span>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Layers className="w-5 h-5 mr-2 text-blue-500" /> Pathways to Market
          </h3>
          <div className="space-y-6">
            {[
              { title: "Proprietary Trust", time: "6-12 mos", cost: "$600k+", desc: "Requires building internal compliance and infrastructure from scratch. For massive institutions." },
              { title: "Series Trust", time: "4-6 mos", cost: "$100k-$150k", desc: "Multiple independent ETFs share a common trust and service providers, mutualizing fixed costs." },
              { title: "White-Label Platform", time: "3-5 mos", cost: "$50k-$75k", desc: "Turn-key solution. Platform handles legal/compliance; issuer focuses on strategy and marketing." }
            ].map((path, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-900">{path.title}</h4>
                  <div className="flex space-x-2">
                    <InfoPill text={path.time} color="bg-orange-100 text-orange-700" />
                    <InfoPill text={path.cost} color="bg-emerald-100 text-emerald-700" />
                  </div>
                </div>
                <p className="text-sm text-slate-600">{path.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ActivePassiveSection = () => (
  <section className="py-16 bg-slate-50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        icon={Scale} 
        title="Architectural Paradigms" 
        subtitle="Active Versus Passive Management"
        colorClass="bg-purple-100 text-purple-600"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-t-4 border-t-purple-500">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
            <LineChart className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Passive Management</h3>
          <p className="text-slate-700 mb-6">
            Operates on the efficient market hypothesis, aiming to replicate broad market beta. The primary mandate is to minimize <strong>tracking error</strong>.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center text-slate-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Rules-based index methodologies
            </li>
            <li className="flex items-center text-slate-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Extremely low portfolio turnover
            </li>
            <li className="flex items-center text-slate-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Compressed expense ratios (often &lt; 0.10%)
            </li>
          </ul>
        </Card>

        <Card className="border-t-4 border-t-pink-500">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
            <Briefcase className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Active Management</h3>
          <p className="text-slate-700 mb-6">
            Seeks to outperform benchmarks through discretionary selection and tactical allocation. Carries elevated expense ratios (0.50% - 1.50%).
          </p>
          <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 mb-4">
            <h4 className="font-semibold text-pink-900 mb-2">The ANT Solution</h4>
            <p className="text-sm text-pink-800">
              Daily transparency risks &ldquo;front-running&rdquo;. <strong>Active Non-Transparent (ANT)</strong> ETFs publish a &ldquo;proxy basket&rdquo; to protect intellectual property while allowing market makers to price efficiently.
            </p>
          </div>
        </Card>
      </div>
    </div>
  </section>
);

const DualMarketSection = () => (
  <section className="py-16 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        icon={ArrowRightLeft} 
        title="Dual-Market Architecture" 
        subtitle="The engine behind ETF liquidity and accurate pricing"
        colorClass="bg-emerald-100 text-emerald-600"
      />
      
      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <div>
            <h3 className="text-2xl font-bold text-emerald-400 mb-4 border-b border-slate-700 pb-2">Secondary Market</h3>
            <p className="text-slate-300 mb-6">
              The public venue (NYSE, NASDAQ) where retail and institutional investors trade existing shares. Prices fluctuate based on supply and demand, creating a bid-ask spread.
            </p>
            <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
              <h4 className="text-emerald-300 font-semibold mb-2">Market Makers (DLPs)</h4>
              <p className="text-sm text-slate-400">
                Ensure liquidity by continuously posting two-sided quotes. They profit from the spread and manage inventory risk.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4 border-b border-slate-700 pb-2">Primary Market</h3>
            <p className="text-slate-300 mb-6">
              Exclusive venue for <strong>Authorized Participants (APs)</strong>. Governs total supply through the Creation and Redemption mechanism based on the PCF (Portfolio Composition File).
            </p>
            
            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-start">
                <div className="mt-1 mr-3 text-blue-400"><Activity className="w-5 h-5"/></div>
                <div>
                  <h4 className="font-semibold text-blue-300">Creation Mechanism (Premium)</h4>
                  <p className="text-xs text-slate-400 mt-1">ETF trades above NAV → AP buys underlying shares → Delivers to Sponsor → Receives new ETF shares to sell.</p>
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-start">
                <div className="mt-1 mr-3 text-rose-400"><Activity className="w-5 h-5"/></div>
                <div>
                  <h4 className="font-semibold text-rose-300">Redemption Mechanism (Discount)</h4>
                  <p className="text-xs text-slate-400 mt-1">ETF trades below NAV → AP buys ETF shares → Delivers to Sponsor → Receives underlying shares to sell.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TaxAndRebalanceSection = () => (
  <section className="py-16 bg-slate-50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        icon={Zap} 
        title="Tax Efficiency & The Heartbeat Trade" 
        subtitle="Exploiting the in-kind exemption for superior compounding"
        colorClass="bg-amber-100 text-amber-600"
      />

      <div className="mb-12">
        <p className="text-lg text-slate-700 mb-6">
          Unlike mutual funds that must sell assets (triggering capital gains) to meet redemptions, ETFs utilize <strong>Section 852(b)(6)</strong>. In-kind distribution of appreciated property is not a taxable event. The pinnacle of this engineering is the <strong>Heartbeat Trade</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-16">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-amber-200 -z-0 -translate-y-1/2"></div>
        
        {[
          { day: "Day T", title: "The Injection", desc: "Portfolio manager coordinates with an AP. AP injects massive capital via a creation unit, expanding AUM for a single day." },
          { day: "Day T+1", title: "Custom Basket", desc: "Manager constructs a restricted 'custom redemption PCF' containing ONLY the highly appreciated, low-cost-basis securities they want to offload." },
          { day: "Day T+2", title: "The Flush", desc: "Trades settle. AP redeems the shares created earlier, taking delivery of the custom basket. Embedded capital gains are completely flushed out tax-free." }
        ].map((step, i) => (
          <div key={i} className="relative z-10 bg-white rounded-2xl shadow-md p-6 border-2 border-amber-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-lg border-4 border-white">
              {step.day}
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
            <p className="text-sm text-slate-600">{step.desc}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Clock className="w-6 h-6 mr-2 text-rose-500" /> Rebalancing &amp; Sunshine Trading
        </h3>
        <Card className="bg-rose-50 border-rose-100">
          <p className="text-slate-800 mb-4">
            Index reconstitution creates predictable &ldquo;sunshine trading.&rdquo; Because changes are announced in advance, hedge funds <strong>front-run</strong> passive ETFs. 
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>New index entrants rise ~67 bps before rebalance due to front-running.</li>
            <li>ETFs are forced to buy at the top via Market On Close (MOC) orders.</li>
            <li>Constituents typically fall ~20 bps in the following 20 days.</li>
            <li>This drag costs U.S. passive equity ETFs ~14.6 bps annually.</li>
          </ul>
        </Card>
      </div>
    </div>
  </section>
);

const TradingStrategiesSection = () => (
  <section className="py-16 bg-white border-t border-slate-100">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        icon={TrendingUp} 
        title="Execution Strategies & Traps" 
        subtitle="Navigating low liquidity, volatility decay, and contango"
        colorClass="bg-indigo-100 text-indigo-600"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Tactics for Low-Liquidity ETFs</h3>
          <p className="text-slate-600 mb-6">
            An ETF&apos;s true liquidity is determined by its underlying securities, not its secondary volume. However, poor execution destroys returns.
          </p>
          
          <div className="space-y-4">
            {[
              { title: "Limit Orders are Mandatory", desc: "Never use market orders. Set limit near the midpoint to signal algorithmic market makers to step in." },
              { title: "Monitor the iNAV", desc: "Check Intraday Indicative Value (updated every 15s) to avoid buying at massive premiums during distress." },
              { title: "Avoid Open & Close", desc: "First and last 30 mins have extreme volatility. Trade mid-day when underlying markets are fully priced." },
              { title: "Institutional NAV Trades", desc: "Institutions use RFQ platforms to bypass secondary spreads entirely, executing directly at end-of-day NAV." }
            ].map((tactic, i) => (
              <div key={i} className="flex p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                <ShieldAlert className="w-6 h-6 text-indigo-500 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">{tactic.title}</h4>
                  <p className="text-sm text-slate-700 mt-1">{tactic.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">The Volatility Decay Trap</h3>
          <p className="text-slate-600 mb-6">
            Leveraged/Inverse ETFs deliver multiples for a <em>single trading day</em>. Daily reset mechanics cause mathematical decay in choppy markets.
          </p>
          
          <Card className="bg-slate-900 text-white border-none mb-8">
            <h4 className="text-rose-400 font-bold mb-4">Math Example: 2x Leveraged ETF</h4>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span>Start:</span>
                <span>Index: $100 | 2x ETF: $100</span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span>Day 1 (Index drops 10%):</span>
                <span>Index: $90 | 2x ETF: $80 (-20%)</span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span>Day 2 (Index rebounds 11.11%):</span>
                <span>Index: $100 | 2x ETF: $97.78 (+22.22% of $80)</span>
              </div>
              <div className="pt-2 text-rose-300 font-bold">
                Result: Index is FLAT (0%). ETF lost 2.22%.
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="bg-rose-50 border-l-4 border-rose-500 p-6 md:p-8 rounded-r-3xl">
        <h3 className="text-2xl font-bold text-rose-900 mb-4 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-3 text-rose-600" />
          The USO Anomaly &amp; Futures Contango
        </h3>
        <p className="text-rose-800 mb-4">
          Commodity ETFs like USO use futures contracts. Rolling expiring contracts into higher-priced next-month contracts (<strong>Contango</strong>) creates a persistent negative roll yield.
        </p>
        <p className="text-rose-800">
          In April 2020, extreme oil oversupply pushed futures into &ldquo;super-contango&rdquo; (prices went negative to -$37.63). USO swelled with retail cash, hit regulatory position limits, and was forced to halt creations and buy contracts far down the futures curve. <strong className="text-rose-900">Result: It completely decoupled from the spot price of oil</strong>, trading at a massive premium to an impaired NAV, eventually requiring an 8-for-1 reverse split.
        </p>
      </div>
    </div>
  </section>
);

export default function ETFArchitecturePage() {
  return (
    <ArticleFrame slug="architecture-exchange-traded-funds-mechanisms-trading-strategies-structural-risks">
      <InfographicSlot 
        alt="ETF Architecture Infographic" 
        label="Ecosystem Overview"
      />
      <GenesisSection />
      <ActivePassiveSection />
      <DualMarketSection />
      <TaxAndRebalanceSection />
      <TradingStrategiesSection />
    </ArticleFrame>
  );
}
