"use client";

import { useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import Reveal from "./Reveal";
import NeonText from "./NeonText";
import { SpiralRoads } from "./SectionTextures";
import { useLang } from "@/context/LangContext";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Store01Icon,
  BubbleChatIcon,
  ShoppingBag01Icon,
  Briefcase01Icon,
  RocketIcon,
  MagicWand01Icon,
} from "@hugeicons/core-free-icons";

type Audience = {
  icon: typeof Store01Icon;
  span: string;
  ua: { title: string; desc: string; tags: string[] };
  en: { title: string; desc: string; tags: string[] };
};

// Bento layout (lg: 6 columns): one hero tile, two halves, three thirds.
const AUDIENCES: Audience[] = [
  {
    icon: Store01Icon,
    span: "lg:col-span-3 lg:row-span-2",
    ua: {
      title: "Локальний бізнес",
      desc: "Сайт, який приводить клієнтів з Google та Google Maps: кав'ярні, салони краси, стоматології та медичні клініки, автосервіси, шоуруми. Онлайн-запис, відгуки, локальне SEO під ваше місто — Київ, Біла Церква чи будь-яке інше.",
      tags: ["Сайт для салону краси", "Сайт для клініки", "Сайт для СТО", "Локальне SEO", "Онлайн-запис"],
    },
    en: {
      title: "Local business",
      desc: "A website that brings customers from Google Search and Maps: cafés, beauty salons, dental and medical clinics, car services, showrooms. Online booking, reviews and local SEO for your city.",
      tags: ["Beauty salon website", "Clinic website", "Car service website", "Local SEO", "Online booking"],
    },
  },
  {
    icon: ShoppingBag01Icon,
    span: "lg:col-span-3",
    ua: {
      title: "Інтернет-магазини",
      desc: "Швидкий інтернет-магазин на Next.js з миттєвим каталогом, фільтрами, оплатою та синхронізацією з CRM і складом.",
      tags: ["E-commerce", "Каталог товарів", "Оплата онлайн"],
    },
    en: {
      title: "Online stores",
      desc: "A fast Next.js store with an instant catalogue, filters, payments and CRM/stock sync.",
      tags: ["E-commerce", "Product catalogue", "Online payments"],
    },
  },
  {
    icon: BubbleChatIcon,
    span: "lg:col-span-3",
    ua: {
      title: "Експерти та консультанти",
      desc: "Персональний сайт-візитка для юристів, психологів, коучів і репетиторів: сильний особистий бренд та автоматичний запис на консультацію.",
      tags: ["Сайт-візитка", "Особистий бренд", "Лендінг"],
    },
    en: {
      title: "Experts & consultants",
      desc: "A personal website for lawyers, psychologists, coaches and tutors: a strong personal brand and automated consultation booking.",
      tags: ["Personal website", "Personal brand", "Landing page"],
    },
  },
  {
    icon: Briefcase01Icon,
    span: "lg:col-span-2",
    ua: {
      title: "Сервісні компанії",
      desc: "Корпоративний сайт для будівництва, логістики, клінінгу чи прокату з калькулятором вартості та заявками в CRM.",
      tags: ["Корпоративний сайт", "Калькулятор"],
    },
    en: {
      title: "Service companies",
      desc: "A business website for construction, logistics, cleaning or rentals with a price calculator and leads straight into your CRM.",
      tags: ["Business website", "Price calculator"],
    },
  },
  {
    icon: RocketIcon,
    span: "lg:col-span-2",
    ua: {
      title: "Стартапи",
      desc: "Розробка MVP та веб-застосунків, які можна показати інвесторам і першим користувачам — і масштабувати далі.",
      tags: ["MVP", "SaaS", "Веб-застосунок"],
    },
    en: {
      title: "Startups",
      desc: "MVP and web app development you can show investors and early users — and scale afterwards.",
      tags: ["MVP", "SaaS", "Web app"],
    },
  },
  {
    icon: MagicWand01Icon,
    span: "lg:col-span-2",
    ua: {
      title: "Команди, що хочуть автоматизації",
      desc: "Автоматизація бізнес-процесів на n8n та AI-асистенти: заявки, CRM, Telegram і таблиці працюють без ручного копіювання.",
      tags: ["n8n", "AI-асистент", "Інтеграція CRM"],
    },
    en: {
      title: "Teams ready to automate",
      desc: "Business process automation with n8n and AI assistants: leads, CRM, Telegram and sheets work without copy-pasting.",
      tags: ["n8n", "AI assistant", "CRM integration"],
    },
  },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const tileIn: Variants = {
  hidden: { y: 40, opacity: 0, scale: 0.97 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function ForWhom() {
  const { lang, t } = useLang();

  // One delegated listener: writes the cursor position into the hovered tile's
  // CSS variables. No React state, no re-renders — just a GPU-cheap gradient.
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const tile = (e.target as HTMLElement).closest<HTMLElement>("[data-spot]");
    if (!tile) return;
    const r = tile.getBoundingClientRect();
    tile.style.setProperty("--mx", `${e.clientX - r.left}px`);
    tile.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <section id="for-whom" className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.08),transparent_65%)]"
      />

      <SpiralRoads className="-right-[30%] -top-[12%] h-[120vmin] w-[120vmin] md:-right-[12%] md:-top-[20%]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-2 md:items-end">
          <div>
            <Reveal>
              <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-white/45 sm:text-[11px]">
                <span>04</span>
                <span className="h-px w-10 bg-white/25" />
                {t("Для кого", "Who it's for")}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-[30px] font-bold uppercase leading-[1.04] tracking-[-0.02em] text-white sm:text-[44px] lg:text-[54px]">
                <NeonText text={t("Для кого", "Who we build")} />
                <br />
                <span className="text-white/35">{t("ми робимо сайти", "websites for")}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-relaxed text-white/55 md:justify-self-end">
              {t(
                "Створюємо сайти, інтернет-магазини та веб-застосунки під ключ для малого й середнього бізнесу в Україні та за кордоном — під конкретну нішу, аудиторію й ціль: заявки, продажі або запис.",
                "We build turnkey websites, online stores and web apps for small and mid-sized businesses in Ukraine and abroad — tailored to your niche, audience and goal: leads, sales or bookings."
              )}
            </p>
          </Reveal>
        </div>

        {/* Bento grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          onPointerMove={onPointerMove}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[minmax(210px,auto)] lg:grid-cols-6"
        >
          {AUDIENCES.map((a, i) => {
            const c = lang === "ua" ? a.ua : a.en;
            const big = i === 0;
            return (
              <motion.div
                key={a.en.title}
                variants={tileIn}
                className={`${a.span} ${big ? "sm:col-span-2" : ""}`}
              >
              <article
                data-spot
                className="spot-tile group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
              >
                {/* Big index number */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute right-5 top-3 font-display font-bold leading-none text-white/[0.05] transition-colors duration-500 group-hover:text-emerald-400/[0.12] ${
                    big ? "text-[120px] lg:text-[180px]" : "text-[72px]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-emerald-400 ring-1 ring-white/10 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-black">
                  <HugeiconsIcon icon={a.icon} size={20} />
                </div>

                <h3
                  className={`relative font-semibold tracking-tight text-white ${big ? "text-2xl lg:text-4xl" : "text-lg lg:text-xl"}`}
                >
                  {c.title}
                </h3>
                <p className={`relative mt-3 leading-relaxed text-white/55 ${big ? "text-[15px] lg:max-w-md lg:text-base" : "text-sm"}`}>
                  {c.desc}
                </p>

                <ul className="relative mt-auto flex flex-wrap gap-1.5 pr-12 pt-6">
                  {c.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/50 transition-colors duration-300 group-hover:border-emerald-400/30 group-hover:text-white/75"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                {/* Whole tile leads to the brief form */}
                <a
                  href="#contact"
                  aria-label={t(`Обговорити проєкт: ${c.title}`, `Discuss a project: ${c.title}`)}
                  className="absolute inset-0 z-10 rounded-3xl"
                />

                {/* Arrow that slides in on hover */}
                <span
                  aria-hidden
                  className="absolute bottom-6 right-6 grid h-9 w-9 translate-x-2 place-items-center rounded-full bg-emerald-400 text-sm text-black opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                >
                  →
                </span>
              </article>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
