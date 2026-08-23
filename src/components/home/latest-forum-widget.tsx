"use client";

import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MessagesSquare, MessageSquare, Pin } from "lucide-react";
import { GET_FORUM_THREADS } from "@/lib/graphql/queries";
import { ForumThreadList, ForumThread } from "@/lib/graphql/types";
import { SITE_FEEDBACK_CATEGORY_SLUG } from "@/lib/forum";

function timeAgo(isoStr?: string): string {
  if (!isoStr) return "";
  const diff = Date.now() - new Date(isoStr).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "< 1h ago";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(diff / 3_600_000);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(diff / 86_400_000);
  return `${d}d ago`;
}

function getContextBadge(thread: ForumThread) {
  if (thread.contentSlug) {
    if (thread.contentSlug.startsWith("strategy-")) {
      return { badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300", label: "Option Strategy" };
    }
    if (["option101", "greeks", "volatility", "vrp", "gex", "roll", "books"].includes(thread.contentSlug)) {
      return { badge: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300", label: "Option Topic" };
    }
    return { badge: "bg-[#A8672E]/10 text-[#A8672E] dark:bg-[#D08F52]/15 dark:text-[#D08F52]", label: "Article Discussion" };
  }
  if (thread.categorySlug === SITE_FEEDBACK_CATEGORY_SLUG) {
    return { badge: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300", label: "Feedback" };
  }
  if (thread.categorySlug) {
    return { badge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300", label: thread.categorySlug };
  }
  return { badge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300", label: "Forum" };
}

export function LatestForumWidget() {
  const router = useRouter();
  const { data, loading } = useQuery<{ forumThreads: ForumThreadList }>(GET_FORUM_THREADS, {
    variables: { limit: 10, offset: 0 },
    fetchPolicy: "cache-and-network",
  });

  const threads = data?.forumThreads?.items ?? [];
  const total = data?.forumThreads?.totalCount ?? 0;
  const thread = threads[0] ?? null;

  if (loading && !data) {
    return <div className="animate-pulse rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 h-24 shadow-xs" />;
  }

  if (!thread) return null;

  const categorySlug = thread.categorySlug ?? (thread.contentSlug ? "articles" : "general");
  const authorName = thread.authorDisplayName ?? "Community Member";
  const badgeInfo = getContextBadge(thread);

  return (
    <div
      className="block group cursor-pointer w-full text-left"
      onClick={() => router.push(`/forum/${categorySlug}/${thread.id}`)}
    >
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3.5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:-translate-y-0.5">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <MessagesSquare className="h-3.5 w-3.5 text-[#A8672E] dark:text-[#D08F52]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8672E] dark:text-[#D08F52] font-mono">
              Forum Discussion
            </span>
            <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold font-mono ${badgeInfo.badge}`}>
              {badgeInfo.label}
            </span>
          </div>
          <Link
            href="/forum"
            onClick={e => e.stopPropagation()}
            className="shrink-0 text-xs font-semibold flex items-center gap-1 text-[#A8672E] dark:text-[#D08F52] hover:underline transition-all"
          >
            {total > 0 ? `${total} posts` : "See all"} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Thread title */}
        <div className="flex items-center gap-1.5">
          {thread.pinned && <Pin className="h-3.5 w-3.5 text-[#A8672E] dark:text-[#D08F52] shrink-0" />}
          <p className="font-serif font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors leading-snug line-clamp-1">
            {thread.title}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 mt-2.5 pt-2 border-t border-gray-200/80 dark:border-gray-800/80">
          <span className="text-[10px] text-slate-600 dark:text-slate-400 truncate max-w-[140px] font-medium">
            {authorName}
          </span>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
            {timeAgo(thread.createdAt)}
          </span>
          <div className="ml-auto flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <MessageSquare className="h-3 w-3" />
            <span>{thread.postCount} {thread.postCount === 1 ? "reply" : "replies"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
