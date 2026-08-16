"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { CREATE_FORUM_THREAD, GET_FORUM_THREADS } from "@/lib/graphql/queries";
import { ForumThread } from "@/lib/graphql/types";
import { useUser } from "@/hooks/use-user";
import { canCommentInCategory } from "@/lib/forum";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoginButton } from "@/components/auth/login-button";
import { Card, CardContent } from "@/components/ui/card";

const schema = z.object({
  title: z.string().min(3, "Title is too short.").max(200, "Title is too long."),
  body: z.string().min(1, "Write something first.").max(5000, "That's too long."),
});
type FormValues = z.infer<typeof schema>;

export function NewThreadForm({
  categoryId,
  categorySlug,
}: {
  categoryId: string;
  categorySlug: string;
}) {
  const router = useRouter();
  const { user, profile, loading: userLoading } = useUser();
  const [open, setOpen] = useState(false);
  const [createThread] = useMutation<{ createForumThread: ForumThread }>(CREATE_FORUM_THREAD, {
    refetchQueries: [
      { query: GET_FORUM_THREADS, variables: { categorySlug, limit: 20, offset: 0 } },
    ],
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (userLoading) return null;

  if (!user) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
        <span>Sign in to start a discussion.</span>
        <LoginButton />
      </div>
    );
  }

  if (!canCommentInCategory(profile?.tier ?? 1, categorySlug)) {
    return (
      <p className="rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
        Starting a discussion is reserved for premium members right now — this tier isn&apos;t open yet, stay
        tuned.
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#A8672E] hover:bg-[#8e5625] dark:bg-[#D08F52] dark:hover:bg-[#b87c44] text-white dark:text-[#14171B] font-semibold text-xs sm:text-sm shadow-xs transition-colors"
      >
        New thread
      </button>
    );
  }

  const submit = handleSubmit(async ({ title, body }) => {
    try {
      const { data } = await createThread({
        variables: { categoryId, title: title.trim(), body: body.trim() },
      });
      const newThread = data?.createForumThread;
      reset();
      setOpen(false);
      if (newThread) {
        router.push(`/forum/${categorySlug}/${newThread.id}`);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    }
  });

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-xs">
      <form onSubmit={submit} className="space-y-3">
        <Input
          placeholder="Thread title"
          {...register("title")}
          className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-[#A8672E]/60 dark:focus:border-[#D08F52]/60 focus:ring-2 focus:ring-[#A8672E]/20 text-xs sm:text-sm"
        />
        {errors.title && <p className="text-xs text-red-600 dark:text-red-400">{errors.title.message}</p>}
        <Textarea
          placeholder="What's on your mind?"
          rows={4}
          {...register("body")}
          className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-[#A8672E]/60 dark:focus:border-[#D08F52]/60 focus:ring-2 focus:ring-[#A8672E]/20 text-xs sm:text-sm"
        />
        {errors.body && <p className="text-xs text-red-600 dark:text-red-400">{errors.body.message}</p>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-[#A8672E] hover:bg-[#8e5625] dark:bg-[#D08F52] dark:hover:bg-[#b87c44] text-white dark:text-[#14171B] font-semibold text-xs sm:text-sm shadow-xs disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Posting..." : "Post thread"}
          </button>
        </div>
      </form>
    </div>
  );
}
