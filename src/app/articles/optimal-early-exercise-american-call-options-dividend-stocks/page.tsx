'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calculator, TrendingUp, AlertTriangle, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

// Helper component for icons
const Icon = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const BookOpenIcon = () => (
  <Icon>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </Icon>
);

const CalculatorIcon = () => (
  <Icon>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="16" y1="14" x2="16" y2="18" />
    <path d="M16 10h.01" />
    <path d="M12 10h.01" />
    <path d="M8 10h.01" />
    <path d="M12 14h.01" />
    <path d="M8 14h.01" />
    <path d="M12 18h.01" />
    <path d="M8 18h.01" />
  </Icon>
);

const ChartIcon = () => (
  <Icon>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </Icon>
);

// Reusable component for section titles
const SectionTitle = ({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) => (
  <div className="mb-12">
    <div className="flex items-center gap-5 mb-6">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg">
        {icon}
      </div>
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
        <p className="text-lg text-gray-600 mt-1">{subtitle}</p>
      </div>
    </div>
    <hr className="border-gray-200" />
  </div>
);

// Reusable component for content cards
const ContentCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 mb-8 hover:shadow-xl transition-shadow duration-300">
    {children}
  </div>
);

// Component to render mathematical formulas
const Formula = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 rounded-r-xl overflow-x-auto shadow-sm">
    <div className="text-gray-800 text-base md:text-lg font-semibold text-center italic">{children}</div>
  </div>
);

// Component for styled tables
const StyledTable = ({ headers, data }: { headers: string[]; data: string[][] }) => (
  <div className="overflow-x-auto my-8 rounded-xl border border-gray-200 shadow-md">
    <table className="min-w-full divide-y divide-gray-200 bg-white">
      <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <tr>
          {headers.map((header, index) => (
            <th key={index} scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-indigo-50/30 transition-colors duration-200">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-6 py-4 text-sm text-gray-700">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Component for highlighting text
const Highlight = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded">{children}</strong>
);

// Risk Warning Component
const RiskWarning = () => (
  <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 my-8 rounded-r-xl shadow-md">
    <div className="flex items-start">
      <AlertTriangle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
      <div>
        <h3 className="text-lg font-bold text-red-900 mb-2">Risk Warning</h3>
        <p className="text-red-800 text-sm leading-relaxed">
          Options trading involves substantial risk and is not suitable for all investors. Early exercise decisions can result in significant losses. 
          The theoretical models presented here make assumptions that may not hold in real market conditions. Always consult with a qualified 
          financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  </div>
);

export default function OptimalEarlyExerciseArticle() {
  const currentArticle = articles.find(article => article.slug === 'optimal-early-exercise-american-call-options-dividend-stocks');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  const table1Headers = ["Scenario", "Stock Price (S)", "Strike (K)", "Intrinsic Value (S−K)", "Dividend (D)", "Option Price (C)", "Time Value (C − (S−K))", "Decision (Is D > Time Value?)"];
  const table1Data = [
    ["1. Out-of-the-Money", "$95", "$100", "$0", "$2.00", "$3.50", "$3.50", "HOLD ($2.00 < 3.50)"],
    ["2. At-the-Money", "$100", "$100", "$0", "$2.00", "$6.00", "$6.00", "HOLD ($2.00 < 6.00)"],
    ["3. In-the-Money, High Time Value", "$110", "$100", "$10", "$2.00", "$12.50", "$2.50", "HOLD ($2.00 < 2.50)"],
    ["4. Deep ITM, Low Time Value", "$130", "$100", "$30", "$2.00", "$30.50", "$0.50", "EXERCISE ($2.00 > 0.50)"],
    ["5. Deep ITM, Large Dividend", "$130", "$100", "$30", "$3.00", "$30.50", "$0.50", "EXERCISE ($3.00 > 0.50)"]
  ];

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && currentArticle.title && currentArticle.slug && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="bg-[#FAFAFC] font-sans text-gray-800 antialiased min-h-screen">
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Section */}
        <header className="relative pt-24 pb-20 px-6 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold text-sm mb-8">
              <BookOpen size={16} /> Deep Research
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 leading-tight mb-6">
              Optimal Early Exercise of American Call Options on Dividend-Paying Stocks
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              A comprehensive theoretical and computational analysis of the early exercise decision for rational investors.
            </p>
          </div>
        </header>

        {/* Hero Infographic - Below Title with Full-Screen Capability */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
            onClick={() => setIsImageViewerOpen(true)}
          >
            <img 
              src="https://i.imgur.com/yYUhUcF.jpeg" 
              alt="Optimal Early Exercise Decision Framework" 
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

        {/* Full-screen image viewer */}
        <FullScreenImageViewer
          src="https://i.imgur.com/yYUhUcF.jpeg"
          alt="Optimal Early Exercise Decision Framework"
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* Badges */}
        <div className="max-w-5xl mx-auto px-6 flex justify-end gap-2 mb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
            <TrendingUp className="w-3 h-3 mr-1" />
            Options
          </span>
        </div>

        <main className="max-w-5xl mx-auto px-6 pb-24 relative z-10">

          <RiskWarning />

          {/* Part I: Theoretical Framework */}
          <section id="part1">
            <SectionTitle 
              icon={<BookOpenIcon />}
              title="Part I: The Theoretical Framework"
              subtitle="Establishing the fundamental principles for the early exercise decision."
            />

            <ContentCard>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Section 1: The Economics of the Early Exercise Decision</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The premium of an option is composed of two distinct components: <Highlight>intrinsic value</Highlight> and <Highlight>time value</Highlight>. 
                  Understanding this is fundamental to the early exercise decision.
                </p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                  <li>
                    <Highlight>Intrinsic Value:</Highlight> The immediate profit from exercise, expressed as max(S - K, 0). 
                    An option with positive intrinsic value is "<Highlight>in-the-money</Highlight>" (ITM).
                  </li>
                  <li>
                    <Highlight>Time Value:</Highlight> The premium exceeding intrinsic value. It is the price of *potential*, 
                    representing the value of the "<Highlight>option to wait</Highlight>". It captures both <Highlight>volatility value</Highlight> (potential for future gains) 
                    and <Highlight>interest rate value</Highlight> (interest earned on deferred capital).
                  </li>
                </ul>
                <p>
                  When an investor exercises an option, any remaining <Highlight>time value is immediately and irrevocably forfeited</Highlight>. 
                  This is why it is <Highlight>never optimal to exercise an American call option on a non-dividend-paying stock</Highlight>. 
                  It is always more profitable to sell the option on the open market, as a buyer will pay for its remaining time value.
                </p>
                <p>
                  The entire framework changes when the stock pays a <Highlight>discrete cash dividend</Highlight>. On the ex-dividend date, 
                  the stock price is expected to fall by the dividend amount. Since option holders do not receive dividends, they face a critical trade-off: 
                  hold the option and suffer a capital loss, or exercise to capture the dividend but forfeit all remaining time value. 
                  This conflict is the <Highlight>sole economic rationale</Highlight> for considering early exercise.
                </p>
              </div>
            </ContentCard>

            <ContentCard>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Section 2: The Decision Rule and the Critical Stock Price</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  A rational investor should exercise an American call option early if, and only if, the dividend to be gained is greater than 
                  the time value of the option to be forfeited. This condition is most likely met when the option is <Highlight>deep in-the-money</Highlight>, 
                  where its time value is minimal.
                </p>
                <Formula>
                  <span>Dividend (<em>D</em>) &gt; Time Value of the Call Option</span>
                </Formula>
                <p>
                  If exercise is optimal, it should be done <Highlight>immediately prior to the stock going ex-dividend</Highlight>. 
                  This maximizes the time value preserved up to that point. There exists a critical stock price, <em>S*</em>, where an investor is indifferent 
                  between exercising and holding. It is found by solving:
                </p>
                <Formula>
                  <span><em>S*</em> − <em>K</em> = <em>C</em><sub>european</sub>(<em>S*</em> − <em>D</em>, <em>T</em> − <em>t<sub>d</sub></em>)</span>
                </Formula>
                <p>
                  If the current stock price <em>S</em> &gt; <em>S*</em>, <Highlight>early exercise is the optimal action</Highlight>. 
                  The following table illustrates this decision process.
                </p>
                <h4 className="font-semibold text-gray-700 pt-4">Table 1: Early Exercise Decision Matrix</h4>
                <StyledTable headers={table1Headers} data={table1Data} />
              </div>
            </ContentCard>

            <ContentCard>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Section 3: Applying the Black-Scholes Framework: Black's Approximation</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The standard <Highlight>Black-Scholes-Merton (BSM) model</Highlight> is for European options and doesn't natively handle early exercise 
                  or discrete dividends. Fischer Black proposed a "<Highlight>pseudo-American</Highlight>" valuation method that approximates the American call's 
                  value by comparing two scenarios:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>
                    <b>Scenario 1 (Hold):</b> Value the option as a European call on an adjusted stock price <em>S&apos;</em> = <em>S</em> − PV(<em>D</em>), held to original expiration.
                    <Formula>
                      <span><em>C</em><sub>hold</sub> = BS(<em>S&apos;</em>, <em>K</em>, <em>T</em>, <em>r</em>, <em>σ</em>)</span>
                    </Formula>
                  </li>
                  <li>
                    <b>Scenario 2 (Exercise):</b> Value the option as a European call that expires just before the ex-dividend date, <em>t<sub>d</sub></em>.
                    <Formula>
                      <span><em>C</em><sub>exercise_timing</sub> = BS(<em>S</em>, <em>K</em>, <em>t<sub>d</sub></em>, <em>r</em>, <em>σ</em>)</span>
                    </Formula>
                  </li>
                </ul>
                <p>
                  The American call&apos;s value is the <Highlight>maximum of these two scenarios</Highlight>, modeling the rational investor&apos;s choice.
                </p>
                <Formula>
                  <span><em>C</em><sub>american</sub> ≈ max(<em>C</em><sub>hold</sub>, <em>C</em><sub>exercise_timing</sub>)</span>
                </Formula>
              </div>
            </ContentCard>
          </section>

          {/* Part II: Monte Carlo Simulation */}
          <section id="part2" className="mt-20">
            <SectionTitle 
              icon={<CalculatorIcon />}
              title="Part II: Monte Carlo Simulation"
              subtitle="Estimating early exercise confidence with computational methods."
            />

            <ContentCard>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Section 4 & 5: Simulation and the Longstaff-Schwartz Method</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <Highlight>Monte Carlo simulation</Highlight> models uncertainty by generating thousands of possible future price paths for an asset. 
                  For options, we simulate stock prices using <Highlight>Geometric Brownian Motion (GBM)</Highlight> in a <Highlight>risk-neutral world</Highlight>.
                </p>
                <Formula>
                  <span><em>S</em><sub><em>t</em>+Δ<em>t</em></sub> = <em>S<sub>t</sub></em> × exp((<em>r</em> − 0.5<em>σ</em>²)Δ<em>t</em> + <em>σε</em>√Δ<em>t</em>)</span>
                </Formula>
                <p>
                  The challenge is that simulation is <Highlight>forward-looking</Highlight>, while the American option decision requires <Highlight>backward induction</Highlight>. 
                  The <Highlight>Longstaff-Schwartz Method (LSM)</Highlight> solves this. It works backward from maturity, using least-squares regression at each step 
                  to estimate the option&apos;s "<Highlight>continuation value</Highlight>" (the expected value of holding it). It then compares this to the immediate 
                  exercise value to determine the optimal strategy for each simulated path.
                </p>
              </div>
            </ContentCard>

            <ContentCard>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Section 6: Estimating the Confidence of Early Exercise</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We can rigorously define the &quot;Confidence of Early Exercise&quot; as the estimated <Highlight>risk-neutral probability</Highlight> that exercising early 
                  is the optimal strategy. This is calculated directly from the LSM simulation results as the proportion of paths where exercise was deemed optimal:
                </p>
                <Formula>
                  <span><em>P</em><sub>exercise</sub> = <em>N</em><sub>exercise</sub> / <em>N</em><sub>total</sub></span>
                </Formula>
                <p>
                  Where <em>N</em><sub>exercise</sub> is the number of simulated paths where LSM determined exercise was optimal at the ex-dividend date. 
                  To quantify the uncertainty of this estimate, we construct a 95% <Highlight>confidence interval</Highlight>:
                </p>
                <Formula>
                  <span><em>P</em><sub>exercise</sub> ± 1.96 × √[(<em>P</em><sub>exercise</sub> × (1 − <em>P</em><sub>exercise</sub>)) / <em>N</em><sub>total</sub>]</span>
                </Formula>
                <p>
                  This provides a statistically robust range for the true probability of early exercise. A high probability (e.g., 99%) gives a trader strong confidence, 
                  while a probability near 50% indicates the decision is highly uncertain.
                </p>
              </div>
            </ContentCard>
          </section>

          {/* Part III: Synthesis */}
          <section id="part3" className="mt-20">
            <SectionTitle 
              icon={<ChartIcon />}
              title="Part III: Synthesis and Critical Analysis"
              subtitle="Integrating models and understanding their limitations."
            />

            <ContentCard>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Section 7: Integrated Decision-Making and Model Limitations</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Black's Approximation and LSM simulation are <Highlight>complementary tools</Highlight>. An analyst can use the former for a quick assessment 
                  and the latter for a deep, probabilistic analysis. It's crucial to acknowledge the models' assumptions:
                </p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                  <li>
                    <b>Geometric Brownian Motion (GBM):</b> The assumption of constant volatility is a major simplification. 
                    Real-world volatility is itself stochastic, leading to phenomena like the "<Highlight>volatility smile</Highlight>".
                  </li>
                  <li>
                    <b>Longstaff-Schwartz Method (LSM):</b> The accuracy is sensitive to the choice of <Highlight>basis functions</Highlight> and the number of time steps. 
                    However, its true power lies in overcoming the "<Highlight>curse of dimensionality</Highlight>." While models like binomial trees become computationally 
                    impractical for options on multiple assets, Monte Carlo methods are largely independent of the problem's dimensionality. 
                    This makes LSM an <Highlight>enabling technology</Highlight> in modern quantitative finance.
                  </li>
                </ul>
              </div>
            </ContentCard>
          </section>

          {/* Call to Action */}
          <div className="mt-20 p-10 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[3rem] shadow-xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl mb-6 inline-block">
                <BookOpen size={32} className="text-indigo-300" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Ready to Master Options Theory?</h2>
              <p className="text-xl mb-8 text-indigo-100 font-light max-w-2xl">
                Dive deeper into quantitative finance with our comprehensive research library
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {currentArticle?.googleDoc && (
                  <a 
                    href={currentArticle.googleDoc}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-white text-indigo-900 font-bold py-4 px-8 rounded-full text-lg hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Read Full Research Paper
                  </a>
                )}
                <Link 
                  href="/"
                  className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-indigo-900 transition-all duration-300 transform hover:scale-105"
                >
                  Explore More Articles
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 mt-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-sm">
              &copy; 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
