'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Search, Layers, FileText, Beaker, ArrowUpDown, TrendingUp, BarChart3, Brain, Award, Users, Calendar, ExternalLink } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// Data extracted from the Google Doc and web summary
const foundationalPapers = [
  {
    title: "Value and Momentum Everywhere",
    year: 2013,
    authors: "Asness, Moskowitz, Pedersen",
    concept: "Value & Momentum",
    thesis: "Value and momentum premia are pervasive across global markets and asset classes, are negatively correlated, and share a common global factor structure.",
    impact: "Established the theoretical foundation for multi-asset factor investing"
  },
  {
    title: "Betting Against Beta",
    year: 2014,
    authors: "Frazzini, Pedersen",
    concept: "Defensive / Low-Beta",
    thesis: "Leverage constraints cause investors to bid up high-beta assets, creating an anomaly where a portfolio long low-beta assets and short high-beta assets generates significant alpha.",
    impact: "Revolutionized understanding of risk-return relationships in equity markets"
  },
  {
    title: "Quality Minus Junk",
    year: 2019,
    authors: "Asness, Frazzini, Pedersen",
    concept: "Quality",
    thesis: "High-quality (safe, profitable, growing) stocks are not fully priced, allowing a 'Quality-Minus-Junk' factor to earn high risk-adjusted returns and act as a diversifier.",
    impact: "Formalized quality as a systematic investment factor with measurable alpha"
  }
];

const keyDebates = [
  {
    title: "The Siren Song of Factor Timing",
    year: 2016,
    authors: "Asness",
    concept: "Factor Timing Skepticism",
    thesis: "Actively timing factor exposures based on valuation is a 'siren song'—tempting but historically weak and difficult to execute successfully. Discipline and diversification are superior.",
    impact: "Challenged the industry's obsession with tactical factor allocation"
  },
  {
    title: "Fact, Fiction, and Factor Investing",
    year: 2023,
    authors: "Aghassi, Asness, Fattouche, Moskowitz",
    concept: "Multi-Factor Investing Defense",
    thesis: "Systematically debunks common myths about factor investing (e.g., crowding, data mining) and reaffirms the long-term, evidence-based case for a diversified, disciplined approach.",
    impact: "Provided definitive response to factor investing critics and skeptics"
  }
];

const researchCategories = [
  {
    category: "Factor Investing",
    count: 28,
    description: "Core research on value, momentum, quality, and defensive factors",
    icon: <TrendingUp className="h-6 w-6" />
  },
  {
    category: "Machine Learning",
    count: 12,
    description: "Applications of AI and ML in quantitative finance",
    icon: <Brain className="h-6 w-6" />
  },
  {
    category: "Tax-Aware Strategies",
    count: 15,
    description: "Optimizing after-tax returns through systematic approaches",
    icon: <BarChart3 className="h-6 w-6" />
  },
  {
    category: "Journal Articles",
    count: 28,
    description: "Peer-reviewed academic publications",
    icon: <BookOpen className="h-6 w-6" />
  },
  {
    category: "White Papers",
    count: 14,
    description: "Practical insights and market analysis",
    icon: <FileText className="h-6 w-6" />
  },
  {
    category: "Working Papers",
    count: 16,
    description: "Cutting-edge research in development",
    icon: <Beaker className="h-6 w-6" />
  }
];

// Complete list of all AQR papers from the research library
const allPapers = [
  // Journal Articles
  { title: "Rebuffed: An Empirical Review of Buffer Funds", authors: "Asness, C., Cao, J., Ilmanen, A., Villalon, D.", date: "2025-08-11", type: "Journal Article", topic: "Portfolio Risk, Buffer Funds, Options-Based Strategies" },
  { title: "A Brief Guide to Pricing and Taxation of Variable Prepaid Forwards", authors: "Liberman, J., Sosner, N.", date: "2024-11-06", type: "Journal Article", topic: "Tax Aware, Variable Prepaid Forwards (VPF), Hedging" },
  { title: "CIO Perspectives: An Interview with Cliff Asness", authors: "Asness, C.", date: "2024-09-01", type: "Journal Article", topic: "Alternative Investing, Investment Philosophy, Machine Learning" },
  { title: "Business News and Business Cycles", authors: "Bybee, L., Kelly, B. T., Manela, A., Xiu, D.", date: "2024-08-09", type: "Journal Article", topic: "Machine Learning, Textual Analysis, Macroeconomics" },
  { title: "Loss Harvesting or Gain Deferral? A Surprising Source of Tax Benefits...", authors: "Krasner, S., Sosner, N.", date: "2024-07-15", type: "Journal Article", topic: "Tax Aware, Long-Short Strategies, Tax Loss Harvesting" },
  { title: "Levering Up to Do Good: Direct Long-Short Investing and Charitable Giving", authors: "Krasner, S., Liberman, J., Sosner, N., Filler, S.", date: "2024-04-23", type: "Journal Article", topic: "Tax Aware, Charitable Giving, Long-Short Strategies" },
  { title: "Combining VPFs and Tax-Aware Strategies to Diversify Low-Basis Stock", authors: "Liberman, J., Sosner, N.", date: "2024-03-07", type: "Journal Article", topic: "Tax Aware, VPF, Concentrated Stock, Diversification" },
  { title: "The Virtue of Complexity in Return Prediction", authors: "Kelly, B. T., Malamud, S., Zhou, K.", date: "2024-03-01", type: "Journal Article", topic: "Machine Learning, Return Prediction, Complexity" },
  { title: "Fact, Fiction, and Factor Investing", authors: "Aghassi, M., Asness, C., Fattouche, C., Moskowitz, T. J.", date: "2023-01-15", type: "Journal Article", topic: "Factor Investing, Multi-Factor, Value, Momentum" },
  { title: "Beyond Direct Indexing: Dynamic Direct Long-Short Investing", authors: "Liberman, J., Krasner, S., Sosner, N., Freitas, P.", date: "2023-05-03", type: "Journal Article", topic: "Tax Aware, Direct Indexing, Long-Short Strategies" },
  { title: "Quality minus junk", authors: "Asness, C. S., Frazzini, A., Pedersen, L. H.", date: "2019-03-01", type: "Journal Article", topic: "Quality, Value, Profitability, Safety, Growth" },
  { title: "Size matters, if you control your junk", authors: "Asness, C. S., Frazzini, A., Israel, R., Moskowitz, T. J., Pedersen, L. H.", date: "2018-06-01", type: "Journal Article", topic: "Size Premium, Quality, Junk" },
  { title: "The Siren Song of Factor Timing, aka Smart Beta Timing, aka Style Timing", authors: "Asness, C. S., Hazelkorn, T. M., Richardson, S. A.", date: "2016-06-01", type: "Journal Article", topic: "Factor Timing, Smart Beta, Style Timing" },
  { title: "Fact, Fiction and Momentum Investing", authors: "Asness, C., Frazzini, A., Israel, R., Moskowitz, T. J.", date: "2014-09-23", type: "Journal Article", topic: "Momentum, Factor Investing" },
  { title: "Understanding Style Premia", authors: "Israel, R., Maloney, T.", date: "2014-12-08", type: "Journal Article", topic: "Style Premia, Factor Investing" },
  { title: "Betting Against Beta", authors: "Frazzini, A., Pedersen, L. H.", date: "2014-01-01", type: "Journal Article", topic: "Low-Beta, Defensive, Leverage Constraints" },
  { title: "Value and Momentum Everywhere", authors: "Asness, C. S., Moskowitz, T. J., Pedersen, L. H.", date: "2013-06-01", type: "Journal Article", topic: "Value, Momentum, Global Factors, Negative Correlation" },
  { title: "The Devil in HML's Details", authors: "Asness, C., Frazzini, A.", date: "2013-09-01", type: "Journal Article", topic: "Value, HML, Factor Construction" },
  { title: "The Role of Shorting, Firm Size and Time on Market Anomalies", authors: "Israel, R., Moskowitz, T. J.", date: "2013-05-01", type: "Journal Article", topic: "Shorting, Size, Anomalies" },
  { title: "Time Series Momentum", authors: "Moskowitz, T. J., Ooi, Y. H., Pedersen, L. H.", date: "2012-05-01", type: "Journal Article", topic: "Time Series Momentum, Trend Following" },
  { title: "Leverage Aversion and Risk Parity", authors: "Asness, C. S., Frazzini, A., Pedersen, L. H.", date: "2012-01-01", type: "Journal Article", topic: "Leverage, Risk Parity, Defensive" },
  { title: "Momentum in Japan: The Exception that Proves the Rule", authors: "Asness, C.", date: "2011-10-01", type: "Journal Article", topic: "Momentum, Japan" },
  { title: "Carry", authors: "Koijen, R. S. J., Moskowitz, T. J., Pedersen, L. H., Vrugt, E. B.", date: "2013-11-07", type: "Journal Article", topic: "Carry, Style Premia, Global Macro" },
  { title: "The Disposition Effect and the Under-Reaction to News", authors: "Frazzini, A.", date: "2006-06-01", type: "Journal Article", topic: "Behavioral Finance, Disposition Effect, Momentum" },
  { title: "Style Timing: Value vs. Growth", authors: "Asness, C., Friedman, J. A., Krail, R. J., Liew, J. M.", date: "2000-01-01", type: "Journal Article", topic: "Style Timing, Value, Growth" },
  { title: "Do Industries Explain Momentum?", authors: "Moskowitz, T. J., Grinblatt, M.", date: "1999-08-01", type: "Journal Article", topic: "Momentum, Industry Effects" },
  { title: "Parallels Between the Cross-Sectional Predictability of Stock and Country Returns", authors: "Asness, C., Liew, J. M., Stevens, R. L.", date: "1997-06-01", type: "Journal Article", topic: "Value, Momentum, Country Selection" },
  { title: "The Interaction of Value and Momentum Strategies", authors: "Asness, C.", date: "1997-03-01", type: "Journal Article", topic: "Value, Momentum, Factor Interaction" },

  // White Papers
  { title: "Diversifiers Forever", authors: "Maloney, T., Stone, J.", date: "2025-07-31", type: "White Paper", topic: "Asset Allocation, Diversification, Long-Term Investing" },
  { title: "Equity Market Focus: Objective Expected Returns", authors: "Ilmanen, A., Maloney, T.", date: "2025-07-31", type: "White Paper", topic: "Equity Markets, Expected Returns, CAPE, Valuation" },
  { title: "Equity Market Focus: Interrogating the Historical Data", authors: "Ilmanen, A.", date: "2025-07-10", type: "White Paper", topic: "Equity Markets, Expected Returns, Historical Data" },
  { title: "How Did We Get Here? A Brief History of Expected Returns Formation", authors: "Ilmanen, A., Maloney, T.", date: "2025-06-20", type: "White Paper", topic: "Expected Returns, Investor Behavior, History of Finance" },
  { title: "Why Are Bond Investors Contrarian While Equity Investors Extrapolate?", authors: "Ilmanen, A.", date: "2025-05-27", type: "White Paper", topic: "Investor Behavior, Behavioral Finance, Bond Markets, Equity Markets" },
  { title: "Exceptional Expectations: U.S. vs. Non-U.S. Equities", authors: "Ilmanen, A., Maloney, T.", date: "2025-05-09", type: "White Paper", topic: "Global Equities, U.S. Equities, Mean Reversion, Diversification" },
  { title: "Go Small or Go Home", authors: "Doheny, C., Fattouche, C., Zhao, P.", date: "2025-05-06", type: "White Paper", topic: "Small Caps, International Equities, Emerging Markets" },
  { title: "How Do Investors Form Long-Run Return Expectations?", authors: "Ilmanen, A.", date: "2025-04-28", type: "White Paper", topic: "Expected Returns, Investor Behavior, Behavioral Finance" },
  { title: "Portable Alpha: Why Now?", authors: "Hecht, P., Cao, J.", date: "2025-02-20", type: "White Paper", topic: "Asset Allocation, Portable Alpha, Active Management" },
  { title: "A New Paradigm in Active Equity", authors: "Brixton, A., Fattouche, C., Maloney, T.", date: "2025-02-05", type: "White Paper", topic: "Active Equity, Systematic Investing, Market Concentration" },
  { title: "Is Alpha Just Beta Waiting to Be Discovered?", authors: "Berger, A., Crowell, B., Israel, R., Kabiller, D. G.", date: "2012-01-01", type: "White Paper", topic: "Alpha, Beta, Style Premia" },
  { title: "Understanding Risk Parity", authors: "Hurst, B. K., Johnson, B., Ooi, Y. H.", date: "2010-01-01", type: "White Paper", topic: "Risk Parity, Defensive Equity" },
  { title: "Explanations for the Momentum Premium", authors: "Moskowitz, T. J.", date: "2010-01-01", type: "White Paper", topic: "Momentum, Behavioral Finance" },
  { title: "The Case for Momentum Investing", authors: "Berger, A., Israel, R., Moskowitz, T. J.", date: "2009-01-01", type: "White Paper", topic: "Momentum, Factor Investing" },

  // Working Papers
  { title: "Understanding The Virtue of Complexity", authors: "Kelly, B. T., Malamud, S.", date: "2025-07-10", type: "Working Paper", topic: "Machine Learning, Complexity, Regularization" },
  { title: "Are Completion Portfolios Effective for Managing Concentrated Stock Risk?", authors: "Krasner, S., Liberman, J., Sosner, N., Stevens, M.", date: "2025-05-14", type: "Working Paper", topic: "Concentrated Stock, Risk Management, Tax Aware" },
  { title: "A Brief Guide to the Mathematics and Taxation of Charitable Remainder Unitrusts", authors: "Sosner, N., Chen, C., Steblea-Lora, R.", date: "2025-03-18", type: "Working Paper", topic: "Tax Aware, Charitable Giving, CRUTs" },
  { title: "Combining Charitable Remainder Unitrusts and Tax-Aware Strategies...", authors: "Liberman, J., Sosner, N., Maron, J.", date: "2025-03-18", type: "Working Paper", topic: "Tax Aware, Charitable Giving, CRUTs, Diversification" },
  { title: "In Search of the True Greenium", authors: "Eskildsen, M., Ibert, M., Jensen, T. I., Pedersen, L. H.", date: "2024-03-01", type: "Working Paper", topic: "ESG, Greenium, Sustainable Investing" },
  { title: "How Global is Predictability?", authors: "Hellum, O., Pedersen, L. H., Rønn-Nielsen, A.", date: "2023-11-03", type: "Working Paper", topic: "Machine Learning, Asset Pricing, Global Factors, Transfer Learning" },
  { title: "Corporate Bond Factors: Replication Failures and a New Framework", authors: "Dick-Nielsen, J., Feldhütter, P., Pedersen, L. H., Stolborg, C.", date: "2023-10-05", type: "Working Paper", topic: "Fixed Income, Corporate Bonds, Factor Investing, Replication Crisis" },
  { title: "Financial Machine Learning", authors: "Kelly, B. T., Xiu, D.", date: "2023-08-01", type: "Working Paper", topic: "Machine Learning, Financial Markets, Survey" },
  { title: "Carbon Pricing versus Green Finance", authors: "Pedersen, L. H.", date: "2023-03-14", type: "Working Paper", topic: "ESG, Carbon Pricing, Green Finance" },
  { title: "Is Capital Structure Irrelevant with ESG Investors?", authors: "Pedersen, L. H., Feldhütter, P.", date: "2022-09-23", type: "Working Paper", topic: "ESG, Corporate Finance, Capital Structure" },
  { title: "Trading Costs of Asset Pricing Anomalies", authors: "Frazzini, A., Israel, R., Moskowitz, T. J.", date: "2012-01-01", type: "Working Paper", topic: "Trading Costs, Anomalies, Market Frictions" },
  { title: "How Tax Efficient Are Equity Styles?", authors: "Israel, R., Moskowitz, T. J.", date: "2012-01-01", type: "Working Paper", topic: "Tax Aware, Style Investing" },
  { title: "Buffett's Alpha", authors: "Frazzini, A., Kabiller, D., Pedersen, L. H.", date: "2012-01-01", type: "Working Paper", topic: "Quality, Value, Low-Risk, Warren Buffett" },
  { title: "Quality Investment", authors: "Asness, C., Frazzini, A., Pedersen, L. H.", date: "2012-01-01", type: "Working Paper", topic: "Quality, Defensive Equity" },
  { title: "Embedded Leverage", authors: "Frazzini, A., Pedersen, L. H.", date: "2011-01-01", type: "Working Paper", topic: "Leverage, Defensive Equity" },
  { title: "Predicting Stock Returns Using Industry-Relative Firm Characteristics", authors: "Asness, C., Porter, R. B., Stevens, R. L.", date: "2000-01-01", type: "Working Paper", topic: "Return Prediction, Value, Momentum" }
];

const ResearchCard = ({ title, year, authors, concept, thesis, impact }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-cyan-200 transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex justify-between items-start mb-3">
      <span className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-cyan-200">
        {concept}
      </span>
      <span className="text-slate-500 text-sm font-mono">{year}</span>
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 mb-3 font-mono">{authors}</p>
    <p className="text-slate-600 text-base leading-relaxed mb-3">{thesis}</p>
    <div className="border-t border-slate-100 pt-3">
      <p className="text-sm text-slate-500 italic">Impact: {impact}</p>
    </div>
  </div>
);

const CategoryCard = ({ category, count, description, icon }) => (
  <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center mb-4">
      <div className="p-2 bg-cyan-100 rounded-lg mr-3">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900">{category}</h3>
        <p className="text-sm text-slate-500">{count} papers</p>
      </div>
    </div>
    <p className="text-slate-600">{description}</p>
  </div>
);

export default function AQRResearchArchitecture() {
  const currentArticle = articles.find(article => article.slug === 'architecture-quantitative-insight-aqr-research-legacy');
  const [activeTab, setActiveTab] = useState('foundational');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });

  const sortedAndFilteredPapers = useMemo(() => {
    let papers = [...allPapers]
      .filter(paper => filterType === 'All' || paper.type === filterType)
      .filter(paper =>
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.topic.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (sortConfig.key) {
      papers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return papers;
  }, [searchTerm, filterType, sortConfig]);

  const paperTypes = ['All', 'Journal Article', 'White Paper', 'Working Paper'];

  const getIconForType = (type) => {
    switch (type) {
      case 'Journal Article': return <BookOpen className="h-5 w-5 text-cyan-600" />;
      case 'White Paper': return <FileText className="h-5 w-5 text-indigo-500" />;
      case 'Working Paper': return <Beaker className="h-5 w-5 text-amber-500" />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const SortableHeader = ({ children, sortKey }) => {
    const isCurrentKey = sortConfig.key === sortKey;
    const direction = isCurrentKey ? sortConfig.direction : 'none';

    const handleClick = () => {
      let newDirection = 'descending';
      if (isCurrentKey && sortConfig.direction === 'descending') {
        newDirection = 'ascending';
      }
      setSortConfig({ key: sortKey, direction: newDirection });
    };

    return (
      <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-slate-900 cursor-pointer" onClick={handleClick}>
        <div className="group inline-flex items-center">
          {children}
          <span className={`ml-2 flex-none rounded ${direction !== 'none' ? 'bg-slate-200 text-slate-900' : 'text-slate-400 invisible group-hover:visible'}`}>
            <ArrowUpDown className="h-4 w-4" />
          </span>
        </div>
      </th>
    );
  };

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

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pt-8 px-4 max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>

        {/* Badges */}
        <div className="relative max-w-4xl mx-auto px-4 mb-8">
          <div className="absolute top-0 left-4">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Deep Research
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            {/* Title with AQR Logo */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/cf/AQR_Capital_Management_Logo.png"
                  alt="AQR Capital Management Logo"
                  className="h-20 md:h-24 w-auto max-w-xs"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                The Architecture of <span className="text-cyan-600">Quantitative Insight</span>
              </h1>
            </div>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              An interactive exploration of AQR Capital Management&apos;s foundational research that shaped modern quantitative investing
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>25+ Years of Research</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>100+ Publications</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Leading Academics</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center mb-12 border-b border-slate-200">
            {[
              { id: 'foundational', label: 'Foundational Work', icon: <Award className="h-4 w-4" /> },
              { id: 'debates', label: 'Key Debates', icon: <Users className="h-4 w-4" /> },
              { id: 'categories', label: 'Research Areas', icon: <Layers className="h-4 w-4" /> },
              { id: 'evolution', label: 'Research Evolution', icon: <TrendingUp className="h-4 w-4" /> },
              { id: 'insights', label: 'Key Insights', icon: <Brain className="h-4 w-4" /> },
              { id: 'library', label: 'Complete Library', icon: <Search className="h-4 w-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${activeTab === tab.id
                    ? 'text-cyan-600 border-b-2 border-cyan-600'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Sections */}
          {activeTab === 'foundational' && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Foundational Research</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  The cornerstones of AQR&apos;s research that established the core factors in quantitative investing and transformed academic theory into institutional practice.
                </p>
              </div>
              <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {foundationalPapers.map(paper => (
                  <ResearchCard key={paper.title} {...paper} />
                ))}
              </div>
            </section>
          )}

          {activeTab === 'debates' && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Key Debates in Factor Investing</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  AQR&apos;s perspective on the practical and philosophical challenges of implementing factor strategies in institutional portfolios.
                </p>
              </div>
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {keyDebates.map(paper => (
                  <ResearchCard key={paper.title} {...paper} />
                ))}
              </div>
            </section>
          )}

          {activeTab === 'categories' && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Research Categories</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  AQR&apos;s research spans multiple domains, from traditional factor investing to cutting-edge machine learning applications.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {researchCategories.map(category => (
                  <CategoryCard key={category.category} {...category} />
                ))}
              </div>
            </section>
          )}

          {activeTab === 'evolution' && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Evolution of Quantitative Research</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Trace the development of AQR&apos;s research from early factor studies to modern machine learning applications over 25+ years.
                </p>
              </div>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full"></div>
                <div className="space-y-12">
                  {[
                    { year: "1997-2000", title: "Early Factor Research", description: "Foundational work on value-momentum interaction and style timing", color: "bg-blue-500" },
                    { year: "2012-2014", title: "Factor Universality", description: "Breakthrough research on global factor premia and defensive strategies", color: "bg-cyan-500" },
                    { year: "2016-2019", title: "Implementation Focus", description: "Practical insights on factor timing skepticism and quality investing", color: "bg-indigo-500" },
                    { year: "2023-2025", title: "Modern Applications", description: "Machine learning, tax optimization, and structured product innovation", color: "bg-purple-500" }
                  ].map((era, index) => (
                    <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className="flex-1"></div>
                      <div className={`w-4 h-4 ${era.color} rounded-full border-4 border-white shadow-lg z-10 relative`}></div>
                      <div className="flex-1 px-8">
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                          <div className="flex items-center mb-2">
                            <span className={`${era.color} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
                              {era.year}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-2">{era.title}</h3>
                          <p className="text-slate-600">{era.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === 'insights' && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Key Insights from AQR&apos;s Research</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  The fundamental principles and discoveries that emerged from AQR&apos;s systematic approach to quantitative investing.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-cyan-100 rounded-lg mr-3">
                      <TrendingUp className="h-6 w-6 text-cyan-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Factor Universality</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    AQR&apos;s research demonstrates that value and momentum factors work across asset classes, geographies, and time periods. 
                    This universality suggests these are fundamental risk premia rather than statistical artifacts.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                      <BarChart3 className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Implementation Matters</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    The gap between academic factor returns and real-world implementation is significant. Transaction costs, 
                    capacity constraints, and behavioral biases all impact the practical application of factor strategies.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg mr-3">
                      <Layers className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Diversification Benefits</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Combining negatively correlated factors like value and momentum creates more robust portfolios. 
                    The diversification benefit extends beyond simple risk reduction to improved risk-adjusted returns.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-amber-100 rounded-lg mr-3">
                      <Brain className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Behavioral Foundations</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Many factor premia have behavioral explanations rooted in investor psychology. Understanding these 
                    behavioral drivers helps explain factor persistence and provides confidence in their continued existence.
                  </p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'library' && (
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Complete Research Library</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  A comprehensive, searchable catalog of AQR&apos;s journal articles, white papers, and working papers spanning 25+ years of quantitative research.
                  Sorted by date to show the latest breakthroughs first.
                </p>
              </div>

              {/* Recent Highlights */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Highlights</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allPapers.slice(0, 6).map((paper, index) => (
                    <div key={index} className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full">
                          {paper.type}
                        </span>
                        <span className="text-xs text-slate-500">{formatDate(paper.date)}</span>
                      </div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2">{paper.title}</h4>
                      <p className="text-xs text-slate-600 mb-2">{paper.authors}</p>
                      <div className="flex flex-wrap gap-1">
                        {paper.topic.split(', ').slice(0, 2).map(topic => (
                          <span key={topic} className="bg-slate-100 text-slate-700 text-xs px-1.5 py-0.5 rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-lg">
                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search by title, author, or topic..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg py-2 pl-10 pr-4 text-slate-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                    />
                  </div>
                  <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                    {paperTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition ${filterType === type
                            ? 'bg-cyan-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-slate-500 mb-4 px-1">
                  Displaying {sortedAndFilteredPapers.length} of {allPapers.length} papers.
                </p>

                {/* Papers Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                      <tr>
                        <SortableHeader sortKey="title">Title</SortableHeader>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-slate-900 hidden lg:table-cell">Authors</th>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-slate-900 hidden md:table-cell">Topics</th>
                        <SortableHeader sortKey="date">Date</SortableHeader>
                        <SortableHeader sortKey="type">Type</SortableHeader>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sortedAndFilteredPapers.length > 0 ? (
                        sortedAndFilteredPapers.map((paper, index) => (
                          <tr key={index} className="hover:bg-slate-50 transition-colors">
                            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:w-auto sm:max-w-none sm:pl-3">
                              {paper.title}
                              <dl className="font-normal lg:hidden mt-1">
                                <dt className="sr-only">Authors</dt>
                                <dd className="truncate text-slate-600">{paper.authors}</dd>
                              </dl>
                              <dl className="font-normal md:hidden mt-1">
                                <dt className="sr-only">Topics</dt>
                                <dd className="truncate text-slate-600 text-xs">{paper.topic}</dd>
                              </dl>
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-slate-500 lg:table-cell">{paper.authors}</td>
                            <td className="hidden px-3 py-4 text-sm text-slate-500 md:table-cell">
                              <div className="flex flex-wrap gap-1">
                                {paper.topic.split(', ').map(t => (
                                  <span key={t} className="bg-slate-100 text-slate-700 text-xs font-medium px-2 py-0.5 rounded-full">{t}</span>
                                ))}
                              </div>
                            </td>
                            <td className="px-3 py-4 text-sm text-slate-500 whitespace-nowrap">{formatDate(paper.date)}</td>
                            <td className="px-3 py-4 text-sm text-slate-600">
                              <div className="flex items-center gap-2 font-medium">
                                {getIconForType(paper.type)}
                                <span className="hidden xl:inline">{paper.type}</span>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-12 text-slate-500">
                            <p className="font-semibold">No papers found</p>
                            <p className="mt-1">Try adjusting your search or filter.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}



          {/* Interactive Research Library Teaser */}
          <section className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 mb-16">
            <div className="text-center">
              <Layers className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Explore the Complete Research Library
              </h2>
              <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                Access the full interactive catalog of AQR&apos;s research with advanced search, filtering, and sorting capabilities. 
                Discover over 100 papers spanning journal articles, white papers, and working papers.
              </p>
              <a 
                href={currentArticle?.googleDoc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <ExternalLink className="h-4 w-4" />
                View Interactive Research Library
              </a>
            </div>
          </section>

          {/* Educational Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Educational Content</h3>
                <div className="mt-2 text-sm text-amber-700">
                  <p>This analysis is for educational purposes only and should not be considered investment advice. Past performance does not guarantee future results. Factor investing involves risks including potential losses.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-slate-300">
              © 2025 SOPHIE&apos;s Daddy Quant Blog. Educational content for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}