'use client';

import { useState } from 'react';
import { Activity, AlertTriangle, ShieldAlert, BookOpen, Target, Clock, Briefcase, ChevronDown, ChevronUp, Scale, DollarSign } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- UI Components ---
const Badge = ({ children, color = "blue" }: { children: React.ReactNode; color?: string }) => {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
    violet: "bg-violet-100 text-violet-800 border-violet-200",
    rose: "bg-rose-100 text-rose-800 border-rose-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide border ${colorClasses[color] || colorClasses.blue}`}>
      {children}
    </span>
  );
};

const SectionHeader = ({ icon: Icon, title, subtitle, colorClass }: { icon: React.ElementType; title: string; subtitle?: string; colorClass: string }) => (
  <div className="mb-8 border-b border-slate-200 pb-4">
    <div className={`flex items-center gap-3 mb-2 ${colorClass}`}>
      <div className="p-2 rounded-lg bg-current bg-opacity-10">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{title}</h2>
    </div>
    {subtitle && <p className="text-slate-500 text-lg ml-1 font-medium">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const HighlightBox = ({ title, children, type = "info" }: { title?: string; children: React.ReactNode; type?: string }) => {
  const styles: Record<string, string> = {
    info: "bg-blue-50 border-blue-200 text-blue-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    danger: "bg-rose-50 border-rose-200 text-rose-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
    neutral: "bg-slate-50 border-slate-200 text-slate-900",
  };
  return (
    <div className={`p-5 rounded-xl border ${styles[type]} my-4`}>
      {title && <h4 className="font-bold mb-2 flex items-center gap-2 text-lg">{title}</h4>}
      <div className="text-sm md:text-base leading-relaxed opacity-90 space-y-2">
        {children}
      </div>
    </div>
  );
};

export default function LeapStrategyDoc() {
  const [openSection, setOpenSection] = useState<string | null>('greek-profile');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <ArticleFrame
      slug="selling-long-dated-put-options-leaps-institutional-mechanics-volatility-arbitrage"
      additionalDisclaimer="Options trading involves substantial risk and is not suitable for all investors. The strategies discussed require significant capital, risk tolerance, and understanding of derivatives."
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-slate-600">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <span className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
            <DollarSign className="w-4 h-4"/> Acquisition Tool
          </span>
          <span className="flex items-center gap-2 px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm font-medium border border-violet-100">
            <Activity className="w-4 h-4"/> Volatility Arbitrage
          </span>
          <span className="flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-sm font-medium border border-rose-100">
            <AlertTriangle className="w-4 h-4"/> Illiquidity Risk
          </span>
        </div>

        <InfographicSlot alt="LEAP Put Options Strategy Infographic" />

        {/* SECTION 1: CORE THESIS */}
        <section className="mb-20 pt-4">
          <SectionHeader
            icon={BookOpen}
            title="I. Core Thesis & Strategic Intent"
            subtitle="Why this is NOT a theta-decay strategy."
            colorClass="text-indigo-600"
          />
          <div className="grid gap-8">
            <Card className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">The &ldquo;Why&rdquo;: Defining the Strategy</h3>
                  <p className="mb-4 text-lg leading-relaxed">
                    Selling a LEAP put (1+ year to expiration) is fundamentally different from selling a 30-day put. While short-term options are &ldquo;Theta&rdquo; (time) plays, LEAP puts are dominated by <strong>Delta</strong> (long-term price direction) and <strong>Vega</strong> (volatility levels).
                  </p>
                  <p className="text-slate-500 italic border-l-4 border-indigo-200 pl-4 py-1">
                    &ldquo;An investor who sells a 2-year LEAP put to &lsquo;collect income&rsquo; is engaging in a profoundly inefficient use of capital.&rdquo;
                  </p>
                </div>
                <div className="w-full md:w-1/3 bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">Primary Goals</h4>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="mt-1">
                        <Target className="w-5 h-5 text-emerald-500"/>
                      </div>
                      <div>
                        <strong className="block text-emerald-700">Strategy A: Acquisition</strong>
                        <span className="text-sm text-slate-600">&ldquo;Buffett-Style&rdquo; Synthetic Limit Order. Goal is assignment at a discount.</span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="mt-1">
                        <Activity className="w-5 h-5 text-violet-500"/>
                      </div>
                      <div>
                        <strong className="block text-violet-700">Strategy B: Volatility Arb</strong>
                        <span className="text-sm text-slate-600">&ldquo;Short Vega&rdquo; Play. Goal is mean reversion of high Implied Volatility (IV).</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-indigo-50 p-5 border-b border-indigo-100 flex justify-between items-center cursor-pointer" onClick={() => toggleSection('greek-profile')}>
                <h3 className="font-bold text-indigo-900 flex items-center gap-2 text-lg">
                  <Scale className="w-5 h-5" />
                  Comparative Greek Profile: 2-Year vs 30-Day
                </h3>
                {openSection === 'greek-profile' ? <ChevronUp className="text-indigo-400"/> : <ChevronDown className="text-indigo-400"/>}
              </div>
              {openSection === 'greek-profile' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm md:text-base">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-4 font-semibold text-slate-700">Metric</th>
                        <th className="p-4 font-semibold text-indigo-700 bg-indigo-50/50 w-1/3">2-Year ATM Put (LEAP)</th>
                        <th className="p-4 font-semibold text-slate-500 w-1/3">30-Day ATM Put</th>
                        <th className="p-4 font-semibold text-slate-700">Strategic Implication</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-4 font-medium text-slate-900">Vega (<span className="font-serif italic">ν</span>)</td>
                        <td className="p-4 bg-indigo-50/30 font-bold text-indigo-700">Extremely High (~$2.50)</td>
                        <td className="p-4 text-slate-500">Low (~$0.40)</td>
                        <td className="p-4 text-slate-600">LEAP P/L is driven by changes in Volatility. A 1% drop in IV creates massive profit.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-slate-900">Theta (<span className="font-serif italic">Θ</span>)</td>
                        <td className="p-4 bg-indigo-50/30 text-indigo-700">Very Low / Linear (~$0.40/day)</td>
                        <td className="p-4 font-bold text-slate-500">High / Exponential (~$9.00/day)</td>
                        <td className="p-4 text-slate-600">LEAPs are terrible for &ldquo;daily income.&rdquo; You are not paid to wait; you are paid for risk.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-slate-900">Gamma (<span className="font-serif italic">Γ</span>)</td>
                        <td className="p-4 bg-indigo-50/30 text-indigo-700">Stable / Low (0.001)</td>
                        <td className="p-4 text-slate-500">Explosive / High (0.008)</td>
                        <td className="p-4 text-slate-600">LEAPs are stable. Short-term puts have &ldquo;Gamma Risk&rdquo; (rapid losses during crash).</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </section>

        {/* SECTION 2: INSTITUTIONAL APPLICATION */}
        <section className="mb-20">
          <SectionHeader
            icon={Briefcase}
            title="II. Institutional Mechanics"
            subtitle="How Market Makers and Hedge Funds utilize this structure."
            colorClass="text-emerald-600"
          />
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <HighlightBox type="success" title="Case Study 1: The Buffett Put (1993)">
                <div className="space-y-3">
                  <p className="font-medium text-emerald-800">Coca-Cola (KO) Acquisition</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li><strong>Context:</strong> KO trading at $40. Buffett wants it at $35.</li>
                    <li><strong>Trade:</strong> Sold 5M puts @ $35 Strike.</li>
                    <li><strong>Premium:</strong> Collected $7.5 Million ($1.50/share).</li>
                    <li><strong>Outcome:</strong> Stock stayed &gt;$35. Puts expired worthless.</li>
                  </ul>
                  <p className="text-xs text-emerald-700 font-bold mt-2">
                    Lesson: He was paid $7.5M for the &ldquo;risk&rdquo; of buying a stock he wanted to buy anyway.
                  </p>
                </div>
              </HighlightBox>

              <HighlightBox type="warning" title="Case Study 2: The OXY Misconception (2019)">
                <div className="space-y-3">
                  <p className="font-medium text-amber-800">Occidental Petroleum (OXY)</p>
                  <p className="text-sm">Often cited as a put sale, this was actually <strong>Strategic Financing</strong>.</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li><strong>Deal:</strong> Berkshire gave $10B cash.</li>
                    <li><strong>Received:</strong> 8% Preferred Stock + Warrants (Long Calls).</li>
                  </ul>
                  <p className="text-xs text-amber-800 font-bold mt-2">
                    Lesson: This was a LONG Volatility play (warrants), not a short put strategy.
                  </p>
                </div>
              </HighlightBox>
            </div>

            <Card className="p-6 md:p-8 bg-slate-50 border-none">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-slate-500"/>
                The Counterparty: Dividend Arbitrage
              </h3>
              <p className="mb-4">
                Who buys deep ITM LEAP puts? Often, it is <strong>Dividend Arbitrageurs</strong>. They perform a &ldquo;Conversion&rdquo; or &ldquo;Box Spread&rdquo; strategy.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <strong className="block text-slate-800 mb-1">Step 1: The Buy</strong>
                  Arb buys Stock + Deep ITM Put.
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <strong className="block text-slate-800 mb-1">Step 2: The Dividend</strong>
                  Arb collects the dividend payment.
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <strong className="block text-slate-800 mb-1">Step 3: The Exercise</strong>
                  Arb exercises Put to sell stock at fixed strike.
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500 bg-white p-2 rounded border border-slate-200 inline-block">
                *You (the LEAP seller) provide the necessary liquidity for this risk-free institutional trade.
              </p>
            </Card>
          </div>
        </section>

        {/* SECTION 3: THE PITFALLS */}
        <section className="mb-20">
          <SectionHeader
            icon={AlertTriangle}
            title="III. Quantitative Pitfalls"
            subtitle="The 'Retail Traps' that destroy value."
            colorClass="text-rose-600"
          />
          <div className="space-y-8">
            {/* Trap 1: Illiquidity */}
            <Card className="overflow-hidden">
              <div className="bg-rose-50 p-5 border-b border-rose-100">
                <h3 className="text-xl font-bold text-rose-900 flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6"/> Trap 1: The Illiquidity &amp; Slippage Cost
                </h3>
                <p className="text-rose-700 mt-1">Unlike monthly options, LEAPs have massive bid-ask spreads.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm md:text-base">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                    <tr>
                      <th className="p-4">Ticker / Type</th>
                      <th className="p-4">Expiration</th>
                      <th className="p-4">Bid / Ask</th>
                      <th className="p-4">Spread Cost ($)</th>
                      <th className="p-4 text-rose-600">Slippage % (One-Way)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-bold">SPY (ETF)</td>
                      <td className="p-4 text-slate-500">Dec 2026</td>
                      <td className="p-4 font-mono text-xs md:text-sm">$38.72 / $39.50</td>
                      <td className="p-4 text-slate-600">$78</td>
                      <td className="p-4 font-bold text-rose-600">~1.99%</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">AAPL (Tech)</td>
                      <td className="p-4 text-slate-500">Jan 2027</td>
                      <td className="p-4 font-mono text-xs md:text-sm">$88.35 / $89.70</td>
                      <td className="p-4 text-slate-600">$135</td>
                      <td className="p-4 font-bold text-rose-600">~1.52%</td>
                    </tr>
                    <tr className="bg-rose-50/30">
                      <td className="p-4 font-bold">VST (Volatile)</td>
                      <td className="p-4 text-slate-500">Jan 2026</td>
                      <td className="p-4 font-mono text-xs md:text-sm">$17.15 / $19.55</td>
                      <td className="p-4 text-slate-600">$240</td>
                      <td className="p-4 font-bold text-rose-700">~13.08% !</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-slate-50 text-sm text-slate-600 italic border-t border-slate-200">
                *Analysis: A round-trip trade (sell to open, buy to close) on VST would cost <strong>26% of your profit</strong> just in spreads. This makes &ldquo;rolling&rdquo; impossible.
              </div>
            </Card>

            {/* Trap 2: Vega Time Bomb */}
            <Card className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-violet-500"/>
                Trap 2: The Vega &ldquo;Time Bomb&rdquo;
              </h3>
              <p className="mb-4 text-slate-600">
                Modeling a Short <strong>VST 2-Year ATM Put</strong> (Initial IV: 54%). <br/>
                What happens after 6 months if the market panics?
              </p>
              <div className="grid gap-4">
                <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100 transition-transform hover:scale-[1.01]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600">1</div>
                    <div>
                      <span className="font-bold text-emerald-900 block">The &ldquo;Win&rdquo; Scenario</span>
                      <span className="text-sm text-emerald-800">IV Drops to 35% (Crush)</span>
                    </div>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <span className="font-bold text-2xl text-emerald-600">+$1,611</span>
                    <span className="block text-xs text-emerald-700">Vega Profit: +$1,520</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-rose-50 rounded-xl border border-rose-100 transition-transform hover:scale-[1.01]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-bold text-rose-600">2</div>
                    <div>
                      <span className="font-bold text-rose-900 block">The &ldquo;Trap&rdquo; Scenario</span>
                      <span className="text-sm text-rose-800">IV Spikes to 70% (Panic)</span>
                    </div>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <span className="font-bold text-2xl text-rose-600">-$1,189</span>
                    <span className="block text-xs text-rose-700">Vega Loss: -$1,280</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500 border-l-2 border-slate-300 pl-3">
                *Critical Finding: In Scenario 2, the stock price <strong>stayed flat</strong> ($195), but you lost $1,189 solely because Fear (IV) increased.
              </p>
            </Card>

            {/* Trap 3: Dead Money */}
            <Card className="p-6 bg-slate-50 border-dashed border-2 border-slate-300">
              <h3 className="text-lg font-bold text-slate-700 mb-4">Trap 3: Capital Inefficiency (&ldquo;Dead Money&rdquo;)</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-slate-600 mb-2">Strategy: LEAP Put</h5>
                  <div className="h-2 w-full bg-slate-200 rounded-full mb-2 overflow-hidden">
                    <div className="h-full bg-blue-500 w-[18%]"></div>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">18.1% ROC</p>
                  <p className="text-xs text-slate-500">Max Return on Capital (2 Years)</p>
                </div>
                <div>
                  <h5 className="font-semibold text-slate-600 mb-2">Strategy: Monthly Puts</h5>
                  <div className="h-2 w-full bg-slate-200 rounded-full mb-2 overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[90%]"></div>
                  </div>
                  <p className="text-2xl font-bold text-emerald-600">130.9% ROC</p>
                  <p className="text-xs text-slate-500">Max Return on Capital (2 Years - Compounded)</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* SECTION 4: PRACTICAL GUIDE */}
        <section className="mb-4">
          <SectionHeader
            icon={Target}
            title="IV. Practical Guide"
            subtitle="Execution framework for the Retail Investor."
            colorClass="text-amber-600"
          />
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 border-t-4 border-t-emerald-500 hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-4">
                <Badge color="emerald">Strategy A: Acquisition</Badge>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">OTM Strike</h3>
              <p className="text-xs font-mono text-slate-400 mb-4">Delta -0.20 to -0.40</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li><strong>Goal:</strong> Buy the dip.</li>
                <li><strong>Risk:</strong> Missing the upside if stock rallies.</li>
                <li><strong>Ideal for:</strong> Value investors.</li>
              </ul>
            </Card>

            <Card className="p-6 border-t-4 border-t-amber-500 hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-4">
                <Badge color="amber">Strategy B: Volatility</Badge>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">ATM Strike</h3>
              <p className="text-xs font-mono text-slate-400 mb-4">Delta ~ -0.50</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li><strong>Goal:</strong> Maximize Vega exposure.</li>
                <li><strong>Risk:</strong> The &ldquo;Time Bomb&rdquo; (IV expansion).</li>
                <li><strong>Ideal for:</strong> Volatility Arbitrageurs.</li>
              </ul>
            </Card>

            <Card className="p-6 border-t-4 border-t-blue-500 hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-4">
                <Badge color="blue">Financing</Badge>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Deep ITM</h3>
              <p className="text-xs font-mono text-slate-400 mb-4">Delta -0.80 to -1.0</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li><strong>Goal:</strong> Synthetic Stock Ownership.</li>
                <li><strong>Benefit:</strong> Capital efficiency + Interest.</li>
                <li><strong>Risk:</strong> Early Assignment (Dividends).</li>
              </ul>
            </Card>
          </div>

          <Card className="p-8 bg-slate-900 text-slate-200">
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-amber-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">The &ldquo;No-Exit&rdquo; Rule</h3>
                <p className="mb-6 text-slate-400">
                  Due to the liquidity trap, you must assume you are married to this position for 2 years.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-2">A</div>
                    <strong className="text-white block mb-1">Assignment</strong>
                    <span className="text-xs text-slate-400">You take delivery of shares. This is the optimal outcome for Acquirers.</span>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm mb-2">B</div>
                    <strong className="text-white block mb-1">Expiration</strong>
                    <span className="text-xs text-slate-400">Option expires worthless. You keep 100% premium. Optimal for Vol Arb.</span>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm mb-2">C</div>
                    <strong className="text-white block mb-1">Emergency Close</strong>
                    <span className="text-xs text-slate-400">Only if profit &gt; 50% early, justifying the massive spread cost to free capital.</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </ArticleFrame>
  );
}
