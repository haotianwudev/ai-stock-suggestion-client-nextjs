'use client';

import { BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

export function StatisticalAnalysisContent() {
  const config = getTopicConfig('statistical-analysis');
  
  if (!config) return null;

  // Define purple color scheme for statistical analysis
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

  // Define custom content sections
  const contentSections = (
    <>
      {/* Core Statistical Methods */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-purple-900">Core Statistical Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-900 mb-2">Principal Component Analysis (PCA)</h4>
            <p className="text-sm text-purple-700">Reduce dimensionality of complex datasets while preserving maximum variance. Essential for yield curve analysis and factor modeling.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-900 mb-2">Factor Analysis</h4>
            <p className="text-sm text-purple-700">Identify underlying factors driving asset returns. Build multi-factor models for risk attribution and alpha generation.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-900 mb-2">Correlation Analysis</h4>
            <p className="text-sm text-purple-700">Measure linear relationships between variables. Critical for portfolio construction and risk management.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-900 mb-2">Regression Analysis</h4>
            <p className="text-sm text-purple-700">Model relationships between dependent and independent variables. Foundation for predictive modeling in finance.</p>
          </div>
        </div>
      </div>

      {/* Applications in Finance */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-purple-900">Applications in Finance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-900 mb-2">Fixed Income</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Yield curve decomposition</li>
              <li>• Duration risk analysis</li>
              <li>• Term structure modeling</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-900 mb-2">Equity Markets</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Factor exposure analysis</li>
              <li>• Style attribution</li>
              <li>• Risk decomposition</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-100">
            <h4 className="font-semibold text-purple-900 mb-2">Portfolio Management</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Risk budgeting</li>
              <li>• Performance attribution</li>
              <li>• Optimization constraints</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation Framework */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-purple-900">Implementation Framework</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">Python/NumPy</Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">R Statistical Computing</Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">MATLAB</Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">Scikit-learn</Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">Pandas</Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">SciPy</Badge>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="space-y-3">
        <h3 className="text-lg md:text-xl font-semibold text-purple-900">Key Concepts</h3>
        <div className="bg-white p-4 rounded-lg border border-purple-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-purple-900 mb-2">Dimensionality Reduction</h4>
              <p className="text-sm text-purple-700">Transform high-dimensional data into lower dimensions while preserving essential information and relationships.</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-900 mb-2">Eigenvalue Decomposition</h4>
              <p className="text-sm text-purple-700">Mathematical foundation of PCA. Eigenvalues represent variance explained by each principal component.</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-900 mb-2">Explained Variance Ratio</h4>
              <p className="text-sm text-purple-700">Measure how much variance each component captures. Critical for determining optimal number of factors.</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-900 mb-2">Factor Loadings</h4>
              <p className="text-sm text-purple-700">Weights showing how original variables contribute to each factor. Essential for interpretation and risk attribution.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      config={config}
      heroIcon={<BarChart3 className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Statistical Analysis Methods in Finance"
    />
  );
}