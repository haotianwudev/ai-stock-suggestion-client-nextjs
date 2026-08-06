"use client";

import { useEffect, useState } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useQuery } from "@apollo/client";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ME } from "@/lib/graphql/queries";
import { User as MeResult } from "@/lib/graphql/types";
import { DEFAULT_AVATAR_URL } from "@/lib/avatars";

export interface Profile {
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
  youtubeSubscribed: boolean;
}

export function useUser() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthLoading(false);
      return;
    }

    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // `profiles` (display name + avatar) is the editable source of truth;
  // Google's OAuth metadata is only a placeholder until that query resolves.
  const { data, loading: profileLoading, refetch } = useQuery<{ me: MeResult | null }>(ME, {
    skip: !user,
    fetchPolicy: "cache-and-network",
  });

  let profile: Profile | null = null;
  if (user) {
    const me = data?.me;
    profile = {
      id: user.id,
      displayName:
        me?.displayName ??
        (user.user_metadata?.full_name as string | undefined) ??
        (user.user_metadata?.name as string | undefined) ??
        null,
      avatarUrl: me?.avatarUrl ?? DEFAULT_AVATAR_URL,
      youtubeSubscribed: me?.youtubeSubscribed ?? false,
    };
  }

  async function signOut() {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  return {
    user,
    profile,
    loading: authLoading || (!!user && profileLoading && !data),
    signOut,
    refetchProfile: refetch,
  };
}
