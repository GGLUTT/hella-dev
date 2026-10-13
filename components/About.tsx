"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import { useLang } from "@/context/LangContext";

const STACK_ITEMS = [
  {
    name: "React",
    descUA: "Інтерфейси з акцентом на швидкість і UX.",
    descEN: "Interfaces focused on speed and UX.",
    glow: "group-hover:border-cyan-500/30 group-hover:bg-cyan-500/[0.015]",
    sheen: "via-cyan-400/40",
    span: "col-span-1 sm:col-span-2",
    icon: (
      <svg className="w-8 h-8 text-[#61DAFB] transition duration-300 group-hover:scale-110" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="50" cy="50" rx="8" ry="20" />
        <ellipse cx="50" cy="50" rx="8" ry="20" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="8" ry="20" transform="rotate(120 50 50)" />
        <circle cx="50" cy="50" r="2" fill="currentColor" />
      </svg>
    )
  },
  {
    name: "TypeScript",
    descUA: "Надійний код, передбачуваний рефакторинг.",
    descEN: "Reliable code, predictable refactoring.",
    glow: "group-hover:border-blue-500/30 group-hover:bg-blue-500/[0.015]",
    sheen: "via-blue-400/40",
    span: "col-span-1",
    icon: (
      <svg className="w-8 h-8 text-[#3178C6] transition duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" stroke="none" />
        <text x="12" y="15.5" fill="#000" fontFamily="system-ui, sans-serif" fontWeight="bold" fontSize="9" textAnchor="middle">TS</text>
      </svg>
    )
  },
  {
    name: "Node.js",
    descUA: "API, інтеграції, реальний час.",
    descEN: "APIs, integrations, real-time.",
    glow: "group-hover:border-green-500/30 group-hover:bg-green-500/[0.015]",
    sheen: "via-green-400/40",
    span: "col-span-1",
    icon: (
      <svg className="w-8 h-8 text-[#339933] transition duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L4.5 6.3v8.6L12 19.3l7.5-4.4V6.3L12 2z" />
        <path d="M12 2v17.3" />
        <path d="M12 6.5l4.5 2.6" />
        <path d="M12 11.5l-4.5-2.6" />
      </svg>
    )
  },
  {
    name: "PostgreSQL",
    descUA: "Структура даних і продуктивні запити.",
    descEN: "Data structure and performant queries.",
    glow: "group-hover:border-indigo-500/30 group-hover:bg-indigo-500/[0.015]",
    sheen: "via-indigo-400/40",
    span: "col-span-1",
    icon: (
      <svg className="w-8 h-8 text-[#4169E1] transition duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="8" ry="2.5" />
        <path d="M4 5v6c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5V5" />
        <path d="M4 11v6c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5v-6" />
      </svg>
    )
  },
  {
    name: "n8n Automation",
    descUA: "Автоматизація процесів, сценарії, CRM-інтеграції.",
    descEN: "Process automation, scenarios, CRM integrations.",
    glow: "group-hover:border-rose-500/30 group-hover:bg-rose-500/[0.015]",
    sheen: "via-rose-400/40",
    span: "col-span-1 sm:col-span-2",
    icon: (
      <svg className="w-8 h-8 text-[#FF6D5A] transition duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 12h3M15 8l-3 4 3 4" />
      </svg>
    )
  },
  {
    name: "HTML5",
    descUA: "Валідна семантика, SEO-оптимізована структура.",
    descEN: "Valid semantics, SEO-optimized structure.",
    glow: "group-hover:border-orange-500/30 group-hover:bg-orange-500/[0.015]",
    sheen: "via-orange-400/40",
    span: "col-span-1 lg:col-span-2",
    icon: (
      <svg className="w-8 h-8 text-[#E34F26] transition duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 6L2 12L8 18" />
        <path d="M16 6L22 12L16 18" />
        <path d="M14 4L10 20" />
      </svg>
    )
  },
  {
    name: "CSS3",
    descUA: "Сучасні макети, Flexbox, Grid, адаптивність.",
    descEN: "Modern layouts, Flexbox, Grid, responsiveness.",
    glow: "group-hover:border-blue-400/30 group-hover:bg-blue-400/[0.015]",
    sheen: "via-blue-300/40",
    span: "col-span-1 lg:col-span-2",
    icon: (
      <svg className="w-8 h-8 text-[#1572B6] transition duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19" />
        <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
        <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
        <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    name: "SCSS",
    descUA: "Модульні стилі, змінні, вкладеність, Sass.",
    descEN: "Modular styles, variables, nesting, Sass.",
    glow: "group-hover:border-pink-500/30 group-hover:bg-pink-500/[0.015]",
    sheen: "via-pink-400/40",
    span: "col-span-1",
    icon: (
      <svg className="w-8 h-8 text-[#CC6699] transition duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 6a6 6 0 1 0 6 6" />
        <path d="M12 10a2 2 0 1 0 2 2" />
      </svg>
    )
  }
];

const STATS = [
  { to: 3,   suffix: "+", labelUA: "років досвіду",       labelEN: "years exp."     },
  { to: 25,  suffix: "+", labelUA: "запущених проєктів",  labelEN: "projects shipped" },
  { to: 100, suffix: "%", labelUA: "фокус на результат",   labelEN: "results focus"   },
];

const containerStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const wordReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const { lang, t } = useLang();

  const stack = STACK_ITEMS.map((item) => ({
    name: item.name,
    desc: lang === "ua" ? item.descUA : item.descEN,
    glow: item.glow,
    sheen: item.sheen,
    icon: item.icon,
    span: item.span,
  }));

  const HEADLINE_UA = [
    { word: "Lutiy",             accent: false },
    { word: "Digital",           accent: false },
    { word: "—",                 accent: false },
    { word: "персональна",       accent: true  },
    { word: "dev-студія",        accent: true  },
    { word: "Євгенія",           accent: false },
    { word: "Лютого",            accent: false },
  ];

  const HEADLINE_EN = [
    { word: "Lutiy",             accent: false },
    { word: "Digital",           accent: false },
    { word: "—",                 accent: false },
    { word: "personal",          accent: true  },
    { word: "dev",               accent: true  },
    { word: "studio",            accent: true  },
    { word: "of",                accent: false },
    { word: "Yevhenii",          accent: false },
    { word: "Liutyi",            accent: false },
  ];

  const HEADLINE = lang === "ua" ? HEADLINE_UA : HEADLINE_EN;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black"
    >
      {/* ============ Backdrop layers ============ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-[110px] md:-left-40 md:h-[560px] md:w-[560px] md:blur-[160px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[300px] w-[300px] rounded-full bg-sky-500/10 blur-[110px] md:-right-40 md:h-[520px] md:w-[520px] md:blur-[160px]"
      />

      {/* Decorative chain background asset for lower sections (Why work with me & Stack) */}
      <motion.div
        initial={{ y: 0, rotate: -25 }}
        animate={{
          y: [-15, 15, -15],
          rotate: [-25, -23, -25],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden
        className="pointer-events-none absolute -left-36 bottom-[5%] w-[380px] sm:w-[580px] md:w-[850px] opacity-[0.14] z-0 select-none"
      >
        <img
          src="/vis.png"
          alt=""
          className="w-full h-auto object-contain pointer-events-none"
        />
      </motion.div>

      {/* ============ Intro over photo ============ */}
      <div className="relative isolate flex min-h-[100svh] items-end overflow-hidden lg:min-h-[92vh] lg:items-center">
        {/* Photo backdrop with slow Ken-Burns drift */}
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-0 -z-10 h-[64svh] sm:h-[70svh] lg:inset-y-0 lg:h-auto"
        >
          <Image
            src="/about-yevhenii.webp"
            alt={t(
              "Євгеній Лютий — fullstack-розробник, засновник Lutiy Digital",
              "Yevhenii Liutyi — fullstack developer, founder of Lutiy Digital"
            )}
            fill
            sizes="100vw"
            quality={80}
            className="object-cover object-[52%_25%] lg:object-[0%_center] 2xl:object-[20%_center]"
          />
        </motion.div>

        {/* Contrast layers — photo is dark in both themes, so overlays are fixed-colour */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050507] from-40% via-[#050507]/80 via-55% to-[#050507]/0 lg:bg-gradient-to-r lg:from-[#050507] lg:via-[#050507]/75 lg:via-40% lg:to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-b from-transparent to-black" />
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-t from-transparent to-black" />

        {/* Floating chips */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="absolute right-4 top-24 z-10 flex items-center gap-2 rounded-full border border-neutral-50/15 bg-[#050507]/50 px-3 py-1.5 backdrop-blur-md md:right-10 md:top-28"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-100">
            {t("Приймаю проєкти", "Available for work")}
          </span>
        </motion.div>

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-[50svh] lg:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={containerStagger}
            className="max-w-xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-neutral-400"
            >
              <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent to-neutral-400" />
              {t("Про мене", "About")}
            </motion.div>

            <h2 className="flex flex-wrap font-display text-[26px] font-bold uppercase leading-[1.08] tracking-tight text-neutral-50 sm:text-[40px] md:text-[44px] xl:text-[50px]">
              {HEADLINE.map((w, i) => (
                <span key={i} className="mr-[0.25em] inline-flex overflow-hidden pb-[0.12em]">
                  <motion.span
                    variants={wordReveal}
                    className={
                      "inline-block " +
                      (w.accent
                        ? "bg-[linear-gradient(100deg,#6ee7b7,#7dd3fc_55%,#c4b5fd)] bg-clip-text text-transparent"
                        : "")
                    }
                  >
                    {w.word}
                  </motion.span>
                </span>
              ))}
            </h2>

            <motion.div
              variants={fadeUp}
              className="mt-7 space-y-4 text-[15px] leading-relaxed text-neutral-300 md:text-lg"
            >
              <p>
                {t(
                  "Я допомагаю бізнесам запускати швидкі сайти, веб-застосунки, кабінети клієнтів, інтеграції з CRM та автоматизації. Працюю напряму: занурююсь у задачу, пропоную рішення, розробляю frontend, backend та інтеграції й доводжу проєкт до запуску.",
                  "I help businesses launch fast websites, web apps, client portals, CRM integrations and automations. I work directly with you: dive into the task, propose a solution, build frontend, backend and integrations, and take the project to launch."
                )}
              </p>
              <p className="text-neutral-400">
                {t(
                  "Мій фокус — не просто код, а рішення, що приносить заявки, пришвидшує обробку клієнтів і прибирає ручну роботу.",
                  "My focus isn't just code — it's a solution that brings leads, speeds up client handling and removes manual work."
                )}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 grid grid-cols-3 gap-6 border-t border-neutral-50/15 pt-7"
            >
              {STATS.map((s, i) => (
                <div key={s.labelUA}>
                  <div className="text-3xl font-semibold tracking-tight text-neutral-50 md:text-4xl">
                    <CountUp from={0} to={s.to} duration={1.8} delay={0.5 + i * 0.15} />
                    <span>{s.suffix}</span>
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-neutral-400 sm:text-[10px] sm:tracking-[0.25em]">
                    {t(s.labelUA, s.labelEN)}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.a
              variants={fadeUp}
              href="#contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-neutral-50/20 bg-neutral-50/[0.06] px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-neutral-50 backdrop-blur-md transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
            >
              {t("Обговорити ваш проєкт", "Discuss your project")}
              <span aria-hidden>→</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ============ Why Choose Me block ============ */}
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/45">
              <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent to-white/50" />
              {t("Чому працювати зі мною", "Why work with me")}
            </div>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <Reveal delay={0.05} className="h-full">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.01] p-6 backdrop-blur-none md:backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/[0.03]">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <div>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-emerald-300 ring-1 ring-white/10 transition group-hover:bg-emerald-300/10 group-hover:text-emerald-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-white transition group-hover:text-emerald-300">
                  {t("Працюєте напряму з розробником", "Work directly with developer")}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-white/50 transition group-hover:text-white/60">
                  {t(
                    "Без зайвих менеджерів і втрати контексту. Я сам розумію задачу, пропоную рішення, пишу код і відповідаю за реалізацію.",
                    "No middle managers or lost context. I understand the task, propose solutions, write the code, and own the execution."
                  )}
                </p>
              </div>
            </div>
          </Reveal>
          {/* Card 2 */}
          <Reveal delay={0.1} className="h-full">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.01] p-6 backdrop-blur-none md:backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/[0.03]">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <div>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-emerald-300 ring-1 ring-white/10 transition group-hover:bg-emerald-300/10 group-hover:text-emerald-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-white transition group-hover:text-emerald-300">
                  {t("Fullstack-підхід", "Fullstack approach")}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-white/50 transition group-hover:text-white/60">
                  {t(
                    "Можу закрити frontend, backend, базу даних, інтеграції, автоматизацію, деплой і базову підтримку після запуску.",
                    "I cover frontend, backend, databases, integrations, workflow automation, deployment, and post-launch support."
                  )}
                </p>
              </div>
            </div>
          </Reveal>
          {/* Card 3 */}
          <Reveal delay={0.15} className="h-full">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.01] p-6 backdrop-blur-none md:backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/[0.03]">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <div>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-emerald-300 ring-1 ring-white/10 transition group-hover:bg-emerald-300/10 group-hover:text-emerald-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-white transition group-hover:text-emerald-300">
                  {t("Фокус на бізнес-процесах", "Focus on business processes")}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-white/50 transition group-hover:text-white/60">
                  {t(
                    "Дивлюсь не тільки на сайт, а на весь шлях заявки: форма, CRM, Telegram, Google Sheets, email, сповіщення, follow-up і аналітика.",
                    "I look beyond the website to the entire lead journey: forms, CRM, Telegram alerts, Google Sheets, emails, follow-ups, and analytics."
                  )}
                </p>
              </div>
            </div>
          </Reveal>
          {/* Card 4 */}
          <Reveal delay={0.2} className="h-full">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.01] p-6 backdrop-blur-none md:backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/30 hover:bg-white/[0.03]">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <div>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03] text-emerald-300 ring-1 ring-white/10 transition group-hover:bg-emerald-300/10 group-hover:text-emerald-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-white transition group-hover:text-emerald-300">
                  {t("Гнучкість маленької студії", "Boutique studio flexibility")}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-white/50 transition group-hover:text-white/60">
                  {t(
                    "Швидко приймаю рішення, адаптуюсь під задачу й не додаю зайвої бюрократії. Це зручно для малого й середнього бізнесу, якому потрібен результат без довгих процесів.",
                    "Fast decision-making, adaptive workflows, and zero bureaucracy. Perfect for small and medium businesses needing quick results without overhead."
                  )}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ============ Stack grid ============ */}
      <div className="relative mx-auto max-w-7xl px-6 pb-32">
        {/* Subtle separator that ties this block to the hero above */}
        <div className="mx-auto mb-16 h-px max-w-md bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="mb-10 flex items-end justify-between gap-6">
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/45">
              <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent to-white/50" />
              {t("Стек", "Stack")}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="hidden max-w-md text-sm text-white/45 sm:block">
              {t("Інструменти, в яких працюю щоденно— від інтерфейсу до бази даних.", "Tools I use daily — from interface to database.")}
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 grid-flow-row-dense">
          {stack.map((s, i) => (
            <Reveal key={s.name} delay={0.05 + i * 0.06} className={`${s.span} h-full`}>
              <div className={`group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-none md:backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${s.glow}`}>
                <div className={`pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent ${s.sheen} to-transparent opacity-0 transition duration-500 group-hover:opacity-100`} />
                <div className="mb-4 flex items-center justify-between">
                  {s.icon}
                  <span className="font-mono text-[10px] text-white/20 select-none">
                    //{(i + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                <div className="text-xl font-semibold tracking-tight text-white transition duration-300">
                  {s.name}
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/55 group-hover:text-white/70 transition duration-300">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
