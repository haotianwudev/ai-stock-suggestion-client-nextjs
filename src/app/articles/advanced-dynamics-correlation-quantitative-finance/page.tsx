'use client';

import React, { useState } from 'react';
import {
  Network, FunctionSquare, Layers,
  BarChart2, TrendingUp, FileBox, Globe, Activity,
  Info, AlertTriangle, ShieldAlert, Zap
} from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// ─── Reusable Components ───────────────────────────────────────────────────────

const GradientText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r ${className}`}>{children}</span>
);

const SectionCard = ({
  id, icon: Icon, title, gradient, children,
}: {
  id?: string;
  icon: React.ElementType;
  title: string;
  gradient: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 mb-12 hover:shadow-2xl transition-shadow duration-300">
    <div className={`h-2 w-full bg-gradient-to-r ${gradient}`} />
    <div className="p-8 md:p-12">
      <div className="flex items-center gap-4 mb-8">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
      </div>
      <div className="space-y-6 text-slate-600 text-lg leading-relaxed">{children}</div>
    </div>
  </section>
);

const Callout = ({
  title, children, type = 'info',
}: {
  title?: string;
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'danger' | 'success';
}) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    danger: 'bg-rose-50 border-rose-200 text-rose-800',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  };
  const IconMap = { info: Info, warning: AlertTriangle, danger: AlertTriangle, success: Info };
  const Icon = IconMap[type];
  return (
    <div className={`p-6 rounded-2xl border ${styles[type]} flex gap-4 my-6`}>
      <Icon className="shrink-0 mt-1" size={24} />
      <div>
        {title && <h4 className="font-bold mb-2">{title}</h4>}
        <div className="opacity-90">{children}</div>
      </div>
    </div>
  );
};

const MathBlock = ({ formula, description }: { formula: string; description?: string }) => (
  <div className="my-8 p-6 bg-slate-900 rounded-2xl shadow-inner overflow-x-auto text-center border border-slate-700">
    <code className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 font-mono text-base md:text-xl font-bold whitespace-nowrap">
      {formula}
    </code>
    {description && (
      <p className="mt-3 text-slate-400 text-sm font-sans">{description}</p>
    )}
  </div>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-4 tracking-tight flex items-center gap-2">
    <div className="w-1.5 h-6 bg-slate-300 rounded-full" />
    {children}
  </h3>
);

interface TableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}

const DataTable = ({ headers, rows }: TableProps) => (
  <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-slate-50 border-b border-slate-200">
          {headers.map((h, i) => (
            <th key={i} className="py-4 px-6 font-bold text-slate-700 whitespace-nowrap text-sm">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className={`py-4 px-6 text-slate-600 text-sm ${j === 0 ? 'font-semibold text-slate-800' : ''}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AdvancedDynamicsCorrelationPage() {
  return (
    <ArticleFrame slug="advanced-dynamics-correlation-quantitative-finance">
      <InfographicSlot alt="Advanced Dynamics of Correlation in Quantitative Finance Infographic" />

      {/* Section 1: Introduction */}
      <SectionCard icon={Network} title="Introduction to the Paradigm of Dependency" gradient="from-indigo-500 to-indigo-600">
        <ul className="list-disc pl-5 space-y-3">
          <li><strong className="text-slate-800">Foundational Framework:</strong> Correlation represents the core mathematical framework for understanding dependency between multiple random variables in quantitative finance.</li>
          <li><strong className="text-slate-800">Evolution from Classical Paradigms:</strong> Traditional frameworks focused heavily on isolating single-asset risk (standalone variance). Modern markets fundamentally require a transition toward multivariate dependency structures.</li>
          <li>
            <strong className="text-slate-800">Critical Applications:</strong> Robust modeling of asset co-movement is unequivocally necessary for:
            <ul className="list-[circle] pl-6 mt-2 space-y-1 text-slate-500">
              <li>Multi-asset derivative valuation</li>
              <li>Institutional portfolio optimization</li>
              <li>Dispersion trading strategies</li>
              <li>Systemic risk calculations</li>
            </ul>
          </li>
          <li><strong className="text-slate-800">The Flaw of Separability:</strong> Historically, risk was treated as &ldquo;separable,&rdquo; assuming a portfolio&apos;s sensitivity to one risk factor remained independent of another. This is no longer a valid assumption.</li>
        </ul>
        <Callout title="Key Insight" type="info">
          The relentless proliferation of highly customized derivative products and the persistent recurrence of violent systemic market shocks have thoroughly invalidated the assumption of static, separable correlation.
        </Callout>
      </SectionCard>

      {/* Section 2: Statistical Foundations */}
      <SectionCard icon={FunctionSquare} title="Statistical Foundations &amp; Typologies" gradient="from-rose-500 to-rose-600">
        <ul className="list-disc pl-5 space-y-3">
          <li><strong className="text-slate-800">Core Definition:</strong> A correlation coefficient is a descriptive statistic that quantifies the strength and direction of a relationship, strictly bounded within the interval <strong>[-1, 1]</strong>.</li>
        </ul>

        <SubHeading>The Pearson Correlation Coefficient</SubHeading>
        <p>
          The most prevalent measure of dependency, measuring the noisiness and direction of a strictly <em>linear</em> relationship between two variables, X and Y.
        </p>

        <MathBlock
          formula="ρ(X,Y) = Cov(X,Y) / (σ_X · σ_Y)"
          description="Pearson Correlation Coefficient — normalizes covariance by the product of standard deviations"
        />

        <ul className="list-disc pl-5 space-y-3">
          <li><strong className="text-slate-800">Scale Invariance:</strong> Dividing the covariance by the product of standard deviations normalizes the values, allowing direct comparisons across highly disparate asset classes.</li>
          <li><strong className="text-slate-800">Crucial Limitation:</strong> The Pearson coefficient is sensitive <em>solely</em> to linear relationships. Two variables can possess a Pearson correlation of zero while simultaneously being deeply dependent through a nonlinear function.</li>
          <li><strong className="text-slate-800">Rank-Based Alternatives:</strong> Due to Pearson&apos;s limitations, rank-based metrics like Spearman&apos;s rho and Kendall&apos;s tau are frequently utilized to capture non-linear, monotonic dependencies.</li>
        </ul>
      </SectionCard>

      {/* Section 3: Portfolio Theory */}
      <SectionCard icon={Layers} title="Portfolio Theory and Diversification" gradient="from-emerald-500 to-teal-500">
        <p>
          A portfolio&apos;s total standard deviation is not just a weighted average of individual asset volatilities; it is critically dependent on cross-asset correlations.
        </p>

        <MathBlock
          formula="σ²_p = Σᵢ Σⱼ wᵢ · wⱼ · σᵢ · σⱼ · ρᵢⱼ"
          description="Portfolio Variance Formula — the full covariance matrix drives total portfolio risk"
        />

        <SubHeading>The Illusion of Static Negative Correlation</SubHeading>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong className="text-slate-800">The Traditional Assumption:</strong> High-grade sovereign bonds historically provided negative correlation to equities, protecting portfolios during market stress.</li>
          <li><strong className="text-slate-800">The Regime Shift Reality:</strong> Asset correlations are not static laws of physics. During transitions into high-inflation environments, nominal yields shift higher to combat inflation, devastating both bond prices and equity valuations simultaneously.</li>
          <li><strong className="text-slate-800">Evaporation of Diversification:</strong> Consequently, the correlation between stocks and bonds can shift from negative to positive, destroying diversification benefits exactly when they are needed most.</li>
        </ul>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2 mb-3">
              <ShieldAlert size={18} /> Central Counterparty Margining
            </h4>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
              <li>Institutions hold large portfolios of single-name Credit Default Swaps (CDS).</li>
              <li>Static margin calculations become compromised during regime shifts.</li>
              <li>This exposes clearinghouses to massive uncollateralized systemic credit events.</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-emerald-700 flex items-center gap-2 mb-3">
              <Activity size={18} /> Systemic Risk
            </h4>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
              <li>Failing to account for correlation regime shifts results in severe underestimation of portfolio risk.</li>
              <li>It directly impacts Initial Margin (IM) requirements.</li>
              <li>It fundamentally skews Value-at-Risk (VaR) and Expected Shortfall (ES).</li>
            </ul>
          </div>
        </div>
      </SectionCard>

      {/* Section 4: Realized vs Implied */}
      <SectionCard icon={BarChart2} title="Realized vs. Option-Implied Correlation" gradient="from-amber-500 to-orange-500">
        <ul className="list-disc pl-5 space-y-3">
          <li><strong className="text-slate-800">Realized Correlation:</strong> A historical, backward-looking observation of actual asset co-movement over a specific time window.</li>
          <li><strong className="text-slate-800">Implied Correlation (The Q-Measure):</strong> A forward-looking, risk-neutral market expectation reverse-engineered from option pricing models.</li>
        </ul>

        <SubHeading>The 4 Stylized Facts of Realized Index Correlation</SubHeading>
        <div className="space-y-4 mb-8">
          {[
            {
              title: "Asymmetric Spikes During Stress",
              desc: "In declining markets, liquidity providers widen spreads and indiscriminate selling forces stocks to fall in tandem (e.g., S&P 500 correlation spiked to 0.85 in March 2020).",
            },
            {
              title: "Dispersion During Market Calm",
              desc: "During bullish stability, asset prices move based on idiosyncratic, company-specific fundamentals, causing correlation to drop.",
            },
            {
              title: "The Volatility Link",
              desc: "There is an inexorable, positive mathematical linkage between correlation and market volatility.",
            },
            {
              title: "The Absolute Ceiling",
              desc: "By strict mathematical definition, realized correlation possesses an absolute ceiling and can never exceed 100% (1.0).",
            },
          ].map((fact, i) => (
            <div key={i} className="flex gap-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-amber-200 text-amber-800 rounded-full font-bold text-sm">
                {i + 1}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{fact.title}</h4>
                <p className="text-slate-600 text-sm mt-1">{fact.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <SubHeading>Calculating Implied Correlation</SubHeading>
        <ul className="list-disc pl-5 space-y-3">
          <li>It is isolated by comparing the implied volatility of a broad market index against a weighted basket of the implied volatilities of its single-stock constituents.</li>
          <li>High index option premiums relative to single-stock options mathematically indicate an elevated expectation of implied correlation.</li>
        </ul>
      </SectionCard>

      {/* Section 5: CRP & Dispersion Trading */}
      <SectionCard icon={TrendingUp} title="Correlation Risk Premium (CRP) &amp; Dispersion Trading" gradient="from-blue-500 to-cyan-500">
        <ul className="list-disc pl-5 space-y-3">
          <li><strong className="text-slate-800">The CRP Gap:</strong> There is a persistent structural gap between average implied correlations (historically higher) and realized correlations (historically lower).</li>
          <li><strong className="text-slate-800">The Cost of Insurance:</strong> The CRP acts as an insurance premium that market participants pay to hedge against unanticipated, systemic surges in correlation.</li>
          <li><strong className="text-slate-800">Aversion to Contagion:</strong> Investors are inherently averse to correlation risk because diversification breaks down entirely during market crashes — creating a &ldquo;no-place-to-hide&rdquo; scenario.</li>
        </ul>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm mt-6">
          <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2 mb-4">
            <Zap size={20} /> Mechanics of Dispersion Trading
          </h3>
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-3 mb-5">
            <li>Quantitative hedge funds deploy capital to exploit this negative CRP by systematically selling rich implied correlation.</li>
            <li><strong>The Trade Setup:</strong> A trader sells index options (a short straddle) while simultaneously buying a weighted basket of options on the constituent stocks (long straddles).</li>
          </ul>
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-blue-100">
              <div className="mt-1 w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
              <div>
                <strong className="text-slate-800">High Dispersion Scenario (The Win):</strong>
                <p className="text-slate-600 text-sm mt-1">Realized correlation remains low. Individual stocks disperse in different directions. The aggregate index stays flat, allowing the short straddle to profit via theta decay, while the long individual stock straddles gain intrinsic value.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-blue-100">
              <div className="mt-1 w-3 h-3 rounded-full bg-rose-500 shrink-0" />
              <div>
                <strong className="text-slate-800">High Correlation Scenario (The Loss):</strong>
                <p className="text-slate-600 text-sm mt-1">A macro shock causes all stocks to plummet simultaneously. The massive directional move in the index destroys the short straddle, causing severe overall portfolio losses.</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Section 6: Correlation-Sensitive Instruments */}
      <SectionCard icon={FileBox} title="Correlation-Sensitive Financial Instruments" gradient="from-purple-500 to-pink-500">
        <ul className="list-disc pl-5 space-y-3">
          <li>Financial engineering has largely moved beyond plain vanilla risk toward complex, non-separable risk profiles.</li>
          <li>In these products, a shift in one underlying risk factor directly and dynamically alters the price sensitivity to another factor.</li>
        </ul>

        <DataTable
          headers={["Derivative Class", "Risk Factors", "Mechanism & Exposure"]}
          rows={[
            [
              "Differential (Diff) Swaps",
              "Domestic & Foreign Floating Rates",
              "Cross-currency basis trades executed against a fixed notional. The dealer's exposure is strictly tied to the future correlation between the two rates.",
            ],
            [
              "Quanto Swaps / Options",
              "Foreign Equity Index & FX Rate",
              "Provides foreign equity returns with zero FX risk for the buyer. The dealer assumes complex cross-gamma risk driven entirely by local correlation dynamics.",
            ],
            [
              "Spread Options",
              "Asset 1 & Asset 2",
              "Written directly on the price difference between two assets. Valuation relies intensely on instantaneous covariance and correlation tracking.",
            ],
            [
              "Basket Options",
              "Multiple Equities, FX, etc.",
              "Options settled on the average price of a basket. Pricing these requires constructing and managing a full, multi-dimensional covariance matrix.",
            ],
          ]}
        />
      </SectionCard>

      {/* Section 7: Dynamic Econometric & Copula Modeling */}
      <SectionCard icon={Globe} title="Dynamic Econometric &amp; Copula Modeling" gradient="from-teal-500 to-cyan-600">
        <ul className="list-disc pl-5 space-y-3">
          <li>Static historical covariance matrices (Constant Conditional Correlation) are structurally inadequate for modern crisis risk management.</li>
          <li>Econometricians deploy highly sophisticated models to accurately capture time-varying, dynamic market behavior.</li>
        </ul>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="p-6 border border-teal-100 rounded-2xl bg-teal-50 shadow-sm">
            <h4 className="font-bold text-teal-800 text-lg mb-3">DCC Frameworks</h4>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
              <li><strong>Dynamic Conditional Correlation (DCC):</strong> Shapes time-varying correlation utilizing a GARCH procedure.</li>
              <li>Decouples univariate volatility estimation from correlation matrix estimation.</li>
              <li>Successfully resolves &ldquo;dimensionality curses&rdquo; in large portfolio calculations.</li>
              <li>Advanced variants (like GJR-DCC) can model asymmetric leverage effects.</li>
            </ul>
          </div>
          <div className="p-6 border border-teal-100 rounded-2xl bg-teal-50 shadow-sm">
            <h4 className="font-bold text-teal-800 text-lg mb-3">Stochastic Correlation</h4>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
              <li><strong>Regime-Switching DCC:</strong> Employs latent Markov chains to model shifts between distinct market states (e.g., normal &ldquo;tranquil&rdquo; markets vs. high-volatility &ldquo;crisis&rdquo; markets).</li>
              <li><strong>True Stochastic Models:</strong> Introduce entirely independent mathematical randomness directly into the underlying dependency generator.</li>
            </ul>
          </div>
        </div>

        <SubHeading>Copula Functions &amp; Tail Dependence</SubHeading>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong className="text-slate-800">Sklar&apos;s Theorem:</strong> Copulas map the joint distribution of multiple variables while perfectly preserving their unique, individual marginal distributions.</li>
          <li><strong className="text-slate-800">Quantifying Extremes:</strong> They explicitly quantify <strong>tail dependence</strong> — the statistical probability of extreme joint movements occurring simultaneously.</li>
        </ul>

        <DataTable
          headers={["Copula Type", "Tail Characteristics & Applications"]}
          rows={[
            [
              "Gaussian",
              "Zero tail dependence. Dangerously over-optimistic for VaR and systemic crash modeling. It assumes that extreme joint events are virtually impossible.",
            ],
            [
              "Student-t",
              "Exhibits symmetric tail dependence driven by degrees of freedom. Treats massive joint crashes and massive joint rallies as equally probable outcomes.",
            ],
            [
              "Clayton",
              "Features strong lower tail dependence (and zero upper). It perfectly models equity portfolios, which tend to crash together violently but rarely rally together with the same coordinated intensity.",
            ],
            [
              "Gumbel",
              "Features strong upper tail dependence. Frequently applied to commodity markets where simultaneous physical supply shocks can cause multiple assets to spike concurrently.",
            ],
          ]}
        />
      </SectionCard>

      {/* Section 8: Synthesis */}
      <SectionCard icon={Activity} title="Synthesis: Evolution of Dependency" gradient="from-fuchsia-500 to-purple-600">
        <ul className="list-disc pl-5 space-y-4">
          <li><strong className="text-slate-800">Macroeconomic Transitions:</strong> The financial landscape has shifted from an environment where illiquidity carried a stable premium to one where liquidity itself is the market&apos;s scarcest asset. This catalyzes a profound evolution in correlation measurement.</li>
          <li>
            <strong className="text-slate-800">The Illiquidity Trap:</strong> Integrating deeply illiquid private credit alongside highly liquid equities creates severe structural risks for multi-asset managed accounts.
            <ul className="list-[circle] pl-6 mt-2 space-y-2 text-sm text-slate-500">
              <li>When liquid markets crash, capital cannot exit private structures.</li>
              <li>This forces immediate, cascading liquidations across the remaining liquid asset classes.</li>
              <li>This mechanical selling functionally drives realized correlation to a perfect 1.0.</li>
            </ul>
          </li>
        </ul>

        <div className="p-6 bg-fuchsia-50 border-l-4 border-fuchsia-500 mt-8 rounded-r-xl shadow-sm">
          <h4 className="font-bold text-fuchsia-900 text-lg mb-3">The Ultimate Conclusion</h4>
          <ul className="list-disc pl-5 space-y-2 text-slate-800 font-medium">
            <li>Correlation is undeniably the most mathematically complex and systemically consequential parameter in quantitative finance.</li>
            <li>Financial assets co-move nonlinearly and asymmetrically in reality.</li>
            <li>This paradigm has forced the permanent evolution of financial mathematics toward dynamic regime-switching models, tail-dependent copulas, and advanced algorithms.</li>
          </ul>
        </div>
      </SectionCard>

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <strong>Educational Disclaimer:</strong> This article is for informational and educational purposes only. It does not constitute investment advice, financial guidance, or a recommendation to buy or sell any security. All investments involve risk, including the possible loss of principal. Past performance is not indicative of future results.
      </div>
    </ArticleFrame>
  );
}
