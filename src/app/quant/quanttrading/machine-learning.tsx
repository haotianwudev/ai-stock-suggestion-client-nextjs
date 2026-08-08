'use client';

import { Brain, TrendingUp, Zap, Layers, GitBranch, Waves, Scale, Gamepad2, Newspaper, Target, ScanSearch, AlertTriangle, Bot, LineChart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/shared/page-template";
import { getQuantTopicConfig } from "./config";

function ChapterHeading({ number, title, colorClass }: { number: number; title: string; colorClass: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full ${colorClass} text-white text-xs md:text-sm font-bold flex-shrink-0`}>
        {number}
      </span>
      <h3 className="text-lg md:text-xl font-semibold text-purple-900">{title}</h3>
    </div>
  );
}

export function MachineLearningContent() {
  // Get configuration for machine learning
  const config = getQuantTopicConfig('machine-learning');

  const heroColorScheme = {
    border: "border-purple-200",
    background: "bg-gradient-to-br from-purple-50 to-pink-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    titleColor: "text-purple-900",
    descriptionColor: "text-purple-700",
    cardBg: "bg-white",
    cardBorder: "border border-purple-100",
    cardText: "text-purple-900",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    sectionTitle: "text-purple-900"
  };



  const contentSections = (
    <>
      {/* 1. Foundations */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Foundations" colorClass="bg-purple-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div>
            <h4 className="font-semibold text-purple-900 text-sm md:text-base">Learning a Function from Features to a Label</h4>
            <p className="text-xs md:text-sm text-purple-700 leading-relaxed mt-1">
              At its core, ML in finance means feeding a model historical <strong>features</strong> (price history,
              volume, fundamentals, sentiment scores) and a <strong>label</strong> (did the stock go up next week? by how
              much?), then letting the model learn a function that maps one to the other — instead of a human explicitly
              coding the rule, as in systematic trading.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-900 text-sm md:text-base">Why Financial ML Is Unusually Hard</h4>
            <p className="text-xs md:text-sm text-purple-700 leading-relaxed mt-1">
              Markets have a low signal-to-noise ratio (most price movement is genuinely close to random), the underlying
              relationships are non-stationary (what worked in one regime can stop working in the next), and financial
              observations overlap in time — all of which break the "independent, identically distributed" assumption
              most off-the-shelf ML tooling quietly relies on.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Core Techniques */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Core Techniques" colorClass="bg-purple-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-purple-600 flex-shrink-0" /> Random Forest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed">
                An ensemble of many decorrelated decision trees, each voting on the outcome — popular in finance because
                it's relatively resistant to overfitting on noisy data and gives usable feature-importance rankings.
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Waves className="h-4 w-4 text-purple-600 flex-shrink-0" /> LSTM Networks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed">
                A recurrent neural network variant built to remember relevant information across long sequences — suited
                to time-series data where order matters, though attention-based architectures have increasingly
                displaced LSTMs even in finance.
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Scale className="h-4 w-4 text-purple-600 flex-shrink-0" /> Support Vector Machines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed">
                Finds the boundary that best separates two classes (e.g. "up day" vs. "down day") with the widest
                possible margin — a solid, well-understood classical baseline before reaching for deep learning.
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Gamepad2 className="h-4 w-4 text-purple-600 flex-shrink-0" /> Reinforcement Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed">
                Learns a policy — a sequence of actions — by trial and error against a reward signal, rather than
                learning from fixed labeled examples. Used mainly in execution (minimizing market impact while filling
                an order) and dynamic portfolio allocation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Applications */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="Applications" colorClass="bg-purple-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Newspaper className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900 text-sm md:text-base">Sentiment Analysis</h4>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed mt-1">
                NLP models score news, filings, and social media text for tone, turning unstructured language into a
                numerical feature that can feed a broader model or be monitored directly for sudden shifts.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <TrendingUp className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900 text-sm md:text-base">Price Direction, Not Price Prediction</h4>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed mt-1">
                Predicting an exact future price is a much harder (and often less useful) target than predicting
                <strong> direction</strong> or a probability of an up-move — most practical trading applications frame
                this as classification, not regression, for exactly that reason.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Target className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900 text-sm md:text-base">ML-Based Risk Models</h4>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed mt-1">
                Non-linear models can capture risk relationships (e.g. how correlations shift in stress regimes) that
                classic linear factor models miss — at the cost of being harder to interpret and explain after the fact.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <ScanSearch className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900 text-sm md:text-base">Pattern Recognition</h4>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed mt-1">
                Unsupervised methods (clustering, anomaly detection) surface structure in market data — e.g. grouping
                stocks by co-movement — without requiring a labeled target in advance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Common Pitfalls */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Common Pitfalls" colorClass="bg-red-500" />
        <Card className="border-red-200 bg-red-50/50 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" /> Where Financial ML Goes Wrong
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Overfitting to noise:</span>
              <span>With low signal-to-noise data, a flexible enough model will happily "learn" patterns that are
                pure coincidence in the training sample and vanish out of sample.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Leakage from overlapping labels:</span>
              <span>Standard k-fold cross-validation assumes independent samples — financial labels built from
                overlapping time windows violate that and silently inflate reported accuracy unless purged/embargoed
                cross-validation is used instead.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Regime non-stationarity:</span>
              <span>A model trained on one market regime can quietly degrade once that regime ends — unlike a
                hand-specified rule, a black-box model's failure mode is often invisible until it's already lost money.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Related & Advanced Topics" colorClass="bg-purple-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Bot className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900 text-sm md:text-base">AI in Quant</h4>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed mt-1">
                For LLM-based tooling (agents, RAG) layered on top of predictive ML — a different discipline from what's
                covered here — see{" "}
                <Link href="/quant/topics/ai-in-quant" className="underline underline-offset-2 hover:text-purple-900 inline-flex items-center gap-0.5">
                  AI in Quant <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <LineChart className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900 text-sm md:text-base">Backtesting</h4>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed mt-1">
                An ML model needs the same rigorous out-of-sample validation as any rule-based strategy before risking
                capital — see{" "}
                <Link href="/quant/quanttrading/backtest" className="underline underline-offset-2 hover:text-purple-900 inline-flex items-center gap-0.5">
                  Backtesting <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Zap className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900 text-sm md:text-base">Systematic Strategies</h4>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed mt-1">
                For the hand-specified, interpretable-rule alternative to ML-based signals — see{" "}
                <Link href="/quant/quanttrading/systematic-strategies" className="underline underline-offset-2 hover:text-purple-900 inline-flex items-center gap-0.5">
                  Systematic Strategies <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<Brain className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Machine Learning in Finance Guide"
    />
  );
}