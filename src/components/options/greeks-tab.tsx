"use client";

import { useState } from "react";
import { Shield, TrendingUp, Target, Zap, Clock, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GreekSection } from "./greek-section";
import { GreeksCalculator } from "./greeks-calculator";
import { blackScholes } from "@/lib/black-scholes";

export const GreeksTab = () => {
  // State for interactive controls
  const [deltaStockPrice, setDeltaStockPrice] = useState(100);
  const [gammaTime, setGammaTime] = useState(30);
  const [thetaMoneyness, setThetaMoneyness] = useState("ATM");
  const [vegaTime, setVegaTime] = useState(60);
  const [rhoType, setRhoType] = useState("Call");
  const [accordionStates, setAccordionStates] = useState<{[key: string]: boolean}>({});

  const toggleAccordion = (key: string) => {
    setAccordionStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Chart data generators
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

  // Chart options
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

  return (
    <div className="py-4 space-y-8">
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
      <GreekSection
        icon={<Target className="h-8 w-8 text-blue-500" />}
        title="Δ Delta"
        subtitle="The Speedometer of Your Option"
        description="Delta measures the expected change in an option's price for a $1 change in the price of the underlying asset. It represents the directional exposure of your option."
        chartTitle="Delta Curve Visualizer"
        chartData={getDeltaChartData()}
        chartOptions={chartOptions}
        controlElement={
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
        }
        accordionData={[
          {
            title: "Range & Interpretation",
            content: "Call Deltas range from 0 to +1.0 (bullish), while Put Deltas range from 0 to -1.0 (bearish). A Delta of 0.50 means the option price moves $0.50 for every $1 move in the stock.",
            key: "delta-1"
          },
          {
            title: "Delta as Probability",
            content: "Delta is often used as an approximate probability that an option will expire in-the-money. A 0.30 Delta option has roughly a 30% chance of expiring ITM.",
            key: "delta-2"
          }
        ]}
        accordionStates={accordionStates}
        onAccordionToggle={toggleAccordion}
      />

      {/* Gamma Section */}
      <GreekSection
        icon={<Zap className="h-8 w-8 text-yellow-500" />}
        title="Γ Gamma"
        subtitle="The Accelerator Pedal"
        description="Gamma measures the rate of change in an option's Delta for each $1 change in the underlying's price. It indicates the stability of your option's directional exposure."
        chartTitle="Gamma Curve Visualizer"
        chartData={getGammaChartData()}
        chartOptions={chartOptions}
        controlElement={
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
        }
        accordionData={[
          {
            title: "Behavior",
            content: "Gamma is highest for at-the-money (ATM) options and increases as expiration approaches. This makes ATM options very sensitive to price changes near expiry.",
            key: "gamma-1"
          },
          {
            title: "Impact on Traders",
            content: "For option buyers, high Gamma can accelerate profits if the stock moves favorably, but also accelerate losses if it moves against them.",
            key: "gamma-2"
          }
        ]}
        accordionStates={accordionStates}
        onAccordionToggle={toggleAccordion}
      />

      {/* Theta Section */}
      <GreekSection
        icon={<Clock className="h-8 w-8 text-red-500" />}
        title="Θ Theta"
        subtitle="The Ticking Clock"
        description="Theta quantifies the rate at which an option's value declines as one day passes, all else being equal. It's the measure of time decay."
        chartTitle="Theta Decay Curve"
        chartData={getThetaChartData()}
        chartOptions={thetaChartOptions}
        controlElement={
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
        }
        accordionData={[
          {
            title: "Behavior",
            content: "Time decay accelerates as expiration approaches, especially in the last 30-60 days. ATM options have the highest Theta.",
            key: "theta-1"
          },
          {
            title: "Impact on Trading",
            content: "Option buyers fight against Theta daily. Option sellers benefit from Theta, collecting premium as time value erodes.",
            key: "theta-2"
          }
        ]}
        accordionStates={accordionStates}
        onAccordionToggle={toggleAccordion}
      />

      {/* Vega Section */}
      <GreekSection
        icon={<Activity className="h-8 w-8 text-purple-500" />}
        title="ν Vega"
        subtitle="The Volatility Gauge"
        description="Vega measures the expected change in an option's price for a 1% change in implied volatility. It shows how sensitive your option is to changes in market uncertainty."
        chartTitle="Vega Profile Visualizer"
        chartData={getVegaChartData()}
        chartOptions={vegaChartOptions}
        controlElement={
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
        }
        accordionData={[
          {
            title: "Behavior",
            content: "Vega is highest for at-the-money (ATM) options with longer times to expiration. More time means more potential for volatility to affect the price.",
            key: "vega-1"
          },
          {
            title: "The 'Volatility Crush'",
            content: "Implied volatility often rises before big events (like earnings) and falls sharply afterward. This 'crush' can erase profits for option buyers even if they guessed the direction right.",
            key: "vega-2"
          },
          {
            title: "Impact on Traders",
            content: "Buyers benefit from rising volatility (positive Vega). Sellers benefit from falling volatility (negative Vega). Many strategies involve buying options when Vega is low and selling when it's high.",
            key: "vega-3"
          }
        ]}
        accordionStates={accordionStates}
        onAccordionToggle={toggleAccordion}
      />

      {/* Rho Section */}
      <GreekSection
        icon={<Target className="h-8 w-8 text-indigo-500" />}
        title="ρ Rho"
        subtitle="The Interest Rate Sensor"
        description="Rho measures the sensitivity of an option's price to a 1% change in the risk-free interest rate. Its impact is most significant for long-term options."
        chartTitle="Rho's Impact"
        chartData={getRhoChartData()}
        chartOptions={rhoChartOptions}
        controlElement={
          <div className="text-center">
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
        }
        accordionData={[
          {
            title: "Behavior",
            content: "Call options generally have positive Rho (value increases with rates), while put options have negative Rho (value decreases with rates).",
            key: "rho-1"
          },
          {
            title: "Relevance",
            content: "Rho's impact is minimal for short-term options but becomes much more significant for long-term options (LEAPS), where the effect of interest rates compounds over time.",
            key: "rho-2"
          },
          {
            title: "Impact on Traders",
            content: "In a stable interest rate environment, Rho is often ignored. However, during periods of central bank rate changes, its impact on option portfolios becomes more noticeable.",
            key: "rho-3"
          }
        ]}
        accordionStates={accordionStates}
        onAccordionToggle={toggleAccordion}
      />

      {/* Greeks Calculator */}
      <GreeksCalculator />

      {/* Educational Note */}
      <Card className="border-yellow-200">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">
            This application is for educational purposes only and does not constitute financial advice. 
            Option calculations are based on the Black-Scholes model and are theoretical.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}; 