'use client';

import React from 'react';
import { AlertTriangle, Users, Globe, Activity, Shield, Zap, BarChart3, Clock, FileText, Lock, Layers } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

const FuturesGuide = () => {
  return (
    <ArticleFrame
      slug="es-nq-futures-engine-room-global-economy"
      additionalDisclaimer="Futures trading involves substantial risk of loss and is not suitable for every investor. The valuation of futures contracts may fluctuate, and as a result, clients may lose more than their original investment."
    >
      <div className="max-w-6xl mx-auto px-6 text-slate-800 dark:text-slate-200">
        <InfographicSlot alt="ES & NQ Futures Infographic" />

        <div className="space-y-20">
          {/* Section 1: The Tale of the Tape (Specs) */}
          <section className="bg-white dark:bg-[#0A0D14] rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#14171B]/50">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3 font-serif">
                <FileText className="text-[#A8672E] dark:text-[#D08F52]" />
                Contract Specifications
              </h2>
              <p className="text-slate-500 mt-2">The math behind the movement. Understanding what you are actually trading.</p>
            </div>
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* ES Side */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-100 text-[#A8672E] dark:text-[#D08F52] rounded-2xl">
                    <BarChart3 size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 font-serif">ES</h3>
                    <div className="text-sm font-semibold text-[#A8672E] dark:text-[#D08F52] uppercase tracking-wider">E-mini S&amp;P 500</div>
                  </div>
                </div>
                <ul className="space-y-6">
                  <SpecRow label="Underlying" value="S&P 500 Index" />
                  <SpecRow label="Multiplier" value="$50 x Index Price" />
                  <SpecRow label="Tick Size" value="0.25 index points" />
                  <SpecRow label="Tick Value" value="$12.50 per tick" />
                  <SpecRow label="Point Value" value="$50.00 per point" />
                  <div className="p-4 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-xl mt-4">
                    <div className="text-xs text-[#A8672E] dark:text-[#D08F52] font-bold uppercase mb-1">Impact</div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      If ES moves from 4500.00 to 4501.00, you make or lose <strong>$50.00</strong> per contract.
                    </p>
                  </div>
                </ul>
              </div>

              {/* NQ Side */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-emerald-100 text-[#1D8A70] dark:text-[#3CBF9C] rounded-2xl">
                    <Zap size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 font-serif">NQ</h3>
                    <div className="text-sm font-semibold text-[#1D8A70] dark:text-[#3CBF9C] uppercase tracking-wider">E-mini Nasdaq-100</div>
                  </div>
                </div>
                <ul className="space-y-6">
                  <SpecRow label="Underlying" value="Nasdaq-100 Index" />
                  <SpecRow label="Multiplier" value="$20 x Index Price" />
                  <SpecRow label="Tick Size" value="0.25 index points" />
                  <SpecRow label="Tick Value" value="$5.00 per tick" />
                  <SpecRow label="Point Value" value="$20.00 per point" />
                  <div className="p-4 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-xl mt-4">
                    <div className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] font-bold uppercase mb-1">Impact</div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      If NQ moves from 15000.00 to 15001.00, you make or lose <strong>$20.00</strong> per contract. *Note: NQ moves much faster than ES.
                    </p>
                  </div>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: The Micro Revolution (The Common Investor Answer) */}
          <section>
            <div className="flex flex-col md:flex-row gap-12 items-center mb-10">
              <div className="flex-1">
                <span className="text-purple-600 font-semibold tracking-wider text-sm uppercase">Accessibility</span>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mt-2 font-serif">Can Common Investors Participate?</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
                  Historically, futures were only for institutions due to massive contract sizes. <span className="text-[#A8672E] dark:text-[#D08F52] font-bold"> Enter the &ldquo;Micros&rdquo; (MES &amp; MNQ).</span> These contracts are 1/10th the size of the standard E-minis, effectively democratizing the futures market.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 font-serif">
                    <Lock className="text-purple-400" />
                    The Power of 1/10th
                  </h3>
                  <div className="grid grid-cols-2 gap-8 mt-8">
                    <div>
                      <div className="text-slate-400 text-sm mb-1 uppercase tracking-wider">Standard (ES)</div>
                      <div className="text-3xl font-bold text-white mb-2">
                        $50 <span className="text-sm text-slate-400 font-normal">/ point</span>
                      </div>
                      <div className="text-sm text-slate-400">Requires large capital buffers to survive volatility.</div>
                    </div>
                    <div className="border-l border-slate-700 pl-8">
                      <div className="text-purple-400 text-sm mb-1 uppercase tracking-wider font-bold">Micro (MES)</div>
                      <div className="text-3xl font-bold text-white mb-2">
                        $5 <span className="text-sm text-slate-400 font-normal">/ point</span>
                      </div>
                      <div className="text-sm text-slate-300">
                        Allows strategies to be tested with <span className="text-purple-300">$500-$1,000</span> accounts.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-center">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                  <Lock size={18} className="text-[#1D8A70] dark:text-[#3CBF9C]" />
                  Capital Efficiency
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Unlike stocks where you need $25,000 to Day Trade (PDT Rule), futures accounts often have no minimum balance requirements for day trading beyond the margin required for the single contract.
                </p>
                <div className="bg-slate-100 rounded-lg p-4 text-center">
                  <div className="text-xs text-slate-500 uppercase">Day Trading Margin (MES)</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">~$50 - $100</div>
                  <div className="text-[10px] text-slate-400">Depending on Broker</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Market Structure & Players */}
          <section>
            <div className="mb-10">
              <span className="text-[#BC4128] dark:text-[#E2694A] font-semibold tracking-wider text-sm uppercase">Market Ecology</span>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mt-2 font-serif">Who is on the other side?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <PlayerCard
                title="The Hedgers"
                subtitle="Institutions & Funds"
                desc="They are not trying to 'make money' on the trade. They are buying insurance. If they own $10B in Apple stock, they Short NQ futures to protect against a crash."
                icon={<Shield className="text-[#BC4128] dark:text-[#E2694A]" />}
                color="bg-[#BC4128]/10 dark:bg-[#E2694A]/10"
              />
              <PlayerCard
                title="The Arbitrageurs"
                subtitle="HFT Algorithms"
                desc="They keep the price of the Futures contract locked to the actual S&P 500 stock index. If the Future gets too expensive, they sell the Future and buy the stocks instantly."
                icon={<Activity className="text-cyan-600" />}
                color="bg-cyan-50"
              />
              <PlayerCard
                title="The Speculators"
                subtitle="Traders like You"
                desc="Providing liquidity to the hedgers. Speculators take on the risk that institutions want to offload in exchange for the potential of profit."
                icon={<Users className="text-pink-600" />}
                color="bg-pink-50"
              />
            </div>
          </section>

          {/* Section 4: Critical Knowledge & Pitfalls */}
          <section className="bg-slate-900 rounded-3xl text-slate-300 overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 lg:p-14">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-[#BC4128] dark:bg-[#E2694A]/20 p-2 rounded-lg">
                    <AlertTriangle className="text-[#BC4128] dark:text-[#E2694A]" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-white font-serif">The Danger Zone</h2>
                </div>
                <p className="text-lg leading-relaxed mb-8">
                  Futures are a <strong>zero-sum game</strong> (before commissions). For every dollar won, a dollar is lost by someone else. The &ldquo;Common Investor&rdquo; usually fails due to three specific mechanics.
                </p>
                <div className="space-y-6">
                  <PitfallItem
                    title="The Margin Call Trap"
                    desc="Brokers offer low day-trading margins (e.g., $500 for ES). This is a trap. A 10-point move (normal for 5 minutes) wipes you out. Just because you CAN trade with $500 doesn't mean you should."
                  />
                  <PitfallItem
                    title="Over-Leverage"
                    desc="Controlling $200,000 of stock with $10,000 in cash. A 5% market correction, which is healthy for stocks, results in a 100% loss of your futures account."
                  />
                  <PitfallItem
                    title="Contract Rollover"
                    desc="Forgetting that futures expire. ES and NQ expire quarterly (March, June, Sept, Dec). Volume shifts to the new contract about a week before expiration. Trading the old contract results in zero liquidity."
                  />
                </div>
              </div>
              <div className="bg-slate-800/50 p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-slate-700">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-serif">
                  <Clock size={20} className="text-[#A8672E] dark:text-[#D08F52]" />
                  Market Rhythm (ET)
                </h3>
                <div className="space-y-4">
                  <TimeBlock
                    time="6:00 PM (Sun) - 5:00 PM (Fri)"
                    label="Globex Session"
                    sub="Market is open nearly 24/5."
                  />
                  <TimeBlock
                    time="9:30 AM"
                    label="US Cash Open"
                    sub="Volume explodes. The most volatile time."
                    highlight
                  />
                  <TimeBlock
                    time="4:15 PM - 4:30 PM"
                    label="Maintenance Break"
                    sub="Trading halts completely."
                  />
                  <TimeBlock
                    time="8:30 AM"
                    label="Macro Data Drops"
                    sub="CPI, NFP, PPI usually release here. Dangerous volatility."
                    warning
                  />
                </div>
                <div className="mt-10 p-6 bg-indigo-900/30 rounded-xl border border-[#A8672E] dark:border-[#D08F52]/30">
                  <h4 className="text-indigo-300 font-bold mb-2">Tax Alpha</h4>
                  <p className="text-sm">
                    US Traders benefit from <strong>Section 1256</strong> tax treatment: 60% of gains taxed at Long Term rates, 40% at Short Term rates, regardless of holding period. This is a massive advantage over standard stock trading.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Non-Investor Utility */}
          <section className="bg-white dark:bg-[#0A0D14] rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 font-serif">Utility for the Passive Observer</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Even if you never buy a contract, ES and NQ are vital dashboard indicators for your life.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <UtilityCard
                icon={<Globe />}
                title="The Overnight Sentiment"
                desc="When you wake up, check ES. If it's down 1.5%, your 401k is going to take a hit today. It allows you to mentally prepare for the market day before it starts."
              />
              <UtilityCard
                icon={<Layers />}
                title="Sector Rotation Hints"
                desc="If NQ (Tech) is Green but RTY (Small Caps) is Red, it signals investors are fleeing to safety in 'Big Tech' rather than taking risks in smaller companies."
              />
            </div>
          </section>
        </div>
      </div>
    </ArticleFrame>
  );
};

// --- Sub Components ---
const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
    <span className="text-slate-500 font-medium">{label}</span>
    <span className="text-slate-900 dark:text-slate-100 font-bold text-right">{value}</span>
  </div>
);

const PlayerCard = ({ title, subtitle, desc, icon, color }: {
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactElement;
  color: string;
}) => (
  <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div className="mb-4">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-serif">{title}</h3>
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{subtitle}</span>
    </div>
    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const PitfallItem = ({ title, desc }: { title: string; desc: string }) => (
  <div className="flex gap-4">
    <div className="mt-1 flex-shrink-0">
      <div className="w-2 h-2 rounded-full bg-[#BC4128] dark:bg-[#E2694A] shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
    </div>
    <div>
      <h4 className="font-bold text-white text-lg mb-2">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const TimeBlock = ({ time, label, sub, highlight, warning }: {
  time: string;
  label: string;
  sub: string;
  highlight?: boolean;
  warning?: boolean;
}) => (
  <div className={`p-4 rounded-xl border transition-colors ${
    highlight ? 'bg-[#A8672E] dark:bg-[#D08F52] border-[#A8672E] dark:border-[#D08F52] text-white' :
    warning ? 'bg-rose-900/20 border-[#BC4128] dark:border-[#E2694A]/30 text-rose-100' :
    'bg-slate-800 border-slate-700 text-slate-300'
  }`}>
    <div className="flex justify-between items-center mb-1">
      <span className={`font-bold ${highlight ? 'text-white' : 'text-slate-200'}`}>{time}</span>
      {highlight && <Zap size={14} className="text-yellow-300" />}
      {warning && <AlertTriangle size={14} className="text-[#BC4128] dark:text-[#E2694A]" />}
    </div>
    <div className={`font-medium mb-1 ${highlight ? 'text-indigo-100' : 'text-white'}`}>{label}</div>
    <div className={`text-xs ${highlight ? 'text-indigo-200' : 'text-slate-500'}`}>{sub}</div>
  </div>
);

const UtilityCard = ({ icon, title, desc }: {
  icon: React.ReactElement;
  title: string;
  desc: string;
}) => (
  <div className="flex gap-6 items-start p-6 rounded-2xl bg-slate-50 dark:bg-[#14171B] hover:bg-slate-100 transition-colors">
    <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-xl shadow-sm text-[#A8672E] dark:text-[#D08F52]">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-2 font-serif">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default FuturesGuide;
