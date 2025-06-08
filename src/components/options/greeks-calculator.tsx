"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { blackScholes, GreekResults } from "@/lib/black-scholes";

interface SimulatorParams {
  stockPrice: number;
  strikePrice: number;
  timeToExpiration: number;
  volatility: number;
  riskFreeRate: number;
}

export const GreeksCalculator = () => {
  const [simParams, setSimParams] = useState<SimulatorParams>({
    stockPrice: 100,
    strikePrice: 100,
    timeToExpiration: 30,
    volatility: 20,
    riskFreeRate: 2
  });

  return (
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
  );
}; 