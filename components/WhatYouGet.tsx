"use client";

import { motion, type Variants } from "framer-motion";
import Reveal from "./Reveal";
import { useLang } from "@/context/LangContext";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FlashIcon,
  SmartPhone01Icon,
  SourceCodeIcon,
  Analytics01Icon,
  FolderOpenIcon
} from "@hugeicons/core-free-icons";

const SearchEngineIconComponent = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

type BenefitItem = {
  title: string;
  desc: string;
  icon: any;
  glow: string;
  sheen: string;
};

const itemsUA: BenefitItem[] = [
  {
    title: "Швидкий сайт або веб-застосунок",
    desc: "Блискавичне завантаження сторінок (до 1 секунди) на сучасному стеку Next.js / React. Висока швидкість збільшує продажі та знижує ціну реклами.",
    icon: FlashIcon,
    glow: "group-hover:border-emerald-500/30 group-hover:bg-emerald-500/[0.01]",
    sheen: "via-emerald-400/30"
  },
  {
    title: "Адаптивний дизайн",
    desc: "Зручний інтерфейс, оптимізований за принципом Mobile-First. Сайт виглядає преміально на екранах будь-якого розміру — від смартфонів до 4K моніторів.",
    icon: SmartPhone01Icon,
    glow: "group-hover:border-cyan-500/30 group-hover:bg-cyan-500/[0.01]",
    sheen: "via-cyan-400/30"
  },
  {
    title: "Базове SEO",
    desc: "Повна технічна підготовка до просування: чиста семантична верстка, правильні заголовки, sitemap, robots, мікророзмітка JSON-LD та canonical посилання.",
    icon: SearchEngineIconComponent,
    glow: "group-hover:border-indigo-500/30 group-hover:bg-indigo-500/[0.01]",
    sheen: "via-indigo-400/30"
  },
  {
    title: "Інтеграції під ключ",
    desc: "Автоматична відправка лідів у CRM, Google Sheets, сповіщення в Telegram, Email чи SMS. Клієнти не губляться, а менеджери працюють без рутини.",
    icon: SourceCodeIcon,
    glow: "group-hover:border-blue-500/30 group-hover:bg-blue-500/[0.01]",
    sheen: "via-blue-400/30"
  },
  {
    title: "Аналітика та трекінг",
    desc: "Налаштування Google Analytics 4, Meta Pixel та кастомного відстеження подій, щоб ви точно бачили, звідки прийшли ліди та яка окупність маркетингу.",
    icon: Analytics01Icon,
    glow: "group-hover:border-violet-500/30 group-hover:bg-violet-500/[0.01]",
    sheen: "via-violet-400/30"
  },
  {
    title: "Можливість масштабування",
    desc: "Код пишеться без конструкторів за світовими стандартами. Ви можете розширити проєкт у будь-який момент: додати кабінети, платіжні шлюзи чи нові модулі.",
    icon: FolderOpenIcon,
    glow: "group-hover:border-pink-500/30 group-hover:bg-pink-500/[0.01]",
    sheen: "via-pink-400/30"
  }
];

const itemsEN: BenefitItem[] = [
  {
    title: "Fast Website or Web App",
    desc: "Blazing fast page loads (<1s) using Next.js and React. High performance increases user retention, conversions, and lowers cost-per-click.",
    icon: FlashIcon,
    glow: "group-hover:border-emerald-500/30 group-hover:bg-emerald-500/[0.01]",
    sheen: "via-emerald-400/30"
  },
  {
    title: "Responsive Mobile-First Design",
    desc: "Stunning user interface tailored for touch interaction. The layout adapts seamlessly to all devices — from mobile phones to 4K monitors.",
    icon: SmartPhone01Icon,
    glow: "group-hover:border-cyan-500/30 group-hover:bg-cyan-500/[0.01]",
    sheen: "via-cyan-400/30"
  },
  {
    title: "Solid SEO Foundations",
    desc: "Full pre-launch technical optimization: clean semantic HTML, hierarchy tags, optimized sitemap, robots, JSON-LD schema, and canonical links.",
    icon: SearchEngineIconComponent,
    glow: "group-hover:border-indigo-500/30 group-hover:bg-indigo-500/[0.01]",
    sheen: "via-indigo-400/30"
  },
  {
    title: "Seamless Integrations",
    desc: "Automated sync of inquiries with CRMs, Google Sheets, instant Telegram alerts, email, or SMS. Zero missed leads, zero manual copy-pasting.",
    icon: SourceCodeIcon,
    glow: "group-hover:border-blue-500/30 group-hover:bg-blue-500/[0.01]",
    sheen: "via-blue-400/30"
  },
  {
    title: "Analytics & Tracking",
    desc: "Complete setup of Google Analytics 4, Meta Pixel, and custom conversion events to track and measure ROI on all your traffic sources.",
    icon: Analytics01Icon,
    glow: "group-hover:border-violet-500/30 group-hover:bg-violet-500/[0.01]",
    sheen: "via-violet-400/30"
  },
  {
    title: "Unlimited Scalability",
    desc: "Code is crafted directly without locking into simple website builders. Extend features at any time: introduce billing, user portals, or API routes.",
    icon: FolderOpenIcon,
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

export default function WhatYouGet() {
  const { lang, t } = useLang();
  const items = lang === "ua" ? itemsUA : itemsEN;

  return (
    <section id="what-you-get" className="relative overflow-hidden bg-black py-20 px-5 sm:px-6">
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
        className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-emerald-500/5 blur-[150px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <Reveal>
            <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/45">
              <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent to-white/50" />
              {t("Цінність", "Value Proposal")}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-4xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {t("Що ви ", "What you ")}
              <span className="bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent">
                {t("отримуєте", "receive")}
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
                    {typeof item.icon === "function" ? (
                      <item.icon />
                    ) : (
                      <HugeiconsIcon icon={item.icon} size={20} />
                    )}
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
