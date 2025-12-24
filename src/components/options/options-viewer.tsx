"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Search,
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign, 
  Calendar,
  BarChart3,
  RefreshCw,
  AlertCircle,
  Info
} from 'lucide-react';

// API endpoint
const API_ENDPOINT = 'https://whl064peuf.execute-api.us-east-1.amazonaws.com/options-analytics';

// Types based on the API response
interface StockData {
  price: number;
  previousClose: number;
  percentChange: number;
  timestamp: string;
}

interface VIXData {
  value: number;
  previousClose: number;
  percentChange: number;
  timestamp: string;
}

interface OptionContract {
  strike: number;
  lastPrice: number;
  impliedVolatilityYF?: number;
  delta?: number;
  contractSymbol: string;
  lastTradeDate: string;
  bid?: number;
  ask?: number;
  midPrice?: number;
  volume?: number;
  openInterest?: number;
  moneyness?: number;
  impliedVolatilityBid?: number;
  impliedVolatilityMid?: number;
  impliedVolatilityAsk?: number;
}

interface ExpirationData {
  expiration: string;
  daysToExpiration: number;
  expirationLabel: string;
  calls: OptionContract[];
  puts: OptionContract[];
}

interface OptionsAPIResponse {
  ticker: string;
  stock: StockData;
  vix: VIXData;
  expirationDates: ExpirationData[];
}

interface OverallMetrics {
  putCallRatio: number;
  putCallRatioVolume: number;
  ivSkew30: number;
  totalVolume: number;
  totalOpenInterest: number;
}

export function OptionsViewer() {
  const [ticker, setTicker] = useState('');
  const [inputTicker, setInputTicker] = useState('');
  const [data, setData] = useState<OptionsAPIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedExpiration, setSelectedExpiration] = useState<string>('');
  const [optionType, setOptionType] = useState<'calls' | 'puts'>('calls');
  
  // Available ticker options
  const availableTickers = ['SPY', 'QQQ', '^SPX'];

  // Debug logging to see component state on mount
  console.log('OptionsViewer render - loading:', loading, 'data:', !!data, 'error:', !!error);

  // Force loading to false on mount to prevent any caching issues
  useEffect(() => {
    if (loading) {
      console.log('WARNING: Loading was true on mount, forcing to false');
      setLoading(false);
    }
  }, []);

  const fetchOptionsData = async (symbol: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_ENDPOINT}?ticker=${symbol.toUpperCase()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      
      const result: OptionsAPIResponse = await response.json();
      setData(result);
      setTicker(result.ticker);
      
      // Set default expiration to the first available
      if (result.expirationDates.length > 0) {
        setSelectedExpiration(result.expirationDates[0].expiration);
      }
    } catch (err) {
      console.error('Error fetching options data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleTickerSelect = (selectedTicker: string) => {
    fetchOptionsData(selectedTicker);
    setInputTicker(''); // Clear custom input when using predefined selection
  };

  const handleCustomSearch = () => {
    if (inputTicker.trim()) {
      fetchOptionsData(inputTicker.trim());
    }
  };

  const handleRefresh = () => {
    if (ticker && data) {
      fetchOptionsData(ticker);
    }
  };

  // No automatic data loading - only fetch when user clicks search

  // Get options for selected expiration
  const selectedExpirationData = useMemo(() => {
    if (!data || !selectedExpiration) return null;
    return data.expirationDates.find(exp => exp.expiration === selectedExpiration);
  }, [data, selectedExpiration]);

  // Calculate overall metrics
  const overallMetrics = useMemo(() => {
    if (!selectedExpirationData || !data) return null;

    const { calls, puts } = selectedExpirationData;
    
    // Put-Call Ratio (Open Interest)
    const totalCallOI = calls.reduce((sum, option) => sum + (option.openInterest || 0), 0);
    const totalPutOI = puts.reduce((sum, option) => sum + (option.openInterest || 0), 0);
    const putCallRatio = totalCallOI > 0 ? totalPutOI / totalCallOI : 0;

    // Put-Call Ratio (Volume)
    const totalCallVolume = calls.reduce((sum, option) => sum + (option.volume || 0), 0);
    const totalPutVolume = puts.reduce((sum, option) => sum + (option.volume || 0), 0);
    const putCallRatioVolume = totalCallVolume > 0 ? totalPutVolume / totalCallVolume : 0;

    // IV Skew (30-delta puts vs calls) - simplified calculation
    const atmPrice = data.stock.price;
    const callsNearATM = calls.filter(c => Math.abs(c.strike - atmPrice) / atmPrice < 0.1);
    const putsNearATM = puts.filter(p => Math.abs(p.strike - atmPrice) / atmPrice < 0.1);
    
    const avgCallIV = callsNearATM.length > 0 ? 
      callsNearATM.reduce((sum, c) => sum + (c.impliedVolatilityYF || 0), 0) / callsNearATM.length : 0;
    const avgPutIV = putsNearATM.length > 0 ? 
      putsNearATM.reduce((sum, p) => sum + (p.impliedVolatilityYF || 0), 0) / putsNearATM.length : 0;
    
    const ivSkew30 = (avgPutIV - avgCallIV) * 100;

    // Total metrics
    const totalVolume = totalCallVolume + totalPutVolume;
    const totalOpenInterest = totalCallOI + totalPutOI;

    return {
      putCallRatio,
      putCallRatioVolume,
      ivSkew30,
      totalVolume,
      totalOpenInterest
    };
  }, [selectedExpirationData, data]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // New function to format expiration as weeks/months
  const formatExpirationTime = (daysToExpiration: number) => {
    if (daysToExpiration <= 7) {
      return `${daysToExpiration}d`;
    } else if (daysToExpiration <= 30) {
      const weeks = Math.round(daysToExpiration / 7);
      return `${weeks}w`;
    } else {
      const months = Math.round(daysToExpiration / 30);
      return `${months}m`;
    }
  };

  // Calculate expiration time from actual expiration date
  const calculateExpirationTime = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const diffTime = expiration.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
      return `${diffDays}d`;
    } else if (diffDays <= 30) {
      const weeks = Math.round(diffDays / 7);
      return `${weeks}w`;
    } else {
      const months = Math.round(diffDays / 30);
      return `${months}m`;
    }
  };

  const getMoneynessBadge = (moneyness: number, optionType: 'calls' | 'puts') => {
    // FIXED LOGIC - swapped based on user feedback:
    // For calls: ITM when stock price < strike (moneyness < 1), OTM when stock price > strike (moneyness > 1) 
    // For puts: ITM when stock price > strike (moneyness > 1), OTM when stock price < strike (moneyness < 1)
    
    if (optionType === 'calls') {
      if (moneyness < 0.95) return { label: 'ITM', class: 'bg-green-100 text-green-800' };
      if (moneyness > 1.05) return { label: 'OTM', class: 'bg-red-100 text-red-800' };
      return { label: 'ATM', class: 'bg-yellow-100 text-yellow-800' };
    } else {
      // puts - opposite logic
      if (moneyness > 1.05) return { label: 'ITM', class: 'bg-green-100 text-green-800' };
      if (moneyness < 0.95) return { label: 'OTM', class: 'bg-red-100 text-red-800' };
      return { label: 'ATM', class: 'bg-yellow-100 text-yellow-800' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Live Options Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Combined Selection Row */}
            <div className="flex flex-col gap-4 md:gap-6">
              {/* Quick Selection */}
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 md:mb-3 block">Quick Select:</label>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2 md:gap-3">
                  {availableTickers.map((tickerOption) => (
                    <Button
                      key={tickerOption}
                      variant={ticker === tickerOption && !inputTicker ? "default" : "outline"}
                      onClick={() => handleTickerSelect(tickerOption)}
                      disabled={loading}
                      className="w-full sm:w-auto min-w-[80px] h-12 md:h-12 text-base md:text-sm font-medium touch-manipulation"
                    >
                      {tickerOption}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Ticker Input */}
              <div className="w-full md:w-80">
                <label className="text-sm font-medium mb-2 md:mb-3 block">Or enter custom ticker:</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., AAPL, TSLA"
                    value={inputTicker}
                    onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && handleCustomSearch()}
                    className="flex-1 h-12 text-base md:text-sm touch-manipulation"
                    autoCapitalize="characters"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    style={{ fontSize: '16px' }} // Prevents zoom on iOS
                  />
                  <Button 
                    onClick={handleCustomSearch} 
                    disabled={loading || !inputTicker.trim()} 
                    className="h-12 px-4 md:px-4 touch-manipulation"
                    size="default"
                  >
                    <Search className="h-5 w-5 md:h-4 md:w-4" />
                    <span className="ml-2 hidden sm:inline">Search</span>
                  </Button>
                </div>
              </div>
            </div>
            
            {ticker && (
              <div className="flex justify-center sm:justify-end">
                <Button 
                  variant="outline" 
                  onClick={handleRefresh} 
                  disabled={loading || !data}
                  title={!data ? "Load data first to enable refresh" : "Refresh current data"}
                  className="h-12 px-6 touch-manipulation w-full sm:w-auto"
                >
                  <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  <span className="text-base md:text-sm">Refresh {ticker}</span>
                </Button>
              </div>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!data && !loading && !error && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Use the quick select buttons (SPY, QQQ, ^SPX) or enter a custom ticker symbol to load options data.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Stock and VIX Data */}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  {data.ticker} Stock Price
                </span>
                <Badge variant={data.stock.percentChange >= 0 ? "default" : "destructive"}>
                  {formatPercentage(data.stock.percentChange)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Current Price:</span>
                  <span className="font-semibold">{formatCurrency(data.stock.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Previous Close:</span>
                  <span>{formatCurrency(data.stock.previousClose)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Change:</span>
                  <span className={`flex items-center gap-1 ${
                    data.stock.percentChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.stock.percentChange >= 0 ? 
                      <TrendingUp className="h-4 w-4" /> : 
                      <TrendingDown className="h-4 w-4" />
                    }
                    {formatPercentage(data.stock.percentChange)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground pt-2">
                  Updated: {new Date(data.stock.timestamp).toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  VIX Index
                </span>
                <Badge variant={data.vix.percentChange >= 0 ? "destructive" : "default"}>
                  {formatPercentage(data.vix.percentChange)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Current Value:</span>
                  <span className="font-semibold">{data.vix.value.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Previous Close:</span>
                  <span>{data.vix.previousClose.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Change:</span>
                  <span className={`flex items-center gap-1 ${
                    data.vix.percentChange >= 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {data.vix.percentChange >= 0 ? 
                      <TrendingUp className="h-4 w-4" /> : 
                      <TrendingDown className="h-4 w-4" />
                    }
                    {formatPercentage(data.vix.percentChange)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground pt-2">
                  Updated: {new Date(data.vix.timestamp).toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Overall Options Metrics */}
      {data && overallMetrics && selectedExpirationData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Options Market Metrics
              <Badge variant="outline" className="ml-2">
                {formatDate(selectedExpirationData.expiration)}
              </Badge>
            </CardTitle>
          </CardHeader>
                     <CardContent>
             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
               <div className="text-center">
                 <div className="text-sm text-muted-foreground">P/C Ratio (OI)</div>
                 <div className="text-lg font-semibold">{overallMetrics.putCallRatio.toFixed(2)}</div>
               </div>
               <div className="text-center">
                 <div className="text-sm text-muted-foreground">P/C Ratio (Vol)</div>
                 <div className="text-lg font-semibold">{overallMetrics.putCallRatioVolume.toFixed(2)}</div>
               </div>
               <div className="text-center">
                 <div className="text-sm text-muted-foreground">IV Skew</div>
                 <div className="text-lg font-semibold">{overallMetrics.ivSkew30.toFixed(1)}%</div>
               </div>
               <div className="text-center">
                 <div className="text-sm text-muted-foreground">Total Volume</div>
                 <div className="text-lg font-semibold">{overallMetrics.totalVolume.toLocaleString()}</div>
               </div>
               <div className="text-center">
                 <div className="text-sm text-muted-foreground">Total OI</div>
                 <div className="text-lg font-semibold">{overallMetrics.totalOpenInterest.toLocaleString()}</div>
               </div>
             </div>
           </CardContent>
        </Card>
      )}

      {/* Options Chain */}
      {data && data.expirationDates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Options Chain
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Expiration Date Selector */}
            <div className="mb-4 md:mb-6">
              <label className="text-sm font-medium mb-2 block">Select Expiration Date:</label>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2">
                {data.expirationDates.map((exp) => (
                  <Button
                    key={exp.expiration}
                    variant={selectedExpiration === exp.expiration ? "default" : "outline"}
                    onClick={() => setSelectedExpiration(exp.expiration)}
                    className="flex flex-col h-auto py-3 px-3 text-xs touch-manipulation w-full lg:w-auto min-w-[120px]"
                  >
                    <span className="text-sm font-medium">{formatDate(exp.expiration)}</span>
                    <span className="text-xs opacity-75 mt-1">
                      {calculateExpirationTime(exp.expiration)}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Call/Put Toggle */}
            <Tabs value={optionType} onValueChange={(value) => setOptionType(value as 'calls' | 'puts')}>
              <TabsList className="grid w-full grid-cols-2 mb-4 h-12 touch-manipulation">
                <TabsTrigger value="calls" className="text-base font-medium h-10">Calls</TabsTrigger>
                <TabsTrigger value="puts" className="text-base font-medium h-10">Puts</TabsTrigger>
              </TabsList>

              {selectedExpirationData && (
                <>
                  <TabsContent value="calls">
                    <OptionsTable options={selectedExpirationData.calls} type="calls" />
                  </TabsContent>
                  <TabsContent value="puts">
                    <OptionsTable options={selectedExpirationData.puts} type="puts" />
                  </TabsContent>
                </>
              )}
            </Tabs>
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className="flex flex-col justify-center items-center py-12 px-4">
          <RefreshCw className="h-8 w-8 animate-spin mb-3 text-blue-600" />
          <span className="text-base font-medium text-gray-700">Loading options data...</span>
          <span className="text-sm text-gray-500 mt-1">This may take a few seconds</span>
        </div>
      )}
    </div>
  );
}

// Options Table Component
interface OptionsTableProps {
  options: OptionContract[];
  type: 'calls' | 'puts';
}

function OptionsTable({ options, type }: OptionsTableProps) {
  const sortedOptions = useMemo(() => {
    return [...options].sort((a, b) => a.strike - b.strike);
  }, [options]);

  if (options.length === 0) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          No {type} data available for this expiration date.
        </AlertDescription>
      </Alert>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getMoneynessBadge = (moneyness: number, optionType: 'calls' | 'puts') => {
    // FIXED LOGIC - swapped based on user feedback:
    // For calls: ITM when stock price < strike (moneyness < 1), OTM when stock price > strike (moneyness > 1) 
    // For puts: ITM when stock price > strike (moneyness > 1), OTM when stock price < strike (moneyness < 1)
    
    if (optionType === 'calls') {
      if (moneyness < 0.95) return { label: 'ITM', class: 'bg-green-100 text-green-800' };
      if (moneyness > 1.05) return { label: 'OTM', class: 'bg-red-100 text-red-800' };
      return { label: 'ATM', class: 'bg-yellow-100 text-yellow-800' };
    } else {
      // puts - opposite logic
      if (moneyness > 1.05) return { label: 'ITM', class: 'bg-green-100 text-green-800' };
      if (moneyness < 0.95) return { label: 'OTM', class: 'bg-red-100 text-red-800' };
      return { label: 'ATM', class: 'bg-yellow-100 text-yellow-800' };
    }
  };

  return (
    <div className="overflow-x-auto -mx-3 px-3 md:mx-0 md:px-0">
      <table className="w-full text-xs md:text-sm min-w-[800px]">
        <thead>
          <tr className="border-b">
            <th className="text-left p-1 md:p-2">Strike</th>
            <th className="text-left p-1 md:p-2">Last</th>
            <th className="text-left p-1 md:p-2 hidden sm:table-cell">Bid/Ask</th>
            <th className="text-left p-1 md:p-2">IV</th>
            <th className="text-left p-1 md:p-2 hidden md:table-cell">Delta</th>
            <th className="text-left p-1 md:p-2 hidden lg:table-cell">Money</th>
            <th className="text-left p-1 md:p-2 hidden sm:table-cell">Vol</th>
            <th className="text-left p-1 md:p-2 hidden sm:table-cell">OI</th>
            <th className="text-left p-1 md:p-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {sortedOptions.map((option) => {
            const moneynessBadge = getMoneynessBadge(isNaN(option.moneyness || 0) ? 1 : option.moneyness || 1, type);
            
            // Format IV values - simplified for mobile
            const ivYF = (option.impliedVolatilityYF && !isNaN(option.impliedVolatilityYF)) ? (option.impliedVolatilityYF * 100).toFixed(1) : 'N/A';
            const ivMid = (option.impliedVolatilityMid && !isNaN(option.impliedVolatilityMid)) ? (option.impliedVolatilityMid * 100).toFixed(1) : 'N/A';
            // Show simplified IV on mobile, full on desktop
            const ivDisplay = ivYF;
            
            // Format bid/ask in single line
            const bid = (option.bid && !isNaN(option.bid)) ? option.bid.toFixed(2) : 'N/A';
            const ask = (option.ask && !isNaN(option.ask)) ? option.ask.toFixed(2) : 'N/A';
            const bidAskDisplay = `${bid}/${ask}`;
            
            // Format moneyness
            const moneyness = (option.moneyness !== null && option.moneyness !== undefined && !isNaN(option.moneyness)) ? option.moneyness.toFixed(2) : 'N/A';
            
            return (
              <tr key={option.contractSymbol} className="border-b hover:bg-gray-50">
                <td className="p-1 md:p-2 font-medium text-xs md:text-sm">{formatCurrency(isNaN(option.strike) ? 0 : option.strike || 0)}</td>
                <td className="p-1 md:p-2 text-xs md:text-sm">{formatCurrency(isNaN(option.lastPrice) ? 0 : option.lastPrice || 0)}</td>
                <td className="p-1 md:p-2 text-xs hidden sm:table-cell">{bidAskDisplay}</td>
                <td className="p-1 md:p-2 text-xs">{ivDisplay}</td>
                <td className="p-1 md:p-2 text-xs hidden md:table-cell">{(option.delta !== null && option.delta !== undefined && !isNaN(option.delta)) ? option.delta.toFixed(3) : 'N/A'}</td>
                <td className="p-1 md:p-2 text-xs hidden lg:table-cell">{moneyness}</td>
                <td className="p-1 md:p-2 text-xs hidden sm:table-cell">{(option.volume !== null && option.volume !== undefined && !isNaN(option.volume)) ? option.volume.toLocaleString() : 'N/A'}</td>
                <td className="p-1 md:p-2 text-xs hidden sm:table-cell">{(option.openInterest !== null && option.openInterest !== undefined && !isNaN(option.openInterest)) ? option.openInterest.toLocaleString() : 'N/A'}</td>
                <td className="p-1 md:p-2">
                  <Badge className={`${moneynessBadge.class} text-xs px-1 py-0`}>
                    {moneynessBadge.label}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
} 