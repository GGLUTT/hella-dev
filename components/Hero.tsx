"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { useLoaderDone } from "@/components/SiteLoader";
import { scrollToId } from "@/components/SmoothScroll";

const EASE = [0.16, 1, 0.3, 1] as const;

const SHOWCASE = [
  { src: "/agency.jpg", name: "Kronos Agency" },
  { src: "/fitnes1.jpg", name: "Apex Fitness" },
  { src: "/nexus.png", name: "3D Nexus" },
  { src: "/budle1.png", name: "Budle" },
];

const AVATARS = ["/fitnes1.jpg", "/nexus.png", "/budle1.png", "/agency.jpg"];

/* ===================== HERO ===================== */

export default function Hero() {
  const { t } = useLang();
  const ready = useLoaderDone();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, delay, ease: EASE },
  });

  // Giant type: each word slides out of its own mask.
  const lines: { word: string; outline?: boolean }[][] = [
    [{ word: t("Сайти.", "Sites.") }, { word: "Apps." }],
    [{ word: "AI." }, { word: "CRM.", outline: true }, { word: "SEO.", outline: true }],
  ];
  let wordIndex = 0;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-black px-5 pb-8 pt-24 sm:px-8 md:pb-10 md:pt-28 lg:px-12"
    >
      {/* Soft emerald bloom — transform-only animation, no repaints */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[8%] h-[70vmin] w-[70vmin] rounded-full opacity-70 blur-[120px] [animation:hero-glow-drift_18s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.22), transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--color-text-white)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-text-white)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      {/* Meta row */}
      <motion.div
        {...anim(0.05)}
        className="relative z-10 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45 sm:text-[11px]"
      >
        <span className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          {t("Приймаємо нові проєкти", "Taking new projects")}
        </span>
        <span className="hidden md:inline">{t("Студія веб-розробки · Київ / Remote", "Web studio · Kyiv / Remote")}</span>
      </motion.div>

      {/* Phones: the work preview fills the space above the headline */}
      <Showcase ready={ready} mobile />

      {/* Giant headline */}
      <motion.div style={{ y: titleY }} className="relative z-10 mt-auto pt-10 md:pt-0">
        <h1
          className="relative font-semibold uppercase leading-[0.86] text-white"
          style={{
            fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
            fontSize: "clamp(3.3rem, 11.2vw, 13rem)",
            letterSpacing: "-0.055em",
          }}
        >
          <span className="sr-only">
            {t(
              "Розробка сайтів, веб-застосунків, AI-інтеграцій, CRM та SEO — Lutiy Digital",
              "Website, web app, AI, CRM and SEO development — Lutiy Digital"
            )}
          </span>
          {lines.map((line, li) => (
            <span key={li} aria-hidden className="relative flex flex-wrap items-start gap-x-[0.22em]">
              {line.map(({ word, outline }) => {
                const i = wordIndex++;
                return (
                  <span key={word} className="-mt-[0.14em] inline-block overflow-hidden pb-[0.04em] pr-[0.04em] pt-[0.14em]">
                    <motion.span
                      initial={{ y: "108%" }}
                      animate={ready ? { y: "0%" } : undefined}
                      transition={{ duration: 1.25, delay: 0.1 + i * 0.09, ease: EASE }}
                      className={"inline-block " + (outline ? "text-outline" : "")}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
              {li === 0 && <Showcase ready={ready} />}
            </span>
          ))}
        </h1>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:items-end"
      >
        {/* Trust */}
        <motion.div {...anim(0.7)} className="order-2 flex items-center gap-4 md:order-1">
          <div className="flex -space-x-3">
            {AVATARS.map((src) => (
              <span
                key={src}
                className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-black bg-zinc-900 sm:h-12 sm:w-12"
              >
                <Image src={src} alt="" fill sizes="48px" className="object-cover" />
              </span>
            ))}
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              {t("10+ запущених проєктів", "10+ projects shipped")}
            </div>
            <div className="text-xs text-white/45">
              {t("Лендінги, магазини, SaaS, автоматизації", "Landings, stores, SaaS, automations")}
            </div>
          </div>
        </motion.div>

        {/* Pitch + CTA */}
        <div className="order-1 md:order-2 md:justify-self-end">
          <motion.p
            {...anim(0.55)}
            className="max-w-md text-[15px] leading-relaxed text-white/60 md:text-base"
          >
            {t(
              "Розробляємо сайти, інтернет-магазини, CRM та веб-застосунки, впроваджуємо AI й автоматизації на n8n — швидко, з SEO з першого дня й під ваші заявки.",
              "We build websites, online stores, CRMs and web apps, and roll out AI and n8n automations — fast, SEO-ready from day one and built to bring you leads."
            )}
          </motion.p>
          <motion.div {...anim(0.65)} className="mt-6 flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              data-event="click_hero_cta"
              className="rounded-full bg-white px-7 py-4 text-[13px] font-semibold uppercase tracking-wide text-black transition hover:bg-white/85"
            >
              {t("Обговорити проєкт", "Discuss a project")}
            </button>
            <button
              type="button"
              onClick={() => scrollToId("projects")}
              data-event="click_view_cases"
              aria-label={t("Дивитися кейси", "View case studies")}
              className="group grid h-[52px] w-[52px] place-items-center rounded-full border border-white/20 text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToId("projects")}
              className="ml-3 hidden text-[13px] text-white/50 underline-offset-4 transition hover:text-white hover:underline sm:inline"
            >
              {t("Дивитися кейси", "View case studies")}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ===================== SHOWCASE CARD ===================== */

/** Small rotating preview of recent work that sits beside the first headline line. */
function Showcase({ ready, mobile }: { ready: boolean; mobile?: boolean }) {
  const { t } = useLang();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!ready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % SHOWCASE.length), 2800);
    return () => clearInterval(id);
  }, [ready]);

  return (
    <motion.button
      type="button"
      onClick={() => scrollToId("projects")}
      initial={{ clipPath: "inset(100% 0% 0% 0% round 14px)" }}
      animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 14px)" } : undefined}
      transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
      aria-label={t("Подивитися останні роботи", "See recent work")}
      className={
        mobile
          ? "group relative z-10 mt-8 block aspect-[16/9] w-full overflow-hidden rounded-[14px] border border-white/10 bg-zinc-900 md:hidden"
          : "group absolute right-0 top-[0.08em] hidden aspect-[16/10] w-[16vw] max-w-[300px] overflow-hidden rounded-[14px] border border-white/10 bg-zinc-900 md:block"
      }
    >
      {SHOWCASE.map((s, idx) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.name}
          fill
          sizes={mobile ? "100vw" : "300px"}
          className={`object-cover transition-[opacity,transform] duration-[1200ms] ease-out group-hover:scale-105 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#050507]/90 to-transparent px-3 pb-2 pt-6 font-mono text-[10px] normal-case tracking-normal text-neutral-200">
        <span>{SHOWCASE[i].name}</span>
        <span className="text-emerald-400">{String(i + 1).padStart(2, "0")}/{String(SHOWCASE.length).padStart(2, "0")}</span>
      </span>
    </motion.button>
  );
}
