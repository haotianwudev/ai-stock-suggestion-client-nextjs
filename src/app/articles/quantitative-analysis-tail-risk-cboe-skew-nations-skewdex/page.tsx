'use client';

import { TrendingUp, Activity, BookOpen, Code, BarChart2, AlertTriangle, ArrowRight, Zap, Layers, Divide, Sigma, GitCommit, Clock, CheckCircle, XCircle, Brain, MousePointer, Maximize2, ExternalLink } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Components ---
const SectionHeader = ({ title, subtitle, icon: Icon, colorClass }: { title: string; subtitle: string; icon: React.ElementType; colorClass: string }) => (
  <div className={`mb-8 border-l-4 ${colorClass} pl-4`}>
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-lg ${colorClass.replace('border-', 'bg-').replace('500', '100')} text-gray-800`}>
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
    </div>
    <p className="text-lg text-gray-600 max-w-3xl">{subtitle}</p>
  </div>
);

const Card = ({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300 ${className}`}>
    {title && <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>}
    <div className="text-gray-600 leading-relaxed">{children}</div>
  </div>
);

const FormulaBox = ({ formula, description }: { formula: string; description: string }) => (
  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-4 font-mono text-center">
    <div className="text-xl md:text-2xl text-slate-800 mb-2 font-bold">{formula}</div>
    <div className="text-sm text-slate-500 italic font-sans">{description}</div>
  </div>
);

const CodeBlock = ({ code, language = "python" }: { code: string; language?: string }) => (
  <div className="bg-slate-900 rounded-lg overflow-hidden shadow-lg my-6 text-sm">
    <div className="bg-slate-800 px-4 py-2 text-slate-400 text-xs flex justify-between items-center">
      <span>{language}</span>
      <div className="flex gap-1">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
    </div>
    <pre className="p-4 overflow-x-auto text-slate-300 font-mono leading-relaxed">
      <code>{code}</code>
    </pre>
  </div>
);

const ComparisonRow = ({ label, left, right }: { label: string; left: string; right: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100 py-4 last:border-0">
    <div className="font-semibold text-gray-700 md:col-span-1">{label}</div>
    <div className="text-gray-600 md:col-span-1 bg-rose-50 p-2 rounded md:bg-transparent md:p-0">{left}</div>
    <div className="text-gray-600 md:col-span-1 bg-emerald-50 p-2 rounded md:bg-transparent md:p-0">{right}</div>
  </div>
);

const StrategyCard = ({ title, signal, action, color, icon: Icon }: { title: string; signal: string; action: string; color: string; icon: React.ElementType }) => (
  <div className={`border-t-4 ${color} bg-white p-6 rounded-lg shadow-sm hover:-translate-y-1 transition-transform duration-300`}>
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <Icon className="text-gray-400" size={24} />
    </div>
    <div className="space-y-3">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Signal</span>
        <p className="font-medium text-gray-700">{signal}</p>
      </div>
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Action</span>
        <p className={`font-bold ${color.replace('border-', 'text-')}`}>{action}</p>
      </div>
    </div>
  </div>
);

// --- Main Component ---
export default function MarketSkewTutorial() {
  return (
    <ArticleFrame
      slug="quantitative-analysis-tail-risk-cboe-skew-nations-skewdex"
      additionalDisclaimer="The mathematical models discussed are simplified representations for educational understanding. Always consult with qualified financial professionals before making investment decisions."
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 space-y-24 bg-transparent selection:bg-indigo-100 selection:text-indigo-900 font-sans">
        <div className="-mb-12">
          <InfographicSlot alt="Market Skew Analysis Infographic" />
        </div>

        {/* 1. Introduction */}
        <section>
          <SectionHeader 
            title="Introduction: The Geometry of Fear" 
            subtitle="Why standard models fail and why 'Skew' exists."
            icon={TrendingUp}
            colorClass="border-indigo-500"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card title="The Flaw of Normality" className="bg-gradient-to-br from-white to-indigo-50/50">
              <p className="mb-4">
                In a perfect Black-Scholes world, returns follow a normal distribution. This implies that a 20% crash is statistically impossible. However, <strong>Black Monday (1987)</strong> shattered this illusion, proving that markets possess "Fat Tails."
              </p>
              <div className="flex items-center justify-center p-4 bg-white rounded border border-indigo-100 mb-4">
                <div className="text-center">
                  <div className="font-mono text-indigo-600 text-lg">BSM Model: σ(K) = Constant</div>
                  <div className="text-xs text-gray-400">Flat Volatility Surface</div>
                </div>
                <ArrowRight className="mx-4 text-gray-300" />
                <div className="text-center">
                  <div className="font-mono text-rose-600 text-lg">Reality: σ(Put) &gt; σ(Call)</div>
                  <div className="text-xs text-gray-400">The Volatility Smirk</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                The Black-Scholes model assumes log-normal returns with constant volatility. Under this framework, a 5-sigma event (like the 22.6% drop on October 19, 1987) should occur once every 13.7 billion years. Yet we've witnessed multiple such events in a single century.
              </p>
            </Card>

            <Card title="Quantifying Asymmetry">
              <p className="mb-4">
                Skew indices attempt to measure the <strong>price of tail risk</strong>. They answer a simple question: <em>"How much more are investors paying for crash protection compared to standard bets?"</em>
              </p>
              <ul className="space-y-2 mt-4 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span><strong>CBOE SKEW:</strong> Measures statistical skewness (3rd moment).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                  <span><strong>Nations SkewDex:</strong> Measures the cost of a hedge (Fixed Strike).</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600">
                Both indices capture the market's collective fear of left-tail events, but through fundamentally different lenses. SKEW uses the entire option chain to compute a moment-based statistic, while SkewDex focuses on the practical cost differential between ATM and OTM protection.
              </p>
            </Card>
          </div>

          <Card className="bg-indigo-50 border-indigo-200">
            <h3 className="text-lg font-bold text-indigo-900 mb-3">Historical Context: The Birth of Skew</h3>
            <p className="text-gray-700 mb-3">
              Prior to 1987, option markets exhibited relatively symmetric implied volatility across strikes—the theoretical "smile" predicted by Black-Scholes. Post-crash, a permanent structural shift occurred: <strong>the volatility smirk</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600 mb-1">Pre-1987</div>
                <div className="text-sm text-gray-600">Symmetric volatility smile, minimal skew premium</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-2xl font-bold text-rose-600 mb-1">Oct 19, 1987</div>
                <div className="text-sm text-gray-600">22.6% crash, portfolio insurance failure</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">Post-1987</div>
                <div className="text-sm text-gray-600">Permanent skew, OTM puts command premium</div>
              </div>
            </div>
          </Card>
        </section>

        {/* 2. CBOE SKEW Deep Dive */}
        <section>
          <SectionHeader 
            title="CBOE SKEW (^SKEW)" 
            subtitle="The Bakshi, Kapadia, and Madan (BKM) Model-Free Framework."
            icon={Sigma}
            colorClass="border-rose-500"
          />
          <div className="prose prose-lg text-gray-600 max-w-none mb-8">
            <p>
              The CBOE SKEW is a sophisticated derivative of the VIX. While VIX estimates variance (2nd moment), SKEW estimates <strong>skewness (3rd moment)</strong>. It is "model-free," deriving moments directly from the prices of the entire strip of OTM options.
            </p>
            <p className="mt-4">
              Launched in 2011, SKEW applies the Bakshi-Kapadia-Madan (1999) methodology to SPX options with 30-day constant maturity. The index transforms raw skewness into an intuitive scale where 100 represents a normal distribution, and values above 100 indicate negative skewness (left-tail risk).
            </p>
          </div>

          <div className="bg-rose-50 rounded-xl p-8 mb-8 border border-rose-100">
            <h3 className="text-2xl font-bold text-rose-800 mb-6 flex items-center gap-2">
              <Divide className="w-6 h-6"/> The Math Behind the Index
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-2">The Cubic Contract (W)</h4>
                <p className="text-sm text-gray-600 mb-4">
                  This contract pays the cubed log-return. Its value drives the SKEW index. Note how the weighting <span className="font-mono bg-rose-100 px-1 rounded">1/K²</span> dampens the far wings, but the numerator captures asymmetry.
                </p>
                <FormulaBox 
                  formula="SKEW = 100 - 10 × S"
                  description="Where S is the raw statistical skewness (usually negative)."
                />
                <p className="text-sm text-gray-600 mt-3">
                  The BKM framework integrates across all strikes using a continuum of options. In practice, CBOE uses discrete strikes with trapezoidal integration, filtering out arbitrage violations and applying bid-ask midpoints.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-gray-800 mb-4">Interpretation Guide</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span>SKEW = 100</span>
                    <span className="font-mono text-gray-500">Normal Distribution (S=0)</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span>SKEW = 115</span>
                    <span className="font-mono text-gray-500">Typical Market Skew</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span>SKEW = 125-135</span>
                    <span className="font-mono text-amber-600">Elevated Tail Risk</span>
                  </li>
                  <li className="flex justify-between items-center pb-2">
                    <span className="font-bold text-rose-600">SKEW = 135+</span>
                    <span className="font-mono text-rose-600">Extreme Tail Risk (2-3 SD)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-3">The Three-Moment Framework</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="border-l-4 border-blue-400 pl-3">
                  <div className="font-bold text-blue-700 mb-1">Variance (V)</div>
                  <div className="text-gray-600">Captured by VIX. Measures dispersion around the mean. Second moment of returns.</div>
                </div>
                <div className="border-l-4 border-rose-400 pl-3">
                  <div className="font-bold text-rose-700 mb-1">Skewness (W)</div>
                  <div className="text-gray-600">Captured by SKEW. Measures asymmetry. Third moment—negative skew means fat left tail.</div>
                </div>
                <div className="border-l-4 border-purple-400 pl-3">
                  <div className="font-bold text-purple-700 mb-1">Kurtosis (X)</div>
                  <div className="text-gray-600">Fourth moment. Measures tail thickness. Not published by CBOE but computed in BKM framework.</div>
                </div>
              </div>
            </div>
          </div>

          <Card title="Critical Flaw: The Volatility Paradox" className="border-l-4 border-l-rose-400 mb-6">
            <p className="mb-3">
              SKEW measures the <strong>shape</strong>, not the magnitude. In calm markets (low VIX), ATM options get cheap, but deep OTM puts stay expensive (floor price). This causes SKEW to <em>rise</em> paradoxically during quiet bull markets.
            </p>
            <p className="mb-3">
              <span className="text-rose-600 font-semibold">Warning:</span> A high SKEW can sometimes reflect complacency (low ATM vol) rather than heightened fear.
            </p>
            <div className="bg-rose-50 p-4 rounded-lg mt-4">
              <div className="font-bold text-rose-800 mb-2">Example: The 2017 Anomaly</div>
              <div className="text-sm text-gray-700">
                During the low-volatility melt-up of 2017, SKEW reached record highs (150+) while VIX traded below 10. This wasn't panic—it was structural demand for portfolio insurance in a complacent market. The ratio SKEW/VIX became a better fear gauge than SKEW alone.
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-rose-50 to-white">
            <h3 className="text-lg font-bold text-rose-900 mb-3">Data Specifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Ticker</div>
                <div className="font-mono font-bold">^SKEW</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Update Frequency</div>
                <div className="font-mono">End of Day</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Maturity</div>
                <div className="font-mono">30-Day Constant</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Underlying</div>
                <div className="font-mono">SPX Options</div>
              </div>
            </div>
          </Card>
        </section>

        {/* 3. Nations SkewDex Deep Dive */}
        <section>
          <SectionHeader 
            title="Nations SkewDex (^SDEX)" 
            subtitle="The Practitioner's Approach: Fixed-Strike Parameterization."
            icon={MousePointer}
            colorClass="border-emerald-500"
          />
          
          <div className="prose prose-lg text-gray-600 max-w-none mb-8">
            <p>
              While CBOE SKEW provides academic rigor, the Nations SkewDex answers the question traders actually ask: <em>"What's the premium I'm paying for crash insurance right now?"</em> Developed by SpotGamma and updated every 15 seconds, SDEX measures the slope of the volatility surface at the 1-standard-deviation strike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <Card className="h-full bg-emerald-50/30 border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-900 mb-4">How Traders Actually Think</h3>
                <p className="mb-4">
                  Institutional hedgers don't calculate the third moment. They ask: <em>"How much does a 1-Standard Deviation (1SD) OTM put cost compared to an ATM put?"</em>
                </p>
                <p className="mb-6">
                  The SkewDex answers this by measuring the slope of the volatility surface at the <strong>edge of the expected move</strong>. Unlike SKEW's fixed mathematical definition, SDEX adapts to the current volatility regime—when VIX is high, the 1SD strike is further OTM.
                </p>
                <FormulaBox 
                  formula="SDEX = [(IV_OTM - IV_ATM) / IV_ATM] × Scale"
                  description="Measures relative steepness, normalized for volatility regime."
                />
                <div className="bg-white p-4 rounded-lg mt-4 border border-emerald-200">
                  <div className="font-bold text-emerald-800 mb-2">Practical Example</div>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div>• ATM Put (50 delta): IV = 20%</div>
                    <div>• 1SD OTM Put (16 delta): IV = 25%</div>
                    <div>• Raw Skew: (25% - 20%) / 20% = 25% premium</div>
                    <div className="font-mono text-emerald-600">• SDEX ≈ 25 (after scaling)</div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-emerald-600 mb-2"><Zap size={24}/></div>
                <h4 className="font-bold mb-1">Fast Updates</h4>
                <p className="text-sm text-gray-500 mb-3">Calculated every 15 seconds vs. End-of-Day for CBOE SKEW.</p>
                <div className="text-xs text-gray-400 bg-emerald-50 p-2 rounded">
                  Enables intraday tactical positioning and real-time risk monitoring
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-emerald-600 mb-2"><Layers size={24}/></div>
                <h4 className="font-bold mb-1">Dynamic Moneyness</h4>
                <p className="text-sm text-gray-500 mb-3">Adapts to VIX. If VIX is high, the "1SD" strike is further away.</p>
                <div className="text-xs text-gray-400 bg-emerald-50 p-2 rounded">
                  Maintains consistent statistical meaning across volatility regimes
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="text-emerald-600 mb-2"><Activity size={24}/></div>
                <h4 className="font-bold mb-1">Regime Aware</h4>
                <p className="text-sm text-gray-500">Normalizes for absolute volatility level, isolating pure skew signal.</p>
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-emerald-50 to-white mb-6">
            <h3 className="text-lg font-bold text-emerald-900 mb-4">The Strike Selection Algorithm</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <div className="font-bold text-gray-800">Calculate Expected Move</div>
                  <div className="text-sm text-gray-600">Using ATM straddle price: EM = (Call + Put) × 0.85</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <div className="font-bold text-gray-800">Identify 1SD Strike</div>
                  <div className="text-sm text-gray-600">K_1SD = Spot - Expected Move (typically 16 delta put)</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <div className="font-bold text-gray-800">Compute IV Differential</div>
                  <div className="text-sm text-gray-600">Extract implied vols, calculate percentage premium over ATM</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">4</div>
                <div>
                  <div className="font-bold text-gray-800">Scale and Publish</div>
                  <div className="text-sm text-gray-600">Apply proprietary scaling factor for index consistency</div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Advantages Over SKEW</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-emerald-500 mt-1 shrink-0" size={16} />
                  <span><strong>Intraday Granularity:</strong> Capture regime shifts in real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-emerald-500 mt-1 shrink-0" size={16} />
                  <span><strong>Intuitive Interpretation:</strong> Direct cost of hedging, not abstract moment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-emerald-500 mt-1 shrink-0" size={16} />
                  <span><strong>Volatility Normalized:</strong> Isolates skew from overall vol level</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-emerald-500 mt-1 shrink-0" size={16} />
                  <span><strong>Actionable Signals:</strong> Spikes often precede reversals</span>
                </li>
              </ul>
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Typical SDEX Regimes</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="font-mono">SDEX &lt; 10</span>
                  <span className="text-gray-600">Low skew, complacent market</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                  <span className="font-mono">SDEX 10-20</span>
                  <span className="text-gray-600">Normal hedging demand</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                  <span className="font-mono">SDEX 20-30</span>
                  <span className="text-gray-600">Elevated protection premium</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span className="font-mono font-bold">SDEX &gt; 30</span>
                  <span className="text-gray-600 font-bold">Panic hedging, potential reversal</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 4. Comparative Analysis */}
        <section>
          <SectionHeader 
            title="Head-to-Head Comparison" 
            subtitle="Selecting the right tool for the job."
            icon={BarChart2}
            colorClass="border-blue-500"
          />
          
          <div className="prose prose-lg text-gray-600 max-w-none mb-8">
            <p>
              Both indices measure tail risk, but through fundamentally different lenses. SKEW provides a comprehensive statistical snapshot using the entire option chain, while SDEX offers a focused, real-time view of hedging costs at the most liquid strikes. Understanding when to use each is critical for effective risk management.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-50 border-b border-gray-200 p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">
              <div>Feature</div>
              <div className="text-rose-600">CBOE SKEW</div>
              <div className="text-emerald-600">Nations SkewDex</div>
            </div>
            <div className="p-4 space-y-2">
              <ComparisonRow label="Primary Metric" left="Statistical Skewness (Shape)" right="Relative Cost (Slope)" />
              <ComparisonRow label="Sensitivity" left="Deep Wings (Tail Risk)" right="1-Std Dev (Hedging Cost)" />
              <ComparisonRow label="Update Frequency" left="Daily (EOD)" right="Real-time (15s)" />
              <ComparisonRow label="Calculation Method" left="BKM Model-Free Moments" right="Fixed-Strike IV Differential" />
              <ComparisonRow label="Volatility Regime" left="Can rise in low-vol environments" right="Normalized for vol level" />
              <ComparisonRow label="Bullish Signal" left="> 140 (Over-hedged)" right="Intraday Spike & Reversal" />
              <ComparisonRow label="Best Use Case" left="Structural Analysis" right="Intraday Timing" />
              <ComparisonRow label="Data Requirements" left="Full option chain" right="ATM + 1SD strikes only" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-rose-50 border-rose-200">
              <h3 className="text-lg font-bold text-rose-900 mb-3">When to Use CBOE SKEW</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-rose-500 mt-1 shrink-0" size={16} />
                  <span><strong>Long-term positioning:</strong> Identifying structural shifts in tail risk pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-rose-500 mt-1 shrink-0" size={16} />
                  <span><strong>Academic research:</strong> Comparing to theoretical models and historical distributions</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-rose-500 mt-1 shrink-0" size={16} />
                  <span><strong>Regime detection:</strong> Spotting transitions from complacency to fear</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-rose-500 mt-1 shrink-0" size={16} />
                  <span><strong>Portfolio hedging:</strong> Determining if tail protection is overpriced</span>
                </li>
              </ul>
            </Card>

            <Card className="bg-emerald-50 border-emerald-200">
              <h3 className="text-lg font-bold text-emerald-900 mb-3">When to Use Nations SkewDex</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-emerald-500 mt-1 shrink-0" size={16} />
                  <span><strong>Intraday trading:</strong> Capturing mean-reversion in skew spikes</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-emerald-500 mt-1 shrink-0" size={16} />
                  <span><strong>Tactical hedging:</strong> Timing entry/exit for protection trades</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-emerald-500 mt-1 shrink-0" size={16} />
                  <span><strong>Volatility trading:</strong> Identifying dispersion opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="text-emerald-500 mt-1 shrink-0" size={16} />
                  <span><strong>Real-time monitoring:</strong> Tracking dealer positioning and flow</span>
                </li>
              </ul>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
            <h3 className="text-lg font-bold text-blue-900 mb-4">The Complementary Framework</h3>
            <p className="text-gray-700 mb-4">
              Professional traders don't choose between SKEW and SDEX—they use both in a complementary framework. SKEW provides the strategic context (are we in a high-skew regime?), while SDEX offers tactical timing (is skew spiking right now?).
            </p>
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <div className="font-bold text-blue-800 mb-2">Example: The Perfect Storm Setup</div>
              <div className="text-sm text-gray-700 space-y-2">
                <div>1. <strong>SKEW &gt; 140:</strong> Structural overhedging, market vulnerable to squeeze</div>
                <div>2. <strong>SDEX spikes intraday:</strong> Panic hedging creates temporary dislocation</div>
                <div>3. <strong>VIX/VVIX ratio normalizes:</strong> Fear subsiding, vol-of-vol declining</div>
                <div className="font-bold text-green-600 mt-2">→ Signal: Fade the fear, expect Vanna Crush rally</div>
              </div>
            </div>
          </Card>
        </section>

        {/* 5. Quantitative Implementation (Python) */}
        <section>
          <SectionHeader 
            title="Calculate it Yourself" 
            subtitle="Python implementation of the BKM Skew Logic."
            icon={Code}
            colorClass="border-slate-500"
          />
          <div className="space-y-6">
            <p className="text-gray-600">
              Below is the core logic to calculate BKM Skew from raw option chain data. This requires cleaning data for arbitrage violations first. The implementation follows the CBOE methodology with trapezoidal integration across strikes.
            </p>

            <Card className="bg-slate-50 border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-3">Prerequisites & Data Cleaning</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 mt-1 shrink-0" size={16} />
                  <span><strong>No-arbitrage filtering:</strong> Remove strikes violating put-call parity or butterfly spreads</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 mt-1 shrink-0" size={16} />
                  <span><strong>Bid-ask midpoints:</strong> Use midpoint prices to reduce noise</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 mt-1 shrink-0" size={16} />
                  <span><strong>Constant maturity:</strong> Interpolate to exactly 30 days using adjacent expirations</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 mt-1 shrink-0" size={16} />
                  <span><strong>Forward price:</strong> Calculate F = S × exp(r×T) for log-moneyness</span>
                </div>
              </div>
            </Card>

            <CodeBlock code={`import numpy as np

def calculate_bkm_skew(strikes, prices, is_call, S, r, T, F):
    """
    Calculate BKM model-free skewness from option chain.
    
    Parameters:
    -----------
    strikes : array-like
        Strike prices (sorted ascending)
    prices : array-like
        Option prices (OTM only, bid-ask midpoints)
    is_call : array-like
        Boolean array indicating if option is a call
    S : float
        Current spot price
    r : float
        Risk-free rate (annualized)
    T : float
        Time to maturity (years)
    F : float
        Forward price = S * exp(r*T)
    
    Returns:
    --------
    float : CBOE SKEW index value
    """
    # 1. Setup Data
    strikes = np.array(strikes)
    prices = np.array(prices)
    
    # 2. Calculate Strike Intervals (dK) - Trapezoidal Rule
    dK = np.zeros(len(strikes))
    if len(strikes) > 1:
        # Interior points: average of adjacent intervals
        dK[1:-1] = (strikes[2:] - strikes[:-2]) / 2
        # Boundary points
        dK[0] = strikes[1] - strikes[0]
        dK[-1] = strikes[-1] - strikes[-2]
    
    # 3. Initialize Moments
    V = 0  # Variance (2nd moment)
    W = 0  # Cubic (3rd moment - Skewness)
    X = 0  # Quartic (4th moment - Kurtosis)
    
    # 4. Summation Loop (Numerical Integration)
    for i, K in enumerate(strikes):
        # Filter for OTM only (puts below forward, calls above)
        if (K < F and is_call[i]) or (K > F and not is_call[i]):
            continue
        
        # Log-moneyness: k = ln(K/F)
        k_val = np.log(K / F)
        
        # BKM Weighting Functions (from Bakshi-Kapadia-Madan 1999)
        # Variance weight
        v_weight = (2 * (1 - k_val)) / (K**2)
        # Skewness weight (cubic)
        w_weight = (6 * k_val - 3 * (k_val**2)) / (K**2)
        # Kurtosis weight (quartic)
        x_weight = (12 * (k_val**2) - 4 * (k_val**3)) / (K**2)
        
        # Add weighted contributions
        V += v_weight * prices[i] * dK[i]
        W += w_weight * prices[i] * dK[i]
        X += x_weight * prices[i] * dK[i]
    
    # 5. Discount to Present Value
    df = np.exp(r * T)
    V *= df
    W *= df
    X *= df
    
    # 6. Mean Adjustment Correction
    # Account for drift in risk-neutral measure
    mu = np.exp(r * T) - 1 - V/2 - W/6 - X/24
    
    # 7. Calculate Raw Skewness (3rd standardized moment)
    # Skew = E[(X-μ)³] / σ³
    variance = V - mu**2
    if variance <= 0:
        return np.nan  # Invalid: negative variance
    
    skew_raw = (W - 3*mu*V + 2*mu**3) / (variance**1.5)
    
    # 8. Transform to CBOE Index Scale
    # SKEW = 100 - 10*S (so negative skew → values > 100)
    skew_index = 100 - 10 * skew_raw
    
    return skew_index


# Example Usage
def example_calculation():
    """
    Example: Calculate SKEW from sample option chain
    """
    # Sample data (simplified)
    strikes = np.array([4800, 4850, 4900, 4950, 5000, 5050, 5100, 5150, 5200])
    prices = np.array([5.2, 8.5, 13.2, 20.1, 30.5, 22.3, 15.8, 10.2, 6.5])
    is_call = np.array([False, False, False, False, False, True, True, True, True])
    
    S = 5000  # Spot price
    r = 0.05  # 5% risk-free rate
    T = 30/365  # 30 days to expiration
    F = S * np.exp(r * T)  # Forward price
    
    skew = calculate_bkm_skew(strikes, prices, is_call, S, r, T, F)
    print(f"CBOE SKEW Index: {skew:.2f}")
    
    # Interpretation
    if skew > 135:
        print("⚠️  Extreme tail risk pricing")
    elif skew > 120:
        print("📊 Elevated skew - market hedging")
    else:
        print("✅ Normal distribution approximation")

example_calculation()`} />

            <Card className="bg-blue-50 border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-3">Implementation Notes</h3>
              <div className="text-sm text-gray-700 space-y-3">
                <div>
                  <div className="font-bold text-blue-800 mb-1">1. Strike Selection</div>
                  <div>CBOE uses strikes from 2 standard deviations below to 2 standard deviations above the forward price. Strikes with zero bid should be excluded.</div>
                </div>
                <div>
                  <div className="font-bold text-blue-800 mb-1">2. Constant Maturity Interpolation</div>
                  <div>To achieve exactly 30 days, interpolate between two adjacent expirations using variance weighting: σ²(30d) = w₁σ²(T₁) + w₂σ²(T₂)</div>
                </div>
                <div>
                  <div className="font-bold text-blue-800 mb-1">3. Numerical Stability</div>
                  <div>The calculation can become unstable with sparse option chains or wide bid-ask spreads. Always validate that variance &gt; 0 before computing skewness.</div>
                </div>
                <div>
                  <div className="font-bold text-blue-800 mb-1">4. Production Considerations</div>
                  <div>Real implementations require handling corporate actions, early exercise for American options, and dividend adjustments to the forward price.</div>
                </div>
              </div>
            </Card>

            <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Code className="h-5 w-5" />
                Advanced: SkewDex Calculation
              </h3>
              <p className="text-sm text-slate-300 mb-4">
                For SkewDex, the calculation is simpler but requires real-time IV extraction:
              </p>
              <div className="font-mono text-sm bg-slate-950 p-4 rounded">
                <div className="text-emerald-400"># 1. Find ATM strike (50 delta)</div>
                <div className="text-slate-300">atm_strike = find_closest_strike(spot, delta=0.5)</div>
                <div className="text-slate-300">iv_atm = extract_implied_vol(atm_strike)</div>
                <div className="mt-2 text-emerald-400"># 2. Find 1SD OTM strike (16 delta)</div>
                <div className="text-slate-300">expected_move = calculate_expected_move(atm_straddle)</div>
                <div className="text-slate-300">otm_strike = spot - expected_move</div>
                <div className="text-slate-300">iv_otm = extract_implied_vol(otm_strike)</div>
                <div className="mt-2 text-emerald-400"># 3. Calculate relative premium</div>
                <div className="text-slate-300">sdex = ((iv_otm - iv_atm) / iv_atm) * 100</div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Market Mechanics: Vanna & Charm */}
        <section>
          <SectionHeader 
            title="Market Mechanics: The Vanna Crush" 
            subtitle="How high skew fuels market rallies."
            icon={GitCommit}
            colorClass="border-amber-500"
          />
          
          <div className="prose prose-lg text-gray-600 max-w-none mb-8">
            <p>
              The most powerful application of skew analysis is understanding the <strong>Vanna Crush</strong>—a self-reinforcing feedback loop where declining volatility forces dealers to buy back hedges, creating explosive upside moves. This mechanism explains why markets often rally hardest when fear subsides.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-amber-500 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">The Feedback Loop Anatomy</h3>
            <div className="relative border-l-2 border-amber-200 ml-4 space-y-8 pb-4">
              <div className="pl-8 relative">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-500"></div>
                <h4 className="font-bold text-gray-800">1. Fear Phase</h4>
                <p className="text-sm text-gray-600 mb-2">Market drops. Traders buy OTM Puts. <strong>IV Spikes, SKEW &gt; 140.</strong></p>
                <div className="text-xs text-gray-500 bg-amber-50 p-2 rounded">
                  Example: SPX drops 3%, VIX jumps from 15 to 25, SKEW rises to 145. Put volume surges 300%.
                </div>
              </div>
              <div className="pl-8 relative">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-400"></div>
                <h4 className="font-bold text-gray-800">2. Dealer Exposure</h4>
                <p className="text-sm text-gray-600 mb-2">Dealers are Short Puts. High IV means High Delta. Dealers sell Futures to hedge.</p>
                <div className="text-xs text-gray-500 bg-amber-50 p-2 rounded">
                  A 25 delta put at 15% IV becomes a 40 delta put at 25% IV. Dealers must sell more futures to maintain delta neutrality.
                </div>
              </div>
              <div className="pl-8 relative">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-300"></div>
                <h4 className="font-bold text-gray-800">3. The Trigger</h4>
                <p className="text-sm text-gray-600 mb-2">Event passes. IV begins to drop.</p>
                <div className="text-xs text-gray-500 bg-amber-50 p-2 rounded">
                  Fed announces dovish stance, earnings beat expectations, or simply time decay erodes premium. VIX starts declining.
                </div>
              </div>
              <div className="pl-8 relative">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
                <h4 className="font-bold text-green-600">4. The Vanna Crush</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Falling IV reduces Put Deltas (Vanna). Dealers are now over-hedged short. They must <span className="font-bold text-green-600">BUY BACK</span> Futures. This buying drives Spot UP, crushing Vol further. Loop repeats.
                </p>
                <div className="text-xs text-gray-500 bg-green-50 p-2 rounded">
                  The 40 delta put drops back to 25 delta. Dealers buy back 15 deltas worth of futures per contract. With billions in notional, this creates massive buying pressure.
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
              <h3 className="text-lg font-bold text-purple-900 mb-3">Understanding Vanna</h3>
              <p className="text-sm text-gray-700 mb-4">
                Vanna measures how an option's delta changes with respect to volatility. For puts, Vanna is typically negative: as IV rises, delta becomes more negative (larger hedge required).
              </p>
              <FormulaBox 
                formula="Vanna = ∂Delta / ∂σ = ∂Vega / ∂S"
                description="Second-order Greek: sensitivity of Delta to volatility changes"
              />
              <div className="text-xs text-gray-600 mt-3 bg-white p-3 rounded">
                <strong>Key Insight:</strong> When dealers are short puts and IV drops, their negative Vanna exposure forces them to buy the underlying, creating upward price pressure.
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
              <h3 className="text-lg font-bold text-blue-900 mb-3">The Charm Effect</h3>
              <p className="text-sm text-gray-700 mb-4">
                Charm (Delta Decay) measures how delta changes with time. As expiration approaches, OTM options lose delta rapidly, forcing additional dealer rehedging.
              </p>
              <FormulaBox 
                formula="Charm = ∂Delta / ∂t"
                description="Time decay of Delta—accelerates near expiration"
              />
              <div className="text-xs text-gray-600 mt-3 bg-white p-3 rounded">
                <strong>Expiration Pinning:</strong> Massive Charm exposure near monthly OPEX (3rd Friday) can pin prices to max pain strikes as dealers unwind hedges.
              </div>
            </Card>
          </div>

          <Card className="border-l-4 border-l-amber-500">
            <h3 className="text-lg font-bold text-amber-900 mb-3">Historical Case Study: March 2020 Recovery</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <div className="bg-red-100 text-red-700 rounded px-2 py-1 font-bold text-xs shrink-0">Mar 23</div>
                <div>
                  <strong>Peak Fear:</strong> SPX bottoms at 2,237. VIX hits 82.69 (all-time high). SKEW at 147. Massive put buying.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-yellow-100 text-yellow-700 rounded px-2 py-1 font-bold text-xs shrink-0">Mar 24-31</div>
                <div>
                  <strong>Fed Intervention:</strong> Unlimited QE announced. VIX drops to 65. Dealers begin buying back short hedges.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 text-green-700 rounded px-2 py-1 font-bold text-xs shrink-0">Apr 1-17</div>
                <div>
                  <strong>Vanna Crush:</strong> SPX rallies 29% in 15 trading days. VIX collapses to 40. SKEW normalizes to 125. Fastest bear market recovery in history.
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-50 rounded text-xs text-gray-600">
              <strong>Lesson:</strong> The combination of extreme SKEW, elevated VIX, and a catalyst for vol decline created the perfect setup for a Vanna-driven squeeze. Traders who faded the fear at peak SKEW captured the entire move.
            </div>
          </Card>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl mt-6">
            <h3 className="text-lg font-bold text-amber-900 mb-4">Quantifying the Vanna Exposure</h3>
            <p className="text-sm text-gray-700 mb-4">
              Professional desks calculate aggregate Vanna exposure across the option chain to estimate potential dealer flows:
            </p>
            <div className="bg-white p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-600 mb-2"># Aggregate Vanna Calculation</div>
              <div className="text-slate-800">Total_Vanna = Σ (Open_Interest × Vanna × 100 × Spot)</div>
              <div className="text-gray-600 mt-3 mb-2"># Dealer Flow Estimate (per 1% vol drop)</div>
              <div className="text-slate-800">Flow = Total_Vanna × -0.01 × Dealer_Short_Ratio</div>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              When Total_Vanna is large and negative (dealers short puts), a 1% drop in VIX can force billions in futures buying.
            </p>
          </div>
        </section>

        {/* 7. Trading Strategies */}
        <section>
          <SectionHeader 
            title="Trading Strategies" 
            subtitle="Actionable playbooks based on skew regimes."
            icon={BookOpen}
            colorClass="border-purple-500"
          />
          
          <div className="prose prose-lg text-gray-600 max-w-none mb-8">
            <p>
              Understanding skew is only valuable if it translates into actionable trades. Below are four battle-tested strategies that exploit skew anomalies, each with specific entry criteria, risk parameters, and exit rules. These strategies combine SKEW, SDEX, and complementary indicators for robust signal generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <StrategyCard 
              title="The Nervous Bull"
              icon={TrendingUp}
              color="border-indigo-500"
              signal="VIX < 20 AND SKEW > 140"
              action="Contrarian Buy. Expect Vanna Crush Rally."
            />
            <StrategyCard 
              title="Gamma Flush"
              icon={AlertTriangle}
              color="border-red-500"
              signal="Price < Gamma Flip AND Low SDEX"
              action="Short. No skew cushion implies freefall."
            />
            <StrategyCard 
              title="Vol of Vol Shock"
              icon={Activity}
              color="border-purple-500"
              signal="VVIX / VIX Ratio > 6.0"
              action="Long Volatility. Instability ahead."
            />
            <StrategyCard 
              title="Trend Confluence"
              icon={Layers}
              color="border-blue-500"
              signal="Price > 200 SMA + High Skew"
              action="Buy Dips. Bull market wall of worry."
            />
          </div>

          <div className="space-y-6">
            {/* Strategy 1: The Nervous Bull */}
            <Card className="border-l-4 border-l-indigo-500">
              <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Strategy 1: The Nervous Bull
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-xs font-bold text-indigo-600 uppercase mb-2">Entry Criteria</div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• SKEW &gt; 140</li>
                    <li>• VIX &lt; 20</li>
                    <li>• SPX &gt; 50-day MA</li>
                    <li>• Put/Call Ratio &gt; 1.2</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-xs font-bold text-indigo-600 uppercase mb-2">Position Structure</div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Long SPY/SPX calls</li>
                    <li>• 30-45 DTE</li>
                    <li>• 5-10 delta OTM</li>
                    <li>• Risk: 1-2% of portfolio</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-xs font-bold text-indigo-600 uppercase mb-2">Exit Rules</div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• SKEW drops below 125</li>
                    <li>• 50% profit target</li>
                    <li>• 30% stop loss</li>
                    <li>• Time decay: exit at 14 DTE</li>
                  </ul>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg text-sm text-gray-700">
                <strong>Rationale:</strong> Extreme SKEW in low-vol environments signals overhedging. When fear subsides, Vanna forces dealer buying, creating explosive rallies. The strategy profits from both directional move and vol crush.
              </div>
            </Card>

            {/* Strategy 2: Gamma Flush */}
            <Card className="border-l-4 border-l-red-500">
              <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Strategy 2: Gamma Flush
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-xs font-bold text-red-600 uppercase mb-2">Entry Criteria</div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Price &lt; Gamma Flip Point</li>
                    <li>• SDEX &lt; 15 (low skew)</li>
                    <li>• Negative GEX</li>
                    <li>• Breakdown of support</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-xs font-bold text-red-600 uppercase mb-2">Position Structure</div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Short SPY/SPX futures</li>
                    <li>• Or long puts (7-14 DTE)</li>
                    <li>• ATM or 1 strike OTM</li>
                    <li>• Risk: 2-3% of portfolio</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-xs font-bold text-red-600 uppercase mb-2">Exit Rules</div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• SDEX spikes above 25</li>
                    <li>• Price reclaims Gamma Flip</li>
                    <li>• 40% profit target</li>
                    <li>• 20% stop loss</li>
                  </ul>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-sm text-gray-700">
                <strong>Rationale:</strong> Below the Gamma Flip, dealers are short gamma and must sell into weakness. Low SDEX means no skew cushion—puts are cheap, indicating complacency. This setup creates cascading sell-offs.
              </div>
            </Card>

            {/* Strategy 3: Vol of Vol Shock */}
            <Card className="border-l-4 border-l-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Strategy 3: Vol of Vol Shock
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-xs font-bold text-purple-600 uppercase mb-2">Entry Criteria</div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• VVIX/VIX ratio &gt; 6.0</li>
                    <li>• SKEW rising rapidly</li>
                    <li>• VIX term structure inverted</li>
                    <li>• Macro catalyst pending</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-xs font-bold text-purple-600 uppercase mb-2">Position Structure</div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Long VIX calls</li>
                    <li>• Long VXX/UVXY</li>
                    <li>• Long straddles on SPX</li>
                    <li>• Risk: 1-2% of portfolio</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-xs font-bold text-purple-600 uppercase mb-2">Exit Rules</div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• VVIX/VIX drops below 5.0</li>
                    <li>• VIX spikes &gt; 30</li>
                    <li>• 100% profit target</li>
                    <li>• 50% stop loss</li>
                  </ul>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-sm text-gray-700">
                <strong>Rationale:</strong> VVIX measures the volatility of VIX—when it's elevated relative to VIX, it signals uncertainty about uncertainty. This precedes regime shifts and vol explosions. The strategy profits from convexity.
              </div>
            </Card>

            {/* Strategy 4: Trend Confluence */}
            <Card className="border-l-4 border-l-blue-500">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Strategy 4: Trend Confluence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-xs font-bold text-blue-600 uppercase mb-2">Entry Criteria</div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Price &gt; 200-day SMA</li>
                    <li>• SKEW &gt; 130</li>
                    <li>• Pullback to 20-day MA</li>
                    <li>• Positive breadth</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-xs font-bold text-blue-600 uppercase mb-2">Position Structure</div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Long equity/ETF</li>
                    <li>• Or sell cash-secured puts</li>
                    <li>• 30-45 DTE, 10-20 delta</li>
                    <li>• Risk: 5-10% of portfolio</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-xs font-bold text-blue-600 uppercase mb-2">Exit Rules</div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Price &lt; 200-day SMA</li>
                    <li>• SKEW drops below 115</li>
                    <li>• Trailing stop: 8%</li>
                    <li>• Rebalance monthly</li>
                  </ul>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700">
                <strong>Rationale:</strong> In established uptrends, high SKEW represents a "wall of worry"—excessive hedging that creates buying pressure on dips. The strategy buys fear in bull markets, profiting from mean reversion and trend continuation.
              </div>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 mt-8">
            <h3 className="text-lg font-bold text-purple-900 mb-4">Risk Management Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="font-bold text-purple-800 mb-2">Position Sizing</div>
                <ul className="space-y-1 text-gray-700">
                  <li>• Never risk more than 2% per trade</li>
                  <li>• Scale into positions (3 tranches)</li>
                  <li>• Reduce size in low-conviction setups</li>
                  <li>• Maximum 10% portfolio in skew strategies</li>
                </ul>
              </div>
              <div>
                <div className="font-bold text-purple-800 mb-2">Correlation Management</div>
                <ul className="space-y-1 text-gray-700">
                  <li>• Don't run multiple long-vol strategies simultaneously</li>
                  <li>• Balance directional with volatility trades</li>
                  <li>• Monitor aggregate delta and vega exposure</li>
                  <li>• Hedge tail risk with cheap OTM options</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded border border-purple-200 text-xs text-gray-600">
              <strong>Critical Warning:</strong> Skew strategies are timing-dependent and can experience extended drawdowns. Always use stop losses, avoid overleveraging, and remember that past performance doesn't guarantee future results. These strategies require active monitoring and should not be set-and-forget.
            </div>
          </Card>
        </section>

      </div>
    </ArticleFrame>
  );
}
