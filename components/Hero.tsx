"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ===================== HERO ===================== */

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textScale = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 3, 9]);
  const bgScale = useTransform(scrollYProgress, [0, 0.9, 1], [1.06, 1.32, 1.36]);
  const containerOpacity = useTransform(scrollYProgress, [0.7, 0.92], [1, 0]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.6, 0.85], [0.55, 0.85, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <>
      <SplitLoader />

      {/* ── MOBILE hero ── */}
      <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-black px-6 pb-10 pt-28 md:hidden">

        {/* Glow orbs — static, GPU-cheap */}
        <div aria-hidden className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-emerald-500/20 blur-[90px]" />
        <div aria-hidden className="pointer-events-none absolute -right-24 bottom-1/3 h-64 w-64 rounded-full bg-sky-500/15 blur-[80px]" />

        {/* Fine grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* ── Top badge ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="relative z-10 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] uppercase tracking-[0.4em] text-white/55 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Available for work
        </motion.div>

        {/* ── Main content ── */}
        <div className="relative z-10 flex flex-col">
          {/* Eyebrow with animated circle SVG under "Developer" */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
            className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.45em] text-white/40"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-white/40" />
            <span>Fullstack{" "}
              <span className="relative inline-block text-white/70">
                Developer
                <svg
                  viewBox="0 0 120 18"
                  fill="none"
                  className="absolute -bottom-1 left-0 w-full"
                >
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.1, delay: 0.9, ease: "easeInOut" }}
                    d="M4 14 C20 4, 50 2, 60 9 C70 16, 100 4, 116 8"
                    stroke="rgba(16,185,129,0.7)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </motion.div>

          {/* Name — single line, fluid font size, never wraps */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="whitespace-nowrap font-bold leading-[0.92] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(52px, 14.5vw, 92px)" }}
            >
              YEVHENII
            </motion.h1>
          </div>

          {/* Subtitle line */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="mt-1 whitespace-nowrap font-bold leading-[0.92] tracking-[-0.04em]"
              style={{
                fontSize: "clamp(52px, 14.5vw, 92px)",
                background: "linear-gradient(100deg, #fff 20%, rgba(16,185,129,0.9) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              LIUTYI
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.62, ease: "easeOut" }}
            className="mt-5 text-[15px] leading-relaxed text-white/50"
          >
            Будую продукти — від ідеї до продакшну.
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {["React", "Next.js", "Node.js", "n8n"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/55 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.88, ease: "easeOut" }}
            className="mt-7 flex gap-3"
          >
            <a
              href="#contact"
              className="flex-1 rounded-full bg-white py-3.5 text-center text-sm font-semibold text-black transition active:scale-[0.97]"
            >
              Написати
            </a>
            <a
              href="#projects"
              className="flex-1 rounded-full border border-white/15 bg-white/[0.04] py-3.5 text-center text-sm font-medium text-white backdrop-blur-md transition active:scale-[0.97]"
            >
              Проєкти
            </a>
          </motion.div>
        </div>

        {/* ── Bottom stats strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          className="relative z-10 flex items-center justify-between border-t border-white/8 pt-6 text-center"
        >
          {[
            { val: "5+", label: "років досвіду" },
            { val: "40+", label: "проєктів" },
            { val: "100%", label: "результат" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span className="text-xl font-semibold tracking-tight text-white">{s.val}</span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/40">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── DESKTOP hero — scroll-driven parallax ── */}
      <section ref={ref} className="relative hidden h-[280vh] bg-black md:block">
        <motion.div
          style={{ opacity: containerOpacity }}
          className="sticky top-0 h-screen w-full overflow-hidden bg-black"
        >
          {/* Background video — desktop only */}
          <motion.video
            style={{ scale: bgScale }}
            className="absolute inset-0 z-0 h-full w-full object-cover"
            src="/new-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />

          {/* Vignette */}
          <motion.div
            aria-hidden
            style={{
              opacity: vignetteOpacity,
              background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.95) 100%)",
            }}
            className="pointer-events-none absolute inset-0 z-[5]"
          />

          {/* YEVHENII cutout mask */}
          <motion.div
            style={{ scale: textScale, willChange: "transform" }}
            className="absolute inset-0 z-10 origin-center"
          >
            <svg
              viewBox="0 0 1600 900"
              preserveAspectRatio="xMidYMid slice"
              className="h-full w-full"
              shapeRendering="geometricPrecision"
            >
              <defs>
                <mask id="yev-mask">
                  <rect width="1600" height="900" fill="white" />
                  <text
                    x="800" y="470"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="Inter, system-ui, sans-serif"
                    fontWeight="900"
                    fontSize="220"
                    fill="black"
                  >YEVHENII</text>
                </mask>
              </defs>
              <rect width="1600" height="900" fill="#000000" mask="url(#yev-mask)" />
            </svg>
          </motion.div>

          {/* Film grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-[0.06]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/></svg>\")",
            }}
          />

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-2 text-white/70"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em]">scroll to enter</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-8 w-px bg-white/60"
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

/* ===================== LOADER ===================== */

const LOADER_DURATION = 1800;

function SplitLoader() {
  const [progress, setProgress] = useState(0);
  const [splitting, setSplitting] = useState(false);
  const [done, setDone] = useState(false);

  // Use interval instead of rAF loop — much less CPU
  useEffect(() => {
    const startAt = Date.now();
    const interval = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - startAt) / (LOADER_DURATION - 150)) * 100));
      setProgress(p);
      if (p >= 100) clearInterval(interval);
    }, 50);
    const splitTimer = setTimeout(() => setSplitting(true), LOADER_DURATION);
    return () => { clearInterval(interval); clearTimeout(splitTimer); };
  }, []);

  useEffect(() => {
    if (done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
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
        animate={splitting ? { scaleX: 1, opacity: [0, 1, 0] } : { scaleX: 0, opacity: 0 }}
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
        onAnimationComplete={() => { if (splitting) setDone(true); }}
        className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-black"
      >
        <div className="absolute inset-x-0 bottom-0 flex h-[100vh] items-center justify-center">
          <LoaderContent progress={progress} splitting={splitting} />
        </div>
      </motion.div>
    </div>
  );
}

function LoaderContent({ progress, splitting }: { progress: number; splitting: boolean }) {
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
        <div className="h-full bg-white transition-all duration-75" style={{ width: `${progress}%` }} />
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
