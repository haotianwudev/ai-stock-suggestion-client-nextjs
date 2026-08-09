'use client';

import { BarChart, Activity, Shield, Eye, AlertTriangle, Scale, Bot, Users, BrainCircuit, BookOpen, Lightbulb, TrendingUp, Filter, ThumbsUp, ChevronsRight, FileText, UserCheck } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

const Section = ({ id, title, subtitle, children, icon: Icon }: {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) => (
  <section id={id} className="py-16 even:bg-gray-50 dark:even:bg-gray-900/50 -mx-4 px-4 sm:-mx-6 sm:px-6">
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex justify-center items-center mb-6">
        <div className="p-4 bg-white dark:bg-gray-900 rounded-full border-2 border-[#A8672E] dark:border-[#D08F52] shadow-md">
          {Icon && <Icon className="w-8 h-8 text-[#A8672E] dark:text-[#D08F52]" />}
        </div>
      </div>
      <h2 className="font-serif text-2xl sm:text-3xl text-gray-900 dark:text-white">{title}</h2>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>
    </div>
    <div className="mt-12 max-w-4xl mx-auto prose prose-lg dark:prose-invert text-gray-700 dark:text-gray-300 prose-headings:font-serif prose-headings:text-[#A8672E] dark:prose-headings:text-[#D08F52] prose-a:text-[#A8672E] dark:prose-a:text-[#D08F52] prose-strong:text-gray-900 dark:prose-strong:text-white">
      {children}
    </div>
  </section>
);

const StyledTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="not-prose my-12 overflow-x-auto">
    <div className="inline-block min-w-full align-middle">
      <div className="overflow-hidden shadow-lg ring-1 ring-black/5 dark:ring-white/10 rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-4 pl-4 pr-3 text-sm text-gray-600 dark:text-gray-400 sm:pl-6" dangerouslySetInnerHTML={{ __html: cell }}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const DetailCard = ({ icon: Icon, title, children }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow not-prose">
    <h3 className="font-serif text-lg text-[#A8672E] dark:text-[#D08F52] flex items-center">
      <Icon className="mr-3 text-[#A8672E] dark:text-[#D08F52]"/>
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{children}</p>
  </div>
);

export default function ViralVideosVolatileValuations() {
  const table1Headers = ["Dimension", "Social Media Recommender", "Financial Advisory System"];
  const table1Rows = [
    ["Primary Objective", "<strong>Maximize User Engagement</strong><br/>(watch time, likes, shares, virality)", "<strong>Maximize Risk-Adjusted Returns</strong><br/>(alpha, Sharpe ratio, meet financial goals)"],
    ["Core Data Inputs", "User interactions, content metadata, profile data (voluminous but behavior-driven)", "Market data (price, volume), economic indicators, company fundamentals, text (noisy, non-stationary, adversarial)"],
    ["Algorithmic Approach", "Collaborative & Content-Based Filtering, Deep Learning (for similarity & popularity)", "Quantitative factor models, Time-series forecasting, MPT optimization (for prediction & risk management)"],
    ["Risk Paradigm", "Social/Ethical Risk<br/>(Content moderation, echo chambers, user well-being)", "Financial & Systemic Risk<br/>(Portfolio diversification, hedging, regulatory compliance, market stability)"],
    ["Theoretical Foundation", "Heuristic, data-driven patterns of user behavior", "Grounded in established economic theories (e.g., Modern Portfolio Theory, Efficient Market Hypothesis)"],
    ["Regulatory Oversight", "Emerging regulations on content, data privacy (e.g., GDPR, CCPA)", "Heavy regulation by SEC, FINRA, etc. (covering suitability, best interest, market conduct, fiduciary duty)"],
  ];

  const table2Headers = ["Challenge", "Specific Implication in Finance", "Key Risk(s)", "Relevant Regulatory Principles/Bodies"];
  const table2Rows = [
    ["Algorithmic Bias", "Recommending stocks based on biased historical data; discriminatory credit scoring", "Unfair outcomes, financial exclusion, legal liability, reputational damage", "FINRA Rule 2010 (Just and Equitable Principles), Fair Lending Laws, Equal Credit Opportunity Act"],
    ["Explainability (Black Box)", "Inability to justify a specific stock recommendation or loan denial to a client or regulator", "Lack of trust, regulatory non-compliance, inability to debug or assign liability", "GDPR ('Right to Explanation'), FINRA Rule 3110 (Supervision), need for Explainable AI (XAI)"],
    ["Market Integrity", "Amplifying speculative bubbles (e.g., GameStop saga); enabling market manipulation", "Systemic risk, investor losses, erosion of market fairness", "SEC and AMF market abuse regulations, anti-manipulation rules"],
    ["Data Privacy & Security", "Misuse or breach of sensitive Personal Financial Information (PFI)", "Cyberattacks, identity theft, compliance violations, loss of customer trust", "SEC Regulation S-P, GDPR, CCPA, Gramm-Leach-Bliley Act"],
    ["Model & Operational Risk", "Model drift in changing markets, over-reliance on automation leading to flash crashes", "Financial losses, system failures, poor customer outcomes, compliance breaches", "Robust Model Risk Management (MRM) frameworks, Business Continuity Plans (BCP), SR 11-7 guidance"],
  ];

  return (
    <ArticleFrame slug="viral-videos-volatile-valuations-ai-algorithms-stock-picking">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="font-serif text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12">
          Can the algorithm that picks your next video also pick your next stock?
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 mb-4 text-left">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-4">Key Takeaways</h2>
          <ul className="space-y-3">
            <li className="flex items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span><span>Social platforms optimize for engagement (watch time, virality); financial advice must optimize for risk-adjusted returns&mdash;these objectives are structurally, not just superficially, different.</span></li>
            <li className="flex items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span><span>A viral stock recommendation doesn&apos;t signal success the way a viral video does&mdash;it creates a speculative bubble that distorts fundamental value.</span></li>
            <li className="flex items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span><span>Fiduciary duty, explainability requirements, and systemic-risk exposure make an engagement-first recommender legally and practically unworkable in finance.</span></li>
            <li className="flex items-start"><span className="text-[#A8672E] dark:text-[#D08F52] mr-3 font-bold">&bull;</span><span>The viable path is descriptive/educational augmentation&mdash;risk simulators, financial literacy tools, bias analysis&mdash;not a &ldquo;stock recommender&rdquo; built on social-media logic.</span></li>
          </ul>
        </div>
      </div>

      <div className="text-left">
        <Section
          id="tiktok-paradigm"
          title="The Social Media Paradigm"
          subtitle="Deconstructing the Engagement-First Recommendation Engine"
          icon={ThumbsUp}
        >
          <p>To evaluate their potential in finance, we must first understand how platforms like TikTok function. Their core objective is not accuracy or quality, but maximizing user engagement. This is achieved through a powerful, self-reinforcing hybrid system designed to capture and hold attention.</p>

          <div className="grid md:grid-cols-2 gap-8 my-10">
            <DetailCard icon={Filter} title="Content-Based Filtering">
              Analyzes video attributes like sounds, hashtags, and captions. It recommends content similar to what a user has previously engaged with, creating a highly personalized but potentially narrow &ldquo;filter bubble.&rdquo;
            </DetailCard>

            <DetailCard icon={Users} title="Collaborative Filtering">
              The engine of discovery. It identifies clusters of users with similar tastes and recommends content popular within that cluster, introducing users to new trends and topics they are statistically likely to enjoy.
            </DetailCard>
          </div>

          <p><strong>Key Takeaway:</strong> This model is a closed-loop system. It observes user behavior, recommends content to maximize that behavior (e.g., watch time), and then learns from the results. Its &ldquo;success&rdquo; is measured in seconds and clicks, not in long-term value or correctness. This fundamental design, optimized for attention, presents a stark contrast to the requirements of a financial system where outcomes have real-world monetary consequences.</p>

          <div className="mt-8 not-prose bg-[#A8672E]/5 dark:bg-[#D08F52]/10 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-6 rounded-r-lg">
            <h4 className="font-serif text-[#A8672E] dark:text-[#D08F52]">The &ldquo;For You&rdquo; Page Feedback Loop</h4>
            <p className="text-sm text-[#A8672E] dark:text-[#D08F52] mt-2">A user&apos;s &ldquo;For You&rdquo; page is a constantly evolving feedback loop. A slight hesitation on a video is a signal. A re-watch is a strong positive signal. A quick swipe-away is a strong negative one. The algorithm learns and adapts in real-time, making it incredibly effective at personalizing content to hold attention, but also susceptible to creating echo chambers.</p>
          </div>
        </Section>

        <Section
          id="ml-in-finance"
          title="Machine Learning in Modern Finance"
          subtitle="A Landscape of Sophistication, Theory, and Rigor"
          icon={BarChart}
        >
          <p>The financial industry is a mature adopter of machine learning, but for vastly different purposes. Financial ML is characterized by rigorous quantitative analysis, theory-grounded risk management, and augmenting human expertise&mdash;not replacing it. It seeks to find a true signal in a sea of noise, not just amplify the most popular signal.</p>

          <div className="grid md:grid-cols-2 gap-8 my-10">
            <DetailCard icon={TrendingUp} title="Quantitative Factor Models">
              These models, often grounded in economic theory like the Fama-French three-factor model, use dozens of vetted signals (e.g., value, momentum, quality) to select stocks, leveraging advanced statistics and ML to find durable sources of alpha.
            </DetailCard>

            <DetailCard icon={Bot} title="Robo-Advisors & Portfolio Optimization">
              Grounded in Nobel prize-winning Modern Portfolio Theory (MPT), their goal is creating an efficient frontier of portfolios that maximize return for a given level of risk through diversification&mdash;the polar opposite of a popularity-based recommender.
            </DetailCard>

            <DetailCard icon={Activity} title="High-Frequency Trading (HFT)">
              Uses ML to predict micro-second price movements in a highly adversarial, zero-sum environment. These models are built for speed and exploiting tiny, fleeting arbitrage opportunities, not for long-term recommendations.
            </DetailCard>

            <DetailCard icon={FileText} title="Sentiment Analysis & NLP">
              Uses social media and news data as an *input signal* among many, but does not use the social media *model architecture* for decision-making. Sentiment is just one factor in a much larger, multi-faceted model.
            </DetailCard>
          </div>

          <div className="mt-8 not-prose bg-[#A8672E]/5 dark:bg-[#D08F52]/10 border-l-4 border-[#A8672E] dark:border-[#D08F52] p-6 rounded-r-lg">
            <h4 className="font-serif text-[#A8672E] dark:text-[#D08F52]">The Human-in-the-Loop Imperative</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400 mt-2">Unlike a social media feed, financial ML systems almost always operate with a &ldquo;human-in-the-loop.&rdquo; A portfolio manager, risk officer, or compliance analyst must understand, approve, and ultimately be accountable for the model&apos;s output. This provides a crucial layer of oversight, context, and ethical judgment that is absent in fully automated content curation.</p>
          </div>
        </Section>

        <Section
          id="the-chasm"
          title="The Chasm: Engagement vs. Investment"
          subtitle="A Point-by-Point Feasibility Analysis"
          icon={Scale}
        >
          <p>A systematic comparison reveals a fundamental chasm making the direct application of an engagement-based recommender to financial services unworkable and perilous. The objectives, data characteristics, and theoretical underpinnings are structurally incompatible.</p>

          <ul>
            <li><strong>Divergent Objectives:</strong> Social media optimizes for virality and attention. Finance optimizes for risk-adjusted returns and value. An engagement algorithm would systematically favor speculative &ldquo;meme stocks&rdquo; over sound, long-term investments.</li>
            <li><strong>Nature of the Data:</strong> Social media data is voluminous and behavior-driven. Financial data is non-stationary (its statistical properties change over time), noisy, and adversarial (market participants react to predictions).</li>
            <li><strong>Feedback Loops:</strong> A TikTok recommendation going viral is a success. A stock recommendation going viral creates a speculative bubble, distorting the asset&apos;s fundamental value and leading to an inevitable crash. The feedback loop is inherently destabilizing.</li>
            <li><strong>Theoretical Foundations:</strong> Social media models are based on data-driven heuristics of similarity. Financial advisory is grounded in economic principles like MPT, which champions diversification&mdash;the antithesis of concentrating on a few popular assets.</li>
          </ul>

          <StyledTable headers={table1Headers} rows={table1Rows} />
        </Section>

        <Section
          id="risks"
          title="Risks and Regulatory Imperatives"
          subtitle="Why a Financial 'For You' Page is a Minefield"
          icon={AlertTriangle}
        >
          <p>Applying social media logic to markets would not just be ineffective; it would create a minefield of severe risks. The mechanisms that drive engagement are known accelerants of the most destructive phenomena in finance, seen in events like the GameStop saga where social media hype fueled extreme, fundamentals-divorced volatility.</p>

          <div className="grid md:grid-cols-2 gap-8 my-10">
            <DetailCard icon={ChevronsRight} title="Amplifying Speculative Bubbles">
              The system would be a highly efficient engine for amplifying speculative bubbles, encouraging herd behavior, and facilitating &ldquo;pump-and-dump&rdquo; manipulation schemes on a massive scale.
            </DetailCard>

            <DetailCard icon={BrainCircuit} title="The 'Black Box' Problem">
              The opacity of deep learning models is unacceptable in a regulated financial context that demands transparency and explainability (XAI) for every recommendation made to a client.
            </DetailCard>

            <DetailCard icon={UserCheck} title="Fiduciary Duty & Suitability">
              Investment advisors have a legal &ldquo;best-interest&rdquo; or fiduciary duty. An algorithm optimizing for engagement cannot, by definition, optimize for a client&apos;s specific financial situation, risk tolerance, and long-term goals.
            </DetailCard>

            <DetailCard icon={AlertTriangle} title="Systemic Risk Creation">
              By synchronizing the behavior of millions of investors based on popularity signals, such a system could create correlated risks that threaten overall market stability.
            </DetailCard>
          </div>

          <p>Investment advice is heavily regulated by bodies like the SEC and FINRA, requiring a standard of care that a generic, popularity-based system could never meet.</p>

          <StyledTable headers={table2Headers} rows={table2Rows} />
        </Section>

        <Section
          id="path-forward"
          title="The Path Forward"
          subtitle="Viable Applications and Strategic Recommendations"
          icon={Lightbulb}
        >
          <p>While a direct transfer of technology is unviable, this does not negate the value of personalization in finance. The path forward involves a critical pivot from <strong>prescriptive recommendations</strong> (telling users what to buy) to <strong>descriptive and educational augmentation</strong> (helping users understand their options and make better, more informed decisions).</p>

          <div className="grid md:grid-cols-3 gap-6 my-10">
            <DetailCard icon={BookOpen} title="For FinTech Innovators">
              Focus on tools that empower investors. Instead of a &ldquo;stock recommender,&rdquo; build an AI-powered portfolio risk simulator, a personalized financial education module, or a tool that analyzes an investor&apos;s behavioral biases. Prioritize Explainable AI (XAI) from day one.
            </DetailCard>

            <DetailCard icon={Shield} title="For Investors & Institutions">
              Maintain healthy skepticism and demand transparency from AI tools. Vet any &ldquo;AI-powered&rdquo; product to ensure it&apos;s grounded in sound financial theory, not just data-mining. Invest in comprehensive AI risk management frameworks and upskill workforces to be AI-literate.
            </DetailCard>

            <DetailCard icon={Eye} title="For Regulators">
              Develop adaptive, technology-neutral policies based on enduring principles like fiduciary duty and market fairness. Foster collaboration between technologists and policymakers to understand emerging risks and enhance AI-powered market surveillance capabilities to detect new forms of manipulation.
            </DetailCard>
          </div>

          <p><strong>In conclusion,</strong> the future of AI in finance lies not in mimicking the addictive, engagement-driven loops of social media, but in thoughtfully applying personalization to augment human intelligence, enhance financial education, and build more robust, transparent, and user-centric financial services.</p>
        </Section>
      </div>
    </ArticleFrame>
  );
}
