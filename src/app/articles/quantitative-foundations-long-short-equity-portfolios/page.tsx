'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { 
  TrendingUp, 
  BarChart2, 
  Activity, 
  Target, 
  Layers, 
  DollarSign, 
  Shield, 
  Cpu, 
  Zap,
  BookOpen,
  ArrowRight,
  Database,
  Filter,
  RefreshCw,
  LineChart,
  Grid
} from 'lucide-react';

const Section = ({ id, title, subtitle, icon: Icon, color, children, bg = "bg-white" }: {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  children: React.ReactNode;
  bg?: string;
}) => (
  <section id={id} className={`py-20 ${bg}`}>
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className={`inline-flex items-center justify-center p-4 rounded-2xl mb-6 shadow-lg ${color}`}>
          <Icon size={32} className="text-white" />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 leading-[1.1] mb-4 tracking-tight">{title}</h2>
        {subtitle && <p className="text-xl text-slate-500 max-w-3xl">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);

const InfoCard = ({ title, content, icon: Icon, color }: {
  title: string;
  content: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}) => (
  <div className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
    <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{content}</p>
  </div>
);

const Equation = ({ math, description }: { math: string; description?: string }) => (
  <div className="my-8 flex flex-col items-center">
    <div className="bg-slate-900 text-slate-50 py-4 px-8 rounded-2xl shadow-2xl font-mono text-xl sm:text-2xl tracking-wider">
      {math}
    </div>
    {description && <p className="mt-3 text-sm text-slate-500 italic font-medium">{description}</p>}
  </div>
);

export default function LongShortEquityArticle() {
  const currentArticle = articles.find(article => article.slug === 'quantitative-foundations-long-short-equity-portfolios');

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        
        {/* Return to Home Button */}
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Hero Header */}
        <header className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-200/40 to-purple-200/40 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-indigo-100 text-indigo-600 font-semibold text-sm mb-8">
              <Zap size={16} /> Quantitative Finance Tutorial
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
              The Architecture of <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Long-Short Portfolios</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              A comprehensive guide to systematic equity strategies, factor research methodologies, and the mathematical foundations of active portfolio management.
            </p>
          </div>
        </header>

        {/* Hero Infographic */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <img 
              src="https://i.imgur.com/euE0o4Q.jpeg" 
              alt="Long-Short Equity Portfolio Infographic" 
              className="w-full h-auto"
            />
          </div>
        </section>

        <Section 
          id="essence" 
          title="The Essence: Why Long-Short?" 
          subtitle="Overcoming structural constraints to capture pure alpha across the entire market cross-section."
          icon={Target}
          color="bg-gradient-to-br from-blue-500 to-indigo-600"
          bg="bg-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">The Long-Only Penalty</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Traditional long-only portfolios are mathematically constrained. An active manager cannot underweight a stock by a magnitude greater than its benchmark weight. This creates <strong>"unimplementable shorts,"</strong> forcing managers to abandon their best negative conviction ideas simply because they are restricted from short selling.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                By relaxing the long-only constraint, quantitative analysts can construct portfolios that perfectly reflect their proprietary alpha signals, capturing market dislocations on both the long (undervalued) and short (overvalued) sides.
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-inner">
              <h4 className="text-xl font-bold text-slate-800 mb-4 text-center">Fundamental Law of Active Management</h4>
              <p className="text-slate-600 text-center mb-6">
                Portfolio efficiency (Information Ratio) is a function of forecasting skill (IC), breadth of bets (BR), and the ability to implement them (TC).
              </p>
              <Equation 
                math="IR = TC × IC × √BR" 
                description="Information Ratio = Transfer Coefficient × Info Coefficient × √(Breadth)" 
              />
              <div className="space-y-4 mt-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
                  <div className="bg-rose-100 text-rose-600 p-2 rounded-lg font-bold">TC</div>
                  <div>
                    <h5 className="font-semibold text-slate-900">Transfer Coefficient Penalty</h5>
                    <p className="text-sm text-slate-500">In a long-only fund, TC plummets to 0.3-0.5 due to shorting constraints. In long-short, it approaches 1.0.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section 
          id="structures" 
          title="Structural Paradigms" 
          subtitle="Calibrating net market exposure and gross leverage based on specific risk mandates."
          icon={Layers}
          color="bg-gradient-to-br from-emerald-400 to-teal-500"
          bg="bg-slate-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <InfoCard 
              title="Equity Market-Neutral" 
              content="Engineered for absolute returns uncorrelated with the broader market. Targets a net exposure of 0% and a beta of 0.0. Relies entirely on the relative performance spread between long and short baskets (idiosyncratic risk or pure alpha). Highly capital-intensive, often requiring 200%-300% gross leverage."
              icon={Activity}
              color="bg-teal-500"
            />
            <InfoCard 
              title="Active Extension (130/30)" 
              content="Bridges the gap between long-only and absolute return. Starts 100% long, borrows/shorts 30%, and reinvests in 30% more longs. Maintains 100% net exposure (beta of 1.0) but increases gross exposure to 160%. Recaptures up to 90% of theoretical unconstrained alpha without losing the equity risk premium."
              icon={TrendingUp}
              color="bg-emerald-500"
            />
          </div>

          {/* Strategy Comparison Table */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <div className="p-6 bg-slate-900 text-white flex items-center gap-3">
              <BarChart2 size={20} className="text-emerald-400" />
              <h3 className="text-xl font-bold">Quantitative vs Discretionary Funds</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
                    <th className="p-4 border-b border-slate-200 font-semibold">Metric</th>
                    <th className="p-4 border-b border-slate-200 font-semibold">Quant Hedge Funds</th>
                    <th className="p-4 border-b border-slate-200 font-semibold">Discretionary Funds</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-medium">Annualized Return</td>
                    <td className="p-4 text-emerald-600 font-semibold">8.0% - 12.0%</td>
                    <td className="p-4">7.0% - 15.0%</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-medium">Sharpe Ratio</td>
                    <td className="p-4 text-emerald-600 font-semibold">0.8 - 1.5</td>
                    <td className="p-4">0.5 - 1.2</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-medium">Maximum Drawdown</td>
                    <td className="p-4 text-emerald-600 font-semibold">10.0% - 20.0%</td>
                    <td className="p-4 text-rose-500">15.0% - 40.0%</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-medium">Correlation to S&P 500</td>
                    <td className="p-4 text-emerald-600 font-semibold">0.2 - 0.5</td>
                    <td className="p-4">0.4 - 0.7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        <Section 
          id="mechanics" 
          title="Mechanics of Short Selling" 
          subtitle="The operational realities and economic frictions of the prime brokerage lending market."
          icon={DollarSign}
          color="bg-gradient-to-br from-amber-400 to-orange-500"
          bg="bg-white"
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 space-y-6">
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                <h4 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <Shield size={20} className="text-amber-600" /> The Short Rebate
                </h4>
                <p className="text-amber-800/80 leading-relaxed">
                  When borrowing stock, funds post cash collateral. The lender pays interest on this collateral back to the fund. This cash flow is the "short rebate," a critical driver of strategy economics.
                </p>
                <div className="mt-4 p-4 bg-white rounded-xl font-mono text-sm shadow-sm text-slate-700">
                  Rebate = Benchmark Rate - Borrow Spread - Div Yield
                </div>
              </div>
              
              <p className="text-slate-600 leading-relaxed text-lg">
                <strong>Interest Rate Sensitivity:</strong> In a ZIRP (Zero Interest Rate Policy) environment, short rebates are often negative, acting as a persistent performance drag. In a high-interest-rate regime, the rebate becomes a significant source of passive yield, structurally enhancing baseline performance.
              </p>
            </div>
            
            <div className="lg:w-1/2 bg-slate-900 rounded-3xl p-8 text-slate-300 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]"></div>
              <h3 className="text-2xl font-bold text-white mb-6">Frictional Costs</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <span className="text-orange-400 font-bold">1</span>
                  </div>
                  <div>
                    <strong className="block text-white mb-1">Borrow Spreads</strong>
                    Liquid large-caps cost ~0.25% annually. "Hard-to-borrow" small-caps or highly shorted stocks can exceed 75% annualized.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <span className="text-orange-400 font-bold">2</span>
                  </div>
                  <div>
                    <strong className="block text-white mb-1">Dividend Replacement</strong>
                    Short sellers must legally pass any dividends issued directly back to the original lender, draining portfolio cash.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <span className="text-orange-400 font-bold">3</span>
                  </div>
                  <div>
                    <strong className="block text-white mb-1">Margin Collateral</strong>
                    Capital must be tied up to guarantee the return of borrowed assets, reducing overall capital efficiency.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section 
          id="factors" 
          title="Factor Models & Risk Attribution" 
          subtitle="Decomposing risk and return into lower-dimensional, statistically robust factor spaces."
          icon={Grid}
          color="bg-gradient-to-br from-violet-500 to-fuchsia-600"
          bg="bg-slate-50"
        >
          <div className="mb-12 text-center">
            <p className="text-lg text-slate-600 max-w-4xl mx-auto mb-8">
              Grounded in Arbitrage Pricing Theory (APT), quantitative hedge funds don&apos;t forecast idiosyncratic returns from the bottom up. Instead, they project returns into systemic risk drivers.
            </p>
            <Equation 
              math="Rᵢ = αᵢ + Σ βᵢⱼ fⱼ + εᵢ" 
              description="Asset Return = Pure Alpha + (Factor Loadings × Factor Returns) + Random Error" 
            />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Standard Industry Factors (Barra Model)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Value (BTOP)", desc: "Book-to-price ratio; exploits reversion of undervalued assets relative to fundamentals." },
              { name: "Momentum", desc: "525-day weighted return (excluding last 21 days); captures investor underreaction." },
              { name: "Size", desc: "Natural log of market cap; models liquidity and distress risk of smaller firms." },
              { name: "Quality", desc: "ROE stability and earnings quality; targets highly profitable, low-accrual firms." },
              { name: "Residual Volatility", desc: "Volatility orthogonalized to market beta; exploits the low-volatility anomaly." },
              { name: "Sentiment", desc: "Analyst rating changes and institutional fund flows." }
            ].map((factor, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:border-violet-300 transition-colors">
                <h4 className="text-lg font-bold text-violet-700 mb-2">{factor.name}</h4>
                <p className="text-slate-600 text-sm">{factor.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section 
          id="workflow" 
          title="The Quant Research Workflow" 
          subtitle="A rigorous, multi-stage econometric pipeline to prevent data mining and look-ahead bias."
          icon={Cpu}
          color="bg-gradient-to-br from-rose-400 to-red-600"
          bg="bg-white"
        >
          <div className="relative">
            {/* Connecting Line for Timeline */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-rose-100 -translate-x-1/2"></div>
            
            <div className="space-y-16 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                <div className="lg:w-1/2 lg:text-right">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Step 1: Universe & Data</h3>
                  <p className="text-slate-600">Filter out illiquid micro-caps to prevent slippage. Ingest point-in-time fundamental and alternative data, ensuring timestamps perfectly align with public availability to prevent look-ahead bias.</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center text-2xl font-bold shadow-xl shadow-rose-200 lg:shrink-0 border-4 border-white">1</div>
                <div className="lg:w-1/2 flex justify-start">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-500 flex items-center gap-3">
                    <Database size={20} className="text-rose-500" /> JSON SEC filings, OHLCV, NLP sentiment
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Step 2: Feature Construction</h3>
                  <p className="text-slate-600">Engineer specific quantitative characteristics. Apply cross-sectional standardization (Z-scoring) and treat fat-tailed outliers via winsorization (3σ) or Median Absolute Deviation (MAD).</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center text-2xl font-bold shadow-xl shadow-rose-200 lg:shrink-0 border-4 border-white">2</div>
                <div className="lg:w-1/2 flex lg:justify-end">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-500 flex items-center gap-3">
                    <Filter size={20} className="text-rose-500" /> Z-Score Mapping, MAD Winsorization
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                <div className="lg:w-1/2 lg:text-right">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Step 3: Factor Neutralization</h3>
                  <p className="text-slate-600">Prevent unintentional sector/size biases. Run cross-sectional regressions of raw signals against GICS industry and Size factors. The residuals become the pure, neutralized alpha scores.</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center text-2xl font-bold shadow-xl shadow-rose-200 lg:shrink-0 border-4 border-white">3</div>
                <div className="lg:w-1/2 flex justify-start">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-500 flex items-center gap-3">
                    <RefreshCw size={20} className="text-rose-500" /> Orthogonalization via Regression Residuals
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Step 4: IC/IR Evaluation</h3>
                  <p className="text-slate-600">Evaluate the Spearman Rank Information Coefficient (IC). A Mean Rank IC &gt; 0.05 is highly robust. Calculate the Information Ratio (IR = Mean IC / StdDev IC) to penalize volatility. Target IR &gt; 0.5.</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center text-2xl font-bold shadow-xl shadow-rose-200 lg:shrink-0 border-4 border-white">4</div>
                <div className="lg:w-1/2 flex lg:justify-end">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-500 flex items-center gap-3">
                    <LineChart size={20} className="text-rose-500" /> Quantile Backtesting (Alphalens)
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                <div className="lg:w-1/2 lg:text-right">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Step 5: Multi-Factor Integration</h3>
                  <p className="text-slate-600">Smooth the equity curve by combining uncorrelated factors. Use traditional ICIR-weighting or modern machine learning (XGBoost, Random Forests) with strict cross-validation to capture non-linear alpha.</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center text-2xl font-bold shadow-xl shadow-rose-200 lg:shrink-0 border-4 border-white">5</div>
                <div className="lg:w-1/2 flex justify-start">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-500 flex items-center gap-3">
                    <Cpu size={20} className="text-rose-500" /> Gradient Boosting, L1/L2 Regularization
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section 
          id="optimization" 
          title="Portfolio Optimization" 
          subtitle="Translating composite alpha scores into target weights via convex mathematical optimization."
          icon={Target}
          color="bg-gradient-to-br from-blue-600 to-cyan-500"
          bg="bg-slate-900"
        >
          <div className="max-w-4xl mx-auto">
            {/* Header styling specifically for dark mode section */}
            <style>{`
              #optimization h2, #optimization h3, #optimization h4 { color: white; }
              #optimization p.text-slate-500 { color: #94a3b8; }
              #optimization p.text-slate-600 { color: #cbd5e1; }
            `}</style>
            
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl mb-8">
              <h3 className="text-2xl font-bold mb-4 text-white">The Objective Function</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                The optimizer utilizes Markowitz mean-variance architecture. It seeks to maximize expected active return (alpha) while minimizing active risk (tracking error) and penalizing transaction friction.
              </p>
              <div className="bg-slate-900 p-6 rounded-2xl overflow-x-auto text-center border border-slate-700">
                <code className="text-cyan-400 font-mono text-lg whitespace-nowrap">
                  max [ xᵀμ - (γ/2)xᵀΣx - Penalty(x) ]
                </code>
                <p className="text-slate-500 text-sm mt-3">x = weights, μ = expected returns, γ = risk aversion, Σ = covariance matrix</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h4 className="text-xl font-bold text-white mb-3">Real-World Constraints</h4>
                <ul className="space-y-3">
                  <li className="flex gap-2 items-start"><ArrowRight className="text-cyan-500 shrink-0 mt-1" size={16}/> Equality constraints for 130/30 or 0 beta profiles.</li>
                  <li className="flex gap-2 items-start"><ArrowRight className="text-cyan-500 shrink-0 mt-1" size={16}/> Sector constraints to prevent risk clustering.</li>
                  <li className="flex gap-2 items-start"><ArrowRight className="text-cyan-500 shrink-0 mt-1" size={16}/> Turnover limits to control trading friction.</li>
                </ul>
              </div>
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h4 className="text-xl font-bold text-white mb-3">MIQP Solvers</h4>
                <ul className="space-y-3">
                  <li className="flex gap-2 items-start"><ArrowRight className="text-cyan-500 shrink-0 mt-1" size={16}/> <strong>Trade Paring:</strong> Restricting the number of unique trades to avoid costly micro-trades.</li>
                  <li className="flex gap-2 items-start"><ArrowRight className="text-cyan-500 shrink-0 mt-1" size={16}/> <strong>Roundlotting:</strong> Forcing optimal weights into integer multiples of standard trading lots (e.g., 100 shares).</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Call-to-Action: Google Doc */}
        {currentArticle?.googleDoc && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl my-8 text-center max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
              >
                <BookOpen className="inline mr-2" />
                Read Full Research Paper
              </a>
            </div>
          </div>
        )}

        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-6">
              <BookOpen size={40} className="text-indigo-500 opacity-50" />
            </div>
            <h3 className="text-2xl font-bold text-slate-200 mb-4">Conclusion</h3>
            <p className="max-w-3xl mx-auto leading-relaxed mb-8">
              The construction of long-short equity portfolios represents the pinnacle of quantitative financial engineering. By relaxing the long-only constraint, neutralizing structural risks via robust Barra covariance matrices, and subjecting engineered signals to strict econometric analyses, quantitative funds systematically extract highly efficient, uncorrelated, and risk-adjusted absolute returns.
            </p>
            <div className="text-sm">
              Based on &quot;Quantitative Foundations of Long-Short Equity Portfolios&quot; Research Document.
            </div>
            <div className="mt-8 text-sm text-slate-500">
              © 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
