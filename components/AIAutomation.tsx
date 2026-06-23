"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DatabaseIcon,
  TelegramIcon,
  AiChatIcon,
  MailIcon,
  DocumentValidationIcon,
  MagicWand01Icon,
  Analytics01Icon,
  DashboardSquare01Icon,
} from "@hugeicons/core-free-icons";
import { useLang } from "@/context/LangContext";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

const icons = [
  DatabaseIcon,
  TelegramIcon,
  DashboardSquare01Icon,
  AiChatIcon,
  MailIcon,
  DocumentValidationIcon,
  MagicWand01Icon,
  Analytics01Icon,
];

export default function AIAutomation() {
  const { t } = useLang();

  const casesUA = [
    {
      title: "Інтеграція з CRM",
      desc: "Автоматична передача лідів із сайту в CRM (KeyCRM, SalesDrive, HubSpot тощо) без ручного копіювання.",
    },
    {
      title: "Сповіщення в Telegram",
      desc: "Миттєві повідомлення про нові замовлення, дзвінки або оплати прямо у ваш робочий чат.",
    },
    {
      title: "Google Таблиці",
      desc: "Автоматичний запис контактів та замовлень для швидкого обліку та спільної роботи команди.",
    },
    {
      title: "AI-асистенти та чат-боти",
      desc: "Автоматична кваліфікація лідів, відповіді на часті запитання та підтримка клієнтів 24/7 у Telegram чи на сайті.",
    },
    {
      title: "Автоматичні Email-розсилки",
      desc: "Надсилання комерційних пропозицій, рахунків чи вітальних листів одразу після залишення заявки.",
    },
    {
      title: "Генерація документів",
      desc: "Автозаповнення договорів, рахунків або актів у Google Docs/PDF при зміні статусу угоди.",
    },
    {
      title: "Сценарії n8n / Make",
      desc: "Об'єднання будь-яких сервісів та API в єдину систему без щомісячної переплати за готові конектори.",
    },
    {
      title: "ШІ-аналіз та обробка даних",
      desc: "Автоматичне розпізнавання рахунків, транскрибація аудіо або генерація звітів за допомогою OpenAI / Anthropic.",
    },
  ];

  const casesEN = [
    {
      title: "CRM Integration",
      desc: "Automatic lead transfer from website to CRM (HubSpot, Salesforce, KeyCRM, etc.) without manual data entry.",
    },
    {
      title: "Telegram Notifications",
      desc: "Instant alerts about new orders, calls, or payments sent directly to your team chat.",
    },
    {
      title: "Google Sheets Sync",
      desc: "Automatic logging of contacts and orders for quick accounting and team collaboration.",
    },
    {
      title: "AI Assistants & Chatbots",
      desc: "Automated lead qualification, FAQ support, and 24/7 customer service in Telegram or web chat.",
    },
    {
      title: "Automated Email Workflows",
      desc: "Instant delivery of commercial proposals, invoices, or welcome letters upon form submission.",
    },
    {
      title: "Document Generation",
      desc: "Auto-generating contracts, invoices, or PDF reports whenever a deal status changes.",
    },
    {
      title: "n8n / Make Scenarios",
      desc: "Connecting multiple services and APIs into a single workflow without paying for premium connectors.",
    },
    {
      title: "AI Data Processing",
      desc: "Automatic invoice parsing, voice-to-text transcribing, or report generation using OpenAI / Anthropic.",
    },
  ];

  const cases = t("ua", "en") === "ua" ? casesUA : casesEN;

  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="automation" className="relative overflow-hidden bg-black py-24 sm:py-32">
      {/* Glow layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 h-[350px] w-[350px] rounded-full bg-white/10 blur-[80px] md:h-[650px] md:w-[650px] md:blur-[160px] z-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-1/4 h-[350px] w-[350px] rounded-full bg-teal-500/20 blur-[80px] md:h-[650px] md:w-[650px] md:blur-[160px] z-0"
      />

      {/* Decorative chain background asset */}
      <motion.div
        initial={{ y: 0, rotate: 0 }}
        animate={{
          y: [-12, 12, -12],
          rotate: [-1, 2, -1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden
        className="pointer-events-none absolute -right-24 top-12 w-[350px] sm:w-[550px] md:w-[750px] opacity-[0.07] z-0 select-none"
      >
        <img
          src="/vis.png"
          alt=""
          className="w-full h-auto object-contain pointer-events-none"
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/45">
              <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent to-white/50" />
              {t("Автоматизація бізнесу", "Business Automation")}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              {t("Що можна", "What can be")}{" "}
              <span className="bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent">
                {t("автоматизувати", "automated")}
              </span>{" "}
              {t("за допомогою ШІ", "using AI")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">
              {t(
                "Hella Dev Agency позбавляє ваш бізнес від рутинних процесів, пов'язуючи системи в єдиний злагоджений організм та підключаючи штучний інтелект.",
                "Hella Dev Agency eliminates routine tasks from your business by connecting systems into a unified workflow and integrating artificial intelligence."
              )}
            </p>
          </Reveal>
        </div>

        {/* 8 Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((c, i) => {
            const IconComponent = icons[i % icons.length];
            return (
              <Reveal key={c.title} delay={0.05 + i * 0.05}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.01] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/[0.03]">
                  {/* Sheen indicator */}
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  
                  <div>
                    <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-emerald-300 ring-1 ring-white/10 transition group-hover:bg-emerald-300/10 group-hover:text-emerald-300">
                      <HugeiconsIcon icon={IconComponent} size={20} />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-white transition group-hover:text-emerald-300">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/50 transition group-hover:text-white/60">
                      {c.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-[10px] font-mono text-white/20 select-none">
                    <span>// {String(i + 1).padStart(2, "0")}</span>
                    <span className="opacity-0 transition duration-300 group-hover:opacity-100 text-emerald-300/50">
                      active_workflow
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-16 flex justify-center">
          <Reveal delay={0.2}>
            <MagneticButton
              as="button"
              onClick={handleScrollToContact}
              glowBorder={false}
              strength={0.2}
              className="relative overflow-hidden bg-white text-black font-semibold border border-white px-8 py-3.5 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-white/90 transition duration-300 flex items-center justify-center"
            >
              <span className="relative z-10">
                {t("Показати, що можна автоматизувати", "Show what can be automated")}
              </span>
              
              {/* Micro-shimmer sheen */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent group-hover/magnetic:translate-x-full transition-transform duration-1000 ease-out" />
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
