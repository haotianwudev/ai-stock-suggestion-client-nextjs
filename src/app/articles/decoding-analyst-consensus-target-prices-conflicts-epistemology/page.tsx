'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart3, Target, ShieldAlert, Brain, TrendingUp, Users, Search, Scale, AlertTriangle, CheckCircle2, XCircle, HelpCircle, Briefcase, Lock, ArrowRight, BookOpen, PieChart, Activity, Zap, Eye, FileText, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Reusable Components ---
const Section = ({ title, subtitle, children, icon: Icon, color = "blue" }: any) => {
  const colorClasses: any = {
    blue: "bg-blue-50 border-blue-100 text-blue-600",
    purple: "bg-purple-50 border-purple-100 text-purple-600",
    rose: "bg-rose-50 border-rose-100 text-rose-600",
    amber: "bg-amber-50 border-amber-100 text-amber-600",
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
    indigo: "bg-indigo-50 border-indigo-100 text-indigo-600",
    slate: "bg-slate-100 border-slate-200 text-slate-600"
  };

  return (
    <div className="mb-20 relative scroll-mt-24" id={title.toLowerCase().replace(/\s/g, '-')}>
      <div className="flex items-start md:items-center gap-4 mb-8">
        <div className={`p-4 rounded-2xl ${colorClasses[color]} shadow-sm shrink-0`}>
          <Icon size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-slate-500 text-lg mt-1 font-medium">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
};

const Card = ({ title, children, className = "" }: any) => (
  <div className={`bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:shadow-slate-100/50 transition-all duration-300 ${className}`}>
    {title && <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>}
    {children}
  </div>
);

const StatCard = ({ value, label, subtext, color = "blue" }: any) => (
  <div className={`p-6 rounded-2xl bg-white border border-${color}-100 shadow-sm text-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}>
    <div className={`absolute top-0 left-0 w-1 h-full bg-${color}-500`}></div>
    <div className={`text-4xl font-extrabold text-${color}-600 mb-2 tracking-tighter`}>{value}</div>
    <div className="text-slate-800 font-bold mb-2">{label}</div>
    <div className="text-slate-500 text-xs leading-relaxed px-2">{subtext}</div>
  </div>
);

const ComparisonRow = ({ feature, tipranks, bloomberg }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 border-b border-slate-100 last:border-0 items-center group hover:bg-slate-50/50 transition-colors px-4 -mx-4">
    <div className="font-bold text-slate-700">{feature}</div>
    <div className="text-slate-600 text-sm">{tipranks}</div>
    <div className="text-slate-600 text-sm border-l md:border-l-0 border-slate-200 pl-4 md:pl-0">{bloomberg}</div>
  </div>
);

const StrategyItem = ({ title, description, type = "do" }: any) => {
  const isDo = type === "do";
  return (
    <div className={`flex gap-4 p-6 rounded-2xl ${isDo ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'} border transition-all duration-300 hover:shadow-md`}>
      <div className={`mt-1 min-w-[24px] ${isDo ? 'text-emerald-500' : 'text-rose-500'}`}>
        {isDo ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
      </div>
      <div>
        <h4 className={`font-bold ${isDo ? 'text-emerald-900' : 'text-rose-900'} text-lg mb-2`}>{title}</h4>
        <p className="text-slate-700 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const AcademicRef = ({ year, author, finding }: any) => (
  <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl text-sm border border-slate-100">
    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 text-slate-400">
      <BookOpen size={16} />
    </div>
    <div>
      <div className="font-semibold text-slate-800">{author} <span className="text-slate-400 font-normal">({year})</span></div>
      <div className="text-slate-600 mt-1 italic">"{finding}"</div>
    </div>
  </div>
);

// Icons placeholders for custom SVGs
const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const TerminalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

// --- Main App Component ---
export default function AnalystReportApp() {
  const [activeTab, setActiveTab] = useState('mechanics');
  const currentArticle = articles.find(article => article.slug === 'decoding-analyst-consensus-target-prices-conflicts-epistemology');

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title || ''} 
            articleSlug={currentArticle.slug || ''} 
          />
        </>
      )}

      {/* Return to Home Button */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-white relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-indigo-50 to-transparent rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-rose-50 to-transparent rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider mb-8 shadow-lg shadow-indigo-100">
            <Activity size={14} />
            <span>Financial Intelligence Series</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Decoding the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">Analyst Consensus</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
            Target prices are not predictions—they are marketing tools. A forensic guide to TipRanks, Bloomberg, and the epistemology of Wall Street research.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-slate-600 text-sm font-medium">
              <ShieldAlert size={16} className="text-rose-500" />
              <span>Conflict of Interest Warning</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-slate-600 text-sm font-medium">
              <Zap size={16} className="text-amber-500" />
              <span>Leverage Hazards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Infographic - Below Title */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
          <img 
            src="https://i.imgur.com/ovdeXzk.jpeg" 
            alt="Decoding Analyst Consensus Infographic" 
            className="w-full h-auto"
          />
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* 1. The Conflict of Interest */}
        <Section 
          title="The Conflict Engine" 
          subtitle="Why 'Buy' is the default language of Wall Street."
          icon={Briefcase}
          color="indigo"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-white to-indigo-50/50 border-indigo-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                  <Users size={20} />
                </div>
                <h3 className="font-bold text-lg text-indigo-950">The Access Economy</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Analysts need access to C-suite management to write reports. If an analyst slaps a "Sell" rating on a company, the CEO stops taking their calls. 
              </p>
              <div className="bg-white p-5 rounded-xl text-sm border border-indigo-100 shadow-sm">
                <span className="font-bold text-indigo-700 block mb-1">The Result:</span> 
                Analysts "curate" their ratings. "Hold" is often a polite code for "Sell," and "Buy" essentially means "Neutral/Positive."
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-white to-rose-50/50 border-rose-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                  <Lock size={20} />
                </div>
                <h3 className="font-bold text-lg text-rose-950">Investment Banking (IB) Bias</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Research divisions are cost centers. Investment Banking deals (IPOs, M&A) pay the bills. 
              </p>
              <div className="bg-white p-5 rounded-xl text-sm border border-rose-100 shadow-sm">
                <span className="font-bold text-rose-700 block mb-1">The Pressure:</span> 
                While a "Chinese Wall" theoretically separates Research and Banking, analysts are incentivized not to offend potential banking clients with negative coverage.
              </div>
            </Card>
          </div>

          <div className="bg-slate-900 text-slate-300 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6 text-white">
              <Brain size={24} />
              <h3 className="font-bold text-xl">The "Herding" Phenomenon</h3>
            </div>
            <p className="mb-6 text-lg leading-relaxed">
              Analysts face asymmetric career risk. If they are wrong when everyone else is wrong, they are safe. If they are wrong alone, they are fired.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AcademicRef 
                year="2012"
                author="Jegadeesh et al."
                finding="Analysts who deviate significantly from the consensus estimate are more likely to be terminated if incorrect."
              />
              <AcademicRef 
                year="2018"
                author="Hong & Kubik"
                finding="Bold forecasts are rare; most analysts engage in 'herding' behavior, clustering their targets within a tight standard deviation."
              />
            </div>
          </div>
        </Section>

        {/* 2. Platform Wars: TipRanks vs Bloomberg */}
        <Section 
          title="The Platform Wars" 
          subtitle="How TipRanks and Bloomberg calculate truth differently."
          icon={Scale}
          color="blue"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* TipRanks Deep Dive */}
            <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-blue-600 mb-1">TipRanks</h3>
                  <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded">RETAIL FOCUSED</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                  <StarIcon />
                </div>
              </div>
              
              <h4 className="font-bold text-slate-800 mb-3">The "Smart Score" (1-10)</h4>
              <p className="text-sm text-slate-600 mb-4">
                TipRanks aggregates 8 unique datasets to create a single score. It is heavily weighted towards momentum and sentiment.
              </p>
              
              <ul className="space-y-2 text-sm text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> Analyst Ratings (Wall St)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> Insider Activity (Form 4s)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> Hedge Fund Activity (13Fs)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div> Blogger Opinions
                </li>
              </ul>
              
              <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800">
                <strong>Verdict:</strong> Excellent for sentiment analysis and checking an analyst's specific track record. Prone to "Bull Market Bias."
              </div>
            </div>

            {/* Bloomberg Deep Dive */}
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-sm text-slate-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">Bloomberg</h3>
                  <span className="bg-slate-800 text-slate-300 text-xs font-bold px-2 py-1 rounded">INSTITUTIONAL</span>
                </div>
                <div className="bg-slate-800 p-3 rounded-full text-white">
                  <TerminalIcon />
                </div>
              </div>
              
              <h4 className="font-bold text-white mb-3">The ANR Function</h4>
              <p className="text-sm text-slate-400 mb-4">
                Bloomberg ranks analysts using complex weighting that favors "Absolute Return" (BARR).
              </p>
              
              <ul className="space-y-2 text-sm text-slate-400 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> 1-Year Absolute Return
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Timing of Revisions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Accuracy of Earnings Est.
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Cluster Filtering
                </li>
              </ul>
              
              <div className="bg-slate-800 p-4 rounded-xl text-sm text-slate-200 border border-slate-700">
                <strong>Verdict:</strong> The professional standard. Allows users to filter Consensus by only the top 5 most accurate analysts per stock.
              </div>
            </div>
          </div>
        </Section>

        {/* 3. The Data Reality */}
        <Section 
          title="Empirical Reality" 
          subtitle="The numbers don't lie, even if the analysts do."
          icon={Search}
          color="rose"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard 
              value="38%" 
              label="12-Month Accuracy" 
              subtext="Percentage of time price hits target exactly at 12m"
              color="rose"
            />
            <StatCard 
              value="60-65%" 
              label="Directional Accuracy" 
              subtext="Did it go up when they said Buy?"
              color="emerald"
            />
            <StatCard 
              value="94%" 
              label="Heuristic Based" 
              subtext="Models based on simple P/E multiples, not DCF"
              color="amber"
            />
            <StatCard 
              value="High" 
              label="Survivorship Bias" 
              subtext="Failed analysts leave the dataset"
              color="slate"
            />
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Eye className="text-indigo-500" />
              How to Read the "Whisper"
            </h3>
            <div className="relative pt-6">
              <div className="absolute top-6 left-0 w-full h-1 bg-gradient-to-r from-rose-200 via-slate-200 to-emerald-200 rounded-full"></div>
              <div className="flex justify-between relative text-sm font-semibold text-slate-600 mt-4">
                <div className="text-center w-1/3">
                  <div className="w-4 h-4 bg-rose-500 rounded-full border-4 border-white absolute -top-[1.6rem] left-0"></div>
                  <span className="text-rose-600 block mb-1">Public "Hold"</span>
                  <span className="font-normal text-xs text-slate-400">Usually means "Sell"</span>
                </div>
                <div className="text-center w-1/3">
                  <div className="w-4 h-4 bg-slate-400 rounded-full border-4 border-white absolute -top-[1.6rem] left-1/2 -translate-x-1/2"></div>
                  <span className="text-slate-800 block mb-1">Public "Buy"</span>
                  <span className="font-normal text-xs text-slate-400">Means "Neutral/Watch"</span>
                </div>
                <div className="text-center w-1/3 text-right">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full border-4 border-white absolute -top-[1.6rem] right-0"></div>
                  <span className="text-emerald-600 block mb-1">Top Pick / Conviction</span>
                  <span className="font-normal text-xs text-slate-400">Actual "Buy"</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 4. The Leverage Trap - Expanded */}
        <Section 
          title="The Leverage Protocol" 
          subtitle="CRITICAL WARNING: How to avoid margin calls."
          icon={AlertTriangle}
          color="amber"
        >
          <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 mb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 rounded-xl text-amber-600 shrink-0">
                <ShieldAlert size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-3">The "Target Price" Fallacy</h3>
                <p className="text-amber-800 leading-relaxed mb-6 font-medium">
                  Never, ever use an analyst's Price Target to calculate your potential margin runway.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-amber-200/50 shadow-sm">
                    <h4 className="font-bold text-rose-600 mb-2">The Investor's Mistake</h4>
                    <p className="text-sm text-slate-600 italic mb-3">
                      "Stock is $100. Analyst target is $150. That's 50% upside. I can leverage 2x and double my money safely."
                    </p>
                    <div className="text-xs font-bold text-rose-500 bg-rose-50 inline-block px-2 py-1 rounded">
                      Result: Margin Call at $85
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-amber-200/50 shadow-sm">
                    <h4 className="font-bold text-emerald-600 mb-2">The Reality</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Analysts rarely predict the <strong>path</strong> to the target. A stock can drop 30% on bad macro news before hitting the target 18 months later.
                    </p>
                    <div className="text-xs font-bold text-emerald-600 bg-emerald-50 inline-block px-2 py-1 rounded">
                      Rule: Leverage = 0 based on targets
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 5. User Manual & Pitfalls */}
        <Section 
          title="Tactical Application" 
          subtitle="Strategies for the intelligent investor."
          icon={CheckCircle2}
          color="emerald"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-400 text-sm uppercase tracking-wider mb-2 ml-1">What to Do</h3>
              <StrategyItem 
                type="do"
                title="The 'Delta' Strategy"
                description="Ignore the rating level. Look for the *change* (Delta). An upgrade from 'Sell' to 'Hold' is often more bullish than a stale 'Buy'."
              />
              <StrategyItem 
                type="do"
                title="Variance Analysis"
                description="High variance in price targets (e.g., ranging from $100 to $300) indicates high uncertainty. Low variance indicates the move is 'crowded'."
              />
              <StrategyItem 
                type="do"
                title="EPS > Price Target"
                description="Focus on EPS revisions. Price targets are marketing; Earnings estimates are the mathematical inputs for valuation models."
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-slate-400 text-sm uppercase tracking-wider mb-2 ml-1">What to Avoid</h3>
              <StrategyItem 
                type="dont"
                title="The 'Orphan' Buy"
                description="Avoid stocks with only 1 or 2 analyst ratings. You need a consensus to provide liquidity and market interest."
              />
              <StrategyItem 
                type="dont"
                title="Recency Bias"
                description="Do not assume an analyst with a 100% success rate in 2021 is a genius. They likely just had high Beta exposure in a bull run."
              />
              <StrategyItem 
                type="dont"
                title="Anchoring"
                description="When a stock drops from $100 to $80, and the target is $120, don't assume it's 'cheaper' unless the thesis is intact."
              />
            </div>
          </div>
        </Section>

        {/* Call to Action - Podcast & Google Doc */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl my-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {currentArticle?.podcastUrl && (
              <a 
                href={currentArticle.podcastUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
              >
                <Music className="inline mr-2" />
                Listen to Podcast
              </a>
            )}
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                <FileText className="inline mr-2" />
                Read Full Research Paper
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-10 border-t border-slate-200 text-center">
          <div className="flex justify-center items-center gap-2 mb-4 text-slate-400">
            <FileText size={16} />
            <span className="font-semibold text-sm">References & Further Reading</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-left max-w-2xl mx-auto text-xs text-slate-400 mb-10">
            <p>1. Jegadeesh, N., et al. (2010). "Analyzing the Analysts: When Do Recommendations Add Value?"</p>
            <p>2. Groysberg, B. (2010). *Chasing Stars: The Myth of Talent and the Portability of Performance*.</p>
            <p>3. Michaely, R., & Womack, K. (1999). "Conflict of Interest and the Credibility of Underwriter Analyst Recommendations."</p>
            <p>4. Hong, H., & Kubik, J. (2003). "Analyzing the Analysts: Career Concerns and Biased Earnings Forecasts."</p>
          </div>
          <p className="text-slate-500 text-sm mb-2">
            © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
          </p>
          <p className="text-slate-400 text-xs">
            This article is for educational purposes only and does not constitute financial advice.
          </p>
        </div>
      </main>
    </div>
  );
}
