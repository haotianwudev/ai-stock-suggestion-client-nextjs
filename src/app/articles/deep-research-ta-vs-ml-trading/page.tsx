'use client';

import Script from "next/script";
import { useEffect, useState } from "react";
import { ArticleFrame } from '@/components/articles/article-frame';

declare global {
  interface Window {
    Chart: any;
    comparisonChartInstance?: any;
  }
}

export default function DeepResearchTAvsMLTrading() {
  const [chartLibLoaded, setChartLibLoaded] = useState(false);

  const initializeChart = () => {
    if (typeof window !== "undefined" && window.Chart) {
      const canvas = document.getElementById("comparisonChart") as HTMLCanvasElement | null;
      const ctx = canvas ? canvas.getContext("2d") : null;

      if (ctx) {
        if (window.comparisonChartInstance) {
          window.comparisonChartInstance.destroy();
        }

        try {
          window.comparisonChartInstance = new window.Chart(ctx, {
            type: "radar",
            data: {
              labels: [
                "Speed",
                "Accuracy Potential",
                "Adaptability",
                "Scalability",
                "Interpretability",
                "Cost/Complexity",
              ],
              datasets: [
                {
                  label: "Technical Analysis",
                  data: [4, 2, 2, 2, 4, 5],
                  backgroundColor: "rgba(217, 119, 6, 0.2)",
                  borderColor: "rgba(217, 119, 6, 1)",
                  pointBackgroundColor: "rgba(217, 119, 6, 1)",
                  pointBorderColor: "#fff",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(217, 119, 6, 1)",
                  borderWidth: 2,
                },
                {
                  label: "Machine Learning",
                  data: [5, 4, 5, 5, 2, 1],
                  backgroundColor: "rgba(166, 123, 91, 0.3)",
                  borderColor: "rgba(166, 123, 91, 1)",
                  pointBackgroundColor: "rgba(166, 123, 91, 1)",
                  pointBorderColor: "#fff",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(166, 123, 91, 1)",
                  borderWidth: 2,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                r: {
                  angleLines: { color: "rgba(0, 0, 0, 0.1)" },
                  grid: { color: "rgba(0, 0, 0, 0.1)" },
                  pointLabels: { font: { size: 12 } },
                  suggestedMin: 0,
                  suggestedMax: 5,
                  ticks: {
                    backdropColor: "rgba(255, 255, 255, 0.75)",
                    stepSize: 1,
                  },
                },
              },
              plugins: {
                legend: { position: "top" },
                tooltip: {
                  callbacks: {
                    label: function (context: any) {
                      let label = context.dataset.label || "";
                      if (label) {
                        label += ": ";
                      }
                      const value = context.parsed.r;
                      const labels = [
                        "Very Low",
                        "Low",
                        "Medium",
                        "High",
                        "Very High",
                      ];
                      label += labels[value - 1] || value;
                      return label;
                    },
                  },
                },
              },
            },
          });
        } catch (error) {
          console.error("Error initializing chart:", error);
        }
      }
    }
  };

  useEffect(() => {
    if (chartLibLoaded && window.Chart) {
      setTimeout(initializeChart, 100);
    }

    if (!chartLibLoaded && window.Chart) {
      setChartLibLoaded(true);
    }

    const tabs = document.querySelectorAll<HTMLButtonElement>(".tab-btn");
    const contents = document.querySelectorAll<HTMLElement>(".tab-content");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => {
          t.classList.remove("tab-active");
          t.classList.add("tab-inactive");
        });
        tab.classList.add("tab-active");
        tab.classList.remove("tab-inactive");
        contents.forEach((content) => {
          content.classList.add("content-hidden");
        });
        const activeContent = document.getElementById(tab.dataset.tab!);
        if (activeContent) {
          activeContent.classList.remove("content-hidden");
          activeContent.classList.add("fade-in");
        }
      });
    });

    const synergyData: Record<string, { title: string; content: string }> = {
      trend: {
        title: "Augmenting Trend Identification",
        content: `\
<p class=\"mb-4\">While TA uses visual trendlines, ML offers a more data-driven approach:</p>\
<ul class=\"space-y-3\">\
<li><strong>Supervised:</strong> Models can be trained on labeled data to classify market trends (uptrend, downtrend, sideways) with statistical probabilities, moving beyond subjective line-drawing.</li>\
<li><strong>Unsupervised:</strong> Clustering algorithms can autonomously identify distinct market 'regimes' (e.g., high-trend vs. low-trend environments) to help traders select the appropriate strategy.</li>\
<li><strong>Reinforcement:</strong> An RL agent can learn a policy to optimally trade with or against trends to maximize long-term returns, effectively discovering dynamic trend-following rules.</li>\
</ul>\
`,
      },
      pattern: {
        title: "Automating Pattern Recognition",
        content: `\
<p class=\"mb-4\">ML can automate and enhance the classic TA task of finding chart patterns:</p>\
<ul class=\"space-y-3\">\
<li><strong>Supervised:</strong> Convolutional Neural Networks (CNNs), often used for image recognition, can be trained on chart images to automatically detect patterns like Head & Shoulders or Triangles, and even discover new, previously unknown predictive patterns.</li>\
<li><strong>Unsupervised:</strong> Anomaly detection can flag when price action breaks from a recurring pattern, signaling a potential trading opportunity.</li>\
</ul>\
`,
      },
      signal: {
        title: "Refining Indicator Signals",
        content: `\
<p class=\"mb-4\">ML models can interpret signals from classic indicators like MACD or RSI with more nuance:</p>\
<ul class=\"space-y-3\">\
<li><strong>Supervised:</strong> Instead of relying on a fixed 'overbought' level like RSI > 70, a model can learn the optimal, dynamic thresholds based on current volatility and other factors, reducing false signals. It can also find complex, non-linear relationships between multiple indicators.</li>\
<li><strong>Reinforcement:</strong> An RL agent can use indicator values as inputs and learn to combine them in a way that maximizes a reward function, essentially creating a superior, adaptive set of trading rules.</li>\
</ul>\
`,
      },
      sr: {
        title: "Dynamic Support & Resistance",
        content: `\
<p class=\"mb-4\">Instead of static, hand-drawn lines, ML can identify dynamic S/R zones:</p>\
<ul class=\"space-y-3\">\
<li><strong>Unsupervised:</strong> Clustering algorithms (like density-based clustering) can analyze price data to find areas where price has historically congregated, identifying statistically significant support or resistance zones that are more objective than manual lines.</li>\
<li><strong>Reinforcement:</strong> An agent can learn to trade around these identified zones, probing for bounces or breakouts and adapting its strategy based on the real-time price reaction.</li>\
</ul>\
`,
      },
      volatility: {
        title: "Sophisticated Volatility Assessment",
        content: `\
<p class=\"mb-4\">ML provides advanced methods for understanding and predicting market volatility:</p>\
<ul class=\"space-y-3\">\
<li><strong>Supervised:</strong> Models like GARCH (often combined with ML) or LSTMs can forecast future volatility with greater accuracy than simple indicators like Bollinger Bands width.</li>\
<li><strong>Unsupervised:</strong> Clustering can automatically segment the market into high-volatility and low-volatility regimes, helping traders to adjust their risk exposure accordingly.</li>\
<li><strong>Reinforcement:</strong> An RL agent can learn to dynamically alter its position sizing or stop-loss placement based on the current volatility state to optimize its risk-adjusted returns.</li>\
</ul>\
`,
      },
      volume: {
        title: "Nuanced Volume Analysis",
        content: `\
<p class=\"mb-4\">ML can interpret volume data far more effectively than simple observation:</p>\
<ul class=\"space-y-3\">\
 <li><strong>Supervised:</strong> Models can learn to predict the probability of a trend continuing or reversing based on the precise characteristics of a volume spike combined with dozens of other features, going beyond simple confirmation.</li>\
<li><strong>Unsupervised:</strong> Anomaly detection algorithms are perfectly suited to objectively identify statistically significant volume spikes that deviate from normal market activity, flagging them for further analysis.</li>\
</ul>\
`,
      },
    };
    const synergyButtons = document.querySelectorAll<HTMLButtonElement>(".synergy-btn");
    const synergyDisplay = document.getElementById("synergy-display");
    synergyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.dataset.synergy!;
        const data = synergyData[key];
        if (synergyDisplay && data) {
          synergyDisplay.innerHTML = `\
<div class=\"fade-in\">\
<h4 class=\"text-2xl font-bold text-[#A67B5B] mb-4\">${data.title}</h4>\
<div class=\"text-gray-700 dark:text-gray-300 text-sm\">${data.content}</div>\
</div>\
`;
        }
        synergyButtons.forEach((btn) => {
          btn.classList.remove("bg-[#A67B5B]", "text-white");
          btn.classList.add("bg-white dark:bg-[#0A0D14]", "dark:bg-gray-800");
        });
        button.classList.add("bg-[#A67B5B]", "text-white");
        button.classList.remove("bg-white dark:bg-[#0A0D14]", "dark:bg-gray-800");
      });
    });
  }, [chartLibLoaded]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        strategy="beforeInteractive"
        onLoad={() => setChartLibLoaded(true)}
      />

      <ArticleFrame slug="deep-research-ta-vs-ml-trading">
        <div className="space-y-16">
          {/* Comparison Section */}
          <section id="comparison">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Head-to-Head: TA vs. ML</h3>
              <p className="mt-2 text-md text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">This section provides a direct comparison between Technical Analysis and Machine Learning across key attributes. The radar chart below offers a visual summary of their relative strengths, while the lists detail their core pros and cons. This allows for a quick, high-level understanding of where each methodology excels and falls short.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="chart-container mx-auto relative">
                <canvas id="comparisonChart"></canvas>
                {!chartLibLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">Loading chart...</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-semibold mb-3 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Technical Analysis: Pros</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                    <li>Accessible and low-cost to start</li>
                    <li>Provides intuitive visual framework</li>
                    <li>Fast for simple, short-term decisions</li>
                    <li>Offers clear rules for risk management</li>
                    <li>Versatile across assets and timeframes</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-semibold mb-3 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Technical Analysis: Cons</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                    <li>Highly subjective interpretation</li>
                    <li>Prone to false signals (whipsaws)</li>
                    <li>Ignores fundamentals and news</li>
                    <li>Limited scalability for complex analysis</li>
                    <li>Vulnerable to over-optimization</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-semibold mb-3 text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Machine Learning: Pros</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                    <li>Superior pattern recognition in complex data</li>
                    <li>High speed and efficiency in execution</li>
                    <li>Adapts to changing market conditions</li>
                    <li>Emotion-free, objective decision-making</li>
                    <li>Highly scalable across many assets</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                  <h4 className="text-xl font-semibold mb-3 text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Machine Learning: Cons</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                    <li>Heavy dependency on high-quality data</li>
                    <li>High risk of overfitting to historical data</li>
                    <li>Complex, costly, and requires expertise</li>
                    <li>Interpretability issues (&ldquo;black box&rdquo;)</li>
                    <li>Vulnerable to system failures/glitches</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ML Paradigms Section */}
          <section id="paradigms" className="py-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="text-center mb-12 px-6">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Exploring ML Paradigms</h3>
              <p className="mt-2 text-md text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Machine learning is not a monolith. It encompasses several distinct approaches, each suited for different tasks. This section provides a deep dive into the three primary paradigms used in trading. Use the tabs to explore how each one works, its applications, and its specific advantages and disadvantages in the financial markets.</p>
            </div>
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex justify-center mb-8 rounded-lg p-1 bg-[#EFEAE6] dark:bg-gray-700">
                <button className="tab-btn tab-active w-1/3 py-2 px-4 rounded-md text-sm font-semibold transition-all" data-tab="supervised">Supervised</button>
                <button className="tab-btn tab-inactive w-1/3 py-2 px-4 rounded-md text-sm font-semibold transition-all" data-tab="unsupervised">Unsupervised</button>
                <button className="tab-btn tab-inactive w-1/3 py-2 px-4 rounded-md text-sm font-semibold transition-all" data-tab="reinforcement">Reinforcement</button>
              </div>
              <div id="supervised" className="tab-content">
                <div className="grid md:grid-cols-2 gap-8 items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                  <div>
                    <h4 className="text-2xl font-bold text-[#A67B5B] mb-3">Supervised Learning</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Learns from labeled historical data to make predictions. The model is trained on inputs (e.g., indicators, price history) paired with known outputs (e.g., &lsquo;price went up&rsquo;).</p>
                    <strong className="text-sm text-gray-900 dark:text-gray-200">Use Cases:</strong><p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Price trend prediction, sentiment analysis, risk assessment.</p>
                    <strong className="text-sm text-gray-900 dark:text-gray-200">Pros:</strong><p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Directly predictive, well-established algorithms.</p>
                    <strong className="text-sm text-gray-900 dark:text-gray-200">Cons:</strong><p className="text-sm text-gray-600 dark:text-gray-400">Needs vast labeled data, prone to overfitting, struggles with novel market conditions.</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg h-full">
                    <div className="flex items-center space-x-2">
                      <div className="text-center">
                        <div className="icon-box bg-blue-100 text-[#A8672E] dark:text-[#D08F52]">📈</div>
                        <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Data + Label</p>
                      </div>
                      <div className="text-5xl font-thin text-gray-300 dark:text-gray-600">→</div>
                      <div className="p-4 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg text-center">
                        <p className="font-mono font-bold text-lg text-gray-700 dark:text-gray-300">Model(x)</p>
                      </div>
                      <div className="text-5xl font-thin text-gray-300 dark:text-gray-600">→</div>
                      <div className="text-center">
                        <div className="icon-box bg-green-100 text-[#1D8A70] dark:text-[#3CBF9C]">🎯</div>
                        <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Prediction</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">Learning from a known answer key.</p>
                  </div>
                </div>
              </div>
              <div id="unsupervised" className="tab-content content-hidden">
                <div className="grid md:grid-cols-2 gap-8 items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                  <div>
                    <h4 className="text-2xl font-bold text-[#A67B5B] mb-3">Unsupervised Learning</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Finds hidden patterns or structures in unlabeled data. It groups data points without any predefined target.</p>
                    <strong className="text-sm text-gray-900 dark:text-gray-200">Use Cases:</strong><p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Market regime detection, asset clustering, anomaly detection.</p>
                    <strong className="text-sm text-gray-900 dark:text-gray-200">Pros:</strong><p className="text-sm text-gray-600 dark:text-gray-400 mb-2">No data labeling needed, discovers novel patterns.</p>
                    <strong className="text-sm text-gray-900 dark:text-gray-200">Cons:</strong><p className="text-sm text-gray-600 dark:text-gray-400">Results can be hard to interpret, validation is difficult.</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg h-full">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-4 h-4 rounded-full bg-[#BC4128] dark:bg-[#E2694A]"></div>
                        <div className="w-4 h-4 rounded-full bg-[#A8672E] dark:bg-[#D08F52]"></div>
                        <div className="w-4 h-4 rounded-full bg-red-300"></div>
                        <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-300"></div>
                      </div>
                      <div className="text-5xl font-thin text-gray-300 dark:text-gray-600">→</div>
                      <div className="p-4 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg text-center">
                        <p className="font-mono font-bold text-lg text-gray-700 dark:text-gray-300">Cluster(x)</p>
                      </div>
                      <div className="text-5xl font-thin text-gray-300 dark:text-gray-600">→</div>
                      <div className="flex space-x-2">
                        <div className="flex flex-col space-y-1"><div className="w-4 h-4 rounded-full bg-[#BC4128] dark:bg-[#E2694A]"></div><div className="w-4 h-4 rounded-full bg-red-300"></div></div>
                        <div className="flex flex-col space-y-1"><div className="w-4 h-4 rounded-full bg-[#A8672E] dark:bg-[#D08F52]"></div><div className="w-4 h-4 rounded-full bg-blue-300"></div></div>
                        <div className="flex flex-col space-y-1"><div className="w-4 h-4 rounded-full bg-yellow-400"></div></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">Finding hidden groups in the data.</p>
                  </div>
                </div>
              </div>
              <div id="reinforcement" className="tab-content content-hidden">
                <div className="grid md:grid-cols-2 gap-8 items-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                  <div>
                    <h4 className="text-2xl font-bold text-[#A67B5B] mb-3">Reinforcement Learning</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">An &lsquo;agent&rsquo; learns by interacting with an environment through trial and error, seeking to maximize a cumulative reward.</p>
                    <strong className="text-sm text-gray-900 dark:text-gray-200">Use Cases:</strong><p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Dynamic strategy optimization, portfolio management, optimal execution.</p>
                    <strong className="text-sm text-gray-900 dark:text-gray-200">Pros:</strong><p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Optimizes for long-term goals, highly adaptive policies.</p>
                    <strong className="text-sm text-gray-900 dark:text-gray-200">Cons:</strong><p className="text-sm text-gray-600 dark:text-gray-400">Needs vast interaction (sample inefficient), reward design is difficult.</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg h-full">
                    <div className="flex items-center space-x-2">
                      <div className="text-center">
                        <div className="icon-box bg-purple-100 text-purple-600">🤖</div>
                        <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Agent</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-xs text-gray-600 dark:text-gray-400">Action</p>
                        <div className="text-2xl font-thin text-gray-400 dark:text-gray-500">→</div>
                        <div className="text-2xl font-thin text-gray-400 dark:text-gray-500">←</div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Reward/State</p>
                      </div>
                      <div className="text-center">
                        <div className="icon-box bg-yellow-100 text-yellow-600">🌍</div>
                        <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Environment</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">Learning from consequences.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Synergy Section */}
          <section id="synergy">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Synergy: Can ML Replace TA?</h3>
              <p className="mt-2 text-md text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Rather than a replacement, the future points towards a powerful synergy. Machine Learning can augment, automate, and refine many traditional Technical Analysis functions. Click on the TA functions below to see how different ML paradigms can be applied, revealing a more nuanced relationship than simple substitution.</p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <button className="synergy-btn p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm font-semibold border-2 border-transparent focus:border-[#A67B5B] focus:ring-2 focus:ring-[#A67B5B]/50 text-gray-800 dark:text-gray-200" data-synergy="trend">Trend Identification</button>
                <button className="synergy-btn p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm font-semibold border-2 border-transparent focus:border-[#A67B5B] focus:ring-2 focus:ring-[#A67B5B]/50 text-gray-800 dark:text-gray-200" data-synergy="pattern">Pattern Recognition</button>
                <button className="synergy-btn p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm font-semibold border-2 border-transparent focus:border-[#A67B5B] focus:ring-2 focus:ring-[#A67B5B]/50 text-gray-800 dark:text-gray-200" data-synergy="signal">Indicator Signals</button>
                <button className="synergy-btn p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm font-semibold border-2 border-transparent focus:border-[#A67B5B] focus:ring-2 focus:ring-[#A67B5B]/50 text-gray-800 dark:text-gray-200" data-synergy="sr">Support/Resistance</button>
                <button className="synergy-btn p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm font-semibold border-2 border-transparent focus:border-[#A67B5B] focus:ring-2 focus:ring-[#A67B5B]/50 text-gray-800 dark:text-gray-200" data-synergy="volatility">Volatility Assessment</button>
                <button className="synergy-btn p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md text-sm font-semibold border-2 border-transparent focus:border-[#A67B5B] focus:ring-2 focus:ring-[#A67B5B]/50 text-gray-800 dark:text-gray-200" data-synergy="volume">Volume Analysis</button>
              </div>
              <div id="synergy-display" className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl min-h-[250px] transition-all duration-300">
                <p className="text-gray-500 dark:text-gray-400 text-center italic">Select a Technical Analysis function above to see how ML enhances it.</p>
              </div>
            </div>
          </section>
        </div>

        <style jsx global>{`
          .chart-container { position: relative; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto; height: 300px; max-height: 400px; }
          @media (min-width: 768px) { .chart-container { height: 400px; } }
          .tab-active { background-color: #A67B5B; color: #FFFFFF; }
          .tab-inactive { background-color: #EFEAE6; color: #3D3D3D; }
          .content-hidden { display: none; }
          .fade-in { animation: fadeIn 0.5s ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .icon-box { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
        `}</style>
      </ArticleFrame>
    </>
  );
}
