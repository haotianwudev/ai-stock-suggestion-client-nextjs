'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronsDown, Cpu, Bot, Blend, Target, GitCompareArrows, TrendingUp, Menu, X, ChevronsUp } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function XGBoostSystematicTradingArticle() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Find current article
    const currentArticle = articles.find(article => article.slug === 'strategic-role-xgboost-systematic-trading-2025');

    // Paper content structure
    const paperContent = {
        title: "The Strategic Role of XGBoost in Systematic Trading",
        subtitle: "A 2025 Perspective on Performance, Problems, and Positioning Against Deep Learning",
        executiveSummary: "While complex models like LSTMs and Transformers gain prominence, XGBoost maintains a vital position in systematic trading. Its relevance stems from exceptional performance on structured, feature-rich prediction tasks. The most sophisticated firms in 2025 will leverage a unified toolkit, deploying XGBoost for its strengths in feature-driven prediction and integrating deep learning for raw sequential data analysis. The most potent alpha will emerge from hybrid architectures combining the strengths of both paradigms.",
        sections: [
            {
                id: "paradigm",
                title: "The XGBoost Paradigm",
                icon: Cpu,
                summary: "XGBoost is more than an algorithm; it's a complete paradigm for a crucial class of financial prediction problems, engineered for performance, efficiency, and robustness against noisy financial data.",
                points: [
                    {
                        title: "Gradient Boosting Engine",
                        content: "Sequentially builds models (decision trees) where each new model corrects the errors of the previous ones. This transforms a collection of weak learners into a single, highly accurate strong learner."
                    },
                    {
                        title: "Advanced Regularization",
                        content: "Incorporates both L1 (Lasso) and L2 (Ridge) regularization, penalizing model complexity to prevent overfitting on market noise—a primary cause of strategy failure."
                    },
                    {
                        title: "Optimized for Speed",
                        content: "Leverages parallel processing and cache-aware access for rapid training. This enables more frequent model retraining and extensive backtesting, crucial for adapting to non-stationary markets."
                    },
                    {
                        title: "Inherent Robustness",
                        content: "As an ensemble, it aggregates predictions from thousands of trees, making it less sensitive to outliers. Its sparsity-aware algorithm natively handles missing values, simplifying data preprocessing."
                    }
                ]
            },
            {
                id: "competencies",
                title: "Core Competencies: Where XGBoost Excels",
                icon: Target,
                summary: "XGBoost's architecture is optimally suited for problems framed as a prediction task on a structured, tabular dataset, where engineered features are the primary source of predictive power.",
                examples: [
                    {
                        title: "Cross-Sectional Alpha Generation",
                        description: "The quintessential quant problem: ranking stocks based on future performance. The data is a 2D table where rows are stocks and columns are features (Value, Momentum, Quality). XGBoost excels at learning the complex, non-linear interactions between these factors to predict forward returns.",
                        scenario: "A monthly S&P 500 ranking strategy using an XGBoost regressor to predict returns, forming a sector-neutral long-short portfolio."
                    },
                    {
                        title: "Market Regime Classification",
                        description: "Identifying the current market state (e.g., 'Risk-On' vs. 'Risk-Off') to adapt strategy. This is a classification problem based on a snapshot of indicators like the VIX, credit spreads, and cross-asset correlations. XGBoost effectively classifies regimes to guide asset allocation.",
                        scenario: "A volatility regime-based asset allocation strategy that shifts between equities and bonds based on an XGBoost classifier's weekly prediction."
                    },
                    {
                        title: "High-Frequency Signal Generation",
                        description: "Making short-term predictions based on rich features from market microstructure data. Predictive power comes from contemporaneous features (order book depth, bid-ask spread, flow imbalance), not long-term dependencies. XGBoost's speed and accuracy are critical for these latency-sensitive tasks.",
                        scenario: "An intraday Forex prediction model for EUR/USD, using an XGBClassifier to predict the direction over the next 60 minutes."
                    }
                ]
            },
            {
                id: "comparison",
                title: "Comparative Framework: XGBoost vs. Deep Learning",
                icon: GitCompareArrows,
                summary: "The choice between models is not about superiority, but strategic alignment. It's a trade-off between data structure, interpretability, robustness, and computational cost.",
                comparisonTable: {
                    headers: ["Characteristic", "XGBoost", "LSTM", "Transformer"],
                    rows: [
                        ["Ideal Data", "Structured/Tabular", "Time Series", "Long Sequences"],
                        ["Key Strength", "Speed, Interpretability", "Temporal Dependencies", "Global Dependencies"],
                        ["Key Weakness", "Requires Feature Engineering", "Sequential (Slow)", "Data Hungry, Expensive"],
                        ["Interpretability", "High (SHAP)", "Low (Post-hoc)", "Very Low"],
                        ["Compute Cost", "Low (CPU)", "High (GPU)", "Very High (GPU/TPU)"]
                    ]
                },
                points: [
                    {
                        title: "The Data Dichotomy",
                        content: "XGBoost operates on 2D tabular data, assuming alpha is in engineered features. LSTMs/Transformers process raw sequences, assuming alpha is in path-dependent patterns."
                    },
                    {
                        title: "The Interpretability Imperative",
                        content: "XGBoost is a 'white box', offering built-in feature importance. Deep learning models are 'black boxes', making it hard to trace predictions, which is a major risk in finance."
                    },
                    {
                        title: "Performance Under Pressure",
                        content: "XGBoost's ensemble nature and regularization provide strong defense against overfitting. Transformers, while powerful, can struggle with the high noise levels in market data."
                    }
                ]
            },
            {
                id: "hybrid",
                title: "The Synthesis: Hybrid Architectures",
                icon: Blend,
                summary: "The most powerful trend is combining models to leverage their complementary strengths. Use deep learning for feature extraction and XGBoost for robust, final decision-making. This leverages the LSTM's ability to distill complex temporal patterns and XGBoost's strength in modeling interactions between these learned features and other exogenous variables.",
                example: {
                    title: "Hybrid Crypto Price Prediction",
                    description: "A two-stage model to predict Bitcoin's 24-hour return.",
                    steps: [
                        {
                            name: "1. Feature Extraction (LSTM)",
                            detail: "An LSTM processes the last 72 hours of price, volume, and order flow data to generate a feature vector summarizing temporal dynamics."
                        },
                        {
                            name: "2. Final Prediction (XGBoost)",
                            detail: "The LSTM's output is combined with static features (on-chain data, macro indicators, sentiment scores) and fed into an XGBoost Regressor for the final, robust prediction."
                        }
                    ]
                }
            },
            {
                id: "outlook",
                title: "Strategic Outlook for 2025",
                icon: TrendingUp,
                summary: "The debate is maturing beyond 'which algorithm is best' to 'which tool is right for the job'. Leading firms will deploy a unified toolkit, selecting models based on the specific problem.",
                recommendations: [
                    {
                        title: "Where XGBoost Remains SOTA",
                        content: "For any problem framed with structured, tabular data (cross-sectional ranking, regime classification), XGBoost's balance of performance, speed, and interpretability will remain the superior choice."
                    },
                    {
                        title: "A Decision-Making Heuristic",
                        content: "Start with XGBoost if signals are in engineered features. Explore LSTMs/Transformers if signals are in raw sequences. Prioritize XGBoost if interpretability is critical. Use hybrids for heterogeneous data."
                    },
                    {
                        title: "Future-Proofing the Quant Stack",
                        content: "The future is a modular platform: Transformers for unstructured data (news), LSTMs for high-frequency series, and XGBoost as the final, robust decision-making layer that integrates all signals."
                    }
                ]
            }
        ]
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToContent = () => {
        document.getElementById('paradigm')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Helper Components
    const Section = ({ children, className = '', id }) => (
        <section id={id} className={`py-16 md:py-24 px-4 md:px-8 lg:px-16 w-full max-w-7xl mx-auto ${className}`}>
            {children}
        </section>
    );

    const SectionTitle = ({ icon: Icon, title }) => (
        <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                <Icon className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">{title}</h2>
        </div>
    );

    const Card = ({ title, content, className = '' }) => (
        <div className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${className}`}>
            <h3 className="font-semibold text-lg text-blue-600 mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{content}</p>
        </div>
    );

    return (
        <>
            {/* SEO Components */}
            {currentArticle && (
                <>
                    <StructuredData article={currentArticle} />
                    <BreadcrumbStructuredData
                        articleTitle={currentArticle.title}
                        articleSlug={currentArticle.slug}
                    />
                </>
            )}

            <div className="bg-gray-50 font-sans text-gray-800">
                {/* Fixed Header */}
                <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm' : 'bg-transparent'}`}>
                    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <Bot className="h-8 w-8 text-blue-600" />
                                <span className="text-gray-900 font-bold ml-2 text-xl">SOPHIE's Daddy Quant Blog</span>
                            </div>

                            {/* Desktop Menu */}
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {paperContent.sections.map(section => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollTo(section.id)}
                                            className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            {section.title}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {isMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
                                </button>
                            </div>
                        </div>
                    </nav>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {paperContent.sections.map(section => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollTo(section.id)}
                                        className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        {section.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </header>

                <main>
                    {/* Return to Home Button */}
                    <div className="pt-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
                        <div className="flex items-center gap-4 mb-4">
                            <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Return to Home
                            </Link>
                        </div>
                    </div>

                    {/* Deep Research Badge */}
                    <div className="absolute top-24 left-4 z-40">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                            Deep Research
                        </span>
                    </div>

                    {/* Hero Section */}
                    <div className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-gray-50">
                        {/* Background Grid */}
                        <div className="absolute inset-0 z-0 opacity-40">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:36px_36px]"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_300px,#dbeafe,transparent)]"></div>
                        </div>

                        <div className="relative z-10 px-4">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 tracking-tighter">
                                {paperContent.title}
                            </h1>
                            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
                                {paperContent.subtitle}
                            </p>
                            <p className="mt-8 text-md md:text-lg max-w-4xl mx-auto text-gray-700 bg-white/50 p-6 rounded-xl border border-gray-200 shadow-sm">
                                <strong>Executive Summary:</strong> {paperContent.executiveSummary}
                            </p>
                            <button
                                onClick={scrollToContent}
                                className="mt-12 group inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
                            >
                                Explore Analysis
                                <ChevronsDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                    {/* XGBoost Paradigm Section */}
                    <Section id="paradigm">
                        <SectionTitle icon={paperContent.sections[0].icon} title={paperContent.sections[0].title} />
                        <p className="text-lg text-gray-600 max-w-3xl mb-12">{paperContent.sections[0].summary}</p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {paperContent.sections[0].points.map((point, index) => (
                                <Card key={index} title={point.title} content={point.content} />
                            ))}
                        </div>
                    </Section>

                    {/* Core Competencies Section */}
                    <Section id="competencies" className="bg-gray-100">
                        <SectionTitle icon={paperContent.sections[1].icon} title={paperContent.sections[1].title} />
                        <p className="text-lg text-gray-600 max-w-3xl mb-12">{paperContent.sections[1].summary}</p>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {paperContent.sections[1].examples.map((example, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    <h3 className="font-bold text-xl text-blue-600 mb-3">{example.title}</h3>
                                    <p className="text-gray-600 mb-4 flex-grow">{example.description}</p>
                                    <div className="mt-auto pt-4 border-t border-gray-200">
                                        <p className="text-sm text-gray-500 font-mono">Example Scenario:</p>
                                        <p className="text-sm text-gray-700">{example.scenario}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Comparative Analysis Section */}
                    <Section id="comparison">
                        <SectionTitle icon={paperContent.sections[2].icon} title={paperContent.sections[2].title} />
                        <p className="text-lg text-gray-600 max-w-3xl mb-12">{paperContent.sections[2].summary}</p>

                        <div className="grid lg:grid-cols-3 gap-8 mb-12">
                            {paperContent.sections[2].points.map((point, index) => (
                                <Card key={index} title={point.title} content={point.content} />
                            ))}
                        </div>

                        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        {paperContent.sections[2].comparisonTable.headers.map(header => (
                                            <th key={header} className="p-4 border-b-2 border-gray-200 bg-gray-50 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {paperContent.sections[2].comparisonTable.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="border-b border-gray-200 last:border-b-0">
                                            {row.map((cell, cellIndex) => (
                                                <td key={cellIndex} className={`p-4 ${cellIndex === 0 ? 'font-semibold text-blue-700' : 'text-gray-600'}`}>
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* Hybrid Architecture Section */}
                    <Section id="hybrid" className="bg-gray-100">
                        <SectionTitle icon={paperContent.sections[3].icon} title={paperContent.sections[3].title} />
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <p className="text-lg text-gray-600 mb-8">{paperContent.sections[3].summary}</p>
                                <div className="space-y-6">
                                    {paperContent.sections[3].example.steps.map((step, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-lg text-gray-800">{step.name}</h4>
                                                <p className="text-gray-600">{step.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                                <h3 className="font-bold text-xl text-blue-600 mb-4 text-center">{paperContent.sections[3].example.title}</h3>
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="text-center p-4 bg-gray-100 rounded-lg w-full">
                                        <p className="text-sm text-gray-500">Input</p>
                                        <p className="font-semibold text-gray-800">Raw Time Series Data</p>
                                    </div>
                                    <ChevronsDown className="w-6 h-6 text-gray-400" />
                                    <div className="text-center p-4 bg-purple-100 rounded-lg w-full border border-purple-200">
                                        <p className="text-sm text-purple-600">Stage 1: LSTM</p>
                                        <p className="font-semibold text-gray-800">Temporal Feature Extraction</p>
                                    </div>
                                    <div className="flex justify-center w-full relative my-2">
                                        <span className="text-4xl text-gray-400 absolute -top-4">+</span>
                                    </div>
                                    <div className="text-center p-4 bg-gray-100 rounded-lg w-full mt-4">
                                        <p className="text-sm text-gray-500">Input</p>
                                        <p className="font-semibold text-gray-800">Static Features (On-chain, Macro)</p>
                                    </div>
                                    <ChevronsDown className="w-6 h-6 text-gray-400" />
                                    <div className="text-center p-4 bg-blue-100 rounded-lg w-full border border-blue-200">
                                        <p className="text-sm text-blue-600">Stage 2: XGBoost</p>
                                        <p className="font-semibold text-gray-800">Final Prediction</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* Strategic Outlook Section */}
                    <Section id="outlook">
                        <SectionTitle icon={paperContent.sections[4].icon} title={paperContent.sections[4].title} />
                        <p className="text-lg text-gray-600 max-w-3xl mb-12">{paperContent.sections[4].summary}</p>
                        <div className="grid md:grid-cols-3 gap-8">
                            {paperContent.sections[4].recommendations.map((rec, index) => (
                                <Card key={index} title={rec.title} content={rec.content} />
                            ))}
                        </div>
                    </Section>

                    {/* Call to Action Section */}
                    <Section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Implement XGBoost in Your Trading Strategy?</h2>
                            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                                Join thousands of quantitative analysts leveraging XGBoost for systematic trading success.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {currentArticle?.googleDoc && (
                                    <a
                                        href={currentArticle.googleDoc}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                                    >
                                        Read Full Research Paper
                                    </a>
                                )}
                                <Link
                                    href="/"
                                    className="inline-block bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300 transform hover:scale-105"
                                >
                                    Explore More Research
                                </Link>
                            </div>
                        </div>
                    </Section>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200">
                    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                        <p>&copy; 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
                        <p className="text-sm mt-2">This analysis is for educational purposes and should not be considered investment advice.</p>
                    </div>
                </footer>

                {/* Scroll to Top Button */}
                {showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 z-50"
                        aria-label="Scroll to top"
                    >
                        <ChevronsUp className="w-6 h-6" />
                    </button>
                )}
            </div>
        </>
    );
}