import { redirect } from 'next/navigation';

/**
 * /option has no content of its own — it lands on the Options Viewer.
 *
 * Server-side redirect rather than the previous client-side useEffect + router.replace: that
 * shipped a full page (header, "Redirecting…" copy, disclaimer) and only navigated after React
 * hydrated, so the user saw an interstitial flash and crawlers saw a real 200 page whose content
 * was the word "Redirecting". This resolves before anything renders and gives crawlers a proper
 * redirect to follow.
 */
export default function OptionsPage() {
  redirect('/option/viewer');
}
