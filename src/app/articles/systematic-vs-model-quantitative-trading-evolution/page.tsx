'use client';

import React from 'react';
import { TrendingUp, BrainCircuit, Activity, Search, BookOpen, Code, AlertTriangle, Zap, BarChart2, ArrowRight } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`py-16 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

interface CardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  colorClass: string;
}

const Card = ({ title, icon: Icon, children, colorClass }: CardProps) => (
  <div className={`p-8 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 ${colorClass}`}>
    <div className="flex items-center gap-4 mb-6">
      <div className={`p-3 rounded-2xl ${colorClass.replace('border-', 'bg-').replace('500', '100')}`}>
        <Icon className={`w-8 h-8 ${colorClass.replace('border-', 'text-')}`} />
      </div>
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
    </div>
    <div className="text-gray-600 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock = ({ language, code }: CodeBlockProps) => (
  <div className="bg-slate-900 rounded-xl p-6 my-6 overflow-x-auto shadow-lg border border-slate-700">
    <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
      <span className="text-xs font-mono text-pink-400 uppercase tracking-wider">{language}</span>
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
    </div>
    <pre className="text-sm font-mono text-blue-100 whitespace-pre">
      <code>{code}</code>
    </pre>
  </div>
);

interface ComparisonRowProps {
  metric: string;
  trad: string;
  quant: string;
}

const ComparisonRow = ({ metric, trad, quant }: ComparisonRowProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
    <div className="font-semibold text-gray-700 flex items-center">{metric}</div>
    <div className="text-blue-600 bg-blue-50 p-3 rounded-lg md:rounded-none md:bg-transparent">{trad}</div>
    <div className="text-purple-600 bg-purple-50 p-3 rounded-lg md:rounded-none md:bg-transparent">{quant}</div>
  </div>
);

export default function SystematicVsModelQuantitativeTrading() {
  return (
    <ArticleFrame slug="systematic-vs-model-quantitative-trading-evolution">
      <div className="max-w-4xl mx-auto mb-16">
        <InfographicSlot alt="Systematic vs Model Quantitative Trading Infographic" />
      </div>

      <div className="max-w-5xl mx-auto py-16">
        {/* Core Definitions */}
          <Section>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Traditional Systematic */}
              <div className="group">
                <div className="relative p-1 rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transform transition hover:-translate-y-1">
                  <div className="bg-white rounded-[22px] p-8 h-full">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                      <Code size={32} />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">Traditional Systematic</h2>
                    <p className="text-slate-600 mb-6 text-lg">
                      Deterministic, rule-based trading. Strategies are derived from observable market phenomena and codified into explicit "if-then" logic.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-slate-600">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                        <span><strong>Heuristic Logic:</strong> Based on trader intuition verified by data.</span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-600">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                        <span><strong>Technical Analysis:</strong> Heavy reliance on price, volume, and moving averages.</span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-600">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                        <span><strong>Fixed Parameters:</strong> Lookback periods are often static (e.g., 200-day MA).</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Model Quantitative */}
              <div className="group">
                <div className="relative p-1 rounded-3xl bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg transform transition hover:-translate-y-1">
                  <div className="bg-white rounded-[22px] p-8 h-full">
                    <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                      <BrainCircuit size={32} />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-slate-800">Model Quantitative</h2>
                    <p className="text-slate-600 mb-6 text-lg">
                      Probabilistic, math-based trading. Strategies seek to find signal in noise using statistical methods, machine learning, and alternative data.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-slate-600">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 shrink-0"></span>
                        <span><strong>Stochastic Nature:</strong> Deals in probabilities of future returns, not certainties.</span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-600">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 shrink-0"></span>
                        <span><strong>Data Mining:</strong> Finds non-linear relationships humans cannot see.</span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-600">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 shrink-0"></span>
                        <span><strong>Dynamic Adaptation:</strong> Models retrain and adapt to regime changes.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Deep Dive: Strategy Logic */}
          <div className="bg-indigo-50 py-20 -mx-6 md:-mx-12">
            <Section>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Under the Hood: Strategy Construction</h2>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                  How do we actually build these? Let's look at the code structure for both approaches.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Systematic Example */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-600 text-white p-2 rounded-lg">
                      <Activity size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900">1. The Systematic Trend Follower</h3>
                  </div>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    This approach uses explicit logic. The most famous example is the <strong>Turtle Trading</strong> methodology. 
                    It works well in trending markets but suffers large drawdowns in chop.
                  </p>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 mb-6">
                    <h4 className="font-semibold text-blue-800 mb-2">Key Characteristics:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                      <li><strong>Signal:</strong> Price Breakouts (e.g., 20-day high).</li>
                      <li><strong>Filter:</strong> Moving Average Regime (Trend verification).</li>
                      <li><strong>Risk:</strong> Fixed fractional position sizing (ATR based).</li>
                    </ul>
                  </div>
                  <CodeBlock 
                    language="python" 
                    code={`def systematic_strategy(df):
    # Explicit Logic: 
    # IF price > 20_day_high AND trend is UP
    df['20_day_high'] = df['close'].rolling(20).max()
    df['50_ma'] = df['close'].rolling(50).mean()
    
    signals = []
    for i in range(len(df)):
        if (df['close'][i] > df['20_day_high'][i-1] and 
            df['close'][i] > df['50_ma'][i]):
            signals.append("BUY")
        elif df['close'][i] < df['20_day_low'][i-1]:
            signals.append("SELL")
        else:
            signals.append("HOLD")
    
    return signals`} 
                  />
                </div>

                {/* Model Quant Example */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-600 text-white p-2 rounded-lg">
                      <BrainCircuit size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-900">2. The Mean Reversion Model</h3>
                  </div>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    This approach models the <strong>spread</strong> between two correlated assets (Pairs Trading). 
                    It assumes the spread series is stationary (Ornstein-Uhlenbeck process).
                  </p>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 mb-6">
                    <h4 className="font-semibold text-purple-800 mb-2">Key Characteristics:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                      <li><strong>Signal:</strong> Z-Score of the spread residuals.</li>
                      <li><strong>Math:</strong> Cointegration tests (Engle-Granger).</li>
                      <li><strong>Risk:</strong> Statistical stop-losses based on standard deviation.</li>
                    </ul>
                  </div>
                  <CodeBlock 
                    language="python" 
                    code={`import statsmodels.api as sm

def model_strategy(asset_a, asset_b):
    # Statistical Logic:
    # Model relationship via OLS Regression
    model = sm.OLS(asset_a, sm.add_constant(asset_b)).fit()
    hedge_ratio = model.params[1]
    
    # Calculate Spread
    spread = asset_a - (hedge_ratio * asset_b)
    
    # Calculate Z-Score (Signal Strength)
    z_score = (spread - spread.mean()) / spread.std()
    
    # Probabilistic Entry
    if z_score > 2.0: 
        return "SHORT SPREAD"
    if z_score < -2.0: 
        return "LONG SPREAD"
    return "FLAT"`} 
                  />
                </div>
              </div>
            </Section>
          </div>

          {/* Comparison Matrix */}
          <Section className="py-24">
            <h2 className="text-4xl font-bold text-center mb-16 text-slate-800">The Great Divergence</h2>
            <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-50 p-6 border-b border-gray-200">
                <div className="font-bold text-gray-400 uppercase tracking-widest text-sm">Feature</div>
                <div className="font-bold text-blue-600 uppercase tracking-widest text-sm">Traditional Systematic</div>
                <div className="font-bold text-purple-600 uppercase tracking-widest text-sm">Model Quantitative</div>
              </div>
              <ComparisonRow 
                metric="Primary Data Source" 
                trad="OHLCV (Open, High, Low, Close, Volume)" 
                quant="Alternative Data (Sentiment, Sat imagery, Limit Order Book)" 
              />
              <ComparisonRow 
                metric="Mathematical Complexity" 
                trad="Arithmetic & Simple Algebra" 
                quant="Linear Algebra, Calculus, ML Algorithms" 
              />
              <ComparisonRow 
                metric="Optimization Risk" 
                trad="Parameter Overfitting (Curve fitting)" 
                quant="Look-ahead Bias & Data Snooping" 
              />
              <ComparisonRow 
                metric="Adaptability" 
                trad="Rigid (Requires manual parameter updates)" 
                quant="Fluid (Can self-learn via Online Learning)" 
              />
              <ComparisonRow 
                metric="Execution Horizon" 
                trad="Medium to Long Term (Minutes to Months)" 
                quant="HFT to Medium Term (Nanoseconds to Days)" 
              />
            </div>
          </Section>

          {/* The Convergence Section */}
          <div className="bg-slate-900 text-white py-24 -mx-6 md:-mx-12">
            <Section>
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-block px-4 py-1 rounded-full bg-pink-500/20 text-pink-300 font-mono text-sm mb-6 border border-pink-500/30">
                    CURRENT TRENDS
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400">
                    The Rise of "Quantamental"
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8">
                    The lines are blurring. Modern firms are no longer strictly "Discretionary" or "Quant". 
                    The most successful funds today blend human intuition with machine precision.
                  </p>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                        <Search className="text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">Feature Engineering</h4>
                        <p className="text-slate-400">
                          Humans define the "factors" (e.g., Value, Momentum) based on economic theory.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                        <BarChart2 className="text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">Ensemble Methods</h4>
                        <p className="text-slate-400">
                          Machines weight these factors dynamically based on current market volatility.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl blur-2xl opacity-30"></div>
                  <div className="relative bg-slate-800 rounded-3xl p-8 border border-slate-700">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Zap size={24} className="text-yellow-400" />
                      Hybrid Architecture
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-slate-700/50 border border-slate-600">
                        <span className="text-xs font-mono text-slate-400 uppercase">Input Layer</span>
                        <div className="font-semibold text-lg text-white">Fundamental Data + Technical Indicators</div>
                      </div>
                      <div className="flex justify-center">
                        <ArrowRight className="text-slate-500 rotate-90 md:rotate-0" />
                      </div>
                      <div className="p-4 rounded-xl bg-slate-700/50 border border-slate-600">
                        <span className="text-xs font-mono text-slate-400 uppercase">Processing Layer (AI)</span>
                        <div className="font-semibold text-lg text-white">Random Forest Classifier / LSTM</div>
                      </div>
                      <div className="flex justify-center">
                        <ArrowRight className="text-slate-500 rotate-90 md:rotate-0" />
                      </div>
                      <div className="p-4 rounded-xl bg-slate-700/50 border border-slate-600">
                        <span className="text-xs font-mono text-slate-400 uppercase">Execution Layer (Systematic)</span>
                        <div className="font-semibold text-lg text-white">TWAP/VWAP Algorithmic Execution</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>

          {/* Tutorial Footer */}
          <Section className="text-center py-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to Start Building?</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
              <Card title="Step 1: Data" icon={BookOpen} colorClass="border-blue-500">
                Learn Python (Pandas) and get high-quality data from sources like Yahoo Finance (free) or Bloomberg (pro).
              </Card>
              <Card title="Step 2: Backtest" icon={TrendingUp} colorClass="border-green-500">
                Use libraries like Backtrader or Zipline to simulate your strategy over historical data to check robustness.
              </Card>
              <Card title="Step 3: Risk" icon={AlertTriangle} colorClass="border-red-500">
                Never deploy without a risk engine. Focus on Sharpe Ratio and Maximum Drawdown, not just total return.
              </Card>
            </div>
          </Section>

      </div>
    </ArticleFrame>
  );
}