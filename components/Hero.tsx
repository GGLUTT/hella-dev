"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { useTheme } from "@/context/ThemeContext";
import MagneticButton from "@/components/MagneticButton";
import HeroShape from "@/components/HeroShape";

/* ===================== CONFIG ===================== */
const STICKER_CHARS = ["l", "u", "t", "i", "y"];

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: [0, 0.45, 0.15, 0.9, 0.6, 1], // hologram boot-up flicker
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const eyebrowContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.65,
    },
  },
};

/* ===================== HERO MAIN ===================== */

const TRUST = [
  { val: "10+", ua: "проєктів", en: "projects" },
  { val: "$150", ua: "сайт від", en: "sites from" },
  { val: "48h", ua: "старт роботи", en: "kick-off" },
  { val: "24h", ua: "AI-аудит", en: "AI audit" },
];

const SERVICES = [
  { ua: "Лендінги", en: "Landing pages" },
  { ua: "Корпоративні сайти", en: "Business websites" },
  { ua: "Веб-застосунки", en: "Web apps" },
  { ua: "CRM та n8n-автоматизація", en: "CRM & n8n automation" },
  { ua: "AI-інтеграції", en: "AI integrations" },
];

export default function Hero() {
  const { t } = useLang();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0]);
  const contentY = useTransform(scrollY, [0, 600], [0, -60]);
  const shapeY = useTransform(scrollY, [0, 700], [0, 120]);
  const shapeScale = useTransform(scrollY, [0, 700], [1, 0.9]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const headline = t(
    "Сайти та веб-застосунки, що приводять клієнтів",
    "Websites & web apps that bring you clients"
  );
  const words = headline.split(" ");
  // last two words get the iridescent accent
  const accentFrom = words.length - 2;

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label={t("Розробка сайтів — Lutiy Digital", "Web development — Lutiy Digital")}
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-black px-5 pb-16 pt-28 sm:px-8 md:items-center md:pb-24 md:pt-32"
    >
      {/* Ambient backdrop — static, GPU-cheap */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-[-10%] top-[5%] h-[60vmin] w-[60vmin] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[50vmin] w-[50vmin] rounded-full bg-sky-500/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--color-text-white)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-text-white)) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 70% at 60% 45%, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 60% 45%, black, transparent 75%)",
          }}
        />
      </div>

      {/* Iridescent WebGL shape */}
      <motion.div
        style={{ y: shapeY, scale: shapeScale }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute inset-0 z-10"
      >
        <HeroShape theme={theme} className="relative h-full w-full" />
      </motion.div>

      {/* Readability fade under copy on mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[65%] bg-gradient-to-t from-black via-black/80 to-transparent md:hidden"
      />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 mx-auto w-full max-w-7xl"
      >
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="flex max-w-2xl flex-col items-start lg:max-w-[44rem] xl:max-w-[50rem]"
        >
          <motion.div variants={itemVariants}>
            <HellaSticker />
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            variants={eyebrowContainerVariants}
            className="mt-6 flex flex-wrap items-center font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-500 sm:text-[11px]"
          >
            {t(
              "Веб-розробка · Автоматизація · AI",
              "Web development · Automation · AI"
            )
              .split(" ")
              .map((w, i) => (
                <motion.span key={i} variants={charVariants} className="mr-2 inline-block">
                  {w}
                </motion.span>
              ))}
          </motion.p>

          {/* H1 — primary SEO keywords */}
          <h1 className="mt-4 font-display text-[2rem] font-bold uppercase leading-[1.06] tracking-[-0.02em] text-white sm:text-[2.8rem] md:text-[3rem] lg:text-[3.3rem] xl:text-[3.9rem]">
            {words.map((word, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.95, delay: 0.35 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    "inline-block " +
                    (i >= accentFrom
                      ? "bg-[linear-gradient(100deg,#10b981,#38bdf8_45%,#a78bfa_75%,#f59e0b)] bg-clip-text text-transparent"
                      : "")
                  }
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-zinc-400 sm:text-base md:text-lg"
          >
            {t(
              "Розробляю сайти під ключ, кабінети клієнтів, інтеграції з CRM і автоматизації на n8n. Швидко, з SEO з першого дня і без ручної рутини — ви отримуєте заявки, а не просто красиву сторінку.",
              "I build turnkey websites, client portals, CRM integrations and n8n automations. Fast, SEO-ready from day one and free of manual routine — you get leads, not just a pretty page."
            )}
          </motion.p>

          {/* Service keywords — crawlable list */}
          <motion.ul
            variants={itemVariants}
            aria-label={t("Послуги", "Services")}
            className="mt-6 flex flex-wrap gap-2"
          >
            {SERVICES.map((s) => (
              <li
                key={s.en}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-zinc-300 backdrop-blur-sm sm:text-xs"
              >
                {t(s.ua, s.en)}
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <MagneticButton
              as="button"
              onClick={() => scrollTo("contact")}
              glowBorder={false}
              strength={0.25}
              data-event="click_hero_cta"
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 font-mono text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-white/90 sm:w-auto"
            >
              <span className="relative z-10">{t("Безкоштовна консультація", "Free consultation")}</span>
              <span aria-hidden className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </MagneticButton>
            <MagneticButton
              as="button"
              onClick={() => scrollTo("projects")}
              glowBorder={false}
              strength={0.25}
              data-event="click_view_cases"
              className="relative flex w-full items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 font-mono text-xs uppercase tracking-widest text-white backdrop-blur-sm transition hover:border-white/30 sm:w-auto"
            >
              {t("Подивитися кейси", "View case studies")}
            </MagneticButton>
          </motion.div>

          {/* Trust row */}
          <motion.dl
            variants={itemVariants}
            className="mt-10 grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-6 sm:grid-cols-4"
          >
            {TRUST.map((item) => (
              <div key={item.en} className="flex flex-col-reverse">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">{t(item.ua, item.en)}</dt>
                <dd className="text-lg font-semibold tracking-tight text-white">{item.val}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>

      {/* Corner labels */}
      <div className="pointer-events-none absolute inset-x-8 bottom-6 z-20 hidden items-center justify-between font-mono text-[9px] uppercase tracking-[0.4em] text-white/35 md:flex">
        <span>Lutiy Digital · MMXXVI</span>
        <span>Kyiv / Remote</span>
      </div>
    </section>
  );
}

/* ===================== HELLA STICKER ===================== */

function HellaSticker() {
  const { t } = useLang();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const tTimer = setTimeout(() => setRevealed(true), 900);
    return () => clearTimeout(tTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -14, y: 8 }}
      animate={{ opacity: 1, scale: 1, rotate: -5, y: 0 }}
      whileHover={{ scale: 1.05, rotate: -2, y: -2 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 18,
        delay: 0.6 
      }}
      className="inline-block relative group cursor-pointer"
      style={{ perspective: 600 }}
    >
      {/* Dynamic rotating conic border container */}
      <div className="relative p-[1.5px] rounded-xl overflow-hidden bg-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {/* Animated conic gradient border background */}
        <motion.div
          className="absolute -inset-[200%] bg-[conic-gradient(from_0deg,transparent_40%,#10b981_50%,transparent_60%)] opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner pill container */}
        <div className="relative flex items-center gap-2 rounded-[10px] bg-zinc-950/95 px-4 py-2 backdrop-blur-md overflow-hidden">
          {/* Futuristic laser scanner sweep */}
          <motion.div
            className="absolute inset-y-0 w-[20px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent pointer-events-none z-10"
            initial={{ left: "-20%" }}
            animate={{ left: "120%" }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 3.5,
              ease: "easeInOut",
            }}
          />

          {/* Glowing dot status */}
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
              animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>

          {/* Char-by-char brand reveal */}
          <span className="flex font-display text-[14px] font-bold tracking-[0.2em] text-white">
            {STICKER_CHARS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                animate={revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
              >
                {char}
              </motion.span>
            ))}
          </span>

          {/* Slash + Digital mention */}
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={revealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <span className="h-3 w-px bg-white/15" />
            <span className="font-mono text-[9px] tracking-widest text-emerald-400 font-bold uppercase">
              {t("діджитал", "digital")}
            </span>
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
