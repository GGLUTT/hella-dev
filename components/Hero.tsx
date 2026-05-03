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

  // Direct scroll-driven values — no spring, no filters — only GPU transforms
  // so reverse scrolling is perfectly 1:1.
  // Capped scale at 9 so the SVG never tiles ugly intermediate frames on reverse.
  const textScale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8],
    [1, 3, 9],
  );

  // Background parallax push (cheap transform).
  const bgScale = useTransform(scrollYProgress, [0, 0.9, 1], [1.06, 1.32, 1.36]);

  // Container fades to black earlier so high-scale states are never seen.
  const containerOpacity = useTransform(scrollYProgress, [0.7, 0.92], [1, 0]);

  // Vignette opacity (no dynamic gradient — fixed gradient, only opacity changes).
  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0, 0.6, 0.85],
    [0.55, 0.85, 0],
  );

  // Scroll hint visibility (only at very start).
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <>
      <SplitLoader />
      <section ref={ref} className="relative h-[220vh] bg-black md:h-[280vh]">
        <motion.div
          style={{ opacity: containerOpacity }}
          className="sticky top-0 h-screen w-full overflow-hidden bg-black"
        >
          {/* Layer 0: background video */}
          <motion.video
            style={{ scale: bgScale }}
            className="absolute inset-0 z-0 h-full w-full object-cover"
            src="/new-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />

          {/* Static vignette — only opacity animates (GPU-friendly) */}
          <motion.div
            aria-hidden
            style={{
              opacity: vignetteOpacity,
              background:
                "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.95) 100%)",
            }}
            className="pointer-events-none absolute inset-0 z-[5]"
          />

          {/* Layer 1: black overlay with YEVHENII-shaped cutout (vector SVG, scales crisp). */}
          <motion.div
            style={{
              scale: textScale,
              willChange: "transform",
              transform: "translateZ(0)",
            }}
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
                    x="800"
                    y="470"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                    fontWeight="900"
                    fontSize="220"
                    letterSpacing="0"
                    fill="black"
                  >YEVHENII</text>
                </mask>
              </defs>
              <rect
                width="1600"
                height="900"
                fill="#000000"
                mask="url(#yev-mask)"
              />
            </svg>
          </motion.div>

          {/* Subtle film grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-[0.08]"
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
            <span className="font-mono text-[10px] uppercase tracking-[0.4em]">
              scroll to enter
            </span>
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
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

const LOADER_DURATION = 1800; // ms total before split
const SPLIT_AT = LOADER_DURATION;

function SplitLoader() {
  const [elapsed, setElapsed] = useState(0);
  const [splitting, setSplitting] = useState(false);
  const [done, setDone] = useState(false);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      setElapsed(t - startRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (elapsed >= SPLIT_AT && !splitting) setSplitting(true);
  }, [elapsed, splitting]);

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
      {/* Seam flash */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          splitting
            ? { scaleX: 1, opacity: [0, 1, 0] }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{ originX: 0.5 }}
        className="absolute left-0 right-0 top-1/2 z-[101] h-px -translate-y-1/2 bg-white/90 shadow-[0_0_18px_2px_rgba(255,255,255,0.6)]"
      />

      {/* Top half */}
      <motion.div
        initial={{ y: 0 }}
        animate={splitting ? { y: "-100%" } : { y: 0 }}
        transition={halfTransition}
        className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-black"
      >
        <div className="absolute inset-x-0 top-0 flex h-[100vh] items-center justify-center">
          <LoaderContent elapsed={elapsed} splitting={splitting} />
        </div>
      </motion.div>

      {/* Bottom half */}
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
          <LoaderContent elapsed={elapsed} splitting={splitting} />
        </div>
      </motion.div>
    </div>
  );
}

function LoaderContent({
  elapsed,
  splitting,
}: {
  elapsed: number;
  splitting: boolean;
}) {
  const progress = Math.min(100, Math.round((elapsed / (LOADER_DURATION - 150)) * 100));

  return (
    <div className="flex w-full max-w-[420px] flex-col items-center px-6">
      {/* Subtle top eyebrow */}
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

      {/* YL monogram — the focal point */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{
          opacity: splitting ? 0 : 1,
          scale: splitting ? 1.04 : 1,
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <span
          className="block font-display text-[88px] font-medium leading-none tracking-[-0.04em] text-white"
          style={{
            textShadow: "0 0 60px rgba(255,255,255,0.08)",
          }}
        >
          YL
        </span>
        {/* Breathing ring behind monogram */}
        <motion.span
          aria-hidden
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.08, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 -z-10 mx-auto my-auto block h-[110%] w-[110%] -translate-x-[5%] -translate-y-[5%] rounded-full bg-white/[0.04] blur-2xl"
        />
      </motion.div>

      {/* Hairline progress */}
      <div className="mt-12 h-px w-44 overflow-hidden bg-white/10">
        <motion.div
          className="h-full bg-white"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      {/* Tiny percentage */}
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
