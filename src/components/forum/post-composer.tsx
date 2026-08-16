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
      <div className="flex items-center justify-between rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 px-4 py-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        <span>Sign in to join the discussion.</span>
        <LoginButton />
      </div>
    );
  }

  if (!canCommentInCategory(profile?.tier ?? 1, categorySlug)) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 px-4 py-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        Commenting is reserved for premium members right now — this tier isn&apos;t open yet, stay tuned.
      </p>
    );
  }

  if (disabled) {
    return (
      <p className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 px-4 py-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
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
      <Textarea
        placeholder={placeholder}
        rows={3}
        {...register("body")}
        className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-[#A8672E]/60 dark:focus:border-[#D08F52]/60 focus:ring-2 focus:ring-[#A8672E]/20 text-xs sm:text-sm shadow-xs"
      />
      {errors.body && <p className="text-xs text-red-600 dark:text-red-400">{errors.body.message}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#A8672E] hover:bg-[#8e5625] dark:bg-[#D08F52] dark:hover:bg-[#b87c44] text-white dark:text-[#14171B] font-semibold text-xs sm:text-sm shadow-xs disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? "Posting..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
