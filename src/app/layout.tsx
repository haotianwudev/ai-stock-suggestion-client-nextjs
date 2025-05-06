import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ApolloWrapper } from "@/lib/apollo/apollo-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SOPHIE | Stock/Option Portfolio Helper",
  description: "Your intelligent stock/option portfolio helper for investment and education",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
