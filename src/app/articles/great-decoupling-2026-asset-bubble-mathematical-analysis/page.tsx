'use client';

import React, { useState, useEffect } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ArrowLeft, TrendingUp, AlertTriangle, History, Zap, DollarSign, Cpu, Activity, BookOpen, ArrowDownRight, ShieldAlert, BarChart4, Layers, Search, Globe, ChevronDown, ChevronUp, Brain, Scale, Clock, AlertOctagon, Anchor, Umbrella, Crosshair, MessageCircle, Users, MousePointerClick, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// --- Types ---
interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size: number }>;
  colorClass: string;
}

interface DeepDiveProps {
  title: string;
  children: React.ReactNode;
  color?: "blue" | "amber" | "rose" | "emerald" | "cyan";
}

interface ChartDataItem {
  label: string;
  value: string;
  desc?: string;
  highlight?: boolean;
}

interface SimpleBarChartProps {
  data: ChartDataItem[];
  maxVal: number;
  color?: string;
}

interface MetricBoxProps {
  label: string;
  value: string;
  subtext: string;
  alert?: boolean;
}

interface BiasCardProps {
  icon: React.ComponentType<{ size: number }>;
  title: string;
  desc: string;
  example: string;
}

interface ScenarioCardProps {
  probability: string;
  title: string;
  type: "optimistic" | "base" | "pessimistic";
  description: string;
  outcome: string;
}

interface TimelineItemProps {
  month: string;
  title: string;
  event: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

// --- Components ---
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon: Icon, colorClass }) => (
  <div className="mb-10 border-b-2 border-slate-100 pb-6">
    <div className={`flex items-center gap-3 mb-3 ${colorClass}`}>
      <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
        <Icon size={32} />
      </div>
      <h2 className="text-4xl font-bold font-serif text-slate-800">{title}</h2>
    </div>
    <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">{subtitle}</p>
  </div>
);

const DeepDive: React.FC<DeepDiveProps> = ({ title, children, color = "blue" }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const colors = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    rose: "bg-rose-50 border-rose-200 text-rose-800",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
    cyan: "bg-cyan-50 border-cyan-200 text-cyan-800",
  };

  return (
    <div className={`border-l-4 ${colors[color].replace('bg-', 'border-').split(' ')[1]} my-6 rounded-r-lg overflow-hidden transition-all duration-300 shadow-sm`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 ${colors[color]} font-semibold text-left transition-colors hover:opacity-90`}
      >
        <span className="flex items-center gap-2">
          <BookOpen size={18} />
          Deep Dive: {title}
        </span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="bg-white p-6 text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};
const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, maxVal, color = "bg-blue-500" }) => (
  <div className="space-y-4 w-full bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <h4 className="font-bold text-slate-700 mb-4 border-b pb-2">Historical Comparison</h4>
    {data.map((item, index) => (
      <div key={index} className="flex flex-col">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-semibold text-slate-700">{item.label}</span>
          <span className="font-mono text-slate-500">{item.value}</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${item.highlight ? 'bg-rose-500' : color}`}
            style={{ width: `${(parseFloat(item.value) / maxVal) * 100}%` }}
          />
        </div>
        {item.desc && <span className="text-xs text-slate-400 mt-1">{item.desc}</span>}
      </div>
    ))}
  </div>
);

const MetricBox: React.FC<MetricBoxProps> = ({ label, value, subtext, alert = false }) => (
  <div className={`p-5 rounded-xl ${alert ? 'bg-red-50 border border-red-100 shadow-red-100' : 'bg-white border border-slate-200'} shadow-sm flex flex-col justify-between h-full`}>
    <div>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{label}</div>
      <div className={`text-4xl font-extrabold ${alert ? 'text-red-600' : 'text-slate-800'} tracking-tight`}>{value}</div>
    </div>
    <div className="text-sm text-slate-500 mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
      {alert && <AlertTriangle size={14} className="text-red-500" />}
      {subtext}
    </div>
  </div>
);
// --- Historical Era Component ---
const HistoricalEraSelector: React.FC = () => {
  const [activeEra, setActiveEra] = useState<'1929' | '1987' | '2000' | '2008'>('1929');
  
  const eras = {
    '1929': {
      title: "The Leverage Trap",
      subtitle: "The Great Crash",
      metric: "Margin Debt: 12% of GDP",
      quote: "Stock prices have reached what looks like a permanently high plateau.",
      quoteAuthor: "Irving Fisher, Oct 1929",
      mechanism: "Retail investors bought stocks with 10% down (90% margin). When stocks dipped, brokers issued margin calls, forcing immediate selling, which lowered prices further, triggering more calls.",
      parallel: "Shadow Leverage. In 2026, Private Credit funds use 'subscription lines' (borrowing against investor promises) to boost returns. It is leverage on top of leverage, opaque to regulators.",
      color: "amber"
    },
    '1987': {
      title: "The Liquidity Vacuum",
      subtitle: "Black Monday (-22.6% in one day)",
      metric: "Program Trading: 40% of Volume",
      quote: "It felt like we were dropping into a black hole.",
      quoteAuthor: "Floor Trader",
      mechanism: "Portfolio Insurance algorithms were designed to automatically sell futures when the market dropped to 'hedge' losses. When the market dipped, everyone's bots sold at once, creating a feedback loop.",
      parallel: "0DTE & Volatility Control. Today, '$1 Trillion per day' in 0-Day options creates the same risk. If volatility spikes, 'Vol Control' funds must mechanically sell equities, withdrawing liquidity instantly.",
      color: "orange"
    },
    '2000': {
      title: "The Capex Illusion",
      subtitle: "The Dot-Com Bubble",
      metric: "Nasdaq P/E: 175x",
      quote: "Clicks over bricks. The internet changes economic gravity.",
      quoteAuthor: "Venture Capitalist Consensus",
      mechanism: "Telecoms spent billions laying fiber optic cables (Capex) assuming infinite demand growth. When demand didn't materialize immediately, earnings collapsed, exposing the overbuild.",
      parallel: "The AI Overbuild. Hyperscalers (Google, Meta, MSFT) are spending $600B+ on GPUs. If AI revenue doesn't justify this depreciation cost by Q4 2026, their margins—and stock prices—will crater.",
      color: "purple"
    },
    '2008': {
      title: "The Complexity Trap",
      subtitle: "The Global Financial Crisis",
      metric: "Subprime Defaults: >20%",
      quote: "When the music stops, things will be complicated. But as long as the music is playing, you've got to get up and dance.",
      quoteAuthor: "Chuck Prince, CEO Citigroup",
      mechanism: "Banks held 'AAA' rated assets that were actually bundles of garbage loans (CDOs). No one knew who held the toxic waste, so banks stopped trusting each other.",
      parallel: "Private Credit Opacity. The 'Golden Age of Private Credit' has created $1.7T in loans that are not marked-to-market. When defaults start, no one knows which funds are solvent, freezing the system.",
      color: "rose"
    }
  };

  const current = eras[activeEra];
  
  const colorClasses: Record<string, string> = {
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    rose: "bg-rose-100 text-rose-800 border-rose-200",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex border-b border-slate-100 overflow-x-auto">
        {Object.keys(eras).map((year) => (
          <button
            key={year}
            onClick={() => setActiveEra(year as '1929' | '1987' | '2000' | '2008')}
            className={`flex-1 py-4 px-6 text-sm font-bold transition-all whitespace-nowrap ${
              activeEra === year 
                ? 'bg-slate-50 text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {year}: {eras[year as keyof typeof eras].title}
          </button>
        ))}
      </div>
      
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <h3 className="text-3xl font-serif font-bold text-slate-800">{activeEra}: {current.subtitle}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${colorClasses[current.color]}`}>
            {current.metric}
          </span>
        </div>
        
        <blockquote className="border-l-4 border-slate-300 pl-4 mb-8 italic text-slate-500 font-serif text-lg">
          "{current.quote}"
          <footer className="text-sm text-slate-400 font-sans mt-2 font-normal not-italic">— {current.quoteAuthor}</footer>
        </blockquote>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h4 className="flex items-center gap-2 font-bold text-slate-700 mb-3 text-sm uppercase tracking-wide">
              <History size={16} /> The Mechanism of Collapse
            </h4>
            <p className="text-slate-600 leading-relaxed text-sm">{current.mechanism}</p>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h4 className="flex items-center gap-2 font-bold text-indigo-800 mb-3 text-sm uppercase tracking-wide">
              <Activity size={16} /> The 2026 Parallel
            </h4>
            <p className="text-indigo-900 leading-relaxed text-sm font-medium">{current.parallel}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
// --- Psychology Components ---

const BiasCard: React.FC<BiasCardProps> = ({ icon: Icon, title, desc, example }) => (
  <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-purple-200 transition-colors">
    <div className="flex items-start gap-3 mb-3">
      <div className="p-2 bg-white rounded-lg shadow-sm text-purple-600">
        <Icon size={20} />
      </div>
      <h4 className="font-bold text-slate-800 mt-1">{title}</h4>
    </div>
    <p className="text-sm text-slate-600 mb-3 leading-relaxed">{desc}</p>
    <div className="bg-purple-100/50 p-2 rounded text-xs text-purple-800 font-medium">
      <strong>2026 Example:</strong> {example}
    </div>
  </div>
);
// --- Prediction Components ---
const ScenarioCard: React.FC<ScenarioCardProps> = ({ probability, title, type, description, outcome }) => {
  const typeColors = {
    optimistic: "bg-emerald-500",
    base: "bg-amber-500",
    pessimistic: "bg-rose-600"
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 relative overflow-hidden group hover:border-indigo-500 transition-all">
      <div className={`absolute top-0 left-0 w-1 h-full ${typeColors[type]}`} />
      
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-white text-lg">{title}</h4>
        <span className={`px-2 py-1 rounded text-xs font-bold ${typeColors[type]} text-white`}>
          {probability}
        </span>
      </div>
      
      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{description}</p>
      
      <div className="pt-4 border-t border-slate-700">
        <strong className="text-indigo-400 text-xs uppercase tracking-wide">Outcome:</strong>
        <p className="text-slate-300 text-sm font-medium mt-1">{outcome}</p>
      </div>
    </div>
  );
};

const TimelineItem: React.FC<TimelineItemProps> = ({ month, title, event, icon: Icon }) => (
  <div className="relative pl-8 pb-8 border-l border-slate-700 last:border-0 last:pb-0">
    <div className="absolute -left-[20px] top-0 bg-slate-900 p-2 rounded-full border border-slate-600">
      <Icon size={16} className="text-indigo-400" />
    </div>
    <div>
      <span className="text-xs font-mono text-indigo-400 mb-1 block uppercase">{month}</span>
      <h5 className="font-bold text-white text-lg mb-2">{title}</h5>
      <p className="text-slate-400 text-sm leading-relaxed">{event}</p>
    </div>
  </div>
);
// --- Main Application ---
export default function GreatDecouplingArticle() {
  return (
    <ArticleFrame slug="great-decoupling-2026-asset-bubble-mathematical-analysis">
      <div className="max-w-5xl mx-auto font-sans bg-transparent text-slate-800">
        <div className="mt-8 mb-12">
          <InfographicSlot alt="The Great Decoupling Infographic" />
        </div>
        <main className="space-y-32">
          {/* Introduction */}
          <section>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 prose prose-lg prose-slate">
                <p className="lead text-2xl text-slate-800 font-serif leading-relaxed">
                  We are currently living through the "Everything Bubble." Unlike previous cycles which were sector-specific (Housing in 2008, Dot-Com in 2000), the 2026 anomaly is characterized by the simultaneous inflation of equities, real estate, and private credit.
                </p>
                <p>
                  This report serves as a tutorial on identifying market fragility. We will dissect the current market structure using the <strong className="text-indigo-600">"Four Pillars of Collapse"</strong> framework: Historical Precedence, Valuation Reality, Technological ROI, and Shadow Leverage.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="text-amber-500" size={20}/>
                  Key Risk Indicators
                </h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <span className="text-slate-600">Market Concentration</span>
                    <span className="font-bold text-rose-600">Critical</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <span className="text-slate-600">Retail Sentiment</span>
                    <span className="font-bold text-rose-600">Euphoric</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <span className="text-slate-600">Corporate Debt</span>
                    <span className="font-bold text-amber-500">Elevated</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-600">Liquidity Depth</span>
                    <span className="font-bold text-rose-600">Very Low</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          {/* Section 1: History */}
          <section id="history">
            <SectionHeader 
              title="1. The Historical Anatomy" 
              subtitle="To predict the end of the 2026 bubble, we must first understand the specific mechanics of previous failures. The current market is a hybrid of four distinct historical crises."
              icon={History}
              colorClass="text-amber-600"
            />

            <div className="mb-12">
              <p className="text-lg text-slate-600 mb-6">
                Bubbles do not burst randomly; they burst when the underlying mechanism of leverage or liquidity fails. Click on the eras below to understand the specific "Kill Switch" of each crisis and how it manifests in 2026.
              </p>
              
              {/* Interactive History Module */}
              <HistoricalEraSelector />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="flex items-center gap-2 text-xl font-bold text-slate-800 mb-4">
                  <Layers size={20} className="text-indigo-500"/> The "Nifty Fifty" Echo (1972)
                </h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  In 1972, investors flocked to 50 "one-decision" stocks (Polaroid, Xerox, Kodak) regardless of price, driving P/Es to 80x. The rest of the market was ignored.
                </p>
                <div className="bg-indigo-50 p-3 rounded-lg text-sm text-indigo-800 font-medium">
                  <strong>2026 Comparison:</strong> Today's market is even narrower. The "AI 42" drives 100% of S&P 500 earnings growth. If these 42 stocks falter, the index has no support.
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="flex items-center gap-2 text-xl font-bold text-slate-800 mb-4">
                  <Clock size={20} className="text-indigo-500"/> The Duration Mismatch
                </h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  In every major crisis, there is a mismatch between liabilities (what you owe) and assets (what you own).
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <AlertOctagon size={16} className="text-rose-500 shrink-0"/>
                    <span><strong>2008:</strong> Banks borrowed overnight (repo) to buy 30-year mortgages.</span>
                  </li>
                  <li className="flex gap-2">
                    <AlertOctagon size={16} className="text-rose-500 shrink-0"/>
                    <span><strong>2026:</strong> Private Credit funds promise quarterly liquidity to retail investors but hold 5-year illiquid loans.</span>
                  </li>
                </ul>
              </div>
            </div>

            <DeepDive title="The 'Minsky Moment' Explained" color="amber">
              <p className="mb-4">A <strong>Minsky Moment</strong> (named after economist Hyman Minsky) occurs when a market collapse is brought on by the exhaustion of credit. The cycle has three stages:</p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li><strong>Hedge Finance:</strong> Borrowers can pay principal and interest from cash flow. (Healthy)</li>
                <li><strong>Speculative Finance:</strong> Borrowers can pay interest, but must roll over principal. (Risky)</li>
                <li><strong>Ponzi Finance:</strong> Borrowers cannot pay interest or principal; they borrow just to pay debt service, relying on asset appreciation to bail them out. (Current State 2026)</li>
              </ol>
              <p>In 2026, many private equity-owned software companies are in the "Ponzi" stage, using "PIK" (Payment-in-Kind) loans where interest is added to the debt pile rather than paid in cash.</p>
            </DeepDive>
          </section>
          {/* Section 2: Valuation */}
          <section id="valuation">
            <SectionHeader 
              title="2. The Valuation Conundrum" 
              subtitle="Prices have decoupled from economic reality. We are paying 2030 prices for 2026 earnings."
              icon={BarChart4}
              colorClass="text-rose-600"
            />

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <SimpleBarChart 
                maxVal={45}
                data={[
                  { label: "Historical Mean", value: "16.5", desc: "Long-term average" },
                  { label: "1929 Peak", value: "32.6", desc: "Black Tuesday" },
                  { label: "2000 Peak", value: "44.2", desc: "Dot-Com Crash" },
                  { label: "2007 Peak", value: "27.5", desc: "Housing Crisis" },
                  { label: "2026 Current", value: "39.8", desc: "Current Level", highlight: true },
                ]}
                color="bg-slate-300"
              />

              <div className="space-y-6">
                <MetricBox 
                  label="Buffett Indicator (Total Mkt Cap / GDP)" 
                  value="223.3%" 
                  subtext="Significantly Overvalued (Fair Value is ~100-120%)"
                  alert={true}
                />

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2">The Yield Gap</h4>
                  <p className="text-sm text-slate-600 mb-4">Why buy risky stocks when safe bonds pay 5%?</p>
                  
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium">S&P 500 Earnings Yield</span>
                    <span className="font-bold text-slate-800">3.8%</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium">Risk-Free Rate (T-Bills)</span>
                    <span className="font-bold text-emerald-600">5.1%</span>
                  </div>
                  
                  <div className="mt-4 p-3 bg-rose-100 text-rose-800 text-xs rounded font-bold text-center">
                    Negative Equity Risk Premium (-1.3%)
                  </div>
                </div>
              </div>
            </div>

            <DeepDive title="Understanding Equity Risk Premium (ERP)" color="rose">
              <p><strong>ERP</strong> is the extra return investors demand for holding risky stocks over risk-free government bonds. </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Historically, investors demand a <strong>3% to 5%</strong> premium.</li>
                <li>Currently, the ERP is <strong>negative</strong>. This means you are mathematically paying for the privilege of taking more risk.</li>
                <li>This only makes sense if you believe corporate earnings will grow at explosive, unprecedented rates (the AI narrative). If growth is merely "good," the math collapses.</li>
              </ul>
            </DeepDive>
          </section>
          {/* Section 3: Technology */}
          <section id="tech">
            <SectionHeader 
              title="3. The Physical Constraints" 
              subtitle="The AI revolution is not limited by code, but by physics: Electricity, Heat, and Manufacturing Yields."
              icon={Zap}
              colorClass="text-cyan-600"
            />

            <div className="bg-slate-900 rounded-2xl p-8 text-cyan-50 shadow-2xl relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full blur-[80px] opacity-20"></div>
              
              <h3 className="text-2xl font-bold text-white mb-6 relative z-10">The Energy Bottleneck (2026 Estimate)</h3>
              
              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                <div className="border-l-2 border-cyan-500 pl-4">
                  <div className="text-cyan-400 text-sm font-bold uppercase mb-1">US Data Center Load</div>
                  <div className="text-3xl font-bold text-white">45 GW</div>
                  <div className="text-slate-400 text-xs mt-2">Double the 2022 consumption</div>
                </div>
                <div className="border-l-2 border-cyan-500 pl-4">
                  <div className="text-cyan-400 text-sm font-bold uppercase mb-1">Utility Lead Time</div>
                  <div className="text-3xl font-bold text-white">4-6 Years</div>
                  <div className="text-slate-400 text-xs mt-2">For new high-voltage transmission</div>
                </div>
                <div className="border-l-2 border-cyan-500 pl-4">
                  <div className="text-cyan-400 text-sm font-bold uppercase mb-1">Transformer Backlog</div>
                  <div className="text-3xl font-bold text-white">120 Weeks</div>
                  <div className="text-slate-400 text-xs mt-2">Supply chain fracture</div>
                </div>
              </div>
              
              <div className="mt-8 bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">The Thesis Breaker:</strong> Tech companies have billions in cash to buy chips, but they cannot buy electricity that doesn't exist. "Ghost Data Centers"—facilities filled with servers but lacking power—are beginning to appear in Northern Virginia and Texas. This destroys ROI.
                </p>
              </div>
            </div>
          </section>
          {/* Section 4: Psychology */}
          <section id="psychology">
            <SectionHeader 
              title="4. Market Psychology" 
              subtitle="Markets are not driven by math, but by the biology of the human brain. We are currently in the 'Euphoria' phase, where dopamine overrides risk assessment."
              icon={Brain}
              colorClass="text-purple-600"
            />

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Expanded Content: The Mechanism */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-xl text-slate-800 mb-4 flex items-center gap-2">
                  <Zap className="text-amber-500" /> The Casino Effect: 0DTE
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  In 2026, the market has been "gamified." Retail participation has hit 28% of daily volume, largely driven by <strong>0DTE (Zero Days to Expiration) Options</strong>. This creates a dangerous feedback loop known as a "Gamma Squeeze."
                </p>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="bg-white p-2 rounded shadow-sm font-bold text-purple-600">1</div>
                    <div className="text-sm text-slate-700">Retail traders buy Cheap Call Options (Betting Up).</div>
                  </div>
                  <div className="flex justify-center -my-2 text-slate-300">
                    <ArrowDownRight />
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="bg-white p-2 rounded shadow-sm font-bold text-purple-600">2</div>
                    <div className="text-sm text-slate-700">Market Makers (Banks) sell the option and must <strong>hedge</strong>.</div>
                  </div>
                  <div className="flex justify-center -my-2 text-slate-300">
                    <ArrowDownRight />
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="bg-white p-2 rounded shadow-sm font-bold text-purple-600">3</div>
                    <div className="text-sm text-slate-700">Banks BUY the underlying stock to cover risk.</div>
                  </div>
                  <div className="flex justify-center -my-2 text-slate-300">
                    <ArrowDownRight />
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-rose-50 rounded-lg border border-rose-100">
                    <div className="bg-white p-2 rounded shadow-sm font-bold text-rose-600">4</div>
                    <div className="text-sm text-slate-700 font-bold">Price rises artificially, forcing more buying.</div>
                  </div>
                </div>
              </div>

              {/* Expanded Content: Social Amplification */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100">
                  <h3 className="font-bold text-xl text-indigo-900 mb-4 flex items-center gap-2">
                    <MessageCircle className="text-indigo-500" /> Social Amplification
                  </h3>
                  <p className="text-indigo-800/80 mb-6 text-sm">
                    The speed of information (and misinformation) has accelerated the cycle. "FinTok" and Reddit create consensus narratives instantly.
                  </p>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={16} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-500 uppercase">Herding Behavior</span>
                    </div>
                    <p className="text-sm text-slate-700">
                      "If I don't buy Nvidia now, I am losing money relative to my peers." <br/>
                      <span className="italic text-slate-500">- The fear of relative poverty.</span>
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <MousePointerClick size={16} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-500 uppercase">Illusion of Control</span>
                    </div>
                    <p className="text-sm text-slate-700">
                      Trading apps with confetti animations and one-click margins make speculation feel like a game of skill rather than probability.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                  <div className="text-amber-800 text-sm font-bold flex items-center gap-2">
                    <AlertTriangle size={18} /> The Warning Sign
                  </div>
                  <p className="text-amber-700 text-sm mt-2">
                    When the "shoes shine boy" gives stock tips (1929), or when your Uber driver pitches crypto (2021), the top is near. In 2026, the signal is <strong>AI-generated stock tips</strong> flooding social media.
                  </p>
                </div>
              </div>
            </div>

            {/* New Cognitive Bias Section */}
            <h3 className="font-bold text-slate-800 mb-6 px-2">The Investor's Brain: 3 Cognitive Traps</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <BiasCard 
                icon={Clock}
                title="Recency Bias"
                desc="The tendency to weigh recent events more heavily than long-term history."
                example="Thinking 'Stocks only go up' because the 2022 bear market was short and V-shaped."
              />
              <BiasCard 
                icon={Search}
                title="Confirmation Bias"
                desc="Seeking out information that supports your existing belief and ignoring danger signals."
                example="Ignoring the bond yield inversion because 'AI productivity will fix the economy.'"
              />
              <BiasCard 
                icon={Users}
                title="Social Proof"
                desc="Assuming the actions of others reflect correct behavior."
                example="Buying 0DTE calls because r/WallStreetBets posted a screenshot of a 500% gain."
              />
            </div>
          </section>
          {/* Section 5: Credit */}
          <section id="credit">
            <SectionHeader 
              title="5. The Hidden Trigger: Private Credit" 
              subtitle="The banks are safer than 2008, but the risk has migrated to the unregulated shadows. Private Credit is the new Subprime."
              icon={ShieldAlert}
              colorClass="text-slate-600"
            />

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">The "Volatility Laundering" Mechanism</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      In public markets, if a company struggles, its bond price drops instantly. In Private Credit, the loan is not traded. The fund manager marks the value at "Par" (100 cents on the dollar) even if the company is failing, creating a false sense of stability.
                    </p>
                    <div className="inline-block bg-slate-100 px-3 py-1 rounded text-xs font-bold text-slate-600">
                      Est. Market Size: $1.7 Trillion
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <h4 className="text-sm font-bold text-slate-700 mb-3 border-b pb-2">Level 3 Assets Explained</h4>
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between">
                        <span className="font-medium">Level 1</span>
                        <span className="text-slate-500">Stocks/Bonds (Mark-to-Market)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Level 2</span>
                        <span className="text-slate-500">Observable Inputs (Swaps)</span>
                      </div>
                      <div className="flex justify-between bg-red-50 p-1 -mx-1 rounded">
                        <span className="font-bold text-red-700">Level 3</span>
                        <span className="font-bold text-red-700">"Mark-to-Model" (Guesswork)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DeepDive title="The 'Payment-in-Kind' (PIK) Doom Loop" color="emerald">
                <p className="mb-3">When a borrower cannot pay interest, Private Credit lenders allow them to use <strong>PIK</strong>. </p>
                <p className="mb-3"><strong>Example:</strong> A company owes $100M at 12% interest ($12M/year). They have no cash. Instead of defaulting, the lender says "Okay, now you owe us $112M."</p>
                <p className="font-bold text-emerald-800">The lender records this $12M as "income" and tells investors the fund is performing great, even though no actual cash changed hands. This artificially suppresses default rates until the loan maturity wall hits.</p>
              </DeepDive>
            </div>
          </section>
          {/* Conclusion / Prediction */}
          <section className="bg-slate-900 text-slate-200 p-8 md:p-12 rounded-3xl relative overflow-hidden mt-20 scroll-mt-24" id="prediction">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-20"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8 text-indigo-400">
                <Scale size={32} />
                <h2 className="text-4xl font-bold font-serif text-white">How It Ends: The Prediction</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <ScenarioCard 
                  type="optimistic"
                  title="Soft Landing"
                  probability="15%"
                  description="Productivity gains from AI offset inflation. The Fed cuts rates just in time. Corporate earnings catch up to valuations."
                  outcome="S&P 500 flat for 2 years (Time Correction)."
                />
                <ScenarioCard 
                  type="base"
                  title="Stagflationary Bust"
                  probability="55%"
                  description="Inflation stays sticky (4%). Fed holds rates high. Private credit defaults rise slowly. AI CapEx slows down."
                  outcome="Slow bleed bear market (-25% over 18 months)."
                />
                <ScenarioCard 
                  type="pessimistic"
                  title="Deflationary Crash"
                  probability="30%"
                  description="A major credit event (e.g., a large Private Credit fund gates withdrawals) triggers a liquidity freeze. Forced selling of 'Mag 7' stocks."
                  outcome="Rapid -40% crash in 3 months (2008 style)."
                />
              </div>

              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="text-indigo-400" /> The Crisis Timeline (Base Case)
              </h3>

              <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 mb-12">
                <div className="space-y-2">
                  <TimelineItem 
                    month="Q1 2026"
                    title="The Trigger: Yield Spike"
                    icon={AlertTriangle}
                    event="A failed Treasury auction drives the 10-year yield to 5.2%. Mortgage rates hit 8.5%, freezing the housing market. Small banks report unrealized losses again."
                  />
                  <TimelineItem 
                    month="Q2 2026"
                    title="The Turning Point: AI Miss"
                    icon={Cpu}
                    event="A major Hyperscaler (Meta or Google) guides CapEx down, admitting 'overcapacity.' Nvidia stock drops 20% in a week. The narrative breaks."
                  />
                  <TimelineItem 
                    month="Q3 2026"
                    title="The Credit Event: The Gate"
                    icon={ShieldAlert}
                    event="Retail investors, spooked by the tech selloff, try to pull cash from Private Credit funds (BREIT/Bcred style). Funds hit monthly limits and 'Gate' (freeze) withdrawals. Panic spreads to the broader market."
                  />
                  <TimelineItem 
                    month="Q4 2026"
                    title="The Bottom: Fed Capitulation"
                    icon={Umbrella}
                    event="With S&P 500 down 30%, the Fed finally slashes rates by 100bps in an emergency meeting. The market stabilizes, but the 'AI Premium' is gone forever."
                  />
                </div>
              </div>

              {/* Survival Guide */}
              <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Anchor className="text-indigo-400" /> Portfolio Survival Guide
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-indigo-300 mb-2 text-sm uppercase">What to Avoid</h4>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2">
                        <Crosshair size={16} className="text-rose-500"/> High-Beta Tech (Semiconductors)
                      </li>
                      <li className="flex gap-2">
                        <Crosshair size={16} className="text-rose-500"/> Private Credit / Non-Traded REITs
                      </li>
                      <li className="flex gap-2">
                        <Crosshair size={16} className="text-rose-500"/> Consumer Discretionary Stocks
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-emerald-400 mb-2 text-sm uppercase">Where to Hide</h4>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2">
                        <Umbrella size={16} className="text-emerald-500"/> Short-Duration Treasuries (T-Bills)
                      </li>
                      <li className="flex gap-2">
                        <Umbrella size={16} className="text-emerald-500"/> Gold (Central Bank Buying)
                      </li>
                      <li className="flex gap-2">
                        <Umbrella size={16} className="text-emerald-500"/> Healthcare & Utilities (Defensive)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4">
                <p>© 2026 MacroSystemics Research Group. For Educational Purposes Only.</p>
                <div className="flex gap-4">
                  <span className="hover:text-white cursor-pointer transition-colors">Methodology</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Data Sources</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Legal Disclaimer</span>
                </div>
              </div>
            </div>
          </section>
          {/* Call-to-Action Section */}
          </main>
      </div>
    </ArticleFrame>
  );
}