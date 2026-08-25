'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// Tooltip Component for Jargon
const Tooltip = ({ term, definition }: { term: string; definition: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="relative inline-block cursor-help border-b border-dashed border-[#A8672E] dark:border-[#D08F52] text-[#A8672E] dark:text-[#D08F52]"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      aria-label={`Definition of ${term}: ${definition}`}
    >
      {term}
      {isVisible && (
        <span className="absolute z-10 w-64 p-2 mt-2 -translate-x-1/2 left-1/2 text-sm text-white bg-black dark:bg-[#14171B] rounded shadow-lg pointer-events-none font-sans font-normal normal-case tracking-normal text-left">
          {definition}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-black dark:border-b-[#14171B]"></span>
        </span>
      )}
    </span>
  );
};

export default function QuantFinanceEcosystem() {
  return (
    <ArticleFrame slug="foundations-quantitative-finance-alpha-ecosystem">
      <div className="max-w-5xl mx-auto px-4 py-4 text-gray-900 dark:text-gray-100 font-sans">
        
        {/* Standout Stats Row */}
        <section className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 bg-gray-50 dark:bg-[#14171B] rounded-lg border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Total Quantitative Firms</span>
            <span className="font-mono text-3xl font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">~400</span>
            <span className="text-xs text-gray-400 mt-1">U.S. Market (Dec 2023)</span>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#14171B] rounded-lg border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Total AUM</span>
            <span className="font-mono text-3xl font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">~$370 Billion</span>
            <span className="text-xs text-gray-400 mt-1">U.S. Market (Dec 2023)</span>
          </div>
        </section>

        {/* Section: Paradigm Shift */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif text-[#A8672E] dark:text-[#D08F52] mb-6">The Paradigm Shift: From Discretionary to Quantitative Investment</h2>
          
          <p className="mb-6 leading-relaxed">
            The global capital markets are currently navigating a fundamental structural migration, moving away from traditional <Tooltip term="discretionary" definition="Human-driven analysis and subjective judgment used to make investment decisions." /> paradigms toward systematic, model-centric architectures.
          </p>

          <ul className="list-disc pl-6 space-y-3 mb-8 text-gray-800 dark:text-gray-300">
            <li>Transition driven by the exponential growth of data complexity.</li>
            <li>Information density far exceeds human cognitive capacity.</li>
            <li>Automation is the primary requirement for modern institutional relevance.</li>
            <li>Systematic approach mathematically mitigates inherent biases of human intuition.</li>
            <li>Replaces subjective judgment with rigorous, scalable frameworks designed to capture market inefficiencies.</li>
          </ul>

          {/* Dichotomy Card: Discretionary vs. Quantitative */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gray-50 dark:bg-[#1A1D24] rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-serif mb-4 text-[#BC4128] dark:text-[#E2694A]">Discretionary Analysis</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mr-2">&times;</span>
                  <span className="text-sm">Constrained by the &ldquo;time-to-analysis&rdquo; bottleneck.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#BC4128] dark:text-[#E2694A] mr-2">&times;</span>
                  <span className="text-sm">Limited scope to a statistically insignificant sample of securities.</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-[#F2F9F6] dark:bg-[#10231D] rounded-xl border border-[#D5EAE2] dark:border-[#1A382D]">
              <h3 className="text-lg font-serif mb-4 text-[#1D8A70] dark:text-[#3CBF9C]">Quantitative Modeling</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] mr-2">&#10003;</span>
                  <span className="text-sm">Provides an asymmetric information advantage.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] mr-2">&#10003;</span>
                  <span className="text-sm">Processes multi-modal data sets across thousands of global instruments simultaneously.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#1D8A70] dark:text-[#3CBF9C] mr-2">&#10003;</span>
                  <span className="text-sm">Achieves market coverage and speed physically impossible for human-centric firms.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Core Market Mechanics */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif text-[#A8672E] dark:text-[#D08F52] mb-6">Core Market Mechanics and Investment Vehicle Structures</h2>
          
          <p className="mb-6 leading-relaxed">
            Building high-performance mathematical models is impossible without a granular understanding of market fundamentals. Equity ownership and fund operational mechanics serve as the essential primitives upon which all sophisticated algorithms are constructed.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3 border-b border-gray-200 dark:border-gray-800 pb-2">The Fundamentals of Equity and Exchange</h3>
              <ul className="space-y-4">
                <li className="pl-4 border-l-2 border-[#A8672E] dark:border-[#D08F52]">
                  <strong className="block text-gray-900 dark:text-gray-100">Share Ownership</strong>
                  <span className="text-gray-600 dark:text-gray-400">Each share represents a fractional equity interest in a corporation.</span>
                </li>
                <li className="pl-4 border-l-2 border-[#A8672E] dark:border-[#D08F52]">
                  <strong className="block text-gray-900 dark:text-gray-100">Valuation Dynamics</strong>
                  <span className="text-gray-600 dark:text-gray-400">A company&rsquo;s market capitalization is the aggregate value of these shares. Owning a single share priced at <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">$100</span> represents a specific claim on the company&rsquo;s assets and earnings proportional to that valuation.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3 border-b border-gray-200 dark:border-gray-800 pb-2">Hedge Fund Operational Dynamics</h3>
              <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                Unlike traditional long-only investment vehicles, hedge funds employ specific strategic levers to navigate varying market regimes.
              </p>
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
                <table className="min-w-full text-left text-sm">
                  <thead className="uppercase tracking-wider border-b-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#14171B]">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">Strategic Lever</th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">Institutional Definition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr className="hover:bg-gray-50 dark:hover:bg-[#1A1D24] transition-colors">
                      <td className="px-6 py-4 font-medium text-[#1D8A70] dark:text-[#3CBF9C] whitespace-nowrap">Leverage</td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">The utilization of borrowed capital to amplify investment exposure and enhance potential risk-adjusted returns.</td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-[#1A1D24] transition-colors">
                      <td className="px-6 py-4 font-medium text-[#BC4128] dark:text-[#E2694A] whitespace-nowrap">Shorting (Selling)</td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-300">The process of borrowing securities to sell at current prices, intending to repurchase them at lower valuations to capture profit from downward price discovery.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Architecture of Alpha */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif text-[#A8672E] dark:text-[#D08F52] mb-6">The Architecture of Alpha: Mathematical Modeling in Finance</h2>
          
          <p className="mb-6 leading-relaxed">
            In the quantitative hierarchy, the <Tooltip term="Alpha" definition="A mathematical model engineered to predict the future price movement of financial instruments." /> is the ultimate value-driver. It is the intellectual property that defines a firm&rsquo;s competitive edge.
          </p>

          <div className="bg-[#14171B] dark:bg-[#05070A] text-white p-6 rounded-xl shadow-lg border border-gray-700 dark:border-gray-800 mb-8 font-mono">
            <div className="flex items-center text-gray-400 text-xs uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
              <span>Core Objective of an Alpha Model</span>
            </div>
            <div className="space-y-3 text-sm sm:text-base text-[#3CBF9C]">
              <p>1. Extract a persistent signal from market noise.</p>
              <p>2. Identify repeatable patterns.</p>
              <p>3. Deploy capital based on statistical probability of price direction.</p>
              <p className="text-gray-400 mt-4 text-xs italic">// Transforming historical data into a predictive tool</p>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">The Intersection of Data and Human Creativity</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-gray-300">
            <li>Data is the raw material, but human intuition and creative synthesis are the &ldquo;secret sauce&rdquo;.</li>
            <li><strong>The &ldquo;Chef and Ingredients&rdquo; analogy:</strong> Two researchers can access <span className="font-mono text-[#1D8A70] dark:text-[#3CBF9C]">120,000</span> data fields and produce entirely different outcomes.</li>
            <li>Unique application of techniques prevents Alpha from deteriorating into <Tooltip term="commoditized beta" definition="Common, easily replicable market returns that lack a unique competitive advantage." />.</li>
            <li>Human creativity is the primary defense against systematic alpha decay.</li>
          </ul>
        </section>

        {/* Section: The Quant Ecosystem */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif text-[#A8672E] dark:text-[#D08F52] mb-6">The Quant Ecosystem: Infrastructure, Simulation, and Data</h2>
          
          <p className="mb-6 leading-relaxed">
            A &ldquo;Quant Ecosystem&rdquo; is the mandatory pipeline required to transform a mathematical hypothesis into a deployable investment strategy, drastically reducing &ldquo;time-to-market&rdquo; for new signals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-5 bg-gray-50 dark:bg-[#1A1D24] rounded-lg border-t-4 border-[#A8672E] dark:border-[#D08F52]">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">1. Data Collection</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Streamlining access to massive datasets for model ingestion.</p>
            </div>
            <div className="p-5 bg-gray-50 dark:bg-[#1A1D24] rounded-lg border-t-4 border-[#1D8A70] dark:border-[#3CBF9C]">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">2. Predictive Modeling</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Providing the computational tools to refine Alpha constructs.</p>
            </div>
            <div className="p-5 bg-gray-50 dark:bg-[#1A1D24] rounded-lg border-t-4 border-[#BC4128] dark:border-[#E2694A]">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">3. Risk Management</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Stress-testing models against historical volatility to ensure capital preservation.</p>
            </div>
          </div>

          <div className="p-6 border border-[#A8672E] dark:border-[#D08F52] rounded-xl bg-orange-50/50 dark:bg-orange-900/10 mb-8">
            <h3 className="text-lg font-serif mb-2 text-[#A8672E] dark:text-[#D08F52]">Ecosystem Depth Analysis</h3>
            <p className="text-gray-800 dark:text-gray-300">
              The efficacy of an ecosystem is measured by its depth. The WorldQuant Brain environment provides access to over <span className="font-mono font-bold text-[#A8672E] dark:text-[#D08F52]">120,000</span> data fields, allowing for the isolation of niche signals invisible in standard public data sets.
            </p>
          </div>

          {/* Infographic Slot */}
          <div className="my-8">
            <InfographicSlot alt="Foundations of Quantitative Finance Research and the Alpha Ecosystem" />
          </div>
        </section>

        {/* Section: Democratization */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif text-[#A8672E] dark:text-[#D08F52] mb-6">Democratization and Global Collaboration in Research</h2>
          
          <p className="mb-6 leading-relaxed">
            The shift toward &ldquo;crowdsourcing&rdquo; intelligence allows institutions to access <Tooltip term="uncorrelated alpha" definition="Diverse perspectives and predictive signals that do not move in tandem with existing models or broader market trends." /> from global talent pools outside traditional financial hubs.
          </p>

          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">The Research Consultant Model Pillars</h3>
          <ul className="space-y-4 mb-8">
            <li className="flex">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#1D8A70]/10 text-[#1D8A70] dark:bg-[#3CBF9C]/20 dark:text-[#3CBF9C] font-mono mr-4">1</span>
              <div>
                <strong className="block text-gray-900 dark:text-gray-100">Performance-Based Compensation</strong>
                <span className="text-gray-600 dark:text-gray-400 text-sm">Incentives are aligned with the objective quality and performance of the researcher&rsquo;s ideas.</span>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#1D8A70]/10 text-[#1D8A70] dark:bg-[#3CBF9C]/20 dark:text-[#3CBF9C] font-mono mr-4">2</span>
              <div>
                <strong className="block text-gray-900 dark:text-gray-100">Operational Flexibility</strong>
                <span className="text-gray-600 dark:text-gray-400 text-sm">Consultants retain autonomy to contribute from any location, at any time.</span>
              </div>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#1D8A70]/10 text-[#1D8A70] dark:bg-[#3CBF9C]/20 dark:text-[#3CBF9C] font-mono mr-4">3</span>
              <div>
                <strong className="block text-gray-900 dark:text-gray-100">Institutional Integration</strong>
                <span className="text-gray-600 dark:text-gray-400 text-sm">Individual researchers see their work directly influence large-scale research efforts.</span>
              </div>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-4 bg-gray-50 dark:bg-[#14171B] rounded border border-gray-200 dark:border-gray-800 text-center">
              <span className="block text-3xl font-mono font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-1">&gt; 100,000</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Emerging Quants</span>
            </div>
            <div className="flex-1 p-4 bg-gray-50 dark:bg-[#14171B] rounded border border-gray-200 dark:border-gray-800 text-center">
              <span className="block text-3xl font-mono font-bold text-[#1D8A70] dark:text-[#3CBF9C] mb-1">180</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Countries represented</span>
            </div>
          </div>
        </section>

        {/* Section: Key Takeaways */}
        <section>
          <div className="p-8 bg-gray-900 dark:bg-black rounded-2xl shadow-xl border border-gray-800">
            <h2 className="text-2xl font-serif text-white mb-6 border-b border-gray-700 pb-4">Key Takeaways: The Future of Alpha Creation</h2>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] text-xl mr-3 mt-1">&#10022;</span>
                <p className="text-gray-300">Success requires disciplined, progressive mastery of market mechanics, mathematical modeling, and technological infrastructure.</p>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] text-xl mr-3 mt-1">&#10022;</span>
                <p className="text-gray-300">In a field prone to <Tooltip term="over-fitting" definition="Creating a model that corresponds too closely or exactly to a particular set of historical data, failing to predict future observations reliably." /> and <Tooltip term="survivorship bias" definition="The logical error of concentrating on the entities that passed some selection process and overlooking those that did not." />, the simulation platform is the only objective arbiter of truth.</p>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] text-xl mr-3 mt-1">&#10022;</span>
                <p className="text-[#3CBF9C] font-medium">Testing is not a suggestion&mdash;it is the ultimate requirement.</p>
              </li>
              <li className="flex items-start">
                <span className="text-[#A8672E] dark:text-[#D08F52] text-xl mr-3 mt-1">&#10022;</span>
                <p className="text-gray-300">Rigorous simulation is the only way to transform a creative spark into a proven, institutional-grade investment strategy.</p>
              </li>
            </ul>
          </div>
        </section>

      </div>
    </ArticleFrame>
  );
}
