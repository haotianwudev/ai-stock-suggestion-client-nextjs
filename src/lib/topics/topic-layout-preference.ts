import { canSetTopicLayoutPreference } from '@/lib/tiers';

export type TopicLayout = 'classic' | 'sidebar';

const TOPIC_LAYOUT_PREF_KEY = 'sophie_preferred_topic_layout';

/**
 * Get the user's preferred topic-page layout. Everyone defaults to "classic"; only a tier that
 * passes canSetTopicLayoutPreference can have "sidebar" persisted and honored back. Same
 * localStorage-preference shape as lib/options/options-preferences.ts.
 */
export function getPreferredTopicLayout(userTier: number = 1): TopicLayout {
    if (typeof window === 'undefined') return 'classic';

    try {
        const stored = window.localStorage?.getItem(TOPIC_LAYOUT_PREF_KEY);
        if (stored === 'sidebar' && canSetTopicLayoutPreference(userTier)) {
            return 'sidebar';
        }
    } catch {
        // Fallback on storage errors
    }

    return 'classic';
}

/** Save the user's preferred topic-page layout to local storage. */
export function setPreferredTopicLayout(layout: TopicLayout): void {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage?.setItem(TOPIC_LAYOUT_PREF_KEY, layout);
    } catch {
        // Ignore storage errors
    }
}
