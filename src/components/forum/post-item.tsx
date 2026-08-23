"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EDIT_POST, DELETE_POST, GET_FORUM_POSTS } from "@/lib/graphql/queries";
import { ForumPost } from "@/lib/graphql/types";
import { useUser } from "@/hooks/use-user";
import { canDeletePost } from "@/lib/forum";
import { ForumMarkdown } from "@/components/forum/forum-markdown";
import { TierBadge } from "@/components/shared/tier-badge";

export function PostItem({ post, indented = false }: { post: ForumPost; indented?: boolean }) {
  const { user, profile } = useUser();
  const isOwner = user?.id === post.authorId;
  const canDelete = canDeletePost(user?.id, post.authorId, profile?.tier ?? 1);
  const isModerator = !isOwner && canDelete;

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(post.body);

  const [editPost, { loading: editing }] = useMutation(EDIT_POST);
  const [deletePost, { loading: deleting }] = useMutation(DELETE_POST, {
    refetchQueries: [
      { query: GET_FORUM_POSTS, variables: { threadId: post.threadId, limit: 50, offset: 0 } },
    ],
  });

  const authorName = post.authorDisplayName ?? "Anonymous";
  const initials = authorName.charAt(0).toUpperCase();

  async function handleSaveEdit() {
    const body = draft.trim();
    if (!body) return;
    try {
      await editPost({ variables: { id: post.id, body } });
      setIsEditing(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't save your edit.");
    }
  }

  async function handleDelete() {
    const promptMsg = isModerator
      ? "Delete this comment as moderator?"
      : "Delete your comment?";
    if (!confirm(promptMsg)) return;
    try {
      await deletePost({ variables: { id: post.id } });
      toast.success("Comment deleted.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't delete comment.");
    }
  }

  return (
    <div className={`flex gap-3 ${indented ? "ml-10 mt-3" : ""}`}>
      <Avatar size="sm" className="mt-0.5 shrink-0 border border-gray-200 dark:border-gray-800">
        <AvatarImage src={post.authorAvatarUrl ?? undefined} alt={authorName} />
        <AvatarFallback className="font-semibold text-xs text-slate-700 dark:text-slate-300">{initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 shadow-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">{authorName}</span>
          <TierBadge tier={post.authorTier ?? 1} size="xs" showTierNumber="prefix" />
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {new Date(post.createdAt).toLocaleString()}
            {post.editedAt && " (edited)"}
          </span>
        </div>

        {isEditing ? (
          <div className="mt-2 space-y-2">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-900 dark:text-slate-100 focus:border-[#A8672E]/60 dark:focus:border-[#D08F52]/60 focus:ring-1 focus:ring-[#A8672E]/20"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={editing}
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl bg-[#A8672E] text-white dark:bg-[#D08F52] dark:text-[#14171B] text-xs font-semibold shadow-xs disabled:opacity-50"
              >
                Save
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                onClick={() => {
                  setIsEditing(false);
                  setDraft(post.body);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <ForumMarkdown content={post.body} className="mt-1.5" />
        )}

        {!isEditing && (isOwner || canDelete) && (
          <div className="mt-2 flex gap-3 pt-1 border-t border-gray-100 dark:border-gray-800/60">
            {isOwner && (
              <button
                className="text-xs font-medium text-slate-500 hover:text-[#A8672E] dark:hover:text-[#D08F52] transition-colors"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
            <button
              className="text-xs font-medium text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              onClick={handleDelete}
              disabled={deleting}
            >
              {isModerator ? "Delete (Mod)" : "Delete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
