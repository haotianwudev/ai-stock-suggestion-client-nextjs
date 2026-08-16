import Link from "next/link";
import { ForumThread } from "@/lib/graphql/types";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Pin, ExternalLink } from "lucide-react";
import { SITE_FEEDBACK_CATEGORY_SLUG } from "@/lib/forum";

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
        <Badge variant="outline" className="text-[10px] text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700/60 bg-amber-50/50 dark:bg-amber-950/30">
          Option Strategy
        </Badge>
      );
      contentLink = `/option/strategies/${strat}`;
    } else if (["option101", "greeks", "volatility", "vrp", "gex", "roll", "books"].includes(thread.contentSlug)) {
      contextBadge = (
        <Badge variant="outline" className="text-[10px] text-sky-700 dark:text-sky-400 border-sky-300 dark:border-sky-700/60 bg-sky-50/50 dark:bg-sky-950/30">
          Option Topic
        </Badge>
      );
      contentLink = `/option/topics/${thread.contentSlug}`;
    } else {
      contextBadge = (
        <Badge variant="outline" className="text-[10px] text-[#A8672E] dark:text-[#D08F52] border-[#A8672E]/30 bg-[#A8672E]/5 dark:bg-[#D08F52]/10">
          Article Discussion
        </Badge>
      );
      contentLink = `/articles/${thread.contentSlug}`;
    }
  } else if (thread.categorySlug === SITE_FEEDBACK_CATEGORY_SLUG) {
    contextBadge = (
      <Badge variant="outline" className="text-[10px] text-teal-700 dark:text-teal-400 border-teal-300 dark:border-teal-700/60 bg-teal-50/50 dark:bg-teal-950/30">
        Feedback
      </Badge>
    );
  } else if (thread.categorySlug) {
    contextBadge = (
      <Badge variant="secondary" className="text-[10px]">
        {thread.categorySlug}
      </Badge>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border bg-card px-4 py-3.5 transition-colors hover:bg-accent/40 shadow-sm">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          {thread.pinned && <Pin className="size-3.5 text-muted-foreground" />}
          <Link
            href={`/forum/${categorySlug}/${thread.id}`}
            className="truncate font-semibold text-foreground hover:underline"
          >
            {thread.title}
          </Link>
          {contextBadge}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <span>{authorName}</span>
          <span>&middot;</span>
          <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
          {contentLink && (
            <>
              <span>&middot;</span>
              <Link
                href={contentLink}
                className="inline-flex items-center gap-0.5 text-primary hover:underline font-medium"
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
        className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
      >
        {thread.locked && (
          <Badge variant="outline" className="text-[10px]">
            Locked
          </Badge>
        )}
        <MessageSquare className="size-3.5" />
        <span className="font-mono font-medium">{thread.postCount}</span>
      </Link>
    </div>
  );
}
