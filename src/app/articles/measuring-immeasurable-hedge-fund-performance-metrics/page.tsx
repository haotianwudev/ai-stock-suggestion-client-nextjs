'use client';

import React from 'react';
import { TrendingUp, Activity, BarChart3, Target, Shield, AlertCircle, Clock, DollarSign, Scale, CheckCircle2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

const formulaChip = "font-mono text-xs bg-[#14171B] dark:bg-[#05070A] text-gray-300 p-3 rounded mb-4";

const MetricCard = ({ title, formula, description, icon: Icon }: {
  title: string;
  formula: string;
  description: string;
  icon: React.ElementType;
}) => (
  <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
    <div className="inline-flex items-center justify-center p-3 rounded-lg mb-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
      <Icon size={22} />
    </div>
    <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-2">{title}</h3>
    <div className={formulaChip}>{formula}</div>
    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const FlowConcept = ({ title, type, description, pros, icon: Icon }: {
  title: string;
  type: string;
  description: string;
  pros: string[];
  icon: React.ElementType;
}) => (
  <div className="flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
    <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
      <Icon size={28} />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
          {type}
        </span>
        <h3 className="font-serif text-lg text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {pros.map((pro, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <CheckCircle2 size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center max-w-2xl mx-auto mb-12">
    <h2 className="font-serif text-2xl md:text-3xl mb-4 text-gray-900 dark:text-white">
      {title}
    </h2>
    <div className="h-1 w-16 mx-auto rounded-full bg-[#A8672E] dark:bg-[#D08F52] mb-6" />
    <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
  </div>
);

const BenchmarkCriterion = ({ title, text }: { title: string; text: string }) => (
  <div className="flex gap-4 items-start">
    <div className="mt-1 p-1 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-full text-[#A8672E] dark:text-[#D08F52]">
      <CheckCircle2 size={20} />
    </div>
    <div>
      <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
    </div>
  </div>
);

export default function HedgeFundPerformanceGuide() {
  return (
    <ArticleFrame slug="measuring-immeasurable-hedge-fund-performance-metrics">
      <div className="max-w-5xl mx-auto text-gray-800 dark:text-gray-200">
        <InfographicSlot alt="Hedge Fund Performance Metrics Infographic" />

        {/* Section 1: Core Calculation Methodologies */}
        <section id="calculations" className="scroll-mt-32 mb-24 mt-12">
          <SectionHeader
            title="Core Calculation Methodologies"
            subtitle="The foundation is choosing the correct return calculation method based on fund structure and liquidity."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="inline-flex items-center justify-center p-3 rounded-lg mb-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
                <Clock size={22} />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-4">Time-Weighted Return (TWR)</h3>
              <div className={formulaChip}>TWR = [(1 + R₁) × (1 + R₂) × ... × (1 + Rₙ)] - 1</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                The standard for measuring manager skill in liquid markets (e.g., public equities). Neutralizes the distorting effects of external client cash flows.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
                  <span>Isolates manager performance</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
                  <span>Standard for liquid strategies</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
                  <span>Requires daily valuations</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="inline-flex items-center justify-center p-3 rounded-lg mb-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
                <DollarSign size={22} />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-4">Money-Weighted Return (IRR)</h3>
              <div className={formulaChip}>NPV = Σ[CFₜ / (1 + IRR)ᵗ] = 0</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                Required metric for illiquid, closed-end funds (e.g., private equity). Manager controls capital timing, making timing part of performance assessment.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
                  <span>Reflects investor experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
                  <span>Standard for private equity</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
                  <span>Includes timing skill</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="inline-flex items-center justify-center p-3 rounded-lg mb-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
                <BarChart3 size={22} />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-4">Modified Dietz</h3>
              <div className={formulaChip}>R = (EMV - BMV - CF) / (BMV + WCF)</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                An approximation for TWR used when daily valuation isn&apos;t feasible. Weights cash flows by time remaining in period.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
                  <span>Practical approximation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
                  <span>Monthly valuations sufficient</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
                  <span>Industry standard fallback</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#14171B] dark:bg-[#05070A] p-6 md:p-8 rounded-xl text-white shadow-lg">
            <h3 className="font-serif text-xl mb-4 text-[#D08F52]">Calculation Method Selection Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-semibold text-white mb-2">Liquid Strategies</h4>
                <p className="text-gray-400 text-sm mb-3">Long/Short Equity, Market Neutral, Arbitrage</p>
                <div className="text-[#D08F52] font-mono text-sm">&rarr; Use TWR</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-semibold text-white mb-2">Illiquid Strategies</h4>
                <p className="text-gray-400 text-sm mb-3">Private Equity, Distressed Debt, Real Estate</p>
                <div className="text-[#D08F52] font-mono text-sm">&rarr; Use IRR</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="font-semibold text-white mb-2">Mixed Liquidity</h4>
                <p className="text-gray-400 text-sm mb-3">Multi-Strategy, Credit Opportunities</p>
                <div className="text-[#D08F52] font-mono text-sm">&rarr; Use Modified Dietz</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Risk-Adjusted Performance Metrics */}
        <section id="metrics" className="scroll-mt-32 mb-24">
          <SectionHeader
            title="Risk-Adjusted Performance Metrics"
            subtitle="Returns must be evaluated relative to the risk taken. Raw returns without risk context are meaningless."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <MetricCard
              title="Sharpe Ratio"
              icon={TrendingUp}
              formula="(Rp - Rf) / σp"
              description="The universal standard measuring excess return per unit of total volatility. Limited by assumptions of normal return distributions. Values above 1.0 are considered good, above 2.0 excellent."
            />

            <MetricCard
              title="Sortino Ratio"
              icon={Shield}
              formula="(Rp - Rf) / σd"
              description="Improves on Sharpe by focusing only on downside volatility. More appropriate for hedge funds as upside volatility is desirable. Better reflects investor risk perception."
            />

            <MetricCard
              title="Information Ratio"
              icon={BarChart3}
              formula="(Rp - Rb) / Tracking Error"
              description="The key metric for active managers. Measures excess return relative to benchmark per unit of active risk. Values above 0.5 indicate skill, above 1.0 exceptional skill."
            />

            <MetricCard
              title="Calmar Ratio"
              icon={AlertCircle}
              formula="Annual Return / Max Drawdown"
              description="Critical for evaluating leveraged strategies. Measures return per unit of worst-case loss. Particularly important for CTA and macro strategies with high volatility."
            />

            <MetricCard
              title="Sterling Ratio"
              icon={Activity}
              formula="Annual Return / Avg Drawdown"
              description="Similar to Calmar but uses average of largest drawdowns over time. Provides more stable measure for strategies with multiple significant drawdowns."
            />

            <MetricCard
              title="Omega Ratio"
              icon={Target}
              formula="∫[1-F(x)]dx / ∫F(x)dx"
              description="Considers entire return distribution, not just first two moments. Captures skewness and kurtosis effects crucial for option-heavy strategies and tail risk assessment."
            />
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mb-8">
            <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <AlertCircle className="text-[#BC4128] dark:text-[#E2694A]" size={20} /> Drawdown Analysis Framework
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Key Drawdown Metrics</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-[#A8672E]/5 dark:bg-[#D08F52]/5 rounded-lg border border-[#A8672E]/20 dark:border-[#D08F52]/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">Maximum Drawdown</span>
                      <span className="text-xs font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded text-gray-500 dark:text-gray-400">Peak-to-Trough</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Worst single loss period. Critical for risk budgeting and leverage decisions.</p>
                  </div>

                  <div className="p-4 bg-[#A8672E]/5 dark:bg-[#D08F52]/5 rounded-lg border border-[#A8672E]/20 dark:border-[#D08F52]/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">Average Drawdown</span>
                      <span className="text-xs font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded text-gray-500 dark:text-gray-400">Mean of All DD</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Typical loss magnitude. Better for strategies with frequent small drawdowns.</p>
                  </div>

                  <div className="p-4 bg-[#A8672E]/5 dark:bg-[#D08F52]/5 rounded-lg border border-[#A8672E]/20 dark:border-[#D08F52]/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">Recovery Time</span>
                      <span className="text-xs font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded text-gray-500 dark:text-gray-400">Time to New High</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">How long to recover from drawdowns. Critical for investor psychology.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/60 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Drawdown Severity Classification</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">0% - 5%</span>
                    <span className="px-3 py-1 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 text-[#1D8A70] dark:text-[#3CBF9C] rounded-full text-xs font-semibold">Low Risk</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">5% - 10%</span>
                    <span className="px-3 py-1 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] rounded-full text-xs font-semibold">Moderate</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">10% - 20%</span>
                    <span className="px-3 py-1 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52] rounded-full text-xs font-semibold">High Risk</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">20%+</span>
                    <span className="px-3 py-1 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A] rounded-full text-xs font-semibold">Extreme</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-[#A8672E]/5 dark:bg-[#D08F52]/5 rounded-lg">
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    <strong>Note:</strong> Acceptable drawdown levels vary by strategy. Market neutral funds should stay under 5%, while global macro funds may accept 15-20%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Cash Flow Analysis */}
        <section id="flows" className="scroll-mt-32 mb-24">
          <SectionHeader
            title="Cash Flow Impact Analysis"
            subtitle="Timing matters. How we handle deposits and withdrawals drastically changes the performance picture."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <FlowConcept
              title="Time-Weighted Return (TWR)"
              type="Manager Focused"
              icon={Clock}
              description="Calculates the compound rate of growth over a period. It eliminates the distorting effects of cash inflows and outflows by breaking the measurement period into sub-periods."
              pros={[
                "Isolates manager's skill from client timing",
                "Standard for comparing fund managers",
                "Links sub-period returns geometrically",
                "Indifferent to the size of AUM at any point"
              ]}
            />

            <FlowConcept
              title="Money-Weighted Return (MWR)"
              type="Investor Focused"
              icon={DollarSign}
              description="Essentially the Internal Rate of Return (IRR). It accounts for the size and timing of cash flows, reflecting the actual wealth generation experience of the investor."
              pros={[
                "Reflects actual wealth generation",
                "Heavily impacted by timing of deposits",
                "Good for evaluating personal portfolio growth",
                "Penalizes managers if they call capital before a dip"
              ]}
            />
          </div>

          <div className="mt-8 p-6 md:p-8 bg-[#14171B] dark:bg-[#05070A] rounded-xl text-white shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="font-serif text-xl mb-4 text-[#D08F52]">The &ldquo;Cash Drag&rdquo; Dilemma</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  In hedge funds, managing cash flow is critical. A large inflow of cash (subscription) creates &ldquo;cash drag&rdquo;&mdash;diluting performance until deployed. Managers often use <strong>Subscription Lines</strong> or <strong>Equalization</strong> methods to ensure new investors don&apos;t dilute existing returns or inherit unrealized gains unfairly.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Solution 1</span>
                    <span className="font-semibold text-white block mb-2">Equalization Credits</span>
                    <p className="text-xs text-gray-400">New investors pay for unrealized gains</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Solution 2</span>
                    <span className="font-semibold text-white block mb-2">Series Accounting</span>
                    <p className="text-xs text-gray-400">Separate share classes by entry date</p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3 bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Fund Return (TWR)</span>
                    <span className="text-[#3CBF9C] font-mono tabular-nums font-bold">+12.5%</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Investor A (Early Entry)</span>
                    <span className="text-white font-mono tabular-nums">+12.5%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Investor B (Late Entry, MWR)</span>
                    <span className="text-white font-mono tabular-nums">+4.2%</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 italic">*Without proper methodology, timing dictates outcome</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-6">Public Market Equivalents (PME) for Private Funds</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Kaplan-Schoar PME</h4>
                <div className={formulaChip}>PME = Σ(Distributions × FV Factor) / Σ(Contributions × FV Factor)</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  Creates apples-to-apples comparison with public markets by investing contributions in a public index and comparing terminal values.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={16} className="text-[#1D8A70] dark:text-[#3CBF9C]" />
                    <span>PME &gt; 1.0 = Outperformed public markets</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
                    <span>Accounts for irregular cash flows</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Direct Alpha Method</h4>
                <div className={formulaChip}>α = IRR_fund - IRR_public_equivalent</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  Directly calculates the alpha by comparing IRRs of the private fund versus a public market equivalent with identical cash flow timing.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
                    <span>More intuitive alpha interpretation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={16} className="text-[#A8672E] dark:text-[#D08F52]" />
                    <span>Easier to communicate to investors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Attribution Analysis */}
        <section id="attribution" className="scroll-mt-32 mb-24">
          <SectionHeader
            title="Attribution Analysis"
            subtitle="Decomposing returns to identify the true source of value creation and distinguish skill from luck."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="inline-flex items-center justify-center p-3 rounded-lg mb-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
                <BarChart3 size={22} />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-4">Brinson Model</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Used for long-only equity portfolios. Breaks excess return into three components to identify where value is being added or destroyed.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Allocation Effect</h4>
                  <div className={formulaChip + " mb-2"}>Σ(wp - wb) × (rb - rB)</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Value from over/underweighting sectors relative to benchmark</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Selection Effect</h4>
                  <div className={formulaChip + " mb-2"}>Σwb × (rp - rb)</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Value from picking better stocks within each sector</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Interaction Effect</h4>
                  <div className={formulaChip + " mb-2"}>Σ(wp - wb) × (rp - rb)</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Combined effect of allocation and selection decisions</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="inline-flex items-center justify-center p-3 rounded-lg mb-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
                <Target size={22} />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-4">Factor Attribution Models</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Essential for hedge funds. Uses regression to determine how much return comes from systematic risk factors versus true manager skill (&ldquo;alpha&rdquo;).
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Fama-French Model</h4>
                  <div className={formulaChip + " mb-2"}>R = α + β₁(MKT) + β₂(SMB) + β₃(HML) + ε</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Market, Size, and Value factors for equity strategies</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Fung-Hsieh Model</h4>
                  <div className={formulaChip + " mb-2"}>R = α + Σβᵢ(Factorᵢ) + ε</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Includes trend-following and option-like factors for hedge funds</p>
                </div>

                <div className="p-4 bg-[#A8672E]/5 dark:bg-[#D08F52]/5 rounded-lg border border-[#A8672E]/20 dark:border-[#D08F52]/20">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Alpha Interpretation</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong className="text-[#1D8A70] dark:text-[#3CBF9C]">α &gt; 0:</strong> Manager adds value beyond systematic factors<br />
                    <strong>α ≈ 0:</strong> Returns explained by factor exposures<br />
                    <strong className="text-[#BC4128] dark:text-[#E2694A]">α &lt; 0:</strong> Manager destroys value after fees
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#A8672E]/5 dark:bg-[#D08F52]/5 p-6 md:p-8 rounded-xl border border-[#A8672E]/20 dark:border-[#D08F52]/20">
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-6">Factor Model Selection by Strategy</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Equity Long/Short</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>&bull; Market Beta (S&amp;P 500)</li>
                  <li>&bull; Size Factor (SMB)</li>
                  <li>&bull; Value Factor (HML)</li>
                  <li>&bull; Momentum Factor</li>
                  <li>&bull; Quality Factor</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Global Macro</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>&bull; Currency Carry</li>
                  <li>&bull; Bond Trend Following</li>
                  <li>&bull; Commodity Momentum</li>
                  <li>&bull; Volatility Risk Premium</li>
                  <li>&bull; Term Structure</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Credit Strategies</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>&bull; Credit Spread Changes</li>
                  <li>&bull; Default Risk Premium</li>
                  <li>&bull; Term Structure</li>
                  <li>&bull; Equity Market Beta</li>
                  <li>&bull; Liquidity Factor</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Advanced Risk Management */}
        <section id="risk" className="scroll-mt-32 mb-24">
          <SectionHeader
            title="Advanced Risk Management"
            subtitle="Forward-looking risk assessment complements historical performance analysis for comprehensive evaluation."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="inline-flex items-center justify-center p-3 rounded-lg mb-4 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A]">
                <AlertCircle size={22} />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-4">Value at Risk (VaR)</h3>
              <div className={formulaChip}>VaR₉₅% = μ - 1.645σ (Normal Distribution)</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Estimates potential loss over a set period at a given confidence level. Standard risk measure but limited by distributional assumptions.
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-[#BC4128]/5 dark:bg-[#E2694A]/5 rounded-lg">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">1-Day 95% VaR</span>
                  <span className="text-xs font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded text-gray-500 dark:text-gray-400">Daily Risk</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#BC4128]/5 dark:bg-[#E2694A]/5 rounded-lg">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">1-Month 99% VaR</span>
                  <span className="text-xs font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded text-gray-500 dark:text-gray-400">Stress Test</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#BC4128]/5 dark:bg-[#E2694A]/5 rounded-lg">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Annual 95% VaR</span>
                  <span className="text-xs font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded text-gray-500 dark:text-gray-400">Capital Planning</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="inline-flex items-center justify-center p-3 rounded-lg mb-4 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A]">
                <Shield size={22} />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-4">Conditional VaR (CVaR)</h3>
              <div className={formulaChip}>CVaR = E[Loss | Loss &gt; VaR]</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Superior measure that calculates average loss in worst-case tail beyond VaR threshold. Captures extreme &ldquo;tail risk&rdquo; better than VaR.
              </p>

              <div className="bg-[#BC4128]/5 dark:bg-[#E2694A]/5 p-4 rounded-lg border border-[#BC4128]/20 dark:border-[#E2694A]/20">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Why CVaR is Superior</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={16} className="text-[#BC4128] dark:text-[#E2694A]" />
                    <span>Coherent risk measure (subadditive)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={16} className="text-[#BC4128] dark:text-[#E2694A]" />
                    <span>Captures tail risk beyond VaR</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={16} className="text-[#BC4128] dark:text-[#E2694A]" />
                    <span>Better for portfolio optimization</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={16} className="text-[#BC4128] dark:text-[#E2694A]" />
                    <span>Regulatory preference (Basel III)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mb-8">
            <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Activity className="text-[#A8672E] dark:text-[#D08F52]" size={20} /> Risk Measurement Methodologies
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Parametric Method</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Assumes normal distribution. Fast computation but poor for fat-tailed returns common in hedge funds.
                </p>
                <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <div><strong>Pros:</strong> Fast, simple, analytical</div>
                  <div><strong>Cons:</strong> Normality assumption</div>
                </div>
              </div>

              <div className="p-5 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Historical Simulation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Uses actual historical returns. No distributional assumptions but limited by historical data availability.
                </p>
                <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <div><strong>Pros:</strong> No assumptions, actual data</div>
                  <div><strong>Cons:</strong> Limited by history</div>
                </div>
              </div>

              <div className="p-5 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Monte Carlo</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Simulates thousands of scenarios. Most flexible but computationally intensive and model-dependent.
                </p>
                <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <div><strong>Pros:</strong> Flexible, comprehensive</div>
                  <div><strong>Cons:</strong> Model risk, complex</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#14171B] dark:bg-[#05070A] p-6 md:p-8 rounded-xl text-white shadow-lg">
            <h3 className="font-serif text-xl mb-6 text-[#E2694A]">Stress Testing Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-4">Historical Stress Tests</h4>
                <div className="space-y-3">
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="font-semibold text-white">2008 Financial Crisis</div>
                    <div className="text-xs text-gray-400">Credit spreads, equity crash, liquidity crisis</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="font-semibold text-white">COVID-19 March 2020</div>
                    <div className="text-xs text-gray-400">Rapid deleveraging, correlation breakdown</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="font-semibold text-white">LTCM 1998</div>
                    <div className="text-xs text-gray-400">Convergence trade failure, leverage unwind</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Hypothetical Scenarios</h4>
                <div className="space-y-3">
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="font-semibold text-white">Interest Rate Shock</div>
                    <div className="text-xs text-gray-400">+200bp parallel shift, curve steepening</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="font-semibold text-white">Currency Crisis</div>
                    <div className="text-xs text-gray-400">Major currency devaluation, carry unwind</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="font-semibold text-white">Volatility Spike</div>
                    <div className="text-xs text-gray-400">VIX to 50+, correlation increase</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Benchmark Selection */}
        <section id="benchmarks" className="scroll-mt-32 mb-24">
          <SectionHeader
            title="Benchmark Selection"
            subtitle="Selecting an appropriate, investable benchmark is crucial for fair comparison. Benchmarks must meet strict criteria."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
            {/* Left Col: Strategy Map */}
            <div className="lg:col-span-7 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Scale className="text-[#A8672E] dark:text-[#D08F52]" size={20} /> Strategy Alignment
              </h3>

              <div className="space-y-5">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Long/Short Equity</span>
                    <span className="text-xs font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">Correlation: High</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Often benchmarked against broad equity indices like the S&amp;P 500 or MSCI World, sometimes with a beta-adjustment (e.g., 50% S&amp;P 500).
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">S&amp;P 500</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">Russell 2000</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Global Macro</span>
                    <span className="text-xs font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">Correlation: Low</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Hard to benchmark due to flexibility. Often uses an &ldquo;Absolute Return&rdquo; hurdle (e.g., Cash + 5%) or a composite of global bonds/equities.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">Risk-Free Rate + Spread</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">60/40 Global</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Distressed Debt</span>
                    <span className="text-xs font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">Correlation: Med</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Benchmarked against High Yield indices or specific Distressed Debt peer group indices.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">ICE BofA High Yield</span>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">HFRX Distressed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: SAMURAI Criteria */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6 p-6 bg-[#A8672E]/5 dark:bg-[#D08F52]/5 rounded-xl border border-[#A8672E]/20 dark:border-[#D08F52]/20">
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-2">The &ldquo;SAMURAI&rdquo; Check</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                A good benchmark must adhere to strict properties to be valid for performance comparison.
              </p>

              <div className="space-y-5">
                <BenchmarkCriterion
                  title="Specified in Advance"
                  text="The benchmark cannot be cherry-picked after seeing the results."
                />
                <BenchmarkCriterion
                  title="Appropriate"
                  text="It must reflect the manager's investment style and geographic focus."
                />
                <BenchmarkCriterion
                  title="Measurable"
                  text="Its value can be determined on a frequent basis."
                />
                <BenchmarkCriterion
                  title="Unambiguous"
                  text="The identities and weights of securities are clearly defined."
                />
                <BenchmarkCriterion
                  title="Reflective"
                  text="It should reflect current investment opportunities available to the manager."
                />
                <BenchmarkCriterion
                  title="Accountable"
                  text="The manager should accept the benchmark as a fair measure of their performance."
                />
                <BenchmarkCriterion
                  title="Investable"
                  text="It represents an alternative the investor could actually purchase (e.g., an ETF)."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Reporting & Communication */}
        <section id="reporting" className="scroll-mt-32 mb-24">
          <SectionHeader
            title="Reporting &amp; Communication"
            subtitle="Effective synthesis and presentation are the final steps in performance evaluation. GIPS compliance ensures fair representation."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="inline-flex items-center justify-center p-3 rounded-lg mb-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
                <BarChart3 size={22} />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-4">GIPS Standards</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Global Investment Performance Standards ensure fair representation and comparability across managers and time periods.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Composite Construction</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">All fee-paying, discretionary portfolios managed according to the same strategy must be included.</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Calculation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Must use time-weighted returns for periods of one year or longer, with monthly valuations minimum.</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Disclosure Requirements</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Must disclose fee structure, benchmark, number of portfolios, and any material changes to strategy.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="inline-flex items-center justify-center p-3 rounded-lg mb-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 text-[#A8672E] dark:text-[#D08F52]">
                <Activity size={22} />
              </div>
              <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-4">Essential Reporting Tools</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Professional reports combine metrics, attribution, and risk analysis using intuitive visualizations.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Growth Charts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Show cumulative performance vs benchmark over time. Essential for visualizing long-term value creation.</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Underwater Charts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Display drawdown periods and recovery times. Critical for understanding risk profile and investor experience.</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Rolling Window Analysis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Shows performance consistency across different time periods. Reveals strategy robustness and regime dependence.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#A8672E]/5 dark:bg-[#D08F52]/5 p-6 md:p-8 rounded-xl border border-[#A8672E]/20 dark:border-[#D08F52]/20 mb-8">
            <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-6">Professional Reporting Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="text-[#A8672E] dark:text-[#D08F52] mb-3">
                  <TrendingUp size={22} />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Summary</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>&bull; Total Return (Net/Gross)</li>
                  <li>&bull; Benchmark Comparison</li>
                  <li>&bull; Risk-Adjusted Metrics</li>
                  <li>&bull; Volatility Analysis</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="text-[#A8672E] dark:text-[#D08F52] mb-3">
                  <Target size={22} />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Attribution Analysis</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>&bull; Factor Exposures</li>
                  <li>&bull; Alpha Decomposition</li>
                  <li>&bull; Sector/Security Attribution</li>
                  <li>&bull; Style Analysis</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="text-[#A8672E] dark:text-[#D08F52] mb-3">
                  <Shield size={22} />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Risk Assessment</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>&bull; VaR/CVaR Analysis</li>
                  <li>&bull; Stress Test Results</li>
                  <li>&bull; Correlation Analysis</li>
                  <li>&bull; Tail Risk Metrics</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="text-[#A8672E] dark:text-[#D08F52] mb-3">
                  <BarChart3 size={22} />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Market Context</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>&bull; Market Environment</li>
                  <li>&bull; Peer Comparison</li>
                  <li>&bull; Strategy Commentary</li>
                  <li>&bull; Outlook Discussion</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#14171B] dark:bg-[#05070A] p-6 md:p-8 rounded-xl text-white shadow-lg">
            <h3 className="font-serif text-xl mb-6 text-[#D08F52]">Key Performance Reporting Principles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-4">Transparency Requirements</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#D08F52] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Fee Disclosure</div>
                      <div className="text-xs text-gray-400">Show both gross and net returns with clear fee breakdown</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#D08F52] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Methodology Explanation</div>
                      <div className="text-xs text-gray-400">Document calculation methods and any changes over time</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#D08F52] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Risk Warnings</div>
                      <div className="text-xs text-gray-400">Clearly state limitations and potential risks of the strategy</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-4">Communication Best Practices</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#D08F52] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Context Matters</div>
                      <div className="text-xs text-gray-400">Always provide market environment and strategy context</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#D08F52] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Visual Clarity</div>
                      <div className="text-xs text-gray-400">Use charts and graphs to make complex data accessible</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#D08F52] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Forward-Looking</div>
                      <div className="text-xs text-gray-400">Include outlook and strategy evolution discussion</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
