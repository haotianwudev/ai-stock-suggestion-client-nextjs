'use client';

import React from 'react';
import { Rocket, BrainCircuit, Globe2, AlertTriangle, TrendingDown, BarChart3, DollarSign, Layers, Activity } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

const Card = ({ title, children, icon: Icon, colorClass, gradient }: {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
  colorClass: string;
  gradient: string;
}) => (
  <div className={`rounded-2xl p-6 shadow-lg bg-white border-t-4 ${colorClass} hover:shadow-xl transition-shadow duration-300`}>
    <div className="flex items-center mb-4">
      <div className={`p-3 rounded-lg ${gradient} text-white mr-4 shadow-sm`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    </div>
    <div className="text-slate-600 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

const StatBox = ({ label, value, subtext, color }: {
  label: string;
  value: string;
  subtext?: string;
  color: string;
}) => (
  <div className={`p-4 rounded-xl bg-${color}-50 border border-${color}-100`}>
    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">{label}</p>
    <p className={`text-2xl font-bold text-${color}-700`}>{value}</p>
    {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
  </div>
);

const TutorialSection = ({ title, step, children, color }: {
  title: string;
  step: string;
  children: React.ReactNode;
  color: string;
}) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-6">
      <span className={`px-3 py-1 rounded-full bg-${color}-100 text-${color}-800 font-bold text-sm tracking-wide shadow-sm`}>
        MODULE {step}
      </span>
      <h2 className="text-3xl font-extrabold text-slate-900">{title}</h2>
    </div>
    <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-slate-100">
      {children}
    </div>
  </div>
);

export default function MegaIPOConvergence() {
  return (
    <ArticleFrame slug="2026-mega-ipo-convergence-market-analysis-systemic-risk">
      <div className="space-y-12">
        <InfographicSlot alt="2026 Mega-IPO Convergence Infographic" />

        <TutorialSection step="1" title="The Trillion-Dollar Public Debuts" color="blue">
          <p className="text-lg text-slate-700 mb-8 border-l-4 border-blue-400 pl-4">
            The 2026 market is defined by the unprecedented migration of the world's largest private technology conglomerates into the public equity sphere. These entities are utilizing public markets to finance existential, hyper-capital-intensive infrastructure build-outs while absorbing unprecedented operating losses.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="SpaceX" icon={Rocket} colorClass="border-orange-500" gradient="bg-gradient-to-br from-orange-400 to-red-500">
              <p>
                Targeting a historic $1.75T valuation via a $75B IPO. While dominating orbital logistics, its core valuation is an "option premium" heavily predicated on its recent $250B acquisition of xAI and planetary-scale orbital data centers.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <StatBox label="Valuation" value="~$1.75T" color="orange" />
                <StatBox label="P/S Ratio" value="93.7x" subtext="2025: -$4.94B Loss" color="red" />
              </div>
            </Card>

            <Card title="Anthropic" icon={BrainCircuit} colorClass="border-indigo-500" gradient="bg-gradient-to-br from-indigo-400 to-violet-500">
              <p>
                The explosive enterprise AI leader. Captured 34.4% of the enterprise market by monetizing high-tier clients (8 of Fortune 10). Offers a credible modeled path to profitability by 2028.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <StatBox label="Valuation" value="~$965B" color="indigo" />
                <StatBox label="P/S Ratio" value="21.9x" subtext=">$44B Ann. Rev" color="indigo" />
              </div>
            </Card>

            <Card title="OpenAI" icon={Globe2} colorClass="border-emerald-500" gradient="bg-gradient-to-br from-emerald-400 to-teal-500">
              <p>
                The consumer pioneer with over 900 million weekly active users. Facing profound capital expenditures for compute infrastructure, delaying expected net profitability until roughly 2030.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <StatBox label="Valuation" value="~$852B" color="emerald" />
                <StatBox label="P/S Ratio" value="34.0x" subtext="~$25B Ann. Rev" color="emerald" />
              </div>
            </Card>
          </div>
        </TutorialSection>

        <TutorialSection step="2" title="Valuation Mechanics & Exuberance" color="purple">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-6">
              <p className="text-lg text-slate-700">
                The pricing of these mega-IPOs highlights a stark divergence between traditional intrinsic valuation methodologies (like DCF) and narrative-driven market pricing, strongly echoing the late-1990s dot-com bubble.
              </p>
              
              <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                <h4 className="flex items-center gap-2 text-purple-900 font-bold mb-3">
                  <Activity size={20} />
                  The Option Premium Market
                </h4>
                <p className="text-purple-800">
                  Independent research assigns SpaceX a fundamental fair value of $63 per share. The $135 IPO asking price demands a massive $72 "option premium." To justify this, investors must assume a 77% probability of perfect execution on highly theoretical space-based AI computing networks (the "Moonshot Scenario").
                </p>
              </div>
              
              <div className="bg-pink-50 rounded-2xl p-6 border border-pink-100">
                <h4 className="flex items-center gap-2 text-pink-900 font-bold mb-3">
                  <Layers size={20} />
                  Vendor Financing Loops
                </h4>
                <p className="text-pink-800">
                  A dangerous circular capital ecosystem is forming. For instance, Anthropic could pay up to $15B annually to SpaceX for data center capacity—funded entirely by perpetual equity dilution. This mirrors the perilous vendor financing models that artificially inflated telecoms in 1999.
                </p>
              </div>
            </div>
          </div>
        </TutorialSection>

        <TutorialSection step="3" title="Structural Market Distortions" color="red">
          <p className="text-lg text-slate-700 mb-8">
            The sheer scale of these offerings is introducing severe mechanical distortions into the fundamental structure of public equity markets, weaponizing index rules and draining systemic liquidity.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-l-4 border-red-500 shadow-md rounded-xl p-6">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <BarChart3 className="text-red-500" size={20} />
                Weaponization of Index Rules
              </h4>
              <p className="text-slate-600 text-sm">
                While the S&P 500 maintained strict profitability rules, the Nasdaq actively altered its rulebook, eliminating minimum float requirements to fast-track SpaceX into the Nasdaq-100 after just 15 days.
              </p>
            </div>
            
            <div className="bg-white border-l-4 border-orange-500 shadow-md rounded-xl p-6">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <DollarSign className="text-orange-500" size={20} />
                Forced Passive Buying
              </h4>
              <p className="text-slate-600 text-sm">
                Passive index funds will be mechanically forced to indiscriminately buy ~$25B in SpaceX shares. To fund this, they must mechanically liquidate shares of existing foundational tech stocks (Apple, MSFT, Nvidia), destabilizing broader indices.
              </p>
            </div>
            
            <div className="bg-white border-l-4 border-yellow-500 shadow-md rounded-xl p-6 md:col-span-2">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={20} />
                The Retail Allocation Anomaly (Risk Transfer)
              </h4>
              <p className="text-slate-600 text-sm">
                Typically, mega-caps reserve 5-10% of shares for retail. SpaceX is allocating an unprecedented <strong>~30% ($22.5B)</strong> directly to retail platforms like Robinhood. Historically, this signals a transfer of massive institutional risk to less sophisticated retail participants at the peak of a cycle, leading to violent "day-one pops" followed by severe, prolonged selling pressure.
              </p>
            </div>
          </div>
        </TutorialSection>

        <TutorialSection step="4" title="Empirical History: The IPO Paradox" color="emerald">
          <p className="text-lg text-slate-700 mb-6">
            According to 45 years of data (1980–2025) from Professor Jay R. Ritter, unprofitability and extreme sales multiples mathematically forecast long-term capital destruction, despite initial media hype.
          </p>
          
          <div className="overflow-x-auto rounded-xl shadow-sm border border-slate-200">
            <table className="w-full text-left bg-white">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-semibold text-slate-700">Category (IPOs &gt;$100M Sales)</th>
                  <th className="p-4 font-semibold text-slate-700">Avg. 1st-Day Pop</th>
                  <th className="p-4 font-semibold text-slate-700">Avg. 3-Year Return</th>
                  <th className="p-4 font-semibold text-slate-700">Market Underperformance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 text-sm md:text-base">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">All IPOs (Mean)</td>
                  <td className="p-4 text-emerald-600 font-bold">+19.0%</td>
                  <td className="p-4 text-emerald-600">+7.0%</td>
                  <td className="p-4 text-slate-400">N/A</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">Profitable at IPO</td>
                  <td className="p-4 text-emerald-500">+13.3%</td>
                  <td className="p-4 text-emerald-600 font-bold">+33.6%</td>
                  <td className="p-4 text-red-400">-13.0 pts</td>
                </tr>
                <tr className="bg-red-50/30 hover:bg-red-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">Unprofitable at IPO (2026 Cohort)</td>
                  <td className="p-4 text-emerald-500 font-bold">+26.5%</td>
                  <td className="p-4 text-red-600 font-bold">-0.5%</td>
                  <td className="p-4 text-red-600 font-bold">-30.7 pts</td>
                </tr>
                <tr className="bg-red-100/50 hover:bg-red-100/80 transition-colors">
                  <td className="p-4 font-bold text-red-900 flex items-center gap-2">
                    <TrendingDown size={16} /> 
                    Extreme Valuation (P/S &gt; 40x)
                  </td>
                  <td className="p-4 text-emerald-600 font-extrabold text-lg">+93.6%</td>
                  <td className="p-4 text-red-700 font-extrabold text-lg">-44.8%</td>
                  <td className="p-4 text-red-800 font-bold">-58.5 pts</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="mt-4 text-sm text-slate-500 italic text-center">
            *SpaceX's P/S sits at ~93.7x, placing it squarely in the highest-risk historical tier.
          </p>
        </TutorialSection>
      </div>
    </ArticleFrame>
  );
}
