import { StockTechnicals, StockPrice } from "@/lib/graphql/types";
import { Card, CardContent } from "@/components/ui/card";
import { InfoIcon, TrendingUp, TrendingDown, ArrowRight, Repeat, BarChart3, ArrowUpDown, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StockChart } from "@/components/stock/stock-chart";

interface StockTechnicalsAnalysisProps {
  technicals: StockTechnicals | null;
  prices: StockPrice[];
}

export function StockTechnicalsAnalysis({ technicals, prices }: StockTechnicalsAnalysisProps) {
  if (!technicals) {
    return (
      <div className="text-center p-4">
        <p>No technical analysis data available.</p>
      </div>
    );
  }

  const getSignalColor = (signal: string) => {
    switch(signal.toLowerCase()) {
      case 'bullish': return 'text-green-500';
      case 'bearish': return 'text-red-500';
      case 'neutral': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getSignalBgColor = (signal: string) => {
    switch(signal.toLowerCase()) {
      case 'bullish': return 'bg-green-500';
      case 'bearish': return 'bg-red-500';
      case 'neutral': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getSignalIcon = (signal: string) => {
    switch(signal.toLowerCase()) {
      case 'bullish': return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'bearish': return <TrendingDown className="h-5 w-5 text-red-500" />;
      case 'neutral': return <ArrowRight className="h-5 w-5 text-yellow-500" />;
      default: return <InfoIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStrategyIcon = (strategy: string) => {
    switch(strategy) {
      case 'trend': return <TrendingUp className="h-10 w-10" />;
      case 'mr': return <Repeat className="h-10 w-10" />;
      case 'momentum': return <Zap className="h-10 w-10" />;
      case 'volatility': return <BarChart3 className="h-10 w-10" />;
      case 'stat_arb': return <ArrowUpDown className="h-10 w-10" />;
      default: return <InfoIcon className="h-10 w-10" />;
    }
  };

  // Color coding for numeric values
  const getValueColor = (value: number, isPositive: boolean = true) => {
    if (value === 0) return '';
    if (isPositive) {
      return value > 0 ? 'text-green-500' : 'text-red-500';
    } else {
      return value > 0 ? 'text-red-500' : 'text-green-500';
    }
  };

  // Color for RSI values
  const getRSIColor = (value: number) => {
    if (value > 70) return 'text-red-500';   // Overbought
    if (value < 30) return 'text-green-500'; // Oversold
    return '';
  };

  // Color for momentum percentages
  const getMomentumColor = (value: number) => {
    if (value > 0.05) return 'text-green-500';  // Strong positive momentum
    if (value < -0.05) return 'text-red-500';   // Strong negative momentum
    return 'text-yellow-500';  // Neutral momentum
  };

  // Color for Z-score
  const getZScoreColor = (value: number) => {
    if (value < -2) return 'text-green-500';    // Likely bullish mean reversion
    if (value > 2) return 'text-red-500';       // Likely bearish mean reversion
    return '';
  };

  // Color for Hurst exponent
  const getHurstColor = (value: number) => {
    if (value < 0.4) return 'text-yellow-500';  // Strong mean-reverting (can be either bullish or bearish)
    if (value > 0.6) return 'text-blue-500';    // Strong trending
    return '';
  };

  // Format numeric values with color coding
  const formatValueWithColor = (value: number, formatter: (val: number) => string, colorGetter: (val: number) => string) => {
    const formattedValue = formatter(value);
    const colorClass = colorGetter(value);
    return { value: formattedValue, colorClass };
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const formatToFixed = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  };

  const getHurstExponentDescription = (value: number) => {
    if (value < 0.4) return 'Strong mean-reverting';
    if (value < 0.45) return 'Mean-reverting';
    if (value < 0.55) return 'Random walk';
    if (value < 0.6) return 'Weak trending';
    return 'Strong trending';
  };

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Render a value with its appropriate color
  const ColoredValue = ({ value, color }: { value: string, color: string }) => (
    <span className={`font-medium ${color}`}>{value}</span>
  );

  // Create a strategy card for displaying each technical strategy
  const StrategyCard = ({ 
    title, 
    signal, 
    confidence, 
    score,
    icon,
    indicators,
    tooltipContent
  }: { 
    title: string;
    signal: string;
    confidence: number;
    score: number;
    icon: React.ReactNode;
    indicators: {label: string; value: string | number; tooltip?: string; colorClass?: string}[];
    tooltipContent: string;
  }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-muted">
              {icon}
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-bold ${getSignalColor(signal)} capitalize`}>{signal}</span>
            <span className="text-sm text-muted-foreground ml-1">({confidence}% confidence)</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {tooltipContent}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {indicators.map((indicator, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{indicator.label}</span>
              </div>
              <div className={indicator.colorClass || ''}>
                {typeof indicator.value === 'string' ? indicator.value : indicator.value.toFixed(2)}
              </div>
              {indicator.tooltip && (
                <p className="text-xs text-muted-foreground">
                  {indicator.tooltip}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Price Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Price Chart with Technical Indicators</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Historical price data with EMAs (8, 21, 55) and Bollinger Bands overlaid
        </p>
        <StockChart prices={prices} />
      </div>

      {/* Overall Technical Signal */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">Technical Analysis</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Analysis Date:</span>
            <span className="font-medium">{formatDateString(technicals.biz_date)}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Technical analysis combines multiple quantitative trading strategies to generate signals based on price action and market statistics. It uses an ensemble approach with weighted signals from five different methodologies.
        </p>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${getSignalBgColor(technicals.signal)}`}></div>
            <div className="flex items-center gap-1">
              <span className={`font-semibold capitalize ${getSignalColor(technicals.signal)}`}>{technicals.signal}</span>
              <span className="text-sm text-muted-foreground">with {Math.round(technicals.confidence)}% confidence</span>
            </div>
          </div>

          {/* Strategy Overview Cards */}
          <div className="grid md:grid-cols-5 gap-5 mt-8 mb-8">
            <div className="bg-muted/50 rounded-lg p-4 text-center shadow-md border-2 hover:bg-muted transition-colors">
              <div className="mb-2 flex justify-center">
                <div className="p-2 bg-background rounded-full shadow-inner">
                  {getStrategyIcon('trend')}
                </div>
              </div>
              <div className={`text-lg font-extrabold capitalize ${getSignalColor(technicals.trend_signal)}`}>
                {technicals.trend_signal.toUpperCase()}
              </div>
              <div className="text-base font-semibold">Trend Following</div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 text-center shadow-md border-2 hover:bg-muted transition-colors">
              <div className="mb-2 flex justify-center">
                <div className="p-2 bg-background rounded-full shadow-inner">
                  {getStrategyIcon('mr')}
                </div>
              </div>
              <div className={`text-lg font-extrabold capitalize ${getSignalColor(technicals.mr_signal)}`}>
                {technicals.mr_signal.toUpperCase()}
              </div>
              <div className="text-base font-semibold">Mean Reversion</div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 text-center shadow-md border-2 hover:bg-muted transition-colors">
              <div className="mb-2 flex justify-center">
                <div className="p-2 bg-background rounded-full shadow-inner">
                  {getStrategyIcon('momentum')}
                </div>
              </div>
              <div className={`text-lg font-extrabold capitalize ${getSignalColor(technicals.momentum_signal)}`}>
                {technicals.momentum_signal.toUpperCase()}
              </div>
              <div className="text-base font-semibold">Momentum</div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 text-center shadow-md border-2 hover:bg-muted transition-colors">
              <div className="mb-2 flex justify-center">
                <div className="p-2 bg-background rounded-full shadow-inner">
                  {getStrategyIcon('volatility')}
                </div>
              </div>
              <div className={`text-lg font-extrabold capitalize ${getSignalColor(technicals.volatility_signal)}`}>
                {technicals.volatility_signal.toUpperCase()}
              </div>
              <div className="text-base font-semibold">Volatility</div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 text-center shadow-md border-2 hover:bg-muted transition-colors">
              <div className="mb-2 flex justify-center">
                <div className="p-2 bg-background rounded-full shadow-inner">
                  {getStrategyIcon('stat_arb')}
                </div>
              </div>
              <div className={`text-lg font-extrabold capitalize ${getSignalColor(technicals.stat_arb_signal)}`}>
                {technicals.stat_arb_signal.toUpperCase()}
              </div>
              <div className="text-base font-semibold">Statistical</div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Detail Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Trend Following */}
        <StrategyCard
          title="Trend Following"
          signal={technicals.trend_signal}
          confidence={technicals.trend_confidence}
          score={technicals.trend_score}
          icon={getStrategyIcon('trend')}
          tooltipContent="Trend following uses moving averages and directional indicators to identify market trends. It works best in trending markets and comprises 25% of the overall signal."
          indicators={[
            {
              label: "EMA Crossover",
              value: `${technicals.ema_8.toFixed(2)} / ${technicals.ema_21.toFixed(2)} / ${technicals.ema_55.toFixed(2)}`,
              tooltip: "Exponential Moving Averages for 8, 21, and 55 days. When shorter EMAs cross above longer ones, it's bullish.",
              colorClass: technicals.ema_8 > technicals.ema_55 ? 'font-medium text-green-500' : technicals.ema_8 < technicals.ema_55 ? 'font-medium text-red-500' : ''
            },
            {
              label: "ADX",
              value: technicals.adx.toFixed(2),
              tooltip: "Average Directional Index measures trend strength. Values above 25 indicate a strong trend.",
              colorClass: technicals.adx > 25 ? 'font-medium text-blue-500' : 'font-medium text-gray-500'
            },
            {
              label: "Directional Movement",
              value: `+DI: ${technicals.di_plus.toFixed(2)} / -DI: ${technicals.di_minus.toFixed(2)}`,
              tooltip: "Positive and negative directional indicators. When +DI > -DI, trend is bullish.",
              colorClass: technicals.di_plus > technicals.di_minus ? 'font-medium text-green-500' : 'font-medium text-red-500'
            },
            {
              label: "Score",
              value: technicals.trend_score.toFixed(4),
              tooltip: "Normalized trend score from -1 (strongly bearish) to +1 (strongly bullish).",
              colorClass: getValueColor(technicals.trend_score)
            }
          ]}
        />

        {/* Mean Reversion */}
        <StrategyCard
          title="Mean Reversion"
          signal={technicals.mr_signal}
          confidence={technicals.mr_confidence}
          score={technicals.mr_score}
          icon={getStrategyIcon('mr')}
          tooltipContent="Mean reversion strategies identify overextended price movements that are likely to reverse. This represents 20% of the overall signal."
          indicators={[
            {
              label: "Z-Score",
              value: technicals.z_score.toFixed(4),
              tooltip: "Measures how many standard deviations price is from its mean. Values below -2 or above +2 often signal reversal opportunities.",
              colorClass: getZScoreColor(technicals.z_score)
            },
            {
              label: "Bollinger Bands",
              value: `Upper: ${technicals.bb_upper.toFixed(2)} / Lower: ${technicals.bb_lower.toFixed(2)}`,
              tooltip: "Price bands that encompass typical volatility. Prices near the upper band may be overbought, while prices near the lower band may be oversold."
            },
            {
              label: "RSI",
              value: `14d: ${technicals.rsi_14.toFixed(2)} / 28d: ${technicals.rsi_28.toFixed(2)}`,
              tooltip: "Relative Strength Index measures momentum. Values below 30 suggest oversold conditions (bullish), while values above 70 suggest overbought conditions (bearish).",
              colorClass: getRSIColor(technicals.rsi_14)
            },
            {
              label: "Score",
              value: technicals.mr_score.toFixed(4),
              tooltip: "Mean reversion score ranging from -1 to +1, where extreme values suggest stronger mean reversion potential.",
              colorClass: getValueColor(technicals.mr_score)
            }
          ]}
        />

        {/* Momentum */}
        <StrategyCard
          title="Momentum"
          signal={technicals.momentum_signal}
          confidence={technicals.momentum_confidence}
          score={technicals.momentum_score}
          icon={getStrategyIcon('momentum')}
          tooltipContent="Momentum analysis captures the persistence of price movements across different time frames. It comprises 25% of the overall signal."
          indicators={[
            {
              label: "1-Month Momentum",
              value: formatPercent(technicals.mom_1m),
              tooltip: "Price performance over the last month.",
              colorClass: getMomentumColor(technicals.mom_1m)
            },
            {
              label: "3-Month Momentum",
              value: formatPercent(technicals.mom_3m),
              tooltip: "Price performance over the last 3 months.",
              colorClass: getMomentumColor(technicals.mom_3m)
            },
            {
              label: "6-Month Momentum",
              value: formatPercent(technicals.mom_6m),
              tooltip: "Price performance over the last 6 months.",
              colorClass: getMomentumColor(technicals.mom_6m)
            },
            {
              label: "Volume Ratio",
              value: technicals.volume_ratio.toFixed(2),
              tooltip: "Current volume relative to the 21-day average. Values above 1 indicate higher than average volume.",
              colorClass: technicals.volume_ratio > 1.5 ? 'font-medium text-blue-500' : technicals.volume_ratio < 0.5 ? 'font-medium text-gray-500' : ''
            }
          ]}
        />

        {/* Volatility Analysis */}
        <StrategyCard
          title="Volatility Analysis"
          signal={technicals.volatility_signal}
          confidence={technicals.volatility_confidence}
          score={technicals.volatility_score}
          icon={getStrategyIcon('volatility')}
          tooltipContent="Volatility analysis identifies changing market conditions and potential regime shifts. It comprises 15% of the overall signal."
          indicators={[
            {
              label: "Historical Volatility (21d)",
              value: formatPercent(technicals.hist_vol_21d),
              tooltip: "Annualized historical volatility based on 21 days of price data.",
              colorClass: technicals.hist_vol_21d > 0.6 ? 'font-medium text-red-500' : technicals.hist_vol_21d < 0.2 ? 'font-medium text-green-500' : ''
            },
            {
              label: "Volatility Regime",
              value: technicals.vol_regime.toFixed(2),
              tooltip: "Current volatility regime: <0.8 is low, >1.2 is high, between is normal.",
              colorClass: technicals.vol_regime > 1.2 ? 'font-medium text-red-500' : technicals.vol_regime < 0.8 ? 'font-medium text-green-500' : ''
            },
            {
              label: "Volatility Z-Score",
              value: technicals.vol_z_score.toFixed(2),
              tooltip: "How many standard deviations current volatility is from its historical mean.",
              colorClass: technicals.vol_z_score > 1 ? 'font-medium text-red-500' : technicals.vol_z_score < -1 ? 'font-medium text-green-500' : ''
            },
            {
              label: "ATR Ratio",
              value: technicals.atr_ratio.toFixed(4),
              tooltip: "Average True Range ratio measures recent range expansion/contraction.",
              colorClass: technicals.atr_ratio > 0.05 ? 'font-medium text-red-500' : technicals.atr_ratio < 0.02 ? 'font-medium text-green-500' : ''
            }
          ]}
        />

        {/* Statistical Arbitrage */}
        <StrategyCard
          title="Statistical Analysis"
          signal={technicals.stat_arb_signal}
          confidence={technicals.stat_arb_confidence}
          score={technicals.stat_arb_score}
          icon={getStrategyIcon('stat_arb')}
          tooltipContent="Statistical analysis examines price behavior patterns to identify statistical properties that might indicate future price movement. This comprises 15% of the overall signal."
          indicators={[
            {
              label: "Hurst Exponent",
              value: `${technicals.hurst_exp.toFixed(4)} (${getHurstExponentDescription(technicals.hurst_exp)})`,
              tooltip: "Measures the tendency for a time series to regress to the mean or cluster in a direction. Values below 0.5 indicate mean reversion, above 0.5 indicate trending.",
              colorClass: getHurstColor(technicals.hurst_exp)
            },
            {
              label: "Skewness",
              value: technicals.skewness.toFixed(4),
              tooltip: "Measures the asymmetry of returns. Positive values indicate more positive outliers, negative values indicate more negative outliers.",
              colorClass: technicals.skewness > 1 ? 'font-medium text-green-500' : technicals.skewness < -1 ? 'font-medium text-red-500' : ''
            },
            {
              label: "Kurtosis",
              value: technicals.kurtosis.toFixed(4),
              tooltip: "Measures the 'tailedness' of returns. Higher values indicate more extreme outliers compared to a normal distribution.",
              colorClass: technicals.kurtosis > 5 ? 'font-medium text-blue-500' : ''
            },
            {
              label: "Score",
              value: technicals.stat_arb_score.toFixed(4),
              tooltip: "Statistical evaluation score based on multiple statistical properties.",
              colorClass: getValueColor(technicals.stat_arb_score)
            }
          ]}
        />
      </div>
    </div>
  );
} 