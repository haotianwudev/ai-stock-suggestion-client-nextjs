import { Brain, TrendingUp, Zap, GitBranch, Waves, Scale, Gamepad2, Newspaper, Target, ScanSearch, AlertTriangle, Bot, LineChart } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, StatTile, ChapterHeading } from "@/components/shared/section-card";
import { getQuantTopicConfig } from "./config";

export function MachineLearningContent() {
  const config = getQuantTopicConfig('machine-learning');
  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={Brain}>
      <div className="space-y-8">
        {/* 1. Foundations */}
        <SectionCard title="Foundations" icon={Brain} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>Learning a Function from Features to a Label</h4>
              <p>
                At its core, ML in finance means feeding a model historical <strong>features</strong> (price history,
                volume, fundamentals, sentiment scores) and a <strong>label</strong> (did the stock go up next week?
                by how much?), then letting the model learn a function that maps one to the other — instead of a
                human explicitly coding the rule, as in systematic trading.
              </p>
            </div>
            <div>
              <h4>Why Financial ML Is Unusually Hard</h4>
              <p>
                Markets have a low signal-to-noise ratio (most price movement is genuinely close to random), the
                underlying relationships are non-stationary (what worked in one regime can stop working in the next),
                and financial observations overlap in time — all of which break the &quot;independent,
                identically distributed&quot; assumption most off-the-shelf ML tooling quietly relies on.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* 2. Core Techniques */}
        <div className="space-y-3">
          <ChapterHeading number={2} title="Core Techniques" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatTile title="Random Forest" icon={GitBranch}>
              An ensemble of many decorrelated decision trees, each voting on the outcome — popular in finance
              because it&apos;s relatively resistant to overfitting on noisy data and gives usable feature-importance
              rankings.
            </StatTile>
            <StatTile title="LSTM Networks" icon={Waves}>
              A recurrent neural network variant built to remember relevant information across long sequences —
              suited to time-series data where order matters, though attention-based architectures have increasingly
              displaced LSTMs even in finance.
            </StatTile>
            <StatTile title="Support Vector Machines" icon={Scale}>
              Finds the boundary that best separates two classes (e.g. &quot;up day&quot; vs. &quot;down day&quot;)
              with the widest possible margin — a solid, well-understood classical baseline before reaching for deep
              learning.
            </StatTile>
            <StatTile title="Reinforcement Learning" icon={Gamepad2}>
              Learns a policy — a sequence of actions — by trial and error against a reward signal, rather than
              learning from fixed labeled examples. Used mainly in execution (minimizing market impact while filling
              an order) and dynamic portfolio allocation.
            </StatTile>
          </div>
        </div>

        {/* 3. Applications */}
        <SectionCard title="Applications" icon={Newspaper} tone="accent">
          <div className="space-y-4">
            <div>
              <h4>Sentiment Analysis</h4>
              <p>NLP models score news, filings, and social media text for tone, turning unstructured language into a numerical feature that can feed a broader model or be monitored directly for sudden shifts.</p>
            </div>
            <div>
              <h4>Price Direction, Not Price Prediction</h4>
              <p>Predicting an exact future price is a much harder (and often less useful) target than predicting <strong>direction</strong> or a probability of an up-move — most practical trading applications frame this as classification, not regression, for exactly that reason.</p>
            </div>
            <div>
              <h4>ML-Based Risk Models</h4>
              <p>Non-linear models can capture risk relationships (e.g. how correlations shift in stress regimes) that classic linear factor models miss — at the cost of being harder to interpret and explain after the fact.</p>
            </div>
            <div>
              <h4>Pattern Recognition</h4>
              <p>Unsupervised methods (clustering, anomaly detection) surface structure in market data — e.g. grouping stocks by co-movement — without requiring a labeled target in advance.</p>
            </div>
          </div>
        </SectionCard>

        {/* 4. Common Pitfalls */}
        <SectionCard title="Where Financial ML Goes Wrong" icon={AlertTriangle} tone="neg">
          <ul>
            <li><strong>Overfitting to noise:</strong> With low signal-to-noise data, a flexible enough model will happily &quot;learn&quot; patterns that are pure coincidence in the training sample and vanish out of sample.</li>
            <li><strong>Leakage from overlapping labels:</strong> Standard k-fold cross-validation assumes independent samples — financial labels built from overlapping time windows violate that and silently inflate reported accuracy unless purged/embargoed cross-validation is used instead.</li>
            <li><strong>Regime non-stationarity:</strong> A model trained on one market regime can quietly degrade once that regime ends — unlike a hand-specified rule, a black-box model&apos;s failure mode is often invisible until it&apos;s already lost money.</li>
          </ul>
        </SectionCard>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Target} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Bot className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>AI in Quant</h4>
                <p>
                  For LLM-based tooling (agents, RAG) layered on top of predictive ML — a different discipline from
                  what&apos;s covered here — see{" "}
                  <Link href="/quant/topics/ai-in-quant" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">AI in Quant</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <LineChart className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Backtesting</h4>
                <p>
                  An ML model needs the same rigorous out-of-sample validation as any rule-based strategy before
                  risking capital — see{" "}
                  <Link href="/quant/quanttrading/backtest" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Backtesting</Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Zap className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Systematic Strategies</h4>
                <p>
                  For the hand-specified, interpretable-rule alternative to ML-based signals — see{" "}
                  <Link href="/quant/quanttrading/systematic-strategies" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52]">Systematic Strategies</Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
