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
  const upperBB = sma.map((val, i) => {
    if (val !== null) {
      const result = val + 2 * stdDev[i];
      return Math.round(result * 100) / 100; // Round to 2 decimal places
    }
    return null;
  });
  
  const lowerBB = sma.map((val, i) => {
    if (val !== null) {
      const result = val - 2 * stdDev[i];
      return Math.round(result * 100) / 100; // Round to 2 decimal places
    }
    return null;
  });
  
  // Combine all data with rounded values
  return data.map((price, i) => ({
    ...price,
    ema8: ema8[i] !== undefined ? Math.round(ema8[i] * 100) / 100 : null,
    ema21: ema21[i] !== undefined ? Math.round(ema21[i] * 100) / 100 : null,
    ema55: ema55[i] !== undefined ? Math.round(ema55[i] * 100) / 100 : null,
    sma20: sma[i] !== null ? Math.round(sma[i] * 100) / 100 : null,
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
  
  // Format data for the chart - round all price-related values to 2 decimal places
  const chartData = enhancedPrices.map((price) => ({
    date: new Date(price.biz_date).toLocaleDateString(),
    price: Math.round(price.close * 100) / 100,
    volume: price.volume,
    ema8: price.ema8 !== null ? Math.round(price.ema8 * 100) / 100 : null,
    ema21: price.ema21 !== null ? Math.round(price.ema21 * 100) / 100 : null,
    ema55: price.ema55 !== null ? Math.round(price.ema55 * 100) / 100 : null,
    upperBB: price.upperBB !== null ? Math.round(price.upperBB * 100) / 100 : null,
    lowerBB: price.lowerBB !== null ? Math.round(price.lowerBB * 100) / 100 : null
  }));

  // Determine min and max price for chart domain
  const priceValues = sortedPrices.map((price) => price.close);
  const minPrice = Math.min(...priceValues) * 0.90; // Add 10% padding to bottom
  const maxPrice = Math.max(...priceValues) * 1.05; // Add 5% padding to top
  
  // Determine volume scale
  const volumeValues = sortedPrices.map((price) => price.volume);
  const maxVolume = Math.max(...volumeValues);

  // Function to format volume with K or M suffix
  const formatVolumeWithUnits = (value: any) => {
    if (value === undefined || value === null) return "0";
    const num = Number(value);
    if (isNaN(num)) return "0";
    
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toString();
  };

  // Define our custom Tooltip component that ensures volume is properly formatted
  const CustomTooltip = (props: any) => {
    const { active, payload, label } = props;
    
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-3 border rounded shadow-sm">
          <p className="font-medium">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => {
            // Special formatting for volume
            if (entry.name === 'Volume') {
              return (
                <p key={`item-${index}`} style={{ color: entry.color }}>
                  {`${entry.name}: ${formatVolumeWithUnits(entry.value)}`}
                </p>
              );
            }
            
            // Regular formatting for price values
            if (entry.value !== null && entry.value !== undefined) {
              if (['Price', 'EMA(8)', 'EMA(21)', 'EMA(55)', 'Upper BB', 'Lower BB'].includes(entry.name)) {
                return (
                  <p key={`item-${index}`} style={{ color: entry.color }}>
                    {`${entry.name}: $${Number(entry.value).toFixed(2)}`}
                  </p>
                );
              }
            }
            
            return (
              <p key={`item-${index}`} style={{ color: entry.color }}>
                {`${entry.name}: ${entry.value}`}
              </p>
            );
          })}
        </div>
      );
    }
    
    return null;
  };

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
            <Tooltip content={<CustomTooltip />} shared={true} />
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
              tickFormatter={(value) => formatVolumeWithUnits(value)}
              width={50}
              axisLine={true}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
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