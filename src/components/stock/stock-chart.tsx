"use client";

import { StockPrice } from "@/lib/graphql/types";
import { 
  Area, 
  AreaChart, 
  Bar, 
  CartesianGrid, 
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

interface StockChartProps {
  prices: StockPrice[];
}

// Calculate EMAs and Bollinger Bands
function calculateIndicators(prices: StockPrice[]) {
  if (!prices.length) return [];
  
  // Data should already be in chronological order (oldest to newest)
  const data = [...prices];
  
  // EMA calculation
  const calculateEMA = (data: StockPrice[], period: number) => {
    const k = 2 / (period + 1);
    let ema = data[0].close;
    
    return data.map((price, i) => {
      if (i === 0) return ema;
      ema = (price.close - ema) * k + ema;
      return ema;
    });
  };

  // Calculate EMAs
  const ema8 = calculateEMA(data, 8);
  const ema21 = calculateEMA(data, 21);
  const ema55 = calculateEMA(data, 55);
  
  // Calculate SMA for Bollinger Bands base
  const period = 20;
  let sma = Array(data.length).fill(null);
  
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      continue;
    }
    
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j].close;
    }
    sma[i] = sum / period;
  }
  
  // Calculate standard deviation for Bollinger Bands
  const stdDev = Array(data.length).fill(null);
  
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      continue;
    }
    
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += Math.pow(data[i - j].close - sma[i], 2);
    }
    stdDev[i] = Math.sqrt(sum / period);
  }
  
  // Calculate Bollinger Bands
  const upperBB = sma.map((val, i) => val !== null ? val + 2 * stdDev[i] : null);
  const lowerBB = sma.map((val, i) => val !== null ? val - 2 * stdDev[i] : null);
  
  // Combine all data
  return data.map((price, i) => ({
    ...price,
    ema8: ema8[i],
    ema21: ema21[i],
    ema55: ema55[i],
    sma20: sma[i],
    upperBB: upperBB[i],
    lowerBB: lowerBB[i]
  }));
}

export function StockChart({ prices }: StockChartProps) {
  // Sort prices chronologically (oldest to newest) for correct display
  const sortedPrices = [...prices].sort((a, b) => 
    new Date(a.biz_date).getTime() - new Date(b.biz_date).getTime()
  );
  
  // Calculate indicators
  const enhancedPrices = calculateIndicators(sortedPrices);
  
  // Format data for the chart
  const chartData = enhancedPrices.map((price) => ({
    date: new Date(price.biz_date).toLocaleDateString(),
    price: price.close,
    volume: price.volume,
    ema8: price.ema8,
    ema21: price.ema21,
    ema55: price.ema55,
    upperBB: price.upperBB,
    lowerBB: price.lowerBB
  }));

  // Determine min and max price for chart domain
  const priceValues = sortedPrices.map((price) => price.close);
  const minPrice = Math.min(...priceValues) * 0.90; // Add 10% padding to bottom (was 5%)
  const maxPrice = Math.max(...priceValues) * 1.05; // Add 5% padding to top
  
  // Determine volume scale
  const volumeValues = sortedPrices.map((price) => price.volume);
  const maxVolume = Math.max(...volumeValues);

  // Common margin and padding settings for both charts
  const chartMargin = { top: 5, right: 30, left: 50, bottom: 5 };

  return (
    <div className="w-full">
      {/* Price Chart - Takes 80% of the height */}
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={chartData} 
            margin={chartMargin}
            syncId="stockChart" // Sync both charts with same ID
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3482F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3482F6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickFormatter={(value) => value}
              hide={true} // Hide x-axis on top chart
            />
            <YAxis 
              yAxisId="price"
              orientation="left"
              domain={[minPrice, maxPrice]} 
              tick={{ fontSize: 12 }} 
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              width={50}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'price') return [`$${value.toFixed(2)}`, "Price"];
                if (name === 'ema8') return [`$${value.toFixed(2)}`, "EMA(8)"];
                if (name === 'ema21') return [`$${value.toFixed(2)}`, "EMA(21)"];
                if (name === 'ema55') return [`$${value.toFixed(2)}`, "EMA(55)"];
                if (name === 'upperBB') return [`$${value?.toFixed(2)}`, "Upper BB"];
                if (name === 'lowerBB') return [`$${value?.toFixed(2)}`, "Lower BB"];
                return [value, name];
              }}
              labelFormatter={(label) => `Date: ${label}`}
              shared={true}
            />
            <Legend />
            <Area 
              yAxisId="price"
              type="monotone" 
              dataKey="price" 
              stroke="#3482F6" 
              strokeWidth={2.5}
              fillOpacity={0.4} 
              fill="url(#colorPrice)"
              name="Price"
              dot={false}
              activeDot={{ r: 6, stroke: '#3482F6', strokeWidth: 2, fill: 'white' }}
            />
            <Line 
              yAxisId="price"
              type="monotone" 
              dataKey="ema8" 
              stroke="#ff7300" 
              dot={false}
              name="EMA(8)"
              strokeWidth={1.5}
            />
            <Line 
              yAxisId="price"
              type="monotone" 
              dataKey="ema21" 
              stroke="#387908" 
              dot={false}
              name="EMA(21)"
              strokeWidth={1.5}
            />
            <Line 
              yAxisId="price"
              type="monotone" 
              dataKey="ema55" 
              stroke="#e91e63" 
              dot={false}
              name="EMA(55)"
              strokeWidth={1.5}
            />
            <Line 
              yAxisId="price"
              type="monotone" 
              dataKey="upperBB" 
              stroke="#2196f3" 
              strokeDasharray="3 3"
              dot={false}
              name="Upper BB"
              strokeWidth={1.5}
            />
            <Line 
              yAxisId="price"
              type="monotone" 
              dataKey="lowerBB" 
              stroke="#2196f3" 
              strokeDasharray="3 3"
              dot={false}
              name="Lower BB"
              strokeWidth={1.5}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      {/* Volume Chart - Takes 20% of the height */}
      <div className="w-full h-[80px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={chartData} 
            margin={chartMargin}
            syncId="stockChart" // Sync both charts with same ID
          >
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickFormatter={(value) => value}
            />
            <YAxis 
              yAxisId="volume"
              orientation="left"
              domain={[0, maxVolume]}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => value >= 1000000 
                ? `${(value/1000000).toFixed(1)}M` 
                : value >= 1000 
                  ? `${(value/1000).toFixed(1)}K` 
                  : value
              }
              width={50}
              axisLine={true}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'volume') return [value.toLocaleString(), "Volume"];
                return [value, name];
              }}
              labelFormatter={(label) => `Date: ${label}`}
              shared={true}
            />
            <Bar 
              yAxisId="volume"
              dataKey="volume" 
              fill="#82ca9d" 
              opacity={0.3}
              name="Volume"
              maxBarSize={4}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 