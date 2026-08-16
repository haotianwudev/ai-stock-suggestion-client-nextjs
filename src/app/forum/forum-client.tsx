"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_FORUM_CATEGORIES } from "@/lib/graphql/queries";
import { ForumCategory } from "@/lib/graphql/types";
import { SITE_FEEDBACK_CATEGORY_SLUG } from "@/lib/forum";
import { CategoryList } from "@/components/forum/category-list";
import { ThreadList } from "@/components/forum/thread-list";
import { NewThreadForm } from "@/components/forum/new-thread-form";
import { QuantTrendingClient } from "@/app/quant-trending/quant-trending-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SlotKicker } from "@/components/articles/article-frame";
import { MessagesSquare, BookOpen, MessageSquarePlus, Layers, Flame, Sparkles } from "lucide-react";

export function ForumClient({ initialTab }: { initialTab?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const [tab, setTab] = useState(initialTab || tabParam || "all");

  useEffect(() => {
    if (tabParam && ["all", "articles", "quant-trending", "feedback", "categories"].includes(tabParam)) {
      setTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
    const params = new URLSearchParams(searchParams.toString());
    if (newTab === "all") {
      params.delete("tab");
    } else {
      params.set("tab", newTab);
    }
    const queryString = params.toString();
    router.replace(queryString ? `/forum?${queryString}` : "/forum", { scroll: false });
  };

  const { data } = useQuery<{ forumCategories: ForumCategory[] }>(GET_FORUM_CATEGORIES);
  const feedbackCategory = data?.forumCategories.find(
    (c) => c.slug === SITE_FEEDBACK_CATEGORY_SLUG
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <SlotKicker icon={MessagesSquare} label="Community & Discussions" tone="accent" />
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Community Forum
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Discuss quantitative finance, market regimes, option strategies, research articles, and live trending topics.
        </p>
      </div>

      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 max-w-3xl h-auto p-1 gap-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs">
          <TabsTrigger
            value="all"
            className="flex items-center justify-center gap-1.5 text-xs sm:text-sm py-2 rounded-lg text-slate-700 dark:text-slate-300 data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] font-medium transition-all"
          >
            <MessagesSquare className="size-3.5 shrink-0" />
            <span>All Discussions</span>
          </TabsTrigger>
          <TabsTrigger
            value="articles"
            className="flex items-center justify-center gap-1.5 text-xs sm:text-sm py-2 rounded-lg text-slate-700 dark:text-slate-300 data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] font-medium transition-all"
          >
            <BookOpen className="size-3.5 shrink-0" />
            <span>Article Comments</span>
          </TabsTrigger>
          <TabsTrigger
            value="quant-trending"
            className="flex items-center justify-center gap-1.5 text-xs sm:text-sm py-2 rounded-lg text-slate-700 dark:text-slate-300 data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] font-medium transition-all"
          >
            <Flame className="size-3.5 shrink-0 text-orange-500 data-[state=active]:text-white" />
            <span>Quant Trending</span>
          </TabsTrigger>
          <TabsTrigger
            value="feedback"
            className="flex items-center justify-center gap-1.5 text-xs sm:text-sm py-2 rounded-lg text-slate-700 dark:text-slate-300 data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] font-medium transition-all"
          >
            <MessageSquarePlus className="size-3.5 shrink-0" />
            <span>Feedback</span>
          </TabsTrigger>
          <TabsTrigger
            value="categories"
            className="flex items-center justify-center gap-1.5 text-xs sm:text-sm py-2 rounded-lg text-slate-700 dark:text-slate-300 data-[state=active]:bg-[#A8672E] data-[state=active]:text-white dark:data-[state=active]:bg-[#D08F52] dark:data-[state=active]:text-[#14171B] font-medium transition-all"
          >
            <Layers className="size-3.5 shrink-0" />
            <span>Categories</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <ThreadList filterType="all" />
        </TabsContent>

        <TabsContent value="articles" className="mt-6">
          <ThreadList filterType="articles" />
        </TabsContent>

        <TabsContent value="quant-trending" className="mt-6">
          <QuantTrendingClient />
        </TabsContent>

        <TabsContent value="feedback" className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-teal-200/80 dark:border-teal-900/40 bg-teal-50/50 dark:bg-teal-950/20 p-4 shadow-xs">
            <div>
              <h2 className="text-base font-serif font-bold text-teal-950 dark:text-teal-200">
                Site & Platform Feedback
              </h2>
              <p className="text-xs sm:text-sm text-teal-800/80 dark:text-teal-300/80 mt-0.5 leading-relaxed">
                Share feature ideas, suggestions, corrections, or platform feedback. Open to all members!
              </p>
            </div>
            {feedbackCategory && (
              <div className="shrink-0">
                <NewThreadForm
                  categoryId={feedbackCategory.id}
                  categorySlug={SITE_FEEDBACK_CATEGORY_SLUG}
                />
              </div>
            )}
          </div>
          <ThreadList categorySlug={SITE_FEEDBACK_CATEGORY_SLUG} />
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <CategoryList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
