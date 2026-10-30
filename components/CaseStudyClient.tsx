"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CASES, CaseStudy } from "@/data/cases";
import { useLang } from "@/context/LangContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import ScrollToTop from "@/components/ScrollToTop";
import Reveal from "@/components/Reveal";
import { TopoTexture } from "@/components/SectionTextures";
import { scrollToId } from "@/components/SmoothScroll";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  ArrowUpRight01Icon,
  Tick02Icon,
  Target02Icon,
  Settings02Icon,
  ChartIncreaseIcon,
} from "@hugeicons/core-free-icons";

const EASE = [0.16, 1, 0.3, 1] as const;

const hostOf = (url?: string) => {
  try {
    return url && url !== "#" ? new URL(url).host : "";
  } catch {
    return "";
  }
};

export default function CaseStudyClient({ caseItem }: { caseItem: CaseStudy }) {
  const { t } = useLang();

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.agency-hella.site";
  const canonicalUrl = `${SITE_URL}/cases/${caseItem.slug}`;
  const isLive = !!caseItem.liveUrl && caseItem.liveUrl !== "#" && !caseItem.liveUrl.includes("github.com");
  const host = isLive ? hostOf(caseItem.liveUrl) : "";

  // Images: main (first screen), a secondary screen behind it, a phone shot.
  const main = caseItem.shots?.hero ?? caseItem.bannerPath;
  const extra = [
    caseItem.shots?.section,
    caseItem.framePath,
    ...(caseItem.galleryPaths ?? []),
    // the banner is usually the same first screen — only use it when there are no real shots
    caseItem.shots ? undefined : caseItem.bannerPath,
  ].filter((p, i, arr): p is string => !!p && p !== main && arr.indexOf(p) === i);
  const secondary = extra[0];
  const phone = caseItem.shots?.mobile;

  const idx = CASES.findIndex((c) => c.slug === caseItem.slug);
  const next = CASES[(idx + 1) % CASES.length];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Головна", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Кейси", item: `${SITE_URL}/#projects` },
      { "@type": "ListItem", position: 3, name: caseItem.title, item: canonicalUrl },
    ],
  };
  const caseSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: caseItem.title,
    description: caseItem.shortDescription,
    image: [main, ...extra].map((p) => `${SITE_URL}${p}`),
    genre: caseItem.category,
    url: canonicalUrl,
    creator: { "@type": "Organization", name: "Lutiy Digital", url: SITE_URL },
  };

  const story = [
    { icon: Target02Icon, label: t("Задача", "Challenge"), text: caseItem.problem },
    { icon: Settings02Icon, label: t("Рішення", "Solution"), text: caseItem.solution },
    { icon: ChartIncreaseIcon, label: t("Результат", "Result"), text: caseItem.resultDescription },
  ];

  return (
    <main className="relative min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseSchema) }} />

      <Nav />

      {/* ============ HERO: tilted showcase left, story right ============ */}
      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 md:pb-24 md:pt-32">
        <div
          aria-hidden
          className={`pointer-events-none absolute -left-[10%] top-[10%] h-[70vmin] w-[70vmin] rounded-full bg-gradient-to-br ${caseItem.accent} opacity-40 blur-[110px]`}
        />

        <div className="relative mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            <Link href="/" className="transition hover:text-emerald-400">{t("Головна", "Home")}</Link>
            <span>/</span>
            <Link href="/#projects" className="transition hover:text-emerald-400">{t("Кейси", "Cases")}</Link>
            <span>/</span>
            <span className="text-white/75">{caseItem.title}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Showcase */}
            <div className="relative order-1 lg:col-span-7">
              <Showcase
                title={caseItem.title}
                main={main}
                secondary={secondary}
                phone={phone}
                host={host}
              />
            </div>

            {/* Copy */}
            <div className="order-2 lg:col-span-5">
              <Reveal>
                <span className="inline-block rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">
                  {caseItem.category}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1
                  className="mt-4 font-semibold uppercase leading-[0.9] text-white"
                  style={{
                    fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                    fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  {caseItem.title}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-[15px] leading-relaxed text-white/60 md:text-base">{caseItem.shortDescription}</p>
              </Reveal>

              {/* Quick facts */}
              <Reveal delay={0.15}>
                <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                  <div className="bg-black p-4">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">{t("Стек", "Stack")}</dt>
                    <dd className="mt-1.5 text-sm text-white/85">{caseItem.stack.slice(0, 3).join(" · ")}</dd>
                  </div>
                  <div className="bg-black p-4">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">{t("Інтеграції", "Integrations")}</dt>
                    <dd className="mt-1.5 text-sm text-white/85">
                      {caseItem.integrations.length ? caseItem.integrations.slice(0, 2).join(" · ") : "—"}
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToId("contact")}
                    data-event="click_case_cta"
                    className="rounded-full bg-white px-7 py-3.5 text-[13px] font-semibold uppercase tracking-wide text-black transition hover:bg-white/85"
                  >
                    {t("Хочу схожий сайт", "I want a similar site")}
                  </button>
                  {isLive && (
                    <a
                      href={caseItem.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[13px] uppercase tracking-wide text-white transition hover:border-white/50"
                    >
                      {t("Відкрити сайт", "Open live site")}
                      <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </Reveal>

              <Link
                href="/#projects"
                className="group mt-8 inline-flex items-center gap-2 font-mono text-[11px] text-white/45 transition hover:text-white"
              >
                <HugeiconsIcon icon={ArrowLeft02Icon} size={13} className="transition group-hover:-translate-x-1" />
                {t("Усі кейси", "All cases")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STORY: challenge → solution → result ============ */}
      <section className="relative overflow-hidden border-y border-white/10 px-5 py-20 sm:px-8 md:py-28">
        <TopoTexture className="inset-0" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <h2 className="mb-10 font-display text-[26px] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl md:mb-14">
              {t("Як ми це зробили", "How we built it")}
            </h2>
          </Reveal>
          <ol className="grid gap-4 md:grid-cols-3">
            {story.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="h-full">
                <li className="relative flex h-full flex-col rounded-3xl border border-white/10 bg-black/70 p-6 sm:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-400">
                      <HugeiconsIcon icon={s.icon} size={20} />
                    </span>
                    <span className="font-mono text-[11px] text-white/30">0{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">{s.label}</h3>
                  <ExpandableText text={s.text} />
                  {i < story.length - 1 && (
                    <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black text-[11px] text-emerald-400 md:grid">
                      →
                    </span>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ WHAT'S INSIDE: features + tech ============ */}
      <section className="relative px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="mb-8 font-display text-[26px] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl">
                {t("Що всередині", "What's inside")}
              </h2>
            </Reveal>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {caseItem.features.map((f, i) => (
                <Reveal key={f} delay={i * 0.04}>
                  <li className="flex items-start gap-4 py-4">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-400/10 text-emerald-400">
                      <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={2.5} />
                    </span>
                    <span className="text-[15px] leading-relaxed text-white/80">{f}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="space-y-8 lg:col-span-5 lg:pt-20">
            <Reveal>
              <div>
                <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">{t("Технології", "Technologies")}</h3>
                <div className="flex flex-wrap gap-2">
                  {caseItem.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/15 px-3.5 py-1.5 text-[13px] text-white/80">{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
            {caseItem.integrations.length > 0 && (
              <Reveal>
                <div>
                  <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">{t("Інтеграції", "Integrations")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.integrations.map((s) => (
                      <span key={s} className="rounded-full bg-emerald-400/10 px-3.5 py-1.5 text-[13px] text-emerald-300">{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
            <Reveal>
              <div>
                <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">{t("Схожі послуги", "Related services")}</h3>
                <div className="flex flex-col">
                  {caseItem.relatedServices.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="group flex items-center justify-between border-b border-white/10 py-3 text-sm text-white/70 transition hover:text-emerald-400"
                    >
                      {s.title}
                      <span className="transition group-hover:translate-x-1">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      {(extra.length > 0 || phone) && (
        <section className="relative px-5 pb-20 sm:px-8 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="mb-8 font-display text-[26px] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl">
                {t("Як це виглядає", "How it looks")}
              </h2>
            </Reveal>
            <div className={`grid gap-5 ${phone ? "lg:grid-cols-[1fr_auto]" : ""}`}>
              <div className={`grid gap-5 ${extra.length > 1 ? "md:grid-cols-2" : ""}`}>
                {extra.slice(0, 2).map((src, i) => (
                  <Reveal key={src} delay={i * 0.08}>
                    <BrowserFrame host={host} className={extra.length === 1 ? "" : ""}>
                      <Image
                        src={src}
                        alt={`${caseItem.title} — ${t("екран сайту", "site screen")} ${i + 2}`}
                        fill
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover object-top"
                      />
                    </BrowserFrame>
                  </Reveal>
                ))}
              </div>
              {phone && (
                <Reveal delay={0.12} className="mx-auto w-[220px] sm:w-[240px]">
                  <PhoneFrame>
                    <Image src={phone} alt={`${caseItem.title} — ${t("мобільна версія", "mobile version")}`} fill sizes="240px" className="object-cover object-top" />
                  </PhoneFrame>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============ NEXT CASE ============ */}
      <section className="border-t border-white/10 px-5 py-16 sm:px-8">
        <Link href={`/cases/${next.slug}`} className="group mx-auto flex max-w-7xl items-center gap-5 sm:gap-8">
          <span className="relative hidden aspect-[16/10] w-40 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:block md:w-56">
            <Image
              src={next.shots?.hero ?? next.bannerPath}
              alt={next.title}
              fill
              sizes="224px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">{t("Наступний кейс", "Next case")}</span>
            <span
              className="mt-2 block truncate font-semibold uppercase text-white transition-colors group-hover:text-emerald-400"
              style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(1.8rem, 5vw, 3.6rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              {next.title}
            </span>
          </span>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 text-white transition group-hover:border-emerald-400 group-hover:bg-emerald-400 group-hover:text-black md:h-16 md:w-16">
            →
          </span>
        </Link>
      </section>

      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}

/* ============================ pieces ============================ */

/** Long copy stays in the DOM (SEO) but shows ~4 lines until expanded. */
function ExpandableText({ text }: { text: string }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const long = text.length > 220;
  return (
    <>
      <p className={`mt-3 text-sm leading-relaxed text-white/60 ${long && !open ? "line-clamp-4" : ""}`}>{text}</p>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-3 self-start font-mono text-[11px] uppercase tracking-widest text-emerald-400 transition hover:text-emerald-300"
        >
          {open ? t("Згорнути", "Show less") : t("Читати далі", "Read more")}
        </button>
      )}
    </>
  );
}

function BrowserFrame({ host, children, className = "" }: { host: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d10] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        {host && (
          <span className="ml-3 truncate rounded-md bg-white/[0.06] px-3 py-0.5 font-mono text-[10px] text-neutral-400">{host}</span>
        )}
      </div>
      <div className="relative aspect-[16/10]">{children}</div>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[34px] border border-white/15 bg-[#0d0d10] p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]">
      <div className="relative aspect-[390/844] overflow-hidden rounded-[27px]">
        {children}
        <span aria-hidden className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

/**
 * Hero showcase: main screen in a browser frame tilted in 3D, a second screen
 * peeking from behind, and the phone version in front. Swings into the angle on
 * load and straightens a little on hover — transforms only, no filters.
 */
function Showcase({
  title,
  main,
  secondary,
  phone,
  host,
}: {
  title: string;
  main: string;
  secondary?: string;
  phone?: string;
  host: string;
}) {
  return (
    <div className="group relative mx-auto max-w-[720px] pb-10 pr-6 sm:pr-14" style={{ perspective: 1600 }}>
      {secondary && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 0.55, x: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
          className="absolute -top-6 left-[12%] w-[78%] [transform:rotateY(24deg)_rotateX(8deg)_translateZ(-140px)]"
        >
          <BrowserFrame host="">
            <Image src={secondary} alt="" fill sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover object-top" />
          </BrowserFrame>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, rotateY: 0, rotateX: 0, y: 40 }}
        animate={{ opacity: 1, rotateY: 20, rotateX: 7, rotateZ: -1.5, y: 0 }}
        transition={{ duration: 1.4, ease: EASE }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:rotateY(-10deg)_rotateX(-3deg)]">
          <BrowserFrame host={host}>
            <Image src={main} alt={`${title} — головний екран сайту`} fill priority sizes="(min-width: 1024px) 50vw, 95vw" className="object-cover object-top" />
          </BrowserFrame>
        </div>
      </motion.div>

      {phone && (
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
          className="absolute -bottom-2 right-0 w-[26%] min-w-[96px] max-w-[170px]"
        >
          <PhoneFrame>
            <Image src={phone} alt={`${title} — мобільна версія`} fill sizes="170px" className="object-cover object-top" />
          </PhoneFrame>
        </motion.div>
      )}
    </div>
  );
}
