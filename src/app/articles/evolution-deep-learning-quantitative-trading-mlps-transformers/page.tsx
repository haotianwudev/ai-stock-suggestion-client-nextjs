'use client';

import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Content Components ---
const AbstractContent = () => (
  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-[#A8672E] dark:border-[#D08F52]">
    <h2 className="text-3xl font-bold mb-4 text-gray-900 font-serif">Abstract</h2>
    <p className="text-base text-gray-700 leading-relaxed">
      This report surveys the evolution of deep learning in quantitative trading, from traditional econometric models to sophisticated neural architectures. We analyze MLPs, RNNs, LSTMs, CNNs, Autoencoders, DRL, GNNs, and Transformers&mdash;examining their unique properties, trading applications, and critical limitations in high-noise, non-stationary financial markets.
    </p>
  </div>
);

const Section1Content = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-gray-900 font-serif">From Linear Econometrics to Non-Linear Machine Learning</h2>

    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-bold text-lg text-gray-800 mb-2 font-serif">Econometric Models</h3>
        <p className="text-sm text-gray-700 mb-2">ARIMA, GARCH</p>
        <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C]">✓ Interpretable, statistical rigor</p>
        <p className="text-xs text-[#BC4128] dark:text-[#E2694A]">✗ Linear assumptions fail</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-bold text-lg text-gray-800 mb-2 font-serif">Classical ML</h3>
        <p className="text-sm text-gray-700 mb-2">SVM, Random Forests</p>
        <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C]">✓ Non-linear, feature importance</p>
        <p className="text-xs text-[#BC4128] dark:text-[#E2694A]">✗ No temporal awareness</p>
      </div>

      <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg border border-blue-300">
        <h3 className="font-bold text-lg text-blue-800 mb-2 font-serif">MLPs</h3>
        <p className="text-sm text-gray-700 mb-2">Multi-Layer Perceptrons</p>
        <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C]">✓ Universal approximator</p>
        <p className="text-xs text-[#BC4128] dark:text-[#E2694A]">✗ Treats time as &ldquo;bag of features&rdquo;</p>
      </div>
    </div>

    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
      <p className="text-sm font-semibold text-purple-800">Key Insight:</p>
      <p className="text-sm text-gray-700 mt-1">MLPs solve non-linearity but ignore sequential order&mdash;critical flaw for time-series data.</p>
    </div>
  </>
);

const Section2Content = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-gray-900 font-serif">Modeling Time: Recurrent Architectures</h2>

    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-4 rounded-lg border border-orange-200">
        <h3 className="font-bold text-lg text-orange-800 mb-3 font-serif">RNNs</h3>
        <p className="text-sm text-gray-700 mb-2"><strong>Innovation:</strong> Hidden state &ldquo;memory&rdquo;</p>
        <p className="text-sm text-gray-700 mb-2"><strong>Problem:</strong> Vanishing gradients</p>
        <p className="text-xs text-[#BC4128] dark:text-[#E2694A]">Memory limited to few time steps</p>
      </div>

      <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-4 rounded-lg border border-green-300">
        <h3 className="font-bold text-lg text-green-800 mb-3 font-serif">LSTMs</h3>
        <p className="text-sm text-gray-700 mb-2"><strong>Innovation:</strong> Gating mechanism (input, output, forget gates)</p>
        <p className="text-sm text-gray-700 mb-2"><strong>Advantage:</strong> Long-term dependencies</p>
        <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C]">Dominant 2010s architecture</p>
      </div>
    </div>

    <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-4 rounded-lg border-l-4 border-[#BC4128] dark:border-[#E2694A]">
      <p className="text-sm font-semibold text-red-800">LSTM Limitations in Finance:</p>
      <ul className="text-sm text-gray-700 mt-2 space-y-1">
        <li>• <strong>Non-Stationarity:</strong> Memory becomes &ldquo;obsolete&rdquo; during regime shifts</li>
        <li>• <strong>Overfitting:</strong> Memorizes noise in low SNR markets</li>
        <li>• <strong>Sequential Bottleneck:</strong> Cannot parallelize training</li>
      </ul>
    </div>
  </>
);

const Section3Content = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-gray-900 font-serif">Novel Data Representations</h2>

    <div className="space-y-4">
      <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg border border-indigo-200">
        <h3 className="font-bold text-lg text-indigo-800 mb-2 font-serif">CNNs: Market-as-Image</h3>
        <p className="text-sm text-gray-700 mb-2"><strong>Applications:</strong></p>
        <ul className="text-sm text-gray-700 space-y-1 ml-4">
          <li>1. Chart pattern recognition (candlestick images)</li>
          <li>2. &ldquo;Factor pictures&rdquo; (100 factors × 60 days as 2D image)</li>
        </ul>
        <p className="text-xs text-[#BC4128] dark:text-[#E2694A] mt-2">✗ Arbitrary representation, black box</p>
      </div>

      <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg border border-teal-200">
        <h3 className="font-bold text-lg text-teal-800 mb-2 font-serif">Autoencoders: Non-Linear PCA</h3>
        <p className="text-sm text-gray-700 mb-2"><strong>Function:</strong> Encoder compresses → Latent space → Decoder reconstructs</p>
        <p className="text-sm text-gray-700"><strong>Use:</strong> Feature extraction &amp; denoising for downstream models</p>
        <p className="text-xs text-[#1D8A70] dark:text-[#3CBF9C] mt-2">✓ Unsupervised learning, signal extraction</p>
      </div>
    </div>
  </>
);

const Section4Content = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-gray-900 font-serif">The New Frontier: Systems &amp; Agents</h2>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
        <h3 className="font-bold text-lg text-yellow-800 mb-3 font-serif">Deep Reinforcement Learning</h3>
        <p className="text-sm text-gray-700 mb-2"><strong>Paradigm:</strong> Market-as-Game</p>
        <p className="text-sm text-gray-700 mb-2">Agent learns policy to maximize reward (PnL/Sharpe)</p>
        <div className="mt-3 pt-3 border-t border-yellow-200">
          <p className="text-xs font-semibold text-[#BC4128] dark:text-[#E2694A]">Critical Barrier: Sim-to-Real Gap</p>
          <p className="text-xs text-gray-600">Requires perfect market simulator&mdash;unrealistic</p>
        </div>
      </div>

      <div className="bg-pink-50 p-4 rounded-lg border border-pink-300">
        <h3 className="font-bold text-lg text-pink-800 mb-3 font-serif">Graph Neural Networks</h3>
        <p className="text-sm text-gray-700 mb-2"><strong>Paradigm:</strong> Market-as-System</p>
        <p className="text-sm text-gray-700 mb-2">Models relationships: Nodes = assets, Edges = dependencies</p>
        <div className="mt-3 pt-3 border-t border-pink-200">
          <p className="text-xs font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">Killer App: Systemic Risk</p>
          <p className="text-xs text-gray-600">Contagion modeling, relational alpha</p>
        </div>
      </div>
    </div>
  </>
);

const Section5Content = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-gray-900 font-serif">Current Apex: Transformers</h2>

    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-xl border border-purple-200 mb-4">
      <h3 className="font-bold text-lg text-purple-800 mb-3 font-serif">Core Innovation: Self-Attention Mechanism</h3>
      <p className="text-sm text-gray-700 mb-2">Direct access to all past time steps simultaneously&mdash;learns which events matter regardless of distance</p>
      <p className="text-sm font-semibold text-[#1D8A70] dark:text-[#3CBF9C]">✓ Parallelizable (solves LSTM bottleneck)</p>
    </div>

    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-base text-blue-800 mb-2">Application 1: Time-Series</h4>
        <p className="text-sm text-gray-700">Temporal Fusion Transformer (TFT)</p>
        <p className="text-xs text-gray-600 mt-1">State-of-the-art, interpretable attention</p>
      </div>

      <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-4 rounded-lg border border-green-200">
        <h4 className="font-semibold text-base text-green-800 mb-2">Application 2: NLP Revolution</h4>
        <p className="text-sm text-gray-700">FinBERT for sentiment analysis</p>
        <p className="text-xs text-gray-600 mt-1">Unlocks alternative data (news, social media)</p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 p-3 rounded-lg">
        <p className="text-xs font-semibold text-green-800 mb-1">Advantages</p>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• Superior long-range modeling</li>
          <li>• Parallelizable training</li>
          <li>• SOTA on NLP tasks</li>
        </ul>
      </div>
      <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 p-3 rounded-lg">
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
    <h2 className="text-2xl font-bold mb-4 text-gray-900 font-serif">Roadmap: Becoming a Deep Learning Quant</h2>

    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div className="bg-[#A8672E]/10 dark:bg-[#D08F52]/10 p-4 rounded-lg border border-blue-200">
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
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#A8672E] dark:bg-[#D08F52] text-white flex items-center justify-center font-bold text-sm mr-3">
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
    <h2 className="text-2xl font-bold mb-4 text-gray-900 font-serif">Model Evolution Summary</h2>
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
        <tbody className="bg-white dark:bg-[#0A0D14]">
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">ARIMA/GARCH</td>
            <td className="p-2 border">Linear models</td>
            <td className="p-2 border text-[#1D8A70] dark:text-[#3CBF9C]">Interpretable</td>
            <td className="p-2 border text-[#BC4128] dark:text-[#E2694A]">No non-linearity</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">SVM/RF</td>
            <td className="p-2 border">Non-linear ML</td>
            <td className="p-2 border text-[#1D8A70] dark:text-[#3CBF9C]">Feature importance</td>
            <td className="p-2 border text-[#BC4128] dark:text-[#E2694A]">No temporal awareness</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">MLP</td>
            <td className="p-2 border">Universal approximator</td>
            <td className="p-2 border text-[#1D8A70] dark:text-[#3CBF9C]">Models any function</td>
            <td className="p-2 border text-[#BC4128] dark:text-[#E2694A]">Ignores sequence order</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">RNN</td>
            <td className="p-2 border">Hidden state memory</td>
            <td className="p-2 border text-[#1D8A70] dark:text-[#3CBF9C]">Sequential processing</td>
            <td className="p-2 border text-[#BC4128] dark:text-[#E2694A]">Vanishing gradients</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">LSTM</td>
            <td className="p-2 border">Gating mechanism</td>
            <td className="p-2 border text-[#1D8A70] dark:text-[#3CBF9C]">Long-term memory</td>
            <td className="p-2 border text-[#BC4128] dark:text-[#E2694A]">Sequential bottleneck</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">CNN</td>
            <td className="p-2 border">Spatial patterns</td>
            <td className="p-2 border text-[#1D8A70] dark:text-[#3CBF9C]">Factor interactions</td>
            <td className="p-2 border text-[#BC4128] dark:text-[#E2694A]">Arbitrary representation</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">Autoencoder</td>
            <td className="p-2 border">Latent compression</td>
            <td className="p-2 border text-[#1D8A70] dark:text-[#3CBF9C]">Unsupervised denoising</td>
            <td className="p-2 border text-[#BC4128] dark:text-[#E2694A]">Intermediate step only</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">DRL</td>
            <td className="p-2 border">Policy learning</td>
            <td className="p-2 border text-[#1D8A70] dark:text-[#3CBF9C]">Action-oriented</td>
            <td className="p-2 border text-[#BC4128] dark:text-[#E2694A]">Sim-to-real gap</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">GNN</td>
            <td className="p-2 border">Graph relationships</td>
            <td className="p-2 border text-[#1D8A70] dark:text-[#3CBF9C]">Systemic modeling</td>
            <td className="p-2 border text-[#BC4128] dark:text-[#E2694A]">Graph construction</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">Transformer</td>
            <td className="p-2 border">Self-attention</td>
            <td className="p-2 border text-[#1D8A70] dark:text-[#3CBF9C]">Parallelizable, NLP</td>
            <td className="p-2 border text-[#BC4128] dark:text-[#E2694A]">Computational cost</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
);

const Table2Content = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-gray-900 font-serif">DL Frameworks Comparison</h2>
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
        <tbody className="bg-white dark:bg-[#0A0D14]">
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">TensorFlow</td>
            <td className="p-2 border">Production-first</td>
            <td className="p-2 border">Steeper curve</td>
            <td className="p-2 border text-[#1D8A70] dark:text-[#3CBF9C]">Excellent (TFX)</td>
            <td className="p-2 border">Widespread</td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-2 border font-medium">PyTorch</td>
            <td className="p-2 border">Research-first</td>
            <td className="p-2 border text-[#1D8A70] dark:text-[#3CBF9C]">Intuitive</td>
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
  return (
    <ArticleFrame slug="evolution-deep-learning-quantitative-trading-mlps-transformers">
      <div className="max-w-5xl mx-auto px-4 text-gray-800">
        <InfographicSlot alt="Evolution of Deep Learning in Quantitative Trading Infographic" />

        <div className="space-y-8">
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
      </div>
    </ArticleFrame>
  );
}
