'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Helper: Icon SVGs for the sidebar ---
const ICONS = {
  abstract: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>,
  vrp: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="M18.7 8a6 6 0 0 0-8.4-5.2"></path><path d="M6.3 18a6 6 0 0 1 8.4-5.2"></path></svg>,
  performance: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>,
  indexes: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
  risk: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
  landscape: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  synthesis: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
  references: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
};

// --- Data: Content from the research paper ---
const researchData = {
  title: "The Academic Foundations of Option Writing",
  subtitle: "A Review of Modern Research on Risk Premia, Strategy Performance, and Risk Management",
  author: "Dr. Evelyn Reed, CFA",
  date: "September 7, 2025",
  keyTakeaways: [
    { title: "The Primacy of the VRP", text: "Systematic option selling is profitable due to the Variance Risk Premium, which compensates sellers for providing market insurance." },
    { title: "Empirical Outperformance", text: "Net premium-selling strategies have historically generated superior risk-adjusted returns compared to buying options or holding the underlying asset alone." },
    { title: "Risk, Not Alpha", text: "This outperformance is not a free lunch but fair compensation for bearing significant, negatively skewed tail risk." },
    { title: "Tail Risk is Paramount", text: "The primary challenge and key to long-term success is a robust and cost-effective tail risk management program." },
  ],
  sections: [
    {
      id: "abstract",
      title: "Abstract",
      icon: ICONS.abstract,
      content: `<p>This paper synthesizes decades of academic research on the practice of option writing (selling). We establish that the persistent profitability of these strategies is primarily explained by the Variance Risk Premium (VRP), an empirical phenomenon where implied volatility systematically exceeds realized volatility. This premium serves as compensation for sellers who underwrite insurance against adverse market events, particularly unhedgeable jump risk. We review the empirical performance of foundational strategies like covered calls and short straddles, confirming their historical ability to generate superior risk-adjusted returns. A critical distinction is drawn between writing options on broad-market indexes, which is driven by institutional hedging, and on individual equities, which is more influenced by speculative retail sentiment. The paper concludes by identifying the dominant challenge of option writing—the management of left-tail risk—and reviews emerging research on economical hedging techniques and novel, top-down pricing frameworks. The central thesis is that successful option writing should be viewed not as a source of alpha, but as the systematic management of an insurance portfolio where long-term viability is contingent on prudent risk management.</p>`
    },
    {
      id: "section-1",
      title: "The Variance Risk Premium",
      icon: ICONS.vrp,
      content: `<div class="bg-gray-100 p-6 rounded-lg mb-8 border border-gray-200">
        <h4 class="text-lg font-semibold text-gray-800 mb-4">Visualizing the Variance Risk Premium (VRP)</h4>
        <div class="w-full text-sm text-gray-600">
          <svg viewBox="0 0 400 200" class="w-full h-auto">
            <line x1="30" y1="180" x2="380" y2="180" stroke="#9ca3af" stroke-width="1"></line>
            <line x1="30" y1="20" x2="30" y2="180" stroke="#9ca3af" stroke-width="1"></line>
            <text x="15" y="25" font-size="12" fill="#6b7280" style="transform: rotate(-90deg) translate(-100px, 0px);">Volatility</text>
            <text x="190" y="195" font-size="12" fill="#6b7280">Time</text>
            <path d="M 40 100 Q 120 40, 200 90 T 360 80" stroke="#3b82f6" stroke-width="2" fill="none" stroke-dasharray="4"></path>
            <text x="45" y="95" font-size="12" fill="#3b82f6" font-weight="bold">Implied Volatility</text>
            <path d="M 40 130 Q 120 110, 200 130 T 360 110" stroke="#10b981" stroke-width="2" fill="none"></path>
            <text x="45" y="145" font-size="12" fill="#10b981" font-weight="bold">Realized Volatility</text>
            <path d="M200,90 L200,130" stroke="#ef4444" stroke-width="1.5"></path>
            <text x="205" y="115" font-size="12" fill="#ef4444" font-weight="bold">VRP</text>
          </svg>
          <p class="mt-2 text-center">The VRP is the spread between the consistently higher priced implied volatility and the subsequently observed realized volatility.</p>
        </div>
      </div>
      <p>The practice of option writing is underpinned by a robust empirical phenomenon: the Variance Risk Premium (VRP). This premium is the theoretical cornerstone explaining why, on average, systematically selling options has been a profitable endeavor. It is not an arbitrage opportunity but rather compensation for bearing a specific, often unhedgeable, risk.</p>
      <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-3">1.1 Defining the Variance Risk Premium</h3>
      <p>The VRP represents the difference between the market's expectation of future variance (implied volatility) and the subsequent realized variance. Empirically, implied volatility is systematically higher than realized volatility across most assets and time periods [1]. This positive spread means option sellers, over time, collect more premium than needed to compensate for the actual volatility, resulting in a positive expected return.</p>`
    },
    {
      id: "section-2",
      title: "Strategy Performance",
      icon: ICONS.performance,
      content: `<p>Moving from theory to practice, this section synthesizes the extensive academic literature that has empirically tested the performance of specific option writing strategies. A consistent theme emerges: strategies involving the net selling of options have historically generated superior risk-adjusted returns, a direct consequence of harvesting the VRP.</p>
      <div class="overflow-x-auto my-8">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr>
              <th class="border-b-2 p-4 text-sm font-semibold text-gray-700">Strategy</th>
              <th class="border-b-2 p-4 text-sm font-semibold text-gray-700">Description</th>
              <th class="border-b-2 p-4 text-sm font-semibold text-gray-700">Typical Return Profile</th>
              <th class="border-b-2 p-4 text-sm font-semibold text-gray-700">Primary Risk</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr>
              <td class="border-b p-4 font-medium text-gray-900">Covered Call (Buy-Write)</td>
              <td class="border-b p-4 text-gray-600">Long underlying stock + short out-of-the-money call option.</td>
              <td class="border-b p-4 text-gray-600">Lower volatility, capped upside, partially hedged downside.</td>
              <td class="border-b p-4 text-gray-600">Significant stock depreciation.</td>
            </tr>
            <tr>
              <td class="border-b p-4 font-medium text-gray-900">Cash-Secured Put</td>
              <td class="border-b p-4 text-gray-600">Short out-of-the-money put option, collateralized by cash.</td>
              <td class="border-b p-4 text-gray-600">Similar to a covered call, collects premium for willingness to buy.</td>
              <td class="border-b p-4 text-gray-600">Assignment on a falling stock.</td>
            </tr>
            <tr>
              <td class="border-b p-4 font-medium text-gray-900">Short Strangle</td>
              <td class="border-b p-4 text-gray-600">Short out-of-the-money call and put options.</td>
              <td class="border-b p-4 text-gray-600">High probability of small profit, profits from low volatility.</td>
              <td class="border-b p-4 text-gray-600">Large, theoretically unlimited loss from sharp price moves.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-3">2.1 A Comprehensive Comparison: Hemler and Miller</h3>
      <p>Hemler and Miller provide one of the most comprehensive academic comparisons of multiple options-based strategies applied to individual stocks.[12, 13, 24, 25] They examined five strategies on a portfolio of ten widely-held stocks. The results were powerful: across all risk-adjusted measures (Sharpe, Sortino, etc.), strategies that involved a net selling of option premium systematically outperformed those involving a net purchase. The performance ranking consistently placed the Covered Combination (net seller of two options) first and the Protective Put (net buyer of one option) last. This effectively isolates the impact of premium collection as the dominant driver of excess risk-adjusted returns.</p>`
    },
    {
      id: "section-3",
      title: "Indexes vs. Equities",
      icon: ICONS.indexes,
      content: `<p>The academic literature makes a clear and critical distinction between writing options on broad-market indexes versus individual stocks. The differences stem from structural characteristics, market microstructure, and the divergent motivations of market participants.</p>
      <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-3">3.1 Divergent Trader Behavior and Motivations</h3>
      <p>Research from Lemmon and Ni (2014) shows the <strong>index options market</strong> is dominated by sophisticated institutions using options for <strong>hedging</strong>. This creates a persistent, structural demand for portfolio insurance, which is a primary driver of the VRP.[30] In contrast, the <strong>individual stock options market</strong> sees more participation from retail investors, whose motivation is more geared towards <strong>speculation</strong>, often driven by sentiment and chasing past returns.[30]</p>
      <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-3">3.2 Implications for Pricing and Performance</h3>
      <p>These differences mean that writing index options is a purer method of harvesting the structural, institutional-driven VRP. Writing options on individual stocks involves harvesting a VRP that is a composite of the structural premium plus an additional premium driven by behavioral biases and retail sentiment. Research by Broadie, Chernov, and Johannes (2007) reinforces this, finding that the high returns from selling index puts are largely fair compensation for bearing the significant tail risk of a market crash, which is precisely the risk institutions are paying to avoid.[33]</p>`
    },
    {
      id: "section-4",
      title: "Tail Risk Management",
      icon: ICONS.risk,
      content: `<p>While profitable long-term, option writing's primary vulnerability is tail risk—the potential for rare but severe losses that can erase years of accumulated premiums. This risk arises from the writer's non-linear and asymmetric risk profile, specifically short gamma and short vega.</p>
      <ul class="list-disc list-inside mt-4 space-y-2 pl-4">
        <li><strong>Short Gamma:</strong> Losses accelerate as the underlying asset moves against the position, forcing a dynamic hedger to "buy high and sell low."</li>
        <li><strong>Short Vega:</strong> The position loses value when implied volatility increases, which typically happens during a market crisis, compounding losses.</li>
      </ul>
      <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-3">4.1 Emerging Research on Economical Hedging</h3>
      <p>A promising stream of recent research focuses on more economical hedges. One surprisingly robust heuristic involves creating a portfolio of the "cheapest" available put options on liquid individual equities.[36, 39] The mechanism behind this is the <strong>asymmetry of correlation</strong>. During normal times, these stocks have low correlation, mitigating portfolio drag. During a systemic crash, correlations spike towards one, and the cheap, idiosyncratic puts pay off simultaneously, providing an effective and cost-efficient hedge.[36] This represents a paradigm shift from buying a single, expensive, "perfect" hedge to constructing a diversified portfolio of cheap, "imperfect" hedges.</p>`
    },
    {
      id: "section-5",
      title: "The Evolving Landscape",
      icon: ICONS.landscape,
      content: `<p>The frontier of options research is advancing towards new pricing frameworks and the integration of behavioral finance.</p>
      <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-3">5.1 A New Paradigm: The "Top-Down" Framework</h3>
      <p>In their 2020 paper, Carr and Wu propose a revolutionary "top-down" valuation framework.[41, 43, 44] Instead of starting with the unobservable dynamics of the underlying asset (the "bottom-up" approach), this framework starts with an observable option contract and its implied volatility. It links the option's fair value directly to its P&L attribution (delta, gamma, vega risks). This decentralized approach tightly integrates pricing with the practical reality of risk management and has been shown to generate significantly better pricing performance than existing models.[44]</p>
      <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-3">5.2 The Growing Influence of Behavioral Finance</h3>
      <p>A growing body of evidence suggests that behavioral biases, particularly investor overconfidence, play a significant role in option pricing.[45] Research finds that overconfidence leads to higher trading volume, which contributes to larger mispricings, especially in stocks with high retail interest. This suggests that option writers may not only be harvesting the structural VRP but also collecting a premium for accommodating the behavioral biases of sentiment-driven traders.[45]</p>`
    },
    {
      id: "section-6",
      title: "Synthesis and Conclusion",
      icon: ICONS.synthesis,
      content: `<p>The academic literature provides a clear and compelling narrative about the risks and rewards of selling options.</p>
      <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-3">6.1 An Expert's Synthesis</h3>
      <p>A successful option writing strategy is the active management of an insurance portfolio. It requires a systematic approach, a deep understanding of the negatively skewed risk profile, a sophisticated and cost-effective hedging program, and an awareness of market dynamics and potential premium compression from strategy saturation.</p>
      <h3 class="text-xl font-semibold text-blue-600 mt-6 mb-3">6.2 Unresolved Questions for Future Research</h3>
      <p>Open questions for future research include: the nature of the VRP in new asset classes like cryptocurrencies; the impact of AI and machine learning on forecasting and hedging; the long-term effects of the "retailization" of option writing on the premium itself; and the further integration of behavioral and rational models into a unified pricing framework.</p>`
    },
    {
      id: "references",
      title: "References",
      icon: ICONS.references,
      content: `<p>This review is a synthesis of findings from numerous academic papers. The key foundational and recent works that inform this analysis are listed below. The bracketed numbers correspond to citations within the text.</p>
      <ol class="list-decimal list-inside mt-4 space-y-3 text-gray-600">
        <li><strong>[1] Carr, P., & Wu, L. (2009).</strong> <em>Variance Risk Premia.</em> The Review of Financial Studies, 22(3), 1311-1341.</li>
        <li><strong>[2, 4] Bakshi, G., & Kapadia, N. (2003a).</strong> <em>Delta-Hedged Gains and the Negative Market Volatility Risk Premium.</em> The Journal of Business, 76(4), 527-566.</li>
        <li><strong>[5] Bekaert, G., Engstrom, E., & Ermolov, A. (2022).</strong> <em>The Variance Risk Premium in Equilibrium Models.</em> Journal of Financial Economics, 145(2), 263-287.</li>
        <li><strong>[9, 10, 11] Whaley, R. E. (2002).</strong> <em>The Investor's Guide to Stock Options.</em> John Wiley & Sons.</li>
        <li><strong>[12, 13, 24, 25] Hemler, M. L., & Miller, T. W. (2009).</strong> <em>Using Options to Enhance Portfolio Performance.</em> The Journal of Investing, 18(1), 57-69.</li>
        <li><strong>[26, 27, 28] Cboe Global Markets. (Various Years).</strong> <em>White Papers on BXM and PUTW Indices.</em></li>
        <li><strong>[30] Lemmon, M., & Ni, S. X. (2014).</strong> <em>Investor Sentiment and the Stock-Option Volume Ratio.</em> The Review of Financial Studies, 27(12), 3507-3543.</li>
        <li><strong>[33] Broadie, M., Chernov, M., & Johannes, M. (2007).</strong> <em>Understanding Index Option Returns.</em> The Review of Financial Studies, 22(11), 4493-4529.</li>
        <li><strong>[36, 39] Israelov, R., & Nielsen, L. N. (2015).</strong> <em>Still Not a Free Lunch: The Cost of Hedging Option-Selling Strategies.</em> The Journal of Alternative Investments, 18(2), 23-40.</li>
        <li><strong>[41, 43, 44] Carr, P., & Wu, L. (2020).</strong> <em>A Top-Down Approach to Option Valuation.</em> Available at SSRN 3641328.</li>
        <li><strong>[45] Ge, Z., & Lin, T. C. (2014).</strong> <em>Do Individual Investors Trade on Sentiments? Evidence from the Options Market.</em> Journal of Banking & Finance, 48, 1-15.</li>
      </ol>`
    }
  ]
};

// --- Helper Components ---
const Section = ({ id, title, content, onRef }) => (
  <section 
    id={id} 
    ref={(el) => onRef(id, el)} 
    className="mb-12 py-8 scroll-mt-20"
  >
    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-4">{title}</h2>
    <div
      className="prose prose-lg max-w-none text-gray-700 prose-h3:text-blue-600 prose-strong:text-gray-800 prose-a:text-blue-600"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </section>
);

const Sidebar = ({ sections, activeSection, setActiveSection }) => {
  const handleClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    document.querySelector(`#${id}`).scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 xl:w-1/6 md:sticky md:top-0 md:h-screen p-8 md:overflow-y-auto bg-gray-50/80 backdrop-blur-sm border-r border-gray-200">
      <h2 className="text-sm font-bold uppercase text-gray-500 tracking-widest mb-6">Contents</h2>
      <nav>
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => handleClick(e, section.id)}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out text-gray-600 hover:bg-gray-200 hover:text-gray-800 ${
                  activeSection === section.id ? 'bg-blue-100 text-blue-600 font-semibold' : ''
                }`}
              >
                <span className={activeSection === section.id ? 'text-blue-500' : 'text-gray-400'}>
                  {section.icon}
                </span>
                <span>{section.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const KeyTakeaways = ({ takeaways }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 mb-16 shadow-sm">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Key Research Findings</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {takeaways.map((item, index) => (
        <div key={index}>
          <p className="font-semibold text-gray-800 mb-1">{item.title}</p>
          <p className="text-gray-600">{item.text}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function AcademicFoundationsOptionWriting() {
  const [activeSection, setActiveSection] = useState(researchData.sections[0].id);
  const sectionRefs = useRef({});
  const currentArticle = articles.find(article => article.slug === 'academic-foundations-option-writing-research-review');

  // Initialize refs for each section
  useEffect(() => {
    researchData.sections.forEach(section => {
      if (!sectionRefs.current[section.id]) {
        sectionRefs.current[section.id] = null;
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px', threshold: 0 }
    );

    // Observe all section elements
    Object.entries(sectionRefs.current).forEach(([id, element]) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // Cleanup observer
      Object.entries(sectionRefs.current).forEach(([id, element]) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        html {
          scroll-behavior: smooth;
          font-family: 'Inter', sans-serif;
        }
        body {
          background-color: #f9fafb; /* bg-gray-50 */
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        {/* Return to Home Button */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        {/* Badges */}
        <div className="relative">
          {/* Deep Research Badge - Top Left */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
              Deep Research
            </span>
          </div>
          
          {/* Options Badge - Bottom Right */}
          <div className="absolute bottom-4 right-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
              Options
            </span>
          </div>

          {/* Book Summary Badge - Top Right */}
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
              Book Summary
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row bg-gray-50 text-gray-700">
          <Sidebar 
            sections={researchData.sections} 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
          
          <main className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 p-8 md:p-12 lg:p-16">
            <header className="mb-12">
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-3 leading-tight">
                {researchData.title}
              </h1>
              <p className="text-xl text-gray-500">{researchData.subtitle}</p>
            </header>

            <KeyTakeaways takeaways={researchData.keyTakeaways} />

            <div>
              {researchData.sections.map(section => (
                <Section
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  content={section.content}
                  onRef={(id, el) => {
                    sectionRefs.current[id] = el;
                  }}
                />
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Continue Your Options Education</h3>
              <p className="text-gray-700 mb-6">
                This research synthesis provides the academic foundation for understanding option writing strategies. 
                Explore our practical guides and interactive tools to apply these concepts in your trading.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {currentArticle?.googleDoc && (
                  <a 
                    href={currentArticle.googleDoc}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    Read Full Research Paper
                  </a>
                )}
                <a 
                  href="https://www.sophie-ai-finance.com/option"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                >
                  Explore Option Strategies
                </a>
              </div>
            </div>

            <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
              <p>Research Synthesis by {researchData.author}</p>
              <p>Published: {researchData.date}</p>
              <p className="mt-4">© 2025 SOPHIE Daddy Quant Blog. Educational content for informational purposes only.</p>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
