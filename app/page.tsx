import Hero from "@/components/Hero";
import SiteLoader from "@/components/SiteLoader";
import Nav from "@/components/Nav";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import AIAutomation from "@/components/AIAutomation";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ForWhom from "@/components/ForWhom";
import WhatYouGet from "@/components/WhatYouGet";
import Workflow from "@/components/Workflow";
import TrustStrip from "@/components/TrustStrip";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.agency-hella.site";

// FAQ rich results belong only on the page that actually shows the FAQ.
const faqLd = {
  "@context": "https://schema.org",
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
};

export default function Page() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <SiteLoader />
      <Nav />
      <Hero />
      <TrustStrip />
      <About />
      <ForWhom />
      <WhatYouGet />
      <Projects />
      <Services />
      <AIAutomation />
      <Workflow />
      <FAQ />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
