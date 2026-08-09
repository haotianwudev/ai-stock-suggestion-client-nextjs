'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

const financialData = [
  { name: 'Consolidated Rev', amount: 18.67, fill: '#A8672E' }, // Bronze
  { name: 'Starlink Rev', amount: 11.40, fill: '#1D8A70' }, // Positive
  { name: 'xAI Rev', amount: 3.20, fill: '#A8672E' }, // Bronze
  { name: 'xAI Capex', amount: 12.70, fill: '#BC4128' }, // Negative
  { name: 'Consolidated Loss', amount: 4.94, fill: '#BC4128' }, // Negative
];

const economicImpactData = [
  { tier: "Tier 1: Direct Losses", desc: "Immediate revenue forfeiture by operators. Lost subscriptions, halted inflight Wi-Fi, frozen HFT algorithms.", color: "border-[#BC4128]/30 dark:border-[#E2694A]/30 bg-[#BC4128]/5 dark:bg-[#E2694A]/5 text-[#BC4128] dark:text-[#E2694A]" },
  { tier: "Tier 2: Operational Shock", desc: "Paralysis of physical logistics and supply chains. Maritime port congestion, disrupted commercial flight scheduling.", color: "border-[#BC4128]/30 dark:border-[#E2694A]/30 bg-[#BC4128]/5 dark:bg-[#E2694A]/5 text-[#BC4128] dark:text-[#E2694A]" },
  { tier: "Tier 3: Systemic Damage", desc: "Macroeconomic and geopolitical contagion. Reputational destruction, market volatility, defense communication failures.", color: "border-[#BC4128]/30 dark:border-[#E2694A]/30 bg-[#BC4128]/5 dark:bg-[#E2694A]/5 text-[#BC4128] dark:text-[#E2694A]" },
];

export default function SpaceXIPOAnalysis() {
  return (
    <ArticleFrame slug="spacex-public-market-integration-systemic-risk-analysis">
      <div className="space-y-12">
        <InfographicSlot
          alt="SpaceX IPO Analysis Infographic — index weighting, drawdown risks, and systemic failure consequences"
        />

        <div className="bg-white dark:bg-gray-900 border border-[#A8672E]/30 dark:border-[#D08F52]/30 rounded-xl p-6 shadow-sm">
          <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4 border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current flex-none" />
            Key Takeaways
          </h3>
          <ul className="space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>SpaceX's massive $1.77 trillion IPO fundamentally shifted its profile from an aerospace startup to an indispensable, centralized point of global systemic risk.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>Divergent inclusion rules among major index providers (Nasdaq "fast-entry" vs. S&P 500 strict profitability) created extreme tracking errors and unprecedented passive capital flow disruptions.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>The firm faces severe downward repricing pressure due to an extreme 94x trailing revenue multiple, massive upcoming lock-up expirations, and a fragile 4.2% public float.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A8672E] dark:text-[#D08F52] mt-1.5 flex-none">•</span>
              <span>A catastrophic failure or grounding would paralyze US human spaceflight, cripple national security launch capabilities, and inflict $36B–$60B in daily global economic damage via Starlink outages.</span>
            </li>
          </ul>
        </div>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">IPO Price</p>
              <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">$135.00</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Capital Raised</p>
              <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">$75B</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Implied Valuation</p>
              <p className="text-2xl font-bold font-mono tabular-nums text-[#1D8A70] dark:text-[#3CBF9C]">$1.77T</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Public Float</p>
              <p className="text-2xl font-bold font-mono tabular-nums text-[#BC4128] dark:text-[#E2694A]">4.2%</p>
            </div>
          </div>

          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            The Mega-IPO Paradigm & Financial Architecture
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            A complex amalgamation of profitable telecom, cyclical aerospace, and massive AI cash burn.
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
            <div className="space-y-4">
              <p>
                The financial architecture underlying the SpaceX IPO reveals a unified ecosystem that fundamentally alters how institutional investors value the enterprise. For years, consensus projected a carve-out IPO of the highly profitable <strong>Starlink</strong> division (61% of group revenue).
              </p>
              <p>
                However, leadership bundled the entire portfolio into a single entity to use Starlink's cash flows to subsidize the pre-revenue Starship program and the massive capital expenditure of the <strong>xAI merger</strong>.
              </p>
              <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-4 my-6 rounded-r-lg">
                <h4 className="text-[#BC4128] dark:text-[#E2694A] font-serif text-lg mb-2">
                  The xAI Burden
                </h4>
                <p className="text-sm">
                  The integration of xAI dramatically transformed SpaceX's risk profile. While securing lucrative contracts (e.g., Anthropic), the $12.7B capex for the Colossus data center dragged the consolidated entity to a GAAP net loss of $4.94 billion in 2025.
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-serif text-slate-900 dark:text-slate-100 mb-6 text-center">2025 Reported Figures (in Billions)</h3>
              <div className="h-80 w-full font-mono text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financialData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#64748b" opacity={0.2} />
                    <XAxis type="number" tickFormatter={(val) => `$${val}B`} stroke="#64748b" />
                    <YAxis dataKey="name" type="category" width={120} stroke="#64748b" />
                    <Tooltip cursor={{ fill: '#64748b', opacity: 0.1 }} formatter={(value) => [`$${value} Billion`, 'Amount']} />
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

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Index Integration & Passive Capital Flows
          </h2>
          <p className="mb-8">
            The sheer scale of the SpaceX IPO forced major equity index providers into a structural paradigm shift, creating immense tracking error risks for global asset managers due to divergent inclusion responses.
          </p>
          
          <ComparisonGrid>
            <ComparisonCard title="Nasdaq-100 & FTSE: The Fast-Entry Paradigm" tone="pos">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-1.5 flex-none">•</span>
                  <span><strong>Rule Change:</strong> Nasdaq amended rules to allow entry after 15 days for top 40 constituents.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-1.5 flex-none">•</span>
                  <span><strong>Float Adjustment:</strong> Waived minimum float, applied a 3x multiplier to the 4.2% float to avoid dislocation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-1.5 flex-none">•</span>
                  <span><strong>Market Impact:</strong> Forced $4.3B to $6.0B in mechanical buying from passive funds, triggering fractional selling of legacy constituents.</span>
                </li>
              </ul>
            </ComparisonCard>
            <ComparisonCard title="S&P 500: The Profitability Barrier" tone="neg">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mt-1.5 flex-none">•</span>
                  <span><strong>Stringent Rules:</strong> Maintained 12-month seasoning and strict GAAP profitability requirements.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mt-1.5 flex-none">•</span>
                  <span><strong>The Block:</strong> SpaceX's $4.94B net loss completely fails criteria. Inclusion delayed until at least June 2027.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mt-1.5 flex-none">•</span>
                  <span><strong>Market Impact:</strong> Massive tracking error for active managers. Future inclusion will trigger unprecedented $50B+ liquidity event.</span>
                </li>
              </ul>
            </ComparisonCard>
          </ComparisonGrid>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Structural Drawdown Risks
          </h2>
          <p className="mb-6">
            Evaluating the fragile ecosystem of extreme multiples and float scarcity.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <span className="text-sm font-serif tracking-wider text-slate-500 dark:text-slate-400 mb-1">The Dynasty Premium</span>
              <span className="text-3xl font-mono tabular-nums font-bold mb-2">94x</span>
              <span className="text-sm">Trailing revenue multiple, reflecting expectations of enduring 21st-century monopolies rather than present operations.</span>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <span className="text-sm font-serif tracking-wider text-slate-500 dark:text-slate-400 mb-1">Lock-up Expiration</span>
              <span className="text-3xl font-mono tabular-nums font-bold mb-2 text-[#BC4128] dark:text-[#E2694A]">13x</span>
              <span className="text-sm">Expected increase in public float (to 58%) between Sept-Dec 2026, creating a massive supply shock.</span>
            </div>
            <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <span className="text-sm font-serif tracking-wider text-slate-500 dark:text-slate-400 mb-1">Executive Leverage</span>
              <span className="text-3xl font-mono tabular-nums font-bold mb-2 text-[#A8672E] dark:text-[#D08F52]">85%</span>
              <span className="text-sm">Voting control held by Elon Musk, whose personal margin loans and intertwined equity create cross-asset contagion risks.</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 border border-[#BC4128]/30 dark:border-[#E2694A]/30 rounded-xl p-6 shadow-sm">
            <h3 className="font-serif text-xl text-[#BC4128] dark:text-[#E2694A] mb-4 border-b border-[#BC4128]/20 dark:border-[#E2694A]/20 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-current flex-none" />
              The "Sell-the-News" Dynamic
            </h3>
            <p>
              Due to extreme float scarcity, professional managers who front-ran the Nasdaq-100 passive inflows aggressively dumped shares into the forced institutional demand, causing a 6% drop on its first day as an index member. Without S&P 500 index funds to absorb the impending insider lock-up expirations, the stock faces severe exposure to downward repricing. Fundamental models place fair value closer to $60/share.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Systemic Consequences: Aerospace & Defense
          </h2>
          <p className="mb-8">
            The extreme, asymmetric dependency on SpaceX's vertical architecture.
          </p>
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-serif text-[#A8672E] dark:text-[#D08F52] mb-2">The NASA Bottleneck</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Following the Starliner Crisis, SpaceX is the singular provider for US human spaceflight.</p>
              <p className="mb-4">
                NASA's Commercial Crew Program was designed for redundancy (SpaceX & Boeing). However, the June 2024 Boeing Starliner (CFT) mission suffered severe anomalies (helium leaks, thruster failures), stranding astronauts for 286 days.
              </p>
              <p>
                With Starliner classified as a Type A mishap and demoted to uncrewed cargo flights until at least 2027, <strong>Crew Dragon is the only operational vehicle</strong>. A SpaceX grounding means abandoning the ISS or relying on Russia. Furthermore, the Artemis lunar return relies entirely on the delayed Starship Human Landing System, which currently faces 50% payload underperformance and unresolved cryogenic transfer challenges.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-[#BC4128]/30 dark:border-[#E2694A]/30 shadow-sm">
              <h3 className="text-xl font-serif text-[#BC4128] dark:text-[#E2694A] mb-2">National Security Launch</h3>
              <p className="text-sm text-[#BC4128]/70 dark:text-[#E2694A]/70 mb-4">The Pentagon's NSSL program is effectively paralyzed without Falcon 9/Heavy.</p>
              <p className="mb-4">
                Under the NSSL program, the Pentagon relies on SpaceX and ULA. However, ULA's next-generation Vulcan Centaur rocket suffered a structural nozzle defect on its SRB during the February 2026 USSF-87 mission.
              </p>
              <p>
                The subsequent indefinite grounding of the Vulcan fleet has thrown the national security launch manifest into chaos, delaying critical assets like GPS III and early warning satellites. SpaceX currently operates a <strong>de facto monopoly</strong> on US heavy-lift launch capabilities. A failure here constitutes a top-tier national security crisis.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            Constellation Economics & Strategic Stability
          </h2>
          <p className="mb-8">
            Starlink governs the invisible infrastructure of global data flows.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-900 border border-[#BC4128]/30 dark:border-[#E2694A]/30 rounded-xl p-6 shadow-sm">
              <h3 className="font-serif text-xl text-[#BC4128] dark:text-[#E2694A] mb-4 border-b border-[#BC4128]/20 dark:border-[#E2694A]/20 pb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current flex-none" />
                Programmable Fragility
              </h3>
              <p className="mb-4">
                Starlink operates 8,100+ active satellites for 10.3M subscribers. While physically robust, it relies on a centralized terrestrial control plane. A single flawed software update (like the July 2025 event causing an 84% global drop) or space weather (Sept 2025 CME) can collapse the network.
              </p>
              <p>
                Sovereign nations now suffer <strong>"digital sovereignty exposure,"</strong> relying on a private, extra-regulatory entity for critical maritime, aviation, and defense communications.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 border border-[#BC4128]/30 dark:border-[#E2694A]/30 rounded-xl p-6 shadow-sm">
              <h3 className="font-serif text-xl text-[#BC4128] dark:text-[#E2694A] mb-4 border-b border-[#BC4128]/20 dark:border-[#E2694A]/20 pb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-current flex-none" />
                Autonomous Warfare
              </h3>
              <p className="mb-4">
                The US military relies on Starlink/Starshield to command next-gen autonomous drone fleets. During 2025 Navy tests, outages left unmanned surface vessels uncontrollable.
              </p>
              <p>
                Furthermore, the dual-use nature of Starlink creates a "security dilemma" for near-peer adversaries (like the PLA), potentially triggering asymmetric anti-satellite countermeasures. A corporate collapse directly compromises the US early warning and target-tracking architecture (SB-AMTI).
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-[#BC4128]/30 dark:border-[#E2694A]/30 shadow-sm">
            <h3 className="text-xl font-serif text-[#BC4128] dark:text-[#E2694A] mb-6 text-center">Modeled Economic Damage of a 24-Hour Outage (2032 Est: $36B – $60B)</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {economicImpactData.map((tier, idx) => (
                <div key={idx} className={`p-5 rounded-xl border ${tier.color}`}>
                  <h4 className="font-serif text-lg font-bold mb-2">{tier.tier}</h4>
                  <p className="text-sm">{tier.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
