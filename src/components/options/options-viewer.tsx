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

export function OptionsViewer() {
  const [ticker, setTicker] = useState('');
  const [inputTicker, setInputTicker] = useState('');
  const [data, setData] = useState<OptionsAPIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedExpiration, setSelectedExpiration] = useState<string>('');
  const [optionType, setOptionType] = useState<'calls' | 'puts'>('calls');

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

  const handleSearch = () => {
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

  const getMoneynessBadge = (moneyness: number) => {
    if (moneyness < 0.95) return { label: 'OTM', class: 'bg-red-100 text-red-800' };
    if (moneyness > 1.05) return { label: 'ITM', class: 'bg-green-100 text-green-800' };
    return { label: 'ATM', class: 'bg-yellow-100 text-yellow-800' };
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
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Enter ticker symbol (e.g., SPY, AAPL, TSLA)"
              value={inputTicker}
              onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button 
              variant="outline" 
              onClick={handleRefresh} 
              disabled={loading || !ticker || !data}
              title={!data ? "Search for data first to enable refresh" : "Refresh current data"}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
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
                Enter a ticker symbol and click "Search" to load options data. No data is loaded automatically.
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
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Select Expiration Date:</label>
              <div className="flex flex-wrap gap-2">
                {data.expirationDates.map((exp) => (
                  <Button
                    key={exp.expiration}
                    variant={selectedExpiration === exp.expiration ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedExpiration(exp.expiration)}
                    className="flex flex-col h-auto py-2 px-3"
                  >
                    <span className="text-xs">{formatDate(exp.expiration)}</span>
                    <span className="text-xs opacity-75">{exp.expirationLabel} ({exp.daysToExpiration}d)</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Call/Put Toggle */}
            <Tabs value={optionType} onValueChange={(value) => setOptionType(value as 'calls' | 'puts')}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="calls">Calls</TabsTrigger>
                <TabsTrigger value="puts">Puts</TabsTrigger>
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
        <div className="flex justify-center items-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Loading options data...</span>
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

  const getMoneynessBadge = (moneyness: number) => {
    if (moneyness < 0.95) return { label: 'OTM', class: 'bg-red-100 text-red-800' };
    if (moneyness > 1.05) return { label: 'ITM', class: 'bg-green-100 text-green-800' };
    return { label: 'ATM', class: 'bg-yellow-100 text-yellow-800' };
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Strike</th>
            <th className="text-left p-2">Last Price</th>
            <th className="text-left p-2">Bid/Ask</th>
            <th className="text-left p-2">IV</th>
            <th className="text-left p-2">Delta</th>
            <th className="text-left p-2">Volume</th>
            <th className="text-left p-2">OI</th>
            <th className="text-left p-2">Type</th>
          </tr>
        </thead>
        <tbody>
                     {sortedOptions.map((option) => {
             const moneynessBadge = getMoneynessBadge(option.moneyness || 1);
             return (
               <tr key={option.contractSymbol} className="border-b hover:bg-gray-50">
                                 <td className="p-2 font-medium">{formatCurrency(option.strike || 0)}</td>
                 <td className="p-2">{formatCurrency(option.lastPrice || 0)}</td>
                 <td className="p-2 text-xs">
                   <div>{formatCurrency(option.bid || 0)}</div>
                   <div>{formatCurrency(option.ask || 0)}</div>
                 </td>
                 <td className="p-2">
                   <div>{option.impliedVolatilityMid ? (option.impliedVolatilityMid * 100).toFixed(1) + '%' : 'N/A'}</div>
                   <div className="text-xs text-muted-foreground">
                     YF: {option.impliedVolatilityYF ? (option.impliedVolatilityYF * 100).toFixed(1) + '%' : 'N/A'}
                   </div>
                 </td>
                                 <td className="p-2">{(option.delta !== null && option.delta !== undefined) ? option.delta.toFixed(3) : 'N/A'}</td>
                 <td className="p-2">{(option.volume !== null && option.volume !== undefined) ? option.volume.toLocaleString() : 'N/A'}</td>
                 <td className="p-2">{(option.openInterest !== null && option.openInterest !== undefined) ? option.openInterest.toLocaleString() : 'N/A'}</td>
                <td className="p-2">
                  <Badge className={moneynessBadge.class}>
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