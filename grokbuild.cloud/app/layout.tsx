import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GrokBuild — Cloud AI Coding Agents Powered by Grok",
  description: "GrokBuild gives SuperGrok subscribers a persistent cloud environment where AI agents manage your GitHub repos — writing code, opening PRs, fixing bugs, and shipping features autonomously.",
  metadataBase: new URL("https://grokbuild.cloud"),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "GrokBuild — Cloud AI Coding Agents Powered by Grok",
    description: "Your GitHub repos. Grok's brain. Fully in the cloud. Persistent AI coding agents for SuperGrok subscribers.",
    url: "https://grokbuild.cloud",
    siteName: "GrokBuild",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "GrokBuild — Cloud AI Coding Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GrokBuild — Cloud AI Coding Agents Powered by Grok",
    description: "Your GitHub repos. Grok's brain. Fully in the cloud.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
        {children}
      </body>
    </html>
  );
}
