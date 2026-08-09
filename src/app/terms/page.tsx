import { Metadata } from "next";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Terms of Service | SOPHIE",
  description: "The terms that govern your use of SOPHIE Daddy Quant Blog.",
};

const LAST_UPDATED = "August 9, 2026";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-foreground/90">
            <section className="space-y-2">
              <p>
                These terms govern your use of SOPHIE Daddy Quant Blog (&quot;SOPHIE,&quot; &quot;we,&quot;
                &quot;us&quot;), a personal, independently-run educational site about investing, options, and
                quantitative finance. By using the site, you agree to these terms. If you don&apos;t agree, please
                don&apos;t use the site.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Educational content only — not financial advice</h2>
              <p>
                Everything on this site — articles, AI-generated analysis, signals, and commentary — is provided
                for educational and informational purposes only and does not constitute financial, investment,
                legal, or tax advice. Past performance does not guarantee future results. Always do your own
                research and consult a qualified professional before making investment decisions. You are solely
                responsible for your own investment decisions, and all investing involves risk, including loss of
                principal.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Accounts</h2>
              <p>
                Some features (commenting, bookmarking, donations) require signing in with Google. You&apos;re
                responsible for keeping your account secure and for anything that happens under it. You must be at
                least 13 years old to create an account.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Membership tiers</h2>
              <p>
                Tiers unlock additional access (e.g. premium articles) and, at higher levels, informal perks we
                provide personally (a page review, help with a video, a dedicated page) rather than automated
                features. These are provided on a reasonable-efforts, best-availability basis — there&apos;s no
                guaranteed delivery timeline, and we may adjust the tier ladder or what a given tier unlocks going
                forward, though we won&apos;t retroactively take away a tier you&apos;ve already reached.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Donations</h2>
              <p>
                Donations are voluntary, one-time payments processed securely by Stripe — we never receive or
                store your card details. Donations are generally non-refundable except where required by law or at
                our discretion. Donating promotes your account tier as described on the donate page at the time of
                your donation; tier thresholds may change for future donations but won&apos;t reduce a tier you&apos;ve
                already earned.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Your content</h2>
              <p>
                If you post comments, forum threads, or other content, you keep ownership of it, but you grant us a
                license to display it on the site. You&apos;re responsible for what you post — don&apos;t post
                anything illegal, harassing, spammy, or infringing on someone else&apos;s rights. We may remove
                content or suspend accounts that violate this.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Our content</h2>
              <p>
                Articles, analysis, and other original content on the site are ours (or used with permission) and
                are provided for your personal, non-commercial use. Don&apos;t republish or redistribute our content
                without permission.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Third-party services</h2>
              <p>
                We rely on third parties to run the site — Supabase (auth/database), Google (sign-in), Stripe
                (payments), Microsoft Clarity (analytics), YouTube (embedded video), and Vercel (hosting). Your use
                of features backed by these services is also subject to their own terms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">No warranty; limitation of liability</h2>
              <p>
                The site is provided &quot;as is,&quot; without warranties of any kind. AI-generated analysis may
                contain errors, may be incomplete, and may not account for all market factors or recent
                developments. To the fullest extent permitted by law, we aren&apos;t liable for any losses or
                damages arising from your use of the site, including any investment decisions you make based on its
                content.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Termination</h2>
              <p>
                We may suspend or terminate access to the site or your account at any time, particularly for
                violating these terms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Changes to these terms</h2>
              <p>
                We may update these terms as the site changes. We&apos;ll update the &quot;Last updated&quot; date
                above when we do; continuing to use the site after a change means you accept the updated terms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Contact</h2>
              <p>
                Questions about these terms? Reach out via{" "}
                <a href="/forum/site-feedback" className="font-medium underline underline-offset-2">
                  Feedback
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
