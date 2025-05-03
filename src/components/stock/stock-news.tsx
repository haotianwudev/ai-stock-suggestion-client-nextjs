import { NewsItem } from "@/lib/graphql/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StockNewsProps {
  news: NewsItem[];
}

export function StockNews({ news }: StockNewsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(news.length / itemsPerPage);
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getSentimentBadge = (sentiment: string) => {
    switch(sentiment?.toLowerCase()) {
      case 'bullish':
      case 'positive':
        return <Badge className="bg-green-500">Bullish</Badge>;
      case 'bearish':
      case 'negative':
        return <Badge className="bg-red-500">Bearish</Badge>;
      case 'neutral':
        return <Badge className="bg-yellow-500">Neutral</Badge>;
      default:
        return null;
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Get current news items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNewsItems = news.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {news.length === 0 ? (
          <p className="text-center text-muted-foreground">No news available.</p>
        ) : (
          currentNewsItems.map((item, index) => (
            <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="mb-2">
                <div className="flex justify-between">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold hover:underline"
                  >
                    {item.title}
                  </a>
                  {item.sentiment && (
                    <div className="ml-2">{getSentimentBadge(item.sentiment)}</div>
                  )}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{formatDate(item.date)}</span>
                  <span className="mx-2">•</span>
                  <span>{item.source}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {news.length > itemsPerPage && (
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, news.length)} of {news.length} news
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 