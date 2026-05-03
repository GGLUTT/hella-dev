import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import { LangProvider } from "@/context/LangContext";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = "https://hella.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hella — Fullstack Developer | React, Next.js, Node.js",
    template: "%s | Hella Dev",
  },
  description:
    "Євгеній Лютий (Hella) — Fullstack розробник. Розробка веб-застосунків на React, Next.js, TypeScript, Node.js, PostgreSQL. Автоматизація бізнес-процесів з n8n.",
  keywords: [
    "fullstack developer",
    "web developer ukraine",
    "react developer",
    "next.js developer",
    "node.js developer",
    "typescript",
    "postgresql",
    "n8n automation",
    "веб розробник",
    "фулстек розробник",
    "замовити сайт",
    "розробка сайтів",
    "Євгеній Лютий",
    "hella dev",
  ],
  authors: [{ name: "Yevhenii Liutyi", url: SITE_URL }],
  creator: "Yevhenii Liutyi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "uk": SITE_URL,
      "en": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Hella Dev",
    title: "Hella — Fullstack Developer | React, Next.js, Node.js",
    description:
      "Розробка веб-застосунків і автоматизація бізнес-процесів. React, Next.js, TypeScript, Node.js, PostgreSQL, n8n.",
    locale: "uk_UA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hella — Fullstack Developer",
    description:
      "Розробка веб-застосунків і автоматизація. React, Next.js, Node.js.",
    creator: "@hella_dev",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yevhenii Liutyi",
  alternateName: "Hella",
  url: SITE_URL,
  jobTitle: "Fullstack Web Developer",
  description:
    "Fullstack developer specializing in React, Next.js, Node.js, TypeScript and business process automation with n8n.",
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "n8n", "Web Development"],
  sameAs: [
    "https://github.com/GGLUTT",
  ],
  offers: {
    "@type": "Offer",
    description: "Fullstack web development and automation services",
    url: `${SITE_URL}/#services`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${inter.variable} ${unbounded.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-ink-950 text-white antialiased">
        <LangProvider>
          <ConsoleEasterEgg />
          {children}
          <CookieBanner />
        </LangProvider>
      </body>
    </html>
  );
}
