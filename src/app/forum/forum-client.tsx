"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FORUM_CATEGORIES } from "@/lib/graphql/queries";
import { ForumCategory } from "@/lib/graphql/types";
import { SITE_FEEDBACK_CATEGORY_SLUG } from "@/lib/forum";
import { CategoryList } from "@/components/forum/category-list";
import { ThreadList } from "@/components/forum/thread-list";
import { NewThreadForm } from "@/components/forum/new-thread-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessagesSquare, BookOpen, MessageSquarePlus, Layers } from "lucide-react";

export function ForumClient() {
  const [tab, setTab] = useState("all");
  const { data } = useQuery<{ forumCategories: ForumCategory[] }>(GET_FORUM_CATEGORIES);
  const feedbackCategory = data?.forumCategories.find(
    (c) => c.slug === SITE_FEEDBACK_CATEGORY_SLUG
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Community Forum
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Discuss quantitative finance, market regimes, option strategies, and research articles with the community.
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 max-w-2xl h-auto p-1 gap-1">
          <TabsTrigger value="all" className="flex items-center justify-center gap-1.5 text-xs sm:text-sm py-2">
            <MessagesSquare className="size-3.5 shrink-0" />
            <span>All Discussions</span>
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center justify-center gap-1.5 text-xs sm:text-sm py-2">
            <BookOpen className="size-3.5 shrink-0" />
            <span>Article Comments</span>
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center justify-center gap-1.5 text-xs sm:text-sm py-2">
            <MessageSquarePlus className="size-3.5 shrink-0" />
            <span>Feedback</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center justify-center gap-1.5 text-xs sm:text-sm py-2">
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

        <TabsContent value="feedback" className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-teal-200 dark:border-teal-900/40 bg-teal-50/50 dark:bg-teal-950/20 p-4">
            <div>
              <h2 className="text-base font-semibold text-teal-900 dark:text-teal-200">
                Site & Platform Feedback
              </h2>
              <p className="text-xs text-teal-700/80 dark:text-teal-300/80 mt-0.5">
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
