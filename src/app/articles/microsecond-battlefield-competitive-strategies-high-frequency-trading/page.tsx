'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Cpu, BrainCircuit, Bot, BarChart2, Shield, Search, TrendingUp, Network, Server, HardDrive, Atom, Users, Landmark, Building, Award, Rocket, Telescope, Database, Scaling, Music } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

export default function HFTPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const currentArticle = articles.find(article => article.slug === 'microsecond-battlefield-competitive-strategies-high-frequency-trading');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const sections = ['introduction', 'strategies', 'technology', 'players', 'regulation', 'conclusion'];
    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const strategies = [
    {
      icon: <BarChart2 size={32} className="text-blue-500" />,
      title: "Market Making",
      description: "The foundational HFT strategy. Firms act as quasi-exchanges by simultaneously placing buy (bid) and sell (ask) orders, profiting from the tiny difference (the spread) and liquidity rebates offered by exchanges. This provides crucial market liquidity but carries significant risk.",
      details: "Market makers must manage 'inventory risk' (holding a position that moves against them) and defend against 'adverse selection' (trading with more informed participants). Success depends on superior micro-price prediction and exceptionally low latency to update quotes faster than competitors.",
      ml: "Reinforcement Learning for optimal quote placement and inventory management; Time-Series Forecasting (e.g., LSTMs) for predicting micro-price movements.",
      color: "blue"
    },
    {
      icon: <Zap size={32} className="text-purple-500" />,
      title: "Arbitrage Strategies",
      description: "Exploiting transient price discrepancies for the same asset or statistically related assets across different venues or time. This is a pure speed and data-processing game, as any price differences are corrected within microseconds.",
      details: "Includes Latency Arbitrage (e.g., buying a stock on NYSE and instantly selling it for slightly more on BATS), Statistical Arbitrage (exploiting historical price relationships between correlated assets), and Event Arbitrage (using NLP to trade on news headlines fractions of a second before human interpretation).",
      ml: "Natural Language Processing (NLP) for news-driven strategies; Graph Neural Networks (GNNs) to model complex inter-asset relationships; Pattern recognition to identify arbitrage opportunities.",
      color: "purple"
    },
    {
      icon: <Search size={32} className="text-green-500" />,
      title: "Liquidity Detection",
      description: "A form of market intelligence designed to identify and trade ahead of large, hidden institutional orders (known as 'iceberg orders'). These algorithms are often called 'predatory' as they seek to profit from the market impact of the large order.",
      details: "Algorithms probe the market with small orders ('pings') to uncover the true size of hidden orders. By detecting the parent order, the HFT firm can position itself to benefit from the price movement. It's a high-stakes cat-and-mouse game between large institutions and HFTs.",
      ml: "Unsupervised Learning (Clustering, Anomaly Detection) to find unusual order book patterns; Sequence Modeling (LSTMs) on order book data to predict hidden liquidity.",
      color: "green"
    },
    {
      icon: <TrendingUp size={32} className="text-amber-500" />,
      title: "Directional Strategies",
      description: "The most 'traditional' form of trading, executed at light speed. These strategies make very short-term (sub-second) predictions on the direction of price movements and place aggressive bets. This category includes momentum ignition and reversal strategies.",
      details: "These models incorporate a vast array of signals, from order book imbalances to alternative data sources (like satellite imagery or credit card data). The holding period is extremely short, aiming to capture fleeting alpha signals before they decay. This is where the most advanced predictive modeling is often deployed.",
      ml: "Deep Learning (CNNs on order book snapshots, LSTMs for time-series data); Gradient Boosting Machines (XGBoost, LightGBM) on large, structured feature sets.",
      color: "amber"
    }
  ];

  const technologies = [
    {
      icon: <Network className="w-10 h-10 mx-auto text-red-500" />,
      title: "Latency Infrastructure",
      description: "The physical arms race. This involves co-locating servers within the same data center as the exchange, utilizing microwave and laser networks for faster long-distance communication than fiber optics, and kernel bypass technologies to stream network data directly to the application."
    },
    {
      icon: <Cpu className="w-10 h-10 mx-auto text-blue-500" />,
      title: "Hardware Acceleration",
      description: "Moving logic from software to silicon for deterministic, nanosecond-level performance. Field-Programmable Gate Arrays (FPGAs) are used to run pre-trade risk checks, data filtering, and even simple trading logic in hardware, offering unparalleled speed and predictability."
    },
    {
      icon: <Database className="w-10 h-10 mx-auto text-green-500" />,
      title: "Data Engineering",
      description: "The intellectual arms race's foundation. Building robust data platforms to ingest, normalize, and store petabytes of market data. This unified data layer is critical for historical model research (backtesting) and powering live, real-time inference engines."
    }
  ];

  const players = [
    { name: "Virtu Financial", focus: "Scale-Driven Market Making", strength: "Unmatched operational efficiency, technology integration from acquisitions (KCG), and a massive share of retail and institutional order flow.", icon: <Scaling className="w-6 h-6 text-blue-500" /> },
    { name: "Citadel Securities", focus: "Analytics-Driven MM & Options", strength: "Dominant in US equities and options. Leverages superior predictive models, a vast technology platform, and a significant portion of US retail order flow.", icon: <Award className="w-6 h-6 text-green-500" /> },
    { name: "Jump Trading", focus: "Latency & ML Arbitrage", strength: "Pioneers in ultra-low latency technology and sophisticated quantitative research. Have heavily invested in microwave networks and more recently, in the crypto space with Jump Crypto.", icon: <Rocket className="w-6 h-6 text-red-500" /> },
    { name: "Hudson River Trading", focus: "Scientific Quant Trading", strength: "A 'code-first' firm built by computer scientists and mathematicians. They apply a rigorous, scientific approach to analyzing massive datasets to find statistical patterns.", icon: <BrainCircuit className="w-6 h-6 text-fuchsia-500" /> },
    { name: "Tower Research", focus: "Low-Latency Engineering", strength: "Known for its world-class, custom-built technology platforms and a strong focus on low-latency systems engineering, including extensive use of FPGAs.", icon: <Server className="w-6 h-6 text-yellow-500" /> },
    { name: "XTX Markets", focus: "Probabilistic Market Making", strength: "A newer titan that uses advanced statistical and machine learning models to forecast prices, holding minimal toxic inventory. Operates with a smaller headcount and a massive GPU-powered compute grid.", icon: <Bot className="w-6 h-6 text-sky-500" /> },
    { name: "Jane Street", focus: "Quantitative ETF & Bond MM", strength: "A leader in ETF arbitrage and fixed income. Renowned for its unique collaborative culture, deep quantitative research, and use of the OCaml functional programming language.", icon: <Atom className="w-6 h-6 text-indigo-500" /> },
    { name: "Two Sigma", focus: "AI & Alternative Data", strength: "A technology-centric hedge fund that applies AI/ML on vast alternative datasets. They operate with a supercomputing-level infrastructure and crowdsource ideas via their Kaggle platform.", icon: <Telescope className="w-6 h-6 text-teal-500" /> }
  ];

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

      <div className="bg-white text-gray-800 font-sans antialiased min-h-screen">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_800px_at_50%_200px,#dbeafe,transparent)] -z-10"></div>
        
        <div className="relative">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <BrainCircuit className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800 tracking-wider">HFT Insights</h1>
              </div>
              <nav className="hidden sm:flex items-center space-x-6 text-gray-600 font-medium">
                <a href="#strategies" className="hover:text-blue-600 transition-colors">Strategies</a>
                <a href="#technology" className="hover:text-blue-600 transition-colors">Technology</a>
                <a href="#players" className="hover:text-blue-600 transition-colors">Players</a>
                <a href="#regulation" className="hover:text-blue-600 transition-colors">Regulation</a>
              </nav>
            </div>
          </header>

          <main className="container mx-auto px-6">
            {/* Return to Home Button */}
            <div className="flex items-center gap-4 mb-4 pt-6">
              <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </div>

            {/* Badges */}
            <div className="relative mb-8">
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Deep Research
                </span>
              </div>
              {currentArticle?.podcastUrl && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Podcast
                  </span>
                </div>
              )}
            </div>

            {/* Hero Section */}
            <section className="py-20 sm:py-32 text-center">
              <div className="relative">
                <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 tracking-tighter mb-6">
                  The Microsecond Battlefield
                </h1>
                <p className="max-w-4xl mx-auto text-xl text-gray-700">
                  An in-depth analysis of the competitive strategies, machine learning applications, and technological arms race defining High-Frequency Trading.
                </p>
              </div>
            </section>

            {/* Introduction */}
            <section id="introduction" className="py-16 scroll-mt-20">
              <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">The Dual Arms Race</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>
                    High-Frequency Trading is a hyper-competitive domain defined by a relentless battle on two fronts. The first is a <strong className="font-semibold text-blue-600">physical race</strong> against the laws of physics to minimize latency. Shaving off a single <strong className="font-semibold text-blue-600">nanosecond</strong> can be the difference between profit and loss.
                  </p>
                  <p>
                    The second is an <strong className="font-semibold text-blue-600">intellectual arms race</strong> in algorithmic sophistication. This involves leveraging cutting-edge machine learning and petabytes of data to build superior predictive models. The titans of HFT are those who have mastered the integration of both, creating a symbiotic relationship where <strong className="font-semibold text-blue-600">silicon speed</strong> amplifies <strong className="font-semibold text-blue-600">algorithmic intelligence</strong>.
                  </p>
                  {currentArticle?.googleDoc && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-800 font-medium mb-2">📄 Deep Research Available</p>
                      <p className="text-blue-700 text-sm mb-3">
                        This analysis is based on comprehensive research into HFT strategies, technology infrastructure, and competitive dynamics.
                      </p>
                      <a 
                        href={currentArticle.googleDoc}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                      >
                        <BrainCircuit className="w-4 h-4 mr-1" />
                        Access Full Research Document &rarr;
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Strategies Section */}
            <section id="strategies" className="py-16 bg-gray-50/70 scroll-mt-20">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-2">Core Competitive Strategies</h2>
              <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
                HFT firms compete through four primary strategic pillars, each leveraging a unique combination of speed, intelligence, and risk management.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {strategies.map((strategy) => (
                  <div key={strategy.title} className={`bg-white p-6 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-${strategy.color}-500`}>
                    <div className="flex items-center space-x-4 mb-4">
                      {strategy.icon}
                      <h3 className="text-xl font-bold text-gray-900">{strategy.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 text-base leading-relaxed">{strategy.description}</p>
                    <div className="text-gray-600 mb-4 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
                      {strategy.details}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-xs tracking-wider uppercase mb-2">ML & Tooling</h4>
                      <p className="text-sm text-gray-700 font-mono">{strategy.ml}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Technology Section */}
            <section id="technology" className="py-24 scroll-mt-20">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-2">The Technological Arms Race</h2>
              <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
                Success in HFT requires a holistic, "full-stack" approach to technology, engineered for minimizing latency and maximizing computational power.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {technologies.map((tech) => (
                  <div key={tech.title} className="p-8 bg-white rounded-xl border border-gray-200 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
                    {tech.icon}
                    <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">{tech.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{tech.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Players Section */}
            <section id="players" className="py-16 bg-gray-50/70 scroll-mt-20">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-2">Titans of High-Frequency Trading</h2>
              <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
                The HFT landscape is dominated by a select group of highly secretive, technologically advanced firms that function as full-stack quantitative powerhouses.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {players.map((player) => (
                  <div key={player.name} className="p-5 bg-white rounded-lg border border-gray-200 flex flex-col justify-start hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      {player.icon}
                      <h3 className="text-lg font-bold text-gray-900 ml-3">{player.name}</h3>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-semibold text-gray-800">Focus:</span> {player.focus}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-800">Edge:</span> {player.strength}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Regulation Section */}
            <section id="regulation" className="py-24 scroll-mt-20">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-2">Regulation, Ethics, and Market Impact</h2>
              <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
                HFT operates in a complex regulatory environment and sparks intense debate about market fairness, stability, and the role of speed.
              </p>
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center text-blue-600 mb-3">
                    <Landmark className="w-6 h-6 mr-2"/>
                    <h3 className="text-lg font-semibold">Regulatory Landscape</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Key regulations like <strong className="font-semibold text-blue-600">Regulation NMS</strong> in the U.S. were intended to create a unified national market but inadvertently created fertile ground for latency arbitrage. Regulators continuously play catch-up, introducing rules on risk controls and surveillance to prevent manipulation like <strong className="font-semibold text-blue-600">'spoofing'</strong>.
                  </p>
                </div>
                <div className="p-6 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center text-red-600 mb-3">
                    <Shield className="w-6 h-6 mr-2"/>
                    <h3 className="text-lg font-semibold">The Great Debate</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    <strong className="font-semibold">Proponents argue</strong> HFT provides essential liquidity and <strong className="font-semibold">tightens bid-ask spreads.</strong><br/><br/>
                    <strong className="font-semibold">Critics argue</strong> it creates <strong className="font-semibold text-red-600">"phantom liquidity,"</strong> increases <strong className="font-semibold text-red-600">systemic risk</strong> (e.g., the 2010 Flash Crash), and creates an unfair <strong className="font-semibold text-red-600">two-tiered market.</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion Section */}
            <section id="conclusion" className="py-20 bg-gray-50/70 scroll-mt-20">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-2">The Future of Algorithmic Supremacy</h2>
                <p className="text-gray-700 leading-relaxed mt-6">
                  The trajectory of HFT is one of increasing complexity. The competitive frontier is shifting from pure latency to <strong className="font-semibold text-blue-600">predictive accuracy</strong>. The firms that thrive will be those that have built a culture and a platform capable of <strong className="font-semibold text-blue-600">learning and adapting</strong> at the speed of the market itself, all while navigating an increasingly watchful regulatory landscape.
                </p>
              </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Dive Deeper into HFT</h3>
                <p className="text-gray-600 mb-8">
                  Access our comprehensive research and listen to our detailed podcast discussion on the strategies and technologies shaping high-frequency trading.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {currentArticle?.googleDoc && (
                    <a 
                      href={currentArticle.googleDoc}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                    >
                      <BrainCircuit className="inline mr-2" />
                      Read Full Research
                    </a>
                  )}
                  {currentArticle?.podcastUrl && (
                    <a 
                      href={currentArticle.podcastUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                    >
                      <Music className="inline mr-2" />
                      Listen to Podcast
                    </a>
                  )}
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="border-t border-gray-200 bg-white">
            <div className="container mx-auto px-6 py-8 text-center text-gray-500">
              <p>© 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.</p>
              <p className="text-sm mt-2">A conceptual analysis based on public research into High-Frequency Trading strategies and technology.</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}