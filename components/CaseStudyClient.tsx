"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { CaseStudy } from "@/data/cases";
import { useLang } from "@/context/LangContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import ScrollToTop from "@/components/ScrollToTop";
import Reveal from "@/components/Reveal";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  ArrowUpRight01Icon,
  Tick02Icon,
  SourceCodeIcon,
  MagicWand01Icon
} from "@hugeicons/core-free-icons";

export default function CaseStudyClient({ caseItem }: { caseItem: CaseStudy }) {
  const { t } = useLang();
  const contactRef = useRef<HTMLDivElement>(null);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      const firstInput = contactSection.querySelector("input");
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 800);
      }
    }
  };

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.agency-hella.site";
  const canonicalUrl = `${SITE_URL}/cases/${caseItem.slug}`;

  // JSON-LD dynamic schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t("Головна", "Home"),
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t("Кейси", "Cases"),
        "item": `${SITE_URL}/#projects`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": caseItem.title,
        "item": canonicalUrl
      }
    ]
  };

  const caseSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": caseItem.title,
    "description": caseItem.shortDescription,
    "image": `${SITE_URL}${caseItem.bannerPath}`,
    "genre": caseItem.category,
    "creator": {
      "@type": "Organization",
      "name": "Lutiy Digital"
    }
  };

  return (
    <main className="relative bg-ink-950 text-white min-h-screen">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseSchema) }}
      />

      <Nav />

      {/* Grid background matching home page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 90%)"
        }}
      />

      {/* Case Hero */}
      <section className="relative pt-32 pb-16 px-5 sm:px-6 z-10 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white/45">
          <Link href="/" className="hover:text-emerald-400 transition">{t("Головна", "Home")}</Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-emerald-400 transition">{t("Кейси", "Cases")}</Link>
          <span>/</span>
          <span className="text-white/80">{caseItem.title}</span>
        </nav>

        {/* Back Link */}
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition mb-6"
        >
          <span className="transition group-hover:-translate-x-1">
            <HugeiconsIcon icon={ArrowLeft02Icon} size={14} />
          </span>
          {t("Назад до всіх робіт", "Back to all cases")}
        </Link>

        {/* Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Text Details */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-block text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 mb-3 bg-emerald-400/5 border border-emerald-500/10 px-3 py-1 rounded-full">
                {caseItem.category}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-none uppercase bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                {caseItem.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed text-balance">
                {caseItem.shortDescription}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={handleCtaClick}
                  className="relative overflow-hidden bg-white text-black font-semibold border border-white px-8 py-3.5 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-white/90 transition duration-300 flex items-center justify-center cursor-pointer pointer-events-auto"
                >
                  <span className="relative z-10">{t("Хочу схоже рішення", "I want a similar solution")}</span>
                </button>

                {caseItem.liveUrl && caseItem.liveUrl !== "#" && (
                  <a
                    href={caseItem.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-white px-8 py-3.5 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-zinc-900 transition duration-300 flex items-center justify-center"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {t("Відвідати сайт", "Visit live site")}
                      <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} />
                    </span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          {/* Banner Preview image */}
          <div className="lg:col-span-5 relative w-full aspect-[16/10] sm:aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${caseItem.accent} opacity-30 z-10 mix-blend-screen pointer-events-none`} />
            <Image
              src={caseItem.bannerPath}
              alt={`${caseItem.title} - ${caseItem.category} by Hella Dev Studio`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Case Details Blocks */}
      <section className="py-16 px-5 sm:px-6 relative z-10 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Copy (Problem, Solution, Results) */}
          <div className="lg:col-span-8 space-y-12">
            <Reveal>
              <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-4 uppercase flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {t("Задача проєкту", "Project Goal / Problem")}
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed whitespace-pre-line">
                  {caseItem.problem}
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-4 uppercase flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {t("Реалізоване рішення", "Implemented Solution")}
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed whitespace-pre-line">
                  {caseItem.solution}
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-4 uppercase flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {t("Результати для клієнта", "Outcomes & Results")}
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed whitespace-pre-line">
                  {caseItem.resultDescription}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Sidebar (Stack, Integrations, Related Services) */}
          <div className="lg:col-span-4 space-y-8 sticky top-28">
            {/* Tech Stack */}
            <Reveal>
              <div className="border border-white/10 bg-white/[0.01] rounded-2xl p-6">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-4 flex items-center gap-2">
                  <HugeiconsIcon icon={SourceCodeIcon} size={14} className="text-emerald-400" />
                  {t("Технологічний стек", "Tech Stack")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseItem.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-xs text-white/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Integrations */}
            {caseItem.integrations.length > 0 && (
              <Reveal>
                <div className="border border-white/10 bg-white/[0.01] rounded-2xl p-6">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-4 flex items-center gap-2">
                  <HugeiconsIcon icon={MagicWand01Icon} size={14} className="text-emerald-400" />
                    {t("Інтеграції та API", "Integrations & API")}
                  </h3>
                  <ul className="space-y-2.5">
                    {caseItem.integrations.map((integration) => (
                      <li key={integration} className="flex items-center gap-2.5 text-xs text-zinc-400">
                        <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                          <HugeiconsIcon icon={Tick02Icon} size={8} strokeWidth={3} />
                        </span>
                        {integration}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {/* Related Services */}
            <Reveal>
              <div className="border border-white/10 bg-white/[0.01] rounded-2xl p-6">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-4">
                  {t("Споріднені послуги", "Related Services")}
                </h3>
                <div className="space-y-3">
                  {caseItem.relatedServices.map((service, idx) => (
                    <Link
                      key={idx}
                      href={service.href}
                      className="group flex items-center justify-between text-xs text-zinc-400 hover:text-emerald-400 transition"
                    >
                      <span>{service.title}</span>
                      <span className="transition group-hover:translate-x-0.5">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Case Features (Bullets) */}
      <section className="py-16 px-5 sm:px-6 relative z-10 max-w-7xl mx-auto border-t border-white/5">
        <Reveal>
          <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-tight uppercase mb-8">
            {t("Реалізований ", "Key implemented ")}
            <span className="bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent">
              {t("функціонал", "features")}
            </span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseItem.features.map((feature, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.005] hover:border-emerald-500/20 transition-all duration-300">
                <span className="flex h-6 w-6 items-center justify-center shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 mt-0.5">
                  <HugeiconsIcon icon={Tick02Icon} size={10} strokeWidth={3} />
                </span>
                <div>
                  <h4 className="text-base font-semibold text-white/95">{feature.split(" — ")[0]}</h4>
                  {feature.split(" — ")[1] && (
                    <p className="mt-1 text-sm text-white/55 leading-relaxed">{feature.split(" — ")[1]}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Case Gallery */}
      {caseItem.galleryPaths && caseItem.galleryPaths.length > 0 && (
        <section className="py-16 px-5 sm:px-6 relative z-10 max-w-7xl mx-auto border-t border-white/5">
          <Reveal>
            <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-tight uppercase mb-8">
              {t("Інтерфейс ", "Project ")}
              <span className="bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent">
                {t("проєкту", "Gallery")}
              </span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseItem.galleryPaths.map((imagePath, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 group shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                  <Image
                    src={imagePath}
                    alt={`${caseItem.title} screenshot ${idx + 1}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Case CTA footer */}
      <section className="py-20 px-5 sm:px-6 text-center relative z-10 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase leading-tight">
              {t("Хочете отримати схожий проєкт?", "Want a similar project built?")}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t(
                "Напишіть мені — я детально вивчу вашу задачу, розберу процеси й запропоную оптимальне технічне рішення.",
                "Send me a message — I will review your business requirements, trace workflows, and propose a reliable technical design."
              )}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <button
                onClick={handleCtaClick}
                className="relative overflow-hidden bg-white text-black font-semibold border border-white px-8 py-3.5 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-white/90 transition duration-300 flex items-center justify-center cursor-pointer pointer-events-auto"
              >
                {t("Обговорити задачу", "Discuss Task")}
              </button>
              <a
                href="https://t.me/GGLUTT"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-white px-8 py-3.5 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-zinc-900 transition duration-300 flex items-center justify-center"
              >
                {t("Написати в Telegram", "Write on Telegram")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Global Form Section */}
      <div ref={contactRef}>
        <Contact />
      </div>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
