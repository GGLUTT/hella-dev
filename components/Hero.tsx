"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useLang } from "@/context/LangContext";
import MagneticButton from "@/components/MagneticButton";

/* ===================== CONFIG ===================== */
const STICKER_CHARS = ["h", "e", "l", "l", "a"];
const LOADER_DURATION = 1800;

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
    },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: [0, 0.45, 0.15, 0.9, 0.6, 1], // hologram boot-up flicker
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const eyebrowContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.65,
    },
  },
};

/* ===================== HERO MAIN ===================== */

export default function Hero() {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw motion values for cursor lens coords
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);

  // Smooth springs for inertia on coords
  const smoothLensX = useSpring(lensX, { stiffness: 90, damping: 20 });
  const smoothLensY = useSpring(lensY, { stiffness: 90, damping: 20 });

  // Initialize lens coords at the center of the screen on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    lensX.set(rect.width / 2);
    lensY.set(rect.height * 0.38);
  }, [lensX, lensY]);

  // Subscribe and map lens coordinates to CSS variables
  useEffect(() => {
    const unsubX = smoothLensX.on("change", (v) => {
      containerRef.current?.style.setProperty("--mouse-x", `${v}px`);
    });
    const unsubY = smoothLensY.on("change", (v) => {
      containerRef.current?.style.setProperty("--mouse-y", `${v}px`);
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothLensX, smoothLensY]);

  // Scroll animations
  const { scrollY } = useScroll();

  // Scroll radius shrinks like a camera shutter close (from 140px to 0px)
  const lensRadius = useTransform(scrollY, [0, 380], [140, 0]);
  const smoothRadius = useSpring(lensRadius, { stiffness: 110, damping: 22 });

  useEffect(() => {
    const unsubRadius = smoothRadius.on("change", (v) => {
      containerRef.current?.style.setProperty("--lens-radius", `${v}px`);
    });
    return () => unsubRadius();
  }, [smoothRadius]);

  // Background video zoom & exit blur (smoothed with springs)
  const scaleRaw = useTransform(scrollY, [0, 600], [1.0, 1.12]);
  const scale = useSpring(scaleRaw, { stiffness: 90, damping: 20 });

  const blurRaw = useTransform(scrollY, [0, 500], [0, 8]);
  const blurVal = useSpring(blurRaw, { stiffness: 90, damping: 20 });
  const videoFilter = useTransform(blurVal, (b) => `saturate(1.1) brightness(0.8) blur(${b}px)`);

  // Text container scroll parallax exit (smoothed)
  const textOpacityRaw = useTransform(scrollY, [0, 450], [1.0, 0]);
  const textOpacity = useSpring(textOpacityRaw, { stiffness: 90, damping: 20 });

  const textYRaw = useTransform(scrollY, [0, 600], [0, -100]);
  const textY = useSpring(textYRaw, { stiffness: 90, damping: 20 });

  const updateCoordinates = (clientX: number, clientY: number) => {
    lensX.set(clientX);
    lensY.set(clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <SplitLoader />

      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="min-h-[100svh] w-full relative bg-zinc-950 overflow-hidden flex flex-col justify-center items-center py-20 px-6 select-none"
        style={
          {
            "--mouse-x": "50%",
            "--mouse-y": "38%",
            "--lens-radius": "140px",
          } as any
        }
      >
        {/* Layer 0: Cinematic Video Background */}
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          style={{
            scale,
            filter: videoFilter,
          }}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source src="/new-heros.mp4" type="video/mp4" />
        </motion.video>

        {/* Layer 1: Solid Black Shroud (Reveals video underneath via radial gradient mask) */}
        <div
          style={{
            maskImage: "radial-gradient(circle var(--lens-radius) at var(--mouse-x) var(--mouse-y), transparent 0%, black 100%)",
            WebkitMaskImage: "radial-gradient(circle var(--lens-radius) at var(--mouse-x) var(--mouse-y), transparent 0%, black 100%)",
          }}
          className="absolute inset-0 bg-zinc-950/95 z-10 pointer-events-none transition-[mask] duration-75"
        >
          {/* Subtle editorial dot-grid overlay on the shroud to give it a premium texture */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
        </div>

        {/* Layer 2: Interactive Lens Glow Edge (Visible on desktop when coordinates are active) */}
        <div
          style={{
            left: "var(--mouse-x)",
            top: "var(--mouse-y)",
            transform: "translate(-50%, -50%)",
            width: "calc(var(--lens-radius) * 2)",
            height: "calc(var(--lens-radius) * 2)",
          }}
          className="absolute pointer-events-none z-20 rounded-full border border-cyan-500/20 bg-cyan-500/[0.015] filter blur-[3px]"
        />

        {/* Layer 3: Central Hero Content Block */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
          }}
          className="relative z-30 flex flex-col items-center justify-center text-center max-w-4xl pointer-events-none mt-10"
        >
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Hella Pill Label */}
            <motion.div variants={itemVariants} className="pointer-events-auto">
              <HellaSticker />
            </motion.div>

            {/* Eyebrow Label with tech-flicker character entry */}
            <motion.div
              variants={eyebrowContainerVariants}
              className="flex flex-wrap justify-center items-center text-[9px] sm:text-[11px] font-display uppercase tracking-[0.35em] text-cyan-400/95 mt-6 select-none"
            >
              <span className="text-cyan-500/40 mr-3 font-mono font-bold">[</span>
              {t("ФУЛСТЕК-ІНЖЕНЕР // АВТОМАТИЗАТОР", "FULLSTACK ENGINEER // AUTOMATOR")
                .split("")
                .map((char, index) => (
                  <motion.span
                    key={index}
                    variants={charVariants}
                    className={char === " " ? "w-1.5" : "inline-block"}
                  >
                    {char}
                  </motion.span>
                ))}
              <span className="text-cyan-500/40 ml-3 font-mono font-bold">]</span>
            </motion.div>

            {/* Main Giant Title - Mask Slide Up Reveal */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-extrabold tracking-tighter font-display leading-none mt-4 max-w-xl sm:max-w-2xl md:max-w-4xl flex flex-wrap justify-center gap-x-4 sm:gap-x-6 text-balance uppercase"
            >
              {["Yevhenii", "Lutiy"].map((word, i) => (
                <span key={i} className="overflow-hidden inline-block py-1 sm:py-2">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.95,
                      delay: 0.4 + i * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* Detailed Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm md:text-base leading-relaxed text-zinc-400 max-w-lg sm:max-w-xl md:max-w-2xl mt-6 px-4 text-balance"
            >
              {t(
                "Створюю надійні цифрові продукти та автоматизую складні бізнес-процеси — від інтерактивних інтерфейсів до масштабованих систем та n8n сценаріїв.",
                "Building robust digital products and automating complex workflows — from high-performance interfaces to scalable backend engines and n8n scripts."
              )}
            </motion.p>

            {/* CTA Buttons Side-by-Side */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto w-full px-4"
            >
              {/* Primary: Contact Me (Filled white) */}
              <MagneticButton
                as="button"
                onClick={handleScrollToContact}
                glowBorder={false}
                strength={0.25}
                className="relative overflow-hidden bg-white text-black font-semibold border border-white px-8 py-3.5 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-white/90 transition duration-300 flex items-center justify-center w-full sm:w-auto pointer-events-auto"
              >
                <span className="relative z-10">{t("ЗВ'ЯЗАТИСЯ ЗІ МНОЮ", "START A PROJECT")}</span>
                
                {/* Micro-shimmer sheen */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/5 to-transparent group-hover/magnetic:translate-x-full transition-transform duration-1000 ease-out" />
              </MagneticButton>

              {/* Secondary: My Projects (Outlined black matte) */}
              <MagneticButton
                as="button"
                onClick={() => {
                  const el = document.getElementById("projects");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                glowBorder={false}
                strength={0.25}
                className="relative overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-white px-8 py-3.5 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-zinc-900 transition duration-300 flex items-center justify-center w-full sm:w-auto pointer-events-auto"
              >
                <span className="relative z-10">{t("МОЇ ПРОЄКТИ", "VIEW PROJECTS")}</span>
                
                {/* micro-shimmer sheen */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover/magnetic:translate-x-full transition-transform duration-1000 ease-out" />
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Film grain effect */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-40 mix-blend-overlay opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/></svg>\")",
          }}
        />

        {/* Corner labels — editorial feel */}
        <div className="pointer-events-none absolute inset-x-10 bottom-8 z-30 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.4em] text-white/40">
          <span>PORTFOLIO · MMXXVI</span>
          <span>Remote / Kyiv</span>
        </div>
      </section>
    </>
  );
}

/* ===================== LOADER ===================== */

function SplitLoader() {
  const [progress, setProgress] = useState(0);
  const [splitting, setSplitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startAt = Date.now();
    const interval = setInterval(() => {
      const p = Math.min(
        100,
        Math.round(((Date.now() - startAt) / (LOADER_DURATION - 150)) * 100)
      );
      setProgress(p);
      if (p >= 100) clearInterval(interval);
    }, 50);
    const splitTimer = setTimeout(() => setSplitting(true), LOADER_DURATION);
    return () => {
      clearInterval(interval);
      clearTimeout(splitTimer);
    };
  }, []);

  useEffect(() => {
    if (done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done]);

  if (done) return null;

  const halfTransition = {
    duration: 1.1,
    ease: [0.83, 0, 0.17, 1] as [number, number, number, number],
  };

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <motion.div
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          splitting ? { scaleX: 1, opacity: [0, 1, 0] } : { scaleX: 0, opacity: 0 }
        }
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{ originX: 0.5 }}
        className="absolute left-0 right-0 top-1/2 z-[101] h-px -translate-y-1/2 bg-white/90 shadow-[0_0_18px_2px_rgba(255,255,255,0.6)]"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={splitting ? { y: "-100%" } : { y: 0 }}
        transition={halfTransition}
        className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-black"
      >
        <div className="absolute inset-x-0 top-0 flex h-[100vh] items-center justify-center">
          <LoaderContent progress={progress} splitting={splitting} />
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 0 }}
        animate={splitting ? { y: "100%" } : { y: 0 }}
        transition={halfTransition}
        onAnimationComplete={() => {
          if (splitting) setDone(true);
        }}
        className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-black"
      >
        <div className="absolute inset-x-0 bottom-0 flex h-[100vh] items-center justify-center">
          <LoaderContent progress={progress} splitting={splitting} />
        </div>
      </motion.div>
    </div>
  );
}

function LoaderContent({
  progress,
  splitting,
}: {
  progress: number;
  splitting: boolean;
}) {
  return (
    <div className="flex w-full max-w-[420px] flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: splitting ? 0 : 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
        className="mb-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-white/35"
      >
        <span className="inline-block h-px w-6 bg-white/25" />
        Yevhenii Liutyi
        <span className="inline-block h-px w-6 bg-white/25" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: splitting ? 0 : 1, scale: splitting ? 1.04 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="block font-display text-[88px] font-medium leading-none tracking-[-0.04em] text-white"
          style={{ textShadow: "0 0 60px rgba(255,255,255,0.08)" }}
        >
          YL
        </span>
      </motion.div>

      <div className="mt-12 h-px w-44 overflow-hidden bg-white/10">
        <div
          className="h-full bg-white transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: splitting ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="mt-4 font-mono text-[10px] tabular-nums tracking-[0.4em] text-white/40"
      >
        {progress.toString().padStart(3, "0")}
      </motion.div>
    </div>
  );
}

/* ===================== HELLA STICKER ===================== */

function HellaSticker() {
  const { t } = useLang();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const tTimer = setTimeout(() => setRevealed(true), 900);
    return () => clearTimeout(tTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -14, y: 8 }}
      animate={{ opacity: 1, scale: 1, rotate: -5, y: 0 }}
      whileHover={{ scale: 1.05, rotate: -2, y: -2 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 18,
        delay: 0.6 
      }}
      className="inline-block relative group cursor-pointer"
      style={{ perspective: 600 }}
    >
      {/* Dynamic rotating conic border container */}
      <div className="relative p-[1.5px] rounded-xl overflow-hidden bg-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {/* Animated conic gradient border background */}
        <motion.div
          className="absolute -inset-[200%] bg-[conic-gradient(from_0deg,transparent_40%,#10b981_50%,transparent_60%)] opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner pill container */}
        <div className="relative flex items-center gap-2 rounded-[10px] bg-zinc-950/95 px-4 py-2 backdrop-blur-md overflow-hidden">
          {/* Futuristic laser scanner sweep */}
          <motion.div
            className="absolute inset-y-0 w-[20px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent pointer-events-none z-10"
            initial={{ left: "-20%" }}
            animate={{ left: "120%" }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 3.5,
              ease: "easeInOut",
            }}
          />

          {/* Glowing dot status */}
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
              animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>

          {/* Char-by-char brand reveal */}
          <span className="flex font-display text-[14px] font-bold tracking-[0.2em] text-white">
            {STICKER_CHARS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                animate={revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
              >
                {char}
              </motion.span>
            ))}
          </span>

          {/* Slash + Agency mention */}
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={revealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <span className="h-3 w-px bg-white/15" />
            <span className="font-mono text-[9px] tracking-widest text-emerald-400 font-bold uppercase">
              {t("агенція", "agency")}
            </span>
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
