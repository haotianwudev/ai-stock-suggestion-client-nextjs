'use client';

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ArticleFrame } from '@/components/articles/article-frame';

declare global {
  interface Window {
    Chart: any;
  }
}

export default function AlphabetValuationAnalysis() {
  const [wacc, setWacc] = useState(9.86);
  const [growthRate, setGrowthRate] = useState(2.50);
  const [activeSection, setActiveSection] = useState('summary');
  const [chartLoaded, setChartLoaded] = useState(false);

  const historicalChartRef = useRef<any>(null);
  const peRatioChartRef = useRef<any>(null);
  const evEbitdaChartRef = useRef<any>(null);

  const marketPrice = 173.42;

  const baseData = {
    sumPvFcff: 616.74,
    netCash: 84.442,
    sharesOutstanding: 12291.81,
    tvData: {
      fcf_10: 170.30,
      discount_factor_10: 1 / Math.pow(1 + 0.0986, 10)
    }
  };

  const [valuationData, setValuationData] = useState({
    impliedPrice: 132.37,
    pvTv: 925.85,
    enterpriseValue: 1542.59,
    equityValue: 1627.03,
    conclusion: 'Potentially Overvalued',
    difference: 31.00
  });

  useEffect(() => {
    updateValuation(wacc, growthRate);
  }, [wacc, growthRate]);

  const updateValuation = (waccValue: number, gValue: number) => {
    const discountFactor10 = 1 / Math.pow(1 + waccValue / 100, 10);
    const tv10 = (baseData.tvData.fcf_10 * (1 + gValue / 100)) / (waccValue / 100 - gValue / 100);
    const pvTv = tv10 * discountFactor10;

    const enterpriseValue = baseData.sumPvFcff + pvTv;
    const equityValue = enterpriseValue + baseData.netCash;
    const impliedPrice = equityValue / baseData.sharesOutstanding * 1000;

    const difference = ((marketPrice - impliedPrice) / marketPrice) * 100;
    const conclusion = impliedPrice < marketPrice ? 'Potentially Overvalued' : 'Potentially Undervalued';

    setValuationData({
      impliedPrice,
      pvTv,
      enterpriseValue,
      equityValue,
      conclusion,
      difference: Math.abs(difference)
    });
  };

  useEffect(() => {
    if (!chartLoaded || !window.Chart) return;

    const timer = setTimeout(() => {
      if (activeSection === 'performance') {
        initializeHistoricalChart();
      } else if (activeSection === 'comparison') {
        initializePeerCharts();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [chartLoaded, activeSection]);

  const initializeHistoricalChart = () => {
    if (historicalChartRef.current) {
      historicalChartRef.current.destroy();
      historicalChartRef.current = null;
    }

    const historicalCanvas = document.getElementById('historicalChart') as HTMLCanvasElement;
    if (historicalCanvas && window.Chart) {
      const ctx = historicalCanvas.getContext('2d');
      if (ctx) {
        historicalChartRef.current = new window.Chart(ctx, {
          type: 'line',
          data: {
            labels: ['2020', '2021', '2022', '2023', '2024', 'TTM Q1 2025'],
            datasets: [
              {
                label: 'Total Revenue ($B)',
                data: [182.53, 257.64, 282.84, 307.39, 350.02, 359.70],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.1,
                hidden: false
              },
              {
                label: 'Net Income ($B)',
                data: [40.27, 76.03, 59.97, 73.80, 100.12, 107.03],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.1,
                hidden: true
              },
              {
                label: 'Free Cash Flow ($B)',
                data: [42.84, 67.01, 60.01, 69.50, 72.76, 74.88],
                borderColor: '#8B5CF6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                fill: true,
                tension: 0.1,
                hidden: true
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value: any) {
                    return '$' + value + 'B';
                  }
                }
              }
            },
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Alphabet Financial Trends ($ Billions)'
              }
            }
          }
        });
      }
    }
  };

  const initializePeerCharts = () => {
    if (peRatioChartRef.current) {
      peRatioChartRef.current.destroy();
      peRatioChartRef.current = null;
    }
    if (evEbitdaChartRef.current) {
      evEbitdaChartRef.current.destroy();
      evEbitdaChartRef.current = null;
    }

    const peCanvas = document.getElementById('peRatioChart') as HTMLCanvasElement;
    if (peCanvas && window.Chart) {
      const ctx = peCanvas.getContext('2d');
      if (ctx) {
        peRatioChartRef.current = new window.Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Alphabet', 'Microsoft', 'Amazon', 'Meta', 'Apple'],
            datasets: [{
              label: 'P/E Ratio (TTM)',
              data: [19.3, 33.7, 65, 29, 29],
              backgroundColor: ['#4A90E2', '#B8E986', '#F5A623', '#50E3C2', '#9013FE'],
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
              title: { display: true, text: 'P/E Ratio Comparison' },
              legend: { display: false }
            }
          }
        });
      }
    }

    const evCanvas = document.getElementById('evEbitdaChart') as HTMLCanvasElement;
    if (evCanvas && window.Chart) {
      const ctx = evCanvas.getContext('2d');
      if (ctx) {
        evEbitdaChartRef.current = new window.Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Alphabet', 'Microsoft', 'Amazon', 'Meta', 'Apple'],
            datasets: [{
              label: 'EV/EBITDA (TTM)',
              data: [13.7, 24.6, 17.3, 18.3, 21.8],
              backgroundColor: ['#4A90E2', '#B8E986', '#F5A623', '#50E3C2', '#9013FE'],
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
              title: { display: true, text: 'EV/EBITDA Comparison' },
              legend: { display: false }
            }
          }
        });
      }
    }
  };

  const toggleDataset = (datasetLabel: string) => {
    if (historicalChartRef.current) {
      const datasets = historicalChartRef.current.data.datasets;
      const datasetIndex = datasets.findIndex((ds: any) => ds.label.includes(datasetLabel));
      if (datasetIndex !== -1) {
        const meta = historicalChartRef.current.getDatasetMeta(datasetIndex);
        meta.hidden = !meta.hidden;
        historicalChartRef.current.update();
      }
    }
  };

  const generateSensitivityTable = () => {
    const waccLevels = [8.86, 9.36, 9.86, 10.36, 10.86];
    const gLevels = [2.00, 2.25, 2.50, 2.75, 3.00];

    return waccLevels.map(waccLevel => (
      <tr key={waccLevel}>
        <td className="p-2 border border-gray-300 dark:border-gray-600 font-semibold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">{waccLevel.toFixed(2)}%</td>
        {gLevels.map(gLevel => {
          const waccVal = waccLevel / 100;
          const gVal = gLevel / 100;
          const tv10 = (baseData.tvData.fcf_10 * (1 + gVal)) / (waccVal - gVal);
          const pvTv = tv10 * (1 / Math.pow(1 + waccVal, 10));
          const enterpriseValue = baseData.sumPvFcff + pvTv;
          const equityValue = enterpriseValue + baseData.netCash;
          const price = equityValue / baseData.sharesOutstanding * 1000;

          const isHighlighted = Math.abs(waccLevel - wacc) < 0.26 && Math.abs(gLevel - growthRate) < 0.13;

          return (
            <td
              key={`${waccLevel}-${gLevel}`}
              className={`p-2 border border-gray-300 dark:border-gray-600 transition-colors duration-300 text-gray-800 dark:text-gray-200 ${
                isHighlighted ? 'bg-blue-200 dark:bg-blue-900/60 text-blue-900 dark:text-blue-200 font-bold' : ''
              }`}
            >
              ${price.toFixed(2)}
            </td>
          );
        })}
      </tr>
    ));
  };

  const sections = [
    { id: 'summary', label: 'Valuation Summary' },
    { id: 'profile', label: 'Company Profile' },
    { id: 'performance', label: 'Performance' },
    { id: 'modeler', label: 'DCF Modeler' },
    { id: 'comparison', label: 'Peer Comparison' },
  ];

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        strategy="beforeInteractive"
        onLoad={() => setChartLoaded(true)}
      />

      <ArticleFrame slug="interactive-alphabet-googl-valuation-analysis">
        <nav className="mb-8 rounded-lg shadow-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-3 text-sm md:text-base whitespace-nowrap transition-all duration-300 ${
                  activeSection === section.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </nav>

        {activeSection === 'summary' && (
          <section className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">Valuation Snapshot</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                This section provides the &ldquo;bottom-line&rdquo; from our comprehensive analysis. It contrasts the current market price with the intrinsic value calculated by our interactive DCF model. Use the DCF Modeler section to adjust assumptions and see how the valuation changes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Current Market Price</h3>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-200 mt-2">${marketPrice.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">(as of May 28, 2025)</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">Model&apos;s Implied Price</h3>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-200 mt-2">${valuationData.impliedPrice.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">(Comprehensive 10-Yr Model)</p>
                </div>
                <div className={`p-6 rounded-lg ${
                  valuationData.conclusion === 'Potentially Overvalued'
                    ? 'bg-yellow-50 dark:bg-yellow-900/20'
                    : 'bg-green-50 dark:bg-green-900/20'
                }`}>
                  <h3 className={`text-lg font-semibold ${
                    valuationData.conclusion === 'Potentially Overvalued'
                      ? 'text-yellow-800 dark:text-yellow-300'
                      : 'text-green-800 dark:text-green-300'
                  }`}>
                    Conclusion
                  </h3>
                  <p className={`text-3xl font-bold mt-2 ${
                    valuationData.conclusion === 'Potentially Overvalued'
                      ? 'text-yellow-900 dark:text-yellow-200'
                      : 'text-green-900 dark:text-green-200'
                  }`}>
                    {valuationData.conclusion}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">by {valuationData.difference.toFixed(2)}%</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'profile' && (
          <section className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">Company Profile</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
                Alphabet is a technology conglomerate with three main pillars. This section outlines each business segment, its core products, and recent performance, providing context for the company&apos;s revenue streams and growth drivers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">Google Services</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    The core revenue driver, including Search, YouTube, Android, Chrome, and Hardware. Dominant in advertising.
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    +9.75% <span className="text-base font-normal text-gray-500 dark:text-gray-400">YoY Revenue (Q1 2025)</span>
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">Google Cloud</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    A key growth engine offering enterprise cloud services (GCP) and collaboration tools (Workspace). Now consistently profitable.
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    +28.06% <span className="text-base font-normal text-gray-500 dark:text-gray-400">YoY Revenue (Q1 2025)</span>
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">Other Bets</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    A portfolio of long-term, high-risk/high-reward ventures in areas like healthcare (Verily) and autonomous driving.
                  </p>
                  <p className="text-2xl font-bold text-red-500 dark:text-red-400">
                    -9.09% <span className="text-base font-normal text-gray-500 dark:text-gray-400">YoY Revenue (Q1 2025)</span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'performance' && (
          <section className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">Historical Performance</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
                This chart displays Alphabet&apos;s key financial metrics over the past several years. Understanding these historical trends in revenue, net income, and free cash flow is crucial for projecting future performance. You can click the buttons below to toggle which data series are visible on the chart.
              </p>
              <div className="relative w-full h-80 mx-auto max-w-4xl">
                <canvas id="historicalChart"></canvas>
              </div>
              <div className="flex justify-center mt-4 space-x-2 flex-wrap">
                <button
                  onClick={() => toggleDataset('Revenue')}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-2"
                >
                  Revenue
                </button>
                <button
                  onClick={() => toggleDataset('Net Income')}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-2"
                >
                  Net Income
                </button>
                <button
                  onClick={() => toggleDataset('Free Cash Flow')}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mb-2"
                >
                  Free Cash Flow
                </button>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'modeler' && (
          <section className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">Interactive DCF Modeler</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
                This is the core of the analysis. A Discounted Cash Flow (DCF) model estimates a company&apos;s value based on its projected future cash flows. Here, you can adjust the key assumptions that drive the valuation&mdash;the discount rate (WACC) and the long-term growth rate&mdash;to see their immediate impact on Alphabet&apos;s implied share price.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="wacc-slider" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Discount Rate (WACC): <span className="font-bold">{wacc.toFixed(2)}%</span>
                      </label>
                      <input
                        id="wacc-slider"
                        type="range"
                        min="8.86"
                        max="10.86"
                        step="0.01"
                        value={wacc}
                        onChange={(e) => setWacc(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label htmlFor="g-slider" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Perpetual Growth Rate (g): <span className="font-bold">{growthRate.toFixed(2)}%</span>
                      </label>
                      <input
                        id="g-slider"
                        type="range"
                        min="2.00"
                        max="3.00"
                        step="0.01"
                        value={growthRate}
                        onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Sensitivity Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      This table shows how the share price changes with WACC and growth rate. The highlighted cell corresponds to your current slider selections.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-center text-xs md:text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">WACC↓ | g→</th>
                            <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">2.00%</th>
                            <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">2.25%</th>
                            <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">2.50%</th>
                            <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">2.75%</th>
                            <th className="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">3.00%</th>
                          </tr>
                        </thead>
                        <tbody>
                          {generateSensitivityTable()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-600 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Model&apos;s Implied Share Price</h3>
                  <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 my-4">${valuationData.impliedPrice.toFixed(2)}</p>
                  <div className="w-full text-center mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>PV of FCFs: <span className="font-semibold">${baseData.sumPvFcff.toFixed(2)}B</span></p>
                    <p>+</p>
                    <p>PV of Terminal Value: <span className="font-semibold">${valuationData.pvTv.toFixed(2)}B</span></p>
                    <p>=</p>
                    <p>Enterprise Value: <span className="font-semibold">${valuationData.enterpriseValue.toFixed(2)}B</span></p>
                    <p>+</p>
                    <p>Net Cash: <span className="font-semibold">${baseData.netCash.toFixed(2)}B</span></p>
                    <p>=</p>
                    <p className="text-base">Equity Value: <span className="font-bold text-gray-800 dark:text-gray-200">${valuationData.equityValue.toFixed(2)}B</span></p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'comparison' && (
          <section className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">Relative Valuation vs. Peers</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-3xl mx-auto">
                No company exists in a vacuum. This section compares Alphabet&apos;s valuation multiples (P/E and EV/EBITDA) against its major technology peers. This market context helps assess whether GOOGL is priced attractively relative to its competitors, considering its growth prospects and risk profile.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative w-full h-80">
                  <canvas id="peRatioChart"></canvas>
                </div>
                <div className="relative w-full h-80">
                  <canvas id="evEbitdaChart"></canvas>
                </div>
              </div>
            </div>
          </section>
        )}
      </ArticleFrame>
    </>
  );
}
