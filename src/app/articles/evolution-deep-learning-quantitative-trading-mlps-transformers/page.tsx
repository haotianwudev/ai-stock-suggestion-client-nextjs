'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { articles } from '@/data/articles';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';

// --- Content Components ---
const AbstractContent = () => (
  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-blue-600">
    <h2 className="text-3xl font-bold mb-4 text-gray-900">Abstract</h2>
    <p className="text-base text-gray-700 leading-relaxed">
      This report surveys the evolution of deep learning in quantitative trading, from traditional econometric models to sophisticated neural architectures. We analyze MLPs, RNNs, LSTMs, CNNs, Autoencoders, DRL, GNNs, and Transformers—examining their unique properties, trading applications, and critical limitations in high-noise, non-stationary financial markets.
    </p>
  </div>
);

const Section1Content = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-gray-900">1. From Linear Econometrics to Non-Linear Machine Learning</h2>
    
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-bold text-lg text-gray-800 mb-2">Econometric Models</h3>
        <p className="text-sm text-gray-700 mb-2">ARIMA, GARCH</p>
        <p className="text-xs text-green-600">✓ Interpretable, statistical rigor</p>
        <p className="text-xs text-red-600">✗ Linear assumptions fail</p>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-bold text-lg text-gray-800 mb-2">Classical ML</h3>
        <p className="text-sm text-gray-700 mb-2">SVM, Random Forests</p>
        <p className="text-xs text-green-600">✓ Non-linear, feature importance</p>
        <p className="text-xs text-red-600">✗ No temporal awareness</p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-300">
        <h3 className="font-bold text-lg text-blue-800 mb-2">MLPs</h3>
        <p className="text-sm text-gray-700 mb-2">Multi-Layer Perceptrons</p>
        <p className="text-xs text-green-600">✓ Universal approximator</p>
        <p className="text-xs text-red-600">✗ Treats time as "bag of features"</p>
      </div>
    </div>
    
    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
      <p className="text-sm font-semibold text-purple-800">Key Insight:</p>
      <p className="text-sm text-gray-700 mt-1">MLPs solve non-linearity but ignore sequential order—critical flaw for time-series data.</p>
    </div>
  </>
);

const Section2Content = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Modeling Time: Recurrent Architectures</h2>
    
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
        <h3 className="font-bold text-lg text-orange-800 mb-3">RNNs</h3>
        <p className="text-sm text-gray-700 mb-2"><strong>Innovation:</strong> Hidden state "memory"</p>
        <p className="text-sm text-gray-700 mb-2"><strong>Problem:</strong> Vanishing gradients</p>
        <p className="text-xs text-red-600">Memory limited to few time steps</p>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg border border-green-300">
        <h3 className="font-bold text-lg text-green-800 mb-3">LSTMs</h3>
        <p className="text-sm text-gray-700 mb-2"><strong>Innovation:</strong> Gating mechanism (input, output, forget gates)</p>
        <p className="text-sm text-gray-700 mb-2"><strong>Advantage:</strong> Long-term dependencies</p>
        <p className="text-xs text-green-600">Dominant 2010s architecture</p>
      </div>
    </div>
    
    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
      <p className="text-sm font-semibold text-red-800">LSTM Limitations in Finance:</p>
      <ul className="text-sm text-gray-700 mt-2 space-y-1">
        <li>• <strong>Non-Stationarity:</strong> Memory becomes "obsolete" during regime shifts</li>
        <li>• <strong>Overfitting:</strong> Memorizes noise in low SNR markets</li>
        <li>• <strong>Sequential Bottleneck:</strong> Cannot parallelize training</li>
      </ul>
    </div>
  </>
);

const Section3Content = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Novel Data Representations</h2>
    
    <div className="space-y-4">
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
        <h3 className="font-bold text-lg text-indigo-800 mb-2">CNNs: Market-as-Image</h3>
        <p className="text-sm text-gray-700 mb-2"><strong>Applications:</strong></p>
        <ul className="text-sm text-gray-700 space-y-1 ml-4">
          <li>1. Chart pattern recognition (candlestick images)</li>
          <li>2. "Factor pictures" (100 factors × 60 days as 2D image)</li>
        </ul>
        <p className="text-xs text-red-600 mt-2">✗ Arbitrary representation, black box</p>
      </div>
      
      <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
        <h3 className="font-bold text-lg text-teal-800 mb-2">Autoencoders: Non-Linear PCA</h3>
        <p className="text-sm text-gray-700 mb-2"><strong>Function:</strong> Encoder compresses → Latent space → Decoder reconstructs</p>
        <p className="text-sm text-gray-700"><strong>Use:</strong> Feature extraction & denoising for downstream models</p>
        <p className="text-xs text-green-600 mt-2">✓ Unsupervised learning, signal extraction</p>
      </div>
    </div>
  </>
);

const Section4Content = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-gray-900">4. The New Frontier: Systems & Agents</h2>
    
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
        <h3 className="font-bold text-lg text-yellow-800 mb-3">Deep Reinforcement Learning</h3>
        <p className="text-sm text-gray-700 mb-2"><strong>Paradigm:</strong> Market-as-Game</p>
        <p className="text-sm text-gray-700 mb-2">Agent learns policy to maximize reward (PnL/Sharpe)</p>
        <div className="mt-3 pt-3 border-t border-yellow-200">
          <p className="text-xs font-semibold text-red-700">Critical Barrier: Sim-to-Real Gap</p>
          <p className="text-xs text-gray-600">Requires perfect market simulator—unrealistic</p>
        </div>
      </div>
      
      <div className="bg-pink-50 p-4 rounded-lg border border-pink-300">
        <h3 className="font-bold text-lg text-pink-800 mb-3">Graph Neural Networks</h3>
        <p className="text-sm text-gray-700 mb-2"><strong>Paradigm:</strong> Market-as-System</p>
        <p className="text-sm text-gray-700 mb-2">Models relationships: Nodes = assets, Edges = dependencies</p>
        <div className="mt-3 pt-3 border-t border-pink-200">
          <p className="text-xs font-semibold text-green-700">Killer App: Systemic Risk</p>
          <p className="text-xs text-gray-600">Contagion modeling, relational alpha</p>
        </div>
      </div>
    </div>
  </>
);

const Section5Content = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Current Apex: Transformers</h2>
    
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-xl border border-purple-200 mb-4">
      <h3 className="font-bold text-lg text-purple-800 mb-3">Core Innovation: Self-Attention Mechanism</h3>
      <p className="text-sm text-gray-700 mb-2">Direct access to all past time steps simultaneously—learns which events matter regardless of distance</p>
      <p className="text-sm font-semibold text-green-700">✓ Parallelizable (solves LSTM bottleneck)</p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-base text-blue-800 mb-2">Application 1: Time-Series</h4>
        <p className="text-sm text-gray-700">Temporal Fusion Transformer (TFT)</p>
        <p className="text-xs text-gray-600 mt-1">State-of-the-art, interpretable attention</p>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h4 className="font-semibold text-base text-green-800 mb-2">Application 2: NLP Revolution</h4>
        <p className="text-sm text-gray-700">FinBERT for sentiment analysis</p>
        <p className="text-xs text-gray-600 mt-1">Unlocks alternative data (news, social media)</p>
      </div>
    </div>
    
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 p-3 rounded-lg">
        <p className="text-xs font-semibold text-green-800 mb-1">Advantages</p>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• Superior long-range modeling</li>
          <li>• Parallelizable training</li>
          <li>• SOTA on NLP tasks</li>
        </ul>
      </div>
      <div className="bg-red-50 p-3 rounded-lg">
        <p className="text-xs font-semibold text-red-800 mb-1">Limitations</p>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• Extreme computational cost</li>
          <li>• Black box (regulatory issues)</li>
          <li>• Overfitting risk</li>
        </ul>
      </div>
    </div>
  </>
);

const Section6Content = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Roadmap: Becoming a Deep Learning Quant</h2>
    
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-base text-blue-800 mb-2">Domain 1: Quant Finance</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Probability, Statistics, Linear Algebra</li>
          <li>• ARIMA, GARCH, Cointegration</li>
          <li>• Portfolio Theory, Risk Management</li>
        </ul>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h4 className="font-semibold text-base text-purple-800 mb-2">Domain 2: ML/CS</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Python mastery (C++ for HFT)</li>
          <li>• scikit-learn: RF, SVM, PCA</li>
          <li>• PyTorch/TensorFlow: MLPs, LSTMs</li>
        </ul>
      </div>
    </div>
    
    <div className="space-y-3">
      {[
        { num: 1, title: 'Foundations', desc: 'Math, finance theory, understand alpha & risk' },
        { num: 2, title: 'Toolkit', desc: 'Pandas, NumPy, scikit-learn, backtesting' },
        { num: 3, title: 'Core DL', desc: 'Implement MLP & LSTM, compare to ARIMA' },
        { num: 4, title: 'Specialization', desc: 'Choose: NLP (FinBERT), DRL (DQN), or GNNs' }
      ].map(phase => (
        <div key={phase.num} className="flex items-start bg-gray-50 p-3 rounded-lg">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm mr-3">
            {phase.num}
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-800">{phase.title}</p>
            <p className="text-xs text-gray-600">{phase.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </>
);

const Table1Content = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-gray-900">Model Evolution Summary</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left border">Model</th>
            <th className="p-2 text-left border">Key Feature</th>
            <th className="p-2 text-left border">Advantage</th>
            <th className="p-2 text-left border">Limitation</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">ARIMA/GARCH</td>
            <td className="p-2 border">Linear models</td>
            <td className="p-2 border text-green-700">Interpretable</td>
            <td className="p-2 border text-red-700">No non-linearity</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">SVM/RF</td>
            <td className="p-2 border">Non-linear ML</td>
            <td className="p-2 border text-green-700">Feature importance</td>
            <td className="p-2 border text-red-700">No temporal awareness</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">MLP</td>
            <td className="p-2 border">Universal approximator</td>
            <td className="p-2 border text-green-700">Models any function</td>
            <td className="p-2 border text-red-700">Ignores sequence order</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">RNN</td>
            <td className="p-2 border">Hidden state memory</td>
            <td className="p-2 border text-green-700">Sequential processing</td>
            <td className="p-2 border text-red-700">Vanishing gradients</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">LSTM</td>
            <td className="p-2 border">Gating mechanism</td>
            <td className="p-2 border text-green-700">Long-term memory</td>
            <td className="p-2 border text-red-700">Sequential bottleneck</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">CNN</td>
            <td className="p-2 border">Spatial patterns</td>
            <td className="p-2 border text-green-700">Factor interactions</td>
            <td className="p-2 border text-red-700">Arbitrary representation</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">Autoencoder</td>
            <td className="p-2 border">Latent compression</td>
            <td className="p-2 border text-green-700">Unsupervised denoising</td>
            <td className="p-2 border text-red-700">Intermediate step only</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">DRL</td>
            <td className="p-2 border">Policy learning</td>
            <td className="p-2 border text-green-700">Action-oriented</td>
            <td className="p-2 border text-red-700">Sim-to-real gap</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">GNN</td>
            <td className="p-2 border">Graph relationships</td>
            <td className="p-2 border text-green-700">Systemic modeling</td>
            <td className="p-2 border text-red-700">Graph construction</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">Transformer</td>
            <td className="p-2 border">Self-attention</td>
            <td className="p-2 border text-green-700">Parallelizable, NLP</td>
            <td className="p-2 border text-red-700">Computational cost</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
);

const Table2Content = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-gray-900">DL Frameworks Comparison</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left border">Framework</th>
            <th className="p-2 text-left border">Philosophy</th>
            <th className="p-2 text-left border">Ease of Use</th>
            <th className="p-2 text-left border">Production</th>
            <th className="p-2 text-left border">Finance Adoption</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">TensorFlow</td>
            <td className="p-2 border">Production-first</td>
            <td className="p-2 border">Steeper curve</td>
            <td className="p-2 border text-green-700">Excellent (TFX)</td>
            <td className="p-2 border">Widespread</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">PyTorch</td>
            <td className="p-2 border">Research-first</td>
            <td className="p-2 border text-green-700">Intuitive</td>
            <td className="p-2 border">Good (TorchServe)</td>
            <td className="p-2 border">Very high</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">JAX</td>
            <td className="p-2 border">High-performance</td>
            <td className="p-2 border">High curve</td>
            <td className="p-2 border">Emerging</td>
            <td className="p-2 border">Niche (HPC)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
);

// --- Main Component ---
export default function DeepLearningQuantTradingArticle() {
  const currentArticle = articles.find(
    (article) => article.slug === 'evolution-deep-learning-quantitative-trading-mlps-transformers'
  );

  return (
    <>
      {/* SEO Components */}
      {currentArticle && (
        <>
          <StructuredData article={currentArticle} />
          <BreadcrumbStructuredData articleTitle={currentArticle.title} articleSlug={currentArticle.slug} />
        </>
      )}

      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 font-sans">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

          {/* Article Container */}
          <article className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Deep Research Badge */}
            {currentArticle?.deepResearch && (
              <div className="absolute top-8 left-8 z-10">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-purple-600 text-white shadow-lg">
                  Deep Research
                </span>
              </div>
            )}

            {/* Hero Infographic */}
            <section className="relative">
              <div className="w-full">
                <img 
                  src="https://i.imgur.com/8ZF0tTX.jpeg" 
                  alt="Evolution of Deep Learning in Quantitative Trading Infographic" 
                  className="w-full h-auto"
                />
              </div>
            </section>

            {/* Article Content */}
            <div className="p-6 lg:p-10 space-y-8">
              <section id="abstract">
                <AbstractContent />
              </section>

              <section id="section-1">
                <Section1Content />
              </section>

              <section id="section-2">
                <Section2Content />
              </section>

              <section id="section-3">
                <Section3Content />
              </section>

              <section id="section-4">
                <Section4Content />
              </section>

              <section id="section-5">
                <Section5Content />
              </section>

              <section id="section-6">
                <Section6Content />
              </section>

              <section id="table-1">
                <Table1Content />
              </section>

              <section id="table-2">
                <Table2Content />
              </section>
            </div>
          </article>

          {/* Call to Action - Google Doc Link */}
          {currentArticle?.googleDoc && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl my-8 text-center shadow-lg">
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
        </main>
      </div>
    </>
  );
}
