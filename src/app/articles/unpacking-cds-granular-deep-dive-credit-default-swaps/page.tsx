'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  ShieldCheck, TrendingUp, Zap, Target, Scale, AlertTriangle, ArrowRightLeft, Info,
  Calculator, Activity, Layers, Percent, Clock, BarChart3, Dna, Flame, Gavel, ShieldAlert,
  GitMerge, Divide, Maximize2, ChevronRight, BookOpen, Briefcase, Globe, Database, 
  FileText, Search, Compass, ArrowLeft
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// Global promise to ensure KaTeX is only loaded once
let katexPromise: Promise<any> | null = null;

const loadKatex = () => {
  if (katexPromise) return katexPromise;
  
  katexPromise = new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && (window as any).katex) {
      resolve((window as any).katex);
      return;
    }
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
    document.head.appendChild(link);
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
    script.async = true;
    script.onload = () => resolve((window as any).katex);
    script.onerror = () => reject(new Error('Failed to load KaTeX'));
    document.head.appendChild(script);
  });
  
  return katexPromise;
};

// Robust Latex component to handle math rendering
const Latex = ({ children, displayMode = false }: { children: React.ReactNode; displayMode?: boolean }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadKatex().then(() => setIsReady(true)).catch(console.error);
  }, []);

  useEffect(() => {
    if (isReady && containerRef.current) {
      try {
        const text = Array.isArray(children) ? children.join('') : String(children || "");
        (window as any).katex.render(text, containerRef.current, {
          throwOnError: false,
          displayMode: displayMode,
          trust: true
        });
      } catch (e) {
        console.error("KaTeX rendering error:", e);
      }
    }
  }, [isReady, children, displayMode]);

  return (
    <span ref={containerRef}>
      {!isReady ? (typeof children === 'string' ? children : '') : ''}
    </span>
  );
};

const SectionHeader = ({ title, subtitle, icon: Icon }: { 
  title: string; 
  subtitle: string; 
  icon: React.ComponentType<any> 
}) => (
  <div className="mb-12 mt-32 first:mt-0">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
        <Icon size={32} />
      </div>
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
        {title}
      </h2>
    </div>
    <p className="text-slate-500 text-xl max-w-4xl leading-relaxed">{subtitle}</p>
    <div className="h-1.5 w-32 bg-blue-600 mt-6 rounded-full shadow-sm"></div>
  </div>
);

const Card = ({ title, icon: Icon, children, color = "blue" }: { 
  title: string; 
  icon: React.ComponentType<any>; 
  children: React.ReactNode; 
  color?: string 
}) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    rose: "bg-rose-50 border-rose-200 text-rose-800",
    slate: "bg-slate-50 border-slate-200 text-slate-800",
  };

  const accentColor = colors[color].split(' ')[1];
  const iconBg = colors[color].split(' ')[0];

  return (
    <div className={`p-10 md:p-14 rounded-[3rem] border-2 mb-20 shadow-sm transition-all hover:shadow-2xl bg-white overflow-hidden relative`}>
      <div className={`absolute top-0 left-0 w-full h-2.5 ${accentColor}`}></div>
      <div className="flex items-center gap-6 mb-12">
        <div className={`p-5 rounded-3xl ${iconBg} shadow-sm text-current`}>
          <Icon size={36} />
        </div>
        <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
          {title}
        </h3>
      </div>
      <div className="text-lg leading-relaxed space-y-10 text-slate-600">
        {children}
      </div>
    </div>
  );
};

export default function UnpackingCDSArticle() {
  return (
    <ArticleFrame slug="unpacking-cds-granular-deep-dive-credit-default-swaps">
      <InfographicSlot alt="Credit Default Swaps Infographic" />
          {/* Module 1: Foundational Intuition (DEEP DIVE) */}
          <section>
            <SectionHeader 
              title="1. Foundational Intuition" 
              subtitle="The fundamental transfer of credit risk: Deconstructing the insurance-derivative hybrid." 
              icon={BookOpen}
            />
            <Card title="The Bilateral Payout Mechanism" icon={ShieldCheck} color="blue">
              <div className="space-y-6">
                <p>
                  A <strong>Credit Default Swap (CDS)</strong> is a derivative that separates credit risk from a loan or bond. 
                  It involves two parties: the <strong>Protection Buyer</strong> (who pays a spread) and the <strong>Protection Seller</strong> (who assumes the risk).
                </p>
                
                {/* Step-by-Step Tutorial */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-200 my-8">
                  <h4 className="font-bold text-blue-900 mb-6 flex items-center gap-2">
                    <BookOpen size={20} /> Tutorial: How CDS Works Step-by-Step
                  </h4>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">1</div>
                        <h5 className="font-bold text-blue-900 mb-2">Setup</h5>
                        <p className="text-sm text-blue-800">Bank A owns $10M of Tesla bonds but wants to hedge credit risk without selling the bonds.</p>
                      </div>
                      <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">2</div>
                        <h5 className="font-bold text-blue-900 mb-2">Contract</h5>
                        <p className="text-sm text-blue-800">Bank A buys CDS protection from Hedge Fund B, paying 150bps annually on $10M notional.</p>
                      </div>
                      <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">3</div>
                        <h5 className="font-bold text-blue-900 mb-2">Payout</h5>
                        <p className="text-sm text-blue-800">If Tesla defaults, Hedge Fund B pays Bank A the loss: $10M × (1 - Recovery Rate).</p>
                      </div>
                    </div>
                    <div className="p-6 bg-blue-100 rounded-2xl">
                      <h5 className="font-bold text-blue-900 mb-3">💡 Key Insight</h5>
                      <p className="text-sm text-blue-800">
                        Bank A keeps earning interest on Tesla bonds but transfers default risk. 
                        Hedge Fund B earns premium income but assumes tail risk. This is pure risk transfer!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                  <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100 shadow-inner">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-4">
                      <Search size={18} /> Reference Entity
                    </h4>
                    <p className="text-sm leading-relaxed text-blue-800 mb-4">
                      The corporation or sovereign whose credit is being tracked. Note the <strong>Entity</strong> is the name, 
                      while the <strong>Obligation</strong> is the specific bond used to determine seniority.
                    </p>
                    <div className="p-4 bg-white rounded-xl border border-blue-200">
                      <p className="text-xs text-blue-700 font-medium">
                        <strong>Example:</strong> Reference Entity = "Tesla Inc.", Reference Obligation = "Tesla 5.3% 2025 Senior Notes"
                      </p>
                    </div>
                  </div>
                  <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100 shadow-inner">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-4">
                      <Compass size={18} /> Insurable Interest
                    </h4>
                    <p className="text-sm leading-relaxed text-blue-800 mb-4">
                      Unlike insurance, CDS do not require the buyer to suffer a "loss." This allows for <strong>Long/Short Credit</strong> strategies, 
                      where a trader can profit from a company's demise without owning their debt.
                    </p>
                    <div className="p-4 bg-white rounded-xl border border-blue-200">
                      <p className="text-xs text-blue-700 font-medium">
                        <strong>Strategy:</strong> Hedge fund can buy CDS on 100 companies, betting on defaults without owning any bonds.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Credit Events Section */}
                <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Gavel size={20} /> ISDA Credit Events
                  </h4>
                  <p className="text-sm text-slate-600 mb-6">
                    These are the specific triggers that activate CDS payouts. Understanding each is crucial for risk assessment:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { 
                        name: "Bankruptcy", 
                        desc: "Entity becomes insolvent or liquidates.",
                        example: "Lehman Brothers filing Chapter 11 in 2008",
                        frequency: "Most Common"
                      },
                      { 
                        name: "Failure to Pay", 
                        desc: "Entity misses a payment after grace periods.",
                        example: "Argentina missing bond payments in 2001",
                        frequency: "Common"
                      },
                      { 
                        name: "Restructuring", 
                        desc: "Terms changed (interest, principal, maturity).",
                        example: "Greece extending bond maturities in 2012",
                        frequency: "Frequent in Sovereigns"
                      },
                      { 
                        name: "Obligation Default", 
                        desc: "Another debt triggers a default clause.",
                        example: "Cross-default clauses triggering",
                        frequency: "Rare"
                      },
                      { 
                        name: "Repudiation", 
                        desc: "Sovereign denies the validity of debt.",
                        example: "Russia repudiating Soviet-era debt",
                        frequency: "Very Rare"
                      },
                      { 
                        name: "Acceleration", 
                        desc: "Debt becomes due immediately.",
                        example: "Covenant breach forcing early payment",
                        frequency: "Uncommon"
                      }
                    ].map((event, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 group hover:border-blue-400 transition-colors hover:shadow-md">
                        <span className="font-bold text-xs text-blue-600 uppercase block mb-1">{event.name}</span>
                        <p className="text-[11px] text-slate-500 leading-tight mb-3">{event.desc}</p>
                        <div className="space-y-2">
                          <div className="p-2 bg-white rounded-lg border border-slate-100">
                            <p className="text-[10px] text-slate-600 font-medium">
                              <strong>Example:</strong> {event.example}
                            </p>
                          </div>
                          <div className="text-[9px] text-blue-600 font-bold uppercase tracking-wider">
                            {event.frequency}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-200">
                    <h5 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                      <AlertTriangle size={16} /> Professional Tip
                    </h5>
                    <p className="text-sm text-amber-800">
                      <strong>Restructuring</strong> is often excluded from corporate CDS (called "No-R" contracts) because it's subjective and can be gamed. 
                      Sovereign CDS typically include it because debt restructuring is common in sovereign defaults.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Module 2: Pricing and Valuation (DEEP DIVE) */}
          <section>
            <SectionHeader 
              title="2. Pricing and Valuation" 
              subtitle="The mathematical architecture: Solving the 'Credit Triangle' through hazard rates." 
              icon={Target}
            />
            <Card title="The Hazard Rate and Survival" icon={Clock} color="indigo">
              <div className="space-y-6">
                <p>
                  CDS valuation relies on modeling <strong>Hazard Rates</strong> (<Latex>{"\\lambda"}</Latex>), 
                  the instantaneous probability of default given survival. This allows us to construct the <strong>Survival Probability</strong> curve (<Latex>{"P(t)"}</Latex>).
                </p>

                {/* Interactive Tutorial Section */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-3xl border border-indigo-200 my-8">
                  <h4 className="font-bold text-indigo-900 mb-6 flex items-center gap-2">
                    <Calculator size={20} /> Interactive Tutorial: Building the Survival Curve
                  </h4>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-white rounded-2xl border border-indigo-100 shadow-sm">
                        <h5 className="font-bold text-indigo-900 mb-3">Step 1: Market Data</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                            <span className="text-sm font-medium text-indigo-800">1Y CDS Spread:</span>
                            <span className="font-bold text-indigo-900">100 bps</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                            <span className="text-sm font-medium text-indigo-800">5Y CDS Spread:</span>
                            <span className="font-bold text-indigo-900">200 bps</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                            <span className="text-sm font-medium text-indigo-800">Recovery Rate:</span>
                            <span className="font-bold text-indigo-900">40%</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-white rounded-2xl border border-indigo-100 shadow-sm">
                        <h5 className="font-bold text-indigo-900 mb-3">Step 2: Bootstrap Hazard Rates</h5>
                        <p className="text-sm text-indigo-800 mb-4">
                          We solve for λ values that make each CDS have zero NPV at inception:
                        </p>
                        <div className="space-y-2">
                          <div className="p-2 bg-indigo-50 rounded text-xs font-mono text-indigo-700">
                            λ₁ = 100bps / (1-40%) = 167bps
                          </div>
                          <div className="p-2 bg-indigo-50 rounded text-xs font-mono text-indigo-700">
                            λ₅ = Solve iteratively...
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-indigo-100">
                      <h5 className="font-bold text-indigo-900 mb-3">Step 3: Calculate Survival Probabilities</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { time: "1Y", prob: "98.3%" },
                          { time: "2Y", prob: "95.1%" },
                          { time: "3Y", prob: "91.2%" },
                          { time: "5Y", prob: "82.7%" }
                        ].map((item, idx) => (
                          <div key={idx} className="text-center p-3 bg-indigo-50 rounded-lg">
                            <div className="text-xs text-indigo-600 font-medium">{item.time}</div>
                            <div className="text-lg font-bold text-indigo-900">{item.prob}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 my-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10 text-white">
                    <Percent size={120} />
                  </div>
                  <div className="text-2xl font-mono text-indigo-400 py-6 overflow-x-auto text-center border-b border-slate-800 mb-6">
                    <Latex displayMode={true}>{"P(t) = e^{-\\int_0^t \\lambda(u) du}"}</Latex>
                  </div>
                  <p className="text-sm text-slate-400 text-center mb-4">
                    Market spreads are "bootstrapped" to find the sequence of hazard rates that satisfy the zero-NPV condition.
                  </p>
                  <div className="p-4 bg-slate-800 rounded-2xl">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong>Intuition:</strong> If λ = 2% per year (constant), then after 5 years: P(5) = e^(-0.02×5) = 90.5% survival probability.
                      The 9.5% cumulative default probability drives the CDS pricing.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                  <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
                    <h5 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                      <Activity size={18} /> The Premium Leg
                    </h5>
                    <p className="text-sm text-indigo-800 mb-6">
                      The PV of periodic spread payments, conditional on survival. The protection buyer pays this.
                    </p>
                    <div className="text-lg font-mono text-indigo-700 p-4 bg-white rounded-2xl border border-indigo-200 text-center mb-4">
                      <Latex displayMode={true}>{"PV_{Prem} = s \\sum \\Delta t_i D(t_i) P(t_i)"}</Latex>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-indigo-200">
                      <p className="text-xs text-indigo-700">
                        <strong>Example:</strong> For 200bps spread on $10M, 5Y: If entity survives all 5 years, 
                        total payments = $10M × 2% × 5 = $1M. But we discount and weight by survival probability.
                      </p>
                    </div>
                  </div>
                  <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100">
                    <h5 className="font-bold text-rose-900 mb-4 flex items-center gap-2">
                      <ShieldAlert size={18} /> The Protection Leg
                    </h5>
                    <p className="text-sm text-rose-800 mb-6">
                      The PV of the contingent payout <Latex>{"(1-R)"}</Latex> upon default. The protection seller pays this.
                    </p>
                    <div className="text-lg font-mono text-rose-700 p-4 bg-white rounded-2xl border border-rose-200 text-center mb-4">
                      <Latex displayMode={true}>{"PV_{Prot} = (1-R) \\int_0^T D(t) dP(t)"}</Latex>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-rose-200">
                      <p className="text-xs text-rose-700">
                        <strong>Example:</strong> If Tesla defaults in Year 3 with 25% recovery, protection seller pays: 
                        $10M × (1-25%) = $7.5M. This is weighted by default probability in Year 3.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Practical Calculation Example */}
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-8 rounded-3xl border border-slate-200 mt-8">
                  <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Calculator size={20} /> Worked Example: Fair Value Calculation
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <h5 className="font-bold text-slate-800 mb-3">Given</h5>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li>• Notional: $10M</li>
                        <li>• Maturity: 5 years</li>
                        <li>• Recovery: 40%</li>
                        <li>• Risk-free rate: 3%</li>
                        <li>• Hazard rate: 2% (flat)</li>
                      </ul>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <h5 className="font-bold text-slate-800 mb-3">Calculate</h5>
                      <div className="text-sm text-slate-600 space-y-2">
                        <div>Premium Leg PV:</div>
                        <div className="font-mono text-xs bg-slate-50 p-2 rounded">
                          s × $10M × 4.2 = s × $42M
                        </div>
                        <div>Protection Leg PV:</div>
                        <div className="font-mono text-xs bg-slate-50 p-2 rounded">
                          60% × $10M × 0.095 = $570K
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <h5 className="font-bold text-slate-800 mb-3">Result</h5>
                      <div className="text-sm text-slate-600 space-y-2">
                        <div>Set Premium = Protection:</div>
                        <div className="font-mono text-xs bg-slate-50 p-2 rounded">
                          s × $42M = $570K
                        </div>
                        <div className="text-lg font-bold text-green-600 mt-3">
                          Fair Spread = 136 bps
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="The Credit Triangle Simplification" icon={Divide} color="emerald">
              <div className="space-y-6">
                <p>
                  For "napkin math," traders use the <strong>Credit Triangle</strong> relationship. 
                  For a flat curve and low default probability, the fair spread (<Latex>{"s"}</Latex>) simplifies to:
                </p>

                {/* Interactive Credit Triangle */}
                <div className="bg-emerald-50 rounded-3xl p-10 border border-emerald-200 text-center relative">
                  <div className="text-4xl font-bold text-emerald-800 mb-6">
                    <Latex>{"s \\approx \\lambda \\times (1 - R)"}</Latex>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-[10px] text-emerald-600 uppercase font-black tracking-widest mb-8">
                    <div>Spread</div>
                    <div>Hazard Rate</div>
                    <div>Loss Given Default</div>
                  </div>
                  
                  {/* Interactive Calculator */}
                  <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm">
                    <h5 className="font-bold text-emerald-900 mb-4">Quick Calculator</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="p-4 bg-emerald-50 rounded-xl">
                        <div className="font-bold text-emerald-800 mb-2">Scenario A</div>
                        <div className="space-y-1 text-xs">
                          <div>λ = 3% per year</div>
                          <div>R = 40%</div>
                          <div className="font-bold text-emerald-900">s ≈ 180 bps</div>
                        </div>
                      </div>
                      <div className="p-4 bg-emerald-50 rounded-xl">
                        <div className="font-bold text-emerald-800 mb-2">Scenario B</div>
                        <div className="space-y-1 text-xs">
                          <div>λ = 1% per year</div>
                          <div>R = 60%</div>
                          <div className="font-bold text-emerald-900">s ≈ 40 bps</div>
                        </div>
                      </div>
                      <div className="p-4 bg-emerald-50 rounded-xl">
                        <div className="font-bold text-emerald-800 mb-2">Scenario C</div>
                        <div className="space-y-1 text-xs">
                          <div>λ = 5% per year</div>
                          <div>R = 20%</div>
                          <div className="font-bold text-emerald-900">s ≈ 400 bps</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm text-sm text-slate-500">
                  <h5 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Info size={16} /> The Basis Trade Opportunity
                  </h5>
                  <p className="mb-4">
                    <strong>Institutional Note:</strong> The Z-spread on a cash bond should theoretically equal the CDS spread. 
                    The difference between them is the <strong>Basis</strong>.
                  </p>
                  <div className="text-center p-4 bg-slate-50 rounded-xl font-mono text-slate-700 mb-4">
                    <Latex>{"Basis = CDS \\, Spread - Cash \\, Z\\text{-}Spread"}</Latex>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <h6 className="font-bold text-green-800 mb-2">Positive Basis (CDS &gt; Cash)</h6>
                      <p className="text-xs text-green-700">
                        <strong>Trade:</strong> Buy cash bond, buy CDS protection. 
                        Profit from basis convergence while being credit-neutral.
                      </p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                      <h6 className="font-bold text-red-800 mb-2">Negative Basis (CDS &lt; Cash)</h6>
                      <p className="text-xs text-red-700">
                        <strong>Trade:</strong> Short cash bond, sell CDS protection. 
                        Requires careful funding and repo considerations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Module 3: Standardization (DEEP DIVE) */}
          <section>
            <SectionHeader 
              title="3. The Big Bang Protocol" 
              subtitle="Evolution of the market: From bespoke contracts to standardized clearing and auction logic." 
              icon={Globe}
            />
            <Card title="Standardization & Upfronts" icon={Zap} color="amber">
              <div className="space-y-6">
                <p>
                  Before 2009, CDS traded with "Par Spreads" (coupons that made NPV=0). Post-Big Bang, coupons are fixed at 100bps or 500bps 
                  to facilitate <strong>Trade Compression</strong> and <strong>Central Clearing</strong>.
                </p>

                {/* Before vs After Big Bang */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-8 rounded-3xl border border-amber-200 my-8">
                  <h4 className="font-bold text-amber-900 mb-6 flex items-center gap-2">
                    <Globe size={20} /> Before vs After Big Bang (2009)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-white rounded-2xl border border-amber-100 shadow-sm">
                      <h5 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                        <Clock size={16} /> Pre-2009: Bespoke Contracts
                      </h5>
                      <div className="space-y-3 text-sm">
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                          <div className="font-bold text-red-800 mb-1">Par Spreads</div>
                          <p className="text-red-700">Each contract had unique coupon making NPV = 0</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                          <div className="font-bold text-red-800 mb-1">No Standardization</div>
                          <p className="text-red-700">Different terms, maturities, recovery assumptions</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                          <div className="font-bold text-red-800 mb-1">Bilateral Risk</div>
                          <p className="text-red-700">No central clearing, high counterparty risk</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                          <div className="font-bold text-red-800 mb-1">Illiquid</div>
                          <p className="text-red-700">Hard to trade, compress, or net positions</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-amber-100 shadow-sm">
                      <h5 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                        <Zap size={16} /> Post-2009: Standardized World
                      </h5>
                      <div className="space-y-3 text-sm">
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="font-bold text-green-800 mb-1">Fixed Coupons</div>
                          <p className="text-green-700">100bps (IG) or 500bps (HY) only</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="font-bold text-green-800 mb-1">Standard Terms</div>
                          <p className="text-green-700">IMM dates, 40% recovery, ISDA definitions</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="font-bold text-green-800 mb-1">Central Clearing</div>
                          <p className="text-green-700">ICE Clear Credit, reduced counterparty risk</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="font-bold text-green-800 mb-1">Liquid Markets</div>
                          <p className="text-green-700">Easy to trade, compress, and manage risk</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Points Upfront Calculation Tutorial */}
                <div className="bg-amber-50 rounded-[2.5rem] p-10 border border-amber-200 mt-10">
                  <h4 className="font-bold text-amber-900 mb-8 uppercase text-xs tracking-widest text-center underline decoration-amber-300 underline-offset-8">
                    Points Upfront (PUF) Calculation Tutorial
                  </h4>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 flex flex-col justify-between">
                        <span className="font-medium text-slate-700 block mb-4 italic">The Cash Gap Formula:</span>
                        <div className="text-lg font-mono text-amber-800 py-2 border-b border-amber-100 text-center mb-4">
                          <Latex>{"PUF \\approx (s_{mkt} - Coupon) \\times RD"}</Latex>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                          The difference between market spread and fixed coupon, multiplied by risky duration.
                        </p>
                      </div>
                      <div className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 flex flex-col justify-between">
                        <span className="font-medium text-slate-700 block mb-4 italic">Settlement Direction:</span>
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-bold text-rose-600">
                            <span>If mkt spread &gt; coupon</span>
                            <span>Buyer Pays</span>
                          </div>
                          <div className="flex justify-between text-xs font-bold text-emerald-600">
                            <span>If mkt spread &lt; coupon</span>
                            <span>Seller Pays</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Worked Examples */}
                    <div className="bg-white p-8 rounded-3xl border border-amber-200 shadow-sm">
                      <h5 className="font-bold text-amber-900 mb-6">Worked Examples</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200">
                          <h6 className="font-bold text-amber-800 mb-3">Example 1: IG Credit</h6>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Market Spread:</span>
                              <span className="font-bold">150 bps</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Fixed Coupon:</span>
                              <span className="font-bold">100 bps</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Risky Duration:</span>
                              <span className="font-bold">4.7</span>
                            </div>
                            <div className="border-t border-amber-300 pt-2">
                              <div className="flex justify-between font-bold text-amber-900">
                                <span>PUF:</span>
                                <span>+2.35%</span>
                              </div>
                              <p className="text-xs text-amber-700 mt-1">Buyer pays 2.35% upfront</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                          <h6 className="font-bold text-green-800 mb-3">Example 2: Tight Credit</h6>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Market Spread:</span>
                              <span className="font-bold">75 bps</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Fixed Coupon:</span>
                              <span className="font-bold">100 bps</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Risky Duration:</span>
                              <span className="font-bold">4.8</span>
                            </div>
                            <div className="border-t border-green-300 pt-2">
                              <div className="flex justify-between font-bold text-green-900">
                                <span>PUF:</span>
                                <span>-1.20%</span>
                              </div>
                              <p className="text-xs text-green-700 mt-1">Seller pays 1.20% upfront</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-6 bg-red-50 rounded-2xl border border-red-200">
                          <h6 className="font-bold text-red-800 mb-3">Example 3: HY Credit</h6>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Market Spread:</span>
                              <span className="font-bold">750 bps</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Fixed Coupon:</span>
                              <span className="font-bold">500 bps</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Risky Duration:</span>
                              <span className="font-bold">3.2</span>
                            </div>
                            <div className="border-t border-red-300 pt-2">
                              <div className="flex justify-between font-bold text-red-900">
                                <span>PUF:</span>
                                <span>+8.00%</span>
                              </div>
                              <p className="text-xs text-red-700 mt-1">Buyer pays 8.00% upfront</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit Event Auctions */}
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
                  <h5 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                    <Database size={18} /> Credit Event Auctions: The Settlement Revolution
                  </h5>
                  <div className="space-y-6">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      To handle massive volumes of CDS during a default (like Lehman Brothers), ISDA introduced the <strong>Auction mechanism</strong>. 
                      Market participants submit bond bids to find a "Final Price." The CDS payout is simply <Latex>{"100 - Final \\, Price"}</Latex>, 
                      avoiding the physical delivery of scarce bonds.
                    </p>
                    
                    {/* Auction Process */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200">
                      <h6 className="font-bold text-slate-800 mb-4">Auction Process (Step-by-Step)</h6>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-blue-50 rounded-xl text-center">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mb-3 mx-auto">1</div>
                          <h6 className="font-bold text-blue-900 mb-2">Credit Event</h6>
                          <p className="text-xs text-blue-800">ISDA determines credit event occurred</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-xl text-center">
                          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm mb-3 mx-auto">2</div>
                          <h6 className="font-bold text-green-900 mb-2">Initial Market</h6>
                          <p className="text-xs text-green-800">Dealers submit initial bond price estimates</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-xl text-center">
                          <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm mb-3 mx-auto">3</div>
                          <h6 className="font-bold text-amber-900 mb-2">Limit Orders</h6>
                          <p className="text-xs text-amber-800">Physical settlement requests submitted</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-xl text-center">
                          <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm mb-3 mx-auto">4</div>
                          <h6 className="font-bold text-purple-900 mb-2">Final Price</h6>
                          <p className="text-xs text-purple-800">Market clearing price determines payout</p>
                        </div>
                      </div>
                    </div>

                    {/* Historical Examples */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200">
                      <h6 className="font-bold text-slate-800 mb-4">Historical Auction Results</h6>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                          <h6 className="font-bold text-red-800 mb-2">Lehman Brothers (2008)</h6>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Final Price:</span>
                              <span className="font-bold">8.625%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>CDS Payout:</span>
                              <span className="font-bold text-red-600">91.375%</span>
                            </div>
                            <p className="text-xs text-red-700 mt-2">Massive payout due to near-total loss</p>
                          </div>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                          <h6 className="font-bold text-orange-800 mb-2">Greece (2012)</h6>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Final Price:</span>
                              <span className="font-bold">21.5%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>CDS Payout:</span>
                              <span className="font-bold text-orange-600">78.5%</span>
                            </div>
                            <p className="text-xs text-orange-700 mt-2">Sovereign restructuring event</p>
                          </div>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                          <h6 className="font-bold text-yellow-800 mb-2">Hertz (2020)</h6>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Final Price:</span>
                              <span className="font-bold">1.5%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>CDS Payout:</span>
                              <span className="font-bold text-yellow-600">98.5%</span>
                            </div>
                            <p className="text-xs text-yellow-700 mt-2">COVID-related bankruptcy</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Module 4: Risk Sensitivities (DEEP DIVE) */}
          <section>
            <SectionHeader 
              title="4. Risk Sensitivities (CS01)" 
              subtitle="Mastering the Greeks: Quantifying spread risk, term structure, and the convexity of default." 
              icon={Scale}
            />
            <Card title="CS01 & Risky Duration" icon={Dna} color="indigo">
              <div className="space-y-6">
                <p>
                  <strong>CS01</strong> (Credit Spread 01) is the dollar change in NPV for a 1bp shift in the credit spread. 
                  It is fundamentally linked to <strong>Risky Duration</strong> (<Latex>{"RD"}</Latex>), which is the sensitivity of the Premium Leg to the spread.
                </p>

                {/* Interactive CS01 Tutorial */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-3xl border border-indigo-200 my-8">
                  <h4 className="font-bold text-indigo-900 mb-6 flex items-center gap-2">
                    <Calculator size={20} /> CS01 Calculation Tutorial
                  </h4>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-white rounded-2xl border border-indigo-100 shadow-sm">
                        <h5 className="font-bold text-indigo-900 mb-3">Method 1: Finite Difference</h5>
                        <div className="space-y-3">
                          <div className="p-3 bg-indigo-50 rounded-lg">
                            <div className="text-xs text-indigo-600 mb-1">Step 1: Bump spread up 1bp</div>
                            <div className="font-mono text-sm text-indigo-800">NPV(s + 1bp) = $45,230</div>
                          </div>
                          <div className="p-3 bg-indigo-50 rounded-lg">
                            <div className="text-xs text-indigo-600 mb-1">Step 2: Bump spread down 1bp</div>
                            <div className="font-mono text-sm text-indigo-800">NPV(s - 1bp) = $45,180</div>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="text-xs text-green-600 mb-1">Result: CS01</div>
                            <div className="font-mono text-sm font-bold text-green-800">($45,230 - $45,180) / 2 = $25</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-white rounded-2xl border border-indigo-100 shadow-sm">
                        <h5 className="font-bold text-indigo-900 mb-3">Method 2: Risky Duration</h5>
                        <div className="space-y-3">
                          <div className="p-3 bg-indigo-50 rounded-lg">
                            <div className="text-xs text-indigo-600 mb-1">Given</div>
                            <div className="text-sm text-indigo-800">
                              Notional: $10M<br/>
                              Risky Duration: 4.7
                            </div>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="text-xs text-green-600 mb-1">Quick Estimate</div>
                            <div className="font-mono text-sm font-bold text-green-800">
                              CS01 ≈ $10M × 4.7 × 10⁻⁴ = $4,700
                            </div>
                          </div>
                          <div className="p-2 bg-amber-50 rounded text-xs text-amber-700">
                            Note: This is per 100bp spread change
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50/50 p-10 rounded-[2.5rem] border border-indigo-100 my-10 relative">
                  <div className="text-2xl font-mono text-indigo-700 py-6 overflow-x-auto text-center border-y border-indigo-200">
                    <Latex displayMode={true}>{"CS01 = \\frac{PV(s + 1bp) - PV(s - 1bp)}{2}"}</Latex>
                  </div>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-indigo-900 font-medium">
                    <div className="flex gap-2">
                      <span className="text-indigo-500 font-bold w-4">1.</span>
                      <p>For safe entities (Low Spreads), RD is high (e.g., 4.8 for 5Y maturity).</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-indigo-500 font-bold w-4">2.</span>
                      <p>For distressed entities (High Spreads), RD collapses because the contract is likely to end early.</p>
                    </div>
                  </div>
                </div>

                {/* Risky Duration vs Credit Quality */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h5 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-sm">
                    <BarChart3 size={20} className="text-indigo-600" /> Risky Duration by Credit Quality
                  </h5>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                        <h6 className="font-bold text-green-800 mb-3">Investment Grade</h6>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Spread:</span>
                            <span className="font-bold">50-200 bps</span>
                          </div>
                          <div className="flex justify-between">
                            <span>5Y Risky Duration:</span>
                            <span className="font-bold text-green-600">4.5-4.8</span>
                          </div>
                          <div className="text-xs text-green-700 mt-3">
                            High survival probability means full duration exposure
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200">
                        <h6 className="font-bold text-amber-800 mb-3">High Yield</h6>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Spread:</span>
                            <span className="font-bold">300-800 bps</span>
                          </div>
                          <div className="flex justify-between">
                            <span>5Y Risky Duration:</span>
                            <span className="font-bold text-amber-600">3.5-4.2</span>
                          </div>
                          <div className="text-xs text-amber-700 mt-3">
                            Moderate default risk shortens effective duration
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-red-50 rounded-2xl border border-red-200">
                        <h6 className="font-bold text-red-800 mb-3">Distressed</h6>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Spread:</span>
                            <span className="font-bold">1000+ bps</span>
                          </div>
                          <div className="flex justify-between">
                            <span>5Y Risky Duration:</span>
                            <span className="font-bold text-red-600">1.5-3.0</span>
                          </div>
                          <div className="text-xs text-red-700 mt-3">
                            High default probability = short duration
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bucketed Exposure */}
                    <div className="p-6 bg-slate-50 rounded-2xl">
                      <h6 className="font-bold text-slate-800 mb-4">Bucketed Credit Exposure Management</h6>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        {[
                          { bucket: '1Y', cs01: '$15K' },
                          { bucket: '3Y', cs01: '$32K' },
                          { bucket: '5Y', cs01: '$47K' },
                          { bucket: '7Y', cs01: '$38K' },
                          { bucket: '10Y', cs01: '$28K' }
                        ].map((item, i) => (
                          <div key={i} className="p-4 bg-white rounded-2xl text-center border border-slate-200 group hover:border-indigo-400 transition-all">
                            <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Bucket</span>
                            <span className="text-lg font-black text-indigo-600">{item.bucket}</span>
                            <div className="text-xs text-slate-500 mt-1">
                              CS01: {item.cs01}
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 italic">
                        By bumping individual tenors, traders manage <strong>Curve Risk</strong> (steepening/flattening) rather than just parallel shifts.
                        This is crucial for portfolio hedging and relative value trades.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Credit Convexity (Negative Gamma)" icon={TrendingUp} color="blue">
              <div className="space-y-6">
                <p>
                  CDS are <strong>non-linear</strong>. <strong>Credit Gamma</strong> measures the change in CS01 as spreads move.
                  Understanding this is crucial for risk management in volatile credit markets.
                </p>

                {/* Interactive Gamma Demonstration */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-3xl border border-blue-200 my-8">
                  <h4 className="font-bold text-blue-900 mb-6 flex items-center gap-2">
                    <TrendingUp size={20} /> Gamma Effect Demonstration
                  </h4>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
                        <h5 className="font-bold text-blue-900 mb-3">Initial State</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Spread:</span>
                            <span className="font-bold">200 bps</span>
                          </div>
                          <div className="flex justify-between">
                            <span>CS01:</span>
                            <span className="font-bold">$4,700</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Position:</span>
                            <span className="font-bold text-red-600">Short Protection</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
                        <h5 className="font-bold text-blue-900 mb-3">Spread Widens to 400bps</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>New CS01:</span>
                            <span className="font-bold">$4,200</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Linear P&L:</span>
                            <span className="font-bold text-red-600">-$940K</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Actual P&L:</span>
                            <span className="font-bold text-red-700">-$1,100K</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-white rounded-2xl border border-blue-100 shadow-sm">
                        <h5 className="font-bold text-blue-900 mb-3">Spread Widens to 1000bps</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>New CS01:</span>
                            <span className="font-bold">$2,800</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Linear P&L:</span>
                            <span className="font-bold text-red-600">-$3,760K</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Actual P&L:</span>
                            <span className="font-bold text-red-700">-$3,200K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-blue-100 rounded-2xl">
                      <h5 className="font-bold text-blue-900 mb-3">Key Observations</h5>
                      <ul className="text-sm text-blue-800 space-y-2">
                        <li>• <strong>Initial widening:</strong> Linear model underestimates losses (negative gamma hurts)</li>
                        <li>• <strong>Extreme widening:</strong> Linear model overestimates losses (approaching payout cap)</li>
                        <li>• <strong>CS01 decreases:</strong> As default becomes more likely, duration shortens</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/50 p-10 rounded-3xl border border-blue-100 my-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="flex-1 p-6 bg-white rounded-3xl border border-blue-200 text-center font-mono text-2xl text-blue-800">
                    <Latex>{"\\Gamma = \\frac{\\partial^2 NPV}{\\partial s^2}"}</Latex>
                  </div>
                  <div className="flex-1 text-sm leading-relaxed text-blue-900">
                    For a protection seller, the contract displays <strong>Negative Gamma</strong>. As spreads widen, your losses accelerate, 
                    but as they approach infinity, the loss per basis point (CS01) actually shrinks as the payout becomes certain.
                  </div>
                </div>

                {/* Practical Risk Management */}
                <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm">
                  <h5 className="font-bold text-blue-900 mb-6 flex items-center gap-2">
                    <ShieldAlert size={18} /> Practical Risk Management Implications
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-red-50 rounded-2xl border border-red-200">
                      <h6 className="font-bold text-red-800 mb-3">For Protection Sellers</h6>
                      <ul className="text-sm text-red-700 space-y-2">
                        <li>• Losses accelerate in initial spread widening</li>
                        <li>• Need larger hedges than CS01 suggests</li>
                        <li>• Consider gamma hedging with options</li>
                        <li>• Monitor correlation in portfolio</li>
                      </ul>
                    </div>
                    <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                      <h6 className="font-bold text-green-800 mb-3">For Protection Buyers</h6>
                      <ul className="text-sm text-green-700 space-y-2">
                        <li>• Benefit from negative gamma of sellers</li>
                        <li>• Gains accelerate in spread widening</li>
                        <li>• Natural hedge for credit portfolios</li>
                        <li>• Consider rolling strategies</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-8 border-l-4 border-indigo-400 bg-indigo-50 rounded-r-2xl text-xs text-indigo-800 font-bold leading-relaxed">
                  <strong>CRITICAL:</strong> This means that a linear CS01 model will <strong>under-estimate</strong> losses in the initial stage of widening 
                  and <strong>over-estimate</strong> them as the name approaches default. Professional desks use full revaluation or 
                  second-order Taylor approximations for accurate P&L attribution.
                </div>
              </div>
            </Card>
          </section>

          {/* Module 5: Precise Estimation (DEEP DIVE) */}
          <section>
            <SectionHeader 
              title="5. Precise Estimation" 
              subtitle="The professional's toolkit: Estimating P&L and risk profiles on the fly." 
              icon={Calculator}
            />
            <Card title="Manual Risk Estimation" icon={Briefcase} color="emerald">
              <div className="space-y-10">
                <p>
                  Calculating CS01 without a pricing engine requires estimating the <strong>Risky Duration</strong> (<Latex>{"RD"}</Latex>), 
                  which is the sensitivity of the annuity to the spread. This is essential for quick risk assessments and trade sizing.
                </p>

                {/* Step-by-Step Manual Calculation */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-8 rounded-3xl border border-emerald-200 my-8">
                  <h4 className="font-bold text-emerald-900 mb-6 flex items-center gap-2">
                    <Calculator size={20} /> Step-by-Step Manual Calculation
                  </h4>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="p-6 bg-white rounded-2xl border border-emerald-100 shadow-sm">
                        <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">1</div>
                        <h5 className="font-bold text-emerald-900 mb-2">Identify Credit Quality</h5>
                        <p className="text-sm text-emerald-800">
                          Investment Grade: RD ≈ 4.7<br/>
                          High Yield: RD ≈ 3.8<br/>
                          Distressed: RD ≈ 2.5
                        </p>
                      </div>
                      <div className="p-6 bg-white rounded-2xl border border-emerald-100 shadow-sm">
                        <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">2</div>
                        <h5 className="font-bold text-emerald-900 mb-2">Apply Formula</h5>
                        <div className="text-sm text-emerald-800">
                          <div className="font-mono bg-emerald-50 p-2 rounded mb-2">
                            CS01 = N × RD × 10⁻⁴
                          </div>
                          <p className="text-xs">Where N is notional amount</p>
                        </div>
                      </div>
                      <div className="p-6 bg-white rounded-2xl border border-emerald-100 shadow-sm">
                        <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">3</div>
                        <h5 className="font-bold text-emerald-900 mb-2">Adjust for Maturity</h5>
                        <p className="text-sm text-emerald-800">
                          1Y: RD × 0.2<br/>
                          3Y: RD × 0.6<br/>
                          5Y: RD × 1.0<br/>
                          10Y: RD × 1.4
                        </p>
                      </div>
                      <div className="p-6 bg-white rounded-2xl border border-emerald-100 shadow-sm">
                        <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm mb-4">4</div>
                        <h5 className="font-bold text-emerald-900 mb-2">Verify Result</h5>
                        <p className="text-sm text-emerald-800">
                          Cross-check with market quotes or use finite difference method for validation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm">
                      <span className="font-bold text-slate-800 block mb-3 uppercase text-[10px] tracking-widest">
                        Risky Duration Estimate
                      </span>
                      <div className="text-2xl font-black text-slate-700">
                        RD ≈ 4.7 <span className="text-xs font-normal text-slate-400"> (for 5Y IG)</span>
                      </div>
                    </div>
                    <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100 shadow-sm">
                      <span className="font-bold text-emerald-800 block mb-3 uppercase text-[10px] tracking-widest">
                        CS01 Valuation
                      </span>
                      <div className="text-3xl font-mono text-emerald-700 py-4">
                        <Latex>{"CS01 = N \\times RD \\times 10^{-4}"}</Latex>
                      </div>
                      <p className="text-[10px] text-emerald-600 italic mt-2">
                        Where $10^{"{-4}"}$ represents 1bp (0.01%).
                      </p>
                    </div>
                  </div>
                  <div className="p-8 bg-rose-50 rounded-[2.5rem] border border-rose-100 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 text-rose-900">
                      <Percent size={140} />
                    </div>
                    <h4 className="font-bold text-rose-900 mb-6 uppercase text-xs tracking-widest">
                      Recovery ($R$) Sensitivity
                    </h4>
                    <p className="text-xs leading-relaxed text-rose-800 mb-6 font-medium">
                      Recovery defaults to 40%. Changing it affects the <strong>Hazard Rate</strong> bootstrapped from the spread.
                    </p>
                    <ul className="text-[10px] text-rose-700 space-y-3 font-bold uppercase tracking-tighter">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                        Low Recovery &rArr; High Hazard Rate &rArr; Short RD &rArr; Low CS01
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                        High Recovery &rArr; Low Hazard Rate &rArr; Long RD &rArr; High CS01
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Practical Examples */}
                <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm">
                  <h4 className="font-bold text-emerald-900 mb-6 flex items-center gap-2">
                    <Briefcase size={20} /> Practical Examples
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                      <h5 className="font-bold text-emerald-800 mb-4">Example 1: Apple 5Y CDS</h5>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Notional:</span>
                          <span className="font-bold">$50M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Credit Quality:</span>
                          <span className="font-bold">IG (AAA)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Risky Duration:</span>
                          <span className="font-bold">4.8</span>
                        </div>
                        <div className="border-t border-emerald-300 pt-3">
                          <div className="flex justify-between font-bold text-emerald-900">
                            <span>CS01:</span>
                            <span>$24,000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200">
                      <h5 className="font-bold text-amber-800 mb-4">Example 2: Tesla 5Y CDS</h5>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Notional:</span>
                          <span className="font-bold">$25M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Credit Quality:</span>
                          <span className="font-bold">HY (BB)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Risky Duration:</span>
                          <span className="font-bold">3.8</span>
                        </div>
                        <div className="border-t border-amber-300 pt-3">
                          <div className="flex justify-between font-bold text-amber-900">
                            <span>CS01:</span>
                            <span>$9,500</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-red-50 rounded-2xl border border-red-200">
                      <h5 className="font-bold text-red-800 mb-4">Example 3: WeWork 5Y CDS</h5>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Notional:</span>
                          <span className="font-bold">$10M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Credit Quality:</span>
                          <span className="font-bold">Distressed</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Risky Duration:</span>
                          <span className="font-bold">2.2</span>
                        </div>
                        <div className="border-t border-red-300 pt-3">
                          <div className="flex justify-between font-bold text-red-900">
                            <span>CS01:</span>
                            <span>$2,200</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Adjustments */}
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-8 rounded-3xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Target size={20} /> Advanced Adjustments for Precision
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h5 className="font-bold text-slate-800">Spread Level Adjustments</h5>
                      <div className="space-y-3">
                        <div className="p-4 bg-white rounded-xl border border-slate-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">0-100 bps:</span>
                            <span className="font-bold text-green-600">RD × 1.0</span>
                          </div>
                          <p className="text-xs text-slate-500">Standard duration applies</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-slate-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">100-500 bps:</span>
                            <span className="font-bold text-amber-600">RD × 0.85</span>
                          </div>
                          <p className="text-xs text-slate-500">Moderate shortening</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-slate-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">500+ bps:</span>
                            <span className="font-bold text-red-600">RD × 0.6</span>
                          </div>
                          <p className="text-xs text-slate-500">Significant shortening</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h5 className="font-bold text-slate-800">Sector-Specific Factors</h5>
                      <div className="space-y-3">
                        <div className="p-4 bg-white rounded-xl border border-slate-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Financials:</span>
                            <span className="font-bold text-blue-600">RD × 0.9</span>
                          </div>
                          <p className="text-xs text-slate-500">Higher correlation risk</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-slate-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Energy:</span>
                            <span className="font-bold text-orange-600">RD × 0.8</span>
                          </div>
                          <p className="text-xs text-slate-500">Commodity volatility</p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-slate-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Utilities:</span>
                            <span className="font-bold text-green-600">RD × 1.1</span>
                          </div>
                          <p className="text-xs text-slate-500">Stable cash flows</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Module 6: Stress Testing Logic (DEEP DIVE) */}
          <section>
            <SectionHeader 
              title="6. Stress Testing Logic" 
              subtitle="Tail-risk quantification: Evaluating the portfolio's breaking points." 
              icon={ShieldAlert}
            />
            <Card title="Tiered Stress Testing" icon={AlertTriangle} color="rose">
              <div className="space-y-12">
                <p>
                  Professional desks use three tiers of stress testing to ensure they can survive a systemic or idiosyncratic credit crash.
                  Each tier captures different aspects of tail risk and portfolio vulnerability.
                </p>

                {/* Interactive Stress Testing Framework */}
                <div className="bg-gradient-to-r from-rose-50 to-red-50 p-8 rounded-3xl border border-rose-200 my-8">
                  <h4 className="font-bold text-rose-900 mb-6 flex items-center gap-2">
                    <AlertTriangle size={20} /> Interactive Stress Testing Framework
                  </h4>
                  <div className="space-y-6">
                    <div className="p-6 bg-white rounded-2xl border border-rose-100 shadow-sm">
                      <h5 className="font-bold text-rose-900 mb-4">Portfolio Setup for Examples</h5>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-rose-50 rounded-xl text-center">
                          <div className="text-sm font-bold text-rose-800">Position</div>
                          <div className="text-lg font-black text-rose-900">Short $100M</div>
                          <div className="text-xs text-rose-600">Protection Seller</div>
                        </div>
                        <div className="p-4 bg-rose-50 rounded-xl text-center">
                          <div className="text-sm font-bold text-rose-800">Current Spread</div>
                          <div className="text-lg font-black text-rose-900">200 bps</div>
                          <div className="text-xs text-rose-600">Investment Grade</div>
                        </div>
                        <div className="p-4 bg-rose-50 rounded-xl text-center">
                          <div className="text-sm font-bold text-rose-800">CS01</div>
                          <div className="text-lg font-black text-rose-900">$47,000</div>
                          <div className="text-xs text-rose-600">Per 1bp move</div>
                        </div>
                        <div className="p-4 bg-rose-50 rounded-xl text-center">
                          <div className="text-sm font-bold text-rose-800">Recovery</div>
                          <div className="text-lg font-black text-rose-900">40%</div>
                          <div className="text-xs text-rose-600">Standard Assumption</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-slate-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-slate-800 opacity-40">
                    <Activity size={120} />
                  </div>
                  <h4 className="text-2xl font-bold mb-10 text-rose-400 border-b border-slate-800 pb-4 inline-block">
                    Tier 1: Linear Stress (Parallel)
                  </h4>
                  <p className="text-slate-300 mb-8 leading-relaxed">
                    A "Systemic Widening" shock (e.g., +200bps). This is a 1st order estimate used for daily risk reporting.
                  </p>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="p-8 bg-slate-800 rounded-3xl border border-slate-700 flex-1 text-center">
                      <span className="text-[10px] text-slate-500 block mb-4 uppercase tracking-widest font-black">
                        Linear Logic
                      </span>
                      <div className="text-2xl font-bold text-rose-400 font-mono mb-4">
                        <Latex>{"Loss \\approx CS01 \\times \\Delta s"}</Latex>
                      </div>
                      <div className="text-sm text-slate-400">
                        $47K × 200bp = <span className="text-rose-400 font-bold">$9.4M Loss</span>
                      </div>
                    </div>
                    <div className="p-8 bg-slate-800 rounded-3xl border border-slate-700 flex-1">
                      <span className="text-[10px] text-slate-500 block mb-4 uppercase tracking-widest font-black">
                        Convexity Effect
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed italic mb-4">
                        Note: This over-estimates losses for sellers in extreme shocks because it ignores the payout cap.
                      </p>
                      <div className="text-sm text-amber-400">
                        Actual Loss: <span className="font-bold">~$11.2M</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-10 bg-amber-50 rounded-[3rem] border border-amber-200">
                    <h4 className="text-2xl font-bold mb-6 text-amber-800 flex items-center gap-3">
                      <Flame size={28} /> Tier 2: Jump-to-Default
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-8">
                      Assumes an <strong>instantaneous</strong> credit event. This removes all probability modeling and calculates the actual cash payout.
                    </p>
                    <div className="p-6 bg-white rounded-3xl border border-amber-200 text-center font-mono text-xl text-amber-700 shadow-sm mb-6">
                      <Latex>{"JTD = N(1 - R) - MTM"}</Latex>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-2xl border border-amber-200">
                        <h5 className="font-bold text-amber-800 mb-2">Calculation</h5>
                        <div className="text-sm space-y-1">
                          <div>Notional: $100M</div>
                          <div>Loss Given Default: 60%</div>
                          <div>Current MTM: $2M (negative)</div>
                          <div className="border-t border-amber-300 pt-2 font-bold text-amber-900">
                            JTD Loss: $62M
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] text-amber-600 text-center italic font-bold uppercase">
                        Ultimate Worst-Case Loss
                      </p>
                    </div>
                  </div>
                  <div className="p-10 bg-indigo-50 rounded-[3rem] border border-indigo-200 flex flex-col justify-center">
                    <h4 className="text-2xl font-bold mb-6 text-indigo-800 flex items-center gap-3">
                      <GitMerge size={28} /> Tier 3: Recovery Shock
                    </h4>
                    <p className="text-sm text-indigo-700 leading-relaxed italic mb-6">
                      In a crisis, <strong>Wrong-Way Risk</strong> occurs: spreads widen and Recovery rates drop simultaneously (e.g., 40% &rarr; 15%).
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-2xl border border-indigo-200">
                        <h5 className="font-bold text-indigo-800 mb-2">Scenario Analysis</h5>
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span>Spread Shock:</span>
                            <span className="font-bold">+300bps</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Recovery Drop:</span>
                            <span className="font-bold">40% → 20%</span>
                          </div>
                          <div className="border-t border-indigo-300 pt-2">
                            <div className="flex justify-between font-bold text-indigo-900">
                              <span>Combined Loss:</span>
                              <span>$18.5M</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-white/60 rounded-3xl text-xs text-indigo-900 border border-indigo-100 font-bold leading-relaxed">
                        This "Double Whammy" stress captures the systemic nature of credit cycles where assets and recovery values correlate to the downside.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Stress Testing Techniques */}
                <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm">
                  <h4 className="font-bold text-rose-900 mb-6 flex items-center gap-2">
                    <Database size={20} /> Advanced Stress Testing Techniques
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h5 className="font-bold text-slate-800">Historical Scenario Analysis</h5>
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                          <h6 className="font-bold text-red-800 mb-2">2008 Financial Crisis</h6>
                          <div className="text-sm text-red-700 space-y-1">
                            <div>IG Spreads: 100bp → 600bp</div>
                            <div>HY Spreads: 400bp → 2000bp</div>
                            <div>Recovery Rates: 40% → 25%</div>
                            <div className="font-bold">Portfolio Impact: -45%</div>
                          </div>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                          <h6 className="font-bold text-orange-800 mb-2">COVID-19 March 2020</h6>
                          <div className="text-sm text-orange-700 space-y-1">
                            <div>IG Spreads: 120bp → 400bp</div>
                            <div>HY Spreads: 350bp → 1100bp</div>
                            <div>Recovery Stable: ~40%</div>
                            <div className="font-bold">Portfolio Impact: -25%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h5 className="font-bold text-slate-800">Monte Carlo Stress Testing</h5>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <h6 className="font-bold text-blue-800 mb-2">Simulation Parameters</h6>
                          <div className="text-sm text-blue-700 space-y-1">
                            <div>Simulations: 10,000 paths</div>
                            <div>Time Horizon: 1 year</div>
                            <div>Correlation Matrix: Sector-based</div>
                            <div>Default Clustering: Enabled</div>
                          </div>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                          <h6 className="font-bold text-purple-800 mb-2">Risk Metrics</h6>
                          <div className="text-sm text-purple-700 space-y-1">
                            <div>VaR (95%): $8.2M</div>
                            <div>VaR (99%): $15.7M</div>
                            <div>Expected Shortfall: $22.1M</div>
                            <div>Max Drawdown: $45.3M</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Management Framework */}
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-8 rounded-3xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <ShieldCheck size={20} /> Professional Risk Management Framework
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <h5 className="font-bold text-slate-800 mb-4">Daily Monitoring</h5>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li>• CS01 by sector and rating</li>
                        <li>• Curve risk (DV01 buckets)</li>
                        <li>• Correlation exposure</li>
                        <li>• Liquidity metrics</li>
                        <li>• Basis risk (cash vs CDS)</li>
                      </ul>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <h5 className="font-bold text-slate-800 mb-4">Weekly Stress Tests</h5>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li>• Parallel spread shocks</li>
                        <li>• Curve steepening/flattening</li>
                        <li>• Sector rotation scenarios</li>
                        <li>• Recovery rate sensitivity</li>
                        <li>• Liquidity stress scenarios</li>
                      </ul>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <h5 className="font-bold text-slate-800 mb-4">Monthly Deep Dive</h5>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li>• Monte Carlo simulations</li>
                        <li>• Historical scenario replays</li>
                        <li>• Tail risk quantification</li>
                        <li>• Model validation</li>
                        <li>• Hedge effectiveness review</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

    </ArticleFrame>
  );
}
