"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
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
import { useUser } from "@/hooks/use-user";
import { TierBadge } from "@/components/shared/tier-badge";
import {
  MessagesSquare,
  BookOpen,
  MessageSquarePlus,
  Layers,
  Flame,
  Clock,
  LineChart,
  ArrowRight,
  Gift,
  ExternalLink,
  Library,
  GraduationCap,
} from "lucide-react";

export function ForumClient({ initialTab }: { initialTab?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, profile } = useUser();
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <SlotKicker icon={MessagesSquare} label="Community & Discussions" tone="accent" />
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Community Forum
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Discuss quantitative finance, market regimes, option mechanics, research articles, and live trending topics.
          </p>
        </div>

        {/* User Rank Card */}
        {user && profile && (
          <div className="shrink-0 flex items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 sm:px-4 shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  {profile.displayName || "Member"}
                </span>
                <TierBadge tier={profile.tier ?? 1} size="xs" showTierNumber="prefix" />
              </div>
              <Link
                href="/donate"
                className="text-[11px] font-medium text-[#A8672E] dark:text-[#D08F52] hover:underline flex items-center gap-1"
              >
                <span>View tier perks</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Topic Bounty Banner */}
      <div className="rounded-2xl border border-[#A8672E]/30 bg-gradient-to-r from-[#A8672E]/10 via-[#A8672E]/5 to-transparent dark:from-[#D08F52]/15 dark:via-[#D08F52]/5 dark:to-transparent p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] shrink-0 shadow-xs">
              <Gift className="size-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  Topic Request Bounty &mdash; Get Promoted!
                </h3>
                <span className="rounded-md bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] px-1.5 py-0.5 text-[10px] font-bold font-mono uppercase tracking-wider">
                  Tier Promotion
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                Post any quantitative finance topic, option strategy, or breaking market news you want explained in a YouTube video & research article. SOPHIE Daddy will upgrade your account tier to try out premium tools!
              </p>
            </div>
          </div>
          <Link
            href="/forum/site-feedback/5"
            className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#A8672E] hover:bg-[#8e5625] dark:bg-[#D08F52] dark:hover:bg-[#b87c44] text-white dark:text-[#14171B] font-semibold text-xs sm:text-sm shadow-xs transition-all"
          >
            <span>Request a Topic</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Platform Cross-Links Hub */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Link
          href="/wiki"
          className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3.5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-2 mb-1 text-[#A8672E] dark:text-[#D08F52]">
            <Library className="size-4" />
            <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors">
              Quant Wiki
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
            250+ formulas & factor models
          </p>
        </Link>

        <Link
          href="/investment-clock"
          className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3.5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-2 mb-1 text-[#A8672E] dark:text-[#D08F52]">
            <Clock className="size-4" />
            <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors">
              Investment Clock
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
            Live macroeconomic cycle tracer
          </p>
        </Link>

        <Link
          href="/option/viewer/builder"
          className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3.5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-2 mb-1 text-[#A8672E] dark:text-[#D08F52]">
            <LineChart className="size-4" />
            <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors">
              Option Viewers
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
            Volatility surface & VRP analytics
          </p>
        </Link>

        <Link
          href="/donate"
          className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3.5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-2 mb-1 text-[#A8672E] dark:text-[#D08F52]">
            <GraduationCap className="size-4" />
            <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors">
              Tiers & Perks
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
            Tier progression & benefits
          </p>
        </Link>
      </div>

      {/* Tabs */}
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
