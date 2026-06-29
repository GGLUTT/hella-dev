"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ServiceDetail } from "@/data/services";
import { CASES } from "@/data/cases";
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
  CircleArrowRightIcon,
  Money01Icon,
  Clock01Icon
} from "@hugeicons/core-free-icons";

export default function SEOPageLayout({ service }: { service: ServiceDetail }) {
  const { t } = useLang();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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

  const handleAuditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      
      // Simulate click on the AI audit card button
      const auditButton = contactSection.querySelector("button[data-event='click_ai_audit']");
      if (auditButton) {
        (auditButton as HTMLButtonElement).click();
      } else {
        // Fallback: manually select and focus
        const firstInput = contactSection.querySelector("input");
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 800);
        }
      }
    }
  };

  // Find related cases
  const relatedCases = CASES.filter((c) => service.relatedCasesSlugs.includes(c.slug));

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.agency-hella.site";
  const canonicalUrl = `${SITE_URL}/${service.slug}`;

  // Structured schemas
  const breadcrumbsSchema = {
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
        "name": service.title,
        "item": canonicalUrl
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "ProfessionalService",
      "name": "Lutiy Digital",
      "url": SITE_URL
    },
    "offers": {
      "@type": "Offer",
      "price": service.price.replace("від $", ""),
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faq.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <main className="relative bg-ink-950 text-white min-h-screen">
      {/* Dynamic SEO Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Nav />

      {/* Background Dots Grid */}
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

      {/* Service Page Hero */}
      <section className="relative pt-32 pb-16 px-5 sm:px-6 z-10 max-w-7xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white/45">
          <Link href="/" className="hover:text-emerald-400 transition">{t("Головна", "Home")}</Link>
          <span>/</span>
          <span className="text-white/80">{service.title}</span>
        </nav>

        <div className="max-w-4xl">
          <Reveal>
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 mb-3 bg-emerald-400/5 border border-emerald-500/10 px-3 py-1 rounded-full">
              {t("Послуга розробки", "Development Service")}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-bold tracking-tight leading-[1.1] uppercase bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              {service.h1}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed text-balance">
              {service.description}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-sm text-zinc-500 max-w-2xl leading-relaxed">
              {service.introText}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleCtaClick}
                className="relative overflow-hidden bg-white text-black font-semibold border border-white px-8 py-3.5 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-white/90 transition duration-300 flex items-center justify-center cursor-pointer pointer-events-auto"
              >
                {t("Обговорити проєкт", "Discuss project")}
              </button>

              <button
                onClick={handleAuditClick}
                data-event="click_ai_audit"
                className="relative overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-white px-8 py-3.5 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-zinc-900 transition duration-300 flex items-center justify-center cursor-pointer pointer-events-auto"
              >
                <span className="relative z-10">{t("Отримати AI-аудит", "Get AI Audit")}</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Target & Problem Solutions Section */}
      <section className="py-16 px-5 sm:px-6 relative z-10 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* For Whom */}
          <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-6 sm:p-8">
            <Reveal>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-6 uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t("Для кого ця послуга", "Who is this service for")}
              </h2>
            </Reveal>
            <ul className="space-y-4">
              {service.forWhom.map((item, idx) => (
                <Reveal key={idx} delay={idx * 0.05}>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                      <HugeiconsIcon icon={Tick02Icon} size={10} strokeWidth={3} />
                    </span>
                    <span className="text-sm sm:text-base text-zinc-400">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Problems Solved */}
          <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-6 sm:p-8">
            <Reveal>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-6 uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t("Які задачі закриває", "What problems it solves")}
              </h2>
            </Reveal>
            <ul className="space-y-4">
              {service.problemsSolved.map((item, idx) => {
                const parts = item.split(" — ");
                return (
                  <Reveal key={idx} delay={idx * 0.05}>
                    <li className="flex items-start gap-3">
                      <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                      <div>
                        <span className="text-sm sm:text-base text-white font-medium block">{parts[0]}</span>
                        {parts[1] && <span className="text-xs sm:text-sm text-zinc-500 block mt-0.5">{parts[1]}</span>}
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Deliverables & Price Section */}
      <section className="py-16 px-5 sm:px-6 relative z-10 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Deliverables List */}
          <div className="lg:col-span-8 bg-zinc-900/20 border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <Reveal>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-6 uppercase flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {t("Що входить у роботу", "What's included in the package")}
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.deliverables.map((item, idx) => (
                  <Reveal key={idx} delay={idx * 0.05}>
                    <div className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.005]">
                      <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                        <HugeiconsIcon icon={Tick02Icon} size={8} strokeWidth={3} />
                      </span>
                      <span className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{item}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Highlight Box */}
          <div className="lg:col-span-4 relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.02] p-6 sm:p-8 flex flex-col justify-between">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-mono font-semibold tracking-wider text-emerald-300 uppercase mb-4">
                {t("Фіксований Бюджет", "Fixed Pricing")}
              </span>
              <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest">{t("Орієнтовна вартість", "Estimated Price")}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">{service.price}</span>
              </div>
              <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
                {t(
                  "Кінцева вартість розраховується індивідуально після уточнення обсягів та вимог і фіксується у договорі.",
                  "Final pricing is scoped after briefing and remains completely fixed without surprise invoices."
                )}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-emerald-500/10 flex flex-col gap-3 font-mono text-[10px] text-zinc-400">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Clock01Icon} size={14} className="text-emerald-400" />
                <span>{t("Термін запуску: ", "Timeline: ")} {service.timeline}</span>
              </div>
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={Money01Icon} size={14} className="text-emerald-400" />
                <span>{t("Схема оплати: 50% передоплата / 50% здача", "Terms: 50% prepayment / 50% delivery")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline steps */}
      <section className="py-16 px-5 sm:px-6 relative z-10 max-w-7xl mx-auto border-t border-white/5">
        <div className="mb-12 text-center md:text-left">
          <Reveal>
            <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-tight uppercase">
              {t("Процес ", "Development ")}
              <span className="bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent">
                {t("роботи", "process")}
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {service.workflow.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.005] p-5 hover:border-emerald-500/20 transition-all duration-300">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-xs text-emerald-400 font-bold">// {(idx + 1).toString().padStart(2, "0")}</span>
                </div>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-semibold">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Related Cases Section */}
      {relatedCases.length > 0 && (
        <section className="py-16 px-5 sm:px-6 relative z-10 max-w-7xl mx-auto border-t border-white/5">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Reveal>
                <div className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/45">
                  <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent to-white/50" />
                  {t("Портфоліо", "Portfolio")}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-tight uppercase">
                  {t("Релевантні ", "Relevant ")}
                  <span className="bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent">
                    {t("кейси", "case studies")}
                  </span>
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCases.map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 0.08}>
                <Link
                  href={`/cases/${project.slug}`}
                  data-event="click_case_details"
                  className="group relative block aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-white/20 transition duration-300"
                >
                  <Image
                    src={project.bannerPath}
                    alt={`${project.title} - Case Study by Hella`}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col justify-end">
                    <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold mb-1">{project.category}</span>
                    <h3 className="text-lg font-bold text-white transition duration-300 group-hover:text-emerald-300">{project.title}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Indexable SEO FAQ Section */}
      <section className="py-20 px-5 sm:px-6 relative z-10 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/45">
              <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent to-white/50" />
              {t("Питання та відповіді", "FAQ")}
              <span className="inline-block h-px w-10 bg-gradient-to-l from-transparent to-white/50" />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl uppercase">
              {t("Часті ", "Common ")}
              <span className="bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent">
                {t("запитання", "questions")}
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="space-y-4 relative">
          {service.faq.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <Reveal key={idx} delay={idx * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-emerald-500/30 bg-white/[0.02]"
                      : "border-white/10 bg-white/[0.005] hover:border-white/20 hover:bg-white/[0.015]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left outline-none cursor-pointer"
                  >
                    <span className="text-base font-semibold tracking-tight text-white/90 transition duration-300 sm:text-lg">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-transform duration-300 ${
                        isOpen ? "rotate-180 border-emerald-500/30 text-emerald-300" : ""
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="h-3.5 w-3.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </button>

                  {/* DOM-indexable transition wrapper */}
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out border-white/5"
                    style={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                      borderTopWidth: isOpen ? "1px" : 0,
                    }}
                  >
                    <div className="px-6 pb-6 pt-4 text-sm leading-relaxed text-white/60 whitespace-pre-line">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Final service page CTA */}
      <section className="py-20 px-5 sm:px-6 text-center relative z-10 border-t border-white/5 bg-black/40">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase leading-tight">
              {t("Готові розпочати розробку?", "Ready to launch your project?")}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t(
                "Напишіть мені — обговоримо деталі, підрахуємо кошторис і складемо покроковий план запуску.",
                "Send me a note — let's align on technical specs, map pricing tiers, and build a phased timeline."
              )}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <button
                onClick={handleCtaClick}
                className="relative overflow-hidden bg-white text-black font-semibold border border-white px-8 py-3.5 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-white/90 transition duration-300 flex items-center justify-center cursor-pointer pointer-events-auto"
              >
                {t("Обговорити проєкт", "Discuss Project")}
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

      {/* Contact Form Section */}
      <Contact />

      <Footer />
      <ScrollToTop />
    </main>
  );
}
