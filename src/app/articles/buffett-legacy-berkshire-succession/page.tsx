'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Menu, X, FileText, Users, DollarSign, Shield, TrendingUp, BarChart, CheckCircle, XCircle, Gift, Building, Anchor, Zap, BookOpen, Quote, Briefcase, PiggyBank, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Data from the Document ---
const navItems = [
  { name: 'The "Goodbye" Letter', href: '#section-1', icon: FileText },
  { name: 'The Succession', href: '#section-2', icon: Users },
  { name: 'Current Status', href: '#section-3', icon: BarChart },
  { name: 'The Berkshire Model', href: '#section-4', icon: Building },
  { name: 'Investment Thesis', href: '#section-5', icon: TrendingUp },
  { name: 'Conclusion: The Legacy', href: '#section-6', icon: Gift },
];

const table1Data = {
  headers: ['Business Segment', 'Q3 2025 Operating Earnings', 'Year-over-Year Change', 'Key Drivers'],
  rows: [
    ['Insurance - Underwriting', '$2.40 Billion', '~+200%', 'Lower catastrophe losses; strong reinsurance'],
    ['Insurance - Investment Income', '$3.20 Billion', '-13%', 'Lower short-term interest rates'],
    ['BNSF (Railroad)', '$1.40 Billion', '+5%', 'Higher revenue; still lagging competitors'],
    ['Berkshire Hathaway Energy (BHE)', '$1.39 Billion', '-2.5%', 'Slight decline; facing regulatory headwinds'],
    ['Manufacturing, Service & Retailing', '$4.10 Billion', '+3.5%', 'Modestly better top-line'],
    ['Total Operating Earnings', '$13.5 Billion', '+34%', 'Led by insurance underwriting profit'],
  ],
};

const table2Data = {
  headers: ['Feature', 'Berkshire Hathaway (Conglomerate)', 'Mutual Fund / ETF'],
  rows: [
    ['Asset Type', 'Wholly-owned operating companies & stocks', 'Only fractional shares of public stocks'],
    ['Source of Leverage', '~$175 billion in Insurance Float', 'None or debt-based leverage'],
    ['Control over Assets', 'Full operational control of subsidiaries', 'Zero control (can only sell stock)'],
    ['Primary Value Driver', 'Operating earnings from 60+ subsidiaries', 'Capital gains and dividends'],
  ],
};

const table3Data = {
  headers: ['Analyst / Service', 'Rating (BRK.B)', 'Fair Value (BRK.B)', 'Rationale'],
  rows: [
    ['Morningstar', '4-Star (Buy)', '$510.00', '"Moderately Undervalued." Strong operating results.'],
    ['Zacks Consensus', '#3 (Hold)', 'N/A', 'Mixed EPS consensus.'],
    ['Robinhood Analyst Consensus', '42.9% Hold / 42.9% Buy', 'N/A', 'Mixed consensus among 7 ratings.'],
    ['Investing.com Analyst Avg', 'Buy', '$767,690 (BRK.A)', '+2.95% Upside'],
  ],
};

// --- Reusable Components ---
const StatCard = ({ title, value, icon, color }: { title: string; value: string; icon: any; color: { bg: string; text: string } }) => {
  const IconComponent = icon;
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300">
      <div className={`p-3 rounded-full inline-block ${color.bg} ${color.text}`}>
        <IconComponent size={28} />
      </div>
      <p className="text-sm font-medium text-gray-500 mt-4 uppercase tracking-wider">{title}</p>
      <p className="text-4xl font-extrabold text-gray-900 mt-2">{value}</p>
    </div>
  );
};

const InfoCard = ({ title, description, icon, color }: { title: string; description: string; icon: any; color: { border: string; bg: string; text: string } }) => {
  const IconComponent = icon;
  return (
    <div className={`bg-white border-l-4 ${color.border} shadow-lg rounded-lg p-6`}>
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color.bg} ${color.text}`}>
          <IconComponent size={24} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 mt-4 text-base">{description}</p>
    </div>
  );
};

const ResponsiveTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md mt-6">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              scope="col"
              className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ContentSection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="mb-16 scroll-mt-24">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{title}</h2>
    <div className="w-24 h-1.5 bg-blue-600 rounded-full mb-8"></div>
    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">{children}</div>
  </section>
);

const KeyQuote = ({ children, citation }: { children: React.ReactNode; citation: string }) => (
  <blockquote className="my-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg shadow">
    <Quote className="text-blue-400 h-10 w-10 transform -scale-x-100" />
    <p className="text-2xl font-medium text-gray-800 italic leading-relaxed my-4">{children}</p>
    <cite className="text-gray-600 font-semibold not-italic">&mdash; {citation}</cite>
  </blockquote>
);

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => {
  return (
    <>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl w-72 z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:top-0 md:h-screen md:z-10`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-700">Buffett&apos;s Legacy</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>
        <ul className="py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name} className="px-4">
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                >
                  <Icon className="text-gray-400 group-hover:text-blue-600" size={20} />
                  <span>{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

// --- Main App Component ---
export default function BuffettLegacyArticle() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentArticle = articles.find(article => article.slug === 'buffett-legacy-berkshire-succession');

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
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

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Header (Mobile) */}
      <header className="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center md:hidden z-10">
        <h1 className="text-xl font-bold text-blue-700">Buffett&apos;s Legacy</h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-700 hover:text-blue-600"
        >
          <Menu size={28} />
        </button>
      </header>

      {/* Main Content */}
      <main className="md:ml-72 p-6 md:p-12 lg:p-16 max-w-7xl mx-auto">
        {/* Deep Research Badge */}
        <div className="absolute top-4 left-4 md:left-80 z-10">
          <span className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            Deep Research
          </span>
        </div>

        {/* Return to Home Button */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Article Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          The End of an Era: Warren Buffett&apos;s Legacy and Berkshire Hathaway&apos;s Succession
        </h1>

        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          A comprehensive analysis of Warren Buffett&apos;s &quot;goodbye letter,&quot; the succession plan with Greg Abel as CEO, and Berkshire&apos;s $382B fortress balance sheet. Exploring the triumvirate leadership structure, the insurance float model, and the investment thesis for the post-Buffett era.
        </p>

        {/* Section 1: The "Goodbye" Letter */}
        <ContentSection id="section-1" title="The End of an Era: The 'Goodbye' Letter">
          <p>
            Warren Buffett&apos;s &quot;goodbye letter&quot; marks a pivotal moment, signaling his transition from CEO to &quot;Chairman of the Culture.&quot; He announced he is &quot;going quiet,&quot; ending his famous annual report and meeting Q&A, and replacing them with a more philosophical annual Thanksgiving message.
          </p>

          <KeyQuote citation="Warren Buffett, Thanksgiving Message">
            This is a pledge, not a prediction: Berkshire is built to last.
          </KeyQuote>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <InfoCard
              title="A Shift in Communication"
              description="Buffett is bifurcating his role: Greg Abel will take over all fiduciary and financial communication, while Buffett retains a new platform for philosophy and values."
              icon={BookOpen}
              color={{ border: 'border-blue-500', bg: 'bg-blue-100', text: 'text-blue-600' }}
            />
            <InfoCard
              title="Tribute to Charlie Munger"
              description="A heartfelt tribute to his late partner, described as a 'protective big brother' and 'a better teacher,' reinforcing the core Berkshire value of rational, ego-less collaboration."
              icon={Users}
              color={{ border: 'border-gray-500', bg: 'bg-gray-100', text: 'text-gray-600' }}
            />
            <InfoCard
              title="Final Critique on CEO Pay"
              description="A sharp critique of excessive CEO compensation driven by 'envy and greed,' contrasting it with Berkshire's philosophy of internal modesty and avoiding a 'look-at-me rich' culture."
              icon={XCircle}
              color={{ border: 'border-red-500', bg: 'bg-red-100', text: 'text-red-600' }}
            />
            <InfoCard
              title="The Capstone Donation"
              description="Announced a new $1.3 billion donation and an acceleration of lifetime gifts, ensuring his children can fully dispense his fortune."
              icon={Gift}
              color={{ border: 'border-green-500', bg: 'bg-green-100', text: 'text-green-600' }}
            />
          </div>
        </ContentSection>

        {/* Section 2: The Succession */}
        <ContentSection id="section-2" title="The Succession: A New Triumvirate">
          <p>
            The transition is now official: Greg Abel will become CEO on January 1, 2026. Buffett&apos;s unique role has been deconstructed into a robust triumvirate:
          </p>

          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <span className="font-semibold">Greg Abel (CEO):</span> Full command of all operating companies and the final say on capital allocation.
            </li>
            <li>
              <span className="font-semibold">Todd Combs & Ted Weschler (Co-CIOs):</span> Manage multi-billion-dollar public stock portfolios.
            </li>
            <li>
              <span className="font-semibold">Warren Buffett (Chairman):</span> Provides board-level oversight and cultural guardianship.
            </li>
          </ul>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <InfoCard
              title="Greg Abel: The Successor"
              description="Buffett gave his full endorsement: 'Greg understands capital allocation as well as I do.' A long-time Berkshire veteran who built BHE, Abel is known as a tireless, detail-oriented manager."
              icon={Users}
              color={{ border: 'border-indigo-500', bg: 'bg-indigo-100', text: 'text-indigo-600' }}
            />
            <InfoCard
              title="The 'Golden Shield'"
              description="Buffett will retain his high-vote Class A shares, acting as a 'golden shield' to make any activist challenge to Abel's leadership impossible and signal his 100% confidence."
              icon={Shield}
              color={{ border: 'border-amber-500', bg: 'bg-amber-100', text: 'text-amber-600' }}
            />
            <InfoCard
              title="The Co-CIOs: Combs & Weschler"
              description="Todd Combs and Ted Weschler, who already manage billions, will continue to run the public stock portfolio. They provide a crucial 'sounding board' for Abel on major capital decisions."
              icon={TrendingUp}
              color={{ border: 'border-green-500', bg: 'bg-green-100', text: 'text-green-600' }}
            />
          </div>
        </ContentSection>

        {/* Section 3: Current Status */}
        <ContentSection id="section-3" title="Current Status: The $382B Fortress">
          <p>
            Greg Abel inherits a company of staggering financial strength, though it faces operational challenges in key segments. Operating earnings surged 34% in Q3 2025, but this masks divergence.
          </p>

          <div className="grid md:grid-cols-3 gap-8 my-8">
            <StatCard
              title="Record Cash Pile"
              value="$382 Billion"
              icon={DollarSign}
              color={{ bg: 'bg-green-100', text: 'text-green-600' }}
            />
            <StatCard
              title="Q3 Operating Earnings"
              value="+34% Y-o-Y"
              icon={TrendingUp}
              color={{ bg: 'bg-blue-100', text: 'text-blue-600' }}
            />
            <StatCard
              title="Insurance Float"
              value="~$175 Billion"
              icon={Anchor}
              color={{ bg: 'bg-teal-100', text: 'text-teal-600' }}
            />
          </div>

          <p className="mt-4">
            The cash hoard, held in T-bills, is an active &quot;call option&quot; on a future market dislocation. The earnings surge was led by a tripling in insurance underwriting profit, but other key segments like GEICO (rising costs) and BNSF (lagging competitors) are struggling.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Q3 2025 Segment Performance</h3>
          <ResponsiveTable headers={table1Data.headers} rows={table1Data.rows} />

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <InfoCard
              title="The 'Elephant Gun' Option"
              description="The $382B cash pile is not idle. Buffett and Abel see it as an 'elephant gun'—a call option on a future crisis, allowing them to provide liquidity to the market (like the 2008 BofA deal) at extremely favorable terms."
              icon={DollarSign}
              color={{ border: 'border-green-500', bg: 'bg-green-100', text: 'text-green-600' }}
            />
            <InfoCard
              title="Segment Headwinds"
              description="Key subsidiaries face challenges. GEICO is battling rising auto repair costs and ad-spend from competitors. BNSF (rail) is lagging Union Pacific in efficiency, a key metric Abel is focused on improving."
              icon={Briefcase}
              color={{ border: 'border-red-500', bg: 'bg-red-100', text: 'text-red-600' }}
            />
          </div>
        </ContentSection>

        {/* Section 4: The Berkshire Model */}
        <ContentSection id="section-4" title="The Berkshire Model: Not a Mutual Fund">
          <p>
            Berkshire Hathaway is not a mutual fund; it is a conglomerate holding company. Its primary assets are the 60+ businesses it owns 100%, like BNSF and GEICO. The stock portfolio is only one part of the business.
          </p>

          <div className="my-8 p-6 bg-gray-100 border border-gray-300 rounded-lg text-center text-gray-500 italic shadow-inner">
            [Visual Diagram: The Berkshire Hathaway Insurance Float Model]
          </div>

          <div className="my-8">
            <InfoCard
              title="The Secret Weapon: Insurance Float"
              description="Berkshire uses ~$175 billion in 'float'—premiums collected upfront—as a massive, interest-free loan from policyholders. This float is invested for Berkshire's own benefit, providing the leverage to buy stocks and entire companies."
              icon={Anchor}
              color={{ border: 'border-teal-500', bg: 'bg-teal-100', text: 'text-teal-600' }}
            />
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Conglomerate vs. Mutual Fund</h3>
          <ResponsiveTable headers={table2Data.headers} rows={table2Data.rows} />

          <div className="mt-8">
            <InfoCard
              title="The Power of Permanent Capital"
              description="Unlike a fund, Berkshire's capital is 'permanent.' It never has to sell assets to meet investor redemptions. This allows it to be a buyer during market panics when everyone else is forced to sell."
              icon={Building}
              color={{ border: 'border-indigo-500', bg: 'bg-indigo-100', text: 'text-indigo-600' }}
            />
          </div>
        </ContentSection>

        {/* Section 5: Investment Thesis */}
        <ContentSection id="section-5" title="Investment Thesis: Is Berkshire a 'Good Buy'?">
          <p>
            The market&apos;s emotional reaction to Buffett&apos;s exit has created a classic value opportunity. The stock has underperformed the S&P 500 significantly, even as operating earnings have surged.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg shadow">
              <div className="flex items-center space-x-3">
                <XCircle className="text-red-500" size={24} />
                <h3 className="text-2xl font-semibold text-red-800">The Bear Case</h3>
              </div>
              <p className="text-red-700 mt-3">
                The &quot;Buffett Premium&quot; is evaporating. The market has voted &apos;no confidence,&apos; and the company&apos;s massive size means the days of 19.9% compounded returns are over.
              </p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-600" size={24} />
                <h3 className="text-2xl font-semibold text-green-800">The Bull Case</h3>
              </div>
              <p className="text-green-700 mt-3">
                The stock is now &quot;moderately undervalued.&quot; The gap between a falling <em>price</em> and rising <em>value</em> (34% earnings surge) is a classic Buffett-style &quot;Buy&quot; signal.
              </p>
            </div>
          </div>

          <InfoCard
            title="The Buyback Pause"
            description="A key signal of undervaluation is gone. Berkshire *paused* its aggressive stock buyback program in Q3, suggesting Buffett/Abel believe the stock is no longer 'cheap' by their standards, despite analyst ratings."
            icon={Zap}
            color={{ border: 'border-amber-500', bg: 'bg-amber-100', text: 'text-amber-600' }}
          />

          <InfoCard
            title="The Dividend Question"
            description="With $382B in cash and buybacks paused, pressure is mounting. If Greg Abel initiates a dividend, it would be the biggest break from Buffett's philosophy, signaling a new era of 'value-and-income'."
            icon={Zap}
            color={{ border: 'border-purple-500', bg: 'bg-purple-100', text: 'text-purple-600' }}
          />

          <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Analyst Ratings Summary</h3>
          <ResponsiveTable headers={table3Data.headers} rows={table3Data.rows} />
        </ContentSection>

        {/* Section 6: Conclusion */}
        <ContentSection id="section-6" title="Conclusion: The Buffett Legacy">
          <p>
            Buffett&apos;s legacy is twofold: the creation of Berkshire as a &quot;compounding machine,&quot; and the &quot;distribution machine&quot; to give away 100% of the wealth it created.
          </p>

          <div className="my-8 grid md:grid-cols-2 gap-6">
            <InfoCard
              title="The Great Anti-Dynasty"
              description="Buffett's final act is the deliberate separation of his family from his fortune. He spent 60 years building an empire and is spending his final years ensuring it serves public shareholders and society, not his own bloodline."
              icon={Gift}
              color={{ border: 'border-blue-500', bg: 'bg-blue-100', text: 'text-blue-600' }}
            />
            <InfoCard
              title="The Common Investor's Benefit"
              description="For a regular investor, Berkshire remains a 'buy and hold' vehicle offering ETF-like diversification, a fortress balance sheet, and a management team (Abel, Combs, Weschler) aligned with their interests."
              icon={PiggyBank}
              color={{ border: 'border-green-500', bg: 'bg-green-100', text: 'text-green-600' }}
            />
          </div>

          <p>
            The &quot;Oracle&quot; is &quot;going quiet,&quot; but he leaves behind an institution. For the common investor, Berkshire remains a &quot;buy and hold&quot; vehicle offering ETF-like diversification, a fortress balance sheet, and a management team aligned with their interests.
          </p>
        </ContentSection>

        {/* Call-to-Action Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl my-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {currentArticle?.googleDoc && (
              <a 
                href={currentArticle.googleDoc}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                <FileText className="inline mr-2" />
                Read Full Research Paper
              </a>
            )}
          </div>
        </div>

        {/* Educational Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow-md my-8">
          <p className="text-sm text-gray-700">
            <span className="font-bold">Educational Disclaimer:</span> This analysis is for informational and educational purposes only and should not be considered investment advice. Investing in securities involves risk, including the potential loss of principal. Past performance does not guarantee future results. Always conduct your own research and consult with a qualified financial advisor before making investment decisions.
          </p>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-8 mt-16 text-center text-gray-500">
          <p>&copy; 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.</p>
        </footer>
      </main>
    </div>
  );
}
