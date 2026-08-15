/**
 * Frontend Options Cache Layer (Strict 15-Minute Cooldown & Persistent Storage)
 * 
 * Guarantees that refreshing the page (F5) or switching tabs will NEVER trigger a network load.
 * Network loads ONLY occur when:
 * 1. User explicitly clicks "Refresh" (Manual Refresh).
 * 2. Cached data is older than 15 minutes (Past Time).
 */

export const MIN_REFRESH_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes (900,000 ms)
const CACHE_PREFIX = 'sophie_spx_options_v2_';

export interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

// In-memory cache map for sub-millisecond lookups
const memoryCache = new Map<string, CacheEntry<unknown>>();

/**
 * Retrieve raw cache entry from memory, sessionStorage, or localStorage
 */
export function getCacheEntry<T>(key: string): CacheEntry<T> | null {
    // 1. Check in-memory cache
    const memEntry = memoryCache.get(key) as CacheEntry<T> | undefined;
    if (memEntry) {
        return memEntry;
    }

    // 2. Check localStorage (persistent across browser refreshes & tab closes)
    if (typeof window !== 'undefined' && window.localStorage) {
        try {
            const raw = window.localStorage.getItem(CACHE_PREFIX + key);
            if (raw) {
                const entry: CacheEntry<T> = JSON.parse(raw);
                memoryCache.set(key, entry);
                return entry;
            }
        } catch {
            // Ignore localStorage errors (e.g. quota/privacy mode)
        }
    }

    // 3. Fallback to sessionStorage
    if (typeof window !== 'undefined' && window.sessionStorage) {
        try {
            const raw = window.sessionStorage.getItem(CACHE_PREFIX + key);
            if (raw) {
                const entry: CacheEntry<T> = JSON.parse(raw);
                memoryCache.set(key, entry);
                return entry;
            }
        } catch {
            // Ignore sessionStorage errors
        }
    }

    return null;
}

/**
 * Get valid cached data if it is within the 15-minute window
 */
export function getValidCachedData<T>(key: string, minIntervalMs: number = MIN_REFRESH_INTERVAL_MS): T | null {
    const entry = getCacheEntry<T>(key);
    if (!entry) return null;

    const age = Date.now() - entry.timestamp;
    if (age < minIntervalMs) {
        return entry.data;
    }
    return null;
}

/**
 * Save entry to memory, localStorage, and sessionStorage
 */
export function saveToCache<T>(key: string, data: T): void {
    const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
    };

    memoryCache.set(key, entry);

    if (typeof window !== 'undefined') {
        try {
            if (window.localStorage) {
                window.localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
            }
        } catch {}

        try {
            if (window.sessionStorage) {
                window.sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
            }
        } catch {}
    }
}

/**
 * Fetch options data with strict persistent caching.
 * Only makes a network request if:
 * 1. No valid cache exists (< 15 mins old).
 * 2. User explicitly clicks refresh (`forceRefresh: true`).
 */
export async function fetchWithOptionsCache<T>(
    url: string,
    options: { minIntervalMs?: number; forceRefresh?: boolean } = {}
): Promise<T> {
    const minIntervalMs = options.minIntervalMs ?? MIN_REFRESH_INTERVAL_MS;
    const cacheKey = url;
    const now = Date.now();

    const existingEntry = getCacheEntry<T>(cacheKey);

    // If valid cache exists and forceRefresh is NOT explicitly true, return cached data
    if (existingEntry && !options.forceRefresh) {
        const ageMs = now - existingEntry.timestamp;
        if (ageMs < minIntervalMs) {
            return existingEntry.data;
        }
    }

    // Otherwise, fetch fresh data from network
    const res = await fetch(url);
    if (!res.ok) {
        let errMsg = `HTTP error! Status: ${res.status}`;
        try {
            const errData = await res.json();
            if (errData?.error) errMsg = errData.error;
            else if (errData?.detail) errMsg = errData.detail;
        } catch {
            // non-JSON response
        }
        throw new Error(errMsg);
    }

    const data: T = await res.json();
    saveToCache(cacheKey, data);
    return data;
}

/**
 * Get age in seconds of cached data for a specific URL/key
 */
export function getCacheAgeSeconds(key: string): number | null {
    const entry = getCacheEntry(key);
    if (!entry) return null;
    return Math.floor((Date.now() - entry.timestamp) / 1000);
}

/**
 * Check if data is eligible for a fresh network update (> 15 minutes old or empty)
 */
export function canRefresh(key: string, minIntervalMs: number = MIN_REFRESH_INTERVAL_MS): boolean {
    const entry = getCacheEntry(key);
    if (!entry) return true;
    return Date.now() - entry.timestamp >= minIntervalMs;
}

/**
 * Invalidate options cache for a specific key or all options data
 */
export function clearOptionsCache(key?: string): void {
    if (key) {
        memoryCache.delete(key);
        if (typeof window !== 'undefined') {
            try {
                window.localStorage?.removeItem(CACHE_PREFIX + key);
                window.sessionStorage?.removeItem(CACHE_PREFIX + key);
            } catch {}
        }
    } else {
        memoryCache.clear();
        if (typeof window !== 'undefined') {
            try {
                if (window.localStorage) {
                    Object.keys(window.localStorage).forEach(k => {
                        if (k.startsWith(CACHE_PREFIX)) window.localStorage.removeItem(k);
                    });
                }
                if (window.sessionStorage) {
                    Object.keys(window.sessionStorage).forEach(k => {
                        if (k.startsWith(CACHE_PREFIX)) window.sessionStorage.removeItem(k);
                    });
                }
            } catch {}
        }
    }
}
