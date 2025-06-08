"use client";

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, DollarSign, LineChart, BarChart4, Clock, Activity, Zap, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Types for Black-Scholes calculations
interface GreekResults {
  price: number;
  delta: number;
  gamma: number;
  vega: number;
  theta: number;
  rho: number;
}

export default function OptionsPage() {
  // State for interactive controls
  const [deltaStockPrice, setDeltaStockPrice] = useState(100);
  const [gammaTime, setGammaTime] = useState(30);
  const [thetaMoneyness, setThetaMoneyness] = useState("ATM");
  const [vegaTime, setVegaTime] = useState(60);
  const [rhoType, setRhoType] = useState("Call");
  
  // Simulator state
  const [simParams, setSimParams] = useState({
    stockPrice: 100,
    strikePrice: 100,
    timeToExpiration: 30,
    volatility: 20,
    riskFreeRate: 2
  });

  // Black-Scholes implementation
  const standardNormalCDF = (x: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return (x > 0) ? 1 - prob : prob;
  };

  const standardNormalPDF = (x: number): number => {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
  };

  const blackScholes = (S: number, K: number, T: number, r: number, v: number, optionType: 'Call' | 'Put'): GreekResults => {
    if (T <= 0) {
      // At expiration
      const intrinsicValue = optionType === 'Call' ? Math.max(S - K, 0) : Math.max(K - S, 0);
      return { price: intrinsicValue, delta: 0, gamma: 0, vega: 0, theta: 0, rho: 0 };
    }

    const d1 = (Math.log(S / K) + (r + v * v / 2) * T) / (v * Math.sqrt(T));
    const d2 = d1 - v * Math.sqrt(T);

    if (optionType === 'Call') {
      const price = S * standardNormalCDF(d1) - K * Math.exp(-r * T) * standardNormalCDF(d2);
      const delta = standardNormalCDF(d1);
      const gamma = standardNormalPDF(d1) / (S * v * Math.sqrt(T));
      const vega = S * standardNormalPDF(d1) * Math.sqrt(T) / 100;
      const theta = (- (S * standardNormalPDF(d1) * v) / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * standardNormalCDF(d2)) / 365;
      const rho = K * T * Math.exp(-r * T) * standardNormalCDF(d2) / 100;
      return { price, delta, gamma, vega, theta, rho };
    } else {
      const price = K * Math.exp(-r * T) * standardNormalCDF(-d2) - S * standardNormalCDF(-d1);
      const delta = standardNormalCDF(d1) - 1;
      const gamma = standardNormalPDF(d1) / (S * v * Math.sqrt(T));
      const vega = S * standardNormalPDF(d1) * Math.sqrt(T) / 100;
      const theta = (- (S * standardNormalPDF(d1) * v) / (2 * Math.sqrt(T)) + r * K * Math.exp(-r * T) * standardNormalCDF(-d2)) / 365;
      const rho = -K * T * Math.exp(-r * T) * standardNormalCDF(-d2) / 100;
      return { price, delta, gamma, vega, theta, rho };
    }
  };

  // Generate chart data
  const getDeltaChartData = () => {
    const stockPrices = Array.from({ length: 101 }, (_, i) => 50 + i);
    const callData = stockPrices.map(s => blackScholes(s, 100, 30/365, 0.02, 0.20, 'Call').delta);
    const putData = stockPrices.map(s => blackScholes(s, 100, 30/365, 0.02, 0.20, 'Put').delta);
    
    return {
      labels: stockPrices,
      datasets: [
        {
          label: 'Call Delta',
          data: callData,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.1,
          pointRadius: 0
        },
        {
          label: 'Put Delta',
          data: putData,
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.1,
          pointRadius: 0
        }
      ]
    };
  };

  const getGammaChartData = () => {
    const stockPrices = Array.from({ length: 61 }, (_, i) => 70 + i);
    const gammaData = stockPrices.map(s => blackScholes(s, 100, gammaTime / 365, 0.02, 0.20, 'Call').gamma);
    
    return {
      labels: stockPrices,
      datasets: [{
        label: 'Gamma',
        data: gammaData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
        fill: true
      }]
    };
  };

  const getThetaChartData = () => {
    const times = Array.from({ length: 91 }, (_, i) => i);
    let strike = 100;
    if (thetaMoneyness === 'ITM') strike = 90;
    else if (thetaMoneyness === 'OTM') strike = 110;

    const priceData = times.map(t => blackScholes(100, strike, t / 365, 0.02, 0.20, 'Call').price);

    return {
      labels: times,
      datasets: [{
        label: `Call Price (${thetaMoneyness})`,
        data: priceData,
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.1
      }]
    };
  };

  const getVegaChartData = () => {
    const stockPrices = Array.from({ length: 61 }, (_, i) => 70 + i);
    const vegaData = stockPrices.map(s => blackScholes(s, 100, vegaTime / 365, 0.02, 0.20, 'Call').vega);
    
    return {
      labels: stockPrices,
      datasets: [{
        label: 'Vega (Call/Put)',
        data: vegaData,
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.1,
        fill: true
      }]
    };
  };

  const getRhoChartData = () => {
    const times = Array.from({ length: 366 }, (_, i) => i);
    const rhoDataITM = times.map(t => blackScholes(100, 90, t / 365, 0.02, 0.20, rhoType as 'Call' | 'Put').rho);
    const rhoDataOTM = times.map(t => blackScholes(100, 110, t / 365, 0.02, 0.20, rhoType as 'Call' | 'Put').rho);

    return {
      labels: times,
      datasets: [
        {
          label: `ITM ${rhoType}`,
          data: rhoDataITM,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.1,
          pointRadius: 0
        },
        {
          label: `OTM ${rhoType}`,
          data: rhoDataOTM,
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.1,
          pointRadius: 0
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: false },
      legend: { display: true, position: 'bottom' as const }
    },
    scales: {
      x: { 
        title: { display: true, text: 'Underlying Price ($)' },
        grid: { color: 'rgb(226, 232, 240)' }
      },
      y: { 
        title: { display: true, text: 'Value' },
        grid: { color: 'rgb(226, 232, 240)' }
      }
    }
  };

  const thetaChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      x: { 
        title: { display: true, text: 'Days to Expiration' },
        grid: { color: 'rgb(226, 232, 240)' },
        reverse: true
      },
      y: { 
        title: { display: true, text: 'Option Price ($)' },
        grid: { color: 'rgb(226, 232, 240)' }
      }
    }
  };

  const vegaChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: { 
        title: { display: true, text: 'Vega' },
        grid: { color: 'rgb(226, 232, 240)' }
      }
    }
  };

  const rhoChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      x: { 
        title: { display: true, text: 'Days to Expiration' },
        grid: { color: 'rgb(226, 232, 240)' }
      },
      y: { 
        title: { display: true, text: 'Rho' },
        grid: { color: 'rgb(226, 232, 240)' }
      }
    }
  };

  const AccordionSection = ({ title, content, isOpen, onToggle }: { 
    title: string; 
    content: string; 
    isOpen: boolean; 
    onToggle: () => void; 
  }) => (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm">{title}</CardTitle>
          <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{content}</p>
        </CardContent>
      )}
    </Card>
  );

  const [accordionStates, setAccordionStates] = useState<{[key: string]: boolean}>({});

  const toggleAccordion = (key: string) => {
    setAccordionStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Options Trading Guide
            </h1>
            <p className="text-muted-foreground">
              Learn when and how to effectively use options in your investment strategy
            </p>
          </div>

          <Tabs defaultValue="when-to-trade">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="when-to-trade">When to Trade</TabsTrigger>
              <TabsTrigger value="greeks">Option Greeks</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="when-to-trade" className="space-y-6 py-4">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Hedging Risk */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <Shield className="h-6 w-6 text-blue-500" />
                    <div>
                      <CardTitle>1. Hedging Risk (Insurance)</CardTitle>
                      <CardDescription>Protect your portfolio</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Example:</h4>
                        <p className="text-sm text-muted-foreground">
                          You own 100 shares of TSLA and want to protect against a drop.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Action:</h4>
                        <p className="text-sm text-muted-foreground">
                          Buy a protective put (limits downside risk).
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Why Options?</h4>
                        <p className="text-sm text-muted-foreground">
                          Cheaper than selling stock; defines max loss.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Speculating with Leverage */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <div>
                      <CardTitle>2. Speculating with Leverage</CardTitle>
                      <CardDescription>Amplify your returns</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Example:</h4>
                        <p className="text-sm text-muted-foreground">
                          You believe NVDA will rise but don't want to buy shares.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Action:</h4>
                        <p className="text-sm text-muted-foreground">
                          Buy a call option (small capital, high upside).
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Why Options?</h4>
                        <p className="text-sm text-muted-foreground">
                          More leverage than stocks (higher % gains).
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Income Generation */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <DollarSign className="h-6 w-6 text-yellow-500" />
                    <div>
                      <CardTitle>3. Income Generation</CardTitle>
                      <CardDescription>Selling premium</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Example:</h4>
                        <p className="text-sm text-muted-foreground">
                          You think SPY will stay flat or rise slightly.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Action:</h4>
                        <p className="text-sm text-muted-foreground">
                          Sell a covered call (earn premium while holding shares).
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Why Options?</h4>
                        <p className="text-sm text-muted-foreground">
                          Generates passive income in sideways markets.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Betting on Volatility */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <LineChart className="h-6 w-6 text-purple-500" />
                    <div>
                      <CardTitle>4. Betting on Volatility</CardTitle>
                      <CardDescription>Not direction</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Example:</h4>
                        <p className="text-sm text-muted-foreground">
                          Earnings season—you expect AMZN to move sharply but don't know the direction.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Action:</h4>
                        <p className="text-sm text-muted-foreground">
                          Buy a straddle (profits from big moves up or down).
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Why Options?</h4>
                        <p className="text-sm text-muted-foreground">
                          Stocks can't profit from volatility alone.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Capital Efficiency */}
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <BarChart4 className="h-6 w-6 text-indigo-500" />
                    <div>
                      <CardTitle>5. Capital Efficiency</CardTitle>
                      <CardDescription>Defined risk strategies</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Example:</h4>
                        <p className="text-sm text-muted-foreground">
                          You want to bet on AAPL rising but limit losses.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Action:</h4>
                        <p className="text-sm text-muted-foreground">
                          Use a bull call spread (lower cost than buying stock).
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">Why Options?</h4>
                        <p className="text-sm text-muted-foreground">
                          Defined risk, less capital than buying shares.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* When NOT to Use Options */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-500">🚫 When NOT to Use Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc pl-5">
                    <li className="text-muted-foreground">
                      <span className="font-medium text-red-500">Short-Term Gambling</span> – Buying weekly OTM options is like buying lottery tickets (most expire worthless).
                    </li>
                    <li className="text-muted-foreground">
                      <span className="font-medium text-red-500">Without Understanding Greeks</span> – If you don't know Delta, Theta, or IV, you'll lose money.
                    </li>
                    <li className="text-muted-foreground">
                      <span className="font-medium text-red-500">Illiquid Markets</span> – Avoid options with low volume (wide bid-ask spreads = bad fills).
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strategies" className="py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Options Strategies</CardTitle>
                  <CardDescription>Coming soon!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Check back soon!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* New Greeks Tab */}
            <TabsContent value="greeks" className="py-4 space-y-8">
              {/* Introduction */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">What Are Option Greeks?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    The Option Greeks are a set of risk measures that quantify the sensitivity of an option's price to changes in underlying factors. 
                    They provide a framework for understanding how an option's value might react to movements in stock price, volatility, time, and interest rates.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          Call Option
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Gives the holder the <span className="font-semibold">right to buy</span> an underlying asset at a predetermined price.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Shield className="h-4 w-4 text-red-500" />
                          Put Option
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Gives the holder the <span className="font-semibold">right to sell</span> an underlying asset at a predetermined price.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Delta Section */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl flex items-center gap-2">
                        <Target className="h-8 w-8 text-blue-500" />
                        Δ Delta
                      </CardTitle>
                      <CardDescription className="text-lg">The Speedometer of Your Option</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Delta measures the expected change in an option's price for a $1 change in the price of the underlying asset. 
                        It represents the directional exposure of your option.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <AccordionSection
                      title="Range & Interpretation"
                      content="Call Deltas range from 0 to +1.0 (bullish), while Put Deltas range from 0 to -1.0 (bearish). A Delta of 0.50 means the option price moves $0.50 for every $1 move in the stock."
                      isOpen={accordionStates['delta-1']}
                      onToggle={() => toggleAccordion('delta-1')}
                    />
                    <AccordionSection
                      title="Delta as Probability"
                      content="Delta is often used as an approximate probability that an option will expire in-the-money. A 0.30 Delta option has roughly a 30% chance of expiring ITM."
                      isOpen={accordionStates['delta-2']}
                      onToggle={() => toggleAccordion('delta-2')}
                    />
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Delta Curve Visualizer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative h-[300px]">
                      <Line data={getDeltaChartData()} options={chartOptions} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Underlying Price: <span className="font-bold text-green-500">${deltaStockPrice}</span>
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={deltaStockPrice}
                        onChange={(e) => setDeltaStockPrice(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Gamma Section */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl flex items-center gap-2">
                        <Zap className="h-8 w-8 text-yellow-500" />
                        Γ Gamma
                      </CardTitle>
                      <CardDescription className="text-lg">The Accelerator Pedal</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Gamma measures the rate of change in an option's Delta for each $1 change in the underlying's price. 
                        It indicates the stability of your option's directional exposure.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <AccordionSection
                      title="Behavior"
                      content="Gamma is highest for at-the-money (ATM) options and increases as expiration approaches. This makes ATM options very sensitive to price changes near expiry."
                      isOpen={accordionStates['gamma-1']}
                      onToggle={() => toggleAccordion('gamma-1')}
                    />
                    <AccordionSection
                      title="Impact on Traders"
                      content="For option buyers, high Gamma can accelerate profits if the stock moves favorably, but also accelerate losses if it moves against them."
                      isOpen={accordionStates['gamma-2']}
                      onToggle={() => toggleAccordion('gamma-2')}
                    />
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Gamma Curve Visualizer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative h-[300px]">
                      <Line data={getGammaChartData()} options={chartOptions} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Days to Expiration: <span className="font-bold text-green-500">{gammaTime}</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="90"
                        value={gammaTime}
                        onChange={(e) => setGammaTime(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Theta Section */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl flex items-center gap-2">
                        <Clock className="h-8 w-8 text-red-500" />
                        Θ Theta
                      </CardTitle>
                      <CardDescription className="text-lg">The Ticking Clock</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Theta quantifies the rate at which an option's value declines as one day passes, all else being equal. 
                        It's the measure of time decay.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <AccordionSection
                      title="Behavior"
                      content="Time decay accelerates as expiration approaches, especially in the last 30-60 days. ATM options have the highest Theta."
                      isOpen={accordionStates['theta-1']}
                      onToggle={() => toggleAccordion('theta-1')}
                    />
                    <AccordionSection
                      title="Impact on Trading"
                      content="Option buyers fight against Theta daily. Option sellers benefit from Theta, collecting premium as time value erodes."
                      isOpen={accordionStates['theta-2']}
                      onToggle={() => toggleAccordion('theta-2')}
                    />
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Theta Decay Curve</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative h-[300px]">
                      <Line data={getThetaChartData()} options={thetaChartOptions} />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-medium mr-4">Moneyness:</span>
                      <div className="inline-flex rounded-md shadow-sm">
                        {['ATM', 'ITM', 'OTM'].map((type) => (
                          <Button
                            key={type}
                            variant={thetaMoneyness === type ? "default" : "outline"}
                            size="sm"
                            onClick={() => setThetaMoneyness(type)}
                            className="rounded-none first:rounded-l-md last:rounded-r-md"
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Vega Section */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl flex items-center gap-2">
                        <Activity className="h-8 w-8 text-purple-500" />
                        ν Vega
                      </CardTitle>
                      <CardDescription className="text-lg">The Volatility Gauge</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Vega measures the expected change in an option's price for a 1% change in implied volatility. 
                        It shows how sensitive your option is to changes in market uncertainty.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <AccordionSection
                      title="Behavior"
                      content="Vega is highest for at-the-money (ATM) options with longer times to expiration. More time means more potential for volatility to affect the price."
                      isOpen={accordionStates['vega-1']}
                      onToggle={() => toggleAccordion('vega-1')}
                    />
                    <AccordionSection
                      title="The 'Volatility Crush'"
                      content="Implied volatility often rises before big events (like earnings) and falls sharply afterward. This 'crush' can erase profits for option buyers even if they guessed the direction right."
                      isOpen={accordionStates['vega-2']}
                      onToggle={() => toggleAccordion('vega-2')}
                    />
                    <AccordionSection
                      title="Impact on Traders"
                      content="Buyers benefit from rising volatility (positive Vega). Sellers benefit from falling volatility (negative Vega). Many strategies involve buying options when Vega is low and selling when it's high."
                      isOpen={accordionStates['vega-3']}
                      onToggle={() => toggleAccordion('vega-3')}
                    />
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Vega Profile Visualizer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative h-[300px]">
                      <Line data={getVegaChartData()} options={vegaChartOptions} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Days to Expiration: <span className="font-bold text-purple-600">{vegaTime} days</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="180"
                        value={vegaTime}
                        onChange={(e) => setVegaTime(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Rho Section */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl flex items-center gap-2">
                        <Target className="h-8 w-8 text-indigo-500" />
                        ρ Rho
                      </CardTitle>
                      <CardDescription className="text-lg">The Interest Rate Sensor</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Rho measures the sensitivity of an option's price to a 1% change in the risk-free interest rate. 
                        Its impact is most significant for long-term options.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <AccordionSection
                      title="Behavior"
                      content="Call options generally have positive Rho (value increases with rates), while put options have negative Rho (value decreases with rates)."
                      isOpen={accordionStates['rho-1']}
                      onToggle={() => toggleAccordion('rho-1')}
                    />
                    <AccordionSection
                      title="Relevance"
                      content="Rho's impact is minimal for short-term options but becomes much more significant for long-term options (LEAPS), where the effect of interest rates compounds over time."
                      isOpen={accordionStates['rho-2']}
                      onToggle={() => toggleAccordion('rho-2')}
                    />
                    <AccordionSection
                      title="Impact on Traders"
                      content="In a stable interest rate environment, Rho is often ignored. However, during periods of central bank rate changes, its impact on option portfolios becomes more noticeable."
                      isOpen={accordionStates['rho-3']}
                      onToggle={() => toggleAccordion('rho-3')}
                    />
                  </div>
                </div>

                <div className="bg-surface p-6 rounded-lg border border-base">
                  <h4 className="text-lg font-semibold text-center text-heading mb-4">Rho's Impact</h4>
                  <div className="relative h-[300px]">
                    <Line data={getRhoChartData()} options={rhoChartOptions} />
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-sm font-medium text-muted-foreground mr-4">Option Type:</span>
                    <div className="inline-flex rounded-md shadow-sm">
                      {['Call', 'Put'].map((type) => (
                        <Button
                          key={type}
                          variant={rhoType === type ? "default" : "outline"}
                          size="sm"
                          onClick={() => setRhoType(type)}
                          className="rounded-none first:rounded-l-md last:rounded-r-md"
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Greeks Simulator */}
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Option Greeks Calculator</CardTitle>
                  <CardDescription>
                    Adjust the parameters and see how all Greeks interact in real-time.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Stock Price ($)</label>
                      <input
                        type="number"
                        value={simParams.stockPrice}
                        onChange={(e) => setSimParams(prev => ({ ...prev, stockPrice: Number(e.target.value) }))}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Strike Price ($)</label>
                      <input
                        type="number"
                        value={simParams.strikePrice}
                        onChange={(e) => setSimParams(prev => ({ ...prev, strikePrice: Number(e.target.value) }))}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Days to Expiration</label>
                      <input
                        type="number"
                        value={simParams.timeToExpiration}
                        onChange={(e) => setSimParams(prev => ({ ...prev, timeToExpiration: Number(e.target.value) }))}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Implied Volatility (%)</label>
                      <input
                        type="number"
                        value={simParams.volatility}
                        onChange={(e) => setSimParams(prev => ({ ...prev, volatility: Number(e.target.value) }))}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Risk-Free Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={simParams.riskFreeRate}
                        onChange={(e) => setSimParams(prev => ({ ...prev, riskFreeRate: Number(e.target.value) }))}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {['Call', 'Put'].map((optionType) => {
                      const results = blackScholes(
                        simParams.stockPrice,
                        simParams.strikePrice,
                        simParams.timeToExpiration / 365,
                        simParams.riskFreeRate / 100,
                        simParams.volatility / 100,
                        optionType as 'Call' | 'Put'
                      );

                      return (
                        <div key={optionType}>
                          <h3 className="text-xl font-semibold mb-4">{optionType} Option Results</h3>
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                            {Object.entries(results).map(([greek, value]) => (
                              <Card key={greek}>
                                <CardContent className="p-3 text-center">
                                  <div className="text-xs text-muted-foreground capitalize">{greek}</div>
                                  <div className="text-lg font-bold mt-1">{value.toFixed(4)}</div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Educational Note */}
              <Card className="border-yellow-200">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    This application is for educational purposes only and does not constitute financial advice. 
                    Option calculations are based on the Black-Scholes model and are theoretical.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Disclaimer />
    </div>
  );
} 