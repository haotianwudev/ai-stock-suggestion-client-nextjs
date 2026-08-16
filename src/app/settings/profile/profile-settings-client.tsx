"use client";

import { useEffect } from "react";
import { Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { useState } from "react";
import { useUser } from "@/hooks/use-user";
import { useLanguage } from "@/hooks/use-language";
import { AVATAR_OPTIONS } from "@/lib/avatars";
import { getTierName, tierUnlockKey, canSetVideoPreference, MIN_VIDEO_PREFERENCE_TIER, canAccessLiveOptions, MIN_LIVE_OPTIONS_TIER, canSetTopicLayoutPreference, MIN_TOPIC_LAYOUT_TIER } from "@/lib/tiers";
import { getPreferredOptionSource, setPreferredOptionSource, OptionDataSource } from "@/lib/options/options-preferences";
import { getPreferredTopicLayout, setPreferredTopicLayout, TopicLayout } from "@/lib/topics/topic-layout-preference";
import { ME, UPDATE_PROFILE, SET_YOUTUBE_SUBSCRIBED, SET_PREFERRED_VIDEO_SOURCE } from "@/lib/graphql/queries";
import { User as MeResult } from "@/lib/graphql/types";
import { LoginButton } from "@/components/auth/login-button";
import { TierUpDialog } from "@/components/shared/tier-up-dialog";
import { TierStatusBanner } from "@/components/shared/tier-status-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const schema = z.object({
  displayName: z.string().trim().min(1, "Enter a display name.").max(50, "That's too long."),
  avatarUrl: z.string().min(1, "Pick an avatar."),
});
type FormValues = z.infer<typeof schema>;

// One row of a tier-gated preference toggle — the three Premium Settings rows (video platform,
// option chain source, topic layout) are otherwise identical, differing only in labels/options/
// the currently active value, so this is the one place their shared behavior lives.
function PreferenceRow<T extends string>({
  label,
  description,
  options,
  value,
  onSelect,
  minTier,
  hasAccess,
}: {
  label: string;
  description: string;
  options: { value: T; label: string; requiresAccess?: boolean }[];
  value: T;
  onSelect: (value: T) => void;
  minTier: number;
  hasAccess: boolean;
}) {
  const { t } = useLanguage();
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        {label}
        {!hasAccess && (
          <Badge variant="outline" className="font-normal">
            {t("profileSettings.unlocksAt", { tier: getTierName(minTier) })}
          </Badge>
        )}
      </Label>
      <p className="text-xs text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-2 pt-1">
        {options.map((option) => {
          const disabled = option.requiresAccess && !hasAccess;
          return (
            <button
              key={option.value}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(option.value)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                value === option.value ? "border-primary ring-2 ring-primary bg-primary/5" : "border-border hover:bg-accent"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProfileSettingsClient() {
  const { user, profile, loading } = useUser();
  const { t } = useLanguage();
  const [congrats, setCongrats] = useState<{ title: string; description: string } | null>(null);
  const [optionSource, setOptionSource] = useState<OptionDataSource>(() => getPreferredOptionSource(profile?.tier ?? 1));
  const [topicLayout, setTopicLayout] = useState<TopicLayout>(() => getPreferredTopicLayout(profile?.tier ?? 1));
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
      setOptionSource(getPreferredOptionSource(profile.tier));
      setTopicLayout(getPreferredTopicLayout(profile.tier));
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
  const tier = profile?.tier ?? 1;

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
      const prevTier = tier;
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
    if (!canSetVideoPreference(tier) || source === profile?.preferredVideoSource) return;
    try {
      await setPreferredVideoSource({ variables: { source } });
      toast.success(t("profileSettings.updated"));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("profileSettings.genericError"));
    }
  };

  const changeOptionSource = (source: OptionDataSource) => {
    if (source === "live" && !canAccessLiveOptions(tier)) return;
    setPreferredOptionSource(source);
    setOptionSource(source);
    toast.success(t("profileSettings.updated"));
  };

  const changeTopicLayout = (layout: TopicLayout) => {
    if (layout === "sidebar" && !canSetTopicLayoutPreference(tier)) return;
    setPreferredTopicLayout(layout);
    setTopicLayout(layout);
    toast.success(t("profileSettings.updated"));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t("profileSettings.heading")}
            <Badge variant="outline">{getTierName(tier)}</Badge>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("profileSettings.engagementHeading")}</CardTitle>
        </CardHeader>
        <CardContent>
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

          <div className="mt-6 border-t pt-6">
            <p className="text-sm font-medium">Buy Sophie a gift</p>
            <p className="mt-1 text-sm text-muted-foreground">
              The site is free either way — donations just help keep it running and buy real gifts for
              Sophie. You&apos;ve given ${((profile?.donatedCents ?? 0) / 100).toFixed(2)} total so far,
              which also promotes your tier as a bonus and never expires.
            </p>
            <Link href="/donate">
              <Button variant="outline" size="sm" className="mt-3">
                Donate
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Crown className="size-4 text-amber-600 dark:text-amber-500" />
            {t("profileSettings.premiumSettingsHeading")}
          </CardTitle>
          <CardDescription>{t("profileSettings.premiumSettingsDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <PreferenceRow
            label={t("profileSettings.preferredVideoPlatform")}
            description={t("profileSettings.videoPlatformDescription")}
            options={[
              { value: "youtube" as const, label: "YouTube" },
              { value: "bilibili" as const, label: "Bilibili" },
            ]}
            value={profile?.preferredVideoSource ?? "youtube"}
            onSelect={changeVideoSource}
            minTier={MIN_VIDEO_PREFERENCE_TIER}
            hasAccess={canSetVideoPreference(tier)}
          />

          <div className="border-t pt-6">
            <PreferenceRow
              label={t("profileSettings.defaultOptionSource")}
              description={t("profileSettings.defaultOptionSourceDescription")}
              options={[
                { value: "historical" as const, label: t("profileSettings.optionSourceHistorical") },
                { value: "live" as const, label: t("profileSettings.optionSourceLive"), requiresAccess: true },
              ]}
              value={optionSource}
              onSelect={changeOptionSource}
              minTier={MIN_LIVE_OPTIONS_TIER}
              hasAccess={canAccessLiveOptions(tier)}
            />
          </div>

          <div className="border-t pt-6">
            <PreferenceRow
              label={t("profileSettings.defaultTopicLayout")}
              description={t("profileSettings.defaultTopicLayoutDescription")}
              options={[
                { value: "classic" as const, label: t("profileSettings.topicLayoutClassic") },
                { value: "sidebar" as const, label: t("profileSettings.topicLayoutSidebar"), requiresAccess: true },
              ]}
              value={topicLayout}
              onSelect={changeTopicLayout}
              minTier={MIN_TOPIC_LAYOUT_TIER}
              hasAccess={canSetTopicLayoutPreference(tier)}
            />
          </div>
        </CardContent>
      </Card>

      <TierUpDialog
        open={!!congrats}
        onOpenChange={(open) => !open && setCongrats(null)}
        title={congrats?.title ?? ""}
        description={congrats?.description ?? ""}
      />
    </div>
  );
}
