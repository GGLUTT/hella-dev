"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/context/LangContext";
import Reveal from "./Reveal";
import Image from "next/image";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const itemsUA: FAQItem[] = [
    {
      q: "Які терміни розробки сайту?",
      a: "Лендінг зазвичай створюється за 5-10 днів, складний корпоративний сайт або веб-додаток — від 3 до 6 тижнів. Терміни залежать від готовності технічного завдання (ТЗ), дизайну та швидкості зворотного зв'язку з вашого боку.",
    },
    {
      q: "Чи робите ви дизайн, чи потрібен мій макет?",
      a: "Дизайн розробляється з нуля у Figma, повністю орієнтуючись на ваші бізнес-цілі, брендбук та цільову аудиторію. Якщо у вас вже є готовий макет дизайну від іншого фахівця, я з радістю виконаю його якісну верстку та розробку.",
    },
    {
      q: "Що таке автоматизація на n8n і навіщо вона мені?",
      a: "n8n — це потужна платформа для інтеграції різних сервісів та API. Вона дозволяє зв'язати ваш сайт, CRM-систему, Telegram-ботів, Google Таблиці, пошту та ШІ в єдині автоматичні ланцюжки. Це допомагає прибрати рутину (наприклад, ручне копіювання лідів), виключити помилки через людський фактор та заощадити до 80% робочого часу команди.",
    },
    {
      q: "Чи інтегруєте ви штучний інтелект (OpenAI, ChatGPT) у бізнес?",
      a: "Так, я створюю розумних чат-ботів, AI-асистентів та скрипти на базі моделей OpenAI та Anthropic. Вони можуть автоматично відповідати на запити клієнтів, кваліфікувати ліди, генерувати комерційні пропозиції, сортувати пошту чи аналізувати дані 24/7.",
    },
    {
      q: "Чи надаєте ви підтримку після запуску проекту?",
      a: "Звичайно. Я надаю 14 днів безкоштовної технічної підтримки та гарантії після офіційного запуску проекту, щоб переконатися, що все працює ідеально. Також я пропоную пакети щомісячного технічного супроводу для подальшого розвитку сайту або автоматизацій.",
    },
    {
      q: "Як розраховується вартість і які умови оплати?",
      a: "Вартість розраховується індивідуально після обговорення вимог та фіксується у договорі. Зазвичай я працюю за схемою 50% передоплати та 50% після повної здачі проекту. Для великих проектів можливий розподіл на етапи (спринти) з поетапною оплатою.",
    },
    {
      q: "Чи працюєте ви з клієнтами з інших міст або країн?",
      a: "Так. Я працюю онлайн, тому можу вести проєкти з клієнтами з будь-кого міста України або з-за кордону. Бриф, обговорення, розробка, погодження й запуск проходять дистанційно.",
    },
  ];

  const itemsEN: FAQItem[] = [
    {
      q: "What is the website development timeline?",
      a: "A landing page usually takes 5-10 days, while a complex website or web application takes 3 to 6 weeks. The exact timeline depends on the requirements details, design complexity, and response time on feedback.",
    },
    {
      q: "Do you design websites or do I need to provide a mockup?",
      a: "Websites are designed from scratch in Figma, completely tailored to your business goals, brand identity, and target audience. If you already have a prepared UI design mockup, I will happily handle its high-quality coding and development.",
    },
    {
      q: "What is n8n automation and why do I need it?",
      a: "n8n is a powerful workflow automation tool. It connects your website, CRM, Telegram bots, Google Sheets, email, and AI into automated streams. This eliminates manual copy-pasting, prevents human errors, and saves up to 80% of operational hours.",
    },
    {
      q: "Do you integrate AI (OpenAI, ChatGPT) into business processes?",
      a: "Yes, I build smart AI chatbots, virtual assistants, and processing scripts using OpenAI and Anthropic models. They can handle support, qualify incoming leads, generate custom offers, organize incoming mail, or analyze database logs 24/7.",
    },
    {
      q: "Do you provide support after launching a project?",
      a: "Yes. I offer 14 days of free post-launch technical support and QA guarantee to ensure everything runs smoothly. I also offer monthly retainer plans for ongoing support, content updates, and server maintenance.",
    },
    {
      q: "How is pricing calculated and what are the payment terms?",
      a: "Pricing is calculated individually based on scope and is fixed in the agreement. I typically work on a 50/50 prepayment terms. For larger, multi-phase projects, milestones can be broken down with stage-by-stage payments.",
    },
    {
      q: "Do you work with clients from other cities or countries?",
      a: "Yes. I work online, so I can manage projects with clients from any city in Ukraine or from abroad. Briefing, discussions, development, approval, and launch are all done remotely.",
    },
  ];

  const items = t("ua", "en") === "ua" ? itemsUA : itemsEN;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={ref} className="relative overflow-hidden bg-black py-24 sm:py-32">
      {/* Scattered floating FAQ mockups */}
      <ScatteredFAQMockups progress={scrollYProgress} />

      {/* Glow layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[300px] w-[300px] rounded-full bg-cyan-500/[0.03] blur-[90px] md:h-[600px] md:w-[600px] md:blur-[150px] z-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-10 h-[300px] w-[300px] rounded-full bg-indigo-500/[0.03] blur-[90px] md:h-[600px] md:w-[600px] md:blur-[150px] z-0"
      />

      {/* Background elements */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <Reveal>
            <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/45">
              <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent to-white/50" />
              {t("Питання та відповіді", "FAQ")}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              {t("Відповіді на", "Answers to")}{" "}
              <span className="bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent">
                {t("популярні питання", "common questions")}
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Accordions */}
        <div className="relative z-10 space-y-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-emerald-500/30 bg-white/[0.02]"
                      : "border-white/10 bg-white/[0.005] hover:border-white/20 hover:bg-white/[0.015]"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left outline-none"
                  >
                    <span className="text-base font-semibold tracking-tight text-white/90 transition duration-300 group-hover:text-white sm:text-lg">
                      {item.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-transform duration-300 ${
                        isOpen ? "rotate-180 border-emerald-500/30 text-emerald-300" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="h-3.5 w-3.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="border-t border-white/5 px-6 pb-6 pt-4 text-sm leading-relaxed text-white/60">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================ SCATTERED FAQ MOCKUPS ============================ */

function ScatteredFAQMockups({
  progress,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const faq1Y = useTransform(progress, [0, 1], [80, -140]);
  const faq1Rot = useTransform(progress, [0, 1], [-5, 10]);

  const faq2Y = useTransform(progress, [0, 1], [160, -80]);
  const faq2Rot = useTransform(progress, [0, 1], [12, -6]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* FAQ1 - Left Side */}
      <motion.div
        style={{ y: faq1Y, rotate: faq1Rot }}
        className="absolute left-[-12%] top-[8%] opacity-[0.18] w-[140px] h-[105px] md:opacity-[0.45] md:left-[-10%] md:top-[12%] md:w-[293px] md:h-[220px] lg:left-[1%] xl:left-[3%]"
      >
        <Image
          src="/faq1.png"
          alt="FAQ design mockup left"
          fill
          className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.65)]"
          sizes="(max-width: 768px) 140px, 293px"
        />
      </motion.div>

      {/* FAQ2 - Right Side */}
      <motion.div
        style={{ y: faq2Y, rotate: faq2Rot }}
        className="absolute right-[-10%] bottom-[8%] opacity-[0.18] w-[110px] h-[138px] md:opacity-[0.45] md:right-[-8%] md:bottom-[12%] md:w-[240px] md:h-[300px] lg:right-[1%] xl:right-[3%]"
      >
        <Image
          src="/faq2.png"
          alt="FAQ design mockup right"
          fill
          className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.65)]"
          sizes="(max-width: 768px) 110px, 240px"
        />
      </motion.div>
    </div>
  );
}
