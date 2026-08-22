import { permanentRedirect } from 'next/navigation';

/**
 * /option has no content of its own — it lands on the Options Viewer.
 *
 * Server-side redirect rather than the previous client-side useEffect + router.replace: that
 * shipped a full page (header, "Redirecting…" copy, disclaimer) and only navigated after React
 * hydrated, so the user saw an interstitial flash and crawlers saw a real 200 page whose content
 * was the word "Redirecting".
 *
 * permanentRedirect (308), not redirect (307): /option is an indexed URL, and a temporary
 * redirect tells search engines to keep indexing it and pass no signal to the destination. 308
 * consolidates it onto /option/viewer instead. Note that browsers cache 308 indefinitely, so
 * changing this target again later will not reach anyone who has already hit it — that is the
 * intended trade-off for a structural landing decision, not an oversight.
 */
export default function OptionsPage() {
  permanentRedirect('/option/viewer');
}
