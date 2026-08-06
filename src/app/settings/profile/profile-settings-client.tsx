"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import { AVATAR_OPTIONS } from "@/lib/avatars";
import { getTierName } from "@/lib/tiers";
import { ME, UPDATE_PROFILE, SET_YOUTUBE_SUBSCRIBED } from "@/lib/graphql/queries";
import { User as MeResult } from "@/lib/graphql/types";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const schema = z.object({
  displayName: z.string().trim().min(1, "Enter a display name.").max(50, "That's too long."),
  avatarUrl: z.string().min(1, "Pick an avatar."),
});
type FormValues = z.infer<typeof schema>;

export function ProfileSettingsClient() {
  const { user, profile, loading } = useUser();
  const [updateProfile, { loading: saving }] = useMutation<{ updateProfile: MeResult }>(
    UPDATE_PROFILE,
    { refetchQueries: [{ query: ME }] }
  );
  const [setYoutubeSubscribed, { loading: savingYoutube }] = useMutation<{
    setYoutubeSubscribed: MeResult;
  }>(SET_YOUTUBE_SUBSCRIBED, { refetchQueries: [{ query: ME }] });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { displayName: "", avatarUrl: AVATAR_OPTIONS[0].src },
  });

  useEffect(() => {
    if (profile) {
      reset({
        displayName: profile.displayName ?? "",
        avatarUrl: profile.avatarUrl ?? AVATAR_OPTIONS[0].src,
      });
    }
    // Depend on the primitive fields, not `profile` itself -- useUser() returns a
    // freshly-constructed object on every render, so depending on the object
    // reference re-fires this effect (and thus reset(), and thus a re-render) forever.
  }, [profile?.displayName, profile?.avatarUrl, reset]);

  if (loading) return null;

  if (!user) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
        <span>Sign in to edit your profile.</span>
        <LoginButton />
      </div>
    );
  }

  const selectedAvatar = watch("avatarUrl");

  const submit = handleSubmit(async ({ displayName, avatarUrl }) => {
    try {
      await updateProfile({ variables: { displayName: displayName.trim(), avatarUrl } });
      toast.success("Profile updated.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    }
  });

  const toggleYoutubeSubscribed = async (subscribed: boolean) => {
    try {
      await setYoutubeSubscribed({ variables: { subscribed } });
      toast.success(subscribed ? "Thanks for subscribing!" : "Updated.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Profile settings
          <Badge variant="outline">{getTierName(profile?.tier ?? 1)}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display name</Label>
            <Input id="displayName" maxLength={50} {...register("displayName")} />
            {errors.displayName && (
              <p className="text-xs text-destructive">{errors.displayName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Avatar</Label>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {AVATAR_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setValue("avatarUrl", option.src, { shouldDirty: true })}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg border p-2 transition-colors hover:bg-accent",
                    selectedAvatar === option.src
                      ? "border-primary ring-2 ring-primary"
                      : "border-border"
                  )}
                >
                  <div className="relative size-12 overflow-hidden rounded-full">
                    <Image src={option.src} alt={option.label} fill className="object-cover" />
                  </div>
                  <span className="text-xs text-muted-foreground">{option.label}</span>
                </button>
              ))}
            </div>
            {errors.avatarUrl && (
              <p className="text-xs text-destructive">{errors.avatarUrl.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={saving || !isDirty}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>

        <div className="mt-6 border-t pt-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={profile?.youtubeSubscribed ?? false}
              disabled={savingYoutube}
              onChange={(e) => toggleYoutubeSubscribed(e.target.checked)}
              className="mt-0.5 size-4 rounded border-border accent-[#A8672E]"
            />
            <span className="text-sm">
              <span className="font-medium">I&apos;m subscribed to the SOPHIE YouTube channel</span>
              <br />
              <span className="text-muted-foreground">
                Promotes you to {getTierName(2)} and unlocks every article automatically. We don&apos;t
                verify this — it&apos;s the honor system.
              </span>
            </span>
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
