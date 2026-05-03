"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tick02Icon,
  ArrowUpRight01Icon,
  MagicWand01Icon,
} from "@hugeicons/core-free-icons";
import { useRef } from "react";
import Reveal from "./Reveal";
import { useLang } from "@/context/LangContext";

type Tier = {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
  tagline: string;
  accent: string;
};

type RawTier = Omit<Tier, "desc" | "features" | "cta" | "tagline"> & {
  descUA: string; descEN: string;
  featuresUA: string[]; featuresEN: string[];
  ctaUA: string; ctaEN: string;
  taglineUA: string; taglineEN: string;
};

const RAW_TIERS: RawTier[] = [
  {
    name: "Landing Page",
    price: "$200",
    descUA: "Презентаційний сайт із фокусом на конверсії.",
    descEN: "Presentation site focused on conversion.",
    taglineUA: "Старт", taglineEN: "Starter",
    featuresUA: ["Дизайн і верстка", "Адаптив, анімації", "SEO-базис, аналітика", "Деплой і CI"],
    featuresEN: ["Design & markup", "Responsive, animations", "SEO basics, analytics", "Deploy & CI"],
    ctaUA: "Замовити лендінг", ctaEN: "Order a landing",
    highlight: false,
    accent: "from-sky-500/30 via-cyan-400/15 to-transparent",
  },
  {
    name: "Fullstack Web App",
    price: "$2000",
    descUA: "Продукт з фронтом, API і базою даних.",
    descEN: "Product with frontend, API and database.",
    taglineUA: "Найпопулярніше", taglineEN: "Most popular",
    featuresUA: ["React / Next.js + TypeScript", "Node.js API, PostgreSQL", "Авторизація, ролі, платежі", "Тести, моніторинг"],
    featuresEN: ["React / Next.js + TypeScript", "Node.js API, PostgreSQL", "Auth, roles, payments", "Tests, monitoring"],
    ctaUA: "Обговорити продукт", ctaEN: "Discuss the product",
    highlight: true,
    accent: "from-emerald-400/40 via-sky-400/20 to-transparent",
  },
  {
    name: "Automation / n8n",
    price: "$300",
    descUA: "Автоматизація рутинних процесів і інтеграції.",
    descEN: "Automating routine processes and integrations.",
    taglineUA: "Швидкий результат", taglineEN: "Quick wins",
    featuresUA: ["Сценарії n8n / Zapier", "Інтеграції з CRM, API", "Тригери і нотифікації", "Документація"],
    featuresEN: ["n8n / Zapier scenarios", "CRM & API integrations", "Triggers & notifications", "Documentation"],
    ctaUA: "Налаштувати автоматизацію", ctaEN: "Set up automation",
    highlight: false,
    accent: "from-violet-500/30 via-fuchsia-400/15 to-transparent",
  },
];

const cardContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardItem: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const featureItem: Variants = {
  hidden: { x: -8, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const { lang, t } = useLang();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const tiers: Tier[] = RAW_TIERS.map((r) => ({
    name: r.name,
    price: r.price,
    highlight: r.highlight,
    accent: r.accent,
    desc: lang === "ua" ? r.descUA : r.descEN,
    tagline: lang === "ua" ? r.taglineUA : r.taglineEN,
    features: lang === "ua" ? r.featuresUA : r.featuresEN,
    cta: lang === "ua" ? r.ctaUA : r.ctaEN,
  }));

  return (
    <section
      id="services"
      ref={ref}
      className="relative overflow-hidden bg-black px-5 py-24 sm:px-6 sm:py-32 md:py-48"
    >
      {/* Background grid + glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-[180px]"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.45, 0.25, 0.45] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-sky-500/10 blur-[180px]"
      />

      {/* Scattered floating mockups */}
      <ScatteredMockups progress={scrollYProgress} />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/45">
            <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent to-white/50" />
            {t("Послуги", "Services")}
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-[80px]">
            {t("Прозорі", "Transparent")}{" "}
            <span className="bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent">
              {t("тарифи", "pricing")}
            </span>
            .
            <br />
            {t("Без сюрпризів.", "No surprises.")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-base text-white/55 md:text-lg">
            {t(
              "Орієнтовні бюджети для типових задач. Точна оцінка — після короткого брифу.",
              "Ballpark budgets for typical tasks. Exact estimate — after a short brief."
            )}
          </p>
        </Reveal>

        {/* Tiers */}
        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-1 gap-5 sm:gap-6 md:mt-28 md:grid-cols-3 md:items-stretch"
          style={{ perspective: 1400 }}
        >
          {tiers.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} index={i} fromLabel={t("від", "from")} hiLabel={t("АКТУАЛЬНЕ", "POPULAR")} />
          ))}
        </motion.div>

        {/* Footer note */}
        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/55 md:flex-row md:items-center">
            <span>
              {t(
                "Не знайшов відповідного формату? Напиши — складемо індивідуальну пропозицію.",
                "Don't see the right format? Write — we'll build a custom proposal."
              )}
            </span>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-white"
            >
              {t("Написати", "Contact me")}
              <span className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ TIER CARD ============================ */

function TierCard({ tier, index, fromLabel, hiLabel }: { tier: Tier; index: number; fromLabel: string; hiLabel: string }) {
  const isHi = tier.highlight;

  // Subtle 3D arrangement: side cards lean inward, center pops forward.
  const restTransform = isHi
    ? "md:scale-[1.04] md:-translate-y-3"
    : index === 0
    ? "md:[transform:perspective(1400px)_rotateY(8deg)_rotateZ(-2deg)_translateY(12px)_scale(0.97)]"
    : "md:[transform:perspective(1400px)_rotateY(-8deg)_rotateZ(2deg)_translateY(12px)_scale(0.97)]";

  // Hover: side cards straighten + lift; center just lifts a bit more.
  const hoverTransform = isHi
    ? "md:hover:scale-[1.05] md:hover:-translate-y-5"
    : "md:hover:[transform:perspective(1400px)_rotateY(0deg)_rotateZ(0deg)_translateY(-6px)_scale(1.02)]";

  return (
    <motion.div
      variants={cardItem}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative h-full transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${restTransform} ${hoverTransform} ${
        isHi ? "md:z-20" : "md:z-10"
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Highlight glow ring */}
      {isHi && (
        <motion.div
          aria-hidden
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] bg-gradient-to-br from-emerald-300/30 via-sky-300/20 to-fuchsia-300/20 blur-2xl"
        />
      )}

      {/* Highlight badge (OUTSIDE overflow-hidden so it isn't clipped) */}
      {isHi && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: -14 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-black px-4 py-2 text-[11px] font-medium tracking-wide text-white shadow-[0_8px_24px_rgba(0,0,0,0.5)] ring-1 ring-white/15"
        >
          <span className="text-emerald-300">
            <HugeiconsIcon icon={MagicWand01Icon} size={12} />
          </span>
          {tier.tagline}
        </motion.div>
      )}

      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-[border-color,background-color,box-shadow] duration-300 sm:p-8 ${
          isHi
            ? "border border-white/30 bg-white text-black shadow-[0_40px_100px_-20px_rgba(255,255,255,0.35)]"
            : "border border-white/10 bg-white/[0.02] text-white backdrop-blur-md group-hover:border-white/25 group-hover:bg-white/[0.035] group-hover:shadow-[0_20px_60px_-20px_rgba(255,255,255,0.08)]"
        }`}
      >

        {/* Top sheen */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 -top-px h-px ${
            isHi
              ? "bg-gradient-to-r from-transparent via-black/30 to-transparent"
              : "bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition duration-150 group-hover:opacity-100"
          }`}
        />

        {/* Eyebrow */}
        <div
          className={`mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] ${
            isHi ? "text-black/50" : "text-white/45"
          }`}
        >
          <span className="font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`h-px w-6 ${isHi ? "bg-black/25" : "bg-white/20"}`}
          />
          {!isHi && tier.tagline}
          {isHi && hiLabel}
        </div>

        {/* Name */}
        <h3
          className={`text-2xl font-semibold tracking-tight ${
            isHi ? "text-black" : "text-white"
          }`}
        >
          {tier.name}
        </h3>

        {/* Price */}
        <div className="mt-4 flex items-end gap-2">
          <span
            className={`text-5xl font-semibold tracking-tight ${
              isHi
                ? "text-black"
                : "bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent"
            }`}
          >
            {tier.price}
          </span>
          <span
            className={`pb-1.5 text-[10px] uppercase tracking-[0.25em] ${
              isHi ? "text-black/50" : "text-white/40"
            }`}
          >
            {fromLabel}
          </span>
        </div>

        {/* Description */}
        <p
          className={`mt-3 text-sm leading-relaxed ${
            isHi ? "text-black/65" : "text-white/55"
          }`}
        >
          {tier.desc}
        </p>

        {/* Divider */}
        <div
          className={`my-7 h-px ${
            isHi
              ? "bg-gradient-to-r from-transparent via-black/15 to-transparent"
              : "bg-gradient-to-r from-transparent via-white/12 to-transparent"
          }`}
        />

        {/* Features */}
        <motion.ul
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.07, delayChildren: 0.3 },
            },
          }}
          className="space-y-3.5 text-sm"
        >
          {tier.features.map((f) => (
            <motion.li
              key={f}
              variants={featureItem}
              className="flex items-start gap-3"
            >
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  isHi
                    ? "bg-black"
                    : "border border-emerald-300/30 bg-emerald-300/10"
                }`}
              >
                <span className={isHi ? "text-white" : "text-emerald-300"}>
                  <HugeiconsIcon icon={Tick02Icon} size={10} strokeWidth={3} />
                </span>
              </span>
              <span className={isHi ? "text-black/80" : "text-white/75"}>
                {f}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA */}
        <a
          href="#contact"
          className={`mt-9 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium transition ${
            isHi
              ? "bg-black text-white hover:bg-black/85"
              : "border border-white/15 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/[0.08]"
          }`}
        >
          {tier.cta}
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
        </a>
      </div>
    </motion.div>
  );
}

/* ============================ SCATTERED MOCKUPS ============================ */

function ScatteredMockups({
  progress,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each mockup gets its own parallax + rotation tied to scroll progress.
  const laptopY = useTransform(progress, [0, 1], [80, -160]);
  const laptopRot = useTransform(progress, [0, 1], [-10, -22]);

  const pcY = useTransform(progress, [0, 1], [120, -80]);
  const pcRot = useTransform(progress, [0, 1], [12, 24]);

  const phoneY = useTransform(progress, [0, 1], [200, -200]);
  const phoneRot = useTransform(progress, [0, 1], [-18, 8]);

  const laptop2Y = useTransform(progress, [0, 1], [-60, 140]);
  const laptop2Rot = useTransform(progress, [0, 1], [18, 4]);

  const phone2Y = useTransform(progress, [0, 1], [-120, 80]);
  const phone2Rot = useTransform(progress, [0, 1], [22, -10]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Laptop top-left */}
      <motion.div
        style={{ y: laptopY, rotate: laptopRot }}
        className="absolute left-[-4%] top-[8%] hidden h-44 w-72 opacity-[0.5] md:block"
      >
        <Image
          src="/laptop.png"
          alt=""
          fill
          className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          sizes="288px"
        />
      </motion.div>

      {/* PC top-right */}
      <motion.div
        style={{ y: pcY, rotate: pcRot }}
        className="absolute right-[-3%] top-[16%] hidden h-44 w-56 opacity-[0.55] md:block"
      >
        <Image
          src="/pc.png"
          alt=""
          fill
          className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          sizes="224px"
        />
      </motion.div>

      {/* Phone left-middle */}
      <motion.div
        style={{ y: phoneY, rotate: phoneRot }}
        className="absolute left-[6%] top-[55%] hidden h-48 w-24 opacity-[0.55] md:block"
      >
        <Image
          src="/phone.png"
          alt=""
          fill
          className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
          sizes="96px"
        />
      </motion.div>

      {/* Laptop bottom-right */}
      <motion.div
        style={{ y: laptop2Y, rotate: laptop2Rot }}
        className="absolute right-[4%] bottom-[8%] hidden h-40 w-64 opacity-[0.45] lg:block"
      >
        <Image
          src="/laptop.png"
          alt=""
          fill
          className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          sizes="256px"
        />
      </motion.div>

      {/* Phone bottom-center */}
      <motion.div
        style={{ y: phone2Y, rotate: phone2Rot }}
        className="absolute left-[42%] bottom-[4%] hidden h-40 w-20 opacity-[0.4] lg:block"
      >
        <Image
          src="/phone.png"
          alt=""
          fill
          className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          sizes="80px"
        />
      </motion.div>

      {/* Mobile: no decorative mockups (saves GPU) */}
    </div>
  );
}
