'use client';

import React from 'react';
import { Rocket, TrendingUp, AlertTriangle, Globe, ShieldAlert, Satellite, Cpu, DollarSign, Activity, BarChart3, Scale } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

const financialData = [
  { name: 'Consolidated Rev', amount: 18.67, fill: '#3b82f6' },
  { name: 'Starlink Rev', amount: 11.40, fill: '#10b981' },
  { name: 'xAI Rev', amount: 3.20, fill: '#8b5cf6' },
  { name: 'xAI Capex', amount: 12.70, fill: '#f43f5e' },
  { name: 'Consolidated Loss', amount: 4.94, fill: '#ef4444' },
];

const economicImpactData = [
  { tier: "Tier 1: Direct Losses", desc: "Immediate revenue forfeiture by operators. Lost subscriptions, halted inflight Wi-Fi, frozen HFT algorithms.", color: "bg-orange-100 text-orange-800 border-orange-200" },
  { tier: "Tier 2: Operational Shock", desc: "Paralysis of physical logistics and supply chains. Maritime port congestion, disrupted commercial flight scheduling.", color: "bg-red-100 text-red-800 border-red-200" },
  { tier: "Tier 3: Systemic Damage", desc: "Macroeconomic and geopolitical contagion. Reputational destruction, market volatility, defense communication failures.", color: "bg-rose-100 text-rose-800 border-rose-200" },
];

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 hover:shadow-md transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ icon: Icon, title, subtitle, colorClass }: { icon: React.ElementType; title: string; subtitle?: string; colorClass: string }) => (
  <div className="mb-8">
    <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-4 ${colorClass}`}>
      <Icon size={28} />
    </div>
    <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
    {subtitle && <p className="text-xl text-slate-500">{subtitle}</p>}
  </div>
);

const StatBox = ({ label, value, context, colorTheme }: { label: string; value: string; context: string; colorTheme: 'blue' | 'green' | 'purple' | 'red' | 'amber' }) => {
  const themes = {
    blue: "bg-blue-50 border-blue-100 text-blue-900",
    green: "bg-emerald-50 border-emerald-100 text-emerald-900",
    purple: "bg-purple-50 border-purple-100 text-purple-900",
    red: "bg-rose-50 border-rose-100 text-rose-900",
    amber: "bg-amber-50 border-amber-100 text-amber-900",
  };
  return (
    <div className={`p-5 rounded-xl border ${themes[colorTheme]} flex flex-col`}>
      <span className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-1">{label}</span>
      <span className="text-3xl font-extrabold mb-2">{value}</span>
      <span className="text-sm opacity-80 mt-auto">{context}</span>
    </div>
  );
};

export default function SpaceXIPOAnalysis() {
  return (
    <ArticleFrame slug="spacex-public-market-integration-systemic-risk-analysis">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 font-sans text-slate-900 space-y-0 pb-8">

        {/* Key metrics bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 pb-8">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 font-medium">IPO Price</p>
            <p className="text-2xl font-bold text-slate-900">$135.00</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 font-medium">Capital Raised</p>
            <p className="text-2xl font-bold text-slate-900">$75 Billion</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 font-medium">Implied Valuation</p>
            <p className="text-2xl font-bold text-blue-600">$1.77 Trillion</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 font-medium">Public Float</p>
            <p className="text-2xl font-bold text-rose-600">4.2%</p>
          </div>
        </div>

        <InfographicSlot
          alt="SpaceX IPO Analysis Infographic — index weighting, drawdown risks, and systemic failure consequences"
        />

        {/* Financial Architecture */}
        <section className="py-16 bg-white">
          <SectionHeader
            icon={DollarSign}
            title="The Mega-IPO Paradigm & Financial Architecture"
            subtitle="A complex amalgamation of profitable telecom, cyclical aerospace, and massive AI cash burn."
            colorClass="bg-emerald-100 text-emerald-600"
          />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg text-slate-600">
              <p>
                The financial architecture underlying the SpaceX IPO reveals a unified ecosystem that fundamentally alters how institutional investors value the enterprise. For years, consensus projected a carve-out IPO of the highly profitable <strong>Starlink</strong> division (61% of group revenue).
              </p>
              <p>
                However, leadership bundled the entire portfolio into a single entity to use Starlink&apos;s cash flows to subsidize the pre-revenue Starship program and the massive capital expenditure of the <strong>xAI merger</strong>.
              </p>
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-6 rounded-r-lg">
                <h4 className="text-emerald-900 font-bold flex items-center gap-2 mb-2">
                  <Cpu size={20} /> The xAI Burden
                </h4>
                <p className="text-sm text-emerald-800 m-0">
                  The integration of xAI dramatically transformed SpaceX&apos;s risk profile. While securing lucrative contracts (e.g., Anthropic), the $12.7B capex for the Colossus data center dragged the consolidated entity to a GAAP net loss of $4.94 billion in 2025.
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6 text-center">2025 Reported Figures (in Billions)</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" tickFormatter={(val) => `$${val}B`} stroke="#64748b" />
                    <YAxis dataKey="name" type="category" width={120} stroke="#64748b" style={{ fontSize: '12px' }} />
                    <Tooltip cursor={{ fill: '#f1f5f9' }} formatter={(value) => [`$${value} Billion`, 'Amount']} />
                    <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={32}>
                      {financialData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Index Integration */}
        <section className="py-16 bg-slate-50 border-y border-slate-200 -mx-6 px-6">
          <SectionHeader
            icon={BarChart3}
            title="Index Integration & Passive Capital Flows"
            subtitle="Testing the mechanical limits of passive benchmark tracking."
            colorClass="bg-blue-100 text-blue-600"
          />
          <p className="text-lg text-slate-600 mb-10 max-w-3xl">
            The sheer scale of the SpaceX IPO forced major equity index providers into a structural paradigm shift, creating immense tracking error risks for global asset managers due to divergent inclusion responses.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-t-4 border-t-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Activity size={24} /></div>
                <h3 className="text-2xl font-bold text-slate-900">Nasdaq-100 &amp; FTSE</h3>
              </div>
              <h4 className="text-lg font-semibold text-blue-700 mb-3">The &ldquo;Fast-Entry&rdquo; Paradigm</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <div className="min-w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
                  <span><strong>Rule Change:</strong> Nasdaq amended rules to allow entry after 15 days for top 40 constituents.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
                  <span><strong>Float Adjustment:</strong> Waived minimum float, applied a 3x multiplier to the 4.2% float to avoid dislocation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
                  <span><strong>Market Impact:</strong> Forced $4.3B to $6.0B in mechanical buying from passive funds, triggering fractional selling of legacy constituents.</span>
                </li>
              </ul>
            </Card>
            <Card className="border-t-4 border-t-rose-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-rose-100 text-rose-600 p-2 rounded-lg"><Scale size={24} /></div>
                <h3 className="text-2xl font-bold text-slate-900">S&amp;P 500</h3>
              </div>
              <h4 className="text-lg font-semibold text-rose-700 mb-3">The Profitability Barrier</h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <div className="min-w-1.5 h-1.5 rounded-full bg-rose-500 mt-2"></div>
                  <span><strong>Stringent Rules:</strong> Maintained 12-month seasoning and strict GAAP profitability requirements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-1.5 h-1.5 rounded-full bg-rose-500 mt-2"></div>
                  <span><strong>The Block:</strong> SpaceX&apos;s $4.94B net loss completely fails criteria. Inclusion delayed until at least June 2027.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-1.5 h-1.5 rounded-full bg-rose-500 mt-2"></div>
                  <span><strong>Market Impact:</strong> Massive tracking error for active managers. Future inclusion will trigger unprecedented $50B+ liquidity event.</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Drawdown Risks */}
        <section className="py-16 bg-white">
          <SectionHeader
            icon={AlertTriangle}
            title="Structural Drawdown Risks"
            subtitle="Evaluating the fragile ecosystem of extreme multiples and float scarcity."
            colorClass="bg-orange-100 text-orange-600"
          />
          <div className="grid md:grid-cols-3 gap-6">
            <StatBox
              label="The Dynasty Premium"
              value="94x"
              context="Trailing revenue multiple, reflecting expectations of enduring 21st-century monopolies rather than present operations."
              colorTheme="purple"
            />
            <StatBox
              label="Lock-up Expiration"
              value="13x"
              context="Expected increase in public float (to 58%) between Sept-Dec 2026, creating a massive supply shock."
              colorTheme="red"
            />
            <StatBox
              label="Executive Leverage"
              value="85%"
              context="Voting control held by Elon Musk, whose personal margin loans and intertwined equity create cross-asset contagion risks."
              colorTheme="amber"
            />
          </div>
          <div className="mt-10 bg-orange-50 rounded-2xl p-6 border border-orange-100">
            <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
              <TrendingUp className="rotate-180" /> The &ldquo;Sell-the-News&rdquo; Dynamic
            </h3>
            <p className="text-orange-800 leading-relaxed">
              Due to extreme float scarcity, professional managers who front-ran the Nasdaq-100 passive inflows aggressively dumped shares into the forced institutional demand, causing a 6% drop on its first day as an index member. Without S&amp;P 500 index funds to absorb the impending insider lock-up expirations, the stock faces severe exposure to downward repricing. Fundamental models place fair value closer to $60/share.
            </p>
          </div>
        </section>

        {/* Aerospace & Defense */}
        <section className="py-16 bg-slate-900 text-slate-50 -mx-6 px-6">
          <SectionHeader
            icon={Rocket}
            title="Systemic Consequences: Aerospace & Defense"
            subtitle="The extreme, asymmetric dependency on SpaceX&apos;s vertical architecture."
            colorClass="bg-slate-800 text-blue-400 border border-slate-700"
          />
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <h3 className="text-2xl font-bold text-white mb-2">The NASA Bottleneck</h3>
                <div className="h-1 w-20 bg-blue-500 rounded-full mb-4"></div>
                <p className="text-slate-400 text-sm">Following the Starliner Crisis, SpaceX is the singular provider for US human spaceflight.</p>
              </div>
              <div className="md:w-2/3 bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <p className="text-slate-300 mb-4">
                  NASA&apos;s Commercial Crew Program was designed for redundancy (SpaceX &amp; Boeing). However, the June 2024 Boeing Starliner (CFT) mission suffered severe anomalies (helium leaks, thruster failures), stranding astronauts for 286 days.
                </p>
                <p className="text-slate-300">
                  With Starliner classified as a Type A mishap and demoted to uncrewed cargo flights until at least 2027, <strong>Crew Dragon is the only operational vehicle</strong>. A SpaceX grounding means abandoning the ISS or relying on Russia. Furthermore, the Artemis lunar return relies entirely on the delayed Starship Human Landing System, which currently faces 50% payload underperformance and unresolved cryogenic transfer challenges.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <h3 className="text-2xl font-bold text-white mb-2">National Security Launch</h3>
                <div className="h-1 w-20 bg-rose-500 rounded-full mb-4"></div>
                <p className="text-slate-400 text-sm">The Pentagon&apos;s NSSL program is effectively paralyzed without Falcon 9/Heavy.</p>
              </div>
              <div className="md:w-2/3 bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <p className="text-slate-300 mb-4">
                  Under the NSSL program, the Pentagon relies on SpaceX and ULA. However, ULA&apos;s next-generation Vulcan Centaur rocket suffered a structural nozzle defect on its SRB during the February 2026 USSF-87 mission.
                </p>
                <p className="text-slate-300">
                  The subsequent indefinite grounding of the Vulcan fleet has thrown the national security launch manifest into chaos, delaying critical assets like GPS III and early warning satellites. SpaceX currently operates a <strong>de facto monopoly</strong> on US heavy-lift launch capabilities. A failure here constitutes a top-tier national security crisis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Constellation Economics */}
        <section className="py-16 bg-indigo-50 -mx-6 px-6">
          <SectionHeader
            icon={Globe}
            title="Constellation Economics & Strategic Stability"
            subtitle="Starlink governs the invisible infrastructure of global data flows."
            colorClass="bg-indigo-200 text-indigo-700"
          />
          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <div>
              <h3 className="text-xl font-bold text-indigo-950 mb-4 flex items-center gap-2">
                <Satellite className="text-indigo-600" /> Programmable Fragility
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Starlink operates 8,100+ active satellites for 10.3M subscribers. While physically robust, it relies on a centralized terrestrial control plane. A single flawed software update (like the July 2025 event causing an 84% global drop) or space weather (Sept 2025 CME) can collapse the network.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Sovereign nations now suffer <strong>&ldquo;digital sovereignty exposure,&rdquo;</strong> relying on a private, extra-regulatory entity for critical maritime, aviation, and defense communications.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-indigo-950 mb-4 flex items-center gap-2">
                <ShieldAlert className="text-indigo-600" /> Autonomous Warfare
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                The US military relies on Starlink/Starshield to command next-gen autonomous drone fleets. During 2025 Navy tests, outages left unmanned surface vessels uncontrollable.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Furthermore, the dual-use nature of Starlink creates a &ldquo;security dilemma&rdquo; for near-peer adversaries (like the PLA), potentially triggering asymmetric anti-satellite countermeasures. A corporate collapse directly compromises the US early warning and target-tracking architecture (SB-AMTI).
              </p>
            </div>
          </div>
          <Card className="bg-white/60 backdrop-blur-md border-indigo-100">
            <h3 className="text-xl font-bold text-center text-slate-900 mb-6">Modeled Economic Damage of a 24-Hour Outage (2032 Est: $36B &ndash; $60B)</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {economicImpactData.map((tier, idx) => (
                <div key={idx} className={`p-5 rounded-xl border ${tier.color}`}>
                  <h4 className="font-bold mb-2">{tier.tier}</h4>
                  <p className="text-sm opacity-90">{tier.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Conclusion */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Conclusion</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              SpaceX has evolved from a disruptive aerospace startup into an indispensable, centralized point of failure within the global geopolitical and economic system. A collapse of the firm would not simply result in lost venture capital; it would ground human spaceflight, cripple defense communications, halt military modernization, and inflict tens of billions of dollars in daily damage upon the global economy.
            </p>
            <p className="text-slate-500 italic">
              The $1.77 trillion valuation reflects not just technological achievement, but the unprecedented concentration of critical infrastructure in a single corporate entity &mdash; a structural risk that transcends traditional investment analysis.
            </p>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
