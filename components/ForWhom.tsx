"use client";

import { motion, type Variants } from "framer-motion";
import Reveal from "./Reveal";
import { useLang } from "@/context/LangContext";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Store01Icon,
  BubbleChatIcon,
  ShoppingBag01Icon,
  Briefcase01Icon,
  RocketIcon,
  MagicWand01Icon
} from "@hugeicons/core-free-icons";

type TargetAudience = {
  title: string;
  desc: string;
  icon: any;
  glow: string;
  sheen: string;
};

const itemsUA: TargetAudience[] = [
  {
    title: "Локальний бізнес",
    desc: "Кав'ярні, салони краси, медичні та стоматологічні клініки, автосервіси, шоуруми, які хочуть отримувати клієнтів з локального пошуку та карт.",
    icon: Store01Icon,
    glow: "group-hover:border-emerald-500/30 group-hover:bg-emerald-500/[0.01]",
    sheen: "via-emerald-400/30"
  },
  {
    title: "Експерти та консультанти",
    desc: "Юристи, фінансові радники, репетитори, психологи, коучі, яким потрібен преміальний персональний бренд та автозапис клієнтів.",
    icon: BubbleChatIcon,
    glow: "group-hover:border-cyan-500/30 group-hover:bg-cyan-500/[0.01]",
    sheen: "via-cyan-400/30"
  },
  {
    title: "Інтернет-магазини",
    desc: "Сучасні e-commerce проєкти, які прагнуть мати швидкі каталоги без зависань (Headless Next.js), розумний пошук та синхронізацію з CRM.",
    icon: ShoppingBag01Icon,
    glow: "group-hover:border-indigo-500/30 group-hover:bg-indigo-500/[0.01]",
    sheen: "via-indigo-400/30"
  },
  {
    title: "Сервісні компанії",
    desc: "Агенції, будівельні компанії, логістика, клінінг, автопрокат, де важливо презентувати складні послуги та автоматизувати розрахунок ціни.",
    icon: Briefcase01Icon,
    glow: "group-hover:border-blue-500/30 group-hover:bg-blue-500/[0.01]",
    sheen: "via-blue-400/30"
  },
  {
    title: "Стартапи",
    desc: "Команди на стадії запуску продукту, яким необхідно розробити масштабоване MVP для презентації інвесторам та перших реальних користувачів.",
    icon: RocketIcon,
    glow: "group-hover:border-violet-500/30 group-hover:bg-violet-500/[0.01]",
    sheen: "via-violet-400/30"
  },
  {
    title: "Команди, що прагнуть автоматизації",
    desc: "Бізнеси, втомлені від ручного копіювання замовлень та лідів, які хочуть інтегрувати AI-помічників та налаштувати зв'язок сервісів через n8n.",
    icon: MagicWand01Icon,
    glow: "group-hover:border-pink-500/30 group-hover:bg-pink-500/[0.01]",
    sheen: "via-pink-400/30"
  }
];

const itemsEN: TargetAudience[] = [
  {
    title: "Local Business",
    desc: "Cafes, beauty salons, medical clinics, car services, and showrooms wanting to attract clients from local searches and Google Maps.",
    icon: Store01Icon,
    glow: "group-hover:border-emerald-500/30 group-hover:bg-emerald-500/[0.01]",
    sheen: "via-emerald-400/30"
  },
  {
    title: "Experts & Consultants",
    desc: "Lawyers, financial advisors, tutors, psychologists, and coaches needing a premium personal brand and automated appointment scheduling.",
    icon: BubbleChatIcon,
    glow: "group-hover:border-cyan-500/30 group-hover:bg-cyan-500/[0.01]",
    sheen: "via-cyan-400/30"
  },
  {
    title: "Online Stores",
    desc: "Modern e-commerce projects seeking ultra-fast, smooth product catalogs (Headless Next.js), instant search, and CRM integrations.",
    icon: ShoppingBag01Icon,
    glow: "group-hover:border-indigo-500/30 group-hover:bg-indigo-500/[0.01]",
    sheen: "via-indigo-400/30"
  },
  {
    title: "Service Providers",
    desc: "Agencies, builders, logistics, cleaning, and car rentals looking to showcase complex packages and automate price estimations.",
    icon: Briefcase01Icon,
    glow: "group-hover:border-blue-500/30 group-hover:bg-blue-500/[0.01]",
    sheen: "via-blue-400/30"
  },
  {
    title: "Startups",
    desc: "Teams preparing to launch, needing a clean and scalable MVP developed fast to showcase to investors and attract early adopters.",
    icon: RocketIcon,
    glow: "group-hover:border-violet-500/30 group-hover:bg-violet-500/[0.01]",
    sheen: "via-violet-400/30"
  },
  {
    title: "Teams Seeking Automation",
    desc: "Businesses tired of manually copy-pasting orders and leads, wanting to set up AI agents and sync all workflows via n8n.",
    icon: MagicWand01Icon,
    glow: "group-hover:border-pink-500/30 group-hover:bg-pink-500/[0.01]",
    sheen: "via-pink-400/30"
  }
];

const containerStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const cardReveal: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function ForWhom() {
  const { lang, t } = useLang();
  const items = lang === "ua" ? itemsUA : itemsEN;

  return (
    <section id="for-whom" className="relative overflow-hidden bg-black py-20 px-5 sm:px-6">
      {/* Background elements */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full bg-cyan-500/5 blur-[150px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <Reveal>
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/45">
              <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent to-white/50" />
              {t("Цільова аудиторія", "Target Audience")}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-4xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {t("Для кого це ", "Who is this ")}
              <span className="bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent">
                {t("рішення", "solution")}
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Grid Cards */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardReveal}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.01] p-6 backdrop-blur-none md:backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${item.glow}`}
            >
              {/* Highlight sheen top border */}
              <div className={`pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent ${item.sheen} to-transparent opacity-0 transition duration-300 group-hover:opacity-100`} />
              
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Icon bubble */}
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.03] text-emerald-400 ring-1 ring-white/10 transition duration-300 group-hover:bg-emerald-400/10">
                    <HugeiconsIcon icon={item.icon} size={20} />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white transition duration-300 group-hover:text-emerald-300">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-sm md:text-base leading-relaxed text-white/65 transition duration-300 group-hover:text-white/70">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
