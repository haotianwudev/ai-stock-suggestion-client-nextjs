'use client';

import Link from 'next/link';
import { ArrowLeft, Music, User, TrendingUp, AlertTriangle, Target, Brain } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function FooledByRandomnessBookSummary() {
  const currentArticle = articles.find(article => article.slug === 'fooled-by-randomness-book-summary');

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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>
            
            {/* Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Book Summary
              </span>
            </div>

            {/* Podcast Badge */}
            {currentArticle?.podcastUrl && (
              <div className="absolute top-4 right-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Music className="mr-1 h-3 w-3" />
                  Podcast
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
              Fooled by <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Randomness</span>
            </h1>
            <p className="text-xl text-gray-600 mb-2">The Hidden Role of Chance in Life and in the Markets</p>
            <p className="text-sm text-gray-500">Based on the book by Nassim Nicholas Taleb</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="space-y-12">
            
            {/* Introduction */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Central Idea: We Are Blind to Luck</h2>
              <p className="text-gray-600 leading-relaxed">
                "Fooled by Randomness" argues that we consistently underestimate the role of chance in our lives. We are wired to find patterns, create narratives, and attribute success to skill, while dismissing failure as bad luck. Taleb calls those who benefit from a disproportionate share of luck but attribute it to their own genius the <strong className="text-purple-600">"lucky fools"</strong>. This blindness has profound consequences, especially in fields like finance where randomness reigns supreme.
              </p>
            </section>

            {/* Core Concept 1: The Lucky Fool */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-pink-500/10 text-pink-600 p-3 rounded-xl mr-4">
                  <User className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">The Lucky Fool</h3>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Taleb illustrates this with two characters: the trader <strong className="text-gray-900">Nero Tulip</strong>, who is deeply aware of randomness and builds a conservative career designed to survive it, and his neighbor <strong className="text-gray-900">John</strong>, a high-flying trader who gets rich by taking hidden, catastrophic risks. For years, John looks like a genius and Nero a failure. John's wealth, cars, and lifestyle are a constant testament to his apparent skill.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  John's strategy was to "average down"—buying more of an asset when its price fell, confident in his "sound economic analysis." He felt invincible, believing dips were just "excellent buying opportunities."
                </p>
                <blockquote className="border-l-4 border-pink-500 pl-4 italic text-gray-500 bg-gray-50 p-4 rounded-r-lg">
                  "At any point in time, a large section of businessmen with outstanding track records will be no better than randomly thrown darts."
                </blockquote>
                <p className="text-gray-600 leading-relaxed">
                  However, a single rare event—the 1998 bond market crash—wipes John out completely. His success was not skill, but a perfect (and temporary) fit for a specific market cycle. He was a lucky fool, and his luck ran out. Nero, by respecting randomness and using "stop losses," survives and is vindicated.
                </p>
              </div>
            </section>

            {/* Core Concept 2: Survivorship Bias */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-purple-500/10 text-purple-600 p-3 rounded-xl mr-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">The Cemetery of Silent Evidence</h3>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Why do we mistake the lucky for the skilled? Because of <strong className="text-gray-900">survivorship bias</strong>. We only see the winners. The thousands of traders, entrepreneurs, and actors who failed have vanished. Their stories are not told. We look at billionaires and assume they have a secret formula, forgetting the thousands of others who followed the same formula and went bust.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Taleb uses the "mysterious letter" con as an example. A fraudster mails 10,000 letters; half predict the market will go up, half predict it will go down. Next month, he only mails letters to the 5,000 who received the correct prediction. After a few months, he has a small group of people who have received several "perfect" predictions in a row and are ready to invest their life savings with him. The victims never see the thousands of initial failures.
                </p>
                <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-500 bg-gray-50 p-4 rounded-r-lg">
                  "If one puts an infinite number of monkeys in front of... typewriters... there is a certainty that one of them would come out with an exact version of the Iliad."
                </blockquote>
                <p className="text-gray-600 leading-relaxed">
                  Taleb's point: Would you bet your life savings that this specific monkey could write the Odyssey next? Of course not. But that's what we do when we extrapolate success from a pool of survivors without considering the size of the original pool of failures.
                </p>
              </div>
            </section>

            {/* Core Concept 3: Skewness */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-emerald-500/10 text-emerald-600 p-3 rounded-xl mr-4">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Skewness: The Payoff Matters, Not the Frequency</h3>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Another crucial error is confusing probability with expectation (or payoff). Being right frequently is irrelevant if the costs of being wrong are catastrophic. Taleb calls this <strong className="text-gray-900">asymmetry</strong> or <strong className="text-gray-900">skewness</strong>.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Imagine a strategy that wins $1,000 ninety-nine times out of a hundred, but loses $100,000 once. On average, you lose money. The frequency of success is a poor measure of performance. This is why terms like "bullish" or "bearish" are often meaningless. You can believe a market is 70% likely to go up 1%, but 30% likely to fall 10%. Your expectation is negative, so you should bet on a fall, despite being "bullish" on the probability.
                </p>
                <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-500 bg-gray-50 p-4 rounded-r-lg">
                  "Option sellers, it is said, eat like chickens and go to the bathroom like elephants."
                </blockquote>
                <p className="text-gray-600 leading-relaxed">
                  This describes those who make small, steady profits by taking on the risk of a rare, massive loss. They look like geniuses for years, until one day they vanish.
                </p>
              </div>
            </section>

            {/* Core Concept 4: The Black Swan */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-sky-500/10 text-sky-600 p-3 rounded-xl mr-4">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">The Black Swan Problem</h3>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  This is the problem of induction. A turkey is fed by the farmer every day for 1,000 days. With each feeding, the turkey's confidence that the farmer is a friend grows. On the 1,001st day, the day before Thanksgiving, the turkey will have its beliefs catastrophically revised. The turkey's error? It mistook absence of evidence (of danger) for evidence of absence.
                </p>
                <blockquote className="border-l-4 border-sky-500 pl-4 italic text-gray-500 bg-gray-50 p-4 rounded-r-lg">
                  "No amount of observations of white swans can allow the inference that all swans are white, but the observation of a single black swan is sufficient to refute that conclusion."
                </blockquote>
                <p className="text-gray-600 leading-relaxed">
                  The <strong className="text-gray-900">Black Swan</strong> is an event with three characteristics: it's an outlier, it has an extreme impact, and human nature makes us concoct explanations for it *after* the fact, making it seem predictable in hindsight. History is not a smooth, predictable path. It's punctuated by Black Swans.
                </p>
              </div>
            </section>

            {/* Nonlinearity */}
            <section>
              <div className="flex items-center mb-6">
                <div className="bg-orange-500/10 text-orange-600 p-3 rounded-xl mr-4">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Nonlinearity and Path Dependence</h3>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Life is not fair in a linear way. Small advantages, often born from luck, can snowball into massive, winner-take-all outcomes. Taleb uses the <strong className="text-gray-900">QWERTY keyboard</strong> as a prime example. It was designed to be inefficient to prevent early typewriters from jamming. Far superior layouts exist, but QWERTY's initial, random success created a "path dependent" standard that is now impossible to change.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The same applies to careers. An actor who gets a lucky break becomes famous, which leads to more roles, making him more famous. The initial advantage was tiny, but the feedback loop creates a huge disparity in outcome. This is why Bill Gates, while smart, is not necessarily the most skilled software engineer who ever lived; he benefited from a powerful network effect that started from a few lucky breaks.
                </p>
                <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-500 bg-gray-50 p-4 rounded-r-lg">
                  "Chance events coupled with positive feedback rather than technological superiority will determine economic superiority."
                </blockquote>
              </div>
            </section>

            {/* Key Takeaways */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Lessons for Navigating a Random World</h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-3 text-lg">1.</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Beware of Silent Evidence.</h4>
                    <p className="text-gray-600">Always consider the failures you don't see. The "graveyard" of failed businesses and traders holds more lessons than the visible winners.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 font-bold mr-3 text-lg">2.</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Judge Process, Not Outcome.</h4>
                    <p className="text-gray-600">A good decision can lead to a bad outcome, and a bad decision can lead to a good one. Focus on having a robust process for dealing with uncertainty, not on short-term results.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 font-bold mr-3 text-lg">3.</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Recognize Skewness.</h4>
                    <p className="text-gray-600">The magnitude of a payoff matters more than its frequency. Protect yourself from large, negative Black Swans and, if possible, expose yourself to positive ones.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-sky-600 font-bold mr-3 text-lg">4.</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Embrace Intellectual Humility.</h4>
                    <p className="text-gray-600">Accept that the world is more random than you think. Be skeptical of forecasts, experts, and your own ability to predict the future. As Taleb quotes Solon: "count no man happy until he is dead."</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Dive Deeper?</h2>
              <p className="text-lg mb-6 opacity-90">
                Explore more insights from this groundbreaking book and discover how to navigate uncertainty in markets and life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {currentArticle?.podcastUrl && (
                  <a 
                    href={currentArticle.podcastUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    <Music className="inline mr-2" />
                    Listen to Podcast
                  </a>
                )}
                <Link 
                  href="/"
                  className="inline-block bg-white text-purple-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                >
                  Explore More Articles
                </Link>
              </div>
            </section>

            {/* Educational Disclaimer */}
            <section className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-yellow-800 mb-2">Educational Content Disclaimer</h3>
                  <p className="text-yellow-700 text-sm leading-relaxed">
                    This book summary is for educational purposes only and does not constitute investment advice. The concepts discussed should be understood within the context of risk management and intellectual humility. Always conduct your own research and consider consulting with qualified professionals before making investment decisions.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-gray-400">
              © 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
