"use client";

import React from 'react';
import Link from 'next/link';
import { Lock, Crown, Youtube, HeartHandshake } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
  getTierName,
  LIKE_THRESHOLDS,
  DONATION_THRESHOLDS_CENTS,
} from '@/lib/tiers';

/**
 * Locked panel shown in place of a viewer tool the current tier can't reach.
 *
 * Deliberately not the topic-page gate (components/shared/topic-access-gate): that one carries
 * the honor-system YouTube-subscribe bypass and per-topic free-preview rules, neither of which
 * applies here. This is the same simple bar the Live Cboe feed toggle already uses — tier only,
 * no bypass — so both locks in the viewer behave identically.
 */

const SOPHIE_YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@SOPHIEAIFinance";

export interface ViewerTierGateProps {
  /** Tool name, e.g. "VRP Research". */
  title: string;
  /** One or two sentences on what the tool does — the reason to upgrade. */
  description: string;
  /** Concrete things behind the lock, shown as a list. */
  features: string[];
  requiredTier: number;
  currentTier: number;
}

export function ViewerTierGate({
  title,
  description,
  features,
  requiredTier,
  currentTier,
}: ViewerTierGateProps) {
  const dollars = (DONATION_THRESHOLDS_CENTS.TIER_4 / 100).toFixed(2);

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-10 shadow-xs">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-[#A8672E]/10 dark:bg-[#D08F52]/15 text-[#A8672E] dark:text-[#D08F52] mb-4">
          <Lock className="h-5 w-5" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">
            {title}
          </h2>
          <Badge
            variant="outline"
            className="text-[10px] px-1.5 py-0 font-mono font-semibold border-[#A8672E]/40 text-[#A8672E] dark:text-[#D08F52] bg-[#A8672E]/10"
          >
            Tier {requiredTier}+
          </Badge>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>

        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Requires <span className="font-semibold text-slate-700 dark:text-slate-300">{getTierName(requiredTier)}</span>{' '}
          (Tier {requiredTier}). You're currently{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-300">{getTierName(currentTier)}</span>{' '}
          (Tier {currentTier}).
        </p>

        {features.length > 0 && (
          <ul className="mt-5 grid gap-2 text-left sm:grid-cols-2">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 rounded-xl bg-gray-50 dark:bg-gray-800/40 px-3 py-2 text-xs text-slate-600 dark:text-slate-400"
              >
                <Crown className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#A8672E] dark:text-[#D08F52]" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <a
            href={SOPHIE_YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-[#A8672E]/40 dark:hover:border-[#D08F52]/40 transition-all"
          >
            <Youtube className="h-3.5 w-3.5 text-rose-600" />
            Like {LIKE_THRESHOLDS.TIER_4} videos
          </a>
          {/* No "see all tiers" link: there is no /tiers route — the ladder is surfaced by the
              tier badge's hover card, so linking one here would 404. */}
          <Link
            href="/donate"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#A8672E] dark:bg-[#D08F52] px-3.5 py-2 text-xs font-semibold text-white dark:text-[#14171B] hover:opacity-90 transition-opacity"
          >
            <HeartHandshake className="h-3.5 w-3.5" />
            Support from ${dollars}
          </Link>
        </div>
      </div>
    </div>
  );
}
