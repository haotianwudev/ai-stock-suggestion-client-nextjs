'use client';

import React from 'react';
import { Building2, TrendingDown, Shield, AlertTriangle, Calculator, Layers, DollarSign, BarChart3, Activity, Clock, CheckCircle, PieChart, Target, FileText } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Reusable Components ---
const SectionHeader = ({ title, subtitle, icon: Icon, colorClass }: { title: string; subtitle: string; icon: React.ElementType; colorClass: string }) => (
  <div className={`mb-8 border-l-4 ${colorClass} pl-6 py-2`}>
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-lg ${colorClass.replace('border-', 'bg-').replace('600', '100')} text-${colorClass.split('-')[1]}-700`}>
        <Icon size={28} />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-white">{title}</h2>
    </div>
    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">{subtitle}</p>
  </div>
);

const ConceptCard = ({ title, description, children, accentColor }: { title: string; description: string; children?: React.ReactNode; accentColor: string }) => (
  <div className="bg-white dark:bg-[#14171B] rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10 overflow-hidden hover:shadow-md dark:hover:shadow-none transition-shadow duration-300">
    <div className={`h-1 w-full bg-${accentColor}-500`} />
    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">{title}</h3>
      <div className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">{description}</div>
      {children && <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">{children}</div>}
    </div>
  </div>
);

const DetailList = ({ items }: { items: Array<{ label: string; text: string }> }) => (
  <ul className="space-y-2">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
        <CheckCircle className="w-4 h-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
        <span>
          <strong className="font-semibold text-slate-900 dark:text-white">{item.label}:</strong> {item.text}
        </span>
      </li>
    ))}
  </ul>
);

export default function StructuredFinanceArticle() {
  return (
    <ArticleFrame slug="structured-finance-2026-rmbs-cmbs-abs-pricing-models">
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] font-sans text-slate-900 dark:text-slate-300 selection:bg-blue-100">
        <div className="absolute top-8 left-8 z-20">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-purple-600 text-white shadow-lg">
            Deep Research
          </span>
        </div>

        <header className="bg-white dark:bg-[#14171B] border-b border-slate-200 dark:border-white/10 py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/40 rounded-full mb-6 text-blue-700 dark:text-blue-400">
              <Building2 size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              Structured Finance 2026
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Advanced Tutorial on RMBS, CMBS, and ABS Pricing Models. Master the mechanics of credit enhancement and stochastic valuation in structured finance.
            </p>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <InfographicSlot alt="Structured Finance 2026 - RMBS, CMBS, ABS Framework" />
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
          
          {/* Introduction */}
          <section className="max-w-5xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                Structured finance represents one of the most sophisticated applications of financial engineering—transforming illiquid, heterogeneous cash flows into tradable securities through <strong>tranching, credit enhancement, and stochastic modeling</strong>. From residential mortgages to auto loans, the securitization process enables capital markets to fund the real economy while distributing risk across institutional investors.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                This comprehensive tutorial deconstructs the <strong>quantitative architecture</strong> of three major asset-backed security (ABS) classes: <strong>RMBS (Residential Mortgage-Backed Securities)</strong>, <strong>CMBS (Commercial Mortgage-Backed Securities)</strong>, and <strong>ABS (Asset-Backed Securities)</strong>. We explore structural waterfalls, prepayment models, credit enhancement mechanisms, and the Monte Carlo frameworks that power institutional pricing desks.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-900/50 p-6 rounded-r-lg mb-8">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-400 mb-2">What You'll Master</h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span><strong>Securitization Mechanics:</strong> SPV structures, true sale accounting, and bankruptcy remoteness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span><strong>Waterfall Architecture:</strong> Sequential vs. pro-rata payment structures and trigger events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span><strong>Credit Enhancement:</strong> Subordination, overcollateralization, reserve accounts, and excess spread</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span><strong>Prepayment Models:</strong> PSA curves, CPR/SMM metrics, and S-curve refinancing behavior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span><strong>RMBS Analytics:</strong> Agency vs. non-agency structures, conforming loan limits, and GSE guarantees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span><strong>CMBS Mechanics:</strong> DSCR/LTV covenants, lockout periods, and defeasance structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span><strong>ABS Diversity:</strong> Auto loans, credit cards, student loans, and esoteric collateral</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <span><strong>Monte Carlo Pricing:</strong> Path-dependent cash flows, OAS spreads, and scenario analysis</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 1: Securitization Fundamentals */}
          <section id="securitization-fundamentals">
            <SectionHeader 
              title="Securitization Fundamentals" 
              subtitle="The financial alchemy that transforms illiquid assets into tradable securities through legal isolation and structural credit enhancement."
              icon={Layers}
              colorClass="border-blue-600"
            />

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>Securitization</strong> is the process of pooling contractual debt obligations (mortgages, auto loans, credit card receivables) and issuing securities backed by those cash flows. The fundamental innovation is <strong>bankruptcy remoteness</strong>—isolating assets in a Special Purpose Vehicle (SPV) so that the originator's credit risk doesn't contaminate the securities.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                This separation enables <strong>tranching</strong>: slicing the capital structure into layers with different risk/return profiles. Senior tranches receive priority in the payment waterfall and earn AAA ratings, while junior tranches absorb first losses and demand higher yields. The result is a <em>credit transformation</em> where a pool of BB-rated loans can produce AAA-rated securities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white">The SPV Structure</h3>
                <p className="text-slate-600 dark:text-slate-400">The Special Purpose Vehicle is the legal entity that owns the asset pool and issues securities. Its design ensures that investors have recourse only to the collateral, not the originator.</p>
                
                <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                  <h4 className="font-bold text-blue-900 dark:text-blue-400 mb-4">Key SPV Characteristics</h4>
                  <DetailList items={[
                    { label: "True Sale", text: "Assets are legally sold to the SPV, not pledged as collateral. This prevents consolidation on the originator's balance sheet and protects against bankruptcy clawback." },
                    { label: "Limited Purpose", text: "The SPV can only hold the specified assets and issue securities. No other business activities are permitted, minimizing operational risk." },
                    { label: "Non-Recourse", text: "Investors cannot pursue the originator if the collateral underperforms. Their claim is limited to the asset pool's cash flows." },
                    { label: "Independent Director", text: "At least one SPV board member must be independent to prevent the originator from forcing bankruptcy or asset sales." }
                  ]} />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 dark:text-blue-400 mb-2">Why This Matters</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Without bankruptcy remoteness, a securitization would be rated based on the <strong>originator's credit</strong>, not the collateral quality. The SPV structure enables a mortgage lender with a BBB rating to issue AAA-rated RMBS if the underlying loans and credit enhancement are sufficient.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#14171B] p-8 rounded-2xl shadow-sm dark:shadow-none border border-slate-200 dark:border-white/10">
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">Tranching & Waterfall Mechanics</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  The payment waterfall defines the <strong>priority of claims</strong> on the asset pool's cash flows. Each payment period, collections are distributed according to a strict hierarchy.
                </p>
                
                <div className="space-y-4">
                  <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-green-500 ring-4 ring-white dark:ring-[#14171B]"></div>
                      <h4 className="font-bold text-slate-900 dark:text-white">1. Fees & Expenses</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Servicer fees, trustee fees, and administrative costs are paid first. Typically 0.25-0.50% annually of the outstanding balance.
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white dark:ring-[#14171B]"></div>
                      <h4 className="font-bold text-slate-900 dark:text-white">2. Senior Tranche Interest</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Class A notes receive their contractual coupon. These are typically AAA-rated and have the lowest yield.
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-blue-400 ring-4 ring-white dark:ring-[#14171B]"></div>
                      <h4 className="font-bold text-slate-900 dark:text-white">3. Senior Tranche Principal</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Scheduled and unscheduled principal payments (prepayments) are used to pay down Class A notes until fully retired.
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-orange-400 ring-4 ring-white dark:ring-[#14171B]"></div>
                      <h4 className="font-bold text-slate-900 dark:text-white">4. Mezzanine Tranche Interest</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Class B/C notes receive interest only after senior obligations are met. Rated AA to BBB.
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-red-400 ring-4 ring-white dark:ring-[#14171B]"></div>
                      <h4 className="font-bold text-slate-900 dark:text-white">5. Subordinated/Equity</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Residual cash flows go to the equity tranche (often retained by the originator). This piece absorbs first losses and is unrated.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 dark:text-blue-400 mb-2">Sequential vs. Pro-Rata</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                    <strong>Sequential Pay:</strong> Senior tranches are paid off completely before mezzanine tranches receive principal. Provides maximum credit protection but extends duration for junior notes.
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Pro-Rata Pay:</strong> Principal is distributed proportionally across tranches. Reduces extension risk for junior notes but increases credit risk for seniors.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ConceptCard 
                title="Subordination" 
                description="The most common form of credit enhancement. Junior tranches absorb losses before senior tranches are impaired. If 20% of the capital structure is subordinated, the senior tranche can withstand a 20% cumulative default rate (assuming zero recovery)." 
                accentColor="blue" 
              />
              <ConceptCard 
                title="Overcollateralization" 
                description="The asset pool's par value exceeds the securities' par value. Example: $105M of loans backing $100M of bonds. The $5M cushion absorbs losses. OC ratios are tested quarterly and trigger sequential pay if breached." 
                accentColor="blue" 
              />
              <ConceptCard 
                title="Excess Spread" 
                description="The difference between the weighted average coupon (WAC) of the collateral and the weighted average coupon of the securities plus fees. Excess spread is trapped in a reserve account to cover future losses." 
                accentColor="blue" 
              />
            </div>
          </section>


          {/* Section 2: RMBS - Residential Mortgage-Backed Securities */}
          <section id="rmbs">
            <SectionHeader 
              title="RMBS: Residential Mortgage-Backed Securities" 
              subtitle="The largest segment of the structured finance market. Understanding agency guarantees, conforming loan limits, and prepayment behavior."
              icon={Building2}
              colorClass="border-emerald-600"
            />

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>RMBS</strong> are securities backed by pools of residential mortgages. The market is bifurcated into <strong>Agency RMBS</strong> (issued or guaranteed by Fannie Mae, Freddie Mac, or Ginnie Mae) and <strong>Non-Agency RMBS</strong> (private-label securities with no government backing). Agency RMBS carry implicit or explicit government guarantees, making them virtually credit-risk-free but subject to significant prepayment risk.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The 2008 financial crisis was triggered by the collapse of non-agency RMBS backed by subprime mortgages. Post-crisis reforms (Dodd-Frank, Qualified Mortgage rules) have dramatically tightened underwriting standards, but the fundamental mechanics remain unchanged.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white">Agency vs. Non-Agency</h3>
                
                <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-400 mb-4 flex items-center gap-2">
                    <Shield size={20} /> Agency RMBS
                  </h4>
                  <DetailList items={[
                    { label: "Conforming Limits", text: "$766,550 for single-family homes in most areas (2024). Loans above this threshold are 'jumbo' and ineligible for agency securitization." },
                    { label: "Credit Standards", text: "Minimum FICO scores (typically 620+), maximum LTV ratios (80-97% depending on program), and debt-to-income limits (43-50%)." },
                    { label: "Guarantee Structure", text: "Fannie/Freddie guarantee timely payment of principal and interest even if borrowers default. Ginnie Mae securities are backed by the full faith and credit of the US government." },
                    { label: "Prepayment Risk", text: "The primary risk for investors. When rates fall, borrowers refinance, returning principal at par and forcing reinvestment at lower yields (negative convexity)." }
                  ]} />
                </div>

                <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                  <h4 className="font-bold text-red-900 dark:text-red-400 mb-4 flex items-center gap-2">
                    <AlertTriangle size={20} /> Non-Agency RMBS
                  </h4>
                  <DetailList items={[
                    { label: "No Guarantee", text: "Investors bear full credit risk. Tranching and credit enhancement are critical to achieving investment-grade ratings." },
                    { label: "Jumbo Loans", text: "High-quality mortgages above conforming limits. Borrowers typically have excellent credit (FICO 740+) and substantial down payments." },
                    { label: "Alt-A & Subprime", text: "Pre-crisis categories for borrowers with impaired credit or limited documentation. Largely extinct post-2008 but making a cautious return as 'non-QM' loans." },
                    { label: "Credit Enhancement", text: "Subordination levels of 10-30% are common. Senior tranches may also have insurance wraps or reserve accounts." }
                  ]} />
                </div>
              </div>

              <div className="bg-white dark:bg-[#14171B] p-8 rounded-2xl shadow-sm dark:shadow-none border border-slate-200 dark:border-white/10">
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">Prepayment Modeling: The PSA Curve</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Prepayment risk is the defining characteristic of RMBS. The <strong>Public Securities Association (PSA) model</strong> provides a standardized benchmark for measuring prepayment speeds.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/30 rounded-lg p-4">
                    <h4 className="font-bold text-emerald-900 dark:text-emerald-400 mb-2">100% PSA Assumption</h4>
                    <p className="text-sm text-emerald-800 dark:text-emerald-300 mb-3">
                      The baseline model assumes prepayment rates increase linearly from 0% CPR (Conditional Prepayment Rate) at origination to 6% CPR at month 30, then remain constant thereafter.
                    </p>
                    <div className="bg-white dark:bg-[#14171B] p-3 rounded border border-emerald-100 dark:border-emerald-900/30">
                      <p className="text-xs font-mono text-slate-700 dark:text-slate-300">
                        CPR(t) = min(6% × (t / 30), 6%) for t in months
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        Example: At month 15, CPR = 6% × (15/30) = 3% annually
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 dark:text-white">Key Prepayment Metrics</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-200 dark:border-white/10">
                        <p className="font-semibold text-slate-800 dark:text-white text-sm">CPR (Conditional Prepayment Rate)</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Annualized percentage of the outstanding principal that prepays. 6% CPR means 6% of the pool prepays each year.</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-200 dark:border-white/10">
                        <p className="font-semibold text-slate-800 dark:text-white text-sm">SMM (Single Monthly Mortality)</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Monthly prepayment rate. SMM = 1 - (1 - CPR)^(1/12). Used for monthly cash flow projections.</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-200 dark:border-white/10">
                        <p className="font-semibold text-slate-800 dark:text-white text-sm">PSA Multiple</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Actual prepayment speed relative to 100% PSA. 200% PSA means prepayments are twice the baseline (12% CPR at maturity).</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-lg p-4">
                    <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-2 flex items-center gap-2">
                      <TrendingDown size={16} /> Refinancing S-Curve
                    </h4>
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      Prepayment speeds exhibit an <strong>S-curve relationship</strong> with interest rate changes. When rates fall 50-100 bps below the pool's WAC (Weighted Average Coupon), refinancing activity accelerates dramatically. Below 200 bps, the curve flattens as most refinanceable borrowers have already acted (burnout effect).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-100 dark:border-emerald-900/30">
              <h4 className="text-emerald-900 dark:text-emerald-400 font-bold flex items-center gap-2 mb-3">
                <Calculator size={18} /> Weighted Average Life (WAL) Calculation
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                The WAL measures the average time until principal is returned to investors. It's critical for duration matching and immunization strategies.
              </p>
              <div className="bg-white dark:bg-black/40 p-4 rounded-lg border border-emerald-200 dark:border-emerald-900/30">
                <p className="font-mono text-sm text-slate-800 dark:text-white mb-2">
                  WAL = Σ (t × Principal_t) / Total Principal
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Where t is the time period and Principal_t is the principal payment in period t. A 30-year mortgage at 100% PSA has a WAL of approximately 7-8 years, not 30 years, due to prepayments.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: CMBS - Commercial Mortgage-Backed Securities */}
          <section id="cmbs">
            <SectionHeader 
              title="CMBS: Commercial Mortgage-Backed Securities" 
              subtitle="Securitized commercial real estate debt with structural protections against prepayment and sophisticated loss mitigation frameworks."
              icon={Building2}
              colorClass="border-purple-600"
            />

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>CMBS</strong> are backed by loans secured by income-producing commercial properties: office buildings, retail centers, hotels, multifamily apartments, and industrial warehouses. Unlike RMBS, CMBS loans are <strong>non-recourse</strong> (lenders can only seize the property, not pursue the borrower personally) and feature <strong>prepayment protection</strong> mechanisms that reduce refinancing risk.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The CMBS market is characterized by <strong>loan-level heterogeneity</strong>—each property has unique cash flows, tenant profiles, and geographic risks. This complexity necessitates sophisticated underwriting and ongoing surveillance by special servicers who manage distressed assets.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white">Underwriting Metrics</h3>
                <p className="text-slate-600">CMBS loans are underwritten based on property-level cash flow analysis, not borrower creditworthiness. Two ratios dominate:</p>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                    <h4 className="font-bold text-purple-900 dark:text-purple-400 mb-3 flex items-center gap-2">
                      <DollarSign size={20} /> DSCR (Debt Service Coverage Ratio)
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-100 dark:border-purple-900/30">
                        <p className="font-mono text-sm text-slate-800 dark:text-white">
                          DSCR = Net Operating Income / Debt Service
                        </p>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Measures the property's ability to cover loan payments. A DSCR of 1.25x means NOI is 25% higher than required debt service. Typical minimums:
                      </p>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pl-4">
                        <li>&bull; Multifamily: 1.20x - 1.25x</li>
                        <li>&bull; Office/Retail: 1.25x - 1.35x</li>
                        <li>&bull; Hotels: 1.40x - 1.50x (higher volatility)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                    <h4 className="font-bold text-purple-900 dark:text-purple-400 mb-3 flex items-center gap-2">
                      <PieChart size={20} /> LTV (Loan-to-Value Ratio)
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-100 dark:border-purple-900/30">
                        <p className="font-mono text-sm text-slate-800 dark:text-white">
                          LTV = Loan Amount / Appraised Value
                        </p>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Measures equity cushion. Lower LTV provides greater loss protection. Typical maximums:
                      </p>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 pl-4">
                        <li>&bull; Stabilized Properties: 65% - 75%</li>
                        <li>&bull; Value-Add/Transitional: 55% - 65%</li>
                        <li>&bull; Construction Loans: 50% - 60%</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-900/30 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 dark:text-purple-400 mb-2">Covenant Testing</h4>
                  <p className="text-sm text-purple-800 dark:text-purple-300">
                    CMBS loan documents require quarterly DSCR and LTV testing. If covenants are breached, <strong>cash trap provisions</strong> activate: excess cash flow is swept into a reserve account rather than distributed to the borrower. This provides a cushion for future debt service.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#14171B] p-8 rounded-2xl shadow-sm dark:shadow-none border border-slate-200 dark:border-white/10">
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">Prepayment Protection</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Unlike RMBS, CMBS loans include <strong>structural barriers</strong> to prepayment that protect investors from reinvestment risk. These mechanisms are critical to pricing and duration management.
                </p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4 py-2">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">1. Lockout Period</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Absolute prohibition on prepayment for the first 2-5 years of the loan term. Borrowers cannot refinance regardless of rate environment. Provides certainty for investors seeking stable cash flows.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-4 py-2">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">2. Yield Maintenance</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      After lockout, borrowers can prepay but must compensate investors for lost interest income. The penalty equals the present value of remaining cash flows discounted at the Treasury rate plus a spread.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-900/40 p-3 rounded text-xs font-mono text-slate-700 dark:text-slate-300 mt-2">
                      Penalty = PV(Remaining CF) - Outstanding Principal
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-300 pl-4 py-2">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">3. Defeasance</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      The borrower substitutes the property collateral with a portfolio of Treasury securities that replicates the loan's cash flows. The CMBS investors continue receiving their contractual payments, but now backed by risk-free Treasuries.
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                      Defeasance is expensive (legal costs + Treasury purchase) but allows property sale without loan payoff. Common in the final 2-3 years of the loan term.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-200 pl-4 py-2">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">4. Step-Down Prepayment Penalty</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      A declining penalty schedule (e.g., 5-4-3-2-1% of outstanding balance) in the final years. Simpler than yield maintenance but provides less protection.
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-900/30 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 dark:text-purple-400 mb-2">Impact on Duration</h4>
                  <p className="text-sm text-purple-800 dark:text-purple-300">
                    These protections make CMBS behave more like <strong>corporate bonds</strong> than RMBS. Effective duration is closer to stated maturity, and negative convexity is minimal. This makes CMBS attractive for liability-driven investors (pensions, insurance companies) seeking predictable cash flows.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                <h4 className="font-bold text-purple-900 dark:text-purple-400 mb-4 flex items-center gap-2">
                  <Target size={20} /> Special Servicer Role
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  When a loan becomes distressed (60+ days delinquent or DSCR &lt; 1.0x), servicing transfers from the master servicer to a <strong>special servicer</strong> with expertise in workouts and foreclosures.
                </p>
                <DetailList items={[
                  { label: "Loan Modifications", text: "Extend maturity, reduce interest rate, or provide additional funding to stabilize the property." },
                  { label: "Foreclosure", text: "Seize the property and sell it to recover principal. The special servicer acts as a fiduciary for the most junior tranche that would be impaired by the loss." },
                  { label: "REO Management", text: "If the property doesn't sell immediately, the special servicer manages it as Real Estate Owned until disposition." }
                ]} />
              </div>

              <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                <h4 className="font-bold text-purple-900 dark:text-purple-400 mb-4 flex items-center gap-2">
                  <BarChart3 size={20} /> Property Type Risk Profiles
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900/40 rounded">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Multifamily</span>
                    <span className="text-xs text-green-600 dark:text-green-400 font-semibold">Lowest Risk</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900/40 rounded">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Industrial</span>
                    <span className="text-xs text-green-600 dark:text-green-400 font-semibold">Low Risk</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900/40 rounded">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Office</span>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Medium Risk</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900/40 rounded">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Retail</span>
                    <span className="text-xs text-orange-600 dark:text-orange-400 font-semibold">High Risk</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900/40 rounded">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Hotel</span>
                    <span className="text-xs text-red-600 dark:text-red-400 font-semibold">Highest Risk</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                  Risk rankings reflect cash flow volatility, tenant concentration, and economic sensitivity. Hotels have daily lease terms and no tenant improvement costs, making them highly cyclical.
                </p>
              </div>
            </div>
          </section>


          {/* Section 4: ABS - Asset-Backed Securities */}
          <section id="abs">
            <SectionHeader 
              title="ABS: Asset-Backed Securities" 
              subtitle="Securitization beyond mortgages. From auto loans to credit cards, understanding the diversity of consumer and commercial receivables."
              icon={Activity}
              colorClass="border-orange-600"
            />

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>Asset-Backed Securities (ABS)</strong> encompass all securitizations not backed by real estate. The collateral ranges from auto loans and credit card receivables to student loans, equipment leases, and even more esoteric assets like aircraft leases or royalty streams. Each asset class has unique cash flow characteristics, credit risk profiles, and structural features.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The ABS market is highly <strong>standardized</strong> compared to CMBS, with most deals following template structures developed by rating agencies. This standardization enables efficient pricing and secondary market liquidity, making ABS a core holding for money market funds, insurance companies, and bank treasury portfolios.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              <ConceptCard 
                title="Auto Loan ABS" 
                description="Backed by pools of car loans or leases. Highly predictable cash flows due to short duration (3-5 years) and low default rates (1-3% for prime borrowers). Prepayments are minimal due to lack of refinancing incentive." 
                accentColor="orange"
              >
                <div className="text-xs text-slate-600 space-y-2">
                  <p><strong>Collateral:</strong> New and used vehicle loans</p>
                  <p><strong>Typical Structure:</strong> 3-year revolving period, then amortization</p>
                  <p><strong>Credit Enhancement:</strong> 10-20% subordination</p>
                  <p><strong>Key Risk:</strong> Used car value depreciation</p>
                </div>
              </ConceptCard>

              <ConceptCard 
                title="Credit Card ABS" 
                description="Backed by revolving credit card receivables. Unique 'master trust' structure where the same pool backs multiple series of bonds. Monthly payment rate (MPR) is the key performance metric." 
                accentColor="orange"
              >
                <div className="text-xs text-slate-600 space-y-2">
                  <p><strong>Collateral:</strong> Credit card balances</p>
                  <p><strong>Typical Structure:</strong> 18-month revolving period</p>
                  <p><strong>Credit Enhancement:</strong> 15-25% subordination + excess spread</p>
                  <p><strong>Key Risk:</strong> Payment rate decline (consumers pay minimum only)</p>
                </div>
              </ConceptCard>

              <ConceptCard 
                title="Student Loan ABS" 
                description="Backed by private student loans (not federal loans, which cannot be securitized). Long duration (10-20 years) and high prepayment variability. Deferment and forbearance options complicate cash flow modeling." 
                accentColor="orange"
              >
                <div className="text-xs text-slate-600 space-y-2">
                  <p><strong>Collateral:</strong> Private student loans</p>
                  <p><strong>Typical Structure:</strong> Sequential pay with turbo amortization</p>
                  <p><strong>Credit Enhancement:</strong> 20-35% subordination</p>
                  <p><strong>Key Risk:</strong> Unemployment-driven defaults</p>
                </div>
              </ConceptCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-[#14171B] p-8 rounded-2xl shadow-sm dark:shadow-none border border-slate-200 dark:border-white/10">
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">Revolving Structures: Credit Card ABS</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Credit card ABS use a <strong>master trust</strong> structure where new receivables continuously replace paid-off balances during the <strong>revolving period</strong>. This maintains a stable collateral pool size.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/30 rounded-lg p-4">
                    <h4 className="font-bold text-orange-900 dark:text-orange-400 mb-2">Revolving Period (Months 1-18)</h4>
                    <p className="text-sm text-orange-800 dark:text-orange-300 mb-2">
                      Principal collections are used to purchase new receivables from the originator. Investors receive only interest payments. The collateral balance remains constant.
                    </p>
                    <div className="bg-white dark:bg-[#14171B] p-3 rounded text-xs font-mono text-slate-700 dark:text-slate-300">
                      New Receivables = Principal Collections
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/30 rounded-lg p-4">
                    <h4 className="font-bold text-orange-900 dark:text-orange-400 mb-2">Amortization Period (Months 19+)</h4>
                    <p className="text-sm text-orange-800 dark:text-orange-300 mb-2">
                      Principal collections are distributed to investors according to the waterfall. No new receivables are purchased. The collateral balance declines to zero.
                    </p>
                    <div className="bg-white dark:bg-[#14171B] p-3 rounded text-xs font-mono text-slate-700 dark:text-slate-300">
                      Principal Payment = Collections × Allocation %
                    </div>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg p-4">
                    <h4 className="font-bold text-red-900 dark:text-red-400 mb-2 flex items-center gap-2">
                      <AlertTriangle size={16} /> Early Amortization Triggers
                    </h4>
                    <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                      If portfolio performance deteriorates, the revolving period terminates early and amortization begins immediately. Triggers include:
                    </p>
                    <ul className="text-xs text-red-700 dark:text-red-300 space-y-1 pl-4">
                      <li>&bull; 3-month average excess spread &lt; 0%</li>
                      <li>&bull; Charge-off rate &gt; 10% (annualized)</li>
                      <li>&bull; Payment rate &lt; 10% (consumers stop paying)</li>
                      <li>&bull; Seller/servicer default or bankruptcy</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white">Key Performance Metrics</h3>
                <p className="text-slate-600 dark:text-slate-400">ABS investors monitor monthly performance reports to assess collateral health and predict cash flows.</p>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white dark:bg-[#14171B] p-5 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                    <h4 className="font-bold text-orange-900 dark:text-orange-400 mb-2 flex items-center gap-2">
                      <Calculator size={18} /> Monthly Payment Rate (MPR)
                    </h4>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-100 dark:border-orange-900/30 mb-2">
                      <p className="font-mono text-sm text-slate-800 dark:text-white">
                        MPR = Monthly Collections / Beginning Balance
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Measures how quickly borrowers pay down balances. Healthy credit card portfolios have MPR of 15-20%. Below 10% signals distress (consumers paying minimums only).
                    </p>
                  </div>

                  <div className="bg-white dark:bg-[#14171B] p-5 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                    <h4 className="font-bold text-orange-900 dark:text-orange-400 mb-2 flex items-center gap-2">
                      <TrendingDown size={18} /> Charge-Off Rate
                    </h4>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-100 dark:border-orange-900/30 mb-2">
                      <p className="font-mono text-sm text-slate-800 dark:text-white">
                        Charge-Off = Defaulted Principal / Avg Balance
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Annualized rate of principal losses. Prime auto loans: 1-2%. Subprime auto: 5-8%. Credit cards: 3-5% (prime) to 8-12% (subprime).
                    </p>
                  </div>

                  <div className="bg-white dark:bg-[#14171B] p-5 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                    <h4 className="font-bold text-orange-900 dark:text-orange-400 mb-2 flex items-center gap-2">
                      <DollarSign size={18} /> Excess Spread
                    </h4>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-100 dark:border-orange-900/30 mb-2">
                      <p className="font-mono text-sm text-slate-800 dark:text-white">
                        Excess = WAC - (Coupon + Fees + Losses)
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      The cushion available to absorb future losses. Positive excess spread is trapped in a reserve account. If it turns negative, early amortization triggers activate.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-[#14171B] p-5 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                    <h4 className="font-bold text-orange-900 dark:text-orange-400 mb-2 flex items-center gap-2">
                      <Clock size={18} /> Delinquency Rates
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Percentage of balances 30+, 60+, and 90+ days past due. Leading indicator of future charge-offs. Typical progression:
                    </p>
                    <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <p>&bull; 30+ days: 2-4% (early warning)</p>
                      <p>&bull; 60+ days: 1-2% (serious delinquency)</p>
                      <p>&bull; 90+ days: 0.5-1% (imminent charge-off)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-100 dark:border-orange-900/30">
              <h4 className="text-orange-900 dark:text-orange-400 font-bold flex items-center gap-2 mb-3">
                <FileText size={18} /> Esoteric ABS: Beyond Consumer Receivables
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                The securitization technology extends to virtually any predictable cash flow stream. These niche markets offer higher yields but require specialized due diligence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-black/40 p-4 rounded-lg shadow-sm dark:shadow-none">
                  <h5 className="font-semibold text-slate-800 dark:text-white mb-2">Equipment Leases</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Aircraft, railcars, construction equipment. Residual value risk is key. Lessees are typically investment-grade corporations.</p>
                </div>
                <div className="bg-white dark:bg-black/40 p-4 rounded-lg shadow-sm dark:shadow-none">
                  <h5 className="font-semibold text-slate-800 dark:text-white mb-2">Royalty Securitizations</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Music catalogs, film libraries, patent portfolios. Cash flows depend on usage/licensing. David Bowie pioneered this in 1997 ("Bowie Bonds").</p>
                </div>
                <div className="bg-white dark:bg-black/40 p-4 rounded-lg shadow-sm dark:shadow-none">
                  <h5 className="font-semibold text-slate-800 dark:text-white mb-2">Whole Business Securitizations</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Franchise revenues (e.g., Dunkin' Donuts, Domino's). Backed by brand strength and contractual royalty streams from franchisees.</p>
                </div>
                <div className="bg-white dark:bg-black/40 p-4 rounded-lg shadow-sm dark:shadow-none">
                  <h5 className="font-semibold text-slate-800 dark:text-white mb-2">Solar Panel Leases</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Residential solar installations with 20-year lease agreements. Cash flows tied to electricity savings and government incentives.</p>
                </div>
                <div className="bg-white dark:bg-black/40 p-4 rounded-lg shadow-sm dark:shadow-none">
                  <h5 className="font-semibold text-slate-800 dark:text-white mb-2">Timeshare Loans</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Vacation ownership financing. High interest rates (10-15%) offset elevated default risk. Collateral is difficult to liquidate.</p>
                </div>
                <div className="bg-white dark:bg-black/40 p-4 rounded-lg shadow-sm dark:shadow-none">
                  <h5 className="font-semibold text-slate-800 dark:text-white mb-2">Litigation Finance</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Funding for lawsuits in exchange for a share of settlements. Binary outcomes create extreme tail risk. Emerging asset class.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Monte Carlo Pricing & OAS */}
          <section id="monte-carlo-pricing">
            <SectionHeader 
              title="Monte Carlo Pricing & Option-Adjusted Spread" 
              subtitle="Stochastic modeling for path-dependent cash flows. The institutional standard for valuing structured products."
              icon={BarChart3}
              colorClass="border-indigo-600"
            />

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Structured securities exhibit <strong>path-dependent cash flows</strong>—the timing and magnitude of payments depend on the stochastic evolution of interest rates, prepayment speeds, and default rates. Static discounted cash flow (DCF) analysis is inadequate because it assumes a single deterministic scenario. <strong>Monte Carlo simulation</strong> solves this by generating thousands of interest rate paths and computing the expected present value across all scenarios.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The output is the <strong>Option-Adjusted Spread (OAS)</strong>—the constant spread over the risk-free curve that equates the model price to the market price. OAS isolates credit and liquidity risk by removing the embedded optionality (prepayment options in RMBS, extension risk in ABS). It's the universal metric for relative value analysis across structured products.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white">The Monte Carlo Framework</h3>
                <p className="text-slate-600 dark:text-slate-400">A five-step process that transforms market data into actionable pricing and risk metrics.</p>
                
                <div className="space-y-4">
                  <div className="bg-white dark:bg-[#14171B] p-5 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 font-bold flex items-center justify-center text-sm">1</div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Calibrate Interest Rate Model</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Fit a short-rate model (Hull-White, Black-Karasinski) to the current Treasury curve and implied volatilities from swaptions. The model must reproduce market prices of liquid derivatives.
                    </p>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded text-xs font-mono text-slate-700 dark:text-slate-300">
                      dr(t) = κ[θ(t) - r(t)]dt + σ(t)dW(t)
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      Hull-White model with time-dependent mean reversion (κ), drift (θ), and volatility (σ).
                    </p>
                  </div>

                  <div className="bg-white dark:bg-[#14171B] p-5 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 font-bold flex items-center justify-center text-sm">2</div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Generate Rate Paths</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Simulate 1,000-10,000 interest rate paths using the calibrated model. Each path represents a possible evolution of the short rate over the security's life.
                    </p>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded text-xs text-slate-700 dark:text-slate-300">
                      <p className="mb-1">Path 1: 3.5% &rarr; 3.8% &rarr; 4.1% &rarr; ...</p>
                      <p className="mb-1">Path 2: 3.5% &rarr; 3.2% &rarr; 2.9% &rarr; ...</p>
                      <p>Path N: 3.5% &rarr; 3.6% &rarr; 3.7% &rarr; ...</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#14171B] p-5 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 font-bold flex items-center justify-center text-sm">3</div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Model Prepayments & Defaults</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      For each rate path, compute prepayment speeds using a behavioral model (e.g., refinancing S-curve) and default rates using a credit model (e.g., logistic regression on FICO, LTV, unemployment).
                    </p>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded text-xs font-mono text-slate-700 dark:text-slate-300">
                      CPR(t) = f(Rate Path, Burnout, Seasonality)
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-[#14171B] p-5 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 font-bold flex items-center justify-center text-sm">4</div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Project Cash Flows</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    For each path, apply the waterfall structure to compute tranche-level cash flows. Account for credit enhancement, reserve accounts, and trigger events.
                  </p>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    <p><strong>Month 1:</strong> Interest = $100K, Principal = $50K</p>
                    <p><strong>Month 2:</strong> Interest = $98K, Principal = $55K</p>
                    <p><strong>...</strong></p>
                    <p><strong>Month 360:</strong> Interest = $2K, Principal = $1K</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#14171B] p-5 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 font-bold flex items-center justify-center text-sm">5</div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Discount & Average</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    Discount each path's cash flows using the path-specific short rates plus a trial spread. Iterate on the spread until the average present value equals the market price. This spread is the OAS.
                  </p>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded text-xs font-mono text-slate-700 dark:text-slate-300">
                    PV = Σ [CF(t) / (1 + r(t) + OAS)^t]
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    Average PV across all paths. Solve for OAS such that Avg PV = Market Price.
                  </p>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-900/30 rounded-lg p-4">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Computational Intensity</h4>
                  <p className="text-sm text-indigo-800 dark:text-indigo-300 mb-2">
                    A single RMBS tranche with 10,000 paths and 360 monthly periods requires 3.6 million cash flow calculations. Modern pricing systems use GPU acceleration and variance reduction techniques (antithetic variates, control variates) to achieve sub-second pricing.
                  </p>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300">
                    Bloomberg's MARS (Mortgage Analytics and Reporting System) and Intex's DealMaker are industry-standard platforms.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                <h4 className="font-bold text-indigo-900 dark:text-indigo-400 mb-4 flex items-center gap-2">
                  <Calculator size={20} /> Interpreting OAS
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  OAS represents the <strong>pure credit and liquidity premium</strong> after removing interest rate risk and embedded options. Higher OAS indicates:
                </p>
                <ul className="text-sm text-slate-600 space-y-2 pl-4">
                  <li>&bull; <strong>Higher credit risk:</strong> Subordinated tranches have wider OAS than senior tranches</li>
                  <li>&bull; <strong>Lower liquidity:</strong> Non-agency RMBS trade at wider OAS than agency MBS</li>
                  <li>&bull; <strong>Model risk:</strong> If your prepayment model is wrong, OAS is mispriced</li>
                  <li>&bull; <strong>Market dislocation:</strong> During crises, OAS widens dramatically as liquidity evaporates</li>
                </ul>
                <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded text-xs text-indigo-800 dark:text-indigo-300">
                  <strong>Example:</strong> A AAA RMBS with 50 bps OAS vs. a BBB RMBS with 200 bps OAS. The 150 bps difference compensates for subordination and higher default risk.
                </div>
              </div>

              <div className="bg-white dark:bg-[#14171B] p-6 rounded-xl shadow-sm dark:shadow-none border border-slate-100 dark:border-white/10">
                <h4 className="font-bold text-indigo-900 dark:text-indigo-400 mb-4 flex items-center gap-2">
                  <Activity size={20} /> Effective Duration & Convexity
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Monte Carlo also produces <strong>option-adjusted duration</strong> and <strong>convexity</strong>—the sensitivity of price to parallel shifts in the yield curve.
                </p>
                <div className="space-y-3">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded">
                    <p className="font-mono text-xs text-slate-800 dark:text-white mb-1">
                      Effective Duration = (P₋ - P₊) / (2 × P₀ × Δy)
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Where P₋ and P₊ are prices after -25 bps and +25 bps shifts. Measures percentage price change per 100 bps rate move.
                    </p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded">
                    <p className="font-mono text-xs text-slate-800 dark:text-white mb-1">
                      Convexity = (P₋ + P₊ - 2P₀) / (P₀ × Δy²)
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Measures the curvature of the price-yield relationship. RMBS have <strong>negative convexity</strong> due to prepayment options—prices rise less when rates fall than they fall when rates rise.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 dark:from-indigo-900/20 to-purple-50 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-900/30">
              <h4 className="text-indigo-900 dark:text-indigo-400 font-bold flex items-center gap-2 mb-3">
                <Shield size={18} /> Stress Testing & Scenario Analysis
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Beyond base-case OAS, institutional investors run <strong>stress scenarios</strong> to quantify tail risk. Common scenarios include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-black/40 p-4 rounded-lg shadow-sm dark:shadow-none">
                  <h5 className="font-semibold text-slate-800 dark:text-white mb-2">Rate Shock</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Instantaneous +200 bps or -200 bps parallel shift. Tests duration risk and prepayment model stability.</p>
                </div>
                <div className="bg-white dark:bg-black/40 p-4 rounded-lg shadow-sm dark:shadow-none">
                  <h5 className="font-semibold text-slate-800 dark:text-white mb-2">Credit Stress</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Double the base-case default rate. Tests credit enhancement adequacy and loss severity assumptions.</p>
                </div>
                <div className="bg-white dark:bg-black/40 p-4 rounded-lg shadow-sm dark:shadow-none">
                  <h5 className="font-semibold text-slate-800 dark:text-white mb-2">Liquidity Crisis</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Widen OAS by 100-300 bps to simulate market dislocation. Tests mark-to-market risk and margin call exposure.</p>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </ArticleFrame>
  );
}
