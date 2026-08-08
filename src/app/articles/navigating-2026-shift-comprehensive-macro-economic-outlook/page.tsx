'use client';

import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Shield, Zap, Activity, PieChart, Anchor, Globe, ArrowRight } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'blue' | 'purple' | 'amber' | 'rose' | 'emerald';
}

const Badge: React.FC<BadgeProps> = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    amber: "bg-amber-100 text-amber-700 border-amber-200",
    rose: "bg-rose-100 text-rose-700 border-rose-200",
    emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[color]} inline-flex items-center gap-1`}>
      {children}
    </span>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size: number }>;
  colorClass: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon: Icon, colorClass }) => (
  <div className="mb-8">
    <div className={`flex items-center gap-3 mb-2`}>
      <div className={`p-3 rounded-xl ${colorClass} text-white shadow-lg shadow-gray-200`}>
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
    </div>
    <p className="text-slate-500 text-lg ml-1 border-l-4 border-slate-200 pl-4">{subtitle}</p>
  </div>
);

interface InsightCardProps {
  title: string;
  content: string;
  type?: 'neutral' | 'warning' | 'danger' | 'success' | 'info';
}

const InsightCard: React.FC<InsightCardProps> = ({ title, content, type = "neutral" }) => {
  const styles = {
    neutral: "border-slate-100 bg-white hover:border-slate-300",
    warning: "border-amber-200 bg-amber-50/50 hover:border-amber-300",
    danger: "border-rose-200 bg-rose-50/50 hover:border-rose-300",
    success: "border-emerald-200 bg-emerald-50/50 hover:border-emerald-300",
    info: "border-indigo-200 bg-indigo-50/50 hover:border-indigo-300",
  };
  return (
    <div className={`p-6 rounded-2xl border-2 transition-all duration-300 shadow-sm hover:shadow-md ${styles[type]}`}>
      <h3 className="font-bold text-lg text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{content}</p>
    </div>
  );
};

interface StrategyBoxProps {
  title: string;
  allocation: string;
  details: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

const StrategyBox: React.FC<StrategyBoxProps> = ({ title, allocation, details, riskLevel }) => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col h-full">
    <div className="bg-slate-900 p-6 text-white">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        {riskLevel === 'Low' && <Badge color="emerald"><Shield size={12}/> Conservative</Badge>}
        {riskLevel === 'Medium' && <Badge color="amber"><Activity size={12}/> Balanced</Badge>}
        {riskLevel === 'High' && <Badge color="rose"><Zap size={12}/> Aggressive</Badge>}
      </div>
      <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
        {allocation}%
      </div>
      <div className="text-slate-400 text-sm font-medium mt-1">Suggested Portfolio Weight</div>
    </div>
    <div className="p-6 flex-grow flex flex-col gap-4">
      <p className="text-slate-600">{details}</p>
      <div className="mt-auto pt-4 border-t border-slate-100">
        <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
          View Assets <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </div>
);

export default function MacroEconomicOutlook2026() {
  return (
    <ArticleFrame slug="navigating-2026-shift-comprehensive-macro-economic-outlook">
      {/* Hero Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 mt-8">
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50">
          <div className="text-indigo-500 mb-2"><TrendingDown size={32}/></div>
          <div className="text-4xl font-black text-slate-800">1.8%</div>
          <div className="text-sm font-medium text-slate-500">Proj. Global GDP Growth</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-rose-100/50 border border-rose-50">
          <div className="text-rose-500 mb-2"><TrendingUp size={32}/></div>
          <div className="text-4xl font-black text-slate-800">3.2%</div>
          <div className="text-sm font-medium text-slate-500">Core CPI Forecast</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-amber-100/50 border border-amber-50">
          <div className="text-amber-500 mb-2"><DollarSign size={32}/></div>
          <div className="text-4xl font-black text-slate-800">$4.5-5k</div>
          <div className="text-sm font-medium text-slate-500">Gold Target /oz</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-emerald-100/50 border border-emerald-50">
          <div className="text-emerald-500 mb-2"><Activity size={32}/></div>
          <div className="text-4xl font-black text-slate-800">3.75%</div>
          <div className="text-sm font-medium text-slate-500">Fed Terminal Rate</div>
        </div>
      </div>

      <InfographicSlot alt="2026 Macro Economic Outlook Infographic" />

      {/* SECTION 1: MACRO LANDSCAPE */}
      <section id="macro" className="mb-20 mt-16">
        <SectionHeader 
          title="The Macro Landscape" 
          subtitle="Stagflationary pressures meet protectionist policies."
          icon={Globe}
          colorClass="bg-blue-600"
        />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <AlertTriangle className="text-amber-500" /> Stagflation Risk
            </h3>
            <div className="space-y-4">
              <p className="text-slate-600 leading-relaxed">
                2026 is poised to be the year where the "soft landing" narrative is tested by structural supply constraints. While demand softens due to exhausted consumer savings, prices remain elevated.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-1">1</div>
                  <span className="text-slate-700"><strong>Wage-Price Persistence:</strong> Service sector wages continue to rise, keeping a floor under core inflation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-1">2</div>
                  <span className="text-slate-700"><strong>Energy Transition Costs:</strong> Greenflation impacts manufacturing inputs.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Anchor className="text-blue-500" /> Tariffs & Trade
            </h3>
            <div className="space-y-4">
              <p className="text-slate-600 leading-relaxed">
                Renewed protectionism is a key theme. Expect baseline tariffs (10-20%) on imports to become a standard tool of geopolitical leverage, specifically impacting tech hardware and consumer electronics.
              </p>
              <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-2">Impact on Markets:</h4>
                <div className="flex gap-2 flex-wrap">
                  <Badge color="rose">Global Logistics</Badge>
                  <Badge color="rose">Semiconductors</Badge>
                  <Badge color="emerald">Domestic Industrials</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Cuts Timeline */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6 text-slate-800">The Rate Cut Trajectory</h3>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
              <div className="text-center md:text-left">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Q1 2026</div>
                <div className="text-2xl font-bold text-slate-800">Pause & Assess</div>
                <p className="text-sm text-slate-500 mt-2">Fed holds to verify inflation trend.</p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-slate-200 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300"></div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Q2 2026</div>
                <div className="text-2xl font-bold text-indigo-600">First Cut (25bps)</div>
                <p className="text-sm text-slate-500 mt-2">Signaling a shift to support labor.</p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-slate-200 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300"></div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Q4 2026</div>
                <div className="text-2xl font-bold text-purple-600">Stabilization (3.75%)</div>
                <p className="text-sm text-slate-500 mt-2">New neutral rate established.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SECTOR ANALYSIS */}
      <section id="sectors" className="mb-20">
        <SectionHeader 
          title="Sector Watch: The AI Correction" 
          subtitle="Moving from 'Hype' to 'ROI' - The Great Rationalization."
          icon={PieChart}
          colorClass="bg-purple-600"
        />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <InsightCard 
              type="info"
              title="The AI Bubble Dynamics"
              content="By 2026, the initial capex boom for AI infrastructure will likely slow as companies face pressure to show profitability from their AI integrations. We predict a 15-20% correction in pure-play hardware stocks as demand normalizes, while software companies with proven AI-monetization models will outperform."
            />
            <div className="grid md:grid-cols-2 gap-6">
              <InsightCard 
                type="danger"
                title="Risk: Hardware Overcapacity"
                content="Chip inventory buildup may lead to margin compression for semiconductor giants."
              />
              <InsightCard 
                type="success"
                title="Opportunity: Small Cap Value"
                content="As liquidity rotates out of Mega-cap tech, undervalued industrial and healthcare small caps offer better upside."
              />
            </div>
          </div>

          {/* Gold Feature */}
          <div className="bg-gradient-to-br from-amber-100 to-orange-50 rounded-3xl p-8 border border-amber-200 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-amber-500 text-white p-3 rounded-xl shadow-lg shadow-amber-500/30">
                  <Anchor size={24} />
                </div>
                <Badge color="amber">Strong Buy</Badge>
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Gold Forecast</h3>
              <div className="text-5xl font-black text-amber-600 mb-4">$4,500-5,000</div>
              <p className="text-amber-800/80 font-medium">Gold poised for significant upside. Central bank buying (China/India) and geopolitical tensions drive strong demand.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-amber-200/50">
              <p className="text-sm text-amber-700 font-semibold mb-2">Key Drivers:</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/60 px-2 py-1 rounded text-xs text-amber-800">Geopolitical Risk</span>
                <span className="bg-white/60 px-2 py-1 rounded text-xs text-amber-800">Dollar Debasement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STRATEGY */}
      <section id="strategy" className="mb-8">
        <SectionHeader 
          title="Investment Playbook" 
          subtitle="Defensive positioning with targeted growth pockets."
          icon={Shield}
          colorClass="bg-emerald-600"
        />
        <div className="grid md:grid-cols-3 gap-8 h-auto">
          <StrategyBox 
            title="Fixed Income (Bonds)"
            allocation="40"
            riskLevel="Low"
            details="The anchor of the 2026 portfolio. With rates stabilizing, lock in duration. Focus on 5-7 year Treasuries and high-grade corporate credit. The yield curve should normalize, making bonds attractive for income and capital appreciation if a recession hits."
          />
          <StrategyBox 
            title="Quality Equities"
            allocation="35"
            riskLevel="Medium"
            details="Rotation away from pure growth to 'Quality'. Screen for companies with low debt, high free cash flow, and dividend growth. Sectors: Consumer Staples, Healthcare, and Defense. Avoid highly leveraged consumer discretionary."
          />
          <StrategyBox 
            title="Alternatives & Cash"
            allocation="25"
            riskLevel="Medium"
            details="Downside protection is key. 10% Gold allocation as an insurance policy. 15% in Short-term T-Bills or Money Markets to deploy during volatility spikes. This 'Dry Powder' is essential for buying the dip if the AI correction overshoots."
          />
        </div>
      </section>
    </ArticleFrame>
  );
}