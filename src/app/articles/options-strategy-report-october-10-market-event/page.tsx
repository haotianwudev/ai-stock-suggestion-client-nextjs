'use client';

import { TrendingDown, AlertTriangle, Target, BarChart3, Shield, Zap } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

export default function OptionsStrategyReportOctober10() {
  return (
    <ArticleFrame
      slug="options-strategy-report-october-10-market-event"
      additionalDisclaimer="Options trading involves substantial risk. This analysis is for educational purposes only and does not constitute investment advice."
    >
      <div className="max-w-4xl mx-auto px-4 text-slate-900">
        <InfographicSlot alt="Options Strategy Framework for Market Events" />

        {/* Key Insights Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-100">
              <TrendingDown className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold text-red-900 mb-2">Market Event Analysis</h3>
              <p className="text-red-700 text-sm">October 10 sell-off was a Grey Rhino event - predictable, high-impact threat that markets neglected.</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-100">
              <Zap className="h-8 w-8 text-amber-600 mb-4" />
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Volatility Spike</h3>
              <p className="text-amber-700 text-sm">VIX jumped from 14 to 25.8 - creating premium-selling opportunities when fear is expensive.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
              <Shield className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-green-900 mb-2">Strategic Response</h3>
              <p className="text-green-700 text-sm">Deploy defined-risk strategies to harvest elevated premiums while positioning for recovery.</p>
            </div>
          </div>
        </section>

        {/* Market Event Analysis */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">The October 10 Market Event</h2>
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Market Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">S&amp;P 500</span>
                    <span className="text-red-600 font-semibold">-2.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Nasdaq</span>
                    <span className="text-red-600 font-semibold">-3.6%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Russell 2000</span>
                    <span className="text-red-600 font-semibold">-3.0%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">VIX</span>
                    <span className="text-green-600 font-semibold">+84% to 25.8</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Event Classification</h3>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">Grey Rhino Event</h4>
                  <p className="text-amber-800 text-sm">
                    Highly probable, high-impact threat that was visible but neglected.
                    Trump&apos;s tariff threats were predictable political tactics, not unprecedented shocks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Framework */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Strategic Options Framework</h2>
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-xl border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Core Thesis: Cautiously Bullish Opportunism</h3>
            <p className="text-slate-700 mb-6">
              Grey Rhino events typically create buying opportunities when they don&apos;t coincide with recession.
              The volatility spike manufactures expensive option premium - our raw material for profit.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">1</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Phase 1: Harvest Fear</h4>
                <p className="text-sm text-slate-600">VIX &gt; 22: Deploy premium-selling strategies</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-amber-600">2</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Phase 2: Position for Recovery</h4>
                <p className="text-sm text-slate-600">VIX 18-22: Add LEAP calls as IV contracts</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Phase 3: Manage Portfolio</h4>
                <p className="text-sm text-slate-600">VIX &lt; 18: Close profits, manage assignments</p>
              </div>
            </div>
          </div>
        </section>

        {/* Options Strategies */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Recommended Options Strategies</h2>
          <div className="space-y-8">

            {/* Bull Put Spreads */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-slate-900">Bull Put Spreads (Primary Strategy)</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Strategy Mechanics</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• Sell higher strike put (collect premium)</li>
                    <li>• Buy lower strike put (limit risk)</li>
                    <li>• Profit from time decay and volatility contraction</li>
                    <li>• Defined maximum risk and reward</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">Example: SPY Bull Put Spread</h4>
                  <div className="space-y-1 text-sm text-green-800">
                    <div className="flex justify-between">
                      <span>Sell $640 Put:</span>
                      <span className="font-semibold">+$12.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Buy $630 Put:</span>
                      <span className="font-semibold">-$8.50</span>
                    </div>
                    <div className="border-t border-green-200 pt-1 flex justify-between font-bold">
                      <span>Net Credit:</span>
                      <span>$4.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Risk:</span>
                      <span>$6.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Breakeven:</span>
                      <span>$636</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cash-Secured Puts */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-slate-900">Cash-Secured Puts (Income Strategy)</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">When to Deploy</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• Want to acquire stock at discount</li>
                    <li>• Have cash earning interest as collateral</li>
                    <li>• Comfortable with stock ownership</li>
                    <li>• Seeking higher income than spreads</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">Example: SPY Cash-Secured Put</h4>
                  <div className="space-y-1 text-sm text-blue-800">
                    <div className="flex justify-between">
                      <span>Sell $640 Put:</span>
                      <span className="font-semibold">+$12.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cash Required:</span>
                      <span>$64,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Effective Buy Price:</span>
                      <span>$627.50</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Max Profit:</span>
                      <span>$1,250</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LEAP Calls */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-slate-900">LEAP Calls (Recovery Play)</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Timing Considerations</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• Wait for VIX to contract below 20</li>
                    <li>• Avoid buying during peak volatility</li>
                    <li>• Target 12-24 month expirations</li>
                    <li>• Consider in-the-money strikes</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-3">Risk Management</h4>
                  <div className="space-y-2 text-sm text-purple-800">
                    <p>• Susceptible to volatility crush</p>
                    <p>• Time decay accelerates near expiration</p>
                    <p>• Best deployed in Phase 2 of recovery</p>
                    <p>• Capital efficient but higher risk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Strategy Comparison Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">Strategy</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">Primary Goal</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">Ideal Phase</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">Risk Profile</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">IV Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900 border-b border-slate-100">Bull Put Spread</td>
                  <td className="py-4 px-6 text-slate-700 border-b border-slate-100">Income + Direction</td>
                  <td className="py-4 px-6 text-slate-700 border-b border-slate-100">Phase 1</td>
                  <td className="py-4 px-6 text-green-600 font-medium border-b border-slate-100">Defined &amp; Limited</td>
                  <td className="py-4 px-6 text-green-600 border-b border-slate-100">Favorable</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900 border-b border-slate-100">Cash-Secured Put</td>
                  <td className="py-4 px-6 text-slate-700 border-b border-slate-100">Income + Acquisition</td>
                  <td className="py-4 px-6 text-slate-700 border-b border-slate-100">Phase 1 &amp; 2</td>
                  <td className="py-4 px-6 text-amber-600 font-medium border-b border-slate-100">Undefined (Stock Risk)</td>
                  <td className="py-4 px-6 text-green-600 border-b border-slate-100">Favorable</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900">LEAP Call</td>
                  <td className="py-4 px-6 text-slate-700">Leveraged Appreciation</td>
                  <td className="py-4 px-6 text-slate-700">Phase 2 &amp; 3</td>
                  <td className="py-4 px-6 text-green-600 font-medium">Defined &amp; Limited</td>
                  <td className="py-4 px-6 text-red-600">Unfavorable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Risk Management */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Risk Management &amp; Monitoring</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Key Metrics to Watch</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-3 mt-0.5">VIX</span>
                  <span className="text-sm">Monitor term structure - contango signals fear normalization</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded mr-3 mt-0.5">P/C Ratio</span>
                  <span className="text-sm">Peak and decline indicates panic put buying subsiding</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded mr-3 mt-0.5">Technicals</span>
                  <span className="text-sm">Reclaim key moving averages (50-day MA) for trend confirmation</span>
                </li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4">Risk Considerations</h3>
              <ul className="space-y-2 text-red-800 text-sm">
                <li>• Grey Rhino events can evolve into systemic crises</li>
                <li>• Volatility can remain elevated longer than expected</li>
                <li>• Assignment risk on short puts during continued decline</li>
                <li>• Position sizing crucial - never risk more than you can afford</li>
                <li>• Have exit plans for each strategy before deployment</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
