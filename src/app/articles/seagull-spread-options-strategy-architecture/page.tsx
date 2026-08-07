'use client';

import React, { useState } from 'react';
import { ArrowLeft, Maximize2, BookOpen, TrendingUp, TrendingDown, Globe, ShieldAlert, Activity, Clock, Percent, AlertTriangle, CheckCircle, XCircle, BarChart, Layers, Zap, DollarSign, Scale, LineChart, ExternalLink } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 ${className}`}>{children}</div>
);

interface SectionHeadingProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  color?: string;
}

const SectionHeading = ({ children, icon: Icon, color = 'text-blue-600' }: SectionHeadingProps) => (
  <div className="flex items-center gap-3 mb-6">
    {Icon && <Icon className={`w-8 h-8 ${color}`} />}
    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{children}</h2>
  </div>
);

const PayoffDiagram = () => {
  const width = 600;
  const height = 300;
  const paddingX = 50;
  const paddingY = 50;

  const mapX = (x: number): number => paddingX + ((x - 70) / 60) * (width - 2 * paddingX);
  const mapY = (y: number): number => (height - paddingY) - ((y + 25) / 40) * (height - 2 * paddingY);

  const points = [
    { x: 70, y: -20 },
    { x: 90, y: 0 },
    { x: 100, y: 0 },
    { x: 110, y: 10 },
    { x: 130, y: 10 }
  ];

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${mapX(p.x)} ${mapY(p.y)}`).join(' ');
  const zeroY = mapY(0);
  const lossArea = `M ${mapX(70)} ${zeroY} L ${mapX(70)} ${mapY(-20)} L ${mapX(90)} ${zeroY} Z`;
  const profitArea = `M ${mapX(100)} ${zeroY} L ${mapX(110)} ${mapY(10)} L ${mapX(130)} ${mapY(10)} L ${mapX(130)} ${zeroY} Z`;

  return (
    <svg viewBox="0 0 600 300" className="w-full max-w-2xl h-auto font-sans drop-shadow-sm bg-white rounded-xl border border-slate-100 p-2">
      {/* Grid lines */}
      <line x1={paddingX} y1={zeroY} x2={width - paddingX} y2={zeroY} stroke="#94a3b8" strokeWidth="2" />
      <line x1={mapX(90)} y1={paddingY} x2={mapX(90)} y2={height - paddingY} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
      <line x1={mapX(100)} y1={paddingY} x2={mapX(100)} y2={height - paddingY} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
      <line x1={mapX(110)} y1={paddingY} x2={mapX(110)} y2={height - paddingY} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />

      {/* Fill Areas */}
      <path d={lossArea} fill="#fee2e2" opacity="0.6" />
      <path d={profitArea} fill="#d1fae5" opacity="0.6" />

      {/* Payoff Line */}
      <path d={pathData} fill="none" stroke="#2563eb" strokeWidth="4" strokeLinejoin="round" />

      {/* Data Points */}
      {points.map((p, i) => (
        <circle key={i} cx={mapX(p.x)} cy={mapY(p.y)} r="5" fill="#1e40af" stroke="#ffffff" strokeWidth="2" />
      ))}

      {/* Axis Labels */}
      <text x={paddingX - 10} y={zeroY} textAnchor="end" alignmentBaseline="middle" className="text-[10px] fill-slate-500 font-medium">0</text>
      <text x={paddingX - 10} y={mapY(10)} textAnchor="end" alignmentBaseline="middle" className="text-[10px] fill-emerald-600 font-medium">Max Profit</text>

      <text x={mapX(90)} y={zeroY + 20} textAnchor="middle" className="text-[11px] fill-slate-700 font-bold">Strike A</text>
      <text x={mapX(90)} y={zeroY + 35} textAnchor="middle" className="text-[10px] fill-slate-500">(Short Put)</text>

      <text x={mapX(100)} y={zeroY + 20} textAnchor="middle" className="text-[11px] fill-slate-700 font-bold">Strike B</text>
      <text x={mapX(100)} y={zeroY + 35} textAnchor="middle" className="text-[10px] fill-slate-500">(Long Call)</text>

      <text x={mapX(110)} y={zeroY + 20} textAnchor="middle" className="text-[11px] fill-slate-700 font-bold">Strike C</text>
      <text x={mapX(110)} y={zeroY + 35} textAnchor="middle" className="text-[10px] fill-slate-500">(Short Call)</text>

      {/* Titles */}
      <text x={width / 2} y={height - 5} textAnchor="middle" className="text-[11px] fill-slate-400 font-semibold uppercase tracking-wider">Underlying Asset Price at Expiration</text>
      <text x={15} y={height / 2} textAnchor="middle" transform={`rotate(-90, 15, ${height / 2})`} className="text-[11px] fill-slate-400 font-semibold uppercase tracking-wider">Profit / Loss</text>
    </svg>
  );
};

export default function SeagullSpreadArticle() {
  const greeks = [
    {
      name: 'Delta (&Delta;)',
      subtitle: 'Directional Velocity',
      icon: TrendingUp,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      iconColor: 'text-blue-500',
      content: 'Measures pure directional exposure. Net delta is overwhelmingly positive initially but highly non-linear. Rapid rallies neutralize delta to near absolute zero (the profit cap), while steep drop-offs massively increase delta, accelerating losses.'
    },
    {
      name: 'Gamma (&Gamma;)',
      subtitle: 'The Acceleration Factor',
      icon: Activity,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      iconColor: 'text-purple-500',
      content: 'Measures the rate of change of Delta. Seagulls feature complex gamma due to holding both long and short contracts. The "gamma trap" near the naked financing leg is the primary risk management challenge, creating exponentially accelerating losses if breached.'
    },
    {
      name: 'Theta (&Theta;)',
      subtitle: 'Time Decay Dynamics',
      icon: Clock,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      iconColor: 'text-amber-500',
      content: 'Because the investor is short two option contracts and long only one, the positive theta from the out-of-the-money legs frequently outpaces the negative theta. The strategy operates as highly resilient, generating slow profit if the asset remains stagnant.'
    },
    {
      name: 'Vega (&nu;)',
      subtitle: 'Implied Volatility Sensitivity',
      icon: BarChart,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      iconColor: 'text-rose-500',
      content: 'Exhibits a net negative Vega profile. Structurally benefits from massive contractions in market volatility (a "volatility crush"). However, sudden macroeconomic shocks that spike implied volatility become severe liabilities.'
    },
    {
      name: 'Rho (&rho;)',
      subtitle: 'Interest Rate Exposure',
      icon: Percent,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconColor: 'text-emerald-500',
      content: 'Measures sensitivity to changes in the risk-free interest rate. While often marginalized short-term, a macro shift in central bank policy can subtly tilt the delta neutrality of long-dated Seagull structures used for multi-year hedging.'
    }
  ];

  const comparisons = [
    { strategy: 'Seagull Spread', objective: 'Financed Directional Exposure', risk: 'Undefined (Naked Leg)', reward: 'Strictly Capped', capital: 'Zero-Cost / Net Credit', highlight: true },
    { strategy: 'Vertical Spread', objective: 'Directional Speculation', risk: 'Strictly Defined', reward: 'Strictly Capped', capital: 'Net Debit Paid' },
    { strategy: 'Risk Reversal', objective: 'Synthetic Long/Short', risk: 'Undefined', reward: 'Undefined (Infinite)', capital: 'Zero-Cost / Net Credit' },
    { strategy: 'Collar', objective: 'Equity Preservation', risk: 'Strictly Defined', reward: 'Strictly Capped', capital: 'High (Requires Long Equity)' },
    { strategy: 'Butterfly', objective: 'Volatility Neutrality', risk: 'Strictly Defined', reward: 'Strictly Capped', capital: 'Small Net Debit Paid' },
  ];

  const prosCons = [
    {
      attribute: 'Capital Outlay & Efficiency',
      pro: 'Can be structured precisely for a net-zero cost or net credit, preserving vital capital for alternative allocations.',
      con: 'The "zero-cost" illusion can easily lead to catastrophic overleveraging, masking severe margin risks.'
    },
    {
      attribute: 'Directional Exposure',
      pro: 'Allows robust participation in targeted equity trends with a significantly higher mathematical probability of profit.',
      con: 'Profit potential is strictly and unyieldingly capped by the short option, resulting in underperformance during explosive rallies.'
    },
    {
      attribute: 'Volatility Dynamics & Skew',
      pro: 'Capitalizes aggressively on the equity volatility smirk by selling heavily inflated OTM puts to seamlessly fund long positions.',
      con: 'Highly sensitive to sudden, adverse spikes in implied volatility (Negative Vega).'
    },
  ];

  return (
    <ArticleFrame slug="seagull-spread-options-strategy-architecture">
      <InfographicSlot alt="Seagull Spread Options Strategy Infographic" />
      <main className="max-w-5xl mx-auto px-6 pb-24">
          {/* Introduction */}
          <section>
            <Card className="shadow-xl shadow-indigo-100/50 border-t-4 border-t-indigo-500">
              <SectionHeading icon={Layers} color="text-indigo-600">Introduction to the Options Landscape</SectionHeading>
              <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-loose">
                <p>Within the highly sophisticated architecture of modern financial derivatives, institutional investors, corporate treasurers, and portfolio managers are perpetually engaged in the pursuit of optimizing the delicate equilibrium between capital efficiency, directional exposure, and absolute risk mitigation.</p>
                <p>Direct directional plays suffer from the friction of premium decay and high implied volatility costs. Conversely, standard spread strategies define and cap risk but inherently limit the magnitude of potential profitability.</p>
                <div className="bg-indigo-50 rounded-xl p-6 my-8 border border-indigo-100">
                  <h3 className="text-indigo-900 font-bold text-lg mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-indigo-600" /> The Core Philosophy
                  </h3>
                  <p className="text-indigo-800 m-0 leading-relaxed">The Seagull effectively finances directional speculation or portfolio hedging, frequently resulting in a "zero-cost" or even a net-credit entry profile. It is the deliberate, calculated exchange of theoretical unlimited profit potential and the explicit assumption of tail risk in return for the complete elimination of upfront premium outlays.</p>
                </div>
              </div>
            </Card>
          </section>

          {/* Origins */}
          <section>
            <SectionHeading icon={Globe} color="text-teal-600">Origins in FX and Commodities</SectionHeading>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <DollarSign className="w-24 h-24 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Corporate FX Hedging</h3>
                <p className="text-slate-600 leading-relaxed">Corporations issuing massive volumes of debt in foreign currency markets require hedges that do not cannibalize operational budgets. For instance, Mexico&apos;s Pemex transitioned from traditional cross-currency swaps to Seagull options to secure a zero-cost hedge that still allowed upside capture from favorable currency fluctuations.</p>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ShieldAlert className="w-24 h-24 text-rose-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Commodity Buffering</h3>
                <p className="text-slate-600 leading-relaxed">Businesses deeply invested in physical commodities face immense operational risks during geopolitical crises. By utilizing a Seagull spread, corporations secure an absolute cap on raw material costs (via a long call spread), financed seamlessly by selling an OTM put during periods of skyrocketing implied volatility.</p>
              </div>
            </div>
          </section>

          {/* Structural Mechanics */}
          <section>
            <SectionHeading icon={Scale} color="text-fuchsia-600">Structural Mechanics &amp; Architecture</SectionHeading>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl">The Seagull spread is a strictly directional, three-legged strategy consisting of options on the identical underlying asset, with all three contracts sharing the exact same expiration date.</p>
            <div className="space-y-8">
              {/* Bullish Seagull */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-900">The Bullish Seagull</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white/80 p-5 rounded-xl border border-emerald-100">
                    <h4 className="font-bold text-emerald-800 mb-2">1. Long Call</h4>
                    <p className="text-sm text-emerald-700"><strong>The Acceleration Leg.</strong> Purchases an ATM/OTM call to capture upward price action.</p>
                  </div>
                  <div className="bg-white/80 p-5 rounded-xl border border-emerald-100">
                    <h4 className="font-bold text-emerald-800 mb-2">2. Short Call</h4>
                    <p className="text-sm text-emerald-700"><strong>The Capping Leg.</strong> Sells a further OTM call. Caps maximum upside but reduces net cost.</p>
                  </div>
                  <div className="bg-white/80 p-5 rounded-xl border border-emerald-100">
                    <h4 className="font-bold text-emerald-800 mb-2">3. Short Put</h4>
                    <p className="text-sm text-emerald-700"><strong>The Financing Leg.</strong> Sells an OTM put below market price to entirely fund the long exposure.</p>
                  </div>
                </div>
                <div className="bg-emerald-900 text-emerald-50 p-4 rounded-xl font-mono text-center shadow-inner">
                  Formula: Net Premium = C&#8321; (Long Call) - C&#8322; (Short Call) - P&#8321; (Short Put) &asymp; $0
                </div>
              </div>

              {/* Bearish Seagull */}
              <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-8 border border-rose-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-rose-100 p-3 rounded-full text-rose-600">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-rose-900">The Bearish Seagull</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/80 p-5 rounded-xl border border-rose-100">
                    <h4 className="font-bold text-rose-800 mb-2">1. Long Put</h4>
                    <p className="text-sm text-rose-700"><strong>The Acceleration Leg.</strong> Purchases an ATM/OTM put to capture downward price action.</p>
                  </div>
                  <div className="bg-white/80 p-5 rounded-xl border border-rose-100">
                    <h4 className="font-bold text-rose-800 mb-2">2. Short Put</h4>
                    <p className="text-sm text-rose-700"><strong>The Capping Leg.</strong> Sells a further OTM put. Limits maximum profit on downside but subsidizes cost.</p>
                  </div>
                  <div className="bg-white/80 p-5 rounded-xl border border-rose-100">
                    <h4 className="font-bold text-rose-800 mb-2">3. Short Call</h4>
                    <p className="text-sm text-rose-700"><strong>The Financing Leg.</strong> Sells an OTM call above market price to fund the remaining debit.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Payoff Visual Section */}
          <section>
            <Card className="border-t-4 border-t-blue-500 shadow-xl shadow-blue-100/50">
              <SectionHeading icon={LineChart} color="text-blue-600">Visualizing the Payoff</SectionHeading>
              <div className="text-lg text-slate-600 mb-8 max-w-3xl">
                <p>The payoff profile of a Bullish Seagull reveals the stark strategic trade-off: surrendering unlimited upside and assuming extreme downside tail risk to manufacture a "zero-cost" medium-term directional bet.</p>
              </div>
              <div className="w-full overflow-hidden bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center p-6 md:p-10">
                <PayoffDiagram />
                {/* Zone Indicators */}
                <div className="grid md:grid-cols-3 gap-4 w-full max-w-3xl mt-8 text-center">
                  <div className="bg-white p-4 rounded-xl border-t-4 border-red-400 shadow-sm">
                    <div className="text-red-600 font-bold mb-1">Tail Risk Zone</div>
                    <div className="text-xs text-slate-500 font-mono mb-2">Price &lt; Strike A</div>
                    <p className="text-sm text-slate-600 leading-snug">Exponentially accelerating losses as the underlying price collapses through the short put financing leg.</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border-t-4 border-slate-300 shadow-sm">
                    <div className="text-slate-700 font-bold mb-1">Zero-Cost Flatline</div>
                    <div className="text-xs text-slate-500 font-mono mb-2">Strike A &le; Price &le; Strike B</div>
                    <p className="text-sm text-slate-600 leading-snug">The buffer zone. Both the long directional leg and the financing leg expire worthless. Capital preserved.</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border-t-4 border-emerald-400 shadow-sm">
                    <div className="text-emerald-600 font-bold mb-1">Capped Profit Zone</div>
                    <div className="text-xs text-slate-500 font-mono mb-2">Price &gt; Strike C</div>
                    <p className="text-sm text-slate-600 leading-snug">The long call generates profit, but is forcefully arrested by the short call above it.</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Volatility Skew */}
          <section>
            <Card className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-none shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Activity className="w-48 h-48" />
              </div>
              <div className="relative z-10 max-w-4xl">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-indigo-100">
                  <Zap className="w-8 h-8 text-amber-400" /> The Equity Volatility Skew
                </h2>
                <div className="space-y-6 text-indigo-100 text-lg leading-relaxed">
                  <p>To truly master the application of the Seagull spread, an institutional investor must possess a profound understanding of implied volatility (IV) and the <strong>volatility smirk</strong>.</p>
                  <p>In modern equity markets, the volatility skew is predominantly downward-sloping. Large asset managers relentlessly purchase OTM put options for downside protection. This massive demand pushes up the premium of OTM puts relative to equidistant OTM call options.</p>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 mt-8">
                    <h4 className="text-amber-400 font-bold text-xl mb-2">Asymmetric Pricing Arbitrage</h4>
                    <p className="text-white text-base">The Bullish Seagull spread is uniquely positioned to exploit this structural pricing inefficiency. By selling heavily inflated OTM disaster protection (the skew), traders seamlessly fund heavily underpriced upside participation. It is a targeted relative-value institutional trade.</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Greeks */}
          <section>
            <SectionHeading icon={BarChart} color="text-amber-500">Multi-Dimensional Risk Profiling</SectionHeading>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl">The dynamic behavioral profile of the Seagull spread prior to expiration is strictly governed by its continuous sensitivity to the underlying pricing variables&mdash;the option Greeks.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {greeks.map((greek, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border ${greek.color} transition-transform hover:-translate-y-1`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <greek.icon className={`w-6 h-6 ${greek.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg" dangerouslySetInnerHTML={{ __html: greek.name }}></h3>
                      <p className="text-xs font-semibold opacity-75 uppercase tracking-wider">{greek.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed opacity-90">{greek.content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Comparisons */}
          <section>
            <SectionHeading icon={Layers} color="text-blue-600">Comparative Strategic Landscape</SectionHeading>
            <div className="overflow-x-auto rounded-2xl shadow-sm border border-slate-200">
              <table className="w-full text-left bg-white border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-sm uppercase tracking-wider">
                    <th className="p-4 font-semibold border-b border-slate-200">Strategy</th>
                    <th className="p-4 font-semibold border-b border-slate-200">Primary Objective</th>
                    <th className="p-4 font-semibold border-b border-slate-200">Risk Profile</th>
                    <th className="p-4 font-semibold border-b border-slate-200">Reward Profile</th>
                    <th className="p-4 font-semibold border-b border-slate-200">Net Capital Requirement</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 divide-y divide-slate-100">
                  {comparisons.map((comp, idx) => (
                    <tr key={idx} className={comp.highlight ? 'bg-indigo-50/50 font-medium' : 'hover:bg-slate-50'}>
                      <td className="p-4 flex items-center gap-2">
                        {comp.highlight && <Zap className="w-4 h-4 text-indigo-600" />}
                        <span className={comp.highlight ? 'text-indigo-900 font-bold' : ''}>{comp.strategy}</span>
                      </td>
                      <td className="p-4">{comp.objective}</td>
                      <td className="p-4">{comp.risk}</td>
                      <td className="p-4">{comp.reward}</td>
                      <td className="p-4">{comp.capital}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Risk Mitigation & Margin */}
          <section className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading icon={ShieldAlert} color="text-red-500">Risk Mitigation Protocols</SectionHeading>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                  <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" /> The Naked Leg Danger
                  </h4>
                  <p className="text-sm text-slate-600">The absolute primary vulnerability resides entirely in the naked short option utilized to finance the structure. Novice participants frequently make the catastrophic mistake of equating zero upfront cost with zero risk.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-orange-400"></div>
                  <h4 className="font-bold text-slate-800 mb-2">Dynamic Hedging</h4>
                  <p className="text-sm text-slate-600">If the underlying equity aggressively sells off, portfolio managers dynamically hedge by shorting corresponding shares to neutralize delta and stop the acceleration of losses (the gamma trap).</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                  <h4 className="font-bold text-slate-800 mb-2">Structural Conversion</h4>
                  <p className="text-sm text-slate-600">To parameterize tail risk, risk managers often purchase an extreme OTM wing, mathematically transforming the undefined risk Seagull into a strictly defined risk "Super Bull" or asymmetrical Iron Condor.</p>
                </div>
              </div>
            </div>
            <div>
              <SectionHeading icon={DollarSign} color="text-emerald-600">Institutional Margin Architecture</SectionHeading>
              <Card className="h-full border-t-4 border-t-emerald-500">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Regulation T Margin</h4>
                    <p className="text-sm text-slate-600 mb-2">Under standard Reg T, margin requirements for an uncovered short leg are highly punitive. A zero-cost trade can encumber thousands of dollars per contract, drastically reducing Return on Capital (ROC).</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-indigo-700 border-b border-indigo-100 pb-2 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" /> Portfolio Margin (TIMS)
                    </h4>
                    <p className="text-sm text-slate-600 mb-4">Available to qualified institutional entities, PM evaluates the true risk holistically by stress-testing the portfolio across theoretical price points. It recognizes the offset of the long/short legs.</p>
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 text-sm text-emerald-800 font-medium">Result: A massive margin reduction of 60% to 85% compared to Reg T, offering extreme capital efficiency leverage ratios approaching 6.7:1.</div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Pros and Cons */}
          <section>
            <SectionHeading icon={Scale} color="text-slate-800">Comprehensive Evaluation</SectionHeading>
            <div className="grid md:grid-cols-2 gap-6">
              {prosCons.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                  <div className="bg-slate-50 p-4 border-b border-slate-200 font-bold text-slate-800 text-center">{item.attribute}</div>
                  <div className="p-6 flex-1 space-y-4">
                    <div className="flex gap-3">
                      <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                      <p className="text-sm text-slate-600"><span className="font-bold text-emerald-700">Pro:</span> {item.pro}</p>
                    </div>
                    <div className="flex gap-3 pt-4 border-t border-slate-100">
                      <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                      <p className="text-sm text-slate-600"><span className="font-bold text-red-700">Con:</span> {item.con}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="pb-16">
            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center shadow-xl border border-slate-800">
              <h2 className="text-3xl font-bold text-white mb-6">Final Strategic Assessment</h2>
              <p className="text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto">The Seagull spread represents a highly sophisticated, mathematically efficient mechanism at the precise intersection of directional speculation and volatility skew arbitrage. It is fundamentally unsuited for novice retail participants in standard cash accounts due to the immense capital encumbrance of the naked leg. <br /><br />However, for the institutional portfolio manager equipped with Portfolio Margin, advanced dynamic delta-hedging protocols, and a rigorous quantitative understanding of the second-order Greeks, the Seagull spread operates as an absolutely indispensable architectural tool for long-term equity portfolio optimization.</p>
            </div>
          </section>

        </main>
    </ArticleFrame>
  );
}