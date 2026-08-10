'use client';

import { useEffect, useRef } from "react";
import Script from "next/script";
import { ArticleFrame } from '@/components/articles/article-frame';

declare global {
  interface Window {
    Chart: any;
  }
}

export default function AppleInvestmentThesis() {
  const shareChartRef = useRef<any>(null);
  const yieldChartRef = useRef<any>(null);

  useEffect(() => {
    const appData = {
      quality: {
        roic: '56.7%',
        gpm: '47.1%',
        shareCount: {
          labels: ['2014', '2016', '2018', '2020', '2022', '2024'],
          data: [26.0, 24.5, 21.5, 17.5, 16.0, 15.4]
        },
      },
      valuation: {
        peRatio: '30.5x',
        fcfYield: '3.3%',
        treasuryYield: '4.5%',
        marginOfSafety: '~50.3% Premium'
      },
      risks: [
        {
          title: "Geopolitical & Tariff Risk",
          icon: "🌍",
          content: "Significant reliance on China for manufacturing exposes Apple to trade tensions. A 25% tariff could translate to a 5% iPhone price increase or a ~$0.20 EPS impact. The company is diversifying its supply chain to India and Vietnam to mitigate this, but operational uncertainty remains a drag."
        },
        {
          title: "Antitrust & Regulatory Headwinds",
          icon: "⚖️",
          content: "Apple faces global scrutiny over its App Store policies and 'walled garden' ecosystem. Fines have already been imposed in the EU. A successful antitrust action forcing Apple to open its ecosystem could erode high-margin services revenue and diminish the switching costs that are central to its moat."
        },
        {
          title: "Loss of Google TAC Revenue",
          icon: "💸",
          content: "A material financial risk is the potential loss of the $18-$20 billion annual payment from Google to be the default search engine. This high-margin revenue accounts for an estimated 14-16% of Apple's operating income. Its loss could reduce EPS by approximately $0.92, a ~14% hit."
        }
      ]
    };

    if (typeof document !== 'undefined') {
      const roicElement = document.getElementById('roic');
      const gpmElement = document.getElementById('gpm');
      const peRatioElement = document.getElementById('pe-ratio');
      const fcfYieldElement = document.getElementById('fcf-yield-card');
      const marginOfSafetyElement = document.getElementById('margin-of-safety');

      if (roicElement) roicElement.textContent = appData.quality.roic;
      if (gpmElement) gpmElement.textContent = appData.quality.gpm;
      if (peRatioElement) peRatioElement.textContent = appData.valuation.peRatio;
      if (fcfYieldElement) fcfYieldElement.textContent = appData.valuation.fcfYield;
      if (marginOfSafetyElement) marginOfSafetyElement.textContent = appData.valuation.marginOfSafety;

      if (shareChartRef.current) {
        shareChartRef.current.destroy();
        shareChartRef.current = null;
      }
      if (yieldChartRef.current) {
        yieldChartRef.current.destroy();
        yieldChartRef.current = null;
      }

      const shareCountCanvas = document.getElementById('shareCountChart') as HTMLCanvasElement | null;
      if (shareCountCanvas && window.Chart) {
        const shareCtx = shareCountCanvas.getContext('2d');
        if (shareCtx) {
          shareChartRef.current = new window.Chart(shareCtx, {
            type: 'line',
            data: {
              labels: appData.quality.shareCount.labels,
              datasets: [{
                label: 'Shares Outstanding (Billions)',
                data: appData.quality.shareCount.data,
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                fill: true,
                tension: 0.3
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                title: { display: true, text: 'Share Count Reduction Over Time', padding: { bottom: 10 } }
              },
              scales: {
                y: {
                  beginAtZero: false,
                  title: { display: true, text: 'Shares (Billions)' }
                }
              }
            }
          });
        }
      }

      const yieldChartCanvas = document.getElementById('yieldChart') as HTMLCanvasElement | null;
      if (yieldChartCanvas && window.Chart) {
        const yieldCtx = yieldChartCanvas.getContext('2d');
        if (yieldCtx) {
          yieldChartRef.current = new window.Chart(yieldCtx, {
            type: 'bar',
            data: {
              labels: ["Apple FCF Yield", "10-Year US Treasury"],
              datasets: [{
                label: 'Yield Comparison',
                data: [parseFloat(appData.valuation.fcfYield), parseFloat(appData.valuation.treasuryYield)],
                backgroundColor: [
                  'rgba(220, 38, 38, 0.6)',
                  'rgba(59, 130, 246, 0.6)'
                ],
                borderColor: [
                  'rgb(220, 38, 38)',
                  'rgb(59, 130, 246)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: 'y',
              plugins: {
                legend: { display: false },
                title: { display: true, text: 'Investment Yield vs. Risk-Free Rate', padding: { bottom: 10 } }
              },
              scales: {
                x: {
                  ticks: {
                    callback: function(value: any) {
                      return value + '%';
                    }
                  }
                }
              }
            }
          });
        }
      }

      const moatDiagram = document.getElementById('moat-diagram');
      if (moatDiagram) {
        moatDiagram.addEventListener('mouseover', function(e) {
          const target = e.target as HTMLElement;
          const segment = target.closest('.moat-segment');
          if (segment) {
            const detail = segment.querySelector('p');
            if (detail) detail.classList.remove('hidden');
          }
        });

        moatDiagram.addEventListener('mouseout', function(e) {
          const target = e.target as HTMLElement;
          const segment = target.closest('.moat-segment');
          if (segment) {
            const detail = segment.querySelector('p');
            if (detail) detail.classList.add('hidden');
          }
        });
      }

      const tabs = document.querySelectorAll('.tab-button');
      const tabContents = document.querySelectorAll('.tab-content');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const targetTab = (tab as HTMLElement).dataset.tab;

          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          tabContents.forEach(content => {
            if (content.id === `${targetTab}-content`) {
              content.classList.remove('hidden');
            } else {
              content.classList.add('hidden');
            }
          });
        });
      });

      const accordionContainer = document.getElementById('accordion-container');
      if (accordionContainer) {
        appData.risks.forEach((risk) => {
          const item = document.createElement('div');
          item.className = 'border border-stone-200 dark:border-gray-700 rounded-lg';
          item.innerHTML = `
            <button class="accordion-button w-full flex justify-between items-center text-left p-4 bg-stone-50 dark:bg-gray-800 hover:bg-stone-100 dark:hover:bg-gray-700 focus:outline-none">
              <span class="font-semibold text-stone-700 dark:text-gray-200">${risk.icon} ${risk.title}</span>
              <span class="transform transition-transform duration-300">▼</span>
            </button>
            <div class="accordion-content">
              <p class="p-4 text-sm text-stone-600 dark:text-gray-400">${risk.content}</p>
            </div>
          `;
          accordionContainer.appendChild(item);
        });

        accordionContainer.addEventListener('click', function(e) {
          const target = e.target as HTMLElement;
          const button = target.closest('.accordion-button');
          if (button) {
            const content = button.nextElementSibling as HTMLElement;
            const arrow = button.querySelector('span:last-child') as HTMLElement;

            if (content.style.maxHeight) {
              content.style.maxHeight = '';
              arrow.style.transform = 'rotate(0deg)';
            } else {
              document.querySelectorAll('.accordion-content').forEach(el => (el as HTMLElement).style.maxHeight = '');
              document.querySelectorAll('.accordion-button span:last-child').forEach(el => (el as HTMLElement).style.transform = 'rotate(0deg)');
              content.style.maxHeight = content.scrollHeight + "px";
              arrow.style.transform = 'rotate(180deg)';
            }
          }
        });
      }
    }

    return () => {
      if (shareChartRef.current) {
        shareChartRef.current.destroy();
        shareChartRef.current = null;
      }
      if (yieldChartRef.current) {
        yieldChartRef.current.destroy();
        yieldChartRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        strategy="beforeInteractive"
      />

      <ArticleFrame slug="gemini-deep-research-aapl">
        <style jsx global>{`
          .chart-container {
            position: relative;
            height: 280px;
            max-height: 300px;
            width: 100%;
            max-width: 500px;
            margin: auto;
          }
          @media (min-width: 640px) {
            .chart-container {
              height: 320px;
              max-height: 350px;
            }
          }
          .moat-segment {
            transition: all 0.3s ease-in-out;
            cursor: pointer;
          }
          .moat-segment:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          .tab-button.active {
            border-color: #4A6C8C;
            color: #4A6C8C;
            font-weight: 700;
          }
          .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease-out;
          }
        `}</style>

        <div className="text-center mb-8">
          <div id="final-signal" className="inline-flex items-center bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-lg font-bold px-6 py-3 rounded-full shadow-md">
            <span className="mr-3">⚖️</span>
            Overall Thesis: Neutral
          </div>
        </div>

        <section id="thesis-balance" className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-white mb-2 font-serif">The Quality vs. Price Dilemma</h2>
            <p className="max-w-3xl mx-auto text-stone-600 dark:text-gray-400">
              This analysis presents the central conflict in evaluating Apple today: it is an undeniably wonderful business, yet it trades at a price that appears to offer little-to-no margin of safety. This interactive dashboard allows you to explore both sides of the argument&mdash;the exceptional quality of the enterprise and the steepness of its market valuation&mdash;to understand the &ldquo;neutral&rdquo; investment thesis.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-[#0A0D14]/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg border border-stone-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-green-800 dark:text-[#1D8A70] dark:text-[#3CBF9C] mb-4 text-center font-serif">✅ The Wonderful Business Case</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2 text-stone-700 dark:text-gray-200">Exceptional Financial Fortitude</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]" id="roic"></div>
                      <div className="text-sm text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Return on Invested Capital</div>
                    </div>
                    <div className="bg-[#1D8A70]/10 dark:bg-[#3CBF9C]/10 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]" id="gpm"></div>
                      <div className="text-sm text-[#1D8A70] dark:text-[#3CBF9C] dark:text-[#1D8A70] dark:text-[#3CBF9C]">Gross Profit Margin</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-3 text-stone-700 dark:text-gray-200">The Formidable Economic Moat</h4>
                  <div id="moat-diagram" className="relative space-y-2">
                    <div className="moat-segment bg-stone-100 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-sky-600" data-moat="brand">
                      <h5 className="font-bold text-sky-800 dark:text-sky-400">Brand & Intangibles</h5>
                      <p className="text-sm text-stone-600 dark:text-gray-400 hidden">One of the world&apos;s most valuable brands, synonymous with quality and innovation, enabling premium pricing.</p>
                    </div>
                    <div className="moat-segment bg-stone-100 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-[#A8672E] dark:border-[#D08F52]" data-moat="ecosystem">
                      <h5 className="font-bold text-indigo-800 dark:text-[#A8672E] dark:text-[#D08F52]">Integrated Ecosystem</h5>
                      <p className="text-sm text-stone-600 dark:text-gray-400 hidden">Hardware, software, and services create a &ldquo;walled garden&rdquo; with high switching costs for consumers.</p>
                    </div>
                    <div className="moat-segment bg-stone-100 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-purple-600" data-moat="network">
                      <h5 className="font-bold text-purple-800 dark:text-purple-400">Network Effects</h5>
                      <p className="text-sm text-stone-600 dark:text-gray-400 hidden">The App Store and services like iMessage become more valuable as the user base grows, attracting more developers and users.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2 text-stone-700 dark:text-gray-200">Shareholder-Friendly Capital Allocation</h4>
                  <div className="chart-container">
                    <canvas id="shareCountChart"></canvas>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0A0D14]/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg border border-stone-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-red-800 dark:text-[#BC4128] dark:text-[#E2694A] mb-4 text-center font-serif">❌ The Unfair Price Case</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2 text-stone-700 dark:text-gray-200">Stretched Valuation Metrics</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/20 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]" id="pe-ratio"></div>
                      <div className="text-sm text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Price-to-Earnings (TTM)</div>
                    </div>
                    <div className="bg-[#BC4128]/10 dark:bg-[#E2694A]/10 dark:bg-red-900/20 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]" id="fcf-yield-card"></div>
                      <div className="text-sm text-[#BC4128] dark:text-[#E2694A] dark:text-[#BC4128] dark:text-[#E2694A]">Free Cash Flow Yield</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2 text-stone-700 dark:text-gray-200">Opportunity Cost: Yield Comparison</h4>
                  <div className="chart-container">
                    <canvas id="yieldChart"></canvas>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2 text-stone-700 dark:text-gray-200">Margin of Safety: The Core Concern</h4>
                  <div className="bg-stone-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div id="margin-of-safety" className="text-2xl font-bold text-red-800 dark:text-[#BC4128] dark:text-[#E2694A] mb-1">~50% Premium</div>
                    <p className="text-sm text-stone-600 dark:text-gray-400">The current price is significantly above a conservative estimate of intrinsic value, violating the cardinal rule of demanding a margin of safety. This leaves no room for error and limits upside potential.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="future-outlook" className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-white mb-2 font-serif">Future Catalysts & Headwinds</h2>
            <p className="max-w-3xl mx-auto text-stone-600 dark:text-gray-400">
              An investment in Apple today is a bet on its future. The company&apos;s growth trajectory depends on major initiatives like Apple Intelligence, but it also faces significant risks from regulation and geopolitics. Explore the key factors that will shape Apple&apos;s performance in the years to come.
            </p>
          </div>
          <div className="bg-white dark:bg-[#0A0D14]/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg border border-stone-200 dark:border-gray-700">
            <div className="border-b border-stone-300 dark:border-gray-600 mb-4">
              <nav className="flex space-x-4" aria-label="Tabs">
                <button className="tab-button active py-2 px-4 border-b-2 text-lg text-stone-700 dark:text-gray-300" data-tab="growth">Growth Drivers</button>
                <button className="tab-button py-2 px-4 border-b-2 border-transparent text-lg text-stone-700 dark:text-gray-300" data-tab="risks">Material Risks</button>
              </nav>
            </div>

            <div id="growth-content" className="tab-content">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-stone-800 dark:text-white font-serif">🚀 Innovation as the Engine</h3>
                <p className="text-stone-700 dark:text-gray-300">Apple&apos;s future is tied to its ability to innovate. &ldquo;Apple Intelligence&rdquo; is the centerpiece of this strategy, with the potential to trigger a significant iPhone upgrade cycle. The success of this AI integration, alongside growth in Services and new categories like Vision Pro, is crucial to justifying the current valuation.</p>
                <div className="grid md:grid-cols-2 gap-6 pt-4">
                  <div className="bg-stone-50 dark:bg-gray-700/50 p-4 rounded-lg border border-stone-200 dark:border-gray-600">
                    <h4 className="font-semibold text-lg text-blue-800 dark:text-[#A8672E] dark:text-[#D08F52]">Apple Intelligence (AI)</h4>
                    <p className="text-sm text-stone-600 dark:text-gray-400">Positioned as a key catalyst, focusing on a privacy-first, on-device approach. Success hinges on driving a hardware refresh cycle and offering a differentiated user experience.</p>
                  </div>
                  <div className="bg-stone-50 dark:bg-gray-700/50 p-4 rounded-lg border border-stone-200 dark:border-gray-600">
                    <h4 className="font-semibold text-lg text-green-800 dark:text-[#1D8A70] dark:text-[#3CBF9C]">Services Growth</h4>
                    <p className="text-sm text-stone-600 dark:text-gray-400">Continues to be a high-margin growth engine, achieving record revenues. Its expansion is critical for overall profitability and margin improvement.</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="risks-content" className="tab-content hidden">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-stone-800 dark:text-white font-serif">⛈️ Navigating Storm Clouds</h3>
                <p className="text-stone-700 dark:text-gray-300">Even a fortress like Apple faces threats. Geopolitical tensions could disrupt its supply chain, while intensifying regulatory scrutiny targets the core of its profitable ecosystem. These external pressures represent significant uncertainties that could impact future earnings and valuation.</p>
                <div id="accordion-container" className="space-y-2">
                  {/* Accordion items will be dynamically inserted by JavaScript */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center pt-8 border-t border-stone-200 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-white mb-4 font-serif">Conclusion: A Disciplined &ldquo;Neutral&rdquo; Stance</h2>
          <p className="max-w-3xl mx-auto text-stone-600 dark:text-gray-400 mb-6">
            Apple is a textbook example of a wonderful enterprise. The data clearly shows its financial strength and durable competitive moat. However, value investing principles demand a disciplined approach to price. The current valuation, with its low cash yield and absent margin of safety, makes a new investment difficult to justify. The rational course of action is patience: admire the quality of the business, but wait for a more sensible price to emerge.
          </p>
          <div className="inline-block bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-stone-200 dark:border-gray-700">
            <h3 className="font-bold text-lg text-stone-700 dark:text-gray-200 mb-3 font-serif">Core Recommendation</h3>
            <p className="text-stone-600 dark:text-gray-400">MAINTAIN PATIENCE & MONITOR KEY VARIABLES</p>
          </div>
        </section>
      </ArticleFrame>
    </>
  );
}
