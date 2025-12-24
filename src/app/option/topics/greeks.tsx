import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoTutorial, Infographic, RelatedArticles } from "./components";
import { getTopicConfig } from "./config";
import { GreeksTab } from "@/components/options/greeks-tab";

export function GreeksContent() {
  const config = getTopicConfig('greeks');
  
  if (!config) return null;

  return (
    <Card>
      <CardHeader className="pb-4 md:pb-6">
        <CardTitle className="text-xl md:text-2xl">{config.title}</CardTitle>
        <CardDescription className="text-sm md:text-base">
          {config.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 md:space-y-6">
        {/* Video Tutorial */}
        {config.videoUrl && (
          <VideoTutorial 
            videoUrl={config.videoUrl} 
            title="Option Greeks Tutorial"
          />
        )}

        {/* Infographic */}
        {config.infographicUrl && (
          <Infographic 
            imageUrl={config.infographicUrl} 
            title="Option Greeks Infographic"
            alt="Option Greeks Visual Guide"
          />
        )}

        {/* Related Articles */}
        {config.relatedArticles && (
          <RelatedArticles 
            articleSlugs={config.relatedArticles}
            title="Related Articles"
          />
        )}

        {/* Greeks Calculator Content */}
        <div className="mt-3 md:mt-6">
          <GreeksTab />
        </div>
      </CardContent>
    </Card>
  );
}