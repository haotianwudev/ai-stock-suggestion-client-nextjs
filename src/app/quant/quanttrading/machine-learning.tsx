'use client';

import { Brain, TrendingUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getQuantTopicConfig } from "./config";

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

  const keyConceptsItems = [
    { icon: <Brain className="h-4 w-4" />, text: "Neural Networks" },
    { icon: <TrendingUp className="h-4 w-4" />, text: "Predictive Models" },
    { icon: <Zap className="h-4 w-4" />, text: "Quantitative Trading" }
  ];

  const contentSections = (
    <>
      {/* Applications */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-purple-900">Key Applications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-900 mb-2">Sentiment Analysis</h4>
            <p className="text-sm text-purple-700">Analyze market sentiment from news, social media, and financial reports.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-900 mb-2">Price Prediction</h4>
            <p className="text-sm text-purple-700">Use deep learning models to forecast asset prices and market movements.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-900 mb-2">Risk Management</h4>
            <p className="text-sm text-purple-700">Implement ML-based risk models for better portfolio protection.</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-900 mb-2">Pattern Recognition</h4>
            <p className="text-sm text-purple-700">Identify complex market patterns and trading opportunities.</p>
          </div>
        </div>
      </div>

      {/* ML Techniques */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-purple-900">Popular ML Techniques</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">Random Forest</Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">LSTM Networks</Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">Support Vector Machines</Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">Reinforcement Learning</Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">Ensemble Methods</Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">Deep Neural Networks</Badge>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<Brain className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      keyConceptsItems={keyConceptsItems}
      contentSections={contentSections}
      videoTitle="Machine Learning in Finance"
      videoDescription="Explore AI and machine learning applications in quantitative finance, from predictive modeling to algorithmic trading."
      infographicAlt="Machine Learning in Finance Guide"
    />
  );
}