import { Metadata } from "next";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Privacy Policy | SOPHIE",
  description: "How SOPHIE Daddy Quant Blog collects, uses, and protects your information.",
};

const LAST_UPDATED = "August 9, 2026";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-foreground/90">
            <section className="space-y-2">
              <p>
                SOPHIE Daddy Quant Blog (&quot;SOPHIE,&quot; &quot;we,&quot; &quot;us&quot;) is a personal,
                independently-run educational site about investing, options, and quantitative finance. This page
                explains what information we collect when you use the site, why, and who else sees it. It applies
                only to sophie-ai-finance.com and does not cover third-party sites we link to.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Information we collect</h2>
              <p>You can read every article on the site without an account and without giving us anything. If you sign in, we collect:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  <strong>Account info from Google Sign-In</strong> — your name, email address, and profile picture,
                  provided by Google when you authorize sign-in. We use Supabase for authentication; we never see or
                  store your Google password.
                </li>
                <li>
                  <strong>Profile data you create on SOPHIE</strong> — a display name and avatar you choose, your
                  membership tier, and activity that affects it (articles/videos you&apos;ve liked or bookmarked,
                  whether you&apos;ve confirmed a YouTube subscription).
                </li>
                <li>
                  <strong>Forum posts and comments</strong> — anything you post is stored and attributed to your
                  account, and is visible to other visitors.
                </li>
                <li>
                  <strong>Donation records</strong> — if you donate, we store the amount, currency, and a Stripe
                  transaction reference so we can credit it to your account&apos;s tier. We never receive or store
                  your card number — that&apos;s handled entirely by Stripe (see below).
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Automatically collected information</h2>
              <p>
                Like most websites, our hosting and analytics providers automatically log standard technical data —
                IP address, browser/device type, pages visited, and general usage patterns — for security and to
                understand how the site is used. See &quot;Third-party services&quot; below for who specifically
                collects this.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">How we use your information</h2>
              <ul className="list-disc space-y-1 pl-6">
                <li>To create and maintain your account and membership tier</li>
                <li>To display your display name/avatar on forum posts and comments</li>
                <li>To process donations and apply the correct tier promotion</li>
                <li>To understand aggregate site usage and improve the content and features</li>
                <li>To respond if you contact us</li>
              </ul>
              <p>We do not sell your personal information, and we do not use it for third-party advertising.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Third-party services</h2>
              <p>We rely on a small number of external services to run the site. Each has its own privacy policy governing the data it processes on our behalf:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li><strong>Supabase</strong> (authentication &amp; database) — stores your account and profile data.</li>
                <li><strong>Google</strong> (Sign-In) — provides the sign-in itself; see Google&apos;s own privacy policy for what Google collects.</li>
                <li><strong>Stripe</strong> (donations) — processes all payment/card details directly; we never see your full card number.</li>
                <li><strong>Microsoft Clarity</strong> (analytics) — collects anonymized usage/behavior analytics to help us understand how the site is used.</li>
                <li><strong>YouTube</strong> (embedded videos) — when you play an embedded video, YouTube/Google may set its own cookies per their policy.</li>
                <li><strong>Vercel</strong> (hosting) — serves the site and logs standard request/hosting data.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Cookies &amp; local storage</h2>
              <p>
                We use a cookie to keep you signed in (managed by Supabase Auth) and a small amount of your
                browser&apos;s local storage to remember preferences like whether you&apos;ve unlocked an article.
                These stay on your device and are not sold or shared.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Data retention</h2>
              <p>
                We keep your account data for as long as your account exists. You can request deletion of your
                account and associated data at any time by contacting us (see below).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Your choices</h2>
              <ul className="list-disc space-y-1 pl-6">
                <li>You can use the site without an account for all free content.</li>
                <li>You can edit your display name/avatar, or sign out, from your profile settings at any time.</li>
                <li>You can request a copy of your data, or deletion of your account, by contacting us.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Children&apos;s privacy</h2>
              <p>SOPHIE is not directed at children under 13, and we do not knowingly collect information from them.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Changes to this policy</h2>
              <p>
                We may update this policy as the site changes. We&apos;ll update the &quot;Last updated&quot; date
                above when we do.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold">Contact</h2>
              <p>
                Questions about this policy or your data? Reach out via{" "}
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
