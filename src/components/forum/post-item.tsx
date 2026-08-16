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
      <Avatar size="sm" className="mt-0.5 shrink-0">
        <AvatarImage src={post.authorAvatarUrl ?? undefined} alt={authorName} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 rounded-lg border bg-card px-3 py-2">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium">{authorName}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(post.createdAt).toLocaleString()}
            {post.editedAt && " (edited)"}
          </span>
        </div>

        {isEditing ? (
          <div className="mt-1 space-y-2">
            <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSaveEdit} disabled={editing}>
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsEditing(false);
                  setDraft(post.body);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-1 whitespace-pre-wrap text-sm">{post.body}</p>
        )}

        {!isEditing && (isOwner || canDelete) && (
          <div className="mt-1 flex gap-3">
            {isOwner && (
              <button
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
            <button
              className="text-xs text-muted-foreground hover:text-destructive"
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
