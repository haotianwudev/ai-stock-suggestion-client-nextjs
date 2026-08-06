'use client';

import React from 'react';
import { BookOpen, Calculator, TrendingUp, AlertTriangle } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';

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

export default function OptimalEarlyExerciseArticle() {
  const table1Headers = ["Scenario", "Stock Price (S)", "Strike (K)", "Intrinsic Value (S−K)", "Dividend (D)", "Option Price (C)", "Time Value (C − (S−K))", "Decision (Is D > Time Value?)"];
  const table1Data = [
    ["1. Out-of-the-Money", "$95", "$100", "$0", "$2.00", "$3.50", "$3.50", "HOLD ($2.00 < 3.50)"],
    ["2. At-the-Money", "$100", "$100", "$0", "$2.00", "$6.00", "$6.00", "HOLD ($2.00 < 6.00)"],
    ["3. In-the-Money, High Time Value", "$110", "$100", "$10", "$2.00", "$12.50", "$2.50", "HOLD ($2.00 < 2.50)"],
    ["4. Deep ITM, Low Time Value", "$130", "$100", "$30", "$2.00", "$30.50", "$0.50", "EXERCISE ($2.00 > 0.50)"],
    ["5. Deep ITM, Large Dividend", "$130", "$100", "$30", "$3.00", "$30.50", "$0.50", "EXERCISE ($3.00 > 0.50)"]
  ];

  return (
    <ArticleFrame 
      slug="optimal-early-exercise-american-call-options-dividend-stocks" 
      additionalDisclaimer="Options trading involves substantial risk and is not suitable for all investors. Early exercise decisions can result in significant losses. The theoretical models presented here make assumptions that may not hold in real market conditions. Always consult with a qualified financial advisor before making investment decisions."
    >
      <div className="space-y-12">
        <InfographicSlot alt="Optimal Early Exercise Decision Framework" />

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
                  <Highlight>Intrinsic Value:</Highlight> The immediate profit from exercise, expressed as <InlineMath math="\max(S - K, 0)" />. 
                  An option with positive intrinsic value is &ldquo;<Highlight>in-the-money</Highlight>&rdquo; (ITM).
                </li>
                <li>
                  <Highlight>Time Value:</Highlight> The premium exceeding intrinsic value. It is the price of *potential*, 
                  representing the value of the &ldquo;<Highlight>option to wait</Highlight>&rdquo;. It captures both <Highlight>volatility value</Highlight> (potential for future gains) 
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
              <MathBlock math="D > \text{Time Value of the Call Option}" />
              <p>
                If exercise is optimal, it should be done <Highlight>immediately prior to the stock going ex-dividend</Highlight>. 
                This maximizes the time value preserved up to that point. There exists a critical stock price, <InlineMath math="S^*" />, where an investor is indifferent 
                between exercising and holding. It is found by solving:
              </p>
              <MathBlock math="S^* - K = C_{\text{European}}(S^* - D, T - t_d)" />
              <p>
                If the current stock price <InlineMath math="S > S^*" />, <Highlight>early exercise is the optimal action</Highlight>. 
                The following table illustrates this decision process.
              </p>
              <h4 className="font-semibold text-gray-700 pt-4">Table 1: Early Exercise Decision Matrix</h4>
              <StyledTable headers={table1Headers} data={table1Data} />
            </div>
          </ContentCard>

          <ContentCard>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Section 3: Applying the Black-Scholes Framework: Black&apos;s Approximation</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                The standard <Highlight>Black-Scholes-Merton (BSM) model</Highlight> is for European options and doesn&apos;t natively handle early exercise 
                or discrete dividends. Fischer Black proposed a &ldquo;<Highlight>pseudo-American</Highlight>&rdquo; valuation method that approximates the American call&apos;s 
                value by comparing two scenarios:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <b>Scenario 1 (Hold):</b> Value the option as a European call on an adjusted stock price <InlineMath math="S' = S - \text{PV}(D)" />, held to original expiration.
                  <MathBlock math="C_{\text{hold}} = BS(S', K, T, r, \sigma)" />
                </li>
                <li>
                  <b>Scenario 2 (Exercise):</b> Value the option as a European call that expires just before the ex-dividend date, <InlineMath math="t_d" />.
                  <MathBlock math="C_{\text{exercise\_timing}} = BS(S, K, t_d, r, \sigma)" />
                </li>
              </ul>
              <p>
                The American call&apos;s value is the <Highlight>maximum of these two scenarios</Highlight>, modeling the rational investor&apos;s choice.
              </p>
              <MathBlock math="C_{\text{American}} \approx \max(C_{\text{hold}}, C_{\text{exercise\_timing}})" />
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
              <MathBlock math="S_{t+\Delta t} = S_t \exp\left( \left( r - \frac{1}{2}\sigma^2 \right)\Delta t + \sigma \varepsilon \sqrt{\Delta t} \right)" />
              <p>
                The challenge is that simulation is <Highlight>forward-looking</Highlight>, while the American option decision requires <Highlight>backward induction</Highlight>. 
                The <Highlight>Longstaff-Schwartz Method (LSM)</Highlight> solves this. It works backward from maturity, using least-squares regression at each step 
                to estimate the option&apos;s &ldquo;<Highlight>continuation value</Highlight>&rdquo; (the expected value of holding it). It then compares this to the immediate 
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
              <MathBlock math="P_{\text{exercise}} = \frac{N_{\text{exercise}}}{N_{\text{total}}}" />
              <p>
                Where <InlineMath math="N_{\text{exercise}}" /> is the number of simulated paths where LSM determined exercise was optimal at the ex-dividend date. 
                To quantify the uncertainty of this estimate, we construct a 95% <Highlight>confidence interval</Highlight>:
              </p>
              <MathBlock math="P_{\text{exercise}} \pm 1.96 \times \sqrt{\frac{P_{\text{exercise}}(1 - P_{\text{exercise}})}{N_{\text{total}}}}" />
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
                Black&apos;s Approximation and LSM simulation are <Highlight>complementary tools</Highlight>. An analyst can use the former for a quick assessment 
                and the latter for a deep, probabilistic analysis. It&apos;s crucial to acknowledge the models&apos; assumptions:
              </p>
              <ul className="list-disc list-inside space-y-3 pl-4">
                <li>
                  <b>Geometric Brownian Motion (GBM):</b> The assumption of constant volatility is a major simplification. 
                  Real-world volatility is itself stochastic, leading to phenomena like the &ldquo;<Highlight>volatility smile</Highlight>&rdquo;.
                </li>
                <li>
                  <b>Longstaff-Schwartz Method (LSM):</b> The accuracy is sensitive to the choice of <Highlight>basis functions</Highlight> and the number of time steps. 
                  However, its true power lies in overcoming the &ldquo;<Highlight>curse of dimensionality</Highlight>.&rdquo; While models like binomial trees become computationally 
                  impractical for options on multiple assets, Monte Carlo methods are largely independent of the problem&apos;s dimensionality. 
                  This makes LSM an <Highlight>enabling technology</Highlight> in modern quantitative finance.
                </li>
              </ul>
            </div>
          </ContentCard>
        </section>
      </div>
    </ArticleFrame>
  );
}
