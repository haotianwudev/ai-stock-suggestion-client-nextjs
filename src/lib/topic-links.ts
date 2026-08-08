import { topicsConfig as optionTopicsConfig } from "@/app/option/topics/config";
import { topicsConfig as quantTopicsConfig } from "@/app/quant/topics/config";
import { quantTopicsConfig as quantTradingTopicsConfig } from "@/app/quant/quanttrading/config";
import { BaseConfig } from "@/components/shared/config-types";
import { strategies, strategyIdToSlug } from "@/components/options/strategy-config";

export interface TopicLink {
  title: string;
  href: string;
}

const TOPIC_SOURCES: Array<{ basePath: string; configs: Record<string, BaseConfig> }> = [
  { basePath: "/option/topics", configs: optionTopicsConfig },
  { basePath: "/quant/topics", configs: quantTopicsConfig },
  { basePath: "/quant/quanttrading", configs: quantTradingTopicsConfig },
];

// Reverse index: which topic curricula reference this article? Computed from the topic configs
// (studyGuide articleSlug / primaryArticleSlug — the same fields resolveRelatedArticleSlugs
// derives a topic's own "Related Articles" list from) rather than a separate per-article config,
// so a topic only needs to list an article once.
export function getTopicsForArticle(slug: string): TopicLink[] {
  const links: TopicLink[] = [];

  for (const { basePath, configs } of TOPIC_SOURCES) {
    for (const topic of Object.values(configs)) {
      const referenced =
        topic.studyGuide?.items.some((item) => item.articleSlug === slug) ||
        topic.primaryArticleSlug === slug;

      if (referenced) {
        links.push({ title: topic.title, href: `${basePath}/${topic.id}` });
      }
    }
  }

  return links;
}

// Same idea as getTopicsForArticle, for the Strategy Explorer (/option/strategies/{slug}).
export function getStrategiesForArticle(slug: string): TopicLink[] {
  return strategies
    .filter((strategy) => strategy.relatedArticles?.includes(slug) || strategy.primaryArticleSlug === slug)
    .map((strategy) => ({ title: strategy.name, href: `/option/strategies/${strategyIdToSlug(strategy.id)}` }));
}
