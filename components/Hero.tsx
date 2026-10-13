"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/context/LangContext";
import MagneticButton from "@/components/MagneticButton";
import HeroShape from "@/components/HeroShape";

/* ===================== CONFIG ===================== */
const STICKER_CHARS = ["l", "u", "t", "i", "y"];

/* ===================== HERO MAIN ===================== */

const EASE = [0.16, 1, 0.3, 1] as const;

const TRUST = [
  { val: "10+", ua: "запущених проєктів", en: "projects shipped" },
  { val: "$150", ua: "старт ціни за сайт", en: "websites from" },
  { val: "24h", ua: "безкоштовний AI-аудит", en: "free AI audit" },
];

const SERVICES = [
  { ua: "Лендінги", en: "Landing pages" },
  { ua: "Корпоративні сайти", en: "Business websites" },
  { ua: "Веб-застосунки", en: "Web apps" },
  { ua: "CRM та n8n", en: "CRM & n8n" },
  { ua: "AI-інтеграції", en: "AI integrations" },
];

/** One headline line revealed from behind a mask, with a blur-to-sharp settle. */
function Line({ children, delay, muted }: { children: React.ReactNode; delay: number; muted?: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        initial={{ y: "105%", filter: "blur(10px)", opacity: 0 }}
        animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1.2, delay, ease: EASE }}
        className={"block " + (muted ? "text-white/35" : "text-white")}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { t } = useLang();

  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0]);
  const contentY = useTransform(scrollY, [0, 600], [0, -60]);
  const shapeY = useTransform(scrollY, [0, 700], [0, 140]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      aria-label={t("Розробка сайтів — Lutiy Digital", "Web development — Lutiy Digital")}
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-black px-5 pb-14 pt-[40svh] sm:px-8 md:items-center md:pb-16 md:pt-28 [@media(max-aspect-ratio:7/5)]:items-end [@media(max-aspect-ratio:7/5)]:pb-16 [@media(max-aspect-ratio:7/5)]:pt-[40svh]"
    >
      {/* Backdrop: faint grid + a barely-there green light source behind the shape */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, delay: 0.6 }}
          className="absolute left-1/2 top-[22%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.07] blur-[110px] md:left-[72%] md:top-1/2"
        />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--color-text-white)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-text-white)) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 70% 60% at 65% 45%, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 65% 45%, black, transparent 75%)",
          }}
        />
      </div>

      {/* Dark liquid shape (WebGL) */}
      <motion.div style={{ y: shapeY }} className="absolute inset-0 z-10">
        <HeroShape className="relative h-full w-full" />
      </motion.div>

      {/* Readability fade under copy on mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[70%] bg-gradient-to-t from-black from-50% via-black/80 to-transparent [@media(min-aspect-ratio:7/5)]:hidden"
      />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 mx-auto w-full max-w-7xl"
      >
        <div className="flex max-w-2xl flex-col items-start lg:max-w-[54rem]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            <HellaSticker />
          </motion.div>

          {/* Eyebrow with drawing rule */}
          <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-white/50 sm:text-[11px]">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: EASE }}
              className="h-px w-10 origin-left bg-white/40"
            />
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            >
              {t("Студія веб-розробки · Київ", "Web development studio · Kyiv")}
            </motion.span>
          </div>

          {/* H1 — main SEO phrase, monochrome */}
          <h1 className="mt-5 font-display text-[1.9rem] font-bold uppercase leading-[1.02] tracking-[-0.025em] sm:text-[2.9rem] md:text-[3.2rem] lg:text-[3.2rem] xl:text-[3.7rem]">
            <Line delay={0.5}>{t("Сайти та", "Websites &")}</Line>
            <Line delay={0.62}>{t("веб-застосунки,", "web apps")}</Line>
            <Line delay={0.74} muted>{t("що приносять", "that bring")}</Line>
            <Line delay={0.86} muted>{t("заявки", "you leads")}</Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: EASE }}
            className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/55 md:text-base"
          >
            {t(
              "Проєктую й розробляю сайти під ключ, кабінети клієнтів та автоматизації з CRM. Швидкі, з SEO з першого дня — щоб клієнти знаходили вас і залишали заявки.",
              "I design and build turnkey websites, client portals and CRM automations. Fast and SEO-ready from day one — so clients find you and get in touch."
            )}
          </motion.p>

          {/* Service keywords — crawlable */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            aria-label={t("Послуги", "Services")}
            className="mt-5 hidden flex-wrap items-center gap-x-3 gap-y-1 font-mono sm:flex text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-[11px]"
          >
            {SERVICES.map((s, i) => (
              <li key={s.en} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-emerald-500/60" />}
                {t(s.ua, s.en)}
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: EASE }}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <MagneticButton
              as="button"
              onClick={() => scrollTo("contact")}
              glowBorder={false}
              strength={0.25}
              data-event="click_hero_cta"
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 font-mono text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-white/90 sm:w-auto"
            >
              <span className="relative z-10">{t("Обговорити проєкт", "Discuss a project")}</span>
              <span aria-hidden className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </MagneticButton>
            <MagneticButton
              as="button"
              onClick={() => scrollTo("projects")}
              glowBorder={false}
              strength={0.25}
              data-event="click_view_cases"
              className="relative flex w-full items-center justify-center overflow-hidden rounded-full border border-white/15 px-8 py-4 font-mono text-xs uppercase tracking-widest text-white transition hover:border-white/40 sm:w-auto"
            >
              {t("Дивитися кейси", "View case studies")}
            </MagneticButton>
          </motion.div>

          {/* Trust row */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="mt-8 grid w-full max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6"
          >
            {TRUST.map((item) => (
              <div key={item.en} className="flex flex-col-reverse gap-1">
                <dt className="text-[9px] uppercase leading-snug tracking-[0.18em] text-white/40 sm:text-[10px]">{t(item.ua, item.en)}</dt>
                <dd className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">{item.val}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* Corner labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8 }}
        className="pointer-events-none absolute inset-x-8 bottom-6 z-20 hidden items-center justify-between font-mono text-[9px] uppercase tracking-[0.4em] text-white/30 md:flex"
      >
        <span>Lutiy Digital · MMXXVI</span>
        <span>{t("Гортайте", "Scroll")} ↓</span>
      </motion.div>
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
