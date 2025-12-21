import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/data/articles";

interface VideoTutorialProps {
  videoUrl: string;
  title?: string;
}

export function VideoTutorial({ videoUrl, title = "Video Tutorial" }: VideoTutorialProps) {
  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);
  
  if (!videoId) return null;

  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-200 mb-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">🎥</span>
        {title}
      </h3>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

interface InfographicProps {
  imageUrl: string;
  title?: string;
  alt?: string;
}

export function Infographic({ imageUrl, title = "Infographic", alt = "Educational Infographic" }: InfographicProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 mb-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">📊</span>
        {title}
      </h3>
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
        <img 
          src={imageUrl} 
          alt={alt}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

interface RelatedArticlesProps {
  articleSlugs: string[];
  title?: string;
}

export function RelatedArticles({ articleSlugs, title = "Related Articles" }: RelatedArticlesProps) {
  if (!articleSlugs || articleSlugs.length === 0) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">📚</span>
          {title}
        </h3>
      </div>
      
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        {articleSlugs.map((slug: string) => {
          const article = articles.find(a => a.slug === slug);
          if (!article || !article.title || !article.slug) return null;
          
          return (
            <ArticleCard 
              key={article.slug}
              title={article.title}
              description={article.description}
              slug={article.slug}
              date={article.date}
              imageUrl={article.imageUrl}
              googleDoc={article.googleDoc}
              deepResearch={article.deepResearch}
              youtubeUrl={article.youtubeUrl}
              isVideo={article.isVideo}
              options={article.options}
              noSummary={article.noSummary}
              podcastUrl={article.podcastUrl}
            />
          );
        })}
      </div>
    </>
  );
}