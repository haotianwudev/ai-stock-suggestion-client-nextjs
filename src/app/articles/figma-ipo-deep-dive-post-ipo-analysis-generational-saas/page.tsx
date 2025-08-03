'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronUp, ChevronDown, DollarSign, Briefcase, Users, TrendingUp, AlertTriangle, ShieldCheck, Scale, FileText, Zap, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Data for charts
const financialData = [
  { name: 'FY 2023', Revenue: 504.9, 'Adj. Op. Margin (%)': -52.9, 'Net Income': 737.8 },
  { name: 'FY 2024', Revenue: 749.0, 'Adj. Op. Margin (%)': 1.6, 'Net Income': -732.1 },
  { name: 'Q1 2024', Revenue: 156.2, 'Adj. Op. Margin (%)': 7.0, 'Net Income': 13.5 },
  { name: 'Q1 2025', Revenue: 228.2, 'Adj. Op. Margin (%)': 17.4, 'Net Income': 44.9 },
];

const valuationData = [
  { name: 'Figma (FIG)', 'P/S Ratio': 75, marketCap: 68, revenueGrowth: 46 },
  { name: 'Adobe (ADBE)', 'P/S Ratio': 6.5, marketCap: 148, revenueGrowth: 11 },
  { name: 'Salesforce (CRM)', 'P/S Ratio': 6.8, marketCap: 247, revenueGrowth: 11 },
  { name: 'Canva (Private)', 'P/S Ratio': 12.3, marketCap: 37, revenueGrowth: 44 },
  { name: 'Snowflake (SNOW)', 'P/S Ratio': 24, marketCap: 75, revenueGrowth: 33 },
];



// Reusable Components
const Section = ({ title, children, icon: Icon }) => (
  <section className="mb-12 bg-white dark:bg-gray-800/50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
      <Icon className="w-8 h-8 mr-4 text-teal-500" />
      {title}
    </h2>
    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
      {children}
    </div>
  </section>
);

const CollapsibleSection = ({ title, children, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <section className="mb-12 bg-white dark:bg-gray-800/50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Icon className="w-8 h-8 mr-4 text-teal-500" />
            {title}
          </div>
          {isOpen ? <ChevronUp className="w-8 h-8 text-gray-500" /> : <ChevronDown className="w-8 h-8 text-gray-500" />}
        </h2>
      </button>
      {isOpen && (
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 mt-4">
          {children}
        </div>
      )}
    </section>
  );
};

const StatCard = ({ title, value, subtext, icon: Icon }) => (
  <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl shadow-md flex items-center space-x-4 border border-gray-200 dark:border-gray-700">
    <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
      <Icon className="w-8 h-8 text-teal-600 dark:text-teal-300" />
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      {subtext && <p className="text-xs text-gray-400 dark:text-gray-500">{subtext}</p>}
    </div>
  </div>
);

const ProductCard = ({ title, description, icon }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-4">
      <img src={icon} alt={`${title} icon`} className="w-10 h-10 mr-4"/>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const Highlight = ({ children }) => <span className="text-teal-500 dark:text-teal-400 font-semibold">{children}</span>;

const RiskCard = ({ title, children }) => (
  <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg mt-4">
    <h4 className="font-bold text-red-800 dark:text-red-300">{title}</h4>
    <p className="text-red-700 dark:text-red-400">{children}</p>
  </div>
);

const StrengthCard = ({ title, children }) => (
  <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r-lg mt-4">
    <h4 className="font-bold text-green-800 dark:text-green-300">{title}</h4>
    <p className="text-green-700 dark:text-green-400">{children}</p>
  </div>
);

export default function FigmaIPOAnalysis() {
  const currentArticle = articles.find(article => article.slug === 'figma-ipo-deep-dive-post-ipo-analysis-generational-saas');

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

      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200">
        <main className="container mx-auto p-4 sm:p-8">
          {/* Return to Home Button */}
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>

          {/* Deep Research Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Deep Research
            </span>
          </div>

          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-4">
              <img src="https://static.figma.com/app/icon/1/icon-192.png" alt="Figma Logo" className="w-16 h-16"/>
              <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Figma (NYSE: FIG)
              </h1>
            </div>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              A Post-IPO Deep Dive into the Generational SaaS Company
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Analysis as of August 2, 2025</p>
          </header>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard title="IPO Price" value="$33.00" subtext="July 31, 2025" icon={DollarSign} />
            <StatCard title="1st Day Close" value="$115.50" subtext="+250% Gain" icon={TrendingUp} />
            <StatCard title="Market Cap (Close)" value="~$68 Billion" subtext="Fully Diluted" icon={Briefcase} />
            <StatCard title="Q1'25 Revenue Growth" value="46% YoY" subtext="$228.2M Revenue" icon={Users} />
          </div>

          <Section title="Executive Summary" icon={FileText}>
            <p>
              Figma's IPO was one of the most successful in recent history, reflecting its <Highlight>dominant market leadership</Highlight>, 
              elite SaaS financial metrics, and a compelling growth story. The collapse of the <Highlight>$20B Adobe acquisition</Highlight> 
              paradoxically fueled investor enthusiasm, arming Figma with a <Highlight>$1B termination fee</Highlight> and validating its 
              strategic importance. This created a "hero's narrative" that propelled its valuation far beyond the original offer.
            </p>
            <p className="mt-4">
              The company's best-in-class <Highlight>Product-Led Growth (PLG)</Highlight> model has driven viral adoption, resulting in a 
              financial profile characterized by rapid growth (~46%), exceptional gross margins (&gt;90%), and a world-class <Highlight>Net Dollar Retention of 132%</Highlight>. 
              However, the subsequent share price surge has resulted in a stratospheric valuation, creating a dilemma for investors. 
              This analysis concludes that while Figma is an exceptional company, its current stock price is prohibitive, warranting a 
              patient approach for a more favorable entry point.
            </p>
          </Section>

          <Section title="Company Overview" icon={Briefcase}>
            <p className="mb-6">
              Founded in 2012, Figma revolutionized the design world by creating a web-based, collaborative platform. 
              This <Highlight>"multiplayer" approach</Highlight> transformed isolated workflows into real-time, team-based creation, making 
              Figma the core infrastructure for modern digital product development. Its business model is a masterclass in <Highlight>Product-Led Growth</Highlight>, 
              where a generous free tier drives viral, bottom-up adoption within enterprises, which then convert to high-value contracts.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <ProductCard 
                title="Figma Design" 
                description="The flagship product and industry standard for UI/UX design, prototyping, and creating scalable Design Systems." 
                icon="https://static.figma.com/app/icon/1/icon-192.png" 
              />
              <ProductCard 
                title="FigJam" 
                description="An online whiteboarding tool for team brainstorming, diagramming, and ideation, expanding Figma's reach to non-designers." 
                icon="https://static.figma.com/app/icon/7/icon-192.png" 
              />
              <ProductCard 
                title="Dev Mode" 
                description="A specialized workspace that bridges the gap between design and engineering, allowing developers to inspect designs and extract code." 
                icon="https://static.figma.com/app/icon/8/icon-192.png" 
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Strategic Pivot to AI</h3>
            <p>
              At Config 2025, Figma unveiled a suite of AI-powered products to expand its capabilities and empower a broader user base. 
              This strategic push aims to evolve Figma from a design tool into an <Highlight>operating system for AI-driven creation</Highlight>. 
              New products like <Highlight>Figma Make</Highlight> (prompt-to-app) and <Highlight>Figma Sites</Highlight> (AI website builder) are 
              designed to dramatically increase productivity and expand its Total Addressable Market.
            </p>
          </Section>

          <Section title="Financial Dissection" icon={DollarSign}>
            <p className="mb-8">
              Figma exhibits an elite financial profile. While headline numbers in FY23 (+$1B Adobe fee) and FY24 
              (-$889M one-time stock compensation) were skewed, the underlying business shows a clear trend of high 
              growth, exceptional margins, and emerging profitability. The "clean" <Highlight>Q1 2025 results</Highlight> provide the 
              clearest picture, showing a <Highlight>$44.9 million net income</Highlight> and a strong <Highlight>17% GAAP operating margin</Highlight>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-4xl font-bold text-teal-500">132%</p>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Net Dollar Retention</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-4xl font-bold text-teal-500">&gt;90%</p>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Gross Margin</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-4xl font-bold text-teal-500">63</p>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Rule of 40 Score</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Consolidated Financial Performance ($M)
            </h3>
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <BarChart data={financialData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis yAxisId="left" orientation="left" stroke="#9ca3af" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(31, 41, 55, 0.8)',
                      borderColor: '#4b5563',
                      borderRadius: '0.75rem',
                      color: '#ffffff'
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="Revenue" fill="#14b8a6" name="Revenue ($M)" />
                  <Bar yAxisId="right" dataKey="Adj. Op. Margin (%)" fill="#f97316" name="Adj. Op. Margin (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>

          <Section title="The IPO Event" icon={TrendingUp}>
            <p>
              Demand for Figma's IPO was immense, with the offering reportedly <Highlight>40 times oversubscribed</Highlight>. 
              After initially targeting a $25-$28 range, the deal was priced at <Highlight>$33 per share</Highlight>. The stock opened 
              for trading at $85 and closed its first day at $115.50, a historic <Highlight>250% increase</Highlight>. This valued the 
              company at nearly <Highlight>$68B</Highlight>, more than 3x Adobe's terminated offer.
            </p>
            
            <div className="mt-6 space-y-4 bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">IPO Details at a Glance:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <p><strong>Ticker:</strong> FIG (NYSE)</p>
                <p><strong>Deal Size:</strong> ~$1.22 Billion</p>
                <p><strong>Lead Underwriters:</strong> Morgan Stanley, Goldman Sachs</p>
                <p><strong>Shares Offered:</strong> 36.9M (12.5M primary, 24.4M secondary)</p>
                <p><strong>Governance:</strong> Dual-class; CEO Dylan Field controls <Highlight>~74%</Highlight> of voting power.</p>
                <p><strong>Lock-up Expiration:</strong> <Highlight>January 27, 2026</Highlight> (180 days).</p>
              </div>
            </div>
          </Section>

          <Section title="The Adobe Saga: A Blessing in Disguise" icon={ShieldCheck}>
            <p>
              In December 2023, Adobe's proposed $20B acquisition of Figma was terminated due to regulatory pressure from the US, UK, and EU. 
              This seemingly negative event turned into a massive catalyst for Figma:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-3">
              <li><strong>Ultimate Validation:</strong> The <Highlight>$20B price tag</Highlight> from the industry leader validated Figma's strategic importance and market disruption.</li>
              <li><strong>$1 Billion Windfall:</strong> A non-dilutive termination fee provided a massive capital injection to fund growth and AI development without giving up equity.</li>
              <li><strong>Regulatory Moat:</strong> The failed deal now acts as a deterrent to other potential Big Tech acquirers, protecting Figma's independence and long-term strategy.</li>
              <li><strong>Hero's Narrative:</strong> The story of beating Goliath and then achieving an even higher public valuation created powerful, invaluable IPO hype.</li>
            </ul>
          </Section>

          <Section title="Valuation: Paying for Perfection" icon={Scale}>
            <p className="mb-8">
              The central challenge for investors is Figma's extreme valuation. Trading at a Price-to-Sales (P/S) multiple of around <Highlight>75x</Highlight>, 
              the stock appears to have priced in years of flawless execution, leaving no margin for safety. This is dramatically higher than peers like 
              Adobe (<Highlight>~6.5x P/S</Highlight>), Salesforce (<Highlight>~6.8x P/S</Highlight>), and even the fast-growing private company Canva (<Highlight>~12.3x P/S</Highlight>). 
              The bull case hinges on Figma becoming a foundational "operating system for creativity," while the bear case points to the high risk of valuation compression.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Comparative P/S Ratios
            </h3>
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <BarChart data={valuationData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" stroke="#9ca3af" />
                  <YAxis dataKey="name" type="category" stroke="#9ca3af" width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(31, 41, 55, 0.8)',
                      borderColor: '#4b5563',
                      borderRadius: '0.75rem',
                      color: '#ffffff'
                    }}
                    labelStyle={{ fontWeight: 'bold' }}
                    formatter={(value) => [`${value}x`, 'P/S Ratio']}
                  />
                  <Legend />
                  <Bar dataKey="P/S Ratio" fill="#0d9488" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>

          <Section title="Investment Thesis & Recommendation" icon={Award}>
            <p className="mb-6">
              Figma is a phenomenal, best-in-class company. However, the investment decision is a classic case of a 
              wonderful company at a formidable price. The current valuation presents the single greatest risk.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-bold mb-2">Key Strengths</h4>
                <StrengthCard title="Market Dominance">
                  Near-monopolistic position in the core UI/UX design market, having effectively displaced legacy competitors.
                </StrengthCard>
                <StrengthCard title="Elite Financials">
                  A rare combination of 45%+ growth, &gt;90% gross margins, and emerging GAAP profitability.
                </StrengthCard>
                <StrengthCard title="Visionary Leadership">
                  Founder-led with a clear vision for an AI-driven future and a proven track record of execution.
                </StrengthCard>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Key Risks</h4>
                <RiskCard title="Valuation Risk">
                  Sky-high P/S multiple leaves no margin for safety and is vulnerable to correction.
                </RiskCard>
                <RiskCard title="Execution Risk">
                  Must flawlessly execute on AI products to grow into its valuation.
                </RiskCard>
                <RiskCard title="Lock-up Expiration">
                  Potential for significant selling pressure in January 2026.
                </RiskCard>
              </div>
            </div>

            <div className="bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 p-6 rounded-r-lg">
              <h4 className="font-bold text-2xl text-teal-800 dark:text-teal-200 mb-2">Recommendation:</h4>
              <p className="text-xl font-semibold text-teal-700 dark:text-teal-300">Place on Priority Watchlist</p>
              <p className="mt-4 text-teal-600 dark:text-teal-400">
                The most logical course of action is patience. Await a market correction or a period of consolidation 
                that allows fundamentals to catch up to the stock price, creating a more attractive risk/reward 
                profile before initiating a position.
              </p>
            </div>
          </Section>

          {/* Educational Disclaimer */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
            <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">Educational Disclaimer</h4>
            <p className="text-yellow-700 dark:text-yellow-300">
              This analysis is for educational purposes only and does not constitute investment advice. 
              All investments carry risk, and past performance does not guarantee future results. 
              Please consult with a qualified financial advisor before making investment decisions.
            </p>
          </div>

          {/* Footer */}
          <footer className="text-center mt-12 text-xs text-gray-400 dark:text-gray-500">
            <p>Disclaimer: This is a simulated analysis for illustrative purposes only and does not constitute financial advice. Data is sourced from public filings and news reports surrounding the Figma IPO in July/August 2025. All investments carry risk.</p>
            <p className="mt-2">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
          </footer>
        </main>
      </div>
    </>
  );
}