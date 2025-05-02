"use client";

import { StockPrice } from "@/lib/graphql/types";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface StockChartProps {
  prices: StockPrice[];
}

export function StockChart({ prices }: StockChartProps) {
  // Format data for the chart
  const chartData = prices.map((price) => ({
    date: new Date(price.biz_date).toLocaleDateString(),
    price: price.close,
    volume: price.volume,
  }));

  // Determine min and max price for chart domain
  const priceValues = prices.map((price) => price.close);
  const minPrice = Math.min(...priceValues) * 0.95; // Add 5% padding to bottom
  const maxPrice = Math.max(...priceValues) * 1.05; // Add 5% padding to top

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }} 
            tickFormatter={(value) => value}
          />
          <YAxis 
            domain={[minPrice, maxPrice]} 
            tick={{ fontSize: 12 }} 
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip 
            formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#8884d8" 
            fillOpacity={1} 
            fill="url(#colorPrice)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 