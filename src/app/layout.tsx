import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { BackgroundLayers } from "@/components/background/background-layers";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { FloatingChatWidget } from "@/features/chat/floating-chat-widget";
import { CommandMenu } from "@/features/command-menu/command-menu";
import { IntroSequence } from "@/features/intro/intro-sequence";
import { SITE_CONFIG } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  keywords: [
    "Mouli V",
    "Python Full Stack Developer",
    "Generative AI",
    "RAG",
    "FastAPI",
    "LangChain",
    "LangGraph",
    "Next.js",
  ],
  openGraph: {
    type: "website",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.name,
  jobTitle: "Python Full Stack Developer",
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  email: `mailto:${SITE_CONFIG.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Python",
    "FastAPI",
    "LangChain",
    "LangGraph",
    "Retrieval-Augmented Generation",
    "Next.js",
    "TypeScript",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AppProviders>
          <IntroSequence />
          <a
            href="#main-content"
            className="focus-ring bg-primary text-primary-foreground sr-only rounded-md px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
          >
            Skip to content
          </a>
          <BackgroundLayers />
          <ScrollProgress />
          <CustomCursor />
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <CommandMenu />
          <FloatingChatWidget />
        </AppProviders>
      </body>
    </html>
  );
}
