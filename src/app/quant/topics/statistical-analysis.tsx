'use client';

import { BarChart3, Layers, GitCommitHorizontal, Link2, TrendingUp, Landmark, LineChart as LineChartIcon, Briefcase, AlertTriangle, Dice5, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTemplate } from "@/components/shared/page-template";
import { getTopicConfig } from "./config";

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
      {/* 1. Core Statistical Methods */}
      <div className="space-y-3">
        <ChapterHeading number={1} title="Core Statistical Methods" colorClass="bg-purple-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Layers className="h-4 w-4 text-purple-600 flex-shrink-0" /> Principal Component Analysis (PCA)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed">
                Rotates a set of correlated variables into a smaller set of uncorrelated "components" ranked by how much
                variance each explains. On the yield curve, the first three components almost always correspond cleanly
                to <strong>level, slope, and curvature</strong> — a real, well-documented empirical result, not a
                coincidence.
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <GitCommitHorizontal className="h-4 w-4 text-purple-600 flex-shrink-0" /> Factor Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed">
                Similar to PCA but starts from the assumption that a small number of unobserved factors <em>cause</em>
                the co-movement in observed returns — used to build multi-factor risk and return-attribution models
                (e.g. explaining a stock's return as beta to market, size, and value factors).
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Link2 className="h-4 w-4 text-purple-600 flex-shrink-0" /> Correlation Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed">
                Measures the strength of a <em>linear</em> relationship between two variables — essential for
                diversification (low-correlation assets reduce portfolio volatility more than high-correlation ones for
                the same expected return), but silent on non-linear relationships and never proof of causation.
              </p>
            </CardContent>
          </Card>
          <Card className="border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600 flex-shrink-0" /> Regression Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed">
                Fits a line (or curve) explaining a dependent variable from one or more independent ones — the
                foundation of factor models and CAPM-style beta estimation, but only as reliable as its assumptions
                (linearity, constant variance of errors) actually hold for the data being modeled.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 2. Applications in Finance */}
      <div className="space-y-3">
        <ChapterHeading number={2} title="Applications in Finance" colorClass="bg-purple-600" />
        <div className="ml-8 md:ml-9 grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card className="border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Landmark className="h-4 w-4 text-purple-600 flex-shrink-0" /> Fixed Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs md:text-sm text-purple-700 space-y-1 leading-relaxed">
                <li>• Yield curve decomposition (level/slope/curvature via PCA)</li>
                <li>• Duration &amp; convexity-based risk analysis</li>
                <li>• Term structure modeling</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <LineChartIcon className="h-4 w-4 text-purple-600 flex-shrink-0" /> Equity Markets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs md:text-sm text-purple-700 space-y-1 leading-relaxed">
                <li>• Factor exposure analysis (value, momentum, quality)</li>
                <li>• Style attribution vs. a benchmark</li>
                <li>• Risk decomposition by source</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-purple-600 flex-shrink-0" /> Portfolio Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs md:text-sm text-purple-700 space-y-1 leading-relaxed">
                <li>• Risk budgeting across positions</li>
                <li>• Performance attribution (skill vs. luck vs. beta)</li>
                <li>• Optimization constraints (turnover, sector caps)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. The Math Behind PCA */}
      <div className="space-y-3">
        <ChapterHeading number={3} title="The Math Behind PCA" colorClass="bg-purple-600" />
        <Card className="border-purple-100 ml-8 md:ml-9">
          <CardContent className="pt-4 space-y-3">
            <p className="text-xs md:text-sm text-purple-700 leading-relaxed">
              PCA works by finding the <strong>eigenvectors and eigenvalues</strong> of the data's covariance matrix —
              each eigenvector defines a component's direction, and its paired eigenvalue is exactly how much variance
              that component explains. The <strong>explained variance ratio</strong> (an eigenvalue divided by the sum
              of all eigenvalues) is what determines how many components to keep — commonly enough to explain 90-95% of
              total variance. <strong>Factor loadings</strong> — how strongly each original variable feeds into a given
              component — are what let you go back and interpret what an abstract "Component 2" actually represents
              economically.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 4. Common Pitfalls */}
      <div className="space-y-3">
        <ChapterHeading number={4} title="Common Pitfalls" colorClass="bg-red-500" />
        <Card className="border-red-200 bg-red-50/50 ml-8 md:ml-9">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm md:text-base text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" /> Where the Numbers Mislead
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Correlation ≠ causation:</span>
              <span>Two assets moving together doesn't mean one drives the other — both could be responding to a
                third, unmeasured factor (like overall market risk appetite).</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Spurious regression:</span>
              <span>Regressing two unrelated non-stationary time series (e.g. two things that both trend upward over
                time) can produce a deceptively high R² with no real relationship underneath.</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 text-xs md:text-sm text-red-700">
              <span className="font-semibold flex-shrink-0">Correlations aren't stable:</span>
              <span>Correlation estimated over a calm period frequently breaks down exactly when it matters most —
                during a crisis, when previously-diversifying assets often move together.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Related & Advanced Topics */}
      <div className="space-y-3">
        <ChapterHeading number={5} title="Related & Advanced Topics" colorClass="bg-purple-600" />
        <div className="ml-8 md:ml-9 space-y-3">
          <div className="flex gap-2">
            <Dice5 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900 text-sm md:text-base">Monte Carlo Simulation</h4>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed mt-1">
                The distributional assumptions estimated here (means, correlations, factor loadings) are exactly what
                feeds a simulation's random-path generation — see{" "}
                <Link href="/quant/topics/monte-carlo" className="underline underline-offset-2 hover:text-purple-900 inline-flex items-center gap-0.5">
                  Monte Carlo Simulation <ArrowRight className="h-3 w-3" />
                </Link>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Shield className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900 text-sm md:text-base">Risk Management</h4>
              <p className="text-xs md:text-sm text-purple-700 leading-relaxed mt-1">
                Factor models built here are the backbone of portfolio-level risk decomposition — see{" "}
                <Link href="/quant/topics/risk-management" className="underline underline-offset-2 hover:text-purple-900 inline-flex items-center gap-0.5">
                  Risk Management <ArrowRight className="h-3 w-3" />
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
      heroIcon={<BarChart3 className="h-6 w-6 md:h-8 md:w-8" />}
      heroColorScheme={heroColorScheme}
      contentSections={contentSections}
      infographicAlt="Statistical Analysis Methods in Finance"
    />
  );
}