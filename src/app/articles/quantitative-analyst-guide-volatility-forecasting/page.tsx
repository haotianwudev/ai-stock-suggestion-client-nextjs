'use client';

import React from 'react';
import { BrainCircuit, BarChartBig, AlertTriangle, Target } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

const Highlight = ({ children, color = 'sky' }: { children: React.ReactNode; color?: 'sky' | 'amber' | 'emerald' | 'rose' }) => {
  const colorClasses = {
    sky: 'bg-sky-100 text-sky-800',
    amber: 'bg-amber-100 text-amber-800',
    emerald: 'bg-emerald-100 text-emerald-800',
    rose: 'bg-rose-100 text-rose-800',
  };
  return <span className={`px-1.5 py-0.5 rounded-md font-medium ${colorClasses[color]}`}>{children}</span>;
};

const Section = ({ id, title, children, className }: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={`py-12 ${className || ''}`}>
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-8 font-serif">{title}</h2>
    <div className="prose prose-slate max-w-none lg:prose-lg prose-h3:font-semibold prose-h3:text-slate-800 dark:text-slate-200 prose-h4:font-medium prose-h4:text-slate-700 dark:text-slate-300 prose-a:text-sky-600 prose-a:font-medium hover:prose-a:text-sky-700 prose-strong:font-semibold prose-code:bg-slate-100 prose-code:rounded-md prose-code:px-1.5 prose-code:py-1 prose-code:font-mono prose-code:text-sm prose-blockquote:border-l-4 prose-blockquote:border-sky-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-600 dark:text-slate-400">
      {children}
    </div>
  </section>
);

const Math = ({ children, title }: { children: string; title?: string }) => (
  <div className="my-6 p-6 bg-slate-50 dark:bg-[#14171B] rounded-xl overflow-x-auto border border-slate-200 dark:border-slate-800">
    {title && <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">{title}</h4>}
    <code className="font-mono text-sm text-slate-800 dark:text-slate-200 whitespace-pre">{children}</code>
  </div>
);

const InfoBox = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="my-8 p-6 rounded-xl bg-sky-50 border border-sky-200">
    <h4 className="font-bold text-sky-800 mb-3 text-lg">{title}</h4>
    <div className="text-sky-700 text-base">{children}</div>
  </div>
);

export default function VolatilityForecastingGuide() {
  return (
    <ArticleFrame
      slug="quantitative-analyst-guide-volatility-forecasting"
      additionalDisclaimer="Model performance statistics referenced here are based on historical backtests and may not reflect future performance. Past performance does not guarantee future results."
    >
      <div className="max-w-4xl mx-auto px-4 text-gray-900">
        <InfographicSlot alt="Volatility Forecasting Guide Infographic" />

        <div className="space-y-16">
          <Section id="introduction" title="The Nature of Financial Volatility">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 my-8 rounded-2xl border border-amber-200">
              <h4 className="font-bold text-amber-800 text-xl mb-4 flex items-center">
                <BarChartBig className="w-6 h-6 mr-3" />
                The $2 Trillion Volatility Market
              </h4>
              <p className="text-amber-900 text-lg">
                Elite quant firms like Citadel Securities and Jane Street generate billions in revenue by accurately forecasting volatility just 1-2% better than competitors. This edge translates to massive profits in high-frequency options market making.
              </p>
            </div>

            <p className="text-lg leading-relaxed">
              Volatility is the cornerstone of financial risk management and derivatives pricing. Unlike price, which is observable, volatility is a <Highlight color="amber">latent statistical property</Highlight> that must be estimated from market data.
            </p>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4 font-serif">Key Statistical Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Volatility Clustering</h4>
                <p className="text-slate-600 dark:text-slate-400">High volatility periods are followed by more high volatility. This indicates <Highlight>autocorrelation</Highlight> in volatility.</p>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Mean Reversion</h4>
                <p className="text-slate-600 dark:text-slate-400">Volatility tends to revert to a long-run average. Extreme spikes are usually temporary.</p>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Fat Tails</h4>
                <p className="text-slate-600 dark:text-slate-400"><Highlight color="rose">Extreme events are more common</Highlight> than normal distributions predict.</p>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Leverage Effect</h4>
                <p className="text-slate-600 dark:text-slate-400">Volatility increases more from large price drops than equivalent price rises.</p>
              </div>
            </div>

            <InfoBox title="Realized vs. Implied Volatility">
              <p><Highlight color="sky">Realized Volatility (RV)</Highlight> is backward-looking, calculated from historical price data.</p>
              <p className="mt-2"><Highlight color="emerald">Implied Volatility (IV)</Highlight> is forward-looking, derived from option prices. The spread between RV forecasts and IV is a primary source of alpha.</p>
            </InfoBox>
          </Section>

          <Section id="econometrics" title="Econometric Foundations: The GARCH Family">
            <p className="text-lg leading-relaxed">
              The <Highlight>GARCH (Generalized Autoregressive Conditional Heteroskedasticity)</Highlight> model, introduced by Tim Bollerslev in 1986, was a paradigm shift that provides a formal econometric framework for modeling volatility clustering and other stylized facts of financial returns.
            </p>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4 font-serif">The GARCH(1,1) Model</h3>
            <p>The workhorse of the family is the GARCH(1,1) model, which defines the next period&apos;s conditional variance as a weighted average of three components:</p>

            <Math title="GARCH(1,1) Variance Equation">
              {"σ²ₜ = ω + α × ε²ₜ₋₁ + β × σ²ₜ₋₁\n\nWhere:\n• σ²ₜ = conditional variance at time t\n• ε²ₜ₋₁ = squared residual (shock) from previous period\n• ω = long-run average variance (unconditional variance)\n• α = ARCH parameter (reaction to shocks)\n• β = GARCH parameter (persistence of volatility)"}
            </Math>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2">ω (Omega)</h4>
                <p className="text-amber-700">Long-run average variance constant. Represents the baseline level of volatility when no shocks occur.</p>
              </div>
              <div className="bg-sky-50 p-6 rounded-xl border border-sky-200">
                <h4 className="font-semibold text-sky-800 mb-2">α (Alpha)</h4>
                <p className="text-sky-700">Reaction to market shocks (ARCH term). Measures how much yesterday&apos;s surprise affects today&apos;s volatility.</p>
              </div>
              <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-6 rounded-xl border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-2">β (Beta)</h4>
                <p className="text-[#1D8A70] dark:text-[#3CBF9C]">Volatility persistence (GARCH term). Captures how much yesterday&apos;s volatility carries over to today.</p>
              </div>
            </div>

            <InfoBox title="GARCH Parameter Interpretation">
              <p>The sum <Highlight>α + β</Highlight> measures the rate at which volatility shocks decay. A sum close to 1.0 indicates high persistence (shocks fade slowly), while values closer to 0 indicate rapid mean reversion. For most financial assets, α + β ≈ 0.95-0.99, indicating very high persistence.</p>
              <p className="mt-2">The unconditional variance is given by: <strong>σ² = ω / (1 - α - β)</strong></p>
            </InfoBox>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4 font-serif">Addressing the Leverage Effect</h3>
            <p>The standard GARCH model is symmetric&mdash;positive and negative shocks of the same magnitude have identical effects on volatility. To capture the leverage effect (negative shocks increase volatility more than positive shocks), asymmetric models were developed.</p>

            <h4 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-3">GJR-GARCH Model</h4>
            <p>The GJR-GARCH model (Glosten, Jagannathan, and Runkle, 1993) adds a leverage term:</p>

            <Math title="GJR-GARCH Variance Equation">
              {"σ²ₜ = ω + α × ε²ₜ₋₁ + γ × ε²ₜ₋₁ × Iₜ₋₁ + β × σ²ₜ₋₁\n\nWhere:\n• Iₜ₋₁ = 1 if εₜ₋₁ < 0 (negative shock), 0 otherwise\n• γ = leverage parameter (additional impact of negative shocks)\n• Total impact of negative shock = α + γ\n• Total impact of positive shock = α"}
            </Math>

            <p>The <Highlight color="rose">γ (gamma)</Highlight> parameter captures the leverage effect. When γ &gt; 0, negative shocks have a larger impact on volatility than positive shocks of the same magnitude.</p>

            <h4 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-3">EGARCH Model</h4>
            <p>The Exponential GARCH (EGARCH) model by Nelson (1991) models the logarithm of variance, ensuring non-negativity:</p>

            <Math title="EGARCH Variance Equation">
              {"ln(σ²ₜ) = ω + α × |εₜ₋₁/σₜ₋₁| + γ × (εₜ₋₁/σₜ₋₁) + β × ln(σ²ₜ₋₁)\n\nWhere:\n• The model is specified in log form\n• |εₜ₋₁/σₜ₋₁| captures the magnitude effect\n• (εₜ₋₁/σₜ₋₁) captures the sign effect (leverage)\n• Variance is always positive by construction"}
            </Math>
          </Section>

          <Section id="machine-learning" title="The Machine Learning Frontier">
            <p className="text-lg leading-relaxed">
              While GARCH provides interpretable, theory-driven frameworks with solid econometric foundations, its rigid parametric form can be a limitation. Machine learning models offer non-parametric, data-driven alternatives capable of capturing far more complex patterns and non-linear relationships in volatility dynamics.
            </p>

            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-8 my-8 rounded-2xl border border-emerald-200">
              <h4 className="font-bold text-emerald-800 text-xl mb-6 flex items-center">
                <BrainCircuit className="w-6 h-6 mr-3" />
                ML Model Performance Hierarchy
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-emerald-100 text-center">
                  <h5 className="font-semibold text-[#1D8A70] dark:text-[#3CBF9C] mb-2">Traditional Models</h5>
                  <p className="text-sm text-[#1D8A70] dark:text-[#3CBF9C]">GARCH, EGARCH, GJR-GARCH</p>
                  <p className="text-2xl font-bold text-emerald-800 mt-2">R² ≈ 0.15-0.25</p>
                  <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] mt-1">Fast, interpretable</p>
                </div>
                <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-blue-100 text-center">
                  <h5 className="font-semibold text-[#A8672E] dark:text-[#D08F52] mb-2">Ensemble Methods</h5>
                  <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">XGBoost, Random Forest, LightGBM</p>
                  <p className="text-2xl font-bold text-blue-800 mt-2">R² ≈ 0.30-0.45</p>
                  <p className="text-xs text-[#A8672E] dark:text-[#D08F52] mt-1">Non-linear interactions</p>
                </div>
                <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-purple-100 text-center">
                  <h5 className="font-semibold text-purple-700 mb-2">Deep Learning</h5>
                  <p className="text-sm text-purple-600">LSTM, GRU, Transformer</p>
                  <p className="text-2xl font-bold text-purple-800 mt-2">R² ≈ 0.35-0.55</p>
                  <p className="text-xs text-purple-600 mt-1">Sequential patterns</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4 font-serif">Feature Engineering: The Key to Success</h3>
            <p className="text-lg leading-relaxed mb-6">
              The success of ML models heavily depends on the quality of input features. Raw time series data is often augmented with carefully engineered features that capture different aspects of market behavior:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                  <BarChartBig className="w-5 h-5 mr-2 text-[#A8672E] dark:text-[#D08F52]" />
                  Technical Indicators
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• Moving averages of volatility (5, 10, 22, 66 days)</li>
                  <li>• Volatility ratios (short-term vs. long-term)</li>
                  <li>• Bollinger Band widths and positions</li>
                  <li>• RSI and momentum indicators</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-[#1D8A70] dark:text-[#3CBF9C]" />
                  Market Microstructure
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• Bid-ask spreads and their volatility</li>
                  <li>• Order book depth and imbalance</li>
                  <li>• Trade size distributions</li>
                  <li>• Intraday seasonality patterns</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                  <BrainCircuit className="w-5 h-5 mr-2 text-purple-600" />
                  Alternative Data
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• Social media sentiment scores</li>
                  <li>• News analytics and event detection</li>
                  <li>• Google Trends and search volume</li>
                  <li>• Satellite imagery for commodities</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-[#BC4128] dark:text-[#E2694A]" />
                  Macroeconomic Data
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• Interest rate changes and yield curves</li>
                  <li>• Economic policy uncertainty indices</li>
                  <li>• Central bank communication sentiment</li>
                  <li>• Cross-asset correlations</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4 font-serif">Popular Model Architectures</h3>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Tree-Based Ensembles</h4>
                <p className="text-[#A8672E] dark:text-[#D08F52] mb-3">XGBoost, LightGBM, and Random Forest excel at handling tabular data with mixed feature types. They automatically capture non-linear interactions and feature importance.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-1">Advantages</h5>
                    <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">Fast training, feature importance, handles missing data</p>
                  </div>
                  <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-1">Limitations</h5>
                    <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">Not inherently sequential, can overfit to noise</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-3 text-lg">Recurrent Neural Networks</h4>
                <p className="text-purple-700 mb-3">LSTMs and GRUs are specifically designed for sequence data. Their internal memory states make them powerful for modeling time dependencies and long memory effects, similar to GARCH&apos;s persistence mechanism.</p>

                <Math title="LSTM Cell Equations">
                  {"fₜ = σ(Wf · [hₜ₋₁, xₜ] + bf)    # Forget gate\niₜ = σ(Wi · [hₜ₋₁, xₜ] + bi)    # Input gate\nC̃ₜ = tanh(WC · [hₜ₋₁, xₜ] + bC) # Candidate values\nCₜ = fₜ * Cₜ₋₁ + iₜ * C̃ₜ        # Cell state\noₜ = σ(Wo · [hₜ₋₁, xₜ] + bo)    # Output gate\nhₜ = oₜ * tanh(Cₜ)              # Hidden state"}
                </Math>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-3 text-lg">Hybrid Models (GARCH + ML)</h4>
                <p className="text-[#1D8A70] dark:text-[#3CBF9C] mb-3">A powerful two-stage approach that combines the interpretability of GARCH with the flexibility of machine learning:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg">
                    <h5 className="font-medium text-emerald-800 mb-2">Stage 1: GARCH Modeling</h5>
                    <p className="text-sm text-[#1D8A70] dark:text-[#3CBF9C]">Fit GARCH model to capture basic volatility clustering and compute standardized residuals</p>
                  </div>
                  <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg">
                    <h5 className="font-medium text-emerald-800 mb-2">Stage 2: ML Enhancement</h5>
                    <p className="text-sm text-[#1D8A70] dark:text-[#3CBF9C]">Train ML model on standardized residuals to capture remaining non-linear patterns</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-3 text-lg">Transformer Networks</h4>
                <p className="text-[#BC4128] dark:text-[#E2694A] mb-3">Attention-based models that can capture long-range dependencies without the vanishing gradient problems of RNNs. Particularly effective for multi-asset volatility forecasting.</p>

                <Math title="Multi-Head Attention">
                  {"Attention(Q,K,V) = softmax(QK^T/√dk)V\n\nMultiHead(Q,K,V) = Concat(head₁,...,headₕ)W^O\nwhere headᵢ = Attention(QWᵢ^Q, KWᵢ^K, VWᵢ^V)\n\n• Q, K, V = Query, Key, Value matrices\n• dk = dimension of key vectors\n• h = number of attention heads"}
                </Math>
              </div>
            </div>

            <InfoBox title="Model Selection Considerations">
              <p><strong>For High-Frequency Trading:</strong> Tree-based models often perform best due to their speed and ability to handle mixed data types.</p>
              <p className="mt-2"><strong>For Medium-Term Forecasting:</strong> LSTMs and hybrid GARCH-ML models excel at capturing persistence and regime changes.</p>
              <p className="mt-2"><strong>For Multi-Asset Strategies:</strong> Transformer networks can model complex cross-asset dependencies and correlations.</p>
            </InfoBox>
          </Section>

          <Section id="deployment" title="Deployment in Algorithmic Trading">
            <p className="text-lg leading-relaxed">
              A volatility forecast is not an end in itself&mdash;it is a critical input for profit generation and risk control across multiple dimensions of quantitative trading operations.
            </p>

            <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-8 my-8 rounded-r-2xl shadow-sm">
              <h4 className="font-bold text-blue-800 text-xl mb-4 flex items-center">
                <Target className="w-6 h-6 mr-3" />
                Volatility Arbitrage Framework
              </h4>
              <div className="space-y-4 text-blue-900">
                <p><strong>Signal Generation:</strong> Compare forecasted realized volatility (RV) with implied volatility (IV) from options markets to identify mispricings.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Long Volatility Trade</h5>
                    <p className="text-sm">When RV forecast &gt; IV, buy straddles/strangles to profit from underpriced volatility</p>
                  </div>
                  <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Short Volatility Trade</h5>
                    <p className="text-sm">When RV forecast &lt; IV, sell straddles/strangles to capture overpriced volatility premium</p>
                  </div>
                </div>
                <p><strong>Delta Hedging:</strong> Continuously hedge directional exposure to isolate pure volatility P&amp;L and maintain market neutrality.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-6 font-serif">Key Applications in Trading</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Risk Management
                </h4>
                <p className="text-amber-700 mb-3">Forecasts directly feed into <Highlight color="amber">Value-at-Risk (VaR)</Highlight> and Expected Shortfall calculations.</p>
                <ul className="text-sm text-amber-600 space-y-1">
                  <li>• Portfolio risk budgeting</li>
                  <li>• Stress testing scenarios</li>
                  <li>• Capital allocation decisions</li>
                </ul>
              </div>
              <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-6 rounded-xl border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Position Sizing
                </h4>
                <p className="text-[#1D8A70] dark:text-[#3CBF9C] mb-3">Size positions inversely to expected volatility to target constant risk levels.</p>
                <ul className="text-sm text-[#1D8A70] dark:text-[#3CBF9C] space-y-1">
                  <li>• Kelly criterion optimization</li>
                  <li>• Risk parity strategies</li>
                  <li>• Dynamic leverage adjustment</li>
                </ul>
              </div>
              <div className="bg-sky-50 p-6 rounded-xl border border-sky-200">
                <h4 className="font-semibold text-sky-800 mb-3 flex items-center">
                  <BrainCircuit className="w-5 h-5 mr-2" />
                  Options Market Making
                </h4>
                <p className="text-sky-700 mb-3">Core input for pricing and hedging options across all strikes and expirations.</p>
                <ul className="text-sm text-sky-600 space-y-1">
                  <li>• Bid-ask spread optimization</li>
                  <li>• Inventory risk management</li>
                  <li>• Greeks hedging strategies</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border-l-4 border-[#BC4128] dark:border-[#E2694A] p-8 my-8 rounded-r-2xl">
              <h4 className="font-bold text-red-800 text-lg mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Model Risk in Live Trading
              </h4>
              <p className="text-red-900 mb-4">
                Volatility forecasting models can fail catastrophically during market stress. The 2020 COVID crash saw many vol models break down as correlations spiked to 1.0 and traditional relationships collapsed.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg">
                  <h5 className="font-medium text-red-800 mb-1">Risk Mitigation</h5>
                  <p className="text-sm text-[#BC4128] dark:text-[#E2694A]">Maintain adequate capital buffers, implement circuit breakers</p>
                </div>
                <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg">
                  <h5 className="font-medium text-red-800 mb-1">Model Monitoring</h5>
                  <p className="text-sm text-[#BC4128] dark:text-[#E2694A]">Real-time performance tracking, regime detection systems</p>
                </div>
              </div>
            </div>
          </Section>

          <Section id="landscape" title="The Quantitative Trading Landscape">
            <p className="text-lg leading-relaxed">
              High-level volatility forecasting is the domain of elite quantitative trading firms, where the ability to predict volatility even marginally better than competitors translates to massive profits.
            </p>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-6 font-serif">Firm Archetypes</h3>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3 text-lg flex items-center">
                  <BrainCircuit className="w-6 h-6 mr-3" />
                  Quantitative Hedge Funds
                </h4>
                <p className="text-[#A8672E] dark:text-[#D08F52] mb-4">Renaissance Technologies, D.E. Shaw, Two Sigma, AQR Capital Management</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-2">Strategy Focus</h5>
                    <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">Statistical arbitrage, multi-asset momentum, mean reversion strategies across longer time horizons (days to months)</p>
                  </div>
                  <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-2">Competitive Edge</h5>
                    <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">Proprietary datasets, advanced ML models, systematic risk management</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 text-lg flex items-center">
                  <Target className="w-6 h-6 mr-3" />
                  HFT Firms / Market Makers
                </h4>
                <p className="text-[#1D8A70] dark:text-[#3CBF9C] mb-4">Jane Street, Citadel Securities, Virtu Financial, Jump Trading</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg">
                    <h5 className="font-medium text-green-800 mb-2">Strategy Focus</h5>
                    <p className="text-sm text-[#1D8A70] dark:text-[#3CBF9C]">Options market making, ETF arbitrage, ultra-short-term volatility prediction (seconds to minutes)</p>
                  </div>
                  <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg">
                    <h5 className="font-medium text-green-800 mb-2">Competitive Edge</h5>
                    <p className="text-sm text-[#1D8A70] dark:text-[#3CBF9C]">Ultra-low latency infrastructure, co-location, microsecond-level forecasting models</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-3 text-lg flex items-center">
                  <BarChartBig className="w-6 h-6 mr-3" />
                  Volatility Specialists
                </h4>
                <p className="text-purple-700 mb-4">Susquehanna, IMC, Optiver, DRW Trading</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg">
                    <h5 className="font-medium text-purple-800 mb-2">Strategy Focus</h5>
                    <p className="text-sm text-purple-600">Pure volatility arbitrage, dispersion trading, volatility surface modeling</p>
                  </div>
                  <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg">
                    <h5 className="font-medium text-purple-800 mb-2">Competitive Edge</h5>
                    <p className="text-sm text-purple-600">Deep options expertise, sophisticated vol surface models, cross-asset volatility relationships</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-6 font-serif">The Competitive Landscape</h3>
            <p className="text-lg leading-relaxed mb-6">
              The competitive edge in volatility forecasting is a function of three key dimensions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-lg">Alpha (Signal)</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Proprietary models, alternative data, research edge</p>
                <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-3 rounded-lg">
                  <p className="text-sm text-[#A8672E] dark:text-[#D08F52]">1-2% improvement in volatility forecasting accuracy can generate hundreds of millions in additional revenue</p>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-lg">Execution (Speed)</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Ultra-low latency, co-location, hardware optimization</p>
                <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-3 rounded-lg">
                  <p className="text-sm text-[#1D8A70] dark:text-[#3CBF9C]">Microsecond advantages in execution can be worth millions in high-frequency volatility trading</p>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-lg">Cost (Efficiency)</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Transaction costs, slippage, operational efficiency</p>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="text-sm text-amber-700">Lower costs enable profitability on smaller volatility mispricings, expanding opportunity set</p>
                </div>
              </div>
            </div>

            <InfoBox title="Barriers to Entry">
              <p><strong>Capital Requirements:</strong> Top-tier volatility trading requires hundreds of millions in capital for market making and risk management.</p>
              <p className="mt-2"><strong>Talent:</strong> Competition for quantitative researchers with PhDs in physics, mathematics, and computer science is intense.</p>
              <p className="mt-2"><strong>Technology:</strong> Massive investment in computational infrastructure, data feeds, and low-latency systems.</p>
              <p className="mt-2"><strong>Regulatory:</strong> Complex compliance requirements and capital adequacy rules for market makers.</p>
            </InfoBox>
          </Section>

          <Section id="assumptions" title="Assumptions and Limitations">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-6 rounded-xl border border-rose-200">
                <h4 className="font-semibold text-rose-800 mb-2">Stationarity</h4>
                <p className="text-[#BC4128] dark:text-[#E2694A]">Markets are <Highlight color="rose">not truly stationary</Highlight>. Structure and behavior evolve, causing model decay.</p>
              </div>
              <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Independence</h4>
                <p className="text-[#A8672E] dark:text-[#D08F52]">Classical models assume independent shocks, but markets show complex dependencies.</p>
              </div>
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2">Overfitting</h4>
                <p className="text-amber-700">ML models can memorize noise. <Highlight>Rigorous backtesting</Highlight> is essential.</p>
              </div>
            </div>
          </Section>

          <Section id="black-swans" title="The Challenge of Black Swans">
            <p className="text-lg leading-relaxed">
              Black swans are events <Highlight>outside historical distributions</Highlight>. Models trained on past data cannot predict them by definition.
            </p>

            <InfoBox title="2008 Crisis: Model Failure">
              VaR models based on normal distributions failed because they assigned near-zero probability to extreme moves that occurred. The models provided false security.
            </InfoBox>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4 font-serif">Building Robust Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Avoid Leverage</h4>
                <p className="text-slate-600 dark:text-slate-400">Excessive leverage amplifies tail risks</p>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Stress Testing</h4>
                <p className="text-slate-600 dark:text-slate-400">Test under extreme scenarios</p>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Tail Hedging</h4>
                <p className="text-slate-600 dark:text-slate-400">Buy OTM options as insurance</p>
              </div>
            </div>
          </Section>

          <Section id="conclusion" title="Conclusion">
            <p className="text-lg leading-relaxed">
              The pursuit of accurately forecasting volatility is a relentless arms race that began with the elegant, interpretable GARCH models and has evolved to embrace the complex, predictive power of machine learning. While these tools are indispensable for modern finance, their effectiveness is bounded by fundamental limitations and the ever-present risk of regime shifts and black swan events.
            </p>

            <p className="text-lg leading-relaxed mt-6">
              The most successful quantitative firms combine cutting-edge modeling with profound respect for risk and deep understanding of the market&apos;s non-stationary and unpredictable nature. They recognize that volatility forecasting is not just a technical challenge, but a continuous adaptation to evolving market structures, participant behavior, and global economic conditions.
            </p>
          </Section>

          <Section id="deep-research" title="Deep Research: Academic Foundations & Market Microstructure">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-6 font-serif">Stochastic Volatility Models</h3>
            <p className="text-lg leading-relaxed mb-6">
              Beyond GARCH, academic literature has developed sophisticated stochastic volatility (SV) models that treat volatility as a latent variable following its own stochastic process. The Heston model (1993) remains the gold standard for option pricing:
            </p>

            <Math title="Heston Stochastic Volatility Model">
              {"Asset Price Process:\ndSₜ = μSₜdt + √vₜSₜdW₁ₜ\n\nVolatility Process:\ndvₜ = κ(θ - vₜ)dt + σᵥ√vₜdW₂ₜ\n\nCorrelation:\ndW₁ₜdW₂ₜ = ρdt\n\nWhere:\n• κ = mean reversion speed of volatility\n• θ = long-run variance level\n• σᵥ = volatility of volatility (vol-of-vol)\n• ρ = correlation between price and volatility innovations\n• vₜ = instantaneous variance at time t"}
            </Math>

            <p>The Heston model captures several key features: mean-reverting volatility, stochastic volatility, and the leverage effect through the correlation parameter ρ (typically negative, around -0.7 for equity indices).</p>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-6 font-serif">Market Microstructure Theory</h3>
            <p className="text-lg leading-relaxed mb-6">
              High-frequency volatility forecasting must account for market microstructure effects. The seminal work provides the theoretical foundation for understanding how market structure affects volatility:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Bid-Ask Bounce Effect</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-3">Price movements between bid and ask create artificial volatility that must be filtered out.</p>
                <Math title="Roll (1984) Estimator">
                  {"σ²ₜᵣᵘᵉ = σ²ₒᵦˢᵉʳᵛᵉᵈ - 2s²\n\nWhere s = effective bid-ask spread"}
                </Math>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Information Asymmetry</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-3">Kyle&apos;s (1985) lambda measures price impact of informed trading.</p>
                <Math title="Kyle's Lambda">
                  {"λ = (σᵤ/σᵥ) × √(σᵤ/σₑ)\n\nPrice Impact = λ × Order Size"}
                </Math>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-6 font-serif">Empirical Evidence: Model Performance</h3>
            <div className="overflow-x-auto my-8">
              <table className="min-w-full bg-white dark:bg-[#0A0D14] border border-gray-300 rounded-xl shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Model Class</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">1-Day R²</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">5-Day R²</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Key Advantage</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Computational Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">GARCH(1,1)</td>
                    <td className="px-6 py-4 text-sm text-gray-700">0.15-0.25</td>
                    <td className="px-6 py-4 text-sm text-gray-700">0.08-0.15</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Interpretability, Speed</td>
                    <td className="px-6 py-4 text-sm text-[#1D8A70] dark:text-[#3CBF9C]">Very Low</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">HAR-RV</td>
                    <td className="px-6 py-4 text-sm text-gray-700">0.25-0.35</td>
                    <td className="px-6 py-4 text-sm text-gray-700">0.20-0.30</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Long Memory Capture</td>
                    <td className="px-6 py-4 text-sm text-[#1D8A70] dark:text-[#3CBF9C]">Low</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">LSTM Networks</td>
                    <td className="px-6 py-4 text-sm text-gray-700">0.30-0.45</td>
                    <td className="px-6 py-4 text-sm text-gray-700">0.25-0.40</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Non-linear Patterns</td>
                    <td className="px-6 py-4 text-sm text-amber-600">High</td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Ensemble Methods</td>
                    <td className="px-6 py-4 text-sm text-gray-700">0.35-0.50</td>
                    <td className="px-6 py-4 text-sm text-gray-700">0.30-0.45</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Robustness</td>
                    <td className="px-6 py-4 text-sm text-amber-600">Medium</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Transformer + Alt Data</td>
                    <td className="px-6 py-4 text-sm text-gray-700">0.40-0.60</td>
                    <td className="px-6 py-4 text-sm text-gray-700">0.35-0.55</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Multi-modal Learning</td>
                    <td className="px-6 py-4 text-sm text-[#BC4128] dark:text-[#E2694A]">Very High</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-600 mt-4 italic">
              Source: Meta-analysis of volatility forecasting literature (Hansen &amp; Lunde, 2005; Poon &amp; Granger, 2003; Andersen et al., 2006; Recent ML studies 2020-2024)
            </p>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-6 font-serif">Behavioral Finance Perspectives</h3>
            <p className="text-lg leading-relaxed mb-6">
              Traditional models assume rational expectations, but behavioral finance research reveals systematic biases in volatility expectations that create predictable patterns:
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">Volatility Clustering Bias</h4>
                <p className="text-[#A8672E] dark:text-[#D08F52]">Barberis et al. (1998) show that investors overweight recent volatility when forming expectations, creating momentum in implied volatility that can be exploited by sophisticated forecasting models.</p>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-3">Disaster Myopia</h4>
                <p className="text-amber-700">Gennaioli et al. (2012) demonstrate that investors systematically underestimate tail risks during calm periods, leading to volatility risk premiums that vary predictably with market conditions.</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3">Attention Effects</h4>
                <p className="text-[#1D8A70] dark:text-[#3CBF9C]">Barber and Odean (2008) show that retail investor attention drives volatility patterns, particularly around earnings announcements and news events, creating predictable spikes in realized volatility.</p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-6 font-serif">Regime-Switching Models</h3>
            <p className="text-lg leading-relaxed mb-6">
              Hamilton&apos;s (1989) regime-switching framework addresses non-stationarity by allowing parameters to switch between different market states. The Markov Regime-Switching GARCH model captures structural breaks:
            </p>

            <Math title="Regime-Switching GARCH">
              {"State-Dependent Variance:\nσ²ₜ = ωₛₜ + αₛₜ × ε²ₜ₋₁ + βₛₜ × σ²ₜ₋₁\n\nTransition Probabilities:\nP(sₜ = j | sₜ₋₁ = i) = pᵢⱼ\n\nWhere:\n• sₜ ∈ {1, 2, ..., k} represents regime state\n• Each regime has different parameters (ω, α, β)\n• Transition matrix P governs regime switches\n• Common specification: k = 2 (low vol, high vol)"}
            </Math>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-6 font-serif">Future Research Directions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Alternative Data Integration</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <li>• Satellite imagery for commodity volatility</li>
                  <li>• Social media sentiment analysis</li>
                  <li>• Corporate earnings call transcripts</li>
                  <li>• High-frequency news analytics</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Quantum Computing Applications</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <li>• Quantum algorithms for portfolio optimization</li>
                  <li>• Quantum Monte Carlo for option pricing</li>
                  <li>• Quantum machine learning for pattern recognition</li>
                  <li>• Quantum annealing for combinatorial problems</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Climate Risk Modeling</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <li>• Physical climate risk integration</li>
                  <li>• Transition risk volatility modeling</li>
                  <li>• ESG factor impact on volatility</li>
                  <li>• Carbon price volatility forecasting</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">Cryptocurrency Volatility</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <li>• DeFi protocol risk modeling</li>
                  <li>• Cross-chain volatility spillovers</li>
                  <li>• Regulatory impact on crypto volatility</li>
                  <li>• Stablecoin depeg risk modeling</li>
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </ArticleFrame>
  );
}
