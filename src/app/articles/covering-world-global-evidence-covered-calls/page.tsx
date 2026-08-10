'use client';

import { useState } from 'react';
import { BarChart, Briefcase, ChevronDown, Globe, Shield, TrendingDown, TrendingUp } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

const qaData = [
  {
    question: "What is a covered call strategy and how does it typically perform?",
    answer: "A covered call strategy involves holding a long position in an underlying equity index while simultaneously selling (writing) a call option on that same index. This strategy is often described as providing \"equity-like\" returns but with lower volatility. For example, an at-the-money (ATM) covered call on the S&P 500 index generally has a beta of approximately 0.5 to the underlying equity index, which contributes to its reduced volatility. While selling call options generates a volatility risk premium, replacing some of the lost equity risk premium from the reduced equity exposure, the strategy still adds risk compared to a pure 0.5-beta equity strategy. Globally, covered calls have delivered similar annualized geometric excess returns to their underlying indexes (5.4% vs. 4.5% average) but with significantly lower annualized volatility (14.8% vs. 21.2% average) and smaller maximum drawdowns (45% vs. 63% average)."
  },
  {
    question: "How can a typical covered call strategy be broken down into its core components?",
    answer: "A covered call strategy can be decomposed into three distinct economic components: <br/><strong>Passive Equity Exposure:</strong> This component represents the strategy's long-term average allocation to equity markets. It is less than 1.0 by construction and is responsible for earning the equity risk premium. It is the dominant source of risk for covered calls, contributing, on average, 70% of the strategy's variance. <br/><strong>Short Volatility Exposure:</strong> This component arises from the delta-neutralized short call option and captures the volatility risk premium. Equity index options tend to be richly priced (implied volatilities are higher than realized volatilities), making selling them a positive source of return for covered call strategies. It is the smallest contributor to covered call risk (7% of variance on average) but has the highest Sharpe ratio among the components (0.74 on average). <br/><strong>Dynamic Equity Exposure (or Equity Timing):</strong> This component reflects the changes in the covered call's equity exposure due to factors like the passage of time, changes in the underlying index's value, and implied volatility of the option. While it adds a relatively large amount of risk (23% of variance on average), its contribution to the strategy's expected returns is statistically insignificant across all indexes, implying it is largely uncompensated in efficient markets."
  },
  {
    question: "What is the \"volatility risk premium\" and how does it relate to covered calls?",
    answer: "The volatility risk premium refers to the phenomenon where the implied volatility of options (the market's expectation of future volatility) is typically higher than the actual realized volatility of the underlying asset. This \"rich pricing\" of options means that selling them, as in a covered call strategy, can be a consistent positive source of return. This premium is not limited to the S&P 500 index; studies have shown its existence across various global equity indexes, contributing to the \"short volatility exposure\" component of covered calls and improving their risk-adjusted returns."
  },
  {
    question: "Why is managing \"dynamic equity exposure\" important in covered call strategies?",
    answer: "Dynamic equity exposure in a covered call strategy is a significant source of uncompensated risk. As the underlying index's value changes, for example, the call option's equity exposure also changes, which in turn dynamically affects the overall portfolio's equity exposure. This time-varying equity exposure adds risk but, in efficient markets, does not predictably contribute to expected returns. By actively hedging this dynamic equity exposure, investors can reduce the strategy's overall volatility without significantly impacting average returns, thereby leading to superior risk-adjusted returns (higher Sharpe ratios) and lower maximum drawdowns. For instance, hedging this exposure in S&P 500 covered calls reduced annualized volatility from 11.4% to 9.2%, increasing the Sharpe ratio from 0.37 to 0.52."
  },
  {
    question: "How do \"risk-managed\" covered calls compare to traditional covered calls and underlying equities?",
    answer: "Risk-managed covered calls actively hedge the dynamic equity exposure to stabilize the strategy's equity allocation, typically targeting a constant beta (e.g., 0.5). This management technique results in: <br/>- <strong>Higher Returns:</strong> On average, annualized excess returns improved from 5.3% for traditional covered calls to 5.9% for risk-managed ones (or 4.0% to 5.4% for compounded returns). <br/>- <strong>Lower Volatility:</strong> Volatility was reduced by approximately 20% on average, from 14.7% to 11.7%. <br/>- <strong>Improved Sharpe Ratios:</strong> The average Sharpe ratio increased from 0.35 to 0.51. <br/>- <strong>Reduced Drawdowns:</strong> Maximum peak-to-trough drawdowns were lower in every index, improving from an average of -44% to -35%. <br/>- <strong>Better Downside Characteristics:</strong> Risk-managed covered calls exhibited less negative skewness and lower downside betas. <br/>When compared to underlying equity indexes, risk-managed covered calls provide similar returns with substantially lower volatility and smaller drawdowns, making them a compelling defensive alternative."
  },
  {
    question: "Do transaction costs negate the benefits of risk-managed covered calls?",
    answer: "No, the benefits of risk-managed covered calls, particularly their higher Sharpe ratios, are estimated to remain intact even after accounting for transaction costs. While both traditional and risk-managed covered calls incur options trading costs (around 28 basis points per year for options, on average), risk-managed strategies also incur costs for hedging the underlying equity (estimated at 33 basis points per year, given high turnover). Despite these additional hedging costs, the net Sharpe ratio of risk-managed covered calls (0.46) still significantly outperforms that of non-risk-managed covered calls (0.33) and the average Sharpe ratio for equities (0.32)."
  },
  {
    question: "What are the advantages of global diversification for covered call strategies?",
    answer: "Global diversification applies to covered calls for similar reasons it applies to equities. A globally diversified portfolio of covered calls provides exposure to multiple equity markets and short volatility premiums, while mitigating uncompensated equity timing exposure. <br/>- <strong>Lower Volatility:</strong> Globally diversified covered call portfolios achieve similar arithmetic average returns as individual country strategies but with lower volatility. For risk-managed covered calls, average volatility for individual indexes was 11.7%, versus 9.7% for a market-cap weighted global portfolio. <br/>- <strong>Higher Sharpe Ratios:</strong> The reduction in volatility from diversification leads to improved Sharpe ratios (e.g., a 0.06 improvement for risk-managed versions). <br/>- <strong>Better Diversification of Components:</strong> The short volatility component, in particular, is more diversifiable across global indexes (average cross-correlation of 0.4) than the passive equity component (average cross-correlation of 0.7), further enhancing the benefits of global diversification for covered calls. <br/>- <strong>Reduced Idiosyncratic Risk:</strong> Global diversification reduces concentration risk and exposure to single-country idiosyncratic events."
  },
  {
    question: "What is the overall conclusion regarding equity index covered calls, especially when risk-managed and globally diversified?",
    answer: "Equity index covered calls offer an attractive alternative to direct equity exposure by providing similar average compounded returns with lower volatility and reduced drawdowns. The research consistently demonstrates that managing the statistically insignificant but high-risk dynamic equity exposure embedded in options significantly enhances the Sharpe ratio of covered call strategies (an average improvement of 0.16). Furthermore, applying a global diversification approach to these risk-managed covered calls magnifies their benefits, leading to even lower volatility and higher Sharpe ratios compared to single-country implementations. Therefore, a globally diversified portfolio of risk-managed covered calls can serve as a superior, defensive alternative to global equity, offering similar returns with improved risk characteristics."
  }
];

// Reusable ThemeCard Component
function ThemeCard({ icon, title, points }: { icon: React.ReactNode; title: string; points: string[] }) {
  return (
    <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center mb-4">
        <div className="bg-slate-100 p-2 rounded-full mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 font-serif">{title}</h3>
      </div>
      <ul className="space-y-3 text-slate-600 dark:text-slate-400">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="text-[#A8672E] dark:text-[#D08F52] mr-3 mt-1">&#10003;</span>
            <span dangerouslySetInnerHTML={{ __html: point }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Reusable AccordionItem Component
function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-5 font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:bg-[#14171B] focus:outline-none"
      >
        <span>{question}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      </div>
    </div>
  );
}

export default function CoveredCallSummaryPage() {
  return (
    <ArticleFrame
      slug="covering-world-global-evidence-covered-calls"
      additionalDisclaimer="Options trading involves substantial risk and is not suitable for all investors. Past performance does not guarantee future results. Always consult with a qualified financial advisor before making investment decisions."
    >
      <section className="mb-12 bg-white dark:bg-[#0A0D14] p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center font-serif">
          <Briefcase className="mr-3 text-[#A8672E] dark:text-[#D08F52]" size={32} />
          Executive Summary
        </h2>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          The research paper demonstrates that covered call strategies, when applied to a global set of equity indexes, consistently provide &ldquo;equity-like&rdquo; returns with significantly lower volatility and reduced drawdowns compared to holding the underlying equity indexes. The authors decompose covered call performance into three components: passive equity exposure, short volatility exposure, and dynamic equity exposure (equity timing). They find that while passive equity drives most of the risk and return, short volatility exposure offers the highest Sharpe ratio. Crucially, the dynamic equity exposure is identified as a source of uncompensated risk. The paper strongly advocates for &ldquo;risk-managed&rdquo; covered call strategies, which actively hedge this dynamic equity exposure, leading to superior risk-adjusted returns (higher Sharpe ratios) and even lower volatility and drawdowns. Furthermore, global diversification of these risk-managed covered call strategies offers additional benefits, acting as a defensive alternative to global equity with similar returns but enhanced risk characteristics.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-200 mb-8 text-center font-serif">Key Themes & Important Findings</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ThemeCard
            icon={<TrendingUp className="text-[#1D8A70] dark:text-[#3CBF9C]" />}
            title="Equity-Like Returns, Lower Risk"
            points={[
              "Covered call strategies show similar benefits across global equity indexes, not just the S&P 500.",
              "They offer 'equity-like' returns with 'substantially lower volatility' by combining long equity and short volatility exposures.",
              "<strong>Data:</strong> 6.6% annualized return (vs. 7.2% for indexes) with much lower volatility (14.8% vs. 21.2%).",
              "<strong>Superior Risk-Adjusted Returns:</strong> Average Sharpe ratio of 0.45 vs. 0.33 for underlying indexes.",
              "<strong>Reduced Drawdowns:</strong> Maximum drawdowns were smaller on average (45% vs. 63%)."
            ]}
          />

          <ThemeCard
            icon={<BarChart className="text-[#A8672E] dark:text-[#D08F52]" />}
            title="Performance Decomposition"
            points={[
              "<strong>1. Passive Equity:</strong> The main driver of risk and return (70% of variance), earning the equity risk premium.",
              "<strong>2. Short Volatility:</strong> Earns the 'volatility risk premium' from richly priced options. Highest Sharpe ratio component (0.74) despite being the smallest risk contributor (7% of variance).",
              "<strong>3. Dynamic Equity (Equity Timing):</strong> Arises from changing equity exposure. A source of significant, uncompensated risk (23% of variance) that detracted from performance."
            ]}
          />

          <ThemeCard
            icon={<Shield className="text-sky-500" />}
            title="Benefits of Risk-Managed Strategies"
            points={[
              "Since dynamic equity exposure is an uncompensated and 'hedgeable' risk, hedging it improves results.",
              "<strong>Improved Performance:</strong> Hedging slightly improved returns (5.3% to 5.9%) but significantly reduced volatility by 20% (14.7% to 11.7%).",
              "<strong>Higher Sharpe Ratios:</strong> Increased on average from 0.35 to 0.51.",
              "<strong>Lower Drawdowns:</strong> Maximum drawdowns improved from -44% to -35%.",
              "<strong>Transaction Costs:</strong> Even after costs, the net Sharpe ratio of risk-managed strategies (0.46) remains well above non-risk-managed (0.33) and equities (0.32)."
            ]}
          />

          <ThemeCard
            icon={<Globe className="text-amber-500" />}
            title="Global Diversification"
            points={[
              "Diversifying risk-managed covered calls globally provides further benefits.",
              "The short volatility component is more diversifiable (0.4 correlation) than the equity component (0.7 correlation).",
              "<strong>Portfolio-Level Benefits:</strong> A market-cap weighted global portfolio had even lower volatility (9.7% vs. 11.7% for individual indexes).",
              "The Sharpe ratio improved further from 0.51 to 0.57.",
              "This leads to a 'less concentrated' portfolio with 'less exposure to idiosyncratic events.'"
            ]}
          />

          <div className="lg:col-span-2 bg-white dark:bg-[#0A0D14] p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center font-serif">
              <TrendingDown className="mr-3 text-[#BC4128] dark:text-[#E2694A]" size={28} />
              The Problem of Uncompensated Risk
            </h3>
            <p className="text-md leading-relaxed text-slate-600 dark:text-slate-400">
              A critical finding is that the <strong>Dynamic Equity Exposure</strong>, which accounts for about 23% of a standard covered call&apos;s variance, is an uncompensated risk. It does not contribute positively to expected returns and, on average, slightly detracted from performance. The paper&apos;s primary argument is that this specific risk should be actively managed and hedged away to create a more efficient investment strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Q&A Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-200 mb-8 text-center font-serif">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {qaData.map((item, index) => (
            <AccordionItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>

      <section className="mt-16 bg-blue-900 text-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 font-serif">Conclusion</h2>
        <p className="text-lg leading-relaxed text-blue-200">
          The study provides strong global evidence that covered call strategies, especially when risk-managed, are a compelling defensive alternative to traditional equity. They deliver similar compounded returns with lower volatility and smaller drawdowns. The consistency of these findings across eleven global indexes highlights the robustness of harvesting the &ldquo;volatility risk premium&rdquo; and the clear benefits of hedging uncompensated risk within covered call strategies.
        </p>
      </section>
    </ArticleFrame>
  );
}
