'use client';

import { Briefcase, BarChart2, DollarSign, CheckCircle, XCircle, TrendingUp, Scale, Shield, Users } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

const historicalData = [
  { year: "2020", ev: "$1,489.7B", ebitda: "$64.09B", multiple: "23.2x" },
  { year: "2021", ev: "$1,996.6B", ebitda: "$75.76B", multiple: "26.4x" },
  { year: "2022", ev: "$1,894.2B", ebitda: "$94.98B", multiple: "19.9x" },
  { year: "2023", ev: "$2,507.0B", ebitda: "$99.06B", multiple: "25.3x" },
  { year: "2024", ev: "$3,348.1B", ebitda: "$125.20B", multiple: "26.7x" },
  { year: "LTM", ev: "$3,555.6B", ebitda: "$149.20B", multiple: "23.8x" },
];

const peerData = [
  { ticker: "MSFT", company: "Microsoft", multiple: "23.8x", growth: "17.0%", margin: "54.6%", rationale: "Perceived leader in enterprise AI monetization (Azure, Copilot); strong cloud growth and high-margin software." },
  { ticker: "AAPL", company: "Apple", multiple: "21.4x", growth: "6.0%", margin: "35.0%", rationale: "Dominant hardware ecosystem, high-margin services growth, strong brand loyalty. AI strategy is emerging." },
  { ticker: "GOOGL", company: "Alphabet", multiple: "15.2x", growth: "21.0%", margin: "37.7%", rationale: "Market leader in search/advertising, strong cloud growth (GCP), but AI monetization path seen as less direct than MSFT's." },
  { ticker: "AMZN", company: "Amazon", multiple: "18.4x", growth: "15.0%", margin: "23.0%", rationale: "Dominant in cloud (AWS) and e-commerce. Multiple is a blend of high-margin AWS and lower-margin retail business." },
  { ticker: "ORCL", company: "Oracle", multiple: "25.0x", growth: "24.0%", margin: "35.0%", rationale: "Transition to cloud infrastructure (OCI) is driving growth narrative; valuation seen by some as stretched." },
  { ticker: "IBM", company: "IBM", multiple: "18.5x", growth: "5.0%", margin: "26.0%", rationale: "Legacy business transition to hybrid cloud and AI consulting. Lower growth profile commands a lower multiple." },
];

const sensitivityData = [
  { wacc: "7.5%", g2_0: "$405", g2_5: "$440", g3_0: "$485" },
  { wacc: "8.5% (Base)", g2_0: "$325", g2_5: "$350", g3_0: "$380" },
  { wacc: "9.5%", g2_0: "$265", g2_5: "$285", g3_0: "$305" },
];

const Card = ({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) => (
  <div id={id} className={`bg-gray-50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-cyan-700 dark:text-cyan-300 mb-6 flex items-center">
    {icon}
    <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-500 dark:from-cyan-300 dark:to-blue-400">{children}</span>
  </h2>
);

const ExecutiveSummary = () => (
  <Card id="executive-summary">
    <SectionTitle icon={<Briefcase size={32} className="text-cyan-700 dark:text-cyan-300" />}>Executive Summary</SectionTitle>
    <div className="space-y-4 text-gray-700 dark:text-gray-300">
      <p>This report provides a comparative analysis of two cornerstone valuation methodologies&mdash;Enterprise Value to EBITDA (EV/EBITDA) and Discounted Cash Flow (DCF)&mdash;as applied to Microsoft Corporation (MSFT).</p>
      <p>A central tension emerges: Microsoft&apos;s elevated EV/EBITDA multiple reflects profound market optimism for its leadership in the AI revolution. This contrasts sharply with a more sober, fundamentals-based intrinsic value from DCF analysis, which suggests the stock is considerably overvalued.</p>
      <div className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40 p-6 rounded-lg border border-cyan-300 dark:border-cyan-400/30">
        <p className="font-semibold text-cyan-700 dark:text-cyan-300 text-lg">💡 The Core Investment Question</p>
        <p className="text-gray-900 dark:text-white mt-2">Can Microsoft&apos;s monumental future growth potential in AI justify a valuation that appears to have outpaced its underlying cash-generating capacity?</p>
      </div>
    </div>
  </Card>
);

const EvEbitdaAnalysis = () => (
  <Card id="ev-ebitda-analysis">
    <SectionTitle icon={<BarChart2 size={32} className="text-cyan-700 dark:text-cyan-300" />}>EV/EBITDA Relative Valuation</SectionTitle>
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📊 Historical Analysis</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">Microsoft&apos;s EV/EBITDA multiple has shown significant fluctuation, dipping in 2022 before rebounding sharply. This rebound correlates directly with market enthusiasm for generative AI, indicating an &ldquo;AI premium&rdquo; is now priced into the stock.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 dark:border-white/20">
                <th className="p-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300">Fiscal Year (FY)</th>
                <th className="p-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300">Enterprise Value (EV)</th>
                <th className="p-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300">TTM EBITDA</th>
                <th className="p-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300">EV/EBITDA Multiple</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.map((row, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                  <td className="p-3 font-mono text-gray-800 dark:text-gray-200">{row.year}</td>
                  <td className="p-3 font-mono text-gray-800 dark:text-gray-200">{row.ev}</td>
                  <td className="p-3 font-mono text-gray-800 dark:text-gray-200">{row.ebitda}</td>
                  <td className="p-3 font-mono text-gray-900 dark:text-white font-bold">{row.multiple}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🔍 Peer Group Comparison</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">Microsoft&apos;s multiple of 23.8x commands a premium over key competitors like Alphabet and Amazon. This suggests the market views its enterprise-focused AI monetization strategy as the most direct and profitable.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 dark:border-white/20">
                <th className="p-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300">Company</th>
                <th className="p-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300">EV/EBITDA</th>
                <th className="p-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300">Growth</th>
                <th className="p-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300">Margin</th>
                <th className="p-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300">Rationale</th>
              </tr>
            </thead>
            <tbody>
              {peerData.map((row, index) => (
                <tr key={index} className={`border-b border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors ${row.ticker === 'MSFT' ? 'bg-cyan-50 dark:bg-cyan-900/30' : ''}`}>
                  <td className="p-3">
                    <span className="font-bold text-gray-900 dark:text-white">{row.company}</span>
                    <span className="text-gray-500 dark:text-gray-400 font-mono ml-1">({row.ticker})</span>
                  </td>
                  <td className="p-3 font-mono text-gray-900 dark:text-white font-bold">{row.multiple}</td>
                  <td className="p-3 font-mono text-gray-800 dark:text-gray-200">{row.growth}</td>
                  <td className="p-3 font-mono text-gray-800 dark:text-gray-200">{row.margin}</td>
                  <td className="p-3 text-sm text-gray-700 dark:text-gray-300">{row.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">⚖️ Pros & Cons</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-300 dark:border-green-400/30">
            <h4 className="flex items-center text-lg font-semibold text-green-700 dark:text-green-400 mb-4"><CheckCircle size={20} className="mr-2"/> Pros</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Simple & Widely Used</li>
              <li>Capital Structure Neutral</li>
              <li>Handles Negative Earnings</li>
              <li>Reflects Market Sentiment</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-300 dark:border-red-400/30">
            <h4 className="flex items-center text-lg font-semibold text-red-700 dark:text-red-400 mb-4"><XCircle size={20} className="mr-2"/> Cons</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Ignores Capital Expenditures (CapEx)</li>
              <li>Overlooks Working Capital Changes</li>
              <li>Can overstate cash generation</li>
              <li>Assumes the market is correctly priced</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const DcfAnalysis = () => (
  <Card id="dcf-analysis">
    <SectionTitle icon={<DollarSign size={32} className="text-cyan-700 dark:text-cyan-300" />}>DCF Intrinsic Valuation</SectionTitle>
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🎯 Core Assumptions</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">A DCF model&apos;s value rests on its assumptions. We used a standard two-stage model with the following key inputs for our base case.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-cyan-300 dark:border-cyan-400/30">
            <p className="text-sm text-cyan-700 dark:text-cyan-400">Avg. Revenue Growth</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">12%</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-cyan-300 dark:border-cyan-400/30">
            <p className="text-sm text-cyan-700 dark:text-cyan-400">WACC (Discount Rate)</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">8.5%</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-cyan-300 dark:border-cyan-400/30">
            <p className="text-sm text-cyan-700 dark:text-cyan-400">Terminal Growth Rate</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">2.5%</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-cyan-300 dark:border-cyan-400/30">
            <p className="text-sm text-cyan-700 dark:text-cyan-400">Terminal EV/EBITDA</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">18.0x</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📈 Sensitivity Analysis</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">The intrinsic value is highly sensitive to the WACC and terminal growth rate. The base case value of ~$350/share is significantly below the current market price, highlighting a potential overvaluation.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-gray-300 dark:border-white/20">
              <tr>
                <th rowSpan={2} className="p-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300 align-bottom">WACC</th>
                <th colSpan={3} className="p-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300 text-center">Terminal Growth Rate (g)</th>
              </tr>
              <tr className="border-b border-gray-300 dark:border-white/20">
                <th className="p-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300 text-center">2.0%</th>
                <th className="p-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300 text-center">2.5% (Base)</th>
                <th className="p-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300 text-center">3.0%</th>
              </tr>
            </thead>
            <tbody>
              {sensitivityData.map((row, index) => (
                <tr key={index} className={`border-b border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors ${row.wacc.includes('Base') ? 'bg-cyan-50 dark:bg-cyan-900/30' : ''}`}>
                  <td className="p-3 font-mono font-bold text-gray-900 dark:text-gray-100">{row.wacc}</td>
                  <td className="p-3 font-mono text-center text-gray-800 dark:text-gray-200">{row.g2_0}</td>
                  <td className={`p-3 font-mono text-center font-bold ${row.wacc.includes('Base') ? 'text-cyan-700 dark:text-cyan-300 text-lg' : 'text-gray-900 dark:text-white'}`}>{row.g2_5}</td>
                  <td className="p-3 font-mono text-center text-gray-800 dark:text-gray-200">{row.g3_0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">⚖️ Pros & Cons</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-300 dark:border-green-400/30">
            <h4 className="flex items-center text-lg font-semibold text-green-700 dark:text-green-400 mb-4"><CheckCircle size={20} className="mr-2"/> Pros</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Intrinsic & Fundamentals-Based</li>
              <li>Forces Rigorous Analysis</li>
              <li>Versatile Application</li>
              <li>Independent of Market Moods</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-300 dark:border-red-400/30">
            <h4 className="flex items-center text-lg font-semibold text-red-700 dark:text-red-400 mb-4"><XCircle size={20} className="mr-2"/> Cons</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>&ldquo;Garbage In, Garbage Out&rdquo; Sensitivity</li>
              <li>Difficulty of Long-Term Forecasting</li>
              <li>Terminal Value Dominance</li>
              <li>Complex and Time-Consuming</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const Synthesis = () => (
  <Card id="synthesis">
    <SectionTitle icon={<Scale size={32} className="text-cyan-700 dark:text-cyan-300" />}>Synthesis & Conclusion</SectionTitle>
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🔄 Reconciling the Models</h3>
        <p className="text-gray-700 dark:text-gray-300">The high EV/EBITDA multiple signals a company priced for perfection, while the DCF signals significant overvaluation. The gap between the market price and the DCF&apos;s intrinsic value can be described as the market&apos;s &ldquo;AI Premium.&rdquo;</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🔍 Qualitative Overlay</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-100 dark:bg-gray-800/40 p-4 rounded-lg border border-cyan-300 dark:border-cyan-400/30 text-center">
            <Shield className="text-cyan-700 dark:text-cyan-400 mb-2 mx-auto" size={32}/>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Wide Economic Moat</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Huge switching costs (Windows, Office) and network effects (Azure, LinkedIn).</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800/40 p-4 rounded-lg border border-cyan-300 dark:border-cyan-400/30 text-center">
            <TrendingUp className="text-cyan-700 dark:text-cyan-400 mb-2 mx-auto" size={32}/>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Secular AI Tail-Wind</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">First-mover advantage in monetizing generative AI through its vast enterprise distribution.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800/40 p-4 rounded-lg border border-cyan-300 dark:border-cyan-400/30 text-center">
            <Users className="text-cyan-700 dark:text-cyan-400 mb-2 mx-auto" size={32}/>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Exemplary Management</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Strong track record of strategic vision, execution, and capital return to shareholders.</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🎯 Final Investment Thesis</h3>
        <div className="border-l-4 border-cyan-400 pl-6 py-4 bg-gradient-to-r from-gray-100 to-cyan-100 dark:from-gray-800/60 dark:to-cyan-900/20 rounded-r-lg">
          <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
            At its current valuation, Microsoft (MSFT) is a <strong className="text-amber-600 dark:text-amber-300 text-xl">&ldquo;HOLD&rdquo;</strong> for existing investors but presents a challenging entry point for new capital. The stock is priced for perfection, leaving little margin for error. An investment today is a speculative bet that the company can consistently exceed sky-high expectations.
          </p>
        </div>
      </div>
    </div>
  </Card>
);

export default function MicrosoftValuationAnalysis() {
  return (
    <ArticleFrame
      slug="deep-research-microsoft-valuation-analysis"
      additionalDisclaimer="The author may hold positions in the securities discussed. Data is based on publicly available information and should be verified independently."
    >
      <div className="space-y-12">
        <ExecutiveSummary />
        <EvEbitdaAnalysis />
        <DcfAnalysis />
        <Synthesis />
      </div>
    </ArticleFrame>
  );
}
