'use client';

import React from 'react';
import {
  ShieldCheck, TrendingUp, AlertCircle, Scale,
  Landmark, FileText, Lock, DollarSign, Activity, BookOpen,
  ExternalLink, Maximize2,
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// ─── Reusable Components ──────────────────────────────────────────────────────

const SectionCard = ({
  id, icon: Icon, title, gradient, children,
}: {
  id?: string;
  icon: React.ElementType;
  title: string;
  gradient: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 mb-12 hover:shadow-2xl transition-shadow duration-300"
  >
    <div className={`h-2 w-full bg-gradient-to-r ${gradient}`} />
    <div className="p-8 md:p-12">
      <div className="flex items-center gap-4 mb-8">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
      </div>
      <div className="space-y-6 text-slate-600 text-lg leading-relaxed">{children}</div>
    </div>
  </section>
);

const ScenarioCard = ({
  title, status, description, calculation,
}: {
  title: string;
  status: 'loss' | 'neutral' | 'profit';
  description: string;
  calculation: string;
}) => {
  const borderColor = {
    loss: 'border-l-rose-500',
    neutral: 'border-l-blue-500',
    profit: 'border-l-emerald-500',
  }[status];
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 ${borderColor} mb-4`}>
      <h4 className="text-xl font-bold text-slate-800 mb-2">{title}</h4>
      <p className="text-slate-600 mb-4">{description}</p>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-sm text-slate-700 whitespace-pre-wrap">
        {calculation}
      </div>
    </div>
  );
};

const ComparisonTable = () => (
  <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-blue-100">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-blue-50 text-blue-900 border-b border-blue-200">
          <th className="p-4 font-bold">Strategic Feature</th>
          <th className="p-4 font-bold border-l border-blue-100">Traditional Equity Collar</th>
          <th className="p-4 font-bold border-l border-blue-100">Margin Loan / SBLOC</th>
          <th className="p-4 font-bold border-l border-blue-100">Prepaid Variable Share Forward</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {[
          {
            feature: 'Immediate Liquidity',
            collar: 'None (Requires outside capital)',
            margin: 'Variable (Usually capped at 50%)',
            pvsf: { text: 'High (75% to 90% of Spot)', highlight: 'emerald' },
          },
          {
            feature: 'Immediate Tax Event',
            collar: 'No',
            margin: 'No',
            pvsf: { text: 'No (Deferred until maturity)', highlight: null },
          },
          {
            feature: 'Downside Protection',
            collar: { text: 'Yes (Hard Floor)', highlight: 'emerald' },
            margin: { text: 'None (Severe Margin Risk)', highlight: 'rose' },
            pvsf: { text: 'Yes (via Embedded Put)', highlight: 'emerald' },
          },
          {
            feature: 'Upside Participation',
            collar: 'Capped at Call Strike',
            margin: 'Unlimited',
            pvsf: { text: 'Capped at Call Strike', highlight: null },
          },
        ].map((row, i) => (
          <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
            <td className="p-4 font-medium text-slate-800">{row.feature}</td>
            {[row.collar, row.margin, row.pvsf].map((cell, j) => {
              const isObj = typeof cell === 'object' && cell !== null && 'text' in cell;
              const text = isObj ? (cell as { text: string; highlight: string | null }).text : cell as string;
              const highlight = isObj ? (cell as { text: string; highlight: string | null }).highlight : null;
              return (
                <td
                  key={j}
                  className={`p-4 border-l border-slate-100 ${
                    highlight === 'emerald' ? 'font-bold text-emerald-600' :
                    highlight === 'rose' ? 'font-bold text-rose-500' :
                    'text-slate-600'
                  }`}
                >
                  {text}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StructuredLiquidityHedgingPage() {
  const googleDocUrl = 'https://docs.google.com/document/d/e/2PACX-1vQ7W9TR-5FXitlZiUfOer_4LWAfdEbzuh10uLX1Hta8eew5apemBl6--5-XXLOaTp4FAEtfyLEgF-hR/pub';

  return (
    <ArticleFrame slug="structured-liquidity-hedging-equity-collars-pvsf">
      <InfographicSlot alt="PVSF Infographic" />


        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 py-16">

          {/* Intro */}
          <div className="mb-16 text-lg text-slate-600 leading-relaxed text-center max-w-4xl mx-auto">
            The contemporary financial landscape presents a complex paradox for corporate founders and
            executives: <strong>massive paper wealth juxtaposed with an acute lack of liquid capital.</strong>{' '}
            Selling highly appreciated stock triggers punitive capital gains taxes, signals lack of
            confidence to the market, and may violate insider trading policies. Here is how financial
            engineering solves this triad of challenges.
          </div>

          {/* Section 1: Equity Collars */}
          <SectionCard
            id="equity-collars"
            icon={ShieldCheck}
            title="The Architecture of Equity Collars"
            gradient="from-emerald-500 to-teal-500"
          >
            <p>
              An equity collar is a definitive, multi-leg options strategy constructed to mathematically
              limit both the upside potential and the downside risk of a concentrated, long stock position.
              It acts as a protective wrapper.
            </p>

            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Lock size={20} className="text-emerald-600" /> The Zero-Cost Imperative
              </h3>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: '1. Long Stock', desc: 'The existing concentrated wealth the investor seeks to protect.', border: '' },
                  { label: '2. Long Put (The Floor)', desc: 'An out-of-the-money put option purchased to protect against catastrophic declines.', border: 'border-b-4 border-rose-400' },
                  { label: '3. Short Call (The Cap)', desc: 'An out-of-the-money call option sold. The premium collected pays for the put, making it a "zero-cost" collar.', border: 'border-b-4 border-emerald-400' },
                ].map((item) => (
                  <div key={item.label} className={`bg-white p-5 rounded-2xl shadow-sm ${item.border}`}>
                    <span className="block text-emerald-600 font-bold mb-2">{item.label}</span>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Numerical Implementation</h3>
              <p className="mb-6">
                Assume an investor holds <strong>100 shares</strong> of a security trading at a cost basis
                of <strong>$47.72</strong>. They execute a zero-cost collar by purchasing a{' '}
                <strong>$45 strike put</strong> and selling a <strong>$50 strike call</strong>.
              </p>
              <ScenarioCard
                title="Scenario A: Severe Market Decline (Price Drops to $41)"
                status="loss"
                description="The short call expires worthless. The protective put is deeply in-the-money and exercised. The shares are sold at the guaranteed $45 strike."
                calculation={`Maximum Loss = Initial Cost ($47.72) − Put Strike ($45.00) = $2.57 per share cap.`}
              />
              <ScenarioCard
                title="Scenario B: Range-Bound Market (Price Settles at $48)"
                status="neutral"
                description="The price resides in the un-capped corridor between $45 and $50. Both options expire worthless. The investor retains the shares."
                calculation={`Portfolio value perfectly tracks the stock. No options exercised.`}
              />
              <ScenarioCard
                title="Scenario C: Exceptional Appreciation (Price Surges to $52.50)"
                status="profit"
                description="The put expires worthless. The short call is in-the-money. The investor is forced to sell their shares at the $50 strike price."
                calculation={`Maximum Profit = Call Strike ($50.00) − Initial Cost ($47.72) = $2.28 per share cap.`}
              />
            </div>
          </SectionCard>

          {/* Section 2: PVSFs */}
          <SectionCard
            id="pvsf"
            icon={DollarSign}
            title="Prepaid Variable Share Forwards (PVSFs)"
            gradient="from-violet-500 to-purple-600"
          >
            <p>
              While equity collars mitigate risk, they generate no upfront cash. A PVSF represents a
              quantum leap in financial engineering: it synthesizes the protective architecture of an
              equity collar with the immediate liquidity of a non-recourse, collateralized cash advance.
            </p>

            <div className="bg-violet-50 p-6 rounded-2xl border border-violet-200">
              <h4 className="text-violet-900 font-bold mb-3">How the Upfront Payment is Calculated</h4>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li><strong>Advance Rate:</strong> Typically 75% to 90% of the stock&apos;s current spot market value.</li>
                <li><strong>Deductions:</strong> The bank deducts the cost of the implied protective put (if volatility is high), the implied financing rate (interest for the 1–5 year term), and the present value of expected dividends.</li>
                <li><strong>Non-Recourse:</strong> There are zero margin calls. The bank&apos;s maximum exposure is pre-hedged.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">The Variable Settlement Algorithm</h3>
              <p className="mb-6">
                The &ldquo;variable&rdquo; nature preserves the tax-deferred status. Instead of delivering a fixed
                number of shares, the delivery depends on the terminal price across three tranches. An
                executive pledges <strong>100,000 shares</strong> at <strong>$100/share ($10M total)</strong>.
                The Floor is $100, the Cap is $120, and the Bank advances{' '}
                <strong>$8.5 Million (85%)</strong> upfront.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Tranche 1: Catastrophic Collapse',
                    condition: 'Terminal Price ≤ $100 Floor',
                    border: 'border-t-4 border-rose-400',
                    body: 'Stock plummets to $50. The executive is completely shielded from the loss below the floor.',
                    calc: 'Deliver: All 100,000 shares.\nResult: Executive keeps the $8.5M cash received 3 years ago, avoiding a $3.5M loss.',
                  },
                  {
                    title: 'Tranche 2: Moderate Appreciation',
                    condition: 'Between $100 and $120',
                    border: 'border-t-4 border-blue-400',
                    body: 'Stock rises to $110. The executive participates in upside. Delivery ratio is Floor ÷ Terminal Price.',
                    calc: 'Deliver: 90,909 shares.\nRetain: 9,091 shares (Worth $1M).\nTotal Value: $8.5M + $1M equity.',
                  },
                  {
                    title: 'Tranche 3: Explosive Growth',
                    condition: 'Terminal Price > $120 Cap',
                    border: 'border-t-4 border-emerald-400',
                    body: 'Stock surges to $150. Upside is constrained. Delivery includes floor value plus excess over cap.',
                    calc: 'Deliver: 86,667 shares.\nRetain: 13,333 shares (Worth $2M).\nResult: Capped at maximum permitted upside.',
                  },
                ].map((t) => (
                  <div key={t.title} className={`bg-white p-6 rounded-2xl shadow-sm flex flex-col ${t.border}`}>
                    <h4 className="font-bold text-slate-800 mb-2">{t.title}</h4>
                    <div className="text-sm font-medium text-slate-500 mb-4 pb-4 border-b">{t.condition}</div>
                    <p className="text-sm text-slate-600 flex-grow">{t.body}</p>
                    <div className="mt-4 bg-slate-50 p-3 rounded-lg text-sm font-mono text-slate-700 whitespace-pre-wrap">
                      {t.calc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Section 3: Comparison */}
          <SectionCard
            id="comparison"
            icon={Scale}
            title="Strategic Deployment Comparison"
            gradient="from-blue-500 to-cyan-500"
          >
            <ComparisonTable />
          </SectionCard>

          {/* Section 4: Risks & Regulations */}
          <SectionCard
            id="risks"
            icon={AlertCircle}
            title="Intrinsic Risks & Regulatory Labyrinth"
            gradient="from-rose-500 to-pink-600"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Tax Risk */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Landmark size={24} className="text-rose-500" /> Tax Pitfalls (IRC Section 1259)
                </h3>
                <p className="text-slate-600 mb-4">
                  To maintain tax-deferred status and avoid triggering a &ldquo;constructive sale&rdquo; under
                  Section 1259, a PVSF must maintain a robust corridor of economic exposure (usually a
                  15–20% spread between floor and cap).
                </p>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-rose-100">
                  <h4 className="font-bold text-rose-800 mb-2">The McKelvey Litigation</h4>
                  <p className="text-sm text-slate-600">
                    Billionaire Andrew McKelvey extended his PVSFs during the 2008 crash when his stock
                    had plummeted far below the floor. The IRS argued the delivery was a statistical
                    &ldquo;foregone conclusion&rdquo; and substantially fixed. The court agreed, triggering over
                    $102M in immediate capital gains taxes. The lesson: You cannot roll deep
                    out-of-the-money positions without catastrophic tax consequences.
                  </p>
                </div>
              </div>

              {/* SEC Regs */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <FileText size={24} className="text-rose-500" /> SEC Disclosure Requirements
                </h3>
                <p className="text-slate-600 mb-4">
                  Insiders are subject to strict scrutiny to prevent illegal insider trading and ensure
                  market transparency. PVSFs are highly visible to the public markets.
                </p>
                <ul className="space-y-4">
                  {[
                    {
                      title: 'Section 16(a) Form 4 Filings:',
                      body: 'Cannot use standard buy/sell codes. Must use Code "J" or "K" (Derivative Securities) with explicit footnotes detailing the floor, cap, term, and cash advance.',
                    },
                    {
                      title: 'Rule 10b5-1 Trading Plans:',
                      body: 'Execution must occur under heavily enforced cooling-off periods (e.g., 90 days post-adoption) to prove the executive lacked Material Non-Public Information (MNPI).',
                    },
                    {
                      title: 'Proxy Regulation S-K Item 407(i):',
                      body: 'Companies must publicly disclose to shareholders if executives are permitted to hedge. Many boards now strictly prohibit PVSFs as they contradict pay-for-performance.',
                    },
                  ].map((item) => (
                    <li key={item.title} className="bg-white p-4 rounded-xl shadow-sm border border-rose-100 text-sm">
                      <strong className="text-slate-800 block mb-1">{item.title}</strong>
                      {item.body}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionCard>

        </main>
    </ArticleFrame>
  );
}
