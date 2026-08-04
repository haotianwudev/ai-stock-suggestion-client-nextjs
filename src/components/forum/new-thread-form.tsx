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
  const { user, loading: userLoading } = useUser();
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

  if (!open) {
    return (
      <Button size="sm" onClick={() => setOpen(true)}>
        New thread
      </Button>
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
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={submit} className="space-y-2">
          <Input placeholder="Thread title" {...register("title")} />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          <Textarea placeholder="What's on your mind?" rows={4} {...register("body")} />
          {errors.body && <p className="text-xs text-destructive">{errors.body.message}</p>}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post thread"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
