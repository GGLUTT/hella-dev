"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import Reveal from "./Reveal";
import { useLang } from "@/context/LangContext";

type Project = {
  slug: string;
  name: string;
  tag: string;
  desc: string;
  stack: string[];
  href: string;
  bannerPath: string;
  framePath?: string;
  accent: string;
};

type RawProject = Omit<Project, "desc"> & { descUA: string; descEN: string };

const RAW_PROJECTS: RawProject[] = [
  {
    slug: "apex-fitness-studio",
    name: "Apex Fitness Studio",
    tag: "Fitness · Sport",
    descUA: "Сучасний веб-сайт для мережі фітнес-клубів із інтерактивним розкладом занять, особистими кабінетами та онлайн-оплатою.",
    descEN: "A modern fitness studio website featuring an interactive class schedule, customer portals, and online payments.",
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    href: "https://gglutt.github.io/apex_fitnes/",
    bannerPath: "/fitnes2.jpg",
    framePath: "/fitnes1.jpg",
    accent: "from-orange-500/40 via-amber-500/20 to-transparent",
  },
  {
    slug: "kronos-agency",
    name: "Kronos Agency",
    tag: "Real Estate · Brand",
    descUA: "Преміальний лендінг для агентства елітної нерухомості з кінематографічною скрол-інтерактивністю та бездоганним UX.",
    descEN: "Premium landing page for a luxury real estate agency with cinematic scroll interactivity and seamless UX.",
    stack: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    href: "https://gglutt.github.io/agency-vibe/",
    bannerPath: "/agency.jpg",
    accent: "from-amber-600/40 via-yellow-500/20 to-transparent",
  },
  {
    slug: "budle-startup",
    name: "Budle",
    tag: "Startup · Social Network",
    descUA: "Стартап нової соцмережі: стрічка, профілі, чати, real-time реакції та modern-стек.",
    descEN: "Social network startup: feed, profiles, chats, real-time reactions on a modern stack.",
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    href: "https://github.com/GGLUTT/budle-startup",
    bannerPath: "/budle1.png",
    framePath: "/budle2.png",
    accent: "from-indigo-500/40 via-violet-500/20 to-transparent",
  },
  {
    slug: "iphone-3d-landing",
    name: "iPhone 3D Landing",
    tag: "Landing · 3D Animation",
    descUA: "Кінематографічний лендінг нового iPhone з 3D-сценою, скрол-анімаціями та плавними переходами.",
    descEN: "Cinematic iPhone landing with a 3D scene, scroll-driven animations and smooth transitions.",
    stack: ["React", "Three.js", "GSAP", "TailwindCSS"],
    href: "https://gglutt.github.io/phone3d/",
    bannerPath: "/iphone-project.png",
    accent: "from-slate-300/40 via-zinc-400/20 to-transparent",
  },
  {
    slug: "3d-nexus",
    name: "3D Nexus",
    tag: "Commercial · 3D / WebGL",
    descUA: "Сайт для комерційного комп'ютерного клубу з інтерактивними 3D-об'єктами — демонструє роботу з 3D у вебі.",
    descEN: "Site for a commercial gaming club featuring interactive 3D objects — showcases 3D work on the web.",
    stack: ["Three.js", "React", "WebGL", "GSAP"],
    href: "https://gglutt.github.io/3d-nexus/",
    bannerPath: "/nexus.png",
    accent: "from-cyan-500/40 via-emerald-400/20 to-transparent",
  },
  {
    slug: "nts-soccer-academy",
    name: "NTS SOCCER ACADEMY",
    tag: "Sports · SaaS",
    descUA: "Платформа для футбольних турнірів зі статистикою у реальному часі та live-таблицями.",
    descEN: "Tournament platform with real-time stats and live leaderboards.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "WebSocket"],
    href: "https://nts-academy.net/",
    bannerPath: "/football-baner.jpg",
    accent: "from-emerald-500/40 via-emerald-400/20 to-transparent",
  },
  {
    slug: "nike-concept",
    name: "Nike Concept",
    tag: "E-commerce · Brand",
    descUA: "Концептуальний інтернет-магазин з динамічним 3D-конфігуратором кросівок.",
    descEN: "Concept store with a dynamic 3D sneaker configurator.",
    stack: ["React", "Three.js", "Stripe", "Shopify"],
    href: "https://gglutt.github.io/Nike_Landing1/",
    bannerPath: "/nike-banner.jpg",
    accent: "from-orange-500/40 via-rose-500/20 to-transparent",
  },
  {
    slug: "wine-hood",
    name: "Wine Hood",
    tag: "Mobile · Lifestyle",
    descUA: "Мобільний застосунок для гурманів вина: AI-рекомендації, дегустаційні нотатки, спільнота.",
    descEN: "Wine-lover app with AI recommendations, tasting notes, and community.",
    stack: ["React Native", "Supabase", "AI"],
    href: "https://gglutt.github.io/WineHood/",
    bannerPath: "/wine-hood-banner.jpg",
    accent: "from-rose-500/40 via-amber-500/20 to-transparent",
  },
  {
    slug: "d4ys-dance-studio",
    name: "D4YS Dance Studio",
    tag: "Brand · Identity",
    descUA: "Сайт для креативної студії танців з кінематографічними переходами і складною типографікою.",
    descEN: "Creative dance studio site with cinematic transitions and rich typography.",
    stack: ["Node.js", "JavaScript", "React", "Supabase"],
    href: "https://github.com/GGLUTT/d4ys-dance-studio",
    bannerPath: "/d4ys-banner.png",
    accent: "from-violet-500/40 via-fuchsia-500/20 to-transparent",
  },
  {
    slug: "svitdtv",
    name: "SvitDTV",
    tag: "Streaming · OTT",
    descUA: "OTT-платформа стрімінгу з live-каналами, відеотекою та персоналізованими рекомендаціями.",
    descEN: "OTT streaming platform with live channels, VOD, and personalised picks.",
    stack: ["Next.js", "HLS", "Redis", "Node.js"],
    href: "#",
    bannerPath: "/svitdtv-banner.jpg",
    accent: "from-sky-500/40 via-cyan-500/20 to-transparent",
  },
  {
    slug: "store-platform",
    name: "Store Platform",
    tag: "E-commerce · Headless",
    descUA: "Headless комерц-платформа з блискавичним пошуком, А/Б-тестами та інтеграцією n8n.",
    descEN: "Headless commerce platform with instant search, A/B tests, and n8n integration.",
    stack: ["Next.js", "Algolia", "n8n", "PostgreSQL"],
    href: "https://svitdtv.shop/",
    bannerPath: "/store-banner.jpg",
    accent: "from-emerald-500/40 via-teal-500/20 to-transparent",
  },
];

/* Folder-style cut-outs: a tab at the top-left (category label) and a notch at
   the bottom-right (arrow). Both are punched out of the image with CSS masks, so
   the cards stay a single cheap layer — no extra DOM shapes, no filters. */
const TAB_PATH = "M0 0H218C202 0 193 8 186 22L174 46C167 59 158 64 142 64H0Z";
const tabSvg = (rotate: boolean) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='218' height='64' viewBox='0 0 218 64'>${
      rotate ? "<g transform='rotate(180 109 32)'>" : "<g>"
    }<path d='${TAB_PATH}'/></g></svg>`
  )}")`;
const CARD_MASK: React.CSSProperties = {
  WebkitMaskImage: `${tabSvg(false)}, ${tabSvg(true)}, linear-gradient(#000 0 0)`,
  WebkitMaskPosition: "top left, bottom right, center",
  WebkitMaskSize: "218px 64px, 150px 64px, 100% 100%",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskComposite: "xor",
  maskImage: `${tabSvg(false)}, ${tabSvg(true)}, linear-gradient(#000 0 0)`,
  maskPosition: "top left, bottom right, center",
  maskSize: "218px 64px, 150px 64px, 100% 100%",
  maskRepeat: "no-repeat",
  maskComposite: "exclude",
};

export default function Projects() {
  const { lang, t } = useLang();

  const projects: Project[] = RAW_PROJECTS.map((p) => ({
    ...p,
    desc: lang === "ua" ? p.descUA : p.descEN,
  }));

  return (
    <section id="projects" className="relative bg-[#050507] text-neutral-50" style={{ overflowX: "clip" }}>
      {/* Backdrop: faint emerald blooms + fine grid, all static */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] top-[10%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_60%)]" />
        <div className="absolute -right-[15%] bottom-0 h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.08),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
      </div>

      {/* ============ Header ============ */}
      <div className="relative mx-auto max-w-[1600px] px-5 pb-10 pt-24 sm:px-8 md:pb-14 md:pt-36 lg:px-12">
        <Reveal>
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500 sm:text-[11px]">
            <span>03</span>
            <span className="h-px w-10 bg-neutral-700" />
            {t("Кейси", "Case studies")}
          </div>
        </Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.05}>
            <h2
              className="font-semibold uppercase leading-[0.88] text-neutral-50"
              style={{
                fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                fontSize: "clamp(2.8rem, 8vw, 8.5rem)",
                letterSpacing: "-0.05em",
              }}
            >
              {t("Наші", "Selected")}
              <br />
              <span className="text-outline-light">{t("проєкти", "work")}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[13px] uppercase leading-relaxed tracking-wide text-neutral-400 md:text-right md:text-sm">
              {t(
                `${projects.length} проєктів у різних нішах — від лендінгів до SaaS-платформ`,
                `${projects.length} projects across niches — from landing pages to SaaS platforms`
              )}
            </p>
          </Reveal>
        </div>
      </div>

      <DesktopTrack projects={projects} />
      <MobileStack projects={projects} />
    </section>
  );
}

/* ============================ DESKTOP: pinned horizontal track ============================ */

function DesktopTrack({ projects }: { projects: Project[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // Measure the real overflow so the last card lands exactly at the edge.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={wrapRef}
      className="relative hidden md:block"
      // one viewport of vertical scroll per ~1.6 cards keeps the pace calm
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max gap-6 px-8 will-change-transform lg:px-12"
        >
          {projects.map((p, i) => (
            <CaseCard key={p.slug} project={p} index={i} total={projects.length} />
          ))}
        </motion.div>

        <div className="mx-8 mt-8 flex items-center gap-4 lg:mx-12">
          <div className="h-px flex-1 overflow-hidden bg-neutral-50/10">
            <motion.div style={{ width: bar }} className="h-full bg-emerald-400" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">scroll</span>
        </div>
      </div>
    </div>
  );
}

/* ============================ MOBILE: sticky stacking cards ============================ */

const MOBILE_INITIAL = 6;

function MobileStack({ projects }: { projects: Project[] }) {
  const { t } = useLang();
  const [all, setAll] = useState(false);
  const shown = all ? projects : projects.slice(0, MOBILE_INITIAL);

  return (
    <div className="relative px-4 pb-20 md:hidden">
      {shown.map((p, i) => (
        // pure CSS sticky stacking: zero JS work while scrolling
        <div key={p.slug} className="sticky mb-5" style={{ top: 76 + i * 10 }}>
          <CaseCard project={p} index={i} total={projects.length} mobile />
        </div>
      ))}
      {!all && projects.length > MOBILE_INITIAL && (
        <button
          type="button"
          onClick={() => setAll(true)}
          className="relative z-10 mt-4 w-full rounded-full border border-neutral-50/15 py-4 font-mono text-xs uppercase tracking-widest text-neutral-50 transition active:scale-[0.98]"
        >
          {t(`Ще ${projects.length - MOBILE_INITIAL} кейсів`, `${projects.length - MOBILE_INITIAL} more cases`)} ↓
        </button>
      )}
    </div>
  );
}

/* ============================ CARD ============================ */

function CaseCard({
  project,
  index,
  total,
  mobile,
}: {
  project: Project;
  index: number;
  total: number;
  mobile?: boolean;
}) {
  const { t } = useLang();
  const category = project.tag.split("·")[0].trim();

  return (
    <Link
      href={`/cases/${project.slug}`}
      data-event="click_case_details"
      aria-label={`${project.name} — ${t("переглянути кейс", "view case")}`}
      className={
        "group relative block shrink-0 " +
        (mobile ? "aspect-[4/5] w-full" : "h-[68vh] max-h-[640px] w-[46vw] max-w-[820px]")
      }
    >
      {/* Image body with folder cut-outs */}
      <div
        className="absolute inset-0 overflow-hidden rounded-[28px] bg-neutral-900"
        style={CARD_MASK}
      >
        <Image
          src={project.bannerPath}
          alt={`${project.name} — ${project.tag}, Lutiy Digital`}
          fill
          sizes={mobile ? "92vw" : "(min-width: 1800px) 820px, 46vw"}
          priority={index < 2}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/35 to-transparent" />
        <div className="absolute inset-0 bg-[#050507]/10 transition-colors duration-500 group-hover:bg-transparent" />

        {/* Copy */}
        <div className={"absolute inset-x-0 bottom-0 " + (mobile ? "p-5 pr-24" : "p-8 pr-40 lg:p-10 lg:pr-44")}>
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
          <h3
            className={"font-semibold uppercase leading-[0.95] text-neutral-50 " + (mobile ? "text-[28px]" : "text-4xl lg:text-5xl")}
            style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif", letterSpacing: "-0.04em" }}
          >
            {project.name}
          </h3>
          <p className={"mt-3 max-w-md leading-relaxed text-neutral-300 " + (mobile ? "line-clamp-2 text-[13px]" : "text-sm lg:text-base")}>
            {project.desc}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, mobile ? 3 : 4).map((s) => (
              <span
                key={s}
                className="rounded-full border border-neutral-50/15 bg-neutral-50/[0.07] px-2.5 py-1 text-[10px] text-neutral-200 sm:text-[11px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab label (sits in the top-left cut-out) */}
      <span className="absolute left-0 top-0 flex h-[52px] w-[176px] items-center pl-5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-50">
        {category}
      </span>

      {/* Arrow (sits in the bottom-right notch) */}
      <span className="absolute bottom-0 right-0 flex h-[56px] w-[104px] items-center justify-end pr-5 text-emerald-400 transition-transform duration-300 group-hover:translate-x-1">
        <HugeiconsIcon icon={ArrowUpRight01Icon} size={22} />
      </span>

      {/* Rotating "view case" badge */}
      <span
        aria-hidden
        className={
          "absolute grid place-items-center transition-all duration-500 " +
          (mobile
            ? "right-4 top-4 h-[74px] w-[74px]"
            : "right-8 top-1/2 h-28 w-28 -translate-y-1/2 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100")
        }
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_12s_linear_infinite]">
          <defs>
            <path id={`c-${project.slug}`} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <circle cx="50" cy="50" r="49" fill="#10b981" />
          <text fill="#050507" fontSize="8.5" fontWeight="700" fontFamily="var(--font-inter), sans-serif">
            <textPath href={`#c-${project.slug}`} textLength="236" lengthAdjust="spacing">
              {t("ПЕРЕГЛЯНУТИ КЕЙС • ПЕРЕГЛЯНУТИ КЕЙС •", "VIEW CASE • VIEW CASE • VIEW CASE • ")}
            </textPath>
          </text>
        </svg>
        <span className="relative grid h-[52%] w-[52%] place-items-center rounded-full bg-[#050507] text-neutral-50">
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={mobile ? 16 : 22} />
        </span>
      </span>
    </Link>
  );
}
