'use client';

import React from 'react';
import { TrendingUp, BookOpen, Globe, ShieldAlert, PieChart, Users, Award, AlertTriangle, Briefcase } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Data Models ---
const portfolioData = [
  { ticker: 'GOOGL', name: 'Alphabet Inc - Class A', shares: '2,543,300', weight: '22.31%', value: '$796,052,900', activity: 'No Change', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  { ticker: 'GOOG', name: 'Alphabet Inc - Class C', shares: '2,451,300', weight: '21.55%', value: '$769,217,940', activity: 'No Change', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  { ticker: 'BAC', name: 'Bank of America Corp', shares: '10,431,387', weight: '16.08%', value: '$573,726,285', activity: 'No Change', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
  { ticker: 'PDD', name: 'Pinduoduo Inc - ADR', shares: '4,608,000', weight: '14.64%', value: '$522,501,120', activity: 'No Change', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
  { ticker: 'BRK.B', name: 'Berkshire Hathaway Inc Cl-B', shares: '897,749', weight: '12.64%', value: '$451,253,535', activity: 'No Change', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { ticker: 'EWBC', name: 'East West Bancorp Inc', shares: '2,776,351', weight: '8.74%', value: '$312,034,089', activity: 'No Change', color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { ticker: 'OXY', name: 'Occidental Petroleum Corp', shares: '1,466,500', weight: '1.69%', value: '$60,302,480', activity: 'No Change', color: 'bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-400' },
  { ticker: 'CROX', name: 'Crocs Inc', shares: '628,159', weight: '1.51%', value: '$53,720,158', activity: 'New Buy', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  { ticker: 'AAPL', name: 'Apple Inc', shares: '110,600', weight: '0.84%', value: '$30,067,716', activity: 'No Change', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
];

const philosophyPillars = [
  {
    title: "The Ownership Mindset",
    desc: "A stock is not a tradable piece of paper subject to momentum, but a fractional ownership stake in an underlying commercial enterprise.",
    icon: <Briefcase className="w-8 h-8 text-indigo-500" />
  },
  {
    title: "Mr. Market",
    desc: "The secondary market exists exclusively to serve the investor by offering continuous prices, not to command the investor's assessment of intrinsic value.",
    icon: <TrendingUp className="w-8 h-8 text-rose-500" />
  },
  {
    title: "Margin of Safety",
    desc: "Acquire assets substantially below conservatively calculated intrinsic value to absorb forecasting errors, management missteps, and macroeconomic shocks.",
    icon: <ShieldAlert className="w-8 h-8 text-emerald-500" />
  },
  {
    title: "Circle of Competence",
    desc: "Making money in capital markets correlates with the absolute accuracy of knowledge contained exclusively within strictly defined boundaries of understanding.",
    icon: <Globe className="w-8 h-8 text-amber-500" />
  }
];

export default function LiLuMasterclass() {
  return (
    <ArticleFrame slug="masterclass-li-lu-himalaya-capital-investment-philosophy">
      <div className="bg-transparent font-sans dark:text-slate-300">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <InfographicSlot alt="Li Lu Investment Philosophy Infographic" />
        </div>

        {/* Biography Section */}
        <section className="py-24 px-6 bg-white dark:bg-[#14171B]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl shadow-inner dark:shadow-none">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">The Crucible of Character</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                To comprehend the psychological fortitude required for extreme portfolio concentration, one must examine the profound personal trials that forged Li Lu's resilience.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mt-12">
              <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                <p>
                  Born in 1966 in Tangshan, China, his early life coincided exactly with the onset of the Cultural Revolution. Because his parents were educated professionals, they were targeted and sent to labor camps. Li Lu was subsequently shuffled between various foster families and state orphanages, learning severe self-reliance at an extraordinarily young age.
                </p>
                <p>
                  At age ten, he survived the catastrophic 1976 Tangshan earthquake. While the disaster claimed over 240,000 lives—including members of his adoptive family—he miraculously survived. Despite these compounding tragedies, his grandmother instilled in him a profound reverence for education, eventually propelling him to Nanjing University to study physics and later economics.
                </p>
                <p>
                  In 1989, driven by a desire for democratic reform, he became a preeminent student leader during the Tiananmen Square protests, notably helping organize the student hunger strikes. Following the violent suppression, he was placed on the Chinese government's "21 Most Wanted" list. He orchestrated a harrowing escape through the underground network known as "Operation Yellowbird," fleeing to Hong Kong, then Paris, and finally arriving in New York City as a political refugee speaking practically no English.
                </p>

                <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-2xl my-8">
                  <h4 className="text-xl font-bold text-amber-900 dark:text-amber-400 mb-2">The Buffett Epiphany (1993)</h4>
                  <p className="text-amber-800/90 dark:text-amber-300/90 text-base">
                    The pivotal turning point occurred while he was burdened with student debt. A friend invited him to a guest lecture at Columbia University delivered by Warren Buffett. Listening to Buffett's rational, moral, and compounding-focused approach to capitalism completely rewired Li Lu's worldview. It provided a predictable framework in a chaotic world, inspiring him to invest his meager savings and launching his legendary career.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-[#14171B] rounded-3xl p-8 border border-slate-100 dark:border-white/10 shadow-lg dark:shadow-none relative overflow-hidden h-fit">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-bl-full opacity-50"></div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 relative z-10">The Columbia Marathon</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 relative z-10">
                  Assimilating into the U.S. and driven by an intense work ethic forged in his youth, Li Lu displayed unprecedented academic endurance at Columbia University. Over a six-year period, he achieved what few ever have, becoming one of the first students in the university's history to graduate simultaneously in 1996 with three rigorous degrees:
                </p>
                <ul className="space-y-4 relative z-10">
                  <li className="flex items-center gap-3 bg-white dark:bg-black/40 p-4 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span className="font-semibold text-slate-800 dark:text-white">B.A. in Economics</span> (Columbia College)
                  </li>
                  <li className="flex items-center gap-3 bg-white dark:bg-black/40 p-4 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                    <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                    <span className="font-semibold text-slate-800 dark:text-white">Juris Doctor</span> (Columbia Law School)
                  </li>
                  <li className="flex items-center gap-3 bg-white dark:bg-black/40 p-4 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="font-semibold text-slate-800 dark:text-white">M.B.A.</span> (Columbia Business School)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 px-6 bg-slate-50 dark:bg-[#14171B]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl shadow-inner dark:shadow-none">
                  <PieChart className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Epistemology of Capital Allocation</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                A synthesis of Benjamin Graham's foundational valuation principles, Charlie Munger's qualitative refinements, and a profound comprehension of Asian macroeconomic dynamics.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {philosophyPillars.map((pillar, idx) => (
                <div key={idx} className="bg-white dark:bg-black/40 rounded-3xl p-8 shadow-md dark:shadow-none hover:shadow-xl dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-white/10 flex flex-col h-full">
                  <div className="mb-6 bg-slate-50 dark:bg-[#14171B] inline-block p-4 rounded-2xl w-fit">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{pillar.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm flex-grow">{pillar.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-black/40 rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 border-b pb-4 border-slate-100 dark:border-slate-800">The Investigative Imperative</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Li Lu approaches equity research not merely as a financial analyst, but as an <strong>investigative journalist and prospective business owner</strong>. He famously insists that before investing, an individual must know the business fundamentally better than its own management team.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  This methodology demands discarding superficial Wall Street models in favor of granular, absolute understanding: physically verifying supply chains, interviewing former employees, analyzing competitor vulnerabilities, and relentlessly tracking a decade of historic capital allocation records. If a business or its leadership falls outside his strict "Circle of Competence," it is immediately passed over.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium bg-slate-50 dark:bg-[#14171B] p-4 rounded-xl border border-slate-100 dark:border-white/10">
                  He views risk not as price volatility—which he actively welcomes to lower his entry basis—but solely as the mathematical probability of a permanent loss of capital.
                </p>
              </div>

              <div className="bg-white dark:bg-black/40 rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 border-b pb-4 border-slate-100 dark:border-slate-800">Value Investing as a Moral Calling</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Unlike quantitative algorithms or high-frequency trading, Li Lu views true value investing as a strictly positive-sum game. By identifying undervalued, productive assets and avoiding toxic ones, value investors perform a vital public service: efficiently directing society's capital to its highest and best use, thereby growing the real economy.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  He deeply internalized Munger's concept of the "lollapalooza effect," actively seeking out businesses where multiple mental models and structural advantages compound simultaneously and exponentially.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  In his view, extreme patience is a fiduciary requirement. If an investor can identify just a handful of these "inevitable compounders" over a 40-year career, immense wealth generation is a mathematical certainty without the need for excessive, friction-heavy trading.
                </p>
              </div>
            </div>

            <div className="mt-16 bg-gradient-to-r from-indigo-900 to-slate-800 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Users className="w-8 h-8 text-indigo-300" />
                    The Munger Connection
                  </h3>
                  <p className="text-indigo-100 text-lg leading-relaxed mb-4">
                    The operational success and credibility of Himalaya Capital is inextricably linked to the mentorship of Charlie Munger. In 2004, Munger allocated $88 million of his family's personal fortune to Li Lu—a stake that subsequently ballooned to roughly $400 million. Munger famously described Li Lu as "the Chinese Warren Buffett" and noted he was the <em>only</em> outside manager he ever trusted with his family's capital.
                  </p>
                  <p className="text-indigo-100 text-lg leading-relaxed">
                    This partnership yielded one of Berkshire Hathaway's most spectacular non-traditional investments: the 2008 acquisition of BYD (Build Your Dreams). Pitched by Li Lu, Berkshire invested $232 million for a 10% stake in the obscure Chinese battery maker. As BYD transformed into the world's largest Electric Vehicle manufacturer, surpassing Tesla in production, the stake appreciated more than thirtyfold, generating billions in pure profit.
                  </p>
                </div>
                <div className="hidden lg:flex flex-col items-center justify-center p-8 bg-white/10 rounded-2xl border border-white/20 min-w-[280px] shadow-inner backdrop-blur-sm">
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-indigo-300 mb-2">30x+</div>
                  <div className="text-indigo-200 text-center text-xs uppercase tracking-widest font-bold">BYD Investment Return</div>
                  <div className="w-full h-px bg-white/20 my-6"></div>
                  <div className="text-3xl font-bold text-white mb-2">Exclusive</div>
                  <div className="text-indigo-200 text-center text-xs uppercase tracking-widest font-bold">Munger's Outside Manager</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-24 px-6 bg-white dark:bg-[#14171B]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl shadow-inner dark:shadow-none">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Q4 2025 Form 13F Architecture</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Himalaya Capital executes its mandate through an unyielding commitment to extreme portfolio concentration, managing an estimated $14-$17 billion globally, with a hyper-curated U.S. subset.
              </p>
            </div>

            <div className="mt-12 bg-white dark:bg-[#14171B] border border-slate-200 dark:border-white/10 rounded-3xl shadow-xl dark:shadow-none overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/20 border-b border-slate-200 dark:border-slate-800">
                      <th className="py-5 px-6 font-semibold text-slate-600 dark:text-slate-400 text-sm uppercase tracking-wider">Company</th>
                      <th className="py-5 px-6 font-semibold text-slate-600 dark:text-slate-400 text-sm uppercase tracking-wider">Ticker</th>
                      <th className="py-5 px-6 font-semibold text-slate-600 dark:text-slate-400 text-sm uppercase tracking-wider text-right">Shares</th>
                      <th className="py-5 px-6 font-semibold text-slate-600 dark:text-slate-400 text-sm uppercase tracking-wider text-right">Weight</th>
                      <th className="py-5 px-6 font-semibold text-slate-600 dark:text-slate-400 text-sm uppercase tracking-wider text-right">Value (USD)</th>
                      <th className="py-5 px-6 font-semibold text-slate-600 dark:text-slate-400 text-sm uppercase tracking-wider text-center">Q4 Activity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {portfolioData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">{item.name}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold ${item.color}`}>
                            {item.ticker}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right text-slate-600 dark:text-slate-400 tabular-nums">{item.shares}</td>
                        <td className="py-4 px-6 text-right font-semibold text-slate-800 dark:text-white tabular-nums">{item.weight}</td>
                        <td className="py-4 px-6 text-right text-slate-600 dark:text-slate-400 tabular-nums">{item.value}</td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${item.activity === 'New Buy' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                            {item.activity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/20 p-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 flex justify-between items-center">
                <span>*Data derived from SEC Form 13F filing for the period ending December 31, 2025.</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">Total 13F Assets: $3,568,876,223</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-3xl p-8 border border-blue-100 dark:border-blue-900/30">
                <h4 className="text-xl font-bold text-blue-900 dark:text-blue-400 mb-4">Tech & Finance Monopolies</h4>
                <p className="text-blue-800/80 dark:text-blue-300/80 leading-relaxed mb-4">
                  The portfolio is massively anchored by <strong>Alphabet (43.86%)</strong> and <strong>Bank of America (16.08%)</strong>. Alphabet operates as a digital toll bridge across global information, positioning it beautifully for the AI computational epoch. BAC provides resilient, steady returns amid shifting cycles.
                </p>
              </div>
              <div className="bg-orange-50/50 dark:bg-orange-900/20 rounded-3xl p-8 border border-orange-100 dark:border-orange-900/30">
                <h4 className="text-xl font-bold text-orange-900 dark:text-orange-400 mb-4">The PDD Thesis (14.64%)</h4>
                <p className="text-orange-800/80 dark:text-orange-300/80 leading-relaxed">
                  A contrarian, massive bet on Pinduoduo/Temu. While Western capital fears regulatory opacity, Li Lu isolated PDD as a superior structural compounder capable of high-velocity revenue generation and delivering extreme value to price-sensitive demographics globally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Coattailing Hazards Section */}
        <section className="py-24 px-6 bg-rose-50 dark:bg-[#14171B] border-t border-rose-100 dark:border-slate-800">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-2xl shadow-inner dark:shadow-none">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">The Architecture of Replicability</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Systemic Hazards of 'Coattailing'. Why retail investors attempting to clone Li Lu's 13F frequently suffer severe losses.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white dark:bg-black/40 p-8 rounded-3xl shadow-sm dark:shadow-none border border-rose-100 dark:border-rose-900/30">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center mb-6 text-rose-600 dark:text-rose-400 font-bold text-xl">1</div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Informational Latency</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  Institutional managers have a 45-day grace period to file 13Fs. When the public discovers a trade, it may have been executed up to four months prior. The mimicking investor acts on decayed intelligence.
                </p>
              </div>
              <div className="bg-white dark:bg-black/40 p-8 rounded-3xl shadow-sm dark:shadow-none border border-rose-100 dark:border-rose-900/30">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center mb-6 text-rose-600 dark:text-rose-400 font-bold text-xl">2</div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Incomplete Mosaic</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  The 13F isolates only US-listed equities (approx. 20-25% of his AUM). Observers miss massive non-US deployments, like the multi-billion dollar stakes in mainland Chinese financials (e.g., PSBC on the HKEX), leading to distorted risk exposures.
                </p>
              </div>
              <div className="bg-white dark:bg-black/40 p-8 rounded-3xl shadow-sm dark:shadow-none border border-rose-100 dark:border-rose-900/30">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-2xl flex items-center justify-center mb-6 text-rose-600 dark:text-rose-400 font-bold text-xl">3</div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Psychological Asymmetry</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  Himalaya Capital weathers 50-80% drawdowns over decades. A retail investor borrowing a ticker symbol cannot borrow the manager's deep-seated conviction, inevitably capitulating at the precise moment of maximum pessimism.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
