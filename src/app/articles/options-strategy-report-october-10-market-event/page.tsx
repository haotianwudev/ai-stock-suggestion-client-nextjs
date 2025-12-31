'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Maximize2, TrendingDown, AlertTriangle, Target, BarChart3, Shield, Zap } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

export default function OptionsStrategyReportOctober10() {
    const currentArticle = articles.find(article => article.slug === 'options-strategy-report-october-10-market-event');
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

    return (
        <>
            {/* SEO Components - MANDATORY */}
            {currentArticle && (
                <>
                    <StructuredData article={currentArticle} />
                    <BreadcrumbStructuredData 
                        articleTitle={currentArticle.title || ''} 
                        articleSlug={currentArticle.slug || ''} 
                    />
                </>
            )}
            
            {/* Return to Home Button */}
            <div className="max-w-5xl mx-auto px-6 pt-8">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Return to Home
                    </Link>
                    {currentArticle?.googleDoc && (
                        <a 
                            href={currentArticle.googleDoc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white font-medium"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Full Research Paper
                        </a>
                    )}
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-white relative overflow-hidden border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                        Options Strategy to Beat Black Swan and Grey Rhino
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
                        Strategic framework for deploying options after the October 10 market event. Turn volatility spikes into systematic profit opportunities.
                    </p>
                </div>
            </div>

            {/* Hero Infographic - Below Title with Full-Screen Capability */}
            <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
                <div 
                    className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 cursor-pointer group relative"
                    onClick={() => setIsImageViewerOpen(true)}
                >
                    <img 
                        src="https://i.imgur.com/pM6d7Cb.jpeg" 
                        alt="Options Strategy Framework for Market Events" 
                        className="w-full h-auto transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                    {/* Full-screen button overlay */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsImageViewerOpen(true);
                        }}
                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                        title="View full screen"
                    >
                        <Maximize2 className="h-4 w-4" />
                    </button>
                    {/* Click hint */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 pointer-events-none">
                        <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                            Click to view full screen
                        </div>
                    </div>
                </div>
            </section>

            {/* Full-screen image viewer */}
            <FullScreenImageViewer
                src="https://i.imgur.com/pM6d7Cb.jpeg"
                alt="Options Strategy Framework for Market Events"
                isOpen={isImageViewerOpen}
                onClose={() => setIsImageViewerOpen(false)}
            />

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-16">
                
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
                                        <span className="text-slate-700">S&P 500</span>
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
                                        Trump's tariff threats were predictable political tactics, not unprecedented shocks.
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
                            Grey Rhino events typically create buying opportunities when they don't coincide with recession. 
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
                                    <td className="py-4 px-6 text-green-600 font-medium border-b border-slate-100">Defined & Limited</td>
                                    <td className="py-4 px-6 text-green-600 border-b border-slate-100">Favorable</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-6 font-medium text-slate-900 border-b border-slate-100">Cash-Secured Put</td>
                                    <td className="py-4 px-6 text-slate-700 border-b border-slate-100">Income + Acquisition</td>
                                    <td className="py-4 px-6 text-slate-700 border-b border-slate-100">Phase 1 & 2</td>
                                    <td className="py-4 px-6 text-amber-600 font-medium border-b border-slate-100">Undefined (Stock Risk)</td>
                                    <td className="py-4 px-6 text-green-600 border-b border-slate-100">Favorable</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-6 font-medium text-slate-900">LEAP Call</td>
                                    <td className="py-4 px-6 text-slate-700">Leveraged Appreciation</td>
                                    <td className="py-4 px-6 text-slate-700">Phase 2 & 3</td>
                                    <td className="py-4 px-6 text-green-600 font-medium">Defined & Limited</td>
                                    <td className="py-4 px-6 text-red-600">Unfavorable</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Risk Management */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Risk Management & Monitoring</h2>
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
                            <h3 className="text-lg font-semibold text-red-900 mb-4">⚠️ Risk Considerations</h3>
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

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Deploy These Strategies?</h3>
                    <p className="text-slate-600 mb-6">
                        This framework provides a systematic approach to turning market volatility into strategic advantage.
                    </p>
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

            </main>

            {/* Footer */}
            <footer className="bg-slate-50 border-t border-slate-200 py-8">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <p className="text-slate-600 mb-2">
                        <strong>Disclaimer:</strong> Options trading involves substantial risk. This analysis is for educational purposes only and does not constitute investment advice.
                    </p>
                    <p className="text-slate-600">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
                </div>
            </footer>
        </>
    );
}