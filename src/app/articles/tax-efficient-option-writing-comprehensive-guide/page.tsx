'use client';

import Link from 'next/link';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { FullScreenImageViewer } from '@/components/ui/full-screen-image-viewer';
import { Shield, AlertTriangle, FileText, XCircle, Calculator, Target, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function TaxEfficientOptionWritingPage() {
    const currentArticle = articles.find(article => article.slug === 'tax-efficient-option-writing-comprehensive-guide');
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

    return (
        <>
            {/* SEO Components - MANDATORY */}
            {currentArticle && currentArticle.title && currentArticle.slug && (
                <>
                    <StructuredData article={currentArticle} />
                    <BreadcrumbStructuredData 
                        articleTitle={currentArticle.title} 
                        articleSlug={currentArticle.slug} 
                    />
                </>
            )}
            
            {/* Return to Home Button */}
            <div className="max-w-5xl mx-auto px-6 pt-8">
                <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Home
                </Link>
            </div>

            {/* Hero Section */}
            <div className="bg-white relative overflow-hidden border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                        Tax-Efficient Option Writing
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
                        Navigate the complex tax landscape of option writing with strategic insights on Section 1256 contracts, the 60/40 rule, and advanced tax optimization techniques.
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
                        src="https://i.imgur.com/SlyV2Jv.jpeg" 
                        alt="Tax-Efficient Option Writing Strategy Infographic" 
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
                src="https://i.imgur.com/SlyV2Jv.jpeg"
                alt="Tax-Efficient Option Writing Strategy Infographic"
                isOpen={isImageViewerOpen}
                onClose={() => setIsImageViewerOpen(false)}
            />

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-16">
                {/* Key Insights Cards */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Key Tax Optimization Strategies</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
                            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                                <Calculator className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-blue-900 mb-4">Section 1256 Advantage</h3>
                            <p className="text-blue-700 leading-relaxed">Index options (SPX, NDX) receive 60% long-term / 40% short-term tax treatment regardless of holding period, significantly reducing tax burden compared to ETF options.</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
                            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                                <Shield className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-green-900 mb-4">Avoid Tax Traps</h3>
                            <p className="text-green-700 leading-relaxed">Navigate straddle rules, wash sale restrictions, and qualified covered call requirements to prevent loss deferrals and holding period resets.</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
                            <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-purple-900 mb-4">Strategic Tax Management</h3>
                            <p className="text-purple-700 leading-relaxed">Implement tax-loss harvesting, maintain detailed records, and consider advanced elections like Trader Tax Status for professional-level activity.</p>
                        </div>
                    </div>
                </section>

                {/* Tax Rate Comparison */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">The Tax Rate Reality</h2>
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl border border-red-100 mb-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-red-900 mb-4">Standard Option Writing</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-red-700">ETF Options (SPY, QQQ)</span>
                                        <span className="font-bold text-red-900">37% Tax Rate</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-red-700">Short-term gains only</span>
                                        <span className="font-bold text-red-900">No exemptions</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-green-900 mb-4">Section 1256 Optimization</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-green-700">Index Options (SPX, NDX)</span>
                                        <span className="font-bold text-green-900">26.8% Blended Rate</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-green-700">60/40 rule benefit</span>
                                        <span className="font-bold text-green-900">Wash sale exempt</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-red-200">
                            <div className="flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-green-600 mr-2" />
                                <span className="text-lg font-bold text-green-900">Potential Tax Savings: 27% reduction in tax burden</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 1256 Deep Dive */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Section 1256 Contracts: The Premier Strategy</h2>
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Qualifying Contracts</h3>
                                <ul className="space-y-3 text-slate-700">
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                        SPX (S&P 500 Index)
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                        NDX (Nasdaq 100 Index)
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                        RUT (Russell 2000 Index)
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                        VIX (Volatility Index)
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Non-Qualifying (Standard Treatment)</h3>
                                <ul className="space-y-3 text-slate-700">
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                        SPY (SPDR S&P 500 ETF)
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                        QQQ (Invesco QQQ ETF)
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                        IWM (iShares Russell 2000 ETF)
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                        Individual stock options
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-xl">
                            <h4 className="font-bold text-blue-900 mb-3">The 60/40 Rule Calculation</h4>
                            <p className="text-blue-800 mb-4">For a trader in the highest tax bracket with $15,000 profit:</p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <p className="font-semibold text-blue-900">ETF Option (SPY):</p>
                                    <p className="text-blue-800">$15,000 × 37% = $5,550 tax</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-blue-900">Index Option (SPX):</p>
                                    <p className="text-blue-800">($9,000 × 20%) + ($6,000 × 37%) = $4,020 tax</p>
                                    <p className="font-bold text-green-600">Savings: $1,530 (27% reduction)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tax Traps to Avoid */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Critical Tax Traps to Avoid</h2>
                    <div className="space-y-6">
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                            <div className="flex">
                                <XCircle className="h-6 w-6 text-red-600 mr-4 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-lg font-bold text-red-800 mb-2">ETF vs Index Option Confusion</h4>
                                    <p className="text-red-700">Trading SPY options instead of SPX options costs you the 60/40 tax benefit and wash sale exemptions. This single mistake can increase your tax burden by 27%.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                            <div className="flex">
                                <XCircle className="h-6 w-6 text-red-600 mr-4 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-lg font-bold text-red-800 mb-2">Covered Call Holding Period Reset</h4>
                                    <p className="text-red-700">Writing non-qualified covered calls (under 30 days or deep ITM) on stock held less than one year resets the holding period to zero, destroying long-term capital gains eligibility.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                            <div className="flex">
                                <XCircle className="h-6 w-6 text-red-600 mr-4 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-lg font-bold text-red-800 mb-2">Straddle Loss Deferral</h4>
                                    <p className="text-red-700">Closing only the losing leg of a spread while keeping the winning side open defers the loss until the gain is recognized, eliminating current-year tax benefits.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                            <div className="flex">
                                <XCircle className="h-6 w-6 text-red-600 mr-4 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-lg font-bold text-red-800 mb-2">Wash Sale Violations</h4>
                                    <p className="text-red-700">Repurchasing "substantially identical" securities within 61 days of a loss disallows the deduction. While option rolling is generally safe, aggressive strategies risk IRS challenge.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Advanced Strategies */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Advanced Tax Optimization</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
                            <h3 className="text-xl font-bold text-green-900 mb-4">Tax-Loss Harvesting</h3>
                            <ul className="space-y-3 text-green-700">
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                                    Offset high-tax short-term gains with losses
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                                    Section 1256 contracts exempt from wash sale rules
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                                    Three-year loss carryback for Section 1256 losses
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
                            <h3 className="text-xl font-bold text-purple-900 mb-4">Trader Tax Status</h3>
                            <ul className="space-y-3 text-purple-700">
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></div>
                                    Removes $3,000 capital loss limitation
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></div>
                                    Section 475 mark-to-market election available
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></div>
                                    Requires substantial, regular trading activity
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Implementation Checklist */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Implementation Checklist</h2>
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Immediate Actions</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 w-4 h-4 text-blue-600" />
                                        <span className="text-slate-700">Switch from ETF to index options (SPY → SPX)</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 w-4 h-4 text-blue-600" />
                                        <span className="text-slate-700">Review covered call strategies for QCC compliance</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 w-4 h-4 text-blue-600" />
                                        <span className="text-slate-700">Implement systematic tax-loss harvesting</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Long-term Planning</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 w-4 h-4 text-blue-600" />
                                        <span className="text-slate-700">Establish detailed record-keeping system</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 w-4 h-4 text-blue-600" />
                                        <span className="text-slate-700">Consult qualified tax professional</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 w-4 h-4 text-blue-600" />
                                        <span className="text-slate-700">Evaluate Trader Tax Status eligibility</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl mb-12">
                    <div className="flex">
                        <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h4>
                            <p className="text-yellow-700">This content is for educational purposes only and should not be construed as tax or investment advice. Tax laws are complex and subject to change. Always consult with qualified tax and financial professionals before implementing any strategies discussed.</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                {currentArticle?.googleDoc && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Continue Learning</h3>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a 
                                href={currentArticle.googleDoc}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                            >
                                <FileText className="inline mr-2" />
                                Read Full Research Paper
                            </a>
                        </div>
                    </div>
                )}
            </main>
            
            {/* Footer */}
            <footer className="text-center py-8 mt-12 border-t border-gray-200">
                <p className="text-gray-500">© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
            </footer>
        </>
    );
}