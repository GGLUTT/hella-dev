"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";

type Screen = "welcome" | "plans" | "services" | "pricing";

export default function InteractiveAssistant() {
  const { lang, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [showTooltip, setShowTooltip] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect viewport size on mount to avoid Next.js hydration mismatch
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-hide tooltip after 12 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const telegramLink = "https://t.me/GGLUTT";

  // Data for chatbot screens focused on business outcomes
  const screensData = {
    welcome: {
      titleUA: "Розвиток бізнесу",
      titleEN: "Business Growth",
      messageUA: "Привіт! 👋 Я допоможу підібрати рішення для зростання вашого бізнесу, залучення клієнтів та позбавлення від рутини. Яке завдання зараз пріоритетне?",
      messageEN: "Hello! 👋 I will help you find a solution to grow your business, attract clients, and eliminate routine tasks. What is your priority right now?",
      options: [
        {
          textUA: "Залучити нових клієнтів (Сайт) 📈",
          textEN: "Attract new clients (Website) 📈",
          action: () => navigateTo("plans"),
        },
        {
          textUA: "Автоматизувати рутину (Звільнити час) 🤖",
          textEN: "Automate routine (Save time) 🤖",
          action: () => navigateTo("services"),
        },
        {
          textUA: "Дізнатися вартість та терміни 💰",
          textEN: "Find out cost and timeline 💰",
          action: () => navigateTo("pricing"),
        },
        {
          textUA: "Отримати консультацію в Telegram ⚡",
          textEN: "Get a consultation on Telegram ⚡",
          href: telegramLink,
          primary: true,
        },
      ],
    },
    plans: {
      titleUA: "Залучення клієнтів",
      titleEN: "Client Attraction",
      messageUA: "Сайт — це ваш цілодобовий менеджер з продажів. Ми створюємо рішення, які:\n\n• **Приводять клієнтів з Google** завдяки вбудованому SEO під Київ та Білу Церкву.\n• **Підвищують довіру** за рахунок сучасного дизайну преміум-рівня.\n• **Утримують користувачів** завдяки миттєвому завантаженню та ідеальній роботі на телефонах.",
      messageEN: "A website is your 24/7 sales manager. We build solutions that:\n\n• **Bring clients from Google** with built-in SEO optimized for search results.\n• **Build instant trust** through custom, high-end premium designs.\n• **Convert visitors** with lightning-fast speeds and perfect mobile interfaces.",
      options: [
        {
          textUA: "Яка вартість розробки? 💰",
          textEN: "What are the rates? 💰",
          action: () => navigateTo("pricing"),
        },
        {
          textUA: "Замовити прорахунок сайту 🚀",
          textEN: "Order website estimation 🚀",
          href: telegramLink,
          primary: true,
        },
        {
          textUA: "← Назад до меню",
          textEN: "← Back to menu",
          action: () => navigateTo("welcome"),
        },
      ],
    },
    services: {
      titleUA: "Звільнення від рутини",
      titleEN: "Routine Automation",
      messageUA: "Автоматизація процесів звільняє до 80% вашого часу. Ми впроваджуємо рішення, які:\n\n• **Об'єднують системи в одну**: зв'язуємо вашу CRM, Telegram, пошту та Google Таблиці.\n• **Автоматизують замовлення**: система сама опрацьовує заявку та сповіщає команду.\n• **Працюють 24/7**: розумні боти відповідають клієнтам моментально без вихідних.",
      messageEN: "Process automation frees up to 80% of your time. We implement systems that:\n\n• **Connect everything in one place**: link your CRM, Telegram, email, and Google Sheets.\n• **Handle orders automatically**: the system processes leads and alerts your team instantly.\n• **Work 24/7**: smart bots reply to customers immediately without days off.",
      options: [
        {
          textUA: "Скільки коштує автоматизація? 💰",
          textEN: "What is the cost of automation? 💰",
          action: () => navigateTo("pricing"),
        },
        {
          textUA: "Створити схему під мій бізнес 📊",
          textEN: "Map out my business workflow 📊",
          href: telegramLink,
          primary: true,
        },
        {
          textUA: "← Назад до меню",
          textEN: "← Back to menu",
          action: () => navigateTo("welcome"),
        },
      ],
    },
    pricing: {
      titleUA: "Ціни та окупність",
      titleEN: "Rates & Returns",
      messageUA: "Інвестиція в розробку окупається за рахунок нових продажів та економії робочих годин. Орієнтовні ціни:\n\n• **Лендінг (сайт для заявок)**: від $300\n• **Автоматизація та боти**: від $150\n• **Індивідуальні системи**: від $800\n\nНапишіть мені в Telegram, і я безкоштовно проаналізую ваш бізнес та розпишу детальний кошторис за 15 хвилин!",
      messageEN: "Investing in development pays off quickly through new sales and saved working hours. General rates:\n\n• **Landing (sales page)**: from $300\n• **Automations & Bots**: from $150\n• **Custom Core Systems**: from $800\n\nMessage me on Telegram, and I will calculate the exact price for your project in 15 minutes!",
      options: [
        {
          textUA: "Отримати кошторис в Telegram 🚀",
          textEN: "Get project estimate on Telegram 🚀",
          href: telegramLink,
          primary: true,
        },
        {
          textUA: "← Назад до меню",
          textEN: "← Back to menu",
          action: () => navigateTo("welcome"),
        },
      ],
    },
  };

  const data = screensData[currentScreen];

  // Animation variants adapted dynamically for mobile bottom sheet vs desktop box
  const drawerVariants = {
    hidden: isMobile
      ? { y: "100%", opacity: 1 }
      : { y: 24, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 340, damping: 28 },
    },
    exit: isMobile
      ? { y: "100%", opacity: 1, transition: { duration: 0.25 } }
      : { y: 24, opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans print:hidden">
      {/* Dimmed background overlay - ONLY visible on mobile to focus on the assistant */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
            style={{ width: "100vw", height: "100vh", left: "-1.5rem", bottom: "-1.5rem" }}
          />
        )}
      </AnimatePresence>

      {/* Tooltip hint above the float button */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="absolute bottom-[84px] left-0 mb-2 w-56 rounded-2xl border border-white/10 bg-zinc-950/95 p-3.5 text-xs text-white/90 shadow-2xl backdrop-blur-xl"
          >
            <div className="font-semibold text-emerald-400">
              {t("Потрібна допомога? 💬", "Need assistance? 💬")}
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-white/60">
              {t(
                "Підкажу, як залучити клієнтів та автоматизувати рутину!",
                "I'll show you how to attract clients and automate routine!"
              )}
            </p>
            {/* Close button for tooltip */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="absolute right-2.5 top-2.5 text-white/40 hover:text-white"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute -bottom-1.5 left-7 h-3 w-3 rotate-45 border-b border-r border-white/10 bg-zinc-950/95" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Toggle */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`relative flex h-[72px] w-[72px] items-center justify-center rounded-full border shadow-2xl transition-all duration-300 ${
          isOpen
            ? "bg-emerald-500 text-black border-emerald-400 shadow-emerald-500/20 z-50"
            : "bg-zinc-950/90 text-emerald-400 border-white/10 hover:border-emerald-500/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.3)] z-50"
        }`}
      >
        {/* Pulsing glow ring */}
        {!isOpen && (
          <span className="absolute inset-0 -z-10 animate-pulse rounded-full bg-emerald-500/10 opacity-75 ring-4 ring-emerald-500/5" />
        )}

        {/* Dynamic chat online green pulse dot */}
        {!isOpen && (
          <span className="absolute right-1 top-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-zinc-950" />
          </span>
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Expanded Chat dialog - Responsive Bottom Sheet (Mobile) & Floating Dialog (Desktop) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 w-full max-h-[82vh] rounded-t-[32px] border-t border-white/10 bg-zinc-950/98 shadow-[0_-20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl flex flex-col z-50 sm:absolute sm:bottom-[88px] sm:left-0 sm:right-auto sm:w-[380px] sm:max-h-[580px] sm:rounded-3xl sm:border sm:border-white/10 sm:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)]"
          >
            {/* Mobile sheet drag indicator line */}
            <div className="h-1.5 w-12 rounded-full bg-white/15 mx-auto my-3 shrink-0 sm:hidden" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-5 py-4 shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-900 border border-white/10 select-none overflow-hidden">
                  <img src="/favicon.png" alt="Hella Logo" className="h-full w-full object-cover p-1.5" />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white/95 tracking-wide">
                    {lang === "ua" ? data.titleUA : data.titleEN}
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.12em] text-white/40 font-mono">
                    {t("Онлайн · Бот Hella", "Online · Hella Bot")}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-1.5 text-white/40 hover:bg-white/5 hover:text-white transition duration-150"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[220px] sm:max-h-[260px] scrollbar-thin">
              <div className="flex gap-3">
                <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 select-none overflow-hidden">
                  <img src="/favicon.png" alt="Hella" className="h-full w-full object-cover p-1" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-white/[0.04] px-4 py-3 text-xs sm:text-sm leading-relaxed text-white/85 whitespace-pre-line border border-white/5">
                  {lang === "ua" ? data.messageUA : data.messageEN}
                </div>
              </div>
            </div>

            {/* Quick action buttons list */}
            <div className="border-t border-white/5 bg-white/[0.01] p-4 space-y-2.5 max-h-[220px] sm:max-h-[190px] overflow-y-auto shrink-0 pb-6 sm:pb-4">
              {data.options.map((opt, i) => {
                const text = lang === "ua" ? opt.textUA : opt.textEN;
                const isPrimary = opt.primary;

                if (opt.href) {
                  return (
                    <a
                      key={i}
                      href={opt.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full block text-center rounded-xl py-3 sm:py-2 px-4 text-xs transition duration-200 ${
                        isPrimary
                          ? "bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-black font-bold shadow-lg shadow-emerald-500/10"
                          : "border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-white/70 hover:text-white"
                      }`}
                    >
                      {text}
                    </a>
                  );
                }

                return (
                  <button
                    key={i}
                    onClick={opt.action}
                    className="w-full text-left rounded-xl py-3 sm:py-2 px-4 text-xs border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-white/70 hover:text-white transition duration-200"
                  >
                    {text}
                  </button>
                );
              })}
            </div>

            {/* Footer notice */}
            <div className="border-t border-white/5 bg-black/60 px-5 py-2.5 text-[10px] text-center text-white/30 tracking-wide font-mono shrink-0 mb-safe">
              {t("Відповім за 15 хвилин в Telegram", "I will reply within 15 mins on Telegram")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
