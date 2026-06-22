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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.agency-hella.site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hella — Створення та розробка сайтів і програм | Біла Церква, Київ | Hella Dev Agency",
    template: "%s | Hella Dev Agency",
  },
  description:
    "Євгеній Лютий (Hella) — Fullstack розробник та засновник digital-агенції Hella. Професійне створення та розробка сайтів і програм у Києві, Білій Церкві та області. Преміальні веб-застосунки на React, Next.js, Node.js та комплексна автоматизація бізнес-процесів за допомогою n8n.",
  keywords: [
    "fullstack developer",
    "web developer ukraine",
    "react developer",
    "next.js developer",
    "node.js developer",
    "typescript",
    "postgresql",
    "n8n automation",
    "hella dev agency",
    "hella digital agency",
    "агенція автоматизації hella",
    "розробка сайтів київ",
    "створення сайтів біла церква",
    "розробка сайтів біла церква",
    "програми біла церква",
    "розробка програм біла церква",
    "розробка сайтів київ та область",
    "топ розробка сайту",
    "агенція розробки сайтів",
    "веб-студія біла церква",
    "розробка сайтів біла церква та київ",
    "web development studio ukraine",
    "інтеграція n8n",
    "n8n integration ukraine",
    "фулстек агенція",
    "веб студія hella",
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
    siteName: "Hella Dev Agency",
    title: "Hella — Створення та розробка сайтів і програм | Біла Церква, Київ | Hella Dev Agency",
    description:
      "Євгеній Лютий (Hella) — Fullstack розробник та засновник digital-агенції Hella. Професійне створення та розробка сайтів і програм у Києві, Білій Церкві та області. Преміальні веб-застосунки на React, Next.js, Node.js та комплексна автоматизація бізнес-процесів за допомогою n8n.",
    locale: "uk_UA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hella — Fullstack & Automation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hella — Створення та розробка сайтів і програм | Біла Церква, Київ",
    description:
      "Євгеній Лютий (Hella) — Fullstack розробник та засновник digital-агенції Hella. Професійне створення та розробка сайтів і програм у Києві, Білій Церкві та області. Преміальні веб-застосунки на React, Next.js, Node.js та комплексна автоматизація бізнес-процесів за допомогою n8n.",
    creator: "@hella_dev",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon.png",
  },
  verification: {
    google: "w9s8jMp7SANDS33zatZRI9vRwTJcL48JJ0E3mNgMirY",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Yevhenii Liutyi",
      alternateName: "Hella",
      url: SITE_URL,
      jobTitle: "Fullstack Web Developer & Founder",
      description:
        "Fullstack developer and founder of Hella Dev Agency, specializing in React, Next.js, Node.js, TypeScript and business process automation with n8n.",
      knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "n8n", "Web Development"],
      sameAs: [
        "https://github.com/GGLUTT",
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#agency`,
      name: "Hella Dev Agency",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      description: "Premium fullstack web development and business automation (n8n integrations) services.",
      address: {
        "@type": "PostalAddress",
        "addressLocality": "Kyiv",
        "addressCountry": "UA"
      },
      offers: {
        "@type": "Offer",
        "description": "Fullstack web development and n8n workflow automation solutions",
        "url": `${SITE_URL}/#services`
      }
    }
  ]
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
