'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, BookOpen, TrendingUp, ShieldAlert, BarChart3, Clock,
  Layers, Info, AlertTriangle, CheckCircle2, TrendingDown, Activity,
  FileText, ExternalLink, LineChart
} from 'lucide-react';
import { Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// ─── Reusable Components ───────────────────────────────────────────────────────

const Section = ({
  icon: Icon,
  title,
  gradient,
  children,
}: {
  icon: React.ElementType;
  title: string;
  gradient: string;
  children: React.ReactNode;
}) => (
  <section className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden mb-12 hover:shadow-md transition-shadow duration-300 relative">
    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${gradient}`} />
    <div className="p-8 md:p-12">
      <div className="flex items-center gap-5 mb-8">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-md`}>
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">{title}</h2>
      </div>
      <div className="text-lg text-slate-600 leading-relaxed space-y-6">{children}</div>
    </div>
  </section>
);

const Callout = ({
  type = 'info',
  title,
  children,
}: {
  type?: 'info' | 'warning' | 'success' | 'danger';
  title?: string;
  children: React.ReactNode;
}) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    danger: 'bg-rose-50 border-rose-200 text-rose-800',
  };
  const icons = {
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    danger: <ShieldAlert className="w-5 h-5 text-rose-500" />,
  };
  return (
    <div className={`mt-6 mb-6 p-5 rounded-2xl border ${styles[type]} flex gap-4 shadow-sm`}>
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <div>
        {title && <h4 className="font-bold mb-1">{title}</h4>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4 tracking-tight flex items-center gap-2">
    <div className="w-1.5 h-6 bg-slate-300 rounded-full" />
    {children}
  </h3>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdvancedOptionsCollarStrategiesPage() {
  const slug = 'advanced-options-collar-strategies-structural-mechanics-tradeoffs';
  const currentArticle = articles.find((a) => a.slug === slug);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const infographicUrl = 'https://i.imgur.com/zTybep1.png';
  const googleDocUrl =
    'https://docs.google.com/document/d/e/2PACX-1vRLg5ohobRMkcpjopkV1_2MboEZjKQeWc0hbXwIBkJBVSei6QhJdXJNOR3o0WtOZcWKF8UtavALdg56/pub';

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative selection:bg-indigo-100 selection:text-indigo-900">
      {/* SEO */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData
            articleTitle={currentArticle.title}
            articleSlug={currentArticle.slug!}
          />
        </>
      )}

      {/* Decorative background */}
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-br from-indigo-100/50 via-purple-50/50 to-blue-50/50 -z-10" />
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[100px] -z-10" />
      <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[100px] -z-10" />

      {/* Return to Home */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Hero */}
      <header className="pt-16 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600 mb-8">
          <BookOpen size={16} className="text-indigo-500" />
          Comprehensive Tutorial
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 tracking-tight mb-6 leading-tight">
          Advanced Options Collar Strategies
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
          Structural Mechanics, Tradeoffs, and Institutional Applications for Risk Management.
        </p>
      </header>

      {/* Infographic */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div
          className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img
            src={infographicUrl}
            alt="Advanced Options Collar Strategies Infographic"
            className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
          />
          <button
            onClick={(e) => { e.stopPropagation(); setIsImageViewerOpen(true); }}
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

      <FullScreenImageViewer
        src={infographicUrl}
        alt="Advanced Options Collar Strategies Infographic"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-24">

        {/* Section 1: Introduction */}
        <Section icon={Activity} title="Introduction to Protective Derivatives" gradient="from-blue-500 to-indigo-600">
          <p>
            In the complex discipline of financial risk management, institutional portfolio managers, corporate
            treasurers, and high-net-worth investors holding concentrated equity positions face a persistent and
            structural tension between <strong>capital preservation and asset appreciation</strong>.
          </p>
          <p>
            While modern portfolio theory dictates that diversification is optimal, immediate diversification is
            frequently impossible or highly undesirable due to punitive taxable events, insider holding mandates,
            or strategic voting control. To achieve downside protection without outright asset liquidation,
            sophisticated market practitioners rely heavily on protective derivative structures.
          </p>
          <p>
            Among these, the <strong>options collar</strong> has historically emerged as the foundational
            architecture. It allows investors to effectively bound the distribution of future returns, reducing
            portfolio volatility and shielding balance sheets from catastrophic price dislocations.
          </p>
          <Callout type="info" title="Market Context">
            During the &ldquo;risk-off&rdquo; macroeconomic sentiment of 2022/2023, flows into derivative-based
            risk management strategies accelerated significantly. Options collar ETF assets reached approximately
            $23 billion by early 2023. However, an options collar is not a monolithic instrument &mdash;
            practitioners have engineered specific variants to address volatility skew, margin efficiency, and
            behavioral finance biases.
          </Callout>
        </Section>

        {/* Section 2: Standard Zero-Cost Collar */}
        <Section icon={ShieldAlert} title="The Standard Zero-Cost Collar" gradient="from-indigo-500 to-violet-600">
          <p>
            The standard options collar is a multi-leg derivative strategy constructed by combining a long
            position in an underlying asset with the simultaneous <strong>purchase of an out-of-the-money
            protective put</strong> and the <strong>sale of an out-of-the-money covered call</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 flex items-center gap-2 mb-3">
                <TrendingDown className="w-5 h-5" /> The Floor (Long Put)
              </h4>
              <p className="text-sm text-indigo-800">
                Provides a guaranteed price floor, strictly limiting downside losses if the underlying asset
                experiences a severe devaluation.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5" /> The Cap (Short Call)
              </h4>
              <p className="text-sm text-indigo-800">
                Generates a cash premium credit that partially or fully subsidizes the upfront debit cost of
                the protective put.
              </p>
            </div>
          </div>

          <p>
            When the premium received perfectly offsets the premium paid, the derivative achieves parity and
            is classified as a <strong>&ldquo;zero-cost&rdquo; collar</strong>.
          </p>

          <Callout type="warning" title="Frictions &amp; Limitations">
            While elegant, the standard zero-cost collar inherently requires the investor to accept a{' '}
            <strong>rigid, absolute performance cap</strong>. Due to persistent{' '}
            <em>implied volatility skew</em> (investors overpay for put protection), forcing a zero-cost
            structure often requires selling a call extremely close to the current spot price, severely
            truncating upside profit and resulting in a systemic negative alpha drag.
          </Callout>
        </Section>

        {/* Section 3: Ratio Collar */}
        <Section icon={BarChart3} title="The Ratio Collar" gradient="from-purple-500 to-pink-600">
          <p>
            When implied volatility skew renders a standard zero-cost collar unviable, a sophisticated
            investor may deploy a <strong>ratio collar</strong>. This intentionally abandons the standard
            1:1 symmetry. The most prevalent variant is the &ldquo;covered ratio write collar,&rdquo; which
            involves purchasing one protective put while simultaneously selling <em>multiple</em> call
            options (e.g., 1&times;2).
          </p>

          <SubHeading>Structural Mechanics (1&times;2 Profile)</SubHeading>
          <p>
            In a 1&times;2 ratio collar, selling two call options against every 100 shares fundamentally
            fractures the protection. One short call is covered by the equity, but the second is completely{' '}
            <strong>&ldquo;naked&rdquo; or uncovered</strong>. This introduces a high degree of negative
            convexity and theoretically unlimited liability on the upside.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm my-6">
            <table className="w-full text-left border-collapse bg-white min-w-[640px]">
              <thead>
                <tr className="bg-slate-900 text-white text-sm">
                  <th className="py-4 px-5 font-semibold">Expiration Scenario</th>
                  <th className="py-4 px-5 font-semibold">Equity P&amp;L</th>
                  <th className="py-4 px-5 font-semibold">Put P&amp;L</th>
                  <th className="py-4 px-5 font-semibold">Short Calls P&amp;L (&times;2)</th>
                  <th className="py-4 px-5 font-semibold">Net P&amp;L</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                {[
                  { scenario: 'Crash to $80.00', eq: '-$20.00', put: '+$15.00', calls: '$0.00', net: '-$5.00 (Max Loss)', netClass: 'text-rose-600' },
                  { scenario: 'Drift to $95.00', eq: '-$5.00', put: '$0.00', calls: '$0.00', net: '-$5.00 (Max Loss)', netClass: 'text-rose-600' },
                  { scenario: 'Rise to $100.00', eq: '$0.00', put: '$0.00', calls: '$0.00', net: '$0.00 (Breakeven)', netClass: 'text-slate-700' },
                  { scenario: 'Rally to $105.00', eq: '+$5.00', put: '$0.00', calls: '$0.00', net: '+$5.00 (Max Profit)', netClass: 'text-emerald-600' },
                  { scenario: 'Surge to $110.00', eq: '+$10.00', put: '$0.00', calls: '-$10.00', net: '$0.00 (Upper Breakeven)', netClass: 'text-slate-700' },
                  { scenario: 'Melt-Up to $120.00', eq: '+$20.00', put: '$0.00', calls: '-$30.00', net: '-$10.00 (Infinite Risk)', netClass: 'text-rose-700 font-bold' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-5 font-medium text-slate-900">{row.scenario}</td>
                    <td className={`py-4 px-5 ${row.eq.startsWith('+') ? 'text-emerald-600' : row.eq.startsWith('-') ? 'text-rose-600' : 'text-slate-500'}`}>{row.eq}</td>
                    <td className={`py-4 px-5 ${row.put.startsWith('+') ? 'text-emerald-600' : 'text-slate-500'}`}>{row.put}</td>
                    <td className={`py-4 px-5 ${row.calls.startsWith('-') ? 'text-rose-600' : 'text-slate-500'}`}>{row.calls}</td>
                    <td className={`py-4 px-5 ${row.netClass}`}>{row.net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Callout type="danger" title="Ideal Investor Profile">
            Strictly unsuitable for passive, long-term buy-and-hold investors. It is the domain of
            sophisticated, active volatility traders and institutional yield-seekers with a{' '}
            <strong>neutral-to-bearish outlook</strong> who possess the capital reserves to satisfy massive
            margin demands if the naked call is breached.
          </Callout>
        </Section>

        {/* Section 4: Participating Collar */}
        <Section icon={TrendingUp} title="The Participating Collar" gradient="from-emerald-500 to-teal-600">
          <p>
            To resolve the psychological friction of a hard upside cap (and subsequent &ldquo;seller&apos;s
            remorse&rdquo;), financial engineers developed the <strong>participating collar</strong>. This
            structure allows the holder to retain a predefined percentage of the upside potential above the
            cap strike while maintaining absolute downside protection.
          </p>
          <p>
            This is achieved by selling <em>fewer</em> calls than puts. For example, a 50% participating
            collar on 2,000 shares involves buying 20 protective puts (covering 100% of the downside) but
            only selling 10 covered calls (capping only 50% of the upside).
          </p>

          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2">The Premium Tradeoff</h4>
              <p className="text-sm text-slate-600">
                Because fewer calls are sold, the strategy rarely achieves zero-cost status. It almost always
                requires a <strong>net debit</strong> &mdash; an upfront out-of-pocket cash payment
                functioning identically to an insurance premium.
              </p>
            </div>
            <div className="flex-1 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2">OTC / FX Applications</h4>
              <p className="text-sm text-slate-600">
                In OTC foreign exchange, these are formalized as single structured derivative contracts. A
                corporate importer can secure a &ldquo;worst-case&rdquo; rate while maintaining a
                &ldquo;participation rate&rdquo; (e.g., 75%) in favorable movements.
              </p>
            </div>
          </div>
        </Section>

        {/* Section 5: Three-Way Collar */}
        <Section icon={Layers} title="The Three-Way Collar (Seagull)" gradient="from-amber-500 to-orange-600">
          <p>
            When institutional market participants (e.g., energy producers) face prohibitively high put option
            premiums but lack the liquid capital for debit-based collars, they deploy a{' '}
            <strong>three-way or &ldquo;seagull&rdquo; collar</strong>. It recreates the zero-cost nature of
            a standard collar without aggressively capping the upside by secretly taking on latent tail risk.
          </p>

          <SubHeading>Structural Composition</SubHeading>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li><strong>Long Underlying Asset:</strong> The physical commodity, currency, or equity.</li>
            <li>
              <strong>Long Put (K&#x2081;):</strong> Establishes the primary protection floor just below
              spot price.
            </li>
            <li>
              <strong>Short Call (K&#x2082;):</strong> Establishes the upside revenue cap (significantly
              higher than K&#x2081;).
            </li>
            <li>
              <strong>Short Put (K&#x2083;):</strong> Establishes the <em>subfloor</em> (significantly
              lower than K&#x2081;).
            </li>
          </ul>

          <Callout type="warning" title="Latent Vulnerabilities &amp; The Subfloor">
            The cash from selling the deep out-of-the-money put (K&#x2083;) subsidizes the long put
            (K&#x2081;). However, protection is strictly valid{' '}
            <strong>only within the spread between K&#x2081; and K&#x2083;</strong>. If the asset&apos;s
            price plummets below the subfloor (K&#x2083;), catastrophic 1:1 downside risk is entirely
            reintroduced. (e.g., Energy producers during the 2020 oil crash).
          </Callout>
        </Section>

        {/* Section 6: Temporal Dynamics */}
        <Section icon={Clock} title="Temporal Dynamics &amp; Rolling Strategies" gradient="from-teal-500 to-cyan-600">
          <p>
            Hedgers must critically decide whether to lock in a static,{' '}
            <strong>long-dated forward collar</strong> upfront or engage in a dynamic, continuous{' '}
            <strong>rolling collar</strong> strategy utilizing short-term options.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-4">
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-200 pb-2">
                Forward Collar (Static)
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                Used to strictly bound risk over a lengthy period (e.g., IPO lock-ups). Often utilized in{' '}
                <em>Prepaid Variable Forwards (PVFs)</em> to secure tax-free cash advances on concentrated
                stock.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Set-and-forget; immune to overnight crashes.
                </li>
                <li className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  High premium costs due to long-term Theta.
                </li>
                <li className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  Severe opportunity cost (tight upside cap).
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-200 pb-2">
                Rolling Collar (Dynamic)
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                Continuously rolling 30&ndash;90 day options. As the stock climbs, the investor functionally
                &ldquo;steps up&rdquo; the floor and the cap, locking in newly generated profits.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Cheaper absolute premium outlay.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  Wider bands allow for better upside participation.
                </li>
                <li className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  Path dependency, whipsaw risk, and high transaction costs.
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Section 7: Comparative Synthesis */}
        <Section icon={Layers} title="Comparative Synthesis" gradient="from-blue-600 to-indigo-700">
          <p>
            Selecting the exact collar variant depends entirely on an investor&apos;s macroeconomic forecast,
            risk tolerance, and capital liquidity.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mt-6">
            <table className="w-full text-left border-collapse bg-white min-w-[700px]">
              <thead>
                <tr className="bg-slate-900 text-white text-sm">
                  <th className="py-4 px-5 font-semibold">Strategic Variant</th>
                  <th className="py-4 px-5 font-semibold">Upfront Cost</th>
                  <th className="py-4 px-5 font-semibold">Upside Participation</th>
                  <th className="py-4 px-5 font-semibold">Downside Protection</th>
                  <th className="py-4 px-5 font-semibold">Ideal Investor</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-5 font-bold text-slate-900">Standard Zero-Cost</td>
                  <td className="py-4 px-5 text-slate-600">Zero (premiums offset)</td>
                  <td className="py-4 px-5 text-slate-600">Strictly capped at short call strike</td>
                  <td className="py-4 px-5 text-emerald-600 font-medium">100% below long put</td>
                  <td className="py-4 px-5 text-slate-600">Traditional hedgers securing short-term gains</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-5 font-bold text-slate-900">Ratio Collar (1&times;2)</td>
                  <td className="py-4 px-5 text-slate-600">Net credit or zero</td>
                  <td className="py-4 px-5 text-rose-600 font-medium">Unlimited upside liability (naked call)</td>
                  <td className="py-4 px-5 text-emerald-600 font-medium">100% below long put</td>
                  <td className="py-4 px-5 text-slate-600">Aggressive yield seekers, neutral-to-bearish</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-5 font-bold text-slate-900">Participating Collar</td>
                  <td className="py-4 px-5 font-medium text-slate-700">Net debit (cash required)</td>
                  <td className="py-4 px-5 text-emerald-600 font-medium">Partial capture (e.g., 50%) above cap</td>
                  <td className="py-4 px-5 text-emerald-600 font-medium">100% below long put</td>
                  <td className="py-4 px-5 text-slate-600">Long-term bullish executives avoiding cap regret</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-5 font-bold text-slate-900">Three-Way (Seagull)</td>
                  <td className="py-4 px-5 text-slate-600">Zero (subsidized by subfloor)</td>
                  <td className="py-4 px-5 text-slate-600">Capped, but wider than standard</td>
                  <td className="py-4 px-5 text-rose-600 font-medium">Protected in band; 1:1 risk below subfloor</td>
                  <td className="py-4 px-5 text-slate-600">Institutional commodity/FX hedgers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Google Doc CTA */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-xl my-8 text-center border border-indigo-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Read the Full Research Paper</h3>
          <p className="text-slate-600 mb-6">
            Access the complete deep-dive document with extended mathematical derivations, volatility skew
            analysis, and institutional-grade collar implementation frameworks.
          </p>
          <a
            href={googleDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-800 transition-colors duration-300 transform hover:scale-105"
          >
            <FileText size={20} />
            Open Research Paper
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <strong>Educational Disclaimer:</strong> This article is for informational and educational
          purposes only. It does not constitute investment advice, financial guidance, or a recommendation
          to buy or sell any security. All investments involve risk, including the possible loss of
          principal. Past performance is not indicative of future results.
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 text-center text-slate-500">
        <p className="flex items-center justify-center gap-2">
          <LineChart size={18} />
          &copy; 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.
        </p>
      </footer>
    </div>
  );
}
