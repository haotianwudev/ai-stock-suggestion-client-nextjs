'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { MathBlock, InlineMath } from '@/components/articles/math';
import { 
  TrendingUp, 
  BarChart2, 
  Activity, 
  Target, 
  Layers, 
  DollarSign, 
  Shield, 
  Cpu, 
  ArrowRight,
  Database,
  Filter,
  RefreshCw,
  LineChart,
  Grid
} from 'lucide-react';

export default function LongShortEquityArticle() {
  return (
    <ArticleFrame slug="quantitative-foundations-long-short-equity-portfolios">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 font-sans bg-transparent">
        <InfographicSlot alt="Long-Short Equity Portfolio Infographic" />

        <section className="mb-12">
          <h2 id="essence" className="text-3xl font-extrabold text-slate-900 mb-6 mt-12 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-sm">
              <Target size={24} className="text-white" />
            </div>
            The Essence: Why Long-Short?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Overcoming structural constraints to capture pure alpha across the entire market cross-section.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">The Long-Only Penalty</h3>
              <p className="text-lg text-slate-700 mb-4">
                Traditional long-only portfolios are mathematically constrained. An active manager cannot underweight a stock by a magnitude greater than its benchmark weight. This creates <strong>&ldquo;unimplementable shorts,&rdquo;</strong> forcing managers to abandon their best negative conviction ideas simply because they are restricted from short selling.
              </p>
              <p className="text-lg text-slate-700">
                By relaxing the long-only constraint, quantitative analysts can construct portfolios that perfectly reflect their proprietary alpha signals, capturing market dislocations on both the long (undervalued) and short (overvalued) sides.
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Fundamental Law of Active Management</h4>
              <p className="text-slate-700 mb-6">
                Portfolio efficiency (Information Ratio) is a function of forecasting skill (IC), breadth of bets (BR), and the ability to implement them (TC).
              </p>
              
              <MathBlock math="IR = TC \times IC \times \sqrt{BR}" />
              
              <div className="mt-8 bg-white p-4 rounded-xl border border-slate-100 flex gap-4 items-start shadow-sm">
                <div className="bg-rose-100 text-rose-700 p-2 rounded-lg font-bold shrink-0">TC</div>
                <div>
                  <h5 className="font-semibold text-slate-900">Transfer Coefficient Penalty</h5>
                  <p className="text-sm text-slate-600">In a long-only fund, TC plummets to 0.3-0.5 due to shorting constraints. In long-short, it approaches 1.0.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="structures" className="text-3xl font-extrabold text-slate-900 mb-6 mt-16 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-sm">
              <Layers size={24} className="text-white" />
            </div>
            Structural Paradigms
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Calibrating net market exposure and gross leverage based on specific risk mandates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-teal-500 mb-6 flex items-center justify-center">
                <Activity size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Equity Market-Neutral</h3>
              <p className="text-slate-700">
                Engineered for absolute returns uncorrelated with the broader market. Targets a net exposure of 0% and a beta of 0.0. Relies entirely on the relative performance spread between long and short baskets (idiosyncratic risk or pure alpha). Highly capital-intensive, often requiring 200%-300% gross leverage.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 mb-6 flex items-center justify-center">
                <TrendingUp size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Active Extension (130/30)</h3>
              <p className="text-slate-700">
                Bridges the gap between long-only and absolute return. Starts 100% long, borrows/shorts 30%, and reinvests in 30% more longs. Maintains 100% net exposure (beta of 1.0) but increases gross exposure to 160%. Recaptures up to 90% of theoretical unconstrained alpha without losing the equity risk premium.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-900 text-white flex items-center gap-3">
              <BarChart2 size={20} className="text-emerald-400" />
              <h3 className="text-lg font-bold">Quantitative vs Discretionary Funds</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm uppercase">
                    <th className="p-4 font-semibold border-b">Metric</th>
                    <th className="p-4 font-semibold border-b">Quant Hedge Funds</th>
                    <th className="p-4 font-semibold border-b">Discretionary Funds</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 font-medium">Annualized Return</td>
                    <td className="p-4 text-emerald-600 font-semibold">8.0% - 12.0%</td>
                    <td className="p-4">7.0% - 15.0%</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Sharpe Ratio</td>
                    <td className="p-4 text-emerald-600 font-semibold">0.8 - 1.5</td>
                    <td className="p-4">0.5 - 1.2</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Maximum Drawdown</td>
                    <td className="p-4 text-emerald-600 font-semibold">10.0% - 20.0%</td>
                    <td className="p-4 text-rose-500">15.0% - 40.0%</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Correlation to S&P 500</td>
                    <td className="p-4 text-emerald-600 font-semibold">0.2 - 0.5</td>
                    <td className="p-4">0.4 - 0.7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="mechanics" className="text-3xl font-extrabold text-slate-900 mb-6 mt-16 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-sm">
              <DollarSign size={24} className="text-white" />
            </div>
            Mechanics of Short Selling
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            The operational realities and economic frictions of the prime brokerage lending market.
          </p>

          <div className="flex flex-col lg:flex-row gap-12 mb-12">
            <div className="lg:w-1/2 space-y-6">
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 shadow-sm">
                <h4 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <Shield size={20} className="text-amber-600" /> The Short Rebate
                </h4>
                <p className="text-amber-800 mb-4">
                  When borrowing stock, funds post cash collateral. The lender pays interest on this collateral back to the fund. This cash flow is the &ldquo;short rebate,&rdquo; a critical driver of strategy economics.
                </p>
                <MathBlock math="\text{Rebate} = \text{Benchmark Rate} - \text{Borrow Spread} - \text{Div Yield}" />
              </div>
              
              <p className="text-slate-700 text-lg">
                <strong>Interest Rate Sensitivity:</strong> In a ZIRP (Zero Interest Rate Policy) environment, short rebates are often negative, acting as a persistent performance drag. In a high-interest-rate regime, the rebate becomes a significant source of passive yield, structurally enhancing baseline performance.
              </p>
            </div>
            
            <div className="lg:w-1/2 bg-slate-900 rounded-2xl p-8 text-slate-300 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Frictional Costs</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-orange-400 font-bold flex items-center justify-center shrink-0">1</div>
                  <div>
                    <strong className="block text-white mb-1">Borrow Spreads</strong>
                    Liquid large-caps cost ~0.25% annually. &ldquo;Hard-to-borrow&rdquo; small-caps or highly shorted stocks can exceed 75% annualized.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-orange-400 font-bold flex items-center justify-center shrink-0">2</div>
                  <div>
                    <strong className="block text-white mb-1">Dividend Replacement</strong>
                    Short sellers must legally pass any dividends issued directly back to the original lender, draining portfolio cash.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-orange-400 font-bold flex items-center justify-center shrink-0">3</div>
                  <div>
                    <strong className="block text-white mb-1">Margin Collateral</strong>
                    Capital must be tied up to guarantee the return of borrowed assets, reducing overall capital efficiency.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="factors" className="text-3xl font-extrabold text-slate-900 mb-6 mt-16 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-xl shadow-sm">
              <Grid size={24} className="text-white" />
            </div>
            Factor Models & Risk Attribution
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Decomposing risk and return into lower-dimensional, statistically robust factor spaces.
          </p>

          <div className="mb-12">
            <p className="text-lg text-slate-700 mb-6">
              Grounded in Arbitrage Pricing Theory (APT), quantitative hedge funds don&apos;t forecast idiosyncratic returns from the bottom up. Instead, they project returns into systemic risk drivers.
            </p>
            <MathBlock math="R_i = \alpha_i + \sum \beta_{ij} f_j + \varepsilon_i" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-6">Standard Industry Factors (Barra Model)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { name: "Value (BTOP)", desc: "Book-to-price ratio; exploits reversion of undervalued assets relative to fundamentals." },
              { name: "Momentum", desc: "525-day weighted return (excluding last 21 days); captures investor underreaction." },
              { name: "Size", desc: "Natural log of market cap; models liquidity and distress risk of smaller firms." },
              { name: "Quality", desc: "ROE stability and earnings quality; targets highly profitable, low-accrual firms." },
              { name: "Residual Volatility", desc: "Volatility orthogonalized to market beta; exploits the low-volatility anomaly." },
              { name: "Sentiment", desc: "Analyst rating changes and institutional fund flows." }
            ].map((factor, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="text-lg font-bold text-violet-700 mb-2">{factor.name}</h4>
                <p className="text-slate-700 text-sm">{factor.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 id="workflow" className="text-3xl font-extrabold text-slate-900 mb-6 mt-16 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-rose-400 to-red-600 rounded-xl shadow-sm">
              <Cpu size={24} className="text-white" />
            </div>
            The Quant Research Workflow
          </h2>
          <p className="text-xl text-slate-600 mb-12">
            A rigorous, multi-stage econometric pipeline to prevent data mining and look-ahead bias.
          </p>

          <div className="space-y-12 mb-12 relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block"></div>
            
            <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
              <div className="w-16 h-16 rounded-full bg-rose-500 text-white font-bold text-xl flex items-center justify-center shrink-0 border-4 border-white shadow-sm">1</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Universe & Data</h3>
                <p className="text-slate-700 mb-3">Filter out illiquid micro-caps to prevent slippage. Ingest point-in-time fundamental and alternative data, ensuring timestamps perfectly align with public availability to prevent look-ahead bias.</p>
                <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-sm text-slate-600">
                  <Database size={16} className="text-rose-500" /> JSON SEC filings, OHLCV, NLP sentiment
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
              <div className="w-16 h-16 rounded-full bg-rose-500 text-white font-bold text-xl flex items-center justify-center shrink-0 border-4 border-white shadow-sm">2</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Feature Construction</h3>
                <p className="text-slate-700 mb-3">Engineer specific quantitative characteristics. Apply cross-sectional standardization (Z-scoring) and treat fat-tailed outliers via winsorization (3σ) or Median Absolute Deviation (MAD).</p>
                <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-sm text-slate-600">
                  <Filter size={16} className="text-rose-500" /> Z-Score Mapping, MAD Winsorization
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
              <div className="w-16 h-16 rounded-full bg-rose-500 text-white font-bold text-xl flex items-center justify-center shrink-0 border-4 border-white shadow-sm">3</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Factor Neutralization</h3>
                <p className="text-slate-700 mb-3">Prevent unintentional sector/size biases. Run cross-sectional regressions of raw signals against GICS industry and Size factors. The residuals become the pure, neutralized alpha scores.</p>
                <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-sm text-slate-600">
                  <RefreshCw size={16} className="text-rose-500" /> Orthogonalization via Regression Residuals
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
              <div className="w-16 h-16 rounded-full bg-rose-500 text-white font-bold text-xl flex items-center justify-center shrink-0 border-4 border-white shadow-sm">4</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">IC/IR Evaluation</h3>
                <p className="text-slate-700 mb-3">Evaluate the Spearman Rank Information Coefficient (IC). A Mean Rank IC &gt; 0.05 is highly robust. Calculate the Information Ratio (IR = Mean IC / StdDev IC) to penalize volatility. Target IR &gt; 0.5.</p>
                <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-sm text-slate-600">
                  <LineChart size={16} className="text-rose-500" /> Quantile Backtesting (Alphalens)
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
              <div className="w-16 h-16 rounded-full bg-rose-500 text-white font-bold text-xl flex items-center justify-center shrink-0 border-4 border-white shadow-sm">5</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Multi-Factor Integration</h3>
                <p className="text-slate-700 mb-3">Smooth the equity curve by combining uncorrelated factors. Use traditional ICIR-weighting or modern machine learning (XGBoost, Random Forests) with strict cross-validation to capture non-linear alpha.</p>
                <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-sm text-slate-600">
                  <Cpu size={16} className="text-rose-500" /> Gradient Boosting, L1/L2 Regularization
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="optimization" className="text-3xl font-extrabold text-slate-900 mb-6 mt-16 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl shadow-sm">
              <Target size={24} className="text-white" />
            </div>
            Portfolio Optimization
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Translating composite alpha scores into target weights via convex mathematical optimization.
          </p>

          <div className="bg-slate-900 p-8 rounded-2xl mb-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-white">The Objective Function</h3>
            <p className="text-slate-300 mb-6">
              The optimizer utilizes Markowitz mean-variance architecture. It seeks to maximize expected active return (alpha) while minimizing active risk (tracking error) and penalizing transaction friction.
            </p>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 overflow-x-auto text-white">
              <MathBlock math="\max \left[ x^T\mu - \frac{\gamma}{2}x^T\Sigma x - \text{Penalty}(x) \right]" />
              <p className="text-slate-400 text-sm mt-4 text-center"><InlineMath math="x" /> = weights, <InlineMath math="\mu" /> = expected returns, <InlineMath math="\gamma" /> = risk aversion, <InlineMath math="\Sigma" /> = covariance matrix</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-slate-100 p-6 rounded-xl border border-slate-200">
              <h4 className="text-xl font-bold text-slate-900 mb-3">Real-World Constraints</h4>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-2 items-start"><ArrowRight className="text-cyan-600 shrink-0 mt-1" size={16}/> Equality constraints for 130/30 or 0 beta profiles.</li>
                <li className="flex gap-2 items-start"><ArrowRight className="text-cyan-600 shrink-0 mt-1" size={16}/> Sector constraints to prevent risk clustering.</li>
                <li className="flex gap-2 items-start"><ArrowRight className="text-cyan-600 shrink-0 mt-1" size={16}/> Turnover limits to control trading friction.</li>
              </ul>
            </div>
            <div className="bg-slate-100 p-6 rounded-xl border border-slate-200">
              <h4 className="text-xl font-bold text-slate-900 mb-3">MIQP Solvers</h4>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-2 items-start"><ArrowRight className="text-cyan-600 shrink-0 mt-1" size={16}/> <strong>Trade Paring:</strong> Restricting the number of unique trades to avoid costly micro-trades.</li>
                <li className="flex gap-2 items-start"><ArrowRight className="text-cyan-600 shrink-0 mt-1" size={16}/> <strong>Roundlotting:</strong> Forcing optimal weights into integer multiples of standard trading lots (e.g., 100 shares).</li>
              </ul>
            </div>
          </div>
        </section>
        
      </div>
    </ArticleFrame>
  );
}
