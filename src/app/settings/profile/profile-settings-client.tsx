"use client";

import { useEffect } from "react";
import { Crown } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { useState } from "react";
import { useUser } from "@/hooks/use-user";
import { useLanguage } from "@/hooks/use-language";
import { AVATAR_OPTIONS } from "@/lib/avatars";
import { getTierName, tierUnlockKey, canSetVideoPreference, MIN_VIDEO_PREFERENCE_TIER } from "@/lib/tiers";
import { ME, UPDATE_PROFILE, SET_YOUTUBE_SUBSCRIBED, SET_PREFERRED_VIDEO_SOURCE } from "@/lib/graphql/queries";
import { User as MeResult } from "@/lib/graphql/types";
import { LoginButton } from "@/components/auth/login-button";
import { TierUpDialog } from "@/components/shared/tier-up-dialog";
import { TierStatusBanner } from "@/components/shared/tier-status-banner";
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
  const { t } = useLanguage();
  const [congrats, setCongrats] = useState<{ title: string; description: string } | null>(null);
  const [updateProfile, { loading: saving }] = useMutation<{ updateProfile: MeResult }>(
    UPDATE_PROFILE,
    { refetchQueries: [{ query: ME }] }
  );
  const [setYoutubeSubscribed, { loading: savingYoutube }] = useMutation<{
    setYoutubeSubscribed: MeResult;
  }>(SET_YOUTUBE_SUBSCRIBED, { refetchQueries: [{ query: ME }] });
  const [setPreferredVideoSource, { loading: savingVideoSource }] = useMutation<{
    setPreferredVideoSource: MeResult;
  }>(SET_PREFERRED_VIDEO_SOURCE, { refetchQueries: [{ query: ME }] });

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
        <span>{t("profileSettings.signInPrompt")}</span>
        <LoginButton />
      </div>
    );
  }

  const selectedAvatar = watch("avatarUrl");

  const submit = handleSubmit(async ({ displayName, avatarUrl }) => {
    try {
      await updateProfile({ variables: { displayName: displayName.trim(), avatarUrl } });
      toast.success(t("profileSettings.profileUpdated"));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("profileSettings.genericError"));
    }
  });

  const toggleYoutubeSubscribed = async (subscribed: boolean) => {
    try {
      const prevTier = profile?.tier ?? 1;
      const { data } = await setYoutubeSubscribed({ variables: { subscribed } });
      if (!subscribed) {
        toast.success(t("profileSettings.updated"));
        return;
      }
      const newTier = data?.setYoutubeSubscribed.tier ?? prevTier;
      if (newTier > prevTier) {
        const unlockKey = tierUnlockKey(newTier);
        setCongrats({
          title: t("articleFrame.congratsTitle", { tier: getTierName(newTier) }),
          description: unlockKey ? t(unlockKey) : t("articleFrame.congratsKeepItUp"),
        });
      } else {
        setCongrats({
          title: t("profileSettings.congratsSubscribed"),
          description: t("profileSettings.congratsAppreciate"),
        });
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("profileSettings.genericError"));
    }
  };

  const changeVideoSource = async (source: "youtube" | "bilibili") => {
    if (!canSetVideoPreference(profile?.tier ?? 1)) return;
    if (source === profile?.preferredVideoSource) return;
    try {
      await setPreferredVideoSource({ variables: { source } });
      toast.success(t("profileSettings.updated"));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("profileSettings.genericError"));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t("profileSettings.heading")}
          <Badge variant="outline">{getTierName(profile?.tier ?? 1)}</Badge>
        </CardTitle>
        <TierStatusBanner profile={profile} />
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName">{t("profileSettings.displayNameLabel")}</Label>
            <Input id="displayName" maxLength={50} {...register("displayName")} />
            {errors.displayName && (
              <p className="text-xs text-destructive">{errors.displayName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t("profileSettings.avatarLabel")}</Label>
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
              {saving ? t("profileSettings.saving") : t("profileSettings.saveChanges")}
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
              <span className="font-medium">{t("profileSettings.subscribedLabel")}</span>
              <br />
              <span className="text-muted-foreground">
                {t("profileSettings.subscribedDescription", { tier: getTierName(2) })}
              </span>
            </span>
          </label>
          <p className="mt-3 text-xs text-muted-foreground">
            {t("profileSettings.likedVideosCount", {
              count: profile?.likedCount ?? 0,
              plural: (profile?.likedCount ?? 0) === 1 ? "" : "s",
            })}
          </p>
        </div>

        <div className="mt-6 border-t pt-6">
          <Label className="flex items-center gap-2">
            {t("profileSettings.preferredVideoPlatform")}
            <Badge
              variant="outline"
              className="gap-1 border-amber-600/30 bg-amber-600/10 font-normal text-amber-700 dark:text-amber-500"
            >
              <Crown className="size-3" />
              {t("profileSettings.premiumBadge")}
            </Badge>
            {!canSetVideoPreference(profile?.tier ?? 1) && (
              <Badge variant="outline" className="font-normal">
                {t("profileSettings.unlocksAt", { tier: getTierName(MIN_VIDEO_PREFERENCE_TIER) })}
              </Badge>
            )}
          </Label>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("profileSettings.videoPlatformDescription")}
          </p>
          <div className="mt-3 flex gap-2">
            {(["youtube", "bilibili"] as const).map((s) => (
              <button
                key={s}
                type="button"
                disabled={savingVideoSource || !canSetVideoPreference(profile?.tier ?? 1)}
                onClick={() => changeVideoSource(s)}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                  (profile?.preferredVideoSource ?? "youtube") === s
                    ? "border-primary ring-2 ring-primary"
                    : "border-border hover:bg-accent"
                )}
              >
                {s === "youtube" ? "YouTube" : "Bilibili"}
              </button>
            ))}
          </div>
          {!canSetVideoPreference(profile?.tier ?? 1) && (
            <p className="mt-2 text-xs text-muted-foreground">
              {t("profileSettings.reachTierToChoose", { tier: getTierName(MIN_VIDEO_PREFERENCE_TIER) })}
            </p>
          )}
        </div>
      </CardContent>
      <TierUpDialog
        open={!!congrats}
        onOpenChange={(open) => !open && setCongrats(null)}
        title={congrats?.title ?? ""}
        description={congrats?.description ?? ""}
      />
    </Card>
  );
}
