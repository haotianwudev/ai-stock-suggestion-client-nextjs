import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ApolloWrapper } from "@/lib/apollo/apollo-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://sophie-ai-finance.com'),
  title: {
    default: "SOPHIE's Daddy Blog - Stock & Options Analysis",
    template: "%s | SOPHIE's Daddy Blog",
  },
  description: "SOPHIE's Daddy Blog - Your go-to resource for stock analysis, options trading strategies, and investment education. Learn from detailed research, practical examples, and educational content.",
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
  authors: [{ name: "SOPHIE's Daddy Blog" }],
  creator: "SOPHIE's Daddy Blog",
  publisher: "SOPHIE's Daddy Blog",
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sophie-ai-finance.com',
    siteName: "SOPHIE's Daddy Blog",
    title: "SOPHIE's Daddy Blog - Stock & Options Analysis",
    description: "SOPHIE's Daddy Blog - Your go-to resource for stock analysis, options trading strategies, and investment education.",
    images: [
      {
        url: '/images/agents/SOPHIE.png',
        width: 1200,
        height: 630,
        alt: "SOPHIE's Daddy Blog Stock Analysis",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SOPHIE's Daddy Blog - Stock & Options Analysis",
    description: "SOPHIE's Daddy Blog - Your go-to resource for stock analysis, options trading strategies, and investment education.",
    images: ['/images/agents/SOPHIE.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
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
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloWrapper>
            {children}
          </ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
