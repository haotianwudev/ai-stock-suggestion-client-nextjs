'use client';

import React from 'react';
import { BookOpen, Info, BarChart, Landmark, Beaker } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

const InfoIcon = () => (
  <div className="p-3 bg-blue-100 text-[#A8672E] dark:text-[#D08F52] rounded-xl">
    <Info className="h-6 w-6" />
  </div>
);

const LandmarkIcon = () => (
  <div className="p-3 bg-blue-100 text-[#A8672E] dark:text-[#D08F52] rounded-xl">
    <Landmark className="h-6 w-6" />
  </div>
);

const ChartBarIcon = () => (
  <div className="p-3 bg-blue-100 text-[#A8672E] dark:text-[#D08F52] rounded-xl">
    <BarChart className="h-6 w-6" />
  </div>
);

const BeakerIcon = () => (
  <div className="p-3 bg-blue-100 text-[#A8672E] dark:text-[#D08F52] rounded-xl">
    <Beaker className="h-6 w-6" />
  </div>
);

const BookOpenIcon = () => (
  <div className="p-3 bg-blue-100 text-[#A8672E] dark:text-[#D08F52] rounded-xl">
    <BookOpen className="h-6 w-6" />
  </div>
);

const Section = ({ id, title, icon, children }: { id: string; title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <section id={id} className="py-8">
    <div className="bg-white dark:bg-[#0A0D14] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="p-8 sm:p-10">
        <div className="flex items-center mb-8">
          <span className="mr-5">{icon}</span>
          <h2 className="text-3xl font-bold text-gray-900 font-serif">{title}</h2>
        </div>
        <div className="prose prose-lg max-w-none text-gray-700">
          {children}
        </div>
      </div>
    </div>
  </section>
);

const StyledTable = ({ title, headers, rows }: { title?: string; headers: string[]; rows: string[][] }) => (
  <div className="my-10 overflow-x-auto">
    {title && <h3 className="text-xl font-semibold text-gray-800 mb-4 font-serif">{title}</h3>}
    <div className="shadow-md rounded-lg bg-white dark:bg-[#0A0D14] border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-[#0A0D14] divide-y divide-gray-200">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={`px-6 py-4 whitespace-normal text-sm ${cellIndex === 0 ? 'font-medium text-gray-900' : 'text-gray-600'}`}
                  dangerouslySetInnerHTML={{ __html: cell }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Subsection = ({ title, content, bullets = [] }: { title: string; content?: string; bullets?: string[] }) => (
  <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 mb-6">
    <h4 className="font-semibold text-[#A8672E] dark:text-[#D08F52] mb-2 text-lg">{title}</h4>
    {content && <p className="mb-3 text-gray-600" dangerouslySetInnerHTML={{ __html: content }}></p>}
    {bullets.length > 0 && (
      <ul className="space-y-2 list-disc list-inside text-gray-600 marker:text-[#A8672E] dark:text-[#D08F52]">
        {bullets.map((bullet, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: bullet }}></li>
        ))}
      </ul>
    )}
  </div>
);

export default function InsidersEdgeComprehensiveAnalysis() {
  const reportData = {
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        icon: <BookOpenIcon />,
        content: `Insider trading occupies a unique and often misunderstood position in the financial lexicon. The term itself carries a dual meaning, describing both a <strong>legitimate, regulated market activity</strong> and a notorious form of <strong>financial fraud</strong>. On one hand, legal insider trading occurs daily as corporate executives, directors, and major shareholders buy and sell stock in their own companies, a practice essential for executive compensation, portfolio management, and corporate signaling. These transactions, when properly disclosed, offer a window into the perspectives of those with the most intimate knowledge of a company's operations and prospects. On the other hand, illegal insider trading involves the exploitation of <span class='text-[#A8672E] dark:text-[#D08F52] font-semibold'>confidential, price-sensitive information</span> to gain an unfair advantage, an act that fundamentally undermines market integrity and investor confidence.`
      },
      {
        id: "legal-landscape",
        title: "The Legal and Regulatory Landscape",
        icon: <InfoIcon />,
        subsections: [
          {
            title: "The Legal-Illegal Dichotomy",
            content: `The legality of insider trading hinges entirely on whether the trade was based on <strong class='text-[#A8672E] dark:text-[#D08F52]'>material non-public information (MNPI)</strong>. Legal trading is routine for insiders managing their portfolios, while illegal trading exploits confidential information for unfair gain.`
          },
          {
            title: "SEC Regulation and Forms",
            content: `The SEC mandates transparency through a series of public filings. The key forms include:`,
            bullets: [
              "<strong>Form 3:</strong> An initial statement of beneficial ownership when an individual becomes an insider.",
              "<strong>Form 4:</strong> A report of any transaction, filed <span class='text-[#A8672E] dark:text-[#D08F52] font-semibold'>within two business days.</span> This is the <strong>most critical form</strong> for investors.",
              "<strong>Form 5:</strong> An annual summary of transactions not reported on a Form 4."
            ]
          },
          {
            title: "Rule 10b5-1: The Affirmative Defense",
            content: `This rule allows insiders to set up pre-arranged trading plans when they do not possess MNPI. Major 2023 amendments were introduced to close loopholes by adding:`,
            bullets: [
              "Mandatory <strong class='text-[#A8672E] dark:text-[#D08F52]'>'cooling-off' periods</strong> between when a plan is established and when the first trade can occur.",
              "<strong>Restrictions</strong> on having multiple, overlapping trading plans.",
              "<strong>Enhanced disclosure requirements</strong> to increase transparency around the use of these plans."
            ]
          }
        ],
        table: {
          title: "Legal vs. Illegal Insider Trading",
          headers: ["Aspect", "Legal Insider Trading", "Illegal Insider Trading"],
          rows: [
            ["Definition", "Trading by insiders in their own company's stock without MNPI.", "Trading based on MNPI in breach of a duty of trust."],
            ["Basis of Trade", "Public info, financial planning, diversification.", "Unannounced earnings, M&A deals, regulatory news."],
            ["Disclosure", "Mandatory and public via SEC Forms 3, 4, 5.", "Covert and illegal."],
            ["Regulation", "SEC disclosure rules (Securities Exchange Act of 1934).", "Prohibited by Section 10(b) and Rule 10b-5."]
          ]
        }
      },
      {
        id: "sentiment-indicator",
        title: "Insider Transactions as a Market Sentiment Indicator",
        icon: <ChartBarIcon />,
        subsections: [
          {
            title: "The Core Thesis: Voting with Wallets",
            content: "Insider buys are a powerful signal of confidence. As Peter Lynch noted, insiders sell for many reasons, but they buy for only one: <strong class='text-[#A8672E] dark:text-[#D08F52]'>they believe the price will rise.</strong> Sales are more ambiguous and can occur for reasons like diversification or tax planning."
          },
          {
            title: "Bullish Signals to Watch For",
            content: "Certain buying patterns are considered particularly strong bullish signals:",
            bullets: [
              "<strong>Open-Market Purchases:</strong> Using personal funds shows the strongest conviction.",
              "<strong>Cluster Buys:</strong> Multiple insiders buying around the same time suggests widespread confidence.",
              "<strong>Contrarian Buying:</strong> Purchasing stock against negative market sentiment or after a significant price drop."
            ]
          },
          {
            title: "Empirical Evidence",
            content: "Academic research has consistently shown that:",
            bullets: [
              "Portfolios that mimic insider purchases tend to <strong class='text-[#A8672E] dark:text-[#D08F52]'>earn abnormal returns</strong> over time.",
              "Aggregate insider activity (the ratio of buys to sells across the market) can help predict broad market movements.",
              "The predictive signal from insider trades is often <strong>stronger for smaller, less-followed companies.</strong>"
            ]
          }
        ]
      },
      {
        id: "landmark-cases",
        title: "Cautionary Tales: Landmark Cases",
        icon: <LandmarkIcon />,
        table: {
          title: "Comparison of Landmark Insider Trading Cases",
          headers: ["Case", "Key Individuals", "Nature of Illicit Activity", "Key Consequence / Market Impact"],
          rows: [
            ["Martha Stewart / ImClone", "Martha Stewart, Samuel Waksal", "<strong>Tipping and Obstruction.</strong> Stewart was convicted for lying to investigators about a trade based on a tip.", "Highlighted 'tippee' liability and the severe risks of <strong>obstructing a federal investigation.</strong>"],
            ["Raj Rajaratnam / Galleon Group", "Raj Rajaratnam, Rajat Gupta", "<strong>Organized trading network.</strong> A hedge fund manager used a vast network of corporate insiders to get tips.", "Exposed modern, systemic insider trading. Established <strong>wiretaps as a key enforcement tool.</strong>"],
            ["Jeffrey Skilling / Enron", "Jeffrey Skilling, Kenneth Lay", "<strong>Fraud-related selling.</strong> Executives sold stock at inflated prices, knowing the company's financials were fraudulent.", "Led to the landmark <strong>Sarbanes-Oxley Act of 2002</strong>, revolutionizing corporate governance and disclosure."]
          ]
        }
      },
      {
        id: "advanced-concepts",
        title: "Limitations and Advanced Concepts",
        icon: <BeakerIcon />,
        subsections: [
          {
            title: "The Noise in the Signal",
            content: "Insider signals are not infallible. The predictive power is stronger for <strong>smaller, less-efficiently priced companies.</strong> Analysts must be wary of data-snooping bias and avoid overly simplistic strategies."
          },
          {
            title: "The Evolving Cat-and-Mouse Game",
            content: "As regulators adapt, sophisticated insiders develop new strategies:",
            bullets: [
              "<strong>Trading on Public Attention:</strong> Systematically selling during periods of retail investor hype and buying when that attention fades.",
              "<strong>Trading in Economically Linked Firms:</strong> Trading a supplier's or customer's stock to bypass their own company's trading restrictions."
            ]
          },
          {
            title: "Unintended Consequences of Transparency",
            content: "The two-day Form 4 reporting window, designed to increase fairness, may have had an unintended side effect:",
            bullets: [
              "It allows insiders to monitor each other's trades in near real-time.",
              "This can potentially facilitate <strong class='text-[#A8672E] dark:text-[#D08F52]'>implicit coordination and herd-like behavior</strong>, amplifying their collective advantage."
            ]
          }
        ]
      }
    ]
  };

  return (
    <ArticleFrame
      slug="insiders-edge-comprehensive-analysis"
      additionalDisclaimer="Misuse of material non-public information can result in severe legal penalties including fines and imprisonment. This article does not constitute legal or investment advice."
    >
      <div className="max-w-4xl mx-auto px-4 text-gray-900">
        <Section id="introduction" title={reportData.sections[0].title} icon={reportData.sections[0].icon}>
          <p className="mb-6" dangerouslySetInnerHTML={{ __html: reportData.sections[0].content as string }}></p>
        </Section>

        <Section id="legal-landscape" title={reportData.sections[1].title} icon={reportData.sections[1].icon}>
          <div className="space-y-8 mt-8">
            {reportData.sections[1].subsections!.map((sub, index) => (
              <Subsection
                key={index}
                title={sub.title}
                content={sub.content}
                bullets={sub.bullets || []}
              />
            ))}
          </div>
          <StyledTable
            title={reportData.sections[1].table!.title}
            headers={reportData.sections[1].table!.headers}
            rows={reportData.sections[1].table!.rows}
          />
        </Section>

        <Section id="sentiment-indicator" title={reportData.sections[2].title} icon={reportData.sections[2].icon}>
          <div className="space-y-8 mt-8">
            {reportData.sections[2].subsections!.map((sub, index) => (
              <Subsection
                key={index}
                title={sub.title}
                content={sub.content}
                bullets={sub.bullets || []}
              />
            ))}
          </div>
        </Section>

        <Section id="landmark-cases" title={reportData.sections[3].title} icon={reportData.sections[3].icon}>
          <StyledTable
            title={reportData.sections[3].table!.title}
            headers={reportData.sections[3].table!.headers}
            rows={reportData.sections[3].table!.rows}
          />
        </Section>

        <Section id="advanced-concepts" title={reportData.sections[4].title} icon={reportData.sections[4].icon}>
          <div className="space-y-8 mt-8">
            {reportData.sections[4].subsections!.map((sub, index) => (
              <Subsection
                key={index}
                title={sub.title}
                content={sub.content}
                bullets={sub.bullets || []}
              />
            ))}
          </div>
        </Section>
      </div>
    </ArticleFrame>
  );
}
