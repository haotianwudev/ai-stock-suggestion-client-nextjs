import Link from "next/link";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface StockData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  color?: string;
  sophieScore?: number;
}

interface StockCardProps {
  stock: StockData;
  loading?: boolean;
}

// Get score color based on the value - matching the analysis section
function getScoreColor(score: number): string {
  if (score >= 80) return 'from-green-500 to-emerald-600 border-green-300';
  if (score >= 60) return 'from-blue-500 to-indigo-600 border-blue-300';
  if (score >= 40) return 'from-yellow-500 to-amber-600 border-yellow-300';
  return 'from-red-500 to-rose-600 border-red-300';
}

export function StockCardSkeleton() {
  return (
    <Card className="opacity-70 animate-pulse">
      <div className="h-1 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-3 flex justify-between">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-1 mb-2">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
          
          <div className="space-y-2 mt-auto">
            <div className="flex items-baseline">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-20"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-2"></div>
            </div>
            
            <div className="flex items-center">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 ml-2"></div>
            </div>
          </div>
        </div>
        <div className="ml-3 flex items-center">
          <div className="h-14 w-14 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>
    </Card>
  );
}

export function StockCard({ stock }: StockCardProps) {
  return (
    <Link href={`/stock/${stock.ticker}`} className="group">
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className={`h-1 bg-gradient-to-r ${stock.color || "from-blue-400 to-blue-600"}`}></div>
        <div className="p-2 flex justify-between">
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col gap-0.5 mb-2">
              <CardTitle className="text-2xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">{stock.ticker}</CardTitle>
              <CardDescription className="text-sm font-medium truncate max-w-[180px] text-gray-600 dark:text-gray-400">{stock.name}</CardDescription>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-baseline">
                <div className="text-xl font-bold">${stock.price.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground ml-2">close price</div>
              </div>
              
              <div className="flex items-center">
                <div className={`flex items-center font-medium ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change >= 0 ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
                  {stock.change.toFixed(2)}%
                </div>
                <div className="text-xs text-muted-foreground ml-2">3-month change</div>
              </div>
            </div>
          </div>
          
          {/* SOPHIE Score - show loading state if score not available */}
          <div className="ml-2 flex items-center">
            <div className="relative">
              {stock.sophieScore !== undefined ? (
                <div 
                  className={`
                    w-14 h-14 rounded-md border-2 shadow-md flex items-center justify-center
                    bg-gradient-to-br ${getScoreColor(stock.sophieScore)}
                  `}
                >
                  <span className="text-xl font-bold text-white">{stock.sophieScore}</span>
                </div>
              ) : (
                <div className="w-14 h-14 rounded-md border-2 shadow-md flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-500 animate-pulse">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <div className="absolute -bottom-1 w-16 bg-black rounded-sm py-0.5 text-[8px] font-medium text-center text-white tracking-wide">
                SOPHIE SCORE
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
} 