"use client";

import { createContext, useContext, useEffect, useState } from "react";
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
  likedCount: number;
  tier: number;
}

interface UserContextValue {
  user: SupabaseUser | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refetchProfile: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

/**
 * Mounted once at the app root (see layout.tsx). Every `useUser()` call site
 * (~20 across the app, several co-mounted on a single article page — Header,
 * VideoCard, useBookmarks, YoutubeSubscribeGate, forum composer) used to run
 * its own Supabase auth check + `ME` GraphQL/DB profile query independently.
 * Centralizing it here means that work happens once per page load instead of
 * once per consumer.
 */
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthLoading(false);
      return;
    }

    const supabase = createClient();

    // getSession() reads the locally-stored session without a network round
    // trip to Supabase's Auth server; the server independently re-verifies
    // the JWT (via JWKS) on every authenticated GraphQL request anyway, so a
    // second network-validated getUser() call here would be redundant.
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
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
      likedCount: me?.likedCount ?? 0,
      tier: me?.tier ?? 1,
    };
  }

  async function signOut() {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  const value: UserContextValue = {
    user,
    profile,
    loading: authLoading || (!!user && profileLoading && !data),
    signOut,
    refetchProfile: refetch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
}
