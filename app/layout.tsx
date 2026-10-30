import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import { LangProvider } from "@/context/LangContext";
import InteractiveAssistant from "@/components/InteractiveAssistant";
import { ThemeProvider } from "@/context/ThemeContext";
import SmoothScroll from "@/components/SmoothScroll";

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
    default: "Створення сайтів під ключ — Київ, Біла Церква | Lutiy Digital",
    template: "%s | Lutiy Digital",
  },
  description:
    "Розробка сайтів, лендінгів, інтернет-магазинів і веб-застосунків під ключ від $150. SEO з першого дня, інтеграції з CRM, автоматизація n8n та AI. Київ, Біла Церква, вся Україна.",
  keywords: [
    "fullstack developer",
    "web developer ukraine",
    "react developer",
    "next.js developer",
    "node.js developer",
    "typescript",
    "postgresql",
    "n8n automation",
    "lutiy digital",
    "лютий діджитал",
    "lutiy digital studio",
    "hella dev agency",
    "hella dev",
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
    "веб студія lutiy digital",
    "веб розробник",
    "фулстек розробник",
    "замовити сайт",
    "розробка сайтів",
    "Євгеній Лютий",
    "lutiy digital",
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
      "uk-UA": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Lutiy Digital",
    title: "Створення сайтів під ключ — Київ, Біла Церква | Lutiy Digital",
    description:
      "Розробка сайтів, лендінгів, інтернет-магазинів і веб-застосунків під ключ від $150. SEO з першого дня, інтеграції з CRM, автоматизація n8n та AI. Київ, Біла Церква, вся Україна.",
    locale: "uk_UA",
    images: [
      {
        url: `${SITE_URL}/preview.png`,
        width: 1200,
        height: 630,
        alt: "Lutiy Digital — Fullstack & Automation Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Створення сайтів під ключ — Київ, Біла Церква | Lutiy Digital",
    description:
      "Розробка сайтів, лендінгів, інтернет-магазинів і веб-застосунків під ключ від $150. SEO з першого дня, інтеграції з CRM, автоматизація n8n та AI. Київ, Біла Церква, вся Україна.",
    creator: "@yevhenii_liutyi",
    images: [`${SITE_URL}/preview.png`],
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
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "Lutiy Digital",
      "url": SITE_URL,
      "logo": `${SITE_URL}/favicon.png`,
      "sameAs": [
        "https://github.com/GGLUTT",
        "https://www.linkedin.com/in/evgenii-lutiy-460797364/",
        "https://www.instagram.com/gg_lutt/",
        "https://www.tiktok.com/@hella.work44",
        "https://t.me/GGLUTT"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "Lutiy Digital",
      "description": "Веб-застосунки та автоматизація бізнес-процесів",
      "publisher": {
        "@id": `${SITE_URL}/#organization`
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      "name": "Lutiy Digital",
      "url": SITE_URL,
      "logo": `${SITE_URL}/favicon.png`,
      "image": `${SITE_URL}/preview.png`,
      "description": "Розробка сайтів під ключ, лендінгів, інтернет-магазинів, веб-застосунків, чат-ботів та автоматизація бізнес-процесів (n8n, AI) для бізнесу в Києві, Білій Церкві та по всій Україні.",
      "priceRange": "від $150",
      "founder": {
        "@type": "Person",
        "name": "Євгеній Лютий",
        "alternateName": "Yevhenii Liutyi",
        "jobTitle": "Fullstack-розробник, засновник Lutiy Digital",
        "sameAs": ["https://github.com/GGLUTT", "https://www.linkedin.com/in/evgenii-lutiy-460797364/"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kyiv",
        "addressRegion": "Київська область",
        "addressCountry": "UA"
      },
      "areaServed": [
        { "@type": "City", "name": "Київ" },
        { "@type": "City", "name": "Біла Церква" },
        { "@type": "Country", "name": "Україна" }
      ],
      "knowsAbout": ["Next.js", "React", "Node.js", "SEO", "n8n", "CRM integrations", "AI assistants"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Послуги Lutiy Digital",
        "itemListElement": [
          { "@type": "Offer", "price": "150", "priceCurrency": "USD", "itemOffered": { "@type": "Service", "name": "Розробка Landing Page", "url": `${SITE_URL}/landing-page` } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Створення сайтів у Києві", "url": `${SITE_URL}/stvorennya-saitiv-kyiv` } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Створення сайтів у Білій Церкві", "url": `${SITE_URL}/stvorennya-saitiv-bila-tserkva` } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Розробка веб-застосунків", "url": `${SITE_URL}/web-app-development` } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Автоматизація бізнесу через n8n та AI", "url": `${SITE_URL}/n8n-automation` } }
        ]
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (sessionStorage.getItem('lutiy-intro')) document.documentElement.classList.add('intro-seen');
                } catch (e) {}
                try {
                  var stored = localStorage.getItem('theme');
                  var resolved = stored || 'light';
                  document.documentElement.setAttribute('data-theme', resolved);
                  if (resolved === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body className="font-sans bg-black text-white antialiased">
        <ThemeProvider>
          <LangProvider>
            <SmoothScroll />
            <ConsoleEasterEgg />
            {children}
            <CookieBanner />
            <InteractiveAssistant />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
