"use client";

import { motion, type Variants } from "framer-motion";
import Reveal from "./Reveal";
import { useLang } from "@/context/LangContext";

type Step = {
  num: string;
  title: string;
  desc: string;
};

const stepsUA: Step[] = [
  {
    num: "01",
    title: "Заявка або дзвінок",
    desc: "Ви залишаєте запит на сайті або пишете мені у Telegram. Ми проводимо коротке знайомство та обговорюємо загальні вимоги проєкту."
  },
  {
    num: "02",
    title: "Аналіз задачі",
    desc: "Я вивчаю ваші бізнес-процеси, аналізую конкурентів та готую детальну технічну пропозицію, терміни й прозорий розрахунок бюджету."
  },
  {
    num: "03",
    title: "Прототип та структура",
    desc: "Створюємо інформаційну структуру майбутнього сайту або схему роботи додатку/автоматизації. Затверджуємо макет дизайну у Figma."
  },
  {
    num: "04",
    title: "Розробка",
    desc: "Написання чистого, типізованого коду (React, Next.js, TypeScript). Створення інтерактивних інтерфейсів, анімацій та логіки бази даних."
  },
  {
    num: "05",
    title: "Інтеграції",
    desc: "Підключаємо платіжні шлюзи, телефонію, CRM-системи (KeyCRM, SendPulse тощо), створюємо автоматизації на n8n та сповіщення в Telegram."
  },
  {
    num: "06",
    title: "Запуск",
    desc: "Проводимо фінальне тестування швидкості та адаптивності, переносимо сайт на швидкий хостинг, підключаємо домен і відкриваємо індексацію Google."
  },
  {
    num: "07",
    title: "Підтримка",
    desc: "Безкоштовно супроводжую проєкт перші 14 днів для перевірки стабільності. Надалі допомагаю масштабувати та оновлювати систему."
  }
];

const stepsEN: Step[] = [
  {
    num: "01",
    title: "Inquiry or Call",
    desc: "You submit a request on the site or write directly in Telegram. We do a quick intro call to discuss your high-level ideas and requirements."
  },
  {
    num: "02",
    title: "Task Analysis",
    desc: "I dive deep into your workflow, analyze competitors, and outline the technical architecture, project scope, deadlines, and cost."
  },
  {
    num: "03",
    title: "Wireframing & Prototype",
    desc: "We design the information architecture of the site or map the automation database logic. We prototype and approve UI mockups in Figma."
  },
  {
    num: "04",
    title: "Coding & Dev",
    desc: "Writing clean, typed modular code (React, Next.js, TypeScript). Setting up layouts, styling, key motion transitions, and databases."
  },
  {
    num: "05",
    title: "Integrations & API",
    desc: "Syncing billing checkouts, telephony, CRM pipelines, n8n automations, and immediate customer alerts in Telegram."
  },
  {
    num: "06",
    title: "Deploy & Launch",
    desc: "Comprehensive testing of speed and screen responsiveness, shifting to live servers (Vercel/VPS), linking domain, and turning on indexation."
  },
  {
    num: "07",
    title: "Long-term Support",
    desc: "14 days of free post-launch support to ensure total stability. Retainer plans are available for ongoing upgrades."
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
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Workflow() {
  const { lang, t } = useLang();
  const steps = lang === "ua" ? stepsUA : stepsEN;

  return (
    <section id="workflow" className="relative overflow-hidden bg-black py-20 px-5 sm:px-6 border-t border-white/5">
      {/* Background Grid */}
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
        className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[180px]"
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/45">
              <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent to-white/50" />
              {t("Процес співпраці", "The Process")}
              <span className="inline-block h-px w-10 bg-gradient-to-l from-transparent to-white/50" />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-4xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl uppercase">
              {t("Як проходить ", "How we ")}
              <span className="bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent">
                {t("робота", "work")}
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Process Roadmap */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="relative border-l border-white/10 ml-4 md:ml-8 pl-8 sm:pl-12 space-y-12"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={cardReveal}
              className="relative group text-left"
            >
              {/* Timeline Bullet */}
              <div className="absolute -left-[53px] sm:-left-[69px] top-1.5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black text-emerald-400 ring-4 ring-black transition duration-300 group-hover:border-emerald-400 group-hover:text-emerald-300 group-hover:scale-105">
                <span className="font-mono text-xs font-bold">{step.num}</span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white transition duration-300 group-hover:text-emerald-300">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm sm:text-sm md:text-base leading-relaxed text-white/65 max-w-3xl transition duration-300 group-hover:text-white/70">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
