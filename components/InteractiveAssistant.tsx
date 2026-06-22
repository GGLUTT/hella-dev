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

  // Data for chatbot screens
  const screensData = {
    welcome: {
      titleUA: "Асистент Hella",
      titleEN: "Hella Assistant",
      messageUA: "Привіт! 👋 Я ваш віртуальний провідник. Допоможу підібрати ідеальне рішення для вашого проєкту та розрахувати ціну. Що вас цікавить?",
      messageEN: "Hello! 👋 I'm your virtual guide. I'll help you select the ideal solution for your project and calculate the cost. What are you looking for?",
      options: [
        {
          textUA: "Який план або продукт обрати? 🎯",
          textEN: "Which plan or product to choose? 🎯",
          action: () => navigateTo("plans"),
        },
        {
          textUA: "Які послуги ви надаєте? 🌐",
          textEN: "What services do you provide? 🌐",
          action: () => navigateTo("services"),
        },
        {
          textUA: "Яка вартість розробки? 💰",
          textEN: "What is the development cost? 💰",
          action: () => navigateTo("pricing"),
        },
        {
          textUA: "Написати мені в Telegram ⚡",
          textEN: "Write to me on Telegram ⚡",
          href: telegramLink,
          primary: true,
        },
      ],
    },
    plans: {
      titleUA: "Оберіть свій продукт",
      titleEN: "Choose your product",
      messageUA: "Ми створюємо цифрові продукти будь-якої складності. Ось основні формати:\n\n• **Лендінг / Промо**: Швидкий старт для збору заявок.\n• **Корпоративний сайт**: Презентація послуг компанії на преміум-рівні.\n• **Платформи / SaaS**: Веб-додатки зі складним функціоналом.\n• **Автоматизація (n8n)**: Об'єднання CRM, Telegram та баз даних без рутини.",
      messageEN: "We build digital products of any complexity. Here are the main formats:\n\n• **Landing / Promo Page**: Quick launch for lead capture.\n• **Corporate Website**: Presenting services at a premium level.\n• **Platforms / SaaS**: Web apps with complex functionalities.\n• **n8n Automations**: Connecting CRM, Telegram, and databases.",
      options: [
        {
          textUA: "Які ціни на розробку? 💰",
          textEN: "What are the rates? 💰",
          action: () => navigateTo("pricing"),
        },
        {
          textUA: "Обговорити ідею в Telegram 💬",
          textEN: "Discuss my idea on Telegram 💬",
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
      titleUA: "Наші послуги",
      titleEN: "Our Services",
      messageUA: "Ми закриваємо повний цикл розробки:\n\n🌐 **Фулстек-розробка** (React, Next.js, Node.js)\n🤖 **n8n-автоматизація** (інтеграції CRM, авто-воронки)\n⚡ **SEO-оптимізація** під ключові запити (Київ, Біла Церква)\n🎨 **Преміальний UX/UI** (сучасний кібер-стиль)",
      messageEN: "We cover the full product development lifecycle:\n\n🌐 **Fullstack Development** (React, Next.js, Node.js)\n🤖 **n8n Automation** (CRM integrations, auto-funnels)\n⚡ **SEO Optimization** for keywords (Kyiv, Bila Tserkva)\n🎨 **Premium UX/UI** (modern cyber dark aesthetics)",
      options: [
        {
          textUA: "Скільки це коштує? 💰",
          textEN: "How much does it cost? 💰",
          action: () => navigateTo("pricing"),
        },
        {
          textUA: "Отримати безкоштовний аудит 📊",
          textEN: "Get a free audit 📊",
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
      titleUA: "Вартість розробки",
      titleEN: "Development Pricing",
      messageUA: "Вартість залежить від обсягу та складності. Орієнтовні ціни:\n\n• **Лендінг / Промо**: від $300\n• **Автоматизація (n8n)**: від $150\n• **Складні системи**: від $800\n\nНапишіть мені в Telegram, і я розрахую точну вартість вашого проєкту за 15 хвилин!",
      messageEN: "Pricing depends on scope and complexity. General starting rates:\n\n• **Landing / Promo Page**: from $300\n• **n8n Automation**: from $150\n• **Complex Systems**: from $800\n\nMessage me on Telegram, and I will calculate the exact price for your project in 15 minutes!",
      options: [
        {
          textUA: "Розрахувати вартість в Telegram 🚀",
          textEN: "Calculate cost on Telegram 🚀",
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

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans print:hidden">
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
                "Запитайте мене про послуги та ціни, відповім за 15 хв!",
                "Ask me about services and pricing, I'll reply in 15 min!"
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

      {/* Floating Button Toggle - Enlarged and Improved */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`relative flex h-[72px] w-[72px] items-center justify-center rounded-full border shadow-2xl transition-all duration-300 ${
          isOpen
            ? "bg-emerald-500 text-black border-emerald-400 shadow-emerald-500/20"
            : "bg-zinc-950/90 text-emerald-400 border-white/10 hover:border-emerald-500/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.3)]"
        }`}
      >
        {/* Pulsing glow ring */}
        {!isOpen && (
          <span className="absolute inset-0 -z-10 animate-pulse rounded-full bg-emerald-500/10 opacity-75 ring-4 ring-emerald-500/5" />
        )}

        {/* Dynamic chat online green pulse dot on the button */}
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

      {/* Expanded Chat Dialog Drawer - Fixed positioning issue */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="absolute bottom-[88px] left-0 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/95 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-5 py-4">
              <div className="flex items-center gap-3.5">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-sky-400 font-mono text-sm font-bold text-black select-none">
                  YL
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
            <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[290px] scrollbar-thin">
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold select-none border border-emerald-500/10">
                  H
                </div>
                <div className="rounded-2xl rounded-tl-none bg-white/[0.04] px-4 py-3 text-xs sm:text-sm leading-relaxed text-white/85 whitespace-pre-line border border-white/5">
                  {lang === "ua" ? data.messageUA : data.messageEN}
                </div>
              </div>
            </div>

            {/* Quick action buttons list */}
            <div className="border-t border-white/5 bg-white/[0.01] p-4 space-y-2.5 max-h-[170px] overflow-y-auto">
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
                      className={`w-full block text-center rounded-xl px-4 py-2.5 text-xs transition duration-200 ${
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
                    className="w-full text-left rounded-xl px-4 py-2.5 text-xs border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] text-white/70 hover:text-white transition duration-200"
                  >
                    {text}
                  </button>
                );
              })}
            </div>

            {/* Footer notice */}
            <div className="border-t border-white/5 bg-black/60 px-5 py-2.5 text-[10px] text-center text-white/30 tracking-wide font-mono">
              {t("Відповім за 15 хвилин в Telegram", "I will reply within 15 mins on Telegram")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
