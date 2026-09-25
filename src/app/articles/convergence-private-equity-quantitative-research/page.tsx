'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock } from '@/components/articles/math';

// --- Reusable Components ---

const Tooltip = ({ term, definition }: { term: string; definition: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <span 
        tabIndex={0} 
        className="border-b border-dashed border-gray-500 hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors"
      >
        {term}
      </span>
      {isVisible && (
        <span className="absolute z-50 w-64 p-2 text-sm font-sans font-normal leading-tight text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded bottom-full left-1/2 -translate-x-1/2 mb-2 transform">
          {definition}
        </span>
      )}
    </span>
  );
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-serif text-2xl md:text-3xl font-medium mt-12 mb-6 text-gray-900 dark:text-gray-100">
    {children}
  </h2>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-serif text-xl md:text-2xl font-medium mt-8 mb-4 text-gray-800 dark:text-gray-200">
    {children}
  </h3>
);

const DichotomyCard = ({ 
  title, 
  leftHeader, 
  leftItems, 
  rightHeader, 
  rightItems 
}: { 
  title: string;
  leftHeader: string; 
  leftItems: string[]; 
  rightHeader: string; 
  rightItems: string[];
}) => (
  <div className="my-8 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
    <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
      <h4 className="font-serif text-lg text-[#A8672E] dark:text-[#D08F52]">{title}</h4>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
      <div className="p-4 md:p-6 bg-white dark:bg-[#0c0c0c]">
        <h5 className="font-sans font-semibold mb-4 text-gray-900 dark:text-gray-100">{leftHeader}</h5>
        <ul className="space-y-2">
          {leftItems.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="mr-2 text-gray-400">•</span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 md:p-6 bg-white dark:bg-[#0c0c0c]">
        <h5 className="font-sans font-semibold mb-4 text-gray-900 dark:text-gray-100">{rightHeader}</h5>
        <ul className="space-y-2">
          {rightItems.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="mr-2 text-gray-400">•</span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const FormulaPanel = ({ 
  title, 
  formula, 
  example 
}: { 
  title: string; 
  formula: React.ReactNode; 
  example: React.ReactNode;
}) => (
  <div className="my-6 rounded-lg overflow-hidden bg-[#14171B] dark:bg-[#05070A] text-white shadow-lg">
    <div className="px-4 py-2 border-b border-gray-800/50">
      <h4 className="font-sans text-sm tracking-wider uppercase text-gray-400">{title}</h4>
    </div>
    <div className="p-4 md:p-6 overflow-x-auto">
      <div className="font-mono text-lg md:text-xl mb-6 text-[#A8672E] dark:text-[#D08F52]">
        {formula}
      </div>
      <div className="font-mono text-sm text-gray-300 bg-black/30 p-4 rounded border border-gray-800">
        <span className="block text-gray-500 mb-2 uppercase text-xs tracking-wider">Example / Mechanics</span>
        {example}
      </div>
    </div>
  </div>
);

// --- Main Page Component ---

export default function QuantPEArticle() {
  return (
    <ArticleFrame
      slug="convergence-private-equity-quantitative-research"
      additionalDisclaimer="Private equity and alternative investment strategies involve substantial risk, illiquidity, and complex valuation models. Quantitative sourcing and unsmoothing techniques are presented for educational and analytical purposes only."
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-gray-200 font-sans leading-relaxed">
        
        {/* Stat Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-gray-200 dark:border-gray-800 p-6 rounded-lg bg-white dark:bg-[#0c0c0c]">
            <div className="font-mono tabular-nums text-4xl text-[#1D8A70] dark:text-[#3CBF9C] mb-2">4%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Execution failure rate</div>
            <div className="text-sm mt-1">For pricing optimization value creation strategies.</div>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 p-6 rounded-lg bg-white dark:bg-[#0c0c0c]">
            <div className="font-mono tabular-nums text-4xl text-[#BC4128] dark:text-[#E2694A] mb-2">87%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Unsmoothed VC Volatility</div>
            <div className="text-sm mt-1">True economic volatility of early-stage VC, up from 29% smoothed.</div>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 p-6 rounded-lg bg-white dark:bg-[#0c0c0c]">
            <div className="font-mono tabular-nums text-4xl text-[#A8672E] dark:text-[#D08F52] mb-2">&gt;$100B</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Secondary Market Vol</div>
            <div className="text-sm mt-1">Annual transaction volume for LP stake rebalancing.</div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-6 mb-12 rounded-r-lg">
          <h3 className="font-serif text-xl text-[#A8672E] dark:text-[#D08F52] mb-4">Key Takeaways</h3>
          <ul className="space-y-3 font-sans">
            <li className="flex items-start">
              <span className="mr-3 mt-1 text-[#A8672E] dark:text-[#D08F52]">•</span>
              <span>Private equity is transitioning from an artisanal, relationship-driven asset class to one dominated by systematic, scalable infrastructure and <Tooltip term="Quantamental" definition="Blending fundamental analysis with quantitative rigor." /> strategies.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 mt-1 text-[#A8672E] dark:text-[#D08F52]">•</span>
              <span>Algorithms like EQT&apos;s Motherbrain now ingest vast alternative datasets to source deals before they hit competitive markets, reducing <Tooltip term="Information Asymmetry" definition="The disparity in information between buyers and sellers." />.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 mt-1 text-[#A8672E] dark:text-[#D08F52]">•</span>
              <span>Advanced performance metrics (Direct Alpha, GPME) and econometric unsmoothing are exposing true volatility, challenging the industry&apos;s historical reliance on <Tooltip term="Volatility Laundering" definition="The systematic understatement of actual economic risk via smoothed appraisal-based NAVs." />.</span>
            </li>
          </ul>
        </div>

        {/* Content Sections */}
        
        <SectionHeading>The Institutionalization of Quantitative Methods</SectionHeading>
        <ul className="space-y-4 list-disc list-outside ml-6 mb-8 text-gray-700 dark:text-gray-300">
          <li>Traditional value creation levers have deteriorated due to the end of the <Tooltip term="ZIRP" definition="Zero-interest-rate policy era, characterized by structurally low borrowing costs." /> era, multiple compression, and elevated inflation.</li>
          <li>Hedge funds and alternative asset managers are deploying quantamental strategies to extract alpha from historically opaque private assets.</li>
          <li>Increasing assets under management (AUM) demand systematic, scalable infrastructure over artisanal deal-making.</li>
        </ul>

        <SectionHeading>Transforming Deal Origination via Artificial Intelligence</SectionHeading>
        
        <DichotomyCard 
          title="Evolution of Private Equity Deal Sourcing"
          leftHeader="Traditional Sourcing"
          leftItems={[
            "Proprietary elite human networks",
            "Artisanal and relationship-driven",
            "Reliance on qualitative heuristics and financial engineering",
            "Reactive to market availability"
          ]}
          rightHeader="Quantitative Sourcing (e.g., EQT Motherbrain)"
          rightItems={[
            "Algorithmic scanning of >50M companies globally",
            "Ingestion of web traffic, GitHub activity, funding histories",
            "Convolutional Neural Networks (CNNs) for time-series clustering",
            "Predictive scoring (1 to 340) for early-stage information advantage"
          ]}
        />

        <ul className="space-y-4 list-disc list-outside ml-6 mb-8 text-gray-700 dark:text-gray-300">
          <li>Quantitative firms like Two Sigma (processing 640 petabytes of data) have entered PE via entities like Sightway Capital ($1.2B).</li>
          <li>Teams execute real-time cohort analysis using credit card panels and geolocation data.</li>
          <li><strong>Risk Warning:</strong> Epistemological limits defined by <Tooltip term="Goodhart's Law" definition="When a measure becomes a target, it ceases to be a good measure." />.</li>
          <li>Founders may &ldquo;game&rdquo; proxy metrics (like code commit velocity), causing reality drift where measured performance improves while fundamental health declines.</li>
        </ul>

        <SectionHeading>Generative AI, M&amp;A Integration, and Due Diligence</SectionHeading>
        
        <DichotomyCard 
          title="Parsing Virtual Data Rooms (VDRs)"
          leftHeader="Standard RAG Architecture"
          leftItems={[
            "Retrieval-Augmented Generation relies on vector similarity",
            "Prone to context loss over extended context windows",
            "High risk of hallucination with unstructured financial docs",
            "Summarizes away deeply buried footnotes or critical clauses"
          ]}
          rightHeader="Iterative Source Decomposition (ISD)"
          rightItems={[
            "Breaks long documents into structured components",
            "Reasons across all components simultaneously",
            "Programmatically cross-references management assumptions against historical data",
            "Provides sentence-level, clickable inline citations for audit trails"
          ]}
        />

        <SubHeading>The Evolution of Operational Value Creation</SubHeading>
        <ul className="space-y-4 list-disc list-outside ml-6 mb-8 text-gray-700 dark:text-gray-300">
          <li>Operational improvements have become the dominant driver of the PE equity story, outpacing financial engineering.</li>
          <li>Firms like Blackstone utilize dedicated Data Science teams (50+ personnel using Python/ML) to underwrite investments.</li>
          <li>Pricing optimization is the fastest quantitative lever, averaging a <span className="font-mono text-[#1D8A70] dark:text-[#3CBF9C]">7.8</span> month impact time with a mere <span className="font-mono text-[#1D8A70] dark:text-[#3CBF9C]">4%</span> execution failure rate.</li>
          <li>Traditional annual review of Value Creation Plans has dropped from 53% to 42%, shifting toward quarterly/weekly data-driven monitoring.</li>
        </ul>

        {/* Inline Featured Infographic */}
        <InfographicSlot
          alt="The Convergence of Private Equity and Quantitative Research"
          label="Featured Infographic"
        />

        <SectionHeading>Performance Measurement and Benchmarking</SectionHeading>
        <p className="mb-4">Historical metrics like Internal Rate of Return (IRR) falsely assume interim cash flows can be reinvested at the same high rate. To bridge the gap, researchers developed <Tooltip term="PME" definition="Public Market Equivalent: evaluates PE cash flows as if invested in a liquid index." /> methodologies.</p>

        <div className="overflow-x-auto mb-8 border border-gray-200 dark:border-gray-800 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 font-serif font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wider">Methodology</th>
                <th className="px-6 py-3 font-serif font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wider">Core Mechanism</th>
                <th className="px-6 py-3 font-serif font-medium text-gray-900 dark:text-gray-100 uppercase tracking-wider">Limitation</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#0c0c0c] divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td className="px-6 py-4 font-mono font-medium">Long-Nickels (LN-PME)</td>
                <td className="px-6 py-4">Matches each PE cash flow with equal public transaction.</td>
                <td className="px-6 py-4 text-[#BC4128] dark:text-[#E2694A]">Can result in large short positions (negative NAV).</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-mono font-medium">Kaplan-Schoar PME</td>
                <td className="px-6 py-4">Discounts all distributions/contributions using realized market returns.</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Returns a market multiple, not an annualized rate.</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-mono font-medium text-[#1D8A70] dark:text-[#3CBF9C]">Direct Alpha</td>
                <td className="px-6 py-4">Capitalizes historical cash flows using index return to a single point.</td>
                <td className="px-6 py-4 text-[#1D8A70] dark:text-[#3CBF9C]">Avoids heuristic scaling (Provides exact excess return).</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-mono font-medium">Generalized PME</td>
                <td className="px-6 py-4">Values cash flows using a Stochastic Discount Factor (SDF).</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Reveals aggregate risk-adjusted outperformance is often zero.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <SectionHeading>Valuation Dynamics and &ldquo;Volatility Laundering&rdquo;</SectionHeading>
        <ul className="space-y-4 list-disc list-outside ml-6 mb-6 text-gray-700 dark:text-gray-300">
          <li>Private companies use subjective discounted cash flow models or lagged comparisons, creating artificially smooth returns.</li>
          <li>This practice suppresses reported Beta/Volatility and falsely inflates Sharpe ratios.</li>
          <li>Econometric &ldquo;unsmoothing&rdquo; algorithms recover unobservable, true economic returns.</li>
        </ul>

        <FormulaPanel 
          title="Geltner Unsmoothing Algorithm"
          formula={<MathBlock math="r_t = (1 - \alpha) r_t^* + \alpha r_{t-1} \implies r_t^* = \frac{r_t - \alpha r_{t-1}}{1 - \alpha}" />}
          example={
            <ul className="space-y-2 mt-2">
              <li><span className="text-[#D08F52]">r_t</span> = Reported (smoothed) return at time t</li>
              <li><span className="text-[#D08F52]">r_t^*</span> = True unobservable economic return</li>
              <li><span className="text-[#D08F52]">&alpha;</span> = Autocorrelation coefficient (lagging factor)</li>
              <li className="mt-4 pt-4 border-t border-gray-800 text-gray-300">
                <strong>Empirical Result:</strong> Applying this algorithm reveals true early-stage VC volatility is <span className="text-[#E2694A]">87%</span>, not the reported <span className="text-[#3CBF9C]">29%</span>. Large buyout fund volatility increases from <span className="text-[#3CBF9C]">12%</span> to <span className="text-[#E2694A]">21%</span>.
              </li>
            </ul>
          }
        />

        <SectionHeading>Quantitative Modeling of Cash Flows</SectionHeading>

        <DichotomyCard 
          title="Commitment Pacing Models"
          leftHeader="Deterministic (Takahashi-Alexander)"
          leftItems={[
            "Industry standard since 2001 (Yale Endowment)",
            "Projects calls/distributions using strict input parameters (Yield, Bow Factor, Target IRR)",
            "Hyper-sensitive to user-defined assumptions",
            "Fails to capture stochastic macroeconomic shocks"
          ]}
          rightHeader="Probabilistic (LSTM Neural Networks)"
          rightItems={[
            "Replaces deterministic math with Deep Learning architectures",
            "Handles sequential time-series data without vanishing gradients",
            "Attention mechanisms weight GDP, unemployment, public indices",
            "Produces probabilistic distributions via Monte Carlo methods"
          ]}
        />

        <FormulaPanel 
          title="Takahashi-Alexander Distribution Mechanism"
          formula={<MathBlock math="\text{Distributions}_t = \text{NAV}_t \times \max\left(\text{Yield}, \left(\frac{\text{Age}_t}{\text{Life}}\right)^{\text{Bow}}\right)" />}
          example={
            <ul className="space-y-2 mt-2">
              <li><span className="text-[#D08F52]">Yield</span> = Baseline rate of distributions</li>
              <li><span className="text-[#D08F52]">Age / Life</span> = Progress through fund duration</li>
              <li><span className="text-[#D08F52]">Bow Factor</span> = Exponential modifier forcing the curve upward toward 100%</li>
              <li className="mt-4 pt-4 border-t border-gray-800 text-gray-300">
                <strong>Mechanics:</strong> Ensures distributions remain synchronized with NAV buildup and naturally accelerate as the fund enters its harvest period.
              </li>
            </ul>
          }
        />

        <SectionHeading>The Secondary Market as a Rebalancing Mechanism</SectionHeading>
        <ul className="space-y-4 list-disc list-outside ml-6 mb-8 text-gray-700 dark:text-gray-300">
          <li>When liquidity forecasts fail, LPs experience the <Tooltip term="Denominator Effect" definition="Declining public equity values cause the smoothed private equity portfolio to breach target allocation limits." />.</li>
          <li>Specialized buyers programmatically price LP stakes at precise discounts to NAV using proprietary databases.</li>
          <li>GP-led continuation vehicles allow sponsors to roll high-performing assets into new funds.</li>
          <li>Allows LPs to instantly recalibrate their LSTM cash flow models, harvest early liquidity, and optimize multi-factor risk exposure.</li>
        </ul>

      </div>
    </ArticleFrame>
  );
}
