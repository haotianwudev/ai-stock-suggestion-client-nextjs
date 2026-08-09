'use client';

import React from 'react';
import { Leaf, Users, Scale, BarChart3, AlertTriangle, Globe, TrendingUp, ShieldCheck, BookOpen, Info, CheckCircle, XCircle, FileText, Target, Zap, Activity, Filter, PieChart, Megaphone, Thermometer, Droplets, Trees, Briefcase, HeartHandshake, Smartphone, Gavel, Vote, Lock, Landmark, Calendar, Database, Layers, Search, Cpu, Maximize2, Music } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard, FormulaPanel } from '@/components/articles/article-visuals';

// --- Shared Components ---
const MetricBox = ({ label, value, desc, icon: Icon, color = "text-slate-500 dark:text-slate-400" }: { label: string, value: string, desc: string, icon?: any, color?: string }) => (
  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
    <div className="flex justify-between items-start mb-1">
      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider">{label}</div>
      {Icon && <Icon size={16} className={color} />}
    </div>
    <div className="text-slate-900 dark:text-white font-bold mb-2">{value}</div>
    <div className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{desc}</div>
  </div>
);

const Badge = ({ text, color }: { text: string, color: string }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${color}`}>
    {text}
  </span>
);

export default function ESGTutorial() {
  return (
    <ArticleFrame slug="mechanics-esg-investing-technical-guide">
      <div className="pb-24">
        <InfographicSlot alt="ESG Investing Framework Infographic" />

        <main className="max-w-4xl mx-auto py-16 px-6 lg:px-8 space-y-24">
          
          {/* 1. Introduction */}
          <section>
            <p className="text-xl font-light leading-relaxed text-slate-800 dark:text-slate-200">
              ESG is not merely a label for "ethical" companies; it is a data-driven discipline that evaluates risks and opportunities unaccounted for in traditional financial statements.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Old Paradigm (CSR)</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Corporate Social Responsibility. Qualitative, philanthropic, detached from the core business model. "How we spend our profits."
                </p>
              </div>
              <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-lg shadow-sm">
                <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">New Paradigm (ESG)</h4>
                <p className="text-sm text-indigo-800 dark:text-indigo-400">
                  Environmental, Social, Governance. Quantitative, integrated into strategy, financially material. "How we make our profits."
                </p>
              </div>
            </div>
          </section>

          {/* 2. The Pillars Deep Dive */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-emerald-600 dark:text-emerald-500">
                <Leaf size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">The ESG Pillars: Metrics & KPIs</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">Deep dive into the specific data points, accounting methodologies, and risk factors analysts use to calculate scores.</p>
            </div>

            <div className="space-y-16">
              
              {/* Environmental Pillar */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500">
                      <Leaf size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-serif">Environmental (E): Stewardship & Climate Risk</h3>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">Assessing a company's interaction with the physical world through Carbon, Water, and Biodiversity lenses.</p>
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-slate-200 dark:bg-slate-800 mb-8" />
                  
                  <div className="space-y-10">
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-400 mb-4 text-lg">
                        <Thermometer size={20} /> Climate Change: Risk Types
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                          <strong className="block text-emerald-900 dark:text-emerald-300 mb-2">Physical Risk</strong>
                          <p className="text-sm text-emerald-800 dark:text-emerald-400/80 mb-3">Direct damage to assets from weather events.</p>
                          <ul className="text-sm text-emerald-700 dark:text-emerald-500 list-disc list-inside space-y-1">
                            <li><strong>Acute:</strong> Floods, hurricanes disrupting factories.</li>
                            <li><strong>Chronic:</strong> Rising sea levels affecting real estate value.</li>
                          </ul>
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                          <strong className="block text-emerald-900 dark:text-emerald-300 mb-2">Transition Risk</strong>
                          <p className="text-sm text-emerald-800 dark:text-emerald-400/80 mb-3">Financial loss from moving to a low-carbon economy.</p>
                          <ul className="text-sm text-emerald-700 dark:text-emerald-500 list-disc list-inside space-y-1">
                            <li><strong>Policy:</strong> Carbon taxes, bans on ICE vehicles.</li>
                            <li><strong>Market:</strong> "Stranded Assets" (coal reserves becoming worthless).</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">The GHG Protocol (Carbon Accounting)</h4>
                      <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                          <div className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-1 rounded text-xs w-16 text-center mt-1">Scope 1</div>
                          <div>
                            <strong className="block text-slate-800 dark:text-slate-200 text-sm mb-1">Direct Emissions</strong>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Company facilities (smoke stacks) and company vehicles. <span className="italic text-slate-500">Easiest to control.</span></p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-1 rounded text-xs w-16 text-center mt-1">Scope 2</div>
                          <div>
                            <strong className="block text-slate-800 dark:text-slate-200 text-sm mb-1">Indirect Energy</strong>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Purchased electricity, steam, heating & cooling. <span className="italic text-slate-500">Mitigated by buying renewable energy certificates (RECs).</span></p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-1 rounded text-xs w-16 text-center mt-1">Scope 3</div>
                          <div>
                            <strong className="block text-slate-800 dark:text-slate-200 text-sm mb-1">Value Chain (Upstream & Downstream)</strong>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Purchased goods (embedded carbon in steel/cement), business travel, use of sold products. <span className="italic text-slate-500">Often &gt;80% of footprint.</span></p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 text-sm uppercase tracking-wide">Key Environmental Metrics</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MetricBox icon={Thermometer} color="text-red-500" label="Carbon Intensity" value="tCO2e / $M Rev" desc="Standardizes footprint by revenue for comparison." />
                        <MetricBox icon={Droplets} color="text-blue-500" label="Water Intensity" value="m³ / $M Rev" desc="Critical for Semiconductor & Beverage sectors." />
                        <MetricBox icon={Trees} color="text-emerald-600" label="Biodiversity" value="Land Use %" desc="Ops in protected areas (TNFD framework)." />
                        <MetricBox icon={Zap} color="text-yellow-500" label="Green Revenue" value="%" desc="% of revenue derived from sustainable products." />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Pillar */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-serif">Social (S): Human Capital & Stakeholders</h3>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">Quantifying the 'S' is notoriously difficult, focusing on workforce stability, safety, and community license to operate.</p>
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-slate-200 dark:bg-slate-800 mb-8" />
                  
                  <div className="space-y-10">
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-indigo-800 dark:text-indigo-400 mb-4 text-lg">
                        <Briefcase size={20} /> Human Capital Management (Internal)
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Employees are assets, not just costs. High turnover signals poor culture and leads to high retraining costs and operational drag.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <MetricBox icon={Users} label="Turnover Rate" value="%" desc="Voluntary vs. Involuntary. Compare to industry avg." />
                        <MetricBox icon={Activity} label="LTIR / TRIR" value="Rate" desc="Lost Time Injury Rate. Safety proxy for heavy industry." />
                        <MetricBox icon={PieChart} label="Diversity" value="% Mgmt" desc="% of Women/Minorities in management roles." />
                      </div>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-indigo-800 dark:text-indigo-400 mb-4 text-lg">
                        <HeartHandshake size={20} /> Stakeholder Management (External)
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                          <strong className="block text-indigo-900 dark:text-indigo-300 mb-3 flex items-center gap-2">
                            <Smartphone size={16}/> Product Liability
                          </strong>
                          <ul className="text-sm text-indigo-800 dark:text-indigo-400/80 space-y-2">
                            <li><strong>Data Privacy:</strong> GDPR/CCPA fines, data breaches (Tech/Banks).</li>
                            <li><strong>Product Safety:</strong> Recalls per year (Auto/Pharma).</li>
                            <li><strong>Access:</strong> Pricing schemes for low-income markets (Pharma).</li>
                          </ul>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                          <strong className="block text-indigo-900 dark:text-indigo-300 mb-3 flex items-center gap-2">
                            <Globe size={16}/> Supply Chain
                          </strong>
                          <ul className="text-sm text-indigo-800 dark:text-indigo-400/80 space-y-2">
                            <li><strong>Modern Slavery:</strong> Audits of Tier 1 & Tier 2 suppliers.</li>
                            <li><strong>Conflict Minerals:</strong> Tracing 3TG (Tantalum, Tin, Tungsten, Gold).</li>
                            <li><strong>Responsible Sourcing:</strong> % of raw materials certified.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Governance Pillar */}
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      <Scale size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-serif">Governance (G): Structure & Rights</h3>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">The 'Quality' factor. Strong governance correlates most consistently with long-term financial outperformance and lower volatility.</p>
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-slate-200 dark:bg-slate-800 mb-8" />
                  
                  <div className="space-y-10">
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 mb-4 text-lg">
                        <Gavel size={20} /> Board Composition & Effectiveness
                      </h4>
                      <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 grid md:grid-cols-2 gap-6">
                        <div>
                          <strong className="text-sm text-slate-900 dark:text-white">Independence</strong>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            A board packed with the CEO's friends cannot provide oversight. Directors &gt;10 years tenure are often deemed "non-independent."
                          </p>
                        </div>
                        <div>
                          <strong className="text-sm text-slate-900 dark:text-white">Separation of Roles</strong>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Ideally, the CEO and the Chairman should be different people. When combined, the CEO effectively checks their own homework.
                          </p>
                        </div>
                        <div>
                          <strong className="text-sm text-slate-900 dark:text-white">Diversity of Expertise</strong>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Does the board include experts in Cyber, Climate, or just Finance? (e.g., Exxon vs. Engine No. 1).
                          </p>
                        </div>
                        <div>
                          <strong className="text-sm text-slate-900 dark:text-white">Overboarding</strong>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Directors sitting on &gt;4 public boards may not have time to react to a crisis.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 mb-4 text-sm uppercase">
                          <Vote size={18} /> Shareholder Rights
                        </h4>
                        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                          <li className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                            <span>One Share, One Vote</span>
                            <span className="text-emerald-600 dark:text-emerald-500 font-bold">Good</span>
                          </li>
                          <li className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                            <span>Dual Class Structures</span>
                            <span className="text-red-500 font-bold">Bad</span>
                          </li>
                          <li className="text-xs text-slate-500 italic mt-2">
                            (Dual class allows founders to control voting power disproportionate to their economic stake).
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 mb-4 text-sm uppercase">
                          <Lock size={18} /> Compensation & Ethics
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          <MetricBox label="Clawbacks" value="Policy" desc="Ability to reclaim bonuses after misconduct." />
                          <MetricBox label="Pay Ratio" value="CEO:Median" desc="High ratios (e.g., 300:1) can signal excess." />
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 p-5 rounded-xl">
                      <strong className="text-red-800 dark:text-red-400 text-sm block mb-3">Governance Red Flags to Watch:</strong>
                      <div className="flex flex-wrap gap-2">
                        <Badge text="Poison Pills" color="bg-white dark:bg-slate-900 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50" />
                        <Badge text="Staggered Boards" color="bg-white dark:bg-slate-900 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50" />
                        <Badge text="Related Party Txns" color="bg-white dark:bg-slate-900 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50" />
                        <Badge text="Qualified Audit Opinions" color="bg-white dark:bg-slate-900 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 3. Frameworks & Regulations */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-500">
                <Landmark size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">Frameworks & Regulations</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">The shift from voluntary 'Alphabet Soup' to mandatory legal compliance.</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-6 rounded-r-xl mb-12">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-serif">The Great Consolidation</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                For 20 years, companies reported voluntarily using confusing, overlapping standards (GRI, SASB, TCFD, CDP). We are now entering the era of <strong>Mandatory Reporting</strong>. The voluntary frameworks are merging into global baselines (ISSB), while governments (EU, CA, US) are passing hard laws requiring audit-grade data.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 font-serif">
                <Scale size={24} className="text-slate-500"/> The Core Debate: Materiality
              </h3>
              
              <ComparisonGrid
                items={[
                  {
                    title: "Single Materiality (Financial)",
                    description: "Focus is on investor protection and enterprise value. \"How does climate change hurt the company's bottom line?\"",
                    details: [
                      "Prioritizes financial risk",
                      "Target audience: Investors",
                      "US / Global Approach",
                      "Champions: ISSB, SASB, SEC"
                    ]
                  },
                  {
                    title: "Double Materiality (Impact)",
                    description: "Two-way street: \"How does the company hurt the planet?\" Considers impacts regardless of immediate financial hit.",
                    details: [
                      "Prioritizes stakeholder impact",
                      "Target audience: Society at large",
                      "European Approach",
                      "Champions: EU (CSRD), GRI"
                    ]
                  }
                ]}
              />
            </div>

            <div className="space-y-8">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <Globe className="text-emerald-600 dark:text-emerald-400" size={24} />
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">The European Engine (The Gold Standard)</h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 dark:text-slate-400 mb-6">The EU has the most advanced and comprehensive sustainable finance laws in the world.</p>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">CSRD (Reporting)</strong>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-2 block">Corporate Sustainability Reporting Directive</span>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Replaces the NFRD. Requires ~50,000 companies to report over 1,000 data points. Mandatory independent audit of ESG data.
                      </p>
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white block mb-1">SFDR (Investing)</strong>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-2 block">Sustainable Finance Disclosure Reg</span>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Labels for Investment Funds to prevent greenwashing:</p>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                        <li><strong>Art. 6:</strong> Grey (Standard).</li>
                        <li><strong>Art. 8:</strong> Light Green (Promotes E/S).</li>
                        <li><strong>Art. 9:</strong> Dark Green (100% Sustainable).</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <strong className="text-slate-900 dark:text-white block mb-2">The EU Taxonomy</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      A strict dictionary defining what counts as "Green." To be "Taxonomy Aligned," a company must make a substantial contribution to climate goals without harming others (DNSH).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <FileText className="text-blue-600 dark:text-blue-400" size={24} />
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">The Global Baseline: ISSB</h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Created by the IFRS Foundation. The ISSB has absorbed SASB and TCFD to consolidate the 'Alphabet Soup'.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                      <strong className="text-blue-600 dark:text-blue-400 block text-lg font-serif">IFRS S1</strong>
                      <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">General Requirements</span>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
                        Requires companies to disclose sustainability-related risks and opportunities that could affect cash flows.
                      </p>
                    </div>
                    <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                      <strong className="text-blue-600 dark:text-blue-400 block text-lg font-serif">IFRS S2</strong>
                      <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Climate Disclosures</span>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
                        Mandates Scope 1, 2, and 3 reporting + climate scenario analysis. Based heavily on TCFD.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 4. Measurement & Divergence */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-indigo-600 dark:text-indigo-500">
                <BarChart3 size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">Measuring ESG: The Data Challenge</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">Unlike credit ratings (0.99 correlation), ESG ratings often disagree (0.30 - 0.70 correlation).</p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 p-6 rounded-xl mb-12">
              <h3 className="text-xl font-bold text-amber-900 dark:text-amber-400 mb-3 flex items-center gap-2">
                <AlertTriangle size={24} /> The Problem of "Aggregate Confusion"
              </h3>
              <p className="text-amber-800 dark:text-amber-200/80 mb-6">
                If you ask Moody's and S&P "Is this company likely to go bankrupt?", they agree 99% of the time. If you ask MSCI and Sustainalytics "Is this company 'Green'?", they might give completely opposite answers. This divergence comes from:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/60 dark:bg-black/20 p-4 rounded-lg">
                  <strong className="block text-amber-900 dark:text-amber-300 mb-1">1. Scope (What?)</strong>
                  <p className="text-sm text-amber-800 dark:text-amber-200/80">One agency includes Lobbying, another ignores it.</p>
                </div>
                <div className="bg-white/60 dark:bg-black/20 p-4 rounded-lg">
                  <strong className="block text-amber-900 dark:text-amber-300 mb-1">2. Weight (How Much?)</strong>
                  <p className="text-sm text-amber-800 dark:text-amber-200/80">Agencies assign different weights to the same issue.</p>
                </div>
                <div className="bg-white/60 dark:bg-black/20 p-4 rounded-lg">
                  <strong className="block text-amber-900 dark:text-amber-300 mb-1">3. Measurement (How?)</strong>
                  <p className="text-sm text-amber-800 dark:text-amber-200/80">Number of lawsuits vs. Total $ fines paid.</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Database size={24} className="text-slate-500" />The ESG Data Supply Chain
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Step 1</div>
                  <div className="font-bold text-slate-900 dark:text-white mb-2">Corporate Disclosure</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">CSR Reports, 10-Ks. (Self-reported, often biased).</p>
                  <div className="hidden md:block absolute -right-4 top-1/2 -mt-2 z-10 text-slate-300 dark:text-slate-700">&rarr;</div>
                </div>
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Step 2</div>
                  <div className="font-bold text-slate-900 dark:text-white mb-2">Alternative Data</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">News scraping, NGO reports, satellite imagery.</p>
                  <div className="hidden md:block absolute -right-4 top-1/2 -mt-2 z-10 text-slate-300 dark:text-slate-700">&rarr;</div>
                </div>
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Step 3</div>
                  <div className="font-bold text-slate-900 dark:text-white mb-2">AI & Estimation</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Filling gaps via algorithms if a company doesn't report data.</p>
                  <div className="hidden md:block absolute -right-4 top-1/2 -mt-2 z-10 text-slate-300 dark:text-slate-700">&rarr;</div>
                </div>
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Step 4</div>
                  <div className="font-bold text-slate-900 dark:text-white mb-2">Final Rating</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Normalization against peers to produce AAA or Risk Score.</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-6">Agency Methodology Showdown</h3>
              <ComparisonGrid
                items={[
                  {
                    title: "MSCI ESG Ratings",
                    description: "Relative (Best-in-Class): Measures resilience relative to industry peers.",
                    details: [
                      "Scoring: AAA to CCC",
                      "Interpretation: Ranking",
                      "Can score an oil company AAA if best in peers"
                    ]
                  },
                  {
                    title: "Sustainalytics",
                    description: "Absolute Risk: Measures unmanaged ESG risk magnitude.",
                    details: [
                      "Scoring: 0 (Negligible) to 100 (Severe)",
                      "Interpretation: Absolute",
                      "Oil company is High Risk due to exposure"
                    ]
                  }
                ]}
              />
            </div>
          </section>

          <div className="w-full border-t border-slate-200 dark:border-slate-800" />

          {/* 5. Strategies */}
          <section>
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3 mb-4 text-purple-600 dark:text-purple-500">
                <Target size={32} strokeWidth={1.5} />
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-slate-900 dark:text-white">Investment Strategies: A Spectrum</h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">Capital allocation varies from simple exclusion to proactive impact generation.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <ComparisonCard
                title="1. Negative Screening"
                tone="neg"
                items={[
                  "Oldest form of responsible investing",
                  "Blanket removal of entire industries",
                  "Increases Tracking Error vs benchmark"
                ]}
              />
              <ComparisonCard
                title="2. ESG Integration"
                tone="pos"
                items={[
                  "Systematic inclusion in financial models",
                  "Adjusts fair value via Cash Flows & WACC",
                  "Pricing risks, not excluding companies"
                ]}
              />
              <ComparisonCard
                title="3. Thematic Investing"
                tone="neutral"
                items={[
                  "Targeting structural growth trends",
                  "Narrow bets (Clean Energy, Water)",
                  "Highly volatile, sensitive to policy"
                ]}
              />
              <ComparisonCard
                title="4. Impact Investing"
                tone="pos"
                items={[
                  "The Double Bottom Line",
                  "Requires Additionality & Measurability",
                  "Common in Private Equity & Green Bonds"
                ]}
              />
            </div>
            
            <div className="mt-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Megaphone className="text-teal-600 dark:text-teal-400" size={24} />
                <h4 className="font-bold text-slate-900 dark:text-white text-lg font-serif">5. Active Stewardship (Engagement)</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Using shareholder rights to influence company behavior rather than divesting ("Voice vs. Exit").
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <strong className="text-slate-900 dark:text-white text-sm block mb-1">Proxy Voting</strong>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Voting on shareholder resolutions and director elections.</p>
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-white text-sm block mb-1">Engagement</strong>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Direct meetings with Board to set specific ESG targets.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Summary */}
          <footer className="mt-16 bg-slate-900 dark:bg-black rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-2xl font-bold mb-6 font-serif">Summary Checklist</h2>
            <ul className="space-y-4 mb-8">
              {[
                "Identify Materiality: Does the ESG factor actually impact the specific industry?",
                "Check the Framework: Is the data reported via SASB (financial) or GRI (impact)?",
                "Analyze Momentum: 'Improvers' often outperform current 'Leaders'.",
                "Watch the Governance: Strong 'G' is the best predictor of downside protection.",
                "Beware of Greenwashing: Demand audited data and interim targets, not just 2050 pledges."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="flex-shrink-0 text-emerald-400 mt-0.5" size={20} />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </footer>

        </main>
      </div>
    </ArticleFrame>
  );
}