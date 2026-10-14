"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Reveal from "./Reveal";
import { useLang } from "@/context/LangContext";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FlashIcon,
  SmartPhone01Icon,
  SourceCodeIcon,
  Analytics01Icon,
  FolderOpenIcon,
  Search01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";

type Benefit = {
  icon: typeof FlashIcon;
  ua: [string, string];
  en: [string, string];
};

const BENEFITS: Benefit[] = [
  {
    icon: FlashIcon,
    ua: ["Швидкий сайт на Next.js", "Сторінки відкриваються менш ніж за секунду. Висока швидкість — це вищі позиції в Google, більше заявок і дешевша реклама."],
    en: ["A fast Next.js website", "Pages open in under a second. Speed means higher Google rankings, more leads and cheaper ads."],
  },
  {
    icon: SmartPhone01Icon,
    ua: ["Адаптивний дизайн Mobile-First", "Більшість клієнтів приходить зі смартфона. Інтерфейс продуманий спершу під телефон, а далі — до 4K-моніторів."],
    en: ["Mobile-first responsive design", "Most visitors come from phones. The interface is designed for mobile first, then scaled up to 4K screens."],
  },
  {
    icon: Search01Icon,
    ua: ["SEO-оптимізація з першого дня", "Семантична верстка, мета-теги, sitemap, robots, мікророзмітка Schema.org і Core Web Vitals у зеленій зоні — сайт готовий до просування."],
    en: ["SEO from day one", "Semantic markup, meta tags, sitemap, robots, Schema.org data and green Core Web Vitals — ready for promotion."],
  },
  {
    icon: SourceCodeIcon,
    ua: ["Інтеграції з CRM і Telegram", "Заявки автоматично летять у CRM, Google Sheets, Telegram чи email. Жоден клієнт не губиться, менеджери не копіюють дані вручну."],
    en: ["CRM & Telegram integrations", "Leads flow straight into your CRM, Google Sheets, Telegram or email. No lost clients, no manual copy-paste."],
  },
  {
    icon: Analytics01Icon,
    ua: ["Аналітика та відстеження конверсій", "Google Analytics 4, Meta Pixel і події конверсій — ви бачите, звідки приходять клієнти та скільки приносить реклама."],
    en: ["Analytics & conversion tracking", "Google Analytics 4, Meta Pixel and conversion events — see where clients come from and what your ads return."],
  },
  {
    icon: FolderOpenIcon,
    ua: ["Код без конструкторів", "Чистий код, який належить вам. Проєкт легко розширити: особистий кабінет, онлайн-оплата, нові модулі чи мобільний застосунок."],
    en: ["Real code, no site builders", "Clean code you own. Easy to extend with client portals, online payments, new modules or a mobile app."],
  },
];

const listStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const rowIn: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function WhatYouGet() {
  const { lang, t } = useLang();

  return (
    <section
      id="what-you-get"
      className="relative bg-black px-5 py-24 sm:px-8 md:py-32"
      style={{ overflowX: "clip" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.07),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-2 md:items-end">
          <div>
            <Reveal>
              <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-white/45 sm:text-[11px]">
                <span>05</span>
                <span className="h-px w-10 bg-white/25" />
                {t("Результат", "Outcome")}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[30px] font-bold uppercase leading-[1.04] tracking-[-0.02em] text-white sm:text-[44px] lg:text-[54px]">
                {t("Що ви", "What you")}
                <br />
                <span className="text-white/35">{t("отримуєте", "get")}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-relaxed text-white/55 md:justify-self-end">
              {t(
                "Не просто красиву сторінку, а сайт під ключ, який приносить заявки: швидкий, адаптивний, з SEO-оптимізацією, аналітикою та інтеграціями — як у кейсі нижче.",
                "Not just a pretty page but a turnkey website that brings leads: fast, responsive, SEO-optimised, with analytics and integrations — like the case below."
              )}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Featured case — sticks while the list scrolls on desktop */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <FeaturedCase />
            </div>
          </div>

          {/* Benefits */}
          <motion.ol
            variants={listStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="border-t border-white/10 lg:col-span-5"
          >
            {BENEFITS.map((b, i) => {
              const [title, desc] = lang === "ua" ? b.ua : b.en;
              return (
                <motion.li
                  key={b.en[0]}
                  variants={rowIn}
                  className="group relative grid grid-cols-[auto_1fr] gap-x-4 border-b border-white/10 py-6 sm:gap-x-5"
                >
                  {/* hover wash */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-3 -right-3 origin-left scale-x-0 rounded-2xl bg-white/[0.03] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.04] text-emerald-400 ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-emerald-400 group-hover:text-black">
                    <HugeiconsIcon icon={b.icon} size={19} />
                  </span>
                  <div className="relative">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] text-white/30 transition-colors group-hover:text-emerald-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[17px] font-semibold tracking-tight text-white sm:text-lg">{title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{desc}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

/* ============================ FEATURED CASE ============================ */

function FeaturedCase() {
  const { t } = useLang();
  const frameRef = useRef<HTMLDivElement>(null);

  // Gentle inner parallax: the image drifts inside its frame while scrolling.
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const chips = t("Онлайн-запис,Кабінет учня,Анімації,Mobile-first", "Online booking,Student portal,Motion,Mobile-first").split(",");

  return (
    <div className="relative">
      {/* Case-coloured glow that echoes the red light in the shot */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(ellipse_at_30%_40%,rgba(239,68,68,0.18),transparent_65%)]"
      />

      <motion.div
        ref={frameRef}
        initial={{ clipPath: "inset(14% 10% 14% 10% round 40px)", opacity: 0 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[3/4] overflow-hidden rounded-[28px] sm:aspect-[4/3] border border-white/10 bg-[#0a0606]"
      >
        <motion.div style={{ y: imgY }} className="absolute -inset-y-[7%] inset-x-0">
          <motion.div
            initial={{ scale: 1.18 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src="/case-d4ys-mockup.webp"
              alt={t(
                "Сайт танцювальної студії D4YS у Білій Церкві — розробка Lutiy Digital",
                "D4YS dance studio website in Bila Tserkva — built by Lutiy Digital"
              )}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              quality={82}
              className="object-cover object-[50%_35%]"
            />
          </motion.div>
        </motion.div>

        {/* Top label */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-neutral-50/15 bg-[#050507]/70 px-3 py-1.5 sm:left-5 sm:top-5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-200">
            {t("Обраний кейс", "Featured case")}
          </span>
        </div>

        {/* Bottom caption */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050507] via-[#050507]/85 to-transparent p-5 pt-12 sm:p-7 sm:pt-20">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-400">D4YS Dance Studio</div>
          <h3 className="mt-2 max-w-lg text-lg font-semibold leading-snug tracking-tight text-neutral-50 sm:text-2xl">
            {t(
              "Сайт танцювальної студії з онлайн-записом і кабінетом учня",
              "Dance studio website with online booking and a student portal"
            )}
          </h3>
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {chips.map((c) => (
              <span key={c} className="rounded-full border border-neutral-50/15 bg-neutral-50/[0.06] px-2.5 py-1 text-[10px] text-neutral-200 sm:text-[11px]">
                {c}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <Link
        href="/cases/d4ys-dance-studio"
        data-event="click_featured_case"
        className="group mt-5 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-white/70 transition hover:text-white"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition group-hover:border-emerald-400 group-hover:bg-emerald-400 group-hover:text-black">
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
        </span>
        {t("Дивитися кейс повністю", "See the full case")}
      </Link>
    </div>
  );
}
