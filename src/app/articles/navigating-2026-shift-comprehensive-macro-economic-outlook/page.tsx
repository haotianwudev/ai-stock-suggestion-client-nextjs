'use client';

import React from 'react';
import { TrendingDown, DollarSign, Activity, Shield, Zap, AlertTriangle, Anchor, Globe, PieChart } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

interface StatTileProps {
  icon: React.ComponentType<{ size: number; className?: string }>;
  value: string;
  label: string;
}

const StatTile: React.FC<StatTileProps> = ({ icon: Icon, value, label }) => (
  <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
    <Icon size={22} className="text-[#A8672E] dark:text-[#D08F52] mb-2" />
    <div className="text-3xl font-mono tabular-nums font-bold text-gray-900 dark:text-white">{value}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</div>
  </div>
);

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, icon: Icon }) => (
  <div className="mb-8 flex items-start gap-3">
    <Icon size={22} className="text-[#A8672E] dark:text-[#D08F52] mt-1 flex-shrink-0" />
    <div>
      <h2 className="font-serif text-2xl md:text-3xl text-gray-900 dark:text-white">{title}</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
    </div>
  </div>
);

interface InsightCardProps {
  title: string;
  content: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  tone?: 'accent' | 'neg';
}

const InsightCard: React.FC<InsightCardProps> = ({ title, content, icon: Icon, tone = 'accent' }) => {
  const toneClass = tone === 'neg'
    ? 'text-[#BC4128] dark:text-[#E2694A]'
    : 'text-[#A8672E] dark:text-[#D08F52]';
  return (
    <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <h3 className={`font-serif text-lg mb-3 flex items-center gap-2 ${toneClass}`}>
        <Icon size={18} /> {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{content}</p>
    </div>
  );
};

const Pill: React.FC<{ tone: 'pos' | 'neg'; children: React.ReactNode }> = ({ tone, children }) => (
  <span
    className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
      tone === 'pos'
        ? 'bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 text-[#1D8A70] dark:text-[#3CBF9C] border-[#1D8A70]/30 dark:border-[#3CBF9C]/30'
        : 'bg-[#BC4128]/10 dark:bg-[#E2694A]/10 text-[#BC4128] dark:text-[#E2694A] border-[#BC4128]/30 dark:border-[#E2694A]/30'
    }`}
  >
    {children}
  </span>
);

interface StrategyBoxProps {
  title: string;
  allocation: string;
  details: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

const riskMeta: Record<StrategyBoxProps['riskLevel'], { label: string; icon: React.ComponentType<{ size: number }> }> = {
  Low: { label: 'Conservative', icon: Shield },
  Medium: { label: 'Balanced', icon: Activity },
  High: { label: 'Aggressive', icon: Zap },
};

const StrategyBox: React.FC<StrategyBoxProps> = ({ title, allocation, details, riskLevel }) => {
  const { label, icon: RiskIcon } = riskMeta[riskLevel];
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col h-full">
      <div className="bg-[#14171B] dark:bg-[#05070A] p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-serif text-lg">{title}</h3>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border border-[#D08F52]/40 text-[#D08F52]">
            <RiskIcon size={12} /> {label}
          </span>
        </div>
        <div className="text-4xl font-mono tabular-nums font-bold text-[#D08F52]">{allocation}%</div>
        <div className="text-gray-400 text-sm mt-1">Suggested Portfolio Weight</div>
      </div>
      <div className="p-6 flex-grow">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{details}</p>
      </div>
    </div>
  );
};

export default function MacroEconomicOutlook2026() {
  return (
    <ArticleFrame slug="navigating-2026-shift-comprehensive-macro-economic-outlook">

      {/* Key Takeaways */}
      <div className="mb-12 p-6 md:p-8 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
        <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-4">Key Takeaways</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">•</span>
            <span className="text-gray-700 dark:text-gray-300">2026 is a stagflationary setup, not a clean soft landing &mdash; sticky service wages and tariff-driven import costs keep inflation elevated even as demand cools.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">•</span>
            <span className="text-gray-700 dark:text-gray-300">Fed cuts arrive gradually: a pause in Q1, a first 25bps cut in Q2, stabilizing near a 3.75% terminal rate by Q4.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">•</span>
            <span className="text-gray-700 dark:text-gray-300">AI capex faces a reckoning &mdash; expect a 15-20% pullback in pure-play hardware as the market rotates toward proven AI monetization and small-cap value.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#1D8A70] dark:text-[#3CBF9C] mr-3 font-bold">•</span>
            <span className="text-[#1D8A70] dark:text-[#3CBF9C] font-medium">Gold is the standout conviction call: $4,500-5,000/oz, driven by central-bank buying and dollar-debasement hedging.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">•</span>
            <span className="text-gray-700 dark:text-gray-300">Recommended playbook: 40% fixed income / 35% quality equities / 25% alternatives &amp; cash, with gold and T-bills as dry powder for volatility.</span>
          </li>
        </ul>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatTile icon={TrendingDown} value="1.8%" label="Proj. Global GDP Growth" />
        <StatTile icon={Activity} value="3.2%" label="Core CPI Forecast" />
        <StatTile icon={DollarSign} value="$4.5-5k" label="Gold Target /oz" />
        <StatTile icon={Activity} value="3.75%" label="Fed Terminal Rate" />
      </div>

      <InfographicSlot alt="2026 Macro Economic Outlook Infographic" />

      {/* SECTION: MACRO LANDSCAPE */}
      <section className="mb-16 mt-16">
        <SectionHeading
          title="The Macro Landscape"
          subtitle="Stagflationary pressures meet protectionist policies."
          icon={Globe}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <InsightCard
            tone="neg"
            icon={AlertTriangle}
            title="Stagflation Risk"
            content={"2026 is poised to be the year where the “soft landing” narrative is tested by structural supply constraints. While demand softens due to exhausted consumer savings, prices remain elevated."}
          />
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <h3 className="font-serif text-lg mb-3 flex items-center gap-2 text-[#A8672E] dark:text-[#D08F52]">
              <Anchor size={18} /> Tariffs &amp; Trade
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Renewed protectionism is a key theme. Expect baseline tariffs (10-20%) on imports to become a standard tool of geopolitical leverage, specifically impacting tech hardware and consumer electronics.
            </p>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Impact on Markets:</p>
              <div className="flex gap-2 flex-wrap">
                <Pill tone="neg">Global Logistics</Pill>
                <Pill tone="neg">Semiconductors</Pill>
                <Pill tone="pos">Domestic Industrials</Pill>
              </div>
            </div>
          </div>
        </div>

        <ul className="space-y-3 mt-6">
          <li className="flex items-start gap-3">
            <span className="text-[#BC4128] dark:text-[#E2694A] font-mono text-sm mt-1">01</span>
            <span className="text-gray-700 dark:text-gray-300"><strong>Wage-Price Persistence:</strong> Service sector wages continue to rise, keeping a floor under core inflation.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#BC4128] dark:text-[#E2694A] font-mono text-sm mt-1">02</span>
            <span className="text-gray-700 dark:text-gray-300"><strong>Energy Transition Costs:</strong> Greenflation impacts manufacturing inputs.</span>
          </li>
        </ul>

        {/* Rate Cuts Timeline */}
        <div className="mt-10">
          <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-4">The Rate Cut Trajectory</h3>
          <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-x-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 min-w-[600px] md:min-w-0">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">Q1 2026</div>
                <div className="font-serif text-xl text-gray-900 dark:text-white">Pause &amp; Assess</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Fed holds to verify inflation trend.</p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-gray-200 dark:bg-gray-800" />
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">Q2 2026</div>
                <div className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52]">First Cut (25bps)</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Signaling a shift to support labor.</p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-gray-200 dark:bg-gray-800" />
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">Q4 2026</div>
                <div className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52]">Stabilization (3.75%)</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">New neutral rate established.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SECTOR ANALYSIS */}
      <section className="mb-16">
        <SectionHeading
          title="Sector Watch: The AI Correction"
          subtitle="Moving from “Hype” to “ROI” — the great rationalization."
          icon={PieChart}
        />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <InsightCard
              icon={Activity}
              title="The AI Bubble Dynamics"
              content="By 2026, the initial capex boom for AI infrastructure will likely slow as companies face pressure to show profitability from their AI integrations. We predict a 15-20% correction in pure-play hardware stocks as demand normalizes, while software companies with proven AI-monetization models will outperform."
            />
            <ComparisonGrid>
              <ComparisonCard tone="neg" title="Risk: Hardware Overcapacity">
                <p>Chip inventory buildup may lead to margin compression for semiconductor giants.</p>
              </ComparisonCard>
              <ComparisonCard tone="pos" title="Opportunity: Small Cap Value">
                <p>As liquidity rotates out of Mega-cap tech, undervalued industrial and healthcare small caps offer better upside.</p>
              </ComparisonCard>
            </ComparisonGrid>
          </div>

          {/* Gold Feature */}
          <div className="rounded-xl p-6 border border-[#1D8A70]/30 dark:border-[#3CBF9C]/30 bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <Anchor size={22} className="text-[#1D8A70] dark:text-[#3CBF9C]" />
                <Pill tone="pos">Strong Buy</Pill>
              </div>
              <h3 className="font-serif text-xl text-[#1D8A70] dark:text-[#3CBF9C] mb-2">Gold Forecast</h3>
              <div className="text-4xl font-mono tabular-nums font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-3">$4,500-5,000</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Gold poised for significant upside. Central bank buying (China/India) and geopolitical tensions drive strong demand.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#1D8A70]/20 dark:border-[#3CBF9C]/20">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Key Drivers</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2 py-1 rounded text-xs text-gray-700 dark:text-gray-300">Geopolitical Risk</span>
                <span className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2 py-1 rounded text-xs text-gray-700 dark:text-gray-300">Dollar Debasement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: STRATEGY */}
      <section>
        <SectionHeading
          title="Investment Playbook"
          subtitle="Defensive positioning with targeted growth pockets."
          icon={Shield}
        />
        <div className="grid md:grid-cols-3 gap-6">
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
