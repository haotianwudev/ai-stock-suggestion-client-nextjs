'use client';

import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, CircleDollarSign, Layers, Activity, AlertTriangle, Info, Zap, HelpCircle, Clock, Briefcase, Skull } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Components ---
const Card = ({ title, icon: Icon, color, children }: { 
  title: string; 
  icon: React.ComponentType<any>; 
  color: string; 
  children: React.ReactNode; 
}) => (
  <div className="bg-white dark:bg-[#0A0D14] rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow duration-300 h-full">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
      <Icon className="text-white" size={24} />
    </div>
    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 font-serif">{title}</h3>
    <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{children}</div>
  </div>
);

const SectionHeading = ({ children, subtitle, centered = false }: { 
  children: React.ReactNode; 
  subtitle?: string; 
  centered?: boolean; 
}) => (
  <div className={`mb-12 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 font-serif">{children}</h2>
    {subtitle && <p className="text-slate-500 max-w-2xl">{subtitle}</p>}
    <div className="w-20 h-1.5 bg-[#A8672E] dark:bg-[#D08F52] rounded-full mt-4"></div>
  </div>
);

export default function ArchitectureStructuredNotes() {
  const [activeTab, setActiveTab] = useState('protection');
  
  const categories: Record<string, {
    title: string;
    icon: React.ComponentType<any>;
    color: string;
    description: string;
    details: string;
  }> = {
    protection: {
      title: "Protection Notes",
      icon: ShieldCheck,
      color: "bg-[#1D8A70] dark:bg-[#3CBF9C]",
      description: "Prioritize capital preservation, offering full or partial protection against declines in the underlying asset.",
      details: "Ideal for risk-averse investors seeking market exposure with defined downside limits. Often features a 100% principal guarantee or a large downside buffer."
    },
    growth: {
      title: "Growth Notes",
      icon: TrendingUp,
      color: "bg-[#A8672E] dark:bg-[#D08F52]",
      description: "Designed to provide enhanced or leveraged participation in the positive performance of an underlying asset.",
      details: "For moderately bullish investors. Offers leveraged participation rates (e.g., 1.5x) in exchange for capped upside or contingent protection."
    },
    yield: {
      title: "Yield Notes",
      icon: CircleDollarSign,
      color: "bg-amber-500",
      description: "Aim to generate enhanced yield or regular coupon payments higher than comparable fixed-income.",
      details: "For income-focused investors. Generates high coupons by selling options (capping upside or assuming downside risk)."
    }
  };

  return (
    <ArticleFrame slug="architecture-structured-notes-comprehensive-investors-guide">
      <div className="max-w-4xl mx-auto mb-16 px-6">
        <InfographicSlot alt="Structured Notes Architecture Infographic" />
      </div>

      <div className="container mx-auto px-6">
          {/* Asset Comparison Table */}
          <section className="py-20 bg-white dark:bg-[#0A0D14]">
            <SectionHeading centered subtitle="Understanding where Structured Notes sit in the asset class spectrum.">
              Notes vs. Traditional Investments
            </SectionHeading>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white dark:bg-[#0A0D14] rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#14171B] border-b border-slate-100 dark:border-slate-800">
                    <th className="px-6 py-4 font-bold text-slate-400 uppercase text-xs tracking-widest">Feature</th>
                    <th className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">Traditional Stocks</th>
                    <th className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">Traditional Bonds</th>
                    <th className="px-6 py-4 font-bold text-[#A8672E] dark:text-[#D08F52] bg-[#A8672E]/10 dark:bg-[#D08F52]/10/50">Structured Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ["Principal Risk", "High; full loss possible", "Low (issuer dependent)", "Varies; subject to Credit Risk"],
                    ["Return Profile", "Potentially Unlimited", "Fixed/Predictable", "Non-linear; Defined Outcomes"],
                    ["Income Source", "Variable Dividends", "Fixed Coupons", "Contingent Coupons"],
                    ["Liquidity", "High (Exchange-traded)", "High (Secondary Market)", "Very Low (Hold to maturity)"],
                    ["Complexity", "Low to Moderate", "Low", "Very High"],
                    ["Risk Driver", "Market & Company", "Rates & Issuer Credit", "Credit + Market + Complexity"]
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:bg-[#14171B]/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300 text-sm bg-slate-50 dark:bg-[#14171B]/30">{row[0]}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{row[1]}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{row[2]}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 text-sm bg-[#A8672E]/10 dark:bg-[#D08F52]/10/20">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Core Components Section */}
          <section className="py-20 bg-slate-50 dark:bg-[#14171B]">
            <SectionHeading subtitle="The symbiotic relationship between debt and optionality.">
              The Two Building Blocks
            </SectionHeading>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white dark:bg-[#0A0D14] p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-6">
                  <Layers className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-serif">Zero-Coupon Bond (ZCB)</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Purchased at a discount, this component accretes back to par value by the maturity date. In a high-interest-rate environment, the deeper discount allows for a larger options budget.
                </p>
                <div className="p-4 bg-slate-50 dark:bg-[#14171B] rounded-xl">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-widest">Bond Function</div>
                  <div className="text-slate-900 dark:text-slate-100 font-semibold">Sources the "Principal Protection" guarantee (subject to issuer credit).</div>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="w-14 h-14 bg-[#A8672E] dark:bg-[#D08F52] rounded-2xl flex items-center justify-center mb-6">
                  <Activity className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-serif">Derivative Package</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  The portion of capital not used for the ZCB (the discount) buys call and put options. This engine creates upside participation, downside buffers, or yield.
                </p>
                <div className="p-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-xl">
                  <div className="text-xs font-bold text-[#A8672E] dark:text-[#D08F52] uppercase mb-2 tracking-widest">Derivative Function</div>
                  <div className="text-[#A8672E] dark:text-[#D08F52] font-semibold">Defines the specific "Payoff Formula" (Capped, Leveraged, etc).</div>
                </div>
              </div>
            </div>
          </section>

          {/* Note Categories (Tabs) */}
          <section className="py-24 bg-white dark:bg-[#0A0D14]">
            <SectionHeading subtitle="A Framework for Understanding Investment Objectives.">
              The Taxonomy of Customization
            </SectionHeading>
            <div className="flex flex-wrap gap-2 mb-12 p-1.5 bg-slate-100 rounded-2xl w-fit">
              {Object.entries(categories).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    activeTab === key ? 'bg-white dark:bg-[#0A0D14] text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className={`p-10 rounded-3xl transition-all duration-500 ${categories[activeTab].color} bg-opacity-5`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${categories[activeTab].color}`}>
                  {React.createElement(categories[activeTab].icon, { className: "text-white", size: 32 })}
                </div>
                <h3 className="text-4xl font-bold mb-6 text-slate-900 dark:text-slate-100 font-serif">{categories[activeTab].title}</h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">{categories[activeTab].description}</p>
                <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{categories[activeTab].details}</p>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Target Profile Breakdown</h4>
                <div className="space-y-4">
                  {[
                    { 
                      label: "Market View", 
                      value: activeTab === 'growth' ? "Bullish" : activeTab === 'protection' ? "Neutral/Bearish" : "Range-bound" 
                    },
                    { 
                      label: "Key Trade-Off", 
                      value: activeTab === 'protection' ? "Capped Upside" : activeTab === 'growth' ? "Contingent Protection" : "Principal Risk" 
                    },
                    { 
                      label: "Secondary Risk", 
                      value: activeTab === 'protection' ? "Inflation Risk" : activeTab === 'growth' ? "Cliff Risk" : "Short Volatility" 
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-slate-100 dark:border-slate-800">
                      <span className="font-semibold text-slate-500">{item.label}</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Structures Deep Dive */}
          <section className="py-24 bg-slate-50 dark:bg-[#14171B]">
            <SectionHeading subtitle="Common but complex structures that demand specialized knowledge.">
              Advanced Structures: Autocalls & RCNs
            </SectionHeading>
            <div className="grid md:grid-cols-2 gap-10">
              {/* Autocallable Notes */}
              <div className="bg-white dark:bg-[#0A0D14] p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-xl text-[#A8672E] dark:text-[#D08F52]">
                    <Clock size={28} />
                  </div>
                  <h3 className="text-2xl font-bold font-serif">Autocallable Notes</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Features pre-set <strong>observation dates</strong>. If the underlier is at or above the <strong>autocall level</strong> (usually 100%), the note is redeemed early with a premium.
                </p>
                <div className="space-y-4 border-t border-slate-50 pt-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8672E] dark:bg-[#D08F52] text-white flex items-center justify-center text-xs font-bold mt-1">1</div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">Memory Feature:</span>
                      <span className="text-sm text-slate-500">Missed coupons can accrue and be paid in a lump sum later if triggers are met.</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#A8672E] dark:bg-[#D08F52] text-white flex items-center justify-center text-xs font-bold mt-1">2</div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">Reinvestment Risk:</span>
                      <span className="text-sm text-slate-500">Often called when yields are low, forcing capital redeployment in unfavorable markets.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reverse Convertibles */}
              <div className="bg-white dark:bg-[#0A0D14] p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                    <Zap size={28} />
                  </div>
                  <h3 className="text-2xl font-bold font-serif">Reverse Convertibles (RCN)</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  High-coupon income products where the investor is implicitly <strong>selling a put option</strong>. Principal repayment is contingent on the "knock-in" barrier.
                </p>
                <div className="space-y-4 border-t border-slate-50 pt-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold mt-1">1</div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">Physical Delivery:</span>
                      <span className="text-sm text-slate-500">If the barrier is breached, you may receive depreciated shares of stock instead of cash.</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold mt-1">2</div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">Asymmetric Risk:</span>
                      <span className="text-sm text-slate-500">Upside is capped at the coupon; downside loss can be near 100% of principal.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* The Lehman Lesson - Case Study */}
          <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/2">
                  <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-[#BC4128] dark:text-[#E2694A] uppercase bg-[#BC4128] dark:bg-[#E2694A]/10 rounded-full">Crucial Case Study</span>
                  <h2 className="text-4xl font-bold mb-8 leading-tight font-serif">The Lehman Lesson: Why Credit Risk Overrides Everything</h2>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    In 2008, Lehman Brothers was a top-tier issuer of "Principal Protected Notes." When they filed for bankruptcy, those protections became empty promises. Investors discovered that a note is simply an <strong>unsecured promise to pay.</strong>
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                      <Skull className="text-[#BC4128] dark:text-[#E2694A] mb-3" size={32} />
                      <div className="text-2xl font-bold">21¢</div>
                      <div className="text-xs text-slate-500 font-bold uppercase">Recovery Estimates</div>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                      <AlertTriangle className="text-[#BC4128] dark:text-[#E2694A] mb-3" size={32} />
                      <div className="text-2xl font-bold">100% Loss</div>
                      <div className="text-xs text-slate-500 font-bold uppercase">For many unsecured notes</div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 bg-slate-800 p-10 rounded-[3rem] border border-slate-700 shadow-2xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3 font-serif">
                    <Info className="text-[#BC4128] dark:text-[#E2694A]" /> Key Warning
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#BC4128] dark:bg-[#E2694A] mt-2 flex-shrink-0"></div>
                      <p className="text-slate-300">Any promise of "100% Protection" is only as good as the bank's balance sheet.</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#BC4128] dark:bg-[#E2694A] mt-2 flex-shrink-0"></div>
                      <p className="text-slate-300">Notes do not confer ownership of the underlying assets. You are an unsecured creditor.</p>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#BC4128] dark:bg-[#E2694A] mt-2 flex-shrink-0"></div>
                      <p className="text-slate-300">Diversifying by underlier (e.g., S&P 500) does NOT diversify issuer credit risk.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Implementation & Taxation */}
          <section className="py-24 bg-white dark:bg-[#0A0D14]">
            <SectionHeading subtitle="Strategic placement and the reality of the tax bill.">
              Portfolio Implementation & Taxation
            </SectionHeading>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#A8672E]/10 dark:bg-[#D08F52]/10 flex-shrink-0 flex items-center justify-center text-[#A8672E] dark:text-[#D08F52]">
                    <Briefcase size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 font-serif">Core vs. Tactical</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                      Notes can serve as a <strong>Core Holding</strong> (replacing a portion of equity exposure to reduce volatility) or a <strong>Tactical Play</strong> (expressing a nuanced sector view with a buffer).
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 flex-shrink-0 flex items-center justify-center text-[#1D8A70] dark:text-[#3CBF9C]">
                    <HelpCircle size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 font-serif">Behavioral Anchor</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                      Pre-defined outcomes can act as a commitment device, preventing emotional panic-selling during corrections of 15-20% when a buffer is present.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-[#14171B] p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 font-serif">
                  <AlertTriangle className="text-amber-500" size={20} /> The Tax Headwind
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-white dark:bg-[#0A0D14] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Ordinary Income Treatment:</span>
                    <p className="text-slate-600 dark:text-slate-400">Gains on many notes are taxed at ordinary rates rather than preferential long-term capital gains rates.</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-[#0A0D14] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Phantom Income (OID):</span>
                    <p className="text-slate-600 dark:text-slate-400">OID rules may require you to pay taxes on accrued interest yearly, even if no cash is received until maturity.</p>
                  </div>
                  <div className="p-4 bg-[#A8672E] dark:bg-[#D08F52] text-white rounded-xl shadow-lg shadow-indigo-100">
                    <span className="font-bold block mb-1">Mitigation Strategy:</span>
                    <p className="text-[#A8672E] dark:text-[#D08F52]">Hold structured notes in tax-sheltered accounts (IRAs/401ks) to avoid the ordinary income vs. capital gains issues.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Due Diligence Checklist */}
          <section className="py-24 bg-slate-50 dark:bg-[#14171B] border-t border-slate-200 dark:border-slate-800">
            <SectionHeading centered subtitle="Ask your advisor these specific questions before committing capital.">
              Investor Due Diligence Checklist
            </SectionHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  q: "What is the bank's credit rating?",
                  d: "Am I comfortable being an unsecured creditor of this specific institution for the full term?"
                },
                {
                  q: "Can I sell this before maturity?",
                  d: "What are the costs, penalties, and will the price be at a significant discount to fair value?"
                },
                {
                  q: "What is the Estimated Value vs. Price?",
                  d: "The purchase price includes embedded costs for structuring, hedging, and broker commissions."
                },
                {
                  q: "Can I articulate the payoff scenarios?",
                  d: "What happens if the underlier is up 20%, flat, or down 40%? Can I explain it without a brochure?"
                },
                {
                  q: "What is the reinvestment plan?",
                  d: "If the note is called early in year 1, how will I deploy that cash in a potentially lower-yield environment?"
                },
                {
                  q: "Is the custom payoff worth the cost?",
                  d: "Compare the note to a simple ETF or direct options strategy. Does the customization justify the fees?"
                }
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-[#0A0D14] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">{item.q}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

      </div>
    </ArticleFrame>
  );
}