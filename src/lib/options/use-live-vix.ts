"use client";

import { useEffect, useState } from 'react';
import { LIVE_CHAIN_API_ENDPOINT } from './chain-provider';
import { fetchWithOptionsCache, getLiveCacheIntervalMs } from './options-cache';

export interface LiveVix {
  value: number;
  previousClose: number;
  percentChange: number;
  timestamp: string;
}

// Same URL the options viewer fetches, so both share one cache entry (and one network call).
const SPX_LIVE_URL = `${LIVE_CHAIN_API_ENDPOINT}?ticker=%5ESPX`;

/**
 * Current VIX from the live Cboe feed, honouring the shared 15-minute (market hours) /
 * 8-hour (after hours) cache window. Returns null while loading or if the feed is unavailable —
 * callers should simply hide the intraday view rather than surface an error.
 */
export function useLiveVix(): LiveVix | null {
  const [vix, setVix] = useState<LiveVix | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchWithOptionsCache<{ vix?: LiveVix | null }>(SPX_LIVE_URL, {
      minIntervalMs: getLiveCacheIntervalMs(),
    })
      .then(res => { if (!cancelled) setVix(res.vix ?? null); })
      .catch(() => { if (!cancelled) setVix(null); });
    return () => { cancelled = true; };
  }, []);

  return vix;
}
