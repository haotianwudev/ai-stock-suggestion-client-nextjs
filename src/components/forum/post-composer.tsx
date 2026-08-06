"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import { canCommentInCategory } from "@/lib/forum";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoginButton } from "@/components/auth/login-button";

const schema = z.object({
  body: z.string().min(1, "Write something first.").max(5000, "That's too long."),
});
type FormValues = z.infer<typeof schema>;

export function PostComposer({
  onSubmit,
  placeholder = "Write a reply...",
  submitLabel = "Post",
  disabled = false,
  disabledMessage,
  categorySlug,
}: {
  onSubmit: (body: string) => Promise<void>;
  placeholder?: string;
  submitLabel?: string;
  disabled?: boolean;
  disabledMessage?: string;
  /** Site Feedback is exempt from the tier gate -- pass the thread's category
   * slug (when known) so replies there aren't blocked like everywhere else. */
  categorySlug?: string | null;
}) {
  const { user, profile, loading: userLoading } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { body: "" },
  });

  if (userLoading) return null;

  if (!user) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
        <span>Sign in to join the discussion.</span>
        <LoginButton />
      </div>
    );
  }

  if (!canCommentInCategory(profile?.tier ?? 1, categorySlug)) {
    return (
      <p className="rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
        Commenting is reserved for premium members right now — this tier isn&apos;t open yet, stay tuned.
      </p>
    );
  }

  if (disabled) {
    return (
      <p className="rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
        {disabledMessage ?? "This discussion is closed."}
      </p>
    );
  }

  const submit = handleSubmit(async ({ body }) => {
    try {
      await onSubmit(body.trim());
      reset();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    }
  });

  return (
    <form onSubmit={submit} className="space-y-2">
      <Textarea placeholder={placeholder} rows={3} {...register("body")} />
      {errors.body && <p className="text-xs text-destructive">{errors.body.message}</p>}
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
