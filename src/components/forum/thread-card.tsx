import Link from "next/link";
import { ForumThread } from "@/lib/graphql/types";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Pin } from "lucide-react";

export function ThreadCard({ thread }: { thread: ForumThread }) {
  const categorySlug = thread.categorySlug ?? "general";
  const authorName = thread.authorDisplayName ?? "Anonymous";

  return (
    <Link
      href={`/forum/${categorySlug}/${thread.id}`}
      className="flex items-center justify-between gap-4 rounded-lg border bg-card px-4 py-3 transition-colors hover:bg-accent/50"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {thread.pinned && <Pin className="size-3.5 text-muted-foreground" />}
          <span className="truncate font-medium">{thread.title}</span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {authorName} &middot; {new Date(thread.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
        {thread.locked && (
          <Badge variant="outline" className="text-[10px]">Locked</Badge>
        )}
        <MessageSquare className="size-3.5" />
        {thread.postCount}
      </div>
    </Link>
  );
}
