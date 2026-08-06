'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';
import { 
  TrendingUp, 
  BarChart2, 
  Cpu, 
  Activity, 
  AlertTriangle, 
  ShoppingCart, 
  ShieldCheck,
  BookOpen,
  CheckCircle,
  Zap
} from 'lucide-react';

const SectionHeading = ({ title, icon: Icon, gradient }: { title: string; icon: React.ElementType; gradient: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
      <Icon size={28} />
    </div>
    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
      {title}
    </h2>
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const KeyTakeaway = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 flex gap-4 items-start">
    <Zap className="text-amber-500 shrink-0 mt-1" size={24} />
    <div className="text-amber-900 font-medium leading-relaxed">
      <span className="font-bold text-amber-700 block mb-1">Key Takeaway</span>
      {children}
    </div>
  </div>
);

const EvolutionSection = () => (
  <section className="py-12 relative">
    <InfographicSlot src="https://i.imgur.com/UYlEArc.png" alt="Quantitative Trading Mean Reversion Infographic" />
    <Card className="mt-8">
      <SectionHeading 
        title="1. Evolution of Statistical Arbitrage" 
        icon={TrendingUp} 
        gradient="from-blue-500 to-cyan-500" 
      />
      <div className="prose prose-lg text-slate-600 max-w-none">
        <p className="mb-4">
          Statistical arbitrage (stat arb) is a heavily quantitative framework that exploits temporary pricing inefficiencies across diversified portfolios. Originating in the 1980s with pairs trading, it relies on isolating idiosyncratic components of asset returns by neutralizing market and factor risks.
        </p>
        <p className="mb-4">
          Once isolated, these residual prices often exhibit <strong>mean-reverting characteristics</strong>&mdash;drifting away from, and eventually returning to, a long-term historical equilibrium.
        </p>
        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
              <BookOpen size={20} className="text-blue-500"/> The Past: Distance Metrics
            </h4>
            <p className="text-sm">Early strategies relied on simple squared Euclidean distances between historical prices (e.g., Gatev et al., 2006). These generated huge early returns but suffered severe alpha decay as markets became efficient, culminating in the 2007 &quot;quant quake.&quot;</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
              <Cpu size={20} className="text-blue-500"/> The Present: Advanced Models
            </h4>
            <p className="text-sm">Modern stat arb relies on highly sophisticated, multi-asset factor models utilizing deep learning architectures, strict transaction cost constraints, and rigorous validation to prevent overfitting.</p>
          </div>
        </div>
      </div>
    </Card>
  </section>
);

const FactorsSection = () => (
  <section className="py-12 relative">
    <Card>
      <SectionHeading 
        title="2. Major Factors in Quant Trading" 
        icon={BarChart2} 
        gradient="from-emerald-500 to-teal-500" 
      />
      <div className="prose prose-lg text-slate-600 max-w-none mb-8">
        <p>
          Factor investing targets quantifiable traits that explain cross-sectional variation in expected returns, shifting away from discretionary stock picking. It evolved from the single-factor CAPM (Market Risk) to the Fama-French Three-Factor and eventually Five-Factor models.
        </p>
        
        <div className="my-6">
          <MathBlock math="R_{i,t} - R_{f,t} = \alpha_i + \beta_1(R_{m,t} - R_{f,t}) + \beta_2(SMB) + \beta_3(HML) + \beta_4(RMW) + \beta_5(CMA) + \varepsilon_{i,t}" />
          <div className="text-center text-sm text-slate-500 mt-2 font-medium">The Fama-French Five-Factor Time-Series Regression Equation</div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-emerald-50 border-b border-emerald-100">
              <th className="p-4 font-bold text-emerald-900">Factor</th>
              <th className="p-4 font-bold text-emerald-900">Acronym</th>
              <th className="p-4 font-bold text-emerald-900">Economic Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm md:text-base">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-semibold text-slate-800">Market Risk</td>
              <td className="p-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-md font-mono text-xs">Rm - Rf</span></td>
              <td className="p-4 text-slate-600">Baseline compensation for bearing general equity market risk.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-semibold text-slate-800">Size</td>
              <td className="p-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-md font-mono text-xs">SMB</span></td>
              <td className="p-4 text-slate-600">Small Minus Big. Smaller firms are less liquid and carry higher distress risk, demanding a premium.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-semibold text-slate-800">Value</td>
              <td className="p-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-md font-mono text-xs">HML</span></td>
              <td className="p-4 text-slate-600">High Minus Low. Undervalued companies correct upward due to mean reversion in sentiment.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-semibold text-slate-800">Profitability</td>
              <td className="p-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-md font-mono text-xs">RMW</span></td>
              <td className="p-4 text-slate-600">Robust Minus Weak. Highly profitable firms with stable earnings are less susceptible to shocks.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-semibold text-slate-800">Investment</td>
              <td className="p-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-md font-mono text-xs">CMA</span></td>
              <td className="p-4 text-slate-600">Conservative Minus Aggressive. Firms that overinvest tend to misallocate capital.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <KeyTakeaway>
        Beyond Fama-French, modern funds heavily blend <strong>Momentum</strong> (winning assets keep winning, acting as a counterbalance to mean reversion) and <strong>Low Volatility / Quality</strong> factors to maximize risk-adjusted returns across shifting economic regimes.
      </KeyTakeaway>
    </Card>
  </section>
);

const AdvancedModelingSection = () => (
  <section className="py-12 relative">
    <Card>
      <SectionHeading 
        title="3. Advanced Extraction Models" 
        icon={Cpu} 
        gradient="from-violet-500 to-fuchsia-500" 
      />
      <div className="prose prose-lg text-slate-600 max-w-none mb-6">
        <p>
          Traditional extraction uses static PCA, decomposing returns into systematic and idiosyncratic (residual) components. The residual portfolio holds zero beta to the selected risks, insulating it from macro shocks and making it mean-reverting. However, static loadings contradict dynamic corporate reality.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-violet-100 bg-violet-50/30 rounded-3xl p-6">
          <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-4">
            <Activity size={24} />
          </div>
          <h3 className="text-xl font-bold text-violet-900 mb-2">IPCA (Instrumented PCA)</h3>
          <p className="text-sm text-slate-600">
            Introduces observable firm characteristics as instrumental variables to estimate <em>time-varying</em> factor loadings. It successfully maps characteristics to either risk factor exposures (beta) or anomaly intercepts (alpha).
          </p>
        </div>
        
        <div className="border border-fuchsia-100 bg-fuchsia-50/30 rounded-3xl p-6">
          <div className="w-12 h-12 bg-fuchsia-100 rounded-xl flex items-center justify-center text-fuchsia-600 mb-4">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold text-fuchsia-900 mb-2">Deep Learning &amp; Attention</h3>
          <p className="text-sm text-slate-600">
            Bypasses the traditional two-step process. Attention Factor Models use CNNs and transformers to jointly learn tradable factors and portfolio policies in a single step, explicitly maximizing out-of-sample Sharpe ratios after transaction costs.
          </p>
        </div>
      </div>
    </Card>
  </section>
);

const OrnsteinUhlenbeckSection = () => (
  <section className="py-12 relative">
    <Card>
      <SectionHeading 
        title="4. The Ornstein-Uhlenbeck Framework" 
        icon={Activity} 
        gradient="from-rose-500 to-pink-500" 
      />
      <div className="prose prose-lg text-slate-600 max-w-none">
        <p>
          To systematically trade the extracted factor-neutral residual, quants model the cumulative residual as an <strong>Ornstein-Uhlenbeck (OU) process</strong>. It balances a deterministic drift pulling toward a mean, and a continuous random shock preventing permanent equilibrium.
        </p>

        <div className="my-6">
          <MathBlock math="dX_t = \kappa(\mu - X_t)dt + \sigma dW_t" />
          <div className="text-center text-sm text-slate-500 mt-2 font-medium">Continuous-Time Stochastic Differential Equation (SDE)</div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 my-6">
          <h4 className="font-bold text-slate-800 mb-4">The s-score (Avellaneda-Lee Framework)</h4>
          <p className="text-sm text-slate-600 mb-4">
            Standardizes trading signals across assets by measuring the distance of the residual from its equilibrium mean, scaled by standard deviation.
          </p>
          <div className="bg-white border border-rose-100 rounded-xl p-4 shadow-sm overflow-x-auto text-rose-700">
            <MathBlock math="s_{mod,i} = \frac{X_{i,t} - \mu_i}{\sigma_{eq,i}} - \frac{\alpha_i}{\kappa_i\sigma_{eq,i}}" />
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-500"/> <strong>Entry:</strong> Open trade when |s-score| &gt; 1.25.</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-rose-500"/> <strong>Exit:</strong> Close short at 0.75; Close long at -0.50.</li>
          </ul>
        </div>
      </div>
    </Card>
  </section>
);

const BiasesSection = () => (
  <section className="py-12 relative">
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50/20 border-amber-100">
      <SectionHeading 
        title="5. The Marriott-Pope Effect" 
        icon={AlertTriangle} 
        gradient="from-amber-500 to-orange-500" 
      />
      <div className="prose prose-lg text-slate-700 max-w-none">
        <p>
          Empirical estimation of the mean-reversion speed via Ordinary Least Squares (OLS) in finite samples has a severe flaw. The OLS estimate of the autoregressive coefficient is <strong>inherently biased downward</strong>.
        </p>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-amber-200 my-4 text-amber-900 font-medium">
          Because the coefficient is depressed, the calculated mean-reversion speed is biased upwards. The model &quot;hallucinates&quot; that the residual will revert much faster than it actually will.
        </div>
        <p>
          This causes algorithms to falsely categorize slow-reverting assets as highly profitable fast opportunities, triggering premature time-stop exits and resulting in devastating realized losses. Advanced practitioners use non-linear corrections or bootstrap methods to debias estimators.
        </p>
      </div>
    </Card>
  </section>
);

const ExecutionSection = () => (
  <section className="py-12 relative">
    <Card>
      <SectionHeading 
        title="6. Execution Dynamics" 
        icon={ShoppingCart} 
        gradient="from-cyan-500 to-blue-500" 
      />
      <div className="prose prose-lg text-slate-600 max-w-none">
        <p>
          Mean-reversion alpha is fragile. Transaction costs&mdash;slippage and market impact&mdash;can easily destroy a profitable backtest. When an algorithm executes a large order, it consumes liquidity and moves the price against itself.
        </p>
        
        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">The Square-Root Law of Market Impact</h3>
        <p>
          Slippage is proportional to the asset&apos;s volatility and the square root of the normalized order size.
        </p>
        <div className="my-6">
          <MathBlock math="\Delta p = Y \cdot \sigma \cdot \sqrt{\frac{Q}{V}}" />
          <div className="text-center text-sm text-slate-500 mt-2 font-medium">Where Q = Total order quantity, V = Average daily volume</div>
        </div>
        <KeyTakeaway>
          The concave nature of the square-root function acts as a strict capacity ceiling. Scaling AUM exponentially increases execution costs, degrading net alpha. Algorithms must balance temporary impact (immediate liquidity costs) against timing risk (mispricing correcting before order completion).
        </KeyTakeaway>
      </div>
    </Card>
  </section>
);

const ResearchSection = () => (
  <section className="py-12 relative">
    <Card>
      <SectionHeading 
        title="7. Rigorous Research Practices" 
        icon={ShieldCheck} 
        gradient="from-fuchsia-500 to-pink-600" 
      />
      <div className="prose prose-lg text-slate-600 max-w-none">
        <p className="lead text-xl text-slate-500 mb-8">
          The most pervasive failure point in quantitative finance is backtest overfitting&mdash;fine-tuning parameters to historical noise.
        </p>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="mt-1"><div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">1</div></div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Winsorization &amp; Outliers</h4>
              <p className="text-sm text-slate-600 mt-1">Returns have fat tails. Winsorization mitigates outliers by capping them at specific percentiles (e.g., 5th and 95th) rather than deleting them, preserving time-series continuity while dampening black-swan distortions.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1"><div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">2</div></div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Combinatorial Purged Cross-Validation (CPCV)</h4>
              <p className="text-sm text-slate-600 mt-1">Standard cross-validation leaks future information in financial time series. CPCV fixes this via <strong>Purging</strong> (removing overlapping training data) and <strong>Embargoing</strong> (implementing a dead-zone after test sets) to generate true out-of-sample distributions.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1"><div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">3</div></div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Deflated Sharpe Ratio (DSR)</h4>
              <p className="text-sm text-slate-600 mt-1">Corrects the traditional Sharpe Ratio for non-normality (skewness/kurtosis) and selection bias (multiple testing). If a strategy&apos;s DSR falls below a 95% threshold, it is rejected as a statistical illusion.</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </section>
);

export default function ArticlePage() {
  return (
    <ArticleFrame slug="quantitative-trading-mean-reversion-factor-models-execution-dynamics">
      <EvolutionSection />
      <FactorsSection />
      <AdvancedModelingSection />
      <OrnsteinUhlenbeckSection />
      <BiasesSection />
      <ExecutionSection />
      <ResearchSection />

      {/* Conclusion */}
      <section className="py-12">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 text-indigo-800 opacity-30">
            <Activity size={200} />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">The Pinnacle of Alpha Generation</h2>
            <p className="text-lg leading-relaxed text-indigo-200 mb-4">
              Elite quantitative practitioners must navigate advanced econometrics, transaction constraints, and the gauntlet of overfitting prevention to extract true market-neutral alpha.
            </p>
            <p className="text-base text-slate-400">
              Based on academic research and institutional quantitative frameworks.
            </p>
          </div>
        </div>
      </section>
    </ArticleFrame>
  );
}
