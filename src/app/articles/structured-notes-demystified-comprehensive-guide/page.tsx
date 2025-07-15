'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { useState } from 'react';
import { ShieldCheck, TrendingUp, DollarSign, AlertTriangle, Users, ChevronsUpDown, CheckCircle, XCircle, Briefcase, Scale, Settings, BookOpen, FileText, Banknote, GanttChartSquare, Landmark } from 'lucide-react';

// TypeScript interfaces
interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

interface SectionTitleProps {
  children: React.ReactNode;
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

interface FaqItemProps {
  question: string;
  children: React.ReactNode;
}

type TabKey = 'autocallable' | 'rcn' | 'growth';

// Helper component for consistent section styling
const Section = ({ children, className = '' }: SectionProps) => (
  <section className={`py-12 md:py-20 ${className}`}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
);

// Helper component for section headings
const SectionTitle = ({ children }: SectionTitleProps) => (
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
    {children}
  </h2>
);

// Helper component for styled cards
const InfoCard = ({ icon, title, children }: InfoCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 h-full">
    <div className="p-6 md:p-8">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="text-gray-600 dark:text-gray-300 space-y-4">
        {children}
      </div>
    </div>
  </div>
);

// Hero Section Component
const HeroSection = () => (
  <div className="bg-gray-900 text-white">
    <Section className="text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">Structured Notes Demystified</h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
        A comprehensive guide to the sophisticated investment tool favored by high-net-worth investors for its unique risk-reward profiles.
      </p>
    </Section>
  </div>
);

// What Are Structured Notes Section
const WhatAreStructuredNotesSection = () => (
  <Section className="bg-gray-50 dark:bg-gray-900">
    <SectionTitle>Deconstructing the Structured Note</SectionTitle>
    <div className="max-w-4xl mx-auto text-center mb-12">
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Structured notes are not stocks or traditional bonds. They are hybrid securities—debt obligations from a bank, combined with derivatives—designed to deliver specific investment outcomes linked to an underlying asset like an index, stock, or commodity.
      </p>
    </div>
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <InfoCard icon={<GanttChartSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />} title="The Bond Component">
        <p>The foundation of a structured note is typically a zero-coupon bond. A large portion of your investment buys this bond at a discount. At maturity, it grows to equal your initial principal, providing the "principal protection" feature (always subject to the issuer's credit risk).</p>
      </InfoCard>
      <InfoCard icon={<TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />} title="The Derivative Package">
        <p>The rest of your investment funds a package of options (calls and puts). This is the engine that generates market-linked returns. It allows the issuer to create custom payoffs, such as enhanced upside participation, downside buffers, or income streams.</p>
      </InfoCard>
    </div>
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Structured Notes vs. Traditional Investments</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-200">Feature</th>
              <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-200">Traditional Stocks</th>
              <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-200">Traditional Bonds</th>
              <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-200">Structured Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="p-4 font-medium text-gray-800 dark:text-gray-100">Principal Risk</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">High; full loss possible</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">Low (for high-quality issuers)</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">Varies; always subject to issuer credit risk</td>
            </tr>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="p-4 font-medium text-gray-800 dark:text-gray-100">Return Profile</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">Potentially unlimited</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">Fixed and predictable</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">Non-linear, defined outcomes (capped/buffered)</td>
            </tr>
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="p-4 font-medium text-gray-800 dark:text-gray-100">Liquidity</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">High (exchange-traded)</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">High (active secondary market)</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">Very Low (designed to be held to maturity)</td>
            </tr>
             <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="p-4 font-medium text-gray-800 dark:text-gray-100">Complexity</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">Low to Moderate</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">Low</td>
              <td className="p-4 text-gray-600 dark:text-gray-300">Very High</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Section>
);

// Why HNW Investors Like Them Section
const WhyHNWInvestorsLikeThemSection = () => (
  <Section className="bg-white dark:bg-gray-800">
    <SectionTitle>The Allure for High-Net-Worth Investors</SectionTitle>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <InfoCard icon={<Settings className="w-8 h-8 text-blue-600 dark:text-blue-400" />} title="Customization & Precision">
        <p>Investors can tailor notes to a specific market view or risk tolerance, creating risk-return profiles impossible to achieve with standard ETFs or mutual funds.</p>
      </InfoCard>
      <InfoCard icon={<ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />} title="Systematic Risk Management">
        <p>Features like "buffers" and "barriers" provide a contractual floor against losses, offering a more predictable form of downside protection than traditional diversification.</p>
      </InfoCard>
      <InfoCard icon={<DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />} title="Yield Enhancement">
        <p>In low-interest-rate or sideways markets, structured notes can be engineered to generate "enhanced" coupons, providing an attractive income stream when other sources are scarce.</p>
      </InfoCard>
    </div>
  </Section>
);

// Types of Notes Section
const TypesOfNotesSection = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('autocallable');

  const tabs: Record<TabKey, { title: string; content: React.ReactElement }> = {
    autocallable: {
      title: 'Autocallable Notes',
      content: (
        <>
          <p className="mb-4">These are among the most popular structures. They have a set maturity but can be redeemed early ("autocalled") if the underlying asset hits a specific price on set observation dates.</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>If Called:</strong> The investor receives their principal plus a fixed call premium.</li>
            <li><strong>If Not Called:</strong> Payoff at maturity depends on a downside barrier. If the barrier is breached, the investor is exposed to the underlying's loss.</li>
            <li><strong>Key Risk:</strong> Reinvestment risk. The note is likely to be called in a rising market, forcing the investor to reinvest when opportunities are less attractive.</li>
          </ul>
        </>
      ),
    },
    rcn: {
      title: 'Reverse Convertible Notes (RCNs)',
      content: (
        <>
          <p className="mb-4">These are high-yield income products with substantial risk. The "enhanced yield" comes from the investor implicitly selling a put option to the bank.</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Favorable Outcome:</strong> If the underlying stays above a "knock-in" barrier, the investor gets all high coupon payments and their principal back in cash.</li>
            <li><strong>Unfavorable Outcome:</strong> If the barrier is breached, the investor is repaid with shares of the depreciated stock, resulting in a significant capital loss.</li>
            <li><strong>Key Risk:</strong> Asymmetric risk profile. The upside is capped at the coupon payments, while the downside can be a near-total loss of principal.</li>
          </ul>
        </>
      ),
    },
    growth: {
        title: 'Growth Notes',
        content: (
          <>
            <p className="mb-4">Engineered for capital appreciation, offering leveraged or enhanced participation in the upside of an asset.</p>
             <ul className="list-disc list-inside space-y-2">
                <li><strong>Best For:</strong> Bullish investors willing to trade some safety for higher potential gains.</li>
                <li><strong>Common Trade-off:</strong> Upside is often capped, and downside protection may be less robust than other structures.</li>
            </ul>
          </>
        )
    }
  };

  return (
    <Section className="bg-gray-50 dark:bg-gray-900">
      <SectionTitle>A Taxonomy of Structured Notes</SectionTitle>
      <div className="max-w-4xl mx-auto">
        <div className="flex border-b border-gray-300 dark:border-gray-600 mb-8">
          {(Object.keys(tabs) as TabKey[]).map(key => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`py-3 px-6 font-semibold text-lg transition-colors duration-300 ${activeTab === key ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'}`}
            >
              {tabs[key].title}
            </button>
          ))}
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{tabs[activeTab].title}</h3>
          <div className="text-gray-700 dark:text-gray-300 space-y-4">
            {tabs[activeTab].content}
          </div>
        </div>
      </div>
    </Section>
  );
};

// Risk Reward Section
const RiskRewardSection = () => (
    <Section className="bg-white dark:bg-gray-800">
        <SectionTitle>The Risk-Reward Equation</SectionTitle>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center"><CheckCircle className="w-7 h-7 text-green-500 mr-3" />The Rewards: Defined but Limited</h3>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p><strong>Enhanced Returns:</strong> Potential for leveraged participation (e.g., 1.5x the market return) or high coupons.</p>
                    <p><strong>Capped Upside:</strong> The most common trade-off. A cap limits the maximum return, causing underperformance in strong bull markets.</p>
                    <div>
                        <strong>Downside Protection:</strong>
                        <ul className="list-disc list-inside ml-4 mt-2">
                            <li><strong>Buffers (Hard Protection):</strong> Absorb a specific initial percentage of loss.</li>
                            <li><strong>Barriers (Soft Protection):</strong> All-or-nothing protection that vanishes if a trigger level is breached.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center"><AlertTriangle className="w-7 h-7 text-red-500 mr-3" />The Risks: A Multi-Faceted Threat</h3>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p><strong>Market Risk:</strong> The risk of the underlying asset performing poorly, leading to losses.</p>
                    <p><strong>Liquidity Risk:</strong> Notes are illiquid and designed to be held to maturity. Early sales likely result in significant losses.</p>
                    <p><strong>Complexity Risk:</strong> Opaque fees and complex formulas can lead to misunderstanding and unexpected outcomes.</p>
                    <p><strong>Call/Reinvestment Risk:</strong> An early call by the issuer forces reinvestment at a potentially unfavorable time.</p>
                </div>
            </div>
        </div>
        <div className="mt-16 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold text-red-800 dark:text-red-300 flex items-center"><Landmark className="w-6 h-6 mr-3" />The Paramount Risk: Issuer Credit Risk</h4>
            <div className="text-red-700 dark:text-red-200 mt-4">
                <p className="font-semibold">A structured note is an unsecured debt of the issuing bank. All protections and payments depend on the bank's solvency.</p>
                <p className="mt-2"><strong>Case Study: Lehman Brothers (2008).</strong> Investors in "100% Principal Protection Notes" lost most of their investment when Lehman went bankrupt. The "protection" was worthless because the issuer defaulted. This is a permanent lesson: credit risk can override every other feature of a structured note.</p>
            </div>
        </div>
    </Section>
);

// Due Diligence Checklist Section
const DueDiligenceSection = () => {
    const checklistItems = [
        { icon: <Landmark className="w-6 h-6 text-blue-500" />, title: "Assess Issuer Creditworthiness", description: "Is this a bank you are comfortable lending money to, unsecured, for the full term of the note?" },
        { icon: <FileText className="w-6 h-6 text-blue-500" />, title: "Read the Prospectus", description: "The marketing brochure is a sales tool. The legally binding details are in the official offering documents." },
        { icon: <GanttChartSquare className="w-6 h-6 text-blue-500" />, title: "Understand the Payout Formula", description: "Can you explain, in simple terms, the outcome in various market scenarios? If not, do not invest." },
        { icon: <Scale className="w-6 h-6 text-blue-500" />, title: "Clarify All Costs and Fees", description: "Press your advisor to quantify all embedded costs. Understand that the note's value on day one is less than the price paid." },
        { icon: <Banknote className="w-6 h-6 text-blue-500" />, title: "Confirm Your Liquidity Needs", description: "Acknowledge this is a hold-to-maturity investment. Do not use capital you might need before the maturity date." },
    ];

    return (
        <Section className="bg-gray-50 dark:bg-gray-900">
            <SectionTitle>The Prudent Investor's Due Diligence Checklist</SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {checklistItems.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-start space-x-4">
                        <div className="flex-shrink-0">{item.icon}</div>
                        <div>
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">{item.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

// FAQ Section
const FaqItem = ({ question, children }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 dark:text-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <ChevronsUpDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <div className="text-gray-600 dark:text-gray-300 space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
};

const FaqSection = () => (
  <Section className="bg-white dark:bg-gray-800">
    <SectionTitle>Frequently Asked Questions</SectionTitle>
    <div className="max-w-3xl mx-auto">
      <FaqItem question="Can I synthesize my own structured note?">
        <p><strong>Theoretically, yes.</strong> You could buy a zero-coupon bond and options separately. <strong>Practically, no.</strong> Individuals cannot access the institutional pricing, low transaction costs, and execution efficiency that banks can. The DIY result would be far less attractive.</p>
      </FaqItem>
      <FaqItem question="What is the tax treatment of structured notes?">
        <p>It's complex and often unfavorable. Gains are frequently taxed as <strong>ordinary income</strong>, not the lower long-term capital gains rate. Some notes can also create "phantom income," requiring you to pay taxes on money you haven't received yet. Holding them in a tax-sheltered account like an IRA is often the best strategy.</p>
      </FaqItem>
      <FaqItem question="Are structured notes good or bad investments?">
        <p>They are neither. They are highly specialized tools. For a sophisticated investor who does thorough due diligence, they can be effective for achieving specific goals (like defined downside protection). For an inexperienced investor, they are generally unsuitable due to their complexity, illiquidity, and hidden risks.</p>
      </FaqItem>
    </div>
  </Section>
);

export default function StructuredNotesPage() {
  const currentArticle = articles.find(article => article.slug === 'structured-notes-demystified-comprehensive-guide');

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}

      <div className="min-h-screen bg-white dark:bg-gray-800">
        {/* Header with Return to Home button */}
        <div className="bg-white dark:bg-gray-800 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
              
              {/* Deep Research Badge */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                Deep Research
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="antialiased font-sans">
          <HeroSection />
          <main>
            <WhatAreStructuredNotesSection />
            <WhyHNWInvestorsLikeThemSection />
            <TypesOfNotesSection />
            <RiskRewardSection />
            <DueDiligenceSection />
            <FaqSection />
          </main>
        </div>

        {/* Educational Disclaimer */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Educational Content:</strong> This analysis is for educational purposes only and does not constitute investment advice. 
                  Structured notes are complex financial instruments that may not be suitable for all investors. Past performance does not guarantee future results. 
                  Please consult with a qualified financial advisor before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          </div>
        </footer>
      </div>
    </>
  );
} 