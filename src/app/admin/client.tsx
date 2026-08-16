"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Header } from "@/components/layout/header";
import { useUser } from "@/hooks/use-user";
import { TIER_NAMES, getTierName } from "@/lib/tiers";
import { TierBadge } from "@/components/shared/tier-badge";
import { AdminUser } from "@/lib/supabase/admin";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  ShieldAlert,
  RefreshCw,
  Crown,
  TrendingUp,
  Youtube,
  Search,
} from "lucide-react";

const ADMIN_TIER = 9;

// ─── Stats card ──────────────────────────────────────────────────────────────

function StatsCard({
  icon: Icon,
  label,
  value,
  sub,
  colour,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  sub?: string;
  colour: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="pt-6">
        <div className={`absolute right-4 top-4 rounded-full p-2 ${colour}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm font-medium text-foreground mt-1">{label}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </CardContent>
    </Card>
  );
}

// ─── Tier distribution mini-bar ───────────────────────────────────────────────

function TierBar({ users }: { users: AdminUser[] }) {
  const total = users.length;
  const counts = Object.fromEntries(
    Object.keys(TIER_NAMES).map((k) => [
      Number(k),
      users.filter((u) => u.tier === Number(k)).length,
    ])
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Tier Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(TIER_NAMES).map(([tierStr, name]) => {
          const t = Number(tierStr);
          const count = counts[t] ?? 0;
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={t} className="flex items-center gap-3 text-sm">
              <span className="w-32 shrink-0 text-muted-foreground">
                <TierBadge tier={t} />
              </span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-10 text-right text-xs text-muted-foreground shrink-0">
                {count}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

// ─── User row ────────────────────────────────────────────────────────────────

function UserRow({
  user,
  currentAdminId,
  onTierChange,
}: {
  user: AdminUser;
  currentAdminId: string;
  onTierChange: (userId: string, tier: number) => Promise<void>;
}) {
  const [selectedTier, setSelectedTier] = useState(String(user.tier));
  const [saving, setSaving] = useState(false);
  const isSelf = user.id === currentAdminId;
  const isDirty = selectedTier !== String(user.tier);

  const save = async () => {
    setSaving(true);
    try {
      await onTierChange(user.id, Number(selectedTier));
    } finally {
      setSaving(false);
    }
  };

  const displayName = user.display_name || `User ${user.id.slice(0, 8)}`;
  const joinDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  return (
    <tr className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
      {/* User info */}
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="font-medium text-sm truncate max-w-[200px]" title={displayName}>
            {displayName}
            {isSelf && (
              <span className="ml-1.5 text-xs text-muted-foreground">(you)</span>
            )}
          </span>
          <span className="text-xs text-muted-foreground font-mono">{user.id.slice(0, 16)}…</span>
        </div>
      </td>

      {/* Email */}
      <td className="px-4 py-3 text-xs text-muted-foreground truncate max-w-[220px]" title={user.email ?? undefined}>
        {user.email ?? "—"}
      </td>

      {/* Current tier */}
      <td className="px-4 py-3">
        <TierBadge tier={user.tier} />
      </td>

      {/* YouTube subscribed */}
      <td className="px-4 py-3 text-center">
        {user.youtube_subscribed ? (
          <Youtube className="h-4 w-4 text-red-500 inline-block" />
        ) : (
          <span className="text-muted-foreground text-xs">—</span>
        )}
      </td>

      {/* Join date */}
      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
        {joinDate}
      </td>

      {/* Assign tier */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Select
            value={selectedTier}
            onValueChange={setSelectedTier}
            disabled={isSelf}
          >
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(TIER_NAMES).map(([t, name]) => (
                <SelectItem key={t} value={t} className="text-xs">
                  {t} — {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            size="sm"
            variant={isDirty ? "default" : "outline"}
            className="h-8 px-3 text-xs"
            disabled={!isDirty || saving || isSelf}
            onClick={save}
          >
            {saving ? (
              <RefreshCw className="h-3 w-3 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </td>
    </tr>
  );
}

// ─── Access denied ───────────────────────────────────────────────────────────

function AccessDenied({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="rounded-full bg-destructive/10 p-6">
        <ShieldAlert className="h-12 w-12 text-destructive" />
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground max-w-sm">
          {isLoggedIn
            ? "This page is restricted to Admin (tier 9) accounts."
            : "Sign in with an Admin account to access this page."}
        </p>
      </div>
      {!isLoggedIn && <LoginButton />}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function AdminClient() {
  const { user, profile, loading: authLoading } = useUser();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);

  const isAdmin = !authLoading && profile?.tier === ADMIN_TIER;

  // ── Fetch all users ──────────────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setDataLoading(true);
    setConfigError(null);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 500 && data.error === "Service key not configured") {
          setConfigError("Service key not configured");
          return;
        }
        throw new Error(data.error || "Failed to load users");
      }
      
      setUsers((data as AdminUser[]) ?? []);
      setLastRefresh(new Date());
    } catch (err: unknown) {
      const msg =
        (err as { message?: string })?.message ?? "Failed to load users";
      toast.error(msg);
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin, fetchUsers]);

  // ── Set tier ─────────────────────────────────────────────────────────────
  const handleTierChange = async (userId: string, tier: number) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to update tier");
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, tier } : u))
      );
      toast.success(`Tier updated to ${getTierName(tier)}`);
    } catch (err: unknown) {
      const msg =
        (err as { message?: string })?.message ?? "Failed to update tier";
      toast.error(msg);
    }
  };

  // ── Guard renders ─────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </main>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <AccessDenied isLoggedIn={!!user} />
        </main>
      </div>
    );
  }

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalUsers = users.length;
  const youtubeCount = users.filter((u) => u.youtube_subscribed).length;
  const premiumCount = users.filter((u) => u.tier >= 4).length;

  // ── Filtered table ────────────────────────────────────────────────────────
  const searchLower = search.toLowerCase();
  const filtered = users.filter((u) => {
    if (!searchLower) return true;
    return (
      u.email?.toLowerCase().includes(searchLower) ||
      u.display_name?.toLowerCase().includes(searchLower) ||
      String(u.tier).includes(searchLower)
    );
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container max-w-screen-xl mx-auto px-4 py-8 space-y-8">

          {/* ── Page header ───────────────────────────────────────────────── */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Crown className="h-5 w-5 text-purple-500" />
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <TierBadge tier={9} size="sm" />
              </div>
              <p className="text-muted-foreground text-sm">
                {lastRefresh
                  ? `Last refreshed ${lastRefresh.toLocaleTimeString()}`
                  : "User management & tier assignment"}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchUsers}
              disabled={dataLoading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${dataLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* ── Stats cards ───────────────────────────────────────────────── */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatsCard
              icon={Users}
              label="Total Registered Users"
              value={dataLoading ? "…" : totalUsers}
              colour="bg-blue-500"
            />
            <StatsCard
              icon={TrendingUp}
              label="Premium Access"
              value={dataLoading ? "…" : premiumCount}
              sub="Tier 4 (Senior Quant) and above"
              colour="bg-teal-500"
            />
            <StatsCard
              icon={Youtube}
              label="YouTube Subscribers"
              value={dataLoading ? "…" : youtubeCount}
              sub={`${totalUsers > 0 ? Math.round((youtubeCount / totalUsers) * 100) : 0}% of users`}
              colour="bg-red-500"
            />
          </div>

          {/* ── Tier distribution ─────────────────────────────────────────── */}
          {!dataLoading && users.length > 0 && (
            <TierBar users={users} />
          )}

          {/* ── User table ────────────────────────────────────────────────── */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="text-base">
                  Users
                  {!dataLoading && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({filtered.length}{filtered.length !== totalUsers ? ` of ${totalUsers}` : ""})
                    </span>
                  )}
                </CardTitle>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Filter by name, email, or tier…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-9 pl-9 pr-3 w-64 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {dataLoading ? (
                <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Loading users…</span>
                </div>
              ) : configError ? (
                <div className="py-12 text-center text-muted-foreground text-sm space-y-2">
                  <ShieldAlert className="h-8 w-8 mx-auto text-yellow-500" />
                  <p className="font-medium">{configError}</p>
                  <p>Add <code className="text-xs bg-muted px-1 py-0.5 rounded">SUPABASE_SERVICE_KEY</code> to your <code className="text-xs bg-muted px-1 py-0.5 rounded">.env.local</code></p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground text-sm">
                  {search ? "No users match your filter." : "No users found."}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Current Tier
                        </th>
                        <th className="px-4 py-2.5 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          YT Sub
                        </th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Assign Tier
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((u) => (
                        <UserRow
                          key={u.id}
                          user={u}
                          currentAdminId={profile?.id ?? ""}
                          onTierChange={handleTierChange}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
