"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    Chart: any;
    comparisonChartInstance?: any;
  }
}

export default function DeepResearchTAvsMLTrading() {
  useEffect(() => {
    // Chart.js Radar Chart
    if (typeof window !== "undefined" && window.Chart) {
      const canvas = document.getElementById("comparisonChart") as HTMLCanvasElement | null;
      const ctx = canvas ? canvas.getContext("2d") : null;
      if (ctx) {
        if (window.comparisonChartInstance) {
          window.comparisonChartInstance.destroy();
        }
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
              },
            ],
          },
          options: {
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
      }
    }

    // Tabs
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

    // Synergy Buttons
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
<div class=\"text-gray-700 text-sm\">${data.content}</div>\
</div>\
`;
        }
        synergyButtons.forEach((btn) => {
          btn.classList.remove("bg-[#A67B5B]", "text-white");
          btn.classList.add("bg-white");
        });
        button.classList.add("bg-[#A67B5B]", "text-white");
        button.classList.remove("bg-white");
      });
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js" strategy="afterInteractive" />
      <main className="flex-1 antialiased bg-[#FDFBF8] text-gray-800">
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm rounded-xl mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4">
              <h1 className="text-2xl md:text-3xl font-bold text-[#A67B5B]">Technical Analysis vs. Machine Learning Trading</h1>
              <nav className="mt-2 md:mt-0">
                <ul className="flex space-x-6 text-sm font-medium">
                  <li><a href="#comparison" className="hover:text-[#A67B5B] transition-colors">Comparison</a></li>
                  <li><a href="#paradigms" className="hover:text-[#A67B5B] transition-colors">ML Paradigms</a></li>
                  <li><a href="#synergy" className="hover:text-[#A67B5B] transition-colors">Synergy &amp; Future</a></li>
                </ul>
              </nav>
            </div>
          </header>

          {/* Intro Section */}
          <section id="intro" className="text-center py-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Navigating Modern Markets</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              An interactive exploration of traditional Technical Analysis versus data-driven Machine Learning strategies. Discover the strengths, weaknesses, and future potential of each approach in today's complex financial landscape.
            </p>
          </section>

          {/* Comparison Section */}
          <section id="comparison" className="py-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900">Head-to-Head: TA vs. ML</h3>
              <p className="mt-2 text-md text-gray-500 max-w-2xl mx-auto">This section provides a direct comparison between Technical Analysis and Machine Learning across key attributes. The radar chart below offers a visual summary of their relative strengths, while the lists detail their core pros and cons. This allows for a quick, high-level understanding of where each methodology excels and falls short.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="chart-container mx-auto">
                <canvas id="comparisonChart"></canvas>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h4 className="text-xl font-semibold mb-3 text-green-700">Technical Analysis: Pros</h4>
                  <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                    <li>Accessible and low-cost to start</li>
                    <li>Provides intuitive visual framework</li>
                    <li>Fast for simple, short-term decisions</li>
                    <li>Offers clear rules for risk management</li>
                    <li>Versatile across assets and timeframes</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h4 className="text-xl font-semibold mb-3 text-red-700">Technical Analysis: Cons</h4>
                  <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                    <li>Highly subjective interpretation</li>
                    <li>Prone to false signals (whipsaws)</li>
                    <li>Ignores fundamentals and news</li>
                    <li>Limited scalability for complex analysis</li>
                    <li>Vulnerable to over-optimization</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h4 className="text-xl font-semibold mb-3 text-green-700">Machine Learning: Pros</h4>
                  <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                    <li>Superior pattern recognition in complex data</li>
                    <li>High speed and efficiency in execution</li>
                    <li>Adapts to changing market conditions</li>
                    <li>Emotion-free, objective decision-making</li>
                    <li>Highly scalable across many assets</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h4 className="text-xl font-semibold mb-3 text-red-700">Machine Learning: Cons</h4>
                  <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                    <li>Heavy dependency on high-quality data</li>
                    <li>High risk of overfitting to historical data</li>
                    <li>Complex, costly, and requires expertise</li>
                    <li>Interpretability issues ("black box")</li>
                    <li>Vulnerable to system failures/glitches</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ML Paradigms Section */}
          <section id="paradigms" className="py-16 bg-gray-50 rounded-xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900">Exploring ML Paradigms</h3>
              <p className="mt-2 text-md text-gray-500 max-w-2xl mx-auto">Machine learning is not a monolith. It encompasses several distinct approaches, each suited for different tasks. This section provides a deep dive into the three primary paradigms used in trading. Use the tabs to explore how each one works, its applications, and its specific advantages and disadvantages in the financial markets.</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-8 rounded-lg p-1 bg-[#EFEAE6]">
                <button className="tab-btn tab-active w-1/3 py-2 px-4 rounded-md text-sm font-semibold transition-all" data-tab="supervised">Supervised</button>
                <button className="tab-btn tab-inactive w-1/3 py-2 px-4 rounded-md text-sm font-semibold transition-all" data-tab="unsupervised">Unsupervised</button>
                <button className="tab-btn tab-inactive w-1/3 py-2 px-4 rounded-md text-sm font-semibold transition-all" data-tab="reinforcement">Reinforcement</button>
              </div>
              <div id="supervised" className="tab-content">
                <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-lg shadow-lg">
                  <div>
                    <h4 className="text-2xl font-bold text-[#A67B5B] mb-3">Supervised Learning</h4>
                    <p className="text-sm text-gray-600 mb-4">Learns from labeled historical data to make predictions. The model is trained on inputs (e.g., indicators, price history) paired with known outputs (e.g., 'price went up').</p>
                    <strong className="text-sm">Use Cases:</strong><p className="text-sm text-gray-600 mb-4">Price trend prediction, sentiment analysis, risk assessment.</p>
                    <strong className="text-sm">Pros:</strong><p className="text-sm text-gray-600 mb-2">Directly predictive, well-established algorithms.</p>
                    <strong className="text-sm">Cons:</strong><p className="text-sm text-gray-600">Needs vast labeled data, prone to overfitting, struggles with novel market conditions.</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg h-full">
                    <div className="flex items-center space-x-2">
                      <div className="text-center">
                        <div className="icon-box bg-blue-100 text-blue-600">📈</div>
                        <p className="text-xs mt-1">Data + Label</p>
                      </div>
                      <div className="text-5xl font-thin text-gray-300">→</div>
                      <div className="p-4 border-2 border-dashed border-gray-400 rounded-lg text-center">
                        <p className="font-mono font-bold text-lg text-gray-700">Model(x)</p>
                      </div>
                      <div className="text-5xl font-thin text-gray-300">→</div>
                      <div className="text-center">
                        <div className="icon-box bg-green-100 text-green-600">🎯</div>
                        <p className="text-xs mt-1">Prediction</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4 italic">Learning from a known answer key.</p>
                  </div>
                </div>
              </div>
              <div id="unsupervised" className="tab-content content-hidden">
                <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-lg shadow-lg">
                  <div>
                    <h4 className="text-2xl font-bold text-[#A67B5B] mb-3">Unsupervised Learning</h4>
                    <p className="text-sm text-gray-600 mb-4">Finds hidden patterns or structures in unlabeled data. It groups data points without any predefined target.</p>
                    <strong className="text-sm">Use Cases:</strong><p className="text-sm text-gray-600 mb-4">Market regime detection, asset clustering, anomaly detection.</p>
                    <strong className="text-sm">Pros:</strong><p className="text-sm text-gray-600 mb-2">No data labeling needed, discovers novel patterns.</p>
                    <strong className="text-sm">Cons:</strong><p className="text-sm text-gray-600">Results can be hard to interpret, validation is difficult.</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg h-full">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-4 h-4 rounded-full bg-red-400"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                        <div className="w-4 h-4 rounded-full bg-red-300"></div>
                        <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-300"></div>
                      </div>
                      <div className="text-5xl font-thin text-gray-300">→</div>
                      <div className="p-4 border-2 border-dashed border-gray-400 rounded-lg text-center">
                        <p className="font-mono font-bold text-lg text-gray-700">Cluster(x)</p>
                      </div>
                      <div className="text-5xl font-thin text-gray-300">→</div>
                      <div className="flex space-x-2">
                        <div className="flex flex-col space-y-1"><div className="w-4 h-4 rounded-full bg-red-400"></div><div className="w-4 h-4 rounded-full bg-red-300"></div></div>
                        <div className="flex flex-col space-y-1"><div className="w-4 h-4 rounded-full bg-blue-400"></div><div className="w-4 h-4 rounded-full bg-blue-300"></div></div>
                        <div className="flex flex-col space-y-1"><div className="w-4 h-4 rounded-full bg-yellow-400"></div></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4 italic">Finding hidden groups in the data.</p>
                  </div>
                </div>
              </div>
              <div id="reinforcement" className="tab-content content-hidden">
                <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-lg shadow-lg">
                  <div>
                    <h4 className="text-2xl font-bold text-[#A67B5B] mb-3">Reinforcement Learning</h4>
                    <p className="text-sm text-gray-600 mb-4">An 'agent' learns by interacting with an environment through trial and error, seeking to maximize a cumulative reward.</p>
                    <strong className="text-sm">Use Cases:</strong><p className="text-sm text-gray-600 mb-4">Dynamic strategy optimization, portfolio management, optimal execution.</p>
                    <strong className="text-sm">Pros:</strong><p className="text-sm text-gray-600 mb-2">Optimizes for long-term goals, highly adaptive policies.</p>
                    <strong className="text-sm">Cons:</strong><p className="text-sm text-gray-600">Needs vast interaction (sample inefficient), reward design is difficult.</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg h-full">
                    <div className="flex items-center space-x-2">
                      <div className="text-center">
                        <div className="icon-box bg-purple-100 text-purple-600">🤖</div>
                        <p className="text-xs mt-1">Agent</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-xs">Action</p>
                        <div className="text-2xl font-thin text-gray-400">→</div>
                        <div className="text-2xl font-thin text-gray-400">←</div>
                        <p className="text-xs">Reward/State</p>
                      </div>
                      <div className="text-center">
                        <div className="icon-box bg-yellow-100 text-yellow-600">🌍</div>
                        <p className="text-xs mt-1">Environment</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4 italic">Learning from consequences.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Synergy Section */}
          <section id="synergy" className="py-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900">Synergy: Can ML Replace TA?</h3>
              <p className="mt-2 text-md text-gray-500 max-w-2xl mx-auto">Rather than a replacement, the future points towards a powerful synergy. Machine Learning can augment, automate, and refine many traditional Technical Analysis functions. Click on the TA functions below to see how different ML paradigms can be applied, revealing a more nuanced relationship than simple substitution.</p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <button className="synergy-btn p-3 bg-white rounded-lg shadow-md text-sm font-semibold border-2 border-transparent focus:border-[#A67B5B] focus:ring-2 focus:ring-[#A67B5B]/50" data-synergy="trend">Trend Identification</button>
                <button className="synergy-btn p-3 bg-white rounded-lg shadow-md text-sm font-semibold border-2 border-transparent focus:border-[#A67B5B] focus:ring-2 focus:ring-[#A67B5B]/50" data-synergy="pattern">Pattern Recognition</button>
                <button className="synergy-btn p-3 bg-white rounded-lg shadow-md text-sm font-semibold border-2 border-transparent focus:border-[#A67B5B] focus:ring-2 focus:ring-[#A67B5B]/50" data-synergy="signal">Indicator Signals</button>
                <button className="synergy-btn p-3 bg-white rounded-lg shadow-md text-sm font-semibold border-2 border-transparent focus:border-[#A67B5B] focus:ring-2 focus:ring-[#A67B5B]/50" data-synergy="sr">Support/Resistance</button>
                <button className="synergy-btn p-3 bg-white rounded-lg shadow-md text-sm font-semibold border-2 border-transparent focus:border-[#A67B5B] focus:ring-2 focus:ring-[#A67B5B]/50" data-synergy="volatility">Volatility Assessment</button>
                <button className="synergy-btn p-3 bg-white rounded-lg shadow-md text-sm font-semibold border-2 border-transparent focus:border-[#A67B5B] focus:ring-2 focus:ring-[#A67B5B]/50" data-synergy="volume">Volume Analysis</button>
              </div>
              <div id="synergy-display" className="bg-white p-8 rounded-lg shadow-xl min-h-[250px] transition-all duration-300">
                <p className="text-gray-500 text-center italic">Select a Technical Analysis function above to see how ML enhances it.</p>
              </div>
            </div>
          </section>

          {/* Google Doc Link */}
          <div className="text-center mt-12">
            <a
              href="https://docs.google.com/document/d/e/2PACX-1vTgDx1bHxlh7TPZ9e1mrBkPGKYSu25L2ju5K142JniqOrxR_8BLOkTyleG-nicehKOxOAF8aKBOZ5uR/pub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow hover:from-purple-700 hover:to-indigo-700 transition-colors text-lg"
            >
              Read Full Document
            </a>
          </div>
        </div>
      </main>
      <Disclaimer />
      <style jsx global>{`
        .chart-container { position: relative; width: 100%; max-width: 600px; margin-left: auto; margin-right: auto; height: 300px; max-height: 400px; }
        @media (min-width: 768px) { .chart-container { height: 400px; } }
        .tab-active { background-color: #A67B5B; color: #FFFFFF; }
        .tab-inactive { background-color: #EFEAE6; color: #3D3D3D; }
        .content-hidden { display: none; }
        .fade-in { animation: fadeIn 0.5s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .interactive-box { transition: all 0.3s ease; }
        .interactive-box:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); }
        .icon-box { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
      `}</style>
    </div>
  );
} 