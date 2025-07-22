'use client';


import Link from 'next/link';
import { ArrowLeft, BookOpen, Target, Clock, TrendingUp, TrendingDown, Shield, Zap, Wind, BrainCircuit, BarChart, AlertTriangle, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Sub-components
const ConceptCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 border border-gray-200">
    <div className="flex items-center justify-center mb-4 bg-blue-100 w-16 h-16 rounded-full mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const GreekCard = ({ greek, title, analogy, description, icon }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-center mb-3">
      {icon}
      <h3 className="text-2xl font-bold text-gray-900 ml-3">{greek} - {title}</h3>
    </div>
    <p className="text-sky-600 italic mb-3">Analogy: "{analogy}"</p>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const StrategyPillar = ({ icon, title, points }) => (
  <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
    {icon}
    <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">{title}</h3>
    <ul className="space-y-3 text-gray-700">
      {points.map((point, index) => (
        <li key={index} className="flex items-start">
          <span className="text-blue-500 font-bold mr-3 mt-1">▸</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ExampleCard = ({ title, scenario, actions, outcome, image, reverse = false }) => (
  <div className={`flex flex-col md:flex-row gap-8 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
    <div className="md:w-1/2">
      <img src={image} alt={title} className="rounded-lg shadow-xl w-full" />
    </div>
    <div className="md:w-1/2">
      <h3 className="text-2xl font-bold mb-3 text-blue-700">{title}</h3>
      <p className="text-gray-600 mb-4">{scenario}</p>
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">Actions Taken:</h4>
        <ul className="space-y-2">
          {actions.map((action, i) => (
            <li key={i} className="flex items-start text-gray-700">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              {action}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-2">Result & Lesson:</h4>
        <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">{outcome}</p>
      </div>
    </div>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{question}</h3>
    <p className="text-gray-600 leading-relaxed">{answer}</p>
  </div>
);

export default function ProfitingIronCondorOptionsBookSummary() {
  const currentArticle = articles.find(article => article.slug === 'profiting-iron-condor-options-book-summary');

  const navLinks = [
    { href: '#hero', label: 'Overview' },
    { href: '#concepts', label: 'Core Concepts' },
    { href: '#greeks', label: 'The Greeks' },
    { href: '#strategy', label: 'Strategy' },
    { href: '#examples', label: 'Examples' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <>
      {/* SEO Components - MANDATORY */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData 
            articleTitle={currentArticle.title} 
            articleSlug={currentArticle.slug} 
          />
        </>
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Return to Home Button */}
        <div className="container mx-auto px-6 pt-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>

        {/* Badges */}
        <div className="relative">
          {/* Book Summary Badge - Top Left */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Book Summary
            </span>
          </div>
          
          {/* Podcast Badge - Top Right */}
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Podcast
            </span>
          </div>

          {/* Options Badge - Bottom Right */}
          <div className="absolute bottom-4 right-4 z-10">
            <span className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              Options
            </span>
          </div>
        </div>

        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-900 flex items-center">
              <BarChart className="text-blue-600 mr-2" />
              Iron Condor Mastery
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300">
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </header>

        <main>    
      {/* Hero Section */}
          <section id="hero" className="relative text-gray-900 text-center py-20 md:py-32 px-4 overflow-hidden bg-white">
            <div className="absolute inset-0 bg-grid-gray-200 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
            <div className="relative z-10 container mx-auto">
              <div className="flex justify-center mb-8">
                <img 
                  src="https://m.media-amazon.com/images/I/4139vOZ8lOL._SY445_SX342_PQ35_.jpg" 
                  alt="Profiting with Iron Condor Options Book Cover"
                  className="w-48 h-auto shadow-2xl rounded-lg"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-500">
                Trade the Math, Not the Myth
              </h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-600">
                Master the Iron Condor: A market-neutral strategy that thrives on time decay and volatility—not flawed predictions.
              </p>
              <p className="text-base text-gray-500 mb-8">
                Book Summary: "Profiting with Iron Condor Options" by Michael Hanania Benklifa
              </p>
              
              {/* Podcast CTA */}
              {currentArticle?.podcastUrl && (
                <div className="mb-8">
                  <a 
                    href={currentArticle.podcastUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    <Music className="inline mr-2" />
                    Listen to Podcast
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Core Concepts Section */}
          <section id="concepts" className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Essence of the Iron Condor</h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                  Key ideas from "Profiting with Iron Condor Options" by Michael Hanania Benklifa.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ConceptCard
                  icon={<Target className="w-10 h-10 text-blue-600" />}
                  title="Market Neutrality"
                  description="Creates a 'zone of profit'. As long as the underlying security stays within a specific price range, the trade is profitable. You don't need to guess the market's direction."
                />
                <ConceptCard
                  icon={<BrainCircuit className="w-10 h-10 text-blue-600" />}
                  title="Trade the 'Math'"
                  description="Company fundamentals, news, and opinions are irrelevant. Success comes from managing quantifiable factors (the Greeks), especially time decay and volatility."
                />
                <ConceptCard
                  icon={<Clock className="w-10 h-10 text-blue-600" />}
                  title="The Seller's Edge"
                  description="An option buyer must be right about Direction, Distance, AND Time. The seller only needs to be right about one thing: Time. Time decay is a constant tailwind."
                />
                <ConceptCard
                  icon={<Shield className="w-10 h-10 text-blue-600" />}
                  title="Capital Preservation First"
                  description="While offering high potential returns, condors are high-risk. The #1 priority is preserving capital. This means having a disciplined exit strategy for both wins and losses."
                />
                <ConceptCard
                  icon={<BookOpen className="w-10 h-10 text-blue-600" />}
                  title="Liquidity is Crucial"
                  description="Trade highly liquid instruments like the SPX, RUT, and NDX. Liquidity ensures you can enter, exit, and adjust trades easily without wide bid-ask spreads hurting your profits."
                />
                <ConceptCard
                  icon={<AlertTriangle className="w-10 h-10 text-blue-600" />}
                  title="Counter-Intuitive Trading"
                  description="In options, the trade with a worse-looking risk-to-reward ratio can often be the better choice. Logical-sounding premises can be traps; the math reveals the true edge."
                />
              </div>
            </div>
          </section>   
       {/* The Greeks Section */}
          <section id="greeks" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Mastering the 'Greeks'</h2>
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
                  icon={<Clock className="w-8 h-8 text-green-600" />}
                />
                <GreekCard
                  greek="Delta (Δ)"
                  title="Price Sensitivity & Probability"
                  analogy="The Market's Best Guess"
                  description="Shows how much an option's price will change per $1 move in the underlying. A Delta of 10 also implies roughly a 10% chance of the option finishing in-the-money. Aiming for low Delta strikes (e.g., 10 or less) is a core condor strategy."
                  icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
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
                  icon={<Wind className="w-8 h-8 text-red-600" />}
                />
              </div>
            </div>
          </section>

          {/* Strategic Planning Section */}
          <section id="strategy" className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The 3 Pillars of a Winning Strategy</h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                  "Successful trading is all about having a plan. Without a plan you become victim to the two killers of all trading, greed and fear."
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <StrategyPillar
                  icon={<TrendingUp className="text-green-600 w-12 h-12 mx-auto mb-4" />}
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
                  icon={<TrendingDown className="text-red-600 w-12 h-12 mx-auto mb-4" />}
                  title="3. Impatient Exit"
                  points={[
                    "The Most Critical Pillar: 'What separates the winners from the losers is the exit strategy.'",
                    "Rule: Take small, consistent profits. Exit when you've made 3-5% of your margin. 'You can never go broke taking a profit.'",
                    "The Cardinal Sin: NEVER hold a position through expiration week. Gamma risk is too high; losses can become catastrophic.",
                    "Plan: Set a 'Good 'til Canceled' (GTC) order to close your position for a profit immediately after you enter the trade."
                  ]}
                />
              </div>
            </div>
          </section>         
 {/* Practical Examples Section */}
          <section id="examples" className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">From the Frontline: Trade Examples</h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                  Applying the theory in real-world market conditions.
                </p>
              </div>
              <div className="space-y-12">
                <ExampleCard
                  title="Surviving the 'Flash Crash' (May 2010)"
                  scenario="A trade was entered with 3 months to expiration. The market then experienced one of the largest VIX spikes in history, and the infamous 'Flash Crash' brought the price within points of the short strike."
                  actions={[
                    "Because the initial condor was wide and had ample time, it was possible to stay calm.",
                    "The untested call side was rolled down for a large credit.",
                    "That credit was used to roll the tested put side further down, recentering the trade and protecting the principal."
                  ]}
                  outcome="Despite extreme volatility, the defensive adjustments worked. The trade was eventually closed for a 4% profit. This highlights the value of trading large and having enough time to manage the position."
                  image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=500&h=300&q=80"
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
                  image="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=500&h=300&q=80"
                  reverse={true}
                />
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-20 bg-gray-100">
            <div className="container mx-auto px-6 max-w-3xl">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Frequently Asked Questions</h2>
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
            </div>
          </section>

          {/* Risk Warning */}
          <section className="py-12 bg-red-50 border-l-4 border-red-500">
            <div className="container mx-auto px-6">
              <div className="flex items-start">
                <AlertTriangle className="text-red-500 mr-4 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Important Risk Disclosure</h3>
                  <p className="text-red-700">
                    Options trading involves significant risk and is not suitable for all investors. Iron Condor strategies can result in substantial losses. 
                    This content is for educational purposes only and should not be considered investment advice. Always consult with a qualified financial advisor 
                    and thoroughly understand the risks before engaging in options trading.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-lg mb-4">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
            <p className="text-gray-400">
              Trading options involves significant risk and is not suitable for all investors. This website is for educational purposes only and is not financial advice.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}