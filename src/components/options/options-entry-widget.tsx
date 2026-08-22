"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client";
import { ArrowRight, Activity, Lock } from "lucide-react";
import { GET_VOL_REGIME } from "@/lib/graphql/queries";
import { VolRegimeResult } from "@/lib/graphql/types";
import { useUser } from "@/hooks/use-user";
import { canAccessVrpResearch, MIN_VRP_RESEARCH_TIER } from "@/lib/tiers";

/**
 * Home-page entry point into the Options Viewer.
 *
 * Leads with the current volatility regime rather than a static blurb, so the card carries a
 * reason to click. The regime query is small (5 sessions) and the card renders its full layout
 * without it — a slow or failed query degrades to the entry links rather than a spinner or a
 * hole in the hero column.
 */

const REGIME_STYLE: Record<string, string> = {
  Harvest:
    "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30",
  Thin:
    "bg-slate-100 dark:bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-500/30",
  "Stressed Premium":
    "bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30",
  Crisis:
    "bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30",
};

export function OptionsEntryWidget() {
  const { profile } = useUser();
  const userTier = profile?.tier ?? 1;
  const vrpLocked = !canAccessVrpResearch(userTier);

  const { data } = useQuery<{ volRegime: VolRegimeResult }>(GET_VOL_REGIME, {
    variables: { days: 5 },
    fetchPolicy: "cache-first",
    errorPolicy: "all", // a failed regime fetch must not blank the card
  });

  const latest = data?.volRegime?.latestData ?? null;
  const regime = latest?.regime ?? null;

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs overflow-hidden">
      <Link href="/option/viewer" className="block group p-4 hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#A8672E] dark:text-[#D08F52] font-semibold">
            <Activity className="h-3 w-3" />
            SPX Options
          </span>
          {regime && (
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-mono font-bold ${
                REGIME_STYLE[regime] ?? REGIME_STYLE.Thin
              }`}
            >
              {regime}
            </span>
          )}
        </div>

        <h3 className="mt-1.5 font-serif text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#A8672E] dark:group-hover:text-[#D08F52] transition-colors">
          Options Viewer
        </h3>
        <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          Live SPX chain, volatility surface, gamma exposure and dealer positioning across every
          listed expiration.
        </p>

        {latest && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-gray-50 dark:bg-gray-800/40 px-2 py-1.5">
              <div className="text-[9px] font-mono uppercase text-slate-500 dark:text-slate-400">VIX</div>
              <div className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100">
                {latest.vix != null ? latest.vix.toFixed(2) : "—"}
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 dark:bg-gray-800/40 px-2 py-1.5">
              <div className="text-[9px] font-mono uppercase text-slate-500 dark:text-slate-400">Realized</div>
              <div className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100">
                {latest.realizedVol20d != null ? latest.realizedVol20d.toFixed(2) : "—"}
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 dark:bg-gray-800/40 px-2 py-1.5">
              <div className="text-[9px] font-mono uppercase text-slate-500 dark:text-slate-400">VRP</div>
              <div
                className={`font-mono font-bold text-sm ${
                  (latest.vrp ?? 0) >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {latest.vrp != null ? `${latest.vrp >= 0 ? "+" : ""}${latest.vrp.toFixed(2)}` : "—"}
              </div>
            </div>
          </div>
        )}

        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#A8672E] dark:text-[#D08F52] group-hover:translate-x-0.5 transition-transform">
          Open the viewer <ArrowRight className="h-3 w-3" />
        </span>
      </Link>

      <div className="border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 divide-x divide-gray-100 dark:divide-gray-800">
        <Link
          href="/option/viewer/builder"
          className="px-3 py-2 text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-[#A8672E] dark:hover:text-[#D08F52] hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors text-center"
        >
          Payoff Builder
        </Link>
        <Link
          href="/option/viewer/vrp"
          className="px-3 py-2 text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-[#A8672E] dark:hover:text-[#D08F52] hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors text-center inline-flex items-center justify-center gap-1"
          title={vrpLocked ? `VRP Research requires Tier ${MIN_VRP_RESEARCH_TIER}` : undefined}
        >
          {vrpLocked && <Lock className="h-2.5 w-2.5" />}
          VRP Research
        </Link>
      </div>
    </div>
  );
}
