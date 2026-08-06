'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { ShieldCheck, AlertTriangle, Landmark, TrendingDown, Unlock, Network, Building2, Briefcase, ChevronRight, Calculator, TrendingUp } from 'lucide-react';

const regTData = [
  { metric: "Total Market Value (TMV)", calc: "Quantity × Current Market Price", example: "1,000 shares × $100 = $100,000" },
  { metric: "Initial Margin Requirement", calc: "TMV × 0.50", example: "$100,000 × 0.50 = $50,000" },
  { metric: "Margin Loan", calc: "TMV - Initial Margin", example: "$100,000 - $50,000 = $50,000" },
  { metric: "Maintenance Margin", calc: "TMV × 0.25", example: "$100,000 × 0.25 = $25,000" },
  { metric: "Account Equity", calc: "TMV - Margin Loan", example: "Assuming price drops to $60: $60,000 - $50,000 = $10,000" },
  { metric: "Current Margin Percentage", calc: "Account Equity / TMV", example: "$10,000 / $60,000 = 16.67%" },
];

const wclInitialData = [
  { param: "Long Equity Position", val: "100,000 shares of XYZ Corp at $100 per share ($10,000,000 TMV)" },
  { param: "Short Put Options", val: "200 contracts (20,000 shares) at Strike $90, 30 days to expiry" },
  { param: "Implied Volatility (σ)", val: "25%" },
  { param: "Risk-Free Rate (r)", val: "5%" },
  { param: "Borrowed Cash (Margin Loan)", val: "-$3,000,000" },
];

const wclStressedData = [
  { metric: "Price Shock Applied", val: "-15.0% (New Price: $85.00)" },
  { metric: "Volatility Shock Applied", val: "+25.0% (New Volatility: 31.25%)" },
  { metric: "Stressed Stock Value", val: "$8,500,000" },
  { metric: "Stressed Put Option Price", val: "$5.966" },
  { metric: "Stressed Put Position Value", val: "-$119,320" },
  { metric: "Stressed Equity", val: "$8,500,000 - $119,320 - $3,000,000 = $5,380,680" },
  { metric: "Total Projected Loss (WCL)", val: "$1,615,586", highlight: true },
];

const houseExcessData = [
  { metric: "Total Market Value (TMV)", val: "$2,000,000" },
  { metric: "Margin Loan Balance", val: "$1,000,000" },
  { metric: "Account Equity", val: "$1,000,000" },
  { metric: "Regulatory Maintenance (25%)", val: "$500,000" },
  { metric: "House Maintenance (35%)", val: "$700,000" },
  { metric: "Regulatory Excess", val: "$1,000,000 - $500,000 = $500,000" },
  { metric: "House Excess", val: "$1,000,000 - $700,000 = $300,000", highlight: true },
];

const shortfallData = [
  { metric: "New Account Equity", val: "$1,400,000 (TMV) - $1,000,000 (Loan) = $400,000" },
  { metric: "New House Requirement (35%)", val: "0.35 × $1,400,000 = $490,000" },
  { metric: "Calculated Shortfall", val: "$490,000 - $400,000 = $90,000", highlight: true },
  { metric: "Required Cash Deposit", val: "$90,000" },
  { metric: "Alternative Forced Liquidation", val: "$90,000 / (1 - 0.35) = $138,461", alert: true },
];

const releaseData = [
  { framework: "Regulation T", size: "$2,500,000", factor: "50%", limit: "$1,250,000", buffer: "$0 (High Margin Call Risk)" },
  { framework: "Portfolio Margin (PM)", size: "$2,500,000", factor: "Up to 85% (Risk-Based)", limit: "$2,125,000", buffer: "$875,000 (Safe House Excess)" },
];

const comparisonData = [
  { char: "Primary Client Base", pb: "Quantitative Hedge Funds, Prop Trading Firms", wm: "Founders, Family Offices, UHNW Individuals" },
  { char: "Core Asset Types", pb: "Swaps, OTC Derivatives, High-Frequency Equities", wm: "Concentrated Equities, Structured Notes, Discretionary Funds" },
  { char: "Margin Methodology", pb: "Portfolio Margin, Cross-Margining, Expected Shortfall", wm: "Lombard Lending, Securities-Backed Lending (SBL), Advance Ratios" },
  { char: "Leverage Objectives", pb: "Extreme leverage (often 5:1 to 10:1 or more via derivatives)", wm: "Moderate liquidity extraction (typically 50% to 70% LTV)" },
  { char: "Key Risk Driver", pb: "Correlation breakdowns, basis risk, liquidity squeezes", wm: "Concentrated stock risk, single-entity gap risk" },
  { char: "Primary Focus", pb: "Maximizing capital efficiency, maximizing Margin Release", wm: "Tax deferral, lifestyle financing, avoiding forced liquidations" },
];

interface SectionCardProps {
  id: string;
  icon: React.ElementType;
  title: string;
  colorClass: string;
  bgLight: string;
  children: React.ReactNode;
}

const SectionCard = ({ id, icon: Icon, title, colorClass, bgLight, children }: SectionCardProps) => (
  <section id={id} className="scroll-mt-12 mb-16 opacity-100 translate-y-0 transition-all duration-700 ease-in-out">
    <div className={`bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden relative`}>
      <div className={`h-2 w-full ${colorClass}`}></div>
      <div className="p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-4 rounded-2xl ${bgLight} text-current`}>
            <Icon size={32} className={colorClass.replace('bg-', 'text-')} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">{title}</h2>
        </div>
        <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  </section>
);

interface SimpleTableProps {
  headers: string[];
  rows: any[];
  renderRow: (row: any, i: number) => React.ReactNode;
}

const SimpleTable = ({ headers, rows, renderRow }: SimpleTableProps) => (
  <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-sm">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-slate-50 border-b border-slate-200">
          {headers.map((h, i) => (
            <th key={i} className="p-4 font-semibold text-slate-700 whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {rows.map((row, i) => renderRow(row, i))}
      </tbody>
    </table>
  </div>
);

export default function CounterpartyCreditRiskArticle() {
  return (
    <ArticleFrame slug="infrastructure-counterparty-credit-risk-margin-wcl-excess-shortfall-release">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-20 pb-32">
        {/* Intro Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/20 p-8 md:p-12 border border-slate-100 mb-20 text-lg text-slate-700 leading-relaxed text-center">
          The extension of credit&mdash;whether provided to a highly levered quantitative hedge fund deploying complex statistical arbitrage strategies, or to an ultra-high-net-worth (UHNW) individual seeking tax-efficient liquidity&mdash;is governed by a strict set of mathematically derived risk metrics. This tutorial explores the methodologies and systemic importance of these metrics.
        </div>

        <InfographicSlot
          alt="Infrastructure of Counterparty Credit Risk Infographic"
          label="The Taxonomy of Core Risk Metrics"
        />

        {/* Risk Metrics Taxonomy */}
        <div className="mb-24 mt-12">
          <div className="flex items-center gap-4 mb-12 justify-center">
            <h2 className="text-4xl font-bold text-slate-800">The Taxonomy of Core Risk Metrics</h2>
          </div>

          {/* Margin Section */}
          <SectionCard 
            id="margin" 
            title="Margin: The Foundational Buffer" 
            icon={ShieldCheck} 
            colorClass="bg-blue-500 text-blue-600" 
            bgLight="bg-blue-50"
          >
            <p>
              Margin represents the absolute minimum amount of equity a client must hold in their account to support a leveraged position. It acts as a protective buffer, absorbing initial market fluctuations before the lending institution&apos;s capital is exposed to risk.
            </p>
            <p className="mt-4">
              In the US, equity margin has historically been governed by the Federal Reserve&apos;s <strong>Regulation T (Reg T)</strong>, which typically requires 50% initial margin. However, static rules ignore diversification. The industry has largely moved toward risk-based <strong>Portfolio Margin (PM)</strong>, which assesses the net risk of a holistically hedged portfolio.
            </p>
            
            <h4 className="text-xl font-semibold mt-8 mb-4 text-slate-800">Standard Reg T Margin Calculation Example</h4>
            <SimpleTable 
              headers={["Metric", "Calculation Methodology", "Example Scenario"]}
              rows={regTData}
              renderRow={(row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">{row.metric}</td>
                  <td className="p-4 text-slate-600 font-mono text-sm">{row.calc}</td>
                  <td className="p-4 text-blue-700 font-medium">{row.example}</td>
                </tr>
              )}
            />
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mt-4">
              <p className="text-blue-900 m-0">
                <strong>Analysis:</strong> In the scenario above, a decline in the asset price to $60 reduces equity to $10,000 (16.67%). Because this falls below the regulatory 25% threshold, the account violates margin requirements, initiating risk management protocols.
              </p>
            </div>
          </SectionCard>

          {/* WCL Section */}
          <SectionCard 
            id="wcl" 
            title="Worst Case Loss (WCL): The Risk Engine" 
            icon={AlertTriangle} 
            colorClass="bg-red-500 text-red-600" 
            bgLight="bg-red-50"
          >
            <p>
              Worst Case Loss (WCL) is the maximum expected decline in a portfolio&apos;s value under a predefined set of extreme but plausible market scenarios. It serves as the quantitative foundation for all modern risk-based margin models (like SPAN for futures, or TIMS for options).
            </p>
            <p className="mt-4">
              The WCL is determined by passing the entire portfolio through a computational stress grid, analyzing price shocks (e.g., &plusmn;15%) alongside implied volatility shocks (e.g., &plusmn;150%).
            </p>

            <h4 className="text-xl font-semibold mt-8 mb-4 text-slate-800">Bivariate Stress Grid Example (Options Portfolio)</h4>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h5 className="font-medium text-slate-700 mb-3 bg-slate-100 py-2 px-4 rounded-lg inline-block">1. Initial State</h5>
                <ul className="space-y-3">
                  {wclInitialData.map((item, i) => (
                    <li key={i} className="flex flex-col bg-white border border-slate-100 p-3 rounded-lg shadow-sm">
                      <span className="text-sm text-slate-500 font-medium">{item.param}</span>
                      <span className="text-slate-800 font-semibold">{item.val}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-red-700 mb-3 bg-red-50 py-2 px-4 rounded-lg inline-block border border-red-100">2. Stressed State (The Worst Scenario)</h5>
                <ul className="space-y-2">
                  {wclStressedData.map((item, i) => (
                    <li key={i} className={`flex justify-between items-center p-3 rounded-lg border ${item.highlight ? 'bg-red-600 text-white border-red-700 shadow-md font-bold text-lg' : 'bg-white border-slate-100 shadow-sm'}`}>
                      <span className={item.highlight ? "text-red-100" : "text-slate-600 text-sm"}>{item.metric}</span>
                      <span className={item.highlight ? "text-white" : "text-slate-800 font-semibold text-right max-w-[60%]"}>{item.val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <p className="mt-6">
              The quantitative analysis demonstrates that the <strong>WCL is $1,615,586</strong>. Consequently, the risk-based initial margin requirement for this portfolio sub-class will be anchored exactly to this figure.
            </p>
          </SectionCard>

          {/* House Excess Section */}
          <SectionCard 
            id="house-excess" 
            title="House Excess: Operational Liquidity" 
            icon={Landmark} 
            colorClass="bg-emerald-500 text-emerald-600" 
            bgLight="bg-emerald-50"
          >
            <p>
              House Excess represents the surplus equity in a client&apos;s account above the broker&apos;s proprietary (in-house) margin requirements. While regulatory bodies establish minimums (e.g., 25%), brokers universally enforce higher &ldquo;house requirements&rdquo; (e.g., 35%) to create an operational safety buffer.
            </p>

            <SimpleTable 
              headers={["Liquidity Metric", "Calculation / Value"]}
              rows={houseExcessData}
              renderRow={(row, i) => (
                <tr key={i} className={`transition-colors ${row.highlight ? 'bg-emerald-50' : 'hover:bg-slate-50'}`}>
                  <td className={`p-4 font-medium ${row.highlight ? 'text-emerald-800 font-bold text-lg' : 'text-slate-800'}`}>{row.metric}</td>
                  <td className={`p-4 font-mono ${row.highlight ? 'text-emerald-700 font-bold text-lg' : 'text-slate-600'}`}>{row.val}</td>
                </tr>
              )}
            />
            <p className="mt-4">
              In algorithmic trading, order management systems strictly poll the House Excess API. If a proposed trade&apos;s WCL impact exceeds this available $300,000 cushion, the order is systematically rejected.
            </p>
          </SectionCard>

          {/* Shortfall Section */}
          <SectionCard 
            id="shortfall" 
            title="Shortfall: Margin Calls & Deficiencies" 
            icon={TrendingDown} 
            colorClass="bg-orange-500 text-orange-600" 
            bgLight="bg-orange-50"
          >
            <p>
              A shortfall manifests when account equity drops below the required maintenance level. This triggers a &ldquo;margin call,&rdquo; demanding additional capital. If unmet, the broker reserves the right to forcefully liquidate assets.
            </p>
            <div className="my-8 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-4 border-b border-slate-200">
                <h4 className="font-semibold text-slate-800 m-0">The Mechanics of Curing a Shortfall</h4>
                <p className="text-sm text-slate-500 m-0 mt-1">Assume a sudden shock reduces TMV from $2M to $1.4M.</p>
              </div>
              <ul className="divide-y divide-slate-100">
                {shortfallData.map((item, i) => (
                  <li key={i} className={`p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center ${item.highlight ? 'bg-orange-50' : item.alert ? 'bg-red-50 border-t-2 border-red-200' : ''}`}>
                    <span className={`font-medium ${item.highlight ? 'text-orange-800' : item.alert ? 'text-red-800 font-bold' : 'text-slate-700'}`}>{item.metric}</span>
                    <span className={`font-mono text-right mt-2 sm:mt-0 ${item.highlight ? 'text-orange-700 font-bold text-lg' : item.alert ? 'text-red-700 font-bold text-lg' : 'text-slate-600'}`}>{item.val}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-red-700 font-medium bg-red-50 p-4 rounded-xl border border-red-100">
              Notice the punitive nature of forced liquidations: Because selling stock reduces both TMV and the loan, the broker must sell $138,461 of assets just to cure a $90,000 cash deficit.
            </p>
          </SectionCard>

          {/* Margin Release Section */}
          <SectionCard 
            id="release" 
            title="Margin Release: Unlocking Capital Efficiency" 
            icon={Unlock} 
            colorClass="bg-purple-500 text-purple-600" 
            bgLight="bg-purple-50"
          >
            <p>
              Margin release is the unencumbering of capital previously locked to support a risk position. It occurs when a portfolio&apos;s mathematical risk profile improves (e.g., adding a hedge). In Wealth Management, this is heavily used via box spreads to finance major purchases without triggering capital gains.
            </p>
            
            <h4 className="text-xl font-semibold mt-8 mb-4 text-slate-800">Withdrawal Capacity: Reg T vs Portfolio Margin</h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-6">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 font-semibold text-slate-700">Regulatory Framework</th>
                    <th className="p-4 font-semibold text-slate-700">Portfolio Size</th>
                    <th className="p-4 font-semibold text-slate-700">Allowed Release Factor</th>
                    <th className="p-4 font-semibold text-purple-700 bg-purple-50">Available Release Limit</th>
                    <th className="p-4 font-semibold text-slate-700">Post-Withdrawal Buffer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {releaseData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-800">{row.framework}</td>
                      <td className="p-4 font-mono text-slate-600">{row.size}</td>
                      <td className="p-4 text-slate-600">{row.factor}</td>
                      <td className="p-4 font-mono font-bold text-purple-700 bg-purple-50/50">{row.limit}</td>
                      <td className={`p-4 font-medium ${i === 0 ? 'text-red-600' : 'text-emerald-600'}`}>{row.buffer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Under PM, the risk engine recognizes diversification, granting an 85% margin release factor. This provides an $875,000 buffer, allowing a UHNW client to execute a real estate transaction safely while investments compound.
            </p>
          </SectionCard>
        </div>

        {/* Connecting the Dots Section */}
        <div className="mb-24 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none">
            <Network size={240} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                <Network size={32} className="text-indigo-300" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Connecting the Dots in Quant Finance</h2>
            </div>
            
            <div className="prose prose-lg prose-invert max-w-none text-indigo-100/80">
              <p className="text-xl text-white mb-8">
                These five metrics form a continuous, interdependent feedback loop managed by automated risk architectures.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-indigo-300 text-lg font-bold mb-2 flex items-center gap-2"><Calculator size={18}/> 1. Simulation</h3>
                  <p className="text-sm m-0">Risk analysts run Monte Carlo simulations (Expected Shortfall) to estimate tail risk, establishing the <strong>WCL</strong> and baseline <strong>Margin</strong>.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-indigo-300 text-lg font-bold mb-2 flex items-center gap-2"><Briefcase size={18}/> 2. Execution</h3>
                  <p className="text-sm m-0">Real-time equity minus margin establishes <strong>House Excess</strong>. Trading algorithms use this as a hard limit constraint before routing orders.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-indigo-300 text-lg font-bold mb-2 flex items-center gap-2"><TrendingUp size={18}/> 3. Feedback Loop</h3>
                  <p className="text-sm m-0">Vol spikes compress excess, causing <strong>Shortfalls</strong> and auto-liquidation. Hedges compress WCL, causing <strong>Margin Releases</strong> for new alpha generation.</p>
                </div>
              </div>
              <p>
                This architecture bridges theoretical asset pricing and market microstructure. Models dictate capital constraints, and those constraints drive systemic market behavior en masse.
              </p>
            </div>
          </div>
        </div>

        {/* Structural Divides Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-12 justify-center">
            <h2 className="text-4xl font-bold text-slate-800 text-center">Structural Divides</h2>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="p-8 md:p-12 bg-slate-50/50">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 size={28} className="text-blue-600" />
                  <h3 className="text-2xl font-bold text-slate-800">Prime Brokerage</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  <strong>The Institutional Quest for Capital Efficiency.</strong> PB services volume and scale. Hedge funds demand maximum leverage to execute statistical arbitrage. The focus is optimizing WCL via cross-margining and aggressive rehypothecation of collateral to maximize ROE.
                </p>
              </div>
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase size={28} className="text-emerald-600" />
                  <h3 className="text-2xl font-bold text-slate-800">Wealth Management</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  <strong>The Lombard Paradigm &amp; Concentrated Risk.</strong> WM services UHNW individuals holding highly concentrated single-stock positions. The primary goal is extracting tax-free liquidity (via SBL/Lombard loans) for lifestyle purposes while fiercely avoiding forced liquidations caused by idiosyncratic gap risk.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto border-t border-slate-200">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-100/50">
                    <th className="p-5 font-bold text-slate-700 w-1/4">Characteristic</th>
                    <th className="p-5 font-bold text-blue-800 w-3/8">Prime Brokerage (Institutional)</th>
                    <th className="p-5 font-bold text-emerald-800 w-3/8">Wealth Management (UHNW)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-5 font-semibold text-slate-700 bg-slate-50/30">{row.char}</td>
                      <td className="p-5 text-slate-600 border-r border-slate-100">{row.pb}</td>
                      <td className="p-5 text-slate-600">{row.wm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ArticleFrame>
  );
}
