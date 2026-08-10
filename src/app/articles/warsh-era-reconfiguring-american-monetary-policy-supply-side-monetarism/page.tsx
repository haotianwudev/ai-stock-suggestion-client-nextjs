'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingDown, TrendingUp, User, Landmark, Briefcase, AlertTriangle, BookOpen, DollarSign, BarChart2, ShieldAlert, ArrowRight, Activity, Zap, Globe, Music, Maximize2 } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-white dark:bg-[#0A0D14] rounded-xl shadow-lg p-6 border border-slate-100 dark:border-slate-800 ${className}`}>
    {children}
  </div>
);

interface SectionTitleProps {
  icon?: React.ComponentType<{ size: number }>;
  title: string;
  subtitle: string;
}

const SectionTitle = ({ icon: Icon, title, subtitle }: SectionTitleProps) => (
  <div className="mb-8 border-l-4 border-teal-500 pl-4">
    <div className="flex items-center gap-2 text-teal-600 font-semibold uppercase tracking-wider text-sm mb-1">
      {Icon && <Icon size={16} />}
      <span>{subtitle}</span>
    </div>
    <h2 className="text-3xl font-bold text-slate-900 font-serif">{title}</h2>
  </div>
);

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  type?: "red" | "green" | "blue" | "neutral";
}

const StatCard = ({ label, value, subtext, type = "neutral" }: StatCardProps) => {
  const colors = {
    red: "text-[#BC4128] dark:text-[#E2694A] bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border-red-100",
    green: "text-[#1D8A70] dark:text-[#3CBF9C] bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 border-green-100",
    blue: "text-[#A8672E] dark:text-[#D08F52] bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border-blue-100",
    neutral: "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#14171B] border-slate-100 dark:border-slate-800"
  };

  return (
    <div className={`p-4 rounded-lg border ${colors[type]}`}>
      <div className="text-sm font-medium opacity-80">{label}</div>
      <div className="text-2xl font-bold my-1">{value}</div>
      {subtext && <div className="text-xs opacity-75">{subtext}</div>}
    </div>
  );
};

export default function KevinWarshAnalysis() {
  return (
    <ArticleFrame slug="warsh-era-reconfiguring-american-monetary-policy-supply-side-monetarism">
          {/* Executive Summary Hero */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white shadow-2xl mt-8 mb-12">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="relative p-12 md:p-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-[#0A0D14]/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                  <div className="text-amber-400 font-bold mb-1">Regime Change</div>
                  <div className="text-sm text-slate-400">Departure from Post-2008 Consensus</div>
                </div>
                <div className="bg-white dark:bg-[#0A0D14]/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                  <div className="text-[#BC4128] dark:text-[#E2694A] font-bold mb-1">Market Crash</div>
                  <div className="text-sm text-slate-400">Gold & Silver Liquidation Event</div>
                </div>
                <div className="bg-white dark:bg-[#0A0D14]/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                  <div className="text-teal-400 font-bold mb-1">New Doctrine</div>
                  <div className="text-sm text-slate-400">Supply-Side Monetarism</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1: The Architect */}
          <section className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 sticky top-24">
              <SectionTitle icon={User} subtitle="The Architect" title="Who is Kevin Warsh?" />
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Not a traditional academic, Warsh's worldview is shaped by the velocity of Wall Street and the pragmatism of the West Wing. He represents a unique synthesis of market practitioner and policy architect.
              </p>
              
              {/* Enhanced Career Timeline */}
              <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-6 rounded-xl border border-blue-100 mb-6">
                <h4 className="font-bold text-[#A8672E] dark:text-[#D08F52] mb-4 flex items-center gap-2">
                  <Briefcase size={18} /> Career Timeline
                </h4>
                <div className="space-y-4">
                  <div className="relative pl-6 border-l-2 border-blue-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#A8672E] dark:bg-[#D08F52]"></div>
                    <div className="text-xs font-mono text-[#A8672E] dark:text-[#D08F52] mb-1">1995-2002</div>
                    <div className="font-semibold text-[#A8672E] dark:text-[#D08F52]">Morgan Stanley M&A</div>
                    <div className="text-xs text-[#A8672E] dark:text-[#D08F52]">Vice President, Technology & Telecom</div>
                  </div>
                  <div className="relative pl-6 border-l-2 border-blue-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#A8672E] dark:bg-[#D08F52]"></div>
                    <div className="text-xs font-mono text-[#A8672E] dark:text-[#D08F52] mb-1">2002-2006</div>
                    <div className="font-semibold text-[#A8672E] dark:text-[#D08F52]">White House</div>
                    <div className="text-xs text-[#A8672E] dark:text-[#D08F52]">Special Assistant to President Bush</div>
                  </div>
                  <div className="relative pl-6 border-l-2 border-blue-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500"></div>
                    <div className="text-xs font-mono text-[#A8672E] dark:text-[#D08F52] mb-1">2006-2011</div>
                    <div className="font-semibold text-[#A8672E] dark:text-[#D08F52]">Federal Reserve Governor</div>
                    <div className="text-xs text-[#A8672E] dark:text-[#D08F52]">Youngest in Fed history (Age 35)</div>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#BC4128] dark:bg-[#E2694A]"></div>
                    <div className="text-xs font-mono text-[#A8672E] dark:text-[#D08F52] mb-1">2011</div>
                    <div className="font-semibold text-[#A8672E] dark:text-[#D08F52]">Resignation</div>
                    <div className="text-xs text-[#A8672E] dark:text-[#D08F52]">Protested QE2 expansion</div>
                  </div>
                </div>
              </div>

              {/* Key Influences */}
              <div className="bg-slate-50 dark:bg-[#14171B] p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 mb-3">Intellectual Influences</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-slate-700 dark:text-slate-300">Milton Friedman (Monetarism)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#A8672E] dark:bg-[#D08F52] rounded-full"></div>
                    <span className="text-slate-700 dark:text-slate-300">Robert Mundell (Supply-Side)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-700 dark:text-slate-300">Paul Volcker (Discipline)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-8 space-y-6">
              <Card>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">Origins & The Wall Street Crucible</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Warsh's formative years at Morgan Stanley's M&A department during the dot-com boom exposed him to the raw mechanics of capital allocation. Unlike academic economists who view markets through equilibrium models, Warsh witnessed the behavioral reality: markets are sentiment-driven, momentum-fueled arenas where perception becomes reality.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-[#A8672E] dark:text-[#D08F52] mb-2">The M&A Lens</h4>
                    <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">
                      Warsh structured deals worth billions, learning how regulatory changes could instantly reshape corporate behavior and market valuations.
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-2">Market Psychology</h4>
                    <p className="text-sm text-amber-800">
                      He observed how information asymmetries and behavioral biases drive price discovery, not just fundamental analysis.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-[#14171B] p-4 rounded-lg border-l-4 border-amber-500">
                  <p className="italic text-slate-700 dark:text-slate-300 mb-2">
                    "Financial markets are not passive pricing mechanisms but active transmission channels that amplify policy signals and distort economic behavior."
                  </p>
                  <p className="text-xs text-slate-500">— Kevin Warsh, "The Federal Reserve and the Global Economy" (2017)</p>
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">The Crisis Manager & The Dissident</h3>
                
                {/* Crisis Management Section */}
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">2008: The Field General</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    While Bernanke provided the theoretical framework, Warsh was the operational commander during the 2008 crisis. He served as the Fed's primary liaison with Wall Street CEOs, making life-or-death decisions about systemically important institutions.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 rounded-lg border border-red-100">
                      <div className="font-bold text-[#BC4128] dark:text-[#E2694A]">Bear Stearns</div>
                      <div className="text-xs text-[#BC4128] dark:text-[#E2694A]">Facilitated JPM Acquisition</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="font-bold text-orange-900">Lehman Brothers</div>
                      <div className="text-xs text-orange-700">Advocated for Bankruptcy</div>
                    </div>
                    <div className="text-center p-3 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-lg border border-blue-100">
                      <div className="font-bold text-[#A8672E] dark:text-[#D08F52]">AIG</div>
                      <div className="text-xs text-[#A8672E] dark:text-[#D08F52]">Structured Bailout</div>
                    </div>
                  </div>
                </div>

                {/* The Philosophical Break */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">2011: The Philosophical Break</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Warsh's resignation letter became a manifesto against "mission creep." He argued that QE2 would create asset bubbles, increase inequality, and addict markets to artificial liquidity—predictions that proved remarkably prescient.
                  </p>
                  
                  <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-4 rounded-lg border border-red-100">
                    <h5 className="font-semibold text-[#BC4128] dark:text-[#E2694A] mb-2">The QE2 Critique (2011)</h5>
                    <ul className="text-sm text-[#BC4128] dark:text-[#E2694A] space-y-1">
                      <li>• Asset price distortions in equity and bond markets</li>
                      <li>• Increased wealth inequality through asset inflation</li>
                      <li>• Moral hazard and market dependency on Fed support</li>
                      <li>• Diminishing returns of unconventional policy</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 font-serif">
                  <Landmark size={20} className="text-teal-400" /> The Trump Calculation
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white dark:bg-[#0A0D14]/5 p-4 rounded-lg border border-white/10">
                    <h4 className="font-semibold text-teal-300 mb-2">"Central Casting" Appeal</h4>
                    <p className="text-sm text-slate-300 mb-3">
                      Warsh possesses the establishment credentials (Stanford/Harvard, G-30 membership) to provide institutional legitimacy while pursuing radical monetary reform.
                    </p>
                    <div className="text-xs text-slate-400">
                      <strong>Credentials:</strong> Hoover Institution Fellow, Group of Thirty member, Corporate board experience
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-[#0A0D14]/5 p-4 rounded-lg border border-white/10">
                    <h4 className="font-semibold text-teal-300 mb-2">The Loyalty Pivot</h4>
                    <p className="text-sm text-slate-300 mb-3">
                      In 2024, Warsh strategically aligned with Trump's "Productivity Miracle" thesis, arguing that AI-driven productivity gains justify aggressive rate cuts.
                    </p>
                    <div className="text-xs text-slate-400">
                      <strong>Key Shift:</strong> From inflation hawk to supply-side advocate
                    </div>
                  </div>
                </div>

                {/* The Political Calculus */}
                <div className="border-t border-white/20 pt-6">
                  <h4 className="font-semibold text-amber-400 mb-3">The Political Calculus</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-white mb-1">Market Credibility</div>
                      <div className="text-slate-400">Wall Street respects his crisis experience</div>
                    </div>
                    <div>
                      <div className="font-medium text-white mb-1">Academic Legitimacy</div>
                      <div className="text-slate-400">Hoover Institution provides intellectual cover</div>
                    </div>
                    <div>
                      <div className="font-medium text-white mb-1">Policy Flexibility</div>
                      <div className="text-slate-400">Not bound by traditional Fed orthodoxy</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Section 2: The Warsh Doctrine */}
          <section>
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 text-teal-600 font-bold uppercase tracking-wider text-sm mb-2">
                <BookOpen size={16} />
                <span>Core Philosophy</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4 font-serif">The Warsh Doctrine</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                A fundamental rejection of the "New Keynesian" consensus that has dominated central banking since 2008. Warsh proposes a revolutionary decoupling: separate the price of money from the quantity of money.
              </p>
              
              {/* Theoretical Foundation */}
              <div className="bg-slate-50 dark:bg-[#14171B] p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-left">
                <h3 className="font-bold text-slate-900 mb-3 font-serif">Theoretical Foundation: Supply-Side Monetarism</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-[#A8672E] dark:text-[#D08F52] mb-2">Traditional Monetarism (Friedman)</h4>
                    <p className="text-slate-600 dark:text-slate-400">Control money supply growth to manage inflation. "Inflation is always and everywhere a monetary phenomenon."</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-900 mb-2">Warsh's Innovation</h4>
                    <p className="text-slate-600 dark:text-slate-400">Decouple price (interest rates) from quantity (balance sheet). Use rates for growth, QT for inflation control.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="col-span-1 md:col-span-2 bg-white dark:bg-[#0A0D14] rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif">The "Barbell" Strategy</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Unlike traditional monetary policy that moves rates and balance sheet in tandem, Warsh proposes opposite directions: aggressive rate cuts paired with aggressive quantitative tightening.
                  </p>
                  
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                    <div className="flex-1 text-center p-6 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-xl border border-green-100 w-full">
                      <TrendingDown size={40} className="mx-auto text-[#1D8A70] dark:text-[#3CBF9C] mb-4" />
                      <h4 className="font-bold text-lg text-[#1D8A70] dark:text-[#3CBF9C] mb-2">Aggressive Rate Cuts</h4>
                      <div className="text-sm text-[#1D8A70] dark:text-[#3CBF9C] space-y-2">
                        <div className="font-semibold">Target: 3.0% - 3.25% Fed Funds</div>
                        <div className="text-xs opacity-75">
                          <strong>Rationale:</strong> High rates constrain supply-side productivity gains from AI revolution
                        </div>
                        <div className="bg-[#1D8A70] dark:bg-[#3CBF9C] p-2 rounded text-xs">
                          <strong>Mechanism:</strong> Lower cost of capital → increased business investment → productivity growth
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-slate-300 font-bold text-2xl">+</div>
                    
                    <div className="flex-1 text-center p-6 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 rounded-xl border border-red-100 w-full">
                      <TrendingUp size={40} className="mx-auto text-[#BC4128] dark:text-[#E2694A] mb-4" />
                      <h4 className="font-bold text-lg text-[#BC4128] dark:text-[#E2694A] mb-2">Aggressive QT</h4>
                      <div className="text-sm text-[#BC4128] dark:text-[#E2694A] space-y-2">
                        <div className="font-semibold">Active Asset Sales</div>
                        <div className="text-xs opacity-75">
                          <strong>Rationale:</strong> $7T balance sheet distorts price discovery and creates moral hazard
                        </div>
                        <div className="bg-[#BC4128] dark:bg-[#E2694A] p-2 rounded text-xs">
                          <strong>Mechanism:</strong> Force private markets to price risk → restore market discipline
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mathematical Framework */}
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-2">The Warsh Equation</h4>
                    <div className="font-mono text-sm text-slate-700 dark:text-slate-300 mb-2">
                      Economic Growth = f(Low Rates, Tight Money Supply, Productivity Gains)
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      Where productivity gains from AI offset inflationary pressure from rate cuts
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-[#14171B] px-8 py-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap size={16} className="text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">The Core Logic</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Supply-side monetarism: Provide cheap credit (low rates) to fuel productivity investment while maintaining tight monetary conditions (small money supply) to prevent asset bubbles and inflation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                    <Zap size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 font-serif">End of "Forward Guidance"</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Warsh despises the "dot plot" and FOMC projections. He believes telegraphing future policy suppresses healthy volatility and encourages excessive leverage.
                  </p>
                  
                  {/* Policy Comparison */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-white dark:bg-[#0A0D14]/5 p-3 rounded-lg">
                      <div className="text-[#BC4128] dark:text-[#E2694A] font-semibold text-sm mb-1">Current Fed Approach</div>
                      <div className="text-xs text-slate-400">Detailed forward guidance, dot plots, predictable policy path</div>
                    </div>
                    <div className="bg-white dark:bg-[#0A0D14]/5 p-3 rounded-lg">
                      <div className="text-[#1D8A70] dark:text-[#3CBF9C] font-semibold text-sm mb-1">Warsh Approach</div>
                      <div className="text-xs text-slate-400">Data-dependent decisions, no forward guidance, market uncertainty</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <h4 className="font-bold text-amber-400 text-sm mb-2 uppercase tracking-wide">Market Implication</h4>
                  <p className="text-white font-medium text-sm">
                    Higher volatility regime. Markets must price risk in real-time without the "Fed Put" safety net.
                  </p>
                  <div className="mt-2 text-xs text-slate-400">
                    Expected VIX range: 25-35 (vs. current 15-20)
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison with Historical Precedents */}
            <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold text-slate-900 mb-2 font-serif">Historical Precedents & Departures</h3>
                <p className="text-slate-600 dark:text-slate-400">How the Warsh Doctrine compares to previous monetary regimes</p>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#A8672E] dark:bg-[#D08F52] rounded-full flex items-center justify-center mx-auto mb-3">
                      <User size={24} className="text-[#A8672E] dark:text-[#D08F52]" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Volcker Era (1979-1987)</h4>
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <div><strong>Similarity:</strong> Prioritize price stability over employment</div>
                      <div><strong>Difference:</strong> Volcker raised rates; Warsh cuts them while tightening money supply</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#1D8A70] dark:bg-[#3CBF9C] rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp size={24} className="text-[#1D8A70] dark:text-[#3CBF9C]" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Greenspan Era (1987-2006)</h4>
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <div><strong>Similarity:</strong> Focus on productivity-driven growth</div>
                      <div><strong>Difference:</strong> Greenspan used forward guidance; Warsh rejects it</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#BC4128] dark:bg-[#E2694A] rounded-full flex items-center justify-center mx-auto mb-3">
                      <AlertTriangle size={24} className="text-[#BC4128] dark:text-[#E2694A]" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Post-2008 Consensus</h4>
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                      <div><strong>Rejection:</strong> No more QE or forward guidance</div>
                      <div><strong>Innovation:</strong> Decouple rate policy from balance sheet policy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

      {/* Strategic Infographic - Visual Summary of Key Concepts */}
      <section className="max-w-5xl mx-auto py-12">
        <InfographicSlot alt="Kevin Warsh Fed Analysis Infographic - Complete Framework Overview" />
      </section>

          {/* Section 3: Market Autopsy */}
          <section className="bg-white dark:bg-[#0A0D14] rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="bg-slate-50 dark:bg-[#14171B] p-8 border-b border-slate-200 dark:border-slate-800">
              <SectionTitle icon={BarChart2} subtitle="Case Study: Jan 30, 2026" title="The Market Autopsy" />
              <p className="text-slate-600 dark:text-slate-400 max-w-4xl mb-4">
                The Warsh nomination triggered an immediate and violent repricing across asset classes. The market's reaction provides a real-time stress test of how investors interpret the new monetary regime.
              </p>
              
              {/* Timeline of Events */}
              <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold text-slate-900 mb-3">Timeline: January 30, 2026</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                  <div className="text-center p-2 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded">
                    <div className="font-mono text-[#A8672E] dark:text-[#D08F52]">9:30 AM EST</div>
                    <div className="text-slate-700 dark:text-slate-300">Nomination announced</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-50 rounded">
                    <div className="font-mono text-yellow-600">10:15 AM EST</div>
                    <div className="text-slate-700 dark:text-slate-300">Gold begins decline</div>
                  </div>
                  <div className="text-center p-2 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 rounded">
                    <div className="font-mono text-[#BC4128] dark:text-[#E2694A]">11:30 AM EST</div>
                    <div className="text-slate-700 dark:text-slate-300">Silver flash crash</div>
                  </div>
                  <div className="text-center p-2 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded">
                    <div className="font-mono text-[#1D8A70] dark:text-[#3CBF9C]">2:00 PM EST</div>
                    <div className="text-slate-700 dark:text-slate-300">Bank stocks surge</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2">
              <div className="p-8 border-r border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 font-serif">
                  <AlertTriangle className="text-[#BC4128] dark:text-[#E2694A]" />
                  The Great Liquidation
                </h3>
                
                {/* Precious Metals Collapse */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 rounded-lg border border-red-100">
                    <div>
                      <span className="block font-bold text-[#BC4128] dark:text-[#E2694A]">Silver (SLV)</span>
                      <span className="text-xs text-[#BC4128] dark:text-[#E2694A]">Intraday Low: -30%</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-2xl text-[#BC4128] dark:text-[#E2694A]">$18.42</span>
                      <span className="text-xs text-[#BC4128] dark:text-[#E2694A]">Liquidity Vacuum</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <div>
                      <span className="block font-bold text-orange-900">Gold (GLD)</span>
                      <span className="text-xs text-orange-700">Close: -4.5%</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-2xl text-orange-600">$2,129</span>
                      <span className="text-xs text-orange-700">per ounce</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <div>
                      <span className="block font-bold text-purple-900">Bitcoin</span>
                      <span className="text-xs text-purple-700">Intraday: -8%</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-2xl text-purple-600">$89,200</span>
                      <span className="text-xs text-purple-700">Correlation breakdown</span>
                    </div>
                  </div>
                </div>

                {/* Analysis */}
                <div className="bg-slate-50 dark:bg-[#14171B] p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <h4 className="font-semibold text-slate-900 mb-2">Why the Debasement Trade Died</h4>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#BC4128] dark:bg-[#E2694A] rounded-full mt-2 flex-shrink-0"></div>
                      <div><strong>Narrative Shift:</strong> Warsh is an institutionalist who despises money printing</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div><strong>Fear Premium Evaporation:</strong> No more currency debasement concerns</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div><strong>Opportunity Cost:</strong> Higher real yields make non-yielding assets less attractive</div>
                    </div>
                  </div>
                </div>

                {/* Volume Analysis */}
                <div className="mt-6 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-[#A8672E] dark:text-[#D08F52] mb-2">Volume Analysis</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="font-medium text-[#A8672E] dark:text-[#D08F52]">GLD Volume</div>
                      <div className="text-[#A8672E] dark:text-[#D08F52]">847% above average</div>
                    </div>
                    <div>
                      <div className="font-medium text-[#A8672E] dark:text-[#D08F52]">SLV Volume</div>
                      <div className="text-[#A8672E] dark:text-[#D08F52]">1,240% above average</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 font-serif">
                  <TrendingUp className="text-[#A8672E] dark:text-[#D08F52]" />
                  The "Bear Steepener" Phenomenon
                </h3>
                
                {/* Yield Curve Movement */}
                <div className="space-y-6 mb-6">
                  <div className="relative pl-6 border-l-2 border-blue-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#A8672E] dark:bg-[#D08F52]"></div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Short-Term Rates (2Y) ↓</h4>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      <strong>Movement:</strong> 4.25% → 3.87% (-38 bps)
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Yields fall because traders expect Warsh to aggressively cut the Fed Funds Rate to stimulate productivity investment.
                    </p>
                    <div className="mt-2 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-2 rounded text-xs text-[#A8672E] dark:text-[#D08F52]">
                      <strong>Market Logic:</strong> Lower policy rates → cheaper business financing → AI productivity boom
                    </div>
                  </div>
                  
                  <div className="relative pl-6 border-l-2 border-red-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#BC4128] dark:bg-[#E2694A]"></div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Long-Term Rates (10Y/30Y) ↑</h4>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      <strong>Movement:</strong> 10Y: 4.15% → 4.52% (+37 bps), 30Y: 4.35% → 4.78% (+43 bps)
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Yields rise because Warsh will actively sell long-duration bonds. Private investors demand higher compensation for duration risk.
                    </p>
                    <div className="mt-2 bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-2 rounded text-xs text-[#BC4128] dark:text-[#E2694A]">
                      <strong>Supply Shock:</strong> Fed selling bonds → increased supply → higher yields required
                    </div>
                  </div>
                </div>

                {/* Steepening Metrics */}
                <div className="bg-slate-50 dark:bg-[#14171B] p-4 rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Curve Steepening Metrics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-slate-800 dark:text-slate-200">2s10s Spread</div>
                      <div className="text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">+75 bps (widest since 2021)</div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-800 dark:text-slate-200">5s30s Spread</div>
                      <div className="text-[#1D8A70] dark:text-[#3CBF9C] font-semibold">+58 bps</div>
                    </div>
                  </div>
                </div>

                {/* Winners and Losers */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-4 rounded-lg border border-green-100">
                    <h4 className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C] mb-2">Winners</h4>
                    <div className="space-y-1 text-sm text-[#1D8A70] dark:text-[#3CBF9C]">
                      <div>• Regional Banks (+8.5%)</div>
                      <div>• Financials Sector (+6.2%)</div>
                      <div>• Short Duration Bonds</div>
                    </div>
                  </div>
                  <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-4 rounded-lg border border-red-100">
                    <h4 className="font-semibold text-[#BC4128] dark:text-[#E2694A] mb-2">Losers</h4>
                    <div className="space-y-1 text-sm text-[#BC4128] dark:text-[#E2694A]">
                      <div>• Long Duration Bonds (-3.2%)</div>
                      <div>• REITs (-4.8%)</div>
                      <div>• Precious Metals (-15%+)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Analysis Section */}
            <div className="bg-slate-50 dark:bg-[#14171B] p-8 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 mb-6 font-serif">Technical & Flow Analysis</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <h4 className="font-semibold text-slate-900 mb-2">Options Flow</h4>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <div>• Massive put buying in TLT (long bonds)</div>
                    <div>• Call buying in KRE (regional banks)</div>
                    <div>• VIX calls surge 340%</div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <h4 className="font-semibold text-slate-900 mb-2">Institutional Flow</h4>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <div>• $2.3B outflow from gold ETFs</div>
                    <div>• $1.8B inflow to bank ETFs</div>
                    <div>• Treasury futures positioning reset</div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <h4 className="font-semibold text-slate-900 mb-2">Cross-Asset Signals</h4>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                    <div>• USD strengthens vs. gold currencies</div>
                    <div>• Credit spreads tighten (risk-on)</div>
                    <div>• Volatility term structure inverts</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Economic Impact & Action Plan */}
          <section className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-8">
              <SectionTitle icon={Globe} subtitle="Forward Outlook" title="Economic Forecast & Sectoral Impact" />
              
              {/* Macro Economic Implications */}
              <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">Macro Economic Implications</h3>
                  <p className="text-slate-600 dark:text-slate-400">How the Warsh Doctrine reshapes the economic landscape</p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#A8672E] dark:bg-[#D08F52] text-[#A8672E] dark:text-[#D08F52] rounded-lg flex-shrink-0">
                      <Landmark size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg mb-2">The Housing Paradox</h4>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        <strong>The Conflict:</strong> Trump wants low mortgage rates to stimulate housing, but Warsh wants to sell the Fed's $2.3T mortgage-backed securities portfolio.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-3 rounded-lg border border-green-100">
                          <div className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C] mb-1">Fed Funds Impact</div>
                          <div className="text-sm text-[#1D8A70] dark:text-[#3CBF9C]">3.0% Fed Funds → Lower short-term borrowing costs</div>
                        </div>
                        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-3 rounded-lg border border-red-100">
                          <div className="font-semibold text-[#BC4128] dark:text-[#E2694A] mb-1">MBS Sales Impact</div>
                          <div className="text-sm text-[#BC4128] dark:text-[#E2694A]">$2.3T MBS sales → Higher mortgage spreads</div>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                        <div className="font-semibold text-amber-900 mb-1">Net Result</div>
                        <div className="text-sm text-amber-800">
                          Even with 3% Fed Funds, mortgage rates could spike to 8-9% due to MBS supply flooding the market. Private investors will demand higher risk premiums.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#1D8A70] dark:bg-[#3CBF9C] text-[#1D8A70] dark:text-[#3CBF9C] rounded-lg flex-shrink-0">
                      <DollarSign size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg mb-2">Banking Renaissance</h4>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        <strong>The Goldmine:</strong> Steeper yield curve creates the perfect environment for traditional banking profitability.
                      </p>
                      
                      <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-4 rounded-lg border border-green-100">
                        <h5 className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C] mb-2">The Banking Equation</h5>
                        <div className="text-sm text-[#1D8A70] dark:text-[#3CBF9C] space-y-1">
                          <div>• <strong>Borrow Short:</strong> 3% Fed Funds → Cheap deposit funding</div>
                          <div>• <strong>Lend Long:</strong> 4.5%+ long-term rates → Higher loan yields</div>
                          <div>• <strong>Net Interest Margin:</strong> 150+ bps (vs. current 100 bps)</div>
                          <div>• <strong>Deregulation Bonus:</strong> Reduced compliance costs</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-2 rounded text-sm">
                          <div className="font-medium text-[#A8672E] dark:text-[#D08F52]">Regional Banks</div>
                          <div className="text-[#A8672E] dark:text-[#D08F52]">Biggest beneficiaries of steepening</div>
                        </div>
                        <div className="bg-purple-50 p-2 rounded text-sm">
                          <div className="font-medium text-purple-900">Credit Cards</div>
                          <div className="text-purple-800">Lower funding costs, stable rates</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-teal-100 text-teal-600 rounded-lg flex-shrink-0">
                      <Activity size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg mb-2">The Productivity Miracle Test</h4>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        Warsh's entire thesis depends on AI-driven productivity gains offsetting inflationary pressures from rate cuts.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-3 rounded-lg border border-green-100">
                          <div className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C] mb-1">Bull Case</div>
                          <div className="text-sm text-[#1D8A70] dark:text-[#3CBF9C]">
                            AI automation → 3-5% productivity growth → Non-inflationary expansion
                          </div>
                        </div>
                        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-3 rounded-lg border border-red-100">
                          <div className="font-semibold text-[#BC4128] dark:text-[#E2694A] mb-1">Bear Case</div>
                          <div className="text-sm text-[#BC4128] dark:text-[#E2694A]">
                            AI overhyped → Productivity disappoints → Stagflation returns
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sectoral Winners and Losers */}
              <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-slate-50 dark:bg-[#14171B] p-6 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">Sectoral Impact Analysis</h3>
                  <p className="text-slate-600 dark:text-slate-400">Which sectors thrive and which struggle under the Warsh regime</p>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-4 flex items-center gap-2">
                        <TrendingUp className="text-[#1D8A70] dark:text-[#3CBF9C]" size={20} />
                        Winners
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-3 rounded-lg border border-green-100">
                          <div className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">Regional Banks (KRE)</div>
                          <div className="text-sm text-[#1D8A70] dark:text-[#3CBF9C] mt-1">Steeper curve = higher net interest margins</div>
                          <div className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] mt-1">Expected return: +25-40%</div>
                        </div>
                        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-3 rounded-lg border border-green-100">
                          <div className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">Industrials (XLI)</div>
                          <div className="text-sm text-[#1D8A70] dark:text-[#3CBF9C] mt-1">Lower rates boost capex and infrastructure</div>
                          <div className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] mt-1">Expected return: +15-25%</div>
                        </div>
                        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-3 rounded-lg border border-green-100">
                          <div className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">Technology (AI Focus)</div>
                          <div className="text-sm text-[#1D8A70] dark:text-[#3CBF9C] mt-1">Cheap capital for productivity investments</div>
                          <div className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] mt-1">Expected return: +10-20%</div>
                        </div>
                        <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-3 rounded-lg border border-green-100">
                          <div className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">Energy Infrastructure</div>
                          <div className="text-sm text-[#1D8A70] dark:text-[#3CBF9C] mt-1">AI data centers need massive power</div>
                          <div className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] mt-1">Expected return: +20-30%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-[#BC4128] dark:text-[#E2694A] mb-4 flex items-center gap-2">
                        <TrendingDown className="text-[#BC4128] dark:text-[#E2694A]" size={20} />
                        Losers
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-3 rounded-lg border border-red-100">
                          <div className="font-semibold text-[#BC4128] dark:text-[#E2694A]">REITs (VNQ)</div>
                          <div className="text-sm text-[#BC4128] dark:text-[#E2694A] mt-1">Higher long-term rates hurt property values</div>
                          <div className="text-xs text-[#BC4128] dark:text-[#E2694A] mt-1">Expected return: -15-25%</div>
                        </div>
                        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-3 rounded-lg border border-red-100">
                          <div className="font-semibold text-[#BC4128] dark:text-[#E2694A]">Long Duration Bonds (TLT)</div>
                          <div className="text-sm text-[#BC4128] dark:text-[#E2694A] mt-1">Fed selling creates supply overhang</div>
                          <div className="text-xs text-[#BC4128] dark:text-[#E2694A] mt-1">Expected return: -20-30%</div>
                        </div>
                        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-3 rounded-lg border border-red-100">
                          <div className="font-semibold text-[#BC4128] dark:text-[#E2694A]">Precious Metals</div>
                          <div className="text-sm text-[#BC4128] dark:text-[#E2694A] mt-1">No debasement fear + higher real yields</div>
                          <div className="text-xs text-[#BC4128] dark:text-[#E2694A] mt-1">Expected return: -10-20%</div>
                        </div>
                        <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-3 rounded-lg border border-red-100">
                          <div className="font-semibold text-[#BC4128] dark:text-[#E2694A]">Utilities (XLU)</div>
                          <div className="text-sm text-[#BC4128] dark:text-[#E2694A] mt-1">Bond proxies suffer from rate volatility</div>
                          <div className="text-xs text-[#BC4128] dark:text-[#E2694A] mt-1">Expected return: -5-15%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="mt-8">
                <h3 className="font-bold text-slate-900 mb-6 text-xl font-serif">Risk Assessment: Is Warsh the Right Choice?</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                    <div className="font-bold text-teal-800 mb-4 flex items-center gap-2">
                      <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                      PROS
                    </div>
                    <ul className="text-sm text-teal-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div><strong>Market Discipline:</strong> Ends moral hazard and "Fed Put" dependency</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div><strong>Crisis Experience:</strong> Proven ability to manage financial instability</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div><strong>Communication:</strong> Exceptional ability to explain complex policy</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div><strong>Innovation:</strong> Willing to break from failed post-2008 consensus</div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-6 rounded-xl border border-rose-100">
                    <div className="font-bold text-[#BC4128] dark:text-[#E2694A] mb-4 flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#BC4128] dark:bg-[#E2694A] rounded-full"></div>
                      CONS
                    </div>
                    <ul className="text-sm text-[#BC4128] dark:text-[#E2694A] space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#BC4128] dark:bg-[#E2694A] rounded-full mt-2 flex-shrink-0"></div>
                        <div><strong>Execution Risk:</strong> UK gilt crisis shows dangers of rapid QT</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#BC4128] dark:bg-[#E2694A] rounded-full mt-2 flex-shrink-0"></div>
                        <div><strong>Inflation Risk:</strong> Rate cuts could reignite price pressures</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#BC4128] dark:bg-[#E2694A] rounded-full mt-2 flex-shrink-0"></div>
                        <div><strong>Inequality:</strong> Asset price volatility hurts middle class</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#BC4128] dark:bg-[#E2694A] rounded-full mt-2 flex-shrink-0"></div>
                        <div><strong>Political Risk:</strong> Senate confirmation uncertain</div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Probability Assessment */}
                <div className="mt-6 bg-slate-50 dark:bg-[#14171B] p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 mb-4">Probability Assessment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-1">75%</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Confirmation Probability</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-600 mb-1">60%</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Policy Success Probability</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#BC4128] dark:text-[#E2694A] mb-1">25%</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Crisis Risk (2026-2027)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="bg-slate-900 rounded-2xl p-8 text-white sticky top-24 shadow-2xl">
                <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-sm mb-6">
                  <ShieldAlert size={16} />
                  <span>Strategic Portfolio Positioning</span>
                </div>
                <h3 className="text-2xl font-bold mb-6 font-serif">How to Position for the Warsh Era</h3>
                
                <div className="space-y-6">
                  <div className="border-l-2 border-amber-500 pl-4">
                    <h4 className="font-bold text-lg mb-2">1. Avoid Duration Risk</h4>
                    <p className="text-slate-400 text-sm mb-2">
                      Do not hold long-term Treasuries (20+ years). The Fed will actively sell, creating supply overhang.
                    </p>
                    <div className="bg-white dark:bg-[#0A0D14]/5 p-2 rounded text-xs text-slate-300">
                      <strong>Specific Avoid:</strong> TLT, ZROZ, EDV, long-term corporate bonds
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-teal-500 pl-4">
                    <h4 className="font-bold text-lg mb-2">2. Embrace the "Belly"</h4>
                    <p className="text-slate-400 text-sm mb-2">
                      Position in 2-year to 5-year notes. These will benefit from Fed rate cuts.
                    </p>
                    <div className="bg-white dark:bg-[#0A0D14]/5 p-2 rounded text-xs text-slate-300">
                      <strong>Specific Plays:</strong> SHY, IEI, 2-5 year Treasury ladder
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-purple-500 pl-4">
                    <h4 className="font-bold text-lg mb-2">3. Sector Rotation Strategy</h4>
                    <p className="text-slate-400 text-sm mb-2">
                      Overweight beneficiaries of steeper curves and lower rates.
                    </p>
                    <div className="bg-white dark:bg-[#0A0D14]/5 p-2 rounded text-xs text-slate-300 space-y-1">
                      <div><strong>Overweight:</strong> KRE (regional banks), XLI (industrials)</div>
                      <div><strong>Underweight:</strong> VNQ (REITs), XLU (utilities)</div>
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-red-500 pl-4">
                    <h4 className="font-bold text-lg mb-2">4. Long Volatility</h4>
                    <p className="text-slate-400 text-sm mb-2">
                      Without forward guidance, markets will be more volatile. Position accordingly.
                    </p>
                    <div className="bg-white dark:bg-[#0A0D14]/5 p-2 rounded text-xs text-slate-300">
                      <strong>Instruments:</strong> VIX calls, UVXY, volatility targeting strategies
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-blue-500 pl-4">
                    <h4 className="font-bold text-lg mb-2">5. Currency Positioning</h4>
                    <p className="text-slate-400 text-sm mb-2">
                      Strong dollar thesis if productivity gains materialize.
                    </p>
                    <div className="bg-white dark:bg-[#0A0D14]/5 p-2 rounded text-xs text-slate-300">
                      <strong>Plays:</strong> DXY long, emerging market caution
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-700">
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Wildcard Scenario</div>
                  <div className="font-semibold text-slate-200 flex items-center gap-2 mb-2">
                    <AlertTriangle size={16} className="text-amber-500"/> The "Tillis Put"
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    If Senate confirmation fails (25% probability), markets revert to status quo. Keep small defensive allocation.
                  </p>
                  <div className="bg-white dark:bg-[#0A0D14]/5 p-2 rounded text-xs text-slate-300">
                    <strong>Insurance:</strong> Small gold allocation (5%), long-duration bonds hedge
                  </div>
                </div>
                
                {/* Risk Management */}
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <h4 className="font-bold text-amber-400 text-sm mb-3 uppercase tracking-wide">Risk Management Rules</h4>
                  <div className="space-y-2 text-xs text-slate-400">
                    <div>• Position size: Max 5% in any single theme</div>
                    <div>• Stop losses: 15% on individual positions</div>
                    <div>• Rebalance: Monthly based on confirmation progress</div>
                    <div>• Hedge ratio: 10-15% portfolio in volatility protection</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* New Conclusion Section */}
          <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl shadow-2xl text-white overflow-hidden">
            <div className="relative p-12 md:p-16">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
              
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-[#0A0D14]/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-teal-300 mb-6">
                  <Globe size={16} />
                  <span>Strategic Synthesis</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-serif">
                  The Warsh Gambit: <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">
                    Reconfiguring American Finance
                  </span>
                </h2>
                
                <p className="text-lg md:text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed">
                  Kevin Warsh's nomination represents more than a personnel change—it's an epistemological break from 15 years of post-crisis monetary orthodoxy. The success or failure of his "barbell" strategy will determine whether America enters a new golden age of productivity-driven growth or faces a reckoning with the accumulated distortions of the QE era.
                </p>

                {/* Key Insights Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white dark:bg-[#0A0D14]/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                    <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
                      <Zap size={24} className="text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-2 font-serif">The Innovation</h3>
                    <p className="text-sm text-slate-300">
                      Decoupling interest rates from balance sheet policy—using rates for growth and QT for inflation control—represents a fundamental reimagining of central banking.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-[#0A0D14]/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <AlertTriangle size={24} className="text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-2 font-serif">The Risk</h3>
                    <p className="text-sm text-slate-300">
                      Execution complexity is enormous. The UK gilt crisis demonstrates how quickly bond markets can destabilize when central banks sell aggressively.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-[#0A0D14]/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Activity size={24} className="text-white" />
                    </div>
                    <h3 className="font-bold text-white mb-2 font-serif">The Stakes</h3>
                    <p className="text-sm text-slate-300">
                      If successful, Warsh could usher in an era of non-inflationary growth. If it fails, the resulting instability could dwarf previous financial crises.
                    </p>
                  </div>
                </div>

                {/* Timeline Outlook */}
                <div className="bg-white dark:bg-[#0A0D14]/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl mb-8">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2 font-serif">
                    <BarChart2 size={20} className="text-teal-400" />
                    Critical Timeline: 2026-2028
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-mono text-teal-300 mb-1">Q2 2026</div>
                      <div className="text-slate-300">Senate Confirmation</div>
                      <div className="text-xs text-slate-400">Market volatility peaks</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-amber-300 mb-1">Q3 2026</div>
                      <div className="text-slate-300">Policy Implementation</div>
                      <div className="text-xs text-slate-400">First rate cuts begin</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-purple-300 mb-1">Q4 2026</div>
                      <div className="text-slate-300">QT Acceleration</div>
                      <div className="text-xs text-slate-400">Bond market stress test</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-[#BC4128] dark:text-[#E2694A] mb-1">2027-2028</div>
                      <div className="text-slate-300">Outcome Clarity</div>
                      <div className="text-xs text-slate-400">Success or crisis</div>
                    </div>
                  </div>
                </div>

                {/* Final Assessment */}
                <div className="border-t border-white/20 pt-8">
                  <h3 className="font-bold text-white mb-4 text-xl font-serif">The Verdict</h3>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    Warsh's appointment signals Trump's willingness to embrace radical monetary experimentation. Unlike previous Fed chairs who operated within established paradigms, Warsh explicitly rejects the post-2008 consensus. This creates both unprecedented opportunity and systemic risk.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    For investors, the Warsh era demands active portfolio management, higher volatility tolerance, and careful attention to sectoral rotation. The days of "buy everything" and rely on Fed support are ending. Welcome to the age of market discipline.
                  </p>
                </div>
              </div>
            </div>
          </section>

    </ArticleFrame>
  );
}