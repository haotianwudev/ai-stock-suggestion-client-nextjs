'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, TrendingDown, AlertTriangle, Calculator, Activity,
  Layers, ShieldAlert, CheckCircle2, BookOpen, Zap, BarChart3, Scale,
  ExternalLink
} from 'lucide-react';
import { Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// ─── Reusable Components ───────────────────────────────────────────────────────

const MathEq = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded text-sm border border-indigo-100">
    {children}
  </span>
);

const MathBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="font-mono text-center text-base md:text-lg text-indigo-900 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl my-6 overflow-x-auto shadow-sm border border-indigo-100 whitespace-nowrap">
    {children}
  </div>
);

const SectionHeading = ({
  title,
  icon: Icon,
  colorClass,
}: {
  title: string;
  icon: React.ElementType;
  colorClass: string;
}) => (
  <div className="flex items-center space-x-3 mb-6">
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon size={28} />
    </div>
    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
  </div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ConformalRiskPage() {
  const currentArticle = articles.find(
    (a) => a.slug === 'conformal-prediction-portfolio-risk-var'
  );
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const infographicUrl = 'https://i.imgur.com/RYfA2e2.jpeg';
  const googleDocUrl =
    'https://docs.google.com/document/d/e/2PACX-1vQB2s8oQpqLAmTM2Qqx_yZtPub5kEoOpUqCPvmbbB-uUvrXXBsOqmWV_QpqF3zo0mKO7kRDIW0KmJ-_/pub';

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-indigo-100">
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

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-white border-b border-slate-200 mt-6">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />
        <div className="max-w-5xl mx-auto px-6 py-20 lg:py-28 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm mb-6 border border-indigo-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span>QUANTITATIVE RISK MANAGEMENT</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Conformal Prediction for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Portfolio Risk
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed font-light">
            Beyond VaR: A distribution-free, mathematically rigorous alternative to standard models.
            Handle regime changes, avoid Gaussian assumptions, and survive non-stationary markets.
          </p>
        </div>
        {/* Decorative dot grid */}
        <div className="absolute top-20 right-0 translate-x-1/3 opacity-10 pointer-events-none">
          <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="currentColor" className="text-indigo-500" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#dot-pattern)" />
          </svg>
        </div>
      </header>

      {/* Infographic */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div
          className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
          onClick={() => setIsImageViewerOpen(true)}
        >
          <img
            src={infographicUrl}
            alt="Conformal Prediction for Portfolio Risk Infographic"
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
        alt="Conformal Prediction for Portfolio Risk Infographic"
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Executive Summary */}
        <section className="relative rounded-3xl overflow-hidden shadow-xl">
          {/* Dark gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* Glow orbs */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          {/* Watermark icon */}
          <BookOpen className="absolute -bottom-4 -right-4 w-52 h-52 text-white/5 rotate-12 pointer-events-none" />

          <div className="relative z-10 p-8 md:p-12">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-400" />
              </span>
              Executive Summary
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 leading-tight tracking-tight">
              A Paradigm Shift in<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Quantitative Risk Management
              </span>
            </h2>

            {/* Lead paragraph */}
            <p className="text-lg text-slate-300 leading-relaxed mb-10 border-l-4 border-indigo-500 pl-5">
              Traditional parametric and historical simulation VaR architectures failed catastrophically
              during the 2020 COVID-19 shock and the 2022 sovereign bond crash due to reliance on Gaussian
              returns and backward-looking windows. Conformal prediction wraps base algorithms in a
              statistical calibration layer of non-conformity scores, generating{' '}
              <span className="text-white font-semibold">exact finite-sample marginal coverage</span>.
            </p>

            {/* Key concept cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                {
                  label: 'Core Guarantee',
                  value: 'Distribution-Free',
                  sub: 'No Gaussian assumptions — valid for any return distribution',
                  accent: 'border-indigo-500/50 bg-indigo-500/10',
                  labelColor: 'text-indigo-400',
                  valueColor: 'text-white',
                },
                {
                  label: 'Key Extension',
                  value: 'CRC + RWC',
                  sub: 'Conformal Risk Control & Regime-Weighted Conformal for non-stationary markets',
                  accent: 'border-purple-500/50 bg-purple-500/10',
                  labelColor: 'text-purple-400',
                  valueColor: 'text-white',
                },
                {
                  label: 'Coverage Property',
                  value: '≥ 1 − α',
                  sub: 'Exact finite-sample marginal coverage guaranteed by construction',
                  accent: 'border-emerald-500/50 bg-emerald-500/10',
                  labelColor: 'text-emerald-400',
                  valueColor: 'text-white',
                },
              ].map((card, i) => (
                <div key={i} className={`rounded-2xl p-5 border ${card.accent}`}>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${card.labelColor}`}>{card.label}</p>
                  <p className={`text-xl font-bold mb-2 font-mono ${card.valueColor}`}>{card.value}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{card.sub}</p>
                </div>
              ))}
            </div>

            {/* Key findings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { icon: '⚠️', label: '2020 COVID Shock', text: 'VaR models populated with placid 2019 data triggered massive backtesting exceptions. Forced liquidations amplified the sell-off.' },
                { icon: '📉', label: '2022 Bond Crash', text: 'Rapid tightening broke the equity-bond correlation. Parametric models had zero capacity to anticipate the simultaneous diversification collapse.' },
                { icon: '🔧', label: 'Split CP Mechanics', text: 'Isolates uncertainty calibration from training via non-conformity scores, solving the computational bottleneck of Full CP.' },
                { icon: '🎯', label: 'Adaptive Capital', text: 'RWC and ACI extensions dynamically expand safety buffers during volatility spikes and contract them as markets stabilize.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">{item.label}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1 – Foundation */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 to-orange-500" />
          <div className="p-8 md:p-12">
            <SectionHeading
              title="1. The Foundation: The Crisis of Traditional Risk"
              icon={AlertTriangle}
              colorClass="bg-rose-100 text-rose-600"
            />
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Value at Risk (VaR) answers a simple question: what is the maximum expected portfolio loss
              over a specific horizon at a given confidence level? While computationally convenient, the
              two dominant VaR methodologies rely on assumptions that actively disintegrate during acute
              financial stress.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <Activity className="text-rose-500 w-6 h-6" />
                  <h3 className="text-xl font-bold text-slate-800">Parametric VaR Flaws</h3>
                </div>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start"><span className="text-rose-500 mr-2">•</span>Assumes asset returns follow a Gaussian/Student&apos;s t-distribution.</li>
                  <li className="flex items-start"><span className="text-rose-500 mr-2">•</span>Ignores &ldquo;fat tails&rdquo; (leptokurtosis), underestimating extreme tail events.</li>
                  <li className="flex items-start"><span className="text-rose-500 mr-2">•</span>Volatility estimates (like GARCH) adapt far too slowly to discontinuous price jumps.</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingDown className="text-orange-500 w-6 h-6" />
                  <h3 className="text-xl font-bold text-slate-800">Historical Simulation Flaws</h3>
                </div>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Relies on empirical distribution of a backward-looking window.</li>
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Creates severe procyclicality (compressing risk in bull markets).</li>
                  <li className="flex items-start"><span className="text-orange-500 mr-2">•</span>Blind to new regimes until losses have already materialized.</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl">
              <div className="px-6 py-4 bg-slate-800 border-b border-slate-700 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-slate-400 text-sm font-mono tracking-wider">Case Studies</span>
              </div>
              <div className="p-8 space-y-8">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    <span className="text-indigo-400 mr-2">2020</span> COVID-19 Liquidity Shock
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    Markets transitioned from suppressed-volatility to extreme stress in days. Global banks
                    experienced massive VaR backtesting exceptions because models were populated with placid
                    2019 data. Forced liquidations exacerbated the sell-off.
                  </p>
                </div>
                <div className="w-full h-px bg-slate-700" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    <span className="text-purple-400 mr-2">2022</span> Sovereign Bond Crash
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    Rapid central bank tightening broke the decades-old negative correlation between
                    equities and bonds. Parametric models failed to anticipate that fixed income
                    diversification would evaporate simultaneously with a spike in yields.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 – Mechanics */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-blue-500" />
          <div className="p-8 md:p-12">
            <SectionHeading
              title="2. Mechanics: The Conformal Framework"
              icon={Calculator}
              colorClass="bg-indigo-100 text-indigo-600"
            />
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Conformal Prediction (CP) is a model-agnostic statistical framework that wraps around any
              base forecasting algorithm to produce predictive intervals with strict, distribution-free
              guarantees. It relies on the core assumption of <strong>exchangeability</strong>.
            </p>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative mb-8">
              <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500 rounded-r-3xl" />
              <h3 className="text-xl font-bold text-slate-800 mb-4">Finite-Sample Marginal Validity</h3>
              <p className="text-slate-600 mb-4">
                If data is exchangeable, CP guarantees the true value{' '}
                <MathEq>Y&#x2099;&#x208A;&#x2081;</MathEq> will fall within the interval{' '}
                <MathEq>Ĉ(X&#x2099;&#x208A;&#x2081;)</MathEq> with a probability of exactly{' '}
                <MathEq>1 &minus; &alpha;</MathEq>.
              </p>
              <MathBlock>P(Y&#x2099;&#x208A;&#x2081; &isin; Ĉ(X&#x2099;&#x208A;&#x2081;)) &ge; 1 &minus; &alpha;</MathBlock>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-6 mt-12">
              Split Conformal Prediction for Portfolio VaR
            </h3>
            <p className="text-slate-600 mb-8">
              To solve the computational bottleneck of Full CP, Split CP isolates uncertainty calibration
              from training. The objective is estimating a strictly one-sided upper bound on potential losses.
            </p>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50">
                <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xl">1</div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-indigo-900 mb-2">Calibration Set &amp; Base Forecasters</h4>
                  <p className="text-slate-600 mb-3">
                    Historical data is partitioned into a training set <MathEq>D&#x209C;&#x1D63;&#x2090;&#x1D62;&#x2099;</MathEq> and an
                    independent calibration set <MathEq>D&#x1D9C;&#x2090;&#x2097;</MathEq>. A base quantile forecaster{' '}
                    <MathEq>f</MathEq> is trained on <MathEq>D&#x209C;&#x1D63;&#x2090;&#x1D62;&#x2099;</MathEq>.
                  </p>
                  <div className="font-mono text-indigo-700 bg-white px-3 py-2 rounded shadow-sm border border-indigo-100 inline-block">
                    q̂&#x209C; = f(X&#x209C;)
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50">
                <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xl">2</div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-indigo-900 mb-2">Left-Tail Non-Conformity Score</h4>
                  <p className="text-slate-600 mb-3">
                    For every observation in <MathEq>D&#x1D9C;&#x2090;&#x2097;</MathEq>, compute a score{' '}
                    <MathEq>s&#x1D62;</MathEq> that measures the directed residual between realized loss and
                    the predicted quantile.
                  </p>
                  <div className="font-mono text-indigo-700 bg-white px-3 py-2 rounded shadow-sm border border-indigo-100 inline-block">
                    s&#x1D62; = max&#123;0, Y&#x1D62; &minus; q̂&#x1D62;&#125;
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50">
                <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xl">3</div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-indigo-900 mb-2">Finite-Sample Correction</h4>
                  <p className="text-slate-600 mb-3">
                    Scores are sorted into an empirical distribution. A critical correction factor accounts
                    for the variance of utilizing a limited calibration set. The safety buffer{' '}
                    <MathEq>ĉ</MathEq> is the <MathEq>k</MathEq>-th smallest score.
                  </p>
                  <div className="font-mono text-indigo-700 bg-white px-3 py-2 rounded shadow-sm border border-indigo-100 inline-block">
                    k = &lceil;(n&#x1D9C;&#x2090;&#x2097; + 1)(1 &minus; &alpha;)&rceil;
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50">
                <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">4</div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-indigo-900 mb-2">Guaranteed Prediction Interval</h4>
                  <p className="text-slate-600 mb-3">
                    For an unseen day, append the safety buffer to the base prediction to construct the
                    final <MathEq>CVaR&#x1D9C;&#x1D52;&#x2099;&#x1D60;&#x1D52;&#x1D63;&#x1D5A;&#x2090;&#x2097;</MathEq> bound.
                  </p>
                  <div className="space-y-2">
                    <div className="font-mono text-indigo-800 font-bold bg-white px-3 py-2 rounded shadow-sm border border-indigo-200 inline-block">
                      U&#x209C;&#x2099;&#x2091;&#x1D64; = q̂&#x2099;&#x2091;&#x1D64; + ĉ
                    </div>
                    <div className="block mt-2 font-mono text-indigo-800 font-bold bg-white px-3 py-2 rounded shadow-sm border border-indigo-200 w-fit">
                      P(Y&#x209C;&#x2099;&#x2091;&#x1D64; &le; U&#x209C;&#x2099;&#x2091;&#x1D64;) &ge; 1 &minus; &alpha;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 – Taming Tail Risk */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-fuchsia-500" />
          <div className="p-8 md:p-12">
            <SectionHeading
              title="3. Taming Tail Risk in Non-Stationary Markets"
              icon={Layers}
              colorClass="bg-purple-100 text-purple-600"
            />
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              In financial markets, the assumption of exchangeability is violently violated by temporal
              dependence, volatility clustering, and regime shifts. Advanced extensions exist to salvage
              the conformal guarantee.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-8 border border-purple-100 shadow-sm hover:-translate-y-1 transition-transform">
                <h3 className="text-xl font-bold text-purple-900 mb-3">Time-Weighted Conformal (TWC)</h3>
                <p className="text-slate-700 leading-relaxed">
                  Abandons treating all historical data equally. Applies an exponential time decay factor
                  to the empirical distribution of non-conformity scores. Recent errors are heavily
                  weighted, forcing the safety buffer to rapidly expand during volatile entries and safely
                  contract as markets calm.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100 shadow-sm hover:-translate-y-1 transition-transform">
                <h3 className="text-xl font-bold text-purple-900 mb-3">Conformal Risk Control (CRC)</h3>
                <p className="text-slate-700 leading-relaxed">
                  Generalizes standard CP to control the expected value of <em>any</em> monotonically
                  decreasing loss function. This allows risk managers to bound expected magnitude of tail
                  losses &mdash; perfect for Conditional VaR (CVaR) instead of just bounding the binary
                  probability of a VaR breach.
                </p>
              </div>

              <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-purple-200 shadow-md">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <Scale className="text-purple-500 mr-3 w-6 h-6" />
                  Regime-Weighted Conformal (RWC)
                </h3>
                <p className="text-slate-600 mb-4 text-lg">
                  For structural breaks, RWC combines recency weighting with advanced regime-similarity
                  weighting. It utilizes a similarity kernel between the current market state{' '}
                  <MathEq>X&#x209C;</MathEq> and historical states <MathEq>X&#x1D62;</MathEq>.
                </p>
                <MathBlock>
                  w&#x1D62; &prop; exp(&minus;&lambda;(t &minus; i)) &middot; K(X&#x209C;, X&#x1D62;)
                </MathBlock>
                <p className="text-slate-600">
                  If the market shifts to a high-inflation environment, RWC automatically heavily weights
                  non-conformity scores from a comparable historical regime, satisfying{' '}
                  <strong>weighted exchangeability</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 – Strategy & Application */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
          <div className="p-8 md:p-12">
            <SectionHeading
              title="4. Strategy &amp; Application"
              icon={BarChart3}
              colorClass="bg-blue-100 text-blue-600"
            />

            <div className="space-y-8">
              <div className="bg-white border-l-4 border-blue-500 rounded-r-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Sizing the Calibration Window</h3>
                <p className="text-slate-600 mb-4">
                  Balancing the bias-variance tradeoff is key. Standard best practices dictate a tiered
                  data split:
                </p>
                <ul className="grid sm:grid-cols-3 gap-4 font-mono text-sm">
                  <li className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                    <span className="block text-2xl font-bold text-blue-600 mb-1">504 days</span>
                    <span className="text-slate-500">Training Window</span>
                  </li>
                  <li className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                    <span className="block text-2xl font-bold text-blue-600 mb-1">252 days</span>
                    <span className="text-slate-500">Hyperparameter Tuning</span>
                  </li>
                  <li className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                    <span className="block text-2xl font-bold text-indigo-600 mb-1">126 days</span>
                    <span className="text-slate-500">Dynamic Recalibration</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-cyan-500 rounded-r-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Adaptive Conformal Inference (ACI)</h3>
                <p className="text-slate-600 mb-4">
                  A computationally lightweight alternative for non-stationary environments. ACI
                  dynamically adjusts the target miscoverage rate <MathEq>&alpha;&#x209C;</MathEq> via
                  online gradient descent. If a VaR breach occurs, it instantly increases conservatism
                  for the next time step.
                </p>
                <MathBlock>
                  &alpha;&#x209C;&#x208A;&#x2081; = &Pi;[&alpha;&#x209C; + &gamma;(&alpha; &minus; 1&#123;y&#x209C; &gt; U&#x209C;&#125;)]
                </MathBlock>
              </div>

              <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-md">
                <h3 className="text-xl font-bold mb-3 text-cyan-300">
                  FRTB &amp; Expected Shortfall (CVaR) Integration
                </h3>
                <p className="text-slate-300">
                  Basel&apos;s shift to 97.5% Expected Shortfall fits perfectly with Conformal Risk Control
                  (CRC). Trading desks use deep neural networks to estimate the base ES, while the
                  middle-office risk function applies the conformal layer to guarantee the empirical CVaR
                  strictly exceeds true tail expectation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 – Risks & Pitfalls */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-rose-500" />
          <div className="p-8 md:p-12">
            <SectionHeading
              title="5. Risks, Pitfalls, and Limitations"
              icon={ShieldAlert}
              colorClass="bg-red-100 text-red-600"
            />
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h4 className="font-bold text-red-900 mb-2">Marginal vs. Conditional Fallacy</h4>
                <p className="text-sm text-red-800">
                  CP offers <em>marginal</em> coverage (averages out over years) but not{' '}
                  <em>conditional</em> coverage (guarantee on every specific day). It might achieve 100%
                  in a bull market and 0% in a crisis.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h4 className="font-bold text-orange-900 mb-2">Black Swan Violations</h4>
                <p className="text-sm text-orange-800">
                  If a shock is entirely unprecedented (e.g., negative oil prices), empirical scores
                  cannot scale the safety buffer. The guarantee breaks in regions with zero historical
                  density.
                </p>
              </div>
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                <h4 className="font-bold text-amber-900 mb-2">Computational Heaviness</h4>
                <p className="text-sm text-amber-800">
                  Creating calibration sets for massive, non-linear portfolios with path-dependent
                  derivatives requires heavy revaluations. Parametric VaR is retained for simple, highly
                  linear portfolios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 – Checklist */}
        <section className="bg-gradient-to-b from-slate-50 to-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-lg">
          <SectionHeading
            title="6. The Quant Risk Transition Checklist"
            icon={CheckCircle2}
            colorClass="bg-emerald-100 text-emerald-600"
          />
          <p className="text-lg text-slate-600 mb-10">
            Evaluating the transition from legacy VaR to a conformal architecture requires specific
            operational workflows. Ensure the following criteria are met:
          </p>
          <div className="space-y-6">
            {[
              {
                title: 'Data Infrastructure & Non-Conformity Scoring',
                desc: 'Establish strict Training/Calibration data partitioning. Prevent data leakage to ensure residuals remain unbiased for exact finite-sample coverage.',
              },
              {
                title: 'Stationarity Tests & Regime Diagnostics',
                desc: 'Deploy RWC or ACI extensions. Implement Hidden Markov Models or time-decay parameters to dynamically measure drift and rapidly expand buffers during volatility spikes.',
              },
              {
                title: 'Coverage Backtesting Metrics',
                desc: 'Upgrade beyond Kupiec tests to verify Conditional Coverage. Incorporate Dynamic Binary Tests to audit local failure modes during specific regimes.',
              },
              {
                title: 'Integration with Expected Shortfall (CVaR)',
                desc: 'Map conformal bounds from VaR to monotonic loss functions via CRC to comply with Basel FRTB frameworks.',
              },
              {
                title: 'Regulatory Acceptance & Model Governance',
                desc: 'Document the distribution-free proofs (SR 11-7). Maintain the architectural separation between the &ldquo;black-box&rdquo; forecaster and the transparent CP calibration layer.',
              },
            ].map((item, index) => (
              <div key={index} className="flex group">
                <div className="mr-4 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors shadow-sm">
                    {index + 1}
                  </div>
                  {index !== 4 && <div className="w-0.5 h-full bg-slate-200 mt-2" />}
                </div>
                <div className="pb-6">
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h4>
                  <p
                    className="text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-100 shadow-sm"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Google Doc CTA */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl text-center border border-indigo-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Read the Full Research Paper</h3>
          <p className="text-slate-600 mb-6">
            Dive deeper into the mathematical proofs, empirical results, and implementation details
            behind Conformal Prediction for Portfolio Risk.
          </p>
          <a
            href={googleDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
          >
            <ExternalLink className="w-5 h-5" />
            Open Research Paper
          </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-center border-t border-slate-800 mt-12">
        <div className="flex justify-center items-center space-x-2 text-slate-400 font-medium mb-4">
          <Zap className="text-yellow-400 w-5 h-5" />
          <span>Post-2022 Performance Metrics Architecture</span>
        </div>
        <p className="text-slate-500 text-sm mb-4">
          Based on <em>&ldquo;Taming Tail Risk: Conformal Risk Control for Nonstationary Portfolio VaR&rdquo;</em>
        </p>
        <p className="text-slate-600 text-xs">
          &copy; 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.
        </p>
      </footer>
    </div>
  );
}
