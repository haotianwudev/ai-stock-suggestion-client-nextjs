'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, TrendingUp, CircleDollarSign, AlertTriangle, CheckCircle, XCircle, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Icon wrapper component
const Icon = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`inline-flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-cyan-100 text-cyan-700 ${className}`}>
        {children}
    </div>
);

export default function StructuredNotesAnalysis() {
    const currentArticle = articles.find(article => article.slug === 'structured-notes-institutional-grade-analysis');

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

            <div className="min-h-screen bg-slate-50 font-sans text-slate-700">
                <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* Return to Home Button */}
                    <div className="flex items-center gap-4 mb-4">
                        <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Return to Home
                        </Link>
                    </div>

                    {/* Deep Research Badge */}
                    <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                            Deep Research
                        </span>
                    </div>

                    {/* Header Section */}
                    <header className="text-center mb-20 border-b border-slate-200 pb-12">
                        <p className="text-base font-semibold text-cyan-600 tracking-wider uppercase mb-4">Institutional-Grade Analysis</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Common Structured Note Features</h1>
                        <p className="max-w-3xl mx-auto text-lg text-slate-600">An in-depth look at payoff profiles, risk-return trade-offs, and portfolio suitability for today's complex investment landscape.</p>
                    </header>

                    {/* Introduction */}
                    <section className="mb-16 prose prose-lg max-w-none text-slate-600">
                        <h2 className="text-3xl text-slate-900">Introduction: The Architecture of Structured Notes</h2>
                        <p>Structured notes represent a rapidly growing segment of the investment landscape... they are hybrid securities issued by financial institutions that combine the characteristics of debt and derivatives. At its core, a structured note is a senior, unsecured debt obligation—a promise to pay from an issuing bank—whose return is linked to the performance of a reference asset or index via a pre-defined formula.</p>

                        <h3 className="text-2xl text-slate-900">The Core Components: Zero-Coupon Bond and the Options Package</h3>
                        <p>The mechanics of a structured note can be deconstructed into two primary components: a zero-coupon bond and a package of derivatives. A significant portion of the investor's capital... is notionally allocated to a zero-coupon bond... The remaining capital... is used to purchase a package of derivative instruments—typically call and put options.</p>

                        <h3 className="text-2xl text-slate-900">Categorization of Notes: A Framework for Understanding</h3>
                        <p>To navigate the diverse landscape of structured notes, it is helpful to categorize them based on their primary investment objective. Generally, they fall into three broad categories:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong className="text-slate-800">Protection Notes:</strong> Prioritize the preservation of capital.</li>
                            <li><strong className="text-slate-800">Growth Notes (Participation Notes):</strong> Designed to provide enhanced or leveraged participation.</li>
                            <li><strong className="text-slate-800">Yield Notes (Income Notes):</strong> Aim to generate an enhanced yield or a stream of regular coupon payments.</li>
                        </ul>
                    </section>

                    {/* Comparative Analysis Table */}
                    <div className="my-16">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Comparative Analysis of Core Objectives</h3>
                        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                            <table className="w-full text-left">
                                <thead className="bg-slate-100 text-xs text-slate-500 uppercase tracking-wider">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-semibold">Objective</th>
                                        <th scope="col" className="px-6 py-4 font-semibold">Primary Goal</th>
                                        <th scope="col" className="px-6 py-4 font-semibold">Core Trade-Off</th>
                                        <th scope="col" className="px-6 py-4 font-semibold">Typical Investor Profile</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                                            <Icon><ShieldCheck /></Icon>Protection
                                        </td>
                                        <td className="px-6 py-4">Capital Preservation</td>
                                        <td className="px-6 py-4">Capped or limited upside</td>
                                        <td className="px-6 py-4">Risk-averse, conservative</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                                            <Icon><TrendingUp /></Icon>Growth
                                        </td>
                                        <td className="px-6 py-4">Capital Appreciation</td>
                                        <td className="px-6 py-4">Partial or contingent protection</td>
                                        <td className="px-6 py-4">Moderately to aggressively bullish</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                                            <Icon><CircleDollarSign /></Icon>Yield
                                        </td>
                                        <td className="px-6 py-4">Income Generation</td>
                                        <td className="px-6 py-4">Limited appreciation; principal risk</td>
                                        <td className="px-6 py-4">Income-focused, high risk tolerance</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Section 1: Downside Protection */}
                    <section className="my-20">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8 border-l-4 border-cyan-500 pl-4">1. Downside Protection: Buffers and Barriers</h2>
                        <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
                            <p>Downside protection is a hallmark feature of many structured notes... achieved through two distinct mechanisms: a buffer (hard protection) and a barrier (contingent protection).</p>

                            <h3 className="text-2xl text-slate-900">1.1 The Buffer Feature (Hard Protection)</h3>
                            <p>A buffer provides "hard protection" because it absorbs a specified percentage of loss in the underlying asset, starting from the first dollar of decline. If the underlier's value falls by more than the buffer amount, the investor is exposed to a one-to-one loss for any decline <em>beyond</em> that buffer level.</p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg border border-slate-200">
                                    <h4 className="font-semibold text-lg text-slate-900 mb-3 flex items-center">
                                        <CheckCircle />Pros
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                                        <li>Quantifiable, first-loss protection.</li>
                                        <li>Offers psychological comfort.</li>
                                        <li>Effective in moderate market declines.</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-slate-200">
                                    <h4 className="font-semibold text-lg text-slate-900 mb-3 flex items-center">
                                        <XCircle />Cons
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                                        <li>Lower potential returns (lower cap).</li>
                                        <li>Principal at risk in severe declines.</li>
                                    </ul>
                                </div>
                            </div>

                            <h3 className="text-2xl text-slate-900">1.2 The Barrier Feature (Contingent Protection)</h3>
                            <p>A barrier offers "soft" or "contingent" protection. It establishes a downside "knock-in" level. If the underlier's price breaches the barrier, the protection feature disappears entirely, and the investor is exposed to the full downside loss.</p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg border border-slate-200">
                                    <h4 className="font-semibold text-lg text-slate-900 mb-3 flex items-center">
                                        <CheckCircle />Pros
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                                        <li>More attractive terms (higher cap/coupon).</li>
                                        <li>Greater potential for enhanced returns.</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-slate-200">
                                    <h4 className="font-semibold text-lg text-slate-900 mb-3 flex items-center">
                                        <XCircle />Cons
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                                        <li>"Cliff risk": all-or-nothing protection.</li>
                                        <li>A small breach leads to full loss.</li>
                                        <li>Unsuitable for truly risk-averse investors.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Autocallable */}
                    <section className="my-20">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8 border-l-4 border-cyan-500 pl-4">2. The Autocallable Feature</h2>
                        <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
                            <p>The autocallable feature is one of the most popular structures, designed to offer high potential coupons in exchange for an uncertain maturity date and a cap on total returns.</p>

                            <h3 className="text-2xl text-slate-900">2.1 Mechanics of the Autocall</h3>
                            <p>An autocallable note has a series of pre-set observation dates. If the underlier's level is at or above a trigger level, the note is automatically "called" (redeemed), and the investor receives their principal plus a coupon.</p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg border border-slate-200">
                                    <h4 className="font-semibold text-lg text-slate-900 mb-3 flex items-center">
                                        <CheckCircle />Pros
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                                        <li>Potential for high, pre-defined coupons.</li>
                                        <li>Good for flat or moderately rising markets.</li>
                                        <li>Early redemption provides a liquidity event.</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-slate-200">
                                    <h4 className="font-semibold text-lg text-slate-900 mb-3 flex items-center">
                                        <XCircle />Cons
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                                        <li><strong>Reinvestment Risk:</strong> Called at an inopportune time.</li>
                                        <li><strong>Limited Upside:</strong> Return is capped at the coupon.</li>
                                        <li><strong>Uncertain Maturity:</strong> Hard for financial planning.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Yield Enhancement */}
                    <section className="my-20">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8 border-l-4 border-cyan-500 pl-4">3. Yield Enhancement Notes</h2>
                        <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
                            <p>In an environment of low interest rates, investors often seek alternative sources of income. Yield enhancement notes are structured specifically to meet this demand, but this "enhancement" is not a free lunch; it is generated because the investor implicitly sells options.</p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg border border-slate-200">
                                    <h4 className="font-semibold text-lg text-slate-900 mb-3 flex items-center">
                                        <CheckCircle />Pros
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                                        <li>Significantly higher yield than traditional bonds.</li>
                                        <li>Can generate positive returns in flat markets.</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-lg border border-slate-200">
                                    <h4 className="font-semibold text-lg text-slate-900 mb-3 flex items-center">
                                        <XCircle />Cons
                                    </h4>
                                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                                        <li><strong>Principal is fully at risk.</strong></li>
                                        <li>Limited or no upside participation.</li>
                                        <li>May be forced to take delivery of a depreciated asset.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Key Risks */}
                    <section className="my-20">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8 border-l-4 border-red-500 pl-4">4. Synthesis of Key Risks and Regulatory Scrutiny</h2>
                        <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
                            <p>While each structured note has a unique payoff profile, a set of foundational risks permeates the entire product class. These risks are frequently highlighted in investor alerts from regulatory bodies like the SEC and FINRA.</p>

                            <div className="space-y-6">
                                <div className="bg-red-100 p-6 rounded-lg border border-red-200">
                                    <h4 className="font-semibold text-lg text-red-800 mb-2">Credit Risk</h4>
                                    <p className="text-red-700">The note is an unsecured debt of the issuing bank. If the bank fails, you could lose everything, regardless of the underlier's performance.</p>
                                </div>
                                <div className="bg-yellow-100 p-6 rounded-lg border border-yellow-200">
                                    <h4 className="font-semibold text-lg text-yellow-800 mb-2">Liquidity Risk</h4>
                                    <p className="text-yellow-700">These are buy-and-hold investments. There is no guaranteed secondary market, and selling early may result in a significant loss.</p>
                                </div>
                                <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-lg text-blue-800 mb-2">Complexity & Cost Risk</h4>
                                    <p className="text-blue-700">Complex formulas can obscure the true risk profile. High, embedded fees are not transparent and reduce potential returns.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Conclusion */}
                    <section className="my-20 pt-12 border-t border-slate-200">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Conclusion: A Framework for Evaluation</h2>
                        <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
                            <p>Structured notes are sophisticated financial instruments that offer customized exposure but come at the cost of complexity, illiquidity, and embedded risks. There is no "free lunch"; every feature is paid for by the investor.</p>

                            <p>Any potential investor must undertake a rigorous evaluation process. This checklist, based on regulatory guidance, can help:</p>

                            <ol className="list-decimal pl-6 space-y-4">
                                <li><strong className="text-slate-800">Market View:</strong> Does the note's profile align with my explicit forecast?</li>
                                <li><strong className="text-slate-800">Risk Tolerance:</strong> Am I genuinely comfortable with the issuer credit risk, cliff risk, and potential for principal loss?</li>
                                <li><strong className="text-slate-800">Portfolio Role:</strong> What precise objective does this note fulfill in my overall portfolio?</li>
                                <li><strong className="text-slate-800">Cost-Benefit Analysis:</strong> Is the customized payoff worth the embedded costs and illiquidity compared to alternatives?</li>
                                <li><strong className="text-slate-800">Understanding:</strong> Can I explain how this note works in different market scenarios? If not, the investment should be avoided.</li>
                            </ol>
                        </div>
                    </section>

                    {/* Call to Action */}
                    <section className="my-16 text-center bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-lg border border-blue-200">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Continue Your Investment Education</h3>
                        <p className="text-lg text-slate-600 mb-6">
                            Explore more institutional-grade analysis and deep research articles to enhance your investment knowledge.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                            >
                                Explore More Articles
                            </Link>
                            {currentArticle?.googleDoc && (
                                <a
                                    href={currentArticle.googleDoc}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                                >
                                    Read Full Research
                                </a>
                            )}
                        </div>
                    </section>

                    {/* Educational Disclaimer */}
                    <div className="mt-16 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start">
                            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-semibold text-yellow-800 mb-2">Educational Disclaimer</h4>
                                <p className="text-yellow-700 text-sm">
                                    This content is for educational and informational purposes only and should not be construed as investment advice.
                                    Structured notes involve significant risks including credit risk, liquidity risk, and potential loss of principal.
                                    Always consult with qualified financial professionals before making investment decisions.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="text-center mt-20 pt-8 border-t border-slate-200">
                        <p className="text-sm text-slate-500">
                            © 2025 SOPHIE Daddyuant Blog. Educational content for informational purposes only.
                        </p>
                    </footer>
                </main>
            </div>
        </>
    );
}
