'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart3, Layers, ShieldCheck, TrendingUp, Users, Cpu, Home, Building2, CreditCard, Info, AlertTriangle, ChevronRight, BookOpen, PieChart, Scale, Briefcase, History, FileText, GanttChartSquare, Lock, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  colorClass: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, subtitle, colorClass }) => (
  <div className="mb-12 text-center">
    <div className={`inline-flex items-center justify-center p-4 rounded-3xl ${colorClass} mb-4 shadow-md text-white`}>
      {icon}
    </div>
    <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
  </div>
);

interface DetailCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  color: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ title, icon: Icon, children, color }) => (
  <div className={`bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 border-t-8 ${color}`}>
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-2 rounded-lg bg-opacity-10 ${color.replace('border-t-', 'bg-').replace('-500', '-100')} ${color.replace('border-t-', 'text-')}`}>
        <Icon size={24} />
      </div>
      <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
    </div>
    <div className="text-slate-600 space-y-4 text-sm leading-relaxed">{children}</div>
  </div>
);

export default function StructuredFinance2026() {
  const currentArticle = articles.find(article => article.slug === 'structured-finance-2026-rmbs-cmbs-abs-pricing-models');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug || ''} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        {/* Return to Home Button */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="relative pt-24 pb-48 overflow-hidden bg-gradient-to-br from-teal-800 via-cyan-700 to-blue-800">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl px-5 py-2 rounded-full border border-white/20 text-white mb-10">
              <Lock size={16} />
              <span className="text-sm font-bold tracking-widest uppercase">Institutional Research Framework</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.05] tracking-tighter">
              Structured <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">Finance 2026</span>
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100 max-w-4xl mx-auto mb-12 font-light leading-relaxed">
              Advanced tutorial on RMBS, CMBS, and ABS pricing models. Master the mechanics of credit enhancement and stochastic valuation.
            </p>
          </div>
        </header>

        {/* Hero Infographic */}
        <section className="max-w-7xl mx-auto px-6 -mt-32 relative z-10 pb-12">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative bg-white"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/I51V5fc.jpeg" 
              alt="Structured Finance 2026 Infographic" 
              className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsImageViewerOpen(true);
              }}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              title="View full screen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
              <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                Click to view full screen
              </div>
            </div>
          </div>
        </section>

        <FullScreenImageViewer
          src="https://i.imgur.com/I51V5fc.jpeg"
          alt="Structured Finance 2026 Infographic"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        <main className="max-w-7xl mx-auto px-6 pb-32">
          {/* Module 1 */}
          <section className="mb-32">
            <SectionHeader 
              icon={<Layers size={36} />}
              title="Module 1: Granular Asset Analysis"
              subtitle="The fundamental unit of structured finance is the asset pool. Understanding collateral quality is the first step in risk assessment."
              colorClass="bg-teal-600"
            />
            <div className="grid lg:grid-cols-3 gap-10">
              <DetailCard title="RMBS: Residential" icon={Home} color="border-t-teal-500">
                <p>RMBS pools consist of home mortgages. Primary risks include <strong>Credit Default</strong> and <strong>Prepayment Velocity</strong>. Analysts use FICO scores and LTV distributions to model loss severity.</p>
                <div className="pt-2 space-y-3">
                  <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                    <span className="font-bold text-blue-700 block">Performance Metric</span>
                    <p className="text-xs">Weighted Average Coupon (WAC) vs. Current Mortgage Rates.</p>
                  </div>
                </div>
              </DetailCard>

              <DetailCard title="CMBS: Commercial" icon={Building2} color="border-t-orange-500">
                <p>CMBS deals pool loans on commercial properties (Offices, Malls, Hotels). They are typically non-recourse and depend heavily on <strong>Net Operating Income (NOI)</strong> and lease renewals.</p>
                <div className="pt-2 space-y-3">
                  <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                    <span className="font-bold text-orange-700 block">DSCR Metric</span>
                    <p className="text-xs">Debt Service Coverage Ratio should typically be &gt; 1.2x for stable office assets.</p>
                  </div>
                </div>
              </DetailCard>

              <DetailCard title="ABS: Consumer Debt" icon={CreditCard} color="border-t-emerald-500">
                <p>ABS pools non-mortgage consumer loans like Auto, Credit Card, and Student debt. Performance is measured by <strong>Charge-off rates</strong> and <strong>Recovery lags</strong>.</p>
                <div className="pt-2 space-y-3">
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                    <span className="font-bold text-emerald-700 block">Structural Feature</span>
                    <p className="text-xs">Excess Spread acts as the first line of defense against consumer defaults.</p>
                  </div>
                </div>
              </DetailCard>
            </div>
          </section>

          {/* Module 2 */}
          <section className="mb-32 bg-white rounded-[3.5rem] p-12 lg:p-20 shadow-2xl shadow-indigo-200/50 border border-slate-100">
            <SectionHeader 
              icon={<ShieldCheck size={36} />}
              title="Module 2: The Structural Waterfall"
              subtitle="How to transform a pool of loans into a multi-tranche security through legal isolation."
              colorClass="bg-indigo-600"
            />
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">SPV & Legal Remoteness</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Securitization requires a <strong>Special Purpose Vehicle (SPV)</strong>. The assets are sold to the SPV in a "True Sale," shielding investors from the originator's bankruptcy.
                  </p>
                  <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <h4 className="font-bold text-indigo-900 mb-2">Enhancement Mechanisms</h4>
                    <ul className="text-sm text-indigo-800 space-y-2">
                      <li>• <strong>Subordination:</strong> Directing losses to lower tranches.</li>
                      <li>• <strong>Overcollateralization:</strong> Assets in pool &gt; Bond principal issued.</li>
                      <li>• <strong>Reserve Accounts:</strong> Cash buffers for interest shortfalls.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <GanttChartSquare size={120} />
                  </div>
                  <h4 className="text-xl font-bold text-cyan-400 mb-4">Payment Priority</h4>
                  <div className="space-y-4 text-sm">
                    <div className="p-3 border-l-4 border-cyan-500 bg-white/5">1. Fees & Expenses</div>
                    <div className="p-3 border-l-4 border-blue-500 bg-white/5">2. Senior (AAA) Interest</div>
                    <div className="p-3 border-l-4 border-indigo-500 bg-white/5">3. Senior (AAA) Principal</div>
                    <div className="p-3 border-l-4 border-rose-500 bg-white/5">4. Mezzanine & Equity</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 3 */}
          <section className="mb-32">
            <SectionHeader 
              icon={<BarChart3 size={36} />}
              title="Module 3: Pricing & Prepayment Models"
              subtitle="Modeling the cash flow timing is the core quantitative challenge in structured credit."
              colorClass="bg-rose-500"
            />
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Weighted Average Life (WAL)</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  MBS do not have a fixed maturity. Analysts calculate the <strong>WAL</strong> by weighting the time to receive each unit of principal repayment.
                </p>
                <div className="bg-slate-950 text-white p-8 rounded-2xl text-center font-mono text-lg shadow-inner mb-8 overflow-x-auto">
                  <div className="whitespace-nowrap">
                    WAL = Σ<sub>t=1</sub><sup>T</sup> (t × Principal_Repayment<sub>t</sub>) / Total_Principal
                  </div>
                </div>
                <p className="text-xs text-slate-500 italic text-center">
                  Where Principal_Repayment includes both scheduled and unscheduled payments.
                </p>
              </div>

              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">The Prepayment Bridge</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Single Monthly Mortality (SMM) is the month-over-month rate of prepayment, derived from the annual CPR.
                </p>
                <div className="bg-slate-950 text-white p-8 rounded-2xl text-center font-mono text-lg shadow-inner mb-8 overflow-x-auto">
                  <div className="whitespace-nowrap">
                    SMM = 1 - (1 - CPR)<sup>1/12</sup>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h4 className="text-slate-800 font-bold mb-2">Option-Adjusted Spread (OAS)</h4>
                  <div className="font-mono text-sm overflow-x-auto py-2">
                    <div className="whitespace-nowrap">
                      Price = (1/K) Σ<sub>k=1</sub><sup>K</sup> Σ<sub>t=1</sub><sup>T</sup> CF<sub>t,k</sub>(r<sub>t,k</sub>) / (1 + r<sub>t,k</sub> + OAS)<sup>t</sup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 4 */}
          <section className="mb-32 bg-slate-900 text-white rounded-[4rem] p-12 lg:p-24 shadow-2xl relative overflow-hidden">
            <SectionHeader 
              icon={<Cpu size={36} />}
              title="Module 4: Stochastic Engineering"
              subtitle="Using SDEs to simulate thousands of potential interest rate paths."
              colorClass="bg-violet-600"
            />
            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              <div>
                <h4 className="text-2xl font-bold text-violet-300 mb-4">Hull-White Dynamics</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  The Hull-White model accounts for mean reversion and matches the initial yield curve.
                </p>
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl font-mono text-lg text-center">
                  <div className="whitespace-nowrap">
                    dr<sub>t</sub> = [θ(t) - αr<sub>t</sub>]dt + σdW<sub>t</sub>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10">
                <h4 className="text-xl font-bold mb-4">Quant Challenges</h4>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li>• <strong>Negative Convexity:</strong> MBS prices are capped because borrowers refinance when rates drop.</li>
                  <li>• <strong>Path Dependency:</strong> Prepayment behavior is influenced by the 'burnout' from previous low-rate periods.</li>
                  <li>• <strong>Default Correlation:</strong> Joint probabilities modeled via Gaussian or Student-t Copulas.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Module 5 */}
          <section className="mb-12">
            <SectionHeader 
              icon={<TrendingUp size={36} />}
              title="Module 5: Investor Accessibility"
              subtitle="From Institutional QIBs to Retail ETFs."
              colorClass="bg-emerald-600"
            />
            <div className="grid md:grid-cols-2 gap-12">
              <DetailCard title="Merits" icon={ShieldCheck} color="border-t-emerald-500">
                <ul className="space-y-4">
                  <li><strong>Yield Pickup:</strong> Complexity premium offers 50-200bps over Corporates.</li>
                  <li><strong>Secured Debt:</strong> Direct claim to underlying collateral (Homes/Cars).</li>
                  <li><strong>Diversification:</strong> Uncorrelated with equity earnings cycles.</li>
                </ul>
              </DetailCard>

              <DetailCard title="Access" icon={Users} color="border-t-blue-500">
                <ul className="space-y-4">
                  <li><strong>ETFs:</strong> MBB (iShares), VMBS (Vanguard) for Agency MBS.</li>
                  <li><strong>Mutual Funds:</strong> PIMCO/DoubleLine for active Non-Agency selection.</li>
                  <li><strong>REITs:</strong> High-yield exposure via mortgage-REIT leverage.</li>
                </ul>
              </DetailCard>
            </div>
          </section>

          {/* Call to Action - Google Doc */}
          {currentArticle?.googleDoc && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl my-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <BookOpen className="inline mr-2" />
                  Read Full Research Paper
                </a>
              </div>
            </div>
          )}
        </main>

        <footer className="bg-slate-950 text-slate-500 py-20 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
