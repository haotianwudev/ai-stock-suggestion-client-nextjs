'use client';

import React from 'react';
import { TrendingUp, Shield, Activity, AlertTriangle, Layers, GitMerge, BarChart2, Calculator, Database } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

export default function GeometryOfRatesArticle() {
  return (
    <ArticleFrame slug="geometry-of-rates-pca-fixed-income-markets">
      <div className="max-w-4xl mx-auto mb-16 px-6">
        <InfographicSlot alt="PCA Fixed Income Markets Infographic" />
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-24">
          {/* Section 1: The Dimensionality Challenge */}
          <Section 
            id="dimensionality"
            title="1. The Dimensionality Challenge"
            icon={<Layers className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />}
            color="blue"
          >
            <div className="prose prose-slate max-w-none">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-6">
                Fixed income markets suffer from the <strong>"curse of dimensionality."</strong> A portfolio manager isn't just exposed to one price, but to a continuous curve of rates spanning from overnight to 30+ years.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 my-8">
                <Card title="The Problem: High Correlation" color="red">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Modeling risk using every single tenor (2Y, 3Y, 5Y, etc.) leads to unstable models due to <strong>Multicollinearity</strong>.
                  </p>
                  <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-4 rounded-lg border border-red-100 font-mono text-xs text-[#BC4128] dark:text-[#E2694A]">
                    <strong>Input:</strong> 30+ correlated yields<br/>
                    <strong>Issue:</strong> Corr(2Y, 3Y) ≈ 0.98<br/>
                    <span className="font-bold text-[#BC4128] dark:text-[#E2694A]">⚠ Result: Unstable Betas & Overfitting</span>
                  </div>
                </Card>
                
                <Card title="The Solution: Factor Reduction" color="green">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    PCA re-maps these correlated rates into orthogonal (independent) factors.
                  </p>
                  <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-4 rounded-lg border border-green-100 font-mono text-xs text-[#1D8A70] dark:text-[#3CBF9C]">
                    <strong>Input:</strong> Covariance Matrix<br/>
                    <strong>Output:</strong> 3 Independent Factors<br/>
                    <span className="font-bold text-[#1D8A70] dark:text-[#3CBF9C]">✓ Result: Clean, Additive Risk Drivers</span>
                  </div>
                </Card>
              </div>
              
              <p>
                Litterman and Scheinkman (1991) empirically proved that <strong>98%</strong> of yield curve variance can be explained by just three movements. This transforms a chaotic system of 30 variables into a manageable set of 3 "bets."
              </p>
            </div>
          </Section>

          {/* Section 2: Mathematical Foundations */}
          <Section 
            id="math"
            title="2. The Mathematical Engine"
            icon={<Calculator className="w-6 h-6 text-purple-500" />}
            color="purple"
          >
            <div className="space-y-8">
              <div className="bg-white dark:bg-[#0A0D14] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">Decomposing the Covariance Matrix</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  The input is a matrix X of historical yield changes. PCA relies on the <strong>Spectral Theorem</strong> to decompose the covariance matrix S. The Eigenvalues (λ) tell us how much "energy" (variance) each factor explains.
                </p>
                
                <div className="overflow-x-auto mb-8">
                  <div className="bg-slate-900 text-slate-200 p-6 rounded-lg font-mono text-sm shadow-inner">
                    <div className="mb-2 text-slate-400">// Eigendecomposition</div>
                    <div className="text-yellow-400 text-lg mb-4">S = V Λ V<sup>T</sup></div>
                    
                    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                      <span className="text-[#A8672E] dark:text-[#D08F52]">S</span> 
                      <span>Covariance Matrix (Risk magnitude)</span>
                      <span className="text-purple-400">V</span> 
                      <span>Eigenvectors (The "Shape" of the curve move)</span>
                      <span className="text-pink-400">Λ</span> 
                      <span>Eigenvalues (The "Power" of the move)</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-[#14171B] rounded-lg p-6 border border-slate-100 dark:border-slate-800">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                    Variance Explained (The Scree Plot)
                  </h4>
                  <div className="flex items-end justify-center gap-8 h-64 bg-white dark:bg-[#0A0D14] rounded-lg p-4 border border-slate-200 dark:border-slate-800">
                    {/* PC1 Bar */}
                    <div className="flex flex-col items-center group">
                      <div className="text-center text-xs font-bold text-[#A8672E] dark:text-[#D08F52] mb-2 opacity-0 group-hover:opacity-100 transition-opacity">90%</div>
                      <div className="w-16 bg-[#A8672E] dark:bg-[#D08F52] rounded-t-lg shadow-lg shadow-blue-200 opacity-90 hover:opacity-100 transition-all" style={{height: '216px'}}></div>
                      <div className="text-center mt-3 font-semibold text-slate-600 dark:text-slate-400 text-sm">PC1: Level</div>
                    </div>
                    
                    {/* PC2 Bar */}
                    <div className="flex flex-col items-center group">
                      <div className="text-center text-xs font-bold text-purple-600 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">8%</div>
                      <div className="w-16 bg-purple-500 rounded-t-lg shadow-lg shadow-purple-200 opacity-90 hover:opacity-100 transition-all" style={{height: '54px'}}></div>
                      <div className="text-center mt-3 font-semibold text-slate-600 dark:text-slate-400 text-sm">PC2: Slope</div>
                    </div>
                    
                    {/* PC3 Bar */}
                    <div className="flex flex-col items-center group">
                      <div className="text-center text-xs font-bold text-pink-600 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">2%</div>
                      <div className="w-16 bg-pink-500 rounded-t-lg shadow-lg shadow-pink-200 opacity-90 hover:opacity-100 transition-all" style={{height: '24px'}}></div>
                      <div className="text-center mt-3 font-semibold text-slate-600 dark:text-slate-400 text-sm">PC3: Curvature</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-4 text-center">
                    Relative magnitude of eigenvalues typically observed in UST markets.
                  </p>
                </div>
              </div>
            </div>
          </Section>
          {/* Section 3: The Factor Structure */}
          <Section 
            id="factors"
            title="3. The Big Three Factors"
            icon={<BarChart2 className="w-6 h-6 text-pink-500" />}
            color="pink"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Regardless of the market (US, EU, JP), the first three principal components always take these distinct geometric shapes. They correlate strongly with specific macroeconomic drivers.
            </p>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <FactorCard 
                name="Level" 
                pc="PC1" 
                variance="~90%" 
                desc="Parallel Shift"
                color="blue"
                data={[20, 20, 20, 20, 20]} 
                macro="Inflation Expectations & Fed Targets"
              />
              <FactorCard 
                name="Slope" 
                pc="PC2" 
                variance="~8%" 
                desc="Steepening / Flattening"
                color="purple"
                data={[-20, -10, 0, 10, 20]} 
                pivot={true}
                macro="Business Cycle (Recession = Inverted)"
              />
              <FactorCard 
                name="Curvature" 
                pc="PC3" 
                variance="~2%" 
                desc="Convexity / Butterfly"
                color="pink"
                data={[15, -10, -15, -10, 15]} 
                macro="Volatility & Supply/Demand Segmentation"
              />
            </div>
            
            <div className="mt-8 bg-slate-100 p-4 rounded-lg text-sm text-slate-600 dark:text-slate-400 border-l-4 border-slate-400">
              <strong>Key Insight:</strong> While PC1 is called "Parallel," it isn't perfectly flat. Short rates often move more than long rates (higher volatility), which is why <strong>Covariance PCA</strong> is preferred over Correlation PCA for hedging—it captures the magnitude of the move, not just the shape.
            </div>
          </Section>

          {/* Section 4: Advanced Hedging */}
          <Section 
            id="hedging"
            title="4. Vector Hedging vs. Duration"
            icon={<Shield className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />}
            color="teal"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 font-serif">Why Duration Fails</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Traditional Duration (DV01) assumes parallel shifts. If you are Long 30Y and Short 2Y to be "duration neutral," you are actually massively exposed to <strong>Slope Risk</strong>.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  If the curve steepens, you lose on the Long 30Y (yields up, price down) and lose on the Short 2Y (yields down, price up). A "hedged" book can bleed capital.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800">
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-4 border-b pb-2">The Immunization Equation</h4>
                <div className="font-mono text-xs md:text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#14171B] p-3 rounded mb-4">
                  [Sens<sub>H,1</sub> ... ] [w<sub>1</sub>] &nbsp;&nbsp; [-Sens<sub>P,1</sub>]<br/>
                  [Sens<sub>H,2</sub> ... ] [w<sub>2</sub>] = [-Sens<sub>P,2</sub>]<br/>
                  [Sens<sub>H,3</sub> ... ] [w<sub>3</sub>] &nbsp;&nbsp; [-Sens<sub>P,3</sub>]
                </div>
                <p className="text-xs text-slate-500 italic">
                  Solving this linear system gives the exact weights (w) to neutralize Level, Slope, and Curvature simultaneously.
                </p>
              </div>
            </div>

            {/* Comparative Table */}
            <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-lg">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-[#14171B] text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-3">Strategy</th>
                    <th className="px-6 py-3">Hedge Instrument</th>
                    <th className="px-6 py-3">Risk Exposure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white dark:bg-[#0A0D14]">
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">DV01 Neutral</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Any bond (e.g., 10Y)</td>
                    <td className="px-6 py-4 text-[#BC4128] dark:text-[#E2694A] font-medium">Slope Risk & Curvature Risk</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">PCA Level + Slope</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Two bonds (e.g., 2Y and 10Y)</td>
                    <td className="px-6 py-4 text-yellow-600 font-medium">Curvature Risk only</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">Full Vector Hedge</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Three bonds (e.g., 2Y, 5Y, 30Y)</td>
                    <td className="px-6 py-4 text-[#1D8A70] dark:text-[#3CBF9C] font-medium">Idiosyncratic Risk only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* Section 5: The Butterfly Trade */}
          <Section 
            id="butterfly"
            title="5. Alpha Strategy: The PCA Butterfly"
            icon={<GitMerge className="w-6 h-6 text-[#BC4128] dark:text-[#E2694A]" />}
            color="orange"
          >
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-orange-900 mb-2 font-serif">Trading the Residuals</h3>
                  <p className="text-orange-800 mb-4 leading-relaxed">
                    A "Butterfly" trade involves buying the "Body" (e.g., 5Y) and selling the "Wings" (2Y and 10Y). Using PCA weights ensures the trade is immune to broad market moves (Level) and tilts (Slope), isolating pure <strong>Relative Value</strong>.
                  </p>
                  
                  <div className="bg-white dark:bg-[#0A0D14]/60 p-4 rounded-lg border border-orange-200 backdrop-blur-sm">
                    <h4 className="font-bold text-orange-900 text-sm mb-2">The Algorithm:</h4>
                    <ol className="space-y-2 text-sm text-orange-800 list-decimal list-inside">
                      <li>Regress bond yield on PC1, PC2, PC3 scores.</li>
                      <li>Calculate Model Yield: y<sub>model</sub> = β₁P₁ + β₂P₂ + β₃P₃</li>
                      <li>Compute Residual: ε = y<sub>market</sub> - y<sub>model</sub></li>
                      <li><strong>Signal:</strong> If ε &gt; 1.75σ, the bond is Cheap. Buy.</li>
                    </ol>
                  </div>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative w-full h-56 bg-white dark:bg-[#0A0D14] rounded-lg shadow-inner border border-orange-200 flex items-center justify-center p-4">
                    {/* Visualizing Mean Reversion */}
                    <svg className="w-full h-full" viewBox="0 0 200 120">
                      {/* Grid */}
                      <line x1="0" y1="60" x2="200" y2="60" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
                      
                      {/* Mean Reversion Path */}
                      <path d="M0,60 Q20,20 40,60 T80,100 T120,20 T160,60 T200,70" fill="none" stroke="#f97316" strokeWidth="2" />
                      
                      {/* Buy Signal */}
                      <circle cx="80" cy="100" r="4" fill="#dc2626" className="animate-pulse" />
                      <text x="85" y="115" fontSize="10" fill="#dc2626" fontWeight="bold">Buy (Cheap)</text>
                      <text x="85" y="125" fontSize="8" fill="#9ca3af">Yield too high vs model</text>
                      
                      {/* Sell Signal */}
                      <circle cx="120" cy="20" r="4" fill="#16a34a" className="animate-pulse" />
                      <text x="125" y="15" fontSize="10" fill="#16a34a" fontWeight="bold">Sell (Rich)</text>
                      <text x="125" y="25" fontSize="8" fill="#9ca3af">Yield too low vs model</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Section 6: Risks */}
          <Section 
            id="risks"
            title="6. Regime Change & Risks"
            icon={<AlertTriangle className="w-6 h-6 text-[#BC4128] dark:text-[#E2694A]" />}
            color="red"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              PCA is a statistical description of history, not a physical law. The <strong>2022 Inflation Shock</strong> broke many PCA models.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#0A0D14] p-5 rounded-lg border-l-4 border-[#BC4128] dark:border-[#E2694A] shadow-sm">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4"/> Correlation Break
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Historically, Stocks and Bonds were negatively correlated ("Flight to Quality"). In 2022, they fell together due to inflation. Models relying on Bonds to hedge Stocks failed catastrophically.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[#0A0D14] p-5 rounded-lg border-l-4 border-[#BC4128] dark:border-[#E2694A] shadow-sm">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4"/> Slope Inversion
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Normally, recessions cause steepening (Fed cuts rates). In 2022, recession fears coincided with Fed hiking, causing deep inversion. The classic "Steepener" bet lost money.
                </p>
              </div>
            </div>
          </Section>

          {/* Section 7: Implementation Recipe */}
          <Section 
            id="recipe"
            title="7. Implementation Recipe"
            icon={<Database className="w-6 h-6 text-[#A8672E] dark:text-[#D08F52]" />}
            color="indigo"
          >
            <div className="bg-slate-900 rounded-xl p-8 text-slate-300 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Layers className="w-32 h-32" />
              </div>
              
              <h3 className="text-[#A8672E] dark:text-[#D08F52] font-bold text-lg mb-6 border-b border-slate-700 pb-2 font-serif">
                Step-by-Step Implementation
              </h3>
              
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4">
                  <div className="min-w-[24px] h-6 rounded-full bg-[#A8672E] dark:bg-[#D08F52]/20 text-[#A8672E] dark:text-[#D08F52] flex items-center justify-center font-bold">1</div>
                  <div>
                    <strong className="text-slate-100 block mb-1">Data Preparation</strong>
                    <p>Fetch daily yield data (e.g., FRED or Bloomberg) for key tenors: 1Y, 2Y, 3Y, 5Y, 7Y, 10Y, 20Y, 30Y.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="min-w-[24px] h-6 rounded-full bg-[#A8672E] dark:bg-[#D08F52]/20 text-[#A8672E] dark:text-[#D08F52] flex items-center justify-center font-bold">2</div>
                  <div>
                    <strong className="text-slate-100 block mb-1">Differencing</strong>
                    <p>Compute daily changes (absolute or log changes). <span className="text-[#1D8A70] dark:text-[#3CBF9C]">Yield_Diff = Yield(t) - Yield(t-1)</span>. Do NOT run PCA on raw yield levels (they are non-stationary).</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="min-w-[24px] h-6 rounded-full bg-[#A8672E] dark:bg-[#D08F52]/20 text-[#A8672E] dark:text-[#D08F52] flex items-center justify-center font-bold">3</div>
                  <div>
                    <strong className="text-slate-100 block mb-1">Covariance Matrix</strong>
                    <p>Calculate the covariance matrix of the differenced data. Use a rolling window (e.g., 1-year lookback) to capture changing regimes.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="min-w-[24px] h-6 rounded-full bg-[#A8672E] dark:bg-[#D08F52]/20 text-[#A8672E] dark:text-[#D08F52] flex items-center justify-center font-bold">4</div>
                  <div>
                    <strong className="text-slate-100 block mb-1">Eigendecomposition</strong>
                    <p>Compute Eigenvectors (Loadings) and Eigenvalues. The first 3 eigenvectors form your factor basis.</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

      </div>
    </ArticleFrame>
  );
}

// Component interfaces
interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  color: string;
}

interface CardProps {
  title: string;
  children: React.ReactNode;
  color: string;
}

interface FactorCardProps {
  name: string;
  pc: string;
  variance: string;
  desc: string;
  color: 'blue' | 'purple' | 'pink';
  data: number[];
  pivot?: boolean;
  macro?: string;
}

// Reusable Section Component
const Section = ({ id, title, children, icon, color }: SectionProps) => {
  const colorClasses: Record<string, string> = {
    blue: "text-[#A8672E] dark:text-[#D08F52]",
    purple: "text-purple-600", 
    pink: "text-pink-600",
    teal: "text-[#A8672E] dark:text-[#D08F52]",
    orange: "text-[#BC4128] dark:text-[#E2694A]",
    red: "text-[#BC4128] dark:text-[#E2694A]",
    indigo: "text-[#A8672E] dark:text-[#D08F52]",
  };

  return (
    <section className="relative group">
      <div className="absolute -left-4 -top-4 w-12 h-12 rounded-2xl bg-white dark:bg-[#0A0D14] shadow-lg border border-slate-100 dark:border-slate-800 flex items-center justify-center z-10">
        {icon}
      </div>
      <div className="pl-6 pt-2">
        <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${colorClasses[color] || "text-slate-800 dark:text-slate-200"}`}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

// Simple Card Component
const Card = ({ title, children, color }: CardProps) => {
  const borderColors: Record<string, string> = {
    red: "border-red-200 hover:border-red-300",
    green: "border-green-200 hover:border-green-300",
  };

  return (
    <div className={`bg-white dark:bg-[#0A0D14] p-6 rounded-xl shadow-sm border ${borderColors[color]} transition-all duration-300 hover:shadow-md`}>
      <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-3 font-serif">{title}</h3>
      {children}
    </div>
  );
};

// Factor Visualization Card
const FactorCard = ({ name, pc, variance, desc, color, data, pivot = false, macro }: FactorCardProps) => {
  const colorMap = {
    blue: { stroke: "#2563eb", bg: "bg-[#A8672E]/10 dark:bg-[#D08F52]/10", text: "text-[#A8672E] dark:text-[#D08F52]" },
    purple: { stroke: "#9333ea", bg: "bg-purple-50", text: "text-purple-700" },
    pink: { stroke: "#db2777", bg: "bg-pink-50", text: "text-pink-700" },
  };

  const c = colorMap[color];

  return (
    <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className={`p-4 ${c.bg} border-b border-slate-100 dark:border-slate-800 flex justify-between items-center`}>
        <div>
          <h3 className={`font-bold ${c.text}`}>{name}</h3>
          <p className="text-xs text-slate-500">{pc} • {variance} Var</p>
        </div>
        <TrendingUp className={`w-5 h-5 ${c.text}`} />
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="h-32 w-full flex items-center justify-center relative mb-4">
          {/* Simple Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-4 gap-4 opacity-10 pointer-events-none">
            <div className="border-r border-slate-400 h-full"></div>
            <div className="border-r border-slate-400 h-full"></div>
            <div className="border-r border-slate-400 h-full"></div>
            <div className="border-r border-slate-400 h-full"></div>
          </div>
          
          {/* The SVG Line */}
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
            {/* Zero Line */}
            <line x1="0" y1="25" x2="100" y2="25" stroke="#e2e8f0" strokeWidth="1" />
            
            {/* Data Line */}
            <polyline 
              points={data.map((y: number, i: number) => `${i * 25},${25 - y}`).join(' ')}
              fill="none"
              stroke={c.stroke}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Points */}
            {data.map((y: number, i: number) => (
              <circle key={i} cx={i * 25} cy={25 - y} r="2" fill="white" stroke={c.stroke} strokeWidth="2" />
            ))}
            
            {pivot && (
              <circle cx="50" cy="25" r="4" fill="none" stroke="#64748b" strokeDasharray="2 2" />
            )}
          </svg>
        </div>
        
        <p className="text-sm text-slate-700 dark:text-slate-300 font-bold text-center mb-1">{desc}</p>
        {macro && (
          <p className="text-xs text-slate-500 text-center italic mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
            Drivers: {macro}
          </p>
        )}
      </div>
    </div>
  );
};