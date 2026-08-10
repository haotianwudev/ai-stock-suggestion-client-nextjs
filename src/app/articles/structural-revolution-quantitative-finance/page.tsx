'use client';

import React, { useState } from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { InlineMath } from '@/components/articles/math';
import { ComparisonGrid, ComparisonCard } from '@/components/articles/article-visuals';

const TooltipTerm = ({ term, definition }: { term: string; definition: string }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <span className="relative inline-block group">
            <span
                className="font-bold text-[#A8672E] dark:text-[#D08F52] border-b border-dashed border-[#A8672E]/50 dark:border-[#D08F52]/50 cursor-help transition-colors"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onFocus={() => setIsVisible(true)}
                onBlur={() => setIsVisible(false)}
                tabIndex={0}
                aria-describedby={`tooltip-${term.replace(/\s+/g, '-')}`}
            >
                {term}
            </span>
            {isVisible && (
                <span
                    id={`tooltip-${term.replace(/\s+/g, '-')}`}
                    role="tooltip"
                    className="absolute z-50 w-64 p-3 mt-2 text-sm leading-relaxed text-slate-100 bg-slate-900 dark:bg-slate-800 rounded-md shadow-xl -left-1/2 transform translate-x-1/4 break-words pointer-events-none border border-slate-700/50"
                >
                    <span className="font-serif font-bold mb-1 text-[#A8672E] dark:text-[#D08F52] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
                        {term}
                    </span>
                    {definition}
                </span>
            )}
        </span>
    );
};

export default function StructuralRevolutionArticle() {
    return (
        <ArticleFrame
            slug="structural-revolution-quantitative-finance"
            additionalDisclaimer="This article describes academic causal-inference frameworks (DML, Deep IV, causal discovery) for educational purposes -- applying them to live trading requires rigorous validation and carries model risk like any quantitative strategy."
        >
            <div className="space-y-16 pb-24">

                {/* Key Takeaways Card */}
                <section className="p-6 md:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-[#A8672E]/30 dark:border-[#D08F52]/30 shadow-sm relative overflow-hidden">
                    <h2 className="text-xl font-serif text-[#A8672E] dark:text-[#D08F52] mb-6 flex items-center gap-2 border-b border-[#A8672E]/20 dark:border-[#D08F52]/20 pb-2">
                        <span className="w-2 h-2 rounded-full bg-current flex-none" />
                        Core Theses
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="text-[#A8672E] dark:text-[#D08F52] text-sm font-bold mt-0.5 flex-none">1.</span>
                                <p className="text-slate-700 dark:text-slate-300 text-sm">
                                    Predictive models relying exclusively on historical correlations degrade violently across regime changes.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#A8672E] dark:text-[#D08F52] text-sm font-bold mt-0.5 flex-none">2.</span>
                                <p className="text-slate-700 dark:text-slate-300 text-sm">
                                    Double Machine Learning neutralizes regularization bias, enabling unbiased causal parameter estimation in high-dimensional noise.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="text-[#A8672E] dark:text-[#D08F52] text-sm font-bold mt-0.5 flex-none">3.</span>
                                <p className="text-slate-700 dark:text-slate-300 text-sm">
                                    Continuous optimization (NOTEARS) and non-Gaussian frameworks (LiNGAM) can mathematically learn structural graphs directly from observational data.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#1D8A70] dark:text-[#3CBF9C] text-sm font-bold mt-0.5 flex-none">✓</span>
                                <p className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold text-sm">
                                    Replacing the Pearson matrix with the Interventional Covariance Matrix dramatically improves out-of-sample Sharpe ratios.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                        The Epistemological Crisis in Empirical Finance
                    </h2>

                    <ul className="space-y-4 text-sm mb-10">
                        <li className="flex items-start gap-3">
                            <span className="text-slate-400 mt-0.5 flex-none">•</span>
                            <p>Historically, quantitative finance relied on associational statistics (e.g., CAPM, Fama-French, standard deep learning).</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#BC4128] dark:text-[#E2694A] mt-0.5 flex-none">•</span>
                            <p className="text-[#BC4128] dark:text-[#E2694A]">Without causal frameworks, mining thousands of factors mathematically guarantees finding statistically significant but spurious correlations, artificially inflating the <TooltipTerm term="False Discovery Rate (FDR)" definition="The expected proportion of rejected null hypotheses that are actually false positives." />.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-slate-400 mt-0.5 flex-none">•</span>
                            <p>An investment strategy devoid of a formal causal theory is highly likely to be mathematically false out-of-sample.</p>
                        </li>
                    </ul>

                    <ComparisonGrid>
                        <ComparisonCard title="Associational Inference (Seeing)" tone="neutral">
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-slate-400 mt-1">•</span>
                                    <span>Measured by Conditional Probability: P(Y|X)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-slate-400 mt-1">•</span>
                                    <span>Relies on Undirected / Correlational graphs.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-slate-400 mt-1">•</span>
                                    <span>Vulnerable to Confounding, Colliders, and Simpson's Paradox.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#BC4128] dark:text-[#E2694A] mt-1">•</span>
                                    <span className="font-bold text-[#BC4128] dark:text-[#E2694A]">Degrades during regime shifts.</span>
                                </li>
                            </ul>
                        </ComparisonCard>

                        <ComparisonCard title="Causal Inference (Doing)" tone="pos">
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-1">•</span>
                                    <span>Measured by Do-Calculus: P(Y|do(X)) via SCMs.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-1">•</span>
                                    <span>Relies on Directed Acyclic Graphs (DAGs) to map temporal flow.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-1">•</span>
                                    <span>Actively mitigates spurious "factor mirages".</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-1">•</span>
                                    <span className="font-bold">Isolates invariant features robust to market turbulence.</span>
                                </li>
                            </ul>
                        </ComparisonCard>
                    </ComparisonGrid>
                </section>

                <InfographicSlot alt="The structural revolution in quantitative finance: causal inference vs correlational models" />

                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                        Theoretical Foundations: Graphing Market Structure
                    </h2>

                    <p className="mb-6 text-sm leading-relaxed">
                        A <TooltipTerm term="Directed Acyclic Graph (DAG)" definition="A structural map where variables are nodes connected by directed arrows indicating causal influence, strictly containing no feedback loops." /> maps the topological information of a system. Understanding this geometry is required to avoid destructive biases:
                    </p>

                    <ComparisonGrid>
                        <ComparisonCard title="Confounding Bias" tone="neg">
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                An unobserved variable causes both the treatment and the outcome. Failing to condition on it creates a spurious association.
                            </p>
                        </ComparisonCard>
                        <ComparisonCard title="Collider Bias" tone="neg">
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                The treatment and the outcome both cause a third variable. Conditioning on a collider induces artificial correlation between independent variables.
                            </p>
                        </ComparisonCard>
                    </ComparisonGrid>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                        High-Dimensional Parameter Estimation: Double Machine Learning
                    </h2>

                    <ul className="space-y-4 text-sm mb-8">
                        <li className="flex items-start gap-3">
                            <span className="text-slate-400 mt-0.5 flex-none">•</span>
                            <p>Standard ML architectures (Random Forests, DNNs) suffer from severe regularization bias, systematically shrinking causal parameter estimates toward zero and ruining inference.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5 flex-none">•</span>
                            <p className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold"><TooltipTerm term="Double Machine Learning (DML)" definition="A technique combining flexible ML models with Neyman orthogonalization and sample splitting to isolate true causal effects." /> neutralizes regularization bias, enabling the estimation of specific causal parameters amid high-dimensional nuisance covariates.</p>
                        </li>
                    </ul>

                    <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-xl bg-[#14171B] dark:bg-[#05070A] border border-slate-800 shadow-xl">
                        <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-slate-800">
                            <span className="text-xs font-mono font-semibold tracking-wider text-[#A8672E] dark:text-[#D08F52] uppercase">
                                DML Orthogonalization Mechanics
                            </span>
                        </div>
                        <div className="p-5 overflow-x-auto">
                            <pre className="font-mono text-sm leading-loose text-slate-200 tabular-nums">
                                <code>{`// Let Y = Asset Return (Outcome)
// Let T = Interest Rate Shock (Treatment)
// Let X = Macro/Firm Covariates (High-Dim Confounders)

1. Cross-Fitting via ML:
   Predict Y given X -> Y_hat
   Predict T given X -> T_hat

2. Residualization (Isolating unconfounded variance):
   Y_res = Y_actual - Y_hat
   T_res = T_actual - T_hat

3. Neyman Orthogonal Estimation:
   Causal_Effect (θ) = OLS(Y_res ~ T_res)

// Result: θ achieves root-n consistency despite ML regularization in Step 1.`}</code>
                            </pre>
                        </div>
                        <div className="px-5 py-3 text-xs font-mono text-slate-400 bg-black/20 border-t border-slate-800/50">
                            // The variance in T independent of X explains variance in Y independent of X.
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                        Tackling Unobserved Confounding: Deep IV
                    </h2>

                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <span className="text-[#BC4128] dark:text-[#E2694A] mt-0.5 flex-none">•</span>
                            <p>When confounders (like hidden macro sentiment) are unobservable, researchers use <TooltipTerm term="Instrumental Variable (IV)" definition="An exogenous variable affecting the treatment but not the outcome directly, independent of unobserved confounders." /> regression.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5 flex-none">•</span>
                            <p>Deep IV frameworks integrate neural networks into IV regression, modeling highly non-linear asset pricing structures while maintaining econometric unconfoundedness.</p>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                        Causal Discovery: Inferring Structural Graphs
                    </h2>

                    <p className="mb-6 text-sm leading-relaxed">
                        Causal Discovery mathematically learns the DAG directly from observational data, categorized into distinct algorithmic families:
                    </p>

                    <div className="overflow-x-auto w-full mb-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                                <tr>
                                    <th className="px-6 py-4 font-serif font-semibold border-b border-slate-200 dark:border-slate-700">Family</th>
                                    <th className="px-6 py-4 font-serif font-semibold border-b border-slate-200 dark:border-slate-700">Mechanism</th>
                                    <th className="px-6 py-4 font-serif font-semibold border-b border-slate-200 dark:border-slate-700">Quant Advantage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-gray-900">
                                <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">Constraint-Based (PC, FCI)</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Conditional independence tests.</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">FCI mathematically handles unobserved confounders.</td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">Continuous Optimization (NOTEARS)</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Differentiable algebraic constraint.</td>
                                    <td className="px-6 py-4 font-bold text-[#1D8A70] dark:text-[#3CBF9C]">Scales to large universes; integrates with NNs.</td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:bg-[#14171B] dark:hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">Non-Gaussian (LiNGAM)</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Independent Component Analysis.</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Orients causal arrows uniquely, resolving equivalence.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 border border-[#A8672E]/30 dark:border-[#D08F52]/30 p-5 rounded-xl">
                        <h4 className="font-serif font-bold text-[#A8672E] dark:text-[#D08F52] mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
                            The Role of LLMs
                        </h4>
                        <p className="text-sm text-slate-800 dark:text-slate-200">
                            LLMs act as "causal parrots" hallucinating relationships via linguistic co-occurrence. They must never independently arbitrate causality. Instead, they supply directional priors (soft constraints) to algorithms like NOTEARS, demonstrably boosting F1 accuracy on synthetic financial graphs by over 300%.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                        Causal Portfolio Analytics: Rethinking the Covariance Matrix
                    </h2>

                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <span className="text-[#BC4128] dark:text-[#E2694A] mt-0.5 flex-none">•</span>
                            <p>Modern Portfolio Theory relies on the Pearson matrix, capturing spurious correlations that notoriously converge toward 1.0 during market crashes.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5 flex-none">•</span>
                            <p>The <strong className="text-slate-900 dark:text-slate-100">Interventional Covariance Matrix (<InlineMath math="\Sigma_{do}" />)</strong> isolates structural dependencies by controlling for shared causal ancestors.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5 flex-none font-bold">✓</span>
                            <p className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold">Portfolios optimized on <InlineMath math="\Sigma_{do}" /> exhibit vastly superior out-of-sample Sharpe ratios and faster drawdown recoveries because they rely on invariant structures.</p>
                        </li>
                    </ul>
                </section>

            </div>
        </ArticleFrame>
    );
}
