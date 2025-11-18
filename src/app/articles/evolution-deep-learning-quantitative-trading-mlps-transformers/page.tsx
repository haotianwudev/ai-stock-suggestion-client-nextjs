'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookText, Scale, Clock, Layers, Rocket, Brain, Map, Table, Database, Menu, X, FileText } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Navigation Components ---
const SidebarItem = ({ icon: Icon, text, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full p-3 rounded-lg text-left transition-all duration-200 ${
      active
        ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 font-semibold'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
    <span className="text-md">{text}</span>
  </button>
);

const Sidebar = ({ activeSection, setActiveSection, setSidebarOpen }: any) => {
  const navItems = [
    { id: 'abstract', text: 'Abstract', icon: BookText },
    { id: 'sec1', text: '1. Foundations', icon: Scale },
    { id: 'sec2', text: '2. Arrow of Time', icon: Clock },
    { id: 'sec3', text: '3. Novel Representations', icon: Layers },
    { id: 'sec4', text: '4. New Frontier', icon: Rocket },
    { id: 'sec5', text: '5. Current Apex', icon: Brain },
    { id: 'sec6', text: '6. Practical Roadmap', icon: Map },
    { id: 'table1', text: 'Table 1: Model Evolution', icon: Table },
    { id: 'table2', text: 'Table 2: DL Frameworks', icon: Database },
  ];

  const handleItemClick = (id: string) => {
    setActiveSection(id);
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white p-4 shadow-lg">
      <div className="flex items-center justify-between h-16 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Quant DL</span>
        </h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1 text-gray-500 rounded-full hover:bg-gray-100"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-1 mt-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            text={item.text}
            active={activeSection === item.id}
            onClick={() => handleItemClick(item.id)}
          />
        ))}
      </nav>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Deep Learning in Quant Trading
          <br />
          React/Tailwind Interface
        </p>
      </div>
    </div>
  );
};

// --- Content Components ---
const AbstractContent = () => (
  <>
    <h2 className="text-3xl font-bold mb-6 text-gray-900">Abstract</h2>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      This report provides a comprehensive technical survey of the evolution of deep learning (DL) in quantitative trading. It charts the chronological progression from traditional econometric models to classical machine learning and subsequently to the adoption of sophisticated deep neural network architectures. We analyze the specific catalysts for each paradigm shift, focusing on the increasing capacity of models to capture non-linearity, model temporal dependencies, and process unstructured alternative data.
    </p>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      For each major architecture—including Multi-Layer Perceptrons (MLPs), Recurrent Neural Networks (RNNs), Long Short-Term Memory (LSTM) networks, Convolutional Neural Networks (CNNs), Autoencoders (AEs), Deep Reinforcement Learning (DRL) agents, Graph Neural Networks (GNNs), and Transformers—we conduct an in-depth analysis of its unique properties, primary applications in trading (e.g., signal generation, portfolio optimization, risk management), and a critical evaluation of its advantages and, most importantly, its limitations within the high-noise, non-stationary environment of financial markets. The report concludes with a structured learning roadmap for aspiring quantitative researchers.
    </p>
  </>
);

const Section1Content = () => (
  <>
    <h2 className="text-3xl font-bold mb-6 text-gray-900">1. The Foundational Paradigm: From Linear Econometrics to Non-Linear Machine Learning</h2>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      The evolution of quantitative trading is a direct response to the increasing complexity and dimensionality of financial data. The journey from simple linear models to deep neural networks was not a linear replacement but rather a necessary expansion of the quant toolkit, driven by the persistent failure of simpler models to capture the market's true dynamics.
    </p>

    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">1.1 The Baseline: Traditional Econometric Models and Their Limitations</h3>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      For decades, the quantitative toolkit was dominated by statistically rigorous econometric models. The two most prominent were ARIMA and GARCH. These models remain valuable due to their strong statistical foundation and high degree of interpretability. However, their core limitation is their assumption of linearity... They are fundamentally incapable of capturing the complex, high-order, non-linear interactions between hundreds of disparate factors that drive market returns.
    </p>

    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">1.2 The First "Black Box": Early Machine Learning (Support Vector Machines & Random Forests)</h3>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      The 2000s saw a growing adoption of classical machine learning (ML) models... Models like Support Vector Machines (SVMs) and Random Forests (RFs) became popular because they offered superior performance on the tabular, small-to-medium-sized datasets of the era.
    </p>
    <ul className="list-disc list-inside text-lg text-gray-700 mb-4 pl-4 space-y-2">
      <li>
        <strong>Support Vector Machines (SVMs):</strong> Unique trait is finding a maximal-margin hyperplane. Power came from the "kernel trick" to project data into higher-dimensional space.
      </li>
      <li>
        <strong>Random Forests (RFs):</strong> An ensemble model that builds a multitude of decision trees. Uses "bagging" and "feature randomness" to be highly resistant to overfitting and produce feature importance rankings.
      </li>
    </ul>

    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">1.3 The First Deep Learning Model: Multi-Layer Perceptrons (MLPs)</h3>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      The Multi-Layer Perceptron (MLP) is the foundational deep learning architecture. Its introduction was the first complete answer to the non-linearity problem.
    </p>
    <blockquote className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg my-4">
      <p className="text-lg font-medium text-purple-800">Unique Trait & Limitation:</p>
      <p className="text-lg text-gray-700 mt-2">
        An MLP is a <strong>universal function approximator</strong>, meaning it can model any complex, non-linear relationship. However, its <strong>critical flaw</strong> in finance is its lack of temporal awareness; it treats time series as a static "bag" of features, ignoring sequential order.
      </p>
    </blockquote>
  </>
);

const Section2Content = () => (
  <>
    <h2 className="text-3xl font-bold mb-6 text-gray-900">2. Modeling the Arrow of Time: Recurrent Architectures for Sequential Data</h2>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      The primary failure of MLPs in finance was their inability to understand time. Recurrent architectures were developed specifically to solve this problem, introducing the concept of a stateful "memory" that processes sequential data.
    </p>

    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">2.1 The Introduction of Memory: Recurrent Neural Networks (RNNs)</h3>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      The unique trait of an RNN is its "memory," a hidden state looped back into the network. However, this introduced the crippling <strong>vanishing gradient problem</strong>, limiting its effective memory to only a few time steps.
    </p>

    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">2.2 The Gated Solution: Long Short-Term Memory (LSTM) Networks</h3>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      The LSTM was the dominant time-series architecture of the 2010s, designed specifically to solve the vanishing gradient problem.
    </p>
    <blockquote className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg my-4">
      <p className="text-lg font-medium text-purple-800">Unique Trait: The Gating Mechanism</p>
      <p className="text-lg text-gray-700 mt-2">
        An LSTM cell contains internal "gates" (input, output, forget) that are themselves small neural networks. These gates <em>learn</em> when to allow new information in, when to output information, and, most critically, when to <em>forget</em> old, irrelevant information.
      </p>
    </blockquote>

    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">2.3 Pro/Con Analysis: LSTMs in Practice (The "Obsolete Memory" Problem)</h3>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      LSTMs represented a massive leap, but their application in finance revealed deep, structural limitations.
    </p>
    <div className="grid md:grid-cols-2 gap-4 my-4">
      <div className="border border-green-300 bg-green-50 p-4 rounded-lg">
        <h4 className="font-semibold text-lg text-green-800 mb-2">Pros</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Solves vanishing gradients</li>
          <li>Captures long-range dependencies</li>
          <li>Superior performance on non-linear temporal data</li>
        </ul>
      </div>
      <div className="border border-red-300 bg-red-50 p-4 rounded-lg">
        <h4 className="font-semibold text-lg text-red-800 mb-2">Limitations (Critical Flaws)</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            <strong>Non-Stationarity:</strong> Financial "rules" change (regime shifts). An LSTM's powerful memory becomes a weakness, as it remembers "obsolete" patterns.
          </li>
          <li>
            <strong>Overfitting Noise:</strong> Prone to memorizing spurious patterns in low signal-to-noise data.
          </li>
          <li>
            <strong>Sequential Bottleneck:</strong> Cannot be parallelized, making it very slow to train on massive datasets.
          </li>
        </ul>
      </div>
    </div>
  </>
);

const Section3Content = () => (
  <>
    <h2 className="text-3xl font-bold mb-6 text-gray-900">3. Beyond Time-Series: Novel Representations of Market Data</h2>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      This branch of research was founded on a different premise: instead of treating financial data as a 1D sequence, it could be re-represented in a more advantageous format, such as a 2D image or a compressed latent vector.
    </p>

    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">3.1 Market-as-Image: Convolutional Neural Networks (CNNs)</h3>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      CNNs apply convolutional filters to detect hierarchical, spatially-invariant patterns. In finance, this was applied in two ways:
    </p>
    <ul className="list-decimal list-inside text-lg text-gray-700 mb-4 pl-4 space-y-2">
      <li>
        <strong>Technical Analysis:</strong> Feeding 2D images of candlestick charts to a CNN to classify chart patterns.
      </li>
      <li>
        <strong>Factor Engineering ("Factor Pictures"):</strong> Arranging a $100 × 60$ dataset (100 factors over 60 days) into a 2D "image". The CNN then finds complex, non-linear interactions between factors that are "spatially" near each other in the image.
      </li>
    </ul>
    <blockquote className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg my-4">
      <p className="text-lg font-medium text-red-800">Limitations:</p>
      <p className="text-lg text-gray-700 mt-2">
        The "factor picture" representation is <strong>arbitrary</strong> (the order of factors changes the image). CNNs are also notoriously <strong>"black box"</strong> models, making them hard to interpret or trust.
      </p>
    </blockquote>

    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">3.2 Unsupervised Feature Engineering: Autoencoders (AEs)</h3>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      An Autoencoder is an unsupervised network with an Encoder (compresses data to a latent space) and a Decoder (reconstructs the original data).
    </p>
    <blockquote className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg my-4">
      <p className="text-lg font-medium text-purple-800">Unique Trait & Application:</p>
      <p className="text-lg text-gray-700 mt-2">
        An AE acts as a <strong>non-linear PCA</strong>. Its primary use is <strong>feature extraction and denoising</strong>. The encoder learns a compressed representation that retains the "signal" while discarding "noise". This clean, information-rich latent vector is then fed as input to a separate supervised model (like an LSTM) to improve prediction.
      </p>
    </blockquote>
  </>
);

const Section4Content = () => (
  <>
    <h2 className="text-3xl font-bold mb-6 text-gray-900">4. The New Frontier: Systemic Modeling and Autonomous Agents</h2>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      The most recent evolution represents a profound paradigm shift, moving away from pure prediction ("what will the price be?") and toward system modeling ("how does the market work?") and autonomous action ("what is the best action to take?").
    </p>

    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">4.1 The Market-as-Game: Deep Reinforcement Learning (DRL)</h3>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      DRL frames trading as a sequential decision-making problem. An <strong>agent</strong> (algorithm) interacts with an <strong>environment</strong> (market) by taking <strong>actions</strong> (buy/sell) to learn a <strong>policy</strong> (strategy) that maximizes a cumulative <strong>reward</strong> (PnL or Sharpe Ratio).
    </p>
    <blockquote className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg my-4">
      <p className="text-lg font-medium text-red-800">Critical Limitation: The "Sim-to-Real Gap"</p>
      <p className="text-lg text-gray-700 mt-2">
        This is the single greatest barrier. DRL requires millions of interactions, which must be done in a <strong>simulation</strong>. If this market simulator is not a high-fidelity replica of the real world (i.e., fails to model transaction costs, slippage, and the agent's <em>own market impact</em>), the learned policy will fail catastrophically in the live market.
      </p>
    </blockquote>

    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">4.2 The Market-as-System: Graph Neural Networks (GNNs)</h3>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      Traditional models treat assets as independent. GNNs are designed to model systems of relationships and interdependencies.
    </p>
    <blockquote className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg my-4">
      <p className="text-lg font-medium text-purple-800">Unique Trait & Application:</p>
      <p className="text-lg text-gray-700 mt-2">
        GNNs apply deep learning to <strong>graph structures</strong> (Nodes = assets, Edges = relationships). The "killer app" is <strong>systemic risk and contagion</strong>, modeling how a shock at one node (a bank) propagates through the network. It can also find "relational alpha" (e.g., a spike in a supplier's volatility predicts a spike in a manufacturer's volatility).
      </p>
    </blockquote>
  </>
);

const Section5Content = () => (
  <>
    <h2 className="text-3xl font-bold mb-6 text-gray-900">5. The Current Apex: Transformers and the NLP-driven Revolution</h2>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      The Transformer was created to solve the two primary limitations of LSTMs: their imperfect long-range memory and, most importantly, their sequential bottleneck.
    </p>

    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">5.1 The Core Innovation: The Attention Mechanism</h3>
    <blockquote className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg my-4">
      <p className="text-lg font-medium text-purple-800">Unique Trait: Self-Attention</p>
      <p className="text-lg text-gray-700 mt-2">
        An attention mechanism gives the model <strong>direct access to all past time steps simultaneously</strong>, learning to "pay attention" only to the most relevant past events, regardless of distance.
      </p>
      <p className="text-lg text-gray-700 mt-2">
        Crucially, this calculation is <strong>parallelizable</strong>, solving the sequential bottleneck of LSTMs and allowing Transformers to be trained on massive datasets.
      </p>
    </blockquote>

    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">5.2 Application 1: Transformers on Numerical Time-Series</h3>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      This is the evolutionary application of Transformers as a "better LSTM". This has led to specialized models like the <strong>Temporal Fusion Transformer (TFT)</strong>, which is state-of-the-art, can handle mixed data types, and is highly interpretable via its built-in attention mechanisms.
    </p>

    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">5.3 Application 2: Transformers on Unstructured Data (The NLP Revolution)</h3>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      This is arguably the most significant impact. For the first time, quants can systematically extract signals from "alternative data" (news, reports, social media).
    </p>
    <ul className="list-disc list-inside text-lg text-gray-700 mb-4 pl-4 space-y-2">
      <li>
        <strong>Transfer Learning:</strong> A massive model (like BERT) is pre-trained on a general corpus.
      </li>
      <li>
        <strong>Fine-Tuning:</strong> A quant firm fine-tunes this model on a specific financial corpus to create <strong>FinBERT</strong>.
      </li>
      <li>
        <strong>Application (Sentiment Analysis):</strong> FinBERT can read a news headline and accurately classify its sentiment (Positive, Negative, Neutral) with a nuanced understanding of financial context. This sentiment score becomes a powerful new alpha signal.
      </li>
    </ul>

    <div className="grid md:grid-cols-2 gap-4 my-4">
      <div className="border border-green-300 bg-green-50 p-4 rounded-lg">
        <h4 className="font-semibold text-lg text-green-800 mb-2">Pros</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Superior long-range dependency modeling</li>
          <li>Parallelizable (solves LSTM bottleneck)</li>
          <li>SOTA on NLP, unlocking alternative data</li>
        </ul>
      </div>
      <div className="border border-red-300 bg-red-50 p-4 rounded-lg">
        <h4 className="font-semibold text-lg text-red-800 mb-2">Cons</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            <strong>"Black Box" Problem:</strong> Extremely complex and opaque, creating trust and regulatory issues.
          </li>
          <li>
            <strong>Computational Cost:</strong> Massive, data-hungry, and expensive to train and run.
          </li>
          <li>
            <strong>Overfitting:</strong> Enormous complexity makes them highly susceptible to overfitting noise.
          </li>
        </ul>
      </div>
    </div>
  </>
);

const Section6Content = () => (
  <>
    <h2 className="text-3xl font-bold mb-6 text-gray-900">6. A Practical Roadmap: How to Become a Deep Learning Quant</h2>
    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
      Acquiring the skills to become a quantitative researcher in deep learning is a formidable task. It requires mastering two distinct, difficult domains: quantitative finance and computational machine learning.
    </p>

    <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">6.1 Foundational Knowledge: The "Two-Domain" Prerequisite</h3>
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h4 className="text-xl font-semibold text-gray-700 mb-2">Domain 1: Quantitative Finance & Econometrics</h4>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-1">
          <li>Mathematics (Probability, Statistics, Linear Algebra)</li>
          <li>Econometrics (ARIMA, GARCH, Cointegration)</li>
          <li>Finance Theory (Portfolio Optimization, Risk Management)</li>
        </ul>
      </div>
      <div>
        <h4 className="text-xl font-semibold text-gray-700 mb-2">Domain 2: Computer Science & Machine Learning</h4>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-1">
          <li>Programming (Mastery of Python; C++ for HFT)</li>
          <li>Classical ML (scikit-learn: RF, SVM, PCA)</li>
          <li>Deep Learning (MLPs, LSTMs, Transformers)</li>
        </ul>
      </div>
    </div>

    <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">6.4 A Structured Self-Study Plan</h3>
    <div className="space-y-6">
      <div className="flex items-start">
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl">
          1
        </div>
        <div className="ml-4">
          <h4 className="text-xl font-semibold text-gray-800">Phase 1: The Foundations (Math & Finance)</h4>
          <p className="text-lg text-gray-700 mt-1">
            Master probability, statistics, and linear algebra. Read foundational texts on quantitative trading and financial econometrics. Understand "alpha" and risk.
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl">
          2
        </div>
        <div className="ml-4">
          <h4 className="text-xl font-semibold text-gray-800">Phase 2: The Toolkit (Python & Classic ML)</h4>
          <p className="text-lg text-gray-700 mt-1">
            Master the core "Quant Stack": Pandas, NumPy, and scikit-learn. Learn to backtest and avoid overfitting.
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl">
          3
        </div>
        <div className="ml-4">
          <h4 className="text-xl font-semibold text-gray-800">Phase 3: Core Deep Learning (Time-Series)</h4>
          <p className="text-lg text-gray-700 mt-1">
            Choose PyTorch or TensorFlow. Implement an MLP and an LSTM. Compare them to a simple ARIMA model.
          </p>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl">
          4
        </div>
        <div className="ml-4">
          <h4 className="text-xl font-semibold text-gray-800">Phase 4: Advanced Architectures (Specialization)</h4>
          <p className="text-lg text-gray-700 mt-1">
            Pick one specialization: NLP/Alternative Data (BERT/FinBERT), DRL/Agency (DQN), or GNNs/Systemic Risk (PyTorch Geometric).
          </p>
        </div>
      </div>
    </div>
  </>
);

const Table1Content = () => (
  <>
    <h2 className="text-3xl font-bold mb-6 text-gray-900">Table 1: The Evolution of Quantitative Trading Models</h2>
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full min-w-max text-left text-lg">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="p-4 font-semibold text-gray-700">Model/Era</th>
            <th className="p-4 font-semibold text-gray-700">Core Principle</th>
            <th className="p-4 font-semibold text-gray-700">Application</th>
            <th className="p-4 font-semibold text-gray-700">Key Advantage (Unique Feature)</th>
            <th className="p-4 font-semibold text-gray-700">Core Limitation</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr className="hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-800">Econometric (ARIMA, GARCH)</td>
            <td className="p-4 text-gray-700">Linear mean-reversion & conditional volatility</td>
            <td className="p-4 text-gray-700">Volatility forecasting, simple time-series</td>
            <td className="p-4 text-gray-700">High interpretability, strong statistical foundation</td>
            <td className="p-4 text-gray-700">Fails to capture non-linearity; brittle in regime shifts</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-800">Classical ML (SVM, RF)</td>
            <td className="p-4 text-gray-700">Non-linear classification & ensemble learning</td>
            <td className="p-4 text-gray-700">Tabular factor-based classification</td>
            <td className="p-4 text-gray-700">(RF) Feature importance; (SVM) Works on high-dim, small data</td>
            <td className="p-4 text-gray-700">Computationally slow (SVM); poor temporal awareness</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-800">MLP</td>
            <td className="p-4 text-gray-700">Non-linear function approximation</td>
            <td className="p-4 text-gray-700">Factor-based return forecasting</td>
            <td className="p-4 text-gray-700">Universal approximator: can model any non-linear relationship</td>
            <td className="p-4 text-gray-700">
              <span className="font-bold text-red-600">No temporal awareness</span>; treats sequences as a "bag" of features
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-800">RNN</td>
            <td className="p-4 text-gray-700">Sequential processing with a hidden state</td>
            <td className="p-4 text-gray-700">Basic sequential data tasks</td>
            <td className="p-4 text-gray-700">First architecture with "memory" for sequential data</td>
            <td className="p-4 text-gray-700">
              <span className="font-bold text-red-600">Vanishing gradient problem</span>; memory is only short-term
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-800">LSTM</td>
            <td className="p-4 text-gray-700">Gated sequential memory</td>
            <td className="p-4 text-gray-700">Time-series forecasting, signal generation</td>
            <td className="p-4 text-gray-700">
              <span className="font-bold text-green-600">Gating mechanism</span> solves vanishing gradients; "long-term memory"
            </td>
            <td className="p-4 text-gray-700">
              <span className="font-bold text-red-600">Sequential bottleneck</span> (not parallelizable); memory "obsolete" in{' '}
              <span className="font-bold text-red-600">non-stationary</span> regimes
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-800">CNN</td>
            <td className="p-4 text-gray-700">Hierarchical, spatially-invariant pattern detection</td>
            <td className="p-4 text-gray-700">Chart pattern automation; "Factor picture" analysis</td>
            <td className="p-4 text-gray-700">Can find complex interactions between factors in a 2D representation</td>
            <td className="p-4 text-gray-700">Representation is arbitrary; highly uninterpretable "black box"</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-800">Autoencoder</td>
            <td className="p-4 text-gray-700">Unsupervised dimensionality reduction</td>
            <td className="p-4 text-gray-700">Non-linear feature extraction, denoising</td>
            <td className="p-4 text-gray-700">
              <span className="font-bold text-green-600">Unsupervised</span>; learns a compressed, non-linear latent space
            </td>
            <td className="p-4 text-gray-700">Latent space is difficult to interpret; an intermediate step</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-800">DRL</td>
            <td className="p-4 text-gray-700">Policy optimization via environmental reward</td>
            <td className="p-4 text-gray-700">Portfolio management, optimal execution</td>
            <td className="p-4 text-gray-700">
              <span className="font-bold text-green-600">Paradigm shift from prediction to action</span>; end-to-end decision-making
            </td>
            <td className="p-4 text-gray-700">
              <span className="font-bold text-red-600">"Sim-to-Real Gap"</span>; needs a perfect simulator, which is unrealistic
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-800">GNN</td>
            <td className="p-4 text-gray-700">Relational modeling on graph structures</td>
            <td className="p-4 text-gray-700">Systemic risk analysis, relational alpha</td>
            <td className="p-4 text-gray-700">The <em>only</em> model that captures inter-asset dependencies and network effects</td>
            <td className="p-4 text-gray-700">
              <span className="font-bold text-red-600">Graph construction</span> is a subjective, difficult feature-engineering task
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-800">Transformer</td>
            <td className="p-4 text-gray-700">Parallel processing via self-attention</td>
            <td className="p-4 text-gray-700">NLP/Sentiment analysis, advanced time-series</td>
            <td className="p-4 text-gray-700">
              <span className="font-bold text-green-600">Solves sequential bottleneck</span> (parallelizable); unlocks unstructured data
            </td>
            <td className="p-4 text-gray-700">High computational cost; "black box" nature creates trust/regulatory issues</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
);

const Table2Content = () => (
  <>
    <h2 className="text-3xl font-bold mb-6 text-gray-900">Table 2: Deep Learning Frameworks for Quantitative Finance</h2>
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full min-w-max text-left text-lg">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="p-4 font-semibold text-gray-700">Framework</th>
            <th className="p-4 font-semibold text-gray-700">Primary Philosophy</th>
            <th className="p-4 font-semibold text-gray-700">Ease of Use / Iteration</th>
            <th className="p-4 font-semibold text-gray-700">Production Deployment</th>
            <th className="p-4 font-semibold text-gray-700">Finance Industry Adoption</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr className="hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-800">TensorFlow</td>
            <td className="p-4 text-gray-700">"Production-First, Graph-Based." Designed for robust, scalable deployment.</td>
            <td className="p-4 text-gray-700">Steeper learning curve, though Keras API simplifies it.</td>
            <td className="p-4 text-gray-700">Excellent. TensorFlow Serving (TFX) is a mature, high-performance ecosystem.</td>
            <td className="p-4 text-gray-700">Widespread, popular in many large institutions.</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-800">PyTorch</td>
            <td className="p-4 text-gray-700">"Research-First, Dynamic Graph." Designed to be intuitive, flexible, and "Pythonic".</td>
            <td className="p-4 text-gray-700">Highly intuitive, fast iteration. Feels like native Python.</td>
            <td className="p-4 text-gray-700">Good and rapidly improving (e.g., TorchServe), but historically lagged TensorFlow.</td>
            <td className="p-4 text-gray-700">Extremely high, especially in research. Publicly supported by firms like Jane Street.</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-4 font-medium text-gray-800">JAX</td>
            <td className="p-4 text-gray-700">"High-Performance, Functional." A newer library from Google for high-performance ML research.</td>
            <td className="p-4 text-gray-700">High learning curve. Based on functional programming principles.</td>
            <td className="p-4 text-gray-700">Emerging, less mature than TF/PyTorch.</td>
            <td className="p-4 text-gray-700">Niche, but gaining traction in high-performance computing (HPC) quant funds.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
);

// --- Main Component ---
export default function DeepLearningQuantTradingArticle() {
  const [activeSection, setActiveSection] = useState('abstract');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentArticle = articles.find(
    (article) => article.slug === 'evolution-deep-learning-quantitative-trading-mlps-transformers'
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'abstract':
        return <AbstractContent />;
      case 'sec1':
        return <Section1Content />;
      case 'sec2':
        return <Section2Content />;
      case 'sec3':
        return <Section3Content />;
      case 'sec4':
        return <Section4Content />;
      case 'sec5':
        return <Section5Content />;
      case 'sec6':
        return <Section6Content />;
      case 'table1':
        return <Table1Content />;
      case 'table2':
        return <Table2Content />;
      default:
        return <AbstractContent />;
    }
  };

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}

      <div className="flex h-screen w-full bg-gray-50 font-sans">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-72 z-30 transform transition-transform duration-300 lg:hidden ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0 w-72 h-full">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <header className="lg:hidden bg-white shadow-md p-4 flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="p-1 text-gray-600 rounded-md hover:bg-gray-100">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold ml-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Quant DL</span>
            </h1>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
              {/* Return to Home Button */}
              <div className="flex items-center gap-4 mb-6">
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 transition-colors duration-200 text-white font-medium"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Home
                </Link>
              </div>

              {/* Deep Research Badge */}
              {currentArticle?.deepResearch && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-purple-600 text-white shadow-lg">
                    Deep Research
                  </span>
                </div>
              )}

              {/* Main Content Card */}
              <div className="relative bg-white p-6 lg:p-10 rounded-2xl shadow-xl border border-gray-100">
                {renderContent()}
              </div>

              {/* Call to Action - Google Doc Link */}
              {currentArticle?.googleDoc && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl my-8 text-center">
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

              {/* Footer */}
              <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
                <p className="text-sm">
                  © 2025 SOPHIE's Daddy Quant Blog. Educational content for informational purposes only.
                </p>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
