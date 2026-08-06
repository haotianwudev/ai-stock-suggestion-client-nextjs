'use client';

import React from 'react';
import { Leaf, Users, Scale, BarChart3, AlertTriangle, Globe, TrendingUp, ShieldCheck, BookOpen, Info, CheckCircle, XCircle, FileText, Target, Zap, Activity, Filter, PieChart, Megaphone, Thermometer, Droplets, Trees, Briefcase, HeartHandshake, Smartphone, Gavel, Vote, Lock, Landmark, Calendar, Database, Layers, Search, Cpu, Maximize2, Music } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Component Interfaces ---
interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  colorClass: string;
}

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

interface DetailCardProps {
  title: string;
  preview: string;
  details: React.ReactNode;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  colorClass: string;
}

interface FeatureListProps {
  items: string[];
}

interface MetricBoxProps {
  label: string;
  value: string;
  desc: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  color?: string;
}

interface BadgeProps {
  text: string;
  color: string;
}

// --- Components ---
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon: Icon, colorClass }) => (
  <div className="mb-8 border-b-2 border-opacity-20 border-gray-400 pb-4">
    <div className={`flex items-center gap-3 mb-2 ${colorClass}`}>
      {Icon && <Icon size={32} strokeWidth={1.5} />}
      <h2 className="text-3xl font-bold tracking-tight text-gray-800">{title}</h2>
    </div>
    <p className="text-lg text-gray-600 max-w-3xl">{subtitle}</p>
  </div>
);

const Card: React.FC<CardProps> = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300 ${className}`}>
    {title && <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>}
    <div className="text-gray-600 leading-relaxed">{children}</div>
  </div>
);

const DetailCard: React.FC<DetailCardProps> = ({ title, preview, details, icon: Icon, colorClass }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 hover:shadow-md transition-shadow duration-300">
      <div className="p-6 pb-2 flex items-start gap-4">
        <div className={`p-3 rounded-lg bg-opacity-10 flex-shrink-0 ${colorClass.replace('text-', 'bg-')} ${colorClass}`}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 font-medium leading-relaxed">{preview}</p>
        </div>
      </div>
      <div className="px-6 pb-6 pt-2 pl-0 md:pl-[4.5rem]">
        <div className="h-px w-full bg-gray-100 mb-4"></div>
        <div className="text-gray-700 space-y-3">{details}</div>
      </div>
    </div>
  );
};

const ComparisonTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-200">
          <th className="p-4 text-sm font-bold text-gray-500 uppercase">Feature</th>
          <th className="p-4 text-sm font-bold text-indigo-600 uppercase">MSCI ESG Ratings</th>
          <th className="p-4 text-sm font-bold text-orange-600 uppercase">Sustainalytics Risk</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        <tr>
          <td className="p-4 font-medium text-gray-900">Core Philosophy</td>
          <td className="p-4 text-gray-600"><strong>Relative (Best-in-Class):</strong> Measures resilience relative to industry peers.</td>
          <td className="p-4 text-gray-600"><strong>Absolute Risk:</strong> Measures unmanaged ESG risk magnitude.</td>
        </tr>
        <tr>
          <td className="p-4 font-medium text-gray-900">Scoring Scale</td>
          <td className="p-4 text-gray-600">
            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-bold">AAA</span> to <span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-bold">CCC</span>
          </td>
          <td className="p-4 text-gray-600">0 (Negligible) to 100 (Severe). <em>Lower is better.</em></td>
        </tr>
        <tr>
          <td className="p-4 font-medium text-gray-900">Output Interpretation</td>
          <td className="p-4 text-gray-600">Ranking. An oil company can be AAA if it's better than other oil companies.</td>
          <td className="p-4 text-gray-600">Absolute. An oil company is likely High Risk due to inherent exposure.</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const FeatureList: React.FC<FeatureListProps> = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-3">
        <CheckCircle className="flex-shrink-0 text-emerald-500 mt-1" size={18} />
        <span className="text-gray-700">{item}</span>
      </li>
    ))}
  </ul>
);

const MetricBox: React.FC<MetricBoxProps> = ({ label, value, desc, icon: Icon, color = "text-gray-500" }) => (
  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
    <div className="flex justify-between items-start mb-1">
      <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{label}</div>
      {Icon && <Icon size={16} className={color} />}
    </div>
    <div className="text-gray-900 font-bold mb-2">{value}</div>
    <div className="text-xs text-gray-600 leading-snug">{desc}</div>
  </div>
);

const Badge: React.FC<BadgeProps> = ({ text, color }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${color}`}>
    {text}
  </span>
);

export default function ESGTutorial() {
  return (
    <ArticleFrame slug="mechanics-esg-investing-technical-guide">
      <InfographicSlot alt="ESG Investing Framework Infographic" />
      <main className="max-w-4xl mx-auto px-6 pb-20 pt-12 space-y-24">
          {/* 1. Introduction */}
          <section>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="text-xl font-light leading-relaxed text-gray-800">
                ESG is not merely a label for "ethical" companies; it is a data-driven discipline that evaluates risks and opportunities unaccounted for in traditional financial statements.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">Old Paradigm (CSR)</h4>
                  <p className="text-sm text-gray-600">
                    Corporate Social Responsibility. Qualitative, philanthropic, detached from the core business model. "How we spend our profits."
                  </p>
                </div>
                <div className="p-6 bg-indigo-50 border border-indigo-200 rounded-lg shadow-sm">
                  <h4 className="font-bold text-indigo-900 mb-2">New Paradigm (ESG)</h4>
                  <p className="text-sm text-indigo-800">
                    Environmental, Social, Governance. Quantitative, integrated into strategy, financially material. "How we make our profits."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. The Pillars Deep Dive */}
          <section>
            <SectionHeader 
              title="The ESG Pillars: Metrics & KPIs" 
              subtitle="Deep dive into the specific data points, accounting methodologies, and risk factors analysts use to calculate scores."
              icon={Leaf}
              colorClass="text-teal-600"
            />
            <div className="grid md:grid-cols-1 gap-8">
              {/* Environmental Pillar */}
              <DetailCard 
                title="Environmental (E): Stewardship & Climate Risk" 
                preview="Assessing a company's interaction with the physical world through Carbon, Water, and Biodiversity lenses."
                icon={Leaf}
                colorClass="text-teal-600"
                details={
                  <div className="space-y-8">
                    {/* Climate Change Section */}
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-teal-800 mb-4 text-lg">
                        <Thermometer size={20} /> Climate Change: Risk Types
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                          <strong className="block text-teal-900 mb-1">Physical Risk</strong>
                          <p className="text-sm text-teal-800">Direct damage to assets from weather events.</p>
                          <ul className="text-xs text-teal-700 mt-2 list-disc list-inside">
                            <li><strong>Acute:</strong> Floods, hurricanes disrupting factories.</li>
                            <li><strong>Chronic:</strong> Rising sea levels affecting real estate value.</li>
                          </ul>
                        </div>
                        <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                          <strong className="block text-teal-900 mb-1">Transition Risk</strong>
                          <p className="text-sm text-teal-800">Financial loss from moving to a low-carbon economy.</p>
                          <ul className="text-xs text-teal-700 mt-2 list-disc list-inside">
                            <li><strong>Policy:</strong> Carbon taxes, bans on ICE vehicles.</li>
                            <li><strong>Market:</strong> "Stranded Assets" (coal reserves becoming worthless).</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Carbon Scopes Section */}
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">The GHG Protocol (Carbon Accounting)</h4>
                      <div className="space-y-4">
                        <div className="flex gap-4 items-start">
                          <div className="bg-teal-100 text-teal-800 font-bold px-2 py-1 rounded text-xs w-16 text-center mt-1">Scope 1</div>
                          <div>
                            <strong className="block text-gray-800 text-sm">Direct Emissions</strong>
                            <p className="text-xs text-gray-600">Company facilities (smoke stacks) and company vehicles. <span className="italic">Easiest to control.</span></p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="bg-teal-100 text-teal-800 font-bold px-2 py-1 rounded text-xs w-16 text-center mt-1">Scope 2</div>
                          <div>
                            <strong className="block text-gray-800 text-sm">Indirect Energy</strong>
                            <p className="text-xs text-gray-600">Purchased electricity, steam, heating & cooling. <span className="italic">Mitigated by buying renewable energy certificates (RECs).</span></p>
                          </div>
                        </div>
                        <div className="flex gap-4 items-start">
                          <div className="bg-teal-100 text-teal-800 font-bold px-2 py-1 rounded text-xs w-16 text-center mt-1">Scope 3</div>
                          <div>
                            <strong className="block text-gray-800 text-sm">Value Chain (Upstream & Downstream)</strong>
                            <p className="text-xs text-gray-600">Purchased goods (embedded carbon in steel/cement), business travel, use of sold products (gas burnt in cars sold by Ford). <span className="italic">Often &gt;80% of footprint.</span></p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Key Environmental Metrics</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <MetricBox 
                          icon={Thermometer} 
                          color="text-red-500" 
                          label="Carbon Intensity" 
                          value="tCO2e / $M Rev" 
                          desc="Standardizes footprint by revenue for comparison." 
                        />
                        <MetricBox 
                          icon={Droplets} 
                          color="text-blue-500" 
                          label="Water Intensity" 
                          value="m³ / $M Rev" 
                          desc="Critical for Semiconductor & Beverage sectors." 
                        />
                        <MetricBox 
                          icon={Trees} 
                          color="text-green-600" 
                          label="Biodiversity" 
                          value="Land Use %" 
                          desc="Ops in protected areas (TNFD framework)." 
                        />
                        <MetricBox 
                          icon={Zap} 
                          color="text-yellow-500" 
                          label="Green Revenue" 
                          value="%" 
                          desc="% of revenue derived from sustainable products (EU Taxonomy)." 
                        />
                      </div>
                    </div>
                  </div>
                }
              />

              {/* Social Pillar */}
              <DetailCard 
                title="Social (S): Human Capital & Stakeholders" 
                preview="Quantifying the 'S' is notoriously difficult, focusing on workforce stability, safety, and community license to operate."
                icon={Users}
                colorClass="text-indigo-600"
                details={
                  <div className="space-y-8">
                    {/* Human Capital Section */}
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-indigo-800 mb-4 text-lg">
                        <Briefcase size={20} /> Human Capital Management (Internal)
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Employees are assets, not just costs. High turnover signals poor culture and leads to high retraining costs and operational drag.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <MetricBox 
                          icon={Users} 
                          label="Turnover Rate" 
                          value="%" 
                          desc="Voluntary vs. Involuntary. Compare to industry avg." 
                        />
                        <MetricBox 
                          icon={Activity} 
                          label="LTIR / TRIR" 
                          value="Rate" 
                          desc="Lost Time Injury Rate. Safety proxy for heavy industry." 
                        />
                        <MetricBox 
                          icon={PieChart} 
                          label="Diversity" 
                          value="% Mgmt" 
                          desc="% of Women/Minorities in management roles." 
                        />
                      </div>
                    </div>

                    {/* External Stakeholders Section */}
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-indigo-800 mb-4 text-lg">
                        <HeartHandshake size={20} /> Stakeholder Management (External)
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                          <strong className="block text-indigo-900 mb-1 flex items-center gap-2">
                            <Smartphone size={16}/> Product Liability
                          </strong>
                          <ul className="text-xs text-indigo-800 space-y-2 mt-2">
                            <li><strong>Data Privacy:</strong> GDPR/CCPA fines, number of data breaches (Tech/Banks).</li>
                            <li><strong>Product Safety:</strong> Recalls per year (Auto/Pharma).</li>
                            <li><strong>Access:</strong> Pricing schemes for low-income markets (Pharma).</li>
                          </ul>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                          <strong className="block text-indigo-900 mb-1 flex items-center gap-2">
                            <Globe size={16}/> Supply Chain
                          </strong>
                          <ul className="text-xs text-indigo-800 space-y-2 mt-2">
                            <li><strong>Modern Slavery:</strong> Audits of Tier 1 & Tier 2 suppliers.</li>
                            <li><strong>Conflict Minerals:</strong> Tracing 3TG (Tantalum, Tin, Tungsten, Gold).</li>
                            <li><strong>Responsible Sourcing:</strong> % of raw materials certified (e.g., RSPO Palm Oil).</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />

              {/* Governance Pillar */}
              <DetailCard 
                title="Governance (G): Structure & Rights" 
                preview="The 'Quality' factor. Strong governance correlates most consistently with long-term financial outperformance and lower volatility."
                icon={Scale}
                colorClass="text-slate-600"
                details={
                  <div className="space-y-8">
                    {/* Board Structure */}
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 text-lg">
                        <Gavel size={20} /> Board Composition & Effectiveness
                      </h4>
                      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 grid md:grid-cols-2 gap-6">
                        <div>
                          <strong className="text-sm text-slate-900">Independence</strong>
                          <p className="text-xs text-gray-600 mt-1">
                            A board packed with the CEO's friends cannot provide oversight. Directors &gt;10 years tenure are often deemed "non-independent."
                          </p>
                        </div>
                        <div>
                          <strong className="text-sm text-slate-900">Separation of Roles</strong>
                          <p className="text-xs text-gray-600 mt-1">
                            Ideally, the CEO and the Chairman should be different people. When combined, the CEO effectively checks their own homework.
                          </p>
                        </div>
                        <div>
                          <strong className="text-sm text-slate-900">Diversity of Expertise</strong>
                          <p className="text-xs text-gray-600 mt-1">
                            Does the board include experts in Cyber, Climate, or just Finance? (e.g., Exxon vs. Engine No. 1).
                          </p>
                        </div>
                        <div>
                          <strong className="text-sm text-slate-900">Overboarding</strong>
                          <p className="text-xs text-gray-600 mt-1">
                            Directors sitting on &gt;4 public boards may not have time to react to a crisis.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Shareholder Rights */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-sm uppercase">
                          <Vote size={18} /> Shareholder Rights
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-2 bg-white border border-gray-200 p-4 rounded-lg">
                          <li className="flex justify-between">
                            <span>One Share, One Vote</span>
                            <span className="text-green-600 font-bold">Good</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Dual Class Structures</span>
                            <span className="text-red-500 font-bold">Bad</span>
                          </li>
                          <li className="text-xs text-gray-500 italic mt-1">
                            (Dual class allows founders to control voting power disproportionate to their economic stake, e.g., Meta/Google).
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-sm uppercase">
                          <Lock size={18} /> Compensation & Ethics
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <MetricBox 
                            label="Clawbacks" 
                            value="Policy" 
                            desc="Ability to reclaim bonuses after misconduct." 
                          />
                          <MetricBox 
                            label="Pay Ratio" 
                            value="CEO:Median" 
                            desc="High ratios (e.g., 300:1) can signal excess." 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Red Flags */}
                    <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
                      <strong className="text-red-800 text-sm block mb-2">Governance Red Flags to Watch:</strong>
                      <div className="flex flex-wrap gap-2">
                        <Badge text="Poison Pills" color="bg-white text-red-700 border border-red-200" />
                        <Badge text="Staggered Boards" color="bg-white text-red-700 border border-red-200" />
                        <Badge text="Related Party Txns" color="bg-white text-red-700 border border-red-200" />
                        <Badge text="Qualified Audit Opinions" color="bg-white text-red-700 border border-red-200" />
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </section>

          {/* 3. Frameworks & Regulations */}
          <section>
            <SectionHeader 
              title="Frameworks & Regulations" 
              subtitle="The shift from voluntary 'Alphabet Soup' to mandatory legal compliance."
              icon={Landmark}
              colorClass="text-blue-500"
            />
            
            {/* Intro Context */}
            <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">The Great Consolidation</h3>
              <p className="text-gray-600 leading-relaxed">
                For 20 years, companies reported voluntarily using confusing, overlapping standards (GRI, SASB, TCFD, CDP). We are now entering the era of <strong>Mandatory Reporting</strong>. The voluntary frameworks are merging into global baselines (ISSB), while governments (EU, CA, US) are passing hard laws requiring audit-grade data.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Scale size={20} className="text-gray-500"/>The Core Debate: Materiality
              </h3>
              <div className="flex flex-col md:flex-row gap-0 md:gap-4">
                <div className="flex-1 bg-blue-50 p-6 rounded-t-xl md:rounded-l-xl md:rounded-tr-none border border-blue-100">
                  <h4 className="font-bold text-blue-900">Single Materiality (Financial)</h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">US / Global Investor Approach</p>
                  <p className="text-sm text-blue-800">
                    "How does climate change hurt the company's bottom line?" Focus is on investor protection and enterprise value (e.g., flood risk to a factory).
                  </p>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <span className="font-bold text-blue-900 text-xs">Champions:</span>
                    <div className="flex gap-2 mt-2">
                      <Badge text="ISSB (IFRS)" color="bg-white text-blue-700" />
                      <Badge text="SASB" color="bg-white text-blue-700" />
                      <Badge text="SEC" color="bg-white text-blue-700" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-emerald-50 p-6 rounded-b-xl md:rounded-r-xl md:rounded-bl-none border border-emerald-100">
                  <h4 className="font-bold text-emerald-900">Double Materiality (Impact)</h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">European Approach</p>
                  <p className="text-sm text-emerald-800">
                    Two-way street: "How does the company hurt the planet?" Considers impacts on society/environment regardless of financial hit (e.g., pollution affecting locals).
                  </p>
                  <div className="mt-4 pt-4 border-t border-emerald-200">
                    <span className="font-bold text-emerald-900 text-xs">Champions:</span>
                    <div className="flex gap-2 mt-2">
                      <Badge text="EU (CSRD)" color="bg-white text-emerald-700" />
                      <Badge text="GRI" color="bg-white text-emerald-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* EU Section */}
              <DetailCard 
                title="The European Engine (The Gold Standard)" 
                preview="The EU has the most advanced and comprehensive sustainable finance laws in the world."
                icon={Globe}
                colorClass="text-emerald-600"
                details={
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-emerald-50 p-4 rounded-lg">
                        <strong className="text-emerald-900 block mb-1">CSRD (Reporting)</strong>
                        <span className="text-xs font-bold text-emerald-600 uppercase mb-2 block">Corporate Sustainability Reporting Directive</span>
                        <p className="text-sm text-emerald-800">
                          Replaces the NFRD. Requires ~50,000 companies to report over 1,000 data points.<br/><br/>
                          <strong>Key Feature:</strong> Mandatory independent audit (assurance) of ESG data, putting it on par with financial data.
                        </p>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-lg">
                        <strong className="text-emerald-900 block mb-1">SFDR (Investing)</strong>
                        <span className="text-xs font-bold text-emerald-600 uppercase mb-2 block">Sustainable Finance Disclosure Reg</span>
                        <p className="text-sm text-emerald-800">Labels for Investment Funds to prevent greenwashing:</p>
                        <ul className="text-xs text-emerald-800 list-disc list-inside mt-2">
                          <li><strong>Art. 6:</strong> Grey (Standard).</li>
                          <li><strong>Art. 8:</strong> Light Green (Promotes E/S).</li>
                          <li><strong>Art. 9:</strong> Dark Green (100% Sustainable outcome).</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-white border border-emerald-100 p-4 rounded-lg">
                      <strong className="text-gray-900 block mb-1">The EU Taxonomy</strong>
                      <p className="text-sm text-gray-600">
                        A strict dictionary defining what counts as "Green." Nuclear and Gas were controversially included as "transition" activities. To be "Taxonomy Aligned," a company must make a substantial contribution to climate goals without harming others (DNSH - Do No Significant Harm).
                      </p>
                    </div>
                  </div>
                }
              />

              {/* ISSB Section */}
              <DetailCard 
                title="The Global Baseline: ISSB" 
                preview="The International Sustainability Standards Board is consolidating the 'Alphabet Soup' into one global accounting language."
                icon={FileText}
                colorClass="text-blue-600"
                details={
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Created by the IFRS Foundation (which sets accounting rules for 140+ countries). The ISSB has absorbed SASB and TCFD.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <strong className="text-blue-700 block text-lg">IFRS S1</strong>
                        <span className="text-xs text-gray-500 uppercase font-bold">General Requirements</span>
                        <p className="text-sm text-gray-600 mt-2">
                          Requires companies to disclose sustainability-related risks and opportunities that could affect cash flows.
                        </p>
                      </div>
                      <div className="border border-gray-200 p-4 rounded-lg">
                        <strong className="text-blue-700 block text-lg">IFRS S2</strong>
                        <span className="text-xs text-gray-500 uppercase font-bold">Climate Disclosures</span>
                        <p className="text-sm text-gray-600 mt-2">
                          Mandates Scope 1, 2, and 3 reporting + climate scenario analysis. Based heavily on TCFD.
                        </p>
                      </div>
                    </div>
                  </div>
                }
              />

              {/* US Section */}
              <DetailCard 
                title="The US Landscape: Fragmented & Litigious" 
                preview="While the Federal SEC rule stalls in court, California has moved ahead with aggressive state laws."
                icon={Gavel}
                colorClass="text-slate-600"
                details={
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="bg-slate-100 p-2 rounded text-slate-700 font-bold text-sm w-24 flex-shrink-0 text-center">Federal</div>
                      <div>
                        <strong className="block text-gray-900 text-sm">SEC Climate Rule (Paused)</strong>
                        <p className="text-sm text-gray-600">
                          Scaled back to only require Scope 1 & 2 for large companies (Scope 3 dropped). Currently facing lawsuits from business groups (arguing overreach) and green groups (arguing it's too weak).
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-100 p-2 rounded text-yellow-800 font-bold text-sm w-24 flex-shrink-0 text-center">California</div>
                      <div>
                        <strong className="block text-gray-900 text-sm">SB 253 & SB 261</strong>
                        <p className="text-sm text-gray-600">
                          <strong>The "Brussels Effect" of the US.</strong> Mandates Scope 1, 2, AND 3 reporting for any public/private company with &gt;$1B revenue doing business in CA. Effectively sets the national standard since most large US firms operate in CA.
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={18} className="text-red-500"/>
                        <strong className="text-red-900">The "Anti-ESG" Backlash</strong>
                      </div>
                      <p className="text-sm text-red-800">
                        Several US states (FL, TX) have banned ESG considerations in state pension funds, calling it "woke capitalism." This has forced asset managers to use neutral language ("Transition Risk" instead of "ESG").
                      </p>
                    </div>
                  </div>
                }
              />
            </div>
          </section>

          {/* 4. Measurement & Divergence (EXPANDED) */}
          <section>
            <SectionHeader 
              title="Measuring ESG: The Data Challenge" 
              subtitle="Unlike credit ratings (0.99 correlation), ESG ratings often disagree (0.30 - 0.70 correlation). Here is why."
              icon={BarChart3}
              colorClass="text-indigo-500"
            />

            {/* Aggregate Confusion Explanation */}
            <DetailCard 
              title="The Problem of 'Aggregate Confusion'"
              preview="MIT researchers found that ESG ratings diverge significantly because agencies fundamentally disagree on what 'good' looks like."
              icon={AlertTriangle}
              colorClass="text-orange-500"
              details={
                <div className="space-y-6">
                  <p className="text-gray-700 text-sm">
                    If you ask Moody's and S&P "Is this company likely to go bankrupt?", they agree 99% of the time. If you ask MSCI and Sustainalytics "Is this company 'Green'?", they might give completely opposite answers. This divergence comes from three sources:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                      <strong className="block text-orange-900 mb-2">1. Scope (What?)</strong>
                      <p className="text-xs text-orange-800">
                        One agency includes "Lobbying Activities" in Governance. Another ignores it completely. If a company lobbies heavily, its score varies wildly.
                      </p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                      <strong className="block text-orange-900 mb-2">2. Weight (How Much?)</strong>
                      <p className="text-xs text-orange-800">
                        Agency A says "Water Usage" is 40% of a Beverage company's score. Agency B says it's only 10%.
                      </p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                      <strong className="block text-orange-900 mb-2">3. Measurement (How?)</strong>
                      <p className="text-xs text-orange-800">
                        Agency A counts "Number of lawsuits." Agency B counts "Total $ fines paid." A company with many small nuisance lawsuits looks bad to A, but fine to B.
                      </p>
                    </div>
                  </div>
                </div>
              }
            />

            {/* The Data Supply Chain */}
            <div className="my-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Database size={20} className="text-gray-500" />The ESG Data Supply Chain
              </h3>
              <div className="grid md:grid-cols-4 gap-2">
                {[
                  { step: "1. Corporate Disclosure", desc: "CSR Reports, 10-Ks. (Self-reported, often biased).", color: "bg-gray-100 border-gray-200" },
                  { step: "2. Alternative Data", desc: "News scraping, NGO reports, satellite imagery (checking deforestation).", color: "bg-blue-50 border-blue-100" },
                  { step: "3. AI & Estimation", desc: "Filling gaps. If a company doesn't report carbon, algorithms estimate it based on revenue/peer avg.", color: "bg-indigo-50 border-indigo-100" },
                  { step: "4. Final Rating", desc: "Normalization and weighting against peers to produce AAA or Risk Score.", color: "bg-teal-50 border-teal-100" }
                ].map((item, i) => (
                  <div key={i} className={`p-4 rounded-lg border ${item.color} relative`}>
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Step {i+1}</div>
                    <div className="font-bold text-gray-900 text-sm mb-1">{item.step.split('. ')[1]}</div>
                    <p className="text-xs text-gray-600 leading-snug">{item.desc}</p>
                    {i < 3 && <div className="hidden md:block absolute -right-3 top-1/2 -mt-2 z-10 text-gray-300">&rarr;</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-900">Agency Methodology Showdown</h3>
                <p className="text-sm text-gray-500">Comparing the two dominant market leaders.</p>
              </div>
              <ComparisonTable />
            </div>

            {/* Estimation Risk Warning */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex gap-4">
              <AlertTriangle className="text-yellow-600 flex-shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-yellow-900 text-sm">The "Estimation Gap" Risk</h4>
                <p className="text-sm text-yellow-800 mt-1">
                  For Small-Cap and Emerging Market companies, up to <strong>45% of data points</strong> are estimated (imputed) by the rating agency because the company doesn't report them. Investors often mistakenly think they are trading on hard data when they are trading on an algorithm's guess.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Strategies Deep Dive (EXPANDED) */}
          <section>
            <SectionHeader 
              title="Investment Strategies: A Spectrum" 
              subtitle="Capital allocation varies from simple exclusion to proactive impact generation."
              icon={Globe}
              colorClass="text-blue-600"
            />
            <div className="space-y-8">
              {/* Strategy 1: Exclusion */}
              <DetailCard 
                title="1. Negative Screening (Exclusion)" 
                preview="The oldest form of responsible investing, focused on 'avoiding bad' rather than 'finding good'."
                icon={Filter}
                colorClass="text-red-500"
                details={
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Sector-Based</h4>
                        <p className="text-sm text-gray-600">
                          Blanket removal of entire industries. Typical targets: Weapons, Tobacco, Thermal Coal, Gambling, Adult Entertainment.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Norms-Based</h4>
                        <p className="text-sm text-gray-600">
                          Excluding companies that violate international standards, regardless of industry (e.g., violating the UN Global Compact on human rights).
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-50 p-3 rounded text-sm text-red-800">
                      <strong>Financial Consequence:</strong> Exclusion increases "Tracking Error" (deviation from the benchmark). If the excluded sector (e.g., Energy) rallies, the portfolio will underperform.
                    </div>
                  </div>
                }
              />

              {/* Strategy 2: Integration */}
              <DetailCard 
                title="2. ESG Integration (Modern Standard)" 
                preview="Systematically including ESG data in financial models to adjust fair value estimates."
                icon={PieChart}
                colorClass="text-blue-500"
                details={
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700">
                      This is <strong>not</strong> about excluding companies, but pricing their risks correctly. An integrated fund might still own an oil company, but only if it's trading at a discount that compensates for its climate risk.
                    </p>
                    <div className="bg-white border border-gray-200 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">How Analysts Do It (DCF Adjustment):</h4>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span><strong>Cash Flows:</strong></span>
                          <span className="text-gray-600">Reduce future revenue projections for a sugary drink company facing sugar tax legislation.</span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span><strong>Discount Rate (WACC):</strong></span>
                          <span className="text-gray-600">Increase the cost of capital for a company with poor governance, lowering the present value of the stock.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />

              {/* Strategy 3: Thematic */}
              <DetailCard 
                title="3. Thematic Investing" 
                preview="Targeting structural growth trends (Megatrends) driven by sustainability shifts."
                icon={Zap}
                colorClass="text-yellow-500"
                details={
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700">
                      Unlike broad ESG funds, these are narrow, concentrated bets on specific solutions.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div className="bg-yellow-50 p-3 rounded border border-yellow-100">
                        <strong className="block text-yellow-900 mb-1">Clean Energy</strong>
                        Solar, Wind, Hydrogen, and Grid storage infrastructure.
                      </div>
                      <div className="bg-blue-50 p-3 rounded border border-blue-100">
                        <strong className="block text-blue-900 mb-1">Water Security</strong>
                        Desalination, wastewater treatment, and smart metering.
                      </div>
                      <div className="bg-purple-50 p-3 rounded border border-purple-100">
                        <strong className="block text-purple-900 mb-1">Social Themes</strong>
                        Gender diversity leadership, Affordable housing REITs.
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-gray-500 italic mt-2">
                      <AlertTriangle size={14} className="mt-0.5" />
                      <span>Warning: Thematic funds are highly volatile and sensitive to interest rates and government policy changes.</span>
                    </div>
                  </div>
                }
              />

              {/* Strategy 4: Impact */}
              <DetailCard 
                title="4. Impact Investing" 
                preview="Investments made with the specific intent to generate measurable social or environmental impact."
                icon={Target}
                colorClass="text-purple-600"
                details={
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700">
                      Often confused with ESG integration, but distinct because it prioritizes the <strong>outcome</strong> alongside the return ("The Double Bottom Line").
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                      <li><strong>Additionality:</strong> The impact would not have occurred without this specific capital.</li>
                      <li><strong>Measurability:</strong> Reporting tangible KPIs (e.g., "Tons of CO2 avoided," "Students educated").</li>
                      <li><strong>Asset Classes:</strong> Common in Private Equity (Venture Capital for climate tech) and Green Bonds.</li>
                    </ul>
                  </div>
                }
              />

              {/* Strategy 5: Stewardship */}
              <DetailCard 
                title="5. Active Stewardship (Engagement)" 
                preview="Using shareholder rights to influence company behavior rather than divesting."
                icon={Megaphone}
                colorClass="text-teal-700"
                details={
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700">
                      Also known as "Voice vs. Exit." Proponents argue that selling a dirty stock (Exit) just transfers it to an indifferent owner, whereas keeping it (Voice) allows you to force change.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <h4 className="font-bold text-teal-900 mb-1">Proxy Voting</h4>
                        <p className="text-xs text-teal-800">
                          Voting on shareholder resolutions (e.g., demanding a racial equity audit) and director elections.
                        </p>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <h4 className="font-bold text-teal-900 mb-1">Engagement</h4>
                        <p className="text-xs text-teal-800">
                          Direct, private meetings with the Board/Management to set specific targets (e.g., Science Based Targets initiative).
                        </p>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </section>

          {/* 6. Pitfalls & Greenwashing */}
          <section>
            <SectionHeader 
              title="Risks & Pitfalls" 
              subtitle="Identifying deception and structural weaknesses in ESG data."
              icon={AlertTriangle}
              colorClass="text-red-500"
            />
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Varieties of Greenwashing">
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="pb-2 border-b border-gray-100">
                    <strong className="text-gray-900 block">Greencrowding:</strong>
                    Hiding in a group. Joining an alliance (e.g., "Alliance to End Plastic Waste") and moving at the speed of the slowest member.
                  </li>
                  <li className="pb-2 border-b border-gray-100">
                    <strong className="text-gray-900 block">Greenlighting:</strong>
                    Highlighting a tiny green feature (e.g., recycled packaging) to distract from a polluting business model.
                  </li>
                  <li className="pb-2 border-b border-gray-100">
                    <strong className="text-gray-900 block">Greenhushing:</strong>
                    Under-reporting sustainability achievements to avoid political backlash (common in US Red States) or accusations of not doing enough.
                  </li>
                </ul>
              </Card>
              <div className="space-y-4">
                <Card title="The Scope 3 Gap">
                  <p className="text-gray-600 text-sm">
                    Most data on supply chain emissions is modeled, not measured. This leads to massive margins of error. If a company claims a 50% reduction in Scope 3, verify if they actually measured it or just changed their calculation formula.
                  </p>
                </Card>
                <Card title="Sector Bias">
                  <p className="text-gray-600 text-sm">
                    Tech companies naturally score higher on "E" than cement companies. A portfolio optimized purely for high ESG scores will inadvertently become a Tech ETF, increasing concentration risk.
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-gray-200 pt-12 pb-12">
            <div className="bg-gray-900 text-gray-300 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl font-bold text-white mb-6">Summary Checklist</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <FeatureList items={[
                  "Identify Materiality: Does the ESG factor actually impact the specific industry?",
                  "Check the Framework: Is the data reported via SASB (financial) or GRI (impact)?",
                  "Analyze Momentum: 'Improvers' often outperform current 'Leaders'.",
                  "Watch the Governance: Strong 'G' is the best predictor of downside protection.",
                  "Beware of Greenwashing: Demand audited data and interim targets, not just 2050 pledges."
                ]} />
              </div>
              <div className="text-sm border-t border-gray-700 pt-6 text-gray-500 flex justify-between items-center">
                <p>Based on "The Strategic Imperative of ESG: A Comprehensive Analysis (2025)"</p>
                <p>v2.6 Data Deep Dive</p>
              </div>
            </div>
          </footer>
        </main>
    </ArticleFrame>
  );
}