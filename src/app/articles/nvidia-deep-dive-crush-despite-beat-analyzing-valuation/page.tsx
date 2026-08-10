'use client';

import React from 'react';
import { TrendingUp, Activity, AlertTriangle, ShieldAlert, ArrowRight, BrainCircuit, Layers, Scale, Zap, Lock, Search } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Reusable Components ---
const SectionHeader = ({ title, subtitle, icon: Icon, color = "blue" }: { title: string; subtitle: string; icon: any; color?: string }) => (
  <div className="flex items-start gap-4 mb-6">
    <div className={`p-3 rounded-xl bg-${color}-100 text-${color}-600 shadow-sm`}>
      <Icon size={28} strokeWidth={1.5} />
    </div>
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-serif">{title}</h2>
      <p className="text-slate-500 font-medium">{subtitle}</p>
    </div>
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-[#0A0D14] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

const MetricRow = ({ label, value, subtext, type = "neutral" }: { label: string; value: string; subtext?: string; type?: string }) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
    <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">{label}</span>
    <div className="text-right">
      <div className="font-bold text-slate-900 dark:text-slate-100">{value}</div>
      {subtext && (
        <div className={`text-xs ${type === 'good' ? 'text-[#1D8A70] dark:text-[#3CBF9C]' : type === 'bad' ? 'text-[#BC4128] dark:text-[#E2694A]' : 'text-slate-400'}`}>
          {subtext}
        </div>
      )}
    </div>
  </div>
);

const InsightBox = ({ title, children, type = "info" }: { title: string; children: React.ReactNode; type?: string }) => {
  const colors: Record<string, string> = {
    info: "bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border-blue-100 text-blue-900",
    risk: "bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border-rose-100 text-rose-900",
    success: "bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 border-emerald-100 text-emerald-900",
    warning: "bg-amber-50 border-amber-100 text-amber-900",
  };

  const Icon = type === 'risk' ? AlertTriangle : type === 'success' ? TrendingUp : type === 'warning' ? Zap : Search;

  return (
    <div className={`p-5 rounded-xl border ${colors[type]} mb-4`}>
      <div className="flex items-center gap-2 mb-2 font-bold">
        <Icon size={16} />
        {title}
      </div>
      <div className="text-sm leading-relaxed opacity-90">
        {children}
      </div>
    </div>
  );
};

// --- Main Application ---
export default function NvidiaDeepDive() {
  return (
    <ArticleFrame
      slug="nvidia-deep-dive-crush-despite-beat-analyzing-valuation"
      additionalDisclaimer="This analysis reflects a point-in-time snapshot following Q3 FY26 earnings; NVIDIA's price, valuation multiples, and market conditions will have changed materially since publication."
    >
      <div className="max-w-7xl mx-auto px-4 text-slate-900 dark:text-slate-100">
        <InfographicSlot alt="NVIDIA Market Analysis Infographic" />

        <div className="space-y-16">
          {/* 1. Executive Summary & Market Reaction */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#1D8A70] dark:bg-[#3CBF9C] opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-slate-800 rounded-full px-3 py-1 text-xs font-medium text-[#1D8A70] dark:text-[#3CBF9C] mb-4 border border-slate-700">
                      <Activity size={12} /> Post-Earnings Analysis
                    </div>
                    <h2 className="text-4xl font-extrabold mb-6 leading-tight font-serif">
                      Why the &ldquo;Crush&rdquo; Despite the Beat?
                    </h2>

                    <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                      NVIDIA delivered a &ldquo;beat and raise&rdquo; quarter, yet the stock sold off. This phenomenon is classic <strong>&ldquo;pricing for perfection.&rdquo;</strong> When a company is valued at roughly 30x forward sales, merely beating estimates isn&apos;t enough&mdash;the <em>magnitude</em> of the beat must accelerate. It didn&apos;t.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InsightBox type="warning" title="The Whisper Number Gap">
                        Analysts expected $55B. The &ldquo;Whisper Number&rdquo; (buy-side expectation) was closer to $57B. NVDA hit $57.01B. Technically a beat, but essentially &ldquo;in-line&rdquo; for aggressive hedge funds.
                      </InsightBox>
                      <InsightBox type="risk" title="Guidance Deceleration">
                        Q4 Revenue guidance of $37.5B implies growth slowing to &ldquo;only&rdquo; 70% YoY, down from triple digits. The Law of Large Numbers is finally kicking in.
                      </InsightBox>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="h-full border-l-4 border-l-emerald-500">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">Quick Stats (Q3 FY26)</h3>
                  <MetricRow label="Revenue" value="$35.08 B" subtext="+94% YoY" type="good" />
                  <MetricRow label="Data Center" value="$30.8 B" subtext="+112% YoY" type="good" />
                  <MetricRow label="Gross Margin" value="74.6%" subtext="-110 bps QoQ" type="bad" />
                  <MetricRow label="Net Income" value="$19.3 B" subtext="+109% YoY" type="good" />

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Sentiment Score</p>
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                      <div className="bg-amber-400 h-2 rounded-full w-3/5"></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Bearish</span>
                      <span className="text-slate-600 dark:text-slate-400 font-bold">Cautious</span>
                      <span>Bullish</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* 2. Fundamentals & Quantitative Analysis */}
          <section>
            <SectionHeader
              title="Quantitative Fundamentals"
              subtitle="Financial Health & Valuation Metrics"
              icon={Scale}
              color="indigo"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <div className="text-slate-500 text-sm font-medium mb-1">P/E Ratio (Fwd)</div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">32.4x</div>
                <div className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] mt-2 flex items-center">
                  <ArrowRight size={12} className="mr-1" /> Historic Avg: 45x
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Trading below 5yr average due to earnings catching up to price.
                </p>
              </Card>

              <Card>
                <div className="text-slate-500 text-sm font-medium mb-1">PEG Ratio</div>
                <div className="text-3xl font-bold text-[#1D8A70] dark:text-[#3CBF9C]">0.92</div>
                <div className="text-xs text-slate-500 mt-2">Target &lt; 1.0</div>
                <p className="text-xs text-slate-400 mt-2">
                  Extremely rare for a mega-cap. Indicates undervaluation relative to growth.
                </p>
              </Card>

              <Card>
                <div className="text-slate-500 text-sm font-medium mb-1">Free Cash Flow Margin</div>
                <div className="text-3xl font-bold text-[#A8672E] dark:text-[#D08F52]">48.2%</div>
                <div className="text-xs text-slate-500 mt-2">Software-like margins</div>
                <p className="text-xs text-slate-400 mt-2">
                  Hardware company generating SaaS-level cash efficiency.
                </p>
              </Card>

              <Card>
                <div className="text-slate-500 text-sm font-medium mb-1">Altman Z-Score</div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">34.5</div>
                <div className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] mt-2">Safe Zone &gt; 3.0</div>
                <p className="text-xs text-slate-400 mt-2">
                  Zero bankruptcy risk. Balance sheet is a fortress with $35B+ cash.
                </p>
              </Card>
            </div>

            <div className="bg-white dark:bg-[#0A0D14] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#14171B] flex justify-between items-center">
                <h3 className="font-bold text-slate-700 dark:text-slate-300 font-serif">Detailed Metric Analysis</h3>
                <span className="text-xs font-mono text-slate-400">Data Source: 10-Q SEC Filing</span>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-[#14171B]">
                    <tr>
                      <th className="px-6 py-3">Metric</th>
                      <th className="px-6 py-3">Value</th>
                      <th className="px-6 py-3">Industry Avg</th>
                      <th className="px-6 py-3">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 dark:bg-[#14171B] transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">Return on Equity (ROE)</td>
                      <td className="px-6 py-4 text-[#1D8A70] dark:text-[#3CBF9C] font-bold">115%</td>
                      <td className="px-6 py-4 text-slate-500">25%</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Exceptional capital efficiency. Management is maximizing shareholder value.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:bg-[#14171B] transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">Inventory Turnover</td>
                      <td className="px-6 py-4 text-amber-600 font-bold">3.2x</td>
                      <td className="px-6 py-4 text-slate-500">5.5x</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Slowing. Indicates &ldquo;WIP&rdquo; (Work in Progress) buildup for Blackwell launch.</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:bg-[#14171B] transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">Gross Margin</td>
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">74.6%</td>
                      <td className="px-6 py-4 text-slate-500">55% (Semis)</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Peaking. Expected to dip to low 70s as new Blackwell chips have lower initial yields.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 3. The "Big Short" & Michael Burry Analysis */}
          <section>
            <SectionHeader
              title="The Bear Case: Is it a Bubble?"
              subtitle="Analyzing Michael Burry & The Short Thesis"
              icon={ShieldAlert}
              color="rose"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <InsightBox type="risk" title="Burry's Thesis: The Circular Revenue Problem">
                  <p className="mb-3">
                    Michael Burry (Scion Asset Management) compares NVDA to Cisco in 2000. His core argument rests on <strong>&ldquo;Vendor Financing&rdquo;</strong>:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-rose-900">
                    <li>Big Tech (MSFT, GOOGL) invests billions into AI startups (e.g., CoreWeave).</li>
                    <li>These startups use that cash immediately to buy H100 chips from NVIDIA.</li>
                    <li>
                      <strong>The Result:</strong> Revenue is being &ldquo;manufactured&rdquo; by the same capital circulating in a loop, rather than coming from sustainable end-user demand. If VC funding dries up, the loop breaks.
                    </li>
                  </ul>
                </InsightBox>

                <div className="bg-white dark:bg-[#0A0D14] rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 font-serif">
                    <AlertTriangle className="text-amber-500" size={20} />
                    Structural Risks
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">1. The &ldquo;Air Pocket&rdquo; Risk</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        As customers wait for the new <strong>Blackwell (B200)</strong> chips, they may pause orders for the current <strong>Hopper (H100)</strong> chips. This transition period often causes a temporary revenue dip (an &ldquo;air pocket&rdquo;) that the market hates.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">2. CSP Indigestion</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Cloud Service Providers (CSPs) like Azure and AWS are spending $50B+ annually on Capex. Wall Street is asking: &ldquo;Where is the ROI?&rdquo; If AI software revenue doesn&apos;t materialize soon, CSPs will cut chip orders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border-rose-100">
                  <h3 className="font-bold text-rose-900 mb-4 font-serif">Institutional Flows</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-[#0A0D14] flex items-center justify-center font-bold text-[#BC4128] dark:text-[#E2694A] border border-rose-200">
                        SB
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">SoftBank</p>
                        <p className="text-xs text-[#BC4128] dark:text-[#E2694A] font-semibold">Sold Entire Stake</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-[#0A0D14] flex items-center justify-center font-bold text-[#BC4128] dark:text-[#E2694A] border border-rose-200">
                        PT
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Peter Thiel</p>
                        <p className="text-xs text-[#BC4128] dark:text-[#E2694A] font-semibold">Exited near top</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-[#0A0D14] flex items-center justify-center font-bold text-[#BC4128] dark:text-[#E2694A] border border-rose-200">
                        DK
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Stanley Druckenmiller</p>
                        <p className="text-xs text-[#BC4128] dark:text-[#E2694A] font-semibold">Reduced stake by 70%</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-slate-500 italic">
                    Smart money often sells into strength (&ldquo;feeding the ducks&rdquo;) while retail investors buy the hype.
                  </p>
                </Card>

                <Card>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2 font-serif">Short Interest</h3>
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">1.2%</div>
                  <p className="text-xs text-slate-500 mb-4">of Float</p>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Despite the noise, actual short interest is incredibly low. Shorting NVDA has been a &ldquo;widow maker&rdquo; trade. Burry is using Puts (options), which limits risk, rather than shorting stock directly.
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* 4. Strategic Outlook & Retail Prep */}
          <section>
            <SectionHeader
              title="Investor Playbook"
              subtitle="How to navigate the volatility"
              icon={BrainCircuit}
              color="emerald"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-[#0A0D14] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 font-serif">The Blackwell Supercycle</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Layers className="text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">Supply Constrained</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Jensen Huang confirmed Blackwell is &ldquo;sold out&rdquo; well into 2025. This provides high revenue visibility (a floor for the stock).
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">Power Density Issues</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Reports suggest the GB200 rack overheats, requiring liquid cooling redesigns. This is a technical risk for Q4/Q1 margins.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-serif">
                  <Lock size={18} className="text-[#1D8A70] dark:text-[#3CBF9C]" />
                  Retail Defense Strategy
                </h3>
                <div className="space-y-4 text-sm text-slate-300">
                  <p>
                    <strong>1. Avoid Weekly Options:</strong> IV (Implied Volatility) is too high. You are overpaying for premiums.
                  </p>
                  <p>
                    <strong>2. The &ldquo;Barbell&rdquo; Approach:</strong> Hold 80% in index funds, 20% in semi-conductors. Don&apos;t go &ldquo;all in&rdquo; on NVDA at $3.5T market cap.
                  </p>
                  <p>
                    <strong>3. Watch the 50-day SMA:</strong> If NVDA breaks below the 50-day Moving Average (~$128), algorithmic selling will trigger. That is the buy zone for long-term holders.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-700 flex justify-between items-center">
                  <span className="text-xs font-mono text-[#1D8A70] dark:text-[#3CBF9C]">STATUS: HOLD</span>
                  <span className="text-xs font-mono text-slate-400">NEXT EARNINGS: FEB 2026</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ArticleFrame>
  );
}
