'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Lightbulb, LineChart, PieChart, AlertTriangle, Building2, Users, CheckCircle2, XCircle, Sigma, Zap, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// Reusable Components for the Tutorial
const SectionHeading = ({ icon: Icon, title, color }: { icon: React.ElementType; title: string; color: string }) => (
  <div className="flex items-center space-x-3 mb-6">
    <div className={`p-3 rounded-2xl bg-${color}-100 text-${color}-600`}>
      <Icon size={28} strokeWidth={2.5} />
    </div>
    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h2>
  </div>
);

const FormulaBlock = ({ title, formula, description, color = "blue" }: { title: string; formula: string; description: React.ReactNode; color?: string }) => (
  <div className={`my-6 border-l-4 border-${color}-500 bg-${color}-50/50 p-6 rounded-r-2xl shadow-sm`}>
    <h4 className={`text-sm font-bold text-${color}-700 uppercase tracking-wider mb-3`}>{title}</h4>
    <div className="flex justify-center my-4 py-4 bg-white rounded-xl shadow-inner overflow-x-auto">
      <code className="text-2xl md:text-3xl font-mono text-slate-800 whitespace-nowrap px-4">{formula}</code>
    </div>
    <p className={`text-${color}-900 leading-relaxed`}>{description}</p>
  </div>
);

const Callout = ({ title, children, type = "info" }: { title: string; children: React.ReactNode; type?: 'info' | 'warning' | 'danger' | 'success' }) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    danger: "bg-rose-50 border-rose-200 text-rose-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
  };
  return (
    <div className={`my-6 p-5 border rounded-2xl ${styles[type]}`}>
      <h4 className="font-bold mb-2 flex items-center">
        {type === 'warning' && <AlertTriangle className="mr-2 w-5 h-5" />}
        {type === 'danger' && <XCircle className="mr-2 w-5 h-5" />}
        {type === 'success' && <CheckCircle2 className="mr-2 w-5 h-5" />}
        {title}
      </h4>
      <div className="text-sm md:text-base leading-relaxed space-y-2 opacity-90">{children}</div>
    </div>
  );
};

export default function KellyCriterionArticle() {
  const currentArticle = articles.find(article => article.slug === 'kelly-criterion-optimal-position-sizing-information-theory');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans text-slate-700 selection:bg-indigo-100 selection:text-indigo-900">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="relative overflow-hidden bg-white border-b border-slate-200">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-70"></div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gradient-to-tr from-rose-100 to-orange-100 blur-3xl opacity-50"></div>
          <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
              <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Quantitative Trading Tutorial</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">The Kelly Criterion</h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed font-light">
              Optimal Position Sizing from Information Theory to Practice. Discover why signal generation is only half the battle, and how mathematics dictates your long-term survival in financial markets.
            </p>
          </div>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        {currentArticle?.imageUrl && (
          <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
              onClick={() => setIsImageViewerOpen(true)}
            >
              <img 
                src={currentArticle.imageUrl} 
                alt="Kelly Criterion Infographic" 
                className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
              />
              {/* Full-screen button overlay */}
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
              {/* Click hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
                <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                  Click to view full screen
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Full-screen image viewer */}
        {currentArticle?.imageUrl && (
          <FullScreenImageViewer
            src={currentArticle.imageUrl}
            alt="Kelly Criterion Infographic"
            isOpen={isImageViewerOpen}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="max-w-4xl mx-auto px-6 py-16 space-y-24">
          {/* Section 1: Introduction */}
          <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-400 to-blue-500"></div>
            <SectionHeading icon={BookOpen} title="1. Introduction & Origins" color="blue" />
            <div className="prose prose-slate max-w-none text-lg leading-relaxed">
              <p>In probability theory and financial economics, market participants face two distinct challenges: finding a statistical edge (Alpha), and determining how much capital to risk on that edge (Position Sizing).</p>
              <Callout title="The Golden Rule of Risk" type="info">
                A trader with a mediocre strategy but an exceptional risk management model can survive and compound wealth. A trader with a brilliant strategy but a flawed position sizing model will almost certainly face absolute ruin.
              </Callout>
              <p>Developed in 1956 by John Larry Kelly Jr. at AT&T's Bell Laboratories, the Kelly Criterion is a mathematically rigorous risk allocation formula. Its goal is to maximize the long-term expected value of the logarithm of wealth—which equates to maximizing the long-term geometric growth rate of a portfolio.</p>
              <p>Interestingly, it wasn't born on Wall Street. It emerged from <strong>Information Theory</strong>, pioneered by Claude Shannon. Kelly showed that a bettor's capital could grow exponentially at a rate precisely equal to the rate of information transmission over a noisy communication channel.</p>
            </div>
          </section>

          {/* Section 2: Foundations */}
          <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-emerald-400 to-teal-500"></div>
            <SectionHeading icon={Lightbulb} title="2. Information Theoretic Foundations" color="emerald" />
            <div className="space-y-6 text-lg leading-relaxed text-slate-700">
              <p>Claude Shannon defined <em>entropy</em> as the mathematical measure of uncertainty. John Kelly attached an economic utility to this. He realized that maximizing the simple expected value (arithmetic mean) of bets leads to catastrophic ruin, because you'd bet 100% of your bankroll on any positive expectation—guaranteeing bankruptcy the first time you lose.</p>
              <p>Instead, Kelly adopted the <strong>logarithmic utility function</strong> (proposed by Daniel Bernoulli in 1738). The logarithm function strictly penalizes total ruin (as log(0) approaches negative infinity), naturally forcing a bettor to retain a fraction of capital in reserve.</p>
              <FormulaBlock 
                title="The Discrete Binary Kelly Formula"
                formula="f* = (bp - q) / b"
                color="emerald"
                description={
                  <>
                    Where <strong>f*</strong> is the optimal fraction of your bankroll to wager. <strong>p</strong> is the probability of winning. <strong>q</strong> is the probability of losing (1 - p). <strong>b</strong> is the payout ratio (net odds received).
                  </>
                }
              />
              <p>If your mathematical edge is zero (p matches implied market probability), the formula yields exactly zero. No bet should be placed. If the formula is negative, you should take the opposite side of the trade!</p>
            </div>
          </section>

          {/* Section 3: Continuous Markets */}
          <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-sky-400 to-indigo-500"></div>
            <SectionHeading icon={LineChart} title="3. Continuous Markets & MPT" color="sky" />
            <div className="space-y-6 text-lg leading-relaxed text-slate-700">
              <p>Financial markets rarely offer binary outcomes. In equities and derivatives, returns are continuous. Assuming asset prices follow Geometric Brownian Motion, the optimal Kelly allocation transforms into the <strong>Merton Fraction</strong>.</p>
              <FormulaBlock 
                title="Continuous Kelly (Merton Fraction)"
                formula="f* = (μ - r) / σ²"
                color="sky"
                description={
                  <>
                    Where <strong>μ</strong> is the expected return, <strong>r</strong> is the risk-free rate, and <strong>σ²</strong> is the variance. Allocation is directly proportional to the risk premium and inversely proportional to systemic risk.
                  </>
                }
              />
              <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-6">Kelly vs. Markowitz Mean-Variance</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold text-slate-700 uppercase tracking-wider">Feature</th>
                      <th className="px-6 py-4 text-left font-bold text-sky-700 uppercase tracking-wider">Markowitz (MPT)</th>
                      <th className="px-6 py-4 text-left font-bold text-indigo-700 uppercase tracking-wider">Kelly Criterion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-900">Primary Objective</td>
                      <td className="px-6 py-4">Maximize return for a subjective level of risk.</td>
                      <td className="px-6 py-4 font-medium text-indigo-700">Maximize long-term expected geometric growth.</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-900">Diversification</td>
                      <td className="px-6 py-4">Highly diversified to smooth equity curve.</td>
                      <td className="px-6 py-4">Highly concentrated; allocates 0% to inferior assets.</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-900">Drawdown Risk</td>
                      <td className="px-6 py-4">Moderated by variance penalties.</td>
                      <td className="px-6 py-4 text-rose-600 font-medium">Extremely high; tolerates massive short-term pain.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4: Options Trading */}
          <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-400 to-violet-500"></div>
            <SectionHeading icon={PieChart} title="4. Kelly in Options Trading" color="purple" />
            <div className="space-y-6 text-lg leading-relaxed text-slate-700">
              <p>Options trading bridges the discrete and continuous mathematical realms. While pricing follows stochastic continuous processes, at expiration, an option resolves into a strictly discrete payoff.</p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-purple-50 p-6 rounded-2xl">
                  <h4 className="font-bold text-purple-900 mb-2 flex items-center">
                    <Zap className="w-5 h-5 mr-2" /> Probabilities
                  </h4>
                  <p className="text-sm text-purple-800">Quantitative traders use the Black-Scholes model to extract market-implied probabilities, often approximated by the option's Delta. They compare this to their own Bayesian updated models to find their 'edge' for the Kelly formula.</p>
                </div>
                <div className="bg-violet-50 p-6 rounded-2xl">
                  <h4 className="font-bold text-violet-900 mb-2 flex items-center">
                    <Sigma className="w-5 h-5 mr-2" /> Multi-Leg Strategies
                  </h4>
                  <p className="text-sm text-violet-800">For asymmetric strategies like Iron Condors, traders calculate net math across legs. E.g., an 85% win probability with a $300 credit and $1,500 max loss yields a discrete Kelly fraction recommending a precise capital percentage.</p>
                </div>
              </div>
              <Callout title="Catastrophic Loss Adjustments" type="warning">
                Standard binary math fails for naked options due to Black Swan gap-downs. Advanced formulations map a three-state distribution (win, average loss, catastrophic loss), requiring a quadratic Kelly equation to size positions down safely.
              </Callout>
            </div>
          </section>

          {/* Section 5: Vulnerabilities */}
          <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-rose-400 to-orange-500"></div>
            <SectionHeading icon={AlertTriangle} title="5. Vulnerabilities & Estimation Error" color="rose" />
            <div className="space-y-6 text-lg leading-relaxed text-slate-700">
              <p>Why does a theoretically perfect formula fail in practice? <strong>Estimation Risk.</strong> Financial probabilities are never known with certainty. The Kelly formula is violently sensitive to input errors, especially overestimating your edge.</p>
              <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 mb-6">
                <h3 className="text-xl font-bold text-rose-900 mb-4">The Chopra-Ziemba Ratio (20:2:1)</h3>
                <ul className="space-y-3 text-rose-800 text-base">
                  <li><strong className="text-rose-900">Expected Mean Return (Impact: 20x)</strong> - Catastrophic. Overestimating leads to massive over-leveraging and direct ruin.</li>
                  <li><strong className="text-rose-900">Variance (Impact: 2x)</strong> - Moderate. Underestimating leads to excessive sizing, but overshadowed by mean errors.</li>
                  <li><strong className="text-rose-900">Covariance (Impact: 1x)</strong> - Low. Rarely triggers direct portfolio blowouts.</li>
                </ul>
              </div>
              <h4 className="font-bold text-slate-800">Volatility Drag & Drawdowns</h4>
              <p>A portfolio operating at "Full Kelly" has an inherent 33% chance of experiencing a 66% drawdown, and a 20% chance of an 80% drawdown. Due to negative geometric drag, a 50% loss requires a 100% gain just to break even. Betting even a fraction of a percent <em>over</em> optimal Kelly plummets your expected growth rate into negative territory.</p>
            </div>
          </section>

          {/* Section 6: Institutional Usage */}
          <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-amber-400 to-yellow-500"></div>
            <SectionHeading icon={Building2} title="6. Institutional Application: Fractional Kelly" color="amber" />
            <div className="space-y-6 text-lg leading-relaxed text-slate-700">
              <p>Despite the dangers, Kelly remains the gold standard for quantitative hedge funds (pioneered by Ed Thorp). However, institutions <strong>almost never</strong> trade at "Full Kelly." To survive estimation error and extreme drawdowns, they use <strong>Fractional Kelly</strong>.</p>
              <div className="overflow-x-auto rounded-xl border border-amber-200 shadow-sm my-6">
                <table className="min-w-full divide-y divide-amber-200 bg-white text-sm text-center">
                  <thead className="bg-amber-50">
                    <tr>
                      <th className="px-4 py-4 font-bold text-amber-900">Strategy</th>
                      <th className="px-4 py-4 font-bold text-amber-900">Growth Retained</th>
                      <th className="px-4 py-4 font-bold text-amber-900">Variance Experienced</th>
                      <th className="px-4 py-4 font-bold text-amber-900">80% Drawdown Prob.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100">
                    <tr className="hover:bg-amber-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-800">Full Kelly (1.0x)</td>
                      <td className="px-4 py-3 text-emerald-600 font-bold">100%</td>
                      <td className="px-4 py-3 text-rose-600 font-bold">100%</td>
                      <td className="px-4 py-3 text-rose-600">~20.0% (1-in-5)</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-800">Half Kelly (0.5x)</td>
                      <td className="px-4 py-3">75%</td>
                      <td className="px-4 py-3">25% (1/4th)</td>
                      <td className="px-4 py-3">Extremely Low</td>
                    </tr>
                    <tr className="bg-amber-100 hover:bg-amber-200 transition-colors">
                      <td className="px-4 py-3 font-semibold text-amber-900">Quarter Kelly (0.25x)</td>
                      <td className="px-4 py-3 font-medium">~50%</td>
                      <td className="px-4 py-3 font-medium">Negligible</td>
                      <td className="px-4 py-3 font-medium">Near Zero</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>By dropping to a Half or Quarter Kelly, funds sacrifice a small top-end growth rate for an exponential reduction in volatility, creating a mathematical margin of safety. Advanced desks also use <strong>Risk-Constrained Kelly (RCK)</strong> to cap drawdowns and <strong>Bayesian Kelly</strong> to adapt probabilities dynamically tick-by-tick.</p>
            </div>
          </section>

          {/* Section 7: Retail Investors */}
          <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-slate-400 to-slate-600"></div>
            <SectionHeading icon={Users} title="7. Suitability for Retail Investors" color="slate" />
            <div className="space-y-6 text-lg leading-relaxed text-slate-700">
              <p>Is the Kelly Criterion suitable for the common retail investor? In practice: <strong>No.</strong></p>
              <Callout title="The Illusion of Known Probabilities" type="danger">
                Retail investors lack the infrastructure to calculate real-time probability density functions. When a retail trader guesses a "60% chance of going up" based on chart patterns, feeding that emotional guess into the hyper-sensitive Kelly formula is mathematically lethal.
              </Callout>
              <ul className="list-disc pl-6 space-y-4 marker:text-slate-400">
                <li><strong>Capital & Micro-structure Friction:</strong> Kelly assumes continuous, costless rebalancing. For retail, bid-ask spreads, commissions, and taxes quickly erode the geometric growth curve.</li>
                <li><strong>Extreme Concentration:</strong> Kelly eschews passive diversification. It might tell you to put 40% of your net worth into a single options spread—violating prudent index investing principles.</li>
                <li><strong>Psychological Tolerance:</strong> Human loss aversion guarantees that a retail investor facing a mathematically "normal" 30% Kelly drawdown will panic and liquidate at the bottom, locking in permanent loss.</li>
              </ul>
              <div className="bg-slate-100 p-6 rounded-2xl mt-8">
                <h4 className="font-bold text-slate-800 mb-2">Conclusion</h4>
                <p className="text-slate-600 text-base">The Kelly Criterion is the absolute mathematical truth of capital compounding. It establishes the frontier of risk and reward—proving that excessive caution yields stagnation, but excessive aggression guarantees destruction. While it remains the engine of Wall Street quants, retail traders are much better served by fixed-fractional sizing (e.g., risking exactly 1-2% per trade) to ensure psychological endurance and long-term survival.</p>
              </div>
            </div>
          </section>

          {/* Call-to-Action: Read Full Research Paper */}
          {currentArticle?.googleDoc && (
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-xl my-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <BookOpen className="inline mr-2" />
                  Read Full Research Paper
                </a>
              </div>
            </div>
          )}
        </main>

        <footer className="bg-white border-t border-slate-200 py-10 text-center mt-12">
          <p className="text-slate-500 text-sm">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
        </footer>
      </div>
    </>
  );
}
