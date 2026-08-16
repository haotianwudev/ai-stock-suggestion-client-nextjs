import { BarChart3, Layers, GitCommitHorizontal, Link2, TrendingUp, AlertTriangle, Dice5, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { TopicDetailShell } from "@/components/shared/topic-detail-shell";
import { SectionCard, StatTile, ChapterHeading } from "@/components/shared/section-card";
import { getTopicConfig } from "./config";

export function StatisticalAnalysisContent() {
  const config = getTopicConfig('statistical-analysis');

  if (!config) return null;

  return (
    <TopicDetailShell config={config} icon={BarChart3}>
      <div className="space-y-8">
        {/* 1. Core Statistical Methods */}
        <div className="space-y-3">
          <ChapterHeading number={1} title="Core Statistical Methods" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <StatTile title="Principal Component Analysis (PCA)" icon={Layers}>
              Rotates a set of correlated variables into a smaller set of uncorrelated &quot;components&quot; ranked by
              how much variance each explains. On the yield curve, the first three components almost always
              correspond cleanly to <strong>level, slope, and curvature</strong> — a real, well-documented empirical
              result, not a coincidence.
            </StatTile>
            <StatTile title="Factor Analysis" icon={GitCommitHorizontal}>
              Similar to PCA but starts from the assumption that a small number of unobserved factors <em>cause</em> the
              co-movement in observed returns — used to build multi-factor risk and return-attribution models (e.g.
              explaining a stock&apos;s return as beta to market, size, and value factors).
            </StatTile>
            <StatTile title="Correlation Analysis" icon={Link2}>
              Measures the strength of a <em>linear</em> relationship between two variables — essential for
              diversification (low-correlation assets reduce portfolio volatility more than high-correlation ones for
              the same expected return), but silent on non-linear relationships and never proof of causation.
            </StatTile>
            <StatTile title="Regression Analysis" icon={TrendingUp}>
              Fits a line (or curve) explaining a dependent variable from one or more independent ones — the
              foundation of factor models and CAPM-style beta estimation, but only as reliable as its assumptions
              (linearity, constant variance of errors) actually hold for the data being modeled.
            </StatTile>
          </div>
        </div>

        {/* 2. Applications in Finance */}
        <SectionCard title="Applications in Finance" icon={BarChart3} tone="accent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4>Fixed Income</h4>
              <ul>
                <li>Yield curve decomposition (level/slope/curvature via PCA)</li>
                <li>Duration &amp; convexity-based risk analysis</li>
                <li>Term structure modeling</li>
              </ul>
            </div>
            <div>
              <h4>Equity Markets</h4>
              <ul>
                <li>Factor exposure analysis (value, momentum, quality)</li>
                <li>Style attribution vs. a benchmark</li>
                <li>Risk decomposition by source</li>
              </ul>
            </div>
            <div>
              <h4>Portfolio Management</h4>
              <ul>
                <li>Risk budgeting across positions</li>
                <li>Performance attribution (skill vs. luck vs. beta)</li>
                <li>Optimization constraints (turnover, sector caps)</li>
              </ul>
            </div>
          </div>
        </SectionCard>

        {/* 3. The Math Behind PCA */}
        <div className="space-y-3">
          <ChapterHeading number={3} title="The Math Behind PCA" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            PCA works by finding the <strong className="text-gray-900 dark:text-gray-100">eigenvectors and eigenvalues</strong> of the data&apos;s covariance matrix —
            each eigenvector defines a component&apos;s direction, and its paired eigenvalue is exactly how much variance
            that component explains. The <strong className="text-gray-900 dark:text-gray-100">explained variance ratio</strong> (an eigenvalue divided by the sum
            of all eigenvalues) is what determines how many components to keep — commonly enough to explain 90-95% of
            total variance. <strong className="text-gray-900 dark:text-gray-100">Factor loadings</strong> — how strongly each original variable feeds into a given
            component — are what let you go back and interpret what an abstract &quot;Component 2&quot; actually represents
            economically.
          </p>
        </div>

        {/* 4. Common Pitfalls */}
        <SectionCard title="Where the Numbers Mislead" icon={AlertTriangle} tone="neg">
          <ul>
            <li><strong>Correlation ≠ causation:</strong> Two assets moving together doesn&apos;t mean one drives the other — both could be responding to a third, unmeasured factor (like overall market risk appetite).</li>
            <li><strong>Spurious regression:</strong> Regressing two unrelated non-stationary time series (e.g. two things that both trend upward over time) can produce a deceptively high R² with no real relationship underneath.</li>
            <li><strong>Correlations aren&apos;t stable:</strong> Correlation estimated over a calm period frequently breaks down exactly when it matters most — during a crisis, when previously-diversifying assets often move together.</li>
          </ul>
        </SectionCard>

        {/* 5. Related & Advanced Topics */}
        <SectionCard title="Related & Advanced Topics" icon={Dice5} tone="accent">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Dice5 className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Monte Carlo Simulation</h4>
                <p>
                  The distributional assumptions estimated here (means, correlations, factor loadings) are exactly what
                  feeds a simulation&apos;s random-path generation — see{" "}
                  <Link href="/quant/topics/monte-carlo" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Monte Carlo Simulation <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Shield className="h-4 w-4 text-[#A8672E] dark:text-[#D08F52] shrink-0 mt-0.5" />
              <div>
                <h4>Risk Management</h4>
                <p>
                  Factor models built here are the backbone of portfolio-level risk decomposition — see{" "}
                  <Link href="/quant/topics/risk-management" className="underline underline-offset-2 hover:text-[#A8672E] dark:hover:text-[#D08F52] inline-flex items-center gap-0.5">
                    Risk Management <ArrowRight className="h-3 w-3" />
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </TopicDetailShell>
  );
}
