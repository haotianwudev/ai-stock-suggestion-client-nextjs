import { NewsItem } from "@/lib/graphql/types";
import { Button } from "@/components/ui/button";

interface StockNewsProps {
  news: NewsItem[];
}

export function StockNews({ news }: StockNewsProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {news.length === 0 ? (
        <p className="text-center text-muted-foreground">No news available.</p>
      ) : (
        news.map((item, index) => (
          <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
            <div className="mb-2">
              <h3 className="font-semibold">{item.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{formatDate(item.date)}</span>
                <span className="mx-2">•</span>
                <span>{item.source}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </Button>
          </div>
        ))
      )}
    </div>
  );
} 