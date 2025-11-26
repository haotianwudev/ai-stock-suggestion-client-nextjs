'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, TrendingUp, Zap, Clock, Code, DollarSign, BarChart, CheckCircle, XCircle, FileText, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Helper Component for Styled Lists ---
const HighlightedListItem = ({ text, icon: Icon = CheckCircle }: { text: string; icon?: React.ElementType }) => {
  // Splits the text into bold part (title) and content part for specific styling
  const match = text.match(/\*\*(.*?)\*\*(.*)/);
  const title = match ? match[1] : null;
  const content = match ? match[2] : text;
  
  return (
    <li className="flex items-start mb-3">
      <Icon className="w-5 h-5 text-sky-500 flex-shrink-0 mt-1 mr-3" />
      <p className="text-gray-700 leading-snug">
        {title ? (
          <span className="font-bold text-sky-800 mr-1">{title}:</span>
        ) : null}
        {content.trim()}
      </p>
    </li>
  );
};

// Component for rendering a single content block
const ContentBlock = ({ subtitle, content }: { subtitle: string; content: React.ReactNode }) => (
  <div className="mb-6 p-6 bg-white rounded-xl shadow-lg border-l-4 border-sky-400 transform transition duration-500 hover:shadow-xl hover:scale-[1.005]">
    <h3 className="text-xl font-extrabold mb-3 text-sky-700">{subtitle}</h3>
    <div className="text-gray-700 leading-relaxed text-base">
      {content}
    </div>
  </div>
);

// Component for rendering a full section
const Section = ({ icon: Icon, title, subsections }: { icon: React.ElementType; title: string; subsections: Array<{ subtitle: string; content: React.ReactNode }> }) => (
  <section className="mb-16">
    <div className="flex items-center space-x-4 mb-10 p-5 bg-sky-100 rounded-2xl shadow-inner border-b-4 border-sky-500">
      <div className="p-3 bg-sky-600 rounded-full shadow-lg">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl font-black text-sky-900 tracking-tight">{title}</h2>
    </div>
    <div className="space-y-8">
      {subsections.map((sub, i) => (
        <ContentBlock key={i} subtitle={sub.subtitle} content={sub.content} />
      ))}
    </div>
  </section>
);

// Component for Pros and Cons Summary
const ProsCons = ({ data }: { data: Array<{ type: string; title: string; description: string }> }) => (
  <div className="mb-16">
    <h2 className="text-3xl font-black text-sky-900 mb-8 p-5 bg-sky-100 rounded-2xl shadow-inner border-b-4 border-sky-500 flex items-center space-x-3">
      <Clock className="w-8 h-8 text-sky-600" />
      <span>Pros and Cons of Monte Carlo</span>
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      {data.map((item, index) => {
        const isPro = item.type === "Pro";
        const Icon = isPro ? CheckCircle : XCircle;
        const bgColor = isPro ? 'bg-emerald-50' : 'bg-red-50';
        const borderColor = isPro ? 'border-emerald-400' : 'border-red-400';
        const textColor = isPro ? 'text-emerald-700' : 'text-red-700';
        
        return (
          <div
            key={index}
            className={`p-6 ${bgColor} rounded-xl shadow-md border-l-4 ${borderColor} transition duration-300 hover:shadow-lg`}
          >
            <div className="flex items-center mb-3 space-x-3">
              <Icon className={`w-6 h-6 ${textColor}`} />
              <h3 className={`text-xl font-bold ${textColor}`}>{item.title} ({item.type})</h3>
            </div>
            <p className="text-gray-700 text-sm">{item.description}</p>
          </div>
        );
      })}
    </div>
  </div>
);

export default function MonteCarloSimulationPage() {
  const currentArticle = articles.find(article => article.slug === 'monte-carlo-simulation-quantitative-finance-stochastic-modeling');
  
  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug || ''} 
          />
        </>
      )}

      <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
        <header className="bg-white shadow-xl p-6 md:p-12 border-b-8 border-sky-500">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-sky-900 leading-tight">
              <span className="block text-3xl md:text-4xl text-sky-600 font-extrabold">Monte Carlo Simulation in Quantitative Finance</span>
              <span className="block">Stochastic Modeling, Risk Quantification, and Algorithmic Robustness</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mt-3 italic font-medium">
              A detailed breakdown for Quantitative Trading and Hedge Funds.
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6 md:p-12">
          {/* Hero Infographic Image */}
          {currentArticle?.imageUrl && (
            <section className="mb-12">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <img 
                  src={currentArticle.imageUrl} 
                  alt="Monte Carlo Simulation Infographic" 
                  className="w-full h-auto"
                />
              </div>
            </section>
          )}

          {/* Section I: Foundations */}
          <Section
            icon={BookOpen}
            title="Section I: Foundations and Computational Framework"
            subsections={[
              {
                subtitle: "1.1. Definition and Origin: The Probabilistic Core",
                content: (
                  <>
                    <p className="mb-4">
                      The Monte Carlo Simulation (MCS) is a numerical technique devised to estimate the possible outcomes of an uncertain event by accounting for the intervention of random variables. Fundamentally, MCS operates by modeling the complete probability distribution of a complex, unpredictable process through repeated random sampling. This contrasts sharply with deterministic modeling, which often uses a single set of average inputs to derive a single, fixed outcome.
                    </p>
                    <p className="mb-4">
                      The technique itself is rooted in mid-20th-century computational physics, originating from the work of mathematicians Stanislaw Ulam and John Von Neumann during the Manhattan Project. The name 'Monte Carlo' was later assigned, referencing the famous casino in Monaco and symbolizing the element of chance inherent in these calculations.
                    </p>
                    <p>
                      In quantitative finance, the key benefit of MCS lies in its ability to provide a clearer, probabilistic picture of future states than traditional deterministic forecasts, especially when analyzing systems involving dozens or hundreds of interacting risk factors. By generating a large pool of random data samples, MCS yields multiple possible outcomes and assigns a probability to each, enabling financial analysts to produce the full probability distribution of potential results.
                    </p>
                  </>
                )
              },
              {
                subtitle: "1.2. The Fundamental MCS Workflow",
                content: (
                  <>
                    <p className="mb-4">
                      The execution of a rigorous Monte Carlo analysis follows a defined sequence of steps. The process starts by defining the total time horizon (T) and the number of discrete steps (M) within it. The accuracy of the final results is directly proportional to the number of total simulations (<span className="font-bold text-sky-600">N</span>) run. This framework is essential for calculating risk measures like VaR and CVaR.
                    </p>
                    <ul className="list-none pl-0 space-y-2">
                      <HighlightedListItem text="**1. Problem Modeling & Calibration** Constructing a precise mathematical SDE model (e.g., GBM) and calibrating its parameters (μ, σ, correlation) from historical data." />
                      <HighlightedListItem text="**2. Input Parameterization** Assigning specific probability distributions (e.g., Normal, Lognormal, Student's t) to input variables that drive the stochastic process." />
                      <HighlightedListItem text="**3. Random Sampling** Employing random number generators (RNGs) to produce the unpredictable sequence of random inputs, often standardized to the desired distribution." />
                      <HighlightedListItem text="**4. Simulation Execution** Running the model or algorithm for each set of random inputs across N paths, tracking the output variable over M time steps." />
                      <HighlightedListItem text="**5. Statistical Inference** Collecting the N final outcomes, generating the empirical distribution, and calculating the final price, risk metric, or probability." />
                    </ul>
                  </>
                )
              },
              {
                subtitle: "1.3. Integration and Context: MC vs. Machine Learning",
                content: (
                  <>
                    <p className="mb-4">
                      Machine Learning (ML) trains software using I/O data to discern correlations. MC simulation uses pre-defined mathematical models and random inputs to predict probable outcomes. They are complementary:
                    </p>
                    <ul className="list-none pl-0 space-y-2">
                      <HighlightedListItem text="**ML Role** Discovering potential alpha structures and profitable patterns from historical data that can inform strategy parameters." />
                      <HighlightedListItem text="**MC Role** Verifying the strategy's stability against randomness and estimating its detailed risk profile across thousands of synthetic market scenarios." />
                    </ul>
                  </>
                )
              }
            ]}
          />

          {/* Section II: Limitations */}
          <Section
            icon={Zap}
            title="Section II: Critical Assessment and Limitations"
            subsections={[
              {
                subtitle: "2.1. Limitations in Financial Modeling: Crisis Underestimation",
                content: (
                  <p>
                    A significant drawback of standard Monte Carlo models, particularly those assuming normally distributed returns, is their propensity to underestimate the probability and severity of <span className="font-bold text-red-600">extreme events ('Black Swan' events)</span>. The integrity of any Monte Carlo output is entirely dependent on the fidelity of the input assumptions, necessitating stringent model governance over parameter estimation and distribution selection (e.g., switching from Normal to Student's t distribution to capture fat tails).
                  </p>
                )
              },
              {
                subtitle: "2.2. Computational Constraints: Variance Reduction Techniques (VRTs)",
                content: (
                  <>
                    <p className="mb-3">
                      Achieving high accuracy in MCS requires either an extremely large number of simulated paths (<span className="font-bold text-sky-600">N</span>) or a reduction in the variance (σ) of the estimator itself. VRTs lower the variance of the MC estimator without altering its expected value. Key VRTs include:
                    </p>
                    <ul className="list-none pl-0 space-y-2">
                      <HighlightedListItem text="**Control Variates** Reduces variance by referencing a similar, correlated option whose analytical price is known, using the difference to reduce the overall error." />
                      <HighlightedListItem text="**Antithetic Variates** Reduces variance by simulating pairs of paths using Z and -Z as random inputs, inducing a strong negative correlation to cancel out sampling error." />
                      <HighlightedListItem text="**Common Random Numbers (CRN)** Uses the same random path seeds for related calculations (like estimating the 'Greeks' or comparing two strategies) to induce positive correlation and significantly reduce variance in the *difference*." />
                    </ul>
                  </>
                )
              },
              {
                subtitle: "2.3. The Alpha Dilemma: Why MCS Does Not Capture Active Strategy Outperformance",
                content: (
                  <p>
                    The fundamental constraint is its failure to capture genuine <span className="font-bold text-red-600">alpha (α)</span>—excess return generated by superior trading skill. This stems from a core philosophical limitation: standard MC models implicitly assume <strong>perfectly efficient markets</strong>. When modeling asset paths, the assumption is that price movements are essentially random walks, modeling only passive market returns (Beta) and structurally excluding any informational or systematic advantage that a quant strategy relies upon.
                  </p>
                )
              }
            ]}
          />

          {/* Section III: Technical Methodologies */}
          <Section
            icon={Code}
            title="Section III: Technical Methodologies for Path and Scenario Generation"
            subsections={[
              {
                subtitle: "3.1. Modeling Continuous Dynamics with Stochastic Differential Equations (SDEs)",
                content: (
                  <>
                    <p className="mb-4">
                      SDEs model the evolution of an asset price X<sub>t</sub> over time, predominantly used in derivative pricing. The most common is the <strong>Geometric Brownian Motion (GBM)</strong>, where the change in price is proportional to the current price.
                    </p>
                    <div className="text-center my-4 p-4 bg-gray-100 rounded-lg border border-gray-200 text-sky-700 text-lg font-mono overflow-x-auto shadow-inner">
                      dX<sub>t</sub> = a(X<sub>t</sub>)dt + σ(X<sub>t</sub>)dB<sub>t</sub>
                    </div>
                    <p className="mb-4">
                      The simplest discretization technique is the <span className="font-bold text-sky-600">Euler-Maruyama Scheme</span> which approximates the continuous path in discrete time steps h:
                    </p>
                    <div className="text-center my-4 p-4 bg-gray-100 rounded-lg border border-gray-200 text-sky-700 text-lg font-mono overflow-x-auto shadow-inner">
                      X̃<sub>kh</sub> = X̃<sub>(k-1)h</sub> + μ(...)h + σ(...)√h·Z<sub>k</sub>
                    </div>
                    <p>
                      Where Z<sub>k</sub> ~ N(0, 1) is the sampled random normal variable. In financial applications, only <span className="font-bold text-sky-600">weak convergence</span> (accuracy in estimating the expected value) is typically required, allowing for faster simulation.
                    </p>
                  </>
                )
              },
              {
                subtitle: "3.2. Non-Parametric and Filtered Bootstrapping",
                content: (
                  <>
                    <p className="mb-3">
                      Bootstrapping techniques utilize historical data, avoiding the assumption of a specific parametric distribution. This is often preferred for <strong>Physical Measure (ℙ-measure) Risk Management</strong>, as it retains historical non-normalities (fat tails, skewness). Key methods include:
                    </p>
                    <ul className="list-none pl-0 space-y-2">
                      <HighlightedListItem text="**Simple Historical Returns Bootstrapping** Samples returns with replacement, assuming I.I.D. (independent and identically distributed) data, often used for simplicity." />
                      <HighlightedListItem text="**Block Bootstrapping** Samples sequential blocks of data to preserve crucial temporal relationships, such as volatility clustering, which simple sampling destroys." />
                      <HighlightedListItem text="**Filtered Historical Simulation (FHS)** A hybrid approach where a GARCH model extracts I.I.D. residuals, which are then bootstrapped and combined with forecasted volatility. FHS is highly effective for capturing time-varying volatility." />
                    </ul>
                  </>
                )
              },
              {
                subtitle: "3.3. Path Perturbation for Strategy Robustness",
                content: (
                  <>
                    <p className="mb-3">
                      MCS stress-tests the real-world stability of an algorithmic strategy against real-world deviations, latency, and model imperfections. Techniques include:
                    </p>
                    <ul className="list-none pl-0 space-y-2">
                      <HighlightedListItem text="**Trade Order Shuffling** Used to expose and test path dependency in the strategy execution. A robust strategy should not have performance sensitive to minor changes in trade sequence." />
                      <HighlightedListItem text="**Parameter Jittering** Assessing sensitivity by introducing small, random disturbances to strategy inputs (e.g., adding ±5ms latency, varying commission/slippage parameters by ±1bp)." />
                      <HighlightedListItem text="**MACHR (Market Condition Historical Randomization)** Block Randomization segments the original trade sequence into large blocks and samples them, testing robustness against radical changes in the sequence of historical market regimes." />
                    </ul>
                  </>
                )
              }
            ]}
          />

          {/* Section IV: Applications */}
          <Section
            icon={BarChart}
            title="Section IV: Specialized Applications in Quantitative Hedge Funds"
            subsections={[
              {
                subtitle: "4.1. Advanced Market Risk and Capital Allocation (VaR/CVaR)",
                content: (
                  <>
                    <p className="mb-3">
                      MCS is fundamental for quantifying potential portfolio losses. It uses the <strong>Physical Measure (ℙ-measure)</strong> (real-world probability) for risk management. The <span className="font-bold text-sky-600">Cholesky Decomposition</span> is typically used on the historical covariance matrix (Σ) to generate correlated random returns, modeling asset co-movement during stress.
                    </p>
                    <ul className="list-none pl-0 space-y-2">
                      <HighlightedListItem text="**Value-at-Risk (VaR)** The maximum expected loss at a specific confidence level (e.g., 99%). This is a backward-looking measure of potential loss." />
                      <HighlightedListItem text="**Conditional Value-at-Risk (CVaR)** The mean of all simulated losses equal to or worse than the VaR, providing a superior, coherent measure of worst-case risk (Expected Shortfall)." />
                      <HighlightedListItem text="**Key Distinction** For derivative pricing, the Risk-Neutral Measure (ℚ-measure) is used (drift = risk-free rate); for risk management (VaR/CVaR), the ℙ-measure (historical drift) is required." />
                    </ul>
                  </>
                )
              },
              {
                subtitle: "4.2. Algorithmic Strategy Validation and Overfitting (Robustness)",
                content: (
                  <p>
                    MCS stress-tests backtested results to detect 'lucky backtests' or <span className="font-bold text-red-600">overfitting</span> to a specific historical path. Robustness testing provides a statistical distribution of key performance metrics (like Maximum Drawdown and Sharpe Ratio) instead of a single point-estimate, acting as a measurable stability metric for strategy deployment decisions. Strategies are rigorously judged by their <span className="font-bold text-sky-600">worst-case simulated performance</span> (e.g., the 5th percentile of simulated Sharpe Ratios).
                  </p>
                )
              },
              {
                subtitle: "4.3. Complex Derivatives Pricing (Path-Dependent Strategies)",
                content: (
                  <p>
                    MCS is crucial for valuing derivatives where closed-form solutions are absent, especially exotic derivatives whose payoffs are <span className="font-bold text-sky-600">path-dependent</span> (e.g., Asian, Barrier, Lookback options). The value is estimated by generating price paths using SDEs under the <strong>Risk-Neutral Measure (ℚ)</strong>, calculating the discounted payoff for each path, and averaging the results across all trials. VRTs are used to efficiently estimate sensitivities ('Greeks') for dynamic hedging.
                  </p>
                )
              }
            ]}
          />

          {/* Pros and Cons */}
          <ProsCons data={[
            { type: "Pro", title: "Provides Full Distribution", description: "Unlike deterministic models, MCS provides the entire probability distribution of potential outcomes, including the crucial tail risk (skewness and kurtosis)." },
            { type: "Pro", title: "Handles Complex Correlation", description: "Can model hundreds of correlated assets and non-linear payoff functions simultaneously using techniques like Cholesky Decomposition." },
            { type: "Pro", title: "Model Versatility", description: "It is the only reliable method for pricing complex path-dependent derivatives where no analytical closed-form solution exists." },
            { type: "Con", title: "Cannot Capture Alpha", description: "Assumes market efficiency and random walks, structurally excluding the capture of genuine, skilled excess returns (α)." },
            { type: "Con", title: "Computational Cost", description: "Achieving high accuracy (low variance) requires an extremely large number of iterations (N), demanding significant computational resources." },
            { type: "Con", title: "High Model Risk", description: "The quality of the output is entirely dependent on the quality of the input SDE model and distribution assumptions (GIGO: Garbage In, Garbage Out)." }
          ]} />

          {/* Conclusion */}
          <div className="mt-16 p-10 bg-sky-50 rounded-2xl shadow-2xl border-t-8 border-sky-500">
            <div className="flex items-center space-x-4 mb-6">
              <DollarSign className="w-8 h-8 text-sky-700" />
              <h2 className="text-3xl font-black text-sky-800">Conclusion: The Indispensable Role of MCS</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-5">
              Monte Carlo simulation is a cornerstone of modern quantitative finance, fundamentally transforming the ability of hedge funds and proprietary trading desks to manage uncertainty, value complex instruments, and rigorously validate algorithmic strategies. While it cannot capture proprietary competitive advantages (Alpha) due to its core assumption of market efficiency, its application is critical for providing a full probability distribution of outcomes and ensuring that strategies are resilient to real-world phenomena such as volatility clustering and shifts in market regimes, thereby providing a robust statistical foundation for capital deployment decisions.
            </p>
            <p className="text-base text-gray-600 font-semibold">
              Summary: MCS is not an alpha generator, but the most essential tool for <span className="text-sky-700">risk management</span> and <span className="text-sky-700">robustness validation</span> in systematic finance.
            </p>
          </div>

          {/* Call to Action - Google Doc Link */}
          {currentArticle?.googleDoc && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl my-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={currentArticle.googleDoc}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <FileText className="inline mr-2" />
                  Read Full Research Paper
                </a>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="w-full text-center p-6 text-gray-400 text-sm border-t mt-16 bg-white shadow-inner">
          &copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
        </footer>
      </div>
    </>
  );
}
