'use client';

import { Header } from "@/components/layout/header";
import { Disclaimer } from "@/components/ui/disclaimer";
import { Globe, ExternalLink, BookOpen, TrendingUp, Brain, BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface NeighborhoodSite {
  name: string;
  url: string;
  description: string;
  tags: string[];
  category: 'blog' | 'tool' | 'research' | 'community' | 'data';
  featured?: boolean;
}

const categoryConfig: Record<NeighborhoodSite['category'], { label: string; color: string; icon: React.ReactNode }> = {
  blog: { label: 'Blog', color: 'bg-blue-100 text-blue-800', icon: <BookOpen className="h-3 w-3" /> },
  tool: { label: 'Tool', color: 'bg-green-100 text-green-800', icon: <TrendingUp className="h-3 w-3" /> },
  research: { label: 'Research', color: 'bg-purple-100 text-purple-800', icon: <Brain className="h-3 w-3" /> },
  community: { label: 'Community', color: 'bg-orange-100 text-orange-800', icon: <Globe className="h-3 w-3" /> },
  data: { label: 'Data', color: 'bg-teal-100 text-teal-800', icon: <BarChart2 className="h-3 w-3" /> },
};

const neighborhoodSites: NeighborhoodSite[] = [
  {
    name: "Theta.md",
    url: "https://theta.md",
    description: "A curated knowledge base for options traders and quant practitioners. Covers options theory, volatility, Greeks, and systematic strategies with clean, well-structured markdown content.",
    tags: ["Options", "Volatility", "Greeks", "Systematic"],
    category: "research",
    featured: true,
  },
  {
    name: "SqueezeMetrics DIX",
    url: "https://squeezemetrics.com/monitor/dix",
    description: "The Dark Index (DIX) tracks dark pool short volume as a contrarian sentiment indicator. When dark pool participants are heavily shorting, it often signals institutional accumulation — a unique window into smart money positioning.",
    tags: ["Dark Pool", "Sentiment", "Market Structure", "GEX", "Options Flow"],
    category: "data",
    featured: true,
  },
];

function SiteCard({ site }: { site: NeighborhoodSite }) {
  const cat = categoryConfig[site.category];

  return (
    <a href={site.url} target="_blank" rel="noopener noreferrer" className="block group">
      <Card className={`h-full transition-all duration-200 hover:shadow-md hover:border-blue-300 cursor-pointer ${site.featured ? 'border-blue-200 bg-gradient-to-br from-blue-50/50 to-white' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <CardTitle className="text-base md:text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                {site.name}
              </CardTitle>
              {site.featured && (
                <Badge className="bg-yellow-100 text-yellow-800 text-xs shrink-0">Featured</Badge>
              )}
            </div>
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0 mt-0.5" />
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium w-fit ${cat.color}`}>
            {cat.icon}
            {cat.label}
          </span>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <CardDescription className="text-sm text-slate-600 leading-relaxed">
            {site.description}
          </CardDescription>
          <div className="flex flex-wrap gap-1.5">
            {site.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-blue-500 truncate">{site.url}</p>
        </CardContent>
      </Card>
    </a>
  );
}

export default function NeighborhoodPage() {
  const featured = neighborhoodSites.filter(s => s.featured);
  const rest = neighborhoodSites.filter(s => !s.featured);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container max-w-screen-2xl mx-auto py-4 px-4 md:py-8 md:px-6">
          {/* Hero */}
          <div className="text-center mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                Quant Neighborhood
              </h1>
            </div>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Interesting websites, blogs, and tools from the quant and options community worth bookmarking.
            </p>
          </div>

          {/* Featured */}
          {featured.length > 0 && (
            <div className="space-y-3 mb-8">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Featured</h2>
              <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2">
                {featured.map(site => <SiteCard key={site.url} site={site} />)}
              </div>
            </div>
          )}

          {/* All Sites */}
          {rest.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">All Sites</h2>
              <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {rest.map(site => <SiteCard key={site.url} site={site} />)}
              </div>
            </div>
          )}
        </div>
      </main>

      <Disclaimer />
    </div>
  );
}
