'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calculator, TrendingUp, AlertTriangle } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

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
    <div className="flex items-center mb-4">
      <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full mr-4">
        {icon}
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-lg text-gray-500">{subtitle}</p>
      </div>
    </div>
    <hr className="border-gray-200" />
  </div>
);

// Reusable component for content cards
const ContentCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
    {children}
  </div>
);

// Component to render mathematical formulas
const Formula = ({ children }: { children: React.ReactNode }) => (
  <div className="my-4 p-4 bg-gray-50 border-l-4 border-indigo-500 rounded-r-lg overflow-x-auto">
    <code className="text-gray-700 font-mono text-sm md:text-base">{children}</code>
  </div>
);

// Component for styled tables
const StyledTable = ({ headers, data }: { headers: string[]; data: string[][] }) => (
  <div className="overflow-x-auto my-6 rounded-lg border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200 bg-white">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header, index) => (
            <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-200">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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
  <strong className="font-semibold text-indigo-600">{children}</strong>
);

// Risk Warning Component
const RiskWarning = () => (
  <div className="bg-red-50 border-l-4 border-red-400 p-6 my-8 rounded-r-lg">
    <div className="flex items-start">
      <AlertTriangle className="h-6 w-6 text-red-400 mr-3 mt-1 flex-shrink-0" />
      <div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Risk Warning</h3>
        <p className="text-red-700 text-sm leading-relaxed">
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

  const table1Headers = ["Scenario", "Stock Price ($S$)", "Strike ($K$)", "Intrinsic Value ($S-K$)", "Dividend ($D$)", "Option Price ($C$)", "Time Value ($C - (S-K)$)", "Decision (Is $D >$ Time Value?)"];
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
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="bg-gray-50 font-sans text-gray-800 antialiased min-h-screen">
        {/* Header with Return Button */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="relative">
          {/* Deep Research Badge - Top Left */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
              <BookOpen className="w-3 h-3 mr-1" />
              Deep Research
            </span>
          </div>
          
          {/* Options Badge - Bottom Right */}
          <div className="absolute bottom-4 right-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
              <TrendingUp className="w-3 h-3 mr-1" />
              Options
            </span>
          </div>
        </div>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Header Section */}
          <header className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Optimal Early Exercise of American Call Options on Dividend-Paying Stocks
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive theoretical and computational analysis of the early exercise decision for rational investors.
            </p>
          </header>

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
                <Formula>Dividend (D) &gt; Time Value of the Call Option</Formula>
                <p>
                  If exercise is optimal, it should be done <Highlight>immediately prior to the stock going ex-dividend</Highlight>. 
                  This maximizes the time value preserved up to that point. There exists a critical stock price, S*, where an investor is indifferent 
                  between exercising and holding. It is found by solving:
                </p>
                <Formula>S* - K = C_european(S* - D, T-t_d)</Formula>
                <p>
                  If the current stock price S &gt; S*, <Highlight>early exercise is the optimal action</Highlight>. 
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
                    <b>Scenario 1 (Hold):</b> Value the option as a European call on an adjusted stock price S' = S - PV(D), held to original expiration.
                    <Formula>C_hold = BS(S', K, T, r, sigma)</Formula>
                  </li>
                  <li>
                    <b>Scenario 2 (Exercise):</b> Value the option as a European call that expires just before the ex-dividend date, t_d.
                    <Formula>C_exercise_timing = BS(S, K, t_d, r, sigma)</Formula>
                  </li>
                </ul>
                <p>
                  The American call's value is the <Highlight>maximum of these two scenarios</Highlight>, modeling the rational investor's choice.
                </p>
                <Formula>C_american ~ max(C_hold, C_exercise_timing)</Formula>
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
                <Formula>S_(t+delta_t) = S_t * exp((r - 0.5*sigma^2)*delta_t + sigma*epsilon*sqrt(delta_t))</Formula>
                <p>
                  The challenge is that simulation is <Highlight>forward-looking</Highlight>, while the American option decision requires <Highlight>backward induction</Highlight>. 
                  The <Highlight>Longstaff-Schwartz Method (LSM)</Highlight> solves this. It works backward from maturity, using least-squares regression at each step 
                  to estimate the option's "<Highlight>continuation value</Highlight>" (the expected value of holding it). It then compares this to the immediate 
                  exercise value to determine the optimal strategy for each simulated path.
                </p>
              </div>
            </ContentCard>

            <ContentCard>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Section 6: Estimating the Confidence of Early Exercise</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We can rigorously define the "Confidence of Early Exercise" as the estimated <Highlight>risk-neutral probability</Highlight> that exercising early 
                  is the optimal strategy. This is calculated directly from the LSM simulation results as the proportion of paths where exercise was deemed optimal:
                </p>
                <Formula>P_exercise = N_exercise / N_total</Formula>
                <p>
                  Where N_exercise is the number of simulated paths where LSM determined exercise was optimal at the ex-dividend date. 
                  To quantify the uncertainty of this estimate, we construct a 95% <Highlight>confidence interval</Highlight>:
                </p>
                <Formula>P_exercise +/- 1.96 * sqrt((P_exercise * (1 - P_exercise)) / N_total)</Formula>
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
          <div className="mt-20 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-12 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Master Options Theory?</h2>
            <p className="text-xl mb-8 opacity-90">
              Dive deeper into quantitative finance with our comprehensive research library
            </p>
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-indigo-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 mr-4"
              >
                <BookOpen className="inline mr-2" />
                Read Full Research Paper
              </a>
            )}
            <Link 
              href="/"
              className="inline-block bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-indigo-600 transition-colors duration-300 transform hover:scale-105"
            >
              Explore More Articles
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm opacity-75">
              &copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}