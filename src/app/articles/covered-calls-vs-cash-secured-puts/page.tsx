'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Maximize2, TrendingUp, DollarSign, Target } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';

export default function CoveredCallsVsCashSecuredPutsPage() {
    const currentArticle = articles.find(article => article.slug === 'covered-calls-vs-cash-secured-puts');
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
                        Covered Calls vs Cash-Secured Puts
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
                        Theoretical equivalence meets practical divergence. Discover why these mathematically identical strategies create vastly different trading experiences.
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
                        src="https://i.imgur.com/otXoq7h.jpeg" 
                        alt="Covered Calls vs Cash-Secured Puts Strategy Comparison" 
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
                src="https://i.imgur.com/otXoq7h.jpeg"
                alt="Covered Calls vs Cash-Secured Puts Strategy Comparison"
                isOpen={isImageViewerOpen}
                onClose={() => setIsImageViewerOpen(false)}
            />

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-16">
                
                {/* Key Insights Section */}
                <section className="mb-16">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                            <TrendingUp className="h-8 w-8 text-blue-600 mb-4" />
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Theoretical Equivalence</h3>
                            <p className="text-blue-700 text-sm">Put-call parity proves these strategies have identical risk/reward profiles when properly structured.</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                            <DollarSign className="h-8 w-8 text-green-600 mb-4" />
                            <h3 className="text-lg font-semibold text-green-900 mb-2">Practical Differences</h3>
                            <p className="text-green-700 text-sm">Capital requirements, tax treatment, and transaction costs create significant real-world divergence.</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                            <Target className="h-8 w-8 text-purple-600 mb-4" />
                            <h3 className="text-lg font-semibold text-purple-900 mb-2">Strategic Choice</h3>
                            <p className="text-purple-700 text-sm">Selection depends on your goals: income enhancement vs. strategic entry positioning.</p>
                        </div>
                    </div>
                </section>

                {/* Strategy Mechanics */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Strategy Mechanics</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Covered Call</h3>
                            <div className="space-y-3 text-slate-700">
                                <p><strong>Position:</strong> Own 100 shares + Sell 1 call option</p>
                                <p><strong>Goal:</strong> Generate income on existing holdings</p>
                                <p><strong>Obligation:</strong> Sell shares at strike if assigned</p>
                                <p><strong>Ideal Market:</strong> Neutral to slightly bullish</p>
                                <p><strong>Assignment Result:</strong> Stock → Cash position</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Cash-Secured Put</h3>
                            <div className="space-y-3 text-slate-700">
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
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">The Mathematical Truth: Put-Call Parity</h2>
                    <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-xl border border-slate-200">
                        <div className="text-center mb-6">
                            <div className="bg-white p-4 rounded-lg inline-block border border-slate-300">
                                <p className="text-2xl font-mono text-slate-800">C + PV(K) = P + S</p>
                            </div>
                        </div>
                        <p className="text-slate-700 text-center max-w-3xl mx-auto">
                            This fundamental equation proves that a covered call (S - C) is synthetically equivalent to a cash-secured put (PV(K) - P). 
                            Their profit/loss diagrams are identical when using the same strike price and expiration.
                        </p>
                    </div>
                </section>

                {/* Practical Differences Table */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Where Theory Meets Reality</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">Factor</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">Covered Call</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">Cash-Secured Put</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-6 font-medium text-slate-900 border-b border-slate-100">Capital Required</td>
                                    <td className="py-4 px-6 text-slate-700 border-b border-slate-100">High (100 shares)</td>
                                    <td className="py-4 px-6 text-slate-700 border-b border-slate-100">Lower (cash collateral)</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-6 font-medium text-slate-900 border-b border-slate-100">Dividend Treatment</td>
                                    <td className="py-4 px-6 text-slate-700 border-b border-slate-100">Direct receipt</td>
                                    <td className="py-4 px-6 text-slate-700 border-b border-slate-100">Priced into premium</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-6 font-medium text-slate-900 border-b border-slate-100">Tax on Assignment</td>
                                    <td className="py-4 px-6 text-slate-700 border-b border-slate-100">Taxable sale event</td>
                                    <td className="py-4 px-6 text-slate-700 border-b border-slate-100">Establishes cost basis</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-6 font-medium text-slate-900 border-b border-slate-100">Early Assignment Risk</td>
                                    <td className="py-4 px-6 text-slate-700 border-b border-slate-100">High (ex-dividend dates)</td>
                                    <td className="py-4 px-6 text-slate-700 border-b border-slate-100">Low</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-6 font-medium text-slate-900">Psychological Frame</td>
                                    <td className="py-4 px-6 text-slate-700">"Enhancing an asset"</td>
                                    <td className="py-4 px-6 text-slate-700">"Selling insurance"</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                {/* Decision Framework */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Strategic Decision Framework</h2>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl border border-amber-200">
                        <h3 className="text-xl font-semibold text-amber-900 mb-6">Choose Covered Calls When:</h3>
                        <ul className="space-y-2 text-amber-800">
                            <li>• You already own the underlying stock</li>
                            <li>• You want to generate income on existing holdings</li>
                            <li>• You're comfortable with potential upside limitation</li>
                            <li>• You want to receive dividends directly</li>
                            <li>• You're trading in a basic retirement account</li>
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-xl border border-emerald-200 mt-6">
                        <h3 className="text-xl font-semibold text-emerald-900 mb-6">Choose Cash-Secured Puts When:</h3>
                        <ul className="space-y-2 text-emerald-800">
                            <li>• You want to acquire stock at a lower price</li>
                            <li>• You're seeking capital efficiency (higher ROC)</li>
                            <li>• You want to defer taxable events</li>
                            <li>• You have cash earning interest as collateral</li>
                            <li>• You're implementing "The Wheel" strategy</li>
                        </ul>
                    </div>
                </section>

                {/* The Wheel Strategy */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">The Wheel: Connecting Both Strategies</h2>
                    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-blue-600">1</span>
                                </div>
                                <h4 className="font-semibold text-slate-900 mb-2">Sell Cash-Secured Puts</h4>
                                <p className="text-sm text-slate-600">Generate income while waiting for assignment</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-green-600">2</span>
                                </div>
                                <h4 className="font-semibold text-slate-900 mb-2">Get Assigned Stock</h4>
                                <p className="text-sm text-slate-600">Acquire shares at your chosen strike price</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-purple-600">3</span>
                                </div>
                                <h4 className="font-semibold text-slate-900 mb-2">Sell Covered Calls</h4>
                                <p className="text-sm text-slate-600">Generate income on your new stock position</p>
                            </div>
                        </div>
                        <div className="text-center mt-8">
                            <p className="text-slate-600">If called away, return to step 1. This creates a continuous income-generating cycle.</p>
                        </div>
                    </div>
                </section>

                {/* Risk Warnings */}
                <section className="mb-16">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-red-900 mb-4">⚠️ Important Risk Considerations</h3>
                        <ul className="space-y-2 text-red-800 text-sm">
                            <li>• Both strategies involve unlimited downside risk if the underlying stock declines significantly</li>
                            <li>• Covered calls cap your upside potential - you'll miss out on gains above the strike price</li>
                            <li>• Cash-secured puts may force you to buy stock at above-market prices</li>
                            <li>• Early assignment can disrupt your strategy, especially around dividend dates</li>
                            <li>• Options trading requires approval and understanding of complex mechanics</li>
                        </ul>
                    </div>
                </section>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Continue Your Options Education</h3>
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
                    <p className="text-slate-600">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
                </div>
            </footer>
        </>
    );
}