"use client";

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
    { word: "Будую",             accent: false },
    { word: "швидкі",            accent: true  },
    { word: "веб-застосунки", accent: false },
    { word: "і",                accent: false },
    { word: "автоматизую",     accent: true  },
    { word: "бізнес-процеси.", accent: false },
  ];

  const HEADLINE_EN = [
    { word: "Building",  accent: false },
    { word: "fast",      accent: true  },
    { word: "web apps",  accent: false },
    { word: "and",       accent: false },
    { word: "automating", accent: true },
    { word: "workflows.", accent: false },
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

      {/* ============ Main grid ============ */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-end gap-12 px-6 pt-28 md:pt-36 lg:grid-cols-12 lg:gap-12 lg:pt-0">
        {/* Left: Copy — same height as character, content vertically centered */}
        <div className="z-10 flex flex-col justify-center pb-20 lg:col-span-6 lg:h-[88vh] lg:min-h-[680px] lg:pb-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerStagger}
          >
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/45"
            >
              <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent to-white/50" />
              {t("Про мене", "About")}
            </motion.div>

            {/* Headline with word-by-word stagger */}
            <h2 className="flex flex-wrap text-[34px] font-semibold leading-[1.08] tracking-tight sm:text-[40px] md:text-5xl lg:text-[44px] xl:text-[54px]">
              {HEADLINE.map((w, i) => (
                <span
                  key={i}
                  className="mr-[0.25em] inline-flex overflow-hidden pb-[0.14em]"
                >
                  <motion.span
                    variants={wordReveal}
                    className={
                      "inline-block " +
                      (w.accent
                        ? "bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent"
                        : "")
                    }
                  >
                    {w.word}
                  </motion.span>
                </span>
              ))}
            </h2>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-base leading-relaxed text-white/60 md:text-lg"
            >
              {t(
                "Привіт, я Євгеній — засновник digital-агенції Hella. Наша веб-студія та агенція розробки пропонує професійне створення та розробку сайтів і програм у Києві, Білій Церкві та області. Створюю цифрові рішення з фокусом на продуктивність, чистий код та вимірювані бізнес-результати: від фулстек-платформ до сценаріїв автоматизації n8n.",
                "Hi, I'm Yevhenii — founder of Hella dev agency. Our web studio and development agency offers professional creation and development of websites and programs in Kyiv, Bila Tserkva, and the region. I build digital solutions focused on performance, clean code, and business results: from fullstack platforms to n8n automation scenarios."
              )}
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={s.labelUA}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-3xl font-semibold tracking-tight text-transparent md:text-4xl">
                    <CountUp
                      from={0}
                      to={s.to}
                      duration={1.8}
                      delay={0.5 + i * 0.15}
                      className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent"
                    />
                    <span>{s.suffix}</span>
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/45 sm:text-[10px] sm:tracking-[0.25em]">
                    {t(s.labelUA, s.labelEN)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right: character pinned to section bottom, equal height to text column */}
        <div className="relative self-end lg:col-span-6">
          <CharacterStage />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stack.map((s, i) => (
            <div key={s.name} className={s.span}>
              <Reveal delay={0.05 + i * 0.06}>
                <div className={`group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${s.glow}`}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Character video (full-bleed, large) ============ */

function CharacterStage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.82, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.8 },
      }}
      className="relative h-[60vh] min-h-[420px] w-full sm:h-[70vh] sm:min-h-[520px] lg:h-[88vh]"
      style={{ transformOrigin: "50% 100%" }}
    >
      {/* Aurora glow behind character */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 55% 55%, rgba(16,185,129,0.22), transparent 65%), radial-gradient(ellipse 50% 40% at 35% 30%, rgba(56,189,248,0.16), transparent 60%)",
          filter: "blur(20px)",
        }}
      />

      {/* Soft floor glow under torso cutoff */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-1/3"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(16,185,129,0.20), transparent 75%)",
        }}
      />
      {/* Subtle grid only behind character on mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] md:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 60%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 60%, black, transparent 75%)",
        }}
      />

      {/* The character video — pinned to the bottom edge with subtle idle float */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-10"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="h-full w-full select-none object-contain object-bottom drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
        >
          <source src="/character-action.webm" type="video/webm" />
          <source src="/character-action.mov" type="video/quicktime" />
        </video>
      </motion.div>

      {/* Bottom fade so the torso cut blends into the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-32 bg-gradient-to-b from-transparent via-black/60 to-black"
      />

      {/* Floating status chip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-3 top-3 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md md:right-8 md:top-10"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/80">
          available for work
        </span>
      </motion.div>

      {/* Floating signature card (bottom-left, sits on the fade) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-4 left-3 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/55 px-3 py-2.5 backdrop-blur-xl sm:px-4 sm:py-3 md:bottom-10 md:left-8"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-sky-400 font-mono text-base font-bold text-black">
          YL
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight">
            Yevhenii — Hella
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/55">
            Fullstack Developer
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
