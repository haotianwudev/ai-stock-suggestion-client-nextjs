'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase, BarChart2, DollarSign, Activity, CheckCircle, XCircle, TrendingUp, TrendingDown, Scale, BookOpen, Target, Shield, Users, Menu, X } from 'lucide-react';

// Data based on the Microsoft valuation analysis
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

const navigationItems = [
  { id: 'executive-summary', label: 'Executive Summary', icon: Briefcase },
  { id: 'ev-ebitda-analysis', label: 'EV/EBITDA Analysis', icon: BarChart2 },
  { id: 'dcf-analysis', label: 'DCF Analysis', icon: DollarSign },
  { id: 'synthesis', label: 'Synthesis & Conclusion', icon: Scale },
];

const Card = ({ children, className = '', id = '' }) => (
  <div id={id} className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ icon, children }) => (
    <h2 className="text-3xl font-bold text-cyan-300 mb-6 flex items-center">
        {icon}
        <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400">{children}</span>
    </h2>
);

const ExecutiveSummary = () => (
    <Card id="executive-summary">
        <SectionTitle icon={<Briefcase size={32} />}>Executive Summary</SectionTitle>
        <div className="space-y-4 text-gray-300">
            <p>This report provides a comparative analysis of two cornerstone valuation methodologies—Enterprise Value to EBITDA (EV/EBITDA) and Discounted Cash Flow (DCF)—as applied to Microsoft Corporation (MSFT).</p>
            <p>A central tension emerges: Microsoft's elevated EV/EBITDA multiple reflects profound market optimism for its leadership in the AI revolution. This contrasts sharply with a more sober, fundamentals-based intrinsic value from DCF analysis, which suggests the stock is considerably overvalued.</p>
            <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 p-6 rounded-lg border border-cyan-400/30">
                <p className="font-semibold text-cyan-300 text-lg">💡 The Core Investment Question</p>
                <p className="text-white mt-2">Can Microsoft's monumental future growth potential in AI justify a valuation that appears to have outpaced its underlying cash-generating capacity?</p>
            </div>
        </div>
    </Card>
);

const EvEbitdaAnalysis = () => (
    <Card id="ev-ebitda-analysis">
        <SectionTitle icon={<BarChart2 size={32} />}>EV/EBITDA Relative Valuation</SectionTitle>
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">📊 Historical Analysis</h3>
                <p className="text-gray-300 mb-4">Microsoft's EV/EBITDA multiple has shown significant fluctuation, dipping in 2022 before rebounding sharply. This rebound correlates directly with market enthusiasm for generative AI, indicating an "AI premium" is now priced into the stock.</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="p-3 text-sm font-semibold text-cyan-300">Fiscal Year (FY)</th>
                                <th className="p-3 text-sm font-semibold text-cyan-300">Enterprise Value (EV)</th>
                                <th className="p-3 text-sm font-semibold text-cyan-300">TTM EBITDA</th>
                                <th className="p-3 text-sm font-semibold text-cyan-300">EV/EBITDA Multiple</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historicalData.map((row, index) => (
                                <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                    <td className="p-3 font-mono">{row.year}</td>
                                    <td className="p-3 font-mono">{row.ev}</td>
                                    <td className="p-3 font-mono">{row.ebitda}</td>
                                    <td className="p-3 font-mono text-white font-bold">{row.multiple}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-white mb-4">🔍 Peer Group Comparison</h3>
                <p className="text-gray-300 mb-4">Microsoft's multiple of 23.8x commands a premium over key competitors like Alphabet and Amazon. This suggests the market views its enterprise-focused AI monetization strategy as the most direct and profitable.</p>
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="p-3 text-sm font-semibold text-cyan-300">Company</th>
                                <th className="p-3 text-sm font-semibold text-cyan-300">EV/EBITDA</th>
                                <th className="p-3 text-sm font-semibold text-cyan-300">Growth</th>
                                <th className="p-3 text-sm font-semibold text-cyan-300">Margin</th>
                                <th className="p-3 text-sm font-semibold text-cyan-300">Rationale</th>
                            </tr>
                        </thead>
                        <tbody>
                            {peerData.map((row, index) => (
                                <tr key={index} className={`border-b border-white/10 hover:bg-white/5 transition-colors ${row.ticker === 'MSFT' ? 'bg-cyan-900/30' : ''}`}>
                                    <td className="p-3">
                                        <span className="font-bold">{row.company}</span> 
                                        <span className="text-gray-400 font-mono ml-1">({row.ticker})</span>
                                    </td>
                                    <td className="p-3 font-mono text-white font-bold">{row.multiple}</td>
                                    <td className="p-3 font-mono">{row.growth}</td>
                                    <td className="p-3 font-mono">{row.margin}</td>
                                    <td className="p-3 text-sm text-gray-300">{row.rationale}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-white mb-4">⚖️ Pros & Cons</h3>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30">
                        <h4 className="flex items-center text-lg font-semibold text-green-400 mb-4"><CheckCircle size={20} className="mr-2"/> Pros</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            <li>Simple & Widely Used</li>
                            <li>Capital Structure Neutral</li>
                            <li>Handles Negative Earnings</li>
                            <li>Reflects Market Sentiment</li>
                        </ul>
                    </div>
                    <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30">
                        <h4 className="flex items-center text-lg font-semibold text-red-400 mb-4"><XCircle size={20} className="mr-2"/> Cons</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
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
        <SectionTitle icon={<DollarSign size={32} />}>DCF Intrinsic Valuation</SectionTitle>
         <div className="space-y-8">
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">🎯 Core Assumptions</h3>
                <p className="text-gray-300 mb-4">A DCF model's value rests on its assumptions. We used a standard two-stage model with the following key inputs for our base case.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-400/30">
                        <p className="text-sm text-cyan-400">Avg. Revenue Growth</p>
                        <p className="text-2xl font-bold text-white">12%</p>
                    </div>
                     <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-400/30">
                        <p className="text-sm text-cyan-400">WACC (Discount Rate)</p>
                        <p className="text-2xl font-bold text-white">8.5%</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-400/30">
                        <p className="text-sm text-cyan-400">Terminal Growth Rate</p>
                        <p className="text-2xl font-bold text-white">2.5%</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-400/30">
                        <p className="text-sm text-cyan-400">Terminal EV/EBITDA</p>
                        <p className="text-2xl font-bold text-white">18.0x</p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-white mb-4">📈 Sensitivity Analysis</h3>
                <p className="text-gray-300 mb-4">The intrinsic value is highly sensitive to the WACC and terminal growth rate. The base case value of ~$350/share is significantly below the current market price, highlighting a potential overvaluation.</p>
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                        <thead className="border-b border-white/20">
                            <tr>
                                <th rowSpan="2" className="p-3 text-sm font-semibold text-cyan-300 align-bottom">WACC</th>
                                <th colSpan="3" className="p-3 text-sm font-semibold text-cyan-300 text-center">Terminal Growth Rate (g)</th>
                            </tr>
                            <tr className="border-b border-white/20">
                                <th className="p-3 text-sm font-semibold text-cyan-300 text-center">2.0%</th>
                                <th className="p-3 text-sm font-semibold text-cyan-300 text-center">2.5% (Base)</th>
                                <th className="p-3 text-sm font-semibold text-cyan-300 text-center">3.0%</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sensitivityData.map((row, index) => (
                                <tr key={index} className={`border-b border-white/10 hover:bg-white/5 transition-colors ${row.wacc.includes('Base') ? 'bg-cyan-900/30' : ''}`}>
                                    <td className="p-3 font-mono font-bold">{row.wacc}</td>
                                    <td className="p-3 font-mono text-center">{row.g2_0}</td>
                                    <td className={`p-3 font-mono text-center font-bold ${row.wacc.includes('Base') ? 'text-cyan-300 text-lg' : 'text-white'}`}>{row.g2_5}</td>
                                    <td className="p-3 font-mono text-center">{row.g3_0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-white mb-4">⚖️ Pros & Cons</h3>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30">
                        <h4 className="flex items-center text-lg font-semibold text-green-400 mb-4"><CheckCircle size={20} className="mr-2"/> Pros</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            <li>Intrinsic & Fundamentals-Based</li>
                            <li>Forces Rigorous Analysis</li>
                            <li>Versatile Application</li>
                            <li>Independent of Market Moods</li>
                        </ul>
                    </div>
                    <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30">
                        <h4 className="flex items-center text-lg font-semibold text-red-400 mb-4"><XCircle size={20} className="mr-2"/> Cons</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            <li>"Garbage In, Garbage Out" Sensitivity</li>
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
        <SectionTitle icon={<Scale size={32} />}>Synthesis & Conclusion</SectionTitle>
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">🔄 Reconciling the Models</h3>
                <p className="text-gray-300">The high EV/EBITDA multiple signals a company priced for perfection, while the DCF signals significant overvaluation. The gap between the market price and the DCF's intrinsic value can be described as the market's "AI Premium."</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-white mb-4">🔍 Qualitative Overlay</h3>
                 <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-800/40 p-4 rounded-lg border border-cyan-400/30 text-center">
                        <Shield className="text-cyan-400 mb-2 mx-auto" size={32}/>
                        <h4 className="font-bold text-white mb-2">Wide Economic Moat</h4>
                        <p className="text-gray-400 text-sm">Huge switching costs (Windows, Office) and network effects (Azure, LinkedIn).</p>
                    </div>
                    <div className="bg-gray-800/40 p-4 rounded-lg border border-cyan-400/30 text-center">
                        <TrendingUp className="text-cyan-400 mb-2 mx-auto" size={32}/>
                        <h4 className="font-bold text-white mb-2">Secular AI Tail-Wind</h4>
                        <p className="text-gray-400 text-sm">First-mover advantage in monetizing generative AI through its vast enterprise distribution.</p>
                    </div>
                    <div className="bg-gray-800/40 p-4 rounded-lg border border-cyan-400/30 text-center">
                        <Users className="text-cyan-400 mb-2 mx-auto" size={32}/>
                        <h4 className="font-bold text-white mb-2">Exemplary Management</h4>
                        <p className="text-gray-400 text-sm">Strong track record of strategic vision, execution, and capital return to shareholders.</p>
                    </div>
                 </div>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-white mb-4">🎯 Final Investment Thesis</h3>
                <div className="border-l-4 border-cyan-400 pl-6 py-4 bg-gradient-to-r from-gray-800/60 to-cyan-900/20 rounded-r-lg">
                    <p className="text-gray-200 text-lg leading-relaxed">
                        At its current valuation, Microsoft (MSFT) is a <strong className="text-amber-300 text-xl">"HOLD"</strong> for existing investors but presents a challenging entry point for new capital. The stock is priced for perfection, leaving little margin for error. An investment today is a speculative bet that the company can consistently exceed sky-high expectations.
                    </p>
                </div>

                <div className="mt-6 p-6 bg-amber-900/20 rounded-lg border border-amber-400/30">
                    <h4 className="font-bold text-amber-300 mb-2">⚠️ Risk Warning</h4>
                    <p className="text-gray-300 text-sm">This analysis is for educational purposes only and does not constitute investment advice. Past performance does not guarantee future results. Always conduct your own research and consider consulting with a financial advisor before making investment decisions.</p>
                </div>
            </div>
        </div>
    </Card>
);

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('executive-summary');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-cyan-600 text-white p-3 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Sidebar */}
      <nav className={`fixed left-0 top-0 h-full bg-gray-900/95 backdrop-blur-md border-r border-white/10 p-6 z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-80`}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-300 mb-6">Table of Contents</h3>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                  activeSection === item.id
                    ? 'bg-cyan-600 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default function MicrosoftValuationAnalysis() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
      <div className="relative isolate overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_45rem_at_top_right,_#1e3a8a_20%,_transparent_100%)] opacity-30"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 -mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>

        {/* Header */}
        <header className="py-6 px-4 border-b border-white/10 relative">
          <div className="container max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-200 border border-purple-400">
                  Deep Research
                </span>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500">
                Microsoft (MSFT) Valuation Analysis
              </h1>
              <p className="mt-2 text-lg text-gray-300">EV/EBITDA vs. Discounted Cash Flow (DCF)</p>
              <p className="mt-2 text-sm text-gray-400">A deep dive into two fundamental valuation methodologies</p>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="md:ml-80 px-4 py-8 md:py-12">
          <div className="container max-w-4xl mx-auto space-y-12">
            <ExecutiveSummary />
            <EvEbitdaAnalysis />
            <DcfAnalysis />
            <Synthesis />
          </div>
        </main>

        {/* Footer */}
        <footer className="md:ml-80 text-center py-6 mt-12 border-t border-white/10">
          <div className="container max-w-4xl mx-auto px-4">
            <p className="text-sm text-gray-500 mb-4">
              This analysis is for informational purposes only and does not constitute investment advice. 
              Data is based on publicly available information and should be verified independently.
            </p>
            <p className="text-xs text-gray-600">
              <strong>Disclaimer:</strong> The author may hold positions in the securities discussed. 
              This content is for educational purposes only and not a recommendation to buy or sell any security.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
} 