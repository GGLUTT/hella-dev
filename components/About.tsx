"use client";

import { motion, type Variants } from "framer-motion";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import { useLang } from "@/context/LangContext";

const STACK_UA = [
  { name: "React",      desc: "Інтерфейси з акцентом на швидкість і UX." },
  { name: "TypeScript", desc: "Надійний код, передбачуваний рефакторинг." },
  { name: "Node.js",    desc: "API, інтеграції, реальний час." },
  { name: "PostgreSQL", desc: "Структура даних і продуктивні запити." },
];

const STACK_EN = [
  { name: "React",      desc: "Interfaces focused on speed and UX." },
  { name: "TypeScript", desc: "Reliable code, predictable refactoring." },
  { name: "Node.js",    desc: "APIs, integrations, real-time." },
  { name: "PostgreSQL", desc: "Data structure and performant queries." },
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

  const stack = lang === "ua" ? STACK_UA : STACK_EN;

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
                "Привіт, я Євгеній — Hella. Працюю з продуктами, де важливі продуктивність, чистий код і вимірюваний результат: від лендінгів до фулстек-платформ і робочих процесів n8n.",
                "Hi, I'm Yevhenii — Hella. I build products where performance, clean code, and measurable results matter: from landing pages to fullstack platforms and n8n workflows."
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((s, i) => (
            <Reveal key={s.name} delay={0.05 + i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]">
                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="text-2xl font-semibold tracking-tight">
                  {s.name}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
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
