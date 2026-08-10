'use client';

import { useState } from 'react';
import { CheckCircle, TrendingUp, Shield, BarChart2, AlertTriangle, GitBranch, FileText } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

export default function BeyondLeverageRiskParityCallWriting() {
  return (
    <ArticleFrame slug="beyond-leverage-risk-parity-call-writing">
      <div className="max-w-5xl mx-auto px-4 text-gray-900">
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mb-12">
          Discover a sophisticated, non-leverage-based methodology for achieving true risk diversification by re-engineering asset risk profiles through options overlays.
        </p>

        <IntroductionSection />
        <CoreConceptsSection />
        <AcademicFoundationsSection />
        <ComparisonSection />
        <ImplementationSection />
        <AdvancedConsiderationsSection />
        <ConclusionSection />
      </div>
    </ArticleFrame>
  );
}

// Introduction Section
const IntroductionSection = () => (
  <section id="introduction" className="mb-16">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 font-serif">The Flaw in Traditional Portfolios</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        The classic 60/40 stock/bond portfolio, while seemingly diversified by capital, masks a severe risk imbalance. Due to the higher volatility of equities, the stock component often accounts for over 90% of the portfolio&apos;s total risk. This means a &ldquo;balanced&rdquo; portfolio is often just a leveraged bet on the stock market.
      </p>
    </div>
    <div className="text-center">
      <h3 className="text-2xl font-bold tracking-tight text-[#A8672E] dark:text-[#D08F52] font-serif">A New Paradigm: From Capital to Risk Budgeting</h3>
      <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
        Risk Parity corrects this by focusing on risk allocation, ensuring each asset class contributes equally to portfolio volatility. This report introduces a novel approach using call writing&mdash;a tool for risk transformation&mdash;to achieve this balance without resorting to traditional leverage.
      </p>
    </div>
  </section>
);

// Core Concepts Section
const CoreConceptsSection = () => (
  <section id="concepts" className="mb-16">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 font-serif">Core Concepts Deconstructed</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Understanding the two pillars of this innovative strategy: Equal Risk Contribution and Options Overlays.
      </p>
    </div>
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-xl shadow-lg border border-gray-200 hover:border-[#A8672E] dark:border-[#D08F52] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-lg">
            <BarChart2 className="h-8 w-8 text-[#A8672E] dark:text-[#D08F52]" />
          </div>
          <h3 className="ml-4 text-2xl font-bold text-gray-900 font-serif">The Principle of Risk Parity</h3>
        </div>
        <p className="text-gray-600 mb-4">
          The central tenet is <strong>Equal Risk Contribution (ERC)</strong>. Instead of allocating capital, the strategy allocates risk. The goal is a robust, &ldquo;all-weather&rdquo; portfolio where each asset class&mdash;equities, bonds, commodities&mdash;contributes equally to total portfolio risk, making it resilient across diverse economic scenarios.
        </p>
        <p className="text-gray-600">
          This requires sophisticated quantitative analysis to determine the precise capital allocations that result in a balanced risk budget.
        </p>
      </div>
      <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-xl shadow-lg border border-gray-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-purple-50 rounded-lg">
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="ml-4 text-2xl font-bold text-gray-900 font-serif">Call Writing as Risk Transformation</h3>
        </div>
        <p className="text-gray-600 mb-4">
          A covered call strategy creates an <strong>asymmetric payoff profile</strong>. In exchange for an upfront premium, the investor forfeits potential capital appreciation above the option&apos;s strike price. This caps the upside but provides a downside buffer equal to the premium received.
        </p>
        <p className="text-gray-600">
          This transforms a high-volatility asset into a synthetic, lower-beta asset, effectively &ldquo;powering down&rdquo; its risk contribution within the portfolio.
        </p>
      </div>
    </div>
  </section>
);

// Academic Foundations Section
const AcademicFoundationsSection = () => (
  <section id="research" className="mb-16">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 font-serif">Built on a Foundation of Academic Research</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        This strategy synthesizes decades of research from two distinct fields: risk-based asset allocation and derivatives strategy analysis.
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
        <FileText className="h-8 w-8 text-[#A8672E] dark:text-[#D08F52] mb-3" />
        <h4 className="font-bold text-xl mb-2 text-gray-900">Foundational Risk Parity Works</h4>
        <p className="text-gray-600 text-sm">
          Research from Qian, AQR, and Bridgewater established the core objective: equalize risk contributions. This body of work defines the target state that the call-written strategy aims to achieve.
        </p>
      </div>
      <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
        <FileText className="h-8 w-8 text-[#A8672E] dark:text-[#D08F52] mb-3" />
        <h4 className="font-bold text-xl mb-2 text-gray-900">&ldquo;Covered Calls Uncovered&rdquo; (AQR)</h4>
        <p className="text-gray-600 text-sm">
          This seminal paper deconstructed the covered call into its constituent risk factors, proving it can be an efficient risk-reduction tool by isolating compensated risk premiums (equity and volatility).
        </p>
      </div>
      <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
        <FileText className="h-8 w-8 text-[#A8672E] dark:text-[#D08F52] mb-3" />
        <h4 className="font-bold text-xl mb-2 text-gray-900">Optimization Frameworks (Diaz & Kwon)</h4>
        <p className="text-gray-600 text-sm">
          Their work showed that simultaneously optimizing asset weights and option parameters is superior to a simple overlay, providing a quantitative engine for a truly integrated strategy.
        </p>
      </div>
      <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
        <FileText className="h-8 w-8 text-[#A8672E] dark:text-[#D08F52] mb-3" />
        <h4 className="font-bold text-xl mb-2 text-gray-900">Tail Risk Parity (AllianceBernstein)</h4>
        <p className="text-gray-600 text-sm">
          This research presents a critical alternative, highlighting the potential weakness of a short-convexity strategy (like call writing) when viewed through a tail-risk lens, framing a key philosophical debate.
        </p>
      </div>
    </div>
  </section>
);

// Comparison Section
const ComparisonSection = () => (
  <section id="comparison" className="mb-16">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 font-serif">Two Paths to Risk Parity: A Trade-Off Analysis</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Achieve risk parity by &ldquo;levering up&rdquo; safe assets or &ldquo;powering down&rdquo; risky ones. The choice is a strategic decision about which risks you are willing to bear.
      </p>
    </div>
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div className="border-2 border-gray-200 rounded-xl p-8 bg-gray-50 shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-2xl font-bold mb-4 text-[#A8672E] dark:text-[#D08F52] font-serif">Leverage-Based Approach</h3>
        <p className="text-gray-600 mb-6">
          Amplifies the risk of low-risk assets (like bonds) to match high-risk assets (like stocks) by applying leverage to the entire portfolio.
        </p>
        <ul className="space-y-3">
          <li className="flex items-start">
            <CheckCircle className="h-6 w-6 text-[#1D8A70] dark:text-[#3CBF9C] mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Theoretically more efficient (leverages higher Sharpe ratio base).</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-6 w-6 text-[#1D8A70] dark:text-[#3CBF9C] mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Maintains full upside potential in bull markets.</span>
          </li>
          <li className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-[#BC4128] dark:text-[#E2694A] mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Introduces explicit funding costs and counterparty risk.</span>
          </li>
          <li className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-[#BC4128] dark:text-[#E2694A] mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Vulnerable to correlation shocks (e.g., when stocks and bonds fall together).</span>
          </li>
        </ul>
      </div>
      <div className="border-2 border-[#A8672E] dark:border-[#D08F52] rounded-xl p-8 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 shadow-xl">
        <h3 className="text-2xl font-bold mb-4 text-purple-600 font-serif">Call-Writing Approach</h3>
        <p className="text-gray-600 mb-6">
          Reduces the risk of high-risk assets (equities) by applying a call-writing overlay, creating a synthetic low-volatility asset.
        </p>
        <ul className="space-y-3">
          <li className="flex items-start">
            <CheckCircle className="h-6 w-6 text-[#1D8A70] dark:text-[#3CBF9C] mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Viable for leverage-constrained investors.</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-6 w-6 text-[#1D8A70] dark:text-[#3CBF9C] mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Harvests the Volatility Risk Premium (VRP) as an alternative return source.</span>
          </li>
          <li className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-[#BC4128] dark:text-[#E2694A] mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Incurs implicit opportunity cost by capping upside potential.</span>
          </li>
          <li className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-[#BC4128] dark:text-[#E2694A] mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Introduces a short convexity / short volatility risk profile.</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

// Implementation Section with Tabs
const ImplementationSection = () => {
  const [activeTab, setActiveTab] = useState('delta');

  const tabs = {
    delta: { title: 'Delta Targeting', content: <DeltaContent /> },
    strike: { title: 'Strike Selection', content: <StrikeContent /> },
    rebalancing: { title: 'Dynamic Management', content: <RebalancingContent /> },
  };

  return (
    <section id="implementation" className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 font-serif">A Practitioner&apos;s Guide to Calibration</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Effective implementation requires a disciplined, rules-based approach to managing the options overlay.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="flex border-b border-gray-200 mb-8">
          {Object.entries(tabs).map(([key, tab]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`py-3 px-6 font-semibold text-lg transition-colors duration-300 ${
                activeTab === key
                  ? 'border-b-2 border-[#A8672E] dark:border-[#D08F52] text-[#A8672E] dark:text-[#D08F52]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-lg border border-gray-200 shadow-lg">
          {tabs[activeTab as keyof typeof tabs].content}
        </div>
      </div>
    </section>
  );
};

const DeltaContent = () => (
  <div>
    <h3 className="text-2xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-4 font-serif">The Primary Control Lever</h3>
    <p className="text-gray-700">
      An option&apos;s <strong>delta</strong> is the primary tool for calibrating the overlay&apos;s risk reduction. By systematically selling calls with a specific average delta, a manager can precisely target a desired portfolio beta.
    </p>
    <ul className="mt-4 space-y-2 text-gray-600 list-disc list-inside">
      <li>To achieve a target beta of <strong>0.8</strong>, sell calls with an average delta of <strong>0.20</strong>.</li>
      <li>To achieve a target beta of <strong>0.6</strong>, sell calls with an average delta of <strong>0.40</strong>.</li>
      <li>To achieve a target beta of <strong>0.5</strong>, sell at-the-money calls with a delta of ~<strong>0.50</strong>.</li>
    </ul>
  </div>
);

const StrikeContent = () => (
  <div>
    <h3 className="text-2xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-4 font-serif">Balancing Risk, Reward, and Income</h3>
    <p className="text-gray-700 mb-6">
      The choice of strike price (&ldquo;moneyness&rdquo;) implements the delta target and involves significant trade-offs.
    </p>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3">Moneyness (Delta)</th>
            <th className="p-3">Profile</th>
            <th className="p-3">Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-200">
            <td className="p-3 font-semibold">Out-of-the-Money (&lt;0.5)</td>
            <td className="p-3">Less income, less risk reduction, but more upside potential.</td>
            <td className="p-3">Mildly bullish outlook or when minimal risk reduction is needed.</td>
          </tr>
          <tr className="border-t border-gray-200">
            <td className="p-3 font-semibold">At-the-Money (~0.5)</td>
            <td className="p-3">Maximizes premium income (VRP harvest) with significant risk reduction.</td>
            <td className="p-3">The standard choice for a balanced risk/income profile.</td>
          </tr>
          <tr className="border-t border-gray-200">
            <td className="p-3 font-semibold">In-the-Money (&gt;0.5)</td>
            <td className="p-3">Maximum risk reduction and downside buffer, but no upside.</td>
            <td className="p-3">Neutral to bearish outlook or when maximum risk reduction is required.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const RebalancingContent = () => (
  <div>
    <h3 className="text-2xl font-bold text-[#A8672E] dark:text-[#D08F52] mb-4 font-serif">Responding to Market Dynamics</h3>
    <p className="text-gray-700 mb-4">
      This is not a &ldquo;set and forget&rdquo; strategy. The overlay must be dynamically managed as market conditions evolve, particularly in response to changes in implied volatility (IV).
    </p>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-4 rounded-lg border border-green-200">
        <h4 className="font-bold text-lg text-[#1D8A70] dark:text-[#3CBF9C]">When IV is High:</h4>
        <p className="text-gray-700">
          Sell calls further out-of-the-money (lower delta). This captures high premiums while retaining more upside potential.
        </p>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h4 className="font-bold text-lg text-yellow-700">When IV is Low:</h4>
        <p className="text-gray-700">
          Sell calls closer to-the-money (higher delta). This is necessary to generate sufficient premium and achieve the target risk reduction.
        </p>
      </div>
    </div>
  </div>
);

// Advanced Considerations Section
const AdvancedConsiderationsSection = () => (
  <section id="advanced" className="mb-16">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 font-serif">Advanced Considerations & Critiques</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        No strategy is without its vulnerabilities. Understanding the limitations is key.
      </p>
    </div>
    <div className="space-y-8">
      <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-8 rounded-xl border border-red-200 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <Shield className="h-16 w-16 text-[#BC4128] dark:text-[#E2694A]" />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-3 text-[#BC4128] dark:text-[#E2694A] font-serif">The Tail Risk Parity (TRP) Critique</h3>
          <p className="text-gray-700">
            While call writing reduces average volatility, it does little to protect against severe market crashes. By selling a call, an investor sells convexity, truncating the positive tail (upside) while leaving the dangerous negative tail largely intact. This makes it a potentially suboptimal strategy for investors whose primary goal is mitigating extreme crash risk.
          </p>
        </div>
      </div>
      <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-200 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <GitBranch className="h-16 w-16 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-3 text-yellow-700 font-serif">Model Risk & Parameter Uncertainty</h3>
          <p className="text-gray-700">
            The strategy&apos;s effectiveness relies on key inputs: forecasts of volatility and correlations, and the assumption of a persistent Volatility Risk Premium. Errors in these inputs or a reliance on models based on normal distributions (in a &ldquo;fat-tailed&rdquo; world) can lead to unexpected and suboptimal performance.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Conclusion Section
const ConclusionSection = () => (
  <section id="conclusion">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 font-serif">Viability and Strategic Recommendations</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Call writing is a sophisticated and viable strategy that expands the modern portfolio manager&apos;s toolkit, representing a thoughtful evolution of risk-based investing.
      </p>
    </div>
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-xl border border-gray-200 shadow-lg">
        <h4 className="font-bold text-xl mb-4 text-[#A8672E] dark:text-[#D08F52]">Primary Use Cases</h4>
        <ul className="space-y-3 list-disc list-inside text-gray-600">
          <li><strong>Leverage-Constrained Investors:</strong> The most compelling case for institutions (endowments, foundations) whose mandates prohibit explicit leverage.</li>
          <li><strong>Range-Bound Markets:</strong> Best suited for market regimes expected to be range-bound, moderately bullish, or mildly bearish.</li>
          <li><strong>Diversifying Complement:</strong> Can be blended with leverage-based approaches to diversify the sources of risk within the management process itself.</li>
        </ul>
      </div>
      <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-xl border border-gray-200 shadow-lg">
        <h4 className="font-bold text-xl mb-4 text-[#A8672E] dark:text-[#D08F52]">Avenues for Future Research</h4>
        <ul className="space-y-3 list-disc list-inside text-gray-600">
          <li>Integration of more complex options structures like collars to protect the downside tail.</li>
          <li>Application of overlays to other asset classes like commodities or high-yield credit.</li>
          <li>Rigorous backtesting of dynamic rebalancing models based on implied volatility.</li>
        </ul>
      </div>
    </div>
  </section>
);
