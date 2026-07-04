import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import { LangProvider } from "@/context/LangContext";
import InteractiveAssistant from "@/components/InteractiveAssistant";
import { ThemeProvider } from "@/context/ThemeContext";

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
    default: "Розробка сайтів & автоматизація процесів | Lutiy Digital",
    template: "%s | Lutiy Digital",
  },
  description:
    "Студія Євгенія Лютого Lutiy Digital (раніше Hella Dev Agency): розробка швидких сайтів, веб-додатків та автоматизація бізнес-процесів (n8n, AI) в Україні.",
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
      "uk": SITE_URL,
      "en": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Lutiy Digital",
    title: "Розробка сайтів & автоматизація процесів | Lutiy Digital",
    description:
      "Студія Євгенія Лютого Lutiy Digital (раніше Hella Dev Agency): розробка швидких сайтів, веб-додатків та автоматизація бізнес-процесів (n8n, AI) в Україні.",
    locale: "uk_UA",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Lutiy Digital — Fullstack & Automation Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Розробка сайтів & автоматизація процесів | Lutiy Digital",
    description:
      "Студія Євгенія Лютого Lutiy Digital (раніше Hella Dev Agency): розробка швидких сайтів, веб-додатків та автоматизація бізнес-процесів (n8n, AI) в Україні.",
    creator: "@yevhenii_liutyi",
    images: [`${SITE_URL}/og-image.png`],
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
      "image": `${SITE_URL}/og-image.png`,
      "description": "Створення сайтів, веб-додатків та автоматизація бізнес-процесів за допомогою n8n та штучного інтелекту.",
      "telephone": "",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kyiv",
        "addressCountry": "UA"
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Які терміни розробки сайту?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Лендінг зазвичай створюється за 5-10 днів, складний корпоративний сайт або веб-додаток — від 3 до 6 тижнів. Терміни залежать від готовності технічного завдання (ТЗ), дизайну та швидкості зворотного зв'язку з вашого боку."
          }
        },
        {
          "@type": "Question",
          "name": "Чи робите ви дизайн, чи потрібен мій макет?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Дизайн розробляється з нуля у Figma, повністю орієнтуючись на ваші бізнес-цілі, брендбук та цільову аудиторію. Якщо у вас вже є готовий макет дизайну від іншого фахівця, я з радістю виконаю його якісну верстку та розробку."
          }
        },
        {
          "@type": "Question",
          "name": "Що таке автоматизація на n8n і навіщо вона мені?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "n8n — це потужна платформа для інтеграції різних сервісів та API. Вона дозволяє зв'язати ваш сайт, CRM-систему, Telegram-ботів, Google Таблиці, пошту та ШІ в єдині автоматичні ланцюжки. Це допомагає прибрати рутину (наприклад, ручне копіювання лідів), виключити помилки через людський фактор та заощадити до 80% робочого часу команди."
          }
        },
        {
          "@type": "Question",
          "name": "Чи інтегруєте ви штучний інтелект (OpenAI, ChatGPT) у бізнес?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Так, я створюю розумних чат-ботів, AI-асистентів та скрипти на базі моделей OpenAI та Anthropic. Вони можуть автоматично відповідати на запити клієнтів, кваліфікувати ліди, генерувати комерційні пропозиції, сортувати пошту чи аналізувати дані 24/7."
          }
        },
        {
          "@type": "Question",
          "name": "Чи надаєте ви підтримку після запуску проекту?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Звичайно. Я надаю 14 днів безкоштовної технічної підтримки та гарантії після офіційного запуску проекту, щоб переконатися, що все працює ідеально. Також я пропоную пакети щомісячного технічного супроводу для подальшого розвитку сайту або автоматизацій."
          }
        },
        {
          "@type": "Question",
          "name": "Як розраховується вартість і які умови оплати?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Вартість розраховується індивідуально після обговорення вимог та фіксується у договорі. Зазвичай я працюю за схемою 50% передоплати та 50% після повної здачі проекту. Для великих проектів можливий розподіл на етапи (спринти) з поетапною оплатою."
          }
        },
        {
          "@type": "Question",
          "name": "Чи працюєте ви з клієнтами з інших міст або країн?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Так. Я працюю онлайн, тому можу вести проєкти з клієнтами з будь-кого міста України або з-за кордону. Бриф, обговорення, розробка, погодження й запуск проходять дистанційно."
          }
        }
      ]
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
