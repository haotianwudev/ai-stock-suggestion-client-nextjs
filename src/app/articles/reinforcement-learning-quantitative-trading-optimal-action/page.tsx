'use client';

import { BrainCircuit, TrendingUp, Shuffle, Bot, GanttChartSquare, Scale, BookOpen, Atom, AlertTriangle, Lightbulb, TestTube2, ChevronsRight, Eye, Layers, Package, Brain, FunctionSquare, Trophy, Beaker } from 'lucide-react';
import { ArticleFrame, InfographicSlot } from '@/components/articles/article-frame';

// --- Reusable UI Components ---
const Section = ({ id, title, subtitle, children, bgColor = 'bg-white' }: { id: string; title: string; subtitle: string; children: React.ReactNode; bgColor?: string }) => (
  <section id={id} className={`py-8 md:py-12 px-4 sm:px-6 lg:px-8 ${bgColor}`}>
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{title}</h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">{subtitle}</p>
      </div>
      {children}
    </div>
  </section>
);

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:border-cyan-500 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
    <div className="flex items-center mb-4">
      <div className="bg-slate-100 p-3 rounded-full mr-4 border border-slate-200">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
    </div>
    <div className="text-slate-600 leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

const ComparisonTable = () => {
  const headers = ["Feature", "Reinforcement Learning (RL)", "Boosted Trees (XGBoost)", "Sequential Models (RNN/LSTM)"];
  const rows = [
    {
      feature: "Primary Goal",
      rl: "Learn an optimal policy (π) to maximize cumulative reward.",
      boosted: "Make accurate point-in-time predictions.",
      sequential: "Forecast future values in a sequence."
    },
    {
      feature: "Learning Signal",
      rl: "Scalar reward/penalty from environmental interaction.",
      boosted: "Labeled data (input-output pairs).",
      sequential: "Labeled sequence data."
    },
    {
      feature: "Core Task",
      rl: "Sequential decision-making under uncertainty.",
      boosted: "Classification or regression.",
      sequential: "Time-series forecasting."
    },
    {
      feature: "Cost Integration",
      rl: "Intrinsic to the reward function (e.g., PnL - costs).",
      boosted: "Extrinsic; applied after prediction.",
      sequential: "Extrinsic; applied after forecast."
    },
    {
      feature: "Key Strength",
      rl: "Long-term, path-dependent optimization.",
      boosted: "High accuracy on structured, tabular data.",
      sequential: "Capturing complex temporal patterns."
    },
    {
      feature: "Key Weakness",
      rl: "Sample inefficiency, instability, complex reward design.",
      boosted: "Static; doesn't adapt policy or handle costs natively.",
      sequential: "Doesn't optimize actions or risk management."
    },
  ];

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 p-1 mt-8 shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {headers.map(header => (
              <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-cyan-700 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50/70 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{row.feature}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{row.rl}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{row.boosted}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{row.sequential}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Page Sections ---
const ParadigmShiftSection = () => (
  <Section
    id="paradigm-shift"
    bgColor="bg-slate-50"
    title="The Paradigm Shift: From Prediction to Optimal Action"
    subtitle="The fundamental evolution is from asking 'What will the market do?' to 'What is the best action to take now, given my long-term goals and the current market state?'"
  >
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <div className="space-y-6 p-6 bg-white border border-slate-200 rounded-lg">
        <h3 className="text-2xl font-bold text-slate-900 flex items-center">
          <TrendingUp className="h-8 w-8 text-amber-500 mr-3" />
          Supervised Learning Approach
        </h3>
        <p className="text-slate-600">
          Traditionally, quant strategies are a two-step process. First, a model (e.g., XGBoost, LSTM) is trained to minimize a predictive error (like MSE) to forecast a target variable (e.g., future returns). Second, a separate, often heuristic-based, logic layer translates these predictions into trade actions. This creates a disconnect between the model&apos;s objective and the actual goal of profitable trading, as transaction costs and risk are handled post-hoc.
        </p>
        <div className="flex items-center p-3 bg-slate-100 border border-slate-200 rounded-lg text-sm">
          <p className="text-slate-700 text-center w-full">
            Signal Prediction <ChevronsRight className="inline mx-2 text-slate-400" /> Rule-Based Policy <ChevronsRight className="inline mx-2 text-slate-400" /> Trade Action
          </p>
        </div>
      </div>

      <div className="space-y-6 p-6 bg-white border border-slate-200 rounded-lg">
        <h3 className="text-2xl font-bold text-slate-900 flex items-center">
          <BrainCircuit className="h-8 w-8 text-cyan-600 mr-3" />
          The Reinforcement Learning Proposition
        </h3>
        <p className="text-slate-600">
          RL directly tackles the end-goal. The <strong>Agent</strong> (trading algorithm) interacts with the <strong>Environment</strong> (the market) by taking <strong>Actions</strong> (buy, sell, hold) from a given <strong>State</strong> (market data, portfolio). It receives a <strong>Reward</strong> (change in portfolio value, minus costs) and learns a <strong>Policy</strong> (π) that maps states to actions to maximize cumulative future rewards. This is guided by the Bellman equation, which formalizes the trade-off between immediate and long-term gains, creating a holistic, cost-and-risk-aware strategy.
        </p>
        <div className="flex items-center p-3 bg-slate-100 border border-slate-200 rounded-lg text-sm">
          <p className="text-slate-700 text-center w-full">
            Market State <ChevronsRight className="inline mx-2 text-slate-400" /> Learned Policy (π) <ChevronsRight className="inline mx-2 text-slate-400" /> Optimal Action
          </p>
        </div>
      </div>
    </div>
  </Section>
);

const ApplicationsSection = () => (
  <Section
    id="applications"
    title="Core Domains of Application"
    subtitle="RL excels in specific, complex domains where sequential decision-making, path dependency, and cost management are paramount."
  >
    <div className="grid md:grid-cols-3 gap-8">
      <FeatureCard icon={<Shuffle className="h-6 w-6 text-cyan-600" />} title="Dynamic Portfolio Optimization">
        <p>An agent learns an adaptive allocation policy, continuously rebalancing to maximize a utility function (e.g., Sharpe ratio). Unlike static optimizers, it can learn to respond to changing market regimes and factor in transaction costs directly into its decision-making process.</p>
        <p className="font-semibold text-slate-700 pt-2">Key Challenge:</p>
        <p>The curse of dimensionality with many assets and the non-stationarity of financial markets.</p>
      </FeatureCard>

      <FeatureCard icon={<GanttChartSquare className="h-6 w-6 text-cyan-600" />} title="Optimal Trade Execution">
        <p>For large orders, an agent learns to break them into smaller pieces and execute them over time. The goal is to find the optimal balance between minimizing market impact (price slippage from trading too fast) and timing risk (price moving adversely while waiting too long).</p>
        <p className="font-semibold text-slate-700 pt-2">Key Challenge:</p>
        <p>The exploration-exploitation trade-off and modeling the market&apos;s reaction to the agent&apos;s own trades.</p>
      </FeatureCard>

      <FeatureCard icon={<Scale className="h-6 w-6 text-cyan-600" />} title="Algorithmic Market Making">
        <p>An agent learns an optimal quoting policy (placing bid/ask orders) to profit from the spread. It must dynamically adjust prices based on order flow, market volatility, and its own inventory risk to avoid accumulating a large, risky position.</p>
        <p className="font-semibold text-slate-700 pt-2">Key Challenge:</p>
        <p>Balancing profitability from the spread against the risk of adverse selection and inventory holding costs.</p>
      </FeatureCard>
    </div>
  </Section>
);

const StrengthsSection = () => (
  <Section
    id="strengths"
    bgColor="bg-slate-50"
    title="Strategic Advantages of Reinforcement Learning"
    subtitle="RL's unique framework provides inherent strengths for tackling the dynamic complexities of financial markets."
  >
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <FeatureCard icon={<TrendingUp className="h-6 w-6 text-green-600" />} title="Adaptability">
        Models can adapt to changing market regimes (non-stationarity), unlike supervised models trained on a fixed historical dataset which can become brittle and fail when market dynamics shift.
      </FeatureCard>

      <FeatureCard icon={<Bot className="h-6 w-6 text-green-600" />} title="Long-Term Optimization">
        By maximizing cumulative reward, RL avoids &ldquo;greedy&rdquo; local optima. It can learn to take a small loss now for a much larger expected gain later, a concept difficult to encode in traditional models.
      </FeatureCard>

      <FeatureCard icon={<Layers className="h-6 w-6 text-green-600" />} title="Integrated Cost Control">
        Transaction costs and slippage are not afterthoughts; they are punishments in the reward function. This forces the agent to learn an inherently realistic and cost-aware trading policy from the ground up.
      </FeatureCard>

      <FeatureCard icon={<Lightbulb className="h-6 w-6 text-green-600" />} title="Strategy Discovery">
        Through exploration, an agent can discover complex, non-linear strategies that a human analyst might never conceive, potentially unlocking novel sources of alpha.
      </FeatureCard>
    </div>
  </Section>
);

const LimitationsSection = () => (
  <Section
    id="limitations"
    title="Practical Challenges & Limitations"
    subtitle="The path from a successful backtest to a profitable live deployment of RL is fraught with significant and unique hurdles."
  >
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <FeatureCard icon={<AlertTriangle className="h-6 w-6 text-amber-500" />} title="Simulation-to-Reality Gap">
        Market simulators, no matter how complex, cannot perfectly capture the nuances of the live market, especially the feedback loop of the agent&apos;s own market impact. This often leads to over-optimistic backtests.
      </FeatureCard>

      <FeatureCard icon={<TestTube2 className="h-6 w-6 text-amber-500" />} title="Data Inefficiency">
        Model-free RL requires millions of interactions (episodes) to learn effectively. Financial markets provide a limited, noisy, and expensive source of data compared to games or robotics.
      </FeatureCard>

      <FeatureCard icon={<Atom className="h-6 w-6 text-amber-500" />} title="Reward Function Design">
        A poorly specified reward function can lead to perverse incentives. For example, rewarding only for high returns might encourage catastrophic risk-taking. Crafting a balanced, risk-adjusted reward (like Sharpe ratio) is a non-trivial art.
      </FeatureCard>

      <FeatureCard icon={<Eye className="h-6 w-6 text-amber-500" />} title="Instability & Interpretability">
        Training can be highly sensitive to hyperparameters, and the resulting neural network policy is a &ldquo;black box,&rdquo; making it extremely difficult to understand, debug, and gain the trust of risk managers.
      </FeatureCard>
    </div>
  </Section>
);

const ComparisonSection = () => (
  <Section
    id="comparison"
    bgColor="bg-slate-50"
    title="Comparative Analysis"
    subtitle="RL is not just another algorithm; it's a different problem-solving framework. While supervised models are powerful function approximators for prediction, RL is a framework for optimal control and decision-making."
  >
    <ComparisonTable />
  </Section>
);

const GettingStartedSection = () => (
  <Section
    id="getting-started"
    title="Blueprint for an RL Trading System"
    subtitle="Building a basic RL trading system involves defining these five core components."
  >
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
      <FeatureCard icon={<Package className="h-6 w-6 text-indigo-600" />} title="1. Environment">
        This is your market simulator. It must provide market data to the agent, execute trades, calculate transaction costs, and track portfolio value. Libraries like OpenAI Gymnasium provide the structure.
      </FeatureCard>

      <FeatureCard icon={<Brain className="h-6 w-6 text-indigo-600" />} title="2. State Representation">
        This is the agent&apos;s view of the market. It&apos;s a vector of features like historical price/volume data (e.g., last 60 periods), technical indicators (RSI, MACD), and portfolio status (current position, cash).
      </FeatureCard>

      <FeatureCard icon={<FunctionSquare className="h-6 w-6 text-indigo-600" />} title="3. Action Space">
        Defines the agent&apos;s possible moves. It can be discrete (Buy, Sell, Hold) or continuous (allocate X% of the portfolio to an asset), which influences algorithm choice.
      </FeatureCard>

      <FeatureCard icon={<Trophy className="h-6 w-6 text-indigo-600" />} title="4. Reward Function">
        The most critical part. It&apos;s the signal the agent optimizes. It could be simple profit-and-loss, or a more sophisticated risk-adjusted measure like the Sharpe ratio or Sortino ratio.
      </FeatureCard>

      <FeatureCard icon={<Beaker className="h-6 w-6 text-indigo-600" />} title="5. Algorithm Choice">
        Select an RL algorithm. Deep Q-Networks (DQN) are common for discrete action spaces, while Proximal Policy Optimization (PPO) or Soft Actor-Critic (SAC) are state-of-the-art for continuous control.
      </FeatureCard>
    </div>
  </Section>
);

const FutureDirectionsSection = () => (
  <Section
    id="future"
    bgColor="bg-slate-50"
    title="Future Directions & Research Frontiers"
    subtitle="Emerging research aims to address current limitations and unlock new capabilities for RL in finance."
  >
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <FeatureCard icon={<Bot className="h-6 w-6 text-purple-600" />} title="Multi-Agent RL (MARL)">
        Simulating a market with multiple, competing RL agents to capture emergent phenomena like liquidity crises and herd behavior, leading to more robust and realistic simulators.
      </FeatureCard>

      <FeatureCard icon={<BookOpen className="h-6 w-6 text-purple-600" />} title="Offline & Model-Based RL">
        Developing sample-efficient methods that can learn effective policies from fixed, static historical datasets. This is crucial for finance where live interaction is expensive and risky.
      </FeatureCard>

      <FeatureCard icon={<Eye className="h-6 w-6 text-purple-600" />} title="Explainable AI (XAI) for RL">
        Integrating techniques like attention mechanisms to shed light on the agent&apos;s &ldquo;black box&rdquo; policy, revealing what market features it is focusing on when making a decision.
      </FeatureCard>

      <FeatureCard icon={<Layers className="h-6 w-6 text-purple-600" />} title="Hybrid & Hierarchical Models">
        Combining the predictive power of Transformers for market forecasting with an RL agent for risk and execution management. Hierarchical RL can learn high-level goals and low-level execution strategies.
      </FeatureCard>
    </div>
  </Section>
);

export default function ReinforcementLearningArticle() {
  return (
    <ArticleFrame slug="reinforcement-learning-quantitative-trading-optimal-action">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mb-8">
          An in-depth analysis of how RL is shifting the financial paradigm from static prediction to dynamic, adaptive policy optimization for superior alpha generation.
        </p>

        <InfographicSlot alt="Reinforcement Learning in Quantitative Trading Infographic" />

        <div className="-mx-4 mt-12">
          <ParadigmShiftSection />
          <ApplicationsSection />
          <StrengthsSection />
          <LimitationsSection />
          <ComparisonSection />
          <GettingStartedSection />
          <FutureDirectionsSection />
        </div>
      </div>
    </ArticleFrame>
  );
}
