'use client';

import { TrendingUp, DollarSign, Target } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

export default function CoveredCallsVsCashSecuredPutsPage() {
  return (
    <ArticleFrame
      slug="covered-calls-vs-cash-secured-puts"
      additionalDisclaimer="Both strategies involve unlimited downside risk if the underlying stock declines significantly. Options trading requires approval and understanding of complex mechanics."
    >
      <div className="max-w-5xl mx-auto px-4 text-slate-700 dark:text-slate-300">
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mb-8">
          Theoretical equivalence meets practical divergence. Discover why these mathematically identical strategies create vastly different trading experiences.
        </p>

        <InfographicSlot alt="Covered Calls vs Cash-Secured Puts Strategy Comparison" />

        {/* Key Insights Section */}
        <section className="mb-16 mt-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <TrendingUp className="h-8 w-8 text-[#A8672E] dark:text-[#D08F52] mb-4" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2 font-serif">Theoretical Equivalence</h3>
              <p className="text-[#A8672E] dark:text-[#D08F52] text-sm">Put-call parity proves these strategies have identical risk/reward profiles when properly structured.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
              <DollarSign className="h-8 w-8 text-[#1D8A70] dark:text-[#3CBF9C] mb-4" />
              <h3 className="text-lg font-semibold text-green-900 mb-2 font-serif">Practical Differences</h3>
              <p className="text-[#1D8A70] dark:text-[#3CBF9C] text-sm">Capital requirements, tax treatment, and transaction costs create significant real-world divergence.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
              <Target className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-purple-900 mb-2 font-serif">Strategic Choice</h3>
              <p className="text-purple-700 text-sm">Selection depends on your goals: income enhancement vs. strategic entry positioning.</p>
            </div>
          </div>
        </section>

        {/* Strategy Mechanics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 font-serif">Strategy Mechanics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 font-serif">Covered Call</h3>
              <div className="space-y-3 text-slate-700 dark:text-slate-300">
                <p><strong>Position:</strong> Own 100 shares + Sell 1 call option</p>
                <p><strong>Goal:</strong> Generate income on existing holdings</p>
                <p><strong>Obligation:</strong> Sell shares at strike if assigned</p>
                <p><strong>Ideal Market:</strong> Neutral to slightly bullish</p>
                <p><strong>Assignment Result:</strong> Stock → Cash position</p>
              </div>
            </div>
            <div className="bg-white dark:bg-[#0A0D14] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 font-serif">Cash-Secured Put</h3>
              <div className="space-y-3 text-slate-700 dark:text-slate-300">
                <p><strong>Position:</strong> Cash collateral + Sell 1 put option</p>
                <p><strong>Goal:</strong> Acquire stock at discount or generate income</p>
                <p><strong>Obligation:</strong> Buy shares at strike if assigned</p>
                <p><strong>Ideal Market:</strong> Neutral to bullish</p>
                <p><strong>Assignment Result:</strong> Cash → Stock position</p>
              </div>
            </div>
          </div>
        </section>

        {/* Put-Call Parity */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 font-serif">The Mathematical Truth: Put-Call Parity</h2>
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-center mb-6">
              <div className="bg-white dark:bg-[#0A0D14] p-4 rounded-lg inline-block border border-slate-300">
                <p className="text-2xl font-mono text-slate-800 dark:text-slate-200">C + PV(K) = P + S</p>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-center max-w-3xl mx-auto">
              This fundamental equation proves that a covered call (S - C) is synthetically equivalent to a cash-secured put (PV(K) - P).
              Their profit/loss diagrams are identical when using the same strike price and expiration.
            </p>
          </div>
        </section>

        {/* Practical Differences Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 font-serif">Where Theory Meets Reality</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#14171B]">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">Factor</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">Covered Call</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">Cash-Secured Put</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-50 dark:bg-[#14171B] transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800">Capital Required</td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">High (100 shares)</td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">Lower (cash collateral)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:bg-[#14171B] transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800">Dividend Treatment</td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">Direct receipt</td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">Priced into premium</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:bg-[#14171B] transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800">Tax on Assignment</td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">Taxable sale event</td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">Establishes cost basis</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:bg-[#14171B] transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800">Early Assignment Risk</td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">High (ex-dividend dates)</td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">Low</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:bg-[#14171B] transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900 dark:text-slate-100">Psychological Frame</td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300">&ldquo;Enhancing an asset&rdquo;</td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300">&ldquo;Selling insurance&rdquo;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Decision Framework */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 font-serif">Strategic Decision Framework</h2>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-900 mb-6 font-serif">Choose Covered Calls When:</h3>
            <ul className="space-y-2 text-amber-800">
              <li>• You already own the underlying stock</li>
              <li>• You want to generate income on existing holdings</li>
              <li>• You&apos;re comfortable with potential upside limitation</li>
              <li>• You want to receive dividends directly</li>
              <li>• You&apos;re trading in a basic retirement account</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-xl border border-emerald-200 mt-6">
            <h3 className="text-xl font-semibold text-emerald-900 mb-6 font-serif">Choose Cash-Secured Puts When:</h3>
            <ul className="space-y-2 text-emerald-800">
              <li>• You want to acquire stock at a lower price</li>
              <li>• You&apos;re seeking capital efficiency (higher ROC)</li>
              <li>• You want to defer taxable events</li>
              <li>• You have cash earning interest as collateral</li>
              <li>• You&apos;re implementing &ldquo;The Wheel&rdquo; strategy</li>
            </ul>
          </div>
        </section>

        {/* The Wheel Strategy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 font-serif">The Wheel: Connecting Both Strategies</h2>
          <div className="bg-white dark:bg-[#0A0D14] p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#A8672E] dark:text-[#D08F52]">1</span>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Sell Cash-Secured Puts</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Generate income while waiting for assignment</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#1D8A70] dark:text-[#3CBF9C]">2</span>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Get Assigned Stock</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Acquire shares at your chosen strike price</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Sell Covered Calls</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Generate income on your new stock position</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-slate-600 dark:text-slate-400">If called away, return to step 1. This creates a continuous income-generating cycle.</p>
            </div>
          </div>
        </section>

        {/* Risk Warnings */}
        <section className="mb-16">
          <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-4 font-serif">⚠️ Important Risk Considerations</h3>
            <ul className="space-y-2 text-red-800 text-sm">
              <li>• Both strategies involve unlimited downside risk if the underlying stock declines significantly</li>
              <li>• Covered calls cap your upside potential - you&apos;ll miss out on gains above the strike price</li>
              <li>• Cash-secured puts may force you to buy stock at above-market prices</li>
              <li>• Early assignment can disrupt your strategy, especially around dividend dates</li>
              <li>• Options trading requires approval and understanding of complex mechanics</li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
