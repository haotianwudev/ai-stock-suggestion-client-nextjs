"use client";

import React from 'react';
import { VolRegimePanel } from './viewer/vol-regime-panel';
import { VrpTimingView } from './viewer/vrp-timing-view';
import { RegimeTransitionView } from './viewer/regime-transition-view';

/**
 * Standalone VRP research tab: today's regime snapshot, then the deeper
 * decomposition research below it (does VRP level predict what you earn,
 * and what does the regime label predict instead). Each section fetches
 * `volRegime` independently via Apollo's query deduplication, so this stays
 * one network request despite three components.
 */
export function VrpResearchTab() {
  return (
    <div className="space-y-4">
      <VolRegimePanel />
      <VrpTimingView />
      <RegimeTransitionView />
    </div>
  );
}
