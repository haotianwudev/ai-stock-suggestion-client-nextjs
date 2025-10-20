'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronUp, Menu, X, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function OptionsMarginRulesGuide() {
  const currentArticle = articles.find(article => article.slug === 'options-margin-rules-comprehensive-guide');
  const [activeSection, setActiveSection] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Navigation sections
  const sections = [
    { id: 'regulatory-framework', title: 'Regulatory Framework', shortTitle: 'Framework' },
    { id: 'defined-risk', title: 'Defined-Risk Strategies', shortTitle: 'Defined Risk' },
    { id: 'undefined-risk', title: 'Undefined-Risk Strategies', shortTitle: 'Undefined Risk' },
    { id: 'index-options', title: 'Index Options', shortTitle: 'Index Options' },
    { id: 'risk-management', title: 'Risk Management', shortTitle: 'Risk Mgmt' },
    { id: 'conclusion', title: 'Conclusion', shortTitle: 'Conclusion' }
  ];

  // Scroll tracking for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsNavOpen(false);
  };

  // Scroll to top functionality
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reusable Components
  const KeyTerm = ({ children }: { children: React.ReactNode }) => (
    <span className="font-semibold text-sky-500">{children}</span>
  );

  const SectionTitle = ({ title, number }: { title: string; number: string }) => (
    <div className="flex items-center mb-6">
      <span className="text-4xl font-bold text-slate-400 mr-4">{number}</span>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
    </div>
  );

  const SubSectionTitle = ({ title }: { title: string }) => (
    <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mt-8 mb-4">{title}</h3>
  );

  const ListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start mb-3">
      <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
      </svg>
      <p className="text-slate-600 dark:text-slate-300">{children}</p>
    </li>
  );

  const FormulaBlock = ({ title, formula, calculation, result, note }: {
    title: string;
    formula: string;
    calculation?: string;
    result: string;
    note?: string;
  }) => (
    <div className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-6 my-6 border border-slate-200 dark:border-slate-700 shadow-sm">
      <p className="font-semibold text-lg text-slate-700 dark:text-slate-200 mb-2">{title}</p>
      <div className="font-mono text-sm text-sky-600 dark:text-sky-400 bg-slate-200 dark:bg-slate-900 p-4 rounded-md mb-4">
        {formula}
      </div>
      {calculation && (
        <div className="font-mono text-sm text-slate-500 dark:text-slate-400 mb-2">
          <span className="font-semibold text-slate-600 dark:text-slate-300">Calculation: </span>{calculation}
        </div>
      )}
      <div className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
        <span className="font-semibold text-slate-600 dark:text-slate-300">Result: </span>{result}
      </div>
      {note && <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">{note}</p>}
    </div>
  );

  const Table = ({ headers, data }: { headers: string[]; data: string[][] }) => (
    <div className="overflow-x-auto my-8">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-6 py-4 whitespace-normal text-sm text-slate-600 dark:text-slate-300">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const AlertBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-800 dark:text-red-300 p-6 my-6 rounded-r-lg shadow-md" role="alert">
      <h4 className="font-bold text-lg mb-2 flex items-center">
        <AlertTriangle className="mr-2 h-5 w-5" />
        {title}
      </h4>
      <div className="text-sm">{children}</div>
    </div>
  );

  // Table data
  const table1Data = [
    ["Purpose", "Capital required to open a new position", "Minimum equity required to keep a position open"],
    ["Primary Regulator", "Federal Reserve Board (Regulation T)", "FINRA (Rule 4210) & Brokerage House Rules"],
    ["Typical Requirement (Equity)", "Minimum 50% of purchase price", "Minimum 25% (FINRA), but typically 30-40% (Broker)"],
    ["Trigger", "Occurs at the time of trade execution", "Triggered when account equity falls below the required level"],
    ["Consequence", "Trade cannot be placed without sufficient funds", "Triggers a margin call, potential forced liquidation"],
  ];
  
  const table2Data = [
    ["Naked Equity Call", "20% × Underlying Value - OTM Amount + Premium", "10% × Underlying Value + Premium", "Flat Fee + Premium"],
    ["Naked Equity Put", "20% × Underlying Value - OTM Amount + Premium", "10% × Strike Value + Premium", "Flat Fee + Premium"],
    ["Naked Index Call", "15% × Underlying Value - OTM Amount + Premium", "10% × Underlying Value + Premium", "Flat Fee + Premium"],
    ["Naked Index Put", "15% × Underlying Value - OTM Amount + Premium", "10% × Strike Value + Premium", "Flat Fee + Premium"],
  ];

  const table3Data = [
    ["Settlement", "Cash-Settled", "Physically-Settled"],
    ["Exercise Style", "European (at expiration only)", "American (any time)"],
    ["Early Assignment Risk", "No", "Yes"],
    ["Tax Treatment (U.S.)", "Section 1256 (60% long-term / 40% short-term)", "Standard (based on holding period)"],
    ["Typical Notional Value", "High (e.g., Index level × $100)", "Lower (e.g., ~1/10th of index option)"],
    ["Margin for Naked Writing", "Lower (based on 15% formula)", "Higher (based on 20% formula)"],
    ["Margin for \"Covered\" Writing", "Zero (as a \"Protected Option\")", "Zero (as a standard Covered Call)"],
  ];

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Header with Navigation */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
              
              {/* Mobile menu button */}
              <button 
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                {isNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 flex gap-8">
          {/* Sidebar Navigation */}
          <aside className={`${isNavOpen ? 'block' : 'hidden'} md:block w-64 flex-shrink-0`}>
            <div className="sticky top-24 bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeSection === section.id 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {section.shortTitle}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            {/* Hero Section */}
            <div className="relative bg-white rounded-lg shadow-md p-8 mb-8">
              {/* Deep Research Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  Deep Research
                </span>
              </div>
              
              {/* Options Badge */}
              <div className="absolute bottom-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                  Options
                </span>
              </div>
              
              <div className="pt-8">
                <header className="text-center mb-16">
                  <p className="text-base font-semibold text-sky-600 dark:text-sky-400 tracking-wide uppercase">Options Trading Explained</p>
                  <h1 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight sm:text-5xl">
                    Options Margin Rules: A Comprehensive Guide to Risk Management
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed mt-6">
                    Master the complex world of options margin requirements with this comprehensive analysis of regulatory frameworks, calculation methodologies, and risk management strategies for sophisticated options traders.
                  </p>
                </header>
              </div>
            </div>

            {/* Section 1: Regulatory Framework */}
            <section id="regulatory-framework" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <SectionTitle number="1" title="The Regulatory and Mechanical Framework of Margin" />
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  An effective understanding of options trading necessitates a foundational knowledge of margin, a concept that is frequently misunderstood. Margin in the financial markets serves two distinct and critical functions, governed by a multi-layered regulatory structure.
                </p>

                <SubSectionTitle title="1.1 The Two Faces of Margin: Leverage vs. Collateral" />
                <p className="text-slate-600 dark:text-slate-300 mb-4">The term "margin" is used in two fundamentally different contexts within a brokerage account, which often leads to confusion. For equity trading, margin is a form of leverage. For options writing, it is a form of collateral.</p>
                <ul className="space-y-3">
                  <ListItem><KeyTerm>Margin as Leverage (for Equities):</KeyTerm> A loan from a broker to purchase more securities than cash allows, amplifying buying power and potential returns/losses. The securities serve as collateral for the loan.</ListItem>
                  <ListItem><KeyTerm>Margin as Collateral (for Options):</KeyTerm> A "good-faith" deposit or performance bond required for selling (writing) options. This capital ensures the trader can fulfill their contractual obligation if the option is exercised.</ListItem>
                </ul>

                <SubSectionTitle title="1.2 The Two Pillars of Capital Requirement: Initial vs. Maintenance Margin" />
                <ul className="space-y-3">
                  <ListItem><KeyTerm>Initial Margin:</KeyTerm> The equity required to *initiate* a new margin position. For stocks, Regulation T sets this at 50%.</ListItem>
                  <ListItem><KeyTerm>Maintenance Margin:</KeyTerm> The minimum equity that must be maintained in the account while the position is open. FINRA's minimum is 25%, but brokers often set higher "house" requirements (e.g., 30-40%).</ListItem>
                </ul>

                <SubSectionTitle title="1.3 The Margin Call: Mechanics, Triggers, and Resolution" />
                <p className="text-slate-600 dark:text-slate-300 mb-4">A margin call is a formal demand from a brokerage firm for an investor to increase the equity in their account. It is triggered when account equity falls below the maintenance margin requirement. To resolve it, an investor can deposit cash/securities or liquidate positions. Failure to act gives the broker the right to forcibly liquidate positions.</p>
                
                <Table headers={["Feature", "Initial Margin", "Maintenance Margin"]} data={table1Data} />

                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-blue-800 text-sm">
                    <strong>Key Insight:</strong> Understanding the hierarchy of rules—Federal Reserve (Regulation T), FINRA (Rule 4210), and individual brokerage house requirements—is crucial for options traders as house rules are typically the most restrictive and are what will trigger margin calls.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Defined-Risk Strategies */}
            <section id="defined-risk" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <SectionTitle number="2" title="Margin for Defined-Risk & Collateralized Strategies" />
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  For strategies where the maximum loss is known or fully secured, margin treatment is simpler. The broker's exposure is clearly defined, leading to more favorable requirements.
                </p>
                
                <SubSectionTitle title="2.1 The Covered Call: Benefits and Margin" />
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  A <KeyTerm>covered call</KeyTerm> involves owning at least 100 shares of a stock and selling one call option against that holding. The primary benefit is generating immediate income from the option premium. In a margin account, a properly constructed covered call has **no additional margin requirement** for the short call, as the 100 shares serve as perfect collateral.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Covered Call Benefits</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Immediate premium income</li>
                      <li>• No additional margin requirement</li>
                      <li>• Limited downside protection</li>
                      <li>• Conservative strategy</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Key Requirements</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Own 100 shares per contract</li>
                      <li>• Shares held in same account</li>
                      <li>• Call strike at or above stock basis</li>
                      <li>• Proper margin account setup</li>
                    </ul>
                  </div>
                </div>

                <SubSectionTitle title="2.2 The Cash-Secured Put" />
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  A <KeyTerm>cash-secured put</KeyTerm> involves selling a put option while setting aside enough cash to buy the stock at the strike price if assigned. Because the position is fully collateralized by cash, there is no complex margin calculation needed.
                </p>

                <FormulaBlock 
                  title="Cash-Secured Put Requirement"
                  formula="Cash Required = Strike Price × 100 shares × Number of Contracts"
                  calculation="For 1 contract at $50 strike: $50 × 100 = $5,000"
                  result="Full cash collateralization required"
                  note="Premium received reduces net cash outlay but full strike value must be available."
                />

                <SubSectionTitle title="2.3 Defined-Risk Spreads: Verticals and Iron Condors" />
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  For strategies like credit spreads and iron condors, the maximum risk is limited. The margin requirement is simply equal to this maximum potential loss, minus the premium received. For an <KeyTerm>iron condor</KeyTerm>, margin is only required for one of the spreads, making it highly capital-efficient.
                </p>

                <div className="grid md:grid-cols-2 gap-4 my-6">
                  <div className="p-4 bg-blue-50 rounded-lg border">
                    <h4 className="font-semibold text-blue-800 mb-2">Vertical Spread Margin</h4>
                    <p className="text-sm text-blue-700">Width of strikes × 100 - Premium received</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border">
                    <h4 className="font-semibold text-purple-800 mb-2">Iron Condor Margin</h4>
                    <p className="text-sm text-purple-700">Wider of the two spreads - Net premium received</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Undefined-Risk Strategies */}
            <section id="undefined-risk" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <SectionTitle number="3" title="Margin for Undefined-Risk Strategies" />
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  When a strategy has undefined risk, like selling naked options, margin calculations become more complex. The brokerage uses a formula to estimate a sufficient collateral amount to cover potential one-day risk.
                </p>

                <SubSectionTitle title="3.1 Uncovered (Naked) Call Writing" />
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Selling a call without owning the underlying stock has unlimited risk. The margin is the **greatest** of three formulas designed to cover this risk.
                </p>
                
                <AlertBox title="Unlimited Risk Warning">
                  <p>Naked call writing carries unlimited risk potential. A stock's price can theoretically rise indefinitely, creating catastrophic losses that can exceed your account equity by substantial margins.</p>
                </AlertBox>

                <FormulaBlock 
                  title="Naked Call Example (Stock at $65, $68 Call)"
                  formula="Greatest of:
1. (20% × $6,500) - $300 OTM + $150 premium = $1,150
2. (10% × $6,500) + $150 premium = $800  
3. $250 minimum + $150 premium = $400"
                  calculation="Maximum of $1,150, $800, $400"
                  result="Margin Required: $1,150"
                  note="The buying power effect would be $1,000 after applying the $150 premium credit."
                />

                <SubSectionTitle title="3.2 Uncovered (Naked) Put Writing" />
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Selling a put has substantial, but not unlimited, risk. The margin formula is similar to a naked call, but the second prong uses the strike price rather than the current stock price.
                </p>

                <FormulaBlock 
                  title="Naked Put Example (Stock at $47.50, $45 Put)"
                  formula="Greatest of:
1. (20% × $4,750) - $250 OTM + $50 premium = $750
2. (10% × $4,500) + $50 premium = $500
3. $250 minimum + $50 premium = $300"
                  calculation="Maximum of $750, $500, $300"
                  result="Margin Required: $750"
                  note="The buying power effect would be $700 after applying the $50 premium credit."
                />

                <SubSectionTitle title="3.3 Equity vs. Broad-Based Index Options" />
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  A key distinction exists for broad-based indexes like the SPX. The primary percentage in the margin formula is reduced from 20% to <KeyTerm>15%</KeyTerm>. This reflects the lower volatility of a diversified index compared to a single stock, making index options more capital-efficient for naked selling strategies.
                </p>

                <Table headers={["Strategy", "Formula 1 (Primary)", "Formula 2 (Secondary)", "Formula 3 (Minimum)"]} data={table2Data} />

                <div className="mt-6 p-4 bg-orange-50 border-l-4 border-orange-400 rounded">
                  <p className="text-orange-800 text-sm">
                    <strong>Capital Efficiency Insight:</strong> The 5% reduction in margin requirements for broad-based index options (15% vs 20%) can significantly improve capital efficiency for portfolio margin strategies focused on systematic volatility selling.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4: Index Options Special Case */}
            <section id="index-options" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <SectionTitle number="4" title="The Special Case of Index Options" />
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  The question of whether writing an index option can be considered "covered" is nuanced, hinging on the structural differences between index options (like SPX) and their ETF counterparts (like SPY).
                </p>

                <SubSectionTitle title="4.1 Index vs. ETF Options: Critical Differences" />
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Index options are <KeyTerm>cash-settled</KeyTerm> and <KeyTerm>European-style</KeyTerm> (no early assignment). ETF options are <KeyTerm>physically-settled</KeyTerm> and <KeyTerm>American-style</KeyTerm> (early assignment is possible). These differences have historically created margin disparities.
                </p>

                <Table headers={["Feature", "Index Option (e.g., XSP)", "ETF Option (e.g., SPY)"]} data={table3Data} />

                <SubSectionTitle title="4.2 The 'Protected Option' Strategy: A New Paradigm" />
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  A 2024 rule change introduced the <KeyTerm>Protected Option</KeyTerm> strategy. It allows a short, cash-settled index option (e.g., XSP call) to be treated as **covered for margin purposes** when held against a long position in a qualifying ETF tracking the same index (e.g., SPY shares). This eliminates the large naked margin requirement, dramatically improving capital efficiency.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Protected Option Benefits</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Zero margin requirement for covered writes</li>
                      <li>• Cash settlement eliminates assignment risk</li>
                      <li>• Favorable tax treatment (Section 1256)</li>
                      <li>• Enhanced capital efficiency</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Example Implementation</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Own 500 shares of SPY</li>
                      <li>• Sell 5 XSP call contracts</li>
                      <li>• No additional margin required</li>
                      <li>• Pure premium collection strategy</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded">
                  <p className="text-indigo-800 text-sm">
                    <strong>Strategic Advantage:</strong> The Protected Option rule represents a significant advancement in options margin efficiency, allowing sophisticated traders to implement systematic covered call strategies on index exposure with superior capital utilization compared to traditional ETF covered calls.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Risk Management */}
            <section id="risk-management" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <SectionTitle number="5" title="Practitioner's Guide to Risk Management & Common Pitfalls" />
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Understanding margin is only the first step. Effective risk management requires awareness of practical dangers and behavioral biases that can lead to significant losses.
                </p>

                <AlertBox title="The Unlimited Liability Trap: Naked Calls">
                  <p>The potential loss for a naked call writer is theoretically unlimited because a stock's price can rise indefinitely. A sudden, dramatic price increase can lead to catastrophic losses far exceeding your account equity. This strategy is suitable only for the most sophisticated traders with rigorous risk controls.</p>
                </AlertBox>

                <SubSectionTitle title="5.1 Common Pitfalls in Options Margin Trading" />
                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                        <XCircle className="mr-2 h-4 w-4" />
                        Over-Leveraging
                      </h4>
                      <p className="text-sm text-red-700">Margin amplifies losses just as it does gains. A small decline in a stock can lead to a large loss of account equity.</p>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                        <XCircle className="mr-2 h-4 w-4" />
                        Early Assignment Risk
                      </h4>
                      <p className="text-sm text-red-700">For American-style options, being assigned unexpectedly can disrupt your strategy and create unwanted stock positions.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                        <XCircle className="mr-2 h-4 w-4" />
                        Illiquidity Risks
                      </h4>
                      <p className="text-sm text-red-700">Options on low-volume securities can have wide bid-ask spreads, making it difficult and costly to enter or exit trades at fair prices.</p>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                        <XCircle className="mr-2 h-4 w-4" />
                        Margin Call Cascades
                      </h4>
                      <p className="text-sm text-red-700">Forced liquidations during volatile markets can compound losses and destroy long-term strategies.</p>
                    </div>
                  </div>
                </div>

                <SubSectionTitle title="5.2 The Ultimate Defense: A Disciplined Framework" />
                <div className="grid md:grid-cols-3 gap-4 my-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Trading Plan
                    </h4>
                    <p className="text-sm text-green-700">Define strategy, entry, and exit points before trading to remove emotion from decision-making.</p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Position Sizing
                    </h4>
                    <p className="text-sm text-green-700">Never risk an amount that could be financially or emotionally crippling. Limit risk to 2-5% of total capital per trade.</p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Exit Strategy
                    </h4>
                    <p className="text-sm text-green-700">Know when to take profits and cut losses. Adherence to pre-set stop-losses is paramount for survival.</p>
                  </div>
                </div>

                <SubSectionTitle title="5.3 Advanced Risk Management Techniques" />
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <h5 className="font-semibold text-blue-800 mb-2">Portfolio Margin Considerations</h5>
                    <p className="text-blue-700 text-sm">For sophisticated traders, portfolio margin can provide significant capital efficiency improvements but requires understanding of SPAN methodology and risk-based calculations.</p>
                  </div>
                  <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded">
                    <h5 className="font-semibold text-purple-800 mb-2">Stress Testing</h5>
                    <p className="text-purple-700 text-sm">Regularly stress test your portfolio against scenarios like the 2008 financial crisis or March 2020 volatility spike to ensure survival in extreme markets.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <h5 className="font-semibold text-yellow-800 mb-2">Margin Buffer Management</h5>
                    <p className="text-yellow-700 text-sm">Maintain a margin buffer of at least 20-30% above required levels to avoid forced liquidations during temporary volatility spikes.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Conclusion */}
            <section id="conclusion" className="mb-16 scroll-mt-20">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <SectionTitle number="6" title="Conclusion: Mastering Options Margin for Long-Term Success" />
                
                <div className="space-y-6">
                  <div>
                    <SubSectionTitle title="6.1 Key Takeaways for Options Traders" />
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Understand the fundamental difference between margin as leverage (equities) and margin as collateral (options)</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Master the three-tier regulatory hierarchy: Regulation T, FINRA rules, and broker house requirements</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Recognize that defined-risk strategies offer superior capital efficiency compared to undefined-risk approaches</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Leverage index options and Protected Option strategies for enhanced capital utilization</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Implement rigorous risk management protocols including position sizing and stop-loss disciplines</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Maintain adequate margin buffers to survive unexpected volatility events</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <SubSectionTitle title="6.2 The Path Forward: Continuous Education and Adaptation" />
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      Options margin rules continue to evolve with market developments and regulatory changes. The 2024 introduction of Protected Option strategies demonstrates the ongoing refinement of these frameworks. Successful options traders must commit to continuous education and adaptation to these evolving standards.
                    </p>
                    
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-gray-800 mb-3">Strategic Recommendations for Advanced Practitioners:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <CheckCircle className="text-blue-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Develop expertise in portfolio margin methodologies for maximum capital efficiency</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="text-blue-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Focus on systematic strategies utilizing index options and Protected Option rules</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="text-blue-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Implement robust stress testing and scenario analysis frameworks</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="text-blue-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">Maintain relationships with multiple prime brokers to optimize margin treatment and execution</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Call to Action */}
                <div className="mt-8 p-6 bg-indigo-50 border-l-4 border-indigo-400 rounded">
                  <h4 className="font-semibold text-indigo-800 mb-2">The Bottom Line</h4>
                  <p className="text-indigo-700 text-sm">
                    Mastery of options margin rules is not merely a regulatory compliance exercise—it is a strategic advantage that enables sophisticated traders to implement complex strategies with optimal capital allocation. The greatest risk in options trading is not market risk, but the risk of inadequate preparation and understanding of the regulatory and mechanical frameworks that govern these powerful financial instruments.
                  </p>
                </div>
              </div>
            </section>

            {/* Educational Disclaimer */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Educational Disclaimer:</strong> This comprehensive analysis is for educational purposes only and does not constitute investment advice. Options trading involves significant risks including the potential for substantial losses exceeding your initial investment. Margin trading amplifies both potential gains and losses. Always conduct your own research and consult with qualified financial professionals before implementing any options strategies. Past performance does not guarantee future results.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 z-50"
          >
            <ChevronUp className="h-6 w-6" />
          </button>
        )}

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-6 mt-16">
          <p>&copy; 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.</p>
        </footer>
      </div>
    </>
  );
} 
