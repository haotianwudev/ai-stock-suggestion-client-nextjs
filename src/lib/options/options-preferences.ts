import { canAccessLiveOptions } from '@/lib/tiers';

export type OptionDataSource = 'historical' | 'live';

const OPTION_SOURCE_PREF_KEY = 'sophie_preferred_option_source';

/**
 * Get user's preferred option data source.
 * If user has chosen 'live' and has Tier 4+, returns 'live'.
 * Otherwise defaults to 'historical'.
 */
export function getPreferredOptionSource(userTier: number = 1): OptionDataSource {
    if (typeof window === 'undefined') return 'historical';

    try {
        const stored = window.localStorage?.getItem(OPTION_SOURCE_PREF_KEY);
        if (stored === 'live' && canAccessLiveOptions(userTier)) {
            return 'live';
        }
    } catch {
        // Fallback on storage errors
    }

    return 'historical';
}

/**
 * Save user's preferred option data source to local storage
 */
export function setPreferredOptionSource(source: OptionDataSource): void {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage?.setItem(OPTION_SOURCE_PREF_KEY, source);
    } catch {
        // Ignore storage errors
    }
}
