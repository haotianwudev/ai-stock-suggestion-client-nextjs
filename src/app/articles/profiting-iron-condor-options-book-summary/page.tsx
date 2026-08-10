'use client';

import { BookOpen, Target, Clock, TrendingUp, TrendingDown, Shield, Zap, Wind, BrainCircuit, AlertTriangle } from 'lucide-react';
import { ArticleFrame } from '@/components/articles/article-frame';

// Sub-components
const ConceptCard = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 border border-gray-200">
    <div className="flex items-center justify-center mb-4 bg-blue-100 w-16 h-16 rounded-full mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-center text-gray-900 mb-2 font-serif">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const GreekCard = ({ greek, title, analogy, description, icon }) => (
  <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-center mb-3">
      {icon}
      <h3 className="text-2xl font-bold text-gray-900 ml-3 font-serif">{greek} - {title}</h3>
    </div>
    <p className="text-sky-600 italic mb-3">Analogy: &ldquo;{analogy}&rdquo;</p>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const StrategyPillar = ({ icon, title, points }) => (
  <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-xl shadow-md border border-gray-200">
    {icon}
    <h3 className="text-2xl font-bold text-center text-gray-900 mb-4 font-serif">{title}</h3>
    <ul className="space-y-3 text-gray-700">
      {points.map((point, index) => (
        <li key={index} className="flex items-start">
          <span className="text-[#A8672E] dark:text-[#D08F52] font-bold mr-3 mt-1">▸</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ExampleCard = ({ title, scenario, actions, outcome }) => (
  <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-xl shadow-md border border-gray-200">
    <h3 className="text-2xl font-bold mb-3 text-[#A8672E] dark:text-[#D08F52] font-serif">{title}</h3>
    <p className="text-gray-600 mb-4">{scenario}</p>
    <div className="mb-4">
      <h4 className="font-semibold text-gray-800 mb-2">Actions Taken:</h4>
      <ul className="space-y-2">
        {actions.map((action, i) => (
          <li key={i} className="flex items-start text-gray-700">
            <span className="text-[#1D8A70] dark:text-[#3CBF9C] mr-2 mt-1">✓</span>
            {action}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-gray-800 mb-2">Result & Lesson:</h4>
      <p className="text-gray-700 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg border border-blue-200">{outcome}</p>
    </div>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <div className="bg-white dark:bg-[#0A0D14] rounded-lg border border-gray-200 p-5 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-serif">{question}</h3>
    <p className="text-gray-600 leading-relaxed">{answer}</p>
  </div>
);

export default function ProfitingIronCondorOptionspremiumContent() {
  return (
    <ArticleFrame
      slug="profiting-iron-condor-options-book-summary"
      additionalDisclaimer="Iron Condor strategies can result in substantial losses. Always consult with a qualified financial advisor and thoroughly understand the risks before engaging in options trading."
    >
      <p className="text-lg text-gray-600 mb-12">
        Master the Iron Condor: a market-neutral strategy that thrives on time decay and volatility&mdash;not flawed predictions. Book Summary: &ldquo;Profiting with Iron Condor Options&rdquo; by Michael Hanania Benklifa.
      </p>

      {/* Core Concepts Section */}
      <section id="concepts" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">The Essence of the Iron Condor</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Key ideas from &ldquo;Profiting with Iron Condor Options&rdquo; by Michael Hanania Benklifa.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ConceptCard
            icon={<Target className="w-10 h-10 text-[#A8672E] dark:text-[#D08F52]" />}
            title="Market Neutrality"
            description="Creates a 'zone of profit'. As long as the underlying security stays within a specific price range, the trade is profitable. You don't need to guess the market's direction."
          />
          <ConceptCard
            icon={<BrainCircuit className="w-10 h-10 text-[#A8672E] dark:text-[#D08F52]" />}
            title="Trade the 'Math'"
            description="Company fundamentals, news, and opinions are irrelevant. Success comes from managing quantifiable factors (the Greeks), especially time decay and volatility."
          />
          <ConceptCard
            icon={<Clock className="w-10 h-10 text-[#A8672E] dark:text-[#D08F52]" />}
            title="The Seller's Edge"
            description="An option buyer must be right about Direction, Distance, AND Time. The seller only needs to be right about one thing: Time. Time decay is a constant tailwind."
          />
          <ConceptCard
            icon={<Shield className="w-10 h-10 text-[#A8672E] dark:text-[#D08F52]" />}
            title="Capital Preservation First"
            description="While offering high potential returns, condors are high-risk. The #1 priority is preserving capital. This means having a disciplined exit strategy for both wins and losses."
          />
          <ConceptCard
            icon={<BookOpen className="w-10 h-10 text-[#A8672E] dark:text-[#D08F52]" />}
            title="Liquidity is Crucial"
            description="Trade highly liquid instruments like the SPX, RUT, and NDX. Liquidity ensures you can enter, exit, and adjust trades easily without wide bid-ask spreads hurting your profits."
          />
          <ConceptCard
            icon={<AlertTriangle className="w-10 h-10 text-[#A8672E] dark:text-[#D08F52]" />}
            title="Counter-Intuitive Trading"
            description="In options, the trade with a worse-looking risk-to-reward ratio can often be the better choice. Logical-sounding premises can be traps; the math reveals the true edge."
          />
        </div>
      </section>

      {/* The Greeks Section */}
      <section id="greeks" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">Mastering the &lsquo;Greeks&rsquo;</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            These are the quantified forces you must manage. Once in a trade, you care only about the math.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <GreekCard
            greek="Theta (Θ)"
            title="Time Decay"
            analogy="The Melting Ice Cube"
            description="The amount of value an option loses each day. This is the primary profit engine for a condor seller. It decays slowly at first but accelerates dramatically in the last 30-45 days. Your goal is to sell expensive time and buy it back cheap."
            icon={<Clock className="w-8 h-8 text-[#1D8A70] dark:text-[#3CBF9C]" />}
          />
          <GreekCard
            greek="Delta (Δ)"
            title="Price Sensitivity & Probability"
            analogy="The Market's Best Guess"
            description="Shows how much an option's price will change per $1 move in the underlying. A Delta of 10 also implies roughly a 10% chance of the option finishing in-the-money. Aiming for low Delta strikes (e.g., 10 or less) is a core condor strategy."
            icon={<TrendingUp className="w-8 h-8 text-[#A8672E] dark:text-[#D08F52]" />}
          />
          <GreekCard
            greek="Gamma (Γ)"
            title="Acceleration Risk"
            analogy="The Steepening Slide"
            description="The rate of change of Delta. High Gamma is extremely dangerous, as it means losses can accelerate exponentially if the price moves against you. This is the main reason to NEVER hold a condor through expiration week."
            icon={<Zap className="w-8 h-8 text-yellow-500" />}
          />
          <GreekCard
            greek="Vega (ν)"
            title="Volatility 'Fear' Premium"
            analogy="The Price of Uncertainty"
            description="Measures sensitivity to changes in Implied Volatility (IV). High IV means expensive options. A key strategy is to sell condors when IV is high (e.g., during a market panic) and profit as it reverts to the mean ('volatility crush')."
            icon={<Wind className="w-8 h-8 text-[#BC4128] dark:text-[#E2694A]" />}
          />
        </div>
      </section>

      {/* Strategic Planning Section */}
      <section id="strategy" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">The 3 Pillars of a Winning Strategy</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            &ldquo;Successful trading is all about having a plan. Without a plan you become victim to the two killers of all trading, greed and fear.&rdquo;
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <StrategyPillar
            icon={<TrendingUp className="text-[#1D8A70] dark:text-[#3CBF9C] w-12 h-12 mx-auto mb-4" />}
            title="1. Disciplined Entry"
            points={[
              "Prioritize: 1. Price (credit received), 2. Position (strike distance), 3. Time (to expiration).",
              "Trick: Sell into fear. Enter trades on down days when the VIX spikes 10-20%+. This maximizes your premium.",
              "Rule: Aim for a minimum credit of $3 (12% return on margin) with short strikes at Delta 10 or less.",
              "Safety: Enter with 5-8 weeks to expiration. This provides a 'reserve' of time to make adjustments if needed."
            ]}
          />
          <StrategyPillar
            icon={<Zap className="text-yellow-500 w-12 h-12 mx-auto mb-4" />}
            title="2. Proactive Adjustment"
            points={[
              "Primary Goal: Protect your principal at all costs. Adjustments are defensive, not for chasing profit.",
              "Technique: 'Roll' the untested side to collect a credit, then use that credit to pay for moving the tested side further away.",
              "Trick: Adjustments are easier in a down market (calls are worth more) and harder in an up market (puts are cheap).",
              "Trigger: Act when the price gets within a predefined range of your short strike (e.g., 50 points on the SPX)."
            ]}
          />
          <StrategyPillar
            icon={<TrendingDown className="text-[#BC4128] dark:text-[#E2694A] w-12 h-12 mx-auto mb-4" />}
            title="3. Impatient Exit"
            points={[
              "The Most Critical Pillar: 'What separates the winners from the losers is the exit strategy.'",
              "Rule: Take small, consistent profits. Exit when you've made 3-5% of your margin. 'You can never go broke taking a profit.'",
              "The Cardinal Sin: NEVER hold a position through expiration week. Gamma risk is too high; losses can become catastrophic.",
              "Plan: Set a 'Good 'til Canceled' (GTC) order to close your position for a profit immediately after you enter the trade."
            ]}
          />
        </div>
      </section>

      {/* Practical Examples Section */}
      <section id="examples" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">From the Frontline: Trade Examples</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Applying the theory in real-world market conditions.
          </p>
        </div>
        <div className="space-y-8">
          <ExampleCard
            title="Surviving the 'Flash Crash' (May 2010)"
            scenario="A trade was entered with 3 months to expiration. The market then experienced one of the largest VIX spikes in history, and the infamous 'Flash Crash' brought the price within points of the short strike."
            actions={[
              "Because the initial condor was wide and had ample time, it was possible to stay calm.",
              "The untested call side was rolled down for a large credit.",
              "That credit was used to roll the tested put side further down, recentering the trade and protecting the principal."
            ]}
            outcome="Despite extreme volatility, the defensive adjustments worked. The trade was eventually closed for a 4% profit. This highlights the value of trading large and having enough time to manage the position."
          />
          <ExampleCard
            title="Day Trading Earnings (A 'Vega Play')"
            scenario="A company like Google or Amazon is announcing earnings. Implied Volatility (IV) is predictably inflated due to uncertainty."
            actions={[
              "A wide condor is sold just before the announcement to capture the high 'fear' premium (high Vega).",
              "The earnings are released. The direction of the stock move is irrelevant.",
              "The key event is that uncertainty vanishes. IV collapses ('volatility crush')."
            ]}
            outcome="The condor is bought back the next morning for a quick profit (e.g., 5-10% overnight). The profit comes from the collapse in Vega, not from time decay (Theta)."
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 font-serif">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <FAQItem
            question="What are the best instruments for Iron Condors?"
            answer="Indexes like the S&P 500 (SPX), Russell 2000 (RUT), and NASDAQ 100 (NDX). They offer high liquidity for easy adjustments and use European-style options, which prevents the massive risk of early assignment."
          />
          <FAQItem
            question="Why not just hold until expiration to get the maximum profit?"
            answer="This is the single biggest mistake a new condor trader can make. In the final week of expiration, Gamma risk becomes extreme. A small move against your position can wipe out all your profits and lead to catastrophic losses. The risk is not worth the small amount of remaining premium."
          />
          <FAQItem
            question="What if the market gaps past my short strike overnight?"
            answer="This is a primary risk of the strategy. You can mitigate it by 1) Trading indexes, which are less prone to massive single-day gaps than individual stocks, 2) Setting your strikes far out of the money (low Delta), and 3) Not over-leveraging your account on any single trade."
          />
          <FAQItem
            question="Is this really an 'income' strategy?"
            answer="No. The book explicitly warns against this mindset. Thinking of condors as a reliable monthly income will lead you to take unnecessary risks and eventually blow up your account. It is a trading strategy designed for capital growth, not a paycheck."
          />
        </div>
      </section>
    </ArticleFrame>
  );
}
