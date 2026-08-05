"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import Reveal from "./Reveal";
import { useLang } from "@/context/LangContext";
import Link from "next/link";

const MotionLink = motion(Link);

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

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { lang, t } = useLang();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const projects: Project[] = RAW_PROJECTS.map((p) => ({
    ...p,
    desc: lang === "ua" ? p.descUA : p.descEN,
  }));

  // Smooth spring on the scroll progress.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.3,
    restDelta: 0.0005,
  });

  const trackEnd = `-${projects.length * 94 - 100 + 12}vw`;
  const x = useTransform(smooth, [0, 1], ["0vw", trackEnd]);

  return (
    <section id="projects" className="relative bg-black">
      {/* ============ Section header ============ */}
      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-24 sm:px-6 sm:pb-16 md:pt-40">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/45">
                <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent to-white/50" />
                {t("Проєкти", "Projects")}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-[34px] font-semibold tracking-tight sm:text-4xl md:text-6xl lg:text-[72px]">
                {t("Вибрані", "Selected")}{" "}
                <span className="bg-gradient-to-r from-white via-emerald-200 to-sky-200 bg-clip-text text-transparent">
                  {t("роботи", "works")}
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-white/50 md:text-right">
              {t(
                "Продукти, які запускались і використовуються реальними користувачами.",
                "Products that shipped and are used by real people."
              )}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ============ DESKTOP: horizontal scroll showcase ============ */}
      <div ref={ref} className="relative hidden h-[450vh] md:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* Subtle progress bar */}
          <ProgressBar progress={smooth} />

          {/* Side fades for cinematic edges */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-30 w-32 bg-gradient-to-r from-black to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-30 w-32 bg-gradient-to-l from-black to-transparent"
          />

          <motion.div style={{ x }} className="flex pl-[5vw] pr-[5vw] will-change-transform">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.name}
                project={p}
                index={i}
                total={projects.length}
                progress={smooth}
                viewLabel={t("Переглянути", "View Project")}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ============ MOBILE: deck stack with scroll-reveal ============ */}
      <MobileDeck projects={projects} viewLabel={t("Переглянути", "View Project")} />
    </section>
  );
}

/* ============================ MOBILE DECK STACK ============================ */

function MobileDeck({ projects, viewLabel }: { projects: Project[]; viewLabel: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = projects.length;

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(total - 1, prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="relative md:hidden px-5 py-12 flex flex-col items-center justify-center min-h-[75vh] overflow-hidden bg-black/5">
      {/* Card stack container */}
      <div className="relative w-full aspect-[3/4.2] max-w-sm flex items-center justify-center" style={{ perspective: 1200 }}>
        {projects.map((p, i) => ({ project: p, index: i }))
          .filter(({ index }) => index >= activeIndex && index <= activeIndex + 2)
          .map(({ project: p, index: i }) => (
          <MobileSwipeCard
            key={p.name}
            project={p}
            index={i}
            activeIndex={activeIndex}
            total={total}
            viewLabel={viewLabel}
            onSwipeLeft={handleNext}
            onSwipeRight={handlePrev}
          />
        ))}
      </div>

      {/* Progress & Pagination Controls */}
      <div className="mt-8 flex items-center gap-6 z-20">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white backdrop-blur-md transition disabled:opacity-30 disabled:pointer-events-none hover:bg-white/[0.12]"
          aria-label="Previous project"
        >
          ←
        </button>
        <span className="font-mono text-xs text-white/50 tracking-wider">
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          onClick={handleNext}
          disabled={activeIndex === total - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white backdrop-blur-md transition disabled:opacity-30 disabled:pointer-events-none hover:bg-white/[0.12]"
          aria-label="Next project"
        >
          →
        </button>
      </div>
    </div>
  );
}

function MobileSwipeCard({
  project,
  index,
  activeIndex,
  total,
  viewLabel,
  onSwipeLeft,
  onSwipeRight,
}: {
  project: Project;
  index: number;
  activeIndex: number;
  total: number;
  viewLabel: string;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}) {
  const { t } = useLang();
  const isTop = index === activeIndex;
  const isPast = index < activeIndex;
  const depth = index - activeIndex;

  // Visual offsets for stacked items
  const cardScale = isPast ? 0.9 : Math.max(0.85, 1 - depth * 0.05);
  const cardY = isPast ? -60 : depth * 12;
  const cardZIndex = total - index;
  const cardOpacity = isPast ? 0 : depth > 3 ? 0 : 1;

  // Horizontal offsets for animations
  const customX = isPast ? -400 : 0;

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={(e, info) => {
        if (info.offset.x < -100 || info.velocity.x < -200) {
          onSwipeLeft();
        } else if (info.offset.x > 100 || info.velocity.x > 200) {
          onSwipeRight();
        }
      }}
      animate={{
        x: customX,
        y: cardY,
        scale: cardScale,
        opacity: cardOpacity,
        rotate: isTop ? 0 : (index % 2 === 0 ? 1.5 : -1.5) * Math.max(0, 1 - depth * 0.15)
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }}
      style={{
        zIndex: cardZIndex,
        transformStyle: "preserve-3d",
        touchAction: "pan-y"
      }}
      className="absolute inset-0 w-full h-full max-w-sm"
    >
      <Link
        href={`/cases/${project.slug}`}
        data-event="click_case_details"
        className="relative block w-full h-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <Image
          src={project.bannerPath}
          alt={`${project.name} - ${project.tag} by Lutiy Digital`}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          priority={index === 0}
          className="object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-30 mix-blend-screen`}
        />

        <div className="relative flex h-full flex-col justify-between p-6 select-none">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-white/70">
            <span className="font-mono">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="truncate pl-3">{project.tag}</span>
          </div>

          <div>
            <h3 className="text-[28px] font-semibold leading-[1.05] tracking-tight text-white">
              {project.name}
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-white/75">
              {project.desc}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/15 bg-white/[0.08] px-2.5 py-1 text-[10px] text-white/85 backdrop-blur-md"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              {t("Детальніше про кейс", "Case details")}
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}


/* ============================ DESKTOP CARD ============================ */

function ProjectCard({
  project,
  index,
  total,
  progress,
  viewLabel,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  viewLabel: string;
}) {
  const { t } = useLang();
  // Each card is “in focus” at progress = index / (total - 1).
  // Distance from focus drives scale + opacity for a cinematic per-card animation.
  const focus = total > 1 ? index / (total - 1) : 0;
  const dist = useTransform(progress, (p) => Math.abs(p - focus));

  const scale = useTransform(dist, [0, 0.18], [1, 0.9]);
  const opacity = useTransform(dist, [0, 0.22], [1, 0.45]);
  const cardY = useTransform(dist, [0, 0.18], [0, 28]);
  const isExternal = project.href?.startsWith("http");

  return (
    <motion.article
      style={{ scale, opacity, y: cardY }}
      className="relative mx-4 flex h-[80vh] w-[90vw] shrink-0 overflow-hidden rounded-[32px] border border-white/10 will-change-transform"
    >
      {/* Banner background */}
      <Image
        src={project.bannerPath}
        alt={`${project.name} - Premium Project from Lutiy Digital`}
        fill
        sizes="90vw"
        priority={index < 2}
        className="object-cover"
      />

      {/* Readability layer — slightly lighter than before so the banner breathes */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Accent gradient flare */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-1 bg-gradient-to-br ${project.accent} opacity-30 mix-blend-screen`}
      />

      {/* Content grid */}
      <div className="relative z-10 flex w-full flex-col p-10 lg:flex-row lg:p-14">
        {/* LEFT — copy */}
        <div className="flex flex-col justify-between lg:w-[40%]">
          <div>
            <div className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/60">
              <span className="font-mono">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-white/30" />
              {project.tag}
            </div>

            <h3 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight lg:text-7xl">
              {project.name}
            </h3>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 lg:text-lg">
              {project.desc}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs text-white/85 backdrop-blur-md"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <Link
            href={`/cases/${project.slug}`}
            data-event="click_case_details"
            className="group/btn mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/[0.12]"
          >
            <span>{t("Детальніше про кейс", "Case details")}</span>
            <span className="transition group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5">
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
            </span>
          </Link>
        </div>

        {/* RIGHT — framed banner photo with 3D tilt */}
        <div className="relative mt-10 flex flex-1 items-center justify-center lg:mt-0">
          <BannerFrame
            src={project.framePath ?? project.bannerPath}
            alt={project.name}
            accent={project.accent}
          />
        </div>
      </div>
    </motion.article>
  );
}

/* ============================ FRAMED BANNER (3D tilt) ============================ */

function BannerFrame({
  src,
  alt,
  accent,
}: {
  src: string;
  alt: string;
  accent: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 18,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full"
      style={{ perspective: 1400 }}
    >
      {/* Backdrop glow — softer */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${accent} opacity-70 blur-2xl`}
      />

      <motion.div
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
        }}
        className="relative mx-auto aspect-[16/10] w-full max-w-[620px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 620px, 60vw"
          className="object-cover"
        />
        {/* Glass sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
        />
        {/* Inner border highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
        />
      </motion.div>
    </div>
  );
}

/* ============================ PROGRESS BAR ============================ */

function ProgressBar({ progress }: { progress: MotionValue<number> }) {
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 z-40 h-[2px] w-[min(40vw,420px)] -translate-x-1/2 overflow-hidden bg-white/10">
      <motion.div
        style={{ width }}
        className="h-full bg-gradient-to-r from-emerald-300 to-sky-300"
      />
    </div>
  );
}
