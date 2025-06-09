import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ArticleCardProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  imageUrl?: string;
  googleDoc?: string;
  deepResearch?: boolean;
  youtubeUrl?: string;
  isVideo?: boolean;
  options?: boolean;
}

export function ArticleCard({ title, description, slug, date, imageUrl, googleDoc, deepResearch, youtubeUrl, isVideo, options }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col shadow-sm border border-border h-auto">
      <div className="flex flex-col sm:flex-row gap-3 p-3 pb-0">
        {imageUrl && (
          <div className="relative flex-shrink-0 w-full sm:w-28 h-28 rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={imageUrl} 
              alt={title} 
              className="h-full w-full object-cover"
            />
            {deepResearch && (
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-xs text-white font-semibold shadow">
                Deep Research
              </span>
            )}
            {isVideo && (
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-gradient-to-r from-red-600 to-red-700 text-xs text-white font-semibold shadow">
                Video
              </span>
            )}
            {options && (
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-gradient-to-r from-orange-500 to-yellow-600 text-xs text-white font-semibold shadow">
                Options
              </span>
            )}
          </div>
        )}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <CardTitle className="text-xl font-bold leading-tight line-clamp-2 mb-0.5">{title}</CardTitle>
            <div className="flex items-center text-xs text-muted-foreground mb-1 gap-2">
              <span>{date}</span>
              {googleDoc && (
                <>
                  <span className="mx-1">·</span>
                  <a
                    href={googleDoc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-purple-700"
                  >
                    Google Doc
                  </a>
                </>
              )}
              {youtubeUrl && (
                <>
                  <span className="mx-1">·</span>
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-red-700"
                  >
                    YouTube
                  </a>
                </>
              )}
            </div>
            <CardDescription className="mb-2 text-sm text-muted-foreground line-clamp-5">
              {description}
            </CardDescription>
          </div>
          <div className="flex gap-2 mt-1 mb-1">
            {isVideo && youtubeUrl ? (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow hover:from-red-700 hover:to-red-800 transition-colors text-sm"
              >
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a2.991 2.991 0 0 0-2.11-2.11C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.388.576A2.991 2.991 0 0 0 .502 6.186C-.074 8.07-.074 12-.074 12s0 3.93.576 5.814a2.991 2.991 0 0 0 2.11 2.11C4.495 20.5 12 20.5 12 20.5s7.505 0 9.388-.576a2.991 2.991 0 0 0 2.11-2.11C23.574 15.93 23.574 12 23.574 12s0-3.93-.576-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch on YouTube
              </a>
            ) : (
              <>
                {googleDoc && (
                  <a
                    href={googleDoc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow hover:from-purple-700 hover:to-indigo-700 transition-colors text-sm"
                  >
                    Read Full Document
                  </a>
                )}
                <Link 
                  href={`/articles/${slug}`} 
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg border border-purple-400 text-purple-800 font-semibold bg-white hover:bg-purple-50 transition-colors text-sm"
                >
                  Read Summary <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
} 