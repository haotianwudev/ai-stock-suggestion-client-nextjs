import Link from "next/link";
import { ForumThread } from "@/lib/graphql/types";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Pin, ExternalLink } from "lucide-react";
import { SITE_FEEDBACK_CATEGORY_SLUG } from "@/lib/forum";
import { TierBadge } from "@/components/shared/tier-badge";

export function ThreadCard({ thread }: { thread: ForumThread }) {
  const categorySlug = thread.categorySlug ?? (thread.contentSlug ? "articles" : "general");
  const authorName = thread.authorDisplayName ?? "Anonymous";

  // Determine discussion context (article, topic, strategy, feedback, or standard category)
  let contextBadge = null;
  let contentLink = null;
  if (thread.contentSlug) {
    if (thread.contentSlug.startsWith("strategy-")) {
      const strat = thread.contentSlug.replace(/^strategy-/, "");
      contextBadge = (
        <Badge variant="outline" className="text-[10px] text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
          Option Strategy
        </Badge>
      );
      contentLink = `/option/strategies/${strat}`;
    } else if (["option101", "greeks", "volatility", "vrp", "gex", "roll", "books"].includes(thread.contentSlug)) {
      contextBadge = (
        <Badge variant="outline" className="text-[10px] text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-700/60 bg-teal-50 dark:bg-teal-950/30 rounded-lg">
          Option Topic
        </Badge>
      );
      contentLink = `/option/topics/${thread.contentSlug}`;
    } else {
      contextBadge = (
        <Badge variant="outline" className="text-[10px] text-[#A8672E] dark:text-[#D08F52] border-[#A8672E]/30 bg-[#A8672E]/10 dark:bg-[#D08F52]/10 rounded-lg">
          Article Discussion
        </Badge>
      );
      contentLink = `/articles/${thread.contentSlug}`;
    }
  } else if (thread.categorySlug === SITE_FEEDBACK_CATEGORY_SLUG) {
    contextBadge = (
      <Badge variant="outline" className="text-[10px] text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-700/60 bg-teal-50 dark:bg-teal-950/30 rounded-lg">
        Feedback
      </Badge>
    );
  } else if (thread.categorySlug) {
    contextBadge = (
      <Badge variant="secondary" className="text-[10px] rounded-lg">
        {thread.categorySlug}
      </Badge>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3.5 transition-all duration-200 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 hover:shadow-md shadow-xs">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          {thread.pinned && <Pin className="size-3.5 text-[#A8672E] dark:text-[#D08F52]" />}
          <Link
            href={`/forum/${categorySlug}/${thread.id}`}
            className="truncate font-serif font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors"
          >
            {thread.title}
          </Link>
          {contextBadge}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
          <span className="font-medium text-slate-700 dark:text-slate-300">{authorName}</span>
          <TierBadge tier={thread.authorTier ?? 1} size="xs" showTierNumber="prefix" />
          <span>&middot;</span>
          <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
          {contentLink && (
            <>
              <span>&middot;</span>
              <Link
                href={contentLink}
                className="inline-flex items-center gap-0.5 text-[#A8672E] dark:text-[#D08F52] hover:underline font-medium"
              >
                <span>Read content</span>
                <ExternalLink className="size-3" />
              </Link>
            </>
          )}
        </div>
      </div>
      <Link
        href={`/forum/${categorySlug}/${thread.id}`}
        className="flex shrink-0 items-center gap-1.5 text-xs text-slate-500 hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors"
      >
        {thread.locked && (
          <Badge variant="outline" className="text-[10px] rounded-lg">
            Locked
          </Badge>
        )}
        <MessageSquare className="size-3.5" />
        <span className="font-mono font-bold text-xs">{thread.postCount}</span>
      </Link>
    </div>
  );
}
