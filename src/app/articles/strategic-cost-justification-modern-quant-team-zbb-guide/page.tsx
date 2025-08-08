'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, DollarSign, BarChart2, Cpu, Lightbulb, Briefcase, TrendingUp, Shield, Settings, BrainCircuit, Database, ArrowRight, UserPlus, Zap, Clock, Server, ShieldCheck, Library, Users, Code, Activity, CheckCircle, AlertTriangle, Target } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Helper Components for Icons and Layout
const IconWrapper = ({ children, className = "bg-cyan-100/50 border-cyan-200" }) => (
  <div className={`p-3 rounded-full mb-4 border ${className}`}>
    {children}
  </div>
);

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
    {children}
  </h2>
);

const SectionSubtitle = ({ children }) => (
  <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
    {children}
  </p>
);

// Hero Section Component
const Hero = () => (
  <div className="relative text-center py-28 md:py-40 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
    <div className="absolute inset-0 bg-grid-gray-200 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
    <div className="relative z-10 max-w-6xl mx-auto">
      <span className="inline-block bg-cyan-100 text-cyan-800 text-sm font-medium px-4 py-1 rounded-full mb-4 border border-cyan-200">
        Asset & Wealth Management Division
      </span>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
        Strategic Cost Justification for the Modern Quant Team
      </h1>
      
      {/* Featured Image */}
      <div className="mb-8 flex justify-center">
        <div className="relative max-w-2xl mx-auto">
          <img 
            src="https://www.techfunnel.com/wp-content/uploads/2024/08/Zero-Based-Budgeting.jpg"
            alt="Zero-Based Budgeting Framework"
            className="w-full h-auto rounded-xl shadow-lg border border-gray-200"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
        </div>
      </div>
      
      <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        A practical guide to Zero-Based Budgeting (ZBB), transforming your quant team from a cost center into an indispensable value driver.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <a href="#section1" className="bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors duration-300 flex items-center gap-2">
          Explore the Guide <ArrowRight size={20} />
        </a>
      </div>
    </div>
  </div>
);

// ZBB Comparison Component
const ZBBComparison = () => {
  const traditional = [
    "Starts with previous budget",
    "Justifies only incremental changes", 
    "Focus on historical spending",
    "Accounting-oriented",
    "Can perpetuate inefficiencies"
  ];
  
  const zbb = [
    "Starts from a zero base",
    "Justifies every single expense",
    "Focus on future needs & goals", 
    "Decision-oriented & strategic",
    "Drives efficiency and alignment"
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-12">
      <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Traditional Budgeting</h3>
        <ul className="space-y-3">
          {traditional.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">&#10007;</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-cyan-50 border border-cyan-200 p-8 rounded-xl ring-2 ring-cyan-500/10">
        <h3 className="text-2xl font-bold text-cyan-800 mb-4">Zero-Based Budgeting (ZBB)</h3>
        <ul className="space-y-3">
          {zbb.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-cyan-600 mr-3 mt-1">&#10003;</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Economic Footprint Section
const EconomicFootprint = () => {
  const DetailCard = ({ icon, title, children }) => (
    <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
      <div className="flex items-center text-2xl font-bold text-gray-900 mb-4">
        {icon}
        <h3 className="ml-3">{title}</h3>
      </div>
      <div className="space-y-3 text-gray-600">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <DetailCard 
        icon={<Users size={28} className="text-cyan-600" />} 
        title="The Human Capital Engine"
      >
        <p>The team's most significant cost and its greatest asset. The budget must reflect the premium required to attract and retain elite talent with rare skills in finance, math, and computer science.</p>
        <ul className="list-disc list-inside space-y-2 pt-2">
          <li><strong>Compensation:</strong> High base salaries and performance bonuses to compete with tech firms and hedge funds.</li>
          <li><strong>Recruitment:</strong> Costs for specialized headhunters and signing bonuses to secure top-tier candidates.</li>
          <li><strong>Training:</strong> Allocations for conferences and certifications to keep the team at the cutting edge of a rapidly evolving field.</li>
        </ul>
      </DetailCard>

      <DetailCard 
        icon={<Database size={28} className="text-cyan-600" />} 
        title="The Data Deluge"
      >
        <p>Data is the lifeblood of quantitative research. This category includes non-negotiable market data and high-cost alternative datasets that provide a competitive edge.</p>
        <ul className="list-disc list-inside space-y-2 pt-2">
          <li><strong>Market Data:</strong> Per-seat licenses for essentials like Bloomberg (~$32k/yr) and LSEG (~$22k/yr), plus enterprise-level direct data feeds.</li>
          <li><strong>Alternative Data:</strong> The new frontier of alpha. Costs can range from $25k to over $500k annually for a single dataset like satellite imagery or credit card transaction data.</li>
        </ul>
      </DetailCard>

      <DetailCard 
        icon={<Cpu size={28} className="text-cyan-600" />} 
        title="The Computational Arsenal"
      >
        <p>The ability to process vast datasets and run complex simulations requires a powerful and expensive computational infrastructure, whether built or rented.</p>
        <ul className="list-disc list-inside space-y-2 pt-2">
          <li><strong>Software:</strong> Licensing for proprietary tools like MATLAB vs. the Total Cost of Ownership (TCO) for "free" open-source ecosystems like Python (which includes higher developer salaries and support costs).</li>
          <li><strong>High-Performance Computing (HPC):</strong> A critical decision between massive on-premise capital expenditure (CAPEX) vs. a flexible, pay-as-you-go cloud model (OPEX) that aligns better with ZBB's project-based justification.</li>
        </ul>
      </DetailCard>
    </div>
  );
};

// Art of Justification Section
const ArtOfJustification = () => {
  const ValueStep = ({ number, title, description, example }) => (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div>
          <div className="flex items-center justify-center w-10 h-10 border-2 border-cyan-500 rounded-full font-bold text-cyan-600">
            {number}
          </div>
        </div>
        <div className="w-px h-full bg-gray-300"></div>
      </div>
      <div className="pb-8">
        <h4 className="font-bold text-gray-900">{title}</h4>
        <p className="mt-1 text-gray-600">{description}</p>
        <p className="mt-2 text-sm text-gray-500 italic border-l-2 border-gray-300 pl-3">{example}</p>
      </div>
    </div>
  );

  const KpiCard = ({ icon, title, description, examples }) => (
    <div className="bg-white border border-gray-200 p-6 rounded-lg">
      <div className="flex items-center">
        <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
          {icon}
        </div>
        <h4 className="ml-4 font-semibold text-gray-900 text-lg">{title}</h4>
      </div>
      <p className="text-gray-600 text-sm mt-4">{description}</p>
      <ul className="mt-3 space-y-1 text-sm text-gray-500">
        {examples.map((ex, i) => 
          <li key={i} className="flex items-start">
            <CheckCircle size={14} className="text-green-500 mr-2 mt-0.5 flex-shrink-0"/>
            {ex}
          </li>
        )}
      </ul>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-5 gap-12">
      <div className="lg:col-span-2">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">The Value Translation Framework</h3>
        <p className="text-gray-600 mb-6">
          Bridge the gap between technical work and business outcomes. Translate every request into a three-layer narrative of value that senior leadership can understand and support.
        </p>
        <div>
          <ValueStep 
            number="1" 
            title="Qualitative: What problem do we solve?" 
            description="Start with the high-level benefit, avoiding jargon." 
            example="We're developing a new way to get a real-time, independent read on global oil supply." 
          />
          <ValueStep 
            number="2" 
            title="Quantitative: By how much do we solve it?" 
            description="Add a specific, measurable metric to the claim." 
            example="This gives us a data signal two weeks ahead of official government reports." 
          />
          <div className="flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <div className="flex items-center justify-center w-10 h-10 border-2 border-cyan-500 rounded-full font-bold text-cyan-600">
                  3
                </div>
              </div>
            </div>
            <div className="pb-1">
              <h4 className="font-bold text-gray-900">Financial: What is it worth in dollars?</h4>
              <p className="mt-1 text-gray-600">Translate the metric into a tangible financial impact.</p>
              <p className="mt-2 text-sm text-gray-500 italic border-l-2 border-gray-300 pl-3">
                "This two-week edge is projected to generate an additional $5M in annual P&L for our commodities strategy."
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Team-Focused Performance Metrics</h3>
        <p className="text-gray-600 mb-6">
          Move beyond strategy-level metrics like Sharpe Ratio. Justify your budget with KPIs that measure the direct performance, quality, and efficiency of your team's operations.
        </p>
        <div className="space-y-6">
          <KpiCard 
            icon={<Activity size={24} className="text-cyan-600"/>} 
            title="Productivity & Velocity"
            description="Measure the rate and volume of the team's R&D output."
            examples={[
              "Research Throughput (signals/quarter)", 
              "Time-to-Market for new models", 
              "Experimentation Rate (new data/techniques)"
            ]}
          />
          <KpiCard 
            icon={<AlertTriangle size={24} className="text-orange-600"/>} 
            title="Quality & Risk Mitigation"
            description="Demonstrate a commitment to robust, stable, and well-managed operations."
            examples={[
              "Model Error Rate in production", 
              "Code Test Coverage percentage", 
              "Reduction in Key-Person Dependencies"
            ]}
          />
          <KpiCard 
            icon={<Target size={24} className="text-indigo-600"/>} 
            title="Financial & Efficiency"
            description="Connect the team's activities directly to financial outcomes and resource stewardship."
            examples={[
              "Value of Automated Tasks (hours saved)", 
              "ROI on a new hire or tool", 
              "Cloud Compute Cost per Backtest"
            ]}
          />
        </div>
      </div>
    </div>
  );
};

// Headcount Justification Case Study Component
const HeadcountJustificationPackage = () => {
  const RoiCard = ({ title, value, subtitle }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );

  const TierCard = ({ level, title, consequence, borderColor, bgColor }) => (
    <div className={`p-6 rounded-lg border-l-4 ${borderColor} ${bgColor}`}>
      <span className="text-sm font-semibold text-gray-700">{level}</span>
      <h4 className="font-bold text-gray-900 mt-1">{title}</h4>
      <p className="text-gray-600 mt-2 text-sm">{consequence}</p>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-lg">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <IconWrapper>
            <UserPlus size={24} className="text-cyan-600" />
          </IconWrapper>
          <h3 className="text-2xl font-bold text-gray-900">Investment in Research Productivity</h3>
          <p className="text-gray-600 mt-2">
            Hire one (1) Quantitative Developer to eliminate an efficiency bottleneck and unlock the full potential of our research team.
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-start">
              <Clock size={20} className="text-cyan-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">The Bottleneck</h4>
                <p className="text-sm text-gray-600">5 Quant Researchers spend ~25% of their time on low-value engineering tasks, not alpha research.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Zap size={20} className="text-cyan-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-800">The Solution</h4>
                <p className="text-sm text-gray-600">A dedicated developer to automate data pipelines, build tooling, and maintain the research platform.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Return on Investment (ROI)</h4>
            <div className="grid sm:grid-cols-3 gap-4">
              <RoiCard title="Value Unlocked" value="$350K" subtitle="Annually" />
              <RoiCard title="Total Cost" value="$254K" subtitle="Year 1" />
              <RoiCard title="Year 1 ROI" value="38%" subtitle="Net Benefit: $96K" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Tiered Funding & Consequences</h4>
            <div className="space-y-4">
              <TierCard 
                level="LEVEL 1" 
                title="No Funding (Decline Hire)" 
                consequence="The research bottleneck persists. We accept the current slow pace of innovation and high risk of manual errors. This caps the team's productivity." 
                borderColor="border-red-500" 
                bgColor="bg-red-50" 
              />
              <TierCard 
                level="LEVEL 2" 
                title="Partial Funding (Hire Contractor)" 
                consequence="A temporary 'band-aid' solution. Provides short-term relief but builds no institutional knowledge and fails to address core platform issues." 
                borderColor="border-yellow-500" 
                bgColor="bg-yellow-50" 
              />
              <TierCard 
                level="LEVEL 3" 
                title="Full Funding (Hire FTE - Recommended)" 
                consequence="A permanent, strategic investment in the team's core infrastructure. Creates a compounding effect on productivity and unlocks our full potential." 
                borderColor="border-green-500" 
                bgColor="bg-green-50" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Foundational Investments Component
const FoundationalInvestments = () => {
  const [activeTab, setActiveTab] = useState('infra');

  const tabs = [
    { id: 'infra', label: 'Infrastructure Uplift', icon: <Server size={20} /> },
    { id: 'risk', label: 'Tech Risk Mitigation', icon: <ShieldCheck size={20} /> },
    { id: 'gov', label: 'Data Governance', icon: <Library size={20} /> }
  ];

  const content = {
    infra: {
      icon: <Server size={24} className="text-cyan-600" />,
      title: "Infrastructure as a Productivity Multiplier",
      description: "Core infrastructure, like a backtesting engine, is the team's factory floor. Upgrades are investments in output, enabling the team to test more ideas faster and accelerate innovation.",
      problem: "Slow, monolithic backtesting engine creates a severe research bottleneck, limiting the number of ideas that can be tested and delaying time-to-market.",
      solution: "Re-architect the platform into a scalable, cloud-native service to increase backtesting throughput by over 1,000% and reduce research cycles from weeks to days.",
      value: { title: "Value of Enablement", metric: "$1.5M+", subtitle: "P&L from 1 extra strategy/year" },
      cost: { title: "Total Cost", metric: "$450K", subtitle: "One-time project" },
      benefit: { title: "Benefit", metric: "1000%+", subtitle: "Increase in backtest throughput" },
      tiers: [
        { level: "LEVEL 1", title: "No Funding", consequence: "The innovation bottleneck remains. We accept that our R&D is capped by legacy tech and cede ground to more agile competitors.", color: "red" },
        { level: "LEVEL 2", title: "Partial Funding (Optimize)", consequence: "Minor optimizations yield marginal (10-20%) speed improvements but fail to address the core architectural problem. A tactical fix for a strategic issue.", color: "yellow" },
        { level: "LEVEL 3", title: "Full Funding (Re-architect)", consequence: "A step-change in research capability. Unlocks the team's full potential and establishes a sustainable competitive advantage in innovation speed.", color: "green" }
      ]
    },
    risk: {
      icon: <ShieldCheck size={24} className="text-orange-600" />,
      title: "Tech Risk Mitigation as Loss Avoidance",
      description: "Justifying spending on technical debt or key-person risk is framed as buying insurance. The question isn't the ROI, but the potential cost of *not* acting.",
      problem: "A critical portfolio construction library is undocumented, fragile, and understood by only one senior quant, creating a massive single point of failure.",
      solution: "Dedicate resources to refactor, document, and build a comprehensive test suite for the library, mitigating key-person risk and preventing potential trading errors.",
      value: { title: "Potential Loss Avoided", metric: "$10M", subtitle: "From a single major bug" },
      cost: { title: "Total Cost", metric: "$125K", subtitle: "0.5 FTE for 6 months" },
      benefit: { title: "Benefit", metric: "Risk Mitigation", subtitle: "Eliminates critical failure point" },
      tiers: [
        { level: "LEVEL 1", title: "No Funding (Accept Risk)", consequence: "We consciously accept the critical key-person dependency and the unmitigated risk of a major operational failure in our core investment process.", color: "red" },
        { level: "LEVEL 2", title: "Partial Funding (Document Only)", consequence: "Partially mitigates key-person risk but leaves the fragile, complex code in place. The operational risk of a failure remains high.", color: "yellow" },
        { level: "LEVEL 3", title: "Full Funding (Refactor & Test)", consequence: "The risk is fully mitigated. The library becomes robust, reliable, and maintainable, ensuring the long-term stability of our investment process.", color: "green" }
      ]
    },
    gov: {
      icon: <Library size={24} className="text-indigo-600" />,
      title: "Data Governance as the Foundation of Trust",
      description: "Models are only as good as their data. Governance isn't overhead; it's an investment in efficiency, risk reduction, and enabling more reliable, auditable research.",
      problem: "Decentralized data management leads to wasted research time on cleaning, inconsistency across models, and significant operational and regulatory risk.",
      solution: "Implement a central data catalog and automated quality checks to create a 'single source of truth', saving research hours and providing an auditable data foundation.",
      value: { title: "Value Unlocked", metric: "$175K", subtitle: "Annually from efficiency" },
      cost: { title: "Total Cost", metric: "$250K", subtitle: "Tool + 1 FTE" },
      benefit: { title: "Benefit", metric: "50% Reduction", subtitle: "In time spent on data wrangling" },
      tiers: [
        { level: "LEVEL 1", title: "No Funding", consequence: "We continue with our inefficient and risky ad-hoc data management, accepting wasted time and the growing risk of a data-driven model failure.", color: "red" },
        { level: "LEVEL 2", title: "Partial Funding (Manual Process)", consequence: "A manual, spreadsheet-based attempt at governance. This is not scalable, is highly labor-intensive, and fails to provide automated checks and lineage.", color: "yellow" },
        { level: "LEVEL 3", title: "Full Funding (Tool & FTE)", consequence: "Establishes a robust, scalable, and automated framework. Creates a trusted foundation that increases research velocity and demonstrably reduces risk.", color: "green" }
      ]
    }
  };

  const activeContent = content[activeTab];
  const tierClasses = {
    red: { border: 'border-red-500', bg: 'bg-red-50' },
    yellow: { border: 'border-yellow-500', bg: 'bg-yellow-50' },
    green: { border: 'border-green-500', bg: 'bg-green-50' }
  };

  const iconClasses = {
    infra: "bg-cyan-100/50 border-cyan-200",
    risk: "bg-orange-100/50 border-orange-200",
    gov: "bg-indigo-100/50 border-indigo-200"
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex justify-center" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-1/3 flex items-center justify-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-8 md:p-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <IconWrapper className={iconClasses[activeTab]}>
              {activeContent.icon}
            </IconWrapper>
            <h3 className="text-2xl font-bold text-gray-900">{activeContent.title}</h3>
            <p className="text-gray-600 mt-2">{activeContent.description}</p>
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800">The Problem</h4>
                <p className="text-sm text-gray-600">{activeContent.problem}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">The Solution</h4>
                <p className="text-sm text-gray-600">{activeContent.solution}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Financial Justification</h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">{activeContent.value.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{activeContent.value.metric}</p>
                  <p className="text-sm text-gray-500 mt-1">{activeContent.value.subtitle}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">{activeContent.cost.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{activeContent.cost.metric}</p>
                  <p className="text-sm text-gray-500 mt-1">{activeContent.cost.subtitle}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">{activeContent.benefit.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{activeContent.benefit.metric}</p>
                  <p className="text-sm text-gray-500 mt-1">{activeContent.benefit.subtitle}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Tiered Funding & Consequences</h4>
              <div className="space-y-4">
                {activeContent.tiers.map((tier, i) => (
                  <div key={i} className={`p-6 rounded-lg border-l-4 ${tierClasses[tier.color].border} ${tierClasses[tier.color].bg}`}>
                    <span className="text-sm font-semibold text-gray-700">{tier.level}</span>
                    <h4 className="font-bold text-gray-900 mt-1">{tier.title}</h4>
                    <p className="text-gray-600 mt-2 text-sm">{tier.consequence}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200">
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
      <p>&copy; {new Date().getFullYear()} Asset & Wealth Management Division. All Rights Reserved.</p>
      <p className="text-sm mt-2">This document is for internal strategic planning purposes only.</p>
    </div>
  </footer>
);

// Main Article Component
export default function StrategicCostJustificationGuide() {
  const currentArticle = articles.find(article => article.slug === 'strategic-cost-justification-modern-quant-team-zbb-guide');

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="bg-white min-h-screen font-sans text-gray-700">
        <style>{`
          body { background-color: #ffffff; } 
          .bg-grid-gray-200 { 
            background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px); 
            background-size: 40px 40px; 
          }
        `}</style>

        {/* Return to Home Button */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
              
              {/* Deep Research Badge */}
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium border border-purple-200">
                Deep Research
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-16 z-40">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Briefcase className="h-8 w-8 text-cyan-600" />
                <span className="ml-3 font-bold text-gray-900 text-lg">Quant ZBB Strategy</span>
              </div>
              <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
                <a href="#section1" className="hover:text-cyan-600 transition-colors">What & Why</a>
                <a href="#section2" className="hover:text-cyan-600 transition-colors">Cost Drivers</a>
                <a href="#section3" className="hover:text-cyan-600 transition-colors">Justification</a>
                <a href="#section4" className="hover:text-cyan-600 transition-colors">Headcount</a>
                <a href="#section5" className="hover:text-cyan-600 transition-colors">Foundations</a>
              </div>
            </div>
          </nav>
        </header>

        <main>
          <Hero />

          <Section id="section1" className="bg-gray-50">
            <SectionTitle>Deconstructing Zero-Based Budgeting</SectionTitle>
            <SectionSubtitle>
              ZBB isn't just cost-cutting; it's a strategic mandate to justify every dollar, shifting focus from historical spending to future value and aligning all resources with firm-wide objectives.
            </SectionSubtitle>
            <ZBBComparison />
          </Section>

          <Section id="section2" className="bg-white">
            <SectionTitle>The Quant Team's Economic Footprint</SectionTitle>
            <SectionSubtitle>
              A modern quant team's budget is a unique blend of high-value assets. Understanding these core cost drivers is the first step in building a defensible budget.
            </SectionSubtitle>
            <EconomicFootprint />
          </Section>

          <Section id="section3" className="bg-gray-50">
            <SectionTitle>The Art of Justification</SectionTitle>
            <SectionSubtitle>
              Translate technical prowess into financial value. Success in ZBB hinges on quantifying your team's impact with metrics that resonate with a non-technical, financially-driven audience.
            </SectionSubtitle>
            <ArtOfJustification />
          </Section>

          <Section id="section4" className="bg-white">
            <SectionTitle>Justifying Headcount: A Case Study</SectionTitle>
            <SectionSubtitle>
              Justifying a new hire requires a clear, ROI-driven business case. The argument isn't "we're overworked," but "this investment in personnel will unlock specific, measurable value."
            </SectionSubtitle>
            <HeadcountJustificationPackage />
          </Section>

          <Section id="section5" className="bg-gray-50">
            <SectionTitle>Justifying Foundational Investments</SectionTitle>
            <SectionSubtitle>
              Beyond direct alpha projects, a budget must defend investments in infrastructure, risk mitigation, and data governance. These are framed as investments in productivity, stability, and trust.
            </SectionSubtitle>
            <FoundationalInvestments />
          </Section>

          {/* Research Source & Call-to-Action */}
          <Section className="bg-white border-t border-gray-200">
            <div className="text-center max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-8 md:p-12">
                <div className="flex justify-center mb-6">
                  <div className="bg-cyan-100 p-4 rounded-full border border-cyan-200">
                    <BrainCircuit size={32} className="text-cyan-600" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Deep Research Analysis
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  This comprehensive guide is based on extensive research into Zero-Based Budgeting methodologies specifically adapted for quantitative finance teams. Access the full research document for additional frameworks and implementation details.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {currentArticle?.googleDoc && (
                    <a 
                      href={currentArticle.googleDoc}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-cyan-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-cyan-700 transition-colors duration-300 transform hover:scale-105"
                    >
                      <Database className="inline mr-2" />
                      Access Full Research
                    </a>
                  )}
                  <Link 
                    href="/"
                    className="inline-block bg-gray-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-700 transition-colors duration-300"
                  >
                    <TrendingUp className="inline mr-2" />
                    Explore More Research
                  </Link>
                </div>
              </div>
            </div>
          </Section>

          {/* Educational Disclaimer */}
          <Section className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex justify-center mb-4">
                  <Shield className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-amber-800 mb-2">Educational Content Disclaimer</h3>
                <p className="text-sm text-amber-700">
                  This guide is provided for educational and informational purposes only. It does not constitute financial, investment, or professional advice. 
                  Budget planning and organizational decisions should be made in consultation with qualified professionals and in accordance with your institution's policies and procedures.
                </p>
              </div>
            </div>
          </Section>
        </main>

        <Footer />

        {/* Footer Branding */}
        <div className="bg-gray-900 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm">
              © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}