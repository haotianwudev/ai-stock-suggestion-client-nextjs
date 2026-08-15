'use client';

import React from 'react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';
import { InlineMath } from '@/components/articles/math';
import { ComparisonGrid, ComparisonCard, FormulaPanel, Jargon } from '@/components/articles/article-visuals';

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
                            <p className="text-[#BC4128] dark:text-[#E2694A]">Without causal frameworks, mining thousands of factors mathematically guarantees finding statistically significant but spurious correlations, artificially inflating the <Jargon term="False Discovery Rate (FDR)" definition="The expected proportion of rejected null hypotheses that are actually false positives." />.</p>
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
                                    <span>Measured by Conditional Probability: <InlineMath math="P(Y \mid X)" /></span>
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
                                    <span className="font-bold text-[#BC4128] dark:text-[#E2694A]">Degrades violently during regime shifts.</span>
                                </li>
                            </ul>
                        </ComparisonCard>

                        <ComparisonCard title="Causal Inference (Doing)" tone="pos">
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-1">•</span>
                                    <span>Measured by Do-Calculus: <InlineMath math="P(Y \mid \operatorname{do}(X))" /> via SCMs.</span>
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
                        A <Jargon term="Directed Acyclic Graph (DAG)" definition="A structural map where variables are nodes connected by directed arrows indicating causal influence, strictly containing no feedback loops." /> maps the topological information of a system. Understanding this geometry is required to avoid destructive biases:
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

                    <div className="mt-8">
                        <FormulaPanel
                            title="Pearl's Backdoor Adjustment (Do-Calculus)"
                            formula="P(Y \mid \operatorname{do}(T = t)) = \sum_{X} P(Y \mid T = t, X = x) P(X = x)"
                            legend={[
                                { label: "do(T=t)", value: "Interventional operator setting treatment T to value t (severing incoming arrows)" },
                                { label: "X", value: "Confounder set satisfying the Backdoor Criterion relative to (T, Y)" },
                                { label: "P(Y|do(T))", value: "Causal interventional probability distribution isolated from confounding bias" },
                            ]}
                        />
                    </div>
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
                            <p className="text-[#1D8A70] dark:text-[#3CBF9C] font-bold"><Jargon term="Double Machine Learning (DML)" definition="A technique combining flexible ML models with Neyman orthogonalization and sample splitting to isolate true causal effects." /> neutralizes regularization bias, enabling the estimation of specific causal parameters amid high-dimensional nuisance covariates.</p>
                        </li>
                    </ul>

                    <div className="space-y-6">
                        <FormulaPanel
                            title="Double Machine Learning (DML) Orthogonalized Estimator"
                            formula="\hat{\theta} = \left( \frac{1}{n} \sum_{i=1}^n \tilde{D}_i^2 \right)^{-1} \left( \frac{1}{n} \sum_{i=1}^n \tilde{D}_i \tilde{Y}_i \right)"
                            legend={[
                                { label: "Y", value: "Outcome asset return: Y = θ₀ D + g₀(X) + U with E[U|X,D] = 0" },
                                { label: "D", value: "Treatment shock variable: D = m₀(X) + V with E[V|X] = 0" },
                                { label: "X", value: "High-dimensional confounding covariates (macro, factor exposures)" },
                                { label: "Ỹ, D̃", value: "Out-of-fold cross-fitted residuals: Ỹ = Y - ĝ(X), D̃ = D - m̂(X)" },
                                { label: "θ̂", value: "Neyman-orthogonal causal effect achieving √n-consistency" },
                            ]}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52] block mb-2">Step 1: Cross-Fitting</span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Split data into K folds. Train arbitrary ML models to predict <InlineMath math="Y" /> from <InlineMath math="X" /> (<InlineMath math="\hat{g}(X)" />) and <InlineMath math="D" /> from <InlineMath math="X" /> (<InlineMath math="\hat{m}(X)" />) out-of-sample.
                                </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52] block mb-2">Step 2: Residualization</span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Calculate residuals <InlineMath math="\tilde{Y} = Y - \hat{g}(X)" /> and <InlineMath math="\tilde{D} = D - \hat{m}(X)" />. This isolates the variation in <InlineMath math="D" /> independent of confounders <InlineMath math="X" />.
                                </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#1D8A70] dark:text-[#3CBF9C] block mb-2">Step 3: Neyman Estimation</span>
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    Regress <InlineMath math="\tilde{Y}" /> on <InlineMath math="\tilde{D}" />. The Neyman condition guarantees <InlineMath math="\sqrt{n}" />-consistency even when ML nuisance functions converge at slower <InlineMath math="n^{-1/4}" /> rates.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                        Tackling Unobserved Confounding: Deep IV
                    </h2>

                    <ul className="space-y-4 text-sm mb-8">
                        <li className="flex items-start gap-3">
                            <span className="text-[#BC4128] dark:text-[#E2694A] mt-0.5 flex-none">•</span>
                            <p>When confounders (like hidden macro sentiment or liquidity shocks) are unobservable, researchers use <Jargon term="Instrumental Variable (IV)" definition="An exogenous variable affecting the treatment but not the outcome directly, independent of unobserved confounders." /> regression.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#1D8A70] dark:text-[#3CBF9C] mt-0.5 flex-none">•</span>
                            <p>Deep IV frameworks integrate deep neural networks into IV regression, modeling highly non-linear asset pricing structures while maintaining econometric unconfoundedness.</p>
                        </li>
                    </ul>

                    <FormulaPanel
                        title="Deep Instrumental Variables (Deep IV) Formulation"
                        formula="\mathbb{E}[Y \mid Z, X] = \int g(d, X) \, dP(d \mid Z, X)"
                        legend={[
                            { label: "Z", value: "Exogenous instrument (satisfying relevance, exclusion, and unconfoundedness)" },
                            { label: "D", value: "Endogenous treatment variable subject to unobserved confounding" },
                            { label: "X", value: "Observable background conditioning covariates" },
                            { label: "g(d, X)", value: "Non-linear structural causal response function parameterized via neural networks" },
                        ]}
                    />
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

                    <div className="space-y-6 mb-8">
                        <FormulaPanel
                            title="Continuous Acyclicity Constraint (NOTEARS)"
                            formula="\min_{W \in \mathbb{R}^{d \times d}} \frac{1}{2n} \|X - X W\|_F^2 + \lambda \|W\|_1 \quad \text{s.t.} \quad h(W) = \operatorname{tr}\left(e^{W \circ W}\right) - d = 0"
                            legend={[
                                { label: "W", value: "Weighted adjacency matrix of directed acyclic graph (DAG)" },
                                { label: "W ∘ W", value: "Hadamard (element-wise) matrix product" },
                                { label: "tr(e^A)", value: "Trace of matrix exponential enforcing exact graph acyclicity" },
                                { label: "d", value: "Number of assets / variables in the target universe" },
                            ]}
                        />

                        <FormulaPanel
                            title="Linear Non-Gaussian Acyclic Model (LiNGAM)"
                            formula="X = B X + e = (I - B)^{-1} e, \quad e_i \sim \text{Non-Gaussian}"
                            legend={[
                                { label: "B", value: "Strictly lower-triangular DAG adjacency matrix under topological ordering" },
                                { label: "e", value: "Mutually independent non-Gaussian error terms (exploited via ICA)" },
                            ]}
                        />
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

                    <ul className="space-y-4 text-sm mb-8">
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

                    <div className="space-y-6">
                        <FormulaPanel
                            title="The Interventional Covariance Matrix (Σ_do)"
                            formula="\Sigma_{do} = (I - B)^{-1} \left( \Gamma \Sigma_F \Gamma^T + \Sigma_\epsilon \right) ((I - B)^{-1})^T"
                            legend={[
                                { label: "B", value: "Topological DAG causal adjacency matrix among asset returns" },
                                { label: "Γ", value: "Factor loading matrix on common causal macroeconomic drivers F" },
                                { label: "Σ_F", value: "Covariance matrix of exogenous macroeconomic drivers" },
                                { label: "Σ_ε", value: "Diagonal idiosyncratic noise variance matrix" },
                                { label: "Σ_do", value: "Interventional covariance isolating true invariant structural dependencies" },
                            ]}
                        />

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <h4 className="font-serif text-lg text-slate-900 dark:text-slate-100 mb-2">Causal Mean-Variance Portfolio Optimization</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                Replacing the fragile Pearson sample covariance matrix with <InlineMath math="\Sigma_{do}" /> generates portfolios shielded from spurious correlation collapses during market panics:
                            </p>
                            <div className="text-center py-2">
                                <InlineMath math="\min_{\mathbf{w}} \mathbf{w}^T \Sigma_{do} \mathbf{w} \quad \text{s.t.} \quad \mathbf{w}^T \mathbf{\mu} \ge \mu_{\text{target}}, \quad \mathbf{w}^T \mathbf{1} = 1" className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100" />
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </ArticleFrame>
    );
}

