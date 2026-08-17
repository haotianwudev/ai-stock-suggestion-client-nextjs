import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ApolloWrapper } from "@/lib/apollo/apollo-wrapper";
import { UserProvider } from "@/hooks/use-user";
import { LanguageProvider } from "@/hooks/use-language";
import { Toaster } from "@/components/ui/sonner";
import { DevChatMount } from "@/components/chat/dev-chat-mount";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sophie-ai-finance.com'),
  title: {
    default: "SOPHIE Daddy Quant Blog - Stock & Options Analysis",
    template: "%s | SOPHIE Daddy Quant Blog",
  },
  description: "SOPHIE Daddy Quant Blog - Your go-to resource for stock analysis, options trading strategies, and investment education. Learn from detailed research, practical examples, and educational content.",
  keywords: [
    'stock analysis',
    'options trading',
    'investment education',
    'AI trading',
    'portfolio management',
    'financial analysis',
    'DCF valuation',
    'options strategies',
    'put options',
    'call options',
    'covered calls',
    'cash secured puts',
    'technical analysis',
    'fundamental analysis'
  ],
  authors: [{ name: "SOPHIE Daddy Quant Blog" }],
  creator: "SOPHIE Daddy Quant Blog",
  publisher: "SOPHIE Daddy Quant Blog",
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.sophie-ai-finance.com',
    siteName: "SOPHIE Daddy Quant Blog",
    title: "SOPHIE Daddy Quant Blog - Stock & Options Analysis",
    description: "SOPHIE Daddy Quant Blog - Your go-to resource for stock analysis, options trading strategies, and investment education.",
    images: [
      {
        url: '/images/agents/SOPHIE.png',
        width: 1200,
        height: 630,
        alt: "SOPHIE Daddy Quant Blog Stock Analysis",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SOPHIE Daddy Quant Blog - Stock & Options Analysis",
    description: "SOPHIE Daddy Quant Blog - Your go-to resource for stock analysis, options trading strategies, and investment education.",
    images: ['/images/agents/SOPHIE.png'],
  },
  icons: {
    icon: '/images/favicon.png',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: "SOPHIE's Daddy Quant Blog - All Articles" },
        { url: '/feed.xml', title: "SOPHIE's Daddy Quant Blog - RSS Feed" },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="clarity-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ri4mhyqbv0");
            `
          }}
        />
        {/* Sets <html lang> before first paint from ?lang= or localStorage, mirroring
            next-themes' own flash-of-wrong-value fix for the theme class below. This
            only fixes the lang attribute pre-paint -- the translated text itself still
            renders via LanguageProvider's client state, so a brief flash of English text
            (not the attribute) for a returning zh-preferring visitor is an accepted
            trade-off of a client-only toggle with no server-side locale detection. */}
        <Script
          id="lang-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var p = new URLSearchParams(window.location.search).get('lang');
                var lang = p === 'zh' || p === 'en' ? p : (localStorage.getItem('sophie-lang') === 'zh' ? 'zh' : 'en');
                document.documentElement.lang = lang;
              })();
            `
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <ApolloWrapper>
              <UserProvider>
                {children}
                <DevChatMount />
              </UserProvider>
            </ApolloWrapper>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
