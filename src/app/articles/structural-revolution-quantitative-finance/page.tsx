'use client';

import React, { useState } from 'react';
import { Network, Database, BrainCircuit, Activity, BarChart3, LineChart, FileText } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { InlineMath } from '@/components/articles/math';

const TooltipTerm = ({ term, definition }: { term: string; definition: string }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <span className="relative inline-block">
            <span
                className="font-medium text-[#A8672E] dark:text-[#D08F52] border-b border-dashed border-[#A8672E]/50 dark:border-[#D08F52]/50 cursor-help transition-colors hover:bg-[#A8672E]/10 dark:hover:bg-[#D08F52]/10"
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
                    {definition}
                </span>
            )}
        </span>
    );
};

const MathPanel = ({ title, code, annotation }: { title: string; code: string; annotation?: string }) => (
    <div className="w-full max-w-4xl mx-auto my-8 overflow-hidden rounded-xl bg-[#14171B] dark:bg-[#05070A] border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-slate-800">
            <span className="text-xs font-mono font-semibold tracking-wider text-[#A8672E] dark:text-[#D08F52] uppercase">
                {title}
            </span>
            <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            </div>
        </div>
        <div className="p-5 overflow-x-auto">
            <pre className="font-mono text-sm leading-loose text-slate-200 tabular-nums">
                <code>{code}</code>
            </pre>
        </div>
        {annotation && (
            <div className="px-5 py-3 text-xs font-mono text-slate-400 bg-black/20 border-t border-slate-800/50">
                // {annotation}
            </div>
        )}
    </div>
);

interface ComparisonSide {
    icon: React.ReactNode;
    title: string;
    items: string[];
}

const ComparisonCard = ({ title, left, right }: { title: string; left: ComparisonSide; right: ComparisonSide }) => (
    <div className="my-10 w-full">
        <h3 className="text-xl font-serif text-slate-900 dark:text-slate-100 mb-6 text-center">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                        {left.icon}
                    </div>
                    <h4 className="font-serif text-lg text-slate-800 dark:text-slate-200">{left.title}</h4>
                </div>
                <ul className="space-y-3">
                    {left.items.map((item: string, i: number) => (
                        <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                            <span className="mr-2 text-slate-400 dark:text-slate-500 mt-0.5">•</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-6 bg-[#1D8A70]/5 dark:bg-[#3CBF9C]/5 rounded-xl border border-[#1D8A70]/20 dark:border-[#3CBF9C]/20 shadow-[0_0_15px_rgba(29,138,112,0.05)] dark:shadow-[0_0_15px_rgba(60,191,156,0.05)]">
                 <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#1D8A70]/10 dark:border-[#3CBF9C]/10">
                    <div className="p-2 bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 rounded-lg text-[#1D8A70] dark:text-[#3CBF9C]">
                        {right.icon}
                    </div>
                    <h4 className="font-serif text-lg text-[#1D8A70] dark:text-[#3CBF9C]">{right.title}</h4>
                </div>
                <ul className="space-y-3">
                    {right.items.map((item: string, i: number) => (
                        <li key={i} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                            <span className="mr-2 text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5">•</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

export default function StructuralRevolutionArticle() {
    return (
        <ArticleFrame
            slug="structural-revolution-quantitative-finance"
            additionalDisclaimer="This article describes academic causal-inference frameworks (DML, Deep IV, causal discovery) for educational purposes -- applying them to live trading requires rigorous validation and carries model risk like any quantitative strategy."
        >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 font-sans text-slate-800 dark:text-slate-200 bg-transparent">

                {/* Key Takeaways Card */}
                <section className="mb-12 p-6 md:p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
                        <BrainCircuit className="w-48 h-48 text-slate-900 dark:text-white" />
                    </div>
                    <h2 className="text-sm font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Core Theses
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-[#A8672E] dark:text-[#D08F52] text-sm font-bold">1</span>
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 leading-snug">
                                    Predictive models relying exclusively on historical correlations degrade violently across regime changes.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-[#A8672E] dark:text-[#D08F52] text-sm font-bold">2</span>
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 leading-snug">
                                    Double Machine Learning neutralizes regularization bias, enabling unbiased causal parameter estimation in high-dimensional noise.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#A8672E]/10 dark:bg-[#D08F52]/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-[#A8672E] dark:text-[#D08F52] text-sm font-bold">3</span>
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 leading-snug">
                                    Continuous optimization (NOTEARS) and non-Gaussian frameworks (LiNGAM) can mathematically learn structural graphs directly from observational data.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] text-sm font-bold">✓</span>
                                </div>
                                <p className="text-[#1D8A70] dark:text-[#3CBF9C] font-medium leading-snug">
                                    Replacing the Pearson matrix with the Interventional Covariance Matrix dramatically improves out-of-sample Sharpe ratios.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Sections */}
                <div className="space-y-16">

                    {/* Section: Epistemological Crisis */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                            The Epistemological Crisis in Empirical Finance
                        </h2>

                        <ul className="space-y-4 list-none pl-0">
                            <li className="flex gap-4">
                                <div className="shrink-0 mt-1"><BarChart3 className="w-5 h-5 text-slate-400" /></div>
                                <p>Historically, quantitative finance relied on associational statistics (e.g., CAPM, Fama-French, standard deep learning).</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 mt-1"><Activity className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A]" /></div>
                                <p className="text-[#BC4128] dark:text-[#E2694A]">Without causal frameworks, mining thousands of factors mathematically guarantees finding statistically significant but spurious correlations, artificially inflating the <TooltipTerm term="False Discovery Rate (FDR)" definition="The expected proportion of rejected null hypotheses that are actually false positives." />.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 mt-1"><FileText className="w-5 h-5 text-slate-400" /></div>
                                <p>An investment strategy devoid of a formal causal theory is highly likely to be mathematically false out-of-sample.</p>
                            </li>
                        </ul>

                        <ComparisonCard
                            title="The Epistemological Divide"
                            left={{
                                icon: <LineChart className="w-6 h-6" />,
                                title: "Associational Inference (Seeing)",
                                items: [
                                    "Measured by Conditional Probability: P(Y|X)",
                                    "Relies on Undirected / Correlational graphs.",
                                    "Vulnerable to Confounding, Colliders, and Simpson's Paradox.",
                                    "Degrades during regime shifts."
                                ]
                            }}
                            right={{
                                icon: <Network className="w-6 h-6" />,
                                title: "Causal Inference (Doing)",
                                items: [
                                    "Measured by Do-Calculus: P(Y|do(X)) via SCMs.",
                                    "Relies on Directed Acyclic Graphs (DAGs) to map temporal flow.",
                                    "Actively mitigates spurious 'factor mirages'.",
                                    "Isolates invariant features robust to market turbulence."
                                ]
                            }}
                        />
                    </section>

                    <InfographicSlot alt="The structural revolution in quantitative finance: causal inference vs correlational models" />

                    {/* Section: Theoretical Foundations */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                            Theoretical Foundations: Graphing Market Structure
                        </h2>

                        <p className="mb-6 leading-relaxed">
                            A <TooltipTerm term="Directed Acyclic Graph (DAG)" definition="A structural map where variables are nodes connected by directed arrows indicating causal influence, strictly containing no feedback loops." /> maps the topological information of a system. Understanding this geometry is required to avoid destructive biases:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-l-4 border-[#BC4128] dark:border-[#E2694A]">
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#BC4128] dark:bg-[#E2694A]"></span>
                                    <TooltipTerm term="Confounding Bias" definition="Occurs when an unobserved variable causes both treatment and outcome, creating a false correlation. Must be controlled for." />
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    An unobserved variable causes both the treatment and the outcome. Failing to condition on it creates a spurious association.
                                </p>
                            </div>
                            <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-l-4 border-[#BC4128] dark:border-[#E2694A]">
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#BC4128] dark:bg-[#E2694A]"></span>
                                    <TooltipTerm term="Collider Bias" definition="Occurs when treatment and outcome both cause a third variable. Conditioning on a collider artificially correlates independent variables." />
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    The treatment and the outcome both cause a third variable. Conditioning on a collider induces artificial correlation between independent variables.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section: Double Machine Learning */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                            High-Dimensional Parameter Estimation: Double Machine Learning
                        </h2>

                        <ul className="space-y-4 list-none pl-0">
                            <li className="flex gap-4">
                                <div className="shrink-0 mt-1"><Database className="w-5 h-5 text-slate-400" /></div>
                                <p>Standard ML architectures (Random Forests, DNNs) suffer from severe regularization bias, systematically shrinking causal parameter estimates toward zero and ruining inference.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 mt-1"><Activity className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C]" /></div>
                                <p className="text-[#1D8A70] dark:text-[#3CBF9C]"><TooltipTerm term="Double Machine Learning (DML)" definition="A technique combining flexible ML models with Neyman orthogonalization and sample splitting to isolate true causal effects." /> neutralizes regularization bias, enabling the estimation of specific causal parameters amid high-dimensional nuisance covariates.</p>
                            </li>
                        </ul>

                        <MathPanel
                            title="DML Orthogonalization Mechanics"
                            code={`// Let Y = Asset Return (Outcome)
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

// Result: θ achieves root-n consistency despite ML regularization in Step 1.`}
                            annotation="The variance in T independent of X explains variance in Y independent of X."
                        />
                    </section>

                    {/* Section: Deep IV */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                            Tackling Unobserved Confounding: Deep IV
                        </h2>

                        <ul className="space-y-4 list-none pl-0">
                            <li className="flex gap-4">
                                <div className="shrink-0 mt-1 text-[#BC4128] dark:text-[#E2694A]">•</div>
                                <p>When confounders (like hidden macro sentiment) are unobservable, researchers use <TooltipTerm term="Instrumental Variable (IV)" definition="An exogenous variable affecting the treatment but not the outcome directly, independent of unobserved confounders." /> regression.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 mt-1 text-[#1D8A70] dark:text-[#3CBF9C]">•</div>
                                <p>Deep IV frameworks integrate neural networks into IV regression, modeling highly non-linear asset pricing structures while maintaining econometric unconfoundedness.</p>
                            </li>
                        </ul>
                    </section>

                    {/* Section: Causal Discovery Algorithms */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                            Causal Discovery: Inferring Structural Graphs
                        </h2>

                        <p className="mb-6 leading-relaxed">
                            Causal Discovery mathematically learns the DAG directly from observational data, categorized into distinct algorithmic families:
                        </p>

                        <div className="overflow-x-auto w-full mb-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                                    <tr>
                                        <th className="px-6 py-4 font-serif font-medium border-b border-slate-200 dark:border-slate-800">Family</th>
                                        <th className="px-6 py-4 font-serif font-medium border-b border-slate-200 dark:border-slate-800">Mechanism</th>
                                        <th className="px-6 py-4 font-serif font-medium border-b border-slate-200 dark:border-slate-800">Quant Advantage</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-[#0B0E13]">
                                    <tr>
                                        <td className="px-6 py-4 font-medium">Constraint-Based (PC, FCI)</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Conditional independence tests.</td>
                                        <td className="px-6 py-4">FCI mathematically handles unobserved confounders.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium">Continuous Optimization (NOTEARS)</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Differentiable algebraic constraint.</td>
                                        <td className="px-6 py-4 text-[#1D8A70] dark:text-[#3CBF9C]">Scales to large universes; integrates with NNs.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium">Non-Gaussian (LiNGAM)</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Independent Component Analysis.</td>
                                        <td className="px-6 py-4">Orients causal arrows uniquely, resolving equivalence.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-[#A8672E]/5 dark:bg-[#D08F52]/5 border border-[#A8672E]/20 dark:border-[#D08F52]/20 p-5 rounded-lg">
                            <h4 className="font-semibold text-[#A8672E] dark:text-[#D08F52] mb-2">The Role of LLMs</h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                LLMs act as &ldquo;causal parrots&rdquo; hallucinating relationships via linguistic co-occurrence. They must never independently arbitrate causality. Instead, they supply directional priors (soft constraints) to algorithms like NOTEARS, demonstrably boosting F1 accuracy on synthetic financial graphs by over 300%.
                            </p>
                        </div>
                    </section>

                    {/* Section: Causal Portfolio Analytics */}
                    <section>
                        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                            Causal Portfolio Analytics: Rethinking the Covariance Matrix
                        </h2>

                        <ul className="space-y-4 list-none pl-0">
                            <li className="flex gap-4">
                                <div className="shrink-0 mt-1"><Activity className="w-5 h-5 text-[#BC4128] dark:text-[#E2694A]" /></div>
                                <p>Modern Portfolio Theory relies on the Pearson matrix, capturing spurious correlations that notoriously converge toward 1.0 during market crashes.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 mt-1"><Network className="w-5 h-5 text-[#1D8A70] dark:text-[#3CBF9C]" /></div>
                                <p>The <strong>Interventional Covariance Matrix (<InlineMath math="\Sigma_{do}" />)</strong> isolates structural dependencies by controlling for shared causal ancestors.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 mt-1 text-[#1D8A70] dark:text-[#3CBF9C]">•</div>
                                <p className="text-[#1D8A70] dark:text-[#3CBF9C] font-medium">Portfolios optimized on <InlineMath math="\Sigma_{do}" /> exhibit vastly superior out-of-sample Sharpe ratios and faster drawdown recoveries because they rely on invariant structures.</p>
                            </li>
                        </ul>
                    </section>

                </div>
            </div>
        </ArticleFrame>
    );
}
