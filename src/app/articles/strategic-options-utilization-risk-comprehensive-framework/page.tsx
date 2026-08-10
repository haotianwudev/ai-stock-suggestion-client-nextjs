'use client';

import React from 'react';
import { Shield, TrendingUp, DollarSign, Activity, AlertTriangle, Zap, Layers, MousePointerClick, PieChart, Target, AlertOctagon, Clock, CheckCircle2, XCircle, Lock, Unlock } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

// --- Components ---
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-serif text-2xl md:text-3xl mb-6 text-gray-900 dark:text-white">{children}</h2>
);

const Card = ({ title, children, icon: Icon }: {
  title: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ size?: number }>;
}) => (
  <div className="relative overflow-hidden rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
    <div className="inline-flex items-center justify-center p-3 rounded-lg mb-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
      {Icon && <Icon size={24} />}
    </div>
    <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-3">{title}</h3>
    <div className="text-gray-600 dark:text-gray-400 leading-relaxed">{children}</div>
  </div>
);

const GreekCard = ({ symbol, name, definition, rule }: {
  symbol: string;
  name: string;
  definition: string;
  rule: string;
}) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border-l-4 border-[#A8672E] dark:border-[#D08F52] p-5">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-serif text-xl text-gray-900 dark:text-white">{name}</h3>
      <span className="text-2xl font-serif text-gray-300 dark:text-gray-700">{symbol}</span>
    </div>
    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2 uppercase tracking-wider">Definition</p>
    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{definition}</p>
    <div className="bg-gray-50 dark:bg-gray-800/60 rounded-lg p-3 text-sm">
      <span className="font-semibold text-gray-900 dark:text-white block mb-1">Trader&apos;s Rule:</span>
      <span className="text-gray-600 dark:text-gray-400">{rule}</span>
    </div>
  </div>
);

const outlookTone: Record<string, 'pos' | 'neg' | 'accent'> = {
  Bullish: 'pos',
  Bearish: 'neg',
  Neutral: 'accent',
};

const outlookBadgeClass: Record<'pos' | 'neg' | 'accent', string> = {
  pos: 'bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 text-[#1D8A70] dark:text-[#3CBF9C]',
  neg: 'bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A]',
  accent: 'bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]',
};

const StrategyRow = ({ title, outlook, rationale, risk, type }: {
  title: string;
  outlook: string;
  rationale: string;
  risk: string;
  type: string;
}) => {
  const tone = outlookTone[type] ?? 'accent';
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4 mb-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${outlookBadgeClass[tone]}`}>{outlook}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{rationale}</p>
        </div>
        <div className="md:w-1/3 text-sm text-[#BC4128] dark:text-[#E2694A] bg-[#BC4128]/5 dark:bg-[#E2694A]/5 px-3 py-2 rounded border border-[#BC4128]/20 dark:border-[#E2694A]/20">
          <strong>Risk:</strong> {risk}
        </div>
      </div>
    </div>
  );
};

const PayoffDiagram = ({ type }: { type: string }) => {
  const renderPath = () => {
    switch (type) {
      case 'long_call':
        return <path d="M 10 80 L 50 80 L 90 10" stroke="currentColor" strokeWidth="3" fill="none" />;
      case 'long_put':
        return <path d="M 10 10 L 50 80 L 90 80" stroke="currentColor" strokeWidth="3" fill="none" />;
      case 'covered_call':
        return <path d="M 10 80 L 50 40 L 90 40" stroke="currentColor" strokeWidth="3" fill="none" />;
      case 'iron_condor':
        return <path d="M 10 80 L 30 80 L 40 40 L 60 40 L 70 80 L 90 80" stroke="currentColor" strokeWidth="3" fill="none" />;
      default: return null;
    }
  };

  return (
    <div className="h-32 w-full bg-gray-50 dark:bg-gray-800/60 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-100 dark:border-gray-800 text-[#A8672E] dark:text-[#D08F52]">
      <svg viewBox="0 0 100 100" className="w-full h-full p-4" preserveAspectRatio="none">
        <line x1="0" y1="80" x2="100" y2="80" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 2" />
        {renderPath()}
      </svg>
      <div className="absolute bottom-1 left-2 text-[10px] text-gray-400 dark:text-gray-500">Stock Price &rarr;</div>
      <div className="absolute top-2 left-1 text-[10px] text-gray-400 dark:text-gray-500">Profit</div>
    </div>
  );
};

export default function StrategicOptionsUtilizationRisk() {
  return (
    <ArticleFrame
      slug="strategic-options-utilization-risk-comprehensive-framework"
      additionalDisclaimer="Options trading involves substantial risk and is not suitable for all investors."
    >
      <div className="max-w-5xl mx-auto space-y-20 text-gray-800 dark:text-gray-200">
        <InfographicSlot alt="Strategic Options Utilization Framework Infographic" />

        {/* 1. Anatomy of a Contract */}
        <section>
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <div className="flex-1">
              <SectionTitle>Anatomy of a Contract</SectionTitle>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Before trading, you must decode the ticker. An option contract represents the right to buy or sell <strong>100 shares</strong> of the underlying asset.</p>
            </div>
            <div className="bg-[#14171B] dark:bg-[#05070A] text-white p-6 rounded-xl font-mono text-xl md:text-2xl shadow-lg">
              <span className="text-[#D08F52] font-bold">SPY</span> <span className="text-gray-400 mx-2">240119</span> <span className="text-[#3CBF9C]">C</span> <span className="text-gray-300 mx-2">480.00</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border-t-4 border-[#A8672E] dark:border-[#D08F52] shadow-sm">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Underlying</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">The stock or ETF (e.g., SPY) that the option controls.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border-t-4 border-[#A8672E] dark:border-[#D08F52] shadow-sm">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Expiration</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">The date the contract ceases to exist. (YY/MM/DD).</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border-t-4 border-[#A8672E] dark:border-[#D08F52] shadow-sm">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Type</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400"><strong>Call</strong> (Right to Buy) or <strong>Put</strong> (Right to Sell).</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border-t-4 border-[#A8672E] dark:border-[#D08F52] shadow-sm">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Strike Price</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">The specific price at which the deal is executed.</p>
            </div>
          </div>
        </section>

        {/* 2. Order Lifecycle Mechanics */}
        <section className="bg-[#A8672E]/5 dark:bg-[#D08F52]/5 rounded-xl p-6 md:p-10">
          <SectionTitle>Order Mechanics &amp; Lifecycle</SectionTitle>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Unlock size={18} /> Opening a Position
              </h3>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-[#A8672E]/20 dark:border-[#D08F52]/20">
                  <span className="inline-block bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 text-[#1D8A70] dark:text-[#3CBF9C] text-xs font-bold px-2 py-1 rounded mb-2">Buy To Open (BTO)</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">You pay a <strong>Debit</strong> to buy a Call or Put. You own the contract and control the rights.</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Max Risk: Amount Paid.</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-[#A8672E]/20 dark:border-[#D08F52]/20">
                  <span className="inline-block bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A] text-xs font-bold px-2 py-1 rounded mb-2">Sell To Open (STO)</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">You receive a <strong>Credit</strong> to sell (write) a contract. You are obligated to fulfill terms if assigned.</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Max Risk: Often Undefined or High.</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Lock size={18} /> Closing a Position
              </h3>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-[#A8672E]/20 dark:border-[#D08F52]/20">
                  <span className="inline-block bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] text-xs font-bold px-2 py-1 rounded mb-2">Sell To Close (STC)</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Selling a contract you previously bought. This realizes your profit or loss.</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-[#A8672E]/20 dark:border-[#D08F52]/20">
                  <span className="inline-block bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] text-xs font-bold px-2 py-1 rounded mb-2">Buy To Close (BTC)</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Buying back a contract you previously wrote. This exits your obligation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The Core Decision Matrix -- a genuine dichotomy, uses the shared comparison card */}
        <section>
          <ComparisonGrid>
            <ComparisonCard tone="pos" title="When to Use Options">
              <div className="flex gap-3">
                <Shield className="text-[#1D8A70] dark:text-[#3CBF9C] shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white font-serif">Hedging Risk</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Protect existing positions from adverse price movements using Protective Puts.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <DollarSign className="text-[#1D8A70] dark:text-[#3CBF9C] shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white font-serif">Income Generation</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Sell Covered Calls or Cash-Secured Puts to extract yield from stagnant assets.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <TrendingUp className="text-[#1D8A70] dark:text-[#3CBF9C] shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white font-serif">Speculation with Leverage</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Control larger positions with less capital (LEAPS) for defined risk exposure.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Activity className="text-[#1D8A70] dark:text-[#3CBF9C] shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white font-serif">Volatility Betting</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Profit from the magnitude of movement (or lack thereof) rather than just direction.</p>
                </div>
              </div>
            </ComparisonCard>

            <ComparisonCard tone="neg" title="When NOT to Use Options">
              {[
                { title: "Get Rich Quick Schemes", desc: "Options require skill. Gambling mentality leads to ruin." },
                { title: "Undefined Risk", desc: "Never trade what you can't afford to lose completely." },
                { title: "Illiquid Markets", desc: "Wide bid-ask spreads instantly destroy statistical edge." },
                { title: "Without a Strategy", desc: "Random buying leads to losses via Theta decay." },
                { title: "Ignoring the Greeks", desc: "Don't trade instruments you don't mathematically understand." }
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <AlertTriangle className="text-[#BC4128] dark:text-[#E2694A] shrink-0 mt-0.5" size={18} />
                  <div>
                    <strong className="block text-gray-900 dark:text-white">{item.title}</strong>
                    <span className="text-gray-600 dark:text-gray-400">{item.desc}</span>
                  </div>
                </div>
              ))}
            </ComparisonCard>
          </ComparisonGrid>
        </section>

        {/* 4. Detailed Strategic Pillars & Visuals */}
        <section>
          <div className="text-center mb-10">
            <span className="text-[#A8672E] dark:text-[#D08F52] font-semibold tracking-wide uppercase text-sm">Strategic Applications</span>
            <SectionTitle>Four Pillars of Deployment</SectionTitle>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Hedging" icon={Shield}>
              <p className="mb-2"><strong>Goal:</strong> Portfolio Defense</p>
              <p className="text-sm mb-4">Transfer risk to a counterparty. Like fire insurance, you pay a premium to avoid catastrophic loss.</p>
              <PayoffDiagram type="long_put" />
              <div className="space-y-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Key Strategies</span>
                <span className="inline-block bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] text-xs px-2 py-1 rounded mr-2">Protective Puts</span>
                <span className="inline-block bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] text-xs px-2 py-1 rounded">Collars</span>
              </div>
            </Card>

            <Card title="Income" icon={DollarSign}>
              <p className="mb-2"><strong>Goal:</strong> Yield Enhancement</p>
              <p className="text-sm mb-4">Extract cash flow from stagnant assets. &ldquo;Rent out&rdquo; your stocks or cash to the market.</p>
              <PayoffDiagram type="covered_call" />
              <div className="space-y-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Key Strategies</span>
                <span className="inline-block bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] text-xs px-2 py-1 rounded mr-2">Covered Calls</span>
                <span className="inline-block bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] text-xs px-2 py-1 rounded">Cash-Secured Puts</span>
              </div>
            </Card>

            <Card title="Speculation" icon={Zap}>
              <p className="mb-2"><strong>Goal:</strong> Leverage &amp; Growth</p>
              <p className="text-sm mb-4">Use LEAPS to control large notional value with less capital. Defined risk with convex upside.</p>
              <PayoffDiagram type="long_call" />
              <div className="space-y-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Key Strategies</span>
                <span className="inline-block bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] text-xs px-2 py-1 rounded mr-2">LEAPS</span>
                <span className="inline-block bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] text-xs px-2 py-1 rounded">Vertical Spreads</span>
              </div>
            </Card>

            <Card title="Volatility" icon={Activity}>
              <p className="mb-2"><strong>Goal:</strong> Market Neutrality</p>
              <p className="text-sm mb-4">Treat volatility as an asset class. Profit from stasis (Iron Condor) or explosion (Straddles).</p>
              <PayoffDiagram type="iron_condor" />
              <div className="space-y-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Key Strategies</span>
                <span className="inline-block bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] text-xs px-2 py-1 rounded mr-2">Iron Condors</span>
                <span className="inline-block bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] text-xs px-2 py-1 rounded">Straddles</span>
              </div>
            </Card>
          </div>
        </section>

        {/* 5. Brokerage Approval Levels */}
        <section className="bg-white dark:bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
          <SectionTitle>Trading Approval Levels</SectionTitle>
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-500 dark:text-gray-400">Level 1</span>
                <Lock size={16} className="text-gray-400 dark:text-gray-500" />
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Covered</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Covered Calls &amp; Cash-Secured Puts. Lowest risk.</p>
            </div>
            <div className="p-4 bg-[#A8672E]/5 dark:bg-[#D08F52]/5 rounded-lg border border-[#A8672E]/20 dark:border-[#D08F52]/20">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-[#A8672E] dark:text-[#D08F52]">Level 2</span>
                <Unlock size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Long Options</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Buying Calls &amp; Puts. Defined risk (premium paid).</p>
            </div>
            <div className="p-4 bg-[#A8672E]/5 dark:bg-[#D08F52]/5 rounded-lg border border-[#A8672E]/20 dark:border-[#D08F52]/20">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-[#A8672E] dark:text-[#D08F52]">Level 3</span>
                <Unlock size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Spreads</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Verticals, Iron Condors. Requires margin.</p>
            </div>
            <div className="p-4 bg-[#BC4128]/5 dark:bg-[#E2694A]/5 rounded-lg border border-[#BC4128]/20 dark:border-[#E2694A]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#BC4128] dark:bg-[#E2694A] text-white dark:text-[#14171B] text-[10px] px-2 py-1 rounded-bl">Expert</div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-[#BC4128] dark:text-[#E2694A]">Level 4</span>
                <Unlock size={16} className="text-[#BC4128] dark:text-[#E2694A]" />
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Naked</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Selling naked calls/puts. Unlimited risk.</p>
            </div>
          </div>
        </section>

        {/* 6. The Greeks Section */}
        <section className="bg-white dark:bg-gray-900 rounded-xl p-6 md:p-10 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <PieChart className="text-[#A8672E] dark:text-[#D08F52]" />
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white">Understanding The Greeks</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">The mathematical sensitivities that drive option pricing. Ignoring these is a primary cause of retail capital destruction.</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            <GreekCard
              symbol="Δ"
              name="Delta"
              definition="Rate of change of option price per $1 move in underlying stock."
              rule="Roughly equals probability of expiring In-The-Money."
            />
            <GreekCard
              symbol="Γ"
              name="Gamma"
              definition="Rate of change of Delta. Acceleration of the position."
              rule="Highest for ATM options near expiration. Watch out for 0DTE risks!"
            />
            <GreekCard
              symbol="Θ"
              name="Theta"
              definition="Time decay. The rate at which an option loses value as time passes."
              rule="Decay accelerates in the final 30 days. Don't hold short-term OTM 'hope' trades."
            />
            <GreekCard
              symbol="ν"
              name="Vega"
              definition="Sensitivity to Implied Volatility (IV) changes."
              rule="Avoid buying high Vega options right before earnings (IV Crush)."
            />
            <GreekCard
              symbol="ρ"
              name="Rho"
              definition="Sensitivity to interest rate changes."
              rule="Call prices rise with rates; Puts fall. Key for long-term LEAPS."
            />
          </div>
        </section>

        {/* 7. Danger Zone / Risks */}
        <section>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="md:w-1/3">
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <AlertOctagon className="text-[#BC4128] dark:text-[#E2694A]" size={28} />
                Structural Risks
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">While options offer sophisticated utility, specific market environments and structural conditions can turn them into hazardous speculation.</p>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-[#BC4128]/20 dark:border-[#E2694A]/20">
                <h4 className="font-semibold text-[#BC4128] dark:text-[#E2694A] mb-2">Case Study: &ldquo;Steamroller&rdquo;</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Selling naked options often has a high win rate (picking up pennies) but catastrophic tail risk (in front of a steamroller). See: OptionSellers.com collapse (2018).</p>
              </div>
            </div>
            <div className="md:w-2/3 grid sm:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border-l-4 border-[#BC4128] dark:border-[#E2694A]">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2 font-serif">
                  <Layers size={18} className="text-[#BC4128] dark:text-[#E2694A]" /> Liquidity Traps
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Wide bid-ask spreads in illiquid options act as an instant tax. If spread &gt; 1-2% of price, you start with a mathematical disadvantage that is hard to overcome.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border-l-4 border-[#BC4128] dark:border-[#E2694A]">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2 font-serif">
                  <Clock size={18} className="text-[#BC4128] dark:text-[#E2694A]" /> IV Crush
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Buying options before binary events (earnings) is dangerous. Even if you predict the direction right, the drop in volatility can crush the option&apos;s value.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border-l-4 border-[#BC4128] dark:border-[#E2694A]">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2 font-serif">
                  <MousePointerClick size={18} className="text-[#BC4128] dark:text-[#E2694A]" /> The 0DTE Addiction
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Zero Days to Expiration trading triggers dopamine loops similar to gambling. Extreme Gamma risk can wipe out accounts in minutes.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border-l-4 border-[#BC4128] dark:border-[#E2694A]">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2 font-serif">
                  <Target size={18} className="text-[#BC4128] dark:text-[#E2694A]" /> Wash Sale Rules
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Trading similar options within 30 days of a loss can disallow the tax deduction, leading to massive tax bills on phantom profits.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Strategy Table */}
        <section>
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white">Strategy Decision Framework</h2>
            <div className="hidden md:flex gap-2 text-sm">
              <span className="px-3 py-1 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 text-[#1D8A70] dark:text-[#3CBF9C] rounded-full">Bullish</span>
              <span className="px-3 py-1 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] rounded-full">Neutral</span>
              <span className="px-3 py-1 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A] rounded-full">Bearish</span>
            </div>
          </div>
          <div className="space-y-2">
            <StrategyRow
              title="Long Call / Bull Spread"
              type="Bullish"
              outlook="Aggressive"
              rationale="Leveraged upside participation."
              risk="100% loss of premium if stock stagnates."
            />
            <StrategyRow
              title="Cash-Secured Put"
              type="Bullish"
              outlook="Conservative"
              rationale="Paid to wait for a dip; lower entry price."
              risk="Assignment at price above market value during crash."
            />
            <StrategyRow
              title="Iron Condor / Covered Call"
              type="Neutral"
              outlook="Stagnant"
              rationale="Profit from time decay (Theta) and IV crush."
              risk="Volatility expansion or breakout beyond range."
            />
            <StrategyRow
              title="Protective Put"
              type="Bearish"
              outlook="Hedge"
              rationale="Floor on losses; unlimited upside remains."
              risk="Cost of premium (drag on returns)."
            />
            <StrategyRow
              title="Long Straddle / Strangle"
              type="Neutral"
              outlook="High Volatility"
              rationale="Profit from explosive move in either direction."
              risk="'IV Crush' after event; price stays within breakeven."
            />
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
